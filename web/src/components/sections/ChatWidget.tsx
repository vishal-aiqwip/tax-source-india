import { Icon } from "@/components/Icon";
import { ChatWidgetClient } from "@/components/sections/ChatWidgetClient";
import { site } from "@/lib/config";
import { flags } from "@/lib/flags";

const GREETING = "Hey there!";
const FIRST_MSG = "Hi, we are Tax Source India. How can we help you today?";
const PLACEHOLDER = "Type a message...";

/**
 * Server half of the chat widget: resolves copy and renders every icon, so
 * the client bundle carries none of the icon registry.
 * Ported from php/include/sections/chat-widget.php.
 *
 * Gated behind flags.showChat in <Shell>.
 */
export function ChatWidget() {
  // On mobile `bottom` lifts clear of the sticky call bar, when that is enabled.
  const bottomClass = flags.showCallBar ? "bottom-[82px]" : "bottom-[26px]";

  return (
    <ChatWidgetClient
      bottomClass={bottomClass}
      waBase={`https://wa.me/${site.whatsapp}`}
      placeholder={PLACEHOLDER}
      header={site.name}
      closeIcon={<Icon name="close" className="w-[18px] h-[18px]" />}
      sendIcon={
        <Icon name="send" className="w-[19px] h-[19px]" strokeWidth={1.9} />
      }
      chatIcon={<Icon name="chat" className="w-[23px] h-[23px]" />}
      toggleCloseIcon={
        <Icon name="close" className="w-[21px] h-[21px]" strokeWidth={2.2} />
      }
      greeting={
        <div className="flex flex-col gap-2.5 [@media(height<560px)]:hidden">
          <Icon
            name="wave"
            className="w-[26px] h-[26px] text-[#CFE4FA]"
            strokeWidth={1.7}
          />
          <div className="font-display text-[27px] leading-tight font-bold tracking-[-0.02em] text-white">
            {GREETING}
          </div>
        </div>
      }
      firstMessage={
        <div className="flex items-start gap-[11px]">
          {/* biome-ignore lint/performance/noImgElement: next/image is deliberately unused — see §8 of docs/nextjs-migration-plan.md */}
          <img
            src="/images/logo-mark.png"
            alt=""
            width="34"
            height="34"
            loading="lazy"
            className="block h-[34px] w-[34px] shrink-0 rounded-full"
          />
          <div className="rounded-xl border border-line-soft bg-white px-3.5 py-3 shadow-[0_6px_14px_-10px_rgba(10,35,64,0.35)]">
            <p className="text-[14.5px] leading-normal text-ink">{FIRST_MSG}</p>
          </div>
        </div>
      }
    />
  );
}
