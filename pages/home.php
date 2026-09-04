<?php
/**
 * Home page — the section order from the source design.
 */

foreach ([
    'hero',
    'logo-wall',
    'audience',
    'services',
    'why-us',
    'process',
    'testimonials',
    'faq',
    'contact',
    'cta-band',
] as $section) {
    require __DIR__ . '/../include/sections/' . $section . '.php';
}
