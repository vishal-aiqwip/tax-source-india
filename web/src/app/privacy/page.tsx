import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Shell } from "@/components/Shell";
import { SiteLink } from "@/components/SiteLink";
import { site } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import { ROUTES, telHref } from "@/lib/urls";
import Link from "next/link";

/**
 * Privacy policy — supplied by the practice, effective 01 April 2024.
 * Ported from php/pages/privacy.php.
 *
 * This is the practice's real document. (The terms page, by contrast, is a
 * placeholder.) Sections follow the source document's numbering.
 */

const TITLE = "Privacy policy — Tax Source India";
const DESCRIPTION =
  "How Tax Source India collects, uses and protects the personal information you share with us.";

const EFFECTIVE = "01 April 2024";

/** Section 2: each subgroup is a label plus its bullets. */
const COLLECTED: { label: string; items: string[] }[] = [
  {
    label: "Personal Identification Information",
    items: ["Name", "Email address", "Phone number", "Address"],
  },
  {
    label: "Financial Information",
    items: ["Payment details (e.g., credit card information)"],
  },
  {
    label: "Technical Data",
    items: [
      "IP address",
      "Browser type and version",
      "Time zone setting",
      "Browser plug-in types and versions",
      "Operating system and platform",
      "Device information",
    ],
  },
  {
    label: "Usage Data",
    items: ["Information about how you use our Site, products, and services"],
  },
];

const USES = [
  "To provide and maintain our services",
  "To notify you about changes to our services",
  "To allow you to participate in interactive features of our service",
  "To provide customer support",
  "To gather analysis or valuable information to improve our Site",
  "To monitor the usage of our Site",
  "To detect, prevent, and address technical issues",
  "To fulfill any other purpose for which you provide it",
  "To carry out our obligations and enforce our rights arising from any contracts entered into between you and us",
];

const SHARING = [
  "With your consent",
  "To comply with a legal obligation",
  "To protect and defend our rights or property",
  "To prevent or investigate possible wrongdoing in connection with our services",
  "To protect the personal safety of users of our services or the public",
  "If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred",
];

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/privacy",
});

/** A bulleted list in the document's style. */
function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-[16px] leading-[1.7] text-muted"
        >
          <span className="mt-[10px] h-[5px] w-[5px] shrink-0 rounded-full bg-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <Shell page="privacy">
      <section className="bg-white px-6 py-[clamp(48px,5vw,80px)]">
        <div className="mx-auto max-w-[760px]">
          <div className="mb-10 flex flex-col gap-3.5 border-b border-line pb-8">
            <div className="eyebrow text-brand">Legal</div>
            <h1 className="text-[clamp(30px,3.6vw,42px)] leading-[1.12] font-extrabold">
              Privacy policy
            </h1>
            <p className="text-[15px] text-muted-2">
              Effective date: {EFFECTIVE}
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <section className="flex flex-col gap-4">
              <h2 className="text-[22px] font-bold">1. Introduction</h2>
              <p className="text-[16px] leading-[1.7] text-muted">
                Welcome to {site.name}. We are committed to protecting your
                personal information and your right to privacy. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website{" "}
                <Link
                  href="https://www.taxsourceindia.com"
                  className="font-semibold text-brand hover:text-brand-dark"
                >
                  www.taxsourceindia.com
                </Link>
                {" "}
                (the “Site”). Please read this policy carefully to understand
                our views and practices regarding your personal data and how we
                will treat it.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-[22px] font-bold">
                2. Information We Collect
              </h2>
              <p className="text-[16px] leading-[1.7] text-muted">
                We may collect and process the following data about you:
              </p>
              <div className="flex flex-col gap-6 pt-1">
                {COLLECTED.map((group) => (
                  <div
                    key={group.label}
                    className="flex flex-col gap-3 rounded-[14px] border border-line bg-page px-6 py-5"
                  >
                    <h3 className="text-[17px] font-bold">{group.label}</h3>
                    <List items={group.items} />
                  </div>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-[22px] font-bold">
                3. How We Use Your Information
              </h2>
              <p className="text-[16px] leading-[1.7] text-muted">
                We use the information we collect in the following ways:
              </p>
              <List items={USES} />
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-[22px] font-bold">
                4. Sharing Your Information
              </h2>
              <p className="text-[16px] leading-[1.7] text-muted">
                We do not share your personal information with third parties
                except in the following circumstances:
              </p>
              <List items={SHARING} />
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-[22px] font-bold">5. Data Security</h2>
              <p className="text-[16px] leading-[1.7] text-muted">
                We use administrative, technical, and physical security measures
                to protect your personal information. While we have implemented
                measures to secure your personal information, please be aware
                that no method of internet transmission or electronic storage is
                completely secure.
              </p>
            </section>
          </div>

          <div className="mt-12 flex flex-col gap-3 rounded-[14px] border border-line bg-page px-6 py-5">
            <h2 className="text-[17px] font-bold">
              Questions about this policy
            </h2>
            <p className="text-[15px] leading-[1.7] text-muted">
              Write to{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-brand hover:text-brand-dark"
              >
                {site.email}
              </a>{" "}
              or call{" "}
              <a
                href={telHref(site.phoneRaw)}
                className="font-semibold text-brand hover:text-brand-dark"
              >
                {site.phone}
              </a>
              .
            </p>
          </div>

          <div className="mt-10 border-t border-line pt-8">
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
