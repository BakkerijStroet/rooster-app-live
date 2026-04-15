"use strict";

function buildJsonResponse(statusCode, payload = {}) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(payload)
  };
}

function normalizeEmailList(input) {
  const rawList = Array.isArray(input) ? input : [input];
  return [...new Set(
    rawList
      .filter((value) => typeof value === "string")
      .map((value) => value.trim())
      .filter(Boolean)
  )];
}

async function sendWithResend({ to, subject, message, fromName, fromEmail, apiKey }) {
  const recipients = normalizeEmailList(to);

  if (!apiKey) {
    return { ok: false, statusCode: 500, error: "RESEND_API_KEY ontbreekt." };
  }

  if (!recipients.length) {
    return { ok: false, statusCode: 400, error: "Geen ontvangers opgegeven." };
  }

  if (!subject || typeof subject !== "string") {
    return { ok: false, statusCode: 400, error: "Onderwerp ontbreekt." };
  }

  if (!message || typeof message !== "string") {
    return { ok: false, statusCode: 400, error: "Bericht ontbreekt." };
  }

  if (!fromName || !fromEmail) {
    return { ok: false, statusCode: 400, error: "Afzender ontbreekt." };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: `${fromName} <${fromEmail}>`,
        to: recipients,
        subject: subject.trim(),
        text: message.trim()
      })
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        statusCode: response.status,
        error: typeof payload?.message === "string"
          ? payload.message
          : "Resend request mislukt."
      };
    }

    return {
      ok: true,
      statusCode: 200,
      id: typeof payload?.id === "string" ? payload.id : ""
    };
  } catch (error) {
    return {
      ok: false,
      statusCode: 502,
      error: error instanceof Error && error.message
        ? `Resend request mislukt: ${error.message}`
        : "Resend request mislukt."
    };
  }
}

module.exports = {
  buildJsonResponse,
  sendWithResend
};
