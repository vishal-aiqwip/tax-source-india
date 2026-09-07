import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/config";
import { telHref } from "@/lib/urls";

/**
 * Contact details plus the enquiry form.
 * Ported from php/include/sections/contact.php.
 *
 * A Server Component wrapping one client island: only the <form> subtree
 * needs state, so the headings and the details list never reach the browser.
 */

const EYEBROW = "Come see us";
const HEADING = "On Church Street, HAL 3rd Stage";
const INTRO =
  "Walk in with your documents, or start the conversation on the phone. Either way you speak to the person who will handle your file.";

const FORM = {
  title: "Ask us anything",
  sub: "Tell us what you need and we will come back with a fixed quote.",
  privacy: "Your details stay with us and are never shared.",
  submit: "Request a callback",
};

const ICON_CLASS = "w-[21px] h-[21px] shrink-0 mt-0.5 text-brand";
const ROW_CLASS = "flex items-start gap-4 border-t border-[#E6EDF4] py-[18px]";
const DT_CLASS =
  "text-[13px] font-bold tracking-[0.08em] text-muted-2 uppercase";
const DD_CLASS = "text-base leading-[1.55] text-ink";

export function Contact() {
  const addr = site.address;

  return (
    <section
      id="contact"
      className="scroll-mt-[90px] bg-white px-6 py-[clamp(56px,6vw,88px)]"
    >
      <div className="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-start gap-[clamp(32px,4vw,60px)]">
        {/* details */}
        <div className="flex min-w-0 flex-col gap-[26px]">
          <div className="flex flex-col gap-3.5">
            <div className="eyebrow text-brand">{EYEBROW}</div>
            <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-extrabold">
              {HEADING}
            </h2>
            <p className="text-[17px] leading-[1.65] text-muted">{INTRO}</p>
          </div>

          <dl className="flex flex-col">
            <div className={ROW_CLASS}>
              <Icon name="map-pin" className={ICON_CLASS} strokeWidth={1.9} />
              <div className="flex flex-col gap-1">
                <dt className={DT_CLASS}>Office</dt>
                <dd className={DD_CLASS}>
                  {addr.line1}
                  <br />
                  {addr.line2}
                  <br />
                  {addr.line3}
                </dd>
              </div>
            </div>

            <div className={ROW_CLASS}>
              <Icon name="phone" className={ICON_CLASS} strokeWidth={1.9} />
              <div className="flex flex-col gap-1">
                <dt className={DT_CLASS}>Phone</dt>
                <dd className={DD_CLASS}>
                  <a
                    href={telHref(site.phoneRaw)}
                    className="text-ink hover:text-brand"
                  >
                    {site.phone}
                  </a>
                  {" · "}
                  <a
                    href={telHref(site.phoneAltRaw)}
                    className="text-ink hover:text-brand"
                  >
                    {site.phoneAlt}
                  </a>
                </dd>
              </div>
            </div>

            <div className={ROW_CLASS}>
              <Icon name="mail" className={ICON_CLASS} strokeWidth={1.9} />
              <div className="flex flex-col gap-1">
                <dt className={DT_CLASS}>Email</dt>
                <dd className={DD_CLASS}>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-ink hover:text-brand"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4 border-y border-[#E6EDF4] py-[18px]">
              <Icon name="clock" className={ICON_CLASS} strokeWidth={1.9} />
              <div className="flex flex-col gap-1">
                <dt className={DT_CLASS}>Hours</dt>
                <dd className={DD_CLASS}>{site.hoursLabel}</dd>
              </div>
            </div>
          </dl>
        </div>

        {/* form */}
        <div className="flex min-w-0 flex-col gap-5 rounded-[14px] border border-line bg-page p-[clamp(24px,3vw,34px)]">
          <div className="flex flex-col gap-[7px]">
            <h2 className="text-2xl font-extrabold">{FORM.title}</h2>
            <p className="text-[15px] leading-relaxed text-muted">{FORM.sub}</p>
          </div>

          <EnquiryForm
            submitLabel={FORM.submit}
            privacyNote={FORM.privacy}
            lockIcon={
              <Icon name="lock" className="w-[15px] h-[15px] text-[#788897]" />
            }
          />
        </div>
      </div>
    </section>
  );
}
