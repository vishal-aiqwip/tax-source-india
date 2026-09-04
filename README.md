# Tax Source India — website

Plain PHP + Tailwind CSS. No framework, no Composer, no runtime build step.
Rebuilt from the design at `reference/Tax Source India Homepage v3.dc.html`.

## Running it

Served by XAMPP Apache at <http://localhost/tax-source-india/>. Nothing to
start beyond Apache — there is no PHP build and no Node process at runtime.

## Editing

| To change | Edit |
|---|---|
| Any wording on the site | `include/content.php` |
| Phone, email, address, hours, feature flags | `include/config.php` |
| A section's layout | `include/sections/<name>.php` |
| Header / footer / `<head>` | `include/header.php`, `include/footer.php`, `include/head.php` |
| Colours, fonts, breakpoints | `style/input.css` (`@theme` block) |
| An icon | `include/icons.php` |

**After replacing any file in `images/src/`, re-run the image step:**

```
npm run images
```

Originals live in `images/src/` and are never modified. The script resizes each
to 2x its largest CSS slot, sends photographs to WebP and keeps flat logo art
as PNG, and regenerates the favicon, apple-touch icon and the 1200x630 social
preview. It took the artwork from 979 KB to 261 KB.

**After touching any Tailwind class or `style/input.css`, rebuild the CSS:**

```
npm run css          # one-off, minified
npm run css:watch    # rebuild on save while working
```

`style/tailwind.css` is the file the browser loads and **is committed** — the
server has no build step, so a class change that is not rebuilt will not apply.

## SEO

`robots.txt` and `sitemap.xml` are generated (`robots.php`, `sitemap.php`,
routed by `.htaccess`), so their absolute URLs follow whatever host serves the
site — nothing to edit when it moves to the real domain. The sitemap is built
from the same page whitelist the router uses, so it cannot list a page that
does not exist.

`include/head.php` carries per-page title and description, an absolute
canonical, OG/Twitter tags, and an `AccountingService` JSON-LD block (address,
both phones, opening hours, geo, rating) emitted on the home page only.

No `FAQPage` schema, deliberately: Google retired FAQ rich results for every
site in May 2026, so marking up the eight Q&As would earn nothing in the SERP.

### One thing the server must provide

Text assets are served **uncompressed** on this XAMPP install: the stylesheet
arrives as 106 KB instead of 19 KB. The `.htaccess` already contains the
`mod_deflate` and `mod_expires` rules, guarded by `<IfModule>`, so they take
effect the moment those modules exist. XAMPP ships with both commented out —
uncomment these in `xampp/apache/conf/httpd.conf` and restart Apache:

```
LoadModule deflate_module modules/mod_deflate.so
LoadModule expires_module modules/mod_expires.so
```

That is worth about 168 KB per uncached visit. Most production hosts have them
on already.

## Structure

```
index.php              front controller: bootstraps, whitelists ?page=, dispatches
include/layout.php     the single HTML skeleton; requires the page in the middle
pages/                 page bodies only (home, privacy, terms, 404)
include/sections/      the home page's twelve bands
include/content.php    all copy
include/config.php     site constants; overlaid by config.local.php
js/site.js             mobile drawer + chat widget (the only JS on the site)
```

Routing is whitelist-based: `$_GET['page']` is matched against a list, never
interpolated into a path. Pretty URLs (`/privacy`) come from `.htaccess`; if
mod_rewrite is unavailable, set `pretty_urls => false` in `config.php` and
every link switches to `index.php?page=…` on its own.

Only two interactions use JavaScript. The responsive nav, the FAQ accordion (native `<details name="faq">`) and the form's sent/error
states are handled by CSS or by the server.

## Enquiry form

`include/form-handler.php` → CSRF check, honeypot + timing check, validation,
append to `data/enquiries.csv`, then send by SMTP, then redirect
(post-redirect-get, so a reload never resubmits).

The CSV is written **before** mail is attempted, so an SMTP outage cannot lose
a lead. `data/` and `include/` are denied by `.htaccess` — the enquiry log
holds names, phone numbers and email addresses and must never be served.

### Enabling email

1. `cp include/config.local.example.php include/config.local.php`
2. Fill in the SMTP host, username and password; set `enabled => true`.
3. `config.local.php` is gitignored. Never commit credentials.

Until that is done, enquiries are logged to the CSV only and the reason is
written to the PHP error log. The visitor still sees the thank-you panel.

Two notes:

- XAMPP's PHP often ships without a CA bundle, so SMTP over TLS fails locally.
  Fix it by pointing `openssl.cafile` at a `cacert.pem` in `php.ini` — **not**
  by disabling peer verification, which removes the transport security.
- The vendored PHPMailer is **6.0.7 (2018)**. It works, but 6.9.x carries
  several security fixes since. Update `PHPMailer/` before this goes public.

## Before this goes live

Drafted content that has **not** been verified — see the header comment in
`include/content.php`:

1. **FAQ answers 2–8** state tax positions (ITR form choice, regime
   comparison, GST timelines, entity choice, fees). A chartered accountant
   must confirm each is accurate and current.
2. **Testimonials 2 and 3** — the design supplied only the opening clause of
   each alongside a real client name; the completion is invented text
   attributed to a named real person. Replace with the actual Google reviews
   or delete the two cards. Do not publish as is.
3. **Terms of service** is still a placeholder, not legal text. (The privacy
   policy is the practice's real document, effective 01 April 2024.)
4. **Client logo wall** is off (`show_logo_wall => false`) because the design's
   logos are generic placeholders. Turn it on once real client logos exist.
5. Footer social links point at `#top` — add the real profile URLs in
   `include/content.php`.
6. The sticky mobile call bar is off (`show_call_bar => false`). The chat
   button repositions itself automatically when it is toggled back on.
7. `base_url` in `config.php` is `/tax-source-india`; set it to `''` when the
   site moves to the domain root.
