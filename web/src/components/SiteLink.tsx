import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type SiteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

/**
 * Renders next/link for internal route navigation and a plain <a> for
 * everything else.
 *
 * The distinction is not cosmetic:
 *
 *  - `/privacy`, `/terms`, `/#services` are route changes. next/link gives
 *    them prefetching and client-side navigation, and Next scrolls to the top
 *    instantly because <html> carries data-scroll-behavior="smooth".
 *
 *  - `#contact` on the page you are already on must NOT go through the
 *    router. That same data-scroll-behavior attribute makes Next force
 *    `scroll-behavior: auto` for the duration of a navigation, which would
 *    turn the site's smooth in-page scrolling into a jump. A plain <a>
 *    bypasses the router and lets the CSS do its job, matching the PHP.
 *
 *  - `tel:`, `mailto:` and `https://wa.me/...` are not navigations at all.
 *
 * homeAnchor() returns either form depending on the current page, which is
 * why this decision is made here rather than at each call site.
 */
export function SiteLink({ href, ...props }: SiteLinkProps) {
  const isRoute = href.startsWith("/");

  if (isRoute) {
    return <Link href={href} {...props} />;
  }

  return <a href={href} {...props} />;
}
