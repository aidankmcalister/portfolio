import type { APIRoute } from "astro";
import { createHash } from "node:crypto";
import { Resend } from "resend";
import { SITE } from "../../data/site";

// The only server route on the site. The contact form posts here, the message goes to
// Aidan through Resend with the visitor's address as reply-to, and the visitor lands
// back on the home page with a status message. No client JavaScript involved.
export const prerender = false;

// Set in Vercel. RESEND_FROM must be on a domain verified in Resend; without it the
// sandbox sender only delivers to the Resend account's own address.
const API_KEY = import.meta.env.RESEND_API_KEY;
const FROM = import.meta.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";
// Only the address matters for sending; the display name is set per message.
const FROM_ADDRESS = FROM.match(/<([^>]+)>/)?.[1] ?? FROM;

const back = (status: "sent" | "send-failed") =>
  new Response(null, { status: 303, headers: { Location: `/#${status}` } });

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const sentAt = () =>
  new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });

// The email Aidan receives: the site's paper and ink colors, the message in a bordered
// box, the sender underneath, and a quiet footer. Inline styles only, for mail clients.
function renderEmail({ name, email, message }: { name: string; email: string; message: string }) {
  // Single quotes: this sits inside style="…" attributes.
  const sans = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`;
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f7f7f6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f6;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;font-family:${sans};color:#3d3d3a;">
  <tr><td style="padding:0 4px 16px;font:italic 500 22px/1.3 Georgia, serif;color:#1b1b1a;">New message from your site</td></tr>
  <tr><td style="background:#ffffff;border:1px solid #e2e2df;border-left:3px solid #e2aa34;border-radius:8px;padding:20px 24px;font-size:16px;line-height:1.6;color:#1b1b1a;white-space:pre-wrap;">${escape(message)}</td></tr>
  <tr><td style="padding:16px 4px 0;font-size:15px;line-height:1.5;">
    <strong style="color:#1b1b1a;font-weight:600;">${escape(name)}</strong><br>
    <a href="mailto:${escape(email)}" style="color:#6b6b66;">${escape(email)}</a>
  </td></tr>
  <tr><td style="padding:28px 4px 0;border-bottom:1px solid #e2e2df;"></td></tr>
  <tr><td style="padding:12px 4px 0;font-size:13px;line-height:1.5;color:#6b6b66;">
    Sent from the contact form on <a href="https://www.aidanmcalister.com" style="color:#6b6b66;">aidanmcalister.com</a>, ${escape(sentAt())}. Reply to this email to answer ${escape(name.split(" ")[0] || name)}.
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

const field = (form: FormData, name: string) => String(form.get(name) ?? "").trim();

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return back("send-failed");
  }

  // Honeypot: people never see this field, so anything in it is a bot. Pretend it worked.
  if (field(form, "company")) return back("sent");

  const name = field(form, "name").slice(0, 200);
  const email = field(form, "email").slice(0, 320);
  const message = field(form, "message").slice(0, 5000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 2) {
    return back("send-failed");
  }
  if (!API_KEY) {
    console.error("contact: RESEND_API_KEY is not set");
    return back("send-failed");
  }

  // A resubmitted form (back button, double click) sends one email, not two.
  const key = createHash("sha256").update(`${email}\n${message}`).digest("hex").slice(0, 32);

  // Mail can't be sent *from* the visitor's address (only verified domains can send,
  // and Gmail would treat it as spoofed). Instead the inbox shows their name, and
  // Reply goes straight to them.
  const safeName = name.replace(/[<>"\\\r\n]/g, "").slice(0, 80);

  const { error } = await new Resend(API_KEY).emails.send(
    {
      from: `"${safeName} via aidanmcalister.com" <${FROM_ADDRESS}>`,
      to: [SITE.email],
      replyTo: `"${safeName}" <${email}>`,
      subject: `Portfolio message from ${safeName}`,
      html: renderEmail({ name, email, message }),
      text: `${message}\n\n${name}\n${email}\n\nSent from the contact form on aidanmcalister.com, ${sentAt()}.`,
    },
    { idempotencyKey: `portfolio-contact/${key}` },
  );

  if (error) {
    console.error("contact: Resend error", error.name, error.message);
    return back("send-failed");
  }
  return back("sent");
};
