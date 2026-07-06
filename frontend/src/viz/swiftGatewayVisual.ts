// swiftGatewayVisual.ts
// Inside a bank SWIFT gateway — operating-map visual.
// Roles 1 and 2 active. Roles 3–6 present as disabled selector chips; content not yet implemented.
// Settlement boundary is structurally outside the SWIFT estate — never path-active.
// No money tokens animate through SWIFT. ACK/NACK = processing status, not settlement finality.

let seqToken = 0;
const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface Chip { id: string; label: string; }
interface Zone { id: string; label: string; chips: Chip[]; extraClass?: string; outside?: boolean; }
interface PathStep {
  zoneId: string;
  chipIds: string[];          // primary active chips — strong highlight + seq marker
  contextChipIds?: string[];  // secondary context chips — soft highlight, no seq marker
  seqNum: number;
}
interface InsightField { label: string; value: string; }
interface RoleConfig {
  caption: string;
  fields: InsightField[];
  insight: string;
  path: PathStep[];
}

const ROLES = [
  { id: 'r1', label: '01 · Channel and secure access', enabled: true },
  { id: 'r2', label: '02 · Scheme connector',          enabled: true },
  { id: 'r3', label: '03 · Routing and transformation',enabled: false },
  { id: 'r4', label: '04 · Controls and repair',       enabled: false },
  { id: 'r5', label: '05 · Contingency entry',         enabled: false },
  { id: 'r6', label: '06 · Evidence and archive',      enabled: false },
];

const ZONES: Zone[] = [
  {
    id: 'entry', label: 'Entry points',
    chips: [
      { id: 'corporate-fi',  label: 'Corporate / FI' },
      { id: 'score-macug',   label: 'SCORE / MA-CUG' },
      { id: 'secure-web',    label: 'Secure web' },
      { id: 'api-channel',   label: 'API channel' },
      { id: 'scheme-portal', label: 'Scheme portal' },
      { id: 'internal-file', label: 'Internal app / file channel' },
    ],
  },
  {
    id: 'boundary', label: 'SWIFT secure boundary', extraClass: 'sgv-zone--boundary',
    chips: [
      { id: 'auth',          label: 'Authentication' },
      { id: 'entitlement',   label: 'Entitlement' },
      { id: 'signing',       label: 'Signing / integrity' },
      { id: 'secure-zone-c', label: 'Secure-zone controls' },
    ],
  },
  {
    id: 'fabric', label: 'SWIFT control fabric',
    chips: [
      { id: 'classify',   label: 'Classify' },
      { id: 'validate',   label: 'Validate' },
      { id: 'transform',  label: 'Transform / enrich' },
      { id: 'screen',     label: 'Screen' },
      { id: 'repair',     label: 'Repair' },
      { id: 'prioritise', label: 'Prioritise' },
    ],
  },
  {
    id: 'routing', label: 'Routing brain',
    chips: [
      { id: 'bic',           label: 'BIC' },
      { id: 'service',       label: 'Service' },
      { id: 'scheme-r',      label: 'Scheme' },
      { id: 'membership',    label: 'Membership' },
      { id: 'msg-family',    label: 'Message family' },
      { id: 'backend-owner', label: 'Backend owner' },
    ],
  },
  {
    id: 'dest', label: 'Bank destinations',
    chips: [
      { id: 'payments',   label: 'Payments' },
      { id: 'treasury',   label: 'Treasury' },
      { id: 'trade',      label: 'Trade finance' },
      { id: 'securities', label: 'Securities' },
      { id: 'cash-ops',   label: 'Cash / liquidity operations' },
      { id: 'reporting',  label: 'Reporting / investigation' },
    ],
  },
  {
    id: 'evidence', label: 'Status and evidence',
    chips: [
      { id: 'ack-nack',       label: 'ACK / NACK' },
      { id: 'gpi-uetr',       label: 'gpi / UETR' },
      { id: 'repair-trail',   label: 'Repair trail' },
      { id: 'route-decision', label: 'Route decision' },
      { id: 'archive',        label: 'Archive' },
      { id: 'audit',          label: 'Audit' },
    ],
  },
  {
    id: 'settlement', label: 'Outside SWIFT: settlement and accounting truth',
    outside: true, extraClass: 'sgv-zone--outside',
    chips: [
      { id: 'rtgs',           label: 'RTGS' },
      { id: 'nostro',         label: 'Nostro / vostro' },
      { id: 'local-clearing', label: 'Local clearing' },
      { id: 'market-infra',   label: 'Market infrastructure' },
      { id: 'bank-ledgers',   label: 'Bank ledgers' },
    ],
  },
];

