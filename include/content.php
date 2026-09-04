<?php
/**
 * All site copy. This is the only file to edit when wording changes —
 * no layout lives here.
 *
 * ┌─ REVIEW BEFORE GOING LIVE ────────────────────────────────────────────┐
 * │ The following content was DRAFTED to fill placeholders left in the    │
 * │ source design, and has not been verified by the practice:             │
 * │                                                                       │
 * │  1. FAQ answers 2–8 ('faqs' below). These state tax positions —       │
 * │     ITR form selection, regime comparison, GST timelines, entity      │
 * │     choice, fees. A chartered accountant must confirm each one is     │
 * │     accurate and current before publication.                         │
 * │                                                                       │
 * │  2. Testimonials 2 and 3 ('testimonials'). The design supplied only   │
 * │     the opening clause of each and a real client name. The completion │
 * │     is INVENTED TEXT attributed to a named real person. Replace with  │
 * │     the actual Google review, or delete the card. Do not publish as   │
 * │     is. The 'drafted' flag marks the two affected entries.            │
 * │                                                                       │
 * │  3. The three reviewer role labels.                                   │
 * │                                                                       │
 * │  4. Privacy and terms page bodies (pages/privacy.php, pages/terms.php)│
 * │     are placeholders, not legal text.                                 │
 * └───────────────────────────────────────────────────────────────────────┘
 */

