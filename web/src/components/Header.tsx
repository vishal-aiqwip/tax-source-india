import Image from "next/image";
import { HeaderChrome } from "@/components/HeaderChrome";
import { Icon } from "@/components/Icon";
import { SiteLink } from "@/components/SiteLink";
import { site } from "@/lib/config";
import { homeAnchor, type PageKey, ROUTES, telHref } from "@/lib/urls";
import Link from "next/link";

/** The four in-page destinations. `strong` marks the visually emphasised one. */
const NAV: { label: string; href: string; strong?: boolean }[] = [
  { label: "Services", href: "services", strong: true },
  { label: "Why us", href: "why" },
  { label: "How it works", href: "how" },
  { label: "FAQ", href: "faq" },
];

/**
 * Sticky header: logo, desktop nav, phone + CTA, and the mobile drawer.
 * Ported from php/include/header.php.
 *
 * The desktop/mobile switch is the `nav:` breakpoint (1080px), matching the
 * source design's own threshold.
 *
 * Everything here is server-rendered; <HeaderChrome> is the only client code
 * and exists solely to hold the drawer's open state.
 */
export function Header({ page }: { page: PageKey }) {
  return (
    <HeaderChrome
      menuIcon={<Icon name="menu" className="w-5 h-5 text-navy" />}
      contactHref={homeAnchor("contact", page)}
      drawerLinks={NAV.map((item) => ({
        label: item.label,
        href: homeAnchor(item.href, page),
      }))}
      mobilePhone={
        <Link
          href={telHref(site.phoneRaw)}
          aria-label={`Call ${site.phone}`}
          className="flex h-[46px] w-[46px] items-center justify-center rounded-lg border border-line-strong bg-white"
        >
          <Icon name="phone" className="w-[19px] h-[19px] text-brand" />
        </Link>
      }
    >
      <SiteLink
        href={`${ROUTES.home}#top`}
        className="flex shrink-0 items-center"
      >
        {/* In the header on every page, so it loads eagerly rather than lazily. */}
        <Image
          src="/images/logo.png"
          alt={site.name}
          width={96}
          height={44}
          priority
          className="block h-11 w-auto"
        />
      </SiteLink>

      {/* desktop nav */}
      <nav
        className="ml-2.5 hidden items-center gap-[30px] nav:flex"
        aria-label="Main"
      >
        {NAV.map((item) => (
          <SiteLink
            key={item.href}
            href={homeAnchor(item.href, page)}
            className={`text-[15px] whitespace-nowrap ${
              item.strong
                ? "font-semibold text-navy"
                : "font-medium text-[#556B80] hover:text-navy"
            }`}
          >
            {item.label}
          </SiteLink>
        ))}
      </nav>

      <div className="grow" />

      {/* desktop actions */}
      <div className="hidden items-center gap-4 nav:flex">
        <Link
          href={telHref(site.phoneRaw)}
          className="flex items-center gap-2 text-[15px] font-semibold whitespace-nowrap text-navy hover:text-brand"
        >
          <Icon name="phone" className="w-[17px] h-[17px] text-brand" />
          {site.phone}
        </Link>
        <SiteLink
          href={homeAnchor("contact", page)}
          className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-brand px-5 py-3 text-[15px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-dark"
        >
          Book a free call
        </SiteLink>
      </div>
    </HeaderChrome>
  );
}
