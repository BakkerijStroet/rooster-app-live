(function attachFormatUtils(global) {
  function formatDateTime(value) {
    return new Intl.DateTimeFormat("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(value));
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(new Date(value));
  }

  function formatWeekday(value) {
    return new Intl.DateTimeFormat("nl-NL", {
      weekday: "long"
    }).format(new Date(value));
  }

  global.StroetFormatUtils = Object.freeze({
    formatDateTime,
    formatDate,
    formatWeekday
  });
})(window);
