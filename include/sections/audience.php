<?php $a = $content['audience']; ?>
<section class="bg-white px-6 py-[clamp(56px,6vw,88px)]">
  <div class="mx-auto max-w-[1160px]">

    <div class="mb-11 flex flex-wrap items-end justify-between gap-10">
      <div class="flex max-w-[620px] flex-col gap-3.5">
        <div class="eyebrow text-brand"><?= e($a['eyebrow']) ?></div>
        <h2 class="text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-extrabold"><?= e($a['heading']) ?></h2>
      </div>
      <p class="max-w-[380px] text-base leading-relaxed text-[#657A8D]"><?= e($a['intro']) ?></p>
    </div>

    <div class="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[22px]">
      <?php foreach ($a['cards'] as $card):
          $dark = $card['dark']; ?>
      <div class="flex flex-col gap-4 rounded-[14px] border p-[30px] <?= $dark
          ? 'border-navy bg-navy' : 'border-line bg-page' ?>">

        <div class="flex h-12 w-12 items-center justify-center rounded-[11px] <?= $dark
            ? 'bg-navy-chip text-teal' : 'bg-brand-tint text-brand' ?>">
          <?= icon($card['icon'], 'w-6 h-6', ['stroke-width' => '1.9']) ?>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="text-[21px] font-bold <?= $dark ? 'text-white' : '' ?>"><?= $card['title'] ?></h3>
          <p class="text-[15px] leading-relaxed <?= $dark ? 'text-[#A3B7CA]' : 'text-muted' ?>"><?= e($card['body']) ?></p>
        </div>

        <ul class="flex flex-col gap-[9px] pt-1">
          <?php foreach ($card['items'] as $item): ?>
          <li class="flex items-start gap-[9px] text-[14.5px] <?= $dark ? 'text-[#DAE6F0]' : 'text-body' ?>">
            <?= icon('check', 'w-[15px] h-[15px] shrink-0 mt-[3px] ' . ($dark ? 'text-teal' : 'text-brand'), ['stroke-width' => '2.6']) ?>
            <?= $item ?>
          </li>
          <?php endforeach; ?>
        </ul>

        <a href="#contact" class="mt-auto flex items-center gap-2 pt-2 text-[15px] font-bold <?= $dark
            ? 'text-teal hover:text-white' : 'text-brand hover:text-brand-dark' ?>">
          Get a quote
          <?= icon('arrow-right', 'w-4 h-4', ['stroke-width' => '2.4']) ?>
        </a>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
