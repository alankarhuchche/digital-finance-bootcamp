import {
  ROUTE_NODES, ROUTE_DECISION_CHIPS, SCENARIOS,
  type RouteScenario,
} from '../data/bankRouteMap';

const NODE_MAP = new Map(ROUTE_NODES.map(n => [n.id, n]));

const MATURITY_LABELS: Record<string, string> = {
  live: 'LIVE',
  modernising: 'MODERNISING',
  sandbox: 'SANDBOX',
  emerging: 'EMERGING',
};

// Node category sets — used for sequenced activation
const SOURCE_IDS   = new Set(ROUTE_NODES.filter(n => n.zone === 'channels').map(n => n.id));
const GATE_IDS     = new Set(ROUTE_NODES.filter(n => n.zone === 'controls').map(n => n.id));
const TERMINAL_IDS = new Set(['scheme-confirm', 'rtgs-finality', 'correspondent-settle', 'blockchain-finality', 'dvp']);
const LEG_IDS      = new Set(['cash-leg', 'asset-leg', 'off-ramp']);
const LEDGER_IDS   = new Set(ROUTE_NODES.filter(n => n.zone === 'ledgers').map(n => n.id));

// Cancellation token — incremented on every scenario switch
let seqToken = 0;

// Reduced motion query
const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function renderBankRouteMap(container: HTMLElement): void {
  let current = SCENARIOS[0];

  const wrapper = document.createElement('div');
  wrapper.className = 'brm-wrapper';
  wrapper.innerHTML = buildShell();
  container.appendChild(wrapper);

  wrapper.querySelectorAll<HTMLButtonElement>('.brm-scenario-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = SCENARIOS.find(x => x.id === btn.dataset.scenario);
      if (!s || s.id === current.id) return;
      current = s;
      applyScenario(wrapper, current);
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  applyScenario(wrapper, current);
}

// ─── HTML shell ──────────────────────────────────────────────────────────────

function buildShell(): string {
  const scenarioBtns = SCENARIOS.map(s => `
    <button class="brm-scenario-btn" data-scenario="${s.id}" aria-pressed="false">
      ${s.label}
      <span class="brm-pill brm-pill--${s.maturity}">${s.maturityLabel}</span>
    </button>`).join('');

  return `
    <div class="brm-controls">
      <div class="brm-scenario-group" role="group" aria-label="Payment scenarios">
        ${scenarioBtns}
      </div>
    </div>

    <div class="brm-map-wrapper">
      <div class="brm-map">
        ${buildSources()}
        ${buildMiddle()}
        ${buildRailsPanel()}
        ${buildLedgers()}
      </div>
    </div>

    <div class="brm-mobile-strip" aria-hidden="true">
      <div class="brm-strip-nodes"></div>
    </div>

    <div class="brm-below-map">
    <div class="brm-caption-wrap">
      <p class="brm-caption"></p>
    </div>

    <div class="brm-insight-panel">
      <div class="brm-insight-header">Route insight</div>
      <dl class="brm-insight-fields">
        <div class="brm-insight-row">
          <dt class="brm-insight-label">Route type</dt>
          <dd class="brm-insight-value" data-insight="routeType"></dd>
        </div>
        <div class="brm-insight-row">
          <dt class="brm-insight-label">Control focus</dt>
          <dd class="brm-insight-value" data-insight="controlFocus"></dd>
        </div>
        <div class="brm-insight-row">
          <dt class="brm-insight-label">Settlement model</dt>
          <dd class="brm-insight-value" data-insight="settlementModel"></dd>
        </div>
        <div class="brm-insight-row">
          <dt class="brm-insight-label">Main operating risk</dt>
          <dd class="brm-insight-value" data-insight="mainRisk"></dd>
        </div>
        <div class="brm-insight-row brm-insight-row--judgement">
          <dt class="brm-insight-label">Practitioner judgement</dt>
          <dd class="brm-insight-value" data-insight="judgement"></dd>
        </div>
      </dl>
    </div>
    </div>

    <div role="status" aria-live="polite" class="brm-sr-live"></div>`;
}

function buildSources(): string {
  const nodes = ROUTE_NODES.filter(n => n.zone === 'channels');
  return `
    <div class="brm-sources">
      <div class="brm-region-label">Channels</div>
      ${nodes.map(n => `
        <div class="brm-source" data-node-id="${n.id}" aria-label="${n.label}">
          <span class="brm-source-label">${n.label}</span>
        </div>`).join('')}
    </div>`;
}

function buildMiddle(): string {
  const gateNodes = ROUTE_NODES.filter(n => n.zone === 'controls');
  const gates = gateNodes.map(n => `
    <div class="brm-gate" data-node-id="${n.id}" aria-label="${n.label}">
      <span class="brm-gate-label">${n.label}</span>
    </div>`).join('');

  const chips = ROUTE_DECISION_CHIPS
    .map(c => `<span class="brm-core-chip">${c}</span>`).join('');

  return `
    <div class="brm-middle">
      <div class="brm-region-label">Controls</div>
      <div class="brm-gate-band">${gates}</div>
      <div class="brm-region-label brm-region-label--mt">Route decision</div>
      <div class="brm-core" data-node-id="route-decision"
           aria-label="Route decision: ${ROUTE_DECISION_CHIPS.join(', ')}">
        <div class="brm-core-chips">${chips}</div>
      </div>
    </div>`;
}

function buildRailsPanel(): string {
  const railDefs = [
    {
      nodeId: 'faster-payments',
      label: 'Faster Payments',
      maturity: 'live',
      terminalNodeId: 'scheme-confirm',
      terminalLabel: 'Scheme confirmation',
      legs: null as null | { id: string; label: string }[],
    },
    {
      nodeId: 'chaps-rtgs',
      label: 'CHAPS / RTGS',
      maturity: 'modernising',
      terminalNodeId: 'rtgs-finality',
      terminalLabel: 'RTGS finality',
      legs: null,
    },
    {
      nodeId: 'swift-correspondent',
      label: 'SWIFT / correspondent',
      maturity: 'modernising',
      terminalNodeId: 'correspondent-settle',
      terminalLabel: 'Correspondent settlement',
      legs: null,
    },
    {
      nodeId: 'stablecoin-network',
      label: 'Stablecoin network',
      maturity: 'emerging',
      terminalNodeId: 'blockchain-finality',
      terminalLabel: 'Blockchain finality',
      legs: [{ id: 'off-ramp', label: 'Off-ramp' }],
    },
    {
      nodeId: 'tokenised-asset-net',
      label: 'Tokenised asset network',
      maturity: 'sandbox',
      terminalNodeId: 'dvp',
      terminalLabel: 'DvP',
      legs: [
        { id: 'cash-leg', label: 'Cash leg' },
        { id: 'asset-leg', label: 'Asset leg' },
      ],
    },
  ];

  return `
    <div class="brm-rails-panel">
      <div class="brm-region-label">Rails / networks → Settlement</div>
      ${railDefs.map(r => `
        <div class="brm-rail" data-rail-node-id="${r.nodeId}" data-maturity="${r.maturity}">
          <div class="brm-rail-head">
            <span class="brm-rail-name">${r.label}</span>
            <span class="brm-pill brm-pill--${r.maturity}">${MATURITY_LABELS[r.maturity]}</span>
          </div>
          <div class="brm-rail-body">
            <div class="brm-rail-track" aria-hidden="true"></div>
            <div class="brm-rail-terminal" data-node-id="${r.terminalNodeId}"
                 aria-label="${r.terminalLabel}">
              <span class="brm-terminal-label">${r.terminalLabel}</span>
              ${r.legs ? `<div class="brm-terminal-legs">
                ${r.legs.map(l => `<span class="brm-terminal-leg" data-node-id="${l.id}"
                  aria-label="${l.label}">${l.label}</span>`).join('')}
              </div>` : ''}
            </div>
          </div>
        </div>`).join('')}
    </div>`;
}

function buildLedgers(): string {
  const nodes = ROUTE_NODES.filter(n => n.zone === 'ledgers');
  return `
    <div class="brm-ledgers">
      <div class="brm-region-label">Ledgers & evidence</div>
      ${nodes.map(n => `
        <div class="brm-ledger" data-node-id="${n.id}" aria-label="${n.label}">
          ${n.label}
        </div>`).join('')}
    </div>`;
}

// ─── Scenario application ─────────────────────────────────────────────────────

function applyScenario(wrapper: HTMLElement, scenario: RouteScenario): void {
  const token = ++seqToken;
  const active = new Set(scenario.activeNodes);
  const reduced = prefersReducedMotion();

  // ── Scenario buttons ──
  wrapper.querySelectorAll<HTMLButtonElement>('.brm-scenario-btn').forEach(btn => {
    const on = btn.dataset.scenario === scenario.id;
    btn.classList.toggle('brm-scenario-btn--active', on);
    btn.setAttribute('aria-pressed', String(on));
  });

  // ── Reset: mute everything, clear animation classes ──
  wrapper.querySelectorAll<HTMLElement>('[data-node-id]').forEach(el => {
    el.classList.remove('brm-active', 'brm-seq-activate', 'brm-seq-lock');
    el.classList.add('brm-muted');
  });
  wrapper.querySelectorAll<HTMLElement>('[data-rail-node-id]').forEach(el => {
    el.classList.remove('brm-rail--active', 'brm-rail--shimmer');
    el.classList.add('brm-rail--muted');
  });
  wrapper.querySelector<HTMLElement>('.brm-core')?.classList.remove('brm-core--pulse');

  // ── Caption crossfade ──
  const cap = wrapper.querySelector<HTMLElement>('.brm-caption');
  if (cap) {
    cap.classList.add('brm-caption--out');
    setTimeout(() => {
      if (seqToken !== token) return;
      cap.textContent = scenario.caption;
      cap.classList.remove('brm-caption--out');
    }, 110);
  }

  // ── Insight panel crossfade ──
  const panel = wrapper.querySelector<HTMLElement>('.brm-insight-panel');
  if (panel) {
    panel.classList.add('brm-insight--out');
    setTimeout(() => {
      if (seqToken !== token) return;
      const ins = scenario.insight;
      (['routeType', 'controlFocus', 'settlementModel', 'mainRisk', 'judgement'] as const).forEach(key => {
        const el = panel.querySelector<HTMLElement>(`[data-insight="${key}"]`);
        if (el) el.textContent = ins[key];
      });
      panel.classList.remove('brm-insight--out');
    }, 110);
  }

  // ── aria-live: announce scenario, not individual steps ──
  const live = wrapper.querySelector<HTMLElement>('.brm-sr-live');
  if (live) live.textContent = scenario.ariaDescription;

  // ── Mobile strip ──
  updateMobileStrip(wrapper, scenario);

  // ── Reduced motion: skip choreography, apply final state immediately ──
  if (reduced) {
    applyFinalState(wrapper, active, scenario);
    return;
  }

  // ── Sequenced choreography ──

  // Step 1 — Sources: activate synchronously (no flash before step 1)
  activateSources(wrapper, active);

  // Step 2 — Control gates: staggered (150ms + 80ms per gate)
  seq(token, 150, () => {
    const gates = nodesByCategory(wrapper, GATE_IDS);
    gates.forEach((gate, i) => {
      setTimeout(() => {
        if (seqToken !== token) return;
        const on = active.has(gate.dataset.nodeId!);
        gate.classList.toggle('brm-active', on);
        gate.classList.toggle('brm-muted', !on);
      }, i * 80);
    });
  });

  // Step 3 — Route decision core: activate + one-shot pulse (430ms)
  seq(token, 430, () => {
    const core = wrapper.querySelector<HTMLElement>('[data-node-id="route-decision"]');
    if (!core) return;
    core.classList.remove('brm-muted');
    core.classList.add('brm-active');
    // Force reflow so animation restarts cleanly
    void core.offsetWidth;
    core.classList.add('brm-core--pulse');
    setTimeout(() => {
      if (seqToken !== token) return;
      core.classList.remove('brm-core--pulse');
    }, 650);
  });

  // Step 4 — Rail lanes + one-shot shimmer (650ms)
  seq(token, 650, () => {
    wrapper.querySelectorAll<HTMLElement>('[data-rail-node-id]').forEach(el => {
      const on = active.has(el.dataset.railNodeId!);
      el.classList.toggle('brm-rail--active', on);
      el.classList.toggle('brm-rail--muted', !on);
      if (on && el.dataset.maturity !== 'sandbox' && el.dataset.maturity !== 'emerging') {
        el.classList.add('brm-rail--shimmer');
        setTimeout(() => {
          if (seqToken !== token) return;
          el.classList.remove('brm-rail--shimmer');
        }, 750);
      }
    });
  });

  // Step 5 — Settlement terminals + lock flash (900ms)
  seq(token, 900, () => {
    const terminals = nodesByCategory(wrapper, TERMINAL_IDS);
    terminals.forEach(el => {
      const on = active.has(el.dataset.nodeId!);
      el.classList.toggle('brm-active', on);
      el.classList.toggle('brm-muted', !on);
      if (on) {
        el.classList.add('brm-seq-lock');
        setTimeout(() => el.classList.remove('brm-seq-lock'), 550);
      }
    });
    // DvP legs activate alongside terminal
    nodesByCategory(wrapper, LEG_IDS).forEach(el => {
      const on = active.has(el.dataset.nodeId!);
      el.classList.toggle('brm-active', on);
      el.classList.toggle('brm-muted', !on);
    });
  });

  // Step 6 — Evidence badges: staggered cascade (1080ms + 55ms per badge)
  seq(token, 1080, () => {
    const badges = nodesByCategory(wrapper, LEDGER_IDS);
    badges.forEach((badge, i) => {
      setTimeout(() => {
        if (seqToken !== token) return;
        const on = active.has(badge.dataset.nodeId!);
        badge.classList.toggle('brm-active', on);
        badge.classList.toggle('brm-muted', !on);
      }, i * 55);
    });
  });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function seq(token: number, delay: number, fn: () => void): void {
  setTimeout(() => {
    if (seqToken !== token) return;
    fn();
  }, delay);
}

// Returns elements whose data-node-id is in the given set, in DOM order
function nodesByCategory(wrapper: HTMLElement, ids: Set<string>): HTMLElement[] {
  return Array.from(
    wrapper.querySelectorAll<HTMLElement>('[data-node-id]')
  ).filter(el => ids.has(el.dataset.nodeId!));
}

// Sources activate first — called synchronously to avoid one-frame all-muted flash
function activateSources(wrapper: HTMLElement, active: Set<string>): void {
  nodesByCategory(wrapper, SOURCE_IDS).forEach(el => {
    const on = active.has(el.dataset.nodeId!);
    el.classList.toggle('brm-active', on);
    el.classList.toggle('brm-muted', !on);
    if (on) {
      el.classList.add('brm-seq-activate');
      setTimeout(() => el.classList.remove('brm-seq-activate'), 400);
    }
  });
}

// Immediate final state — used for reduced-motion and initial render
function applyFinalState(wrapper: HTMLElement, active: Set<string>, scenario?: RouteScenario): void {
  wrapper.querySelectorAll<HTMLElement>('[data-node-id]').forEach(el => {
    const on = active.has(el.dataset.nodeId!);
    el.classList.toggle('brm-active', on);
    el.classList.toggle('brm-muted', !on);
  });
  wrapper.querySelectorAll<HTMLElement>('[data-rail-node-id]').forEach(el => {
    const on = active.has(el.dataset.railNodeId!);
    el.classList.toggle('brm-rail--active', on);
    el.classList.toggle('brm-rail--muted', !on);
  });
  if (scenario) {
    const panel = wrapper.querySelector<HTMLElement>('.brm-insight-panel');
    if (panel) {
      const ins = scenario.insight;
      (['routeType', 'controlFocus', 'settlementModel', 'mainRisk', 'judgement'] as const).forEach(key => {
        const el = panel.querySelector<HTMLElement>(`[data-insight="${key}"]`);
        if (el) el.textContent = ins[key];
      });
    }
  }
}

// ─── Mobile strip ─────────────────────────────────────────────────────────────

function updateMobileStrip(wrapper: HTMLElement, scenario: RouteScenario): void {
  const strip = wrapper.querySelector<HTMLElement>('.brm-strip-nodes');
  if (!strip) return;

  strip.innerHTML = scenario.mobileStrip.map((id, i) => {
    const n = NODE_MAP.get(id);
    if (!n) return '';
    const pill = n.maturity
      ? `<span class="brm-pill brm-pill--${n.maturity}">${MATURITY_LABELS[n.maturity]}</span>` : '';
    const last = i === scenario.mobileStrip.length - 1;
    return `<div class="brm-strip-node brm-strip-node--${n.zone}">
      <span>${n.label}</span>${pill}
    </div>${last ? '' : '<div class="brm-strip-arrow" aria-hidden="true">↓</div>'}`;
  }).join('');
}
