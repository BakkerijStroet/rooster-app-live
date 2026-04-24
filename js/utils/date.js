(function attachDateUtils(global) {
  function getNowIsoString() {
    return new Date().toISOString();
  }

  function getCurrentRoundedTimeValue(stepMinutes = 5) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const roundedMinutes = Math.floor(minutes / stepMinutes) * stepMinutes;
    return `${String(hours).padStart(2, "0")}:${String(roundedMinutes).padStart(2, "0")}`;
  }

  function getTodayLocalDateValue() {
    const now = new Date();
    const localDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
    return localDate.toISOString().slice(0, 10);
  }

  function isIsoOlderThanHours(value, hours = 48) {
    if (!value) {
      return false;
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      return false;
    }

    return (Date.now() - parsedDate.getTime()) >= (hours * 60 * 60 * 1000);
  }

  function isFutureDateValue(dateValue) {
    if (!dateValue) {
      return false;
    }

    return dateValue > getTodayLocalDateValue();
  }

  function getFiveMinuteTimeValues() {
    const values = [];

    for (let hour = 0; hour < 24; hour += 1) {
      for (let minute = 0; minute < 60; minute += 5) {
        values.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
      }
    }

    return values;
  }

  function buildTimeSelectOptions(selectedValue) {
    const fiveMinuteTimeValues = getFiveMinuteTimeValues();
    const normalizedValue = selectedValue && fiveMinuteTimeValues.includes(selectedValue)
      ? selectedValue
      : "";

    const placeholder = `<option value="" ${normalizedValue === "" ? "selected" : ""}>Kies tijd</option>`;
    const options = fiveMinuteTimeValues
      .map((value) => `<option value="${value}" ${value === normalizedValue ? "selected" : ""}>${value}</option>`)
      .join("");

    return `${placeholder}${options}`;
  }

  function buildBreakSelectOptions(selectedValue = 0) {
    const normalizedValue = Math.max(0, Number(selectedValue) || 0);
    const options = [];

    for (let minutes = 0; minutes <= 240; minutes += 5) {
      options.push(`<option value="${minutes}" ${minutes === normalizedValue ? "selected" : ""}>${minutes} min</option>`);
    }

    return options.join("");
  }

  global.StroetDateUtils = Object.freeze({
    getNowIsoString,
    getCurrentRoundedTimeValue,
    getTodayLocalDateValue,
    isIsoOlderThanHours,
    isFutureDateValue,
    getFiveMinuteTimeValues,
    buildTimeSelectOptions,
    buildBreakSelectOptions
  });
})(window);
