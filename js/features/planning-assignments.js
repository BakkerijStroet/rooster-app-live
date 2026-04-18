(() => {
  function findConflictInSource(sourceEntries, name, day, startTime, endTime, options = {}) {
    const timeToMinutes = typeof options.timeToMinutes === "function"
      ? options.timeToMinutes
      : (() => 0);
    const newStart = timeToMinutes(startTime);
    const newEnd = timeToMinutes(endTime);

    return (Array.isArray(sourceEntries) ? sourceEntries : []).find((entry) => {
      if (entry.name !== name || entry.day !== day) {
        return false;
      }

      const existingStart = timeToMinutes(entry.startTime);
      const existingEnd = timeToMinutes(entry.endTime);
      return newStart < existingEnd && newEnd > existingStart;
    }) || null;
  }

  function getSuitableEmployeesForShift(shift, day, startTime, endTime, ignoredIndex = null, options = {}) {
    const getActiveEmployees = typeof options.getActiveEmployees === "function"
      ? options.getActiveEmployees
      : (() => []);
    const isEmployeeAuthorizedForShift = typeof options.isEmployeeAuthorizedForShift === "function"
      ? options.isEmployeeAuthorizedForShift
      : (() => true);
    const isEmployeeAvailableForShift = typeof options.isEmployeeAvailableForShift === "function"
      ? options.isEmployeeAvailableForShift
      : (() => true);

    if (!shift) {
      return getActiveEmployees();
    }

    return getActiveEmployees().filter((employeeName) =>
      isEmployeeAuthorizedForShift(employeeName, shift.name) &&
      isEmployeeAvailableForShift(
        employeeName,
        day,
        shift.startTime || startTime,
        shift.endTime || endTime,
        ignoredIndex
      )
    );
  }

  function canEmployeeBeAutoAssigned(employeeName, shift, day, sourceEntries, options = {}) {
    const {
      enforceSingleShiftPerDay = true,
      isEmployeeAuthorizedForShift = () => true,
      getApprovedTimeOff = () => null,
      hasEmployeeAssignmentOnDay = () => false,
      findConflictInSource = () => null
    } = options;

    if (!isEmployeeAuthorizedForShift(employeeName, shift.name)) {
      return false;
    }

    if (getApprovedTimeOff(employeeName, day)) {
      return false;
    }

    if (enforceSingleShiftPerDay && hasEmployeeAssignmentOnDay(employeeName, day, sourceEntries, shift.name)) {
      return false;
    }

    return !findConflictInSource(sourceEntries, employeeName, day, shift.startTime, shift.endTime);
  }

  function getStandardShiftCoverageInfo(shift, day, sourceEntries = [], options = {}) {
    const isBakeryCoreShift = typeof options.isBakeryCoreShift === "function"
      ? options.isBakeryCoreShift
      : (() => false);
    const getPrimaryStandardEmployeeForShift = typeof options.getPrimaryStandardEmployeeForShift === "function"
      ? options.getPrimaryStandardEmployeeForShift
      : (() => "");
    const getApprovedTimeOff = typeof options.getApprovedTimeOff === "function"
      ? options.getApprovedTimeOff
      : (() => null);
    const getAbsenceTypeLabel = typeof options.getAbsenceTypeLabel === "function"
      ? options.getAbsenceTypeLabel
      : (() => "Afwezig");
    const hasEmployeeAssignmentOnDay = typeof options.hasEmployeeAssignmentOnDay === "function"
      ? options.hasEmployeeAssignmentOnDay
      : (() => false);
    const findConflictInSource = typeof options.findConflictInSource === "function"
      ? options.findConflictInSource
      : (() => null);
    const standardEmployee = isBakeryCoreShift(shift) ? getPrimaryStandardEmployeeForShift(shift.name) : "";

    if (!standardEmployee) {
      return {
        standardEmployee: "",
        isAbsent: false,
        reason: ""
      };
    }

    if (getApprovedTimeOff(standardEmployee, day)) {
      const absence = getApprovedTimeOff(standardEmployee, day);
      return {
        standardEmployee,
        isAbsent: true,
        reason: absence ? getAbsenceTypeLabel(absence.type).toLowerCase() : "afwezig"
      };
    }

    if (hasEmployeeAssignmentOnDay(standardEmployee, day, sourceEntries, shift.name)) {
      return {
        standardEmployee,
        isAbsent: true,
        reason: "al elders ingepland"
      };
    }

    if (findConflictInSource(sourceEntries, standardEmployee, day, shift.startTime, shift.endTime)) {
      return {
        standardEmployee,
        isAbsent: true,
        reason: "niet beschikbaar"
      };
    }

    return {
      standardEmployee,
      isAbsent: false,
      reason: ""
    };
  }

  function getCandidateMinPositivePreference(candidates, shiftName, options = {}) {
    const getEmployeeShiftPreference = typeof options.getEmployeeShiftPreference === "function"
      ? options.getEmployeeShiftPreference
      : (() => 0);
    const positivePreferences = (Array.isArray(candidates) ? candidates : [])
      .map((employeeName) => getEmployeeShiftPreference(employeeName, shiftName))
      .filter((value) => value > 0);

    return positivePreferences.length ? Math.min(...positivePreferences) : 0;
  }

  function getOpenReplacementItems(weekValue, options = {}) {
    const getWeekDates = typeof options.getWeekDates === "function"
      ? options.getWeekDates
      : (() => []);
    const getRequiredDayPlannerShifts = typeof options.getRequiredDayPlannerShifts === "function"
      ? options.getRequiredDayPlannerShifts
      : (() => []);
    const isBakeryCoreShift = typeof options.isBakeryCoreShift === "function"
      ? options.isBakeryCoreShift
      : (() => false);
    const getStandardShiftCoverageInfo = typeof options.getStandardShiftCoverageInfo === "function"
      ? options.getStandardShiftCoverageInfo
      : (() => ({ standardEmployee: "", isAbsent: false, reason: "" }));
    const getEntryForShiftOnDate = typeof options.getEntryForShiftOnDate === "function"
      ? options.getEntryForShiftOnDate
      : (() => null);
    const getSuitableEmployeesForShift = typeof options.getSuitableEmployeesForShift === "function"
      ? options.getSuitableEmployeesForShift
      : (() => []);

    if (!weekValue) {
      return [];
    }

    return getWeekDates(weekValue).flatMap((day) =>
      getRequiredDayPlannerShifts(day)
        .filter((shift) => isBakeryCoreShift(shift))
        .map((shift) => {
          const standardCoverage = getStandardShiftCoverageInfo(shift, day);

          if (!standardCoverage.standardEmployee || !standardCoverage.isAbsent || getEntryForShiftOnDate(day, shift)) {
            return null;
          }

          return {
            day,
            shift,
            normalEmployee: standardCoverage.standardEmployee,
            reason: standardCoverage.reason,
            suitableEmployees: getSuitableEmployeesForShift(shift, day, shift.startTime, shift.endTime, null)
          };
        })
        .filter(Boolean)
    );
  }

  function getWeekReplacementItems(weekValue, options = {}) {
    const getOpenReplacementItems = typeof options.getOpenReplacementItems === "function"
      ? options.getOpenReplacementItems
      : (() => []);
    const entries = Array.isArray(options.entries) ? options.entries : [];
    const getWeekValueFromDate = typeof options.getWeekValueFromDate === "function"
      ? options.getWeekValueFromDate
      : (() => "");
    const getShiftName = typeof options.getShiftName === "function"
      ? options.getShiftName
      : ((entry) => entry?.shiftName || "");
    const getShiftForEntry = typeof options.getShiftForEntry === "function"
      ? options.getShiftForEntry
      : (() => null);
    const getSuitableEmployeesForShift = typeof options.getSuitableEmployeesForShift === "function"
      ? options.getSuitableEmployeesForShift
      : (() => []);

    if (!weekValue) {
      return [];
    }

    const openItems = getOpenReplacementItems(weekValue).map((item) => ({
      day: item.day,
      shiftId: item.shift.id,
      shiftName: item.shift.name,
      normalEmployee: item.normalEmployee,
      replacementEmployee: "",
      isOpen: true,
      suitableEmployees: item.suitableEmployees
    }));

    const filledItems = entries
      .filter((entry) =>
        getWeekValueFromDate(entry.day) === weekValue &&
        Boolean(entry.replacementFor)
      )
      .sort((entryA, entryB) =>
        entryA.day.localeCompare(entryB.day) ||
        entryA.startTime.localeCompare(entryB.startTime) ||
        getShiftName(entryA).localeCompare(getShiftName(entryB), "nl")
      )
      .map((entry) => ({
        day: entry.day,
        shiftId: entry.shiftId || getShiftForEntry(entry)?.id || "",
        shiftName: getShiftName(entry),
        normalEmployee: entry.replacementFor,
        replacementEmployee: entry.name,
        isOpen: false,
        suitableEmployees: getSuitableEmployeesForShift(
          getShiftForEntry(entry),
          entry.day,
          entry.startTime,
          entry.endTime,
          entries.indexOf(entry)
        )
      }));

    return [...openItems, ...filledItems].sort((itemA, itemB) =>
      itemA.day.localeCompare(itemB.day) ||
      itemA.shiftName.localeCompare(itemB.shiftName, "nl") ||
      itemA.normalEmployee.localeCompare(itemB.normalEmployee, "nl")
    );
  }

  window.StroetPlanningAssignmentsFeature = Object.freeze({
    canEmployeeBeAutoAssigned,
    findConflictInSource,
    getCandidateMinPositivePreference,
    getOpenReplacementItems,
    getStandardShiftCoverageInfo,
    getSuitableEmployeesForShift,
    getWeekReplacementItems
  });
})();
