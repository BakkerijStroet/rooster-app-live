"use strict";

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  if (!req.body) {
    return {};
  }

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return req.body;
}

function normalizeMode(value) {
  return value === "test" ? "test" : "live";
}

function normalizeWorkLogPayload(log) {
  if (!log || typeof log.id !== "string") {
    return null;
  }

  return {
    ...log,
    id: log.id,
    employeeName: typeof log.employeeName === "string" ? log.employeeName.trim() : "",
    day: typeof log.day === "string" ? log.day : "",
    shiftName: typeof log.shiftName === "string" ? log.shiftName.trim() : "",
    plannedStart: typeof log.plannedStart === "string" ? log.plannedStart : "",
    plannedEnd: typeof log.plannedEnd === "string" ? log.plannedEnd : "",
    actualStart: typeof log.actualStart === "string" ? log.actualStart : "",
    actualEnd: typeof log.actualEnd === "string" ? log.actualEnd : "",
    breakMinutes: Number.isFinite(Number(log.breakMinutes)) ? Math.max(0, Number(log.breakMinutes)) : 0,
    notes: typeof log.notes === "string" ? log.notes : "",
    managerNote: typeof log.managerNote === "string" ? log.managerNote : "",
    employeeReply: typeof log.employeeReply === "string" ? log.employeeReply : "",
    status: ["draft", "open", "approved", "rejected", "revision"].includes(log.status)
      ? log.status
      : (log.status === "submitted" ? "open" : "draft"),
    submittedAt: typeof log.submittedAt === "string" ? log.submittedAt : "",
    updatedAt: typeof log.updatedAt === "string" ? log.updatedAt : ""
  };
}

function getLogTimestamp(log) {
  const candidates = [
    log?.updatedAt,
    log?.submittedAt,
    Array.isArray(log?.auditTrail) && log.auditTrail.length
      ? log.auditTrail[log.auditTrail.length - 1]?.at
      : ""
  ];

  for (const value of candidates) {
    const parsed = Date.parse(value || "");
    if (Number.isFinite(parsed)) {
      return new Date(parsed).toISOString();
    }
  }

  return new Date().toISOString();
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || "";

  return {
    url: url.replace(/\/$/, ""),
    serviceKey
  };
}

async function supabaseRequest(path, options = {}) {
  const { url, serviceKey } = getSupabaseConfig();

  if (!url || !serviceKey) {
    const error = new Error("Supabase configuratie ontbreekt.");
    error.statusCode = 503;
    throw error;
  }

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const text = await response.text();
  let payload = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok) {
    const error = new Error(typeof payload === "string" ? payload : (payload?.message || "Supabase request mislukt."));
    error.statusCode = response.status;
    error.details = payload;
    throw error;
  }

  return payload;
}

function toDatabaseRow(log, mode) {
  const normalizedLog = normalizeWorkLogPayload(log);

  if (!normalizedLog) {
    return null;
  }

  return {
    data_mode: mode,
    id: normalizedLog.id,
    employee_name: normalizedLog.employeeName,
    day: /^\d{4}-\d{2}-\d{2}$/.test(normalizedLog.day) ? normalizedLog.day : null,
    shift_name: normalizedLog.shiftName,
    status: normalizedLog.status,
    payload: normalizedLog,
    updated_at: getLogTimestamp(normalizedLog)
  };
}

async function readWorkLogs(mode) {
  const rows = await supabaseRequest(
    `work_logs?data_mode=eq.${encodeURIComponent(mode)}&select=payload&order=day.asc,employee_name.asc,shift_name.asc`,
    { method: "GET" }
  );

  return Array.isArray(rows)
    ? rows.map((row) => normalizeWorkLogPayload(row?.payload)).filter(Boolean)
    : [];
}

async function upsertWorkLogs(mode, logs) {
  const rows = logs
    .map((log) => toDatabaseRow(log, mode))
    .filter(Boolean);

  if (rows.length) {
    await supabaseRequest("work_logs?on_conflict=data_mode,id", {
      method: "POST",
      headers: {
        Prefer: "resolution=merge-duplicates,return=minimal"
      },
      body: JSON.stringify(rows)
    });
  }

  // Stap 1 is bewust upsert-only: geen device mag centrale uren wissen door een lege of stale cache.
  return readWorkLogs(mode);
}

async function handler(req, res) {
  const method = req.method || "GET";

  if (method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  try {
    if (method === "GET") {
      const mode = normalizeMode(req.query?.mode);
      const workLogs = await readWorkLogs(mode);
      sendJson(res, 200, { success: true, workLogs });
      return;
    }

    if (method === "POST" || method === "PUT") {
      const payload = parseBody(req);
      const mode = normalizeMode(payload?.mode || req.query?.mode);
      const workLogs = Array.isArray(payload?.workLogs) ? payload.workLogs : [];
      const savedLogs = await upsertWorkLogs(mode, workLogs);
      sendJson(res, 200, { success: true, workLogs: savedLogs });
      return;
    }

    sendJson(res, 405, { success: false, message: "Method not allowed" });
  } catch (error) {
    console.error("[work-logs-api]", {
      message: error instanceof Error ? error.message : String(error),
      details: error?.details || null
    });
    sendJson(res, error?.statusCode || 500, {
      success: false,
      message: error?.message || "Urenregistraties konden niet centraal worden verwerkt."
    });
  }
}

module.exports = handler;
