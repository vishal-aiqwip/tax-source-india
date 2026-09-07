"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { sendEnquiry } from "./mailer";
import { enquirySchema } from "./schema";
import { elapsedSeconds, minSeconds, TIMING_COOKIE } from "./spam";
import {
  appendEnquiry,
  appendRejected,
  type EnquiryRecord,
  timestampIST,
} from "./store";
import type { EnquiryField, EnquiryState } from "./types";

/**
 * The enquiry pipeline. A transcription of php/include/form-handler.php
 * lines 43-190, in the same order:
 *
 *   trim -> spam traps -> validate -> CSV -> mail -> redirect to /thank-you
 *
 * ON CSRF: the PHP carried a per-session token. There is deliberately none
 * here. Next compares Origin against Host on every Server Action and rejects
 * a mismatch with a 403 before this code runs, and action IDs are
 * non-guessable build hashes. Beyond that the token had no payoff on this
 * endpoint — there is no session and no user-scoped state, so the worst a
 * forged submission achieves is a spam enquiry, which the traps below already
 * handle. It also had a real cost: a stale tab produced "Your session
 * expired" and, in practice, a bounced visitor.
 *
 * What that buys is a caveat: the Origin check is now security-relevant PROXY
 * CONFIGURATION. If nginx forwards the wrong Host, every submission 403s and
 * every lead is lost silently. See serverActions.allowedOrigins in
 * next.config.ts, the proxy_set_header lines in the deploy notes, and the
 * live-domain submission gate in the cutover checklist.
 */
export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const field = (key: string) => String(formData.get(key) ?? "").trim();

  const values = {
    name: field("name"),
    phone: field("phone"),
    email: field("email"),
    topic: field("topic"),
    details: field("details"),
  };

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";

  const record: EnquiryRecord = {
    ...values,
    submitted_at: timestampIST(),
    ip,
  };

  // ---- spam traps, before validation, exactly as the PHP ordered them ----
  // A filled honeypot, or a form submitted implausibly fast, is a bot. Both
  // are answered with the success page so the bot learns nothing.
  const honeypot = field("hp_ref") !== "";

  const cookieStore = await cookies();
  const elapsed = elapsedSeconds(cookieStore.get(TIMING_COOKIE)?.value);
  const tooFast = elapsed !== null && elapsed < minSeconds();

  if (honeypot || tooFast) {
    const reason = honeypot
      ? `honeypot filled (value: ${field("hp_ref").slice(0, 40)})`
      : `submitted after ${elapsed?.toFixed(1)}s, under the ${minSeconds()}s minimum`;

    console.error(`[tax-source-india] enquiry rejected: ${reason}`);
    appendRejected(record, reason);

    redirect("/thank-you");
  }

  // ---- validation ----
  const parsed = enquirySchema.safeParse(values);

  if (!parsed.success) {
    const errors: Partial<Record<EnquiryField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as EnquiryField | undefined;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    // formKey changes on every failure so the form remounts and defaultValue
    // re-applies — see the note in types.ts.
    return { errors, values, formKey: Date.now() };
  }

  // The PARSED output is what gets logged and mailed, never the raw input:
  // the schema silently resets a tampered topic and truncates over-long
  // details, mirroring the PHP mutating $values in place before logging.
  const clean: EnquiryRecord = {
    ...parsed.data,
    submitted_at: record.submitted_at,
    ip: record.ip,
  };

  // Durable first — this is the guarantee: an SMTP outage never loses a lead.
  appendEnquiry(clean);

  // Mail off the response path. Awaiting it would hang the visitor for 15-45s
  // during an SMTP outage; failures are logged inside and never rethrown.
  after(() => sendEnquiry(clean));

  // Post-redirect-get, so a reload cannot resubmit. redirect() works by
  // throwing NEXT_REDIRECT, so it must stay outside any try/catch — swallowing
  // it would turn a successful submission into a 500.
  redirect("/thank-you");
}
