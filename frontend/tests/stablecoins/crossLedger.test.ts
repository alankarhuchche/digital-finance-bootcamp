// Invariants for the cross-ledger failure lab. Run: cd frontend && npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  METHODS, AMOUNT, buildScript, startLab, next, retry, current, sendAgain, recipientTotal, booksTotal, openingLiquidity,
  type LabRun,
} from '../../src/content/stablecoins/crossLedger.ts';

const combos = METHODS.flatMap(m => m.faults.map(f => ({ method: m.id, fault: f })));

/** Drive a run to its end, pressing Retry three times whenever a state waits for it. */
function driveToEnd(run: LabRun): LabRun[] {
  const seen: LabRun[] = [run];
  for (let guard = 0; guard < 50; guard++) {
    const st = current(run);
    if (st.terminal) break;
    if (st.awaits) {
      const once = retry(run);
      assert.equal(once.index, run.index + 1, 'a safe retry advances exactly one state');
      if (!current(once).awaits) assert.equal(retry(once).index, once.index, 'a second retry press does nothing');
      run = once;
    } else {
      const moved = next(run);
      assert.notEqual(moved.index, run.index, `stuck at ${st.id}`);
      run = moved;
    }
    seen.push(run);
  }
  assert.ok(current(run).terminal, 'every script ends in a terminal state');
  return seen;
}

test('the bank’s books always account for exactly 100,000', () => {
  for (const { method, fault } of combos) {
    for (const st of buildScript(method, fault)) assert.equal(booksTotal(st.books), AMOUNT, `${method}/${fault}/${st.id}`);
  }
});

test('a payment is never marked complete before destination finality', () => {
  for (const { method, fault } of combos) {
    const script = buildScript(method, fault);
    let finalSeen = false;
    for (const st of script) {
      if (st.destinationFinal) finalSeen = true;
      if (st.books.delivered > 0) assert.ok(finalSeen && st.destinationFinal, `${method}/${fault}/${st.id}`);
    }
  }
});

test('the recipient never receives more than once, however often retry is pressed', () => {
  for (const { method, fault } of combos) {
    for (const r of driveToEnd(startLab(method, fault))) {
      const st = current(r);
      assert.ok(recipientTotal(st.chains) <= AMOUNT, `${method}/${fault}/${st.id}`);
      assert.ok(st.books.delivered <= AMOUNT);
    }
  }
});

test('retry does nothing when there is nothing to retry', () => {
  for (const { method, fault } of combos) {
    const run = startLab(method, fault);
    assert.equal(retry(run).index, run.index, 'retry on a normal state is a no-op');
  }
});

test('blocked, held, exploited or defaulted payments never count as delivered', () => {
  for (const { method, fault } of combos.filter(c => ['frozen', 'bridge-exploit', 'provider-fails'].includes(c.fault))) {
    const script = buildScript(method, fault);
    for (const st of script) assert.equal(st.books.delivered, 0, `${method}/${fault}/${st.id}`);
    const last = script.at(-1)!;
    assert.ok(['stuck', 'held', 'at-risk'].includes(last.outcome), `${method}/${fault} ends ${last.outcome}`);
  }
});

test('burn and mint conserves supply: Chain A + burned-awaiting-mint + Chain B = 100,000', () => {
  for (const fault of METHODS.find(m => m.id === 'burn-mint')!.faults) {
    for (const st of buildScript('burn-mint', fault)) {
      const c = st.chains;
      assert.equal(c.aBank + c.burnedAwaitingMint + c.bNative, AMOUNT, `${fault}/${st.id}`);
    }
  }
});

test('a wrapped token is never minted beyond what the bridge holds, until the bridge is drained', () => {
  for (const fault of METHODS.find(m => m.id === 'lock-mint')!.faults) {
    for (const st of buildScript('lock-mint', fault)) {
      assert.ok(st.chains.bWrapped <= st.chains.aHeld, `${fault}/${st.id}`);
    }
  }
});

test('pool and provider payouts come out of liquidity already on Chain B', () => {
  for (const method of ['pool', 'provider'] as const) {
    for (const fault of METHODS.find(m => m.id === method)!.faults.filter(f => f !== 'pool-short')) {
      for (const st of buildScript(method, fault)) {
        assert.equal(st.chains.bNative + st.chains.bLiquidity, openingLiquidity(method, fault), `${method}/${fault}/${st.id}`);
      }
    }
  }
});

test('a timeout produces an unknown outcome that is resolved by looking it up, not by sending again', () => {
  for (const m of METHODS.filter(x => x.faults.includes('timeout'))) {
    const script = buildScript(m.id, 'timeout');
    const unknown = script.find(s => s.outcome === 'unknown');
    assert.ok(unknown && unknown.awaits, m.id);
    assert.match(unknown!.awaits!.retryLabel, /look up/i);
    assert.match(unknown!.sendAgain, /twice/i);
  }
});

test('every state explains what is known and what is safe, and why sending again is wrong', () => {
  for (const { method, fault } of combos) {
    const run = startLab(method, fault);
    for (const st of run.script) {
      assert.ok(st.known.length > 20 && st.safe.length > 10, `${method}/${fault}/${st.id}`);
      assert.ok(sendAgain({ ...run, index: run.script.indexOf(st) }).length > 10);
    }
  }
});

test('faults that do not apply to a method are rejected', () => {
  assert.throws(() => buildScript('burn-mint', 'pool-short'));
  assert.throws(() => buildScript('provider', 'bridge-exploit'));
});
