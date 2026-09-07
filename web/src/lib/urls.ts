/**
 * URL helpers. Ported from php/include/functions.php.
 *
 * Gone from the original, with nothing to replace them:
 *   e()      React escapes on output.
 *   asset()  the ?v=<mtime> cache-buster is replaced by a Cache-Control
 *            header on /images/* in next.config.ts.
 */

import { site } from "./config";

/** The four routed pages. `index.php`'s whitelist is now the filesystem. */
export const ROUTES = {
  home: "/",
  privacy: "/privacy",
  terms: "/terms",
  thankYou: "/thank-you",
} as const;

export type PageKey = "home" | "privacy" | "terms" | "thank-you" | "404";

/**
 * Link to a section of the home page. On the home page this stays a bare
 * fragment so smooth scrolling works; elsewhere it becomes a root-relative
 * URL. Mirrors home_anchor() in functions.php.
 */
export function homeAnchor(fragment: string, page: PageKey = "home"): string {
  const frag = `#${fragment.replace(/^#/, "")}`;
  return page === "home" ? frag : `${ROUTES.home}${frag}`;
}

/** `tel:` href for a raw phone number. */
export function telHref(raw: string): string {
  return `tel:${raw.replace(/[^0-9+]/g, "")}`;
}

/**
 * WhatsApp deep link, optionally prefilled with a message.
 *
 * PHP used rawurlencode (RFC 3986). encodeURIComponent leaves !'()* unescaped
 * where rawurlencode escapes them, so they are encoded explicitly to keep the
 * generated URLs byte-identical to the PHP site's.
 */
export function waHref(text = ""): string {
  const url = `https://wa.me/${site.whatsapp}`;
  if (text === "") return url;
  const encoded = encodeURIComponent(text).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
  return `${url}?text=${encoded}`;
}
