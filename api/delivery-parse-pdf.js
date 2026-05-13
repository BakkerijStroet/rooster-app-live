"use strict";

const MAX_PDF_BYTES = 3 * 1024 * 1024;
const MAX_JSON_BYTES = 4.25 * 1024 * 1024;

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function parseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    throw createHttpError(400, "Ongeldige JSON-body.");
  }
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isJsonRequest(req) {
  return String(req.headers?.["content-type"] || "")
    .toLowerCase()
    .split(";")[0]
    .trim() === "application/json";
}

async function readRequestBody(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return req.body;
  }

  if (typeof req.body === "string") {
    return parseJson(req.body);
  }

  if (Buffer.isBuffer(req.body)) {
    return parseJson(req.body.toString("utf8"));
  }

  const chunks = [];
  let totalBytes = 0;

  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    totalBytes += buffer.length;

    if (totalBytes > MAX_JSON_BYTES) {
      throw createHttpError(413, "Aanvraag is te groot. Gebruik een PDF van maximaal 3 MB.");
    }

    chunks.push(buffer);
  }

  if (!chunks.length) {
    return {};
  }

  return parseJson(Buffer.concat(chunks).toString("utf8"));
}

function normalizeBase64(value) {
  const rawValue = normalizeText(value);
  const commaIndex = rawValue.indexOf(",");
  const base64 = rawValue.startsWith("data:")
    ? rawValue.slice(commaIndex + 1)
    : rawValue;

  return base64.replace(/\s+/g, "");
}

function decodePdfBase64(value) {
  const base64 = normalizeBase64(value);

  if (!base64 || !/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) {
    throw createHttpError(400, "PDF-inhoud ontbreekt of is geen geldige base64.");
  }

  const estimatedBytes = Math.floor((base64.length * 3) / 4);

  if (estimatedBytes > MAX_PDF_BYTES + 2) {
    throw createHttpError(413, "PDF is te groot. Gebruik maximaal 3 MB.");
  }

  const buffer = Buffer.from(base64, "base64");

  if (buffer.length > MAX_PDF_BYTES) {
    throw createHttpError(413, "PDF is te groot. Gebruik maximaal 3 MB.");
  }

  if (buffer.slice(0, 5).toString("utf8") !== "%PDF-") {
    throw createHttpError(400, "Bestand lijkt geen geldige PDF.");
  }

  return buffer;
}

