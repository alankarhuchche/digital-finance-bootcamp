// gbtdHook.ts
// "Who goes first?": the opening dilemma on the GBTD topic. Two situations from the
// 2026 pilots (buying from a stranger, completing a remortgage) and three choices each.
// Every choice plays one short, one-off move of the same small scene: who parts with
// what, and who is left exposed. Reduced motion shows each outcome's end state at once.

import type { GbtdHookSpec, GbtdHookTab, GbtdHookChoiceId } from '../types';
import { enhanceTerms } from './termHelp';

const reducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const COIN_HOME = { x: 110, y: 214 };
const ITEM_HOME = { x: 530, y: 214 };

// Bike and home glyphs, drawn around (0, 0).
const BIKE = `
  <circle cx="-17" cy="6" r="11"/><circle cx="17" cy="6" r="11"/>
  <path d="M-17 6 L-5 -12 H9 L17 6 M-5 -12 L3 6 H-17 M7 -18 H13"/>`;
const HOME = `
  <path d="M-20 -2 L0 -20 L20 -2 V18 H-20 Z"/><path d="M-7 18 V5 H7 V18"/>`;

type Stage = Record<'coin' | 'lock' | 'item' | 'mid' | 'clock' | 'payee', SVGGElement>;

class Cancelled extends Error {}

