import type { CalloutSpec, CalloutTone } from '../types';
import { buildCalloutText, copyAndToast } from '../utils/share';

const TONE_COLORS: Record<CalloutTone, string> = {
  insight: '#E8A33D',
  warning: '#E0726B',
  strategy: '#5FB3A3',
  reality: '#9FB7CC',
};

export function renderCallout(container: HTMLElement, spec: CalloutSpec, topicUrl?: string): void {
  const tone = spec.tone ?? 'insight';
  const color = TONE_COLORS[tone];

  container.innerHTML = `
    <div class="callout-block" style="--callout-color: ${color}">
      <div class="callout-body">${spec.body}</div>
      <button class="copy-inline-btn" aria-label="Copy insight">Copy insight</button>
    </div>
  `;

  container.querySelector<HTMLElement>('.copy-inline-btn')!.addEventListener('click', () => {
    copyAndToast(buildCalloutText(spec.body, topicUrl), 'insight');
  });
}
