// scJourney.ts — "Follow £1,000". The flagship scene: one objective, four routes.
// Teaches that a token arriving and a supplier holding spendable money are different events.

import {
  ROUTES, LAYER_ORDER, LAYER_LABELS, SCENARIO, CORRIDOR_PRESETS, FEE_LIMITS,
  evaluateRoute, traceValue, summariseRoute, routeById, activeSteps, breakEvenFxPct,
  type JourneyConditions, type RouteId, type FeeInputs, type StepStatus, type RouteEvaluation, type JourneyRoute,
} from '../../content/stablecoins/journey.ts';
import {
  segmented, readSeg, writeSeg, liveRegion, announce, askButton, bindAsk, reducedMotion, esc, fmtGBP, basis,
} from './ui.ts';
import {
  conditionKeys, CONDITION_CONTROLS, matchingPreset, readJourneySelection, writeJourneySelection, type JourneySelection,
} from '../../content/stablecoins/journeyLink.ts';
import { copyAndToast, PAYMENT_SCENE } from '../../utils/share';
import { writeHistory } from '../../utils/navigation';

const STATUS_TEXT: Record<StepStatus, string> = {
  done: 'Done', waits: 'Waits', pending: 'Later', held: 'Held', blocked: 'Blocked', 'not-reached': 'Not reached',
};
const RESULT_TEXT: Record<RouteEvaluation['result'], string> = {
  spendable: 'Paid now', 'spendable-later': 'Paid later', held: 'Held for review', 'not-met': 'Objective not met',
  'not-applicable': 'Not needed',
};
const MARK: Record<string, { glyph: string; label: string }> = {
  message: { glyph: '✉', label: 'Message sent' },
  token: { glyph: '◆', label: 'Token moved' },
  spendable: { glyph: '●', label: 'Spendable money' },
};

