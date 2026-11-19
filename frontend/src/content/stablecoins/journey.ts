// journey.ts — "Follow £1,000": one payout objective, four routes.
//
// Pure data and functions, no DOM. The page renders it, the tests run it under Node,
// and the chat context is generated from it, so all three describe the same journey.
//
// Evidence basis: route structure and step mechanics are explained from public
// descriptions of each rail (sources cited on the page). Fees are ILLUSTRATIVE inputs,
// identical per leg type across routes so that only the structure differs. Timing is
// QUALITATIVE (windows open or closed), never a quoted duration.

export type RouteId = 'correspondent' | 'psp' | 'sandwich' | 'wallet';
export type LayerId = 'instruction' | 'value' | 'ledgers' | 'custody' | 'liquidity' | 'fx' | 'claim';

/** What happens to the payment's value at a step. Order matters: see VALUE_EVENT_ORDER. */
export type ValueEvent = 'debit' | 'convert' | 'settle' | 'token-transfer' | 'credit';

/** When a step can run. 'always' = 24/7 (Faster Payments, a blockchain, a funded partner). */
export type StepWindow = 'always' | 'uk-cutoff' | 'dest-hours';

export type FeeType = 'fx' | 'fixed' | 'network';
export type Need = 'beneficiary-wallet' | 'crypto-offramp' | 'bank-reach' | 'local-objective';
export type Marker = 'message' | 'token' | 'spendable';

export interface FeeLeg {
  type: FeeType;
  party: string;
  label: string;
}

export interface JourneyStep {
  id: string;
  actor: string;
  /** Index into the route's stations where the payment's value sits after this step. */
  station: number;
  title: string;
  detail: string;
  /** What changes in each layer at this step. A missing layer means "no change". */
  layers: Partial<Record<LayerId, string>>;
  valueEvent: ValueEvent;
  holderAfter: string;
  formAfter: string;
  fees: FeeLeg[];
  window: StepWindow;
  marker?: Marker;
  needs?: Need[];
  /** A sanctions, fraud or payee check runs at this step. */
  screening?: boolean;
  /** Only part of the journey when the supplier needs local currency in a bank account. */
  objective?: 'local';
}

export interface JourneyRoute {
  id: RouteId;
  name: string;
  short: string;
  oneLine: string;
  stations: string[];
  steps: JourneyStep[];
  /** What makes this route a fair, strong version of itself (no straw men). */
  bestCase: string;
  /** Where the route is structurally weak. */
  watch: string;
  /** Prerequisites a sender checks before starting. If one fails, the route never starts. */
  requires?: Need[];
  /** When the supplier wants dollar tokens, this route is not needed rather than failed. */
  tokensObjectiveNotApplicable?: boolean;
}

export const LAYER_LABELS: Record<LayerId, string> = {
  instruction: 'Instruction or message',
  value: 'Value',
  ledgers: 'Ledgers updated',
  custody: 'Custody',
  liquidity: 'Liquidity used',
  fx: 'FX',
  claim: 'Who owes whom',
};

export const LAYER_ORDER: LayerId[] = ['instruction', 'value', 'ledgers', 'custody', 'liquidity', 'fx', 'claim'];

/** The scenario contract. Every route is judged against the same objective. */
export const SCENARIO = {
  amountGBP: 1000,
  sender: 'A UK small business with a business account at a UK bank',
  beneficiary: 'A supplier abroad with an ordinary local bank account',
  objective: 'The supplier has local currency in their own bank account that they can spend',
  invoice: 'A £1,000 invoice, payable in the supplier’s local currency',
  valuation: 'All amounts are shown as £-equivalent at the mid-market rate, so fees and spreads are comparable without quoting any live exchange rate.',
  excluded: 'Tax treatment, accounting, refunds after completion and chargebacks are outside this scenario.',
} as const;

