import type { ModuleMeta, ModuleContent } from './types';

export const MODULE_INDEX: ModuleMeta[] = [
  { id: 'payments-fundamentals', number: '18', title: 'Payments fundamentals', summary: 'How money actually moves when you tap your card — the four-party model, interchange, and settlement.', ready: true, updatedAt: '2026-07-03', changeType: 'updated', changeSummary: 'Opening prose and section heading sharpened.' },
  { id: 'existing-rails', number: '01', title: 'The existing rails', summary: 'SWIFT, RTGS, correspondent banking — the cross-border baseline everything else responds to.', ready: true },
  { id: 'forms-of-money', number: '02', title: 'Forms of money', summary: 'Six kinds of money compared — cash, deposits, e-money, CBDC, tokenized deposits, stablecoins.', ready: true },
  { id: 'risk-benefit', number: '03', title: 'Who carries the risk', summary: 'The same instrument looks different to a customer, a bank, and a central bank.', ready: true },
  { id: 'what-actually-moves', number: '24', title: 'What actually moves?', summary: 'Messages, ledger postings, settlement assets and on-ledger tokens are not the same thing. Understanding the difference is the prerequisite for any serious discussion of DLT, stablecoins or tokenised value.', ready: true, updatedAt: '2026-07-05', changeType: 'new', changeSummary: 'New concept page with four-mode animated layer visual.'},
  { id: 'dlt-basics', number: '04', title: 'DLT & blockchain basics', summary: 'Platform choice, consensus, finality and smart-contract controls for banking practitioners.', ready: true, updatedAt: '2026-07-03', changeType: 'expanded', changeSummary: 'Added banking-focused platform comparison, decision lens and smart-contract controls matrix.' },
  { id: 'crypto-assets', number: '05', title: 'Crypto assets', summary: 'Not all crypto is trying to be money — native tokens, utility tokens, governance tokens, security tokens.', ready: true },
  { id: 'stablecoins', number: '06', title: 'Stablecoins', summary: 'Four mechanisms, four failure modes, and how the issuers actually make money.', ready: true, updatedAt: '2026-07-03', changeType: 'expanded', changeSummary: 'Linked to the new stablecoin market structure comparison.' },
  { id: 'cbdc', number: '07', title: 'CBDCs', summary: 'Retail vs wholesale, privacy design, offline capability, and the real-world pilots.', ready: true },
  { id: 'tokenization', number: '08', title: 'Tokenization', summary: 'Same asset, different ledger — tokenized deposits, bonds, and real-world assets.', ready: true },
  { id: 'deposit-tokens', number: '21', title: 'Deposit tokens', summary: 'What banks are actually building — commercial bank money on blockchain, and why it matters for settlement.', ready: true },
  { id: 'stablecoin-market-structure', number: '23', title: 'Stablecoin market structure', summary: 'How USDC, USDT, PYUSD, RLUSD and Open USD differ by issuer model, reserve economics, distribution and bank relevance.', ready: true, updatedAt: '2026-07-03', changeType: 'new', changeSummary: 'Added provider, reserve and governance comparison including Open USD.' },
  { id: 'defi', number: '09', title: 'DeFi', summary: 'Lending, AMMs, derivatives — finance rebuilt as code, with composability as both strength and risk.', ready: true, updatedAt: '2026-07-03', changeType: 'updated', changeSummary: 'Opening section and stack note rewritten for clarity.' },
  { id: 'market-sizing', number: '10', title: 'Market sizing', summary: 'How big is this actually? Old money vs new money, by the real numbers.', ready: true },
  { id: 'global-initiatives', number: '11', title: 'Global initiatives', summary: 'Who is building what, where — the country-by-country map of CBDC and wholesale projects.', ready: true },
  { id: 'market-structure', number: '12', title: 'Market structure', summary: 'CEX vs DEX, custody, prime brokerage, OTC desks, and liquidity fragmentation.', ready: true, updatedAt: '2026-07-03', changeType: 'updated', changeSummary: 'CEX and DEX expanded on first use; custody paragraph restructured.' },
  { id: 'settlement', number: '13', title: 'Settlement & infrastructure', summary: 'DvP, atomic settlement, Herstatt risk — the hardest unsolved problem in digital finance.', ready: true },
  { id: 'digital-identity', number: '19', title: 'Digital identity & KYC', summary: 'The $274B compliance layer — how identity verification works and what blockchain could change.', ready: true },
  { id: 'regulation', number: '14', title: 'Regulation', summary: 'MiCA, GENIUS Act, FATF Travel Rule, Basel III — the rulebooks forcing the industry to grow up.', ready: true },
  { id: 'privacy', number: '20', title: 'Privacy & data', summary: 'Why commercial confidentiality, selective disclosure and regulator visibility matter for institutions using DLT, stablecoins and tokenised assets.', ready: true, updatedAt: '2026-07-03', changeType: 'expanded', changeSummary: 'Added institutional confidentiality and selective disclosure models.' },
  { id: 'bank-strategy', number: '15', title: 'Bank strategy', summary: 'Why banks simultaneously defend deposits and offer stablecoin access — the deliberate hedge.', ready: true },
  { id: 'failure-modes', number: '16', title: 'Failure modes', summary: 'Six categories of things that break — depegs, exploits, custody fraud, bridges, oracles, rug pulls.', ready: true, updatedAt: '2026-07-03', changeType: 'updated', changeSummary: 'Industry response section closing lines sharpened.' },
  { id: 'whats-next', number: '22', title: `What's next`, summary: 'Informed views on where digital finance in payments is heading — and where this analysis could be wrong.', ready: true },
  { id: 'glossary', number: '17', title: 'Glossary', summary: 'Every term, searchable, linked back to its topic.', ready: true, updatedAt: '2026-07-03', changeType: 'updated', changeSummary: 'Term recognition and popover support improved across all topics.' },
];

