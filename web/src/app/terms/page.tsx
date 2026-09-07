import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Shell } from "@/components/Shell";
import { SiteLink } from "@/components/SiteLink";
import { site } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import { ROUTES } from "@/lib/urls";

/**
 * ┌─ REVIEW BEFORE GOING LIVE ────────────────────────────────────────────┐
 * │ PLACEHOLDER. This is not legal text. Replace the body below with the  │
 * │ practice's own terms of service before publishing.                    │
 * └───────────────────────────────────────────────────────────────────────┘
 *
 * Ported from php/pages/terms.php.
 */

const TITLE = "Terms of service — Tax Source India";
const DESCRIPTION =
  "The terms on which Tax Source India provides accounting, tax and compliance services.";

/**
 * The PHP rendered date('j F Y'), so "Last updated" claimed today's date on
 * every single request — the document has not changed, and saying otherwise
 * is misleading. Pinned to a constant; bump it when the terms actually change.
 */
const LAST_UPDATED = "7 September 2026";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/terms",
});

const SECTIONS = [
  {
    heading: "Scope of engagement",
    body: "We agree the specific work in writing before we start, along with a fixed fee for it. Anything outside that scope is quoted separately. A quote covers the service described in it and nothing beyond.",
  },
  {
    heading: "Fees and payment",
    body: "Fees are fixed per piece of work and quoted before the work begins. We do not bill by the hour. Statutory fees, government charges and third-party costs are passed on at cost and are payable in addition to our fee.",
  },
  {
    heading: "What we need from you",
    body: "We rely on the documents and information you give us being complete and accurate. Returns and filings are prepared on that basis. Where a deadline applies, we need your documents in good time before it; we will tell you what that means for your filing.",
  },
  {
    heading: "Responsibility",
    body: "We take professional responsibility for the work we carry out. We are not responsible for consequences arising from information that was withheld, incorrect or provided too late for a deadline, nor for changes in law or departmental practice after a filing is made.",
  },
  {
    heading: "Ending an engagement",
    body: "Either of us may end an engagement in writing. Fees for work already carried out remain payable, and we will hand over your documents and the records of filings made on your behalf.",
  },
  {
    heading: "Governing law",
    body: "These terms are governed by the laws of India, and the courts at Bengaluru, Karnataka have jurisdiction over any dispute arising from them.",
  },
];

export default function TermsPage() {
  return (
    <Shell page="terms">
      <section className="bg-white px-6 py-[clamp(48px,5vw,80px)]">
        <div className="mx-auto max-w-[760px]">
          <div className="mb-10 flex flex-col gap-3.5 border-b border-line pb-8">
            <div className="eyebrow text-brand">Legal</div>
            <h1 className="text-[clamp(30px,3.6vw,42px)] leading-[1.12] font-extrabold">
              Terms of service
            </h1>
            <p className="text-[15px] text-muted-2">
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          <div className="flex flex-col gap-7">
            {/* Scope, fees, what we need, responsibility */}
            {SECTIONS.slice(0, 4).map((s) => (
              <div key={s.heading} className="flex flex-col gap-3">
                <h2 className="text-[22px] font-bold">{s.heading}</h2>
                <p className="text-[16px] leading-[1.7] text-muted">{s.body}</p>
              </div>
            ))}

            {/* Carries an inline link, so it is written out rather than looped. */}
            <div className="flex flex-col gap-3">
              <h2 className="text-[22px] font-bold">Confidentiality</h2>
              <p className="text-[16px] leading-[1.7] text-muted">
                Everything you share with us is confidential and is used only to
                carry out your work or where a statutory filing or the law
                requires disclosure. See our{" "}
                <SiteLink
                  href={ROUTES.privacy}
                  className="font-semibold text-brand"
                >
                  privacy policy
                </SiteLink>{" "}
                for how we handle your information.
              </p>
            </div>

            {/* Ending an engagement, governing law */}
            {SECTIONS.slice(4).map((s) => (
              <div key={s.heading} className="flex flex-col gap-3">
                <h2 className="text-[22px] font-bold">{s.heading}</h2>
                <p className="text-[16px] leading-[1.7] text-muted">{s.body}</p>
              </div>
            ))}

            <div className="flex flex-col gap-3">
              <h2 className="text-[22px] font-bold">Questions</h2>
              <p className="text-[16px] leading-[1.7] text-muted">
                Write to{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-brand"
                >
                  {site.email}
                </a>{" "}
                or call {site.phone}.
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-line pt-8">
            <SiteLink
              href={ROUTES.home}
              className="inline-flex items-center gap-2 font-bold text-brand hover:text-brand-dark"
            >
              <Icon
                name="arrow-right"
                className="w-[17px] h-[17px] rotate-180"
                strokeWidth={2.4}
              />
              Back to the home page
            </SiteLink>
          </div>
        </div>
      </section>
    </Shell>
  );
}
