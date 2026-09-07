/**
 * Feature flags. Ported from the three toggles in php/include/config.php.
 *
 * These were runtime config there (overridable from config.local.php); here
 * they are build-time constants, so flipping one is a rebuild and redeploy.
 * All three are off and likely to stay that way, which is why that trade is
 * acceptable. If runtime toggling is ever needed, read process.env in Shell
 * (a Server Component) instead — but pair it with `export const dynamic =
 * 'force-dynamic'` or the value gets baked in at prerender time anyway.
 *
 * `satisfies` without `as const` keeps the type as `boolean`, so TypeScript
 * does not mark the guarded JSX unreachable while every flag is false.
 */
export const flags = {
  /** The logo wall ships with generic placeholder marks. Turn this on once
   *  real client logos are supplied and added to public/images/. */
  showLogoWall: false,
  /** Sticky mobile call/WhatsApp bar. */
  showCallBar: false,
  /** Floating chat button; hands off to WhatsApp. Repositions itself when the
   *  call bar is on. */
  showChat: false,
} satisfies Record<string, boolean>;
