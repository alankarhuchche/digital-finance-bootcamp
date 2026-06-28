import type { ScatterSpec, ScatterPoint } from '../types';

export function renderScatter(container: HTMLElement, spec: ScatterSpec): void {
  container.innerHTML = `
    <div class="hint">Tap a dot to compare.</div>
    <div class="quad-wrap">
      ${spec.axisY ? `<span class="axis-label-y">${spec.axisY}</span>` : ''}
      <svg class="quad" viewBox="0 0 300 300">
        <line x1="150" y1="10" x2="150" y2="290" stroke="#244a6e" stroke-width="1"/>
        <line x1="10" y1="150" x2="290" y2="150" stroke="#244a6e" stroke-width="1"/>
        <rect x="10" y="10" width="280" height="280" fill="none" stroke="#244a6e" stroke-width="1"/>
        ${spec.points.map(renderDot).join('')}
      </svg>
      <div class="axis-label-x">${spec.axisX}</div>
    </div>
    <div class="money-detail" id="scatterDetail">
      <div class="placeholder">Tap a dot above for the full breakdown.</div>
    </div>
  `;

  const detailEl = container.querySelector<HTMLElement>('#scatterDetail')!;

  container.querySelectorAll<SVGGElement>('.dotgroup').forEach((g) => {
    g.addEventListener('click', () => {
      const key = g.getAttribute('data-key');
      const point = spec.points.find((p) => p.key === key);
      if (!point) return;

      detailEl.innerHTML = `
        <span class="tag" style="color:${point.color}">${point.detail.tag}</span>
        <h3>${point.detail.title}</h3>
        <div class="money-grid">
          ${point.detail.fields
            .map((f) => `<div class="field"><div class="k">${f.k}</div><div class="v">${f.v}</div></div>`)
            .join('')}
        </div>
      `;

      container.querySelectorAll('.dot').forEach((c) => c.setAttribute('r', '9'));
      g.querySelector('.dot')!.setAttribute('r', '12');
    });
  });
}

function renderDot(p: ScatterPoint): string {
  // map 0-100 data space to the 10-290 plot area
  const cx = 10 + (p.x / 100) * 280;
  const cy = 10 + ((100 - p.y) / 100) * 280; // invert so higher y = visually higher
  return `
    <g class="dotgroup" data-key="${p.key}">
      <circle class="dot" cx="${cx}" cy="${cy}" r="9" fill="${p.color}"/>
      <text x="${cx}" y="${cy + 18}" text-anchor="middle" class="dot-label">${p.label}</text>
    </g>
  `;
}
