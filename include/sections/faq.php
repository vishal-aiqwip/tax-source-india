<?php
/**
 * FAQ accordion, built on native <details name="faq"> so only one panel is
 * open at a time — no JavaScript, and keyboard-accessible by default.
 */
$f = $content['faq'];
?>
<section id="faq" class="scroll-mt-[90px] bg-band px-6 py-[clamp(56px,6vw,88px)]">
  <!-- Flex, not an auto-fit grid: this section has exactly two children, so
       the track count is not something to discover. It also means one
       breakpoint governs both the columns and the sticky below, instead of
       md: having to approximate wherever auto-fit happened to wrap. -->
  <div class="mx-auto flex max-w-[1160px] flex-col items-start gap-[clamp(32px,4vw,70px)] md:flex-row">

    <!-- Sticky from md: up, where the columns appear. top-[100px] clears the
         84px sticky header. Not sticky in one column, where it sits above the
         list and would pin itself over the questions being read. -->
    <div class="flex w-full min-w-0 flex-col gap-4 md:sticky md:top-[100px] md:flex-1">
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

    <div class="flex w-full min-w-0 flex-col gap-3 md:flex-1">
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
