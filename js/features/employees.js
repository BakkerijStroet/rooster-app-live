(function attachEmployeesFeature(global) {
  function getEmployeeStatusMetaDefaults() {
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
  }

  function normalizeEmployeeAppRole(value) {
    return value === "planner" ? "planner" : "employee";
  }

  function getDefaultEmployeeAppRole(employeeName) {
    return ["Chantal", "Twan"].includes(employeeName) ? "planner" : "employee";
  }

  function getConfiguredEmployeeContractHours() {
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
  }

  function normalizeContractHours(value) {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) && numericValue >= 0 ? Math.round(numericValue * 10) / 10 : 0;
  }

  function normalizeEmployeeStatus(value) {
    return ["active", "inactive", "former"].includes(value) ? value : "active";
  }

  function normalizeEmployeeEmail(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function isValidEmployeeEmail(email) {
    const normalizedEmail = normalizeEmployeeEmail(email);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
  }

  function getEmployeeStatusLabel(status) {
    if (status === "inactive") {
      return "Inactief";
    }

    if (status === "former") {
      return "Uit dienst";
    }

    return "Actief";
  }

  function getEmployeeStatusClass(status) {
    if (status === "inactive") {
      return "is-inactive";
    }

    if (status === "former") {
      return "is-former";
    }

    return "is-active";
  }

  function formatEmployeeStatusImpact(status) {
    if (status === "inactive") {
      return "Inactief: blijft zichtbaar in historische gegevens, maar verdwijnt uit nieuwe planning, standaard keuzelijsten, aanvragen en medewerker-login.";
    }

    if (status === "former") {
      return "Uit dienst: alle oude roosters, uren, aanvragen en goedkeuringen blijven bewaard. De medewerker verdwijnt uit nieuwe planning, standaard keuzelijsten en login.";
    }

    return "Actief: zichtbaar in standaard keuzelijsten en beschikbaar voor planning, aanvragen en medewerker-login.";
  }

  global.StroetEmployeesFeature = Object.freeze({
    formatEmployeeStatusImpact,
    getConfiguredEmployeeContractHours,
    getDefaultEmployeeAppRole,
    getEmployeeStatusClass,
    getEmployeeStatusLabel,
    getEmployeeStatusMetaDefaults,
    isValidEmployeeEmail,
    normalizeContractHours,
    normalizeEmployeeAppRole,
    normalizeEmployeeEmail,
    normalizeEmployeeStatus
  });
})(window);
