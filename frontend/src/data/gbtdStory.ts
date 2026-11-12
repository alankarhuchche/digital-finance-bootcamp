// gbtdStory.ts
// Content for the GBTD topic's interactive blocks: the "who goes first?" dilemma,
// the six-step payment scene and the tokenised-deposit use-case atlas.
// Facts are as publicly reported at 12 Nov 2026. Sam, Alex, £100, Bank A and Bank B
// are illustrative; GBTD has not published which banks or customers took part in
// which pilot transaction, or how the banks settled with each other.

import type { GbtdHookSpec, GbtdSceneSpec, UseCaseAtlasSpec } from '../types';

const SRC = {
  ukfPilots: { label: 'UK Finance, 24 Sep 2026', url: 'https://www.ukfinance.org.uk/news-and-insight/press-release/uk-banks-complete-first-live-customer-transactions-using-tokenised' },
  ukfFraud: { label: 'UK Finance Annual Fraud Report 2026', url: 'https://www.ukfinance.org.uk/system/files/2026-06/UK%20Finance%20Fraud%20Report%202026.pdf' },
  mhclg: { label: 'MHCLG home buying roadmap, Jun 2026', url: 'https://www.gov.uk/government/consultations/home-buying-and-selling-reform/outcome/home-buying-and-selling-reform-roadmap' },
  ukfHousehold: { label: 'UK Finance Household Finance Review, Q4 2025', url: 'https://www.ukfinance.org.uk/system/files/2026-03/20260224%20Household%20Finance%20Review%202025%20Q4%20FINAL.pdf' },
  completionCode: { label: 'Conveyancer’s Code for Completion', url: 'https://www.conveyancingassociation.org.uk/wp-content/uploads/2023/01/FINAL-THE-CONVEYANCER-CODE-FOR-COMPLETION-AUGUST-2017.pdf' },
  breeden: { label: 'Breeden, 19 May 2026', url: 'https://www.bankofengland.co.uk/speech/2026/may/sarah-breeden-speech-at-city-week-the-future-of-money-in-a-digital-world' },
  legalTender: { label: 'BoE legal tender explainer', url: 'https://www.bankofengland.co.uk/explainers/what-is-legal-tender' },
  sniNotes: { label: 'BoE Scottish and NI banknotes report 2026', url: 'https://www.bankofengland.co.uk/banknotes/scottish-and-northern-ireland-banknotes/2026-annual-report' },
  bisAer: { label: 'BIS Annual Economic Report 2026, ch. III', url: 'https://www.bis.org/publications/anchoring-trust-money.pdf' },
  syncLab: { label: 'BoE Synchronisation Lab', url: 'https://www.bankofengland.co.uk/payments/rtgs-future-roadmap/synchro-lab' },
  champion: { label: 'Wholesale Digital Markets Champion report, Jul 2026', url: 'https://assets.publishing.service.gov.uk/media/6a510e8b2467584757371d58/Digital_Markets_Champion_Report.pdf' },
  rlnBusiness: { label: 'UK Finance RLN business report, Sep 2024', url: 'https://www.ukfinance.org.uk/system/files/2024-09/UK%20Finance%20RLN%20Business%20Report.pdf' },
  pexa: { label: 'MPA Mag on PEXA, 2 Jun 2025', url: 'https://www.mpamag.com/uk/mortgage-types/residential/pexa-completes-uks-first-fully-digital-property-purchase/537681' },
  hangang: { label: 'Aju Press on Project Hangang, 20 Jul 2026', url: 'https://www.ajupress.com/view/20260720112055510' },
  jpmAccounts: { label: 'JPMorgan, 29 Jun 2026', url: 'https://www.jpmorgan.com/payments/newsroom/kinexys-apac-blockchain-deposit-accounts' },
  jpmBmw: { label: 'JPMorgan, 9 Dec 2025', url: 'https://www.jpmorgan.com/payments/newsroom/bmw-programmable-fx-transaction-kinexys' },
  jpmRepo: { label: 'JPMorgan Kinexys Digital Financing', url: 'https://www.jpmorgan.com/kinexys/digital-financing' },
  hsbcUs: { label: 'HSBC, 13 Apr 2026', url: 'https://www.about.us.hsbc.com/newsroom/press-releases/hsbc-expands-tokenized-deposit-service-to-the-united-states' },
  citi: { label: 'Citi, 28 Sep 2026', url: 'https://www.citigroup.com/global/news/press-release/2026/citi-token-services-expands-global-footprint-japan-united-arab-emirates' },
  hsbcSwift: { label: 'HSBC on Swift’s ledger, 2026', url: 'https://www.about.hsbc.com.hk/news-and-media/hsbc-and-standard-chartered-execute-first-live-tokenised-deposit-transaction-on-swifts-blockchain' },
  agora: { label: 'BIS Project Agorá, 27 May 2026', url: 'https://www.bis.org/press/p260527.htm' },
  ocbc: { label: 'OCBC, 6 Nov 2024', url: 'https://www.ocbc.com/group/media/release/2024/ocbc-partners-lta-to-pilot-blockchain-based-conditional-payment-solution-for-construction-projects.page' },
  dbs: { label: 'DBS, 22 Aug 2024', url: 'https://www.dbs.com/newsroom/DBS_pilots_programmable_grant_disbursements_with_Enterprise_Singapore_and_Singapore_Fintech_Association_to_improve_governance_and_efficiency_of_government_payouts' },
  lloydsGilt: { label: 'Ledger Insights on Lloyds, 7 Jan 2026', url: 'https://www.ledgerinsights.com/lloyds-banks-tokenized-deposit-used-on-public-blockchain-for-gilt-trade/' },
  digit: { label: 'HM Treasury, 2 Nov 2026', url: 'https://www.gov.uk/government/news/uk-moves-closer-to-launching-first-digitally-native-government-bond' },
  hkma: { label: 'HKMA, 2 Nov 2026', url: 'https://www.hkma.gov.hk/eng/news-and-media/press-releases/2026/11/20261102-5/' },
};

