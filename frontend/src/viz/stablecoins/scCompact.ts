// scCompact.ts — the compact scenes: the peg, the economy lens, the controls journey,
// reserve economics and the scenario checks. Data lives in content/stablecoins/lenses.ts.

import {
  pegOutcome, LENS, PERSPECTIVE_LABEL, ECONOMY_LABEL, CONTROL_PHASES, WALLET_CASES,
  RESERVE_MODELS, RESERVE_ROWS, CHECKS, VOLUME_FLOWS,
  type PegInputs, type Perspective, type Economy, type WalletCase, type PointBasis, type ReserveModelId,
} from '../../content/stablecoins/lenses.ts';
import { SOURCES, sourceLabel, type SourceId } from '../../content/stablecoins/sources.ts';
import { segmented, readSeg, liveRegion, announce, askButton, bindAsk, esc } from './ui.ts';
import { openChatWithQuestion, setChatScene } from '../../chat';

const srcLinks = (ids: SourceId[]): string => ids.length
  ? `<span class="sc-src">${ids.map(id => `<a href="${esc(SOURCES[id].url)}" target="_blank" rel="noopener">${esc(sourceLabel(id))}</a>`).join(' · ')}</span>`
  : '';

const BASIS_LABEL: Record<PointBasis, string> = { measured: 'Measured', mechanism: 'Mechanism', scenario: 'Scenario', rule: 'Rule in force', policy: 'Policy, not yet in force' };

// ── Peg ────────────────────────────────────────────────────────────────────────

export function renderPeg(mount: HTMLElement): void {
  mount.classList.add('block-wide');
  let inputs: PegInputs = { redemption: 'open', reserves: 'trusted', holder: 'market' };
  mount.innerHTML = `
  <div class="sc sc-peg cq" data-scene="peg">
    <div class="sc-head">
      <p class="sc-contract"><span class="sc-tag">Two prices</span> A stablecoin has a redemption price, $1 from the issuer, and a market price, whatever buyers pay. Change the conditions and see what holds the two together.</p>
      ${askButton('Ask about this scene')}
    </div>
    <div class="sc-peg-layout">
      <div class="sc-panel sc-levers" role="group" aria-label="Conditions">
        ${segmented('redemption', 'Redemption with the issuer', [{ value: 'open', label: 'Open' }, { value: 'closed', label: 'Closed (weekend, pause)' }], inputs.redemption)}
        ${segmented('reserves', 'Confidence in reserves', [{ value: 'trusted', label: 'Trusted' }, { value: 'doubted', label: 'In doubt' }], inputs.reserves)}
        ${segmented('holder', 'You', [{ value: 'market', label: 'Can only sell in the market' }, { value: 'redeemer', label: 'Can redeem with the issuer' }], inputs.holder)}
      </div>
      <div class="sc-peg-out" data-out></div>
    </div>
    ${liveRegion()}
  </div>`;
  const root = mount.querySelector<HTMLElement>('.sc-peg')!;
  const out = root.querySelector<HTMLElement>('[data-out]')!;
  bindAsk(root, 'peg', () => 'Why does a fiat-backed stablecoin usually trade close to $1, and what can make it slip?');
  const render = () => {
    const o = pegOutcome(inputs);
    out.innerHTML = `
      <div class="sc-peg-scale sc-peg-scale--${o.band}" aria-hidden="true">
        <span class="sc-peg-par">$1.00</span><span class="sc-peg-band"></span><span class="sc-peg-dot"></span>
      </div>
      <p class="sc-peg-price">${esc(o.price)} <span class="sc-basis sc-basis--qualitative">Qualitative</span></p>
      <p>${esc(o.why)}</p>
      <p class="sc-note"><b>For you:</b> ${esc(o.holder)}</p>
      ${srcLinks(o.sources)}`;
  };
  root.querySelector('.sc-levers')?.addEventListener('change', () => {
    inputs = {
      redemption: readSeg(root, 'redemption') as PegInputs['redemption'],
      reserves: readSeg(root, 'reserves') as PegInputs['reserves'],
      holder: readSeg(root, 'holder') as PegInputs['holder'],
    };
    render();
    announce(root, pegOutcome(inputs).price);
  });
  render();
}