export const ROUTES: JourneyRoute[] = [
  {
    id: 'correspondent',
    name: 'Bank transfer through correspondents',
    short: 'Bank via correspondents',
    oneLine: 'The UK bank sends a SWIFT message and settles across accounts it holds with a correspondent bank.',
    stations: ['Business', 'UK bank', 'Correspondent', 'Supplier’s bank', 'Supplier'],
    bestCase: 'The bank has a direct correspondent in the destination, sends in local currency, and both banks process gpi payments promptly.',
    watch: 'Cut-offs, each bank in the chain may deduct a charge, and returns can take days if details are wrong. Big-bank retail wires can carry FX margins of 2–4%, even on liquid currencies.',
    requires: ['local-objective', 'bank-reach'],
    steps: [
      {
        id: 'c1', actor: 'UK bank', station: 1,
        title: 'Bank takes the instruction and debits the business',
        detail: 'The business asks its bank to pay the invoice. The bank screens the payee and the payment, converts pounds to local currency at its own rate and debits the account.',
        layers: {
          instruction: 'A payment instruction inside the bank. Nothing has left the bank yet.',
          ledgers: 'The bank debits the business’s account by £1,000.',
          liquidity: 'The bank will draw on the local-currency account (nostro) it keeps prefunded at a correspondent.',
          fx: 'Conversion 1: pounds to local currency, priced by the bank.',
          claim: 'The business no longer holds a £1,000 deposit. The bank now owes it a completed payment on the bank’s terms.',
        },
        valueEvent: 'debit', holderAfter: 'UK bank', formAfter: 'Payment in progress, local currency',
        fees: [
          { type: 'fixed', party: 'UK bank', label: 'Sending fee' },
          { type: 'fx', party: 'UK bank', label: 'FX margin' },
        ],
        window: 'uk-cutoff', screening: true,
      },
      {
        id: 'c2', actor: 'UK bank → correspondent', station: 2,
        title: 'A SWIFT message instructs the correspondent',
        detail: 'The bank sends a payment message over SWIFT to the correspondent that holds its local-currency account. The message carries the instruction. Money moves when the correspondent posts entries on its own books.',
        layers: {
          instruction: 'SWIFT payment message (pacs.008) with a gpi tracking reference. A message, not money.',
          value: 'The correspondent debits the UK bank’s account on its books.',
          ledgers: 'Correspondent’s books: the UK bank’s account goes down.',
          liquidity: 'The UK bank’s prefunded nostro balance falls. If it is short, the payment waits or uses an agreed credit line.',
          claim: 'The UK bank’s deposit claim on the correspondent shrinks by the payment amount.',
        },
        valueEvent: 'settle', holderAfter: 'Correspondent', formAfter: 'Correspondent’s local-currency funds',
        fees: [{ type: 'fixed', party: 'Correspondent', label: 'Correspondent charge' }],
        window: 'dest-hours', marker: 'message',
      },
      {
        id: 'c3', actor: 'Correspondent → supplier’s bank', station: 3,
        title: 'The correspondent pays the supplier’s bank',
        detail: 'If the supplier’s bank also banks with the correspondent, this is a book entry. Otherwise the correspondent pays through the local clearing or RTGS system, which settles in central bank money.',
        layers: {
          instruction: 'A local clearing or RTGS instruction.',
          value: 'Interbank settlement in the destination: a book entry, or central bank money through RTGS.',
          ledgers: 'The correspondent and the supplier’s bank update their books, and the central bank too if RTGS is used.',
          liquidity: 'The correspondent uses its own local liquidity or intraday credit.',
          claim: 'The supplier’s bank now holds the funds for its customer.',
        },
        valueEvent: 'settle', holderAfter: 'Supplier’s bank', formAfter: 'Settled funds awaiting credit',
        fees: [],
        window: 'dest-hours',
      },
      {
        id: 'c4', actor: 'Supplier’s bank', station: 4,
        title: 'The supplier’s bank checks and credits the account',
        detail: 'The supplier’s bank screens the incoming payment, matches the account and credits the supplier. A gpi status update can confirm the credit back to the sender.',
        layers: {
          instruction: 'A gpi credit confirmation goes back along the chain.',
          ledgers: 'The supplier’s account is credited.',
          claim: 'The supplier holds a deposit at their own bank: spendable local currency.',
        },
        valueEvent: 'credit', holderAfter: 'Supplier', formAfter: 'Local-currency bank deposit',
        fees: [{ type: 'fixed', party: 'Supplier’s bank', label: 'Receiving fee' }],
        window: 'dest-hours', marker: 'spendable', screening: true,
      },
    ],
  },
  {
    id: 'psp',
    name: 'Payment firm with local accounts',
    short: 'Payment firm, local payout',
    oneLine: 'A licensed payment firm takes pounds in the UK and pays out of local-currency money it already holds in the destination.',
    stations: ['Business', 'Firm (UK)', 'Firm (local account)', 'Supplier’s bank', 'Supplier'],
    bestCase: 'The firm holds enough local currency in the destination and the destination has an instant domestic payment system.',
    watch: 'The firm must keep money parked in every currency it serves and move it back and forth in bulk. Corridors it doesn’t serve are unreachable.',
    requires: ['local-objective', 'bank-reach'],
    steps: [
      {
        id: 'p1', actor: 'Business → firm', station: 1,
        title: 'The business pays the firm by Faster Payments',
        detail: 'The business sends £1,000 from its bank account to the firm’s UK account. Faster Payments credits the firm within seconds, at any hour.',
        layers: {
          instruction: 'A Faster Payments instruction.',
          value: 'Pounds move between UK banks. Banks settle Faster Payments with each other in central bank money several times a day; the customer credit is immediate.',
          ledgers: 'The business’s account is debited and the firm’s safeguarding account is credited.',
          claim: 'The firm owes the business a completed payout. A payment firm safeguards client money; it is not a protected bank deposit.',
        },
        valueEvent: 'debit', holderAfter: 'Firm (UK)', formAfter: 'Safeguarded pounds',
        fees: [],
        window: 'always',
      },
      {
        id: 'p2', actor: 'Firm', station: 2,
        title: 'The firm converts and instructs a local payout',
        detail: 'The firm screens the payment, converts pounds to local currency at its own rate, and tells its local entity or partner to pay from money that is already in the destination.',
        layers: {
          instruction: 'An internal instruction or an API call to the local payout account.',
          value: 'Nothing crosses the border now. The local currency was moved there earlier, in bulk.',
          ledgers: 'The firm’s ledger: pounds received, local payout owed.',
          liquidity: 'Uses the prefunded local-currency balance. The pounds pile up in the UK until the firm rebalances.',
          fx: 'One conversion: pounds to local currency, priced by the firm.',
          claim: 'Still the firm’s obligation to the business.',
        },
        valueEvent: 'convert', holderAfter: 'Firm (local account)', formAfter: 'Local-currency payout owed',
        fees: [
          { type: 'fixed', party: 'Firm', label: 'Firm fee' },
          { type: 'fx', party: 'Firm', label: 'FX margin' },
        ],
        window: 'always', screening: true,
      },
      {
        id: 'p3', actor: 'Local account → supplier’s bank', station: 4,
        title: 'Domestic payout to the supplier',
        detail: 'The firm’s local account pays the supplier through the domestic payment system. With an instant domestic system the supplier can be credited in seconds.',
        layers: {
          instruction: 'A domestic payment instruction.',
          value: 'Domestic interbank settlement in local currency.',
          ledgers: 'The firm’s local account is debited; the supplier’s account is credited.',
          liquidity: 'The local float falls by the payout.',
          claim: 'The supplier holds a deposit at their own bank.',
        },
        valueEvent: 'credit', holderAfter: 'Supplier', formAfter: 'Local-currency bank deposit',
        fees: [],
        window: 'dest-hours', marker: 'spendable',
      },
    ],
  },
  {
    id: 'sandwich',
    name: 'Stablecoin sandwich through a provider',
    short: 'Stablecoin sandwich',
    oneLine: 'A provider turns pounds into a dollar stablecoin, moves it on a blockchain to a partner, and the partner pays local currency.',
    stations: ['Business', 'Provider (UK)', 'Blockchain', 'Off-ramp partner', 'Supplier’s bank', 'Supplier'],
    bestCase: 'The provider holds stablecoin inventory, its off-ramp partner is licensed and funded in local currency, and the destination has an instant domestic system.',
    watch: 'Two currency conversions, two partners and two prefunded balances. The token arriving does not pay the supplier.',
    requires: ['local-objective', 'crypto-offramp'],
    tokensObjectiveNotApplicable: true,
    steps: [
      {
        id: 's1', actor: 'Business → provider', station: 1,
        title: 'The business pays the provider by Faster Payments',
        detail: 'The business sends £1,000 to the provider’s UK account, exactly as it would pay a payment firm.',
        layers: {
          instruction: 'A Faster Payments instruction.',
          value: 'Pounds move between UK banks, settled between banks in central bank money.',
          ledgers: 'The business’s account is debited; the provider’s account is credited.',
          claim: 'The provider owes the business a payout. How the client’s money is protected depends on the provider’s licence.',
        },
        valueEvent: 'debit', holderAfter: 'Provider (UK)', formAfter: 'Pounds held for the client',
        fees: [],
        window: 'always',
      },
      {
        id: 's2', actor: 'Provider', station: 1,
        title: 'The provider swaps pounds for a dollar stablecoin',
        detail: 'The provider screens the payment and swaps pounds for a US-dollar stablecoin, usually from its own inventory or a market maker. Minting new coins with the issuer only works while the issuer’s bank transfers run.',
        layers: {
          instruction: 'An internal order, or a trade with a market maker.',
          value: 'Pounds are exchanged for stablecoins. A dollar claim on the issuer replaces a pound balance.',
          ledgers: 'The provider’s ledger: pounds in, stablecoins out of inventory.',
          custody: 'The stablecoins sit in a wallet the provider or its custodian controls.',
          liquidity: 'Uses prefunded stablecoin inventory. The pounds must be recycled later.',
          fx: 'Conversion 1: pounds to US dollars.',
          claim: 'Each token is a claim on the issuer, which holds the reserves.',
        },
        valueEvent: 'convert', holderAfter: 'Provider (UK)', formAfter: 'Dollar stablecoin',
        fees: [
          { type: 'fixed', party: 'Provider', label: 'Provider fee (covers the partner’s payout cost)' },
          { type: 'fx', party: 'Provider', label: 'GBP→USD spread' },
        ],
        window: 'always', screening: true,
      },
      {
        id: 's3', actor: 'Provider → off-ramp partner', station: 3,
        title: 'The tokens move on the blockchain',
        detail: 'The provider sends the stablecoins to its off-ramp partner’s wallet. Depending on the chain this takes seconds to minutes and costs a network fee.',
        layers: {
          instruction: 'A signed blockchain transaction. No SWIFT message.',
          value: 'The tokens, and the claim on the issuer they represent, move to the partner’s wallet.',
          ledgers: 'The blockchain records the transfer. The provider and the partner each update their own books.',
          custody: 'Control passes to the partner’s wallet or custodian.',
          claim: 'The partner now holds the claim on the issuer. The supplier still has nothing.',
        },
        valueEvent: 'token-transfer', holderAfter: 'Off-ramp partner', formAfter: 'Dollar stablecoin',
        fees: [{ type: 'network', party: 'Blockchain', label: 'Network fee' }],
        window: 'always', marker: 'token',
      },
      {
        id: 's4', actor: 'Off-ramp partner', station: 3,
        title: 'The partner swaps the stablecoins for local currency',
        detail: 'The partner screens the transfer and pays local currency, normally from a balance it already holds. It then has to sell or redeem the stablecoins it received to refill that balance.',
        layers: {
          instruction: 'The partner’s internal payout instruction.',
          value: 'The partner keeps the stablecoins and releases local currency from its own funds.',
          ledgers: 'The partner’s ledger: stablecoins in, local-currency payout owed.',
          custody: 'The partner holds the tokens until it sells or redeems them.',
          liquidity: 'Uses the partner’s prefunded local-currency float, which it must rebuild by selling or redeeming stablecoins.',
          fx: 'Conversion 2: US dollars to local currency.',
          claim: 'The partner owes the supplier a payout.',
        },
        valueEvent: 'convert', holderAfter: 'Off-ramp partner', formAfter: 'Local-currency payout owed',
        fees: [{ type: 'fx', party: 'Off-ramp partner', label: 'USD→local spread' }],
        window: 'always', needs: ['crypto-offramp'], screening: true,
      },
      {
        id: 's5', actor: 'Partner → supplier’s bank', station: 5,
        title: 'Domestic payout to the supplier',
        detail: 'The partner pays the supplier through the domestic payment system. Only now does the supplier have money they can spend.',
        layers: {
          instruction: 'A domestic payment instruction.',
          value: 'Domestic interbank settlement in local currency.',
          ledgers: 'The partner’s local account is debited; the supplier’s account is credited.',
          liquidity: 'The partner’s local float falls by the payout.',
          claim: 'The supplier holds a deposit at their own bank.',
        },
        valueEvent: 'credit', holderAfter: 'Supplier', formAfter: 'Local-currency bank deposit',
        fees: [],
        window: 'dest-hours', marker: 'spendable',
      },
    ],
  },
  {
    id: 'wallet',
    name: 'Wallet to wallet',
    short: 'Wallet to wallet',
    oneLine: 'The business buys a dollar stablecoin on an exchange and sends it to the supplier’s wallet. The supplier converts it themselves.',
    stations: ['Business', 'UK exchange', 'Blockchain', 'Supplier’s wallet', 'Local exchange', 'Supplier’s bank'],
    bestCase: 'The supplier already uses a licensed local exchange, wants dollars or can convert them cheaply, and both exchanges exchange Travel Rule data.',
    watch: 'The last two steps, and their cost and legal treatment, fall on the supplier. Without a wallet the route doesn’t start.',
    requires: ['beneficiary-wallet'],
    steps: [
      {
        id: 'w1', actor: 'Business → UK exchange', station: 1,
        title: 'The business funds an exchange account',
        detail: 'The business sends £1,000 by Faster Payments to its account at a UK crypto exchange.',
        layers: {
          instruction: 'A Faster Payments instruction.',
          value: 'Pounds move between UK banks.',
          ledgers: 'The business’s bank account is debited; its exchange account is credited.',
          claim: 'The exchange owes the business. Money held at a crypto exchange is not a protected bank deposit.',
        },
        valueEvent: 'debit', holderAfter: 'UK exchange', formAfter: 'Pounds at the exchange',
        fees: [],
        window: 'always',
      },
      {
        id: 'w2', actor: 'Business at the exchange', station: 1,
        title: 'The business buys a dollar stablecoin',
        detail: 'The business sells pounds for a US-dollar stablecoin on the exchange.',
        layers: {
          instruction: 'A trade on the exchange’s order book.',
          value: 'Pounds are exchanged for stablecoins inside the exchange.',
          ledgers: 'The exchange’s internal ledger. Nothing is recorded on a blockchain yet.',
          custody: 'The exchange holds the tokens for the business.',
          fx: 'Conversion 1: pounds to US dollars.',
          claim: 'The business holds a claim on the exchange, which holds claims on the issuer.',
        },
        valueEvent: 'convert', holderAfter: 'UK exchange', formAfter: 'Dollar stablecoin in custody',
        fees: [
          { type: 'fixed', party: 'UK exchange', label: 'Trading fee' },
          { type: 'fx', party: 'UK exchange', label: 'GBP→USD spread' },
        ],
        window: 'always',
      },
      {
        id: 'w3', actor: 'UK exchange → supplier’s wallet', station: 3,
        title: 'The exchange sends the tokens to the supplier’s wallet',
        detail: 'The business withdraws the tokens to the address the supplier gave. The exchange screens the address and, if it belongs to another exchange, exchanges Travel Rule data with it.',
        layers: {
          instruction: 'A signed blockchain transaction, plus Travel Rule data between exchanges where both sides support it.',
          value: 'The tokens move to the supplier’s address.',
          ledgers: 'The blockchain records the transfer.',
          custody: 'The supplier, or the supplier’s exchange, now controls the tokens.',
          claim: 'The supplier holds a claim on the issuer, in US dollars, not in their own currency.',
        },
        valueEvent: 'token-transfer', holderAfter: 'Supplier’s wallet', formAfter: 'Dollar stablecoin',
        fees: [{ type: 'network', party: 'Blockchain', label: 'Withdrawal network fee' }],
        window: 'always', marker: 'token', screening: true,
      },
      {
        id: 'w4', actor: 'Supplier at a local exchange', station: 4,
        title: 'The supplier sells the tokens for local currency',
        detail: 'The supplier sells the stablecoins on a local exchange. The supplier does this work and bears the price, plus any local tax or legal treatment.',
        layers: {
          instruction: 'A trade on the local exchange.',
          value: 'Stablecoins are exchanged for local currency inside the local exchange.',
          ledgers: 'The local exchange’s internal ledger.',
          custody: 'The local exchange holds the supplier’s balance.',
          fx: 'Conversion 2: US dollars to local currency, at the supplier’s cost.',
          claim: 'The local exchange owes the supplier local currency.',
        },
        valueEvent: 'convert', holderAfter: 'Local exchange', formAfter: 'Local currency at the exchange',
        fees: [{ type: 'fx', party: 'Local exchange', label: 'USD→local spread' }],
        window: 'always', needs: ['crypto-offramp'], screening: true, objective: 'local',
      },
      {
        id: 'w5', actor: 'Local exchange → supplier’s bank', station: 5,
        title: 'The supplier withdraws to their bank',
        detail: 'The supplier withdraws local currency to their own bank account. Only now is the invoice paid in money they can spend.',
        layers: {
          instruction: 'A domestic payment instruction.',
          value: 'Domestic interbank settlement in local currency.',
          ledgers: 'The exchange’s bank account is debited; the supplier’s account is credited.',
          claim: 'The supplier holds a deposit at their own bank.',
        },
        valueEvent: 'credit', holderAfter: 'Supplier', formAfter: 'Local-currency bank deposit',
        fees: [{ type: 'fixed', party: 'Local exchange', label: 'Withdrawal fee' }],
        window: 'dest-hours', marker: 'spendable', objective: 'local',
      },
    ],
  },
];

