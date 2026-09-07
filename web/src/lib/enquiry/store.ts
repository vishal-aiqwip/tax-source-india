import "server-only";
import { closeSync, fstatSync, mkdirSync, openSync, writeSync } from "node:fs";
import { dirname, join } from "node:path";

/**
 * Append-only lead log. Ported from the $log_enquiry closure in
 * php/include/form-handler.php.
 *
 * ON CONCURRENCY: the PHP needed flock(LOCK_EX) because mod_php serves each
 * request in a separate process. Node does not have that problem — JS is
 * single-threaded and writeSync blocks the event loop, so two concurrent
 * requests to one process cannot interleave their appends. The remaining risk
 * is multiple processes, so this app MUST run as a single instance (systemd,
 * or PM2 fork mode — never cluster). At roughly one enquiry a week that is
 * over-provisioned by four orders of magnitude anyway.
 *
 * ON LOCATION: the file lives outside the deploy tree (see ENQUIRY_LOG_PATH in
 * .env.example). Next serves only public/** plus declared routes, so there is
 * no path-traversal surface and the .htaccess deny rules the PHP needed have
 * no successor — nothing was lost. Keeping it out of the tree still matters:
 * a data/ directory inside the app would be orphaned by any future
 * atomic-release deploy, silently splitting the lead history in two.
 */

const ENQUIRY_HEADER = [
  "submitted_at",
  "name",
  "phone",
  "email",
  "topic",
  "details",
  "ip",
];

const REJECTED_HEADER = [
  "rejected_at",
  "reason",
  "name",
  "phone",
  "email",
  "topic",
  "details",
  "ip",
];

export interface EnquiryRecord {
  submitted_at: string;
  name: string;
  phone: string;
  email: string;
  topic: string;
  details: string;
  ip: string;
}

function logPath(): string {
  return (
    process.env.ENQUIRY_LOG_PATH ?? "/var/lib/taxsourceindia/enquiries.csv"
  );
}

/**
 * Reproduces PHP's fputcsv quoting: a field is quoted when it contains the
 * delimiter, the enclosure, a backslash, a newline, a carriage return, a tab
 * or a space; embedded quotes are doubled. Verified against the one existing
 * row, where the space inside the timestamp is what triggers quoting.
 */
function csvField(value: string): string {
  return /[",\\\n\r\t ]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

const csvRow = (cells: string[]) => `${cells.map(csvField).join(",")}\n`;

/**
 * Header and row go out in a single writeSync, which closes the check-then-act
 * gap the PHP had between testing the file size and writing the header.
 */
function appendCsv(path: string, header: string[], cells: string[]): void {
  mkdirSync(dirname(path), { recursive: true, mode: 0o750 });
  const fd = openSync(path, "a", 0o640);
  try {
    const fresh = fstatSync(fd).size === 0;
    writeSync(fd, (fresh ? csvRow(header) : "") + csvRow(cells));
  } finally {
    closeSync(fd);
  }
}

/**
 * Write one enquiry. Called BEFORE mail is attempted, so an SMTP outage can
 * never lose a lead — the guarantee the PHP made and this must keep.
 *
 * Never throws. On failure the whole record also goes to stderr as one JSON
 * line, so journald still captures the lead when the disk is full or the
 * permissions are wrong. That is one deliberate improvement on the original,
 * closing the last hole in "an outage never loses a lead".
 */
export function appendEnquiry(record: EnquiryRecord): void {
  try {
    appendCsv(logPath(), ENQUIRY_HEADER, [
      record.submitted_at,
      record.name,
      record.phone,
      record.email,
      record.topic,
      record.details,
      record.ip,
    ]);
  } catch (error) {
    console.error("[tax-source-india] cannot write enquiry log:", error);
    console.error(`[tax-source-india] LEAD ${JSON.stringify(record)}`);
  }
}

/**
 * A submission the spam traps rejected, with the reason that fired.
 *
 * These are heuristics and can be wrong, so a rejection is recorded rather
 * than dropped: a false positive would otherwise lose a real enquiry with no
 * way to recover it, and the reason makes a pattern of false positives
 * diagnosable instead of guesswork.
 */
export function appendRejected(record: EnquiryRecord, reason: string): void {
  try {
    const path = join(dirname(logPath()), "rejected.csv");
    appendCsv(path, REJECTED_HEADER, [
      record.submitted_at,
      reason,
      record.name,
      record.phone,
      record.email,
      record.topic,
      record.details,
      record.ip,
    ]);
  } catch (error) {
    console.error("[tax-source-india] cannot write rejected log:", error);
  }
}

/**
 * 'YYYY-MM-DD HH:mm:ss' in Asia/Kolkata.
 *
 * PHP's date() used the server's timezone, which on the Bengaluru host was
 * IST. Pinning it explicitly keeps the CSV readable to the practice wherever
 * the app ends up running. The 'sv-SE' locale is the shortest route to an
 * ISO-shaped string.
 */
export function timestampIST(now = new Date()): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .format(now)
    .replace("T", " ");
}
