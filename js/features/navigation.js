(() => {
  function getAllowedTabsForRole(role, options = {}) {
    const plannerAllowedTabs = Array.isArray(options.plannerAllowedTabs)
      ? options.plannerAllowedTabs
      : [];
    const employeeAllowedTabs = Array.isArray(options.employeeAllowedTabs)
      ? options.employeeAllowedTabs
      : [];
    const normalizedRole = String(role || "").trim().toLowerCase();

    if (normalizedRole === "planner" || normalizedRole === "directie") {
      return [...plannerAllowedTabs];
    }

    return [...employeeAllowedTabs];
  }

  function getDefaultTabForRole(role) {
    const normalizedRole = String(role || "").trim().toLowerCase();

    if (normalizedRole === "planner" || normalizedRole === "directie") {
      return "dashboard";
    }

    return "week-current";
  }

  function isTabAllowedForRole(role, tabName, options = {}) {
    const allowedTabs = getAllowedTabsForRole(role, options);

    if (allowedTabs === null) {
      return true;
    }

    return allowedTabs.includes(tabName);
  }

  function isWeekTabName(tabName) {
    return tabName === "week-current" || tabName === "week-next";
  }

  function isPlannerWeekTabActive(activeTab, role) {
    const normalizedRole = String(role || "").trim().toLowerCase();
    return (normalizedRole === "planner" || normalizedRole === "directie") && isWeekTabName(activeTab);
  }

  function isFocusModeActiveState(activeTab, role, preferences = {}) {
    return Boolean(preferences.plannerFocusMode) && isPlannerWeekTabActive(activeTab, role);
  }

  function isControlModeActiveState(activeTab, role, preferences = {}) {
    return Boolean(preferences.plannerControlMode) && isPlannerWeekTabActive(activeTab, role);
  }

  function isDeviationOnlyModeActiveState(activeTab, role, preferences = {}) {
    return Boolean(preferences.plannerDeviationOnly) && isPlannerWeekTabActive(activeTab, role);
  }

  window.StroetNavigationFeature = Object.freeze({
    getAllowedTabsForRole,
    getDefaultTabForRole,
    isControlModeActiveState,
    isDeviationOnlyModeActiveState,
    isFocusModeActiveState,
    isPlannerWeekTabActive,
    isTabAllowedForRole,
    isWeekTabName
  });
})();
