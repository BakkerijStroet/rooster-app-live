(() => {
  function getShopCoverageForDate(dateValue, options = {}) {
    const getRecognizedSpecialDayInfo = typeof options.getRecognizedSpecialDayInfo === "function"
      ? options.getRecognizedSpecialDayInfo
      : (() => null);
    const getShopSlotsForDate = typeof options.getShopSlotsForDate === "function"
      ? options.getShopSlotsForDate
      : (() => []);
    const entries = Array.isArray(options.entries) ? options.entries : [];
    const isShopShiftName = typeof options.isShopShiftName === "function"
      ? options.isShopShiftName
      : (() => false);
    const getShiftName = typeof options.getShiftName === "function"
      ? options.getShiftName
      : ((entry) => entry?.shiftName || "");
    const specialDay = getRecognizedSpecialDayInfo(dateValue);
    const needed = getShopSlotsForDate(dateValue).length;
    const planned = entries.filter((entry) => entry.day === dateValue && isShopShiftName(getShiftName(entry))).length;

    return {
      needed,
      planned,
      status: needed === 0 ? "closed" : planned < needed ? "under" : planned === needed ? "full" : "over",
      closedReason: specialDay?.isClosed ? specialDay.nameLabel : ""
    };
  }

  function getCoverageStatusName(className) {
    if (className.includes("full")) {
      return "full";
    }

    if (className.includes("under")) {
      return "under";
    }

    if (className.includes("closed")) {
      return "closed";
    }

    return "over";
  }

  function getShopCoverageLabel(dateValue, options = {}) {
    const getShopCoverageForDate = typeof options.getShopCoverageForDate === "function"
      ? options.getShopCoverageForDate
      : (() => ({ status: "closed", planned: 0, needed: 0, closedReason: "" }));
    const coverage = getShopCoverageForDate(dateValue);

    if (coverage.status === "closed") {
      return {
        text: coverage.closedReason ? `Gesloten - ${coverage.closedReason}` : "Winkel gesloten",
        className: "planner-status closed"
      };
    }

    if (coverage.status === "full") {
      return {
        text: `Winkel volledig gevuld (${coverage.planned}/${coverage.needed})`,
        className: "planner-status full"
      };
    }

    if (coverage.status === "under") {
      return {
        text: `Onderbezet winkel (${coverage.planned}/${coverage.needed})`,
        className: "planner-status under"
      };
    }

    return {
      text: `Winkel ${coverage.planned}/${coverage.needed}`,
      className: "planner-status over"
    };
  }

  function buildPlannerContractOverviewData(selectedWeek, visibleEntries, options = {}) {
    const getWeekDates = typeof options.getWeekDates === "function"
      ? options.getWeekDates
      : (() => []);
    const getTodayDateValue = typeof options.getTodayDateValue === "function"
      ? options.getTodayDateValue
      : (() => "");
    const getMonthKeyFromDate = typeof options.getMonthKeyFromDate === "function"
      ? options.getMonthKeyFromDate
      : (() => "");
    const getMonthlyRosterWorkdayCount = typeof options.getMonthlyRosterWorkdayCount === "function"
      ? options.getMonthlyRosterWorkdayCount
      : (() => 0);
    const mergePlanningEntries = typeof options.mergePlanningEntries === "function"
      ? options.mergePlanningEntries
      : ((sourceEntries = [], fallbackEntries = []) => [...fallbackEntries, ...sourceEntries]);
    const entries = Array.isArray(options.entries) ? options.entries : [];
    const getEmployeesWithFavoritesFirst = typeof options.getEmployeesWithFavoritesFirst === "function"
      ? options.getEmployeesWithFavoritesFirst
      : ((employees) => employees);
    const getActiveEmployees = typeof options.getActiveEmployees === "function"
      ? options.getActiveEmployees
      : (() => []);
    const getEmployeeContractHours = typeof options.getEmployeeContractHours === "function"
      ? options.getEmployeeContractHours
      : (() => 0);
    const getEmployeeWeekHours = typeof options.getEmployeeWeekHours === "function"
      ? options.getEmployeeWeekHours
      : (() => 0);
    const getEmployeeMonthHours = typeof options.getEmployeeMonthHours === "function"
      ? options.getEmployeeMonthHours
      : (() => 0);
    const employees = Array.isArray(options.employees) ? options.employees : [];
    const getWeekdayNumberFromDate = typeof options.getWeekdayNumberFromDate === "function"
      ? options.getWeekdayNumberFromDate
      : (() => 0);
    const getMonthlyWeekdayOccurrenceCount = typeof options.getMonthlyWeekdayOccurrenceCount === "function"
      ? options.getMonthlyWeekdayOccurrenceCount
      : (() => 0);
    const formatHours = typeof options.formatHours === "function"
      ? options.formatHours
      : ((value) => String(value || 0));

    const weekDates = getWeekDates(selectedWeek);
    const monthReferenceDate = weekDates[5] || weekDates[0] || getTodayDateValue();
    const monthKey = getMonthKeyFromDate(monthReferenceDate);
    const monthlyRosterWorkdays = getMonthlyRosterWorkdayCount(monthReferenceDate);
    const monthSourceEntries = mergePlanningEntries(visibleEntries, entries);
    const contractEmployees = getEmployeesWithFavoritesFirst(getActiveEmployees())
      .filter((employeeName) => getEmployeeContractHours(employeeName) > 0)
      .map((employeeName) => {
        const contractHours = getEmployeeContractHours(employeeName);
        const plannedHours = getEmployeeWeekHours(employeeName, selectedWeek, visibleEntries);
        const difference = Math.round((plannedHours - contractHours) * 10) / 10;
        const remainingHours = Math.round((contractHours - plannedHours) * 10) / 10;
        const monthlyTargetHours = Math.round(((contractHours / 5) * monthlyRosterWorkdays) * 10) / 10;
        const plannedMonthHours = Math.round(getEmployeeMonthHours(employeeName, monthReferenceDate, monthSourceEntries) * 10) / 10;
        const monthlyDifference = Math.round((plannedMonthHours - monthlyTargetHours) * 10) / 10;
        const stateClass = difference > 1
          ? "is-over"
          : difference < -1
            ? "is-under"
            : "is-match";

        return {
          employeeName,
          contractHours,
          plannedHours,
          remainingHours,
          difference,
          stateClass,
          monthlyTargetHours,
          plannedMonthHours,
          monthlyDifference
        };
      });
    const saturdayCheckEmployees = ["Luna", "Monique", "Gerry", "Saskia", "Wendy"]
      .filter((employeeName) => employees.includes(employeeName))
      .map((employeeName) => {
        const monthlyEntries = monthSourceEntries.filter((entry) =>
          entry.name === employeeName &&
          getMonthKeyFromDate(entry.day) === monthKey &&
          getWeekdayNumberFromDate(entry.day) === 6
        );
        const workedSaturdayDates = [...new Set(monthlyEntries.map((entry) => entry.day))];
        const totalSaturdays = getMonthlyWeekdayOccurrenceCount(monthReferenceDate, 6);
        const freeSaturdays = Math.max(0, totalSaturdays - workedSaturdayDates.length);
        let stateClass = "is-match";

        if ((employeeName === "Luna" || employeeName === "Monique") && freeSaturdays < 1) {
          stateClass = "is-over";
        } else if (employeeName === "Gerry" && workedSaturdayDates.length > 0) {
          stateClass = "is-under";
        }

        return {
          employeeName,
          monthKey,
          workedSaturdays: workedSaturdayDates.length,
          freeSaturdays,
          totalSaturdays,
          stateClass
        };
      });
    const underEmployees = contractEmployees.filter((employee) => employee.stateClass === "is-under");
    const onTrackEmployees = contractEmployees.filter((employee) => employee.stateClass === "is-match");
    const overEmployees = contractEmployees.filter((employee) => employee.stateClass === "is-over");
    const balanceTips = [
      ...underEmployees
        .sort((employeeA, employeeB) => employeeB.remainingHours - employeeA.remainingHours)
        .slice(0, 3)
        .map((employee) => `${employee.employeeName} nog ${formatHours(employee.remainingHours)} te weinig`),
      ...overEmployees
        .sort((employeeA, employeeB) => employeeB.difference - employeeA.difference)
        .slice(0, 3)
        .map((employee) => `${employee.employeeName} ${formatHours(employee.difference)} teveel ingepland`)
    ].slice(0, 4);
    const monthlyWarnings = [
      ...saturdayCheckEmployees
        .filter((employee) => (employee.employeeName === "Luna" || employee.employeeName === "Monique") && employee.freeSaturdays < 1)
        .map((employee) => ({
          stateClass: "is-over",
          text: `${employee.employeeName} heeft deze maand geen zaterdag vrij.`
        })),
      ...saturdayCheckEmployees
        .filter((employee) => employee.employeeName === "Gerry" && employee.workedSaturdays > 0)
        .map((employee) => ({
          stateClass: "is-under",
          text: `Gerry is deze maand ${employee.workedSaturdays}x op zaterdag ingepland.`
        })),
      ...contractEmployees
        .filter((employee) => employee.monthlyDifference <= -4)
        .sort((employeeA, employeeB) => employeeA.monthlyDifference - employeeB.monthlyDifference)
        .slice(0, 3)
        .map((employee) => ({
          stateClass: "is-under",
          text: `${employee.employeeName} nog ${formatHours(Math.abs(employee.monthlyDifference))} te weinig in ${monthKey}.`
        })),
      ...contractEmployees
        .filter((employee) => employee.monthlyDifference >= 4)
        .sort((employeeA, employeeB) => employeeB.monthlyDifference - employeeA.monthlyDifference)
        .slice(0, 3)
        .map((employee) => ({
          stateClass: "is-over",
          text: `${employee.employeeName} ${formatHours(employee.monthlyDifference)} te veel in ${monthKey}.`
        }))
    ].slice(0, 6);
    const monthlyOverviewEmployees = ["Luna", "Monique", "Saskia", "Gerry", "Wendy"]
      .map((employeeName) => {
        const contractEmployee = contractEmployees.find((employee) => employee.employeeName === employeeName);
        const saturdayEmployee = saturdayCheckEmployees.find((employee) => employee.employeeName === employeeName);

        if (!contractEmployee && !saturdayEmployee) {
          return null;
        }

        let stateClass = "is-match";

        if (contractEmployee?.monthlyDifference <= -4) {
          stateClass = "is-under";
        } else if (contractEmployee?.monthlyDifference >= 4) {
          stateClass = "is-over";
        }

        if ((employeeName === "Luna" || employeeName === "Monique") && saturdayEmployee && saturdayEmployee.freeSaturdays < 1) {
          stateClass = "is-over";
        }

        if (employeeName === "Gerry" && saturdayEmployee && saturdayEmployee.workedSaturdays > 0) {
          stateClass = "is-over";
        }

        return {
          employeeName,
          contractHours: contractEmployee?.monthlyTargetHours || 0,
          plannedHours: contractEmployee?.plannedMonthHours || 0,
          difference: contractEmployee?.monthlyDifference || 0,
          workedSaturdays: saturdayEmployee?.workedSaturdays || 0,
          freeSaturdays: saturdayEmployee?.freeSaturdays || 0,
          stateClass
        };
      })
      .filter(Boolean);

    return {
      monthKey,
      contractEmployees,
      saturdayCheckEmployees,
      underEmployees,
      onTrackEmployees,
      overEmployees,
      balanceTips,
      monthlyWarnings,
      monthlyOverviewEmployees
    };
  }

  function getSchedulePlanningWeekData(weekValue, options = {}) {
    const entries = Array.isArray(options.entries) ? options.entries : [];
    const getWeekDates = typeof options.getWeekDates === "function"
      ? options.getWeekDates
      : (() => []);
    const getWeekValueFromDate = typeof options.getWeekValueFromDate === "function"
      ? options.getWeekValueFromDate
      : (() => "");
    const getShiftName = typeof options.getShiftName === "function"
      ? options.getShiftName
      : ((entry) => entry?.shiftName || "");
    const getShopCoverageForDate = typeof options.getShopCoverageForDate === "function"
      ? options.getShopCoverageForDate
      : (() => ({ status: "closed" }));
    const getRequiredDayPlannerShifts = typeof options.getRequiredDayPlannerShifts === "function"
      ? options.getRequiredDayPlannerShifts
      : (() => []);
    const getEntryForShiftOnDate = typeof options.getEntryForShiftOnDate === "function"
      ? options.getEntryForShiftOnDate
      : (() => null);
    const getDeviationOnlyEntries = typeof options.getDeviationOnlyEntries === "function"
      ? options.getDeviationOnlyEntries
      : (() => []);
    const getRecognizedSpecialDayInfo = typeof options.getRecognizedSpecialDayInfo === "function"
      ? options.getRecognizedSpecialDayInfo
      : (() => null);
    const getEmployeesWithFavoritesFirst = typeof options.getEmployeesWithFavoritesFirst === "function"
      ? options.getEmployeesWithFavoritesFirst
      : ((employees) => employees);
    const getActiveEmployees = typeof options.getActiveEmployees === "function"
      ? options.getActiveEmployees
      : (() => []);
    const getEmployeeContractHours = typeof options.getEmployeeContractHours === "function"
      ? options.getEmployeeContractHours
      : (() => 0);
    const getEmployeeWeekHours = typeof options.getEmployeeWeekHours === "function"
      ? options.getEmployeeWeekHours
      : (() => 0);
    const getPlanningOverviewStatus = typeof options.getPlanningOverviewStatus === "function"
      ? options.getPlanningOverviewStatus
      : (() => ({ key: "open", label: "Open", className: "is-open" }));
    const formatPlanningWeekPeriod = typeof options.formatPlanningWeekPeriod === "function"
      ? options.formatPlanningWeekPeriod
      : ((value) => String(value || ""));
    const formatWeekday = typeof options.formatWeekday === "function"
      ? options.formatWeekday
      : ((value) => String(value || ""));
    const getDeviationReasonSummary = typeof options.getDeviationReasonSummary === "function"
      ? options.getDeviationReasonSummary
      : (() => []);
    const formatHours = typeof options.formatHours === "function"
      ? options.formatHours
      : ((value) => String(value || 0));
    const sourceEntries = Array.isArray(options.sourceEntries) ? options.sourceEntries : entries;
    const weekDates = getWeekDates(weekValue);
    const weekEntries = sourceEntries
      .filter((entry) => getWeekValueFromDate(entry.day) === weekValue)
      .sort((entryA, entryB) =>
        entryA.day.localeCompare(entryB.day) ||
        entryA.startTime.localeCompare(entryB.startTime) ||
        getShiftName(entryA).localeCompare(getShiftName(entryB), "nl")
      );
    const openItems = weekDates
      .filter((day) => getShopCoverageForDate(day).status !== "closed")
      .flatMap((day) =>
        getRequiredDayPlannerShifts(day)
          .filter((shift) => !getEntryForShiftOnDate(day, shift, sourceEntries))
          .map((shift) => ({
            day,
            shift
          }))
      );
    const replacementItems = weekEntries
      .filter((entry) => entry.replacementFor)
      .map((entry) => ({
        day: entry.day,
        entry
      }));
    const deviationItems = getDeviationOnlyEntries(weekEntries, weekDates).map((entry) => ({
      day: entry.day,
      entry
    }));
    const specialDayItems = weekDates
      .map((day) => {
        const info = getRecognizedSpecialDayInfo(day);
        return info ? { day, info } : null;
      })
      .filter(Boolean);
    const contractImbalanceEmployees = getEmployeesWithFavoritesFirst(getActiveEmployees())
      .filter((employeeName) => getEmployeeContractHours(employeeName) > 0)
      .map((employeeName) => {
        const contractHours = getEmployeeContractHours(employeeName);
        const plannedHours = getEmployeeWeekHours(employeeName, weekValue, sourceEntries);
        const difference = Math.round((plannedHours - contractHours) * 10) / 10;

        if (Math.abs(difference) < 1) {
          return null;
        }

        return {
          employeeName,
          difference,
          plannedHours,
          contractHours,
          stateClass: difference > 0 ? "is-over" : "is-under"
        };
      })
      .filter(Boolean)
      .sort((employeeA, employeeB) => Math.abs(employeeB.difference) - Math.abs(employeeA.difference));
    const status = getPlanningOverviewStatus(weekValue, weekEntries, openItems.length);

    return {
      weekValue,
      weekDates,
      periodLabel: formatPlanningWeekPeriod(weekValue),
      weekEntries,
      openItems,
      replacementItems,
      deviationItems,
      specialDayItems,
      contractImbalanceEmployees,
      openCount: openItems.length,
      replacementCount: replacementItems.length,
      deviationCount: deviationItems.length,
      specialDayCount: specialDayItems.length,
      contractImbalanceCount: contractImbalanceEmployees.length,
      status,
      details: {
        openPreview: openItems.slice(0, 4).map((item) => `${formatWeekday(item.day)}: ${item.shift.name}`),
        replacementPreview: replacementItems.slice(0, 3).map((item) => `${formatWeekday(item.day)}: ${item.entry.replacementFor} -> ${item.entry.name}`),
        deviationPreview: deviationItems.slice(0, 3).map((item) => `${formatWeekday(item.day)}: ${getShiftName(item.entry)} · ${getDeviationReasonSummary(item.entry).join(" · ")}`),
        specialDayPreview: specialDayItems.slice(0, 4).map((item) => `${formatWeekday(item.day)}: ${item.info.nameLabel}`),
        contractPreview: contractImbalanceEmployees.slice(0, 3).map((employee) => `${employee.employeeName}: ${employee.difference > 0 ? "+" : "-"}${formatHours(Math.abs(employee.difference))}`),
        plannedCount: weekEntries.length
      }
    };
  }

  window.StroetPlanningPanelPrepFeature = Object.freeze({
    buildPlannerContractOverviewData,
    getCoverageStatusName,
    getSchedulePlanningWeekData,
    getShopCoverageForDate,
    getShopCoverageLabel
  });
})();
