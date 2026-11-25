import { test } from 'node:test';
import assert from 'node:assert/strict';

test('chapter traversal keeps the page, while a different scenario or topic reloads it', async t => {
  const address = new URL('https://example.test/topic/stablecoins#ch-liquidity');
  const visit = (url: string | URL) => { address.href = new URL(url, address).href; };
  const write = (_state: unknown, _title: string, url: string | URL) => visit(url);
  Object.defineProperty(globalThis, 'location', { value: address, configurable: true });
  Object.defineProperty(globalThis, 'history', {
    value: { state: null, pushState: write, replaceState: write }, configurable: true,
  });
  t.after(() => {
    Reflect.deleteProperty(globalThis, 'location');
    Reflect.deleteProperty(globalThis, 'history');
  });
  const { writeHistory, pageChangedOnTraversal } = await import('../../src/utils/navigation.ts');

  writeHistory('#ch-controls');
  visit('#ch-liquidity');
  assert.equal(pageChangedOnTraversal(), false);

  writeHistory('?view=compare#payment-journey');
  writeHistory('?view=compare&scenario=bank-only#payment-journey', 'replace');
  visit('#ch-controls');
  assert.equal(pageChangedOnTraversal(), false);
  visit('?view=wallet#payment-journey');
  assert.equal(pageChangedOnTraversal(), true);
  visit('/topic/gbtd#ch-evidence');
  assert.equal(pageChangedOnTraversal(), true);
});
