// whatMovesVisual.ts
// Two-mode layered canvas visual for the "What actually moves?" topic page.
// Phase 2: Mode 1 (today's account payment) and Mode 2 (DLT same network).
// Designed to support Mode 3 and Mode 4 addition in future phases via MODES array.

interface WmvLayer {
  id: string;
  label: string;
  sublabel: string;
  accentColor: string;
  typeClass: string; // drives the right-side glyph treatment
}

interface WmvStep {
  layerId: string;
  delay: number;
}

interface WmvMode {
  id: string;
  label: string;
  activeIds: Set<string>;
  sequence: WmvStep[];
  caption: string;
}

const LAYERS: WmvLayer[] = [
  {
    id: 'customer-ledger',
    label: 'Customer / bank ledger',
    sublabel: 'Payer debit and receiver credit — accounting entries, not value movements',
    accentColor: '#E8A33D',
    typeClass: 'wmv-glyph--ledger',
  },
  {
    id: 'payment-message',
    label: 'Scheme / payment message',
    sublabel: 'Traditional payment scheme, SWIFT or RTGS instruction — separate from value movement',
    accentColor: '#E8A33D',
    typeClass: 'wmv-glyph--msg',
  },
  {
    id: 'settlement-asset',
    label: 'Settlement / intermediary balance',
    sublabel: 'Central bank money, scheme settlement or nostro / vostro movement',
    accentColor: '#5FB3A3',
    typeClass: 'wmv-glyph--settle',
  },
  {
    id: 'token-ledger',
    label: 'Token / shared-state ledger',
    sublabel: 'Funded balance · signed transfer instruction · on-ledger finality',
    accentColor: '#C792E8',
    typeClass: 'wmv-glyph--token',
  },
  {
    id: 'interop',
    label: 'Interoperability / access layer',
    sublabel: 'Gateway, bridge or custodian connecting separate networks',
    accentColor: '#E8A33D',
    typeClass: 'wmv-glyph--gate',
  },
  {
    id: 'accounting',
    label: 'Accounting / custody / reporting',
    sublabel: 'Obligations that apply regardless of the rail or settlement mechanism',
    accentColor: '#5FB3A3',
    typeClass: 'wmv-glyph--acc',
  },
  {
    id: 'evidence',
    label: 'Reconciliation / evidence / exception',
    sublabel: 'Audit trail, exception handling and reconciliation',
    accentColor: '#5FB3A3',
    typeClass: 'wmv-glyph--ev',
  },
];

const MODES: WmvMode[] = [
  {
    id: 'mode1',
    label: "Today's account payment",
    activeIds: new Set(['customer-ledger', 'payment-message', 'settlement-asset', 'accounting', 'evidence']),
    sequence: [
      { layerId: 'customer-ledger',  delay: 0 },
      { layerId: 'payment-message',  delay: 280 },
      { layerId: 'settlement-asset', delay: 580 },
      { layerId: 'accounting',       delay: 920 },
      { layerId: 'evidence',         delay: 1180 },
    ],
    caption: 'The customer sees one payment. The bank processes a customer debit, a payment message, an interbank settlement movement, a customer credit, and a reconciliation and evidence trail. The message and the settlement asset are distinct — and both are distinct from the ledger posting.',
  },
  {
    id: 'mode2',
    label: 'DLT — same network',
    activeIds: new Set(['customer-ledger', 'token-ledger', 'accounting', 'evidence']),
    sequence: [
      { layerId: 'customer-ledger', delay: 0 },
      { layerId: 'token-ledger',    delay: 320 },
      { layerId: 'accounting',      delay: 700 },
      { layerId: 'evidence',        delay: 980 },
    ],
    caption: 'DLT is cleanest when value already exists on-ledger and both participants are in the same network. An instruction still exists — a signed network transaction or smart-contract call — but it is not a traditional payment scheme message. Funding, accounting, custody and evidence still apply. DLT adds a funded on-ledger state; it does not replace the bank ledger.',
  },
];

// Cancellation token: incremented on every mode switch, checked in each setTimeout callback
let seqToken = 0;

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Glyph HTML per layer type — aria-hidden decorative indicators
function glyphHtml(typeClass: string): string {
  switch (typeClass) {
    case 'wmv-glyph--ledger':
      return `<span class="wmv-glyph wmv-glyph--ledger" aria-hidden="true">
        <span class="wmv-ledger-box">Dr</span>
        <span class="wmv-ledger-arrow">→</span>
        <span class="wmv-ledger-box wmv-ledger-box--cr">Cr</span>
      </span>`;
    case 'wmv-glyph--msg':
      return `<span class="wmv-glyph wmv-glyph--msg" aria-hidden="true">
        <span class="wmv-msg-line"></span>
        <span class="wmv-msg-arr">›</span>
      </span>`;
    case 'wmv-glyph--settle':
      return `<span class="wmv-glyph wmv-glyph--settle" aria-hidden="true">
        <span class="wmv-settle-line"></span>
        <span class="wmv-settle-arr">›</span>
      </span>`;
    case 'wmv-glyph--token':
      return `<span class="wmv-glyph wmv-glyph--token" aria-hidden="true">
        <span class="wmv-token-node">A</span>
        <span class="wmv-token-line"></span>
        <span class="wmv-token-node">B</span>
      </span>`;
    case 'wmv-glyph--gate':
      return `<span class="wmv-glyph wmv-glyph--gate" aria-hidden="true">
        <span class="wmv-gate-box">GATE</span>
      </span>`;
    case 'wmv-glyph--acc':
      return `<span class="wmv-glyph wmv-glyph--acc" aria-hidden="true">
        <span class="wmv-chip">Custody</span>
        <span class="wmv-chip">Rec</span>
      </span>`;
    case 'wmv-glyph--ev':
      return `<span class="wmv-glyph wmv-glyph--ev" aria-hidden="true">
        <span class="wmv-chip">Evidence</span>
        <span class="wmv-chip">Exc</span>
      </span>`;
    default:
      return '';
  }
}

