<?php
/**
 * FAQ accordion, built on native <details name="faq"> so only one panel is
 * open at a time — no JavaScript, and keyboard-accessible by default.
 */
$f = $content['faq'];
?>
<section id="faq" class="scroll-mt-[90px] bg-band px-6 py-[clamp(56px,6vw,88px)]">
  <div class="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-start gap-[clamp(32px,4vw,70px)]">

    <!-- Sticky once the grid is two columns, so the heading and the WhatsApp
         card stay in view while the answers are read. top-[100px] clears the
         84px sticky header. Not sticky in one column, where it sits above the
         list and would pin itself over the questions. -->
    <div class="flex flex-col gap-4 md:sticky md:top-[100px]">
      <div class="eyebrow text-brand"><?= e($f['eyebrow']) ?></div>
      <h2 class="text-[clamp(26px,3.2vw,38px)] leading-[1.12] font-extrabold"><?= e($f['heading']) ?></h2>
      <p class="text-[16.5px] leading-[1.65] text-muted"><?= e($f['intro']) ?></p>

      <div class="mt-2 flex flex-col gap-3 rounded-[14px] border border-line bg-white p-[22px]">
        <div class="flex items-center gap-[11px]">
          <?= icon('chat', 'w-5 h-5 text-brand') ?>
          <h3 class="text-base font-bold text-navy"><?= e($f['aside']['title']) ?></h3>
        </div>
        <p class="text-[14.5px] leading-relaxed text-muted"><?= e($f['aside']['body']) ?></p>
        <a href="<?= e(wa_url()) ?>" target="_blank" rel="noopener"
           class="flex items-center gap-2 text-[15px] font-bold text-brand hover:text-brand-dark">
          <?= e($config['phone']) ?>
          <?= icon('arrow-right', 'w-4 h-4', ['stroke-width' => '2.4']) ?>
        </a>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <?php foreach ($f['items'] as $i => $item): ?>
      <details name="faq" class="group rounded-[14px] border border-line bg-white px-[26px] py-6"
               <?= $i === 0 ? 'open' : '' ?>>
        <summary class="flex items-center justify-between gap-5">
          <h3 class="text-[18.5px] font-bold"><?= e($item['q']) ?></h3>
          <span class="shrink-0 text-[#7C8B98] group-open:hidden">
            <?= icon('plus', 'w-5 h-5', ['stroke-width' => '2.2']) ?>
          </span>
          <span class="hidden shrink-0 text-brand group-open:block">
            <?= icon('minus', 'w-5 h-5', ['stroke-width' => '2.2']) ?>
          </span>
        </summary>
        <p class="pt-3 text-[15.5px] leading-[1.65] text-muted"><?= e($item['a']) ?></p>
      </details>
      <?php endforeach; ?>
    </div>
  </div>
</section>
