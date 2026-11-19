// chatContext.ts — the curated, source-backed context the site assistant uses for this topic.
//
// Built from the same model the page renders (routes, steps, rules, scenes, checks, sources),
// so the assistant can't drift from the page. `npm run chat-context` writes it to
// backend/src/main/resources/chat-context/stablecoins.json; a test fails if that file is stale.
// The backend uses only this text for the stablecoins topic and ignores page text from browsers.

import { ROUTES, SCENARIO, CORRIDOR_PRESETS } from './journey.ts';
import { MODELS } from './routes.ts';
import { SLOT_NOTES, PARAMS, PAYMENTS } from './liquidity.ts';
import { METHODS, FAULTS } from './crossLedger.ts';
import {
  pegOutcome, LENS, PERSPECTIVE_LABEL, ECONOMY_LABEL, WALLET_CASES, CONTROL_PHASES, RESERVE_MODELS, RESERVE_ROWS,
  CHECKS, VOLUME_FLOWS, type Perspective, type Economy, type WalletCase,
} from './lenses.ts';
import { SOURCES, type SourceId } from './sources.ts';

export const AS_OF = '2026-11-18';

const OVERVIEW = `TOPIC: Stablecoins, on Banking Rails to Digital Finance, an authored reference for banking and payments practitioners. Facts as publicly reported at 18 November 2026.

THESIS: A stablecoin moves a claim on an issuer across a ledger quickly. A payment is complete only when the payee holds what it asked for: local currency it can spend from its bank account, or dollar tokens in its own wallet. Funding, conversion, cash-out, reachability, screening, liquidity and reconciliation decide whether a stablecoin route wins, loses or complements other rails. The FSB said in November 2026 that "faster payment initiation alone is not sufficient".

1. A CLAIM, NOT A COIN. A stablecoin is a token that represents a claim on its issuer, which holds reserves (Treasury bills, repo, money-market funds, cash) and redeems at $1 for holders it has onboarded, on its terms. Tokens are minted when money comes in and burned when it goes out. Two prices: the redemption price ($1 from the issuer, less fees) and the market price. Holders who can redeem keep the market price near $1 by buying below $1 and redeeming, or minting at $1 and selling above it. If redemption is closed (weekend, pause) or reserves are doubted, the price can slip. Redemption rules: MiCA lets e-money token holders redeem at par at any time; the OCC's GENIUS Act rule requires redemption within two business days from 18 January 2027; FCA rules (from 25 October 2027) require redemption by the next business day after checks; the Bank of England expects systemic sterling coins to redeem within 24 hours. Tether's minimum is $100,000, with a fee of the greater of $1,000 or 0.1%. History: USDC fell to about $0.88 in March 2023 when $3.3bn of its reserves were at the failed Silicon Valley Bank, and recovered when depositors were protected; the algorithmic TerraUSD collapsed in May 2022 and a US jury later found its issuer liable for fraud ($4.5bn in penalties). A tokenised deposit is the bank's own deposit as a token (JPMorgan calls JPM Coin a deposit token, "not a stablecoin"); a bank-issued stablecoin is a claim on a separate issuer with segregated reserves (e.g. SG-FORGE's EURCV and USDCV, SoFiUSD). The PRA expects UK banks to offer retail digital money as deposits and to issue stablecoins only from a separate, insolvency-remote, distinctly branded entity (PRA letter of 18 May 2026, read via a law-firm summary).

2. WHO USES THEM. Crypto trading is still the main use (BIS 2026). Over 98% are US-dollar. Supply was $286.4bn on 17 November 2026, down from a $312.9bn peak on 17 May; USDT was $175.2bn (61%) and USDC $69.2bn (24%). Gross on-chain transfers in 2025 were $28tn to $35tn depending on the source; genuine payments were about $390bn (a single McKinsey/Artemis estimate later repeated by the BIS and IMF), of which about $226bn business-to-business. BIS research found treating every on-chain transfer as a payment misclassifies about six in ten. Chainalysis counts $220bn of attributable cross-border transfers in the year to June 2026 (vendor lower bound). Visa's payments volume was $14.2tn in fiscal 2025, for scale.

3. FOLLOW £1,000 (interactive): four routes for one invoice. See the scene notes. No published source prices a £1,000 UK-outbound payment. IMF WP/26/230 (30 Oct 2026) priced USD 200 stablecoin "sandwich" transfers across 270 corridors: 2.18% average with the cheapest ramps, 3.04% median-priced, 4.07% dearest, 1.54% at USD 5,000; the blockchain leg was under a quarter of the cost; in about a third of comparable corridors the cheapest traditional provider was cheaper; speed, counterparty risk and onboarding were excluded. The global average cost of sending USD 200 was 6.2% in Q1 2026 (FSB). Big-bank retail wires can carry FX margins of 2-4% (BIS WP 1385, small sample). Swift says 75% of its payments reach the beneficiary bank within 10 minutes (operator data); the FSB finds 57% of wholesale cross-border payments are credited to the end customer within an hour. Stablecoin routes tend to win on hours, reach where correspondent banks have withdrawn (if a licensed off-ramp exists), payees who want dollars, and firms' own treasury moves. They tend to lose where instant domestic systems and payment firms serve a corridor well, in thinly traded currencies, where refunds or fraud reimbursement matter, and where two conversions add cost.

4. PICK THE PAYMENT MODEL (interactive selector). Separate three questions: which token (whose liability), which route (how value travels), who earns what (partnership economics). Circle's payments network describes itself as an orchestration layer; its operating entity says it holds no funds, while its managed service does. Its $58bn "annualised volume" (30 Oct 2026) is a 30-day run-rate scaled to a year.

5. LIQUIDITY (interactive control room). The token runs 24/7; money at either end doesn't. Someone must prefund stablecoin inventory and local-currency payout floats. Minting and redemption follow US banking days and cut-offs (Circle settles wires same day before cut-off and typically pays out next business day; Tether says redemptions can take several days). Market makers fill gaps at a spread that widens under stress; flows in the other direction allow netting (Circle nets mint and redeem orders hourly); credit can bridge gaps but no issuer was found minting before money arrives (issuance is cash in advance, which the BIS says limits elasticity).

6. ACROSS CHAINS (interactive failure lab). USDC is issued on 39 blockchains. Four ways across: the issuer's burn and mint (Circle CCTP: minting is idempotent, each signed confirmation can be used once; burning again is a second transfer; confirmations expire after about 24 hours and can be reissued; CCTP V1 is paused on 1 December 2026), a lock-and-mint bridge (the wrapped token is a claim on the bridge; bridges were 64% of the $3.1bn stolen from DeFi in 2022; KelpDAO lost about $292m in April 2026 through a single-verifier bridge setup), a liquidity pool, or a provider paying from its own inventory (counterparty risk). Ethereum blocks take about 15 minutes to finalise; optimistic-rollup withdrawals wait about seven days. Keep the payment in transit on the books until the destination is final; look up an unknown outcome before acting.

7. KEEPING CRIME OUT (interactive). Same duties as any payment. The UK Travel Rule has applied since 1 September 2023; since 30 June 2026 full originator data is needed on cross-border transfers of £800 or more. FATF (July 2026): 83% of surveyed jurisdictions have Travel Rule laws but 60% of those have taken no supervisory action. UK treatment of self-custody wallets is risk-based; the EU requires ownership checks above EUR 1,000. Stablecoins were 84% of illicit crypto volume in 2025 per Chainalysis, driven by flows to sanctioned entities; TRM puts illicit activity at about 1.2% of attributed volume. Issuer freezes are not a backstop: in the October 2026 Binance theft (about $6bn), hundreds of millions in stablecoins were swapped before issuers froze the rest.

8. WHO EARNS WHAT (interactive comparison). Issuers earn reserve income; holders get no interest from issuers (GENIUS from January 2027, MiCA, UK rules). In Q3 2026 Circle earned $658m of reserve income and paid $409m in distribution and transaction costs; Coinbase takes half of residual income plus all income on USDC held on Coinbase. Paxos offers Global Dollar Network partners up to 100% of returns on USDG on their platforms. Open USD went live on 30 September 2026, issued by Bridge (part of Stripe), under a company founded by Coinbase, Mastercard, Shopify, Stripe and Visa; supply about $961m on 17 November 2026; it says most reserve income goes to participants but no payouts or fees are published, so that is a stated design, not evidence. Issuer-by-issuer detail is on the site's "Stablecoin market structure" topic.

9. DOLLAR STABLECOINS OUTSIDE THE US (interactive lens). Mechanisms (well argued): deposits that fund lending can leave, monetary policy weakens, capital controls are harder to enforce. Measured so far (small): inflows move short-dated Treasury yields a few basis points; the IMF found no clear drain on bank deposits in El Salvador. Scenarios (large): one bank's research puts possible emerging-market deposit outflows at $1tn by 2028.

10. A UK BANK'S OPTIONS. UK cryptoasset regulations made 4 Feb 2026 and FCA final rules published 30 Jun 2026 both apply from 25 October 2027; firms already operating must apply between 30 Sep 2026 and 28 Feb 2027. The Bank of England will supervise sterling stablecoins the Treasury recognises as systemic; its 22 June 2026 policy replaced proposed holding limits with a temporary £40bn issuance cap per systemic coin and backing of up to 70% short-dated gilts with the rest in unremunerated Bank of England deposits (up to 95% gilts while scaling). Its rules are a draft due to be finalised by end-2026; no coin has been recognised. Draft legislation would take payments in UK-issued stablecoins out of the dealing and arranging rules; overseas coins such as USDT and USDC would stay inside them; a Treasury proposal would bring stablecoin payments into payments law, admitting overseas coins only if their home regime gives similar outcomes. Roles: tokenised deposits are live under existing law; issuing a sterling stablecoin needs FCA permission from Oct 2027 and a separate entity; custody and buying/selling for clients need registration now and FCA permission from Oct 2027; sending payments with third-party coins is the least settled area; staying out is legitimate. Options depend on need: tokenised deposits for 24/7 settlement between clients (JPMorgan, Citi in seven markets, HSBC in five already run them); partner with a licensed payout provider for corridors banks have left or suppliers wanting dollar tokens; distribution income after authorisation; issuing only via a separate entity with constrained economics; or wait. Alternatives keep improving: Faster Payments runs 24/7; more than 25 banks committed to Swift's faster retail rules by June 2026; Nexus is targeted for 2027; BIS Project Agora showed atomic cross-currency settlement is achievable.

KNOWN UNKNOWNS: whether the UK amending regulations have been made; the Bank of England's final code; the Treasury's payments-law response; real prices for a £1,000 UK payment; the IMF paper's full text; the McKinsey estimate's own page (read via BIS and IMF citations); Open USD partner payouts; local rules for receiving crypto-routed payments in any specific country, which the page does not assert.

RELATED TOPICS ON THE SITE: Stablecoin market structure (issuer-by-issuer detail), Deposit tokens, GBTD tokenised deposits, Regulation, What actually moves.`;

