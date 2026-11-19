// Behaviour of the operating-model selector. Run: cd frontend && npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assessAll, MODELS, DEFAULT_ROUTE_INPUTS, type RouteInputs } from '../../src/content/stablecoins/routes.ts';

const fitOf = (i: RouteInputs, id: string) => assessAll(i).find(x => x.model.id === id)!.fit;

test('acceptance 1: bank-account-only supplier in a thin corridor', () => {
  const i: RouteInputs = { ...DEFAULT_ROUTE_INPUTS, payeeHas: 'bank', payeeWants: 'local', corridor: 'thin' };
  assert.equal(fitOf(i, 'wallet-custodial'), 'poor');
  assert.equal(fitOf(i, 'unhosted'), 'poor');
  assert.equal(fitOf(i, 'managed'), 'poor', 'no licensed off-ramp means the stablecoin route cannot be assumed');
  assert.equal(fitOf(i, 'correspondent'), 'fits');
  assert.equal(fitOf(i, 'psp'), 'fits', 'thin crypto off-ramps say nothing about fiat payout');
});

test('a served corridor makes the managed stablecoin route conditional for a payer holding pounds', () => {
  const i: RouteInputs = { ...DEFAULT_ROUTE_INPUTS, corridor: 'served' };
  assert.equal(fitOf(i, 'managed'), 'conditional');
  assert.equal(fitOf(i, 'psp'), 'fits');
});

test('where banks have left, the bank rails fail and a licensed off-ramp route fits', () => {
  const i: RouteInputs = { ...DEFAULT_ROUTE_INPUTS, bankReach: 'withdrawn', corridor: 'served' };
  assert.equal(fitOf(i, 'correspondent'), 'poor');
  assert.equal(fitOf(i, 'psp'), 'poor');
  assert.equal(fitOf(i, 'managed'), 'fits');
});

test('a payer already holding stablecoins makes the managed route fit', () => {
  assert.equal(fitOf({ ...DEFAULT_ROUTE_INPUTS, payerHolds: 'stablecoin' }, 'managed'), 'fits');
});

test('stablecoins can complement fiat rails: a payment firm’s own treasury leg', () => {
  assert.equal(fitOf({ ...DEFAULT_ROUTE_INPUTS, anyTime: true }, 'psp-treasury'), 'fits');
});

test('a payee who wants dollars in a custodial wallet fits wallet to wallet at any hour', () => {
  const i: RouteInputs = { ...DEFAULT_ROUTE_INPUTS, payeeHas: 'wallet', payeeWants: 'dollars', payerHolds: 'stablecoin', anyTime: true };
  assert.equal(fitOf(i, 'wallet-custodial'), 'fits');
  assert.equal(fitOf(i, 'correspondent'), 'poor');
});

test('shared platforms and bank networks are recognised', () => {
  assert.equal(fitOf({ ...DEFAULT_ROUTE_INPUTS, shared: 'platform' }, 'same-platform'), 'fits');
  assert.equal(fitOf({ ...DEFAULT_ROUTE_INPUTS, shared: 'bank-network' }, 'bank-token'), 'fits');
  assert.equal(fitOf(DEFAULT_ROUTE_INPUTS, 'bank-token'), 'poor');
});

test('every model gives at least one reason for every combination, and results are sorted by fit', () => {
  const rank = { fits: 0, conditional: 1, poor: 2 } as const;
  for (const payer of ['business', 'person', 'bank'] as const)
    for (const payeeHas of ['bank', 'wallet', 'both'] as const)
      for (const payeeWants of ['local', 'dollars'] as const)
        for (const payerHolds of ['fiat', 'stablecoin'] as const)
          for (const shared of ['none', 'platform', 'bank-network'] as const)
            for (const anyTime of [false, true])
              for (const corridor of ['served', 'thin'] as const)
                for (const bankReach of ['normal', 'withdrawn'] as const) {
                const res = assessAll({ payer, payeeHas, payeeWants, payerHolds, shared, anyTime, corridor, bankReach });
                assert.equal(res.length, MODELS.length);
                for (let k = 1; k < res.length; k++) assert.ok(rank[res[k - 1].fit] <= rank[res[k].fit]);
                for (const r of res) assert.ok(r.because.length > 0 && r.because.every(b => b.length > 10), r.model.id);
              }
});
