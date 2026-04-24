(function attachRenderHelpersFeature(globalScope) {
  function getEmployeeContractTypeLabel(getEmployeeContractHours, formatHours, employeeName) {
    const contractHours = getEmployeeContractHours(employeeName);
    return contractHours > 0
      ? `Vast contract ${formatHours(contractHours)}`
      : "0-uren contract";
  }

  function getPlannerSectionLabel(sectionKey) {
    if (sectionKey === "allround") {
      return "Allround";
    }

    if (sectionKey === "shop") {
      return "Winkel";
    }

    if (sectionKey === "optional") {
      return "Stage";
    }

    return "Bakkerij";
  }

  function getMonthLabel(monthValue) {
    const [year, month] = String(monthValue || "").split("-");

    if (!year || !month) {
      return "";
    }

    const date = new Date(Number(year), Number(month) - 1, 1);
    return date.toLocaleDateString("nl-NL", {
      month: "long",
      year: "numeric"
    });
  }

  function getRosterDaypartLabel(daypart) {
    const labels = {
      morning: "ochtend",
      afternoon: "middag",
      full: "hele dag"
    };

    return labels[daypart] || "vrij";
  }

  function getShiftSummaryLabel(formatWeekday, shiftName, dateValue, startTime, endTime, employeeName = "") {
    const employeePart = employeeName ? ` - ${employeeName}` : "";
    return `${formatWeekday(dateValue)}: ${shiftName}${employeePart} (${startTime} - ${endTime})`;
  }

  function getShiftContextLabel(getShiftName, entry) {
    const shiftName = getShiftName(entry).toLowerCase();

    if (shiftName.includes("winkel")) {
      return "Werkplek: Winkel";
    }

    if (shiftName.includes("bezorg")) {
      return "Werkplek: Bezorging";
    }

    if (shiftName.includes("banket")) {
      return "Soort: Banket";
    }

    if (shiftName.includes("oven")) {
      return "Soort: Ovendienst";
    }

    if (shiftName.includes("draai")) {
      return "Soort: Draaidienst";
    }

    if (shiftName.includes("brood")) {
      return "Soort: Brooddienst";
    }

    if (shiftName.includes("productie")) {
      return "Soort: Productiedienst";
    }

    if (shiftName.includes("allround")) {
      return "Soort: Allrounddienst";
    }

    if (shiftName.includes("inpak")) {
      return "Soort: Inpakdienst";
    }

    return "Werkplek: Bakkerij";
  }

  globalScope.StroetRenderHelpersFeature = Object.freeze({
    getEmployeeContractTypeLabel,
    getPlannerSectionLabel,
    getMonthLabel,
    getRosterDaypartLabel,
    getShiftSummaryLabel,
    getShiftContextLabel
  });
})(window);
