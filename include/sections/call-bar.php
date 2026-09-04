<?php
/**
 * Sticky call / WhatsApp bar. Mobile only — hidden at the nav breakpoint,
 * so no JavaScript is involved.
 */
?>
<div class="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2.5 border-t border-line bg-white px-4 py-2.5 shadow-[0_-8px_24px_-16px_rgba(10,35,64,0.5)] nav:hidden">
  <a href="<?= e(tel_url($config['phone_raw'])) ?>"
     class="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand text-base font-semibold text-white">
    <?= icon('phone', 'w-[18px] h-[18px]') ?>
    Call now
  </a>
  <a href="<?= e(wa_url()) ?>" target="_blank" rel="noopener"
     class="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line-strong bg-white text-base font-semibold text-navy">
    <?= icon('chat', 'w-[18px] h-[18px]') ?>
    WhatsApp
  </a>
</div>
