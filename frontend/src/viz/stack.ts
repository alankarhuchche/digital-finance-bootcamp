import type { StackLayer } from '../types';

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
      if (!wasOpen) slab.classList.add('open');
    });
  });
}

function renderSlab(layer: StackLayer): string {
  return `
    <div class="slab ${layer.colorClass}" data-id="${layer.id}">
      <div class="toprow">
        <span class="num">${layer.number}</span>
        <span class="label">${layer.label}</span>
        <span class="chev">▸</span>
      </div>
      <div class="detail">
        ${layer.detail}
        ${layer.examples ? `<span class="ex">${layer.examples}</span>` : ''}
      </div>
    </div>
  `;
}
