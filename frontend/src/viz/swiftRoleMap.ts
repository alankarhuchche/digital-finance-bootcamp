// SWIFT estate role-route map visual.
// Phases A–B1: Roles 1–2 implemented. Roles 3–6 disabled.
// Settlement is structurally outside the SWIFT estate — no active route into it.
// No money tokens. ACK/NACK = processing status, not settlement finality.
// Wired as a prototype preview block; not yet the live teaching visual. Do not set ready: true.

let seqToken = 0;
const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Types ─────────────────────────────────────────────────────────────────────

interface SrmInsight {
  roleType: string;
  whatProvides: string;
  whatNotDo: string;
  controlFocus: string;
  paragraph: string;
}

interface SrmRoleData {
  functionLabel: string;
  functionChips: string[];
  sourcesActive: string[];
  sourcesContext: string[];
  railIds: string[];
  servicePanelLabel?: string;  // overrides 'Service path' region label if set
  servicePanelNote?: string;   // optional note below rail panel
  destsActive: string[];
  destsContext: string[];
  evidActive: string[];
  evidContext: string[];
  outsideNote?: string;        // role-specific note inside outside-SWIFT block
  caption: string;
  insight: SrmInsight;
  mobileNodes: Array<{ label: string; sub: string; kind: 'sources' | 'boundary' | 'core' | 'dest' | 'evidence' }>;
}

// ── Static node definitions ───────────────────────────────────────────────────

const SOURCE_NODES = [
  { id: 'corporate-fi',   label: 'Corporate / FI' },
  { id: 'secure-web',     label: 'Secure web' },
  { id: 'api-channel',    label: 'API channel' },
  { id: 'score-macug',    label: 'SCORE / MA-CUG' },
  { id: 'scheme-service', label: 'Scheme / service access' },
];

const BOUNDARY_GATES = [
  { id: 'auth',          label: 'Authentication',       context: false },
  { id: 'entitlement',   label: 'Entitlement',          context: false },
  { id: 'signing',       label: 'Signing / integrity',  context: false },
  { id: 'secure-zone-c', label: 'Secure-zone controls', context: true },
];

const RAIL_DEFS: Array<{ id: string; label: string; terminalLabel: string }> = [
  { id: 'access-path',     label: 'Controlled access path', terminalLabel: 'Authenticated message' },
  // Role 2 — scheme / service connectivity rails (terminal is messaging handoff, not settlement)
  { id: 'chaps',           label: 'CHAPS',                  terminalLabel: 'Scheme / service interface' },
  { id: 'bacs',            label: 'Bacs',                   terminalLabel: 'Scheme / service interface' },
  { id: 'target-services', label: 'TARGET services',        terminalLabel: 'Scheme / service interface' },
  { id: 'sepa-related',    label: 'SEPA-related services',  terminalLabel: 'Scheme / service interface' },
  { id: 'cls',             label: 'CLS',                    terminalLabel: 'Scheme / service interface' },
  { id: 'crest',           label: 'CREST',                  terminalLabel: 'Scheme / service interface' },
];

const DEST_NODES = [
  { id: 'payments',   label: 'Payments' },
  { id: 'treasury',   label: 'Treasury' },
  { id: 'securities', label: 'Securities' },
  { id: 'reporting',  label: 'Reporting / investigation' },
];

const EVID_NODES = [
  { id: 'ack-nack',       label: 'ACK / NACK' },
  { id: 'route-decision', label: 'Route decision' },
  { id: 'audit',          label: 'Audit' },
  { id: 'archive',        label: 'Archive' },
  { id: 'investigation',  label: 'Investigation evidence' },
];

const OUTSIDE_NODES = [
  'RTGS', 'Nostro / vostro', 'Local clearing', 'Market infrastructure', 'Bank ledgers',
];

// ── Role selector metadata (all 6; r1–r2 enabled in Phase B1) ───────────────

const ROLE_META = [
  { id: 'r1', label: '01 · Channel and secure access', enabled: true },
  { id: 'r2', label: '02 · Scheme connector',           enabled: true },
  { id: 'r3', label: '03 · Routing and transformation', enabled: false },
  { id: 'r4', label: '04 · Controls and repair',        enabled: false },
  { id: 'r5', label: '05 · Contingency entry',          enabled: false },
  { id: 'r6', label: '06 · Evidence and archive',       enabled: false },
];