// ── Conditions: the situation the reader can change ─────────────────────────────

export interface JourneyConditions {
  /** What the supplier needs to end up with. */
  objective: 'local' | 'tokens';
  /** Do banks and payment firms still serve this corridor? */
  bankReach: 'normal' | 'withdrawn';
  /** Does the supplier have a usable stablecoin wallet? */
  wallet: 'none' | 'hosted';
  /** Is there a licensed, funded crypto off-ramp in the destination? */
  offramp: 'liquid' | 'thin' | 'none';
  /** Destination domestic payout system. */
  localRail: 'instant' | 'hours';
  /** When the business presses send (UK time). */
  when: 'weekday' | 'evening' | 'weekend';
  /** Outcome of payee and sanctions screening. */
  screening: 'clear' | 'review';
}

export const CORRIDOR_PRESETS: { id: string; label: string; note: string; conditions: JourneyConditions }[] = [
  {
    id: 'accessible',
    label: 'Corridor with licensed off-ramps',
    note: 'Banks and payment firms serve the corridor, licensed off-ramps are funded, and the destination has an instant domestic payment system. The supplier wants local currency in the bank.',
    conditions: { objective: 'local', bankReach: 'normal', wallet: 'hosted', offramp: 'liquid', localRail: 'instant', when: 'weekday', screening: 'clear' },
  },
  {
    id: 'bank-only',
    label: 'Bank-account-only supplier',
    note: 'The supplier has a bank account and no stablecoin wallet, and no licensed crypto off-ramp is established for this flow. Local rules on receiving payments through crypto are not assumed.',
    conditions: { objective: 'local', bankReach: 'normal', wallet: 'none', offramp: 'none', localRail: 'instant', when: 'weekday', screening: 'clear' },
  },
  {
    id: 'derisked',
    label: 'Corridor banks have left',
    note: 'Correspondent banks and payment firms have withdrawn from the corridor ("de-risking"), but a licensed off-ramp operates there. This is where stablecoin routes can reach payees banks no longer reach.',
    conditions: { objective: 'local', bankReach: 'withdrawn', wallet: 'none', offramp: 'liquid', localRail: 'instant', when: 'weekday', screening: 'clear' },
  },
  {
    id: 'dollars',
    label: 'Supplier wants dollar tokens',
    note: 'The supplier invoices in dollars and wants dollar stablecoins in its exchange wallet, for example to pay its own suppliers. Arrival of the tokens is the payment.',
    conditions: { objective: 'tokens', bankReach: 'normal', wallet: 'hosted', offramp: 'liquid', localRail: 'instant', when: 'weekend', screening: 'clear' },
  },
];

