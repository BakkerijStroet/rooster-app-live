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
  if (value === "test") {
    const error = new Error("Testmodus gebruikt alleen lokale opslag en raakt Supabase niet.");
    error.statusCode = 400;
    throw error;
  }

  return "live";
}

function calculateHours(startTime, endTime) {
  if (typeof startTime !== "string" || typeof endTime !== "string" || !startTime || !endTime) {
    return 0;
  }

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  if (![startHour, startMinute, endHour, endMinute].every(Number.isFinite)) {
    return 0;
  }

  const startTotal = startHour * 60 + startMinute;
  let endTotal = endHour * 60 + endMinute;

  if (endTotal <= startTotal) {
    endTotal += 24 * 60;
  }

  return Math.round(((endTotal - startTotal) / 60) * 100) / 100;
}

function normalizePlanningEntry(entry) {
  if (!entry || typeof entry.name !== "string" || typeof entry.day !== "string" || typeof entry.startTime !== "string" || typeof entry.endTime !== "string") {
    return null;
  }

  const normalizedEntry = {
    ...entry,
    name: entry.name.trim(),
    day: entry.day,
    startTime: entry.startTime,
    endTime: entry.endTime,
    hours: Number.isFinite(Number(entry.hours)) ? Number(entry.hours) : calculateHours(entry.startTime, entry.endTime),
    shiftId: typeof entry.shiftId === "string" ? entry.shiftId : "",
    shiftName: typeof entry.shiftName === "string" ? entry.shiftName.trim() : "",
    proposed: Boolean(entry.proposed),
    replacementFor: typeof entry.replacementFor === "string" ? entry.replacementFor.trim() : "",
    autoFillReason: typeof entry.autoFillReason === "string" ? entry.autoFillReason.trim() : "",
    autoFillReasonDetail: typeof entry.autoFillReasonDetail === "string" ? entry.autoFillReasonDetail.trim() : ""
  };

  return normalizedEntry.name && normalizedEntry.day ? normalizedEntry : null;
}

function getPlanningEntryId(entry) {
  const normalizedEntry = normalizePlanningEntry(entry);

  if (!normalizedEntry) {
    return "";
  }

  return [
    normalizedEntry.name.toLowerCase(),
    normalizedEntry.day,
    normalizedEntry.startTime,
    normalizedEntry.endTime,
    normalizedEntry.shiftId.toLowerCase(),
    normalizedEntry.shiftName.toLowerCase(),
    normalizedEntry.replacementFor.toLowerCase(),
    normalizedEntry.proposed ? "1" : "0"
  ].join("|");
}