const ROLE_CONFIGS: Record<string, RoleConfig> = {
  r1: {
    caption: 'Role 1 — Channel and secure access layer',
    fields: [
      { label: 'Role type',              value: 'Access layer' },
      { label: 'What SWIFT provides',    value: 'Controlled connectivity and evidence' },
      { label: 'What SWIFT does not do', value: 'Liquidity management or settlement' },
      { label: 'Control focus',          value: 'Authentication, entitlement, validation and routing' },
    ],
    insight: 'Corporates and financial institutions reach the SWIFT estate through controlled access channels. The secure boundary authenticates, signs and entitles every message before it enters the estate. Controls, routing and destination systems operate within the estate. ACK / NACK confirms message processing status on the network — not settlement. Settlement occurs through RTGS, nostro / vostro balances, local clearing and market infrastructure outside the SWIFT estate.',
    path: [
      { zoneId: 'entry',    chipIds: ['corporate-fi', 'secure-web', 'api-channel'],  contextChipIds: ['score-macug'],    seqNum: 1 },
      { zoneId: 'boundary', chipIds: ['auth', 'entitlement'],                        contextChipIds: ['secure-zone-c'],  seqNum: 2 },
      { zoneId: 'fabric',   chipIds: ['classify'],                                   contextChipIds: ['validate'],       seqNum: 3 },
      { zoneId: 'routing',  chipIds: ['bic', 'service'],                                                                 seqNum: 4 },
      { zoneId: 'dest',     chipIds: ['payments'],                                                                       seqNum: 5 },
      { zoneId: 'evidence', chipIds: ['ack-nack', 'route-decision', 'audit'],        contextChipIds: ['archive'],        seqNum: 6 },
    ],
  },
  r2: {
    caption: 'Role 2 — Scheme and market-infrastructure connector',
    fields: [
      { label: 'Role type',              value: 'Scheme / infrastructure connectivity' },
      { label: 'What SWIFT provides',    value: 'Controlled messaging, access and routing' },
      { label: 'What SWIFT does not do', value: 'Scheme settlement or finality' },
      { label: 'Control focus',          value: 'Membership, service, message type and destination routing' },
    ],
    insight: 'In this role, the SWIFT estate helps the bank connect to schemes, services or market infrastructures through controlled messaging and access arrangements. The estate classifies and routes messages by service, BIC, scheme, membership and backend ownership. The settlement arrangement remains outside SWIFT and depends on the relevant scheme, account structure or market infrastructure.',
    path: [
      { zoneId: 'entry',    chipIds: ['scheme-portal', 'api-channel'],            contextChipIds: ['score-macug'],    seqNum: 1 },
      { zoneId: 'boundary', chipIds: ['auth', 'entitlement'],                     contextChipIds: ['secure-zone-c'],  seqNum: 2 },
      { zoneId: 'fabric',   chipIds: ['classify'],                                contextChipIds: ['validate'],       seqNum: 3 },
      { zoneId: 'routing',  chipIds: ['bic', 'service', 'scheme-r', 'membership'],                                   seqNum: 4 },
      { zoneId: 'dest',     chipIds: ['payments', 'treasury'],                                                        seqNum: 5 },
      { zoneId: 'evidence', chipIds: ['ack-nack', 'route-decision', 'audit'],     contextChipIds: ['archive'],        seqNum: 6 },
    ],
  },
};

