// gbtdScene.ts
// "How the money moves": one scene that grows a piece per step. Sam (Bank A) pays
// Alex (Bank B); the steps add the payment scheme, par between banks, separate token
// ledgers, the GBTD shared platform, the open settlement question and a scorecard.
// Wide containers scroll the steps past a sticky scene; narrow ones step through it.
// Each step plays one short move. Reduced motion shows every state at once.
// The moving token never implies how GBTD issues or redeems tokens (not published).

import type { GbtdSceneSpec } from '../types';
import { enhanceTerms } from './termHelp';

const reducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type Pt = [number, number];
interface Anchors {
  bankA: Pt; scheme: Pt; bankB: Pt; ledgerA: Pt; ledgerGap: Pt;
  platA: Pt; platMid: Pt; platB: Pt; rtgsA: Pt; rtgsB: Pt;
}

// Resting points sit clear of labels: inner corners of boxes, beside the "held" chip.
const WIDE: Anchors = {
  bankA: [322, 162], scheme: [480, 189], bankB: [846, 162], ledgerA: [328, 307], ledgerGap: [452, 307],
  platA: [322, 310], platMid: [312, 375], platB: [640, 310], rtgsA: [510, 468], rtgsB: [670, 468],
};
const COMPACT: Anchors = {
  bankA: [182, 150], scheme: [210, 256], bankB: [386, 150], ledgerA: [162, 330], ledgerGap: [196, 330],
  platA: [32, 336], platMid: [44, 404], platB: [388, 336], rtgsA: [186, 530], rtgsB: [234, 530],
};

const LOCK = (x: number, y: number) => `
  <g transform="translate(${x},${y})" class="gbs-lock-icon"><rect x="0" y="8" width="16" height="12" rx="2"/><path d="M3 8 V5 a5 5 0 0 1 10 0 V8"/></g>`;

