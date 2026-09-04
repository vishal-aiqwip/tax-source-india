<?php
/**
 * Post-submission confirmation. Reached only by the redirect at the end of
 * form-handler.php, and bounces back to the home page after 2 seconds
 * (the meta refresh lives in head.php so it works without JavaScript).
 *
 * noindex, absent from the sitemap and disallowed in robots.txt: it is a
 * conversion endpoint, not content.
 */
$t = $content['contact']['sent'];
?>
<!-- The section centres the block vertically (its main axis is horizontal, so
     that is items-center); the inner column centres its own contents
     horizontally, which in a flex-col is also items-center — justify-center
     there would work the vertical axis instead. -->
<section class="flex min-h-[70vh] items-center justify-center bg-linear-to-b from-page to-hero-end px-6 py-[clamp(48px,6vw,88px)]">
  <div class="flex max-w-[620px] flex-col items-center gap-5 text-center">

    <div class="flex h-14 w-14 items-center justify-center rounded-full bg-brand-tint text-brand">
      <?= icon('check-circle', 'w-8 h-8', ['stroke-width' => '2.2']) ?>
    </div>

    <h1 class="text-[clamp(30px,3.6vw,42px)] leading-[1.1] font-extrabold"><?= e($t['title']) ?></h1>

    <p class="text-[17px] leading-[1.65] text-muted">
      <?= e($t['body']) ?>
      <a href="<?= e(tel_url($config['phone_raw'])) ?>" class="font-semibold text-brand hover:text-brand-dark"><?= e($config['phone']) ?></a>.
    </p>

    <div class="mt-2 flex flex-wrap items-center gap-3.5">
      <a href="<?= e(page_url('home')) ?>" class="btn-primary">
        Back to the home page
        <?= icon('arrow-right', 'w-[18px] h-[18px]', ['stroke-width' => '2.2']) ?>
      </a>
      <a href="<?= e(wa_url()) ?>" target="_blank" rel="noopener" class="btn-secondary">
        <?= icon('chat', 'w-[18px] h-[18px]') ?>
        WhatsApp us
      </a>
    </div>

    <!-- The page redirects on its own after 2 seconds. Saying so, and giving a
         link that works immediately, means nobody has to race it or wait for
         it (WCAG 2.2.1). aria-live keeps it out of the way of the heading. -->
    <p class="pt-2 text-[14px] text-muted-2" aria-live="polite">
      Taking you back to the home page in a moment&hellip;
    </p>
  </div>
</section>
