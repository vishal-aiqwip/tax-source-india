<section class="bg-linear-to-b from-page to-hero-end px-6 py-[clamp(64px,8vw,120px)]">
  <div class="mx-auto flex max-w-[620px] flex-col items-start gap-5">
    <div class="eyebrow text-brand">Error 404</div>
    <h1 class="text-[clamp(32px,4vw,46px)] leading-[1.08] font-extrabold">
      That page is not here.
    </h1>
    <p class="text-[17px] leading-[1.65] text-muted">
      The link may be out of date, or the address mistyped. Everything we do is on the home page, or
      you can just call us and ask.
    </p>

    <div class="mt-2 flex flex-wrap items-center gap-3.5">
      <a href="<?= e(page_url('home')) ?>" class="btn-primary">
        Go to the home page
        <?= icon('arrow-right', 'w-[18px] h-[18px]', ['stroke-width' => '2.2']) ?>
      </a>
      <a href="<?= e(tel_url($config['phone_raw'])) ?>" class="btn-secondary">
        <?= icon('phone', 'w-[18px] h-[18px]') ?>
        <?= e($config['phone']) ?>
      </a>
    </div>
  </div>
</section>
