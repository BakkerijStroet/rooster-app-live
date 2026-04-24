(function attachHoursPanelPrepFeature(globalScope) {
  function getDayWorkLogStatusForEntries(dayEntries, helpers) {
    if (!Array.isArray(dayEntries) || !dayEntries.length) {
      return "";
    }

    const logs = dayEntries.map((entry) => helpers.getWorkLogForEntry(entry));

    if (logs.every((log) => log?.status === "approved")) {
      return "goedgekeurd";
    }

    if (logs.every((log) => log && (log.status === "open" || log.status === "approved"))) {
      return "ingediend";
    }

    if (logs.every((log) => Boolean(log))) {
      return "ingevuld";
    }

    return "";
  }

  function getWorkLogsForWeek(workLogs, weekValue, employeeName = "", helpers) {
    return workLogs
      .filter((log) => helpers.getWeekValueFromDate(log.day) === weekValue && (!employeeName || log.employeeName === employeeName))
      .sort((logA, logB) => logA.employeeName.localeCompare(logB.employeeName, "nl") || logA.day.localeCompare(logB.day) || logA.plannedStart.localeCompare(logB.plannedStart));
  }

  function getHoursWeekReviewState({ weekValue, employeeName = "", entries, workLogs, helpers }) {
    const todayValue = helpers.getTodayLocalDateValue();
    const weekEntries = entries.filter((entry) =>
      helpers.getWeekValueFromDate(entry.day) === weekValue &&
      (!employeeName || entry.name === employeeName)
    );
    const plannedDays = [...new Set(weekEntries.map((entry) => entry.day))].sort();
    const futureDays = plannedDays.filter((day) => day > todayValue);
    const missingDays = plannedDays.filter((day) => {
      const dayEntries = weekEntries.filter((entry) => entry.day === day);
      return dayEntries.some((entry) => !helpers.getWorkLogForEntry(entry));
    });
    const weekLogs = helpers.getWorkLogsForWeek(workLogs, weekValue, employeeName, {
      getWeekValueFromDate: helpers.getWeekValueFromDate
    });
    const draftLogs = weekLogs.filter((log) => log.status === "draft");
    const revisionLogs = weekLogs.filter((log) => log.status === "revision" || log.status === "rejected");
    const openLogs = weekLogs.filter((log) => log.status === "open");
    const approvedLogs = weekLogs.filter((log) => log.status === "approved");

    if (!weekEntries.length && !weekLogs.length) {
      return {
        status: "incomplete",
        label: "Incompleet",
        note: "Nog geen uren in deze week.",
        futureDays: [],
        missingDays: [],
        draftLogs,
        revisionLogs,
        openLogs,
        approvedLogs
      };
    }

    if (futureDays.length) {
      return {
        status: "incomplete",
        label: "Incompleet",
        note: `Deze week loopt nog. ${futureDays.length} ${futureDays.length === 1 ? "dag staat nog in de toekomst." : "dagen staan nog in de toekomst."}`,
        futureDays,
        missingDays,
        draftLogs,
        revisionLogs,
        openLogs,
        approvedLogs
      };
    }

    if (missingDays.length) {
      const previewDays = missingDays
        .slice(0, 3)
        .map((day) => `${helpers.formatWeekday(day)} ${helpers.formatDate(day)}`)
        .join(", ");
      const extraText = missingDays.length > 3 ? ` en nog ${missingDays.length - 3}` : "";

      return {
        status: "incomplete",
        label: "Incompleet",
        note: `Er ontbreken nog uren voor: ${previewDays}${extraText}.`,
        futureDays,
        missingDays,
        draftLogs,
        revisionLogs,
        openLogs,
        approvedLogs
      };
    }

    if (draftLogs.length || revisionLogs.length) {
      return {
        status: "incomplete",
        label: "Incompleet",
        note: draftLogs.length
          ? "Niet alle uren zijn al ingediend."
          : "Er staan nog uren open met opmerking of afkeuring.",
        futureDays,
        missingDays,
        draftLogs,
        revisionLogs,
        openLogs,
        approvedLogs
      };
    }

    if (openLogs.length) {
      return {
        status: "ready",
        label: "Klaar voor goedkeuring",
        note: `${openLogs.length} ${openLogs.length === 1 ? "registratie staat klaar" : "registraties staan klaar"} voor goedkeuring.`,
        futureDays,
        missingDays,
        draftLogs,
        revisionLogs,
        openLogs,
        approvedLogs
      };
    }

    return {
      status: "done",
      label: "Afgerond",
      note: "Alle uren van deze week zijn goedgekeurd.",
      futureDays,
      missingDays,
      draftLogs,
      revisionLogs,
      openLogs,
      approvedLogs
    };
  }

  function buildMyHoursWeekSummaryData({ selectedWeekEntries, selectedWeekPastEntries, getWorkLogForEntry, calculateWorkedHours }) {
    const selectedWeekDays = [...new Set(selectedWeekEntries.map((entry) => entry.day))].sort();
    const selectedWeekVisibleDays = [...new Set(selectedWeekPastEntries.map((entry) => entry.day))].sort();
    const filledWeekDays = selectedWeekVisibleDays.filter((day) => {
      const dayEntries = selectedWeekPastEntries.filter((entry) => entry.day === day);
      return dayEntries.length > 0 && dayEntries.every((entry) => Boolean(getWorkLogForEntry(entry)));
    });
    const openWeekDays = selectedWeekVisibleDays.filter((day) => {
      const dayEntries = selectedWeekPastEntries.filter((entry) => entry.day === day);
      return dayEntries.some((entry) => !getWorkLogForEntry(entry));
    });
    const missingSubmittableWeekDays = [...new Set(selectedWeekPastEntries
      .filter((entry) => !getWorkLogForEntry(entry))
      .map((entry) => entry.day))];
    const selectedWeekWorkedHours = selectedWeekEntries.reduce((total, entry) => {
      const workLog = getWorkLogForEntry(entry);
      const workedHours = workLog ? calculateWorkedHours(workLog.actualStart, workLog.actualEnd, workLog.breakMinutes) : null;
      return total + (workedHours || 0);
    }, 0);

    return {
      selectedWeekDays,
      selectedWeekVisibleDays,
      filledWeekDays,
      openWeekDays,
      missingSubmittableWeekDays,
      selectedWeekWorkedHours
    };
  }

  function getHoursApprovalEmptyText(weekReviewState) {
    return weekReviewState.status === "done"
      ? "Deze week is afgerond. Er staan geen uren meer open voor controle."
      : "Nog geen ingediende uren in deze week.";
  }

  function buildHoursApprovalGroupViewModels(approvalGroups, helpers) {
    return [...approvalGroups.entries()]
      .sort(([employeeA], [employeeB]) => employeeA.localeCompare(employeeB, "nl"))
      .map(([employeeName, employeeLogs]) => {
        const sortedEmployeeLogs = employeeLogs
          .slice()
          .sort((logA, logB) => logA.day.localeCompare(logB.day) || logA.plannedStart.localeCompare(logB.plannedStart));
        const employeeDeviationCount = sortedEmployeeLogs.filter((log) =>
          log.actualStart !== log.plannedStart ||
          log.actualEnd !== log.plannedEnd ||
          Number(log.breakMinutes) > 0 ||
          Boolean(log.notes?.trim())
        ).length;

        return {
          employeeName,
          sortedEmployeeLogs,
          openCount: sortedEmployeeLogs.filter((log) => log.status === "open").length,
          deviationCount: employeeDeviationCount,
          dayCount: sortedEmployeeLogs.length
        };
      });
  }

  globalScope.StroetHoursPanelPrepFeature = Object.freeze({
    buildHoursApprovalGroupViewModels,
    buildMyHoursWeekSummaryData,
    getDayWorkLogStatusForEntries,
    getHoursApprovalEmptyText,
    getHoursWeekReviewState,
    getWorkLogsForWeek
  });
})(window);