const sceneJourney = (): string => [
  `FOLLOW £1,000 SCENE. ${SCENARIO.invoice} from ${SCENARIO.sender.toLowerCase()} to ${SCENARIO.beneficiary.toLowerCase()}. "Paid" means the supplier holds what it asked for: local currency in its bank, or dollar tokens in its wallet. ${SCENARIO.valuation} Prices are illustrative and identical per leg type, so only structure differs; the comparison view is not ranked.`,
  ...ROUTES.map(r => `ROUTE ${r.name}: ${r.oneLine} Steps: ${r.steps.map((s, i) => `${i + 1}) ${s.title}${s.objective === 'local' ? ' [only when local currency is needed]' : ''}`).join('; ')}. Strongest version: ${r.bestCase} Watch: ${r.watch}`),
  `SITUATION CONTROLS: what the supplier needs (local currency or dollar tokens); whether banks and payment firms serve the corridor; supplier wallet (none or at an exchange); licensed off-ramp (funded, short of cash, none); destination payout system (instant 24/7 or banking hours); when sent (Tue 10:00, Fri 18:00, Sat 11:00); screening (clear or possible match). Presets: ${CORRIDOR_PRESETS.map(p => `${p.label}: ${p.note}`).join(' ')}`,
  `RULES: A sender checks prerequisites before anything moves. No supplier wallet: the wallet route can't start. No licensed off-ramp: a provider can't offer the sandwich. Banks withdrawn: the bank and payment-firm routes can't start. Dollar-token objective: bank routes can't deliver (they pay accounts, not wallets), the sandwich isn't needed, and wallet to wallet completes when the tokens arrive. An off-ramp short of cash makes the payout wait after the token arrives. Banking-hours payout systems make evening and weekend payouts wait; bank cut-offs delay the correspondent route. A possible screening match holds every route.`,
  `WHAT TO NOTICE: on the sandwich the tokens reach the off-ramp partner at step 3 of 5; the supplier holds nothing until step 5. With the default illustrative prices the sandwich matches the payment firm's cost only if each of its two conversions costs about half of the firm's single conversion (about 0.25% against 0.5%); dollar against major-currency spreads can be that tight, exotic currencies usually aren't.`,
].join('\n');