export function renderGbtdHook(container: HTMLElement, spec: GbtdHookSpec): void {
  container.classList.add('block-wide', 'cq');
  container.innerHTML = `
    <div class="gbh">
      <div class="gbh-main">
        <div class="gbh-tabs" role="group" aria-label="Choose a situation">
          ${spec.tabs.map((t, i) => `<button type="button" class="gbh-tab" data-tab="${t.id}" aria-pressed="${i === 0}">${t.tab}</button>`).join('')}
        </div>
        <p class="gbh-intro"></p>
        <svg class="gbh-svg" viewBox="0 0 640 290" aria-hidden="true" focusable="false">
          <line x1="40" y1="250" x2="600" y2="250" class="gbh-ground"/>
          <g class="gbh-party gbh-party--a">
            <circle cx="110" cy="62" r="30" class="gbh-av gbh-av--a"/>
            <text x="110" y="70" class="gbh-initial" data-k="payer-initial"></text>
            <text x="110" y="118" class="gbh-name" data-k="payer-name"></text>
            <text x="110" y="138" class="gbh-sub" data-k="payer-sub"></text>
          </g>
          <g class="gbh-party gbh-party--b" data-el="payee">
            <circle cx="530" cy="62" r="30" class="gbh-av gbh-av--b"/>
            <text x="530" y="70" class="gbh-initial" data-k="payee-initial"></text>
            <text x="530" y="118" class="gbh-name" data-k="payee-name"></text>
            <text x="530" y="138" class="gbh-sub" data-k="payee-sub"></text>
            <text x="562" y="44" class="gbh-fake">?</text>
          </g>
          <g data-el="mid" class="gbh-mid">
            <rect x="240" y="180" width="160" height="62" rx="12"/>
            <text x="320" y="174" class="gbh-mid-label" data-k="mid"></text>
          </g>
          <g data-el="clock" class="gbh-clock">
            <circle cx="420" cy="211" r="13"/><path d="M420 204 V211 L426 215"/>
          </g>
          <g data-el="item" class="gbh-item">
            <g class="gbh-glyph"></g>
            <text x="0" y="46" class="gbh-item-label" data-k="item"></text>
          </g>
          <g data-el="coin" class="gbh-coin">
            <circle r="24"/>
            <text y="6" class="gbh-coin-text">£100</text>
          </g>
          <g data-el="lock" class="gbh-lock">
            <circle r="31" class="gbh-lock-ring"/>
            <g transform="translate(14,-34)">
              <rect x="0" y="9" width="18" height="14" rx="3"/>
              <path d="M4 9 V6 a5 5 0 0 1 10 0 V9"/>
            </g>
          </g>
          <text x="320" y="86" class="gbh-badge"></text>
        </svg>
        <p class="gbh-ask" id="gbh-ask">Who goes first?</p>
        <div class="gbh-choices" role="group" aria-labelledby="gbh-ask">
          ${(['pay', 'hand', 'lock'] as GbtdHookChoiceId[]).map(c => `<button type="button" class="gbh-choice gbh-choice--${c}" data-choice="${c}" aria-pressed="false"></button>`).join('')}
        </div>
        <p class="gbh-outcome" aria-live="polite"></p>
      </div>
      <div class="gbh-side">
        <div class="gbh-copy prose"></div>
        <p class="gbh-lens">${enhanceTerms(spec.lens)}</p>
        <p class="gbh-src">Sources: ${spec.sources.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join(' · ')}</p>
      </div>
    </div>`;

  const root = container.querySelector<HTMLElement>('.gbh')!;
  const svg = root.querySelector<SVGSVGElement>('.gbh-svg')!;
  const el = (k: string) => svg.querySelector<SVGGElement>(`[data-el="${k}"]`)!;
  const stage: Stage = { coin: el('coin'), lock: el('lock'), item: el('item'), mid: el('mid'), clock: el('clock'), payee: el('payee') };
  const badge = svg.querySelector<SVGTextElement>('.gbh-badge')!;
  const outcome = root.querySelector<HTMLElement>('.gbh-outcome')!;
  const choiceBtns = [...root.querySelectorAll<HTMLButtonElement>('.gbh-choice')];
  let tab: GbtdHookTab = spec.tabs[0];
  let run = 0;

  const text = (k: string, v: string): void => { svg.querySelector(`[data-k="${k}"]`)!.textContent = v; };
  const place = (g: SVGGElement, x: number, y: number): void => { g.style.transform = `translate(${x}px, ${y}px)`; };
  const vis = (g: SVGGElement | SVGTextElement, on: boolean): void => { g.style.opacity = on ? '1' : '0'; };

  function reset(): void {
    run++;
    svg.getAnimations({ subtree: true }).forEach(a => a.cancel());
    place(stage.coin, COIN_HOME.x, COIN_HOME.y);
    place(stage.lock, COIN_HOME.x, COIN_HOME.y);
    place(stage.item, ITEM_HOME.x, ITEM_HOME.y);
    vis(stage.coin, true); vis(stage.item, true);
    vis(stage.lock, false); vis(stage.mid, false); vis(stage.clock, false); vis(badge, false);
    stage.payee.classList.remove('gbh-party--fake');
    badge.removeAttribute('class');
    badge.classList.add('gbh-badge');
  }

  function showTab(next: GbtdHookTab): void {
    tab = next;
    reset();
    root.querySelectorAll<HTMLButtonElement>('.gbh-tab').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tab === next.id)));
    root.querySelector('.gbh-intro')!.textContent = next.intro;
    root.querySelector('.gbh-copy')!.innerHTML = enhanceTerms(next.copy);
    text('payer-initial', next.payer.name[0]); text('payer-name', next.payer.name); text('payer-sub', next.payer.sub);
    text('payee-initial', next.payee.name[0]); text('payee-name', next.payee.name); text('payee-sub', next.payee.sub);
    text('item', next.itemLabel); text('mid', next.midLabel);
    svg.querySelector('.gbh-glyph')!.innerHTML = next.id === 'buy' ? BIKE : HOME;
    choiceBtns.forEach(b => {
      b.textContent = next.choices[b.dataset.choice as GbtdHookChoiceId].label;
      b.setAttribute('aria-pressed', 'false');
    });
    outcome.textContent = 'Pick who goes first to see what can go wrong.';
  }

  // Runner: the same script animates normally, or lands on its end state at once.
  function runner(token: number) {
    const instant = reducedMotion();
    const check = (): void => { if (token !== run) throw new Cancelled(); };
    const current = (g: SVGGElement): string => g.style.transform || 'translate(0px, 0px)';
    return {
      async move(g: SVGGElement, x: number, y: number, ms = 900): Promise<void> {
        check();
        const to = `translate(${x}px, ${y}px)`;
        if (!instant) {
          const a = g.animate([{ transform: current(g) }, { transform: to }], { duration: ms, easing: 'cubic-bezier(.45,0,.2,1)', fill: 'forwards' });
          await a.finished.catch(() => undefined);
          check();
          a.cancel();
        }
        g.style.transform = to;
      },
      async fade(g: SVGGElement | SVGTextElement, on: boolean, ms = 320): Promise<void> {
        check();
        if (!instant) {
          const a = g.animate([{ opacity: g.style.opacity || '1' }, { opacity: on ? '1' : '0' }], { duration: ms, fill: 'forwards' });
          await a.finished.catch(() => undefined);
          check();
          a.cancel();
        }
        vis(g, on);
      },
      async shake(g: SVGGElement): Promise<void> {
        check();
        if (instant) return;
        const base = current(g);
        const a = g.animate([0, -9, 9, -6, 6, 0].map(dx => ({ transform: `${base} translateX(${dx}px)` })), { duration: 420 });
        await a.finished.catch(() => undefined);
        check();
      },
      async wait(ms: number): Promise<void> {
        check();
        if (!instant) await new Promise(r => setTimeout(r, ms));
        check();
      },
      async say(label: string, tone: 'bad' | 'stuck' | 'good' | 'info'): Promise<void> {
        check();
        badge.textContent = label;
        badge.setAttribute('class', `gbh-badge gbh-badge--${tone}`);
        await this.fade(badge, true, 260);
      },
    };
  }

  type Run = ReturnType<typeof runner>;
  const scripts: Record<'buy' | 'home', Record<GbtdHookChoiceId, (r: Run) => Promise<void>>> = {
    buy: {
      async pay(r) {
        await r.move(stage.coin, 470, ITEM_HOME.y);
        await r.wait(250);
        stage.payee.classList.add('gbh-party--fake');
        await r.fade(stage.item, false, 450);
        await r.say('✕  £100 gone, no bike', 'bad');
      },
      async hand(r) {
        await r.move(stage.item, 170, ITEM_HOME.y);
        await r.wait(350);
        await r.say('✕  Bike gone, nothing paid', 'bad');
      },
      async lock(r) {
        await r.fade(stage.lock, true);
        await r.say('Held: still Sam’s money', 'info');
        await r.wait(450);
        await r.move(stage.item, 170, ITEM_HOME.y);
        await r.fade(stage.lock, false, 250);
        await r.move(stage.coin, 470, ITEM_HOME.y);
        await r.say('✓  Bike and money both arrive', 'good');
      },
    },
    home: {
      async pay(r) {
        await r.fade(stage.mid, true);
        await r.move(stage.coin, 320, COIN_HOME.y);
        await r.fade(stage.clock, true);
        await r.say('Waiting a day, interest running', 'stuck');
      },
      async hand(r) {
        await r.move(stage.item, 380, ITEM_HOME.y, 600);
        await r.shake(stage.item);
        await r.move(stage.item, ITEM_HOME.x, ITEM_HOME.y, 450);
        await r.say('✕  Not before it’s repaid', 'stuck');
      },
      async lock(r) {
        await r.fade(stage.lock, true);
        await r.say('Locked until completion', 'info');
        await r.wait(650);
        await r.say('Completion', 'info');
        await r.fade(stage.lock, false, 250);
        await r.move(stage.coin, 470, COIN_HOME.y);
        await r.fade(stage.item, false, 400);
        await r.say('✓  Loan repaid, charge released', 'good');
      },
    },
  };

  async function play(choice: GbtdHookChoiceId): Promise<void> {
    reset();
    const token = run;
    choiceBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.choice === choice)));
    outcome.innerHTML = tab.choices[choice].outcome;
    try {
      await scripts[tab.id][choice](runner(token));
    } catch (e) {
      if (!(e instanceof Cancelled)) throw e;
    }
  }

  root.querySelectorAll<HTMLButtonElement>('.gbh-tab').forEach(b => b.addEventListener('click', () => {
    const next = spec.tabs.find(t => t.id === b.dataset.tab);
    if (next && next !== tab) showTab(next);
  }));
  choiceBtns.forEach(b => b.addEventListener('click', () => { void play(b.dataset.choice as GbtdHookChoiceId); }));

  // Narrow screens crop the margins and drop the role lines so labels stay legible.
  const fit = (): void => {
    if (!root.isConnected) { ro.disconnect(); return; }
    const compact = svg.clientWidth < 520;
    svg.setAttribute('viewBox', compact ? '50 0 540 290' : '0 0 640 290');
    root.classList.toggle('gbh--compact', compact);
  };
  const ro = new ResizeObserver(fit);
  ro.observe(root);
  fit();

  showTab(spec.tabs[0]);
}