export const GBTD_HOOK: GbtdHookSpec = {
  tabs: [
    {
      id: 'buy',
      tab: 'Buying from a stranger',
      intro: 'Sam wants to buy Alex’s bike for £100 online. They’ve never met, so one of them has to go first.',
      payer: { name: 'Sam', sub: 'Buyer · Bank A' },
      payee: { name: 'Alex', sub: 'Seller · Bank B' },
      itemLabel: 'Bike',
      midLabel: '',
      choices: {
        pay: { label: 'Sam pays first', outcome: '<strong>Sam pays first.</strong> If the listing is fake, the £100 is gone. That’s a purchase scam, the most common kind of authorised push payment scam in the UK.' },
        hand: { label: 'Alex hands over first', outcome: '<strong>Alex hands over first.</strong> If Sam never pays, Alex has lost the bike.' },
        lock: { label: 'Lock the money first', outcome: '<strong>Lock the money first.</strong> Sam’s £100 stays in Sam’s account but can’t be spent. When the handover is confirmed, it’s released to Alex. GBTD tested this between two banks in September 2026, using a simulated purchase.' },
      },
      copy: `<p>If Sam pays for a bike that doesn’t exist, that’s a purchase scam. They are the most common authorised push payment scam in the UK: 175,809 cases in 2025, 71% of all APP scam cases, at an average of £671 each.</p>
<p>Protection exists. 78% of purchase-scam losses were refunded in 2025, and marketplaces offer protected checkouts, which fraudsters talk buyers out of using. GBTD tests a hold-and-release built into the bank money itself, across banks.</p>`,
    },
    {
      id: 'home',
      tab: 'Completing a remortgage',
      intro: 'Sam is remortgaging. On completion day the new lender has to pay off the old one, and neither wants to go first.',
      payer: { name: 'New lender', sub: 'Pays off the old loan' },
      payee: { name: 'Old lender', sub: 'Holds the charge' },
      itemLabel: 'Charge on Sam’s home',
      midLabel: 'Conveyancer’s account',
      choices: {
        pay: { label: 'New lender pays early', outcome: '<strong>The new lender pays early.</strong> The money waits in a conveyancer’s account, often from the day before, and Sam can pay interest for the wait.' },
        hand: { label: 'Old lender releases first', outcome: '<strong>The old lender releases first.</strong> No lender removes its charge on a home before the loan is repaid.' },
        lock: { label: 'Lock the money first', outcome: '<strong>Lock the money first.</strong> The new lender’s funds are locked, then released automatically on completion. GBTD did this in two live remortgages in September 2026.' },
      },
      copy: `<p>About 1.2 million homes change hands a year, around 120 days from offer to completion. Completion money usually reaches conveyancers’ accounts a day or two early, and the borrower can pay interest for the wait.</p>
<p>In GBTD’s two live remortgage completions, the funds were locked, then released automatically on completion. UK Finance says the money can keep earning interest until then. It hasn’t published the terms, or whose money was locked.</p>
<p>For scale, only 322,000 remortgages in 2025 moved money between lenders. Another 1.54 million were product transfers with the same lender.</p>`,
    },
  ],
  lens: '<b>Banking lens.</b> Whose liability is held money? It stays Sam’s deposit at Bank A until it’s released. Who confirms the handover? Someone trusted has to, which the BIS calls the oracle problem.',
  sources: [SRC.ukfFraud, SRC.mhclg, SRC.completionCode, SRC.ukfPilots, SRC.ukfHousehold],
};

