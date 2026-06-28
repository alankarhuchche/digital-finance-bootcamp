import type {
  StackLayer,
  ScatterSpec,
  FlowSpec,
  MatrixSpec,
  TimelineSpec,
  RegionMapSpec,
  CaseStudySpec,
} from '../types';

export const dummyStack: StackLayer[] = [
  { id: 'reg', number: '01', label: 'Regulation', colorClass: 's1', detail: "Decides who's even allowed to issue or offer anything below this line.", examples: 'MiCA (EU) · GENIUS Act (US) · FCA regime (UK)' },
  { id: 'defi', number: '02', label: 'DeFi', colorClass: 's2', detail: 'The shadow-banking layer — lending, trading, derivatives, all running as code.', examples: 'Aave · Compound · perp DEXs' },
  { id: 'access', number: '03', label: 'Access', colorClass: 's3', detail: 'How you reach any of this — custodial exchange, or self-custody and DEX.', examples: 'Binance/Coinbase · Uniswap/Curve' },
  { id: 'assets', number: '04', label: 'Asset classes', colorClass: 's4', detail: 'What actually moves on the rails.', examples: 'USDT · USDC · digital pound · BUIDL' },
  { id: 'rails', number: '05', label: 'Base rails', colorClass: 's5', detail: 'The ledgers everything else sits on top of.', examples: 'Ethereum · Solana · Corda · Canton' },
];

export const dummyScatter: ScatterSpec = {
  axisX: '← ISSUER BEARS RISK     YOU BEAR THE RISK →',
  axisY: 'yield to you',
  points: [
    { key: 'cash', label: 'Cash', x: 70, y: 5, color: '#E8A33D', detail: { tag: 'Physical', title: 'Cash', fields: [{ k: 'Issuer', v: 'Central bank' }, { k: 'Backing', v: 'Sovereign promise' }] } },
    { key: 'deposit', label: 'Deposit', x: 55, y: 30, color: '#7AA7D9', detail: { tag: 'Everyday', title: 'Bank deposit', fields: [{ k: 'Issuer', v: 'Commercial bank' }, { k: 'Backing', v: 'Loans/assets' }] } },
    { key: 'cbdc', label: 'CBDC', x: 60, y: 75, color: '#5FB3A3', detail: { tag: 'Sovereign digital', title: 'CBDC', fields: [{ k: 'Issuer', v: 'Central bank' }, { k: 'Backing', v: 'Sovereign promise' }] } },
    { key: 'stable', label: 'Stablecoin', x: 15, y: 10, color: '#E0726B', detail: { tag: 'Private crypto', title: 'Stablecoin', fields: [{ k: 'Issuer', v: 'Private company' }, { k: 'Backing', v: 'T-bills/cash' }] } },
  ],
};

export const dummyFlow: FlowSpec = {
  viewBox: '0 0 320 200',
  boxes: [
    { id: 'in', x: 10, y: 10, w: 110, h: 44, caption: 'YOU SEND', value: '$1' },
    { id: 'out', x: 200, y: 10, w: 110, h: 44, caption: 'YOU RECEIVE', value: '1 USDT' },
    { id: 'reserve', x: 105, y: 95, w: 110, h: 44, caption: 'RESERVE BUYS', value: 'T-BILL', valueColor: '#7AA7D9' },
  ],
  paths: [
    { d: 'M65,54 L65,117 L150,117', animated: true, dotColor: '#E8A33D' },
    { d: 'M255,54 L255,117 L215,117' },
  ],
  caption: 'The dollar in, and the reserve it buys — yield routing comes in the next box (Phase 2C content).',
};

export const dummyMatrix: MatrixSpec = {
  columns: ['Issuer', 'Backing', 'Your claim'],
  items: [
    { id: 'usdt', label: 'USDT', color: '#E0726B', values: ['Tether Ltd.', 'T-bills/cash', 'Unsecured'] },
    { id: 'usdc', label: 'USDC', color: '#5FB3A3', values: ['Circle', 'T-bills/cash', 'Unsecured'] },
    { id: 'dai', label: 'DAI', color: '#C792E8', values: ['MakerDAO/Sky', 'Crypto collateral', 'Protocol-governed'] },
  ],
};

export const dummyTimeline: TimelineSpec = {
  events: [
    { date: 'Jun 2024', title: 'Stablecoin rules enforceable', detail: 'MiCA Title V stablecoin issuer rules take effect.', status: 'done' },
    { date: 'Dec 2024', title: 'CASP licensing rules', detail: 'Exchange/venue licensing requirements take effect.', status: 'done' },
    { date: 'Jul 2026', title: 'Transition period ends', detail: 'No grandfathering left — full enforcement EU-wide.', status: 'deadline' },
  ],
};