const sceneRoutes = (): string => [
  'PAYMENT-MODEL SELECTOR SCENE. Inputs: who pays (business, person, bank treasury); what the payee can receive into (bank, wallet, both); what it needs (local currency, dollars); what the payer starts with (bank money, stablecoins); whether both use the same platform or bank network; whether it must complete overnight or at a weekend; whether banks and payment firms serve the corridor; whether licensed crypto off-ramps exist. Results group models as Fits, Fits if, Doesn\'t fit.',
  ...MODELS.map(m => `MODEL ${m.name} (${m.family}): ${m.oneLine} Prerequisites: ${m.prerequisites.join('; ')}. Controls: ${m.controls} Fails when: ${m.failsWhen} Good for: ${m.goodFor}`),
].join('\n');

const sceneLiquidity = (): string => [
  `LIQUIDITY CONTROL ROOM SCENE. A payout provider must pay ${PAYMENTS.length} supplier invoices (${PAYMENTS.map(p => `${p.id} £${p.amount}k`).join(', ')}) between Friday 14:00 and Monday 09:00 through a dollar-stablecoin corridor; its off-ramp partner pays local currency. Amounts are illustrative £k-equivalent.`,
  `ASSUMED HOURS: ${SLOT_NOTES.ukBanks} ${SLOT_NOTES.issuer} ${SLOT_NOTES.destBanks}`,
  `LEVERS: partner's local float (low £${PARAMS.localFloat.low}k, medium £${PARAMS.localFloat.medium}k, high £${PARAMS.localFloat.high}k); provider's stablecoin inventory (low £${PARAMS.inventory.low}k, high £${PARAMS.inventory.high}k); flows one way or both ways (both ways nets £40k on Saturday and Sunday); market makers normal (${PARAMS.spreadPct.normal}% spread), stressed (${PARAMS.spreadPct.stressed}% and £${PARAMS.stressedCapacity}k per slot) or gone; direct mint/redeem account or none; payout system instant or banking hours; a £${PARAMS.creditLimit}k credit line or none.`,
  'MODEL: double-entry; balances never go negative unless the credit line is on, and borrowing is labelled as credit. Each invoice goes collected (customer debited), tokens with partner, money set aside (reserved), paid (spendable). LESSONS: thin float with no market maker, no issuer access and no credit leaves tokens with the partner and invoices unpaid; a banking-hours payout system means nothing is paid before Monday; flows in both directions let the provider net without converting; generous prefunding pays everything but leaves money parked; credit and spreads have costs.',
].join('\n');