export const GBTD_SCENE: GbtdSceneSpec = {
  steps: [
    {
      label: 'Step 1 · today',
      title: 'Sam pays Alex £100',
      body: 'Sam’s deposit is a promise from Bank A. When Sam pays, Bank A lowers Sam’s balance and Bank B raises Alex’s. Bank A now owes Bank B £100, and the two banks settle that in central bank money, using their accounts at the Bank of England.',
      like: 'friends keeping IOUs, then settling up in cash.',
      stops: 'banks settle many times a day, or payment by payment for CHAPS, not now and then.',
    },
    {
      label: 'Step 2 · today',
      title: 'Why £1 at Bank A is £1 at Bank B',
      body: 'Nobody asks which bank your pound came from. Banks settle in central bank money, and regulation and deposit protection stand behind deposits. As Deputy Governor Sarah Breeden put it, “a pound is a pound, whoever issues it”.',
      like: 'Scottish banknotes. Commercial banks issue them, backed by Bank of England money, so a £20 note is worth £20. Whether a London shop takes one is a separate question.',
      stops: 'Scottish notes are fully backed. Deposits aren’t, so regulation, deposit protection and central bank settlement do that job.',
    },
    {
      label: 'Step 3 · the problem',
      title: 'Each bank tokenises on its own ledger',
      body: 'Sam’s Bank A tokens live on Bank A’s ledger, where Bank B can’t accept them. Each bank would also need money parked on every ledger it uses. The BIS calls these walled gardens.',
      like: 'messaging apps that can’t message each other.',
      stops: 'a message only has to arrive. A payment also leaves one bank owing another.',
    },
    {
      label: 'Step 4 · GBTD',
      title: 'One platform, one rulebook',
      body: 'Both banks issue their own tokens on one shared platform. Sam’s £100 can be held against a condition and released to Alex when it’s met. Each token is still a promise from the bank that issued it. How tokens change hands between banks hasn’t been published.',
      like: 'a hotel card hold. It’s still Sam’s money, but it can’t be spent until it’s released.',
      stops: 'a card hold is set by the merchant and expires. Here both sides agree the condition first.',
    },
    {
      label: 'Step 5 · the missing piece',
      title: 'Who settles what Bank A owes Bank B?',
      body: 'The platform moves the customers’ money. On its own, it doesn’t settle what Bank A now owes Bank B. With no central bank token on the ledger, there are three broad options. GBTD hasn’t published which its retail pilots used. Its test in the Bank of England’s non-live lab is for bonds and gilts.',
    },
    {
      label: 'Step 6 · the scorecard',
      title: 'What a shared ledger gives you, and what it doesn’t',
      body: 'Moving money between banks is what the platform provides. Being worth £1 everywhere and being legally final come from central bank money, regulation and law. UK settlement-finality law hasn’t yet been adapted to these ledgers outside the Bank’s sandbox.',
    },
  ],
  sources: [SRC.breeden, SRC.legalTender, SRC.sniNotes, SRC.bisAer, SRC.syncLab, SRC.champion],
};

