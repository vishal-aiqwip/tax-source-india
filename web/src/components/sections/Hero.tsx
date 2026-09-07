import { Fragment } from "react";
import { Icon } from "@/components/Icon";
import { waHref } from "@/lib/urls";

/** Ported from php/include/sections/hero.php. */

const BADGE_RATING = "4.8 on Google";
const BADGE_SINCE = "Bengaluru since 2018";
const HEADING = "An accountant you can";
const HEADING_EM = "actually reach.";
const SUB =
  "GST, income tax and company filings for Bengaluru, handled end to end by chartered accountants, not a call centre.";

const PROOF = [
  "Fixed quote in writing before we start",
  "One named person handles your file",
  "Walk in on Church Street, or send it over WhatsApp",
];

const FLOAT_CARD = {
  title: "Acknowledgement in hand",
  sub: "ITR-V received the same day",
};

const CALENDAR = {
  title: "Your compliance calendar",
  status: "On track",
  rows: [
    { day: "11", month: "MTH", label: "GSTR-1", badge: "Filed", tone: "brand" },
    {
      day: "20",
      month: "MTH",
      label: "GSTR-3B",
      badge: "In review",
      tone: "amber",
    },
    {
      day: "31",
      month: "JUL",
      label: "Income tax return",
      badge: "Upcoming",
      tone: "grey",
    },
  ],
} as const;

const STATS = [
  { value: "12,000+", label: "Returns filed for individuals & businesses" },
  { value: "10+", label: "Years of practice in Bengaluru" },
  { value: "15", label: "Services under one roof" },
  { value: "CA · CS", label: "Certified professionals on the team" },
];

