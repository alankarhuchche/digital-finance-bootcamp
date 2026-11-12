import type { ModuleContent, ContentBlock } from '../types';
import type { ChapterSpec, SourceLink } from '../../types';
import { GBTD_HOOK, GBTD_SCENE, GBTD_USE_CASES } from '../../data/gbtdStory';

// Nine chapters: the problem, two layers of why, the mechanism, a hands-on example,
// other uses, the evidence, the limits and a check. Facts as reported at 12 Nov 2026.

const CHAPTERS: (ChapterSpec & { short: string })[] = [
  { id: 'ch-who-goes-first', num: '1', short: 'Who goes first?', title: 'Who goes first?',
    job: 'Why would anyone want a payment that waits? The two problems GBTD piloted.',
    ask: 'Why would a payment that waits for a condition help with purchase scams and remortgages?' },
  { id: 'ch-why-tokenise', num: '2', short: 'Why tokenise', title: 'Why tokenise money at all?',
    job: 'The reasons UK Finance, the Bank of England and the Treasury actually give.',
    ask: 'What reasons do UK Finance, the Bank of England and the Treasury give for tokenising deposits?' },
  { id: 'ch-why-bank-tokens', num: '3', short: 'Why bank tokens', title: 'Why bank tokens, and not a digital pound or stablecoins?',
    job: 'Where the CBDC question fits. Status as at 12 November 2026.',
    ask: 'How does GBTD relate to the digital pound and to stablecoins?' },
  { id: 'ch-how-money-moves', num: '4', short: 'How money moves', title: 'How the money moves',
    job: 'One payment from Sam to Alex, built up a piece at a time.',
    ask: 'If GBTD tokens move on a shared platform, how do the banks settle with each other?' },
  { id: 'ch-try-it', num: '5', short: 'Try it', title: 'Try the £100 purchase',
    job: 'Step through a held payment, with the bank’s view on demand.',
    ask: 'While a GBTD payment is held, whose money is it?' },
  { id: 'ch-use-cases', num: '6', short: 'Other uses', title: 'What else could this do?',
    job: 'Where tokenised deposits are live today, and where GBTD fits.',
    ask: 'Where are tokenised deposits live today, and how is GBTD different?' },
  { id: 'ch-evidence', num: '7', short: 'The evidence', title: 'Shown, planned, not published',
    job: 'What the September 2026 pilots did and didn’t show, and who said so.',
    ask: 'What did the GBTD pilots in September 2026 show, and what has not been published?' },
  { id: 'ch-limits', num: '8', short: 'Limits', title: 'What it doesn’t fix',
    job: 'Limits and open questions, credited to whoever raised them.',
    ask: 'What are the main limits and criticisms of tokenised deposits like GBTD?' },
  { id: 'ch-check', num: '9', short: 'Check yourself', title: 'Check yourself',
    job: 'Five questions, then every source on this page.' },
];

const chapter = (n: number): ContentBlock => {
  const c = CHAPTERS[n - 1];
  return { kind: 'chapter', data: { id: c.id, num: c.num, title: c.title, job: c.job, ask: c.ask } };
};

