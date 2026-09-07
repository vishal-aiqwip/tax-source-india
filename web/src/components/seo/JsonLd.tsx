import { SITE_ORIGIN, site } from "@/lib/config";

/**
 * AccountingService structured data, emitted on the home page only.
 * Ported from php/include/head.php lines 53-93.
 *
 * JSON.stringify(x, null, 4) matches PHP's JSON_PRETTY_PRINT, and JavaScript
 * escapes neither slashes nor non-ASCII — which is exactly what
 * JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE asked for. So the ₹₹ and
 * the URLs come out byte-identical.
 */
export function JsonLd({ description }: { description: string }) {
  const addr = site.address;

  const schema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: site.name,
    description,
    url: `${SITE_ORIGIN}/`,
    image: `${SITE_ORIGIN}/images/office.webp`,
    logo: `${SITE_ORIGIN}/images/logo.png`,
    telephone: [site.phoneRaw, site.phoneAltRaw],
    email: site.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: addr.street,
      addressLocality: addr.locality,
      addressRegion: addr.region,
      postalCode: addr.postcode,
      addressCountry: addr.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: addr.lat,
      longitude: addr.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "19:00",
      },
    ],
    areaServed: { "@type": "City", name: "Bengaluru" },
    // Only emitted once the figures are confirmed against the real Google
    // Business Profile. Publishing invented review data risks a
    // structured-data manual action — see the note in lib/config.ts.
    ...(site.rating.verified && site.rating.count
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: site.rating.value,
            reviewCount: site.rating.count,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be emitted as a raw script body; the content is a locally built object, never user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 4) }}
    />
  );
}
