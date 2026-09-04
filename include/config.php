<?php
/**
 * Site configuration.
 *
 * Everything here is safe to commit. Real SMTP credentials belong in
 * include/config.local.php (gitignored) — see config.local.example.php.
 */

$config = [
    // ---- identity ----
    'site_name'    => 'Tax Source India',
    'tagline'      => 'An accountant you can rely on',
    // Path the site is served from, with no trailing slash. Derived from where
    // the front controller actually sits, so it is '/tax-source-india' here and
    // '' at the domain root — deploying needs no edit. Override in
    // config.local.php only if the site is proxied under a different path.
    'base_url'     => preg_replace('#/[^/]*$#', '', $_SERVER['SCRIPT_NAME'] ?? '/index.php'),
    'pretty_urls'  => true,                  // false if mod_rewrite is unavailable

    // ---- contact ----
    'phone'        => '+91 81799 64276',
    'phone_raw'    => '+918179964276',
    'phone_alt'    => '+91 97427 09374',
    'phone_alt_raw' => '+919742709374',
    'whatsapp'     => '918179964276',
    'email'        => 'info@taxsourceindia.com',

    'address' => [
        'line1'    => 'Shop No. 03, No. 437/38, Ground Floor,',
        'line2'    => '7th Main, Church Street, HAL 3rd Stage,',
        'line3'    => 'New Tippasandra, Bengaluru, Karnataka 560075',
        'street'   => 'Shop No. 03, No. 437/38, Ground Floor, 7th Main, Church Street, HAL 3rd Stage, New Tippasandra',
        'locality' => 'Bengaluru',
        'region'   => 'Karnataka',
        'postcode' => '560075',
        'country'  => 'IN',
        'lat'      => 12.9784,
        'lng'      => 77.6408,
    ],

    'hours_label'  => 'Monday to Friday, 8:00 am &ndash; 7:00 pm &nbsp;&middot;&nbsp; Closed Saturday &amp; Sunday',
    // Google requires aggregateRating to reflect genuine reviews that are
    // visible on the page. The 4.8 came from the design's hero badge; the
    // review count below was a placeholder and is NOT verified, so the schema
    // omits the rating entirely until this is switched on deliberately.
    // Set both to the real Google Business Profile figures, then flip the flag.
    // Publishing invented review data risks a structured-data manual action.
    'rating'        => '4.8',
    'rating_count'  => null,
    'rating_verified' => false,

    // ---- feature flags ----
    // The logo wall ships with generic placeholder marks. Turn this on once
    // real client logos are supplied and added to images/.
    'show_logo_wall' => false,
    'show_call_bar'  => false,  // sticky mobile call/WhatsApp bar
    'show_chat'      => false,  // floating chat button (hands off to WhatsApp)

    // ---- mail ----
    // Overridden by config.local.php on any real deployment.
    'mail' => [
        'enabled'   => false,               // flip on once SMTP is configured
        'to'        => 'info@taxsourceindia.com',
        'to_name'   => 'Tax Source India',
        'from'      => 'website@taxsourceindia.com',   // must be on the sending domain
        'from_name' => 'Tax Source India website',
        'subject'   => 'New enquiry from taxsourceindia.com',
        'host'      => '',
        'port'      => 587,
        'username'  => '',
        'password'  => '',
        'encryption' => 'tls',              // 'tls' (587) or 'ssl' (465)
    ],

    // Append-only lead log. Written before mail is attempted, so an SMTP
    // failure never loses an enquiry.
    'enquiry_log' => __DIR__ . '/../data/enquiries.csv',
];

// Local overrides (credentials, live base_url, flags). Never committed.
$local = __DIR__ . '/config.local.php';
if (is_file($local)) {
    $override = require $local;
    if (is_array($override)) {
        // One level of merge is enough: 'mail' and 'address' are replaced key-by-key.
        foreach ($override as $key => $value) {
            $config[$key] = is_array($value) && isset($config[$key]) && is_array($config[$key])
                ? array_replace($config[$key], $value)
                : $value;
        }
    }
}

return $config;
