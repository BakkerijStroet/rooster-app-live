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

    if (selectedStatus === "") {
      return true;
    }

    if (selectedStatus === "waiting") {
      return displayStatus === "waiting" || displayStatus === "overdue";
    }

    return displayStatus === selectedStatus;
  }

  function getRequestRosterEffectText(request, requestType, entries, helpers) {
    if (requestType === "timeoff") {
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
    const openTimeOffRequests = timeOffRequests.filter((request) => request.status === "open");

    return {
      free: openTimeOffRequests.filter((request) => request.type === "vrij").length,
      vacation: openTimeOffRequests.filter((request) => request.type === "vakantie").length,
      sick: openTimeOffRequests.filter((request) => request.type === "ziek").length,
      swaps: swapRequests.filter((request) => request.status === "open").length
    };
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

        return {
          type: "Verlofaanvraag",
          meta: `${helpers.getAbsenceTypeLabel(request.type)} · ${helpers.getTimeOffDisplayRange(request)}`,
          details: [
            request.reason ? `Reden: ${request.reason}` : "",
            request.managerNote ? `Opmerking: ${request.managerNote}` : "",
            createdText
          ].filter(Boolean),
          status: helpers.getRequestDisplayStatus(request),
          statusClass: getEmployeeRequestStatusClass(request),
          label: helpers.getRequestDisplayLabel(request),
          typeClass: `absence-${helpers.getAbsenceCardClass(request.type)}`,
          sortDate: request.updatedAt || request.createdAt || request.date || ""
        };
      }),
      ...visibleSwapRequests.filter((request) => !isDeletedRequest(request)).map((request) => {
        const createdText = getEmployeeRequestCreatedText(request, helpers);
        const targetText = request.targetEmployeeName
          ? `Naar: ${request.targetEmployeeName}`
          : "Open aangeboden";

        return {
          type: "Ruilverzoek",
          meta: `${helpers.formatDate(request.date)} · ${request.shiftName} · ${request.startTime} - ${request.endTime}`,
          details: [
            targetText,
            request.managerNote ? `Opmerking: ${request.managerNote}` : "",
            createdText
          ].filter(Boolean),
          status: helpers.getRequestDisplayStatus(request),
          statusClass: getEmployeeRequestStatusClass(request),
          label: helpers.getRequestDisplayLabel(request),
          typeClass: "",
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
      : `${helpers.getAbsenceTypeLabel(request.type)}${request.reason ? ` - ${request.reason}` : ""}`;
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
