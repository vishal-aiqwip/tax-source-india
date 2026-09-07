import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CallBar } from "@/components/sections/CallBar";
import { ChatWidget } from "@/components/sections/ChatWidget";
import { flags } from "@/lib/flags";
import type { PageKey } from "@/lib/urls";

/**
 * The page chrome. Ported from php/include/layout.php.
 *
 * This is a component each page renders rather than a Next layout, because
 * home_anchor() (php/include/functions.php:79) emits a bare `#services` on the
 * home page and `/#services` everywhere else. A root layout cannot know the
 * current route without a client boundary (usePathname); passing `page`
 * explicitly at five call sites reproduces the PHP exactly and costs nothing.
 *
 * <html>, <body> and the skip link live in app/layout.tsx.
 */
export function Shell({
  page,
  children,
}: {
  page: PageKey;
  children: ReactNode;
}) {
  return (
    <>
      <Header page={page} />

      <main id="main">{children}</main>

      <Footer page={page} />

      {/* Fixed-position widgets, siblings of the footer as in the PHP. */}
      {flags.showChat && <ChatWidget />}
      {flags.showCallBar && <CallBar />}
    </>
  );
}
