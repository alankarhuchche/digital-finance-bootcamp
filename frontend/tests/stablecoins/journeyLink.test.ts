import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CORRIDOR_PRESETS, DEFAULT_CONDITIONS, DEFAULT_FEES, ROUTES } from '../../src/content/stablecoins/journey.ts';
import { readJourneySelection, writeJourneySelection, type JourneySelection } from '../../src/content/stablecoins/journeyLink.ts';

test('named scenarios round-trip on every route and in the four-way comparison', () => {
  const views = [...ROUTES.map(r => r.id), 'compare' as const];
  for (const preset of CORRIDOR_PRESETS) {
    for (const view of views) {
      const selection: JourneySelection = { view, conditions: preset.conditions, fees: DEFAULT_FEES, step: 0 };
      const query = new URLSearchParams();
      writeJourneySelection(query, selection);
      assert.equal(query.get('scenario'), preset.id);
      assert.deepEqual(readJourneySelection(query), selection);
    }
  }
});

test('a custom comparison replaces old settings and preserves unrelated query parameters', () => {
  const query = new URLSearchParams('view=wallet&scenario=bank-only&step=4&fixedGBP=17&ref=mail');
  const selection: JourneySelection = {
    view: 'compare', conditions: { ...DEFAULT_CONDITIONS, localRail: 'hours', when: 'evening', offramp: 'thin' },
    fees: { ...DEFAULT_FEES, fxPct: 1.2, networkGBP: 0 }, step: 0,
  };
  writeJourneySelection(query, selection);
  assert.deepEqual(readJourneySelection(query), selection);
  assert.equal(query.get('ref'), 'mail');
  for (const key of ['scenario', 'fixedGBP', 'step']) assert.equal(query.has(key), false);
});

test('a selected step and an override of a preset survive a fresh link', () => {
  const query = new URLSearchParams('view=psp&scenario=bank-only&when=weekend&step=2');
  const selection = readJourneySelection(query);
  assert.equal(selection.conditions.wallet, 'none');
  assert.equal(selection.conditions.when, 'weekend');
  assert.equal(selection.step, 2);
  writeJourneySelection(query, selection);
  assert.deepEqual(readJourneySelection(query), selection);
});

test('old and malformed links open with usable defaults', () => {
  const defaults = { view: 'sandwich', conditions: DEFAULT_CONDITIONS, fees: DEFAULT_FEES, step: 0 };
  assert.deepEqual(readJourneySelection(new URLSearchParams()), defaults);
  const invalid = new URLSearchParams('view=wrong&scenario=unknown&when=midnight&step=-4&fixedGBP=-2&fxPct=Infinity&networkGBP=oops');
  assert.deepEqual(readJourneySelection(invalid), defaults);
  assert.equal(readJourneySelection(new URLSearchParams('view=compare&step=3')).step, 0);
});