export const DEFAULT_CONDITIONS: JourneyConditions = CORRIDOR_PRESETS[0].conditions;

export type StepStatus = 'done' | 'waits' | 'pending' | 'held' | 'blocked' | 'not-reached';
export type RouteResult = 'spendable' | 'spendable-later' | 'held' | 'not-met' | 'not-applicable';

export interface StepOutcome {
  stepId: string;
  status: StepStatus;
  reason?: string;
}

export interface RouteEvaluation {
  route: RouteId;
  steps: StepOutcome[];
  result: RouteResult;
  /** A token moved on a blockchain during this payment. */
  tokenMoved: boolean;
  /** The objective is met: the supplier holds spendable local currency now. */
  spendableNow: boolean;
  headline: string;
  /** Why the route never started, when a prerequisite failed or it isn't needed. */
  reason?: string;
}

/** Reasons a route can't start, checked by the sender before anything moves. */
const ROUTE_BLOCK_REASON: Record<Need, Record<string, string>> = {
  'bank-reach': {
    withdrawn: 'Correspondent banks and payment firms have withdrawn from this corridor, so there is no fiat route to start.',
  },
  'local-objective': {
    tokens: 'The supplier asked for dollar tokens in its wallet. Bank transfers and payment firms pay bank accounts, not wallets.',
  },
  'beneficiary-wallet': {
    none: 'The supplier has no stablecoin wallet, so there is no address to send to. Opening one, then converting and withdrawing, would all fall on the supplier.',
  },
  'crypto-offramp': {
    none: 'The provider can’t offer this corridor: no licensed off-ramp partner is established, and whether the supplier may receive payments that pass through crypto is not assumed.',
  },
};

