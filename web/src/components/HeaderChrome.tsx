"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { SiteLink } from "@/components/SiteLink";

interface DrawerLink {
  label: string;
  href: string;
}

interface HeaderChromeProps {
  /** Logo, desktop nav and desktop actions — rendered on the server and
   *  passed through, so the icon registry never reaches the client bundle. */
  children: ReactNode;
  /** The phone button that sits beside the menu toggle on mobile. */
  mobilePhone: ReactNode;
  menuIcon: ReactNode;
  drawerLinks: readonly DrawerLink[];
  contactHref: string;
}

/**
 * Owns <header> and the drawer's open state.
 *
 * This component holds the whole header element rather than just the toggle
 * because the drawer is a *sibling* of the inner container in the original
 * markup (php/include/header.php), not a child of it — nesting it inside
 * would make it a flex item of the header bar. Everything static still
 * renders on the server and arrives here as ReactNode.
 *
 * Behaviour ported from php/js/site.js lines 9-30, plus the Escape handling
 * from lines 314-326.
 */
export function HeaderChrome({
  children,
  mobilePhone,
  menuIcon,
  drawerLinks,
  contactHref,
}: HeaderChromeProps) {
  const [open, setOpen] = useState(false);
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

  const last = drawerLinks.length - 1;

  return (
    <header className="sticky top-0 z-40 border-b border-[#E2E9F1] bg-page/95 backdrop-blur-[8px]">
      <div className="mx-auto flex min-h-[84px] max-w-[1160px] items-center gap-8 px-6">
        {children}

        {/* mobile actions */}
        <div className="flex items-center gap-2.5 nav:hidden">
          {mobilePhone}
          <button
            type="button"
            id="menu-toggle"
            ref={toggleRef}
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-lg border border-line-strong bg-white"
          >
            {menuIcon}
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="flex flex-col border-t border-[#E2E9F1] bg-page px-6 pt-3 pb-5 nav:hidden"
      >
        {drawerLinks.map((link, i) => (
          <SiteLink
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`py-3.5 text-base font-semibold text-navy${
              i === last ? "" : " border-b border-[#E6EDF4]"
            }`}
          >
            {link.label}
          </SiteLink>
        ))}
        <SiteLink
          href={contactHref}
          onClick={() => setOpen(false)}
          className="mt-3.5 inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-lg bg-brand px-6 py-4 text-base font-semibold text-white"
        >
          Book a free consultation
        </SiteLink>
      </div>
    </header>
  );
}