const sceneCrossLedger = (): string => [
  'CROSS-LEDGER FAILURE LAB SCENE. A bank holds 100,000 dollar stablecoins on Chain A and must pay a recipient on Chain B. The reader picks a method and a fault and steps through events; balances on each chain and the bank\'s books (treasury, in transit, paid, claim on a third party) always total 100,000.',
  ...METHODS.map(m => `METHOD ${m.name}: ${m.how} Recipient ends up holding: ${m.recipientHolds} Trusts: ${m.trusts} Faults available: ${m.faults.filter(f => f !== 'none').map(f => FAULTS[f].label).join(', ')}.`),
  'SAFE ACTIONS: rebroadcast the same signed transaction after a reorg (same nonce: at most one is included); look up a transaction by hash after a timeout, never send again; keep checking status when confirmation is slow; resubmit the same signed message after a failed mint (one-time identifier: can\'t mint twice); wait or use the documented refund when a pool is short. STOP: recipient blocked (escalate to compliance and the issuer; routing around a block is evasion); bridge drained (record the loss exposure; no retry fixes it); provider fails (credit exposure; lodge a claim). The payment is marked paid only after Chain B is final. A wrapped token is a claim on the bridge, not the issuer.',
].join('\n');

const scenePeg = (): string => ['PEG SCENE ("two prices").', ...(['open', 'closed'] as const).flatMap(redemption =>
  (['trusted', 'doubted'] as const).map(reserves => {
    const o = pegOutcome({ redemption, reserves, holder: 'market' });
    return `Redemption ${redemption}, reserves ${reserves}: ${o.price}. ${o.why}`;
  })), `Holder who can only sell: ${pegOutcome({ redemption: 'open', reserves: 'trusted', holder: 'market' }).holder}`].join('\n');

