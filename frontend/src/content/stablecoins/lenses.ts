// lenses.ts — data for the compact scenes: the peg, the economy lens, the controls journey,
// reserve economics and the scenario checks. Every factual point names its sources.
// Pure data (plus one small pure function), shared by the page and the chat context.

import type { SourceId } from './sources.ts';

// ── Peg: why a stablecoin trades near $1, and when it doesn't ──────────────────

export interface PegInputs {
  redemption: 'open' | 'closed';
  reserves: 'trusted' | 'doubted';
  holder: 'redeemer' | 'market';
}

export interface PegOutcome {
  band: 'tight' | 'slip' | 'run' | 'deep';
  price: string;
  why: string;
  holder: string;
  sources: SourceId[];
}

export function pegOutcome(i: PegInputs): PegOutcome {
  const holder = i.holder === 'redeemer'
    ? 'You can return tokens to the issuer for $1 each, less any fee, once redemption is open and on the issuer’s terms.'
    : 'You get the market price. Par redemption protects only holders who can use it, directly or through someone who can. Most people sell on an exchange.';
  if (i.redemption === 'open' && i.reserves === 'trusted') return {
    band: 'tight', price: 'Very close to $1.00', holder, sources: ['circleTerms', 'tetherFees'],
    why: 'Holders who can redeem get $1 from the issuer, and new tokens are issued for $1. If the market price dips, they buy below $1 and redeem at $1. If it rises, they mint at $1 and sell. That trade holds the price.',
  };
  if (i.redemption === 'closed' && i.reserves === 'trusted') return {
    band: 'slip', price: 'Can slip a little below $1', holder, sources: ['circleMint'],
    why: 'With redemption shut, at a weekend, on a bank holiday or during an issuer pause, the arbitrage can’t complete. Small discounts can open and stay until redemption reopens.',
  };
  if (i.redemption === 'open' && i.reserves === 'doubted') return {
    band: 'run', price: 'A discount, for as long as doubt lasts', holder, sources: ['svbUsdc'],
    why: 'Holders who can redeem rush to, and others sell. If the reserves are really there and redemption works, the price comes back. In March 2023, with $3.3bn of USDC’s reserves at the failed Silicon Valley Bank, USDC fell to about $0.88 and recovered once US authorities protected SVB’s depositors.',
  };
  return {
    band: 'deep', price: 'The deepest discount', holder, sources: ['svbUsdc', 'secTerra'],
    why: 'No way to redeem and fear of loss together. The SVB episode ran over a weekend, when some exchanges paused conversion. Where nothing real backs the coin at all, as with the algorithmic TerraUSD in May 2022, there is no $1 to arbitrage towards.',
  };
}

// ── Economy lens: who gains and who pays when dollar stablecoins spread ────────

export type Perspective = 'holder' | 'bank' | 'central-bank' | 'issuer';
export type Economy = 'em' | 'uk';
/** 'rule' = law or rules in force; 'policy' = final policy, draft rules, expectations or law not yet in force. */
export type PointBasis = 'measured' | 'mechanism' | 'scenario' | 'rule' | 'policy';

export interface LensPoint { text: string; basis: PointBasis; sources: SourceId[] }
export interface LensCell { gains: LensPoint[]; costs: LensPoint[] }

export const PERSPECTIVE_LABEL: Record<Perspective, string> = {
  holder: 'Household or firm', bank: 'Local bank', 'central-bank': 'Central bank', issuer: 'US issuer',
};
export const ECONOMY_LABEL: Record<Economy, string> = {
  em: 'Economy with an unstable currency', uk: 'The UK',
};

