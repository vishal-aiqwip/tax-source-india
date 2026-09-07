import { IconRepeat } from "@/components/Icon";
import { initials } from "@/lib/text";

/**
 * Ported from php/include/sections/testimonials.php.
 *
 * ┌─ REVIEW BEFORE GOING LIVE ────────────────────────────────────────────┐
 * │ Testimonials 2 and 3 are NOT publishable as they stand. The source    │
 * │ design supplied only the opening clause of each, alongside a real     │
 * │ client name; the completion is INVENTED TEXT attributed to a named    │
 * │ real person. Replace each with the actual Google review, or delete    │
 * │ the card. The `drafted` flag marks the two affected entries.          │
 * │                                                                       │
 * │ The three reviewer role labels are also unverified.                   │
 * └───────────────────────────────────────────────────────────────────────┘
 */

const EYEBROW = "In their words";
const HEADING = "Clients who come back every year";

const ITEMS = [
  {
    stars: 5,
    quote:
      "Very helpful and service was efficient. Like their approach to getting things done. I see them every year and always walk away satisfied.",
    name: "Lokeswara Rao",
    role: "Salaried professional",
    drafted: false, // quote came through complete in the design
  },
  {
    stars: 5,
    quote:
      "I am extremely happy with the work and overall experience, with the care they took over my needs. They explained which regime worked out better for me instead of just filing and sending me a bill.",
    name: "Raja S Reddy",
    role: "Business owner",
    drafted: true, // second sentence is INVENTED — see the block above
  },
  {
    stars: 5,
    quote:
      "Filing ITR with Tax Source India is always a great experience. The tax experts are very professional. I send my documents over WhatsApp and the acknowledgement comes back the same week.",
    name: "Ashar Khateer",
    role: "Salaried professional",
    drafted: true, // second/third sentence is INVENTED — see the block above
  },
];

export function Testimonials() {
  return (
    <section className="bg-page px-6 py-[clamp(56px,6vw,88px)]">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-11 flex max-w-[640px] flex-col gap-3.5">
          <div className="eyebrow text-brand">{EYEBROW}</div>
          <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-extrabold">
            {HEADING}
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[22px]">
          {ITEMS.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col gap-[18px] rounded-[14px] border border-line bg-white px-7 py-[30px]"
            >
              <div
                className="flex gap-[3px] text-gold"
                role="img"
                aria-label={`${item.stars} out of 5 stars`}
              >
                <IconRepeat
                  name="star"
                  times={item.stars}
                  className="w-[17px] h-[17px]"
                />
              </div>
              <blockquote className="text-[16.5px] leading-[1.65] text-ink">
                {"“"}
                {item.quote}
                {"”"}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-line-soft pt-5">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {initials(item.name)}
                </div>
                <div className="flex flex-col gap-px">
                  <div className="text-[15px] font-bold text-navy">
                    {item.name}
                  </div>
                  <div className="text-[13px] text-muted-2">{item.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