// ─── render entry point ───────────────────────────────────────────────────────

export function renderSwiftGatewayVisual(container: HTMLElement): void {
  const wrapper = document.createElement('div');
  wrapper.className = 'sgv-wrapper';
  wrapper.innerHTML = buildShell();
  container.appendChild(wrapper);

  wrapper.querySelectorAll<HTMLButtonElement>('.sgv-role-btn[data-role]').forEach(btn => {
    btn.addEventListener('click', () => {
      const roleId = btn.dataset.role!;
      if (!ROLES.find(r => r.id === roleId && r.enabled)) return;
      wrapper.querySelectorAll<HTMLButtonElement>('.sgv-role-btn').forEach(b => {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        b.classList.toggle('sgv-role-btn--active', b === btn);
        b.classList.toggle('sgv-role-btn--pending', !b.dataset.role || b !== btn && !ROLES.find(r => r.id === b.dataset.role && r.enabled));
      });
      applyRole(wrapper, roleId);
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  applyRole(wrapper, 'r1');
}

// ─── HTML shell ───────────────────────────────────────────────────────────────

function buildShell(): string {
  const roleBtns = ROLES.map(r => {
    const isDefault = r.id === 'r1';
    const disabled  = r.enabled ? '' : 'disabled aria-disabled="true"';
    const cls       = !r.enabled ? 'sgv-role-btn--pending' : isDefault ? 'sgv-role-btn--active' : '';
    const pressed   = isDefault ? 'true' : 'false';
    return `<button class="sgv-role-btn ${cls}" data-role="${r.id}" aria-pressed="${pressed}" ${disabled}>${r.label}</button>`;
  }).join('\n');

  const zoneHtml = (z: Zone) => `
    <div class="sgv-zone${z.extraClass ? ' ' + z.extraClass : ''}" data-zone="${z.id}">
      <div class="sgv-zone-label">${z.label}</div>
      <div class="sgv-chips">
        ${z.chips.map(c => `<span class="sgv-chip" data-chip="${c.id}">${c.label}</span>`).join('\n        ')}
      </div>
    </div>`;

  const entry      = ZONES.find(z => z.id === 'entry')!;
  const boundary   = ZONES.find(z => z.id === 'boundary')!;
  const fabric     = ZONES.find(z => z.id === 'fabric')!;
  const routing    = ZONES.find(z => z.id === 'routing')!;
  const dest       = ZONES.find(z => z.id === 'dest')!;
  const evidence   = ZONES.find(z => z.id === 'evidence')!;
  const settlement = ZONES.find(z => z.id === 'settlement')!;

  return `
<div class="sgv-role-selector" role="group" aria-label="Select SWIFT estate operating role">
  ${roleBtns}
</div>

<div class="sgv-map" aria-hidden="true">
  <div class="sgv-col sgv-col--entry">
    ${zoneHtml(entry)}
  </div>
  <div class="sgv-connector" data-conn="entry-centre" aria-hidden="true">
    <span class="sgv-connector-glyph">›</span>
  </div>
  <div class="sgv-col sgv-col--centre">
    ${zoneHtml(boundary)}
    ${zoneHtml(fabric)}
  </div>
  <div class="sgv-connector" data-conn="centre-right" aria-hidden="true">
    <span class="sgv-connector-glyph">›</span>
  </div>
  <div class="sgv-col sgv-col--right">
    ${zoneHtml(routing)}
    ${zoneHtml(dest)}
  </div>
</div>

<div class="sgv-lower" aria-hidden="true">
  ${zoneHtml(evidence)}
  ${zoneHtml(settlement)}
</div>

<div class="sgv-insight" role="status" aria-live="polite">
  <div class="sgv-insight-role"></div>
  <dl class="sgv-insight-fields"></dl>
  <p class="sgv-insight-text"></p>
</div>`;
}

// ─── role application ─────────────────────────────────────────────────────────

async function applyRole(wrapper: HTMLElement, roleId: string): Promise<void> {
  const myToken = ++seqToken;
  const config = ROLE_CONFIGS[roleId];
  if (!config) return;

  // Clear state
  wrapper.querySelectorAll<HTMLElement>('[data-zone]').forEach(el =>
    el.classList.remove('sgv-zone--path-active', 'sgv-zone--muted'));
  wrapper.querySelectorAll<HTMLElement>('[data-chip]').forEach(el => {
    el.classList.remove('sgv-chip--primary', 'sgv-chip--context', 'sgv-chip--seq');
    el.removeAttribute('data-seq');
  });
  wrapper.querySelectorAll<HTMLElement>('[data-conn]').forEach(el =>
    el.classList.remove('sgv-connector--active'));

  // Update insight panel
  const insightRole   = wrapper.querySelector<HTMLElement>('.sgv-insight-role');
  const insightFields = wrapper.querySelector<HTMLElement>('.sgv-insight-fields');
  const insightText   = wrapper.querySelector<HTMLElement>('.sgv-insight-text');
  if (insightRole)   insightRole.textContent = config.caption;
  if (insightFields) insightFields.innerHTML = config.fields.map(f =>
    `<div class="sgv-insight-row"><dt class="sgv-insight-dt">${f.label}</dt><dd class="sgv-insight-dd">${f.value}</dd></div>`
  ).join('');
  if (insightText)   insightText.textContent = config.insight;

  // Build chip lookup sets
  const pathZoneIds = new Set(config.path.map(s => s.zoneId));
  const primaryChips  = new Map<string, number>(); // chipId → seqNum for first-in-step
  const contextChipSet = new Set<string>();

  config.path.forEach(step => {
    step.chipIds.forEach((id, i) => {
      primaryChips.set(id, i === 0 ? step.seqNum : 0);
    });
    step.contextChipIds?.forEach(id => contextChipSet.add(id));
  });

  // Zone muting (settlement: always outside, never muted or activated)
  wrapper.querySelectorAll<HTMLElement>('[data-zone]').forEach(el => {
    const zid = el.dataset.zone!;
    if (zid === 'settlement') return;
    el.classList.add(pathZoneIds.has(zid) ? 'sgv-zone--path-active' : 'sgv-zone--muted');
  });

  // Connectors
  const entryActive  = pathZoneIds.has('entry');
  const centreActive = pathZoneIds.has('boundary') || pathZoneIds.has('fabric');
  const rightActive  = pathZoneIds.has('routing')  || pathZoneIds.has('dest');
  wrapper.querySelector('[data-conn="entry-centre"]')
    ?.classList.toggle('sgv-connector--active', entryActive && centreActive);
  wrapper.querySelector('[data-conn="centre-right"]')
    ?.classList.toggle('sgv-connector--active', centreActive && rightActive);

  // Context chips (no delay — context is ambient, not sequenced)
  contextChipSet.forEach(id => {
    wrapper.querySelector<HTMLElement>(`[data-chip="${id}"]`)?.classList.add('sgv-chip--context');
  });

  // Primary chips — staggered per step
  const rm = prefersReducedMotion();
  for (const step of config.path) {
    if (seqToken !== myToken) return;
    for (const id of step.chipIds) {
      const el = wrapper.querySelector<HTMLElement>(`[data-chip="${id}"]`);
      if (!el) continue;
      el.classList.add('sgv-chip--primary');
      const seq = primaryChips.get(id);
      if (seq) { el.classList.add('sgv-chip--seq'); el.dataset.seq = String(seq); }
    }
    if (!rm) await delay(110);
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(res => setTimeout(res, ms));
}