export const LENS: Record<Economy, Record<Perspective, LensCell>> = {
  em: {
    holder: {
      gains: [
        { text: 'Round-the-clock access to dollars without a US bank account.', basis: 'mechanism', sources: ['bisAer2026', 'imfKatz'] },
        { text: 'Some corridors are cheaper: the IMF found about 2% for a USD 200 stablecoin transfer with the cheapest ramps and 3% with typical ones, against 6.2% on average across traditional providers and 3.0% for the cheapest three.', basis: 'measured', sources: ['imfWp230', 'fsb2026'] },
      ],
      costs: [
        { text: 'No interest from the issuer: banned under MiCA now and under the GENIUS Act from January 2027. The issuer keeps the yield on the reserves.', basis: 'rule', sources: ['mica', 'genius'] },
        { text: 'In about a third of comparable corridors the cheapest traditional provider was cheaper.', basis: 'measured', sources: ['imfWp230'] },
        { text: 'No deposit protection, exposure to the issuer and to freezes, and local legal uncertainty.', basis: 'mechanism', sources: ['fatf2026'] },
      ],
    },
    bank: {
      gains: [
        { text: 'Can earn fees by offering access, custody or payouts.', basis: 'mechanism', sources: ['bisAer2026'] },
      ],
      costs: [
        { text: 'Dollar deposits that fund lending can move out into stablecoins, tightening domestic credit.', basis: 'mechanism', sources: ['imfKatz', 'bisAer2026'] },
        { text: 'Measured so far: the IMF found no clear disintermediation in El Salvador. That country already uses the dollar, so it is a weak test.', basis: 'measured', sources: ['imfKatz'] },
        { text: 'One bank’s research puts possible emerging-market deposit outflows at about USD 1tn by 2028. That is a scenario, not a measurement.', basis: 'scenario', sources: ['stanChart'] },
      ],
    },
    'central-bank': {
      gains: [
        { text: 'Remittances can arrive faster and cheaper in some corridors.', basis: 'measured', sources: ['imfWp230'] },
      ],
      costs: [
        { text: 'Faster dollarisation, weaker monetary-policy transmission, and capital controls that are "likely to be imperfect".', basis: 'mechanism', sources: ['bisAer2026', 'imfKatz'] },
        { text: 'Flows are hard to see: no single jurisdiction can assess global stablecoin arrangements fully.', basis: 'mechanism', sources: ['fsbStablecoin'] },
      ],
    },
    issuer: {
      gains: [
        { text: 'Reserve income on Treasury bills, with no interest to pay holders.', basis: 'mechanism', sources: ['circleQ3', 'genius'] },
        { text: 'Inflows push down short-dated Treasury yields slightly: about 4 basis points within 10 days for a USD 3.5bn inflow.', basis: 'measured', sources: ['bisWp1270'] },
      ],
      costs: [
        { text: 'Expected to be able to freeze, block and report on request, in every jurisdiction where its tokens circulate.', basis: 'policy', sources: ['fatf2026'] },
        { text: 'Exposure to sanctions and illicit-finance enforcement in markets it doesn’t control.', basis: 'mechanism', sources: ['ofsi'] },
      ],
    },
  },
  uk: {
    holder: {
      gains: [
        { text: 'Little gain for ordinary sterling payments: Faster Payments already settles in seconds, 24/7.', basis: 'measured', sources: ['fsb2026'] },
        { text: 'Dollar exposure and crypto-market access for those who want them.', basis: 'mechanism', sources: ['defillama'] },
      ],
      costs: [
        { text: 'No deposit protection. The UK stablecoin regime does not apply until 25 October 2027.', basis: 'policy', sources: ['ukSi102', 'fcaRegime'] },
      ],
    },
    bank: {
      gains: [
        { text: 'Custody, distribution and tokenised-deposit services for clients.', basis: 'mechanism', sources: ['praLetter'] },
      ],
      costs: [
        { text: 'Deposits that leave reduce lending capacity. That is why the Bank of England plans to cap each systemic sterling stablecoin at £40bn to start.', basis: 'policy', sources: ['boePs', 'boeNews'] },
        { text: 'The PRA expects a bank to issue stablecoins only from a separate, insolvency-remote, distinctly branded entity.', basis: 'policy', sources: ['praLetter'] },
      ],
    },
    'central-bank': {
      gains: [
        { text: 'A regulated sterling stablecoin could serve tokenised markets, such as settlement in the Digital Securities Sandbox.', basis: 'policy', sources: ['fcaRegime'] },
      ],
      costs: [
        { text: 'Credit supply during the transition. Hence a planned temporary £40bn guardrail and 70/30 backing in short gilts and Bank of England deposits.', basis: 'policy', sources: ['boePs'] },
      ],
    },
    issuer: {
      gains: [
        { text: 'Yield on up to 70% of backing held in short-dated gilts, and up to 95% while scaling.', basis: 'policy', sources: ['boePs'] },
      ],
      costs: [
        { text: '30% of backing in unremunerated Bank of England deposits, no interest to holders, and a £40bn issuance cap.', basis: 'policy', sources: ['boePs'] },
        { text: 'Redemption at par: within 24 hours for systemic coins, and T+1 after checks under the FCA rules.', basis: 'policy', sources: ['boePs', 'fcaRegime'] },
      ],
    },
  },
};

