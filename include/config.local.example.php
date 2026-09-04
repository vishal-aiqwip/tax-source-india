<?php
/**
 * Copy this file to config.local.php and fill in the real values.
 *
 * config.local.php is gitignored — credentials must never be committed.
 * Only the keys you list here are overridden; everything else falls back to
 * the defaults in config.php.
 */

return [
    // On the live domain the site sits at the web root:
    // 'base_url' => '',

    'mail' => [
        'enabled'    => true,
        'to'         => 'info@taxsourceindia.com',
        'from'       => 'website@taxsourceindia.com',
        'host'       => 'smtp.yourprovider.com',
        'port'       => 587,
        'username'   => 'website@taxsourceindia.com',
        'password'   => 'REPLACE_ME',
        'encryption' => 'tls',
    ],
];
