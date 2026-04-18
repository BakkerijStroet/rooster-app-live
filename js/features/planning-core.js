(() => {
  function getPlanningEntrySlotKey(entry, options = {}) {
    const getShiftName = typeof options.getShiftName === "function"
      ? options.getShiftName
      : ((value) => value?.shiftName || value?.entryType || "");

    return [
      entry?.day || "",
      String(getShiftName(entry) || "").toLowerCase(),
      entry?.startTime || "",
      entry?.endTime || ""
    ].join("__");
  }

  function mergePlanningEntries(sourceEntries = [], fallbackEntries = [], options = {}) {
    const mergedEntries = new Map();

    (Array.isArray(fallbackEntries) ? fallbackEntries : []).forEach((entry) => {
      mergedEntries.set(getPlanningEntrySlotKey(entry, options), entry);
    });

    (Array.isArray(sourceEntries) ? sourceEntries : []).forEach((entry) => {
      mergedEntries.set(getPlanningEntrySlotKey(entry, options), entry);
    });

    return [...mergedEntries.values()];
  }

  function normalizeWeekReviewStatus(status) {
    if (status === "reviewed") {
      return "locked";
    }

    return ["open", "in-review", "locked"].includes(String(status || ""))
      ? String(status)
      : "open";
  }

  function normalizeWeekPlanningStatus(status) {
    return ["open", "planned"].includes(String(status || ""))
      ? String(status)
      : "open";
  }

  function collectWeekValuesFromDetails(details = {}, options = {}) {
    const getWeekValueFromDate = typeof options.getWeekValueFromDate === "function"
      ? options.getWeekValueFromDate
      : ((dateValue) => String(dateValue || ""));
    const weekValues = new Set();

    if (details.weekValue && /^\d{4}-W\d{2}$/.test(String(details.weekValue))) {
      weekValues.add(String(details.weekValue));
    }

    if (details.targetWeek && /^\d{4}-W\d{2}$/.test(String(details.targetWeek))) {
      weekValues.add(String(details.targetWeek));
    }

    if (details.sourceWeek && /^\d{4}-W\d{2}$/.test(String(details.sourceWeek))) {
      weekValues.add(String(details.sourceWeek));
    }

    [details.day, details.date].forEach((dateValue) => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(String(dateValue || ""))) {
        weekValues.add(getWeekValueFromDate(String(dateValue)));
      }
    });

    if (Array.isArray(details.dates)) {
      details.dates.forEach((dateValue) => {
        if (/^\d{4}-\d{2}-\d{2}$/.test(String(dateValue || ""))) {
          weekValues.add(getWeekValueFromDate(String(dateValue)));
        }
      });
    }

    return [...weekValues].filter(Boolean);
  }

  function formatWeekLabel(weekValue) {
    return String(weekValue || "").replace("-W", " week ");
  }

  function getWeekYear(weekValue) {
    return Number(String(weekValue || "").split("-W")[0]) || new Date().getFullYear();
  }

  function getIsoWeekCountForYear(year, options = {}) {
    const getWeekValueFromDate = typeof options.getWeekValueFromDate === "function"
      ? options.getWeekValueFromDate
      : ((dateValue) => String(dateValue || ""));
    const referenceDate = `${year}-12-28`;
    return Number(getWeekValueFromDate(referenceDate).split("-W")[1]) || 52;
  }

  function getWeekDistanceFromReference(entryWeekValue, referenceWeekValue, options = {}) {
    const getDateFromWeekValue = typeof options.getDateFromWeekValue === "function"
      ? options.getDateFromWeekValue
      : (() => new Date(NaN));

    if (!entryWeekValue || !referenceWeekValue) {
      return Number.MAX_SAFE_INTEGER;
    }

    const entryDate = getDateFromWeekValue(entryWeekValue);
    const referenceDate = getDateFromWeekValue(referenceWeekValue);
    return Math.round((referenceDate - entryDate) / (7 * 24 * 60 * 60 * 1000));
  }

  function getWeekReviewStatusMeta(status) {
    const normalizedStatus = normalizeWeekReviewStatus(status);

    switch (normalizedStatus) {
      case "locked":
        return {
          label: "Vastgezet",
          detail: "Deze week is gecontroleerd en vastgezet.",
          className: "is-locked"
        };
      case "in-review":
        return {
          label: "In controle",
          detail: "Deze week heeft recente plannerwijzigingen.",
          className: "is-in-review"
        };
      default:
        return {
          label: "Open",
          detail: "Deze week is nog niet afgerond.",
          className: "is-open"
        };
    }
  }

  window.StroetPlanningCoreFeature = Object.freeze({
    collectWeekValuesFromDetails,
    formatWeekLabel,
    getPlanningEntrySlotKey,
    getIsoWeekCountForYear,
    getWeekDistanceFromReference,
    getWeekReviewStatusMeta,
    getWeekYear,
    mergePlanningEntries,
    normalizeWeekPlanningStatus,
    normalizeWeekReviewStatus
  });
})();
