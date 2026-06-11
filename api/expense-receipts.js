"use strict";

const RECEIPT_KIND_VALUES = ["fuel", "supermarket", "bakery_purchase", "other"];
const RECEIPT_PAID_WITH_VALUES = ["employee_advance", "business_account", "cash", "other"];
const RECEIPT_STATUS_VALUES = ["new", "approved", "rejected", "processed"];

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

function normalizeDate(value) {
  const text = normalizeText(value);

  if (!text) {
    return new Date().toISOString().slice(0, 10);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    const error = new Error("Kies een geldige datum voor de bon.");
    error.statusCode = 400;
    throw error;
  }

  return text;
}

function normalizeReceiptKind(value) {
  const text = normalizeText(value);

  if (!RECEIPT_KIND_VALUES.includes(text)) {
    const error = new Error("Kies een geldig soort bon.");
    error.statusCode = 400;
    throw error;
  }

  return text;
}

function normalizePaidWith(value) {
  const text = normalizeText(value);

  if (!RECEIPT_PAID_WITH_VALUES.includes(text)) {
    const error = new Error("Kies een geldige betaalwijze.");
    error.statusCode = 400;
    throw error;
  }

  return text;
}

function normalizeAmount(value) {
  const rawText = typeof value === "number"
    ? String(value)
    : normalizeText(value).replace(",", ".");
  const amount = Number(rawText);

  if (!Number.isFinite(amount) || amount < 0) {
    const error = new Error("Vul een geldig bedrag in.");
    error.statusCode = 400;
    throw error;
  }

  return Math.round(amount * 100) / 100;
}

function normalizeReceiptInput(value) {
  const employeeName = normalizeText(value?.employeeName || value?.employee_name);

  if (!employeeName) {
    const error = new Error("Medewerker ontbreekt.");
    error.statusCode = 400;
    throw error;
  }

  return {
    dataMode: normalizeMode(value?.mode || value?.dataMode || value?.data_mode),
    receiptDate: normalizeDate(value?.receiptDate || value?.receipt_date),
    employeeName,
    kind: normalizeReceiptKind(value?.kind),
    amount: normalizeAmount(value?.amount),
    paidWith: normalizePaidWith(value?.paidWith || value?.paid_with),
    remark: normalizeText(value?.remark).slice(0, 500)
  };
}

function toApiReceipt(row) {
  if (!row || typeof row !== "object") {
    return null;
  }

  return {
    id: row.id || "",
    dataMode: row.data_mode || "live",
    receiptDate: row.receipt_date || "",
    employeeName: row.employee_name || "",
    kind: row.kind || "",
    amount: Number(row.amount) || 0,
    paidWith: row.paid_with || "",
    remark: row.remark || "",
    status: row.status || "new",
    adminNote: row.admin_note || "",
    photoPath: row.photo_path || "",
    photoMimeType: row.photo_mime_type || "",
    photoSizeBytes: Number(row.photo_size_bytes) || 0,
    createdAt: row.created_at || "",
    updatedAt: row.updated_at || "",
    deletedAt: row.deleted_at || ""
  };
}

function appendOptionalDateFilter(query, columnName, operator, value) {
  const normalizedValue = normalizeText(value);

  if (/^\d{4}-\d{2}-\d{2}$/.test(normalizedValue)) {
    query.push(`${columnName}=${operator}.${encodeURIComponent(normalizedValue)}`);
  }
}

async function readExpenseReceipts(mode, options = {}) {
  const query = [
    `data_mode=eq.${encodeURIComponent(mode)}`,
    "select=id,data_mode,receipt_date,employee_name,kind,amount,paid_with,remark,status,admin_note,photo_path,photo_mime_type,photo_size_bytes,created_at,updated_at,deleted_at",
    "deleted_at=is.null",
    "order=receipt_date.desc,created_at.desc"
  ];

  appendOptionalDateFilter(query, "receipt_date", "gte", options.from);
  appendOptionalDateFilter(query, "receipt_date", "lte", options.to);

  const employeeName = normalizeText(options.employeeName);
  const status = normalizeText(options.status);

  if (employeeName) {
    query.push(`employee_name=eq.${encodeURIComponent(employeeName)}`);
  }

  if (status && RECEIPT_STATUS_VALUES.includes(status)) {
    query.push(`status=eq.${encodeURIComponent(status)}`);
  }

  const rows = await supabaseRequest(`expense_receipts?${query.join("&")}`, { method: "GET" });
  return Array.isArray(rows) ? rows.map(toApiReceipt).filter(Boolean) : [];
}

async function createExpenseReceipt(input) {
  const normalizedInput = normalizeReceiptInput(input);
  const rows = await supabaseRequest("expense_receipts", {
    method: "POST",
    headers: {
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      data_mode: normalizedInput.dataMode,
      receipt_date: normalizedInput.receiptDate,
      employee_name: normalizedInput.employeeName,
      kind: normalizedInput.kind,
      amount: normalizedInput.amount,
      paid_with: normalizedInput.paidWith,
      remark: normalizedInput.remark,
      status: "new"
    })
  });

  const receipt = Array.isArray(rows) ? toApiReceipt(rows[0]) : toApiReceipt(rows);

  if (!receipt) {
    const error = new Error("Bon kon niet worden opgeslagen.");
    error.statusCode = 500;
    throw error;
  }

  return receipt;
}

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const mode = normalizeMode(req.query?.mode || req.query?.dataMode);
      const receipts = await readExpenseReceipts(mode, {
        from: req.query?.from,
        to: req.query?.to,
        employeeName: req.query?.employeeName,
        status: req.query?.status
      });

      sendJson(res, 200, { receipts });
      return;
    }

    if (req.method === "POST") {
      const body = parseBody(req);
      const receipt = await createExpenseReceipt(body);

      sendJson(res, 201, { receipt });
      return;
    }

    res.setHeader("Allow", "GET, POST");
    sendJson(res, 405, { message: "Methode niet toegestaan." });
  } catch (error) {
    const statusCode = Number(error?.statusCode) || 500;
    sendJson(res, statusCode, {
      message: error?.message || "Bonnen-API mislukt.",
      details: error?.details || null
    });
  }
};
