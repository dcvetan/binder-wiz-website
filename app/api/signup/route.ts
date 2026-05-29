import { NextResponse } from "next/server";

const resendEndpoint = "https://api.resend.com/emails";
const signupRecipient =
  process.env.SIGNUP_RECIPIENT_EMAIL ?? "binderwizapp@gmail.com";
const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Signup email service is not configured." },
      { status: 500 },
    );
  }

  let email = "";

  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid signup request." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const safeEmail = escapeHtml(email);
  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: signupRecipient,
      reply_to: email,
      subject: "New BinderWiz test signup",
      html: `
        <h1>New BinderWiz test signup</h1>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p>${safeEmail} joined the BinderWiz testing waitlist.</p>
      `,
      text: `${email} joined the BinderWiz testing waitlist.`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Signup email could not be sent." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
