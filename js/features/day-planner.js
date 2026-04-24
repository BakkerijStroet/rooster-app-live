(() => {
  function isClosedPlannerDay(dateValue, options = {}) {
    const getRecognizedSpecialDayInfo = typeof options.getRecognizedSpecialDayInfo === "function"
      ? options.getRecognizedSpecialDayInfo
      : (() => null);

    return Boolean(getRecognizedSpecialDayInfo(dateValue)?.isClosed);
  }

  function getDayPlannerShifts(dateValue, options = {}) {
    const isClosed = typeof options.isClosedPlannerDay === "function"
      ? options.isClosedPlannerDay
      : ((value) => isClosedPlannerDay(value, options));
    const shifts = Array.isArray(options.shifts) ? options.shifts : [];
    const getDateSpecificShifts = typeof options.getDateSpecificShifts === "function"
      ? options.getDateSpecificShifts
      : (() => []);

    if (!dateValue) {
      return [];
    }

    if (isClosed(dateValue)) {
      return [];
    }

    return [
      ...shifts,
      ...getDateSpecificShifts(dateValue)
    ].sort((shiftA, shiftB) => shiftA.startTime.localeCompare(shiftB.startTime) || shiftA.name.localeCompare(shiftB.name, "nl"));
  }

  function getEntryForShiftOnDate(dateValue, shift, sourceEntries = [], options = {}) {
    const getShiftName = typeof options.getShiftName === "function"
      ? options.getShiftName
      : ((entry) => entry?.shiftName || "");

    return (Array.isArray(sourceEntries) ? sourceEntries : []).find((entry) =>
      entry.day === dateValue &&
      getShiftName(entry).toLowerCase() === String(shift?.name || "").toLowerCase()
    ) || null;
  }

  function getRequiredDayPlannerShifts(dateValue, options = {}) {
    const getDayPlannerShiftsFn = typeof options.getDayPlannerShifts === "function"
      ? options.getDayPlannerShifts
      : ((value) => getDayPlannerShifts(value, options));
    const isOptionalShift = typeof options.isOptionalShift === "function"
      ? options.isOptionalShift
      : (() => false);

    return getDayPlannerShiftsFn(dateValue).filter((shift) => !isOptionalShift(shift));
  }

  function getDayPlanningMessage(day, options = {}) {
    const getRecognizedSpecialDayInfo = typeof options.getRecognizedSpecialDayInfo === "function"
      ? options.getRecognizedSpecialDayInfo
      : (() => null);
    const getRequiredDayPlannerShiftsFn = typeof options.getRequiredDayPlannerShifts === "function"
      ? options.getRequiredDayPlannerShifts
      : ((value) => getRequiredDayPlannerShifts(value, options));
    const getEntryForShiftOnDateFn = typeof options.getEntryForShiftOnDate === "function"
      ? options.getEntryForShiftOnDate
      : ((dateValue, shift, sourceEntries) => getEntryForShiftOnDate(dateValue, shift, sourceEntries, options));
    const getSuitableEmployeesForShift = typeof options.getSuitableEmployeesForShift === "function"
      ? options.getSuitableEmployeesForShift
      : (() => []);
    const sourceEntries = Array.isArray(options.sourceEntries) ? options.sourceEntries : [];

    const specialDay = getRecognizedSpecialDayInfo(day);
    const plannerShifts = getRequiredDayPlannerShiftsFn(day);

    if (!plannerShifts.length) {
      return {
        text: specialDay?.isClosed ? `Gesloten - ${specialDay.nameLabel}` : "Winkel gesloten",
        type: "closed"
      };
    }

    const openShifts = plannerShifts.filter((shift) => !getEntryForShiftOnDateFn(day, shift, sourceEntries));

    if (!openShifts.length) {
      return {
        text: "Planning compleet",
        type: "full"
      };
    }

    const hasNoSuitableEmployee = openShifts.some((shift) =>
      getSuitableEmployeesForShift(shift, day, shift.startTime, shift.endTime, null).length === 0
    );

    if (hasNoSuitableEmployee) {
      return {
        text: "Geen geschikte medewerker",
        type: "warning"
      };
    }

    return {
      text: "Nog niet ingevuld",
      type: "info"
    };
  }

  window.StroetDayPlannerFeature = Object.freeze({
    getDayPlannerShifts,
    getDayPlanningMessage,
    getEntryForShiftOnDate,
    getRequiredDayPlannerShifts,
    isClosedPlannerDay
  });
})();
