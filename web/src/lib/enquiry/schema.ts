import { z } from "zod";

/**
 * Validation for the enquiry form. Imported by BOTH the client component and
 * the Server Action, so it must not import anything server-only.
 *
 * Every rule mirrors php/include/form-handler.php lines 100-136 exactly. The
 * server is the authority, as it was in the PHP; the client check exists only
 * to spare the visitor a round trip.
 */

/**
 * The six offered topics. These literal strings are what the form posts and
 * what the CSV records — the PHP stored 'Payroll, PF &amp; ESI compliance'
 * and html_entity_decode()d it before comparison, so the decoded form is the
 * value of record and must not drift from the existing log.
 */
export const TOPICS = [
  "Income tax return filing",
  "GST registration or returns",
  "Company or LLP registration",
  "Payroll, PF & ESI compliance",
  "A notice from the department",
  "Something else",
] as const;

export type Topic = (typeof TOPICS)[number];

/** mb_strlen() counts code points; String.length counts UTF-16 units. */
const codePoints = (s: string) => [...s].length;

/**
 * Mirrors the regex in php/js/site.js, which is what visitors have actually
 * been held to. It differs from PHP's FILTER_VALIDATE_EMAIL at the margins
 * (`a@b.c` passes there, fails here); the client rule is chosen deliberately
 * so both sides agree exactly.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* superRefine rather than chained .refine() so the PHP's if/elseif is
   reproduced: exactly one message per field, first rule wins. */
const nameSchema = z
  .string()
  .trim()
  .superRefine((v, ctx) => {
    const n = codePoints(v);
    if (n === 0) {
      ctx.addIssue({ code: "custom", message: "Please tell us your name." });
    } else if (n < 2 || n > 80) {
      ctx.addIssue({
        code: "custom",
        message: "Please enter your name (2 to 80 characters).",
      });
    }
  });

const phoneSchema = z
  .string()
  .trim()
  .superRefine((v, ctx) => {
    if (v === "") {
      ctx.addIssue({
        code: "custom",
        message: "Please give us a number to call back on.",
      });
      return;
    }
    const digits = v.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) {
      ctx.addIssue({
        code: "custom",
        message: "Please enter a valid phone number.",
      });
    }
  });

/** Optional, but must look like an address when given. */
const emailSchema = z
  .string()
  .trim()
  .refine((v) => v === "" || EMAIL_RE.test(v), {
    message: "That email address does not look right.",
  });

/**
 * Anything not on the offered list was tampered with. Silently reset to the
 * first option rather than erroring — .catch() is exactly PHP's in_array()
 * fallback, and it never produces a user-visible message.
 */
const topicSchema = z.string().trim().pipe(z.enum(TOPICS).catch(TOPICS[0]));

/** Silently truncated at 2000 code points, never an error. */
const detailsSchema = z
  .string()
  .trim()
  .transform((v) =>
    codePoints(v) > 2000 ? [...v].slice(0, 2000).join("") : v,
  );

export const enquirySchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  topic: topicSchema,
  details: detailsSchema,
});

export type Enquiry = z.infer<typeof enquirySchema>;

/**
 * Per-field validators for the client, derived from the same schema so the
 * two can never drift. Mirrors the RULES object in php/js/site.js: name,
 * phone and email only — topic and details are coerced by the server rather
 * than rejected, so there is nothing to warn the visitor about.
 */
const FIELD = { name: nameSchema, phone: phoneSchema, email: emailSchema };

export type CheckedField = keyof typeof FIELD;

export function checkField(field: CheckedField, value: string): string | null {
  const result = FIELD[field].safeParse(value);
  return result.success ? null : (result.error.issues[0]?.message ?? null);
}
