import { Icon } from "@/components/Icon";
import type { IconName } from "@/lib/icons";

/**
 * Client logo wall. Ported from php/include/sections/logo-wall.php.
 *
 * Off by default — the marks are the source design's generic placeholders,
 * not real client logos. Gated behind flags.showLogoWall by the caller.
 */
const TITLE = "Trusted by businesses across Bengaluru";

/* Placeholder marks from the design. Replace with real client logos and set
   showLogoWall = true in lib/flags.ts. `weight` and `tracking` are Tailwind
   classes, so this file must stay inside globals.css's @source paths. */
const MARKS: {
  icon: IconName;
  label: string;
  weight: string;
  tracking: string;
}[] = [
  {
    icon: "mark-1",
    label: "CLIENT NAME",
    weight: "font-extrabold",
    tracking: "tracking-[0.06em]",
  },
  {
    icon: "mark-2",
    label: "Client Name",
    weight: "font-semibold",
    tracking: "tracking-[-0.02em]",
  },
  {
    icon: "mark-3",
    label: "CLIENTNAME",
    weight: "font-bold",
    tracking: "tracking-[0.02em]",
  },
  {
    icon: "mark-4",
    label: "Client·Name",
    weight: "font-semibold",
    tracking: "tracking-[-0.01em]",
  },
  {
    icon: "mark-5",
    label: "CLIENT NAME",
    weight: "font-bold",
    tracking: "tracking-[0.08em]",
  },
  {
    icon: "mark-6",
    label: "ClientName",
    weight: "font-extrabold",
    tracking: "tracking-[-0.02em]",
  },
];

export function LogoWall() {
  return (
    <section className="border-b border-line-soft bg-white px-6 py-[46px]">
      <div className="mx-auto flex max-w-[1160px] flex-col items-center gap-[26px]">
        <h2 className="text-center text-[13.5px] font-bold tracking-[0.12em] text-[#7C8B98] uppercase">
          {TITLE}
        </h2>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(min(160px,100%),1fr))] items-center gap-6">
          {MARKS.map((mark) => (
            <div
              key={mark.icon}
              className="flex h-[46px] items-center justify-center gap-2.5 text-faint"
            >
              <Icon name={mark.icon} className="w-[26px] h-[26px]" />
              <span
                className={`font-display text-[17px] ${mark.weight} ${mark.tracking}`}
              >
                {mark.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
