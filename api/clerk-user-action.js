"use strict";

function parseRequestBody(req) {
  const body = req.body || {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}

function getClerkErrorMessage(payload) {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message.trim();
  }

  if (Array.isArray(payload.errors) && payload.errors.length) {
    const firstError = payload.errors[0];
    if (typeof firstError?.long_message === "string" && firstError.long_message.trim()) {
      return firstError.long_message.trim();
    }
    if (typeof firstError?.message === "string" && firstError.message.trim()) {
      return firstError.message.trim();
    }
  }

  return "";
}

async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(JSON.stringify({ success: false, message: "Method not allowed" }));
    return;
  }

  const secretKey = (process.env.CLERK_SECRET_KEY || "").trim();
  if (!secretKey) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(JSON.stringify({ success: false, message: "CLERK_SECRET_KEY ontbreekt." }));
    return;
  }

  const payload = parseRequestBody(req);
  const action = typeof payload?.action === "string" ? payload.action.trim() : "";

  if (action !== "invite") {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(JSON.stringify({ success: false, message: "Onbekende Clerk-actie." }));
    return;
  }

  const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
  const employeeName = typeof payload?.employeeName === "string" ? payload.employeeName.trim() : "";
  const role = payload?.role === "planner" ? "planner" : "employee";

  if (!email) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(JSON.stringify({ success: false, message: "Geen e-mailadres opgegeven." }));
    return;
  }

  try {
    const clerkResponse = await fetch("https://api.clerk.com/v1/invitations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email_address: email,
        notify: true,
        public_metadata: {
          employeeName,
          appRole: role
        }
      })
    });

    const clerkPayload = await clerkResponse.json().catch(() => ({}));
    const clerkMessage = getClerkErrorMessage(clerkPayload);

    if (!clerkResponse.ok) {
      res.statusCode = clerkResponse.status;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");
      res.end(JSON.stringify({
        success: false,
        message: clerkMessage || "Clerk-uitnodiging mislukt."
      }));
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(JSON.stringify({
      success: true,
      message: `Uitnodiging verzonden naar ${email}.`
    }));
  } catch (error) {
    console.error("[clerk] invite failed", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(JSON.stringify({
      success: false,
      message: error instanceof Error && error.message
        ? `Clerk-uitnodiging mislukt: ${error.message}`
        : "Clerk-uitnodiging mislukt."
    }));
  }
}

module.exports = handler;
