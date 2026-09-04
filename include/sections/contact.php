<?php
/**
 * Contact details plus the enquiry form.
 *
 * Form state is server-driven: ?sent=1 (set by the post-redirect-get in
 * form-handler.php) selects the thank-you panel; validation errors and the
 * previous values arrive via the $form_errors / $form_old globals.
 */
$c     = $content['contact'];
$sent  = isset($_GET['sent']);
$addr  = $config['address'];
$field = 'h-12 w-full rounded-lg border bg-white px-3.5 text-[15px] text-ink';
?>
<section id="contact" class="scroll-mt-[90px] bg-white px-6 py-[clamp(56px,6vw,88px)]">
  <div class="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(380px,1fr))] items-start gap-[clamp(32px,4vw,60px)]">

    <!-- details -->
    <div class="flex min-w-0 flex-col gap-[26px]">
      <div class="flex flex-col gap-3.5">
        <div class="eyebrow text-brand"><?= e($c['eyebrow']) ?></div>
        <h2 class="text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-extrabold"><?= e($c['heading']) ?></h2>
        <p class="text-[17px] leading-[1.65] text-muted"><?= e($c['intro']) ?></p>
      </div>

      <dl class="flex flex-col">
        <div class="flex items-start gap-4 border-t border-[#E6EDF4] py-[18px]">
          <?= icon('map-pin', 'w-[21px] h-[21px] shrink-0 mt-0.5 text-brand', ['stroke-width' => '1.9']) ?>
          <div class="flex flex-col gap-1">
            <dt class="text-[13px] font-bold tracking-[0.08em] text-muted-2 uppercase">Office</dt>
            <dd class="text-base leading-[1.55] text-ink">
              <?= e($addr['line1']) ?><br><?= e($addr['line2']) ?><br><?= e($addr['line3']) ?>
            </dd>
          </div>
        </div>

        <div class="flex items-start gap-4 border-t border-[#E6EDF4] py-[18px]">
          <?= icon('phone', 'w-[21px] h-[21px] shrink-0 mt-0.5 text-brand', ['stroke-width' => '1.9']) ?>
          <div class="flex flex-col gap-1">
            <dt class="text-[13px] font-bold tracking-[0.08em] text-muted-2 uppercase">Phone</dt>
            <dd class="text-base leading-[1.55] text-ink">
              <a href="<?= e(tel_url($config['phone_raw'])) ?>" class="text-ink hover:text-brand"><?= e($config['phone']) ?></a>
              &nbsp;&middot;&nbsp;
              <a href="<?= e(tel_url($config['phone_alt_raw'])) ?>" class="text-ink hover:text-brand"><?= e($config['phone_alt']) ?></a>
            </dd>
          </div>
        </div>

        <div class="flex items-start gap-4 border-t border-[#E6EDF4] py-[18px]">
          <?= icon('mail', 'w-[21px] h-[21px] shrink-0 mt-0.5 text-brand', ['stroke-width' => '1.9']) ?>
          <div class="flex flex-col gap-1">
            <dt class="text-[13px] font-bold tracking-[0.08em] text-muted-2 uppercase">Email</dt>
            <dd class="text-base leading-[1.55] text-ink">
              <a href="mailto:<?= e($config['email']) ?>" class="text-ink hover:text-brand"><?= e($config['email']) ?></a>
            </dd>
          </div>
        </div>

        <div class="flex items-start gap-4 border-y border-[#E6EDF4] py-[18px]">
          <?= icon('clock', 'w-[21px] h-[21px] shrink-0 mt-0.5 text-brand', ['stroke-width' => '1.9']) ?>
          <div class="flex flex-col gap-1">
            <dt class="text-[13px] font-bold tracking-[0.08em] text-muted-2 uppercase">Hours</dt>
            <dd class="text-base leading-[1.55] text-ink"><?= $config['hours_label'] ?></dd>
          </div>
        </div>
      </dl>
    </div>

    <!-- form -->
    <div class="flex min-w-0 flex-col gap-5 rounded-[14px] border border-line bg-page p-[clamp(24px,3vw,34px)]">
      <div class="flex flex-col gap-[7px]">
        <h2 class="text-2xl font-extrabold"><?= e($c['form']['title']) ?></h2>
        <p class="text-[15px] leading-relaxed text-muted"><?= e($c['form']['sub']) ?></p>
      </div>

      <?php if ($sent): ?>
      <div class="flex flex-col items-start gap-3 rounded-[10px] bg-brand-tint p-6" role="status">
        <?= icon('check-circle', 'w-[26px] h-[26px] text-brand', ['stroke-width' => '2.2']) ?>
        <div class="font-display text-[19px] font-bold tracking-[-0.02em] text-navy"><?= e($c['sent']['title']) ?></div>
        <p class="text-[15px] leading-relaxed text-body">
          <?= e($c['sent']['body']) ?>
          <a href="<?= e(tel_url($config['phone_raw'])) ?>" class="font-semibold"><?= e($config['phone']) ?></a>.
        </p>
        <a href="<?= e(page_url('home')) ?>#contact" class="text-[15px] font-bold text-brand hover:text-brand-dark">
          <?= e($c['sent']['again']) ?>
        </a>
      </div>

      <?php else: ?>
      <?php if (!empty($form_errors)): ?>
      <div class="rounded-[10px] border border-[#F0C9C9] bg-[#FDF1F1] px-4 py-3.5 text-[14.5px] text-[#8C2B2B]" role="alert">
        Please check the highlighted fields and try again.
      </div>
      <?php endif; ?>

      <form method="post" action="<?= e(page_url('home')) ?>#contact" class="flex flex-col gap-5" novalidate>
        <input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">
        <input type="hidden" name="form_time" value="<?= time() ?>">
        <!-- honeypot: hidden from people, tempting to bots -->
        <div class="absolute -left-[9999px]" aria-hidden="true">
          <label for="website">Website</label>
          <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
        </div>

        <div class="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3.5">
          <div class="flex flex-col gap-[7px]">
            <label for="f-name" class="text-[13.5px] font-semibold text-body">Your name</label>
            <input type="text" id="f-name" name="name" required placeholder="Full name"
                   value="<?= e(old('name')) ?>" autocomplete="name"
                   <?= field_error('name') ? 'aria-describedby="e-name" aria-invalid="true"' : '' ?>
                   class="<?= $field ?> <?= field_error('name') ? 'border-[#D98A8A]' : 'border-line-input' ?>">
            <?php if ($err = field_error('name')): ?>
            <p id="e-name" class="text-[13px] text-[#8C2B2B]"><?= e($err) ?></p>
            <?php endif; ?>
          </div>

          <div class="flex flex-col gap-[7px]">
            <label for="f-phone" class="text-[13.5px] font-semibold text-body">Phone</label>
            <input type="tel" id="f-phone" name="phone" required placeholder="+91"
                   value="<?= e(old('phone')) ?>" autocomplete="tel"
                   <?= field_error('phone') ? 'aria-describedby="e-phone" aria-invalid="true"' : '' ?>
                   class="<?= $field ?> <?= field_error('phone') ? 'border-[#D98A8A]' : 'border-line-input' ?>">
            <?php if ($err = field_error('phone')): ?>
            <p id="e-phone" class="text-[13px] text-[#8C2B2B]"><?= e($err) ?></p>
            <?php endif; ?>
          </div>
        </div>

        <div class="flex flex-col gap-[7px]">
          <label for="f-email" class="text-[13.5px] font-semibold text-body">Email</label>
          <input type="email" id="f-email" name="email" placeholder="you@example.com"
                 value="<?= e(old('email')) ?>" autocomplete="email"
                 <?= field_error('email') ? 'aria-describedby="e-email" aria-invalid="true"' : '' ?>
                 class="<?= $field ?> <?= field_error('email') ? 'border-[#D98A8A]' : 'border-line-input' ?>">
          <?php if ($err = field_error('email')): ?>
          <p id="e-email" class="text-[13px] text-[#8C2B2B]"><?= e($err) ?></p>
          <?php endif; ?>
        </div>

        <div class="flex flex-col gap-[7px]">
          <label for="f-topic" class="text-[13.5px] font-semibold text-body">What do you need help with?</label>
          <select id="f-topic" name="topic" class="<?= $field ?> border-line-input px-3">
            <?php $chosen = old('topic', html_entity_decode($c['topics'][0], ENT_QUOTES, 'UTF-8'));
                  foreach ($c['topics'] as $topic):
                      $value = html_entity_decode($topic, ENT_QUOTES, 'UTF-8'); ?>
            <option value="<?= e($value) ?>" <?= $value === $chosen ? 'selected' : '' ?>><?= e($value) ?></option>
            <?php endforeach; ?>
          </select>
        </div>

        <div class="flex flex-col gap-[7px]">
          <label for="f-details" class="text-[13.5px] font-semibold text-body">A few details</label>
          <textarea id="f-details" name="details" rows="4" maxlength="2000"
                    placeholder="Salaried with some capital gains this year, first time filing ITR-2&hellip;"
                    class="w-full resize-y rounded-lg border border-line-input bg-white p-3.5 text-[15px] leading-normal text-ink"><?= e(old('details')) ?></textarea>
        </div>

        <button type="submit"
                class="flex h-[54px] cursor-pointer items-center justify-center rounded-lg border-none bg-brand text-base font-semibold text-white shadow-[0_8px_20px_-10px_rgba(20,102,190,0.65)] transition-colors hover:bg-brand-dark">
          <?= e($c['form']['submit']) ?>
        </button>

        <div class="flex items-center justify-center gap-2">
          <?= icon('lock', 'w-[15px] h-[15px] text-[#788897]') ?>
          <span class="text-[13.5px] text-muted-2"><?= e($c['form']['privacy']) ?></span>
        </div>
      </form>
      <?php endif; ?>
    </div>
  </div>
</section>