// ── Controls journey: pre-execution, execution, post-transaction ───────────────

export interface Control { name: string; catches: string; misses: string; who: string }
export interface ControlPhase { id: 'before' | 'during' | 'after'; label: string; controls: Control[] }

export const CONTROL_PHASES: ControlPhase[] = [
  { id: 'before', label: 'Before sending', controls: [
    { name: 'Know the customer and the payment', catches: 'Named sanctioned or unknown parties; a business reason that doesn’t add up.', misses: 'Who actually controls the destination address.', who: 'Bank or provider' },
    { name: 'Attribute and screen the address', catches: 'Listed addresses and exposure to sanctioned, mixer, theft or scam clusters, at least 3–5 hops back.', misses: 'New addresses, clusters not yet labelled, cross-chain hops.', who: 'Analytics data; the bank decides' },
    { name: 'Exchange Travel Rule data', catches: 'Missing or mismatched names when the other side is a crypto business.', misses: 'Unhosted wallets, and counterparties where the rule isn’t enforced.', who: 'Sending and receiving providers' },
    { name: 'Confirm the address another way', catches: 'Lookalike addresses and invoice redirection.', misses: 'A compromised approval process.', who: 'Bank with the client' },
  ] },
  { id: 'during', label: 'At release', controls: [
    { name: 'Rescreen at release', catches: 'Listings added since onboarding.', misses: 'Labels that arrive after the transaction is broadcast.', who: 'Bank or provider' },
    { name: 'Signing controls', catches: 'Unauthorised or altered withdrawals.', misses: 'Compromised devices or people around the keys.', who: 'Custody function' },
    { name: 'Issuer blocking', catches: 'Transfers to or from addresses the issuer has already frozen.', misses: 'Addresses not yet frozen, and value already swapped into other assets.', who: 'Issuer' },
  ] },
  { id: 'after', label: 'After sending', controls: [
    { name: 'Monitor and look back', catches: 'Later attribution and onward flows to risky services.', misses: 'Cash-outs through informal desks. Often the funds have gone.', who: 'Bank or provider' },
    { name: 'Report', catches: 'Produces the intelligence behind freezes: SARs to the NCA, reports to OFSI.', misses: 'Doesn’t stop movement itself.', who: 'Bank; NCA, OFSI' },
    { name: 'Freeze and seize', catches: 'Tokens still sitting in identified wallets.', misses: 'Value already swapped, bridged or used as collateral.', who: 'Issuer and law enforcement' },
  ] },
];

export type WalletCase = 'hosted' | 'unhosted-clean' | 'new' | 'sanctions' | 'fraud';

export interface WalletAssessment {
  label: string;
  verdict: string;
  tone: 'done' | 'waits' | 'held' | 'blocked';
  canInfer: string[];
  cannotInfer: string[];
  steps: string[];
  sources: SourceId[];
}

const CANNOT_ALWAYS = [
  'Who controls the key, or on whose behalf.',
  'That today’s “low risk” score is right. Labels are probabilistic and often added late.',
];

