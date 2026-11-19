// scLiquidity.ts — "Liquidity control room".
// Rows are invoices, columns are time slots across a weekend. The reader pulls levers and
// sees which payments wait, why, and what each fix costs.

import {
  runLiquidity, SLOTS, SLOT_NOTES, PARAMS, PAYMENTS, DEFAULT_LIQUIDITY, slotLabel,
  type LiquidityInputs, type LiquidityRun, type PaymentState,
} from '../../content/stablecoins/liquidity.ts';
import { segmented, readSeg, writeSeg, liveRegion, announce, askButton, bindAsk, esc, fmtK, basis } from './ui.ts';

const STAGE_LABEL: Record<PaymentState['stage'], string> = {
  'not-arrived': 'Not yet sent', collected: 'Collected', sent: 'Tokens with partner', reserved: 'Money set aside', paid: 'Paid',
};
const WAIT_LABEL: Record<NonNullable<PaymentState['wait']>, string> = {
  'no-stablecoin': 'Waits: no stablecoins',
  'no-local-currency': 'Waits: no local currency',
  'rail-closed': 'Waits: payout system closed',
};

const PRESETS: { id: string; label: string; inputs: LiquidityInputs }[] = [
  { id: 'comfortable', label: 'Well funded', inputs: { ...DEFAULT_LIQUIDITY, localFloat: 'high' } },
  { id: 'friday', label: 'Thin float, quiet weekend', inputs: { localFloat: 'low', inventory: 'high', flows: 'one-way', marketMaker: 'unavailable', issuerAccess: 'direct', payoutRail: 'instant', credit: 'none' } },
  { id: 'stress', label: 'Market stress', inputs: { localFloat: 'medium', inventory: 'low', flows: 'one-way', marketMaker: 'stressed', issuerAccess: 'none', payoutRail: 'instant', credit: 'none' } },
  { id: 'hours', label: 'Payout system shuts at weekends', inputs: { ...DEFAULT_LIQUIDITY, localFloat: 'high', payoutRail: 'hours' } },
];

