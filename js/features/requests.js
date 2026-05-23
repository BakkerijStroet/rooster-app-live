(function attachRequestsFeature(global) {
  const formatUtils = global.StroetFormatUtils || {};
  const formatDate = formatUtils.formatDate || function fallbackFormatDate(value) {
    return new Intl.DateTimeFormat("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(new Date(value));
  };

  function createRequestId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  }

  function normalizeTimeOffRequestType(type = "") {
    const normalizedType = String(type || "").trim().toLowerCase();

    if (["ziek", "ziekte", "sick", "sickness", "ziekmelding", "operatie", "operation", "herstel", "herstelperiode", "recovery"].includes(normalizedType)) {
      return "ziek";
    }

    if (["vakantie", "vacation", "verlof"].includes(normalizedType)) {
      return "vakantie";
    }

    if (["examens", "examen", "exams"].includes(normalizedType)) {
      return "examens";
    }

    if (["studiedag", "studiedagen", "study_day", "study-day"].includes(normalizedType)) {
      return "studiedag";
    }

    if (["school", "schooldag", "school_day", "school-day"].includes(normalizedType)) {
      return "school";
    }

    if (["weekend_weg", "weekend-weg", "weekend weg"].includes(normalizedType)) {
      return "weekend_weg";
    }

    if (["tijdelijk_niet_beschikbaar", "tijdelijk-niet-beschikbaar", "tijdelijk niet beschikbaar", "niet_beschikbaar", "not_available"].includes(normalizedType)) {
      return "tijdelijk_niet_beschikbaar";
    }

    if (["extra_beschikbaar", "extra-beschikbaar", "extra beschikbaar", "available_extra"].includes(normalizedType)) {
      return "extra_beschikbaar";
    }

    if (["extra_vakantiewerk", "extra-vakantiewerk", "extra vakantiewerk"].includes(normalizedType)) {
      return "extra_vakantiewerk";
    }

    if (["extra_zaterdag_beschikbaar", "extra-zaterdag-beschikbaar", "extra zaterdag beschikbaar"].includes(normalizedType)) {
      return "extra_zaterdag_beschikbaar";
    }

    if (["vrij", "vrije-dag", "vrije_dag", "vrije dag", "vrije dagen", "free", "timeoff", "time_off"].includes(normalizedType)) {
      return "vrij";
    }

    return normalizedType;
  }

  function getAbsenceTypeLabel(type) {
    const normalizedType = normalizeTimeOffRequestType(type);

    if (normalizedType === "vakantie") {
      return "Vakantie";
    }

    if (normalizedType === "ziek") {
      return "Ziek";
    }

    const availabilityLabels = {
      examens: "Examens",
      studiedag: "Studiedag",
      school: "School",
      weekend_weg: "Weekend weg",
      tijdelijk_niet_beschikbaar: "Tijdelijk niet beschikbaar",
      extra_beschikbaar: "Extra beschikbaar",
      extra_vakantiewerk: "Extra vakantiewerk",
      extra_zaterdag_beschikbaar: "Extra zaterdag beschikbaar"
    };

    if (availabilityLabels[normalizedType]) {
      return availabilityLabels[normalizedType];
    }

    return "Vrij";
  }

  function getAbsenceCardClass(type) {
    const normalizedType = normalizeTimeOffRequestType(type);

    if (normalizedType === "vakantie") {
      return "vacation";
    }

    if (normalizedType === "ziek") {
      return "sick";
    }

    if (["extra_beschikbaar", "extra_vakantiewerk", "extra_zaterdag_beschikbaar"].includes(normalizedType)) {
      return "availability-extra";
    }

    if (["examens", "studiedag", "school", "weekend_weg", "tijdelijk_niet_beschikbaar"].includes(normalizedType)) {
      return "availability-unavailable";
    }

    return "free";
  }

  function getRosterAbsenceTypeLabel(type) {
    const normalizedType = normalizeTimeOffRequestType(type);

    if (normalizedType === "vakantie") {
      return "vakantie";
    }

    if (normalizedType === "ziek") {
      return "ziek";
    }

    const availabilityLabels = {
      examens: "examens",
      studiedag: "studiedag",
      school: "school",
      weekend_weg: "weekend weg",
      tijdelijk_niet_beschikbaar: "niet beschikbaar",
      extra_beschikbaar: "extra beschikbaar",
      extra_vakantiewerk: "extra vakantiewerk",
      extra_zaterdag_beschikbaar: "extra zaterdag beschikbaar"
    };

    if (availabilityLabels[normalizedType]) {
      return availabilityLabels[normalizedType];
    }

    return "vrije dag";
  }

  function getRosterAbsenceLabel(request, options = {}) {
    if (!request) {
      return "";
    }

    const { includeEmployeeName = true } = options;
    const typeLabel = getRosterAbsenceTypeLabel(request.type);

    return includeEmployeeName && request.employeeName
      ? `${request.employeeName} ${typeLabel}`
      : typeLabel;
  }

  function getApprovedAbsenceLabel(request) {
    if (!request) {
      return "";
    }

    return getRosterAbsenceTypeLabel(request.type);
  }

  function getApprovedAbsenceDetail(request) {
    if (!request) {
      return "";
    }

    return `${getAbsenceTypeLabel(request.type).toLowerCase()}${request.reason ? `: ${request.reason}` : ""}`;
  }

  function getTimeOffStartDate(request) {
    if (!request) {
      return "";
    }

    return typeof request.startDate === "string" && request.startDate
      ? request.startDate
      : (typeof request.date === "string" && request.date
        ? request.date
        : (typeof request.day === "string" && request.day
          ? request.day
          : (typeof request.from === "string" ? request.from : "")));
  }

  function getTimeOffEndDate(request) {
    if (!request) {
      return "";
    }

    return typeof request.endDate === "string" && request.endDate
      ? request.endDate
      : (typeof request.to === "string" && request.to
        ? request.to
        : (typeof request.until === "string" && request.until
          ? request.until
          : getTimeOffStartDate(request)));
  }

  function requestIncludesDate(request, date) {
    const startDate = getTimeOffStartDate(request);
    const endDate = getTimeOffEndDate(request);

    if (!startDate || !endDate || !date) {
      return false;
    }

    return date >= startDate && date <= endDate;
  }

  function requestOverlapsRange(request, startDate, endDate) {
    const requestStartDate = getTimeOffStartDate(request);
    const requestEndDate = getTimeOffEndDate(request);

    if (!requestStartDate || !requestEndDate || !startDate || !endDate) {
      return false;
    }

    return requestStartDate <= endDate && requestEndDate >= startDate;
  }

  function getTimeOffDisplayRange(request) {
    const startDate = getTimeOffStartDate(request);
    const endDate = getTimeOffEndDate(request);

    if (!startDate) {
      return "";
    }

    if (endDate && endDate !== startDate) {
      return `${formatDate(startDate)} t/m ${formatDate(endDate)}`;
    }

    return formatDate(startDate);
  }

  function getRequestStatusLabel(status) {
    if (status === "approved") {
      return "Goedgekeurd";
    }

    if (status === "rejected") {
      return "Afgewezen";
    }

    if (status === "in-review") {
      return "In behandeling";
    }

    if (status === "waiting" || status === "overdue") {
      return "Wacht op reactie";
    }

    return "Open";
  }

  function getRequestLastChangeIso(request) {
    if (!request || typeof request !== "object") {
      return "";
    }

    if (typeof request.updatedAt === "string" && request.updatedAt) {
      return request.updatedAt;
    }

    if (typeof request.createdAt === "string" && request.createdAt) {
      return request.createdAt;
    }

    return "";
  }

  function getRequestAgeHours(request) {
    const lastChangeIso = getRequestLastChangeIso(request);

    if (!lastChangeIso) {
      return 0;
    }

    const lastChangeTime = Date.parse(lastChangeIso);

    if (!Number.isFinite(lastChangeTime)) {
      return 0;
    }

    return Math.max(0, (Date.now() - lastChangeTime) / 3600000);
  }

  function getRequestDisplayStatus(request) {
    if (!request) {
      return "open";
    }

    if (request.status !== "open") {
      return request.status;
    }

    const ageHours = getRequestAgeHours(request);

    if (ageHours >= 48) {
      return "overdue";
    }

    if (ageHours >= 24) {
      return "waiting";
    }

    return "open";
  }

  function getRequestDisplayLabel(request) {
    const displayStatus = getRequestDisplayStatus(request);

    if (request?.shiftName) {
      if (request.status === "approved") {
        return request.autoApproved ? "Automatisch goedgekeurd" : "Geaccepteerd";
      }

      if (request.status === "rejected") {
        return "Afgewezen";
      }

      if (request.status === "open") {
        return "Wacht op beoordeling";
      }
    }

    return getRequestStatusLabel(displayStatus);
  }

  function getRequestAttentionText(request) {
    const displayStatus = getRequestDisplayStatus(request);

    if (request?.shiftName && request.status === "open" && !request.targetEmployeeName) {
      if (displayStatus === "waiting") {
        return "Geen reactie op dit open ruilverzoek. Directie kan nu handmatig ingrijpen.";
      }

      if (displayStatus === "overdue") {
        return "Geen reactie op dit ruilverzoek. Kies een vervanger of sluit het verzoek af.";
      }
    }

    if (displayStatus === "waiting") {
      return "Deze aanvraag wacht al langer dan 24 uur op reactie.";
    }

    if (displayStatus === "overdue") {
      return "Deze aanvraag staat al langer dan 48 uur open en vraagt nu extra aandacht.";
    }

    return "";
  }

  global.StroetRequestsFeature = Object.freeze({
    createRequestId,
    getAbsenceTypeLabel,
    getAbsenceCardClass,
    getRosterAbsenceTypeLabel,
    getRosterAbsenceLabel,
    getApprovedAbsenceLabel,
    getApprovedAbsenceDetail,
    getTimeOffStartDate,
    getTimeOffEndDate,
    requestIncludesDate,
    requestOverlapsRange,
    getTimeOffDisplayRange,
    getRequestStatusLabel,
    getRequestLastChangeIso,
    getRequestAgeHours,
    getRequestDisplayStatus,
    getRequestDisplayLabel,
    getRequestAttentionText
  });
})(window);
