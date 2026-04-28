import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.CONTACT_FROM ?? "Vallesi Capital <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO ?? "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, email, message, website } = req.body ?? {};

  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (!TO) {
    return res.status(500).json({ error: "Server not configured" });
  }

  const fullName = `${firstName} ${lastName}`.trim();
  const safeMessage = String(message).slice(0, 5000);

  try {
    const result = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New contact form submission from ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${email}\n\nMessage:\n${safeMessage}`,
      html: `
        <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px;">
          <h2 style="margin: 0 0 16px;">New contact form submission</h2>
          <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(fullName)}</p>
          <p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p style="margin: 16px 0 8px;"><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; margin: 0; padding: 12px; background: #f5f1ea; border-left: 3px solid #8b6f47;">${escapeHtml(safeMessage)}</p>
        </div>
      `,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return res.status(502).json({ error: "Email service error" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({ error: "Failed to send" });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
