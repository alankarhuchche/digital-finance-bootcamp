import type { StackLayer } from '../types';
import { staggerEntrance } from '../animate';

export function renderStack(container: HTMLElement, layers: StackLayer[], note?: string): void {
  container.innerHTML = `
    <div class="hint">Tap a slab to open it.</div>
    <div class="stack">
      ${layers.map(renderSlab).join('')}
    </div>
    ${note ? `<div class="stack-note">${note}</div>` : ''}
  `;

  container.querySelectorAll<HTMLElement>('.slab').forEach((slab) => {
    slab.addEventListener('click', () => {
      const wasOpen = slab.classList.contains('open');
      container.querySelectorAll('.slab').forEach((s) => s.classList.remove('open'));
      if (!wasOpen) {
        slab.classList.add('open');
        const detail = slab.querySelector<HTMLElement>('.detail-inner');
        if (detail) {
          slab.style.setProperty('--detail-h', `${detail.scrollHeight}px`);
        }
      }
    });
  });

  staggerEntrance(container, '.slab', 100);

  // Pulse hint on first slab after entrance
  setTimeout(() => {
    const first = container.querySelector<HTMLElement>('.slab');
    if (first) {
      first.classList.add('slab-pulse');
      setTimeout(() => first.classList.remove('slab-pulse'), 1500);
    }
  }, 600);
}

function renderSlab(layer: StackLayer): string {
  return `
    <div class="slab ${layer.colorClass} anim-stagger" data-id="${layer.id}">
      <div class="toprow">
        <span class="num">${layer.number}</span>
        <span class="label">${layer.label}</span>
        <span class="chev">▸</span>
      </div>
      <div class="detail">
        <div class="detail-inner">
          ${layer.detail}
          ${layer.examples ? `<span class="ex">${layer.examples}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}