/** Reasons a step stops or waits once the payment is under way. */
const NEED_REASON: Record<Need, Record<string, string>> = {
  'bank-reach': {},
  'local-objective': {},
  'beneficiary-wallet': {},
  'crypto-offramp': {
    none: 'No licensed off-ramp here can turn the tokens into local currency in a bank account. The supplier holds dollar tokens they can’t spend locally.',
    thin: 'The off-ramp is short of local currency. It must sell or redeem stablecoins first, which is slower and usually costs more.',
  },
};

const conditionFor = (need: Need, c: JourneyConditions): string => ({
  'beneficiary-wallet': c.wallet, 'crypto-offramp': c.offramp, 'bank-reach': c.bankReach, 'local-objective': c.objective,
}[need]);

const NOT_NEEDED = 'Not needed: when the supplier wants dollar tokens, a provider sends tokens straight to the supplier’s wallet. That is the wallet-to-wallet route, run by a provider.';

/** The steps that are part of this journey, given what the supplier needs. */
export function activeSteps(route: JourneyRoute, c: Pick<JourneyConditions, 'objective'>): JourneyStep[] {
  return route.steps.filter(s => !(s.objective === 'local' && c.objective === 'tokens'));
}

function windowWait(win: StepWindow, c: JourneyConditions): string | null {
  if (win === 'uk-cutoff' && c.when !== 'weekday') {
    return 'After the bank’s same-day cut-off. The bank processes it on the next business day.';
  }
  if (win === 'dest-hours' && c.localRail === 'hours' && c.when !== 'weekday') {
    return 'The destination payout system is closed until its next business day.';
  }
  return null;
}

