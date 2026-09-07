import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import type { EnquiryRecord } from "./store";

/**
 * Sends one enquiry to the practice inbox. Ported from
 * php/include/mailer.php.
 *
 * The PHP vendored PHPMailer 6.0.7 (2018), which its README flagged as
 * needing a security update before going public. That concern disappears
 * here: Nodemailer is an ordinary dependency and updates with everything else.
 */

let transporter: Transporter | null = null;

interface MailConfig {
  enabled: boolean;
  host: string;
  port: number;
  encryption: string;
  username: string;
  password: string;
  from: string;
  fromName: string;
  to: string;
  toName: string;
  subject: string;
}

/**
 * Read at call time, not at module load, so rotating the SMTP password is a
 * service restart rather than a rebuild and redeploy.
 */
function getConfig(): MailConfig {
  return {
    enabled: process.env.MAIL_ENABLED === "true",
    host: process.env.MAIL_HOST ?? "",
    port: Number(process.env.MAIL_PORT ?? 587),
    encryption: process.env.MAIL_ENCRYPTION ?? "tls",
    username: process.env.MAIL_USERNAME ?? "",
    password: process.env.MAIL_PASSWORD ?? "",
    from: process.env.MAIL_FROM ?? "website@taxsourceindia.com",
    fromName: process.env.MAIL_FROM_NAME ?? "Tax Source India website",
    to: process.env.MAIL_TO ?? "info@taxsourceindia.com",
    toName: process.env.MAIL_TO_NAME ?? "Tax Source India",
    subject: process.env.MAIL_SUBJECT ?? "New enquiry from taxsourceindia.com",
  };
}

function getTransport(cfg: MailConfig): Transporter {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    // 465 is implicit TLS (PHPMailer's ENCRYPTION_SMTPS); anything else must
    // negotiate STARTTLS (ENCRYPTION_STARTTLS) rather than fall back to plain.
    secure: cfg.encryption === "ssl",
    requireTLS: cfg.encryption !== "ssl",
    auth: { user: cfg.username, pass: cfg.password },
    connectionTimeout: 15_000, // PHPMailer $Timeout = 15
    greetingTimeout: 15_000,
    socketTimeout: 15_000,
  });

  return transporter;
}

const escapeHtml = (v: string) =>
  v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

/** nl2br(htmlspecialchars(...)) — escape FIRST, or the <br> gets eaten. */
const escapeWithBreaks = (v: string) =>
  escapeHtml(v).replace(/\r?\n/g, "<br />\n");

/**
 * Returns false on any failure. The caller has already written the enquiry to
 * the CSV, so false means "tell nobody, log it" rather than "lose the lead".
 * This must never throw: a throw inside the Server Action would abort the
 * redirect and turn a successful submission into an error page.
 */
export async function sendEnquiry(data: EnquiryRecord): Promise<boolean> {
  const cfg = getConfig();

  if (!cfg.enabled) {
    console.error(
      "[tax-source-india] mail disabled; enquiry logged to CSV only",
    );
    return false;
  }

  if (cfg.host === "" || cfg.username === "") {
    console.error(
      "[tax-source-india] mail enabled but SMTP host/username missing",
    );
    return false;
  }

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email !== "" ? data.email : "(not given)"],
    ["Topic", data.topic],
    ["Details", data.details !== "" ? data.details : "(none)"],
    ["Sent", data.submitted_at],
    ["From IP", data.ip],
  ];

  let html =
    '<h2 style="font-family:sans-serif">New website enquiry</h2><table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">';
  let text = "New website enquiry\n\n";

  for (const [label, value] of rows) {
    html += `<tr><td style="vertical-align:top;color:#6A7B8A"><strong>${escapeHtml(label)}</strong></td><td style="vertical-align:top">${escapeWithBreaks(value)}</td></tr>`;
    text += `${label}: ${value}\n`;
  }
  html += "</table>";

  try {
    await getTransport(cfg).sendMail({
      // From must be a mailbox on the sending domain — using the visitor's
      // address here fails SPF/DMARC and gets the mail dropped.
      from: { name: cfg.fromName, address: cfg.from },
      to: { name: cfg.toName, address: cfg.to },
      // This is how the practice replies to a lead. Test it explicitly.
      ...(data.email !== ""
        ? { replyTo: { name: data.name, address: data.email } }
        : {}),
      subject: `${cfg.subject} — ${data.topic}`,
      html,
      text,
    });
    return true;
  } catch (error) {
    console.error("[tax-source-india] enquiry mail failed:", error);
    return false;
  }
}
