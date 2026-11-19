// The chat context, sources and page stay consistent. Run: cd frontend && npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildChatContext } from '../../src/content/stablecoins/chatContext.ts';
import { SOURCES } from '../../src/content/stablecoins/sources.ts';
import { LENS, WALLET_CASES, RESERVE_MODELS, CHECKS, VOLUME_FLOWS, pegOutcome } from '../../src/content/stablecoins/lenses.ts';
import page from '../../src/content/modules/06-stablecoins.ts';

/** Every reader-visible string on the page, flattened. */
function pageText(): string {
  const out: string[] = [];
  const walk = (v: unknown): void => {
    if (typeof v === 'string') out.push(v.replace(/<[^>]+>/g, ' '));
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk(page.blocks);
  return out.join(' ');
}

const here = dirname(fileURLToPath(import.meta.url));
const committed = resolve(here, '../../../backend/src/main/resources/chat-context/stablecoins.json');

test('the committed chat context matches the model (run npm run chat-context if this fails)', () => {
  const onDisk = JSON.parse(readFileSync(committed, 'utf8'));
  assert.deepEqual(onDisk, JSON.parse(JSON.stringify(buildChatContext())));
});

test('the chat context covers every scene and stays affordable', () => {
  const ctx = buildChatContext();
  for (const scene of ['journey', 'routes', 'liquidity', 'crossledger', 'peg', 'volume', 'controls', 'reserve', 'lens', 'check']) {
    assert.ok(ctx.scenes[scene] && ctx.scenes[scene].length > 200, `missing scene ${scene}`);
  }
  const largestScene = Math.max(...Object.values(ctx.scenes).map(s => s.length));
  const perCall = ctx.overview.length + ctx.sources.length + largestScene;
  assert.ok(perCall < 24000, `a single call would send ${perCall} characters of context`);
});

test('key facts in the assistant’s context match the page’s facts', () => {
  const ctx = buildChatContext();
  for (const fact of ['25 October 2027', '£40bn', '$286.4bn', '2.18%', '£800', '30 September 2026', '84%', 'USD 200']) {
    assert.ok(ctx.overview.includes(fact), `overview lacks ${fact}`);
  }
});

test('every source is https, dated and checked', () => {
  for (const [id, s] of Object.entries(SOURCES)) {
    assert.match(s.url, /^https:\/\//, id);
    assert.ok(s.date.length > 2 && /^2026-11-1\d$/.test(s.checked), id);
  }
});

test('every factual point in the scenes cites at least one source', () => {
  for (const economy of Object.values(LENS)) for (const cell of Object.values(economy)) {
    for (const p of [...cell.gains, ...cell.costs]) assert.ok(p.sources.length > 0, p.text);
  }
  for (const w of Object.values(WALLET_CASES)) assert.ok(w.sources.length > 0, w.label);
  for (const m of RESERVE_MODELS) assert.ok(m.sources.length > 0, m.label);
  for (const f of VOLUME_FLOWS) assert.ok(f.sources.length > 0, f.label);
  for (const r of ['open', 'closed'] as const) for (const t of ['trusted', 'doubted'] as const) {
    assert.ok(pegOutcome({ redemption: r, reserves: t, holder: 'market' }).sources.length > 0);
  }
});

test('scenario checks have one right answer and feedback on every option', () => {
  for (const c of CHECKS) {
    assert.ok(c.correct >= 0 && c.correct < c.options.length, c.id);
    for (const o of c.options) assert.ok(o.feedback.length > 20, `${c.id}: ${o.text}`);
  }
  assert.ok(CHECKS.length >= 6, 'all six acceptance scenarios are covered');
});

test('the page and the assistant state the same key facts', () => {
  const ctx = buildChatContext().overview;
  const text = pageText();
  for (const fact of ['25 October 2027', '£40bn', '$286.4bn', '2.18%', '£800', '6.2%', '3.0%', '$658m', '$409m', '30 September 2026', 'unlikely to be met', '31']) {
    assert.ok(text.includes(fact), `page lacks ${fact}`);
    assert.ok(ctx.includes(fact), `assistant context lacks ${fact}`);
  }
});

test('stale or overstated phrasings appear on neither the page nor in the assistant context', () => {
  const ctx = JSON.stringify(buildChatContext());
  const text = pageText();
  for (const stale of ['will be missed', 'issued by PayPal', '$320', 'closing the gap', 'USDC alone is issued', 'Holders get none']) {
    assert.ok(!text.includes(stale), `page still says "${stale}"`);
    assert.ok(!ctx.includes(stale), `assistant context still says "${stale}"`);
  }
});