/** Evaluate one route under the reader's conditions. Deterministic and side-effect free. */
export function evaluateRoute(route: JourneyRoute, c: JourneyConditions): RouteEvaluation {
  // A sender checks the route's prerequisites first. If one fails, nothing moves at all.
  const journey = activeSteps(route, c);
  const notNeeded = route.tokensObjectiveNotApplicable && c.objective === 'tokens';
  const routeBlock = notNeeded ? NOT_NEEDED : (route.requires ?? [])
    .map(need => ROUTE_BLOCK_REASON[need][conditionFor(need, c)])
    .find((r): r is string => Boolean(r));
  if (routeBlock) {
    const result: RouteResult = notNeeded ? 'not-applicable' : 'not-met';
    const steps: StepOutcome[] = journey.map((s, i) => i === 0 && !notNeeded
      ? { stepId: s.id, status: 'blocked', reason: routeBlock }
      : { stepId: s.id, status: 'not-reached' });
    return { route: route.id, steps, result, tokenMoved: false, spendableNow: false, headline: headlineFor(result, false), reason: routeBlock };
  }

  const steps: StepOutcome[] = [];
  let stopped: 'held' | 'blocked' | null = null;
  let waiting = false;
  let screenedOnce = false;

  for (const step of journey) {
    if (stopped) {
      steps.push({ stepId: step.id, status: 'not-reached' });
      continue;
    }

    // A failed prerequisite blocks the step outright.
    let blockReason: string | null = null;
    let waitReason: string | null = null;
    for (const need of step.needs ?? []) {
      const state = conditionFor(need, c);
      const reason = NEED_REASON[need][state];
      if (!reason) continue;
      if (need === 'crypto-offramp' && state === 'thin') waitReason = reason;
      else blockReason = reason;
    }
    if (blockReason) {
      steps.push({ stepId: step.id, status: 'blocked', reason: blockReason });
      stopped = 'blocked';
      continue;
    }

    // Every route screens. A possible match holds the payment at the first check.
    if (step.screening && c.screening === 'review' && !screenedOnce) {
      screenedOnce = true;
      steps.push({
        stepId: step.id, status: 'held',
        reason: 'Possible sanctions or name match. The payment is held for review, then released, returned or reported depending on the outcome.',
      });
      stopped = 'held';
      continue;
    }
    if (step.screening) screenedOnce = true;

    waitReason = waitReason ?? windowWait(step.window, c);
    if (waitReason && !waiting) {
      steps.push({ stepId: step.id, status: 'waits', reason: waitReason });
      waiting = true;
      continue;
    }
    steps.push({ stepId: step.id, status: waiting ? 'pending' : 'done' });
  }

  const result: RouteResult = stopped === 'blocked' ? 'not-met'
    : stopped === 'held' ? 'held'
    : waiting ? 'spendable-later'
    : 'spendable';

  const tokenIdx = journey.findIndex(s => s.marker === 'token');
  const tokenMoved = tokenIdx >= 0 && (steps[tokenIdx].status === 'done');
  const spendableNow = result === 'spendable';

  return { route: route.id, steps, result, tokenMoved, spendableNow, headline: headlineFor(result, tokenMoved) };
}

