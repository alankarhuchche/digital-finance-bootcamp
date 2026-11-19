// crossLedger.ts — "Cross-ledger failure lab".
//
// A bank holds 100,000 dollar stablecoins on Chain A and must pay a recipient on Chain B.
// Four methods, each with the faults that can actually happen to it. Every state shows
// what moved on each chain, what the bank's own books say, what the bank knows, and what
// is safe to do next.
//
// Mechanisms follow public protocol documentation (cited on the page). Amounts are in
// thousands of tokens and are ILLUSTRATIVE. The model teaches reasoning about states; it
// is not a description of any one provider's operating procedures.

export type MethodId = 'burn-mint' | 'lock-mint' | 'pool' | 'provider';
export type FaultId =
  | 'none' | 'slow-attestation' | 'dest-fails' | 'reorg' | 'timeout'
  | 'frozen' | 'pool-short' | 'bridge-exploit' | 'provider-fails';

export const AMOUNT = 100; // thousand tokens

export interface MethodDef {
  id: MethodId;
  name: string;
  short: string;
  how: string;
  /** What the recipient holds on Chain B when it works. */
  recipientHolds: string;
  /** What the bank is trusting beyond the two blockchains. */
  trusts: string;
  faults: FaultId[];
}

export const METHODS: MethodDef[] = [
  {
    id: 'burn-mint', name: 'Issuer burn and mint', short: 'Burn and mint',
    how: 'The issuer’s own protocol destroys tokens on Chain A and, on its signed confirmation, creates the same amount on Chain B.',
    recipientHolds: 'The issuer’s own token on Chain B. Same claim, same issuer.',
    trusts: 'The issuer’s attestation service and contracts on both chains.',
    faults: ['none', 'slow-attestation', 'dest-fails', 'reorg', 'timeout', 'frozen'],
  },
  {
    id: 'lock-mint', name: 'Lock-and-mint bridge', short: 'Bridge (wrapped)',
    how: 'A bridge locks the tokens in its contract on Chain A and mints its own wrapped token on Chain B.',
    recipientHolds: 'The bridge’s wrapped token: a claim on the bridge’s locked tokens, not on the issuer.',
    trusts: 'The bridge’s validators, its code and the safety of its locked funds.',
    faults: ['none', 'slow-attestation', 'dest-fails', 'reorg', 'timeout', 'bridge-exploit'],
  },
  {
    id: 'pool', name: 'Liquidity-pool bridge', short: 'Pool bridge',
    how: 'The bank deposits into a pool on Chain A, and a pool on Chain B releases the same token from its own liquidity.',
    recipientHolds: 'The issuer’s token on Chain B, released from the pool.',
    trusts: 'The pool’s messaging layer and code, and enough liquidity waiting on Chain B.',
    faults: ['none', 'slow-attestation', 'reorg', 'timeout', 'pool-short'],
  },
  {
    id: 'provider', name: 'Provider pays on Chain B', short: 'Provider payout',
    how: 'The bank sends tokens to a provider on Chain A. The provider pays the recipient from its own inventory on Chain B.',
    recipientHolds: 'The issuer’s token on Chain B, from the provider’s inventory.',
    trusts: 'The provider: its solvency, its controls and its inventory on Chain B.',
    faults: ['none', 'timeout', 'provider-fails', 'frozen'],
  },
];

export const FAULTS: Record<FaultId, { label: string; describe: string }> = {
  'none': { label: 'Nothing goes wrong', describe: 'The happy path, for comparison.' },
  'slow-attestation': { label: 'Confirmation is slow', describe: 'The signed confirmation that lets Chain B act is delayed.' },
  'dest-fails': { label: 'Chain B transaction fails', describe: 'The transaction on Chain B fails, for example during congestion.' },
  'reorg': { label: 'Chain A reorganises', describe: 'The block holding the bank’s transaction is dropped before it became final.' },
  'timeout': { label: 'Timeout: outcome unknown', describe: 'The bank’s system times out and doesn’t know whether its transaction went through.' },
  'frozen': { label: 'Recipient blocked', describe: 'The recipient is blocked, by the issuer or by the provider’s screening.' },
  'pool-short': { label: 'Pool runs short', describe: 'The pool on Chain B doesn’t hold enough to release the payment.' },
  'bridge-exploit': { label: 'Bridge is exploited', describe: 'Attackers drain the bridge’s locked funds.' },
  'provider-fails': { label: 'Provider fails', describe: 'The provider stops paying out after receiving the tokens.' },
};

