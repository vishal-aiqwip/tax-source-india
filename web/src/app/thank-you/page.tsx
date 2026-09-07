import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Shell } from "@/components/Shell";
import { SiteLink } from "@/components/SiteLink";
import { site } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import { ROUTES, telHref, waHref } from "@/lib/urls";

/**
 * Post-submission confirmation. Reached only by the redirect at the end of
 * the enquiry Server Action, and bounces back to the home page after 2
 * seconds.
 *
 * noindex, absent from the sitemap and disallowed in robots.txt: it is a
 * conversion endpoint, not content.
 */

const TITLE = "Thank you — Tax Source India";
const DESCRIPTION =
  "We have your enquiry and will call back the same working day.";

const SENT = {
  title: "Thank you, we have your details",
  body: "We call back the same working day. If it is urgent, ring",
};

// Canonical and og:url point at the HOME url, not this page — matching
// head.php line 8, which excluded thank-you and 404 from self-canonicalising.
export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <Shell page="thank-you">
      {/* A meta refresh rather than a router push, so the bounce still happens
          with JavaScript off. The Metadata API has no http-equiv support, so
          it goes in the tree; React 19 hoists it into <head>. */}
      <meta httpEquiv="refresh" content={`2;url=${ROUTES.home}`} />

      {/* The section centres the block vertically (its main axis is
          horizontal, so that is items-center); the inner column centres its
          own contents horizontally, which in a flex-col is also items-center
          — justify-center there would work the vertical axis instead. */}
      <section className="flex min-h-[70vh] items-center justify-center bg-linear-to-b from-page to-hero-end px-6 py-[clamp(48px,6vw,88px)]">
        <div className="flex max-w-[620px] flex-col items-center gap-5 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-tint text-brand">
            <Icon name="check-circle" className="w-8 h-8" strokeWidth={2.2} />
          </div>

          <h1 className="text-[clamp(30px,3.6vw,42px)] leading-[1.1] font-extrabold">
            {SENT.title}
          </h1>

          <p className="text-[17px] leading-[1.65] text-muted">
            {SENT.body}{" "}
            <a
              href={telHref(site.phoneRaw)}
              className="font-semibold text-brand hover:text-brand-dark"
            >
              {site.phone}
            </a>
            .
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3.5">
            <SiteLink href={ROUTES.home} className="btn-primary">
              Back to the home page
              <Icon
                name="arrow-right"
                className="w-[18px] h-[18px]"
                strokeWidth={2.2}
              />
            </SiteLink>
            <a
              href={waHref()}
              target="_blank"
              rel="noopener"
              className="btn-secondary"
            >
              <Icon name="chat" className="w-[18px] h-[18px]" />
              WhatsApp us
            </a>
          </div>

          {/* The page redirects on its own after 2 seconds. Saying so, and
              giving a link that works immediately, means nobody has to race it
              or wait for it (WCAG 2.2.1). aria-live keeps it out of the way of
              the heading. */}
          <p className="pt-2 text-[14px] text-muted-2" aria-live="polite">
            Taking you back to the home page in a moment…
          </p>
        </div>
      </section>
    </Shell>
  );
}
