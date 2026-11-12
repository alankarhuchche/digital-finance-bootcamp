// useCaseAtlas.ts
// Use-case atlas: a two-by-two map (inside one bank or between banks, organisations
// or people) with one numbered marker per use case, above a filterable set of cards.
// Each card opens to what does the job today, what tokens add, watch-outs and sources.
// Filters move the markers in place: matching ones drop into their square, the rest dim.

import type { UseCaseAtlasSpec, UseCaseItem, UseCaseStatus, UseCaseAudience, UseCaseRow } from '../types';

const reducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const STATUS_FILTERS: { key: UseCaseStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'Any status' },
  { key: 'live', label: 'Live' },
  { key: 'pilot', label: 'Pilot' },
  { key: 'poc', label: 'Proof of concept' },
];

const AUDIENCE_FILTERS: { key: UseCaseAudience | 'all'; label: string }[] = [
  { key: 'all', label: 'Everyone' },
  { key: 'people', label: 'People' },
  { key: 'companies', label: 'Companies' },
  { key: 'markets', label: 'Markets' },
];

const rowOf = (item: UseCaseItem): UseCaseRow => (item.audience === 'people' ? 'people' : 'organisations');

export function renderUseCaseAtlas(container: HTMLElement, spec: UseCaseAtlasSpec): void {
  container.classList.add('block-wide', 'cq');
  const numbered = spec.items.map((item, i) => ({ item, n: i + 1 }));

  const cellHtml = (row: UseCaseRow, reach: 'inside' | 'between'): string => {
    const cell = spec.cells.find(c => c.row === row && c.reach === reach);
    const members = numbered.filter(({ item }) => rowOf(item) === row && item.reach === reach);
    const classes = ['uca-cell', cell?.highlight ? 'uca-cell--hl' : '', members.length ? '' : 'uca-cell--empty'].join(' ').trim();
    return `
      <div class="${classes}">
        <p class="uca-cell-tag">${cell?.label ?? `${spec.rows[row]} · ${spec.columns[reach]}`}</p>
        ${cell?.status ? `<span class="st-chip st-chip--${cell.status.tone}">${cell.status.label}</span>` : ''}
        ${cell ? `<p class="uca-cell-text">${cell.text}</p>` : ''}
        ${members.length ? `<div class="uca-dots">${members.map(({ item, n }) => `
          <button type="button" class="uca-dot uca-dot--${item.status}" data-item="${item.id}"
            aria-label="Use case ${n}: ${item.title}">${n}</button>`).join('')}</div>` : ''}
      </div>`;
  };

  const cardHtml = ({ item, n }: { item: UseCaseItem; n: number }): string => `
    <article class="uca-card uca-card--${item.status}${item.highlight ? ' uca-card--hl' : ''}" id="uca-${item.id}"
      data-status="${item.status}" data-audience="${item.audience}">
      <div class="uca-card-head">
        <span class="uca-num" aria-hidden="true">${n}</span>
        <span class="st-chip st-chip--${item.status}">${item.statusLabel}</span>
      </div>
      <h3 class="uca-card-title">${item.title}</h3>
      <p class="uca-card-sum">${item.summary}</p>
      ${item.aside ? `<p class="uca-card-aside">${item.aside}</p>` : ''}
      <button type="button" class="uca-more" aria-expanded="false" aria-controls="uca-${item.id}-more">What changes</button>
      <div class="uca-more-panel" id="uca-${item.id}-more" hidden>
        <dl class="uca-dl">
          <dt>Today, without tokens</dt><dd>${item.today}</dd>
          <dt>What tokens add</dt><dd>${item.adds}</dd>
          <dt>Watch out for</dt><dd>${item.watch}</dd>
        </dl>
        <p class="uca-src">Sources: ${item.sources.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join(' · ')}</p>
      </div>
    </article>`;

  container.innerHTML = `
    <div class="uca">
      <div class="uca-map">
        <div class="uca-cols" aria-hidden="true"><span>${spec.columns.inside}</span><span>${spec.columns.between}</span></div>
        <div class="uca-quad">
          ${cellHtml('organisations', 'inside')}
          ${cellHtml('organisations', 'between')}
          ${cellHtml('people', 'inside')}
          ${cellHtml('people', 'between')}
        </div>
      </div>
      <div class="uca-filters">
        <div class="uca-filter" role="group" aria-label="Filter use cases by status">
          ${STATUS_FILTERS.map(f => `<button type="button" class="uca-fbtn" data-fs="${f.key}" aria-pressed="${f.key === 'all'}">${f.label}</button>`).join('')}
        </div>
        <div class="uca-filter" role="group" aria-label="Filter use cases by who they serve">
          ${AUDIENCE_FILTERS.map(f => `<button type="button" class="uca-fbtn" data-fa="${f.key}" aria-pressed="${f.key === 'all'}">${f.label}</button>`).join('')}
        </div>
        <p class="uca-count" aria-live="polite"></p>
      </div>
      <div class="uca-grid">${numbered.map(cardHtml).join('')}</div>
      <p class="uca-empty" hidden></p>
      ${spec.footnote ? `<p class="uca-foot">${spec.footnote}</p>` : ''}
    </div>`;

  const root = container.querySelector<HTMLElement>('.uca')!;
  const cards = [...root.querySelectorAll<HTMLElement>('.uca-card')];
  const dots = [...root.querySelectorAll<HTMLButtonElement>('.uca-dot')];
  const countEl = root.querySelector<HTMLElement>('.uca-count')!;
  const emptyEl = root.querySelector<HTMLElement>('.uca-empty')!;
  let fs: UseCaseStatus | 'all' = 'all';
  let fa: UseCaseAudience | 'all' = 'all';

  const matches = (item: UseCaseItem): boolean =>
    (fs === 'all' || item.status === fs) && (fa === 'all' || item.audience === fa);

  const drop = (els: HTMLElement[]): void => {
    if (reducedMotion()) return;
    els.forEach((el, i) => el.animate(
      [{ opacity: 0, transform: 'translateY(-14px) scale(0.6)' }, { opacity: 1, transform: 'none' }],
      { duration: 420, delay: i * 45, easing: 'cubic-bezier(.2,.9,.3,1.25)', fill: 'backwards' },
    ));
  };

  const apply = (animate: boolean): void => {
    let shown = 0;
    spec.items.forEach((item, i) => {
      const ok = matches(item);
      cards[i].hidden = !ok;
      if (ok) shown++;
    });
    const lit: HTMLElement[] = [];
    dots.forEach(dot => {
      const item = spec.items.find(it => it.id === dot.dataset.item)!;
      const ok = matches(item);
      if (ok && dot.classList.contains('uca-dot--off')) lit.push(dot);
      dot.classList.toggle('uca-dot--off', !ok);
    });
    if (animate) drop(lit);
    countEl.textContent = shown === spec.items.length
      ? `${shown} use cases`
      : `Showing ${shown} of ${spec.items.length} use cases`;
    const note = spec.emptyNotes?.find(e => e.status === fs && e.audience === fa);
    emptyEl.textContent = note ? note.text : 'No use cases match both filters.';
    emptyEl.hidden = shown > 0;
  };

  root.querySelectorAll<HTMLButtonElement>('[data-fs]').forEach(btn => btn.addEventListener('click', () => {
    fs = btn.dataset.fs as UseCaseStatus | 'all';
    root.querySelectorAll<HTMLButtonElement>('[data-fs]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    apply(true);
  }));
  root.querySelectorAll<HTMLButtonElement>('[data-fa]').forEach(btn => btn.addEventListener('click', () => {
    fa = btn.dataset.fa as UseCaseAudience | 'all';
    root.querySelectorAll<HTMLButtonElement>('[data-fa]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    apply(true);
  }));

  const setOpen = (card: HTMLElement, open: boolean): void => {
    const btn = card.querySelector<HTMLButtonElement>('.uca-more')!;
    const panel = card.querySelector<HTMLElement>('.uca-more-panel')!;
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Hide detail' : 'What changes';
    panel.hidden = !open;
    card.classList.toggle('uca-card--open', open);
  };

  cards.forEach(card => {
    card.querySelector<HTMLButtonElement>('.uca-more')!.addEventListener('click', () => {
      setOpen(card, card.querySelector('.uca-more')!.getAttribute('aria-expanded') !== 'true');
    });
  });

  // A marker opens its card; filters that hide the card are cleared first.
  dots.forEach(dot => dot.addEventListener('click', () => {
    const card = root.querySelector<HTMLElement>(`#uca-${dot.dataset.item}`);
    if (!card) return;
    if (card.hidden) {
      fs = 'all'; fa = 'all';
      root.querySelectorAll<HTMLButtonElement>('[data-fs], [data-fa]').forEach(b =>
        b.setAttribute('aria-pressed', String(b.dataset.fs === 'all' || b.dataset.fa === 'all')));
      apply(false);
    }
    setOpen(card, true);
    card.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' });
    card.querySelector<HTMLButtonElement>('.uca-more')!.focus({ preventScroll: true });
    if (!reducedMotion()) {
      card.animate([{ boxShadow: '0 0 0 3px rgba(232,163,61,.9)' }, { boxShadow: '0 0 0 0 rgba(232,163,61,0)' }],
        { duration: 1400, easing: 'ease-out' });
    }
  }));

  apply(false);

  // First sight of the map: markers drop into their squares once.
  if ('IntersectionObserver' in window && !reducedMotion()) {
    dots.forEach(d => { d.style.opacity = '0'; });
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      io.disconnect();
      dots.forEach(d => { d.style.opacity = ''; });
      drop(dots);
    }, { threshold: 0.35 });
    io.observe(root.querySelector('.uca-quad')!);
  }
}
