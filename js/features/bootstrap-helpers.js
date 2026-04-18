(function attachBootstrapHelpersFeature(globalScope) {
  function isPlannerRole(activeRole) {
    return activeRole === "planner";
  }

  function hasRememberedUserSession(preferences) {
    return Boolean(preferences?.hasUserSession);
  }

  function getEmployeeIdentity(preferences, employees, isEmployeeActive) {
    return preferences?.employeeIdentity &&
      employees.includes(preferences.employeeIdentity) &&
      isEmployeeActive(preferences.employeeIdentity)
      ? preferences.employeeIdentity
      : "";
  }

  function needsLoginSelection(hasUserSession, activeRole, employeeIdentity) {
    if (!hasUserSession) {
      return true;
    }

    if (activeRole !== "employee") {
      return false;
    }

    return !employeeIdentity;
  }

  function getRoleScopedEmployeeName(isPlannerRoleValue, employeeIdentity, currentEmployeeName, fallbackName = "") {
    if (isPlannerRoleValue) {
      return fallbackName;
    }

    return employeeIdentity || currentEmployeeName || fallbackName;
  }

  function getPreferredEmployeeIdentityCandidate(candidates, employees) {
    return candidates.find((employeeName) => employeeName && employees.includes(employeeName)) || "";
  }

  globalScope.StroetBootstrapHelpersFeature = Object.freeze({
    isPlannerRole,
    hasRememberedUserSession,
    getEmployeeIdentity,
    needsLoginSelection,
    getRoleScopedEmployeeName,
    getPreferredEmployeeIdentityCandidate
  });
})(window);
