"use strict";

const MAX_PDF_BYTES = 3 * 1024 * 1024;
const MAX_JSON_BYTES = 4.25 * 1024 * 1024;
const SERVER_PARSER_VERSION = "pdfjs-server-v2";

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

function hasDeliveryProductKeyword(value) {
  return /\b(?:ongesneden|gesneden|brood|bus|mandje|warm|saucijs|saucijzen|breudje|broodje|bol|bollen|gebak|stokbrood|volkoren|tarwe|wit|witte|vlaai|koek|desem|prokorn|oeoerenwit|waldkorn|spelt|meergr|appelrondje|appelcake|bavar|vruchtenschelp|vierkantje|krentewegge|rozijnenbrood|rozijnenbol|poesta|duutse|kneud|hollands|grof|ruwe|bolster|gesort|gesorteerd|croissant|pistolet)\b/i.test(String(value || ""));
}

function isTrailingCountProductText(value) {
  const text = String(value || "").trim();

  if (
    !text ||
    isCountText(text) ||
    isColumnHeaderLabel(text) ||
    isColumnStopCodeText(text) ||
    isColumnPostcodeText(text) ||
    isColumnTimeText(text)
  ) {
    return false;
  }

  if (isColumnAddressText(text) && !hasDeliveryProductKeyword(text)) {
    return false;
  }

  return /^(?!\d{1,2}:\d{2})(?=.*[A-Za-z]).+\s+\d+[,.]?\d*$/.test(text) &&
    hasDeliveryProductKeyword(text);
}

function formatColumnProductLine(countText, productText) {
  const count = normalizePdfText(countText);
  const product = normalizePdfText(productText);

  if (/^heel\s+ONGESNEDEN\b/i.test(product)) {
    return normalizePdfText(`${product} ${count}`);
  }

  return normalizePdfText(`${count} ${product}`);
}

function isProductCandidateText(value) {
  const text = String(value || "").trim();

  if (!/[A-Za-zÀ-ÿ]/.test(text)) {
    return false;
  }

  if (/^(?:pagina|woensdag|bezorgingen|selecties|afleveradres|adressen zonder|bijzonderheden|nr|betaald|tijd|plaats|adres|omschrijving|postcode|trial mode|afdrukdatum)$/i.test(text)) {
    return false;
  }

  if (/\b(?:straat|weg|laan|plein|hof|postcode|neede|borculo|eibergen|haarlo|gaanderen)\b/i.test(text) && !hasDeliveryProductKeyword(text)) {
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
      text: formatColumnProductLine(countItem.text, match.text),
      source: "column-pair"
    });
  });

  items
    .filter((item) =>
      isTrailingCountProductText(item.text) &&
      item.y < 330 &&
      item.text.length <= 90
    )
    .forEach((item) => {
      productLines.push({
        page: item.page,
        x: item.x,
        y: item.y,
        text: normalizePdfText(item.text),
        source: "trailing-count"
      });
    });

  return productLines;
}

function isColumnStopCodeText(value) {
  return /^\d{4}[A-Z]{2}\d+(?:-\d+)?$/i.test(String(value || "").trim());
}

function isColumnPostcodeText(value) {
  return /\b\d{4}\s?[A-Z]{2}\b/i.test(String(value || "").trim());
}

function isColumnAddressText(value) {
  return /\b(?:straat|laan|weg|plein|hof|pad|dijk|kade|singel|steeg|plantsoen|boulevard|blik)\b/i.test(String(value || "").trim()) ||
    /\b\d+[a-z]?(?:-\d+)?\b/i.test(String(value || "").trim());
}

function isColumnTimeText(value) {
  return /^(?:(?:voor|vanaf)\s*)?\d{1,2}:\d{2}(?:\s*(?:\/|\u2013|-|tot)\s*\d{1,2}:\d{2})?$/i.test(String(value || "").trim());
}

function normalizeTimeWindowText(value) {
  const text = String(value || "").trim();
  const match = text.match(/^(?:(voor|vanaf)\s*)?(\d{1,2}:\d{2})(?:\s*(?:\/|\u2013|-|tot)\s*(\d{1,2}:\d{2}))?$/i);

  if (!match) {
    return "";
  }

  const prefix = match[1] ? `${match[1].toLowerCase()} ` : "";
  return match[3] ? `${prefix}${match[2]} / ${match[3]}` : `${prefix}${match[2]}`;
}

function isColumnHeaderLabel(value) {
  return /^(?:selecties|afleveradres|adres|postcode|bezorgingen|afdrukdatum:?|trial mode|pagina:?|nr)$/i.test(String(value || "").trim());
}

