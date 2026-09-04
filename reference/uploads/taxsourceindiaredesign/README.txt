TAX SOURCE INDIA — HOMEPAGE REDESIGN
=====================================

tax-source-india-homepage.html
  The whole design canvas. Double-click to open it in any browser —
  no internet needed, nothing to install. Pan and zoom around it,
  and use Export in the toolbar to save PNGs or a PDF.
  Three pages in the toolbar's pages menu:
    v2 — with imagery   the current design (desktop + mobile)
    v1 — original       the first pass, kept for comparison
    Design system       colour, type, spacing, components

source/
  The individual artboards as plain HTML, plus the images.
  This is what a developer should build from — every colour,
  size, weight and spacing value is in the markup as written.

    Main.dc.html          v2 homepage, desktop (1440px)
    Mobile.dc.html        v2 homepage, mobile (390px)
    Foundations.dc.html   colour / type / spacing / elevation
    Components.dc.html    buttons, fields, chips, cards, rows
    V1Desktop.dc.html     v1 desktop
    V1Mobile.dc.html      v1 mobile
    canvas.json           canvas layout (positions and pages)

  Note: these open in a browser but the <script src="./support.js">
  line in each head is inert on its own — the layout and styling
  render fine, which is all a developer needs to read values from.


STILL TO FILL IN BEFORE LAUNCH
-------------------------------
Anything in [SQUARE BRACKETS] is a real fact not yet supplied:
  [4.X] on Google          your actual Google rating
  Bengaluru since [YEAR]   the year the firm started
  [X,000]+                 returns filed
  [XX]+                    years of practice
  [ROLE] x3                what each reviewer does
  [YEAR] in the footer     copyright year

Also outstanding:
  - Two testimonials are cut off mid-sentence — paste the full text
  - Seven FAQ answers (the first is written as a sample of tone)
  - Google Map embed — use the iframe from your Business Profile
  - Client logo wall holds placeholder lockups; swap for real client
    logos, with written permission from each client
  - All photography is generated, not of your actual office or team
