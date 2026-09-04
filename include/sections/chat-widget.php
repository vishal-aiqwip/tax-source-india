<?php
/**
 * Floating chat widget. Submitting a message hands off to WhatsApp with the
 * text prefilled — same behaviour as the source design.
 *
 * On mobile `bottom` lifts clear of the sticky call bar, when that is enabled.
 */
$chat_bottom = !empty($config['show_call_bar']) ? 'bottom-[82px]' : 'bottom-[26px]';
?>
<div class="fixed right-[22px] <?= $chat_bottom ?> z-60 flex flex-col items-end gap-3 nav:bottom-[26px]">

  <div id="chat-panel" hidden
       class="flex max-h-[calc(100vh-160px)] w-[356px] max-w-[calc(100vw-44px)] min-h-0 flex-col overflow-hidden rounded-[20px] bg-linear-to-b from-brand to-[#2E86E0] shadow-[0_34px_64px_-22px_rgba(10,35,64,0.5)]">

    <div class="flex min-h-0 shrink flex-col gap-[22px] overflow-hidden px-5 pt-[18px] pb-[26px]">
      <div class="flex items-start justify-between gap-4">
        <div class="font-display text-base font-bold tracking-[-0.01em] text-white">
          <?= e($config['site_name']) ?>
        </div>
        <button type="button" data-chat-toggle aria-label="Close chat"
                class="flex shrink-0 cursor-pointer p-0.5 text-white">
          <?= icon('close', 'w-[18px] h-[18px]') ?>
        </button>
      </div>
      <div class="flex flex-col gap-2.5">
        <?= icon('wave', 'w-[26px] h-[26px] text-[#CFE4FA]', ['stroke-width' => '1.7']) ?>
        <div class="font-display text-[27px] leading-tight font-bold tracking-[-0.02em] text-white">
          <?= e($content['chat']['greeting']) ?>
        </div>
      </div>
    </div>

    <div class="mx-1.5 mb-1.5 flex min-h-0 grow flex-col rounded-[20px] bg-white">
      <div class="flex min-h-0 grow flex-col gap-3.5 overflow-y-auto px-[18px] pt-5 pb-2">
        <div class="flex items-start gap-[11px]">
          <img src="<?= e(asset('images/logo-mark.png')) ?>" alt="" width="34" height="34" loading="lazy"
               class="block h-[34px] w-[34px] shrink-0 rounded-full">
          <div class="rounded-xl border border-line-soft bg-white px-3.5 py-3 shadow-[0_6px_14px_-10px_rgba(10,35,64,0.35)]">
            <p class="text-[14.5px] leading-normal text-ink"><?= e($content['chat']['first_msg']) ?></p>
          </div>
        </div>
      </div>

      <form id="chat-form" class="flex shrink-0 items-center gap-2.5 px-3.5 pt-3 pb-3.5"
            data-wa-base="https://wa.me/<?= e($config['whatsapp']) ?>">
        <label for="chat-input" class="sr-only">Message</label>
        <input type="text" id="chat-input" name="message" autocomplete="off"
               placeholder="<?= e($content['chat']['placeholder']) ?>"
               class="h-[46px] min-w-0 grow rounded-[10px] border border-line-soft bg-[#F5F8FC] px-3.5 text-[14.5px] text-ink">
        <button type="submit" aria-label="Send message"
                class="flex h-[46px] w-[46px] shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-brand p-0 text-white transition-colors hover:bg-brand-dark">
          <?= icon('send', 'w-[19px] h-[19px]', ['stroke-width' => '1.9']) ?>
        </button>
      </form>
    </div>
  </div>

  <button type="button" id="chat-toggle" data-chat-toggle aria-label="Chat with us" aria-expanded="false"
          aria-controls="chat-panel"
          class="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-brand p-0 text-white shadow-[0_14px_30px_-12px_rgba(20,102,190,0.7)] transition-colors hover:bg-brand-dark">
    <span data-chat-icon="closed"><?= icon('chat', 'w-[23px] h-[23px]') ?></span>
    <span data-chat-icon="open" hidden><?= icon('close', 'w-[21px] h-[21px]', ['stroke-width' => '2.2']) ?></span>
  </button>
</div>