// Sourced from the Atlantic Council CBDC Tracker (accessed Jun 2026) and recent
// reporting — this is still Phase 2B showcase data, but kept genuinely accurate
// since "data as of" discipline matters even before Phase 2C's full authoring pass.
//
// TO ADD A COUNTRY LATER: just append an entry to `initiatives` below.
//   - `country` must exactly match a name in src/data/worldMap.generated.ts
//     (regenerate that file via `node scripts/generate-map.mjs` if you need to
//     check spelling — it's the Natural Earth dataset's naming, e.g.
//     "United States of America", not "USA" or "US").
//   - If it's not a real country (e.g. "Eurozone", a currency union, a
//     multi-territory project), give it a manual `coords: [x, y]` override —
//     any nearby real country's centroid from worldMap.generated.ts works as
//     a reasonable placement.
//   - No other file needs to change — the map, legend, and detail panel all
//     render off whatever's in this array.
export const dummyRegionMap: RegionMapSpec = {
  initiatives: [
    // Live
    { country: 'Bahamas', region: 'Americas', status: 'live', name: 'Sand Dollar (since 2020)' },
    { country: 'Jamaica', region: 'Americas', status: 'live', name: 'JAM-DEX' },
    { country: 'Nigeria', region: 'Middle East & Africa', status: 'live', name: 'eNaira (since 2021)' },
    // Pilot
    { country: 'China', region: 'Asia-Pacific', status: 'pilot', name: 'e-CNY — reclassified as deposit liability, Jan 2026' },
    { country: 'India', region: 'Asia-Pacific', status: 'pilot', name: 'e-Rupee (Digital Rupee)' },
    { country: 'Brazil', region: 'Americas', status: 'pilot', name: 'Drex — wholesale tokenized credit' },
    { country: 'Russia', region: 'Europe', status: 'pilot', name: 'Digital ruble' },
    { country: 'South Korea', region: 'Asia-Pacific', status: 'pilot', name: 'Hangang Project' },
    { country: 'Ghana', region: 'Middle East & Africa', status: 'pilot', name: 'eCedi' },
    { country: 'Eurozone', region: 'Europe', status: 'pilot', name: 'Digital euro — decision phase, 2026', coords: [463.5, 175] },
    // Research
    { country: 'United Kingdom', region: 'Europe', status: 'research', name: 'Digital pound (Lab) — no decision to build taken' },
    { country: 'Sweden', region: 'Europe', status: 'research', name: 'e-krona' },
    { country: 'Japan', region: 'Asia-Pacific', status: 'research', name: 'Digital yen' },
    // Deprioritized / none for retail (kept honest rather than omitted)
    { country: 'Australia', region: 'Asia-Pacific', status: 'none', name: 'Retail deprioritized — wholesale research continues' },
    { country: 'United States of America', region: 'Americas', status: 'none', name: 'Retail CBDC banned under GENIUS Act (2025) — wholesale research via Project Agorá continues' },
  ],
  crossBorderProjects: [
    { name: 'mBridge', description: 'Multi-CBDC wholesale cross-border settlement platform — the fastest-growing CBDC project globally; e-CNY makes up the large majority of settlement volume.', participants: 'BIS + multiple central banks (China, Hong Kong, Thailand, UAE, Saudi Arabia and others)' },
    { name: 'Project Agorá', description: 'Wholesale cross-border tokenization research led by the BIS and New York Fed, the main channel for continued US involvement despite the retail CBDC ban.', participants: 'BIS + 7 major central banks' },
    { name: 'RLN (formerly GBTD)', description: 'Shared ledger testing tokenized deposits across banks — the private-sector wholesale alternative to a central-bank-issued token.', participants: 'BNY, Citi, HSBC, Mastercard, Visa, Wells Fargo' },
  ],
};

export const dummyCaseStudy: CaseStudySpec = {
  title: 'Terra/UST collapse',
  dateRange: 'May 2022',
  whatHappened: 'An algorithmic stablecoin without real asset backing lost its peg and went to near-zero within days, wiping out roughly $40bn in value.',
  whyItMatters: 'It is the clearest real-world example of the difference between an asset-backed peg and an algorithmic one — backing quality, not just the existence of a "stabilization mechanism," is what determines survivability under stress.',
  source: 'Placeholder — Phase 2C will cite a verified primary source',
  verifiedAsOf: 'TBC in Phase 2C',
};
