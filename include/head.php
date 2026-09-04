<?php
/**
 * Document head: meta, social cards, fonts, compiled CSS, and (on the home
 * page) the LocalBusiness structured data.
 */

$meta  = $content['meta'][$page] ?? $content['meta']['home'];
$canon = site_origin() . page_url($page === '404' ? 'home' : $page);
$addr  = $config['address'];
?>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title><?= e($meta['title']) ?></title>
  <meta name="description" content="<?= e($meta['description']) ?>">
  <link rel="canonical" href="<?= e($canon) ?>">
  <?php if ($page === '404'): ?>
  <meta name="robots" content="noindex">
  <?php endif; ?>

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="<?= e($config['site_name']) ?>">
  <meta property="og:title" content="<?= e($meta['title']) ?>">
  <meta property="og:description" content="<?= e($meta['description']) ?>">
  <meta property="og:url" content="<?= e($canon) ?>">
  <meta property="og:image" content="<?= e(site_origin() . asset('images/og-image.jpg')) ?>">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="en_IN">
  <meta name="twitter:card" content="summary_large_image">

  <meta name="theme-color" content="#0A2340">
  <link rel="icon" href="<?= e(asset('images/favicon-48.png')) ?>" sizes="48x48">
  <link rel="apple-touch-icon" href="<?= e(asset('images/apple-touch-icon.png')) ?>">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&amp;family=Public+Sans:wght@400;500;600;700&amp;display=swap">

  <link rel="stylesheet" href="<?= e(asset('style/tailwind.css')) ?>">
  <script src="<?= e(asset('js/site.js')) ?>" defer></script>

<?php if ($page === 'home'): ?>
  <script type="application/ld+json">
<?= json_encode([
    '@context' => 'https://schema.org',
    '@type'    => 'AccountingService',
    'name'     => $config['site_name'],
    'description' => $meta['description'],
    'url'      => site_origin() . page_url('home'),
    'image'    => site_origin() . asset('images/office.webp'),
    'logo'     => site_origin() . asset('images/logo.png'),
    'telephone' => [$config['phone_raw'], $config['phone_alt_raw']],
    'email'    => $config['email'],
    'priceRange' => '₹₹',
    'address'  => [
        '@type'           => 'PostalAddress',
        'streetAddress'   => $addr['street'],
        'addressLocality' => $addr['locality'],
        'addressRegion'   => $addr['region'],
        'postalCode'      => $addr['postcode'],
        'addressCountry'  => $addr['country'],
    ],
    'geo' => [
        '@type'     => 'GeoCoordinates',
        'latitude'  => $addr['lat'],
        'longitude' => $addr['lng'],
    ],
    'openingHoursSpecification' => [[
        '@type'     => 'OpeningHoursSpecification',
        'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens'     => '08:00',
        'closes'    => '19:00',
    ]],
    'aggregateRating' => [
        '@type'       => 'AggregateRating',
        'ratingValue' => $config['rating'],
        'reviewCount' => $config['rating_count'],
    ],
    'areaServed' => ['@type' => 'City', 'name' => 'Bengaluru'],
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) ?>
  </script>
<?php endif; ?>
</head>
