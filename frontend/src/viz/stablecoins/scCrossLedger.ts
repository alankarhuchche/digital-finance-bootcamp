// scCrossLedger.ts — "Cross-ledger failure lab".
// Pick a method and a fault, step through events, retry safely, and watch Chain A, Chain B
// and the bank's own books stay reconciled (or show exactly why they can't).

import {
  METHODS, FAULTS, AMOUNT, startLab, next, retry, current, sendAgain,
  type MethodId, type FaultId, type LabRun, type LabState, type Phase,
} from '../../content/stablecoins/crossLedger.ts';
import { liveRegion, announce, askButton, bindAsk, esc, nextId } from './ui.ts';

const PHASES: { id: Phase; label: string }[] = [
  { id: 'start', label: 'Ready' },
  { id: 'source', label: 'Chain A' },
  { id: 'message', label: 'Confirmation' },
  { id: 'destination', label: 'Chain B' },
  { id: 'books', label: 'Books' },
];

const OUTCOME_TEXT: Record<LabState['outcome'], string> = {
  pending: 'In progress', unknown: 'Outcome unknown', delivered: 'Delivered',
  'delivered-wrapped': 'Delivered as a wrapped token', held: 'Held', stuck: 'Stuck', 'at-risk': 'At risk',
};
const OUTCOME_TONE: Record<LabState['outcome'], string> = {
  pending: 'waits', unknown: 'held', delivered: 'done', 'delivered-wrapped': 'waits', held: 'held', stuck: 'blocked', 'at-risk': 'blocked',
};

