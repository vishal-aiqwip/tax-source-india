import type { NextConfig } from "next";

/**
 * Carries the parts of php/.htaccess that belong to the application.
 *
 * What is NOT here, and must live in the reverse proxy instead:
 *   http -> https 301   Next cannot reliably see the scheme behind a proxy.
 *   www  -> bare  301   Same, plus it is part of the same cert/vhost concern.
 * Both are a hard requirement for SEO parity: without them we recreate the
 * duplicate-indexing problem .htaccess lines 5-16 were written to fix.
 */
const nextConfig: NextConfig = {
  reactCompiler: true,

  // nginx does gzip and brotli. Compressing twice burns CPU for nothing.
  compress: false,
  poweredByHeader: false,

  images: {
    // Next 16 defaults this to 4 hours. These eight images are fixed assets
    // that only change when someone re-runs `bun run images`, so caching the
    // optimised variants for 30 days costs nothing and saves the re-encode.
    minimumCacheTTL: 2592000,
  },

  experimental: {
    serverActions: {
      // Security-relevant: Next validates Origin against these on every
      // Server Action. Get this or the proxy's Host header wrong and every
      // enquiry 403s silently. See the note in lib/enquiry/actions.ts.
      allowedOrigins: ["taxsourceindia.com", "www.taxsourceindia.com"],
      bodySizeLimit: "1mb",
    },
  },

  async redirects() {
    return [
      // The only indexed legacy URL besides "/" on the WordPress site this
      // replaces. It must never 404. Kept in code rather than the proxy so it
      // is versioned, reviewed, and travels with the app.
      // Note: `permanent` emits 308, not 301. Google consolidates both
      // identically; use nginx `return 301` if a literal 301 is ever needed.
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/privacy-policy/", destination: "/privacy", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        // Covers the originals served directly rather than through
        // next/image — og-image.jpg, favicon-48.png, apple-touch-icon.png,
        // which metadata references by URL. Replaces the asset() helper's
        // ?v=<mtime> cache-buster with the same 30-day window the .htaccess
        // settled on. next/image's own output is cached per minimumCacheTTL.
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }],
      },
      {
        // Belt and braces alongside the page's own robots metadata.
        source: "/thank-you",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
