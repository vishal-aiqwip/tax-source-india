import { Icon } from "@/components/Icon";
import { site } from "@/lib/config";
import { waHref } from "@/lib/urls";

/**
 * FAQ accordion, built on native <details name="faq"> so only one panel is
 * open at a time — no JavaScript, and keyboard-accessible by default.
 * Ported from php/include/sections/faq.php.
 *
 * A Server Component: the exclusive-accordion behaviour is the browser's,
 * not ours. (Firefox before 130 ignores `name` and allows several open at
 * once — already true of the PHP site, so parity, not a regression.)
 *
 * ┌─ REVIEW BEFORE GOING LIVE ────────────────────────────────────────────┐
 * │ Answer 1 came from the source design. Answers 2-8 were DRAFTED and    │
 * │ have not been verified by the practice. They state tax positions —    │
 * │ ITR form selection, regime comparison, GST timelines, entity choice,  │
 * │ fees. A chartered accountant must confirm each one is accurate and    │
 * │ current before publication.                                           │
 * └───────────────────────────────────────────────────────────────────────┘
 */

const EYEBROW = "Questions we get asked";
const HEADING = "Before you pick up the phone";
const INTRO =
  "If your situation is not covered here, ask us directly. A straight answer costs nothing.";

const ASIDE = {
  title: "Still not sure?",
  body: "Send us a message on WhatsApp with your situation. We will tell you what applies and what it costs.",
};

const ITEMS = [
  {
    q: "What documents do you need from me to file my return?",
    a: "For most salaried filers: PAN, Aadhaar, Form 16, bank interest details and proof of any deductions you want to claim. If you have capital gains, add your broker statement; for house property, the loan interest certificate. We send you a checklist for your exact situation, so nothing goes back and forth twice.",
  },
  {
    q: "Which ITR form applies to me?",
    a: "It depends on where your income comes from, not how much of it there is. Salary, one house property and modest interest income usually means ITR-1; add capital gains or a second property and it becomes ITR-2; business or professional income moves you to ITR-3 or ITR-4. You do not need to work this out yourself, tell us your sources of income and we pick the form.",
  },
  {
    q: "Old regime or new regime, which should I choose?",
    a: "Whichever leaves you with more money, and that depends entirely on your deductions. If you are claiming a home loan, 80C investments, HRA and medical insurance, the old regime often still wins; with few deductions, the new regime usually does. We run your numbers both ways and show you the two figures side by side before filing.",
  },
  {
    q: "How long does a GST registration take?",
    a: "Typically about a week from the day we have your complete documents, sometimes less. What slows it down is a mismatch in the address proof or the department raising a clarification, which is why we check the paperwork before we file rather than after. If your application is picked for physical verification, allow a little longer.",
  },
  {
    q: "I have received a notice from the department. Can you handle it?",
    a: "Yes, and bring it to us early. Most notices are routine, a mismatch against Form 26AS, an unreported interest entry, a query on a deduction, and are settled with a properly drafted response. We read the notice, tell you plainly what it is asking and what it is likely to cost, and reply on your behalf within the deadline. This applies whether or not we filed the original return.",
  },
  {
    q: "Which company structure should I register: Pvt Ltd, LLP or OPC?",
    a: "A private limited company suits you if you plan to raise outside investment or bring in co-founders, as it is the structure investors expect. An LLP is lighter to run and cheaper to comply with, which fits a professional or family-run firm with no funding plans. An OPC works for a single founder who wants limited liability now and can convert later. We talk it through against your actual plans, because switching structures afterwards is more expensive than choosing well the first time.",
  },
  {
    q: "Do you work with clients outside Bengaluru?",
    a: "Yes. Filing is online, so documents come to us over WhatsApp or email and we handle clients across Karnataka and beyond. You lose nothing but the option of walking in, and you still get one named person on your file rather than a ticket queue.",
  },
  {
    q: "How do your fees work?",
    a: "A fixed fee per piece of work, quoted in writing before we start. A straightforward salary return costs less than a return with capital gains; monthly GST filing is a flat monthly fee. There is no hourly meter and no bill at the end that you did not expect, and the first conversation to work out what you need is free.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-[90px] bg-band px-6 py-[clamp(56px,6vw,88px)]"
    >
      {/* Flex, not an auto-fit grid: this section has exactly two children, so
          the track count is not something to discover. It also means one
          breakpoint governs both the columns and the sticky below, instead of
          md: having to approximate wherever auto-fit happened to wrap. */}
      <div className="mx-auto flex max-w-[1160px] flex-col items-start gap-[clamp(32px,4vw,70px)] md:flex-row">
        {/* Sticky from md: up, where the columns appear. top-[100px] clears the
            84px sticky header. Not sticky in one column, where it sits above the
            list and would pin itself over the questions being read. */}
        <div className="flex w-full min-w-0 flex-col gap-4 md:sticky md:top-[100px] md:flex-1">
          <div className="eyebrow text-brand">{EYEBROW}</div>
          <h2 className="text-[clamp(26px,3.2vw,38px)] leading-[1.12] font-extrabold">
            {HEADING}
          </h2>
          <p className="text-[16.5px] leading-[1.65] text-muted">{INTRO}</p>

          <div className="mt-2 flex flex-col gap-3 rounded-[14px] border border-line bg-white p-[22px]">
            <div className="flex items-center gap-[11px]">
              <Icon name="chat" className="w-5 h-5 text-brand" />
              <h3 className="text-base font-bold text-navy">{ASIDE.title}</h3>
            </div>
            <p className="text-[14.5px] leading-relaxed text-muted">
              {ASIDE.body}
            </p>
            <a
              href={waHref()}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-[15px] font-bold text-brand hover:text-brand-dark"
            >
              {site.phone}
              <Icon name="arrow-right" className="w-4 h-4" strokeWidth={2.4} />
            </a>
          </div>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-3 md:flex-1">
          {ITEMS.map((item, i) => (
            <details
              key={item.q}
              name="faq"
              open={i === 0}
              className="group rounded-[14px] border border-line bg-white px-[26px] py-6"
            >
              <summary className="flex items-center justify-between gap-5">
                <h3 className="text-[18.5px] font-bold">{item.q}</h3>
                <span className="shrink-0 text-[#7C8B98] group-open:hidden">
                  <Icon name="plus" className="w-5 h-5" strokeWidth={2.2} />
                </span>
                <span className="hidden shrink-0 text-brand group-open:block">
                  <Icon name="minus" className="w-5 h-5" strokeWidth={2.2} />
                </span>
              </summary>
              <p className="pt-3 text-[15.5px] leading-[1.65] text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
