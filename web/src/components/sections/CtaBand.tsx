import { SiteLink } from "@/components/SiteLink";
import { site } from "@/lib/config";
import { homeAnchor, type PageKey, telHref } from "@/lib/urls";

/** Ported from php/include/sections/cta-band.php. */

const HEADING = "Deadline coming up?";
const BODY =
  "Call us before it is a penalty. We will tell you straight away what it takes.";
const PRIMARY = "Book a free consultation";

export function CtaBand({ page }: { page: PageKey }) {
  return (
    <section className="bg-band px-6 py-[clamp(44px,5vw,64px)]">
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-8">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-[clamp(26px,2.6vw,32px)] leading-tight font-extrabold">
            {HEADING}
          </h2>
          <p className="text-[17px] text-muted">{BODY}</p>
        </div>
        {/* Both labels carry information — the phone number especially — so
            rather than collapsing one to an icon, the pair stays on one row
            below 640px on smaller type and tighter gutters. */}
        <div className="flex w-full flex-nowrap items-stretch gap-2.5 sm:w-auto sm:flex-wrap sm:items-center sm:gap-3.5">
          <SiteLink
            href={homeAnchor("contact", page)}
            className="btn-primary min-w-0 px-3 text-center text-[14px] sm:px-[26px] sm:text-[16px]"
          >
            {PRIMARY}
          </SiteLink>
          <a
            href={telHref(site.phoneRaw)}
            className="btn-secondary min-w-0 px-3 text-center text-[14px] whitespace-nowrap sm:px-[26px] sm:text-[16px]"
          >
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