const S: Record<string, SourceLink> = {
  ukfLaunch: { label: 'UK Finance, 26 Sep 2025', url: 'https://www.ukfinance.org.uk/news-and-insight/press-release/uk-finance-announces-live-pilot-phase-deliver-tokenised-sterling' },
  ukfPilots: { label: 'UK Finance, 24 Sep 2026', url: 'https://www.ukfinance.org.uk/news-and-insight/press-release/uk-banks-complete-first-live-customer-transactions-using-tokenised' },
  reuters: { label: 'Reuters, 23 Sep 2026', url: 'https://www.reuters.com/business/finance/uk-banks-make-first-interbank-transactions-using-tokenised-deposits-2026-09-23/' },
  brc: { label: 'British Retail Consortium, 30 Sep 2026', url: 'https://brc.org.uk/news-and-events/news/finance/2026/ungated/tokenised-deposits-a-milestone-in-uk-payments-innovation-but-what-does-it-mean-for-retailers/' },
  quant: { label: 'Quant, Above the Ledger, 2026', url: 'https://quant.network/perspectives/above-the-ledger.html' },
  digit: { label: 'HM Treasury, 2 Nov 2026', url: 'https://www.gov.uk/government/news/uk-moves-closer-to-launching-first-digitally-native-government-bond' },
  lloyds: { label: 'Lloyds, 20 Jan 2026', url: 'https://www.lloydsbankinggroup.com/media/press-releases/2026/lloyds/lloyds-tokenisation.html' },
  fsp53: { label: 'BoE Financial Stability Paper 53', url: 'https://www.bankofengland.co.uk/financial-stability-paper/2025/holding-limits-for-sterling-denominated-systemic-stablecoins-and-a-digital-pound' },
  payuk: { label: 'Pay.UK 2025 statistics', url: 'https://www.wearepay.uk/wp-content/uploads/2026/02/Annual-Statistics-2025-v1.3.pdf' },
  dpConsult: { label: 'BoE and HM Treasury, Feb 2023', url: 'https://www.bankofengland.co.uk/news/2023/february/hm-treasury-and-boe-consider-plans-for-a-digital-pound' },
  bailey2023: { label: 'Bailey, Jul 2023', url: 'https://www.bankofengland.co.uk/speech/2023/july/andrew-bailey-speech-at-the-financial-and-professional-services-dinner' },
  rlnBusiness: { label: 'UK Finance RLN business report, Sep 2024', url: 'https://www.ukfinance.org.uk/system/files/2024-09/UK%20Finance%20RLN%20Business%20Report.pdf' },
  hmtPayments: { label: 'HM Treasury payments consultation, Jul 2026', url: 'https://assets.publishing.service.gov.uk/media/6a54b3302467584757371dc4/Modernising_payment_services_consultation.pdf' },
  syncLab: { label: 'BoE Synchronisation Lab', url: 'https://www.bankofengland.co.uk/payments/rtgs-future-roadmap/synchro-lab' },
  mansion: { label: 'Mansion House speech, Jul 2026', url: 'https://www.gov.uk/government/speeches/rachel-reeves-mansion-house-2026-speech' },
  fca: { label: 'FCA cryptoassets rules, Jun 2026', url: 'https://www.fca.org.uk/firms/cryptoassets' },
  rlnDiscovery: { label: 'UK Finance RLN Discovery Phase, Sep 2023', url: 'https://www.ukfinance.org.uk/system/files/2023-09/Regulated%20Liability%20Network%20-%20UK%20Discovery%20Phase%20.pdf' },
  gbtdEvidence: { label: 'GBTD written evidence to Parliament, 20 Mar 2026', url: 'https://committees.parliament.uk/writtenevidence/164219/html/' },
  bailey2024: { label: 'Bailey, 26 Oct 2024', url: 'https://www.bankofengland.co.uk/speech/2024/october/andrew-bailey-panellist-at-the-g30-39-annual-international-banking-seminar' },
  dpProgress: { label: 'BoE digital pound progress update, Mar 2026', url: 'https://www.bankofengland.co.uk/the-digital-pound/progress-update-digital-pound-design-phase' },
  writtenAnswer: { label: 'Written answer, 21 Oct 2026', url: 'https://questions-statements-api.parliament.uk/api/writtenquestions/questions/1948515' },
  wholesale: { label: 'BoE wholesale experiments', url: 'https://www.bankofengland.co.uk/payments/payments-innovation/wholesale-experiments-programme' },
  stablecoinPolicy: { label: 'BoE stablecoin policy, Jun 2026', url: 'https://www.bankofengland.co.uk/news/2026/june/boe-launches-policy-statement-and-draft-rules-on-regulating-systemic-stablecoins' },
  praLetter: { label: 'PRA letter, 18 May 2026', url: 'https://www.bankofengland.co.uk/-/media/boe/files/prudential-regulation/letter/2026/innovations-in-the-use-of-deposits-emoney-and-regulated-stablecoins.pdf' },
  est: { label: 'Economic Secretary, 6 Oct 2026', url: 'https://www.gov.uk/government/speeches/economic-secretary-to-the-treasury-speech-for-uk-digital-assets-week' },
  hkma: { label: 'HKMA, 2 Nov 2026', url: 'https://www.hkma.gov.hk/eng/news-and-media/press-releases/2026/11/20261102-5/' },
  hangang: { label: 'Aju Press on Project Hangang, 20 Jul 2026', url: 'https://www.ajupress.com/view/20260720112055510' },
  bisAer: { label: 'BIS Annual Economic Report 2026, ch. III', url: 'https://www.bis.org/publications/anchoring-trust-money.pdf' },
  champion: { label: 'Wholesale Digital Markets Champion report, Jul 2026', url: 'https://assets.publishing.service.gov.uk/media/6a510e8b2467584757371d58/Digital_Markets_Champion_Report.pdf' },
  pexa: { label: 'MPA Mag on PEXA, 2 Jun 2025', url: 'https://www.mpamag.com/uk/mortgage-types/residential/pexa-completes-uks-first-fully-digital-property-purchase/537681' },
};