function normalizePdfText(value) {
  return String(value || "")
    .replace(/\u0000/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getItemPosition(item) {
  const transform = Array.isArray(item?.transform) ? item.transform : [];
  return {
    x: Number.isFinite(transform[4]) ? transform[4] : 0,
    y: Number.isFinite(transform[5]) ? transform[5] : 0,
    width: Number.isFinite(item?.width) ? item.width : 0,
    height: Number.isFinite(item?.height) ? item.height : 0
  };
}

function isCountText(value) {
  return /^(?:\d+[,.]?\d*|\d+\s*x|x\s*\d+)$/.test(String(value || "").trim());
}

function isProductCandidateText(value) {
  const text = String(value || "").trim();

  if (!/[A-Za-zÀ-ÿ]/.test(text)) {
    return false;
  }

  if (/^(?:pagina|woensdag|bezorgingen|selecties|afleveradres|adressen zonder|bijzonderheden|nr|betaald|tijd|plaats|adres|omschrijving|postcode|trial mode|afdrukdatum)$/i.test(text)) {
    return false;
  }

  if (/\b(?:straat|weg|laan|plein|hof|postcode|neede|borculo|eibergen|haarlo|gaanderen)\b/i.test(text) && !/\b(?:brood|bus|mandje|warm|saucijs|bol|gebak|stokbrood|volkoren|tarwe|wit|vlaai|koek|desem)\b/i.test(text)) {
    return false;
  }

  return true;
}

function getPageRows(items) {
  const sortedItems = [...items].sort((itemA, itemB) => {
    const yDelta = itemB.y - itemA.y;

    if (Math.abs(yDelta) > 2) {
      return yDelta;
    }

    return itemA.x - itemB.x || itemA.index - itemB.index;
  });
  const rows = [];

  sortedItems.forEach((item) => {
    let row = rows.find((candidate) => Math.abs(candidate.y - item.y) <= 2);

    if (!row) {
      row = { page: item.page, y: item.y, items: [] };
      rows.push(row);
    }

    row.items.push(item);
  });

  return rows.sort((rowA, rowB) => rowB.y - rowA.y);
}

function getRowLines(rows) {
  return rows
    .map((row) => row.items
      .sort((itemA, itemB) => itemA.x - itemB.x || itemA.index - itemB.index)
      .map((item) => item.text)
      .join(" "))
    .map(normalizePdfText)
    .filter(Boolean);
}

function getColumnProductLines(items) {
  const productItems = items.filter((item) =>
    isProductCandidateText(item.text) &&
    item.y < 220 &&
    item.text.length <= 90
  );
  const countItems = items.filter((item) =>
    isCountText(item.text) &&
    item.y >= 220 &&
    item.y <= 330
  );
  const productLines = [];

  countItems.forEach((countItem) => {
    const candidates = productItems
      .map((productItem) => ({
        productItem,
        xDelta: Math.abs(productItem.x - countItem.x),
        yDelta: Math.abs(productItem.y - countItem.y)
      }))
      .filter((candidate) => candidate.xDelta <= 3.5)
      .sort((candidateA, candidateB) =>
        candidateA.xDelta - candidateB.xDelta ||
        candidateA.yDelta - candidateB.yDelta ||
        candidateA.productItem.index - candidateB.productItem.index
      );
    const match = candidates[0]?.productItem || null;

    if (!match) {
      return;
    }

    productLines.push({
      page: countItem.page,
      x: countItem.x,
      y: countItem.y,
      text: normalizePdfText(`${countItem.text} ${match.text}`),
      source: "column-pair"
    });
  });

  return productLines;
}

function extractPageLines(textContent, pageNumber) {
  const items = (Array.isArray(textContent?.items) ? textContent.items : [])
    .map((item, index) => ({
      index,
      page: pageNumber,
      text: normalizePdfText(item?.str),
      hasEol: Boolean(item?.hasEOL),
      ...getItemPosition(item)
    }))
    .filter((item) => item.text);

  if (!items.length) {
    return [];
  }

  const hasUsefulPositions = items.some((item) => item.x || item.y);

  if (!hasUsefulPositions) {
    return items
      .map((item) => item.text)
      .join(" ")
      .split(/\s{2,}/)
      .map(normalizePdfText)
      .filter(Boolean);
  }

  const rows = getPageRows(items);
  const rowLines = getRowLines(rows);
  const columnProductLines = getColumnProductLines(items)
    .map((item) => item.text)
    .filter(Boolean);

  return [...rowLines, ...columnProductLines];
}

function ensurePdfjsDomStubs() {
  if (typeof Promise.withResolvers !== "function") {
    Promise.withResolvers = function withResolvers() {
      let resolve;
      let reject;
      const promise = new Promise((promiseResolve, promiseReject) => {
        resolve = promiseResolve;
        reject = promiseReject;
      });

      return { promise, resolve, reject };
    };
  }

  if (typeof globalThis.Blob !== "function") {
    globalThis.Blob = require("node:buffer").Blob;
  }

  if (typeof globalThis.DOMMatrix !== "function") {
    globalThis.DOMMatrix = class DOMMatrix {
      constructor(init) {
        const values = Array.isArray(init) ? init : [];
        this.a = Number.isFinite(values[0]) ? values[0] : 1;
        this.b = Number.isFinite(values[1]) ? values[1] : 0;
        this.c = Number.isFinite(values[2]) ? values[2] : 0;
        this.d = Number.isFinite(values[3]) ? values[3] : 1;
        this.e = Number.isFinite(values[4]) ? values[4] : 0;
        this.f = Number.isFinite(values[5]) ? values[5] : 0;
      }

      multiplySelf() {
        return this;
      }

      preMultiplySelf() {
        return this;
      }

      translateSelf() {
        return this;
      }

      scaleSelf() {
        return this;
      }

      rotateSelf() {
        return this;
      }

      invertSelf() {
        return this;
      }

      transformPoint(point = {}) {
        return {
          x: Number(point.x) || 0,
          y: Number(point.y) || 0
        };
      }
    };
  }

  if (typeof globalThis.ImageData !== "function") {
    globalThis.ImageData = class ImageData {
      constructor(data, width, height) {
        this.data = data;
        this.width = width;
        this.height = height;
      }
    };
  }

  if (typeof globalThis.Path2D !== "function") {
    globalThis.Path2D = class Path2D {};
  }
}

async function getPdfjsDocument(buffer) {
  ensurePdfjsDomStubs();
  const [pdfjs, pdfjsWorker] = await Promise.all([
    import("pdfjs-dist/legacy/build/pdf.mjs"),
    import("pdfjs-dist/legacy/build/pdf.worker.mjs")
  ]);
  globalThis.pdfjsWorker = pdfjsWorker;

  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(buffer),
    disableFontFace: true,
    isEvalSupported: false,
    useSystemFonts: true
  });

  return loadingTask.promise;
}

