(function attachMailFeature(global) {
  const employeeUtils = global.StroetEmployeesFeature || {};
  const normalizeEmployeeEmail = employeeUtils.normalizeEmployeeEmail || function fallbackNormalizeEmployeeEmail(value) {
    return typeof value === "string" ? value.trim() : "";
  };

  function normalizeMailSenderName(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function sanitizeRequestMailLog(mailLog = []) {
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

  function getMailSettingsDefaults(testRecipientEmail = "") {
    return {
      senderName: "Bakkerij Stroet",
      senderEmail: "",
      testRecipientEmail,
      updatedAt: "",
      updatedByRole: "",
      updatedByName: ""
    };
  }

  function getDefaultMailDigestState() {
    return {
      plannerSummary: "",
      plannerOpenRequestsEmail: "",
      plannerOverdueRequestsEmail: "",
      plannerPendingHoursEmail: "",
      plannerOverdueHoursEmail: "",
      employeeMissingHours: {},
      employeeMissingHoursEmail: {}
    };
  }

  function hasConfiguredMailSender(mailSettings, options = {}) {
    const normalizeEmail = typeof options.normalizeEmployeeEmail === "function"
      ? options.normalizeEmployeeEmail
      : normalizeEmployeeEmail;
    const normalizeSender = typeof options.normalizeMailSenderName === "function"
      ? options.normalizeMailSenderName
      : normalizeMailSenderName;

    return Boolean(normalizeSender(mailSettings?.senderName)) && Boolean(normalizeEmail(mailSettings?.senderEmail));
  }

  function getAppMailSentMessage(options = {}) {
    const { appMailTestModeEnabled = false, fixedTestRecipient = "" } = options;
    return appMailTestModeEnabled
      ? `Mail verzonden naar ${fixedTestRecipient} (testmodus)`
      : "Mail verzonden";
  }

  function getAppMailQueuedMessage(options = {}) {
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
  }

  function getTestMailErrorMessage(errorText) {
    const normalized = typeof errorText === "string" ? errorText.trim() : "";

    if (!normalized) {
      return "Mail verzenden mislukt.";
    }

    return normalized;
  }

  const EMAIL_TEMPLATES = {
    test: () => ({
      subject: "Test mail Roosterapp",
      message: "Dit is een testmail vanuit de Roosterapp"
    }),
    timeoffSubmitted: () => ({
      subject: "Uw aanvraag is ontvangen",
      message: "Uw aanvraag is ontvangen en staat in behandeling."
    }),
    timeoffApproved: () => ({
      subject: "Uw aanvraag is goedgekeurd",
      message: "Uw aanvraag is goedgekeurd."
    }),
    timeoffRejected: () => ({
      subject: "Uw aanvraag is afgekeurd",
      message: "Uw aanvraag is afgekeurd."
    }),
    swapSubmitted: () => ({
      subject: "Uw ruilverzoek is ontvangen",
      message: "Uw ruilverzoek is ontvangen."
    }),
    swapRequestCreated: () => ({
      subject: "Nieuw ruilverzoek",
      message: "Je hebt een ruilverzoek ontvangen."
    }),
    swapAutoApproved: () => ({
      subject: "Uw ruilverzoek is goedgekeurd",
      message: "Uw ruilverzoek is goedgekeurd."
    }),
    swapApproved: () => ({
      subject: "Uw ruilverzoek is goedgekeurd",
      message: "Uw ruilverzoek is goedgekeurd."
    }),
    swapRejected: () => ({
      subject: "Uw ruilverzoek is afgekeurd",
      message: "Uw ruilverzoek is afgekeurd."
    }),
    swapPlannerHelp: () => ({
      subject: "Directie ingeschakeld",
      message: "Directie is ingeschakeld."
    }),
    swapReminder: () => ({
      subject: "Herinnering ruilverzoek",
      message: "Herinnering: reageer op ruilverzoek."
    }),
    employeeHoursReminder: () => ({
      subject: "Uren vorige week nog open",
      message: "U heeft uw gewerkte uren van vorige week nog niet ingevuld."
    }),
    worklogApproved: () => ({
      subject: "Uw uren zijn goedgekeurd",
      message: "Uw uren zijn goedgekeurd."
    }),
    worklogRejected: () => ({
      subject: "Uw uren zijn afgekeurd",
      message: "Uw uren zijn afgekeurd."
    }),
    worklogRevision: () => ({
      subject: "Uw uren hebben een opmerking",
      message: "Uw uren zijn teruggestuurd met een opmerking."
    }),
    plannerOpenRequestsSummary: () => ({
      subject: "Open aanvragen in de Roosterapp",
      message: "Er staan open aanvragen in de Roosterapp."
    }),
    plannerOpenRequestsReminder: () => ({
      subject: "Open acties vragen aandacht",
      message: "Er staan nog open acties die aandacht nodig hebben."
    }),
    plannerHoursApprovalSummary: () => ({
      subject: "Uren klaar voor goedkeuring",
      message: "Er staan uren klaar om goed te keuren in de Roosterapp."
    }),
    plannerHoursApprovalReminder: () => ({
      subject: "Open acties vragen aandacht",
      message: "Er staan nog open acties die aandacht nodig hebben."
    })
  };

  function buildEmailTemplate(templateKey, context = {}) {
    const templateBuilder = EMAIL_TEMPLATES[templateKey];

    if (typeof templateBuilder !== "function") {
      return {
        subject: "Update",
        message: "Er is een update."
      };
    }

    return templateBuilder(context);
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

  function getSwapMailSubject(type) {
    return buildEmailTemplate(getSwapMailTemplateKey(type)).subject;
  }

  function getTimeOffMailSubject(request, type) {
    return buildEmailTemplate(getTimeOffMailTemplateKey(request, type)).subject;
  }

  function getSwapMailTemplateText(type) {
    return buildEmailTemplate(getSwapMailTemplateKey(type)).message;
  }

  function getTimeOffMailTemplateText(request, type) {
    return buildEmailTemplate(getTimeOffMailTemplateKey(request, type)).message;
  }

  function getMailDeliveryPrefix(type, status, options = {}) {
    const isReminder = type === "reminder";

    if (status === "queued") {
      return getAppMailQueuedMessage({
        ...options,
        isReminder
      });
    }

    if (status === "sent") {
      return isReminder
        ? `Herinnering verzonden naar ${options.fixedTestRecipient || ""} (testmodus)`
        : getAppMailSentMessage(options);
    }

    return isReminder
      ? `Herinnering verzonden naar ${options.fixedTestRecipient || ""} (testmodus)`
      : getAppMailSentMessage(options);
  }

  function getWorkLogMailTemplateKey(type) {
    const templateMap = {
      approved: "worklogApproved",
      rejected: "worklogRejected",
      revision: "worklogRevision"
    };

    return templateMap[type] || "";
  }

  global.StroetMailFeature = Object.freeze({
    buildEmailTemplate,
    getAppMailQueuedMessage,
    getAppMailSentMessage,
    getDefaultMailDigestState,
    getMailDeliveryPrefix,
    getMailSettingsDefaults,
    getSwapMailSubject,
    getSwapMailTemplateKey,
    getSwapMailTemplateText,
    getTestMailErrorMessage,
    getTimeOffMailSubject,
    getTimeOffMailTemplateKey,
    getTimeOffMailTemplateText,
    getWorkLogMailTemplateKey,
    hasConfiguredMailSender,
    normalizeMailSenderName,
    sanitizeRequestMailLog
  });
})(window);