export function renderLiquidity(mount: HTMLElement): void {
  mount.classList.add('block-wide');
  let inputs: LiquidityInputs = { ...PRESETS[1].inputs };
  let cursor = SLOTS.length - 1;

  mount.innerHTML = `
  <div class="sc sc-liq cq" data-scene="liquidity">
    <div class="sc-head">
      <p class="sc-contract"><span class="sc-tag">Scenario</span>
        A payout provider must pay six supplier invoices between Friday afternoon and Monday morning, through a dollar-stablecoin corridor.
        Its off-ramp partner pays suppliers in local currency. Amounts are £k-equivalent. ${basis('illustrative', 'Round numbers chosen to show the mechanics')}</p>
      ${askButton('Ask about this scene')}
    </div>

    <div class="sc-presets" role="group" aria-label="Scenarios">
      ${PRESETS.map(p => `<button type="button" class="sc-chip" data-preset="${p.id}">${esc(p.label)}</button>`).join('')}
    </div>

    <div class="sc-liq-layout">
      <div class="sc-panel sc-levers" role="group" aria-label="Levers">
        <p class="sc-levers-title">Levers</p>
        ${segmented('localFloat', 'Partner’s local-currency float', [
          { value: 'low', label: `Low ${fmtK(PARAMS.localFloat.low)}` }, { value: 'medium', label: fmtK(PARAMS.localFloat.medium) }, { value: 'high', label: fmtK(PARAMS.localFloat.high) },
        ], inputs.localFloat)}
        ${segmented('inventory', 'Provider’s stablecoin inventory', [
          { value: 'low', label: `Low ${fmtK(PARAMS.inventory.low)}` }, { value: 'high', label: fmtK(PARAMS.inventory.high) },
        ], inputs.inventory)}
        ${segmented('flows', 'Corridor flows', [
          { value: 'one-way', label: 'One way' }, { value: 'two-way', label: 'Both ways' },
        ], inputs.flows)}
        ${segmented('marketMaker', 'Market makers', [
          { value: 'normal', label: 'Normal' }, { value: 'stressed', label: 'Stressed' }, { value: 'unavailable', label: 'Gone' },
        ], inputs.marketMaker)}
        ${segmented('issuerAccess', 'Mint and redeem with the issuer', [
          { value: 'direct', label: 'Direct account' }, { value: 'none', label: 'No access' },
        ], inputs.issuerAccess)}
        ${segmented('payoutRail', 'Destination payout system', [
          { value: 'instant', label: 'Instant, 24/7' }, { value: 'hours', label: 'Banking hours' },
        ], inputs.payoutRail)}
        ${segmented('credit', 'Credit line to the partner', [
          { value: 'none', label: 'None' }, { value: 'available', label: `${fmtK(PARAMS.creditLimit)} line` },
        ], inputs.credit)}
      </div>

      <div class="sc-liq-main">
        <div class="sc-liq-grid-wrap" data-grid tabindex="0" role="region" aria-label="Invoices by time slot, scrolls sideways on small screens"></div>
        <div class="sc-liq-scrub">
          <div class="sc-controls" role="group" aria-label="Move through the weekend">
            <button type="button" class="sc-btn" data-act="prev">◀ Earlier</button>
            <button type="button" class="sc-btn sc-btn--primary" data-act="next">Later ▶</button>
            <button type="button" class="sc-btn sc-btn--quiet" data-act="first">From Friday</button>
          </div>
          <p class="sc-liq-at" data-at></p>
        </div>
        <div class="sc-liq-detail" data-detail></div>
      </div>
    </div>

    <div class="sc-summary" data-summary></div>

    <details class="sc-panel">
      <summary>Assumptions</summary>
      <ul class="sc-assume">
        <li>${esc(SLOT_NOTES.ukBanks)}</li>
        <li>${esc(SLOT_NOTES.issuer)}</li>
        <li>${esc(SLOT_NOTES.destBanks)}</li>
        <li>Market-maker spread ${PARAMS.spreadPct.normal}% in normal conditions and ${PARAMS.spreadPct.stressed}% under stress, when a market maker also takes at most ${fmtK(PARAMS.stressedCapacity)} per time slot.</li>
        <li>In the two-way case, ${fmtK(40)} of payments flow from the destination to the UK on Saturday and again on Sunday, and are netted against outbound payments.</li>
        <li>Every movement is a double-entry posting. No balance goes below zero unless the credit line is switched on, and then the borrowing is shown as credit.</li>
      </ul>
    </details>
    ${liveRegion()}
  </div>`;

  const root = mount.querySelector<HTMLElement>('.sc-liq')!;
  const gridWrap = root.querySelector<HTMLElement>('[data-grid]')!;
  const detail = root.querySelector<HTMLElement>('[data-detail]')!;
  const summary = root.querySelector<HTMLElement>('[data-summary]')!;
  const at = root.querySelector<HTMLElement>('[data-at]')!;

  bindAsk(root, 'liquidity', () => {
    const run = runLiquidity(inputs);
    const unpaid = run.summary.unpaid;
    return unpaid > 0
      ? `In the liquidity control room, why do ${unpaid} invoice${unpaid === 1 ? '' : 's'} still go unpaid by Monday, and which lever would fix that at the lowest cost?`
      : 'In the liquidity control room, every invoice was paid. What did that cost in money parked or credit used?';
  });

  function render(announceIt = false): void {
    const run = runLiquidity(inputs);
    gridWrap.innerHTML = gridHtml(run, cursor);
    detail.innerHTML = detailHtml(run, cursor);
    summary.innerHTML = summaryHtml(run);
    at.textContent = `Showing ${slotLabel(SLOTS[cursor].id)}${cursor === SLOTS.length - 1 ? ', the end of the weekend' : ''}.`;
    root.querySelector<HTMLButtonElement>('[data-act="prev"]')!.disabled = cursor === 0;
    root.querySelector<HTMLButtonElement>('[data-act="next"]')!.disabled = cursor === SLOTS.length - 1;
    if (announceIt) {
      const ev = run.snapshots[cursor].events;
      announce(root, `${slotLabel(SLOTS[cursor].id)}. ${ev.length ? ev.join(' ') : 'Nothing changes.'}`);
    }
  }

  root.querySelector('.sc-levers')?.addEventListener('change', () => {
    inputs = {
      localFloat: readSeg(root, 'localFloat') as LiquidityInputs['localFloat'],
      inventory: readSeg(root, 'inventory') as LiquidityInputs['inventory'],
      flows: readSeg(root, 'flows') as LiquidityInputs['flows'],
      marketMaker: readSeg(root, 'marketMaker') as LiquidityInputs['marketMaker'],
      issuerAccess: readSeg(root, 'issuerAccess') as LiquidityInputs['issuerAccess'],
      payoutRail: readSeg(root, 'payoutRail') as LiquidityInputs['payoutRail'],
      credit: readSeg(root, 'credit') as LiquidityInputs['credit'],
    };
    cursor = SLOTS.length - 1;
    render();
    const s = runLiquidity(inputs).summary;
    announce(root, `${s.paidOnArrival + s.paidLater} of ${PAYMENTS.length} invoices paid by Monday 09:00. ${s.unpaid} unpaid.`);
  });

  root.querySelectorAll<HTMLButtonElement>('[data-preset]').forEach(b => b.addEventListener('click', () => {
    inputs = { ...PRESETS.find(p => p.id === b.dataset.preset)!.inputs };
    (Object.keys(inputs) as (keyof LiquidityInputs)[]).forEach(k => writeSeg(root, k, inputs[k]));
    cursor = 0;
    render(true);
  }));

  root.querySelector('[data-act="prev"]')?.addEventListener('click', () => { cursor = Math.max(0, cursor - 1); render(true); });
  root.querySelector('[data-act="next"]')?.addEventListener('click', () => { cursor = Math.min(SLOTS.length - 1, cursor + 1); render(true); });
  root.querySelector('[data-act="first"]')?.addEventListener('click', () => { cursor = 0; render(true); });

  render();
}