const sceneVolume = (): string => ['VOLUME SCENE (flows, 2025, one linear scale).', ...VOLUME_FLOWS.map(f =>
  `${f.label}: ${f.high ? `$${f.low / 1000}tn to $${f.high / 1000}tn` : f.low >= 1000 ? `$${f.low / 1000}tn` : `$${f.low}bn`} (${f.basis}). ${f.note}`),
  'Stock, not flow: $286.4bn in circulation on 17 November 2026.'].join('\n');

const sceneControls = (): string => [
  'CONTROLS SCENE. A long-standing corporate client asks its UK bank to pay a supplier in a dollar stablecoin; the checks depend on the destination wallet.',
  ...(Object.keys(WALLET_CASES) as WalletCase[]).map(k => {
    const w = WALLET_CASES[k];
    return `${w.label}: ${w.verdict}. Can infer: ${w.canInfer.join(' ')} Cannot infer: ${w.cannotInfer.join(' ')} Do: ${w.steps.join(' ')}`;
  }),
  ...CONTROL_PHASES.map(p => `${p.label}: ${p.controls.map(c => `${c.name} (catches ${c.catches.toLowerCase()} Misses ${c.misses.toLowerCase()})`).join('; ')}`),
].join('\n');

const sceneReserve = (): string => ['RESERVE ECONOMICS SCENE: four ways to put a dollar on a ledger.', ...RESERVE_MODELS.map(m =>
  `${m.label}: ${RESERVE_ROWS.map(r => `${r.label}: ${m[r.key]}`).join(' | ')}`)].join('\n');

const sceneLens = (): string => ['ECONOMY LENS SCENE: gains and costs of dollar stablecoins by perspective. Labels: measured, mechanism, scenario, rule.',
  ...(Object.keys(ECONOMY_LABEL) as Economy[]).flatMap(e => (Object.keys(PERSPECTIVE_LABEL) as Perspective[]).map(p => {
    const c = LENS[e][p];
    return `${ECONOMY_LABEL[e]} / ${PERSPECTIVE_LABEL[p]}: gains ${c.gains.map(g => `[${g.basis}] ${g.text}`).join(' ')} Costs ${c.costs.map(g => `[${g.basis}] ${g.text}`).join(' ')}`;
  }))].join('\n');

const sceneCheck = (): string => ['SCENARIO CHECKS: eight new situations. Explain the reasoning; do not just give the letter.',
  ...CHECKS.map((c, i) => `${i + 1}. ${c.situation} ${c.question} Best answer: ${c.options[c.correct].text} Why: ${c.options[c.correct].feedback}`)].join('\n');

const sourcesList = (): string => (Object.keys(SOURCES) as SourceId[])
  .map(id => `${SOURCES[id].publisher} (${SOURCES[id].date}): ${SOURCES[id].title}`).join('\n');

export interface ChatContextFile {
  moduleId: string;
  title: string;
  asOf: string;
  generatedFrom: string;
  overview: string;
  scenes: Record<string, string>;
  sources: string;
}

export function buildChatContext(): ChatContextFile {
  return {
    moduleId: 'stablecoins',
    title: 'Stablecoins',
    asOf: AS_OF,
    generatedFrom: 'frontend/src/content/stablecoins (run: cd frontend && npm run chat-context)',
    overview: OVERVIEW,
    scenes: {
      journey: sceneJourney(), routes: sceneRoutes(), liquidity: sceneLiquidity(), crossledger: sceneCrossLedger(),
      peg: scenePeg(), volume: sceneVolume(), controls: sceneControls(), reserve: sceneReserve(),
      lens: sceneLens(), check: sceneCheck(),
    },
    sources: sourcesList(),
  };
}
