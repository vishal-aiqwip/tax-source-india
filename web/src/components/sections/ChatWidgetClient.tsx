"use client";

import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

interface ChatWidgetClientProps {
  /** 'bottom-[82px]' when the call bar is on, else 'bottom-[26px]'. */
  bottomClass: string;
  waBase: string;
  placeholder: string;
  /** Server-rendered header, greeting and first message. */
  header: ReactNode;
  greeting: ReactNode;
  firstMessage: ReactNode;
  closeIcon: ReactNode;
  sendIcon: ReactNode;
  chatIcon: ReactNode;
  toggleCloseIcon: ReactNode;
}

/**
 * Floating chat widget. Submitting a message hands off to WhatsApp with the
 * text prefilled — same behaviour as the source design.
 * Ported from php/include/sections/chat-widget.php and js/site.js lines 32-66.
 *
 * Owns the outer positioning div because both the panel and the toggle button
 * depend on the open state.
 */
export function ChatWidgetClient({
  bottomClass,
  waBase,
  placeholder,
  header,
  greeting,
  firstMessage,
  closeIcon,
  sendIcon,
  chatIcon,
  toggleCloseIcon,
}: ChatWidgetClientProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = message.trim();
    if (text === "") return;
    window.open(
      `${waBase}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener",
    );
    setMessage("");
  }

  return (
    <div
      className={`fixed right-[22px] ${bottomClass} z-60 flex flex-col items-end gap-3 nav:bottom-[26px]`}
    >
      {/* An explicit height is what gives the message area room: it is the
          flex-grow child, so without one the panel collapses to the height of
          whatever messages it currently holds. max-h keeps it clear of the
          toggle button below and the viewport edge above on short screens. */}
      <div
        id="chat-panel"
        hidden={!open}
        className="flex h-[540px] max-h-[calc(100vh-130px)] w-[390px] max-w-[calc(100vw-44px)] min-h-0 flex-col overflow-hidden rounded-[20px] bg-linear-to-b from-brand to-[#2E86E0] shadow-[0_34px_64px_-22px_rgba(10,35,64,0.5)]"
      >
        <div className="flex min-h-0 shrink flex-col gap-[22px] overflow-hidden px-5 pt-[18px] pb-[26px] [@media(height<560px)]:gap-3 [@media(height<560px)]:pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="font-display text-base font-bold tracking-[-0.01em] text-white">
              {header}
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex shrink-0 cursor-pointer p-0.5 text-white"
            >
              {closeIcon}
            </button>
          </div>
          {/* Decorative greeting. On a short viewport (landscape phones) the
              panel is height-capped, and this block would leave the message
              area unusable, so it goes and the title bar carries the header. */}
          {greeting}
        </div>

        <div className="mx-1.5 mb-1.5 flex min-h-0 grow flex-col rounded-[20px] bg-white">
          <div className="flex min-h-0 grow flex-col gap-3.5 overflow-y-auto px-[18px] pt-5 pb-2">
            {firstMessage}
          </div>

          <form
            id="chat-form"
            onSubmit={onSubmit}
            className="flex shrink-0 items-center gap-2.5 px-3.5 pt-3 pb-3.5"
          >
            <label htmlFor="chat-input" className="sr-only">
              Message
            </label>
            <input
              type="text"
              id="chat-input"
              name="message"
              autoComplete="off"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={placeholder}
              className="h-[46px] min-w-0 grow rounded-[10px] border border-line-soft bg-[#F5F8FC] px-3.5 text-[14.5px] text-ink"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-[46px] w-[46px] shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-brand p-0 text-white transition-colors hover:bg-brand-dark"
            >
              {sendIcon}
            </button>
          </form>
        </div>
      </div>

      <button
        type="button"
        id="chat-toggle"
        ref={toggleRef}
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat with us"
        aria-expanded={open}
        aria-controls="chat-panel"
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-brand p-0 text-white shadow-[0_14px_30px_-12px_rgba(20,102,190,0.7)] transition-colors hover:bg-brand-dark"
      >
        <span hidden={open}>{chatIcon}</span>
        <span hidden={!open}>{toggleCloseIcon}</span>
      </button>
    </div>
  );
}
