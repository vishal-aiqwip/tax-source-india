<?php
/**
 * Privacy policy — supplied by the practice, effective 01 April 2024.
 *
 * Sections follow the source document's numbering. The list-group pattern in
 * section 2 (a label followed by bullets) is driven by $collected.
 */

$effective = '01 April 2024';

// Section 2: each subgroup is a label plus its bullets.
$collected = [
    'Personal Identification Information' => [
        'Name',
        'Email address',
        'Phone number',
        'Address',
    ],
    'Financial Information' => [
        'Payment details (e.g., credit card information)',
    ],
    'Technical Data' => [
        'IP address',
        'Browser type and version',
        'Time zone setting',
        'Browser plug-in types and versions',
        'Operating system and platform',
        'Device information',
    ],
    'Usage Data' => [
        'Information about how you use our Site, products, and services',
    ],
];

$uses = [
    'To provide and maintain our services',
    'To notify you about changes to our services',
    'To allow you to participate in interactive features of our service',
    'To provide customer support',
    'To gather analysis or valuable information to improve our Site',
    'To monitor the usage of our Site',
    'To detect, prevent, and address technical issues',
    'To fulfill any other purpose for which you provide it',
    'To carry out our obligations and enforce our rights arising from any contracts entered into between you and us',
];

$sharing = [
    'With your consent',
    'To comply with a legal obligation',
    'To protect and defend our rights or property',
    'To prevent or investigate possible wrongdoing in connection with our services',
    'To protect the personal safety of users of our services or the public',
    'If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred',
];

/** A bulleted list in the document's style. */
$list = static function (array $items): void { ?>
  <ul class="flex flex-col gap-2.5">
    <?php foreach ($items as $item): ?>
    <li class="flex items-start gap-3 text-[16px] leading-[1.7] text-muted">
      <span class="mt-[10px] h-[5px] w-[5px] shrink-0 rounded-full bg-brand"></span>
      <?= e($item) ?>
    </li>
    <?php endforeach; ?>
  </ul>
<?php };
?>
<section class="bg-white px-6 py-[clamp(48px,5vw,80px)]">
  <div class="mx-auto max-w-[760px]">

    <div class="mb-10 flex flex-col gap-3.5 border-b border-line pb-8">
      <div class="eyebrow text-brand">Legal</div>
      <h1 class="text-[clamp(30px,3.6vw,42px)] leading-[1.12] font-extrabold">Privacy policy</h1>
      <p class="text-[15px] text-muted-2">Effective date: <?= e($effective) ?></p>
    </div>

    <div class="flex flex-col gap-10">

      <!-- 1 -->
      <section class="flex flex-col gap-4">
        <h2 class="text-[22px] font-bold">1. Introduction</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          Welcome to <?= e($config['site_name']) ?>. We are committed to protecting your personal
          information and your right to privacy. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our website
          <a href="https://www.taxsourceindia.com" class="font-semibold text-brand hover:text-brand-dark">www.taxsourceindia.com</a>
          (the &ldquo;Site&rdquo;). Please read this policy carefully to understand our views and
          practices regarding your personal data and how we will treat it.
        </p>
      </section>

      <!-- 2 -->
      <section class="flex flex-col gap-4">
        <h2 class="text-[22px] font-bold">2. Information We Collect</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          We may collect and process the following data about you:
        </p>
        <div class="flex flex-col gap-6 pt-1">
          <?php foreach ($collected as $label => $items): ?>
          <div class="flex flex-col gap-3 rounded-[14px] border border-line bg-page px-6 py-5">
            <h3 class="text-[17px] font-bold"><?= e($label) ?></h3>
            <?php $list($items); ?>
          </div>
          <?php endforeach; ?>
        </div>
      </section>

      <!-- 3 -->
      <section class="flex flex-col gap-4">
        <h2 class="text-[22px] font-bold">3. How We Use Your Information</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          We use the information we collect in the following ways:
        </p>
        <?php $list($uses); ?>
      </section>

      <!-- 4 -->
      <section class="flex flex-col gap-4">
        <h2 class="text-[22px] font-bold">4. Sharing Your Information</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          We do not share your personal information with third parties except in the following
          circumstances:
        </p>
        <?php $list($sharing); ?>
      </section>

      <!-- 5 -->
      <section class="flex flex-col gap-4">
        <h2 class="text-[22px] font-bold">5. Data Security</h2>
        <p class="text-[16px] leading-[1.7] text-muted">
          We use administrative, technical, and physical security measures to protect your personal
          information. While we have implemented measures to secure your personal information, please
          be aware that no method of internet transmission or electronic storage is completely secure.
        </p>
      </section>
    </div>

    <!-- contact -->
    <div class="mt-12 flex flex-col gap-3 rounded-[14px] border border-line bg-page px-6 py-5">
      <h2 class="text-[17px] font-bold">Questions about this policy</h2>
      <p class="text-[15px] leading-[1.7] text-muted">
        Write to
        <a href="mailto:<?= e($config['email']) ?>" class="font-semibold text-brand hover:text-brand-dark"><?= e($config['email']) ?></a>
        or call
        <a href="<?= e(tel_url($config['phone_raw'])) ?>" class="font-semibold text-brand hover:text-brand-dark"><?= e($config['phone']) ?></a>.
      </p>
    </div>

    <div class="mt-10 border-t border-line pt-8">
      <a href="<?= e(page_url('home')) ?>" class="inline-flex items-center gap-2 font-bold text-brand hover:text-brand-dark">
        <?= icon('arrow-right', 'w-[17px] h-[17px] rotate-180', ['stroke-width' => '2.4']) ?>
        Back to the home page
      </a>
    </div>
  </div>
</section>
