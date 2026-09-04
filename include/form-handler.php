<?php
/**
 * Enquiry form: CSRF, spam checks, validation, logging, mail, then a
 * post-redirect-get so a reload never resubmits.
 *
 * Required from index.php before any output — this file may send headers.
 * Sets the globals $form_errors and $form_old, which the contact section
 * reads back through field_error() and old().
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/** CSRF token for this session, created on first use. */
function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf_token'];
}

// Consume the flash left by a failed submission, so it shows exactly once.
$form_errors = $_SESSION['form_errors'] ?? [];
$form_old    = $_SESSION['form_old'] ?? [];
unset($_SESSION['form_errors'], $_SESSION['form_old']);

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    return;
}

/** Store the flash and bounce back to the form. */
$fail = static function (array $errors, array $values): void {
    $_SESSION['form_errors'] = $errors;
    $_SESSION['form_old']    = $values;

    header('Location: ' . page_url('home') . '#contact', true, 303);
    exit;
};

$post = static fn(string $key): string => trim((string) ($_POST[$key] ?? ''));

$values = [
    'name'    => $post('name'),
    'phone'   => $post('phone'),
    'email'   => $post('email'),
    'topic'   => $post('topic'),
    'details' => $post('details'),
];

// ---- CSRF ----------------------------------------------------------------
if (!hash_equals($_SESSION['csrf_token'] ?? '', $post('csrf_token'))) {
    // Usually a stale tab rather than an attack — ask them to resend.
    $fail(['name' => 'Your session expired. Please send the form again.'], $values);
}

// ---- spam traps ----------------------------------------------------------
// A filled honeypot, or a form submitted implausibly fast, is a bot. Both are
// answered with the success page so the bot learns nothing.
//
// These are heuristics and can be wrong, so a rejected submission is written
// to its own log rather than dropped: a false positive would otherwise lose a
// real enquiry with no way to recover it. The log also records which trap
// fired, so a pattern of false positives is diagnosable instead of guesswork.
$elapsed  = time() - (int) $post('form_time');
$honeypot = $post('hp_ref') !== '';
$tooFast  = $elapsed < 3;

if ($honeypot || $tooFast) {
    $reason = $honeypot
        ? 'honeypot filled (value: ' . substr($post('hp_ref'), 0, 40) . ')'
        : 'submitted after ' . $elapsed . 's, under the 3s minimum';

    error_log('[tax-source-india] enquiry rejected: ' . $reason);

    $rejected = dirname($config['enquiry_log']) . '/rejected.csv';
    if ($handle = @fopen($rejected, 'a')) {
        if (flock($handle, LOCK_EX)) {
            if (filesize($rejected) === 0) {
                fputcsv($handle, ['rejected_at', 'reason', 'name', 'phone', 'email', 'topic', 'details', 'ip']);
            }
            fputcsv($handle, [
                date('Y-m-d H:i:s'), $reason,
                $values['name'], $values['phone'], $values['email'],
                $values['topic'], $values['details'],
                (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
            ]);
            fflush($handle);
            flock($handle, LOCK_UN);
        }
        fclose($handle);
    }

    header('Location: ' . page_url('thank-you'), true, 303);
    exit;
}

// ---- validation ----------------------------------------------------------
$errors = [];

$name_len = mb_strlen($values['name']);
if ($name_len === 0) {
    $errors['name'] = 'Please tell us your name.';
} elseif ($name_len < 2 || $name_len > 80) {
    $errors['name'] = 'Please enter your name (2 to 80 characters).';
}

$digits = preg_replace('/\D/', '', $values['phone']);
if ($values['phone'] === '') {
    $errors['phone'] = 'Please give us a number to call back on.';
} elseif (strlen($digits) < 10 || strlen($digits) > 13) {
    $errors['phone'] = 'Please enter a valid phone number.';
}

if ($values['email'] !== '' && !filter_var($values['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'That email address does not look right.';
}

// Topic must be one of the offered options; anything else was tampered with.
$topics = array_map(
    static fn(string $t): string => html_entity_decode($t, ENT_QUOTES, 'UTF-8'),
    $content['contact']['topics']
);
if (!in_array($values['topic'], $topics, true)) {
    $values['topic'] = $topics[0];
}

if (mb_strlen($values['details']) > 2000) {
    $values['details'] = mb_substr($values['details'], 0, 2000);
}

if ($errors) {
    $fail($errors, $values);
}

// ---- persist, then send --------------------------------------------------
$record = $values + [
    'submitted_at' => date('Y-m-d H:i:s'),
    'ip'           => (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
];

/**
 * Append to the enquiry log. Written before mail is attempted so an SMTP
 * outage cannot lose a lead.
 */
$log_enquiry = static function (array $record) use ($config): void {
    $path = $config['enquiry_log'];
    $dir  = dirname($path);

    if (!is_dir($dir) && !@mkdir($dir, 0775, true) && !is_dir($dir)) {
        error_log('[tax-source-india] cannot create data dir: ' . $dir);

        return;
    }

    $new    = !is_file($path);
    $handle = @fopen($path, 'a');

    if ($handle === false) {
        error_log('[tax-source-india] cannot open enquiry log: ' . $path);

        return;
    }

    if (flock($handle, LOCK_EX)) {
        if ($new) {
            fputcsv($handle, ['submitted_at', 'name', 'phone', 'email', 'topic', 'details', 'ip']);
        }
        fputcsv($handle, [
            $record['submitted_at'], $record['name'], $record['phone'],
            $record['email'], $record['topic'], $record['details'], $record['ip'],
        ]);
        fflush($handle);
        flock($handle, LOCK_UN);
    }

    fclose($handle);
};

$log_enquiry($record);

require __DIR__ . '/mailer.php';
send_enquiry($record);   // failures are logged inside; the visitor still gets the thank-you

// Post-redirect-get onto a dedicated page: a reload cannot resubmit, and the
// visitor gets a real confirmation rather than a panel inside the form.
header('Location: ' . page_url('thank-you'), true, 303);
exit;