// ── Role data (r1 and r2 in Phase B1) ────────────────────────────────────────

const ROLE_CONFIGS: Record<string, SrmRoleData> = {
  r1: {
    functionLabel: 'Controlled access and authentication',
    functionChips: ['Classify', 'Route-validate'],
    sourcesActive: ['corporate-fi', 'secure-web', 'api-channel'],
    sourcesContext: ['score-macug'],
    railIds: ['access-path'],
    destsActive: ['payments'],
    destsContext: ['treasury'],
    evidActive: ['ack-nack', 'route-decision', 'audit'],
    evidContext: [],
    caption:
      'In this role, the SWIFT estate is an access layer. Corporates, financial ' +
      'institutions or authorised users may reach the bank through SWIFT channels, ' +
      'closed user groups, secure web access or API connectivity. The estate provides ' +
      'controlled connectivity and evidence; it does not manage liquidity or settle money.',
    insight: {
      roleType:     'Access layer',
      whatProvides: 'Controlled connectivity and evidence',
      whatNotDo:    'Liquidity management or settlement',
      controlFocus: 'Authentication, entitlement, signing and audit',
      paragraph:
        'In this role, the SWIFT estate is an access layer. Corporates, financial ' +
        'institutions or authorised users may reach the bank through SWIFT channels, ' +
        'closed user groups, secure web access or API connectivity. The estate provides ' +
        'controlled connectivity and evidence; it does not manage liquidity or settle money.',
    },
    mobileNodes: [
      { label: 'Corporate / FI · Secure web · API channel', sub: 'Sources',         kind: 'sources'  },
      { label: 'Authentication · Entitlement · Signing',    sub: 'SWIFT boundary',  kind: 'boundary' },
      { label: 'Controlled access and authentication',       sub: 'Estate function', kind: 'core'     },
      { label: 'Payments',                                   sub: 'Bank destination',kind: 'dest'     },
      { label: 'ACK / NACK · Route decision · Audit',       sub: 'Evidence',        kind: 'evidence' },
    ],
  },

  r2: {
    functionLabel: 'Scheme and service connectivity',
    functionChips: ['Service', 'Membership', 'BIC', 'Message rules'],
    sourcesActive:  ['scheme-service', 'api-channel'],
    sourcesContext: ['corporate-fi', 'secure-web'],
    railIds: ['chaps', 'bacs', 'target-services', 'sepa-related', 'cls', 'crest'],
    servicePanelLabel: 'Example service / infrastructure connectivity contexts',
    servicePanelNote:  'Access model, messaging path and participant role vary by service.',
    destsActive:  ['payments', 'treasury'],
    destsContext: ['securities', 'reporting'],
    evidActive:  ['ack-nack', 'route-decision', 'audit', 'archive'],
    evidContext: ['investigation'],
    outsideNote: 'Settlement depends on scheme, account structure or market infrastructure.',
    caption:
      'In this role, the SWIFT estate helps the bank connect to schemes, services or market ' +
      'infrastructures through controlled messaging and access arrangements. The estate ' +
      'classifies and routes messages by service, BIC, scheme, membership and backend ' +
      'ownership. SWIFT provides the messaging connection — settlement depends on the scheme, ' +
      'account structure or market infrastructure outside the SWIFT estate.',
    insight: {
      roleType:     'Scheme / infrastructure connectivity',
      whatProvides: 'Controlled messaging, access and routing',
      whatNotDo:    'Scheme settlement or finality',
      controlFocus: 'Membership, service, message type and destination routing',
      paragraph:
        'In this role, the SWIFT estate helps the bank connect to schemes, services or market ' +
        'infrastructures through controlled messaging and access arrangements. The estate ' +
        'classifies and routes messages by service, BIC, membership and backend ownership. ' +
        'The settlement arrangement remains outside SWIFT and depends on the relevant scheme, ' +
        'account structure or market infrastructure.',
    },
    mobileNodes: [
      { label: 'Scheme / service access · API channel',             sub: 'Sources',         kind: 'sources'  },
      { label: 'Authentication · Entitlement · Signing',            sub: 'SWIFT boundary',  kind: 'boundary' },
      { label: 'Scheme and service connectivity',                   sub: 'Estate function', kind: 'core'     },
      { label: 'Payments · Treasury',                               sub: 'Bank destination',kind: 'dest'     },
      { label: 'ACK / NACK · Route decision · Audit · Archive',    sub: 'Evidence',        kind: 'evidence' },
    ],
  },
};