const sourcesLine = (...links: SourceLink[]): string =>
  `<p class="sources-line">Sources: ${links.map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join(' · ')}</p>`;

const ALL_SOURCES: SourceLink[] = [
  ...Object.values(S),
  ...GBTD_HOOK.sources, ...GBTD_SCENE.sources, ...GBTD_USE_CASES.items.flatMap(i => i.sources),
].filter((s, i, all) => all.findIndex(o => o.url === s.url) === i);

const content: ModuleContent = {
  id: 'gbtd',
  number: '26',
  title: 'GBTD tokenised deposits',
  summary: 'Why UK banks are testing tokenised deposits on a shared platform, how a payment between two banks works with and without one, what the September 2026 pilots showed, and what is still unknown.',
  ready: true,
  layout: 'wide',
  changeType: 'new',
  updatedAt: '2026-11-12',
  changeSummary: 'New topic in nine chapters: the problem GBTD tests, why bank tokens rather than a digital pound or stablecoins, a step-by-step payment scene, a filterable map of tokenised-deposit uses worldwide, and an evidence board for the 2026 pilots.',
  blocks: [
    { kind: 'chapter-nav', data: { chapters: CHAPTERS.map(({ id, num, short }) => ({ id, num, short })) } },
    {
      kind: 'text',
      body: `<p>GBTD, short for Great British Tokenised Deposits, is a UK Finance-led pilot of tokenised sterling deposits. Seven banks and building societies take part: Barclays, HSBC UK, Lloyds Banking Group, Monzo, Nationwide, NatWest and Santander. Quant built the shared platform, EY supports project management and Linklaters leads the legal and rulebook work.</p>
<p>A tokenised deposit is still an ordinary bank deposit, a promise from the bank that holds it, recorded on a new kind of ledger. In September 2026 the banks reported their first customer transactions: two live remortgage completions and one marketplace payment that used a simulated purchase.</p>
<h3 class="prose-kicker">In short</h3>
<ol class="takeaways">
<li>GBTD puts ordinary bank deposits on one shared ledger, so a payment between two banks can wait for a condition, such as “release when the bike is handed over” or “release on completion”.</li>
<li>Speed isn’t the point, because Faster Payments already runs 24/7. The stated reasons are conditional payments across banks, cash that can sit next to tokenised bonds and gilts, and keeping new digital money linked to bank lending.</li>
<li>The UK hasn’t decided on a digital pound. GBTD’s groundwork began in 2023 as something to sit alongside one. Today the Bank of England says it would rather banks modernise their own money.</li>
<li>A shared ledger gives interoperability. Being worth £1 everywhere and being legally final come from central bank money, regulation and law. How the banks settle with each other hasn’t been published.</li>
<li>Elsewhere, tokenised deposits are live mainly inside single banks, for companies. GBTD is testing the rarer case: between banks, for people.</li>
</ol>`,
    },

    chapter(1),
    { kind: 'gbtd-hook', data: GBTD_HOOK },

    chapter(2),
    {
      kind: 'status-cards',
      data: {
        cards: [
          { tone: 'pilot', status: 'Piloted · Sep 2026', title: 'Payments that wait for a condition',
            body: 'Hold money until the goods arrive or the remortgage completes, even when the two people bank in different places.', who: 'UK Finance' },
          { tone: 'pilot', status: 'First trades · 2026', title: 'Cash that sits where assets sit',
            body: 'The government plans its first digital gilt, DIGIT, by early 2027, and in January 2026 Lloyds used tokenised deposits to buy a tokenised gilt. Bonds on new ledgers need cash on the same ledgers so both sides settle together.', who: 'HM Treasury · Lloyds' },
          { tone: 'idea', status: 'Stated policy', title: 'Keeping digital money linked to lending',
            body: 'Deposits fund most UK lending, and the Bank wants new digital money to stay linked to it. Its own analysis shows how much could leave banks if new digital money grew unchecked.', who: 'Bank of England' },
        ],
      },
    },
    {
      kind: 'callout',
      data: {
        tone: 'reality',
        body: '<b>Not speed.</b> Faster Payments already runs 24/7 and carried 5.55 billion payments in 2025. What tokens add is conditions and all-or-nothing settlement, where both sides of a deal complete together or neither does. That has a cost: money held against a condition is money the bank has to keep ready.',
      },
    },
    {
      kind: 'timeline',
      heading: 'How the UK got here',
      data: {
        events: [
          { date: 'Feb 2023', title: 'Digital pound consultation', detail: 'The Bank of England and the Treasury consult on a retail CBDC.', status: 'done' },
          { date: 'Jul 2023', title: 'The Governor backs tokenised deposits', detail: 'Andrew Bailey urges banks to develop tokenised deposits.', status: 'done' },
          { date: 'Sep 2024', title: 'RLN test results', detail: 'UK Finance publishes the results of its Regulated Liability Network experiments.', status: 'done' },
          { date: 'Oct 2024', title: '“The best home”', detail: 'The Governor calls commercial bank money the best home for payments innovation.', status: 'done' },
          { date: 'Sep 2025', title: 'GBTD pilot phase launched', detail: 'UK Finance launches the live pilot phase with six banks. Monzo joins in January 2026.', status: 'done' },
          { date: 'Feb 2026', title: 'Deposits in law', detail: 'New cryptoasset regulations pass, and tokenised deposits are confirmed as deposits, with deposit-protection rules applying.', status: 'done' },
          { date: 'May 2026', title: 'Synchronisation Lab opens', detail: 'The Bank’s non-live lab opens with 18 participants, GBTD among them.', status: 'done' },
          { date: 'Jul 2026', title: 'Mansion House', detail: 'The Chancellor names GBTD in the annual Mansion House speech.', status: 'done' },
          { date: 'Sep 2026', title: 'First customer transactions', detail: 'Seven banks report two live remortgages and one test payment.', status: 'done' },
          { date: 'End 2026', title: 'Digital pound decision due', detail: 'The Treasury and the Bank say they will announce a decision.', status: 'upcoming' },
          { date: '2027', title: 'DIGIT and stablecoin rules', detail: 'The first digital gilt is planned, and the FCA stablecoin regime starts in October.', status: 'upcoming' },
          { date: '2028', title: 'Synchronisation service', detail: 'The Bank of England’s synchronisation service is due to go live.', status: 'upcoming' },
        ],
      },
    },
    {
      kind: 'text',
      body: `<p>The general case for deposit tokens, outside the UK, is on the <a href="/topic/deposit-tokens" data-topic="deposit-tokens">Deposit tokens</a> page. This page stays with the UK pilot.</p>
${sourcesLine(S.ukfLaunch, S.digit, S.lloyds, S.fsp53, S.payuk, S.dpConsult, S.bailey2023, S.rlnBusiness, S.hmtPayments, S.syncLab, S.mansion, S.fca)}`,
    },

    chapter(3),
    {
      kind: 'status-cards',
      data: {
        cards: [
          { tone: 'none', status: 'No decision', title: 'Digital pound',
            body: 'The Bank of England’s own money, for the public. A decision is due by the end of 2026, and the earliest issue would be in the second half of the decade.', who: 'Bank of England · HM Treasury' },
          { tone: 'none', status: 'Not planned', title: 'Wholesale CBDC token',
            body: 'Bank of England money for banks, on new ledgers. The Bank is linking its existing settlement system to new ledgers instead, live from 2028, and is still studying a token.', who: 'Bank of England' },
          { tone: 'poc', status: 'Rules in progress', title: 'Sterling stablecoins',
            body: 'A promise from a non-bank issuer, backed by assets. The Bank’s rules are due by the end of 2026, with a temporary £40bn cap per coin to protect bank lending. The FCA regime starts in October 2027.', who: 'Bank of England · FCA' },
          { tone: 'pilot', status: 'Pilot', title: 'Tokenised deposits', focus: true,
            body: 'Your bank’s existing promise, on a new ledger. Confirmed as deposits in law in February 2026, with deposit-protection rules applying. This is what GBTD tests.', who: 'PRA · HM Treasury · UK Finance' },
        ],
      },
    },
    {
      kind: 'timeline',
      heading: 'How the reason shifted',
      data: {
        events: [
          { date: '2023', title: 'Alongside a digital pound', detail: 'UK Finance’s first study of shared tokenised bank money is framed around the digital pound, then the “current policy priority”, and tests how upgraded bank money could sit alongside one.', status: 'done' },
          { date: '2024', title: 'Bank money first', detail: 'The Governor calls commercial bank money “the best home” for payments innovation. Work on a retail CBDC continues in case that innovation doesn’t happen.', status: 'done' },
          { date: '2026', title: 'An answer to stablecoins', detail: 'GBTD’s own releases don’t mention the digital pound. To Parliament, it argues the domestic case for stablecoins is “significantly weaker” and warns about the effect on bank lending.', status: 'done' },
          { date: 'End 2026', title: 'Decision due', detail: 'The Bank weighs the digital pound against “other initiatives to modernise payments”.', status: 'upcoming' },
        ],
      },
    },
    {
      kind: 'text',
      body: '<p>So GBTD grew out of the CBDC debate, but it isn’t filling a gap left by a decision against one. It’s part of the evidence for that decision. Ministers say they aren’t picking a winner between tokenised deposits and stablecoins.</p>',
    },
    {
      kind: 'callout',
      data: {
        tone: 'insight',
        body: '<b>What the missing central bank token does leave open.</b> There’s no central bank token on these ledgers. Customers’ money can move on the platform while the banks still have to settle with each other somewhere else, and chapter 4 shows the options. Other places did put central bank money on the ledger. Hong Kong’s banks have settled token transfers in tokenised central bank money since 2 November 2026, and Korea’s pilot settled deposit tokens in a wholesale CBDC. The UK’s chosen route is synchronisation with the Bank of England’s settlement system, from 2028.',
      },
    },
    {
      kind: 'text',
      body: sourcesLine(S.rlnDiscovery, S.gbtdEvidence, S.bailey2024, S.dpProgress, S.writtenAnswer, S.wholesale, S.stablecoinPolicy, S.praLetter, S.est, S.hkma, S.hangang),
    },

    chapter(4),
    { kind: 'gbtd-scene', data: GBTD_SCENE },

    chapter(5),
    { kind: 'gbtd-explorer' },

    chapter(6),
    {
      kind: 'text',
      body: `<p>Tokenised deposits are already live, mostly for large companies moving money inside one bank. JPMorgan has done this for Siemens since 2021, and HSBC and Citi run similar services. Paying someone at a different bank is the hard part: real-money pilots between banks only began in 2025 and 2026. Consumer use is rarer still, and that harder corner is the one GBTD is testing.</p>
<p>Each numbered marker on the map is one of the use cases below it. Filter by status or by who it serves, and open a card to see what does the job today, what tokens add and what to watch.</p>`,
    },
    { kind: 'usecase-atlas', data: GBTD_USE_CASES },
    {
      kind: 'callout',
      data: {
        tone: 'strategy',
        body: '<b>Banking lens.</b> Inside one bank, the bank’s own books settle everything. Between banks, someone still has to settle in central bank money. Hong Kong’s banks have done that with tokenised central bank money since 2 November 2026. Swift’s shared ledger records who owes whom, and settlement happens in existing systems.',
      },
    },

    chapter(7),
    {
      kind: 'comparison',
      heading: 'The GBTD pilots, as at 12 November 2026',
      data: {
        columns: [
          {
            title: 'Shown',
            subtitle: 'As reported on 24 Sep 2026',
            points: [
              { label: 'Two live remortgages', value: 'Funds locked, then released automatically on completion. Reuters names Lloyds, NatWest and Barclays.', emphasis: 'positive' },
              { label: 'One marketplace payment', value: 'Real money moved between banks. Reuters and the British Retail Consortium say the purchase was simulated. Quant’s write-up says goods changed hands. The sources disagree.' },
              { label: 'Who took part', value: 'Seven banks and building societies. It’s a pilot, not a product customers can use.' },
              { label: 'Scale', value: 'No values, volumes or timings published.', emphasis: 'neutral' },
            ],
          },
          {
            title: 'Planned',
            subtitle: 'As announced',
            points: [
              { label: 'UK Finance', value: 'Digital-asset settlement pilots, and bank-issued digital debt with coupons paid in tokenised deposits.' },
              { label: 'Reuters', value: 'A company, a rulebook and three digital bonds in early 2027.' },
              { label: 'Bank of England lab', value: 'A bond or gilt settlement test in the non-live Synchronisation Lab.' },
            ],
          },
          {
            title: 'Not published',
            subtitle: 'As at 12 Nov 2026',
            points: [
              { label: 'Settlement between banks', value: 'The asset, rail, timing and finality.', emphasis: 'negative' },
              { label: 'The rulebook', value: 'Dispute and cancellation rules.', emphasis: 'negative' },
              { label: 'The condition', value: 'Who confirmed that the goods were received.', emphasis: 'negative' },
              { label: 'Results', value: 'Scale, cost and fraud savings.', emphasis: 'negative' },
            ],
          },
        ],
      },
    },
    { kind: 'text', body: sourcesLine(S.ukfPilots, S.reuters, S.brc, S.quant, S.syncLab) },

    chapter(8),
    {
      kind: 'text',
      body: `<ul class="limits">
<li><b>More walled gardens.</b> One shared platform helps its members, but the UK already has several: GBTD, Lloyds on Canton and DIGIT on HSBC Orion. The BIS warns that permissioned networks can become walled gardens.</li>
<li><b>Locked money has a cost.</b> All-or-nothing settlement needs the money ready in advance (BIS).</li>
<li><b>Finality law hasn’t caught up.</b> The UK finality regime hasn’t been adapted to these ledgers outside the Bank’s sandbox (Wholesale Digital Markets Champion).</li>
<li><b>The central bank link isn’t live.</b> Synchronised settlement arrives in 2028, and the 2026 lab uses no real money.</li>
<li><b>Other routes compete.</b> PEXA already settles remortgages digitally through the Bank of England, and stablecoins are being allowed as settlement assets for tokenised markets.</li>
<li><b>The business case is open.</b> The project’s own 2024 model paid its way over 30 years only with higher fees or more uses (UK RLN business report).</li>
<li><b>Fraud may move rather than end.</b> Someone trusted must confirm delivery, and investment and romance scams have no delivery to check.</li>
</ul>`,
    },
    {
      kind: 'callout',
      data: {
        tone: 'strategy',
        body: '<b>Practitioner view.</b> Conditions and all-or-nothing settlement are the real gains. Both depend on rules, settlement arrangements and law that the pilots haven’t yet published. Until they are, treat GBTD as evidence that the customer side works, not as a settlement design.',
      },
    },
    { kind: 'text', body: sourcesLine(S.bisAer, S.champion, S.syncLab, S.pexa, S.stablecoinPolicy, S.rlnBusiness) },

    chapter(9),
    {
      kind: 'quiz',
      data: {
        questions: [
          {
            question: 'What does GBTD change about a payment between customers of two different banks?',
            options: [
              'The money can be held against a condition and released when it’s met',
              'The payment arrives faster than with Faster Payments',
              'The customer’s deposit becomes Bank of England money',
              'The two banks no longer need to settle with each other',
            ],
            correctIndex: 0,
            explanation: 'The shared platform lets money be held and released on a condition across banks. Faster Payments is already fast, the tokens stay each bank’s own promise, and the banks still have to settle with each other.',
          },
          {
            question: 'Why not just use Faster Payments?',
            options: [
              'It’s already fast and runs 24/7, but it can’t hold a payment against a condition across banks',
              'It closes at weekends',
              'It can’t carry payments as small as £100',
              'It’s being switched off in 2028',
            ],
            correctIndex: 0,
            explanation: 'Faster Payments carried 5.55 billion payments in 2025 and runs all day, every day. The gap GBTD tests is conditional, all-or-nothing payment between banks, not speed.',
          },
          {
            question: 'Where does the digital pound question fit?',
            options: [
              'GBTD began in 2023 as something to sit alongside a digital pound. No decision has been made, and GBTD is part of the evidence for it',
              'GBTD exists because the UK rejected a digital pound',
              'GBTD is the digital pound under another name',
              'The Bank of England runs GBTD',
            ],
            correctIndex: 0,
            explanation: 'The 2023 groundwork assumed a digital pound might come. By 2026 GBTD’s case is mostly about stablecoins, and the digital pound decision is due by the end of 2026. No source says GBTD exists because the UK lacks a CBDC.',
          },
          {
            question: 'A Scottish £20 note is worth £20, even though a London shop may refuse it. What makes £1 at Bank A worth £1 at Bank B?',
            options: [
              'Settlement in central bank money, with regulation and deposit protection behind deposits',
              'The shared ledger records both banks’ tokens',
              'The Scottish banks guarantee it',
              'The FCA sets the rate each day',
            ],
            correctIndex: 0,
            explanation: 'Being worth £1 everywhere comes from central bank money, regulation and deposit protection. A shared ledger gives interoperability, which is a separate question, like whether a shop accepts a note.',
          },
          {
            question: 'What did the September 2026 pilots show?',
            options: [
              'Two live remortgages and one test payment using a simulated purchase. How the banks settled with each other wasn’t published',
              'Thousands of customer payments a day',
              'That settlement between banks is no longer needed',
              'That the platform settles in central bank money',
            ],
            correctIndex: 0,
            explanation: 'UK Finance reported two live remortgage completions and one marketplace payment, which Reuters and the British Retail Consortium describe as a simulated purchase. Volumes, the settlement arrangements and the rulebook haven’t been published.',
          },
        ],
      },
    },
    {
      kind: 'text',
      body: `<details class="all-sources">
<summary>All ${ALL_SOURCES.length} sources on this page</summary>
<ul>${ALL_SOURCES.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.label}</a></li>`).join('')}</ul>
</details>
<p class="sources-line">Facts are as publicly reported at 12 November 2026. Sam, Alex, £100, Bank A and Bank B are illustrative: GBTD hasn’t published which banks or customers took part in which transaction.</p>`,
    },
  ],
};

export default content;
