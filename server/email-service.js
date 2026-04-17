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

async function sendWithResend({ to, subject, message, fromName, fromEmail, fallbackFromName, fallbackFromEmail, apiKey }) {
  const recipients = normalizeEmailList(to);
  const senderConfig = normalizeSenderConfig({ fromName, fromEmail, fallbackFromName, fallbackFromEmail });

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

  if (!senderConfig.fromName || !senderConfig.fromEmail) {
    return {
      ok: false,
      statusCode: 400,
      error: "Serverfunctie mist afzenderinstellingen."
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: `${senderConfig.fromName} <${senderConfig.fromEmail}>`,
        to: recipients,
        subject: subject.trim(),
        text: message.trim()
      })
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const resendErrorText = typeof payload?.message === "string"
        ? payload.message
        : typeof payload?.error === "string"
          ? payload.error
          : "";
      console.error("[resend] sendWithResend:response-error", {
        status: response.status,
        hasFromAddress: Boolean(senderConfig.fromEmail),
        hasToAddress: recipients.length > 0,
        resendErrorText
      });
      return {
        ok: false,
        statusCode: response.status,
        error: resendErrorText
          ? `Mailservice gaf fout: ${resendErrorText}`
          : "Mailservice gaf fout."
      };
    }

    return {
      ok: true,
      statusCode: 200,
      id: typeof payload?.id === "string" ? payload.id : ""
    };
  } catch (error) {
    const resendErrorText = error instanceof Error && error.message ? error.message : "";
    console.error("[resend] sendWithResend:exception", {
      hasFromAddress: Boolean(senderConfig.fromEmail),
      hasToAddress: recipients.length > 0,
      resendErrorText
    });
    return {
      ok: false,
      statusCode: 502,
      error: resendErrorText
        ? `Mailservice gaf fout: ${resendErrorText}`
        : "Mailservice gaf fout."
    };
  }
}

module.exports = {
  buildJsonResponse,
  sendWithResend
};