function cellFor(p: PaymentState): { cls: string; glyph: string; text: string } {
  if (p.stage === 'not-arrived') return { cls: 'none', glyph: '', text: 'Not yet sent' };
  if (p.stage === 'paid') return { cls: 'paid', glyph: '●', text: 'Paid' };
  if (p.wait) return { cls: `wait`, glyph: p.wait === 'rail-closed' ? '⏸' : '◌', text: WAIT_LABEL[p.wait] };
  if (p.stage === 'reserved') return { cls: 'reserved', glyph: '◐', text: STAGE_LABEL.reserved };
  if (p.stage === 'sent') return { cls: 'sent', glyph: '◆', text: STAGE_LABEL.sent };
  return { cls: 'collected', glyph: '○', text: STAGE_LABEL.collected };
}

function gridHtml(run: LiquidityRun, cursor: number): string {
  const win = (open: boolean, label: string) =>
    `<span class="sc-win ${open ? 'is-open' : 'is-shut'}" title="${label}: ${open ? 'open' : 'closed'}"><span class="sr-only">${label} ${open ? 'open' : 'closed'}</span><span aria-hidden="true">${label.split(' ')[0]}</span></span>`;
  return `<table class="sc-liq-grid">
    <caption class="sr-only">Each invoice’s status in each time slot. Columns after the selected time are not shown yet.</caption>
    <thead><tr>
      <th scope="col" class="sc-liq-corner">Invoice</th>
      ${SLOTS.map((s, i) => `<th scope="col" class="${i === cursor ? 'is-now' : ''}${i > cursor ? ' is-future' : ''}">
        <span class="sc-liq-time">${s.label}</span>
        <span class="sc-wins">${win(s.ukBanks, 'UK banks')}${win(s.issuer, 'Issuer')}${win(s.destBanks, 'Destination banks')}</span>
      </th>`).join('')}
    </tr></thead>
    <tbody>
      ${PAYMENTS.map(p => `<tr>
        <th scope="row"><span class="sc-liq-pid">${p.id}</span> <span class="sc-liq-amt">${fmtK(p.amount)}</span><span class="sc-liq-who">${esc(p.beneficiary)}</span></th>
        ${SLOTS.map((_, i) => {
          if (i > cursor) return '<td class="is-future"><span class="sr-only">Not shown yet</span></td>';
          const st = run.snapshots[i].payments.find(x => x.id === p.id)!;
          const c = cellFor(st);
          return `<td class="sc-cell sc-cell--${c.cls}${i === cursor ? ' is-now' : ''}" title="${esc(c.text)}"><span aria-hidden="true">${c.glyph}</span><span class="sr-only">${esc(c.text)}</span></td>`;
        }).join('')}
      </tr>`).join('')}
    </tbody>
  </table>
  <div class="sc-legend" aria-hidden="true">
    <span><i class="sc-cell-key sc-cell--collected">○</i> Collected</span>
    <span><i class="sc-cell-key sc-cell--sent">◆</i> Tokens with partner</span>
    <span><i class="sc-cell-key sc-cell--reserved">◐</i> Money set aside</span>
    <span><i class="sc-cell-key sc-cell--paid">●</i> Paid, spendable</span>
    <span><i class="sc-cell-key sc-cell--wait">◌</i> Waiting</span>
    <span><span class="sc-win is-open">UK</span> open <span class="sc-win is-shut">UK</span> closed</span>
  </div>`;
}