export function renderCrossLedger(mount: HTMLElement): void {
  mount.classList.add('block-wide');
  let method: MethodId = 'burn-mint';
  let fault: FaultId = 'timeout';
  let run: LabRun = startLab(method, fault);
  let warning = '';
  const faultGroup = nextId('fault');

  mount.innerHTML = `
  <div class="sc sc-xl cq" data-scene="crossledger">
    <div class="sc-head">
      <p class="sc-contract"><span class="sc-tag">Scenario</span>
        A bank holds <b>100,000</b> dollar stablecoins on Chain A. It must pay a recipient whose wallet is on Chain B.
        Pick a method, break something, and decide what is safe to do next.</p>
      ${askButton('Ask about this scene')}
    </div>
    <div class="sc-routes" role="group" aria-label="Method">
      ${METHODS.map(m => `<button type="button" class="sc-route-btn" data-method="${m.id}" aria-pressed="${m.id === method}">${esc(m.short)}</button>`).join('')}
    </div>
    <p class="sc-route-line" data-method-line></p>
    <fieldset class="sc-faults">
      <legend class="sc-seg-legend">What goes wrong</legend>
      <div class="sc-fault-list" data-faults></div>
    </fieldset>
    <ol class="sc-phases" data-phases aria-label="Where the transfer is"></ol>
    <div class="sc-xl-grid">
      <section class="sc-step-card" aria-label="Current event">
        <p class="sc-step-count" data-count></p>
        <h4 class="sc-step-title" data-label></h4>
        <p class="sc-step-detail" data-happened></p>
        <dl class="sc-know">
          <div><dt>What the bank knows</dt><dd data-known></dd></div>
          <div><dt>Safe now</dt><dd data-safe></dd></div>
        </dl>
        <div class="sc-controls" role="group" aria-label="Act">
          <button type="button" class="sc-btn sc-btn--primary" data-act="next">Next event ▶</button>
          <button type="button" class="sc-btn" data-act="retry" hidden></button>
          <button type="button" class="sc-btn sc-btn--danger" data-act="again">Send it again?</button>
          <button type="button" class="sc-btn sc-btn--quiet" data-act="reset">Reset</button>
        </div>
        <p class="sc-warning" data-warning role="alert" hidden></p>
      </section>
      <section class="sc-recon" aria-label="Balances and books" data-recon></section>
    </div>
    <ol class="sc-log" data-log aria-label="Events so far"></ol>
    ${liveRegion()}
  </div>`;

  const root = mount.querySelector<HTMLElement>('.sc-xl')!;
  const q = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;

  bindAsk(root, 'crossledger', () => {
    const st = current(run);
    return `In the cross-ledger failure lab, using ${METHODS.find(m => m.id === method)!.name.toLowerCase()} with "${FAULTS[fault].label.toLowerCase()}", the state is "${st.label}". What does the bank know, and why is sending again unsafe?`;
  });

  function renderFaults(): void {
    const m = METHODS.find(x => x.id === method)!;
    if (!m.faults.includes(fault)) fault = 'none';
    q('[data-faults]').innerHTML = m.faults.map(f => `
      <label class="sc-fault${f === fault ? ' is-on' : ''}">
        <input type="radio" name="${faultGroup}" value="${f}"${f === fault ? ' checked' : ''} />
        <span class="sc-fault-name">${esc(FAULTS[f].label)}</span>
        <span class="sc-fault-desc">${esc(FAULTS[f].describe)}</span>
      </label>`).join('');
    q('[data-method-line]').innerHTML = `<b>${esc(m.name)}.</b> ${esc(m.how)} <span class="sc-trust">Recipient ends up holding: ${esc(m.recipientHolds)} Trusts: ${esc(m.trusts)}</span>`;
  }

  function render(): void {
    const st = current(run);
    const phaseIdx = PHASES.findIndex(p => p.id === st.phase);
    q('[data-phases]').innerHTML = PHASES.map((p, i) => `
      <li class="sc-phase${i < phaseIdx ? ' is-past' : ''}${i === phaseIdx ? ` is-now sc-phase--${OUTCOME_TONE[st.outcome]}` : ''}">
        <span class="sc-phase-dot" aria-hidden="true"></span><span>${p.label}</span>${i === phaseIdx ? '<span class="sr-only"> (current)</span>' : ''}
      </li>`).join('');
    q('[data-count]').innerHTML = `Event ${run.index + 1} of ${run.script.length} · <span class="sc-pill sc-pill--${OUTCOME_TONE[st.outcome]}">${OUTCOME_TEXT[st.outcome]}</span>`;
    q('[data-label]').textContent = st.label;
    q('[data-happened]').textContent = st.happened;
    q('[data-known]').textContent = st.known;
    q('[data-safe]').textContent = st.safe;

    const nextBtn = q<HTMLButtonElement>('[data-act="next"]');
    nextBtn.disabled = Boolean(st.awaits) || Boolean(st.terminal);
    nextBtn.textContent = st.terminal ? 'End of this story' : st.awaits ? 'Nothing happens until you act' : 'Next event ▶';
    const retryBtn = q<HTMLButtonElement>('[data-act="retry"]');
    retryBtn.hidden = !st.awaits;
    if (st.awaits) {
      retryBtn.textContent = `${st.awaits.retryLabel} ↻`;
      retryBtn.title = st.awaits.why;
    }
    const warn = q('[data-warning]');
    warn.hidden = !warning;
    warn.textContent = warning;

    q('[data-recon]').innerHTML = reconHtml(st);
    q('[data-log]').innerHTML = run.script.slice(0, run.index + 1).map((s, i) =>
      `<li class="${i === run.index ? 'is-now' : ''}"><span class="sc-log-n">${i + 1}</span> ${esc(s.label)}</li>`).join('');
  }

  const say = () => {
    const st = current(run);
    announce(root, `${st.label}. ${st.happened} ${st.awaits ? 'Waiting for you to act.' : ''}`);
  };

  root.querySelectorAll<HTMLButtonElement>('[data-method]').forEach(b => b.addEventListener('click', () => {
    method = b.dataset.method as MethodId;
    root.querySelectorAll<HTMLButtonElement>('[data-method]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    renderFaults();
    run = startLab(method, fault);
    warning = '';
    render();
    say();
  }));
  q('[data-faults]').addEventListener('change', e => {
    fault = (e.target as HTMLInputElement).value as FaultId;
    root.querySelectorAll('.sc-fault').forEach(l => l.classList.toggle('is-on', (l.querySelector('input') as HTMLInputElement).checked));
    run = startLab(method, fault);
    warning = '';
    render();
    say();
  });
  q('[data-act="next"]').addEventListener('click', () => { warning = ''; run = next(run); render(); say(); });
  q('[data-act="retry"]').addEventListener('click', () => { warning = ''; run = retry(run); render(); say(); q<HTMLButtonElement>('[data-act="next"]').focus(); });
  q('[data-act="again"]').addEventListener('click', () => { warning = `Don’t. ${sendAgain(run)}`; render(); });
  q('[data-act="reset"]').addEventListener('click', () => { warning = ''; run = startLab(method, fault); render(); say(); });

  renderFaults();
  render();
}

function reconHtml(st: LabState): string {
  const c = st.chains;
  const b = st.books;
  const v = (n: number) => `${n.toLocaleString('en-GB')}k`;
  const row = (label: string, value: number, note = '', tone = '') => `
    <tr class="${value ? 'has-value' : ''}${tone ? ` sc-tone--${tone}` : ''}">
      <th scope="row">${esc(label)}${note ? `<span class="sc-recon-note">${esc(note)}</span>` : ''}</th>
      <td><span class="sc-recon-bar" style="--w:${Math.min(100, (value / AMOUNT) * 100)}%"></span><span class="sc-recon-v">${v(value)}</span></td>
    </tr>`;
  return `
    <table class="sc-recon-table">
      <caption>Chain A</caption>
      <tbody>
        ${row('Bank’s wallet', c.aBank, st.pending && st.phase === 'source' ? st.pending : '')}
        ${row('Held by a contract or provider', c.aHeld)}
        ${row('Burned, awaiting mint', c.burnedAwaitingMint, '', c.burnedAwaitingMint ? 'waits' : '')}
      </tbody>
    </table>
    <table class="sc-recon-table">
      <caption>Chain B</caption>
      <tbody>
        ${row('Recipient: issuer’s token', c.bNative, st.pending && st.phase === 'destination' ? st.pending : '', c.bNative ? 'done' : '')}
        ${row('Recipient: bridge’s wrapped token', c.bWrapped, c.bWrapped ? 'A claim on the bridge, not the issuer' : '', c.bWrapped ? 'waits' : '')}
        ${c.bLiquidity ? row('Pool or provider liquidity', c.bLiquidity) : ''}
      </tbody>
    </table>
    <table class="sc-recon-table">
      <caption>Bank’s books</caption>
      <tbody>
        ${row('Treasury: tokens on Chain A', b.treasury)}
        ${row('In transit', b.inTransit, b.inTransit ? 'Committed, not delivered' : '', b.inTransit ? 'waits' : '')}
        ${row('Paid', b.delivered, '', b.delivered ? 'done' : '')}
        ${row('Claim on a third party', b.atRisk, b.atRisk ? 'May not be repaid' : '', b.atRisk ? 'blocked' : '')}
      </tbody>
    </table>
    <p class="sc-note">Books always total 100k. The payment counts as paid only after Chain B is final${st.destinationFinal ? ' — it is now.' : ', which it isn’t yet.'}</p>`;
}
