import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * The timing trap, ported from php/include/form-handler.php lines 66-72.
 *
 * The PHP carried the render time in a plain hidden input, trivially forgeable
 * — a bot heuristic, not a security control. It worked because commercial
 * form-spam bots do not bother.
 *
 * The problem here is not forgeability, it is caching: a timestamp baked into
 * a statically rendered page freezes at build time and the trap never fires.
 * So the value is minted per request as an HMAC-signed cookie in proxy.ts,
 * which runs even on a cache hit. That is server-authoritative, works with
 * JavaScript off, and is strictly better than the original.
 */

export const TIMING_COOKIE = "tsi_fts";

export function signTimestamp(now: number, secret: string): string {
  const t = String(now);
  const sig = createHmac("sha256", secret).update(t).digest("base64url");
  return `${t}.${sig}`;
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

/**
 * Seconds since the page that produced this cookie was served, or null when
 * that cannot be established.
 *
 * EVERY unknown case returns null and the caller treats null as "not too
 * fast". This fail-open behaviour is deliberate, not an oversight: the PHP
 * failed open by accident ((int)'' === 0 gave a huge elapsed time). Cookies
 * blocked by a privacy extension is a perfectly normal state for a real
 * customer, and failing closed would reject that entire class of visitor.
 * A false positive here is a lost fee-paying client, so this check must never
 * reject more than it is certain about.
 */
export function elapsedSeconds(cookie: string | undefined): number | null {
  const secret = process.env.ENQUIRY_TOKEN_SECRET;
  if (!secret || !cookie) return null;

  const [t, sig] = cookie.split(".");
  if (!t || !sig) return null;

  const expected = createHmac("sha256", secret).update(t).digest("base64url");
  if (!safeEqual(sig, expected)) return null;

  const issued = Number(t);
  if (!Number.isFinite(issued)) return null;

  const age = (Date.now() - issued) / 1000;
  return Number.isFinite(age) ? age : null;
}

export function minSeconds(): number {
  const raw = Number(process.env.ENQUIRY_MIN_SECONDS);
  return Number.isFinite(raw) && raw >= 0 ? raw : 3;
}