export type Phase = 'start' | 'source' | 'message' | 'destination' | 'books';
export type Outcome = 'pending' | 'unknown' | 'delivered' | 'delivered-wrapped' | 'held' | 'stuck' | 'at-risk';

export interface Books {
  /** Tokens on Chain A, per the bank's treasury ledger. */
  treasury: number;
  /** Committed to this payment, not yet delivered. */
  inTransit: number;
  /** Payment marked complete. */
  delivered: number;
  /** Now a claim on a third party that may not pay. */
  atRisk: number;
}

export interface Chains {
  /** Bank's own wallet on Chain A. */
  aBank: number;
  /** Held by a contract or third party on Chain A: bridge escrow, pool or provider wallet. */
  aHeld: number;
  /** Burned on Chain A and not yet minted on Chain B. */
  burnedAwaitingMint: number;
  /** Recipient's balance of the issuer's token on Chain B. */
  bNative: number;
  /** Recipient's balance of a bridge's wrapped token on Chain B. */
  bWrapped: number;
  /** Pool liquidity or provider inventory on Chain B. */
  bLiquidity: number;
}

export interface LabState {
  id: string;
  phase: Phase;
  label: string;
  happened: string;
  known: string;
  safe: string;
  chains: Chains;
  books: Books;
  /** Chain B has reached finality for the delivery. */
  destinationFinal: boolean;
  outcome: Outcome;
  /** This state waits for the reader to act; only the safe retry moves it on. */
  awaits?: { retryLabel: string; why: string };
  /** Why starting a brand-new transfer here would be wrong. */
  sendAgain: string;
  /** Pending transaction note shown beside balances. */
  pending?: string;
  terminal?: boolean;
}

const SEND_AGAIN_DEFAULT = 'Starting a new transfer while this one is still in progress risks paying twice.';

const books = (b: Partial<Books>): Books => ({ treasury: 0, inTransit: 0, delivered: 0, atRisk: 0, ...b });
const chains = (c: Partial<Chains>, liquidity: number): Chains => ({
  aBank: 0, aHeld: 0, burnedAwaitingMint: 0, bNative: 0, bWrapped: 0, bLiquidity: liquidity, ...c,
});

/** Opening liquidity on Chain B for methods that pay out of someone else's balance. */
export function openingLiquidity(method: MethodId, fault: FaultId): number {
  if (method === 'pool') return fault === 'pool-short' ? 40 : 250;
  if (method === 'provider') return 400;
  return 0;
}

