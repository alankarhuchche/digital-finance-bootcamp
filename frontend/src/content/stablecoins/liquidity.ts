// liquidity.ts — "Liquidity control room".
//
// A payout provider pays six supplier invoices between Friday afternoon and Monday
// morning through a stablecoin corridor. The reader changes prefunded balances, flows,
// market-maker conditions, issuer access, the payout rail and credit, and sees which
// payments are paid, which wait, and why.
//
// Everything here is ILLUSTRATIVE: amounts are in £k-equivalent, spreads are round
// numbers, and the opening hours are stated assumptions (listed in SLOTS). The model is
// double-entry: every movement is a posting between two accounts, so the sum of all
// balances is always zero and no internal account may go negative unless credit is
// enabled and labelled.

export type SlotId = 'fri-14' | 'fri-17' | 'fri-21' | 'sat-11' | 'sun-18' | 'mon-09';

export interface Slot {
  id: SlotId;
  label: string;
  /** UK banks process FX and wires (Faster Payments runs regardless). */
  ukBanks: boolean;
  /** The stablecoin issuer mints and redeems against US-dollar bank transfers. */
  issuer: boolean;
  /** Destination banks are open for FX and funding (destination assumed 5 hours ahead of the UK). */
  destBanks: boolean;
}

/** Assumptions, stated so a reader can disagree with them. */
export const SLOTS: Slot[] = [
  { id: 'fri-14', label: 'Fri 14:00', ukBanks: true, issuer: true, destBanks: false },
  { id: 'fri-17', label: 'Fri 17:00', ukBanks: false, issuer: true, destBanks: false },
  { id: 'fri-21', label: 'Fri 21:00', ukBanks: false, issuer: false, destBanks: false },
  { id: 'sat-11', label: 'Sat 11:00', ukBanks: false, issuer: false, destBanks: false },
  { id: 'sun-18', label: 'Sun 18:00', ukBanks: false, issuer: false, destBanks: false },
  { id: 'mon-09', label: 'Mon 09:00', ukBanks: true, issuer: false, destBanks: true },
];

export const SLOT_NOTES = {
  ukBanks: 'UK bank FX and wire desks: assumed open Friday 14:00 and Monday 09:00 only. Faster Payments runs all the time.',
  issuer: 'Issuer minting and redemption: assumed to follow US banking hours (09:00–16:00 New York), so open on Friday afternoon UK time and closed at weekends and early Monday UK time.',
  destBanks: 'Destination banks: assumed 5 hours ahead of the UK, so closed from Friday evening local time until Monday morning local time.',
} as const;

export type Level = 'low' | 'medium' | 'high';

export interface LiquidityInputs {
  /** Off-ramp partner's prefunded local-currency float. */
  localFloat: Level;
  /** Provider's prefunded stablecoin inventory. */
  inventory: 'low' | 'high';
  /** One-way: only UK→destination payments. Two-way: some destination→UK flows arrive too. */
  flows: 'one-way' | 'two-way';
  /** Market makers who swap stablecoins for local currency, and pounds for stablecoins. */
  marketMaker: 'normal' | 'stressed' | 'unavailable';
  /** Does the provider (and partner) have a direct mint/redeem account with the issuer? */
  issuerAccess: 'direct' | 'none';
  /** Destination domestic payout system. */
  payoutRail: 'instant' | 'hours';
  /** A committed credit line from a bank to the off-ramp partner. */
  credit: 'none' | 'available';
}

export const DEFAULT_LIQUIDITY: LiquidityInputs = {
  localFloat: 'medium', inventory: 'high', flows: 'one-way', marketMaker: 'normal',
  issuerAccess: 'direct', payoutRail: 'instant', credit: 'none',
};

/** Illustrative parameters. £k-equivalent. */
export const PARAMS = {
  localFloat: { low: 50, medium: 120, high: 300 } as Record<Level, number>,
  inventory: { low: 60, high: 300 } as Record<'low' | 'high', number>,
  creditLimit: 100,
  /** Market-maker spread on each swap, percent. */
  spreadPct: { normal: 0.3, stressed: 3 } as Record<'normal' | 'stressed', number>,
  /** Under stress a market maker will only take this much per time slot, £k. */
  stressedCapacity: 30,
  /** Destination→UK flows in the two-way case, £k, by slot. */
  inboundFlows: { 'sat-11': 40, 'sun-18': 40 } as Partial<Record<SlotId, number>>,
} as const;

export interface PaymentSpec { id: string; arrives: SlotId; amount: number; beneficiary: string }

