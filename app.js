const form = document.getElementById("schedule-form");
const scheduleBoard = document.getElementById("schedule-board");
const totalsContainer = document.getElementById("totals");
const myScheduleBoard = document.getElementById("myScheduleBoard");
const myHoursSummary = document.getElementById("myHoursSummary");
const roleSelect = document.getElementById("roleSelect");
const currentEmployeeSelect = document.getElementById("currentEmployee");
const currentEmployeeBadge = document.getElementById("currentEmployeeBadge");
const roleIndicator = document.getElementById("roleIndicator");
const brandRoleChip = document.getElementById("brandRoleChip");
const mailTestModeBadge = document.getElementById("mailTestModeBadge");
const testModeBadge = document.getElementById("testModeBadge");
const switchUserButton = document.getElementById("switchUserButton");
const resetTestDataButton = document.getElementById("resetTestDataButton");
const loginOverlay = document.getElementById("loginOverlay");
const loginRoleSelect = document.getElementById("loginRoleSelect");
const loginEmployeeLabel = document.getElementById("loginEmployeeLabel");
const loginEmployeeSelect = document.getElementById("loginEmployeeSelect");
const loginTestModeCheckbox = document.getElementById("loginTestMode");
const loginConfirmButton = document.getElementById("loginConfirmButton");
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const newButton = document.getElementById("newButton");
const repeatShiftButton = document.getElementById("repeatShiftButton");
const copyPreviousWeekButton = document.getElementById("copyPreviousWeekButton");
const printButton = document.getElementById("printButton");
const exportButton = document.getElementById("exportButton");
const autoFillButton = document.getElementById("autoFillButton");
const rebalanceHoursButton = document.getElementById("rebalanceHoursButton");
const monthBalanceButton = document.getElementById("monthBalanceButton");
const completeReviewButton = document.getElementById("completeReviewButton");
const applyAutoFillButton = document.getElementById("applyAutoFillButton");
const cancelAutoFillButton = document.getElementById("cancelAutoFillButton");
const undoButton = document.getElementById("undoButton");
const showSuitableButton = document.getElementById("showSuitableButton");
const planningOverviewAutoButton = document.getElementById("planningOverviewAutoButton");
const planningOverviewRefreshButton = document.getElementById("planningOverviewRefreshButton");
const planningOverviewMonthInput = document.getElementById("planningOverviewMonth");
const planningOverviewSummary = document.getElementById("planningOverviewSummary");
const previousWeekButton = document.getElementById("previousWeekButton");
const todayWeekButton = document.getElementById("todayWeekButton");
const nextWeekButton = document.getElementById("nextWeekButton");
const employeeWeekToolbar = document.getElementById("employeeWeekToolbar");
const employeeWeekLabel = document.getElementById("employeeWeekLabel");
const employeeTodayViewButton = document.getElementById("employeeTodayViewButton");
const employeeWeekViewButton = document.getElementById("employeeWeekViewButton");
const focusModeButton = document.getElementById("focusModeButton");
const controlModeButton = document.getElementById("controlModeButton");
const deviationOnlyButton = document.getElementById("deviationOnlyButton");
const weekViewTitle = document.getElementById("weekViewTitle");
const copySourceWeekInput = document.getElementById("copySourceWeek");
const copyTargetWeekInput = document.getElementById("copyTargetWeek");
const nameSelect = document.getElementById("name");
const presetShiftSelect = document.getElementById("presetShift");
const newShiftNameInput = document.getElementById("newShiftName");
const newShiftColorInput = document.getElementById("newShiftColor");
const newShiftStartInput = document.getElementById("newShiftStart");
const newShiftEndInput = document.getElementById("newShiftEnd");
const addShiftButton = document.getElementById("addShiftButton");
const editShiftButton = document.getElementById("editShiftButton");
const cancelShiftButton = document.getElementById("cancelShiftButton");
const removeShiftSelect = document.getElementById("removeShiftSelect");
const removeShiftButton = document.getElementById("removeShiftButton");
const shiftPreferenceShiftSelect = document.getElementById("shiftPreferenceShiftSelect");
const shiftPreferenceList = document.getElementById("shiftPreferenceList");
const shiftListCard = document.getElementById("shiftListCard");
const winkelNeededInputs = Array.from({ length: 7 }, (_, index) => document.getElementById(`winkelNeeded${index + 1}`));
const overrideDateInput = document.getElementById("overrideDate");
const overrideCountInput = document.getElementById("overrideCount");
const saveOverrideButton = document.getElementById("saveOverrideButton");
const removeOverrideButton = document.getElementById("removeOverrideButton");
const overrideList = document.getElementById("overrideList");
const vacationWeekInput = document.getElementById("vacationWeek");
const vacationWeekStatusSelect = document.getElementById("vacationWeekStatus");
const saveVacationWeekButton = document.getElementById("saveVacationWeekButton");
const removeVacationWeekButton = document.getElementById("removeVacationWeekButton");
const vacationWeekList = document.getElementById("vacationWeekList");
const newEmployeeNameInput = document.getElementById("newEmployeeName");
const addEmployeeButton = document.getElementById("addEmployeeButton");
const removeEmployeeSelect = document.getElementById("removeEmployeeSelect");
const employeeStatusSelect = document.getElementById("employeeStatusSelect");
const employeeRoleSelect = document.getElementById("employeeRoleSelect");
const employeeEmailInput = document.getElementById("employeeEmailInput");
const employeeEmailError = document.getElementById("employeeEmailError");
const employeeMailTestUserInput = document.getElementById("employeeMailTestUserInput");
const employeeNameDisplayInput = document.getElementById("employeeNameDisplay");
const employeeDetailMailStatus = document.getElementById("employeeDetailMailStatus");
const removeEmployeeButton = document.getElementById("removeEmployeeButton");
const saveEmployeeEmailButton = document.getElementById("saveEmployeeEmailButton");
const employeeDetailTestMailButton = document.getElementById("employeeDetailTestMailButton");
const employeeStatusImpact = document.getElementById("employeeStatusImpact");
const employeeDetailTitle = document.getElementById("employeeDetailTitle");
const createRestorePointButton = document.getElementById("createRestorePointButton");
const backupRestoreSelect = document.getElementById("backupRestoreSelect");
const restoreBackupButton = document.getElementById("restoreBackupButton");
const backupSummary = document.getElementById("backupSummary");
const mailSenderNameInput = document.getElementById("mailSenderNameInput");
const mailSenderEmailInput = document.getElementById("mailSenderEmailInput");
const dashboardTestMailButton = document.getElementById("dashboardTestMailButton");
const saveMailSettingsButton = document.getElementById("saveMailSettingsButton");
const testMailButton = document.getElementById("testMailButton");
const mailSettingsStatus = document.getElementById("mailSettingsStatus");
const FIXED_TEST_MAIL_RECIPIENT = "info@bakkerijstroet.nl";
const APP_MAIL_TEST_MODE_ENABLED = true;
const EMPLOYEE_MAIL_TEST_MODE_ENABLED = true;
const EMPLOYEE_MAIL_TEST_EMPLOYEE = "Twan";
const employeeListCard = document.getElementById("employeeListCard");
const employeeStandardShiftList = document.getElementById("employeeStandardShiftList");
const employeePermissionsList = document.getElementById("employeePermissionsList");
const employeeContractPanel = document.getElementById("employeeContractPanel");
const planningAuthorizationHint = document.getElementById("planningAuthorizationHint");
const freeDayEmployeeSelect = document.getElementById("freeDayEmployee");
const freeDayDateInput = document.getElementById("freeDayDate");
const freeDayReasonInput = document.getElementById("freeDayReason");
const submitFreeDayButton = document.getElementById("submitFreeDayButton");
const vacationEmployeeSelect = document.getElementById("vacationEmployee");
const vacationStartDateInput = document.getElementById("vacationStartDate");
const vacationEndDateInput = document.getElementById("vacationEndDate");
const vacationReasonInput = document.getElementById("vacationReason");
const submitVacationButton = document.getElementById("submitVacationButton");
const sickEmployeeSelect = document.getElementById("sickEmployee");
const sickDateInput = document.getElementById("sickDate");
const sickReasonInput = document.getElementById("sickReason");
const submitSickButton = document.getElementById("submitSickButton");
const swapEmployeeSelect = document.getElementById("swapEmployee");
const swapDateInput = document.getElementById("swapDate");
const swapEntrySelect = document.getElementById("swapEntry");
const swapTargetEmployeeSelect = document.getElementById("swapTargetEmployee");
const swapTargetHint = document.getElementById("swapTargetHint");
const swapSuggestionList = document.getElementById("swapSuggestionList");
const swapNoCandidateHelp = document.getElementById("swapNoCandidateHelp");
const swapEscalateButton = document.getElementById("swapEscalateButton");
const submitSwapButton = document.getElementById("submitSwapButton");
const openTimeOffRequestsContainer = document.getElementById("openTimeOffRequests");
const openSwapRequestsContainer = document.getElementById("openSwapRequests");
const handledTimeOffRequestsContainer = document.getElementById("handledTimeOffRequests");
const handledSwapRequestsContainer = document.getElementById("handledSwapRequests");
const plannerFreeRequestsContainer = document.getElementById("plannerFreeRequests");
const plannerVacationRequestsContainer = document.getElementById("plannerVacationRequests");
const plannerSickRequestsContainer = document.getElementById("plannerSickRequests");
const plannerSwapRequestsContainer = document.getElementById("plannerSwapRequests");
const requestsOpenSummary = document.getElementById("requestsOpenSummary");
const requestsEmployeeBadge = document.getElementById("requestsEmployeeBadge");
const requestsOpenCards = document.getElementById("requestsOpenCards");
const requestStatusFilter = document.getElementById("requestStatusFilter");
const requestTypeFreeButton = document.getElementById("requestTypeFreeButton");
const requestTypeVacationButton = document.getElementById("requestTypeVacationButton");
const requestTypeSickButton = document.getElementById("requestTypeSickButton");
const requestTypeSwapButton = document.getElementById("requestTypeSwapButton");
const requestFreeComposer = document.getElementById("requestFreeComposer");
const requestVacationComposer = document.getElementById("requestVacationComposer");
const requestSickComposer = document.getElementById("requestSickComposer");
const requestSwapComposer = document.getElementById("requestSwapComposer");
const requestsTopPanel = document.querySelector('[data-panel="requests"][data-slot="top"]');
const requestTimeOffPanel = document.getElementById("requestTimeOffPanel");
const requestSwapPanel = document.getElementById("requestSwapPanel");
const requestOpenHeading = document.getElementById("requestOpenHeading");
const requestOpenNote = document.getElementById("requestOpenNote");
const requestHandledHeading = document.getElementById("requestHandledHeading");
const requestHandledNote = document.getElementById("requestHandledNote");
const timeOffRequestsContainer = requestTimeOffPanel;
const swapRequestsContainer = requestSwapPanel;
const plannerDashboard = document.getElementById("plannerDashboard");
const navTabs = Array.from(document.querySelectorAll(".nav-tab"));
const plannerOnlyTabs = Array.from(document.querySelectorAll(".planner-only-tab"));
const mobileNavButtons = Array.from(document.querySelectorAll(".mobile-nav-button"));
const appPanels = Array.from(document.querySelectorAll(".app-panel"));
const planningEmployeeSearchInput = document.getElementById("planningEmployeeSearch");
const portalEmployeeSelect = document.getElementById("portalEmployee");
const portalEmployeeBadge = document.getElementById("portalEmployeeBadge");

const employeeEditorDrafts = {};
const portalEmployeeSearchInput = document.getElementById("portalEmployeeSearch");
const myScheduleWeekInput = document.getElementById("myScheduleWeek");
const mySchedulePreviousWeekButton = document.getElementById("mySchedulePreviousWeekButton");
const myScheduleCurrentWeekButton = document.getElementById("myScheduleCurrentWeekButton");
const myScheduleNextWeekButton = document.getElementById("myScheduleNextWeekButton");
const portalPreviousEmployeeButton = document.getElementById("portalPreviousEmployeeButton");
const portalNextEmployeeButton = document.getElementById("portalNextEmployeeButton");
const homeSummary = document.getElementById("homeSummary");
const homeWeekOverview = document.getElementById("homeWeekOverview");
const quickLinks = Array.from(document.querySelectorAll(".quick-link"));
const hoursEmployeeSelect = document.getElementById("hoursEmployee");
const hoursEmployeeBadge = document.getElementById("hoursEmployeeBadge");
const hoursEmployeeSearchInput = document.getElementById("hoursEmployeeSearch");
const hoursDateInput = document.getElementById("hoursDate");
const hoursWeekInput = document.getElementById("hoursWeek");
const hoursPreviousWeekButton = document.getElementById("hoursPreviousWeekButton");
const hoursCurrentWeekButton = document.getElementById("hoursCurrentWeekButton");
const hoursNextWeekButton = document.getElementById("hoursNextWeekButton");
const submitWeekHoursButton = document.getElementById("submitWeekHoursButton");
const hoursPreviousEmployeeButton = document.getElementById("hoursPreviousEmployeeButton");
const hoursNextEmployeeButton = document.getElementById("hoursNextEmployeeButton");
const approvalWeekInput = document.getElementById("approvalWeek");
const approvalEmployeeSelect = document.getElementById("approvalEmployee");
const hoursExportPeriodSelect = document.getElementById("hoursExportPeriod");
const hoursExportWeekLabel = document.getElementById("hoursExportWeekLabel");
const hoursExportWeekInput = document.getElementById("hoursExportWeek");
const hoursExportMonthLabel = document.getElementById("hoursExportMonthLabel");
const hoursExportMonthInput = document.getElementById("hoursExportMonth");
const hoursExportButton = document.getElementById("hoursExportButton");
const myHoursSectionSwitch = document.getElementById("myHoursSectionSwitch");
const myHoursFillButton = document.getElementById("myHoursFillButton");
const myHoursTodayButton = document.getElementById("myHoursTodayButton");
const myHoursMissingButton = document.getElementById("myHoursMissingButton");
const myHoursHighlight = document.getElementById("myHoursHighlight");
const myHoursRegistrations = document.getElementById("myHoursRegistrations");
const hoursApprovalQueue = document.getElementById("hoursApprovalQueue");
const messageBox = document.getElementById("message");
const totalsCard = document.querySelector(".totals-card");
const weekInput = document.getElementById("week");
const weekFilterInput = document.getElementById("weekFilter");
const weekStatusOverview = document.getElementById("weekStatusOverview");
const plannerControlPanel = document.getElementById("plannerControlPanel");
const weekReviewStatusPanel = document.getElementById("weekReviewStatusPanel");
const autoFillSummaryOverview = document.getElementById("autoFillSummaryOverview");
const plannerContractOverview = document.getElementById("plannerContractOverview");
const deviationWhyOverview = document.getElementById("deviationWhyOverview");
const controlModeOverview = document.getElementById("controlModeOverview");
const planningOverviewTitle = document.getElementById("planningOverviewTitle");
const planningOverviewList = document.getElementById("planningOverviewList");
const rosterLegend = document.querySelector(".roster-legend");
const employeeFilterInput = document.getElementById("employeeFilter");
const employeeSearchInput = document.getElementById("employeeSearch");
const dayFilterInput = document.getElementById("dayFilter");
const clearFiltersButton = document.getElementById("clearFiltersButton");
const openReplacementOverview = document.getElementById("openReplacementOverview");
const weekReplacementOverview = document.getElementById("weekReplacementOverview");
const weekdayOptions = Array.from(document.querySelectorAll(".weekday-option"));
const dayPlannerPanel = document.getElementById("dayPlannerPanel");
const dayPlannerDateInput = document.getElementById("dayPlannerDate");
const dayPlannerSummary = document.getElementById("dayPlannerSummary");
const dayPlannerAbsenceList = document.getElementById("dayPlannerAbsenceList");
const dayPlannerOpenList = document.getElementById("dayPlannerOpenList");
const dayPlannerList = document.getElementById("dayPlannerList");
const dayPlannerNote = document.querySelector("#dayPlannerPanel .panel-note");
const smartFillDayButton = document.getElementById("smartFillDayButton");
const autoFillShopDayButton = document.getElementById("autoFillShopDayButton");
const saveDayPlannerButton = document.getElementById("saveDayPlannerButton");
const appShell = document.querySelector(".app-shell");
const storageKey = "urenrooster-entries";
const employeeStorageKey = "urenrooster-employees";
const shiftStorageKey = "urenrooster-shifts";
const shiftCatalogVersionKey = "urenrooster-shift-catalog-version";
const shiftCatalogVersion = "2026-04-11-bakkerij-allrounddiensten";
const planningSettingsStorageKey = "urenrooster-planning-settings";
const preferencesStorageKey = "urenrooster-preferences";
const timeOffStorageKey = "urenrooster-time-off-requests";
const swapStorageKey = "urenrooster-swap-requests";
const workLogStorageKey = "urenrooster-work-logs";
const employeePermissionsStorageKey = "urenrooster-employee-permissions";
const employeeStandardShiftStorageKey = "urenrooster-employee-standard-shifts";
const employeeShiftPreferenceStorageKey = "urenrooster-employee-shift-preferences";
const employeeBasePatternStorageKey = "urenrooster-employee-base-patterns";
const employeeCustomRosterStorageKey = "urenrooster-employee-custom-rosters";
const employeeMetaStorageKey = "urenrooster-employee-meta";
const auditLogStorageKey = "urenrooster-audit-log";
const backupStorageKey = "urenrooster-backups";
const mailSettingsStorageKey = "urenrooster-mail-settings";

const preferences = loadPreferences();
let currentDataMode = "live";
if (preferences.lastDataMode !== "live") {
  preferences.lastDataMode = "live";
}
const entries = loadEntries();
const employees = loadEmployees();
const shifts = loadShifts();
const planningSettings = loadPlanningSettings();
const timeOffRequests = loadTimeOffRequests();
const swapRequests = loadSwapRequests();
const workLogs = loadWorkLogs();
const employeePermissions = loadEmployeePermissions();
const employeeStandardShifts = loadEmployeeStandardShifts();
const employeeShiftPreferences = loadEmployeeShiftPreferences();
const employeeBasePatterns = loadEmployeeBasePatterns();
const employeeCustomRosters = loadEmployeeCustomRosters();
const employeeMeta = loadEmployeeMeta();
const mailSettings = loadMailSettings();
const auditLog = loadAuditLog();
const backupHistory = loadBackupHistory();
let editIndex = null;
let editingShiftId = null;
let activeTab = "week-current";
let activeEmployeeWeekView = "today";
let activeRole = preferences.lastRole === "employee" ? "employee" : "planner";
let editingTimeOffId = null;
let editingSwapId = null;
let activeRequestComposer = "";
let activeRequestType = "vrije-dag";
let vrijeDagForm = {
  employeeName: "",
  type: "vrij",
  date: "",
  startDate: "",
  endDate: "",
  reason: ""
};
let vakantieForm = {
  employeeName: "",
  type: "vakantie",
  date: "",
  startDate: "",
  endDate: "",
  reason: ""
};
let ziekmeldingForm = {
  employeeName: "",
  type: "ziek",
  date: "",
  startDate: "",
  endDate: "",
  reason: ""
};
let ruilForm = {
  employeeName: "",
  date: "",
  entryValue: "",
  targetEmployeeName: ""
};
let showSuitableEmployees = false;
let autoFillPreviewEntries = [];
let undoState = null;
let pendingPlannerFocus = null;
let planningOverviewExpandedWeek = "";
const mobileMediaQuery = window.matchMedia("(max-width: 640px)");
let messageTimeoutId = null;
let activeMessageState = null;
let queuedMessageStates = [];
const employeeAllowedTabs = ["week-current", "my-schedule", "my-hours", "requests"];
let planningDataRevision = 0;
let requestDataRevision = 0;
let previewDataRevision = 0;
let activeMyHoursSection = "";
let activeMyHoursEntryMode = "planned";
let lastOpenRequestReminderKey = "";
let lastEmployeeHoursReminderKey = "";
const derivedDataCache = {
  planningEntriesKey: "",
  planningEntries: [],
  visibleEntriesKey: "",
  visibleEntries: [],
  filteredEntriesKey: "",
  filteredEntries: [],
  approvedTimeOffKey: "",
  approvedTimeOff: []
};

const { setClassName = function fallbackSetClassName(element, value) {
  if (!element) {
    return;
  }

  element.className = value;
} } = window.StroetDomUtils || {};

if (dayPlannerNote) {
  dayPlannerNote.textContent = "Kies een dag en plan alle diensten van die dag in een keer.";
}

mergeEmployeesFromEntries();
ensureConfiguredBakeryEmployees();
syncEmployeeMeta();
syncEmployeePermissions();
syncEmployeeStandardShifts();
syncEmployeeShiftPreferences();
syncEmployeeBasePatterns();
syncEmployeeCustomRosters();

function getScopedStorageKey(baseKey) {
  return currentDataMode === "test" ? `${baseKey}__test` : baseKey;
}

function getScopedStorageKeyForMode(baseKey, mode) {
  return mode === "test" ? `${baseKey}__test` : baseKey;
}

function reportAppError(userMessage, error, context = "") {
  console.error(`[Urenrooster] ${context || "app-fout"}`, error);
  if (typeof showMessage === "function" && messageBox) {
    showMessage(userMessage, "error");
  }
}

function safeSetStorageItem(storageKeyName, serializedValue, label = "gegevens") {
  try {
    localStorage.setItem(storageKeyName, serializedValue);
    return true;
  } catch (error) {
    reportAppError(`Opslaan mislukt voor ${label}. Probeer het opnieuw of maak eerst een back-up.`, error, `save:${label}`);
    return false;
  }
}

function sanitizeEmployeesForStorage(sourceEmployees = employees) {
  return [...new Set(
    sourceEmployees
      .filter((employee) => typeof employee === "string" && employee.trim() !== "")
      .map((employee) => employee.trim())
  )].sort((nameA, nameB) => nameA.localeCompare(nameB, "nl"));
}

function sanitizeEntriesForStorage(sourceEntries = entries) {
  const uniqueEntries = [];
  const seenKeys = new Set();

  sourceEntries.forEach((entry) => {
    if (!entry || typeof entry.name !== "string" || typeof entry.day !== "string" || typeof entry.startTime !== "string" || typeof entry.endTime !== "string") {
      return;
    }

    const normalizedEntry = {
      ...entry,
      name: entry.name.trim(),
      day: entry.day,
      startTime: entry.startTime,
      endTime: entry.endTime,
      hours: Number.isFinite(Number(entry.hours)) ? Number(entry.hours) : (calculateHours(entry.startTime, entry.endTime) || 0),
      shiftId: typeof entry.shiftId === "string" ? entry.shiftId : "",
      shiftName: typeof entry.shiftName === "string" ? entry.shiftName.trim() : "",
      proposed: Boolean(entry.proposed),
      replacementFor: typeof entry.replacementFor === "string" ? entry.replacementFor.trim() : "",
      autoFillReason: typeof entry.autoFillReason === "string" ? entry.autoFillReason.trim() : "",
      autoFillReasonDetail: typeof entry.autoFillReasonDetail === "string" ? entry.autoFillReasonDetail.trim() : ""
    };

    if (!normalizedEntry.name || !normalizedEntry.day) {
      return;
    }

    const entryKey = [
      normalizedEntry.name.toLowerCase(),
      normalizedEntry.day,
      normalizedEntry.startTime,
      normalizedEntry.endTime,
      normalizedEntry.shiftId.toLowerCase(),
      normalizedEntry.shiftName.toLowerCase(),
      normalizedEntry.replacementFor.toLowerCase(),
      normalizedEntry.proposed ? "1" : "0"
    ].join("|");

    if (seenKeys.has(entryKey)) {
      return;
    }

    seenKeys.add(entryKey);
    uniqueEntries.push(normalizedEntry);
  });

  return uniqueEntries;
}

function sanitizeTimeOffRequestsForStorage(sourceRequests = timeOffRequests) {
  const uniqueRequests = [];
  const seenIds = new Set();

  sourceRequests.forEach((request) => {
    if (!request || typeof request.id !== "string" || typeof request.employeeName !== "string") {
      return;
    }

    if (seenIds.has(request.id)) {
      return;
    }

    const normalizedType = typeof request.type === "string" ? request.type : "vrij";
    const normalizedStartDate = typeof request.startDate === "string" && request.startDate
      ? request.startDate
      : (typeof request.date === "string" ? request.date : "");
    const normalizedEndDate = normalizedType === "vakantie"
      ? ((typeof request.endDate === "string" && request.endDate) ? request.endDate : normalizedStartDate)
      : normalizedStartDate;

    if (!normalizedStartDate) {
      return;
    }

    seenIds.add(request.id);
    uniqueRequests.push({
      ...request,
      employeeName: request.employeeName.trim(),
      reason: typeof request.reason === "string" ? request.reason.trim() : "",
      managerNote: typeof request.managerNote === "string" ? request.managerNote.trim() : "",
      mailLog: sanitizeRequestMailLog(request.mailLog),
      status: request.status === "pending" ? "open" : request.status,
      type: normalizedType,
      date: normalizedStartDate,
      startDate: normalizedStartDate,
      endDate: normalizedEndDate,
      createdAt: typeof request.createdAt === "string" ? request.createdAt : "",
      updatedAt: typeof request.updatedAt === "string" ? request.updatedAt : (typeof request.createdAt === "string" ? request.createdAt : "")
    });
  });

  return uniqueRequests;
}

function sanitizeSwapRequestsForStorage(sourceRequests = swapRequests) {
  const uniqueRequests = [];
  const seenIds = new Set();

  sourceRequests.forEach((request) => {
    if (!request || typeof request.id !== "string" || typeof request.employeeName !== "string" || typeof request.date !== "string") {
      return;
    }

    if (seenIds.has(request.id)) {
      return;
    }

    seenIds.add(request.id);
    uniqueRequests.push({
      ...request,
      employeeName: request.employeeName.trim(),
      targetEmployeeName: typeof request.targetEmployeeName === "string" ? request.targetEmployeeName.trim() : "",
      shiftName: typeof request.shiftName === "string" ? request.shiftName.trim() : "",
      managerNote: typeof request.managerNote === "string" ? request.managerNote.trim() : "",
      escalatedToPlanner: Boolean(request.escalatedToPlanner),
      autoApproved: Boolean(request.autoApproved),
      mailLog: sanitizeRequestMailLog(request.mailLog),
      status: request.status === "pending" ? "open" : request.status,
      createdAt: typeof request.createdAt === "string" ? request.createdAt : "",
      updatedAt: typeof request.updatedAt === "string" ? request.updatedAt : (typeof request.createdAt === "string" ? request.createdAt : "")
    });
  });

  return uniqueRequests;
}

function sanitizeWorkLogsForStorage(sourceLogs = workLogs) {
  const uniqueLogs = [];
  const seenIds = new Set();

  sourceLogs.forEach((log) => {
    if (!log || typeof log.id !== "string" || typeof log.employeeName !== "string" || typeof log.day !== "string" || typeof log.shiftName !== "string") {
      return;
    }

    if (seenIds.has(log.id)) {
      return;
    }

    seenIds.add(log.id);
      uniqueLogs.push({
        ...log,
        employeeName: log.employeeName.trim(),
        shiftName: log.shiftName.trim(),
        breakMinutes: Number.isFinite(Number(log.breakMinutes)) ? Math.max(0, Number(log.breakMinutes)) : 0,
        notes: typeof log.notes === "string" ? log.notes : "",
        managerNote: typeof log.managerNote === "string" ? log.managerNote : "",
        employeeReply: typeof log.employeeReply === "string" ? log.employeeReply : "",
        mailLog: sanitizeRequestMailLog(log.mailLog)
      });
  });

  return uniqueLogs;
}

function replaceArrayContents(target, nextItems) {
  target.splice(0, target.length, ...nextItems);
}

function replaceObjectContents(target, nextObject) {
  Object.keys(target).forEach((key) => {
    delete target[key];
  });
  Object.assign(target, nextObject);
}

function getTestModeLabel() {
  return "Live gegevens";
}

function getTestSeedEmployeeNames() {
  return ["Jan", "Piet", "Sara", "Noor", "Milan"];
}

function getConfiguredBakeryEmployeeNames() {
  return [
    "Bernard",
    "Bjorn",
    "Chantal",
    "Duuk",
    "Emille",
    "Gerry",
    "Jaap",
    "Jos",
    "Johan",
    "Kevin",
    "Lindsey",
    "Luna",
    "Marnix",
    "Monique",
    "Niek",
    "Richard H",
    "Richard R",
    "Ronny",
    "Ryan",
    "Saskia",
    "Sophie",
    "Twan",
    "Wendy",
    "Yuliet"
  ];
}

function ensureConfiguredBakeryEmployees() {
  const configuredEmployees = getConfiguredBakeryEmployeeNames();
  const missingEmployees = configuredEmployees.filter((employeeName) => !employees.includes(employeeName));

  if (!missingEmployees.length) {
    return;
  }

  employees.push(...missingEmployees);
  employees.sort((nameA, nameB) => nameA.localeCompare(nameB, "nl"));
  saveEmployees();
}

function getEmployeesForMode(mode) {
  const savedEmployees = localStorage.getItem(getScopedStorageKeyForMode(employeeStorageKey, mode));

  if (!savedEmployees) {
    return mode === "test" ? getTestSeedEmployeeNames() : [];
  }

  try {
    const parsedEmployees = JSON.parse(savedEmployees);

    if (!Array.isArray(parsedEmployees)) {
      return mode === "test" ? getTestSeedEmployeeNames() : [];
    }

    const normalizedEmployees = [...new Set(
      parsedEmployees
        .filter((employee) => typeof employee === "string" && employee.trim() !== "")
        .map((employee) => employee.trim())
    )].sort((nameA, nameB) => nameA.localeCompare(nameB, "nl"));

    return normalizedEmployees.length ? normalizedEmployees : (mode === "test" ? getTestSeedEmployeeNames() : []);
  } catch {
    return mode === "test" ? getTestSeedEmployeeNames() : [];
  }
}

function getEmployeeMetaForMode(mode, modeEmployees = getEmployeesForMode(mode)) {
  const savedMeta = localStorage.getItem(getScopedStorageKeyForMode(employeeMetaStorageKey, mode));
  const defaults = Object.fromEntries(modeEmployees.map((employeeName) => [employeeName, getEmployeeStatusMetaDefaults()]));

  if (!savedMeta) {
    return defaults;
  }

  try {
    const parsedMeta = JSON.parse(savedMeta);
    const normalized = {};

    modeEmployees.forEach((employeeName) => {
      normalized[employeeName] = {
        status: normalizeEmployeeStatus(parsedMeta?.[employeeName]?.status),
        updatedAt: typeof parsedMeta?.[employeeName]?.updatedAt === "string" ? parsedMeta[employeeName].updatedAt : "",
        updatedByRole: parsedMeta?.[employeeName]?.updatedByRole === "planner" ? "planner" : (parsedMeta?.[employeeName]?.updatedByRole === "employee" ? "employee" : ""),
        updatedByName: typeof parsedMeta?.[employeeName]?.updatedByName === "string" ? parsedMeta[employeeName].updatedByName : ""
      };
    });

    return normalized;
  } catch {
    return defaults;
  }
}

function getLoginRoleValue() {
  return loginRoleSelect?.value === "employee" ? "employee" : "planner";
}

function hasRememberedUserSession() {
  return hasRememberedUserSessionHelper(preferences);
}

function needsLoginSelection() {
  return needsLoginSelectionHelper(hasRememberedUserSession(), activeRole, getEmployeeIdentity());
}

function loadEntries() {
  const savedEntries = localStorage.getItem(getScopedStorageKey(storageKey));

  if (!savedEntries) {
    return [];
  }

  try {
    const parsedEntries = JSON.parse(savedEntries);

    if (!Array.isArray(parsedEntries)) {
      return [];
    }

    const normalizedEntries = parsedEntries.filter((entry) =>
      entry &&
      typeof entry.name === "string" &&
      typeof entry.day === "string" &&
      typeof entry.startTime === "string" &&
      typeof entry.endTime === "string" &&
      Number.isFinite(Number(entry.hours))
    ).map((entry) => ({
      ...entry,
      name: entry.name.trim(),
      hours: Number(entry.hours),
      shiftId: typeof entry.shiftId === "string" ? entry.shiftId : "",
      shiftName: typeof entry.shiftName === "string" ? entry.shiftName.trim() : "",
      proposed: Boolean(entry.proposed),
      replacementFor: typeof entry.replacementFor === "string" ? entry.replacementFor.trim() : "",
      autoFillReason: typeof entry.autoFillReason === "string" ? entry.autoFillReason.trim() : "",
      autoFillReasonDetail: typeof entry.autoFillReasonDetail === "string" ? entry.autoFillReasonDetail.trim() : ""
    }));

    const uniqueEntries = [];
    const seenKeys = new Set();

    normalizedEntries.forEach((entry) => {
      const entryKey = [
        entry.name.trim().toLowerCase(),
        entry.day,
        entry.startTime,
        entry.endTime,
        (entry.shiftId || "").toLowerCase(),
        (entry.shiftName || "").toLowerCase(),
        (entry.replacementFor || "").toLowerCase(),
        entry.proposed ? "1" : "0"
      ].join("|");

      if (seenKeys.has(entryKey)) {
        return;
      }

      seenKeys.add(entryKey);
      uniqueEntries.push(entry);
    });

    return uniqueEntries;
  } catch {
    return [];
  }
}

function saveEntries() {
  planningDataRevision += 1;
  derivedDataCache.planningEntriesKey = "";
  derivedDataCache.visibleEntriesKey = "";
  derivedDataCache.filteredEntriesKey = "";
  replaceArrayContents(entries, sanitizeEntriesForStorage(entries));
  safeSetStorageItem(getScopedStorageKey(storageKey), JSON.stringify(entries), "rooster");
}

function cloneEntriesState(sourceEntries) {
  return sourceEntries.map((entry) => ({ ...entry }));
}

function setUndoState(label = "Laatste wijziging") {
  undoState = {
    label,
    entries: cloneEntriesState(entries),
    previewEntries: cloneEntriesState(autoFillPreviewEntries)
  };
  updateUndoButton();
}

function clearUndoState() {
  undoState = null;
  updateUndoButton();
}

function restoreEntriesState(snapshotEntries, snapshotPreviewEntries = []) {
  entries.splice(0, entries.length, ...cloneEntriesState(snapshotEntries));
  autoFillPreviewEntries = cloneEntriesState(snapshotPreviewEntries);
  previewDataRevision += 1;
  derivedDataCache.planningEntriesKey = "";
  derivedDataCache.visibleEntriesKey = "";
  derivedDataCache.filteredEntriesKey = "";
  saveEntries();
}

function updateUndoButton() {
  if (!undoButton) {
    return;
  }

  const shouldHide = !isPlannerRole() || !undoState;
  undoButton.classList.toggle("hidden", shouldHide);
  undoButton.title = undoState?.label || "";
}

function getPlanningEntries() {
  const cacheKey = `${planningDataRevision}:${previewDataRevision}`;

  if (derivedDataCache.planningEntriesKey === cacheKey) {
    return derivedDataCache.planningEntries;
  }

  const nextEntries = [...entries, ...autoFillPreviewEntries];
  derivedDataCache.planningEntriesKey = cacheKey;
  derivedDataCache.planningEntries = nextEntries;
  return nextEntries;
}

function getPlanningEntrySlotKey(entry) {
  return getPlanningEntrySlotKeyHelper(entry, {
    getShiftName
  });
}

function mergePlanningEntries(sourceEntries = entries, fallbackEntries = entries) {
  return mergePlanningEntriesHelper(sourceEntries, fallbackEntries, {
    getShiftName
  });
}

function loadTimeOffRequests() {
  const savedRequests = localStorage.getItem(getScopedStorageKey(timeOffStorageKey));

  if (!savedRequests) {
    return [];
  }

  try {
    const parsedRequests = JSON.parse(savedRequests);

    if (!Array.isArray(parsedRequests)) {
      return [];
    }

    const normalizedRequests = parsedRequests.filter((request) =>
      request &&
      typeof request.id === "string" &&
      typeof request.employeeName === "string" &&
      typeof request.reason === "string" &&
      typeof request.status === "string"
    ).map((request) => ({
      ...request,
      employeeName: request.employeeName.trim(),
      reason: request.reason.trim(),
      managerNote: typeof request.managerNote === "string" ? request.managerNote.trim() : "",
      mailLog: sanitizeRequestMailLog(request.mailLog),
      status: request.status === "pending" ? "open" : request.status,
      type: typeof request.type === "string" ? request.type : "vrij",
      date: typeof request.startDate === "string" && request.startDate
        ? request.startDate
        : (typeof request.date === "string" ? request.date : ""),
      startDate: typeof request.startDate === "string" && request.startDate
        ? request.startDate
        : (typeof request.date === "string" ? request.date : ""),
      endDate: (typeof request.type === "string" ? request.type : "vrij") === "vakantie"
        ? ((typeof request.endDate === "string" && request.endDate)
          ? request.endDate
          : ((typeof request.startDate === "string" && request.startDate)
            ? request.startDate
            : (typeof request.date === "string" ? request.date : "")))
        : ((typeof request.startDate === "string" && request.startDate)
          ? request.startDate
          : (typeof request.date === "string" ? request.date : "")),
      createdAt: typeof request.createdAt === "string" ? request.createdAt : "",
      updatedAt: typeof request.updatedAt === "string" ? request.updatedAt : (typeof request.createdAt === "string" ? request.createdAt : "")
    })).filter((request) => typeof request.date === "string" && request.date);

    return normalizedRequests.filter((request, index, source) =>
      source.findIndex((candidate) => candidate.id === request.id) === index
    );
  } catch {
    return [];
  }
}

function saveTimeOffRequests() {
  requestDataRevision += 1;
  derivedDataCache.approvedTimeOffKey = "";
  replaceArrayContents(timeOffRequests, sanitizeTimeOffRequestsForStorage(timeOffRequests));
  safeSetStorageItem(getScopedStorageKey(timeOffStorageKey), JSON.stringify(timeOffRequests), "aanvragen");
}

function loadSwapRequests() {
  const savedRequests = localStorage.getItem(getScopedStorageKey(swapStorageKey));

  if (!savedRequests) {
    return [];
  }

  try {
    const parsedRequests = JSON.parse(savedRequests);

    if (!Array.isArray(parsedRequests)) {
      return [];
    }

    const normalizedRequests = parsedRequests.filter((request) =>
      request &&
      typeof request.id === "string" &&
      typeof request.employeeName === "string" &&
      typeof request.targetEmployeeName === "string" &&
      typeof request.date === "string" &&
      typeof request.shiftId === "string" &&
      typeof request.shiftName === "string" &&
      typeof request.startTime === "string" &&
      typeof request.endTime === "string" &&
      typeof request.status === "string"
    ).map((request) => ({
      ...request,
      employeeName: request.employeeName.trim(),
      targetEmployeeName: request.targetEmployeeName.trim(),
      shiftName: request.shiftName.trim(),
      managerNote: typeof request.managerNote === "string" ? request.managerNote.trim() : "",
      mailLog: sanitizeRequestMailLog(request.mailLog),
      status: request.status === "pending" ? "open" : request.status,
      createdAt: typeof request.createdAt === "string" ? request.createdAt : "",
      updatedAt: typeof request.updatedAt === "string" ? request.updatedAt : (typeof request.createdAt === "string" ? request.createdAt : "")
    }));

    return normalizedRequests.filter((request, index, source) =>
      source.findIndex((candidate) => candidate.id === request.id) === index
    );
  } catch {
    return [];
  }
}

function saveSwapRequests() {
  requestDataRevision += 1;
  replaceArrayContents(swapRequests, sanitizeSwapRequestsForStorage(swapRequests));
  safeSetStorageItem(getScopedStorageKey(swapStorageKey), JSON.stringify(swapRequests), "ruilverzoeken");
}

function loadWorkLogs() {
  const savedLogs = localStorage.getItem(getScopedStorageKey(workLogStorageKey));

  if (!savedLogs) {
    return [];
  }

  try {
    const parsedLogs = JSON.parse(savedLogs);

    if (!Array.isArray(parsedLogs)) {
      return [];
    }

    const normalizedLogs = parsedLogs.filter((log) =>
      log &&
      typeof log.id === "string" &&
      typeof log.employeeName === "string" &&
      typeof log.day === "string" &&
      typeof log.shiftName === "string" &&
      typeof log.plannedStart === "string" &&
      typeof log.plannedEnd === "string"
    ).map((log) => ({
      id: log.id,
      employeeName: log.employeeName.trim(),
      day: log.day,
      shiftName: log.shiftName.trim(),
      plannedStart: log.plannedStart,
      plannedEnd: log.plannedEnd,
      actualStart: typeof log.actualStart === "string" ? log.actualStart : "",
      actualEnd: typeof log.actualEnd === "string" ? log.actualEnd : "",
      breakMinutes: Number.isFinite(Number(log.breakMinutes)) ? Math.max(0, Number(log.breakMinutes)) : 0,
      notes: typeof log.notes === "string" ? log.notes : "",
        status: ["draft", "open", "approved", "rejected", "revision"].includes(log.status)
          ? log.status
          : (log.status === "submitted" ? "open" : "draft"),
        managerNote: typeof log.managerNote === "string" ? log.managerNote : "",
        employeeReply: typeof log.employeeReply === "string" ? log.employeeReply : "",
        submittedAt: typeof log.submittedAt === "string" ? log.submittedAt : "",
        updatedAt: typeof log.updatedAt === "string" ? log.updatedAt : "",
        mailLog: sanitizeRequestMailLog(log.mailLog),
        auditTrail: Array.isArray(log.auditTrail)
        ? log.auditTrail
          .filter((auditItem) => auditItem && typeof auditItem.at === "string" && typeof auditItem.action === "string")
          .map((auditItem) => ({
            at: auditItem.at,
            action: auditItem.action,
            actorRole: auditItem.actorRole === "planner" ? "planner" : "employee",
            actorName: typeof auditItem.actorName === "string" ? auditItem.actorName : "",
            summary: typeof auditItem.summary === "string" ? auditItem.summary : ""
          }))
        : []
    }));

    return normalizedLogs.filter((log, index, source) =>
      source.findIndex((candidate) => candidate.id === log.id) === index
    );
  } catch {
    return [];
  }
}

function saveWorkLogs() {
  replaceArrayContents(workLogs, sanitizeWorkLogsForStorage(workLogs));
  safeSetStorageItem(getScopedStorageKey(workLogStorageKey), JSON.stringify(workLogs), "urenregistratie");
}

const {
  formatDateTime = function fallbackFormatDateTime(value) {
    return new Intl.DateTimeFormat("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(value));
  }
} = window.StroetFormatUtils || {};

const {
  getNowIsoString = function fallbackGetNowIsoString() {
    return new Date().toISOString();
  },
  getCurrentRoundedTimeValue = function fallbackGetCurrentRoundedTimeValue(stepMinutes = 5) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const roundedMinutes = Math.floor(minutes / stepMinutes) * stepMinutes;
    return `${String(hours).padStart(2, "0")}:${String(roundedMinutes).padStart(2, "0")}`;
  },
  getTodayLocalDateValue = function fallbackGetTodayLocalDateValue() {
    const now = new Date();
    const localDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
    return localDate.toISOString().slice(0, 10);
  },
  isIsoOlderThanHours = function fallbackIsIsoOlderThanHours(value, hours = 48) {
    if (!value) {
      return false;
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      return false;
    }

    return (Date.now() - parsedDate.getTime()) >= (hours * 60 * 60 * 1000);
  },
  isFutureDateValue = function fallbackIsFutureDateValue(dateValue) {
    if (!dateValue) {
      return false;
    }

    return dateValue > getTodayLocalDateValue();
  },
  getFiveMinuteTimeValues = function fallbackGetFiveMinuteTimeValues() {
    const values = [];

    for (let hour = 0; hour < 24; hour += 1) {
      for (let minute = 0; minute < 60; minute += 5) {
        values.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
      }
    }

    return values;
  },
  buildTimeSelectOptions = function fallbackBuildTimeSelectOptions(selectedValue) {
    const normalizedValue = selectedValue && fiveMinuteTimeValues.includes(selectedValue)
      ? selectedValue
      : "";

    const placeholder = `<option value="" ${normalizedValue === "" ? "selected" : ""}>Kies tijd</option>`;
    const options = fiveMinuteTimeValues
      .map((value) => `<option value="${value}" ${value === normalizedValue ? "selected" : ""}>${value}</option>`)
      .join("");

    return `${placeholder}${options}`;
  },
  buildBreakSelectOptions = function fallbackBuildBreakSelectOptions(selectedValue = 0) {
    const normalizedValue = Math.max(0, Number(selectedValue) || 0);
    const options = [];

    for (let minutes = 0; minutes <= 240; minutes += 5) {
      options.push(`<option value="${minutes}" ${minutes === normalizedValue ? "selected" : ""}>${minutes} min</option>`);
    }

    return options.join("");
  }
} = window.StroetDateUtils || {};

const fiveMinuteTimeValues = getFiveMinuteTimeValues();

function getDefaultLastWorkLogTimes() {
  return {
    actualStart: "",
    actualEnd: "",
    breakMinutes: 0
  };
}

function normalizeLastWorkLogTimes(value) {
  const defaults = getDefaultLastWorkLogTimes();

  if (!value || typeof value !== "object") {
    return defaults;
  }

  return {
    actualStart: typeof value.actualStart === "string" && fiveMinuteTimeValues.includes(value.actualStart)
      ? value.actualStart
      : defaults.actualStart,
    actualEnd: typeof value.actualEnd === "string" && fiveMinuteTimeValues.includes(value.actualEnd)
      ? value.actualEnd
      : defaults.actualEnd,
    breakMinutes: Number.isFinite(Number(value.breakMinutes))
      ? Math.max(0, Number(value.breakMinutes))
      : defaults.breakMinutes
  };
}

function getWorkLogQuickPresets(field, currentValue = "") {
  const lastUsed = normalizeLastWorkLogTimes(preferences.lastWorkLogTimes);
  const presetMap = {
    actualStart: ["06:00", "08:00", "12:00"],
    actualEnd: ["08:00", "12:00", "17:00"],
    breakMinutes: [0, 15, 30]
  };
  const labelMap = {
    actualStart: "Laatst gebruikt",
    actualEnd: "Laatst gebruikt",
    breakMinutes: "Laatste pauze"
  };
  const items = (presetMap[field] || []).map((value) => ({
    value: String(value),
    label: field === "breakMinutes" ? `${value} min` : value,
    isLastUsed: false
  }));
  const lastValue = field === "breakMinutes"
    ? String(lastUsed.breakMinutes)
    : lastUsed[field] || "";

  if (lastValue) {
    const matchingPreset = items.find((item) => item.value === lastValue);

    if (matchingPreset) {
      matchingPreset.isLastUsed = true;
    matchingPreset.label = `${matchingPreset.label} · laatst`;
    } else {
      items.unshift({
        value: lastValue,
        label: `${labelMap[field]}: ${field === "breakMinutes" ? `${lastValue} min` : lastValue}`,
        isLastUsed: true
      });
    }
  }

  return items.map((item) => ({
    ...item,
    isActive: String(currentValue) === item.value
  }));
}

function buildWorkLogQuickButtons(workLogId, field, currentValue = "", disabled = false) {
  const quickPresets = getWorkLogQuickPresets(field, currentValue);

  if (!quickPresets.length) {
    return "";
  }

  return `
    <div class="time-quick-buttons" role="group" aria-label="Snelle tijdkeuze">
      ${quickPresets.map((preset) => `
        <button
          type="button"
          class="time-quick-button ${preset.isActive ? "is-active" : ""} ${preset.isLastUsed ? "is-last-used" : ""}"
          data-worklog-quick-set="${field}"
          data-worklog-id="${workLogId}"
          data-worklog-value="${preset.value}"
          ${disabled ? "disabled" : ""}
        >${preset.label}</button>
      `).join("")}
    </div>
  `;
}

function loadEmployees() {
  const savedEmployees = localStorage.getItem(getScopedStorageKey(employeeStorageKey));

  if (!savedEmployees) {
    return [];
  }

  try {
    const parsedEmployees = JSON.parse(savedEmployees);

    if (!Array.isArray(parsedEmployees)) {
      return [];
    }

    return [...new Set(
      parsedEmployees
        .filter((employee) => typeof employee === "string" && employee.trim() !== "")
        .map((employee) => employee.trim())
    )].sort((nameA, nameB) => nameA.localeCompare(nameB, "nl"));
  } catch {
    return [];
  }
}

function saveEmployees() {
  replaceArrayContents(employees, sanitizeEmployeesForStorage(employees));
  safeSetStorageItem(getScopedStorageKey(employeeStorageKey), JSON.stringify(employees), "medewerkers");
}

const {
  formatEmployeeStatusImpact = function fallbackFormatEmployeeStatusImpact(status) {
    if (status === "inactive") {
      return "Inactief: blijft zichtbaar in historische gegevens, maar verdwijnt uit nieuwe planning, standaard keuzelijsten, aanvragen en medewerker-login.";
    }

    if (status === "former") {
      return "Uit dienst: alle oude roosters, uren, aanvragen en goedkeuringen blijven bewaard. De medewerker verdwijnt uit nieuwe planning, standaard keuzelijsten en login.";
    }

    return "Actief: zichtbaar in standaard keuzelijsten en beschikbaar voor planning, aanvragen en medewerker-login.";
  },
  getConfiguredEmployeeContractHours = function fallbackGetConfiguredEmployeeContractHours() {
    return {
      "Ronny": 38,
      "Richard H": 38,
      "Richard R": 38,
      "Lindsey": 38,
      "Marnix": 38,
      "Luna": 32,
      "Monique": 30,
      "Saskia": 28,
      "Gerry": 16,
      "Wendy": 28
    };
  },
  getDefaultEmployeeAppRole = function fallbackGetDefaultEmployeeAppRole(employeeName) {
    return ["Chantal", "Twan"].includes(employeeName) ? "planner" : "employee";
  },
  getEmployeeStatusClass = function fallbackGetEmployeeStatusClass(status) {
    if (status === "inactive") {
      return "is-inactive";
    }

    if (status === "former") {
      return "is-former";
    }

    return "is-active";
  },
  getEmployeeStatusLabel = function fallbackGetEmployeeStatusLabel(status) {
    if (status === "inactive") {
      return "Inactief";
    }

    if (status === "former") {
      return "Uit dienst";
    }

    return "Actief";
  },
  getEmployeeStatusMetaDefaults = function fallbackGetEmployeeStatusMetaDefaults() {
    return {
      status: "active",
      role: "employee",
      contractHours: 0,
      email: "",
      mailTestUser: false,
      lastTestMailAt: "",
      lastTestMailStatus: "",
      lastTestMailMessage: "",
      updatedAt: "",
      updatedByRole: "",
      updatedByName: ""
    };
  },
  isValidEmployeeEmail = function fallbackIsValidEmployeeEmail(email) {
    const normalizedEmail = normalizeEmployeeEmail(email);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
  },
  normalizeContractHours = function fallbackNormalizeContractHours(value) {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) && numericValue >= 0 ? Math.round(numericValue * 10) / 10 : 0;
  },
  normalizeEmployeeAppRole = function fallbackNormalizeEmployeeAppRole(value) {
    return value === "planner" ? "planner" : "employee";
  },
  normalizeEmployeeEmail = function fallbackNormalizeEmployeeEmail(value) {
    return typeof value === "string" ? value.trim() : "";
  },
  normalizeEmployeeStatus = function fallbackNormalizeEmployeeStatus(value) {
    return ["active", "inactive", "former"].includes(value) ? value : "active";
  }
} = window.StroetEmployeesFeature || {};

function getBakeryContractEmployeeNames() {
  return ["Ronny", "Richard H", "Richard R", "Lindsey", "Marnix"]
    .filter((employeeName) => employees.includes(employeeName));
}

function hasFixedContractHours(employeeName) {
  return getEmployeeContractHours(employeeName) > 0;
}

function getEmployeeContractTypeLabel(employeeName) {
  return getEmployeeContractTypeLabelHelper(getEmployeeContractHours, formatHours, employeeName);
}

function findEmployeeByEmail(email, excludedEmployeeName = "") {
  const normalizedEmail = normalizeEmployeeEmail(email).toLowerCase();

  if (!normalizedEmail) {
    return "";
  }

  return employees.find((employeeName) => {
    if (employeeName === excludedEmployeeName) {
      return false;
    }

    return getEmployeeEmail(employeeName).toLowerCase() === normalizedEmail;
  }) || "";
}

const {
  buildEmailTemplate = function fallbackBuildEmailTemplate() {
    return {
      subject: "Update",
      message: "Er is een update."
    };
  },
  getAppMailQueuedMessage: getAppMailQueuedMessageHelper = function fallbackGetAppMailQueuedMessage(options = {}) {
    const {
      appMailTestModeEnabled = false,
      fixedTestRecipient = "",
      isReminder = false
    } = options;

    if (appMailTestModeEnabled) {
      return isReminder
        ? `Herinnering wordt verzonden naar ${fixedTestRecipient} (testmodus)`
        : `Mail wordt verzonden naar ${fixedTestRecipient} (testmodus)`;
    }

    return isReminder ? "Herinnering wordt verzonden." : "Mail wordt verzonden.";
  },
  getAppMailSentMessage: getAppMailSentMessageHelper = function fallbackGetAppMailSentMessage(options = {}) {
    const { appMailTestModeEnabled = false, fixedTestRecipient = "" } = options;
    return appMailTestModeEnabled
      ? `Mail verzonden naar ${fixedTestRecipient} (testmodus)`
      : "Mail verzonden";
  },
  getDefaultMailDigestState = function fallbackGetDefaultMailDigestState() {
    return {
      plannerSummary: "",
      plannerOpenRequestsEmail: "",
      plannerOverdueRequestsEmail: "",
      plannerPendingHoursEmail: "",
      plannerOverdueHoursEmail: "",
      employeeMissingHours: {},
      employeeMissingHoursEmail: {}
    };
  },
  getMailDeliveryPrefix: getMailDeliveryPrefixHelper = function fallbackGetMailDeliveryPrefix(type, status, options = {}) {
    const isReminder = type === "reminder";

    if (status === "queued") {
      return getAppMailQueuedMessageHelper({
        ...options,
        isReminder
      });
    }

    if (status === "sent") {
      return isReminder
        ? `Herinnering verzonden naar ${options.fixedTestRecipient || ""} (testmodus)`
        : getAppMailSentMessageHelper(options);
    }

    return isReminder
      ? `Herinnering verzonden naar ${options.fixedTestRecipient || ""} (testmodus)`
      : getAppMailSentMessageHelper(options);
  },
  getMailSettingsDefaults: getMailSettingsDefaultsHelper = function fallbackGetMailSettingsDefaults(testRecipientEmail = "") {
    return {
      senderName: "Bakkerij Stroet",
      senderEmail: "",
      testRecipientEmail,
      updatedAt: "",
      updatedByRole: "",
      updatedByName: ""
    };
  },
  getSwapMailSubject = function fallbackGetSwapMailSubject(type) {
    return buildEmailTemplate(getSwapMailTemplateKey(type)).subject;
  },
  getSwapMailTemplateKey = function fallbackGetSwapMailTemplateKey(type) {
    const templateMap = {
      submitted: "swapSubmitted",
      "request-created": "swapRequestCreated",
      "auto-approved": "swapAutoApproved",
      approved: "swapApproved",
      rejected: "swapRejected",
      "planner-help": "swapPlannerHelp",
      reminder: "swapReminder"
    };

    return templateMap[type] || "swapSubmitted";
  },
  getSwapMailTemplateText = function fallbackGetSwapMailTemplateText(type) {
    return buildEmailTemplate(getSwapMailTemplateKey(type)).message;
  },
  getTestMailErrorMessage = function fallbackGetTestMailErrorMessage(errorText) {
    const normalized = typeof errorText === "string" ? errorText.trim() : "";

    if (!normalized) {
      return "Mail verzenden mislukt.";
    }

    return normalized;
  },
  getTimeOffMailSubject = function fallbackGetTimeOffMailSubject(request, type) {
    return buildEmailTemplate(getTimeOffMailTemplateKey(request, type)).subject;
  },
  getTimeOffMailTemplateKey = function fallbackGetTimeOffMailTemplateKey(request, type) {
    const templateMap = {
      submitted: "timeoffSubmitted",
      approved: "timeoffApproved",
      rejected: "timeoffRejected"
    };

    return templateMap[type] || "timeoffSubmitted";
  },
  getTimeOffMailTemplateText = function fallbackGetTimeOffMailTemplateText(request, type) {
    return buildEmailTemplate(getTimeOffMailTemplateKey(request, type)).message;
  },
  getWorkLogMailTemplateKey = function fallbackGetWorkLogMailTemplateKey(type) {
    const templateMap = {
      approved: "worklogApproved",
      rejected: "worklogRejected",
      revision: "worklogRevision"
    };

    return templateMap[type] || "";
  },
  hasConfiguredMailSender: hasConfiguredMailSenderHelper = function fallbackHasConfiguredMailSender(mailSettingsValue, options = {}) {
    const normalizeEmail = typeof options.normalizeEmployeeEmail === "function"
      ? options.normalizeEmployeeEmail
      : normalizeEmployeeEmail;
    const normalizeSender = typeof options.normalizeMailSenderName === "function"
      ? options.normalizeMailSenderName
      : ((value) => typeof value === "string" ? value.trim() : "");

    return Boolean(normalizeSender(mailSettingsValue?.senderName)) && Boolean(normalizeEmail(mailSettingsValue?.senderEmail));
  },
  normalizeMailSenderName = function fallbackNormalizeMailSenderName(value) {
    return typeof value === "string" ? value.trim() : "";
  },
  sanitizeRequestMailLog = function fallbackSanitizeRequestMailLog(mailLog = []) {
    return Array.isArray(mailLog)
      ? mailLog
        .filter((item) => item && typeof item.type === "string" && typeof item.at === "string")
        .map((item) => ({
          type: item.type,
          at: item.at,
          periodKey: typeof item.periodKey === "string" ? item.periodKey : "",
          status: ["missing-email", "config-missing", "queued", "sent", "failed", "local-preview"].includes(item.status)
            ? item.status
            : "queued",
          messageId: typeof item.messageId === "string" ? item.messageId : "",
          error: typeof item.error === "string" ? item.error : "",
          recipients: Array.isArray(item.recipients)
            ? item.recipients
              .filter((recipient) => recipient && typeof recipient.employeeName === "string")
              .map((recipient) => ({
                employeeName: recipient.employeeName.trim(),
                email: normalizeEmployeeEmail(recipient.email)
              }))
            : []
        }))
      : [];
  }
} = window.StroetMailFeature || {};

const {
  createAuditActorMeta = function fallbackCreateAuditActorMeta(options = {}) {
    const {
      isPlanner = false,
      employeeName = "",
      plannerName = "Planner / Directie",
      employeeFallback = "Medewerker"
    } = options;

    return {
      actorRole: isPlanner ? "planner" : "employee",
      actorName: isPlanner
        ? plannerName
        : (typeof employeeName === "string" && employeeName ? employeeName : employeeFallback)
    };
  },
  createBackupEntryId = function fallbackCreateBackupEntryId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  },
  getBackupEmptySummaryText = function fallbackGetBackupEmptySummaryText() {
    return "Nog geen back-up beschikbaar.";
  },
  getBackupOptionLabel = function fallbackGetBackupOptionLabel(backup, options = {}) {
    const formatDateTime = typeof options.formatDateTime === "function"
      ? options.formatDateTime
      : ((value) => String(value || ""));
    return `${formatDateTime(backup.createdAt)} - ${backup.reason}`;
  },
  getBackupRestoreEmptyLabel = function fallbackGetBackupRestoreEmptyLabel() {
    return "Kies herstelpunt";
  },
  getBackupSummaryText = function fallbackGetBackupSummaryText(history = [], options = {}) {
    const formatDateTime = typeof options.formatDateTime === "function"
      ? options.formatDateTime
      : ((value) => String(value || ""));

    if (!Array.isArray(history) || !history.length) {
      return getBackupEmptySummaryText();
    }

    return `Laatste back-up: ${formatDateTime(history[0].createdAt)}. Totaal ${history.length} lokaal opgeslagen herstelpunt(en).`;
  },
  sanitizeAuditLog = function fallbackSanitizeAuditLog(log = []) {
    return Array.isArray(log)
      ? log
        .filter((item) =>
          item &&
          typeof item.at === "string" &&
          typeof item.scope === "string" &&
          typeof item.action === "string"
        )
        .map((item) => ({
          at: item.at,
          scope: item.scope,
          action: item.action,
          actorRole: item.actorRole === "employee" ? "employee" : "planner",
          actorName: typeof item.actorName === "string" ? item.actorName : "",
          message: typeof item.message === "string" ? item.message : "",
          details: item.details && typeof item.details === "object" ? item.details : {}
        }))
      : [];
  },
  sanitizeBackupHistory = function fallbackSanitizeBackupHistory(history = []) {
    return Array.isArray(history)
      ? history.filter((backup) =>
        backup &&
        typeof backup.id === "string" &&
        typeof backup.createdAt === "string" &&
        typeof backup.reason === "string" &&
        backup.snapshot &&
        typeof backup.snapshot === "object"
      )
      : [];
  }
} = window.StroetBackupFeature || {};

const {
  collectWeekValuesFromDetails: collectWeekValuesFromDetailsHelper = function fallbackCollectWeekValuesFromDetails(details = {}, options = {}) {
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
  },
  formatWeekLabel: formatWeekLabelHelper = function fallbackFormatWeekLabel(weekValue) {
    return String(weekValue || "").replace("-W", " week ");
  },
  getIsoWeekCountForYear: getIsoWeekCountForYearHelper = function fallbackGetIsoWeekCountForYear(year, options = {}) {
    const getWeekValueFromDate = typeof options.getWeekValueFromDate === "function"
      ? options.getWeekValueFromDate
      : ((dateValue) => String(dateValue || ""));
    const referenceDate = `${year}-12-28`;
    return Number(getWeekValueFromDate(referenceDate).split("-W")[1]) || 52;
  },
  getPlanningEntrySlotKey: getPlanningEntrySlotKeyHelper = function fallbackGetPlanningEntrySlotKey(entry, options = {}) {
    const getShiftName = typeof options.getShiftName === "function"
      ? options.getShiftName
      : ((value) => value?.shiftName || value?.entryType || "");

    return [
      entry?.day || "",
      String(getShiftName(entry) || "").toLowerCase(),
      entry?.startTime || "",
      entry?.endTime || ""
    ].join("__");
  },
  getWeekDistanceFromReference: getWeekDistanceFromReferenceHelper = function fallbackGetWeekDistanceFromReference(entryWeekValue, referenceWeekValue, options = {}) {
    const getDateFromWeekValue = typeof options.getDateFromWeekValue === "function"
      ? options.getDateFromWeekValue
      : (() => new Date(NaN));

    if (!entryWeekValue || !referenceWeekValue) {
      return Number.MAX_SAFE_INTEGER;
    }

    const entryDate = getDateFromWeekValue(entryWeekValue);
    const referenceDate = getDateFromWeekValue(referenceWeekValue);
    return Math.round((referenceDate - entryDate) / (7 * 24 * 60 * 60 * 1000));
  },
  getWeekReviewStatusMeta: getWeekReviewStatusMetaHelper = function fallbackGetWeekReviewStatusMeta(status) {
    const normalizedStatus = status === "reviewed"
      ? "locked"
      : (["open", "in-review", "locked"].includes(String(status || "")) ? String(status) : "open");

    switch (normalizedStatus) {
      case "locked":
        return {
          key: "locked",
          label: "Vastgezet",
          className: "is-locked"
        };
      case "in-review":
        return {
          key: "in-review",
          label: "In controle",
          className: "is-review"
        };
      default:
        return {
          key: "open",
          label: "Open",
          className: "is-open"
        };
    }
  },
  getWeekYear: getWeekYearHelper = function fallbackGetWeekYear(weekValue) {
    return Number(String(weekValue || "").split("-W")[0]) || new Date().getFullYear();
  },
  mergePlanningEntries: mergePlanningEntriesHelper = function fallbackMergePlanningEntries(sourceEntries = [], fallbackEntries = [], options = {}) {
    const mergedEntries = new Map();
    (Array.isArray(fallbackEntries) ? fallbackEntries : []).forEach((entry) => {
      mergedEntries.set(getPlanningEntrySlotKeyHelper(entry, options), entry);
    });
    (Array.isArray(sourceEntries) ? sourceEntries : []).forEach((entry) => {
      mergedEntries.set(getPlanningEntrySlotKeyHelper(entry, options), entry);
    });
    return [...mergedEntries.values()];
  },
  normalizeWeekPlanningStatus: normalizeWeekPlanningStatusHelper = function fallbackNormalizeWeekPlanningStatus(status) {
    return ["open", "planned"].includes(String(status || ""))
      ? String(status)
      : "open";
  },
  normalizeWeekReviewStatus: normalizeWeekReviewStatusHelper = function fallbackNormalizeWeekReviewStatus(status) {
    if (status === "reviewed") {
      return "locked";
    }

    return ["open", "in-review", "locked"].includes(String(status || ""))
      ? String(status)
      : "open";
  }
} = window.StroetPlanningCoreFeature || {};

const {
  getDayPlannerShifts: getDayPlannerShiftsHelper = function fallbackGetDayPlannerShifts(dateValue, options = {}) {
    const isClosed = typeof options.isClosedPlannerDay === "function"
      ? options.isClosedPlannerDay
      : (() => false);
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
  },
  getDayPlanningMessage: getDayPlanningMessageHelper = function fallbackGetDayPlanningMessage(day, options = {}) {
    const getRecognizedSpecialDayInfo = typeof options.getRecognizedSpecialDayInfo === "function"
      ? options.getRecognizedSpecialDayInfo
      : (() => null);
    const getRequiredDayPlannerShifts = typeof options.getRequiredDayPlannerShifts === "function"
      ? options.getRequiredDayPlannerShifts
      : (() => []);
    const getEntryForShiftOnDate = typeof options.getEntryForShiftOnDate === "function"
      ? options.getEntryForShiftOnDate
      : (() => null);
    const getSuitableEmployeesForShift = typeof options.getSuitableEmployeesForShift === "function"
      ? options.getSuitableEmployeesForShift
      : (() => []);
    const sourceEntries = Array.isArray(options.sourceEntries) ? options.sourceEntries : [];

    const specialDay = getRecognizedSpecialDayInfo(day);
    const plannerShifts = getRequiredDayPlannerShifts(day);

    if (!plannerShifts.length) {
      return {
        text: specialDay?.isClosed ? `Gesloten - ${specialDay.nameLabel}` : "Winkel gesloten",
        type: "closed"
      };
    }

    const openShifts = plannerShifts.filter((shift) => !getEntryForShiftOnDate(day, shift, sourceEntries));

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
  },
  getEntryForShiftOnDate: getEntryForShiftOnDateHelper = function fallbackGetEntryForShiftOnDate(dateValue, shift, sourceEntries = [], options = {}) {
    const getShiftName = typeof options.getShiftName === "function"
      ? options.getShiftName
      : ((entry) => entry?.shiftName || "");

    return (Array.isArray(sourceEntries) ? sourceEntries : []).find((entry) =>
      entry.day === dateValue &&
      getShiftName(entry).toLowerCase() === String(shift?.name || "").toLowerCase()
    ) || null;
  },
  getRequiredDayPlannerShifts: getRequiredDayPlannerShiftsHelper = function fallbackGetRequiredDayPlannerShifts(dateValue, options = {}) {
    const getDayPlannerShifts = typeof options.getDayPlannerShifts === "function"
      ? options.getDayPlannerShifts
      : (() => []);
    const isOptionalShift = typeof options.isOptionalShift === "function"
      ? options.isOptionalShift
      : (() => false);

    return getDayPlannerShifts(dateValue).filter((shift) => !isOptionalShift(shift));
  },
  isClosedPlannerDay: isClosedPlannerDayHelper = function fallbackIsClosedPlannerDay(dateValue, options = {}) {
    const getRecognizedSpecialDayInfo = typeof options.getRecognizedSpecialDayInfo === "function"
      ? options.getRecognizedSpecialDayInfo
      : (() => null);

    return Boolean(getRecognizedSpecialDayInfo(dateValue)?.isClosed);
  }
} = window.StroetDayPlannerFeature || {};

const {
  formatEmployeeWeekLabel: formatEmployeeWeekLabelHelper = function fallbackFormatEmployeeWeekLabel(weekValue, options = {}) {
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
  },
  formatPlanningWeekPeriod: formatPlanningWeekPeriodHelper = function fallbackFormatPlanningWeekPeriod(weekValue, options = {}) {
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
  },
  getDeviationOnlyEntries: getDeviationOnlyEntriesHelper = function fallbackGetDeviationOnlyEntries(visibleEntries, weekDates, options = {}) {
    const hasMeaningfulPlannerDeviation = typeof options.hasMeaningfulPlannerDeviation === "function"
      ? options.hasMeaningfulPlannerDeviation
      : (() => false);

    return visibleEntries.filter((entry) =>
      weekDates.includes(entry.day) && hasMeaningfulPlannerDeviation(entry)
    );
  },
  getDeviationReasonSummary: getDeviationReasonSummaryHelper = function fallbackGetDeviationReasonSummary(entry, options = {}) {
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
      reasons.push("Geen betere optie");
    }

    if (patternMatch.score >= 55) {
      reasons.push("Afwijking van vast patroon");
    }

    return [...new Set(reasons)];
  },
  getPlanningOverviewStatus: getPlanningOverviewStatusHelper = function fallbackGetPlanningOverviewStatus(weekValue, weekEntries, openCount, options = {}) {
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
  },
  hasMeaningfulPlannerDeviation: hasMeaningfulPlannerDeviationHelper = function fallbackHasMeaningfulPlannerDeviation(entry, options = {}) {
    return getDeviationReasonSummaryHelper(entry, options).length > 0;
  }
} = window.StroetPlanningStatusFeature || {};

const {
  canEmployeeBeAutoAssigned: canEmployeeBeAutoAssignedHelper = function fallbackCanEmployeeBeAutoAssigned(employeeName, shift, day, sourceEntries, options = {}) {
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
  },
  findConflictInSource: findConflictInSourceHelper = function fallbackFindConflictInSource(sourceEntries, name, day, startTime, endTime, options = {}) {
    const timeToMinutes = typeof options.timeToMinutes === "function"
      ? options.timeToMinutes
      : (() => 0);
    const newStart = timeToMinutes(startTime);
    const newEnd = timeToMinutes(endTime);

    return sourceEntries.find((entry) => {
      if (entry.name !== name || entry.day !== day) {
        return false;
      }

      const existingStart = timeToMinutes(entry.startTime);
      const existingEnd = timeToMinutes(entry.endTime);
      return newStart < existingEnd && newEnd > existingStart;
    }) || null;
  },
  getCandidateMinPositivePreference: getCandidateMinPositivePreferenceHelper = function fallbackGetCandidateMinPositivePreference(candidates, shiftName, options = {}) {
    const getEmployeeShiftPreference = typeof options.getEmployeeShiftPreference === "function"
      ? options.getEmployeeShiftPreference
      : (() => 0);
    const positivePreferences = candidates
      .map((employeeName) => getEmployeeShiftPreference(employeeName, shiftName))
      .filter((value) => value > 0);

    return positivePreferences.length ? Math.min(...positivePreferences) : 0;
  },
  getOpenReplacementItems: getOpenReplacementItemsHelper = function fallbackGetOpenReplacementItems(weekValue, options = {}) {
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
  },
  getStandardShiftCoverageInfo: getStandardShiftCoverageInfoHelper = function fallbackGetStandardShiftCoverageInfo(shift, day, sourceEntries = [], options = {}) {
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
  },
  getSuitableEmployeesForShift: getSuitableEmployeesForShiftHelper = function fallbackGetSuitableEmployeesForShift(shift, day, startTime, endTime, ignoredIndex = null, options = {}) {
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
  },
  getWeekReplacementItems: getWeekReplacementItemsHelper = function fallbackGetWeekReplacementItems(weekValue, options = {}) {
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
} = window.StroetPlanningAssignmentsFeature || {};

const {
  buildPlannerContractOverviewData: buildPlannerContractOverviewDataHelper = function fallbackBuildPlannerContractOverviewData(selectedWeek, visibleEntries, options = {}) {
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
  },
  getCoverageStatusName: getCoverageStatusNameHelper = function fallbackGetCoverageStatusName(className) {
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
  },
  getSchedulePlanningWeekData: getSchedulePlanningWeekDataHelper = function fallbackGetSchedulePlanningWeekData(weekValue, options = {}) {
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
  },
  getShopCoverageForDate: getShopCoverageForDateHelper = function fallbackGetShopCoverageForDate(dateValue, options = {}) {
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
  },
  getShopCoverageLabel: getShopCoverageLabelHelper = function fallbackGetShopCoverageLabel(dateValue, options = {}) {
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
} = window.StroetPlanningPanelPrepFeature || {};

const {
  getAllowedTabsForRole: getAllowedTabsForRoleHelper = function fallbackGetAllowedTabsForRole(role, options = {}) {
    const employeeAllowedTabs = Array.isArray(options.employeeAllowedTabs)
      ? options.employeeAllowedTabs
      : [];
    const normalizedRole = String(role || "").trim().toLowerCase();

    if (normalizedRole === "planner" || normalizedRole === "directie") {
      return null;
    }

    return [...employeeAllowedTabs];
  },
  getDefaultTabForRole: getDefaultTabForRoleHelper = function fallbackGetDefaultTabForRole(role) {
    void role;
    return "week-current";
  },
  isControlModeActiveState: isControlModeActiveStateHelper = function fallbackIsControlModeActiveState(activeTabValue, role, nextPreferences = {}) {
    return Boolean(nextPreferences.plannerControlMode) &&
      (String(role || "").trim().toLowerCase() === "planner" || String(role || "").trim().toLowerCase() === "directie") &&
      (activeTabValue === "week-current" || activeTabValue === "week-next");
  },
  isDeviationOnlyModeActiveState: isDeviationOnlyModeActiveStateHelper = function fallbackIsDeviationOnlyModeActiveState(activeTabValue, role, nextPreferences = {}) {
    return Boolean(nextPreferences.plannerDeviationOnly) &&
      (String(role || "").trim().toLowerCase() === "planner" || String(role || "").trim().toLowerCase() === "directie") &&
      (activeTabValue === "week-current" || activeTabValue === "week-next");
  },
  isFocusModeActiveState: isFocusModeActiveStateHelper = function fallbackIsFocusModeActiveState(activeTabValue, role, nextPreferences = {}) {
    return Boolean(nextPreferences.plannerFocusMode) &&
      (String(role || "").trim().toLowerCase() === "planner" || String(role || "").trim().toLowerCase() === "directie") &&
      (activeTabValue === "week-current" || activeTabValue === "week-next");
  },
  isPlannerWeekTabActive: isPlannerWeekTabActiveHelper = function fallbackIsPlannerWeekTabActive(activeTabValue, role) {
    const normalizedRole = String(role || "").trim().toLowerCase();
    return (normalizedRole === "planner" || normalizedRole === "directie") &&
      (activeTabValue === "week-current" || activeTabValue === "week-next");
  },
  isTabAllowedForRole: isTabAllowedForRoleHelper = function fallbackIsTabAllowedForRole(role, tabName, options = {}) {
    const allowedTabs = getAllowedTabsForRoleHelper(role, options);

    if (allowedTabs === null) {
      return true;
    }

    return allowedTabs.includes(tabName);
  },
  isWeekTabName: isWeekTabNameHelper = function fallbackIsWeekTabName(tabName) {
    return tabName === "week-current" || tabName === "week-next";
  }
} = window.StroetNavigationFeature || {};

const {
  getEmployeeContractTypeLabel: getEmployeeContractTypeLabelHelper = function fallbackGetEmployeeContractTypeLabel(getEmployeeContractHours, formatHours, employeeName) {
    const contractHours = getEmployeeContractHours(employeeName);
    return contractHours > 0
      ? `Vast contract ${formatHours(contractHours)}`
      : "0-uren contract";
  },
  getPlannerSectionLabel: getPlannerSectionLabelHelper = function fallbackGetPlannerSectionLabel(sectionKey) {
    if (sectionKey === "allround") {
      return "Allround";
    }

    if (sectionKey === "shop") {
      return "Winkel";
    }

    if (sectionKey === "optional") {
      return "Stage";
    }

    return "Bakkerij";
  },
  getMonthLabel: getMonthLabelHelper = function fallbackGetMonthLabel(monthValue) {
    const [year, month] = String(monthValue || "").split("-");

    if (!year || !month) {
      return "";
    }

    const date = new Date(Number(year), Number(month) - 1, 1);
    return date.toLocaleDateString("nl-NL", {
      month: "long",
      year: "numeric"
    });
  },
  getRosterDaypartLabel: getRosterDaypartLabelHelper = function fallbackGetRosterDaypartLabel(daypart) {
    const labels = {
      morning: "ochtend",
      afternoon: "middag",
      full: "hele dag"
    };

    return labels[daypart] || "vrij";
  },
  getShiftSummaryLabel: getShiftSummaryLabelHelper = function fallbackGetShiftSummaryLabel(formatWeekday, shiftName, dateValue, startTime, endTime, employeeName = "") {
    const employeePart = employeeName ? ` - ${employeeName}` : "";
    return `${formatWeekday(dateValue)}: ${shiftName}${employeePart} (${startTime} - ${endTime})`;
  },
  getShiftContextLabel: getShiftContextLabelHelper = function fallbackGetShiftContextLabel(getShiftName, entry) {
    const shiftName = getShiftName(entry).toLowerCase();

    if (shiftName.includes("winkel")) {
      return "Werkplek: Winkel";
    }

    if (shiftName.includes("bezorg")) {
      return "Werkplek: Bezorging";
    }

    if (shiftName.includes("banket")) {
      return "Soort: Banket";
    }

    if (shiftName.includes("oven")) {
      return "Soort: Ovendienst";
    }

    if (shiftName.includes("draai")) {
      return "Soort: Draaidienst";
    }

    if (shiftName.includes("brood")) {
      return "Soort: Brooddienst";
    }

    if (shiftName.includes("productie")) {
      return "Soort: Productiedienst";
    }

    if (shiftName.includes("allround")) {
      return "Soort: Allrounddienst";
    }

    if (shiftName.includes("inpak")) {
      return "Soort: Inpakdienst";
    }

    return "Werkplek: Bakkerij";
  }
} = window.StroetRenderHelpersFeature || {};

const {
  isPlannerRole: isPlannerRoleHelper = function fallbackIsPlannerRole(activeRoleValue) {
    return activeRoleValue === "planner";
  },
  hasRememberedUserSession: hasRememberedUserSessionHelper = function fallbackHasRememberedUserSession(preferencesValue) {
    return Boolean(preferencesValue?.hasUserSession);
  },
  getEmployeeIdentity: getEmployeeIdentityHelper = function fallbackGetEmployeeIdentity(preferencesValue, employeesValue, isEmployeeActive) {
    return preferencesValue?.employeeIdentity &&
      employeesValue.includes(preferencesValue.employeeIdentity) &&
      isEmployeeActive(preferencesValue.employeeIdentity)
      ? preferencesValue.employeeIdentity
      : "";
  },
  needsLoginSelection: needsLoginSelectionHelper = function fallbackNeedsLoginSelection(hasUserSession, activeRoleValue, employeeIdentity) {
    if (!hasUserSession) {
      return true;
    }

    if (activeRoleValue !== "employee") {
      return false;
    }

    return !employeeIdentity;
  },
  getRoleScopedEmployeeName: getRoleScopedEmployeeNameHelper = function fallbackGetRoleScopedEmployeeName(isPlannerRoleValue, employeeIdentity, currentEmployeeName, fallbackName = "") {
    if (isPlannerRoleValue) {
      return fallbackName;
    }

    return employeeIdentity || currentEmployeeName || fallbackName;
  },
  getPreferredEmployeeIdentityCandidate: getPreferredEmployeeIdentityCandidateHelper = function fallbackGetPreferredEmployeeIdentityCandidate(candidates, employeesValue) {
    return candidates.find((employeeName) => employeeName && employeesValue.includes(employeeName)) || "";
  }
} = window.StroetBootstrapHelpersFeature || {};

const {
  createEmployeeEditorDraft: createEmployeeEditorDraftHelper = function fallbackCreateEmployeeEditorDraft(getters, employeeName) {
    return {
      email: getters.getEmployeeEmail(employeeName),
      role: getters.getEmployeeAppRole(employeeName),
      status: getters.getEmployeeStatus(employeeName),
      mailTestUser: getters.isEmployeeMailTestEnabled(employeeName),
      permissions: getters.cloneSerializableValue(getters.employeePermissions?.[employeeName] || {}),
      standardShift: typeof getters.employeeStandardShifts?.[employeeName] === "string" ? getters.employeeStandardShifts[employeeName] : "",
      basePatternId: getters.getEmployeeBasePatternId(employeeName),
      customRoster: getters.cloneSerializableValue(getters.getEmployeeCustomRosterConfig(employeeName)),
      contractHours: getters.getEmployeeContractHours(employeeName)
    };
  },
  getEmployeeDetailMailStatusViewModel: getEmployeeDetailMailStatusViewModelHelper = function fallbackGetEmployeeDetailMailStatusViewModel({
    employeeMeta,
    employeeName,
    recipientEmail,
    formatDateTime,
    fixedTestMailRecipient
  }) {
    if (!employeeName || !employeeMeta?.[employeeName]) {
      return {
        hidden: true,
        text: ""
      };
    }

    const status = employeeMeta[employeeName].lastTestMailStatus;
    const message = employeeMeta[employeeName].lastTestMailMessage || "";
    const sentAt = employeeMeta[employeeName].lastTestMailAt
      ? ` op ${formatDateTime(employeeMeta[employeeName].lastTestMailAt)}`
      : "";
    const testModeText = `Testmodus: mail gaat nu alleen naar ${fixedTestMailRecipient}`;
    const employeeEmailText = recipientEmail ? `E-mailadres medewerker: ${recipientEmail}` : "Geen e-mailadres ingesteld";

    if (!recipientEmail) {
      return {
        hidden: false,
        text: `${employeeEmailText} · ${testModeText}`
      };
    }

    if (!status) {
      return {
        hidden: false,
        text: `${employeeEmailText} · ${testModeText} · klaar om te versturen`
      };
    }

    if (status === "sent") {
      return {
        hidden: false,
        text: `${employeeEmailText} · ${testModeText} · verzonden${sentAt}`
      };
    }

    return {
      hidden: false,
      text: `${employeeEmailText} · ${testModeText} · mislukt${message ? ` · ${message}` : ""}`
    };
  },
  getPermissionShiftGroups: getPermissionShiftGroupsHelper = function fallbackGetPermissionShiftGroups(getPermissionShiftDescriptors, matchers) {
    const permissionShifts = getPermissionShiftDescriptors();
    return [
      {
        title: "Bakkerijdiensten",
        shifts: permissionShifts.filter((shift) =>
          !matchers.isShopShiftName(shift.name) &&
          !matchers.isAllroundShiftName(shift.name) &&
          !matchers.isStageShiftName(shift.name)
        )
      },
      {
        title: "Allround diensten",
        shifts: permissionShifts.filter((shift) => matchers.isAllroundShiftName(shift.name))
      },
      {
        title: "Winkeldiensten",
        shifts: permissionShifts.filter((shift) => matchers.isShopShiftName(shift.name))
      },
      {
        title: "Stageplekken",
        shifts: permissionShifts.filter((shift) => matchers.isStageShiftName(shift.name))
      }
    ].filter((group) => group.shifts.length);
  },
  getEmployeeContractPanelData: getEmployeeContractPanelDataHelper = function fallbackGetEmployeeContractPanelData({ contractHours, plannedWeekHours, formatHours }) {
    return {
      contractTypeLabel: contractHours > 0 ? `Vast contract ${formatHours(contractHours)}` : "0-uren contract",
      plannedWeekHoursLabel: formatHours(plannedWeekHours)
    };
  }
} = window.StroetEmployeePanelPrepFeature || {};

function getMailSettingsDefaults() {
  return getMailSettingsDefaultsHelper(FIXED_TEST_MAIL_RECIPIENT);
}

function loadMailSettings() {
  const savedSettings = localStorage.getItem(getScopedStorageKey(mailSettingsStorageKey));
  const defaults = getMailSettingsDefaults();

  if (!savedSettings) {
    return defaults;
  }

  try {
    const parsedSettings = JSON.parse(savedSettings);
    return {
      senderName: normalizeMailSenderName(parsedSettings?.senderName || defaults.senderName),
      senderEmail: normalizeEmployeeEmail(parsedSettings?.senderEmail || ""),
      testRecipientEmail: normalizeEmployeeEmail(parsedSettings?.testRecipientEmail || defaults.testRecipientEmail),
      updatedAt: typeof parsedSettings?.updatedAt === "string" ? parsedSettings.updatedAt : "",
      updatedByRole: typeof parsedSettings?.updatedByRole === "string" ? parsedSettings.updatedByRole : "",
      updatedByName: typeof parsedSettings?.updatedByName === "string" ? parsedSettings.updatedByName : ""
    };
  } catch {
    return defaults;
  }
}

function saveMailSettings() {
  safeSetStorageItem(getScopedStorageKey(mailSettingsStorageKey), JSON.stringify(mailSettings), "e-mailinstellingen");
}

function hasConfiguredMailSender() {
  return hasConfiguredMailSenderHelper(mailSettings, {
    normalizeEmployeeEmail,
    normalizeMailSenderName
  });
}

function loadEmployeeMeta() {
  const savedMeta = localStorage.getItem(getScopedStorageKey(employeeMetaStorageKey));
  const defaults = Object.fromEntries(
    employees.map((employeeName) => [
      employeeName,
      {
        ...getEmployeeStatusMetaDefaults(),
        mailTestUser: employeeName === "Twan"
      }
    ])
  );

  if (!savedMeta) {
    return defaults;
  }

  try {
    const parsedMeta = JSON.parse(savedMeta);
    const normalized = {};
    const hasExplicitMailTestUser = employees.some((employeeName) =>
      Object.prototype.hasOwnProperty.call(parsedMeta?.[employeeName] || {}, "mailTestUser")
    );

    employees.forEach((employeeName) => {
      const currentMeta = parsedMeta?.[employeeName];
      normalized[employeeName] = {
        status: normalizeEmployeeStatus(currentMeta?.status),
        role: normalizeEmployeeAppRole(currentMeta?.role || getDefaultEmployeeAppRole(employeeName)),
        contractHours: normalizeContractHours(currentMeta?.contractHours ?? getConfiguredEmployeeContractHours()[employeeName] ?? 0),
        email: normalizeEmployeeEmail(currentMeta?.email),
        mailTestUser: hasExplicitMailTestUser ? Boolean(currentMeta?.mailTestUser) : employeeName === "Twan",
        lastTestMailAt: typeof currentMeta?.lastTestMailAt === "string" ? currentMeta.lastTestMailAt : "",
        lastTestMailStatus: typeof currentMeta?.lastTestMailStatus === "string" ? currentMeta.lastTestMailStatus : "",
        lastTestMailMessage: typeof currentMeta?.lastTestMailMessage === "string" ? currentMeta.lastTestMailMessage : "",
        updatedAt: typeof currentMeta?.updatedAt === "string" ? currentMeta.updatedAt : "",
        updatedByRole: currentMeta?.updatedByRole === "planner" ? "planner" : (currentMeta?.updatedByRole === "employee" ? "employee" : ""),
        updatedByName: typeof currentMeta?.updatedByName === "string" ? currentMeta.updatedByName : ""
      };
    });

    return normalized;
  } catch {
    return defaults;
  }
}

function saveEmployeeMeta() {
  safeSetStorageItem(getScopedStorageKey(employeeMetaStorageKey), JSON.stringify(employeeMeta), "medewerkerstatus");
}

function loadAuditLog() {
  const savedAuditLog = localStorage.getItem(getScopedStorageKey(auditLogStorageKey));

  if (!savedAuditLog) {
    return [];
  }

  try {
    const parsedAuditLog = JSON.parse(savedAuditLog);
    return sanitizeAuditLog(parsedAuditLog);
  } catch {
    return [];
  }
}

function saveAuditLog() {
  safeSetStorageItem(getScopedStorageKey(auditLogStorageKey), JSON.stringify(auditLog), "auditlog");
}

function loadBackupHistory() {
  const savedBackups = localStorage.getItem(getScopedStorageKey(backupStorageKey));

  if (!savedBackups) {
    return [];
  }

  try {
    const parsedBackups = JSON.parse(savedBackups);
    return sanitizeBackupHistory(parsedBackups);
  } catch {
    return [];
  }
}

function saveBackupHistory() {
  safeSetStorageItem(getScopedStorageKey(backupStorageKey), JSON.stringify(backupHistory), "back-uphistorie");
}

function getEmployeeStatus(employeeName) {
  return normalizeEmployeeStatus(employeeMeta?.[employeeName]?.status);
}

function getEmployeeContractHours(employeeName) {
  return normalizeContractHours(employeeMeta?.[employeeName]?.contractHours ?? 0);
}

function getEmployeeAppRole(employeeName) {
  return normalizeEmployeeAppRole(employeeMeta?.[employeeName]?.role || getDefaultEmployeeAppRole(employeeName));
}

function getEmployeeEmail(employeeName) {
  return normalizeEmployeeEmail(employeeMeta?.[employeeName]?.email);
}

function getAppMailSentMessage() {
  return getAppMailSentMessageHelper({
    appMailTestModeEnabled: APP_MAIL_TEST_MODE_ENABLED,
    fixedTestRecipient: FIXED_TEST_MAIL_RECIPIENT
  });
}

function getAppMailQueuedMessage(isReminder = false) {
  return getAppMailQueuedMessageHelper({
    appMailTestModeEnabled: APP_MAIL_TEST_MODE_ENABLED,
    fixedTestRecipient: FIXED_TEST_MAIL_RECIPIENT,
    isReminder
  });
}

function isEmployeeMailTestEnabled(employeeName) {
  if (EMPLOYEE_MAIL_TEST_MODE_ENABLED) {
    return String(employeeName || "").trim().toLowerCase() === EMPLOYEE_MAIL_TEST_EMPLOYEE.toLowerCase();
  }

  return Boolean(employeeMeta?.[employeeName]?.mailTestUser);
}

function isEmployeeMailBlockedByTestPhase(employeeName) {
  return Boolean(getEmployeeEmail(employeeName)) && !isEmployeeMailTestEnabled(employeeName);
}

function getMailEligibleEmployeeEmail(employeeName) {
  if (!isEmployeeMailTestEnabled(employeeName)) {
    return "";
  }

  return getEmployeeEmail(employeeName);
}

function getPlannerSummaryEmailRecipients() {
  const plannerEmail = normalizeEmployeeEmail(
    mailSettings?.senderEmail || mailSettings?.testRecipientEmail || FIXED_TEST_MAIL_RECIPIENT
  );
  return plannerEmail ? [plannerEmail] : [];
}

function getSelectedEmployeeAdminName() {
  if (!employees.length) {
    return "";
  }

  const selectedName = removeEmployeeSelect?.value || "";
  return employees.includes(selectedName) ? selectedName : employees[0];
}

function cloneSerializableValue(value) {
  if (value === null || value === undefined) {
    return value;
  }

  return JSON.parse(JSON.stringify(value));
}

function createEmployeeEditorDraft(employeeName) {
  return createEmployeeEditorDraftHelper({
    getEmployeeEmail,
    getEmployeeAppRole,
    getEmployeeStatus,
    isEmployeeMailTestEnabled,
    cloneSerializableValue,
    employeePermissions,
    employeeStandardShifts,
    getEmployeeBasePatternId,
    getEmployeeCustomRosterConfig,
    getEmployeeContractHours
  }, employeeName);
}

function getEmployeeEditorDraft(employeeName) {
  if (!employeeName) {
    return null;
  }

  if (!employeeEditorDrafts[employeeName]) {
    employeeEditorDrafts[employeeName] = createEmployeeEditorDraft(employeeName);
  }

  return employeeEditorDrafts[employeeName];
}

function clearEmployeeEditorDraft(employeeName) {
  if (!employeeName) {
    return;
  }

  delete employeeEditorDrafts[employeeName];
}

function getEmployeeEditorSnapshot(employeeName, draftOverride = null) {
  if (!employeeName) {
    return null;
  }

  const draft = draftOverride || createEmployeeEditorDraft(employeeName);

  return {
    email: normalizeEmployeeEmail(draft?.email),
    role: normalizeEmployeeAppRole(draft?.role),
    status: normalizeEmployeeStatus(draft?.status),
    mailTestUser: Boolean(draft?.mailTestUser),
    permissions: Object.fromEntries(
      getPermissionShiftDescriptors().map((shift) => [
        shift.name,
        draft?.permissions?.[shift.name] !== false
      ])
    ),
    standardShift: typeof draft?.standardShift === "string" ? draft.standardShift : "",
    basePatternId: typeof draft?.basePatternId === "string" ? draft.basePatternId : getEmployeeBasePatternId(employeeName),
    customRoster: normalizeEmployeeCustomRosterConfig(draft?.customRoster, employeeName),
    contractHours: normalizeContractHours(draft?.contractHours)
  };
}

function hasUnsavedEmployeeChanges(employeeName) {
  if (!employeeName || !employeeEditorDrafts[employeeName]) {
    return false;
  }

  const currentSnapshot = getEmployeeEditorSnapshot(employeeName, employeeEditorDrafts[employeeName]);
  const savedSnapshot = getEmployeeEditorSnapshot(employeeName);
  return JSON.stringify(currentSnapshot) !== JSON.stringify(savedSnapshot);
}

function renderEmployeeEditorDetails() {
  renderEmployeeStatusControls();
  renderEmployeePermissions();
  renderEmployeeStandardShifts();
  renderEmployeeContractPanel();
}

function renderEmployeeDetailMailStatus(employeeName = getSelectedEmployeeAdminName()) {
  if (!employeeDetailMailStatus) {
    return;
  }

  const statusViewModel = getEmployeeDetailMailStatusViewModelHelper({
    employeeMeta,
    employeeName,
    recipientEmail: getEmployeeEmail(employeeName),
    formatDateTime,
    fixedTestMailRecipient: FIXED_TEST_MAIL_RECIPIENT
  });

  employeeDetailMailStatus.textContent = statusViewModel.text;
  employeeDetailMailStatus.classList.toggle("hidden", statusViewModel.hidden);
}

function setEmployeeEmailFieldError(message = "") {
  if (employeeEmailInput) {
    employeeEmailInput.classList.toggle("input-error", Boolean(message));
    employeeEmailInput.setAttribute("aria-invalid", message ? "true" : "false");
    employeeEmailInput.setCustomValidity(message || "");
  }

  if (employeeEmailError) {
    employeeEmailError.textContent = message || "";
    employeeEmailError.classList.toggle("hidden", !message);
  }
}

function clearEmployeeEmailFieldError() {
  setEmployeeEmailFieldError("");
}

function discardEmployeeEditorChanges(employeeName) {
  if (!employeeName) {
    return;
  }

  clearEmployeeEditorDraft(employeeName);
  renderEmployeeEditorDetails();
}

function isEmployeeActive(employeeName) {
  return getEmployeeStatus(employeeName) === "active";
}

function getActiveEmployees() {
  return employees.filter((employeeName) => isEmployeeActive(employeeName));
}

function getEmployeeBasePatternId(employeeName) {
  const patternId = typeof employeeBasePatterns?.[employeeName] === "string" ? employeeBasePatterns[employeeName] : "";
  return getEmployeeBasePatternCatalogMap()[patternId] ? patternId : "";
}

function getEmployeeBasePattern(employeeName) {
  const patternId = getEmployeeBasePatternId(employeeName);
  return getEmployeeBasePatternCatalogMap()[patternId] || getEmployeeBasePatternCatalogMap()[""] || null;
}

function getRosterWeekdayDefinitions() {
  return [
    { number: 1, shortLabel: "Ma", label: "Maandag" },
    { number: 2, shortLabel: "Di", label: "Dinsdag" },
    { number: 3, shortLabel: "Wo", label: "Woensdag" },
    { number: 4, shortLabel: "Do", label: "Donderdag" },
    { number: 5, shortLabel: "Vr", label: "Vrijdag" },
    { number: 6, shortLabel: "Za", label: "Zaterdag" },
    { number: 7, shortLabel: "Zo", label: "Zondag" }
  ];
}

function getEditableRosterWeekdayDefinitions() {
  return getRosterWeekdayDefinitions().filter((weekday) => weekday.number >= 2 && weekday.number <= 6);
}

function getRosterDaypartDefinitions() {
  return [
    { value: "", label: "Vrij" },
    { value: "morning", label: "Ochtend" },
    { value: "afternoon", label: "Middag" },
    { value: "full", label: "Hele dag" }
  ];
}

function createEmptyCustomRosterWeek() {
  return {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: ""
  };
}

function normalizeRosterDaypartValue(value) {
  return getRosterDaypartDefinitions().some((option) => option.value === value) ? value : "";
}

function normalizeCustomRosterWeek(weekValues) {
  const normalizedWeek = createEmptyCustomRosterWeek();

  getRosterWeekdayDefinitions().forEach((weekday) => {
    normalizedWeek[weekday.number] = normalizeRosterDaypartValue(weekValues?.[weekday.number]);
  });

  return normalizedWeek;
}

function hasCustomRosterWeekValues(weekValues) {
  return Object.values(normalizeCustomRosterWeek(weekValues)).some(Boolean);
}

function createEmptyEmployeeCustomRoster() {
  return {
    mode: "single",
    single: createEmptyCustomRosterWeek(),
    weekA: createEmptyCustomRosterWeek(),
    weekB: createEmptyCustomRosterWeek()
  };
}

function createDefaultEmployeeCustomRoster(employeeName) {
  const roster = createEmptyEmployeeCustomRoster();

  if (getEmployeeBasePatternId(employeeName) === "saskia-biweekly") {
    roster.mode = "biweekly";
  }

  return roster;
}

function normalizeEmployeeCustomRosterConfig(config, employeeName = "") {
  const defaults = createDefaultEmployeeCustomRoster(employeeName);

  return {
    mode: config?.mode === "biweekly" ? "biweekly" : defaults.mode,
    single: normalizeCustomRosterWeek(config?.single || defaults.single),
    weekA: normalizeCustomRosterWeek(config?.weekA || defaults.weekA),
    weekB: normalizeCustomRosterWeek(config?.weekB || defaults.weekB)
  };
}

function getDerivedCustomRosterFromBasePattern(employeeName, weekValue = getCurrentWeekValue(), basePatternIdOverride = "") {
  const patternId = basePatternIdOverride || getEmployeeBasePatternId(employeeName);
  const weekValues = createEmptyCustomRosterWeek();
  const variant = getWeekPatternVariant(weekValue);

  switch (patternId) {
    case "every-day":
      [2, 3, 4, 5, 6].forEach((weekday) => {
        weekValues[weekday] = "full";
      });
      break;
    case "saturday-only":
      weekValues[6] = "full";
      break;
    case "tuesday-stage":
      weekValues[2] = "morning";
      break;
    case "thu-fri-afternoon-sat":
      weekValues[4] = "afternoon";
      weekValues[5] = "afternoon";
      weekValues[6] = "full";
      break;
    case "wed-thu-fri-sat":
      [3, 4, 5, 6].forEach((weekday) => {
        weekValues[weekday] = "full";
      });
      break;
    case "wednesday-only":
      weekValues[3] = "full";
      break;
    case "thursday-only":
      weekValues[4] = "full";
      break;
    case "tue-fri-sat":
      [2, 5, 6].forEach((weekday) => {
        weekValues[weekday] = "full";
      });
      break;
    case "saskia-biweekly":
      if (variant === "A") {
        weekValues[2] = "full";
        weekValues[4] = "full";
        weekValues[5] = "full";
      } else {
        weekValues[2] = "full";
        weekValues[5] = "full";
        weekValues[6] = "full";
      }
      break;
    case "sophie-stage-sat":
      weekValues[4] = "morning";
      weekValues[5] = "morning";
      weekValues[6] = "full";
      break;
    default:
      break;
  }

  return weekValues;
}

function getEmployeeCustomRosterConfig(employeeName) {
  return normalizeEmployeeCustomRosterConfig(employeeCustomRosters?.[employeeName], employeeName);
}

function getEmployeeEditableRosterConfig(employeeName, configOverride = null, basePatternIdOverride = "") {
  const config = configOverride || getEmployeeCustomRosterConfig(employeeName);
  const currentWeekValue = weekInput?.value || getCurrentWeekValue();
  const nextConfig = {
    ...config,
    single: hasCustomRosterWeekValues(config.single) ? config.single : getDerivedCustomRosterFromBasePattern(employeeName, currentWeekValue, basePatternIdOverride),
    weekA: hasCustomRosterWeekValues(config.weekA) ? config.weekA : getDerivedCustomRosterFromBasePattern(employeeName, "2025-W01", basePatternIdOverride),
    weekB: hasCustomRosterWeekValues(config.weekB) ? config.weekB : getDerivedCustomRosterFromBasePattern(employeeName, "2025-W02", basePatternIdOverride)
  };

  return nextConfig;
}

function getEmployeeEffectiveRosterWeek(employeeName, weekValue = getCurrentWeekValue()) {
  const config = getEmployeeCustomRosterConfig(employeeName);

  if (config.mode === "biweekly") {
    const variant = getWeekPatternVariant(weekValue);
    const selectedWeek = variant === "A" ? config.weekA : config.weekB;

    if (hasCustomRosterWeekValues(selectedWeek)) {
      return {
        source: "custom",
        mode: "biweekly",
        variant,
        values: selectedWeek
      };
    }
  } else if (hasCustomRosterWeekValues(config.single)) {
    return {
      source: "custom",
      mode: "single",
      variant: "",
      values: config.single
    };
  }

  return {
    source: "base",
    mode: config.mode,
    variant: config.mode === "biweekly" ? getWeekPatternVariant(weekValue) : "",
    values: getDerivedCustomRosterFromBasePattern(employeeName, weekValue)
  };
}

function formatRosterWeekdays(values) {
  const labels = getRosterWeekdayDefinitions()
    .filter((weekday) => values?.[weekday.number])
    .map((weekday) => weekday.label);

  return labels.length ? labels.join(", ") : "Geen vaste werkdagen";
}

function formatRosterDayparts(values) {
  const usedDayparts = getRosterWeekdayDefinitions()
    .filter((weekday) => values?.[weekday.number])
    .map((weekday) => {
      const label = getRosterDaypartDefinitions().find((option) => option.value === values[weekday.number])?.label || "Vrij";
      return `${weekday.shortLabel} ${label.toLowerCase()}`;
    });

  return usedDayparts.length ? usedDayparts.join(", ") : "Geen vaste dagdelen";
}

function renderEmployeeRosterPatternGrid(employeeName, weekKey, weekValues, title) {
  const daypartOptions = getRosterDaypartDefinitions()
    .map((option) => `<option value="${option.value}">${option.label}</option>`)
    .join("");

  return `
    <div class="employee-week-pattern-block">
      <div class="employee-week-pattern-title">${title}</div>
      <div class="employee-week-pattern-grid">
        ${getEditableRosterWeekdayDefinitions().map((weekday) => `
          <label class="employee-week-pattern-day">
            <span>${weekday.shortLabel}</span>
            <select
              data-roster-pattern-employee="${employeeName}"
              data-roster-pattern-week="${weekKey}"
              data-roster-pattern-day="${weekday.number}"
            >
              ${daypartOptions}
            </select>
          </label>
        `).join("")}
      </div>
    </div>
  `;
}

function formatBooleanRosterValue(value) {
  return value ? "Ja" : "Nee";
}

function getEmployeeBaseRosterProfile(employeeName) {
  const pattern = getEmployeeBasePattern(employeeName);
  const patternId = pattern?.id || "";
  const normalizedEmployeeName = String(employeeName || "").trim().toLowerCase();
  const weekendEmployees = new Set(["bjorn", "emille", "niek", "ryan", "yuliet"]);
  const effectiveRoster = getEmployeeEffectiveRosterWeek(employeeName, weekInput?.value || getCurrentWeekValue());
  const isBiweeklyRoster = effectiveRoster.mode === "biweekly" || (effectiveRoster.source !== "custom" && patternId === "saskia-biweekly");

  const defaultProfile = {
    workdays: formatRosterWeekdays(effectiveRoster.values),
    dayparts: formatRosterDayparts(effectiveRoster.values),
    isOnCall: false,
    isWeekend: weekendEmployees.has(normalizedEmployeeName),
    isEmergency: false,
    isBiweekly: isBiweeklyRoster,
    biweeklyText: isBiweeklyRoster ? "Ja - week A/B" : "Nee"
  };

  switch (patternId) {
    case "every-day":
      return defaultProfile;
    case "saturday-only":
      return {
        ...defaultProfile,
        isWeekend: true
      };
    case "tuesday-stage":
      return defaultProfile;
    case "thu-fri-afternoon-sat":
      return {
        ...defaultProfile,
        isWeekend: true
      };
    case "wed-thu-fri-sat":
      return defaultProfile;
    case "wednesday-only":
      return defaultProfile;
    case "thursday-only":
      return defaultProfile;
    case "tue-fri-sat":
      return defaultProfile;
    case "saskia-biweekly":
      return {
        ...defaultProfile,
        isBiweekly: true,
        biweeklyText: "Ja - week A/B"
      };
    case "sophie-stage-sat":
      return defaultProfile;
    case "on-call":
      return {
        ...defaultProfile,
        isOnCall: true
      };
    case "director-emergency":
      return {
        ...defaultProfile,
        isEmergency: true
      };
    default:
      return defaultProfile;
  }
}

function syncEmployeeMeta() {
  let changed = false;
  const configuredContractHours = getConfiguredEmployeeContractHours();

  employees.forEach((employeeName) => {
    if (!employeeMeta[employeeName]) {
      employeeMeta[employeeName] = {
        ...getEmployeeStatusMetaDefaults(),
        contractHours: normalizeContractHours(configuredContractHours[employeeName] ?? 0)
      };
      changed = true;
    } else {
      const normalizedStatus = normalizeEmployeeStatus(employeeMeta[employeeName].status);
      const normalizedContractHours = normalizeContractHours(
        employeeMeta[employeeName].contractHours ?? configuredContractHours[employeeName] ?? 0
      );
      const normalizedEmail = normalizeEmployeeEmail(employeeMeta[employeeName].email);
      const normalizedMailTestUser = Boolean(employeeMeta[employeeName].mailTestUser);
      const normalizedLastTestMailAt = typeof employeeMeta[employeeName].lastTestMailAt === "string" ? employeeMeta[employeeName].lastTestMailAt : "";
      const normalizedLastTestMailStatus = typeof employeeMeta[employeeName].lastTestMailStatus === "string" ? employeeMeta[employeeName].lastTestMailStatus : "";
      const normalizedLastTestMailMessage = typeof employeeMeta[employeeName].lastTestMailMessage === "string" ? employeeMeta[employeeName].lastTestMailMessage : "";

      if (employeeMeta[employeeName].status !== normalizedStatus) {
        employeeMeta[employeeName].status = normalizedStatus;
        changed = true;
      }

      if (employeeMeta[employeeName].contractHours !== normalizedContractHours) {
        employeeMeta[employeeName].contractHours = normalizedContractHours;
        changed = true;
      }

      if (employeeMeta[employeeName].email !== normalizedEmail) {
        employeeMeta[employeeName].email = normalizedEmail;
        changed = true;
      }

      if (employeeMeta[employeeName].mailTestUser !== normalizedMailTestUser) {
        employeeMeta[employeeName].mailTestUser = normalizedMailTestUser;
        changed = true;
      }

      if (employeeMeta[employeeName].lastTestMailAt !== normalizedLastTestMailAt) {
        employeeMeta[employeeName].lastTestMailAt = normalizedLastTestMailAt;
        changed = true;
      }

      if (employeeMeta[employeeName].lastTestMailStatus !== normalizedLastTestMailStatus) {
        employeeMeta[employeeName].lastTestMailStatus = normalizedLastTestMailStatus;
        changed = true;
      }

      if (employeeMeta[employeeName].lastTestMailMessage !== normalizedLastTestMailMessage) {
        employeeMeta[employeeName].lastTestMailMessage = normalizedLastTestMailMessage;
        changed = true;
      }
    }
  });

  Object.keys(employeeMeta).forEach((employeeName) => {
    if (!employees.includes(employeeName)) {
      delete employeeMeta[employeeName];
      changed = true;
    }
  });

  if (changed) {
    saveEmployeeMeta();
  }
}

function recordAuditEvent(scope, action, message, details = {}) {
  const actorMeta = createAuditActorMeta({
    isPlanner: isPlannerRole(),
    employeeName: getRoleScopedEmployeeName() || "Medewerker"
  });

  auditLog.unshift({
    at: getNowIsoString(),
    scope,
    action,
    actorRole: actorMeta.actorRole,
    actorName: actorMeta.actorName,
    message,
    details
  });
  auditLog.splice(100, auditLog.length);
  saveAuditLog();
}

function createBackupSnapshot(reason, metadata = {}) {
  const actorMeta = createAuditActorMeta({
    isPlanner: isPlannerRole(),
    employeeName: getRoleScopedEmployeeName() || "Medewerker"
  });

  const snapshot = {
    entries: cloneEntriesState(entries),
    employees: [...employees],
    shifts: structuredClone(shifts),
    planningSettings: structuredClone(planningSettings),
    timeOffRequests: structuredClone(timeOffRequests),
    swapRequests: structuredClone(swapRequests),
    workLogs: structuredClone(workLogs),
    employeePermissions: structuredClone(employeePermissions),
    employeeStandardShifts: structuredClone(employeeStandardShifts),
    employeeShiftPreferences: structuredClone(employeeShiftPreferences),
    employeeBasePatterns: structuredClone(employeeBasePatterns),
    employeeCustomRosters: structuredClone(employeeCustomRosters),
    employeeMeta: structuredClone(employeeMeta),
    mailSettings: structuredClone(mailSettings)
  };

  backupHistory.unshift({
    id: createBackupEntryId(),
    createdAt: getNowIsoString(),
    reason,
    actorRole: actorMeta.actorRole,
    actorName: actorMeta.actorName,
    metadata,
    snapshot
  });
  backupHistory.splice(20, backupHistory.length);
  saveBackupHistory();
}

function persistProtectedChange({
  reason,
  scope,
  action,
  message,
  details = {}
}) {
  if (scope === "roster") {
    markWeeksAsInReview(collectWeekValuesFromDetails(details));
  }
  createBackupSnapshot(reason, details);
  recordAuditEvent(scope, action, message, details);
}

function restoreBackupById(backupId) {
  const backup = backupHistory.find((item) => item.id === backupId);

  if (!backup?.snapshot) {
    showMessage("Het gekozen herstelpunt is niet gevonden.", "error");
    return false;
  }

  replaceArrayContents(entries, cloneEntriesState(backup.snapshot.entries || []));
  replaceArrayContents(employees, Array.isArray(backup.snapshot.employees) ? [...backup.snapshot.employees] : []);
  replaceArrayContents(shifts, Array.isArray(backup.snapshot.shifts) ? structuredClone(backup.snapshot.shifts) : []);
  replaceArrayContents(timeOffRequests, Array.isArray(backup.snapshot.timeOffRequests) ? structuredClone(backup.snapshot.timeOffRequests) : []);
  replaceArrayContents(swapRequests, Array.isArray(backup.snapshot.swapRequests) ? structuredClone(backup.snapshot.swapRequests) : []);
  replaceArrayContents(workLogs, Array.isArray(backup.snapshot.workLogs) ? structuredClone(backup.snapshot.workLogs) : []);
  replaceObjectContents(planningSettings, backup.snapshot.planningSettings && typeof backup.snapshot.planningSettings === "object" ? structuredClone(backup.snapshot.planningSettings) : {});
  replaceObjectContents(employeePermissions, backup.snapshot.employeePermissions && typeof backup.snapshot.employeePermissions === "object" ? structuredClone(backup.snapshot.employeePermissions) : {});
  replaceObjectContents(employeeStandardShifts, backup.snapshot.employeeStandardShifts && typeof backup.snapshot.employeeStandardShifts === "object" ? structuredClone(backup.snapshot.employeeStandardShifts) : {});
  replaceObjectContents(employeeShiftPreferences, backup.snapshot.employeeShiftPreferences && typeof backup.snapshot.employeeShiftPreferences === "object" ? structuredClone(backup.snapshot.employeeShiftPreferences) : {});
  replaceObjectContents(employeeBasePatterns, backup.snapshot.employeeBasePatterns && typeof backup.snapshot.employeeBasePatterns === "object" ? structuredClone(backup.snapshot.employeeBasePatterns) : {});
  replaceObjectContents(employeeCustomRosters, backup.snapshot.employeeCustomRosters && typeof backup.snapshot.employeeCustomRosters === "object" ? structuredClone(backup.snapshot.employeeCustomRosters) : {});
  replaceObjectContents(employeeMeta, backup.snapshot.employeeMeta && typeof backup.snapshot.employeeMeta === "object" ? structuredClone(backup.snapshot.employeeMeta) : {});
  replaceObjectContents(mailSettings, backup.snapshot.mailSettings && typeof backup.snapshot.mailSettings === "object" ? structuredClone(backup.snapshot.mailSettings) : getMailSettingsDefaults());

  saveEmployees();
  saveEmployeeMeta();
  saveMailSettings();
  saveShifts();
  saveEntries();
  saveTimeOffRequests();
  saveSwapRequests();
  saveWorkLogs();
  saveEmployeePermissions();
  saveEmployeeStandardShifts();
  saveEmployeeShiftPreferences();
  saveEmployeeBasePatterns();
  saveEmployeeCustomRosters();
  savePlanningSettings();
  syncEmployeeMeta();
  syncEmployeePermissions();
  syncEmployeeStandardShifts();
  syncEmployeeShiftPreferences();
  syncEmployeeBasePatterns();
  syncEmployeeCustomRosters();
  recordAuditEvent("backup", "backup-restored", `Herstelpunt teruggezet: ${backup.reason}.`, {
    backupId,
    backupReason: backup.reason,
    backupCreatedAt: backup.createdAt
  });
  return true;
}

function getPermissionShiftDescriptors() {
  const shopNumbers = new Set(getHolidayShopTemplates().map((template) => template.number));
  const allroundNames = new Set();

  Object.values(getDefaultShopTemplatesByWeekday()).forEach((templates) => {
    templates.forEach((template) => {
      shopNumbers.add(template.number);
    });
  });

  Object.values(getAllroundTemplatesByWeekday()).forEach((templates) => {
    templates.forEach((template) => {
      allroundNames.add(template.name);
    });
  });

  const shopDescriptors = [...shopNumbers]
    .sort((numberA, numberB) => numberA - numberB)
    .map((number) => ({
      name: `Winkeldienst ${number}`,
      color: `shift-tone-winkel-${Math.min(number, 6)}`
    }));

  const allroundDescriptors = [...allroundNames]
    .sort((nameA, nameB) => nameA.localeCompare(nameB, "nl"))
    .map((name) => ({
      name,
      color: "shift-tone-productie"
    }));

  const descriptors = [
    ...shifts.map((shift) => ({
      name: shift.name,
      color: shift.color || "shift-tone-inpak"
    })),
    ...allroundDescriptors,
    ...shopDescriptors
  ];

  return descriptors.filter((descriptor, index, source) =>
    source.findIndex((candidate) => candidate.name.toLowerCase() === descriptor.name.toLowerCase()) === index
  );
}

function loadEmployeePermissions() {
  const allShiftNames = getPermissionShiftDescriptors().map((shift) => shift.name);
  const savedPermissions = localStorage.getItem(getScopedStorageKey(employeePermissionsStorageKey));
  const defaultPermissions = {};

  employees.forEach((employee) => {
    defaultPermissions[employee] = Object.fromEntries(allShiftNames.map((shiftName) => [shiftName, true]));
  });

  if (!savedPermissions) {
    return defaultPermissions;
  }

  try {
    const parsedPermissions = JSON.parse(savedPermissions);
    const normalizedPermissions = {};

    employees.forEach((employee) => {
      const employeePermissionsMap = parsedPermissions?.[employee];
      normalizedPermissions[employee] = Object.fromEntries(allShiftNames.map((shiftName) => [
        shiftName,
        typeof employeePermissionsMap?.[shiftName] === "boolean" ? employeePermissionsMap[shiftName] : true
      ]));
    });

    return normalizedPermissions;
  } catch {
    return defaultPermissions;
  }
}

function saveEmployeePermissions() {
  safeSetStorageItem(getScopedStorageKey(employeePermissionsStorageKey), JSON.stringify(employeePermissions), "bevoegdheden");
}

function getBakeryCoreShifts() {
  return shifts.filter((shift) => !isShopShiftName(shift.name) && !isOptionalShift(shift));
}

function isBakeryCoreShift(shift) {
  return Boolean(shift) && !shift.isShopShift && !isOptionalShift(shift);
}

function loadEmployeeStandardShifts() {
  const savedStandardShifts = localStorage.getItem(getScopedStorageKey(employeeStandardShiftStorageKey));
  const validShiftNames = new Set(getBakeryCoreShifts().map((shift) => shift.name));
  const defaults = Object.fromEntries(employees.map((employeeName) => [employeeName, ""]));

  if (!savedStandardShifts) {
    return defaults;
  }

  try {
    const parsedStandardShifts = JSON.parse(savedStandardShifts);
    const normalized = {};

    employees.forEach((employeeName) => {
      const shiftName = typeof parsedStandardShifts?.[employeeName] === "string" ? parsedStandardShifts[employeeName] : "";
      normalized[employeeName] = validShiftNames.has(shiftName) ? shiftName : "";
    });

    return normalized;
  } catch {
    return defaults;
  }
}

function saveEmployeeStandardShifts() {
  safeSetStorageItem(getScopedStorageKey(employeeStandardShiftStorageKey), JSON.stringify(employeeStandardShifts), "vaste diensten");
}

function loadEmployeeShiftPreferences() {
  const allShiftNames = getPermissionShiftDescriptors().map((shift) => shift.name);
  const savedPreferences = localStorage.getItem(getScopedStorageKey(employeeShiftPreferenceStorageKey));
  const defaults = {};

  employees.forEach((employeeName) => {
    defaults[employeeName] = Object.fromEntries(allShiftNames.map((shiftName) => [shiftName, 0]));
  });

  if (!savedPreferences) {
    return defaults;
  }

  try {
    const parsedPreferences = JSON.parse(savedPreferences);
    const normalizedPreferences = {};

    employees.forEach((employeeName) => {
      const employeePreferenceMap = parsedPreferences?.[employeeName];
      normalizedPreferences[employeeName] = Object.fromEntries(allShiftNames.map((shiftName) => {
        const preferenceValue = Number(employeePreferenceMap?.[shiftName]);
        return [shiftName, Number.isFinite(preferenceValue) && preferenceValue > 0 ? Math.floor(preferenceValue) : 0];
      }));
    });

    return normalizedPreferences;
  } catch {
    return defaults;
  }
}

function saveEmployeeShiftPreferences() {
  safeSetStorageItem(getScopedStorageKey(employeeShiftPreferenceStorageKey), JSON.stringify(employeeShiftPreferences), "dienstvoorkeuren");
}

function getEmployeeBasePatternCatalog() {
  return [
    {
      id: "",
      label: "Geen vast basispatroon",
      description: "Geen vaste voorkeur voor automatisch plannen.",
      rank: 50
    },
    {
      id: "every-day",
      label: "Elke dag",
      description: "Standaard inzetbaar op elke werkdag.",
      rank: 10
    },
    {
      id: "saturday-only",
      label: "Alleen zaterdag",
      description: "Normaal alleen op zaterdag gebruiken.",
      rank: 4
    },
    {
      id: "tuesday-stage",
      label: "Dinsdag stage",
      description: "Alleen op dinsdag voor een logische stageplek.",
      rank: 2
    },
    {
      id: "thu-fri-afternoon-sat",
      label: "Do/vr middag + za",
      description: "Donderdagmiddag, vrijdagmiddag en zaterdag.",
      rank: 3
    },
    {
      id: "wed-thu-fri-sat",
      label: "Wo/do/vr/za",
      description: "Standaard op woensdag, donderdag, vrijdag en zaterdag.",
      rank: 3
    },
    {
      id: "wednesday-only",
      label: "Alleen woensdag",
      description: "Normaal alleen op woensdag gebruiken.",
      rank: 3
    },
    {
      id: "thursday-only",
      label: "Alleen donderdag",
      description: "Normaal alleen op donderdag gebruiken.",
      rank: 3
    },
    {
      id: "tue-fri-sat",
      label: "Di/vr/za",
      description: "Standaard op dinsdag, vrijdag en zaterdag.",
      rank: 3
    },
    {
      id: "saskia-biweekly",
      label: "2-wekelijks Saskia",
      description: "Week A: di/do/vr. Week B: di/vr/za.",
      rank: 2
    },
    {
      id: "sophie-stage-sat",
      label: "Do/vr stage + za werk",
      description: "Donderdag en vrijdag stage, zaterdag werk.",
      rank: 2
    },
    {
      id: "on-call",
      label: "Oproepkracht",
      description: "Alleen gebruiken als laatste optie.",
      rank: 90
    },
    {
      id: "director-emergency",
      label: "Directie / noodoplossing",
      description: "Niet standaard inplannen, alleen als noodoplossing.",
      rank: 100
    }
  ];
}

function getEmployeeBasePatternCatalogMap() {
  return Object.fromEntries(getEmployeeBasePatternCatalog().map((pattern) => [pattern.id, pattern]));
}

function getDefaultEmployeeBasePatternId(employeeName) {
  const normalizedName = String(employeeName || "").trim().toLowerCase();
  const defaults = {
    "bernard": "on-call",
    "bjorn": "saturday-only",
    "chantal": "director-emergency",
    "duuk": "tuesday-stage",
    "emille": "thu-fri-afternoon-sat",
    "gerry": "wed-thu-fri-sat",
    "jaap": "on-call",
    "jos": "wednesday-only",
    "johan": "thursday-only",
    "kevin": "tue-fri-sat",
    "lindsey": "every-day",
    "luna": "every-day",
    "marnix": "every-day",
    "monique": "every-day",
    "niek": "thu-fri-afternoon-sat",
    "richard h": "every-day",
    "richard r": "every-day",
    "ronny": "every-day",
    "ryan": "thu-fri-afternoon-sat",
    "saskia": "saskia-biweekly",
    "sophie": "sophie-stage-sat",
    "twan": "director-emergency",
    "wendy": "every-day",
    "yuliet": "saturday-only"
  };

  return defaults[normalizedName] || "";
}

function loadEmployeeBasePatterns() {
  const savedPatterns = localStorage.getItem(getScopedStorageKey(employeeBasePatternStorageKey));
  const validPatternIds = new Set(getEmployeeBasePatternCatalog().map((pattern) => pattern.id));
  const defaults = Object.fromEntries(employees.map((employeeName) => [employeeName, getDefaultEmployeeBasePatternId(employeeName)]));

  if (!savedPatterns) {
    return defaults;
  }

  try {
    const parsedPatterns = JSON.parse(savedPatterns);
    const normalized = {};

    employees.forEach((employeeName) => {
      const patternId = typeof parsedPatterns?.[employeeName] === "string" ? parsedPatterns[employeeName] : getDefaultEmployeeBasePatternId(employeeName);
      normalized[employeeName] = validPatternIds.has(patternId) ? patternId : "";
    });

    return normalized;
  } catch {
    return defaults;
  }
}

function saveEmployeeBasePatterns() {
  safeSetStorageItem(getScopedStorageKey(employeeBasePatternStorageKey), JSON.stringify(employeeBasePatterns), "basisroosters");
}

function loadEmployeeCustomRosters() {
  const savedRosters = localStorage.getItem(getScopedStorageKey(employeeCustomRosterStorageKey));
  const defaults = Object.fromEntries(employees.map((employeeName) => [employeeName, createDefaultEmployeeCustomRoster(employeeName)]));

  if (!savedRosters) {
    return defaults;
  }

  try {
    const parsedRosters = JSON.parse(savedRosters);
    const normalized = {};

    employees.forEach((employeeName) => {
      normalized[employeeName] = normalizeEmployeeCustomRosterConfig(parsedRosters?.[employeeName], employeeName);
    });

    return normalized;
  } catch {
    return defaults;
  }
}

function saveEmployeeCustomRosters() {
  safeSetStorageItem(getScopedStorageKey(employeeCustomRosterStorageKey), JSON.stringify(employeeCustomRosters), "vaste roosterpatronen");
}

function syncEmployeePermissions() {
  const allShiftNames = getPermissionShiftDescriptors().map((shift) => shift.name);
  let changed = false;

  Object.keys(employeePermissions).forEach((employeeName) => {
    if (!employees.includes(employeeName)) {
      delete employeePermissions[employeeName];
      changed = true;
    }
  });

  employees.forEach((employeeName) => {
    const currentPermissions = employeePermissions[employeeName];

    if (!currentPermissions || typeof currentPermissions !== "object") {
      employeePermissions[employeeName] = Object.fromEntries(allShiftNames.map((shiftName) => [shiftName, true]));
      changed = true;
      return;
    }

    const nextPermissions = {};

    allShiftNames.forEach((shiftName) => {
      nextPermissions[shiftName] = typeof currentPermissions[shiftName] === "boolean" ? currentPermissions[shiftName] : true;
    });

    if (JSON.stringify(nextPermissions) !== JSON.stringify(currentPermissions)) {
      employeePermissions[employeeName] = nextPermissions;
      changed = true;
    }
  });

  if (changed) {
    saveEmployeePermissions();
  }
}

function syncEmployeeShiftPreferences() {
  const allShiftNames = getPermissionShiftDescriptors().map((shift) => shift.name);
  let changed = false;

  Object.keys(employeeShiftPreferences).forEach((employeeName) => {
    if (!employees.includes(employeeName)) {
      delete employeeShiftPreferences[employeeName];
      changed = true;
    }
  });

  employees.forEach((employeeName) => {
    const currentPreferences = employeeShiftPreferences[employeeName];

    if (!currentPreferences || typeof currentPreferences !== "object") {
      employeeShiftPreferences[employeeName] = Object.fromEntries(allShiftNames.map((shiftName) => [shiftName, 0]));
      changed = true;
      return;
    }

    const nextPreferences = {};

    allShiftNames.forEach((shiftName) => {
      const preferenceValue = Number(currentPreferences[shiftName]);
      nextPreferences[shiftName] = Number.isFinite(preferenceValue) && preferenceValue > 0 ? Math.floor(preferenceValue) : 0;
    });

    if (JSON.stringify(nextPreferences) !== JSON.stringify(currentPreferences)) {
      employeeShiftPreferences[employeeName] = nextPreferences;
      changed = true;
    }
  });

  if (changed) {
    saveEmployeeShiftPreferences();
  }
}

function syncEmployeeStandardShifts() {
  const validShiftNames = new Set(getBakeryCoreShifts().map((shift) => shift.name));
  let changed = false;

  Object.keys(employeeStandardShifts).forEach((employeeName) => {
    if (!employees.includes(employeeName)) {
      delete employeeStandardShifts[employeeName];
      changed = true;
    }
  });

  employees.forEach((employeeName) => {
    const currentShiftName = typeof employeeStandardShifts[employeeName] === "string" ? employeeStandardShifts[employeeName] : "";
    const normalizedShiftName = validShiftNames.has(currentShiftName) ? currentShiftName : "";

    if (!(employeeName in employeeStandardShifts) || employeeStandardShifts[employeeName] !== normalizedShiftName) {
      employeeStandardShifts[employeeName] = normalizedShiftName;
      changed = true;
    }
  });

  if (changed) {
    saveEmployeeStandardShifts();
  }
}

function syncEmployeeBasePatterns() {
  const validPatternIds = new Set(getEmployeeBasePatternCatalog().map((pattern) => pattern.id));
  let changed = false;

  Object.keys(employeeBasePatterns).forEach((employeeName) => {
    if (!employees.includes(employeeName)) {
      delete employeeBasePatterns[employeeName];
      changed = true;
    }
  });

  employees.forEach((employeeName) => {
    const currentPatternId = typeof employeeBasePatterns[employeeName] === "string" ? employeeBasePatterns[employeeName] : "";
    const fallbackPatternId = getDefaultEmployeeBasePatternId(employeeName);
    const normalizedPatternId = validPatternIds.has(currentPatternId)
      ? currentPatternId
      : (validPatternIds.has(fallbackPatternId) ? fallbackPatternId : "");

    if (!(employeeName in employeeBasePatterns) || employeeBasePatterns[employeeName] !== normalizedPatternId) {
      employeeBasePatterns[employeeName] = normalizedPatternId;
      changed = true;
    }
  });

  if (changed) {
    saveEmployeeBasePatterns();
  }
}

function syncEmployeeCustomRosters() {
  let changed = false;

  Object.keys(employeeCustomRosters).forEach((employeeName) => {
    if (!employees.includes(employeeName)) {
      delete employeeCustomRosters[employeeName];
      changed = true;
    }
  });

  employees.forEach((employeeName) => {
    const normalizedRoster = normalizeEmployeeCustomRosterConfig(employeeCustomRosters[employeeName], employeeName);
    const currentRoster = JSON.stringify(employeeCustomRosters[employeeName] || null);
    const nextRoster = JSON.stringify(normalizedRoster);

    if (!(employeeName in employeeCustomRosters) || currentRoster !== nextRoster) {
      employeeCustomRosters[employeeName] = normalizedRoster;
      changed = true;
    }
  });

  if (changed) {
    saveEmployeeCustomRosters();
  }
}

function isEmployeeAuthorizedForShift(employeeName, shiftName) {
  if (!employeeName || !shiftName) {
    return true;
  }

  const permissionValue = employeePermissions?.[employeeName]?.[shiftName];
  return typeof permissionValue === "boolean" ? permissionValue : true;
}

function getEmployeeShiftPreference(employeeName, shiftName) {
  if (!employeeName || !shiftName) {
    return 0;
  }

  const preferenceValue = Number(employeeShiftPreferences?.[employeeName]?.[shiftName]);
  return Number.isFinite(preferenceValue) && preferenceValue > 0 ? Math.floor(preferenceValue) : 0;
}

function getAuthorizedEmployeesForShift(shiftName) {
  if (!shiftName) {
    return getActiveEmployees();
  }

  return getActiveEmployees().filter((employeeName) => isEmployeeAuthorizedForShift(employeeName, shiftName));
}

function isEmployeeAvailableForShift(employeeName, day, startTime, endTime, ignoredIndex = editIndex) {
  if (!employeeName || !day || !startTime || !endTime) {
    return true;
  }

  if (getApprovedTimeOff(employeeName, day)) {
    return false;
  }

  return !findConflict(employeeName, day, startTime, endTime, ignoredIndex);
}

function getSuitableEmployeesForShift(shift, day, startTime, endTime, ignoredIndex = editIndex) {
  return getSuitableEmployeesForShiftHelper(shift, day, startTime, endTime, ignoredIndex, {
    getActiveEmployees,
    isEmployeeAuthorizedForShift,
    isEmployeeAvailableForShift
  });
}

function getAuthorizationError(employeeName, shift) {
  if (!shift || !employeeName) {
    return "";
  }

  if (isEmployeeAuthorizedForShift(employeeName, shift.name)) {
    return "";
  }

  return `${employeeName} is niet bevoegd voor ${shift.name}. Kies een andere medewerker of pas de bevoegdheden aan in Medewerkers.`;
}

function getDefaultShopTemplatesByWeekday() {
  return {
    1: [],
    2: [
      { number: 1, startTime: "07:00", endTime: "17:00" },
      { number: 2, startTime: "07:00", endTime: "17:00" },
      { number: 3, startTime: "07:00", endTime: "13:00" }
    ],
    3: [
      { number: 1, startTime: "07:00", endTime: "17:00" },
      { number: 2, startTime: "07:00", endTime: "17:00" },
      { number: 3, startTime: "07:00", endTime: "13:00" }
    ],
    4: [
      { number: 1, startTime: "07:00", endTime: "17:00" },
      { number: 2, startTime: "07:00", endTime: "17:00" },
      { number: 3, startTime: "07:00", endTime: "13:00" },
      { number: 4, startTime: "07:30", endTime: "13:30" }
    ],
    5: [
      { number: 1, startTime: "07:00", endTime: "17:00" },
      { number: 2, startTime: "07:00", endTime: "17:00" },
      { number: 3, startTime: "07:00", endTime: "13:00" },
      { number: 4, startTime: "07:30", endTime: "13:30" }
    ],
    6: [
      { number: 1, startTime: "06:30", endTime: "17:00" },
      { number: 2, startTime: "06:30", endTime: "17:00" },
      { number: 3, startTime: "07:00", endTime: "17:00" },
      { number: 4, startTime: "07:30", endTime: "17:00" },
      { number: 5, startTime: "08:00", endTime: "17:00" },
      { number: 6, startTime: "06:00", endTime: "12:00" },
      { number: 7, startTime: "09:00", endTime: "12:00" },
      { number: 8, startTime: "12:00", endTime: "17:00" }
    ],
    7: []
  };
}

function getHolidayShopTemplates() {
  return [
    { number: 1, startTime: "07:00", endTime: "17:00" },
    { number: 2, startTime: "07:00", endTime: "17:00" },
    { number: 3, startTime: "07:00", endTime: "13:00" },
    { number: 4, startTime: "07:30", endTime: "13:30" },
    { number: 5, startTime: "08:00", endTime: "17:00" },
    { number: 6, startTime: "06:00", endTime: "12:00" },
    { number: 7, startTime: "09:00", endTime: "12:00" },
    { number: 8, startTime: "12:00", endTime: "17:00" }
  ];
}

function isVacationWeekValue(weekValue) {
  return Array.isArray(planningSettings.vacationWeeks) && planningSettings.vacationWeeks.includes(weekValue);
}

function getWeekVacationStatus(weekValue) {
  return isVacationWeekValue(weekValue) ? "vacation" : "normal";
}

function isWeekendEmployee(employeeName) {
  return getEmployeeBaseRosterProfile(employeeName).isWeekend;
}

function getAllroundTemplatesByWeekday() {
  return {
    4: [
      { id: "allround-1", name: "Allrounddienst 1", startTime: "14:00", endTime: "17:00", color: "shift-tone-productie" }
    ],
    5: [
      { id: "allround-1", name: "Allrounddienst 1", startTime: "14:00", endTime: "17:00", color: "shift-tone-productie" }
    ],
    6: [
      { id: "allround-1", name: "Allrounddienst 1", startTime: "06:00", endTime: "12:00", color: "shift-tone-productie" },
      { id: "allround-2", name: "Allrounddienst 2", startTime: "08:00", endTime: "17:00", color: "shift-tone-productie" }
    ]
  };
}

function loadPlanningSettings() {
  const defaultTemplates = getDefaultShopTemplatesByWeekday();
  const defaultCounts = Object.fromEntries(
    Object.entries(defaultTemplates).map(([weekday, templates]) => [weekday, templates.length])
  );
  const savedSettings = localStorage.getItem(getScopedStorageKey(planningSettingsStorageKey));

  if (!savedSettings) {
    return {
      winkelPerWeekday: defaultCounts,
      overrides: {},
      vacationWeeks: [],
      weekReviewStatus: {}
    };
  }

  try {
    const parsedSettings = JSON.parse(savedSettings);
    const winkelPerWeekday = { ...defaultCounts };

    Object.keys(defaultCounts).forEach((weekday) => {
      const value = Number(parsedSettings?.winkelPerWeekday?.[weekday]);
      winkelPerWeekday[weekday] = Number.isFinite(value) ? Math.max(0, Math.min(8, value)) : defaultCounts[weekday];
    });

    const overrides = {};
    Object.entries(parsedSettings?.overrides || {}).forEach(([date, count]) => {
      const parsedCount = Number(count);

      if (/^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(parsedCount)) {
        overrides[date] = Math.max(0, Math.min(8, parsedCount));
      }
    });

    const vacationWeeks = Array.isArray(parsedSettings?.vacationWeeks)
      ? parsedSettings.vacationWeeks.filter((weekValue) => /^\d{4}-W\d{2}$/.test(String(weekValue || ""))).sort((a, b) => a.localeCompare(b))
      : [];
    const weekReviewStatus = {};
    const weekPlanningStatus = {};

    Object.entries(parsedSettings?.weekReviewStatus || {}).forEach(([weekValue, status]) => {
      if (/^\d{4}-W\d{2}$/.test(String(weekValue || ""))) {
        weekReviewStatus[weekValue] = normalizeWeekReviewStatus(status);
      }
    });

    Object.entries(parsedSettings?.weekPlanningStatus || {}).forEach(([weekValue, status]) => {
      if (/^\d{4}-W\d{2}$/.test(String(weekValue || ""))) {
        weekPlanningStatus[weekValue] = normalizeWeekPlanningStatus(status);
      }
    });

    return {
      winkelPerWeekday,
      overrides,
      vacationWeeks,
      weekReviewStatus,
      weekPlanningStatus
    };
  } catch {
    return {
      winkelPerWeekday: defaultCounts,
      overrides: {},
      vacationWeeks: [],
      weekReviewStatus: {},
      weekPlanningStatus: {}
    };
  }
}

function savePlanningSettings() {
  safeSetStorageItem(getScopedStorageKey(planningSettingsStorageKey), JSON.stringify(planningSettings), "planning instellingen");
}

function normalizeWeekReviewStatus(status) {
  return normalizeWeekReviewStatusHelper(status);
}

function normalizeWeekPlanningStatus(status) {
  return normalizeWeekPlanningStatusHelper(status);
}

function getWeekPlanningStatus(weekValue) {
  if (!/^\d{4}-W\d{2}$/.test(String(weekValue || ""))) {
    return "open";
  }

  return normalizeWeekPlanningStatus(planningSettings.weekPlanningStatus?.[weekValue]);
}

function setWeekPlanningStatus(weekValue, status, { save = true } = {}) {
  const normalizedStatus = normalizeWeekPlanningStatus(status);

  if (!/^\d{4}-W\d{2}$/.test(String(weekValue || ""))) {
    return;
  }

  if (!planningSettings.weekPlanningStatus || typeof planningSettings.weekPlanningStatus !== "object") {
    planningSettings.weekPlanningStatus = {};
  }

  planningSettings.weekPlanningStatus[weekValue] = normalizedStatus;

  if (save) {
    savePlanningSettings();
  }
}

function getWeekReviewStatus(weekValue) {
  if (!/^\d{4}-W\d{2}$/.test(String(weekValue || ""))) {
    return "open";
  }

  return normalizeWeekReviewStatus(planningSettings.weekReviewStatus?.[weekValue]);
}

function setWeekReviewStatus(weekValue, status, { save = true } = {}) {
  const normalizedStatus = normalizeWeekReviewStatus(status);

  if (!/^\d{4}-W\d{2}$/.test(String(weekValue || "")) || !["open", "in-review", "locked"].includes(normalizedStatus)) {
    return;
  }

  if (!planningSettings.weekReviewStatus || typeof planningSettings.weekReviewStatus !== "object") {
    planningSettings.weekReviewStatus = {};
  }

  planningSettings.weekReviewStatus[weekValue] = normalizedStatus;

  if (save) {
    savePlanningSettings();
  }
}

function collectWeekValuesFromDetails(details = {}) {
  return collectWeekValuesFromDetailsHelper(details, {
    getWeekValueFromDate
  });
}

function markWeeksAsInReview(weekValues) {
  const validWeeks = [...new Set((weekValues || []).filter((weekValue) => /^\d{4}-W\d{2}$/.test(String(weekValue || ""))))];

  if (!validWeeks.length) {
    return;
  }

  validWeeks.forEach((weekValue) => {
    if (getWeekReviewStatus(weekValue) !== "locked") {
      setWeekReviewStatus(weekValue, "in-review", { save: false });
    }
  });
  savePlanningSettings();
}

function getDefaultShifts() {
  return [
    { id: "00:00|08:00|Draaidienst", name: "Draaidienst", startTime: "00:00", endTime: "08:00", color: "shift-tone-draai" },
    { id: "00:00|08:00|Ovendienst", name: "Ovendienst", startTime: "00:00", endTime: "08:00", color: "shift-tone-oven" },
    { id: "04:00|12:00|Banketdienst", name: "Banketdienst", startTime: "04:00", endTime: "12:00", color: "shift-tone-banket" },
    { id: "06:00|14:00|Brooddienst", name: "Brooddienst", startTime: "06:00", endTime: "14:00", color: "shift-tone-brood" },
    { id: "06:00|08:00|Inpakdienst", name: "Inpakdienst", startTime: "06:00", endTime: "08:00", color: "shift-tone-inpak" },
    { id: "08:00|14:00|Productiedienst", name: "Productiedienst", startTime: "08:00", endTime: "14:00", color: "shift-tone-productie" },
    { id: "08:00|12:30|Bezorgdienst", name: "Bezorgdienst", startTime: "08:00", endTime: "12:30", color: "shift-tone-bezorg" },
    { id: "07:00|15:00|Stageplek 1", name: "Stageplek 1", startTime: "07:00", endTime: "15:00", color: "shift-tone-stage-1" },
    { id: "07:00|15:00|Stageplek 2", name: "Stageplek 2", startTime: "07:00", endTime: "15:00", color: "shift-tone-stage-2" }
  ];
}

function loadShifts() {
  const defaultShifts = getDefaultShifts();
  const savedShifts = localStorage.getItem(getScopedStorageKey(shiftStorageKey));

  if (!savedShifts) {
    return defaultShifts;
  }

  try {
    const parsedShifts = JSON.parse(savedShifts);

    if (!Array.isArray(parsedShifts)) {
      return defaultShifts;
    }

    const normalized = parsedShifts
      .filter((shift) =>
        shift &&
        typeof shift.name === "string" &&
        typeof shift.startTime === "string" &&
        typeof shift.endTime === "string"
      )
      .map((shift) => ({
        id: shift.id || `${shift.startTime}|${shift.endTime}|${shift.name}`,
        name: shift.name.trim(),
        startTime: shift.startTime,
        endTime: shift.endTime,
        color: typeof shift.color === "string" && shift.color ? shift.color : "shift-tone-inpak"
      }))
      .filter((shift) =>
        shift.name &&
        shift.startTime &&
        shift.endTime &&
        !isShopShiftName(shift.name) &&
        !/^Allrounddienst(?: \d+)?$/i.test(shift.name)
      );

    if (normalized.length === 0) {
      return defaultShifts;
    }

    const savedCatalogVersion = localStorage.getItem(getScopedStorageKey(shiftCatalogVersionKey));
    const shouldMigrateDefaults = savedCatalogVersion !== shiftCatalogVersion;
    const mergedShifts = shouldMigrateDefaults
      ? normalized.filter((shift) => !defaultShifts.some((defaultShift) => defaultShift.name.toLowerCase() === shift.name.toLowerCase()))
      : [...normalized];

    defaultShifts.forEach((defaultShift) => {
      if (shouldMigrateDefaults || !mergedShifts.some((shift) => shift.name.toLowerCase() === defaultShift.name.toLowerCase())) {
        mergedShifts.push(defaultShift);
      }
    });

    if (shouldMigrateDefaults) {
      safeSetStorageItem(getScopedStorageKey(shiftCatalogVersionKey), shiftCatalogVersion, "dienstversie");
    }

    return mergedShifts.sort((shiftA, shiftB) => shiftA.startTime.localeCompare(shiftB.startTime) || shiftA.name.localeCompare(shiftB.name, "nl"));
  } catch {
    return defaultShifts;
  }
}

function saveShifts() {
  safeSetStorageItem(getScopedStorageKey(shiftStorageKey), JSON.stringify(shifts), "diensten");
  safeSetStorageItem(getScopedStorageKey(shiftCatalogVersionKey), shiftCatalogVersion, "dienstversie");
}

function loadPreferences() {
  const savedPreferences = localStorage.getItem(preferencesStorageKey);

  if (!savedPreferences) {
    return {
      lastEmployee: "",
      lastShift: "",
      lastWeek: "",
      lastPortalEmployee: "",
      lastPortalWeek: "",
      lastHoursEmployee: "",
      lastHoursWeek: "",
      lastHoursDate: "",
      favoriteEmployees: [],
      employeeIdentity: "",
      lastRole: "planner",
      lastDataMode: "live",
      hasUserSession: false,
        plannerFocusMode: false,
        plannerControlMode: false,
        plannerDeviationOnly: false,
        lastWorkLogTimes: getDefaultLastWorkLogTimes(),
        mailDigestState: getDefaultMailDigestState()
      };
  }

  try {
    const parsedPreferences = JSON.parse(savedPreferences);
    return {
      lastEmployee: typeof parsedPreferences.lastEmployee === "string" ? parsedPreferences.lastEmployee : "",
      lastShift: typeof parsedPreferences.lastShift === "string" ? parsedPreferences.lastShift : "",
      lastWeek: typeof parsedPreferences.lastWeek === "string" ? parsedPreferences.lastWeek : "",
      lastPortalEmployee: typeof parsedPreferences.lastPortalEmployee === "string" ? parsedPreferences.lastPortalEmployee : "",
      lastPortalWeek: typeof parsedPreferences.lastPortalWeek === "string" ? parsedPreferences.lastPortalWeek : "",
      lastHoursEmployee: typeof parsedPreferences.lastHoursEmployee === "string" ? parsedPreferences.lastHoursEmployee : "",
      lastHoursWeek: typeof parsedPreferences.lastHoursWeek === "string" ? parsedPreferences.lastHoursWeek : "",
      lastHoursDate: typeof parsedPreferences.lastHoursDate === "string" ? parsedPreferences.lastHoursDate : "",
      favoriteEmployees: Array.isArray(parsedPreferences.favoriteEmployees)
        ? parsedPreferences.favoriteEmployees.filter((name) => typeof name === "string")
        : [],
      employeeIdentity: typeof parsedPreferences.employeeIdentity === "string" ? parsedPreferences.employeeIdentity : "",
      lastRole: parsedPreferences.lastRole === "employee" ? "employee" : "planner",
      lastDataMode: parsedPreferences.lastDataMode === "test" ? "test" : "live",
      hasUserSession: Boolean(parsedPreferences.hasUserSession),
        plannerFocusMode: Boolean(parsedPreferences.plannerFocusMode),
        plannerControlMode: Boolean(parsedPreferences.plannerControlMode),
        plannerDeviationOnly: Boolean(parsedPreferences.plannerDeviationOnly),
        lastWorkLogTimes: normalizeLastWorkLogTimes(parsedPreferences.lastWorkLogTimes),
        mailDigestState: {
          plannerSummary: typeof parsedPreferences.mailDigestState?.plannerSummary === "string"
            ? parsedPreferences.mailDigestState.plannerSummary
            : "",
          plannerOpenRequestsEmail: typeof parsedPreferences.mailDigestState?.plannerOpenRequestsEmail === "string"
            ? parsedPreferences.mailDigestState.plannerOpenRequestsEmail
            : "",
          plannerOverdueRequestsEmail: typeof parsedPreferences.mailDigestState?.plannerOverdueRequestsEmail === "string"
            ? parsedPreferences.mailDigestState.plannerOverdueRequestsEmail
            : "",
          plannerPendingHoursEmail: typeof parsedPreferences.mailDigestState?.plannerPendingHoursEmail === "string"
            ? parsedPreferences.mailDigestState.plannerPendingHoursEmail
            : "",
          plannerOverdueHoursEmail: typeof parsedPreferences.mailDigestState?.plannerOverdueHoursEmail === "string"
            ? parsedPreferences.mailDigestState.plannerOverdueHoursEmail
            : "",
          employeeMissingHours: parsedPreferences.mailDigestState?.employeeMissingHours && typeof parsedPreferences.mailDigestState.employeeMissingHours === "object"
            ? parsedPreferences.mailDigestState.employeeMissingHours
            : {},
          employeeMissingHoursEmail: parsedPreferences.mailDigestState?.employeeMissingHoursEmail && typeof parsedPreferences.mailDigestState.employeeMissingHoursEmail === "object"
            ? parsedPreferences.mailDigestState.employeeMissingHoursEmail
            : {}
        }
      };
  } catch {
    return {
      lastEmployee: "",
      lastShift: "",
      lastWeek: "",
      lastPortalEmployee: "",
      lastPortalWeek: "",
      lastHoursEmployee: "",
      lastHoursWeek: "",
      lastHoursDate: "",
      favoriteEmployees: [],
      employeeIdentity: "",
      lastRole: "planner",
      lastDataMode: "live",
      hasUserSession: false,
        plannerFocusMode: false,
        plannerControlMode: false,
        plannerDeviationOnly: false,
        lastWorkLogTimes: getDefaultLastWorkLogTimes(),
        mailDigestState: getDefaultMailDigestState()
      };
  }
}

function savePreferences() {
  safeSetStorageItem(preferencesStorageKey, JSON.stringify(preferences), "voorkeuren");
}

function createSampleEntry(name, day, shiftName, replacementFor = "") {
  const shift = shifts.find((item) => item.name === shiftName);

  if (!shift) {
    return null;
  }

  return {
    name,
    day,
    startTime: shift.startTime,
    endTime: shift.endTime,
    hours: calculateHours(shift.startTime, shift.endTime) || 0,
    shiftId: shift.id,
    shiftName: shift.name,
    proposed: false,
    replacementFor
  };
}

function ensureTestDataSeeded() {
  if (currentDataMode !== "test" || (employees.length > 0 || entries.length > 0 || timeOffRequests.length > 0 || swapRequests.length > 0)) {
    return;
  }

  const sampleEmployees = ["Jan", "Piet", "Sara", "Noor", "Milan"];
  const currentWeek = preferences.lastWeek || getCurrentWeekValue();
  const [monday, tuesday, wednesday, thursday, friday, saturday] = getWeekDates(currentWeek);
  const sampleEntries = [
    createSampleEntry("Jan", tuesday, "Draaidienst"),
    createSampleEntry("Piet", tuesday, "Ovendienst"),
    createSampleEntry("Sara", tuesday, "Banketdienst"),
    createSampleEntry("Milan", tuesday, "Winkeldienst 1"),
    createSampleEntry("Noor", wednesday, "Brooddienst"),
    createSampleEntry("Jan", wednesday, "Inpakdienst"),
    createSampleEntry("Piet", thursday, "Productiedienst"),
    createSampleEntry("Sara", friday, "Bezorgdienst"),
    createSampleEntry("Noor", saturday, "Winkeldienst 2")
  ].filter(Boolean);

  replaceArrayContents(employees, sampleEmployees.sort((nameA, nameB) => nameA.localeCompare(nameB, "nl")));
  replaceArrayContents(entries, sampleEntries);
  replaceArrayContents(timeOffRequests, [
    {
      id: `timeoff-${Date.now()}`,
      employeeName: "Jan",
      date: monday,
      reason: "Test vrije dag",
      status: "approved",
      type: "vrij"
    }
  ]);
  replaceArrayContents(swapRequests, [
    {
      id: `swap-${Date.now()}`,
      employeeName: "Sara",
      targetEmployeeName: "__open__",
      date: friday,
      shiftId: "",
      shiftName: "Bezorgdienst",
      startTime: "08:00",
      endTime: "12:30",
      status: "open"
    }
  ]);

  syncEmployeePermissions();
  employeeStandardShifts.Jan = "Draaidienst";
  employeeStandardShifts.Piet = "Ovendienst";
  employeeStandardShifts.Sara = "Banketdienst";
  employeeStandardShifts.Noor = "Brooddienst";
  employeeStandardShifts.Milan = "Bezorgdienst";
  syncEmployeeStandardShifts();
  syncEmployeeShiftPreferences();
  saveEmployees();
  saveEntries();
  saveTimeOffRequests();
  saveSwapRequests();
  saveEmployeePermissions();
  saveEmployeeStandardShifts();
  saveEmployeeShiftPreferences();
}

function reloadScopedData() {
  replaceArrayContents(entries, loadEntries());
  replaceArrayContents(employees, loadEmployees());
  replaceArrayContents(shifts, loadShifts());
  replaceArrayContents(timeOffRequests, loadTimeOffRequests());
  replaceArrayContents(swapRequests, loadSwapRequests());
  replaceArrayContents(workLogs, loadWorkLogs());
  replaceObjectContents(planningSettings, loadPlanningSettings());
  replaceObjectContents(employeePermissions, loadEmployeePermissions());
  replaceObjectContents(employeeStandardShifts, loadEmployeeStandardShifts());
  replaceObjectContents(employeeShiftPreferences, loadEmployeeShiftPreferences());
  replaceObjectContents(employeeBasePatterns, loadEmployeeBasePatterns());
  replaceObjectContents(employeeCustomRosters, loadEmployeeCustomRosters());
  replaceObjectContents(employeeMeta, loadEmployeeMeta());
  replaceObjectContents(mailSettings, loadMailSettings());
  replaceArrayContents(auditLog, loadAuditLog());
  replaceArrayContents(backupHistory, loadBackupHistory());
  autoFillPreviewEntries = [];
  planningDataRevision += 1;
  requestDataRevision += 1;
  previewDataRevision += 1;
  derivedDataCache.planningEntriesKey = "";
  derivedDataCache.visibleEntriesKey = "";
  derivedDataCache.filteredEntriesKey = "";
  derivedDataCache.approvedTimeOffKey = "";
  editIndex = null;
  editingShiftId = null;
  editingTimeOffId = null;
  editingSwapId = null;
  clearUndoState();
  mergeEmployeesFromEntries();
  ensureConfiguredBakeryEmployees();
  syncEmployeeMeta();
  syncEmployeePermissions();
  syncEmployeeStandardShifts();
  syncEmployeeShiftPreferences();
  syncEmployeeBasePatterns();
  syncEmployeeCustomRosters();
}

function resetTestPlanningData() {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan testdata resetten.", "error");
    return;
  }

  if (currentDataMode !== "test") {
    showMessage("Deze knop is alleen beschikbaar in testmodus.", "error");
    return;
  }

  if (!confirmAction("Weet je zeker dat je alle testplanning wilt leegmaken? Medewerkers, diensten en instellingen blijven bewaard.")) {
    return;
  }

  replaceArrayContents(entries, []);
  replaceArrayContents(timeOffRequests, []);
  replaceArrayContents(swapRequests, []);
  replaceArrayContents(workLogs, []);
  autoFillPreviewEntries = [];
  clearUndoState();
  editIndex = null;
  editingTimeOffId = null;
  editingSwapId = null;
  saveEntries();
  saveTimeOffRequests();
  saveSwapRequests();
  saveWorkLogs();
  render();
  showMessage("Testplanning is gereset.", "success");
}

function mergeEmployeesFromEntries() {
  const entryNames = [...new Set([
    ...entries.map((entry) => entry.name?.trim()),
    ...timeOffRequests.flatMap((request) => [request.employeeName?.trim(), request.targetEmployeeName?.trim()]),
    ...swapRequests.flatMap((request) => [request.employeeName?.trim(), request.offeredBy?.trim(), request.swapWithEmployee?.trim()]),
    ...workLogs.map((log) => log.employeeName?.trim())
  ].filter(Boolean))];
  let changed = false;

  entryNames.forEach((name) => {
    if (!employees.includes(name)) {
      employees.push(name);
      changed = true;
    }
  });

  if (changed) {
    employees.sort((nameA, nameB) => nameA.localeCompare(nameB, "nl"));
    saveEmployees();
  }
}

const {
  formatDate = function fallbackFormatDate(value) {
    return new Intl.DateTimeFormat("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(new Date(value));
  },
  formatWeekday = function fallbackFormatWeekday(value) {
    return new Intl.DateTimeFormat("nl-NL", {
      weekday: "long"
    }).format(new Date(value));
  }
} = window.StroetFormatUtils || {};

function getCurrentWeekValue() {
  const today = new Date();
  const date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const dayNumber = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
}

function getMonthValueFromDate(dateValue) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(dateValue || ""))) {
    return "";
  }

  return String(dateValue).slice(0, 7);
}

function getCurrentMonthValue() {
  return getTodayLocalDateValue().slice(0, 7);
}

function formatMonthLabel(monthValue) {
  if (!/^\d{4}-\d{2}$/.test(String(monthValue || ""))) {
    return monthValue || "";
  }

  const [year, month] = String(monthValue).split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  return new Intl.DateTimeFormat("nl-NL", {
    month: "long",
    year: "numeric"
  }).format(date);
}

function getWeekValueFromDate(dateValue) {
  const date = new Date(`${dateValue}T00:00:00`);
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = utcDate.getUTCDay() || 7;
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil((((utcDate - yearStart) / 86400000) + 1) / 7);
  return `${utcDate.getUTCFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
}

function getDateFromWeekValue(weekValue) {
  const [yearPart, weekPart] = weekValue.split("-W");
  const year = Number(yearPart);
  const week = Number(weekPart);
  const januaryFourth = new Date(Date.UTC(year, 0, 4));
  const dayNumber = januaryFourth.getUTCDay() || 7;
  const monday = new Date(januaryFourth);
  monday.setUTCDate(januaryFourth.getUTCDate() - dayNumber + 1 + (week - 1) * 7);
  return monday;
}

function formatDateInput(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getPreviousWeekValue(weekValue) {
  const monday = getDateFromWeekValue(weekValue);
  monday.setUTCDate(monday.getUTCDate() - 7);
  return getWeekValueFromDate(formatDateInput(monday));
}

function getNextWeekValue(weekValue) {
  const monday = getDateFromWeekValue(weekValue);
  monday.setUTCDate(monday.getUTCDate() + 7);
  return getWeekValueFromDate(formatDateInput(monday));
}

function formatLocalDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayDateValue() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return formatLocalDateValue(today);
}

function getTomorrowDateValue() {
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatLocalDateValue(tomorrow);
}

function getRelativeDayState(dateValue) {
  if (dateValue === getTodayDateValue()) {
    return "today";
  }

  if (dateValue === getTomorrowDateValue()) {
    return "tomorrow";
  }

  return "";
}

function renderRelativeDayLabel(dateValue) {
  const relativeDayState = getRelativeDayState(dateValue);

  if (relativeDayState === "today") {
    return '<span class="relative-day-badge is-today">Vandaag</span>';
  }

  if (relativeDayState === "tomorrow") {
    return '<span class="relative-day-badge is-tomorrow">Morgen</span>';
  }

  return "";
}

function addDaysToDateValue(dateValue, days) {
  const date = new Date(`${dateValue}T00:00:00`);
  date.setDate(date.getDate() + days);
  return formatLocalDateValue(date);
}

function getEasterDateValue(year) {
  const century = Math.floor(year / 100);
  const yearOfCentury = year % 100;
  const leapCorrection = Math.floor(century / 4);
  const centuryRemainder = century % 4;
  const lunarCorrection = Math.floor((century + 8) / 25);
  const centuryMoonOffset = Math.floor((century - lunarCorrection + 1) / 3);
  const goldenNumber = year % 19;
  const epact = (19 * goldenNumber + century - leapCorrection - centuryMoonOffset + 15) % 30;
  const yearLeap = Math.floor(yearOfCentury / 4);
  const yearRemainder = yearOfCentury % 4;
  const weekdayOffset = (32 + (2 * centuryRemainder) + (2 * yearLeap) - epact - yearRemainder) % 7;
  const moonCorrection = Math.floor((goldenNumber + (11 * epact) + (22 * weekdayOffset)) / 451);
  const month = Math.floor((epact + weekdayOffset - (7 * moonCorrection) + 114) / 31);
  const day = ((epact + weekdayOffset - (7 * moonCorrection) + 114) % 31) + 1;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getNthWeekdayOfMonthDateValue(year, monthIndex, weekdayNumber, occurrence) {
  const firstDay = new Date(year, monthIndex, 1);
  const firstWeekday = firstDay.getDay() || 7;
  const offset = (weekdayNumber - firstWeekday + 7) % 7;
  firstDay.setDate(1 + offset + ((occurrence - 1) * 7));
  return formatLocalDateValue(firstDay);
}

function getKingsDayDateValue(year) {
  const kingsDay = `${year}-04-27`;
  return getWeekdayNumberFromDate(kingsDay) === 7 ? `${year}-04-26` : kingsDay;
}

function getHolidayAllroundTemplatesByWeekday() {
  return {
    1: [
      { id: "allround-1", name: "Allrounddienst 1", startTime: "08:00", endTime: "14:00", color: "shift-tone-productie" },
      { id: "allround-2", name: "Allrounddienst 2", startTime: "11:00", endTime: "17:00", color: "shift-tone-productie" }
    ],
    2: [
      { id: "allround-1", name: "Allrounddienst 1", startTime: "08:00", endTime: "14:00", color: "shift-tone-productie" },
      { id: "allround-2", name: "Allrounddienst 2", startTime: "11:00", endTime: "17:00", color: "shift-tone-productie" }
    ],
    3: [
      { id: "allround-1", name: "Allrounddienst 1", startTime: "08:00", endTime: "14:00", color: "shift-tone-productie" },
      { id: "allround-2", name: "Allrounddienst 2", startTime: "11:00", endTime: "17:00", color: "shift-tone-productie" }
    ],
    4: [
      { id: "allround-1", name: "Allrounddienst 1", startTime: "14:00", endTime: "17:00", color: "shift-tone-productie" },
      { id: "allround-2", name: "Allrounddienst 2", startTime: "08:00", endTime: "14:00", color: "shift-tone-productie" }
    ],
    5: [
      { id: "allround-1", name: "Allrounddienst 1", startTime: "14:00", endTime: "17:00", color: "shift-tone-productie" },
      { id: "allround-2", name: "Allrounddienst 2", startTime: "08:00", endTime: "14:00", color: "shift-tone-productie" }
    ],
    6: [
      { id: "allround-1", name: "Allrounddienst 1", startTime: "06:00", endTime: "12:00", color: "shift-tone-productie" },
      { id: "allround-2", name: "Allrounddienst 2", startTime: "08:00", endTime: "17:00", color: "shift-tone-productie" }
    ],
    7: [
      { id: "allround-1", name: "Allrounddienst 1", startTime: "08:00", endTime: "14:00", color: "shift-tone-productie" },
      { id: "allround-2", name: "Allrounddienst 2", startTime: "11:00", endTime: "17:00", color: "shift-tone-productie" }
    ]
  };
}

function getSpecialDayDefinitionsForYear(year) {
  if (!Number.isFinite(year)) {
    return {};
  }

  if (!getSpecialDayDefinitionsForYear.cache) {
    getSpecialDayDefinitionsForYear.cache = {};
  }

  if (getSpecialDayDefinitionsForYear.cache[year]) {
    return getSpecialDayDefinitionsForYear.cache[year];
  }

  const definitions = {};
  const addSpecialDay = (dateValue, config) => {
    if (!dateValue) {
      return;
    }

    if (!definitions[dateValue]) {
      definitions[dateValue] = [];
    }

    definitions[dateValue].push({
      shopTarget: 0,
      allroundTarget: 0,
      ...config
    });
  };
  const easterSunday = getEasterDateValue(year);
  const easterMonday = addDaysToDateValue(easterSunday, 1);
  const ascensionDay = addDaysToDateValue(easterSunday, 39);
  const pentecostSunday = addDaysToDateValue(easterSunday, 49);
  const pentecostMonday = addDaysToDateValue(easterSunday, 50);
  const carnivalTuesday = addDaysToDateValue(easterSunday, -47);

  addSpecialDay(getNthWeekdayOfMonthDateValue(year, 4, 7, 2), {
    name: "Moederdag",
    typeLabel: "Feestdag",
    dayLabel: "Drukke dag",
    shopTarget: 6,
    allroundTarget: 2
  });
  addSpecialDay(getNthWeekdayOfMonthDateValue(year, 5, 7, 3), {
    name: "Vaderdag",
    typeLabel: "Feestdag",
    dayLabel: "Drukke dag",
    shopTarget: 5,
    allroundTarget: 1
  });
  addSpecialDay(getKingsDayDateValue(year), {
    name: "Koningsdag",
    typeLabel: "Feestdag",
    dayLabel: "Drukke dag",
    shopTarget: 5,
    allroundTarget: 1
  });
  addSpecialDay(ascensionDay, {
    name: "Hemelvaart",
    typeLabel: "Feestdag",
    closedLabel: "Gesloten",
    closed: true
  });
  addSpecialDay(easterSunday, {
    name: "Pasen",
    typeLabel: "Feestdag",
    dayLabel: "Drukke dag",
    shopTarget: 5,
    allroundTarget: 1
  });
  addSpecialDay(easterMonday, {
    name: "2e paasdag",
    typeLabel: "Feestdag",
    closedLabel: "Gesloten",
    closed: true
  });
  addSpecialDay(pentecostSunday, {
    name: "Pinksteren",
    typeLabel: "Feestdag",
    dayLabel: "Drukke dag",
    shopTarget: 5,
    allroundTarget: 1
  });
  addSpecialDay(pentecostMonday, {
    name: "2e pinksterdag",
    typeLabel: "Feestdag",
    dayLabel: "Drukke dag",
    shopTarget: 4,
    allroundTarget: 1
  });
  addSpecialDay(`${year}-12-25`, {
    name: "Kerst",
    typeLabel: "Feestdag",
    dayLabel: "Drukke dag",
    shopTarget: 6,
    allroundTarget: 2
  });
  addSpecialDay(`${year}-12-26`, {
    name: "2e kerstdag",
    typeLabel: "Feestdag",
    closedLabel: "Gesloten",
    closed: true
  });
  addSpecialDay(`${year}-12-31`, {
    name: "Oud en nieuw",
    typeLabel: "Feestdag",
    dayLabel: "Drukke dag",
    shopTarget: 6,
    allroundTarget: 2
  });
  addSpecialDay(`${year}-01-01`, {
    name: "Nieuwjaarsdag",
    typeLabel: "Feestdag",
    closedLabel: "Gesloten",
    closed: true
  });
  addSpecialDay(`${year}-01-02`, {
    name: "2 januari",
    closedLabel: "Gesloten",
    closed: true
  });
  addSpecialDay(`${year}-01-03`, {
    name: "3 januari",
    closedLabel: "Gesloten",
    closed: true
  });
  addSpecialDay(carnivalTuesday, {
    name: "Dinsdag na carnaval",
    closedLabel: "Gesloten",
    closed: true
  });

  if (year % 5 === 0) {
    addSpecialDay(`${year}-05-05`, {
      name: "Bevrijdingsdag",
      typeLabel: "Feestdag",
      closedLabel: "Gesloten",
      closed: true
    });
  }

  getSpecialDayDefinitionsForYear.cache[year] = definitions;
  return definitions;
}

function getRecognizedSpecialDayInfo(dateValue) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(dateValue || ""))) {
    return null;
  }

  const year = Number(String(dateValue).slice(0, 4));
  const items = getSpecialDayDefinitionsForYear(year)[dateValue] || [];

  if (!items.length) {
    return null;
  }

  return {
    dateValue,
    items,
    nameLabel: items.map((item) => item.name).join(" / "),
    isClosed: items.some((item) => item.closed),
    shopTarget: Math.max(...items.map((item) => item.shopTarget || 0), 0),
    allroundTarget: Math.max(...items.map((item) => item.allroundTarget || 0), 0)
  };
}

function isClosedPlannerDay(dateValue) {
  return isClosedPlannerDayHelper(dateValue, {
    getRecognizedSpecialDayInfo
  });
}

function renderSpecialDayBadges(dateValue, { compact = false } = {}) {
  const specialDay = getRecognizedSpecialDayInfo(dateValue);

  if (!specialDay) {
    return "";
  }

  const labelItems = [];

  if (specialDay.isClosed) {
    labelItems.push('<span class="special-day-badge is-closed">Gesloten</span>');
  }

  if (specialDay.items.some((item) => item.typeLabel === "Feestdag")) {
    labelItems.push('<span class="special-day-badge is-holiday">Feestdag</span>');
  }

  if (!specialDay.isClosed && specialDay.items.some((item) => item.dayLabel === "Drukke dag")) {
    labelItems.push('<span class="special-day-badge is-busy">Drukke dag</span>');
  }

  return `
    <div class="special-day-badges${compact ? " is-compact" : ""}">
      ${labelItems.join("")}
      <span class="special-day-name">${specialDay.nameLabel}</span>
    </div>
  `;
}

function syncStartWeekToCurrent() {
  const currentWeek = getCurrentWeekValue();
  const currentMonth = getCurrentMonthValue();

  weekInput.value = currentWeek;
  weekFilterInput.value = currentWeek;
  myScheduleWeekInput.value = currentWeek;
  hoursWeekInput.value = currentWeek;

  if (approvalWeekInput) {
    approvalWeekInput.value = currentWeek;
  }

  if (hoursExportWeekInput) {
    hoursExportWeekInput.value = currentWeek;
  }

  if (hoursExportMonthInput) {
    hoursExportMonthInput.value = currentMonth;
  }

  copyTargetWeekInput.value = currentWeek;
  copySourceWeekInput.value = getPreviousWeekValue(currentWeek);

  const weekDates = getWeekDates(currentWeek);
  dayPlannerDateInput.value = weekDates.find((day) => day === getTodayDateValue()) || weekDates[1] || weekDates[0] || "";
}

function getWeekdayNumberFromDate(dateValue) {
  const day = new Date(`${dateValue}T00:00:00`).getDay();
  return day === 0 ? 7 : day;
}

function isShopShiftName(shiftName) {
  return /^Winkeldienst \d+$/i.test(shiftName || "");
}

function isAllroundShiftName(shiftName) {
  return /^Allrounddienst [12]$/i.test(shiftName || "");
}

function isStageShiftName(shiftName) {
  return /^Stageplek [12]$/i.test(shiftName || "");
}

function isOptionalShift(shift) {
  return isStageShiftName(shift?.name || "");
}

function getShopShiftNumber(shiftName) {
  const match = String(shiftName || "").match(/Winkeldienst (\d+)/i);
  return match ? Number(match[1]) : null;
}

function getShopShiftColor(number) {
  return `shift-tone-winkel-${Math.min(number, 6)}`;
}

function getAllroundSlotsForDate(dateValue) {
  if (isClosedPlannerDay(dateValue)) {
    return [];
  }

  const weekday = getWeekdayNumberFromDate(dateValue);
  const templates = getAllroundTemplatesByWeekday()[weekday] || [];
  const specialDay = getRecognizedSpecialDayInfo(dateValue);
  const holidayTemplates = getHolidayAllroundTemplatesByWeekday()[weekday] || [];
  const targetCount = specialDay
    ? Math.max(templates.length, specialDay.allroundTarget || 0)
    : templates.length;
  const sourceTemplates = targetCount > templates.length ? holidayTemplates : templates;

  return sourceTemplates.slice(0, targetCount).map((slot) => ({
    ...slot,
    isAllroundShift: true
  }));
}

function getDateSpecificShifts(dateValue) {
  if (!dateValue) {
    return [];
  }

  return [
    ...getAllroundSlotsForDate(dateValue),
    ...getShopSlotsForDate(dateValue)
  ];
}

function getShopSlotsForDate(dateValue) {
  if (isClosedPlannerDay(dateValue)) {
    return [];
  }

  const weekday = getWeekdayNumberFromDate(dateValue);
  const weekdayTemplates = getDefaultShopTemplatesByWeekday()[weekday] || [];
  const overrideCount = planningSettings.overrides[dateValue];
  const specialDay = getRecognizedSpecialDayInfo(dateValue);
  const baseConfiguredCount = Number.isFinite(overrideCount)
    ? overrideCount
    : Number(planningSettings.winkelPerWeekday[String(weekday)] ?? weekdayTemplates.length);
  const configuredCount = Number.isFinite(overrideCount)
    ? baseConfiguredCount
    : Math.max(baseConfiguredCount, specialDay?.shopTarget || 0);
  const sourceTemplates = Number.isFinite(overrideCount) || configuredCount > weekdayTemplates.length
    ? getHolidayShopTemplates()
    : weekdayTemplates;

  return sourceTemplates.slice(0, Math.max(0, Math.min(8, configuredCount))).map((slot) => ({
    id: `shop-${slot.number}`,
    name: `Winkeldienst ${slot.number}`,
    startTime: slot.startTime,
    endTime: slot.endTime,
    color: getShopShiftColor(slot.number),
    isShopShift: true
  }));
}

function getShopCoverageForDate(dateValue) {
  return getShopCoverageForDateHelper(dateValue, {
    getRecognizedSpecialDayInfo,
    getShopSlotsForDate,
    entries,
    isShopShiftName,
    getShiftName
  });
}

function isNonRequiredFilledShift(entry) {
  return isStageShiftName(getShiftName(entry));
}

function calculateHours(startTime, endTime) {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const startTotal = startHour * 60 + startMinute;
  const endTotal = endHour * 60 + endMinute;

  if (endTotal <= startTotal) {
    return null;
  }

  return (endTotal - startTotal) / 60;
}

function timeToMinutes(timeValue) {
  const [hours, minutes] = timeValue.split(":").map(Number);
  return (hours * 60) + minutes;
}

const {
  createRequestId = function fallbackCreateRequestId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  }
} = window.StroetRequestsFeature || {};

function escapeCsvValue(value) {
  const stringValue = String(value ?? "");
  return `"${stringValue.replace(/"/g, "\"\"")}"`;
}

function downloadCsvContent(csvContent, fileName) {
  const blob = new Blob([`\uFEFF${csvContent}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function exportFilteredEntriesToCsv() {
  const visibleEntries = getFilteredEntries();

  if (visibleEntries.length === 0) {
    showMessage("Er zijn geen roosterregels om te exporteren.", "error");
    return;
  }

  const selectedWeek = weekFilterInput.value || getCurrentWeekValue();
  const weekLabel = `Week ${selectedWeek.replace("-W", "-")}`;
  const header = ["Medewerker", "Week", "Datum", "Dag", "Dienst", "Begintijd", "Eindtijd", "Aantal uren", "Status"];
  const rows = visibleEntries.map((entry) => [
    entry.name,
    weekLabel,
    entry.day,
    formatWeekday(entry.day),
    getShiftName(entry),
    entry.startTime,
    entry.endTime,
    entry.hours.toFixed(2).replace(".", ","),
    entry.replacementFor ? `Vervangt ${entry.replacementFor}` : "Ingepland"
  ]);

  const csvContent = [header, ...rows]
    .map((row) => row.map(escapeCsvValue).join(";"))
    .join("\r\n");
  const fileWeekLabel = selectedWeek.replace("-W", "-week-");
  downloadCsvContent(csvContent, `urenrooster-${fileWeekLabel}.csv`);

  showMessage("Export gestart.", "success");
}

function getHoursExportSelection() {
  const periodType = hoursExportPeriodSelect?.value === "month" ? "month" : "week";
  const weekValue = String(hoursExportWeekInput?.value || approvalWeekInput?.value || hoursWeekInput?.value || getCurrentWeekValue()).trim();
  const monthValue = String(hoursExportMonthInput?.value || getMonthValueFromDate(getTodayLocalDateValue()) || getCurrentMonthValue()).trim();

  return periodType === "month"
    ? {
      periodType,
      periodValue: monthValue,
      periodLabel: formatMonthLabel(monthValue),
      fileLabel: monthValue
    }
    : {
      periodType,
      periodValue: weekValue,
      periodLabel: `Week ${weekValue.replace("-W", "-")}`,
      fileLabel: weekValue.replace("-W", "-week-")
    };
}

function exportHoursForAdministration() {
  if (!isPlannerRole()) {
    showMessage("Alleen directie of planner kan uren exporteren.", "error");
    return;
  }

  const { periodType, periodValue, periodLabel, fileLabel } = getHoursExportSelection();

  if (!periodValue) {
    showMessage(periodType === "month" ? "Kies eerst een geldige exportmaand." : "Kies eerst een geldige exportweek.", "error");
    return;
  }

  const relevantLogs = workLogs
    .filter((log) => log.employeeName && log.day)
    .filter((log) => periodType === "month"
      ? getMonthValueFromDate(log.day) === periodValue
      : getWeekValueFromDate(log.day) === periodValue)
    .map((log) => ({
      ...log,
      workedHours: getWorkedHoursFromLog(log)
    }))
    .filter((log) => Number.isFinite(log.workedHours) && log.workedHours > 0);

  if (!relevantLogs.length) {
    showMessage("Er zijn geen urenregistraties om te exporteren voor deze periode.", "warning");
    return;
  }

  const totalsByEmployee = relevantLogs.reduce((accumulator, log) => {
    accumulator[log.employeeName] = (accumulator[log.employeeName] || 0) + log.workedHours;
    return accumulator;
  }, {});

  const rowsByEmployeeDate = relevantLogs.reduce((accumulator, log) => {
    const key = `${log.employeeName}__${log.day}`;
    const existingRow = accumulator.get(key) || {
      employeeName: log.employeeName,
      day: log.day,
      workedHours: 0
    };
    existingRow.workedHours += log.workedHours;
    accumulator.set(key, existingRow);
    return accumulator;
  }, new Map());

  const header = ["Medewerker", "Periode", "Datum", "Gewerkte uren", "Totaal medewerker"];
  const rows = [...rowsByEmployeeDate.values()]
    .sort((rowA, rowB) => rowA.employeeName.localeCompare(rowB.employeeName, "nl") || rowA.day.localeCompare(rowB.day))
    .map((row) => [
      row.employeeName,
      periodLabel,
      row.day,
      row.workedHours.toFixed(2).replace(".", ","),
      (totalsByEmployee[row.employeeName] || 0).toFixed(2).replace(".", ",")
    ]);

  const csvContent = [header, ...rows]
    .map((row) => row.map(escapeCsvValue).join(";"))
    .join("\r\n");

  downloadCsvContent(csvContent, `urenadministratie-${fileLabel}.csv`);
  showMessage("Urenexport gestart.", "success");
}

function getMessageAutoHideMs(type) {
  return type === "error" ? 4200 : type === "warning" ? 3400 : 2200;
}

function renderActiveMessage() {
  if (!messageBox) {
    return;
  }

  if (!activeMessageState) {
    messageBox.textContent = "";
    messageBox.hidden = true;
    setClassName(messageBox, "message hidden compact-message");
    messageBox.removeAttribute("role");
    messageBox.removeAttribute("aria-live");
    return;
  }

  messageBox.textContent = activeMessageState.text;
  messageBox.hidden = false;
  setClassName(messageBox, `message compact-message ${activeMessageState.type}`);
  messageBox.setAttribute("role", activeMessageState.type === "error" ? "alert" : "status");
  messageBox.setAttribute("aria-live", activeMessageState.type === "error" ? "assertive" : "polite");
}

function scheduleActiveMessageHide() {
  if (messageTimeoutId) {
    window.clearTimeout(messageTimeoutId);
    messageTimeoutId = null;
  }

  if (!activeMessageState) {
    return;
  }

  messageTimeoutId = window.setTimeout(() => {
    dismissActiveMessage();
  }, activeMessageState.autoHideMs || getMessageAutoHideMs(activeMessageState.type));
}

function pumpMessageQueue() {
  if (activeMessageState || !queuedMessageStates.length) {
    return;
  }

  activeMessageState = queuedMessageStates.shift();
  renderActiveMessage();
  scheduleActiveMessageHide();
}

function dismissActiveMessage() {
  if (messageTimeoutId) {
    window.clearTimeout(messageTimeoutId);
    messageTimeoutId = null;
  }

  activeMessageState = null;
  renderActiveMessage();

  if (queuedMessageStates.length) {
    window.setTimeout(() => {
      pumpMessageQueue();
    }, 80);
  }
}

function enqueueMessage(text, type, autoHideMs) {
  if (!text) {
    return;
  }

  const normalizedType = type === "error" || type === "warning" ? type : "success";
  const nextMessage = {
    text,
    type: normalizedType,
    autoHideMs: autoHideMs || getMessageAutoHideMs(normalizedType)
  };

  const isDuplicateActive = activeMessageState && activeMessageState.text === nextMessage.text && activeMessageState.type === nextMessage.type;
  const lastQueuedMessage = queuedMessageStates.length ? queuedMessageStates[queuedMessageStates.length - 1] : null;
  const isDuplicateQueued = lastQueuedMessage && lastQueuedMessage.text === nextMessage.text && lastQueuedMessage.type === nextMessage.type;

  if (isDuplicateActive || isDuplicateQueued) {
    return;
  }

  if (!activeMessageState) {
    activeMessageState = nextMessage;
    renderActiveMessage();
    scheduleActiveMessageHide();
    return;
  }

  queuedMessageStates.push(nextMessage);
}

function showMessage(text, type) {
  enqueueMessage(text, type);
}

function showSuccessNotice(text, options = {}) {
  const { deferred = false } = options;
  if (deferred) {
    window.setTimeout(() => {
      showMessage(text, "success");
    }, 0);
    return;
  }

  showMessage(text, "success");
}

function triggerSuccess(text, options = {}) {
  showSuccessNotice(text, { deferred: true, ...options });
}

function showToast(text, options = {}) {
  const { type = "success" } = options;
  showMessage(text, type);
}

function showSavedMessage() {
  showSuccessNotice("Opgeslagen.");
}

function showDeletedMessage(text = "Verwijderd.") {
  showSuccessNotice(text);
}

function showRequestSubmittedMessage() {
  triggerSuccess("Aanvraag verzonden");
}

function confirmAction(text = "Weet je het zeker?") {
  return window.confirm(text);
}

function hideMessage() {
  if (messageTimeoutId) {
    window.clearTimeout(messageTimeoutId);
    messageTimeoutId = null;
  }

  activeMessageState = null;
  queuedMessageStates = [];
  renderActiveMessage();
}

function removeMatchingItems(list, predicate) {
  for (let index = list.length - 1; index >= 0; index -= 1) {
    if (predicate(list[index], index)) {
      list.splice(index, 1);
    }
  }
}

function selectAdjacentEmployee(select, direction = 1) {
  if (!select || employees.length === 0) {
    return "";
  }

  const currentIndex = employees.indexOf(select.value);

  if (currentIndex === -1) {
    return direction >= 0 ? employees[0] : employees[employees.length - 1];
  }

  const nextIndex = (currentIndex + direction + employees.length) % employees.length;
  return employees[nextIndex];
}

function getSelectedWeekdays() {
  return weekdayOptions
    .filter((option) => option.checked)
    .map((option) => Number(option.value));
}

function clearSelectedWeekdays() {
  weekdayOptions.forEach((option) => {
    option.checked = false;
  });
}

function applySavedPreferences() {
  if (preferences.lastEmployee && employees.includes(preferences.lastEmployee)) {
    nameSelect.value = preferences.lastEmployee;
  }

  if (preferences.lastShift && shifts.some((shift) => shift.id === preferences.lastShift)) {
    presetShiftSelect.value = preferences.lastShift;
    const selectedShift = shifts.find((shift) => shift.id === preferences.lastShift);
    if (selectedShift) {
      document.getElementById("startTime").value = selectedShift.startTime;
      document.getElementById("endTime").value = selectedShift.endTime;
    }
  }

  if (preferences.lastPortalWeek) {
    myScheduleWeekInput.value = preferences.lastPortalWeek;
  }

  if (preferences.lastHoursWeek) {
    hoursWeekInput.value = preferences.lastHoursWeek;
    if (approvalWeekInput) {
      approvalWeekInput.value = preferences.lastHoursWeek;
    }
    if (hoursExportWeekInput) {
      hoursExportWeekInput.value = preferences.lastHoursWeek;
    }
  } else if (approvalWeekInput) {
    approvalWeekInput.value = hoursWeekInput.value;
    if (hoursExportWeekInput) {
      hoursExportWeekInput.value = hoursWeekInput.value;
    }
  } else if (hoursExportWeekInput) {
    hoursExportWeekInput.value = hoursWeekInput.value || getCurrentWeekValue();
  }

  if (hoursDateInput) {
    hoursDateInput.max = getTodayLocalDateValue();
    hoursDateInput.value = clampHoursDateValue(preferences.lastHoursDate || getTodayLocalDateValue());
  }

  if (hoursExportMonthInput) {
    hoursExportMonthInput.value = getMonthValueFromDate(hoursDateInput?.value || getTodayLocalDateValue()) || getCurrentMonthValue();
  }

  if (preferences.lastPortalEmployee && employees.includes(preferences.lastPortalEmployee)) {
    portalEmployeeSelect.value = preferences.lastPortalEmployee;
  }

  if (preferences.lastHoursEmployee && employees.includes(preferences.lastHoursEmployee)) {
    hoursEmployeeSelect.value = preferences.lastHoursEmployee;
  }
}

function getDatesForSelectedWeekdays(weekValue, weekdays) {
  const weekStart = getDateFromWeekValue(weekValue);

  return weekdays.map((weekday) => {
    const date = new Date(weekStart);
    date.setUTCDate(weekStart.getUTCDate() + weekday - 1);
    return formatDateInput(date);
  });
}

function getWeekDates(weekValue) {
  const weekStart = getDateFromWeekValue(weekValue);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setUTCDate(weekStart.getUTCDate() + index);
    return formatDateInput(date);
  });
}

function getShiftColorClass(entry) {
  const matchingShift = getShiftForEntry(entry);
  if (matchingShift?.color) {
    return matchingShift.color;
  }

  if (isShopShiftName(entry.shiftName)) {
    return getShopShiftColor(getShopShiftNumber(entry.shiftName) || 1);
  }

  return "shift-tone-inpak";
}

function getShiftName(entry) {
  const matchingShift = getShiftForEntry(entry);
  return matchingShift?.name || entry.shiftName || "Dienst";
}

function getShiftForEntry(entry) {
  if (entry.shiftName && isAllroundShiftName(entry.shiftName) && entry.day) {
    const allroundShift = getAllroundSlotsForDate(entry.day).find((shift) => shift.name.toLowerCase() === entry.shiftName.toLowerCase());

    if (allroundShift) {
      return allroundShift;
    }
  }

  if (entry.shiftName && isShopShiftName(entry.shiftName) && entry.day) {
    const shopShiftNumber = getShopShiftNumber(entry.shiftName);
    const shopShift = getShopSlotsForDate(entry.day).find((shift) => shift.number === shopShiftNumber);

    if (shopShift) {
      return shopShift;
    }
  }

  if (entry.shiftId) {
    const byId = shifts.find((shift) => shift.id === entry.shiftId);

    if (byId) {
      return byId;
    }
  }

  if (entry.shiftName) {
    const byName = shifts.find((shift) => shift.name.toLowerCase() === entry.shiftName.toLowerCase());

    if (byName) {
      return byName;
    }
  }

  return shifts.find((shift) => shift.startTime === entry.startTime && shift.endTime === entry.endTime) || null;
}

function getSelectedShift(shiftId, startTime, endTime, day) {
  if (shiftId && shiftId.startsWith("allround-")) {
    return getAllroundSlotsForDate(day).find((shift) => shift.id === shiftId) || null;
  }

  if (shiftId && shiftId.startsWith("shop-")) {
    return getShopSlotsForDate(day).find((shift) => shift.id === shiftId) || null;
  }

  if (shiftId) {
    return shifts.find((shift) => shift.id === shiftId) || null;
  }

  return shifts.find((shift) => shift.startTime === startTime && shift.endTime === endTime) ||
    getAllroundSlotsForDate(day).find((shift) => shift.startTime === startTime && shift.endTime === endTime) ||
    getShopSlotsForDate(day).find((shift) => shift.startTime === startTime && shift.endTime === endTime) ||
    null;
}

function getApprovedTimeOff(employeeName, date) {
  if (!employeeName || !date) {
    return null;
  }

  return timeOffRequests.find((request) =>
    request.status === "approved" &&
    request.employeeName === employeeName &&
    requestIncludesDate(request, date)
  ) || null;
}

const {
  getAbsenceTypeLabel = function fallbackGetAbsenceTypeLabel(type) {
    if (type === "vakantie") {
      return "Vakantie";
    }

    if (type === "ziek") {
      return "Ziek";
    }

    return "Vrij";
  },
  getAbsenceCardClass = function fallbackGetAbsenceCardClass(type) {
    if (type === "vakantie") {
      return "vacation";
    }

    if (type === "ziek") {
      return "sick";
    }

    return "free";
  },
  getApprovedAbsenceLabel = function fallbackGetApprovedAbsenceLabel(request) {
    if (!request) {
      return "";
    }

    return `${getAbsenceTypeLabel(request.type)} goedgekeurd`;
  },
  getApprovedAbsenceDetail = function fallbackGetApprovedAbsenceDetail(request) {
    if (!request) {
      return "";
    }

    return `${getAbsenceTypeLabel(request.type).toLowerCase()}${request.reason ? `: ${request.reason}` : ""}`;
  },
  getTimeOffStartDate = function fallbackGetTimeOffStartDate(request) {
    if (!request) {
      return "";
    }

    return typeof request.startDate === "string" && request.startDate
      ? request.startDate
      : (typeof request.date === "string" ? request.date : "");
  },
  getTimeOffEndDate = function fallbackGetTimeOffEndDate(request) {
    if (!request) {
      return "";
    }

    if (request.type === "vakantie") {
      return typeof request.endDate === "string" && request.endDate
        ? request.endDate
        : getTimeOffStartDate(request);
    }

    return getTimeOffStartDate(request);
  },
  requestIncludesDate = function fallbackRequestIncludesDate(request, date) {
    const startDate = getTimeOffStartDate(request);
    const endDate = getTimeOffEndDate(request);

    if (!startDate || !endDate || !date) {
      return false;
    }

    return date >= startDate && date <= endDate;
  },
  requestOverlapsRange = function fallbackRequestOverlapsRange(request, startDate, endDate) {
    const requestStartDate = getTimeOffStartDate(request);
    const requestEndDate = getTimeOffEndDate(request);

    if (!requestStartDate || !requestEndDate || !startDate || !endDate) {
      return false;
    }

    return requestStartDate <= endDate && requestEndDate >= startDate;
  },
  getTimeOffDisplayRange = function fallbackGetTimeOffDisplayRange(request) {
    const startDate = getTimeOffStartDate(request);
    const endDate = getTimeOffEndDate(request);

    if (!startDate) {
      return "";
    }

    if (request?.type === "vakantie" && endDate && endDate !== startDate) {
      return `${formatDate(startDate)} t/m ${formatDate(endDate)}`;
    }

    return formatDate(startDate);
  }
} = window.StroetRequestsFeature || {};

const {
  addMinutesToTimeValue = function fallbackAddMinutesToTimeValue(timeValue, minutesToAdd) {
    if (!timeValue || !Number.isFinite(Number(minutesToAdd))) {
      return timeValue || "";
    }

    const [hoursPart, minutesPart] = String(timeValue).split(":").map((value) => Number(value) || 0);
    const totalMinutes = Math.max(0, (hoursPart * 60) + minutesPart + Number(minutesToAdd));
    const nextHours = Math.floor(totalMinutes / 60) % 24;
    const nextMinutes = totalMinutes % 60;
    return `${String(nextHours).padStart(2, "0")}:${String(nextMinutes).padStart(2, "0")}`;
  },
  buildHoursManualEntry = function fallbackBuildHoursManualEntry(employeeName, day, shiftName = "Extra uren") {
    return {
      name: employeeName,
      day,
      shiftName,
      startTime: "",
      endTime: "",
      hours: 0,
      isManualHours: true
    };
  },
  buildManualWorkLogId = function fallbackBuildManualWorkLogId(employeeName, day) {
    return ["manual", employeeName, day].join("|");
  },
  buildWorkLogId = function fallbackBuildWorkLogId(employeeName, day, shiftName, plannedStart, plannedEnd) {
    return [employeeName, day, shiftName, plannedStart, plannedEnd].join("|");
  },
  calculateWorkedHours = function fallbackCalculateWorkedHours(actualStart, actualEnd, breakMinutes = 0) {
    const startMinutes = getTimeValueMinutes(actualStart);
    const endMinutes = getTimeValueMinutes(actualEnd);

    if (startMinutes === null || endMinutes === null || endMinutes <= startMinutes) {
      return null;
    }

    const rawHours = (endMinutes - startMinutes) / 60;
    const pauseHours = Math.max(0, Number(breakMinutes) || 0) / 60;
    const workedHours = rawHours - pauseHours;

    return workedHours >= 0 ? workedHours : null;
  },
  clampHoursDateValue = function fallbackClampHoursDateValue(dateValue) {
    const normalizedDate = String(dateValue || "").trim();
    const todayValue = getTodayLocalDateValue();

    if (!/^\d{4}-\d{2}-\d{2}$/.test(normalizedDate)) {
      return todayValue;
    }

    return normalizedDate > todayValue ? todayValue : normalizedDate;
  },
  formatHours = function fallbackFormatHours(hours) {
    return `${hours.toFixed(2).replace(".", ",")} uur`;
  },
  getDefaultWorkLogValues = function fallbackGetDefaultWorkLogValues(entry) {
    return {
      actualStart: entry.startTime || "",
      actualEnd: entry.endTime || "",
      breakMinutes: 0,
      notes: ""
    };
  },
  getTimeValueMinutes = function fallbackGetTimeValueMinutes(timeValue) {
    if (!/^\d{2}:\d{2}$/.test(String(timeValue || ""))) {
      return null;
    }

    const [hoursPart, minutesPart] = String(timeValue).split(":").map((value) => Number(value) || 0);
    return (hoursPart * 60) + minutesPart;
  },
  getWorkedHoursFromLog = function fallbackGetWorkedHoursFromLog(workLog) {
    if (!workLog?.actualStart || !workLog?.actualEnd) {
      return null;
    }

    return calculateWorkedHours(workLog.actualStart, workLog.actualEnd, workLog.breakMinutes);
  },
  getWorkLogStatusLabel = function fallbackGetWorkLogStatusLabel(workLog) {
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
  },
  getWorkLogValidationState = function fallbackGetWorkLogValidationState(entry, values) {
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
  },
  isManualWorkLogId = function fallbackIsManualWorkLogId(workLogId) {
    return String(workLogId || "").startsWith("manual|");
  }
} = window.StroetHoursFeature || {};

function getEntriesForEmployeeDay(employeeName, date) {
  return entries
    .filter((entry) => entry.name === employeeName && entry.day === date)
    .sort((entryA, entryB) => entryA.startTime.localeCompare(entryB.startTime));
}

function getWorkLogIdForEntry(entry) {
  return buildWorkLogId(entry.name, entry.day, getShiftName(entry), entry.startTime, entry.endTime);
}

function getManualWorkLogForDate(employeeName, day) {
  return workLogs.find((log) => log.id === buildManualWorkLogId(employeeName, day)) || null;
}

function getSelectedHoursDate() {
  return clampHoursDateValue(hoursDateInput?.value || preferences.lastHoursDate || getTodayLocalDateValue());
}

function getWeekBounds(weekValue) {
  const weekDates = getWeekDates(weekValue);
  return {
    start: weekDates[0],
    end: weekDates[weekDates.length - 1]
  };
}

function isDateInWeekValue(dateValue, weekValue) {
  if (!dateValue || !weekValue) {
    return false;
  }

  const bounds = getWeekBounds(weekValue);
  return dateValue >= bounds.start && dateValue <= bounds.end;
}

function moveHoursDateToWeek(targetWeekValue) {
  if (!hoursDateInput) {
    return;
  }

  const currentDate = getSelectedHoursDate();
  const currentWeekDates = getWeekDates(getWeekValueFromDate(currentDate) || getCurrentWeekValue());
  const currentIndex = Math.max(0, currentWeekDates.indexOf(currentDate));
  const targetWeekDates = getWeekDates(targetWeekValue);
  const nextDate = targetWeekDates[Math.min(currentIndex, targetWeekDates.length - 1)] || targetWeekDates[0] || getTodayLocalDateValue();
  const safeNextDate = clampHoursDateValue(nextDate);

  hoursDateInput.value = safeNextDate;
  preferences.lastHoursDate = safeNextDate;
}

function getWorkLogForEntry(entry) {
  const logId = getWorkLogIdForEntry(entry);
  return workLogs.find((log) => log.id === logId) || null;
}

function getWorkLogContextById(workLogId) {
  const entry = getEntryFromWorkLogId(workLogId);

  if (entry) {
    return entry;
  }

  if (isManualWorkLogId(workLogId)) {
    const [, employeeName = "", day = ""] = String(workLogId).split("|");

    if (employeeName && day) {
      return {
        name: employeeName,
        day,
        shiftName: "Extra uren",
        startTime: "",
        endTime: "",
        hours: 0,
        isManualHours: true
      };
    }
  }

  return null;
}

function moveWorkLogToEntry(previousEntry, nextEntry) {
  if (!previousEntry || !nextEntry) {
    return false;
  }

  const previousLogId = getWorkLogIdForEntry(previousEntry);
  const nextLogId = getWorkLogIdForEntry(nextEntry);

  if (previousLogId === nextLogId) {
    return false;
  }

  const workLog = workLogs.find((log) => log.id === previousLogId);

  if (!workLog || workLogs.some((log) => log !== workLog && log.id === nextLogId)) {
    return false;
  }

  workLog.id = nextLogId;
  workLog.employeeName = nextEntry.name;
  workLog.day = nextEntry.day;
  workLog.shiftName = getShiftName(nextEntry);
  workLog.plannedStart = nextEntry.startTime;
  workLog.plannedEnd = nextEntry.endTime;
  workLog.updatedAt = getNowIsoString();
  workLog.auditTrail = [
    ...(Array.isArray(workLog.auditTrail) ? workLog.auditTrail : []),
    createWorkLogAuditEntry("roster-sync", "Registratie gekoppeld aan bijgewerkte roosterdienst.")
  ];
  return true;
}

function getEffectiveWorkLogValues(entry, workLog = getWorkLogForEntry(entry)) {
  const defaults = getDefaultWorkLogValues(entry);

  if (!workLog) {
    return defaults;
  }

  return {
    actualStart: workLog.actualStart || defaults.actualStart,
    actualEnd: workLog.actualEnd || defaults.actualEnd,
    breakMinutes: Number.isFinite(Number(workLog.breakMinutes)) ? Math.max(0, Number(workLog.breakMinutes)) : defaults.breakMinutes,
    notes: workLog.notes || ""
  };
}

function getPlannedWorkLogValues(entry, workLog = getWorkLogForEntry(entry)) {
  const lastUsed = normalizeLastWorkLogTimes(preferences.lastWorkLogTimes);

  return {
    actualStart: entry.startTime || "",
    actualEnd: entry.endTime || "",
    breakMinutes: Number.isFinite(Number(workLog?.breakMinutes))
      ? Math.max(0, Number(workLog.breakMinutes))
      : Math.max(0, Number(lastUsed.breakMinutes) || 0)
  };
}

function renderWorkLogCardMarkup(entry, workLog = getWorkLogForEntry(entry), options = {}) {
  const shiftName = options.shiftName || getShiftName(entry);
  const workLogId = options.workLogId || getWorkLogIdForEntry(entry);
  const notesLabel = options.notesLabel || (entry.isManualHours ? "Reden of type werk" : "Opmerkingen");
  const notesPlaceholder = options.notesPlaceholder || (entry.isManualHours ? "Korte reden of type werk" : "Bijzonderheden");
  const effectiveValues = getEffectiveWorkLogValues(entry, workLog);
  const actualWorkedHours = calculateWorkedHours(effectiveValues.actualStart, effectiveValues.actualEnd, effectiveValues.breakMinutes);
  const hasDeviation = hasWorkLogDeviation(entry, effectiveValues);
  const isApprovedLocked = !isPlannerRole() && workLog?.status === "approved";
  const isLockedForEmployee = !isPlannerRole() && workLog && (workLog.status === "open" || workLog.status === "approved");
  const isInputLocked = isApprovedLocked || isLockedForEmployee;
  const latestAudit = workLog?.auditTrail?.[workLog.auditTrail.length - 1] || null;
  const isFutureEntry = isFutureDateValue(entry.day);
  const isInputLockedWithFuture = isInputLocked || isFutureEntry;
  const validation = getWorkLogValidationState(entry, effectiveValues);
  const statusClass = !workLog
    ? "empty"
    : workLog?.status === "approved"
    ? "approved"
    : workLog?.status === "rejected"
      ? "rejected"
      : workLog?.status === "revision"
        ? "revision"
        : workLog?.status === "open"
          ? "open"
          : "draft";
  const plannedTimeMarkup = entry.startTime && entry.endTime
    ? `<span>Gepland: ${entry.startTime} - ${entry.endTime}</span>`
    : `<span class="hours-registration-flag">${entry.isManualHours ? "Geen geplande dienst nodig" : "Geen dienst gepland"}</span>`;
  const guidanceText = entry.isManualHours
    ? "Gebruik extra uren alleen voor vandaag of een eerdere datum, en alleen voor werk buiten je geplande dienst."
    : entry.startTime && entry.endTime
      ? "De geplande tijden staan al ingevuld. Pas alleen iets aan als het echt afwijkt."
      : "Er stond geen dienst gepland. Vul alleen handmatig uren in als dat echt nodig is.";

  return `
    <article class="hours-registration-card ${workLog ? "is-saved" : ""} ${hasDeviation ? "has-deviation" : ""} ${entry.isManualHours ? "is-manual-hours" : ""} status-${statusClass}" data-worklog-card-id="${workLogId}">
      <div class="hours-registration-head">
        <div>
          <strong>${formatWeekday(entry.day)} ${formatDate(entry.day)}</strong>
          <span>${shiftName}</span>
        </div>
        <span class="status-pill status-${statusClass === "draft" ? "open" : statusClass === "revision" ? "rejected" : statusClass}">${getWorkLogStatusLabel(workLog)}</span>
      </div>
      <div class="hours-registration-meta">
        <span class="hours-registration-date">Datum: ${formatWeekday(entry.day)} ${formatDate(entry.day)}</span>
        ${plannedTimeMarkup}
        ${entry.isManualHours ? `<span class="hours-registration-flag is-extra">Extra uren</span>` : ""}
        ${hasDeviation ? `<span class="hours-registration-flag">Afwijking van planning</span>` : `<span>${entry.startTime && entry.endTime ? "Volgens planning" : "Handmatige invoer"}</span>`}
        ${actualWorkedHours !== null ? `<span>Gewerkt: ${formatHours(actualWorkedHours)}</span>` : ""}
      </div>
      <div class="hours-registration-validation ${validation.messages.length ? "" : "is-empty"}" data-worklog-validation>
        ${validation.messages.map((message) => `<div class="hours-validation-note is-${message.type}">${message.text}</div>`).join("")}
      </div>
      <p class="panel-note">${guidanceText}</p>
      <div class="hours-registration-grid">
        <label class="hours-registration-time-field">
          Werkelijke starttijd
          <select data-worklog-field="actualStart" data-worklog-id="${workLogId}" ${isInputLockedWithFuture ? "disabled" : ""}>
            ${buildTimeSelectOptions(effectiveValues.actualStart)}
          </select>
          ${buildWorkLogQuickButtons(workLogId, "actualStart", effectiveValues.actualStart, isInputLockedWithFuture)}
        </label>
        <label class="hours-registration-time-field">
          Werkelijke eindtijd
          <select data-worklog-field="actualEnd" data-worklog-id="${workLogId}" ${isInputLockedWithFuture ? "disabled" : ""}>
            ${buildTimeSelectOptions(effectiveValues.actualEnd)}
          </select>
          ${buildWorkLogQuickButtons(workLogId, "actualEnd", effectiveValues.actualEnd, isInputLockedWithFuture)}
        </label>
        <label class="hours-registration-time-field">
          Pauze (minuten)
          <select data-worklog-field="breakMinutes" data-worklog-id="${workLogId}" ${isInputLockedWithFuture ? "disabled" : ""}>
            ${buildBreakSelectOptions(effectiveValues.breakMinutes)}
          </select>
          ${buildWorkLogQuickButtons(workLogId, "breakMinutes", String(effectiveValues.breakMinutes), isInputLockedWithFuture)}
        </label>
        <label class="hours-registration-notes">
          ${notesLabel}
          <input type="text" maxlength="200" data-worklog-field="notes" data-worklog-id="${workLogId}" value="${effectiveValues.notes}" placeholder="${notesPlaceholder}" ${isInputLockedWithFuture ? "disabled" : ""}>
        </label>
        ${(workLog?.status === "revision" || workLog?.status === "rejected" || (isPlannerRole() && workLog?.employeeReply))
          ? `<label class="hours-registration-notes">
              Reactie medewerker
              <input type="text" maxlength="200" data-worklog-field="employeeReply" data-worklog-id="${workLogId}" value="${workLog?.employeeReply || ""}" placeholder="Toelichting op de afwijking" ${isInputLockedWithFuture || isPlannerRole() ? "disabled" : ""}>
            </label>`
          : ""}
      </div>
      ${isFutureEntry ? `<div class="hours-registration-lock">Toekomstige diensten zijn nog niet invulbaar. Uren kun je pas vandaag of later registreren.</div>` : ""}
      ${workLog?.managerNote ? `
        <div class="hours-feedback-note ${workLog?.status === "rejected" ? "is-rejected" : workLog?.status === "revision" ? "is-revision" : "is-approved"}">
          <strong>${workLog?.status === "rejected" ? "Afgekeurd" : workLog?.status === "revision" ? "Opmerking ontvangen" : "Goedgekeurd"}</strong>
          <span>${workLog.managerNote}</span>
        </div>
      ` : ""}
      ${workLog?.employeeReply ? `<div class="hours-registration-audit">Reactie medewerker: ${workLog.employeeReply}</div>` : ""}
        ${latestAudit ? `<div class="hours-registration-audit">Laatste wijziging: ${formatDateTime(latestAudit.at)} · ${latestAudit.actorName}${latestAudit.summary ? ` · ${latestAudit.summary}` : ""}</div>` : ""}
      ${workLog && (workLog.status === "open" || workLog.status === "approved")
        ? `<div class="hours-registration-lock">${workLog.status === "approved"
          ? (isPlannerRole()
            ? "Deze registratie is goedgekeurd. Alleen directie/planner kan nog corrigeren."
            : "Deze registratie is goedgekeurd en staat vast.")
          : `Deze registratie is ingediend en staat vast voor medewerker${workLog.submittedAt ? ` sinds ${formatDateTime(workLog.submittedAt)}` : ""}.`}</div>`
        : ""}
      <div class="form-actions compact-actions">
        ${isInputLockedWithFuture
          ? ""
          : `${entry.startTime && entry.endTime ? `<button type="button" class="secondary" data-worklog-action="planned" data-worklog-id="${workLogId}">Gewerkt zoals gepland</button>` : ""}
             <button type="button" class="secondary" data-worklog-action="save" data-worklog-id="${workLogId}">Opslaan</button>
             <button type="button" data-worklog-action="submit" data-worklog-id="${workLogId}">Indienen</button>`}
      </div>
    </article>
  `;
}

function hasWorkLogDeviation(entry, values) {
  return values.actualStart !== entry.startTime ||
    values.actualEnd !== entry.endTime ||
    Number(values.breakMinutes) > 0 ||
    Boolean((values.notes || "").trim());
}

function createWorkLogAuditEntry(action, summary) {
  const actorName = isPlannerRole() ? "Planner / Directie" : (getRoleScopedEmployeeName() || "Medewerker");

  return {
    at: getNowIsoString(),
    action,
    actorRole: isPlannerRole() ? "planner" : "employee",
    actorName,
    summary
  };
}

function getOpenCounts() {
  const currentEmployee = getRoleScopedEmployeeName();
  const timeOffSource = isPlannerRole()
    ? timeOffRequests
    : timeOffRequests.filter((request) => request.employeeName === currentEmployee);
  const swapSource = isPlannerRole()
    ? swapRequests
    : swapRequests.filter((request) => request.employeeName === currentEmployee);

  return {
    timeOff: timeOffSource.filter((request) => request.status === "open").length,
    swaps: swapSource.filter((request) => request.status === "open").length
  };
}

function maybeShowOpenRequestReminder() {
  if (submitWeekHoursButton) {
    submitWeekHoursButton.hidden = false;
  }

  if (myHoursSectionSwitch) {
    myHoursSectionSwitch.hidden = true;
  }

  if (isPlannerRole()) {
    if (activeTab !== "week-current") {
      return;
    }

    const openCounts = getOpenCounts();
    const totalOpen = openCounts.timeOff + openCounts.swaps;
    const overdueRequestCount = [...timeOffRequests, ...swapRequests].filter((request) =>
      request.status === "open" && getRequestDisplayStatus(request) === "overdue"
    ).length;
    const pendingHoursCount = workLogs.filter((log) =>
      log.status === "open" || log.status === "revision" || log.status === "rejected"
    ).length;
    const overdueHoursCount = workLogs.filter((log) =>
      (log.status === "open" || log.status === "revision" || log.status === "rejected") &&
      isIsoOlderThanHours(log.submittedAt || log.updatedAt, 48)
    ).length;

    if (!totalOpen && !pendingHoursCount) {
      return;
    }

    preferences.mailDigestState = {
      ...getDefaultMailDigestState(),
      ...(preferences.mailDigestState && typeof preferences.mailDigestState === "object" ? preferences.mailDigestState : {})
    };

    const plannerRecipients = getPlannerSummaryEmailRecipients();
    const plannerDigestBaseKey = `${getTodayLocalDateValue()}|${currentDataMode}|planner`;

    if (plannerRecipients.length) {
      if (overdueRequestCount > 0) {
        const overdueRequestsKey = `${plannerDigestBaseKey}|requests-overdue`;

        if (preferences.mailDigestState.plannerOverdueRequestsEmail !== overdueRequestsKey) {
          preferences.mailDigestState.plannerOverdueRequestsEmail = overdueRequestsKey;
          savePreferences();
          void sendPlannerSummaryEmail(plannerRecipients, "requests-reminder", {
            totalOpen,
            overdueRequestCount
          });
        }
      } else if (totalOpen > 0) {
        const openRequestsKey = `${plannerDigestBaseKey}|requests-open`;

        if (preferences.mailDigestState.plannerOpenRequestsEmail !== openRequestsKey) {
          preferences.mailDigestState.plannerOpenRequestsEmail = openRequestsKey;
          savePreferences();
          void sendPlannerSummaryEmail(plannerRecipients, "requests", {
            totalOpen
          });
        }
      }

      if (overdueHoursCount > 0) {
        const overdueHoursKey = `${plannerDigestBaseKey}|hours-overdue`;

        if (preferences.mailDigestState.plannerOverdueHoursEmail !== overdueHoursKey) {
          preferences.mailDigestState.plannerOverdueHoursEmail = overdueHoursKey;
          savePreferences();
          void sendPlannerSummaryEmail(plannerRecipients, "hours-reminder", {
            pendingHoursCount,
            overdueHoursCount
          });
        }
      } else if (pendingHoursCount > 0) {
        const pendingHoursKey = `${plannerDigestBaseKey}|hours-open`;

        if (preferences.mailDigestState.plannerPendingHoursEmail !== pendingHoursKey) {
          preferences.mailDigestState.plannerPendingHoursEmail = pendingHoursKey;
          savePreferences();
          void sendPlannerSummaryEmail(plannerRecipients, "hours", {
            pendingHoursCount
          });
        }
      }
    }

    const reminderKey = `${getTodayLocalDateValue()}|${currentDataMode}|planner|requests:${totalOpen > 0 ? 1 : 0}|overdue:${overdueRequestCount > 0 ? 1 : 0}|hours:${pendingHoursCount > 0 ? 1 : 0}`;

    if (lastOpenRequestReminderKey === reminderKey || preferences.mailDigestState?.plannerSummary === reminderKey) {
      return;
    }

    if (messageBox && !messageBox.classList.contains("hidden")) {
      return;
    }

    lastOpenRequestReminderKey = reminderKey;
    preferences.mailDigestState.plannerSummary = reminderKey;
    savePreferences();

    if (totalOpen && pendingHoursCount) {
      showMessage("Er staan open aanvragen in de Roosterapp. Er staan uren klaar om goed te keuren in de Roosterapp.", "warning");
      return;
    }

    if (totalOpen) {
      showMessage(
        overdueRequestCount
          ? "Er staan open aanvragen in de Roosterapp. Sommige wachten al te lang op reactie."
          : "Er staan open aanvragen in de Roosterapp.",
        "warning"
      );
      return;
    }

    showMessage("Er staan uren klaar om goed te keuren in de Roosterapp.", "warning");
    return;
  }

  if (activeTab !== "my-hours" && activeTab !== "week-current") {
    return;
  }

  const employeeName = getRoleScopedEmployeeName();

  if (!employeeName) {
    return;
  }

  const previousWeek = getPreviousWeekValue(getCurrentWeekValue());
  const previousWeekEntries = entries.filter((entry) =>
    entry.name === employeeName &&
    getWeekValueFromDate(entry.day) === previousWeek &&
    entry.day < getTodayLocalDateValue()
  );
  const missingPreviousWeekDays = [...new Set(
    previousWeekEntries
      .filter((entry) => !getWorkLogForEntry(entry))
      .map((entry) => entry.day)
  )];

  if (!missingPreviousWeekDays.length) {
    return;
  }

  const reminderKey = `${getTodayLocalDateValue()}|${currentDataMode}|employee|${employeeName}|${previousWeek}`;
  const storedReminderKey = preferences.mailDigestState?.employeeMissingHours?.[employeeName] || "";

  if (lastEmployeeHoursReminderKey === reminderKey || storedReminderKey === reminderKey) {
    return;
  }

  if (messageBox && !messageBox.classList.contains("hidden")) {
    return;
  }

    lastEmployeeHoursReminderKey = reminderKey;
    preferences.mailDigestState = preferences.mailDigestState || getDefaultMailDigestState();
    preferences.mailDigestState.employeeMissingHours = preferences.mailDigestState.employeeMissingHours || {};
    preferences.mailDigestState.employeeMissingHours[employeeName] = reminderKey;
    savePreferences();
    const emailReminderKey = `${currentDataMode}|${employeeName}|${previousWeek}`;
    const storedEmailReminderKey = preferences.mailDigestState?.employeeMissingHoursEmail?.[employeeName] || "";

    if (storedEmailReminderKey !== emailReminderKey) {
      const employeeEmail = getMailEligibleEmployeeEmail(employeeName);

      if (employeeEmail) {
        preferences.mailDigestState.employeeMissingHoursEmail = preferences.mailDigestState.employeeMissingHoursEmail || {};
        preferences.mailDigestState.employeeMissingHoursEmail[employeeName] = emailReminderKey;
        savePreferences();
        void sendEmployeeHoursReminderEmail([employeeEmail], {
          employeeName,
          weekValue: previousWeek
        });
      }
    }

    showMessage("U heeft uw gewerkte uren van vorige week nog niet ingevuld.", "warning");
  }

function getCurrentEmployeeName() {
  return currentEmployeeSelect.value;
}

function isPlannerRole() {
  return isPlannerRoleHelper(activeRole);
}

function getEmployeeIdentity() {
  return getEmployeeIdentityHelper(preferences, employees, isEmployeeActive);
}

function getRoleScopedEmployeeName(fallbackName = "") {
  return getRoleScopedEmployeeNameHelper(
    isPlannerRole(),
    getEmployeeIdentity(),
    getCurrentEmployeeName(),
    fallbackName
  );
}

function syncScopedEmployeeSelectors(employeeName = getRoleScopedEmployeeName()) {
  if (isPlannerRole() || !employeeName) {
    return;
  }

  currentEmployeeSelect.value = employeeName;
  portalEmployeeSelect.value = employeeName;
  hoursEmployeeSelect.value = employeeName;
  getAllTimeOffEmployeeSelects().forEach((select) => {
    select.value = employeeName;
  });
  swapEmployeeSelect.value = employeeName;
}

function ensureEmployeeIdentityForCurrentRole() {
  if (isPlannerRole()) {
    return "";
  }

  const currentIdentity = getEmployeeIdentity();

  if (currentIdentity) {
    syncScopedEmployeeSelectors(currentIdentity);
    return currentIdentity;
  }

  const preferredEmployee = getPreferredEmployeeIdentityCandidate();

  if (!preferredEmployee) {
    return "";
  }

  preferences.employeeIdentity = preferredEmployee;
  preferences.hasUserSession = true;
  savePreferences();
  syncScopedEmployeeSelectors(preferredEmployee);
  return preferredEmployee;
}

function getPreferredEmployeeIdentityCandidate() {
  return getPreferredEmployeeIdentityCandidateHelper([
    getCurrentEmployeeName(),
    preferences.lastPortalEmployee,
    preferences.lastHoursEmployee,
    preferences.lastEmployee
  ], employees);
}

function getOwnEmployeeNameOrWarn() {
  if (isPlannerRole()) {
    return "";
  }

  const ownEmployeeName = getRoleScopedEmployeeName();

  if (!ownEmployeeName) {
    showMessage("Kies eerst je eigen naam bovenaan de app.", "error");
    return "";
  }

  return ownEmployeeName;
}

function ensureOwnEmployeeAccess(targetEmployeeName, errorMessage = "Je kunt alleen je eigen gegevens aanpassen.") {
  if (isPlannerRole()) {
    return true;
  }

  const ownEmployeeName = getOwnEmployeeNameOrWarn();

  if (!ownEmployeeName) {
    return false;
  }

  if (!targetEmployeeName || targetEmployeeName !== ownEmployeeName) {
    showMessage(errorMessage, "error");
    return false;
  }

  return true;
}

function ensureOwnRequestAction(targetEmployeeName, actionLabel = "deze actie") {
  return ensureOwnEmployeeAccess(
    targetEmployeeName,
    `Je kunt alleen ${actionLabel} voor jezelf uitvoeren.`
  );
}

function formatWeekLabel(weekValue) {
  return formatWeekLabelHelper(weekValue);
}

function getWeekYear(weekValue) {
  return getWeekYearHelper(weekValue);
}

function getIsoWeekCountForYear(year) {
  return getIsoWeekCountForYearHelper(year, {
    getWeekValueFromDate
  });
}

function formatPlanningWeekPeriod(weekValue) {
  return formatPlanningWeekPeriodHelper(weekValue, {
    getWeekDates
  });
}

function getPlanningOverviewStatus(weekValue, weekEntries, openCount) {
  return getPlanningOverviewStatusHelper(weekValue, weekEntries, openCount, {
    getWeekPlanningStatus,
    getWeekReviewStatus
  });
}

function ensureWeekActionAllowed(weekValue, {
  actionLabel = "deze wijziging",
  blockPlannerWhenLocked = false
} = {}) {
  if (!/^\d{4}-W\d{2}$/.test(String(weekValue || ""))) {
    return true;
  }

  const status = getWeekReviewStatus(weekValue);

  if (isPlannerRole()) {
    if (blockPlannerWhenLocked && status === "locked") {
      showMessage(`Week ${formatWeekLabel(weekValue)} staat vastgezet. Ontgrendel de week eerst om ${actionLabel}.`, "error");
      return false;
    }

    return true;
  }

  if (status !== "open") {
    showMessage(`Week ${formatWeekLabel(weekValue)} staat op ${getWeekReviewStatusMeta(status).label.toLowerCase()} en kan niet meer door medewerkers worden aangepast.`, "error");
    return false;
  }

  return true;
}

function ensureDatesActionAllowed(dates, options = {}) {
  const weekValues = [...new Set((dates || [])
    .filter((dateValue) => /^\d{4}-\d{2}-\d{2}$/.test(String(dateValue || "")))
    .map((dateValue) => getWeekValueFromDate(String(dateValue))))];

  return weekValues.every((weekValue) => ensureWeekActionAllowed(weekValue, options));
}

function ensureEmployeeWeekEditable(dateValue, actionLabel) {
  if (!dateValue) {
    return true;
  }

  return ensureWeekActionAllowed(getWeekValueFromDate(dateValue), {
    actionLabel,
    blockPlannerWhenLocked: false
  });
}

function ensureEmployeeDateRangeEditable(startDate, endDate, actionLabel) {
  if (!startDate) {
    return true;
  }

  const effectiveEndDate = endDate || startDate;
  let currentDate = startDate;
  const visitedWeeks = new Set();

  while (currentDate <= effectiveEndDate) {
    const weekValue = getWeekValueFromDate(currentDate);

    if (weekValue && !visitedWeeks.has(weekValue)) {
      visitedWeeks.add(weekValue);

      if (!ensureWeekActionAllowed(weekValue, {
        actionLabel,
        blockPlannerWhenLocked: false
      })) {
        return false;
      }
    }

    currentDate = addDaysToDateValue(currentDate, 1);
  }

  return true;
}

function ensureDateRangeActionAllowed(startDate, endDate, options = {}) {
  if (!startDate) {
    return true;
  }

  const effectiveEndDate = endDate || startDate;
  let currentDate = startDate;
  const visitedWeeks = new Set();

  while (currentDate <= effectiveEndDate) {
    const weekValue = getWeekValueFromDate(currentDate);

    if (weekValue && !visitedWeeks.has(weekValue)) {
      visitedWeeks.add(weekValue);

      if (!ensureWeekActionAllowed(weekValue, options)) {
        return false;
      }
    }

    currentDate = addDaysToDateValue(currentDate, 1);
  }

  return true;
}

function requestWeekUnlockReason(weekValue) {
  const confirmed = confirmAction(`Weet je het zeker? Week ${formatWeekLabel(weekValue)} wordt ontgrendeld en kan daarna weer gewijzigd worden.`);

  if (!confirmed) {
    return null;
  }

  const reason = window.prompt(`Waarom ontgrendel je week ${formatWeekLabel(weekValue)}?`, "");

  if (reason === null) {
    return null;
  }

  const trimmedReason = reason.trim();

  if (!trimmedReason) {
    showMessage("Vul eerst een reden in om de week te ontgrendelen.", "error");
    return null;
  }

  return trimmedReason;
}

function getEntriesVisibleForCurrentRole(sourceEntries = getPlanningEntries()) {
  const scopedEmployeeName = getRoleScopedEmployeeName();
  const sourceIsPlanningEntries = sourceEntries === getPlanningEntries();
  const cacheKey = sourceIsPlanningEntries
    ? `${planningDataRevision}:${previewDataRevision}:${activeRole}:${scopedEmployeeName || ""}`
    : "";

  if (cacheKey && derivedDataCache.visibleEntriesKey === cacheKey) {
    return derivedDataCache.visibleEntries;
  }

  if (isPlannerRole()) {
    const nextEntries = [...sourceEntries];
    if (cacheKey) {
      derivedDataCache.visibleEntriesKey = cacheKey;
      derivedDataCache.visibleEntries = nextEntries;
    }
    return nextEntries;
  }

  if (!scopedEmployeeName) {
    return [];
  }

  const nextEntries = sourceEntries.filter((entry) => entry.name === scopedEmployeeName);
  if (cacheKey) {
    derivedDataCache.visibleEntriesKey = cacheKey;
    derivedDataCache.visibleEntries = nextEntries;
  }
  return nextEntries;
}

function getApprovedTimeOffVisibleForCurrentRole(sourceRequests = timeOffRequests) {
  const scopedEmployeeName = getRoleScopedEmployeeName();
  const sourceIsDefault = sourceRequests === timeOffRequests;
  const cacheKey = sourceIsDefault
    ? `${requestDataRevision}:${activeRole}:${scopedEmployeeName || ""}`
    : "";

  if (cacheKey && derivedDataCache.approvedTimeOffKey === cacheKey) {
    return derivedDataCache.approvedTimeOff;
  }

  if (isPlannerRole()) {
    const nextRequests = [...sourceRequests];
    if (cacheKey) {
      derivedDataCache.approvedTimeOffKey = cacheKey;
      derivedDataCache.approvedTimeOff = nextRequests;
    }
    return nextRequests;
  }

  if (!scopedEmployeeName) {
    return [];
  }

  const nextRequests = sourceRequests.filter((request) => request.employeeName === scopedEmployeeName);
  if (cacheKey) {
    derivedDataCache.approvedTimeOffKey = cacheKey;
    derivedDataCache.approvedTimeOff = nextRequests;
  }
  return nextRequests;
}

function isTabAllowedForCurrentRole(tabName) {
  return isTabAllowedForRoleHelper(activeRole, tabName, {
    employeeAllowedTabs
  });
}

function getDefaultTabForCurrentRole() {
  return getDefaultTabForRoleHelper(activeRole);
}

function handleBlockedTabAccess(tabName) {
  if (isPlannerRole()) {
    return false;
  }

  if (isTabAllowedForCurrentRole(tabName)) {
    return false;
  }

  showMessage("Deze beheerpagina is alleen beschikbaar voor planner of directie.", "error");
  activeTab = getDefaultTabForCurrentRole();
  return true;
}

function updateRoleContextBadge(element, employeeName, emptyLabel = "Geen medewerker gekozen") {
  if (!element) {
    return;
  }

  const label = employeeName || emptyLabel;
  const strong = element.querySelector("strong");

  if (strong) {
    strong.textContent = label;
  } else {
    element.textContent = label;
  }
}

function updateRoleIndicator() {
  if (!roleIndicator) {
    return;
  }

  const title = roleIndicator.querySelector("strong");
  const description = roleIndicator.querySelector("small");

  if (!title || !description) {
    return;
  }

  if (isPlannerRole()) {
    title.textContent = "Planner / Directie";
    description.textContent = "Volledige toegang tot rooster, medewerkers, diensten en aanvragen.";
    roleIndicator.dataset.roleType = "planner";
    return;
  }

  title.textContent = "Medewerker";
  description.textContent = "Alleen eigen gegevens en eigen acties kunnen worden bekeken en aangepast.";
  roleIndicator.dataset.roleType = "employee";
}

function updateTestModeBadge() {
  if (!testModeBadge) {
    return;
  }

  testModeBadge.textContent = getTestModeLabel();
  testModeBadge.classList.remove("is-test");
  testModeBadge.classList.add("hidden");
}

function updateLoginRoleState() {
  if (!loginEmployeeLabel) {
    return;
  }

  const isEmployeeLogin = getLoginRoleValue() === "employee";
  loginEmployeeLabel.classList.toggle("hidden", !isEmployeeLogin);
}

function populateLoginEmployeeSelect() {
  if (!loginEmployeeSelect) {
    return;
  }

  const selectedValue = loginEmployeeSelect.value;
  const previewMode = "live";
  const modeEmployees = getEmployeesForMode(previewMode);
  const modeEmployeeMeta = getEmployeeMetaForMode(previewMode, modeEmployees);
  const availableEmployees = modeEmployees.filter((employeeName) => normalizeEmployeeStatus(modeEmployeeMeta?.[employeeName]?.status) === "active");
  const options = buildEmployeeOptions(getEmployeesWithFavoritesFirst(availableEmployees));
  loginEmployeeSelect.innerHTML = `<option value="">Kies medewerker</option>${options}`;
  if (availableEmployees.includes(selectedValue)) {
    loginEmployeeSelect.value = selectedValue;
  } else {
    loginEmployeeSelect.value = "";
  }
}

function openLoginOverlay() {
  if (!loginOverlay) {
    return;
  }

  populateLoginEmployeeSelect();
  loginRoleSelect.value = activeRole;
  if (loginTestModeCheckbox) {
    loginTestModeCheckbox.checked = false;
  }
  populateLoginEmployeeSelect();
  loginEmployeeSelect.value = getEmployeeIdentity() || preferences.lastPortalEmployee || preferences.lastEmployee || "";
  updateLoginRoleState();
  appShell?.classList.add("login-required");
  loginOverlay.classList.remove("hidden");
}

function closeLoginOverlay() {
  appShell?.classList.remove("login-required");
  loginOverlay?.classList.add("hidden");
}

function applyLoggedInUserSelection({ showStartupMessage = false } = {}) {
  activeRole = getLoginRoleValue();
  const selectedMode = "live";

  if (activeRole === "employee") {
    const selectedEmployee = loginEmployeeSelect.value;
    const modeEmployees = getEmployeesForMode(selectedMode);
    const modeEmployeeMeta = getEmployeeMetaForMode(selectedMode, modeEmployees);
    const availableEmployees = modeEmployees.filter((employeeName) => normalizeEmployeeStatus(modeEmployeeMeta?.[employeeName]?.status) === "active");

    if (!selectedEmployee || !availableEmployees.includes(selectedEmployee)) {
      showMessage("Kies eerst een medewerker.", "error");
      return false;
    }

    preferences.employeeIdentity = selectedEmployee;
  } else {
    preferences.employeeIdentity = "";
  }

  currentDataMode = selectedMode;
  preferences.lastRole = activeRole;
  preferences.lastDataMode = currentDataMode;
  preferences.hasUserSession = true;
  savePreferences();
  reloadScopedData();

  if (activeRole === "employee" && !getEmployeeIdentity()) {
    showMessage("De gekozen medewerker bestaat niet in deze gegevensset.", "error");
    openLoginOverlay();
    return false;
  }

  closeLoginOverlay();
  reloadForLoggedInUser({ resetToDefaultTab: true, resetWeekToCurrent: true });

  if (showStartupMessage) {
    showMessage("Gebruiker geladen.", "success");
  }

  return true;
}

function reloadForLoggedInUser(options = {}) {
  const { resetToDefaultTab = false, resetWeekToCurrent = false } = options;

  if (needsLoginSelection()) {
    render();
    openLoginOverlay();
    return;
  }

  if (resetToDefaultTab || !isTabAllowedForCurrentRole(activeTab)) {
    activeTab = getDefaultTabForCurrentRole();
  }

  if (!isPlannerRole()) {
    activeEmployeeWeekView = "today";
  }

  if (resetWeekToCurrent) {
    syncStartWeekToCurrent();
  }

  closeLoginOverlay();
  render();
}

function isMobileView() {
  return !isPlannerRole() || mobileMediaQuery.matches;
}

function formatShortWeekday(value) {
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "short"
  }).format(new Date(value)).replace(".", "");
}

function getCoverageStatusName(className) {
  return getCoverageStatusNameHelper(className);
}

function renderShiftCard(entry, {
  showEmployee = false,
  showActions = false,
  statusLabel = "",
  inlinePlanner = false
} = {}) {
  const isEmployeeView = !isPlannerRole();
  const controlModeActive = isControlModeActive();
  const plannerAuditVisible = isPlannerRole();
  const effectiveStatusLabel = statusLabel || (entry.proposed ? "Voorstel" : "");
  const effectiveShowActions = showActions && !entry.proposed;
  const replacementClass = entry.replacementFor ? "is-replacement" : "";
  const matchingShift = getShiftForEntry(entry);
  const quickSwitchOptions = effectiveShowActions && matchingShift && entry.index >= 0
    ? getSuitableEmployeesForShift(
      matchingShift,
      entry.day,
      entry.startTime,
      entry.endTime,
      entry.index
    )
    : [];
  const quickSwitchId = `quick-switch-${entry.index}`;
  const inlineEditableClass = inlinePlanner && quickSwitchOptions.length ? "is-inline-editable" : "";
  const vacationAutoFillClass = entry.autoFillReason === "Vakantieregel weekendkracht" ? "is-vacation-autofill" : "";
  const patternShift = matchingShift || {
    id: entry.shiftId || entry.shiftName || "",
    name: getShiftName(entry),
    startTime: entry.startTime,
    endTime: entry.endTime
  };
  const planningPatternMatch = getEmployeePlanningPatternMatch(entry.name, patternShift, entry.day, getWeekValueFromDate(entry.day));
  const isPatternDeviation = planningPatternMatch.score >= 55;
  const inlineActionMarkup = effectiveShowActions && inlinePlanner
    ? `
        <div class="planner-inline-actions">
          <button type="button" class="small" data-action="focus-inline-switch" data-index="${entry.index}">Wijzigen</button>
          <button type="button" class="small warning" data-action="clear-inline-entry" data-index="${entry.index}">Leegmaken</button>
          <button type="button" class="small" data-action="focus-inline-replacement" data-index="${entry.index}">Vervanger</button>
        </div>
      `
    : "";
  const replacementLabel = entry.replacementFor
    ? `<div class="shift-context">Normaal ${entry.replacementFor}, nu ${entry.name}</div>`
    : "";
  const autoFillWhyMarkup = isPlannerRole() && entry.autoFillReason
    ? `
        <details class="shift-why">
          <summary>Waarom zo gepland?</summary>
          <div class="shift-why-body">
            <strong>${entry.autoFillReason}</strong>
            ${entry.autoFillReasonDetail ? `<span>${entry.autoFillReasonDetail}</span>` : ""}
          </div>
        </details>
      `
    : "";
  const plannerAuditFlags = [];
  const plannerAuditReasons = [];

  if (plannerAuditVisible) {
    plannerAuditFlags.push(
      isPatternDeviation
        ? '<span class="planner-audit-badge is-deviation">Afwijking</span>'
        : '<span class="planner-audit-badge is-match">Volgens vast rooster</span>'
    );

    if (entry.replacementFor) {
      plannerAuditFlags.push('<span class="planner-audit-badge is-replacement">Vervanging</span>');
      plannerAuditReasons.push(`Normaal ${entry.replacementFor}`);
    }

    if (entry.autoFillReason === "Vakantieregel weekendkracht") {
      plannerAuditFlags.push('<span class="planner-audit-badge is-vacation">Vakantie</span>');
      plannerAuditReasons.push("Ingezet via vakantielogica");
    }

    if (entry.autoFillReason === "Feestdagplanning") {
      plannerAuditFlags.push('<span class="planner-audit-badge is-holiday">Feestdag</span>');
    }

    if (entry.proposed || entry.autoFillReason) {
      plannerAuditFlags.push('<span class="planner-audit-badge is-auto">Automatisch ingevuld</span>');
      if (entry.autoFillReason && entry.autoFillReason !== "Vakantieregel weekendkracht") {
        plannerAuditReasons.push(entry.autoFillReason);
      }
    }

    if (isPatternDeviation && planningPatternMatch.detail) {
      plannerAuditReasons.push(planningPatternMatch.detail);
    }
  }

  const uniquePlannerAuditReasons = plannerAuditReasons.filter((reason, index, source) => reason && source.indexOf(reason) === index);
  const plannerAuditMarkup = plannerAuditVisible
    ? `
        <div class="planner-audit">
          <div class="planner-audit-flags">${plannerAuditFlags.join("")}</div>
          ${uniquePlannerAuditReasons.length ? `<div class="planner-audit-line">${uniquePlannerAuditReasons.join(" • ")}</div>` : ""}
        </div>
      `
    : "";
  const controlFlags = [];

  if (controlModeActive && entry.proposed) {
    controlFlags.push('<span class="control-flag is-auto">Automatisch</span>');
  }

  if (controlModeActive && isPatternDeviation) {
    controlFlags.push(`<span class="control-flag is-deviation" title="${planningPatternMatch.detail}">Afwijking vast rooster</span>`);
  }

  if (controlModeActive && entry.replacementFor) {
    controlFlags.push('<span class="control-flag is-replacement">Vervanging</span>');
  }

  const controlFlagsMarkup = controlFlags.length ? `<div class="control-flags">${controlFlags.join("")}</div>` : "";
  return `
    <article class="shift-card ${getShiftColorClass(entry)} ${replacementClass} ${vacationAutoFillClass} ${inlineEditableClass}" data-day="${entry.day}" data-shift-id="${entry.shiftId || patternShift.id || ""}" data-employee-name="${entry.name}" ${inlineEditableClass ? `data-inline-select="${quickSwitchId}" tabindex="0"` : ""}>
      <div class="shift-name">${getShiftName(entry)}</div>
      ${showEmployee ? `<div class="shift-employee">${entry.name}</div>` : ""}
      <div class="shift-time">${entry.startTime} - ${entry.endTime}</div>
      ${isEmployeeView ? "" : plannerAuditMarkup}
      ${isEmployeeView ? "" : controlFlagsMarkup}
      ${isEmployeeView ? "" : replacementLabel}
      ${isEmployeeView ? "" : (effectiveStatusLabel ? `<div class="shift-status">${effectiveStatusLabel}${entry.autoFillReason === "Vakantieregel weekendkracht" ? " - vakantieweek" : ""}</div>` : "")}
      ${isEmployeeView ? "" : autoFillWhyMarkup}
      ${isEmployeeView ? "" : `<div class="shift-hours">${formatHours(entry.hours)}</div>`}
      ${effectiveShowActions ? `
        <div class="quick-switch-row ${inlinePlanner ? "is-inline-planner" : ""}">
          <label class="sr-only" for="${quickSwitchId}">Medewerker wisselen</label>
          <select id="${quickSwitchId}" data-action="quick-switch" data-index="${entry.index}">
            <option value="">${inlinePlanner ? "Kies medewerker" : "Wissel medewerker"}</option>
            ${quickSwitchOptions.map((employeeName) => `
              <option value="${employeeName}" ${employeeName === entry.name ? "selected" : ""}>${employeeName}</option>
            `).join("")}
          </select>
        </div>
      ` : ""}
      ${inlineActionMarkup}
      ${effectiveShowActions && !inlinePlanner ? `
        <div class="actions">
          <button type="button" class="small" data-action="edit" data-index="${entry.index}">Bewerken</button>
          <button type="button" class="small warning" data-action="delete" data-index="${entry.index}">Verwijderen</button>
        </div>
      ` : ""}
    </article>
  `;
}

function renderApprovedTimeOffList(requests) {
  if (!requests.length) {
    return "";
  }

  return `
    <div class="mobile-free-list">
      ${requests.map((request) => `
        <div class="mobile-free-item absence-${getAbsenceCardClass(request.type)}">
          ${request.employeeName}
          ${request.reason ? ` - ${getApprovedAbsenceDetail(request)}` : ` - ${getAbsenceTypeLabel(request.type).toLowerCase()}`}
        </div>
      `).join("")}
    </div>
  `;
}

function buildPlannerContractOverviewData(selectedWeek, visibleEntries) {
  return buildPlannerContractOverviewDataHelper(selectedWeek, visibleEntries, {
    getWeekDates,
    getTodayDateValue,
    getMonthKeyFromDate,
    getMonthlyRosterWorkdayCount,
    mergePlanningEntries,
    entries,
    getEmployeesWithFavoritesFirst,
    getActiveEmployees,
    getEmployeeContractHours,
    getEmployeeWeekHours,
    getEmployeeMonthHours,
    employees,
    getWeekdayNumberFromDate,
    getMonthlyWeekdayOccurrenceCount,
    formatHours
  });
}

function renderEmployeeFocusSummaryCard(day, entriesForDay, approvedRequestsForDay, title) {
  const sortedEntries = [...entriesForDay].sort((entryA, entryB) =>
    entryA.startTime.localeCompare(entryB.startTime) ||
    getShiftName(entryA).localeCompare(getShiftName(entryB), "nl")
  );
  const isTodayCard = day === getTodayDateValue();
  const canUseQuickHours = !isPlannerRole() && isTodayCard && sortedEntries.length > 0;
  const dayStatus = canUseQuickHours ? getDayWorkLogStatusForEntries(sortedEntries) : "";
  const canCompleteToday = canUseQuickHours && !dayStatus;
  const submittedStatusMarkup = dayStatus
    ? `<div class="employee-focus-status">
        <span class="status-pill status-${dayStatus === "goedgekeurd" ? "approved" : dayStatus === "ingediend" ? "open" : "empty"}">${dayStatus === "goedgekeurd" ? "Goedgekeurd" : dayStatus === "ingediend" ? "Ingediend" : "Ingevuld"}</span>
      </div>`
    : "";

  const requestText = approvedRequestsForDay.length
    ? approvedRequestsForDay.map((request) => getApprovedAbsenceLabel(request)).join(", ")
    : "";

  return `
    <article class="employee-focus-card ${getRelativeDayState(day) ? `is-${getRelativeDayState(day)}` : ""}">
      <div class="employee-focus-head">
        <div>
          <strong>${title}</strong>
          <span>${formatWeekday(day)} · ${formatDate(day)}</span>
        </div>
      </div>
      <div class="employee-focus-body">
        ${sortedEntries.length
          ? sortedEntries.map((entry) => `
            <div class="employee-focus-item">
              <strong>${getShiftName(entry)}</strong>
              <span>${entry.startTime} - ${entry.endTime}</span>
            </div>
          `).join("")
          : `<div class="employee-focus-empty">${requestText || "Geen dienst ingepland"}</div>`}
      </div>
      ${canCompleteToday ? `
        <div class="employee-focus-actions">
          <button type="button" class="secondary" data-go-hours-date="${day}">
            Uren vandaag doorgeven
          </button>
        </div>
      ` : submittedStatusMarkup}
    </article>
  `;
}

function renderEmployeeWeekFocusSummary(weekDates, visibleEntries, approvedTimeOffRequests) {
  const focusDates = [
    { date: getTodayDateValue(), title: "Vandaag" },
    { date: getTomorrowDateValue(), title: "Morgen" }
  ].filter((item, index, source) =>
    weekDates.includes(item.date) && source.findIndex((candidate) => candidate.date === item.date) === index
  );

  if (!focusDates.length) {
    return "";
  }

  return `
    <section class="employee-week-focus">
      ${focusDates.map((item) => renderEmployeeFocusSummaryCard(
        item.date,
        visibleEntries.filter((entry) => entry.day === item.date),
        approvedTimeOffRequests.filter((request) => requestIncludesDate(request, item.date)),
        item.title
      )).join("")}
    </section>
  `;
}

function formatEmployeeWeekLabel(weekValue) {
  return formatEmployeeWeekLabelHelper(weekValue, {
    formatDate,
    getWeekDates
  });
}

function renderEmployeeRosterDayCard(day, entriesForDay, approvedRequestsForDay, title, options = {}) {
  const {
    showEmployeeName = false,
    subtitle = ""
  } = options;
  const sortedEntries = [...entriesForDay].sort((entryA, entryB) =>
    entryA.startTime.localeCompare(entryB.startTime) ||
    entryA.name.localeCompare(entryB.name, "nl") ||
    getShiftName(entryA).localeCompare(getShiftName(entryB), "nl")
  );
  const isTodayCard = day === getTodayDateValue();
  const canUseQuickHours = isTodayCard && sortedEntries.length > 0;
  const dayStatus = canUseQuickHours ? getDayWorkLogStatusForEntries(sortedEntries) : "";
  const canCompleteToday = canUseQuickHours && !dayStatus;
  const approvedAbsenceLabel = approvedRequestsForDay.length
    ? approvedRequestsForDay.map((request) => getApprovedAbsenceLabel(request)).join(", ")
    : "";
  const statusMarkup = dayStatus
    ? `<span class="status-pill status-${dayStatus === "goedgekeurd" ? "approved" : dayStatus === "ingediend" ? "open" : "empty"}">${dayStatus === "goedgekeurd" ? "Goedgekeurd" : dayStatus === "ingediend" ? "Ingediend" : "Ingevuld"}</span>`
    : "";
  const metaLine = subtitle || `${formatWeekday(day)} · ${formatDate(day)}`;

  return `
    <article class="employee-roster-day-card ${getRelativeDayState(day) ? `is-${getRelativeDayState(day)}` : ""}">
      <div class="employee-roster-day-head">
        <div>
          <strong>${title || formatWeekday(day)}</strong>
          <span>${metaLine}</span>
        </div>
        ${statusMarkup}
      </div>
      <div class="employee-roster-day-body">
        ${sortedEntries.length
          ? sortedEntries.map((entry) => `
            <div class="employee-roster-line">
              ${showEmployeeName ? `<span class="employee-roster-name">${entry.name}</span>` : ""}
              <strong>${getShiftName(entry)}</strong>
              <span>${entry.startTime} - ${entry.endTime}</span>
            </div>
          `).join("")
          : `<div class="employee-roster-empty">${approvedAbsenceLabel || (isClosedPlannerDay(day) ? "Gesloten" : "Geen dienst")}</div>`}
      </div>
      ${canCompleteToday ? `
        <div class="employee-roster-actions">
          <button type="button" class="secondary" data-go-hours-date="${day}">
            Uren vandaag doorgeven
          </button>
        </div>
      ` : ""}
    </article>
  `;
}

function renderMobileCoverageAlert(status, text) {
  if (status === "closed") {
    return `<div class="mobile-day-alert closed">${text}</div>`;
  }

  if (status === "under") {
    return `<div class="mobile-day-alert under">${text}</div>`;
  }

  if (status === "full") {
    return `<div class="mobile-day-alert full">${text}</div>`;
  }

  return "";
}

function renderDesktopAbsenceList(requests) {
  if (!requests.length) {
    return "";
  }

  return `
    <div class="desktop-day-absences">
      ${requests.map((request) => `
        <div class="planner-note approved absence-${getAbsenceCardClass(request.type)}">
          ${request.employeeName}: ${getApprovedAbsenceLabel(request)}${request.reason ? ` - ${request.reason}` : ""}
        </div>
      `).join("")}
    </div>
  `;
}

function getPlannerSectionKey(shiftLike) {
  if (!shiftLike) {
    return "bakery";
  }

  if (shiftLike.isShopShift || isShopShiftName(shiftLike.name || shiftLike.shiftName || "")) {
    return "shop";
  }

  if (shiftLike.isAllroundShift || isAllroundShiftName(shiftLike.name || shiftLike.shiftName || "")) {
    return "allround";
  }

  if (isOptionalShift(shiftLike) || isStageShiftName(shiftLike.name || shiftLike.shiftName || "")) {
    return "optional";
  }

  return "bakery";
}

function getPlannerSectionLabel(sectionKey) {
  return getPlannerSectionLabelHelper(sectionKey);
}

function renderOpenShiftCard(shift, day, { inlinePlanner = false } = {}) {
  const controlModeActive = isControlModeActive();
  const suitableEmployees = isPlannerRole()
    ? getSuitableEmployeesForShift(shift, day, shift.startTime, shift.endTime, null)
    : [];
  const standardCoverage = getStandardShiftCoverageInfo(shift, day);
  const openLabel = standardCoverage.standardEmployee && standardCoverage.isAbsent
    ? "Open vervanging"
    : "Nog open";
  const detailLabel = standardCoverage.standardEmployee
    ? `Normaal ${standardCoverage.standardEmployee}${standardCoverage.isAbsent ? ` (${standardCoverage.reason})` : ""}`
    : suitableEmployees.length
      ? `${suitableEmployees.length} geschikte medewerker(s)`
      : "Geen geschikte medewerker";
  const employeeLine = standardCoverage.standardEmployee
    ? `<div class="shift-employee">${standardCoverage.standardEmployee}</div>`
    : "";
  const inlineSelectId = `open-shift-${`${day}-${shift.id}`.replace(/[^a-z0-9_-]/gi, "-").toLowerCase()}`;
  const inlineSelectMarkup = inlinePlanner && suitableEmployees.length
    ? `
        <div class="quick-switch-row is-inline-planner">
          <label class="sr-only" for="${inlineSelectId}">${shift.name} invullen</label>
          <select id="${inlineSelectId}" data-action="assign-open-shift" data-day="${day}" data-shift-id="${shift.id}">
            <option value="">Kies medewerker</option>
            ${suitableEmployees.map((employeeName) => `
              <option value="${employeeName}">${employeeName}</option>
            `).join("")}
          </select>
        </div>
      `
    : "";
  const inlineEditableClass = inlinePlanner && suitableEmployees.length ? "is-inline-editable" : "";
  const controlFlagsMarkup = controlModeActive
    ? `
        <div class="control-flags">
          <span class="control-flag is-open">Open dienst</span>
          ${standardCoverage.standardEmployee && standardCoverage.isAbsent ? '<span class="control-flag is-replacement">Vervanging nodig</span>' : ""}
        </div>
      `
    : "";

  return `
    <article class="shift-card ${shift.color || "shift-tone-inpak"} is-open-shift ${inlineEditableClass}" data-day="${day}" data-shift-id="${shift.id}" ${inlineEditableClass ? `data-inline-select="${inlineSelectId}" tabindex="0"` : ""}>
      <div class="shift-name">${shift.name}</div>
      ${employeeLine}
      <div class="shift-time">${shift.startTime} - ${shift.endTime}</div>
      ${controlFlagsMarkup}
      <div class="shift-status">${openLabel}</div>
      <div class="shift-context">${detailLabel}</div>
      ${inlineSelectMarkup}
    </article>
  `;
}

function getPlannerSectionSortIndex(shift) {
  const sectionKey = getPlannerSectionKey(shift);

  if (sectionKey === "bakery") {
    return 0;
  }

  if (sectionKey === "allround") {
    return 1;
  }

  if (sectionKey === "shop") {
    return 2;
  }

  return 3;
}

function getDesktopDayStatus(day) {
  const specialDay = getRecognizedSpecialDayInfo(day);
  const requiredShifts = getRequiredDayPlannerShifts(day);

  if (!requiredShifts.length) {
    return {
      label: "Gesloten",
      detail: specialDay?.isClosed ? `${specialDay.nameLabel} - geen diensten` : "Geen verplichte diensten",
      className: "is-closed"
    };
  }

  const openShifts = requiredShifts.filter((shift) => !getEntryForShiftOnDate(day, shift));
  const openReplacementShifts = openShifts.filter((shift) => {
    const coverage = getStandardShiftCoverageInfo(shift, day);
    return coverage.standardEmployee && coverage.isAbsent;
  });

  if (openReplacementShifts.length) {
    return {
      label: "Vervanging nodig",
      detail: `${openReplacementShifts.length} open vervanging${openReplacementShifts.length === 1 ? "" : "en"}`,
      className: "is-replacement"
    };
  }

  if (openShifts.length) {
    return {
      label: "Open diensten",
      detail: `${openShifts.length} nog niet ingevuld`,
      className: "is-open"
    };
  }

  return {
    label: "Compleet",
    detail: "Alle verplichte diensten gevuld",
    className: "is-complete"
  };
}

function renderDesktopDaySummary(day, dayEntries, sourceEntries = entries) {
  const openCount = getRequiredDayPlannerShifts(day)
    .filter((shift) => !getEntryForShiftOnDate(day, shift, sourceEntries))
    .length;
  const filledCount = dayEntries.length;
  const replacementCount = dayEntries.filter((entry) => Boolean(entry.replacementFor)).length;

  return `
    <div class="desktop-day-summary">
      <span class="desktop-day-summary-item is-open">Open ${openCount}</span>
      <span class="desktop-day-summary-item is-filled">Ingevuld ${filledCount}</span>
      <span class="desktop-day-summary-item is-replacement">Vervanging ${replacementCount}</span>
    </div>
  `;
}

function getPlannerFocusableCards() {
  if (!scheduleBoard) {
    return [];
  }

  return [...scheduleBoard.querySelectorAll(".shift-card[data-inline-select]")];
}

function getPlannerFocusableSelects() {
  if (!scheduleBoard) {
    return [];
  }

  return [
    ...scheduleBoard.querySelectorAll('select[data-action="assign-open-shift"][data-day][data-shift-id], select[data-action="quick-switch"][data-index]')
  ];
}

function openPlannerSelect(select) {
  if (!select) {
    return;
  }

  select.focus();

  try {
    if (typeof select.showPicker === "function") {
      select.showPicker();
      return;
    }
  } catch (error) {
    // Ignore and fall back to click
  }

  try {
    select.click();
  } catch (error) {
    // Ignore if the browser blocks programmatic opening
  }
}

function getPlannerSelectDescriptor(select) {
  if (!select) {
    return null;
  }

  if (select.matches('select[data-action="assign-open-shift"][data-day][data-shift-id]')) {
    return {
      type: "open",
      day: select.dataset.day || "",
      shiftId: select.dataset.shiftId || ""
    };
  }

  if (select.matches('select[data-action="quick-switch"][data-index]')) {
    return {
      type: "filled",
      index: select.dataset.index || ""
    };
  }

  return null;
}

function matchesPlannerSelectDescriptor(select, descriptor) {
  if (!select || !descriptor) {
    return false;
  }

  if (descriptor.type === "open") {
    return (
      select.matches('select[data-action="assign-open-shift"][data-day][data-shift-id]') &&
      (select.dataset.day || "") === descriptor.day &&
      (select.dataset.shiftId || "") === descriptor.shiftId
    );
  }

  return (
    descriptor.type === "filled" &&
    select.matches('select[data-action="quick-switch"][data-index]') &&
    (select.dataset.index || "") === descriptor.index
  );
}

function queueNextEmptyPlannerFocus(currentSelect) {
  const plannerSelects = getPlannerFocusableSelects();
  const currentIndex = plannerSelects.indexOf(currentSelect);

  if (currentIndex === -1) {
    pendingPlannerFocus = null;
    return;
  }

  const nextOpenSelect = plannerSelects
    .slice(currentIndex + 1)
    .find((select) => select.matches('select[data-action="assign-open-shift"][data-day][data-shift-id]')) ||
    plannerSelects.find((select) => select.matches('select[data-action="assign-open-shift"][data-day][data-shift-id]')) ||
    plannerSelects[currentIndex + 1] ||
    null;

  pendingPlannerFocus = nextOpenSelect ? getPlannerSelectDescriptor(nextOpenSelect) : null;
}

function applyPendingPlannerFocus() {
  if (!pendingPlannerFocus) {
    return;
  }

  const targetSelect = getPlannerFocusableSelects().find((select) =>
    matchesPlannerSelectDescriptor(select, pendingPlannerFocus)
  );
  pendingPlannerFocus = null;

  if (!targetSelect) {
    return;
  }

  openPlannerSelect(targetSelect);
}

function renderDesktopDayActions(day) {
  if (!isPlannerRole() || isClosedPlannerDay(day)) {
    return "";
  }

  return `
    <div class="desktop-day-actions">
      <button type="button" class="small" data-action="smart-fill-day" data-day="${day}">Dag slim vullen</button>
      <button type="button" class="small warning" data-action="clear-day" data-day="${day}">Dag leegmaken</button>
    </div>
  `;
}

function fillOpenShiftsForDay(selectedDate) {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan een dag slim vullen.", "error");
    return false;
  }

  if (!selectedDate) {
    showMessage("Kies eerst een dag om slim te vullen.", "error");
    return false;
  }

  const plannerShifts = getDayPlannerShifts(selectedDate);

  if (!plannerShifts.length) {
    showMessage("Voor deze dag zijn geen diensten ingesteld.", "error");
    return false;
  }

  if (!ensureWeekActionAllowed(getWeekValueFromDate(selectedDate), {
    actionLabel: "open diensten slim te vullen",
    blockPlannerWhenLocked: true
  })) {
    return false;
  }

  const selectedWeek = weekFilterInput.value || weekInput.value || getWeekValueFromDate(selectedDate);
  const workingEntries = [...entries];
  const newAssignments = [];
  const openBakeryShifts = getRequiredDayPlannerShifts(selectedDate)
    .filter((shift) => isBakeryCoreShift(shift) && !shift.isAllroundShift && !shift.isShopShift && !getEntryForShiftOnDate(selectedDate, shift, workingEntries))
    .sort((shiftA, shiftB) =>
      shiftA.startTime.localeCompare(shiftB.startTime) ||
      shiftA.name.localeCompare(shiftB.name, "nl")
    );
  const openAllroundShifts = getRequiredDayPlannerShifts(selectedDate)
    .filter((shift) => shift.isAllroundShift && !getEntryForShiftOnDate(selectedDate, shift, workingEntries))
    .sort((shiftA, shiftB) =>
      shiftA.startTime.localeCompare(shiftB.startTime) ||
      shiftA.name.localeCompare(shiftB.name, "nl")
    );
  const openShopShifts = getRequiredDayPlannerShifts(selectedDate)
    .filter((shift) => shift.isShopShift && !getEntryForShiftOnDate(selectedDate, shift, workingEntries))
    .sort((shiftA, shiftB) =>
      shiftA.startTime.localeCompare(shiftB.startTime) ||
      shiftA.name.localeCompare(shiftB.name, "nl")
    );

  openBakeryShifts.forEach((shift) => {
    const candidateResult = getAutoFillCandidateResult(shift, selectedDate, workingEntries, selectedWeek);
    const employeeName = candidateResult.employeeName;

    if (!employeeName) {
      return;
    }

    const assignment = {
      name: employeeName,
      day: selectedDate,
      startTime: shift.startTime,
      endTime: shift.endTime,
      hours: calculateHours(shift.startTime, shift.endTime) || 0,
      shiftId: shift.id.startsWith("shop-") ? "" : shift.id,
      shiftName: shift.name,
      replacementFor: candidateResult.replacementFor || "",
      autoFillReason: candidateResult.autoFillReason || "",
      autoFillReasonDetail: candidateResult.autoFillReasonDetail || ""
    };

    newAssignments.push(assignment);
    workingEntries.push(assignment);
  });

  openAllroundShifts.forEach((shift) => {
    const candidateResult = getAutoFillCandidateResult(shift, selectedDate, workingEntries, selectedWeek);
    const employeeName = candidateResult.employeeName;

    if (!employeeName) {
      return;
    }

    const assignment = {
      name: employeeName,
      day: selectedDate,
      startTime: shift.startTime,
      endTime: shift.endTime,
      hours: calculateHours(shift.startTime, shift.endTime) || 0,
      shiftId: shift.id.startsWith("shop-") ? "" : shift.id,
      shiftName: shift.name,
      replacementFor: "",
      autoFillReason: candidateResult.autoFillReason || "",
      autoFillReasonDetail: candidateResult.autoFillReasonDetail || ""
    };

    newAssignments.push(assignment);
    workingEntries.push(assignment);
  });

  openShopShifts.forEach((shift) => {
    const candidateResult = getAutoFillCandidateResult(shift, selectedDate, workingEntries, selectedWeek);
    const employeeName = candidateResult.employeeName;

    if (!employeeName) {
      return;
    }

    const assignment = {
      name: employeeName,
      day: selectedDate,
      startTime: shift.startTime,
      endTime: shift.endTime,
      hours: calculateHours(shift.startTime, shift.endTime) || 0,
      shiftId: "",
      shiftName: shift.name,
      replacementFor: "",
      autoFillReason: candidateResult.autoFillReason || "",
      autoFillReasonDetail: candidateResult.autoFillReasonDetail || ""
    };

    newAssignments.push(assignment);
    workingEntries.push(assignment);
  });

  if (!newAssignments.length) {
    showMessage("Er konden geen open diensten slim worden ingevuld voor deze dag.", "error");
    return false;
  }

  if (!validateDayPlannerAssignments(selectedDate, plannerShifts, [
    ...entries.filter((entry) =>
      entry.day === selectedDate &&
      plannerShifts.some((shift) => getShiftName(entry).toLowerCase() === shift.name.toLowerCase())
    ),
    ...newAssignments
  ])) {
    render();
    return false;
  }

  setUndoState(`Dag slim vullen ${formatDate(selectedDate)}`);
  entries.push(...newAssignments);
  saveEntries();
  persistProtectedChange({
    reason: `Dag slim gevuld: ${selectedDate}`,
    scope: "roster",
    action: "roster-day-smart-filled",
    message: `Dag slim gevuld voor ${formatDate(selectedDate)}.`,
    details: {
      day: selectedDate,
      filledCount: newAssignments.length
    }
  });
  render();
  showMessage("Rooster bijgewerkt.", "success");
  return true;
}

function clearPlannerDay(selectedDate) {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan een dag leegmaken.", "error");
    return false;
  }

  if (!selectedDate) {
    showMessage("Kies eerst een dag om leeg te maken.", "error");
    return false;
  }

  if (!ensureWeekActionAllowed(getWeekValueFromDate(selectedDate), {
    actionLabel: "deze dag leeg te maken",
    blockPlannerWhenLocked: true
  })) {
    return false;
  }

  const plannerShifts = getDayPlannerShifts(selectedDate);
  const removableIndexes = entries
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) =>
      entry.day === selectedDate &&
      plannerShifts.some((shift) => getShiftName(entry).toLowerCase() === shift.name.toLowerCase())
    )
    .map(({ index }) => index);

  if (!removableIndexes.length) {
    showMessage("Voor deze dag zijn nog geen diensten ingepland.", "error");
    return false;
  }

  if (!confirmAction(`Weet je het zeker? Alle ingeplande diensten op ${formatDate(selectedDate)} worden leeggemaakt.`)) {
    return false;
  }

  setUndoState(`Dag leegmaken ${formatDate(selectedDate)}`);
  removableIndexes
    .sort((indexA, indexB) => indexB - indexA)
    .forEach((index) => {
      entries.splice(index, 1);
    });
  saveEntries();
  persistProtectedChange({
    reason: `Dag leeggemaakt: ${selectedDate}`,
    scope: "roster",
    action: "roster-day-cleared",
    message: `Dagplanning voor ${formatDate(selectedDate)} is leeggemaakt.`,
    details: {
      day: selectedDate,
      removedCount: removableIndexes.length
    }
  });
  render();
  showSavedMessage();
  return true;
}

function renderDesktopPlannerSections({
  day,
  plannedEntries,
  sourceEntries,
  includeOpenShifts = false,
  showEmployee = true,
  showActions = false,
  emptyText = "Geen diensten ingepland",
  absenceMarkup = "",
  footerMarkup = ""
} = {}) {
  const sectionOrder = ["bakery", "allround", "shop", "optional"];
  const entriesBySection = {
    bakery: [],
    allround: [],
    shop: [],
    optional: []
  };

  plannedEntries.forEach((entry) => {
    entriesBySection[getPlannerSectionKey(getShiftForEntry(entry) || entry)].push(entry);
  });

  const openBySection = {
    bakery: [],
    allround: [],
    shop: [],
    optional: []
  };

  if (includeOpenShifts) {
    getDayPlannerShifts(day)
      .filter((shift) => !isOptionalShift(shift) && !getEntryForShiftOnDate(day, shift, sourceEntries))
      .forEach((shift) => {
        openBySection[getPlannerSectionKey(shift)].push(shift);
      });
  }

  const openSectionShifts = includeOpenShifts
    ? Object.values(openBySection)
      .flat()
      .sort((shiftA, shiftB) =>
        getPlannerSectionSortIndex(shiftA) - getPlannerSectionSortIndex(shiftB) ||
        shiftA.startTime.localeCompare(shiftB.startTime) ||
        shiftA.name.localeCompare(shiftB.name, "nl")
      )
    : [];

  const openSectionMarkup = openSectionShifts.length
    ? `
        <section class="desktop-day-section section-open">
          <div class="desktop-day-section-title is-open">
            <strong>Open</strong>
            <span>${openSectionShifts.length}</span>
          </div>
          <div class="desktop-day-cards">
            ${openSectionShifts.map((shift) => renderOpenShiftCard(shift, day, { inlinePlanner: showActions })).join("")}
          </div>
        </section>
      `
    : "";

  const sectionMarkup = sectionOrder
    .map((sectionKey) => {
      const sectionEntries = entriesBySection[sectionKey];

      if (!sectionEntries.length) {
        return "";
      }

      return `
        <section class="desktop-day-section section-${sectionKey}">
          <div class="desktop-day-section-title">
            <strong>${getPlannerSectionLabel(sectionKey)}</strong>
            <span>${sectionEntries.length}</span>
          </div>
          <div class="desktop-day-cards">
            ${sectionEntries.map((entry) => renderShiftCard(entry, { showEmployee, showActions, inlinePlanner: showActions })).join("")}
          </div>
        </section>
      `;
    })
    .filter(Boolean)
    .join("");

  const bodyMarkup = `${openSectionMarkup}${sectionMarkup}` || `<span class="planner-empty">${emptyText}</span>`;

  return `
    <div class="desktop-day-list">
      ${bodyMarkup}
      ${absenceMarkup}
      ${footerMarkup}
    </div>
  `;
}

function renderDesktopWeekColumns(weekDates, renderDayContent) {
  const weekGridClass = weekDates.length <= 5 ? "desktop-week-grid is-workweek" : "desktop-week-grid";

  return `
    <section class="${weekGridClass}" style="--desktop-week-columns: ${Math.max(1, weekDates.length)};">
      ${weekDates.map((day) => `
        <article class="desktop-day-column ${isDefaultFreeDay(day) ? "free-day-column" : ""} ${getRecognizedSpecialDayInfo(day) ? "has-special-day" : ""} ${getRelativeDayState(day) ? `is-${getRelativeDayState(day)}` : ""}">
          ${renderDayContent(day)}
        </article>
      `).join("")}
    </section>
  `;
}

function renderSuitableEmployeesHelper(day) {
  if (!isPlannerRole() || !showSuitableEmployees) {
    return "";
  }

  const openShifts = getDayPlannerShifts(day).filter((shift) => !getEntryForShiftOnDate(day, shift));

  if (!openShifts.length) {
    return "";
  }

  return `
    <div class="suitable-helper-list">
      ${openShifts.map((shift) => {
        const suitableEmployees = getSuitableEmployeesForShift(shift, day, shift.startTime, shift.endTime, null);
        const standardCoverage = getStandardShiftCoverageInfo(shift, day);
        const openReplacementLabel = standardCoverage.standardEmployee && standardCoverage.isAbsent
          ? `Open vervanging voor ${standardCoverage.standardEmployee}`
          : shift.name;

        return `
          <div class="suitable-helper-item">
            <strong>${openReplacementLabel}${isOptionalShift(shift) ? " (optioneel)" : ""}</strong>
            ${standardCoverage.standardEmployee ? `<span class="day-planner-note is-info">Normaal: ${standardCoverage.standardEmployee}${standardCoverage.isAbsent ? ` (${standardCoverage.reason})` : ""}</span>` : ""}
            ${suitableEmployees.length
              ? `<div class="suitable-helper-names">
                  ${suitableEmployees.map((employeeName) => `<span class="suitable-helper-tag">${employeeName}</span>`).join("")}
                </div>`
              : `<span class="${isOptionalShift(shift) ? "day-planner-note is-info" : "suitable-helper-empty"}">${isOptionalShift(shift) ? "Mag leeg blijven" : "Geen geschikte medewerker"}</span>`}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function getDayPlanningMessage(day) {
  return getDayPlanningMessageHelper(day, {
    getRecognizedSpecialDayInfo,
    getRequiredDayPlannerShifts,
    getEntryForShiftOnDate,
    getSuitableEmployeesForShift,
    sourceEntries: getPlanningEntries()
  });
}

function renderDayPlanningMessage(day, isMobile = false) {
  if (!isPlannerRole()) {
    return "";
  }

  const message = getDayPlanningMessage(day);

  if (isMobile) {
    const typeClass = message.type === "warning"
      ? "under"
      : message.type === "full"
        ? "full"
        : message.type === "closed"
          ? "closed"
          : "info";
    return `<div class="mobile-day-alert ${typeClass}">${message.text}</div>`;
  }

  const typeClass = message.type === "warning"
    ? "warning"
    : message.type === "full"
      ? "approved"
      : message.type === "closed"
        ? "info"
        : "info";
  return `<div class="planner-note ${typeClass}">${message.text}</div>`;
}

function getEmployeeWeekHours(employeeName, weekValue, sourceEntries = entries) {
  return sourceEntries
    .filter((entry) => entry.name === employeeName && getWeekValueFromDate(entry.day) === weekValue)
    .reduce((total, entry) => total + entry.hours, 0);
}

function getEmployeeContractGap(employeeName, weekValue, sourceEntries = entries) {
  const contractHours = getEmployeeContractHours(employeeName);

  if (contractHours <= 0) {
    return 0;
  }

  return Math.round((contractHours - getEmployeeWeekHours(employeeName, weekValue, sourceEntries)) * 10) / 10;
}

function getEmployeeContractPlanningPriority(employeeName, weekValue, sourceEntries = entries) {
  const contractHours = getEmployeeContractHours(employeeName);
  const contractGap = getEmployeeContractGap(employeeName, weekValue, sourceEntries);

  if (contractHours <= 0) {
    return {
      tier: 1,
      gap: 0
    };
  }

  if (contractGap > 0) {
    return {
      tier: 0,
      gap: contractGap
    };
  }

  return {
    tier: 2,
    gap: contractGap
  };
}

function getEmployeeMonthlyContractPlanningPriority(employeeName, dateValue, sourceEntries = entries) {
  const contractHours = getEmployeeContractHours(employeeName);

  if (contractHours <= 0) {
    return {
      tier: 1,
      gap: 0
    };
  }

  const monthlyRosterWorkdays = getMonthlyRosterWorkdayCount(dateValue);
  const monthlyTargetHours = Math.round(((contractHours / 5) * monthlyRosterWorkdays) * 10) / 10;
  const monthlyGap = Math.round((monthlyTargetHours - getEmployeeMonthHours(employeeName, dateValue, sourceEntries)) * 10) / 10;

  if (monthlyGap > 0) {
    return {
      tier: 0,
      gap: monthlyGap
    };
  }

  return {
    tier: 2,
    gap: monthlyGap
  };
}

function getEmployeeMonthlyPatternDeviationCount(employeeName, dateValue, sourceEntries = entries) {
  const monthKey = getMonthKeyFromDate(dateValue);

  if (!monthKey) {
    return 0;
  }

  const relevantEntries = mergePlanningEntries(sourceEntries, entries);

  return relevantEntries
    .filter((entry) =>
      entry.name === employeeName &&
      getMonthKeyFromDate(entry.day) === monthKey &&
      ["shop", "allround"].includes(getShiftCategoryKey({ name: getShiftName(entry) }))
    )
    .reduce((deviationCount, entry) => {
      const entryShift = {
        name: getShiftName(entry),
        startTime: entry.startTime,
        endTime: entry.endTime
      };
      const entryWeekValue = getWeekValueFromDate(entry.day);
      const patternMatch = getEmployeePlanningPatternMatch(employeeName, entryShift, entry.day, entryWeekValue, relevantEntries);

      return deviationCount + (patternMatch.score >= 55 ? 1 : 0);
    }, 0);
}

function getManualShopContractWarning(employeeName, day, shift, suitableEmployees = [], sourceEntries = entries) {
  if (!employeeName || !day || !shift || !isShopShiftName(shift.name)) {
    return "";
  }

  const weekValue = getWeekValueFromDate(day);
  const warningParts = [];
  const selectedContractHours = getEmployeeContractHours(employeeName);
  const selectedGap = getEmployeeContractGap(employeeName, weekValue, sourceEntries);

  if (selectedContractHours > 0 && selectedGap < 0) {
    warningParts.push(`${employeeName} zit nu ${formatHours(Math.abs(selectedGap))} boven contracturen.`);
  }

  const underContractAlternatives = suitableEmployees
    .filter((candidateName) => candidateName !== employeeName && getEmployeeContractHours(candidateName) > 0)
    .map((candidateName) => ({
      name: candidateName,
      gap: getEmployeeContractGap(candidateName, weekValue, sourceEntries)
    }))
    .filter((candidate) => candidate.gap > 0)
    .sort((candidateA, candidateB) =>
      candidateB.gap - candidateA.gap ||
      candidateA.name.localeCompare(candidateB.name, "nl")
    );

  if (underContractAlternatives.length > 0) {
    const alternativeLabel = underContractAlternatives
      .slice(0, 2)
      .map((candidate) => `${candidate.name} (${formatHours(candidate.gap)} open)`)
      .join(", ");
    const remainingCount = underContractAlternatives.length - Math.min(underContractAlternatives.length, 2);
    warningParts.push(
      `Nog onder contracturen: ${alternativeLabel}${remainingCount > 0 ? ` en ${remainingCount} meer` : ""}.`
    );
  }

  return warningParts.length > 0 ? `Opgeslagen. Let op: ${warningParts.join(" ")}` : "";
}

function getEmployeeShiftWeekCount(employeeName, shiftName, weekValue, sourceEntries = entries) {
  return sourceEntries.filter((entry) =>
    entry.name === employeeName &&
    getWeekValueFromDate(entry.day) === weekValue &&
    getShiftName(entry).toLowerCase() === shiftName.toLowerCase()
  ).length;
}

function getEmployeeProposalLoad(employeeName, weekValue, sourceEntries = entries) {
  return sourceEntries.filter((entry) =>
    entry.name === employeeName &&
    entry.proposed &&
    getWeekValueFromDate(entry.day) === weekValue
  ).length;
}

function getEmployeeWeekAssignmentCount(employeeName, weekValue, sourceEntries = entries) {
  return sourceEntries.filter((entry) =>
    entry.name === employeeName &&
    getWeekValueFromDate(entry.day) === weekValue
  ).length;
}

function hasEmployeeAssignmentOnDay(employeeName, day, sourceEntries = entries, ignoredShiftName = "") {
  return sourceEntries.some((entry) =>
    entry.name === employeeName &&
    entry.day === day &&
    (!ignoredShiftName || getShiftName(entry).toLowerCase() !== ignoredShiftName.toLowerCase())
  );
}

function getShiftCategoryKey(shift) {
  if (shift?.isShopShift || isShopShiftName(shift?.name || "")) {
    return "shop";
  }

  if (shift?.isAllroundShift || isAllroundShiftName(shift?.name || "")) {
    return "allround";
  }

  if (isOptionalShift(shift) || isStageShiftName(shift?.name || "")) {
    return "optional";
  }

  return "bakery";
}

function getEmployeeShiftCategoryWeekCount(employeeName, categoryKey, weekValue, sourceEntries = entries) {
  return sourceEntries.filter((entry) => {
    if (entry.name !== employeeName || getWeekValueFromDate(entry.day) !== weekValue) {
      return false;
    }

    const entryShiftName = getShiftName(entry);

    if (categoryKey === "shop") {
      return isShopShiftName(entryShiftName);
    }

    if (categoryKey === "allround") {
      return isAllroundShiftName(entryShiftName);
    }

    if (categoryKey === "optional") {
      return isStageShiftName(entryShiftName);
    }

    return !isShopShiftName(entryShiftName) && !isAllroundShiftName(entryShiftName) && !isStageShiftName(entryShiftName);
  }).length;
}

function getWeekDistanceFromReference(entryWeekValue, referenceWeekValue) {
  return getWeekDistanceFromReferenceHelper(entryWeekValue, referenceWeekValue, {
    getDateFromWeekValue
  });
}

function getHistoricalAssignments(employeeName, weekValue, sourceEntries = entries, lookbackWeeks = 6) {
  return sourceEntries.filter((entry) => {
    if (entry.name !== employeeName) {
      return false;
    }

    const distance = getWeekDistanceFromReference(getWeekValueFromDate(entry.day), weekValue);
    return distance >= 1 && distance <= lookbackWeeks;
  });
}

function getEmployeeRecentShiftWeekCount(employeeName, shiftName, weekValue, sourceEntries = entries, lookbackWeeks = 6) {
  return getHistoricalAssignments(employeeName, weekValue, sourceEntries, lookbackWeeks)
    .filter((entry) => getShiftName(entry).toLowerCase() === shiftName.toLowerCase())
    .length;
}

function getEmployeeRecentCategoryWeekCount(employeeName, categoryKey, weekValue, sourceEntries = entries, lookbackWeeks = 6) {
  return getHistoricalAssignments(employeeName, weekValue, sourceEntries, lookbackWeeks)
    .filter((entry) => getShiftCategoryKey({ name: getShiftName(entry) }) === categoryKey)
    .length;
}

function getEmployeeRecentWeekdayCategoryCount(employeeName, categoryKey, day, weekValue, sourceEntries = entries, lookbackWeeks = 6) {
  const weekday = getWeekdayNumberFromDate(day);
  return getHistoricalAssignments(employeeName, weekValue, sourceEntries, lookbackWeeks)
    .filter((entry) =>
      getWeekdayNumberFromDate(entry.day) === weekday &&
      getShiftCategoryKey({ name: getShiftName(entry) }) === categoryKey
    )
    .length;
}

function getEmployeeHistoricalPatternScore(employeeName, shift, day, weekValue, sourceEntries = entries, lookbackWeeks = 8) {
  const categoryKey = getShiftCategoryKey(shift);
  const weekday = getWeekdayNumberFromDate(day);

  return getHistoricalAssignments(employeeName, weekValue, sourceEntries, lookbackWeeks)
    .reduce((total, entry) => {
      const distance = getWeekDistanceFromReference(getWeekValueFromDate(entry.day), weekValue);

      if (distance < 1 || distance > lookbackWeeks) {
        return total;
      }

      const recencyWeight = (lookbackWeeks + 1 - distance) / (lookbackWeeks + 1);
      const entryShiftName = getShiftName(entry);
      const sameWeekday = getWeekdayNumberFromDate(entry.day) === weekday;
      const sameShift = entryShiftName.toLowerCase() === shift.name.toLowerCase();
      const sameCategory = getShiftCategoryKey({ name: entryShiftName }) === categoryKey;

      if (sameShift && sameWeekday) {
        return total + (2.4 * recencyWeight);
      }

      if (sameShift) {
        return total + (1.5 * recencyWeight);
      }

      if (sameCategory && sameWeekday) {
        return total + (0.9 * recencyWeight);
      }

      if (sameCategory) {
        return total + (0.4 * recencyWeight);
      }

      return total;
    }, 0);
}

function getEmployeeExactShiftRepeatStreak(employeeName, shift, day, weekValue, sourceEntries = entries, maxWeeks = 4) {
  let streak = 0;
  let checkWeek = weekValue;

  for (let index = 0; index < maxWeeks; index += 1) {
    checkWeek = getPreviousWeekValue(checkWeek);
    const expectedWeekday = getWeekdayNumberFromDate(day);
    const foundEntry = sourceEntries.find((entry) =>
      entry.name === employeeName &&
      getWeekValueFromDate(entry.day) === checkWeek &&
      getWeekdayNumberFromDate(entry.day) === expectedWeekday &&
      getShiftName(entry).toLowerCase() === shift.name.toLowerCase()
    );

    if (!foundEntry) {
      break;
    }

    streak += 1;
  }

  return streak;
}

function getWeekPatternVariant(weekValue) {
  const weekNumber = Number(String(weekValue || "").split("-W")[1]);
  return Number.isFinite(weekNumber) && weekNumber % 2 === 1 ? "A" : "B";
}

function isLastRosterWeekOfMonth(weekValue) {
  const monday = getDateFromWeekValue(weekValue);
  const nextMonday = new Date(monday);
  nextMonday.setUTCDate(monday.getUTCDate() + 7);
  return monday.getUTCMonth() !== nextMonday.getUTCMonth();
}

function getMonthKeyFromDate(dateValue) {
  const [year = "", month = ""] = String(dateValue || "").split("-");
  return year && month ? `${year}-${month}` : "";
}

function getCurrentMonthValue() {
  return getMonthKeyFromDate(getTodayDateValue());
}

function getMonthLabel(monthValue) {
  return getMonthLabelHelper(monthValue);
}

function getWeeksForMonth(monthValue) {
  const [year, month] = String(monthValue || "").split("-");

  if (!year || !month) {
    return [];
  }

  const targetMonthKey = `${year}-${month}`;
  const yearsToCheck = [Number(year) - 1, Number(year), Number(year) + 1];
  const weekValues = [];
  const seenWeeks = new Set();

  yearsToCheck.forEach((checkYear) => {
    const totalWeeks = getIsoWeekCountForYear(checkYear);

    for (let index = 1; index <= totalWeeks; index += 1) {
      const weekValue = `${checkYear}-W${String(index).padStart(2, "0")}`;
      const intersectsMonth = getWeekDates(weekValue).some((dateValue) => getMonthKeyFromDate(dateValue) === targetMonthKey);

      if (intersectsMonth && !seenWeeks.has(weekValue)) {
        seenWeeks.add(weekValue);
        weekValues.push(weekValue);
      }
    }
  });

  return weekValues.sort();
}

function getMonthlyWeekdayOccurrenceCount(dateValue, weekdayNumber) {
  const [yearPart, monthPart] = String(dateValue || "").split("-");
  const year = Number(yearPart);
  const month = Number(monthPart);

  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return 0;
  }

  let count = 0;
  const cursor = new Date(Date.UTC(year, month - 1, 1));

  while (cursor.getUTCMonth() === month - 1) {
    if ((cursor.getUTCDay() || 7) === weekdayNumber) {
      count += 1;
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return count;
}

function getEmployeeMonthlyWeekdayAssignmentCount(employeeName, weekdayNumber, dateValue, sourceEntries = entries) {
  const monthKey = getMonthKeyFromDate(dateValue);

  if (!monthKey) {
    return 0;
  }

  const relevantEntries = mergePlanningEntries(sourceEntries, entries);

  return relevantEntries.filter((entry) =>
    entry.name === employeeName &&
    getMonthKeyFromDate(entry.day) === monthKey &&
    getWeekdayNumberFromDate(entry.day) === weekdayNumber
  ).length;
}

function getEmployeeMonthlyWorkedWeekdayCount(employeeName, weekdayNumber, dateValue, sourceEntries = entries) {
  const monthKey = getMonthKeyFromDate(dateValue);

  if (!monthKey) {
    return 0;
  }

  const relevantEntries = mergePlanningEntries(sourceEntries, entries)
    .filter((entry) =>
      entry.name === employeeName &&
      getMonthKeyFromDate(entry.day) === monthKey &&
      getWeekdayNumberFromDate(entry.day) === weekdayNumber
    )
    .map((entry) => entry.day);

  return new Set(relevantEntries).size;
}

function getMonthlyRosterWorkdayCount(dateValue) {
  const [yearPart, monthPart] = String(dateValue || "").split("-");
  const year = Number(yearPart);
  const month = Number(monthPart);

  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return 0;
  }

  let count = 0;
  const cursor = new Date(Date.UTC(year, month - 1, 1));

  while (cursor.getUTCMonth() === month - 1) {
    const weekday = cursor.getUTCDay() || 7;

    if (weekday >= 2 && weekday <= 6) {
      count += 1;
    }

    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return count;
}

function getEmployeeMonthHours(employeeName, dateValue, sourceEntries = entries) {
  const monthKey = getMonthKeyFromDate(dateValue);

  if (!monthKey) {
    return 0;
  }

  const relevantEntries = mergePlanningEntries(sourceEntries, entries);

  return relevantEntries
    .filter((entry) => entry.name === employeeName && getMonthKeyFromDate(entry.day) === monthKey)
    .reduce((totalHours, entry) => totalHours + Number(entry.hours || 0), 0);
}

function getEmployeeStrongPreferenceNote(employeeName, weekValue = getCurrentWeekValue()) {
  const normalizedName = String(employeeName || "").trim().toLowerCase();

  if (normalizedName === "saskia") {
    return getWeekPatternVariant(weekValue) === "A"
      ? "Sterke voorkeur: oneven week dinsdag, donderdag en vrijdag hele dag."
      : "Sterke voorkeur: even week dinsdag, vrijdag en zaterdag hele dag.";
  }

  if (normalizedName === "wendy") {
    return isLastRosterWeekOfMonth(weekValue)
      ? "Sterke voorkeur: laatste roosterweek van de maand di hele dag, wo ochtend, do ochtend, vr ochtend."
      : "Sterke voorkeur: di hele dag, wo ochtend, vr ochtend en za hele dag.";
  }

  if (normalizedName === "luna" || normalizedName === "monique") {
    return "Sterke voorkeur: flexibel inzetbaar, maar liefst 1 zaterdag per maand vrij.";
  }

  if (normalizedName === "gerry") {
    return "Sterke voorkeur: niet op dinsdag en zaterdag alleen als het echt nodig is.";
  }

  return "";
}

function getEmployeeStrongPreferenceMatch(employeeName, shift, day, weekValue, sourceEntries = entries) {
  const normalizedName = String(employeeName || "").trim().toLowerCase();
  const weekday = getWeekdayNumberFromDate(day);
  const shiftDaypart = getShiftRosterDaypart(shift);
  const categoryKey = getShiftCategoryKey(shift);
  const isFlexibleShopRole = categoryKey === "shop" || categoryKey === "allround";

  if (!isFlexibleShopRole) {
    return null;
  }

  if (normalizedName === "saskia") {
    const preferredWeekdays = getWeekPatternVariant(weekValue) === "A" ? [2, 4, 5] : [2, 5, 6];
    const isPreferredDay = preferredWeekdays.includes(weekday);
    const saturdayOutsidePreferredWeek = weekday === 6 && !isPreferredDay;

    return isPreferredDay && shiftDaypart === "full"
      ? {
          score: 3,
          label: "Voorkeursrooster",
          detail: `Past binnen Saskia ${getWeekPatternVariant(weekValue) === "A" ? "oneven" : "even"} weekvoorkeur.`
        }
      : saturdayOutsidePreferredWeek
        ? {
            score: 60,
            label: "Afwijking voorkeur",
            detail: "Saskia normaal alleen op zaterdag in haar even week."
          }
      : isPreferredDay
        ? {
            score: 14,
            label: "Afwijking voorkeur",
            detail: "Goede voorkeursdag voor Saskia, maar niet het voorkeursdagdeel."
          }
        : {
            score: 28,
            label: "Afwijking voorkeur",
            detail: "Valt buiten Saskia haar voorkeursdagen voor deze week."
          };
  }

  if (normalizedName === "wendy") {
    const isMonthSwitchWeek = isLastRosterWeekOfMonth(weekValue);
    const preferredRoster = isMonthSwitchWeek
      ? { 2: "full", 3: "morning", 4: "morning", 5: "morning" }
      : { 2: "full", 3: "morning", 5: "morning", 6: "full" };
    const preferredDaypart = preferredRoster[weekday] || "";
    const saturdayOutsidePreferredWeek = weekday === 6 && !preferredDaypart;

    if (saturdayOutsidePreferredWeek) {
      return {
        score: 58,
        label: "Afwijking voorkeur",
        detail: "Wendy haar maandvoorkeur houdt deze zaterdag liever vrij."
      };
    }

    if (!preferredDaypart) {
      return {
        score: 26,
        label: "Afwijking voorkeur",
        detail: "Valt buiten Wendy haar maandvoorkeur."
      };
    }

    if (preferredDaypart === shiftDaypart) {
      return {
        score: 4,
        label: "Voorkeursrooster",
        detail: "Past binnen Wendy haar maandvoorkeur."
      };
    }

    return {
      score: 16,
      label: "Afwijking voorkeur",
      detail: "Juiste voorkeursdag voor Wendy, maar niet het voorkeurdagdeel."
    };
  }

  if (normalizedName === "luna" || normalizedName === "monique") {
    if (weekday !== 6) {
      return null;
    }

    const saturdayCount = getEmployeeMonthlyWorkedWeekdayCount(employeeName, 6, day, sourceEntries);
    const saturdayLimit = Math.max(0, getMonthlyWeekdayOccurrenceCount(day, 6) - 1);

    if (saturdayCount >= saturdayLimit) {
      return {
        score: 57,
        label: "Afwijking voorkeur",
        detail: `${employeeName} liever 1 zaterdag per maand vrijhouden.`
      };
    }

    return {
      score: 9,
      label: "Voorkeursrooster",
      detail: `${employeeName} blijft inzetbaar, maar houdt bij voorkeur 1 zaterdag per maand vrij.`
    };
  }

  if (normalizedName === "gerry") {
    if (weekday === 2) {
      return {
        score: 34,
        label: "Afwijking voorkeur",
        detail: "Gerry liever niet op dinsdag inzetten."
      };
    }

    if (weekday === 6) {
      return {
        score: 58,
        label: "Afwijking voorkeur",
        detail: "Gerry zaterdag alleen inzetten als het echt nodig is."
      };
    }

    return {
      score: 5,
      label: "Voorkeursrooster",
      detail: "Past binnen Gerry zijn vaste winkelvoorkeur."
    };
  }

  return null;
}

function getEmployeeSaturdayPlanningPriority(employeeName, shift, day, weekValue, sourceEntries = entries) {
  const weekday = getWeekdayNumberFromDate(day);
  const categoryKey = getShiftCategoryKey(shift);

  if (weekday !== 6 || !["shop", "allround"].includes(categoryKey)) {
    return 0;
  }

  const normalizedName = String(employeeName || "").trim().toLowerCase();
  const monthlySaturdayCount = getEmployeeMonthlyWorkedWeekdayCount(employeeName, 6, day, sourceEntries);
  const recentSaturdayCategoryCount = getEmployeeRecentWeekdayCategoryCount(employeeName, categoryKey, day, weekValue, sourceEntries, 8);
  const recentSaturdayShiftCount = getEmployeeRecentShiftWeekCount(employeeName, shift.name, weekValue, sourceEntries, 8);
  let priority = (monthlySaturdayCount * 12) + (recentSaturdayCategoryCount * 5) + (recentSaturdayShiftCount * 3);

  if (normalizedName === "gerry") {
    return priority + 60;
  }

  if (normalizedName === "luna" || normalizedName === "monique") {
    const saturdayLimit = Math.max(0, getMonthlyWeekdayOccurrenceCount(day, 6) - 1);

    if (monthlySaturdayCount >= saturdayLimit) {
      return priority + 35;
    }

    return priority + 8;
  }

  if (normalizedName === "saskia") {
    return getWeekPatternVariant(weekValue) === "B" ? Math.max(0, priority - 18) : priority + 24;
  }

  if (normalizedName === "wendy") {
    return isLastRosterWeekOfMonth(weekValue) ? priority + 22 : Math.max(0, priority - 16);
  }

  return priority;
}

function isAfternoonShift(shift) {
  return timeToMinutes(shift?.startTime || "") >= timeToMinutes("12:00");
}

function getRosterDaypartLabel(daypart) {
  return getRosterDaypartLabelHelper(daypart);
}

function getShiftRosterDaypart(shift) {
  const startMinutes = timeToMinutes(shift?.startTime || "");
  const endMinutes = timeToMinutes(shift?.endTime || "");
  const middayMinutes = timeToMinutes("12:00");
  const earlyAfternoonMinutes = timeToMinutes("14:00");

  if (endMinutes <= earlyAfternoonMinutes && startMinutes < middayMinutes) {
    return "morning";
  }

  if (startMinutes >= middayMinutes) {
    return "afternoon";
  }

  return "full";
}

function getEmployeeCustomRosterMatch(employeeName, shift, day, weekValue) {
  const effectiveRoster = getEmployeeEffectiveRosterWeek(employeeName, weekValue);
  const weekday = getWeekdayNumberFromDate(day);
  const basePatternId = getEmployeeBasePatternId(employeeName);

  if (effectiveRoster.source !== "custom") {
    return null;
  }

  const scheduledDaypart = effectiveRoster.values?.[weekday] || "";
  const shiftDaypart = getShiftRosterDaypart(shift);

  if (!scheduledDaypart) {
    return {
      score: basePatternId === "director-emergency" ? 99 : (basePatternId === "on-call" ? 92 : 58),
      label: "Buiten vast rooster",
      detail: "Deze dag staat niet in het handmatig ingestelde vaste rooster."
    };
  }

  if (basePatternId === "director-emergency") {
    return {
      score: 95,
      label: "Noodoplossing",
      detail: "Handmatig rooster ingesteld, maar directie blijft alleen voor noodoplossingen bedoeld."
    };
  }

  if (basePatternId === "on-call") {
    return {
      score: 85,
      label: "Oproepkracht",
      detail: "Handmatig rooster ingesteld, maar oproepkracht blijft een laatste optie."
    };
  }

  if (scheduledDaypart === "full") {
    return {
      score: 2,
      label: "Vast rooster",
      detail: "Past binnen het handmatig ingestelde vaste rooster: hele dag."
    };
  }

  if (scheduledDaypart === shiftDaypart) {
    return {
      score: 1,
      label: "Vast rooster",
      detail: `Past binnen het handmatig ingestelde vaste rooster: ${getRosterDaypartLabel(scheduledDaypart)}.`
    };
  }

  return {
    score: 57,
    label: "Buiten vast rooster",
    detail: `De dienst is ${getRosterDaypartLabel(shiftDaypart)}, maar in het vaste rooster staat ${getRosterDaypartLabel(scheduledDaypart)}.`
  };
}

function getEmployeeBasePatternMatch(employeeName, shift, day, weekValue) {
  const customRosterMatch = getEmployeeCustomRosterMatch(employeeName, shift, day, weekValue);

  if (customRosterMatch) {
    return customRosterMatch;
  }

  const pattern = getEmployeeBasePattern(employeeName);
  const weekday = getWeekdayNumberFromDate(day);
  const categoryKey = getShiftCategoryKey(shift);
  const isSaturday = weekday === 6;
  const isThursdayOrFriday = weekday === 4 || weekday === 5;

  if (!pattern || !pattern.id) {
    return {
      score: 45,
      label: "Geen vast patroon",
      detail: "Geen vast basisrooster ingesteld."
    };
  }

  if (pattern.id === "director-emergency") {
    return {
      score: 100,
      label: "Noodoplossing",
      detail: "Directie alleen als laatste optie."
    };
  }

  if (pattern.id === "on-call") {
    return {
      score: 90,
      label: "Oproepkracht",
      detail: "Oproepkracht alleen gebruiken als laatste optie."
    };
  }

  if (pattern.id === "every-day") {
    return {
      score: 10,
      label: "Basisrooster",
      detail: "Past binnen het vaste patroon: elke dag."
    };
  }

  if (pattern.id === "saturday-only") {
    return isSaturday
      ? {
          score: 2,
          label: "Basisrooster",
          detail: "Past binnen het vaste patroon: zaterdag."
        }
      : {
          score: 60,
          label: "Buiten patroon",
          detail: "Normaal alleen op zaterdag."
        };
  }

  if (pattern.id === "tuesday-stage") {
    return weekday === 2 && categoryKey === "optional"
      ? {
          score: 1,
          label: "Basisrooster",
          detail: "Past binnen het vaste patroon: dinsdag stage."
        }
      : {
          score: 70,
          label: "Buiten patroon",
          detail: "Normaal alleen op dinsdag voor stage."
        };
  }

  if (pattern.id === "thu-fri-afternoon-sat") {
    const matches = isSaturday || (isThursdayOrFriday && isAfternoonShift(shift));
    return matches
      ? {
          score: isSaturday ? 2 : 4,
          label: "Basisrooster",
          detail: isSaturday ? "Past binnen het vaste patroon: zaterdag." : "Past binnen het vaste patroon: donderdag/vrijdagmiddag."
        }
      : {
          score: 65,
          label: "Buiten patroon",
          detail: "Normaal alleen donderdagmiddag, vrijdagmiddag en zaterdag."
        };
  }

  if (pattern.id === "wed-thu-fri-sat") {
    return [3, 4, 5, 6].includes(weekday)
      ? {
          score: 3,
          label: "Basisrooster",
          detail: "Past binnen het vaste patroon."
        }
      : {
          score: 62,
          label: "Buiten patroon",
          detail: "Normaal alleen op woensdag, donderdag, vrijdag en zaterdag."
        };
  }

  if (pattern.id === "wednesday-only") {
    return weekday === 3
      ? {
          score: 2,
          label: "Basisrooster",
          detail: "Past binnen het vaste patroon: woensdag."
        }
      : {
          score: 68,
          label: "Buiten patroon",
          detail: "Normaal alleen op woensdag."
        };
  }

  if (pattern.id === "thursday-only") {
    return weekday === 4
      ? {
          score: 2,
          label: "Basisrooster",
          detail: "Past binnen het vaste patroon: donderdag."
        }
      : {
          score: 68,
          label: "Buiten patroon",
          detail: "Normaal alleen op donderdag."
        };
  }

  if (pattern.id === "tue-fri-sat") {
    return [2, 5, 6].includes(weekday)
      ? {
          score: 3,
          label: "Basisrooster",
          detail: "Past binnen het vaste patroon: dinsdag, vrijdag of zaterdag."
        }
      : {
          score: 62,
          label: "Buiten patroon",
          detail: "Normaal alleen op dinsdag, vrijdag en zaterdag."
        };
  }

  if (pattern.id === "saskia-biweekly") {
    const variant = getWeekPatternVariant(weekValue);
    const allowedDays = variant === "A" ? [2, 4, 5] : [2, 5, 6];
    return allowedDays.includes(weekday)
      ? {
          score: 2,
          label: `Basisrooster week ${variant}`,
          detail: `Past binnen Saskia week ${variant}.`
        }
      : {
          score: 66,
          label: "Buiten patroon",
          detail: `Valt buiten Saskia week ${variant}.`
        };
  }

  if (pattern.id === "sophie-stage-sat") {
    const matchesStage = (weekday === 4 || weekday === 5) && categoryKey === "optional";
    const matchesSaturday = weekday === 6 && categoryKey !== "optional";
    return matchesStage || matchesSaturday
      ? {
          score: matchesStage ? 1 : 3,
          label: "Basisrooster",
          detail: matchesStage ? "Past binnen het vaste patroon: donderdag/vrijdag stage." : "Past binnen het vaste patroon: zaterdag werk."
        }
      : {
          score: 70,
          label: "Buiten patroon",
          detail: "Normaal donderdag/vrijdag stage en zaterdag werk."
        };
  }

  return {
    score: pattern.rank ?? 50,
    label: "Basisrooster",
    detail: pattern.description || "Past binnen het basisrooster."
  };
}

function getEmployeePlanningPatternMatch(employeeName, shift, day, weekValue, sourceEntries = entries) {
  const baseMatch = getEmployeeBasePatternMatch(employeeName, shift, day, weekValue);
  const categoryKey = getShiftCategoryKey(shift);
  const isFlexibleHolidayShift = categoryKey === "shop" || categoryKey === "allround";
  const basePatternId = getEmployeeBasePatternId(employeeName);
  const strongPreferenceMatch = getEmployeeStrongPreferenceMatch(employeeName, shift, day, weekValue, sourceEntries);

  if (strongPreferenceMatch) {
    return strongPreferenceMatch;
  }

  if (
    isVacationWeekValue(weekValue) &&
    isWeekendEmployee(employeeName) &&
    isFlexibleHolidayShift &&
    !["director-emergency", "on-call"].includes(basePatternId) &&
    baseMatch.score >= 55
  ) {
    return {
      score: 18,
      label: "Vakantieregel weekendkracht",
      detail: "Vakantieweek: weekendkracht mag deze week extra worden ingezet buiten het normale basisrooster."
    };
  }

  return baseMatch;
}

function canEmployeeBeAutoPlannedWithinPattern(employeeName, shift, day, weekValue, sourceEntries = entries) {
  const basePatternId = getEmployeeBasePatternId(employeeName);
  const categoryKey = getShiftCategoryKey(shift);

  if (basePatternId === "director-emergency" || basePatternId === "on-call") {
    return true;
  }

  if (categoryKey === "shop" || categoryKey === "allround") {
    return true;
  }

  return getEmployeePlanningPatternMatch(employeeName, shift, day, weekValue, sourceEntries).score < 55;
}

function getAutoPlanningPatternTier(employeeName, shift, day, weekValue, sourceEntries = entries) {
  const patternMatch = getEmployeePlanningPatternMatch(employeeName, shift, day, weekValue, sourceEntries);
  const categoryKey = getShiftCategoryKey(shift);
  const contractGap = getEmployeeContractGap(employeeName, weekValue, sourceEntries);

  if (patternMatch.score < 55) {
    if (categoryKey === "shop" && contractGap > 0) {
      return 0;
    }

    return categoryKey === "shop" ? 2 : 0;
  }

  if (categoryKey === "shop" && contractGap > 0) {
    return 1;
  }

  return categoryKey === "allround" ? 1 : 3;
}

function canEmployeeBeAutoAssigned(employeeName, shift, day, sourceEntries, options = {}) {
  return canEmployeeBeAutoAssignedHelper(employeeName, shift, day, sourceEntries, {
    ...options,
    isEmployeeAuthorizedForShift,
    getApprovedTimeOff,
    hasEmployeeAssignmentOnDay,
    findConflictInSource
  });
}

function getEmployeesForStandardShift(shiftName) {
  return getActiveEmployees().filter((employeeName) => employeeStandardShifts[employeeName] === shiftName);
}

function getPrimaryStandardEmployeeForShift(shiftName) {
  return getEmployeesForStandardShift(shiftName)[0] || "";
}

function getStandardShiftCoverageInfo(shift, day, sourceEntries = getPlanningEntries()) {
  return getStandardShiftCoverageInfoHelper(shift, day, sourceEntries, {
    isBakeryCoreShift,
    getPrimaryStandardEmployeeForShift,
    getApprovedTimeOff,
    getAbsenceTypeLabel,
    hasEmployeeAssignmentOnDay,
    findConflictInSource
  });
}

function findConflictInSource(sourceEntries, name, day, startTime, endTime) {
  return findConflictInSourceHelper(sourceEntries, name, day, startTime, endTime, {
    timeToMinutes
  });
}

function getAutoFillCandidateEmployees(shift, day, sourceEntries, weekValue, options = {}) {
  const {
    excludedEmployees = [],
    preferredEmployees = [],
    enforceSingleShiftPerDay = true,
    enforceRosterPattern = true
  } = options;
  const categoryKey = getShiftCategoryKey(shift);
  const preferredRanks = new Map(preferredEmployees.map((employeeName, index) => [employeeName, index]));
  const excludedSet = new Set(excludedEmployees);
  const useLearnedPatterns = categoryKey === "shop" || categoryKey === "allround";
  const useContractHours = categoryKey === "shop";
  const useMonthlyBalance = categoryKey === "shop" || categoryKey === "allround";

  return getActiveEmployees()
    .filter((employeeName) => {
      if (excludedSet.has(employeeName)) {
        return false;
      }

      if (enforceRosterPattern && !canEmployeeBeAutoPlannedWithinPattern(employeeName, shift, day, weekValue, sourceEntries)) {
        return false;
      }

      return canEmployeeBeAutoAssigned(employeeName, shift, day, sourceEntries, { enforceSingleShiftPerDay });
    })
    .sort((employeeA, employeeB) => {
      const preferredDifference = (preferredRanks.has(employeeA) ? preferredRanks.get(employeeA) : Number.MAX_SAFE_INTEGER) -
        (preferredRanks.has(employeeB) ? preferredRanks.get(employeeB) : Number.MAX_SAFE_INTEGER);
      const patternMatchA = getEmployeePlanningPatternMatch(employeeA, shift, day, weekValue, sourceEntries);
      const patternMatchB = getEmployeePlanningPatternMatch(employeeB, shift, day, weekValue, sourceEntries);

      if (!useContractHours && preferredDifference !== 0) {
        return preferredDifference;
      }

      const patternTierDifference = getAutoPlanningPatternTier(employeeA, shift, day, weekValue, sourceEntries) -
        getAutoPlanningPatternTier(employeeB, shift, day, weekValue, sourceEntries);

      if (patternTierDifference !== 0) {
        return patternTierDifference;
      }

      const basePatternDifference = patternMatchA.score - patternMatchB.score;

      if (basePatternDifference !== 0) {
        return basePatternDifference;
      }

      if (useContractHours) {
        const monthlyContractPriorityA = getEmployeeMonthlyContractPlanningPriority(employeeA, day, sourceEntries);
        const monthlyContractPriorityB = getEmployeeMonthlyContractPlanningPriority(employeeB, day, sourceEntries);
        const monthlyContractTierDifference = monthlyContractPriorityA.tier - monthlyContractPriorityB.tier;

        if (monthlyContractTierDifference !== 0) {
          return monthlyContractTierDifference;
        }

        const monthlyContractGapDifference = monthlyContractPriorityB.gap - monthlyContractPriorityA.gap;

        if (monthlyContractGapDifference !== 0) {
          return monthlyContractGapDifference;
        }

        const contractPriorityA = getEmployeeContractPlanningPriority(employeeA, weekValue, sourceEntries);
        const contractPriorityB = getEmployeeContractPlanningPriority(employeeB, weekValue, sourceEntries);
        const contractTierDifference = contractPriorityA.tier - contractPriorityB.tier;

        if (contractTierDifference !== 0) {
          return contractTierDifference;
        }

        const contractGapDifference = contractPriorityB.gap - contractPriorityA.gap;

        if (contractGapDifference !== 0) {
          return contractGapDifference;
        }

        const saturdayPriorityDifference = getEmployeeSaturdayPlanningPriority(employeeA, shift, day, weekValue, sourceEntries) -
          getEmployeeSaturdayPlanningPriority(employeeB, shift, day, weekValue, sourceEntries);

        if (saturdayPriorityDifference !== 0) {
          return saturdayPriorityDifference;
        }

        if (preferredDifference !== 0) {
          return preferredDifference;
        }

        const preferenceDifference = (getEmployeeShiftPreference(employeeA, shift.name) || Number.MAX_SAFE_INTEGER) -
          (getEmployeeShiftPreference(employeeB, shift.name) || Number.MAX_SAFE_INTEGER);

        if (preferenceDifference !== 0) {
          return preferenceDifference;
        }

        const learnedPatternDifference = getEmployeeHistoricalPatternScore(employeeB, shift, day, weekValue, sourceEntries) -
          getEmployeeHistoricalPatternScore(employeeA, shift, day, weekValue, sourceEntries);

        if (learnedPatternDifference !== 0) {
          return learnedPatternDifference;
        }

        const repeatStreakDifference = getEmployeeExactShiftRepeatStreak(employeeA, shift, day, weekValue, sourceEntries) -
          getEmployeeExactShiftRepeatStreak(employeeB, shift, day, weekValue, sourceEntries);

        if (repeatStreakDifference !== 0) {
          return repeatStreakDifference;
        }
      }

      const preferenceDifference = (getEmployeeShiftPreference(employeeA, shift.name) || Number.MAX_SAFE_INTEGER) -
        (getEmployeeShiftPreference(employeeB, shift.name) || Number.MAX_SAFE_INTEGER);

      if (preferenceDifference !== 0) {
        return preferenceDifference;
      }

      const hoursDifference = getEmployeeWeekHours(employeeA, weekValue, sourceEntries) - getEmployeeWeekHours(employeeB, weekValue, sourceEntries);

      if (hoursDifference !== 0) {
        if (Math.abs(hoursDifference) >= 6 || !useLearnedPatterns) {
          return hoursDifference;
        }
      }

      if (useMonthlyBalance) {
        const monthlyPatternDeviationDifference = getEmployeeMonthlyPatternDeviationCount(employeeA, day, sourceEntries) -
          getEmployeeMonthlyPatternDeviationCount(employeeB, day, sourceEntries);

        if (monthlyPatternDeviationDifference !== 0) {
          return monthlyPatternDeviationDifference;
        }
      }

      if (useLearnedPatterns) {
        const repeatStreakDifference = getEmployeeExactShiftRepeatStreak(employeeA, shift, day, weekValue, sourceEntries) -
          getEmployeeExactShiftRepeatStreak(employeeB, shift, day, weekValue, sourceEntries);

        if (repeatStreakDifference !== 0) {
          return repeatStreakDifference;
        }

        const learnedPatternDifference = getEmployeeHistoricalPatternScore(employeeB, shift, day, weekValue, sourceEntries) -
          getEmployeeHistoricalPatternScore(employeeA, shift, day, weekValue, sourceEntries);

        if (learnedPatternDifference !== 0) {
          return learnedPatternDifference;
        }
      }

      const recentCategoryDifference = getEmployeeRecentCategoryWeekCount(employeeA, categoryKey, weekValue, sourceEntries) -
        getEmployeeRecentCategoryWeekCount(employeeB, categoryKey, weekValue, sourceEntries);

      if (recentCategoryDifference !== 0) {
        return recentCategoryDifference;
      }

      const recentWeekdayCategoryDifference = getEmployeeRecentWeekdayCategoryCount(employeeA, categoryKey, day, weekValue, sourceEntries) -
        getEmployeeRecentWeekdayCategoryCount(employeeB, categoryKey, day, weekValue, sourceEntries);

      if (recentWeekdayCategoryDifference !== 0) {
        return recentWeekdayCategoryDifference;
      }

      const recentSameShiftDifference = getEmployeeRecentShiftWeekCount(employeeA, shift.name, weekValue, sourceEntries) -
        getEmployeeRecentShiftWeekCount(employeeB, shift.name, weekValue, sourceEntries);

      if (recentSameShiftDifference !== 0) {
        return recentSameShiftDifference;
      }

      const categoryDifference = getEmployeeShiftCategoryWeekCount(employeeA, categoryKey, weekValue, sourceEntries) -
        getEmployeeShiftCategoryWeekCount(employeeB, categoryKey, weekValue, sourceEntries);

      if (categoryDifference !== 0) {
        return categoryDifference;
      }

      const sameShiftDifference = getEmployeeShiftWeekCount(employeeA, shift.name, weekValue, sourceEntries) -
        getEmployeeShiftWeekCount(employeeB, shift.name, weekValue, sourceEntries);

      if (sameShiftDifference !== 0) {
        return sameShiftDifference;
      }

      const assignmentDifference = getEmployeeWeekAssignmentCount(employeeA, weekValue, sourceEntries) -
        getEmployeeWeekAssignmentCount(employeeB, weekValue, sourceEntries);

      if (assignmentDifference !== 0) {
        return assignmentDifference;
      }

      const proposalDifference = getEmployeeProposalLoad(employeeA, weekValue, sourceEntries) -
        getEmployeeProposalLoad(employeeB, weekValue, sourceEntries);

      if (proposalDifference !== 0) {
        return proposalDifference;
      }

      return employeeA.localeCompare(employeeB, "nl");
    });
}

function getCandidateMinPositivePreference(candidates, shiftName) {
  return getCandidateMinPositivePreferenceHelper(candidates, shiftName, {
    getEmployeeShiftPreference
  });
}

function getAutoFillReasonForCandidate(employeeName, shift, day, sourceEntries, weekValue, options = {}) {
  if (!employeeName) {
    return {
      label: "",
      detail: ""
    };
  }

  const {
    preferredEmployees = [],
    replacementFor = "",
    replacementReason = ""
  } = options;
  const candidates = getAutoFillCandidateEmployees(shift, day, sourceEntries, weekValue, options);
  const preferredIndex = preferredEmployees.indexOf(employeeName);
  const minPositivePreference = getCandidateMinPositivePreference(candidates, shift.name);
  const employeePreference = getEmployeeShiftPreference(employeeName, shift.name);
  const employeeHours = getEmployeeWeekHours(employeeName, weekValue, sourceEntries);
  const employeeContractGap = getEmployeeContractGap(employeeName, weekValue, sourceEntries);
  const employeeMonthlyContractPriority = getEmployeeMonthlyContractPlanningPriority(employeeName, day, sourceEntries);
  const employeeMonthlyPatternDeviationCount = getEmployeeMonthlyPatternDeviationCount(employeeName, day, sourceEntries);
  const employeePatternScore = getEmployeeHistoricalPatternScore(employeeName, shift, day, weekValue, sourceEntries);
  const maxPatternScore = candidates.length
    ? Math.max(...candidates.map((candidateName) => getEmployeeHistoricalPatternScore(candidateName, shift, day, weekValue, sourceEntries)))
    : employeePatternScore;
  const employeeSaturdayPriority = getEmployeeSaturdayPlanningPriority(employeeName, shift, day, weekValue, sourceEntries);
  const repeatStreak = getEmployeeExactShiftRepeatStreak(employeeName, shift, day, weekValue, sourceEntries);
  const minHours = candidates.length
    ? Math.min(...candidates.map((candidateName) => getEmployeeWeekHours(candidateName, weekValue, sourceEntries)))
    : employeeHours;
  const maxContractGap = candidates.length
    ? Math.max(...candidates.map((candidateName) => getEmployeeContractGap(candidateName, weekValue, sourceEntries)))
    : employeeContractGap;
  const maxMonthlyContractGap = candidates.length
    ? Math.max(...candidates.map((candidateName) => getEmployeeMonthlyContractPlanningPriority(candidateName, day, sourceEntries).gap))
    : employeeMonthlyContractPriority.gap;
  const basePatternMatch = getEmployeePlanningPatternMatch(employeeName, shift, day, weekValue, sourceEntries);
  const specialDay = getRecognizedSpecialDayInfo(day);
  const shiftCategoryKey = getShiftCategoryKey(shift);
  const isHolidayPlanningShift = Boolean(
    specialDay &&
    !specialDay.isClosed &&
    (shiftCategoryKey === "shop" || shiftCategoryKey === "allround")
  );
  const minSaturdayPriority = candidates.length
    ? Math.min(...candidates.map((candidateName) => getEmployeeSaturdayPlanningPriority(candidateName, shift, day, weekValue, sourceEntries)))
    : employeeSaturdayPriority;
  const minMonthlyPatternDeviationCount = candidates.length
    ? Math.min(...candidates.map((candidateName) => getEmployeeMonthlyPatternDeviationCount(candidateName, day, sourceEntries)))
    : employeeMonthlyPatternDeviationCount;

  if (replacementFor) {
    if (basePatternMatch.score >= 55) {
      return {
        label: "Vervanging",
        detail: `${employeeName} vervangt ${replacementFor} buiten het vaste patroon, omdat ${shift.name} anders open zou blijven${replacementReason ? ` (${replacementReason})` : ""}.`
      };
    }

    if (employeePreference > 0 && employeePreference === minPositivePreference) {
      return {
        label: "Vervanger met hoogste voorkeur",
        detail: `${employeeName} vervangt ${replacementFor}. Voorkeur ${employeePreference}${replacementReason ? `, omdat ${replacementReason}` : ""}.`
      };
    }

    if (employeeHours === minHours) {
      return {
        label: "Vervanger met minst aantal uren",
        detail: `${employeeName} vervangt ${replacementFor} en had op dat moment de laagste weeklast${replacementReason ? ` (${replacementReason})` : ""}.`
      };
    }

    return {
      label: "Logische vervanger",
      detail: `${employeeName} vervangt ${replacementFor}${replacementReason ? `, omdat ${replacementReason}` : ""}.`
    };
  }

  if (preferredIndex === 0) {
    return {
      label: "Vaste medewerker",
      detail: `${employeeName} is de vaste gekoppelde medewerker voor ${shift.name}.`
    };
  }

  const candidatePatternScores = candidates.map((candidateName) => getEmployeePlanningPatternMatch(candidateName, shift, day, weekValue, sourceEntries).score);
  const minPatternScore = candidatePatternScores.length ? Math.min(...candidatePatternScores) : basePatternMatch.score;

  if (basePatternMatch.label === "Vakantieregel weekendkracht") {
    return {
      label: "Vakantieregel weekendkracht",
      detail: `${employeeName}: ${basePatternMatch.detail}`
    };
  }

  if (isHolidayPlanningShift && basePatternMatch.score >= 55) {
    return {
      label: "Feestdagplanning",
      detail: `${employeeName} wordt extra ingezet voor ${specialDay.nameLabel}, omdat op feestdagen meer bezetting nodig kan zijn en ${shift.name} anders open zou blijven.`
    };
  }

  if (shiftCategoryKey === "shop" && employeeContractGap > 0 && employeeContractGap === maxContractGap) {
    if (basePatternMatch.score >= 55) {
      return {
        label: "Afwijking voor contracturen",
        detail: `${employeeName} valt buiten het vaste patroon, maar helpt contracturen op te bouwen in week ${weekValue.replace("-W", " week ")}.`
      };
    }

    return {
      label: "Richting contracturen",
      detail: `${employeeName} heeft nog ${formatHours(employeeContractGap)} open richting contracturen in week ${weekValue.replace("-W", " week ")}.`
    };
  }

  if (shiftCategoryKey === "shop" && employeeMonthlyContractPriority.gap > 0 && employeeMonthlyContractPriority.gap === maxMonthlyContractGap) {
    return {
      label: "Maandbalans contracturen",
      detail: `${employeeName} loopt in ${getMonthKeyFromDate(day)} nog ${formatHours(employeeMonthlyContractPriority.gap)} achter op het maanddoel en wordt daarom eerder meegenomen.`
    };
  }

  if (basePatternMatch.label === "Noodoplossing" || basePatternMatch.label === "Oproepkracht") {
    return {
      label: basePatternMatch.label,
      detail: `${employeeName}: ${basePatternMatch.detail}`
    };
  }

  if (basePatternMatch.score === minPatternScore && basePatternMatch.score <= 10) {
    return {
      label: "Vast patroon",
      detail: `${employeeName}: ${basePatternMatch.detail}`
    };
  }

  if (basePatternMatch.score >= 55) {
    return {
      label: "Geen betere optie beschikbaar",
      detail: `${employeeName} valt buiten het vaste patroon, omdat ${shift.name} anders open zou blijven.`
    };
  }

  if (getWeekdayNumberFromDate(day) === 6 && (shiftCategoryKey === "shop" || shiftCategoryKey === "allround") && employeeSaturdayPriority === minSaturdayPriority) {
    return {
      label: "Maandbalans zaterdag",
      detail: `${employeeName} past nu het best in de zaterdagverdeling van ${getMonthKeyFromDate(day)}, zonder steeds dezelfde mensen op zaterdag te zetten.`
    };
  }

  if (employeePreference > 0 && employeePreference === minPositivePreference) {
    return {
      label: "Voorkeursvolgorde",
      detail: `${employeeName} heeft de hoogste ingestelde voorkeur (${employeePreference}) voor ${shift.name}.`
    };
  }

  if ((shiftCategoryKey === "shop" || shiftCategoryKey === "allround") && employeePatternScore > 0 && employeePatternScore === maxPatternScore && repeatStreak < 2) {
    return {
      label: "Eerdere weken",
      detail: `${employeeName} staat in eerdere weken vaker logisch op ${shift.name}, zonder dat dezelfde planning te vaak exact wordt herhaald.`
    };
  }

  if ((shiftCategoryKey === "shop" || shiftCategoryKey === "allround") && employeeMonthlyPatternDeviationCount === minMonthlyPatternDeviationCount && employeeMonthlyPatternDeviationCount > 0) {
    return {
      label: "Maandbalans vast patroon",
      detail: `${employeeName} is deze maand nog het minst buiten het vaste patroon ingezet en blijft daardoor logischer in balans.`
    };
  }

  if (employeeHours === minHours) {
    return {
      label: "Eerlijke verdeling",
      detail: `${employeeName} had op dat moment het laagste aantal ingeplande uren in week ${weekValue}.`
    };
  }

  return {
    label: "Geen betere optie beschikbaar",
    detail: `${employeeName} is gekozen op basis van beschikbaarheid, bevoegdheid en de beste overgebleven match.`
  };
}

function getStandardShiftCandidateEmployee(shift, day, sourceEntries, weekValue) {
  const preferredEmployees = getEmployeesForStandardShift(shift.name);
  const candidateEmployees = getAutoFillCandidateEmployees(
    shift,
    day,
    sourceEntries,
    weekValue,
    {
      preferredEmployees,
      enforceSingleShiftPerDay: true
    }
  );

  return candidateEmployees[0] || "";
}

function getAutoFillCandidateResult(shift, day, sourceEntries, weekValue) {
  if (!shift || isOptionalShift(shift)) {
    return {
      employeeName: "",
      replacementFor: "",
      fillType: "optional-open",
      reason: "optioneel"
    };
  }

  if (isBakeryCoreShift(shift) && !shift.isAllroundShift && !shift.isShopShift) {
    const coverage = getStandardShiftCoverageInfo(shift, day, sourceEntries);

    if (coverage.standardEmployee && !coverage.isAbsent) {
      return {
        employeeName: coverage.standardEmployee,
        replacementFor: "",
        fillType: "standard",
        reason: "",
        autoFillReason: "Vaste medewerker",
        autoFillReasonDetail: `${coverage.standardEmployee} is de vaste gekoppelde medewerker voor ${shift.name}.`
      };
    }

    const replacementOptions = {
      excludedEmployees: coverage.standardEmployee ? [coverage.standardEmployee] : [],
      enforceSingleShiftPerDay: true
    };
    const replacementCandidates = getAutoFillCandidateEmployees(
      shift,
      day,
      sourceEntries,
      weekValue,
      replacementOptions
    );
    const replacementEmployee = replacementCandidates[0] || "";

    if (replacementEmployee) {
      const replacementReason = getAutoFillReasonForCandidate(
        replacementEmployee,
        shift,
        day,
        sourceEntries,
        weekValue,
        {
          ...replacementOptions,
          replacementFor: coverage.standardEmployee || "",
          replacementReason: coverage.reason || ""
        }
      );
      return {
        employeeName: replacementEmployee,
        replacementFor: coverage.standardEmployee || "",
        fillType: "replacement",
        reason: coverage.reason || "vervanging",
        autoFillReason: replacementReason.label,
        autoFillReasonDetail: replacementReason.detail
      };
    }

    return {
      employeeName: "",
      replacementFor: coverage.standardEmployee || "",
      fillType: "open",
      reason: coverage.reason || "geen geschikte medewerker"
    };
  }

  const candidateEmployees = getAutoFillCandidateEmployees(
    shift,
    day,
    sourceEntries,
    weekValue,
    {
      enforceSingleShiftPerDay: true
    }
  );
  const employeeName = candidateEmployees[0] || "";
  const autoFillReason = employeeName
    ? getAutoFillReasonForCandidate(employeeName, shift, day, sourceEntries, weekValue, { enforceSingleShiftPerDay: true })
    : { label: "", detail: "" };

  return {
    employeeName,
    replacementFor: "",
    fillType: employeeName ? "auto" : "open",
    reason: employeeName ? "" : "geen geschikte medewerker",
    autoFillReason: autoFillReason.label,
    autoFillReasonDetail: autoFillReason.detail
  };
}

function removeWeekProposals(weekValue) {
  for (let index = entries.length - 1; index >= 0; index -= 1) {
    if (entries[index].proposed && getWeekValueFromDate(entries[index].day) === weekValue) {
      entries.splice(index, 1);
    }
  }
}

function clearAutoFillPreview() {
  autoFillPreviewEntries = [];
  previewDataRevision += 1;
  derivedDataCache.planningEntriesKey = "";
  derivedDataCache.visibleEntriesKey = "";
  derivedDataCache.filteredEntriesKey = "";
}

function buildAutoFillProposalForWeek(selectedWeek, baseEntries = entries) {
  const workingEntries = [...baseEntries];
  const proposedEntries = [];
  const weekDates = getWeekDates(selectedWeek).filter((day) => getShopCoverageForDate(day).status !== "closed");

  weekDates.forEach((day) => {
    const openShifts = getRequiredDayPlannerShifts(day).filter((shift) => !getEntryForShiftOnDate(day, shift, workingEntries));
    const groupedShifts = [
      ...openShifts
        .filter((shift) => isBakeryCoreShift(shift) && !shift.isAllroundShift && !shift.isShopShift)
        .sort((shiftA, shiftB) => shiftA.startTime.localeCompare(shiftB.startTime) || shiftA.name.localeCompare(shiftB.name, "nl")),
      ...openShifts
        .filter((shift) => shift.isAllroundShift)
        .sort((shiftA, shiftB) => shiftA.startTime.localeCompare(shiftB.startTime) || shiftA.name.localeCompare(shiftB.name, "nl")),
      ...openShifts
        .filter((shift) => shift.isShopShift)
        .sort((shiftA, shiftB) => shiftA.startTime.localeCompare(shiftB.startTime) || shiftA.name.localeCompare(shiftB.name, "nl"))
    ];

    groupedShifts.forEach((shift) => {
      const candidateResult = getAutoFillCandidateResult(shift, day, workingEntries, selectedWeek);
      const employeeName = candidateResult.employeeName;

      if (!employeeName) {
        return;
      }

      const proposedEntry = {
        name: employeeName,
        day,
        startTime: shift.startTime,
        endTime: shift.endTime,
        hours: calculateHours(shift.startTime, shift.endTime) || 0,
        shiftId: shift.id.startsWith("shop-") ? "" : shift.id,
        shiftName: shift.name,
        proposed: true,
        replacementFor: candidateResult.replacementFor || "",
        autoFillReason: candidateResult.autoFillReason || "",
        autoFillReasonDetail: candidateResult.autoFillReasonDetail || ""
      };

      proposedEntries.push(proposedEntry);
      workingEntries.push(proposedEntry);
    });
  });

  const remainingOpenCount = weekDates.reduce((total, day) => (
    total + getRequiredDayPlannerShifts(day).filter((shift) => !getEntryForShiftOnDate(day, shift, workingEntries)).length
  ), 0);

  return {
    proposedEntries,
    workingEntries,
    remainingOpenCount,
    weekDates
  };
}

function autoFillWeekSchedule(selectedWeekOverride = "") {
  const selectedWeek = selectedWeekOverride || weekFilterInput.value || weekInput.value;

  if (!selectedWeek) {
    showMessage("Kies eerst een week om automatisch te vullen.", "error");
    return;
  }

  if (!ensureWeekActionAllowed(selectedWeek, {
    actionLabel: "het rooster automatisch te vullen",
    blockPlannerWhenLocked: true
  })) {
    return;
  }

  setWeekReviewStatus(selectedWeek, "open");

  setUndoState("Automatisch vullen voorstel");
  clearAutoFillPreview();
  const { proposedEntries, remainingOpenCount } = buildAutoFillProposalForWeek(selectedWeek, entries);

  if (!proposedEntries.length) {
    render();
    showMessage("Er konden geen nieuwe voorstellen worden gemaakt voor deze week.", "error");
    return;
  }

  autoFillPreviewEntries = proposedEntries;
  previewDataRevision += 1;
  derivedDataCache.planningEntriesKey = "";
  derivedDataCache.visibleEntriesKey = "";
  derivedDataCache.filteredEntriesKey = "";
  render();
  showMessage(
    remainingOpenCount > 0
    ? `Automatisch voorstel klaar · ${proposedEntries.length} ingevuld · ${remainingOpenCount} open`
    : `Automatisch voorstel klaar · ${proposedEntries.length} ingevuld · 0 open`,
    "success"
  );
}

function rebalanceShopHoursForWeek() {
  const selectedWeek = weekFilterInput.value || weekInput.value;

  if (!selectedWeek) {
    showMessage("Kies eerst een week om uren te herverdelen.", "error");
    return;
  }

  if (!ensureWeekActionAllowed(selectedWeek, {
    actionLabel: "winkeldiensten slim te herverdelen",
    blockPlannerWhenLocked: true
  })) {
    return;
  }

  if (autoFillPreviewEntries.length) {
    showMessage("Pas eerst het automatische voorstel toe of annuleer het voordat je uren herverdeelt.", "error");
    return;
  }

  const weekDates = getWeekDates(selectedWeek);
  const weekShopSlots = weekDates
    .flatMap((day) =>
      getRequiredDayPlannerShifts(day)
        .filter((shift) => shift.isShopShift)
        .map((shift) => ({ day, shift }))
    )
    .sort((slotA, slotB) =>
      slotA.day.localeCompare(slotB.day) ||
      slotA.shift.startTime.localeCompare(slotB.shift.startTime) ||
      slotA.shift.name.localeCompare(slotB.shift.name, "nl")
    );

  if (!weekShopSlots.length) {
    showMessage("Voor deze week zijn geen winkeldiensten ingesteld.", "error");
    return;
  }

  const originalWeekShopEntries = entries.filter((entry) =>
    getWeekValueFromDate(entry.day) === selectedWeek &&
    isShopShiftName(getShiftName(entry))
  );
  const preservedEntries = entries.filter((entry) =>
    !(getWeekValueFromDate(entry.day) === selectedWeek && isShopShiftName(getShiftName(entry)))
  );
  const slotKeys = new Set(weekShopSlots.map(({ day, shift }) => `${day}__${shift.name.toLowerCase()}`));
  const preservedExtraShopEntries = originalWeekShopEntries.filter((entry) =>
    !slotKeys.has(`${entry.day}__${getShiftName(entry).toLowerCase()}`)
  );
  const rebalancedShopEntries = [];
  const originalEntryMap = new Map(
    originalWeekShopEntries.map((entry) => [`${entry.day}__${getShiftName(entry).toLowerCase()}`, entry])
  );
  let changedCount = 0;
  let keptCount = 0;
  let filledOpenCount = 0;
  let openedCount = 0;
  const workLogMoves = [];
  let movedWorkLogs = false;

  function getShopCandidateSnapshot(employeeName, shift, day, sourceEntries) {
    return {
      employeeName,
      patternTier: getAutoPlanningPatternTier(employeeName, shift, day, selectedWeek, sourceEntries),
      patternScore: getEmployeePlanningPatternMatch(employeeName, shift, day, selectedWeek, sourceEntries).score,
      contractPriority: getEmployeeContractPlanningPriority(employeeName, selectedWeek, sourceEntries),
      saturdayPriority: getEmployeeSaturdayPlanningPriority(employeeName, shift, day, selectedWeek, sourceEntries),
      preference: getEmployeeShiftPreference(employeeName, shift.name) || Number.MAX_SAFE_INTEGER,
      recentWeekdayCategoryCount: getEmployeeRecentWeekdayCategoryCount(employeeName, "shop", day, selectedWeek, sourceEntries),
      assignmentCount: getEmployeeWeekAssignmentCount(employeeName, selectedWeek, sourceEntries)
    };
  }

  function isBetterShopCandidate(nextCandidate, currentCandidate) {
    if (!currentCandidate) {
      return true;
    }

    const comparisonChain = [
      nextCandidate.patternTier - currentCandidate.patternTier,
      nextCandidate.patternScore - currentCandidate.patternScore,
      nextCandidate.contractPriority.tier - currentCandidate.contractPriority.tier,
      currentCandidate.contractPriority.gap - nextCandidate.contractPriority.gap,
      nextCandidate.saturdayPriority - currentCandidate.saturdayPriority,
      nextCandidate.preference - currentCandidate.preference,
      nextCandidate.recentWeekdayCategoryCount - currentCandidate.recentWeekdayCategoryCount,
      nextCandidate.assignmentCount - currentCandidate.assignmentCount
    ];

    return comparisonChain.find((value) => value !== 0) < 0;
  }

  weekShopSlots.forEach(({ day, shift }) => {
    const slotKey = `${day}__${shift.name.toLowerCase()}`;
    const existingEntry = originalEntryMap.get(slotKey) || null;
    const sourceEntries = [...preservedEntries, ...preservedExtraShopEntries, ...rebalancedShopEntries];
    const candidateEmployees = getAutoFillCandidateEmployees(shift, day, sourceEntries, selectedWeek, {
      preferredEmployees: existingEntry?.name ? [existingEntry.name] : [],
      enforceSingleShiftPerDay: true,
      enforceRosterPattern: true
    });
    const employeeName = candidateEmployees[0] || "";

    if (!employeeName) {
      if (existingEntry) {
        openedCount += 1;
      }
      return;
    }

    let chosenEmployeeName = employeeName;

    if (
      existingEntry &&
      isEmployeeAuthorizedForShift(existingEntry.name, shift.name) &&
      canEmployeeBeAutoAssigned(existingEntry.name, shift, day, sourceEntries, { enforceSingleShiftPerDay: true }) &&
      canEmployeeBeAutoPlannedWithinPattern(existingEntry.name, shift, day, selectedWeek, sourceEntries)
    ) {
      const currentCandidate = getShopCandidateSnapshot(existingEntry.name, shift, day, sourceEntries);
      const nextCandidate = getShopCandidateSnapshot(employeeName, shift, day, sourceEntries);
      const topTwoCandidates = candidateEmployees.slice(0, 2);
      const currentIsStrongEnough =
        topTwoCandidates.includes(existingEntry.name) ||
        (
          currentCandidate.patternScore < 55 &&
          currentCandidate.contractPriority.gap >= -2 &&
          currentCandidate.saturdayPriority <= nextCandidate.saturdayPriority + 8
        );

      if (currentIsStrongEnough || !isBetterShopCandidate(nextCandidate, currentCandidate)) {
        chosenEmployeeName = existingEntry.name;
      }
    }

    const nextEntry = {
      name: chosenEmployeeName,
      day,
      startTime: shift.startTime,
      endTime: shift.endTime,
      hours: calculateHours(shift.startTime, shift.endTime) || 0,
      shiftId: "",
      shiftName: shift.name,
      replacementFor: "",
      proposed: false,
      autoFillReason: "",
      autoFillReasonDetail: ""
    };

    if (existingEntry) {
      if (
        existingEntry.name === nextEntry.name &&
        existingEntry.startTime === nextEntry.startTime &&
        existingEntry.endTime === nextEntry.endTime
      ) {
        keptCount += 1;
      } else {
        changedCount += 1;
      }

      workLogMoves.push({
        previousEntry: { ...existingEntry },
        nextEntry: { ...nextEntry }
      });
    } else {
      filledOpenCount += 1;
    }

    rebalancedShopEntries.push(nextEntry);
  });

  if (!changedCount && !filledOpenCount && !openedCount) {
    render();
    showMessage("De winkeldiensten staan al logisch verdeeld voor deze week.", "success");
    return;
  }

  setUndoState("Slim herplannen winkeldiensten");
  entries.splice(0, entries.length, ...preservedEntries, ...preservedExtraShopEntries, ...rebalancedShopEntries);
  saveEntries();

  workLogMoves.forEach(({ previousEntry, nextEntry }) => {
    if (moveWorkLogToEntry(previousEntry, nextEntry)) {
      movedWorkLogs = true;
    }
  });

  if (movedWorkLogs) {
    saveWorkLogs();
  }

  persistProtectedChange({
    reason: `Winkeldiensten slim herpland: ${selectedWeek}`,
    scope: "roster",
    action: "roster-shop-hours-replanned",
    message: `Winkeldiensten slim herpland voor ${selectedWeek}.`,
    details: {
      weekValue: selectedWeek,
      changedCount,
      keptCount,
      filledOpenCount,
      openedCount,
      preservedExtraShopEntries: preservedExtraShopEntries.length
    }
  });

  render();
  showMessage(
    `Winkeldiensten slim herpland. ${changedCount} gewijzigd, ${filledOpenCount} open plek(ken) gevuld en ${openedCount} dienst(en) open gelaten.`,
    "success"
  );
}

function rebalanceMonthlyBalanceForWeek() {
  const selectedWeek = weekFilterInput.value || weekInput.value;

  if (!selectedWeek) {
    showMessage("Kies eerst een week om de maandbalans te herstellen.", "error");
    return;
  }

  if (!ensureWeekActionAllowed(selectedWeek, {
    actionLabel: "de maandbalans te herstellen",
    blockPlannerWhenLocked: true
  })) {
    return;
  }

  if (autoFillPreviewEntries.length) {
    showMessage("Pas eerst het automatische voorstel toe of annuleer het voordat je de maandbalans herstelt.", "error");
    return;
  }

  const weekDates = getWeekDates(selectedWeek);
  const weekShopSlots = weekDates
    .flatMap((day) =>
      getRequiredDayPlannerShifts(day)
        .filter((shift) => shift.isShopShift)
        .map((shift) => ({ day, shift }))
    )
    .sort((slotA, slotB) =>
      slotA.day.localeCompare(slotB.day) ||
      slotA.shift.startTime.localeCompare(slotB.shift.startTime) ||
      slotA.shift.name.localeCompare(slotB.shift.name, "nl")
    );

  if (!weekShopSlots.length) {
    showMessage("Voor deze week zijn geen winkeldiensten ingesteld.", "error");
    return;
  }

  const originalWeekShopEntries = entries.filter((entry) =>
    getWeekValueFromDate(entry.day) === selectedWeek &&
    isShopShiftName(getShiftName(entry))
  );
  const preservedEntries = entries.filter((entry) =>
    !(getWeekValueFromDate(entry.day) === selectedWeek && isShopShiftName(getShiftName(entry)))
  );
  const slotKeys = new Set(weekShopSlots.map(({ day, shift }) => `${day}__${shift.name.toLowerCase()}`));
  const preservedExtraShopEntries = originalWeekShopEntries.filter((entry) =>
    !slotKeys.has(`${entry.day}__${getShiftName(entry).toLowerCase()}`)
  );
  const rebalancedShopEntries = [];
  const originalEntryMap = new Map(
    originalWeekShopEntries.map((entry) => [`${entry.day}__${getShiftName(entry).toLowerCase()}`, entry])
  );
  let changedCount = 0;
  let keptCount = 0;
  let filledOpenCount = 0;
  let openedCount = 0;
  const workLogMoves = [];
  let movedWorkLogs = false;

  function getMonthlyShopCandidateSnapshot(employeeName, shift, day, sourceEntries) {
    return {
      employeeName,
      patternTier: getAutoPlanningPatternTier(employeeName, shift, day, selectedWeek, sourceEntries),
      patternScore: getEmployeePlanningPatternMatch(employeeName, shift, day, selectedWeek, sourceEntries).score,
      monthlyContractPriority: getEmployeeMonthlyContractPlanningPriority(employeeName, day, sourceEntries),
      weeklyContractPriority: getEmployeeContractPlanningPriority(employeeName, selectedWeek, sourceEntries),
      saturdayPriority: getEmployeeSaturdayPlanningPriority(employeeName, shift, day, selectedWeek, sourceEntries),
      monthlyPatternDeviationCount: getEmployeeMonthlyPatternDeviationCount(employeeName, day, sourceEntries),
      preference: getEmployeeShiftPreference(employeeName, shift.name) || Number.MAX_SAFE_INTEGER,
      recentWeekdayCategoryCount: getEmployeeRecentWeekdayCategoryCount(employeeName, "shop", day, selectedWeek, sourceEntries),
      assignmentCount: getEmployeeWeekAssignmentCount(employeeName, selectedWeek, sourceEntries)
    };
  }

  function isBetterMonthlyBalanceCandidate(nextCandidate, currentCandidate) {
    if (!currentCandidate) {
      return true;
    }

    const comparisonChain = [
      nextCandidate.patternTier - currentCandidate.patternTier,
      nextCandidate.patternScore - currentCandidate.patternScore,
      nextCandidate.monthlyContractPriority.tier - currentCandidate.monthlyContractPriority.tier,
      currentCandidate.monthlyContractPriority.gap - nextCandidate.monthlyContractPriority.gap,
      nextCandidate.weeklyContractPriority.tier - currentCandidate.weeklyContractPriority.tier,
      currentCandidate.weeklyContractPriority.gap - nextCandidate.weeklyContractPriority.gap,
      nextCandidate.saturdayPriority - currentCandidate.saturdayPriority,
      nextCandidate.monthlyPatternDeviationCount - currentCandidate.monthlyPatternDeviationCount,
      nextCandidate.preference - currentCandidate.preference,
      nextCandidate.recentWeekdayCategoryCount - currentCandidate.recentWeekdayCategoryCount,
      nextCandidate.assignmentCount - currentCandidate.assignmentCount
    ];

    return comparisonChain.find((value) => value !== 0) < 0;
  }

  weekShopSlots.forEach(({ day, shift }) => {
    const slotKey = `${day}__${shift.name.toLowerCase()}`;
    const existingEntry = originalEntryMap.get(slotKey) || null;
    const sourceEntries = [...preservedEntries, ...preservedExtraShopEntries, ...rebalancedShopEntries];
    const candidateEmployees = getAutoFillCandidateEmployees(shift, day, sourceEntries, selectedWeek, {
      preferredEmployees: existingEntry?.name ? [existingEntry.name] : [],
      enforceSingleShiftPerDay: true,
      enforceRosterPattern: true
    });
    const employeeName = candidateEmployees[0] || "";

    if (!employeeName) {
      if (existingEntry) {
        openedCount += 1;
      }
      return;
    }

    let chosenEmployeeName = employeeName;

    if (
      existingEntry &&
      isEmployeeAuthorizedForShift(existingEntry.name, shift.name) &&
      canEmployeeBeAutoAssigned(existingEntry.name, shift, day, sourceEntries, { enforceSingleShiftPerDay: true }) &&
      canEmployeeBeAutoPlannedWithinPattern(existingEntry.name, shift, day, selectedWeek, sourceEntries)
    ) {
      const currentCandidate = getMonthlyShopCandidateSnapshot(existingEntry.name, shift, day, sourceEntries);
      const nextCandidate = getMonthlyShopCandidateSnapshot(employeeName, shift, day, sourceEntries);
      const topThreeCandidates = candidateEmployees.slice(0, 3);
      const currentIsStableEnough =
        topThreeCandidates.includes(existingEntry.name) ||
        (
          currentCandidate.patternScore < 55 &&
          currentCandidate.monthlyContractPriority.gap >= nextCandidate.monthlyContractPriority.gap - 4 &&
          currentCandidate.saturdayPriority <= nextCandidate.saturdayPriority + 10 &&
          currentCandidate.monthlyPatternDeviationCount <= nextCandidate.monthlyPatternDeviationCount + 1
        );

      if (currentIsStableEnough || !isBetterMonthlyBalanceCandidate(nextCandidate, currentCandidate)) {
        chosenEmployeeName = existingEntry.name;
      }
    }

    const nextEntry = {
      name: chosenEmployeeName,
      day,
      startTime: shift.startTime,
      endTime: shift.endTime,
      hours: calculateHours(shift.startTime, shift.endTime) || 0,
      shiftId: "",
      shiftName: shift.name,
      replacementFor: "",
      proposed: false,
      autoFillReason: "",
      autoFillReasonDetail: ""
    };

    if (existingEntry) {
      nextEntry.autoFillReason = existingEntry.autoFillReason || "";
      nextEntry.autoFillReasonDetail = existingEntry.autoFillReasonDetail || "";

      if (existingEntry.name === chosenEmployeeName) {
        keptCount += 1;
      } else {
        nextEntry.autoFillReason = "Maandbalans hersteld";
        nextEntry.autoFillReasonDetail = `${chosenEmployeeName} sluit beter aan op contracturen, zaterdagverdeling of vaste patronen in ${getMonthKeyFromDate(day)}.`;
        changedCount += 1;
      }

      workLogMoves.push({
        previousEntry: { ...existingEntry },
        nextEntry: { ...nextEntry }
      });
    } else {
      nextEntry.autoFillReason = "Maandbalans hersteld";
      nextEntry.autoFillReasonDetail = `${chosenEmployeeName} helpt de maandbalans beter in evenwicht te houden.`;
      filledOpenCount += 1;
    }

    rebalancedShopEntries.push(nextEntry);
  });

  if (!changedCount && !filledOpenCount && !openedCount) {
    render();
    showMessage("De maandbalans van de winkeldiensten is al logisch voor deze week.", "success");
    return;
  }

  setUndoState("Maandbalans winkeldiensten herstellen");
  entries.splice(0, entries.length, ...preservedEntries, ...preservedExtraShopEntries, ...rebalancedShopEntries);
  saveEntries();

  workLogMoves.forEach(({ previousEntry, nextEntry }) => {
    if (moveWorkLogToEntry(previousEntry, nextEntry)) {
      movedWorkLogs = true;
    }
  });

  if (movedWorkLogs) {
    saveWorkLogs();
  }

  persistProtectedChange({
    reason: `Maandbalans winkeldiensten hersteld: ${selectedWeek}`,
    scope: "roster",
    action: "roster-shop-month-balance-replanned",
    message: `Maandbalans winkeldiensten hersteld voor ${selectedWeek}.`,
    details: {
      weekValue: selectedWeek,
      changedCount,
      keptCount,
      filledOpenCount,
      openedCount,
      preservedExtraShopEntries: preservedExtraShopEntries.length
    }
  });

  render();
  showMessage(
    `Maandbalans hersteld voor winkeldiensten. ${changedCount} gewijzigd, ${filledOpenCount} open plek(ken) gevuld en ${openedCount} dienst(en) open gelaten.`,
    "success"
  );
}

function renderWeekStatusOverview(weekDates) {
  if (!weekStatusOverview) {
    return;
  }

  setClassName(weekStatusOverview, "week-status-overview");
  weekStatusOverview.innerHTML = weekDates.map((day) => {
    const message = getDayPlanningMessage(day);
    const cardClass = message.type === "full"
      ? "is-complete"
      : message.type === "closed"
        ? "is-neutral"
        : "is-alert";

    return `
      <article class="week-status-card ${cardClass}">
        <strong>${formatWeekday(day)}</strong>
        <span>${message.text}</span>
      </article>
    `;
  }).join("");
}

function getShiftSummaryLabel(shiftName, dateValue, startTime, endTime, employeeName = "") {
  return getShiftSummaryLabelHelper(formatWeekday, shiftName, dateValue, startTime, endTime, employeeName);
}

function getPreviewShiftForEntry(entry) {
  return {
    id: entry.shiftId || "",
    name: getShiftName(entry),
    startTime: entry.startTime,
    endTime: entry.endTime,
    isShopShift: isShopShiftName(getShiftName(entry)),
    isAllroundShift: isAllroundShiftName(getShiftName(entry))
  };
}

function getComparableCandidatesForPreviewEntry(entry, plannedEntries) {
  const comparableEntries = plannedEntries.filter((candidateEntry) =>
    !(
      candidateEntry.name === entry.name &&
      candidateEntry.day === entry.day &&
      candidateEntry.startTime === entry.startTime &&
      candidateEntry.endTime === entry.endTime &&
      getShiftName(candidateEntry).toLowerCase() === getShiftName(entry).toLowerCase()
    )
  );

  return getAutoFillCandidateEmployees(
    getPreviewShiftForEntry(entry),
    entry.day,
    comparableEntries,
    getWeekValueFromDate(entry.day),
    {
      excludedEmployees: entry.replacementFor ? [entry.replacementFor] : [],
      enforceSingleShiftPerDay: true
    }
  );
}

function getAutoFillQualityData(selectedWeek, previewEntries, plannedEntries, openShifts, replacementEntries) {
  const qualityRelevantEntries = previewEntries.filter((entry) => {
    const shiftName = getShiftName(entry);
    return isShopShiftName(shiftName) || isAllroundShiftName(shiftName) || Boolean(entry.replacementFor);
  });
  const nonFirstPreferenceCount = qualityRelevantEntries.filter((entry) => {
    const candidates = getComparableCandidatesForPreviewEntry(entry, plannedEntries);
    if (!candidates.length) {
      return false;
    }

    return candidates[0] !== entry.name;
  }).length;
  const autoFilledEmployees = [...new Set(previewEntries.map((entry) => entry.name))];
  const employeeHours = autoFilledEmployees.map((employeeName) => getEmployeeWeekHours(employeeName, selectedWeek, plannedEntries));
  const minHours = employeeHours.length ? Math.min(...employeeHours) : 0;
  const maxHours = employeeHours.length ? Math.max(...employeeHours) : 0;
  const hourRange = Math.max(0, maxHours - minHours);
  const requiredShiftCount = previewEntries.length + openShifts.length;

  const completenessScore = requiredShiftCount > 0
    ? Math.round(((requiredShiftCount - openShifts.length) / requiredShiftCount) * 50)
    : 50;
  const preferenceScore = qualityRelevantEntries.length > 0
    ? Math.max(0, Math.round(((qualityRelevantEntries.length - nonFirstPreferenceCount) / qualityRelevantEntries.length) * 20))
    : 20;
  const fairnessScore = Math.max(0, 20 - Math.min(20, Math.round(hourRange * 1.2)));
  const replacementScore = Math.max(0, 10 - Math.min(10, replacementEntries.length * 2));
  const score = Math.max(0, Math.min(100, completenessScore + preferenceScore + fairnessScore + replacementScore));

  const tips = [];

  if (openShifts.length > 0) {
    tips.push(`${openShifts.length} dienst${openShifts.length === 1 ? "" : "en"} nog open`);
  }

  if (nonFirstPreferenceCount > 0) {
    tips.push(`${nonFirstPreferenceCount}x niet eerste voorkeur gebruikt`);
  }

  if (replacementEntries.length > 0) {
    tips.push(`${replacementEntries.length} vervanging${replacementEntries.length === 1 ? "" : "en"} gebruikt`);
  }

  if (hourRange >= 6) {
    tips.push(`urenverdeling verschilt ${hourRange.toFixed(1).replace(".", ",")} uur`);
  }

  if (!tips.length) {
    tips.push("voorkeuren en urenverdeling zijn goed in balans");
  }

  let explanation = "Sterk voorstel met weinig aandachtspunten.";

  if (score < 60) {
    explanation = "Dit voorstel vraagt nog duidelijke aandacht voordat je het toepast.";
  } else if (score < 80) {
    explanation = "Goed voorstel, maar een paar punten verdienen nog controle.";
  }

  return {
    score,
    explanation,
    tips,
    openShiftCount: openShifts.length,
    nonFirstPreferenceCount,
    replacementCount: replacementEntries.length,
    hourRange
  };
}

function renderAutoFillSummaryOverview(selectedWeek) {
  if (!autoFillSummaryOverview) {
    return;
  }

  if (!autoFillPreviewEntries.length || !selectedWeek) {
    setClassName(autoFillSummaryOverview, "auto-fill-summary-overview hidden");
    autoFillSummaryOverview.innerHTML = "";
    return;
  }

  const previewEntries = autoFillPreviewEntries
    .filter((entry) => getWeekValueFromDate(entry.day) === selectedWeek)
    .sort((entryA, entryB) =>
      entryA.day.localeCompare(entryB.day) ||
      entryA.startTime.localeCompare(entryB.startTime) ||
      getShiftName(entryA).localeCompare(getShiftName(entryB), "nl")
    );
  const plannedEntries = [...entries, ...previewEntries];
  const weekDates = getWeekDates(selectedWeek).filter((day) => getShopCoverageForDate(day).status !== "closed");
  const openShifts = weekDates.flatMap((day) =>
    getRequiredDayPlannerShifts(day)
      .filter((shift) => !getEntryForShiftOnDate(day, shift, plannedEntries))
      .map((shift) => ({ day, shift }))
  );
  const replacementEntries = previewEntries.filter((entry) => entry.replacementFor);
  const qualityData = getAutoFillQualityData(selectedWeek, previewEntries, plannedEntries, openShifts, replacementEntries);

  const renderList = (items, formatter, emptyText) => {
    if (!items.length) {
      return `<div class="auto-fill-summary-empty">${emptyText}</div>`;
    }

    const visibleItems = items.slice(0, 6);
    const extraCount = items.length - visibleItems.length;

    return `
      <ul class="auto-fill-summary-list">
        ${visibleItems.map((item) => `<li>${formatter(item)}</li>`).join("")}
      </ul>
      ${extraCount > 0 ? `<div class="auto-fill-summary-more">+${extraCount} meer</div>` : ""}
    `;
  };

  setClassName(autoFillSummaryOverview, "auto-fill-summary-overview");
  autoFillSummaryOverview.innerHTML = `
    <section class="auto-fill-summary-card is-quality">
      <div class="auto-fill-summary-quality-top">
        <div class="auto-fill-summary-score">${qualityData.score}%</div>
        <div class="auto-fill-summary-quality-copy">
          <strong>Planning kwaliteit</strong>
          <span>${qualityData.explanation}</span>
        </div>
      </div>
      <div class="auto-fill-summary-quality-tips">
        ${qualityData.tips.map((tip) => `<span class="auto-fill-tip">${tip}</span>`).join("")}
      </div>
    </section>
    <section class="auto-fill-summary-card is-filled">
      <div class="auto-fill-summary-head">
        <strong>Automatisch gevuld</strong>
        <span>${previewEntries.length}</span>
      </div>
      ${renderList(
        previewEntries,
        (entry) => getShiftSummaryLabel(getShiftName(entry), entry.day, entry.startTime, entry.endTime, entry.name),
        "Nog geen automatisch ingevulde diensten."
      )}
    </section>
    <section class="auto-fill-summary-card is-open">
      <div class="auto-fill-summary-head">
        <strong>Nog open</strong>
        <span>${openShifts.length}</span>
      </div>
      ${renderList(
        openShifts,
        ({ day, shift }) => getShiftSummaryLabel(shift.name, day, shift.startTime, shift.endTime),
        "Geen open diensten over."
      )}
    </section>
    <section class="auto-fill-summary-card is-replacement">
      <div class="auto-fill-summary-head">
        <strong>Vervangingen</strong>
        <span>${replacementEntries.length}</span>
      </div>
      ${renderList(
        replacementEntries,
        (entry) => `${formatWeekday(entry.day)}: ${getShiftName(entry)} - normaal ${entry.replacementFor}, nu ${entry.name}`,
        "Geen vervangingen gebruikt."
      )}
    </section>
    <section class="auto-fill-summary-card is-warning">
      <div class="auto-fill-summary-head">
        <strong>Geen geschikte medewerker</strong>
        <span>${openShifts.length}</span>
      </div>
      ${renderList(
        openShifts,
        ({ day, shift }) => getShiftSummaryLabel(shift.name, day, shift.startTime, shift.endTime),
        "Alles kon automatisch worden ingevuld."
      )}
    </section>
  `;
}

function renderPlannerContractOverview(selectedWeek, visibleEntries) {
  if (!plannerContractOverview) {
    return;
  }

  if (!isPlannerRole() || !(activeTab === "week-current" || activeTab === "week-next")) {
    setClassName(plannerContractOverview, "planner-contract-overview hidden");
    plannerContractOverview.innerHTML = "";
    return;
  }

  const {
    monthKey,
    contractEmployees,
    saturdayCheckEmployees,
    underEmployees,
    onTrackEmployees,
    overEmployees,
    balanceTips,
    monthlyWarnings,
    monthlyOverviewEmployees
  } = buildPlannerContractOverviewData(selectedWeek, visibleEntries);

  if (!contractEmployees.length) {
    setClassName(plannerContractOverview, "planner-contract-overview hidden");
    plannerContractOverview.innerHTML = "";
    return;
  }

  setClassName(plannerContractOverview, "planner-contract-overview");
  plannerContractOverview.innerHTML = `
    <div class="planner-contract-card">
      <strong>Contracturen medewerkers met vast contract</strong>
      <div class="planner-contract-balance">
        <span class="planner-contract-balance-item is-under">Te laag ${underEmployees.length}</span>
        <span class="planner-contract-balance-item is-match">Op schema ${onTrackEmployees.length}</span>
        <span class="planner-contract-balance-item is-over">Te hoog ${overEmployees.length}</span>
      </div>
      ${balanceTips.length
        ? `<div class="planner-contract-tips">
            ${balanceTips.map((tip) => `<span class="planner-contract-tip">${tip}</span>`).join("")}
          </div>`
        : ""}
      ${monthlyWarnings.length
        ? `<div class="planner-contract-warning-block">
            <strong>Maandwaarschuwingen ${monthKey}</strong>
            <div class="planner-contract-tips">
              ${monthlyWarnings.map((warning) => `<span class="planner-contract-tip ${warning.stateClass}">${warning.text}</span>`).join("")}
            </div>
          </div>`
        : ""}
      <div class="planner-contract-grid">
        ${contractEmployees.map((employee) => `
          <div class="planner-contract-item ${employee.stateClass}" data-contract-employee="${employee.employeeName}">
            <span class="planner-contract-name">${employee.employeeName}</span>
            <div class="planner-contract-metrics">
              <span class="planner-contract-hours">Contract ${formatHours(employee.contractHours)}</span>
              <span class="planner-contract-hours">Gepland ${formatHours(employee.plannedHours)}</span>
              <span class="planner-contract-diff">${employee.remainingHours === 0 ? "Resterend 0,00 uur" : `Resterend ${employee.remainingHours > 0 ? "" : "-"}${formatHours(Math.abs(employee.remainingHours))}`}</span>
              <span class="planner-contract-hours">Maand ${formatHours(employee.plannedMonthHours)} / ${formatHours(employee.monthlyTargetHours)}</span>
            </div>
          </div>
        `).join("")}
      </div>
      ${monthlyOverviewEmployees.length ? `
        <div class="planner-contract-month-check">
          <strong>Maandoverzicht ${monthKey}</strong>
          <div class="planner-contract-grid">
            ${monthlyOverviewEmployees.map((employee) => `
              <div class="planner-contract-item ${employee.stateClass}" data-contract-employee="${employee.employeeName}">
                <span class="planner-contract-name">${employee.employeeName}</span>
                <div class="planner-contract-metrics">
                  <span class="planner-contract-hours">Contract ${formatHours(employee.contractHours)}</span>
                  <span class="planner-contract-hours">Gepland ${formatHours(employee.plannedHours)}</span>
                  <span class="planner-contract-diff">${employee.difference === 0 ? "Verschil 0,00 uur" : `Verschil ${employee.difference > 0 ? "+" : "-"}${formatHours(Math.abs(employee.difference))}`}</span>
                  <span class="planner-contract-hours">Za gewerkt ${employee.workedSaturdays}</span>
                  <span class="planner-contract-hours">Za vrij ${employee.freeSaturdays}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}
      ${saturdayCheckEmployees.length ? `
        <div class="planner-contract-month-check">
          <strong>Zaterdagcontrole ${saturdayCheckEmployees[0]?.monthKey || ""}</strong>
          <div class="planner-contract-grid">
            ${saturdayCheckEmployees.map((employee) => `
              <div class="planner-contract-item ${employee.stateClass}" data-contract-employee="${employee.employeeName}">
                <span class="planner-contract-name">${employee.employeeName}</span>
                <div class="planner-contract-metrics">
                  <span class="planner-contract-hours">Za gewerkt ${employee.workedSaturdays}</span>
                  <span class="planner-contract-hours">Za vrij ${employee.freeSaturdays}</span>
                  <span class="planner-contract-diff">Totaal ${employee.totalSaturdays}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}
    </div>
  `;
}

function getDeviationReasonSummary(entry) {
  return getDeviationReasonSummaryHelper(entry, {
    getEmployeePlanningPatternMatch,
    getShiftForEntry,
    getShiftName,
    getWeekValueFromDate
  });
}

function hasMeaningfulPlannerDeviation(entry) {
  return hasMeaningfulPlannerDeviationHelper(entry, {
    getEmployeePlanningPatternMatch,
    getShiftForEntry,
    getShiftName,
    getWeekValueFromDate
  });
}

function getDeviationOnlyEntries(visibleEntries, weekDates) {
  return getDeviationOnlyEntriesHelper(visibleEntries, weekDates, {
    hasMeaningfulPlannerDeviation
  });
}

function renderDeviationWhyOverview(selectedWeek, visibleEntries) {
  if (!deviationWhyOverview) {
    return;
  }

  if (!isPlannerRole() || !(activeTab === "week-current" || activeTab === "week-next")) {
    setClassName(deviationWhyOverview, "deviation-why-overview hidden");
    deviationWhyOverview.innerHTML = "";
    return;
  }

  const weekDates = getWeekDates(selectedWeek);
  const deviationEntries = visibleEntries
    .filter((entry) => weekDates.includes(entry.day))
    .map((entry) => ({
      entry,
      reasons: getDeviationReasonSummary(entry)
    }))
    .filter(({ reasons }) => reasons.length > 0)
    .sort(({ entry: entryA }, { entry: entryB }) =>
      entryA.day.localeCompare(entryB.day) ||
      entryA.startTime.localeCompare(entryB.startTime) ||
      getShiftName(entryA).localeCompare(getShiftName(entryB), "nl") ||
      entryA.name.localeCompare(entryB.name, "nl")
    );

  if (!deviationEntries.length) {
    setClassName(deviationWhyOverview, "deviation-why-overview hidden");
    deviationWhyOverview.innerHTML = "";
    return;
  }

  const visibleDeviationEntries = deviationEntries.slice(0, 8);
  const extraCount = deviationEntries.length - visibleDeviationEntries.length;

  setClassName(deviationWhyOverview, "deviation-why-overview");
  deviationWhyOverview.innerHTML = `
    <div class="deviation-why-card">
      <strong>Waarom afwijken?</strong>
      <div class="deviation-why-list">
        ${visibleDeviationEntries.map(({ entry, reasons }) => `
          <div class="deviation-why-item">
            <span class="deviation-why-shift">${formatWeekday(entry.day)} - ${getShiftName(entry)}</span>
            <span class="deviation-why-employee">${entry.name}</span>
                      <span class="deviation-why-reason">${reasons.join(" · ")}</span>
          </div>
        `).join("")}
      </div>
      ${extraCount > 0 ? `<div class="deviation-why-more">+${extraCount} meer</div>` : ""}
    </div>
  `;
}

function getShiftTargetAttributes(shiftLike, day) {
  const shift = shiftLike && typeof shiftLike === "object"
    ? shiftLike
    : {
      id: "",
      name: "",
      startTime: "",
      endTime: ""
    };
  const shiftId = shift.id || shift.shiftId || shift.name || "";
  return `data-target-kind="shift" data-target-day="${day}" data-target-shift="${shiftId}"`;
}

function renderPlannerControlItems(items, emptyLabel = "Geen aandachtspunten") {
  if (!items.length) {
    return `<div class="planner-control-empty">${emptyLabel}</div>`;
  }

  return `
    <div class="planner-control-items">
      ${items.map((item) => `
        <button
          type="button"
          class="planner-control-item ${item.stateClass || ""}"
          ${item.targetKind === "employee"
            ? `data-target-kind="employee" data-target-employee="${item.employeeName || ""}"`
            : getShiftTargetAttributes(item.shift || item.entry || {}, item.day || item.entry?.day || "")}
        >
          <strong>${item.title}</strong>
          <span>${item.detail}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function renderPlannerControlPanel(selectedWeek, visibleEntries) {
  if (!plannerControlPanel) {
    return;
  }

  if (!isPlannerRole() || !(activeTab === "week-current" || activeTab === "week-next")) {
    setClassName(plannerControlPanel, "planner-control-panel hidden");
    plannerControlPanel.innerHTML = "";
    return;
  }

  const weekDates = getWeekDates(selectedWeek);
  const {
    contractEmployees,
    saturdayCheckEmployees,
    underEmployees,
    overEmployees
  } = buildPlannerContractOverviewData(selectedWeek, visibleEntries);
  const openShiftItems = weekDates
    .flatMap((day) =>
      getRequiredDayPlannerShifts(day)
        .filter((shift) => !getEntryForShiftOnDate(day, shift))
        .map((shift) => ({
          title: `${formatWeekday(day)} - ${shift.name}`,
          detail: "Nog open",
          day,
          shift,
          stateClass: "is-open"
        }))
    )
    .slice(0, 6);
  const replacementItems = visibleEntries
    .filter((entry) => weekDates.includes(entry.day) && entry.replacementFor)
    .sort((entryA, entryB) =>
      entryA.day.localeCompare(entryB.day) ||
      entryA.startTime.localeCompare(entryB.startTime)
    )
    .slice(0, 6)
    .map((entry) => ({
      title: `${formatWeekday(entry.day)} - ${getShiftName(entry)}`,
      detail: `${entry.replacementFor} -> ${entry.name}`,
      day: entry.day,
      entry,
      stateClass: "is-replacement"
    }));
  const deviationItems = getDeviationOnlyEntries(visibleEntries, weekDates)
    .sort((entryA, entryB) =>
      entryA.day.localeCompare(entryB.day) ||
      entryA.startTime.localeCompare(entryB.startTime)
    )
    .slice(0, 6)
    .map((entry) => ({
      title: `${formatWeekday(entry.day)} - ${getShiftName(entry)}`,
      detail: getDeviationReasonSummary(entry).join(" · "),
      day: entry.day,
      entry,
      stateClass: "is-deviation"
    }));
  const underContractItems = underEmployees
    .sort((employeeA, employeeB) => employeeB.remainingHours - employeeA.remainingHours)
    .slice(0, 5)
    .map((employee) => ({
      title: employee.employeeName,
      detail: `${formatHours(employee.remainingHours)} te weinig`,
      employeeName: employee.employeeName,
      targetKind: "employee",
      stateClass: "is-under"
    }));
  const overContractItems = overEmployees
    .sort((employeeA, employeeB) => employeeB.difference - employeeA.difference)
    .slice(0, 5)
    .map((employee) => ({
      title: employee.employeeName,
      detail: `${formatHours(employee.difference)} te veel`,
      employeeName: employee.employeeName,
      targetKind: "employee",
      stateClass: "is-over"
    }));
  const bakeryContractItems = getBakeryContractEmployeeNames()
    .map((employeeName) => contractEmployees.find((employee) => employee.employeeName === employeeName))
    .filter(Boolean)
    .map((employee) => ({
      title: employee.employeeName,
      detail: `Contract ${formatHours(employee.contractHours)} · Gepland ${formatHours(employee.plannedHours)} · ${employee.difference === 0 ? "Op schema" : `${employee.difference > 0 ? "+" : "-"}${formatHours(Math.abs(employee.difference))}`}`,
      employeeName: employee.employeeName,
      targetKind: "employee",
      stateClass: employee.stateClass
    }));
  const saturdayWarningItems = saturdayCheckEmployees
    .filter((employee) => employee.stateClass !== "is-match")
    .slice(0, 5)
    .map((employee) => ({
      title: employee.employeeName,
      detail: employee.employeeName === "Gerry"
        ? `${employee.workedSaturdays} zaterdag(en) gewerkt`
        : `${employee.freeSaturdays} zaterdag(en) vrij`,
      employeeName: employee.employeeName,
      targetKind: "employee",
      stateClass: employee.stateClass
    }));
  const sections = [
    {
      title: "Open diensten",
      items: openShiftItems
    },
    {
      title: "Vervangingen",
      items: replacementItems
    },
    {
      title: "Afwijkingen",
      items: deviationItems
    },
    {
      title: "Bakkerij contracturen",
      items: bakeryContractItems
    },
    {
      title: "Onder contracturen",
      items: underContractItems
    },
    {
      title: "Boven contracturen",
      items: overContractItems
    },
    {
      title: "Zaterdagwaarschuwingen",
      items: saturdayWarningItems
    }
  ].filter((section) => section.items.length > 0);

  if (!sections.length) {
    setClassName(plannerControlPanel, "planner-control-panel hidden");
    plannerControlPanel.innerHTML = "";
    return;
  }

  setClassName(plannerControlPanel, "planner-control-panel");
  plannerControlPanel.innerHTML = `
    <div class="planner-control-card">
      <strong>Controlepaneel</strong>
      <div class="planner-control-grid">
        ${sections.map((section) => `
          <section class="planner-control-section">
            <div class="planner-control-section-title">
              <span>${section.title}</span>
              <strong>${section.items.length}</strong>
            </div>
            ${renderPlannerControlItems(section.items)}
          </section>
        `).join("")}
      </div>
    </div>
  `;
}

function getSchedulePlanningWeekData(weekValue, sourceEntries = entries) {
  return getSchedulePlanningWeekDataHelper(weekValue, {
    sourceEntries,
    entries,
    getWeekDates,
    getWeekValueFromDate,
    getShiftName,
    getShopCoverageForDate,
    getRequiredDayPlannerShifts,
    getEntryForShiftOnDate,
    getDeviationOnlyEntries,
    getRecognizedSpecialDayInfo,
    getEmployeesWithFavoritesFirst,
    getActiveEmployees,
    getEmployeeContractHours,
    getEmployeeWeekHours,
    getPlanningOverviewStatus,
    formatPlanningWeekPeriod,
    formatWeekday,
    getDeviationReasonSummary,
    formatHours
  });
}

function openSpecificWeekInRoster(weekValue) {
  activeTab = "week-current";
  weekFilterInput.value = weekValue;
  weekInput.value = weekValue;
  hoursWeekInput.value = weekValue;
  updateTabVisibility();
  resetTabScrollPosition();
  updateWeekViewTitle();
  render();
}

function autoPlanWeeksDirectly(weekValues, {
  summaryLabel = "weken automatisch geroosterd"
} = {}) {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan automatisch roosteren.", "error");
    return { changedWeeks: 0, proposedEntries: 0 };
  }

  const normalizedWeeks = [...new Set(weekValues.filter((weekValue) => /^\d{4}-W\d{2}$/.test(String(weekValue || ""))))];
  const eligibleWeeks = normalizedWeeks.filter((weekValue) => getWeekReviewStatus(weekValue) !== "locked");

  if (!eligibleWeeks.length) {
    showMessage("Geen open weken om te roosteren.", "warning");
    return { changedWeeks: 0, proposedEntries: 0 };
  }

  setUndoState(eligibleWeeks.length === 1 ? `Week automatisch geroosterd: ${eligibleWeeks[0]}` : "Maand automatisch roosteren");
  clearAutoFillPreview();

  let workingEntries = [...entries];
  let totalProposed = 0;
  let changedWeeks = 0;
  let remainingOpenTotal = 0;

  eligibleWeeks.forEach((weekValue) => {
    setWeekReviewStatus(weekValue, "open", { save: false });
    const {
      proposedEntries,
      workingEntries: nextEntries,
      remainingOpenCount
    } = buildAutoFillProposalForWeek(weekValue, workingEntries);

    if (!proposedEntries.length) {
      return;
    }

    setWeekPlanningStatus(weekValue, "planned", { save: false });
    workingEntries = nextEntries;
    totalProposed += proposedEntries.length;
    changedWeeks += 1;
    remainingOpenTotal += remainingOpenCount;
  });

  if (!changedWeeks) {
    render();
    showMessage("Rooster ingevuld - 0 ingevuld - 0 open", "warning");
    return { changedWeeks: 0, proposedEntries: 0 };
  }

  entries.splice(0, entries.length, ...workingEntries);
  saveEntries();
  savePlanningSettings();
  persistProtectedChange({
    reason: summaryLabel,
    scope: "roster",
    action: "roster-autoplan-direct",
    message: `${changedWeeks} week${changedWeeks === 1 ? "" : "en"} automatisch geroosterd.`,
    details: {
      weeks: eligibleWeeks,
      changedWeeks,
      addedCount: totalProposed,
      remainingOpenTotal
    }
  });
  render();
  showMessage(
    remainingOpenTotal > 0
      ? `Rooster ingevuld - ${totalProposed} ingevuld - ${remainingOpenTotal} open`
      : `Rooster ingevuld - ${totalProposed} ingevuld - 0 open`,
    remainingOpenTotal > 0 ? "warning" : "success"
  );
  return { changedWeeks, proposedEntries: totalProposed };
}

function renderSchedulePlanningOverview() {
  if (!planningOverviewList) {
    return;
  }

  if (!isPlannerRole()) {
    setClassName(planningOverviewList, "planning-overview-list empty");
    planningOverviewList.innerHTML = "Deze plannerpagina is alleen beschikbaar voor directie of planner.";
    if (planningOverviewSummary) {
      setClassName(planningOverviewSummary, "planning-overview-summary hidden");
      planningOverviewSummary.innerHTML = "";
    }
    return;
  }

  const referenceMonth = planningOverviewMonthInput?.value || getCurrentMonthValue();
  if (planningOverviewMonthInput && !planningOverviewMonthInput.value) {
    planningOverviewMonthInput.value = referenceMonth;
  }

  const weekRows = getWeeksForMonth(referenceMonth).map((weekValue) => getSchedulePlanningWeekData(weekValue, entries));
  const openWeeks = weekRows.filter((week) => week.openCount > 0 && week.status.key !== "locked");
  const totalFilled = weekRows.reduce((total, week) => total + week.weekEntries.length, 0);
  const totalOpen = weekRows.reduce((total, week) => total + week.openCount, 0);
  const attentionWeeks = weekRows.filter((week) =>
    week.openCount > 0 ||
    week.replacementCount > 0 ||
    week.deviationCount > 0 ||
    week.contractImbalanceCount > 0
  );
  const attentionPreview = attentionWeeks.slice(0, 6).map((week) => formatWeekLabel(week.weekValue));

  if (planningOverviewTitle) {
    planningOverviewTitle.textContent = `Rooster inplannen ${getMonthLabel(referenceMonth) || referenceMonth}`;
  }

  if (planningOverviewAutoButton) {
    planningOverviewAutoButton.disabled = openWeeks.length === 0;
    planningOverviewAutoButton.textContent = openWeeks.length === 0
      ? "Geen open weken"
      : "Automatisch roosteren";
  }

  if (planningOverviewSummary) {
    setClassName(planningOverviewSummary, "planning-overview-summary");
    planningOverviewSummary.innerHTML = `
      <article class="planning-overview-summary-card">
        <strong>Ingevuld</strong>
        <span>${totalFilled}</span>
      </article>
      <article class="planning-overview-summary-card ${totalOpen > 0 ? "is-warning" : "is-complete"}">
        <strong>Open</strong>
        <span>${totalOpen}</span>
      </article>
      <article class="planning-overview-summary-card ${attentionWeeks.length > 0 ? "is-warning" : "is-complete"}">
        <strong>Aandacht</strong>
        <span>${attentionWeeks.length ? `${attentionWeeks.length} week${attentionWeeks.length === 1 ? "" : "en"}` : "Geen"}</span>
      </article>
    `;
  }

  setClassName(planningOverviewList, `planning-overview-list${weekRows.length ? "" : " empty"}`);
  planningOverviewList.innerHTML = weekRows.length
    ? `
      <div class="planning-overview-header" aria-hidden="true">
        <span>Week</span>
        <span>Periode</span>
        <span>Status</span>
        <span>Open</span>
        <span>Acties</span>
      </div>
      ${weekRows.map((week) => {
        return `
          <article class="planning-overview-row ${week.status.className}" data-planning-week="${week.weekValue}">
            <div class="planning-overview-week">${formatWeekLabel(week.weekValue)}</div>
            <div class="planning-overview-period">${week.periodLabel}</div>
            <div class="planning-overview-status-cell">
              <span class="planning-overview-status ${week.status.className}">${week.status.label}</span>
            </div>
            <div class="planning-overview-open-cell">
              <span class="planning-overview-metric is-open-count">${week.openCount}</span>
            </div>
            <div class="planning-overview-actions">
              <button type="button" class="secondary" data-planning-action="open-week" data-week-value="${week.weekValue}">Open week</button>
              <button type="button" class="secondary" data-planning-action="smart-plan" data-week-value="${week.weekValue}" ${week.status.key === "locked" ? "disabled" : ""}>Automatisch roosteren</button>
            </div>
          </article>
        `;
      }).join("")}
    `
    : "Geen weken beschikbaar voor deze maand.";
}

function getWeekReviewStatusMeta(status) {
  return getWeekReviewStatusMetaHelper(status);
}

function renderWeekReviewStatus(selectedWeek) {
  if (!weekReviewStatusPanel) {
    return;
  }

  if (!isPlannerRole() || !(activeTab === "week-current" || activeTab === "week-next")) {
    setClassName(weekReviewStatusPanel, "week-review-status hidden");
    weekReviewStatusPanel.innerHTML = "";
    return;
  }

  const status = getWeekReviewStatus(selectedWeek);
  const meta = getWeekReviewStatusMeta(status);

  setClassName(weekReviewStatusPanel, "week-review-status");
  weekReviewStatusPanel.innerHTML = `
    <div class="week-review-status-card ${meta.className}">
      <span>Weekstatus ${selectedWeek.replace("-W", " - ")}</span>
      <strong>${meta.label}</strong>
      <small>${meta.detail}</small>
      <div class="week-review-actions">
        <button type="button" class="secondary ${status === "open" ? "active" : ""}" data-week-review-status="open" data-week-review-value="${selectedWeek}">Open</button>
        <button type="button" class="secondary ${status === "in-review" ? "active" : ""}" data-week-review-status="in-review" data-week-review-value="${selectedWeek}">In controle</button>
        <button type="button" class="secondary ${status === "locked" ? "active" : ""}" data-week-review-status="locked" data-week-review-value="${selectedWeek}">Vastgezet</button>
      </div>
    </div>
  `;

  if (completeReviewButton) {
    completeReviewButton.disabled = status === "locked";
    completeReviewButton.textContent = status === "locked" ? "Week vastgezet" : "Controle afronden";
  }
}

function getShiftContextLabel(entry) {
  return getShiftContextLabelHelper(getShiftName, entry);
}

const {
  getRequestStatusLabel = function fallbackGetRequestStatusLabel(status) {
    if (status === "approved") {
      return "Goedgekeurd";
    }

    if (status === "rejected") {
      return "Afgewezen";
    }

    if (status === "in-review") {
      return "In behandeling";
    }

    if (status === "waiting" || status === "overdue") {
      return "Wacht op reactie";
    }

    return "Open";
  },
  getRequestLastChangeIso = function fallbackGetRequestLastChangeIso(request) {
    if (!request || typeof request !== "object") {
      return "";
    }

    if (typeof request.updatedAt === "string" && request.updatedAt) {
      return request.updatedAt;
    }

    if (typeof request.createdAt === "string" && request.createdAt) {
      return request.createdAt;
    }

    return "";
  },
  getRequestAgeHours = function fallbackGetRequestAgeHours(request) {
    const lastChangeIso = getRequestLastChangeIso(request);

    if (!lastChangeIso) {
      return 0;
    }

    const lastChangeTime = Date.parse(lastChangeIso);

    if (!Number.isFinite(lastChangeTime)) {
      return 0;
    }

    return Math.max(0, (Date.now() - lastChangeTime) / 3600000);
  },
  getRequestDisplayStatus = function fallbackGetRequestDisplayStatus(request) {
    if (!request) {
      return "open";
    }

    if (request.status !== "open") {
      return request.status;
    }

    const ageHours = getRequestAgeHours(request);

    if (ageHours >= 48) {
      return "overdue";
    }

    if (ageHours >= 24) {
      return "waiting";
    }

    return "open";
  },
  getRequestDisplayLabel = function fallbackGetRequestDisplayLabel(request) {
    const displayStatus = getRequestDisplayStatus(request);

    if (request?.shiftName) {
      if (request.status === "approved") {
        return request.autoApproved ? "Automatisch goedgekeurd" : "Geaccepteerd";
      }

      if (request.status === "rejected") {
        return "Afgewezen";
      }

      if (request.status === "open") {
        return "Wacht op beoordeling";
      }
    }

    return getRequestStatusLabel(displayStatus);
  },
  getRequestAttentionText = function fallbackGetRequestAttentionText(request) {
    const displayStatus = getRequestDisplayStatus(request);

    if (request?.shiftName && request.status === "open" && !request.targetEmployeeName) {
      if (displayStatus === "waiting") {
        return "Geen reactie op dit open ruilverzoek. Directie kan nu handmatig ingrijpen.";
      }

      if (displayStatus === "overdue") {
        return "Geen reactie op dit ruilverzoek. Kies een vervanger of sluit het verzoek af.";
      }
    }

    if (displayStatus === "waiting") {
      return "Deze aanvraag wacht al langer dan 24 uur op reactie.";
    }

    if (displayStatus === "overdue") {
      return "Deze aanvraag staat al langer dan 48 uur open en vraagt nu extra aandacht.";
    }

    return "";
  }
} = window.StroetRequestsFeature || {};

function getSwapReplacementCandidates(request) {
  if (!request) {
    return [];
  }

  const shift = getSelectedShift(request.shiftId || "", request.startTime, request.endTime, request.date) || {
    id: request.shiftId || request.shiftName || "",
    name: request.shiftName || "Dienst",
    startTime: request.startTime,
    endTime: request.endTime
  };

  return getSuitableEmployeesForShift(
    shift,
    request.date,
    request.startTime,
    request.endTime
  ).filter((employeeName) => employeeName !== request.employeeName);
}

function getSwapEntryDetails(entryValue) {
  if (!entryValue) {
    return null;
  }

  const [entryEmployeeName, entryDate, shiftId, startTime, endTime] = String(entryValue).split("|");

  if (!entryEmployeeName || !entryDate || !startTime || !endTime) {
    return null;
  }

  const entry = entries.find((item) =>
    item.name === entryEmployeeName &&
    item.day === entryDate &&
    item.startTime === startTime &&
    item.endTime === endTime &&
    (shiftId ? item.shiftId === shiftId : true)
  );

  if (!entry) {
    return null;
  }

  const shift = getSelectedShift(entry.shiftId || "", entry.startTime, entry.endTime, entry.day) || {
    id: entry.shiftId || entry.shiftName || "",
    name: getShiftName(entry),
    startTime: entry.startTime,
    endTime: entry.endTime
  };

  return {
    entry,
    shift,
    employeeName: entryEmployeeName,
    date: entryDate,
    shiftId: shiftId || "",
    startTime,
    endTime
  };
}

function getSwapCandidatesForEntryDetails(entryDetails) {
  if (!entryDetails?.shift || !entryDetails?.date) {
    return [];
  }

  return getSuitableEmployeesForShift(
    entryDetails.shift,
    entryDetails.date,
    entryDetails.startTime,
    entryDetails.endTime
  ).filter((employeeName) => employeeName !== entryDetails.employeeName);
}

function getEmployeeApprovedSwapExperience(employeeName) {
  if (!employeeName) {
    return 0;
  }

  return swapRequests.filter((request) =>
    request.status === "approved" &&
    request.targetEmployeeName === employeeName
  ).length;
}

function getSwapReplacementSuggestions(entryDetails) {
  if (!entryDetails?.shift || !entryDetails?.date) {
    return [];
  }

  const weekValue = getWeekValueFromDate(entryDetails.date) || getCurrentWeekValue();

  return getSwapCandidatesForEntryDetails(entryDetails)
    .map((employeeName) => {
      const patternMatch = getEmployeePlanningPatternMatch(
        employeeName,
        entryDetails.shift,
        entryDetails.date,
        weekValue,
        entries
      );
      const weekHours = getEmployeeWeekHours(employeeName, weekValue, entries);
      const swapExperience = getEmployeeApprovedSwapExperience(employeeName);
      const fixedDayTier = patternMatch.score < 20 ? 0 : (patternMatch.score < 55 ? 1 : 2);
      const availabilityTier = 0;
      const reasons = [];

      if (fixedDayTier === 0) {
        reasons.push("juiste vaste werkdag");
      } else if (fixedDayTier === 1) {
        reasons.push("past binnen voorkeur");
      } else {
        reasons.push("beschikbaar, maar buiten vast patroon");
      }

      reasons.push(`${formatHours(weekHours)} ingepland deze week`);

      if (swapExperience > 0) {
        reasons.push(`${swapExperience}x eerder ruil overgenomen`);
      }

      reasons.push("beschikbaar zonder overlap");

      return {
        employeeName,
        fixedDayTier,
        patternScore: patternMatch.score,
        weekHours,
        swapExperience,
        availabilityTier,
        primaryReason: reasons[0],
        detail: reasons.join(", ")
      };
    })
    .sort((candidateA, candidateB) =>
      candidateA.fixedDayTier - candidateB.fixedDayTier ||
      candidateA.weekHours - candidateB.weekHours ||
      candidateB.swapExperience - candidateA.swapExperience ||
      candidateA.availabilityTier - candidateB.availabilityTier ||
      candidateA.patternScore - candidateB.patternScore ||
      candidateA.employeeName.localeCompare(candidateB.employeeName, "nl")
    );
}

function findOpenSwapRequestForEntry(employeeName, date, entry) {
  if (!employeeName || !date || !entry) {
    return null;
  }

  return swapRequests.find((request) =>
    request.status === "open" &&
    request.employeeName === employeeName &&
    request.date === date &&
    request.shiftId === (entry.shiftId || "") &&
    request.startTime === entry.startTime &&
    request.endTime === entry.endTime
  ) || null;
}

function canEscalateSwapRequestToPlanner(request) {
  if (!request || request.status !== "open" || request.escalatedToPlanner) {
    return false;
  }

  const displayStatus = getRequestDisplayStatus(request);
  return displayStatus === "waiting" || displayStatus === "overdue";
}

function getSwapApprovalIssue(request, replacementEmployeeName = request?.targetEmployeeName || "") {
  if (!request || !replacementEmployeeName) {
    return "Kies eerst een vervanger voor dit ruilverzoek.";
  }

  const approvalCandidates = getSwapReplacementCandidates(request);

  if (!approvalCandidates.includes(replacementEmployeeName)) {
    return "Deze medewerker is niet bevoegd of niet beschikbaar voor deze dienst.";
  }

  const targetConflict = entries.find((item) =>
    item.name === replacementEmployeeName &&
    item.day === request.date &&
    timeToMinutes(request.startTime) < timeToMinutes(item.endTime) &&
    timeToMinutes(request.endTime) > timeToMinutes(item.startTime)
  );

  if (targetConflict) {
    return `${replacementEmployeeName} heeft al een overlappende of dubbele dienst op ${formatDate(request.date)}.`;
  }

  const targetAbsence = getApprovedTimeOff(replacementEmployeeName, request.date);

  if (targetAbsence) {
    return `De overnemer heeft al ${getApprovedAbsenceDetail(targetAbsence)} op ${formatDate(request.date)}.`;
  }

  const sourceEntry = entries.find((item) =>
    item.name === request.employeeName &&
    item.day === request.date &&
    item.startTime === request.startTime &&
    item.endTime === request.endTime &&
    (request.shiftId ? item.shiftId === request.shiftId : getShiftName(item) === request.shiftName)
  );

  if (!sourceEntry) {
    return "De dienst voor dit ruilverzoek is niet meer gevonden in het rooster.";
  }

  return "";
}

function buildMailRecipients(employeeNames = []) {
  const uniqueEmployeeNames = [...new Set(
    employeeNames
      .filter((employeeName) => typeof employeeName === "string" && employeeName.trim() !== "")
      .map((employeeName) => employeeName.trim())
  )];

  return uniqueEmployeeNames.map((employeeName) => ({
    employeeName,
    email: getMailEligibleEmployeeEmail(employeeName)
  }));
}

function getLatestRequestMailNotification(request) {
  return Array.isArray(request?.mailLog) && request.mailLog.length ? request.mailLog[0] : null;
}

function getLatestRequestMailNotificationForEmployee(request, employeeName = "") {
  if (!employeeName || !Array.isArray(request?.mailLog)) {
    return getLatestRequestMailNotification(request);
  }

  return request.mailLog.find((item) =>
    Array.isArray(item?.recipients) &&
    item.recipients.some((recipient) => recipient.employeeName === employeeName)
  ) || getLatestRequestMailNotification(request);
}

function hasRequestMailNotification(request, type, recipientSignature, periodKey = "") {
  if (!Array.isArray(request?.mailLog)) {
    return false;
  }

  return request.mailLog.some((item) => {
    if (item?.type !== type) {
      return false;
    }

    const currentSignature = Array.isArray(item.recipients)
      ? item.recipients
        .map((recipient) => `${recipient.employeeName}|${normalizeEmployeeEmail(recipient.email)}`)
        .sort()
        .join(";")
      : "";

    if (currentSignature !== recipientSignature) {
      return false;
    }

    return periodKey ? item.periodKey === periodKey : true;
  });
}

async function sendEmail(to, subject, message) {
  if (!to || (Array.isArray(to) && to.length === 0)) {
    return {
      ok: false,
      error: "Geen ontvanger opgegeven."
    };
  }

  if (window.location.protocol === "file:") {
    return {
      ok: false,
      error: "Lokale preview zonder serverroute."
    };
  }

  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: Array.isArray(to) ? to : [to],
        subject,
        message,
        forceTestRecipient: APP_MAIL_TEST_MODE_ENABLED,
        fromName: normalizeMailSenderName(mailSettings?.senderName || ""),
        fromEmail: normalizeEmployeeEmail(mailSettings?.senderEmail || "")
      })
    });

    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await response.json().catch(() => ({}))
      : {};
    const payloadMessage = typeof payload?.message === "string"
      ? payload.message
      : typeof payload?.error === "string"
        ? payload.error
        : "";

    if (!response.ok) {
      console.error("[test-mail] sendEmail:response-error", {
        status: response.status,
        payload
      });

      if (response.status === 404) {
        return {
          ok: false,
          error: "Backend route /api/send-email bestaat niet."
        };
      }

      return {
        ok: false,
        error: payloadMessage || "Verzenden mislukt."
      };
    }

    return {
      ok: true,
      id: typeof payload?.id === "string" ? payload.id : "",
      message: payloadMessage || getAppMailSentMessage()
    };
  } catch (error) {
    console.error("[test-mail] sendEmail:exception", error);
    return {
      ok: false,
      error: error instanceof Error && error.message
        ? `Backend route niet bereikbaar: ${error.message}`
        : "Backend route niet bereikbaar."
    };
  }
}

async function sendTestEmailRequest() {
  if (window.location.protocol === "file:") {
    return {
      ok: false,
      error: "Lokale preview zonder serverroute."
    };
  }

  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        testMode: true
      })
    });

    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await response.json().catch(() => ({}))
      : {};
    const payloadMessage = typeof payload?.message === "string"
      ? payload.message
      : typeof payload?.error === "string"
        ? payload.error
        : "";

    if (!response.ok || payload?.success === false) {
      console.error("[test-mail] sendTestEmailRequest:response-error", {
        status: response.status,
        payload
      });

      if (response.status === 404) {
        return {
          ok: false,
          error: "Backend route /api/send-email bestaat niet."
        };
      }

      return {
        ok: false,
        error: payloadMessage || "Verzenden mislukt."
      };
    }

    return {
      ok: true,
      message: payloadMessage || `Mail verzonden naar ${FIXED_TEST_MAIL_RECIPIENT} (testmodus)`
    };
  } catch (error) {
    console.error("[test-mail] sendTestEmailRequest:exception", error);
    return {
      ok: false,
      error: error instanceof Error && error.message
        ? `Backend route niet bereikbaar: ${error.message}`
        : "Backend route niet bereikbaar."
    };
  }
}

async function sendTemplatedEmail(to, templateKey, context = {}) {
  const { subject, message } = buildEmailTemplate(templateKey, context);
  return sendEmail(to, subject, message);
}

async function sendPlannerSummaryEmail(to, summaryType, context = {}) {
  const templateMap = {
    hours: "plannerHoursApprovalSummary",
    "hours-reminder": "plannerHoursApprovalReminder",
    requests: "plannerOpenRequestsSummary",
    "requests-reminder": "plannerOpenRequestsReminder"
  };
  const templateKey = templateMap[summaryType] || "plannerOpenRequestsSummary";
  return sendTemplatedEmail(to, templateKey, context);
}

async function sendEmployeeHoursReminderEmail(to, context = {}) {
  return sendTemplatedEmail(to, "employeeHoursReminder", context);
}

function updateMailLogEntry(request, mailEntry, patch = {}, persist = null) {
  if (!request || !mailEntry || !Array.isArray(request.mailLog)) {
    return;
  }

  const targetEntry = request.mailLog.find((item) => item === mailEntry || (
    item.type === mailEntry.type &&
    item.at === mailEntry.at &&
    item.periodKey === mailEntry.periodKey
  ));

  if (!targetEntry) {
    return;
  }

  Object.assign(targetEntry, patch);

  if (typeof persist === "function") {
    persist();
  }
}

function queueRequestMailDelivery(request, mailEntry, options = {}) {
  if (!request || !mailEntry) {
    return;
  }

  const {
    subjectBuilder = () => "Update",
    messageBuilder = () => "Er is een update.",
    templateKeyBuilder = null,
    persist = null,
    onStatusChange = null,
    notifyUser = false,
    notifySuccessMessage = getAppMailSentMessage(),
    notifyErrorMessage = ""
  } = options;

  if (mailEntry.status === "config-missing" || mailEntry.status === "missing-email") {
    return;
  }

  const recipientEmails = (mailEntry.recipients || [])
    .map((recipient) => normalizeEmployeeEmail(recipient.email))
    .filter(Boolean);

  if (!recipientEmails.length) {
    updateMailLogEntry(request, mailEntry, { status: "missing-email", error: "Geen e-mailadres ingesteld" }, persist);
    if (typeof onStatusChange === "function") {
      onStatusChange(request, mailEntry);
    }
    if (notifyUser) {
      showMessage(notifyErrorMessage || "Mail verzenden mislukt: Geen e-mailadres ingesteld", "error");
    }
    return;
  }

  const templateKey = typeof templateKeyBuilder === "function"
    ? templateKeyBuilder(request, mailEntry.type)
    : "";
  const delivery = templateKey
    ? sendTemplatedEmail(recipientEmails, templateKey, { request, type: mailEntry.type })
    : sendEmail(
      recipientEmails,
      subjectBuilder(request, mailEntry.type),
      messageBuilder(request, mailEntry.type)
    );

  void delivery.then((result) => {
    if (result.ok) {
      updateMailLogEntry(request, mailEntry, {
        status: "sent",
        messageId: result.id || "",
        error: ""
      }, persist);
      if (typeof onStatusChange === "function") {
        onStatusChange(request, mailEntry);
      }
      if (notifyUser) {
        showMessage(notifySuccessMessage || "Mail verzonden", "success");
      }
      return;
    }

    updateMailLogEntry(request, mailEntry, {
      status: result.error === "Lokale preview zonder serverroute." ? "local-preview" : "failed",
      messageId: "",
      error: result.error || "Verzenden mislukt."
    }, persist);
    if (typeof onStatusChange === "function") {
      onStatusChange(request, mailEntry);
    }
    if (notifyUser) {
      showMessage(notifyErrorMessage || `Mail verzenden mislukt: ${result.error || "onbekende fout"}`, "error");
    }
  });
}

function getSwapMailTemplateKey(type) {
  const templateMap = {
    submitted: "swapSubmitted",
    "request-created": "swapRequestCreated",
    "auto-approved": "swapAutoApproved",
    approved: "swapApproved",
    rejected: "swapRejected",
    "planner-help": "swapPlannerHelp",
    reminder: "swapReminder"
  };

  return templateMap[type] || "swapSubmitted";
}

function getTimeOffMailTemplateKey(request, type) {
  const templateMap = {
    submitted: "timeoffSubmitted",
    approved: "timeoffApproved",
    rejected: "timeoffRejected"
  };

  return templateMap[type] || "timeoffSubmitted";
}

function registerRequestMailNotification(request, type, employeeNames = [], options = {}) {
  if (!request || !type) {
    return;
  }

  const periodKey = typeof options.periodKey === "string" ? options.periodKey : "";
  const subjectBuilder = typeof options.subjectBuilder === "function" ? options.subjectBuilder : (() => "Update");
  const messageBuilder = typeof options.messageBuilder === "function" ? options.messageBuilder : (() => "Er is een update.");
  const persist = typeof options.persist === "function" ? options.persist : null;
  const onStatusChange = typeof options.onStatusChange === "function" ? options.onStatusChange : null;
  const notifyUser = options.notifyUser === true;
  const notifySuccessMessage = typeof options.notifySuccessMessage === "string" ? options.notifySuccessMessage : getAppMailSentMessage();
  const notifyErrorMessage = typeof options.notifyErrorMessage === "string" ? options.notifyErrorMessage : "";

  const recipients = buildMailRecipients(employeeNames);
  const hasAtLeastOneEmail = recipients.some((recipient) => recipient.email);
  const recipientSignature = recipients
    .map((recipient) => `${recipient.employeeName}|${recipient.email}`)
    .sort()
    .join(";");
  const latestMail = getLatestRequestMailNotification(request);
  const latestSignature = Array.isArray(latestMail?.recipients)
    ? latestMail.recipients
      .map((recipient) => `${recipient.employeeName}|${normalizeEmployeeEmail(recipient.email)}`)
      .sort()
      .join(";")
    : "";

  if (
    (latestMail?.type === type && latestSignature === recipientSignature && (!periodKey || latestMail?.periodKey === periodKey)) ||
    hasRequestMailNotification(request, type, recipientSignature, periodKey)
  ) {
    return;
  }

  request.mailLog = Array.isArray(request.mailLog) ? request.mailLog : [];
  const mailEntry = {
        type,
        at: getNowIsoString(),
        periodKey,
        status: hasAtLeastOneEmail ? "queued" : "missing-email",
        messageId: "",
        error: "",
        recipients
      };
  request.mailLog.unshift(mailEntry);
  request.mailLog = request.mailLog.slice(0, 10);

  queueRequestMailDelivery(request, mailEntry, {
    subjectBuilder,
    messageBuilder,
    persist,
    onStatusChange,
    notifyUser,
    notifySuccessMessage,
    notifyErrorMessage
  });
}

function registerSwapMailNotification(request, type, employeeNames = [], options = {}) {
  registerRequestMailNotification(request, type, employeeNames, {
    ...options,
    templateKeyBuilder: (_, currentType) => getSwapMailTemplateKey(currentType),
    subjectBuilder: getSwapMailSubject,
    messageBuilder: (_, currentType) => getSwapMailTemplateText(currentType),
    persist: saveSwapRequests,
    onStatusChange: () => render()
  });
}

function registerPlannerSwapMailNotification(request) {
  if (!request) {
    return;
  }

  request.mailLog = Array.isArray(request.mailLog) ? request.mailLog : [];
  const latestMail = getLatestRequestMailNotification(request);
  const latestRecipients = Array.isArray(latestMail?.recipients) ? latestMail.recipients : [];
  const latestSignature = latestRecipients
    .map((recipient) => `${recipient.employeeName}|${normalizeEmployeeEmail(recipient.email)}`)
    .sort()
    .join(";");
  const plannerRecipients = [{ employeeName: "Planner / Directie", email: "" }];
  const plannerSignature = plannerRecipients
    .map((recipient) => `${recipient.employeeName}|${recipient.email}`)
    .sort()
    .join(";");

  if (latestMail?.type === "planner-help" && latestSignature === plannerSignature) {
    return;
  }

  request.mailLog.unshift({
    type: "planner-help",
    at: getNowIsoString(),
    status: "missing-email",
    messageId: "",
    error: "",
    recipients: plannerRecipients
  });
  request.mailLog = request.mailLog.slice(0, 10);
}

function getLatestSwapMailNotification(request) {
  return getLatestRequestMailNotification(request);
}

function getMailDeliveryPrefix(type, status) {
  return getMailDeliveryPrefixHelper(type, status, {
    appMailTestModeEnabled: APP_MAIL_TEST_MODE_ENABLED,
    fixedTestRecipient: FIXED_TEST_MAIL_RECIPIENT
  });
}

function getRequestMailStatusText(request, options = {}) {
  const {
    templateTextGetter = () => "Er is een update.",
    labelMap = {},
    recipientFallback = "betrokken medewerker",
    employeeName = ""
  } = options;
  const latestMail = getLatestRequestMailNotificationForEmployee(request, employeeName);

  if (!latestMail) {
    return "";
  }

  const recipientNames = latestMail.recipients?.map((recipient) => recipient.employeeName).filter(Boolean) || [];
  const recipientLabel = recipientNames.length ? recipientNames.join(", ") : recipientFallback;

  if (latestMail.status === "config-missing") {
    return "Mail niet aangemaakt: vul eerst e-mailinstellingen in.";
  }

  if (latestMail.status === "missing-email") {
    const recipientNames = Array.isArray(latestMail.recipients)
      ? latestMail.recipients.map((recipient) => recipient.employeeName).filter(Boolean)
      : [];

    if (recipientNames.some((employeeName) => isEmployeeMailBlockedByTestPhase(employeeName))) {
      return "Mail uitgeschakeld tijdens testfase";
    }

    return latestMail.error || "Geen e-mailadres ingesteld";
  }

  if (latestMail.status === "queued") {
    return `${getMailDeliveryPrefix(latestMail.type, "queued")} ${templateTextGetter(request, latestMail.type)}`.trim();
  }

  if (latestMail.status === "sent") {
    return `${getMailDeliveryPrefix(latestMail.type, "sent")} ${templateTextGetter(request, latestMail.type)}`.trim();
  }

  if (latestMail.status === "local-preview") {
    return "Mail niet verzonden in lokale preview.";
  }

  if (latestMail.status === "failed") {
    return latestMail.error
      ? `Mail niet verzonden: ${latestMail.error}`
      : "Mail niet verzonden.";
  }

  const actionLabel = labelMap[latestMail.type] || getMailDeliveryPrefix(latestMail.type, "sent");
  return `${actionLabel} ${templateTextGetter(request, latestMail.type)}`.trim();
}

function syncSwapReminderNotifications(requests = swapRequests) {
  let changed = false;

  requests.forEach((request) => {
    if (!request || request.status !== "open" || !request.targetEmployeeName) {
      return;
    }

    const displayStatus = getRequestDisplayStatus(request);

    if (displayStatus !== "waiting" && displayStatus !== "overdue") {
      return;
    }

    const beforeCount = Array.isArray(request.mailLog) ? request.mailLog.length : 0;
    registerSwapMailNotification(request, "reminder", [request.targetEmployeeName], {
      periodKey: getTodayLocalDateValue()
    });
    const afterCount = Array.isArray(request.mailLog) ? request.mailLog.length : 0;

    if (afterCount !== beforeCount) {
      changed = true;
    }
  });

  if (changed) {
    saveSwapRequests();
  }
}

function getSwapMailStatusText(request) {
  const currentEmployee = getRoleScopedEmployeeName();
  return getRequestMailStatusText(request, {
    templateTextGetter: (_, type) => getSwapMailTemplateText(type),
    labelMap: {
      submitted: "Mail verzonden.",
      "request-created": "Mail verzonden.",
      "auto-approved": "Mail verzonden.",
      approved: "Mail verzonden.",
      rejected: "Mail verzonden.",
      "planner-help": "Mail verzonden.",
      reminder: "Herinnering verzonden."
    },
    recipientFallback: "betrokken collega",
    employeeName: isPlannerRole() ? "" : currentEmployee
  });
}

function registerTimeOffMailNotification(request, type, employeeNames = [], options = {}) {
  registerRequestMailNotification(request, type, employeeNames, {
    ...options,
    templateKeyBuilder: (currentRequest, currentType) => getTimeOffMailTemplateKey(currentRequest, currentType),
    subjectBuilder: getTimeOffMailSubject,
    messageBuilder: (currentRequest, currentType) => getTimeOffMailTemplateText(currentRequest, currentType),
    persist: saveTimeOffRequests,
    onStatusChange: () => render()
  });
}

function registerWorkLogMailNotification(workLog, type, employeeNames = [], options = {}) {
  if (!workLog || !type) {
    return;
  }

  registerRequestMailNotification(workLog, type, employeeNames, {
    ...options,
    templateKeyBuilder: (_, currentType) => getWorkLogMailTemplateKey(currentType),
    persist: saveWorkLogs,
    onStatusChange: () => render()
  });
}

function getTimeOffMailStatusText(request) {
  return getRequestMailStatusText(request, {
    templateTextGetter: (currentRequest, type) => getTimeOffMailTemplateText(currentRequest, type),
    labelMap: {
      submitted: "Mail verzonden.",
      approved: "Mail verzonden.",
      rejected: "Mail verzonden."
    },
    recipientFallback: request?.employeeName || "betrokken medewerker",
    employeeName: isPlannerRole() ? "" : getRoleScopedEmployeeName()
  });
}

function finalizeApprovedSwapRequest(request, options = {}) {
  const {
    managerNote = "",
    autoApproved = false,
    successMessage = "Rooster bijgewerkt.",
    persistMessage = `Ruilverzoek goedgekeurd voor ${request.employeeName}.`,
    action = "swap-approved"
  } = options;

  const entry = entries.find((item) =>
    item.name === request.employeeName &&
    item.day === request.date &&
    item.startTime === request.startTime &&
    item.endTime === request.endTime &&
    (request.shiftId ? item.shiftId === request.shiftId : getShiftName(item) === request.shiftName)
  );

  if (!entry) {
    showMessage("De dienst voor dit ruilverzoek is niet meer gevonden in het rooster.", "error");
    return false;
  }

  request.status = "approved";
  request.autoApproved = autoApproved;
  request.managerNote = managerNote;
  request.updatedAt = getNowIsoString();
  registerSwapMailNotification(
    request,
    autoApproved ? "auto-approved" : "approved",
    [request.employeeName, request.targetEmployeeName],
    { notifyUser: true }
  );

  const previousEntry = { ...entry };
  entry.name = request.targetEmployeeName;
  if (moveWorkLogToEntry(previousEntry, entry)) {
    saveWorkLogs();
  }
  saveEntries();
  saveSwapRequests();
  persistProtectedChange({
    reason: `Ruilverzoek goedgekeurd: ${request.employeeName} ${request.date}`,
    scope: "roster",
    action,
    message: persistMessage,
    details: {
      requestId: request.id,
      sourceEmployee: request.employeeName,
      targetEmployee: request.targetEmployeeName,
      date: request.date,
      shiftName: request.shiftName,
      managerNote: request.managerNote || "",
      autoApproved
    }
  });
  render();
  showMessage(successMessage, "success");
  return true;
}

function escalateSwapRequestToPlanner(request, options = {}) {
  if (!request) {
    return false;
  }

  const { preserveTargetEmployee = true, successMessage = "Directie is ingeschakeld. Je ruilverzoek staat nu open voor hulp." } = options;

  if (request.escalatedToPlanner) {
    showMessage("Directie is al ingeschakeld voor deze dienst.", "warning");
    return false;
  }

  if (!ensureEmployeeWeekEditable(request.date, "directie om hulp te vragen bij een ruil")) {
    return false;
  }

  if (!ensureOwnRequestAction(request.employeeName, "directiehulp te vragen voor deze ruil")) {
    return false;
  }

  request.escalatedToPlanner = true;
  request.status = "open";
  request.updatedAt = getNowIsoString();

  if (!preserveTargetEmployee) {
    request.targetEmployeeName = "";
  }

  registerPlannerSwapMailNotification(request);

  saveSwapRequests();
  persistProtectedChange({
    reason: `Directie ingeschakeld voor ruil: ${request.employeeName} ${request.date}`,
    scope: "request",
    action: "swap-escalated",
    message: `Directie is ingeschakeld voor ${request.employeeName}.`,
    details: {
      requestId: request.id,
      employeeName: request.employeeName,
      targetEmployeeName: request.targetEmployeeName || "",
      date: request.date,
      shiftName: request.shiftName,
      escalatedToPlanner: true
    }
  });
  render();
  showMessage(successMessage, "success");
  return true;
}

function submitEscalatedSwapRequest() {
  const ownEmployeeName = !isPlannerRole() ? getOwnEmployeeNameOrWarn() : "";

  if (!isPlannerRole() && !ownEmployeeName) {
    return;
  }

  const employeeName = !isPlannerRole() ? ownEmployeeName : swapEmployeeSelect.value;
  const date = swapDateInput.value;
  const entryDetails = getSwapEntryDetails(swapEntrySelect?.value || "");
  const entry = entryDetails?.entry || null;

  if (!employeeName || !date || !entry) {
    showMessage(
      isPlannerRole()
        ? "Kies eerst medewerker, datum en dienst voordat je directie inschakelt."
        : "Kies eerst een datum en dienst voordat je directie inschakelt.",
      "error"
    );
    return;
  }

  if (!ensureEmployeeWeekEditable(date, "directie om hulp te vragen bij een ruil")) {
    return;
  }

  if (!ensureOwnRequestAction(employeeName, "directiehulp te vragen voor deze ruil")) {
    return;
  }

  if (!ensureOwnRequestAction(entry.name, "directiehulp te vragen voor deze dienst")) {
    render();
    return;
  }

  const existingRequest = findOpenSwapRequestForEntry(employeeName, date, entry);

  if (existingRequest) {
    escalateSwapRequestToPlanner(existingRequest, {
      preserveTargetEmployee: false
    });
  } else {
    const nextRequest = {
      id: createRequestId("swap"),
      employeeName,
      targetEmployeeName: "",
      date,
      shiftId: entry.shiftId || "",
      shiftName: getShiftName(entry),
      startTime: entry.startTime,
      endTime: entry.endTime,
      status: "open",
      escalatedToPlanner: true,
      createdAt: getNowIsoString(),
      updatedAt: getNowIsoString()
    };
    swapRequests.push(nextRequest);
    saveSwapRequests();
    persistProtectedChange({
      reason: `Directie ingeschakeld voor ruil: ${employeeName} ${date}`,
      scope: "request",
      action: "swap-escalated",
      message: `Directie is ingeschakeld voor ${employeeName}.`,
      details: {
        requestId: nextRequest.id,
        employeeName,
        date,
        shiftName: getShiftName(entry),
        escalatedToPlanner: true
      }
    });
    render();
    showMessage("Directie is ingeschakeld. Je ruilverzoek staat nu open voor hulp.", "success");
  }
}

function renderSwapTargetOptions() {
  if (!swapTargetEmployeeSelect) {
    return;
  }

  const currentValue = swapTargetEmployeeSelect.value;
  const entryDetails = getSwapEntryDetails(swapEntrySelect?.value || "");
  const replacementSuggestions = entryDetails ? getSwapReplacementSuggestions(entryDetails) : [];
  const replacementCandidates = replacementSuggestions.map((candidate) => candidate.employeeName);
  const candidateOptions = buildEmployeeOptions(replacementCandidates);
  const allowOpenOffer = isPlannerRole();

  swapTargetEmployeeSelect.innerHTML = `${allowOpenOffer ? '<option value="__open__">Open aanbieden</option>' : ""}<option value="">Kies geschikte collega</option>${candidateOptions}`;
  swapTargetEmployeeSelect.value = Array.from(swapTargetEmployeeSelect.options).some((option) => option.value === currentValue)
    ? currentValue
    : "";

    if (swapTargetHint) {
      if (!entryDetails) {
    swapTargetHint.textContent = "Kies eerst een dienst om geschikte collega's te zien.";
        setClassName(swapTargetHint, "panel-note request-form-full");
      } else if (replacementCandidates.length === 0) {
        swapTargetHint.textContent = "Er is nu geen geschikte collega beschikbaar om mee te ruilen.";
        setClassName(swapTargetHint, "panel-note request-form-full warning-note");
      } else if (replacementCandidates.length === 1) {
      swapTargetHint.textContent = "Er is 1 geschikte collega beschikbaar voor deze dienst.";
      setClassName(swapTargetHint, "panel-note request-form-full");
    } else {
    swapTargetHint.textContent = `Er zijn ${replacementCandidates.length} geschikte collega's beschikbaar voor deze dienst.`;
      setClassName(swapTargetHint, "panel-note request-form-full");
    }
  }

  if (swapSuggestionList) {
    if (!entryDetails) {
      setClassName(swapSuggestionList, "request-suggestion-list request-form-full empty");
      swapSuggestionList.textContent = "Nog geen dienst gekozen.";
    } else if (replacementSuggestions.length === 0) {
      setClassName(swapSuggestionList, "request-suggestion-list request-form-full empty");
      swapSuggestionList.textContent = "Geen geschikte collega beschikbaar voor deze dienst.";
    } else {
      const visibleSuggestions = replacementSuggestions.slice(0, 5);
      const remainingCount = replacementSuggestions.length - visibleSuggestions.length;
      setClassName(swapSuggestionList, "request-suggestion-list request-form-full");
      swapSuggestionList.innerHTML = `
        <strong>Beste opties</strong>
        ${visibleSuggestions.map((candidate) => `
          <button type="button" class="request-suggestion-item" data-swap-suggested-employee="${candidate.employeeName}">
            <span class="request-suggestion-name">${candidate.employeeName}</span>
            <span class="request-suggestion-reason">${candidate.detail}</span>
          </button>
        `).join("")}
      ${remainingCount > 0 ? `<div class="panel-note">+ ${remainingCount} extra geschikte collega${remainingCount === 1 ? "" : "'s"}</div>` : ""}
      `;
    }
  }

  if (swapNoCandidateHelp) {
    swapNoCandidateHelp.classList.toggle("hidden", !(entryDetails && replacementCandidates.length === 0));
  }

  if (swapEscalateButton) {
    const existingOpenRequest = entryDetails
      ? findOpenSwapRequestForEntry(entryDetails.employeeName, entryDetails.date, entryDetails.entry)
      : null;
    const shouldShowEscalate = Boolean(entryDetails && replacementCandidates.length === 0 && !isPlannerRole());
    swapEscalateButton.classList.toggle("hidden", !shouldShowEscalate);
    swapEscalateButton.disabled = Boolean(existingOpenRequest?.escalatedToPlanner);
    swapEscalateButton.textContent = existingOpenRequest?.escalatedToPlanner
      ? "Directie al ingeschakeld"
      : "Directie inschakelen";
  }
}

function getVisibleRequestSources() {
  const currentEmployee = getRoleScopedEmployeeName();

  return {
    visibleTimeOffRequests: isPlannerRole()
      ? timeOffRequests
      : timeOffRequests.filter((request) => request.employeeName === currentEmployee),
    visibleSwapRequests: isPlannerRole()
      ? swapRequests
      : swapRequests.filter((request) => request.employeeName === currentEmployee)
  };
}

function getRequestStatusFilterValue() {
  return requestStatusFilter?.value || "";
}

function matchesRequestStatusFilter(request) {
  const selectedStatus = getRequestStatusFilterValue();
  const displayStatus = getRequestDisplayStatus(request);

  if (selectedStatus === "") {
    return true;
  }

  if (selectedStatus === "waiting") {
    return displayStatus === "waiting" || displayStatus === "overdue";
  }

  return displayStatus === selectedStatus;
}

function getRequestRosterEffectText(request, requestType) {
  if (requestType === "timeoff") {
    const startDate = getTimeOffStartDate(request);
    const endDate = getTimeOffEndDate(request);
    const affectedEntries = entries.filter((entry) =>
      entry.name === request.employeeName &&
      entry.day >= startDate &&
      entry.day <= endDate
    );

    if (request.status === "approved") {
      return affectedEntries.length > 0
        ? `${affectedEntries.length} dienst(en) in deze periode vragen nu aandacht in het rooster.`
        : "Goedgekeurd en zichtbaar als afwezig in het rooster.";
    }

    if (request.status === "open") {
      return affectedEntries.length > 0
        ? `Na goedkeuring gekoppeld aan ${affectedEntries.length} roosterdienst(en).`
        : "Na goedkeuring direct zichtbaar in het rooster.";
    }

    return "Niet gekoppeld aan het rooster.";
  }

  if (requestType === "swap") {
    if (request.status === "approved") {
      return request.autoApproved
        ? "Automatisch goedgekeurd en direct verwerkt in het rooster."
        : "Goedgekeurd en direct verwerkt in het rooster.";
    }

    if (request.status === "open") {
      return request.targetEmployeeName
        ? "Deze ruil wacht nog op beoordeling."
        : "Na goedkeuring wordt deze dienst open aangeboden.";
    }

    return "Nog niet verwerkt in het rooster.";
  }

  return "";
}

function getPlannerRequestNoteFromButton(button) {
  const input = button?.closest(".request-card")?.querySelector("[data-request-note-input]");
  return input ? input.value.trim() : "";
}

function applyApprovedTimeOffToRoster(request) {
  const startDate = getTimeOffStartDate(request);
  const endDate = getTimeOffEndDate(request);
  const scheduledEntries = entries.filter((entry) =>
    entry.name === request.employeeName &&
    entry.day >= startDate &&
    entry.day <= endDate
  );

  if (!scheduledEntries.length) {
    return [];
  }

  for (let index = entries.length - 1; index >= 0; index -= 1) {
    const entry = entries[index];

    if (entry.name === request.employeeName && entry.day >= startDate && entry.day <= endDate) {
      entries.splice(index, 1);
    }
  }

  saveEntries();
  return scheduledEntries;
}

function renderRequestsContext() {
  const scopedEmployeeName = getRoleScopedEmployeeName();
  updateRoleContextBadge(requestsEmployeeBadge, scopedEmployeeName, "Geen medewerker gekoppeld");

  if (requestOpenHeading) {
    requestOpenHeading.textContent = isPlannerRole() ? "Open aanvragen" : "Mijn open aanvragen";
  }

  if (requestOpenNote) {
    requestOpenNote.textContent = isPlannerRole()
      ? "Open verzoeken die nog aandacht vragen."
      : "Alleen jouw open verzoeken die nog op reactie wachten.";
  }

  if (requestHandledHeading) {
    requestHandledHeading.textContent = isPlannerRole() ? "Afgehandelde aanvragen" : "Mijn afgehandelde aanvragen";
  }

  if (requestHandledNote) {
    requestHandledNote.textContent = isPlannerRole()
      ? "Goedgekeurde en afgewezen verzoeken."
      : "Alleen jouw goedgekeurde en afgewezen verzoeken.";
  }
}

function getPlannerRequestSummaryCounts() {
  const openTimeOffRequests = timeOffRequests.filter((request) => request.status === "open");

  return {
    free: openTimeOffRequests.filter((request) => request.type === "vrij").length,
    vacation: openTimeOffRequests.filter((request) => request.type === "vakantie").length,
    sick: openTimeOffRequests.filter((request) => request.type === "ziek").length,
    swaps: swapRequests.filter((request) => request.status === "open").length
  };
}

function renderPlannerRequestCards(target, requests, emptyText, requestType) {
  if (!target) {
    return;
  }

  if (requests.length === 0) {
    setClassName(target, "request-list empty");
    target.textContent = emptyText;
    return;
  }

  setClassName(target, "request-list");
  target.innerHTML = requests.map((request) => {
    const requestStatus = getRequestDisplayStatus(request);
    const statusLabel = getRequestDisplayLabel(request);
    const periodText = requestType === "swap"
      ? formatDate(request.date)
      : getTimeOffDisplayRange(request);
    const detailText = requestType === "swap"
      ? `${request.shiftName} - ${request.startTime} - ${request.endTime}`
      : `${getAbsenceTypeLabel(request.type)}${request.reason ? ` - ${request.reason}` : ""}`;
    const attentionText = request.status === "open" ? getRequestAttentionText(request) : "";
    const plannerNote = request.managerNote ? `<div class="request-impact"><strong>Opmerking:</strong> ${request.managerNote}</div>` : "";
    const plannerNoteField = request.status === "open"
      ? `
        <label class="request-note-field">
          <span>Opmerking planner</span>
          <input type="text" maxlength="200" value="${request.managerNote || ""}" data-request-note-input placeholder="Korte toelichting">
        </label>
      `
      : "";
    const plannerActions = request.status === "open"
      ? `
        <div class="actions planner-request-actions">
          <button type="button" class="small" data-request-type="${requestType}" data-request-action="approve" data-request-id="${request.id}">Goedkeuren</button>
          <button type="button" class="small warning" data-request-type="${requestType}" data-request-action="reject" data-request-id="${request.id}">Afwijzen</button>
          <button type="button" class="small secondary" data-request-type="${requestType}" data-request-action="note" data-request-id="${request.id}">Opmerking</button>
          ${requestType === "swap" && !request.targetEmployeeName ? `<button type="button" class="small secondary" data-request-type="swap" data-request-action="assign-replacement" data-request-id="${request.id}">Vervanger kiezen</button>` : ""}
        </div>
      `
      : "";
    const swapExtra = requestType === "swap" && request.targetEmployeeName
      ? `<div class="request-impact">Voorgestelde collega: ${request.targetEmployeeName}</div>`
      : (requestType === "swap" && request.escalatedToPlanner
        ? `<div class="request-impact request-attention-note">Directie is gevraagd om mee te kijken.</div>`
        : "");
    const replacementField = requestType === "swap" && request.status === "open" && !request.targetEmployeeName
      ? `
        <label class="request-note-field">
          <span>Vervanger kiezen</span>
          <select data-request-replacement-select="${request.id}">
            <option value="">Kies bevoegde medewerker</option>
            ${buildEmployeeOptions(getSwapReplacementCandidates(request))}
          </select>
        </label>
      `
      : "";

    return `
      <article class="request-card planner-request-card is-${requestStatus}${requestType === "timeoff" ? ` absence-${getAbsenceCardClass(request.type)}` : ""}">
        <div class="planner-request-row">
          <strong class="planner-request-name">${request.employeeName}</strong>
          <div class="planner-request-period" title="${periodText}">${periodText}</div>
          <span class="status-pill status-${requestStatus}">${statusLabel}</span>
          ${plannerActions}
        </div>
        <div class="planner-request-detail-row">
          <div class="planner-request-detail" title="${detailText}">${detailText}</div>
          ${replacementField}
          ${plannerNoteField}
        </div>
        ${swapExtra}
        ${requestType === "swap" ? `<div class="request-impact">${getRequestRosterEffectText(request, "swap")}</div>` : ""}
        ${attentionText ? `<div class="request-impact request-attention-note">${attentionText}</div>` : ""}
        ${plannerNote}
      </article>
    `;
  }).join("");
}

function getComposerTimeOffType(composer) {
  if (composer === "vacation") {
    return "vakantie";
  }

  if (composer === "sick") {
    return "ziek";
  }

  return "vrij";
}

function getRequestTypeFromComposer(composer) {
  if (composer === "vacation") {
    return "vakantie";
  }

  if (composer === "sick") {
    return "ziekmelding";
  }

  if (composer === "swap") {
    return "ruilen";
  }

  return "vrije-dag";
}

function getComposerFromRequestType(requestType) {
  if (requestType === "vakantie") {
    return "vacation";
  }

  if (requestType === "ziekmelding") {
    return "sick";
  }

  if (requestType === "ruilen") {
    return "swap";
  }

  return "free";
}

function getRequestComposerState(composer = activeRequestComposer) {
  if (composer === "vacation") {
    return vakantieForm;
  }

  if (composer === "sick") {
    return ziekmeldingForm;
  }

  if (composer === "swap") {
    return ruilForm;
  }

  return vrijeDagForm;
}

function getTimeOffFormElements(composer = activeRequestComposer) {
  if (composer === "vacation") {
    return {
      composerSection: requestVacationComposer,
      employeeSelect: vacationEmployeeSelect,
      dateInput: null,
      startDateInput: vacationStartDateInput,
      endDateInput: vacationEndDateInput,
      reasonInput: vacationReasonInput,
      submitButton: submitVacationButton
    };
  }

  if (composer === "sick") {
    return {
      composerSection: requestSickComposer,
      employeeSelect: sickEmployeeSelect,
      dateInput: sickDateInput,
      startDateInput: null,
      endDateInput: null,
      reasonInput: sickReasonInput,
      submitButton: submitSickButton
    };
  }

  return {
    composerSection: requestFreeComposer,
    employeeSelect: freeDayEmployeeSelect,
    dateInput: freeDayDateInput,
    startDateInput: null,
    endDateInput: null,
    reasonInput: freeDayReasonInput,
    submitButton: submitFreeDayButton
  };
}

function getAllTimeOffEmployeeSelects() {
  return [freeDayEmployeeSelect, vacationEmployeeSelect, sickEmployeeSelect].filter(Boolean);
}

function syncTimeOffFormStateFromFields(composer = activeRequestComposer) {
  const formState = getRequestComposerState(composer);
  const formElements = getTimeOffFormElements(composer);

  if (!formState || composer === "swap" || !formElements) {
    return;
  }

  formState.employeeName = formElements.employeeSelect?.value || formState.employeeName || "";
  formState.type = getComposerTimeOffType(composer);
  formState.date = formElements.dateInput?.value || "";
  formState.startDate = formElements.startDateInput?.value || "";
  formState.endDate = formElements.endDateInput?.value || "";
  formState.reason = formElements.reasonInput?.value || "";
}

function syncSwapFormStateFromFields() {
  const formState = getRequestComposerState("swap");

  formState.employeeName = swapEmployeeSelect?.value || formState.employeeName || "";
  formState.date = swapDateInput?.value || "";
  formState.entryValue = swapEntrySelect?.value || "";
  formState.targetEmployeeName = swapTargetEmployeeSelect?.value || "";
}

function applyActiveRequestComposerStateToFields() {
  const composer = activeRequestComposer || "";
  const formState = getRequestComposerState(composer);

  if (composer === "swap") {
    if (swapEmployeeSelect && formState.employeeName && swapEmployeeSelect.value !== formState.employeeName) {
      swapEmployeeSelect.value = formState.employeeName;
    }

    if (swapDateInput && swapDateInput.value !== (formState.date || "")) {
      swapDateInput.value = formState.date || "";
    }

    renderSwapEntryOptions();

    if (swapEntrySelect && swapEntrySelect.value !== (formState.entryValue || "")) {
      const entryOptionExists = Array.from(swapEntrySelect.options).some((option) => option.value === (formState.entryValue || ""));
      swapEntrySelect.value = entryOptionExists ? (formState.entryValue || "") : "";
    }

    renderSwapTargetOptions();

    if (swapTargetEmployeeSelect && swapTargetEmployeeSelect.value !== (formState.targetEmployeeName || "")) {
      const targetOptionExists = Array.from(swapTargetEmployeeSelect.options).some((option) => option.value === (formState.targetEmployeeName || ""));
      swapTargetEmployeeSelect.value = targetOptionExists ? (formState.targetEmployeeName || "") : "";
    }

    return;
  }

  const formElements = getTimeOffFormElements(composer);

  if (!formElements) {
    return;
  }

  if (formElements.employeeSelect && formState.employeeName && formElements.employeeSelect.value !== formState.employeeName) {
    formElements.employeeSelect.value = formState.employeeName;
  }

  if (formElements.dateInput && formElements.dateInput.value !== (formState.date || "")) {
    formElements.dateInput.value = formState.date || "";
  }

  if (formElements.startDateInput && formElements.startDateInput.value !== (formState.startDate || "")) {
    formElements.startDateInput.value = formState.startDate || "";
  }

  if (formElements.endDateInput && formElements.endDateInput.value !== (formState.endDate || "")) {
    formElements.endDateInput.value = formState.endDate || "";
  }

  if (formElements.reasonInput && formElements.reasonInput.value !== (formState.reason || "")) {
    formElements.reasonInput.value = formState.reason || "";
  }
}

function resetTimeOffComposer(options = {}) {
  const {
    nextComposer = activeRequestComposer,
    preserveEmployee = true
  } = options;

  editingTimeOffId = null;

  const formState = getRequestComposerState(nextComposer);
  const formElements = getTimeOffFormElements(nextComposer);

  if (formState && nextComposer !== "swap") {
    formState.employeeName = preserveEmployee ? (formElements?.employeeSelect?.value || formState.employeeName || "") : "";
    formState.type = getComposerTimeOffType(nextComposer);
    formState.date = "";
    formState.startDate = "";
    formState.endDate = "";
    formState.reason = "";
  }

  if (!formElements) {
    return;
  }

  if (!preserveEmployee && formElements.employeeSelect) {
    formElements.employeeSelect.value = "";
  }

  if (formElements.dateInput) {
    formElements.dateInput.value = "";
  }

  if (formElements.startDateInput) {
    formElements.startDateInput.value = "";
  }

  if (formElements.endDateInput) {
    formElements.endDateInput.value = "";
  }

  if (formElements.reasonInput) {
    formElements.reasonInput.value = "";
  }
}

function resetSwapComposer(options = {}) {
  const { preserveEmployee = true } = options;

  editingSwapId = null;

  ruilForm = {
    employeeName: preserveEmployee ? (swapEmployeeSelect?.value || ruilForm.employeeName || "") : "",
    date: "",
    entryValue: "",
    targetEmployeeName: ""
  };

  if (!preserveEmployee && swapEmployeeSelect) {
    swapEmployeeSelect.value = "";
  }

  if (swapDateInput) {
    swapDateInput.value = "";
  }

  if (swapEntrySelect) {
    swapEntrySelect.value = "";
  }

  if (swapTargetEmployeeSelect) {
    swapTargetEmployeeSelect.value = "";
  }

  if (swapSuggestionList) {
    swapSuggestionList.innerHTML = "";
    swapSuggestionList.classList.add("hidden");
    swapSuggestionList.hidden = true;
  }

  if (swapNoCandidateHelp) {
    swapNoCandidateHelp.classList.add("hidden");
    swapNoCandidateHelp.hidden = true;
  }

  if (swapEscalateButton) {
    swapEscalateButton.classList.add("hidden");
    swapEscalateButton.hidden = true;
    swapEscalateButton.disabled = false;
  }

  if (swapTargetHint) {
    swapTargetHint.textContent = "";
  }

  renderSwapEntryOptions();
  renderSwapTargetOptions();
}

function resetRequestComposerForms(nextComposer = activeRequestComposer) {
  const preserveEmployee = !isPlannerRole();
  resetTimeOffComposer({ nextComposer, preserveEmployee });
  resetSwapComposer({ preserveEmployee });
}

function activateRequestComposer(nextComposer, options = {}) {
  if (activeRequestComposer === "swap") {
    syncSwapFormStateFromFields();
  } else if (activeRequestComposer === "free" || activeRequestComposer === "vacation" || activeRequestComposer === "sick") {
    syncTimeOffFormStateFromFields(activeRequestComposer);
  }

  const { preserveValues = false } = options;
  const normalizedComposer = typeof nextComposer === "string" ? nextComposer : "";

  if (!preserveValues) {
    resetRequestComposerForms(normalizedComposer);
  }

  activeRequestComposer = normalizedComposer;
  activeRequestType = getRequestTypeFromComposer(normalizedComposer);
  renderRequestComposerState();
}

function activateRequestType(nextType, options = {}) {
  const normalizedType = typeof nextType === "string" ? nextType : "vrije-dag";
  activeRequestType = normalizedType;
  activateRequestComposer(getComposerFromRequestType(normalizedType), options);
}
function renderRequestsOpenCards() {
  if (isPlannerRole()) {
    setClassName(requestsOpenCards, "request-list hidden");
    requestsOpenCards.innerHTML = "";
    return;
  }

  const { visibleTimeOffRequests, visibleSwapRequests } = getVisibleRequestSources();
  const ownCards = [
    ...visibleTimeOffRequests.map((request) => ({
      type: getAbsenceTypeLabel(request.type),
      meta: `${getTimeOffDisplayRange(request)}${request.reason ? ` - ${request.reason}` : ""}`,
      status: getRequestDisplayStatus(request),
      label: getRequestDisplayLabel(request),
      typeClass: `absence-${getAbsenceCardClass(request.type)}`,
      sortDate: request.updatedAt || request.createdAt || request.date || ""
    })),
    ...visibleSwapRequests.map((request) => ({
      type: "Dienst ruilen",
      meta: `${request.shiftName} - ${formatDate(request.date)} - ${request.startTime} - ${request.endTime}`,
      status: getRequestDisplayStatus(request),
      label: getRequestDisplayLabel(request),
      typeClass: "",
      sortDate: request.updatedAt || request.createdAt || request.date || ""
    }))
  ].sort((cardA, cardB) => {
    const priorityMap = { overdue: 0, waiting: 1, open: 2, approved: 3, rejected: 4 };
    const priorityDifference = (priorityMap[cardA.status] ?? 9) - (priorityMap[cardB.status] ?? 9);
    if (priorityDifference !== 0) {
      return priorityDifference;
    }
    return cardB.sortDate.localeCompare(cardA.sortDate, "nl");
  });

  if (!ownCards.length) {
    setClassName(requestsOpenCards, "request-list request-list-compact empty");
    requestsOpenCards.innerHTML = `
      <div class="request-mini-heading">Mijn aanvragen</div>
      <div class="request-mini-empty">Nog geen aanvragen.</div>
    `;
    return;
  }

  setClassName(requestsOpenCards, "request-list request-list-compact");
  requestsOpenCards.innerHTML = `
    <div class="request-mini-heading">Mijn aanvragen</div>
    ${ownCards.map((card) => `
    <article class="request-card compact-request-card is-${card.status} ${card.typeClass}">
      <div class="request-top">
        <strong>${card.type}</strong>
        <span class="status-pill status-${card.status}">${card.label}</span>
      </div>
      <div class="request-meta">${card.meta}</div>
    </article>
  `).join("")}
  `;
}

function renderRequestComposerState() {
  const normalizedComposer = activeRequestComposer || getComposerFromRequestType(activeRequestType) || "free";
  activeRequestComposer = normalizedComposer;
  activeRequestType = getRequestTypeFromComposer(normalizedComposer);
  applyActiveRequestComposerStateToFields();
  const isEmployee = !isPlannerRole();
  const requestEmployeeLabels = [
    requestFreeComposer?.querySelector(".employee-picker-control"),
    requestVacationComposer?.querySelector(".employee-picker-control"),
    requestSickComposer?.querySelector(".employee-picker-control"),
    requestSwapComposer?.querySelector(".employee-picker-control")
  ].filter(Boolean);
  const swapDateLabel = swapDateInput?.closest("label") || null;

  requestTypeFreeButton?.classList.toggle("active", activeRequestType === "vrije-dag");
  requestTypeVacationButton?.classList.toggle("active", activeRequestType === "vakantie");
  requestTypeSickButton?.classList.toggle("active", activeRequestType === "ziekmelding");
  requestTypeSwapButton?.classList.toggle("active", activeRequestType === "ruilen");
  if (requestsTopPanel) {
    requestsTopPanel.dataset.activeTab = activeRequestType;
  }
  if (swapDateLabel) {
    swapDateLabel.classList.toggle("hidden", isEmployee);
    swapDateLabel.hidden = isEmployee;
  }
  requestEmployeeLabels.forEach((label) => {
    label.classList.toggle("hidden", isEmployee);
    label.hidden = isEmployee;
  });

  requestFreeComposer?.classList.toggle("hidden", activeRequestType !== "vrije-dag");
  requestVacationComposer?.classList.toggle("hidden", activeRequestType !== "vakantie");
  requestSickComposer?.classList.toggle("hidden", activeRequestType !== "ziekmelding");
  requestSwapComposer?.classList.toggle("hidden", activeRequestType !== "ruilen");
  if (requestFreeComposer) {
    requestFreeComposer.hidden = activeRequestType !== "vrije-dag";
  }
  if (requestVacationComposer) {
    requestVacationComposer.hidden = activeRequestType !== "vakantie";
  }
  if (requestSickComposer) {
    requestSickComposer.hidden = activeRequestType !== "ziekmelding";
  }
  if (requestSwapComposer) {
    requestSwapComposer.hidden = activeRequestType !== "ruilen";
  }

  if (isEmployee) {
    requestsOpenSummary?.classList.toggle("hidden", true);
    if (requestsOpenSummary) {
      requestsOpenSummary.hidden = true;
    }
    requestsEmployeeBadge?.classList.toggle("hidden", true);
    if (requestsEmployeeBadge) {
      requestsEmployeeBadge.hidden = true;
    }
    requestsOpenCards?.classList.remove("hidden");
    if (requestsOpenCards) {
      requestsOpenCards.hidden = false;
    }
    if (requestTimeOffPanel) {
      requestTimeOffPanel.classList.toggle("hidden", true);
      requestTimeOffPanel.hidden = true;
    }
    if (requestSwapPanel) {
      requestSwapPanel.classList.toggle("hidden", true);
      requestSwapPanel.hidden = true;
    }
  } else {
    requestsOpenSummary?.classList.remove("hidden");
    if (requestsOpenSummary) {
      requestsOpenSummary.hidden = false;
    }
    requestsEmployeeBadge?.classList.remove("hidden");
    if (requestsEmployeeBadge) {
      requestsEmployeeBadge.hidden = false;
    }
    requestsOpenCards?.classList.remove("hidden");
    if (requestsOpenCards) {
      requestsOpenCards.hidden = false;
    }
    if (requestTimeOffPanel) {
      requestTimeOffPanel.classList.remove("hidden");
      requestTimeOffPanel.hidden = false;
    }
    if (requestSwapPanel) {
      requestSwapPanel.classList.remove("hidden");
      requestSwapPanel.hidden = false;
    }
  }

  if (!isMobileView()) {
    requestFreeComposer?.classList.toggle("request-form-hidden-mobile", activeRequestType !== "vrije-dag");
    requestVacationComposer?.classList.toggle("request-form-hidden-mobile", activeRequestType !== "vakantie");
    requestSickComposer?.classList.toggle("request-form-hidden-mobile", activeRequestType !== "ziekmelding");
    requestSwapComposer?.classList.toggle("request-form-hidden-mobile", activeRequestType !== "ruilen");
    return;
  }

  requestFreeComposer?.classList.toggle("request-form-hidden-mobile", activeRequestType !== "vrije-dag");
  requestVacationComposer?.classList.toggle("request-form-hidden-mobile", activeRequestType !== "vakantie");
  requestSickComposer?.classList.toggle("request-form-hidden-mobile", activeRequestType !== "ziekmelding");
  requestSwapComposer?.classList.toggle("request-form-hidden-mobile", activeRequestType !== "ruilen");
}

function isEntryOutsideFixedRoster(entry) {
  const shift = getShiftForEntry(entry) || {
    id: entry.shiftId || entry.shiftName || "",
    name: getShiftName(entry),
    startTime: entry.startTime,
    endTime: entry.endTime
  };
  return getEmployeePlanningPatternMatch(entry.name, shift, entry.day, getWeekValueFromDate(entry.day)).score >= 55;
}

function renderControlModeOverview(weekDates, visibleEntries) {
  if (!controlModeOverview) {
    return;
  }

  if (!isPlannerRole() || !isControlModeActive()) {
    setClassName(controlModeOverview, "control-mode-overview hidden");
    controlModeOverview.innerHTML = "";
    return;
  }

  const autoCount = visibleEntries.filter((entry) => entry.proposed && weekDates.includes(entry.day)).length;
  const replacementCount = visibleEntries.filter((entry) => entry.replacementFor && weekDates.includes(entry.day)).length;
  const deviationCount = visibleEntries.filter((entry) => weekDates.includes(entry.day) && isEntryOutsideFixedRoster(entry)).length;
  const openCount = weekDates.reduce((total, day) => total + getRequiredDayPlannerShifts(day).filter((shift) => !getEntryForShiftOnDate(day, shift)).length, 0);
  const weekValue = weekInput?.value || getCurrentWeekValue();
  const contractEmployees = getEmployeesWithFavoritesFirst(getActiveEmployees())
    .filter((employeeName) => getEmployeeContractHours(employeeName) > 0)
    .map((employeeName) => {
      const contractHours = getEmployeeContractHours(employeeName);
      const plannedHours = getEmployeeWeekHours(employeeName, weekValue, visibleEntries);
      const difference = Math.round((plannedHours - contractHours) * 10) / 10;
      const stateClass = difference > 1
        ? "is-over"
        : difference < -1
          ? "is-under"
          : "is-match";

      return {
        employeeName,
        contractHours,
        plannedHours,
        difference,
        stateClass
      };
    });

  setClassName(controlModeOverview, "control-mode-overview");
  controlModeOverview.innerHTML = `
    <div class="control-mode-card">
      <strong>Controlemodus</strong>
      <div class="control-mode-stats">
        <span class="control-flag is-auto">Automatisch ${autoCount}</span>
        <span class="control-flag is-deviation">Afwijking ${deviationCount}</span>
        <span class="control-flag is-replacement">Vervanging ${replacementCount}</span>
        <span class="control-flag is-open">Open ${openCount}</span>
      </div>
      ${contractEmployees.length ? `
        <div class="control-contract-overview">
          <strong>Contracturen medewerkers met vast contract</strong>
          <div class="control-contract-list">
            ${contractEmployees.map((employee) => `
              <div class="control-contract-row ${employee.stateClass}">
                <span class="control-contract-name">${employee.employeeName}</span>
                <span class="control-contract-hours">${formatHours(employee.contractHours)} / ${formatHours(employee.plannedHours)}</span>
                <span class="control-contract-diff">${employee.difference === 0 ? "Op contract" : `${employee.difference > 0 ? "+" : ""}${formatHours(Math.abs(employee.difference))}`}</span>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}
    </div>
  `;
}

function updateWeekViewTitle() {
  const currentWeek = getCurrentWeekValue();
  const selectedWeek = weekFilterInput.value || currentWeek;

  if (selectedWeek === currentWeek) {
    weekViewTitle.textContent = "Rooster deze week";
    return;
  }

  if (selectedWeek === getNextWeekValue(currentWeek)) {
    weekViewTitle.textContent = "Volgende week";
    return;
  }

  weekViewTitle.textContent = `Rooster week ${selectedWeek.replace("-W", " - ")}`;
}

function clearPlannerWeekInsights() {
  if (weekReviewStatusPanel) {
    setClassName(weekReviewStatusPanel, "week-review-status hidden");
    weekReviewStatusPanel.innerHTML = "";
  }
  if (completeReviewButton) {
    completeReviewButton.disabled = false;
    completeReviewButton.textContent = "Controle afronden";
  }
  if (plannerControlPanel) {
    setClassName(plannerControlPanel, "planner-control-panel hidden");
    plannerControlPanel.innerHTML = "";
  }
  if (weekStatusOverview) {
    setClassName(weekStatusOverview, "week-status-overview hidden");
    weekStatusOverview.innerHTML = "";
  }
  if (autoFillSummaryOverview) {
    setClassName(autoFillSummaryOverview, "auto-fill-summary-overview hidden");
    autoFillSummaryOverview.innerHTML = "";
  }
  if (plannerContractOverview) {
    setClassName(plannerContractOverview, "planner-contract-overview hidden");
    plannerContractOverview.innerHTML = "";
  }
  if (deviationWhyOverview) {
    setClassName(deviationWhyOverview, "deviation-why-overview hidden");
    deviationWhyOverview.innerHTML = "";
  }
  if (openReplacementOverview) {
    setClassName(openReplacementOverview, "open-replacement-overview hidden");
    openReplacementOverview.innerHTML = "";
  }
  if (weekReplacementOverview) {
    setClassName(weekReplacementOverview, "week-replacement-overview hidden");
    weekReplacementOverview.innerHTML = "";
  }
  if (controlModeOverview) {
    setClassName(controlModeOverview, "control-mode-overview hidden");
    controlModeOverview.innerHTML = "";
  }
  rosterLegend?.classList.add("hidden");
}

function isFocusModeActive() {
  return isFocusModeActiveStateHelper(activeTab, activeRole, preferences);
}

function isControlModeActive() {
  return isControlModeActiveStateHelper(activeTab, activeRole, preferences);
}

function isDeviationOnlyModeActive() {
  return isDeviationOnlyModeActiveStateHelper(activeTab, activeRole, preferences);
}

function updateFocusModeUI() {
  const isActive = isFocusModeActive();
  const isControlActive = isControlModeActive();
  const isDeviationOnlyActive = isDeviationOnlyModeActive();

  document.body.dataset.focusMode = isActive ? "planner" : "off";
  document.body.dataset.controlMode = isControlActive ? "planner" : "off";
  document.body.dataset.activeTab = activeTab;
  appShell?.classList.toggle("focus-week-mode", isActive);

  if (focusModeButton) {
    focusModeButton.classList.toggle("hidden", !isPlannerRole() || !(activeTab === "week-current" || activeTab === "week-next"));
    focusModeButton.classList.toggle("active", isActive);
    focusModeButton.textContent = isActive ? "Focusmodus uit" : "Focusmodus aan";
  }

  if (controlModeButton) {
    controlModeButton.classList.toggle("hidden", !isPlannerRole() || !(activeTab === "week-current" || activeTab === "week-next"));
    controlModeButton.classList.toggle("active", isControlActive);
    controlModeButton.textContent = isControlActive ? "Controlemodus uit" : "Controlemodus aan";
  }

  if (deviationOnlyButton) {
    deviationOnlyButton.classList.toggle("hidden", !isPlannerRole() || !(activeTab === "week-current" || activeTab === "week-next"));
    deviationOnlyButton.classList.toggle("active", isDeviationOnlyActive);
    deviationOnlyButton.textContent = isDeviationOnlyActive ? "Alles tonen" : "Alleen afwijkingen tonen";
  }
}

function isWeekTabName(tabName) {
  return isWeekTabNameHelper(tabName);
}

function scrollToPlannerEmployee(employeeName) {
  if (!employeeName) {
    return false;
  }

  const contractRow = document.querySelector(`[data-contract-employee="${employeeName}"]`);

  if (contractRow) {
    contractRow.scrollIntoView({ behavior: "smooth", block: "center" });
    contractRow.classList.add("is-jump-highlight");
    window.setTimeout(() => contractRow.classList.remove("is-jump-highlight"), 1600);
    return true;
  }

  const shiftCard = scheduleBoard?.querySelector(`.shift-card[data-employee-name="${employeeName}"]`);

  if (shiftCard) {
    shiftCard.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    shiftCard.classList.add("is-jump-highlight");
    window.setTimeout(() => shiftCard.classList.remove("is-jump-highlight"), 1600);
    return true;
  }

  return false;
}

function scrollToPlannerShift(day, shiftId) {
  if (!day || !shiftId || !scheduleBoard) {
    return false;
  }

  const targetCard = scheduleBoard.querySelector(`.shift-card[data-day="${day}"][data-shift-id="${shiftId}"]`);

  if (!targetCard) {
    return false;
  }

  targetCard.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  targetCard.classList.add("is-jump-highlight");
  window.setTimeout(() => targetCard.classList.remove("is-jump-highlight"), 1600);
  return true;
}

function getNormalizedTabName(tabName) {
  const nextTabName = String(tabName || "").trim();

  if (!nextTabName) {
    return getDefaultTabForCurrentRole();
  }

  const hasMatchingButton = navTabs.some((button) => button.dataset.tab === nextTabName) ||
    mobileNavButtons.some((button) => button.dataset.goTab === nextTabName) ||
    quickLinks.some((button) => button.dataset.goTab === nextTabName);
  const hasMatchingPanel = appPanels.some((panel) =>
    panel.dataset.panel === nextTabName ||
    (isWeekTabName(nextTabName) && (panel.hasAttribute("data-week-panel") || panel.dataset.panel === "week-summary"))
  );

  return hasMatchingButton || hasMatchingPanel ? nextTabName : getDefaultTabForCurrentRole();
}

function updateTabVisibility() {
  activeTab = getNormalizedTabName(activeTab);
  const isWeekTab = isWeekTabName(activeTab);

  navTabs.forEach((button) => {
    const isAllowed = isTabAllowedForCurrentRole(button.dataset.tab);
    button.classList.toggle("hidden-by-role", !isAllowed);
    button.hidden = !isAllowed;
    button.setAttribute("aria-hidden", isAllowed ? "false" : "true");
    button.classList.toggle("active", button.dataset.tab === activeTab);
  });

  mobileNavButtons.forEach((button) => {
    const isRosterButton = button.dataset.goTab === "week-current";
    const isRosterTab = isWeekTab;
    button.classList.toggle("active", isRosterButton ? isRosterTab : button.dataset.goTab === activeTab);
  });

  appPanels.forEach((panel) => {
    const shouldShow = panel.dataset.panel === activeTab ||
      (isWeekTab && (panel.hasAttribute("data-week-panel") || panel.dataset.panel === "week-summary"));
    const plannerOnly = panel.classList.contains("role-planner");
    let isVisible = shouldShow && (!plannerOnly || isPlannerRole());

    if (isWeekTab && (panel === form || panel === dayPlannerPanel || panel === totalsCard)) {
      isVisible = false;
    }

    panel.classList.toggle("is-active", isVisible);
    panel.hidden = !isVisible;
    panel.style.display = isVisible ? "" : "none";
    panel.setAttribute("aria-hidden", isVisible ? "false" : "true");
  });

  updateFocusModeUI();
}

function resetTabScrollPosition() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  document.querySelector(".container")?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  document.querySelector(".app-shell")?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
}

function setActiveTab(tabName, options = {}) {
  const normalizedTabName = getNormalizedTabName(tabName);

  if (
    activeTab === "employees" &&
    normalizedTabName !== "employees" &&
    !options.skipEmployeeUnsavedCheck
  ) {
    const employeeName = getSelectedEmployeeAdminName();
    const navigationChoice = confirmEmployeeEditorNavigation(employeeName);

    if (navigationChoice === "cancel") {
      updateTabVisibility();
      return;
    }
  }

  if (handleBlockedTabAccess(normalizedTabName)) {
    updateTabVisibility();
    resetTabScrollPosition();
    render();
    return;
  }

  activeTab = normalizedTabName;
  updateTabVisibility();
  resetTabScrollPosition();

  const currentWeek = getCurrentWeekValue();

  if (normalizedTabName === "week-current") {
    weekFilterInput.value = currentWeek;
    weekInput.value = currentWeek;
    hoursWeekInput.value = currentWeek;
    if (!isPlannerRole()) {
      activeEmployeeWeekView = "today";
    }
  }

  if (normalizedTabName === "week-next") {
    const nextWeek = getNextWeekValue(currentWeek);
    weekFilterInput.value = nextWeek;
    weekInput.value = nextWeek;
    hoursWeekInput.value = nextWeek;
  }

  if (normalizedTabName === "my-hours" && !isPlannerRole() && !options.preserveMyHoursSection) {
    activeMyHoursSection = "";
    activeMyHoursEntryMode = "planned";
  }

  if (normalizedTabName === "requests") {
    activeRequestType = "vrije-dag";
    activeRequestComposer = "free";
  }

  updateWeekViewTitle();
  render();
}

function isDefaultFreeDay(dateValue) {
  const weekday = new Date(`${dateValue}T00:00:00`).getDay();
  return weekday === 0 || weekday === 1;
}

function findConflict(name, day, startTime, endTime, ignoredIndex = editIndex) {
  const newStart = timeToMinutes(startTime);
  const newEnd = timeToMinutes(endTime);

  return entries.find((entry, index) => {
    if (index === ignoredIndex) {
      return false;
    }

    if (entry.name !== name || entry.day !== day) {
      return false;
    }

    const existingStart = timeToMinutes(entry.startTime);
    const existingEnd = timeToMinutes(entry.endTime);
    const isExactMatch = entry.startTime === startTime && entry.endTime === endTime;
    const isOverlapping = newStart < existingEnd && newEnd > existingStart;

    return isExactMatch || isOverlapping;
  });
}

function findShiftAssignmentConflict(day, selectedShift, ignoredIndex = editIndex) {
  if (!selectedShift) {
    return null;
  }

  return entries.find((entry, index) => {
    if (index === ignoredIndex || entry.day !== day) {
      return false;
    }

    return getShiftName(entry).toLowerCase() === selectedShift.name.toLowerCase();
  });
}

function getRequiredDayPlannerShifts(dateValue) {
  return getRequiredDayPlannerShiftsHelper(dateValue, {
    getDayPlannerShifts,
    isOptionalShift
  });
}

function getShiftValidationError(day, selectedShift, ignoredIndex = editIndex) {
  if (day && isClosedPlannerDay(day)) {
    const specialDay = getRecognizedSpecialDayInfo(day);
    return `${specialDay?.nameLabel || formatDate(day)} is een gesloten dag. Er kunnen geen diensten worden ingepland.`;
  }

  if (!selectedShift) {
    return "";
  }

  const assignmentConflict = findShiftAssignmentConflict(day, selectedShift, ignoredIndex);

  if (assignmentConflict) {
    return `De dienst ${selectedShift.name} is op ${formatDate(day)} al toegewezen aan ${assignmentConflict.name}. Kies een andere dienst of pas de planning aan voordat je opslaat.`;
  }

  if (selectedShift.isShopShift) {
    const allowedShift = getShopSlotsForDate(day).some((shift) => shift.name === selectedShift.name);

    if (!allowedShift) {
      return `De dienst ${selectedShift.name} is niet nodig op ${formatDate(day)} volgens de huidige winkelbezetting.`;
    }
  }

  if (selectedShift.isAllroundShift) {
    const allowedShift = getAllroundSlotsForDate(day).some((shift) => shift.name === selectedShift.name);

    if (!allowedShift) {
      return `De dienst ${selectedShift.name} is niet beschikbaar op ${formatDate(day)}.`;
    }
  }

  return "";
}

function getOpenReplacementItems(weekValue) {
  return getOpenReplacementItemsHelper(weekValue, {
    getWeekDates,
    getRequiredDayPlannerShifts,
    isBakeryCoreShift,
    getStandardShiftCoverageInfo,
    getEntryForShiftOnDate,
    getSuitableEmployeesForShift
  });
}

function getWeekReplacementItems(weekValue) {
  return getWeekReplacementItemsHelper(weekValue, {
    getOpenReplacementItems,
    entries,
    getWeekValueFromDate,
    getShiftName,
    getShiftForEntry,
    getSuitableEmployeesForShift
  });
}

function renderOpenReplacementOverview(weekValue) {
  if (!openReplacementOverview) {
    return;
  }

  if (!isPlannerRole()) {
    setClassName(openReplacementOverview, "open-replacement-overview hidden");
    openReplacementOverview.innerHTML = "";
    return;
  }

  const replacementItems = getOpenReplacementItems(weekValue);

  setClassName(openReplacementOverview, "open-replacement-overview");
  if (!replacementItems.length) {
    openReplacementOverview.innerHTML = `
      <div class="open-replacement-card is-complete">
        <strong>Open vervanging nodig</strong>
        <span>Geen open vervangingen in deze week.</span>
      </div>
    `;
    return;
  }

  openReplacementOverview.innerHTML = `
    <div class="open-replacement-card">
      <div class="open-replacement-title">
        <strong>Open vervanging nodig</strong>
        <span>${replacementItems.length} dienst(en) vragen aandacht</span>
      </div>
      <div class="open-replacement-list">
        ${replacementItems.map((item) => `
          <article class="open-replacement-item">
            <div class="open-replacement-meta">
              <strong>${formatWeekday(item.day)} - ${item.shift.name}</strong>
                    <span>${formatDate(item.day)} · Normaal ${item.normalEmployee}${item.reason ? ` (${item.reason})` : ""}</span>
            </div>
            <div class="open-replacement-actions">
              <label class="sr-only" for="replacement-${item.day}-${item.shift.id}">Vervanger kiezen</label>
              <select id="replacement-${item.day}-${item.shift.id}" data-replacement-day="${item.day}" data-replacement-shift="${item.shift.id}" data-replacement-normal="${item.normalEmployee}">
                <option value="">Kies vervanger</option>
                ${item.suitableEmployees.map((employeeName) => `<option value="${employeeName}">${employeeName}</option>`).join("")}
              </select>
            </div>
            ${item.suitableEmployees.length === 0 ? '<span class="open-replacement-warning">Geen geschikte medewerker</span>' : ""}
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function renderWeekReplacementOverview(weekValue) {
  if (!weekReplacementOverview) {
    return;
  }

  const replacementItems = getWeekReplacementItems(weekValue);

  setClassName(weekReplacementOverview, "week-replacement-overview");
  if (!replacementItems.length) {
    weekReplacementOverview.innerHTML = `
      <div class="week-replacement-card is-empty">
        <strong>Vervangingen deze week</strong>
        <span>Geen vervangingen in deze week.</span>
      </div>
    `;
    return;
  }

  weekReplacementOverview.innerHTML = `
    <div class="week-replacement-card">
      <div class="week-replacement-title">
        <strong>Vervangingen deze week</strong>
        <span>${replacementItems.length} regel(s)</span>
      </div>
      <div class="week-replacement-list">
        ${replacementItems.map((item) => `
          <div class="week-replacement-row ${item.isOpen ? "is-open" : "is-filled"}">
            <div class="week-replacement-main">
              <span>${formatWeekday(item.day)}</span>
              <span>${item.shiftName}</span>
              <span>${item.normalEmployee}</span>
              <span>${item.isOpen ? "Open vervanging" : item.replacementEmployee}</span>
            </div>
            <div class="week-replacement-actions">
              <label class="sr-only" for="week-replacement-${item.day}-${item.shiftId}">Vervanger kiezen</label>
              <select
                id="week-replacement-${item.day}-${item.shiftId}"
                data-week-replacement-day="${item.day}"
                data-week-replacement-shift="${item.shiftId}"
                data-week-replacement-normal="${item.normalEmployee}"
              >
                <option value="">${item.isOpen ? "Kies vervanger" : "Wijzig vervanger"}</option>
                ${item.suitableEmployees.map((employeeName) => `
                  <option value="${employeeName}" ${item.replacementEmployee === employeeName ? "selected" : ""}>${employeeName}</option>
                `).join("")}
              </select>
              ${!item.isOpen ? `
                <button
                  type="button"
                  class="small warning"
                  data-week-replacement-action="delete"
                  data-week-replacement-day="${item.day}"
                  data-week-replacement-shift="${item.shiftId}"
                >
                  Verwijderen
                </button>
              ` : ""}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function updateFormState() {
  submitButton.textContent = editIndex === null ? "Opslaan" : "Wijziging opslaan";
  cancelButton.classList.toggle("hidden", editIndex === null);
}

function updateShiftFormState() {
  addShiftButton.textContent = editingShiftId === null ? "Dienst toevoegen" : "Dienst opslaan";
  cancelShiftButton.classList.toggle("hidden", editingShiftId === null);
}

function resetShiftForm() {
  newShiftNameInput.value = "";
  newShiftColorInput.value = "shift-tone-oven";
  newShiftStartInput.value = "";
  newShiftEndInput.value = "";
  editingShiftId = null;
  updateShiftFormState();
}

function getNextEntryDateValue(currentDate, weekValue) {
  if (!currentDate) {
    return "";
  }

  const nextDate = new Date(`${currentDate}T00:00:00`);
  nextDate.setDate(nextDate.getDate() + 1);
  const nextDateValue = nextDate.toISOString().slice(0, 10);

  return getWeekValueFromDate(nextDateValue) === weekValue ? nextDateValue : currentDate;
}

function resetForm(options = {}) {
  const { nextDate = "" } = options;
  const selectedWeek = weekFilterInput.value || weekInput.value || getCurrentWeekValue();
  form.reset();
  weekInput.value = selectedWeek;
  copyTargetWeekInput.value = selectedWeek;
  copySourceWeekInput.value = getPreviousWeekValue(selectedWeek);
  nameSelect.value = "";
  presetShiftSelect.value = "";
  clearSelectedWeekdays();
  editIndex = null;
  updateFormState();
  applySavedPreferences();
  document.getElementById("day").value = nextDate || "";
  renderShiftSelectors();
  renderEmployeeSelectors();
}

function getSortedEntries(sourceEntries = getPlanningEntries()) {
  return sourceEntries
    .map((entry, index) => ({ ...entry, index: entry.proposed ? -1 : index }))
    .sort((entryA, entryB) => {
      const dayCompare = entryA.day.localeCompare(entryB.day);

      if (dayCompare !== 0) {
        return dayCompare;
      }

      return entryA.startTime.localeCompare(entryB.startTime);
    });
}

function getFilteredEntries(sourceEntries = getPlanningEntries()) {
  const selectedWeek = weekFilterInput.value;
  const employeeFilter = isPlannerRole() ? employeeFilterInput.value.trim().toLowerCase() : "";
  const employeeSearch = isPlannerRole() ? employeeSearchInput.value.trim().toLowerCase() : "";
  const dayFilter = isPlannerRole() ? dayFilterInput.value : "";
  const sourceIsPlanningEntries = sourceEntries === getPlanningEntries();
  const scopedEmployeeName = getRoleScopedEmployeeName();
  const cacheKey = sourceIsPlanningEntries
    ? `${planningDataRevision}:${previewDataRevision}:${activeRole}:${scopedEmployeeName || ""}:${selectedWeek}:${employeeFilter}:${employeeSearch}:${dayFilter}`
    : "";

  if (cacheKey && derivedDataCache.filteredEntriesKey === cacheKey) {
    return derivedDataCache.filteredEntries;
  }

  const visibleEntries = getEntriesVisibleForCurrentRole(sourceEntries);

  const nextEntries = getSortedEntries(visibleEntries).filter((entry) => {
    const matchesWeek = getWeekValueFromDate(entry.day) === selectedWeek;
    const matchesEmployee = employeeFilter === "" || entry.name.toLowerCase() === employeeFilter;
    const matchesSearch = employeeSearch === "" || entry.name.toLowerCase().includes(employeeSearch);
    const matchesDay = dayFilter === "" || formatWeekday(entry.day).toLowerCase() === dayFilter;

    return matchesWeek && matchesEmployee && matchesSearch && matchesDay;
  });

  if (cacheKey) {
    derivedDataCache.filteredEntriesKey = cacheKey;
    derivedDataCache.filteredEntries = nextEntries;
  }

  return nextEntries;
}

function renderEmployeeFilterOptions() {
  const selectedValue = employeeFilterInput.value;
  const names = isPlannerRole()
    ? [...employees]
    : (getRoleScopedEmployeeName() ? [getRoleScopedEmployeeName()] : []);

  employeeFilterInput.innerHTML = `
    <option value="">Alle medewerkers</option>
    ${names.map((name) => `<option value="${name.toLowerCase()}">${name}</option>`).join("")}
  `;

  employeeFilterInput.value = names.some((name) => name.toLowerCase() === selectedValue) ? selectedValue : "";
}

function getEmployeeSearchValue(input) {
  return input?.value.trim().toLowerCase() || "";
}

function filterEmployeesBySearch(names, input) {
  const searchValue = getEmployeeSearchValue(input);

  if (!searchValue) {
    return [...names];
  }

  return names.filter((name) => name.toLowerCase().includes(searchValue));
}

function buildEmployeeOptions(names) {
  return names.map((employee) => `<option value="${employee}">${employee}</option>`).join("");
}

function getFavoriteEmployees() {
  return (preferences.favoriteEmployees || []).filter((name) => employees.includes(name));
}

function isFavoriteEmployee(employeeName) {
  return getFavoriteEmployees().includes(employeeName);
}

function getEmployeesWithFavoritesFirst(sourceEmployees = employees) {
  const sourceSet = new Set(sourceEmployees);
  const favorites = new Set((preferences.favoriteEmployees || []).filter((name) => sourceSet.has(name)));

  return [...sourceEmployees].sort((employeeA, employeeB) => {
    const favoriteCompare = Number(favorites.has(employeeB)) - Number(favorites.has(employeeA));

    if (favoriteCompare !== 0) {
      return favoriteCompare;
    }

    return employeeA.localeCompare(employeeB, "nl");
  });
}

function toggleFavoriteEmployee(employeeName) {
  const currentFavorites = new Set(getFavoriteEmployees());

  if (currentFavorites.has(employeeName)) {
    currentFavorites.delete(employeeName);
  } else {
    currentFavorites.add(employeeName);
  }

  preferences.favoriteEmployees = [...currentFavorites].sort((nameA, nameB) => nameA.localeCompare(nameB, "nl"));
  savePreferences();
}

function renderEmployeeSelectors() {
  const selectedName = nameSelect.value;
  const selectedRemoveName = removeEmployeeSelect.value;
  const selectedTimeOffEmployees = getAllTimeOffEmployeeSelects().map((select) => select.value);
  const selectedSwapEmployee = swapEmployeeSelect.value;
  const selectedSwapTargetEmployee = swapTargetEmployeeSelect.value;
  const selectedPortalEmployee = portalEmployeeSelect.value;
  const selectedHoursEmployee = hoursEmployeeSelect.value;
  const selectedApprovalEmployee = approvalEmployeeSelect?.value || "";
  const selectedCurrentEmployee = currentEmployeeSelect.value;
  const selectedShift = getSelectedShift(
    presetShiftSelect.value,
    document.getElementById("startTime").value,
    document.getElementById("endTime").value,
    document.getElementById("day").value
  );
  const planningDay = document.getElementById("day").value;
  const planningStart = document.getElementById("startTime").value;
  const planningEnd = document.getElementById("endTime").value;
  const authorizedEmployees = getAuthorizedEmployeesForShift(selectedShift?.name);
  const suitableEmployees = getSuitableEmployeesForShift(selectedShift, planningDay, planningStart, planningEnd);
  const filteredPlanningEmployees = filterEmployeesBySearch(suitableEmployees, planningEmployeeSearchInput);
  const activeEmployees = getEmployeesWithFavoritesFirst(getActiveEmployees());
  const allEmployeesSorted = getEmployeesWithFavoritesFirst(employees);
  const filteredPortalEmployees = filterEmployeesBySearch(allEmployeesSorted, portalEmployeeSearchInput);
  const filteredHoursEmployees = filterEmployeesBySearch(allEmployeesSorted, hoursEmployeeSearchInput);
  const options = buildEmployeeOptions(allEmployeesSorted);
  const activeOptions = buildEmployeeOptions(activeEmployees);
  const planningOptions = buildEmployeeOptions(filteredPlanningEmployees);
  const employeeIdentity = getEmployeeIdentity();
  const ownEmployeeOptions = employeeIdentity ? buildEmployeeOptions([employeeIdentity]) : "";
  const portalOptions = isPlannerRole() ? buildEmployeeOptions(filteredPortalEmployees) : ownEmployeeOptions;
  const hoursOptions = isPlannerRole() ? buildEmployeeOptions(filteredHoursEmployees) : ownEmployeeOptions;

  nameSelect.innerHTML = `<option value="">${selectedShift ? "Kies geschikte medewerker" : "Kies medewerker"}</option>${planningOptions}`;
  removeEmployeeSelect.innerHTML = `<option value="">Kies medewerker voor statuswijziging</option>${options}`;
  getAllTimeOffEmployeeSelects().forEach((select) => {
    select.innerHTML = isPlannerRole()
      ? `<option value="">Kies medewerker</option>${activeOptions}`
      : `<option value="">Kies medewerker</option>${ownEmployeeOptions}`;
  });
  swapEmployeeSelect.innerHTML = isPlannerRole()
    ? `<option value="">Kies medewerker</option>${activeOptions}`
    : `<option value="">Kies medewerker</option>${ownEmployeeOptions}`;
  swapTargetEmployeeSelect.innerHTML = `<option value="__open__">Open aanbieden</option><option value="">Kies medewerker</option>`;
  portalEmployeeSelect.innerHTML = `<option value="">Kies medewerker</option>${portalOptions}`;
  hoursEmployeeSelect.innerHTML = `<option value="">Kies medewerker</option>${hoursOptions}`;
  if (approvalEmployeeSelect) {
    approvalEmployeeSelect.innerHTML = `<option value="">Alle medewerkers</option>${options}`;
  }
  currentEmployeeSelect.innerHTML = `<option value="">Kies medewerker</option>${activeOptions}`;

  nameSelect.value = suitableEmployees.includes(selectedName) ? selectedName : "";
  removeEmployeeSelect.value = employees.includes(selectedRemoveName) ? selectedRemoveName : "";
  getAllTimeOffEmployeeSelects().forEach((select, index) => {
    const selectedValue = selectedTimeOffEmployees[index] || "";
    select.value = getActiveEmployees().includes(selectedValue) ? selectedValue : "";
  });
  swapEmployeeSelect.value = getActiveEmployees().includes(selectedSwapEmployee) ? selectedSwapEmployee : "";
  swapTargetEmployeeSelect.value = selectedSwapTargetEmployee;
  portalEmployeeSelect.value = filteredPortalEmployees.includes(selectedPortalEmployee) ? selectedPortalEmployee : "";
  hoursEmployeeSelect.value = filteredHoursEmployees.includes(selectedHoursEmployee) ? selectedHoursEmployee : "";
  if (approvalEmployeeSelect) {
    approvalEmployeeSelect.value = employees.includes(selectedApprovalEmployee) ? selectedApprovalEmployee : "";
  }
  currentEmployeeSelect.value = getActiveEmployees().includes(selectedCurrentEmployee) ? selectedCurrentEmployee : "";

  if (!isPlannerRole() && employeeIdentity) {
    syncScopedEmployeeSelectors(employeeIdentity);
  }

  const employeeLocked = !isPlannerRole() && Boolean(employeeIdentity);
  currentEmployeeSelect.disabled = isPlannerRole() || employeeLocked;
  portalEmployeeSelect.disabled = employeeLocked;
  hoursEmployeeSelect.disabled = employeeLocked;
  getAllTimeOffEmployeeSelects().forEach((select) => {
    select.disabled = employeeLocked;
  });
  swapEmployeeSelect.disabled = employeeLocked;
  populateLoginEmployeeSelect();

  updateRoleContextBadge(currentEmployeeBadge, getRoleScopedEmployeeName());
  updateRoleContextBadge(portalEmployeeBadge, getRoleScopedEmployeeName(portalEmployeeSelect.value));
  updateRoleContextBadge(hoursEmployeeBadge, getRoleScopedEmployeeName(hoursEmployeeSelect.value));
  renderSwapTargetOptions();

  if (!planningAuthorizationHint) {
    return;
  }

  if (!selectedShift) {
    planningAuthorizationHint.classList.add("hidden");
    planningAuthorizationHint.textContent = "";
    nameSelect.disabled = false;
    return;
  }

  if (suitableEmployees.length === 0) {
    const reasonText = authorizedEmployees.length === 0
      ? `Voor ${selectedShift.name} is nog niemand bevoegd. Pas de bevoegdheden aan in Medewerkers.`
      : planningDay
        ? `Voor ${selectedShift.name} is nu niemand beschikbaar op ${formatDate(planningDay)}.`
        : `Voor ${selectedShift.name} is nu niemand beschikbaar met de gekozen tijden.`;
    planningAuthorizationHint.textContent = reasonText;
    planningAuthorizationHint.classList.remove("hidden");
    nameSelect.disabled = true;
    return;
  }

  planningAuthorizationHint.textContent = `${suitableEmployees.length} geschikte medewerker(s) beschikbaar voor ${selectedShift.name}.`;
  planningAuthorizationHint.classList.remove("hidden");
  nameSelect.disabled = false;
}

function renderEmployeeList() {
  if (!employees.length) {
    setClassName(employeeListCard, "simple-list empty");
    employeeListCard.textContent = "Nog geen medewerkers toegevoegd.";
    return;
  }
  const selectedEmployee = getSelectedEmployeeAdminName();

  setClassName(employeeListCard, "employee-summary-list");
  employeeListCard.innerHTML = getEmployeesWithFavoritesFirst(employees)
    .map((employee) => {
      const employeeStatus = getEmployeeStatus(employee);

      return `
        <article class="employee-summary-card ${employee === selectedEmployee ? "is-active" : ""}" data-employee-select="${employee}">
          <div class="employee-summary-head">
            <div class="employee-summary-main">
              <h3>${employee}</h3>
              <div class="employee-summary-subline">
                <span class="employee-status-badge ${getEmployeeStatusClass(employeeStatus)}">${getEmployeeStatusLabel(employeeStatus)}</span>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderEmployeeStandardShifts() {
  if (!employeeStandardShiftList) {
    return;
  }

  if (!employees.length) {
    setClassName(employeeStandardShiftList, "employee-standard-shift-list empty");
    employeeStandardShiftList.textContent = "Nog geen medewerkers toegevoegd.";
    return;
  }

  const bakeryCoreShifts = getBakeryCoreShifts();
  const basePatternOptions = getEmployeeBasePatternCatalog()
    .map((pattern) => `<option value="${pattern.id}">${pattern.label}</option>`)
    .join("");
  const rosterModeOptions = `
    <option value="single">Vaste week</option>
    <option value="biweekly">2-wekelijks (A/B)</option>
  `;
  const shiftOptions = bakeryCoreShifts
    .map((shift) => `<option value="${shift.name}">${shift.name}</option>`)
    .join("");

  const employeeName = getSelectedEmployeeAdminName();

  if (!employeeName) {
    setClassName(employeeStandardShiftList, "employee-standard-shift-list empty");
    employeeStandardShiftList.textContent = "Kies eerst links een medewerker.";
    return;
  }

  const employeeDraft = getEmployeeEditorDraft(employeeName);
  const rosterProfile = getEmployeeBaseRosterProfile(employeeName);
  const selectedBasePatternId = typeof employeeDraft?.basePatternId === "string" ? employeeDraft.basePatternId : getEmployeeBasePatternId(employeeName);
  const selectedStandardShift = typeof employeeDraft?.standardShift === "string" ? employeeDraft.standardShift : (employeeStandardShifts[employeeName] || "");
  const customRoster = normalizeEmployeeCustomRosterConfig(employeeDraft?.customRoster, employeeName);
  const editableRoster = getEmployeeEditableRosterConfig(employeeName, customRoster, selectedBasePatternId);
  const currentWeekLabel = editableRoster.mode === "biweekly" ? "Huidige week (alleen als A/B leeg is)" : "Huidige week";
  const effectiveRoster = getEmployeeEffectiveRosterWeek(employeeName, weekInput?.value || getCurrentWeekValue());
  const selectedWeek = weekInput?.value || getCurrentWeekValue();
  const strongPreferenceNote = getEmployeeStrongPreferenceNote(employeeName, selectedWeek);
  const basePatternDescription = getEmployeeBasePatternCatalogMap()[selectedBasePatternId]?.description || "Geen vaste basisplanning ingesteld.";

  setClassName(employeeStandardShiftList, "employee-standard-shift-list");
  employeeStandardShiftList.innerHTML = `
    <article class="employee-standard-shift-card">
      <div class="employee-roster-summary-grid">
        <div class="employee-roster-summary-item">
          <span class="employee-roster-summary-label">Werkdagen</span>
          <strong>${rosterProfile.workdays}</strong>
        </div>
        <div class="employee-roster-summary-item">
          <span class="employee-roster-summary-label">Dagdelen</span>
          <strong>${rosterProfile.dayparts}</strong>
        </div>
        <div class="employee-roster-summary-item">
          <span class="employee-roster-summary-label">Oproepkracht</span>
          <strong>${formatBooleanRosterValue(rosterProfile.isOnCall)}</strong>
        </div>
        <div class="employee-roster-summary-item">
          <span class="employee-roster-summary-label">Weekendkracht</span>
          <strong>${formatBooleanRosterValue(rosterProfile.isWeekend)}</strong>
        </div>
        <div class="employee-roster-summary-item">
          <span class="employee-roster-summary-label">Directie / noodoplossing</span>
          <strong>${formatBooleanRosterValue(rosterProfile.isEmergency)}</strong>
        </div>
        <div class="employee-roster-summary-item">
          <span class="employee-roster-summary-label">2-wekelijks</span>
          <strong>${rosterProfile.biweeklyText}</strong>
        </div>
      </div>
      <div class="employee-roster-controls">
        <label>
          Vaste bakkerijdienst
          <select data-standard-shift-employee="${employeeName}">
            <option value="">Geen vaste koppeling</option>
            ${shiftOptions}
          </select>
        </label>
        <label>
          Basisrooster
          <select data-base-pattern-employee="${employeeName}">
            ${basePatternOptions}
          </select>
        </label>
      </div>
      <div class="employee-week-pattern-editor">
        <label class="employee-week-pattern-mode">
          Vast rooster indeling
          <select data-roster-mode-employee="${employeeName}">
            ${rosterModeOptions}
          </select>
        </label>
        <div class="panel-note">Stel hier handmatig dinsdag t/m zaterdag in. De eerste waarde komt uit het bestaande basisrooster.</div>
        ${editableRoster.mode === "biweekly"
          ? `
            ${renderEmployeeRosterPatternGrid(employeeName, "weekA", editableRoster.weekA, "Week A")}
            ${renderEmployeeRosterPatternGrid(employeeName, "weekB", editableRoster.weekB, "Week B")}
          `
          : renderEmployeeRosterPatternGrid(employeeName, "single", editableRoster.single, currentWeekLabel)}
      </div>
      <div class="panel-note employee-base-pattern-note">${effectiveRoster.source === "custom" ? "Handmatig vast rooster actief. Automatisch plannen gebruikt deze dagdelen eerst." : basePatternDescription}</div>
      ${strongPreferenceNote ? `<div class="panel-note employee-base-pattern-note">${strongPreferenceNote}</div>` : ""}
    </article>
  `;

  const select = employeeStandardShiftList.querySelector(`[data-standard-shift-employee="${employeeName}"]`);
  const basePatternSelect = employeeStandardShiftList.querySelector(`[data-base-pattern-employee="${employeeName}"]`);
  const rosterModeSelect = employeeStandardShiftList.querySelector(`[data-roster-mode-employee="${employeeName}"]`);

  if (select) {
    select.value = selectedStandardShift;
  }

  if (basePatternSelect) {
    basePatternSelect.value = selectedBasePatternId;
  }

  if (rosterModeSelect) {
    rosterModeSelect.value = customRoster.mode;
  }

  [["single", editableRoster.single], ["weekA", editableRoster.weekA], ["weekB", editableRoster.weekB]].forEach(([weekKey, weekValues]) => {
    getEditableRosterWeekdayDefinitions().forEach((weekday) => {
      const daySelect = employeeStandardShiftList.querySelector(`[data-roster-pattern-employee="${employeeName}"][data-roster-pattern-week="${weekKey}"][data-roster-pattern-day="${weekday.number}"]`);

      if (daySelect) {
        daySelect.value = weekValues?.[weekday.number] || "";
      }
    });
  });
}

function getPermissionShiftGroups() {
  return getPermissionShiftGroupsHelper(getPermissionShiftDescriptors, {
    isShopShiftName,
    isAllroundShiftName,
    isStageShiftName
  });
}

function renderEmployeePermissions() {
  if (!employeePermissionsList) {
    return;
  }

  if (!employees.length) {
    setClassName(employeePermissionsList, "employee-permissions-list empty");
    employeePermissionsList.textContent = "Nog geen medewerkers toegevoegd.";
    return;
  }

  const employeeName = getSelectedEmployeeAdminName();

  if (!employeeName) {
    setClassName(employeePermissionsList, "employee-permissions-list empty");
    employeePermissionsList.textContent = "Kies eerst links een medewerker.";
    return;
  }

  const employeeDraft = getEmployeeEditorDraft(employeeName);
  const groupedShifts = getPermissionShiftGroups();
  setClassName(employeePermissionsList, "employee-permissions-list");
  employeePermissionsList.innerHTML = `
    <article class="employee-permission-card">
      <p class="panel-note">Zet per dienst aan of deze medewerker de dienst mag uitvoeren.</p>
      ${groupedShifts.map((group) => `
        <section class="permission-group-block">
          <h3>${group.title}</h3>
          <div class="permission-grid">
            ${group.shifts.map((shift) => `
              <label class="permission-item ${shift.color || "shift-tone-inpak"}">
                <div class="permission-toggle">
                  <input
                    type="checkbox"
                    data-permission-employee="${employeeName}"
                    data-permission-shift="${shift.name}"
                    ${employeeDraft?.permissions?.[shift.name] !== false ? "checked" : ""}
                  >
                  <span>${shift.name}</span>
                </div>
              </label>
            `).join("")}
          </div>
        </section>
      `).join("")}
    </article>
  `;
}

function renderEmployeeContractPanel() {
  if (!employeeContractPanel) {
    return;
  }

  if (!employees.length) {
    setClassName(employeeContractPanel, "employee-contract-panel empty");
    employeeContractPanel.textContent = "Nog geen medewerkers toegevoegd.";
    return;
  }

  const employeeName = getSelectedEmployeeAdminName();

  if (!employeeName) {
    setClassName(employeeContractPanel, "employee-contract-panel empty");
    employeeContractPanel.textContent = "Kies eerst links een medewerker.";
    return;
  }

  const employeeDraft = getEmployeeEditorDraft(employeeName);
  const selectedWeek = weekInput?.value || getCurrentWeekValue();
  const contractHours = typeof employeeDraft?.contractHours === "number" ? employeeDraft.contractHours : getEmployeeContractHours(employeeName);
  const plannedWeekHours = getEmployeeWeekHours(employeeName, selectedWeek, entries);
  const contractPanelData = getEmployeeContractPanelDataHelper({
    contractHours,
    plannedWeekHours,
    formatHours
  });

  setClassName(employeeContractPanel, "employee-contract-panel");
  employeeContractPanel.innerHTML = `
    <article class="employee-contract-card">
      <div class="employee-roster-summary-grid">
        <div class="employee-roster-summary-item">
          <span class="employee-roster-summary-label">Contracttype</span>
          <strong>${contractPanelData.contractTypeLabel}</strong>
        </div>
        <div class="employee-roster-summary-item">
          <span class="employee-roster-summary-label">Gepland deze week</span>
          <strong>${contractPanelData.plannedWeekHoursLabel}</strong>
        </div>
      </div>
      <div class="employee-roster-controls">
        <label>
          Contracturen per week
          <input type="number" min="0" max="40" step="0.5" value="${contractHours > 0 ? contractHours : 0}" data-contract-hours-employee="${employeeName}">
        </label>
      </div>
    </article>
  `;
}

function renderEmployeeStatusControls() {
  if (!removeEmployeeSelect || !employeeStatusSelect || !employeeStatusImpact) {
    return;
  }

  if (!employees.length) {
    removeEmployeeSelect.value = "";
    employeeStatusSelect.value = "active";
    if (employeeRoleSelect) {
      employeeRoleSelect.value = "employee";
    }
    if (employeeEmailInput) {
      employeeEmailInput.value = "";
    }
    if (employeeNameDisplayInput) {
      employeeNameDisplayInput.value = "";
    }
    if (employeeMailTestUserInput) {
      employeeMailTestUserInput.checked = false;
    }
    if (employeeDetailTitle) {
      employeeDetailTitle.textContent = "Kies links een medewerker";
    }
    employeeStatusImpact.textContent = "Nog geen medewerkers toegevoegd.";
    return;
  }

  const selectedEmployee = getSelectedEmployeeAdminName();
  const employeeDraft = selectedEmployee ? getEmployeeEditorDraft(selectedEmployee) : null;

  removeEmployeeSelect.value = selectedEmployee;
  employeeStatusSelect.value = employeeDraft?.status || (selectedEmployee ? getEmployeeStatus(selectedEmployee) : "active");
  if (employeeRoleSelect) {
    employeeRoleSelect.value = employeeDraft?.role || (selectedEmployee ? getEmployeeAppRole(selectedEmployee) : "employee");
  }
  if (employeeEmailInput) {
    employeeEmailInput.value = employeeDraft?.email || (selectedEmployee ? getEmployeeEmail(selectedEmployee) : "");
  }
  if (employeeMailTestUserInput) {
    employeeMailTestUserInput.checked = EMPLOYEE_MAIL_TEST_MODE_ENABLED
      ? isEmployeeMailTestEnabled(selectedEmployee)
      : Boolean(employeeDraft?.mailTestUser);
    employeeMailTestUserInput.disabled = EMPLOYEE_MAIL_TEST_MODE_ENABLED && selectedEmployee !== EMPLOYEE_MAIL_TEST_EMPLOYEE;
    employeeMailTestUserInput.title = EMPLOYEE_MAIL_TEST_MODE_ENABLED
      ? `Tijdelijke testmodus actief: alleen ${EMPLOYEE_MAIL_TEST_EMPLOYEE} ontvangt medewerker-mails.`
      : "";
  }
  clearEmployeeEmailFieldError();
  if (employeeNameDisplayInput) {
    employeeNameDisplayInput.value = selectedEmployee;
  }
  if (employeeDetailTitle) {
    employeeDetailTitle.textContent = selectedEmployee || "Kies links een medewerker";
  }
  employeeStatusImpact.textContent = formatEmployeeStatusImpact(employeeStatusSelect.value);
  renderEmployeeDetailMailStatus(selectedEmployee);
}

function renderBackupRestore() {
  if (!backupRestoreSelect || !backupSummary) {
    return;
  }

  if (!backupHistory.length) {
    backupRestoreSelect.innerHTML = `<option value="">${getBackupRestoreEmptyLabel()}</option>`;
    backupSummary.textContent = getBackupEmptySummaryText();
    return;
  }

  const selectedValue = backupRestoreSelect.value;
  backupRestoreSelect.innerHTML = `<option value="">${getBackupRestoreEmptyLabel()}</option>${backupHistory.map((backup) => `
    <option value="${backup.id}">${getBackupOptionLabel(backup, { formatDateTime })}</option>
  `).join("")}`;
  backupRestoreSelect.value = backupHistory.some((backup) => backup.id === selectedValue) ? selectedValue : backupHistory[0].id;
  backupSummary.textContent = getBackupSummaryText(backupHistory, { formatDateTime });
}

function renderMailSettings() {
  if (!mailSenderNameInput || !mailSenderEmailInput || !mailSettingsStatus) {
    return;
  }

  mailSenderNameInput.value = normalizeMailSenderName(mailSettings.senderName || "Bakkerij Stroet");
  mailSenderEmailInput.value = normalizeEmployeeEmail(mailSettings.senderEmail);

  if (!hasConfiguredMailSender()) {
    mailSettingsStatus.textContent = `Nog niet compleet: vul afzendernaam en e-mailadres in. Testmail gaat daarna naar ${FIXED_TEST_MAIL_RECIPIENT}.`;
    return;
  }

  const updatedLabel = mailSettings.updatedAt
    ? ` Laatst bijgewerkt op ${formatDateTime(mailSettings.updatedAt)}${mailSettings.updatedByName ? ` door ${mailSettings.updatedByName}` : ""}.`
    : "";
  mailSettingsStatus.textContent = `Actieve afzender: ${mailSettings.senderName} <${mailSettings.senderEmail}>. Testmail gaat naar ${FIXED_TEST_MAIL_RECIPIENT}.${updatedLabel}`;
}

function getDayPlannerShifts(dateValue) {
  return getDayPlannerShiftsHelper(dateValue, {
    getDateSpecificShifts,
    isClosedPlannerDay,
    shifts
  });
}

function getEntryForShiftOnDate(dateValue, shift, sourceEntries = getPlanningEntries()) {
  return getEntryForShiftOnDateHelper(dateValue, shift, sourceEntries, {
    getShiftName
  });
}

function getDayPlannerAssignments(dateValue, plannerShifts) {
  return plannerShifts.map((shift) => {
    const select = dayPlannerList.querySelector(`[data-day-planner-shift="${shift.id}"]`);
    const employeeName = select?.value || "";

    if (!employeeName) {
      return null;
    }

    return {
      name: employeeName,
      day: dateValue,
      startTime: shift.startTime,
      endTime: shift.endTime,
      hours: calculateHours(shift.startTime, shift.endTime) || 0,
      shiftId: shift.id.startsWith("shop-") ? "" : shift.id,
      shiftName: shift.name,
      replacementFor: isBakeryCoreShift(shift) && getPrimaryStandardEmployeeForShift(shift.name) && getPrimaryStandardEmployeeForShift(shift.name) !== employeeName
        ? getPrimaryStandardEmployeeForShift(shift.name)
        : ""
    };
  }).filter(Boolean);
}

function saveSingleDayPlannerShift(selectedDate, shift, employeeName) {
  if (!ensureWeekActionAllowed(getWeekValueFromDate(selectedDate), {
    actionLabel: "het rooster te wijzigen",
    blockPlannerWhenLocked: true
  })) {
    render();
    return false;
  }

  const plannerShifts = getDayPlannerShifts(selectedDate);
  const previousEntry = getEntryForShiftOnDate(selectedDate, shift, entries);
  const otherAssignments = getDayPlannerAssignments(selectedDate, plannerShifts)
    .filter((assignment) => assignment.shiftName.toLowerCase() !== shift.name.toLowerCase());
  const selectedAssignments = employeeName
    ? [
      ...otherAssignments,
      {
        name: employeeName,
        day: selectedDate,
        startTime: shift.startTime,
        endTime: shift.endTime,
        hours: calculateHours(shift.startTime, shift.endTime) || 0,
        shiftId: shift.id.startsWith("shop-") ? "" : shift.id,
        shiftName: shift.name,
        replacementFor: isBakeryCoreShift(shift) && getPrimaryStandardEmployeeForShift(shift.name) && getPrimaryStandardEmployeeForShift(shift.name) !== employeeName
          ? getPrimaryStandardEmployeeForShift(shift.name)
          : ""
      }
    ]
    : otherAssignments;

  if (!validateDayPlannerAssignments(selectedDate, plannerShifts, selectedAssignments)) {
    renderDayPlanner();
    return false;
  }

  setUndoState(`${shift.name} ${formatDate(selectedDate)}`);
  for (let index = entries.length - 1; index >= 0; index -= 1) {
    if (
      entries[index].day === selectedDate &&
      getShiftName(entries[index]).toLowerCase() === shift.name.toLowerCase()
    ) {
      entries.splice(index, 1);
    }
  }

  entries.push(...selectedAssignments);
  saveEntries();
  const nextAssignment = selectedAssignments.find((assignment) => (assignment.shiftName || "").toLowerCase() === shift.name.toLowerCase()) || null;
  if (previousEntry && nextAssignment && moveWorkLogToEntry(previousEntry, nextAssignment)) {
    saveWorkLogs();
  }
  persistProtectedChange({
    reason: `Dagplanning bijgewerkt: ${selectedDate} ${shift.name}`,
    scope: "roster",
    action: "roster-day-shift-saved",
    message: `${shift.name} op ${formatDate(selectedDate)} is bijgewerkt.`,
    details: {
      day: selectedDate,
      shiftName: shift.name,
      employeeName
    }
  });
  if (employeeName) {
    preferences.lastEmployee = employeeName;
    savePreferences();
  }
  render();
  return true;
}

function renderDayPlannerAbsenceList(selectedDate, plannerShifts) {
  if (!dayPlannerAbsenceList) {
    return;
  }

  const approvedAbsences = timeOffRequests
    .filter((request) => request.status === "approved" && requestIncludesDate(request, selectedDate))
    .sort((requestA, requestB) => requestA.employeeName.localeCompare(requestB.employeeName, "nl"));

  const absenceRows = approvedAbsences.map((request) => {
    const fixedShift = plannerShifts.find((shift) =>
      isBakeryCoreShift(shift) &&
      getPrimaryStandardEmployeeForShift(shift.name) === request.employeeName &&
      !getEntryForShiftOnDate(selectedDate, shift)
    );

    if (!fixedShift) {
      return {
        request,
        fixedShift: null,
        suitableEmployees: []
      };
    }

    return {
      request,
      fixedShift,
      suitableEmployees: getSuitableEmployeesForShift(
        fixedShift,
        selectedDate,
        fixedShift.startTime,
        fixedShift.endTime,
        null
      )
    };
  });

  if (!absenceRows.length) {
    setClassName(dayPlannerAbsenceList, "day-planner-absence-list hidden");
    dayPlannerAbsenceList.innerHTML = "";
    return;
  }

  setClassName(dayPlannerAbsenceList, "day-planner-absence-list");
  dayPlannerAbsenceList.innerHTML = `
    <section class="day-planner-absence-card">
      <div class="day-planner-absence-title">
        <strong>Afwezig vandaag</strong>
        <span>${absenceRows.length} medewerker(s)</span>
      </div>
      <div class="day-planner-absence-rows">
        ${absenceRows.map(({ request, fixedShift, suitableEmployees }) => `
          <article class="day-planner-absence-item absence-${getAbsenceCardClass(request.type)}">
            <div class="day-planner-absence-meta">
              <strong>${request.employeeName} - ${getAbsenceTypeLabel(request.type)}</strong>
              <span>${request.reason ? request.reason : "Geen extra reden"}</span>
              ${fixedShift
                ? `<span class="day-planner-note">Vaste dienst open: ${fixedShift.name} (${fixedShift.startTime} - ${fixedShift.endTime})</span>`
                : `<span class="day-planner-note is-info">Geen vaste bakkerijdienst open door deze afwezigheid.</span>`}
            </div>
            ${fixedShift ? `
              <div class="day-planner-absence-actions">
                <label class="sr-only" for="absence-replacement-${selectedDate}-${fixedShift.id}">Vervanger kiezen</label>
                <select data-absence-day="${selectedDate}" data-absence-shift="${fixedShift.id}" data-absence-normal="${request.employeeName}" ${suitableEmployees.length === 0 ? "disabled" : ""}>
                  <option value="">${suitableEmployees.length === 0 ? "Geen geschikte medewerker" : "Kies vervanger"}</option>
                  ${suitableEmployees.map((employeeName) => `<option value="${employeeName}">${employeeName}</option>`).join("")}
                </select>
              </div>
            ` : ""}
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function autoFillShopDayPlanner() {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan winkeldiensten automatisch invullen.", "error");
    return;
  }

  const selectedDate = dayPlannerDateInput.value;

  if (!selectedDate) {
    showMessage("Kies eerst een dag om winkeldiensten in te vullen.", "error");
    return;
  }

  if (getWeekValueFromDate(selectedDate) !== weekInput.value) {
    showMessage("De gekozen dag hoort niet bij de geselecteerde week.", "error");
    return;
  }

  if (!ensureWeekActionAllowed(getWeekValueFromDate(selectedDate), {
    actionLabel: "winkeldiensten slim te vullen",
    blockPlannerWhenLocked: true
  })) {
    return;
  }

  const plannerShifts = getDayPlannerShifts(selectedDate);
  const shopShifts = plannerShifts.filter((shift) => shift.isShopShift);

  if (!shopShifts.length) {
    showMessage("Voor deze dag zijn geen winkeldiensten ingesteld.", "error");
    return;
  }

  const workingEntries = entries.filter((entry) =>
    !(entry.day === selectedDate && plannerShifts.some((shift) => getShiftName(entry).toLowerCase() === shift.name.toLowerCase()))
  );
  const currentAssignments = getDayPlannerAssignments(selectedDate, plannerShifts);
  workingEntries.push(...currentAssignments);

  let filledCount = 0;

  shopShifts.forEach((shift) => {
    const select = dayPlannerList.querySelector(`[data-day-planner-shift="${shift.id}"]`);

    if (!select || select.value) {
      return;
    }

    const candidateResult = getAutoFillCandidateResult(shift, selectedDate, workingEntries, getWeekValueFromDate(selectedDate));
    const employeeName = candidateResult.employeeName;

    if (!employeeName) {
      return;
    }

    select.value = employeeName;
    workingEntries.push({
      name: employeeName,
      day: selectedDate,
      startTime: shift.startTime,
      endTime: shift.endTime,
      hours: calculateHours(shift.startTime, shift.endTime) || 0,
      shiftId: "",
      shiftName: shift.name,
      replacementFor: "",
      autoFillReason: candidateResult.autoFillReason || "",
      autoFillReasonDetail: candidateResult.autoFillReasonDetail || ""
    });
    filledCount += 1;
  });

  if (filledCount === 0) {
    showMessage("Er konden geen extra winkeldiensten automatisch worden ingevuld.", "error");
    return;
  }

  showMessage("Rooster bijgewerkt.", "success");
}

function autoFillSmartDayPlanner() {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan een dag slim vullen.", "error");
    return;
  }

  const selectedDate = dayPlannerDateInput.value;

  if (!selectedDate) {
    showMessage("Kies eerst een dag om slim te vullen.", "error");
    return;
  }

  if (getWeekValueFromDate(selectedDate) !== weekInput.value) {
    showMessage("De gekozen dag hoort niet bij de geselecteerde week.", "error");
    return;
  }

  if (!ensureWeekActionAllowed(getWeekValueFromDate(selectedDate), {
    actionLabel: "de dag slim te vullen",
    blockPlannerWhenLocked: true
  })) {
    return;
  }

  const plannerShifts = getDayPlannerShifts(selectedDate);

  if (!plannerShifts.length) {
    showMessage("Voor deze dag zijn geen diensten ingesteld.", "error");
    return;
  }

  const workingEntries = entries.filter((entry) =>
    !(entry.day === selectedDate && plannerShifts.some((shift) => getShiftName(entry).toLowerCase() === shift.name.toLowerCase()))
  );
  const currentAssignments = getDayPlannerAssignments(selectedDate, plannerShifts);
  workingEntries.push(...currentAssignments);

  const openBakeryShifts = plannerShifts.filter((shift) => {
    const select = dayPlannerList.querySelector(`[data-day-planner-shift="${shift.id}"]`);
    return isBakeryCoreShift(shift) && !shift.isAllroundShift && !shift.isShopShift && !isOptionalShift(shift) && select && !select.value;
  });
  const openAllroundShifts = plannerShifts.filter((shift) => {
    const select = dayPlannerList.querySelector(`[data-day-planner-shift="${shift.id}"]`);
    return shift.isAllroundShift && select && !select.value;
  });
  const openShopShifts = plannerShifts.filter((shift) => {
    const select = dayPlannerList.querySelector(`[data-day-planner-shift="${shift.id}"]`);
    return shift.isShopShift && select && !select.value;
  });

  let filledCount = 0;

  openBakeryShifts.forEach((shift) => {
    const select = dayPlannerList.querySelector(`[data-day-planner-shift="${shift.id}"]`);

    if (!select) {
      return;
    }

    const candidateResult = getAutoFillCandidateResult(shift, selectedDate, workingEntries, getWeekValueFromDate(selectedDate));
    const employeeName = candidateResult.employeeName;

    if (!employeeName) {
      return;
    }

    select.value = employeeName;
    workingEntries.push({
      name: employeeName,
      day: selectedDate,
      startTime: shift.startTime,
      endTime: shift.endTime,
      hours: calculateHours(shift.startTime, shift.endTime) || 0,
      shiftId: shift.id.startsWith("shop-") ? "" : shift.id,
      shiftName: shift.name,
      replacementFor: candidateResult.replacementFor || ""
    });
    filledCount += 1;
  });

  openAllroundShifts.forEach((shift) => {
    const select = dayPlannerList.querySelector(`[data-day-planner-shift="${shift.id}"]`);

    if (!select) {
      return;
    }

    const candidateResult = getAutoFillCandidateResult(shift, selectedDate, workingEntries, getWeekValueFromDate(selectedDate));
    const employeeName = candidateResult.employeeName;

    if (!employeeName) {
      return;
    }

    select.value = employeeName;
    workingEntries.push({
      name: employeeName,
      day: selectedDate,
      startTime: shift.startTime,
      endTime: shift.endTime,
      hours: calculateHours(shift.startTime, shift.endTime) || 0,
      shiftId: shift.id.startsWith("shop-") ? "" : shift.id,
      shiftName: shift.name,
      replacementFor: ""
    });
    filledCount += 1;
  });

  openShopShifts.forEach((shift) => {
    const select = dayPlannerList.querySelector(`[data-day-planner-shift="${shift.id}"]`);

    if (!select) {
      return;
    }

    const candidateResult = getAutoFillCandidateResult(shift, selectedDate, workingEntries, getWeekValueFromDate(selectedDate));
    const employeeName = candidateResult.employeeName;

    if (!employeeName) {
      return;
    }

    select.value = employeeName;
    workingEntries.push({
      name: employeeName,
      day: selectedDate,
      startTime: shift.startTime,
      endTime: shift.endTime,
      hours: calculateHours(shift.startTime, shift.endTime) || 0,
      shiftId: "",
      shiftName: shift.name,
      replacementFor: ""
    });
    filledCount += 1;
  });

  if (filledCount === 0) {
    showMessage("Er konden geen open diensten slim worden ingevuld voor deze dag.", "error");
    return;
  }

  showMessage("Rooster bijgewerkt.", "success");
}

function renderDayPlanner() {
  if (!dayPlannerPanel) {
    return;
  }

  const selectedDate = dayPlannerDateInput.value;

  if (dayPlannerSummary) {
    setClassName(dayPlannerSummary, "hidden");
    dayPlannerSummary.innerHTML = "";
  }
  if (dayPlannerAbsenceList) {
    setClassName(dayPlannerAbsenceList, "day-planner-absence-list hidden");
    dayPlannerAbsenceList.innerHTML = "";
  }
  if (dayPlannerOpenList) {
    setClassName(dayPlannerOpenList, "day-planner-open-list hidden");
    dayPlannerOpenList.innerHTML = "";
  }

  if (!selectedDate) {
    setClassName(dayPlannerList, "day-planner-list empty");
    dayPlannerList.textContent = "Kies een dag om alle diensten te tonen.";
    return;
  }

  const plannerShifts = getDayPlannerShifts(selectedDate);

  if (!plannerShifts.length) {
    setClassName(dayPlannerList, "day-planner-list empty");
    dayPlannerList.textContent = "Voor deze dag zijn geen diensten ingesteld.";
    return;
  }

  renderDayPlannerAbsenceList(selectedDate, plannerShifts);

  const uncoveredShifts = [];
  const openBakeryRows = [];
  const openShopRows = [];

  setClassName(dayPlannerList, "day-planner-list");
  dayPlannerList.innerHTML = plannerShifts.map((shift) => {
    const existingEntry = getEntryForShiftOnDate(selectedDate, shift);
    const authorizedEmployees = getAuthorizedEmployeesForShift(shift.name);
    const suitableEmployees = getSuitableEmployeesForShift(shift, selectedDate, shift.startTime, shift.endTime, null);
    const standardCoverage = getStandardShiftCoverageInfo(shift, selectedDate);
    const unauthorizedExistingEmployee = existingEntry?.name && !authorizedEmployees.includes(existingEntry.name)
      ? existingEntry.name
      : "";
    const noSuitableEmployeesMessage = suitableEmployees.length === 0
      ? isOptionalShift(shift)
        ? "Deze stageplek mag leeg blijven."
        : authorizedEmployees.length === 0
          ? "Niemand is bevoegd voor deze dienst."
          : "Niemand is beschikbaar voor deze dienst."
      : "";

    if (noSuitableEmployeesMessage && !isOptionalShift(shift)) {
      uncoveredShifts.push(shift.name);
    }

    if (!existingEntry && !isOptionalShift(shift)) {
      const openRowMarkup = `
        <article class="day-planner-open-item ${shift.isShopShift ? "is-shop" : "is-bakery"}">
          <div class="day-planner-open-meta">
            <strong>${shift.name}</strong>
            <span>${shift.startTime} - ${shift.endTime}</span>
            ${standardCoverage.standardEmployee ? `<span class="day-planner-note is-info">Normaal: ${standardCoverage.standardEmployee}${standardCoverage.isAbsent ? ` (${standardCoverage.reason})` : ""}</span>` : ""}
          </div>
          <div class="day-planner-open-actions">
            <label class="sr-only" for="day-open-${selectedDate}-${shift.id}">Medewerker kiezen</label>
            <select data-open-day="${selectedDate}" data-open-shift="${shift.id}" ${suitableEmployees.length === 0 ? "disabled" : ""}>
              <option value="">${suitableEmployees.length === 0 ? "Geen geschikte medewerker" : "Kies medewerker"}</option>
              ${suitableEmployees.map((employee) => `<option value="${employee}">${employee}</option>`).join("")}
            </select>
          </div>
        </article>
      `;

      if (shift.isShopShift) {
        openShopRows.push(openRowMarkup);
      } else {
        openBakeryRows.push(openRowMarkup);
      }
    }

    const rowStatus = existingEntry?.replacementFor
      ? "replacement-active"
      : standardCoverage.standardEmployee && standardCoverage.isAbsent && !existingEntry
        ? "replacement-open"
        : existingEntry
          ? "filled"
          : "open";
    const rowClass = rowStatus === "replacement-active"
      ? "is-replacement-active"
      : rowStatus === "replacement-open"
        ? "is-replacement-open"
        : rowStatus === "filled"
          ? "is-filled"
          : "is-open";
    const statusLabel = rowStatus === "replacement-active"
      ? "Vervanging actief"
      : rowStatus === "replacement-open"
        ? "Open vervanging"
        : rowStatus === "filled"
          ? "Ingepland"
          : "Nog open";

    return `
      <article class="day-planner-row ${rowClass}">
        <div class="day-planner-meta">
          <div class="day-planner-title">
            <strong>${shift.name}</strong>
            <span class="day-planner-badge">${statusLabel}</span>
          </div>
              <span>${formatWeekday(selectedDate)} · ${shift.startTime} - ${shift.endTime}</span>
          ${standardCoverage.standardEmployee ? `<span class="day-planner-note is-info">Normaal op deze dienst: ${standardCoverage.standardEmployee}${standardCoverage.isAbsent ? ` (${standardCoverage.reason})` : ""}</span>` : ""}
          ${isOptionalShift(shift) ? '<span class="day-planner-note is-info">Optioneel: telt niet mee voor planning compleet.</span>' : ""}
          ${existingEntry?.replacementFor ? `<span class="day-planner-note is-info">Vervanging actief: ${existingEntry.name} vervangt ${existingEntry.replacementFor}</span>` : ""}
          ${unauthorizedExistingEmployee ? `<span class="day-planner-note">Huidige planning: ${unauthorizedExistingEmployee} is niet bevoegd voor deze dienst.</span>` : ""}
          ${noSuitableEmployeesMessage ? `<span class="day-planner-note${isOptionalShift(shift) ? " is-info" : ""}">${noSuitableEmployeesMessage}</span>` : suitableEmployees.length > 0 ? `<span class="day-planner-note is-info">${suitableEmployees.length} geschikte medewerker(s) beschikbaar.</span>` : ""}
        </div>
        <label>
          Medewerker
          <select data-day-planner-shift="${shift.id}" ${suitableEmployees.length === 0 ? "disabled" : ""}>
            <option value="">${suitableEmployees.length === 0 ? (isOptionalShift(shift) ? "Mag leeg blijven" : "Niemand beschikbaar") : "Niet ingepland"}</option>
            ${suitableEmployees.map((employee) => `
              <option value="${employee}" ${existingEntry?.name === employee ? "selected" : ""}>${employee}</option>
            `).join("")}
          </select>
        </label>
      </article>
    `;
  }).join("");

  if (dayPlannerOpenList) {
    const hasOpenRows = openBakeryRows.length > 0 || openShopRows.length > 0;

    if (hasOpenRows) {
      setClassName(dayPlannerOpenList, "day-planner-open-list");
      dayPlannerOpenList.innerHTML = `
        <section class="day-planner-open-card">
          <div class="day-planner-open-title">
            <strong>Nog open</strong>
            <span>${openBakeryRows.length + openShopRows.length} dienst(en)</span>
          </div>
          ${openBakeryRows.length ? `
            <div class="day-planner-open-group">
              <h3>Open bakkerijdiensten</h3>
              <div class="day-planner-open-rows">${openBakeryRows.join("")}</div>
            </div>
          ` : ""}
          ${openShopRows.length ? `
            <div class="day-planner-open-group">
              <h3>Open winkeldiensten</h3>
              <div class="day-planner-open-rows">${openShopRows.join("")}</div>
            </div>
          ` : ""}
        </section>
      `;
    }
  }

  if (dayPlannerSummary && uncoveredShifts.length > 0) {
    setClassName(dayPlannerSummary, "day-planner-summary");
    dayPlannerSummary.innerHTML = `
      <strong>Let op: deze diensten hebben nog geen geschikte medewerker</strong>
      <div class="day-planner-summary-list">
        ${uncoveredShifts.map((shiftName) => `<span class="day-planner-summary-tag">${shiftName}</span>`).join("")}
      </div>
    `;
  } else if (dayPlannerSummary) {
    setClassName(dayPlannerSummary, "day-planner-summary is-complete");
    dayPlannerSummary.innerHTML = `
      <strong>${formatWeekday(selectedDate)} ${formatDate(selectedDate)}</strong>
      <div class="day-planner-summary-list">
        <span class="day-planner-summary-tag is-complete">Dagweergave klaar om snel te plannen</span>
      </div>
    `;
  }
}

function renderShiftSelectors() {
  const selectedShift = presetShiftSelect.value;
  const selectedRemoveShift = removeShiftSelect.value;
  const selectedPreferenceShift = shiftPreferenceShiftSelect?.value || "";
  const selectedDate = document.getElementById("day").value;
  const visibleShifts = selectedDate && isClosedPlannerDay(selectedDate)
    ? []
    : [
      ...shifts,
      ...(selectedDate ? getDateSpecificShifts(selectedDate) : [])
    ];
  const options = visibleShifts
    .map((shift) => `<option value="${shift.id}">${shift.name} (${shift.startTime} - ${shift.endTime})</option>`)
    .join("");

  presetShiftSelect.innerHTML = `<option value="">Kies standaard dienst</option>${options}`;
  removeShiftSelect.innerHTML = `<option value="">Kies dienst</option>${shifts
    .map((shift) => `<option value="${shift.id}">${shift.name} (${shift.startTime} - ${shift.endTime})</option>`)
    .join("")}`;
  if (shiftPreferenceShiftSelect) {
    const preferenceDescriptors = getPermissionShiftDescriptors();
    shiftPreferenceShiftSelect.innerHTML = `<option value="">Kies dienst</option>${preferenceDescriptors
      .map((shift) => `<option value="${shift.name}">${shift.name}</option>`)
      .join("")}`;
    shiftPreferenceShiftSelect.value = preferenceDescriptors.some((shift) => shift.name === selectedPreferenceShift) ? selectedPreferenceShift : "";
  }

  presetShiftSelect.value = visibleShifts.some((shift) => shift.id === selectedShift) ? selectedShift : "";
  removeShiftSelect.value = shifts.some((shift) => shift.id === selectedRemoveShift) ? selectedRemoveShift : "";
}

function renderShiftList() {
  const allroundOverview = Object.entries(getAllroundTemplatesByWeekday())
    .flatMap(([weekday, templates]) =>
      templates.map((shift) => ({
        ...shift,
        weekdayLabel: ["", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"][Number(weekday)] || ""
      }))
    );

  if (!shifts.length && !allroundOverview.length) {
    setClassName(shiftListCard, "shift-list empty");
    shiftListCard.textContent = "Nog geen diensten toegevoegd.";
    return;
  }

  setClassName(shiftListCard, "shift-list");
  shiftListCard.innerHTML = `
    ${shifts.map((shift) => `
      <article class="shift-list-item ${shift.color || 'shift-tone-inpak'}">
        <strong>${shift.name}</strong>
        <span>${shift.startTime} - ${shift.endTime}</span>
        ${isOptionalShift(shift) ? '<span>Optioneel extra</span>' : ""}
      </article>
    `).join("")}
    ${allroundOverview.length ? `
      <article class="shift-list-item shift-tone-productie">
        <strong>Daggebonden allrounddiensten</strong>
        <span>Alleen zichtbaar op de juiste dagen in het rooster</span>
      </article>
      ${allroundOverview.map((shift) => `
        <article class="shift-list-item ${shift.color || 'shift-tone-productie'}">
          <strong>${shift.name}</strong>
          <span>${shift.weekdayLabel}: ${shift.startTime} - ${shift.endTime}</span>
        </article>
      `).join("")}
    ` : ""}
  `;
}

function renderShiftPreferenceEditor() {
  if (!shiftPreferenceList) {
    return;
  }

  const selectedShiftName = shiftPreferenceShiftSelect?.value || "";

  if (!selectedShiftName) {
    setClassName(shiftPreferenceList, "shift-preference-list empty");
    shiftPreferenceList.textContent = "Kies eerst een dienst om de voorkeursvolgorde te beheren.";
    return;
  }

  const employeesForPreference = getActiveEmployees().slice().sort((employeeA, employeeB) => {
    const preferenceDifference = getEmployeeShiftPreference(employeeA, selectedShiftName) - getEmployeeShiftPreference(employeeB, selectedShiftName);

    if (preferenceDifference !== 0) {
      if (getEmployeeShiftPreference(employeeA, selectedShiftName) === 0) {
        return 1;
      }
      if (getEmployeeShiftPreference(employeeB, selectedShiftName) === 0) {
        return -1;
      }
      return preferenceDifference;
    }

    return employeeA.localeCompare(employeeB, "nl");
  });

  if (!employeesForPreference.length) {
    setClassName(shiftPreferenceList, "shift-preference-list empty");
    shiftPreferenceList.textContent = "Nog geen actieve medewerkers beschikbaar.";
    return;
  }

  setClassName(shiftPreferenceList, "shift-preference-list");
  shiftPreferenceList.innerHTML = `
    <div class="panel-note">Gebruik 0 voor geen vaste voorkeur. Laagste nummer krijgt voorrang bij automatisch plannen.</div>
    ${employeesForPreference.map((employeeName) => {
      const isAuthorized = isEmployeeAuthorizedForShift(employeeName, selectedShiftName);
      return `
        <article class="shift-preference-item ${isAuthorized ? "" : "is-disabled"}">
          <div class="shift-preference-meta">
            <strong>${employeeName}</strong>
            <span>${isAuthorized ? "Bevoegd" : "Niet bevoegd voor deze dienst"}</span>
          </div>
          <label class="shift-preference-rank">
            <span>Volgorde</span>
            <input
              type="number"
              min="0"
              max="99"
              step="1"
              value="${getEmployeeShiftPreference(employeeName, selectedShiftName)}"
              data-shift-preference-employee="${employeeName}"
              data-shift-preference-shift="${selectedShiftName}"
            >
          </label>
        </article>
      `;
    }).join("")}
  `;
}

function renderSwapEntryOptions() {
  const currentValue = swapEntrySelect.value;
  const employeeName = !isPlannerRole() ? getRoleScopedEmployeeName() : swapEmployeeSelect.value;
  const date = swapDateInput.value;
  const todayDate = getTodayLocalDateValue();

  if (!isPlannerRole() && employeeName) {
    swapEmployeeSelect.value = employeeName;
  }

  if (!employeeName) {
    swapEntrySelect.innerHTML = '<option value="">Kies dienst</option>';
    renderSwapTargetOptions();
    return;
  }

  const candidateEntries = isPlannerRole()
    ? (!date ? [] : getEntriesForEmployeeDay(employeeName, date))
    : entries
      .filter((entry) =>
        entry.name === employeeName &&
        entry.day >= todayDate
      )
      .sort((entryA, entryB) =>
        entryA.day.localeCompare(entryB.day, "nl") ||
        entryA.startTime.localeCompare(entryB.startTime, "nl") ||
        getShiftName(entryA).localeCompare(getShiftName(entryB), "nl")
      );

  if (!candidateEntries.length) {
    swapEntrySelect.innerHTML = '<option value="">Kies dienst</option>';
    renderSwapTargetOptions();
    return;
  }

  const options = candidateEntries.map((entry) => {
    const value = `${entry.name}|${entry.day}|${entry.shiftId || ""}|${entry.startTime}|${entry.endTime}`;
    const dateLabel = isPlannerRole() ? "" : `${formatDate(entry.day)} - `;
    return `<option value="${value}">${dateLabel}${getShiftName(entry)} (${entry.startTime} - ${entry.endTime})</option>`;
  }).join("");

  swapEntrySelect.innerHTML = `<option value="">Kies dienst</option>${options}`;
  swapEntrySelect.value = Array.from(swapEntrySelect.options).some((option) => option.value === currentValue) ? currentValue : "";
  const selectedEntryDetails = getSwapEntryDetails(swapEntrySelect.value);
  if (selectedEntryDetails?.date) {
    swapDateInput.value = selectedEntryDetails.date;
  } else if (!isPlannerRole()) {
    swapDateInput.value = "";
  }
  renderSwapTargetOptions();
}

function renderTimeOffRequests() {
  const { visibleTimeOffRequests } = getVisibleRequestSources();
  const visibleRequests = visibleTimeOffRequests.filter((request) => matchesRequestStatusFilter(request));

  const sortedRequests = visibleRequests
    .slice()
    .sort((requestA, requestB) => {
      const displayStatusA = getRequestDisplayStatus(requestA);
      const displayStatusB = getRequestDisplayStatus(requestB);
      const priorityMap = { overdue: 0, waiting: 1, open: 2, approved: 3, rejected: 4 };
      const statusCompare = (priorityMap[displayStatusA] ?? 9) - (priorityMap[displayStatusB] ?? 9);
      return statusCompare !== 0 ? statusCompare : getTimeOffStartDate(requestA).localeCompare(getTimeOffStartDate(requestB));
    });

  const renderCards = (target, requests, emptyText) => {
    if (!target) {
      return;
    }

    if (requests.length === 0) {
      setClassName(target, "request-list empty");
      target.textContent = emptyText;
      return;
    }

    setClassName(target, "request-list");
    target.innerHTML = requests.map((request) => `
      <article class="request-card is-${getRequestDisplayStatus(request)} absence-${getAbsenceCardClass(request.type)}">
        <div class="request-top">
          <strong>${isPlannerRole() ? request.employeeName : getAbsenceTypeLabel(request.type)}</strong>
          <span class="status-pill status-${getRequestDisplayStatus(request)}">${getRequestDisplayLabel(request)}</span>
        </div>
        ${isPlannerRole() ? `<div class="request-meta">${getAbsenceTypeLabel(request.type)}</div>` : ""}
        <div class="request-meta">${getTimeOffDisplayRange(request)}${request.reason ? ` - ${request.reason}` : ""}</div>
        <div class="request-impact">${getRequestRosterEffectText(request, "timeoff")}</div>
        ${request.status === "open" && getRequestAttentionText(request) ? `<div class="request-impact request-attention-note">${getRequestAttentionText(request)}</div>` : ""}
        ${getTimeOffMailStatusText(request) ? `<div class="request-impact"><strong>Mail:</strong> ${getTimeOffMailStatusText(request)}</div>` : ""}
        ${request.managerNote ? `<div class="request-impact"><strong>Opmerking:</strong> ${request.managerNote}</div>` : ""}
        ${request.status === "open" && isPlannerRole() ? `
          <label class="request-note-field">
            <span>Opmerking planner</span>
            <input type="text" maxlength="200" value="${request.managerNote || ""}" data-request-note-input placeholder="Optionele toelichting">
          </label>
          <div class="actions">
            <button type="button" class="small" data-request-type="timeoff" data-request-action="approve" data-request-id="${request.id}">Goedkeuren</button>
            <button type="button" class="small warning" data-request-type="timeoff" data-request-action="reject" data-request-id="${request.id}">Afwijzen</button>
          </div>
        ` : request.status === "open" ? `
          <div class="actions">
            <button type="button" class="small secondary" data-request-type="timeoff" data-request-action="edit" data-request-id="${request.id}">Wijzigen</button>
            <button type="button" class="small warning" data-request-type="timeoff" data-request-action="delete" data-request-id="${request.id}">Intrekken</button>
          </div>
        ` : ""}
      </article>
    `)
    .join("");
  };

  if (isPlannerRole()) {
    renderPlannerRequestCards(
      plannerFreeRequestsContainer,
      sortedRequests.filter((request) => request.type === "vrij"),
      "Nog geen vrije dagen.",
      "timeoff"
    );
    renderPlannerRequestCards(
      plannerVacationRequestsContainer,
      sortedRequests.filter((request) => request.type === "vakantie"),
      "Nog geen vakantieaanvragen.",
      "timeoff"
    );
    renderPlannerRequestCards(
      plannerSickRequestsContainer,
      sortedRequests.filter((request) => request.type === "ziek"),
      "Nog geen ziekmeldingen.",
      "timeoff"
    );
    if (openTimeOffRequestsContainer) {
      setClassName(openTimeOffRequestsContainer, "request-list hidden");
      openTimeOffRequestsContainer.innerHTML = "";
    }
    if (handledTimeOffRequestsContainer) {
      setClassName(handledTimeOffRequestsContainer, "request-list hidden");
      handledTimeOffRequestsContainer.innerHTML = "";
    }
    return;
  }

  if (openTimeOffRequestsContainer) {
    renderCards(
      openTimeOffRequestsContainer,
      sortedRequests.filter((request) => request.status === "open"),
      "Nog geen open afwezigheidsaanvragen."
    );
  }
  if (handledTimeOffRequestsContainer) {
    renderCards(
      handledTimeOffRequestsContainer,
      sortedRequests.filter((request) => request.status !== "open"),
      "Nog geen afgehandelde afwezigheidsaanvragen."
    );
  }
}

function renderSwapRequests() {
  const { visibleSwapRequests } = getVisibleRequestSources();
  syncSwapReminderNotifications(visibleSwapRequests);
  const visibleRequests = visibleSwapRequests.filter((request) => matchesRequestStatusFilter(request));

  const sortedRequests = visibleRequests
    .slice()
    .sort((requestA, requestB) => {
      const displayStatusA = getRequestDisplayStatus(requestA);
      const displayStatusB = getRequestDisplayStatus(requestB);
      const priorityMap = { overdue: 0, waiting: 1, open: 2, approved: 3, rejected: 4 };
      const statusCompare = (priorityMap[displayStatusA] ?? 9) - (priorityMap[displayStatusB] ?? 9);
      return statusCompare !== 0 ? statusCompare : requestA.date.localeCompare(requestB.date);
    });

  const renderCards = (target, requests, emptyText) => {
    if (!target) {
      return;
    }

    if (requests.length === 0) {
      setClassName(target, "request-list empty");
      target.textContent = emptyText;
      return;
    }

      setClassName(target, "request-list");
      target.innerHTML = requests.map((request) => `
        <article class="request-card is-${getRequestDisplayStatus(request)}">
          <div class="request-top">
            <strong>${isPlannerRole() ? `${request.employeeName} -> ${request.targetEmployeeName || "Open aangeboden"}` : request.shiftName}</strong>
            <span class="status-pill status-${getRequestDisplayStatus(request)}">${getRequestDisplayLabel(request)}</span>
          </div>
          ${isPlannerRole() ? `<div class="request-meta">${request.shiftName}</div>` : ""}
          <div class="request-meta">${formatDate(request.date)} - ${request.startTime} - ${request.endTime}${request.targetEmployeeName ? ` - Naar ${request.targetEmployeeName}` : " - Open aangeboden"}</div>
          <div class="request-impact">${getRequestRosterEffectText(request, "swap")}</div>
          ${request.escalatedToPlanner ? `<div class="request-impact request-attention-note">Directie is gevraagd om mee te kijken naar deze ruil.</div>` : ""}
          ${request.status === "open" && getRequestAttentionText(request) ? `<div class="request-impact request-attention-note">${getRequestAttentionText(request)}</div>` : ""}
          ${getSwapMailStatusText(request) ? `<div class="request-impact"><strong>Mail:</strong> ${getSwapMailStatusText(request)}</div>` : ""}
          ${request.managerNote ? `<div class="request-impact"><strong>Opmerking:</strong> ${request.managerNote}</div>` : ""}
          ${request.status === "open" && isPlannerRole() ? `
          ${!request.targetEmployeeName ? `
            <label class="request-note-field">
              <span>Vervanger kiezen</span>
              <select data-request-replacement-select="${request.id}">
                <option value="">Kies bevoegde medewerker</option>
                ${buildEmployeeOptions(getSwapReplacementCandidates(request))}
              </select>
            </label>
            ${getSwapReplacementCandidates(request).length === 0 ? `<div class="request-impact request-attention-note">Geen geschikte medewerker beschikbaar voor directe overname.</div>` : ""}
          ` : ""}
          <label class="request-note-field">
            <span>Opmerking planner</span>
            <input type="text" maxlength="200" value="${request.managerNote || ""}" data-request-note-input placeholder="Optionele toelichting">
          </label>
          <div class="actions">
            <button type="button" class="small" data-request-type="swap" data-request-action="approve" data-request-id="${request.id}">Goedkeuren</button>
            <button type="button" class="small warning" data-request-type="swap" data-request-action="reject" data-request-id="${request.id}">Afwijzen</button>
            ${!request.targetEmployeeName ? `<button type="button" class="small secondary" data-request-type="swap" data-request-action="assign-replacement" data-request-id="${request.id}">Vervanger kiezen</button>` : ""}
            <button type="button" class="small secondary" data-request-type="swap" data-request-action="close" data-request-id="${request.id}">Sluiten</button>
          </div>
          ` : request.status === "open" ? `
            <div class="actions">
              <button type="button" class="small secondary" data-request-type="swap" data-request-action="edit" data-request-id="${request.id}">Wijzigen</button>
              <button type="button" class="small warning" data-request-type="swap" data-request-action="delete" data-request-id="${request.id}">Intrekken</button>
              ${canEscalateSwapRequestToPlanner(request) ? `<button type="button" class="small secondary" data-request-type="swap" data-request-action="escalate" data-request-id="${request.id}">Directie inschakelen</button>` : ""}
            </div>
          ` : ""}
        </article>
      `)
    .join("");
  };

  if (isPlannerRole()) {
    renderPlannerRequestCards(
      plannerSwapRequestsContainer,
      sortedRequests,
      "Nog geen ruilverzoeken.",
      "swap"
    );
    if (openSwapRequestsContainer) {
      setClassName(openSwapRequestsContainer, "request-list hidden");
      openSwapRequestsContainer.innerHTML = "";
    }
    if (handledSwapRequestsContainer) {
      setClassName(handledSwapRequestsContainer, "request-list hidden");
      handledSwapRequestsContainer.innerHTML = "";
    }
    return;
  }

  if (openSwapRequestsContainer) {
    renderCards(
      openSwapRequestsContainer,
      sortedRequests.filter((request) => request.status === "open"),
      "Nog geen open ruilverzoeken."
    );
  }
  if (handledSwapRequestsContainer) {
    renderCards(
      handledSwapRequestsContainer,
      sortedRequests.filter((request) => request.status !== "open"),
      "Nog geen afgehandelde ruilverzoeken."
    );
  }
}

function renderPlanningSettings() {
  winkelNeededInputs.forEach((input, index) => {
    input.value = planningSettings.winkelPerWeekday[String(index + 1)] ?? 0;
  });
  overrideDateInput.value = overrideDateInput.value || "";
  overrideCountInput.value = overrideDateInput.value ? (planningSettings.overrides[overrideDateInput.value] ?? "") : "";
  if (vacationWeekInput) {
    vacationWeekInput.value = vacationWeekInput.value || weekInput.value || getCurrentWeekValue();
  }
  if (vacationWeekStatusSelect && vacationWeekInput?.value) {
    vacationWeekStatusSelect.value = getWeekVacationStatus(vacationWeekInput.value);
  }

  const overrideEntries = Object.entries(planningSettings.overrides)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB));

  if (overrideEntries.length === 0) {
    setClassName(overrideList, "request-list empty");
    overrideList.textContent = "Nog geen afwijkende bezetting ingesteld.";
  } else {
    setClassName(overrideList, "request-list");
    overrideList.innerHTML = overrideEntries
      .map(([date, count]) => `
        <article class="request-card">
          <div class="request-top">
            <strong>${formatDate(date)}</strong>
            <span class="status-pill status-open">${count} winkeldiensten</span>
          </div>
        </article>
      `)
      .join("");
  }

  if (!vacationWeekList) {
    return;
  }

  const vacationWeeks = Array.isArray(planningSettings.vacationWeeks)
    ? [...planningSettings.vacationWeeks].sort((a, b) => a.localeCompare(b))
    : [];

  if (vacationWeeks.length === 0) {
    setClassName(vacationWeekList, "request-list empty");
    vacationWeekList.textContent = "Nog geen vakantieweken ingesteld.";
    return;
  }

  setClassName(vacationWeekList, "request-list");
  vacationWeekList.innerHTML = vacationWeeks
    .map((weekValue) => `
      <article class="request-card">
        <div class="request-top">
          <strong>${weekValue}</strong>
          <span class="status-pill status-open">${getWeekVacationStatus(weekValue) === "vacation" ? "Vakantieweek" : "Normale week"}</span>
        </div>
        <div class="panel-note">Weekendkrachten extra beschikbaar: ${getWeekVacationStatus(weekValue) === "vacation" ? "Ja" : "Nee"}</div>
      </article>
    `)
    .join("");
}

function saveShiftPreference(employeeName, shiftName, value) {
  if (!employeeName || !shiftName || !employeeShiftPreferences[employeeName]) {
    return;
  }

  const normalizedValue = Number.isFinite(Number(value)) && Number(value) > 0 ? Math.floor(Number(value)) : 0;
  employeeShiftPreferences[employeeName][shiftName] = normalizedValue;
  saveEmployeeShiftPreferences();
}

function getShopCoverageLabel(dateValue) {
  return getShopCoverageLabelHelper(dateValue, {
    getShopCoverageForDate
  });
}

function renderDashboard() {
  if (!plannerDashboard) {
    return;
  }

  const shouldShowDashboard = isPlannerRole() && activeTab === "dashboard";
  plannerDashboard.classList.toggle("hidden", !shouldShowDashboard);

  if (!shouldShowDashboard) {
    plannerDashboard.innerHTML = "";
    return;
  }

  const openCounts = getOpenCounts();
  const totalOpen = openCounts.timeOff + openCounts.swaps;
  const dashboardLabel = isPlannerRole() ? "Open" : "Mijn open";

  plannerDashboard.innerHTML = `
    <div class="dashboard-grid">
      <div class="dashboard-item">
        <span>${dashboardLabel} afwezigheid</span>
        <strong>${openCounts.timeOff}</strong>
      </div>
      <div class="dashboard-item">
        <span>${dashboardLabel} ruilverzoeken</span>
        <strong>${openCounts.swaps}</strong>
      </div>
    </div>
    ${totalOpen > 0 ? `<div class="dashboard-alert">${isPlannerRole() ? `Er staan ${totalOpen} nieuwe open verzoeken klaar in het planner overzicht.` : `Je hebt ${totalOpen} open verzoeken in aanvragen.`}</div>` : ""}
  `;
}

function renderRequestsOpenSummary() {
  const { visibleTimeOffRequests, visibleSwapRequests } = getVisibleRequestSources();
  const openTimeOff = visibleTimeOffRequests.filter((request) => request.status === "open");
  const openSwaps = visibleSwapRequests.filter((request) => request.status === "open");
  const waitingCount = [...openTimeOff, ...openSwaps].filter((request) => getRequestDisplayStatus(request) === "waiting").length;
  const overdueCount = [...openTimeOff, ...openSwaps].filter((request) => getRequestDisplayStatus(request) === "overdue").length;
  const openCount = openTimeOff.length + openSwaps.length;

  if (isPlannerRole()) {
    const summaryCounts = getPlannerRequestSummaryCounts();
    setClassName(requestsOpenSummary, "planner-request-summary-row");
    requestsOpenSummary.innerHTML = `
      <article class="planner-summary-chip">
        <span>Open vrije dagen</span>
        <strong>${summaryCounts.free}</strong>
      </article>
      <article class="planner-summary-chip">
        <span>Open ziekmeldingen</span>
        <strong>${summaryCounts.sick}</strong>
      </article>
      <article class="planner-summary-chip">
        <span>Open ruilverzoeken</span>
        <strong>${summaryCounts.swaps}</strong>
      </article>
      <article class="planner-summary-chip">
        <span>Open vakantieaanvragen</span>
        <strong>${summaryCounts.vacation}</strong>
      </article>
    `;
  } else {
    setClassName(requestsOpenSummary, "dashboard-grid");
    requestsOpenSummary.innerHTML = `
      <article class="dashboard-card compact-status-card ${overdueCount ? "is-danger" : waitingCount ? "is-warning" : openCount ? "is-warning" : "is-complete"}">
        <strong>Open aanvragen</strong>
        <span>${openCount ? `${openCount} aanvraag${openCount === 1 ? "" : "en"} staat${openCount === 1 ? "" : "n"} nog open.` : "Alles is bijgewerkt."}</span>
      </article>
    `;
  }
  renderRequestsContext();
  renderRequestsOpenCards();
  renderRequestComposerState();
}

function renderHomeSummary() {
  const currentWeek = getCurrentWeekValue();
  const openTimeOff = timeOffRequests.filter((request) => request.status === "open").length;
  const openSwaps = swapRequests.filter((request) => request.status === "open").length;
  const weekDates = getWeekDates(currentWeek);
  const weekStatus = weekDates.every((date) => {
    const coverage = getShopCoverageForDate(date);
    return coverage.status === "closed" || coverage.status === "full";
  });

  homeSummary.innerHTML = `
    <div class="dashboard-item">
      <span>Open afwezigheid</span>
      <strong>${openTimeOff}</strong>
    </div>
    <div class="dashboard-item">
      <span>Open ruilverzoeken</span>
      <strong>${openSwaps}</strong>
    </div>
    <div class="dashboard-item">
      <span>Status deze week</span>
      <strong>${weekStatus ? "Vol" : "Niet vol"}</strong>
    </div>
  `;
}

function renderHomeWeekOverview() {
  const currentWeek = getCurrentWeekValue();
  const weekDates = getWeekDates(currentWeek);

  setClassName(homeWeekOverview, "schedule-board");
  homeWeekOverview.innerHTML = `
    <section class="mini-week-grid">
      ${weekDates.map((date) => {
        const coverage = getShopCoverageForDate(date);

        return `
          <article class="mini-week-card">
            <strong>${formatWeekday(date)}</strong>
            <span>${formatDate(date)}</span>
            <em class="planner-status ${coverage.status === "full" ? "full" : coverage.status === "under" ? "under" : coverage.status === "closed" ? "closed" : "over"}">
              ${coverage.status === "closed" ? "Gesloten" : `${coverage.planned}/${coverage.needed} gevuld`}
            </em>
          </article>
        `;
      }).join("")}
    </section>
  `;
}

function applyRoleUI() {
  const employeeIdentity = getEmployeeIdentity();
  const employeeLocked = !isPlannerRole() && Boolean(employeeIdentity);
  const scopedEmployeeName = getRoleScopedEmployeeName();
  const sessionBar = document.querySelector(".session-bar");
  const roleLabel = roleSelect?.closest("label") || null;
  const currentEmployeeLabel = currentEmployeeSelect?.closest("label") || null;

  document.body.dataset.role = activeRole;
  document.body.dataset.employeeLocked = employeeLocked ? "true" : "false";
  roleSelect.value = activeRole;
  currentEmployeeSelect.disabled = isPlannerRole() || employeeLocked;
  sessionBar?.classList.toggle("hidden", !isPlannerRole());
  sessionBar?.setAttribute("aria-hidden", isPlannerRole() ? "false" : "true");
  if (roleLabel) {
    roleLabel.hidden = !isPlannerRole();
  }
  if (currentEmployeeLabel) {
    currentEmployeeLabel.hidden = !isPlannerRole();
  }
  if (roleIndicator) {
    roleIndicator.hidden = !isPlannerRole();
  }
  plannerDashboard.classList.toggle("hidden", !isPlannerRole() || activeTab !== "dashboard");
  plannerDashboard.hidden = !isPlannerRole() || activeTab !== "dashboard";
  plannerOnlyTabs.forEach((button) => {
    button.classList.toggle("hidden-by-role", !isPlannerRole());
    button.hidden = !isPlannerRole();
    button.setAttribute("aria-hidden", isPlannerRole() ? "false" : "true");
  });
  quickLinks.forEach((button) => {
    const isAllowed = isTabAllowedForCurrentRole(button.dataset.goTab);
    button.classList.toggle("hidden-by-role", !isAllowed);
    button.hidden = !isAllowed;
    button.setAttribute("aria-hidden", isAllowed ? "false" : "true");
  });
  printButton?.classList.toggle("hidden", !isPlannerRole());
  exportButton?.classList.toggle("hidden", !isPlannerRole());
  todayWeekButton?.classList.toggle("hidden", !isPlannerRole());
  if (printButton) printButton.hidden = !isPlannerRole();
  if (exportButton) exportButton.hidden = !isPlannerRole();
  if (todayWeekButton) todayWeekButton.hidden = !isPlannerRole();
  if (employeeWeekToolbar) {
    employeeWeekToolbar.classList.toggle("hidden", isPlannerRole());
    employeeWeekToolbar.hidden = isPlannerRole();
  }
  const hasPreview = autoFillPreviewEntries.length > 0;
  autoFillButton?.classList.toggle("hidden", !isPlannerRole() || hasPreview);
  planningOverviewAutoButton?.classList.toggle("hidden", !isPlannerRole());
  planningOverviewRefreshButton?.classList.toggle("hidden", !isPlannerRole());
  rebalanceHoursButton?.classList.toggle("hidden", !isPlannerRole());
  monthBalanceButton?.classList.toggle("hidden", !isPlannerRole());
  completeReviewButton?.classList.toggle("hidden", !isPlannerRole());
  applyAutoFillButton?.classList.toggle("hidden", !isPlannerRole() || !hasPreview);
  cancelAutoFillButton?.classList.toggle("hidden", !isPlannerRole() || !hasPreview);
  smartFillDayButton?.classList.toggle("hidden", !isPlannerRole());
  autoFillShopDayButton?.classList.toggle("hidden", !isPlannerRole());
  if (autoFillButton) autoFillButton.hidden = !isPlannerRole() || hasPreview;
  if (planningOverviewAutoButton) planningOverviewAutoButton.hidden = !isPlannerRole();
  if (planningOverviewRefreshButton) planningOverviewRefreshButton.hidden = !isPlannerRole();
  if (rebalanceHoursButton) rebalanceHoursButton.hidden = !isPlannerRole();
  if (monthBalanceButton) monthBalanceButton.hidden = !isPlannerRole();
  if (completeReviewButton) completeReviewButton.hidden = !isPlannerRole();
  if (applyAutoFillButton) applyAutoFillButton.hidden = !isPlannerRole() || !hasPreview;
  if (cancelAutoFillButton) cancelAutoFillButton.hidden = !isPlannerRole() || !hasPreview;
  if (smartFillDayButton) smartFillDayButton.hidden = !isPlannerRole();
  if (autoFillShopDayButton) autoFillShopDayButton.hidden = !isPlannerRole();
  updateUndoButton();
  if (showSuitableButton) {
    showSuitableButton.classList.toggle("hidden", !isPlannerRole());
    showSuitableButton.classList.toggle("active", isPlannerRole() && showSuitableEmployees);
  }

  updateRoleContextBadge(currentEmployeeBadge, scopedEmployeeName);
  updateRoleContextBadge(portalEmployeeBadge, getRoleScopedEmployeeName(portalEmployeeSelect.value));
  updateRoleContextBadge(hoursEmployeeBadge, getRoleScopedEmployeeName(hoursEmployeeSelect.value));
  updateRoleContextBadge(requestsEmployeeBadge, scopedEmployeeName);
  updateRoleIndicator();
  updateTestModeBadge();
  updateFocusModeUI();

  if (brandRoleChip) {
    if (isPlannerRole()) {
      brandRoleChip.textContent = "Planneromgeving";
      brandRoleChip.classList.remove("hidden");
    } else {
      brandRoleChip.textContent = scopedEmployeeName || "Medewerker";
      brandRoleChip.classList.toggle("hidden", !Boolean(scopedEmployeeName));
    }
  }

  if (switchUserButton) {
    switchUserButton.textContent = "Wissel gebruiker";
  }

  if (resetTestDataButton) {
    resetTestDataButton.classList.toggle("hidden", !isPlannerRole() || currentDataMode !== "test");
  }

  if (mailTestModeBadge) {
    const showMailTestMode = isPlannerRole() && APP_MAIL_TEST_MODE_ENABLED;
    mailTestModeBadge.classList.toggle("hidden", !showMailTestMode);
    mailTestModeBadge.hidden = !showMailTestMode;
    mailTestModeBadge.setAttribute("aria-hidden", showMailTestMode ? "false" : "true");
  }

  if (dashboardTestMailButton) {
    dashboardTestMailButton.classList.toggle("hidden", !isPlannerRole());
    dashboardTestMailButton.hidden = !isPlannerRole();
  }

  if (!isPlannerRole()) {
    employeeFilterInput.value = "";
    employeeSearchInput.value = "";
    dayFilterInput.value = "";
    clearPlannerWeekInsights();
    if (weekFilterInput.value !== getCurrentWeekValue() && activeEmployeeWeekView === "today") {
      activeEmployeeWeekView = "week";
    }
  }
}

function renderSchedule() {
  const selectedWeek = weekFilterInput.value;
  const roleVisibleEntriesAll = getEntriesVisibleForCurrentRole();
  const visibleEntries = getFilteredEntries(roleVisibleEntriesAll);
  const roleVisibleEntries = roleVisibleEntriesAll.filter((entry) =>
    getWeekValueFromDate(entry.day) === selectedWeek
  );
  const employeeRosterEntries = getSortedEntries(entries).filter((entry) =>
    getWeekValueFromDate(entry.day) === selectedWeek
  );
  const employeeFilter = employeeFilterInput.value.trim().toLowerCase();
  const employeeSearch = employeeSearchInput.value.trim().toLowerCase();
  const dayFilter = dayFilterInput.value;
  const showOpenPlannerSections = isPlannerRole() && employeeFilter === "" && employeeSearch === "";
  const showPlannerInsights = isPlannerRole();
  const weekDates = getWeekDates(selectedWeek);
  const approvedTimeOffRequests = getApprovedTimeOffVisibleForCurrentRole().filter((request) =>
    request.status === "approved" &&
    requestOverlapsRange(request, weekDates[0], weekDates[weekDates.length - 1]) &&
    (employeeFilter === "" || request.employeeName.toLowerCase() === employeeFilter) &&
    (employeeSearch === "" || request.employeeName.toLowerCase().includes(employeeSearch)) &&
    (dayFilter === "" || weekDates.some((day) => requestIncludesDate(request, day) && formatWeekday(day).toLowerCase() === dayFilter))
  );
  const employeeWeekFocusMarkup = !isPlannerRole()
    ? renderEmployeeWeekFocusSummary(weekDates, visibleEntries, approvedTimeOffRequests)
    : "";

  if (!isPlannerRole()) {
    const currentWeek = getCurrentWeekValue();
    if (selectedWeek !== currentWeek && activeEmployeeWeekView === "today") {
      activeEmployeeWeekView = "week";
    }

    if (employeeWeekLabel) {
      employeeWeekLabel.textContent = formatEmployeeWeekLabel(selectedWeek);
    }

    if (employeeTodayViewButton) {
      employeeTodayViewButton.classList.toggle("active", activeEmployeeWeekView === "today");
      employeeTodayViewButton.setAttribute("aria-pressed", activeEmployeeWeekView === "today" ? "true" : "false");
    }

    if (employeeWeekViewButton) {
      employeeWeekViewButton.classList.toggle("active", activeEmployeeWeekView === "week");
      employeeWeekViewButton.setAttribute("aria-pressed", activeEmployeeWeekView === "week" ? "true" : "false");
    }

    setClassName(scheduleBoard, "schedule-board employee-roster-board");
    scheduleBoard.dataset.employeeView = activeEmployeeWeekView;

    if (activeEmployeeWeekView === "today") {
      const todayDate = getTodayDateValue();
      const todayEntries = employeeRosterEntries
        .filter((entry) => entry.day === todayDate)
        .sort((entryA, entryB) => entryA.startTime.localeCompare(entryB.startTime));
        const todayRequests = approvedTimeOffRequests.filter((request) => requestIncludesDate(request, todayDate));

        scheduleBoard.innerHTML = `
          <section class="employee-roster-today">
          ${renderEmployeeRosterDayCard(todayDate, todayEntries, todayRequests, `Vandaag - ${formatWeekday(todayDate)}`, {
            showEmployeeName: true,
            subtitle: formatDate(todayDate)
          })}
          </section>
        `;
        return;
    }

    scheduleBoard.innerHTML = `
      <section class="employee-roster-week-list">
        ${weekDates.map((day) => renderEmployeeRosterDayCard(
          day,
          employeeRosterEntries.filter((entry) => entry.day === day),
          approvedTimeOffRequests.filter((request) => requestIncludesDate(request, day)),
          undefined,
          { showEmployeeName: true }
        )).join("")}
      </section>
    `;
    return;
  }

  delete scheduleBoard.dataset.employeeView;

  const hasWeekPlannerShifts = showOpenPlannerSections && getWeekDates(selectedWeek).some((day) =>
    getDayPlannerShifts(day).some((shift) => !isOptionalShift(shift))
  );
  const employeeNames = [...new Set([
    ...visibleEntries.map((entry) => entry.name),
    ...approvedTimeOffRequests.map((request) => request.employeeName)
  ])].sort((nameA, nameB) => nameA.localeCompare(nameB, "nl"));

  if (employeeNames.length === 0 && !hasWeekPlannerShifts) {
    clearPlannerWeekInsights();
    setClassName(scheduleBoard, "schedule-board empty");
    scheduleBoard.textContent = "Geen diensten of afwezigheid gevonden voor deze filters.";
    return;
  }
  const desktopPlannerDates = weekDates.filter((day) => {
    const weekday = getWeekdayNumberFromDate(day);
    return (weekday >= 2 && weekday <= 6) || Boolean(getRecognizedSpecialDayInfo(day));
  });
  if (showPlannerInsights) {
    renderWeekReviewStatus(selectedWeek);
    renderPlannerControlPanel(selectedWeek, visibleEntries);
    renderWeekStatusOverview(weekDates);
    renderAutoFillSummaryOverview(selectedWeek);
    renderPlannerContractOverview(selectedWeek, visibleEntries);
    renderDeviationWhyOverview(selectedWeek, visibleEntries);
    renderOpenReplacementOverview(selectedWeek);
    renderWeekReplacementOverview(selectedWeek);
    renderControlModeOverview(weekDates, visibleEntries);
    rosterLegend?.classList.remove("hidden");
  } else {
    clearPlannerWeekInsights();
  }

  if (isMobileView()) {
    const plannerDeviationOnlyActive = isDeviationOnlyModeActive();
    setClassName(scheduleBoard, "schedule-board");
    scheduleBoard.innerHTML = `
      <p class="week-note">Weekrooster week ${selectedWeek.replace("-W", " - ")}</p>
      ${employeeWeekFocusMarkup}
      <section class="mobile-week">
        ${weekDates.map((day) => {
          const dayEntries = (plannerDeviationOnlyActive ? getDeviationOnlyEntries(visibleEntries, weekDates) : visibleEntries)
            .filter((entry) => entry.day === day)
            .sort((entryA, entryB) => entryA.startTime.localeCompare(entryB.startTime) || entryA.name.localeCompare(entryB.name, "nl"));
          const filledStageEntries = dayEntries.filter((entry) => isNonRequiredFilledShift(entry));
          const dayTimeOff = approvedTimeOffRequests
            .filter((request) => requestIncludesDate(request, day))
            .sort((requestA, requestB) => requestA.employeeName.localeCompare(requestB.employeeName, "nl"));
          const coverage = getShopCoverageLabel(day);
          const coverageStatus = getCoverageStatusName(coverage.className);
          const isClosedDay = coverageStatus === "closed";
          const mobilePlannerInfoMarkup = isPlannerRole()
            ? `${renderMobileCoverageAlert(coverageStatus, coverage.text)}${renderDayPlanningMessage(day, true)}`
            : "";
          const dayEmptyText = isPlannerRole()
            ? plannerDeviationOnlyActive
              ? "Geen afwijkingen in beeld"
              : isClosedDay
                ? "Geen diensten ingepland"
                : coverageStatus === "under"
                  ? "Nog geen ingevulde diensten"
                  : isDefaultFreeDay(day)
                    ? "Standaard vrij"
                    : "Nog geen ingevulde diensten"
            : (dayTimeOff.length ? getApprovedAbsenceLabel(dayTimeOff[0]) : "Geen dienst");

          return `
            <article class="mobile-day-card ${isDefaultFreeDay(day) ? "free-day-card" : ""} ${getRecognizedSpecialDayInfo(day) ? "has-special-day" : ""} ${getRelativeDayState(day) ? `is-${getRelativeDayState(day)}` : ""} is-${coverageStatus}">
              <div class="mobile-day-header">
                <div class="mobile-day-top">
                  <span class="mobile-day-short">${formatShortWeekday(day)}</span>
                  <div class="mobile-day-meta">
                    <strong>${formatWeekday(day)}</strong>
                    <span>${formatDate(day)}</span>
                  </div>
                </div>
                ${isPlannerRole() ? renderRelativeDayLabel(day) : ""}
                ${isPlannerRole() ? renderSpecialDayBadges(day, { compact: true }) : ""}
                ${isPlannerRole() ? (isClosedDay ? '<em class="free-day-label">Gesloten</em>' : isDefaultFreeDay(day) ? '<em class="free-day-label">Vrije dag</em>' : "") : ""}
                ${mobilePlannerInfoMarkup}
              </div>
              <div class="mobile-shift-list">
                ${dayEntries.length
                  ? dayEntries.map((entry) => renderShiftCard(entry, { showEmployee: true, showActions: isPlannerRole() })).join("")
                  : `<span class="planner-empty">${dayEmptyText}</span>`}
              </div>
              ${isPlannerRole() && filledStageEntries.length ? `<div class="day-planner-note is-info">${filledStageEntries.length} stageplek(ken) ingevuld</div>` : ""}
              ${renderSuitableEmployeesHelper(day)}
              ${isPlannerRole() && coverageStatus !== "closed" && dayTimeOff.length ? renderApprovedTimeOffList(dayTimeOff) : ""}
            </article>
          `;
        }).join("")}
      </section>
    `;
    applyPendingPlannerFocus();
    return;
  }

  const plannerDeviationOnlyActive = isDeviationOnlyModeActive();
  const plannerEntriesForBoard = plannerDeviationOnlyActive
    ? getDeviationOnlyEntries(visibleEntries, weekDates)
    : visibleEntries;
  setClassName(scheduleBoard, "schedule-board");
  scheduleBoard.innerHTML = `
    <p class="week-note">Weekrooster week ${selectedWeek.replace("-W", " - ")}</p>
    ${employeeWeekFocusMarkup}
    ${renderDesktopWeekColumns(desktopPlannerDates, (day) => {
      const dayEntries = plannerEntriesForBoard
        .filter((entry) => entry.day === day)
        .sort((entryA, entryB) =>
          entryA.startTime.localeCompare(entryB.startTime) ||
          entryA.name.localeCompare(entryB.name, "nl") ||
          getShiftName(entryA).localeCompare(getShiftName(entryB), "nl")
        );
      const dayTimeOff = approvedTimeOffRequests
        .filter((request) => requestIncludesDate(request, day))
        .sort((requestA, requestB) => requestA.employeeName.localeCompare(requestB.employeeName, "nl"));
      const shopCoverage = getShopCoverageLabel(day);
      const emptyText = plannerDeviationOnlyActive
        ? "Geen afwijkingen"
        : isDefaultFreeDay(day) ? "Standaard vrij" : "Geen diensten ingepland";
      const dayStatus = getDesktopDayStatus(day);
      const desktopPlannerStatusMarkup = isPlannerRole()
        ? `
            <span class="desktop-day-status ${dayStatus.className}">${dayStatus.label}</span>
          `
        : "";
      const desktopPlannerMetaMarkup = isPlannerRole()
        ? `
            <div class="desktop-day-header-meta">
              <span>${dayStatus.detail}</span>
            </div>
            ${renderDesktopDaySummary(day, dayEntries, roleVisibleEntries)}
          `
        : "";
      const desktopCoverageMarkup = isPlannerRole()
        ? `<em class="${shopCoverage.className}">${shopCoverage.text}</em>`
        : (shopCoverage.className.includes("closed") ? '<em class="free-day-label">Winkel gesloten</em>' : "");
      const desktopPlannerMessageMarkup = isPlannerRole() ? renderDayPlanningMessage(day) : "";

      return `
        <div class="desktop-day-header ${isDefaultFreeDay(day) ? "free-day-header" : ""}">
              <div class="desktop-day-header-top">
                <div class="desktop-day-header-main">
                  <strong>${formatWeekday(day)}</strong>
                  <span>${formatDate(day)}</span>
                </div>
                ${renderRelativeDayLabel(day)}
                ${desktopPlannerStatusMarkup}
              </div>
              ${renderSpecialDayBadges(day, { compact: true })}
              ${desktopPlannerMetaMarkup}
              ${isDefaultFreeDay(day) ? '<em class="free-day-label">Vrije dag</em>' : ""}
              ${desktopCoverageMarkup}
          ${renderDesktopDayActions(day)}
          ${desktopPlannerMessageMarkup}
        </div>
        ${renderDesktopPlannerSections({
          day,
          plannedEntries: dayEntries,
          sourceEntries: roleVisibleEntries,
          includeOpenShifts: showOpenPlannerSections && !plannerDeviationOnlyActive,
          showEmployee: true,
          showActions: isPlannerRole(),
          emptyText,
          absenceMarkup: renderDesktopAbsenceList(dayTimeOff),
          footerMarkup: showOpenPlannerSections ? renderSuitableEmployeesHelper(day) : ""
        })}
      `;
    })}
  `;
  applyPendingPlannerFocus();
}

function renderMySchedule() {
  ensureEmployeeIdentityForCurrentRole();
  const employeeName = isPlannerRole() ? portalEmployeeSelect.value : getRoleScopedEmployeeName();
  const selectedWeek = myScheduleWeekInput.value || weekFilterInput.value || getCurrentWeekValue();

  if (!employeeName) {
    setClassName(myScheduleBoard, "schedule-board empty");
    myScheduleBoard.textContent = isPlannerRole() ? "Kies een medewerker." : "Geen medewerker gekoppeld.";
    return;
  }

  const entriesForEmployee = entries
    .filter((entry) => entry.name === employeeName && getWeekValueFromDate(entry.day) === selectedWeek)
    .sort((entryA, entryB) => entryA.day.localeCompare(entryB.day) || entryA.startTime.localeCompare(entryB.startTime));
  const weekDates = getWeekDates(selectedWeek);
  const approvedTimeOffRequests = timeOffRequests.filter((request) =>
    request.status === "approved" &&
    request.employeeName === employeeName &&
    requestOverlapsRange(request, weekDates[0], weekDates[6])
  );

  const isEmployeeMobileView = !isPlannerRole() && isMobileView();

  if (isEmployeeMobileView) {
    const plannedDays = weekDates.filter((day) => entriesForEmployee.some((entry) => entry.day === day));

    setClassName(myScheduleBoard, "schedule-board");
    myScheduleBoard.innerHTML = plannedDays.length
      ? `
        <section class="mobile-week my-schedule-mobile-week my-schedule-simple-week">
          ${plannedDays.map((day) => {
            const dayEntries = entriesForEmployee
              .filter((entry) => entry.day === day)
              .sort((entryA, entryB) => entryA.startTime.localeCompare(entryB.startTime));

            return `
              <article class="mobile-day-card my-schedule-day-card my-schedule-simple-card ${isToday(day) ? "is-today" : ""} ${isTomorrow(day) ? "is-tomorrow" : ""}">
                <div class="mobile-day-header my-schedule-simple-header">
                  <strong>${formatWeekday(day)}</strong>
                  <span>${formatDate(day)}</span>
                </div>
                <div class="mobile-shift-list my-schedule-simple-list">
                  ${dayEntries.map((entry) => `
                    <article class="shift-card my-schedule-simple-shift ${getShiftColorClass(entry)}">
                      <div class="shift-name">${getShiftName(entry)}</div>
                      <div class="shift-time">${entry.startTime} - ${entry.endTime}</div>
                    </article>
                  `).join("")}
                </div>
              </article>
            `;
          }).join("")}
        </section>
      `
      : `<div class="planner-empty">Geen diensten in deze week.</div>`;
  } else if (isMobileView()) {
    setClassName(myScheduleBoard, "schedule-board");
    myScheduleBoard.innerHTML = `
      <section class="mobile-week my-schedule-mobile-week">
        ${weekDates.map((day) => {
          const dayEntries = entriesForEmployee
            .filter((entry) => entry.day === day)
            .sort((entryA, entryB) => entryA.startTime.localeCompare(entryB.startTime));
          const approvedTimeOff = approvedTimeOffRequests.find((request) => requestIncludesDate(request, day));
          const approvedAbsenceLabel = getApprovedAbsenceLabel(approvedTimeOff);
          const isClosedDay = isClosedPlannerDay(day);

          return `
            <article class="mobile-day-card my-schedule-day-card ${isDefaultFreeDay(day) ? "free-day-card" : ""} ${getRecognizedSpecialDayInfo(day) ? "has-special-day" : ""}">
              <div class="mobile-day-header">
                <div class="mobile-day-top">
                  <span class="mobile-day-short">${formatShortWeekday(day)}</span>
                  <div class="mobile-day-meta">
                    <strong>${formatWeekday(day)}</strong>
                    <span>${formatDate(day)}</span>
                  </div>
                </div>
                <span class="mobile-day-status">${dayEntries.length ? "Dienst ingepland" : approvedTimeOff ? approvedAbsenceLabel : isClosedDay ? "Gesloten" : "Vrij"}</span>
                ${renderSpecialDayBadges(day, { compact: true })}
                ${isClosedDay ? '<em class="free-day-label">Gesloten</em>' : isDefaultFreeDay(day) ? '<em class="free-day-label">Standaard vrije dag</em>' : ""}
              </div>
              <div class="mobile-shift-list">
                ${dayEntries.length
                  ? dayEntries.map((entry) => `
                    <article class="shift-card ${getShiftColorClass(entry)}">
                      <div class="shift-status">${entry.replacementFor ? `Vervangt ${entry.replacementFor}` : approvedTimeOff ? "Aangepast rooster" : "Ingepland"}</div>
                      <div class="shift-name">${getShiftName(entry)}</div>
                      <div class="shift-context">${getShiftContextLabel(entry)}</div>
                      <div class="shift-time">${entry.startTime} - ${entry.endTime}</div>
                    </article>
                  `).join("")
                  : `<span class="planner-empty">${approvedTimeOff ? approvedAbsenceLabel : isClosedDay ? "Gesloten" : isDefaultFreeDay(day) ? "Vrije dag" : "Geen dienst"}</span>`}
              </div>
              ${approvedTimeOff ? `<div class="mobile-free-item absence-${getAbsenceCardClass(approvedTimeOff.type)}">${approvedAbsenceLabel}${approvedTimeOff.reason ? ` - ${approvedTimeOff.reason}` : ""}</div>` : ""}
            </article>
          `;
        }).join("")}
      </section>
    `;
  } else {
    setClassName(myScheduleBoard, "schedule-board");
    myScheduleBoard.innerHTML = `
      ${renderDesktopWeekColumns(weekDates, (day) => {
        const dayEntries = entriesForEmployee
          .filter((entry) => entry.day === day)
          .sort((entryA, entryB) => entryA.startTime.localeCompare(entryB.startTime));
        const approvedTimeOff = approvedTimeOffRequests.find((request) => requestIncludesDate(request, day));
        const approvedAbsenceLabel = getApprovedAbsenceLabel(approvedTimeOff);
        const isClosedDay = isClosedPlannerDay(day);

        return `
          <div class="desktop-day-header ${isDefaultFreeDay(day) ? "free-day-header" : ""}">
            <strong>${formatWeekday(day)}</strong>
            <span>${formatDate(day)}</span>
            ${renderSpecialDayBadges(day, { compact: true })}
            ${isClosedDay ? '<em class="free-day-label">Gesloten</em>' : isDefaultFreeDay(day) ? '<em class="free-day-label">Vrije dag</em>' : ""}
          </div>
          ${renderDesktopPlannerSections({
            day,
            plannedEntries: dayEntries,
            sourceEntries: entriesForEmployee,
            includeOpenShifts: false,
            showEmployee: false,
            showActions: false,
            emptyText: approvedTimeOff ? approvedAbsenceLabel : isClosedDay ? "Gesloten" : "Geen dienst",
            absenceMarkup: approvedTimeOff ? `<div class="planner-note approved absence-${getAbsenceCardClass(approvedTimeOff.type)}">${approvedAbsenceLabel}${approvedTimeOff.reason ? `: ${approvedTimeOff.reason}` : ""}</div>` : ""
          })}
        `;
      })}
    `;
  }
}

function renderMyHours() {
  ensureEmployeeIdentityForCurrentRole();
  const employeeName = isPlannerRole() ? hoursEmployeeSelect.value : getRoleScopedEmployeeName();
  const selectedDate = getSelectedHoursDate();
  const todayValue = getTodayLocalDateValue();

  if (hoursDateInput) {
    hoursDateInput.max = todayValue;
  }

  if (hoursDateInput && hoursDateInput.value !== selectedDate) {
    hoursDateInput.value = selectedDate;
  }

  if (!employeeName) {
    if (myHoursSectionSwitch) {
      myHoursSectionSwitch.hidden = true;
    }
    if (submitWeekHoursButton) {
      submitWeekHoursButton.disabled = true;
      submitWeekHoursButton.classList.toggle("hidden", isPlannerRole());
    }
    setClassName(myHoursHighlight, "hours-highlight empty");
    myHoursHighlight.textContent = isPlannerRole() ? "Kies een medewerker." : "Geen medewerker gekoppeld.";
    setClassName(myHoursSummary, "totals empty");
    myHoursSummary.textContent = isPlannerRole() ? "Nog geen uren beschikbaar." : "Nog geen uren beschikbaar voor jouw account.";
    if (myHoursRegistrations) {
      setClassName(myHoursRegistrations, "request-list empty");
      myHoursRegistrations.textContent = isPlannerRole()
        ? "Kies een medewerker om urenregistratie te tonen."
        : "Nog geen medewerker gekoppeld voor urenregistratie.";
    }
    return;
  }

  const employeeEntries = entries.filter((entry) => entry.name === employeeName);
  const employeeWorkLogs = workLogs.filter((log) => log.employeeName === employeeName);
  const plannedTodayEntries = employeeEntries
    .filter((entry) => entry.day === todayValue)
    .sort((entryA, entryB) => entryA.startTime.localeCompare(entryB.startTime));
  const weeklyTotals = employeeEntries.reduce((accumulator, entry) => {
    const weekValue = getWeekValueFromDate(entry.day);
    accumulator[weekValue] = (accumulator[weekValue] || 0) + entry.hours;
    return accumulator;
  }, {});
  const missingPastEntries = employeeEntries
    .filter((entry) =>
      entry.day < getTodayLocalDateValue() &&
      !getWorkLogForEntry(entry)
    )
    .sort((entryA, entryB) => entryB.day.localeCompare(entryA.day) || entryA.startTime.localeCompare(entryB.startTime));
  const missingPastDays = [...new Set(missingPastEntries.map((entry) => entry.day))];
  let effectiveSelectedDate = selectedDate;
  const hasSelectedDateEntry = employeeEntries.some((entry) => entry.day === selectedDate);
  const hasSelectedDateManualLog = Boolean(getManualWorkLogForDate(employeeName, selectedDate));

  if (!hasSelectedDateEntry && !hasSelectedDateManualLog) {
    if (plannedTodayEntries.length) {
      effectiveSelectedDate = todayValue;
    } else if (missingPastDays.length) {
      effectiveSelectedDate = missingPastDays[0];
    }
  }

  const selectedWeek = getWeekValueFromDate(effectiveSelectedDate) || hoursWeekInput.value || weekFilterInput.value || getCurrentWeekValue();
  const selectedWeekHours = weeklyTotals[selectedWeek] || 0;
  const selectedWeekEntries = employeeEntries
    .filter((entry) => getWeekValueFromDate(entry.day) === selectedWeek)
    .sort((entryA, entryB) => entryA.day.localeCompare(entryB.day) || entryA.startTime.localeCompare(entryB.startTime));
  const selectedWeekPastEntries = selectedWeekEntries.filter((entry) => entry.day <= todayValue);

  if (hoursWeekInput && hoursWeekInput.value !== selectedWeek) {
    hoursWeekInput.value = selectedWeek;
  }

  if (hoursDateInput && hoursDateInput.value !== effectiveSelectedDate) {
    hoursDateInput.value = effectiveSelectedDate;
  }

  if (preferences.lastHoursDate !== effectiveSelectedDate || preferences.lastHoursWeek !== selectedWeek) {
    preferences.lastHoursDate = effectiveSelectedDate;
    preferences.lastHoursWeek = selectedWeek;
    savePreferences();
  }

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
  const selectedDateEntries = selectedWeekEntries
    .filter((entry) => entry.day === effectiveSelectedDate)
    .sort((entryA, entryB) => entryA.startTime.localeCompare(entryB.startTime));
  const selectedWeekLogs = employeeWorkLogs.filter((log) => getWeekValueFromDate(log.day) === selectedWeek);
  const submittableWeekLogs = selectedWeekLogs.filter((log) =>
    log.day <= todayValue &&
    (log.status === "draft" || log.status === "revision" || log.status === "rejected")
  );
  const selectedWeekWorkedHours = selectedWeekEntries.reduce((total, entry) => {
    const workLog = getWorkLogForEntry(entry);
    const workedHours = workLog ? calculateWorkedHours(workLog.actualStart, workLog.actualEnd, workLog.breakMinutes) : null;
    return total + (workedHours || 0);
  }, 0);
  const selectedDateWorkedHours = selectedDateEntries.reduce((total, entry) => {
    const workLog = getWorkLogForEntry(entry);
    const workedHours = workLog ? calculateWorkedHours(workLog.actualStart, workLog.actualEnd, workLog.breakMinutes) : null;
    return total + (workedHours || 0);
  }, 0);
  const manualWorkLog = getManualWorkLogForDate(employeeName, effectiveSelectedDate);

  if (employeeEntries.length === 0 && employeeWorkLogs.length === 0 && isPlannerRole()) {
    if (myHoursSectionSwitch) {
      myHoursSectionSwitch.hidden = !isPlannerRole();
    }
    if (submitWeekHoursButton) {
      submitWeekHoursButton.disabled = true;
      submitWeekHoursButton.classList.toggle("hidden", isPlannerRole());
    }
    setClassName(myHoursHighlight, "hours-highlight empty");
    myHoursHighlight.textContent = "Nog geen uren gevonden voor deze medewerker.";
    setClassName(myHoursSummary, "totals empty");
    myHoursSummary.textContent = "Nog geen uren gevonden voor deze medewerker.";
    if (myHoursRegistrations) {
      setClassName(myHoursRegistrations, "request-list empty");
      myHoursRegistrations.textContent = "Nog geen ingeplande diensten of urenregistraties voor deze medewerker.";
    }
    return;
  }

  if (submitWeekHoursButton) {
    submitWeekHoursButton.classList.toggle("hidden", isPlannerRole());
    submitWeekHoursButton.disabled = !submittableWeekLogs.length || missingSubmittableWeekDays.length > 0;
    submitWeekHoursButton.title = missingSubmittableWeekDays.length
      ? "Vul eerst alle ontbrekende dagen van deze week in."
      : (!submittableWeekLogs.length ? "Er zijn geen ingevulde uren om in te dienen." : "");
  }

  setClassName(myHoursHighlight, "hours-highlight");
  const firstMissingPastDay = missingPastDays[0] || "";
  const selectedDateSectionLabel = effectiveSelectedDate === todayValue ? "Vandaag" : "Afgelopen dag";
  const selectedDateStatus = selectedDateEntries.length
    ? getDayWorkLogStatusForEntries(selectedDateEntries)
    : manualWorkLog
      ? getWorkLogStatusLabel(manualWorkLog).toLowerCase()
      : "leeg";
  const selectedDateStatusLabel = selectedDateStatus
    ? selectedDateStatus.charAt(0).toUpperCase() + selectedDateStatus.slice(1)
    : "";
  const weekOverviewMarkup = `
    <div class="hours-week-overview">
      <span><strong>${filledWeekDays.length}</strong> ingevuld</span>
      <span><strong>${openWeekDays.length}</strong> open</span>
      <span><strong>${formatHours(selectedWeekWorkedHours)}</strong> deze week</span>
    </div>
  `;

  if (!isPlannerRole()) {
    const hasTodayPlannedEntries = plannedTodayEntries.length > 0;
    const defaultEmployeeHoursSection = hasTodayPlannedEntries
      ? "today"
      : (missingPastDays.length ? "missing" : "fill");
    const resolvedSection = activeMyHoursSection || defaultEmployeeHoursSection;
    activeMyHoursSection = resolvedSection;

    if (submitWeekHoursButton) {
      submitWeekHoursButton.hidden = true;
      submitWeekHoursButton.disabled = true;
    }

    if (myHoursSectionSwitch) {
      myHoursSectionSwitch.hidden = false;
    }

    [
      [myHoursTodayButton, "today"],
      [myHoursFillButton, "fill"],
      [myHoursMissingButton, "missing"]
    ].forEach(([button, section]) => {
      if (!button) {
        return;
      }
      button.classList.toggle("active", resolvedSection === section);
      button.setAttribute("aria-pressed", resolvedSection === section ? "true" : "false");
    });

    if (resolvedSection === "missing") {
      setClassName(myHoursHighlight, "hours-highlight");
      myHoursHighlight.innerHTML = `
        <span class="hours-section-kicker">Nog in te vullen uren</span>
        <strong>${missingPastDays.length ? `${missingPastDays.length} ${missingPastDays.length === 1 ? "open dag" : "open dagen"}` : "Alles ingevuld"}</strong>
        ${weekOverviewMarkup}
      `;

      setClassName(myHoursSummary, missingPastDays.length ? "totals" : "totals empty");
      myHoursSummary.innerHTML = missingPastDays.length
        ? `
          <div class="hours-missing-list">
            ${missingPastDays.map((day) => `
              <button type="button" class="hours-missing-item" data-hours-pick-date="${day}">
                <span>${formatWeekday(day)} ${formatDate(day)}</span>
              </button>
            `).join("")}
          </div>
        `
        : "Geen open uren meer.";

      setClassName(myHoursRegistrations, "hours-registration-list");
      myHoursRegistrations.innerHTML = "";
      return;
    }

    if (resolvedSection === "today") {
      setClassName(myHoursHighlight, "hours-highlight");
      myHoursHighlight.innerHTML = `
        <span class="hours-section-kicker">Uren doorgeven</span>
        <span class="hours-label">${formatWeekday(todayValue)} ${formatDate(todayValue)}</span>
        <strong>${hasTodayPlannedEntries ? `${plannedTodayEntries.length === 1 ? "Dienst van vandaag" : "Diensten van vandaag"}` : "Geen dienst vandaag"}</strong>
        <small>${hasTodayPlannedEntries ? "Bevestig of pas kort aan." : "Geen dienst vandaag. Gebruik Uren invullen voor extra uren."}</small>
        ${weekOverviewMarkup}
      `;
      setClassName(myHoursSummary, "totals hidden");
      myHoursSummary.innerHTML = "";
      setClassName(myHoursRegistrations, "hours-registration-list is-today-quick");
      myHoursRegistrations.innerHTML = hasTodayPlannedEntries
        ? plannedTodayEntries.map((entry) => renderWorkLogCardMarkup(entry)).join("")
        : `
          <div class="hours-day-empty">
            <strong>Geen dienst gepland voor vandaag.</strong>
            <span>Gebruik Uren invullen om extra uren van vandaag vast te leggen.</span>
          </div>
        `;
      return;
    }

    setClassName(myHoursHighlight, "hours-highlight");
    myHoursHighlight.innerHTML = `
      <span class="hours-section-kicker">Uren invullen</span>
      <span class="hours-label">${formatWeekday(effectiveSelectedDate)} ${formatDate(effectiveSelectedDate)}</span>
      <strong>${selectedDateEntries.length ? `${selectedDateEntries.length === 1 ? "Geplande dienst" : "Geplande diensten"} van deze dag` : "Extra uren van deze dag"}</strong>
      <small>${selectedDateStatusLabel ? `Status: ${selectedDateStatusLabel}` : "Nog niet ingevuld"}</small>
      ${weekOverviewMarkup}
    `;

    const availableEntryMode = selectedDateEntries.length ? activeMyHoursEntryMode || "planned" : "extra";
    activeMyHoursEntryMode = availableEntryMode;
    setClassName(myHoursSummary, "totals");
    myHoursSummary.innerHTML = missingPastDays.length
      ? `
        <div class="hours-entry-mode-switch">
          <button type="button" class="request-switch-button ${activeMyHoursEntryMode === "planned" ? "active" : ""}" data-hours-entry-mode="planned" ${selectedDateEntries.length ? "" : "disabled"}>
            Geplande uren
          </button>
          <button type="button" class="request-switch-button ${activeMyHoursEntryMode === "extra" ? "active" : ""}" data-hours-entry-mode="extra">
            Extra uren
          </button>
        </div>
        <button type="button" class="hours-reminder-banner" data-hours-open-section="missing">
          <strong>Je hebt nog uren openstaan</strong>
          <span>${missingPastDays.length} ${missingPastDays.length === 1 ? "dag" : "dagen"} nog invullen</span>
        </button>
      `
      : `
        <div class="hours-entry-mode-switch">
          <button type="button" class="request-switch-button ${activeMyHoursEntryMode === "planned" ? "active" : ""}" data-hours-entry-mode="planned" ${selectedDateEntries.length ? "" : "disabled"}>
            Geplande uren
          </button>
          <button type="button" class="request-switch-button ${activeMyHoursEntryMode === "extra" ? "active" : ""}" data-hours-entry-mode="extra">
            Extra uren
          </button>
        </div>
      `;

    setClassName(myHoursRegistrations, `hours-registration-list${effectiveSelectedDate === todayValue ? " is-today-quick" : ""}`);
    myHoursRegistrations.innerHTML = activeMyHoursEntryMode === "planned" && selectedDateEntries.length
      ? selectedDateEntries.map((entry) => renderWorkLogCardMarkup(entry)).join("")
      : `
        <div class="hours-day-empty">
                <strong>${activeMyHoursEntryMode === "extra" ? `Extra uren op ${formatWeekday(effectiveSelectedDate)} ${formatDate(effectiveSelectedDate)}` : `Geen dienst gepland op ${formatWeekday(effectiveSelectedDate)} ${formatDate(effectiveSelectedDate)}.`}</strong>
                <span>${activeMyHoursEntryMode === "extra" ? "Gebruik dit alleen voor extra werk buiten je geplande dienst, op vandaag of een eerdere datum." : "Vul alleen extra uren in als je buiten het rooster hebt gewerkt."}</span>
              </div>
        ${renderWorkLogCardMarkup(buildHoursManualEntry(employeeName, effectiveSelectedDate), manualWorkLog, {
          shiftName: "Extra uren",
          workLogId: buildManualWorkLogId(employeeName, effectiveSelectedDate),
          notesLabel: "Reden of type werk",
          notesPlaceholder: "Korte reden of type werk"
        })}
      `;
    return;
  }

  if (isPlannerRole()) {
    myHoursHighlight.innerHTML = `
        <span class="hours-section-kicker">${selectedDateSectionLabel}</span>
        <span class="hours-label">${formatWeekday(effectiveSelectedDate)} ${formatDate(effectiveSelectedDate)}</span>
        <strong>${selectedDateEntries.length ? `${selectedDateEntries.length} geplande ${selectedDateEntries.length === 1 ? "dienst" : "diensten"}` : "Geen dienst gepland"}</strong>
        <small>${selectedDateEntries.length
          ? (selectedDateWorkedHours > 0 ? `Werkelijk geregistreerd op deze dag: ${formatHours(selectedDateWorkedHours)}` : "Bevestig of pas alleen de werkelijke tijden van deze dag aan.")
          : "Alleen als er echt gewerkt is, kun je hieronder handmatig uren invullen."}</small>
        ${missingPastDays.length ? `
          <button type="button" class="hours-reminder-banner" data-hours-pick-date="${firstMissingPastDay}">
            <strong>Je hebt nog ${missingPastDays.length} ${missingPastDays.length === 1 ? "dag" : "dagen"} niet ingevuld.</strong>
            <span>Klik hier om direct de eerstvolgende open dag te openen.</span>
          </button>
        ` : ""}
      `;
  } else {
    myHoursHighlight.innerHTML = `
        ${missingPastDays.length ? `
          <button type="button" class="hours-reminder-banner" data-hours-pick-date="${firstMissingPastDay}">
            <strong>Je hebt nog uren openstaan</strong>
            <span>${missingPastDays.length} ${missingPastDays.length === 1 ? "dag" : "dagen"} nog invullen</span>
          </button>
        ` : ""}
        <span class="hours-section-kicker">${selectedDateSectionLabel}</span>
        <span class="hours-label">${formatWeekday(effectiveSelectedDate)} ${formatDate(effectiveSelectedDate)}</span>
        <strong>${selectedDateEntries.length ? `${selectedDateEntries.length === 1 ? "Geplande dienst" : "Geplande diensten"} van deze dag` : "Geen dienst gepland"}</strong>
        <small>${selectedDateStatusLabel ? `Status: ${selectedDateStatusLabel}` : "Nog niet ingevuld"}</small>
      `;
  }

  if (!isPlannerRole()) {
    setClassName(myHoursSummary, "totals hidden");
    myHoursSummary.innerHTML = "";
  } else if (missingPastDays.length) {
    setClassName(myHoursSummary, "totals");
    myHoursSummary.innerHTML = `
      <div class="hours-week-overview">
        <div class="hours-week-stat is-complete">
          <strong>Ingevuld</strong>
          <span>${filledWeekDays.length}</span>
          <small>${filledWeekDays.length === 1 ? "dag klaar" : "dagen klaar"}</small>
        </div>
        <div class="hours-week-stat ${openWeekDays.length ? "is-warning" : "is-complete"}">
          <strong>Open</strong>
          <span>${openWeekDays.length}</span>
          <small>${openWeekDays.length ? "nog invullen" : "niets open"}</small>
        </div>
      </div>
      <div class="hours-missing-block">
        <strong>Open dagen</strong>
        <div class="hours-missing-list">
          ${missingPastDays.map((day) => {
            const dayEntries = missingPastEntries.filter((entry) => entry.day === day);
            return `
              <button type="button" class="hours-missing-item" data-hours-pick-date="${day}">
                <span>${formatWeekday(day)} ${formatDate(day)}</span>
                <small>${dayEntries.length} ${dayEntries.length === 1 ? "dienst" : "diensten"} nog in te vullen</small>
              </button>
            `;
          }).join("")}
        </div>
      </div>
    `;
  } else {
    setClassName(myHoursSummary, "totals");
    myHoursSummary.innerHTML = `
      <div class="hours-week-overview">
        <div class="hours-week-stat is-complete">
          <strong>Ingevuld</strong>
          <span>${filledWeekDays.length}</span>
          <small>${filledWeekDays.length === 1 ? "dag klaar" : "dagen klaar"}</small>
        </div>
        <div class="hours-week-stat is-complete">
          <strong>Open</strong>
          <span>0</span>
          <small>niets open</small>
        </div>
      </div>
    `;
  }

  if (!myHoursRegistrations) {
    return;
  }

  if (selectedWeekEntries.length === 0 && !manualWorkLog) {
    setClassName(myHoursRegistrations, "request-list empty");
    myHoursRegistrations.textContent = "Nog geen ingeplande diensten in deze week.";
    return;
  }

  const isTodaySelection = effectiveSelectedDate === todayValue;
  const selectedDateMarkup = `
    <div class="hours-day-section-head">
      <strong>${effectiveSelectedDate === todayValue ? "Vandaag" : "Afgelopen dag"}</strong>
      <span>${formatWeekday(effectiveSelectedDate)} ${formatDate(effectiveSelectedDate)}</span>
    </div>
  ` + (selectedDateEntries.length
    ? `
      ${isPlannerRole() && isTodaySelection ? `
        <div class="hours-today-quick-note">
          <strong>Snelle ureninvoer voor vandaag</strong>
          <span>Bevestig je geplande tijden met <em>Gewerkt zoals gepland</em> of pas start, eind en pauze aan.</span>
        </div>
      ` : ""}
      ${selectedDateEntries.map((entry) => renderWorkLogCardMarkup(entry)).join("")}
    `
    : `
      <div class="hours-day-empty">
        <strong>Geen dienst gepland op ${formatWeekday(effectiveSelectedDate)} ${formatDate(effectiveSelectedDate)}.</strong>
        <span>Alleen als er echt gewerkt is, kun je hieronder handmatig uren registreren.</span>
      </div>
      ${renderWorkLogCardMarkup(buildHoursManualEntry(employeeName, effectiveSelectedDate), manualWorkLog, {
        shiftName: "Extra uren",
        workLogId: buildManualWorkLogId(employeeName, effectiveSelectedDate)
      })}
    `);

  setClassName(myHoursRegistrations, `hours-registration-list${isTodaySelection ? " is-today-quick" : ""}`);
  myHoursRegistrations.innerHTML = selectedDateMarkup;
}

function openHoursForDate(targetDate) {
  if (!targetDate || !hoursDateInput || !hoursWeekInput) {
    return;
  }

  const safeDate = clampHoursDateValue(targetDate);
  const targetWeek = getWeekValueFromDate(safeDate) || getCurrentWeekValue();
  const scopedEmployeeName = ensureEmployeeIdentityForCurrentRole();
  if (!isPlannerRole()) {
    activeMyHoursSection = safeDate === getTodayLocalDateValue() ? "today" : "fill";
    activeMyHoursEntryMode = "planned";
  }
  hoursDateInput.value = safeDate;
  hoursWeekInput.value = targetWeek;
  preferences.lastHoursDate = safeDate;
  preferences.lastHoursWeek = targetWeek;
  if (!isPlannerRole() && scopedEmployeeName) {
    preferences.lastHoursEmployee = scopedEmployeeName;
  }
  savePreferences();
  syncScopedEmployeeSelectors(scopedEmployeeName);
  setActiveTab("my-hours", { preserveMyHoursSection: true });
  renderMyHours();
  renderMySchedule();
  renderSchedule();
  if (isPlannerRole()) {
    renderDashboard();
  }
}

function getDayWorkLogStatusForEntries(dayEntries) {
  if (!Array.isArray(dayEntries) || !dayEntries.length) {
    return "";
  }

  const logs = dayEntries.map((entry) => getWorkLogForEntry(entry));

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

function quickCompleteWorkDay(targetDate) {
  const employeeName = getRoleScopedEmployeeName();

  if (isPlannerRole() || !employeeName) {
    return;
  }

  const safeDate = clampHoursDateValue(targetDate);

  if (safeDate !== getTodayDateValue()) {
    openHoursForDate(safeDate);
    return;
  }

  const todayEntries = entries
    .filter((entry) => entry.name === employeeName && entry.day === safeDate)
    .sort((entryA, entryB) => entryA.startTime.localeCompare(entryB.startTime));

  if (!todayEntries.length) {
    openHoursForDate(safeDate);
    return;
  }

  const nowIso = getNowIsoString();

  todayEntries.forEach((entry) => {
    const workLogId = getWorkLogIdForEntry(entry);
    const existingLog = workLogs.find((log) => log.id === workLogId) || null;

    if (existingLog?.status === "open" || existingLog?.status === "approved") {
      return;
    }

    const plannedValues = getPlannedWorkLogValues(entry, existingLog);
    const roundedNowValue = getCurrentRoundedTimeValue(5);
    const suggestedEndTime = entry.startTime && calculateHours(entry.startTime, roundedNowValue) === null
      ? addMinutesToTimeValue(entry.startTime, 5)
      : roundedNowValue;
    const nextLog = {
      id: workLogId,
      employeeName: entry.name,
      day: entry.day,
      shiftName: getShiftName(entry),
      plannedStart: entry.startTime,
      plannedEnd: entry.endTime,
      actualStart: plannedValues.actualStart,
      actualEnd: suggestedEndTime,
      breakMinutes: plannedValues.breakMinutes,
      notes: existingLog?.notes || "",
      employeeReply: existingLog?.employeeReply || "",
      mailLog: sanitizeRequestMailLog(existingLog?.mailLog),
      status: "draft",
      managerNote: existingLog?.managerNote || "",
      submittedAt: existingLog?.submittedAt || "",
      updatedAt: nowIso,
      auditTrail: [
        ...(existingLog?.auditTrail || []),
        createWorkLogAuditEntry("quick-complete-day", `werkdag afgerond: start ${plannedValues.actualStart || entry.startTime || ""}, einde ${suggestedEndTime}`)
      ]
    };
    const existingIndex = workLogs.findIndex((log) => log.id === workLogId);

    if (existingIndex >= 0) {
      workLogs[existingIndex] = nextLog;
    } else {
      workLogs.push(nextLog);
    }
  });

  saveWorkLogs();
  persistProtectedChange({
    reason: `Werkdag afgerond: ${employeeName} ${safeDate}`,
    scope: "worklog",
    action: "worklog-day-completed",
    message: `Werkdag afgerond voor ${employeeName} op ${formatDate(safeDate)}.`,
    details: {
      employeeName,
      day: safeDate
    }
  });
  openHoursForDate(safeDate);
  renderMySchedule();
  showMessage("Werkdag afgerond.", "success");
}

function renderTotals() {
  const visibleEntries = getFilteredEntries();

  if (visibleEntries.length === 0) {
    setClassName(totalsContainer, "totals empty");
    totalsContainer.textContent = "Nog geen totalen beschikbaar voor deze filters.";
    return;
  }

  const totals = visibleEntries.reduce((accumulator, entry) => {
    accumulator[entry.name] = (accumulator[entry.name] || 0) + entry.hours;
    return accumulator;
  }, {});

  setClassName(totalsContainer, "totals");
  totalsContainer.innerHTML = Object.entries(totals)
    .sort(([nameA], [nameB]) => nameA.localeCompare(nameB, "nl"))
    .map(([name, hours]) => `
      <div class="total-item">
        <strong>${name}</strong>
        <span>${formatHours(hours)}</span>
      </div>
    `)
    .join("");
}

function getEntryFromWorkLogId(workLogId) {
  return entries.find((entry) =>
    buildWorkLogId(entry.name, entry.day, getShiftName(entry), entry.startTime, entry.endTime) === workLogId
  ) || null;
}

function saveWorkLogFromForm(workLogId, action = "save") {
  const entry = getWorkLogContextById(workLogId);

  if (!entry) {
    showMessage("De gekoppelde dienst is niet meer gevonden.", "error");
    return;
  }

  if (!ensureOwnEmployeeAccess(entry.name, "Je kunt alleen je eigen urenregistratie invullen.")) {
    return;
  }

  if (isFutureDateValue(entry.day)) {
    showMessage("Uren voor toekomstige diensten kun je nog niet invullen.", "error");
    renderMyHours();
    return;
  }

  if (!ensureEmployeeWeekEditable(entry.day, "uren in te dienen of te wijzigen")) {
    renderMyHours();
    return;
  }

  const actualStartInput = myHoursRegistrations?.querySelector(`[data-worklog-field="actualStart"][data-worklog-id="${workLogId}"]`);
  const actualEndInput = myHoursRegistrations?.querySelector(`[data-worklog-field="actualEnd"][data-worklog-id="${workLogId}"]`);
  const breakMinutesInput = myHoursRegistrations?.querySelector(`[data-worklog-field="breakMinutes"][data-worklog-id="${workLogId}"]`);
  const notesInput = myHoursRegistrations?.querySelector(`[data-worklog-field="notes"][data-worklog-id="${workLogId}"]`);
  const employeeReplyInput = myHoursRegistrations?.querySelector(`[data-worklog-field="employeeReply"][data-worklog-id="${workLogId}"]`);

  if (!actualStartInput || !actualEndInput || !breakMinutesInput || !notesInput) {
    showMessage("De urenregistratie kan niet worden geladen.", "error");
    return;
  }

  const actualStart = actualStartInput.value;
  const actualEnd = actualEndInput.value;
  const breakMinutes = Math.max(0, Number(breakMinutesInput.value) || 0);
  const notes = notesInput.value.trim();
  const existingLog = workLogs.find((log) => log.id === workLogId) || null;
  const employeeReply = employeeReplyInput ? employeeReplyInput.value.trim() : (existingLog?.employeeReply || "");
  const validation = getWorkLogValidationState(entry, {
    actualStart,
    actualEnd,
    breakMinutes
  });

  if (!isPlannerRole() && existingLog && (existingLog.status === "open" || existingLog.status === "approved")) {
    showMessage(
      existingLog.status === "approved"
        ? "Goedgekeurde uren zijn geblokkeerd voor verdere wijziging."
        : "Deze urenregistratie is al ingediend en kan niet meer door de medewerker worden gewijzigd.",
      "error"
    );
    renderMyHours();
    return;
  }

  if (!actualStart || !actualEnd) {
    showMessage("Vul zowel de werkelijke starttijd als eindtijd in.", "error");
    return;
  }

  if (entry.isManualHours && !notes) {
    showMessage("Vul bij extra uren een korte reden of type werk in.", "error");
    return;
  }

  const workedHours = validation.workedHours;

  if (validation.isInvalidRange || workedHours === null) {
    showMessage("Controleer de werkelijke tijden en pauze. De eindtijd moet later zijn dan de starttijd.", "error");
    return;
  }

  if (!isPlannerRole() && (existingLog?.status === "revision" || existingLog?.status === "rejected") && !employeeReply) {
    showMessage("Voeg een korte reactie of toelichting toe voordat je opnieuw indient.", "error");
    return;
  }

  const deviationSummaryParts = [];

  if (actualStart !== entry.startTime) {
    deviationSummaryParts.push(`start ${entry.startTime} -> ${actualStart}`);
  }

  if (actualEnd !== entry.endTime) {
    deviationSummaryParts.push(`einde ${entry.endTime} -> ${actualEnd}`);
  }

  if (breakMinutes > 0) {
    deviationSummaryParts.push(`pauze ${breakMinutes} min`);
  }

  if (notes) {
    deviationSummaryParts.push("opmerking toegevoegd");
  }

  if (employeeReply) {
    deviationSummaryParts.push("reactie medewerker toegevoegd");
  }

  const summary = deviationSummaryParts.length ? deviationSummaryParts.join(", ") : "volgens planning";
  const isPlannerCorrectionOnApproved = isPlannerRole() && existingLog?.status === "approved";
  const auditEntry = createWorkLogAuditEntry(
    isPlannerCorrectionOnApproved ? "planner-correction-approved" : (action === "submit" ? "submit" : "save"),
    isPlannerCorrectionOnApproved ? `correctie na goedkeuring: ${summary}` : summary
  );

  const nextLog = {
      id: workLogId,
      employeeName: entry.name,
      day: entry.day,
      shiftName: entry.isManualHours ? "Extra uren" : getShiftName(entry),
    plannedStart: entry.startTime,
    plannedEnd: entry.endTime,
    actualStart,
    actualEnd,
      breakMinutes,
      notes,
      employeeReply,
      mailLog: sanitizeRequestMailLog(existingLog?.mailLog),
      status: isPlannerCorrectionOnApproved
      ? "approved"
      : (action === "submit" ? "open" : (existingLog?.status === "approved" ? "approved" : "draft")),
    managerNote: action === "submit" ? (existingLog?.managerNote || "") : (existingLog?.managerNote || ""),
    submittedAt: action === "submit" ? getNowIsoString() : (existingLog?.submittedAt || ""),
    updatedAt: auditEntry.at,
    auditTrail: [...(existingLog?.auditTrail || []), auditEntry]
  };
  const existingIndex = workLogs.findIndex((log) => log.id === workLogId);

  if (existingIndex >= 0) {
    workLogs[existingIndex] = nextLog;
  } else {
    workLogs.push(nextLog);
  }

  preferences.lastWorkLogTimes = {
    actualStart,
    actualEnd,
    breakMinutes
  };
  savePreferences();
  saveWorkLogs();
  persistProtectedChange({
    reason: action === "submit" ? `Uren ingediend: ${entry.name} ${entry.day} ${entry.isManualHours ? "Extra uren" : getShiftName(entry)}` : `Urenconcept bijgewerkt: ${entry.name} ${entry.day} ${entry.isManualHours ? "Extra uren" : getShiftName(entry)}`,
    scope: "worklog",
    action: action === "submit" ? "worklog-submitted" : "worklog-saved",
    message: action === "submit"
      ? `Urenregistratie ingediend voor ${entry.name} op ${formatDate(entry.day)}.`
      : isPlannerCorrectionOnApproved
        ? `Goedgekeurde uren gecorrigeerd voor ${entry.name} op ${formatDate(entry.day)}.`
        : `Urenregistratie bijgewerkt voor ${entry.name} op ${formatDate(entry.day)}.`,
    details: {
      workLogId,
      employeeName: entry.name,
      day: entry.day,
      shiftName: entry.isManualHours ? "Extra uren" : getShiftName(entry),
      status: nextLog.status,
      deviation: hasWorkLogDeviation(entry, nextLog)
    }
  });
  renderMyHours();
  if (validation.isLongShift || validation.isLargeEndDeviation) {
    const warningParts = [];

    if (validation.isLargeEndDeviation) {
      warningParts.push("eindtijd wijkt sterk af van planning");
    }

    if (validation.isLongShift) {
      warningParts.push("dienst is erg lang");
    }

    showMessage(`Opgeslagen. Let op: ${warningParts.join(" en ")}.`, "warning");
    return;
  }

  const successMessage = action === "submit"
    ? "Uren ingediend."
    : isPlannerCorrectionOnApproved
      ? "Goedgekeurde uren bijgewerkt."
      : entry.day === getTodayLocalDateValue()
        ? "Uren voor vandaag opgeslagen."
        : "Uren opgeslagen.";

  showMessage(successMessage, "success");
}

function refreshWorkLogValidationForCard(workLogId) {
  const card = myHoursRegistrations?.querySelector(`[data-worklog-card-id="${workLogId}"]`);
  const entry = getWorkLogContextById(workLogId);

  if (!card || !entry) {
    return;
  }

  const validationContainer = card.querySelector("[data-worklog-validation]");
  const actualStartInput = card.querySelector(`[data-worklog-field="actualStart"][data-worklog-id="${workLogId}"]`);
  const actualEndInput = card.querySelector(`[data-worklog-field="actualEnd"][data-worklog-id="${workLogId}"]`);
  const breakMinutesInput = card.querySelector(`[data-worklog-field="breakMinutes"][data-worklog-id="${workLogId}"]`);

  if (!validationContainer || !actualStartInput || !actualEndInput || !breakMinutesInput) {
    return;
  }

  const validation = getWorkLogValidationState(entry, {
    actualStart: actualStartInput.value,
    actualEnd: actualEndInput.value,
    breakMinutes: breakMinutesInput.value
  });

  validationContainer.innerHTML = validation.messages.map((message) => `
    <div class="hours-validation-note is-${message.type}">${message.text}</div>
  `).join("");
  validationContainer.classList.toggle("is-empty", validation.messages.length === 0);
}

function getWorkLogsForWeek(weekValue, employeeName = "") {
  return workLogs
    .filter((log) => getWeekValueFromDate(log.day) === weekValue && (!employeeName || log.employeeName === employeeName))
    .sort((logA, logB) => logA.employeeName.localeCompare(logB.employeeName, "nl") || logA.day.localeCompare(logB.day) || logA.plannedStart.localeCompare(logB.plannedStart));
}

function getHoursWeekReviewState(weekValue, employeeName = "") {
  const todayValue = getTodayLocalDateValue();
  const weekEntries = entries.filter((entry) =>
    getWeekValueFromDate(entry.day) === weekValue &&
    (!employeeName || entry.name === employeeName)
  );
  const plannedDays = [...new Set(weekEntries.map((entry) => entry.day))].sort();
  const futureDays = plannedDays.filter((day) => day > todayValue);
  const missingDays = plannedDays.filter((day) => {
    const dayEntries = weekEntries.filter((entry) => entry.day === day);
    return dayEntries.some((entry) => !getWorkLogForEntry(entry));
  });
  const weekLogs = getWorkLogsForWeek(weekValue, employeeName);
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
      .map((day) => `${formatWeekday(day)} ${formatDate(day)}`)
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

function updateWorkLogStatus(workLogId, nextStatus, managerNote = "") {
  const workLog = workLogs.find((log) => log.id === workLogId);

  if (!workLog) {
    showMessage("De urenregistratie is niet gevonden.", "error");
    return;
  }

  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan uren goedkeuren.", "error");
    return;
  }

  if (workLog.status === "approved") {
    showMessage("Goedgekeurde uren zijn geblokkeerd voor verdere wijziging.", "error");
    return;
  }

  if ((nextStatus === "rejected" || nextStatus === "revision") && !managerNote?.trim()) {
    showMessage("Een opmerking is verplicht bij afkeuren of terugsturen.", "error");
    return;
  }

  const statusLabels = {
    open: "open gezet",
    approved: "goedgekeurd",
    rejected: "afgekeurd",
    revision: "teruggestuurd voor opmerking"
  };
  workLog.status = nextStatus;
  workLog.managerNote = managerNote?.trim() || "";
  workLog.updatedAt = getNowIsoString();
  workLog.auditTrail = [
    ...(workLog.auditTrail || []),
    createWorkLogAuditEntry(`status-${nextStatus}`, statusLabels[nextStatus] || nextStatus)
  ];
  saveWorkLogs();
  if (["approved", "rejected", "revision"].includes(nextStatus)) {
    registerWorkLogMailNotification(workLog, nextStatus, [workLog.employeeName]);
  }
  persistProtectedChange({
    reason: `Urenstatus gewijzigd: ${workLog.employeeName} ${workLog.day} ${workLog.shiftName}`,
    scope: "worklog-approval",
    action: `worklog-${nextStatus}`,
    message: `Urenregistratie van ${workLog.employeeName} is ${getWorkLogStatusLabel(workLog).toLowerCase()}.`,
    details: {
      workLogId,
      employeeName: workLog.employeeName,
      day: workLog.day,
      shiftName: workLog.shiftName,
      status: nextStatus,
      managerNote: workLog.managerNote
    }
  });
  renderMyHours();
  renderHoursApproval();
  showMessage(
    nextStatus === "approved"
      ? "Uren goedgekeurd."
      : nextStatus === "rejected"
        ? "Uren afgekeurd."
        : nextStatus === "revision"
          ? "Uren teruggestuurd met opmerking."
          : "Status bijgewerkt.",
    "success"
  );
}

function approveWorkLogsForWeek(weekValue, employeeName = "") {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan uren goedkeuren.", "error");
    return;
  }

  const weekReviewState = getHoursWeekReviewState(weekValue, employeeName);

  if (weekReviewState.status !== "ready" && weekReviewState.status !== "done") {
    showMessage(weekReviewState.note || "Deze week is nog niet volledig ingevuld en kan nog niet worden goedgekeurd.", "warning");
    return;
  }

  const logsToApprove = getWorkLogsForWeek(weekValue, employeeName).filter((log) => log.status === "open");

  if (!logsToApprove.length) {
    showMessage(weekReviewState.status === "done" ? "Deze week is al afgerond." : "Er zijn geen open urenregistraties om goed te keuren.", "warning");
    return;
  }

  logsToApprove.forEach((log) => {
    log.status = "approved";
    log.managerNote = "";
    log.updatedAt = getNowIsoString();
    log.auditTrail = [
      ...(log.auditTrail || []),
      createWorkLogAuditEntry("status-approved", employeeName ? "week van medewerker goedgekeurd" : "week goedgekeurd")
    ];
  });

  saveWorkLogs();
  logsToApprove.forEach((log) => {
    registerWorkLogMailNotification(log, "approved", [log.employeeName]);
  });
  persistProtectedChange({
    reason: employeeName ? `Weekuren goedgekeurd: ${employeeName} ${weekValue}` : `Weekuren goedgekeurd: ${weekValue}`,
    scope: "worklog-approval",
    action: "worklog-week-approved",
    message: employeeName ? `Alle open uren voor ${employeeName} in ${weekValue} zijn goedgekeurd.` : `Alle open uren in ${weekValue} zijn goedgekeurd.`,
    details: {
      weekValue,
      employeeName,
      approvedCount: logsToApprove.length
    }
  });
  renderMyHours();
  renderHoursApproval();
  showMessage(employeeName ? "Week van medewerker goedgekeurd." : "Weekregistraties goedgekeurd.", "success");
}

function submitWorkLogsForWeek(weekValue, employeeName) {
  if (!employeeName) {
    showMessage("Kies eerst een medewerker.", "error");
    return;
  }

  if (!ensureOwnEmployeeAccess(employeeName, "Je kunt alleen je eigen uren indienen.")) {
    return;
  }

  const todayValue = getTodayLocalDateValue();
  const weekEntries = entries.filter((entry) =>
    entry.name === employeeName &&
    getWeekValueFromDate(entry.day) === weekValue &&
    entry.day <= todayValue
  );
  const weekDays = [...new Set(weekEntries.map((entry) => entry.day))].sort();
  const missingDays = weekDays.filter((day) => {
    const dayEntries = weekEntries.filter((entry) => entry.day === day);
    return dayEntries.some((entry) => !getWorkLogForEntry(entry));
  });

  if (missingDays.length) {
    const previewDays = missingDays
      .slice(0, 3)
      .map((day) => `${formatWeekday(day)} ${formatDate(day)}`)
      .join(", ");
    const extraText = missingDays.length > 3 ? ` en nog ${missingDays.length - 3}` : "";
    showMessage(`Er ontbreken nog uren voor: ${previewDays}${extraText}. Vul deze dagen eerst in.`, "warning");
    return;
  }

  const eligibleLogs = workLogs.filter((log) =>
    log.employeeName === employeeName &&
    getWeekValueFromDate(log.day) === weekValue &&
    log.day <= todayValue &&
    (log.status === "draft" || log.status === "revision" || log.status === "rejected")
  );

  if (!eligibleLogs.length) {
    showMessage("Er zijn geen ingevulde uren om in te dienen voor deze week.", "warning");
    return;
  }

  const submittedAt = getNowIsoString();
  eligibleLogs.forEach((log) => {
    log.status = "open";
    log.submittedAt = submittedAt;
    log.updatedAt = submittedAt;
    log.auditTrail = [
      ...(log.auditTrail || []),
        createWorkLogAuditEntry("submit-week", "week in één keer ingediend")
    ];
  });

  saveWorkLogs();
  persistProtectedChange({
    reason: `Weekuren ingediend: ${employeeName} ${weekValue}`,
    scope: "worklog",
    action: "worklog-week-submitted",
    message: `Weekuren ingediend voor ${employeeName}.`,
    details: {
      employeeName,
      weekValue,
      submittedCount: eligibleLogs.length
    }
  });
  renderMyHours();
  showMessage("Week ingediend. Alles van deze week staat nu in behandeling.", "success");
}

function renderHoursExportControls() {
  if (!hoursExportPeriodSelect || !hoursExportWeekLabel || !hoursExportMonthLabel || !hoursExportButton) {
    return;
  }

  const periodType = hoursExportPeriodSelect.value === "month" ? "month" : "week";

  if (!hoursExportWeekInput?.value) {
    hoursExportWeekInput.value = approvalWeekInput?.value || hoursWeekInput?.value || getCurrentWeekValue();
  }

  if (!hoursExportMonthInput?.value) {
    hoursExportMonthInput.value = getMonthValueFromDate(getTodayLocalDateValue()) || getCurrentMonthValue();
  }

  hoursExportWeekLabel.classList.toggle("hidden", periodType !== "week");
  hoursExportMonthLabel.classList.toggle("hidden", periodType !== "month");
  hoursExportButton.classList.toggle("hidden", !isPlannerRole());
}

function renderHoursApproval() {
  if (!hoursApprovalQueue) {
    return;
  }

  if (!isPlannerRole()) {
    setClassName(hoursApprovalQueue, "hidden");
    hoursApprovalQueue.innerHTML = "";
    renderHoursExportControls();
    return;
  }

  renderHoursExportControls();

  const selectedWeek = approvalWeekInput?.value || hoursWeekInput.value || getCurrentWeekValue();
  const selectedEmployee = approvalEmployeeSelect?.value || "";
  const weekReviewState = getHoursWeekReviewState(selectedWeek, selectedEmployee);
  const weekLogs = getWorkLogsForWeek(selectedWeek, selectedEmployee).filter((log) =>
    log.status === "open" || log.status === "revision" || log.status === "rejected"
  );
  const openLogs = weekLogs.filter((log) => log.status === "open");
  const reviewLogs = weekLogs.filter((log) => log.status === "revision" || log.status === "rejected");
  const approvalGroups = weekLogs.reduce((groups, log) => {
    const employeeLogs = groups.get(log.employeeName) || [];
    employeeLogs.push(log);
    groups.set(log.employeeName, employeeLogs);
    return groups;
  }, new Map());

  if (!weekLogs.length) {
    setClassName(hoursApprovalQueue, "request-list empty");
    hoursApprovalQueue.textContent = weekReviewState.status === "done"
      ? "Deze week is afgerond. Er staan geen uren meer open voor controle."
      : "Nog geen ingediende uren in deze week.";
    return;
  }

  setClassName(hoursApprovalQueue, "hours-approval-list");
  hoursApprovalQueue.innerHTML = `
    <article class="hours-approval-card">
      <div class="hours-registration-head">
        <div>
          <strong>Open urenregistraties</strong>
              <span>${selectedEmployee || "Alle medewerkers"} · ${selectedWeek.replace("-W", " week ")}</span>
        </div>
      </div>
      <div class="hours-registration-meta">
        <span>Open: ${openLogs.length}</span>
        <span>Opmerking nodig / afgekeurd: ${reviewLogs.length}</span>
        <span>Totaal ingediend: ${weekLogs.length}</span>
      </div>
      <div class="form-actions compact-actions">
        <button type="button" data-worklog-bulk="employee-week" data-worklog-week="${selectedWeek}" data-worklog-employee="${selectedEmployee}">Keur selectie goed</button>
        <button type="button" class="secondary" data-worklog-bulk="full-week" data-worklog-week="${selectedWeek}">Keur hele week goed</button>
      </div>
      <div class="hours-approval-groups">
        ${[...approvalGroups.entries()]
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

            return `
              <article class="hours-approval-employee-group">
                <div class="hours-approval-employee-head">
                  <div>
                    <strong>${employeeName}</strong>
                    <span>${sortedEmployeeLogs.length} ${sortedEmployeeLogs.length === 1 ? "dag" : "dagen"} in deze week</span>
                  </div>
                  <div class="hours-approval-employee-meta">
                    <span>Open ${sortedEmployeeLogs.filter((log) => log.status === "open").length}</span>
                    <span>Afwijking ${employeeDeviationCount}</span>
                  </div>
                </div>
                <div class="hours-approval-day-list">
                  ${sortedEmployeeLogs.map((log) => {
                    const deviation = log.actualStart !== log.plannedStart || log.actualEnd !== log.plannedEnd || Number(log.breakMinutes) > 0 || Boolean(log.notes?.trim());
                    const statusClass = log.status === "approved"
                      ? "approved"
                      : log.status === "rejected" || log.status === "revision"
                        ? "rejected"
                        : "open";

                    return `
                      <article class="hours-approval-day-card request-card is-${statusClass} ${deviation ? "has-deviation" : ""}">
                        <div class="request-top">
                  <strong>${formatWeekday(log.day)} ${formatDate(log.day)} · ${log.shiftName}</strong>
                          <span class="status-pill status-${statusClass}">${getWorkLogStatusLabel(log)}</span>
                        </div>
                  <div class="request-meta">Gepland ${log.plannedStart} - ${log.plannedEnd} · Werkelijk ${log.actualStart} - ${log.actualEnd} · Pauze ${log.breakMinutes} min</div>
                        ${log.shiftName === "Extra uren" ? `<div class="hours-registration-flag is-extra">Extra uren</div>` : ""}
                        ${deviation ? `<div class="hours-registration-flag">Afwijking van planning</div>` : `<div class="hours-registration-audit">Volgens planning</div>`}
                        ${log.notes ? `<div class="hours-registration-audit">Opmerking medewerker: ${log.notes}</div>` : ""}
                        ${log.employeeReply ? `<div class="hours-registration-audit">Reactie medewerker: ${log.employeeReply}</div>` : ""}
                        <label class="hours-registration-notes">
                          Opmerking directie
                          <input type="text" maxlength="200" data-worklog-review-note="${log.id}" value="${log.managerNote || ""}" placeholder="Korte toelichting voor medewerker" ${log.status === "approved" ? "disabled" : ""}>
                        </label>
                        <div class="actions compact-actions">
                          <button type="button" data-worklog-review="approved" data-worklog-id="${log.id}" ${log.status === "approved" ? "disabled" : ""}>Goedkeuren</button>
                          <button type="button" class="secondary" data-worklog-review="revision" data-worklog-id="${log.id}" ${log.status === "approved" ? "disabled" : ""}>Opmerking nodig</button>
                          <button type="button" class="warning" data-worklog-review="rejected" data-worklog-id="${log.id}" ${log.status === "approved" ? "disabled" : ""}>Afkeuren</button>
                        </div>
                      </article>
                    `;
                  }).join("")}
                </div>
              </article>
            `;
          }).join("")}
      </div>
    </article>
  `;

  const approvalCard = hoursApprovalQueue.querySelector(".hours-approval-card");
  const approvalHead = approvalCard?.querySelector(".hours-registration-head");
  const approvalActions = approvalCard?.querySelector(".form-actions");

  if (approvalHead) {
    approvalHead.insertAdjacentHTML("beforeend", `
      <span class="status-pill status-${weekReviewState.status === "done" ? "approved" : weekReviewState.status === "ready" ? "open" : "rejected"}">${weekReviewState.label}</span>
    `);
  }

  if (approvalActions) {
    approvalActions.insertAdjacentHTML("beforebegin", `<div class="panel-note">${weekReviewState.note}</div>`);
    approvalActions.querySelectorAll("[data-worklog-bulk]").forEach((button) => {
      button.disabled = weekReviewState.status !== "ready";
    });
  }
}

function renderActiveTabContent() {
  if (activeTab === "dashboard") {
    renderHomeSummary();
    renderHomeWeekOverview();
    return;
  }

  if (activeTab === "requests") {
    renderRequestsOpenSummary();
    renderSwapEntryOptions();
    renderTimeOffRequests();
    renderSwapRequests();
    return;
  }

  if (activeTab === "employees") {
    renderEmployeeList();
    renderEmployeeStatusControls();
    renderEmployeePermissions();
    renderEmployeeStandardShifts();
    renderEmployeeContractPanel();
    return;
  }

  if (activeTab === "services") {
    renderShiftSelectors();
    renderShiftList();
    renderShiftPreferenceEditor();
    return;
  }

  if (activeTab === "planning") {
    renderPlanningSettings();
    return;
  }

  if (activeTab === "schedule-planning") {
    renderSchedulePlanningOverview();
    return;
  }

  if (activeTab === "backup") {
    renderBackupRestore();
    renderMailSettings();
    return;
  }

  if (activeTab === "my-schedule") {
    renderMySchedule();
    return;
  }

  if (activeTab === "my-hours") {
    renderMyHours();
    return;
  }

  if (activeTab === "hours-approval") {
    renderHoursApproval();
    return;
  }

  if (activeTab === "week-current" || activeTab === "week-next") {
    renderEmployeeFilterOptions();
    updateWeekViewTitle();
    renderSchedule();
    renderTotals();
    renderDayPlanner();
    updateShiftFormState();
  }
}

function render() {
  try {
    ensureEmployeeIdentityForCurrentRole();
    applyRoleUI();
    updateTabVisibility();
    renderHoursExportControls();
    renderDashboard();
    renderEmployeeSelectors();
    renderActiveTabContent();
    maybeShowOpenRequestReminder();
    renderActiveMessage();
  } catch (error) {
    reportAppError("Er ging iets mis bij het verversen van het scherm.", error, "render");
  }
}

function fillForm(entry) {
  const entryWeek = getWeekValueFromDate(entry.day);
  weekInput.value = entryWeek;
  weekFilterInput.value = entryWeek;
  nameSelect.value = entry.name;
  document.getElementById("day").value = entry.day;
  document.getElementById("startTime").value = entry.startTime;
  document.getElementById("endTime").value = entry.endTime;
  const matchingShift = getShiftForEntry(entry);
  presetShiftSelect.value = matchingShift ? matchingShift.id : "";
  clearSelectedWeekdays();
}

function validateForm(name, day, startTime, endTime, selectedShift) {
  if (!name || !day || !startTime || !endTime || !weekInput.value) {
    showMessage("Vul alle velden in voordat je opslaat.", "error");
    return null;
  }

  if (getWeekValueFromDate(day) !== weekInput.value) {
    showMessage("De gekozen dag hoort niet bij de geselecteerde week.", "error");
    return null;
  }

  const hours = calculateHours(startTime, endTime);

  if (hours === null) {
    showMessage("De eindtijd moet later zijn dan de begintijd.", "error");
    return null;
  }

  const conflictingEntry = findConflict(name, day, startTime, endTime);

  if (conflictingEntry) {
    const isExactMatch = conflictingEntry.startTime === startTime && conflictingEntry.endTime === endTime;

    if (isExactMatch) {
      showMessage(`Deze dienst bestaat al voor ${name} op ${formatDate(day)} (${startTime} - ${endTime}). Pas de invoer aan voordat je opslaat.`, "error");
      return null;
    }

    showMessage(`Deze dienst overlapt met een bestaande dienst van ${name} op ${formatDate(day)} (${conflictingEntry.startTime} - ${conflictingEntry.endTime}). Pas de tijden aan voordat je opslaat.`, "error");
    return null;
  }

  const shiftValidationError = getShiftValidationError(day, selectedShift);

  if (shiftValidationError) {
    showMessage(shiftValidationError, "error");
    return null;
  }

  return {
    hours,
    selectedShift
  };
}

function validateDayPlannerAssignments(dateValue, plannerShifts, selectedAssignments) {
  const replacingShiftNames = new Set(plannerShifts.map((shift) => shift.name.toLowerCase()));

  for (const assignment of selectedAssignments) {
    const assignmentShift = plannerShifts.find((shift) => shift.name === assignment.shiftName) || null;
    const authorizationError = getAuthorizationError(assignment.name, assignmentShift);

    if (authorizationError) {
      showMessage(authorizationError, "error");
      return false;
    }

    const approvedAbsence = getApprovedTimeOff(assignment.name, dateValue);

    if (approvedAbsence) {
      showMessage(`${assignment.name} heeft al ${getApprovedAbsenceDetail(approvedAbsence)} op ${formatDate(dateValue)}.`, "error");
      return false;
    }

    const overlappingExistingEntry = entries.find((entry) =>
      entry.day === dateValue &&
      entry.name === assignment.name &&
      !replacingShiftNames.has(getShiftName(entry).toLowerCase()) &&
      timeToMinutes(assignment.startTime) < timeToMinutes(entry.endTime) &&
      timeToMinutes(assignment.endTime) > timeToMinutes(entry.startTime)
    );

    if (overlappingExistingEntry) {
      showMessage(`${assignment.name} heeft al een overlappende dienst op ${formatDate(dateValue)} (${overlappingExistingEntry.startTime} - ${overlappingExistingEntry.endTime}).`, "error");
      return false;
    }
  }

  for (let index = 0; index < selectedAssignments.length; index += 1) {
    for (let compareIndex = index + 1; compareIndex < selectedAssignments.length; compareIndex += 1) {
      const currentAssignment = selectedAssignments[index];
      const compareAssignment = selectedAssignments[compareIndex];

      if (currentAssignment.name !== compareAssignment.name) {
        continue;
      }

      const overlaps = timeToMinutes(currentAssignment.startTime) < timeToMinutes(compareAssignment.endTime) &&
        timeToMinutes(currentAssignment.endTime) > timeToMinutes(compareAssignment.startTime);

      if (overlaps) {
        showMessage(`${currentAssignment.name} kan niet tegelijk ${currentAssignment.shiftName} en ${compareAssignment.shiftName} werken op ${formatDate(dateValue)}.`, "error");
        return false;
      }
    }
  }

  return true;
}

function persistDayPlannerAssignments(selectedDate, successMessage) {
  if (!ensureWeekActionAllowed(getWeekValueFromDate(selectedDate), {
    actionLabel: "de dagplanning op te slaan",
    blockPlannerWhenLocked: true
  })) {
    renderDayPlanner();
    return false;
  }

  const plannerShifts = getDayPlannerShifts(selectedDate);
  const selectedAssignments = getDayPlannerAssignments(selectedDate, plannerShifts);
  const previousEntriesByShift = new Map(
    entries
      .filter((entry) => entry.day === selectedDate && plannerShifts.some((shift) => getShiftName(entry).toLowerCase() === shift.name.toLowerCase()))
      .map((entry) => [getShiftName(entry).toLowerCase(), { ...entry }])
  );

  if (!validateDayPlannerAssignments(selectedDate, plannerShifts, selectedAssignments)) {
    return false;
  }

  setUndoState(`Dagplanning ${formatDate(selectedDate)}`);
  for (let index = entries.length - 1; index >= 0; index -= 1) {
    if (entries[index].day === selectedDate && plannerShifts.some((shift) => getShiftName(entries[index]).toLowerCase() === shift.name.toLowerCase())) {
      entries.splice(index, 1);
    }
  }

  entries.push(...selectedAssignments);
  saveEntries();
  const movedWorkLogs = selectedAssignments.some((assignment) => {
    const previousEntry = previousEntriesByShift.get((assignment.shiftName || "").toLowerCase());
    return previousEntry ? moveWorkLogToEntry(previousEntry, assignment) : false;
  });
  if (movedWorkLogs) {
    saveWorkLogs();
  }
  persistProtectedChange({
    reason: `Dagplanning opgeslagen: ${selectedDate}`,
    scope: "roster",
    action: "roster-day-saved",
    message: `Dagplanning voor ${formatDate(selectedDate)} opgeslagen.`,
    details: {
      day: selectedDate,
      assignmentCount: selectedAssignments.length
    }
  });

  const firstAssignedEmployee = selectedAssignments[0]?.name || "";
  if (firstAssignedEmployee) {
    preferences.lastEmployee = firstAssignedEmployee;
  }
  savePreferences();

  render();
  if (successMessage) {
    showMessage(successMessage, "success");
  }
  return true;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan het rooster aanpassen.", "error");
    return;
  }

  const name = nameSelect.value.trim();
  const day = document.getElementById("day").value;
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;
  const selectedWeekdays = getSelectedWeekdays();
  const selectedShift = getSelectedShift(presetShiftSelect.value, startTime, endTime, day);

  if (selectedWeekdays.length > 0 && editIndex !== null) {
    showMessage("Meerdere dagen tegelijk gebruiken kan alleen bij een nieuwe invoer.", "error");
    return;
  }

  if (selectedWeekdays.length > 1 && selectedShift?.isShopShift) {
    showMessage("Winkeldiensten voeg je per dag toe, omdat de tijden per dag verschillen.", "error");
    return;
  }

  const datesToCreate = selectedWeekdays.length > 0
    ? getDatesForSelectedWeekdays(weekInput.value, selectedWeekdays)
    : [day];

  if (datesToCreate.length === 0) {
    showMessage("Kies een dag of selecteer meerdere dagen.", "error");
    return;
  }

  if (selectedWeekdays.length > 1 && (selectedShift?.isShopShift || selectedShift?.isAllroundShift)) {
    showMessage("Daggebonden diensten voeg je per dag toe, zodat de juiste tijden per dag blijven kloppen.", "error");
    return;
  }

  if (!ensureDatesActionAllowed(datesToCreate, {
    actionLabel: "het rooster aan te passen",
    blockPlannerWhenLocked: true
  })) {
    return;
  }

  const validationResult = validateForm(name, datesToCreate[0], startTime, endTime, selectedShift);

  if (validationResult === null) {
    return;
  }

  const { hours } = validationResult;
  const isEditing = editIndex !== null;

  if (isEditing) {
    const authorizationError = getAuthorizationError(name, selectedShift);

    if (authorizationError) {
      showMessage(authorizationError, "error");
      return;
    }

    setUndoState("Dienst aanpassen");
    const entry = {
      name,
      day: datesToCreate[0],
      startTime,
      endTime,
      hours,
      shiftId: selectedShift?.id || "",
      shiftName: selectedShift?.name || "",
      replacementFor: isBakeryCoreShift(selectedShift) && getPrimaryStandardEmployeeForShift(selectedShift.name) && getPrimaryStandardEmployeeForShift(selectedShift.name) !== name
        ? getPrimaryStandardEmployeeForShift(selectedShift.name)
        : ""
    };
    const previousEntry = { ...entries[editIndex] };
    entries[editIndex] = entry;
    if (moveWorkLogToEntry(previousEntry, entry)) {
      saveWorkLogs();
    }
  } else {
    for (const entryDay of datesToCreate) {
      const conflict = findConflict(name, entryDay, startTime, endTime, null);

      if (conflict) {
        const isExactMatch = conflict.startTime === startTime && conflict.endTime === endTime;
        const message = isExactMatch
          ? `Deze dienst bestaat al voor ${name} op ${formatDate(entryDay)} (${startTime} - ${endTime}). Pas de invoer aan voordat je opslaat.`
          : `Deze dienst overlapt met een bestaande dienst van ${name} op ${formatDate(entryDay)} (${conflict.startTime} - ${conflict.endTime}). Pas de tijden aan voordat je opslaat.`;
        showMessage(message, "error");
        return;
      }

      const selectedShiftForDay = selectedShift?.isShopShift
        ? getShopSlotsForDate(entryDay).find((shift) => shift.name === selectedShift.name) || null
        : selectedShift?.isAllroundShift
          ? getAllroundSlotsForDate(entryDay).find((shift) => shift.name === selectedShift.name) || null
          : selectedShift;
      const authorizationError = getAuthorizationError(name, selectedShiftForDay);

      if (authorizationError) {
        showMessage(authorizationError, "error");
        return;
      }

      const shiftValidationError = getShiftValidationError(entryDay, selectedShiftForDay, null);

      if (shiftValidationError) {
        showMessage(shiftValidationError, "error");
        return;
      }
    }

    setUndoState("Dienst toevoegen");
    datesToCreate.forEach((entryDay) => {
      const selectedShiftForDay = selectedShift?.isShopShift
        ? getShopSlotsForDate(entryDay).find((shift) => shift.name === selectedShift.name) || null
        : selectedShift?.isAllroundShift
          ? getAllroundSlotsForDate(entryDay).find((shift) => shift.name === selectedShift.name) || null
          : selectedShift;
      const entryHours = calculateHours(
        selectedShiftForDay?.startTime || startTime,
        selectedShiftForDay?.endTime || endTime
      );
      entries.push({
        name,
        day: entryDay,
        startTime: selectedShiftForDay?.startTime || startTime,
        endTime: selectedShiftForDay?.endTime || endTime,
        hours: entryHours ?? hours,
        shiftId: selectedShiftForDay?.id || "",
        shiftName: selectedShiftForDay?.name || "",
        replacementFor: isBakeryCoreShift(selectedShiftForDay) && getPrimaryStandardEmployeeForShift(selectedShiftForDay.name) && getPrimaryStandardEmployeeForShift(selectedShiftForDay.name) !== name
          ? getPrimaryStandardEmployeeForShift(selectedShiftForDay.name)
          : ""
      });
    });
  }

  preferences.lastEmployee = name;
  preferences.lastShift = presetShiftSelect.value || "";
  savePreferences();
  saveEntries();
  persistProtectedChange({
    reason: isEditing ? `Roosterdienst aangepast: ${name} ${datesToCreate[0]}` : `Roosterdienst opgeslagen: ${name} ${datesToCreate.length} dag(en)`,
    scope: "roster",
    action: isEditing ? "roster-entry-updated" : "roster-entry-created",
    message: isEditing
      ? `Roosterdienst aangepast voor ${name} op ${formatDate(datesToCreate[0])}.`
      : `${datesToCreate.length} roosterdienst(en) opgeslagen voor ${name}.`,
    details: {
      employeeName: name,
      dates: datesToCreate,
      shiftName: selectedShift?.name || "",
      isEditing
    }
  });
  render();
  resetForm({
    nextDate: !isEditing && isMobileView() ? getNextEntryDateValue(datesToCreate[datesToCreate.length - 1], weekInput.value) : ""
  });
  showMessage(
    isEditing
      ? "Opgeslagen."
      : datesToCreate.length > 1
        ? "Opgeslagen."
        : "Opgeslagen.",
    "success"
  );
});

saveDayPlannerButton.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan een dagplanning opslaan.", "error");
    return;
  }

  const selectedDate = dayPlannerDateInput.value;

  if (!selectedDate) {
    showMessage("Kies eerst een dag om in te plannen.", "error");
    return;
  }

  if (getWeekValueFromDate(selectedDate) !== weekInput.value) {
    showMessage("De gekozen dag hoort niet bij de geselecteerde week.", "error");
    return;
  }

  persistDayPlannerAssignments(selectedDate, "Opgeslagen.");
});

autoFillShopDayButton?.addEventListener("click", () => {
  autoFillShopDayPlanner();
});

smartFillDayButton?.addEventListener("click", () => {
  autoFillSmartDayPlanner();
});

scheduleBoard.addEventListener("click", (event) => {
  const hoursButton = event.target.closest("[data-go-hours-date]");

  if (hoursButton?.dataset.goHoursDate) {
    openHoursForDate(hoursButton.dataset.goHoursDate);
    return;
  }

  const button = event.target.closest("button[data-action][data-day]");

  if (!button || !isPlannerRole()) {
    return;
  }

  const selectedDate = button.dataset.day || "";

  if (button.dataset.action === "smart-fill-day") {
    fillOpenShiftsForDay(selectedDate);
    return;
  }

  if (button.dataset.action === "clear-day") {
    clearPlannerDay(selectedDate);
  }
});

dayPlannerList?.addEventListener("change", (event) => {
  if (!isPlannerRole()) {
    return;
  }

  const select = event.target.closest("select[data-day-planner-shift]");

  if (!select) {
    return;
  }

  const selectedDate = dayPlannerDateInput.value;

  if (!selectedDate) {
    return;
  }

  persistDayPlannerAssignments(selectedDate, `Dienst bijgewerkt voor ${formatDate(selectedDate)}.`);
});

dayPlannerOpenList?.addEventListener("change", (event) => {
  if (!isPlannerRole()) {
    return;
  }

  const select = event.target.closest("select[data-open-day][data-open-shift]");

  if (!select) {
    return;
  }

  const selectedDate = select.dataset.openDay || "";
  const shiftId = select.dataset.openShift || "";
  const employeeName = select.value || "";
  const shift = getDayPlannerShifts(selectedDate).find((item) => item.id === shiftId);

  if (!selectedDate || !shift || !employeeName) {
    return;
  }

  if (!ensureWeekActionAllowed(getWeekValueFromDate(selectedDate), {
    actionLabel: "een open dienst in te vullen",
    blockPlannerWhenLocked: true
  })) {
    render();
    return;
  }

  const suitableEmployees = getSuitableEmployeesForShift(
    shift,
    selectedDate,
    shift.startTime,
    shift.endTime,
    null
  );

  if (!suitableEmployees.includes(employeeName)) {
    showMessage("Deze medewerker is niet bevoegd of niet beschikbaar voor deze dienst.", "error");
    render();
    return;
  }

  if (saveSingleDayPlannerShift(selectedDate, shift, employeeName)) {
    showMessage(`${shift.name} is direct ingepland voor ${employeeName}.`, "success");
  }
});

dayPlannerAbsenceList?.addEventListener("change", (event) => {
  if (!isPlannerRole()) {
    return;
  }

  const select = event.target.closest("select[data-absence-day][data-absence-shift][data-absence-normal]");

  if (!select) {
    return;
  }

  const selectedDate = select.dataset.absenceDay || "";
  const shiftId = select.dataset.absenceShift || "";
  const normalEmployee = select.dataset.absenceNormal || "";
  const employeeName = select.value || "";
  const shift = getDayPlannerShifts(selectedDate).find((item) => item.id === shiftId);

  if (!selectedDate || !shift || !employeeName) {
    return;
  }

  if (!ensureWeekActionAllowed(getWeekValueFromDate(selectedDate), {
    actionLabel: "een vervanging in te vullen",
    blockPlannerWhenLocked: true
  })) {
    render();
    return;
  }

  const suitableEmployees = getSuitableEmployeesForShift(
    shift,
    selectedDate,
    shift.startTime,
    shift.endTime,
    null
  );

  if (!suitableEmployees.includes(employeeName)) {
    showMessage("Deze medewerker is niet bevoegd of niet beschikbaar voor deze vervanging.", "error");
    render();
    return;
  }

  if (saveSingleDayPlannerShift(selectedDate, shift, employeeName)) {
    const matchingEntry = entries.find((entry) =>
      entry.day === selectedDate &&
      getShiftName(entry).toLowerCase() === shift.name.toLowerCase() &&
      entry.name === employeeName
    );

    if (matchingEntry) {
      matchingEntry.replacementFor = normalEmployee && normalEmployee !== employeeName ? normalEmployee : "";
      saveEntries();
      persistProtectedChange({
        reason: `Vervanging opgeslagen: ${selectedDate} ${shift.name}`,
        scope: "roster",
        action: "roster-replacement-saved",
        message: `Vervanging opgeslagen voor ${shift.name} op ${formatDate(selectedDate)}.`,
        details: {
          day: selectedDate,
          shiftName: shift.name,
          normalEmployee,
          replacementEmployee: employeeName
        }
      });
      render();
    }

    showSavedMessage();
  }
});

openReplacementOverview?.addEventListener("change", (event) => {
  if (!isPlannerRole()) {
    return;
  }

  const select = event.target.closest("select[data-replacement-day][data-replacement-shift]");

  if (!select) {
    return;
  }

  const day = select.dataset.replacementDay || "";
  const shiftId = select.dataset.replacementShift || "";
  const normalEmployee = select.dataset.replacementNormal || "";
  const replacementEmployee = select.value || "";
  const shift = getDayPlannerShifts(day).find((item) => item.id === shiftId);

  if (!day || !shiftId || !shift) {
    showMessage("De open vervanging is niet gevonden.", "error");
    return;
  }

  if (!replacementEmployee) {
    return;
  }

  if (!ensureWeekActionAllowed(getWeekValueFromDate(day), {
    actionLabel: "een vervanging in te vullen",
    blockPlannerWhenLocked: true
  })) {
    render();
    return;
  }

  const suitableEmployees = getSuitableEmployeesForShift(shift, day, shift.startTime, shift.endTime, null);

  if (!suitableEmployees.includes(replacementEmployee)) {
    showMessage("Deze medewerker is niet bevoegd of niet beschikbaar voor deze vervanging.", "error");
    return;
  }

  if (getEntryForShiftOnDate(day, shift, entries)) {
    showMessage("Deze dienst is inmiddels al ingevuld.", "error");
    render();
    return;
  }

  setUndoState("Vervanging invullen");
  entries.push({
    name: replacementEmployee,
    day,
    startTime: shift.startTime,
    endTime: shift.endTime,
    hours: calculateHours(shift.startTime, shift.endTime) || 0,
    shiftId: shift.id.startsWith("shop-") ? "" : shift.id,
    shiftName: shift.name,
    replacementFor: normalEmployee && normalEmployee !== replacementEmployee ? normalEmployee : ""
  });
  saveEntries();
  persistProtectedChange({
    reason: `Open vervanging ingevuld: ${day} ${shift.name}`,
    scope: "roster",
    action: "roster-replacement-created",
    message: `Open vervanging ingevuld voor ${shift.name} op ${formatDate(day)}.`,
    details: {
      day,
      shiftName: shift.name,
      normalEmployee,
      replacementEmployee
    }
  });
  preferences.lastEmployee = replacementEmployee;
  savePreferences();
  render();
  showSavedMessage();
});

weekReplacementOverview?.addEventListener("change", (event) => {
  if (!isPlannerRole()) {
    return;
  }

  const select = event.target.closest("select[data-week-replacement-day][data-week-replacement-shift]");

  if (!select) {
    return;
  }

  const day = select.dataset.weekReplacementDay || "";
  const shiftId = select.dataset.weekReplacementShift || "";
  const normalEmployee = select.dataset.weekReplacementNormal || "";
  const replacementEmployee = select.value || "";
  const shift = getDayPlannerShifts(day).find((item) => item.id === shiftId);

  if (!day || !shiftId || !shift || !replacementEmployee) {
    return;
  }

  if (!ensureWeekActionAllowed(getWeekValueFromDate(day), {
    actionLabel: "een vervanging te wijzigen",
    blockPlannerWhenLocked: true
  })) {
    render();
    return;
  }

  const existingEntryIndex = entries.findIndex((entry) =>
    entry.day === day &&
    getShiftName(entry).toLowerCase() === shift.name.toLowerCase() &&
    entry.replacementFor
  );
  const suitableEmployees = getSuitableEmployeesForShift(
    shift,
    day,
    shift.startTime,
    shift.endTime,
    existingEntryIndex === -1 ? null : existingEntryIndex
  );

  if (!suitableEmployees.includes(replacementEmployee)) {
    showMessage("Deze medewerker is niet bevoegd of niet beschikbaar voor deze vervanging.", "error");
    render();
    return;
  }

  setUndoState("Vervanging wijzigen");
  if (existingEntryIndex !== -1) {
    const previousEntry = { ...entries[existingEntryIndex] };
    entries[existingEntryIndex].name = replacementEmployee;
    entries[existingEntryIndex].replacementFor = normalEmployee && normalEmployee !== replacementEmployee ? normalEmployee : "";
    if (moveWorkLogToEntry(previousEntry, entries[existingEntryIndex])) {
      saveWorkLogs();
    }
  } else {
    entries.push({
      name: replacementEmployee,
      day,
      startTime: shift.startTime,
      endTime: shift.endTime,
      hours: calculateHours(shift.startTime, shift.endTime) || 0,
      shiftId: shift.id.startsWith("shop-") ? "" : shift.id,
      shiftName: shift.name,
      replacementFor: normalEmployee && normalEmployee !== replacementEmployee ? normalEmployee : ""
    });
  }

  saveEntries();
  persistProtectedChange({
    reason: `Vervanging gewijzigd: ${day} ${shift.name}`,
    scope: "roster",
    action: "roster-replacement-updated",
    message: `Vervanging bijgewerkt voor ${shift.name} op ${formatDate(day)}.`,
    details: {
      day,
      shiftName: shift.name,
      normalEmployee,
      replacementEmployee
    }
  });
  preferences.lastEmployee = replacementEmployee;
  savePreferences();
  render();
  showSavedMessage();
});

weekReplacementOverview?.addEventListener("click", (event) => {
  if (!isPlannerRole()) {
    return;
  }

  const button = event.target.closest('button[data-week-replacement-action="delete"]');

  if (!button) {
    return;
  }

  const day = button.dataset.weekReplacementDay || "";
  const shiftId = button.dataset.weekReplacementShift || "";
  const shift = getDayPlannerShifts(day).find((item) => item.id === shiftId);

  if (!day || !shiftId || !shift) {
    showMessage("De vervanging is niet gevonden.", "error");
    return;
  }

  const existingEntryIndex = entries.findIndex((entry) =>
    entry.day === day &&
    getShiftName(entry).toLowerCase() === shift.name.toLowerCase() &&
    entry.replacementFor
  );

  if (existingEntryIndex === -1) {
    showMessage("Er is geen vervanging meer om te verwijderen.", "error");
    render();
    return;
  }

  if (!confirmAction(`Weet je het zeker? Deze vervanging voor ${shift.name} op ${formatDate(day)} wordt verwijderd.`)) {
    return;
  }

  if (!ensureWeekActionAllowed(getWeekValueFromDate(day), {
    actionLabel: "een vervanging te verwijderen",
    blockPlannerWhenLocked: true
  })) {
    render();
    return;
  }

  setUndoState("Vervanging verwijderen");
  entries.splice(existingEntryIndex, 1);
  saveEntries();
  persistProtectedChange({
    reason: `Vervanging verwijderd: ${day} ${shift.name}`,
    scope: "roster",
    action: "roster-replacement-deleted",
    message: `Vervanging verwijderd voor ${shift.name} op ${formatDate(day)}.`,
    details: {
      day,
      shiftName: shift.name
    }
  });
  render();
  showDeletedMessage("Vervanging verwijderd.");
});

plannerControlPanel?.addEventListener("click", (event) => {
  if (!isPlannerRole()) {
    return;
  }

  const button = event.target.closest("[data-target-kind]");

  if (!button) {
    return;
  }

  if (button.dataset.targetKind === "employee") {
    if (!scrollToPlannerEmployee(button.dataset.targetEmployee || "")) {
      showMessage("Deze medewerker is nu niet direct in beeld.", "warning");
    }
    return;
  }

  if (!scrollToPlannerShift(button.dataset.targetDay || "", button.dataset.targetShift || "")) {
    showMessage("Deze dienst is nu niet direct in beeld.", "warning");
  }
});

scheduleBoard.addEventListener("click", (event) => {
  if (!isPlannerRole()) {
    return;
  }

  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const index = Number(button.dataset.index);

  if (button.dataset.action === "focus-inline-switch" || button.dataset.action === "focus-inline-replacement") {
    const select = document.getElementById(`quick-switch-${index}`);
    openPlannerSelect(select);
    return;
  }

  if (button.dataset.action === "clear-inline-entry") {
    const shiftLabel = removedEntry ? `${getShiftName(removedEntry)} op ${formatDate(removedEntry.day)}` : "deze dienst";
    if (!confirmAction(`Weet je het zeker? ${shiftLabel} wordt leeggemaakt.`)) {
      return;
    }

    const removedEntry = entries[index] ? { ...entries[index] } : null;
    if (!ensureWeekActionAllowed(getWeekValueFromDate(removedEntry?.day || ""), {
      actionLabel: "een dienst leeg te maken",
      blockPlannerWhenLocked: true
    })) {
      render();
      return;
    }

    const relatedSelect = document.getElementById(`quick-switch-${index}`);
    if (relatedSelect) {
      queueNextEmptyPlannerFocus(relatedSelect);
    }

    setUndoState("Dienst leegmaken");
    entries.splice(index, 1);
    saveEntries();
    persistProtectedChange({
      reason: `Roosterdienst leeggemaakt: ${removedEntry?.name || ""} ${removedEntry?.day || ""}`,
      scope: "roster",
      action: "roster-entry-cleared",
      message: "Dienst leeggemaakt.",
      details: {
        entryIndex: index,
        removedEntry
      }
    });

    if (editIndex === index) {
      resetForm();
    } else if (editIndex !== null && index < editIndex) {
      editIndex -= 1;
      updateFormState();
    }

    render();
    showSavedMessage();
    return;
  }

  if (button.dataset.action === "delete") {
    const shiftLabel = removedEntry ? `${getShiftName(removedEntry)} op ${formatDate(removedEntry.day)}` : "deze dienst";
    if (!confirmAction(`Weet je het zeker? ${shiftLabel} wordt verwijderd.`)) {
      return;
    }

    const removedEntry = entries[index] ? { ...entries[index] } : null;
    if (!ensureWeekActionAllowed(getWeekValueFromDate(removedEntry?.day || ""), {
      actionLabel: "een dienst te verwijderen",
      blockPlannerWhenLocked: true
    })) {
      render();
      return;
    }

    setUndoState("Dienst verwijderen");
    entries.splice(index, 1);
    saveEntries();
    persistProtectedChange({
      reason: `Roosterdienst verwijderd: ${removedEntry?.name || ""} ${removedEntry?.day || ""}`,
      scope: "roster",
      action: "roster-entry-deleted",
      message: "Roosterdienst verwijderd.",
      details: {
        entryIndex: index,
        removedEntry
      }
    });

    if (editIndex === index) {
      resetForm();
    } else if (editIndex !== null && index < editIndex) {
      editIndex -= 1;
      updateFormState();
    }

    render();
    showSavedMessage();
  }

  if (button.dataset.action === "edit") {
    editIndex = index;
    fillForm(entries[index]);
    updateFormState();
    hideMessage();
  }
});

scheduleBoard.addEventListener("change", (event) => {
  if (!isPlannerRole()) {
    return;
  }

  const quickSwitchSelect = event.target.closest('select[data-action="quick-switch"][data-index]');

  if (quickSwitchSelect) {
    const index = Number(quickSwitchSelect.dataset.index);
    const employeeName = quickSwitchSelect.value || "";
    const entry = entries[index];

    if (!entry || !employeeName) {
      return;
    }

    if (!ensureWeekActionAllowed(getWeekValueFromDate(entry.day), {
      actionLabel: "een dienst te wijzigen",
      blockPlannerWhenLocked: true
    })) {
      render();
      return;
    }

    const shift = getShiftForEntry(entry);

    if (!shift) {
      showMessage("De dienst voor deze planning is niet gevonden.", "error");
      render();
      return;
    }

    const suitableEmployees = getSuitableEmployeesForShift(
      shift,
      entry.day,
      entry.startTime,
      entry.endTime,
      index
    );

    if (!suitableEmployees.includes(employeeName)) {
      showMessage("Deze medewerker is niet geschikt of niet beschikbaar voor deze dienst.", "error");
      render();
      return;
    }

    setUndoState("Medewerker wisselen");
    const previousEntry = { ...entry };
    entry.name = employeeName;
    entry.replacementFor = isBakeryCoreShift(shift) && getPrimaryStandardEmployeeForShift(shift.name) && getPrimaryStandardEmployeeForShift(shift.name) !== employeeName
      ? getPrimaryStandardEmployeeForShift(shift.name)
      : "";
    saveEntries();
    if (moveWorkLogToEntry(previousEntry, entry)) {
      saveWorkLogs();
    }
    persistProtectedChange({
      reason: `Medewerker gewisseld: ${entry.day} ${getShiftName(entry)}`,
      scope: "roster",
      action: "roster-employee-switched",
      message: `Medewerker gewisseld voor ${getShiftName(entry)} op ${formatDate(entry.day)}.`,
      details: {
        day: entry.day,
        shiftName: getShiftName(entry),
        employeeName
      }
    });
    preferences.lastEmployee = employeeName;
    savePreferences();
    queueNextEmptyPlannerFocus(quickSwitchSelect);
    render();
    const contractWarning = getManualShopContractWarning(employeeName, entry.day, shift, suitableEmployees, entries);
    showMessage(contractWarning || "Opgeslagen.", contractWarning ? "warning" : "success");
    return;
  }

  const openAssignSelect = event.target.closest('select[data-action="assign-open-shift"][data-day][data-shift-id]');

  if (!openAssignSelect) {
    return;
  }

  const day = openAssignSelect.dataset.day || "";
  const shiftId = openAssignSelect.dataset.shiftId || "";
  const employeeName = openAssignSelect.value || "";
  const shift = getDayPlannerShifts(day).find((item) => item.id === shiftId);

  if (!shift || !employeeName) {
    return;
  }

  const suitableEmployees = getSuitableEmployeesForShift(
    shift,
    day,
    shift.startTime,
    shift.endTime,
    null
  );

  if (!suitableEmployees.includes(employeeName)) {
    showMessage("Deze medewerker is niet bevoegd of niet beschikbaar voor deze dienst.", "error");
    render();
    return;
  }

  queueNextEmptyPlannerFocus(openAssignSelect);
  if (saveSingleDayPlannerShift(day, shift, employeeName)) {
    const contractWarning = getManualShopContractWarning(employeeName, day, shift, suitableEmployees, entries);
    showMessage(contractWarning || "Opgeslagen.", contractWarning ? "warning" : "success");
  }
});

scheduleBoard.addEventListener("click", (event) => {
  if (!isPlannerRole()) {
    return;
  }

  if (event.target.closest("select, button, input, label")) {
    return;
  }

  const card = event.target.closest(".shift-card[data-inline-select]");

  if (!card) {
    return;
  }

  const select = document.getElementById(card.dataset.inlineSelect || "");
  openPlannerSelect(select);
});

scheduleBoard.addEventListener("keydown", (event) => {
  if (!isPlannerRole()) {
    return;
  }

  const card = event.target.closest(".shift-card[data-inline-select]");

  if (card && !event.target.closest("select, button, input, label, textarea")) {
    const plannerCards = getPlannerFocusableCards();
    const currentIndex = plannerCards.indexOf(card);

    if (currentIndex === -1) {
      return;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      plannerCards[Math.min(plannerCards.length - 1, currentIndex + 1)]?.focus();
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      plannerCards[Math.max(0, currentIndex - 1)]?.focus();
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPlannerSelect(document.getElementById(card.dataset.inlineSelect || ""));
    }
    return;
  }

  const select = event.target.closest('select[data-action="assign-open-shift"][data-day][data-shift-id], select[data-action="quick-switch"][data-index]');

  if (!select) {
    return;
  }

  if (event.key === "Enter" && select.value) {
    queueNextEmptyPlannerFocus(select);
  }
});

timeOffRequestsContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const request = timeOffRequests.find((item) => item.id === button.dataset.requestId);

  if (!request) {
    showMessage("De aanvraag is niet gevonden.", "error");
    return;
  }

  if (button.dataset.requestAction === "edit") {
    if (!ensureOwnRequestAction(request.employeeName, "het wijzigen van deze aanvraag")) {
      return;
    }

    if (!ensureEmployeeDateRangeEditable(getTimeOffStartDate(request), getTimeOffEndDate(request), "deze aanvraag te wijzigen")) {
      return;
    }

    activeRequestComposer = request.type === "vakantie"
      ? "vacation"
      : request.type === "ziek"
        ? "sick"
        : "free";
    activeRequestType = getRequestTypeFromComposer(activeRequestComposer);
    editingTimeOffId = request.id;
    const targetFormState = getRequestComposerState(activeRequestComposer);
    targetFormState.employeeName = request.employeeName;
    targetFormState.type = request.type || "vrij";
    targetFormState.date = getTimeOffStartDate(request);
    targetFormState.startDate = getTimeOffStartDate(request);
    targetFormState.endDate = getTimeOffEndDate(request);
    targetFormState.reason = request.reason || "";
    renderRequestComposerState();
    showMessage("Pas je aanvraag aan en klik op Aanvraag indienen.", "success");
    return;
  }

    if (button.dataset.requestAction === "delete") {
    if (!ensureOwnRequestAction(request.employeeName, "het intrekken van deze aanvraag")) {
      return;
    }

    if (!ensureEmployeeDateRangeEditable(getTimeOffStartDate(request), getTimeOffEndDate(request), "deze aanvraag in te trekken")) {
      return;
    }

    const requestIndex = timeOffRequests.findIndex((item) => item.id === request.id);
    timeOffRequests.splice(requestIndex, 1);
    saveTimeOffRequests();
    persistProtectedChange({
      reason: `Afwezigheidsaanvraag ingetrokken: ${request.employeeName} ${request.date}`,
      scope: "request",
      action: "timeoff-deleted",
      message: `Afwezigheidsaanvraag ingetrokken voor ${request.employeeName}.`,
      details: {
        requestId: request.id,
        employeeName: request.employeeName,
        date: request.date,
        type: request.type
      }
    });
    render();
    showDeletedMessage("Afwezigheidsaanvraag ingetrokken.");
    return;
  }

  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan aanvragen goedkeuren of afwijzen.", "error");
    return;
  }

  if (!ensureDateRangeActionAllowed(getTimeOffStartDate(request), getTimeOffEndDate(request), {
    actionLabel: "aanvragen te verwerken",
    blockPlannerWhenLocked: true
  })) {
    return;
  }

  if (button.dataset.requestAction === "note") {
    request.managerNote = getPlannerRequestNoteFromButton(button);
    request.updatedAt = getNowIsoString();
    saveTimeOffRequests();
    persistProtectedChange({
      reason: `Opmerking bijgewerkt bij afwezigheidsaanvraag: ${request.employeeName} ${request.date}`,
      scope: "request",
      action: "timeoff-note-updated",
      message: `Opmerking opgeslagen voor ${getAbsenceTypeLabel(request.type).toLowerCase()} van ${request.employeeName}.`,
      details: {
        requestId: request.id,
        employeeName: request.employeeName,
        date: request.date,
        type: request.type,
        managerNote: request.managerNote || ""
      }
    });
    render();
    showMessage("Opmerking opgeslagen.", "success");
    return;
  }

  if (button.dataset.requestAction === "approve") {
    const managerNote = getPlannerRequestNoteFromButton(button);
    const scheduledEntries = entries.filter((entry) =>
      entry.name === request.employeeName &&
      requestIncludesDate(request, entry.day)
    );
    const absenceLabel = getAbsenceTypeLabel(request.type);
    let approvalMessage = `${absenceLabel} is goedgekeurd en direct zichtbaar in het rooster.`;

    if (scheduledEntries.length > 0) {
      const removedEntries = applyApprovedTimeOffToRoster(request);
      const scheduleText = removedEntries.map((entry) => `${getShiftName(entry)} (${entry.startTime} - ${entry.endTime})`).join(", ");
      approvalMessage = `${absenceLabel} is goedgekeurd. ${removedEntries.length} dienst(en) zijn vrijgemaakt in het rooster: ${scheduleText}.`;
    }

    request.status = "approved";
    request.managerNote = managerNote;
    request.updatedAt = getNowIsoString();
    registerTimeOffMailNotification(request, "approved", [request.employeeName], { notifyUser: true });
    saveTimeOffRequests();
    persistProtectedChange({
      reason: `Afwezigheidsaanvraag goedgekeurd: ${request.employeeName} ${request.date}`,
      scope: "request",
      action: "timeoff-approved",
      message: `${getAbsenceTypeLabel(request.type)} goedgekeurd voor ${request.employeeName}.`,
      details: {
        requestId: request.id,
        employeeName: request.employeeName,
        date: request.date,
        type: request.type,
        managerNote
      }
    });
    render();
    showMessage(approvalMessage, "success");
    return;
  } else {
    request.status = "rejected";
    request.managerNote = getPlannerRequestNoteFromButton(button);
    request.updatedAt = getNowIsoString();
    registerTimeOffMailNotification(request, "rejected", [request.employeeName], { notifyUser: true });
  }

  saveTimeOffRequests();
  persistProtectedChange({
    reason: `Afwezigheidsaanvraag afgewezen: ${request.employeeName} ${request.date}`,
    scope: "request",
    action: "timeoff-rejected",
    message: `${getAbsenceTypeLabel(request.type)} afgewezen voor ${request.employeeName}.`,
    details: {
      requestId: request.id,
      employeeName: request.employeeName,
      date: request.date,
      type: request.type,
      managerNote: request.managerNote || ""
    }
  });
  render();
  showDeletedMessage("Afwezigheidsaanvraag afgewezen.");
});

swapRequestsContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const request = swapRequests.find((item) => item.id === button.dataset.requestId);

  if (!request) {
    showMessage("Het ruilverzoek is niet gevonden.", "error");
    return;
  }

  if (button.dataset.requestAction === "edit") {
    if (!ensureOwnRequestAction(request.employeeName, "het wijzigen van dit ruilverzoek")) {
      return;
    }

    if (!ensureEmployeeWeekEditable(request.date, "dit ruilverzoek te wijzigen")) {
      return;
    }

    activeRequestComposer = "swap";
    activeRequestType = "ruilen";
    editingSwapId = request.id;
    const matchingSwapValue = `${request.employeeName}|${request.shiftId || ""}|${request.date}|${request.startTime}|${request.endTime}`;
    ruilForm = {
      employeeName: request.employeeName,
      date: request.date,
      entryValue: matchingSwapValue,
      targetEmployeeName: request.targetEmployeeName || "__open__"
    };
    renderRequestComposerState();
    showMessage("Pas je ruilverzoek aan en klik opnieuw op Ruilverzoek indienen.", "success");
    return;
  }

  if (button.dataset.requestAction === "delete") {
    if (!ensureOwnRequestAction(request.employeeName, "het intrekken van dit ruilverzoek")) {
      return;
    }

    if (!ensureEmployeeWeekEditable(request.date, "dit ruilverzoek in te trekken")) {
      return;
    }

    const requestIndex = swapRequests.findIndex((item) => item.id === request.id);
    swapRequests.splice(requestIndex, 1);
    saveSwapRequests();
    persistProtectedChange({
      reason: `Ruilverzoek ingetrokken: ${request.employeeName} ${request.date}`,
      scope: "request",
      action: "swap-deleted",
      message: `Ruilverzoek ingetrokken voor ${request.employeeName}.`,
      details: {
        requestId: request.id,
        employeeName: request.employeeName,
        date: request.date,
        shiftName: request.shiftName
      }
    });
    render();
      showMessage("Het ruilverzoek is ingetrokken.", "success");
      return;
    }

    if (button.dataset.requestAction === "escalate") {
      escalateSwapRequestToPlanner(request, {
        preserveTargetEmployee: true
      });
      return;
    }

    if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan ruilverzoeken goedkeuren of afwijzen.", "error");
    return;
  }

  if (!ensureWeekActionAllowed(getWeekValueFromDate(request.date), {
    actionLabel: "ruilverzoeken te verwerken",
    blockPlannerWhenLocked: true
  })) {
    return;
  }

  if (button.dataset.requestAction === "note") {
    request.managerNote = getPlannerRequestNoteFromButton(button);
    request.updatedAt = getNowIsoString();
    saveSwapRequests();
    persistProtectedChange({
      reason: `Opmerking bijgewerkt bij ruilverzoek: ${request.employeeName} ${request.date}`,
      scope: "request",
      action: "swap-note-updated",
      message: `Opmerking opgeslagen voor ruilverzoek van ${request.employeeName}.`,
      details: {
        requestId: request.id,
        employeeName: request.employeeName,
        date: request.date,
        shiftName: request.shiftName,
        managerNote: request.managerNote || ""
      }
    });
    render();
    showMessage("Opmerking opgeslagen.", "success");
    return;
  }

  if (button.dataset.requestAction === "close") {
    request.managerNote = getPlannerRequestNoteFromButton(button) || "Gesloten door planner";
    request.status = "rejected";
    request.updatedAt = getNowIsoString();
    saveSwapRequests();
    persistProtectedChange({
      reason: `Ruilverzoek gesloten: ${request.employeeName} ${request.date}`,
      scope: "request",
      action: "swap-closed",
      message: `Ruilverzoek gesloten voor ${request.employeeName}.`,
      details: {
        requestId: request.id,
        employeeName: request.employeeName,
        date: request.date,
        shiftName: request.shiftName,
        managerNote: request.managerNote
      }
    });
    render();
    showMessage("Ruilverzoek gesloten.", "success");
    return;
  }

    if (button.dataset.requestAction === "assign-replacement") {
      const replacementSelect = button.closest(".request-card")?.querySelector(`[data-request-replacement-select="${request.id}"]`);
      const selectedReplacement = replacementSelect?.value || "";

      if (!selectedReplacement) {
        showMessage("Kies eerst een vervanger voor dit ruilverzoek.", "warning");
        return;
      }

      const approvalIssue = getSwapApprovalIssue(request, selectedReplacement);

      if (approvalIssue) {
        showMessage(approvalIssue, "error");
        render();
        return;
      }

      request.targetEmployeeName = selectedReplacement;
    request.managerNote = getPlannerRequestNoteFromButton(button);
  }

    if (button.dataset.requestAction === "reject") {
      request.managerNote = getPlannerRequestNoteFromButton(button);
      request.status = "rejected";
      request.updatedAt = getNowIsoString();
      registerSwapMailNotification(request, "rejected", [request.employeeName, request.targetEmployeeName], { notifyUser: true });
      saveSwapRequests();
      persistProtectedChange({
        reason: `Ruilverzoek afgewezen: ${request.employeeName} ${request.date}`,
        scope: "request",
        action: "swap-rejected",
      message: `Ruilverzoek afgewezen voor ${request.employeeName}.`,
      details: {
        requestId: request.id,
        employeeName: request.employeeName,
        date: request.date,
        shiftName: request.shiftName,
        managerNote: request.managerNote || ""
      }
    });
    render();
    showDeletedMessage("Ruilverzoek afgewezen.");
    return;
  }

    if (!request.targetEmployeeName) {
      showMessage("Dit verzoek staat nog open zonder reactie. Kies een vervanger of sluit het verzoek af.", "error");
      return;
    }

    const approvalIssue = getSwapApprovalIssue(request, request.targetEmployeeName);

    if (approvalIssue) {
      showMessage(approvalIssue, "error");
      render();
      return;
    }

    if (!ensureWeekActionAllowed(getWeekValueFromDate(request.date), {
      actionLabel: "een ruil goed te keuren",
      blockPlannerWhenLocked: true
    })) {
      return;
    }

    const plannerNote = getPlannerRequestNoteFromButton(button) || (button.dataset.requestAction === "assign-replacement" ? "Handmatig door planner ingevuld" : "");
    finalizeApprovedSwapRequest(request, {
      managerNote: plannerNote,
      autoApproved: false,
      successMessage: button.dataset.requestAction === "assign-replacement" ? "Vervanger gekozen en rooster bijgewerkt." : "Rooster bijgewerkt.",
      persistMessage: `Ruilverzoek goedgekeurd voor ${request.employeeName}.`,
      action: "swap-approved"
    });
  });

cancelButton.addEventListener("click", () => {
  resetForm();
  hideMessage();
});

newButton.addEventListener("click", () => {
  resetForm();
  hideMessage();
});

repeatShiftButton.addEventListener("click", () => {
  const selectedDate = document.getElementById("day").value;

  if (!selectedDate) {
    showMessage("Kies eerst een dag voordat je dezelfde dienst herhaalt.", "error");
    return;
  }

  const date = new Date(`${selectedDate}T00:00:00`);
  date.setDate(date.getDate() + 1);
  document.getElementById("day").value = date.toISOString().slice(0, 10);
  hideMessage();
});

copyPreviousWeekButton.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan weken kopiëren.", "error");
    return;
  }

  const sourceWeek = copySourceWeekInput.value;
  const targetWeek = copyTargetWeekInput.value;

  if (!sourceWeek || !targetWeek) {
    showMessage("Kies eerst een bronweek en een doelweek.", "error");
    return;
  }

  if (sourceWeek === targetWeek) {
    showMessage("Bronweek en doelweek mogen niet hetzelfde zijn.", "error");
    return;
  }

  if (!ensureWeekActionAllowed(targetWeek, {
    actionLabel: "een week te kopiëren",
    blockPlannerWhenLocked: true
  })) {
    return;
  }

  const existingTargetEntries = entries.filter((entry) => getWeekValueFromDate(entry.day) === targetWeek);

  if (existingTargetEntries.length > 0) {
    showMessage("De gekozen week bevat al diensten. Kies een lege week of pas eerst bestaande regels aan.", "error");
    return;
  }

  const sourceEntries = entries.filter((entry) => getWeekValueFromDate(entry.day) === sourceWeek);

  if (sourceEntries.length === 0) {
    showMessage("Er zijn geen diensten gevonden in de gekozen bronweek.", "error");
    return;
  }

  const confirmed = confirmAction(`Weet je zeker dat je ${sourceEntries.length} dienst(en) wilt kopiëren van ${sourceWeek} naar ${targetWeek}?`);

  if (!confirmed) {
    return;
  }

  const sourceMonday = getDateFromWeekValue(sourceWeek);
  const targetMonday = getDateFromWeekValue(targetWeek);
  const dayOffset = Math.round((targetMonday - sourceMonday) / 86400000);

  sourceEntries.forEach((entry) => {
    const sourceDate = new Date(`${entry.day}T00:00:00Z`);
    sourceDate.setUTCDate(sourceDate.getUTCDate() + dayOffset);

    entries.push({
      ...entry,
      day: formatDateInput(sourceDate)
    });
  });

  saveEntries();
  persistProtectedChange({
    reason: `Rooster gekopieerd: ${sourceWeek} naar ${targetWeek}`,
    scope: "roster",
    action: "roster-week-copied",
    message: `Rooster gekopieerd van ${sourceWeek} naar ${targetWeek}.`,
    details: {
      sourceWeek,
      targetWeek,
      copiedCount: sourceEntries.length
    }
  });
  weekFilterInput.value = targetWeek;
  weekInput.value = targetWeek;
  render();
  showMessage("Rooster bijgewerkt.", "success");
});

myHoursRegistrations?.addEventListener("click", (event) => {
  const quickButton = event.target.closest("[data-worklog-quick-set][data-worklog-id][data-worklog-value]");

  if (quickButton) {
    const field = quickButton.dataset.worklogQuickSet;
    const workLogId = quickButton.dataset.worklogId;
    const value = quickButton.dataset.worklogValue || "";
    const input = myHoursRegistrations.querySelector(`[data-worklog-field="${field}"][data-worklog-id="${workLogId}"]`);

    if (input && !input.disabled) {
      input.value = value;
      const quickButtons = quickButton.parentElement?.querySelectorAll(".time-quick-button") || [];
      quickButtons.forEach((item) => item.classList.toggle("is-active", item === quickButton));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      input.focus();
    }
    return;
  }

  const button = event.target.closest("[data-worklog-action]");

  if (!button) {
    return;
  }

  if (button.dataset.worklogAction === "planned" && button.dataset.worklogId) {
    const contextEntry = getWorkLogContextById(button.dataset.worklogId);

    if (!contextEntry || !contextEntry.startTime || !contextEntry.endTime) {
      return;
    }

    const existingLog = workLogs.find((log) => log.id === button.dataset.worklogId) || null;
    const plannedValues = getPlannedWorkLogValues(contextEntry, existingLog);
    const actualStartInput = myHoursRegistrations.querySelector(`[data-worklog-field="actualStart"][data-worklog-id="${button.dataset.worklogId}"]`);
    const actualEndInput = myHoursRegistrations.querySelector(`[data-worklog-field="actualEnd"][data-worklog-id="${button.dataset.worklogId}"]`);
    const breakMinutesInput = myHoursRegistrations.querySelector(`[data-worklog-field="breakMinutes"][data-worklog-id="${button.dataset.worklogId}"]`);

    if (actualStartInput && !actualStartInput.disabled) {
      actualStartInput.value = plannedValues.actualStart;
      actualStartInput.closest(".hours-registration-time-field")?.querySelectorAll(".time-quick-button").forEach((item) => {
        item.classList.toggle("is-active", item.dataset.worklogValue === plannedValues.actualStart);
      });
    }

    if (actualEndInput && !actualEndInput.disabled) {
      actualEndInput.value = plannedValues.actualEnd;
      actualEndInput.closest(".hours-registration-time-field")?.querySelectorAll(".time-quick-button").forEach((item) => {
        item.classList.toggle("is-active", item.dataset.worklogValue === plannedValues.actualEnd);
      });
    }

    if (breakMinutesInput && !breakMinutesInput.disabled) {
      breakMinutesInput.value = String(plannedValues.breakMinutes);
      breakMinutesInput.closest(".hours-registration-time-field")?.querySelectorAll(".time-quick-button").forEach((item) => {
        item.classList.toggle("is-active", item.dataset.worklogValue === String(plannedValues.breakMinutes));
      });
    }

    preferences.lastWorkLogTimes = {
      actualStart: plannedValues.actualStart,
      actualEnd: plannedValues.actualEnd,
      breakMinutes: plannedValues.breakMinutes
    };
    savePreferences();
    refreshWorkLogValidationForCard(button.dataset.worklogId);
    showMessage("Geplande tijden ingevuld.", "success");
    return;
  }

  if ((button.dataset.worklogAction === "save" || button.dataset.worklogAction === "submit") && button.dataset.worklogId) {
    saveWorkLogFromForm(button.dataset.worklogId, button.dataset.worklogAction);
  }
});

myHoursRegistrations?.addEventListener("change", (event) => {
  const input = event.target.closest("[data-worklog-field][data-worklog-id]");

  if (!input?.dataset.worklogId) {
    return;
  }

  refreshWorkLogValidationForCard(input.dataset.worklogId);
});

myHoursSummary?.addEventListener("click", (event) => {
  const entryModeButton = event.target.closest("[data-hours-entry-mode]");

  if (entryModeButton?.dataset.hoursEntryMode) {
    const requestedMode = entryModeButton.dataset.hoursEntryMode;
    const employeeName = getRoleScopedEmployeeName();
    const selectedDate = getSelectedHoursDate();
    const hasPlannedEntries = entries.some((entry) => entry.name === employeeName && entry.day === selectedDate);

    activeMyHoursEntryMode = requestedMode === "planned" && !hasPlannedEntries ? "extra" : requestedMode;
    renderMyHours();
    return;
  }

  const sectionButton = event.target.closest("[data-hours-open-section]");

  if (sectionButton?.dataset.hoursOpenSection) {
    activeMyHoursSection = sectionButton.dataset.hoursOpenSection;
    renderMyHours();
    return;
  }

  const button = event.target.closest("[data-hours-pick-date]");

  if (!button?.dataset.hoursPickDate || !hoursDateInput) {
    return;
  }

  const targetDate = button.dataset.hoursPickDate;
  const targetWeek = getWeekValueFromDate(targetDate) || getCurrentWeekValue();
  activeMyHoursSection = "fill";
  activeMyHoursEntryMode = "planned";
  hoursDateInput.value = targetDate;
  hoursWeekInput.value = targetWeek;
  preferences.lastHoursDate = targetDate;
  preferences.lastHoursWeek = targetWeek;
  savePreferences();
  renderMyHours();
});

myHoursSectionSwitch?.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  if (button === myHoursTodayButton && hoursDateInput) {
    const todayValue = getTodayLocalDateValue();
    hoursDateInput.value = todayValue;
    if (hoursWeekInput) {
      hoursWeekInput.value = getWeekValueFromDate(todayValue) || getCurrentWeekValue();
    }
    preferences.lastHoursDate = todayValue;
    preferences.lastHoursWeek = hoursWeekInput?.value || getCurrentWeekValue();
    activeMyHoursSection = "today";
    activeMyHoursEntryMode = "planned";
    savePreferences();
    renderMyHours();
    return;
  }

  if (button === myHoursMissingButton) {
    activeMyHoursSection = "missing";
    renderMyHours();
    return;
  }

  if (button === myHoursFillButton) {
    activeMyHoursSection = "fill";
    activeMyHoursEntryMode = "planned";
    renderMyHours();
  }
});

myScheduleBoard?.addEventListener("click", (event) => {
  const quickCompleteButton = event.target.closest("[data-complete-hours-date]");

  if (quickCompleteButton?.dataset.completeHoursDate) {
    quickCompleteWorkDay(quickCompleteButton.dataset.completeHoursDate);
    return;
  }

  const button = event.target.closest("[data-go-hours-date]");

  if (!button?.dataset.goHoursDate) {
    return;
  }

  openHoursForDate(button.dataset.goHoursDate);
});

hoursApprovalQueue?.addEventListener("click", (event) => {
  const reviewButton = event.target.closest("[data-worklog-review][data-worklog-id]");

  if (reviewButton) {
    const noteInput = hoursApprovalQueue.querySelector(`[data-worklog-review-note="${reviewButton.dataset.worklogId}"]`);
    updateWorkLogStatus(reviewButton.dataset.worklogId, reviewButton.dataset.worklogReview, noteInput?.value || "");
    return;
  }

  const bulkButton = event.target.closest("[data-worklog-bulk][data-worklog-week]");

  if (!bulkButton) {
    return;
  }

  if (bulkButton.dataset.worklogBulk === "employee-week") {
    approveWorkLogsForWeek(bulkButton.dataset.worklogWeek, bulkButton.dataset.worklogEmployee || "");
    return;
  }

  if (bulkButton.dataset.worklogBulk === "full-week") {
    approveWorkLogsForWeek(bulkButton.dataset.worklogWeek);
  }
});

addEmployeeButton.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan medewerkers toevoegen.", "error");
    return;
  }

  const employeeName = newEmployeeNameInput.value.trim();

  if (!employeeName) {
    showMessage("Vul eerst een naam van een medewerker in.", "error");
    return;
  }

  if (employees.some((employee) => employee.toLowerCase() === employeeName.toLowerCase())) {
    showMessage("Deze medewerker bestaat al.", "error");
    return;
  }

  employees.push(employeeName);
  employees.sort((nameA, nameB) => nameA.localeCompare(nameB, "nl"));
  employeeMeta[employeeName] = {
    ...getEmployeeStatusMetaDefaults(),
    status: "active",
    role: getDefaultEmployeeAppRole(employeeName),
    updatedAt: getNowIsoString(),
    updatedByRole: isPlannerRole() ? "planner" : "employee",
    updatedByName: isPlannerRole() ? "Planner / Directie" : (getRoleScopedEmployeeName() || "Medewerker")
  };
  saveEmployees();
  saveEmployeeMeta();
  syncEmployeePermissions();
  syncEmployeeStandardShifts();
  syncEmployeeBasePatterns();
  syncEmployeeCustomRosters();
  persistProtectedChange({
    reason: `Medewerker toegevoegd: ${employeeName}`,
    scope: "employee",
    action: "employee-created",
    message: `Medewerker ${employeeName} toegevoegd.`,
    details: {
      employeeName,
      employeeStatus: "active"
    }
  });
  if (removeEmployeeSelect) {
    removeEmployeeSelect.value = employeeName;
  }
  render();
  nameSelect.value = employeeName;
  preferences.lastEmployee = employeeName;
  savePreferences();
  newEmployeeNameInput.value = "";
  showSavedMessage();
});

addShiftButton.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan diensten beheren.", "error");
    return;
  }

  const shiftName = newShiftNameInput.value.trim();
  const shiftColor = newShiftColorInput.value;
  const startTime = newShiftStartInput.value;
  const endTime = newShiftEndInput.value;

  if (!shiftName || !shiftColor || !startTime || !endTime) {
    showMessage("Vul naam, kleur, begintijd en eindtijd van de dienst in.", "error");
    return;
  }

  if (calculateHours(startTime, endTime) === null) {
    showMessage("De eindtijd van de dienst moet later zijn dan de begintijd.", "error");
    return;
  }

  if (shifts.some((shift) => shift.id !== editingShiftId && shift.name.toLowerCase() === shiftName.toLowerCase())) {
    showMessage("Er bestaat al een dienst met deze naam.", "error");
    return;
  }

  if (shifts.some((shift) => shift.id !== editingShiftId && shift.startTime === startTime && shift.endTime === endTime)) {
    showMessage("Er bestaat al een dienst met dezelfde tijden.", "error");
    return;
  }

  const isEditingShift = editingShiftId !== null;
  const previousShiftId = editingShiftId;
  const shiftId = `${startTime}|${endTime}|${shiftName}`;
  const shift = {
    id: shiftId,
    name: shiftName,
    startTime,
    endTime,
    color: shiftColor
  };

  if (!isEditingShift) {
    shifts.push(shift);
  } else {
    const shiftIndex = shifts.findIndex((item) => item.id === previousShiftId);

    if (shiftIndex === -1) {
      showMessage("De te bewerken dienst is niet gevonden.", "error");
      resetShiftForm();
      render();
      return;
    }

    const previousShift = shifts[shiftIndex];
    shifts[shiftIndex] = shift;
    let movedWorkLogs = false;

    entries.forEach((entry) => {
      const entryShift = getShiftForEntry(entry);

      if ((entry.shiftId && entry.shiftId === previousShift.id) || entryShift?.id === previousShift.id) {
        const previousEntry = { ...entry };
        entry.startTime = shift.startTime;
        entry.endTime = shift.endTime;
        entry.hours = calculateHours(shift.startTime, shift.endTime);
        entry.shiftId = shift.id;
        entry.shiftName = shift.name;
        movedWorkLogs = moveWorkLogToEntry(previousEntry, entry) || movedWorkLogs;
      }
    });
    saveEntries();
    if (movedWorkLogs) {
      saveWorkLogs();
    }

    if (preferences.lastShift === previousShiftId) {
      preferences.lastShift = shift.id;
      savePreferences();
    }

    Object.values(employeePermissions).forEach((permissionMap) => {
      if (typeof permissionMap?.[previousShift.name] === "boolean") {
        permissionMap[shift.name] = permissionMap[previousShift.name];
        delete permissionMap[previousShift.name];
      }
    });

    Object.values(employeeShiftPreferences).forEach((preferenceMap) => {
      const previousPreference = Number(preferenceMap?.[previousShift.name]);
      if (Number.isFinite(previousPreference)) {
        preferenceMap[shift.name] = previousPreference > 0 ? Math.floor(previousPreference) : 0;
        delete preferenceMap[previousShift.name];
      }
    });
  }

  shifts.sort((shiftA, shiftB) => shiftA.startTime.localeCompare(shiftB.startTime) || shiftA.name.localeCompare(shiftB.name, "nl"));
  saveShifts();
  syncEmployeePermissions();
  syncEmployeeStandardShifts();
  syncEmployeeShiftPreferences();
  syncEmployeeShiftPreferences();
  persistProtectedChange({
    reason: isEditingShift ? `Dienst bijgewerkt: ${shiftName}` : `Dienst toegevoegd: ${shiftName}`,
    scope: "shift",
    action: isEditingShift ? "shift-updated" : "shift-created",
    message: isEditingShift ? `Dienst ${shiftName} bijgewerkt.` : `Dienst ${shiftName} toegevoegd.`,
    details: {
      shiftId: shift.id,
      shiftName,
      startTime,
      endTime,
      isEditingShift
    }
  });
  render();
  presetShiftSelect.value = shift.id;
  document.getElementById("startTime").value = startTime;
  document.getElementById("endTime").value = endTime;
  preferences.lastShift = shift.id;
  savePreferences();
  resetShiftForm();
  showSavedMessage();
});

removeShiftButton.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan diensten verwijderen.", "error");
    return;
  }

  const shiftId = removeShiftSelect.value;

  if (!shiftId) {
    showMessage("Kies eerst een dienst om te verwijderen.", "error");
    return;
  }

  const shiftIndex = shifts.findIndex((shift) => shift.id === shiftId);

  if (shiftIndex === -1) {
    showMessage("Deze dienst is niet gevonden.", "error");
    return;
  }

  if (!confirmAction(`Weet je het zeker? Dienst "${shifts[shiftIndex]?.name || "onbekend"}" wordt verwijderd.`)) {
    return;
  }

  const removedShift = shifts[shiftIndex];
  shifts.splice(shiftIndex, 1);
  saveShifts();
  syncEmployeePermissions();
  syncEmployeeStandardShifts();
  syncEmployeeShiftPreferences();

  if (preferences.lastShift === shiftId) {
    preferences.lastShift = "";
    savePreferences();
  }

  if (presetShiftSelect.value === shiftId) {
    presetShiftSelect.value = "";
  }

  if (editingShiftId === shiftId) {
    resetShiftForm();
  }

  persistProtectedChange({
    reason: `Dienst verwijderd: ${removedShift?.name || shiftId}`,
    scope: "shift",
    action: "shift-deleted",
    message: `Dienst ${removedShift?.name || shiftId} verwijderd.`,
    details: {
      shiftId,
      shiftName: removedShift?.name || ""
    }
  });
  render();
  showDeletedMessage("Dienst verwijderd.");
});

editShiftButton.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan diensten bewerken.", "error");
    return;
  }

  const shiftId = removeShiftSelect.value;

  if (!shiftId) {
    showMessage("Kies eerst een dienst om te bewerken.", "error");
    return;
  }

  const shift = shifts.find((item) => item.id === shiftId);

  if (!shift) {
    showMessage("Deze dienst is niet gevonden.", "error");
    return;
  }

  editingShiftId = shift.id;
  newShiftNameInput.value = shift.name;
  newShiftColorInput.value = shift.color;
  newShiftStartInput.value = shift.startTime;
  newShiftEndInput.value = shift.endTime;
  updateShiftFormState();
  showMessage("De dienst staat klaar om te bewerken. Pas de velden aan en klik op Dienst opslaan.", "success");
});

cancelShiftButton.addEventListener("click", () => {
  resetShiftForm();
  hideMessage();
});

employeePermissionsList?.addEventListener("change", (event) => {
  const checkbox = event.target.closest('input[type="checkbox"][data-permission-employee][data-permission-shift]');

  if (!checkbox) {
    return;
  }

  if (!isPlannerRole()) {
    checkbox.checked = !checkbox.checked;
    showMessage("Alleen planner of directie kan bevoegdheden wijzigen.", "error");
    return;
  }

  const employeeName = checkbox.dataset.permissionEmployee;
  const shiftName = checkbox.dataset.permissionShift;

  if (!employeeName || !shiftName || !employeePermissions[employeeName]) {
    return;
  }

  const employeeDraft = getEmployeeEditorDraft(employeeName);
  employeeDraft.permissions = {
    ...(employeeDraft.permissions || {}),
    [shiftName]: checkbox.checked
  };
});

shiftPreferenceShiftSelect?.addEventListener("change", () => {
  renderShiftPreferenceEditor();
});

shiftPreferenceList?.addEventListener("change", (event) => {
  const input = event.target.closest('input[type="number"][data-shift-preference-employee][data-shift-preference-shift]');

  if (!input) {
    return;
  }

  if (!isPlannerRole()) {
    renderShiftPreferenceEditor();
    showMessage("Alleen planner of directie kan dienstvoorkeuren wijzigen.", "error");
    return;
  }

  const employeeName = input.dataset.shiftPreferenceEmployee;
  const shiftName = input.dataset.shiftPreferenceShift;

  if (!employeeName || !shiftName || !employeeShiftPreferences[employeeName]) {
    return;
  }

  const numericValue = Number(input.value);
  const normalizedValue = Number.isFinite(numericValue) && numericValue > 0 ? Math.floor(numericValue) : 0;
  input.value = String(normalizedValue);
  saveShiftPreference(employeeName, shiftName, normalizedValue);
  persistProtectedChange({
    reason: `Dienstvoorkeur gewijzigd: ${shiftName} ${employeeName}`,
    scope: "employee",
    action: "shift-preference-order-updated",
    message: `Voorkeursvolgorde bijgewerkt voor ${shiftName}.`,
    details: {
      employeeName,
      shiftName,
      preferenceOrder: normalizedValue
    }
  });
  renderShiftPreferenceEditor();
  renderEmployeeList();
  showSavedMessage();
});

employeeStandardShiftList?.addEventListener("change", (event) => {
  const select = event.target.closest("select[data-standard-shift-employee]");

  if (!select) {
    const rosterModeSelect = event.target.closest("select[data-roster-mode-employee]");

    if (rosterModeSelect) {
      if (!isPlannerRole()) {
        renderEmployeeStandardShifts();
        showMessage("Alleen planner of directie kan vaste roosterindelingen wijzigen.", "error");
        return;
      }

      const employeeName = rosterModeSelect.dataset.rosterModeEmployee;

      if (!employeeName) {
        return;
      }

      const employeeDraft = getEmployeeEditorDraft(employeeName);
      employeeDraft.customRoster = {
        ...normalizeEmployeeCustomRosterConfig(employeeDraft.customRoster, employeeName),
        mode: rosterModeSelect.value === "biweekly" ? "biweekly" : "single"
      };
      renderEmployeeStandardShifts();
      return;
    }

    const rosterDaySelect = event.target.closest("select[data-roster-pattern-employee]");

    if (rosterDaySelect) {
      if (!isPlannerRole()) {
        renderEmployeeStandardShifts();
        showMessage("Alleen planner of directie kan vaste roosterindelingen wijzigen.", "error");
        return;
      }

      const employeeName = rosterDaySelect.dataset.rosterPatternEmployee;
      const weekKey = rosterDaySelect.dataset.rosterPatternWeek;
      const weekday = Number(rosterDaySelect.dataset.rosterPatternDay);

      if (!employeeName || !weekKey || !Number.isFinite(weekday)) {
        return;
      }

      const employeeDraft = getEmployeeEditorDraft(employeeName);
      const nextConfig = normalizeEmployeeCustomRosterConfig(employeeDraft.customRoster, employeeName);
      const targetWeekKey = weekKey === "weekA" || weekKey === "weekB" ? weekKey : "single";
      nextConfig[targetWeekKey] = {
        ...nextConfig[targetWeekKey],
        [weekday]: normalizeRosterDaypartValue(rosterDaySelect.value)
      };
      employeeDraft.customRoster = nextConfig;
      renderEmployeeStandardShifts();
      return;
    }

    const basePatternSelect = event.target.closest("select[data-base-pattern-employee]");

    if (!basePatternSelect) {
      return;
    }

    if (!isPlannerRole()) {
      renderEmployeeStandardShifts();
      showMessage("Alleen planner of directie kan basisroosters wijzigen.", "error");
      return;
    }

    const employeeName = basePatternSelect.dataset.basePatternEmployee;

    if (!employeeName) {
      return;
    }

    const employeeDraft = getEmployeeEditorDraft(employeeName);
    employeeDraft.basePatternId = basePatternSelect.value || "";
    renderEmployeeStandardShifts();
    return;
  }

  if (!isPlannerRole()) {
    renderEmployeeStandardShifts();
    showMessage("Alleen planner of directie kan vaste standaarddiensten wijzigen.", "error");
    return;
  }

  const employeeName = select.dataset.standardShiftEmployee;

  if (!employeeName) {
    return;
  }

  const employeeDraft = getEmployeeEditorDraft(employeeName);
  employeeDraft.standardShift = select.value || "";
});

employeeContractPanel?.addEventListener("change", (event) => {
  const contractHoursInput = event.target.closest("input[data-contract-hours-employee]");

  if (!contractHoursInput) {
    return;
  }

  if (!isPlannerRole()) {
    renderEmployeeContractPanel();
    showMessage("Alleen planner of directie kan contracturen wijzigen.", "error");
    return;
  }

  const employeeName = contractHoursInput.dataset.contractHoursEmployee;

  if (!employeeName || !employeeMeta[employeeName]) {
    return;
  }

  const normalizedContractHours = normalizeContractHours(contractHoursInput.value);
  contractHoursInput.value = normalizedContractHours > 0 ? String(normalizedContractHours) : "0";
  const employeeDraft = getEmployeeEditorDraft(employeeName);
  employeeDraft.contractHours = normalizedContractHours;
});

employeeListCard?.addEventListener("click", (event) => {
  const card = event.target.closest("[data-employee-select]");

  if (!card || !removeEmployeeSelect) {
    return;
  }

  const employeeName = card.dataset.employeeSelect;

  if (!employeeName || !employees.includes(employeeName)) {
    return;
  }

  const currentEmployeeName = getSelectedEmployeeAdminName();

  if (employeeName !== currentEmployeeName) {
    const navigationChoice = confirmEmployeeEditorNavigation(currentEmployeeName);

    if (navigationChoice === "cancel") {
      return;
    }
  }

  removeEmployeeSelect.value = employeeName;
  renderEmployeeList();
  renderEmployeeEditorDetails();
});

function submitTimeOffRequest(composer) {
  const ownEmployeeName = !isPlannerRole() ? getOwnEmployeeNameOrWarn() : "";

  if (!isPlannerRole() && !ownEmployeeName) {
    return;
  }

  syncTimeOffFormStateFromFields(composer);
  const currentTimeOffForm = getRequestComposerState(composer);
  const formElements = getTimeOffFormElements(composer);
  const employeeName = !isPlannerRole() ? ownEmployeeName : (currentTimeOffForm.employeeName || formElements?.employeeSelect?.value || "");
  const type = currentTimeOffForm.type || getComposerTimeOffType(composer);
  const startDate = type === "vakantie" ? currentTimeOffForm.startDate : currentTimeOffForm.date;
  const endDate = type === "vakantie" ? (currentTimeOffForm.endDate || startDate) : startDate;
  const date = startDate;
  const reason = (currentTimeOffForm.reason || "").trim();

  if (!ensureOwnRequestAction(employeeName, "een afwezigheidsaanvraag")) {
    return;
  }

  if (!employeeName || !startDate || !reason || (type === "vakantie" && !endDate)) {
    showMessage(
      isPlannerRole()
        ? "Kies medewerker, status, datum of periode en reden voor de afwezigheid."
        : "Kies type aanvraag, datum of periode en reden.",
      "error"
    );
    return;
  }

  if (type === "vakantie" && endDate < startDate) {
    showMessage("De einddatum van de vakantie moet gelijk zijn aan of later zijn dan de begindatum.", "error");
    return;
  }

  if (!ensureEmployeeDateRangeEditable(startDate, endDate, "een afwezigheidsaanvraag te doen of te wijzigen")) {
    return;
  }

  if (timeOffRequests.some((request) =>
    request.id !== editingTimeOffId &&
    request.employeeName === employeeName &&
    request.status === "open" &&
    requestOverlapsRange(request, startDate, endDate)
  )) {
    showMessage("Voor deze medewerker staat al een open afwezigheidsaanvraag in deze periode.", "error");
    return;
  }

  if (editingTimeOffId) {
    const request = timeOffRequests.find((item) => item.id === editingTimeOffId);

    if (request) {
      if (!ensureOwnRequestAction(request.employeeName, "het wijzigen van deze afwezigheidsaanvraag")) {
        return;
      }

      request.employeeName = employeeName;
      request.type = type;
      request.date = startDate;
      request.startDate = startDate;
      request.endDate = endDate;
      request.reason = reason;
      request.status = "open";
      request.updatedAt = getNowIsoString();
      request.mailLog = Array.isArray(request.mailLog) ? request.mailLog : [];
    }
  } else {
    timeOffRequests.push({
      id: createRequestId("timeoff"),
      employeeName,
      type,
      date: startDate,
      startDate,
      endDate,
      reason,
      status: "open",
      createdAt: getNowIsoString(),
      updatedAt: getNowIsoString()
    });
  }
  const currentTimeOffRequest = editingTimeOffId
    ? timeOffRequests.find((item) => item.id === editingTimeOffId)
    : timeOffRequests[timeOffRequests.length - 1];

  if (currentTimeOffRequest) {
    registerTimeOffMailNotification(currentTimeOffRequest, "submitted", [employeeName], {
      notifyUser: true,
      notifySuccessMessage: getAppMailSentMessage(),
      notifyErrorMessage: "Aanvraag opgeslagen, mail niet verzonden"
    });
  }
  saveTimeOffRequests();
  persistProtectedChange({
    reason: editingTimeOffId ? `Afwezigheidsaanvraag gewijzigd: ${employeeName} ${startDate}` : `Afwezigheidsaanvraag ingediend: ${employeeName} ${startDate}`,
    scope: "request",
    action: editingTimeOffId ? "timeoff-updated" : "timeoff-created",
    message: `${getAbsenceTypeLabel(type)} opgeslagen voor ${employeeName}.`,
    details: {
      employeeName,
      date: startDate,
      startDate,
      endDate,
      type,
      status: "open"
    }
  });
  resetTimeOffComposer({
    nextComposer: composer,
    preserveEmployee: !isPlannerRole()
  });
  render();
  showToast("Aanvraag verzonden");
}

submitFreeDayButton?.addEventListener("click", () => {
  submitTimeOffRequest("free");
});

submitVacationButton?.addEventListener("click", () => {
  submitTimeOffRequest("vacation");
});

submitSickButton?.addEventListener("click", () => {
  submitTimeOffRequest("sick");
});

submitSwapButton.addEventListener("click", () => {
  const ownEmployeeName = !isPlannerRole() ? getOwnEmployeeNameOrWarn() : "";

  if (!isPlannerRole() && !ownEmployeeName) {
    return;
  }

  syncSwapFormStateFromFields();
  const currentSwapForm = getRequestComposerState("swap");
  const employeeName = !isPlannerRole() ? ownEmployeeName : (currentSwapForm.employeeName || swapEmployeeSelect.value);
  const entryValue = currentSwapForm.entryValue || swapEntrySelect.value;
  const targetEmployeeName = currentSwapForm.targetEmployeeName || swapTargetEmployeeSelect.value;
  const entryDetails = getSwapEntryDetails(entryValue);
  const date = entryDetails?.date || currentSwapForm.date || swapDateInput.value;

  if (!employeeName || !date || !entryValue || !targetEmployeeName) {
    showMessage(
      isPlannerRole()
        ? "Kies medewerker, datum, dienst en een overnemer of open aanbieden."
        : "Kies datum, dienst en een geschikte collega.",
      "error"
    );
    return;
  }

  if (!ensureEmployeeWeekEditable(date, "een ruilverzoek te doen of te wijzigen")) {
    return;
  }

  if (employeeName === targetEmployeeName) {
    showMessage("Een medewerker kan niet zijn eigen dienst overnemen.", "error");
    return;
  }

  if (!isPlannerRole() && targetEmployeeName === "__open__") {
    showMessage("Kies een geschikte collega of schakel directie in.", "error");
    return;
  }

  if (!ensureOwnRequestAction(employeeName, "een ruilverzoek")) {
    return;
  }

  const entry = entryDetails?.entry || null;

  if (!entry) {
    showMessage("De gekozen dienst is niet meer gevonden.", "error");
    render();
    return;
  }

  if (targetEmployeeName !== "__open__") {
    const replacementCandidates = getSwapCandidatesForEntryDetails(entryDetails);

    if (!replacementCandidates.includes(targetEmployeeName)) {
      showMessage("Deze collega is niet bevoegd of niet beschikbaar voor deze dienst.", "error");
      renderSwapTargetOptions();
      return;
    }
  }

  if (!ensureOwnRequestAction(entry.name, "het ruilen van deze dienst")) {
    render();
    return;
  }

  if (swapRequests.some((request) =>
    request.id !== editingSwapId &&
    request.status === "open" &&
    request.employeeName === employeeName &&
    request.targetEmployeeName === targetEmployeeName &&
    request.date === date &&
    request.shiftId === (entry.shiftId || "") &&
    request.startTime === entry.startTime &&
    request.endTime === entry.endTime
  )) {
    showMessage("Voor deze dienst bestaat al een open ruilverzoek.", "error");
    return;
  }

    if (editingSwapId) {
      const request = swapRequests.find((item) => item.id === editingSwapId);

    if (request) {
      if (!ensureOwnRequestAction(request.employeeName, "het wijzigen van dit ruilverzoek")) {
        return;
      }

      request.employeeName = employeeName;
      request.targetEmployeeName = targetEmployeeName === "__open__" ? "" : targetEmployeeName;
      request.date = date;
      request.shiftId = entry.shiftId || "";
        request.shiftName = getShiftName(entry);
        request.startTime = entry.startTime;
        request.endTime = entry.endTime;
        request.escalatedToPlanner = Boolean(request.escalatedToPlanner);
        request.autoApproved = false;
        request.status = "open";
        request.updatedAt = getNowIsoString();
        }
    } else {
        swapRequests.push({
        id: createRequestId("swap"),
        employeeName,
        targetEmployeeName: targetEmployeeName === "__open__" ? "" : targetEmployeeName,
      date,
      shiftId: entry.shiftId || "",
        shiftName: getShiftName(entry),
        startTime: entry.startTime,
          endTime: entry.endTime,
          status: "open",
          escalatedToPlanner: false,
          autoApproved: false,
          createdAt: getNowIsoString(),
          updatedAt: getNowIsoString()
        });
      }

    const currentRequest = editingSwapId
      ? swapRequests.find((item) => item.id === editingSwapId)
      : swapRequests[swapRequests.length - 1];

    if (currentRequest) {
      currentRequest.mailLog = Array.isArray(currentRequest.mailLog) ? currentRequest.mailLog : [];
    }

    const canTryAutoApprove = Boolean(currentRequest?.targetEmployeeName);

    if (canTryAutoApprove) {
      const autoApproveIssue = getSwapApprovalIssue(currentRequest, currentRequest.targetEmployeeName);

      if (!autoApproveIssue) {
        finalizeApprovedSwapRequest(currentRequest, {
          managerNote: "Automatisch goedgekeurd",
          autoApproved: true,
          successMessage: "Ruil automatisch goedgekeurd en rooster bijgewerkt.",
          persistMessage: `Ruil automatisch goedgekeurd voor ${currentRequest.employeeName}.`,
          action: "swap-auto-approved"
        });
        return;
      }
    }

    if (currentRequest?.employeeName) {
      registerSwapMailNotification(currentRequest, "submitted", [currentRequest.employeeName], {
        notifyUser: true,
        notifySuccessMessage: getAppMailSentMessage(),
        notifyErrorMessage: "Aanvraag opgeslagen, mail niet verzonden"
      });
    }

    if (currentRequest?.targetEmployeeName) {
      registerSwapMailNotification(currentRequest, "request-created", [currentRequest.targetEmployeeName]);
    }

    saveSwapRequests();
    persistProtectedChange({
      reason: editingSwapId ? `Ruilverzoek gewijzigd: ${employeeName} ${date}` : `Ruilverzoek ingediend: ${employeeName} ${date}`,
      scope: "request",
      action: editingSwapId ? "swap-updated" : "swap-created",
    message: `Ruilverzoek opgeslagen voor ${employeeName}.`,
    details: {
      employeeName,
      targetEmployeeName: targetEmployeeName === "__open__" ? "" : targetEmployeeName,
      date,
      shiftName: getShiftName(entry),
      status: "open"
    }
  });
  resetSwapComposer({ preserveEmployee: !isPlannerRole() });
    render();
    showToast("Aanvraag verzonden");
  });

removeEmployeeButton?.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan medewerkerstatus wijzigen.", "error");
    return;
  }

  const employeeName = removeEmployeeSelect.value;
  const nextStatus = normalizeEmployeeStatus(employeeStatusSelect?.value);

  if (!employeeName) {
    showMessage("Kies eerst een medewerker.", "error");
    return;
  }

  if (!employees.includes(employeeName)) {
    showMessage("Deze medewerker is niet gevonden.", "error");
    return;
  }

  const currentStatus = getEmployeeStatus(employeeName);

  if (currentStatus === nextStatus) {
    showMessage("Deze medewerker heeft deze status al.", "error");
    return;
  }

  const linkedEntryCount = entries.filter((entry) => entry.name === employeeName).length;
  const linkedRequestCount = timeOffRequests.filter((request) => request.employeeName === employeeName).length +
    swapRequests.filter((request) => request.employeeName === employeeName || request.targetEmployeeName === employeeName).length;
  const linkedWorkLogCount = workLogs.filter((log) => log.employeeName === employeeName).length;
  const impactText = `${employeeName} krijgt status ${getEmployeeStatusLabel(nextStatus)}.

Gevolgen:
- historische gegevens blijven bewaard
- medewerker verdwijnt uit standaard actieve keuzelijsten
- medewerker kan niet meer normaal ingepland worden
- medewerker kan niet meer als medewerker inloggen als status niet actief is

Bewaarde historie:
- ${linkedEntryCount} roosterregels
- ${linkedRequestCount} aanvragen of ruilverzoeken
- ${linkedWorkLogCount} urenregistraties`;

  if (!confirmAction(`${impactText}\n\nWeet je zeker dat je deze wijziging wilt opslaan?`)) {
    return;
  }

  employeeMeta[employeeName] = {
    ...getEmployeeStatusMetaDefaults(),
    ...employeeMeta[employeeName],
    status: nextStatus,
    updatedAt: getNowIsoString(),
    updatedByRole: isPlannerRole() ? "planner" : "employee",
    updatedByName: isPlannerRole() ? "Planner / Directie" : (getRoleScopedEmployeeName() || "Medewerker")
  };

  saveEmployeeMeta();
  persistProtectedChange({
    reason: `Medewerkerstatus gewijzigd: ${employeeName}`,
    scope: "employee",
    action: "employee-status-changed",
    message: `${employeeName} is op ${getEmployeeStatusLabel(nextStatus).toLowerCase()} gezet.`,
    details: {
      employeeName,
      previousStatus: currentStatus,
      nextStatus,
      linkedEntryCount,
      linkedRequestCount,
      linkedWorkLogCount
    }
  });

  render();
  showMessage(`Status opgeslagen. ${employeeName} staat nu op ${getEmployeeStatusLabel(nextStatus).toLowerCase()}.`, "success");
});

employeeStatusSelect?.addEventListener("change", () => {
  const employeeName = getSelectedEmployeeAdminName();
  const employeeDraft = getEmployeeEditorDraft(employeeName);

  if (employeeDraft) {
    employeeDraft.status = normalizeEmployeeStatus(employeeStatusSelect.value);
  }

  employeeStatusImpact.textContent = formatEmployeeStatusImpact(employeeStatusSelect.value);
});

employeeRoleSelect?.addEventListener("change", () => {
  const employeeName = getSelectedEmployeeAdminName();
  const employeeDraft = getEmployeeEditorDraft(employeeName);

  if (employeeDraft) {
    employeeDraft.role = normalizeEmployeeAppRole(employeeRoleSelect.value);
  }
});

employeeEmailInput?.addEventListener("input", () => {
  const employeeName = getSelectedEmployeeAdminName();
  const employeeDraft = getEmployeeEditorDraft(employeeName);

  clearEmployeeEmailFieldError();

  if (employeeDraft) {
    employeeDraft.email = employeeEmailInput.value;
  }
});

employeeMailTestUserInput?.addEventListener("change", () => {
  if (EMPLOYEE_MAIL_TEST_MODE_ENABLED) {
    renderEmployeeStatusControls();
    return;
  }

  const employeeName = getSelectedEmployeeAdminName();
  const employeeDraft = getEmployeeEditorDraft(employeeName);

  if (employeeDraft) {
    employeeDraft.mailTestUser = Boolean(employeeMailTestUserInput.checked);
  }
});

removeEmployeeSelect?.addEventListener("change", () => {
  if (!employeeStatusSelect) {
    return;
  }

  renderEmployeeList();
  renderEmployeeStatusControls();
  renderEmployeePermissions();
  renderEmployeeStandardShifts();
  renderEmployeeContractPanel();
});

function saveSelectedEmployeeDetails(options = {}) {
  const { showSuccessMessage = true } = options;

  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan medewerkers beheren.", "error");
    return false;
  }

  const employeeName = removeEmployeeSelect.value;

  if (!employeeName || !employeeMeta[employeeName]) {
    showMessage("Kies eerst een medewerker.", "error");
    return false;
  }

  const employeeDraft = getEmployeeEditorDraft(employeeName);
  const normalizedEmail = normalizeEmployeeEmail(employeeEmailInput?.value);
  const normalizedRole = normalizeEmployeeAppRole(employeeRoleSelect?.value);
  const nextStatus = normalizeEmployeeStatus(employeeStatusSelect?.value);
  const shouldEnableMailTestUser = Boolean(employeeDraft?.mailTestUser);
  const normalizedContractHours = normalizeContractHours(employeeDraft?.contractHours);
  const normalizedPermissions = Object.fromEntries(
    getPermissionShiftDescriptors().map((shift) => [
      shift.name,
      employeeDraft?.permissions?.[shift.name] !== false
    ])
  );
  const normalizedStandardShift = typeof employeeDraft?.standardShift === "string" ? employeeDraft.standardShift : "";
  const normalizedBasePatternId = typeof employeeDraft?.basePatternId === "string" ? employeeDraft.basePatternId : getEmployeeBasePatternId(employeeName);
  const normalizedCustomRoster = normalizeEmployeeCustomRosterConfig(employeeDraft?.customRoster, employeeName);
  const currentStatus = getEmployeeStatus(employeeName);
  const duplicateEmployeeName = findEmployeeByEmail(normalizedEmail, employeeName);

  if (!normalizedEmail) {
    setEmployeeEmailFieldError("Vul een e-mailadres in.");
    employeeEmailInput?.reportValidity();
    showMessage("Vul een e-mailadres in.", "error");
    return false;
  }

  if (!isValidEmployeeEmail(normalizedEmail)) {
    setEmployeeEmailFieldError("Vul een geldig e-mailadres in, bijvoorbeeld naam@domein.nl.");
    employeeEmailInput?.reportValidity();
    showMessage("Vul een geldig e-mailadres in, bijvoorbeeld naam@domein.nl.", "error");
    return false;
  }

  if (duplicateEmployeeName) {
    setEmployeeEmailFieldError(`Dit e-mailadres is al gekoppeld aan ${duplicateEmployeeName}.`);
    employeeEmailInput?.reportValidity();
    showMessage(`Dit e-mailadres is al gekoppeld aan ${duplicateEmployeeName}.`, "error");
    return false;
  }

  clearEmployeeEmailFieldError();

  if (currentStatus !== nextStatus) {
    const linkedEntryCount = entries.filter((entry) => entry.name === employeeName).length;
    const linkedRequestCount = timeOffRequests.filter((request) => request.employeeName === employeeName).length +
      swapRequests.filter((request) => request.employeeName === employeeName || request.targetEmployeeName === employeeName).length;
    const linkedWorkLogCount = workLogs.filter((log) => log.employeeName === employeeName).length;
    const impactText = `${employeeName} krijgt status ${getEmployeeStatusLabel(nextStatus)}.

Gevolgen:
- historische gegevens blijven bewaard
- medewerker verdwijnt uit standaard actieve keuzelijsten
- medewerker kan niet meer normaal ingepland worden
- medewerker kan niet meer als medewerker inloggen als status niet actief is

Bewaarde historie:
- ${linkedEntryCount} roosterregels
- ${linkedRequestCount} aanvragen of ruilverzoeken
    - ${linkedWorkLogCount} urenregistraties`;

    if (!confirmAction(`${impactText}\n\nWeet je zeker dat je deze wijziging wilt opslaan?`)) {
      return false;
    }
  }

  Object.keys(employeeMeta).forEach((metaEmployeeName) => {
    if (employeeMeta[metaEmployeeName]?.mailTestUser) {
      employeeMeta[metaEmployeeName] = {
        ...employeeMeta[metaEmployeeName],
        mailTestUser: false
      };
    }
  });

  employeeMeta[employeeName] = {
    ...getEmployeeStatusMetaDefaults(),
    ...employeeMeta[employeeName],
    role: normalizedRole,
    email: normalizedEmail,
    status: nextStatus,
    mailTestUser: shouldEnableMailTestUser,
    contractHours: normalizedContractHours,
    updatedAt: getNowIsoString(),
    updatedByRole: "planner",
    updatedByName: "Planner / Directie"
  };
  employeePermissions[employeeName] = normalizedPermissions;
  employeeStandardShifts[employeeName] = normalizedStandardShift;
  employeeBasePatterns[employeeName] = normalizedBasePatternId;
  employeeCustomRosters[employeeName] = normalizedCustomRoster;

  saveEmployeeMeta();
  saveEmployeePermissions();
  saveEmployeeStandardShifts();
  saveEmployeeBasePatterns();
  saveEmployeeCustomRosters();
  syncEmployeePermissions();
  syncEmployeeStandardShifts();
  syncEmployeeBasePatterns();
  syncEmployeeCustomRosters();
  clearEmployeeEditorDraft(employeeName);

  persistProtectedChange({
    reason: `Medewerker opgeslagen: ${employeeName}`,
    scope: "employee",
    action: "employee-saved",
    message: `Medewerker bijgewerkt voor ${employeeName}.`,
    details: {
      employeeName,
      email: normalizedEmail,
      role: normalizedRole,
      status: nextStatus,
      mailTestUser: shouldEnableMailTestUser,
      contractHours: normalizedContractHours,
      standardShiftName: normalizedStandardShift,
      basePatternId: normalizedBasePatternId
    }
  });

  renderEmployeeSelectors();
  renderDayPlanner();
  render();
  if (showSuccessMessage) {
    showToast("Medewerker opgeslagen");
  }
  return true;
}

function confirmEmployeeEditorNavigation(employeeName) {
  if (!employeeName || !hasUnsavedEmployeeChanges(employeeName)) {
    return "proceed";
  }

  const wantsSave = window.confirm("Je hebt niet-opgeslagen wijzigingen. Eerst opslaan?\n\nKies OK voor Opslaan.\nKies Annuleren voor meer opties.");

  if (wantsSave) {
    return saveSelectedEmployeeDetails({ showSuccessMessage: true }) ? "proceed" : "cancel";
  }

  const wantsDiscard = window.confirm("Je hebt niet-opgeslagen wijzigingen.\n\nKies OK voor Niet opslaan.\nKies Annuleren om terug te gaan.");

  if (wantsDiscard) {
    discardEmployeeEditorChanges(employeeName);
    return "proceed";
  }

  return "cancel";
}

saveEmployeeEmailButton?.addEventListener("click", () => {
  saveSelectedEmployeeDetails({ showSuccessMessage: true });
});

employeeDetailTestMailButton?.addEventListener("click", async () => {
  if (!isPlannerRole()) {
    showMessage("Mail verzenden mislukt", "error");
    return;
  }

  const employeeName = removeEmployeeSelect?.value;

  if (!employeeName || !employeeMeta[employeeName]) {
    showMessage("Kies eerst een medewerker.", "error");
    return;
  }

  const employeeEmail = getEmployeeEmail(employeeName);

  if (!employeeEmail) {
    showMessage("Geen e-mailadres ingesteld", "error");
    setEmployeeEmailFieldError("Geen e-mailadres ingesteld");
    return;
  }

  const originalLabel = employeeDetailTestMailButton.textContent;
  employeeDetailTestMailButton.disabled = true;
  employeeDetailTestMailButton.textContent = "Verzenden...";

  try {
    const result = await sendTestEmailRequest();

    if (!result.ok) {
      employeeMeta[employeeName] = {
        ...employeeMeta[employeeName],
        lastTestMailAt: getNowIsoString(),
        lastTestMailStatus: "failed",
        lastTestMailMessage: result.error || "Testmail verzenden mislukt"
      };
      saveEmployeeMeta();
      renderEmployeeDetailMailStatus(employeeName);
      showMessage(result.error || "Mail verzenden mislukt", "error");
      return;
    }

    employeeMeta[employeeName] = {
      ...employeeMeta[employeeName],
      lastTestMailAt: getNowIsoString(),
      lastTestMailStatus: "sent",
      lastTestMailMessage: `Testmodus: mail gaat nu alleen naar ${FIXED_TEST_MAIL_RECIPIENT}`
    };
    saveEmployeeMeta();
    renderEmployeeDetailMailStatus(employeeName);
    showToast("Testmail verzonden");
    showMessage(`Testmodus: mail gaat nu alleen naar ${FIXED_TEST_MAIL_RECIPIENT}`, "success");
  } catch (error) {
    employeeMeta[employeeName] = {
      ...employeeMeta[employeeName],
      lastTestMailAt: getNowIsoString(),
      lastTestMailStatus: "failed",
      lastTestMailMessage: error instanceof Error && error.message ? error.message : "Mail verzenden mislukt"
    };
    saveEmployeeMeta();
    renderEmployeeDetailMailStatus(employeeName);
    showMessage(
      error instanceof Error && error.message ? error.message : "Mail verzenden mislukt",
      "error"
    );
  } finally {
    employeeDetailTestMailButton.disabled = false;
    employeeDetailTestMailButton.textContent = originalLabel;
  }
});

createRestorePointButton?.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan herstelpunten maken.", "error");
    return;
  }

  createBackupSnapshot("Handmatig herstelpunt", {
    type: "manual"
  });
  recordAuditEvent("backup", "backup-created", "Handmatig herstelpunt opgeslagen.", {
    type: "manual"
  });
  renderBackupRestore();
  showMessage("Herstelpunt opgeslagen.", "success");
});

restoreBackupButton?.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan herstelpunten terugzetten.", "error");
    return;
  }

  const backupId = backupRestoreSelect?.value || "";

  if (!backupId) {
    showMessage("Kies eerst een herstelpunt.", "error");
    return;
  }

  const backup = backupHistory.find((item) => item.id === backupId);

  if (!backup) {
    showMessage("Het gekozen herstelpunt is niet gevonden.", "error");
    return;
  }

  if (!confirmAction(`Weet je zeker dat je herstelpunt "${backup.reason}" van ${formatDateTime(backup.createdAt)} wilt terugzetten? De huidige gegevens worden overschreven, maar blijven eerst als nieuw herstelpunt bewaard.`)) {
    return;
  }

  createBackupSnapshot("Automatisch herstelpunt voor terugzetten", {
    type: "pre-restore",
    restoresBackupId: backupId
  });

  if (!restoreBackupById(backupId)) {
    return;
  }

  render();
  showMessage("Herstelpunt teruggezet.", "success");
});

saveMailSettingsButton?.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan e-mailinstellingen wijzigen.", "error");
    return;
  }

  const senderName = normalizeMailSenderName(mailSenderNameInput?.value || "");
  const senderEmail = normalizeEmployeeEmail(mailSenderEmailInput?.value || "");

  if (!senderName || !senderEmail) {
    showMessage("Vul zowel afzendernaam als afzender e-mailadres in.", "error");
    renderMailSettings();
    return;
  }

  mailSettings.senderName = senderName;
  mailSettings.senderEmail = senderEmail;
  mailSettings.testRecipientEmail = FIXED_TEST_MAIL_RECIPIENT;
  mailSettings.updatedAt = getNowIsoString();
  mailSettings.updatedByRole = "planner";
  mailSettings.updatedByName = "Planner / Directie";
  saveMailSettings();
  persistProtectedChange({
    reason: "E-mailinstellingen gewijzigd",
    scope: "settings",
    action: "mail-settings-updated",
    message: "E-mailinstellingen bijgewerkt.",
    details: {
      senderName,
      senderEmail,
      testRecipientEmail: FIXED_TEST_MAIL_RECIPIENT
    }
  });
  renderMailSettings();
  showMessage("E-mailinstellingen opgeslagen.", "success");
});

function getConfiguredTestMailRecipient() {
  return normalizeEmployeeEmail(FIXED_TEST_MAIL_RECIPIENT);
}

function setTestMailButtonsDisabled(isDisabled) {
  if (testMailButton) {
    testMailButton.disabled = isDisabled;
  }

  if (dashboardTestMailButton) {
    dashboardTestMailButton.disabled = isDisabled;
  }
}

async function handleTestMailSend() {
  setTestMailButtonsDisabled(true);

  try {
    if (!isPlannerRole()) {
      showMessage("Mail verzenden mislukt", "error");
      return;
    }

    if (mailSettings.testRecipientEmail !== FIXED_TEST_MAIL_RECIPIENT) {
      mailSettings.testRecipientEmail = FIXED_TEST_MAIL_RECIPIENT;
      saveMailSettings();
    }

    const result = await sendTestEmailRequest();

    if (!result.ok) {
      showMessage(getTestMailErrorMessage(result.error), "error");
      return;
    }

    showMessage(result.message || "Mail verzonden", "success");
  } catch (error) {
    console.error("[test-mail] handler:exception", error);
    showMessage(
      getTestMailErrorMessage(error instanceof Error ? error.message : "onbekende fout"),
      "error"
    );
  } finally {
    setTestMailButtonsDisabled(false);
  }
}

testMailButton?.addEventListener("click", handleTestMailSend);
dashboardTestMailButton?.addEventListener("click", handleTestMailSend);

if (testMailButton) {
  testMailButton.dataset.mailHandlerBound = "true";
}

if (dashboardTestMailButton) {
  dashboardTestMailButton.dataset.mailHandlerBound = "true";
}

printButton.addEventListener("click", () => {
  showMessage("Printvenster geopend.", "success");
  window.print();
});

exportButton.addEventListener("click", () => {
  exportFilteredEntriesToCsv();
});

planningOverviewAutoButton?.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan een maand automatisch roosteren.", "error");
    return;
  }

  const selectedMonth = planningOverviewMonthInput?.value || getCurrentMonthValue();
  const openWeeks = getWeeksForMonth(selectedMonth)
    .map((weekValue) => getSchedulePlanningWeekData(weekValue, entries))
    .filter((week) => week.openCount > 0 && week.status.key !== "locked")
    .map((week) => week.weekValue);

  autoPlanWeeksDirectly(openWeeks, {
    summaryLabel: `Maand automatisch geroosterd (${selectedMonth})`
  });
});

planningOverviewRefreshButton?.addEventListener("click", () => {
  render();
  showMessage("Maandoverzicht ververst.", "success");
});

planningOverviewMonthInput?.addEventListener("change", () => {
  renderSchedulePlanningOverview();
});

autoFillButton?.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan automatisch roosteren.", "error");
    return;
  }

  autoFillWeekSchedule();
});

rebalanceHoursButton?.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan uren herverdelen.", "error");
    return;
  }

  rebalanceShopHoursForWeek();
});

monthBalanceButton?.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan de maandbalans herstellen.", "error");
    return;
  }

  rebalanceMonthlyBalanceForWeek();
});

completeReviewButton?.addEventListener("click", () => {
  if (!isPlannerRole()) {
    return;
  }

  const selectedWeek = weekFilterInput.value || weekInput.value || getCurrentWeekValue();

  if (!selectedWeek) {
    showMessage("Kies eerst een week om af te ronden.", "error");
    return;
  }

  if (getWeekReviewStatus(selectedWeek) === "locked") {
    showMessage("Deze week staat al vast.", "success");
    return;
  }

  setWeekReviewStatus(selectedWeek, "locked");
  persistProtectedChange({
    reason: `Week vastgezet: ${selectedWeek}`,
    scope: "review",
    action: "week-locked",
    message: `Week ${selectedWeek} is vastgezet.`,
    details: {
      weekValue: selectedWeek,
      status: "locked"
    }
  });
  render();
  showMessage("Week vastgezet.", "success");
});

weekReviewStatusPanel?.addEventListener("click", (event) => {
  if (!isPlannerRole()) {
    return;
  }

  const button = event.target.closest("[data-week-review-status][data-week-review-value]");

  if (!button) {
    return;
  }

  const weekValue = button.dataset.weekReviewValue || "";
  const nextStatus = button.dataset.weekReviewStatus || "";

  if (!/^\d{4}-W\d{2}$/.test(weekValue) || !["open", "in-review", "locked"].includes(nextStatus)) {
    return;
  }

  if (getWeekReviewStatus(weekValue) === nextStatus) {
    return;
  }

  const currentStatus = getWeekReviewStatus(weekValue);
  let unlockReason = "";

  if (currentStatus === "locked" && nextStatus !== "locked") {
    unlockReason = requestWeekUnlockReason(weekValue) || "";

    if (!unlockReason) {
      return;
    }
  }

  setWeekReviewStatus(weekValue, nextStatus);
  persistProtectedChange({
    reason: currentStatus === "locked" && nextStatus !== "locked"
      ? `Week ontgrendeld: ${weekValue} (${unlockReason})`
      : `Weekstatus gewijzigd: ${weekValue}`,
    scope: "review",
    action: currentStatus === "locked" && nextStatus !== "locked"
      ? "week-unlocked"
      : "week-review-status-updated",
    message: `Week ${weekValue} staat nu op ${getWeekReviewStatusMeta(nextStatus).label.toLowerCase()}.`,
    details: {
      weekValue,
      previousStatus: currentStatus,
      status: nextStatus,
      unlockReason
    }
  });
  render();
  showMessage(
    currentStatus === "locked" && nextStatus !== "locked"
      ? `Week ontgrendeld: ${getWeekReviewStatusMeta(nextStatus).label}.`
      : `Weekstatus opgeslagen: ${getWeekReviewStatusMeta(nextStatus).label}.`,
    "success"
  );
});

applyAutoFillButton?.addEventListener("click", () => {
  if (!autoFillPreviewEntries.length) {
    showMessage("Er is geen voorstel om toe te passen.", "error");
    return;
  }

  const targetWeek = weekInput.value || weekFilterInput.value || "";
  if (!ensureWeekActionAllowed(targetWeek, {
    actionLabel: "een automatisch voorstel toe te passen",
    blockPlannerWhenLocked: true
  })) {
    return;
  }

  setUndoState("Automatisch vullen toepassen");
  const appliedCount = autoFillPreviewEntries.length;
  entries.push(...autoFillPreviewEntries);
  saveEntries();
  setWeekPlanningStatus(targetWeek, "planned");
  persistProtectedChange({
    reason: `Automatisch voorstel toegepast: ${targetWeek}`,
    scope: "roster",
    action: "roster-autofill-applied",
    message: "Automatisch roostervoorstel toegepast.",
    details: {
      weekValue: targetWeek,
      addedCount: appliedCount
    }
  });
  setWeekReviewStatus(targetWeek, "open");
  clearAutoFillPreview();
  render();
  const weekOverview = getSchedulePlanningWeekData(targetWeek, entries);
  showMessage(
    `Rooster ingevuld - ${appliedCount} ingevuld - ${weekOverview.openCount} open`,
    weekOverview.openCount > 0 ? "warning" : "success"
  );
});

cancelAutoFillButton?.addEventListener("click", () => {
  if (!autoFillPreviewEntries.length) {
    showMessage("Er is geen voorstel om te annuleren.", "error");
    return;
  }

  setUndoState("Voorstel annuleren");
  clearAutoFillPreview();
  render();
  showDeletedMessage("Voorstel geannuleerd.");
});

planningOverviewList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-planning-action][data-week-value]");

  if (!button || !isPlannerRole()) {
    return;
  }

  const weekValue = button.dataset.weekValue || "";
  const action = button.dataset.planningAction || "";

  if (!/^\d{4}-W\d{2}$/.test(weekValue)) {
    return;
  }

  if (action === "toggle-details") {
    planningOverviewExpandedWeek = planningOverviewExpandedWeek === weekValue ? "" : weekValue;
    renderSchedulePlanningOverview();
    return;
  }

  if (action === "open-week") {
    openSpecificWeekInRoster(weekValue);
    showMessage(`Week ${formatWeekLabel(weekValue)} geopend.`, "success");
    return;
  }

  if (action === "smart-plan") {
    autoPlanWeeksDirectly([weekValue], {
      summaryLabel: `Week automatisch geroosterd: ${weekValue}`
    });
  }
});

undoButton?.addEventListener("click", () => {
  if (!undoState) {
    return;
  }

  const selectedWeek = weekInput.value || weekFilterInput.value || getCurrentWeekValue();
  if (!ensureWeekActionAllowed(selectedWeek, {
    actionLabel: "de laatste wijziging ongedaan te maken",
    blockPlannerWhenLocked: true
  })) {
    return;
  }

  const snapshot = undoState;
  restoreEntriesState(snapshot.entries, snapshot.previewEntries);
  clearUndoState();
  persistProtectedChange({
    reason: `Laatste roosteractie ongedaan gemaakt`,
    scope: "roster",
    action: "roster-undo",
    message: "Laatste roosteractie ongedaan gemaakt.",
    details: {
      label: snapshot.label
    }
  });
  render();
  showMessage("Ongedaan gemaakt.", "success");
});

showSuitableButton?.addEventListener("click", () => {
  if (!isPlannerRole()) {
    return;
  }

  showSuitableEmployees = !showSuitableEmployees;
  render();
});

focusModeButton?.addEventListener("click", () => {
  if (!isPlannerRole()) {
    return;
  }

  preferences.plannerFocusMode = !Boolean(preferences.plannerFocusMode);
  savePreferences();
  updateFocusModeUI();
  render();
});

controlModeButton?.addEventListener("click", () => {
  if (!isPlannerRole()) {
    return;
  }

  preferences.plannerControlMode = !Boolean(preferences.plannerControlMode);
  savePreferences();
  updateFocusModeUI();
  render();
});

deviationOnlyButton?.addEventListener("click", () => {
  if (!isPlannerRole()) {
    return;
  }

  preferences.plannerDeviationOnly = !Boolean(preferences.plannerDeviationOnly);
  savePreferences();
  updateFocusModeUI();
  render();
});

weekInput.addEventListener("change", () => {
  preferences.lastWeek = weekInput.value || "";
  savePreferences();
  weekFilterInput.value = weekInput.value;
  hoursWeekInput.value = weekInput.value;
  myScheduleWeekInput.value = weekInput.value;
  copyTargetWeekInput.value = weekInput.value;
  copySourceWeekInput.value = getPreviousWeekValue(weekInput.value);
  if (!dayPlannerDateInput.value || getWeekValueFromDate(dayPlannerDateInput.value) !== weekInput.value) {
    dayPlannerDateInput.value = getWeekDates(weekInput.value)[0] || "";
  }
  render();
  hideMessage();
});

weekFilterInput.addEventListener("change", () => {
  preferences.lastWeek = weekFilterInput.value || "";
  savePreferences();
  weekInput.value = weekFilterInput.value;
  hoursWeekInput.value = weekFilterInput.value;
  myScheduleWeekInput.value = weekFilterInput.value;
  if (!dayPlannerDateInput.value || getWeekValueFromDate(dayPlannerDateInput.value) !== weekFilterInput.value) {
    dayPlannerDateInput.value = getWeekDates(weekFilterInput.value)[0] || "";
  }
  render();
});

employeeFilterInput.addEventListener("change", () => {
  render();
});

employeeSearchInput.addEventListener("input", () => {
  render();
});

dayFilterInput.addEventListener("change", () => {
  render();
});

document.getElementById("day").addEventListener("change", () => {
  renderShiftSelectors();
  renderEmployeeSelectors();
});

dayPlannerDateInput.addEventListener("change", () => {
  renderDayPlanner();
});

nameSelect.addEventListener("change", () => {
  preferences.lastEmployee = nameSelect.value || "";
  savePreferences();
});

presetShiftSelect.addEventListener("change", () => {
  if (!presetShiftSelect.value) {
    preferences.lastShift = "";
    savePreferences();
    renderEmployeeSelectors();
    return;
  }

  const selectedShift = getSelectedShift(
    presetShiftSelect.value,
    document.getElementById("startTime").value,
    document.getElementById("endTime").value,
    document.getElementById("day").value
  );
  if (!selectedShift) {
    return;
  }

  document.getElementById("startTime").value = selectedShift.startTime;
  document.getElementById("endTime").value = selectedShift.endTime;
  preferences.lastShift = selectedShift.isShopShift ? "" : selectedShift.id;
  savePreferences();
  renderEmployeeSelectors();
});

document.getElementById("startTime").addEventListener("change", () => {
  renderEmployeeSelectors();
});

document.getElementById("endTime").addEventListener("change", () => {
  renderEmployeeSelectors();
});

planningEmployeeSearchInput?.addEventListener("input", () => {
  renderEmployeeSelectors();
});

portalEmployeeSearchInput?.addEventListener("input", () => {
  renderEmployeeSelectors();
});

hoursEmployeeSearchInput?.addEventListener("input", () => {
  renderEmployeeSelectors();
});

winkelNeededInputs.forEach((input, index) => {
  input.addEventListener("change", () => {
    if (!isPlannerRole()) {
      showMessage("Alleen planner of directie kan de planning instellingen aanpassen.", "error");
      renderPlanningSettings();
      return;
    }

    planningSettings.winkelPerWeekday[String(index + 1)] = Math.max(0, Math.min(8, Number(input.value) || 0));
    savePlanningSettings();
    render();
    showSavedMessage();
  });
});

overrideDateInput.addEventListener("change", () => {
  overrideCountInput.value = overrideDateInput.value ? (planningSettings.overrides[overrideDateInput.value] ?? "") : "";
});

vacationWeekInput?.addEventListener("change", () => {
  if (vacationWeekStatusSelect) {
    vacationWeekStatusSelect.value = vacationWeekInput.value ? getWeekVacationStatus(vacationWeekInput.value) : "normal";
  }
});

saveOverrideButton.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan afwijkende bezetting instellen.", "error");
    return;
  }

  if (!overrideDateInput.value) {
    showMessage("Kies eerst een datum voor de afwijkende bezetting.", "error");
    return;
  }

  planningSettings.overrides[overrideDateInput.value] = Math.max(0, Math.min(8, Number(overrideCountInput.value) || 0));
  savePlanningSettings();
  render();
  showSavedMessage();
});

removeOverrideButton.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan afwijkende bezetting verwijderen.", "error");
    return;
  }

  if (!overrideDateInput.value || !(overrideDateInput.value in planningSettings.overrides)) {
    showMessage("Kies eerst een datum met een opgeslagen afwijking.", "error");
    return;
  }

  delete planningSettings.overrides[overrideDateInput.value];
  savePlanningSettings();
  overrideCountInput.value = "";
  render();
  showDeletedMessage("Afwijking verwijderd.");
});

saveVacationWeekButton?.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan weekstatus instellen.", "error");
    return;
  }

  const vacationWeek = String(vacationWeekInput?.value || "").trim();
  const nextStatus = vacationWeekStatusSelect?.value === "vacation" ? "vacation" : "normal";

  if (!/^\d{4}-W\d{2}$/.test(vacationWeek)) {
    showMessage("Kies eerst een geldige week.", "error");
    return;
  }

  if (!Array.isArray(planningSettings.vacationWeeks)) {
    planningSettings.vacationWeeks = [];
  }

  if (nextStatus === "vacation" && !planningSettings.vacationWeeks.includes(vacationWeek)) {
    planningSettings.vacationWeeks.push(vacationWeek);
    planningSettings.vacationWeeks.sort((a, b) => a.localeCompare(b));
  }

  if (nextStatus === "normal") {
    planningSettings.vacationWeeks = planningSettings.vacationWeeks.filter((weekValue) => weekValue !== vacationWeek);
  }

  savePlanningSettings();
  render();
  showMessage(nextStatus === "vacation" ? "Week ingesteld als vakantieweek." : "Week ingesteld als normale week.", "success");
});

removeVacationWeekButton?.addEventListener("click", () => {
  if (!isPlannerRole()) {
    showMessage("Alleen planner of directie kan weekmarkeringen verwijderen.", "error");
    return;
  }

  const vacationWeek = String(vacationWeekInput?.value || "").trim();

  if (!/^\d{4}-W\d{2}$/.test(vacationWeek) || !Array.isArray(planningSettings.vacationWeeks) || !planningSettings.vacationWeeks.includes(vacationWeek)) {
    showMessage("Kies eerst een opgeslagen vakantieweek.", "error");
    return;
  }

  planningSettings.vacationWeeks = planningSettings.vacationWeeks.filter((weekValue) => weekValue !== vacationWeek);
  savePlanningSettings();
  render();
  showDeletedMessage("Vakantieweek verwijderd.");
});

swapEmployeeSelect.addEventListener("change", () => {
  renderEmployeeSelectors();
  renderSwapEntryOptions();
});

swapDateInput.addEventListener("change", () => {
  renderSwapEntryOptions();
  syncSwapFormStateFromFields();
});

swapEntrySelect.addEventListener("change", () => {
  renderSwapTargetOptions();
  syncSwapFormStateFromFields();
});

swapTargetEmployeeSelect?.addEventListener("change", () => {
  syncSwapFormStateFromFields();
});

freeDayEmployeeSelect?.addEventListener("change", () => {
  syncTimeOffFormStateFromFields("free");
});

freeDayDateInput?.addEventListener("input", () => {
  syncTimeOffFormStateFromFields("free");
});

freeDayReasonInput?.addEventListener("input", () => {
  syncTimeOffFormStateFromFields("free");
});

vacationEmployeeSelect?.addEventListener("change", () => {
  syncTimeOffFormStateFromFields("vacation");
});

vacationStartDateInput?.addEventListener("input", () => {
  syncTimeOffFormStateFromFields("vacation");
});

vacationEndDateInput?.addEventListener("input", () => {
  syncTimeOffFormStateFromFields("vacation");
});

vacationReasonInput?.addEventListener("input", () => {
  syncTimeOffFormStateFromFields("vacation");
});

sickEmployeeSelect?.addEventListener("change", () => {
  syncTimeOffFormStateFromFields("sick");
});

sickDateInput?.addEventListener("input", () => {
  syncTimeOffFormStateFromFields("sick");
});

sickReasonInput?.addEventListener("input", () => {
  syncTimeOffFormStateFromFields("sick");
});

swapSuggestionList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-swap-suggested-employee]");

  if (!button || !swapTargetEmployeeSelect) {
    return;
  }

  const employeeName = button.dataset.swapSuggestedEmployee || "";

  if (!employeeName) {
    return;
  }

  if (!Array.from(swapTargetEmployeeSelect.options).some((option) => option.value === employeeName)) {
    showMessage("Deze collega is nu niet meer beschikbaar voor deze ruil.", "warning");
    renderSwapTargetOptions();
    return;
  }

  swapTargetEmployeeSelect.value = employeeName;
  syncSwapFormStateFromFields();
});

swapEscalateButton?.addEventListener("click", () => {
  submitEscalatedSwapRequest();
});

portalEmployeeSelect.addEventListener("change", () => {
  if (!isPlannerRole()) {
    const ownEmployeeName = getOwnEmployeeNameOrWarn();

    if (!ownEmployeeName) {
      portalEmployeeSelect.value = "";
      renderMySchedule();
      return;
    }

    if (portalEmployeeSelect.value && portalEmployeeSelect.value !== ownEmployeeName) {
      portalEmployeeSelect.value = ownEmployeeName;
      showMessage("Je kunt alleen je eigen rooster bekijken.", "error");
    }
  }

  preferences.lastPortalEmployee = portalEmployeeSelect.value || "";
  savePreferences();
  if (portalEmployeeSelect.value) {
    getAllTimeOffEmployeeSelects().forEach((select) => {
      select.value = portalEmployeeSelect.value;
    });
    swapEmployeeSelect.value = portalEmployeeSelect.value;
    hoursEmployeeSelect.value = portalEmployeeSelect.value;
  }
  renderMySchedule();
  renderMyHours();
  renderSwapEntryOptions();
});

portalPreviousEmployeeButton?.addEventListener("click", () => {
  if (portalEmployeeSearchInput) {
    portalEmployeeSearchInput.value = "";
  }
  renderEmployeeSelectors();
  portalEmployeeSelect.value = selectAdjacentEmployee(portalEmployeeSelect, -1);
  portalEmployeeSelect.dispatchEvent(new Event("change"));
});

portalNextEmployeeButton?.addEventListener("click", () => {
  if (portalEmployeeSearchInput) {
    portalEmployeeSearchInput.value = "";
  }
  renderEmployeeSelectors();
  portalEmployeeSelect.value = selectAdjacentEmployee(portalEmployeeSelect, 1);
  portalEmployeeSelect.dispatchEvent(new Event("change"));
});

myScheduleWeekInput.addEventListener("change", () => {
  preferences.lastPortalWeek = myScheduleWeekInput.value || "";
  savePreferences();
  renderMySchedule();
});

hoursEmployeeSelect.addEventListener("change", () => {
  if (!isPlannerRole()) {
    const ownEmployeeName = getOwnEmployeeNameOrWarn();

    if (!ownEmployeeName) {
      hoursEmployeeSelect.value = "";
      renderMyHours();
      return;
    }

    if (hoursEmployeeSelect.value && hoursEmployeeSelect.value !== ownEmployeeName) {
      hoursEmployeeSelect.value = ownEmployeeName;
      showMessage("Je kunt alleen je eigen uren bekijken.", "error");
    }
  }

  preferences.lastHoursEmployee = hoursEmployeeSelect.value || "";
  savePreferences();
  renderMyHours();
});

hoursPreviousEmployeeButton?.addEventListener("click", () => {
  if (hoursEmployeeSearchInput) {
    hoursEmployeeSearchInput.value = "";
  }
  renderEmployeeSelectors();
  hoursEmployeeSelect.value = selectAdjacentEmployee(hoursEmployeeSelect, -1);
  hoursEmployeeSelect.dispatchEvent(new Event("change"));
});

hoursNextEmployeeButton?.addEventListener("click", () => {
  if (hoursEmployeeSearchInput) {
    hoursEmployeeSearchInput.value = "";
  }
  renderEmployeeSelectors();
  hoursEmployeeSelect.value = selectAdjacentEmployee(hoursEmployeeSelect, 1);
  hoursEmployeeSelect.dispatchEvent(new Event("change"));
});

hoursWeekInput.addEventListener("change", () => {
  preferences.lastHoursWeek = hoursWeekInput.value || "";
  if (hoursWeekInput.value) {
    moveHoursDateToWeek(hoursWeekInput.value);
  }
  savePreferences();
  renderMyHours();
});

hoursDateInput?.addEventListener("change", () => {
  const rawSelectedDate = hoursDateInput.value || getTodayLocalDateValue();
  const selectedDate = clampHoursDateValue(rawSelectedDate);
  const wasFutureDate = rawSelectedDate !== selectedDate;
  const derivedWeek = getWeekValueFromDate(selectedDate) || getCurrentWeekValue();
  hoursDateInput.value = selectedDate;
  preferences.lastHoursDate = selectedDate;
  preferences.lastHoursWeek = derivedWeek;
  hoursWeekInput.value = derivedWeek;
  if (!isPlannerRole()) {
    activeMyHoursSection = selectedDate === getTodayLocalDateValue() ? "today" : "fill";
    activeMyHoursEntryMode = "planned";
  }
  savePreferences();
  renderMyHours();

  if (wasFutureDate) {
    showMessage("Toekomstige datums kun je nog niet kiezen voor urenregistratie.", "warning");
  }
});

approvalWeekInput?.addEventListener("change", () => {
  if (hoursExportWeekInput) {
    hoursExportWeekInput.value = approvalWeekInput.value || getCurrentWeekValue();
  }
  renderHoursExportControls();
  renderHoursApproval();
});

approvalEmployeeSelect?.addEventListener("change", () => {
  renderHoursApproval();
});

hoursExportPeriodSelect?.addEventListener("change", () => {
  renderHoursExportControls();
});

hoursExportWeekInput?.addEventListener("change", () => {
  renderHoursExportControls();
});

hoursExportMonthInput?.addEventListener("change", () => {
  renderHoursExportControls();
});

mySchedulePreviousWeekButton?.addEventListener("click", () => {
  myScheduleWeekInput.value = getPreviousWeekValue(myScheduleWeekInput.value || getCurrentWeekValue());
  preferences.lastPortalWeek = myScheduleWeekInput.value || "";
  savePreferences();
  renderMySchedule();
});

myScheduleCurrentWeekButton?.addEventListener("click", () => {
  myScheduleWeekInput.value = getCurrentWeekValue();
  preferences.lastPortalWeek = myScheduleWeekInput.value || "";
  savePreferences();
  renderMySchedule();
});

myScheduleNextWeekButton?.addEventListener("click", () => {
  myScheduleWeekInput.value = getNextWeekValue(myScheduleWeekInput.value || getCurrentWeekValue());
  preferences.lastPortalWeek = myScheduleWeekInput.value || "";
  savePreferences();
  renderMySchedule();
});

hoursPreviousWeekButton?.addEventListener("click", () => {
  hoursWeekInput.value = getPreviousWeekValue(hoursWeekInput.value || getCurrentWeekValue());
  preferences.lastHoursWeek = hoursWeekInput.value || "";
  moveHoursDateToWeek(hoursWeekInput.value);
  savePreferences();
  renderMyHours();
});

hoursCurrentWeekButton?.addEventListener("click", () => {
  hoursWeekInput.value = getCurrentWeekValue();
  preferences.lastHoursWeek = hoursWeekInput.value || "";
  moveHoursDateToWeek(hoursWeekInput.value);
  savePreferences();
  renderMyHours();
});

hoursNextWeekButton?.addEventListener("click", () => {
  hoursWeekInput.value = getNextWeekValue(hoursWeekInput.value || getCurrentWeekValue());
  preferences.lastHoursWeek = hoursWeekInput.value || "";
  moveHoursDateToWeek(hoursWeekInput.value);
  savePreferences();
  renderMyHours();
});

submitWeekHoursButton?.addEventListener("click", () => {
  const employeeName = isPlannerRole() ? hoursEmployeeSelect.value : getRoleScopedEmployeeName();
  const selectedWeek = hoursWeekInput.value || getWeekValueFromDate(getSelectedHoursDate()) || getCurrentWeekValue();
  submitWorkLogsForWeek(selectedWeek, employeeName);
});

hoursExportButton?.addEventListener("click", () => {
  exportHoursForAdministration();
});

roleSelect.addEventListener("change", () => {
  activeRole = roleSelect.value;
  preferences.lastRole = activeRole;
  preferences.hasUserSession = true;
  savePreferences();

  if (!isPlannerRole()) {
    if (!getEmployeeIdentity()) {
      const preferredEmployee = getPreferredEmployeeIdentityCandidate();

      if (preferredEmployee) {
        preferences.employeeIdentity = preferredEmployee;
        savePreferences();
      }
    }

    reloadForLoggedInUser({ resetToDefaultTab: true, resetWeekToCurrent: true });
  } else {
    reloadForLoggedInUser({ resetToDefaultTab: true, resetWeekToCurrent: true });
  }
});

currentEmployeeSelect.addEventListener("change", () => {
  if (!isPlannerRole() && currentEmployeeSelect.value && !getEmployeeIdentity()) {
    preferences.employeeIdentity = currentEmployeeSelect.value;
    preferences.hasUserSession = true;
    savePreferences();
  }

  if (!isPlannerRole() && getEmployeeIdentity()) {
    currentEmployeeSelect.value = getEmployeeIdentity();
  }

  if (!isPlannerRole() && currentEmployeeSelect.value) {
    portalEmployeeSelect.value = currentEmployeeSelect.value;
    hoursEmployeeSelect.value = currentEmployeeSelect.value;
    getAllTimeOffEmployeeSelects().forEach((select) => {
      select.value = currentEmployeeSelect.value;
    });
    swapEmployeeSelect.value = currentEmployeeSelect.value;
  }

  reloadForLoggedInUser();
});

switchUserButton?.addEventListener("click", () => {
  openLoginOverlay();
});

resetTestDataButton?.addEventListener("click", () => {
  resetTestPlanningData();
});

loginRoleSelect?.addEventListener("change", () => {
  updateLoginRoleState();
});

loginTestModeCheckbox?.addEventListener("change", () => {
  populateLoginEmployeeSelect();
});

loginConfirmButton?.addEventListener("click", () => {
  applyLoggedInUserSelection({ showStartupMessage: true });
});

navTabs.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveTab(button.dataset.tab);
  });
});

quickLinks.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveTab(button.dataset.goTab);
  });
});

requestTypeFreeButton?.addEventListener("click", () => {
  activateRequestType("vrije-dag");
});

requestTypeVacationButton?.addEventListener("click", () => {
  activateRequestType("vakantie");
});

requestTypeSickButton?.addEventListener("click", () => {
  activateRequestType("ziekmelding");
});

requestTypeSwapButton?.addEventListener("click", () => {
  activateRequestType("ruilen");
});

requestStatusFilter?.addEventListener("change", () => {
  renderRequestsOpenSummary();
  renderTimeOffRequests();
  renderSwapRequests();
});

mobileNavButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveTab(button.dataset.goTab);
  });
});

window.addEventListener("beforeunload", (event) => {
  if (activeTab !== "employees") {
    return;
  }

  const employeeName = getSelectedEmployeeAdminName();

  if (!hasUnsavedEmployeeChanges(employeeName)) {
    return;
  }

  event.preventDefault();
  event.returnValue = "";
});

previousWeekButton.addEventListener("click", () => {
  const previousWeek = getPreviousWeekValue(weekFilterInput.value || getCurrentWeekValue());
  weekFilterInput.value = previousWeek;
  weekInput.value = previousWeek;
  hoursWeekInput.value = previousWeek;
  if (!isPlannerRole()) {
    activeEmployeeWeekView = "week";
  }
  render();
});

todayWeekButton.addEventListener("click", () => {
  const currentWeek = getCurrentWeekValue();
  weekFilterInput.value = currentWeek;
  weekInput.value = currentWeek;
  hoursWeekInput.value = currentWeek;
  render();
});

nextWeekButton.addEventListener("click", () => {
  const nextWeek = getNextWeekValue(weekFilterInput.value || getCurrentWeekValue());
  weekFilterInput.value = nextWeek;
  weekInput.value = nextWeek;
  hoursWeekInput.value = nextWeek;
  if (!isPlannerRole()) {
    activeEmployeeWeekView = "week";
  }
  render();
});

employeeTodayViewButton?.addEventListener("click", () => {
  if (isPlannerRole()) {
    return;
  }

  const currentWeek = getCurrentWeekValue();
  weekFilterInput.value = currentWeek;
  weekInput.value = currentWeek;
  hoursWeekInput.value = currentWeek;
  activeEmployeeWeekView = "today";
  render();
});

employeeWeekViewButton?.addEventListener("click", () => {
  if (isPlannerRole()) {
    return;
  }

  activeEmployeeWeekView = "week";
  render();
});

newEmployeeNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addEmployeeButton.click();
  }
});

clearFiltersButton.addEventListener("click", () => {
  const currentWeek = getCurrentWeekValue();
  weekFilterInput.value = currentWeek;
  weekInput.value = currentWeek;
  employeeFilterInput.value = "";
  employeeSearchInput.value = "";
  dayFilterInput.value = "";
  render();
});

if (typeof mobileMediaQuery.addEventListener === "function") {
  mobileMediaQuery.addEventListener("change", () => {
    render();
  });
} else if (typeof mobileMediaQuery.addListener === "function") {
  mobileMediaQuery.addListener(() => {
    render();
  });
}

window.addEventListener("error", (event) => {
  reportAppError("Er ging onverwacht iets mis in de app.", event.error || event.message, "window-error");
});

window.addEventListener("unhandledrejection", (event) => {
  reportAppError("Er ging onverwacht iets mis tijdens het verwerken van gegevens.", event.reason, "unhandledrejection");
});

syncStartWeekToCurrent();
newShiftColorInput.value = "shift-tone-oven";
updateFormState();
reloadScopedData();
applySavedPreferences();
activeTab = getDefaultTabForCurrentRole();
updateTabVisibility();

if (needsLoginSelection()) {
  render();
  openLoginOverlay();
} else {
  closeLoginOverlay();
  reloadForLoggedInUser({ resetToDefaultTab: true, resetWeekToCurrent: true });
}











