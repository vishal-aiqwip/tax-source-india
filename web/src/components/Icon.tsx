import type { SVGProps } from "react";
import { type IconName, icons } from "@/lib/icons";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  name: IconName;
  /** Matches the PHP helper's default of w-4 h-4. */
  className?: string;
  strokeWidth?: number | string;
}

/**
 * Render an icon from the registry. Ported from icon() in
 * php/include/functions.php.
 *
 * Colour comes from the Tailwind class via currentColor, so the same icon
 * works on light and dark bands.
 *
 * Attribute order matches the PHP output (viewBox, class, paint, extras,
 * aria-hidden) to keep the rendered-HTML diff quiet.
 *
 * This is a Server Component. Client components must NOT import it directly —
 * that pulls all 35 icons into the browser bundle. Render the icon on the
 * server and pass it down as a ReactNode prop instead.
 */
export function Icon({
  name,
  className = "w-4 h-4",
  strokeWidth = 2,
  ...rest
}: IconProps) {
  const { paint, body } = icons[name];

  const paintProps =
    paint === "fill"
      ? ({ fill: "currentColor" } as const)
      : ({
          fill: "none",
          stroke: "currentColor",
          strokeWidth,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        } as const);

  // Icons are decorative by default: the surrounding text carries the meaning.
  // An explicit aria-label or aria-hidden from the caller wins.
  const ariaHidden =
    rest["aria-hidden"] ?? (rest["aria-label"] ? undefined : true);

  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: icons here are decorative and carry aria-hidden by default; a caller that needs one passes aria-label, which suppresses aria-hidden above
    <svg
      viewBox="0 0 24 24"
      className={className}
      {...paintProps}
      {...rest}
      aria-hidden={ariaHidden}
    >
      {body}
    </svg>
  );
}

/** Repeat an icon n times — used for star ratings. */
export function IconRepeat({
  name,
  times,
  className,
}: {
  name: IconName;
  times: number;
  className?: string;
}) {
  return (
    <>
      {Array.from({ length: Math.max(0, times) }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: a fixed-length run of identical decorative icons; there is no id to key on and the list never reorders
        <Icon key={i} name={name} className={className} />
      ))}
    </>
  );
}
