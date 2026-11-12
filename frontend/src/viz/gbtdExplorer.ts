// gbtdExplorer.ts
// GBTD held-payment explorer (success path only): Sam at Bank A pays Alex at Bank B £100,
// held until the handover is confirmed. Click-driven; the "Bank view" toggle adds the
// issuer, platform and settlement detail. Uses the seqToken cancellation pattern from whatMovesVisual.ts.

import { SUCCESS_PATH, penceToPounds, evidencePillLabel, type GbtdStage } from '../data/gbtdModel';

// Module-level animation state — reset on each render call
let seqToken = 0;
let currentIdx = 0;
let isPlaying = false;
let playTimer: number | null = null;

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── DOM builders ──────────────────────────────────────────────

function buildActorHtml(side: 'buyer' | 'seller'): string {
  const prefix = `gbtd-${side}`;
  const name = side === 'buyer' ? 'Sam' : 'Alex';
  return `
    <div class="gbtd-actor-label">
      ${name}
      <span class="gbtd-bank-tag" id="${prefix}-bank">${side === 'buyer' ? 'buyer · Bank A' : 'seller · Bank B'}</span>
    </div>
    <div class="gbtd-balance-block">
      <div class="gbtd-bal-row">
        <span class="gbtd-bal-k">Balance</span>
        <span class="gbtd-bal-v" id="${prefix}-booked">£0</span>
      </div>
      <div class="gbtd-bal-track" role="img" aria-label="${name}’s balance bar">
        <div class="gbtd-bal-fill gbtd-bal-fill--avail" id="${prefix}-avail-bar" style="width:0%"></div>
        <div class="gbtd-bal-fill gbtd-bal-fill--res" id="${prefix}-res-bar" style="width:0%"></div>
      </div>
      <div class="gbtd-bal-row gbtd-bal-row--detail">
        <span class="gbtd-bal-k">Can spend</span>
        <span class="gbtd-bal-v gbtd-bal-v--avail" id="${prefix}-avail-val">£0</span>
      </div>
      <div class="gbtd-bal-row gbtd-bal-row--detail">
        <span class="gbtd-bal-k">Held</span>
        <span class="gbtd-bal-v gbtd-bal-v--res" id="${prefix}-res-val">£0</span>
      </div>
      <p class="gbtd-last-confirmed" id="${prefix}-lcf" hidden>last confirmed</p>
    </div>
  `;
}

const RIBBON_LABELS = ['Start', 'Agreed', 'Held', 'Condition met', 'Releasing', 'Paid'];

function buildRibbonSvg(): string {
  // Nodes at x = 25 + 50i sit over six equal HTML label columns (track 250 units, 50 per stage).
  const positions = [25, 75, 125, 175, 225, 275];
  const circles = positions.map((cx, i) =>
    `<circle class="gbtd-node" id="gbtd-node-${i}" cx="${cx}" cy="18" r="6" aria-hidden="true"/>`
  ).join('');
  return `
    <svg class="gbtd-ribbon-svg" viewBox="0 0 300 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <line class="gbtd-ribbon-track" x1="25" y1="18" x2="275" y2="18"/>
      <line class="gbtd-ribbon-fill" id="gbtd-ribbon-fill" x1="25" y1="18" x2="275" y2="18"
            stroke-dasharray="250"/>
      ${circles}
    </svg>
    <div class="gbtd-node-labels" aria-hidden="true">
      ${RIBBON_LABELS.map((l, i) => `<span data-i="${i}">${l}</span>`).join('')}
    </div>`;
}

function buildTechPanelHtml(): string {
  return `
    <div class="gbtd-tech-grid">
      <div class="gbtd-tech-col">
        <p class="gbtd-tech-heading">Bank A, Sam’s bank</p>
        <p class="gbtd-tech-line">Liability: Sam’s £100 stays a Bank A deposit while it is held</p>
        <p class="gbtd-tech-line">Token and posting mechanics: not published</p>
      </div>
      <div class="gbtd-tech-col">
        <p class="gbtd-tech-heading">Shared platform</p>
        <p class="gbtd-tech-line">Built by Quant</p>
        <p class="gbtd-tech-line">How the condition is checked and who confirms it: not published</p>
        <p class="gbtd-tech-line">How tokens are created, moved and removed: not published</p>
      </div>
      <div class="gbtd-tech-col">
        <p class="gbtd-tech-heading">Bank B, Alex’s bank</p>
        <p class="gbtd-tech-line">Liability: Alex’s £100 becomes a Bank B deposit on release</p>
        <p class="gbtd-tech-line">Token and posting mechanics: not published</p>
      </div>
      <div class="gbtd-tech-col gbtd-tech-col--full">
        <p class="gbtd-tech-heading">Settlement between the banks</p>
        <p class="gbtd-tech-line gbtd-tech-line--unknown">Bank A now owes Bank B £100. The asset, rail, timing and finality of that settlement are not published, so a completed customer payment here is not evidence of legal finality.</p>
        <p class="gbtd-tech-line">The Bank of England’s Synchronisation Lab is non-live, and GBTD’s test there is for bonds and gilts, not these retail payments.</p>
      </div>
    </div>`;
}

