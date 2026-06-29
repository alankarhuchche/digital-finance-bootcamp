import type { CalloutSpec, CalloutTone } from '../types';

const TONE_COLORS: Record<CalloutTone, string> = {
  insight: '#E8A33D',
  warning: '#E0726B',
  strategy: '#5FB3A3',
  reality: '#9FB7CC',
};

export function renderCallout(container: HTMLElement, spec: CalloutSpec): void {
  const tone = spec.tone ?? 'insight';
  const color = TONE_COLORS[tone];

  container.innerHTML = `
    <div class="callout-block" style="--callout-color: ${color}">
      <div class="callout-body">${spec.body}</div>
    </div>
  `;
}
