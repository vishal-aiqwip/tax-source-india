<?php $t = $content['testimonials']; ?>
<section class="bg-page px-6 py-[clamp(56px,6vw,88px)]">
  <div class="mx-auto max-w-[1160px]">

    <div class="mb-11 flex max-w-[640px] flex-col gap-3.5">
      <div class="eyebrow text-brand"><?= e($t['eyebrow']) ?></div>
      <h2 class="text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-extrabold"><?= e($t['heading']) ?></h2>
    </div>

    <div class="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[22px]">
      <?php foreach ($t['items'] as $item): ?>
      <figure class="flex flex-col gap-[18px] rounded-[14px] border border-line bg-white px-7 py-[30px]">
        <div class="flex gap-[3px] text-gold" role="img"
             aria-label="<?= (int) $item['stars'] ?> out of 5 stars">
          <?= icon_repeat('star', (int) $item['stars'], 'w-[17px] h-[17px]') ?>
        </div>
        <blockquote class="text-[16.5px] leading-[1.65] text-ink">
          &ldquo;<?= e($item['quote']) ?>&rdquo;
        </blockquote>
        <figcaption class="mt-auto flex items-center gap-3 border-t border-line-soft pt-5">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white"
               aria-hidden="true"><?= e(initials($item['name'])) ?></div>
          <div class="flex flex-col gap-px">
            <div class="text-[15px] font-bold text-navy"><?= e($item['name']) ?></div>
            <div class="text-[13px] text-muted-2"><?= e($item['role']) ?></div>
          </div>
        </figcaption>
      </figure>
      <?php endforeach; ?>
    </div>
  </div>
</section>
