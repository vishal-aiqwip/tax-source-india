import { Icon } from "@/components/Icon";
import { Shell } from "@/components/Shell";
import { SiteLink } from "@/components/SiteLink";
import { SITE_ORIGIN, site } from "@/lib/config";
import { ROUTES, telHref } from "@/lib/urls";

/**
 * 404. Ported from php/pages/404.php.
 *
 * not-found.tsx cannot export `metadata` — the Metadata API is unavailable
 * for this special file — so the head tags are rendered as JSX and React 19
 * hoists them. The root layout deliberately exports no title, so there is
 * exactly one here.
 */

const TITLE = "Page not found — Tax Source India";
const DESCRIPTION = "The page you were looking for is not here.";

export default function NotFound() {
  return (
    <Shell page="404">
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta name="robots" content="noindex" />
      {/* Canonicalises to the home URL, not itself — matching head.php line 8. */}
      <link rel="canonical" href={`${SITE_ORIGIN}/`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:url" content={`${SITE_ORIGIN}/`} />
      <meta
        property="og:image"
        content={`${SITE_ORIGIN}/images/og-image.jpg`}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <section className="bg-linear-to-b from-page to-hero-end px-6 py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto flex max-w-[620px] flex-col items-start gap-5">
          <div className="eyebrow text-brand">Error 404</div>
          <h1 className="text-[clamp(32px,4vw,46px)] leading-[1.08] font-extrabold">
            That page is not here.
          </h1>
          <p className="text-[17px] leading-[1.65] text-muted">
            The link may be out of date, or the address mistyped. Everything we
            do is on the home page, or you can just call us and ask.
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3.5">
            <SiteLink href={ROUTES.home} className="btn-primary">
              Go to the home page
              <Icon
                name="arrow-right"
                className="w-[18px] h-[18px]"
                strokeWidth={2.2}
              />
            </SiteLink>
            <a href={telHref(site.phoneRaw)} className="btn-secondary">
              <Icon name="phone" className="w-[18px] h-[18px]" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
