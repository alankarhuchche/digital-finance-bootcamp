import type { FlowSpec } from '../types';

export function renderFlow(container: HTMLElement, spec: FlowSpec): void {
  // Compute a tight viewBox height from actual box positions so the SVG
  // doesn't leave a blank vertical gap below the last element.
  const [vbX, vbY, vbW] = spec.viewBox.split(' ').map(Number);
  const contentBottom = Math.max(...spec.boxes.map(b => b.y + b.h));
  const tightViewBox = `${vbX} ${vbY} ${vbW} ${contentBottom + 16}`;

  container.innerHTML = `
    <svg class="flow" viewBox="${tightViewBox}">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      ${spec.boxes.map(renderBox).join('')}
      ${spec.paths.map(renderPath).join('')}
      ${spec.paths
        .filter((p) => p.animated)
        .map(
          (p) => `
        <circle r="4" fill="${p.dotColor ?? '#E8A33D'}" filter="url(#glow)">
          <animateMotion dur="${p.dotDur ?? '3.5s'}" repeatCount="indefinite" path="${p.d}"/>
        </circle>
      `
        )
        .join('')}
    </svg>
    ${spec.caption ? `<div class="closing">${spec.caption}</div>` : ''}
  `;

  // Make boxes tappable
  container.querySelectorAll<SVGRectElement>('.flow-box-bg').forEach((rect) => {
    const g = rect.parentElement;
    if (!g) return;
    const detail = g.getAttribute('data-detail');
    if (!detail) return;

    rect.style.cursor = 'pointer';
    rect.addEventListener('click', () => {
      let tooltip = container.querySelector<HTMLElement>('.flow-tooltip');
      if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'flow-tooltip';
        container.appendChild(tooltip);
      }
      tooltip.textContent = detail;
      tooltip.classList.add('flow-tooltip-visible');
      setTimeout(() => tooltip!.classList.remove('flow-tooltip-visible'), 3000);
    });
  });
}

function renderBox(b: FlowSpec['boxes'][number]): string {
  return `
    <g ${b.detail ? `data-detail="${b.detail}"` : ''}>
      <rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="4" class="flow-box-bg">
        <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
      </rect>
      <text x="${b.x + b.w / 2}" y="${b.y + 18}" text-anchor="middle" class="flow-text" font-size="9">${b.caption}</text>
      <text x="${b.x + b.w / 2}" y="${b.y + 36}" text-anchor="middle" class="flow-text-big" font-size="14" fill="${b.valueColor ?? '#E8A33D'}">${b.value}</text>
    </g>
  `;
}

function renderPath(p: FlowSpec['paths'][number]): string {
  return `<path class="pathline" d="${p.d}"/>`;
}
