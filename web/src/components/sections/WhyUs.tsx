import { Icon } from "@/components/Icon";
import type { IconName } from "@/lib/icons";

/** Ported from php/include/sections/why-us.php. */

const EYEBROW = "Why Tax Source India";
const HEADING = "An accountant you can rely on, not a helpdesk ticket";
const INTRO =
  "Software can fill a form. What it cannot do is know your business, spot the deduction you forgot, or argue your case when a notice arrives. That is the part we do.";

/* Split into two fields because the first half is wrapped in <strong>. This is
   the pattern to follow if any other copy ever needs inline markup — never
   raw HTML in a string. */
const NOTE_STRONG = "At Tax Source India, no client is too big or small.";
const NOTE_REST =
  " We work with individuals, small and mid-sized businesses, large firms and multinationals alike.";

const MAIN_PHOTO = {
  src: "/images/team.webp",
  alt: "The Tax Source India team in the Bengaluru office",
  title: "The people who will handle your file",
  sub: "Church Street office, HAL 3rd Stage",
  w: 1100,
  h: 660,
};

const SMALL_PHOTOS = [
  {
    src: "/images/exterior.webp",
    alt: "The building housing the Tax Source India office",
    title: "Find us on Church Street",
    w: 760,
    h: 427,
  },
  {
    src: "/images/meeting.webp",
    alt: "A Tax Source India adviser talking a client through their filings",
    title: "Sitting down with a client",
    w: 760,
    h: 427,
  },
];

const PILLARS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "shield-check",
    title: "Trustworthy",
    body: "A professional team serving individuals and businesses across every aspect of tax, registration and compliance.",
  },
  {
    icon: "clock",
    title: "Experienced",
    body: "Expertise proven in real-world environments: assessments, scrutiny, departmental queries and the everyday grind of monthly filing.",
  },
  {
    icon: "shield-alert",
    title: "Professional",
    body: "Certified chartered accountants, company secretaries and experienced accountants, qualified people, working under one roof.",
  },
];

export function WhyUs() {
  return (
    <section
      id="why"
      className="scroll-mt-[90px] bg-white px-6 py-[clamp(56px,6vw,88px)]"
    >
      <div className="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-center gap-[clamp(32px,4vw,60px)]">
        {/* photo stack */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="relative overflow-hidden rounded-[14px] shadow-[0_24px_48px_-28px_rgba(10,35,64,0.45)]">
            {/* biome-ignore lint/performance/noImgElement: next/image is deliberately unused — see §8 of docs/nextjs-migration-plan.md */}
            <img
              src={MAIN_PHOTO.src}
              alt={MAIN_PHOTO.alt}
              width={MAIN_PHOTO.w}
              height={MAIN_PHOTO.h}
              loading="lazy"
              className="block h-auto w-full"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-b from-transparent to-navy/80 px-[22px] pt-10 pb-[18px]">
              <div className="text-[15px] font-bold text-white">
                {MAIN_PHOTO.title}
              </div>
              <div className="mt-0.5 text-[13.5px] text-[#C1D0DE]">
                {MAIN_PHOTO.sub}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-4">
            {SMALL_PHOTOS.map((small) => (
              <div
                key={small.src}
                className="relative h-[190px] overflow-hidden rounded-[14px]"
              >
                {/* biome-ignore lint/performance/noImgElement: next/image is deliberately unused — see §8 of docs/nextjs-migration-plan.md */}
                <img
                  src={small.src}
                  alt={small.alt}
                  width={small.w}
                  height={small.h}
                  loading="lazy"
                  className="block h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-b from-transparent to-navy/[0.78] px-3.5 pt-7 pb-3">
                  <div className="text-[13.5px] font-bold text-white">
                    {small.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* copy */}
        <div className="flex min-w-0 flex-col gap-[18px]">
          <div className="eyebrow text-brand">{EYEBROW}</div>
          <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-extrabold">
            {HEADING}
          </h2>
          <p className="text-[17px] leading-[1.65] text-muted">{INTRO}</p>

          <div className="flex flex-col gap-3.5 pt-1.5">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="flex items-start gap-[18px]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-brand-tint text-brand">
                  <Icon
                    name={pillar.icon}
                    className="w-[22px] h-[22px]"
                    strokeWidth={1.9}
                  />
                </div>
                <div className="flex flex-col gap-[5px]">
                  <h3 className="text-[19px] font-bold">{pillar.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">
                    {pillar.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 flex items-start gap-4 rounded-[14px] border border-line bg-page px-[22px] py-5">
            <Icon
              name="shield"
              className="w-[22px] h-[22px] shrink-0 mt-0.5 text-brand"
            />
            <p className="text-[15.5px] leading-relaxed text-body">
              <strong className="text-navy">{NOTE_STRONG}</strong>
              {NOTE_REST}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