// ── Economy lens ───────────────────────────────────────────────────────────────

export function renderLens(mount: HTMLElement): void {
  mount.classList.add('block-wide');
  let economy: Economy = 'em';
  let view: Perspective = 'holder';
  const persp = Object.keys(PERSPECTIVE_LABEL) as Perspective[];
  mount.innerHTML = `
  <div class="sc sc-lens cq" data-scene="lens">
    <div class="sc-head">
      <p class="sc-contract"><span class="sc-tag">Perspective</span> The same flow of dollar stablecoins looks different to each party. Each point is labelled: measured, mechanism, scenario, a rule in force, or a policy not yet in force.</p>
      ${askButton('Ask about this scene')}
    </div>
    <div class="sc-routes" role="group" aria-label="Economy">
      ${(Object.keys(ECONOMY_LABEL) as Economy[]).map(e => `<button type="button" class="sc-route-btn" data-economy="${e}" aria-pressed="${e === economy}">${esc(ECONOMY_LABEL[e])}</button>`).join('')}
    </div>
    <div class="sc-routes sc-routes--sub" role="group" aria-label="Perspective">
      ${persp.map(p => `<button type="button" class="sc-route-btn" data-persp="${p}" aria-pressed="${p === view}">${esc(PERSPECTIVE_LABEL[p])}</button>`).join('')}
    </div>
    <div class="sc-lens-grid" data-lens></div>
    ${liveRegion()}
  </div>`;
  const root = mount.querySelector<HTMLElement>('.sc-lens')!;
  const grid = root.querySelector<HTMLElement>('[data-lens]')!;
  bindAsk(root, 'lens', () => `From the point of view of ${PERSPECTIVE_LABEL[view].toLowerCase()} in ${ECONOMY_LABEL[economy].toLowerCase()}, what are the gains and costs of dollar stablecoins, and which are measured rather than scenarios?`);
  const col = (title: string, tone: string, pts: { text: string; basis: PointBasis; sources: SourceId[] }[]) => `
    <section class="sc-lens-col sc-lens-col--${tone}"><h4>${title}</h4>
      <ul>${pts.map(p => `<li><span class="sc-basis sc-basis--${p.basis === 'measured' ? 'sourced' : p.basis === 'scenario' ? 'illustrative' : p.basis === 'rule' || p.basis === 'policy' ? 'derived' : 'qualitative'}">${BASIS_LABEL[p.basis]}</span> ${esc(p.text)} ${srcLinks(p.sources)}</li>`).join('')}</ul>
    </section>`;
  const render = () => {
    const cell = LENS[economy][view];
    grid.innerHTML = col('Gains', 'gain', cell.gains) + col('Costs and risks', 'cost', cell.costs);
    root.querySelectorAll<HTMLButtonElement>('[data-economy]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.economy === economy)));
    root.querySelectorAll<HTMLButtonElement>('[data-persp]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.persp === view)));
  };
  root.querySelectorAll<HTMLButtonElement>('[data-economy]').forEach(b => b.addEventListener('click', () => { economy = b.dataset.economy as Economy; render(); announce(root, ECONOMY_LABEL[economy]); }));
  root.querySelectorAll<HTMLButtonElement>('[data-persp]').forEach(b => b.addEventListener('click', () => { view = b.dataset.persp as Perspective; render(); announce(root, PERSPECTIVE_LABEL[view]); }));
  render();
}

// ── Controls journey ───────────────────────────────────────────────────────────

export function renderControls(mount: HTMLElement): void {
  mount.classList.add('block-wide');
  let wallet: WalletCase = 'new';
  mount.innerHTML = `
  <div class="sc sc-ctl cq" data-scene="controls">
    <div class="sc-head">
      <p class="sc-contract"><span class="sc-tag">Scenario</span> A long-standing corporate client asks its UK bank to pay a supplier in a dollar stablecoin. The payment looks commercially plausible. What the bank must check depends on the destination wallet.</p>
      ${askButton('Ask about this scene')}
    </div>
    ${segmented('wallet', 'The destination wallet', (Object.keys(WALLET_CASES) as WalletCase[]).map(w => ({ value: w, label: WALLET_CASES[w].label })), wallet)}
    <div class="sc-ctl-verdict" data-verdict></div>
    <details class="sc-panel">
      <summary>The full control journey: before, at release and after</summary>
      <div class="sc-ctl-phases" tabindex="0" role="region" aria-label="Control journey tables, scroll sideways on small screens">
        ${CONTROL_PHASES.map(ph => `<section class="sc-ctl-phase"><h4>${esc(ph.label)}</h4>
          <table class="sc-ctl-table"><thead><tr><th scope="col">Control</th><th scope="col">Catches</th><th scope="col">Misses</th><th scope="col">Who</th></tr></thead>
          <tbody>${ph.controls.map(c => `<tr><th scope="row">${esc(c.name)}</th><td>${esc(c.catches)}</td><td>${esc(c.misses)}</td><td>${esc(c.who)}</td></tr>`).join('')}</tbody></table>
        </section>`).join('')}
      </div>
    </details>
    ${liveRegion()}
  </div>`;
  const root = mount.querySelector<HTMLElement>('.sc-ctl')!;
  const verdict = root.querySelector<HTMLElement>('[data-verdict]')!;
  bindAsk(root, 'controls', () => `The destination wallet is "${WALLET_CASES[wallet].label.toLowerCase()}". What can the bank infer, what can't it, and what must it do before paying?`);
  const render = () => {
    const w = WALLET_CASES[wallet];
    verdict.innerHTML = `
      <p class="sc-outcome-head"><span class="sc-pill sc-pill--${w.tone}">${esc(w.verdict)}</span></p>
      <div class="sc-ctl-cols">
        <section><h4>The bank can infer</h4><ul>${w.canInfer.map(t => `<li>${esc(t)}</li>`).join('')}</ul></section>
        <section><h4>It cannot infer</h4><ul>${w.cannotInfer.map(t => `<li>${esc(t)}</li>`).join('')}</ul></section>
        <section><h4>What to do</h4><ol>${w.steps.map(t => `<li>${esc(t)}</li>`).join('')}</ol></section>
      </div>
      ${srcLinks(w.sources)}`;
  };
  root.querySelector('fieldset')?.addEventListener('change', () => {
    wallet = readSeg(root, 'wallet') as WalletCase;
    render();
    announce(root, WALLET_CASES[wallet].verdict);
  });
  render();
}

// ── Reserve economics ──────────────────────────────────────────────────────────

export function renderReserve(mount: HTMLElement): void {
  mount.classList.add('block-wide');
  let focus: ReserveModelId | null = null;
  mount.innerHTML = `
  <div class="sc sc-rsv cq" data-scene="reserve">
    <div class="sc-head">
      <p class="sc-contract"><span class="sc-tag">Compare</span> Four ways to put a dollar on a ledger. Same price today, different claims if something goes wrong. Pick one to follow who owes the holder and who earns the money.</p>
      ${askButton('Ask about this scene')}
    </div>
    <div class="sc-routes" role="group" aria-label="Highlight a model">
      ${RESERVE_MODELS.map(m => `<button type="button" class="sc-route-btn" data-model="${m.id}" aria-pressed="false">${esc(m.label)}</button>`).join('')}
    </div>
    <div class="sc-rsv-wrap" tabindex="0" role="region" aria-label="Reserve economics comparison, scrolls sideways on small screens">
      <table class="sc-rsv-table">
        <thead><tr><th scope="col"><span class="sr-only">Attribute</span></th>${RESERVE_MODELS.map(m => `<th scope="col" data-col="${m.id}">${esc(m.label)}</th>`).join('')}</tr></thead>
        <tbody>${RESERVE_ROWS.map(r => `<tr><th scope="row">${esc(r.label)}</th>${RESERVE_MODELS.map(m => `<td data-col="${m.id}">${esc(m[r.key])}</td>`).join('')}</tr>`).join('')}
          <tr><th scope="row">Sources</th>${RESERVE_MODELS.map(m => `<td data-col="${m.id}">${srcLinks(m.sources)}</td>`).join('')}</tr>
        </tbody>
      </table>
    </div>
    ${liveRegion()}
  </div>`;
  const root = mount.querySelector<HTMLElement>('.sc-rsv')!;
  bindAsk(root, 'reserve', () => focus
    ? `For a ${RESERVE_MODELS.find(m => m.id === focus)!.label.toLowerCase()}, who owes the holder, and who earns the reserve income?`
    : 'How do a single-issuer stablecoin, a revenue-sharing network, a bank-issued stablecoin and a tokenised deposit differ in who owes the holder?');
  root.querySelectorAll<HTMLButtonElement>('[data-model]').forEach(b => b.addEventListener('click', () => {
    focus = focus === b.dataset.model ? null : b.dataset.model as ReserveModelId;
    root.querySelectorAll<HTMLButtonElement>('[data-model]').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.model === focus)));
    root.querySelectorAll<HTMLElement>('[data-col]').forEach(c => {
      c.classList.toggle('is-focus', c.dataset.col === focus);
      c.classList.toggle('is-dim', focus !== null && c.dataset.col !== focus);
    });
    announce(root, focus ? `Highlighting ${RESERVE_MODELS.find(m => m.id === focus)!.label}` : 'Showing all four');
  }));
}

