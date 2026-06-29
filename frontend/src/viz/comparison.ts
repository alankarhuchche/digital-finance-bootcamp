import type { ComparisonSpec } from '../types';
import { buildComparisonMarkdown, copyAndToast } from '../utils/share';

const EMPHASIS_COLORS = {
  positive: '#5FB3A3',
  negative: '#E0726B',
  neutral: '#9FB7CC',
};

export function renderComparison(container: HTMLElement, spec: ComparisonSpec, heading?: string): void {
  container.innerHTML = `
    <div class="comparison-grid" style="--comp-cols: ${spec.columns.length}">
      ${spec.columns.map(col => `
        <div class="comparison-col">
          <div class="comparison-col-header">
            <h4 class="comparison-col-title">${col.title}</h4>
            ${col.subtitle ? `<p class="comparison-col-subtitle">${col.subtitle}</p>` : ''}
          </div>
          <div class="comparison-col-body">
            ${col.points.map(pt => {
              const emphColor = pt.emphasis ? EMPHASIS_COLORS[pt.emphasis] : null;
              return `
                <div class="comparison-point${pt.emphasis ? ` comparison-point-${pt.emphasis}` : ''}">
                  <span class="comparison-point-label">${pt.label}</span>
                  <span class="comparison-point-value"${emphColor ? ` style="color: ${emphColor}"` : ''}>${pt.value}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `).join('')}
    </div>
    <button class="copy-inline-btn copy-inline-below" aria-label="Copy comparison">Copy comparison</button>
  `;

  container.querySelector<HTMLElement>('.copy-inline-btn')!.addEventListener('click', () => {
    copyAndToast(buildComparisonMarkdown(heading ?? '', spec.columns), 'comparison');
  });
}
