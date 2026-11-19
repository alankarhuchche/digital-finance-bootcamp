// Invariants for "Follow £1,000". Run: cd frontend && npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ROUTES, SCENARIO, CORRIDOR_PRESETS, traceValue, summariseRoute, evaluateRoute, checkValueEvents, routeById,
  activeSteps, breakEvenFxPct,
  type JourneyConditions, type FeeInputs,
} from '../../src/content/stablecoins/journey.ts';

const EPS = 1e-9;

function allConditions(): JourneyConditions[] {
  const out: JourneyConditions[] = [];
  for (const objective of ['local', 'tokens'] as const)
    for (const bankReach of ['normal', 'withdrawn'] as const)
      for (const wallet of ['none', 'hosted'] as const)
        for (const offramp of ['liquid', 'thin', 'none'] as const)
          for (const localRail of ['instant', 'hours'] as const)
            for (const when of ['weekday', 'evening', 'weekend'] as const)
              for (const screening of ['clear', 'review'] as const)
                out.push({ objective, bankReach, wallet, offramp, localRail, when, screening });
  return out;
}
const ALL = allConditions();
const preset = (id: string) => CORRIDOR_PRESETS.find(p => p.id === id)!.conditions;

function feeGrid(): FeeInputs[] {
  const out: FeeInputs[] = [];
  for (const fxPct of [0, 0.5, 1.7, 3])
    for (const fixedGBP of [0, 2, 30])
      for (const networkGBP of [0, 0.2, 5]) out.push({ fxPct, fixedGBP, networkGBP });
  return out;
}

test('every route takes money once, first, and delivers it once, last', () => {
  for (const r of ROUTES) assert.deepEqual(checkValueEvents(r), [], r.id);
});

test('monetary conservation: value in flight plus fees equals £1,000 at every step, for both objectives', () => {
  for (const objective of ['local', 'tokens'] as const) {
    for (const r of ROUTES) {
      for (const f of feeGrid()) {
        let prev = SCENARIO.amountGBP;
        for (const row of traceValue(r, f, { objective })) {
          assert.ok(Math.abs(row.valueGBP + row.feesToDateGBP - SCENARIO.amountGBP) < EPS, `${r.id} ${row.stepId}`);
          assert.ok(row.valueGBP >= -EPS, 'value never negative');
          assert.ok(row.valueGBP <= prev + EPS, 'value never grows');
          for (const fee of row.fees) assert.ok(fee.gbp >= 0, 'fees never negative');
          prev = row.valueGBP;
        }
      }
    }
  }
});

test('out-of-range and non-numeric fee inputs are clamped, not trusted', () => {
  const rows = traceValue(routeById('sandwich'), { fxPct: -50, fixedGBP: Number.NaN, networkGBP: 1e9 });
  const last = rows[rows.length - 1];
  assert.ok(last.valueGBP > 0 && last.valueGBP <= SCENARIO.amountGBP);
  assert.ok(Math.abs(last.valueGBP + last.feesToDateGBP - SCENARIO.amountGBP) < EPS);
});

test('a payout is complete only when every step of the journey is done', () => {
  for (const c of ALL) {
    for (const r of ROUTES) {
      const ev = evaluateRoute(r, c);
      assert.equal(ev.steps.length, activeSteps(r, c).length);
      if (ev.result === 'spendable') assert.ok(ev.steps.every(s => s.status === 'done'), `${r.id} ${JSON.stringify(c)}`);
      assert.equal(ev.spendableNow, ev.result === 'spendable');
    }
  }
});

test('held, blocked or unneeded payments are never reported as spendable', () => {
  for (const c of ALL) {
    for (const r of ROUTES) {
      const ev = evaluateRoute(r, c);
      if (ev.steps.some(s => s.status === 'held' || s.status === 'blocked')) {
        assert.ok(['held', 'not-met', 'not-applicable'].includes(ev.result), `${r.id} ${ev.result}`);
        assert.equal(ev.spendableNow, false);
      }
    }
  }
});

test('when the supplier needs local currency, a token transfer on its own never completes the payment', () => {
  let tokenButNotSpendable = 0;
  for (const c of ALL.filter(x => x.objective === 'local')) {
    for (const r of ROUTES.filter(x => x.steps.some(s => s.marker === 'token'))) {
      const steps = activeSteps(r, c);
      assert.ok(steps.findIndex(s => s.marker === 'token') < steps.length - 1, 'token step is never the final step');
      const ev = evaluateRoute(r, c);
      if (ev.tokenMoved && !ev.spendableNow) tokenButNotSpendable++;
    }
  }
  assert.ok(tokenButNotSpendable > 0, 'the model must show cases where the token arrived but the supplier cannot spend');
});

test('when the supplier wants dollar tokens, the tokens arriving is the payment', () => {
  const c = preset('dollars');
  const wallet = evaluateRoute(routeById('wallet'), c);
  assert.equal(wallet.result, 'spendable', 'wallet route completes at any hour');
  assert.equal(activeSteps(routeById('wallet'), c).at(-1)!.marker, 'token');
  assert.equal(evaluateRoute(routeById('correspondent'), c).result, 'not-met');
  assert.equal(evaluateRoute(routeById('psp'), c).result, 'not-met');
  assert.equal(evaluateRoute(routeById('sandwich'), c).result, 'not-applicable');
});

