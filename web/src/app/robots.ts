import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/config";

/**
 * Ported from php/robots.php.
 *
 * The PHP disallowed /include/, /pages/, /data/, /reference/ and /PHPMailer/.
 * Those paths do not exist here — Next serves only public/** plus declared
 * routes — so the rules are dropped rather than carried over as noise.
 *
 * Note what is NOT here: the WordPress site this replaces carried
 * `Crawl-Delay: 20`. Google ignores it, but Bing honours it, and 20 seconds
 * between requests throttles crawling to a standstill. Never reintroduce it.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/thank-you"],
    },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