// ── Main render ───────────────────────────────────────────────

export function renderGbtdExplorer(container: HTMLElement): void {
  // Cancel any in-flight animation from a prior mount
  seqToken++;
  if (playTimer !== null) { clearTimeout(playTimer); playTimer = null; }
  currentIdx = 0;
  isPlaying = false;
  container.classList.add('block-wide');

  const wrap = document.createElement('div');
  wrap.className = 'gbtd-wrap';
  wrap.setAttribute('aria-label', 'Held payment explorer: Sam pays Alex £100');
  container.appendChild(wrap);

  wrap.innerHTML = `
    <p class="gbtd-sr-announce sr-only" role="status" aria-live="polite" aria-atomic="true"></p>

    <div class="gbtd-header">
      <span class="gbtd-eyebrow">MODELLED ON GBTD’S SEP 2026 TEST PAYMENT</span>
      <span class="gbtd-header-note">Sam, Alex, £100, Bank A and Bank B are illustrative</span>
    </div>

    <div class="gbtd-scene">
      <div class="gbtd-actor-col gbtd-actor-col--buyer">
        ${buildActorHtml('buyer')}
      </div>
      <div class="gbtd-center-col">
        <div class="gbtd-ribbon-wrap" aria-hidden="true">
          ${buildRibbonSvg()}
        </div>
        <p class="gbtd-stage-count" id="gbtd-stage-count"></p>
        <p class="gbtd-stage-title" id="gbtd-stage-title"></p>
        <p class="gbtd-stage-msg" id="gbtd-stage-msg"></p>
      </div>
      <div class="gbtd-actor-col gbtd-actor-col--seller">
        ${buildActorHtml('seller')}
      </div>
    </div>

    <div class="gbtd-controls-bar">
      <div class="gbtd-pips" role="group" aria-label="Stage progress">
        ${SUCCESS_PATH.map((s, i) =>
          `<button class="gbtd-pip" id="gbtd-pip-${i}" data-idx="${i}"
            aria-label="Go to stage ${i + 1}: ${s.title}"></button>`
        ).join('')}
      </div>
      <div class="gbtd-ctrl-btns">
        <button class="gbtd-btn" id="gbtd-prev" aria-label="Previous stage" title="Previous">←</button>
        <button class="gbtd-btn gbtd-btn--play" id="gbtd-play" aria-label="Play all stages" title="Play">▶</button>
        <button class="gbtd-btn" id="gbtd-next" aria-label="Next stage" title="Next">→</button>
        <button class="gbtd-btn" id="gbtd-replay" aria-label="Replay from start" title="Replay">↺</button>
      </div>
      <button class="gbtd-btn gbtd-btn--tech" id="gbtd-tech-toggle" aria-expanded="false" aria-controls="gbtd-tech-panel">Bank view</button>
    </div>

    <div class="gbtd-tech-panel" id="gbtd-tech-panel" hidden>
      ${buildTechPanelHtml()}
    </div>

    <div class="gbtd-evidence-footer">
      <span class="gbtd-evidence-pill" id="gbtd-evidence-pill">Illustration</span>
      <p class="gbtd-caveat">An illustration, not a pilot transaction. GBTD’s marketplace payment moved real money between banks using a simulated purchase, as Reuters and the British Retail Consortium describe it. How the banks settled with each other hasn’t been published.</p>
    </div>
  `;

  // ── Wire controls ───────────────────────────────────────────

  const prevBtn  = wrap.querySelector<HTMLButtonElement>('#gbtd-prev')!;
  const playBtn  = wrap.querySelector<HTMLButtonElement>('#gbtd-play')!;
  const nextBtn  = wrap.querySelector<HTMLButtonElement>('#gbtd-next')!;
  const replayBtn = wrap.querySelector<HTMLButtonElement>('#gbtd-replay')!;
  const techToggle = wrap.querySelector<HTMLButtonElement>('#gbtd-tech-toggle')!;
  const techPanel  = wrap.querySelector<HTMLElement>('#gbtd-tech-panel')!;

  prevBtn.addEventListener('click', () => {
    stopPlay();
    if (currentIdx > 0) goToStage(currentIdx - 1, true);
  });

  nextBtn.addEventListener('click', () => {
    stopPlay();
    if (currentIdx < SUCCESS_PATH.length - 1) goToStage(currentIdx + 1, true);
  });

  replayBtn.addEventListener('click', () => {
    stopPlay();
    goToStage(0, true);
  });

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      stopPlay();
    } else {
      startPlay();
    }
  });

  wrap.querySelectorAll<HTMLButtonElement>('.gbtd-pip').forEach(pip => {
    pip.addEventListener('click', () => {
      stopPlay();
      const idx = Number(pip.dataset.idx);
      goToStage(idx, true);
    });
  });

  techToggle.addEventListener('click', () => {
    const expanded = techToggle.getAttribute('aria-expanded') === 'true';
    techToggle.setAttribute('aria-expanded', String(!expanded));
    techToggle.classList.toggle('gbtd-btn--tech-active', !expanded);
    techPanel.hidden = expanded;
  });

  // ── Stage application ──────────────────────────────────────

  function goToStage(idx: number, animate: boolean): void {
    currentIdx = idx;
    const stage = SUCCESS_PATH[idx];
    const token = ++seqToken;

    updateControls();
    updatePips();
    announceStage(stage, wrap);

    if (!animate || prefersReducedMotion()) {
      applyStageInstant(stage, wrap);
      return;
    }

    // Update text immediately
    setStageText(stage, wrap);
    updateEvidencePill(stage, wrap);

    // Animate balance bars with slight delay
    setTimeout(() => {
      if (seqToken !== token) return;
      animateBalances(stage, wrap);
    }, 80);

    // Animate ribbon after balances start moving
    setTimeout(() => {
      if (seqToken !== token) return;
      animateRibbon(idx, wrap);
    }, 220);
  }

  function startPlay(): void {
    if (prefersReducedMotion()) {
      // No timed sequence under reduced motion: show the final stage immediately.
      goToStage(SUCCESS_PATH.length - 1, false);
      return;
    }
    if (currentIdx >= SUCCESS_PATH.length - 1) {
      goToStage(0, true);
    }
    isPlaying = true;
    playBtn.textContent = '⏸'; // pause
    playBtn.setAttribute('aria-label', 'Pause');
    scheduleNext();
  }

  function stopPlay(): void {
    if (!isPlaying) return;
    isPlaying = false;
    playBtn.textContent = '▶'; // play
    playBtn.setAttribute('aria-label', 'Play all stages');
    if (playTimer !== null) { clearTimeout(playTimer); playTimer = null; }
  }

  function scheduleNext(): void {
    if (!isPlaying) return;
    const token = seqToken;
    playTimer = window.setTimeout(() => {
      if (seqToken !== token) return;
      if (!isPlaying) return;
      const next = currentIdx + 1;
      if (next < SUCCESS_PATH.length) {
        goToStage(next, true);
        if (next < SUCCESS_PATH.length - 1) {
          scheduleNext();
        } else {
          stopPlay();
        }
      } else {
        stopPlay();
      }
    }, 2400);
  }

  function updateControls(): void {
    prevBtn.disabled = currentIdx === 0;
    nextBtn.disabled = currentIdx === SUCCESS_PATH.length - 1;
    replayBtn.disabled = currentIdx === 0;
  }

  function updatePips(): void {
    wrap.querySelectorAll<HTMLElement>('.gbtd-pip').forEach((pip, i) => {
      pip.classList.toggle('gbtd-pip--active', i === currentIdx);
      pip.classList.toggle('gbtd-pip--done', i < currentIdx);
      pip.setAttribute('aria-current', i === currentIdx ? 'step' : 'false');
    });
  }

  // Apply stage instantly (reduced motion or immediate call)
  function applyStageInstant(stage: GbtdStage, root: HTMLElement): void {
    setStageText(stage, root);
    updateEvidencePill(stage, root);
    setBalances(stage, root, false);
    setRibbonNodes(currentIdx, root, false);
  }

  // Initial render
  goToStage(0, false);
}