async function parsePdfLines(buffer) {
  const pdf = await getPdfjsDocument(buffer);
  const warnings = [];
  const lines = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent({
      disableCombineTextItems: false,
      includeMarkedContent: false
    });

    lines.push(...extractPageLines(textContent, pageNumber));
    page.cleanup?.();
  }

  await pdf.destroy?.();

  if (!lines.length) {
    warnings.push("Serverparser vond geen tekst. Mogelijk is dit een scan-PDF of gebruikt de PDF een niet-ondersteunde codering.");
  }

  return {
    lines,
    warnings
  };
}

function validateInput(input) {
  const mode = normalizeText(input?.mode);
  const sourceFilename = normalizeText(input?.sourceFilename || input?.source_filename);
  const sourceHash = normalizeText(input?.sourceHash || input?.source_hash);

  if (mode !== "test") {
    throw createHttpError(400, "Alleen mode=test is toegestaan voor de serverparser.");
  }

  if (!sourceFilename || !sourceFilename.toLowerCase().endsWith(".pdf")) {
    throw createHttpError(400, "Bronbestandsnaam ontbreekt of is geen PDF.");
  }

  if (!sourceHash) {
    throw createHttpError(400, "Bronhash ontbreekt.");
  }

  return {
    mode,
    sourceFilename,
    sourceHash,
    pdfBuffer: decodePdfBase64(input?.fileBase64)
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    sendJson(res, 405, {
      success: false,
      message: "Methode niet toegestaan. Gebruik POST."
    });
    return;
  }

  if (!isJsonRequest(req)) {
    sendJson(res, 415, {
      success: false,
      message: "Gebruik application/json."
    });
    return;
  }

  try {
    const body = await readRequestBody(req);
    const input = validateInput(body);
    const parsed = await parsePdfLines(input.pdfBuffer);

    sendJson(res, 200, {
      success: true,
      parser: "pdfjs-server-v1",
      lines: parsed.lines,
      warnings: parsed.warnings
    });
  } catch (error) {
    const statusCode = Number.isInteger(error?.statusCode) ? error.statusCode : 500;
    const rawMessage = error?.message || "Onbekende serverparser-fout.";
    const message = statusCode >= 500
      ? `PDF kon server-side niet worden gelezen: ${rawMessage}`
      : rawMessage;

    console.error("[delivery-parse-pdf]", rawMessage);

    sendJson(res, statusCode, {
      success: false,
      parser: "pdfjs-server-v1",
      lines: [],
      warnings: [message],
      message
    });
  }
};
