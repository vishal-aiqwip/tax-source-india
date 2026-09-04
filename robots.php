<?php
/**
 * robots.txt, served dynamically so the Sitemap line always points at this
 * host rather than a hardcoded domain.
 * Reached at /robots.txt via the rewrite in .htaccess.
 */

declare(strict_types=1);

$config = require __DIR__ . '/include/config.php';
require __DIR__ . '/include/functions.php';

header('Content-Type: text/plain; charset=utf-8');

$base = rtrim($config['base_url'], '/');
?>
User-agent: *
Allow: /

# Nothing here is meant to be crawled: server-side includes, page fragments
# rendered through the layout, and the enquiry log.
Disallow: <?= $base ?>/include/
Disallow: <?= $base ?>/pages/
Disallow: <?= $base ?>/data/
Disallow: <?= $base ?>/reference/
Disallow: <?= $base ?>/PHPMailer/

# Thank-you state is the home page with a query string — no need to index it.
Disallow: /*?sent=

Sitemap: <?= site_origin() . $base ?>/sitemap.xml
