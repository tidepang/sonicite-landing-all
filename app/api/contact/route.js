import { NextResponse } from "next/server";
import { hasSupabaseAdminConfig, supabaseAdminFetch } from "@/lib/supabase-admin";

const formspreeEndpoint = "https://formspree.io/f/mgvglrnq";

class ContactSubmissionError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "ContactSubmissionError";
    this.code = code;
  }
}

function cleanString(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

async function saveToSupabase(payload) {
  if (!hasSupabaseAdminConfig()) {
    throw new ContactSubmissionError("missing_supabase_config", "Missing Supabase configuration for contact submissions.");
  }

  await supabaseAdminFetch("sonicite_contact_messages", {
    method: "POST",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      role: payload.role,
      message: payload.message,
      locale: payload.locale,
      source: "website",
    }),
  });
}

async function sendToFormspree(payload) {
  const response = await fetch(formspreeEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      role: payload.role,
      message: payload.message,
      locale: payload.locale,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Formspree request failed (${response.status}): ${text.slice(0, 240)}`);
  }
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body.", code: "invalid_body" }, { status: 400 });
  }

  const payload = {
    name: cleanString(body.name, 120),
    email: cleanString(body.email, 180).toLowerCase(),
    role: cleanString(body.role, 80),
    message: cleanString(body.message, 4000),
    locale: cleanString(body.locale, 8) || "zh",
  };

  if (!payload.name || !payload.email || !payload.message || !payload.email.includes("@")) {
    return NextResponse.json({ error: "Missing required contact fields.", code: "invalid_fields" }, { status: 400 });
  }

  try {
    await saveToSupabase(payload);
    sendToFormspree(payload).catch((error) => {
      console.warn("Contact Formspree notification failed after database save:", error);
    });

    return NextResponse.json({ ok: true, source: "database" });
  } catch (error) {
    console.error("Contact submission failed:", error);

    const message = error instanceof Error ? error.message : String(error);
    const code =
      error instanceof ContactSubmissionError
        ? error.code
        : message.includes("sonicite_contact_messages") &&
            (message.includes("Could not find the table") || message.includes("schema cache") || message.includes("relation"))
          ? "missing_contact_table"
          : "database_write_failed";

    return NextResponse.json({ error: "Contact submission failed.", code }, { status: 502 });
  }
}
