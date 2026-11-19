// ui.ts — small shared helpers for the Stablecoins scenes.
// Native radio groups for every control (keyboard and screen-reader support for free),
// one polite live region per scene, and a single reduced-motion check.

import { openChatWithQuestion, setChatScene } from '../../chat';

export const reducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s: string): string => s.replace(/[&<>"']/g, c => ESC[c]);

export const fmtGBP = (n: number, dp = 2): string =>
  `£${n.toLocaleString('en-GB', { minimumFractionDigits: dp, maximumFractionDigits: dp })}`;

export const fmtK = (n: number): string => `£${(Math.round(n * 10) / 10).toLocaleString('en-GB')}k`;

let uid = 0;
export const nextId = (prefix: string): string => `${prefix}-${++uid}`;

export interface SegOption<T extends string> { value: T; label: string; hint?: string }

/** A fieldset of radio buttons styled as a segmented control. */
export function segmented<T extends string>(name: string, legend: string, options: SegOption<T>[], value: T): string {
  const group = nextId(name);
  return `<fieldset class="sc-seg" data-name="${name}">
    <legend class="sc-seg-legend">${esc(legend)}</legend>
    <div class="sc-seg-options">
      ${options.map(o => `<label class="sc-seg-opt"${o.hint ? ` title="${esc(o.hint)}"` : ''}>
        <input type="radio" name="${group}" value="${o.value}"${o.value === value ? ' checked' : ''} />
        <span>${esc(o.label)}</span>
      </label>`).join('')}
    </div>
  </fieldset>`;
}

/** Read and write a segmented control's value. */
export function readSeg(root: HTMLElement, name: string): string | null {
  const input = root.querySelector<HTMLInputElement>(`fieldset[data-name="${name}"] input:checked`);
  return input ? input.value : null;
}

export function writeSeg(root: HTMLElement, name: string, value: string): void {
  root.querySelectorAll<HTMLInputElement>(`fieldset[data-name="${name}"] input`).forEach(i => {
    i.checked = i.value === value;
  });
}

/** Polite live region for step announcements. */
export function liveRegion(): string {
  return '<p class="sr-only" role="status" aria-live="polite" data-live></p>';
}

export function announce(root: HTMLElement, text: string): void {
  const live = root.querySelector<HTMLElement>('[data-live]');
  if (live) live.textContent = text;
}

/** "Ask about this" button: opens the site chat with an editable question and tells it which scene. */
export function askButton(label: string): string {
  return `<button type="button" class="sc-ask" data-ask>${esc(label)}</button>`;
}

export function bindAsk(root: HTMLElement, scene: string, question: () => string): void {
  root.querySelector<HTMLButtonElement>('[data-ask]')?.addEventListener('click', () => {
    setChatScene(scene);
    if (!openChatWithQuestion(question())) {
      const btn = root.querySelector<HTMLButtonElement>('[data-ask]');
      if (btn) btn.hidden = true;
    }
  });
  // Interacting with a scene makes it the chat's context for the next question.
  root.addEventListener('focusin', () => setChatScene(scene));
  root.addEventListener('pointerdown', () => setChatScene(scene));
}

/** Basis label: tells the reader how a number on screen is known. */
export function basis(kind: 'illustrative' | 'derived' | 'sourced' | 'qualitative', text?: string): string {
  const label = { illustrative: 'Illustrative', derived: 'Derived', sourced: 'Sourced', qualitative: 'Qualitative' }[kind];
  return `<span class="sc-basis sc-basis--${kind}"${text ? ` title="${esc(text)}"` : ''}>${label}</span>`;
}
