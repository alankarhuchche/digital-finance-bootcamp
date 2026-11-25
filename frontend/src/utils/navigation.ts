const pageUrl = (): string => location.pathname + location.search;
let renderedPageUrl = pageUrl();

// Fragments move within the current page. A different path or query needs its own content.
export function writeHistory(url: string | URL, mode: 'push' | 'replace' = 'push'): void {
  if (mode === 'replace') history.replaceState(history.state, '', url);
  else history.pushState(null, '', url);
  renderedPageUrl = pageUrl();
}

export function pageChangedOnTraversal(): boolean {
  const next = pageUrl();
  const changed = next !== renderedPageUrl;
  renderedPageUrl = next;
  return changed;
}

export function focusSection(hash: string, behavior: ScrollBehavior = 'instant'): void {
  const section = document.getElementById(hash.slice(1));
  if (!section) return;
  section.scrollIntoView({ behavior, block: 'start' });
  section.focus({ preventScroll: true });
}
