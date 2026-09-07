import { Icon } from "@/components/Icon";
import type { IconName } from "@/lib/icons";

/** Ported from php/include/sections/services.php. */

const EYEBROW = "Everything under one roof";
const HEADING = "Fifteen services, one point of contact";
const INTRO =
  "Rely on the most trusted professional services providers as per your need, without chasing three different consultants.";
const FOOTER_PROMPT = "Not sure which applies to you?";
const FOOTER_LINK = "Tell us your situation";

const GROUPS: { icon: IconName; title: string; items: string[] }[] = [
  {
    icon: "file-text",
    title: "Tax & filing",
    items: [
      "Individual & corporate tax filing",
      "GST registration & management",
      "GST return filing: GSTR-3B & 1",
      "Audit defence & audit services",
      "Financial planning",
    ],
  },
  {
    icon: "calendar",
    title: "Registrations",
    items: [
      "Startup & company registration",
      "Udyog Aadhaar (MSME)",
      "Importer Exporter Code (IEC)",
      "Digital Signature Certificate",
      "Professional Tax (PT) registration",
    ],
  },
  {
    icon: "settings",
    title: "Ongoing compliance",
    items: [
      "Payroll compliance",
      "PF & ESI registration",
      "Corporate & MCA filings",
      "E-way bill registration & generation",
      "Intellectual property services",
    ],
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-[90px] bg-band px-6 py-[clamp(56px,6vw,88px)]"
    >
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-11 flex max-w-[700px] flex-col gap-3.5">
          <div className="eyebrow text-brand">{EYEBROW}</div>
          <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-extrabold">
            {HEADING}
          </h2>
          <p className="text-[17px] leading-[1.65] text-muted">{INTRO}</p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-[22px]">
          {GROUPS.map((group) => {
            const last = group.items.length - 1;
            return (
              <div
                key={group.title}
                className="flex flex-col gap-5 rounded-[14px] border border-line bg-white px-7 py-[30px]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-tint text-brand">
                    <Icon name={group.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">{group.title}</h3>
                </div>
                <div className="flex flex-col">
                  {group.items.map((item, i) => (
                    <a
                      key={item}
                      href="#contact"
                      className={`group flex items-center justify-between gap-3 py-[13px] text-ink hover:text-brand${
                        i === last ? "" : " border-b border-line-soft"
                      }`}
                    >
                      <span className="text-[15.5px] font-medium">{item}</span>
                      <Icon
                        name="chevron-right"
                        className="w-4 h-4 shrink-0 text-[#B2C0CC] group-hover:text-brand"
                        strokeWidth={2.2}
                      />
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <p className="text-base text-muted">{FOOTER_PROMPT}</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-base font-bold text-brand hover:text-brand-dark"
          >
            {FOOTER_LINK}
            <Icon
              name="arrow-right"
              className="w-[17px] h-[17px]"
              strokeWidth={2.4}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
