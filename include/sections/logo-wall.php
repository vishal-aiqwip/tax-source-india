<?php
/**
 * Client logo wall. Off by default — the marks below are the source design's
 * generic placeholders, not real client logos. See config.php.
 */
if (empty($config['show_logo_wall'])) {
    return;
}
$w = $content['logo_wall'];
?>
<section class="border-b border-line-soft bg-white px-6 py-[46px]">
  <div class="mx-auto flex max-w-[1160px] flex-col items-center gap-[26px]">
    <h2 class="text-center text-[13.5px] font-bold tracking-[0.12em] text-[#7C8B98] uppercase">
      <?= e($w['title']) ?>
    </h2>
    <div class="grid w-full grid-cols-[repeat(auto-fit,minmax(160px,1fr))] items-center gap-6">
      <?php foreach ($w['marks'] as $mark): ?>
      <div class="flex h-[46px] items-center justify-center gap-2.5 text-faint">
        <?= icon($mark['icon'], 'w-[26px] h-[26px]') ?>
        <span class="font-display text-[17px] <?= $mark['weight'] ?> <?= $mark['tracking'] ?>"><?= $mark['label'] ?></span>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
