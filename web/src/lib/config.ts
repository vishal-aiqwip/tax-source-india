/**
 * Site configuration. Ported from php/include/config.php.
 *
 * Everything here is safe to commit. SMTP credentials and anything
 * environment-specific live in env vars — see .env.example, the successor to
 * include/config.local.php.
 *
 * Dropped from the PHP original, deliberately:
 *   base_url     Next serves from the domain root; the XAMPP subfolder case is gone.
 *   pretty_urls  always on — routing is the filesystem now.
 *   mail         env vars.
 *   enquiry_log  env var (ENQUIRY_LOG_PATH), and the file lives outside the deploy tree.
 */

/**
 * Scheme + host, e.g. "https://taxsourceindia.com".
 *
 * The PHP original derived this from HTTP_HOST on every request, which made
 * the canonical tags Host-header poisonable. A fixed value is both simpler and
 * safer on a single-domain deployment.
 */
export const SITE_ORIGIN = process.env.SITE_URL ?? "https://taxsourceindia.com";

export const site = {
  name: "Tax Source India",
  tagline: "An accountant you can rely on",

  // ---- contact ----
  phone: "+91 81799 64276",
  phoneRaw: "+918179964276",
  phoneAlt: "+91 97427 09374",
  phoneAltRaw: "+919742709374",
  whatsapp: "918179964276",
  email: "info@taxsourceindia.com",

  address: {
    line1: "Shop No. 03, No. 437/38, Ground Floor,",
    line2: "7th Main, Church Street, HAL 3rd Stage,",
    line3: "New Tippasandra, Bengaluru, Karnataka 560075",
    street:
      "Shop No. 03, No. 437/38, Ground Floor, 7th Main, Church Street, HAL 3rd Stage, New Tippasandra",
    locality: "Bengaluru",
    region: "Karnataka",
    postcode: "560075",
    country: "IN",
    lat: 12.9784,
    lng: 77.6408,
  },

  /**
   * The PHP stored this with entities and echoed it unescaped:
   *   8:00 am &ndash; 7:00 pm &nbsp;&middot;&nbsp; Closed Saturday &amp; Sunday
   * Spelled out as escapes so the two non-breaking spaces stay visible to
   * anyone editing this line.
   */
  hoursLabel:
    "Monday to Friday, 8:00 am – 7:00 pm  ·  Closed Saturday & Sunday",

  /**
   * Google requires aggregateRating to reflect genuine reviews that are
   * visible on the page. The 4.8 came from the design's hero badge; the
   * review count below was a placeholder and is NOT verified, so the schema
   * omits the rating entirely until this is switched on deliberately.
   * Set both to the real Google Business Profile figures, then flip the flag.
   * Publishing invented review data risks a structured-data manual action.
   */
  rating: {
    value: "4.8",
    count: null as number | null,
    verified: false,
  },
} as const;

export type Site = typeof site;
