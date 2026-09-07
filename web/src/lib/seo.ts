import type { Metadata } from "next";
import { site } from "./config";

/**
 * Builds a page's Metadata.
 *
 * This exists because Next REPLACES `openGraph` wholesale when a page sets it,
 * rather than deep-merging with the root layout's. Setting just
 * `{ title, description, url }` per page therefore silently drops og:image,
 * og:type, og:site_name and og:locale — which means no preview image on any
 * shared link, with nothing failing to warn you. Every page goes through here
 * so the full set is always emitted.
 *
 * `path` is root-relative; metadataBase in the layout resolves it absolute.
 * Note '/' keeps its trailing slash while '/privacy' does not — matching what
 * page_url() produced in the PHP.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false } } : {}),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      title,
      description,
      url: path,
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}
