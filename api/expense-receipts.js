"use strict";

const RECEIPT_KIND_VALUES = ["fuel", "supermarket", "bakery_purchase", "other"];
const RECEIPT_PAID_WITH_VALUES = ["employee_advance", "business_account", "cash", "other"];
const RECEIPT_STATUS_VALUES = ["new", "approved", "rejected", "processed"];
const RECEIPT_PHOTO_BUCKET = "expense-receipts";
const RECEIPT_PHOTO_ALLOWED_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp"
};
const RECEIPT_PHOTO_MAX_BYTES = 2 * 1024 * 1024;
const RECEIPT_PHOTO_SIGNED_URL_SECONDS = 10 * 60;

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

async function storageRequest(path, options = {}) {
  const { url, serviceKey } = getSupabaseConfig();

  if (!url || !serviceKey) {
    const error = new Error("Supabase configuratie ontbreekt.");
    error.statusCode = 503;
    throw error;
  }

  const response = await fetch(`${url}/storage/v1/${path}`, {
    ...options,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
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
    const error = new Error(typeof payload === "string" ? payload : (payload?.message || "Supabase Storage request mislukt."));
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

function normalizeReceiptStatus(value) {
  const text = normalizeText(value);

  if (!RECEIPT_STATUS_VALUES.includes(text)) {
    const error = new Error("Kies een geldige status voor de bon.");
    error.statusCode = 400;
    throw error;
  }

  return text;
}

function normalizeReceiptId(value) {
  const text = normalizeText(value);

  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(text)) {
    const error = new Error("Bon-id ontbreekt of is ongeldig.");
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

function normalizeBase64(value) {
  const rawValue = normalizeText(value);
  const dataUrlMatch = rawValue.match(/^data:([^;,]+);base64,(.+)$/i);
  const base64 = dataUrlMatch ? dataUrlMatch[2] : rawValue;

  return base64.replace(/\s+/g, "");
}

function validatePhotoMagic(buffer, mimeType) {
  if (mimeType === "image/jpeg") {
    return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  if (mimeType === "image/png") {
    return buffer.length >= 8 &&
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a;
  }

  if (mimeType === "image/webp") {
    return buffer.length >= 12 &&
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP";
  }

  return false;
}

function normalizeReceiptPhoto(value) {
  if (!value) {
    return null;
  }

  const mimeType = normalizeText(value?.mimeType || value?.mime_type).toLowerCase();
  const extension = RECEIPT_PHOTO_ALLOWED_TYPES[mimeType];

  if (!extension) {
    const error = new Error("Foto moet een JPEG, PNG of WebP-afbeelding zijn.");
    error.statusCode = 400;
    throw error;
  }

  const base64 = normalizeBase64(value?.base64 || value?.data || value?.dataUrl || value?.data_url);

  if (!base64 || !/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) {
    const error = new Error("Foto ontbreekt of is geen geldige base64.");
    error.statusCode = 400;
    throw error;
  }

  const estimatedBytes = Math.floor((base64.length * 3) / 4);

  if (estimatedBytes > RECEIPT_PHOTO_MAX_BYTES + 2) {
    const error = new Error("Foto is te groot. Gebruik maximaal 2 MB.");
    error.statusCode = 413;
    throw error;
  }

  const buffer = Buffer.from(base64, "base64");

  if (!buffer.length || buffer.length > RECEIPT_PHOTO_MAX_BYTES) {
    const error = new Error("Foto is te groot. Gebruik maximaal 2 MB.");
    error.statusCode = buffer.length ? 413 : 400;
    throw error;
  }

  if (!validatePhotoMagic(buffer, mimeType)) {
    const error = new Error("Foto-inhoud komt niet overeen met het bestandstype.");
    error.statusCode = 400;
    throw error;
  }

  return {
    buffer,
    mimeType,
    extension,
    sizeBytes: buffer.length
  };
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
    remark: normalizeText(value?.remark).slice(0, 500),
    photo: normalizeReceiptPhoto(value?.photo)
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
    statusUpdatedAt: row.status_updated_at || "",
    statusUpdatedBy: row.status_updated_by || "",
    photoPath: row.photo_path || "",
    photoMimeType: row.photo_mime_type || "",
    photoSizeBytes: Number(row.photo_size_bytes) || 0,
    photoUrl: row.photo_url || "",
    createdAt: row.created_at || "",
    updatedAt: row.updated_at || "",
    deletedAt: row.deleted_at || ""
  };
}

function getReceiptPhotoPath(receipt, photo) {
  const mode = receipt.dataMode === "test" ? "test" : "live";
  const dateParts = String(receipt.receiptDate || new Date().toISOString().slice(0, 10)).split("-");
  const year = dateParts[0] || new Date().getFullYear();
  const month = dateParts[1] || String(new Date().getMonth() + 1).padStart(2, "0");

  return `${mode}/${year}/${month}/${receipt.id}.${photo.extension}`;
}

async function uploadReceiptPhoto(path, photo) {
  await storageRequest(`object/${encodeURIComponent(RECEIPT_PHOTO_BUCKET)}/${path.split("/").map(encodeURIComponent).join("/")}`, {
    method: "POST",
    headers: {
      "Content-Type": photo.mimeType,
      "Cache-Control": "31536000",
      "x-upsert": "false"
    },
    body: photo.buffer
  });
}

async function updateReceiptPhotoMetadata(receipt, photoPath, photo) {
  const rows = await supabaseRequest(`expense_receipts?data_mode=eq.${encodeURIComponent(receipt.dataMode)}&id=eq.${encodeURIComponent(receipt.id)}&deleted_at=is.null`, {
    method: "PATCH",
    headers: {
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      photo_path: photoPath,
      photo_mime_type: photo.mimeType,
      photo_size_bytes: photo.sizeBytes
    })
  });

  return Array.isArray(rows) ? toApiReceipt(rows[0]) : toApiReceipt(rows);
}

async function softDeleteReceipt(receipt) {
  if (!receipt?.id) {
    return;
  }

  try {
    await supabaseRequest(`expense_receipts?data_mode=eq.${encodeURIComponent(receipt.dataMode)}&id=eq.${encodeURIComponent(receipt.id)}&deleted_at=is.null`, {
      method: "PATCH",
      headers: {
        Prefer: "return=minimal"
      },
      body: JSON.stringify({
        deleted_at: new Date().toISOString()
      })
    });
  } catch {
    // Best-effort cleanup only; keep the original upload error visible to the caller.
  }
}

async function createSignedPhotoUrl(photoPath) {
  const path = normalizeText(photoPath);

  if (!path) {
    return "";
  }

  const payload = await storageRequest(`object/sign/${encodeURIComponent(RECEIPT_PHOTO_BUCKET)}/${path.split("/").map(encodeURIComponent).join("/")}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      expiresIn: RECEIPT_PHOTO_SIGNED_URL_SECONDS
    })
  });
  const signedUrl = normalizeText(payload?.signedURL || payload?.signedUrl || payload?.url);

  if (!signedUrl) {
    return "";
  }

  if (/^https?:\/\//i.test(signedUrl)) {
    return signedUrl;
  }

  const { url } = getSupabaseConfig();
  return `${url}/storage/v1${signedUrl.startsWith("/") ? signedUrl : `/${signedUrl}`}`;
}

async function attachSignedPhotoUrls(receipts) {
  return Promise.all(receipts.map(async (receipt) => {
    if (!receipt.photoPath) {
      return receipt;
    }

    try {
      return {
        ...receipt,
        photoUrl: await createSignedPhotoUrl(receipt.photoPath)
      };
    } catch {
      return {
        ...receipt,
        photoUrl: ""
      };
    }
  }));
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
    "select=id,data_mode,receipt_date,employee_name,kind,amount,paid_with,remark,status,admin_note,status_updated_at,status_updated_by,photo_path,photo_mime_type,photo_size_bytes,created_at,updated_at,deleted_at",
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
  const receipts = Array.isArray(rows) ? rows.map(toApiReceipt).filter(Boolean) : [];
  return attachSignedPhotoUrls(receipts);
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

  if (!normalizedInput.photo) {
    return receipt;
  }

  try {
    const photoPath = getReceiptPhotoPath(receipt, normalizedInput.photo);
    await uploadReceiptPhoto(photoPath, normalizedInput.photo);
    const updatedReceipt = await updateReceiptPhotoMetadata(receipt, photoPath, normalizedInput.photo);

    return updatedReceipt
      ? {
          ...updatedReceipt,
          photoUrl: await createSignedPhotoUrl(photoPath)
        }
      : receipt;
  } catch (error) {
    await softDeleteReceipt(receipt);
    throw error;
  }
}

async function updateExpenseReceipt(input) {
  const id = normalizeReceiptId(input?.id);
  const dataMode = normalizeMode(input?.mode || input?.dataMode || input?.data_mode);
  const status = normalizeReceiptStatus(input?.status);
  const adminNote = normalizeText(input?.adminNote || input?.admin_note).slice(0, 1000);
  const statusUpdatedBy = normalizeText(input?.statusUpdatedBy || input?.status_updated_by || input?.updatedBy || input?.updated_by).slice(0, 120);
  const rows = await supabaseRequest(`expense_receipts?data_mode=eq.${encodeURIComponent(dataMode)}&id=eq.${encodeURIComponent(id)}&deleted_at=is.null`, {
    method: "PATCH",
    headers: {
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      status,
      admin_note: adminNote || null,
      status_updated_at: new Date().toISOString(),
      status_updated_by: statusUpdatedBy || null
    })
  });
  const receipt = Array.isArray(rows) ? toApiReceipt(rows[0]) : toApiReceipt(rows);

  if (!receipt) {
    const error = new Error("Bon niet gevonden.");
    error.statusCode = 404;
    throw error;
  }

  const [receiptWithPhotoUrl] = await attachSignedPhotoUrls([receipt]);
  return receiptWithPhotoUrl || receipt;
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

    if (req.method === "PATCH") {
      const body = parseBody(req);
      const receipt = await updateExpenseReceipt(body);

      sendJson(res, 200, { receipt });
      return;
    }

    if (req.method === "POST") {
      const body = parseBody(req);
      const receipt = await createExpenseReceipt(body);

      sendJson(res, 201, { receipt });
      return;
    }

    res.setHeader("Allow", "GET, POST, PATCH");
    sendJson(res, 405, { message: "Methode niet toegestaan." });
  } catch (error) {
    const statusCode = Number(error?.statusCode) || 500;
    sendJson(res, statusCode, {
      message: error?.message || "Bonnen-API mislukt.",
      details: error?.details || null
    });
  }
};
