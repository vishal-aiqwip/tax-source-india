import { Icon } from "@/components/Icon";
import { site } from "@/lib/config";
import { telHref, waHref } from "@/lib/urls";

/**
 * Sticky call / WhatsApp bar. Mobile only — hidden at the nav breakpoint,
 * so no JavaScript is involved.
 * Ported from php/include/sections/call-bar.php.
 *
 * Gated behind flags.showCallBar in <Shell>.
 */
export function CallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2.5 border-t border-line bg-white px-4 py-2.5 shadow-[0_-8px_24px_-16px_rgba(10,35,64,0.5)] nav:hidden">
      <a
        href={telHref(site.phoneRaw)}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand text-base font-semibold text-white"
      >
        <Icon name="phone" className="w-[18px] h-[18px]" />
        Call now
      </a>
      <a
        href={waHref()}
        target="_blank"
        rel="noopener"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line-strong bg-white text-base font-semibold text-navy"
      >
        <Icon name="chat" className="w-[18px] h-[18px]" />
        WhatsApp
      </a>
    </div>
  );
}