function getRowText(row) {
  return row.items
    .slice()
    .sort((itemA, itemB) => itemA.x - itemB.x || itemA.index - itemB.index)
    .map((item) => item.text)
    .join(" ");
}

function getItemsForColumn(row, anchors, columnIndex) {
  if (!row || !Array.isArray(row.items) || !anchors[columnIndex]) {
    return [];
  }

  const { left, right } = getColumnBounds(anchors, columnIndex);

  return row.items
    .filter((item) =>
      item.x >= left &&
      item.x < right &&
      !isColumnHeaderLabel(item.text)
    )
    .sort((itemA, itemB) => itemA.x - itemB.x || itemA.index - itemB.index);
}

function getColumnBounds(anchors, columnIndex) {
  const anchor = anchors[columnIndex];

  return {
    left: columnIndex === 0
      ? -Infinity
      : (anchors[columnIndex - 1].x + anchor.x) / 2,
    right: columnIndex >= anchors.length - 1
      ? Infinity
      : (anchor.x + anchors[columnIndex + 1].x) / 2
  };
}

function getColumnProductLinesForAnchor(rows, anchors, columnIndex, customerName = "") {
  if (!Array.isArray(rows) || !anchors[columnIndex]) {
    return [];
  }

  const { left, right } = getColumnBounds(anchors, columnIndex);
  const columnTolerance = 4;
  const items = rows.flatMap((row) => Array.isArray(row.items) ? row.items : []);
  const normalizedCustomerName = normalizePdfText(customerName).toLowerCase();
  const productItems = items.filter((item) =>
    item.x >= left &&
    item.x < right &&
    isProductCandidateText(item.text) &&
    normalizePdfText(item.text).toLowerCase() !== normalizedCustomerName &&
    item.y < 220 &&
    item.text.length <= 90
  );
  const countItems = items.filter((item) =>
    item.x >= left - columnTolerance &&
    item.x < right + columnTolerance &&
    isCountText(item.text) &&
    item.y >= 220 &&
    item.y <= 330
  );
  const productLines = [];

  countItems.forEach((countItem) => {
    const match = productItems
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
      )[0]?.productItem || null;

    if (match) {
      productLines.push(formatColumnProductLine(countItem.text, match.text));
    }
  });

  items
    .filter((item) =>
      item.x >= left &&
      item.x < right &&
      isTrailingCountProductText(item.text) &&
      normalizePdfText(item.text).toLowerCase() !== normalizedCustomerName &&
      item.y < 330 &&
      item.text.length <= 90
    )
    .forEach((item) => {
      productLines.push(normalizePdfText(item.text));
    });

  return [...new Set(productLines)];
}

function getColumnLayout(rows) {
  const nameRow = findColumnStopNameRow(rows);
  const postcodeRow = findColumnPostcodeRow(rows);
  const addressRow = findColumnAddressRow(rows);
  const timeRow = findColumnTimeRow(rows);

  if (!nameRow || !postcodeRow || !addressRow) {
    return {
      nameRow,
      postcodeRow,
      addressRow,
      timeRow,
      anchors: []
    };
  }

  return {
    nameRow,
    postcodeRow,
    addressRow,
    timeRow,
    anchors: postcodeRow.items
      .filter((item) => isColumnPostcodeText(item.text))
      .sort((itemA, itemB) => itemA.x - itemB.x || itemA.index - itemB.index)
  };
}

function findColumnStopNameRow(rows) {
  return rows
    .filter((row) => row.y >= 60 && row.y <= 82)
    .map((row) => {
      const text = getRowText(row);
      const hasExplicitLabel = /\b(?:selecties|afleveradres)\b/i.test(text);
      const usefulItems = row.items.filter((item) => !isColumnHeaderLabel(item.text));
      const productWordCount = usefulItems.filter((item) =>
        /\b(?:mandje|bus|warm|saucijs|bol|gebak|stokbrood|tarwe|wit|volkoren|half|ongesneden|bezorgen)\b/i.test(item.text)
      ).length;

      return {
        row,
        score: (hasExplicitLabel ? 20 : 0) +
          (82 - Math.abs(78 - row.y)) -
          productWordCount * 3 +
          Math.min(usefulItems.length, 8)
      };
    })
    .filter((candidate) => candidate.row.items.some((item) => /[A-Za-z]/.test(item.text)))
    .sort((candidateA, candidateB) => candidateB.score - candidateA.score)[0]?.row || null;
}

function findColumnPostcodeRow(rows) {
  return rows
    .filter((row) => row.y >= 340 && row.y <= 395)
    .sort((rowA, rowB) =>
      rowB.items.filter((item) => isColumnPostcodeText(item.text)).length -
      rowA.items.filter((item) => isColumnPostcodeText(item.text)).length
    )[0] || null;
}