// ── Entry point ───────────────────────────────────────────────────────────────

export function renderSwiftRoleMap(container: HTMLElement): void {
  const wrapper = document.createElement('div');
  wrapper.className = 'srm-wrapper';
  wrapper.innerHTML = buildShell();
  container.appendChild(wrapper);

  wrapper.querySelectorAll<HTMLButtonElement>('.srm-role-btn[data-role]').forEach(btn => {
    btn.addEventListener('click', () => {
      const meta = ROLE_META.find(r => r.id === btn.dataset.role && r.enabled);
      if (!meta) return;
      applyRole(wrapper, meta.id);
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  const first = ROLE_META.find(r => r.enabled);
  if (first) applyRole(wrapper, first.id);
}

// ── HTML shell ────────────────────────────────────────────────────────────────

function buildShell(): string {
  const roleBtns = ROLE_META.map(r => `
    <button class="srm-role-btn${r.enabled ? '' : ' srm-role-btn--pending'}"
            data-role="${r.id}"
            aria-pressed="false"
            ${r.enabled ? '' : 'disabled aria-disabled="true"'}>${r.label}</button>
  `).join('');

  const sourceNodes = SOURCE_NODES.map(n => `
    <div class="srm-source" data-srm-source="${n.id}" aria-label="${n.label}">
      <span class="srm-source-label">${n.label}</span>
    </div>
  `).join('');

  const gateNodes = BOUNDARY_GATES.map(g => `
    <div class="srm-gate${g.context ? ' srm-gate--context' : ''}"
         data-srm-gate="${g.id}"
         aria-label="${g.label}">
      <span class="srm-gate-label">${g.label}</span>
    </div>
  `).join('');

  const railNodes = RAIL_DEFS.map(r => `
    <div class="srm-rail" data-srm-rail="${r.id}">
      <div class="srm-rail-head">
        <span class="srm-rail-name">${r.label}</span>
      </div>
      <div class="srm-rail-body">
        <div class="srm-rail-track" aria-hidden="true"></div>
        <div class="srm-rail-terminal" data-srm-terminal="${r.id}"
             aria-label="${r.terminalLabel}">
          <span class="srm-terminal-label">${r.terminalLabel}</span>
        </div>
      </div>
    </div>
  `).join('');

  const destNodes = DEST_NODES.map(n => `
    <div class="srm-dest" data-srm-dest="${n.id}" aria-label="${n.label}">${n.label}</div>
  `).join('');

  const evidNodes = EVID_NODES.map(n => `
    <div class="srm-evid-node" data-srm-evid="${n.id}">${n.label}</div>
  `).join('');

  const outsideNodes = OUTSIDE_NODES.map(n =>
    `<span class="srm-outside-node">${n}</span>`
  ).join('');

  return `
    <div class="srm-controls">
      <div class="srm-role-group" role="group" aria-label="Select SWIFT estate role">
        ${roleBtns}
      </div>
    </div>

    <div class="srm-map-wrapper">
      <div class="srm-map">

        <div class="srm-sources">
          <div class="srm-region-label">Sources</div>
          ${sourceNodes}
        </div>

        <div class="srm-estate">
          <div class="srm-region-label">SWIFT estate — boundary</div>
          <div class="srm-boundary-band" data-srm-boundary>
            ${gateNodes}
          </div>
          <div class="srm-region-label srm-region-label--mt">Estate function</div>
          <div class="srm-core" data-srm-core>
            <div class="srm-core-label" data-srm-core-label></div>
            <div class="srm-core-chips" data-srm-core-chips></div>
          </div>
        </div>

        <div class="srm-service-panel">
          <div class="srm-region-label" data-srm-service-label>Service path</div>
          ${railNodes}
          <p class="srm-service-note" data-srm-service-note></p>
        </div>

        <div class="srm-destinations">
          <div class="srm-region-label">Bank processing systems</div>
          ${destNodes}
        </div>

      </div>
    </div>

    <div class="srm-mobile-strip" aria-hidden="true">
      <div class="srm-strip-nodes"></div>
    </div>

    <div class="srm-evidence-band">
      <div class="srm-region-label">Status and evidence</div>
      <div class="srm-evidence-nodes">${evidNodes}</div>
    </div>

    <div class="srm-outside">
      <div class="srm-outside-header">Outside SWIFT — settlement and accounting truth</div>
      <div class="srm-outside-nodes">${outsideNodes}</div>
      <p class="srm-outside-note" data-srm-outside-note></p>
    </div>

    <div class="srm-below-map">
      <div class="srm-caption-wrap">
        <p class="srm-caption"></p>
      </div>
      <div class="srm-insight-panel">
        <div class="srm-insight-header">Role insight</div>
        <dl class="srm-insight-fields">
          <div class="srm-insight-row">
            <dt class="srm-insight-label">Role type</dt>
            <dd class="srm-insight-value" data-insight="roleType"></dd>
          </div>
          <div class="srm-insight-row">
            <dt class="srm-insight-label">What SWIFT provides</dt>
            <dd class="srm-insight-value" data-insight="whatProvides"></dd>
          </div>
          <div class="srm-insight-row">
            <dt class="srm-insight-label">What SWIFT does not do</dt>
            <dd class="srm-insight-value" data-insight="whatNotDo"></dd>
          </div>
          <div class="srm-insight-row">
            <dt class="srm-insight-label">Control focus</dt>
            <dd class="srm-insight-value" data-insight="controlFocus"></dd>
          </div>
        </dl>
        <p class="srm-insight-para" data-insight="paragraph"></p>
      </div>
    </div>

    <div role="status" aria-live="polite" class="srm-sr-live"></div>`;
}

// ── Role application ──────────────────────────────────────────────────────────

function applyRole(wrapper: HTMLElement, roleId: string): void {
  const role = ROLE_CONFIGS[roleId];
  if (!role) return;

  const token = ++seqToken;
  const reduced = prefersReducedMotion();

  // ── Role buttons ──
  wrapper.querySelectorAll<HTMLButtonElement>('.srm-role-btn[data-role]').forEach(btn => {
    const on = btn.dataset.role === roleId;
    btn.classList.toggle('srm-role-btn--active', on);
    btn.setAttribute('aria-pressed', String(on));
  });

  // ── Reset all stateful classes ──
  wrapper.querySelectorAll<HTMLElement>('[data-srm-source]').forEach(el =>
    el.classList.remove('srm-source--active', 'srm-source--context', 'srm-seq-activate'));
  wrapper.querySelectorAll<HTMLElement>('[data-srm-gate]').forEach(el =>
    el.classList.remove('srm-gate--active'));
  wrapper.querySelectorAll<HTMLElement>('[data-srm-rail]').forEach(el =>
    el.classList.remove('srm-rail--active', 'srm-rail--shimmer'));
  wrapper.querySelectorAll<HTMLElement>('[data-srm-dest]').forEach(el =>
    el.classList.remove('srm-dest--active', 'srm-dest--context'));
  wrapper.querySelectorAll<HTMLElement>('[data-srm-evid]').forEach(el =>
    el.classList.remove('srm-evid-node--active', 'srm-evid-node--context'));
  wrapper.querySelector<HTMLElement>('[data-srm-core]')
    ?.classList.remove('srm-core--active', 'srm-core--pulse');
  wrapper.querySelector<HTMLElement>('[data-srm-boundary]')
    ?.classList.remove('srm-boundary-band--focus');

  // ── Function core content update ──
  const coreLabel = wrapper.querySelector<HTMLElement>('[data-srm-core-label]');
  const coreChips = wrapper.querySelector<HTMLElement>('[data-srm-core-chips]');
  if (coreLabel) coreLabel.textContent = role.functionLabel;
  if (coreChips) {
    coreChips.innerHTML = role.functionChips
      .map(c => `<span class="srm-core-chip">${c}</span>`).join('');
  }

  // ── Caption crossfade ──
  const cap = wrapper.querySelector<HTMLElement>('.srm-caption');
  if (cap) {
    cap.classList.add('srm-caption--out');
    setTimeout(() => {
      if (seqToken !== token) return;
      cap.textContent = role.caption;
      cap.classList.remove('srm-caption--out');
    }, 110);
  }

  // ── Insight panel crossfade ──
  const panel = wrapper.querySelector<HTMLElement>('.srm-insight-panel');
  if (panel) {
    panel.classList.add('srm-insight--out');
    setTimeout(() => {
      if (seqToken !== token) return;
      const ins = role.insight;
      (['roleType', 'whatProvides', 'whatNotDo', 'controlFocus'] as const).forEach(key => {
        const el = panel.querySelector<HTMLElement>(`[data-insight="${key}"]`);
        if (el) el.textContent = ins[key];
      });
      const para = panel.querySelector<HTMLElement>('[data-insight="paragraph"]');
      if (para) para.textContent = ins.paragraph;
      panel.classList.remove('srm-insight--out');
    }, 110);
  }

  // ── Service panel label and note ──
  const serviceLabelEl = wrapper.querySelector<HTMLElement>('[data-srm-service-label]');
  if (serviceLabelEl) serviceLabelEl.textContent = role.servicePanelLabel ?? 'Service path';
  const serviceNoteEl = wrapper.querySelector<HTMLElement>('[data-srm-service-note]');
  if (serviceNoteEl) serviceNoteEl.textContent = role.servicePanelNote ?? '';

  // ── Outside-SWIFT note ──
  const outsideNoteEl = wrapper.querySelector<HTMLElement>('[data-srm-outside-note]');
  if (outsideNoteEl) outsideNoteEl.textContent = role.outsideNote ?? '';

  // ── aria-live ──
  const live = wrapper.querySelector<HTMLElement>('.srm-sr-live');
  if (live) {
    live.textContent =
      `SWIFT estate role: ${ROLE_META.find(r => r.id === roleId)?.label ?? roleId}. ` +
      `Role type: ${role.insight.roleType}. ` +
      `What SWIFT does not do: ${role.insight.whatNotDo}.`;
  }

  // ── Mobile strip ──
  updateMobileStrip(wrapper, role);

  if (reduced) {
    applyFinalState(wrapper, role);
    return;
  }

  // ── Sequenced choreography ──

  // Step 1 — Sources: synchronous (no flash before first activation)
  activateSources(wrapper, role);

  // Step 2 — Boundary gates: staggered (150ms start, 80ms per gate)
  seq(token, 150, () => {
    const gates = Array.from(wrapper.querySelectorAll<HTMLElement>('[data-srm-gate]'));
    gates.forEach((gate, i) => {
      setTimeout(() => {
        if (seqToken !== token) return;
        gate.classList.add('srm-gate--active');
      }, i * 80);
    });
    // Boundary band gets focus in Role 1 — the primary story is the boundary
    if (roleId === 'r1') {
      setTimeout(() => {
        if (seqToken !== token) return;
        wrapper.querySelector<HTMLElement>('[data-srm-boundary]')
          ?.classList.add('srm-boundary-band--focus');
      }, gates.length * 80);
    }
  });

  // Step 3 — Function core: activate + one-shot pulse (430ms)
  seq(token, 430, () => {
    const core = wrapper.querySelector<HTMLElement>('[data-srm-core]');
    if (!core) return;
    core.classList.add('srm-core--active');
    void core.offsetWidth;
    core.classList.add('srm-core--pulse');
    setTimeout(() => {
      if (seqToken !== token) return;
      core.classList.remove('srm-core--pulse');
    }, 650);
  });

  // Step 4 — Service rails + track shimmer (650ms)
  seq(token, 650, () => {
    const activeRails = new Set(role.railIds);
    wrapper.querySelectorAll<HTMLElement>('[data-srm-rail]').forEach(el => {
      const on = activeRails.has(el.dataset.srmRail!);
      if (!on) return;
      el.classList.add('srm-rail--active');
      el.classList.add('srm-rail--shimmer');
      setTimeout(() => {
        if (seqToken !== token) return;
        el.classList.remove('srm-rail--shimmer');
      }, 750);
    });
  });

  // Step 5 — Destinations (850ms)
  seq(token, 850, () => {
    activateDests(wrapper, role);
  });

  // Step 6 — Evidence cascade (1020ms + 50ms per node)
  seq(token, 1020, () => {
    const activeEvid = new Set(role.evidActive);
    const contextEvid = new Set(role.evidContext);
    const nodes = Array.from(wrapper.querySelectorAll<HTMLElement>('[data-srm-evid]'));
    nodes.forEach((node, i) => {
      setTimeout(() => {
        if (seqToken !== token) return;
        const id = node.dataset.srmEvid!;
        if (activeEvid.has(id)) node.classList.add('srm-evid-node--active');
        else if (contextEvid.has(id)) node.classList.add('srm-evid-node--context');
      }, i * 50);
    });
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function seq(token: number, delay: number, fn: () => void): void {
  setTimeout(() => {
    if (seqToken !== token) return;
    fn();
  }, delay);
}

function activateSources(wrapper: HTMLElement, role: SrmRoleData): void {
  const activeSet  = new Set(role.sourcesActive);
  const contextSet = new Set(role.sourcesContext);
  wrapper.querySelectorAll<HTMLElement>('[data-srm-source]').forEach(el => {
    const id = el.dataset.srmSource!;
    if (activeSet.has(id)) {
      el.classList.add('srm-source--active', 'srm-seq-activate');
      setTimeout(() => el.classList.remove('srm-seq-activate'), 400);
    } else if (contextSet.has(id)) {
      el.classList.add('srm-source--context');
    }
  });
}

function activateDests(wrapper: HTMLElement, role: SrmRoleData): void {
  const activeSet  = new Set(role.destsActive);
  const contextSet = new Set(role.destsContext);
  wrapper.querySelectorAll<HTMLElement>('[data-srm-dest]').forEach(el => {
    const id = el.dataset.srmDest!;
    if (activeSet.has(id))       el.classList.add('srm-dest--active');
    else if (contextSet.has(id)) el.classList.add('srm-dest--context');
  });
}

function applyFinalState(wrapper: HTMLElement, role: SrmRoleData): void {
  activateSources(wrapper, role);
  Array.from(wrapper.querySelectorAll<HTMLElement>('[data-srm-gate]'))
    .forEach(el => el.classList.add('srm-gate--active'));
  if (role.railIds.includes('access-path')) {
    wrapper.querySelector<HTMLElement>('[data-srm-boundary]')
      ?.classList.add('srm-boundary-band--focus');
  }
  const core = wrapper.querySelector<HTMLElement>('[data-srm-core]');
  if (core) core.classList.add('srm-core--active');
  const activeRails = new Set(role.railIds);
  wrapper.querySelectorAll<HTMLElement>('[data-srm-rail]').forEach(el => {
    if (activeRails.has(el.dataset.srmRail!)) el.classList.add('srm-rail--active');
  });
  activateDests(wrapper, role);
  const activeEvid  = new Set(role.evidActive);
  const contextEvid = new Set(role.evidContext);
  wrapper.querySelectorAll<HTMLElement>('[data-srm-evid]').forEach(el => {
    const id = el.dataset.srmEvid!;
    if (activeEvid.has(id))       el.classList.add('srm-evid-node--active');
    else if (contextEvid.has(id)) el.classList.add('srm-evid-node--context');
  });
}

function updateMobileStrip(wrapper: HTMLElement, role: SrmRoleData): void {
  const strip = wrapper.querySelector<HTMLElement>('.srm-strip-nodes');
  if (!strip) return;
  strip.innerHTML = role.mobileNodes.map((node, i) => {
    const last = i === role.mobileNodes.length - 1;
    return `<div class="srm-strip-node srm-strip-node--${node.kind}">
      <span class="srm-strip-node-sub">${node.sub}</span>
      <span>${node.label}</span>
    </div>${last ? '' : '<div class="srm-strip-arrow" aria-hidden="true">↓</div>'}`;
  }).join('');
}
