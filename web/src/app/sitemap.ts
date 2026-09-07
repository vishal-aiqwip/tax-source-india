import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/config";

/**
 * Ported from php/sitemap.php. Same three pages, same priorities and change
 * frequencies. thank-you and 404 are deliberately absent: one is a conversion
 * endpoint, the other is not content.
 *
 * lastModified is a string, not a Date: a Date serialises to a full ISO
 * timestamp, where the PHP emitted date('Y-m-d'). Bump it when copy changes —
 * it replaces filemtime(content.php), which no longer has an equivalent now
 * that the copy lives beside the markup.
 */
const LAST_MODIFIED = "2026-09-07";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_ORIGIN}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_ORIGIN}/privacy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_ORIGIN}/terms`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
