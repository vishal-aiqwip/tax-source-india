<?php $c = $content['cta']; ?>
<section class="bg-band px-6 py-[clamp(44px,5vw,64px)]">
  <div class="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-8">
    <div class="flex flex-col gap-2.5">
      <h2 class="text-[clamp(26px,2.6vw,32px)] leading-tight font-extrabold"><?= e($c['heading']) ?></h2>
      <p class="text-[17px] text-muted"><?= e($c['body']) ?></p>
    </div>
    <!-- Both labels carry information — the phone number especially — so
         rather than collapsing one to an icon, the pair stays on one row
         below 640px on smaller type and tighter gutters. -->
    <div class="flex w-full flex-nowrap items-stretch gap-2.5 sm:w-auto sm:flex-wrap sm:items-center sm:gap-3.5">
      <a href="<?= e(home_anchor('contact')) ?>"
         class="btn-primary min-w-0 px-3 text-center text-[14px] sm:px-[26px] sm:text-[16px]"><?= e($c['primary']) ?></a>
      <a href="<?= e(tel_url($config['phone_raw'])) ?>"
         class="btn-secondary min-w-0 px-3 text-center text-[14px] whitespace-nowrap sm:px-[26px] sm:text-[16px]"><?= e($config['phone']) ?></a>
    </div>
  </div>
</section>
