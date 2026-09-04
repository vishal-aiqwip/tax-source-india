<?php
/**
 * PHPMailer wrapper. No Composer here, so the three source files are required
 * directly — PHPMailer is dependency-free and needs no autoloader.
 */

require_once __DIR__ . '/../PHPMailer/PHPMailer/src/Exception.php';
require_once __DIR__ . '/../PHPMailer/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/../PHPMailer/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailException;

/**
 * Send one enquiry to the practice inbox.
 *
 * Returns false on any failure — the caller has already written the enquiry
 * to the CSV log, so a false here means "tell nobody, log it" rather than
 * "lose the lead".
 */
function send_enquiry(array $data): bool
{
    global $config;

    $mail_cfg = $config['mail'];

    if (empty($mail_cfg['enabled'])) {
        error_log('[tax-source-india] mail disabled; enquiry logged to CSV only');

        return false;
    }

    if ($mail_cfg['host'] === '' || $mail_cfg['username'] === '') {
        error_log('[tax-source-india] mail enabled but SMTP host/username missing');

        return false;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = $mail_cfg['host'];
        $mail->Port       = (int) $mail_cfg['port'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $mail_cfg['username'];
        $mail->Password   = $mail_cfg['password'];
        $mail->SMTPSecure = $mail_cfg['encryption'] === 'ssl'
            ? PHPMailer::ENCRYPTION_SMTPS
            : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->CharSet = 'UTF-8';
        $mail->Timeout = 15;

        // From must be a mailbox on the sending domain — using the visitor's
        // address here fails SPF/DMARC and gets the mail dropped.
        $mail->setFrom($mail_cfg['from'], $mail_cfg['from_name']);
        $mail->addAddress($mail_cfg['to'], $mail_cfg['to_name']);

        if ($data['email'] !== '') {
            $mail->addReplyTo($data['email'], $data['name']);
        }

        $mail->Subject = $mail_cfg['subject'] . ' — ' . $data['topic'];

        $rows = [
            'Name'    => $data['name'],
            'Phone'   => $data['phone'],
            'Email'   => $data['email'] !== '' ? $data['email'] : '(not given)',
            'Topic'   => $data['topic'],
            'Details' => $data['details'] !== '' ? $data['details'] : '(none)',
            'Sent'    => $data['submitted_at'],
            'From IP' => $data['ip'],
        ];

        $html = '<h2 style="font-family:sans-serif">New website enquiry</h2><table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">';
        $text = "New website enquiry\n\n";

        foreach ($rows as $label => $value) {
            $html .= '<tr><td style="vertical-align:top;color:#6A7B8A"><strong>' . htmlspecialchars($label, ENT_QUOTES, 'UTF-8')
                . '</strong></td><td style="vertical-align:top">' . nl2br(htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8'))
                . '</td></tr>';
            $text .= $label . ': ' . $value . "\n";
        }

        $mail->isHTML(true);
        $mail->Body    = $html . '</table>';
        $mail->AltBody = $text;

        $mail->send();

        return true;
    } catch (MailException $e) {
        // ErrorInfo carries the SMTP-level reason; getMessage() the wrapper's.
        error_log('[tax-source-india] enquiry mail failed: ' . $mail->ErrorInfo);

        return false;
    }
}
