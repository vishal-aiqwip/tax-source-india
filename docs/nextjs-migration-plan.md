# Port the Tax Source India site from PHP to Next.js

## Context

[php/](../php/) is a hand-built marketing and lead-generation site for a Bengaluru accounting
practice: plain PHP, no Composer, no framework, Tailwind v4.3.3, ~2,000 lines of non-vendor
code. It works, and a lot of deliberate SEO and anti-spam thinking is baked into it —
see [README.md](../php/README.md).

We are moving it to Next.js so the site is built on a stack we can maintain with the rest of
our tooling, with typed content, a real component model, and a build that catches mistakes
the PHP version could only catch by eye. The site is also being deployed to a **Hostinger
VPS**, which gives us a Node runtime and removes the reason the PHP version existed
(shared-hosting constraints).

Four decisions frame the work:

| | |
|---|---|
| **Host** | Hostinger VPS — `next start` behind a reverse proxy, one process |
| **Form** | Server Action + Nodemailer + SMTP |
| **Scope** | **Faithful 1:1 port.** Same rendered output, copy, tokens, SEO tags, URLs. No redesign. |
| **Location** | New `web/` alongside `php/`, which stays working until cutover |

**Success is: visually indistinguishable, no SERP regression, and not one lost lead.**
The current site has real Google presence and a live enquiry pipeline; both must survive
the switch. Everything below is ordered so that a mistake shows up in a diff rather than
in Search Console six weeks later.

Out of scope: the README's *"Before this goes live"* list (unverified testimonials,
placeholder terms, `aggregateRating`, footer social links). Those are content decisions for
the practice — carry them across **with their warning comments intact** and leave them as
they are.

---

## What we are porting

| PHP | Next |
|---|---|
| `index.php` whitelist router + `.htaccess` pretty URLs | App Router filesystem routing |
| `include/layout.php` + `head.php` | `app/layout.tsx` + Metadata API |
| `include/content.php` (434 lines, all copy) | `lib/content.ts`, typed, `as const` |
| `include/config.php` + `config.local.php` | `lib/config.ts` + env vars |
| `include/functions.php` (11 helpers) | `lib/urls.ts`, `lib/text.ts`, `<Icon>` |
| `include/icons.php` (36 SVGs) | `lib/icons.tsx` data map |
| `include/sections/*.php` (12) | `components/sections/*.tsx` |
| `pages/*.php` (5) | `app/*/page.tsx` + `not-found.tsx` |
| `style/input.css` (Tailwind v4) | `app/globals.css` — ~95% verbatim |
| `js/site.js` (5 behaviours) | 3 client islands |
| `form-handler.php` + `mailer.php` | Server Action + Zod + Nodemailer |
| `robots.php` / `sitemap.php` | `app/robots.ts` / `app/sitemap.ts` |
| `.htaccess` | split: `next.config.ts` + nginx |

---

## 1. Scaffold

