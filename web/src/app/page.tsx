import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { Audience } from "@/components/sections/Audience";
import { Contact } from "@/components/sections/Contact";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { LogoWall } from "@/components/sections/LogoWall";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyUs } from "@/components/sections/WhyUs";
import { JsonLd } from "@/components/seo/JsonLd";
import { flags } from "@/lib/flags";
import { pageMetadata } from "@/lib/seo";

const TITLE =
  "Tax Source India — Chartered Accountants in Bengaluru | GST, ITR & Company Filings";
const DESCRIPTION =
  "GST, income tax and company filings for Bengaluru, handled end to end by chartered accountants. Fixed quotes, one named contact, Church Street office. Book a free consultation.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/",
});

/** Section order from the source design — php/pages/home.php. */
export default function HomePage() {
  return (
    <Shell page="home">
      <JsonLd description={DESCRIPTION} />
      <Hero />
      {flags.showLogoWall && <LogoWall />}
      <Audience />
      <Services />
      <WhyUs />
      <Process />
      <Testimonials />
      <Faq />
      <Contact />
      <CtaBand page="home" />
    </Shell>
  );
}
