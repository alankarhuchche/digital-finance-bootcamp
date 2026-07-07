// SWIFT estate role-route map visual.
// Phases A–B4: Roles 1–5 implemented. Role 6 disabled.
// Direction model (B1.5): bank systems (left) ⇄ SWIFT estate ⇄ external / network side (right).
// Role 1 = inbound channel. Role 2 = outbound gateway / scheme connector. Role 3 = bidirectional routing and transformation. Role 4 = control overlay. Role 5 = controlled contingency entry.
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
  bankSideActive: string[];     // left column — bank-internal systems active for this role
  bankSideContext: string[];    // left column — bank-internal systems shown as context
  railIds: string[];
  servicePanelLabel?: string;
  servicePanelNote?: string;
  externalActive: string[];     // right column — external/network side nodes active for this role
  externalContext: string[];    // right column — external/network side nodes shown as context
  evidActive: string[];
  evidContext: string[];
  outsideNote?: string;
  direction: 'inbound' | 'outbound' | 'bidirectional' | 'overlay' | 'contingency';
  caption: string;
  insight: SrmInsight;
  mobileNodes: Array<{ label: string; sub: string; kind: 'sources' | 'boundary' | 'core' | 'dest' | 'evidence' }>;
}

// ── Static node definitions ───────────────────────────────────────────────────

// Left column — bank-internal systems (source for outbound; destination for inbound)
const BANK_SIDE_NODES = [
  { id: 'payments',          label: 'Payments' },
  { id: 'treasury',          label: 'Treasury' },
  { id: 'securities',        label: 'Securities' },
  { id: 'reporting',         label: 'Reporting / investigation' },
  { id: 'internal-app',      label: 'Internal app / file' },
  { id: 'contingency-entry', label: 'Contingency entry' },
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
  // Role 3 — message / service-family routing paths (terminal is routed message, not settlement)
  { id: 'mt-payment',       label: 'MT payment messages',    terminalLabel: 'Routed message' },
  { id: 'iso-pacs',         label: 'ISO 20022 pacs',         terminalLabel: 'Routed message' },
  { id: 'iso-camt',         label: 'ISO 20022 camt',         terminalLabel: 'Routed message' },
  { id: 'trade-securities', label: 'Trade / securities',     terminalLabel: 'Routed message' },
  // Role 4 — control outcome lanes (terminal is disposition state, not settlement)
  { id: 'control-validate', label: 'Validate',               terminalLabel: 'Disposition state' },
  { id: 'control-screen',   label: 'Screen',                 terminalLabel: 'Disposition state' },
  { id: 'control-repair',   label: 'Repair queue',           terminalLabel: 'Disposition state' },
  { id: 'control-hold',     label: 'Hold / reject',          terminalLabel: 'Disposition state' },
  { id: 'control-release',  label: 'Release',                terminalLabel: 'Disposition state' },
  // Role 5 — control-mandate lanes (terminal is controlled contingency state, not settlement)
  { id: 'contingency-intake',         label: 'Manual intake',           terminalLabel: 'Controlled contingency state' },
  { id: 'contingency-approval',       label: 'Approval check',          terminalLabel: 'Controlled contingency state' },
  { id: 'contingency-sanctions',      label: 'Sanctions screen',        terminalLabel: 'Controlled contingency state' },
  { id: 'contingency-release',        label: 'Release / hold',          terminalLabel: 'Controlled contingency state' },
  { id: 'contingency-reconciliation', label: 'Reconciliation evidence', terminalLabel: 'Controlled contingency state' },
  { id: 'contingency-retention',      label: 'Retention',               terminalLabel: 'Controlled contingency state' },
];