export const WALLET_CASES: Record<WalletCase, WalletAssessment> = {
  hosted: {
    label: 'Wallet at a licensed exchange', verdict: 'Proceed with documented checks', tone: 'done',
    canInfer: ['Which exchange holds it, and in which country.', 'Whether that exchange can exchange Travel Rule data.'],
    cannotInfer: CANNOT_ALWAYS,
    steps: ['Send Travel Rule data with the transfer (in the UK, full originator data at or above £800).', 'Screen the supplier’s name and the exchange.', 'Keep the evidence.'],
    sources: ['ukTravelRule', 'ukSi621', 'fcaTravelRule'],
  },
  'unhosted-clean': {
    label: 'Self-custody wallet, long clean history', verdict: 'Defensible with purpose, address confirmation and monitoring', tone: 'waits',
    canInfer: ['When the address was first funded, and who it has dealt with.', 'Whether analytics link it to known services.'],
    cannotInfer: CANNOT_ALWAYS,
    steps: ['Ask the client for the supplier’s identity, contract and reason for using this address.', 'If the bank sends from its own custody and asks for Travel Rule information it doesn’t get, it must not make the transfer.', 'Confirm the address with a known contact through a separate channel.', 'At higher values, ask for proof of control: a signed message or a small test transfer. It proves control of a key, not who owns the business.'],
    sources: ['jmlsg', 'ukTravelRule'],
  },
  new: {
    label: 'Newly created wallet', verdict: 'Hold: enhanced checks and a staged payment before release', tone: 'held',
    canInfer: ['That there is no history. That is not evidence either way.'],
    cannotInfer: ['Anything about its owner or purpose.', ...CANNOT_ALWAYS],
    steps: ['Treat a large first transfer to a new wallet as a red flag, as OFSI does.', 'Get proof of control and confirm the address through a known contact. Requested information that never arrives means no transfer.', 'Send a test amount first, apply limits, and monitor afterwards.'],
    sources: ['ofsi', 'jmlsg'],
  },
  sanctions: {
    label: 'Analytics flag: sanctions exposure', verdict: 'Stop. Don’t pay; report', tone: 'blocked',
    canInfer: ['Direct or indirect exposure to listed addresses within the hops screened.'],
    cannotInfer: ['Whether indirect exposure means the supplier is a designated person. That needs analysis of the path.'],
    steps: ['If the address is listed or reasonably suspected to be controlled by a designated person, do not make the payment.', 'Freeze related assets the bank holds and report to OFSI. File a SAR with the NCA where laundering is suspected.', 'Record the attribution reasoning either way.'],
    sources: ['ofsi', 'ukA7', 'ofacA7'],
  },
  fraud: {
    label: 'Analytics flag: scam or mule exposure, or details recently changed', verdict: 'Stop and verify: treat it as possible invoice redirection', tone: 'blocked',
    canInfer: ['Exposure to known scam clusters, or a pattern typical of mule accounts.'],
    cannotInfer: ['Whether the real supplier changed its details or someone is impersonating it.'],
    steps: ['Stop and verify with the supplier through known contacts, not those on the invoice.', 'Consider a SAR. If paying would itself be a money-laundering offence, ask the NCA for consent and wait.', 'Don’t rely on the issuer to freeze it later: freezes miss value that has already moved.'],
    sources: ['usenixPoisoning', 'poca', 'fatf2026', 'ellipticBinance'],
  },
};

// ── Reserve economics: who owes the holder, and who earns the money ────────────

export type ReserveModelId = 'single' | 'network' | 'bank-coin' | 'deposit-token';

export interface ReserveModel {
  id: ReserveModelId;
  label: string;
  examples: string;
  owes: string;
  backing: string;
  earns: string;
  holderGets: string;
  redeem: string;
  reach: string;
  sources: SourceId[];
}