function headlineFor(result: RouteResult, tokenMoved: boolean): string {
  switch (result) {
    case 'spendable':
      return 'The supplier can spend the money now.';
    case 'spendable-later':
      return tokenMoved
        ? 'The token arrived, but the supplier can’t spend anything until a later step runs.'
        : 'The payment completes, but later than requested.';
    case 'held':
      return 'Held for a compliance review. No route skips this.';
    case 'not-applicable':
      return 'Not needed for this objective.';
    case 'not-met':
      return tokenMoved
        ? 'The token arrived. The supplier still has no money they can spend.'
        : 'This route can’t meet the objective in this situation.';
  }
}

// ── Value trace: where the £1,000 is at each step, and what it has cost ────────

export interface FeeInputs {
  /** Spread charged on each currency conversion, in percent. Illustrative. */
  fxPct: number;
  /** Fixed charge per fee-charging hand-off, in £. Illustrative. */
  fixedGBP: number;
  /** Network fee per on-chain transfer, in £-equivalent. Illustrative. */
  networkGBP: number;
}

export const DEFAULT_FEES: FeeInputs = { fxPct: 0.5, fixedGBP: 2, networkGBP: 0.2 };
export const FEE_LIMITS = {
  fxPct: { min: 0, max: 3, step: 0.1 },
  fixedGBP: { min: 0, max: 30, step: 1 },
  networkGBP: { min: 0, max: 5, step: 0.1 },
} as const;

export interface ChargedFee extends FeeLeg {
  gbp: number;
}

export interface TraceRow {
  stepId: string;
  holder: string;
  form: string;
  /** £-equivalent of the payment's value after this step's fees. */
  valueGBP: number;
  fees: ChargedFee[];
  feesToDateGBP: number;
}

