(() => {
  function formatPlanningWeekPeriod(weekValue, options = {}) {
    const getWeekDates = typeof options.getWeekDates === "function"
      ? options.getWeekDates
      : (() => []);
    const weekDates = getWeekDates(weekValue);
    const startDate = weekDates[0];
    const endDate = weekDates[6];

    if (!startDate || !endDate) {
      return "";
    }

    const formatter = new Intl.DateTimeFormat("nl-NL", {
      day: "2-digit",
      month: "2-digit"
    });

    return `${formatter.format(new Date(startDate))} t/m ${formatter.format(new Date(endDate))}`;
  }

  function getPlanningOverviewStatus(weekValue, weekEntries, openCount, options = {}) {
    const getWeekReviewStatus = typeof options.getWeekReviewStatus === "function"
      ? options.getWeekReviewStatus
      : (() => "open");
    const getWeekPlanningStatus = typeof options.getWeekPlanningStatus === "function"
      ? options.getWeekPlanningStatus
      : (() => "open");
    const reviewStatus = getWeekReviewStatus(weekValue);
    const planningStatus = getWeekPlanningStatus(weekValue);

    if (reviewStatus === "locked") {
      return {
        key: "locked",
        label: "Vastgezet",
        className: "is-locked"
      };
    }

    if (reviewStatus === "in-review") {
      return {
        key: "reviewed",
        label: "Gecontroleerd",
        className: "is-reviewed"
      };
    }

    if (planningStatus === "planned" || weekEntries.length > 0 || openCount === 0) {
      return {
        key: "planned",
        label: "Ingepland",
        className: "is-planned"
      };
    }

    return {
      key: "open",
      label: "Open",
      className: "is-open"
    };
  }

  function formatEmployeeWeekLabel(weekValue, options = {}) {
    const getWeekDates = typeof options.getWeekDates === "function"
      ? options.getWeekDates
      : (() => []);
    const formatDate = typeof options.formatDate === "function"
      ? options.formatDate
      : ((value) => String(value || ""));
    const weekDates = getWeekDates(weekValue);

    if (!weekDates.length) {
      return "";
    }

    return `Week ${String(weekValue || "").replace("-W", " - ")} · ${formatDate(weekDates[0])} - ${formatDate(weekDates[weekDates.length - 1])}`;
  }

  function getDeviationReasonSummary(entry, options = {}) {
    const getShiftForEntry = typeof options.getShiftForEntry === "function"
      ? options.getShiftForEntry
      : (() => null);
    const getShiftName = typeof options.getShiftName === "function"
      ? options.getShiftName
      : ((value) => value?.shiftName || "");
    const getWeekValueFromDate = typeof options.getWeekValueFromDate === "function"
      ? options.getWeekValueFromDate
      : (() => "");
    const getEmployeePlanningPatternMatch = typeof options.getEmployeePlanningPatternMatch === "function"
      ? options.getEmployeePlanningPatternMatch
      : (() => ({ score: 0 }));
    const reasons = [];
    const shift = getShiftForEntry(entry) || {
      id: entry.shiftId || entry.shiftName || "",
      name: getShiftName(entry),
      startTime: entry.startTime,
      endTime: entry.endTime
    };
    const weekValue = getWeekValueFromDate(entry.day);
    const patternMatch = getEmployeePlanningPatternMatch(entry.name, shift, entry.day, weekValue);
    const autoReason = String(entry.autoFillReason || "");

    if (entry.replacementFor) {
      reasons.push("Vervanging nodig");
    }

    if (autoReason === "Afwijking voor contracturen" || autoReason === "Maandbalans contracturen" || autoReason === "Richting contracturen") {
      reasons.push("Contracturen halen");
    }

    if (autoReason === "Feestdagplanning") {
      reasons.push("Feestdagplanning");
    }

    if (autoReason === "Maandbalans zaterdag" || autoReason === "Eerlijke zaterdagverdeling") {
      reasons.push("Zaterdagverdeling eerlijk houden");
    }

    if (autoReason === "Geen betere optie beschikbaar") {
      reasons.push("Geen andere bevoegde medewerker beschikbaar");
    }

    if (patternMatch.score >= 55 && !reasons.includes("Vervanging nodig")) {
      reasons.push("Afwijking van vast patroon");
    }

    return [...new Set(reasons)];
  }

  function hasMeaningfulPlannerDeviation(entry, options = {}) {
    return getDeviationReasonSummary(entry, options).length > 0;
  }

  function getDeviationOnlyEntries(visibleEntries, weekDates, options = {}) {
    const hasMeaningfulPlannerDeviation = typeof options.hasMeaningfulPlannerDeviation === "function"
      ? options.hasMeaningfulPlannerDeviation
      : ((entry) => hasMeaningfulPlannerDeviation(entry, options));

    return visibleEntries.filter((entry) =>
      weekDates.includes(entry.day) && hasMeaningfulPlannerDeviation(entry)
    );
  }

  window.StroetPlanningStatusFeature = Object.freeze({
    formatEmployeeWeekLabel,
    formatPlanningWeekPeriod,
    getDeviationOnlyEntries,
    getDeviationReasonSummary,
    getPlanningOverviewStatus,
    hasMeaningfulPlannerDeviation
  });
})();