// Right column — external/network side (source for inbound; destination for outbound)
const EXTERNAL_NODES = [
  { id: 'corporate-fi',    label: 'Corporate / FI' },
  { id: 'correspondent-fi',label: 'Correspondent / FI' },
  { id: 'secure-web',      label: 'Secure web' },
  { id: 'api-channel',     label: 'API channel' },
  { id: 'score-macug',     label: 'SCORE / MA-CUG' },
  { id: 'scheme-service',  label: 'Scheme / service access' },
];

const EVID_NODES = [
  { id: 'ack-nack',            label: 'ACK / NACK' },
  { id: 'route-decision',      label: 'Route decision' },
  { id: 'audit',               label: 'Audit' },
  { id: 'archive',             label: 'Archive' },
  { id: 'repair-trail',        label: 'Repair trail' },
  { id: 'gpi-uetr',            label: 'gpi / UETR' },
  { id: 'investigation',       label: 'Investigation evidence' },
  { id: 'reconciliation-evid', label: 'Reconciliation evidence' },
  { id: 'retention-evid',      label: 'Retention' },
];

const OUTSIDE_NODES = [
  'RTGS', 'Nostro / vostro', 'Local clearing', 'Market infrastructure', 'Bank ledgers',
];

// ── Role selector metadata (all 6; r1–r5 enabled through Phase B4) ──────────

const ROLE_META = [
  { id: 'r1', label: '01 · Channel and secure access', enabled: true },
  { id: 'r2', label: '02 · Scheme connector',           enabled: true },
  { id: 'r3', label: '03 · Routing and transformation', enabled: true },
  { id: 'r4', label: '04 · Controls and repair',        enabled: true },
  { id: 'r5', label: '05 · Contingency entry',          enabled: true },
  { id: 'r6', label: '06 · Evidence and archive',       enabled: false },
];

// ── Role data (r1–r5; direction model corrected in Phase B1.5) ────────────────

