<?php $c = $content['cta']; ?>
<section class="bg-band px-6 py-[clamp(44px,5vw,64px)]">
  <div class="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-8">
    <div class="flex flex-col gap-2.5">
      <h2 class="text-[clamp(26px,2.6vw,32px)] leading-tight font-extrabold"><?= e($c['heading']) ?></h2>
      <p class="text-[17px] text-muted"><?= e($c['body']) ?></p>
    </div>
    <div class="flex flex-wrap items-center gap-3.5">
      <a href="<?= e(home_anchor('contact')) ?>" class="btn-primary"><?= e($c['primary']) ?></a>
      <a href="<?= e(tel_url($config['phone_raw'])) ?>" class="btn-secondary"><?= e($config['phone']) ?></a>
    </div>
  </div>
</section>