export const RESERVE_MODELS: ReserveModel[] = [
  {
    id: 'single', label: 'Single issuer', examples: 'USDC (Circle in the US, its French e-money subsidiary in the EU), USDT (Tether), PYUSD (Paxos, for PayPal), RLUSD (Ripple)',
    owes: 'The issuing company, or its entity for the holder’s region. Distributors and exchanges owe the holder nothing on the token.',
    backing: 'Reserves held for holders: Treasury bills, repo, money-market funds and cash. Tether also reports gold and bitcoin.',
    earns: 'The issuer, minus what it pays distributors. In Q3 2026 Circle earned $658m of reserve income and paid $409m in distribution and transaction costs.',
    holderGets: 'No interest from the issuer. Some platforms pay rewards from their own share, which is the open question in the US.',
    redeem: 'Onboarded customers, directly. Tether: $100,000 minimum and a fee of the greater of $1,000 or 0.1%. Everyone else sells in the market.',
    reach: 'Any wallet on any supported chain, subject to freezes.',
    sources: ['circleQ3', 'circleCoinbase', 'tetherFees', 'paxosPyusd', 'circleTerms'],
  },
  {
    id: 'network', label: 'Revenue-sharing network', examples: 'USDG on the Global Dollar Network (issued by Paxos); Open USD (issued by Bridge, part of Stripe; live since 30 Sep 2026)',
    owes: 'The issuer (Paxos or Bridge), not the partners who distribute it.',
    backing: 'Reserves held by the issuer for holders.',
    earns: 'Shared with distributors. Paxos offers partners up to 100% of the returns on USDG held on their platforms. Open USD says partners earn rewards in proportion to the supply they drive, but no payouts or fees have been published.',
    holderGets: 'No interest from the issuer. Partners may pass rewards on.',
    redeem: 'Through the issuer and onboarded partners.',
    reach: 'Wherever partners distribute it. Open USD’s supply was about $961m on 17 November 2026.',
    sources: ['gdn', 'paxosUsdg', 'bridgeOusd', 'openStandard', 'defillama'],
  },
  {
    id: 'bank-coin', label: 'Bank-issued stablecoin', examples: 'EURCV and USDCV (SG-FORGE, a Société Générale subsidiary; e-money tokens under MiCA); SoFiUSD (issued by SoFi Bank itself)',
    owes: 'The issuing bank or bank subsidiary, against segregated reserves rather than its deposit book. In the UK the PRA expects a separate, insolvency-remote, distinctly branded entity.',
    backing: 'Segregated reserves, not the bank’s loan book.',
    earns: 'The banking group keeps the reserve income.',
    holderGets: 'No interest under MiCA, GENIUS or the UK rules.',
    redeem: 'At par, on the regime’s terms. MiCA: at any time.',
    reach: 'Any wallet on supported chains, like any stablecoin.',
    sources: ['praLetter', 'mica', 'sofi'],
  },
  {
    id: 'deposit-token', label: 'Tokenised deposit', examples: 'JPM Coin (JPMorgan Kinexys), Citi Token Services, HSBC Tokenised Deposit Service, the UK GBTD pilots',
    owes: 'The bank itself. It is the bank’s ordinary deposit liability, recorded as a token.',
    backing: 'The bank’s balance sheet, capital and liquidity, with deposit protection where the holder is eligible.',
    earns: 'The bank, as with any deposit: it lends against it. It may pay interest.',
    holderGets: 'What any depositor gets, including interest if the bank pays it.',
    redeem: 'It is already the bank’s money. Moving it out is an ordinary payment.',
    reach: 'Clients of that bank or of the banks on the shared network.',
    sources: ['jpmCoin', 'citiToken', 'hsbcTds', 'praLetter'],
  },
];

export const RESERVE_ROWS: { key: keyof Omit<ReserveModel, 'id' | 'label' | 'sources'>; label: string }[] = [
  { key: 'examples', label: 'Examples' },
  { key: 'owes', label: 'Who owes the holder' },
  { key: 'backing', label: 'What backs it' },
  { key: 'earns', label: 'Who earns the income' },
  { key: 'holderGets', label: 'What the holder gets' },
  { key: 'redeem', label: 'Who can redeem, and how' },
  { key: 'reach', label: 'Reach' },
];

// ── Scenario checks: new situations, with feedback on every option ─────────────

export interface CheckOption { text: string; feedback: string }
export interface ScenarioCheck {
  id: string;
  level: 'Newcomer' | 'Practitioner' | 'Bank leader';
  situation: string;
  question: string;
  options: CheckOption[];
  correct: number;
  chapter: string;
}

