<?php
/**
 * Site footer, plus the two fixed-position widgets (chat button and the
 * mobile call bar) which sit outside <main>.
 */
?>
<footer class="bg-navy px-6 pt-[clamp(48px,5vw,64px)] pb-[34px]">
  <div class="mx-auto max-w-[1160px]">

    <div class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10 border-b border-navy-line pb-11">

      <div class="flex flex-col gap-4">
        <div class="flex flex-col items-start gap-3">
          <img src="<?= e(asset('images/logo-mark.png')) ?>" alt="<?= e($config['site_name']) ?>"
               width="52" height="52" loading="lazy" class="block h-[52px] w-[52px] rounded-xl">
          <div class="text-xs font-semibold tracking-[0.08em] text-on-dark-2 uppercase">
            <?= e($config['tagline']) ?>
          </div>
        </div>
        <p class="max-w-[300px] text-[14.5px] leading-relaxed text-on-dark">
          <?= e($content['footer']['blurb']) ?>
        </p>
        <div class="flex gap-2.5">
          <?php foreach ($content['footer']['social'] as $s):
              $href = $s['href'] === 'whatsapp' ? wa_url() : $s['href'];
              $ext  = $s['href'] === 'whatsapp'; ?>
          <a href="<?= e($href) ?>" aria-label="<?= e($s['label']) ?>"
             <?= $ext ? 'target="_blank" rel="noopener"' : '' ?>
             class="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] bg-navy-chip text-on-dark transition-colors hover:text-white">
            <?= icon($s['icon'], 'w-[17px] h-[17px]') ?>
          </a>
          <?php endforeach; ?>
        </div>
      </div>

      <?php foreach ($content['footer']['columns'] as $col): ?>
      <div class="flex flex-col gap-[13px]">
        <h2 class="text-[13px] font-bold tracking-[0.09em] text-white uppercase"><?= $col['title'] ?></h2>
        <?php foreach ($col['links'] as $link): ?>
        <a href="<?= e(home_anchor('services')) ?>"
           class="text-[14.5px] text-on-dark hover:text-white"><?= $link ?></a>
        <?php endforeach; ?>
      </div>
      <?php endforeach; ?>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-6 pt-[26px]">
      <div class="text-sm text-on-dark-2">
        &copy; <?= date('Y') ?> <?= e($config['site_name']) ?>. All rights reserved.
      </div>
      <div class="flex flex-wrap gap-[26px]">
        <a href="<?= e(page_url('privacy')) ?>" class="text-sm text-on-dark hover:text-white">Privacy policy</a>
        <a href="<?= e(page_url('terms')) ?>" class="text-sm text-on-dark hover:text-white">Terms of service</a>
        <a href="mailto:<?= e($config['email']) ?>" class="text-sm text-on-dark hover:text-white"><?= e($config['email']) ?></a>
      </div>
    </div>
  </div>
</footer>

<?php
if ($config['show_chat']) {
    require __DIR__ . '/sections/chat-widget.php';
}
if ($config['show_call_bar']) {
    require __DIR__ . '/sections/call-bar.php';
}