function findColumnAddressRow(rows) {
  return rows
    .filter((row) => row.y >= 205 && row.y <= 245)
    .sort((rowA, rowB) =>
      rowB.items.filter((item) => isColumnAddressText(item.text)).length -
      rowA.items.filter((item) => isColumnAddressText(item.text)).length
    )[0] || null;
}

function findColumnTimeRow(rows) {
  return rows
    .filter((row) => row.y >= 480 && row.y <= 545)
    .sort((rowA, rowB) =>
      rowB.items.filter((item) => isColumnTimeText(item.text)).length -
      rowA.items.filter((item) => isColumnTimeText(item.text)).length
    )[0] || null;
}

function getColumnStopHeaderLines(rows) {
  const { nameRow, addressRow, timeRow, anchors } = getColumnLayout(rows);

  if (!nameRow || !addressRow) {
    return [];
  }

  if (!anchors.length) {
    return [];
  }

  const codeRows = rows.filter((row) => row.y <= 25);
  const headerLines = [];

  anchors.forEach((anchor, columnIndex) => {
    const customerName = normalizePdfText(getItemsForColumn(nameRow, anchors, columnIndex).map((item) => item.text).join(" "));
    const address = normalizePdfText(getItemsForColumn(addressRow, anchors, columnIndex).map((item) => item.text).join(" "));
    const postcode = normalizePdfText(anchor.text);
    const timeWindow = normalizeTimeWindowText(getItemsForColumn(timeRow, anchors, columnIndex)
      .map((item) => item.text)
      .find((text) => isColumnTimeText(text)) || "");
    const stopCode = normalizePdfText(codeRows
      .flatMap((row) => getItemsForColumn(row, anchors, columnIndex))
      .find((item) => isColumnStopCodeText(item.text))?.text || "");

    if (!customerName || !address || !postcode) {
      return;
    }

    headerLines.push(normalizePdfText(`STOPHEADER ${stopCode} | ${customerName} | ${address} | ${postcode}${timeWindow ? ` | ${timeWindow}` : ""}`));
    getColumnProductLinesForAnchor(rows, anchors, columnIndex, customerName).forEach((productLine) => {
      headerLines.push(normalizePdfText(`STOPPRODUCT ${stopCode} | ${customerName} | ${productLine}`));
    });
  });

  return [...new Set(headerLines)];
}

function getTimeConfidenceFromHeaderLine(line) {
  const parts = String(line || "").split("|").map((part) => normalizePdfText(part));
  const timePart = parts[4] || "";

  if (!timePart) {
    return "ontbreekt";
  }

  return /^(?:voor|vanaf)\s+\d{1,2}:\d{2}$/i.test(timePart) ? "onzeker" : "zeker";
}

function getProductLineFromStopProductLine(line) {
  return normalizePdfText(String(line || "").split("|").slice(2).join("|"));
}

function isParserProductReportCandidate(line) {
  const text = normalizePdfText(line);

  if (
    !text ||
    /^STOP(?:HEADER|PRODUCT)\b/i.test(text) ||
    isColumnHeaderLabel(text) ||
    isColumnTimeText(text) ||
    isColumnPostcodeText(text) ||
    isColumnStopCodeText(text) ||
    (isColumnAddressText(text) && !hasDeliveryProductKeyword(text))
  ) {
    return false;
  }

  return isTrailingCountProductText(text) ||
    (/^\d+[,.]?\d*\s+\S+/.test(text) && hasDeliveryProductKeyword(text));
}