/** Build the ordered sequence of states for a method and fault. */
export function buildScript(method: MethodId, fault: FaultId): LabState[] {
  const def = METHODS.find(m => m.id === method);
  if (!def) throw new Error(`Unknown method ${method}`);
  if (!def.faults.includes(fault)) throw new Error(`Fault ${fault} does not apply to ${method}`);
  const liq = openingLiquidity(method, fault);
  const L = (c: Partial<Chains>) => chains(c, liq);
  const s: LabState[] = [];

  s.push({
    id: 'ready', phase: 'start', label: 'Ready',
    happened: 'The bank holds 100,000 tokens on Chain A and must pay a recipient whose wallet is on Chain B.',
    known: 'The wallet on Chain A matches the treasury ledger.',
    safe: 'Start the transfer once, under a unique payment reference.',
    chains: L({ aBank: AMOUNT }), books: books({ treasury: AMOUNT }),
    destinationFinal: false, outcome: 'pending', sendAgain: 'Nothing has been sent yet.',
  });

  const sourceVerb = { 'burn-mint': 'a burn', 'lock-mint': 'a lock in the bridge contract', pool: 'a deposit into the pool', provider: 'a transfer to the provider' }[method];
  const submitted: LabState = {
    id: 'source-submitted', phase: 'source', label: 'Sent on Chain A',
    happened: `The bank signs and broadcasts ${sourceVerb} of 100,000 tokens, naming the recipient’s address on Chain B.`,
    known: 'The transaction is pending. It is not yet in a final block. The bank has moved the 100,000 to an in-transit account on its books.',
    safe: 'Record the transaction hash and nonce, then wait for finality on Chain A.',
    chains: L({ aBank: AMOUNT }), books: books({ inTransit: AMOUNT }),
    destinationFinal: false, outcome: 'pending', pending: 'Pending on Chain A: −100k from the bank’s wallet.',
    sendAgain: 'A second transaction with a new nonce could also be included: 200,000 would leave for a 100,000 payment.',
  };
  s.push(submitted);

  // Faults that strike before Chain A is final.
  if (fault === 'reorg') {
    s.push({
      id: 'reorged', phase: 'source', label: 'Dropped in a reorg',
      happened: 'The block holding the transaction is dropped in a reorganisation before it became final. The transaction is no longer in the chain.',
      known: 'The tokens are back in the bank’s wallet on Chain A, but the books still show them in transit. Reconciliation has to explain the difference by the dropped transaction.',
      safe: 'Rebroadcast the same signed transaction, with the same nonce. Only one version can ever be included.',
      chains: L({ aBank: AMOUNT }), books: books({ inTransit: AMOUNT }),
      destinationFinal: false, outcome: 'pending',
      awaits: { retryLabel: 'Rebroadcast the same transaction', why: 'Same signature, same nonce: at most one copy can be included.' },
      sendAgain: 'Signing a fresh transaction with a new nonce risks both being included later.',
    });
    s.push({ ...submitted, id: 'rebroadcast', label: 'Rebroadcast', happened: 'The bank rebroadcasts the same signed transaction. It is pending again.' });
  }
  if (fault === 'timeout') {
    s.push({
      id: 'unknown', phase: 'source', label: 'Outcome unknown',
      happened: 'The bank’s system times out waiting for its node. It does not know whether the transaction was included.',
      known: 'Unknown. The transaction may be pending, final or dropped.',
      safe: 'Look the transaction up by its hash and nonce before doing anything else.',
      chains: L({ aBank: AMOUNT }), books: books({ inTransit: AMOUNT }),
      destinationFinal: false, outcome: 'unknown', pending: 'Status unknown on Chain A.',
      awaits: { retryLabel: 'Look up the transaction', why: 'A lookup changes nothing on-chain. It only tells you the truth.' },
      sendAgain: 'Sending again on a timeout is how payments get made twice. Find out first.',
    });
  }

  // Source final.
  const finalA: Record<MethodId, Partial<Chains>> = {
    'burn-mint': { burnedAwaitingMint: AMOUNT },
    'lock-mint': { aHeld: AMOUNT },
    pool: { aHeld: AMOUNT },
    provider: { aHeld: AMOUNT },
  };
  const finalAText: Record<MethodId, { happened: string; known: string; safe: string }> = {
    'burn-mint': {
      happened: fault === 'timeout' ? 'The lookup shows the burn was included and is now final on Chain A.' : 'The burn is final on Chain A. Those tokens no longer exist there.',
      known: 'Value has left Chain A and does not yet exist on Chain B. Only the issuer’s signed confirmation can create it there.',
      safe: 'Wait for the issuer’s attestation. Keep the 100,000 in transit.',
    },
    'lock-mint': {
      happened: fault === 'timeout' ? 'The lookup shows the lock was included and is now final.' : 'The tokens are locked in the bridge’s contract on Chain A, and the lock is final.',
      known: 'The tokens still exist, but only the bridge’s contract controls them now.',
      safe: 'Wait for the bridge’s validators to confirm the lock to Chain B.',
    },
    pool: {
      happened: fault === 'timeout' ? 'The lookup shows the deposit was included and is now final.' : 'The deposit into the pool on Chain A is final.',
      known: 'The pool now owes a release on Chain B, paid from the liquidity it holds there.',
      safe: 'Wait for the pool’s messaging layer to confirm the deposit on Chain B.',
    },
    provider: {
      happened: fault === 'timeout' ? 'The lookup shows the transfer reached the provider and is final.' : 'The transfer to the provider’s wallet is final on Chain A.',
      known: 'The provider holds the bank’s 100,000 and owes a payout on Chain B. Until it pays, this is exposure to the provider.',
      safe: 'Wait for the provider to confirm the order on its own ledger.',
    },
  };
  s.push({
    id: 'source-final', phase: 'source', label: 'Final on Chain A',
    ...finalAText[method],
    chains: L(finalA[method]), books: books({ inTransit: AMOUNT }),
    destinationFinal: false, outcome: 'pending',
    sendAgain: method === 'burn-mint' ? 'Burning again would destroy another 100,000 on Chain A.' : SEND_AGAIN_DEFAULT,
  });

  // Provider-specific failure after it holds the funds.
  if (method === 'provider' && fault === 'provider-fails') {
    s.push({
      id: 'provider-default', phase: 'destination', label: 'Provider stops paying',
      happened: 'The provider stops processing and does not pay out, for example because it has become insolvent.',
      known: 'The 100,000 sits in a wallet the provider controls. The bank has a claim on the provider that may be paid late, in part, or not at all.',
      safe: 'Treat it as a credit exposure: escalate, lodge the claim, and do not send again. The payment is not complete.',
      chains: L({ aHeld: AMOUNT }), books: books({ atRisk: AMOUNT }),
      destinationFinal: false, outcome: 'at-risk', terminal: true,
      sendAgain: 'Sending again would pay the recipient from fresh funds while the first 100,000 is still a claim. Decide that deliberately, not as a retry.',
    });
    return s;
  }

  // Message / confirmation phase.
  const messageText: Record<MethodId, { label: string; happened: string; known: string; safe: string }> = {
    'burn-mint': {
      label: 'Attested', happened: 'The issuer’s attestation service signs a message confirming the burn.',
      known: 'A signed message exists that allows a mint of 100,000 on Chain B, once.',
      safe: 'Submit the signed message to the issuer’s contract on Chain B. Anyone can submit it, and it can only be used once.',
    },
    'lock-mint': {
      label: 'Relayed', happened: 'The bridge’s validators sign a message confirming the lock.',
      known: 'From here the bank is trusting the bridge’s validators and code, not the issuer.',
      safe: 'Submit, or wait for, the mint of the bridge’s token on Chain B.',
    },
    pool: {
      label: 'Relayed', happened: 'The pool’s messaging layer confirms the deposit to Chain B.',
      known: 'The pool on Chain B is now instructed to release 100,000 from its liquidity.',
      safe: 'Wait for the release on Chain B.',
    },
    provider: {
      label: 'Order confirmed', happened: 'The provider confirms the order on its own ledger.',
      known: 'The provider has acknowledged it owes the payout. That is a promise, not a delivery.',
      safe: 'Wait for the provider’s payout transaction on Chain B.',
    },
  };

  if (fault === 'slow-attestation') {
    s.push({
      id: 'message-wait', phase: 'message', label: 'Waiting for confirmation',
      happened: 'An hour passes and no signed confirmation has appeared.',
      known: method === 'burn-mint'
        ? 'The burn is final, so nothing can be minted until the issuer signs. The value is in limbo, not lost.'
        : 'Chain A is final, but Chain B can’t act until the confirmation arrives. The funds are held, not lost.',
      safe: 'Keep checking the status using the transaction’s reference. Escalate to the operator if it stays stuck.',
      chains: L(finalA[method]), books: books({ inTransit: AMOUNT }),
      destinationFinal: false, outcome: 'pending',
      awaits: { retryLabel: 'Check the status again', why: 'Checking status changes nothing. It is always safe.' },
      sendAgain: 'A new transfer would not speed this up. It would put a second 100,000 into the same queue.',
    });
  }

  const msg = messageText[method];
  s.push({
    id: 'message', phase: 'message', label: msg.label, happened: msg.happened, known: msg.known, safe: msg.safe,
    chains: L(finalA[method]), books: books({ inTransit: AMOUNT }),
    destinationFinal: false, outcome: 'pending', sendAgain: SEND_AGAIN_DEFAULT,
  });

  if (method === 'lock-mint' && fault === 'bridge-exploit') {
    s.push({
      id: 'exploited', phase: 'message', label: 'Bridge drained',
      happened: 'Attackers drain the bridge’s locked funds on Chain A and the bridge halts.',
      known: 'The 100,000 locked by the bank is gone from the escrow. Nothing will be minted on Chain B. What remains is a claim on the bridge operator’s recovery, if there is one.',
      safe: 'No retry fixes a drained bridge. Escalate, record the loss exposure and do not mark the payment complete.',
      chains: L({ aHeld: 0 }), books: books({ atRisk: AMOUNT }),
      destinationFinal: false, outcome: 'at-risk', terminal: true,
      sendAgain: 'Paying again from fresh funds is a business decision about the loss, not a retry.',
    });
    return s;
  }

  if (method === 'provider' && fault === 'frozen') {
    s.push({
      id: 'provider-hold', phase: 'destination', label: 'Held by the provider',
      happened: 'The provider’s screening flags the recipient and holds the payout for review.',
      known: 'The provider holds the bank’s 100,000. The payout may be released, returned or reported, depending on the review.',
      safe: 'Answer the provider’s questions through compliance. Do not mark the payment complete.',
      chains: L(finalA[method]), books: books({ inTransit: AMOUNT }),
      destinationFinal: false, outcome: 'held', terminal: true,
      sendAgain: 'Routing around a compliance hold, through another provider or a fresh transfer, is not a retry. It may be an offence.',
    });
    return s;
  }

  if (method === 'pool' && fault === 'pool-short') {
    s.push({
      id: 'pool-short', phase: 'destination', label: 'Pool short',
      happened: 'The pool on Chain B holds only 40,000 and cannot release 100,000.',
      known: 'The bank’s tokens are in the pool on Chain A. The release waits until Chain B is rebalanced, or the pool’s refund process is used.',
      safe: 'Wait, or follow the pool’s documented refund process. Don’t send again.',
      chains: L(finalA[method]), books: books({ inTransit: AMOUNT }),
      destinationFinal: false, outcome: 'pending',
      awaits: { retryLabel: 'Check the pool again', why: 'Checking is safe. Liquidity providers refill the pool when the price is worth it.' },
      sendAgain: 'A second deposit would join the same queue for the same thin pool.',
    });
  }

  // Destination submission.
  const destVerb = { 'burn-mint': 'mint', 'lock-mint': 'wrapped-token mint', pool: 'release', provider: 'payout' }[method];
  const destSubmitted: LabState = {
    id: 'dest-submitted', phase: 'destination', label: 'Submitted on Chain B',
    happened: `The ${destVerb} transaction is submitted on Chain B.`,
    known: 'Pending on Chain B. Nothing has reached the recipient yet.',
    safe: 'Wait for finality on Chain B before telling anyone the payment is complete.',
    chains: L(finalA[method]), books: books({ inTransit: AMOUNT }),
    destinationFinal: false, outcome: 'pending', pending: `Pending on Chain B: +100k to the recipient.`,
    sendAgain: SEND_AGAIN_DEFAULT,
  };
  if (method === 'pool' && fault === 'pool-short') destSubmitted.chains = { ...destSubmitted.chains, bLiquidity: 160 };
  s.push(destSubmitted);

  if (fault === 'frozen' && method === 'burn-mint') {
    s.push({
      id: 'frozen', phase: 'destination', label: 'Recipient blocked',
      happened: 'The issuer has blocked the recipient’s address on Chain B, for example under a sanctions or law-enforcement order. The mint to that address fails.',
      known: 'The burn on Chain A is final and nothing has been minted. Resubmitting will fail the same way. What happens to the burned value depends on the issuer’s process.',
      safe: 'Stop. Escalate to compliance and to the issuer. Do not retry to the same address and do not mark the payment complete.',
      chains: L(finalA[method]), books: books({ inTransit: AMOUNT }),
      destinationFinal: false, outcome: 'stuck', terminal: true,
      sendAgain: 'Sending to a different address to get around a block is evasion, not a retry.',
    });
    return s;
  }

  if (fault === 'dest-fails') {
    s.push({
      id: 'dest-failed', phase: 'destination', label: 'Failed on Chain B',
      happened: 'The transaction on Chain B fails, for example because it ran out of gas during congestion. Nothing was delivered.',
      known: method === 'burn-mint'
        ? 'The signed message is still unused and the burn on Chain A is still final.'
        : 'The bridge message is still unused and the lock on Chain A is still final.',
      safe: 'Resubmit the same signed message. The contract accepts each message only once, so this cannot deliver twice.',
      chains: L(finalA[method]), books: books({ inTransit: AMOUNT }),
      destinationFinal: false, outcome: 'pending',
      awaits: { retryLabel: 'Resubmit the same message', why: 'Each message has a one-time identifier. A second use is rejected.' },
      sendAgain: method === 'burn-mint'
        ? 'A fresh burn would leave 200,000 burned for a 100,000 payment.'
        : 'A fresh lock would put a second 100,000 into the bridge.',
    });
    s.push({ ...destSubmitted, id: 'dest-resubmitted', label: 'Resubmitted', happened: 'The same signed message is submitted again on Chain B.' });
  }

  // Destination final.
  const deliveredChains: Record<MethodId, Partial<Chains>> = {
    'burn-mint': { bNative: AMOUNT },
    'lock-mint': { aHeld: AMOUNT, bWrapped: AMOUNT },
    pool: { aHeld: AMOUNT, bNative: AMOUNT, bLiquidity: (method === 'pool' && fault === 'pool-short' ? 160 : liq) - AMOUNT },
    provider: { aHeld: AMOUNT, bNative: AMOUNT, bLiquidity: liq - AMOUNT },
  };
  const wrapped = method === 'lock-mint';
  s.push({
    id: 'dest-final', phase: 'destination', label: 'Final on Chain B',
    happened: wrapped
      ? 'The bridge mints 100,000 of its wrapped token to the recipient, and the block is final.'
      : 'The recipient receives 100,000 of the issuer’s token on Chain B, and the block is final.',
    known: wrapped
      ? 'The recipient holds the bridge’s token, a claim on the tokens locked on Chain A. It is a different asset from the issuer’s token and may not be accepted where the issuer’s token is.'
      : method === 'burn-mint'
        ? 'Supply moved from Chain A to Chain B. It did not double.'
        : 'The recipient has the issuer’s token, released from someone else’s liquidity on Chain B.',
    safe: 'Now, and not before, close the in-transit entry.',
    chains: L(deliveredChains[method]), books: books({ inTransit: AMOUNT }),
    destinationFinal: true, outcome: 'pending', sendAgain: 'The payment has arrived. Sending again would pay twice.',
  });

  s.push({
    id: 'complete', phase: 'books', label: 'Books closed',
    happened: 'The bank moves the 100,000 from in-transit to paid and marks the payment complete.',
    known: wrapped
      ? 'Chain A escrow, Chain B wrapped balance and the bank’s books reconcile. The recipient’s asset depends on the bridge staying solvent.'
      : 'Chain A, Chain B and the bank’s books reconcile.',
    safe: 'Keep the evidence: both transaction hashes, the confirmation and the reconciliation.',
    chains: L(deliveredChains[method]), books: books({ delivered: AMOUNT }),
    destinationFinal: true, outcome: wrapped ? 'delivered-wrapped' : 'delivered', terminal: true,
    sendAgain: 'The payment is complete. Sending again would pay twice.',
  });

  return s;
}