export const PAYMENTS: PaymentSpec[] = [
  { id: 'P1', arrives: 'fri-14', amount: 40, beneficiary: 'Textile supplier' },
  { id: 'P2', arrives: 'fri-14', amount: 25, beneficiary: 'Freight agent' },
  { id: 'P3', arrives: 'fri-17', amount: 60, beneficiary: 'Component maker' },
  { id: 'P4', arrives: 'fri-21', amount: 30, beneficiary: 'Software contractor' },
  { id: 'P5', arrives: 'sat-11', amount: 50, beneficiary: 'Packaging supplier' },
  { id: 'P6', arrives: 'sun-18', amount: 35, beneficiary: 'Design studio' },
];

export type Account =
  | 'provider:gbp' | 'provider:stablecoin'
  | 'partner:stablecoin' | 'partner:local' | 'partner:local-reserved'
  | 'ext:customers' | 'ext:suppliers' | 'ext:capital' | 'ext:issuer'
  | 'ext:market-maker' | 'ext:inbound-senders' | 'ext:uk-recipients' | 'ext:credit-line';

export const INTERNAL_ACCOUNTS: Account[] = [
  'provider:gbp', 'provider:stablecoin', 'partner:stablecoin', 'partner:local', 'partner:local-reserved',
];

export interface Posting {
  slot: SlotId;
  from: Account;
  to: Account;
  amount: number;
  memo: string;
  payment?: string;
}

/**
 * A payment's life: collected (customer debited), sent (tokens moved to the partner),
 * reserved (local currency set aside for it), paid (supplier credited, spendable).
 * Debit, reservation and settlement are separate events on purpose.
 */
export type PaymentStage = 'not-arrived' | 'collected' | 'sent' | 'reserved' | 'paid';
export type WaitReason = 'no-stablecoin' | 'no-local-currency' | 'rail-closed';

export interface PaymentState {
  id: string;
  amount: number;
  beneficiary: string;
  arrives: SlotId;
  stage: PaymentStage;
  paidAt?: SlotId;
  wait?: WaitReason;
  /** Levers used to get this payment paid. */
  levers: string[];
}

export interface SlotSnapshot {
  slot: SlotId;
  balances: Record<Account, number>;
  payments: PaymentState[];
  events: string[];
}

export interface LiquidityRun {
  inputs: LiquidityInputs;
  snapshots: SlotSnapshot[];
  postings: Posting[];
  summary: LiquiditySummary;
}

export interface LiquiditySummary {
  paidOnArrival: number;
  paidLater: number;
  unpaid: number;
  creditUsed: number;
  spreadCost: number;
  /** £k of prefunding that was never needed. */
  idlePrefunding: number;
  blockers: string[];
  leversUsed: string[];
}

const EPS = 1e-9;
const slotIndex = (id: SlotId) => SLOTS.findIndex(s => s.id === id);

