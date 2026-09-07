import { Icon } from "@/components/Icon";
import type { IconName } from "@/lib/icons";

/** Ported from php/include/sections/audience.php. */

const EYEBROW = "Where do you fit?";
const HEADING = "Start with what you need this month";
const INTRO =
  "No client is too big or too small, from a first salary return to a private limited company's full compliance calendar.";

const CARDS: {
  icon: IconName;
  title: string;
  body: string;
  items: string[];
  dark: boolean;
}[] = [
  {
    icon: "users",
    title: "Salaried & individuals",
    body: "Form 16 to filed return. We compare the old and new regime, claim every deduction you qualify for, and handle any notice that follows.",
    items: [
      "Income tax return filing",
      "Capital gains & house property",
      "Financial planning",
    ],
    dark: false,
  },
  {
    icon: "building",
    title: "Businesses on GST",
    body: "Registration, monthly returns, reconciliation and e-way bills, run as a routine, not a last-minute scramble.",
    items: [
      "GST registration & management",
      "GSTR-3B & GSTR-1, all year",
      "Payroll, PF & ESI compliance",
    ],
    dark: true,
  },
  {
    icon: "sparkle",
    title: "Founders & startups",
    body: "Get incorporated properly the first time: the right structure, the right registrations, and the filings that keep it clean.",
    items: [
      "Pvt Ltd, LLP, OPC & partnership",
      "MCA corporate filings",
      "Trademark & IP services",
    ],
    dark: false,
  },
];

export function Audience() {
  return (
    <section className="bg-white px-6 py-[clamp(56px,6vw,88px)]">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-10">
          <div className="flex max-w-[620px] flex-col gap-3.5">
            <div className="eyebrow text-brand">{EYEBROW}</div>
            <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-extrabold">
              {HEADING}
            </h2>
          </div>
          <p className="max-w-[380px] text-base leading-relaxed text-[#657A8D]">
            {INTRO}
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[22px]">
          {CARDS.map((card) => {
            const dark = card.dark;
            return (
              <div
                key={card.title}
                className={`flex flex-col gap-4 rounded-[14px] border p-[30px] ${
                  dark ? "border-navy bg-navy" : "border-line bg-page"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-[11px] ${
                    dark ? "bg-navy-chip text-teal" : "bg-brand-tint text-brand"
                  }`}
                >
                  <Icon
                    name={card.icon}
                    className="w-6 h-6"
                    strokeWidth={1.9}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h3
                    className={`text-[21px] font-bold ${dark ? "text-white" : ""}`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`text-[15px] leading-relaxed ${
                      dark ? "text-[#A3B7CA]" : "text-muted"
                    }`}
                  >
                    {card.body}
                  </p>
                </div>

                <ul className="flex flex-col gap-[9px] pt-1">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-[9px] text-[14.5px] ${
                        dark ? "text-[#DAE6F0]" : "text-body"
                      }`}
                    >
                      <Icon
                        name="check"
                        className={`w-[15px] h-[15px] shrink-0 mt-[3px] ${
                          dark ? "text-teal" : "text-brand"
                        }`}
                        strokeWidth={2.6}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-auto flex items-center gap-2 pt-2 text-[15px] font-bold ${
                    dark
                      ? "text-teal hover:text-white"
                      : "text-brand hover:text-brand-dark"
                  }`}
                >
                  Get a quote
                  <Icon
                    name="arrow-right"
                    className="w-4 h-4"
                    strokeWidth={2.4}
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
