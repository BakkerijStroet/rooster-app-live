"use strict";

const REQUEST_TYPES = {
  timeOff: "timeOff",
  swap: "swap"
};

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

function normalizeMailLog(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeTimeOffRequest(request) {
  if (!request || typeof request.id !== "string" || typeof request.employeeName !== "string") {
    return null;
  }

  const normalizedType = typeof request.type === "string" ? request.type : "vrij";
  const normalizedStartDate = typeof request.startDate === "string" && request.startDate
    ? request.startDate
    : (typeof request.date === "string" ? request.date : "");
  const normalizedEndDate = normalizedType === "vakantie"
    ? ((typeof request.endDate === "string" && request.endDate) ? request.endDate : normalizedStartDate)
    : normalizedStartDate;

  if (!normalizedStartDate) {
    return null;
  }

  return {
    ...request,
    employeeName: request.employeeName.trim(),
    reason: typeof request.reason === "string" ? request.reason.trim() : "",
    managerNote: typeof request.managerNote === "string" ? request.managerNote.trim() : "",
    mailLog: normalizeMailLog(request.mailLog),
    status: request.status === "pending" ? "open" : (typeof request.status === "string" ? request.status : "open"),
    type: normalizedType,
    date: normalizedStartDate,
    startDate: normalizedStartDate,
    endDate: normalizedEndDate,
    createdAt: typeof request.createdAt === "string" ? request.createdAt : "",
    updatedAt: typeof request.updatedAt === "string" ? request.updatedAt : (typeof request.createdAt === "string" ? request.createdAt : "")
  };
}

function normalizeSwapRequest(request) {
  if (!request || typeof request.id !== "string" || typeof request.employeeName !== "string" || typeof request.date !== "string") {
    return null;
  }

  return {
    ...request,
    employeeName: request.employeeName.trim(),
    targetEmployeeName: typeof request.targetEmployeeName === "string" ? request.targetEmployeeName.trim() : "",
    shiftName: typeof request.shiftName === "string" ? request.shiftName.trim() : "",
    managerNote: typeof request.managerNote === "string" ? request.managerNote.trim() : "",
    escalatedToPlanner: Boolean(request.escalatedToPlanner),
    autoApproved: Boolean(request.autoApproved),
    mailLog: normalizeMailLog(request.mailLog),
    status: request.status === "pending" ? "open" : (typeof request.status === "string" ? request.status : "open"),
    createdAt: typeof request.createdAt === "string" ? request.createdAt : "",
    updatedAt: typeof request.updatedAt === "string" ? request.updatedAt : (typeof request.createdAt === "string" ? request.createdAt : "")
  };
}

function normalizeRequests(requests, type) {
  const uniqueRequests = [];
  const seenIds = new Set();
  const normalizer = type === REQUEST_TYPES.swap ? normalizeSwapRequest : normalizeTimeOffRequest;

  (Array.isArray(requests) ? requests : []).forEach((request) => {
    const normalizedRequest = normalizer(request);

    if (!normalizedRequest || seenIds.has(normalizedRequest.id)) {
      return;
    }

    seenIds.add(normalizedRequest.id);
    uniqueRequests.push(normalizedRequest);
  });

  return uniqueRequests;
}

function getRequestTimestamp(request) {
  const parsedUpdated = Date.parse(request?.updatedAt || "");

  if (Number.isFinite(parsedUpdated)) {
    return parsedUpdated;
  }

  const parsedCreated = Date.parse(request?.createdAt || "");
  return Number.isFinite(parsedCreated) ? parsedCreated : 0;
}

function mergeRequests(existingRequests, incomingRequests, type) {
  const mergedById = new Map();

  normalizeRequests(existingRequests, type).forEach((request) => {
    mergedById.set(request.id, request);
  });

  normalizeRequests(incomingRequests, type).forEach((incomingRequest) => {
    const existingRequest = mergedById.get(incomingRequest.id);

    if (!existingRequest || getRequestTimestamp(incomingRequest) > getRequestTimestamp(existingRequest)) {
      mergedById.set(incomingRequest.id, incomingRequest);
    }
  });

  return [...mergedById.values()].sort((requestA, requestB) =>
    getRequestTimestamp(requestB) - getRequestTimestamp(requestA) ||
    requestA.employeeName.localeCompare(requestB.employeeName, "nl")
  );
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

function toDatabaseRow(request, mode, type) {
  const normalizedRequest = type === REQUEST_TYPES.swap
    ? normalizeSwapRequest(request)
    : normalizeTimeOffRequest(request);

  if (!normalizedRequest) {
    return null;
  }

  return {
    data_mode: mode,
    request_type: type,
    id: normalizedRequest.id,
    employee_name: normalizedRequest.employeeName,
    status: normalizedRequest.status || "open",
    payload: normalizedRequest,
    updated_at: new Date(getRequestTimestamp(normalizedRequest) || Date.now()).toISOString()
  };
}

async function readRequestData(mode) {
  const rows = await supabaseRequest(
    `request_data?data_mode=eq.${encodeURIComponent(mode)}&select=request_type,payload&order=updated_at.desc`,
    { method: "GET" }
  );
  const timeOffRequests = [];
  const swapRequests = [];

  if (Array.isArray(rows)) {
    rows.forEach((row) => {
      if (row?.request_type === REQUEST_TYPES.timeOff) {
        const request = normalizeTimeOffRequest(row.payload);
        if (request) {
          timeOffRequests.push(request);
        }
      } else if (row?.request_type === REQUEST_TYPES.swap) {
        const request = normalizeSwapRequest(row.payload);
        if (request) {
          swapRequests.push(request);
        }
      }
    });
  }

  return {
    timeOffRequests: normalizeRequests(timeOffRequests, REQUEST_TYPES.timeOff),
    swapRequests: normalizeRequests(swapRequests, REQUEST_TYPES.swap)
  };
}

async function upsertRequestData(mode, incomingData) {
  const existingData = await readRequestData(mode);
  const mergedTimeOffRequests = mergeRequests(existingData.timeOffRequests, incomingData.timeOffRequests, REQUEST_TYPES.timeOff);
  const mergedSwapRequests = mergeRequests(existingData.swapRequests, incomingData.swapRequests, REQUEST_TYPES.swap);
  const rows = [
    ...mergedTimeOffRequests.map((request) => toDatabaseRow(request, mode, REQUEST_TYPES.timeOff)),
    ...mergedSwapRequests.map((request) => toDatabaseRow(request, mode, REQUEST_TYPES.swap))
  ].filter(Boolean);

  if (rows.length) {
    await supabaseRequest("request_data?on_conflict=data_mode,request_type,id", {
      method: "POST",
      headers: {
        Prefer: "resolution=merge-duplicates,return=minimal"
      },
      body: JSON.stringify(rows)
    });
  }

  // Stap 4 is bewust upsert-only: intrekken/verwijderen wordt later apart en expliciet opgelost.
  return readRequestData(mode);
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
      const requestData = await readRequestData(mode);
      sendJson(res, 200, { success: true, ...requestData });
      return;
    }

    if (method === "POST" || method === "PUT") {
      const payload = parseBody(req);
      const mode = normalizeMode(payload?.mode || req.query?.mode);
      const requestData = await upsertRequestData(mode, {
        timeOffRequests: payload?.timeOffRequests,
        swapRequests: payload?.swapRequests
      });
      sendJson(res, 200, { success: true, ...requestData });
      return;
    }

    sendJson(res, 405, { success: false, message: "Method not allowed" });
  } catch (error) {
    console.error("[request-data-api]", {
      message: error instanceof Error ? error.message : String(error),
      details: error?.details || null
    });
    sendJson(res, error?.statusCode || 500, {
      success: false,
      message: error?.message || "Aanvragen konden niet centraal worden verwerkt."
    });
  }
}

module.exports = handler;