function normalizePlanningEntries(entries) {
  const uniqueEntries = [];
  const seenIds = new Set();

  (Array.isArray(entries) ? entries : []).forEach((entry) => {
    const normalizedEntry = normalizePlanningEntry(entry);
    const entryId = getPlanningEntryId(normalizedEntry);

    if (!normalizedEntry || !entryId || seenIds.has(entryId)) {
      return;
    }

    seenIds.add(entryId);
    uniqueEntries.push(normalizedEntry);
  });

  return uniqueEntries;
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

function toDatabaseRow(entry, mode) {
  const normalizedEntry = normalizePlanningEntry(entry);
  const entryId = getPlanningEntryId(normalizedEntry);

  if (!normalizedEntry || !entryId) {
    return null;
  }

  return {
    data_mode: mode,
    id: entryId,
    employee_name: normalizedEntry.name,
    day: /^\d{4}-\d{2}-\d{2}$/.test(normalizedEntry.day) ? normalizedEntry.day : null,
    shift_name: normalizedEntry.shiftName,
    start_time: normalizedEntry.startTime,
    end_time: normalizedEntry.endTime,
    payload: normalizedEntry,
    deleted_at: null,
    updated_at: new Date().toISOString()
  };
}

async function readPlanningEntries(mode) {
  const rows = await supabaseRequest(
    `planning_entries?data_mode=eq.${encodeURIComponent(mode)}&select=id,payload,deleted_at&order=day.asc,start_time.asc,employee_name.asc`,
    { method: "GET" }
  );
  const entries = [];
  const deletedEntryIds = [];

  if (Array.isArray(rows)) {
    rows.forEach((row) => {
      if (row?.deleted_at) {
        if (typeof row.id === "string" && row.id) {
          deletedEntryIds.push(row.id);
        }
        return;
      }

      entries.push(row?.payload);
    });
  }

  return {
    entries: normalizePlanningEntries(entries),
    deletedEntryIds: [...new Set(deletedEntryIds)]
  };
}

async function upsertPlanningEntries(mode, entries, options = {}) {
  const existingData = await readPlanningEntries(mode);
  const deletedEntryIds = new Set(existingData.deletedEntryIds);
  const reviveDeletedEntryIds = new Set(
    (Array.isArray(options.reviveDeletedEntryIds) ? options.reviveDeletedEntryIds : [])
      .filter((entryId) => typeof entryId === "string" && entryId)
  );
  const rows = normalizePlanningEntries(entries)
    // Veiligheidsregel stap 5: oude localStorage mag centrale tombstones niet opnieuw actief maken.
    // Een expliciete planner-save mag een specifieke tombstone wel bewust opnieuw actief maken.
    .filter((entry) => {
      const entryId = getPlanningEntryId(entry);
      return entryId && (!deletedEntryIds.has(entryId) || reviveDeletedEntryIds.has(entryId));
    })
    .map((entry) => toDatabaseRow(entry, mode))
    .filter(Boolean);

  if (rows.length) {
    await supabaseRequest("planning_entries?on_conflict=data_mode,id", {
      method: "POST",
      headers: {
        Prefer: "resolution=merge-duplicates,return=minimal"
      },
      body: JSON.stringify(rows)
    });
  }

  // Upsert blijft bewust actief-data-only: deletes gebeuren alleen via expliciete tombstones.
  return readPlanningEntries(mode);
}

async function tombstonePlanningEntries(mode, entryIds) {
  const uniqueEntryIds = [...new Set((Array.isArray(entryIds) ? entryIds : [])
    .filter((entryId) => typeof entryId === "string" && entryId.trim())
    .map((entryId) => entryId.trim()))];

  if (!uniqueEntryIds.length) {
    return readPlanningEntries(mode);
  }

  const deletedAt = new Date().toISOString();

  for (const entryId of uniqueEntryIds) {
    await supabaseRequest(`planning_entries?data_mode=eq.${encodeURIComponent(mode)}&id=eq.${encodeURIComponent(entryId)}`, {
      method: "PATCH",
      headers: {
        Prefer: "return=minimal"
      },
      body: JSON.stringify({
        deleted_at: deletedAt,
        updated_at: deletedAt
      })
    });
  }

  return readPlanningEntries(mode);
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
      const planningData = await readPlanningEntries(mode);
      sendJson(res, 200, { success: true, ...planningData });
      return;
    }

    if (method === "POST" || method === "PUT") {
      const payload = parseBody(req);
      const mode = normalizeMode(payload?.mode || req.query?.mode);
      const entries = Array.isArray(payload?.entries) ? payload.entries : [];
      const savedData = await upsertPlanningEntries(mode, entries, {
        reviveDeletedEntryIds: Array.isArray(payload?.reviveDeletedEntryIds) ? payload.reviveDeletedEntryIds : []
      });
      sendJson(res, 200, { success: true, ...savedData });
      return;
    }

    if (method === "DELETE") {
      const payload = parseBody(req);
      const mode = normalizeMode(payload?.mode || req.query?.mode);
      const deletedEntryIds = Array.isArray(payload?.deletedEntryIds)
        ? payload.deletedEntryIds
        : (typeof req.query?.id === "string" ? [req.query.id] : []);
      const savedData = await tombstonePlanningEntries(mode, deletedEntryIds);
      sendJson(res, 200, { success: true, ...savedData });
      return;
    }

    sendJson(res, 405, { success: false, message: "Method not allowed" });
  } catch (error) {
    console.error("[planning-entries-api]", {
      message: error instanceof Error ? error.message : String(error),
      details: error?.details || null
    });
    sendJson(res, error?.statusCode || 500, {
      success: false,
      message: error?.message || "Roosterregels konden niet centraal worden verwerkt."
    });
  }
}

module.exports = handler;
