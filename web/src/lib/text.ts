/**
 * Small text helpers. Ported from php/include/functions.php.
 */

/**
 * Initials for a testimonial avatar: "Raja S Reddy" -> "RR".
 *
 * PHP used mb_substr/mb_strtoupper. The spread operator iterates by code
 * point, so this matches for the names in use and does not split a surrogate
 * pair if a non-Latin name is ever added.
 */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";

  const first = [...parts[0]][0] ?? "";
  const last = parts.length > 1 ? ([...parts[parts.length - 1]][0] ?? "") : "";

  return (first + last).toUpperCase();
}