// ── A small reducer the page drives. Retry is idempotent by construction. ──────

export interface LabRun {
  method: MethodId;
  fault: FaultId;
  script: LabState[];
  index: number;
}

export function startLab(method: MethodId, fault: FaultId): LabRun {
  return { method, fault, script: buildScript(method, fault), index: 0 };
}

export const current = (run: LabRun): LabState => run.script[run.index];

/** Advance one event, unless the current state waits for the reader or is terminal. */
export function next(run: LabRun): LabRun {
  const st = current(run);
  if (st.awaits || st.terminal || run.index >= run.script.length - 1) return run;
  return { ...run, index: run.index + 1 };
}

/** Perform the safe retry offered by the current state. Calling it again is a no-op. */
export function retry(run: LabRun): LabRun {
  const st = current(run);
  if (!st.awaits || run.index >= run.script.length - 1) return run;
  return { ...run, index: run.index + 1 };
}

/** The model never executes a second transfer. It explains why not. */
export function sendAgain(run: LabRun): string {
  return current(run).sendAgain;
}

/** Recipient's total holdings on Chain B for this payment, native plus wrapped. */
export const recipientTotal = (c: Chains): number => c.bNative + c.bWrapped;

export function booksTotal(b: Books): number {
  return b.treasury + b.inTransit + b.delivered + b.atRisk;
}
