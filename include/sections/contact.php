<?php
/**
 * Contact details plus the enquiry form.
 *
 * Form state is server-driven: ?sent=1 (set by the post-redirect-get in
 * form-handler.php) selects the thank-you panel; validation errors and the
 * previous values arrive via the $form_errors / $form_old globals.
 */
$c     = $content['contact'];
$addr  = $config['address'];
$field = 'h-12 w-full rounded-lg border bg-white px-3.5 text-[15px] text-ink';

/**
 * One text input with its label and a persistent error slot.
 *
 * The <p> is always in the DOM (hidden when empty) so the server and the
 * client-side check in site.js write to the same element, rather than the
 * script having to invent markup the server also knows how to produce.
 */
$input_row = static function (string $name, string $label, array $o = []) use ($field): void {
    $id  = 'f-' . $name;
    $eid = 'e-' . $name;
    $err = field_error($name);
    ?>
    <div class="flex flex-col gap-[7px]">
      <label for="<?= $id ?>" class="text-[13.5px] font-semibold text-body"><?= e($label) ?></label>
      <input type="<?= e($o['type'] ?? 'text') ?>" id="<?= $id ?>" name="<?= e($name) ?>"
             <?= !empty($o['required']) ? 'required' : '' ?>
             placeholder="<?= e($o['placeholder'] ?? '') ?>"
             value="<?= e(old($name)) ?>"
             autocomplete="<?= e($o['autocomplete'] ?? 'off') ?>"
             aria-describedby="<?= $eid ?>"<?= $err ? ' aria-invalid="true"' : '' ?>
             class="<?= $field ?> <?= $err ? 'border-[#D98A8A]' : 'border-line-input' ?>">
      <p id="<?= $eid ?>" data-error-for="<?= e($name) ?>"
         class="text-[13px] text-[#8C2B2B]"<?= $err ? '' : ' hidden' ?>><?= e($err) ?></p>
    </div>
<?php };
?>
<section id="contact" class="scroll-mt-[90px] bg-white px-6 py-[clamp(56px,6vw,88px)]">
  <div class="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-start gap-[clamp(32px,4vw,60px)]">

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

      <div data-form-alert role="alert"
           class="rounded-[10px] border border-[#F0C9C9] bg-[#FDF1F1] px-4 py-3.5 text-[14.5px] text-[#8C2B2B]"
           <?= empty($form_errors) ? 'hidden' : '' ?>>
        Please check the highlighted fields and try again.
      </div>

      <!-- novalidate suppresses the browser's own bubbles so the messages match
           the site; site.js checks the same rules the server does and blocks
           submission, so an incomplete form no longer round-trips and reloads.
           The server-side validation in form-handler.php remains the authority
           and is what runs when the script does not. -->
      <form method="post" action="<?= e(page_url('home')) ?>#contact" class="flex flex-col gap-5"
            data-enquiry-form novalidate>
        <input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">
        <input type="hidden" name="form_time" value="<?= time() ?>">
        <!-- Honeypot. Named hp_ref rather than "website", and with no visible
             label: "website" sits in Chrome's autofill heuristics, so the
             browser could fill it for a real visitor and get them rejected as
             a bot. autocomplete="off" alone is not reliably honoured. -->
        <div class="absolute -left-[9999px]" aria-hidden="true">
          <input type="text" id="hp_ref" name="hp_ref" tabindex="-1"
                 autocomplete="off" aria-hidden="true">
        </div>

        <div class="grid grid-cols-[repeat(auto-fit,minmax(min(140px,100%),1fr))] gap-3.5">
          <?php $input_row('name', 'Your name', ['required' => true, 'placeholder' => 'Full name', 'autocomplete' => 'name']); ?>
          <?php $input_row('phone', 'Phone', ['type' => 'tel', 'required' => true, 'placeholder' => '+91', 'autocomplete' => 'tel']); ?>
        </div>

        <?php $input_row('email', 'Email', ['type' => 'email', 'placeholder' => 'you@example.com', 'autocomplete' => 'email']); ?>

        <!-- Progressive enhancement. The <select> is the real control and the
             source of truth: it submits the value and is fully usable if the
             script never runs. site.js hides it and reveals the listbox below,
             which is styleable in a way a native dropdown's OS-drawn list is
             not, writing every choice back to the select. -->
        <div class="relative flex flex-col gap-[7px]" data-select>
          <label id="f-topic-label" for="f-topic" class="text-[13.5px] font-semibold text-body">What do you need help with?</label>

          <select id="f-topic" name="topic" class="<?= $field ?> border-line-input px-3" data-select-native>
            <?php $chosen = old('topic', html_entity_decode($c['topics'][0], ENT_QUOTES, 'UTF-8'));
                  foreach ($c['topics'] as $topic):
                      $value = html_entity_decode($topic, ENT_QUOTES, 'UTF-8'); ?>
            <option value="<?= e($value) ?>" <?= $value === $chosen ? 'selected' : '' ?>><?= e($value) ?></option>
            <?php endforeach; ?>
          </select>

          <div class="relative hidden" data-select-ui>
            <!-- aria-labelledby lists the question then the button itself, so the
                 field is announced as "What do you need help with?, <current
                 value>" rather than just reading the value back. -->
            <button type="button" id="f-topic-button" data-select-button role="combobox"
                    aria-labelledby="f-topic-label f-topic-button"
                    aria-haspopup="listbox" aria-expanded="false" aria-controls="f-topic-list"
                    class="flex h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-line-input bg-white px-3.5 text-left text-[15px] text-ink transition-colors hover:border-brand aria-expanded:border-brand">
              <span class="truncate" data-select-label><?= e($chosen) ?></span>
              <?= icon('chevron-right', 'w-4 h-4 shrink-0 rotate-90 text-[#7C8B98] transition-[rotate] duration-150', ['stroke-width' => '2.2', 'data-select-chevron' => '']) ?>
            </button>

            <ul id="f-topic-list" role="listbox" aria-labelledby="f-topic-label" data-select-list hidden
                class="absolute z-30 mt-1.5 max-h-[280px] w-full overflow-y-auto rounded-xl border border-line bg-white py-1.5 shadow-[0_20px_44px_-18px_rgba(10,35,64,0.45)]">
              <?php foreach ($c['topics'] as $topic):
                        $value = html_entity_decode($topic, ENT_QUOTES, 'UTF-8');
                        $isSel = $value === $chosen; ?>
              <li role="option" data-value="<?= e($value) ?>" aria-selected="<?= $isSel ? 'true' : 'false' ?>"
                  class="flex cursor-pointer items-center justify-between gap-3 px-3.5 py-2.5 text-[15px] text-ink aria-selected:font-semibold aria-selected:text-brand-dark data-[active]:bg-brand-tint">
                <span><?= e($value) ?></span>
                <span class="shrink-0 text-brand" data-select-check <?= $isSel ? '' : 'hidden' ?>><?= icon('check', 'w-4 h-4', ['stroke-width' => '2.6']) ?></span>
              </li>
              <?php endforeach; ?>
            </ul>
          </div>
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
    </div>
  </div>
</section>
