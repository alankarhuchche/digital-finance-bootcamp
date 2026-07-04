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

    <div class="brm-caption-wrap">
      <p class="brm-caption"></p>
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
  const active = new Set(scenario.activeNodes);

  // Scenario buttons
  wrapper.querySelectorAll<HTMLButtonElement>('.brm-scenario-btn').forEach(btn => {
    const on = btn.dataset.scenario === scenario.id;
    btn.classList.toggle('brm-scenario-btn--active', on);
    btn.setAttribute('aria-pressed', String(on));
  });

  // All activatable elements via data-node-id
  wrapper.querySelectorAll<HTMLElement>('[data-node-id]').forEach(el => {
    const on = active.has(el.dataset.nodeId!);
    el.classList.toggle('brm-active', on);
    el.classList.toggle('brm-muted', !on);
  });

  // Rail lanes via data-rail-node-id
  wrapper.querySelectorAll<HTMLElement>('[data-rail-node-id]').forEach(el => {
    const on = active.has(el.dataset.railNodeId!);
    el.classList.toggle('brm-rail--active', on);
    el.classList.toggle('brm-rail--muted', !on);
  });

  // Caption crossfade
  const cap = wrapper.querySelector<HTMLElement>('.brm-caption');
  if (cap) {
    cap.classList.add('brm-caption--out');
    setTimeout(() => {
      cap.textContent = scenario.caption;
      cap.classList.remove('brm-caption--out');
    }, 110);
  }

  // aria-live
  const live = wrapper.querySelector<HTMLElement>('.brm-sr-live');
  if (live) live.textContent = scenario.ariaDescription;

  // Mobile strip
  updateMobileStrip(wrapper, scenario);
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