function wideSvg(): string {
  return `
    <g transform="translate(96,34)">
      <circle cx="28" cy="28" r="27" class="gbs-av gbs-av--a"/><text x="28" y="36" class="gbs-t-initial">S</text>
      <text x="70" y="24" class="gbs-t-name">Sam</text><text x="70" y="48" class="gbs-t-sub">buyer · banks with A</text>
    </g>
    <g transform="translate(616,34)">
      <circle cx="28" cy="28" r="27" class="gbs-av gbs-av--b"/><text x="28" y="36" class="gbs-t-initial">A</text>
      <text x="70" y="24" class="gbs-t-name">Alex</text><text x="70" y="48" class="gbs-t-sub">seller · banks with B</text>
    </g>
    <rect x="90" y="140" width="260" height="98" rx="14" class="gbs-bank gbs-bank--a"/>
    <text x="114" y="176" class="gbs-t-name">Bank A</text>
    <text x="114" y="206" class="gbs-t-sub" data-bal="a"></text>
    <rect x="610" y="140" width="260" height="98" rx="14" class="gbs-bank gbs-bank--b"/>
    <text x="634" y="176" class="gbs-t-name">Bank B</text>
    <text x="634" y="206" class="gbs-t-sub" data-bal="b"></text>
    <g data-on="1 2">
      <path d="M350 189 H392 M568 189 H610" class="gbs-wire"/>
      <rect x="392" y="166" width="176" height="46" rx="23" class="gbs-pill"/>
      <text x="480" y="195" class="gbs-t-mono gbs-mid">Payment scheme</text>
      <text x="480" y="262" class="gbs-t-sub gbs-mid">Faster Payments · CHAPS</text>
    </g>
    <g data-on="2">
      <rect x="300" y="290" width="360" height="56" rx="12" class="gbs-plate"/>
      <text x="480" y="325" class="gbs-t-mono gbs-mid">£1 at Bank A = £1 at Bank B</text>
    </g>
    <g data-on="3">
      <rect x="90" y="276" width="260" height="62" rx="10" class="gbs-ledger gbs-ledger--a"/>
      <text x="220" y="313" class="gbs-t-sub gbs-mid">Bank A’s own ledger</text>
      <rect x="610" y="276" width="260" height="62" rx="10" class="gbs-ledger gbs-ledger--b"/>
      <text x="740" y="313" class="gbs-t-sub gbs-mid">Bank B’s own ledger</text>
      <path d="M360 307 H600" class="gbs-wire gbs-wire--broken"/>
      <text x="480" y="300" class="gbs-t-x">✕</text>
      <text x="480" y="366" class="gbs-t-sub gbs-mid">No shared ledger: tokens can’t cross</text>
    </g>
    <g data-on="4 5 6">
      <rect x="90" y="270" width="780" height="76" rx="16" class="gbs-platform"/>
      <text x="480" y="300" class="gbs-t-mono gbs-mid">Shared platform · one rulebook</text>
      <text x="480" y="326" class="gbs-t-sub gbs-mid">Each bank’s own tokens, usable across banks</text>
    </g>
    <g data-on="4" class="gbs-hold">
      <rect x="330" y="356" width="300" height="38" rx="19" class="gbs-chip"/>
      ${LOCK(350, 365)}
      <text x="492" y="381" class="gbs-t-mono gbs-mid gbs-t-amber">held until bike handed over</text>
    </g>
    <rect x="60" y="408" width="840" height="130" rx="16" class="gbs-band"/>
    <text x="84" y="438" class="gbs-t-band">Bank of England · RTGS</text>
    <text x="84" y="460" class="gbs-t-sub">central bank money</text>
    <g data-on="1 2 3 4" class="gbs-accts">
      <rect x="330" y="446" width="200" height="44" rx="10" class="gbs-acct"/><text x="430" y="474" class="gbs-t-sub gbs-mid">Bank A’s account</text>
      <rect x="650" y="446" width="200" height="44" rx="10" class="gbs-acct"/><text x="750" y="474" class="gbs-t-sub gbs-mid">Bank B’s account</text>
      <path d="M530 468 H650" class="gbs-wire gbs-wire--dash"/>
    </g>
    <g data-on="3"><text x="480" y="522" class="gbs-t-sub gbs-mid gbs-t-coral">Token ledgers aren’t connected to RTGS</text></g>
    <g data-on="5" class="gbs-opts">
      <text x="876" y="438" class="gbs-t-sub gbs-t-amber" text-anchor="end">GBTD retail pilots: not published</text>
      <g class="gbs-seq"><rect x="84" y="472" width="250" height="54" rx="10" class="gbs-opt"/><text x="209" y="495" class="gbs-t-sub gbs-mid gbs-t-strong">1 · Settle afterwards</text><text x="209" y="516" class="gbs-t-small gbs-mid">as Faster Payments does today</text></g>
      <g class="gbs-seq"><rect x="355" y="472" width="250" height="54" rx="10" class="gbs-opt"/><text x="480" y="495" class="gbs-t-sub gbs-mid gbs-t-strong">2 · Synchronise with RTGS</text><text x="480" y="516" class="gbs-t-small gbs-mid">Bank service due 2028</text></g>
      <g class="gbs-seq"><rect x="626" y="472" width="250" height="54" rx="10" class="gbs-opt gbs-opt--na"/><text x="751" y="495" class="gbs-t-sub gbs-mid gbs-t-strong">3 · Wholesale CBDC token</text><text x="751" y="516" class="gbs-t-small gbs-mid gbs-t-coral">still only being studied</text></g>
    </g>
    <g data-on="6" class="gbs-score">
      <g class="gbs-seq"><rect x="84" y="472" width="250" height="54" rx="10" class="gbs-scorebox"/><text x="209" y="495" class="gbs-t-sub gbs-mid gbs-t-teal">Moves between banks ✓</text><text x="209" y="516" class="gbs-t-small gbs-mid">the platform does this</text></g>
      <g class="gbs-seq"><rect x="355" y="472" width="250" height="54" rx="10" class="gbs-scorebox"/><text x="480" y="495" class="gbs-t-sub gbs-mid gbs-t-amber">Worth £1 everywhere ?</text><text x="480" y="516" class="gbs-t-small gbs-mid">needs central bank money</text></g>
      <g class="gbs-seq"><rect x="626" y="472" width="250" height="54" rx="10" class="gbs-scorebox"/><text x="751" y="495" class="gbs-t-sub gbs-mid gbs-t-amber">Legally final ?</text><text x="751" y="516" class="gbs-t-small gbs-mid">needs rules and law</text></g>
    </g>`;
}