function clampFees(f: FeeInputs): FeeInputs {
  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Number.isFinite(v) ? v : lo));
  return {
    fxPct: clamp(f.fxPct, FEE_LIMITS.fxPct.min, FEE_LIMITS.fxPct.max),
    fixedGBP: clamp(f.fixedGBP, FEE_LIMITS.fixedGBP.min, FEE_LIMITS.fixedGBP.max),
    networkGBP: clamp(f.networkGBP, FEE_LIMITS.networkGBP.min, FEE_LIMITS.networkGBP.max),
  };
}

/**
 * Trace the payment's value through every step of a route. Fees are applied in the order
 * listed on each step. Invariant: valueGBP + feesToDateGBP === principal at every row.
 */
export function traceValue(
  route: JourneyRoute, inputs: FeeInputs, c: Pick<JourneyConditions, 'objective'> = { objective: 'local' },
  principal: number = SCENARIO.amountGBP,
): TraceRow[] {
  const f = clampFees(inputs);
  let value = principal;
  let feesToDate = 0;
  return activeSteps(route, c).map(step => {
    const charged: ChargedFee[] = step.fees.map(leg => {
      const raw = leg.type === 'fx' ? value * (f.fxPct / 100)
        : leg.type === 'fixed' ? f.fixedGBP
        : f.networkGBP;
      const gbp = Math.min(raw, value); // a fee can never take more than is left
      value -= gbp;
      feesToDate += gbp;
      return { ...leg, gbp };
    });
    return { stepId: step.id, holder: step.holderAfter, form: step.formAfter, valueGBP: value, fees: charged, feesToDateGBP: feesToDate };
  });
}

export interface RouteSummary {
  route: RouteId;
  fxConversions: number;
  feeHandOffs: number;
  onChainTransfers: number;
  receivedGBP: number;
  costGBP: number;
  costPct: number;
}

export function summariseRoute(
  route: JourneyRoute, inputs: FeeInputs, c: Pick<JourneyConditions, 'objective'> = { objective: 'local' },
): RouteSummary {
  const rows = traceValue(route, inputs, c);
  const last = rows[rows.length - 1];
  const legs = activeSteps(route, c).flatMap(s => s.fees);
  const principal = SCENARIO.amountGBP;
  return {
    route: route.id,
    fxConversions: legs.filter(l => l.type === 'fx').length,
    feeHandOffs: legs.filter(l => l.type === 'fixed').length,
    onChainTransfers: legs.filter(l => l.type === 'network').length,
    receivedGBP: last.valueGBP,
    costGBP: last.feesToDateGBP,
    costPct: (last.feesToDateGBP / principal) * 100,
  };
}

/**
 * The spread per conversion at which `route` delivers as much as `against` does at the reader's
 * inputs. Null when even a zero spread can't close the gap (fixed and network fees too high).
 * Derived, not sourced: it says what would have to be true, not what is.
 */
export function breakEvenFxPct(route: JourneyRoute, against: JourneyRoute, inputs: FeeInputs): number | null {
  const target = summariseRoute(against, inputs).receivedGBP;
  const at = (fx: number) => summariseRoute(route, { ...inputs, fxPct: fx }).receivedGBP;
  if (at(0) < target) return null;
  let lo = 0;
  let hi: number = FEE_LIMITS.fxPct.max;
  if (at(hi) >= target) return hi;
  for (let k = 0; k < 40; k++) {
    const mid = (lo + hi) / 2;
    if (at(mid) >= target) lo = mid; else hi = mid;
  }
  return lo;
}

/**
 * Money is taken once, first, and delivered once, last. Everything between is conversion,
 * interbank settlement or token transfer. Returns the problems found (empty = valid).
 */
export function checkValueEvents(route: JourneyRoute): string[] {
  const events = route.steps.map(s => s.valueEvent);
  const problems: string[] = [];
  if (events[0] !== 'debit') problems.push(`${route.id}: first event is ${events[0]}, not debit`);
  if (events[events.length - 1] !== 'credit') problems.push(`${route.id}: last event is not credit`);
  if (events.filter(e => e === 'debit').length !== 1) problems.push(`${route.id}: must debit exactly once`);
  if (events.filter(e => e === 'credit').length !== 1) problems.push(`${route.id}: must credit exactly once`);
  const spendIdx = route.steps.findIndex(s => s.marker === 'spendable');
  if (spendIdx !== route.steps.length - 1) problems.push(`${route.id}: spendable marker must be on the final credit`);
  return problems;
}

export function routeById(id: RouteId): JourneyRoute {
  const r = ROUTES.find(x => x.id === id);
  if (!r) throw new Error(`Unknown route ${id}`);
  return r;
}