export function renderWhatMovesVisual(container: HTMLElement): void {
  let activeMode = MODES[0];

  const wrap = document.createElement('div');
  wrap.className = 'wmv-wrap';
  container.appendChild(wrap);

  // Title row
  const titleRow = document.createElement('div');
  titleRow.className = 'wmv-title-row';
  titleRow.innerHTML = `
    <p class="wmv-title">What actually moves?</p>
    <p class="wmv-subtitle">The same layers appear in every flow. Select a mode to see which activate.</p>
  `;
  wrap.appendChild(titleRow);

  // Mode selector
  const modeRow = document.createElement('div');
  modeRow.className = 'wmv-mode-row';
  modeRow.setAttribute('role', 'group');
  modeRow.setAttribute('aria-label', 'Payment modes');
  MODES.forEach(mode => {
    const btn = document.createElement('button');
    btn.className = 'wmv-mode-btn';
    btn.dataset.modeId = mode.id;
    btn.textContent = mode.label;
    btn.setAttribute('aria-pressed', mode.id === activeMode.id ? 'true' : 'false');
    btn.addEventListener('click', () => {
      if (mode.id === activeMode.id) return;
      activeMode = mode;
      applyMode(wrap, activeMode);
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
    modeRow.appendChild(btn);
  });
  wrap.appendChild(modeRow);

  // Layer rows
  const layersDiv = document.createElement('div');
  layersDiv.className = 'wmv-layers';
  layersDiv.setAttribute('aria-label', 'Payment layers');
  LAYERS.forEach((layer, i) => {
    const row = document.createElement('div');
    row.className = 'wmv-layer';
    row.dataset.layerId = layer.id;
    row.style.setProperty('--wmv-accent', layer.accentColor);
    row.innerHTML = `
      <span class="wmv-layer-num" aria-hidden="true">0${i + 1}</span>
      <span class="wmv-layer-main">
        <span class="wmv-layer-label">${layer.label}</span>
        <span class="wmv-layer-sub">${layer.sublabel}</span>
      </span>
      ${glyphHtml(layer.typeClass)}
    `;
    layersDiv.appendChild(row);
  });
  wrap.appendChild(layersDiv);

  // Caption — announces current mode to screen readers
  const caption = document.createElement('p');
  caption.className = 'wmv-caption';
  caption.setAttribute('role', 'status');
  wrap.appendChild(caption);

  applyMode(wrap, activeMode);
}

function applyMode(wrap: HTMLElement, mode: WmvMode): void {
  const token = ++seqToken;

  // Update button states
  wrap.querySelectorAll<HTMLButtonElement>('.wmv-mode-btn').forEach(btn => {
    const isActive = btn.dataset.modeId === mode.id;
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    btn.classList.toggle('wmv-mode-btn--active', isActive);
  });

  // Reset all layers to muted immediately
  wrap.querySelectorAll<HTMLElement>('.wmv-layer').forEach(row => {
    row.classList.remove('wmv-layer--active');
    row.classList.add('wmv-layer--muted');
  });

  // Caption crossfade
  const caption = wrap.querySelector<HTMLElement>('.wmv-caption');
  if (caption) {
    caption.style.opacity = '0';
  }

  if (prefersReducedMotion()) {
    // Apply full final state immediately — no timeouts
    mode.activeIds.forEach(id => activateLayer(wrap, id));
    if (caption) {
      caption.textContent = mode.caption;
      caption.style.opacity = '1';
    }
    return;
  }

  // Sequenced activation
  mode.sequence.forEach(({ layerId, delay }) => {
    setTimeout(() => {
      if (seqToken !== token) return;
      activateLayer(wrap, layerId);
    }, delay);
  });

  // Caption fades in after first layer appears
  setTimeout(() => {
    if (seqToken !== token) return;
    if (caption) {
      caption.textContent = mode.caption;
      caption.style.opacity = '1';
    }
  }, 150);
}

function activateLayer(wrap: HTMLElement, layerId: string): void {
  const row = wrap.querySelector<HTMLElement>(`.wmv-layer[data-layer-id="${layerId}"]`);
  if (!row) return;
  row.classList.remove('wmv-layer--muted');
  row.classList.add('wmv-layer--active');
}