const LOADERS: Record<string, () => Promise<{ default: ModuleContent }>> = {
  'payments-fundamentals': () => import('./modules/18-payments-fundamentals'),
  'existing-rails': () => import('./modules/01-existing-rails'),
  'forms-of-money': () => import('./modules/02-forms-of-money'),
  'risk-benefit': () => import('./modules/03-risk-benefit'),
  'what-actually-moves': () => import('./modules/24-what-actually-moves'),
  'dlt-basics': () => import('./modules/04-dlt-basics'),
  'crypto-assets': () => import('./modules/05-crypto-assets'),
  stablecoins: () => import('./modules/06-stablecoins'),
  cbdc: () => import('./modules/07-cbdc'),
  tokenization: () => import('./modules/08-tokenization'),
  'deposit-tokens': () => import('./modules/21-deposit-tokens'),
  'stablecoin-market-structure': () => import('./modules/23-stablecoin-market-structure'),
  defi: () => import('./modules/09-defi'),
  'market-sizing': () => import('./modules/10-market-sizing'),
  'global-initiatives': () => import('./modules/11-global-initiatives'),
  'market-structure': () => import('./modules/12-market-structure'),
  settlement: () => import('./modules/13-settlement'),
  'digital-identity': () => import('./modules/19-digital-identity'),
  regulation: () => import('./modules/14-regulation'),
  privacy: () => import('./modules/20-privacy'),
  'bank-strategy': () => import('./modules/15-bank-strategy'),
  'failure-modes': () => import('./modules/16-failure-modes'),
  'whats-next': () => import('./modules/22-whats-next'),
  glossary: () => import('./modules/17-glossary'),
};

export interface Category {
  label: string;
  ids: string[];
}

export const CATEGORIES: Category[] = [
  { label: "Today's rails", ids: ['payments-fundamentals', 'existing-rails', 'forms-of-money', 'risk-benefit'] },
  { label: 'The technology', ids: ['what-actually-moves', 'dlt-basics', 'crypto-assets'] },
  { label: 'New instruments', ids: ['stablecoins', 'cbdc', 'tokenization', 'deposit-tokens', 'stablecoin-market-structure'] },
  { label: 'Markets & scale', ids: ['defi', 'market-sizing', 'global-initiatives', 'market-structure', 'settlement'] },
  { label: 'Rules & reality', ids: ['digital-identity', 'regulation', 'privacy', 'bank-strategy', 'failure-modes'] },
  { label: 'Outlook', ids: ['whats-next'] },
  { label: 'Reference', ids: ['glossary'] },
];

export function findCategory(topicId: string): string | null {
  for (const cat of CATEGORIES) {
    if (cat.ids.includes(topicId)) return cat.label;
  }
  return null;
}

export async function loadModuleContent(id: string): Promise<ModuleContent | null> {
  const loader = LOADERS[id];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
