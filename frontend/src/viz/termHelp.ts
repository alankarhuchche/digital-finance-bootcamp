import { TERM_DEFINITIONS } from '../content/termDefinitions';

// Sorted longest-alias-first so longer matches win over shorter overlapping ones.
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

/**
 * Wraps the first occurrence of each known term alias in a .term-help span.
 *
 * Safe design: splits the input into text segments and HTML-tag segments,
 * then finds all matches in the *original* text segments using range tracking.
 * Generated HTML is never re-scanned, so a term's definition text cannot
 * accidentally match another term inside an injected attribute value.
 */
export function enhanceTerms(rawInput: string): string {
  // Split into alternating [text, <tag>, text, <tag>, ...] segments.
  // HTML tags are passed through verbatim; only text segments are processed.
  const TAG_RE = /(<[^>]+>)/g;
  const segments = rawInput.split(TAG_RE);

  // One enhancement per term across the whole call (consistent with previous behaviour).
  const seenTerms = new Set<string>();

  const processed = segments.map(seg => {
    if (seg === '') return seg;
    if (seg.startsWith('<')) return seg; // HTML tag — pass through unchanged

    // Find all non-overlapping term matches within this text segment.
    // Positions refer to the original segment, not any generated HTML.
    type Match = {
      start: number;
      end: number;
      matchText: string;
      def: (typeof sortedDefs)[0]['def'];
    };
    const matches: Match[] = [];

    for (const { alias, def } of sortedDefs) {
      if (seenTerms.has(def.term)) continue;

      const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`(?<![\\w/\\-])${escapedAlias}(?![\\w/\\-"<])`, 'g');

      let m: RegExpExecArray | null;
      while ((m = re.exec(seg)) !== null) {
        const start = m.index;
        const end = start + m[0].length;
        // Only record if this range does not overlap an already-claimed match.
        if (!matches.some(e => start < e.end && end > e.start)) {
          matches.push({ start, end, matchText: m[0], def });
          seenTerms.add(def.term);
          break; // first occurrence only — move on to the next term
        }
      }
    }

    if (matches.length === 0) return seg; // no matches — pass through unchanged

    // Build the output from sorted ranges in a single pass.
    // Text between matches is copied verbatim from the original segment;
    // it is never fed back through term matching.
    matches.sort((a, b) => a.start - b.start);
    const parts: string[] = [];
    let pos = 0;

    for (const { start, end, matchText, def } of matches) {
      if (start > pos) parts.push(seg.slice(pos, start));

      const fullFormAttr = def.fullForm ? ` data-full="${escAttr(def.fullForm)}"` : '';
      const glossaryAttr = def.glossaryId ? ` data-glossary="${escAttr(def.glossaryId)}"` : '';

      parts.push(
        `<span class="term-help" tabindex="0" role="button"` +
        ` aria-label="${escAttr(matchText)}: ${escAttr(def.simple.substring(0, 80))}"` +
        ` data-term="${escAttr(def.term)}"${fullFormAttr}${glossaryAttr}` +
        ` data-simple="${escAttr(def.simple)}">${matchText}</span>`
      );
      pos = end;
    }

    if (pos < seg.length) parts.push(seg.slice(pos));
    return parts.join('');
  });

  return processed.join('');
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
