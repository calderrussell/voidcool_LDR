import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  interest?: string;
  message?: string;
};

const toEmail = process.env.CONTACT_TO_EMAIL ?? "calderr@mit.edu";
const fromEmail = process.env.CONTACT_FROM_EMAIL;
const resendApiKey = process.env.RESEND_API_KEY;
const showDebugErrors = process.env.CONTACT_DEBUG_ERRORS === "true";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 2000) : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function readProviderError(response: Response) {
  const fallback = `Resend rejected the email with status ${response.status}.`;

  try {
    const body = (await response.json()) as {
      error?: { message?: string; code?: string };
      message?: string;
      name?: string;
    };
    return body.error?.message ?? body.message ?? body.name ?? fallback;
  } catch {
    try {
      return (await response.text()) || fallback;
    } catch {
      return fallback;
    }
  }
}

function publicError(detail?: string) {
  if (showDebugErrors && detail) {
    return `Email provider error: ${detail}`;
  }

  return "The inquiry could not be sent. Please email calderr@mit.edu directly.";
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const company = clean(body.company);
  const interest = clean(body.interest);
  const message = clean(body.message);

  if (!name || !email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide your name and a valid email address." },
      { status: 400 },
    );
  }

  if (!resendApiKey || !fromEmail) {
    return NextResponse.json(
      {
        error:
          "Email is not configured yet. Please email calderr@mit.edu directly.",
      },
      { status: 500 },
    );
  }

  const text = [
    "New VoidCool website inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    `Interest: ${interest || "Not provided"}`,
    "",
    "Message:",
    message || "Not provided",
  ].join("\n");

  let response: Response;

  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `VoidCool inquiry from ${name}`,
        text,
      }),
    });
  } catch (error) {
    console.error("Contact form email network error", error);
    return NextResponse.json(
      { error: publicError("Network error while contacting Resend.") },
      { status: 502 },
    );
  }

  if (!response.ok) {
    const providerError = await readProviderError(response);
    console.error("Resend rejected contact form email", {
      status: response.status,
      response: providerError,
      fromEmail,
      toEmail,
    });

    return NextResponse.json(
      { error: publicError(providerError) },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
