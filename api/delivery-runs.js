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

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizePayload(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function normalizeDeliveryRunInput(value) {
  const sourceFilename = normalizeText(value?.sourceFilename || value?.source_filename);
  const sourceHash = normalizeText(value?.sourceHash || value?.source_hash);
  const payload = normalizePayload(value?.payload);

  if (!sourceFilename) {
    const error = new Error("Bronbestandsnaam ontbreekt.");
    error.statusCode = 400;
    throw error;
  }

  if (!sourceHash) {
    const error = new Error("Bronhash ontbreekt.");
    error.statusCode = 400;
    throw error;
  }

  return {
    sourceFilename,
    sourceHash,
    payload
  };
}

function normalizePatchInput(value) {
  const patch = {};

  if (Object.prototype.hasOwnProperty.call(value || {}, "sourceFilename") || Object.prototype.hasOwnProperty.call(value || {}, "source_filename")) {
    patch.source_filename = normalizeText(value.sourceFilename || value.source_filename);
  }

  if (Object.prototype.hasOwnProperty.call(value || {}, "payload")) {
    patch.payload = normalizePayload(value.payload);
  }

  return patch;
}

function getSupabaseConfig() {
  const rawUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || "";
  const url = rawUrl
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/rest\/v1$/i, "");

  return {
    url,
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

function toApiRun(row) {
  if (!row || typeof row !== "object") {
    return null;
  }

  return {
    id: row.id || "",
    dataMode: row.data_mode || "live",
    sourceFilename: row.source_filename || "",
    sourceHash: row.source_hash || "",
    payload: normalizePayload(row.payload),
    createdAt: row.created_at || "",
    updatedAt: row.updated_at || "",
    deletedAt: row.deleted_at || ""
  };
}

async function readDeliveryRuns(mode, options = {}) {
  const query = [
    `data_mode=eq.${encodeURIComponent(mode)}`,
    "select=id,data_mode,source_filename,source_hash,payload,created_at,updated_at,deleted_at",
    "order=created_at.desc"
  ];

  if (options.id) {
    query.push(`id=eq.${encodeURIComponent(options.id)}`);
  }

  if (options.sourceHash) {
    query.push(`source_hash=eq.${encodeURIComponent(options.sourceHash)}`);
  }

  if (!options.includeDeleted) {
    query.push("deleted_at=is.null");
  }

  const rows = await supabaseRequest(`delivery_runs?${query.join("&")}`, { method: "GET" });
  return Array.isArray(rows) ? rows.map(toApiRun).filter(Boolean) : [];
}

async function readDeliveryRun(mode, id, options = {}) {
  const runs = await readDeliveryRuns(mode, { ...options, id });
  return runs[0] || null;
}

async function createDeliveryRun(mode, input) {
  const normalizedInput = normalizeDeliveryRunInput(input);
  const existingRuns = await readDeliveryRuns(mode, {
    sourceHash: normalizedInput.sourceHash,
    includeDeleted: true
  });

  if (existingRuns.length) {
    const error = new Error("Deze PDF is al als bezorgrun opgeslagen in deze data-mode.");
    error.statusCode = 409;
    error.details = { id: existingRuns[0].id, deletedAt: existingRuns[0].deletedAt };
    throw error;
  }

  const rows = await supabaseRequest("delivery_runs", {
    method: "POST",
    headers: {
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      data_mode: mode,
      source_filename: normalizedInput.sourceFilename,
      source_hash: normalizedInput.sourceHash,
      payload: normalizedInput.payload
    })
  });

  const run = Array.isArray(rows) ? toApiRun(rows[0]) : toApiRun(rows);

  if (!run) {
    const error = new Error("Bezorgrun kon niet worden opgeslagen.");
    error.statusCode = 500;
    throw error;
  }

  return run;
}

async function updateDeliveryRun(mode, id, input) {
  const runId = normalizeText(id);

  if (!runId) {
    const error = new Error("Bezorgrun-id ontbreekt.");
    error.statusCode = 400;
    throw error;
  }

  const existingRun = await readDeliveryRun(mode, runId);

  if (!existingRun) {
    const error = new Error("Bezorgrun niet gevonden.");
    error.statusCode = 404;
    throw error;
  }

  const baseUpdatedAt = normalizeText(input?.baseUpdatedAt || input?.base_updated_at);

  if (baseUpdatedAt && existingRun.updatedAt !== baseUpdatedAt) {
    const error = new Error("Bezorgrun is intussen gewijzigd. Haal de laatste data op en probeer opnieuw.");
    error.statusCode = 409;
    error.details = { updatedAt: existingRun.updatedAt };
    throw error;
  }

  const patch = normalizePatchInput(input);

  if (!Object.keys(patch).length) {
    return existingRun;
  }

  const updatedAtFilter = baseUpdatedAt ? `&updated_at=eq.${encodeURIComponent(baseUpdatedAt)}` : "";
  const rows = await supabaseRequest(`delivery_runs?data_mode=eq.${encodeURIComponent(mode)}&id=eq.${encodeURIComponent(runId)}&deleted_at=is.null${updatedAtFilter}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=representation"
    },
    body: JSON.stringify(patch)
  });

  const updatedRun = Array.isArray(rows) ? toApiRun(rows[0]) : toApiRun(rows);

  if (!updatedRun) {
    const error = new Error(baseUpdatedAt
      ? "Bezorgrun is intussen gewijzigd. Haal de laatste data op en probeer opnieuw."
      : "Bezorgrun kon niet worden bijgewerkt.");
    error.statusCode = baseUpdatedAt ? 409 : 404;
    throw error;
  }

  return updatedRun;
}

async function tombstoneDeliveryRun(mode, id, input = {}) {
  const runId = normalizeText(id);

  if (!runId) {
    const error = new Error("Bezorgrun-id ontbreekt.");
    error.statusCode = 400;
    throw error;
  }

  const existingRun = await readDeliveryRun(mode, runId);

  if (!existingRun) {
    const error = new Error("Bezorgrun niet gevonden.");
    error.statusCode = 404;
    throw error;
  }

  const baseUpdatedAt = normalizeText(input?.baseUpdatedAt || input?.base_updated_at);

  if (baseUpdatedAt && existingRun.updatedAt !== baseUpdatedAt) {
    const error = new Error("Bezorgrun is intussen gewijzigd. Haal de laatste data op en probeer opnieuw.");
    error.statusCode = 409;
    error.details = { updatedAt: existingRun.updatedAt };
    throw error;
  }

  const deletedAt = new Date().toISOString();
  const updatedAtFilter = baseUpdatedAt ? `&updated_at=eq.${encodeURIComponent(baseUpdatedAt)}` : "";
  const rows = await supabaseRequest(`delivery_runs?data_mode=eq.${encodeURIComponent(mode)}&id=eq.${encodeURIComponent(runId)}&deleted_at=is.null${updatedAtFilter}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      deleted_at: deletedAt
    })
  });

  const deletedRun = Array.isArray(rows) ? toApiRun(rows[0]) : toApiRun(rows);

  if (!deletedRun) {
    const error = new Error(baseUpdatedAt
      ? "Bezorgrun is intussen gewijzigd. Haal de laatste data op en probeer opnieuw."
      : "Bezorgrun kon niet worden verwijderd.");
    error.statusCode = baseUpdatedAt ? 409 : 404;
    throw error;
  }

  return deletedRun;
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
      const id = normalizeText(req.query?.id);
      const runs = id
        ? await readDeliveryRuns(mode, { id })
        : await readDeliveryRuns(mode);

      sendJson(res, 200, { success: true, runs });
      return;
    }

    if (method === "POST") {
      const payload = parseBody(req);
      const mode = normalizeMode(payload?.mode || req.query?.mode);
      const run = await createDeliveryRun(mode, payload);
      sendJson(res, 201, { success: true, run });
      return;
    }

    if (method === "PATCH") {
      const payload = parseBody(req);
      const mode = normalizeMode(payload?.mode || req.query?.mode);
      const id = normalizeText(payload?.id || req.query?.id);
      const run = await updateDeliveryRun(mode, id, payload);
      sendJson(res, 200, { success: true, run });
      return;
    }

    if (method === "DELETE") {
      const payload = parseBody(req);
      const mode = normalizeMode(payload?.mode || req.query?.mode);
      const id = normalizeText(payload?.id || req.query?.id);
      const run = await tombstoneDeliveryRun(mode, id, payload);
      sendJson(res, 200, { success: true, run });
      return;
    }

    sendJson(res, 405, { success: false, message: "Method not allowed" });
  } catch (error) {
    console.error("[delivery-runs-api]", {
      message: error instanceof Error ? error.message : String(error),
      details: error?.details || null
    });
    sendJson(res, error?.statusCode || 500, {
      success: false,
      message: error?.message || "Bezorgruns konden niet centraal worden verwerkt.",
      details: error?.details || null
    });
  }
}

module.exports = handler;
