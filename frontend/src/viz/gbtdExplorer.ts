// gbtdExplorer.ts
// GBTD conditional-payment stage explorer — SUCCESS path only (Phase B).
// Uses seqToken cancellation pattern matching whatMovesVisual.ts.

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
  return `
    <div class="gbtd-actor-label">
      ${side === 'buyer' ? 'Buyer' : 'Seller'}
      <span class="gbtd-bank-tag" id="${prefix}-bank">${side === 'buyer' ? 'Bank A' : 'Bank B'}</span>
    </div>
    <div class="gbtd-balance-block">
      <div class="gbtd-bal-row">
        <span class="gbtd-bal-k">Booked</span>
        <span class="gbtd-bal-v" id="${prefix}-booked">£0</span>
      </div>
      <div class="gbtd-bal-track" role="img" aria-label="${side === 'buyer' ? 'Buyer' : 'Seller'} balance bar">
        <div class="gbtd-bal-fill gbtd-bal-fill--avail" id="${prefix}-avail-bar" style="width:0%"></div>
        <div class="gbtd-bal-fill gbtd-bal-fill--res" id="${prefix}-res-bar" style="width:0%"></div>
      </div>
      <div class="gbtd-bal-row gbtd-bal-row--detail">
        <span class="gbtd-bal-k">Available</span>
        <span class="gbtd-bal-v gbtd-bal-v--avail" id="${prefix}-avail-val">£0</span>
      </div>
      <div class="gbtd-bal-row gbtd-bal-row--detail">
        <span class="gbtd-bal-k">Reserved</span>
        <span class="gbtd-bal-v gbtd-bal-v--res" id="${prefix}-res-val">£0</span>
      </div>
      <p class="gbtd-last-confirmed" id="${prefix}-lcf" hidden>last confirmed</p>
    </div>
  `;
}

function buildRibbonSvg(): string {
  // 6 nodes at x = 30, 78, 126, 174, 222, 270 (spacing 48px, total 240px)
  const positions = [30, 78, 126, 174, 222, 270];
  const labels = ['Start', 'Agreed', 'Reserved', 'Confirmed', 'Release', 'Complete'];
  const circles = positions.map((cx, i) =>
    `<circle class="gbtd-node" id="gbtd-node-${i}" cx="${cx}" cy="18" r="6" aria-hidden="true"/>`
  ).join('');
  const texts = positions.map((cx, i) =>
    `<text class="gbtd-node-lbl" x="${cx}" y="42" text-anchor="middle" aria-hidden="true">${labels[i]}</text>`
  ).join('');
  return `
    <svg class="gbtd-ribbon-svg" viewBox="0 0 300 50" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <line class="gbtd-ribbon-track" x1="30" y1="18" x2="270" y2="18"/>
      <line class="gbtd-ribbon-fill" id="gbtd-ribbon-fill" x1="30" y1="18" x2="270" y2="18"
            stroke-dasharray="240"/>
      ${circles}
      ${texts}
    </svg>`;
}

function buildTechPanelHtml(): string {
  return `
    <div class="gbtd-tech-grid">
      <div class="gbtd-tech-col">
        <p class="gbtd-tech-heading">Bank A — Buyer’s deposit issuer</p>
        <p class="gbtd-tech-line">Deposit liability: illustrative £100 on buyer’s account</p>
        <p class="gbtd-tech-line">Token / posting mechanics: not publicly disclosed</p>
      </div>
      <div class="gbtd-tech-col">
        <p class="gbtd-tech-heading">Shared workflow layer</p>
        <p class="gbtd-tech-line">Platform: Quant (confirmed)</p>
        <p class="gbtd-tech-line">Condition orchestration: internal sequence not disclosed</p>
        <p class="gbtd-tech-line">Token lifecycle: conceptual — not publicly disclosed</p>
      </div>
      <div class="gbtd-tech-col">
        <p class="gbtd-tech-heading">Bank B — Seller’s deposit issuer</p>
        <p class="gbtd-tech-line">Deposit liability: illustrative £100 credited on completion</p>
        <p class="gbtd-tech-line">Token / posting mechanics: not publicly disclosed</p>
      </div>
      <div class="gbtd-tech-col gbtd-tech-col--full">
        <p class="gbtd-tech-heading">Interbank settlement</p>
        <p class="gbtd-tech-line gbtd-tech-line--unknown">Settlement rail: not publicly established — do not equate customer-view outcome with legal finality</p>
        <p class="gbtd-tech-line gbtd-tech-line--unknown">Settlement asset, timing, finality: not publicly established</p>
        <p class="gbtd-tech-line">BoE Synchronisation Lab: non-live research — not confirmed as the retail pilot rail</p>
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

  const wrap = document.createElement('div');
  wrap.className = 'gbtd-wrap';
  wrap.setAttribute('aria-label', 'GBTD conditional payment stage explorer');
  container.appendChild(wrap);

  wrap.innerHTML = `
    <p class="gbtd-sr-announce sr-only" role="status" aria-live="polite" aria-atomic="true"></p>

    <div class="gbtd-header">
      <span class="gbtd-eyebrow">REAL-WORLD INITIATIVE · UK · SEPT 2026</span>
      <span class="gbtd-header-note">£100 / Bank A / Bank B are illustrative</span>
    </div>

    <div class="gbtd-scene">
      <div class="gbtd-actor-col gbtd-actor-col--buyer">
        ${buildActorHtml('buyer')}
      </div>
      <div class="gbtd-center-col">
        <div class="gbtd-ribbon-wrap" aria-hidden="true">
          ${buildRibbonSvg()}
        </div>
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
      <button class="gbtd-btn gbtd-btn--tech" id="gbtd-tech-toggle" aria-expanded="false">Banking detail</button>
    </div>

    <div class="gbtd-tech-panel" id="gbtd-tech-panel" hidden>
      ${buildTechPanelHtml()}
    </div>

    <div class="gbtd-evidence-footer">
      <span class="gbtd-evidence-pill" id="gbtd-evidence-pill">Illustrative</span>
      <p class="gbtd-caveat">The £100 Bank A / Bank B example is illustrative — not an actual pilot transaction. UK Finance reports live customer transactions; the British Retail Consortium describes the marketplace purchase as simulated. Interbank settlement mechanics have not been publicly disclosed.</p>
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

  // Update fill line via style (not attribute) so CSS transition fires
  // spacing is 48px per stage; fill for stage idx: idx * 48
  const fillEl = root.querySelector<SVGLineElement>('#gbtd-ribbon-fill');
  if (fillEl) {
    const fillLen = idx * 48;
    const offset = 240 - fillLen;
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
