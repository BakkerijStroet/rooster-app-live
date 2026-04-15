"use strict";

const { sendWithResend } = require("../server/email-service");
const FIXED_TEST_MAIL_RECIPIENT = "jouwmail@voorbeeld.nl";
const TEST_MAIL_SUBJECT = "Test mail Roosterapp";
const TEST_MAIL_MESSAGE = "Dit is een testmail vanuit de Roosterapp";

module.exports = async (req, res) => {
  console.info("[resend] api/send-email invoked", {
    method: req.method,
    hasApiKey: Boolean(process.env.RESEND_API_KEY),
    hasFromEnv: Boolean(process.env.RESEND_FROM_EMAIL)
  });

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

  const isTestMailRequest = payload?.subject === TEST_MAIL_SUBJECT || payload?.testMode === true;
  const effectivePayload = isTestMailRequest
    ? {
        ...payload,
        to: [FIXED_TEST_MAIL_RECIPIENT],
        subject: TEST_MAIL_SUBJECT,
        message: TEST_MAIL_MESSAGE
      }
    : payload;

  let result;

  try {
    result = await sendWithResend({
      ...effectivePayload,
      fallbackFromName: process.env.RESEND_FROM_NAME || "Bakkerij Stroet",
      fallbackFromEmail: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      apiKey: process.env.RESEND_API_KEY
    });
  } catch (error) {
    result = {
      ok: false,
      statusCode: 500,
      error: error instanceof Error && error.message
        ? `Backend route fout: ${error.message}`
        : "Backend route fout."
    };
  }

  res.statusCode = result.statusCode || (result.ok ? 200 : 500);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(
    result.ok
      ? {
          success: true,
          message: "Mail verzonden",
          id: result.id || ""
        }
      : {
          success: false,
          message: result.error || "Verzenden mislukt."
        }
  ));
};