// ── Rendering helpers (pure — take root element) ──────────────

function setStageText(stage: GbtdStage, root: HTMLElement): void {
  const titleEl = root.querySelector<HTMLElement>('#gbtd-stage-title');
  const msgEl   = root.querySelector<HTMLElement>('#gbtd-stage-msg');
  if (titleEl) titleEl.textContent = stage.title;
  if (msgEl)   msgEl.textContent   = stage.message;
  const countEl = root.querySelector<HTMLElement>('#gbtd-stage-count');
  if (countEl) countEl.textContent = `Stage ${SUCCESS_PATH.indexOf(stage) + 1} of ${SUCCESS_PATH.length}`;

  // Show "last confirmed" label on buyer when stage is LAST_CONFIRMED_SNAPSHOT
  const buyerLcf = root.querySelector<HTMLElement>('#gbtd-buyer-lcf');
  if (buyerLcf) buyerLcf.hidden = stage.observationType !== 'LAST_CONFIRMED_SNAPSHOT';
}

function updateEvidencePill(stage: GbtdStage, root: HTMLElement): void {
  const pill = root.querySelector<HTMLElement>('#gbtd-evidence-pill');
  if (pill) pill.textContent = evidencePillLabel(stage.evidenceClass);
}

function setBalances(stage: GbtdStage, root: HTMLElement, animate: boolean): void {
  const BASE = 10000; // pence — always £100 as the illustrative transaction amount

  for (const side of ['buyer', 'seller'] as const) {
    const pos = stage[side];
    const prefix = `gbtd-${side}`;

    const bookedEl    = root.querySelector<HTMLElement>(`#${prefix}-booked`);
    const availValEl  = root.querySelector<HTMLElement>(`#${prefix}-avail-val`);
    const resValEl    = root.querySelector<HTMLElement>(`#${prefix}-res-val`);
    const availBarEl  = root.querySelector<HTMLElement>(`#${prefix}-avail-bar`);
    const resBarEl    = root.querySelector<HTMLElement>(`#${prefix}-res-bar`);

    if (bookedEl)   bookedEl.textContent   = penceToPounds(pos.bookedPence);
    if (availValEl) availValEl.textContent = penceToPounds(pos.availablePence);
    if (resValEl)   resValEl.textContent   = penceToPounds(pos.reservedPence);

    const availPct = `${(pos.availablePence / BASE) * 100}%`;
    const resPct   = `${(pos.reservedPence  / BASE) * 100}%`;

    if (availBarEl) {
      if (!animate) availBarEl.style.transition = 'none';
      availBarEl.style.width = availPct;
      if (!animate) requestAnimationFrame(() => { availBarEl.style.transition = ''; });
    }
    if (resBarEl) {
      if (!animate) resBarEl.style.transition = 'none';
      resBarEl.style.width = resPct;
      if (!animate) requestAnimationFrame(() => { resBarEl.style.transition = ''; });
    }
  }
}

