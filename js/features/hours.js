(function attachHoursFeature(global) {
  const dateUtils = global.StroetDateUtils || {};
  const getTodayLocalDateValue = dateUtils.getTodayLocalDateValue || function fallbackGetTodayLocalDateValue() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const isFutureDateValue = dateUtils.isFutureDateValue || function fallbackIsFutureDateValue(value) {
    if (typeof value !== "string" || !value) {
      return false;
    }

    return value > getTodayLocalDateValue();
  };

  function formatHours(hours) {
    return `${hours.toFixed(2).replace(".", ",")} uur`;
  }

  function getTimeValueMinutes(timeValue) {
    if (!/^\d{2}:\d{2}$/.test(String(timeValue || ""))) {
      return null;
    }

    const [hoursPart, minutesPart] = String(timeValue).split(":").map((value) => Number(value) || 0);
    return (hoursPart * 60) + minutesPart;
  }

  function calculateWorkedHours(actualStart, actualEnd, breakMinutes = 0) {
    const startMinutes = getTimeValueMinutes(actualStart);
    const endMinutes = getTimeValueMinutes(actualEnd);

    if (startMinutes === null || endMinutes === null || endMinutes <= startMinutes) {
      return null;
    }

    const rawHours = (endMinutes - startMinutes) / 60;
    const pauseHours = Math.max(0, Number(breakMinutes) || 0) / 60;
    const workedHours = rawHours - pauseHours;

    return workedHours >= 0 ? workedHours : null;
  }

  function getWorkedHoursFromLog(workLog) {
    if (!workLog?.actualStart || !workLog?.actualEnd) {
      return null;
    }

    return calculateWorkedHours(workLog.actualStart, workLog.actualEnd, workLog.breakMinutes);
  }

  function buildWorkLogId(employeeName, day, shiftName, plannedStart, plannedEnd) {
    return [employeeName, day, shiftName, plannedStart, plannedEnd].join("|");
  }

  function buildManualWorkLogId(employeeName, day) {
    return ["manual", employeeName, day].join("|");
  }

  function isManualWorkLogId(workLogId) {
    return String(workLogId || "").startsWith("manual|");
  }

  function clampHoursDateValue(dateValue) {
    const normalizedDate = String(dateValue || "").trim();
    const todayValue = getTodayLocalDateValue();

    if (!/^\d{4}-\d{2}-\d{2}$/.test(normalizedDate)) {
      return todayValue;
    }

    return normalizedDate > todayValue ? todayValue : normalizedDate;
  }

  function addMinutesToTimeValue(timeValue, minutesToAdd) {
    if (!timeValue || !Number.isFinite(Number(minutesToAdd))) {
      return timeValue || "";
    }

    const [hoursPart, minutesPart] = String(timeValue).split(":").map((value) => Number(value) || 0);
    const totalMinutes = Math.max(0, (hoursPart * 60) + minutesPart + Number(minutesToAdd));
    const nextHours = Math.floor(totalMinutes / 60) % 24;
    const nextMinutes = totalMinutes % 60;
    return `${String(nextHours).padStart(2, "0")}:${String(nextMinutes).padStart(2, "0")}`;
  }

  function getDefaultWorkLogValues(entry) {
    return {
      actualStart: entry.startTime || "",
      actualEnd: entry.endTime || "",
      breakMinutes: 0,
      notes: ""
    };
  }

  function getWorkLogValidationState(entry, values) {
    const normalizedValues = {
      actualStart: values?.actualStart || "",
      actualEnd: values?.actualEnd || "",
      breakMinutes: Math.max(0, Number(values?.breakMinutes) || 0)
    };
    const validation = {
      isFuture: isFutureDateValue(entry.day),
      isInvalidRange: false,
      isLongShift: false,
      isLargeEndDeviation: false,
      workedHours: calculateWorkedHours(normalizedValues.actualStart, normalizedValues.actualEnd, normalizedValues.breakMinutes),
      messages: []
    };

    if (validation.isFuture) {
      validation.messages.push({
        type: "error",
        text: "Toekomstige diensten zijn nog niet invulbaar."
      });
    }

    if (normalizedValues.actualStart && normalizedValues.actualEnd && validation.workedHours === null) {
      validation.isInvalidRange = true;
      validation.messages.push({
        type: "error",
        text: "Eindtijd ligt voor begintijd of de pauze is onlogisch."
      });
    }

    if (validation.workedHours !== null && validation.workedHours > 12) {
      validation.isLongShift = true;
      validation.messages.push({
        type: "warning",
        text: `Controleer deze registratie: ${formatHours(validation.workedHours)} is een onlogisch lange dienst.`
      });
    }

    const plannedEndMinutes = getTimeValueMinutes(entry.endTime);
    const actualEndMinutes = getTimeValueMinutes(normalizedValues.actualEnd);

    if (plannedEndMinutes !== null && actualEndMinutes !== null) {
      const differenceMinutes = Math.abs(actualEndMinutes - plannedEndMinutes);

      if (differenceMinutes >= 60) {
        validation.isLargeEndDeviation = true;
        validation.messages.push({
          type: "warning",
          text: `De eindtijd wijkt meer dan 1 uur af van planning (${entry.endTime} naar ${normalizedValues.actualEnd}).`
        });
      }
    }

    return validation;
  }

  function buildHoursManualEntry(employeeName, day, shiftName = "Extra uren") {
    return {
      name: employeeName,
      day,
      shiftName,
      startTime: "",
      endTime: "",
      hours: 0,
      isManualHours: true
    };
  }

  function getWorkLogStatusLabel(workLog) {
    if (!workLog) {
      return "Leeg";
    }

    if (workLog.status === "approved") {
      return "Goedgekeurd";
    }

    if (workLog.status === "rejected") {
      return "Afgekeurd";
    }

    if (workLog.status === "revision") {
      return "Opmerking nodig";
    }

    if (workLog.status === "open") {
      return "Ingediend";
    }

    return "Ingevuld";
  }

  global.StroetHoursFeature = Object.freeze({
    addMinutesToTimeValue,
    buildHoursManualEntry,
    buildManualWorkLogId,
    buildWorkLogId,
    calculateWorkedHours,
    clampHoursDateValue,
    formatHours,
    getDefaultWorkLogValues,
    getTimeValueMinutes,
    getWorkedHoursFromLog,
    getWorkLogStatusLabel,
    getWorkLogValidationState,
    isManualWorkLogId
  });
})(window);
