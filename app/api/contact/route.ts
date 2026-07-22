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

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 2000) : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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

  const response = await fetch("https://api.resend.com/emails", {
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

  if (!response.ok) {
    return NextResponse.json(
      { error: "The inquiry could not be sent. Please email calderr@mit.edu directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
