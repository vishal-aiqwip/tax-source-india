import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Public_Sans } from "next/font/google";
import { SITE_ORIGIN, site } from "@/lib/config";
import "@/styles/globals.css";

/* Self-hosted, replacing the PHP head's render-blocking Google Fonts <link>
   plus its two preconnects. Same families, same weights, same swap. */
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Shared defaults only. Every page supplies its own title and description, so
   none is set here — that also keeps not-found.tsx, which renders its <title>
   as JSX because the Metadata API is unavailable there, from emitting two. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [{ url: "/images/favicon-48.png", sizes: "48x48" }],
    apple: "/images/apple-touch-icon.png",
  },
};

/* The footer renders the current year. Without this the value would freeze at
   build time and go stale on 1 January; a daily regeneration is cheap for a
   site whose content otherwise never changes at runtime. */
export const revalidate = 86400;

export const viewport: Viewport = {
  themeColor: "#0A2340",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /* data-scroll-behavior="smooth" is required in Next 16: it no longer
       overrides `scroll-behavior: smooth` during navigation on its own, so
       without this every route change would slowly smooth-scroll instead of
       jumping. The CSS rule itself is inherited from the PHP stylesheet. */
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${instrumentSans.variable} ${publicSans.variable}`}
    >
      <body className="bg-page font-body text-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:top-3 focus:left-3 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-navy focus:shadow-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