// ── Scenario checks ────────────────────────────────────────────────────────────

export function renderChecks(mount: HTMLElement): void {
  mount.classList.add('block-wide');
  let idx = 0;
  let score = 0;
  const answered = new Map<number, number>();
  mount.innerHTML = `<div class="sc sc-chk cq" data-scene="check"><div data-card></div>${liveRegion()}</div>`;
  const root = mount.querySelector<HTMLElement>('.sc-chk')!;
  const card = root.querySelector<HTMLElement>('[data-card]')!;
  root.addEventListener('focusin', () => setChatScene('check'));

  // Rotate options per check so the right answer isn't always in the same place.
  const order = (n: number, k: number) => Array.from({ length: n }, (_, i) => (i + k * 3 + 1) % n);

  function render(): void {
    if (idx >= CHECKS.length) {
      card.innerHTML = `<div class="sc-step-card sc-chk-done">
        <p class="sc-step-count">Done</p>
        <h4 class="sc-step-title">${score} of ${CHECKS.length} on the first try</h4>
        <p>Every scenario is new: the answers depend on reasoning from the scenes, not on remembering labels.</p>
        <div class="sc-controls"><button type="button" class="sc-btn sc-btn--primary" data-act="again">Try again</button></div>
      </div>`;
      card.querySelector('[data-act="again"]')?.addEventListener('click', () => { idx = 0; score = 0; answered.clear(); render(); });
      return;
    }
    const c = CHECKS[idx];
    const ord = order(c.options.length, idx);
    const picked = answered.get(idx);
    card.innerHTML = `<div class="sc-step-card">
      <p class="sc-step-count">Scenario ${idx + 1} of ${CHECKS.length} · ${esc(c.level)}</p>
      <p class="sc-chk-situation">${esc(c.situation)}</p>
      <h4 class="sc-step-title">${esc(c.question)}</h4>
      <div class="sc-chk-options" role="group" aria-label="Answers">
        ${ord.map(o => {
          const state = picked === undefined ? '' : o === c.correct ? ' is-right' : o === picked ? ' is-wrong' : ' is-other';
          return `<button type="button" class="sc-chk-opt${state}" data-opt="${o}"${picked !== undefined ? ' aria-disabled="true"' : ''}>${esc(c.options[o].text)}</button>`;
        }).join('')}
      </div>
      <div class="sc-chk-feedback" data-feedback>${picked === undefined ? '' : `
        <p><span class="sc-pill sc-pill--${picked === c.correct ? 'done' : 'blocked'}">${picked === c.correct ? 'Right' : 'Not quite'}</span> ${esc(c.options[picked].feedback)}</p>
        ${picked !== c.correct ? `<p><b>Better answer:</b> ${esc(c.options[c.correct].feedback)}</p>` : ''}
        <p class="sc-note"><a href="#${c.chapter}" data-jump="${c.chapter}">Revisit the chapter</a> · <button type="button" class="sc-link" data-askcheck>Ask the assistant about this</button></p>`}
      </div>
      <div class="sc-controls">${picked !== undefined ? `<button type="button" class="sc-btn sc-btn--primary" data-act="next">${idx === CHECKS.length - 1 ? 'See your result' : 'Next scenario ▶'}</button>` : ''}</div>
    </div>`;

    card.querySelectorAll<HTMLButtonElement>('[data-opt]').forEach(b => b.addEventListener('click', () => {
      if (answered.has(idx)) return;
      const o = Number(b.dataset.opt);
      answered.set(idx, o);
      if (o === c.correct) score++;
      render();
      announce(root, `${o === c.correct ? 'Right.' : 'Not quite.'} ${c.options[o].feedback}`);
      card.querySelector<HTMLButtonElement>('[data-act="next"]')?.focus();
    }));
    card.querySelector('[data-act="next"]')?.addEventListener('click', () => { idx++; render(); card.querySelector<HTMLElement>('.sc-chk-situation')?.focus(); });
    card.querySelector('[data-jump]')?.addEventListener('click', e => {
      e.preventDefault();
      const el = document.getElementById(c.chapter);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el?.focus({ preventScroll: true });
    });
    card.querySelector('[data-askcheck]')?.addEventListener('click', () => {
      setChatScene('check');
      openChatWithQuestion(`${c.situation} ${c.question} Why is "${c.options[c.correct].text}" the better answer?`);
    });
    const sit = card.querySelector<HTMLElement>('.sc-chk-situation');
    if (sit) sit.tabIndex = -1;
  }
  render();
}