export function renderJourney(mount: HTMLElement): void {
  mount.classList.add('block-wide');
  const initial = readJourneySelection(new URLSearchParams(location.search));
  let { view, conditions: cond, fees } = initial;
  let idx = initial.step - 1;
  let timer = 0;

  mount.innerHTML = `
  <div class="sc sc-journey cq" data-scene="journey" id="${PAYMENT_SCENE}" role="region" aria-label="Follow a £1,000 payment" tabindex="-1">
    <div class="sc-head">
      <p class="sc-contract">
        <span class="sc-tag">Scenario</span>
        ${esc(SCENARIO.invoice)} from ${esc(SCENARIO.sender.replace(/^A /, 'a '))} to ${esc(SCENARIO.beneficiary.replace(/^A /, 'a '))}.
        <b>Paid means</b> the supplier holds what it asked for: local currency it can spend from its bank account, or dollar tokens in its own wallet.
      </p>
      <div class="sc-journey-actions">
        <button type="button" class="sc-ask" data-copy-scenario>Copy scenario link</button>
        ${askButton('Ask about this scene')}
      </div>
    </div>

    <div class="sc-routes" role="group" aria-label="Choose a route">
      ${ROUTES.map(r => `<button type="button" class="sc-route-btn" data-route="${r.id}" aria-pressed="false">${esc(r.short)}</button>`).join('')}
      <button type="button" class="sc-route-btn sc-route-btn--compare" data-route="compare" aria-pressed="false">Compare all four</button>
    </div>

    <details class="sc-panel sc-situation"${location.hash === '#' + PAYMENT_SCENE ? '' : ' open'}>
      <summary>Change the situation <span data-situation-label></span></summary>
      <div class="sc-presets" role="group" aria-label="Situation presets">
        ${CORRIDOR_PRESETS.map(p => `<button type="button" class="sc-chip" data-preset="${p.id}" title="${esc(p.note)}">${esc(p.label)}</button>`).join('')}
      </div>
      <div class="sc-seg-grid">
        ${conditionKeys.map(key => {
          const { label, options } = CONDITION_CONTROLS[key];
          return segmented<string>(key, label, options, cond[key]);
        }).join('')}
      </div>
      <p class="sc-note" data-preset-note></p>
    </details>

    <div class="sc-stage" data-stage></div>
    <div class="sc-compare" data-compare hidden></div>

    <details class="sc-panel sc-fees">
      <summary>Price assumptions ${basis('illustrative', 'Not market prices')}</summary>
      <p class="sc-note">The same price applies to every leg of the same type on every route, so only the routes’ structure differs. These are not quotes: real prices vary by provider, corridor, amount, day and relationship. Put in real quotes to compare them.</p>
      <div class="sc-sliders">
        ${slider('fxPct', 'Spread on each currency conversion', fees.fxPct, FEE_LIMITS.fxPct, v => `${v.toFixed(1)}%`)}
        ${slider('fixedGBP', 'Fixed charge per fee-charging hand-off', fees.fixedGBP, FEE_LIMITS.fixedGBP, v => fmtGBP(v, 0))}
        ${slider('networkGBP', 'Network fee per on-chain transfer', fees.networkGBP, FEE_LIMITS.networkGBP, v => fmtGBP(v))}
      </div>
    </details>
    ${liveRegion()}
  </div>`;

  const root = mount.querySelector<HTMLElement>('.sc-journey')!;
  const stage = root.querySelector<HTMLElement>('[data-stage]')!;
  const compare = root.querySelector<HTMLElement>('[data-compare]')!;
  const presetNote = root.querySelector<HTMLElement>('[data-preset-note]')!;

  function scenarioUrl(): URL {
    const url = new URL(location.href);
    url.hash = PAYMENT_SCENE;
    writeJourneySelection(url.searchParams, { view, conditions: cond, fees, step: idx + 1 });
    return url;
  }

  function updateScenarioLink(): void {
    const url = scenarioUrl();
    if (url.hash !== location.hash) writeHistory(url);
    else if (url.href !== location.href) writeHistory(url, 'replace');
  }

  root.querySelector('[data-copy-scenario]')!.addEventListener('click', () => {
    copyAndToast(scenarioUrl().href, 'scenario link');
  });

  bindAsk(root, 'journey', () => view === 'compare'
    ? 'In Follow £1,000, why do the routes reach the supplier at different times even when the token moves in seconds?'
    : `In Follow £1,000, on the ${routeById(view as RouteId).name.toLowerCase()} route, what has actually happened by step ${Math.max(1, idx + 1)}, and is the supplier paid yet?`);

  const stopTimer = () => {
    if (timer) { window.clearInterval(timer); timer = 0; }
    root.querySelector<HTMLButtonElement>('[data-act="play"]')?.setAttribute('aria-pressed', 'false');
    const play = root.querySelector<HTMLButtonElement>('[data-act="play"]');
    if (play) play.textContent = 'Play';
  };

  const maxIdx = (ev: RouteEvaluation): number => {
    if (ev.result === 'not-applicable') return -1;
    const stop = ev.steps.findIndex(s => s.status === 'blocked' || s.status === 'held');
    return stop >= 0 ? stop : ev.steps.length - 1;
  };

  function render(updateLink = true): void {
    root.querySelectorAll<HTMLButtonElement>('[data-route]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.route === view)));
    stage.hidden = view === 'compare';
    compare.hidden = view !== 'compare';
    if (view === 'compare') {
      renderCompare();
    } else {
      const route = routeById(view);
      const ev = evaluateRoute(route, cond);
      idx = Math.min(idx, maxIdx(ev));
      stage.innerHTML = stageHtml(route, ev, idx, fees, cond);
      bindStage(route, ev);
    }
    if (updateLink) updateScenarioLink();
  }

  function markPreset(): void {
    const preset = matchingPreset(cond);
    root.querySelector<HTMLElement>('[data-situation-label]')!.textContent = preset?.label ?? 'Custom settings';
    presetNote.textContent = preset?.note ?? '';
    root.querySelectorAll<HTMLButtonElement>('[data-preset]').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.preset === preset?.id)));
  }

  function bindStage(route: JourneyRoute, ev: RouteEvaluation): void {
    const steps = activeSteps(route, cond);
    const go = (to: number) => {
      const active = document.activeElement as HTMLElement | null;
      const act = active && stage.contains(active) ? active.dataset.act : undefined;
      idx = Math.max(-1, Math.min(maxIdx(ev), to));
      render();
      if (act) {
        // The stage was re-rendered: put focus back on the same control, or the nearest usable one.
        const order = [act, 'next', 'back', 'restart'];
        for (const a of order) {
          const b = stage.querySelector<HTMLButtonElement>(`[data-act="${a}"]`);
          if (b && !b.disabled) { b.focus(); break; }
        }
      }
      const step = steps[idx];
      const out = ev.steps[idx];
      announce(root, idx < 0
        ? 'Start: £1,000 in the business’s bank account.'
        : `Step ${idx + 1} of ${steps.length}: ${step.title}. ${STATUS_TEXT[out.status]}.${out.reason ? ' ' + out.reason : ''}`);
    };
    stage.querySelector('[data-act="back"]')?.addEventListener('click', () => { stopTimer(); go(idx - 1); });
    stage.querySelector('[data-act="next"]')?.addEventListener('click', () => { stopTimer(); go(idx + 1); });
    stage.querySelector('[data-act="restart"]')?.addEventListener('click', () => { stopTimer(); go(-1); });
    stage.querySelector('[data-act="play"]')?.addEventListener('click', () => {
      if (timer) { stopTimer(); return; }
      if (idx >= maxIdx(ev)) go(-1);
      updateScenarioLink();
      const play = stage.querySelector<HTMLButtonElement>('[data-act="play"]')!;
      play.textContent = 'Pause';
      play.setAttribute('aria-pressed', 'true');
      timer = window.setInterval(() => {
        if (!root.isConnected || location.hash !== '#' + PAYMENT_SCENE) { stopTimer(); return; }
        if (idx >= maxIdx(ev)) { stopTimer(); return; }
        go(idx + 1);
        const p = stage.querySelector<HTMLButtonElement>('[data-act="play"]');
        if (p && timer) { p.textContent = 'Pause'; p.setAttribute('aria-pressed', 'true'); }
      }, reducedMotion() ? 3200 : 2400);
    });
    stage.querySelector<HTMLElement>('.sc-controls')?.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); stopTimer(); go(idx + 1); stage.querySelector<HTMLButtonElement>('[data-act="next"]')?.focus(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); stopTimer(); go(idx - 1); stage.querySelector<HTMLButtonElement>('[data-act="back"]')?.focus(); }
    });
  }

  function renderCompare(): void {
    const be = breakEvenFxPct(routeById('sandwich'), routeById('psp'), fees);
    compare.innerHTML = `
      <p class="sc-note">Each row is the same £1,000 invoice, under the situation you set. Rows are in a fixed order, not ranked. ${basis('derived', 'Derived from the route steps and the price assumptions')} Amounts use the illustrative prices below, which charge every leg of the same type the same, so only structure differs.</p>
      <ul class="sc-cmp">
        ${ROUTES.map(r => compareRow(r, evaluateRoute(r, cond), fees, cond)).join('')}
      </ul>
      <p class="sc-breakeven">${be === null
        ? 'At these prices the stablecoin sandwich can’t match the payment firm on cost even with free conversions.'
        : `What would have to be true: the sandwich matches the payment firm’s cost only if each of its two conversions costs under <b>${be.toFixed(2)}%</b>, against ${fees.fxPct.toFixed(1)}% for the firm’s single conversion. Dollar–major-currency spreads can be that tight; exotic currencies usually aren’t.`} ${basis('derived')}</p>
      <div class="sc-legend" aria-hidden="true">
        <span><i class="sc-mark sc-mark--token">◆</i> Token moved</span>
        <span><i class="sc-mark sc-mark--spendable">●</i> Spendable money</span>
        <span><i class="sc-dot sc-dot--done"></i> Done</span>
        <span><i class="sc-dot sc-dot--waits"></i> Waits</span>
        <span><i class="sc-dot sc-dot--held"></i> Held</span>
        <span><i class="sc-dot sc-dot--blocked"></i> Blocked</span>
      </div>`;
  }

  // Controls
  root.querySelectorAll<HTMLButtonElement>('[data-route]').forEach(b => b.addEventListener('click', () => {
    stopTimer();
    view = b.dataset.route as JourneySelection['view'];
    idx = -1;
    render();
  }));

  root.querySelector('.sc-seg-grid')?.addEventListener('change', () => {
    cond = {
      objective: (readSeg(root, 'objective') ?? cond.objective) as JourneyConditions['objective'],
      bankReach: (readSeg(root, 'bankReach') ?? cond.bankReach) as JourneyConditions['bankReach'],
      wallet: (readSeg(root, 'wallet') ?? cond.wallet) as JourneyConditions['wallet'],
      offramp: (readSeg(root, 'offramp') ?? cond.offramp) as JourneyConditions['offramp'],
      localRail: (readSeg(root, 'localRail') ?? cond.localRail) as JourneyConditions['localRail'],
      when: (readSeg(root, 'when') ?? cond.when) as JourneyConditions['when'],
      screening: (readSeg(root, 'screening') ?? cond.screening) as JourneyConditions['screening'],
    };
    markPreset();
    stopTimer();
    render();
  });

  root.querySelectorAll<HTMLButtonElement>('[data-preset]').forEach(b => b.addEventListener('click', () => {
    const p = CORRIDOR_PRESETS.find(x => x.id === b.dataset.preset)!;
    cond = { ...p.conditions };
    (Object.keys(cond) as (keyof JourneyConditions)[]).forEach(k => writeSeg(root, k, cond[k]));
    markPreset();
    stopTimer();
    idx = -1;
    render();
    announce(root, `Preset: ${p.label}.`);
  }));

  const sliders = root.querySelector<HTMLElement>('.sc-sliders')!;
  sliders.addEventListener('input', e => {
    const input = e.target as HTMLInputElement;
    const key = input.name as keyof FeeInputs;
    fees = { ...fees, [key]: Number(input.value) };
    const out = root.querySelector<HTMLOutputElement>(`output[data-for="${key}"]`);
    if (out) out.textContent = input.dataset.unit === '%' ? `${Number(input.value).toFixed(1)}%` : fmtGBP(Number(input.value), key === 'fixedGBP' ? 0 : 2);
    render(false);
  });
  sliders.addEventListener('change', updateScenarioLink);

  markPreset();
  render(false);
}

