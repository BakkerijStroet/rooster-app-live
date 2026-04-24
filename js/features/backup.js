(() => {
  function normalizeAuditActorRole(value) {
    return value === "employee" ? "employee" : "planner";
  }

  function normalizeAuditActorName(value, fallback = "") {
    return typeof value === "string" ? value : fallback;
  }

  function createAuditActorMeta(options = {}) {
    const {
      isPlanner = false,
      employeeName = "",
      plannerName = "Planner / Directie",
      employeeFallback = "Medewerker"
    } = options;

    return {
      actorRole: normalizeAuditActorRole(isPlanner ? "planner" : "employee"),
      actorName: isPlanner
        ? plannerName
        : normalizeAuditActorName(employeeName, employeeFallback) || employeeFallback
    };
  }

  function normalizeAuditLogEntry(item) {
    if (
      !item ||
      typeof item.at !== "string" ||
      typeof item.scope !== "string" ||
      typeof item.action !== "string"
    ) {
      return null;
    }

    return {
      at: item.at,
      scope: item.scope,
      action: item.action,
      actorRole: normalizeAuditActorRole(item.actorRole),
      actorName: normalizeAuditActorName(item.actorName),
      message: typeof item.message === "string" ? item.message : "",
      details: item.details && typeof item.details === "object" ? item.details : {}
    };
  }

  function sanitizeAuditLog(log = []) {
    return Array.isArray(log)
      ? log
        .map(normalizeAuditLogEntry)
        .filter(Boolean)
      : [];
  }

  function normalizeBackupHistoryEntry(item) {
    if (
      !item ||
      typeof item.id !== "string" ||
      typeof item.createdAt !== "string" ||
      typeof item.reason !== "string" ||
      !item.snapshot ||
      typeof item.snapshot !== "object"
    ) {
      return null;
    }

    const actorMeta = createAuditActorMeta({
      isPlanner: item.actorRole !== "employee",
      employeeName: typeof item.actorName === "string" ? item.actorName : ""
    });

    return {
      ...item,
      actorRole: actorMeta.actorRole,
      actorName: actorMeta.actorName,
      metadata: item.metadata && typeof item.metadata === "object" ? item.metadata : {}
    };
  }

  function sanitizeBackupHistory(history = []) {
    return Array.isArray(history)
      ? history
        .map(normalizeBackupHistoryEntry)
        .filter(Boolean)
      : [];
  }

  function createBackupEntryId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function getBackupRestoreEmptyLabel() {
    return "Kies herstelpunt";
  }

  function getBackupEmptySummaryText() {
    return "Nog geen back-up beschikbaar.";
  }

  function getBackupOptionLabel(backup, options = {}) {
    const formatDateTime = typeof options.formatDateTime === "function"
      ? options.formatDateTime
      : ((value) => String(value || ""));

    return `${formatDateTime(backup.createdAt)} - ${backup.reason}`;
  }

  function getBackupSummaryText(history = [], options = {}) {
    const formatDateTime = typeof options.formatDateTime === "function"
      ? options.formatDateTime
      : ((value) => String(value || ""));

    if (!Array.isArray(history) || !history.length) {
      return getBackupEmptySummaryText();
    }

    return `Laatste back-up: ${formatDateTime(history[0].createdAt)}. Totaal ${history.length} lokaal opgeslagen herstelpunt(en).`;
  }

  window.StroetBackupFeature = Object.freeze({
    createAuditActorMeta,
    createBackupEntryId,
    getBackupEmptySummaryText,
    getBackupOptionLabel,
    getBackupRestoreEmptyLabel,
    getBackupSummaryText,
    normalizeAuditActorName,
    normalizeAuditActorRole,
    normalizeAuditLogEntry,
    normalizeBackupHistoryEntry,
    sanitizeAuditLog,
    sanitizeBackupHistory
  });
})();
