<?php
/**
 * PLACEHOLDER. This is not legal text — replace the body below with the
 * practice's own privacy policy before publishing.
 */
?>
<section class="bg-white px-6 py-[clamp(48px,5vw,80px)]">
  <div class="mx-auto max-w-[760px]">

    <div class="mb-10 flex flex-col gap-3.5">
      <div class="eyebrow text-brand">Legal</div>
      <h1 class="text-[clamp(30px,3.6vw,42px)] leading-[1.12] font-extrabold">Privacy policy</h1>
      <p class="text-[15px] text-muted-2">Last updated: <?= date('j F Y') ?></p>
    </div>

    <div class="mb-10 flex items-start gap-3.5 rounded-[14px] border border-[#F0DFB8] bg-amber-tint px-5 py-4">
      <?= icon('info', 'w-5 h-5 shrink-0 mt-0.5 text-amber-ink') ?>
      <p class="text-[14.5px] leading-relaxed text-amber-ink">
        <strong>Placeholder text.</strong> This page outlines the sections a privacy policy needs but
        is not legal advice or a finished policy. Replace it with wording reviewed for the practice
        before the site goes live.
      </p>
    </div>

    <div class="flex flex-col gap-7">
      <div class="flex flex-col gap-3">
        <h2 class="text-[22px] font-bold">Who we are</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          <?= e($config['site_name']) ?> is an accounting and tax practice at
          <?= e($config['address']['line3']) ?> If you have any question about how we handle your
          information, write to
          <a href="mailto:<?= e($config['email']) ?>" class="font-semibold text-brand"><?= e($config['email']) ?></a>
          or call <?= e($config['phone']) ?>.
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <h2 class="text-[22px] font-bold">What we collect</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          When you send an enquiry through this website we collect your name, phone number, email
          address if you give one, the service you asked about and any details you type into the
          message field. When you engage us for work, we collect the documents needed to complete
          that work, which may include your PAN, Aadhaar, Form 16, bank statements and invoices.
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <h2 class="text-[22px] font-bold">How we use it</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          We use your contact details to respond to your enquiry and to provide the services you
          engage us for. We use your financial documents only to prepare, file and support the
          returns and registrations you have asked us to handle. We do not sell your information, and
          we do not share it for marketing.
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <h2 class="text-[22px] font-bold">Who we share it with</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          We submit information to the Income Tax Department, GST authorities, the Ministry of
          Corporate Affairs and other statutory bodies where a filing requires it. We may share
          information with our own service providers, such as email and document hosting, under
          confidentiality obligations. We disclose information where the law requires us to.
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <h2 class="text-[22px] font-bold">How long we keep it</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          We keep client records for as long as professional and statutory record-keeping rules
          require, and enquiry details for as long as needed to respond and to keep a record of our
          correspondence.
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <h2 class="text-[22px] font-bold">Your rights</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          You can ask us what information we hold about you, ask us to correct it, or ask us to
          delete it where we are not required to retain it. Write to
          <a href="mailto:<?= e($config['email']) ?>" class="font-semibold text-brand"><?= e($config['email']) ?></a>
          and we will respond.
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <h2 class="text-[22px] font-bold">Cookies</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          This site sets a session cookie so the enquiry form can protect itself against cross-site
          request forgery. It is removed when you close your browser. We do not use advertising
          cookies.
        </p>
      </div>
    </div>

    <div class="mt-12 border-t border-line pt-8">
      <a href="<?= e(page_url('home')) ?>" class="inline-flex items-center gap-2 font-bold text-brand hover:text-brand-dark">
        <?= icon('arrow-right', 'w-[17px] h-[17px] rotate-180', ['stroke-width' => '2.4']) ?>
        Back to the home page
      </a>
    </div>
  </div>
</section>