function slider(name: keyof FeeInputs, label: string, value: number, lim: { min: number; max: number; step: number }, fmt: (v: number) => string): string {
  return `<label class="sc-slider">
    <span class="sc-slider-label">${esc(label)}</span>
    <input type="range" name="${name}" min="${lim.min}" max="${lim.max}" step="${lim.step}" value="${value}" data-unit="${name === 'fxPct' ? '%' : '£'}" />
    <output data-for="${name}">${fmt(value)}</output>
  </label>`;
}

function stageHtml(route: JourneyRoute, ev: RouteEvaluation, idx: number, fees: FeeInputs, cond: JourneyConditions): string {
  const steps = activeSteps(route, cond);
  const trace = traceValue(route, fees, cond);
  const stations = route.stations.slice(0, Math.max(...steps.map(s => s.station)) + 1);
  const atStation = idx < 0 ? 0 : steps[idx].station;
  const lastIdx = idx;
  const maxStop = ev.steps.findIndex(s => s.status === 'blocked' || s.status === 'held');
  const reachedEnd = ev.result === 'not-applicable' || idx === steps.length - 1 || (maxStop >= 0 && idx === maxStop);
  const finalIdx = steps.length - 1;
  const markOf = (i: number) => i === finalIdx ? 'spendable' : steps[i].marker === 'spendable' ? undefined : steps[i].marker;

  // Which station each marker belongs to, and the status of the step that brings value there.
  const stationStatus: (StepStatus | 'start' | 'ahead')[] = stations.map((_, si) => si === 0 ? 'start' : 'ahead');
  // A step lights every station it passes through, not just where the value lands.
  let prevStation = 0;
  steps.forEach((s, i) => {
    if (i <= lastIdx) {
      for (let si = prevStation + 1; si <= s.station; si++) stationStatus[si] = ev.steps[i].status;
      if (s.station === prevStation && s.station > 0) stationStatus[s.station] = ev.steps[i].status;
    }
    prevStation = Math.max(prevStation, s.station);
  });
  const markers = stations.map((_, si) => steps
    .map((s, i) => ({ s, i, kind: markOf(i) }))
    .filter(({ s, kind }) => kind && s.station === si)
    .map(({ i, kind }) => ({ kind: kind!, reached: i <= lastIdx && ev.steps[i].status !== 'blocked' && ev.steps[i].status !== 'held' })));

  const pos = stations.length > 1 ? atStation / (stations.length - 1) : 0;
  const motion = reducedMotion() ? ' sc-track--still' : '';

  const step = idx >= 0 ? steps[idx] : null;
  const out = idx >= 0 ? ev.steps[idx] : null;
  const stoppedHere = out && (out.status === 'blocked' || out.status === 'held');
  const row = idx >= 0 && !stoppedHere ? trace[idx] : (idx > 0 ? trace[idx - 1] : null);
  const valueNow = row ? row.valueGBP : SCENARIO.amountGBP;
  const feesNow = row ? row.feesToDateGBP : 0;
  const holder = row ? row.holder : 'Business';
  const form = row ? row.form : 'Pounds in a UK bank account';

  return `
  <p class="sc-route-line"><b>${esc(route.name)}.</b> ${esc(route.oneLine)}</p>
  <div class="sc-track${motion}" style="--stations:${stations.length};--pos:${pos}" aria-hidden="true">
    <div class="sc-track-line"><span class="sc-track-fill"></span></div>
    <span class="sc-chip-coin" title="£1,000"></span>
    <ol class="sc-stations">
      ${stations.map((name, si) => `
        <li class="sc-station sc-station--${stationStatus[si]}${si === atStation ? ' is-here' : ''}">
          <span class="sc-station-dot"></span>
          <span class="sc-station-name">${esc(name)}</span>
          <span class="sc-station-marks">${markers[si].map(m => `<i class="sc-mark sc-mark--${m.kind}${m.reached ? ' is-reached' : ''}" title="${MARK[m.kind].label}">${MARK[m.kind].glyph}</i>`).join('')}</span>
        </li>`).join('')}
    </ol>
  </div>
  <ol class="sr-only">
    ${steps.map((s, i) => `<li>Step ${i + 1}: ${esc(s.title)} (${STATUS_TEXT[ev.steps[i].status]})</li>`).join('')}
  </ol>

  <div class="sc-step-grid">
    <section class="sc-step-card" aria-labelledby="sc-step-title">
      <p class="sc-step-count">${idx < 0 ? 'Start' : `Step ${idx + 1} of ${steps.length}`}${step ? ` · ${esc(step.actor)}` : ''}</p>
      <h4 class="sc-step-title" id="sc-step-title">${step ? esc(step.title) : '£1,000 sits in the business’s bank account'}</h4>
      <p class="sc-step-detail">${step ? esc(step.detail) : 'Nothing has moved. The business holds a deposit, a claim on its own bank. Press Next to send the invoice payment.'}</p>
      ${out ? `<p class="sc-status sc-status--${out.status}"><span class="sc-pill sc-pill--${out.status}">${STATUS_TEXT[out.status]}</span>${out.reason ? ` ${esc(out.reason)}` : ''}</p>` : ''}
      <dl class="sc-value">
        <div><dt>Payment value now</dt><dd>${fmtGBP(valueNow)} <span class="sc-unit">£-equivalent</span></dd></div>
        <div><dt>Held by</dt><dd>${esc(holder)}, as ${esc(form.charAt(0).toLowerCase() + form.slice(1))}</dd></div>
        <div><dt>Fees and spreads so far</dt><dd>${fmtGBP(feesNow)} ${basis('illustrative', 'Uses the price assumptions below')}</dd></div>
      </dl>
      <div class="sc-controls" role="group" aria-label="Step through the payment">
        <button type="button" class="sc-btn" data-act="back"${idx < 0 ? ' disabled' : ''}>◀ Back</button>
        <button type="button" class="sc-btn sc-btn--primary" data-act="next"${reachedEnd ? ' disabled' : ''}>Next ▶</button>
        <button type="button" class="sc-btn" data-act="play" aria-pressed="false">Play</button>
        <button type="button" class="sc-btn sc-btn--quiet" data-act="restart"${idx < 0 ? ' disabled' : ''}>Restart</button>
      </div>
    </section>

    <section class="sc-ledger" aria-label="What changes in each layer at this step">
      <h4 class="sc-ledger-title">What changes at this step</h4>
      <dl class="sc-layers">
        ${LAYER_ORDER.map(layer => {
          const text = step ? step.layers[layer] : (layer === 'claim' ? 'The business holds a £1,000 deposit at its UK bank.' : undefined);
          return `<div class="sc-layer${text ? ' is-changed' : ''}">
            <dt>${LAYER_LABELS[layer]}</dt>
            <dd>${text ? esc(text) : 'No change'}</dd>
          </div>`;
        }).join('')}
      </dl>
    </section>
  </div>

  ${reachedEnd ? `<div class="sc-outcome sc-outcome--${ev.result}" role="note">
    <p class="sc-outcome-head"><span class="sc-pill sc-pill--${resultTone(ev.result)}">${RESULT_TEXT[ev.result]}</span> ${esc(ev.headline)}</p>
    <p class="sc-outcome-body">${outcomeBody(route, ev, fees, cond)}</p>
  </div>` : ''}
  <p class="sc-fair"><b>Strongest version of this route:</b> ${esc(route.bestCase)} <b>Watch:</b> ${esc(route.watch)}</p>`;
}

