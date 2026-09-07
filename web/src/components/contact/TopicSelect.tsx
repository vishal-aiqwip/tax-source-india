"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOPICS } from "@/lib/enquiry/schema";

/**
 * The "what do you need help with?" field.
 *
 * The PHP hand-rolled a full ARIA listbox (~160 lines in js/site.js) because a
 * native <select>'s option list is drawn by the OS and cannot be styled — and
 * Windows and Android are this audience's primary platforms. shadcn's Select
 * solves the same problem with a maintained component; the trade is that its
 * accessibility tree is Radix's (roving focus, portalled content) rather than
 * the original's aria-activedescendant, so the keyboard spec is a behavioural
 * check rather than a DOM diff.
 *
 * PROGRESSIVE ENHANCEMENT: Radix does not submit anything itself, so a real
 * <select name="topic"> is kept in the DOM and is the submitted control. Before
 * hydration it is the visible, working field — exactly the handover the PHP
 * did — and the Server Action reads it from FormData either way. Verify this
 * with JavaScript disabled rather than assuming it.
 */
export function TopicSelect({ defaultValue }: { defaultValue: string }) {
  const [value, setValue] = useState(defaultValue);

  // False during SSR and on the first client render, so the markup matches and
  // React does not report a hydration mismatch. Flipping it in an effect is
  // what reveals the styled control.
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(true), []);

  const field =
    "h-12 w-full rounded-lg border bg-white px-3.5 text-[15px] text-ink";

  return (
    <div className="relative flex flex-col gap-[7px]">
      <label
        id="f-topic-label"
        htmlFor={enhanced ? "f-topic-button" : "f-topic"}
        className="text-[13.5px] font-semibold text-body"
      >
        What do you need help with?
      </label>

      {/* The real control. Visually hidden once enhanced, but always the thing
          that submits — so the form works with JavaScript off. */}
      <select
        id="f-topic"
        name="topic"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={enhanced ? "sr-only" : `${field} border-line-input px-3`}
        tabIndex={enhanced ? -1 : undefined}
        aria-hidden={enhanced || undefined}
      >
        {TOPICS.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>

      {enhanced && (
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger
            id="f-topic-button"
            aria-labelledby="f-topic-label f-topic-button"
            className="flex !h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-line-input bg-white px-3.5 text-left text-[15px] text-ink transition-colors hover:border-brand data-[state=open]:border-brand"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[280px] rounded-xl border border-line bg-white py-1.5 shadow-[0_20px_44px_-18px_rgba(10,35,64,0.45)]">
            {TOPICS.map((topic) => (
              <SelectItem
                key={topic}
                value={topic}
                className="cursor-pointer px-3.5 py-2.5 text-[15px] text-ink data-[state=checked]:font-semibold data-[state=checked]:text-brand-dark data-highlighted:bg-brand-tint"
              >
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