const TONES: Record<string, string> = {
  brand: "text-brand bg-brand-tint",
  amber: "text-amber-ink bg-amber-tint",
  grey: "text-[#556B80] bg-[#F1F4F7]",
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-linear-to-b from-page to-hero-end px-6 pt-[clamp(24px,2.6vw,36px)]"
    >
      <div className="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-center gap-[clamp(28px,3.4vw,52px)]">
        {/* copy */}
        <div className="flex min-w-0 flex-col gap-[18px]">
          <div className="flex flex-wrap items-center gap-2.5 self-start rounded-full border border-[#D8E2EC] bg-white px-4 py-2">
            <Icon name="star" className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold text-navy">
              {BADGE_RATING}
            </span>
            <span className="h-3.5 w-px bg-[#D8E2EC]" />
            <span className="text-sm text-[#657A8D]">{BADGE_SINCE}</span>
          </div>

          <h1 className="text-[clamp(34px,4.2vw,50px)] leading-[1.04] font-extrabold">
            {HEADING} <span className="text-brand">{HEADING_EM}</span>
          </h1>

          <p className="text-[clamp(16px,1.4vw,18px)] leading-[1.55] text-[#495F73]">
            {SUB}
          </p>

          {/* Below 640px the pair shares one row: WhatsApp collapses to its icon
              and the primary sits at its natural width, so the two never stack
              and eat space above the fold. */}
          <div className="flex flex-nowrap items-stretch gap-2.5 sm:flex-wrap sm:items-center sm:gap-3.5">
            <a
              href="#contact"
              className="btn-primary w-fit px-4 text-center sm:px-[26px]"
            >
              Book a free consultation
              <Icon
                name="arrow-right"
                className="w-[18px] h-[18px] shrink-0"
                strokeWidth={2.2}
              />
            </a>
            <a
              href={waHref()}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp us"
              className="btn-secondary w-[52px] shrink-0 px-0 sm:w-auto sm:px-[26px]"
            >
              <Icon name="chat" className="w-[18px] h-[18px] shrink-0" />
              <span className="hidden sm:inline">WhatsApp us</span>
            </a>
          </div>

          <ul className="flex flex-col gap-2.5 pt-1">
            {PROOF.map((line) => (
              <li
                key={line}
                className="flex items-start gap-[9px] text-[15px] font-medium text-[#495F73]"
              >
                <Icon
                  name="check"
                  className="w-[17px] h-[17px] shrink-0 mt-[3px] text-brand"
                  strokeWidth={2.4}
                />
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* artwork */}
        <div className="relative flex min-w-0 flex-col items-center pb-[clamp(16px,2vw,28px)]">
          {/* floating acknowledgement card (desktop only) */}
          <div className="absolute top-3.5 right-[45px] z-2 hidden max-w-[215px] items-center gap-[9px] rounded-[10px] border border-[#DEE6EF] bg-white px-[11px] py-[9px] shadow-[0_18px_36px_-22px_rgba(10,35,64,0.5)] nav:flex">
            <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] bg-brand-tint">
              <Icon
                name="check"
                className="w-3.5 h-3.5 text-brand"
                strokeWidth={2.4}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-xs leading-tight font-bold whitespace-nowrap text-navy">
                {FLOAT_CARD.title}
              </div>
              <div className="text-[9.5px] leading-tight whitespace-nowrap text-muted-2">
                {FLOAT_CARD.sub}
              </div>
            </div>
          </div>

          {/* decorative rings */}
          <div className="pointer-events-none absolute top-2.5 -right-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(14,124,90,0.13)_0%,rgba(14,124,90,0.04)_55%,rgba(14,124,90,0)_72%)]" />
          <div className="pointer-events-none absolute top-[34px] right-0 h-[340px] w-[340px] rounded-full border border-dashed border-[#CBDAEA]" />

          {/* biome-ignore lint/performance/noImgElement: next/image is deliberately unused — see §8 of docs/nextjs-migration-plan.md */}
          <img
            src="/images/hero.webp"
            alt="Tax Source India accountant with client documents"
            width="880"
            height="853"
            fetchPriority="high"
            className="relative block h-auto w-full max-w-[420px]"
          />

          {/* compliance calendar card */}
          <div className="relative -mt-[160px] w-full max-w-[236px] self-start rounded-[14px] border border-[#DEE6EF] bg-white px-3.5 py-3 shadow-[0_26px_50px_-24px_rgba(10,35,64,0.45)]">
            <div className="flex items-center justify-between gap-2.5 border-b border-[#E6EDF4] pb-[9px]">
              <div className="font-display text-[11.5px] leading-tight font-bold tracking-[-0.02em] text-navy">
                {CALENDAR.title}
              </div>
              <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-tint px-[9px] py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                <span className="text-[9.5px] font-bold text-brand">
                  {CALENDAR.status}
                </span>
              </div>
            </div>
            <div className="flex flex-col pt-1">
              {CALENDAR.rows.map((row, i) => (
                <Fragment key={row.label}>
                  {i > 0 && <div className="h-px bg-[#E8EFF5]" />}
                  <div className="flex items-center gap-[9px] py-[7px]">
                    <div className="flex h-[30px] w-[30px] shrink-0 flex-col items-center justify-center rounded-[7px] bg-fill">
                      <div className="font-display text-[11px] leading-none font-extrabold text-navy">
                        {row.day}
                      </div>
                      <div className="text-[8.5px] font-bold text-muted-2">
                        {row.month}
                      </div>
                    </div>
                    <div className="grow text-[11.5px] font-semibold text-navy">
                      {row.label}
                    </div>
                    <div
                      className={`rounded-md px-[7px] py-[3px] text-[9.5px] font-bold ${TONES[row.tone]}`}
                    >
                      {row.badge}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip. The grid collapses to one column on mobile, so the
          dividers run horizontally there and switch to vertical once the cells
          sit side by side. Cells are flush left on mobile; the 30px gutters and
          the flush outer edges only apply once there is more than one column. */}
      <div className="stats-strip mx-auto mt-[clamp(22px,2.4vw,34px)] max-w-[1160px]">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1.5">
            <div className="font-display text-[clamp(28px,2.6vw,34px)] font-extrabold tracking-[-0.02em] text-navy">
              {stat.value}
            </div>
            <div className="text-[14.5px] text-[#657A8D]">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
