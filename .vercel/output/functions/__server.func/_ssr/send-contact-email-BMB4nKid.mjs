import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./index.mjs";
import { R as Resend } from "../_libs/resend.mjs";
import "../_chunks/_libs/@tanstack/history.mjs";
import "../_chunks/_libs/@tanstack/router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_chunks/_libs/react.mjs";
import "../_chunks/_libs/@tanstack/react-router.mjs";
import "../_chunks/_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/postal-mime.mjs";
import "../_libs/svix.mjs";
import "../_libs/uuid.mjs";
import "node:crypto";
import "../_libs/standardwebhooks.mjs";
import "../_chunks/_libs/@stablelib/base64.mjs";
import "../_libs/fast-sha256.mjs";
const createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);
function hasResendApiKey() {
  return Boolean(resendApiKey);
}
const MAX_FIELD_LENGTH = {
  company: 140,
  email: 320,
  message: 5e3,
  name: 120,
  subject: 140
};
function normalizeString(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}
function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function validateInput(input) {
  if (typeof input !== "object" || input === null) {
    throw new Error("Invalid form payload");
  }
  const candidate = input;
  const company = normalizeString(candidate.company).slice(0, MAX_FIELD_LENGTH.company);
  const name = normalizeString(candidate.name).slice(0, MAX_FIELD_LENGTH.name);
  const email = normalizeString(candidate.email).slice(0, MAX_FIELD_LENGTH.email);
  const subject = normalizeString(candidate.subject).slice(0, MAX_FIELD_LENGTH.subject);
  const message = normalizeString(candidate.message).slice(0, MAX_FIELD_LENGTH.message);
  if (!name) {
    throw new Error("Name is required");
  }
  if (!email) {
    throw new Error("Email is required");
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    throw new Error("Please enter a valid email address");
  }
  if (!subject) {
    throw new Error("Subject is required");
  }
  if (!message) {
    throw new Error("Message is required");
  }
  return {
    company,
    email,
    message,
    name,
    subject
  };
}
function buildHtmlEmail(input) {
  const safeCompany = escapeHtml(input.company);
  const safeName = escapeHtml(input.name);
  const safeEmail = escapeHtml(input.email);
  const safeSubject = escapeHtml(input.subject);
  const safeMessage = escapeHtml(input.message).replaceAll("\n", "<br />");
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
      <h2 style="margin-bottom: 12px;">New portfolio contact form message</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ""}
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <p><strong>Message:</strong><br />${safeMessage}</p>
    </div>
  `;
}
const defaultFromEmail = "delivered@resend.dev";
const defaultToEmail = "aidankmcalister@gmail.com";
const sendContactEmail_createServerFn_handler = createServerRpc({
  id: "62eb2622088a44fa097a7668c3c97b4726c73607326b8c019a168e04ddc31486",
  name: "sendContactEmail",
  filename: "src/server/send-contact-email.ts"
}, (opts) => sendContactEmail.__executeServer(opts));
const sendContactEmail = createServerFn({
  method: "POST"
}).inputValidator(validateInput).handler(sendContactEmail_createServerFn_handler, async ({
  data
}) => {
  if (!hasResendApiKey()) {
    return {
      error: "RESEND_API_KEY is not configured on the server.",
      ok: false
    };
  }
  const from = process.env.RESEND_FROM_EMAIL ?? defaultFromEmail;
  const to = process.env.RESEND_TO_EMAIL ?? defaultToEmail;
  const {
    data: emailResponse,
    error
  } = await resend.emails.send({
    from,
    to,
    subject: `[Portfolio] ${data.subject}`,
    replyTo: data.email,
    html: buildHtmlEmail(data)
  });
  if (error) {
    return {
      error: error.message,
      ok: false
    };
  }
  return {
    messageId: emailResponse.id,
    ok: true
  };
});
export {
  sendContactEmail_createServerFn_handler
};
