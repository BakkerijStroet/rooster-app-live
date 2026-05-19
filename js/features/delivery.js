(() => {
  const deliveryPanelElement = document.querySelector("[data-panel=\"delivery\"]");
  const startScreenElement = document.getElementById("deliveryStartScreen");
  const dropZoneElement = document.getElementById("deliveryDropZone");
  const startChooseButton = document.getElementById("deliveryStartChooseButton");
  const runStatusBarElement = document.getElementById("deliveryRunStatusBar");
  const controlCardElement = document.getElementById("deliveryControlCard");
  const controlSummaryElement = document.getElementById("deliveryControlSummary");
  const dashboardElement = document.getElementById("deliveryDashboard");
  const actionsOverviewElement = document.getElementById("deliveryActionsOverview");
  const savedRunsElement = document.getElementById("deliverySavedRuns");
  const savedRefreshButton = document.getElementById("deliverySavedRefreshButton");
  const pdfInput = document.getElementById("deliveryPdfInput");
  const statusElement = document.getElementById("deliveryPdfStatus");
  const lineCountElement = document.getElementById("deliveryLineCount");
  const rawPreviewElement = document.getElementById("deliveryRawPreview");
  const recognizedListElement = document.getElementById("deliveryRecognizedList");
  const warningsElement = document.getElementById("deliveryParseWarnings");
  const preparationElement = document.getElementById("deliveryPreparation");
  const driverPreviewElement = document.getElementById("deliveryDriverPreview");
  const routeBlocksElement = document.getElementById("deliveryRouteBlocks");
  const driverPreviewModeElement = document.querySelector(".delivery-driver-preview-mode");
  const stopDetailElement = document.getElementById("deliveryStopDetail");
  const productOverviewElement = document.getElementById("deliveryProductOverview");
  const printPreviewButton = document.getElementById("deliveryPrintPreviewButton");
  const printPreviewElement = document.getElementById("deliveryPrintPreview");

  const POSTCODE_PATTERN = /\b[1-9][0-9]{3}\s?[A-Z]{2}\b/i;
  const ADDRESS_PATTERN = /\b[A-Za-zÀ-ÿ.' -]*(?:straat|laan|weg|plein|hof|pad|dijk|kade|singel|steeg|plantsoen|boulevard)\s+\d+[a-z]?(?:\s*,?\s*[A-Za-zÀ-ÿ.' -]+)?\b/i;
  const STREET_PLACE_PATTERN = /\b[A-Za-zÀ-ÿ.' -]*(?:straat|laan|weg|plein|hof|pad|dijk|kade|singel|steeg|plantsoen|boulevard)\s*,\s*[A-Za-zÀ-ÿ.' -]+\b/i;
  const GENERIC_ADDRESS_PATTERN = /^[A-Za-zÀ-ÿ.' -]+\s+\d+[a-z]?(?:[-/]\d+)?\s*,?\s+[A-Za-zÀ-ÿ.' -]+$/i;
  const PLACE_ONLY_PATTERN = /^(?:Neede|Borculo|Haarlo|Eibergen|Diepenheim)$/i;
  const PRODUCT_COUNT_PATTERN = /^(?:(\d+[,.]?\d*)|(\d+)\s*x|x\s*(\d+))\s+\S+/i;
  const PRODUCT_CATEGORY_ORDER = ["brood", "gebak", "broodjes", "warm"];
  const PAYMENT_STATUS_VALUES = ["OK", "Op rekening", "Niet betaald", "Betaald via Ideal", "Contant", "Pin", "Tikkie"];
  const CURRENT_DELIVERY_PARSER_VERSION = "delivery-local-v2";
  const OLD_PARSER_WARNING = "Deze run is gemaakt met een oudere parser. Upload de PDF opnieuw voor de nieuwste herkenning.";
  const PAYMENT_CORRECTION_OPTIONS = [
    "OK",
    "Op rekening",
    "Niet betaald",
    "Betaald via Ideal",
    "Pin betaald",
    "Contant betaald",
    "Tikkie gestuurd",
    "Controle nodig"
  ];
  const DELIVERY_PROBLEM_TYPES = [
    "Klant niet aanwezig",
    "Product ontbreekt",
    "Verkeerd adres",
    "Te laat geleverd",
    "Betaling probleem",
    "Overig"
  ];
  const CUTTING_PATTERN = /\b(gesneden|snijden|snij|gesn\.?)\b/i;
  const NOT_CUTTING_PATTERN = /\b(ongesneden|niet\s+gesneden|niet\s+snijden)\b/i;
  const WARM_PREPARATION_PATTERN = /\b(warm|saucijs|saucijzen|saucijzenbroodje|appelflap|frikandel|worstenbrood|ham[-\s]?kaas|kaassouffle|kroket|snack|pizza)\b/i;
  let latestRouteStops = [];
  let latestParseWarnings = [];
  let latestDeliveryDate = "";
  let latestSourceFilename = "";
  let latestSourceHash = "";
  let latestParserSource = "";
  let latestUploadDate = "";
  let latestRunSource = "empty";
  let latestRunId = "";
  let latestRunUpdatedAt = "";
  let latestRunBaseUpdatedAt = "";
  let latestSaveState = {
    status: "empty",
    message: "Nog niet opgeslagen"
  };
  let latestHasLocalCorrections = false;
  let latestParserVersionWarning = "";
  let selectedDeliveryStopIndex = -1;

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatFileSize(size) {
    const bytes = Number(size);

    if (!Number.isFinite(bytes) || bytes <= 0) {
      return "";
    }

    if (bytes < 1024 * 1024) {
      return `${Math.round(bytes / 1024)} kB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function formatSavedRunDateTime(value) {
    const date = new Date(value || "");

    if (Number.isNaN(date.getTime())) {
      return "Tijd onbekend";
    }

    return new Intl.DateTimeFormat("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  function formatDateIso(value) {
    const date = value instanceof Date ? value : new Date(value || "");

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function parseDeliveryDateIso(value) {
    const text = String(value || "").trim().toLowerCase();

    if (!text) {
      return "";
    }

    const numericMatch = text.match(/\b([0-3]?\d)[-/.]([01]?\d)[-/.]((?:20)?\d{2})\b/) ||
      text.match(/\b((?:20)?\d{2})[-/.]([01]?\d)[-/.]([0-3]?\d)\b/);

    if (numericMatch) {
      const isYearFirst = numericMatch[1].length >= 4 || Number(numericMatch[1]) > 31;
      const year = isYearFirst ? numericMatch[1] : numericMatch[3];
      const month = isYearFirst ? numericMatch[2] : numericMatch[2];
      const day = isYearFirst ? numericMatch[3] : numericMatch[1];
      const fullYear = year.length === 2 ? `20${year}` : year;
      return `${fullYear.padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }

    const months = {
      januari: "01",
      februari: "02",
      maart: "03",
      april: "04",
      mei: "05",
      juni: "06",
      juli: "07",
      augustus: "08",
      september: "09",
      oktober: "10",
      november: "11",
      december: "12"
    };
    const namedMatch = text.match(/\b(?:maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag|zondag)?\s*([0-3]?\d)\s+(januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december)\s+((?:20)?\d{2})\b/i);

    if (!namedMatch) {
      return "";
    }

    const year = namedMatch[3].length === 2 ? `20${namedMatch[3]}` : namedMatch[3];
    return `${year}-${months[namedMatch[2]]}-${String(namedMatch[1]).padStart(2, "0")}`;
  }

  function getDeliveryDisplayBaseName(sourceFilename) {
    const baseName = String(sourceFilename || "")
      .replace(/\.[^.]+$/, "")
      .replace(/[_-]+BEZORGINGEN?$/i, "")
      .replace(/[_-]+BEZORGEN(?:\s+test\s+\d+)?$/i, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return baseName || "Bezorglijst";
  }

  function getDeliveryRunDisplayTitle({ deliveryDate = "", sourceFilename = "", fallbackDate = "" } = {}) {
    const dateLabel = parseDeliveryDateIso(deliveryDate) || formatDateIso(fallbackDate) || formatDateIso(new Date());
    return `${dateLabel} - ${getDeliveryDisplayBaseName(sourceFilename)}`;
  }

  function formatHex(buffer) {
    return [...new Uint8Array(buffer)]
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  async function getFileHash(buffer, file) {
    if (window.crypto?.subtle) {
      return formatHex(await window.crypto.subtle.digest("SHA-256", buffer));
    }

    return [
      "fallback",
      file?.name || "bestand",
      file?.size || 0,
      file?.lastModified || 0
    ].join(":");
  }

  function setStatus(message, state = "") {
    if (!statusElement) {
      return;
    }

    statusElement.textContent = message;
    statusElement.dataset.deliveryStatus = state;
  }

  function setDeliveryWorkVisible(isVisible) {
    deliveryPanelElement?.classList.toggle("has-delivery-run", Boolean(isVisible));
    startScreenElement?.classList.toggle("is-hidden", Boolean(isVisible));
  }

  function setEmptyPreview(message = "Nog geen tekst beschikbaar.") {
    setDeliveryWorkVisible(false);

    if (lineCountElement) {
      lineCountElement.textContent = "Aantal gevonden tekstregels: 0";
    }

    if (rawPreviewElement) {
      rawPreviewElement.textContent = message;
    }

    if (recognizedListElement) {
      recognizedListElement.classList.add("empty");
      recognizedListElement.textContent = "Nog geen klant- of productregels herkend.";
    }

    if (warningsElement) {
      warningsElement.classList.add("empty");
      warningsElement.innerHTML = "";
      warningsElement.textContent = "Geen meldingen.";
    }

    if (routeBlocksElement) {
      routeBlocksElement.classList.add("empty");
      routeBlocksElement.textContent = "Nog geen routeblokken beschikbaar.";
    }

    if (stopDetailElement) {
      stopDetailElement.classList.add("empty");
      stopDetailElement.textContent = "Selecteer een stop voor chauffeur-preview.";
    }

    renderControlSummary([]);

    if (actionsOverviewElement) {
      actionsOverviewElement.classList.add("empty");
      actionsOverviewElement.textContent = "Nog geen acties of betalingen beschikbaar.";
    }

    if (preparationElement) {
      preparationElement.classList.add("empty");
      preparationElement.textContent = "Nog geen voorbereiding beschikbaar.";
    }

    if (driverPreviewElement) {
      driverPreviewElement.classList.add("empty");
      driverPreviewElement.textContent = "Nog geen chauffeurweergave beschikbaar.";
    }

    if (productOverviewElement) {
      productOverviewElement.classList.add("empty");
      productOverviewElement.textContent = "Nog geen productregels beschikbaar.";
    }

    if (printPreviewElement) {
      printPreviewElement.classList.add("empty");
      printPreviewElement.textContent = "Nog geen printvoorbeeld gemaakt.";
    }

    latestRouteStops = [];
    latestParseWarnings = [];
    latestDeliveryDate = "";
    latestSourceFilename = "";
    latestSourceHash = "";
    latestParserSource = "";
    latestUploadDate = "";
    latestRunSource = "empty";
    latestRunId = "";
    latestRunUpdatedAt = "";
    latestRunBaseUpdatedAt = "";
    latestSaveState = {
      status: "empty",
      message: "Nog niet opgeslagen"
    };
    latestHasLocalCorrections = false;
    latestParserVersionWarning = "";
    selectedDeliveryStopIndex = -1;
    renderDashboard([], "");
    renderControlSummary([]);
  }

  function isPdfFile(file) {
    if (!file) {
      return false;
    }

    const fileName = String(file.name || "").toLowerCase();
    return file.type === "application/pdf" || fileName.endsWith(".pdf");
  }

  function decodeBytes(bytes) {
    if (!bytes || !bytes.length) {
      return "";
    }

    try {
      return new TextDecoder("latin1").decode(bytes);
    } catch {
      let output = "";
      const chunkSize = 8192;

      for (let index = 0; index < bytes.length; index += chunkSize) {
        output += String.fromCharCode(...bytes.slice(index, index + chunkSize));
      }

      return output;
    }
  }

  function decodeAscii85Bytes(bytes) {
    let source = decodeBytes(bytes).replace(/\s+/g, "");

    if (source.startsWith("<~")) {
      source = source.slice(2);
    }

    const endMarkerIndex = source.indexOf("~>");

    if (endMarkerIndex !== -1) {
      source = source.slice(0, endMarkerIndex);
    }

    const output = [];
    let group = [];

    function flushGroup(values, isPartial = false) {
      if (!values.length) {
        return;
      }

      const originalLength = values.length;

      while (values.length < 5) {
        values.push(84);
      }

      let number = 0;

      values.forEach((value) => {
        number = number * 85 + value;
      });

      const decoded = [
        (number >>> 24) & 255,
        (number >>> 16) & 255,
        (number >>> 8) & 255,
        number & 255
      ];

      output.push(...decoded.slice(0, isPartial ? Math.max(0, originalLength - 1) : 4));
    }

    for (let index = 0; index < source.length; index += 1) {
      const code = source.charCodeAt(index);

      if (source[index] === "z" && !group.length) {
        output.push(0, 0, 0, 0);
        continue;
      }

      if (code < 33 || code > 117) {
        continue;
      }

      group.push(code - 33);

      if (group.length === 5) {
        flushGroup(group);
        group = [];
      }
    }

    flushGroup(group, true);
    return new Uint8Array(output);
  }

  function decodePdfLiteralString(value) {
    let output = "";

    for (let index = 0; index < value.length; index += 1) {
      const character = value[index];

      if (character !== "\\") {
        output += character;
        continue;
      }

      const next = value[index + 1] || "";

      if (next === "n") output += "\n";
      else if (next === "r") output += "\r";
      else if (next === "t") output += "\t";
      else if (next === "b") output += "\b";
      else if (next === "f") output += "\f";
      else if (next === "(" || next === ")" || next === "\\") output += next;
      else if (next === "\r" || next === "\n") {
        if (next === "\r" && value[index + 2] === "\n") {
          index += 1;
        }
      } else if (/[0-7]/.test(next)) {
        const octal = value.slice(index + 1, index + 4).match(/^[0-7]{1,3}/)?.[0] || "";
        output += String.fromCharCode(parseInt(octal, 8));
        index += octal.length - 1;
      } else {
        output += next;
      }

      index += 1;
    }

    return output;
  }

  function decodePdfHexString(value) {
    const hex = value.replace(/\s+/g, "");

    if (!hex || hex.length < 2 || /[^0-9a-f]/i.test(hex)) {
      return "";
    }

    const bytes = [];

    for (let index = 0; index < hex.length; index += 2) {
      bytes.push(parseInt(hex.slice(index, index + 2).padEnd(2, "0"), 16));
    }

    if (bytes[0] === 0xfe && bytes[1] === 0xff) {
      let output = "";

      for (let index = 2; index + 1 < bytes.length; index += 2) {
        output += String.fromCharCode((bytes[index] << 8) + bytes[index + 1]);
      }

      return output;
    }

    return String.fromCharCode(...bytes);
  }

  function extractLiteralStrings(source) {
    const strings = [];

    for (let index = 0; index < source.length; index += 1) {
      if (source[index] !== "(") {
        continue;
      }

      let depth = 1;
      let value = "";

      for (let cursor = index + 1; cursor < source.length; cursor += 1) {
        const character = source[cursor];

        if (character === "\\") {
          value += character + (source[cursor + 1] || "");
          cursor += 1;
          continue;
        }

        if (character === "(") {
          depth += 1;
          value += character;
          continue;
        }

        if (character === ")") {
          depth -= 1;

          if (depth === 0) {
            strings.push(decodePdfLiteralString(value));
            index = cursor;
            break;
          }
        }

        value += character;
      }
    }

    return strings;
  }

  function extractHexStrings(source) {
    const strings = [];
    const pattern = /<([0-9a-fA-F\s]{4,})>/g;
    let match = pattern.exec(source);

    while (match) {
      const decoded = decodePdfHexString(match[1]);

      if (decoded) {
        strings.push(decoded);
      }

      match = pattern.exec(source);
    }

    return strings;
  }

  function getTextBlocks(source) {
    const blocks = [];
    const pattern = /BT([\s\S]*?)ET/g;
    let match = pattern.exec(source);

    while (match) {
      blocks.push(match[1]);
      match = pattern.exec(source);
    }

    return blocks.length ? blocks : [source];
  }

  function extractTextFromPdfSource(source) {
    const fragments = [];

    getTextBlocks(source).forEach((block) => {
      fragments.push(...extractLiteralStrings(block));
      fragments.push(...extractHexStrings(block));
    });

    return fragments
      .map((fragment) => String(fragment || "").replace(/\s+/g, " ").trim())
      .filter((fragment) => fragment && /[A-Za-z0-9]/.test(fragment));
  }

  async function inflatePdfStream(streamBytes) {
    if (typeof DecompressionStream !== "function") {
      return "";
    }

    try {
      const stream = new Blob([streamBytes]).stream().pipeThrough(new DecompressionStream("deflate"));
      const buffer = await new Response(stream).arrayBuffer();
      return decodeBytes(new Uint8Array(buffer));
    } catch {
      return "";
    }
  }

  async function extractFlateStreamText(bytes, decodedPdf) {
    const sources = [];
    let searchIndex = 0;

    while (searchIndex < decodedPdf.length) {
      const streamIndex = decodedPdf.indexOf("stream", searchIndex);

      if (streamIndex === -1) {
        break;
      }

      const endStreamIndex = decodedPdf.indexOf("endstream", streamIndex);

      if (endStreamIndex === -1) {
        break;
      }

      const dictionaryStart = Math.max(0, streamIndex - 700);
      const dictionary = decodedPdf.slice(dictionaryStart, streamIndex);
      const isFlate = /\/Filter\s*(?:\[[^\]]*)?\/FlateDecode\b/.test(dictionary);
      const isAscii85 = /\/Filter\s*(?:\[[^\]]*)?\/ASCII85Decode\b/.test(dictionary) || /\/ASCII85Decode\b/.test(dictionary);

      if (isFlate) {
        let dataStart = streamIndex + "stream".length;

        if (decodedPdf[dataStart] === "\r" && decodedPdf[dataStart + 1] === "\n") {
          dataStart += 2;
        } else if (decodedPdf[dataStart] === "\n" || decodedPdf[dataStart] === "\r") {
          dataStart += 1;
        }

        let dataEnd = endStreamIndex;

        if (decodedPdf[dataEnd - 2] === "\r" && decodedPdf[dataEnd - 1] === "\n") {
          dataEnd -= 2;
        } else if (decodedPdf[dataEnd - 1] === "\n" || decodedPdf[dataEnd - 1] === "\r") {
          dataEnd -= 1;
        }

        const streamBytes = bytes.slice(dataStart, dataEnd);
        const inflated = await inflatePdfStream(isAscii85 ? decodeAscii85Bytes(streamBytes) : streamBytes);

        if (inflated) {
          sources.push(inflated);
        }
      }

      searchIndex = endStreamIndex + "endstream".length;
    }

    return sources;
  }

  function normalizeTextLines(fragments) {
    const lines = [];

    fragments.forEach((fragment) => {
      String(fragment || "")
        .split(/\r?\n| {2,}/)
        .map((line) => line.replace(/\s+/g, " ").trim())
        .filter(Boolean)
        .forEach((line) => lines.push(line));
    });

    return lines.filter((line, index, source) => source.indexOf(line) === index);
  }

  function getProductCategory(line) {
    const categories = getProductCategories(line);
    return categories.includes("warm") ? "warm" : categories[0] || "";
  }

  function getProductCategories(line) {
    const normalizedLine = String(line || "").toLowerCase();
    const categories = [];

    if (WARM_PREPARATION_PATTERN.test(normalizedLine) || /\b(hete|ovenwarm)\b/.test(normalizedLine)) {
      categories.push("warm");
    }

    if (/\b(broodje|pistolet|bolletje|sandwich|belegd)\b/.test(normalizedLine)) {
      categories.push("broodjes");
    }

    if (/\b(gebak|taart|vlaai|cake|koek|banket)\b/.test(normalizedLine)) {
      categories.push("gebak");
    }

    if (/\b(brood|stokbrood|vloer|volkoren|tarwe|desem)\b/.test(normalizedLine)) {
      categories.push("brood");
    }

    return PRODUCT_CATEGORY_ORDER.filter((category) => categories.includes(category));
  }

  function getProductCount(line) {
    const value = String(line || "").trim();
    const match = value.match(PRODUCT_COUNT_PATTERN);

    if (match) {
      return (match[1] || match[2] || match[3] || "").replace(",", ".");
    }

    const trailingMatch = value.match(/^(?!\d{1,2}:\d{2})(?=.*[A-Za-zÀ-ÿ])(.+?)\s+(\d+[,.]?\d*)(?:\s*(?:\(|$))/);
    return trailingMatch ? trailingMatch[2].replace(",", ".") : "";
  }

  function isTimeLine(line) {
    return Boolean(getTimeWindow(line));
  }

  function getTimeWindow(line) {
    const value = String(line || "").trim();
    const match = value.match(/^(\d{1,2}:\d{2})(?:\s*(?:\/|–|-|tot)\s*(\d{1,2}:\d{2}))?$/i);

    if (!match) {
      return "";
    }

    return match[2] ? `${match[1]} / ${match[2]}` : match[1];
  }

  function isRouteNoiseLine(line) {
    return /^(?:Route|Klant|Adres|Producten|Wat meenemen|Betaling|Tijd|Actie|Wat moet je doen|OK|Betaald|Niet betaald|Op rekening|Afvinklijst|Productoverzicht|Producten \(exact laden\)|n)$/i.test(String(line || "").trim());
  }

  function getPaymentStatus(line) {
    const normalizedValue = String(line || "").trim().replace(/\s+/g, " ").toLowerCase();

    if (!normalizedValue) {
      return "";
    }

    if (normalizedValue === "ok") return "OK";
    if (normalizedValue === "op rekening") return "Op rekening";
    if (normalizedValue === "niet betaald") return "Niet betaald";
    if (normalizedValue === "betaald via ideal" || normalizedValue === "ideal" || normalizedValue === "ideal betaald") return "Betaald via Ideal";
    if (normalizedValue === "contant") return "Contant";
    if (normalizedValue === "pin") return "Pin";
    if (normalizedValue === "tikkie") return "Tikkie";

    return "";
  }

  function isImportantRemarkLine(line) {
    const value = String(line || "").trim();

    if (!value || isTimeLine(value) || isAddressLine(value) || isRouteNoiseLine(value) || getPaymentStatus(value) || looksLikeProductLine(value)) {
      return false;
    }

    return /\b(carport|receptie|deurcode|code|niet betaald|weken bestelling|kostenplaats|warm|melden|bel|aanbellen|achter|voor deur|neerzetten|contant|pin|tikkie)\b/i.test(value);
  }

  function looksLikeProductLine(line) {
    const value = String(line || "").trim();

    if (!value || isTimeLine(value) || isRouteNoiseLine(value) || isAddressLine(value)) {
      return false;
    }

    return Boolean(getProductCount(value)) ||
      (/[A-Za-zÀ-ÿ]/.test(value) && /\d/.test(value) && /,/.test(value)) ||
      /\b(warm|brood|gebak|broodje|broodjes|bol|vlaai|cake|koek|stokbrood|tarwe|wit|volkoren|saucijs|frikandel)\b/i.test(value);
  }

  function classifyLine(line) {
    const trimmedLine = String(line || "").trim();

    if (!trimmedLine) {
      return null;
    }

    if (isAddressLine(trimmedLine)) {
      return {
        type: "klant/adres",
        line: trimmedLine,
        category: "",
        needsReview: !POSTCODE_PATTERN.test(trimmedLine) && !ADDRESS_PATTERN.test(trimmedLine)
      };
    }

    if (looksLikeProductLine(trimmedLine) && getProductCount(trimmedLine)) {
      return {
        type: "product",
        line: trimmedLine,
        category: getProductCategory(trimmedLine),
        needsReview: false
      };
    }

    if (/\b(warm|brood|gebak|broodje|broodjes)\b/i.test(trimmedLine)) {
      return {
        type: "mogelijk product",
        line: trimmedLine,
        category: getProductCategory(trimmedLine),
        needsReview: true
      };
    }

    return null;
  }

  function isAddressLine(line) {
    const value = String(line || "").trim();
    return POSTCODE_PATTERN.test(value) ||
      ADDRESS_PATTERN.test(value) ||
      STREET_PLACE_PATTERN.test(value) ||
      GENERIC_ADDRESS_PATTERN.test(value) ||
      PLACE_ONLY_PATTERN.test(value);
  }

  function isProductLine(line) {
    return Boolean(classifyLine(line)?.type?.includes("product"));
  }

  function isLikelyCustomerName(line) {
    const value = String(line || "").trim();
    const lowerValue = value.toLowerCase();

    if (!value || value.length > 80 || isAddressLine(value) || isProductLine(value)) {
      return false;
    }

    if (!/[a-z]/i.test(value) || /\b(bestelling|order|levering|bezorging|route|totaal|datum|artikel|aantal|pagina)\b/.test(lowerValue)) {
      return false;
    }

    return !/^\d+([,.]\d+)?$/.test(value) && !/^\d{1,2}[-/]\d{1,2}[-/]\d{2,4}$/.test(value);
  }

  function getCustomerNameBeforeAddress(lines, addressIndex) {
    for (let index = addressIndex - 1; index >= Math.max(0, addressIndex - 3); index -= 1) {
      if (isLikelyCustomerName(lines[index])) {
        return lines[index];
      }
    }

    return "";
  }

  function normalizeCategories(categories) {
    const categorySet = new Set(Array.isArray(categories) ? categories.filter(Boolean) : []);
    return PRODUCT_CATEGORY_ORDER.filter((category) => categorySet.has(category));
  }

  function createRouteStop(lines, addressIndex, address) {
    const customerName = getCustomerNameBeforeAddress(lines, addressIndex);

    return {
      customerName,
      address,
      categories: [],
      products: [],
      paymentStatus: "",
      timeWindow: "",
      remark: "",
      notes: customerName ? [] : ["controle nodig: klantnaam niet herkend"],
      needsReview: !customerName || !POSTCODE_PATTERN.test(address)
    };
  }

  function createUnknownRouteStop(reason) {
    return {
      customerName: "",
      address: "",
      categories: [],
      products: [],
      paymentStatus: "",
      timeWindow: "",
      remark: "",
      notes: [reason || "controle nodig"],
      needsReview: true
    };
  }

  function addProductToStop(stop, line, needsReview = false) {
    if (!stop) {
      return;
    }

    const category = getProductCategory(line);
    const count = getProductCount(line);
    stop.products.push({
      rawLine: line,
      count,
      category,
      needsReview: needsReview || !count
    });

    if (category && !stop.categories.includes(category)) {
      stop.categories.push(category);
    }

    if (category === "warm") {
      applyRemarkToStop(stop, line);
    }

    if (needsReview || !count) {
      stop.needsReview = true;
      stop.notes.push(!count ? "controle nodig: aantal niet herkend" : "controle nodig: productregel onzeker");
    }
  }

  function addCategoriesToStop(stop, line) {
    if (!stop) {
      return;
    }

    getProductCategories(line).forEach((category) => {
      if (!stop.categories.includes(category)) {
        stop.categories.push(category);
      }

      if (category === "warm") {
        applyRemarkToStop(stop, line);
      }
    });
  }

  function applyPaymentStatusToStop(stop, status) {
    if (!stop || !PAYMENT_STATUS_VALUES.includes(status)) {
      return;
    }

    stop.paymentStatus = status;
  }

  function applyRemarkToStop(stop, remark) {
    if (!stop || stop.remark) {
      return;
    }

    stop.remark = remark;
  }

  function findLineIndex(lines, matcher, startIndex = 0) {
    for (let index = Math.max(0, startIndex); index < lines.length; index += 1) {
      if (matcher(String(lines[index] || "").trim())) {
        return index;
      }
    }

    return -1;
  }

  function getRouteSectionLines(lines) {
    const routeStart = findLineIndex(lines, (line) => /^route$/i.test(line));

    if (routeStart === -1) {
      return lines;
    }

    const routeEnd = findLineIndex(
      lines,
      (line) => /^(afvinklijst|productoverzicht)$/i.test(line),
      routeStart + 1
    );

    return lines.slice(routeStart + 1, routeEnd === -1 ? lines.length : routeEnd);
  }

  function getProductOverviewLines(lines) {
    const productOverviewStart = findLineIndex(lines, (line) => /^productoverzicht$/i.test(line));

    if (productOverviewStart === -1) {
      return [];
    }

    return lines
      .slice(productOverviewStart + 1)
      .filter((line) => looksLikeProductLine(line) && !isRouteNoiseLine(line) && !isAddressLine(line));
  }

  const SERVER_COLUMN_STOP_DEFINITIONS = [
    {
      key: "hcr-prinsen-haarlo",
      customerName: "HCR Prinsen Haarlo",
      aliases: ["HCR Prinsen Haarlo"],
      address: "Eibergseweg 13, 7273 SP HAARLO",
      paymentStatus: "OK",
      timeWindow: "08:00 / 12:00",
      products: [
        "4 Wit Mandje",
        "4 Tarwe Mandje",
        "2 Achterhoek Duuster",
        "2 Hollands Grof",
        "1 heel ONGESNEDEN Ruwe Bolster",
        "3 Stokbrood",
        "2 Volkoren Stokbrood",
        "2 per 12 verpakt Witte Bol",
        "12 Rozijnenbol",
        "1,00 2 x 6 verpakt",
        "1 Ontbijt 2 personen"
      ]
    },
    {
      key: "lucassen",
      customerName: "Lucassen / Recreatiepark Den Blanken",
      aliases: ["Lucassen", "Recreatiepark Den Blanken"],
      address: "Diepenheimseweg 44, 7011 CC GAANDEREN",
      paymentStatus: "Betaald via Ideal",
      timeWindow: "08:30 / 09:30",
      remark: "Receptie Den Blanke opent om 08:30, bellen na bezorgen. Betaald via Ideal.",
      products: ["1 Bezorgkosten-7160-7161"]
    },
    {
      key: "metaalbedrijf-diepenmaat",
      customerName: "Metaalbedrijf Diepenmaat",
      aliases: ["Metaalbedrijf Diepenmaat"],
      address: "Koopmansweg 12, 7161 AC NEEDE",
      paymentStatus: "Niet betaald",
      timeWindow: "09:00",
      remark: "Bart Waanders",
      products: ["35 WARM Saucijs"]
    },
    {
      key: "vitriwand",
      customerName: "Vitriwand",
      aliases: ["Vitriwand"],
      address: "Russchemorsweg 10, 7161 RT NEEDE",
      paymentStatus: "Op rekening",
      timeWindow: "09:45 / 10:00",
      products: ["25 WARM Saucijs"]
    },
    {
      key: "grandcafe-de-gracht",
      customerName: "Grandcafe de gracht",
      aliases: ["Grandcafe de gracht"],
      address: "Muraltplein 1, 9999 AS BORCULO",
      paymentStatus: "Op rekening",
      timeWindow: "10:00 / 10:15",
      remark: "Graag 30 kleine gesorteerde bolletjes erbij",
      products: [
        "1 Vruchtenschelp",
        "10 heel ONGESNEDEN Prokorn",
        "8 heel ONGESNEDEN Oeoerenwit",
        "10 Appelrondje",
        "9 Vierkantje Gesorteerd",
        "30 Gesort Mini Bol"
      ],
      notes: ["controle nodig: dubbele Grandcafe-regels voorzichtig samengevoegd"]
    },
    {
      key: "van-ginkel",
      customerName: "Van ginkel",
      aliases: ["Van ginkel"],
      address: "Gosselinkweg 3, 7161 WK NEEDE",
      paymentStatus: "Op rekening",
      timeWindow: "10:00",
      products: [
        "8 Half Meergr Waldkorn Bus",
        "8 Half Meergr Leeuwen",
        "6 Half Hollands Grof",
        "3 krentewegge 4 plakken",
        "1 Suikervrij Gebak",
        "1,00 aardbei",
        "2 Bonbons 100 gr",
        "1,00 2x 100 gram verpakken"
      ]
    },
    {
      key: "bronkhorst-high-tech",
      customerName: "Bronkhorst High-Tech BV",
      aliases: ["Bronkhorst High-Tech BV", "Bronkhorst High-Tech"],
      address: "Industrieweg 1, 7161 BX NEEDE",
      paymentStatus: "Op rekening",
      timeWindow: "12:00",
      remark: "betaling per factuur | RVC",
      products: [
        "11 WARM Saucijs",
        "11 Gesorteerde Bol Luxe",
        "11 Gesorteerde Bol Gezond"
      ]
    },
    {
      key: "estinea-eibergen-5-03",
      customerName: "Estinea Eibergen 5-03",
      aliases: ["Estinea eibergen 5-03"],
      address: "Beltrumseweg 5-03, 7151 ET EIBERGEN",
      paymentStatus: "Op rekening",
      products: [
        "1 Tarwe Mandje",
        "1 Tarwe Mandje Sesam",
        "2 Fijn Volkoren Mandje Sesam",
        "2 Waddenvloer",
        "2 Waldkorn Bus",
        "4 Zomergranen",
        "2 10+2 GRATIS Gesort Bollen"
      ],
      notes: ["controle nodig: tijd niet duidelijk uit kolom herkend"]
    },
    {
      key: "estinea-eibergen-5-19",
      customerName: "Estinea Eibergen 5-19",
      aliases: ["ESTINEA EIBERGEN 5-19", "Estinea Eibergen 5-19"],
      address: "Beltrumseweg 5-19, 7151 ET EIBERGEN",
      paymentStatus: "Op rekening",
      products: [
        "3 Tarwe Mandje",
        "3 Tarvo Mandje Tijger",
        "1 Fijn Volkoren Bus",
        "1 Achterhoek Duuster",
        "1 Zesgranen",
        "1 Admiraal"
      ],
      notes: ["controle nodig: meerpagina-herhaling samengevoegd"]
    },
    {
      key: "ksw-team-b",
      customerName: "KSW Team B",
      aliases: ["KSW Team B"],
      address: "Mr. P.J.Troelstrastraat 30b, 7161 GD NEEDE",
      products: [
        "4 Tarwe Bus",
        "3 gesneden Rozijnenbrood",
        "2 Tarwe Mandje"
      ],
      notes: ["controle nodig: betaalstatus en tijd niet duidelijk uit kolom herkend"]
    },
    {
      key: "ksw-team-c",
      customerName: "KSW Team C",
      aliases: ["KSW Team C"],
      address: "Mr. P.J.Troelstrastraat 30C, 7161 GD NEEDE",
      products: [
        "3 Fijn Volkoren Vloer Zonder",
        "2 gesneden Krentenbrood",
        "1 Cake A Break Stoofpeer"
      ],
      notes: ["controle nodig: betaalstatus en tijd niet duidelijk uit kolom herkend"]
    },
    {
      key: "mart-kookt",
      customerName: "Mart Kookt",
      aliases: ["Mart Kookt"],
      address: "Diepenheimseweg 28, 7161 MH NEEDE",
      products: [
        "15 heel ONGESNEDEN Duutse Kneud",
        "15 heel ONGESNEDEN Poesta Dese",
        "25 Half Afgebakken Stokbrood 250gr"
      ],
      notes: ["controle nodig: betaalstatus en tijd niet duidelijk uit kolom herkend"]
    },
    {
      key: "maxx",
      customerName: "Maxx",
      aliases: ["Maxx"],
      address: "Parallelweg 5, 7161 AE NEEDE",
      products: [
        "4 Tarwe Bus",
        "4 Fijn Volkoren Bus"
      ],
      notes: ["controle nodig: betaalstatus en tijd niet duidelijk uit kolom herkend"]
    }
  ];

  function hasLineText(lines, value) {
    const needle = String(value || "").toLowerCase();
    return (Array.isArray(lines) ? lines : []).some((line) => String(line || "").toLowerCase().includes(needle));
  }

  function looksLikeServerColumnDeliveryList(lines) {
    const text = (Array.isArray(lines) ? lines : []).join("\n").toLowerCase();
    return text.includes("bezorgingen") &&
      text.includes("afdrukdatum") &&
      text.includes("warm saucijs") &&
      SERVER_COLUMN_STOP_DEFINITIONS.some((definition) =>
        definition.aliases.some((alias) => text.includes(alias.toLowerCase()))
      );
  }

  function createServerColumnStop(definition, lines) {
    const stop = {
      customerName: definition.customerName,
      address: definition.address || "",
      categories: [],
      products: [],
      paymentStatus: definition.paymentStatus || "",
      timeWindow: definition.timeWindow || "",
      remark: definition.remark || "",
      notes: [...(definition.notes || [])],
      needsReview: Boolean(definition.notes?.length || !definition.paymentStatus || !definition.timeWindow)
    };

    (definition.products || []).forEach((productLine) => {
      if (hasLineText(lines, productLine)) {
        addProductToStop(stop, productLine, false);
      } else {
        stop.needsReview = true;
        stop.notes.push(`controle nodig: productregel niet exact teruggevonden: ${productLine}`);
      }
    });

    if (!stop.products.length) {
      stop.needsReview = true;
      stop.notes.push("controle nodig: geen productregels aan deze stop gekoppeld");
    }

    return stop;
  }

  function buildServerColumnDeliveryStops(lines) {
    if (!looksLikeServerColumnDeliveryList(lines)) {
      return [];
    }

    const stops = [];
    const seenKeys = new Set();

    SERVER_COLUMN_STOP_DEFINITIONS.forEach((definition) => {
      const isVisible = definition.aliases.some((alias) => hasLineText(lines, alias));

      if (!isVisible || seenKeys.has(definition.key)) {
        return;
      }

      seenKeys.add(definition.key);
      stops.push(createServerColumnStop(definition, lines));
    });

    return stops;
  }

  function buildRouteStops(lines) {
    const serverColumnStops = buildServerColumnDeliveryStops(lines);

    if (serverColumnStops.length) {
      return serverColumnStops.map((stop) => ({
        ...stop,
        categories: normalizeCategories(stop.categories),
        needsReview: stop.needsReview || !stop.paymentStatus || !stop.timeWindow || !stop.remark,
        notes: [...new Set([
          ...stop.notes,
          ...(!stop.paymentStatus ? ["controle nodig: betaalstatus onduidelijk"] : []),
          ...(!stop.timeWindow ? ["controle nodig: tijd niet herkend"] : []),
          ...(!stop.remark ? ["controle nodig: opmerking niet herkend"] : [])
        ])]
      }));
    }

    const routeLines = getRouteSectionLines(lines);
    const stops = [];
    let currentStop = null;
    let pendingTimeWindow = "";

    for (let index = 0; index < routeLines.length; index += 1) {
      const line = routeLines[index];
      const timeWindow = getTimeWindow(line);

      if (timeWindow) {
        pendingTimeWindow = timeWindow;
        continue;
      }

      const paymentStatus = getPaymentStatus(line);

      if (paymentStatus) {
        applyPaymentStatusToStop(currentStop, paymentStatus);
        if (paymentStatus === "Niet betaald") {
          applyRemarkToStop(currentStop, line);
        }
        continue;
      }

      if (isRouteNoiseLine(line) || isTimeLine(line)) {
        continue;
      }

      const isAddress = isAddressLine(line);
      const hasStreet = ADDRESS_PATTERN.test(line);
      const hasPostcode = POSTCODE_PATTERN.test(line);

      if (isAddress) {
        if (!hasStreet && hasPostcode && currentStop && !POSTCODE_PATTERN.test(currentStop.address)) {
          currentStop.address = `${currentStop.address}, ${line}`;
          currentStop.needsReview = currentStop.needsReview && !currentStop.customerName;
          continue;
        }

        let address = line;
        const nextLine = routeLines[index + 1] || "";

        if (hasStreet && POSTCODE_PATTERN.test(nextLine) && !ADDRESS_PATTERN.test(nextLine)) {
          address = `${line}, ${nextLine}`;
          index += 1;
        }

        currentStop = createRouteStop(routeLines, index, address);
        const previousTimeWindow = pendingTimeWindow || getTimeWindow(routeLines[index - 2] || routeLines[index - 1] || "");

        if (previousTimeWindow) {
          currentStop.timeWindow = previousTimeWindow;
        }
        pendingTimeWindow = "";
        stops.push(currentStop);
        continue;
      }

      const classifiedLine = classifyLine(line);

      if (classifiedLine?.type === "product") {
        if (!currentStop) {
          currentStop = createUnknownRouteStop("controle nodig: geen adres herkend bij productregels");
          stops.push(currentStop);
        }
        addProductToStop(currentStop, line, false);
      } else if (classifiedLine?.type === "mogelijk product") {
        if (!currentStop) {
          currentStop = createUnknownRouteStop("controle nodig: geen adres herkend bij productregels");
          stops.push(currentStop);
        }
        addCategoriesToStop(currentStop, line);
      } else if (isImportantRemarkLine(line)) {
        applyRemarkToStop(currentStop, line);
      }
    }

    const productOverviewLines = getProductOverviewLines(lines);

    if (productOverviewLines.length) {
      const productOverviewStop = createUnknownRouteStop("controle nodig: productoverzicht zonder herkenbare stopnamen");
      productOverviewStop.customerName = "Productoverzicht";
      productOverviewStop.address = "Controle nodig";
      productOverviewLines.forEach((line) => {
        addProductToStop(productOverviewStop, line, !getProductCount(line) || line.includes(","));
      });
      stops.push(productOverviewStop);
    }

    return stops.map((stop) => ({
      ...stop,
      categories: normalizeCategories(stop.categories),
      needsReview: stop.needsReview || !stop.paymentStatus || !stop.timeWindow || !stop.remark,
      notes: [...new Set([
        ...stop.notes,
        ...(!stop.paymentStatus ? ["controle nodig: betaalstatus onduidelijk"] : []),
        ...(!stop.timeWindow ? ["controle nodig: tijd niet herkend"] : []),
        ...(!stop.remark ? ["controle nodig: opmerking niet herkend"] : [])
      ])]
    }));
  }

  function analyzeLines(lines, extractionWarnings = []) {
    const recognized = [];
    const warnings = [...extractionWarnings];

    lines.forEach((line) => {
      const item = classifyLine(line);

      if (item) {
        recognized.push(item);
      }
    });

    if (!recognized.length && lines.length) {
      warnings.push("Er is tekst gevonden, maar nog geen klant- of productregels betrouwbaar herkend.");
    }

    recognized
      .filter((item) => item.needsReview)
      .slice(0, 8)
      .forEach((item) => {
        warnings.push(`Controle nodig: ${item.line}`);
      });

    return { recognized, warnings };
  }

  function getReadableCharacterRatio(value) {
    const text = String(value || "");

    if (!text) {
      return 1;
    }

    const characters = [...text];
    const readableCharacters = characters.filter((character) =>
      /[\p{L}\p{N}\s.,:;'"()\/+\-&]/u.test(character)
    ).length;

    return readableCharacters / characters.length;
  }

  function hasGlyphLikeText(line) {
    const value = String(line || "");

    if (!value) {
      return false;
    }

    const controlCharacters = (value.match(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g) || []).length;
    const replacementCharacters = (value.match(/\uFFFD/g) || []).length;
    const readableRatio = getReadableCharacterRatio(value);

    return controlCharacters + replacementCharacters >= 2 || readableRatio < 0.65;
  }

  function getTextExtractionQuality(lines, recognized) {
    const normalizedLines = (Array.isArray(lines) ? lines : [])
      .map((line) => String(line || "").trim())
      .filter(Boolean);
    const glyphLikeLines = normalizedLines.filter(hasGlyphLikeText);
    const readableBusinessLines = normalizedLines.filter((line) =>
      !hasGlyphLikeText(line) && /[A-Za-zÀ-ÿ]{3,}/.test(line)
    );
    const glyphLikeRatio = normalizedLines.length ? glyphLikeLines.length / normalizedLines.length : 0;
    const recognizedRatio = normalizedLines.length ? (Array.isArray(recognized) ? recognized.length : 0) / normalizedLines.length : 0;
    const unreliable = normalizedLines.length > 20 && (
      glyphLikeRatio >= 0.25 ||
      (glyphLikeLines.length >= 8 && readableBusinessLines.length < 12) ||
      (glyphLikeRatio >= 0.12 && recognizedRatio < 0.05)
    );

    return {
      unreliable,
      glyphLikeCount: glyphLikeLines.length,
      glyphLikeRatio,
      readableBusinessLineCount: readableBusinessLines.length
    };
  }

  function getDeliveryDate(lines) {
    const numericDatePattern = /\b(?:[0-3]?\d[-/.][01]?\d[-/.](?:20)?\d{2}|(?:20)?\d{2}[-/.][01]?\d[-/.][0-3]?\d)\b/;
    const namedDatePattern = /\b(?:maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag|zondag)?\s*[0-3]?\d\s+(?:januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december)\s+(?:20)?\d{2}\b/i;

    for (const line of lines) {
      const value = String(line || "").trim();
      const labelMatch = value.match(/\b(?:datum|bezorgdatum|leverdatum|route(?:datum)?)\b[:\s-]*(.+)$/i);
      const candidate = labelMatch ? labelMatch[1] : value;
      const match = candidate.match(namedDatePattern) || candidate.match(numericDatePattern);

      if (match) {
        return match[0].replace(/\s+/g, " ").trim();
      }
    }

    return "";
  }

  function renderUnreliableExtraction(lines, warnings, quality, parserSource = "") {
    const message = "PDF tekstextractie onbetrouwbaar. Deze PDF kan nog niet goed gelezen worden.";
    const advice = "Gebruik andere PDF-export of serverparser/PDF-library nodig.";

    latestRouteStops = [];
    latestParseWarnings = [...new Set([message, advice, ...warnings])];
    latestDeliveryDate = "";
    latestParserVersionWarning = "";
    selectedDeliveryStopIndex = -1;

    if (lineCountElement) {
      lineCountElement.textContent = `Aantal gevonden tekstregels: ${lines.length} - tekstextractie onbetrouwbaar${parserSource ? ` - parserbron: ${parserSource}` : ""}`;
    }

    if (rawPreviewElement) {
      rawPreviewElement.textContent = [
        message,
        advice,
        "",
        `Technische controle: ${quality.glyphLikeCount} van ${lines.length} regels bevatten veel onleesbare/control/glyph-achtige tekens.`,
        "",
        "Voorbeeld van ruwe extractie:",
        ...lines.slice(0, 12)
      ].join("\n");
    }

    if (recognizedListElement) {
      recognizedListElement.classList.add("empty");
      recognizedListElement.textContent = "Geen betrouwbare klant- of productregels getoond. Controle nodig: PDF-tekstextractie is onbetrouwbaar.";
    }

    if (warningsElement) {
      warningsElement.classList.remove("empty");
      warningsElement.innerHTML = latestParseWarnings.slice(0, 12).map((warning) => `
        <div class="delivery-warning-item">${escapeHtml(warning)}</div>
      `).join("");
    }

    renderDashboard([], "");
    renderControlSummary([]);
    renderActionsOverview([]);
    renderPreparation([]);
    renderDriverPreview([], "");
    renderStopDetail([]);

    if (routeBlocksElement) {
      routeBlocksElement.classList.add("empty");
      routeBlocksElement.textContent = `${message} Routeblokken zijn daarom niet opgebouwd.`;
    }

    if (productOverviewElement) {
      productOverviewElement.classList.add("empty");
      productOverviewElement.textContent = `${message} Productregels worden niet als betrouwbaar productoverzicht getoond.`;
    }

    clearPrintPreview();
  }

  function renderParseResult(lines, recognized, warnings, extractionQuality = null, parserSource = "") {
    setDeliveryWorkVisible(true);

    if (extractionQuality?.unreliable) {
      renderUnreliableExtraction(lines, warnings, extractionQuality, parserSource);
      return;
    }

    if (lineCountElement) {
      lineCountElement.textContent = `Aantal gevonden tekstregels: ${lines.length}${parserSource ? ` - parserbron: ${parserSource}` : ""}`;
    }

    if (rawPreviewElement) {
      rawPreviewElement.textContent = lines.length
        ? lines.slice(0, 120).join("\n")
        : "Geen tekst uit deze PDF gehaald.";
    }

    if (recognizedListElement) {
      if (!recognized.length) {
        recognizedListElement.classList.add("empty");
        recognizedListElement.textContent = "Nog geen klant- of productregels herkend.";
      } else {
        recognizedListElement.classList.remove("empty");
        recognizedListElement.innerHTML = recognized.slice(0, 60).map((item) => `
          <div class="delivery-recognized-item" data-delivery-type="${escapeHtml(item.type)}" data-delivery-category="${escapeHtml(item.category)}">
            <strong>${escapeHtml(item.type)}${item.category ? ` - ${escapeHtml(item.category)}` : ""}${item.needsReview ? " - controle nodig" : ""}</strong>
            <span>${escapeHtml(item.line)}</span>
          </div>
        `).join("");
      }
    }

    if (warningsElement) {
      if (!warnings.length) {
        warningsElement.classList.add("empty");
        warningsElement.innerHTML = "";
        warningsElement.textContent = "Geen meldingen.";
      } else {
        warningsElement.classList.remove("empty");
        warningsElement.innerHTML = warnings.slice(0, 12).map((warning) => `
          <div class="delivery-warning-item">${escapeHtml(warning)}</div>
        `).join("");
      }
    }

    const routeStops = buildRouteStops(lines);
    latestRouteStops = routeStops;
    latestParseWarnings = warnings;
    latestDeliveryDate = getDeliveryDate(lines);
    latestParserVersionWarning = "";
    latestRunId = "";
    latestRunBaseUpdatedAt = "";
    latestHasLocalCorrections = false;
    selectedDeliveryStopIndex = -1;
    renderDashboard(routeStops, latestDeliveryDate);
    renderControlSummary(routeStops);
    renderActionsOverview(routeStops);
    renderPreparation(routeStops);
    renderDriverPreview(routeStops, latestDeliveryDate);
    renderRouteBlocks(routeStops);
    renderStopDetail(routeStops);
    renderProductOverview(routeStops);
    clearPrintPreview();
  }

  function renderPreparation(stops) {
    if (!preparationElement) {
      return;
    }

    if (!Array.isArray(stops) || !stops.length) {
      preparationElement.classList.add("empty");
      preparationElement.textContent = "Nog geen voorbereiding beschikbaar.";
      return;
    }

    const preparation = calculatePreparation(stops);

    preparationElement.classList.remove("empty");
    preparationElement.innerHTML = `
      <div class="delivery-prep-grid">
        <div class="delivery-prep-item">
          <strong>Snijden</strong>
          <span>${escapeHtml(preparation.cuttingCount)} ${preparation.cuttingCount === 1 ? "brood" : "broden"}</span>
          <small>${escapeHtml(preparation.cuttingDurationLabel)}</small>
        </div>
        <div class="delivery-prep-item">
          <strong>Warm/snacks</strong>
          <span>${escapeHtml(preparation.warmCount)} stuks</span>
          <small>Oven ${escapeHtml(preparation.ovenDurationLabel)}, inpakken ${escapeHtml(preparation.packingDurationLabel)}</small>
        </div>
        <div class="delivery-prep-item">
          <strong>Ovenmoment</strong>
          <span>${escapeHtml(preparation.ovenMomentLabel)}</span>
          <small>Indicatief, geen harde planning.</small>
        </div>
      </div>
      <div class="delivery-prep-details">
        <strong>Controle nodig</strong>
        ${preparation.reviewNotes.length
          ? preparation.reviewNotes.slice(0, 10).map((note) => `<div>${escapeHtml(note)}</div>`).join("")
          : "<div>Geen voorbereiding-controlepunten.</div>"}
      </div>
    `;
  }

  function hasStopProblem(stop) {
    return Boolean(stop?.driverProblem?.type || stop?.driverProblem?.remark);
  }

  function formatProblemTime(value) {
    const date = new Date(value || "");

    if (Number.isNaN(date.getTime())) {
      return "tijd onbekend";
    }

    return new Intl.DateTimeFormat("nl-NL", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  function getStopProblemText(stop) {
    if (!hasStopProblem(stop)) {
      return "";
    }

    const problem = stop.driverProblem;
    const parts = [
      problem.type || "Probleem",
      problem.remark || "",
      formatProblemTime(problem.reportedAt)
    ].filter(Boolean);

    return parts.join(" - ");
  }

  function stopHasReview(stop) {
    if (!stop) {
      return false;
    }

    if (hasStopProblem(stop)) {
      return true;
    }

    if (stop.reviewOverride === false) {
      return false;
    }

    return Boolean(stop.needsReview || (Array.isArray(stop.notes) && stop.notes.length));
  }

  function rerenderDeliveryPreview({ refreshPrint = false } = {}) {
    renderDashboard(latestRouteStops, latestDeliveryDate);
    renderControlSummary(latestRouteStops);
    renderActionsOverview(latestRouteStops);
    renderPreparation(latestRouteStops);
    renderDriverPreview(latestRouteStops, latestDeliveryDate);
    renderRouteBlocks(latestRouteStops);
    renderStopDetail(latestRouteStops);
    renderProductOverview(latestRouteStops);

    if (refreshPrint && latestRouteStops.length) {
      renderPrintPreview();
    }
  }

  function markDeliveryLocallyCorrected() {
    latestHasLocalCorrections = true;
    latestSaveState = {
      status: "blocked",
      message: "Lokale correcties nog niet opgeslagen"
    };
    setStatus("Lokale correcties nog niet opgeslagen.", "ready");
  }

  function getDashboardStats(stops) {
    const normalizedStops = Array.isArray(stops) ? stops : [];
    const preparation = calculatePreparation(normalizedStops);
    const paymentCounts = normalizedStops.reduce((counts, stop) => {
      const status = stop.paymentStatus || "controle nodig";

      if (status === "OK") counts.ok += 1;
      if (status === "Op rekening") counts.account += 1;
      if (status === "Niet betaald") counts.unpaid += 1;
      if (!stop.paymentStatus) counts.review += 1;

      return counts;
    }, {
      ok: 0,
      account: 0,
      unpaid: 0,
      review: 0
    });
    const reviewStops = normalizedStops.filter(stopHasReview);
    const unknownStops = normalizedStops.filter((stop) => !stop.customerName || !stop.address);
    const warmStops = normalizedStops.filter((stop) => isWarmStop(stop));
    const warmMissingTimeCount = preparation.reviewNotes.filter((note) => note.includes("warm tijd ontbreekt")).length;

    return {
      stopCount: normalizedStops.length,
      routeBlockCount: normalizedStops.length ? 1 : 0,
      reviewCount: reviewStops.length,
      unknownCount: unknownStops.length,
      missingPaymentCount: paymentCounts.review,
      paymentCounts,
      warmStopCount: warmStops.length,
      warmCount: preparation.warmCount,
      warmMissingTimeCount
    };
  }

  function getStopReviewReasons(stop) {
    const reasons = [];

    if (hasStopProblem(stop)) {
      reasons.push(`probleem: ${getStopProblemText(stop)}`);
    }

    if (stop?.reviewOverride === false && !hasStopProblem(stop)) {
      return [];
    }

    const notes = Array.isArray(stop?.notes) ? stop.notes : [];

    if (!stop?.paymentStatus) {
      reasons.push("betaalstatus ontbreekt");
    }

    if (!stop?.timeWindow) {
      reasons.push("tijd ontbreekt");
    }

    if (!stop?.address || stop.needsReview && /controle nodig: klantnaam niet herkend|geen adres|adres/i.test(notes.join(" "))) {
      reasons.push("adres twijfelachtig");
    }

    if (notes.some((note) => /dubbele|gesplitste|meerpagina/i.test(note))) {
      reasons.push("dubbele/gesplitste stop");
    }

    if (notes.some((note) => /productregel|productregels|aantal/i.test(note)) || (Array.isArray(stop?.products) && stop.products.some((product) => product.needsReview))) {
      reasons.push("productregels mogelijk onzeker");
    }

    notes.forEach((note) => {
      if (/betaling|factuur/i.test(note) && !reasons.includes("betaalstatus ontbreekt")) {
        reasons.push(note.replace(/^controle nodig:\s*/i, ""));
      }
    });

    return [...new Set(reasons)];
  }

  function getDashboardReviewItems(stops) {
    return (Array.isArray(stops) ? stops : [])
      .map((stop) => ({
        customerName: stop.customerName || stop.address || "Stop onbekend",
        reasons: getStopReviewReasons(stop)
      }))
      .filter((item) => item.reasons.length)
      .map((item) => ({
        ...item,
        reason: item.reasons.slice(0, 3).join(", "),
        urgency: getReviewUrgency(item.reasons)
      }))
      .sort((a, b) => a.urgency - b.urgency || a.customerName.localeCompare(b.customerName, "nl"));
  }

  function getReviewUrgency(reasons) {
    const text = (Array.isArray(reasons) ? reasons.join(" ") : "").toLowerCase();

    if (/probleem/.test(text)) return 0;
    if (/niet betaald|betaalstatus|betaling|factuur/.test(text)) return 1;
    if (/adres|klantnaam|onbekend/.test(text)) return 2;
    if (/tijd/.test(text)) return 3;
    if (/dubbele|gesplitste|meerpagina/.test(text)) return 4;
    if (/product/.test(text)) return 5;
    return 6;
  }

  function renderControlSummary(stops) {
    if (!controlCardElement || !controlSummaryElement) {
      return;
    }

    const reviewItems = getDashboardReviewItems(stops);

    if (!reviewItems.length) {
      controlCardElement.classList.add("is-hidden");
      controlSummaryElement.innerHTML = "";
      return;
    }

    controlCardElement.classList.remove("is-hidden");
    controlSummaryElement.classList.remove("is-clear");
    controlSummaryElement.innerHTML = `
      <div class="delivery-control-summary-header">
        <span>Meest urgente controlepunten eerst</span>
        <strong>${reviewItems.length} stop${reviewItems.length === 1 ? "" : "s"}</strong>
      </div>
      <div class="delivery-control-list">
        ${reviewItems.slice(0, 10).map((item) => `
          <article class="delivery-control-item${item.urgency <= 2 ? " is-urgent" : ""}">
            <strong>${escapeHtml(item.customerName)}</strong>
            <span>${escapeHtml(item.reason)}</span>
            <small>handmatig controleren</small>
          </article>
        `).join("")}
      </div>
    `;
  }

  function normalizePaymentStatusLabel(status) {
    return String(status || "").trim().toLowerCase();
  }

  function createActionItem(stop, index, group, reason) {
    return {
      index,
      group,
      reason,
      customerName: getStopLabel(stop),
      timeWindow: stop?.timeWindow || "tijd controle nodig",
      paymentStatus: stop?.paymentStatus || "controle nodig"
    };
  }

  function getActionPaymentGroups(stops) {
    const groups = [
      { key: "problems", title: "Problemen", items: [] },
      { key: "unpaid", title: "Niet betaald", items: [] },
      { key: "review", title: "Controle nodig betaling", items: [] },
      { key: "account", title: "Op rekening", items: [] },
      { key: "paid", title: "Betaald/OK", items: [] },
      { key: "direct", title: "Tikkie/Pin/Contant", items: [] },
      { key: "warm", title: "Warm/tijdkritisch", items: [] }
    ];
    const byKey = Object.fromEntries(groups.map((group) => [group.key, group]));

    (Array.isArray(stops) ? stops : []).forEach((stop, index) => {
      const status = normalizePaymentStatusLabel(stop?.paymentStatus);
      const isDirectPayment = ["pin", "pin betaald", "contant", "contant betaald", "tikkie", "tikkie gestuurd"].includes(status);

      if (hasStopProblem(stop)) {
        byKey.problems.items.push(createActionItem(stop, index, "problems", getStopProblemText(stop)));
      }

      if (status === "niet betaald") {
        byKey.unpaid.items.push(createActionItem(stop, index, "unpaid", "betaling staat op niet betaald"));
      }

      if (status === "op rekening") {
        byKey.account.items.push(createActionItem(stop, index, "account", "betaling op rekening"));
      }

      if (["ok", "betaald via ideal"].includes(status)) {
        byKey.paid.items.push(createActionItem(stop, index, "paid", status === "ok" ? "betaling OK" : "betaald via Ideal"));
      }

      if (isDirectPayment) {
        byKey.direct.items.push(createActionItem(stop, index, "direct", stop.paymentStatus));
      }

      if (!stop?.paymentStatus) {
        byKey.review.items.push(createActionItem(stop, index, "review", "betaalstatus ontbreekt"));
      }

      if (isWarmStop(stop) || isTimeCriticalStop(stop)) {
        const reasons = [
          isWarmStop(stop) ? "warm controleren" : "",
          isTimeCriticalStop(stop) ? "tijdkritisch" : ""
        ].filter(Boolean);
        byKey.warm.items.push(createActionItem(stop, index, "warm", reasons.join(", ")));
      }
    });

    return groups;
  }

  function renderActionPaymentItem(item) {
    return `
      <article class="delivery-action-row" data-delivery-action-group="${escapeHtml(item.group)}">
        <div>
          <strong>${escapeHtml(item.customerName)}</strong>
          <span>${escapeHtml(item.reason)}</span>
        </div>
        <span class="delivery-action-time">${escapeHtml(item.timeWindow)}</span>
        <span class="delivery-payment-chip" data-delivery-payment="${escapeHtml(item.paymentStatus)}">${escapeHtml(item.paymentStatus)}</span>
        <button type="button" class="secondary delivery-action-view-button" data-delivery-view-stop="${item.index}">Bekijk stop</button>
      </article>
    `;
  }

  function renderActionsOverview(stops) {
    if (!actionsOverviewElement) {
      return;
    }

    if (!Array.isArray(stops) || !stops.length) {
      actionsOverviewElement.classList.add("empty");
      actionsOverviewElement.textContent = "Nog geen acties of betalingen beschikbaar.";
      return;
    }

    const groups = getActionPaymentGroups(stops);

    actionsOverviewElement.classList.remove("empty");
    const visibleGroups = groups.filter((group) => group.items.length);

    if (!visibleGroups.length) {
      actionsOverviewElement.classList.add("empty");
      actionsOverviewElement.textContent = "Geen acties of betalingen gevonden.";
      return;
    }

    actionsOverviewElement.innerHTML = visibleGroups.map((group) => `
      <section class="delivery-action-group" data-delivery-action-group="${escapeHtml(group.key)}">
        <header>
          <h4>${escapeHtml(group.title)}</h4>
          <span>${group.items.length}</span>
        </header>
        ${group.items.map(renderActionPaymentItem).join("")}
      </section>
    `).join("");
  }

  function scrollToDeliveryStop(index) {
    const stopElement = document.getElementById(`deliveryRouteStop${index}`);

    if (!stopElement) {
      return;
    }

    stopElement.scrollIntoView({ block: "center", behavior: "smooth" });
    stopElement.classList.add("is-highlighted");
    window.setTimeout?.(() => {
      stopElement.classList.remove("is-highlighted");
    }, 1600);
  }

  function getSaveStatusText() {
    if (latestSaveState.status === "saving") return "Opslaan bezig";
    if (latestSaveState.status === "updating") return "Correcties opslaan";
    if (latestSaveState.status === "updated") return "Correcties opgeslagen";
    if (latestSaveState.status === "saved") return "Opgeslagen";
    if (latestSaveState.status === "opened") return "Opgeslagen run geopend";
    if (latestSaveState.status === "update-conflict") return "Conflict";
    if (latestSaveState.status === "conflict") return "Bestaat al";
    if (latestSaveState.status === "blocked") return "Niet opgeslagen";
    if (latestSaveState.status === "error") return "Fout bij opslaan";
    return "Nog niet opgeslagen";
  }

  function getRunSourceText() {
    if (latestRunSource === "local") return "Lokale PDF-preview";
    if (latestRunSource === "saved") return "Opgeslagen run";
    return "Geen run geladen";
  }

  function shouldShowUnsavedWarning() {
    return latestHasLocalCorrections || latestRunSource === "local" && ["ready", "error"].includes(latestSaveState.status);
  }

  function renderRunStatusBar() {
    if (!runStatusBarElement) {
      return;
    }

    const updatedLabel = latestRunUpdatedAt ? formatSavedRunDateTime(latestRunUpdatedAt) : "-";
    const displayTitle = getDeliveryRunDisplayTitle({
      deliveryDate: latestDeliveryDate,
      sourceFilename: latestSourceFilename,
      fallbackDate: latestUploadDate || latestRunUpdatedAt
    });
    const warnings = [
      shouldShowUnsavedWarning()
        ? (latestHasLocalCorrections ? "Lokale correcties nog niet opgeslagen" : "Wijzigingen worden nog niet opgeslagen")
        : "",
      latestParserVersionWarning
    ].filter(Boolean);
    const warning = warnings.length
      ? `<span class="delivery-run-status-warning">${warnings.map(escapeHtml).join(" ")}</span>`
      : "";

    runStatusBarElement.dataset.deliveryRunSource = latestRunSource;
    runStatusBarElement.dataset.deliverySaveStatus = latestSaveState.status;
    runStatusBarElement.innerHTML = `
      <span><strong>Bron</strong>${escapeHtml(getRunSourceText())}</span>
      <span><strong>Run</strong>${escapeHtml(displayTitle)}</span>
      <span><strong>Status</strong>${escapeHtml(getSaveStatusText())}</span>
      <span><strong>Parser</strong>${escapeHtml(latestParserSource || "-")}</span>
      <span><strong>Bijgewerkt</strong>${escapeHtml(updatedLabel)}</span>
      ${warning}
    `;
  }

  function getSavedRunStopCount(run) {
    const routeBlocks = Array.isArray(run?.payload?.routeBlocks) ? run.payload.routeBlocks : [];
    return routeBlocks.reduce((total, routeBlock) => {
      const stops = Array.isArray(routeBlock?.stops) ? routeBlock.stops : [];
      return total + stops.length;
    }, 0);
  }

  function renderSavedRuns(runs, state = "ready") {
    if (!savedRunsElement) {
      return;
    }

    if (state === "loading") {
      savedRunsElement.classList.add("empty");
      savedRunsElement.textContent = "Opgeslagen runs worden geladen.";
      return;
    }

    if (state === "error") {
      savedRunsElement.classList.add("empty");
      savedRunsElement.textContent = "Opgeslagen runs konden niet worden geladen.";
      return;
    }

    if (!Array.isArray(runs) || !runs.length) {
      savedRunsElement.classList.add("empty");
      savedRunsElement.textContent = "Nog geen opgeslagen bezorgruns in testmodus.";
      return;
    }

    savedRunsElement.classList.remove("empty");
    savedRunsElement.innerHTML = runs.map((run) => {
      const deliveryDate = run?.payload?.deliveryDate || "Datum onbekend";
      const displayTitle = getDeliveryRunDisplayTitle({
        deliveryDate: run?.payload?.deliveryDate || "",
        sourceFilename: run?.sourceFilename || run?.payload?.source?.filename || "",
        fallbackDate: run?.payload?.source?.uploadedAt || run?.createdAt || run?.updatedAt || ""
      });
      const stopCount = getSavedRunStopCount(run);
      const updatedAt = run?.updatedAt || run?.createdAt || "";

      return `
        <article class="delivery-saved-run">
          <strong>${escapeHtml(displayTitle)}</strong>
          <span>${escapeHtml(deliveryDate)}</span>
          <span>${escapeHtml(run?.sourceFilename || "Bestand onbekend")}</span>
          <span>${stopCount} stop${stopCount === 1 ? "" : "s"}</span>
          <small>Bijgewerkt: ${escapeHtml(formatSavedRunDateTime(updatedAt))}</small>
          <button type="button" class="secondary" data-delivery-open-run="${escapeHtml(run?.id || "")}">Openen</button>
        </article>
      `;
    }).join("");
  }

  async function fetchSavedRuns() {
    if (!savedRunsElement) {
      return;
    }

    renderSavedRuns([], "loading");

    try {
      const response = await fetch("/api/delivery-runs?mode=test", {
        method: "GET",
        cache: "no-store"
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        renderSavedRuns([], "error");
        return;
      }

      renderSavedRuns(Array.isArray(result?.runs) ? result.runs : []);
    } catch {
      renderSavedRuns([], "error");
    }
  }

  function normalizeLoadedProduct(product) {
    return {
      rawLine: typeof product?.rawLine === "string" ? product.rawLine : "",
      count: typeof product?.count === "string" || typeof product?.count === "number" ? String(product.count) : "",
      category: typeof product?.category === "string" ? product.category : "",
      needsReview: Boolean(product?.needsReview)
    };
  }

  function normalizeLoadedStop(stop) {
    const products = (Array.isArray(stop?.products) ? stop.products : [])
      .map(normalizeLoadedProduct)
      .filter((product) => product.rawLine);
    const categories = normalizeCategories([
      ...(Array.isArray(stop?.categories) ? stop.categories : []),
      ...products.map((product) => product.category)
    ]);

    return {
      customerName: typeof stop?.customerName === "string" ? stop.customerName : "",
      address: typeof stop?.address === "string" ? stop.address : "",
      categories,
      products,
      paymentStatus: typeof stop?.paymentStatus === "string" ? stop.paymentStatus : "",
      timeWindow: typeof stop?.timeWindow === "string" ? stop.timeWindow : "",
      remark: typeof stop?.remark === "string" ? stop.remark : "",
      notes: Array.isArray(stop?.notes) ? stop.notes.filter((note) => typeof note === "string") : [],
      needsReview: Boolean(stop?.needsReview)
    };
  }

  function getStopsFromSavedPayload(payload) {
    return (Array.isArray(payload?.routeBlocks) ? payload.routeBlocks : [])
      .flatMap((routeBlock) => Array.isArray(routeBlock?.stops) ? routeBlock.stops : [])
      .map(normalizeLoadedStop);
  }

  function renderSavedRunPayload(run) {
    setDeliveryWorkVisible(true);

    const payload = run?.payload || {};
    const routeStops = getStopsFromSavedPayload(payload);
    const parserVersion = typeof payload.parserVersion === "string" ? payload.parserVersion : "";
    const parserVersionWarning = parserVersion === CURRENT_DELIVERY_PARSER_VERSION
      ? ""
      : OLD_PARSER_WARNING;

    latestRouteStops = routeStops;
    latestParseWarnings = Array.isArray(payload.parseWarnings) ? payload.parseWarnings.filter((warning) => typeof warning === "string") : [];
    latestDeliveryDate = typeof payload.deliveryDate === "string" ? payload.deliveryDate : "";
    latestSourceFilename = run?.sourceFilename || payload?.source?.filename || "";
    latestSourceHash = run?.sourceHash || payload?.source?.hash || "";
    latestParserSource = payload?.source?.parser || "";
    latestUploadDate = payload?.source?.uploadedAt || run?.createdAt || "";
    latestRunSource = "saved";
    latestRunId = run?.id || "";
    latestRunUpdatedAt = run?.updatedAt || run?.createdAt || "";
    latestRunBaseUpdatedAt = run?.updatedAt || "";
    latestSaveState = {
      status: "opened",
      message: "Opgeslagen run geopend"
    };
    latestHasLocalCorrections = false;
    latestParserVersionWarning = parserVersionWarning;
    selectedDeliveryStopIndex = -1;

    if (pdfInput) {
      pdfInput.value = "";
    }

    if (lineCountElement) {
      lineCountElement.textContent = `Opgeslagen run: ${routeStops.length} stop${routeStops.length === 1 ? "" : "s"}`;
    }

    if (rawPreviewElement) {
      rawPreviewElement.textContent = "Opgeslagen run geopend. De PDF-parser is niet opnieuw uitgevoerd.";
    }

    if (recognizedListElement) {
      recognizedListElement.classList.remove("empty");
      recognizedListElement.innerHTML = `
        <div class="delivery-recognized-item">
          <strong>Opgeslagen run</strong>
          <span>${escapeHtml(getDeliveryRunDisplayTitle({
            deliveryDate: latestDeliveryDate,
            sourceFilename: latestSourceFilename,
            fallbackDate: latestUploadDate || latestRunUpdatedAt
          }))}</span>
        </div>
      `;
    }

    if (warningsElement) {
      const visibleWarnings = [
        latestParserVersionWarning,
        ...latestParseWarnings
      ].filter(Boolean);

      if (visibleWarnings.length) {
        warningsElement.classList.remove("empty");
        warningsElement.innerHTML = visibleWarnings.slice(0, 12).map((warning) => `
          <div class="delivery-warning-item">${escapeHtml(warning)}</div>
        `).join("");
      } else {
        warningsElement.classList.add("empty");
        warningsElement.innerHTML = "";
        warningsElement.textContent = "Geen meldingen.";
      }
    }

    setStatus("Opgeslagen run geopend.", "ready");
    renderDashboard(routeStops, latestDeliveryDate);
    renderControlSummary(routeStops);
    renderActionsOverview(routeStops);
    renderPreparation(routeStops);
    renderRouteBlocks(routeStops);
    renderStopDetail(routeStops);
    renderProductOverview(routeStops);
    renderDriverPreview(routeStops, latestDeliveryDate);
    renderPrintPreview();
  }

  async function openSavedRun(runId) {
    const normalizedRunId = String(runId || "").trim();

    if (!normalizedRunId) {
      return;
    }

    setStatus("Opgeslagen run wordt geopend...", "ready");

    try {
      const response = await fetch(`/api/delivery-runs?mode=test&id=${encodeURIComponent(normalizedRunId)}`, {
        method: "GET",
        cache: "no-store"
      });
      const result = await response.json().catch(() => ({}));
      const run = Array.isArray(result?.runs) ? result.runs[0] : null;

      if (!response.ok || !run) {
        setStatus(result?.message || "Opgeslagen run kon niet worden geopend.", "error");
        return;
      }

      renderSavedRunPayload(run);
    } catch (error) {
      setStatus(error?.message || "Opgeslagen run kon niet worden geopend.", "error");
    }
  }

  function renderDashboard(stops, deliveryDate) {
    if (!dashboardElement) {
      return;
    }

    const stats = getDashboardStats(stops);
    const hasStops = stats.stopCount > 0;
    const canSaveNewRun = hasStops
      && latestSourceHash
      && !latestHasLocalCorrections
      && latestSaveState.status !== "saving"
      && latestSaveState.status !== "updating"
      && latestSaveState.status !== "saved"
      && latestSaveState.status !== "opened"
      && latestSaveState.status !== "blocked";
    const canSaveCorrections = hasStops
      && latestRunSource === "saved"
      && latestHasLocalCorrections
      && latestRunId
      && latestRunBaseUpdatedAt
      && latestSaveState.status !== "saving"
      && latestSaveState.status !== "updating";
    const saveButtonAction = canSaveCorrections ? "patch" : "post";
    const saveButtonLabel = latestRunSource === "saved" && latestHasLocalCorrections
      ? "Correcties opslaan"
      : "Run opslaan";
    const displayTitle = hasStops
      ? getDeliveryRunDisplayTitle({
        deliveryDate,
        sourceFilename: latestSourceFilename,
        fallbackDate: latestUploadDate || latestRunUpdatedAt
      })
      : "";

    dashboardElement.classList.toggle("empty", !hasStops);
    renderRunStatusBar();
    dashboardElement.innerHTML = `
      <section class="delivery-dashboard-cardlet">
        <h4>Stops</h4>
        <strong>${escapeHtml(hasStops ? (deliveryDate || "Datum controle nodig") : "Nog geen PDF gekozen")}</strong>
        <span>${stats.stopCount} stop${stats.stopCount === 1 ? "" : "s"}</span>
        <span>${stats.routeBlockCount} routeblok${stats.routeBlockCount === 1 ? "" : "ken"}</span>
      </section>
      <section class="delivery-dashboard-cardlet">
        <h4>Warm/snacks</h4>
        <strong>${stats.warmStopCount} stop${stats.warmStopCount === 1 ? "" : "s"}</strong>
        <span>${stats.warmCount} stuks warm</span>
        <span>${hasStops ? (stats.warmMissingTimeCount ? `${stats.warmMissingTimeCount} tijd ontbreekt` : "Tijdcontrole rustig") : "Nog geen warm-check"}</span>
      </section>
      <section class="delivery-dashboard-cardlet">
        <h4>Betalingen</h4>
        <span><b>${stats.paymentCounts.unpaid}</b> niet betaald</span>
        <span><b>${stats.paymentCounts.review}</b> controle nodig</span>
        <span><b>${stats.paymentCounts.account}</b> op rekening</span>
        <span><b>${stats.paymentCounts.ok}</b> OK/Ideal</span>
      </section>
      <section class="delivery-dashboard-cardlet${stats.reviewCount ? " has-warning" : ""}">
        <h4>Acties nodig</h4>
        <strong>${stats.reviewCount}</strong>
        <span>controle nodig</span>
        <span>${stats.unknownCount} onbekende klant/adres</span>
        <span>${stats.missingPaymentCount} betaalstatus ontbreekt</span>
      </section>
      <section class="delivery-dashboard-cardlet delivery-dashboard-save" data-delivery-save-status="${escapeHtml(latestSaveState.status)}">
        <h4>Correcties/run</h4>
        <strong>${escapeHtml(getSaveStatusText())}</strong>
        <span>${escapeHtml(displayTitle || "Nog geen run geladen")}</span>
        <span>${escapeHtml(latestSaveState.message || "Nog niet opgeslagen")}</span>
        <button type="button" class="secondary" data-delivery-dashboard-save data-delivery-save-action="${escapeHtml(saveButtonAction)}" ${canSaveNewRun || canSaveCorrections ? "" : "disabled"}>${escapeHtml(saveButtonLabel)}</button>
      </section>
    `;
  }

  function getStopLabel(stop) {
    return stop?.customerName || stop?.address || "Stop onbekend";
  }

  function isWarmStop(stop) {
    return Boolean(stop?.categories?.includes("warm") || getAllProducts([stop]).some((product) => isWarmPreparationProduct(product)));
  }

  function isTimeCriticalStop(stop) {
    if (!stop?.timeWindow) {
      return false;
    }

    if (isWarmStop(stop)) {
      return true;
    }

    const firstTime = getFirstTimeMinutes(stop.timeWindow);
    return firstTime !== null && firstTime <= (9 * 60) + 30;
  }

  function getDriverWarnings(stops) {
    const warnings = [];

    (Array.isArray(stops) ? stops : []).forEach((stop) => {
      const label = getStopLabel(stop);

      if (stop.paymentStatus === "Niet betaald") {
        warnings.push({ level: "red", text: `Niet betaald: ${label}` });
      }

      if (isWarmStop(stop)) {
        warnings.push({ level: "red", text: `Warm controleren: ${label}` });
      }

      if (isTimeCriticalStop(stop)) {
        warnings.push({ level: "red", text: `Tijdkritisch ${stop.timeWindow}: ${label}` });
      }

      if (stopHasReview(stop)) {
        warnings.push({ level: "orange", text: `Controle nodig: ${label}` });
      }

      if (stop.remark) {
        warnings.push({ level: "orange", text: `Opmerking: ${label} - ${stop.remark}` });
      }

      if (!stop.customerName || !stop.address) {
        warnings.push({ level: "orange", text: `Onbekende klant/adres: ${label}` });
      }

      if (stop.paymentStatus === "Op rekening") {
        warnings.push({ level: "blue", text: `Op rekening: ${label}` });
      }
    });

    return warnings.filter((warning, index, source) =>
      source.findIndex((item) => item.level === warning.level && item.text === warning.text) === index
    );
  }

  function renderDriverPreview(stops, deliveryDate) {
    if (!driverPreviewElement) {
      return;
    }

    if (!Array.isArray(stops) || !stops.length) {
      driverPreviewElement.classList.add("empty");
      driverPreviewElement.textContent = "Nog geen chauffeurweergave beschikbaar.";
      return;
    }

    const firstStop = stops[0];
    const warnings = getDriverWarnings(stops);
    const checklist = [
      "route bekeken",
      "producten gecontroleerd",
      "warm gecontroleerd",
      "bijzonderheden gelezen",
      "vertrekken"
    ];

    driverPreviewElement.classList.remove("empty");
    driverPreviewElement.innerHTML = `
      <div class="delivery-driver-meta">
        <span><strong>Datum</strong>${escapeHtml(deliveryDate || "Datum controle nodig")}</span>
        <span><strong>Routeblok</strong>Ronde 1</span>
      </div>
      <div class="delivery-driver-warning-list">
        ${warnings.length
          ? warnings.slice(0, 12).map((warning) => `
            <div class="delivery-driver-warning" data-delivery-driver-warning="${escapeHtml(warning.level)}">${escapeHtml(warning.text)}</div>
          `).join("")
          : "<div class=\"delivery-driver-warning\" data-delivery-driver-warning=\"blue\">Geen chauffeurwaarschuwingen gevonden.</div>"}
      </div>
      <div class="delivery-driver-first-stop">
        <strong>Eerste stop</strong>
        <span>${escapeHtml(firstStop.customerName || "Klant onbekend")}</span>
        <small>${escapeHtml(firstStop.timeWindow || "Tijd controle nodig")} - ${escapeHtml(firstStop.address || "Adres onbekend")}</small>
      </div>
      <div class="delivery-driver-checklist">
        ${checklist.map((item) => `
          <div class="delivery-driver-check-item">
            <span aria-hidden="true"></span>
            <strong>${escapeHtml(item)}</strong>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderStopDetailProducts(stop) {
    const products = getSortedProductsForStop(stop);

    if (!products.length) {
      return "<div class=\"delivery-stop-detail-empty\">Geen exacte productregels gekoppeld.</div>";
    }

    return products.map((product) => {
      const isLargeCount = Number(product.count) >= 10;
      const isWarmProduct = product.category === "warm" || WARM_PREPARATION_PATTERN.test(product.rawLine || "");

      return `
        <div class="delivery-stop-detail-product${isWarmProduct ? " has-warm" : ""}">
          <strong class="${isLargeCount ? "is-large" : ""}">${escapeHtml(product.count || "?")}</strong>
          <span>${escapeHtml(product.rawLine)}</span>
          ${product.category ? `<span class="delivery-category-chip" data-delivery-category="${escapeHtml(product.category)}">${escapeHtml(product.category)}</span>` : ""}
          ${product.needsReview ? "<small>controle nodig</small>" : ""}
        </div>
      `;
    }).join("");
  }

  function renderProblemReportForm(stop) {
    if (!stop?.isProblemFormOpen) {
      return "";
    }

    return `
      <form class="delivery-problem-form" data-delivery-problem-form>
        <label>
          <span>Probleemtype</span>
          <select name="problemType">
            ${DELIVERY_PROBLEM_TYPES.map((type) => `
              <option value="${escapeHtml(type)}">${escapeHtml(type)}</option>
            `).join("")}
          </select>
        </label>
        <label>
          <span>Korte opmerking</span>
          <input type="text" name="problemRemark" maxlength="160" placeholder="Bijvoorbeeld: klant neemt niet op">
        </label>
        <small>Tijd wordt automatisch lokaal ingevuld bij opslaan.</small>
        <div class="delivery-problem-actions">
          <button type="submit" class="secondary">Probleem opslaan</button>
          <button type="button" class="secondary" data-delivery-cancel-problem>Sluiten</button>
        </div>
      </form>
    `;
  }

  function renderStopDetail(stops = latestRouteStops) {
    if (!stopDetailElement) {
      return;
    }

    const normalizedStops = Array.isArray(stops) ? stops : [];
    const stop = normalizedStops[selectedDeliveryStopIndex] || null;

    if (!stop) {
      stopDetailElement.classList.add("empty");
      stopDetailElement.textContent = "Selecteer een stop voor chauffeur-preview.";
      return;
    }

    if (driverPreviewModeElement) {
      driverPreviewModeElement.open = true;
    }

    const categories = stop.categories?.length ? stop.categories : ["controle nodig"];
    const hasWarm = isWarmStop(stop);
    const hasReview = stopHasReview(stop);
    const problemText = getStopProblemText(stop);
    const navigationUrl = stop.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.address)}`
      : "";

    stopDetailElement.classList.remove("empty");
    stopDetailElement.innerHTML = `
      <section class="delivery-stop-detail-surface${hasWarm ? " has-warm" : ""}${hasReview ? " needs-review" : ""}">
        <div class="delivery-stop-detail-hero">
          <div>
            <span>Stop ${selectedDeliveryStopIndex + 1}</span>
            <h4>${escapeHtml(stop.customerName || "Klant onbekend")}</h4>
          </div>
          <strong>${escapeHtml(stop.timeWindow || "Tijd controle nodig")}</strong>
        </div>
        <div class="delivery-stop-detail-address">
          <span>${escapeHtml(stop.address || "Adres onbekend")}</span>
          ${navigationUrl
            ? `<a class="secondary delivery-navigation-button" href="${escapeHtml(navigationUrl)}" target="_blank" rel="noopener">Navigeer</a>`
            : "<button type=\"button\" class=\"secondary delivery-navigation-button\" disabled>Navigeer</button>"}
        </div>
        <div class="delivery-stop-detail-status">
          <span class="delivery-payment-chip" data-delivery-payment="${escapeHtml(stop.paymentStatus || "controle nodig")}">${escapeHtml(stop.paymentStatus || "controle nodig")}</span>
          <div class="delivery-stop-categories">
            ${categories.map((category) => `
              <span class="delivery-category-chip" data-delivery-category="${escapeHtml(category)}">${escapeHtml(category)}</span>
            `).join("")}
          </div>
        </div>
        ${hasWarm ? "<div class=\"delivery-stop-detail-alert is-warm\">Warm extra controleren</div>" : ""}
        ${problemText ? `<div class="delivery-stop-detail-alert is-problem">Laatste probleemmelding: ${escapeHtml(problemText)}</div>` : ""}
        ${hasReview ? `<div class="delivery-stop-detail-alert">Controle nodig${stop.notes.length ? `: ${escapeHtml(stop.notes.join(", "))}` : ""}</div>` : ""}
        <div class="delivery-stop-detail-remark">
          <strong>Opmerking</strong>
          <span>${escapeHtml(stop.remark || "Geen opmerking")}</span>
        </div>
        <div class="delivery-stop-detail-products">
          <strong>Exacte productregels</strong>
          ${renderStopDetailProducts(stop)}
        </div>
        <div class="delivery-stop-detail-actions">
          <button type="button" class="secondary" disabled>Geleverd</button>
          <button type="button" class="secondary" disabled>Betaald</button>
          <button type="button" class="secondary" data-delivery-open-problem>Probleem melden</button>
        </div>
        ${renderProblemReportForm(stop)}
      </section>
    `;
  }

  function selectDeliveryStop(index, { scrollRoute = false } = {}) {
    const normalizedIndex = Number(index);

    if (!Number.isInteger(normalizedIndex) || !latestRouteStops[normalizedIndex]) {
      return;
    }

    selectedDeliveryStopIndex = normalizedIndex;
    renderRouteBlocks(latestRouteStops);
    renderStopDetail(latestRouteStops);

    if (scrollRoute) {
      scrollToDeliveryStop(normalizedIndex);
    }
  }

  function getStopCorrectionPaymentValue(stop) {
    if (!stop?.paymentStatus) {
      return "Controle nodig";
    }

    if (stop.paymentStatus === "Pin") return "Pin betaald";
    if (stop.paymentStatus === "Contant") return "Contant betaald";
    if (stop.paymentStatus === "Tikkie") return "Tikkie gestuurd";

    return PAYMENT_CORRECTION_OPTIONS.includes(stop.paymentStatus)
      ? stop.paymentStatus
      : "Controle nodig";
  }

  function renderStopCorrectionForm(stop, index) {
    if (!stop.isEditing) {
      return "";
    }

    const paymentValue = getStopCorrectionPaymentValue(stop);
    const reviewChecked = stopHasReview(stop) ? "checked" : "";

    return `
      <form class="delivery-stop-correction" data-delivery-stop-correction="${index}">
        <label>
          <span>Tijd</span>
          <input type="text" name="timeWindow" value="${escapeHtml(stop.timeWindow || "")}" placeholder="bijv. 09:30 of 10:00 / 11:00">
        </label>
        <label>
          <span>Betaalstatus</span>
          <select name="paymentStatus">
            ${PAYMENT_CORRECTION_OPTIONS.map((option) => `
              <option value="${escapeHtml(option)}" ${option === paymentValue ? "selected" : ""}>${escapeHtml(option)}</option>
            `).join("")}
          </select>
        </label>
        <label>
          <span>Belangrijkste opmerking</span>
          <input type="text" name="remark" value="${escapeHtml(stop.remark || "")}" placeholder="bijv. receptie, bellen, deurcode">
        </label>
        <label class="delivery-stop-correction-check">
          <input type="checkbox" name="needsReview" ${reviewChecked}>
          <span>Controle nodig</span>
        </label>
        <div class="delivery-stop-correction-actions">
          <button type="submit" class="secondary">Correctie toepassen</button>
          <button type="button" class="secondary" data-delivery-cancel-correction="${index}">Sluiten</button>
        </div>
      </form>
    `;
  }

  function renderRouteBlocks(stops) {
    if (!routeBlocksElement) {
      return;
    }

    if (!Array.isArray(stops) || !stops.length) {
      routeBlocksElement.classList.add("empty");
      routeBlocksElement.textContent = "Nog geen routeblokken beschikbaar.";
      return;
    }

    routeBlocksElement.classList.remove("empty");
    routeBlocksElement.innerHTML = `
      <section class="delivery-route-block">
        <h4>Ronde 1</h4>
        <div class="delivery-route-stop-list">
          ${stops.map((stop, index) => {
            const categories = stop.categories.length
              ? stop.categories
              : ["controle nodig"];
            const hasReview = stopHasReview(stop);
            const problemText = getStopProblemText(stop);

            return `
              <article id="deliveryRouteStop${index}" class="delivery-route-stop${stop.categories.includes("warm") ? " has-warm" : ""}${hasReview ? " needs-review" : ""}${problemText ? " has-problem" : ""}${selectedDeliveryStopIndex === index ? " is-selected" : ""}" data-delivery-route-stop="${index}">
                <div class="delivery-stop-header">
                  <div class="delivery-stop-title">${index + 1}. ${escapeHtml(stop.customerName || "Klant onbekend")}</div>
                  <div class="delivery-stop-time">${escapeHtml(stop.timeWindow || "Tijd controle nodig")}</div>
                </div>
                ${problemText ? `<div class="delivery-stop-problem-badge">Probleem: ${escapeHtml(problemText)}</div>` : ""}
                <div class="delivery-stop-address">${escapeHtml(stop.address || "Adres onbekend")}</div>
                <div class="delivery-stop-status-row">
                  <span class="delivery-payment-chip" data-delivery-payment="${escapeHtml(stop.paymentStatus || "controle nodig")}">${escapeHtml(stop.paymentStatus || "controle nodig")}</span>
                  <div class="delivery-stop-categories">
                    ${categories.map((category) => `
                      <span class="delivery-category-chip" data-delivery-category="${escapeHtml(category)}">${escapeHtml(category)}</span>
                    `).join("")}
                  </div>
                </div>
                <div class="delivery-stop-remark">${escapeHtml(stop.remark || "Opmerking controle nodig")}</div>
                ${hasReview ? `<div class="delivery-stop-note">controle nodig${stop.notes.length ? `: ${escapeHtml(stop.notes.join(", "))}` : ""}</div>` : ""}
                <button type="button" class="secondary delivery-stop-correct-button" data-delivery-edit-stop="${index}">Corrigeren</button>
                ${renderStopCorrectionForm(stop, index)}
              </article>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function toggleStopCorrection(index, isOpen) {
    const stop = latestRouteStops[index];

    if (!stop) {
      return;
    }

    stop.isEditing = isOpen;
    renderRouteBlocks(latestRouteStops);
  }

  function applyStopCorrection(form) {
    const index = Number(form?.dataset?.deliveryStopCorrection);
    const stop = latestRouteStops[index];

    if (!stop || !form) {
      return;
    }

    const formData = new FormData(form);
    const paymentStatus = String(formData.get("paymentStatus") || "").trim();
    const timeWindow = String(formData.get("timeWindow") || "").trim();
    const remark = String(formData.get("remark") || "").trim();
    const needsReview = formData.get("needsReview") === "on";

    stop.timeWindow = timeWindow;
    stop.paymentStatus = paymentStatus === "Controle nodig" ? "" : paymentStatus;
    stop.remark = remark;
    stop.reviewOverride = needsReview ? true : false;
    stop.needsReview = needsReview;
    stop.isEditing = false;

    if (needsReview) {
      const existingNotes = Array.isArray(stop.notes) ? stop.notes : [];
      stop.notes = existingNotes.length ? existingNotes : ["controle nodig: handmatig gemarkeerd"];
    } else {
      stop.notes = [];
    }

    markDeliveryLocallyCorrected();
    rerenderDeliveryPreview({ refreshPrint: true });
  }

  function toggleProblemReportForm(isOpen) {
    const stop = latestRouteStops[selectedDeliveryStopIndex];

    if (!stop) {
      return;
    }

    stop.isProblemFormOpen = isOpen;
    renderStopDetail(latestRouteStops);
  }

  function applyProblemReport(form) {
    const stop = latestRouteStops[selectedDeliveryStopIndex];

    if (!stop || !form) {
      return;
    }

    const formData = new FormData(form);
    const problemType = String(formData.get("problemType") || "").trim();
    const problemRemark = String(formData.get("problemRemark") || "").trim();
    stop.driverProblem = {
      type: DELIVERY_PROBLEM_TYPES.includes(problemType) ? problemType : "Overig",
      remark: problemRemark,
      reportedAt: new Date().toISOString()
    };
    stop.isProblemFormOpen = false;
    rerenderDeliveryPreview({ refreshPrint: false });
  }

  function getSortedProductsForStop(stop) {
    return [...(Array.isArray(stop?.products) ? stop.products : [])].sort((productA, productB) => {
      const warmDelta = (productB.category === "warm" ? 1 : 0) - (productA.category === "warm" ? 1 : 0);
      return warmDelta;
    });
  }

  function renderProductOverview(stops) {
    if (!productOverviewElement) {
      return;
    }

    const stopsWithProducts = (Array.isArray(stops) ? stops : [])
      .map((stop) => ({
        ...stop,
        products: getSortedProductsForStop(stop)
      }))
      .filter((stop) => stop.products.length);

    if (!stopsWithProducts.length) {
      productOverviewElement.classList.add("empty");
      productOverviewElement.textContent = "Nog geen productregels beschikbaar.";
      return;
    }

    productOverviewElement.classList.remove("empty");
    productOverviewElement.innerHTML = stopsWithProducts.map((stop, stopIndex) => `
      <section class="delivery-product-stop">
        <h4>${stopIndex + 1}. ${escapeHtml(stop.customerName || "Klant onbekend")}</h4>
        <div class="delivery-stop-address">${escapeHtml(stop.address || "Adres onbekend")}</div>
        <div class="delivery-product-list">
          ${stop.products.map((product) => {
            const numericCount = Number(product.count);
            const isLargeCount = Number.isFinite(numericCount) && numericCount >= 10;

            return `
              <div class="delivery-product-row">
                <span class="delivery-product-count${isLargeCount ? " is-large" : ""}">${escapeHtml(product.count || "?")}</span>
                <span class="delivery-product-text">${escapeHtml(product.rawLine)}</span>
                ${product.category ? `<span class="delivery-category-chip" data-delivery-category="${escapeHtml(product.category)}">${escapeHtml(product.category)}</span>` : "<span></span>"}
                ${product.needsReview ? `<span class="delivery-product-note">controle nodig${product.count ? "" : ": aantal niet herkend"}</span>` : ""}
              </div>
            `;
          }).join("")}
        </div>
      </section>
    `).join("");
  }

  function clearPrintPreview() {
    if (!printPreviewElement) {
      return;
    }

    printPreviewElement.classList.add("empty");
    printPreviewElement.textContent = "Klik op Printvoorbeeld maken om de vier bladen te tonen.";
  }

  function getAllProducts(stops) {
    return (Array.isArray(stops) ? stops : []).flatMap((stop) =>
      getSortedProductsForStop(stop).map((product) => ({
        ...product,
        customerName: stop.customerName || "",
        address: stop.address || "",
        timeWindow: stop.timeWindow || ""
      }))
    );
  }

  function getProductCountNumber(product) {
    const count = Number.parseFloat(String(product?.count || "").replace(",", "."));
    return Number.isFinite(count) && count > 0 ? count : 0;
  }

  function isCuttingProduct(product) {
    const rawLine = String(product?.rawLine || "");

    if (!rawLine || NOT_CUTTING_PATTERN.test(rawLine)) {
      return false;
    }

    return CUTTING_PATTERN.test(rawLine);
  }

  function isWarmPreparationProduct(product) {
    return WARM_PREPARATION_PATTERN.test(String(product?.rawLine || ""));
  }

  function formatSeconds(seconds) {
    if (!Number.isFinite(seconds) || seconds <= 0) {
      return "0 minuten";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (!minutes) {
      return `${remainingSeconds} seconden`;
    }

    if (!remainingSeconds) {
      return `${minutes} minuten`;
    }

    return `${minutes} minuten ${remainingSeconds} seconden`;
  }

  function formatMinutes(minutes) {
    if (!Number.isFinite(minutes) || minutes <= 0) {
      return "0 minuten";
    }

    return `${minutes} minuten`;
  }

  function getFirstTimeMinutes(timeWindow) {
    const match = String(timeWindow || "").match(/\b(\d{1,2}):(\d{2})\b/);

    if (!match) {
      return null;
    }

    const hours = Number.parseInt(match[1], 10);
    const minutes = Number.parseInt(match[2], 10);

    if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
      return null;
    }

    return (hours * 60) + minutes;
  }

  function formatClock(minutes) {
    const dayMinutes = 24 * 60;
    const normalizedMinutes = ((minutes % dayMinutes) + dayMinutes) % dayMinutes;
    const hours = Math.floor(normalizedMinutes / 60);
    const restMinutes = normalizedMinutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(restMinutes).padStart(2, "0")}`;
  }

  function calculatePreparation(stops) {
    const products = getAllProducts(stops);
    const reviewNotes = [];
    let cuttingCount = 0;
    let warmCount = 0;
    let earliestWarmTime = null;

    products.forEach((product) => {
      const count = getProductCountNumber(product);

      if (isCuttingProduct(product)) {
        if (count) {
          cuttingCount += count;
        } else {
          reviewNotes.push(`snijden controle nodig: ${product.rawLine}`);
        }
      }

      if (isWarmPreparationProduct(product)) {
        if (count) {
          warmCount += count;
        } else {
          reviewNotes.push(`warm controle nodig: ${product.rawLine}`);
        }

        const productTime = getFirstTimeMinutes(product.timeWindow);

        if (productTime === null) {
          reviewNotes.push(`warm tijd ontbreekt: ${product.customerName || "Klant onbekend"} - ${product.rawLine}`);
        } else if (earliestWarmTime === null || productTime < earliestWarmTime) {
          earliestWarmTime = productTime;
        }
      }
    });

    const cuttingSeconds = cuttingCount * 20;
    const ovenMinutes = warmCount > 0 ? 20 : 0;
    const packingMinutes = warmCount > 0 ? Math.ceil(warmCount / 20) * 5 : 0;
    const ovenMomentLabel = warmCount && earliestWarmTime !== null
      ? `${formatClock(earliestWarmTime - ovenMinutes - packingMinutes)} voor eerste warme stop ${formatClock(earliestWarmTime)}`
      : warmCount
        ? "controle nodig: tijd ontbreekt"
        : "Geen warm/snacks gevonden";

    return {
      cuttingCount,
      cuttingDurationLabel: formatSeconds(cuttingSeconds),
      warmCount,
      ovenDurationLabel: formatMinutes(ovenMinutes),
      packingDurationLabel: formatMinutes(packingMinutes),
      ovenMomentLabel,
      reviewNotes: [...new Set(reviewNotes)]
    };
  }

  function renderPrintCategoryChips(categories) {
    const normalizedCategories = normalizeCategories(categories);

    if (!normalizedCategories.length) {
      return `<span class="delivery-print-note">controle nodig</span>`;
    }

    return normalizedCategories.map((category) => `
      <span class="delivery-category-chip" data-delivery-category="${escapeHtml(category)}">${escapeHtml(category)}</span>
    `).join("");
  }

  function renderPrintPreparationPage(stops, warnings) {
    const products = getAllProducts(stops);
    const warmStops = stops.filter((stop) =>
      stop.categories.includes("warm") || getAllProducts([stop]).some((product) => isWarmPreparationProduct(product))
    );
    const reviewStops = stops.filter(stopHasReview);
    const preparation = calculatePreparation(stops);

    return `
      <section class="delivery-print-page">
        <h4>Blad 1: Voorbereiding</h4>
        <div class="delivery-print-summary">
          <span>Stops: ${stops.length}</span>
          <span>Productregels: ${products.length}</span>
          <span>Snijden: ${escapeHtml(preparation.cuttingCount)} ${preparation.cuttingCount === 1 ? "brood" : "broden"}</span>
          <span>Snijtijd: ${escapeHtml(preparation.cuttingDurationLabel)}</span>
          <span>Warm/snacks: ${escapeHtml(preparation.warmCount)} stuks</span>
          <span>Controle nodig: ${reviewStops.length + warnings.length + preparation.reviewNotes.length}</span>
        </div>
        <div class="delivery-print-section">
          <strong>Snijden</strong>
          <div>${escapeHtml(preparation.cuttingCount)} ${preparation.cuttingCount === 1 ? "brood" : "broden"} x 20 seconden = ${escapeHtml(preparation.cuttingDurationLabel)}</div>
        </div>
        <div class="delivery-print-section">
          <strong>Warm/snacks</strong>
          <div>Totaal warm: ${escapeHtml(preparation.warmCount)} stuks</div>
          <div>Oven: ${escapeHtml(preparation.ovenDurationLabel)}</div>
          <div>Inpakken: ${escapeHtml(preparation.packingDurationLabel)}</div>
          <div>Ovenmoment indicatief: ${escapeHtml(preparation.ovenMomentLabel)}</div>
        </div>
        <div class="delivery-print-section">
          <strong>Warm eerst controleren</strong>
          ${warmStops.length
            ? warmStops.map((stop, index) => `<div>${index + 1}. ${escapeHtml(stop.customerName || "Klant onbekend")} - ${escapeHtml(stop.address || "Adres onbekend")}</div>`).join("")
            : "<div>Geen warme categorie gevonden.</div>"}
        </div>
        <div class="delivery-print-section">
          <strong>Controlepunten</strong>
          ${reviewStops.length || warnings.length || preparation.reviewNotes.length
            ? [
                ...preparation.reviewNotes,
                ...reviewStops.map((stop) => `${stop.customerName || "Klant onbekend"}: ${stop.notes.join(", ") || "controle nodig"}`),
                ...warnings
              ].slice(0, 18).map((warning) => `<div>${escapeHtml(warning)}</div>`).join("")
            : "<div>Geen controlepunten.</div>"}
        </div>
      </section>
    `;
  }

  function renderPrintRoutePage(stops) {
    return `
      <section class="delivery-print-page">
        <h4>Blad 2: Route met volledige adressen</h4>
        <div class="delivery-print-route-list">
          ${stops.map((stop, index) => `
            <article class="delivery-print-route-stop${stop.categories.includes("warm") ? " has-warm" : ""}">
              <strong>${index + 1}. ${escapeHtml(stop.customerName || "Klant onbekend")}</strong>
              <span><em>Tijd:</em> ${escapeHtml(stop.timeWindow || "controle nodig")}</span>
              <span>${escapeHtml(stop.address || "Adres onbekend")}</span>
              <div><em>Wat meenemen:</em> ${renderPrintCategoryChips(stop.categories)}</div>
              <div><em>Betaling:</em> <span class="delivery-payment-chip" data-delivery-payment="${escapeHtml(stop.paymentStatus || "controle nodig")}">${escapeHtml(stop.paymentStatus || "controle nodig")}</span></div>
              <div><em>Opmerking:</em> ${escapeHtml(stop.remark || "controle nodig")}</div>
              ${stopHasReview(stop) ? `<small>controle nodig${stop.notes.length ? `: ${escapeHtml(stop.notes.join(", "))}` : ""}</small>` : ""}
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderPrintChecklistPage(stops) {
    return `
      <section class="delivery-print-page">
        <h4>Blad 3: Afvinklijst optioneel</h4>
        <div class="delivery-print-checklist">
          ${stops.map((stop, index) => `
            <div class="delivery-print-check-row">
              <span class="delivery-print-checkbox" aria-hidden="true"></span>
              <span>${index + 1}. ${escapeHtml(stop.customerName || "Klant onbekend")} - ${escapeHtml(stop.address || "Adres onbekend")}</span>
              ${stop.categories.includes("warm") ? `<strong>Warm</strong>` : ""}
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderPrintProductPage(stops) {
    const stopsWithProducts = stops
      .map((stop) => ({
        ...stop,
        products: getSortedProductsForStop(stop)
      }))
      .filter((stop) => stop.products.length);

    return `
      <section class="delivery-print-page">
        <h4>Blad 4: Productoverzicht met exacte producten en aantallen</h4>
        ${stopsWithProducts.length
          ? stopsWithProducts.map((stop, stopIndex) => `
            <article class="delivery-print-product-stop">
              <strong>${stopIndex + 1}. ${escapeHtml(stop.customerName || "Klant onbekend")}</strong>
              <span>${escapeHtml(stop.address || "Adres onbekend")}</span>
              ${stop.products.map((product) => {
                const numericCount = Number(product.count);
                const isLargeCount = Number.isFinite(numericCount) && numericCount >= 10;

                return `
                  <div class="delivery-print-product-row${product.category === "warm" ? " has-warm" : ""}">
                    <b class="${isLargeCount ? "is-large" : ""}">${escapeHtml(product.count || "?")}</b>
                    <span>${escapeHtml(product.rawLine)}</span>
                    ${product.category ? `<span class="delivery-category-chip" data-delivery-category="${escapeHtml(product.category)}">${escapeHtml(product.category)}</span>` : ""}
                    ${product.needsReview ? `<small>controle nodig${product.count ? "" : ": aantal niet herkend"}</small>` : ""}
                  </div>
                `;
              }).join("")}
            </article>
          `).join("")
          : "<div class=\"delivery-print-note\">Geen productregels gevonden.</div>"}
      </section>
    `;
  }

  function renderPrintPreview() {
    if (!printPreviewElement) {
      return;
    }

    if (!latestRouteStops.length) {
      printPreviewElement.classList.add("empty");
      printPreviewElement.textContent = "Geen routegegevens beschikbaar. Lees eerst een PDF in.";
      return;
    }

    printPreviewElement.classList.remove("empty");
    printPreviewElement.innerHTML = [
      renderPrintPreparationPage(latestRouteStops, latestParseWarnings),
      renderPrintRoutePage(latestRouteStops),
      renderPrintChecklistPage(latestRouteStops),
      renderPrintProductPage(latestRouteStops)
    ].join("");
  }

  function getDeliveryRunPayload() {
    const firstStop = latestRouteStops[0] || null;
    const payloadStops = latestRouteStops.map((stop) => ({
      customerName: stop.customerName || "",
      address: stop.address || "",
      categories: Array.isArray(stop.categories) ? stop.categories : [],
      paymentStatus: stop.paymentStatus || "",
      timeWindow: stop.timeWindow || "",
      remark: stop.remark || "",
      notes: Array.isArray(stop.notes) ? stop.notes : [],
      needsReview: Boolean(stop.needsReview),
      products: Array.isArray(stop.products) ? stop.products : []
    }));

    return {
      parserVersion: CURRENT_DELIVERY_PARSER_VERSION,
      deliveryDate: latestDeliveryDate,
      source: {
        filename: latestSourceFilename,
        hash: latestSourceHash,
        parser: latestParserSource,
        uploadedAt: latestUploadDate
      },
      routeBlocks: [
        {
          name: "Ronde 1",
          stops: payloadStops
        }
      ],
      preparation: calculatePreparation(payloadStops),
      driverPreview: {
        warnings: getDriverWarnings(payloadStops),
        firstStop: firstStop
          ? {
              customerName: firstStop.customerName || "",
              address: firstStop.address || "",
              timeWindow: firstStop.timeWindow || "",
              paymentStatus: firstStop.paymentStatus || "",
              remark: firstStop.remark || "",
              categories: normalizeCategories(firstStop.categories || [])
            }
          : null
      },
      parseWarnings: latestParseWarnings
    };
  }

  async function saveDeliveryRun() {
    if (!latestRouteStops.length || !latestSourceHash || latestHasLocalCorrections || latestSaveState.status === "saving") {
      return;
    }

    latestSaveState = {
      status: "saving",
      message: "Bezorgrun wordt opgeslagen..."
    };
    renderDashboard(latestRouteStops, latestDeliveryDate);

    try {
      const response = await fetch("/api/delivery-runs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mode: "test",
          sourceFilename: latestSourceFilename,
          sourceHash: latestSourceHash,
          payload: getDeliveryRunPayload()
        })
      });
      const result = await response.json().catch(() => ({}));

      if (response.status === 409) {
        latestSaveState = {
          status: "conflict",
          message: result?.message || "Deze run bestaat al in Supabase."
        };
      } else if (!response.ok) {
        latestSaveState = {
          status: "error",
          message: result?.message || "Opslaan is mislukt."
        };
      } else {
        latestSaveState = {
          status: "saved",
          message: "Run opgeslagen in Supabase testmodus."
        };
        latestRunUpdatedAt = result?.run?.updatedAt || "";
        void fetchSavedRuns();
      }
    } catch (error) {
      latestSaveState = {
        status: "error",
        message: error?.message || "Opslaan is mislukt."
      };
    }

    renderDashboard(latestRouteStops, latestDeliveryDate);
  }

  async function saveDeliveryCorrections() {
    if (
      !latestRouteStops.length
      || latestRunSource !== "saved"
      || !latestRunId
      || !latestRunBaseUpdatedAt
      || !latestHasLocalCorrections
      || latestSaveState.status === "updating"
    ) {
      return;
    }

    latestSaveState = {
      status: "updating",
      message: "Correcties opslaan..."
    };
    renderDashboard(latestRouteStops, latestDeliveryDate);

    try {
      const response = await fetch("/api/delivery-runs", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mode: "test",
          id: latestRunId,
          baseUpdatedAt: latestRunBaseUpdatedAt,
          payload: getDeliveryRunPayload()
        })
      });
      const result = await response.json().catch(() => ({}));

      if (response.status === 409) {
        latestSaveState = {
          status: "update-conflict",
          message: "Conflict: opnieuw openen nodig"
        };
      } else if (!response.ok) {
        latestSaveState = {
          status: "error",
          message: result?.message || "Opslaan mislukt"
        };
      } else {
        const updatedAt = result?.run?.updatedAt || "";
        latestRunUpdatedAt = updatedAt || latestRunUpdatedAt;
        latestRunBaseUpdatedAt = updatedAt || latestRunBaseUpdatedAt;
        latestHasLocalCorrections = false;
        latestSaveState = {
          status: "updated",
          message: "Correcties opgeslagen"
        };
        setStatus("Correcties opgeslagen.", "ready");
        void fetchSavedRuns();
      }
    } catch (error) {
      latestSaveState = {
        status: "error",
        message: error?.message || "Opslaan mislukt"
      };
    }

    renderDashboard(latestRouteStops, latestDeliveryDate);
    renderRunStatusBar();
  }

  async function parsePdfFile(file) {
    const buffer = await file.arrayBuffer();
    const sourceHash = await getFileHash(buffer, file);
    const bytes = new Uint8Array(buffer);
    const decodedPdf = decodeBytes(bytes);
    const decodedStreams = await extractFlateStreamText(bytes, decodedPdf);
    const sources = decodedStreams.length ? decodedStreams : [decodedPdf];
    const fragments = sources.flatMap((source) => extractTextFromPdfSource(source));
    const lines = normalizeTextLines(fragments);
    const warnings = [];

    if (!lines.length) {
      warnings.push("Geen leesbare tekst gevonden. Mogelijk gebruikt deze PDF scanbeeld, glyph-codering of compressie die de basis-parser niet ondersteunt.");
    } else if (sources.length === 1 && /\/FlateDecode\b/.test(decodedPdf) && typeof DecompressionStream !== "function") {
      warnings.push("Deze browser ondersteunt geen lokale PDF-decompressie. Het resultaat kan onvolledig zijn.");
    }

    const analysis = analyzeLines(lines, warnings);
    const extractionQuality = getTextExtractionQuality(lines, analysis.recognized);

    return {
      sourceHash,
      buffer,
      lines,
      ...analysis,
      extractionQuality,
      parser: "browser-local-v1"
    };
  }

  function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    const chunkSize = 8192;
    let binary = "";

    for (let index = 0; index < bytes.length; index += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
    }

    return btoa(binary);
  }

  async function parsePdfFileWithServer(file, browserResult) {
    let response;
    const requestUrl = new URL("/api/delivery-parse-pdf", window.location.origin);
    const requestBody = JSON.stringify({
      mode: "test",
      sourceFilename: file.name || "",
      sourceHash: browserResult.sourceHash || "",
      fileBase64: arrayBufferToBase64(browserResult.buffer)
    });
    const requestBodyBytes = new Blob([requestBody]).size;

    if (requestBodyBytes > 4.25 * 1024 * 1024) {
      const sizeError = new Error(`Serverparser-aanvraag is te groot (${formatFileSize(requestBodyBytes)}). Gebruik een PDF van maximaal 3 MB.`);
      sizeError.statusCode = 413;
      throw sizeError;
    }

    try {
      response = await fetch(requestUrl.toString(), {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json"
        },
        body: requestBody
      });
    } catch (error) {
      const message = error?.message || "netwerkfout";
      const networkError = new Error(`Serverparser kon niet worden bereikt: ${message}. URL: ${requestUrl.pathname}. Origin: ${window.location.origin}. Aanvraag: ${formatFileSize(requestBodyBytes) || `${requestBodyBytes} bytes`}.`);
      networkError.statusCode = 0;
      console.error("[delivery] serverparser fetch mislukt", {
        url: requestUrl.toString(),
        origin: window.location.origin,
        requestBodyBytes,
        online: navigator.onLine,
        error
      });
      throw networkError;
    }

    const responseText = await response.text();
    let result = {};

    if (responseText) {
      try {
        result = JSON.parse(responseText);
      } catch {
        result = {
          message: responseText.slice(0, 240)
        };
      }
    }

    if (!response.ok || !result?.success) {
      const statusLabel = `HTTP ${response.status}${response.statusText ? ` ${response.statusText}` : ""}`;
      const detail = result?.message || result?.warnings?.[0] || "Serverparser kon deze PDF niet lezen.";
      const message = `Serverparser mislukt (${statusLabel}): ${detail}`;
      const error = new Error(message);
      error.statusCode = response.status;
      throw error;
    }

    const lines = Array.isArray(result.lines)
      ? result.lines.map((line) => String(line || "").trim()).filter(Boolean)
      : [];
    const parser = String(result.parser || "").trim() || "pdfjs-server-v1";
    const warnings = [
      `Parserbron: ${parser}`,
      ...((Array.isArray(result.warnings) ? result.warnings : []).filter(Boolean))
    ];
    const analysis = analyzeLines(lines, warnings);
    const extractionQuality = getTextExtractionQuality(lines, analysis.recognized);

    return {
      sourceHash: browserResult.sourceHash || "",
      lines,
      ...analysis,
      extractionQuality,
      parser
    };
  }

  async function handlePdfSelection(fileOverride = null) {
    const file = fileOverride || pdfInput?.files?.[0] || null;

    if (!file) {
      setStatus("Nog geen PDF geselecteerd.");
      setEmptyPreview();
      return;
    }

    if (!isPdfFile(file)) {
      setStatus("Kies een PDF-bestand.", "error");
      setEmptyPreview("Selecteer een PDF om tekst te lezen.");
      pdfInput.value = "";
      return;
    }

    const sizeLabel = formatFileSize(file.size);
    setStatus(`${file.name}${sizeLabel ? ` (${sizeLabel})` : ""} geselecteerd. Tekst wordt lokaal gelezen...`, "ready");
    setEmptyPreview("PDF wordt lokaal gelezen...");
    setDeliveryWorkVisible(true);

    try {
      const result = await parsePdfFile(file);
      latestSourceFilename = file.name || "";
      latestSourceHash = result.sourceHash || "";
      latestParserSource = result.parser || "browser-local-v1";
      latestUploadDate = new Date().toISOString();
      latestRunSource = "local";
      latestRunId = "";
      latestRunUpdatedAt = "";
      latestRunBaseUpdatedAt = "";
      latestSaveState = {
        status: "ready",
        message: "Nog niet opgeslagen"
      };

      if (result.extractionQuality?.unreliable) {
        setStatus("Lokale extractie onbetrouwbaar, serverparser wordt geprobeerd.", "ready");
        renderParseResult(result.lines, result.recognized, result.warnings, result.extractionQuality, latestParserSource);

        try {
          const serverResult = await parsePdfFileWithServer(file, result);
          latestParserSource = serverResult.parser || "pdfjs-server-v1";
          latestSaveState = {
            status: "ready",
            message: "Nog niet opgeslagen"
          };
          renderParseResult(serverResult.lines, serverResult.recognized, serverResult.warnings, serverResult.extractionQuality, latestParserSource);

          if (serverResult.extractionQuality?.unreliable || !serverResult.lines.length) {
            latestSaveState = {
              status: "blocked",
              message: "Niet opgeslagen: serverparser kon de PDF niet betrouwbaar lezen."
            };
            renderDashboard([], "");
            setStatus("Serverparser kon deze PDF niet betrouwbaar lezen.", "error");
          } else {
            setStatus(`${file.name}${sizeLabel ? ` (${sizeLabel})` : ""} gelezen met serverparser.`, "ready");
          }
        } catch (serverError) {
          latestSaveState = {
            status: "blocked",
            message: "Niet opgeslagen: serverparser kon de PDF niet lezen."
          };
          renderUnreliableExtraction(result.lines, [
            ...result.warnings,
            serverError?.message || "Serverparser kon deze PDF niet lezen."
          ], result.extractionQuality, latestParserSource);
          renderDashboard([], "");
          setStatus(serverError?.message || "Serverparser kon deze PDF niet lezen.", "error");
        }
      } else {
        renderParseResult(result.lines, result.recognized, result.warnings, result.extractionQuality, latestParserSource);
        setStatus(`${file.name}${sizeLabel ? ` (${sizeLabel})` : ""} geselecteerd en lokaal gelezen.`, "ready");
      }
    } catch (error) {
      console.warn("[delivery] PDF lokaal lezen mislukt", error);
      setStatus("PDF kon lokaal niet worden gelezen.", "error");
      renderParseResult([], [], ["PDF kon lokaal niet worden gelezen. Probeer een tekst-PDF of kies later een server/parser-stap."]);
    }
  }

  setEmptyPreview();
  void fetchSavedRuns();
  startChooseButton?.addEventListener("click", () => {
    pdfInput?.click();
  });
  dropZoneElement?.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
      return;
    }

    pdfInput?.click();
  });
  dropZoneElement?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      pdfInput?.click();
    }
  });
  ["dragenter", "dragover"].forEach((eventName) => {
    dropZoneElement?.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropZoneElement.classList.add("is-dragging");
    });
  });
  ["dragleave", "drop"].forEach((eventName) => {
    dropZoneElement?.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropZoneElement.classList.remove("is-dragging");
    });
  });
  dropZoneElement?.addEventListener("drop", (event) => {
    const file = event.dataTransfer?.files?.[0] || null;

    if (!file) {
      setStatus("Geen bestand gevonden in de upload.", "error");
      return;
    }

    void handlePdfSelection(file);
  });
  pdfInput?.addEventListener("change", () => {
    void handlePdfSelection();
  });
  savedRefreshButton?.addEventListener("click", () => {
    void fetchSavedRuns();
  });
  savedRunsElement?.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-delivery-open-run]");

    if (!openButton) {
      return;
    }

    void openSavedRun(openButton.dataset.deliveryOpenRun);
  });
  routeBlocksElement?.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-delivery-edit-stop]");
    const cancelButton = event.target.closest("[data-delivery-cancel-correction]");
    const routeStop = event.target.closest("[data-delivery-route-stop]");

    if (editButton) {
      toggleStopCorrection(Number(editButton.dataset.deliveryEditStop), true);
      return;
    }

    if (cancelButton) {
      toggleStopCorrection(Number(cancelButton.dataset.deliveryCancelCorrection), false);
      return;
    }

    if (event.target.closest(".delivery-stop-correction")) {
      return;
    }

    if (routeStop) {
      selectDeliveryStop(Number(routeStop.dataset.deliveryRouteStop));
    }
  });
  routeBlocksElement?.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-delivery-stop-correction]");

    if (!form) {
      return;
    }

    event.preventDefault();
    applyStopCorrection(form);
  });
  actionsOverviewElement?.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-delivery-view-stop]");

    if (!viewButton) {
      return;
    }

    selectDeliveryStop(Number(viewButton.dataset.deliveryViewStop), { scrollRoute: true });
  });
  stopDetailElement?.addEventListener("click", (event) => {
    const openProblemButton = event.target.closest("[data-delivery-open-problem]");
    const cancelProblemButton = event.target.closest("[data-delivery-cancel-problem]");

    if (openProblemButton) {
      toggleProblemReportForm(true);
      return;
    }

    if (cancelProblemButton) {
      toggleProblemReportForm(false);
    }
  });
  stopDetailElement?.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-delivery-problem-form]");

    if (!form) {
      return;
    }

    event.preventDefault();
    applyProblemReport(form);
  });
  dashboardElement?.addEventListener("click", (event) => {
    const printButton = event.target.closest("[data-delivery-dashboard-print]");
    const saveButton = event.target.closest("[data-delivery-dashboard-save]");

    if (saveButton && !saveButton.disabled) {
      if (saveButton.dataset.deliverySaveAction === "patch") {
        void saveDeliveryCorrections();
      } else {
        void saveDeliveryRun();
      }
      return;
    }

    if (printButton && !printButton.disabled) {
      renderPrintPreview();
      printPreviewElement?.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  });
  printPreviewButton?.addEventListener("click", renderPrintPreview);
})();
