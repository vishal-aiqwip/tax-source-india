<?php
/**
 * XML sitemap, generated from the same page list the router uses so it can
 * never drift out of sync with what the site actually serves.
 * Reached at /sitemap.xml via the rewrite in .htaccess.
 */

declare(strict_types=1);

$config = require __DIR__ . '/include/config.php';
require __DIR__ . '/include/functions.php';

// page => [change frequency, priority]
$pages = [
    'home'    => ['weekly',  '1.0'],
    'privacy' => ['yearly',  '0.3'],
    'terms'   => ['yearly',  '0.3'],
];

$origin   = site_origin();
$modified = date('Y-m-d', (int) filemtime(__DIR__ . '/include/content.php'));

header('Content-Type: application/xml; charset=utf-8');
echo '<?xml version="1.0" encoding="UTF-8"?>', "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($pages as $page => [$freq, $priority]): ?>
  <url>
    <loc><?= e($origin . page_url($page)) ?></loc>
    <lastmod><?= $modified ?></lastmod>
    <changefreq><?= $freq ?></changefreq>
    <priority><?= $priority ?></priority>
  </url>
<?php endforeach; ?>
</urlset>