/** Run the weekend. Pure: the same inputs always give the same run. */
export function runLiquidity(inputs: LiquidityInputs): LiquidityRun {
  const postings: Posting[] = [];
  const bal = Object.fromEntries(
    ([...INTERNAL_ACCOUNTS, 'ext:customers', 'ext:suppliers', 'ext:capital', 'ext:issuer', 'ext:market-maker',
      'ext:inbound-senders', 'ext:uk-recipients', 'ext:credit-line'] as Account[]).map(a => [a, 0]),
  ) as Record<Account, number>;

  const post = (slot: SlotId, from: Account, to: Account, amount: number, memo: string, payment?: string) => {
    if (amount <= EPS) return;
    postings.push({ slot, from, to, amount, memo, payment });
    bal[from] -= amount;
    bal[to] += amount;
  };

  const spread = inputs.marketMaker === 'unavailable' ? 0 : PARAMS.spreadPct[inputs.marketMaker] / 100;
  const payments: PaymentState[] = PAYMENTS.map(p => ({ ...p, stage: 'not-arrived', levers: [] }));
  const snapshots: SlotSnapshot[] = [];
  let spreadCost = 0;
  let creditUsed = 0;

  // Opening prefunding from the firms' own capital.
  const first = SLOTS[0].id;
  post(first, 'ext:capital', 'provider:stablecoin', PARAMS.inventory[inputs.inventory], 'Opening stablecoin inventory');
  post(first, 'ext:capital', 'partner:local', PARAMS.localFloat[inputs.localFloat], 'Opening local-currency float');
  const prefunded = PARAMS.inventory[inputs.inventory] + PARAMS.localFloat[inputs.localFloat];

  for (const slot of SLOTS) {
    const events: string[] = [];
    let mmCapacity = inputs.marketMaker === 'stressed' ? PARAMS.stressedCapacity : Infinity;
    const railOpen = inputs.payoutRail === 'instant' || slot.destBanks;

    // Market-maker swap with capacity and spread. Returns the amount actually delivered.
    const mmSwap = (from: Account, to: Account, want: number, memo: string, payment?: string): number => {
      if (inputs.marketMaker === 'unavailable' || mmCapacity <= EPS) return 0;
      const gross = Math.min(want / (1 - spread), bal[from], mmCapacity);
      if (gross <= EPS) return 0;
      const net = gross * (1 - spread);
      post(slot.id, from, 'ext:market-maker', gross, `${memo}: sold to market maker`, payment);
      post(slot.id, 'ext:market-maker', to, net, `${memo}: received from market maker`, payment);
      mmCapacity -= gross;
      spreadCost += gross - net;
      return net;
    };

    // 1. New payments arrive: the customer is debited and pounds are collected.
    for (const p of payments.filter(x => x.arrives === slot.id)) {
      post(slot.id, 'ext:customers', 'provider:gbp', p.amount, `${p.id} collected by Faster Payments`, p.id);
      p.stage = 'collected';
      events.push(`${p.id} arrives: £${p.amount}k collected from the customer.`);
    }

    // 2. Destination→UK flows net against the corridor (two-way only). The partner collects
    //    local currency and keeps it as float; the provider pays the UK recipients from
    //    collected pounds; the partner settles that with tokens it already holds. Only the
    //    amount both sides can settle in this slot is netted.
    const inbound = inputs.flows === 'two-way' ? (PARAMS.inboundFlows[slot.id] ?? 0) : 0;
    if (inbound > 0) {
      const netted = Math.min(inbound, bal['provider:gbp'], bal['partner:stablecoin']);
      post(slot.id, 'ext:inbound-senders', 'partner:local', netted, 'Inbound payments collected in local currency');
      post(slot.id, 'provider:gbp', 'ext:uk-recipients', netted, 'Inbound payments paid out in pounds');
      post(slot.id, 'partner:stablecoin', 'provider:stablecoin', netted, 'Partner settles the inbound leg in tokens');
      if (netted > EPS) {
        events.push(`£${round(netted)}k of payments flow the other way. The partner keeps the local currency, the provider pays UK recipients in pounds, and tokens go back to the provider: netting, with no conversion.`);
      }
      if (inbound - netted > EPS) {
        events.push(`£${round(inbound - netted)}k of inbound flow can’t be netted in this slot and is left out of the model.`);
      }
    }

    // 3. Provider leg: send stablecoins to the partner for each collected payment.
    for (const p of payments.filter(x => x.stage === 'collected')) {
      let short = p.amount - bal['provider:stablecoin'];
      if (short > EPS && inputs.issuerAccess === 'direct' && slot.issuer && slot.ukBanks) {
        const minted = Math.min(short, bal['provider:gbp']);
        post(slot.id, 'provider:gbp', 'ext:issuer', minted, `${p.id}: pounds converted and wired to the issuer`, p.id);
        post(slot.id, 'ext:issuer', 'provider:stablecoin', minted, `${p.id}: new stablecoins minted`, p.id);
        if (minted > EPS) { p.levers.push('Minted with the issuer'); events.push(`${p.id}: provider mints £${round(minted)}k of new stablecoins.`); }
        short = p.amount - bal['provider:stablecoin'];
      }
      if (short > EPS) {
        const got = mmSwap('provider:gbp', 'provider:stablecoin', short, `${p.id}: pounds for stablecoins`, p.id);
        if (got > EPS) { p.levers.push('Bought stablecoins from a market maker'); events.push(`${p.id}: provider buys £${round(got)}k of stablecoins from a market maker.`); }
        short = p.amount - bal['provider:stablecoin'];
      }
      if (short > EPS) {
        p.wait = 'no-stablecoin';
        continue;
      }
      post(slot.id, 'provider:stablecoin', 'partner:stablecoin', p.amount, `${p.id}: stablecoins sent on-chain`, p.id);
      p.stage = 'sent';
      p.wait = undefined;
      events.push(`${p.id}: £${p.amount}k of stablecoins reach the partner’s wallet.`);
    }

    // 4. Partner leg: set aside local currency for each payment, refilling the float if it can.
    for (const p of payments.filter(x => x.stage === 'sent')) {
      let short = p.amount - bal['partner:local'];
      if (short > EPS) {
        const got = mmSwap('partner:stablecoin', 'partner:local', short, `${p.id}: stablecoins for local currency`, p.id);
        if (got > EPS) { p.levers.push('Sold stablecoins to a local market maker'); events.push(`${p.id}: partner sells stablecoins for £${round(got)}k of local currency.`); }
        short = p.amount - bal['partner:local'];
      }
      if (short > EPS && inputs.issuerAccess === 'direct' && slot.issuer && slot.destBanks) {
        // Redeem with the issuer, then convert dollars to local currency at a destination bank.
        const redeem = Math.min(short, bal['partner:stablecoin']);
        post(slot.id, 'partner:stablecoin', 'ext:issuer', redeem, `${p.id}: stablecoins redeemed with the issuer`, p.id);
        post(slot.id, 'ext:issuer', 'partner:local', redeem, `${p.id}: dollars received and converted locally`, p.id);
        if (redeem > EPS) { p.levers.push('Redeemed with the issuer'); events.push(`${p.id}: partner redeems £${round(redeem)}k with the issuer.`); }
        short = p.amount - bal['partner:local'];
      }
      if (short > EPS && inputs.credit === 'available') {
        const room = PARAMS.creditLimit - creditUsed;
        const draw = Math.min(short, room);
        if (draw > EPS) {
          post(slot.id, 'ext:credit-line', 'partner:local', draw, `${p.id}: credit line drawn`, p.id);
          creditUsed += draw;
          p.levers.push('Drew on a credit line');
          events.push(`${p.id}: partner borrows £${round(draw)}k on its credit line. This is credit, not prefunding.`);
          short = p.amount - bal['partner:local'];
        }
      }
      if (short > EPS) {
        p.wait = 'no-local-currency';
        continue;
      }
      post(slot.id, 'partner:local', 'partner:local-reserved', p.amount, `${p.id}: local currency reserved`, p.id);
      p.stage = 'reserved';
      p.wait = undefined;
    }

    // 5. Payout: settle reserved payments when the domestic system is open.
    for (const p of payments.filter(x => x.stage === 'reserved')) {
      if (!railOpen) {
        p.wait = 'rail-closed';
        continue;
      }
      post(slot.id, 'partner:local-reserved', 'ext:suppliers', p.amount, `${p.id}: paid to the supplier’s bank account`, p.id);
      p.stage = 'paid';
      p.paidAt = slot.id;
      p.wait = undefined;
      events.push(`${p.id}: supplier credited. Spendable.`);
    }

    for (const p of payments) {
      if (p.wait === 'no-stablecoin' && p.stage === 'collected') events.push(`${p.id} waits: the provider has no stablecoins and can’t mint or buy any now.`);
      if (p.wait === 'no-local-currency' && p.stage === 'sent') events.push(`${p.id} waits: the tokens arrived, but the partner has no local currency to pay out.`);
      if (p.wait === 'rail-closed' && p.stage === 'reserved') events.push(`${p.id} waits: money is reserved, but the domestic payout system is closed.`);
    }

    snapshots.push({
      slot: slot.id,
      balances: { ...bal },
      payments: payments.map(p => ({ ...p, levers: [...p.levers] })),
      events,
    });
  }

  const final = snapshots[snapshots.length - 1];
  const paidOnArrival = final.payments.filter(p => p.stage === 'paid' && p.paidAt === p.arrives).length;
  const paidLater = final.payments.filter(p => p.stage === 'paid' && p.paidAt !== p.arrives).length;
  const unpaidList = final.payments.filter(p => p.stage !== 'paid');
  const usedPrefunding = PAYMENTS.reduce((s, p) => s + p.amount, 0);
  const blockers = [...new Set(unpaidList.map(p => blockerText(p.wait)).filter(Boolean))] as string[];
  const leversUsed = [...new Set(final.payments.flatMap(p => p.levers))];

  return {
    inputs,
    snapshots,
    postings,
    summary: {
      paidOnArrival,
      paidLater,
      unpaid: unpaidList.length,
      creditUsed,
      spreadCost,
      idlePrefunding: Math.max(0, prefunded - Math.min(prefunded, usedPrefunding)),
      blockers,
      leversUsed,
    },
  };
}

function blockerText(w?: WaitReason): string | null {
  switch (w) {
    case 'no-stablecoin': return 'The provider ran out of stablecoins with the issuer closed and no market maker willing to sell.';
    case 'no-local-currency': return 'Tokens arrived but the partner had no local currency, and nothing could refill it before Monday.';
    case 'rail-closed': return 'Money was ready but the destination payout system was closed.';
    default: return null;
  }
}

function round(n: number): string {
  return (Math.round(n * 10) / 10).toString();
}

export const slotLabel = (id: SlotId): string => SLOTS[slotIndex(id)]?.label ?? id;
