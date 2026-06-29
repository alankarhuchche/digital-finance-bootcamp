import { TERM_DEFINITIONS } from '../content/termDefinitions';

const sortedDefs = [...TERM_DEFINITIONS]
  .flatMap(d => d.aliases.map(a => ({ alias: a, def: d })))
  .sort((a, b) => b.alias.length - a.alias.length);

let activePopover: HTMLElement | null = null;

function closeActive() {
  if (activePopover) {
    activePopover.remove();
    activePopover = null;
  }
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeActive(); });
document.addEventListener('click', (e) => {
  if (activePopover && !(e.target as HTMLElement).closest('.term-help')) closeActive();
});

export function enhanceTerms(html: string): string {
  const seen = new Set<string>();
  let result = html;

  for (const { alias, def } of sortedDefs) {
    if (seen.has(def.term)) continue;

    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(?<![\\w/\\-])${escaped}(?![\\w/\\-"<])`, 'g');

    let matched = false;
    result = result.replace(re, (match) => {
      if (matched) return match;
      matched = true;
      seen.add(def.term);

      const fullFormAttr = def.fullForm ? ` data-full="${def.fullForm}"` : '';
      const glossaryAttr = def.glossaryId ? ` data-glossary="${def.glossaryId}"` : '';
      return `<span class="term-help" tabindex="0" role="button" aria-label="${match}: ${def.simple.substring(0, 80)}" data-term="${def.term}"${fullFormAttr}${glossaryAttr} data-simple="${escAttr(def.simple)}">${match}</span>`;
    });
  }

  return result;
}

export function bindTermPopovers(container: HTMLElement): void {
  container.querySelectorAll<HTMLElement>('.term-help').forEach(trigger => {
    const handler = () => {
      closeActive();

      const simple = trigger.dataset.simple ?? '';
      const full = trigger.dataset.full;
      const glossaryId = trigger.dataset.glossary;
      const term = trigger.dataset.term ?? '';

      const pop = document.createElement('div');
      pop.className = 'term-help__popover';
      pop.setAttribute('role', 'tooltip');
      pop.innerHTML = `
        ${full ? `<span class="term-help__full">${term} — ${full}</span>` : `<span class="term-help__full">${term}</span>`}
        <p class="term-help__text">${simple}</p>
        ${glossaryId ? `<a class="term-help__link" href="/topic/glossary">View glossary</a>` : ''}
      `;

      trigger.appendChild(pop);
      activePopover = pop;

      // Position check — keep within viewport
      requestAnimationFrame(() => {
        const rect = pop.getBoundingClientRect();
        if (rect.right > window.innerWidth - 8) {
          pop.style.left = 'auto';
          pop.style.right = '0';
        }
        if (rect.bottom > window.innerHeight - 8) {
          pop.style.top = 'auto';
          pop.style.bottom = '100%';
          pop.style.marginBottom = '6px';
          pop.style.marginTop = '0';
        }
      });
    };

    trigger.addEventListener('click', (e) => { e.stopPropagation(); handler(); });
    trigger.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); handler(); } });
  });
}

function escAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