function compactSvg(): string {
  return `
    <g transform="translate(90,46)">
      <circle r="26" class="gbs-av gbs-av--a"/><text y="8" class="gbs-t-initial">S</text>
      <text y="58" class="gbs-t-name gbs-mid">Sam</text>
    </g>
    <g transform="translate(330,46)">
      <circle r="26" class="gbs-av gbs-av--b"/><text y="8" class="gbs-t-initial">A</text>
      <text y="58" class="gbs-t-name gbs-mid">Alex</text>
    </g>
    <rect x="16" y="128" width="184" height="88" rx="14" class="gbs-bank gbs-bank--a"/>
    <text x="32" y="162" class="gbs-t-name">Bank A</text>
    <text x="32" y="194" class="gbs-t-sub" data-bal="a"></text>
    <rect x="220" y="128" width="184" height="88" rx="14" class="gbs-bank gbs-bank--b"/>
    <text x="236" y="162" class="gbs-t-name">Bank B</text>
    <text x="236" y="194" class="gbs-t-sub" data-bal="b"></text>
    <g data-on="1 2">
      <path d="M108 216 V256 H110 M312 216 V256 H310" class="gbs-wire"/>
      <rect x="110" y="236" width="200" height="40" rx="20" class="gbs-pill"/>
      <text x="210" y="261" class="gbs-t-mono gbs-mid">Payment scheme</text>
      <text x="210" y="298" class="gbs-t-sub gbs-mid">Faster Payments · CHAPS</text>
    </g>
    <g data-on="2">
      <rect x="40" y="316" width="340" height="52" rx="12" class="gbs-plate"/>
      <text x="210" y="348" class="gbs-t-mono gbs-mid">£1 at A = £1 at B</text>
    </g>
    <g data-on="3">
      <rect x="16" y="300" width="160" height="60" rx="10" class="gbs-ledger gbs-ledger--a"/>
      <text x="96" y="336" class="gbs-t-sub gbs-mid">A’s own ledger</text>
      <rect x="244" y="300" width="160" height="60" rx="10" class="gbs-ledger gbs-ledger--b"/>
      <text x="324" y="336" class="gbs-t-sub gbs-mid">B’s own ledger</text>
      <path d="M180 330 H240" class="gbs-wire gbs-wire--broken"/>
      <text x="210" y="322" class="gbs-t-x">✕</text>
      <text x="210" y="388" class="gbs-t-sub gbs-mid">Tokens can’t cross</text>
    </g>
    <g data-on="4 5 6">
      <rect x="16" y="296" width="388" height="80" rx="16" class="gbs-platform"/>
      <text x="210" y="328" class="gbs-t-mono gbs-mid">Shared platform · one rulebook</text>
      <text x="210" y="354" class="gbs-t-small gbs-mid">Each bank’s own tokens</text>
    </g>
    <g data-on="4" class="gbs-hold">
      <rect x="62" y="386" width="296" height="36" rx="18" class="gbs-chip"/>
      ${LOCK(80, 394)}
      <text x="220" y="410" class="gbs-t-small gbs-mid gbs-t-amber">held until bike handed over</text>
    </g>
    <rect x="8" y="436" width="404" height="196" rx="16" class="gbs-band"/>
    <text x="26" y="466" class="gbs-t-band">Bank of England · RTGS</text>
    <text x="26" y="488" class="gbs-t-small">central bank money</text>
    <g data-on="1 2 3 4" class="gbs-accts">
      <rect x="24" y="508" width="176" height="44" rx="10" class="gbs-acct"/><text x="112" y="536" class="gbs-t-sub gbs-mid">A’s account</text>
      <rect x="220" y="508" width="176" height="44" rx="10" class="gbs-acct"/><text x="308" y="536" class="gbs-t-sub gbs-mid">B’s account</text>
      <path d="M200 530 H220" class="gbs-wire gbs-wire--dash"/>
    </g>
    <g data-on="3"><text x="210" y="592" class="gbs-t-small gbs-mid gbs-t-coral">Token ledgers aren’t connected to RTGS</text></g>
    <g data-on="5" class="gbs-opts">
      <text x="396" y="466" class="gbs-t-small gbs-t-amber" text-anchor="end">GBTD: not published</text>
      <g class="gbs-seq"><rect x="24" y="504" width="372" height="36" rx="9" class="gbs-opt"/><text x="40" y="528" class="gbs-t-small gbs-t-strong">1 · Settle afterwards, as today</text></g>
      <g class="gbs-seq"><rect x="24" y="546" width="372" height="36" rx="9" class="gbs-opt"/><text x="40" y="570" class="gbs-t-small gbs-t-strong">2 · Synchronise with RTGS, from 2028</text></g>
      <g class="gbs-seq"><rect x="24" y="588" width="372" height="36" rx="9" class="gbs-opt gbs-opt--na"/><text x="40" y="612" class="gbs-t-small gbs-t-strong">3 · Wholesale CBDC token, only studied</text></g>
    </g>
    <g data-on="6" class="gbs-score">
      <g class="gbs-seq"><rect x="24" y="504" width="372" height="36" rx="9" class="gbs-scorebox"/><text x="40" y="528" class="gbs-t-small gbs-t-teal">✓ Moves between banks: the platform</text></g>
      <g class="gbs-seq"><rect x="24" y="546" width="372" height="36" rx="9" class="gbs-scorebox"/><text x="40" y="570" class="gbs-t-small gbs-t-amber">? Worth £1 everywhere: central bank money</text></g>
      <g class="gbs-seq"><rect x="24" y="588" width="372" height="36" rx="9" class="gbs-scorebox"/><text x="40" y="612" class="gbs-t-small gbs-t-amber">? Legally final: rules and law</text></g>
    </g>`;
}

