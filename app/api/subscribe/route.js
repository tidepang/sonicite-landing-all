import { NextResponse } from "next/server";
import { buildWelcomeEmail, sendEmail } from "@/lib/resend-email";

function cleanString(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body.", code: "invalid_body" }, { status: 400 });
  }

  const payload = {
    email: cleanString(body.email, 180).toLowerCase(),
    locale: cleanString(body.locale, 8) || "zh",
  };

  if (!isValidEmail(payload.email)) {
    return NextResponse.json({ error: "Invalid email.", code: "invalid_email" }, { status: 400 });
  }

  try {
    const email = buildWelcomeEmail(payload);

    await sendEmail({
      to: payload.email,
      subject: email.subject,
      template: email.template,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Subscribe email failed:", error);
    return NextResponse.json({ error: "Subscribe email failed.", code: "email_failed" }, { status: 502 });
  }
}