export const CHECKS: ScenarioCheck[] = [
  {
    id: 'peg', level: 'Newcomer', chapter: 'ch-claim',
    situation: 'On a Saturday your dollar stablecoin trades at $0.97 on an exchange. The issuer says reserves are complete, and redemption with the issuer reopens on Monday.',
    question: 'What is the most likely explanation?',
    options: [
      { text: 'The coin has permanently lost 3%.', feedback: 'Not necessarily. A small discount while redemption is shut is a timing problem if the reserves are there.' },
      { text: 'Arbitrage can’t run until redemption reopens, so a small discount can persist. If reserves are really there, redeemers close the gap.', feedback: 'Yes. The peg is held by people who can redeem at $1. Shut that door and small gaps can stay open.' },
      { text: 'The issuer owes you $1 today, wherever you hold it.', feedback: 'Only on the issuer’s terms, and usually only to onboarded customers. Most holders get the market price.' },
      { text: 'The blockchain has stopped working.', feedback: 'The chain can work perfectly while the price drifts. The peg depends on reserves and redemption, not on the ledger.' },
    ],
    correct: 1,
  },
  {
    id: 'paid', level: 'Newcomer', chapter: 'ch-follow',
    situation: 'A token lands in a supplier’s wallet five seconds after a UK business presses send.',
    question: 'Has the supplier been paid?',
    options: [
      { text: 'Yes, always. The transfer is final on-chain.', feedback: 'Final on-chain, yes. Paid depends on what the supplier asked for.' },
      { text: 'Only if dollar tokens are what the supplier wanted. If it needs local currency in its bank, it isn’t paid until an off-ramp pays out.', feedback: 'Right. “Paid” means the payee holds what it needs. The token can be the whole payment or one leg of it.' },
      { text: 'No, never. Stablecoins aren’t money.', feedback: 'Too strong. A supplier that wants dollar tokens is paid when they arrive.' },
      { text: 'Only after the issuer confirms it.', feedback: 'The issuer doesn’t confirm ordinary transfers. The question is whether the payee holds what it needs.' },
    ],
    correct: 1,
  },
  {
    id: 'india', level: 'Practitioner', chapter: 'ch-routes',
    situation: 'A UK business must pay an invoice to a supplier in India. The supplier has a bank account and no stablecoin wallet.',
    question: 'What should the business’s bank recommend?',
    options: [
      { text: 'Send dollar stablecoins to an address the supplier can set up later.', feedback: 'That fails the objective. The supplier would have to open a wallet, convert and withdraw, at its own cost and legal risk.' },
      { text: 'A fiat payout route: a bank transfer, a payment firm, or a stablecoin provider only if it has a licensed partner that can lawfully pay rupees into the account. Check that, don’t assume it.', feedback: 'Yes. The route must end in the supplier’s bank account, and reachability and local rules for crypto-routed payments must be checked, not assumed.' },
      { text: 'Nothing works: stablecoins are banned there.', feedback: 'Don’t assume either way. This page makes no claim about India’s rules. It says to check them for the specific flow and partner.' },
      { text: 'Use a bridge to reach the supplier’s bank.', feedback: 'A bridge moves tokens between blockchains. It can’t reach a bank account.' },
    ],
    correct: 1,
  },
  {
    id: 'chains', level: 'Practitioner', chapter: 'ch-chains',
    situation: 'A bank burned 100,000 USDC on Chain A using the issuer’s burn-and-mint protocol. The burn is final, but the mint on Chain B failed during congestion.',
    question: 'What is safe to do?',
    options: [
      { text: 'Burn another 100,000 to be sure the recipient is paid.', feedback: 'That would put 200,000 into motion for a 100,000 payment. A second burn is a second transfer.' },
      { text: 'Resubmit the same signed message on Chain B. It can mint only once.', feedback: 'Yes. Each message has a one-time identifier, so a retry can’t pay twice. Keep the 100,000 in transit on the books until Chain B is final.' },
      { text: 'Mark the payment complete and investigate later.', feedback: 'Not before destination finality. Until then the books should show it in transit.' },
      { text: 'Ask the recipient to send it back.', feedback: 'Nothing reached the recipient. The value is burned and waiting to be minted.' },
    ],
    correct: 1,
  },
  {
    id: 'deadline', level: 'Practitioner', chapter: 'ch-liquidity',
    situation: 'A supplier must have local currency in its bank account by Sunday evening. The tokens reached the off-ramp partner on Saturday, but the issuer’s redemption window is closed until Monday.',
    question: 'Which statement is right?',
    options: [
      { text: 'The token transfer settled the payment, so the deadline is met.', feedback: 'Token settlement isn’t the payout. The supplier holds nothing yet.' },
      { text: 'The partner can still pay from local currency it already holds, sell the tokens to a market maker at a spread, or draw on credit. Otherwise the payout waits for Monday.', feedback: 'Yes. Prefunding, market makers and credit are the levers. Each has a cost: money parked, a spread, or borrowing.' },
      { text: 'Ask the issuer to redeem on Sunday.', feedback: 'Redemption follows the issuer’s banking hours. Wanting it doesn’t open them.' },
      { text: 'Send more tokens.', feedback: 'More tokens don’t create local currency. The bottleneck is cash at the payout end.' },
    ],
    correct: 1,
  },
  {
    id: 'wallet', level: 'Practitioner', chapter: 'ch-controls',
    situation: 'A long-standing corporate client asks its UK bank to pay a supplier in stablecoins. The destination wallet was created yesterday, and analytics score it “low risk”.',
    question: 'What should the bank do?',
    options: [
      { text: 'Pay: the score says low risk.', feedback: 'A new wallet scores low because there is no history. Absence of evidence isn’t evidence.' },
      { text: 'Treat a large first transfer to a new wallet as a red flag: confirm the address through a known contact, get proof of control, stage the payment and keep records. Stop and report if sanctions links appear.', feedback: 'Yes. Proportionate, documented checks, with escalation if anything is found.' },
      { text: 'Refuse: UK law bans paying self-custody wallets.', feedback: 'It doesn’t. The UK approach is risk-based. The EU requires an ownership check above €1,000.' },
      { text: 'Pay, and rely on the issuer to freeze the tokens if it goes wrong.', feedback: 'Freezes are not a backstop. In the October 2026 Binance theft, hundreds of millions moved before issuers froze the rest.' },
    ],
    correct: 1,
  },
  {
    id: 'dollarisation', level: 'Bank leader', chapter: 'ch-economy',
    situation: 'In a country with high inflation, households move savings from local bank deposits into dollar stablecoins.',
    question: 'Which statement is best supported?',
    options: [
      { text: 'Everyone gains: households get dollars and nothing else changes.', feedback: 'The deposits that leave were funding local lending.' },
      { text: 'Households gain dollar access. Banks lose deposits that fund lending, and monetary policy may weaken. These are mechanisms; measured effects so far are small, and the large numbers are scenarios.', feedback: 'Yes, and keep the labels: mechanism, measured or scenario. In the UK the same worry is why the Bank of England caps systemic sterling coins.' },
      { text: 'It has no effect on banks, because stablecoin reserves sit in banks.', feedback: 'Mostly they sit in US Treasury bills and money-market funds, not in the local banking system.' },
      { text: 'It is illegal everywhere.', feedback: 'Rules differ by country. Capital controls may be circumvented, which is part of the concern.' },
    ],
    correct: 1,
  },
  {
    id: 'liability', level: 'Bank leader', chapter: 'ch-economics',
    situation: 'A bank’s strategy paper treats four instruments as interchangeable: a single-issuer stablecoin, a coin on a revenue-sharing network, a stablecoin from the bank’s own separate subsidiary, and the bank’s tokenised deposit.',
    question: 'Which correction is right?',
    options: [
      { text: 'They are interchangeable: each is worth $1.', feedback: 'Same price today, different claims tomorrow. Who owes the holder differs in every case.' },
      { text: 'The tokenised deposit is the bank’s own deposit. The subsidiary’s coin is a claim on a separate issuer. Network partners earn reserve income but owe the holder nothing. The single issuer keeps the income minus distribution costs.', feedback: 'Yes. Separate the token issuer, the distributor, the bank liability and the redemption right.' },
      { text: 'Network partners guarantee redemption.', feedback: 'They distribute and share income. The issuer owes the holder.' },
      { text: 'All four are deposits.', feedback: 'Only the tokenised deposit is a deposit.' },
    ],
    correct: 1,
  },
];