return [

    // ---------------------------------------------------------------- meta
    'meta' => [
        'home' => [
            'title' => 'Tax Source India — Chartered Accountants in Bengaluru | GST, ITR & Company Filings',
            'description' => 'GST, income tax and company filings for Bengaluru, handled end to end by chartered accountants. Fixed quotes, one named contact, Church Street office. Book a free consultation.',
        ],
        'privacy' => [
            'title' => 'Privacy policy — Tax Source India',
            'description' => 'How Tax Source India collects, uses and protects the personal information you share with us.',
        ],
        'terms' => [
            'title' => 'Terms of service — Tax Source India',
            'description' => 'The terms on which Tax Source India provides accounting, tax and compliance services.',
        ],
        'thank-you' => [
            'title' => 'Thank you — Tax Source India',
            'description' => 'We have your enquiry and will call back the same working day.',
        ],
        '404' => [
            'title' => 'Page not found — Tax Source India',
            'description' => 'The page you were looking for is not here.',
        ],
    ],

    // ----------------------------------------------------------------- nav
    'nav' => [
        ['label' => 'Services',      'href' => 'services', 'strong' => true],
        ['label' => 'Why us',        'href' => 'why'],
        ['label' => 'How it works',  'href' => 'how'],
        ['label' => 'FAQ',           'href' => 'faq'],
    ],

    // ---------------------------------------------------------------- hero
    'hero' => [
        'badge_rating' => '4.8 on Google',
        'badge_since'  => 'Bengaluru since 2018',
        'heading'      => 'An accountant you can',
        'heading_em'   => 'actually reach.',
        'sub'          => 'GST, income tax and company filings for Bengaluru, handled end to end by chartered accountants, not a call centre.',
        'proof' => [
            'Fixed quote in writing before we start',
            'One named person handles your file',
            'Walk in on Church Street, or send it over WhatsApp',
        ],
        'float_card' => [
            'title' => 'Acknowledgement in hand',
            'sub'   => 'ITR-V received the same day',
        ],
        'calendar' => [
            'title'  => 'Your compliance calendar',
            'status' => 'On track',
            'rows'   => [
                ['day' => '11', 'month' => 'MTH', 'label' => 'GSTR-1',            'badge' => 'Filed',    'tone' => 'brand'],
                ['day' => '20', 'month' => 'MTH', 'label' => 'GSTR-3B',           'badge' => 'In review', 'tone' => 'amber'],
                ['day' => '31', 'month' => 'JUL', 'label' => 'Income tax return', 'badge' => 'Upcoming',  'tone' => 'grey'],
            ],
        ],
        'stats' => [
            ['value' => '12,000+', 'label' => 'Returns filed for individuals &amp; businesses'],
            ['value' => '10+',     'label' => 'Years of practice in Bengaluru'],
            ['value' => '15',      'label' => 'Services under one roof'],
            ['value' => 'CA &middot; CS', 'label' => 'Certified professionals on the team'],
        ],
    ],

    // ----------------------------------------------------------- logo wall
    'logo_wall' => [
        'title' => 'Trusted by businesses across Bengaluru',
        // Placeholder marks from the design. Replace with real client logos
        // and set show_logo_wall = true in config.php.
        'marks' => [
            ['icon' => 'mark-1', 'label' => 'CLIENT NAME',  'weight' => 'font-extrabold', 'tracking' => 'tracking-[0.06em]'],
            ['icon' => 'mark-2', 'label' => 'Client Name',  'weight' => 'font-semibold',  'tracking' => 'tracking-[-0.02em]'],
            ['icon' => 'mark-3', 'label' => 'CLIENTNAME',   'weight' => 'font-bold',      'tracking' => 'tracking-[0.02em]'],
            ['icon' => 'mark-4', 'label' => 'Client&middot;Name', 'weight' => 'font-semibold', 'tracking' => 'tracking-[-0.01em]'],
            ['icon' => 'mark-5', 'label' => 'CLIENT NAME',  'weight' => 'font-bold',      'tracking' => 'tracking-[0.08em]'],
            ['icon' => 'mark-6', 'label' => 'ClientName',   'weight' => 'font-extrabold', 'tracking' => 'tracking-[-0.02em]'],
        ],
    ],

    // ------------------------------------------------------------ audience
    'audience' => [
        'eyebrow' => 'Where do you fit?',
        'heading' => 'Start with what you need this month',
        'intro'   => "No client is too big or too small, from a first salary return to a private limited company's full compliance calendar.",
        'cards' => [
            [
                'icon'  => 'users',
                'title' => 'Salaried &amp; individuals',
                'body'  => 'Form 16 to filed return. We compare the old and new regime, claim every deduction you qualify for, and handle any notice that follows.',
                'items' => [
                    'Income tax return filing',
                    'Capital gains &amp; house property',
                    'Financial planning',
                ],
                'dark'  => false,
            ],
            [
                'icon'  => 'building',
                'title' => 'Businesses on GST',
                'body'  => 'Registration, monthly returns, reconciliation and e-way bills, run as a routine, not a last-minute scramble.',
                'items' => [
                    'GST registration &amp; management',
                    'GSTR-3B &amp; GSTR-1, all year',
                    'Payroll, PF &amp; ESI compliance',
                ],
                'dark'  => true,
            ],
            [
                'icon'  => 'sparkle',
                'title' => 'Founders &amp; startups',
                'body'  => 'Get incorporated properly the first time: the right structure, the right registrations, and the filings that keep it clean.',
                'items' => [
                    'Pvt Ltd, LLP, OPC &amp; partnership',
                    'MCA corporate filings',
                    'Trademark &amp; IP services',
                ],
                'dark'  => false,
            ],
        ],
    ],

    // ------------------------------------------------------------ services
    'services' => [
        'eyebrow' => 'Everything under one roof',
        'heading' => 'Fifteen services, one point of contact',
        'intro'   => 'Rely on the most trusted professional services providers as per your need, without chasing three different consultants.',
        'groups' => [
            [
                'icon'  => 'file-text',
                'title' => 'Tax &amp; filing',
                'items' => [
                    'Individual &amp; corporate tax filing',
                    'GST registration &amp; management',
                    'GST return filing: GSTR-3B &amp; 1',
                    'Audit defence &amp; audit services',
                    'Financial planning',
                ],
            ],
            [
                'icon'  => 'calendar',
                'title' => 'Registrations',
                'items' => [
                    'Startup &amp; company registration',
                    'Udyog Aadhaar (MSME)',
                    'Importer Exporter Code (IEC)',
                    'Digital Signature Certificate',
                    'Professional Tax (PT) registration',
                ],
            ],
            [
                'icon'  => 'settings',
                'title' => 'Ongoing compliance',
                'items' => [
                    'Payroll compliance',
                    'PF &amp; ESI registration',
                    'Corporate &amp; MCA filings',
                    'E-way bill registration &amp; generation',
                    'Intellectual property services',
                ],
            ],
        ],
        'footer_prompt' => 'Not sure which applies to you?',
        'footer_link'   => 'Tell us your situation',
    ],

    // -------------------------------------------------------------- why us
    'why' => [
        'eyebrow' => 'Why Tax Source India',
        'heading' => 'An accountant you can rely on, not a helpdesk ticket',
        'intro'   => 'Software can fill a form. What it cannot do is know your business, spot the deduction you forgot, or argue your case when a notice arrives. That is the part we do.',
        'photos' => [
            'main' => [
                'src'   => 'images/team.webp',
                'alt'   => 'The Tax Source India team in the Bengaluru office',
                'title' => 'The people who will handle your file',
                'sub'   => 'Church Street office, HAL 3rd Stage',
                'w'     => 1100, 'h' => 660,
            ],
            'small' => [
                [
                    'src'   => 'images/exterior.webp',
                    'alt'   => 'The building housing the Tax Source India office',
                    'title' => 'Find us on Church Street',
                    'w'     => 760, 'h' => 427,
                ],
                [
                    'src'   => 'images/meeting.webp',
                    'alt'   => 'A Tax Source India adviser talking a client through their filings',
                    'title' => 'Sitting down with a client',
                    'w'     => 760, 'h' => 427,
                ],
            ],
        ],
        'pillars' => [
            [
                'icon'  => 'shield-check',
                'title' => 'Trustworthy',
                'body'  => 'A professional team serving individuals and businesses across every aspect of tax, registration and compliance.',
            ],
            [
                'icon'  => 'clock',
                'title' => 'Experienced',
                'body'  => 'Expertise proven in real-world environments: assessments, scrutiny, departmental queries and the everyday grind of monthly filing.',
            ],
            [
                'icon'  => 'shield-alert',
                'title' => 'Professional',
                'body'  => 'Certified chartered accountants, company secretaries and experienced accountants, qualified people, working under one roof.',
            ],
        ],
        'note_strong' => 'At Tax Source India, no client is too big or small.',
        'note_rest'   => ' We work with individuals, small and mid-sized businesses, large firms and multinationals alike.',
    ],

    // ------------------------------------------------------------- process
    'process' => [
        'eyebrow' => 'How it works',
        'heading' => 'Four steps, no surprises',
        'intro'   => 'Walk into the Church Street office or send documents over WhatsApp. Either way the process is the same.',
        'steps' => [
            [
                'n'     => 'STEP 01',
                'title' => 'Tell us your situation',
                'body'  => 'A free call or a walk-in. We ask what you earn, what you run and what has already been filed.',
            ],
            [
                'n'     => 'STEP 02',
                'title' => 'Get a fixed quote',
                'body'  => 'Scope and price in writing before any work starts. No hourly meter, no bill at the end you did not expect.',
            ],
            [
                'n'     => 'STEP 03',
                'title' => 'Share your documents',
                'body'  => 'Form 16, invoices, bank statements, by WhatsApp, email or in person. We tell you exactly what is missing.',
            ],
            [
                'n'     => 'STEP 04',
                'title' => 'We file, and stay on it',
                'body'  => 'Acknowledgement in your hands, next due date in our calendar, and a person to call if a notice turns up.',
            ],
        ],
    ],

    // -------------------------------------------------------- testimonials
    'testimonials' => [
        'eyebrow' => 'In their words',
        'heading' => 'Clients who come back every year',
        'items' => [
            [
                'stars'   => 5,
                'quote'   => 'Very helpful and service was efficient. Like their approach to getting things done. I see them every year and always walk away satisfied.',
                'name'    => 'Lokeswara Rao',
                'role'    => 'Salaried professional',
                'drafted' => false,   // quote came through complete in the design
            ],
            [
                'stars'   => 5,
                'quote'   => 'I am extremely happy with the work and overall experience, with the care they took over my needs. They explained which regime worked out better for me instead of just filing and sending me a bill.',
                'name'    => 'Raja S Reddy',
                'role'    => 'Business owner',
                'drafted' => true,    // second sentence is INVENTED — see file header
            ],
            [
                'stars'   => 5,
                'quote'   => 'Filing ITR with Tax Source India is always a great experience. The tax experts are very professional. I send my documents over WhatsApp and the acknowledgement comes back the same week.',
                'name'    => 'Ashar Khateer',
                'role'    => 'Salaried professional',
                'drafted' => true,    // second/third sentence is INVENTED — see file header
            ],
        ],
    ],

    // ----------------------------------------------------------------- faq
    'faq' => [
        'eyebrow' => 'Questions we get asked',
        'heading' => 'Before you pick up the phone',
        'intro'   => 'If your situation is not covered here, ask us directly. A straight answer costs nothing.',
        'aside' => [
            'title' => 'Still not sure?',
            'body'  => 'Send us a message on WhatsApp with your situation. We will tell you what applies and what it costs.',
        ],
        // Answer 1 is from the design. Answers 2–8 are drafted — see file header.
        'items' => [
            [
                'q' => 'What documents do you need from me to file my return?',
                'a' => 'For most salaried filers: PAN, Aadhaar, Form 16, bank interest details and proof of any deductions you want to claim. If you have capital gains, add your broker statement; for house property, the loan interest certificate. We send you a checklist for your exact situation, so nothing goes back and forth twice.',
            ],
            [
                'q' => 'Which ITR form applies to me?',
                'a' => 'It depends on where your income comes from, not how much of it there is. Salary, one house property and modest interest income usually means ITR-1; add capital gains or a second property and it becomes ITR-2; business or professional income moves you to ITR-3 or ITR-4. You do not need to work this out yourself, tell us your sources of income and we pick the form.',
            ],
            [
                'q' => 'Old regime or new regime, which should I choose?',
                'a' => 'Whichever leaves you with more money, and that depends entirely on your deductions. If you are claiming a home loan, 80C investments, HRA and medical insurance, the old regime often still wins; with few deductions, the new regime usually does. We run your numbers both ways and show you the two figures side by side before filing.',
            ],
            [
                'q' => 'How long does a GST registration take?',
                'a' => 'Typically about a week from the day we have your complete documents, sometimes less. What slows it down is a mismatch in the address proof or the department raising a clarification, which is why we check the paperwork before we file rather than after. If your application is picked for physical verification, allow a little longer.',
            ],
            [
                'q' => 'I have received a notice from the department. Can you handle it?',
                'a' => 'Yes, and bring it to us early. Most notices are routine, a mismatch against Form 26AS, an unreported interest entry, a query on a deduction, and are settled with a properly drafted response. We read the notice, tell you plainly what it is asking and what it is likely to cost, and reply on your behalf within the deadline. This applies whether or not we filed the original return.',
            ],
            [
                'q' => 'Which company structure should I register: Pvt Ltd, LLP or OPC?',
                'a' => 'A private limited company suits you if you plan to raise outside investment or bring in co-founders, as it is the structure investors expect. An LLP is lighter to run and cheaper to comply with, which fits a professional or family-run firm with no funding plans. An OPC works for a single founder who wants limited liability now and can convert later. We talk it through against your actual plans, because switching structures afterwards is more expensive than choosing well the first time.',
            ],
            [
                'q' => 'Do you work with clients outside Bengaluru?',
                'a' => 'Yes. Filing is online, so documents come to us over WhatsApp or email and we handle clients across Karnataka and beyond. You lose nothing but the option of walking in, and you still get one named person on your file rather than a ticket queue.',
            ],
            [
                'q' => 'How do your fees work?',
                'a' => 'A fixed fee per piece of work, quoted in writing before we start. A straightforward salary return costs less than a return with capital gains; monthly GST filing is a flat monthly fee. There is no hourly meter and no bill at the end that you did not expect, and the first conversation to work out what you need is free.',
            ],
        ],
    ],

    // ------------------------------------------------------------- contact
    'contact' => [
        'eyebrow' => 'Come see us',
        'heading' => 'On Church Street, HAL 3rd Stage',
        'intro'   => 'Walk in with your documents, or start the conversation on the phone. Either way you speak to the person who will handle your file.',
        'form' => [
            'title'   => 'Ask us anything',
            'sub'     => 'Tell us what you need and we will come back with a fixed quote.',
            'privacy' => 'Your details stay with us and are never shared.',
            'submit'  => 'Request a callback',
        ],
        'sent' => [
            'title' => 'Thank you, we have your details',
            'body'  => 'We call back the same working day. If it is urgent, ring',
            'again' => 'Send another enquiry',
        ],
        'topics' => [
            'Income tax return filing',
            'GST registration or returns',
            'Company or LLP registration',
            'Payroll, PF &amp; ESI compliance',
            'A notice from the department',
            'Something else',
        ],
    ],

    // ------------------------------------------------------------ cta band
    'cta' => [
        'heading' => 'Deadline coming up?',
        'body'    => 'Call us before it is a penalty. We will tell you straight away what it takes.',
        'primary' => 'Book a free consultation',
    ],

    // -------------------------------------------------------------- footer
    'footer' => [
        'blurb'  => 'Chartered accountants, company secretaries and experienced accountants serving Bengaluru: individuals, businesses and multinationals alike.',
        'social' => [
            ['icon' => 'facebook',  'label' => 'Facebook',  'href' => '#top'],
            ['icon' => 'instagram', 'label' => 'Instagram', 'href' => '#top'],
            ['icon' => 'x',         'label' => 'X',         'href' => '#top'],
            ['icon' => 'chat',      'label' => 'WhatsApp',  'href' => 'whatsapp'],
        ],
        'columns' => [
            [
                'title' => 'Tax &amp; filing',
                'links' => [
                    'Income tax return filing',
                    'Corporate tax filing',
                    'GST registration',
                    'GST return filing',
                    'Audit services',
                    'Financial planning',
                ],
            ],
            [
                'title' => 'Registrations',
                'links' => [
                    'Company registration',
                    'LLP &amp; partnership',
                    'Udyog Aadhaar (MSME)',
                    'Importer Exporter Code',
                    'Digital Signature',
                    'PT registration',
                ],
            ],
            [
                'title' => 'Compliance',
                'links' => [
                    'Payroll compliance',
                    'PF &amp; ESI registration',
                    'Corporate &amp; MCA filings',
                    'E-way bills',
                    'Intellectual property',
                    'Notice &amp; audit defence',
                ],
            ],
        ],
    ],

    // ---------------------------------------------------------------- chat
    'chat' => [
        'greeting'    => 'Hey there!',
        'first_msg'   => 'Hi, we are Tax Source India. How can we help you today?',
        'placeholder' => 'Type a message...',
    ],
];
