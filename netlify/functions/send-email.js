"use strict";

const { buildJsonResponse, sendWithResend } = require("../../server/email-service");
const FIXED_TEST_MAIL_RECIPIENT = "info@bakkerijstroet.nl";
const TEST_MAIL_SUBJECT = "Test mail Roosterapp";
const TEST_MAIL_MESSAGE = "Dit is een testmail vanuit de Roosterapp";

exports.handler = async (event) => {
  console.info("[resend] netlify send-email invoked", {
    method: event.httpMethod,
    hasApiKey: Boolean(process.env.RESEND_API_KEY),
    hasFromEnv: Boolean(process.env.RESEND_FROM_EMAIL)
  });

  if (event.httpMethod !== "POST") {
    return buildJsonResponse(405, { success: false, message: "Method not allowed" });
  }

  let payload = {};
  if (event.body) {
    try {
      payload = JSON.parse(event.body);
    } catch {
      return buildJsonResponse(400, { success: false, message: "Ongeldige JSON ontvangen." });
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

  return buildJsonResponse(
    result.statusCode || (result.ok ? 200 : 500),
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
  );
};
