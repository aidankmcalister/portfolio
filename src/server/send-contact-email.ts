import { createServerFn } from "@tanstack/react-start"

import { hasResendApiKey, resend } from "@/lib/resend"

type ContactEmailInput = {
  company: string
  email: string
  message: string
  name: string
  subject: string
}

type SendContactEmailResult =
  | {
      messageId: string
      ok: true
    }
  | {
      error: string
      ok: false
    }

const MAX_FIELD_LENGTH = {
  company: 140,
  email: 320,
  message: 5000,
  name: 120,
  subject: 140,
} as const

function normalizeString(value: unknown) {
  if (typeof value !== "string") {
    return ""
  }

  return value.trim()
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function validateInput(input: unknown): ContactEmailInput {
  if (typeof input !== "object" || input === null) {
    throw new Error("Invalid form payload")
  }

  const candidate = input as Record<string, unknown>

  const company = normalizeString(candidate.company).slice(0, MAX_FIELD_LENGTH.company)
  const name = normalizeString(candidate.name).slice(0, MAX_FIELD_LENGTH.name)
  const email = normalizeString(candidate.email).slice(0, MAX_FIELD_LENGTH.email)
  const subject = normalizeString(candidate.subject).slice(0, MAX_FIELD_LENGTH.subject)
  const message = normalizeString(candidate.message).slice(0, MAX_FIELD_LENGTH.message)

  if (!name) {
    throw new Error("Name is required")
  }

  if (!email) {
    throw new Error("Email is required")
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    throw new Error("Please enter a valid email address")
  }

  if (!message) {
    throw new Error("Message is required")
  }

  return {
    company,
    email,
    message,
    name,
    subject,
  }
}

function buildHtmlEmail(input: ContactEmailInput) {
  const safeCompany = escapeHtml(input.company)
  const safeName = escapeHtml(input.name)
  const safeEmail = escapeHtml(input.email)
  const safeSubject = escapeHtml(input.subject)
  const safeMessage = escapeHtml(input.message).replaceAll("\n", "<br />")

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif; line-height: 1.5; color: #111;">
      <h2 style="margin-bottom: 12px;">New portfolio contact form message</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ""}
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <p><strong>Message:</strong><br />${safeMessage}</p>
    </div>
  `
}

const defaultFromEmail = "delivered@resend.dev"
const defaultToEmail = "aidankmcalister@gmail.com"

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator(validateInput)
  .handler(async ({ data }): Promise<SendContactEmailResult> => {
    if (!hasResendApiKey()) {
      return {
        error: "RESEND_API_KEY is not configured on the server.",
        ok: false,
      }
    }

    const from = process.env.RESEND_FROM_EMAIL ?? defaultFromEmail
    const to = process.env.RESEND_TO_EMAIL ?? defaultToEmail

    const { data: emailResponse, error } = await resend.emails.send({
      from,
      to,
      subject: `[Portfolio] ${data.subject || "No subject"}`,
      replyTo: data.email,
      html: buildHtmlEmail(data),
    })

    if (error) {
      return {
        error: error.message,
        ok: false,
      }
    }

    return {
      messageId: emailResponse.id,
      ok: true,
    }
  })
