<?php $p = $content['process']; ?>
<section id="how" class="scroll-mt-[90px] bg-navy px-6 py-[clamp(56px,6vw,84px)]">
  <div class="mx-auto max-w-[1160px]">

    <div class="mb-12 flex flex-wrap items-end justify-between gap-10">
      <div class="flex max-w-[640px] flex-col gap-3.5">
        <div class="eyebrow text-teal"><?= e($p['eyebrow']) ?></div>
        <h2 class="text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-extrabold text-white"><?= e($p['heading']) ?></h2>
      </div>
      <p class="max-w-[360px] text-base leading-relaxed text-[#91A6BA]"><?= e($p['intro']) ?></p>
    </div>

    <ol class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
      <?php foreach ($p['steps'] as $step): ?>
      <li class="flex flex-col gap-3.5 rounded-[14px] border border-navy-line bg-navy-card px-6 py-7">
        <div class="font-display text-[13px] font-extrabold tracking-[0.12em] text-teal"><?= e($step['n']) ?></div>
        <h3 class="text-xl font-bold text-white"><?= e($step['title']) ?></h3>
        <p class="text-[14.5px] leading-relaxed text-[#91A6BA]"><?= e($step['body']) ?></p>
      </li>
      <?php endforeach; ?>
    </ol>
  </div>
</section>
