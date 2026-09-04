<?php $h = $content['hero']; ?>
<section id="top" class="relative overflow-hidden bg-linear-to-b from-page to-hero-end px-6 pt-[clamp(24px,2.6vw,36px)]">
  <div class="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-center gap-[clamp(28px,3.4vw,52px)]">

    <!-- copy -->
    <div class="flex min-w-0 flex-col gap-[18px]">
      <div class="flex flex-wrap items-center gap-2.5 self-start rounded-full border border-[#D8E2EC] bg-white px-4 py-2">
        <?= icon('star', 'w-4 h-4 text-gold') ?>
        <span class="text-sm font-semibold text-navy"><?= e($h['badge_rating']) ?></span>
        <span class="h-3.5 w-px bg-[#D8E2EC]"></span>
        <span class="text-sm text-[#657A8D]"><?= e($h['badge_since']) ?></span>
      </div>

      <h1 class="text-[clamp(34px,4.2vw,50px)] leading-[1.04] font-extrabold">
        <?= e($h['heading']) ?> <span class="text-brand"><?= e($h['heading_em']) ?></span>
      </h1>

      <p class="text-[clamp(16px,1.4vw,18px)] leading-[1.55] text-[#495F73]"><?= e($h['sub']) ?></p>

      <!-- Below 640px the pair shares one row: WhatsApp collapses to its icon
           and the primary sits at its natural width, so the two never stack
           and eat space above the fold. -->
      <div class="flex flex-nowrap items-stretch gap-2.5 sm:flex-wrap sm:items-center sm:gap-3.5">
        <a href="#contact"
           class="btn-primary w-fit px-4 text-center sm:px-[26px]">
          Book a free consultation
          <?= icon('arrow-right', 'w-[18px] h-[18px] shrink-0', ['stroke-width' => '2.2']) ?>
        </a>
        <a href="<?= e(wa_url()) ?>" target="_blank" rel="noopener" aria-label="WhatsApp us"
           class="btn-secondary w-[52px] shrink-0 px-0 sm:w-auto sm:px-[26px]">
          <?= icon('chat', 'w-[18px] h-[18px] shrink-0') ?>
          <span class="hidden sm:inline">WhatsApp us</span>
        </a>
      </div>

      <ul class="flex flex-col gap-2.5 pt-1">
        <?php foreach ($h['proof'] as $line): ?>
        <li class="flex items-start gap-[9px] text-[15px] font-medium text-[#495F73]">
          <?= icon('check', 'w-[17px] h-[17px] shrink-0 mt-[3px] text-brand', ['stroke-width' => '2.4']) ?>
          <?= e($line) ?>
        </li>
        <?php endforeach; ?>
      </ul>
    </div>

    <!-- artwork -->
    <div class="relative flex min-w-0 flex-col items-center pb-[clamp(16px,2vw,28px)]">

      <!-- floating acknowledgement card (desktop only) -->
      <div class="absolute top-3.5 right-[45px] z-2 hidden max-w-[215px] items-center gap-[9px] rounded-[10px] border border-[#DEE6EF] bg-white px-[11px] py-[9px] shadow-[0_18px_36px_-22px_rgba(10,35,64,0.5)] nav:flex">
        <div class="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] bg-brand-tint">
          <?= icon('check', 'w-3.5 h-3.5 text-brand', ['stroke-width' => '2.4']) ?>
        </div>
        <div class="flex flex-col gap-0.5">
          <div class="text-xs leading-tight font-bold whitespace-nowrap text-navy"><?= e($h['float_card']['title']) ?></div>
          <div class="text-[9.5px] leading-tight whitespace-nowrap text-muted-2"><?= e($h['float_card']['sub']) ?></div>
        </div>
      </div>

      <!-- decorative rings -->
      <div class="pointer-events-none absolute top-2.5 -right-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(14,124,90,0.13)_0%,rgba(14,124,90,0.04)_55%,rgba(14,124,90,0)_72%)]"></div>
      <div class="pointer-events-none absolute top-[34px] right-0 h-[340px] w-[340px] rounded-full border border-dashed border-[#CBDAEA]"></div>

      <img src="<?= e(asset('images/hero.webp')) ?>"
           alt="Tax Source India accountant with client documents"
           width="880" height="853" fetchpriority="high"
           class="relative block h-auto w-full max-w-[420px]">

      <!-- compliance calendar card -->
      <div class="relative -mt-[160px] w-full max-w-[236px] self-start rounded-[14px] border border-[#DEE6EF] bg-white px-3.5 py-3 shadow-[0_26px_50px_-24px_rgba(10,35,64,0.45)]">
        <div class="flex items-center justify-between gap-2.5 border-b border-[#E6EDF4] pb-[9px]">
          <div class="font-display text-[11.5px] leading-tight font-bold tracking-[-0.02em] text-navy">
            <?= e($h['calendar']['title']) ?>
          </div>
          <div class="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-tint px-[9px] py-1">
            <span class="h-1.5 w-1.5 rounded-full bg-brand"></span>
            <span class="text-[9.5px] font-bold text-brand"><?= e($h['calendar']['status']) ?></span>
          </div>
        </div>
        <div class="flex flex-col pt-1">
          <?php $rows = $h['calendar']['rows'];
                $tones = [
                    'brand' => 'text-brand bg-brand-tint',
                    'amber' => 'text-amber-ink bg-amber-tint',
                    'grey'  => 'text-[#556B80] bg-[#F1F4F7]',
                ];
                foreach ($rows as $i => $row): ?>
          <?php if ($i > 0): ?><div class="h-px bg-[#E8EFF5]"></div><?php endif; ?>
          <div class="flex items-center gap-[9px] py-[7px]">
            <div class="flex h-[30px] w-[30px] shrink-0 flex-col items-center justify-center rounded-[7px] bg-fill">
              <div class="font-display text-[11px] leading-none font-extrabold text-navy"><?= e($row['day']) ?></div>
              <div class="text-[8.5px] font-bold text-muted-2"><?= e($row['month']) ?></div>
            </div>
            <div class="grow text-[11.5px] font-semibold text-navy"><?= e($row['label']) ?></div>
            <div class="rounded-md px-[7px] py-[3px] text-[9.5px] font-bold <?= $tones[$row['tone']] ?>">
              <?= e($row['badge']) ?>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>

  <!-- Stats strip. The grid collapses to one column on mobile, so the
       dividers run horizontally there and switch to vertical once the cells
       sit side by side. Cells are flush left on mobile; the 30px gutters and
       the flush outer edges only apply once there is more than one column. -->
  <div class="stats-strip mx-auto mt-[clamp(22px,2.4vw,34px)] max-w-[1160px]">
    <?php foreach ($h['stats'] as $stat): ?>
    <div class="flex flex-col gap-1.5">
      <div class="font-display text-[clamp(28px,2.6vw,34px)] font-extrabold tracking-[-0.02em] text-navy"><?= $stat['value'] ?></div>
      <div class="text-[14.5px] text-[#657A8D]"><?= $stat['label'] ?></div>
    </div>
    <?php endforeach; ?>
  </div>
</section>
