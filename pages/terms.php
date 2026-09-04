<?php
/**
 * PLACEHOLDER. This is not legal text — replace the body below with the
 * practice's own terms of service before publishing.
 */
?>
<section class="bg-white px-6 py-[clamp(48px,5vw,80px)]">
  <div class="mx-auto max-w-[760px]">

    <div class="mb-10 flex flex-col gap-3.5 border-b border-line pb-8">
      <div class="eyebrow text-brand">Legal</div>
      <h1 class="text-[clamp(30px,3.6vw,42px)] leading-[1.12] font-extrabold">Terms of service</h1>
      <p class="text-[15px] text-muted-2">Last updated: <?= date('j F Y') ?></p>
    </div>

    <div class="flex flex-col gap-7">
      <div class="flex flex-col gap-3">
        <h2 class="text-[22px] font-bold">Scope of engagement</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          We agree the specific work in writing before we start, along with a fixed fee for it.
          Anything outside that scope is quoted separately. A quote covers the service described in
          it and nothing beyond.
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <h2 class="text-[22px] font-bold">Fees and payment</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          Fees are fixed per piece of work and quoted before the work begins. We do not bill by the
          hour. Statutory fees, government charges and third-party costs are passed on at cost and
          are payable in addition to our fee.
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <h2 class="text-[22px] font-bold">What we need from you</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          We rely on the documents and information you give us being complete and accurate. Returns
          and filings are prepared on that basis. Where a deadline applies, we need your documents in
          good time before it; we will tell you what that means for your filing.
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <h2 class="text-[22px] font-bold">Responsibility</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          We take professional responsibility for the work we carry out. We are not responsible for
          consequences arising from information that was withheld, incorrect or provided too late for
          a deadline, nor for changes in law or departmental practice after a filing is made.
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <h2 class="text-[22px] font-bold">Confidentiality</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          Everything you share with us is confidential and is used only to carry out your work or
          where a statutory filing or the law requires disclosure. See our
          <a href="<?= e(page_url('privacy')) ?>" class="font-semibold text-brand">privacy policy</a>
          for how we handle your information.
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <h2 class="text-[22px] font-bold">Ending an engagement</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          Either of us may end an engagement in writing. Fees for work already carried out remain
          payable, and we will hand over your documents and the records of filings made on your
          behalf.
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <h2 class="text-[22px] font-bold">Governing law</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          These terms are governed by the laws of India, and the courts at Bengaluru, Karnataka have
          jurisdiction over any dispute arising from them.
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <h2 class="text-[22px] font-bold">Questions</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          Write to
          <a href="mailto:<?= e($config['email']) ?>" class="font-semibold text-brand"><?= e($config['email']) ?></a>
          or call <?= e($config['phone']) ?>.
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