// ── Volume: gross transfers versus payments (flows, 2025) ─────────────────────

export interface VolumeBar { label: string; low: number; high?: number; basis: string; note: string; sources: SourceId[]; tone: 'gross' | 'pay' | 'ref' }

export const VOLUME_FLOWS: VolumeBar[] = [
  { label: 'Stablecoin transfers on-chain, 2025 (gross)', low: 28000, high: 35000, basis: 'Estimates', tone: 'gross',
    note: 'Every transfer counted, including exchanges, trading bots, DeFi and transfers between a holder’s own wallets.', sources: ['bisAer2026', 'imfKatz'] },
  { label: 'Visa payments volume, fiscal 2025', low: 14200, basis: 'Reported', tone: 'ref',
    note: 'A card network’s payments, for scale. A like-for-like payments figure.', sources: ['visaFy25'] },
  { label: 'Genuine stablecoin payments, 2025', low: 390, basis: 'Estimates', tone: 'pay',
    note: 'McKinsey and Artemis estimate genuine payments (business, person-to-person, card-linked) at about this level. The BIS gives a similar figure for transfers net of moves between a holder’s own wallets, citing Chainalysis and Visa data.', sources: ['mckinsey', 'bisAer2026'] },
  { label: 'of which business-to-business', low: 226, basis: 'Same estimate', tone: 'pay',
    note: 'About 60% of the genuine-payment estimate.', sources: ['mckinsey'] },
  { label: 'Cross-border stablecoin transfers Chainalysis can attribute, year to June 2026', low: 220, basis: 'Vendor lower bound', tone: 'pay',
    note: 'Only transfers it can attribute to countries. Not all are payments. The average transfer is about $3,000.', sources: ['chainalysisAdoption'] },
];