function getServerParserReport({ pageReports = [], lines = [] } = {}) {
  const normalizedLines = Array.isArray(lines) ? lines : [];
  const stopHeaderLines = normalizedLines.filter((line) => /^STOPHEADER\b/i.test(line));
  const stopProductLines = normalizedLines.filter((line) => /^STOPPRODUCT\b/i.test(line));
  const linkedProductLines = new Set(stopProductLines.map(getProductLineFromStopProductLine).filter(Boolean));
  const trailingCountProductLines = stopProductLines.filter((line) => {
    const productLine = getProductLineFromStopProductLine(line);
    return /^(?!\d+[,.]?\d*\s)(?=.*[A-Za-z]).+\s+\d+[,.]?\d*$/.test(productLine);
  });
  const unlinkedProductCandidates = [...new Set(normalizedLines
    .filter((line) => isParserProductReportCandidate(line) && !linkedProductLines.has(normalizePdfText(line)))
    .map(normalizePdfText))];
  const timeStats = stopHeaderLines.reduce((stats, line) => {
    const confidence = getTimeConfidenceFromHeaderLine(line);
    stats[confidence] += 1;
    return stats;
  }, {
    zeker: 0,
    onzeker: 0,
    ontbreekt: 0
  });

  return {
    version: SERVER_PARSER_VERSION,
    readMode: "hybride kolomreconstructie",
    pages: pageReports,
    stops: stopHeaderLines.length,
    strongColumnPages: pageReports.filter((page) => page.columnCount > 0 && page.stopCount > 0).length,
    productRulesLinked: stopProductLines.length,
    productRulesUnlinked: unlinkedProductCandidates.length,
    unlinkedProductLines: unlinkedProductCandidates.slice(0, 10),
    trailingCountProductRules: trailingCountProductLines.length,
    timeConfidence: timeStats,
    pdfOrder: stopHeaderLines.map((line, index) => ({
      index: index + 1,
      label: normalizePdfText(line.replace(/^STOPHEADER\s+[^|]*\|\s*/i, "").split("|")[0] || line)
    })).slice(0, 40),
    quality: stopHeaderLines.length ? "OK" : "geblokkeerd"
  };
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
    return {
      lines: [],
      report: {
        page: pageNumber,
        itemCount: 0,
        rowCount: 0,
        columnCount: 0,
        stopCount: 0,
        productRuleCount: 0,
        trailingCountProductRuleCount: 0,
        time: { zeker: 0, onzeker: 0, ontbreekt: 0 }
      }
    };
  }

  const hasUsefulPositions = items.some((item) => item.x || item.y);

  if (!hasUsefulPositions) {
    const lines = items
      .map((item) => item.text)
      .join(" ")
      .split(/\s{2,}/)
      .map(normalizePdfText)
      .filter(Boolean);
    return {
      lines,
      report: {
        page: pageNumber,
        itemCount: items.length,
        rowCount: 0,
        columnCount: 0,
        stopCount: 0,
        productRuleCount: 0,
        trailingCountProductRuleCount: 0,
        time: { zeker: 0, onzeker: 0, ontbreekt: 0 }
      }
    };
  }

  const rows = getPageRows(items);
  const rowLines = getRowLines(rows);
  const columnStopHeaderLines = getColumnStopHeaderLines(rows);
  const columnProductLines = getColumnProductLines(items)
    .map((item) => item.text)
    .filter(Boolean);
  const layout = getColumnLayout(rows);
  const pageLines = [...columnStopHeaderLines, ...rowLines, ...columnProductLines];
  const stopLines = columnStopHeaderLines.filter((line) => /^STOPHEADER\b/i.test(line));
  const productLines = columnStopHeaderLines.filter((line) => /^STOPPRODUCT\b/i.test(line));
  const timeStats = stopLines.reduce((stats, line) => {
    const confidence = getTimeConfidenceFromHeaderLine(line);
    stats[confidence] += 1;
    return stats;
  }, {
    zeker: 0,
    onzeker: 0,
    ontbreekt: 0
  });

  return {
    lines: pageLines,
    report: {
      page: pageNumber,
      itemCount: items.length,
      rowCount: rows.length,
      columnCount: layout.anchors.length,
      stopCount: stopLines.length,
      productRuleCount: productLines.length,
      trailingCountProductRuleCount: productLines.filter((line) => {
        const productLine = getProductLineFromStopProductLine(line);
        return /^(?!\d+[,.]?\d*\s)(?=.*[A-Za-z]).+\s+\d+[,.]?\d*$/.test(productLine);
      }).length,
      time: timeStats,
      pdfOrder: stopLines.map((line, index) => ({
        index: index + 1,
        label: normalizePdfText(line.replace(/^STOPHEADER\s+[^|]*\|\s*/i, "").split("|")[0] || line)
      }))
    }
  };
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
  const pageReports = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent({
      disableCombineTextItems: false,
      includeMarkedContent: false
    });

    const pageResult = extractPageLines(textContent, pageNumber);
    lines.push(...pageResult.lines);
    pageReports.push(pageResult.report);
    page.cleanup?.();
  }

  await pdf.destroy?.();

  if (!lines.length) {
    warnings.push("Serverparser vond geen tekst. Mogelijk is dit een scan-PDF of gebruikt de PDF een niet-ondersteunde codering.");
  }

  return {
    lines,
    warnings,
    report: getServerParserReport({ pageReports, lines })
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
      parser: SERVER_PARSER_VERSION,
      lines: parsed.lines,
      warnings: parsed.warnings,
      report: parsed.report
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
      parser: SERVER_PARSER_VERSION,
      lines: [],
      warnings: [message],
      message
    });
  }
};
