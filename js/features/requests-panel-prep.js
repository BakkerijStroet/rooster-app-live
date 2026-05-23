(function attachRequestsPanelPrepFeature(globalScope) {
  function getVisibleRequestSources(isPlannerRoleValue, currentEmployee, timeOffRequests, swapRequests) {
    return {
      visibleTimeOffRequests: isPlannerRoleValue
        ? timeOffRequests
        : timeOffRequests.filter((request) => request.employeeName === currentEmployee),
      visibleSwapRequests: isPlannerRoleValue
        ? swapRequests
        : swapRequests.filter((request) => request.employeeName === currentEmployee)
    };
  }

  function matchesRequestStatusFilter(selectedStatus, request, getRequestDisplayStatus) {
    const displayStatus = getRequestDisplayStatus(request);
    const requestStatus = normalizeRequestStatus(request?.status);

    if (selectedStatus === "") {
      return true;
    }

    if (selectedStatus === "open") {
      return requestStatus === "open";
    }

    if (selectedStatus === "waiting") {
      return requestStatus === "open" && (displayStatus === "waiting" || displayStatus === "overdue");
    }

    return requestStatus === selectedStatus;
  }

  function normalizeRequestStatus(status) {
    const normalizedStatus = String(status || "").trim().toLowerCase();

    if (["pending", "submitted", "ingediend"].includes(normalizedStatus)) {
      return "open";
    }

    if (["goedgekeurd"].includes(normalizedStatus)) {
      return "approved";
    }

    if (["afgekeurd"].includes(normalizedStatus)) {
      return "rejected";
    }

    return normalizedStatus || "open";
  }

  function normalizeTimeOffRequestType(type) {
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

  function getRequestRosterEffectText(request, requestType, entries, helpers) {
    if (requestType === "timeoff") {
      if (isExtraAvailabilityRequest(request)) {
        if (request.status === "approved") {
          return "Goedgekeurd als extra beschikbaarheid voor voorstellen.";
        }

        if (request.status === "open") {
          return "Na goedkeuring telt dit als extra beschikbaarheid in de slimme planner.";
        }

        return "Niet actief in de planning.";
      }

      const startDate = helpers.getTimeOffStartDate(request);
      const endDate = helpers.getTimeOffEndDate(request);
      const affectedEntries = entries.filter((entry) =>
        entry.name === request.employeeName &&
        entry.day >= startDate &&
        entry.day <= endDate
      );

      if (request.status === "approved") {
        return affectedEntries.length > 0
          ? `${affectedEntries.length} dienst(en) in deze periode vragen nu aandacht in het rooster.`
          : "Goedgekeurd en zichtbaar als afwezig in het rooster.";
      }

      if (request.status === "open") {
        return affectedEntries.length > 0
          ? `Na goedkeuring gekoppeld aan ${affectedEntries.length} roosterdienst(en).`
          : "Na goedkeuring direct zichtbaar in het rooster.";
      }

      return "Niet gekoppeld aan het rooster.";
    }

    if (requestType === "swap") {
      if (request.status === "approved") {
        return request.autoApproved
          ? "Automatisch goedgekeurd en direct verwerkt in het rooster."
          : "Goedgekeurd en direct verwerkt in het rooster.";
      }

      if (request.status === "open") {
        return request.targetEmployeeName
          ? "Deze ruil wacht nog op beoordeling."
          : "Na goedkeuring wordt deze dienst open aangeboden.";
      }

      return "Nog niet verwerkt in het rooster.";
    }

    return "";
  }

  function getPlannerRequestSummaryCounts(timeOffRequests, swapRequests) {
    const openTimeOffRequests = timeOffRequests.filter((request) => normalizeRequestStatus(request?.status) === "open");
    const openRegularTimeOffRequests = openTimeOffRequests.filter((request) => !isAvailabilityRequest(request));

    return {
      free: openRegularTimeOffRequests.filter((request) => normalizeTimeOffRequestType(request?.type) === "vrij").length,
      vacation: openRegularTimeOffRequests.filter((request) => normalizeTimeOffRequestType(request?.type) === "vakantie").length,
      sick: openRegularTimeOffRequests.filter((request) => normalizeTimeOffRequestType(request?.type) === "ziek").length,
      availability: openTimeOffRequests.filter((request) => isAvailabilityRequest(request)).length,
      swaps: swapRequests.filter((request) => normalizeRequestStatus(request?.status) === "open").length
    };
  }

  function isExtraAvailabilityRequest(request = {}) {
    const normalizedType = normalizeTimeOffRequestType(request?.availabilityType || request?.type || "");

    return request?.availabilityKind === "extra" ||
      ["extra_beschikbaar", "extra_vakantiewerk", "extra_zaterdag_beschikbaar"].includes(normalizedType);
  }

  function isAvailabilityRequest(request = {}) {
    const normalizedType = normalizeTimeOffRequestType(request?.availabilityType || request?.type || "");

    return request?.requestCategory === "availability" ||
      request?.availabilityKind === "extra" ||
      request?.availabilityKind === "unavailable" ||
      ["examens", "studiedag", "school", "weekend_weg", "tijdelijk_niet_beschikbaar", "extra_beschikbaar", "extra_vakantiewerk", "extra_zaterdag_beschikbaar"].includes(normalizedType);
  }

  function getAvailabilityWeekdayListLabel(request = {}) {
    const weekdays = [...new Set((Array.isArray(request.availabilityWeekdays || request.weekdays) ? (request.availabilityWeekdays || request.weekdays) : [])
      .map((weekday) => Number(weekday))
      .filter((weekday) => Number.isInteger(weekday) && weekday >= 1 && weekday <= 6))]
      .sort((a, b) => a - b);

    return weekdays
      .map((weekday) => ({
        1: "maandag",
        2: "dinsdag",
        3: "woensdag",
        4: "donderdag",
        5: "vrijdag",
        6: "zaterdag"
      })[weekday])
      .filter(Boolean)
      .join(", ");
  }

  function getAvailabilityRequestHelperText(request = {}) {
    if (!isAvailabilityRequest(request)) {
      return "";
    }

    return isExtraAvailabilityRequest(request)
      ? "Deze medewerker heeft aangegeven extra beschikbaar te zijn in deze periode. Dit is een scoreboost, geen afwezigheid."
      : "Deze medewerker heeft aangegeven niet beschikbaar te zijn in deze periode.";
  }

  function getAvailabilityRequestDetailText(request = {}, helpers = {}) {
    if (!isAvailabilityRequest(request)) {
      return "";
    }

    const weekdayText = isExtraAvailabilityRequest(request) ? getAvailabilityWeekdayListLabel(request) : "";
    const parts = [
      helpers.getAbsenceTypeLabel ? helpers.getAbsenceTypeLabel(request.type) : request.type,
      helpers.getTimeOffDisplayRange ? helpers.getTimeOffDisplayRange(request) : "",
      weekdayText ? `Dagen: ${weekdayText}` : "",
      request.reason ? `Opmerking: ${request.reason}` : ""
    ].filter(Boolean);

    return parts.join(" · ");
  }

  function isDeletedRequest(request) {
    return Boolean(request?.deletedAt || request?.deleted_at);
  }

  function getEmployeeRequestStatusClass(request) {
    if (request?.status === "approved") {
      return "approved";
    }

    if (request?.status === "rejected") {
      return "rejected";
    }

    return "open";
  }

  function getEmployeeRequestCreatedText(request, helpers) {
    if (!request?.createdAt || typeof helpers.formatDateTime !== "function") {
      return "";
    }

    try {
      return `Aangevraagd: ${helpers.formatDateTime(request.createdAt)}`;
    } catch {
      return "";
    }
  }

  function buildEmployeeRequestCards({ visibleTimeOffRequests, visibleSwapRequests, helpers }) {
    return [
      ...visibleTimeOffRequests.filter((request) => !isDeletedRequest(request)).map((request) => {
        const createdText = getEmployeeRequestCreatedText(request, helpers);
        const mailStatusText = typeof helpers.getTimeOffMailStatusText === "function"
          ? helpers.getTimeOffMailStatusText(request)
          : "";
        const mailStatusHtml = typeof helpers.renderRequestMailStatus === "function"
          ? helpers.renderRequestMailStatus(request, helpers.getTimeOffMailStatusText)
          : (mailStatusText ? `Mail: ${mailStatusText}` : "");

        const availabilityDetail = getAvailabilityRequestDetailText(request, helpers);
        const availabilityHelper = getAvailabilityRequestHelperText(request);

        return {
          type: isExtraAvailabilityRequest(request) ? "Extra beschikbaar" : helpers.getAbsenceTypeLabel(request.type),
          meta: availabilityDetail || `${helpers.getAbsenceTypeLabel(request.type)} · ${helpers.getTimeOffDisplayRange(request)}`,
          details: [
            availabilityHelper,
            request.reason && !availabilityDetail ? `Reden: ${request.reason}` : "",
            request.managerNote ? `Opmerking: ${request.managerNote}` : "",
            mailStatusHtml,
            createdText
          ].filter(Boolean),
          status: helpers.getRequestDisplayStatus(request),
          statusClass: getEmployeeRequestStatusClass(request),
          label: helpers.getRequestDisplayLabel(request),
          typeClass: `absence-${helpers.getAbsenceCardClass(request.type)}`,
          requestType: "timeoff",
          requestId: request.id,
          canWithdraw: request.status === "open",
          sortDate: request.updatedAt || request.createdAt || request.date || ""
        };
      }),
      ...visibleSwapRequests.filter((request) => !isDeletedRequest(request)).map((request) => {
        const createdText = getEmployeeRequestCreatedText(request, helpers);
        const mailStatusText = typeof helpers.getSwapMailStatusText === "function"
          ? helpers.getSwapMailStatusText(request)
          : "";
        const mailStatusHtml = typeof helpers.renderRequestMailStatus === "function"
          ? helpers.renderRequestMailStatus(request, helpers.getSwapMailStatusText)
          : (mailStatusText ? `Mail: ${mailStatusText}` : "");
        const targetText = request.targetEmployeeName
          ? `Naar: ${request.targetEmployeeName}`
          : "Open aangeboden";

        return {
          type: "Ruilverzoek",
          meta: `${helpers.formatDate(request.date)} · ${request.shiftName} · ${request.startTime} - ${request.endTime}`,
          details: [
            targetText,
            request.managerNote ? `Opmerking: ${request.managerNote}` : "",
            mailStatusHtml,
            createdText
          ].filter(Boolean),
          status: helpers.getRequestDisplayStatus(request),
          statusClass: getEmployeeRequestStatusClass(request),
          label: helpers.getRequestDisplayLabel(request),
          typeClass: "",
          requestType: "swap",
          requestId: request.id,
          canWithdraw: request.status === "open",
          sortDate: request.updatedAt || request.createdAt || request.date || ""
        };
      })
    ].sort((cardA, cardB) => {
      const priorityMap = { overdue: 0, waiting: 1, open: 2, approved: 3, rejected: 4 };
      const priorityDifference = (priorityMap[cardA.status] ?? 9) - (priorityMap[cardB.status] ?? 9);
      if (priorityDifference !== 0) {
        return priorityDifference;
      }
      return cardB.sortDate.localeCompare(cardA.sortDate, "nl");
    });
  }

  function buildPlannerRequestCardViewModel({ request, requestType, helpers }) {
    const requestStatus = helpers.getRequestDisplayStatus(request);
    const statusLabel = helpers.getRequestDisplayLabel(request);
    const periodText = requestType === "swap"
      ? helpers.formatDate(request.date)
      : helpers.getTimeOffDisplayRange(request);
    const detailText = requestType === "swap"
      ? `${request.shiftName} - ${request.startTime} - ${request.endTime}`
      : (getAvailabilityRequestDetailText(request, helpers) || `${helpers.getAbsenceTypeLabel(request.type)}${request.reason ? ` - ${request.reason}` : ""}`);
    const attentionText = request.status === "open" ? helpers.getRequestAttentionText(request) : "";
    const plannerNoteText = request.managerNote || "";
    const swapExtraText = requestType === "swap" && request.targetEmployeeName
      ? `Voorgestelde collega: ${request.targetEmployeeName}`
      : (requestType === "swap" && request.escalatedToPlanner
        ? "Directie is gevraagd om mee te kijken."
        : "");

    return {
      requestStatus,
      statusLabel,
      periodText,
      detailText,
      attentionText,
      plannerNoteText,
      swapExtraText,
      rosterEffectText: requestType === "swap" ? helpers.getRequestRosterEffectText(request, "swap") : ""
    };
  }

  globalScope.StroetRequestsPanelPrepFeature = Object.freeze({
    getVisibleRequestSources,
    matchesRequestStatusFilter,
    getRequestRosterEffectText,
    getPlannerRequestSummaryCounts,
    buildEmployeeRequestCards,
    buildPlannerRequestCardViewModel
  });
})(window);
