import type { ModuleMeta, ModuleContent } from './types';

// Metadata for the full curriculum. `ready: false` modules show as
// "coming soon" in the index and have no loader entry below yet —
// add both as each batch is authored.
export const MODULE_INDEX: ModuleMeta[] = [
  { id: 'existing-rails', number: '01', title: 'The existing rails', summary: 'SWIFT, RTGS, correspondent banking — the baseline this is all responding to.', ready: true },
  { id: 'forms-of-money', number: '02', title: 'Forms of money', summary: 'Cash, deposits, CBDC, stablecoins, tokenized deposits — one map.', ready: true },
  { id: 'risk-benefit', number: '03', title: 'Who actually carries the risk', summary: 'The same instrument looks different to a customer, a bank, and a central bank.', ready: true },
  { id: 'dlt-basics', number: '04', title: 'DLT & blockchain basics', summary: 'Ledgers, consensus, and why finality matters.', ready: true },
  { id: 'crypto-assets', number: '05', title: 'Crypto assets', summary: 'Native, utility, and governance tokens.', ready: true },
  { id: 'stablecoins', number: '06', title: 'Stablecoins deep-dive', summary: 'Three mechanics, three failure modes.', ready: true },
  { id: 'cbdc', number: '07', title: 'CBDC deep-dive', summary: 'Retail vs wholesale, and the real-world pilots.', ready: true },
  { id: 'tokenization', number: '08', title: 'Tokenization', summary: 'Tokenized deposits and tokenized real-world assets.', ready: true },
  { id: 'defi', number: '09', title: 'DeFi', summary: 'Lending, AMMs, derivatives — finance as code.', ready: true },
  { id: 'market-sizing', number: '10', title: 'Market capture & sizing', summary: 'Old money vs new money, by the actual numbers.', ready: true },
  { id: 'global-initiatives', number: '11', title: 'Global initiatives map', summary: 'Who is doing what, where, right now.', ready: true },
  { id: 'market-structure', number: '12', title: 'Market structure', summary: 'CEX vs DEX, custody, market makers.', ready: true },
  { id: 'settlement', number: '13', title: 'Settlement & infrastructure', summary: 'Wholesale settlement, DvP, atomic settlement.', ready: true },
  { id: 'regulation', number: '14', title: 'Regulation', summary: 'MiCA, GENIUS Act, FATF, Basel.', ready: true },
  { id: 'bank-strategy', number: '15', title: 'Bank strategy', summary: 'Why banks defend deposits and offer stablecoin access at once.', ready: true },
  { id: 'failure-modes', number: '16', title: 'Failure modes', summary: 'Depegs, hacks, custody and smart contract risk.', ready: true },
  { id: 'glossary', number: '17', title: 'Glossary', summary: 'Every term, searchable, linked back to its topic.', ready: true },
  { id: 'payments-fundamentals', number: '18', title: 'Payments fundamentals', summary: 'Card schemes, interchange, acquiring, and how money actually moves when you tap your phone.', ready: true },
  { id: 'digital-identity', number: '19', title: 'Digital identity & KYC', summary: 'How identity verification works, why it costs so much, and what blockchain changes.', ready: true },
  { id: 'privacy', number: '20', title: 'Privacy & data', summary: 'The elephant in every CBDC room, and why blockchain transparency cuts both ways.', ready: true },
];

// Lazy loaders — only modules that actually have content land here.
// Each batch's authoring pass adds its entries.
const LOADERS: Record<string, () => Promise<{ default: ModuleContent }>> = {
  'existing-rails': () => import('./modules/01-existing-rails'),
  'forms-of-money': () => import('./modules/02-forms-of-money'),
  'risk-benefit': () => import('./modules/03-risk-benefit'),
  'dlt-basics': () => import('./modules/04-dlt-basics'),
  'crypto-assets': () => import('./modules/05-crypto-assets'),
  stablecoins: () => import('./modules/06-stablecoins'),
  cbdc: () => import('./modules/07-cbdc'),
  tokenization: () => import('./modules/08-tokenization'),
  defi: () => import('./modules/09-defi'),
  'market-sizing': () => import('./modules/10-market-sizing'),
  'global-initiatives': () => import('./modules/11-global-initiatives'),
  'market-structure': () => import('./modules/12-market-structure'),
  settlement: () => import('./modules/13-settlement'),
  regulation: () => import('./modules/14-regulation'),
  'bank-strategy': () => import('./modules/15-bank-strategy'),
  'failure-modes': () => import('./modules/16-failure-modes'),
  glossary: () => import('./modules/17-glossary'),
  'payments-fundamentals': () => import('./modules/18-payments-fundamentals'),
  'digital-identity': () => import('./modules/19-digital-identity'),
  privacy: () => import('./modules/20-privacy'),
};

export async function loadModuleContent(id: string): Promise<ModuleContent | null> {
  const loader = LOADERS[id];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