const ROLE_CONFIGS: Record<string, SrmRoleData> = {
  r1: {
    functionLabel: 'Controlled access and authentication',
    functionChips: ['Classify', 'Route-validate'],
    bankSideActive:  ['payments'],
    bankSideContext: ['treasury'],
    railIds: ['access-path'],
    externalActive:  ['corporate-fi', 'secure-web', 'api-channel'],
    externalContext: ['score-macug'],
    evidActive: ['ack-nack', 'route-decision', 'audit'],
    evidContext: [],
    direction: 'inbound',
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
      { label: 'Corporate / FI · Secure web · API channel', sub: 'External / network side', kind: 'sources'  },
      { label: 'Authentication · Entitlement · Signing',    sub: 'SWIFT boundary',           kind: 'boundary' },
      { label: 'Controlled access and authentication',       sub: 'Estate function',          kind: 'core'     },
      { label: 'Payments',                                   sub: 'Bank systems',             kind: 'dest'     },
      { label: 'ACK / NACK · Route decision · Audit',       sub: 'Evidence',                 kind: 'evidence' },
    ],
  },

  r2: {
    functionLabel: 'Scheme and service connectivity',
    functionChips: ['Service', 'Membership', 'BIC', 'Message rules'],
    bankSideActive:  ['payments', 'treasury'],
    bankSideContext: ['securities', 'reporting'],
    railIds: ['chaps', 'bacs', 'target-services', 'sepa-related', 'cls', 'crest'],
    servicePanelLabel: 'Example service / infrastructure connectivity contexts',
    servicePanelNote:  'Access model, messaging path and participant role vary by service.',
    externalActive:  [],
    externalContext: ['scheme-service'],
    evidActive:  ['ack-nack', 'route-decision', 'audit', 'archive'],
    evidContext: ['investigation'],
    outsideNote: 'Settlement depends on scheme, account structure or market infrastructure.',
    direction: 'outbound',
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
      { label: 'Payments · Treasury',                               sub: 'Bank systems',          kind: 'sources'  },
      { label: 'Authentication · Entitlement · Signing',            sub: 'SWIFT boundary',        kind: 'boundary' },
      { label: 'Scheme and service connectivity',                   sub: 'Estate function',       kind: 'core'     },
      { label: 'Scheme / service interface',                        sub: 'External connectivity', kind: 'dest'     },
      { label: 'ACK / NACK · Route decision · Audit · Archive',    sub: 'Evidence',              kind: 'evidence' },
    ],
  },

  r3: {
    functionLabel: 'Message routing and transformation',
    functionChips: ['Classify', 'Validate', 'Transform / enrich', 'Route'],
    bankSideActive:  ['payments', 'treasury', 'securities'],
    bankSideContext: ['reporting', 'internal-app'],
    railIds: ['mt-payment', 'iso-pacs', 'iso-camt', 'trade-securities'],
    servicePanelLabel: 'Message and service-family connectivity paths',
    servicePanelNote:  'Transformation applies where coexistence, service rules or backend ownership require it.',
    externalActive:  ['corporate-fi', 'correspondent-fi', 'scheme-service'],
    externalContext: ['api-channel', 'score-macug'],
    evidActive:  ['route-decision', 'audit', 'archive', 'ack-nack'],
    evidContext: ['gpi-uetr', 'investigation'],
    outsideNote: 'Routing and transformation do not create settlement or accounting truth.',
    direction: 'bidirectional',
    caption:
      'In this role, the SWIFT estate classifies messages, validates required fields, ' +
      'transforms or enriches data where coexistence or service rules require it, and routes ' +
      'messages between bank systems and the external SWIFT/network side. This supports ' +
      'migration and interoperability, but it does not change the underlying obligation, ' +
      'create accounting truth or make settlement final.',
    insight: {
      roleType:     'Routing and transformation layer',
      whatProvides: 'Classification, transformation and routing evidence',
      whatNotDo:    'Change obligations or settle money',
      controlFocus: 'Message family, service rules, BICs and backend ownership',
      paragraph:
        'In this role, the SWIFT estate classifies messages, validates required fields, ' +
        'transforms or enriches data where coexistence or service rules require it, and routes ' +
        'messages between bank systems and the external SWIFT/network side. This supports ' +
        'migration and interoperability, but it does not change the underlying obligation, ' +
        'create accounting truth or make settlement final.',
    },
    mobileNodes: [
      { label: 'Payments · Treasury · Securities',                       sub: 'Bank systems',             kind: 'sources'  },
      { label: 'Authentication · Entitlement · Signing',                 sub: 'SWIFT boundary',           kind: 'boundary' },
      { label: 'Message routing and transformation',                     sub: 'Estate function',          kind: 'core'     },
      { label: 'Corporate / FI · Correspondent / FI · Scheme access',   sub: 'External / network side',  kind: 'dest'     },
      { label: 'Route decision · Audit · Archive · ACK / NACK',         sub: 'Evidence',                 kind: 'evidence' },
    ],
  },

  r4: {
    functionLabel: 'Controls, screening and repair',
    functionChips: ['Validate', 'Screen', 'Repair', 'Release / hold'],
    bankSideActive:  [],
    bankSideContext: ['payments', 'treasury', 'reporting'],
    railIds: ['control-validate', 'control-screen', 'control-repair', 'control-hold', 'control-release'],
    servicePanelLabel: 'Control outcome lanes',
    servicePanelNote:  'Control outcomes determine message disposition; they do not prove settlement finality.',
    externalActive:  [],
    externalContext: ['corporate-fi', 'correspondent-fi', 'api-channel'],
    evidActive:  ['audit', 'route-decision', 'repair-trail', 'ack-nack', 'archive'],
    evidContext: ['investigation'],
    outsideNote: 'Control disposition is not settlement finality.',
    direction: 'overlay',
    caption:
      'In this role, the SWIFT estate helps orchestrate message controls, screening outcomes, ' +
      'repair workflows and release or hold decisions. Specialist control systems may sit around ' +
      'the estate, but the gateway records the controlled disposition path. A released or ' +
      'acknowledged message is not the same as settlement finality.',
    insight: {
      roleType:     'Control and repair overlay',
      whatProvides: 'Controlled disposition and evidence',
      whatNotDo:    'Final settlement or universal control ownership',
      controlFocus: 'Validation, screening, repair, hold and release',
      paragraph:
        'In this role, the SWIFT estate helps orchestrate message controls, screening outcomes, ' +
        'repair workflows and release or hold decisions. Specialist control systems may sit around ' +
        'the estate, but the gateway records the controlled disposition path. A released or ' +
        'acknowledged message is not the same as settlement finality.',
    },
    mobileNodes: [
      { label: 'Payments · Treasury · Reporting',                              sub: 'Bank systems (context)',  kind: 'sources'  },
      { label: 'Authentication · Entitlement · Signing',                       sub: 'SWIFT boundary',         kind: 'boundary' },
      { label: 'Controls, screening and repair',                               sub: 'Estate function',        kind: 'core'     },
      { label: 'Validate · Screen · Repair · Hold / reject · Release',        sub: 'Control outcomes',       kind: 'dest'     },
      { label: 'Audit · Route decision · Repair trail · ACK / NACK',          sub: 'Evidence',               kind: 'evidence' },
    ],
  },

  r5: {
    functionLabel: 'Controlled contingency intake',
    functionChips: ['Approval', 'Segregation of duties', 'Sanctions screening', 'Release / hold'],
    bankSideActive:  ['contingency-entry', 'internal-app', 'payments'],
    bankSideContext: ['treasury', 'reporting'],
    railIds: [
      'contingency-intake', 'contingency-approval', 'contingency-sanctions',
      'contingency-release', 'contingency-reconciliation', 'contingency-retention',
    ],
    servicePanelLabel: 'Control-mandate lanes',
    servicePanelNote:  'Contingency may bypass a failed upstream layer; it must not bypass controls.',
    externalActive:  [],
    externalContext: ['corporate-fi', 'correspondent-fi', 'api-channel'],
    evidActive:  ['audit', 'archive', 'route-decision', 'reconciliation-evid', 'retention-evid'],
    evidContext: ['ack-nack', 'investigation'],
    outsideNote: 'Contingency entry does not override accounting, settlement or reconciliation.',
    direction: 'contingency',
    caption:
      'In this role, the SWIFT estate may provide controlled contingency entry when an upstream ' +
      'channel, workflow tool or payment platform is impaired. This can bypass the failed upstream ' +
      'layer, but it must not bypass approval, entitlement, segregation of duties, sanctions ' +
      'screening, accounting, settlement, reconciliation, audit evidence or retention. The estate ' +
      'is high-impact because it can accept instructions directly when other layers cannot.',
    insight: {
      roleType:     'Controlled contingency entry',
      whatProvides: 'Protected alternate entry and evidence',
      whatNotDo:    'Bypass controls or settle money',
      controlFocus: 'Approval, entitlement, segregation of duties and audit',
      paragraph:
        'In this role, the SWIFT estate may provide controlled contingency entry when an upstream ' +
        'channel, workflow tool or payment platform is impaired. This can bypass the failed upstream ' +
        'layer, but it must not bypass approval, entitlement, segregation of duties, sanctions ' +
        'screening, accounting, settlement, reconciliation, audit evidence or retention. The estate ' +
        'is high-impact because it can accept instructions directly when other layers cannot.',
    },
    mobileNodes: [
      { label: 'Contingency entry · Internal app / file · Payments',             sub: 'Bank systems (active)',     kind: 'sources'  },
      { label: 'Authentication · Entitlement · Signing',                          sub: 'SWIFT boundary',            kind: 'boundary' },
      { label: 'Controlled contingency intake',                                   sub: 'Estate function',           kind: 'core'     },
      { label: 'Manual intake · Approval · Sanctions screen · Release / hold',   sub: 'Control-mandate lanes',     kind: 'dest'     },
      { label: 'Audit · Archive · Reconciliation evidence · Retention',           sub: 'Evidence',                  kind: 'evidence' },
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

  // Left column — bank-internal systems
  const bankSideNodes = BANK_SIDE_NODES.map(n => `
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

  // Right column — external/network side
  const externalNodes = EXTERNAL_NODES.map(n => `
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
      <p class="srm-direction-row">
        <span class="srm-direction-badge" data-srm-direction></span>
      </p>
    </div>

    <div class="srm-map-wrapper">
      <div class="srm-map">

        <div class="srm-sources">
          <div class="srm-region-label">Bank systems</div>
          ${bankSideNodes}
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
          <div class="srm-region-label">External / network side</div>
          ${externalNodes}
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

  // ── Direction badge ──
  const dirBadge = wrapper.querySelector<HTMLElement>('[data-srm-direction]');
  if (dirBadge) {
    dirBadge.className = 'srm-direction-badge';
    const d = role.direction;
    const text = d === 'inbound'       ? '← Inbound channel'
               : d === 'outbound'      ? '→ Outbound gateway'
               : d === 'bidirectional' ? '↔ Bidirectional routing'
               : d === 'contingency'   ? '→ Controlled contingency'
               :                        '◆ Control overlay';
    dirBadge.textContent = text;
    dirBadge.classList.add(`srm-direction-badge--${d}`);
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

  // Step 1 — Bank-side nodes: synchronous
  activateBankSide(wrapper, role);

  // Step 2 — Boundary gates: staggered (150ms start, 80ms per gate)
  seq(token, 150, () => {
    const gates = Array.from(wrapper.querySelectorAll<HTMLElement>('[data-srm-gate]'));
    gates.forEach((gate, i) => {
      setTimeout(() => {
        if (seqToken !== token) return;
        gate.classList.add('srm-gate--active');
      }, i * 80);
    });
    // Boundary band gets focus in Role 1 (access) and Role 5 (contingency) — boundary is the primary teaching point
    if (roleId === 'r1' || roleId === 'r5') {
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

  // Step 5 — External / network side nodes (850ms)
  seq(token, 850, () => {
    activateExternalSide(wrapper, role);
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

function activateBankSide(wrapper: HTMLElement, role: SrmRoleData): void {
  const activeSet  = new Set(role.bankSideActive);
  const contextSet = new Set(role.bankSideContext);
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

function activateExternalSide(wrapper: HTMLElement, role: SrmRoleData): void {
  const activeSet  = new Set(role.externalActive);
  const contextSet = new Set(role.externalContext);
  wrapper.querySelectorAll<HTMLElement>('[data-srm-dest]').forEach(el => {
    const id = el.dataset.srmDest!;
    if (activeSet.has(id))       el.classList.add('srm-dest--active');
    else if (contextSet.has(id)) el.classList.add('srm-dest--context');
  });
}

function applyFinalState(wrapper: HTMLElement, role: SrmRoleData): void {
  activateBankSide(wrapper, role);
  Array.from(wrapper.querySelectorAll<HTMLElement>('[data-srm-gate]'))
    .forEach(el => el.classList.add('srm-gate--active'));
  if (role.railIds.includes('access-path') || role.railIds.includes('contingency-intake')) {
    wrapper.querySelector<HTMLElement>('[data-srm-boundary]')
      ?.classList.add('srm-boundary-band--focus');
  }
  const core = wrapper.querySelector<HTMLElement>('[data-srm-core]');
  if (core) core.classList.add('srm-core--active');
  const activeRails = new Set(role.railIds);
  wrapper.querySelectorAll<HTMLElement>('[data-srm-rail]').forEach(el => {
    if (activeRails.has(el.dataset.srmRail!)) el.classList.add('srm-rail--active');
  });
  activateExternalSide(wrapper, role);
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
