"use strict";

const EMPLOYEE_DATA_KEYS = {
  employees: "employees",
  employeeMeta: "employeeMeta",
  employeePermissions: "employeePermissions"
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

function normalizeEmployees(value) {
  return Array.isArray(value)
    ? [...new Set(
        value
          .filter((employee) => typeof employee === "string" && employee.trim())
          .map((employee) => employee.trim())
      )].sort((nameA, nameB) => nameA.localeCompare(nameB, "nl"))
    : [];
}

function normalizeObject(value) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? structuredClone(value)
    : {};
}

function getTimestamp(value) {
  const parsed = Date.parse(value || "");
  return Number.isFinite(parsed) ? parsed : 0;
}

function hasMeaningfulValue(value) {
  if (typeof value === "string") {
    return value.trim() !== "";
  }

  if (typeof value === "number") {
    return Number.isFinite(value) && value !== 0;
  }

  if (typeof value === "boolean") {
    return true;
  }

  return value !== null && value !== undefined;
}

function mergeEmployeeMetaRecord(existingRecord = {}, incomingRecord = {}) {
  const existing = normalizeObject(existingRecord);
  const incoming = normalizeObject(incomingRecord);
  const existingTimestamp = getTimestamp(existing.updatedAt);
  const incomingTimestamp = getTimestamp(incoming.updatedAt);

  if (!Object.keys(existing).length) {
    return incoming;
  }

  if (incomingTimestamp > existingTimestamp) {
    return {
      ...existing,
      ...incoming
    };
  }

  const merged = { ...existing };

  Object.entries(incoming).forEach(([key, value]) => {
    if (!Object.prototype.hasOwnProperty.call(merged, key) || !hasMeaningfulValue(merged[key])) {
      merged[key] = value;
    }
  });

  return merged;
}

function mergeEmployeeMeta(existingMeta, incomingMeta) {
  const existing = normalizeObject(existingMeta);
  const incoming = normalizeObject(incomingMeta);
  const employeeNames = new Set([...Object.keys(existing), ...Object.keys(incoming)]);
  const merged = {};

  employeeNames.forEach((employeeName) => {
    merged[employeeName] = mergeEmployeeMetaRecord(existing[employeeName], incoming[employeeName]);
  });

  return merged;
}

function mergeEmployeePermissions(existingPermissions, incomingPermissions, existingMeta, incomingMeta) {
  const existing = normalizeObject(existingPermissions);
  const incoming = normalizeObject(incomingPermissions);
  const employeeNames = new Set([...Object.keys(existing), ...Object.keys(incoming)]);
  const merged = {};

  employeeNames.forEach((employeeName) => {
    const existingMap = normalizeObject(existing[employeeName]);
    const incomingMap = normalizeObject(incoming[employeeName]);
    const existingTimestamp = getTimestamp(existingMeta?.[employeeName]?.updatedAt);
    const incomingTimestamp = getTimestamp(incomingMeta?.[employeeName]?.updatedAt);

    if (!Object.keys(existingMap).length) {
      merged[employeeName] = incomingMap;
      return;
    }

    if (!Object.keys(incomingMap).length) {
      merged[employeeName] = existingMap;
      return;
    }

    merged[employeeName] = incomingTimestamp > existingTimestamp
      ? { ...existingMap, ...incomingMap }
      : { ...incomingMap, ...existingMap };
  });

  return merged;
}

function mergeEmployeeData(existingData, incomingData) {
  const employees = normalizeEmployees([
    ...normalizeEmployees(existingData.employees),
    ...normalizeEmployees(incomingData.employees)
  ]);
  const employeeMeta = mergeEmployeeMeta(existingData.employeeMeta, incomingData.employeeMeta);
  const employeePermissions = mergeEmployeePermissions(
    existingData.employeePermissions,
    incomingData.employeePermissions,
    existingData.employeeMeta || {},
    incomingData.employeeMeta || {}
  );

  return {
    employees,
    employeeMeta,
    employeePermissions
  };
}

async function readEmployeeData(mode) {
  const rows = await supabaseRequest(
    `employee_data?data_mode=eq.${encodeURIComponent(mode)}&select=data_key,payload`,
    { method: "GET" }
  );
  const data = {
    employees: [],
    employeeMeta: {},
    employeePermissions: {}
  };

  if (Array.isArray(rows)) {
    rows.forEach((row) => {
      if (row?.data_key === EMPLOYEE_DATA_KEYS.employees) {
        data.employees = normalizeEmployees(row.payload);
      } else if (row?.data_key === EMPLOYEE_DATA_KEYS.employeeMeta) {
        data.employeeMeta = normalizeObject(row.payload);
      } else if (row?.data_key === EMPLOYEE_DATA_KEYS.employeePermissions) {
        data.employeePermissions = normalizeObject(row.payload);
      }
    });
  }

  return data;
}

async function upsertEmployeeData(mode, incomingData) {
  const existingData = await readEmployeeData(mode);
  const mergedData = mergeEmployeeData(existingData, incomingData);
  const rows = [
    {
      data_mode: mode,
      data_key: EMPLOYEE_DATA_KEYS.employees,
      payload: mergedData.employees,
      updated_at: new Date().toISOString()
    },
    {
      data_mode: mode,
      data_key: EMPLOYEE_DATA_KEYS.employeeMeta,
      payload: mergedData.employeeMeta,
      updated_at: new Date().toISOString()
    },
    {
      data_mode: mode,
      data_key: EMPLOYEE_DATA_KEYS.employeePermissions,
      payload: mergedData.employeePermissions,
      updated_at: new Date().toISOString()
    }
  ];

  await supabaseRequest("employee_data?on_conflict=data_mode,data_key", {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=minimal"
    },
    body: JSON.stringify(rows)
  });

  return readEmployeeData(mode);
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
      const employeeData = await readEmployeeData(mode);
      sendJson(res, 200, { success: true, ...employeeData });
      return;
    }

    if (method === "POST" || method === "PUT") {
      const payload = parseBody(req);
      const mode = normalizeMode(payload?.mode || req.query?.mode);
      const employeeData = await upsertEmployeeData(mode, {
        employees: payload?.employees,
        employeeMeta: payload?.employeeMeta,
        employeePermissions: payload?.employeePermissions
      });
      sendJson(res, 200, { success: true, ...employeeData });
      return;
    }

    sendJson(res, 405, { success: false, message: "Method not allowed" });
  } catch (error) {
    console.error("[employee-data-api]", {
      message: error instanceof Error ? error.message : String(error),
      details: error?.details || null
    });
    sendJson(res, error?.statusCode || 500, {
      success: false,
      message: error?.message || "Medewerkerdata kon niet centraal worden verwerkt."
    });
  }
}

module.exports = handler;