// Balances shown on the bank boxes once each state's move has finished.
const BALANCES: Record<number, [number, number]> = { 1: [0, 100], 2: [100, 0], 3: [100, 0], 4: [0, 100], 5: [0, 100], 6: [0, 100] };

class Cancelled extends Error {}

export function renderGbtdScene(container: HTMLElement, spec: GbtdSceneSpec): void {
  container.classList.add('block-wide');
  const steps = spec.steps;

  container.innerHTML = `
    <div class="gbs">
      <div class="gbs-stage">
        <svg class="gbs-svg" role="img" aria-labelledby="gbs-title gbs-desc" data-state="1">
          <title id="gbs-title">How Sam’s £100 reaches Alex</title>
          <desc id="gbs-desc">Sam at Bank A pays Alex at Bank B. Each step adds one piece: the payment scheme, par between banks, separate token ledgers, a shared platform, the open settlement question and a scorecard. The step text beside the scene describes each state.</desc>
          <g class="gbs-layer"></g>
          <circle class="gbs-tok" r="11" cx="0" cy="0"/>
          <circle class="gbs-cb" r="11" cx="0" cy="0"/>
        </svg>
        <div class="gbs-controls">
          <button type="button" class="gbs-nav gbs-prev" aria-label="Previous step">←</button>
          <div class="gbs-pips" role="group" aria-label="Scene steps">
            ${steps.map((s, i) => `<button type="button" class="gbs-pip" data-go="${i + 1}" aria-label="Step ${i + 1}: ${s.title}" aria-pressed="${i === 0}">${i + 1}</button>`).join('')}
          </div>
          <button type="button" class="gbs-nav gbs-next" aria-label="Next step">→</button>
        </div>
      </div>
      <ol class="gbs-steps">
        ${steps.map((s, i) => `
          <li class="gbs-step${i === 0 ? ' is-on' : ''}" data-step="${i + 1}">
            <p class="gbs-step-label">${s.label}</p>
            <h3 class="gbs-step-title">${s.title}</h3>
            <p class="gbs-step-body">${enhanceTerms(s.body)}</p>
            ${s.like || s.stops ? `<div class="gbs-compare">
              ${s.like ? `<p class="gbs-like"><span class="gbs-compare-k">Like</span>${s.like}</p>` : ''}
              ${s.stops ? `<p class="gbs-stops"><span class="gbs-compare-k">Where it stops working</span>${s.stops}</p>` : ''}
            </div>` : ''}
          </li>`).join('')}
      </ol>
      <p class="gbs-src">Sources: ${spec.sources.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join(' · ')}</p>
    </div>`;

  const root = container.querySelector<HTMLElement>('.gbs')!;
  const svg = root.querySelector<SVGSVGElement>('.gbs-svg')!;
  const layer = svg.querySelector<SVGGElement>('.gbs-layer')!;
  const tok = svg.querySelector<SVGCircleElement>('.gbs-tok')!;
  const cb = svg.querySelector<SVGCircleElement>('.gbs-cb')!;
  const pips = [...root.querySelectorAll<HTMLButtonElement>('.gbs-pip')];
  const stepEls = [...root.querySelectorAll<HTMLElement>('.gbs-step')];
  const stepsList = root.querySelector<HTMLElement>('.gbs-steps')!;
  const prev = root.querySelector<HTMLButtonElement>('.gbs-prev')!;
  const next = root.querySelector<HTMLButtonElement>('.gbs-next')!;

  let anchors = WIDE;
  let layout: 'wide' | 'compact' | '' = '';
  let scrolly = false;
  let current = 1;
  let run = 0;
  let io: IntersectionObserver | null = null;

  const balText = (side: 'a' | 'b', v: number, held = false): string =>
    layout === 'compact'
      ? `${side === 'a' ? 'Sam' : 'Alex'}: £${v}${held ? ' · held' : ''}`
      : `${side === 'a' ? 'Sam’s' : 'Alex’s'} deposit: £${v}${held ? ' · held' : ''}`;
  const setBal = (side: 'a' | 'b', v: number, held = false): void => {
    const t = svg.querySelector(`[data-bal="${side}"]`);
    if (t) t.textContent = balText(side, v, held);
  };

  function setLayout(next: 'wide' | 'compact'): void {
    if (next === layout) return;
    layout = next;
    anchors = next === 'wide' ? WIDE : COMPACT;
    // The wide drawing is cropped to its content so labels render as large as the column allows.
    svg.setAttribute('viewBox', next === 'wide' ? '44 20 872 528' : '0 0 420 640');
    svg.classList.toggle('gbs-svg--compact', next === 'compact');
    layer.innerHTML = next === 'wide' ? wideSvg() : compactSvg();
    show(current, false);
  }

  // One state's move. The same script runs instantly under reduced motion.
  async function play(state: number, token: number): Promise<void> {
    const instant = reducedMotion();
    const check = (): void => { if (token !== run) throw new Cancelled(); };
    const at = (c: SVGCircleElement, [x, y]: Pt): void => { c.style.transform = `translate(${x}px, ${y}px)`; };
    const path = async (c: SVGCircleElement, pts: Pt[], ms: number): Promise<void> => {
      check();
      at(c, pts[pts.length - 1]);
      if (instant) return;
      c.style.opacity = '1';
      const a = c.animate(pts.map(([x, y]) => ({ transform: `translate(${x}px, ${y}px)` })), { duration: ms, easing: 'ease-in-out' });
      await a.finished.catch(() => undefined);
      check();
    };
    const wait = async (ms: number): Promise<void> => {
      check();
      if (!instant) await new Promise(r => setTimeout(r, ms));
      check();
    };
    const count = async (side: 'a' | 'b', from: number, to: number, ms = 600): Promise<void> => {
      check();
      if (instant) { setBal(side, to); return; }
      const start = performance.now();
      await new Promise<void>(resolve => {
        const tick = (now: number): void => {
          if (token !== run) { resolve(); return; }
          const p = Math.min(1, (now - start) / ms);
          setBal(side, Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick); else resolve();
        };
        requestAnimationFrame(tick);
      });
      check();
    };
    const hide = (): void => { tok.style.opacity = '0'; cb.style.opacity = '0'; };

    const A = anchors;
    try {
      hide();
      if (state === 1) {
        setBal('a', 100); setBal('b', 0);
        await wait(250);
        void count('a', 100, 0).catch(() => undefined);
        await path(tok, [A.bankA, A.scheme, A.bankB], 1400);
        await count('b', 0, 100);
        tok.style.opacity = '0';
        await wait(200);
        await path(cb, [A.rtgsA, A.rtgsB], 1000);
        await wait(500);
      } else if (state === 3) {
        await wait(350);
        await path(tok, [A.ledgerA, A.ledgerGap], 900);
        if (!instant) {
          await tok.animate([0, 7, -7, 5, -5, 0].map(dx => ({ transform: `translate(${A.ledgerGap[0] + dx}px, ${A.ledgerGap[1]}px)` })), { duration: 380 }).finished.catch(() => undefined);
          check();
        }
        await path(tok, [A.ledgerGap, A.ledgerA], 700);
        await wait(300);
      } else if (state === 4) {
        setBal('a', 100); setBal('b', 0);
        await wait(250);
        await path(tok, [A.bankA, A.platA, A.platMid], 1100);
        setBal('a', 100, true);
        svg.querySelector('.gbs-hold')?.classList.add('gbs-hold--pulse');
        await wait(instant ? 0 : 900);
        svg.querySelector('.gbs-hold')?.classList.remove('gbs-hold--pulse');
        void count('a', 100, 0, 500).catch(() => undefined);
        await path(tok, [A.platMid, A.platB, A.bankB], 1100);
        await count('b', 0, 100);
        await wait(300);
      }
    } catch (e) {
      if (!(e instanceof Cancelled)) throw e;
      return;
    }
    hide();
    const [a, b] = BALANCES[state];
    setBal('a', a); setBal('b', b);
  }

  function show(state: number, animate: boolean): void {
    current = state;
    run++;
    svg.getAnimations({ subtree: true }).forEach(a => a.cancel());
    svg.dataset.state = String(state);
    pips.forEach(p => p.setAttribute('aria-pressed', String(Number(p.dataset.go) === state)));
    stepEls.forEach(s => {
      const on = Number(s.dataset.step) === state;
      s.classList.toggle('is-on', on);
      if (on) s.setAttribute('aria-current', 'step'); else s.removeAttribute('aria-current');
    });
    prev.disabled = state === 1;
    next.disabled = state === steps.length;
    const [a, b] = BALANCES[state];
    if (animate && (state === 1 || state === 3 || state === 4)) {
      void play(state, run);
    } else {
      tok.style.opacity = '0'; cb.style.opacity = '0';
      setBal('a', a); setBal('b', b);
    }
  }

  // While a button-driven scroll is under way, ignore the steps it passes on the way.
  let ignoreScrollUntil = 0;

  function go(state: number): void {
    const n = Math.min(steps.length, Math.max(1, state));
    if (scrolly) {
      ignoreScrollUntil = performance.now() + 1000;
      stepEls[n - 1].scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' });
      if (n !== current) show(n, true);
    } else if (n !== current) {
      show(n, true);
    }
  }

  pips.forEach(p => p.addEventListener('click', () => go(Number(p.dataset.go))));
  prev.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));

  function setMode(wide: boolean): void {
    if (wide === scrolly && layout) return;
    scrolly = wide;
    root.classList.toggle('gbs--scrolly', wide);
    root.classList.toggle('gbs--stepper', !wide);
    stepsList.setAttribute('aria-live', wide ? 'off' : 'polite');
    io?.disconnect();
    io = null;
    if (wide && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting || performance.now() < ignoreScrollUntil) return;
          const n = Number((e.target as HTMLElement).dataset.step);
          if (n !== current) show(n, true);
        });
      }, { rootMargin: '-45% 0px -45% 0px' });
      stepEls.forEach(s => io!.observe(s));
    }
  }

  // Layout follows the container, not the viewport: the sidebar takes 260px on desktop.
  const fit = (): void => {
    if (!root.isConnected) { ro.disconnect(); io?.disconnect(); return; }
    const w = root.clientWidth;
    setMode(w >= 900);
    setLayout(w >= 640 ? 'wide' : 'compact');
  };
  const ro = new ResizeObserver(() => fit());
  ro.observe(root);
  fit();
  show(1, false);
}
