// chapters.ts
// Numbered chapter headings for long topics, and a sticky chapter rail that tracks them.
// The rail shows every chapter inline on wide screens and collapses to a progress bar
// with a chapter menu on narrow ones. Navigation scrolls in place: hash links would
// trigger the router's popstate handler and re-render the topic.

import type { ChapterSpec, ChapterNavSpec } from '../types';
import { openChatWithQuestion } from '../chat';

const reducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Only one rail is live at a time; a new render releases the previous rail's listeners.
let railAbort: AbortController | null = null;

export function renderChapter(container: HTMLElement, spec: ChapterSpec): void {
  container.parentElement?.classList.add('chapter-block');
  container.classList.add('block-wide');
  container.innerHTML = `
    <header class="chh" id="${spec.id}" tabindex="-1">
      <span class="chh-num" aria-hidden="true">${spec.num}</span>
      <div class="chh-text">
        <h2 class="chh-title"><span class="sr-only">Chapter ${spec.num}: </span>${spec.title}</h2>
        ${spec.job ? `<p class="chh-job">${spec.job}</p>` : ''}
      </div>
      ${spec.ask ? `<button type="button" class="chh-ask" aria-label="Ask the site assistant about chapter ${spec.num}">Ask about this</button>` : ''}
    </header>`;

  const ask = container.querySelector<HTMLButtonElement>('.chh-ask');
  const question = spec.ask;
  if (ask && question) {
    ask.addEventListener('click', () => {
      if (!openChatWithQuestion(question)) ask.hidden = true;
    });
  }
}

export function renderChapterNav(container: HTMLElement, spec: ChapterNavSpec): void {
  railAbort?.abort();
  const abort = new AbortController();
  railAbort = abort;
  const { signal } = abort;

  container.parentElement?.classList.add('chn-block');
  container.classList.add('block-wide', 'cq');

  const total = spec.chapters.length;
  container.innerHTML = `
    <nav class="chn" aria-label="Chapters on this page">
      <div class="chn-row">
        <button type="button" class="chn-toggle" aria-expanded="false" aria-controls="chn-list">
          <span class="chn-count">${total} chapters</span>
          <span class="chn-current">Jump to a chapter</span>
          <span class="chn-caret" aria-hidden="true"></span>
        </button>
        <ol class="chn-list" id="chn-list">
          ${spec.chapters.map(c => `
            <li><button type="button" class="chn-item" data-target="${c.id}">
              <span class="chn-item-num" aria-hidden="true">${c.num}</span>
              <span class="chn-item-label">${c.short}</span>
            </button></li>`).join('')}
        </ol>
      </div>
      <div class="chn-progress" aria-hidden="true"><span class="chn-fill"></span></div>
    </nav>`;

  const nav = container.querySelector<HTMLElement>('.chn')!;
  const toggle = nav.querySelector<HTMLButtonElement>('.chn-toggle')!;
  const countEl = nav.querySelector<HTMLElement>('.chn-count')!;
  const currentEl = nav.querySelector<HTMLElement>('.chn-current')!;
  const fill = nav.querySelector<HTMLElement>('.chn-fill')!;
  const items = [...nav.querySelectorAll<HTMLButtonElement>('.chn-item')];

  const setOpen = (open: boolean): void => {
    nav.classList.toggle('chn--open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('chn--open')), { signal });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('chn--open')) { setOpen(false); toggle.focus(); }
  }, { signal });
  document.addEventListener('click', e => {
    if (nav.classList.contains('chn--open') && !nav.contains(e.target as Node)) setOpen(false);
  }, { signal });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const target = document.getElementById(item.dataset.target ?? '');
      setOpen(false);
      if (!target) return;
      target.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
      target.focus({ preventScroll: true });
    }, { signal });
  });

  let active = -2;
  let frame = 0;
  const update = (): void => {
    frame = 0;
    if (!container.isConnected) { abort.abort(); return; }
    // A chapter counts as current once its heading reaches the band just under the rail.
    const offset = nav.getBoundingClientRect().bottom + 72;
    let idx = -1;
    spec.chapters.forEach((c, i) => {
      const el = document.getElementById(c.id);
      if (el && el.getBoundingClientRect().top <= offset) idx = i;
    });
    if (idx !== active) {
      active = idx;
      items.forEach((b, i) => {
        if (i === idx) b.setAttribute('aria-current', 'true');
        else b.removeAttribute('aria-current');
      });
      if (idx < 0) {
        countEl.textContent = `${total} chapters`;
        currentEl.textContent = 'Jump to a chapter';
      } else {
        countEl.textContent = `${idx + 1} of ${total}`;
        currentEl.textContent = spec.chapters[idx].short;
      }
    }
    const body = container.closest<HTMLElement>('.topic-body') ?? document.body;
    const rect = body.getBoundingClientRect();
    const span = Math.max(1, rect.height - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -rect.top / span));
    fill.style.transform = `scaleX(${progress})`;
  };
  const schedule = (): void => { if (!frame) frame = requestAnimationFrame(update); };

  window.addEventListener('scroll', schedule, { passive: true, signal });
  window.addEventListener('resize', schedule, { signal });
  signal.addEventListener('abort', () => { if (frame) cancelAnimationFrame(frame); });
  schedule();
}