function animateBalances(stage: GbtdStage, root: HTMLElement): void {
  setBalances(stage, root, true);
}

function setRibbonNodes(idx: number, root: HTMLElement, animate: boolean): void {
  // Update node classes
  for (let i = 0; i < SUCCESS_PATH.length; i++) {
    const node = root.querySelector<SVGCircleElement>(`#gbtd-node-${i}`);
    if (!node) continue;
    if (!animate) node.style.transition = 'none';
    node.classList.toggle('gbtd-node--active', i <= idx);
    node.classList.toggle('gbtd-node--current', i === idx);
    if (!animate) requestAnimationFrame(() => { node.style.transition = ''; });
  }

  root.querySelectorAll<HTMLElement>('.gbtd-node-labels span').forEach((lbl, i) => {
    lbl.classList.toggle('is-current', i === idx);
  });

  // Update fill line via style (not attribute) so CSS transition fires; 50 units per stage
  const fillEl = root.querySelector<SVGLineElement>('#gbtd-ribbon-fill');
  if (fillEl) {
    const offset = 250 - idx * 50;
    if (!animate) fillEl.style.transition = 'none';
    fillEl.style.strokeDashoffset = String(offset);
    if (!animate) requestAnimationFrame(() => { fillEl.style.transition = ''; });
  }
}

function animateRibbon(idx: number, root: HTMLElement): void {
  setRibbonNodes(idx, root, true);
}

function announceStage(stage: GbtdStage, root: HTMLElement): void {
  const el = root.querySelector<HTMLElement>('.gbtd-sr-announce');
  if (el) el.textContent = `Stage: ${stage.title}. ${stage.message}`;
}