function resultTone(r: RouteEvaluation['result']): StepStatus {
  return r === 'spendable' ? 'done' : r === 'spendable-later' ? 'waits' : r === 'held' ? 'held' : r === 'not-applicable' ? 'not-reached' : 'blocked';
}

function outcomeBody(route: JourneyRoute, ev: RouteEvaluation, fees: FeeInputs, cond: JourneyConditions): string {
  const sum = summariseRoute(route, fees, cond);
  if (ev.result === 'not-applicable') return `${esc(ev.reason ?? '')} Pick “Wallet to wallet” to follow the token payment.`;
  if (ev.result === 'spendable' || ev.result === 'spendable-later') {
    return `With the illustrative prices, the supplier receives ${fmtGBP(sum.receivedGBP)}-equivalent after ${sum.fxConversions} conversion${sum.fxConversions === 1 ? '' : 's'}, ${sum.feeHandOffs} fee-charging hand-off${sum.feeHandOffs === 1 ? '' : 's'}${sum.onChainTransfers ? ` and ${sum.onChainTransfers} on-chain transfer` : ''}.`;
  }
  if (ev.result === 'held') return 'Every route screens payees. A hold is resolved by review, not by trying another route.';
  return ev.tokenMoved
    ? 'Value left the business and reached someone. It is not money the supplier can spend. Who gets it back, and how, depends on the providers involved.'
    : 'Nothing moved, which is the right outcome: a sender checks reachability before starting, not after.';
}

