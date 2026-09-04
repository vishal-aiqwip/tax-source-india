<?php
/**
 * Copy this file to config.local.php and fill in the real values.
 *
 * config.local.php is gitignored — credentials must never be committed.
 * Only the keys you list here are overridden; everything else falls back to
 * the defaults in config.php.
 */

return [
    // base_url is detected from where index.php sits, so it needs no entry
    // here for either localhost/tax-source-india or the domain root.

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
