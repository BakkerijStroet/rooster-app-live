"use strict";

const FIXED_TEST_RECIPIENT = "info@bakkerijstroet.nl";
const TEST_MAIL_SUBJECT = "Test mail Roosterapp";
const TEST_MAIL_MESSAGE = "Dit is een testmail vanuit de Roosterapp.";



function normalizeEmailList(input) {
  const rawList = Array.isArray(input) ? input : [input];
  return [...new Set(
    rawList
      .filter((value) => typeof value === "string")
      .map((value) => value.trim())
      .filter(Boolean)
  )];
}

function normalizeSenderConfig({ fromName, fromEmail, fallbackFromName, fallbackFromEmail }) {
  return {
    fromName: typeof fromName === "string" && fromName.trim()
      ? fromName.trim()
      : typeof fallbackFromName === "string" && fallbackFromName.trim()
        ? fallbackFromName.trim()
        : "",
    fromEmail: typeof fromEmail === "string" && fromEmail.trim()
      ? fromEmail.trim()
      : typeof fallbackFromEmail === "string" && fallbackFromEmail.trim()
        ? fallbackFromEmail.trim()
        : ""
  };
}

function normalizeMessageValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function buildMailPlan(payload) {
  const isTestMode = payload?.testMode === true;
  const forceTestRecipient = payload?.forceTestRecipient === true;
  const recipients = isTestMode || forceTestRecipient
    ? [FIXED_TEST_RECIPIENT]
    : normalizeEmailList(payload?.to);
  const rawSubject = normalizeMessageValue(payload?.subject);
  const rawMessage = normalizeMessageValue(payload?.message);
  const subject = isTestMode
    ? (rawSubject || TEST_MAIL_SUBJECT)
    : forceTestRecipient && rawSubject && !rawSubject.startsWith("[TEST]")
      ? `[TEST] ${rawSubject}`
      : rawSubject;
  const message = isTestMode ? (rawMessage || TEST_MAIL_MESSAGE) : rawMessage;

  return {
    recipients,
    subject,
    message,
    isTestMode,
    forceTestRecipient
  };
}

async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(JSON.stringify({ success: false, message: "Method not allowed" }));
    return;
  }

  let payload = req.body || {};
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      payload = {};
    }
  }

  const effectivePayload = payload;


  let result;

  try {
    const mailPlan = buildMailPlan(effectivePayload);
    const senderConfig = normalizeSenderConfig({
      fromName: effectivePayload?.fromName,
      fromEmail: effectivePayload?.fromEmail,
      fallbackFromName: process.env.RESEND_FROM_NAME || "Bakkerij Stroet",
      fallbackFromEmail: process.env.RESEND_FROM_EMAIL || "info@bakkerijstroet.nl"
    });

    if (!process.env.RESEND_API_KEY) {
      result = {
        ok: false,
        statusCode: 500,
        error: "RESEND_API_KEY ontbreekt."
      };
    } else if (!mailPlan.recipients.length) {
      result = {
        ok: false,
        statusCode: 400,
        error: "Geen ontvangers opgegeven."
      };
    } else if (!senderConfig.fromName || !senderConfig.fromEmail) {
      result = {
        ok: false,
        statusCode: 400,
        error: "Serverfunctie mist afzenderinstellingen."
      };
    } else if (!mailPlan.subject || !mailPlan.message) {
      result = {
        ok: false,
        statusCode: 400,
        error: "Onderwerp of bericht ontbreekt."
      };
    } else {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: `${senderConfig.fromName} <${senderConfig.fromEmail}>`,
          to: mailPlan.recipients,
          subject: mailPlan.subject,
          text: mailPlan.message
        })
      });

      const resendPayload = await resendResponse.json().catch(() => ({}));
      const resendErrorText = typeof resendPayload?.message === "string"
        ? resendPayload.message
        : typeof resendPayload?.error === "string"
          ? resendPayload.error
          : "";

      if (!resendResponse.ok) {
        console.error("[resend] api/send-email:response-error", {
          status: resendResponse.status,
          hasFromAddress: Boolean(senderConfig.fromEmail),
          hasToAddress: mailPlan.recipients.length > 0,
          resendErrorText
        });
        result = {
          ok: false,
          statusCode: resendResponse.status,
          error: resendErrorText
            ? `Mailservice gaf fout: ${resendErrorText}`
            : "Mailservice gaf fout."
        };
      } else {
        result = {
          ok: true,
          statusCode: 200,
          id: typeof resendPayload?.id === "string" ? resendPayload.id : "",
          recipients: mailPlan.recipients,
          testMode: mailPlan.isTestMode || mailPlan.forceTestRecipient
        };
      }
    }
  } catch (error) {
    const resendErrorText = error instanceof Error && error.message ? error.message : "";
    console.error("[resend] api/send-email:exception", {
      hasFromAddress: Boolean(process.env.RESEND_FROM_EMAIL),
      hasToAddress: Boolean(effectivePayload?.to),
      resendErrorText
    });
    result = {
      ok: false,
      statusCode: 500,
      error: resendErrorText
        ? `Mailservice gaf fout: ${resendErrorText}`
        : "Mailservice gaf fout."
    };
  }

  res.statusCode = result.statusCode || (result.ok ? 200 : 500);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(
    result.ok
      ? {
          success: true,
          message: result.testMode && Array.isArray(result.recipients) && result.recipients.length
            ? `Mail verzonden naar ${result.recipients.join(", ")} (testmodus)`
            : "Mail verzonden",
          id: result.id || "",
          recipients: result.recipients || []
        }
      : {
          success: false,
          message: result.error || "Verzenden mislukt."
        }
  ));
}

module.exports = handler;
