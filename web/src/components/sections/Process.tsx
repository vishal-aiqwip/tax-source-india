const EYEBROW = "How it works";
const HEADING = "Four steps, no surprises";
const INTRO =
  "Walk into the Church Street office or send documents over WhatsApp. Either way the process is the same.";

const STEPS = [
  {
    n: "STEP 01",
    title: "Tell us your situation",
    body: "A free call or a walk-in. We ask what you earn, what you run and what has already been filed.",
  },
  {
    n: "STEP 02",
    title: "Get a fixed quote",
    body: "Scope and price in writing before any work starts. No hourly meter, no bill at the end you did not expect.",
  },
  {
    n: "STEP 03",
    title: "Share your documents",
    body: "Form 16, invoices, bank statements, by WhatsApp, email or in person. We tell you exactly what is missing.",
  },
  {
    n: "STEP 04",
    title: "We file, and stay on it",
    body: "Acknowledgement in your hands, next due date in our calendar, and a person to call if a notice turns up.",
  },
];

/** Ported from php/include/sections/process.php. */
export function Process() {
  return (
    <section
      id="how"
      className="scroll-mt-[90px] bg-navy px-6 py-[clamp(56px,6vw,84px)]"
    >
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-10">
          <div className="flex max-w-[640px] flex-col gap-3.5">
            <div className="eyebrow text-teal">{EYEBROW}</div>
            <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-extrabold text-white">
              {HEADING}
            </h2>
          </div>
          <p className="max-w-[360px] text-base leading-relaxed text-[#91A6BA]">
            {INTRO}
          </p>
        </div>

        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-5">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="flex flex-col gap-3.5 rounded-[14px] border border-navy-line bg-navy-card px-6 py-7"
            >
              <div className="font-display text-[13px] font-extrabold tracking-[0.12em] text-teal">
                {step.n}
              </div>
              <h3 className="text-xl font-bold text-white">{step.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-[#91A6BA]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
