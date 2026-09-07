import { Icon } from "@/components/Icon";
import { SiteLink } from "@/components/SiteLink";
import { site } from "@/lib/config";
import type { IconName } from "@/lib/icons";
import { homeAnchor, type PageKey, ROUTES, waHref } from "@/lib/urls";

const BLURB =
  "Chartered accountants, company secretaries and experienced accountants serving Bengaluru: individuals, businesses and multinationals alike.";

/* href "whatsapp" is resolved to a wa.me deep link below. The other three are
   placeholders pointing at #top until the real profile URLs are supplied. */
const SOCIAL: { icon: IconName; label: string; href: string }[] = [
  { icon: "facebook", label: "Facebook", href: "#top" },
  { icon: "instagram", label: "Instagram", href: "#top" },
  { icon: "x", label: "X", href: "#top" },
  { icon: "chat", label: "WhatsApp", href: "whatsapp" },
];

const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Tax & filing",
    links: [
      "Income tax return filing",
      "Corporate tax filing",
      "GST registration",
      "GST return filing",
      "Audit services",
      "Financial planning",
    ],
  },
  {
    title: "Registrations",
    links: [
      "Company registration",
      "LLP & partnership",
      "Udyog Aadhaar (MSME)",
      "Importer Exporter Code",
      "Digital Signature",
      "PT registration",
    ],
  },
  {
    title: "Compliance",
    links: [
      "Payroll compliance",
      "PF & ESI registration",
      "Corporate & MCA filings",
      "E-way bills",
      "Intellectual property",
      "Notice & audit defence",
    ],
  },
];

/**
 * Site footer. Ported from php/include/footer.php.
 *
 * The two fixed-position widgets that PHP appended here (chat button, mobile
 * call bar) live in <Shell> instead, since they are siblings of the footer
 * rather than part of it.
 */
export function Footer({ page }: { page: PageKey }) {
  /* PHP used date('Y'). In a prerendered page this would freeze at build
     time, so the root layout sets `revalidate` to regenerate daily. */
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy px-6 pt-[clamp(48px,5vw,64px)] pb-[34px]">
      <div className="mx-auto max-w-[1160px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-10 border-b border-navy-line pb-11">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-3">
              {/* biome-ignore lint/performance/noImgElement: next/image is deliberately unused — see §8 of docs/nextjs-migration-plan.md */}
              <img
                src="/images/logo-mark.png"
                alt={site.name}
                width="52"
                height="52"
                loading="lazy"
                className="block h-[52px] w-[52px] rounded-xl"
              />
              <div className="text-xs font-semibold tracking-[0.08em] text-on-dark-2 uppercase">
                {site.tagline}
              </div>
            </div>
            <p className="max-w-[300px] text-[14.5px] leading-relaxed text-on-dark">
              {BLURB}
            </p>
            <div className="flex gap-2.5">
              {SOCIAL.map((s) => {
                const external = s.href === "whatsapp";
                const href = external ? waHref() : s.href;
                return (
                  <a
                    key={s.label}
                    href={href}
                    aria-label={s.label}
                    {...(external ? { target: "_blank", rel: "noopener" } : {})}
                    className="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] bg-navy-chip text-on-dark transition-colors hover:text-white"
                  >
                    <Icon name={s.icon} className="w-[17px] h-[17px]" />
                  </a>
                );
              })}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-[13px]">
              <h2 className="text-[13px] font-bold tracking-[0.09em] text-white uppercase">
                {col.title}
              </h2>
              {/* Every link points at the services section, as in the PHP
                  original. Left as-is for parity; these are placeholders
                  waiting on real per-service destinations. */}
              {col.links.map((link) => (
                <SiteLink
                  key={link}
                  href={homeAnchor("services", page)}
                  className="text-[14.5px] text-on-dark hover:text-white"
                >
                  {link}
                </SiteLink>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-[26px]">
          <div className="text-sm text-on-dark-2">
            © {year} {site.name}. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-[26px]">
            <SiteLink
              href={ROUTES.privacy}
              className="text-sm text-on-dark hover:text-white"
            >
              Privacy policy
            </SiteLink>
            <SiteLink
              href={ROUTES.terms}
              className="text-sm text-on-dark hover:text-white"
            >
              Terms of service
            </SiteLink>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-on-dark hover:text-white"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
