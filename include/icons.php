<?php
/**
 * SVG icon registry (Lucide-style, 24x24 viewBox).
 *
 * Each entry is [inner-markup, paint-style]. Paint style 'stroke' gets
 * fill:none + stroke:currentColor; 'fill' gets fill:currentColor. The <svg>
 * wrapper and colour class are applied by icon() in functions.php.
 */

return [
    // ---- ubiquitous ----
    'check' => ['<path d="M20 6 9 17l-5-5"></path>', 'stroke'],
    'arrow-right' => ['<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>', 'stroke'],
    'chevron-right' => ['<path d="m9 18 6-6-6-6"></path>', 'stroke'],
    'star' => ['<path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"></path>', 'fill'],
    'plus' => ['<path d="M12 5v14"></path><path d="M5 12h14"></path>', 'stroke'],
    'minus' => ['<path d="M5 12h14"></path>', 'stroke'],
    'close' => ['<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>', 'stroke'],
    'menu' => ['<path d="M3 6h18"></path><path d="M3 12h18"></path><path d="M3 18h18"></path>', 'stroke'],

    // ---- contact ----
    'phone' => ['<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path>', 'stroke'],
    'chat' => ['<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>', 'stroke'],
    'mail' => ['<rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m2 7 10 6 10-6"></path>', 'stroke'],
    'map-pin' => ['<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path><circle cx="12" cy="10" r="3"></circle>', 'stroke'],
    'clock' => ['<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>', 'stroke'],
    'send' => ['<path d="M22 2 11 13"></path><path d="M22 2 15 22l-4-9-9-4z"></path>', 'stroke'],
    'lock' => ['<rect x="4" y="10" width="16" height="11" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path>', 'stroke'],
    'info' => ['<circle cx="12" cy="12" r="9"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path>', 'stroke'],
    'check-circle' => ['<circle cx="12" cy="12" r="9"></circle><path d="m8.5 12.5 2.5 2.5 4.5-5"></path>', 'stroke'],
    'wave' => ['<path d="M18 11V6a2 2 0 0 0-4 0v5"></path><path d="M14 10V4a2 2 0 0 0-4 0v6"></path><path d="M10 10.5V6a2 2 0 0 0-4 0v8"></path><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>', 'stroke'],

    // ---- audience cards ----
    'users' => ['<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>', 'stroke'],
    'building' => ['<path d="M3 21h18"></path><path d="M5 21V7l7-4 7 4v14"></path><path d="M9 21v-6h6v6"></path>', 'stroke'],
    'sparkle' => ['<path d="m12 3 2.4 5.3 5.6.6-4.2 3.9 1.2 5.7L12 15.7 7 18.5l1.2-5.7L4 8.9l5.6-.6z"></path>', 'stroke'],

    // ---- service groups ----
    'file-text' => ['<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M9 15h6"></path><path d="M9 11h3"></path>', 'stroke'],
    'calendar' => ['<rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M3 10h18"></path><path d="M8 4v3"></path><path d="M16 4v3"></path>', 'stroke'],
    'settings' => ['<path d="M12 2v4"></path><path d="M12 18v4"></path><circle cx="12" cy="12" r="4"></circle><path d="m4.9 4.9 2.9 2.9"></path><path d="m16.2 16.2 2.9 2.9"></path><path d="M2 12h4"></path><path d="M18 12h4"></path>', 'stroke'],

    // ---- why-us pillars ----
    'shield-check' => ['<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>', 'stroke'],
    'shield' => ['<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>', 'stroke'],
    'shield-alert' => ['<path d="m12 3 8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"></path><path d="M12 9v4"></path><path d="M12 16h.01"></path>', 'stroke'],

    // ---- footer social ----
    'facebook' => ['<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>', 'stroke'],
    'instagram' => ['<rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><path d="M17.5 6.5h.01"></path>', 'stroke'],
    'x' => ['<path d="M4 4l7.5 9.5L4.5 20"></path><path d="M20 4l-7.5 9.5L19.5 20"></path><path d="M4 4h3.5L20 20h-3.5z"></path>', 'stroke'],

    // ---- placeholder client marks (logo wall) ----
    'mark-1' => ['<rect x="3" y="3" width="18" height="18" rx="5"></rect><path d="M8 15V9l8 6V9"></path>', 'stroke'],
    'mark-2' => ['<circle cx="9" cy="12" r="6"></circle><circle cx="15" cy="12" r="6"></circle>', 'stroke'],
    'mark-3' => ['<path d="M12 2 22 20H2z"></path>', 'fill'],
    'mark-4' => ['<path d="M4 20V8"></path><path d="M10 20V4"></path><path d="M16 20v-9"></path><path d="M22 20V12"></path>', 'stroke'],
    'mark-5' => ['<rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor"></rect><rect x="13" y="3" width="8" height="8" rx="2"></rect><rect x="3" y="13" width="8" height="8" rx="2"></rect><rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor"></rect>', 'stroke'],
    'mark-6' => ['<path d="m12 2 9 5v10l-9 5-9-5V7z"></path>', 'stroke'],
];