function detailHtml(run: LiquidityRun, cursor: number): string {
  const snap = run.snapshots[cursor];
  const b = snap.balances;
  const bar = (label: string, value: number, max: number, tone: string) => `
    <div class="sc-bal">
      <span class="sc-bal-label">${esc(label)}</span>
      <span class="sc-bal-track"><span class="sc-bal-fill sc-bal-fill--${tone}" style="width:${Math.min(100, (Math.max(0, value) / max) * 100)}%"></span></span>
      <span class="sc-bal-v">${fmtK(value)}</span>
    </div>`;
  const max = 320;
  const credit = -b['ext:credit-line'];
  return `
    <div class="sc-bals" aria-label="Balances at ${slotLabel(snap.slot)}">
      ${bar('Provider: stablecoin inventory', b['provider:stablecoin'], max, 'token')}
      ${bar('Provider: pounds collected', b['provider:gbp'], max, 'gbp')}
      ${bar('Partner: tokens received, not yet sold', b['partner:stablecoin'], max, 'token')}
      ${bar('Partner: local-currency float', b['partner:local'], max, 'local')}
      ${bar('Partner: set aside for payouts', b['partner:local-reserved'], max, 'reserved')}
      ${credit > 0 ? bar('Credit drawn (borrowed, not prefunded)', credit, max, 'credit') : ''}
    </div>
    <div class="sc-events">
      <p class="sc-events-title">What happens at ${slotLabel(snap.slot)}</p>
      ${snap.events.length ? `<ul>${snap.events.map(e => `<li>${esc(e)}</li>`).join('')}</ul>` : '<p class="sc-note">Nothing moves.</p>'}
    </div>`;
}

function summaryHtml(run: LiquidityRun): string {
  const s = run.summary;
  const paid = s.paidOnArrival + s.paidLater;
  return `
    <div class="sc-stats">
      <div class="sc-stat"><span class="sc-stat-v">${s.paidOnArrival}</span><span class="sc-stat-k">paid when sent</span></div>
      <div class="sc-stat"><span class="sc-stat-v">${s.paidLater}</span><span class="sc-stat-k">paid late</span></div>
      <div class="sc-stat sc-stat--${s.unpaid ? 'bad' : 'ok'}"><span class="sc-stat-v">${s.unpaid}</span><span class="sc-stat-k">unpaid by Mon 09:00</span></div>
      <div class="sc-stat"><span class="sc-stat-v">${fmtK(s.spreadCost)}</span><span class="sc-stat-k">spread paid to market makers</span></div>
      <div class="sc-stat"><span class="sc-stat-v">${fmtK(s.creditUsed)}</span><span class="sc-stat-k">borrowed</span></div>
      <div class="sc-stat"><span class="sc-stat-v">${fmtK(s.idlePrefunding)}</span><span class="sc-stat-k">prefunding never used</span></div>
    </div>
    <div class="sc-verdict">
      <p><b>${paid} of ${PAYMENTS.length} invoices paid.</b> ${s.blockers.length
        ? `Still blocked: ${s.blockers.map(esc).join(' ')}`
        : 'Nothing blocked. Check what it cost: money parked in advance, spreads or borrowing.'}</p>
      ${s.leversUsed.length ? `<p class="sc-note">Levers that did the work: ${s.leversUsed.map(esc).join(' · ')}.</p>` : ''}
    </div>`;
}
