/**
 * Checks the enquiry pipeline against the behaviour of
 * php/include/form-handler.php and the existing CSV on the PHP box.
 *
 *   bun run verify:enquiry
 */

import assert from "node:assert/strict";
import { readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkField, enquirySchema, TOPICS } from "../src/lib/enquiry/schema";

let failures = 0;
function check(label: string, fn: () => void) {
  try {
    fn();
    console.log(`  ok    ${label}`);
  } catch (error) {
    failures++;
    console.error(`  FAIL  ${label}\n        ${(error as Error).message}`);
  }
}

console.log("\nValidation rules (form-handler.php lines 100-136)");

check("name: empty is rejected with the PHP's wording", () => {
  assert.equal(checkField("name", ""), "Please tell us your name.");
});
check("name: 1 char rejected, 2 accepted", () => {
  assert.equal(
    checkField("name", "A"),
    "Please enter your name (2 to 80 characters).",
  );
  assert.equal(checkField("name", "Al"), null);
});
check("name: 80 accepted, 81 rejected (by code point)", () => {
  assert.equal(checkField("name", "x".repeat(80)), null);
  assert.notEqual(checkField("name", "x".repeat(81)), null);
});
check("phone: empty rejected", () => {
  assert.equal(
    checkField("phone", ""),
    "Please give us a number to call back on.",
  );
});
check("phone: 10-13 digits after stripping non-digits", () => {
  assert.equal(
    checkField("phone", "9".repeat(9)),
    "Please enter a valid phone number.",
  );
  assert.equal(checkField("phone", "9".repeat(10)), null);
  assert.equal(checkField("phone", "+91 81799 64276"), null); // 13 digits
  assert.notEqual(checkField("phone", "9".repeat(14)), null);
});
check("email: optional when blank, validated when given", () => {
  assert.equal(checkField("email", ""), null);
  assert.equal(
    checkField("email", "nope"),
    "That email address does not look right.",
  );
  assert.equal(checkField("email", "a@b.co"), null);
});

console.log("\nSilent coercions (never user-visible errors)");

check("topic: a tampered value resets to the first option", () => {
  const r = enquirySchema.safeParse({
    name: "Al",
    phone: "9876543210",
    email: "",
    topic: "<script>",
    details: "",
  });
  assert.ok(r.success);
  assert.equal(r.data.topic, TOPICS[0]);
});
check("topic: every offered value round-trips", () => {
  for (const t of TOPICS) {
    const r = enquirySchema.safeParse({
      name: "Al",
      phone: "9876543210",
      email: "",
      topic: t,
      details: "",
    });
    assert.ok(r.success);
    assert.equal(r.data.topic, t);
  }
});
check("details: truncated at 2000, not rejected", () => {
  const r = enquirySchema.safeParse({
    name: "Al",
    phone: "9876543210",
    email: "",
    topic: TOPICS[0],
    details: "x".repeat(2500),
  });
  assert.ok(r.success);
  assert.equal([...r.data.details].length, 2000);
});

console.log("\nCSV format vs the existing PHP log");

const tmp = join(tmpdir(), `tsi-verify-${Date.now()}`, "enquiries.csv");
process.env.ENQUIRY_LOG_PATH = tmp;
const { appendEnquiry, timestampIST } = await import(
  "../src/lib/enquiry/store"
);

check("header matches the PHP log byte for byte", () => {
  appendEnquiry({
    submitted_at: "2026-09-04 13:53:53",
    name: "John",
    phone: "+917376834642",
    email: "vishalmauryaab@gmail.com",
    topic: "Income tax return filing",
    details: "",
    ip: "::1",
  });
  const written = readFileSync(tmp, "utf8").split("\n");
  const phpHeader = readFileSync(
    join(import.meta.dirname, "../../php/data/enquiries.csv"),
    "utf8",
  )
    .split("\n")[0]
    .replace(/\r$/, "");
  assert.equal(written[0], phpHeader);
});

check("row quoting matches PHP fputcsv", () => {
  const written = readFileSync(tmp, "utf8").split("\n")[1];
  assert.equal(
    written,
    '"2026-09-04 13:53:53",John,+917376834642,vishalmauryaab@gmail.com,"Income tax return filing",,::1',
  );
});

check("a second append does not repeat the header", () => {
  appendEnquiry({
    submitted_at: "2026-09-05 09:00:00",
    name: "Priya",
    phone: "9876543210",
    email: "",
    topic: "Payroll, PF & ESI compliance",
    details: "line one\nline two",
    ip: "203.0.113.9",
  });
  const lines = readFileSync(tmp, "utf8").trim().split("\n");
  assert.equal(lines.filter((l) => l.startsWith("submitted_at")).length, 1);
});

check("timestamp is IST and ISO-shaped", () => {
  assert.match(timestampIST(), /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
});

rmSync(join(tmp, ".."), { recursive: true, force: true });

console.log(
  failures === 0
    ? "\n✓ enquiry pipeline matches the PHP behaviour\n"
    : `\n✗ ${failures} check(s) failed\n`,
);
process.exit(failures === 0 ? 0 : 1);
