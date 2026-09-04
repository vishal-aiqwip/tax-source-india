<?php
/**
 * Front controller. The only entry point — every request lands here and is
 * dispatched to a file in pages/.
 */

declare(strict_types=1);

$config  = require __DIR__ . '/include/config.php';
$content = require __DIR__ . '/include/content.php';
require __DIR__ . '/include/functions.php';

// Must run before any output: it may issue a redirect.
require __DIR__ . '/include/form-handler.php';

// Whitelist. $_GET is never interpolated into a path.
$pages = ['home', 'privacy', 'terms'];
$page  = (string) ($_GET['page'] ?? 'home');

if (!in_array($page, $pages, true)) {
    http_response_code(404);
    $page = '404';
}

require __DIR__ . '/include/layout.php';
