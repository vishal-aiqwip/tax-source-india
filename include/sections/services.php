<?php $s = $content['services']; ?>
<section id="services" class="scroll-mt-[90px] bg-band px-6 py-[clamp(56px,6vw,88px)]">
  <div class="mx-auto max-w-[1160px]">

    <div class="mb-11 flex max-w-[700px] flex-col gap-3.5">
      <div class="eyebrow text-brand"><?= e($s['eyebrow']) ?></div>
      <h2 class="text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-extrabold"><?= e($s['heading']) ?></h2>
      <p class="text-[17px] leading-[1.65] text-muted"><?= e($s['intro']) ?></p>
    </div>

    <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[22px]">
      <?php foreach ($s['groups'] as $group): ?>
      <div class="flex flex-col gap-5 rounded-[14px] border border-line bg-white px-7 py-[30px]">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-tint text-brand">
            <?= icon($group['icon'], 'w-5 h-5') ?>
          </div>
          <h3 class="text-lg font-bold"><?= $group['title'] ?></h3>
        </div>
        <div class="flex flex-col">
          <?php $last = count($group['items']) - 1;
                foreach ($group['items'] as $i => $item): ?>
          <a href="#contact"
             class="group flex items-center justify-between gap-3 py-[13px] text-ink hover:text-brand<?= $i === $last ? '' : ' border-b border-line-soft' ?>">
            <span class="text-[15.5px] font-medium"><?= $item ?></span>
            <?= icon('chevron-right', 'w-4 h-4 shrink-0 text-[#B2C0CC] group-hover:text-brand', ['stroke-width' => '2.2']) ?>
          </a>
          <?php endforeach; ?>
        </div>
      </div>
      <?php endforeach; ?>
    </div>

    <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
      <p class="text-base text-muted"><?= e($s['footer_prompt']) ?></p>
      <a href="#contact" class="inline-flex items-center gap-2 text-base font-bold text-brand hover:text-brand-dark">
        <?= e($s['footer_link']) ?>
        <?= icon('arrow-right', 'w-[17px] h-[17px]', ['stroke-width' => '2.4']) ?>
      </a>
    </div>
  </div>
</section>
