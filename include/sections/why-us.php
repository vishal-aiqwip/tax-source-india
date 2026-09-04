<?php $w = $content['why']; $ph = $w['photos']; ?>
<section id="why" class="scroll-mt-[90px] bg-white px-6 py-[clamp(56px,6vw,88px)]">
  <div class="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-center gap-[clamp(32px,4vw,60px)]">

    <!-- photo stack -->
    <div class="flex min-w-0 flex-col gap-4">
      <div class="relative overflow-hidden rounded-[14px] shadow-[0_24px_48px_-28px_rgba(10,35,64,0.45)]">
        <img src="<?= e(asset($ph['main']['src'])) ?>" alt="<?= e($ph['main']['alt']) ?>"
             width="<?= $ph['main']['w'] ?>" height="<?= $ph['main']['h'] ?>" loading="lazy"
             class="block h-auto w-full">
        <div class="absolute inset-x-0 bottom-0 bg-linear-to-b from-transparent to-navy/80 px-[22px] pt-10 pb-[18px]">
          <div class="text-[15px] font-bold text-white"><?= e($ph['main']['title']) ?></div>
          <div class="mt-0.5 text-[13.5px] text-[#C1D0DE]"><?= e($ph['main']['sub']) ?></div>
        </div>
      </div>

      <div class="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-4">
        <?php foreach ($ph['small'] as $small): ?>
        <div class="relative h-[190px] overflow-hidden rounded-[14px]">
          <img src="<?= e(asset($small['src'])) ?>" alt="<?= e($small['alt']) ?>"
               width="<?= $small['w'] ?>" height="<?= $small['h'] ?>" loading="lazy"
               class="block h-full w-full object-cover">
          <div class="absolute inset-x-0 bottom-0 bg-linear-to-b from-transparent to-navy/[0.78] px-3.5 pt-7 pb-3">
            <div class="text-[13.5px] font-bold text-white"><?= e($small['title']) ?></div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- copy -->
    <div class="flex min-w-0 flex-col gap-[18px]">
      <div class="eyebrow text-brand"><?= e($w['eyebrow']) ?></div>
      <h2 class="text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-extrabold"><?= e($w['heading']) ?></h2>
      <p class="text-[17px] leading-[1.65] text-muted"><?= e($w['intro']) ?></p>

      <div class="flex flex-col gap-3.5 pt-1.5">
        <?php foreach ($w['pillars'] as $pillar): ?>
        <div class="flex items-start gap-[18px]">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-brand-tint text-brand">
            <?= icon($pillar['icon'], 'w-[22px] h-[22px]', ['stroke-width' => '1.9']) ?>
          </div>
          <div class="flex flex-col gap-[5px]">
            <h3 class="text-[19px] font-bold"><?= e($pillar['title']) ?></h3>
            <p class="text-[15px] leading-relaxed text-muted"><?= e($pillar['body']) ?></p>
          </div>
        </div>
        <?php endforeach; ?>
      </div>

      <div class="mt-2 flex items-start gap-4 rounded-[14px] border border-line bg-page px-[22px] py-5">
        <?= icon('shield', 'w-[22px] h-[22px] shrink-0 mt-0.5 text-brand') ?>
        <p class="text-[15.5px] leading-relaxed text-body">
          <strong class="text-navy"><?= e($w['note_strong']) ?></strong><?= e($w['note_rest']) ?>
        </p>
      </div>
    </div>
  </div>
</section>
