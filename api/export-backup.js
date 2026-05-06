"use strict";

const BACKUP_TABLES = [
  "planning_entries",
  "request_data",
  "work_logs",
  "employee_data"
];

function sendJson(res, statusCode, payload, headers = {}) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  res.end(JSON.stringify(payload, null, 2));
}

function normalizeMode(value) {
  if (value === "test") {
    const error = new Error("Supabase back-up is alleen beschikbaar in live-mode.");
    error.statusCode = 400;
    throw error;
  }

  return "live";
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || "";

  return {
    url: url.replace(/\/$/, ""),
    serviceKey
  };
}

function getAppVersion() {
  try {
    // Keep this server-side; the frontend never receives environment secrets.
    return process.env.VERCEL_GIT_COMMIT_SHA || require("../package.json").version || "unknown";
  } catch {
    return process.env.VERCEL_GIT_COMMIT_SHA || "unknown";
  }
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

  return Array.isArray(payload) ? payload : [];
}

async function readSupabaseTable(tableName) {
  const pageSize = 1000;
  const rows = [];
  let offset = 0;

  while (true) {
    const page = await supabaseRequest(
      `${tableName}?select=*&limit=${pageSize}&offset=${offset}`,
      { method: "GET" }
    );

    rows.push(...page);

    if (page.length < pageSize) {
      break;
    }

    offset += pageSize;
  }

  return rows;
}

function countEmployees(employeeDataRows) {
  const employeesRow = employeeDataRows.find((row) => row?.data_key === "employees");
  return Array.isArray(employeesRow?.payload) ? employeesRow.payload.length : employeeDataRows.length;
}

function createBackupFileName(createdAt) {
  const stamp = createdAt
    .replace("T", "-")
    .replace(/:/g, "")
    .slice(0, 16);
  return `backup-${stamp}.json`;
}

async function handler(req, res) {
  const method = req.method || "GET";

  if (method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  try {
    if (method !== "GET") {
      sendJson(res, 405, { success: false, message: "Method not allowed" });
      return;
    }

    normalizeMode(req.query?.mode);

    const createdAt = new Date().toISOString();
    const [
      planningEntries,
      requestData,
      workLogs,
      employeeData
    ] = await Promise.all(BACKUP_TABLES.map((tableName) => readSupabaseTable(tableName)));
    const payload = {
      success: true,
      createdAt,
      appVersion: getAppVersion(),
      counts: {
        planning_entries: planningEntries.length,
        request_data: requestData.length,
        work_logs: workLogs.length,
        employee_data: countEmployees(employeeData)
      },
      planning_entries: planningEntries,
      request_data: requestData,
      work_logs: workLogs,
      employee_data: employeeData
    };

    sendJson(res, 200, payload, {
      "Content-Disposition": `attachment; filename="${createBackupFileName(createdAt)}"`
    });
  } catch (error) {
    console.error("[export-backup-api]", {
      message: error instanceof Error ? error.message : String(error),
      details: error?.details || null
    });
    sendJson(res, error?.statusCode || 500, {
      success: false,
      message: error?.message || "Back-up mislukt."
    });
  }
}

module.exports = handler;
