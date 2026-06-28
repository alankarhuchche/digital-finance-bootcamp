import type { FlowSpec } from '../types';

export function renderFlow(container: HTMLElement, spec: FlowSpec): void {
  container.innerHTML = `
    <svg class="flow" viewBox="${spec.viewBox}">
      ${spec.boxes.map(renderBox).join('')}
      ${spec.paths.map(renderPath).join('')}
      ${spec.paths
        .filter((p) => p.animated)
        .map(
          (p) => `
        <circle r="4" fill="${p.dotColor ?? '#E8A33D'}">
          <animateMotion dur="${p.dotDur ?? '3.5s'}" repeatCount="indefinite" path="${p.d}"/>
        </circle>
      `
        )
        .join('')}
    </svg>
    ${spec.caption ? `<div class="closing">${spec.caption}</div>` : ''}
  `;
}

function renderBox(b: FlowSpec['boxes'][number]): string {
  return `
    <rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="4" class="flow-box-bg"/>
    <text x="${b.x + b.w / 2}" y="${b.y + 18}" text-anchor="middle" class="flow-text" font-size="9">${b.caption}</text>
    <text x="${b.x + b.w / 2}" y="${b.y + 36}" text-anchor="middle" class="flow-text-big" font-size="14" fill="${b.valueColor ?? '#E8A33D'}">${b.value}</text>
  `;
}

function renderPath(p: FlowSpec['paths'][number]): string {
  return `<path class="pathline" d="${p.d}"/>`;
}
