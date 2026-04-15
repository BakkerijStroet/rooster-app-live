"use strict";

const { buildJsonResponse, sendWithResend } = require("../../server/email-service");

exports.handler = async (event) => {
  console.info("[resend] netlify send-email invoked", {
    method: event.httpMethod,
    hasApiKey: Boolean(process.env.RESEND_API_KEY),
    hasFromEnv: Boolean(process.env.RESEND_FROM_EMAIL)
  });

  if (event.httpMethod !== "POST") {
    return buildJsonResponse(405, { error: "Method not allowed" });
  }

  let payload = {};
  if (event.body) {
    try {
      payload = JSON.parse(event.body);
    } catch {
      return buildJsonResponse(400, { error: "Ongeldige JSON ontvangen." });
    }
  }
  let result;

  try {
    result = await sendWithResend({
      ...payload,
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
    result.ok ? { id: result.id || "" } : { error: result.error || "Verzenden mislukt." }
  );
};
