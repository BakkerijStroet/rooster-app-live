"use strict";

const { buildJsonResponse, sendWithResend } = require("../../server/email-service");


exports.handler = async (event) => {
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

  const effectivePayload = payload;


  let result;

  try {
    result = await sendWithResend({
      ...effectivePayload,
      fallbackFromName: process.env.RESEND_FROM_NAME || "Bakkerij Stroet",
      fallbackFromEmail: process.env.RESEND_FROM_EMAIL || "info@bakkerijstroet.nl",
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
