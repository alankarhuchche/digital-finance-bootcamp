// Invariants for the liquidity control room. Run: cd frontend && npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  runLiquidity, SLOTS, INTERNAL_ACCOUNTS, PARAMS, PAYMENTS,
  type LiquidityInputs, type PaymentStage,
} from '../../src/content/stablecoins/liquidity.ts';

const EPS = 1e-6;

function allInputs(): LiquidityInputs[] {
  const out: LiquidityInputs[] = [];
  for (const localFloat of ['low', 'medium', 'high'] as const)
    for (const inventory of ['low', 'high'] as const)
      for (const flows of ['one-way', 'two-way'] as const)
        for (const marketMaker of ['normal', 'stressed', 'unavailable'] as const)
          for (const issuerAccess of ['direct', 'none'] as const)
            for (const payoutRail of ['instant', 'hours'] as const)
              for (const credit of ['none', 'available'] as const)
                out.push({ localFloat, inventory, flows, marketMaker, issuerAccess, payoutRail, credit });
  return out;
}

const ALL = allInputs();
const STAGE_ORDER: PaymentStage[] = ['not-arrived', 'collected', 'sent', 'reserved', 'paid'];

test('double entry: every posting balances, so all balances sum to zero at every time slot', () => {
  for (const inputs of ALL) {
    for (const snap of runLiquidity(inputs).snapshots) {
      const sum = Object.values(snap.balances).reduce((a, b) => a + b, 0);
      assert.ok(Math.abs(sum) < EPS, JSON.stringify(inputs));
    }
  }
});

test('no internal account ever goes negative', () => {
  for (const inputs of ALL) {
    for (const snap of runLiquidity(inputs).snapshots) {
      for (const acct of INTERNAL_ACCOUNTS) {
        assert.ok(snap.balances[acct] >= -EPS, `${acct} = ${snap.balances[acct]} with ${JSON.stringify(inputs)}`);
      }
    }
  }
});

test('credit is only ever used when enabled, is labelled, and stays within its limit', () => {
  for (const inputs of ALL) {
    const run = runLiquidity(inputs);
    const creditPostings = run.postings.filter(p => p.from === 'ext:credit-line' || p.to === 'ext:credit-line');
    if (inputs.credit === 'none') {
      assert.equal(creditPostings.length, 0);
      assert.equal(run.summary.creditUsed, 0);
    } else {
      assert.ok(run.summary.creditUsed <= PARAMS.creditLimit + EPS);
      for (const p of creditPostings) assert.match(p.memo, /credit line/i);
    }
  }
});

test('a payment is only paid when the destination payout system is open', () => {
  for (const inputs of ALL) {
    const final = runLiquidity(inputs).snapshots.at(-1)!;
    for (const p of final.payments.filter(x => x.stage === 'paid')) {
      const slot = SLOTS.find(s => s.id === p.paidAt)!;
      assert.ok(inputs.payoutRail === 'instant' || slot.destBanks, `${p.id} paid at ${p.paidAt}`);
    }
  }
});

test('debit, reservation and settlement are separate, ordered events for every paid payment', () => {
  for (const inputs of ALL) {
    const run = runLiquidity(inputs);
    const final = run.snapshots.at(-1)!;
    for (const p of final.payments.filter(x => x.stage === 'paid')) {
      const mine = run.postings.filter(x => x.payment === p.id);
      const debit = mine.findIndex(x => x.from === 'ext:customers');
      const reserve = mine.findIndex(x => x.to === 'partner:local-reserved');
      const settle = mine.findIndex(x => x.to === 'ext:suppliers');
      assert.ok(debit >= 0 && reserve > debit && settle > reserve, `${p.id} ${JSON.stringify(inputs)}`);
    }
  }
});

test('payment stages only move forward through the weekend', () => {
  for (const inputs of ALL) {
    const seen = new Map<string, number>();
    for (const snap of runLiquidity(inputs).snapshots) {
      for (const p of snap.payments) {
        const idx = STAGE_ORDER.indexOf(p.stage);
        assert.ok(idx >= (seen.get(p.id) ?? 0), `${p.id} went backwards`);
        seen.set(p.id, idx);
      }
    }
  }
});

test('nothing reaches suppliers that was not collected from customers first', () => {
  for (const inputs of ALL) {
    const run = runLiquidity(inputs);
    const collected = run.postings.filter(p => p.from === 'ext:customers').reduce((s, p) => s + p.amount, 0);
    const paid = run.postings.filter(p => p.to === 'ext:suppliers').reduce((s, p) => s + p.amount, 0);
    assert.ok(paid <= collected + EPS);
  }
});

test('the model is deterministic', () => {
  for (const inputs of ALL.slice(0, 40)) assert.deepEqual(runLiquidity(inputs), runLiquidity(inputs));
});

test('generous prefunding with an instant payout system pays every invoice on arrival', () => {
  const run = runLiquidity({ localFloat: 'high', inventory: 'high', flows: 'one-way', marketMaker: 'normal', issuerAccess: 'direct', payoutRail: 'instant', credit: 'none' });
  assert.equal(run.summary.paidOnArrival, PAYMENTS.length);
  assert.ok(run.summary.idlePrefunding > 0, 'the cost of that comfort is money parked doing nothing');
});

test('with a business-hours payout system nothing is paid before Monday morning', () => {
  for (const inputs of ALL.filter(i => i.payoutRail === 'hours')) {
    const final = runLiquidity(inputs).snapshots.at(-1)!;
    for (const p of final.payments.filter(x => x.stage === 'paid')) assert.equal(p.paidAt, 'mon-09');
  }
});

test('thin float with no market maker, issuer route or credit: tokens arrive but invoices go unpaid', () => {
  const run = runLiquidity({ localFloat: 'low', inventory: 'high', flows: 'one-way', marketMaker: 'unavailable', issuerAccess: 'none', payoutRail: 'instant', credit: 'none' });
  assert.ok(run.summary.unpaid > 0);
  assert.ok(run.summary.blockers.length > 0);
  const final = run.snapshots.at(-1)!;
  assert.ok(final.payments.some(p => p.stage === 'sent' && p.wait === 'no-local-currency'));
});

test('flows in the other direction (netting) never make things worse', () => {
  for (const inputs of ALL.filter(i => i.flows === 'one-way')) {
    const oneWay = runLiquidity(inputs).summary;
    const twoWay = runLiquidity({ ...inputs, flows: 'two-way' }).summary;
    assert.ok(twoWay.paidOnArrival + twoWay.paidLater >= oneWay.paidOnArrival + oneWay.paidLater, JSON.stringify(inputs));
  }
});