test('a corridor banks have left blocks the bank routes, not the licensed off-ramp route', () => {
  const c = preset('derisked');
  assert.equal(evaluateRoute(routeById('correspondent'), c).result, 'not-met');
  assert.equal(evaluateRoute(routeById('psp'), c).result, 'not-met');
  assert.equal(evaluateRoute(routeById('sandwich'), c).result, 'spendable');
});

test('no route is rigged: each one is sometimes the route that works, and sometimes fails', () => {
  for (const r of ROUTES) {
    const winsAlone = ALL.some(c => {
      const mine = evaluateRoute(r, c).result;
      return mine === 'spendable' && ROUTES.filter(o => o.id !== r.id).some(o => evaluateRoute(o, c).result !== 'spendable');
    });
    const fails = ALL.some(c => evaluateRoute(r, c).result === 'not-met');
    assert.ok(winsAlone, `${r.id} never wins where another route fails`);
    assert.ok(fails, `${r.id} never fails`);
  }
});

test('screening applies to every route: a possible match holds or stops them all', () => {
  for (const c of ALL.filter(x => x.screening === 'review')) {
    for (const r of ROUTES) {
      assert.ok(['held', 'not-met', 'not-applicable'].includes(evaluateRoute(r, c).result), `${r.id} ${JSON.stringify(c)}`);
    }
  }
});

test('acceptance 1: a bank-account-only supplier cannot be paid wallet to wallet', () => {
  const c = preset('bank-only');
  const wallet = evaluateRoute(routeById('wallet'), c);
  assert.equal(wallet.result, 'not-met');
  assert.equal(wallet.tokenMoved, false, 'nothing should move when the route cannot start');
  assert.equal(evaluateRoute(routeById('sandwich'), c).result, 'not-met');
  assert.equal(evaluateRoute(routeById('correspondent'), c).result, 'spendable');
  assert.equal(evaluateRoute(routeById('psp'), c).result, 'spendable');
});

test('a wallet the supplier cannot cash out locally leaves them holding tokens, not money', () => {
  const c: JourneyConditions = { objective: 'local', bankReach: 'normal', wallet: 'hosted', offramp: 'none', localRail: 'instant', when: 'weekday', screening: 'clear' };
  const ev = evaluateRoute(routeById('wallet'), c);
  assert.equal(ev.tokenMoved, true);
  assert.equal(ev.result, 'not-met');
  assert.match(ev.headline, /token arrived/i);
});

test('weekend with a business-hours payout system: token arrives, spendable later', () => {
  const c: JourneyConditions = { objective: 'local', bankReach: 'normal', wallet: 'hosted', offramp: 'liquid', localRail: 'hours', when: 'weekend', screening: 'clear' };
  const sandwich = evaluateRoute(routeById('sandwich'), c);
  assert.equal(sandwich.result, 'spendable-later');
  assert.equal(sandwich.tokenMoved, true);
  assert.equal(evaluateRoute(routeById('correspondent'), c).result, 'spendable-later');
});

test('route structure: one customer-facing fee for each provider route; the sandwich adds a conversion', () => {
  const f: FeeInputs = { fxPct: 0.5, fixedGBP: 2, networkGBP: 0.2 };
  const by = Object.fromEntries(ROUTES.map(r => [r.id, summariseRoute(r, f)]));
  assert.equal(by.correspondent.fxConversions, 1);
  assert.equal(by.correspondent.feeHandOffs, 3);
  assert.equal(by.psp.fxConversions, 1);
  assert.equal(by.psp.feeHandOffs, 1);
  assert.equal(by.sandwich.fxConversions, 2);
  assert.equal(by.sandwich.feeHandOffs, 1, 'the partner’s payout cost sits inside the provider’s quote, as with the payment firm');
  assert.equal(by.sandwich.onChainTransfers, 1);
  assert.equal(by.wallet.fxConversions, 2);
  for (const s of Object.values(by)) assert.ok(Math.abs(s.receivedGBP + s.costGBP - SCENARIO.amountGBP) < EPS);
});

test('break-even spread: what the sandwich must achieve to match the payment firm', () => {
  const f: FeeInputs = { fxPct: 0.5, fixedGBP: 2, networkGBP: 0 };
  const be = breakEvenFxPct(routeById('sandwich'), routeById('psp'), f)!;
  // Two conversions must together cost what one does: (1-x)^2 = 0.995.
  assert.ok(Math.abs(be - (1 - Math.sqrt(0.995)) * 100) < 1e-6, `got ${be}`);
  // Three fixed charges can't be overcome by spread alone at these settings.
  assert.equal(breakEvenFxPct(routeById('correspondent'), routeById('psp'), { fxPct: 0, fixedGBP: 30, networkGBP: 0 }), null);
});

test('every step explains at least one layer, and every layer note is non-empty', () => {
  for (const r of ROUTES) {
    for (const s of r.steps) {
      const notes = Object.values(s.layers);
      assert.ok(notes.length > 0, `${r.id}/${s.id}`);
      for (const n of notes) assert.ok(n && n.trim().length > 10, `${r.id}/${s.id}`);
    }
  }
});
