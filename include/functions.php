<?php
/**
 * Small template helpers. No side effects — safe to require anywhere.
 */

/** Escape for HTML output. Used on every dynamic string in a template. */
function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/**
 * Scheme + host for this request, e.g. "https://taxsourceindia.com".
 * Sitemaps and robots.txt need absolute URLs, and deriving them from the
 * request means they stay correct when the site moves to its real domain.
 */
function site_origin(): string
{
    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';

    return ($https ? 'https://' : 'http://') . $host;
}

/**
 * URL for a static file under the project root.
 *
 * Appends ?v=<mtime> so the URL changes whenever the file does. Without this
 * the 30-day Cache-Control in .htaccess is a trap: a rebuilt stylesheet keeps
 * its old URL, so returning browsers serve the stale copy for a month.
 *
 * Pass $version = false for URLs handed to social scrapers and structured
 * data, which are better left clean.
 */
function asset(string $path, bool $version = true): string
{
    global $config;

    $rel = ltrim($path, '/');
    $url = rtrim($config['base_url'], '/') . '/' . $rel;

    if ($version) {
        $file = dirname(__DIR__) . '/' . $rel;
        if (is_file($file) && ($mtime = filemtime($file))) {
            $url .= '?v=' . $mtime;
        }
    }

    return $url;
}

/**
 * URL for a routed page. Respects the pretty_urls flag so links keep working
 * on an Apache without mod_rewrite.
 */
function page_url(string $page = 'home', array $query = []): string
{
    global $config;

    $base = rtrim($config['base_url'], '/');

    if ($config['pretty_urls']) {
        $url = $page === 'home' ? $base . '/' : $base . '/' . $page;
    } else {
        $url = $base . '/index.php';
        if ($page !== 'home') {
            $query = ['page' => $page] + $query;
        }
    }

    return $query ? $url . '?' . http_build_query($query) : $url;
}

/**
 * Link to a section of the home page. On the home page this stays a bare
 * fragment so smooth scrolling works; elsewhere it becomes a full URL.
 */
function home_anchor(string $fragment): string
{
    global $page;

    $fragment = '#' . ltrim($fragment, '#');

    return ($page ?? 'home') === 'home' ? $fragment : page_url('home') . $fragment;
}

/** `tel:` href for a raw phone number. */
function tel_url(string $raw): string
{
    return 'tel:' . preg_replace('/[^0-9+]/', '', $raw);
}

/** WhatsApp deep link, optionally prefilled with a message. */
function wa_url(string $text = ''): string
{
    global $config;

    $url = 'https://wa.me/' . $config['whatsapp'];

    return $text === '' ? $url : $url . '?text=' . rawurlencode($text);
}

/**
 * Render an icon from the registry.
 *
 * Colour comes from the Tailwind class via currentColor, so the same icon
 * works on light and dark bands.
 */
function icon(string $name, string $class = 'w-4 h-4', array $attrs = []): string
{
    static $icons = null;
    if ($icons === null) {
        $icons = require __DIR__ . '/icons.php';
    }

    if (!isset($icons[$name])) {
        return '';
    }

    [$body, $style] = $icons[$name];

    $paint = $style === 'fill'
        ? 'fill="currentColor"'
        : 'fill="none" stroke="currentColor" stroke-width="' . ($attrs['stroke-width'] ?? '2')
          . '" stroke-linecap="round" stroke-linejoin="round"';

    $extra = '';
    foreach ($attrs as $key => $value) {
        if ($key === 'stroke-width') {
            continue;
        }
        $extra .= ' ' . $key . '="' . e((string) $value) . '"';
    }

    // aria-hidden by default: icons here are decorative, the text carries meaning.
    if (!isset($attrs['aria-hidden']) && !isset($attrs['aria-label'])) {
        $extra .= ' aria-hidden="true"';
    }

    return '<svg viewBox="0 0 24 24" class="' . e($class) . '" ' . $paint . $extra . '>'
        . $body . '</svg>';
}

/** Repeat an icon n times — used for star ratings. */
function icon_repeat(string $name, int $times, string $class): string
{
    return str_repeat(icon($name, $class), max(0, $times));
}

/**
 * Previously submitted value for a form field, after a failed validation
 * round-trip. Empty string once the flash has been consumed.
 */
function old(string $field, string $default = ''): string
{
    global $form_old;

    return isset($form_old[$field]) ? (string) $form_old[$field] : $default;
}

/** Validation error for a field, or null. */
function field_error(string $field): ?string
{
    global $form_errors;

    return $form_errors[$field] ?? null;
}

/** Initials for a testimonial avatar: "Raja S Reddy" -> "RR". */
function initials(string $name): string
{
    $parts = preg_split('/\s+/', trim($name)) ?: [];
    if (count($parts) === 0) {
        return '';
    }
    $first = mb_substr($parts[0], 0, 1);
    $last  = count($parts) > 1 ? mb_substr(end($parts), 0, 1) : '';

    return mb_strtoupper($first . $last);
}
