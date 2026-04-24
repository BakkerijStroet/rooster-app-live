(function attachEmployeePanelPrepFeature(globalScope) {
  function createEmployeeEditorDraft(getters, employeeName) {
    return {
      email: getters.getEmployeeEmail(employeeName),
      loginPin: getters.getConfiguredEmployeeLoginPin(employeeName),
      role: getters.getEmployeeAppRole(employeeName),
      status: getters.getEmployeeStatus(employeeName),
      mailTestUser: getters.isEmployeeMailTestEnabled(employeeName),
      permissions: getters.cloneSerializableValue(getters.employeePermissions?.[employeeName] || {}),
      standardShift: typeof getters.employeeStandardShifts?.[employeeName] === "string" ? getters.employeeStandardShifts[employeeName] : "",
      basePatternId: getters.getEmployeeBasePatternId(employeeName),
      customRoster: getters.cloneSerializableValue(getters.getEmployeeCustomRosterConfig(employeeName)),
      contractHours: getters.getEmployeeContractHours(employeeName)
    };
  }

  function getEmployeeDetailMailStatusViewModel({
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
  }

  function getPermissionShiftGroups(getPermissionShiftDescriptors, matchers) {
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
  }

  function getEmployeeContractPanelData({ contractHours, plannedWeekHours, formatHours }) {
    return {
      contractTypeLabel: contractHours > 0 ? `Vast contract ${formatHours(contractHours)}` : "0-uren contract",
      plannedWeekHoursLabel: formatHours(plannedWeekHours)
    };
  }

  function getEmployeeLoginPinStatusViewModel({ configuredLoginPin }) {
    return {
      text: configuredLoginPin
        ? "Eigen pincode ingesteld"
        : "Gebruikt tijdelijke standaardpin"
    };
  }

  globalScope.StroetEmployeePanelPrepFeature = Object.freeze({
    createEmployeeEditorDraft,
    getEmployeeDetailMailStatusViewModel,
    getEmployeeLoginPinStatusViewModel,
    getPermissionShiftGroups,
    getEmployeeContractPanelData
  });
})(window);
