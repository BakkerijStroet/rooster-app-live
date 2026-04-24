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

  function getAbsenceTypeLabel(type) {
    if (type === "vakantie") {
      return "Vakantie";
    }

    if (type === "ziek") {
      return "Ziek";
    }

    return "Vrij";
  }

  function getAbsenceCardClass(type) {
    if (type === "vakantie") {
      return "vacation";
    }

    if (type === "ziek") {
      return "sick";
    }

    return "free";
  }

  function getApprovedAbsenceLabel(request) {
    if (!request) {
      return "";
    }

    return `${getAbsenceTypeLabel(request.type)} goedgekeurd`;
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
      : (typeof request.date === "string" ? request.date : "");
  }

  function getTimeOffEndDate(request) {
    if (!request) {
      return "";
    }

    if (request.type === "vakantie") {
      return typeof request.endDate === "string" && request.endDate
        ? request.endDate
        : getTimeOffStartDate(request);
    }

    return getTimeOffStartDate(request);
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

    if (request?.type === "vakantie" && endDate && endDate !== startDate) {
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