**Done.** The repo had no `package.json` anywhere — the README's `npm run css` / `npm run
images` scripts were never committed — so `web/package.json` is the first one.

As actually scaffolded (differs from the original plan; these are the facts to build on):

| | |
|---|---|
| **Next 16.3.4**, React 19.2.8, Turbopack | not Next 15 — see the version-16 notes below |
| **`src/` directory** | so `src/app`, `src/components`, `src/lib` |
| **Biome 2.4.2**, not ESLint | `bun run lint` / `bun run format` |
| **Bun 1.2.21** as package manager | `bun add`, `bun run`, `bunx` |
| **React Compiler** on | `reactCompiler: true` in `next.config.ts` |
| **shadcn/ui** on Radix, `radix-nova` preset | see §7 |
| CSS at **`src/styles/globals.css`** | not `src/app/` — shadcn relocated it |

```
web/
  package.json  tsconfig.json  next.config.ts  postcss.config.mjs
  biome.json  components.json  proxy.ts  .env.example
  src/
    styles/globals.css       # @import tailwindcss + shadcn/tailwind.css
    app/
      layout.tsx  page.tsx
      privacy/page.tsx  terms/page.tsx  thank-you/page.tsx
      not-found.tsx  sitemap.ts  robots.ts
    components/
      ui/                    # shadcn: button input select field label textarea separator
      Shell.tsx  Header.tsx  Footer.tsx  MobileNav.tsx  Icon.tsx
      sections/   Hero  LogoWall  Audience  Services  WhyUs  Process
                  Testimonials  Faq  Contact  CtaBand  CallBar  ChatWidget
      contact/    EnquiryForm.tsx  TopicSelect.tsx
      seo/JsonLd.tsx
    lib/
      utils.ts               # shadcn: re-exports cn
      content.ts  config.ts  flags.ts  icons.tsx  urls.ts  text.ts
      enquiry/  schema.ts  actions.ts  store.ts  mailer.ts  spam.ts
  public/images/*        # optimised outputs — same URLs as today
  images-src/*           # sharp originals, never served
  tools/optimise-images.mjs
  scripts/               # the verification harness (§11)
```

Tailwind v4 needs no `tailwind.config.js` and no autoprefixer:
`postcss.config.mjs` → `{ plugins: { '@tailwindcss/postcss': {} } }`.

Installed: `next`, `react`, `react-dom`, `radix-ui`, `class-variance-authority`, `cn`,
`lucide-react`, `tw-animate-css`, `shadcn`.
Still to add: `nodemailer`, `zod`, and dev `sharp` / `cheerio` / `@playwright/test` /
`pixelmatch` for §11. `sharp` stays a **devDependency** — we are not using `next/image` (§8).

### Next 16 changes that hit this plan

Next 16 ships its own docs at `web/node_modules/next/dist/docs/` and an `AGENTS.md` telling
you to read them before writing code. Two changes bite directly:

- **`middleware.ts` → `proxy.ts`**, and the exported function renames `middleware` → `proxy`.
  The `edge` runtime is not supported there; `proxy` is always `nodejs`. That is *better* for
  us — the HMAC timing cookie (§7) uses `node:crypto`.
- **`scroll-behavior: smooth` is no longer overridden during navigation.**
  [input.css](../php/style/input.css) sets it on `html`, so without a fix every route
  transition would smooth-scroll instead of jumping. Add **`data-scroll-behavior="smooth"`**
  to `<html>` in `layout.tsx` to restore the old snappy behaviour. Easy to miss; it only
  shows up when clicking between `/` and `/privacy`.

Also relevant but not yet load-bearing: async `params` for `icon`/`opengraph-image`, async
`id` for `sitemap`, and `next/image` default changes (we are not using `next/image`).

### Two fixes already applied to the scaffold

- **`shadcn init` relocated the stylesheet** to `src/styles/globals.css` but left
  `layout.tsx` importing `./globals.css`, which no longer existed — the build was broken on
  arrival. The import now points at `@/styles/globals.css`, and `components.json`'s stale
  `tailwind.css` path was corrected to match. Worth knowing if anyone re-runs `init`.
- **`src/components/ui/**` is exempt from Biome's linter** (`overrides` in `biome.json`);
  the formatter still runs. shadcn's `field.tsx` trips `useSemanticElements`,
  `noDoubleEquals` and `noArrayIndexKey`, all benign. These are vendored files we do not
  author and that `shadcn add` overwrites, so patching them just defers the noise to the
  next component added.

## Build status — steps 0-10 complete

Ported and verified. `bun run lint`, `bun run typecheck`, `bun run verify:enquiry`
and `bun run build` all pass; all seven routes prerender.

**Two decisions changed during the build, at the user's direction:**

1. **shadcn/ui on Radix** replaces the hand-rolled ARIA listbox (§7).
2. **Copy is inlined into each component**, not centralised in a `content.ts`.
   This retired the content-parity script — but it passed on its final run
   before the move, so the strings were verified correct and the inlining was
   a mechanical relocation. The `REVIEW BEFORE GOING LIVE` warnings moved with
   the content they describe: unverified FAQ answers now sit in
   `sections/Faq.tsx`, the invented testimonials in `sections/Testimonials.tsx`,
   and the placeholder terms in `app/terms/page.tsx`.

### Verification results against the running PHP site

| Check | Result |
|---|---|
| Status / redirect matrix | all 9 correct: real 404, `/privacy-policy` → `/privacy`, `robots.txt` `text/plain`, `sitemap.xml` `application/xml` |
| JSON-LD | **identical** after normalising origin; `aggregateRating` correctly absent |
| Class-name diff, `/privacy` `/terms` `/thank-you` | **1 difference each** — the `next/font` variable class on `<html>` |
| Class-name diff, `/` | 26 differences, all inside the topic-select subtree (Radix mounts its listbox on open; the PHP shipped it hidden in the HTML) plus the submit button's new `disabled:` classes |
| Head / meta tags | every PHP tag reproduced. Next additionally emits a full Twitter card (`twitter:image`, `title`, `description`) where the PHP had only `twitter:card` — an addition, not a regression |
| Enquiry pipeline | 13/13, including the CSV row being **byte-identical** to the existing PHP log row |

**One real bug found and fixed by the meta diff:** Next *replaces* `openGraph`
rather than deep-merging it, so pages that set `{title, description, url}` were
silently dropping `og:image`, `og:type`, `og:site_name` and `og:locale` — every
shared link would have had no preview image, with nothing failing to warn us.
All pages now go through `lib/seo.ts`.

### Still to do

- **§11.5 screenshots** at the seven boundary widths, **§11.9 no-JS pass**,
  **§11.10 keyboard spec**, **§11.12 axe + Lighthouse** — none run yet.
- **Verify the topic select posts `topic` with JavaScript disabled.** Radix
  renders no submitted control of its own; a real `<select name="topic">` is
  kept for this. Confirm it rather than assume it.
- **Step 11: flip all three flags on**, diff LogoWall / CallBar / ChatWidget,
  flip back. Nothing so far exercises them.
- Steps 12-13: full sweep and cutover.

## 2. Content and config

**The entity problem is smaller than it looks.** I grepped every unescaped `<?= $… ?>` in
[include/](../php/include/): the content strings contain only `&amp;` (24×) and `&middot;` (2×) —
**never a tag**. So content becomes plain Unicode text and React's auto-escaping reproduces
it. No `dangerouslySetInnerHTML` anywhere in content rendering.

Entities become their literal character in the `.ts` source: `&amp;`→`&`, `&middot;`→`·`,
`&ndash;`→`–`, `&nbsp;`→` `. React re-escapes `&` to `&amp;`, so that one round-trips
byte-identically; the rest render as raw UTF-8 — same meaning, different bytes.
**The HTML diff in §9 must decode entities on both sides before comparing.**

The two real inline-markup cases are already modelled as split fields —
`hero.heading`/`heading_em` and `why.note_strong`/`note_rest`. Keep both splits verbatim.

`lib/content.ts` — one file, matching the PHP contract of *"the only file to edit when
wording changes"*. **Keep the PHP key names verbatim in snake_case** (`float_card`,
`note_strong`, `logo_wall`, `badge_rating`) so `content.php` ↔ `content.ts` diffs
side-by-side during the transition. Worth the un-idiomatic casing.

```ts
export const content = { … } as const satisfies SiteContent;
```

Every array in the interface must be `readonly` — `as const` yields readonly tuples and a
plain `T[]` will not satisfy them. Add `last_modified: 'YYYY-MM-DD'`, replacing
`filemtime(content.php)` in the sitemap.

**Carry `content.php:6-25`'s `REVIEW BEFORE GOING LIVE` comment into `content.ts` verbatim**,
and `config.php:42-47`'s explanation of why `aggregateRating` is withheld. A mechanical port
drops comments; these two flag unverified tax advice and testimonials invented against real
people's names. Losing them is the worst possible outcome of this migration.

`lib/config.ts` — camelCased, minus what dies: `base_url` (Next serves from root),
`pretty_urls`, `mail`, `enquiry_log`, `config.local.php`. Keep `rating.verified` and its
comment.

`lib/urls.ts` — `page_url`→a `ROUTES` const, `home_anchor(frag, page)`, `telHref`, `waHref`.
`e()` and `asset()` disappear. `site_origin()` becomes
`SITE_ORIGIN = process.env.SITE_URL ?? 'https://taxsourceindia.com'` — the PHP version
derived it from `HTTP_HOST`, which made the canonicals Host-header poisonable.

## 3. Routes and the shell

`app/page.tsx`, `privacy/`, `terms/`, `thank-you/`, `not-found.tsx`. The `index.php`
whitelist becomes the filesystem — a stronger guarantee than the string comparison.

**`app/layout.tsx` holds only** `<html lang="en-IN">`, font variables, `<body>` classes and
the skip link. Header and Footer go in `<Shell page="…">` that each page renders, because
`home_anchor()` ([functions.php:79](../php/include/functions.php#L79)) emits `#services` on home
and `/#services` elsewhere. A root layout cannot know the route; `<Shell page="home">` at
five call sites reproduces `layout.php` exactly without a `usePathname` client boundary.
`Shell` also owns `<main id="main">` and the two flag-gated fixed widgets that
[footer.php:60-66](../php/include/footer.php#L60-L66) appends.

`lib/flags.ts` — `showLogoWall`, `showCallBar`, `showChat`, all `false` today. Use
`satisfies Record<string, boolean>` **without** `as const` so TS doesn't mark the guarded JSX
unreachable. Honest trade-off: flipping a flag is now a rebuild, not a config edit.

**Trailing slashes:** `.htaccess`'s `^([a-z0-9-]+)/?$` serves `/privacy/` as a 200 — two
indexable URLs. Next's default 308s it to `/privacy`. A behaviour change, and a better one.

## 4. Components — server by default, three client islands

The 12 sections map 1:1; `pages/home.php`'s ordered `require` list becomes an ordered JSX
list. Everything is a Server Component except:

1. **`MobileNav`** — drawer toggle ([site.js:9-30](../php/js/site.js#L9-L30))
2. **`TopicSelect`** — the ARIA listbox ([site.js:68-225](../php/js/site.js#L68-L225)), §7
3. **`EnquiryForm`** — `useActionState` + client validation ([site.js:227-312](../php/js/site.js#L227-L312))

`ChatWidget` is a fourth but is flag-gated off. The global Escape handler
([site.js:314-326](../php/js/site.js#L314-L326)) does **not** become its own island — put a
local `keydown` listener in each of the two components it closes.

`Faq` stays a Server Component: [faq.php](../php/include/sections/faq.php) uses native
`<details name="faq">` with zero JS. `CallBar` too — CSS-only via `nav:hidden`.

**Keep the client bundle free of icon data by passing server-rendered icons as props.**
Importing the 36-entry map inside a client component drags all of it into the browser:

```tsx
<EnquiryForm lockIcon={<Icon name="lock" className="…" />} checkIcon={…} />
```

`ReactNode` crosses the boundary fine. Same for `MobileNav`.

Plain `<a>` for hash links (so `scroll-behavior: smooth` + `scroll-mt` work natively);
`<Link>` for the four route links — it emits identical markup.

## 5. Icons

A single `<Icon name>` reading a data map, not 36 components — call sites use **dynamic**
names from content (`card.icon`, `mark.icon`, `social.icon`), and the `<svg>` wrapper plus
stroke/fill paint logic is shared across all 36.

```tsx
// lib/icons.tsx
export const icons = {
  check: { paint: 'stroke', body: <path d="M20 6 9 17l-5-5" /> },
  star:  { paint: 'fill',   body: <path d="M12 2l2.9 6.3…" /> },
} as const satisfies Record<string, { paint: 'stroke' | 'fill'; body: ReactNode }>;
export type IconName = keyof typeof icons;
```

`components/Icon.tsx` reproduces
[functions.php:110-143](../php/include/functions.php#L110-L143): `viewBox="0 0 24 24"`,
`currentColor`, `aria-hidden` unless `aria-label` is given. `body` as JSX, not a string.
`IconName` as a union turns [functions.php:117](../php/include/functions.php#L117)'s silent
`return ''` on an unknown name into a compile error.

Two details to not lose: `mark-5`'s inline `fill="currentColor"` overrides on two `<rect>`s
inside a stroke icon, and PHP's attribute emission order (match it, or have the diff
normaliser sort attributes — it should anyway).

## 6. Styling

[style/input.css](../php/style/input.css) → `app/globals.css`, **~95% verbatim**. Four changes:

**(1) `@source` paths** — the four PHP dirs become:
```css
@import "tailwindcss" source(none);
@source "../app";  @source "../components";  @source "../lib";
```
`../lib` is **not optional**: `content.ts` carries Tailwind classes in
`logo_wall.marks[].weight`/`.tracking`. Omit it and those utilities are silently absent.

**(2) Fonts → `next/font`.** `Instrument_Sans` + `Public_Sans` as CSS variables consumed by
`--font-display` / `--font-body`. This is a **deliberate deviation from byte parity**: it
drops two preconnects, a render-blocking third-party stylesheet and a third-party
dependency. Rendered text is identical. Allowlist the head difference.

**(3) `--breakpoint-nav: 1080px`** — unchanged; the `nav:` variant generates identically in v4.

**(4) Everything else copies verbatim** — `@layer base`, `@utility btn-primary`/
`btn-secondary` (including the `calc(1rem - 1px)` padding that makes the two buttons match
height), `@utility eyebrow`, and the whole `.stats-strip` block with its CSS range media
queries and `nth-child` divider logic. **Bring the comments** — that block is the least
obvious code in the stylesheet.

## 7. The enquiry form

### Server Action

`lib/enquiry/actions.ts` transcribes
[form-handler.php:43-190](../php/include/form-handler.php#L43-L190) in the same order:
trim → **spam traps first** → validate → CSV → mail → `redirect('/thank-you')`.

```tsx
const [state, formAction] = useActionState(submitEnquiry, EMPTY_STATE, '/#contact');
<form action={formAction} key={state.formKey} noValidate>
```

| PHP | Next |
|---|---|
| `$_SESSION['form_errors']` flash | `state.errors`, returned by value — no session, no expired-flash case |
| `old($field)` | `defaultValue={state.values.name}` |
| `303 → /thank-you` | `redirect()` — Next issues 303 on a POST; PRG preserved |
| `303 → /#contact` on failure | the `permalink` third argument |

Two traps that will silently break the "preserve entered values" requirement:

- **React 19 resets uncontrolled fields after a `<form action>` completes.** Without a fix a
  failed submit clears everything typed — worse than the PHP round-trip. Fix:
  `key={state.formKey}` (with `formKey: Date.now()`) plus `defaultValue`.
- **`redirect()` must sit outside any try/catch** — it works by throwing `NEXT_REDIRECT`.
  Swallowing it turns a successful submit into a 500.

**Progressive enhancement is a hard requirement** — [site.js:228-233](../php/js/site.js#L228-L233)
says the server is the authority "when the script does not [run]". React renders
`<form action={serverAction}>` as a real POST form. **Test with JS disabled before cutover**;
the `permalink` branch is the least-exercised path in the design.

Add `useFormStatus` to disable the submit button while pending. The PHP form had no such
state, but a 1–3 s action with no feedback gets double-submitted.

### CSRF: drop it, add no token

Server Actions already compare `Origin` against `Host`/`X-Forwarded-Host` and reject
mismatches with a 403 before our code runs, and action IDs are non-guessable build hashes.
Beyond that, **CSRF has no payoff here**: no session, no user-scoped state; the worst
outcome of a "successful attack" is a spam enquiry, which the honeypot and timing trap
already handle.

The token also had a live lead-loss path — a stale tab got *"Your session expired"* and, in
practice, a bounced visitor. Removing it also removes per-request state from the home page,
which is what lets it render statically.

**The caveat we accept:** the Origin/Host check is now security-relevant *proxy config*. A
wrong `Host` header 403s every submission and loses every lead silently. Mitigate in three
places: `proxy_set_header Host $host` + `X-Forwarded-Host $host` in nginx,
`serverActions.allowedOrigins` in `next.config.ts`, and the live-domain submission gate in
§10 Phase 3.

### Timing trap

The PHP `form_time` hidden input is trivially forgeable and works anyway — it is a bot
heuristic, not a security control. The Next-specific problem is **caching**: a timestamp
baked into a statically-rendered page means the trap never fires.

Mint an HMAC-signed timestamp as an HttpOnly cookie in `proxy.ts` (Next 16 renamed
middleware; matcher: HTML
documents only). It runs on cache hits, so the page stays static; the cookie is set
by the same response that delivers the HTML, so it works with JS off; and it is
server-authoritative, so it is strictly better than the original.

**Every unknown case must fail open** — no cookie, no secret, bad signature → "not too fast".
PHP failed open by accident (`(int)'' === 0`); here it must be deliberate. Cookies blocked by
a privacy extension is a normal state for a real customer, and fail-closed turns that into a
100% rejection rate for a whole class of visitor. **Anti-spam on this form must never reject
more than it is certain about — a false positive is a lost fee-paying client.**

### Validation

One Zod schema in `lib/enquiry/schema.ts`, imported by both sides, importing nothing
server-only. Exact rules from
[form-handler.php:100-136](../php/include/form-handler.php#L100-L136):

- `name` — required, 2–80 **code points** (`[...s].length`, matching `mb_strlen`)
- `phone` — required, 10–13 digits after `replace(/\D/g,'')`
- `email` — optional, but must match when given
- `topic` — `z.enum(TOPICS).catch(TOPICS[0])`, PHP's silent reset, never a user-visible error
- `details` — silently truncated at 2000, never an error

Use `superRefine`, not chained `.refine()`, to reproduce the if/elseif — exactly one message
per field, first rule wins. The `topic`/`details` coercions live in the schema so the
**parsed output** is what gets logged and mailed, as PHP did by mutating `$values` in place.
Export a `checkField()` derived from the same schema for the client, so the two can never
drift. Ship `zod/mini` on the client (~2 kB vs ~13 kB) — the page's entire current JS payload
is one 12 kB file.

### Persistence — keep the CSV, move the file

The concurrency argument is worth stating rather than assuming. PHP needed `flock` because
mod_php serves each request in a separate process. **Node does not have that problem**: JS is
single-threaded and `writeSync` blocks the event loop, so two concurrent requests to one
process cannot interleave. The remaining risk is multiple processes — **so run one instance,
fork mode, not PM2 cluster.** At this volume (the log holds one row since 4 September) a
single process is over-provisioned by four orders of magnitude.

Close PHP's header-vs-row TOCTOU by writing header+row in a single `writeSync`. Reproduce
`fputcsv` quoting exactly (`/[",\\\n\r\t ]/` → quote, double embedded quotes) — verified
against the existing row, where the space in the timestamp triggers quoting.

**Location: `/var/lib/taxsourceindia/enquiries.csv`, outside the deploy tree.** Next serves
only `public/**` plus declared routes, so the `include/`/`pages/`/`data/` deny rules have no
successor and **nothing is lost** — say so in the README so nobody assumes a regression. It
lives outside the tree anyway because a `data/` dir inside the app is orphaned by any future
atomic-release deploy, splitting the lead history silently.

Not SQLite (a native module that must compile against the VPS Node ABI, for a one-row table)
and not Postgres (a second daemon, a second thing that can be down, for ~1 write/week). The
owner's consumption path is opening the file in Excel — **CSV is the feature.** Document
SQLite as the upgrade trigger if an admin view or dedupe is ever wanted.

One deliberate improvement over 1:1: on a write failure, also emit the record as a JSON line
to stderr so journald captures the lead when the disk is full. That closes the only remaining
hole in "an outage never loses a lead".

### Mail

`lib/enquiry/mailer.ts` transcribes [mailer.php](../php/include/mailer.php) keeping every
observable detail — the same two guard clauses and log lines, `replyTo` only when an email
was given, the same subject with its spaced em dash, the same row order and labels including
the space in `'From IP'` and the `(not given)`/`(none)` placeholders, the same HTML table
styling, the same "log and continue, never rethrow" failure mode. Reproduce
`nl2br(htmlspecialchars(…))` as escape-**then**-`<br />` — the other order eats the tag.

Send via `after()`, not `await`, so an SMTP outage cannot hang the response for 15–45 s:

```ts
appendEnquiry(record);            // durable first — the guarantee
after(() => sendEnquiry(record)); // then mail, off the response path
redirect('/thank-you');
```

The README's concern about vendored **PHPMailer 6.0.7 (2018)** needing a security update
disappears entirely — Nodemailer is a normal npm dependency.

### The custom `<select>` — shadcn/Radix `Select`

**Decision changed from the original plan.** The plan argued for hand-porting the ~160-line
ARIA listbox from `site.js:68-225`; we are using shadcn's `Select` (Radix) instead, along
with `Input`, `Textarea`, `Button` and `Field`. The tradeoff, stated plainly so nobody is
surprised later:

- **What we keep:** a styleable option list, which is the entire reason the original was
  hand-rolled — a native `<select>`'s list is OS-drawn and unstylable on Windows and
  Android, the audience's primary platforms.
- **What we give up:** byte-level parity of the accessibility tree. Radix uses roving focus
  where the original used `aria-activedescendant` on the button, portals the listbox, and has
  its own typeahead timing. The §11.10 keyboard spec therefore becomes a *behavioural*
  check — open/close, arrow navigation, Escape, typeahead, committed value — not a
  diff against the PHP DOM.
- **What it costs:** `radix-ui` plus `class-variance-authority`, `cn` and `lucide-react`, on
  a page whose entire current JS payload is one 12 kB file. Measure it at step 12; if the
  contact page regresses on Lighthouse, that is the moment to reconsider.

**shadcn no longer ships the react-hook-form `form` component** — the registry item is an
empty stub. Its replacement is **`Field`** (`Field`, `FieldLabel`, `FieldError`,
`FieldDescription`, `FieldSet`, `FieldGroup`), which is form-library-agnostic. That suits us:
no react-hook-form, no resolver, and it composes directly with `useActionState`. `FieldError`
replaces the `<p data-error-for="…">` slots.

Still required regardless of the primitive:

- **The real `<select name="topic">` must remain the submitted control** so the form works
  with JS off (§7 progressive enhancement). Radix renders its own hidden native select —
  verify it actually posts `topic` with JavaScript disabled rather than assuming it does.
- `key={state.formKey}` remounting resets the Select to `state.values.topic`, which is the
  correct restore-after-failure behaviour.
- The six topic strings must post the **entity-decoded** literal (`Payroll, PF & ESI
  compliance`), matching the existing CSV.

## 8. Images

**Keep the sharp script. Do not use `next/image`.** There are eight images, all fixed, already
hand-tuned in `tools/optimise-images.mjs` to exactly 2× their CSS slot with a deliberate
PNG-vs-WebP split. `next/image` would add a runtime layer and an on-disk cache for zero
benefit, and replace every `<img>` with `srcset` + wrapper — a large permanent diff against a
1:1 mandate. Use plain `<img>` with the same `width`/`height`/`loading`/`fetchpriority`.
Disable `@next/next/no-img-element` with a one-line reason.

`images-src/` outside `public/` (stronger than the `.htaccess` guard it replaces);
`public/images/` with **URLs identical to today**. Do **not** use Next's `app/icon.png` /
`opengraph-image.jpg` conventions — they emit hashed URLs and generate their own tags,
breaking parity for the crawler-facing assets.

`asset()`'s `?v=<mtime>` disappears; replace with a `headers()` rule on `/images/:path*`.
`/_next/static/*` is content-hashed and `immutable` already — strictly better than the
`.htaccess` compromise.

## 9. SEO parity

`metadataBase: new URL(SITE_ORIGIN)` in the root layout, with shared `openGraph`, `twitter`,
`icons`. **`themeColor` goes on the `viewport` export, not `metadata`** — a common miss.
Per-page static `metadata` exports; no `generateMetadata` needed.

Three things from [head.php](../php/include/head.php) that are easy to get wrong:

- **thank-you and 404 canonicalise to the *home* URL**, not themselves
  ([head.php:8](../php/include/head.php#L8)), while keeping their own title/description. Both
  also get `robots: { index: false }`.
- **The thank-you meta refresh has no Metadata API equivalent.** Render
  `<meta httpEquiv="refresh" content="2;url=/" />` as JSX; React 19 hoists it. Keep it a meta
  refresh — [thank-you.php](../php/pages/thank-you.php) is explicit that it must work with JS off.
- **`not-found.tsx` cannot export `metadata`.** Render its head tags as JSX. Since the layout
  exports no title, there is exactly one — verify that in the diff.

**JSON-LD** in `app/page.tsx` only. `JSON.stringify(x, null, 4)` matches `JSON_PRETTY_PRINT`,
and JS escapes neither slashes nor non-ASCII — exactly what `JSON_UNESCAPED_SLASHES |
JSON_UNESCAPED_UNICODE` asked for, so `₹₹` and the URLs come out identically. **Keep the
conditional spread that omits `aggregateRating`** and its comment.

`app/sitemap.ts` — same three pages, priorities and changefreqs. Pass `lastModified` as a
**string** `'YYYY-MM-DD'`; a `Date` serialises to a full ISO timestamp where
[sitemap.php:24](../php/sitemap.php#L24) emits `date('Y-m-d')`.

`app/robots.ts` — drop the `/include/`, `/pages/`, `/data/`, `/reference/`, `/PHPMailer/`
disallows (those paths cease to exist), keep `/thank-you` and the absolute `Sitemap:`.
**Never carry over `Crawl-Delay`.**

## 10. Deployment and cutover

**`.htaccess` responsibilities:**

| Rule | New home |
|---|---|
| http→https 301, www→bare 301 | **nginx** — Next never reliably sees the scheme behind a proxy. Hard requirement: without them we recreate the exact duplicate-indexing problem [.htaccess:5-16](../php/.htaccess#L5-L16) was written to fix. |
| `/privacy-policy/` → `/privacy` | **`next.config.ts` `redirects()`** — the one SEO-critical redirect; versioned and reviewed, not buried in a panel-editable proxy config |
| pretty URLs, `include/`/`data/` denies | gone; filesystem routing and `public/`-only serving are stronger |
| `mod_deflate` | nginx `gzip`/`brotli`, **and set `compress: false`** — compressing twice burns CPU |
| `no-store` on `.php` | obsolete once the CSRF token is gone |

`permanent: true` emits **308**, not 301. Google consolidates both identically; use nginx
`return 301` if a literal 301 is ever needed.

Run under **systemd** (`ProtectSystem=strict` + `ReadWritePaths=/var/lib/taxsourceindia`
gives a much tighter blast radius than PHP's writable webroot), one instance, fork mode.
Secrets in `/etc/taxsourceindia/env`, `0600`, via `EnvironmentFile=` — **not** a
`.env.production` in the deploy tree, and never in a committed `ecosystem.config.js`. No
`NEXT_PUBLIC_` prefix on anything: those are string-inlined into the client bundle forever.

**Cutover:**

- **Phase 0** — parallel run. Deploy, build, `systemctl enable --now`. **Test outbound SMTP
  from the box** (`nc -zv smtp… 465` and `587`) — some VPS providers block these by default,
  which yields a pipeline that CSVs every lead and mails none, silently. Stand up
  `beta.` with `X-Robots-Tag: noindex` **and** a `robots.txt` override; a crawlable duplicate
  of the whole site during the parallel window is a real SEO risk.
- **Phase 1** — verify on staging (§11).
- **Phase 2** — copy `php/data/enquiries.csv` first (§12), then **prefer a vhost switch to a
  DNS change**: rollback is one uncomment and `systemctl reload nginx`, versus hours. If DNS
  is unavoidable, drop the TTL to 300 s at least 48 h beforehand.
- **Phase 3** — verify the redirect matrix on the live domain, then **submit one real
  enquiry through the live domain and confirm it reaches both the CSV and the inbox.** The
  proxy `Host` failure mode manifests only on the real hostname and produces a 403 a casual
  smoke test will not notice. The cutover is not done until a live lead lands in `info@`.
- **Phase 4** — Search Console: add a Domain property, submit the sitemap, request indexing
  for `/` and `/privacy`, and expect `/privacy-policy/` to report *"Page with redirect"* —
  that is the correct end state. Submit to **Bing** too: the old `robots.txt` carried
  `Crawl-Delay: 20`, which Google ignored but Bing honoured, so removing it is a real unlock.
- **Rollback trigger:** any 5xx on `/`, or an enquiry reaching neither inbox nor CSV. Keep
  the PHP tree on disk, unserved, for **30 days minimum**. Never delete `php/data/*.csv`.

**Existing lead data** — one real row, a named individual with a phone number and email.
`rsync` over SSH, not a browser upload; `0640`; **check the file ends with `0a`** (`tail -c 1
| xxd`) or the first appended row joins the last existing one and corrupts the archive with
no error anywhere; normalise CRLF→LF since it came off a Windows box. Repeat the copy
immediately after cutover to catch anything submitted during the window. Add
`/var/lib/taxsourceindia/` to a nightly off-box backup — when SMTP is down this file is the
*only* record of a lead.

## 11. Verification

Run PHP at `http://localhost/tax-source-india` and Next at `:3000` side by side. Everything
in `web/scripts/`, runnable as one `npm run verify`.

1. **Content parity — do this first, before any component work.** Shell out to
   `php -r 'echo json_encode(require "…/content.php");'`, `he.decode()` every string, and
   `deepStrictEqual` against `content.ts`. This proves across all 434 lines that no copy was
   dropped or retyped. Highest-value check in the list; twenty minutes to write.
2. **Rendered-HTML diff** per route, through a cheerio canonicaliser. Normalise: decode
   entities **both sides**, strip `/_next/` tags and the RSC payload, strip `?v=`, strip
   React's `<!--$-->` markers, collapse whitespace. Target: only a written-down allowlist
   survives (Next scripts, font tags, stylesheet filename, the removed hidden inputs).
3. **Class-name diff** — every `class=` in DOM order, one per line. Should be **exactly
   zero** differences. Run per section as you port; catches Tailwind regressions far faster
   than a full HTML diff.
4. **Generated-CSS diff** — `@tailwindcss/cli` against `input.css` vs the built Next chunk.
   The only reliable way to catch a missing `@source`, whose failure mode is a silently
   absent utility.
5. **Screenshots** at 375 / 768 / 1440 **plus the boundary widths 639/641, 1023/1025
   (`.stats-strip` range queries) and 1079/1081 (`nav:`)**. Those six are where a port
   silently diverges.
6. **JSON-LD** — parse both, `deepStrictEqual`, and assert `aggregateRating` is absent.
7. **Head/meta table** per route — emit from both servers and diff the tables.
8. **Status matrix** — assert the **status**, not the body: `/anything-else` must be a real
   404, `/privacy-policy` a redirect, `/robots.txt` `text/plain`, `/sitemap.xml`
   `application/xml`.
9. **No-JS pass** (Playwright, `javaScriptEnabled: false`) — FAQ accordion opens, native
   select visible and listbox hidden, meta refresh fires, form still submits.
10. **Keyboard spec for the listbox**, run against **both** sites: Enter/Space/Arrows/Home/
    End/Escape/Tab, 600 ms typeahead, outside-click, `aria-activedescendant`/`aria-expanded`/
    `aria-selected`, the chevron rotation, and the `change` event on the native select.
    160 lines of hand-rolled ARIA is the likeliest place for a silent regression.
11. **axe-core diff + Lighthouse** — Next should be ≥ PHP on all four. Watch LCP: confirm
    `fetchpriority="high"` survived onto `hero.webp`.

## 12. Order of work

| # | Work | Checkpoint |
|---|---|---|
| 0 | Scaffold `web/` | `next build && next start` serves |
| 1 | `globals.css`, `next/font`, layout skeleton | §11.4 CSS diff empty |
| 2 | `lib/` — config, content, urls, text, flags | **§11.1 content parity passes** |
| 3 | `icons.tsx`, `Icon`, `Shell`, `Header`, `Footer` | §11.3 on header + footer |
| 4 | Static sections: Hero → Audience → Services → WhyUs → Process → Testimonials → Faq → CtaBand → LogoWall | §11.3 after each |
| 5 | `Contact` server shell + `Field` | renders identically pre-hydration |
| 6 | Zod schema, Server Action, store, mailer, `proxy.ts` | staging submission end-to-end |
| 7 | Client islands: `MobileNav`, `TopicSelect`, `EnquiryForm` | **§11.10 keyboard spec** |
| 8 | privacy, terms, thank-you, not-found | §11.2 per route |
| 9 | Metadata, viewport, JSON-LD, sitemap, robots | §11.6 + §11.7 |
| 10 | Images, `next.config.ts` headers + redirects | §11.8 status matrix |
| 11 | **Flip all three flags on, diff LogoWall / CallBar / ChatWidget against PHP with the same flags on, flip back** | §11.3 on the three |
| 12 | Full sweep: all routes, seven widths, no-JS, axe, Lighthouse | allowlist written down and stable |
| 13 | Cutover (§10) | live-domain enquiry reaches inbox + CSV |

Step 11 is the one that gets skipped. Those three partials never render in the default
config, so nothing in steps 1–10 exercises them, and a broken flag-gated component sits
undetected until someone flips it in six months.

---

## Known deviations from 1:1 — accept these deliberately

**Improvements:** `/privacy/` now 308s instead of serving a duplicate 200 · `SITE_ORIGIN`
from env closes a Host-header poisoning path · `/_next/static` is content-hashed `immutable`
· the "session expired" lead-loss path is gone · self-hosted fonts drop a third-party
render-blocking request · PHPMailer 6.0.7's outstanding CVEs become moot · unknown icon names
become compile errors.

**Neutral:** 301 → 308 on `/privacy-policy` (Google consolidates identically) · `&middot;` →
literal `·` (same rendering, different bytes) · two fewer hidden inputs in the form.

**Regressions, and why they are acceptable:** `?v=<mtime>` cache-busting for `/images/*`
becomes a plain 30-day header — the same trade-off the PHP accepted before the mtime trick;
revisit if a stale image ever bites. Feature flags become build-time constants, so flipping
one is a redeploy — all three are `false` and likely to stay that way.

**Must be pinned, not ported:** [terms.php:13](../php/pages/terms.php#L13)'s `date('j F Y')`
renders "Last updated" as *today, every day* — arguably already a bug; freeze it to a constant.
[footer.php:49](../php/include/footer.php#L49)'s `date('Y')` would bake in at prerender —
constant, or `revalidate`. `filemtime(content.php)` → `content.last_modified`.

## Biggest risks, ranked

1. **Proxy `Host`/`X-Forwarded-Host` misconfiguration** — 403s every Server Action, no visible
   error, 100% of leads lost. By far the most likely way this breaks silently.
2. **React 19 resetting uncontrolled fields** — quietly regresses "preserve entered values".
3. **A frozen timing token on a static page** — the trap never fires, or always does.
4. **Fail-closed anti-spam anywhere** — a false positive is a lost client, not an inconvenience.
5. **Outbound SMTP blocked on the VPS** — every lead CSV'd, none mailed.
6. **PM2 cluster mode** breaking the single-writer assumption.
7. **The staging hostname getting indexed** during the parallel run.
8. **SPF/DMARC** — `MAIL_FROM` must be a real mailbox on the domain with SPF including the
   relay, or mail is accepted and then dropped at the recipient.