export const GBTD_USE_CASES: UseCaseAtlasSpec = {
  columns: { inside: 'Inside one bank', between: 'Between banks' },
  rows: { organisations: 'Companies and markets', people: 'People' },
  cells: [
    {
      row: 'organisations', reach: 'inside', label: 'Companies and markets · inside one bank',
      status: { tone: 'live', label: 'Live since 2020–21' },
      text: 'Group cash at any hour, conditional payments, currency swaps and intraday repo. JPMorgan, HSBC and Citi run live services.',
    },
    {
      row: 'organisations', reach: 'between', label: 'Companies and markets · between banks',
      status: { tone: 'pilot', label: 'Pilots 2025–26' },
      text: 'Swift’s shared ledger, BIS Project Agorá and Hong Kong’s EnsembleTX. Partior is live but narrow.',
    },
    {
      row: 'people', reach: 'inside', label: 'People · inside one bank',
      text: 'Nothing significant found.',
    },
    {
      row: 'people', reach: 'between', label: 'People · between banks', highlight: true,
      status: { tone: 'pilot', label: 'Rare pilots' },
      text: '<b>GBTD sits here</b> (UK, Sep 2026), alongside Korea’s Project Hangang (2025).',
    },
  ],
  items: [
    {
      id: 'buy-stranger', title: 'Buy from a stranger', status: 'pilot', statusLabel: 'Pilot · UK · Sep 2026',
      audience: 'people', reach: 'between', highlight: true,
      summary: 'GBTD ran one payment between banks, using a simulated purchase. No live equivalent was found anywhere else.',
      aside: 'Today: protected checkouts, card chargebacks, APP refunds',
      today: 'Protected marketplace checkouts, card chargebacks and the UK’s reimbursement rules for authorised push payment scams.',
      adds: 'A hold-and-release that works across banks, built into the deposit rather than run by the marketplace.',
      watch: 'Someone trusted still has to confirm the handover. Scams with nothing to deliver, such as investment or romance scams, aren’t touched.',
      sources: [SRC.ukfPilots, SRC.ukfFraud],
    },
    {
      id: 'remortgage', title: 'Complete a remortgage', status: 'pilot', statusLabel: 'Pilot · UK · Sep 2026',
      audience: 'people', reach: 'between', highlight: true,
      summary: 'Two live GBTD completions: funds locked, then released on completion. None found elsewhere.',
      aside: 'UK alternative: PEXA settles digitally through the Bank of England',
      today: 'CHAPS payments through conveyancers’ accounts, usually a day or two before completion. PEXA, which settles through the Bank of England, says it had settled over £100m of UK remortgages by January 2025.',
      adds: 'The new lender’s money stays locked until completion, then moves automatically.',
      watch: 'Terms aren’t published, including whose money was locked. Only 322,000 remortgages in 2025 moved money between lenders.',
      sources: [SRC.ukfPilots, SRC.pexa, SRC.ukfHousehold],
    },
    {
      id: 'home-chain', title: 'Buy a home, chains included', status: 'poc', statusLabel: 'Proof of concept · UK · 2024',
      audience: 'people', reach: 'between',
      summary: 'Every payment in a purchase released at once. Tested without real money by UK Finance’s RLN in 2024. The Bank’s lab tests it in central bank money.',
      aside: 'Competing route: synchronised RTGS, from 2028',
      today: 'At least nine payments for one buyer, one seller and no chain, with the deposit sitting in a conveyancer’s client account.',
      adds: 'Deposit and mortgage money locked at exchange, then everyone paid together at completion.',
      watch: 'The Bank of England’s synchronisation service, due in 2028, competes for the same job in central bank money.',
      sources: [SRC.rlnBusiness, SRC.syncLab],
    },
    {
      id: 'everyday', title: 'Everyday payments and payouts', status: 'pilot', statusLabel: 'Pilot · Korea · 2025',
      audience: 'people', reach: 'between',
      summary: 'Project Hangang: about 81,000 wallets paid in shops with bank deposit tokens, settled between banks in a wholesale CBDC. Phase 2 has slipped to late 2026.',
      aside: 'Use in phase 1 was light',
      today: 'Cards, QR payments and bank transfers.',
      adds: 'Vouchers and subsidies that can only be spent on a set purpose before an expiry date, planned for phase 2.',
      watch: 'Few merchants and features kept take-up low. The banks settled in central bank money on the ledger, a route the UK hasn’t chosen.',
      sources: [SRC.hangang],
    },
    {
      id: 'company-cash', title: 'Move company cash at any hour', status: 'live', statusLabel: 'Live · since 2021',
      audience: 'companies', reach: 'inside',
      summary: 'A group tops up a subsidiary on a Saturday. JPMorgan for Siemens since 2021, HSBC in six markets, Citi in seven.',
      aside: 'Inside each bank’s own network',
      today: 'Cut-off times and correspondent banking, closed at nights and weekends.',
      adds: 'Transfers at any hour between a company’s own accounts in different countries.',
      watch: 'Works within one bank’s network. Volumes are company-reported figures for whole platforms.',
      sources: [SRC.jpmAccounts, SRC.hsbcUs, SRC.citi],
    },
    {
      id: 'conditional', title: 'Pay when a condition is met', status: 'live', statusLabel: 'Live · since 2023',
      audience: 'companies', reach: 'inside',
      summary: 'JPMorgan’s programmable payments run for Siemens and, since December 2025, BMW. Company treasury, not consumer escrow.',
      aside: 'The closest live relative of GBTD’s idea',
      today: 'Treasury rules run in the company’s own systems, which then send payment instructions to the bank.',
      adds: 'Balance checks, currency conversion and transfers run end to end on the bank’s ledger, outside normal hours.',
      watch: 'Inside one bank. The conditions are the company’s own, not agreed with a stranger.',
      sources: [SRC.jpmBmw],
    },
    {
      id: 'cross-border', title: 'Pay across borders out of hours', status: 'pilot', statusLabel: 'Pilot · 2026',
      audience: 'companies', reach: 'between',
      summary: 'Between banks: Swift’s shared ledger (17 banks, including Lloyds) and BIS Project Agorá’s real-value test, with Lloyds and NatWest taking part.',
      aside: 'Programme detail: <a href="/topic/global-initiatives" data-topic="global-initiatives">Global initiatives</a>',
      today: 'Correspondent banking, closed at nights, weekends and holidays.',
      adds: 'Bank tokens move between banks at any hour, with both sides recorded on one ledger.',
      watch: 'Swift’s ledger records who owes whom. Settlement still happens in existing systems.',
      sources: [SRC.hsbcSwift, SRC.agora],
    },
    {
      id: 'grants', title: 'Pay grants or builders by stage', status: 'pilot', statusLabel: 'Pilot · Singapore · 2024',
      audience: 'companies', reach: 'inside',
      summary: 'Money released when a stage is certified or a grant condition is verified. The money used isn’t stated as tokenised deposits.',
      aside: 'Explored abroad, on one bank’s platform each',
      today: 'Stage payments by bank transfer, escrow and project bank accounts.',
      adds: 'Conditions checked by code before release, with a full audit trail.',
      watch: 'No UK pilot was found. The Singapore releases don’t say the money was tokenised deposits.',
      sources: [SRC.ocbc, SRC.dbs],
    },
    {
      id: 'repo', title: 'Borrow cash for hours against bonds', status: 'live', statusLabel: 'Live · since 2020',
      audience: 'markets', reach: 'inside',
      summary: 'Intraday repo: cash and bonds swap at the same moment. JPMorgan reports over $1.6trn since 2020, its own figure.',
      aside: 'UK: tested in the Bank’s non-live lab. Detail: <a href="/topic/deposit-tokens" data-topic="deposit-tokens">Deposit tokens</a>',
      today: 'Repo through tri-party agents and CREST, in business hours.',
      adds: 'Cash and collateral swap at the same moment, for a few hours, at any time of day.',
      watch: 'Inside one bank’s platform. The volume is JPMorgan’s own figure.',
      sources: [SRC.jpmRepo],
    },
    {
      id: 'dvp', title: 'Pay for a bond, gilt or fund on delivery', status: 'pilot', statusLabel: 'Pilot · UK · Jan 2026',
      audience: 'markets', reach: 'inside',
      summary: 'Lloyds bought a tokenised gilt with its own tokenised deposits. DIGIT and GBTD’s own bonds are planned for early 2027.',
      aside: 'DIGIT’s cash leg hasn’t been named',
      today: 'CREST settles gilts delivery versus payment in central bank money.',
      adds: 'Bond and cash move together on the same ledger, and coupons can be paid in tokenised deposits.',
      watch: 'Small so far. The UK already has several separate ledgers, including GBTD’s, Canton and HSBC Orion.',
      sources: [SRC.lloydsGilt, SRC.digit],
    },
    {
      id: 'ensemble', title: 'Pay other banks’ customers in tokens', status: 'pilot', statusLabel: 'Pilot · Hong Kong · 2025–26',
      audience: 'markets', reach: 'between',
      summary: 'EnsembleTX: bank tokens move between banks, settled 24/7 in tokenised central bank money since 2 November 2026.',
      aside: 'A central bank token on the ledger, the route the UK hasn’t taken',
      today: 'Hong Kong’s existing interbank systems, settled in central bank money.',
      adds: 'Tokens move between banks at any hour, and the banks settle in tokenised central bank money at the same time.',
      watch: 'The HKMA confirms 12 banks but not how many transact this way. No values are published beyond the first transfers.',
      sources: [SRC.hkma],
    },
  ],
  emptyNotes: [
    { status: 'live', audience: 'people', text: 'Nothing live for people was found anywhere. GBTD’s remortgages and Korea’s Hangang are pilots.' },
  ],
  footnote: 'Status as publicly reported at 12 Nov 2026. Left out for lack of a credible source: payroll, insurance payouts, rental deposits and trade finance. AI-agent payments rest on one test-network trial and are left out as speculation.',
};
