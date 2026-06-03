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
  const quickEditElement = document.getElementById("deliveryQuickEdit");
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
  const recognitionReportElement = document.getElementById("deliveryRecognitionReport");
  const printPreviewButton = document.getElementById("deliveryPrintPreviewButton");
  const printPreviewElement = document.getElementById("deliveryPrintPreview");
  const plannerStatusElement = document.querySelector("[data-delivery-planner-status]");
  const plannerApprovePrintButton = document.querySelector("[data-delivery-route-print]");
  const plannerSaveButton = document.querySelector("[data-delivery-route-save]");
  const driverModeOpenButton = document.querySelector("[data-delivery-driver-mode-open]");
  const driverModeElement = document.getElementById("deliveryDriverMode");
  const driverModeContentElement = document.getElementById("deliveryDriverModeContent");
  const employeeDeliveryPanelElement = document.querySelector("[data-panel=\"employee-delivery\"]");
  const employeeDeliverySavedRunsElement = document.getElementById("employeeDeliverySavedRuns");
  const employeeDeliveryRefreshButton = document.getElementById("employeeDeliveryRefreshButton");
  const employeeDriverModeElement = document.getElementById("employeeDeliveryDriverMode");
  const employeeDriverModeContentElement = document.getElementById("employeeDeliveryDriverModeContent");
  const savedRoutesSectionElement = document.querySelector(".delivery-saved-section");
  const routeResetButton = document.querySelector("[data-delivery-route-reset]");

  const POSTCODE_PATTERN = /\b[1-9][0-9]{3}\s?[A-Z]{2}\b/i;
  const ADDRESS_PATTERN = /\b[A-Za-zÀ-ÿ.' -]*(?:straat|laan|weg|plein|hof|pad|dijk|kade|singel|steeg|plantsoen|boulevard)\s+\d+[a-z]?(?:\s*,?\s*[A-Za-zÀ-ÿ.' -]+)?\b/i;
  const STREET_PLACE_PATTERN = /\b[A-Za-zÀ-ÿ.' -]*(?:straat|laan|weg|plein|hof|pad|dijk|kade|singel|steeg|plantsoen|boulevard)\s*,\s*[A-Za-zÀ-ÿ.' -]+\b/i;
  const GENERIC_ADDRESS_PATTERN = /^[A-Za-zÀ-ÿ.' -]+\s+\d+[a-z]?(?:[-/]\d+)?\s*,?\s+[A-Za-zÀ-ÿ.' -]+$/i;
  const PLACE_ONLY_PATTERN = /^(?:Neede|Borculo|Haarlo|Eibergen|Diepenheim)$/i;
  const PRODUCT_COUNT_PATTERN = /^(?:(\d+[,.]?\d*)|(\d+)\s*x|x\s*(\d+))\s+\S+/i;
  const PRODUCT_CATEGORY_ORDER = ["brood", "gebak", "broodjes", "warm"];
  const PAYMENT_STATUS_VALUES = ["OK", "Op rekening", "Niet betaald", "Betaald via Ideal", "Contant", "Pin", "Tikkie"];
  const DELIVERY_TIME_ZONE = "Europe/Amsterdam";
  const CURRENT_DELIVERY_PARSER_VERSION = "delivery-local-v5";
  const OLD_PARSER_WARNING = "Deze run is gemaakt met een oudere parser. Upload de PDF opnieuw voor de nieuwste herkenning.";
  const DRIVER_MODE_STORAGE_PREFIX = "delivery-driver-status-v1:";
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
  const NOT_CUTTING_PATTERN = /\b(ongesneden|niet\s+gesneden|niet\s+snijden|\d+\s*plakken?|plakken?)\b/i;
  const NON_CUTTING_BREAD_PATTERN = /\b(broodjes?|bolletjes?|bol\b|punt(?:en)?|pistolet|stokbrood|mini\s+bol|witte\s+punt|rozijnenbol)\b/i;
  const CUTTING_BREAD_PATTERN = /\b(bus|mandje|vloer|volkoren|tarwe|waldkorn|spelt|meergr|hollands\s+grof|grof\s+volkoren|prokorn|poesta|duutse\s+kneud|achterhoek\s+duuster|ruwe\s+bolster|oeoerenwit|admiraal|krentenbrood|rozijnenbrood|krentewegge|zomergranen|zesgranen)\b/i;
  const WARM_PREPARATION_PATTERN = /\b(warm|saucijs|saucijzen|saucijzenbroodje|appelflap|frikandel|worstenbrood|ham[-\s]?kaas|kaassouffle|kroket|snack|pizza)\b/i;
  function getEmptyRouteAdviceReport() {
    return {
      active: false,
      warmStopCount: 0,
      postcodeClusterCount: 0,
      routeBalance: "-",
      sampleScores: [],
      reasons: []
    };
  }

  let latestRouteStops = [];
  let latestParseWarnings = [];
  let latestDeliveryDate = "";
  let latestSourceFilename = "";
  let latestSourceHash = "";
  let latestParserSource = "";
  let latestTextLineCount = 0;
  let latestUploadDate = "";
  let latestRunSource = "empty";
  let latestRunId = "";
  let latestRunUpdatedAt = "";
  let latestRunBaseUpdatedAt = "";
  let latestSaveState = {
    status: "empty",
    message: "Nog niet opgeslagen"
  };
  let latestPlannerStatus = "draft";
  let latestRouteProposalState = "none";
  let latestRouteAdviceReport = getEmptyRouteAdviceReport();
  let latestRouteHistoryState = {
    status: "idle",
    runs: [],
    error: ""
  };
  let latestRouteCompleteness = {
    isIncomplete: false,
    reasons: [],
    suspectedCount: 0,
    builtCount: 0,
    missingLines: []
  };
  let latestParserQualityBlocked = false;
  let latestHasLocalCorrections = false;
  let latestParserVersionWarning = "";
  let selectedDeliveryStopIndex = -1;
  let draggedDeliveryStopIndex = -1;
  let isDriverModeOpen = false;
  let driverModeRouteNumber = 1;
  let driverModeStopIndex = 0;
  let latestDriverModeStorageKey = "";
  let latestDriverModeState = {
    stops: {}
  };
  let deliveryReferenceData = {
    customers: [],
    products: [],
    loaded: false,
    loadError: ""
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getEmptyDriverModeState() {
    return {
      stops: {}
    };
  }

  function getDriverModeStorageKey() {
    if (latestRunSource !== "saved") {
      return "";
    }

    const runKey = latestRunId || latestSourceHash;
    return runKey ? `${DRIVER_MODE_STORAGE_PREFIX}${runKey}` : "";
  }

  function loadDriverModeState() {
    const storageKey = getDriverModeStorageKey();
    latestDriverModeStorageKey = storageKey;

    if (!storageKey) {
      latestDriverModeState = getEmptyDriverModeState();
      return;
    }

    try {
      const rawValue = window.localStorage?.getItem(storageKey) || "";
      const parsedValue = rawValue ? JSON.parse(rawValue) : null;
      latestDriverModeState = parsedValue && typeof parsedValue === "object" && parsedValue.stops
        ? {
            stops: parsedValue.stops && typeof parsedValue.stops === "object" ? parsedValue.stops : {}
          }
        : getEmptyDriverModeState();
    } catch (error) {
      console.warn("[delivery] chauffeurmodus status laden mislukt", error);
      latestDriverModeState = getEmptyDriverModeState();
    }
  }

  function persistDriverModeState() {
    if (!latestDriverModeStorageKey) {
      return;
    }

    try {
      window.localStorage?.setItem(latestDriverModeStorageKey, JSON.stringify({
        stops: latestDriverModeState.stops || {}
      }));
    } catch (error) {
      console.warn("[delivery] chauffeurmodus status opslaan mislukt", error);
    }
  }

  function getDriverModeStopKey(stop) {
    const postcodePlace = getStopPostcodePlace(stop);
    const customerKey = normalizeReferenceValue(stop?.customerId || stop?.knownCustomerId || stop?.customerName || "");
    const addressKey = normalizeReferenceValue(stop?.address || "");
    const postcodeKey = normalizeReferencePostcode(stop?.postcode || postcodePlace.postcode || stop?.address || "");
    const timeKey = normalizeReferenceValue(stop?.timeWindow || "");

    return [customerKey, postcodeKey, addressKey, timeKey].filter(Boolean).join("|") || "stop-onbekend";
  }

  function getDriverModeStopState(stop) {
    const stopKey = getDriverModeStopKey(stop);
    const state = latestDriverModeState.stops?.[stopKey] || {};

    return {
      delivered: Boolean(state.delivered),
      paid: Boolean(state.paid),
      note: typeof state.note === "string" ? state.note : "",
      updatedAt: typeof state.updatedAt === "string" ? state.updatedAt : ""
    };
  }

  function updateDriverModeStopState(stop, patch) {
    const stopKey = getDriverModeStopKey(stop);

    if (!stopKey) {
      return;
    }

    latestDriverModeState.stops = latestDriverModeState.stops || {};
    latestDriverModeState.stops[stopKey] = {
      ...getDriverModeStopState(stop),
      ...patch,
      updatedAt: new Date().toISOString()
    };
    persistDriverModeState();
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

  function formatDateIsoInTimeZone(value, timeZone = DELIVERY_TIME_ZONE) {
    const date = value instanceof Date ? value : new Date(value || "");

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(date);
    const partMap = Object.fromEntries(parts.map((part) => [part.type, part.value]));

    if (!partMap.year || !partMap.month || !partMap.day) {
      return "";
    }

    return `${partMap.year}-${partMap.month}-${partMap.day}`;
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

  function getEmployeeRunDateIso(run) {
    const deliveryDate = parseDeliveryDateIso(run?.payload?.deliveryDate || "");

    if (deliveryDate) {
      return deliveryDate;
    }

    return formatDateIsoInTimeZone(
      run?.createdAt || run?.created_at || run?.payload?.source?.uploadedAt || ""
    );
  }

  function isEmployeeRunForToday(run) {
    const todayIso = formatDateIsoInTimeZone(new Date());
    return Boolean(todayIso && getEmployeeRunDateIso(run) === todayIso);
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

  function closeDeliveryLowerSections() {
    document.querySelectorAll(".delivery-lower-section[open]").forEach((section) => {
      section.open = false;
    });
  }

  function renderPlannerStatus() {
    const isPrintBlocked = isRoutePrintBlocked();
    const saveState = getRouteSaveActionState();

    if (plannerApprovePrintButton) {
      plannerApprovePrintButton.disabled = !latestRouteStops.length || isPrintBlocked;
    }

    if (plannerSaveButton) {
      plannerSaveButton.disabled = !saveState.canSave;
      plannerSaveButton.textContent = saveState.label;
      plannerSaveButton.title = saveState.title;
    }

    if (driverModeOpenButton) {
      const canOpenDriverMode = latestRunSource === "saved" && latestRouteStops.length > 0 && !isRoutePrintBlocked();
      driverModeOpenButton.disabled = !canOpenDriverMode;
      driverModeOpenButton.title = canOpenDriverMode
        ? "Open read-only chauffeurmodus"
        : "Open eerst een betrouwbare opgeslagen route";
    }

    if (routeResetButton) {
      const canReset = latestRouteStops.length > 0 && latestRouteProposalState !== "none";
      routeResetButton.hidden = !canReset;
      routeResetButton.disabled = latestRouteProposalState === "pdf-order";
    }

    if (!plannerStatusElement) {
      return;
    }

    if (isPrintBlocked) {
      plannerStatusElement.hidden = false;
      plannerStatusElement.textContent = "Route onvolledig gelezen - printen geblokkeerd";
      plannerStatusElement.dataset.deliveryPlannerState = "incomplete";
      return;
    }

    if (latestPlannerStatus === "approved" && latestRouteStops.length) {
      plannerStatusElement.hidden = false;
      plannerStatusElement.textContent = "Planning gecontroleerd";
      plannerStatusElement.dataset.deliveryPlannerState = "approved";
      return;
    }

    if (latestRouteProposalState === "suggested" && latestRouteStops.length) {
      plannerStatusElement.hidden = false;
      plannerStatusElement.textContent = "Voorstelroute gemaakt";
      plannerStatusElement.dataset.deliveryPlannerState = "suggested";
      return;
    }

    if (latestRouteProposalState === "pdf-order" && latestRouteStops.length) {
      plannerStatusElement.hidden = false;
      plannerStatusElement.textContent = "PDF-volgorde";
      plannerStatusElement.dataset.deliveryPlannerState = "pdf-order";
      return;
    }

    plannerStatusElement.hidden = true;
    plannerStatusElement.textContent = "";
    plannerStatusElement.dataset.deliveryPlannerState = "";
  }

  function resetDeliveryPlanningApproval() {
    if (latestPlannerStatus !== "approved") {
      return;
    }

    latestPlannerStatus = "draft";
    renderPlannerStatus();
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

    isDriverModeOpen = false;
    driverModeRouteNumber = 1;
    driverModeStopIndex = 0;
    latestDriverModeStorageKey = "";
    latestDriverModeState = getEmptyDriverModeState();
    renderDriverMode();

    renderQuickEdit([]);

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

    renderRecognitionReport([]);

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
    latestTextLineCount = 0;
    latestUploadDate = "";
    latestRunSource = "empty";
    latestRunId = "";
    latestRunUpdatedAt = "";
    latestRunBaseUpdatedAt = "";
    latestSaveState = {
      status: "empty",
      message: "Nog niet opgeslagen"
    };
    latestPlannerStatus = "draft";
    latestRouteProposalState = "none";
    latestRouteAdviceReport = getEmptyRouteAdviceReport();
    latestRouteHistoryState = {
      status: "idle",
      runs: [],
      error: ""
    };
    latestRouteCompleteness = {
      isIncomplete: false,
      suspectedCount: 0,
      builtCount: 0,
      missingLines: [],
      reasons: []
    };
    latestParserQualityBlocked = false;
    latestHasLocalCorrections = false;
    latestParserVersionWarning = "";
    selectedDeliveryStopIndex = -1;
    draggedDeliveryStopIndex = -1;
    isDriverModeOpen = false;
    driverModeRouteNumber = 1;
    driverModeStopIndex = 0;
    latestDriverModeStorageKey = "";
    latestDriverModeState = getEmptyDriverModeState();
    renderDashboard([], "");
    renderControlSummary([]);
    renderPlannerStatus();
    renderDriverMode();
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

  function normalizeReferenceValue(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&[a-z]+;/g, " ")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizeReferencePostcode(value) {
    return String(value || "").toUpperCase().replace(/\s+/g, "");
  }

  function normalizeReferenceCategory(category) {
    const value = normalizeReferenceValue(category);

    if (value === "banket") {
      return "gebak";
    }

    if (value === "brood" || value === "broodjes" || value === "warm" || value === "overig") {
      return value;
    }

    return "";
  }

  async function loadDeliveryReferenceData() {
    if (deliveryReferenceData.loaded || deliveryReferenceData.loadError) {
      return deliveryReferenceData;
    }

    try {
      const [customersResponse, productsResponse] = await Promise.all([
        fetch("data/delivery-customers.json", { cache: "no-store" }),
        fetch("data/delivery-products.json", { cache: "no-store" })
      ]);

      if (!customersResponse.ok || !productsResponse.ok) {
        throw new Error("Lokale bezorgreferentie kon niet worden geladen.");
      }

      const [customers, products] = await Promise.all([
        customersResponse.json(),
        productsResponse.json()
      ]);

      deliveryReferenceData = {
        customers: Array.isArray(customers) ? customers : [],
        products: Array.isArray(products) ? products : [],
        loaded: true,
        loadError: ""
      };
    } catch (error) {
      deliveryReferenceData = {
        customers: [],
        products: [],
        loaded: false,
        loadError: error?.message || "Lokale bezorgreferentie kon niet worden geladen."
      };
      console.warn("[delivery] lokale bezorgreferentie laden mislukt", error);
    }

    return deliveryReferenceData;
  }

  function getReferenceProductCategories(line) {
    const matches = getReferenceProductMatches(line);
    const categories = new Set();

    matches.forEach((product) => {
      const category = normalizeReferenceCategory(product.categorie);

      if (category && category !== "overig") {
        categories.add(category);
      }

      if (product.warm) {
        categories.add("warm");
      }
    });

    return PRODUCT_CATEGORY_ORDER.filter((category) => categories.has(category));
  }

  function referenceLineHasWord(normalizedLine, normalizedWord) {
    if (!normalizedLine || !normalizedWord) {
      return false;
    }

    if (normalizedWord.includes(" ")) {
      return normalizedLine.includes(normalizedWord);
    }

    const tokens = normalizedLine.split(" ").filter(Boolean);

    return tokens.some((token) =>
      token === normalizedWord ||
      (normalizedWord.length >= 5 && token.startsWith(normalizedWord))
    );
  }

  function getReferenceProductMatches(line) {
    const normalizedLine = normalizeReferenceValue(line);

    if (!normalizedLine || !deliveryReferenceData.products.length) {
      return [];
    }

    return deliveryReferenceData.products.filter((product) => {
      const words = Array.isArray(product.matchwoorden) ? product.matchwoorden : [];
      return words.length && words.every((word) =>
        referenceLineHasWord(normalizedLine, normalizeReferenceValue(word))
      );
    });
  }

  function getProductCategory(line) {
    const categories = getProductCategories(line);
    return categories.includes("warm") ? "warm" : categories[0] || "";
  }

  function getProductCategories(line) {
    const normalizedLine = String(line || "").toLowerCase();
    const categories = [...getReferenceProductCategories(line)];

    if (WARM_PREPARATION_PATTERN.test(normalizedLine) || /\b(hete|ovenwarm|oven\s*warm|warmhouden)\b/.test(normalizedLine)) {
      categories.push("warm");
    }

    if (/\b(broodje|pistolet|bolletje|sandwich|belegd|gesorteerde\s+bol|gesort\s+mini\s+bol|witte\s+bol|luxe\s+bol|gezonde?\s+bol)\b/.test(normalizedLine)) {
      categories.push("broodjes");
    }

    if (/\b(gebak|taart|vlaai|cake|koek|banket|bavar|bavarois|appelrondje|appelcake|vruchtenschelp|vierkantje|bonbons?|aardbei|suikervrij\s+gebak|cake\s+a\s+break)\b/.test(normalizedLine)) {
      categories.push("gebak");
    }

    if (/\b(brood|stokbrood|vloer|volkoren|tarwe|desem|mandje|bus|wit|witte|waldkorn|prokorn|spelt|meergr|hollands\s+grof|achterhoek\s+duuster|ruwe\s+bolster|oeoerenwit|admiraal|poesta|krentenbrood|rozijnenbrood|krentewegge|zomergranen|zesgranen|duutse\s+kneud)\b/.test(normalizedLine)) {
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
    if (normalizedValue === "betaald") return "OK";
    if (normalizedValue === "op rekening") return "Op rekening";
    if (normalizedValue === "niet betaald") return "Niet betaald";
    if (normalizedValue === "betaald via ideal" || normalizedValue === "ideal" || normalizedValue === "ideal betaald") return "Betaald via Ideal";
    if (normalizedValue === "contant") return "Contant";
    if (normalizedValue === "pin") return "Pin";
    if (normalizedValue === "tikkie") return "Tikkie";

    return "";
  }

  function getPaymentStatuses(line) {
    const value = String(line || "").trim();

    if (!value || /^(?:Betaling|Betaalstatus)$/i.test(value)) {
      return [];
    }

    const statuses = [...value.matchAll(/\b(betaald via ideal|niet betaald|op rekening|ok|betaald|contant|pin|tikkie)\b/gi)]
      .map((match) => getPaymentStatus(match[1]))
      .filter(Boolean);

    if (!statuses.length) {
      return [];
    }

    const remainder = value
      .replace(/\b(betaald via ideal|niet betaald|op rekening|ok|betaald|contant|pin|tikkie)\b/gi, "")
      .replace(/[\s,;|/+-]+/g, "")
      .trim();

    return remainder ? [] : statuses;
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

  function normalizeStopHeaderPostcode(value) {
    return String(value || "")
      .trim()
      .replace(/\b([1-9][0-9]{3})\s?([A-Z]{2})\b/i, "$1 $2");
  }

  function createStopFromHeaderParts({ code = "", customerName = "", address = "", postcode = "", timeWindow = "" } = {}) {
    const normalizedCustomerName = String(customerName || "").trim();
    const normalizedAddress = String(address || "").trim();
    const normalizedPostcode = normalizeStopHeaderPostcode(postcode);
    const normalizedTimeWindow = getTimeWindow(timeWindow);

    if (!normalizedCustomerName || !normalizedAddress || !POSTCODE_PATTERN.test(normalizedPostcode)) {
      return null;
    }

    const notes = [
      ...(/\d/.test(normalizedAddress) ? [] : ["controle nodig: adres twijfelachtig"]),
      ...(/\b[1-9][0-9]{3}\s[A-Z]{2}\s+\S+/i.test(normalizedPostcode) ? [] : ["controle nodig: postcode/plaats twijfelachtig"])
    ];

    return {
      customerName: normalizedCustomerName,
      address: `${normalizedAddress}, ${normalizedPostcode}`,
      sourceCode: String(code || "").trim(),
      categories: [],
      products: [],
      paymentStatus: "",
      timeWindow: normalizedTimeWindow,
      remark: "",
      notes,
      needsReview: notes.length > 0
    };
  }

  function parseSeparatedStopHeaderLine(line) {
    const match = String(line || "").trim().match(/^STOPHEADER\s+([^|]*)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+?)(?:\|\s*([^|]+))?$/i);

    if (!match) {
      return null;
    }

    return createStopFromHeaderParts({
      code: match[1],
      customerName: match[2],
      address: match[3],
      postcode: match[4],
      timeWindow: match[5] || ""
    });
  }

  function parseCombinedStopHeaderLine(line) {
    let value = String(line || "").trim();
    const codeMatch = value.match(/^(\d{4}[A-Z]{2}\d+(?:-\d+)?)\s+(.+)$/i);
    let code = "";

    if (codeMatch) {
      code = codeMatch[1];
      value = codeMatch[2].trim();
    }

    const postcodeMatch = value.match(/\b([1-9][0-9]{3}\s?[A-Z]{2}\s+[A-Za-z][A-Za-z.' -]{1,40})$/i);

    if (!postcodeMatch) {
      return null;
    }

    const postcode = postcodeMatch[1].trim();
    const beforePostcode = value.slice(0, postcodeMatch.index).trim();
    const addressPattern = /(?:[A-Za-z.'-]+\s+){0,5}[A-Za-z.'-]*(?:straat|laan|weg|plein|hof|pad|dijk|kade|singel|steeg|plantsoen|boulevard|blik)\s+\d+[a-z]?(?:-\d+)?$/i;
    const addressMatch = beforePostcode.match(addressPattern);

    if (!addressMatch) {
      return null;
    }

    const address = addressMatch[0].trim();
    const customerName = beforePostcode.slice(0, addressMatch.index).trim();

    return createStopFromHeaderParts({
      code,
      customerName,
      address,
      postcode
    });
  }

  function parseStopHeaderLine(line) {
    return parseSeparatedStopHeaderLine(line) || parseCombinedStopHeaderLine(line);
  }

  function getReconstructedStopKey(stop) {
    return [
      stop?.sourceCode || "",
      String(stop?.customerName || "").toLowerCase(),
      String(stop?.address || "").toLowerCase()
    ].join("|");
  }

  function parseStopProductLine(line) {
    const match = String(line || "").trim().match(/^STOPPRODUCT\s+([^|]*)\|\s*([^|]+)\|\s*(.+)$/i);

    if (!match) {
      return null;
    }

    return {
      code: String(match[1] || "").trim(),
      customerName: String(match[2] || "").trim(),
      productLine: String(match[3] || "").trim()
    };
  }

  function addressMatchesKnownCustomer(stop, customer) {
    const stopAddress = normalizeReferenceValue(stop?.address);
    const stopPostcode = normalizeReferencePostcode(stop?.address);
    const customerStreet = normalizeReferenceValue(customer?.straat);
    const customerPostcode = normalizeReferencePostcode(customer?.postcode);

    return Boolean(
      stopAddress &&
      customerStreet &&
      customerPostcode &&
      stopAddress.includes(customerStreet) &&
      stopPostcode.includes(customerPostcode)
    );
  }

  function nameMatchesKnownCustomer(stop, customer) {
    const stopName = normalizeReferenceValue(stop?.customerName);
    const names = [
      customer?.naam,
      ...(Array.isArray(customer?.aliassen) ? customer.aliassen : [])
    ].map(normalizeReferenceValue).filter(Boolean);

    return Boolean(stopName && names.some((name) => stopName.includes(name) || name.includes(stopName)));
  }

  function findKnownCustomerForStop(stop) {
    const activeCustomers = deliveryReferenceData.customers.filter((customer) => customer?.actieveKlant !== false);
    const strongMatches = activeCustomers.filter((customer) => addressMatchesKnownCustomer(stop, customer));

    if (strongMatches.length === 1) {
      return {
        customer: strongMatches[0],
        strength: nameMatchesKnownCustomer(stop, strongMatches[0]) ? "sterk" : "adres"
      };
    }

    const nameMatches = activeCustomers.filter((customer) => nameMatchesKnownCustomer(stop, customer));

    if (nameMatches.length === 1) {
      return {
        customer: nameMatches[0],
        strength: "naam"
      };
    }

    return null;
  }

  function enrichStopWithKnownCustomer(stop) {
    const match = findKnownCustomerForStop(stop);

    if (!match?.customer) {
      return stop;
    }

    const customer = match.customer;
    const nextStop = stop;
    nextStop.knownCustomerId = customer.id || "";
    nextStop.knownCustomerMatch = match.strength;

    if (match.strength !== "naam") {
      nextStop.customerName = customer.naam || nextStop.customerName;
    } else {
      nextStop.needsReview = true;
      nextStop.notes = [...new Set([
        ...(Array.isArray(nextStop.notes) ? nextStop.notes : []),
        "controle nodig: klantmatch alleen via naam/alias"
      ])];
    }

    if (customer.bekendeBetaalstatus === "Niet betaald") {
      nextStop.paymentStatus = "Niet betaald";
    } else if (!nextStop.paymentStatus && PAYMENT_STATUS_VALUES.includes(customer.bekendeBetaalstatus)) {
      nextStop.paymentStatus = customer.bekendeBetaalstatus;
    }

    if (!nextStop.remark && customer.bekendeOpmerking) {
      nextStop.remark = customer.bekendeOpmerking;
    }

    if (!nextStop.categories.length && nextStop.products.length && Array.isArray(customer.bekendeCategorieen)) {
      customer.bekendeCategorieen
        .map(normalizeReferenceCategory)
        .filter((category) => category && category !== "overig")
        .forEach((category) => {
          if (!nextStop.categories.includes(category)) {
            nextStop.categories.push(category);
          }
        });
    }

    nextStop.notes = (Array.isArray(nextStop.notes) ? nextStop.notes : [])
      .filter((note) => !/klantnaam niet herkend/i.test(note));
    nextStop.needsReview = Boolean(nextStop.notes.length);

    return nextStop;
  }

  function enrichStopsWithKnownCustomers(stops) {
    return (Array.isArray(stops) ? stops : []).map(enrichStopWithKnownCustomer);
  }

  function buildReconstructedColumnStops(lines) {
    const stops = [];
    const seenKeys = new Set();
    let currentStop = null;
    let currentPageStops = [];

    function applyPaymentStatusesToPageStops(statuses) {
      if (!statuses.length || !currentPageStops.length) {
        return;
      }

      const targets = currentPageStops.filter((stop) => stop && !stop.paymentStatus);
      statuses.forEach((status, index) => {
        applyPaymentStatusToStop(targets[index], status);
      });
    }

    (Array.isArray(lines) ? lines : []).forEach((line) => {
      const paymentStatuses = getPaymentStatuses(line);

      if (paymentStatuses.length) {
        applyPaymentStatusesToPageStops(paymentStatuses);
        return;
      }

      if (/^Pagina:/i.test(String(line || "").trim())) {
        currentPageStops = [];
        return;
      }

      const stop = parseStopHeaderLine(line);

      if (stop) {
        const key = getReconstructedStopKey(stop);
        const existingStop = stops.find((item) => getReconstructedStopKey(item) === key) || null;

        if (existingStop) {
          currentStop = existingStop;
          currentPageStops.push(existingStop);
          return;
        }

        if (seenKeys.has(key)) {
          return;
        }

        seenKeys.add(key);
        stops.push(stop);
        currentPageStops.push(stop);
        currentStop = stop;
        return;
      }

      const product = parseStopProductLine(line);

      if (!product?.productLine) {
        return;
      }

      const matchingStop = stops.find((item) =>
        (
          product.code &&
          item.sourceCode &&
          item.sourceCode.toLowerCase() === product.code.toLowerCase()
        ) ||
        (
          product.customerName &&
          item.customerName.toLowerCase() === product.customerName.toLowerCase()
        )
      ) || currentStop;

      addProductToStop(matchingStop, product.productLine, false);
    });

    applyColumnPaymentSummaries(stops, lines);

    return stops;
  }

  function getPaymentStatusesBeforeSummary(lines, summaryIndex) {
    const statusLines = [];

    for (let index = summaryIndex - 1; index >= 0; index -= 1) {
      const line = String(lines[index] || "").trim();
      const statuses = getPaymentStatuses(line);

      if (statuses.length) {
        statusLines.unshift(statuses);
        continue;
      }

      if (statusLines.length && /^STOP(?:HEADER|PRODUCT)\b/i.test(line)) {
        break;
      }
    }

    return statusLines.flat();
  }

  function getStopsFromSummaryLine(stops, line) {
    const value = String(line || "").toLowerCase();

    return (Array.isArray(stops) ? stops : [])
      .map((stop) => ({
        stop,
        index: value.indexOf(String(stop?.customerName || "").toLowerCase())
      }))
      .filter((item) => item.stop?.customerName && item.index >= 0)
      .sort((itemA, itemB) => itemA.index - itemB.index)
      .map((item) => item.stop);
  }

  function applyColumnPaymentSummaries(stops, lines) {
    (Array.isArray(lines) ? lines : []).forEach((line, index) => {
      const value = String(line || "").trim();

      if (!value || !/[A-Za-z]/.test(value) || !/(Afleveradres|Pleiter|Grandcafe|Erve Bussink|Stichting zozijn)/i.test(value)) {
        return;
      }

      const statuses = getPaymentStatusesBeforeSummary(lines, index);
      const summaryStops = getStopsFromSummaryLine(stops, value);

      if (!statuses.length || summaryStops.length < 2) {
        return;
      }

      statuses.forEach((status, statusIndex) => {
        applyPaymentStatusToStop(summaryStops[statusIndex], status);
      });
    });
  }

  function applyPaymentSequenceFallbacks(stops, lines) {
    if (!Array.isArray(stops) || stops.some((stop) => stop.paymentStatus === "Niet betaald")) {
      return;
    }

    const sequence = (Array.isArray(lines) ? lines : [])
      .map(getPaymentStatuses)
      .find((statuses) => statuses.length > 1 && statuses.includes("Niet betaald"));
    const unpaidIndex = sequence ? sequence.indexOf("Niet betaald") : -1;

    if (unpaidIndex >= 0 && stops[unpaidIndex]) {
      applyPaymentStatusToStop(stops[unpaidIndex], "Niet betaald");
      applyRemarkToStop(stops[unpaidIndex], "Niet betaald");
    }
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
    const reconstructedStops = buildReconstructedColumnStops(lines);

    if (reconstructedStops.length) {
      return reconstructedStops;
    }

    const stops = [];
    const seenKeys = new Set();

    if (looksLikeServerColumnDeliveryList(lines)) {
      SERVER_COLUMN_STOP_DEFINITIONS.forEach((definition) => {
        const isVisible = definition.aliases.some((alias) => hasLineText(lines, alias));

        if (!isVisible || seenKeys.has(definition.key)) {
          return;
        }

        seenKeys.add(definition.key);
        stops.push(createServerColumnStop(definition, lines));
      });
    }

    return stops.length ? stops : buildReconstructedColumnStops(lines);
  }

  function buildRouteStops(lines) {
    const serverColumnStops = buildServerColumnDeliveryStops(lines);

    if (serverColumnStops.length) {
      applyPaymentSequenceFallbacks(serverColumnStops, lines);
      enrichStopsWithKnownCustomers(serverColumnStops);

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

      const paymentStatuses = getPaymentStatuses(line);

      if (paymentStatuses.length) {
        const targets = stops.filter((stop) => !stop.paymentStatus);
        paymentStatuses.forEach((status, statusIndex) => {
          applyPaymentStatusToStop(targets[statusIndex], status);
        });
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

    applyPaymentSequenceFallbacks(stops, lines);
    enrichStopsWithKnownCustomers(stops);

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
    latestPlannerStatus = "draft";
    latestRouteProposalState = "none";
    latestRouteAdviceReport = getEmptyRouteAdviceReport();
    latestRouteHistoryState = {
      status: "idle",
      runs: [],
      error: ""
    };
    latestRouteCompleteness = {
      isIncomplete: false,
      suspectedCount: 0,
      builtCount: 0,
      missingLines: [],
      reasons: []
    };
    latestParserQualityBlocked = true;
    latestTextLineCount = Array.isArray(lines) ? lines.length : 0;
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
    renderQuickEdit([]);
    renderStopDetail([]);
    renderPlannerStatus();

    if (routeBlocksElement) {
      routeBlocksElement.classList.add("empty");
      routeBlocksElement.textContent = `${message} Routeblokken zijn daarom niet opgebouwd.`;
    }

    if (productOverviewElement) {
      productOverviewElement.classList.add("empty");
      productOverviewElement.textContent = `${message} Productregels worden niet als betrouwbaar productoverzicht getoond.`;
    }

    renderRecognitionReport([]);
    clearPrintPreview();
  }

  function renderParseResult(lines, recognized, warnings, extractionQuality = null, parserSource = "") {
    setDeliveryWorkVisible(true);
    closeDeliveryLowerSections();
    latestParserQualityBlocked = false;
    latestTextLineCount = Array.isArray(lines) ? lines.length : 0;

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

    const routeStops = applySuggestedRouteOrder(enrichStopsWithKnownCustomers(buildRouteStops(lines)));
    latestRouteCompleteness = getRouteCompletenessInfo(lines, routeStops);
    const visibleWarnings = routeStops.length
      ? [
        ...warnings,
        latestRouteCompleteness.isIncomplete
          ? `Route onvolledig gelezen - printen geblokkeerd: ${latestRouteCompleteness.builtCount} van vermoedelijk ${latestRouteCompleteness.suspectedCount} stops herkend. Controleer PDF of parser. Deze route mag nog niet gebruikt worden.`
          : "",
        ...latestRouteCompleteness.reasons.map((reason) => `Blokkade: ${reason}`),
        ...latestRouteCompleteness.missingLines.map((line) => `Mogelijk niet gekoppeld: ${line}`),
        "Voorstelroute gemaakt - controleer en sleep waar nodig"
      ].filter(Boolean)
      : warnings;

    if (warningsElement) {
      if (!visibleWarnings.length) {
        warningsElement.classList.add("empty");
        warningsElement.innerHTML = "";
        warningsElement.textContent = "Geen meldingen.";
      } else {
        warningsElement.classList.remove("empty");
        warningsElement.innerHTML = visibleWarnings.slice(0, 12).map((warning) => `
          <div class="delivery-warning-item">${escapeHtml(warning)}</div>
        `).join("");
      }
    }

    latestRouteStops = routeStops;
    latestParseWarnings = visibleWarnings;
    latestDeliveryDate = getDeliveryDate(lines);
    latestParserVersionWarning = "";
    latestRunId = "";
    latestRunBaseUpdatedAt = "";
    latestHasLocalCorrections = false;
    latestPlannerStatus = "draft";
    selectedDeliveryStopIndex = -1;
    draggedDeliveryStopIndex = -1;
    renderDashboard(routeStops, latestDeliveryDate);
    renderControlSummary(routeStops);
    renderActionsOverview(routeStops);
    renderPreparation(routeStops);
    renderDriverPreview(routeStops, latestDeliveryDate);
    renderRouteBlocks(routeStops);
    renderQuickEdit(routeStops);
    renderStopDetail(routeStops);
    renderProductOverview(routeStops);
    renderRecognitionReport(routeStops);
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

  function hasAnyStopProblem(stop) {
    return Boolean(stop?.driverProblem?.type || stop?.driverProblem?.remark);
  }

  function hasStopProblem(stop) {
    return hasAnyStopProblem(stop) && !stop?.driverProblem?.resolvedAt;
  }

  function hasResolvedStopProblem(stop) {
    return hasAnyStopProblem(stop) && Boolean(stop?.driverProblem?.resolvedAt);
  }

  function getDriverStatus(stop) {
    const status = stop?.driverStatus || {};

    return {
      delivered: Boolean(status.delivered),
      paid: Boolean(status.paid)
    };
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
    if (!hasAnyStopProblem(stop)) {
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

  function getStopPdfOrderIndex(stop, fallbackIndex = 0) {
    const value = Number(stop?._pdfOrderIndex);
    return Number.isFinite(value) ? value : fallbackIndex;
  }

  function assignPdfOrderIndexes(stops) {
    (Array.isArray(stops) ? stops : []).forEach((stop, index) => {
      if (!Number.isFinite(Number(stop?._pdfOrderIndex))) {
        stop._pdfOrderIndex = index;
      }
    });
  }

  function getRouteSortTime(stop) {
    const match = String(stop?.timeWindow || "").match(/\b([01]?\d|2[0-3]):([0-5]\d)\b/);

    if (!match) {
      return {
        hasTime: false,
        minutes: Number.POSITIVE_INFINITY,
        block: Number.POSITIVE_INFINITY
      };
    }

    const minutes = Number(match[1]) * 60 + Number(match[2]);

    return {
      hasTime: true,
      minutes,
      block: Math.floor(minutes / 30)
    };
  }

  function getRouteTimeWindowInfo(stop) {
    const matches = [...String(stop?.timeWindow || "").matchAll(/\b([01]?\d|2[0-3]):([0-5]\d)\b/g)];

    if (!matches.length) {
      return {
        hasTime: false,
        start: Number.POSITIVE_INFINITY,
        end: Number.POSITIVE_INFINITY,
        block: Number.POSITIVE_INFINITY,
        label: "tijd ontbreekt"
      };
    }

    const start = Number(matches[0][1]) * 60 + Number(matches[0][2]);
    const lastMatch = matches[matches.length - 1];
    const end = Number(lastMatch[1]) * 60 + Number(lastMatch[2]);

    return {
      hasTime: true,
      start,
      end,
      block: Math.floor(start / 30),
      label: matches.length > 1 ? `${matches[0][0]} / ${lastMatch[0]}` : matches[0][0]
    };
  }

  function getRouteAreaKey(stop) {
    const address = String(stop?.address || "").toUpperCase();
    const postcodeMatch = address.match(/\b([1-9][0-9]{3})\s?([A-Z]{2})\b/);

    if (postcodeMatch) {
      return postcodeMatch[1];
    }

    const placeMatch = address.match(/\b(NEEDE|BORCULO|HAARLO|EIBERGEN|DIEPENHEIM|RUURLO|LOCHEM)\b/);
    return placeMatch ? placeMatch[1] : "";
  }

  function getStopPostcodePlace(stop) {
    const address = String(stop?.address || "").trim();
    const postcodeMatch = address.match(/\b([1-9][0-9]{3})\s?([A-Z]{2})\b\s*([A-Za-zÀ-ÿ.' -]{2,40})?/i);

    if (!postcodeMatch) {
      return {
        postcode: "",
        plaats: ""
      };
    }

    return {
      postcode: `${postcodeMatch[1]} ${postcodeMatch[2].toUpperCase()}`,
      plaats: String(postcodeMatch[3] || "").replace(/[,\s]+$/g, "").trim()
    };
  }

  function getStopHistoryIdentity(stop) {
    const customerId = String(stop?.knownCustomerId || stop?.customerId || "").trim();
    const customerName = normalizeReferenceValue(stop?.customerName);
    const postcodePlace = getStopPostcodePlace(stop);
    const postcode = normalizeReferencePostcode(stop?.postcode || postcodePlace.postcode);

    return {
      customerId,
      fallbackKey: customerName && postcode ? `${customerName}|${postcode}` : ""
    };
  }

  function getRouteHistoryStopsFromRun(run) {
    const routeBlocks = Array.isArray(run?.payload?.routeBlocks) ? run.payload.routeBlocks : [];
    const seenAt = run?.updatedAt || run?.createdAt || "";

    return routeBlocks.flatMap((routeBlock, routeIndex) => {
      const blockRouteNumber = getStopRouteNumber({
        routeNumber: routeBlock?.routeNumber || routeIndex + 1,
        routeName: routeBlock?.name || routeBlock?.routeName || ""
      });

      return (Array.isArray(routeBlock?.stops) ? routeBlock.stops : []).map((stop, stopIndex) => ({
        ...normalizeLoadedStop({
          ...stop,
          routeNumber: stop?.routeNumber || blockRouteNumber,
          routeName: stop?.routeName || `Route ${blockRouteNumber}`,
          routeBlockName: stop?.routeBlockName || `Route ${blockRouteNumber}`,
          position: stop?.position || stopIndex + 1
        }),
        seenAt
      }));
    });
  }

  function getLatestHistoryItem(items) {
    return items.slice().sort((itemA, itemB) => {
      const timeA = Date.parse(itemA.seenAt || "") || 0;
      const timeB = Date.parse(itemB.seenAt || "") || 0;
      return timeB - timeA;
    })[0] || null;
  }

  function formatHistoryDate(value) {
    const date = new Date(value || "");

    if (Number.isNaN(date.getTime())) {
      return "onbekend";
    }

    return new Intl.DateTimeFormat("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(date);
  }

  function buildRouteHistoryReport(stops = latestRouteStops) {
    const normalizedStops = Array.isArray(stops) ? stops : [];
    const runs = latestRouteHistoryState.runs.filter((run) => run?.payload);
    const historyItems = runs.flatMap(getRouteHistoryStopsFromRun);
    const rows = normalizedStops.map((stop) => {
      const identity = getStopHistoryIdentity(stop);
      const matches = historyItems.filter((item) => {
        const itemIdentity = getStopHistoryIdentity(item);

        return Boolean(
          identity.customerId && itemIdentity.customerId && identity.customerId === itemIdentity.customerId
          || identity.fallbackKey && itemIdentity.fallbackKey && identity.fallbackKey === itemIdentity.fallbackKey
        );
      });
      const routeCounts = matches.reduce((counts, item) => {
        const routeNumber = getStopRouteNumber(item);
        counts[routeNumber] = (counts[routeNumber] || 0) + 1;
        return counts;
      }, { 1: 0, 2: 0 });
      const latestItem = getLatestHistoryItem(matches);
      const positionValues = matches
        .map((item) => Number(item.position))
        .filter((position) => Number.isFinite(position) && position > 0);
      const routeTwoPositionValues = matches
        .filter((item) => getStopRouteNumber(item) === 2)
        .map((item) => Number(item.position))
        .filter((position) => Number.isFinite(position) && position > 0);
      const averagePosition = positionValues.length
        ? positionValues.reduce((total, position) => total + position, 0) / positionValues.length
        : 0;
      const averageRouteTwoPosition = routeTwoPositionValues.length
        ? routeTwoPositionValues.reduce((total, position) => total + position, 0) / routeTwoPositionValues.length
        : 0;
      const mostUsedRoute = routeCounts[2] > routeCounts[1] ? 2 : 1;
      const advice = matches.length
        ? (mostUsedRoute === 2
          ? `Vaak Route 2 rond positie ${Math.round(averagePosition || 1)}`
          : `Meestal Route 1 rond positie ${Math.round(averagePosition || 1)}`)
        : "Nog geen historie";

      return {
        customerName: stop.customerName || "Klant onbekend",
        seenCount: matches.length,
        mostUsedRoute: matches.length ? `Route ${mostUsedRoute}` : "-",
        routeUsage: matches.length ? `R1 ${routeCounts[1] || 0}x / R2 ${routeCounts[2] || 0}x` : "-",
        averagePosition: matches.length ? Math.round(averagePosition || 0) : 0,
        routeTwoPosition: routeTwoPositionValues.length ? Math.round(averageRouteTwoPosition || 0) : 0,
        latestRoute: latestItem ? `Route ${getStopRouteNumber(latestItem)}` : "-",
        latestPosition: latestItem?.position || "",
        lastSeen: latestItem ? formatHistoryDate(latestItem.seenAt) : "-",
        lastTimeWindow: latestItem?.timeWindow || "-",
        lastCategories: normalizeCategories(latestItem?.categories || []).join(", ") || "-",
        advice
      };
    });

    return {
      status: latestRouteHistoryState.status,
      error: latestRouteHistoryState.error,
      runCount: runs.length,
      historyStopCount: historyItems.length,
      matchedCount: rows.filter((row) => row.seenCount > 0).length,
      rows
    };
  }

  function getRouteAdviceScore(stop, fallbackIndex = 0) {
    const time = getRouteTimeWindowInfo(stop);
    const areaKey = getRouteAreaKey(stop);
    const pdfIndex = getStopPdfOrderIndex(stop, fallbackIndex);
    const warm = isWarmStop(stop);
    const score = (
      (time.hasTime ? time.block : 99) * 100000
      + (warm ? 0 : 10000)
      + (areaKey ? Number(String(areaKey).replace(/\D/g, "")) || 5000 : 9000)
      + (time.hasTime ? time.start : 9999)
      + pdfIndex
    );
    const reasons = [
      time.hasTime ? `tijd ${time.label}` : "tijd ontbreekt",
      warm ? "warm voorrang" : "",
      areaKey ? `postcodecluster ${areaKey}` : "postcodecluster onbekend",
      `PDF-volgorde ${pdfIndex + 1}`
    ].filter(Boolean);

    return {
      score,
      time,
      areaKey,
      warm,
      pdfIndex,
      reasons
    };
  }

  function markRouteProposalReview(stop) {
    const notes = Array.isArray(stop.notes) ? stop.notes : [];
    const nextNotes = [...notes];

    if (!String(stop.timeWindow || "").trim()) {
      nextNotes.push("controle nodig: tijd ontbreekt voor routevoorstel");
    }

    if (!String(stop.address || "").trim()) {
      nextNotes.push("controle nodig: adres ontbreekt voor routevoorstel");
    }

    if (nextNotes.length !== notes.length) {
      stop.notes = [...new Set(nextNotes)];
      stop.needsReview = true;
    }
  }

  function compareSuggestedRouteStops(stopA, stopB) {
    const adviceA = getRouteAdviceScore(stopA);
    const adviceB = getRouteAdviceScore(stopB);
    const timeA = adviceA.time;
    const timeB = adviceB.time;

    if (timeA.block !== timeB.block) {
      return timeA.block - timeB.block;
    }

    const warmA = isWarmStop(stopA) ? 0 : 1;
    const warmB = isWarmStop(stopB) ? 0 : 1;

    if (warmA !== warmB) {
      return warmA - warmB;
    }

    if (timeA.start !== timeB.start) {
      return timeA.start - timeB.start;
    }

    const areaA = adviceA.areaKey;
    const areaB = adviceB.areaKey;

    if (areaA && areaB && areaA !== areaB) {
      return areaA.localeCompare(areaB, "nl");
    }

    return getStopPdfOrderIndex(stopA) - getStopPdfOrderIndex(stopB);
  }

  function getStopRouteNumber(stop) {
    const routeNumber = Number(stop?.routeNumber || stop?.routeIndex || 0);
    const routeLabel = String(stop?.routeName || stop?.routeBlockName || stop?.route || "").toLowerCase();

    return routeNumber === 2 || /(?:route|ronde|bezorger)\s*2\b/.test(routeLabel) ? 2 : 1;
  }

  function setStopRouteNumber(stop, routeNumber) {
    const normalizedRouteNumber = Number(routeNumber) === 2 ? 2 : 1;

    stop.routeNumber = normalizedRouteNumber;
    stop.routeName = `Route ${normalizedRouteNumber}`;
    stop.routeBlockName = `Route ${normalizedRouteNumber}`;
  }

  function getRouteAdviceRouteCounts(stops) {
    return (Array.isArray(stops) ? stops : []).reduce((counts, stop) => {
      const routeNumber = getStopRouteNumber(stop);
      counts[routeNumber] = (counts[routeNumber] || 0) + 1;
      return counts;
    }, {
      1: 0,
      2: 0
    });
  }

  function assignSuggestedRouteNumbers(orderedStops) {
    const normalizedStops = Array.isArray(orderedStops) ? orderedStops : [];

    normalizedStops.forEach((stop) => {
      setStopRouteNumber(stop, 1);
    });

    return normalizedStops;
  }

  function buildRouteAdviceReport(stops) {
    const normalizedStops = Array.isArray(stops) ? stops : [];
    const clusters = new Set(normalizedStops.map(getRouteAreaKey).filter(Boolean));
    const routeCounts = getRouteAdviceRouteCounts(normalizedStops);
    const sampleScores = normalizedStops.slice(0, 5).map((stop, index) => {
      const advice = getRouteAdviceScore(stop, index);

      return {
        customerName: stop.customerName || "Klant onbekend",
        score: Math.round(advice.score),
        routeNumber: getStopRouteNumber(stop),
        reasons: advice.reasons
      };
    });
    const hasTimes = normalizedStops.some((stop) => getRouteTimeWindowInfo(stop).hasTime);
    const warmStopCount = normalizedStops.filter(isWarmStop).length;

    return {
      active: Boolean(normalizedStops.length && latestRouteProposalState === "suggested"),
      warmStopCount,
      postcodeClusterCount: clusters.size,
      routeBalance: `Route 1: ${routeCounts[1] || 0} / Route 2: ${routeCounts[2] || 0}`,
      sampleScores,
      reasons: [
        hasTimes ? "Tijdvensters gebruikt" : "",
        warmStopCount ? "Warme stops gebruikt" : "",
        clusters.size ? "Postcodeclusters gebruikt" : "",
        "PDF-volgorde gebruikt als fallback",
        "Alles blijft standaard in Route 1; planner verplaatst zelf naar Route 2",
        "Routegeschiedenis kan later gebruikt worden voor adviezen"
      ].filter(Boolean)
    };
  }

  function applySuggestedRouteOrder(stops) {
    const normalizedStops = Array.isArray(stops) ? stops : [];

    assignPdfOrderIndexes(normalizedStops);
    normalizedStops.forEach(markRouteProposalReview);

    latestRouteProposalState = normalizedStops.length ? "suggested" : "none";
    const suggestedStops = assignSuggestedRouteNumbers([...normalizedStops].sort(compareSuggestedRouteStops));
    latestRouteAdviceReport = buildRouteAdviceReport(suggestedStops);
    return suggestedStops;
  }

  function getStopCompletenessKey(stop) {
    const customerName = String(stop?.customerName || "").toLowerCase().replace(/\s+/g, " ").trim();
    const address = String(stop?.address || "")
      .toLowerCase()
      .replace(/\b([1-9][0-9]{3})\s?([a-z]{2})\b/g, "$1 $2")
      .replace(/[,\s]+/g, " ")
      .trim();

    return [
      String(stop?.sourceCode || "").toLowerCase(),
      customerName,
      address
    ].join("|").trim();
  }

  function getLinePostcodeCount(line) {
    return (String(line || "").match(/\b[1-9][0-9]{3}\s?[A-Z]{2}\b/gi) || []).length;
  }

  function isAggregateStopSummaryLine(line) {
    const value = String(line || "").trim();

    return /^(?:Postcode|Adres|Selecties|Afleveradres)\b/i.test(value) || getLinePostcodeCount(value) >= 3;
  }

  function isPotentialAddressHeaderLine(line) {
    const value = String(line || "").trim();

    if (!value || isProductLine(value) || isRouteNoiseLine(value)) {
      return false;
    }

    return POSTCODE_PATTERN.test(value) && (
      ADDRESS_PATTERN.test(value) ||
      /\b(?:straat|laan|weg|plein|hof|pad|dijk|kade|singel|steeg|plantsoen|boulevard|blik|postbus)\b/i.test(value) ||
      /^\s*STOPHEADER\b/i.test(value)
    );
  }

  function getSuspectedStopReferences(lines) {
    const references = [];
    const seenKeys = new Set();

    (Array.isArray(lines) ? lines : []).forEach((line) => {
      const value = String(line || "").trim();

      if (!value) {
        return;
      }

      const parsedStop = parseStopHeaderLine(value);

      if (parsedStop) {
        const key = getStopCompletenessKey(parsedStop);

        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          references.push({
            line: value,
            key,
            label: parsedStop.customerName || value
          });
        }

        return;
      }

      if (isAggregateStopSummaryLine(value)) {
        return;
      }

      if (/^STOPHEADER\b/i.test(value) || isPotentialAddressHeaderLine(value)) {
        const key = value.toLowerCase().replace(/\s+/g, " ");

        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          references.push({
            line: value,
            key,
            label: value
          });
        }
      }
    });

    return references;
  }

  function getSuspectedStopCountFromRows(lines) {
    return (Array.isArray(lines) ? lines : []).reduce((highestCount, line) => {
      const value = String(line || "");
      const postcodeCount = getLinePostcodeCount(value);

      if (isAggregateStopSummaryLine(value)) {
        return Math.max(highestCount, postcodeCount);
      }

      return highestCount;
    }, 0);
  }

  function getRouteCompletenessInfo(lines, stops) {
    const normalizedStops = Array.isArray(stops) ? stops : [];
    const suspectedReferences = getSuspectedStopReferences(lines);
    const rowSuspectedCount = getSuspectedStopCountFromRows(lines);
    const suspectedCount = Math.max(suspectedReferences.length, rowSuspectedCount);
    const builtCount = normalizedStops.length;
    const builtKeys = new Set(normalizedStops.map(getStopCompletenessKey));
    const missingLines = suspectedReferences
      .filter((reference) => !builtKeys.has(reference.key))
      .map((reference) => reference.line)
      .slice(0, 8);
    const countGap = Math.max(0, suspectedCount - builtCount);
    const unknownCustomerCount = normalizedStops.filter((stop) =>
      !String(stop?.customerName || "").trim() ||
      /klant onbekend/i.test(String(stop?.customerName || ""))
    ).length;
    const suspectedMultiStopPdf = getSuspectedStopCountFromRows(lines) > 3 || suspectedReferences.length > 3;
    const reasons = [
      countGap > 0 ? `vermoedelijk ${countGap} stop${countGap === 1 ? "" : "s"} niet gebouwd` : "",
      unknownCustomerCount ? `${unknownCustomerCount} onbekende klantnaam${unknownCustomerCount === 1 ? "" : "namen"}` : "",
      missingLines.length ? `${missingLines.length} stop-/adresregel${missingLines.length === 1 ? "" : "s"} niet gekoppeld` : "",
      builtCount >= 1 && builtCount <= 3 && suspectedMultiStopPdf ? "route heeft maar 1-3 stops terwijl PDF meerdere adressen lijkt te bevatten" : "",
      latestParserQualityBlocked ? "parserkwaliteit onzeker" : ""
    ].filter(Boolean);
    const isIncomplete = reasons.length > 0;

    return {
      isIncomplete,
      reasons,
      suspectedCount,
      builtCount,
      missingLines
    };
  }

  function isRoutePrintBlocked() {
    return Boolean(latestRouteCompleteness.isIncomplete);
  }

  function resetRouteToPdfOrder() {
    if (!latestRouteStops.length) {
      return;
    }

    latestRouteStops.sort((stopA, stopB) => getStopPdfOrderIndex(stopA) - getStopPdfOrderIndex(stopB));
    latestRouteStops.forEach((stop) => {
      setStopRouteNumber(stop, 1);
    });
    selectedDeliveryStopIndex = -1;
    draggedDeliveryStopIndex = -1;
    latestRouteProposalState = "pdf-order";
    latestRouteAdviceReport = {
      ...buildRouteAdviceReport(latestRouteStops),
      active: false,
      reasons: ["PDF-volgorde handmatig teruggezet"]
    };
    resetDeliveryPlanningApproval();
    rerenderDeliveryPreview({ refreshPrint: isPrintPreviewActive() });
    setStatus("Route teruggezet naar PDF-volgorde.", "ready");
  }

  function stopHasReview(stop) {
    if (latestPlannerStatus === "approved") {
      return false;
    }

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
    renderPlannerStatus();
    renderDashboard(latestRouteStops, latestDeliveryDate);
    renderControlSummary(latestRouteStops);
    renderActionsOverview(latestRouteStops);
    renderPreparation(latestRouteStops);
    renderDriverPreview(latestRouteStops, latestDeliveryDate);
    renderRouteBlocks(latestRouteStops);
    renderQuickEdit(latestRouteStops);
    renderStopDetail(latestRouteStops);
    renderDriverMode();
    renderProductOverview(latestRouteStops);
    renderRecognitionReport(latestRouteStops);

    if (refreshPrint && latestRouteStops.length) {
      renderPrintPreview();
    }
  }

  function markDeliveryLocallyCorrected() {
    resetDeliveryPlanningApproval();
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
      const driverStatus = getDriverStatus(stop);
      const status = stop.paymentStatus || "controle nodig";

      if (driverStatus.paid) {
        counts.ok += 1;
      } else {
        if (status === "OK") counts.ok += 1;
        if (status === "Op rekening") counts.account += 1;
        if (status === "Niet betaald") counts.unpaid += 1;
        if (!stop.paymentStatus) counts.review += 1;
      }

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

  function getRecognitionCustomerMatch(stop) {
    const existingMatch = String(stop?.knownCustomerMatch || "").trim();

    if (existingMatch) {
      return existingMatch;
    }

    return findKnownCustomerForStop(stop)?.strength || "";
  }

  function getRecognitionProductCategories(product) {
    const categories = normalizeCategories([
      product?.category,
      ...getProductCategories(product?.rawLine || "")
    ]);

    return categories;
  }

  function getRecognitionReport(stops) {
    const normalizedStops = Array.isArray(stops) ? stops : [];
    const products = getAllProducts(normalizedStops);
    const customerStats = normalizedStops.reduce((stats, stop) => {
      const match = getRecognitionCustomerMatch(stop);
      const hasUnknownName = !String(stop?.customerName || "").trim() || /klant onbekend/i.test(String(stop?.customerName || ""));

      if (match === "sterk" || match === "adres") {
        stats.address += 1;
      } else if (match === "naam") {
        stats.alias += 1;
        stats.weak += 1;
      } else if (hasUnknownName || !match) {
        stats.unknown += 1;
      }

      return stats;
    }, {
      address: 0,
      alias: 0,
      weak: 0,
      unknown: 0
    });
    const productStats = products.reduce((stats, product) => {
      const categories = getRecognitionProductCategories(product);

      if (categories.includes("brood") || categories.includes("broodjes")) {
        stats.bread += 1;
      }

      if (categories.includes("gebak")) {
        stats.pastry += 1;
      }

      if (categories.includes("warm")) {
        stats.warm += 1;
      }

      if (!categories.length) {
        stats.unknown += 1;
        stats.unknownLines.push(product.rawLine || "Productregel onbekend");
      }

      if (isCuttingUncertainProduct(product)) {
        stats.cuttingUncertain += 1;
        stats.cuttingUncertainLines.push(product.rawLine || "Snijden onzeker");
      }

      return stats;
    }, {
      bread: 0,
      pastry: 0,
      warm: 0,
      unknown: 0,
      unknownLines: [],
      cuttingUncertain: 0,
      cuttingUncertainLines: []
    });

    return {
      customers: {
        total: normalizedStops.length,
        ...customerStats
      },
      products: {
        total: products.length,
        ...productStats,
        unknownLines: [...new Set(productStats.unknownLines)].slice(0, 8),
        cuttingUncertainLines: [...new Set(productStats.cuttingUncertainLines)].slice(0, 8)
      },
      validation: {
        blocked: isRoutePrintBlocked(),
        suspectedCount: latestRouteCompleteness.suspectedCount || 0,
        builtCount: latestRouteCompleteness.builtCount || normalizedStops.length,
        reasons: Array.isArray(latestRouteCompleteness.reasons) ? latestRouteCompleteness.reasons : [],
        missingLines: Array.isArray(latestRouteCompleteness.missingLines) ? latestRouteCompleteness.missingLines : []
      },
      routeAdvice: {
        ...latestRouteAdviceReport,
        sampleScores: Array.isArray(latestRouteAdviceReport.sampleScores) ? latestRouteAdviceReport.sampleScores : [],
        reasons: Array.isArray(latestRouteAdviceReport.reasons) ? latestRouteAdviceReport.reasons : []
      },
      parser: {
        version: CURRENT_DELIVERY_PARSER_VERSION,
        source: latestParserSource || "-",
        textLineCount: latestTextLineCount || 0,
        referenceStatus: deliveryReferenceData.loaded
          ? `${deliveryReferenceData.customers.length} klanten, ${deliveryReferenceData.products.length} productpatronen`
          : deliveryReferenceData.loadError || "nog niet geladen"
      }
    };
  }

  function renderRecognitionMetric(label, value, tone = "") {
    const displayValue = value === 0 ? "0" : value;

    return `
      <div class="delivery-recognition-metric${tone ? ` is-${escapeHtml(tone)}` : ""}">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(displayValue)}</strong>
      </div>
    `;
  }

  function renderRouteHistoryReport(stops) {
    const report = buildRouteHistoryReport(stops);

    if (report.status === "idle" || report.status === "loading") {
      return `
        <section>
          <h4>Routegeschiedenis</h4>
          <p class="panel-note">Routegeschiedenis wordt geladen.</p>
        </section>
      `;
    }

    if (report.status === "error") {
      return `
        <section>
          <h4>Routegeschiedenis</h4>
          <p class="panel-note">Routegeschiedenis kon niet worden gelezen: ${escapeHtml(report.error)}</p>
        </section>
      `;
    }

    const rows = report.rows.slice(0, 20);

    return `
      <section>
        <h4>Routegeschiedenis</h4>
        <div class="delivery-recognition-metrics">
          ${renderRecognitionMetric("Runs gelezen", report.runCount)}
          ${renderRecognitionMetric("Historie-stops", report.historyStopCount)}
          ${renderRecognitionMetric("Matches", report.matchedCount, report.matchedCount ? "ok" : "warning")}
        </div>
        ${report.runCount < 2 ? `<p class="panel-note">Nog weinig historie. Sla geplande routes op om later betere adviezen te kunnen tonen.</p>` : ""}
        <ul class="delivery-recognition-list">
          ${rows.map((row) => `
            <li>
              <strong>${escapeHtml(row.customerName)}</strong>:
              ${escapeHtml(row.advice)}
              <small>
                gezien ${escapeHtml(String(row.seenCount))}x,
                meest ${escapeHtml(row.mostUsedRoute)},
                gebruik ${escapeHtml(row.routeUsage)},
                gem. positie ${escapeHtml(row.averagePosition ? String(row.averagePosition) : "-")},
                laatst ${escapeHtml(row.latestRoute)}${row.latestPosition ? ` positie ${escapeHtml(String(row.latestPosition))}` : ""},
                ${row.routeTwoPosition ? `Route 2 gem. positie ${escapeHtml(String(row.routeTwoPosition))},` : ""}
                laatst ${escapeHtml(row.lastSeen)},
                tijd ${escapeHtml(row.lastTimeWindow)},
                categorieën ${escapeHtml(row.lastCategories)}
              </small>
            </li>
          `).join("")}
        </ul>
      </section>
    `;
  }

  function renderRecognitionReport(stops = latestRouteStops) {
    if (!recognitionReportElement) {
      return;
    }

    const normalizedStops = Array.isArray(stops) ? stops : [];

    if (!normalizedStops.length && !latestTextLineCount && !latestParserQualityBlocked) {
      recognitionReportElement.classList.add("empty");
      recognitionReportElement.textContent = "Nog geen herkenningsrapport beschikbaar.";
      return;
    }

    const report = getRecognitionReport(normalizedStops);
    const suspiciousLines = [...report.validation.missingLines, ...report.products.unknownLines].slice(0, 10);

    recognitionReportElement.classList.remove("empty");
    recognitionReportElement.innerHTML = `
      <div class="delivery-recognition-grid">
        <section>
          <h4>Klantmatches</h4>
          <div class="delivery-recognition-metrics">
            ${renderRecognitionMetric("Stops", report.customers.total)}
            ${renderRecognitionMetric("Exact/adresmatch", report.customers.address)}
            ${renderRecognitionMetric("Aliasmatch", report.customers.alias, report.customers.alias ? "warning" : "")}
            ${renderRecognitionMetric("Zwak/onzeker", report.customers.weak, report.customers.weak ? "warning" : "")}
            ${renderRecognitionMetric("Onbekende klanten", report.customers.unknown, report.customers.unknown ? "blocked" : "")}
          </div>
        </section>
        <section>
          <h4>Productherkenning</h4>
          <div class="delivery-recognition-metrics">
            ${renderRecognitionMetric("Productregels", report.products.total)}
            ${renderRecognitionMetric("Brood", report.products.bread)}
            ${renderRecognitionMetric("Banket", report.products.pastry)}
            ${renderRecognitionMetric("Warm", report.products.warm)}
            ${renderRecognitionMetric("Onbekend", report.products.unknown, report.products.unknown ? "warning" : "")}
            ${renderRecognitionMetric("Snijden onzeker", report.products.cuttingUncertain, report.products.cuttingUncertain ? "warning" : "")}
          </div>
        </section>
        <section>
          <h4>Routevalidatie</h4>
          <div class="delivery-recognition-metrics">
            ${renderRecognitionMetric("Status", report.validation.blocked ? "Geblokkeerd" : "OK", report.validation.blocked ? "blocked" : "ok")}
            ${renderRecognitionMetric("Vermoedelijke stops", report.validation.suspectedCount)}
            ${renderRecognitionMetric("Gebouwde stops", report.validation.builtCount)}
            ${renderRecognitionMetric("Verdachte regels", report.validation.missingLines.length, report.validation.missingLines.length ? "blocked" : "")}
          </div>
          ${report.validation.reasons.length ? `
            <ul class="delivery-recognition-list">
              ${report.validation.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}
            </ul>
          ` : ""}
        </section>
        <section>
          <h4>Routevoorstel</h4>
          <div class="delivery-recognition-metrics">
            ${renderRecognitionMetric("Status", report.routeAdvice.active ? "Actief" : "Niet actief", report.routeAdvice.active ? "ok" : "")}
            ${renderRecognitionMetric("Warme stops", report.routeAdvice.warmStopCount)}
            ${renderRecognitionMetric("Postcodeclusters", report.routeAdvice.postcodeClusterCount)}
            ${renderRecognitionMetric("Routebalans", report.routeAdvice.routeBalance)}
          </div>
          ${report.routeAdvice.reasons.length ? `
            <ul class="delivery-recognition-list">
              ${report.routeAdvice.reasons.map((reason) => `<li>✓ ${escapeHtml(reason)}</li>`).join("")}
            </ul>
          ` : ""}
          ${report.routeAdvice.sampleScores.length ? `
            <ul class="delivery-recognition-list">
              ${report.routeAdvice.sampleScores.map((score) => `
                <li>${escapeHtml(score.customerName)}: score ${escapeHtml(score.score)} (${escapeHtml(score.reasons.join(", "))})</li>
              `).join("")}
            </ul>
          ` : ""}
        </section>
        ${renderRouteHistoryReport(normalizedStops)}
        <section>
          <h4>Parserinformatie</h4>
          <div class="delivery-recognition-metrics">
            ${renderRecognitionMetric("Parserversie", report.parser.version)}
            ${renderRecognitionMetric("Bron", report.parser.source)}
            ${renderRecognitionMetric("Tekstregels", report.parser.textLineCount)}
            ${renderRecognitionMetric("Woordenboeken", report.parser.referenceStatus)}
          </div>
        </section>
      </div>
      ${report.products.cuttingUncertainLines.length ? `
        <div class="delivery-recognition-suspicious">
          <strong>Snijden onzeker</strong>
          <ul>
            ${report.products.cuttingUncertainLines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
          </ul>
        </div>
      ` : ""}
      ${suspiciousLines.length ? `
        <div class="delivery-recognition-suspicious">
          <strong>Verdachte/onbekende regels</strong>
          <ul>
            ${suspiciousLines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
          </ul>
        </div>
      ` : ""}
    `;

    if (normalizedStops.length && latestRouteHistoryState.status === "idle") {
      void fetchRouteHistoryRuns();
    }
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
    if (latestPlannerStatus === "approved") {
      return [];
    }

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
        <span>Wat moet ik nu controleren?</span>
        <strong>${reviewItems.length} stop${reviewItems.length === 1 ? "" : "s"}</strong>
      </div>
      <div class="delivery-control-list">
        ${reviewItems.slice(0, 5).map((item) => `
          <article class="delivery-control-item${item.urgency <= 2 ? " is-urgent" : ""}">
            <strong>${escapeHtml(item.customerName)}</strong>
            <span>${escapeHtml(item.reason)}</span>
            <small>handmatig controleren</small>
          </article>
        `).join("")}
      </div>
      ${reviewItems.length > 5 ? `<div class="delivery-control-more">+ ${reviewItems.length - 5} meer controlepunt${reviewItems.length - 5 === 1 ? "" : "en"} in route en financieel overzicht</div>` : ""}
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
      const driverStatus = getDriverStatus(stop);

      if (hasStopProblem(stop)) {
        byKey.problems.items.push(createActionItem(stop, index, "problems", getStopProblemText(stop)));
      }

      if (status === "niet betaald" && !driverStatus.paid) {
        byKey.unpaid.items.push(createActionItem(stop, index, "unpaid", "betaling staat op niet betaald"));
      }

      if (status === "op rekening") {
        byKey.account.items.push(createActionItem(stop, index, "account", "betaling op rekening"));
      }

      if (driverStatus.paid || ["ok", "betaald via ideal"].includes(status)) {
        byKey.paid.items.push(createActionItem(
          stop,
          index,
          "paid",
          driverStatus.paid ? "lokaal betaald gemarkeerd" : (status === "ok" ? "betaling OK" : "betaald via Ideal")
        ));
      }

      if (isDirectPayment) {
        byKey.direct.items.push(createActionItem(stop, index, "direct", stop.paymentStatus));
      }

      if (!stop?.paymentStatus && !driverStatus.paid) {
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

    const financialGroupOrder = ["problems", "unpaid", "review", "account", "paid", "direct"];
    const groups = getActionPaymentGroups(stops)
      .filter((group) => financialGroupOrder.includes(group.key))
      .sort((groupA, groupB) => financialGroupOrder.indexOf(groupA.key) - financialGroupOrder.indexOf(groupB.key));

    actionsOverviewElement.classList.remove("empty");
    const visibleGroups = groups.filter((group) => group.items.length);

    if (!visibleGroups.length) {
      actionsOverviewElement.classList.add("empty");
      actionsOverviewElement.textContent = "Geen financiële acties gevonden.";
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
    if (latestSaveState.status === "updating") return "Route opslaan";
    if (latestSaveState.status === "updated") return "Route opgeslagen";
    if (latestSaveState.status === "saved") return "Opgeslagen";
    if (latestSaveState.status === "opened") return "Opgeslagen route geopend";
    if (latestSaveState.status === "update-conflict") return "Conflict";
    if (latestSaveState.status === "conflict") return "Bestaat al";
    if (latestSaveState.status === "blocked") return "Niet opgeslagen";
    if (latestSaveState.status === "error") return "Fout bij opslaan";
    return "Nog niet opgeslagen";
  }

  function getRunSourceText() {
    if (latestRunSource === "local") return "Lokale PDF-preview";
    if (latestRunSource === "saved") return "Opgeslagen route";
    return "Geen run geladen";
  }

  function shouldShowUnsavedWarning() {
    return latestHasLocalCorrections || latestRunSource === "local" && ["ready", "error"].includes(latestSaveState.status);
  }

  function getRouteSaveActionState() {
    const hasStops = latestRouteStops.length > 0;
    const isBusy = latestSaveState.status === "saving" || latestSaveState.status === "updating";
    const isSavedRun = latestRunSource === "saved";
    const canPatch = hasStops
      && isSavedRun
      && latestHasLocalCorrections
      && latestRunId
      && latestRunBaseUpdatedAt
      && !isBusy
      && !isRoutePrintBlocked();
    const canPost = hasStops
      && !isSavedRun
      && latestSourceHash
      && !isBusy
      && latestSaveState.status !== "saved"
      && latestSaveState.status !== "opened"
      && !isRoutePrintBlocked();

    if (isBusy) {
      return {
        canSave: false,
        label: "Opslaan...",
        action: "",
        title: "Opslaan loopt."
      };
    }

    if (!hasStops || isRoutePrintBlocked()) {
      return {
        canSave: false,
        label: "Route opslaan",
        action: "",
        title: hasStops ? "Route is nog niet betrouwbaar genoeg om op te slaan." : "Upload eerst een PDF."
      };
    }

    if (canPatch) {
      return {
        canSave: true,
        label: "Route opslaan",
        action: "patch",
        title: "Correcties en routevolgorde opslaan."
      };
    }

    if (canPost) {
      return {
        canSave: true,
        label: "Route opslaan",
        action: "post",
        title: "Nieuwe bezorgrun opslaan in testmodus."
      };
    }

    return {
      canSave: false,
      label: "Route opslaan",
      action: "",
      title: latestSaveState.status === "saved" || latestSaveState.status === "opened"
        ? "Deze route is al opgeslagen."
        : "Opslaan volgt zodra de route klaar is."
    };
  }

  function renderRunStatusBar() {
    if (!runStatusBarElement) {
      return;
    }

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
      <span class="delivery-run-status-title"><strong>Bezorglijst</strong>${escapeHtml(displayTitle)}</span>
      <span><strong>Stops</strong>${latestRouteStops.length}</span>
      <span><strong>Opslag</strong>${escapeHtml(getSaveStatusText())}</span>
      <span><strong>Parser</strong>${escapeHtml(latestParserSource || "-")}</span>
      <button type="button" class="secondary" data-delivery-status-print ${latestRouteStops.length && !isRoutePrintBlocked() ? "" : "disabled"}>Printvoorbeeld</button>
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
      savedRunsElement.textContent = "Opgeslagen routes worden geladen.";
      return;
    }

    if (state === "error") {
      savedRunsElement.classList.add("empty");
      savedRunsElement.textContent = "Opgeslagen routes konden niet worden geladen.";
      return;
    }

    if (!Array.isArray(runs) || !runs.length) {
      savedRunsElement.classList.add("empty");
      savedRunsElement.textContent = "Nog geen opgeslagen routes in testmodus.";
      return;
    }

    savedRunsElement.classList.remove("empty");
    savedRunsElement.innerHTML = runs.map((run) => {
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
          <span>${stopCount} stop${stopCount === 1 ? "" : "s"}</span>
          <small>Bijgewerkt: ${escapeHtml(formatSavedRunDateTime(updatedAt))}</small>
          <div class="delivery-saved-run-actions">
            <button type="button" class="secondary" data-delivery-open-run="${escapeHtml(run?.id || "")}">Openen</button>
            <button type="button" class="secondary" data-delivery-print-run="${escapeHtml(run?.id || "")}" ${stopCount ? "" : "disabled"}>Opnieuw printen</button>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderEmployeeSavedRuns(runs, state = "ready") {
    if (!employeeDeliverySavedRunsElement) {
      return;
    }

    if (state === "loading") {
      employeeDeliverySavedRunsElement.classList.add("empty");
      employeeDeliverySavedRunsElement.textContent = "Opgeslagen routes worden geladen.";
      return;
    }

    if (state === "error") {
      employeeDeliverySavedRunsElement.classList.add("empty");
      employeeDeliverySavedRunsElement.textContent = "Opgeslagen routes konden niet worden geladen.";
      return;
    }

    const todayRuns = Array.isArray(runs) ? runs.filter(isEmployeeRunForToday) : [];

    if (!todayRuns.length) {
      employeeDeliverySavedRunsElement.classList.add("empty");
      employeeDeliverySavedRunsElement.textContent = "Er staat nog geen bezorgroute voor vandaag klaar.";
      return;
    }

    employeeDeliverySavedRunsElement.classList.remove("empty");
    employeeDeliverySavedRunsElement.innerHTML = todayRuns.map((run) => {
      const displayTitle = getDeliveryRunDisplayTitle({
        deliveryDate: run?.payload?.deliveryDate || "",
        sourceFilename: run?.sourceFilename || run?.payload?.source?.filename || "",
        fallbackDate: run?.payload?.source?.uploadedAt || run?.createdAt || run?.updatedAt || ""
      });
      const routeBlocks = Array.isArray(run?.payload?.routeBlocks) ? run.payload.routeBlocks : [];
      const routeOneCount = routeBlocks.find((routeBlock, routeIndex) => getStopRouteNumber({
        routeNumber: routeBlock?.routeNumber || routeIndex + 1,
        routeName: routeBlock?.name || routeBlock?.routeName || ""
      }) === 1)?.stops?.length || 0;
      const routeTwoCount = routeBlocks.find((routeBlock, routeIndex) => getStopRouteNumber({
        routeNumber: routeBlock?.routeNumber || routeIndex + 1,
        routeName: routeBlock?.name || routeBlock?.routeName || ""
      }) === 2)?.stops?.length || 0;
      const stopCount = routeOneCount + routeTwoCount;
      const updatedAt = run?.updatedAt || run?.createdAt || "";

      return `
        <article class="delivery-saved-run employee-delivery-run">
          <strong>${escapeHtml(displayTitle)}</strong>
          <span>${stopCount} stop${stopCount === 1 ? "" : "s"}</span>
          <small>Bijgewerkt: ${escapeHtml(formatSavedRunDateTime(updatedAt))}</small>
          <div class="delivery-saved-run-actions">
            <button type="button" class="secondary" data-employee-delivery-open-run="${escapeHtml(run?.id || "")}" data-employee-delivery-route="1" ${routeOneCount ? "" : "disabled"}>Route 1 (${routeOneCount})</button>
            <button type="button" class="secondary" data-employee-delivery-open-run="${escapeHtml(run?.id || "")}" data-employee-delivery-route="2" ${routeTwoCount ? "" : "disabled"}>Route 2 (${routeTwoCount})</button>
          </div>
        </article>
      `;
    }).join("");
  }

  function openSavedRoutesSection({ scroll = true } = {}) {
    setDeliveryWorkVisible(true);

    if (savedRoutesSectionElement) {
      savedRoutesSectionElement.open = true;
      if (scroll) {
        savedRoutesSectionElement.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }

    void fetchSavedRuns();
  }

  async function fetchEmployeeSavedRuns() {
    if (!employeeDeliverySavedRunsElement) {
      return;
    }

    renderEmployeeSavedRuns([], "loading");

    try {
      const response = await fetch("/api/delivery-runs?mode=test", {
        method: "GET",
        cache: "no-store"
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        renderEmployeeSavedRuns([], "error");
        return;
      }

      renderEmployeeSavedRuns(Array.isArray(result?.runs) ? result.runs : []);
    } catch {
      renderEmployeeSavedRuns([], "error");
    }
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

  async function fetchRouteHistoryRuns({ force = false } = {}) {
    if (!force && (latestRouteHistoryState.status === "loading" || latestRouteHistoryState.status === "ready")) {
      return;
    }

    latestRouteHistoryState = {
      status: "loading",
      runs: latestRouteHistoryState.runs,
      error: ""
    };
    renderRecognitionReport(latestRouteStops);

    try {
      const response = await fetch("/api/delivery-runs?mode=test", {
        method: "GET",
        headers: {
          Accept: "application/json"
        },
        cache: "no-store"
      });
      const result = await response.json().catch(() => ({}));

      latestRouteHistoryState = response.ok
        ? {
          status: "ready",
          runs: Array.isArray(result?.runs) ? result.runs : [],
          error: ""
        }
        : {
          status: "error",
          runs: [],
          error: result?.message || "Routegeschiedenis kon niet worden geladen."
        };
    } catch (error) {
      latestRouteHistoryState = {
        status: "error",
        runs: [],
        error: error?.message || "Routegeschiedenis kon niet worden geladen."
      };
    }

    renderRecognitionReport(latestRouteStops);
  }

  function invalidateRouteHistoryReport() {
    latestRouteHistoryState = {
      status: "idle",
      runs: [],
      error: ""
    };
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
      customerId: typeof stop?.customerId === "string" ? stop.customerId : "",
      customerName: typeof stop?.customerName === "string" ? stop.customerName : "",
      address: typeof stop?.address === "string" ? stop.address : "",
      postcode: typeof stop?.postcode === "string" ? stop.postcode : "",
      plaats: typeof stop?.plaats === "string" ? stop.plaats : "",
      categories,
      products,
      routeNumber: getStopRouteNumber(stop),
      routeName: typeof stop?.routeName === "string" ? stop.routeName : `Route ${getStopRouteNumber(stop)}`,
      routeBlockName: typeof stop?.routeBlockName === "string" ? stop.routeBlockName : `Route ${getStopRouteNumber(stop)}`,
      position: Number.isFinite(Number(stop?.position)) ? Number(stop.position) : 0,
      paymentStatus: typeof stop?.paymentStatus === "string" ? stop.paymentStatus : "",
      timeWindow: typeof stop?.timeWindow === "string" ? stop.timeWindow : "",
      remark: typeof stop?.remark === "string" ? stop.remark : "",
      notes: Array.isArray(stop?.notes) ? stop.notes.filter((note) => typeof note === "string") : [],
      needsReview: Boolean(stop?.needsReview)
    };
  }

  function getStopsFromSavedPayload(payload) {
    return (Array.isArray(payload?.routeBlocks) ? payload.routeBlocks : [])
      .flatMap((routeBlock, routeIndex) => {
        const blockRouteNumber = getStopRouteNumber({
          routeNumber: routeBlock?.routeNumber || routeIndex + 1,
          routeName: routeBlock?.name || routeBlock?.routeName || ""
        });

        return Array.isArray(routeBlock?.stops)
          ? routeBlock.stops.map((stop) => ({
            ...stop,
            routeNumber: stop?.routeNumber || blockRouteNumber,
            routeName: stop?.routeName || `Route ${blockRouteNumber}`,
            routeBlockName: stop?.routeBlockName || `Route ${blockRouteNumber}`
          }))
          : [];
      })
      .map(normalizeLoadedStop);
  }

  function renderSavedRunPayload(run) {
    setDeliveryWorkVisible(true);
    closeDeliveryLowerSections();

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
    latestTextLineCount = Number(payload?.source?.textLineCount) || 0;
    latestUploadDate = payload?.source?.uploadedAt || run?.createdAt || "";
    latestRunSource = "saved";
    latestRunId = run?.id || "";
    latestRunUpdatedAt = run?.updatedAt || run?.createdAt || "";
    latestRunBaseUpdatedAt = run?.updatedAt || "";
    latestSaveState = {
      status: "opened",
      message: "Opgeslagen route geopend"
    };
    loadDriverModeState();
    latestHasLocalCorrections = false;
    latestPlannerStatus = "draft";
    latestRouteProposalState = "none";
    latestRouteAdviceReport = {
      ...buildRouteAdviceReport(routeStops),
      active: false,
      reasons: ["Opgeslagen route geopend; geen nieuw voorstel toegepast"]
    };
    latestRouteCompleteness = {
      isIncomplete: false,
      suspectedCount: routeStops.length,
      builtCount: routeStops.length,
      missingLines: [],
      reasons: []
    };
    latestParserQualityBlocked = false;
    latestParserVersionWarning = parserVersionWarning;
    selectedDeliveryStopIndex = -1;
    draggedDeliveryStopIndex = -1;

    if (pdfInput) {
      pdfInput.value = "";
    }

    if (lineCountElement) {
      lineCountElement.textContent = `Opgeslagen route: ${routeStops.length} stop${routeStops.length === 1 ? "" : "s"}`;
    }

    if (rawPreviewElement) {
      rawPreviewElement.textContent = "Opgeslagen route geopend. De PDF-parser is niet opnieuw uitgevoerd.";
    }

    if (recognizedListElement) {
      recognizedListElement.classList.remove("empty");
      recognizedListElement.innerHTML = `
        <div class="delivery-recognized-item">
          <strong>Opgeslagen route</strong>
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

    setStatus("Opgeslagen route geopend.", "ready");
    renderDashboard(routeStops, latestDeliveryDate);
    renderControlSummary(routeStops);
    renderActionsOverview(routeStops);
    renderPreparation(routeStops);
    renderRouteBlocks(routeStops);
    renderQuickEdit(routeStops);
    renderStopDetail(routeStops);
    renderProductOverview(routeStops);
    renderDriverPreview(routeStops, latestDeliveryDate);
    renderRecognitionReport(routeStops);
    renderPrintPreview();
  }

  async function openSavedRun(runId, { printAfterOpen = false } = {}) {
    const normalizedRunId = String(runId || "").trim();

    if (!normalizedRunId) {
      return;
    }

    setStatus("Opgeslagen route wordt geopend...", "ready");

    try {
      const response = await fetch(`/api/delivery-runs?mode=test&id=${encodeURIComponent(normalizedRunId)}`, {
        method: "GET",
        cache: "no-store"
      });
      const result = await response.json().catch(() => ({}));
      const run = Array.isArray(result?.runs) ? result.runs[0] : null;

      if (!response.ok || !run) {
        setStatus(result?.message || "Opgeslagen route kon niet worden geopend.", "error");
        return;
      }

      renderSavedRunPayload(run);
      if (printAfterOpen) {
        window.setTimeout(() => {
          approvePlanningAndOpenPrint();
        }, 0);
      }
    } catch (error) {
      setStatus(error?.message || "Opgeslagen route kon niet worden geopend.", "error");
    }
  }

  async function openEmployeeDeliveryRun(runId, routeNumber = 1) {
    const normalizedRunId = String(runId || "").trim();

    if (!normalizedRunId) {
      return;
    }

    try {
      const response = await fetch(`/api/delivery-runs?mode=test&id=${encodeURIComponent(normalizedRunId)}`, {
        method: "GET",
        cache: "no-store"
      });
      const result = await response.json().catch(() => ({}));
      const run = Array.isArray(result?.runs) ? result.runs[0] : null;

      if (!response.ok || !run) {
        renderEmployeeSavedRuns([], "error");
        return;
      }

      if (!isEmployeeRunForToday(run)) {
        renderEmployeeSavedRuns([]);
        return;
      }

      renderSavedRunPayload(run);
      openDriverMode(routeNumber);
    } catch {
      renderEmployeeSavedRuns([], "error");
    }
  }

  function renderDashboard(stops, deliveryDate) {
    if (!dashboardElement) {
      return;
    }

    const stats = getDashboardStats(stops);
    const hasStops = stats.stopCount > 0;
    const saveState = getRouteSaveActionState();
    const displayTitle = hasStops
      ? getDeliveryRunDisplayTitle({
        deliveryDate,
        sourceFilename: latestSourceFilename,
        fallbackDate: latestUploadDate || latestRunUpdatedAt
      })
      : "";

    dashboardElement.classList.toggle("empty", !hasStops);
    renderRunStatusBar();
    renderPlannerStatus();
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
        <button type="button" class="secondary" data-delivery-dashboard-save data-delivery-save-action="${escapeHtml(saveState.action)}" ${saveState.canSave ? "" : "disabled"}>${escapeHtml(saveState.label)}</button>
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

  function renderRouteStopStatusChips(stop) {
    const driverStatus = getDriverStatus(stop);
    const chips = [];

    if (driverStatus.delivered) {
      chips.push({ label: "geleverd", level: "done" });
    }

    if (driverStatus.paid) {
      chips.push({ label: "betaald", level: "paid" });
    }

    if (hasStopProblem(stop)) {
      chips.push({ label: "probleem", level: "problem" });
    } else if (hasResolvedStopProblem(stop)) {
      chips.push({ label: "opgelost", level: "resolved" });
    }

    if (!chips.length) {
      chips.push({ label: "open", level: "open" });
    }

    return `
      <div class="delivery-route-stop-status">
        ${chips.map((chip) => `
          <span class="delivery-route-status-chip" data-delivery-route-status="${escapeHtml(chip.level)}">${escapeHtml(chip.label)}</span>
        `).join("")}
      </div>
    `;
  }

  function getRouteNeighborStopIndex(index, direction) {
    const sourceIndex = Number(index);
    const step = Number(direction);
    const stop = latestRouteStops[sourceIndex];

    if (!stop || !Number.isInteger(sourceIndex) || !Number.isFinite(step) || step === 0) {
      return -1;
    }

    const routeNumber = getStopRouteNumber(stop);
    const routeIndexes = latestRouteStops
      .map((candidateStop, candidateIndex) => getStopRouteNumber(candidateStop) === routeNumber ? candidateIndex : -1)
      .filter((candidateIndex) => candidateIndex >= 0);
    const routePosition = routeIndexes.indexOf(sourceIndex);

    if (routePosition < 0) {
      return -1;
    }

    return routeIndexes[routePosition + Math.sign(step)] ?? -1;
  }

  function renderRouteOrderControls(index, totalStops = latestRouteStops.length) {
    const previousIndex = getRouteNeighborStopIndex(index, -1);
    const nextIndex = getRouteNeighborStopIndex(index, 1);
    const routeNumber = getStopRouteNumber(latestRouteStops[index]);
    const targetRouteNumber = routeNumber === 2 ? 1 : 2;

    return `
      <div class="delivery-route-order-controls">
        <span class="delivery-route-drag-handle" aria-label="Sleep stop" title="Sleep">↕</span>
        <button type="button" class="secondary" data-delivery-move-route="${index}" data-delivery-target-route="${targetRouteNumber}" aria-label="Verplaats naar Route ${targetRouteNumber}" title="Naar Route ${targetRouteNumber}">R${targetRouteNumber}</button>
        <button type="button" class="secondary" data-delivery-move-stop="${index}" data-delivery-move-direction="-1" ${previousIndex >= 0 ? "" : "disabled"} aria-label="Stop omhoog" title="Omhoog">↑</button>
        <button type="button" class="secondary" data-delivery-move-stop="${index}" data-delivery-move-direction="1" ${nextIndex >= 0 ? "" : "disabled"} aria-label="Stop omlaag" title="Omlaag">↓</button>
      </div>
    `;
  }

  function renderRouteStopIcons(stop, categories) {
    const icons = [];

    if (isWarmStop(stop)) {
      icons.push({ icon: "🔥", label: "warm/snacks" });
    }

    if (categories.includes("brood") || categories.includes("broodjes")) {
      icons.push({ icon: "🍞", label: "brood" });
    }

    if (categories.includes("gebak")) {
      icons.push({ icon: "🎂", label: "banket/gebak" });
    }

    if (latestPlannerStatus !== "approved" && (stopHasReview(stop) || hasStopProblem(stop))) {
      icons.push({ icon: "❗", label: "controle nodig" });
    }

    return `
      <div class="delivery-route-stop-icons${icons.length ? "" : " is-empty"}">
        ${icons.map((item) => `<span title="${escapeHtml(item.label)}" aria-label="${escapeHtml(item.label)}">${item.icon}</span>`).join("")}
      </div>
    `;
  }

  function getDriverModeRouteItems(routeNumber = driverModeRouteNumber) {
    const normalizedRouteNumber = Number(routeNumber) === 2 ? 2 : 1;

    return latestRouteStops
      .map((stop, index) => ({
        stop,
        index
      }))
      .filter((item) => getStopRouteNumber(item.stop) === normalizedRouteNumber);
  }

  function normalizeDriverModeState() {
    if (!latestRouteStops.length) {
      isDriverModeOpen = false;
      driverModeRouteNumber = 1;
      driverModeStopIndex = 0;
      return [];
    }

    let routeItems = getDriverModeRouteItems(driverModeRouteNumber);

    if (!routeItems.length) {
      driverModeRouteNumber = driverModeRouteNumber === 2 ? 1 : 2;
      routeItems = getDriverModeRouteItems(driverModeRouteNumber);
    }

    if (!routeItems.length) {
      driverModeStopIndex = 0;
      return [];
    }

    driverModeStopIndex = Math.min(Math.max(driverModeStopIndex, 0), routeItems.length - 1);
    return routeItems;
  }

  function getDriverModeRouteCount(routeNumber) {
    return getDriverModeRouteItems(routeNumber).length;
  }

  function renderDriverModeIcons(stop) {
    const categories = normalizeCategories(stop?.categories || []);
    const icons = [];

    if (categories.includes("brood") || categories.includes("broodjes")) {
      icons.push({ icon: "ðŸž", label: "brood" });
    }

    if (categories.includes("gebak")) {
      icons.push({ icon: "ðŸŽ‚", label: "banket/gebak" });
    }

    if (isWarmStop(stop)) {
      icons.push({ icon: "ðŸ”¥", label: "warm/snacks" });
    }

    return icons.length
      ? `<div class="delivery-driver-mode-icons">${icons.map((item) => `<span title="${escapeHtml(item.label)}">${item.icon}</span>`).join("")}</div>`
      : "";
  }

  function renderDriverModeProducts(stop) {
    const products = getSortedProductsForStop(stop);

    if (!products.length) {
      return "<div class=\"delivery-driver-mode-empty\">Geen producten gekoppeld.</div>";
    }

    return `
      <div class="delivery-driver-mode-products">
        ${products.map((product) => {
          const isWarmProduct = product.category === "warm" || isWarmPreparationProduct(product);
          return `
            <div class="delivery-driver-mode-product${isWarmProduct ? " has-warm" : ""}">
              <strong>${escapeHtml(product.count || "?")}</strong>
              <span>${isWarmProduct ? "🔥 " : ""}${escapeHtml(product.rawLine)}</span>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function getDriverModeRouteSummary(routeItems) {
    const total = Array.isArray(routeItems) ? routeItems.length : 0;
    const delivered = (Array.isArray(routeItems) ? routeItems : [])
      .filter((item) => getDriverModeStopState(item.stop).delivered)
      .length;

    return {
      total,
      delivered,
      open: Math.max(total - delivered, 0)
    };
  }

  function isDriverModePaymentActionRelevant(stop) {
    const status = normalizePaymentStatusLabel(stop?.paymentStatus);

    return !status ||
      ["niet betaald", "contant", "contant betaald", "pin", "pin betaald", "tikkie", "tikkie gestuurd", "controle nodig", "betaling controle"].includes(status);
  }

  function renderDriverModeActions(stop) {
    const state = getDriverModeStopState(stop);
    const paymentStatus = stop?.paymentStatus || "betaling controle";
    const showPaymentAction = isDriverModePaymentActionRelevant(stop);

    return `
      <div class="delivery-driver-mode-actions">
        <button type="button" class="delivery-driver-mode-primary-action" data-delivery-driver-mode-deliver-next>
          ${state.delivered ? "Geleverd - volgende open stop" : "Geleverd + volgende stop"}
        </button>
        ${showPaymentAction
          ? `<button type="button" class="delivery-driver-mode-pay-action${state.paid ? " is-done" : ""}" data-delivery-driver-mode-pay>
              ${state.paid ? "Betaald gemarkeerd" : "Betaald"}
            </button>`
          : `<div class="delivery-driver-mode-payment-note">Betaling: ${escapeHtml(paymentStatus)}</div>`}
        <label class="delivery-driver-mode-note">
          <textarea data-delivery-driver-note rows="2" maxlength="180" placeholder="Notitie voor deze stop">${escapeHtml(state.note)}</textarea>
        </label>
      </div>
    `;
  }

  function getDriverModeTargets() {
    return [
      {
        element: driverModeElement,
        content: driverModeContentElement
      },
      {
        element: employeeDriverModeElement,
        content: employeeDriverModeContentElement
      }
    ].filter((target) => target.element && target.content);
  }

  function getActiveDriverModeElement() {
    return document.body?.dataset?.activeTab === "employee-delivery"
      ? employeeDriverModeElement || driverModeElement
      : driverModeElement || employeeDriverModeElement;
  }

  function setDriverModeTargetsHidden(message) {
    getDriverModeTargets().forEach((target) => {
      target.element.hidden = true;
      target.content.classList.add("empty");
      target.content.textContent = message;
    });
  }

  function setDriverModeTargetsHtml(html) {
    getDriverModeTargets().forEach((target) => {
      target.element.hidden = false;
      target.content.classList.remove("empty");
      target.content.innerHTML = html;
    });
  }

  function renderDriverMode() {
    if (!getDriverModeTargets().length) {
      return;
    }

    renderPlannerStatus();
    deliveryPanelElement?.classList.toggle("is-driver-mode-open", Boolean(isDriverModeOpen));
    employeeDeliveryPanelElement?.classList.toggle("is-driver-mode-open", Boolean(isDriverModeOpen));

    if (!isDriverModeOpen) {
      setDriverModeTargetsHidden("Open een opgeslagen route om chauffeurmodus te bekijken.");
      return;
    }

    const routeItems = normalizeDriverModeState();

    if (!routeItems.length) {
      setDriverModeTargetsHidden("Geen stops beschikbaar voor chauffeurmodus.");
      return;
    }

    const currentItem = routeItems[driverModeStopIndex];
    const stop = currentItem.stop;
    const routeOneCount = getDriverModeRouteCount(1);
    const routeTwoCount = getDriverModeRouteCount(2);
    const routeSummary = getDriverModeRouteSummary(routeItems);
    const stopLabel = `Stop ${driverModeStopIndex + 1} van ${routeItems.length}`;
    const deliveredProgressLabel = `${routeSummary.delivered} van ${routeSummary.total} geleverd`;
    const progressPercentage = routeSummary.total
      ? Math.round((routeSummary.delivered / routeSummary.total) * 100)
      : 0;
    const navigationUrl = stop.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.address)}`
      : "";
    const remark = String(stop.remark || "").trim();
    const paymentStatus = stop.paymentStatus || "betaling controle";
    const canMoveToNextOpen = routeItems.some((item, itemIndex) =>
      itemIndex > driverModeStopIndex && !getDriverModeStopState(item.stop).delivered
    );

    setDriverModeTargetsHtml(`
      <section class="delivery-driver-mode-shell">
        <header class="delivery-driver-mode-top">
          <div class="delivery-driver-mode-route-tabs">
            <button type="button" class="secondary${driverModeRouteNumber === 1 ? " is-active" : ""}" data-delivery-driver-route="1" ${routeOneCount ? "" : "disabled"}>Route 1 <span>${routeOneCount}</span></button>
            <button type="button" class="secondary${driverModeRouteNumber === 2 ? " is-active" : ""}" data-delivery-driver-route="2" ${routeTwoCount ? "" : "disabled"}>Route 2 <span>${routeTwoCount}</span></button>
          </div>
          <div class="delivery-driver-mode-progress">
            <div>
              <strong>${escapeHtml(deliveredProgressLabel)}</strong>
              <span>${escapeHtml(stopLabel)} - ${escapeHtml(String(routeSummary.open))} open</span>
            </div>
            <div class="delivery-driver-mode-progress-track" aria-label="${escapeHtml(deliveredProgressLabel)}">
              <span style="width:${escapeHtml(String(progressPercentage))}%"></span>
            </div>
          </div>
        </header>
        <article class="delivery-driver-mode-stop${isWarmStop(stop) ? " has-warm" : ""}">
          <div class="delivery-driver-mode-stop-head">
            <strong>${escapeHtml(getRouteStopTimeLabel(stop))}</strong>
          </div>
          <h3>${escapeHtml(stop.customerName || "Klant onbekend")}</h3>
          ${renderDriverModeIcons(stop)}
          ${navigationUrl
            ? `<a class="delivery-driver-mode-navigate" href="${escapeHtml(navigationUrl)}" target="_blank" rel="noopener">Navigeer</a>`
            : "<button type=\"button\" class=\"delivery-driver-mode-navigate\" disabled>Navigeer</button>"}
          <div class="delivery-driver-mode-address">
            ${navigationUrl
              ? `<span>${escapeHtml(stop.address || "Adres onbekend")}</span>`
              : `<span>${escapeHtml(stop.address || "Adres onbekend")}</span>`}
          </div>
          ${remark ? `<div class="delivery-driver-mode-remark">${escapeHtml(remark)}</div>` : ""}
          <div class="delivery-driver-mode-meta">
            <span>${escapeHtml(paymentStatus)}</span>
            ${isWarmStop(stop) ? "<span>Warm controleren</span>" : ""}
          </div>
          ${renderDriverModeActions(stop)}
          <section class="delivery-driver-mode-products-card">
            <h4>Mee te nemen</h4>
            ${renderDriverModeProducts(stop)}
          </section>
        </article>
        <div class="delivery-driver-mode-nav">
          <button type="button" class="secondary" data-delivery-driver-mode-prev ${driverModeStopIndex <= 0 ? "disabled" : ""}>Vorige</button>
          <button type="button" class="secondary" data-delivery-driver-mode-next-open ${canMoveToNextOpen ? "" : "disabled"}>Volgende open</button>
          <button type="button" class="secondary" data-delivery-driver-mode-next ${driverModeStopIndex >= routeItems.length - 1 ? "disabled" : ""}>Volgende</button>
        </div>
      </section>
    `);
  }

  function openDriverMode(routeNumber = 1) {
    if (latestRunSource !== "saved" || !latestRouteStops.length || isRoutePrintBlocked()) {
      return;
    }

    driverModeRouteNumber = Number(routeNumber) === 2 ? 2 : 1;
    driverModeStopIndex = 0;
    isDriverModeOpen = true;
    renderDriverMode();
    getActiveDriverModeElement()?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function closeDriverMode() {
    isDriverModeOpen = false;
    renderDriverMode();
  }

  function setDriverModeRoute(routeNumber) {
    const normalizedRouteNumber = Number(routeNumber) === 2 ? 2 : 1;

    if (!getDriverModeRouteCount(normalizedRouteNumber)) {
      return;
    }

    driverModeRouteNumber = normalizedRouteNumber;
    driverModeStopIndex = 0;
    renderDriverMode();
  }

  function moveDriverModeStop(delta) {
    const routeItems = normalizeDriverModeState();

    if (!routeItems.length) {
      renderDriverMode();
      return;
    }

    driverModeStopIndex = Math.min(Math.max(driverModeStopIndex + delta, 0), routeItems.length - 1);
    renderDriverMode();
    getActiveDriverModeElement()?.scrollIntoView({ block: "start", behavior: "auto" });
  }

  function moveDriverModeToNextOpenStop() {
    const routeItems = normalizeDriverModeState();

    if (!routeItems.length) {
      renderDriverMode();
      return;
    }

    const nextOpenIndex = routeItems.findIndex((item, itemIndex) =>
      itemIndex > driverModeStopIndex && !getDriverModeStopState(item.stop).delivered
    );

    if (nextOpenIndex < 0) {
      renderDriverMode();
      return;
    }

    driverModeStopIndex = nextOpenIndex;
    renderDriverMode();
    getActiveDriverModeElement()?.scrollIntoView({ block: "start", behavior: "auto" });
  }

  function completeCurrentDriverModeStopAndMoveNext() {
    const stop = getCurrentDriverModeStop();

    if (!stop) {
      renderDriverMode();
      return;
    }

    updateDriverModeStopState(stop, {
      delivered: true
    });
    moveDriverModeToNextOpenStop();
  }

  function markCurrentDriverModeStopPaid() {
    const stop = getCurrentDriverModeStop();

    if (!stop) {
      renderDriverMode();
      return;
    }

    updateDriverModeStopState(stop, {
      paid: true
    });
    renderDriverMode();
  }

  function getCurrentDriverModeStop() {
    const routeItems = normalizeDriverModeState();
    return routeItems[driverModeStopIndex]?.stop || null;
  }

  function updateCurrentDriverModeCheckbox(field, checked) {
    const stop = getCurrentDriverModeStop();

    if (!stop || !["delivered", "paid"].includes(field)) {
      return;
    }

    updateDriverModeStopState(stop, {
      [field]: Boolean(checked)
    });
    renderDriverMode();
  }

  function updateCurrentDriverModeNote(note) {
    const stop = getCurrentDriverModeStop();

    if (!stop) {
      return;
    }

    updateDriverModeStopState(stop, {
      note: String(note || "").trim()
    });
  }

  function getRouteStopTimeLabel(stop) {
    const timeWindow = String(stop?.timeWindow || "").trim();

    if (!timeWindow || /controle nodig/i.test(timeWindow)) {
      return "tijd ?";
    }

    return timeWindow;
  }

  function getDriverStatusChips(stop) {
    const chips = [];
    const paymentStatus = normalizePaymentStatusLabel(stop?.paymentStatus);
    const driverStatus = getDriverStatus(stop);

    if (driverStatus.delivered) {
      chips.push({ label: "Geleverd", level: "done" });
    }

    if (driverStatus.paid) {
      chips.push({ label: "Betaald", level: "paid" });
    }

    if (isWarmStop(stop)) {
      chips.push({ label: "warm", level: "warm" });
    }

    if (paymentStatus === "niet betaald" && !driverStatus.paid) {
      chips.push({ label: "niet betaald", level: "danger" });
    }

    if (stopHasReview(stop)) {
      chips.push({ label: "controle nodig", level: "review" });
    }

    if (hasStopProblem(stop)) {
      chips.push({ label: "probleem gemeld", level: "problem" });
    }

    if (hasResolvedStopProblem(stop)) {
      chips.push({ label: "probleem opgelost", level: "resolved" });
    }

    return chips;
  }

  function renderDriverStatusChips(stop) {
    const chips = getDriverStatusChips(stop);

    if (!chips.length) {
      return "";
    }

    return `
      <div class="delivery-driver-status-chips">
        ${chips.map((chip) => `
          <span class="delivery-driver-status-chip" data-delivery-driver-status="${escapeHtml(chip.level)}">${escapeHtml(chip.label)}</span>
        `).join("")}
      </div>
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
    const hasOpenProblem = hasStopProblem(stop);
    const hasResolvedProblem = hasResolvedStopProblem(stop);
    const driverStatus = getDriverStatus(stop);
    const stopPositionLabel = `Stop ${selectedDeliveryStopIndex + 1} van ${normalizedStops.length}`;
    const navigationUrl = stop.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.address)}`
      : "";

    stopDetailElement.classList.remove("empty");
    stopDetailElement.innerHTML = `
      <section class="delivery-stop-detail-surface${hasWarm ? " has-warm" : ""}${hasReview ? " needs-review" : ""}">
        <div class="delivery-driver-stop-nav">
          <button type="button" class="secondary" data-delivery-driver-prev ${selectedDeliveryStopIndex <= 0 ? "disabled" : ""}>Vorige stop</button>
          <strong>${escapeHtml(stopPositionLabel)}</strong>
          <button type="button" class="secondary" data-delivery-driver-next ${selectedDeliveryStopIndex >= normalizedStops.length - 1 ? "disabled" : ""}>Volgende stop</button>
        </div>
        <div class="delivery-stop-detail-hero">
          <div>
            <span>Geselecteerde stop</span>
            <h4>${escapeHtml(stop.customerName || "Klant onbekend")}</h4>
          </div>
          <strong>${escapeHtml(stop.timeWindow || "Tijd controle nodig")}</strong>
        </div>
        ${renderDriverStatusChips(stop)}
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
        ${hasOpenProblem ? `<div class="delivery-stop-detail-alert is-problem">Laatste probleemmelding: ${escapeHtml(problemText)}</div>` : ""}
        ${hasResolvedProblem ? `<div class="delivery-stop-detail-alert is-resolved">Probleem opgelost: ${escapeHtml(problemText)}</div>` : ""}
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
          <button type="button" class="secondary" data-delivery-driver-status-action="delivered">${driverStatus.delivered ? "Geleverd gemarkeerd" : "Geleverd"}</button>
          <button type="button" class="secondary" data-delivery-driver-status-action="paid">${driverStatus.paid ? "Betaald gemarkeerd" : "Betaald"}</button>
          <button type="button" class="secondary" data-delivery-driver-status-action="resolved" ${hasAnyStopProblem(stop) && !hasResolvedProblem ? "" : "disabled"}>${hasResolvedProblem ? "Probleem opgelost" : "Probleem opgelost"}</button>
          <button type="button" class="secondary" data-delivery-open-problem>Probleem melden</button>
        </div>
        ${renderProblemReportForm(stop)}
      </section>
    `;
  }

  function selectDeliveryStop(index, { scrollRoute = false, scrollDetail = false } = {}) {
    const normalizedIndex = Number(index);

    if (!Number.isInteger(normalizedIndex) || !latestRouteStops[normalizedIndex]) {
      return;
    }

    selectedDeliveryStopIndex = normalizedIndex;
    renderRouteBlocks(latestRouteStops);
    renderQuickEdit(latestRouteStops);
    renderStopDetail(latestRouteStops);

    if (scrollRoute) {
      scrollToDeliveryStop(normalizedIndex);
    }

    if (scrollDetail) {
      stopDetailElement?.scrollIntoView({ block: "start", behavior: "auto" });
    }
  }

  function moveSelectedDeliveryStop(delta) {
    if (!latestRouteStops.length) {
      return;
    }

    const currentIndex = selectedDeliveryStopIndex >= 0 ? selectedDeliveryStopIndex : 0;
    const nextIndex = Math.min(Math.max(currentIndex + delta, 0), latestRouteStops.length - 1);

    if (nextIndex === selectedDeliveryStopIndex) {
      return;
    }

    selectDeliveryStop(nextIndex, { scrollDetail: true });
  }

  function isPrintPreviewActive() {
    return Boolean(
      printPreviewElement
      && !printPreviewElement.classList.contains("empty")
      && printPreviewElement.querySelector(".delivery-print-page")
    );
  }

  function getMovedSelectedStopIndex(fromIndex, toIndex) {
    if (selectedDeliveryStopIndex === fromIndex) {
      return toIndex;
    }

    if (fromIndex < selectedDeliveryStopIndex && selectedDeliveryStopIndex <= toIndex) {
      return selectedDeliveryStopIndex - 1;
    }

    if (toIndex <= selectedDeliveryStopIndex && selectedDeliveryStopIndex < fromIndex) {
      return selectedDeliveryStopIndex + 1;
    }

    return selectedDeliveryStopIndex;
  }

  function reorderDeliveryStop(fromIndex, toIndex, { scrollRoute = false, targetRouteNumber = 0 } = {}) {
    const sourceIndex = Number(fromIndex);
    const targetIndex = Number(toIndex);

    if (
      !Number.isInteger(sourceIndex)
      || !Number.isInteger(targetIndex)
      || sourceIndex < 0
      || targetIndex < 0
      || sourceIndex >= latestRouteStops.length
      || targetIndex >= latestRouteStops.length
      || sourceIndex === targetIndex
    ) {
      return;
    }

    const nextSelectedIndex = getMovedSelectedStopIndex(sourceIndex, targetIndex);
    const [movedStop] = latestRouteStops.splice(sourceIndex, 1);
    if (targetRouteNumber) {
      setStopRouteNumber(movedStop, targetRouteNumber);
    }
    latestRouteStops.splice(targetIndex, 0, movedStop);
    selectedDeliveryStopIndex = nextSelectedIndex;
    draggedDeliveryStopIndex = -1;
    resetDeliveryPlanningApproval();

    latestHasLocalCorrections = true;
    latestSaveState = {
      status: "blocked",
      message: "Routevolgorde lokaal aangepast. Nog niet opgeslagen."
    };
    rerenderDeliveryPreview({ refreshPrint: isPrintPreviewActive() });
    setStatus("Routevolgorde lokaal aangepast. Nog niet opgeslagen.", "ready");

    if (scrollRoute) {
      scrollToDeliveryStop(targetIndex);
    }
  }

  function moveDeliveryStopToRoute(index, routeNumber) {
    const sourceIndex = Number(index);
    const targetRouteNumber = Number(routeNumber) === 2 ? 2 : 1;
    const stop = latestRouteStops[sourceIndex];

    if (!stop || getStopRouteNumber(stop) === targetRouteNumber) {
      return;
    }

    setStopRouteNumber(stop, targetRouteNumber);
    selectedDeliveryStopIndex = sourceIndex;
    resetDeliveryPlanningApproval();
    latestHasLocalCorrections = true;
    latestSaveState = {
      status: "blocked",
      message: `Stop lokaal verplaatst naar Route ${targetRouteNumber}. Nog niet opgeslagen.`
    };
    rerenderDeliveryPreview({ refreshPrint: isPrintPreviewActive() });
    setStatus(`Stop lokaal verplaatst naar Route ${targetRouteNumber}. Nog niet opgeslagen.`, "ready");
    scrollToDeliveryStop(sourceIndex);
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

  function renderStopCorrectionForm(stop, index, { force = false, quick = false } = {}) {
    if (!force && !stop.isEditing) {
      return "";
    }

    const paymentValue = getStopCorrectionPaymentValue(stop);
    const reviewChecked = stopHasReview(stop) ? "checked" : "";

    return `
      <form class="delivery-stop-correction${quick ? " is-quick" : ""}" data-delivery-stop-correction="${index}">
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
          ${quick ? "" : `<button type="button" class="secondary" data-delivery-cancel-correction="${index}">Sluiten</button>`}
        </div>
      </form>
    `;
  }

  function renderQuickEdit(stops = latestRouteStops) {
    if (!quickEditElement) {
      return;
    }

    const normalizedStops = Array.isArray(stops) ? stops : [];
    const stop = normalizedStops[selectedDeliveryStopIndex] || null;

    if (!stop) {
      quickEditElement.classList.add("empty");
      quickEditElement.textContent = "Selecteer een stop in de route om tijd, betaling of opmerking aan te passen.";
      return;
    }

    quickEditElement.classList.remove("empty");
    quickEditElement.innerHTML = `
      <div class="delivery-quick-edit-selected">
        <strong>${escapeHtml(selectedDeliveryStopIndex + 1)}. ${escapeHtml(stop.customerName || "Klant onbekend")}</strong>
        <span>${escapeHtml(stop.address || "Adres onbekend")}</span>
      </div>
      ${renderStopCorrectionForm(stop, selectedDeliveryStopIndex, { force: true, quick: true })}
    `;
  }

  function renderRouteBlocks(stops) {
    if (!routeBlocksElement) {
      return;
    }

    renderPlannerStatus();

    if (!Array.isArray(stops) || !stops.length) {
      routeBlocksElement.classList.add("empty");
      routeBlocksElement.textContent = "Nog geen routeblokken beschikbaar.";
      return;
    }

    routeBlocksElement.classList.remove("empty");
    const indexedStops = stops.map((stop, index) => ({
      stop,
      index
    }));
    const routeOneStops = indexedStops.filter((item) => getStopRouteNumber(item.stop) !== 2);
    const routeTwoStops = indexedStops.filter((item) => getStopRouteNumber(item.stop) === 2);
    const renderRouteLaneStops = (items) => items.map((item, routeStopIndex) => {
      const { stop, index } = item;
      const categories = Array.isArray(stop.categories) && stop.categories.length
        ? stop.categories
        : ["controle nodig"];
      const hasReview = stopHasReview(stop);
      const hasOpenProblem = hasStopProblem(stop);
      const hasResolvedProblem = hasResolvedStopProblem(stop);
      const rowClasses = [
        "delivery-route-stop",
        isWarmStop(stop) ? "has-warm" : "",
        (categories.includes("brood") || categories.includes("broodjes")) ? "has-bread" : "",
        categories.includes("gebak") ? "has-pastry" : "",
        hasReview ? "needs-review" : "",
        hasOpenProblem ? "has-problem" : "",
        hasResolvedProblem ? "has-resolved-problem" : "",
        selectedDeliveryStopIndex === index ? "is-selected" : ""
      ].filter(Boolean).join(" ");

      return `
        <article id="deliveryRouteStop${index}" class="${rowClasses}" data-delivery-route-stop="${index}" draggable="true">
          <div class="delivery-stop-number" aria-label="Stop ${routeStopIndex + 1}">${routeStopIndex + 1}</div>
          ${renderRouteStopIcons(stop, categories)}
          <div class="delivery-stop-main">
            <div class="delivery-stop-title">${escapeHtml(stop.customerName || "Klant onbekend")}</div>
          </div>
          <div class="delivery-stop-time">${escapeHtml(getRouteStopTimeLabel(stop))}</div>
          ${renderRouteOrderControls(index, latestRouteStops.length)}
        </article>
      `;
    }).join("");

    routeBlocksElement.innerHTML = `
      ${isRoutePrintBlocked() ? `
        <div class="delivery-route-incomplete-alert">
          <strong>Route onvolledig gelezen - printen geblokkeerd</strong>
          <span>${escapeHtml(latestRouteCompleteness.builtCount)} van vermoedelijk ${escapeHtml(latestRouteCompleteness.suspectedCount)} stops herkend. Controleer PDF of parser. Deze route mag nog niet gebruikt worden.</span>
          ${latestRouteCompleteness.reasons.length ? `
            <small>Reden: ${latestRouteCompleteness.reasons.map(escapeHtml).join(" | ")}</small>
          ` : ""}
          <details>
            <summary>Toon verdachte regels</summary>
            ${latestRouteCompleteness.missingLines.length
              ? `<small>${latestRouteCompleteness.missingLines.map(escapeHtml).join(" | ")}</small>`
              : "<small>Geen losse verdachte regels beschikbaar; blokkade komt uit aantallen/klantnamen/parserkwaliteit.</small>"}
          </details>
        </div>
      ` : ""}
      <div class="delivery-route-planner-grid">
        <section class="delivery-route-block delivery-route-lane is-active">
          <header class="delivery-route-lane-header">
            <div>
              <h4>Route 1</h4>
            </div>
            <strong>${routeOneStops.length} stop${routeOneStops.length === 1 ? "" : "s"}</strong>
          </header>
          <div class="delivery-route-stop-list">
            ${routeOneStops.length ? renderRouteLaneStops(routeOneStops) : "<div class=\"delivery-route-empty-lane\"><strong>Nog leeg</strong></div>"}
          </div>
        </section>
        <section class="delivery-route-block delivery-route-lane is-secondary">
          <header class="delivery-route-lane-header">
            <div>
              <h4>Route 2</h4>
            </div>
            <strong>${routeTwoStops.length} stop${routeTwoStops.length === 1 ? "" : "s"}</strong>
          </header>
          <div class="delivery-route-stop-list">
            ${routeTwoStops.length ? renderRouteLaneStops(routeTwoStops) : `
              <div class="delivery-route-empty-lane">
                <strong>Nog leeg</strong>
                <span>Route 2 wordt gebruikt als het voorstel genoeg stops veilig kan verdelen.</span>
              </div>
            `}
          </div>
        </section>
      </div>
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
    stopDetailElement?.scrollIntoView({ block: "start", behavior: "auto" });
  }

  function applyDriverStatusAction(action) {
    const stop = latestRouteStops[selectedDeliveryStopIndex];

    if (!stop) {
      return;
    }

    const now = new Date().toISOString();
    stop.driverStatus = stop.driverStatus || {};

    if (action === "delivered") {
      stop.driverStatus.delivered = true;
      stop.driverStatus.deliveredAt = stop.driverStatus.deliveredAt || now;
    }

    if (action === "paid") {
      stop.driverStatus.paid = true;
      stop.driverStatus.paidAt = stop.driverStatus.paidAt || now;
    }

    if (action === "resolved" && hasAnyStopProblem(stop)) {
      stop.driverProblem.resolvedAt = stop.driverProblem.resolvedAt || now;
    }

    rerenderDeliveryPreview({ refreshPrint: false });
    setStatus("Chauffeurstatus lokaal bijgewerkt. Niet opgeslagen.", "ready");
    stopDetailElement?.scrollIntoView({ block: "start", behavior: "auto" });
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

  function getReferenceCuttingState(line) {
    const matches = getReferenceProductMatches(line);

    if (!matches.length) {
      return null;
    }

    if (matches.some((product) => product.snijden === false && normalizeReferenceCategory(product.categorie) !== "overig")) {
      return false;
    }

    if (matches.some((product) => product.snijden === true)) {
      return true;
    }

    return null;
  }

  function isNonCuttingProductLine(line) {
    const rawLine = String(line || "");

    return NOT_CUTTING_PATTERN.test(rawLine) ||
      NON_CUTTING_BREAD_PATTERN.test(rawLine) ||
      /\b(gebak|taart|vlaai|cake|koek|banket|bavar|bavarois|appelrondje|appelcake|vruchtenschelp|vierkantje|bonbons?|aardbei|saucijs|appelflap|frikandel|worstenbrood)\b/i.test(rawLine);
  }

  function isCuttingProduct(product) {
    const rawLine = String(product?.rawLine || "");

    if (!rawLine || NOT_CUTTING_PATTERN.test(rawLine)) {
      return false;
    }

    const referenceCuttingState = getReferenceCuttingState(rawLine);

    if (referenceCuttingState !== null) {
      return referenceCuttingState;
    }

    if (isNonCuttingProductLine(rawLine)) {
      return false;
    }

    if (CUTTING_PATTERN.test(rawLine)) {
      return true;
    }

    return getProductCategories(rawLine).includes("brood") && CUTTING_BREAD_PATTERN.test(rawLine);
  }

  function isCuttingUncertainProduct(product) {
    const rawLine = String(product?.rawLine || "");

    if (!rawLine || isCuttingProduct(product) || isNonCuttingProductLine(rawLine)) {
      return false;
    }

    return getProductCategories(rawLine).includes("brood") && getReferenceCuttingState(rawLine) === null;
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

  function renderPrintRouteIcons(stop) {
    const categories = normalizeCategories(stop?.categories || []);
    const icons = [];

    if (isWarmStop(stop)) icons.push("🔥");
    if (categories.includes("brood") || categories.includes("broodjes")) icons.push("🍞");
    if (categories.includes("gebak")) icons.push("🎂");
    if (latestPlannerStatus !== "approved" && (stopHasReview(stop) || hasStopProblem(stop))) icons.push("❗");

    return icons.length
      ? `<span class="delivery-print-route-icons">${icons.map(escapeHtml).join(" ")}</span>`
      : "";
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
              <strong>${index + 1}. ${renderPrintRouteIcons(stop)} ${escapeHtml(stop.customerName || "Klant onbekend")}</strong>
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

  function getPrintRoutes(stops) {
    const normalizedStops = Array.isArray(stops) ? stops : [];
    const routeOneStops = [];
    const routeTwoStops = [];

    normalizedStops.forEach((stop) => {
      const routeLabel = String(stop?.routeName || stop?.routeBlockName || stop?.route || "").toLowerCase();
      const routeNumber = Number(stop?.routeNumber || stop?.routeIndex || 0);

      if (routeNumber === 2 || /(?:route|ronde|bezorger)\s*2\b/.test(routeLabel)) {
        routeTwoStops.push(stop);
      } else {
        routeOneStops.push(stop);
      }
    });

    return [
      { name: "Route 1", stops: routeOneStops },
      { name: "Route 2", stops: routeTwoStops }
    ];
  }

  function getPrintRouteStopNumber(routeIndex, stopIndex) {
    return String(stopIndex + 1);
  }

  function getPrintRemark(stop) {
    const remark = String(stop?.remark || "").trim();
    const notes = Array.isArray(stop?.notes) ? stop.notes.filter(Boolean) : [];
    return remark || notes[0] || "";
  }

  function getShortPrintRemark(stop) {
    const remark = getPrintRemark(stop);
    return remark.length > 90 ? `${remark.slice(0, 87).trim()}...` : remark;
  }

  function getImportantPaymentLabel(stop) {
    const knownCustomerMatch = findKnownCustomerForStop(stop);

    if (knownCustomerMatch?.customer?.bekendeBetaalstatus === "Niet betaald") {
      return "Niet betaald";
    }

    const paymentStatus = String(stop?.paymentStatus || "").trim();

    if (!paymentStatus) {
      return "betaling controle";
    }

    if (/\bok\b|betaald|ideal/i.test(paymentStatus)) {
      return "OK/Betaald";
    }

    return paymentStatus;
  }

  function getPrintWarmItems(stops) {
    return (Array.isArray(stops) ? stops : []).flatMap((stop) => {
      const products = getSortedProductsForStop(stop).filter((product) =>
        product.category === "warm" || isWarmPreparationProduct(product)
      );

      if (products.length) {
        return products.map((product) => ({
          stop,
          productText: product.rawLine || "Warm product",
          count: product.count || "?",
          time: getRouteStopTimeLabel(stop)
        }));
      }

      return isWarmStop(stop)
        ? [{
            stop,
            productText: "Warm/snacks",
            count: "?",
            time: getRouteStopTimeLabel(stop)
          }]
        : [];
    });
  }

  function isPrintRelevantWarning(warning) {
    const value = String(warning || "").trim();

    return Boolean(value)
      && !/^Parserbron:/i.test(value)
      && !/serverparser|browser-parser|lokale extractie|pdfjs|Voorstelroute gemaakt/i.test(value);
  }

  function getShortPrintWarning(warning) {
    const value = String(warning || "").replace(/\s+/g, " ").trim();

    if (value.length > 90) {
      return "Controle nodig: handmatig controleren";
    }

    return value;
  }

  function renderPrintRouteIcons(stop) {
    const categories = normalizeCategories(stop?.categories || []);
    const icons = [];

    if (isWarmStop(stop)) icons.push("&#128293;");
    if (categories.includes("brood") || categories.includes("broodjes")) icons.push("&#127838;");
    if (categories.includes("gebak")) icons.push("&#127874;");
    if (latestPlannerStatus !== "approved" && (stopHasReview(stop) || hasStopProblem(stop))) icons.push("&#10071;");

    return icons.length
      ? `<span class="delivery-print-route-icons">${icons.join(" ")}</span>`
      : "";
  }

  function renderPrintRouteCategorySummary(stop) {
    const categories = normalizeCategories(stop?.categories || []);
    const items = [];

    if (isWarmStop(stop)) {
      items.push(`<span class="delivery-print-route-category is-warm">&#128293; warm</span>`);
    }

    if (categories.includes("brood") || categories.includes("broodjes")) {
      items.push(`<span class="delivery-print-route-category is-bread">&#127838; brood</span>`);
    }

    if (categories.includes("gebak")) {
      items.push(`<span class="delivery-print-route-category is-pastry">&#127874; banket</span>`);
    }

    return items.length
      ? items.join("")
      : `<span class="delivery-print-note">wat meenemen controle nodig</span>`;
  }

  function renderPrintPreparationPage(stops) {
    const routes = getPrintRoutes(stops);
    const warmItems = getPrintWarmItems(stops);
    const preparation = calculatePreparation(stops);

    return `
      <section class="delivery-print-page delivery-print-preparation-page">
        <h4>Laden & voorbereiding</h4>
        <div class="delivery-print-meta">
          <span><strong>Datum</strong>${escapeHtml(latestDeliveryDate || "datum controle nodig")}</span>
        </div>
        <div class="delivery-print-route-summary">
          ${routes.map((route) => `
            <div>
              <strong>${escapeHtml(route.name)}</strong>
              <span>${escapeHtml(String(route.stops.length))} ${route.stops.length === 1 ? "stop" : "stops"}</span>
            </div>
          `).join("")}
        </div>
        <div class="delivery-print-section">
          <strong>Warme snacks</strong>
          ${warmItems.length
            ? `<div class="delivery-print-warm-list">
                ${warmItems.map((item) => `
                  <div class="delivery-print-warm-row">
                    <span class="delivery-print-checkbox" aria-hidden="true"></span>
                    <span>${escapeHtml(item.productText)}</span>
                    <span>${escapeHtml(item.stop.customerName || "Klant onbekend")}</span>
                    <b>${escapeHtml(item.count)}</b>
                    <strong>${escapeHtml(item.time)}</strong>
                  </div>
                `).join("")}
              </div>`
            : "<div>Geen warme snacks gevonden.</div>"}
        </div>
        <div class="delivery-print-section">
          <strong>Snijden</strong>
          <div>${escapeHtml(String(preparation.cuttingCount))} ${preparation.cuttingCount === 1 ? "brood" : "broden"}</div>
          <div>Geschatte snijtijd: ${escapeHtml(preparation.cuttingDurationLabel)}</div>
        </div>
      </section>
    `;
  }

  function renderPrintRoutePage(stops) {
    const routes = getPrintRoutes(stops);

    return `
      <section class="delivery-print-page delivery-print-route-page">
        <h4>Route voor bezorger</h4>
        ${routes.map((route, routeIndex) => `
          <div class="delivery-print-route-block">
            <h5>${escapeHtml(route.name)}</h5>
            <div class="delivery-print-route-list">
              ${route.stops.length
                ? route.stops.map((stop, stopIndex) => {
                    const remark = getShortPrintRemark(stop);

                    return `
                      <article class="delivery-print-route-stop${isWarmStop(stop) ? " has-warm" : ""}">
                        <div class="delivery-print-route-head">
                          <strong>${escapeHtml(getPrintRouteStopNumber(routeIndex, stopIndex))} ${renderPrintRouteIcons(stop)} ${escapeHtml(stop.customerName || "Klant onbekend")}</strong>
                          <span>${escapeHtml(getRouteStopTimeLabel(stop))}</span>
                        </div>
                        <div class="delivery-print-address">${escapeHtml(stop.address || "Adres onbekend")}</div>
                        ${remark ? `<div class="delivery-print-route-remark">${escapeHtml(remark)}</div>` : ""}
                        ${stopHasReview(stop) ? `<small>controle nodig${stop.notes.length ? `: ${escapeHtml(stop.notes.join(", "))}` : ""}</small>` : ""}
                      </article>
                    `;
                  }).join("")
                : "<div class=\"delivery-print-note\">Geen stops in deze route.</div>"}
            </div>
          </div>
        `).join("")}
      </section>
    `;
  }

  function renderPrintChecklistPage(stops) {
    const routes = getPrintRoutes(stops);

    return `
      <section class="delivery-print-page delivery-print-check-page">
        <h4>Afvinken & betalingen</h4>
        ${routes.map((route, routeIndex) => `
          <div class="delivery-print-check-route">
            <h5>${escapeHtml(route.name)}</h5>
            <div class="delivery-print-checklist">
              ${route.stops.length
                ? route.stops.map((stop, stopIndex) => {
                    const paymentLabel = getImportantPaymentLabel(stop);
                    const remark = getShortPrintRemark(stop);
                    return `
                      <div class="delivery-print-check-row">
                        <span class="delivery-print-check-cell"><span class="delivery-print-checkbox" aria-hidden="true"></span><b>geleverd</b></span>
                        <span class="delivery-print-check-cell"><span class="delivery-print-checkbox" aria-hidden="true"></span><b>betaald</b></span>
                        <span class="delivery-print-check-main">
                          <strong>${escapeHtml(getPrintRouteStopNumber(routeIndex, stopIndex))} ${escapeHtml(stop.customerName || "Klant onbekend")}</strong>
                          ${remark ? `<small>${escapeHtml(remark)}</small>` : ""}
                        </span>
                        <span class="delivery-print-check-time">${escapeHtml(getRouteStopTimeLabel(stop))}</span>
                        <span class="delivery-print-payment">${escapeHtml(paymentLabel)}</span>
                      </div>
                    `;
                  }).join("")
                : "<div class=\"delivery-print-note\">Geen stops.</div>"}
            </div>
          </div>
        `).join("")}
      </section>
    `;
  }

  function renderPrintProductPage(stops) {
    const routes = getPrintRoutes(stops).map((route) => ({
      ...route,
      stops: route.stops.map((stop) => ({
        ...stop,
        products: getSortedProductsForStop(stop)
      }))
    }));
    const hasStops = routes.some((route) => route.stops.length);

    return `
      <section class="delivery-print-page delivery-print-product-page">
        <h4>Producten / laden</h4>
        ${hasStops
          ? routes.map((route, routeIndex) => `
            <div class="delivery-print-product-route">
              <h5>${escapeHtml(route.name)}</h5>
              <div class="delivery-print-product-stops">
                ${route.stops.length
                  ? route.stops.map((stop, stopIndex) => `
                    <article class="delivery-print-product-stop${isWarmStop(stop) ? " has-warm" : ""}">
                      <div class="delivery-print-product-head">
                        <strong>${escapeHtml(getPrintRouteStopNumber(routeIndex, stopIndex))} ${escapeHtml(stop.customerName || "Klant onbekend")}</strong>
                        <span>${escapeHtml(getRouteStopTimeLabel(stop))}</span>
                      </div>
                      <div class="delivery-print-product-list">
                        ${stop.products.length
                          ? stop.products.map((product) => {
                            const numericCount = Number(product.count);
                            const isLargeCount = Number.isFinite(numericCount) && numericCount >= 10;
                            const isWarmProduct = product.category === "warm";

                            return `
                              <div class="delivery-print-product-row${isWarmProduct ? " has-warm" : ""}${isLargeCount ? " has-large-count" : ""}">
                                <span class="delivery-print-checkbox" aria-hidden="true"></span>
                                <b class="${isLargeCount ? "is-large" : ""}">${escapeHtml(product.count || "?")}</b>
                                <span>${isWarmProduct ? "&#128293; " : ""}${escapeHtml(product.rawLine)}</span>
                                ${product.needsReview ? `<small>controle nodig${product.count ? "" : ": aantal niet herkend"}</small>` : ""}
                              </div>
                            `;
                          }).join("")
                          : `<div class="delivery-print-product-row is-empty">
                              <span class="delivery-print-checkbox" aria-hidden="true"></span>
                              <b>?</b>
                              <span>Geen productregels gekoppeld</span>
                            </div>`}
                      </div>
                    </article>
                  `).join("")
                  : "<div class=\"delivery-print-note\">Geen stops in deze route.</div>"}
              </div>
            </div>
          `).join("")
          : "<div class=\"delivery-print-note\">Geen stops gevonden.</div>"}
      </section>
    `;
  }

  function getPrintOutputElement() {
    let outputElement = document.getElementById("deliveryPrintOutput");

    if (!outputElement) {
      outputElement = document.createElement("div");
      outputElement.id = "deliveryPrintOutput";
      outputElement.className = "delivery-print-output";
      outputElement.setAttribute("aria-hidden", "true");
      document.body.append(outputElement);
    }

    return outputElement;
  }

  function getPrintPreviewHtml() {
    return [
      renderPrintPreparationPage(latestRouteStops, latestParseWarnings),
      renderPrintRoutePage(latestRouteStops),
      renderPrintChecklistPage(latestRouteStops),
      renderPrintProductPage(latestRouteStops)
    ].join("");
  }

  function renderPrintPreview() {
    const printOutputElement = getPrintOutputElement();

    if (!latestRouteStops.length) {
      printOutputElement.innerHTML = "";

      if (printPreviewElement) {
        printPreviewElement.classList.add("empty");
        printPreviewElement.textContent = "Geen routegegevens beschikbaar. Lees eerst een PDF in.";
      }

      return;
    }

    if (isRoutePrintBlocked()) {
      printOutputElement.innerHTML = "";

      if (printPreviewElement) {
        printPreviewElement.classList.add("empty");
        printPreviewElement.textContent = "Route onvolledig gelezen - printen geblokkeerd. Controleer PDF of parser. Deze route mag nog niet gebruikt worden.";
      }

      return;
    }

    const previewHtml = getPrintPreviewHtml();
    printOutputElement.innerHTML = previewHtml;

    if (printPreviewElement) {
      printPreviewElement.classList.remove("empty");
      printPreviewElement.innerHTML = previewHtml;
    }
  }

  function openPrintPreviewSection() {
    const printSection = printPreviewElement?.closest("details");

    if (printSection) {
      printSection.open = true;
    }

    printPreviewElement?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function approvePlanningAndOpenPrint() {
    if (!latestRouteStops.length || isRoutePrintBlocked()) {
      if (isRoutePrintBlocked()) {
        setStatus("Route onvolledig gelezen - printen geblokkeerd.", "error");
      }
      return;
    }

    latestPlannerStatus = "approved";
    setStatus("Planning gecontroleerd. Printvenster wordt geopend.", "ready");
    rerenderDeliveryPreview({ refreshPrint: true });
    window.setTimeout(() => {
      window.print();
    }, 0);
  }

  function getDeliveryRunPayload() {
    const firstStop = latestRouteStops[0] || null;
    const routePositions = {};
    const payloadStops = latestRouteStops.map((stop) => {
      const routeNumber = getStopRouteNumber(stop);
      const postcodePlace = getStopPostcodePlace(stop);
      routePositions[routeNumber] = (routePositions[routeNumber] || 0) + 1;

      return {
        customerId: stop.knownCustomerId || stop.customerId || "",
        customerName: stop.customerName || "",
        address: stop.address || "",
        postcode: postcodePlace.postcode,
        plaats: postcodePlace.plaats,
        categories: Array.isArray(stop.categories) ? stop.categories : [],
        routeNumber,
        routeName: `Route ${routeNumber}`,
        routeBlockName: `Route ${routeNumber}`,
        position: routePositions[routeNumber],
        paymentStatus: stop.paymentStatus || "",
        timeWindow: stop.timeWindow || "",
        remark: stop.remark || "",
        notes: Array.isArray(stop.notes) ? stop.notes : [],
        needsReview: Boolean(stop.needsReview),
        products: Array.isArray(stop.products) ? stop.products : []
      };
    });

    return {
      parserVersion: CURRENT_DELIVERY_PARSER_VERSION,
      deliveryDate: latestDeliveryDate,
      source: {
        filename: latestSourceFilename,
        hash: latestSourceHash,
        parser: latestParserSource,
        uploadedAt: latestUploadDate
      },
      routeBlocks: getPrintRoutes(payloadStops).map((route, routeIndex) => ({
        name: route.name,
        routeNumber: routeIndex + 1,
        stops: route.stops
      })),
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

  function saveCurrentDeliveryRoute() {
    const saveState = getRouteSaveActionState();

    if (!saveState.canSave) {
      setStatus(saveState.title || "Route kan nog niet worden opgeslagen.", "error");
      return;
    }

    if (saveState.action === "patch") {
      void saveDeliveryCorrections();
      return;
    }

    void saveDeliveryRun();
  }

  async function saveDeliveryRun() {
    if (!latestRouteStops.length || !latestSourceHash || latestSaveState.status === "saving" || latestSaveState.status === "updating" || isRoutePrintBlocked()) {
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
        const savedRun = result?.run || {};
        latestSaveState = {
          status: "saved",
          message: "Route opgeslagen in Supabase testmodus."
        };
        latestRunSource = "saved";
        latestRunId = savedRun.id || latestRunId;
        latestRunUpdatedAt = savedRun.updatedAt || savedRun.createdAt || latestRunUpdatedAt;
        latestRunBaseUpdatedAt = savedRun.updatedAt || latestRunBaseUpdatedAt;
        loadDriverModeState();
        latestHasLocalCorrections = false;
        invalidateRouteHistoryReport();
        setStatus("Route opgeslagen.", "ready");
        void fetchSavedRuns();
      }
    } catch (error) {
      latestSaveState = {
        status: "error",
        message: error?.message || "Opslaan is mislukt."
      };
    }

    renderDashboard(latestRouteStops, latestDeliveryDate);
    renderPlannerStatus();
    renderRunStatusBar();
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
      message: "Route opslaan..."
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
          message: "Route opgeslagen"
        };
        invalidateRouteHistoryReport();
        setStatus("Route opgeslagen.", "ready");
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

  function getPaymentStatsForLines(lines) {
    const stops = buildRouteStops(lines);

    return {
      stopCount: stops.length,
      paidStatusCount: stops.filter((stop) => Boolean(stop.paymentStatus)).length,
      missingStatusCount: stops.filter((stop) => !stop.paymentStatus).length,
      unpaidCount: stops.filter((stop) => stop.paymentStatus === "Niet betaald").length
    };
  }

  function shouldTryServerParserForPaymentDetails(file, result) {
    if (!file || !result || result.parser !== "browser-local-v1" || file.size > 3 * 1024 * 1024) {
      return false;
    }

    if (!/bezorg/i.test(file.name || "")) {
      return false;
    }

    const stats = getPaymentStatsForLines(result.lines);
    return stats.stopCount > 0 && stats.unpaidCount === 0;
  }

  function hasBetterPaymentDetails(serverResult, browserResult) {
    const browserStats = getPaymentStatsForLines(browserResult.lines);
    const serverStats = getPaymentStatsForLines(serverResult.lines);

    if (serverStats.stopCount < browserStats.stopCount) {
      return false;
    }

    return serverStats.unpaidCount > browserStats.unpaidCount ||
      serverStats.missingStatusCount < browserStats.missingStatusCount ||
      serverStats.paidStatusCount > browserStats.paidStatusCount;
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
      await loadDeliveryReferenceData();
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
        if (shouldTryServerParserForPaymentDetails(file, result)) {
          try {
            const serverResult = await parsePdfFileWithServer(file, result);

            if (!serverResult.extractionQuality?.unreliable && hasBetterPaymentDetails(serverResult, result)) {
              latestParserSource = `${serverResult.parser || "pdfjs-server-v1"} + betaalcontrole`;
              renderParseResult(serverResult.lines, serverResult.recognized, serverResult.warnings, serverResult.extractionQuality, latestParserSource);
              setStatus(`${file.name}${sizeLabel ? ` (${sizeLabel})` : ""} gelezen met extra betaalcontrole.`, "ready");
              return;
            }
          } catch (serverError) {
            console.warn("[delivery] extra betaalcontrole met serverparser mislukt", serverError);
          }
        }

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
  employeeDeliveryRefreshButton?.addEventListener("click", () => {
    void fetchEmployeeSavedRuns();
  });
  document.addEventListener("click", (event) => {
    const employeeDeliveryLink = event.target.closest("[data-go-tab=\"employee-delivery\"]");

    if (!employeeDeliveryLink) {
      return;
    }

    window.setTimeout(() => {
      void fetchEmployeeSavedRuns();
    }, 0);
  });
  employeeDeliverySavedRunsElement?.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-employee-delivery-open-run]");

    if (!openButton || openButton.disabled) {
      return;
    }

    void openEmployeeDeliveryRun(
      openButton.dataset.employeeDeliveryOpenRun,
      Number(openButton.dataset.employeeDeliveryRoute)
    );
  });
  savedRunsElement?.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-delivery-open-run]");
    const printButton = event.target.closest("[data-delivery-print-run]");

    if (printButton && !printButton.disabled) {
      void openSavedRun(printButton.dataset.deliveryPrintRun, { printAfterOpen: true });
      return;
    }

    if (openButton) {
      void openSavedRun(openButton.dataset.deliveryOpenRun);
    }
  });
  function handleDeliveryPanelClick(event) {
    const newPdfButton = event.target.closest("[data-delivery-route-new-pdf]");
    const showSavedButton = event.target.closest("[data-delivery-show-saved-routes]");
    const routeSaveButton = event.target.closest("[data-delivery-route-save]");
    const routePrintButton = event.target.closest("[data-delivery-route-print]");
    const routeResetButton = event.target.closest("[data-delivery-route-reset]");
    const driverModeButton = event.target.closest("[data-delivery-driver-mode-open]");
    const driverModeCloseButton = event.target.closest("[data-delivery-driver-mode-close]");
    const driverModeRouteButton = event.target.closest("[data-delivery-driver-route]");
    const driverModePreviousButton = event.target.closest("[data-delivery-driver-mode-prev]");
    const driverModeNextOpenButton = event.target.closest("[data-delivery-driver-mode-next-open]");
    const driverModeNextButton = event.target.closest("[data-delivery-driver-mode-next]");
    const driverModeDeliverNextButton = event.target.closest("[data-delivery-driver-mode-deliver-next]");
    const driverModePayButton = event.target.closest("[data-delivery-driver-mode-pay]");

    if (newPdfButton) {
      pdfInput?.click();
      return;
    }

    if (showSavedButton) {
      openSavedRoutesSection();
      return;
    }

    if (routeSaveButton && !routeSaveButton.disabled) {
      saveCurrentDeliveryRoute();
      return;
    }

    if (routePrintButton && !routePrintButton.disabled) {
      approvePlanningAndOpenPrint();
      return;
    }

    if (driverModeButton && !driverModeButton.disabled) {
      openDriverMode(1);
      return;
    }

    if (driverModeCloseButton) {
      closeDriverMode();
      return;
    }

    if (driverModeRouteButton && !driverModeRouteButton.disabled) {
      setDriverModeRoute(Number(driverModeRouteButton.dataset.deliveryDriverRoute));
      return;
    }

    if (driverModePreviousButton && !driverModePreviousButton.disabled) {
      moveDriverModeStop(-1);
      return;
    }

    if (driverModeNextOpenButton && !driverModeNextOpenButton.disabled) {
      moveDriverModeToNextOpenStop();
      return;
    }

    if (driverModeNextButton && !driverModeNextButton.disabled) {
      moveDriverModeStop(1);
      return;
    }

    if (driverModeDeliverNextButton && !driverModeDeliverNextButton.disabled) {
      completeCurrentDriverModeStopAndMoveNext();
      return;
    }

    if (driverModePayButton && !driverModePayButton.disabled) {
      markCurrentDriverModeStopPaid();
      return;
    }

    if (routeResetButton && !routeResetButton.disabled) {
      resetRouteToPdfOrder();
    }
  }

  deliveryPanelElement?.addEventListener("click", handleDeliveryPanelClick);
  employeeDeliveryPanelElement?.addEventListener("click", handleDeliveryPanelClick);
  function handleDriverModeStatusChange(event) {
    const statusField = event.target.closest("[data-delivery-driver-status-field]");

    if (!statusField) {
      return;
    }

    updateCurrentDriverModeCheckbox(statusField.dataset.deliveryDriverStatusField, statusField.checked);
  }

  function handleDriverModeNoteInput(event) {
    const noteField = event.target.closest("[data-delivery-driver-note]");

    if (!noteField) {
      return;
    }

    updateCurrentDriverModeNote(noteField.value);
  }

  deliveryPanelElement?.addEventListener("change", handleDriverModeStatusChange);
  employeeDeliveryPanelElement?.addEventListener("change", handleDriverModeStatusChange);
  deliveryPanelElement?.addEventListener("input", handleDriverModeNoteInput);
  employeeDeliveryPanelElement?.addEventListener("input", handleDriverModeNoteInput);
  routeBlocksElement?.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-delivery-edit-stop]");
    const cancelButton = event.target.closest("[data-delivery-cancel-correction]");
    const routeMoveButton = event.target.closest("[data-delivery-move-route]");
    const moveButton = event.target.closest("[data-delivery-move-stop]");
    const routeStop = event.target.closest("[data-delivery-route-stop]");

    if (routeMoveButton && !routeMoveButton.disabled) {
      moveDeliveryStopToRoute(
        Number(routeMoveButton.dataset.deliveryMoveRoute),
        Number(routeMoveButton.dataset.deliveryTargetRoute)
      );
      return;
    }

    if (moveButton && !moveButton.disabled) {
      const sourceIndex = Number(moveButton.dataset.deliveryMoveStop);
      const targetIndex = getRouteNeighborStopIndex(sourceIndex, Number(moveButton.dataset.deliveryMoveDirection));

      if (targetIndex < 0) {
        return;
      }

      reorderDeliveryStop(
        sourceIndex,
        targetIndex,
        { scrollRoute: true }
      );
      return;
    }

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
  routeBlocksElement?.addEventListener("dragstart", (event) => {
    const routeStop = event.target.closest("[data-delivery-route-stop]");

    if (!routeStop) {
      return;
    }

    draggedDeliveryStopIndex = Number(routeStop.dataset.deliveryRouteStop);
    routeStop.classList.add("is-dragging");
    event.dataTransfer?.setData("text/plain", String(draggedDeliveryStopIndex));
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
    }
  });
  routeBlocksElement?.addEventListener("dragover", (event) => {
    const routeStop = event.target.closest("[data-delivery-route-stop]");

    if (!routeStop || draggedDeliveryStopIndex < 0) {
      return;
    }

    event.preventDefault();
    routeStop.classList.add("is-drop-target");
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  });
  routeBlocksElement?.addEventListener("dragleave", (event) => {
    event.target.closest("[data-delivery-route-stop]")?.classList.remove("is-drop-target");
  });
  routeBlocksElement?.addEventListener("drop", (event) => {
    const routeStop = event.target.closest("[data-delivery-route-stop]");

    if (!routeStop) {
      return;
    }

    event.preventDefault();
    const sourceIndex = Number(event.dataTransfer?.getData("text/plain") || draggedDeliveryStopIndex);
    const targetIndex = Number(routeStop.dataset.deliveryRouteStop);
    const targetRouteNumber = getStopRouteNumber(latestRouteStops[targetIndex]);
    document.querySelectorAll(".delivery-route-stop.is-drop-target, .delivery-route-stop.is-dragging").forEach((element) => {
      element.classList.remove("is-drop-target", "is-dragging");
    });
    reorderDeliveryStop(sourceIndex, targetIndex, { scrollRoute: true, targetRouteNumber });
  });
  routeBlocksElement?.addEventListener("dragend", () => {
    draggedDeliveryStopIndex = -1;
    document.querySelectorAll(".delivery-route-stop.is-drop-target, .delivery-route-stop.is-dragging").forEach((element) => {
      element.classList.remove("is-drop-target", "is-dragging");
    });
  });
  quickEditElement?.addEventListener("submit", (event) => {
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
  runStatusBarElement?.addEventListener("click", (event) => {
    const printButton = event.target.closest("[data-delivery-status-print]");

    if (!printButton || printButton.disabled) {
      return;
    }

    renderPrintPreview();
    openPrintPreviewSection();
  });
  stopDetailElement?.addEventListener("click", (event) => {
    const openProblemButton = event.target.closest("[data-delivery-open-problem]");
    const cancelProblemButton = event.target.closest("[data-delivery-cancel-problem]");
    const previousStopButton = event.target.closest("[data-delivery-driver-prev]");
    const nextStopButton = event.target.closest("[data-delivery-driver-next]");
    const statusActionButton = event.target.closest("[data-delivery-driver-status-action]");

    if (previousStopButton && !previousStopButton.disabled) {
      moveSelectedDeliveryStop(-1);
      return;
    }

    if (nextStopButton && !nextStopButton.disabled) {
      moveSelectedDeliveryStop(1);
      return;
    }

    if (statusActionButton && !statusActionButton.disabled) {
      applyDriverStatusAction(statusActionButton.dataset.deliveryDriverStatusAction);
      return;
    }

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
      openPrintPreviewSection();
    }
  });
  printPreviewButton?.addEventListener("click", renderPrintPreview);
})();