// ── Volume: gross transfers versus payments, on a linear scale ─────────────────

export function renderVolume(mount: HTMLElement): void {
  mount.classList.add('block-wide');
  const max = Math.max(...VOLUME_FLOWS.map(f => f.high ?? f.low));
  const fmt = (v: number) => v >= 1000 ? `$${(v / 1000).toLocaleString('en-GB', { maximumFractionDigits: 1 })}tn` : `$${v}bn`;
  mount.innerHTML = `
  <div class="sc sc-vol cq" data-scene="volume">
    <p class="sc-contract"><span class="sc-tag">Flows, 2025</span> Bars are drawn to one linear scale, so the small ones are as small as they really are.</p>
    <ul class="sc-vol-list">
      ${VOLUME_FLOWS.map(f => `<li class="sc-vol-row sc-vol-row--${f.tone}">
        <div class="sc-vol-head"><span class="sc-vol-label">${esc(f.label)}</span>
          <span class="sc-vol-v">${f.high ? `${fmt(f.low)}–${fmt(f.high)}` : fmt(f.low)}</span></div>
        <div class="sc-vol-track" aria-hidden="true">
          <span class="sc-vol-fill" style="width:${Math.max(0.35, (f.low / max) * 100)}%"></span>
          ${f.high ? `<span class="sc-vol-range" style="left:${(f.low / max) * 100}%;width:${((f.high - f.low) / max) * 100}%"></span>` : ''}
        </div>
        <p class="sc-vol-note"><span class="sc-basis sc-basis--${f.tone === 'ref' ? 'sourced' : 'illustrative'}">${esc(f.basis)}</span> ${esc(f.note)} ${srcLinks(f.sources)}</p>
      </li>`).join('')}
    </ul>
    <p class="sc-note"><b>A stock, not a flow:</b> stablecoins in circulation were $286.4bn on 17 November 2026, down from a peak of $312.9bn on 17 May. USDT was 61% and USDC 24%. ${srcLinks(['defillama'])}</p>
  </div>`;
}