function compareRow(route: JourneyRoute, ev: RouteEvaluation, fees: FeeInputs, cond: JourneyConditions): string {
  const sum = summariseRoute(route, fees, cond);
  const steps = activeSteps(route, cond);
  const paid = ev.result === 'spendable' || ev.result === 'spendable-later';
  return `<li class="sc-cmp-row sc-cmp-row--${ev.result}">
    <div class="sc-cmp-name"><b>${esc(route.short)}</b><span class="sc-pill sc-pill--${resultTone(ev.result)}">${RESULT_TEXT[ev.result]}</span></div>
    <ol class="sc-cmp-steps" aria-label="${esc(route.short)} steps">
      ${steps.map((s, i) => {
        const kind = i === steps.length - 1 ? 'spendable' : s.marker === 'token' ? 'token' : '';
        return `<li class="sc-dot sc-dot--${ev.steps[i].status}" title="${esc(s.title)}: ${STATUS_TEXT[ev.steps[i].status]}">
        <span class="sr-only">${esc(s.title)}: ${STATUS_TEXT[ev.steps[i].status]}</span>
        ${kind ? `<i class="sc-mark sc-mark--${kind}" aria-hidden="true">${MARK[kind].glyph}</i>` : ''}
      </li>`;
      }).join('')}
    </ol>
    <p class="sc-cmp-head">${esc(ev.reason ?? ev.headline)}</p>
    <p class="sc-cmp-meta">${sum.fxConversions} conversion${sum.fxConversions === 1 ? '' : 's'} · ${sum.feeHandOffs} fee hand-off${sum.feeHandOffs === 1 ? '' : 's'}${sum.onChainTransfers ? ` · ${sum.onChainTransfers} on-chain transfer` : ''}
      · Supplier receives <b>${paid ? fmtGBP(sum.receivedGBP) : '—'}</b></p>
  </li>`;
}
