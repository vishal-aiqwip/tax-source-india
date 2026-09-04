<?php
/**
 * Sticky header: logo, desktop nav, phone + CTA, and the mobile drawer.
 *
 * The desktop/mobile switch is the `nav:` breakpoint (1080px), matching the
 * source design's own threshold.
 */
?>
<header class="sticky top-0 z-40 border-b border-[#E2E9F1] bg-page/95 backdrop-blur-[8px]">
  <div class="mx-auto flex min-h-[84px] max-w-[1160px] items-center gap-8 px-6">

    <a href="<?= e(page_url('home')) ?>#top" class="flex shrink-0 items-center">
      <img src="<?= e(asset('images/logo.png')) ?>" alt="<?= e($config['site_name']) ?>"
           width="96" height="44" class="block h-11 w-auto">
    </a>

    <!-- desktop nav -->
    <nav class="ml-2.5 hidden items-center gap-[30px] nav:flex" aria-label="Main">
      <?php foreach ($content['nav'] as $item): ?>
      <a href="<?= e(home_anchor($item['href'])) ?>"
         class="text-[15px] whitespace-nowrap <?= !empty($item['strong'])
             ? 'font-semibold text-navy' : 'font-medium text-[#556B80] hover:text-navy' ?>">
        <?= e($item['label']) ?>
      </a>
      <?php endforeach; ?>
    </nav>

    <div class="grow"></div>

    <!-- desktop actions -->
    <div class="hidden items-center gap-4 nav:flex">
      <a href="<?= e(tel_url($config['phone_raw'])) ?>"
         class="flex items-center gap-2 text-[15px] font-semibold whitespace-nowrap text-navy hover:text-brand">
        <?= icon('phone', 'w-[17px] h-[17px] text-brand') ?>
        <?= e($config['phone']) ?>
      </a>
      <a href="<?= e(home_anchor('contact')) ?>"
         class="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-brand px-5 py-3 text-[15px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-dark">
        Book a free call
      </a>
    </div>

    <!-- mobile actions -->
    <div class="flex items-center gap-2.5 nav:hidden">
      <a href="<?= e(tel_url($config['phone_raw'])) ?>" aria-label="Call <?= e($config['phone']) ?>"
         class="flex h-[46px] w-[46px] items-center justify-center rounded-lg border border-line-strong bg-white">
        <?= icon('phone', 'w-[19px] h-[19px] text-brand') ?>
      </a>
      <button type="button" id="menu-toggle" aria-label="Menu" aria-expanded="false" aria-controls="mobile-menu"
              class="flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-lg border border-line-strong bg-white">
        <?= icon('menu', 'w-5 h-5 text-navy') ?>
      </button>
    </div>
  </div>

  <!-- mobile drawer -->
  <div id="mobile-menu" hidden
       class="flex flex-col border-t border-[#E2E9F1] bg-page px-6 pt-3 pb-5 nav:hidden">
    <?php $last = count($content['nav']) - 1;
          foreach ($content['nav'] as $i => $item): ?>
    <a href="<?= e(home_anchor($item['href'])) ?>" data-menu-close
       class="py-3.5 text-base font-semibold text-navy<?= $i === $last ? '' : ' border-b border-[#E6EDF4]' ?>">
      <?= e($item['label']) ?>
    </a>
    <?php endforeach; ?>
    <a href="<?= e(home_anchor('contact')) ?>" data-menu-close
       class="mt-3.5 inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-lg bg-brand px-6 py-4 text-base font-semibold text-white">
      Book a free consultation
    </a>
  </div>
</header>
