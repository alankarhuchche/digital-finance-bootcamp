import type { ComparisonColumn } from '../types';
import type { RouteId } from '../content/stablecoins/journey';
import { showToast } from './toast';

export const PAYMENT_SCENE = 'payment-journey';

export function paymentJourneyPath(view: RouteId | 'compare', scenario?: string): string {
  const query = new URLSearchParams({ view });
  if (scenario) query.set('scenario', scenario);
  return `/topic/stablecoins?${query}#${PAYMENT_SCENE}`;
}

export function isPlainClick(event: MouseEvent): boolean {
  return !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers / insecure contexts
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { /* silent */ }
    document.body.removeChild(ta);
    return ok;
  }
}

export function buildTopicLink(topicId: string): string {
  return `${location.origin}/topic/${topicId}`;
}

export function buildTopicSummaryText(title: string, summary: string, url: string): string {
  return `${title}\n\n${summary}\n\n${url}`;
}

export function buildCalloutText(calloutBody: string, url?: string): string {
  const clean = stripHtml(calloutBody);
  return url ? `${clean}\n\n${url}` : clean;
}

export function buildComparisonMarkdown(heading: string, columns: ComparisonColumn[]): string {
  let md = heading ? `## ${heading}\n\n` : '';
  for (const col of columns) {
    md += `### ${col.title}`;
    if (col.subtitle) md += ` — ${col.subtitle}`;
    md += '\n';
    for (const pt of col.points) {
      md += `- **${pt.label}:** ${pt.value}\n`;
    }
    md += '\n';
  }
  return md.trim();
}

export function buildLinkedInSnippet(title: string, summary: string, url: string): string {
  return `${title}

${summary}

This matters because payments today digitised the instruction but not the money, the settlement or the control layer. Digital finance is changing that.

Read more: ${url}`;
}

export async function copyAndToast(text: string, label: string): Promise<void> {
  const ok = await copyToClipboard(text);
  showToast(ok ? `Copied ${label}` : `Failed to copy`);
}

function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent ?? '';
}
