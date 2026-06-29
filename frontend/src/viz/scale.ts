import type { ScaleSpec, ScaleItem } from '../types';
import { countUp, staggerEntrance } from '../animate';

export function renderScale(container: HTMLElement, spec: ScaleSpec): void {
  const maxVal = Math.max(...spec.items.map((i) => i.value));
  const maxSqrt = Math.sqrt(maxVal);

  container.innerHTML = `
    <div class="hint">Bars are sqrt-scaled so smaller figures stay visible — read the labels for actual values.</div>
    <div class="scale-list">
      ${spec.items.map((item) => renderBar(item, maxSqrt)).join('')}
    </div>
    ${spec.note ? `<div class="closing">${spec.note}</div>` : ''}
  `;

  // Animate bars from 0 width
  requestAnimationFrame(() => {
    container.querySelectorAll<HTMLElement>('.scale-fill').forEach((fill) => {
      const target = fill.getAttribute('data-target-width')!;
      fill.style.width = target;
    });
  });

  // Count-up on dollar values
  container.querySelectorAll<HTMLElement>('.scale-value').forEach((el) => {
    const target = Number(el.getAttribute('data-value'));
    if (!isNaN(target)) {
      countUp(el, target, 1000, formatValue);
    }
  });

  staggerEntrance(container, '.scale-row', 100);

  container.querySelectorAll<HTMLElement>('.scale-row').forEach((row) => {
    row.addEventListener('click', () => {
      const detail = row.querySelector<HTMLElement>('.scale-detail');
      if (!detail) return;
      const isOpen = detail.style.display === 'block';
      container.querySelectorAll<HTMLElement>('.scale-detail').forEach((d) => (d.style.display = 'none'));
      detail.style.display = isOpen ? 'none' : 'block';
    });
  });
}

function renderBar(item: ScaleItem, maxSqrt: number): string {
  const widthPct = Math.max(4, (Math.sqrt(item.value) / maxSqrt) * 100);
  return `
    <div class="scale-row anim-stagger" data-key="${item.key}">
      <div class="scale-label-row">
        <span class="scale-label">${item.label}</span>
        <span class="scale-value" data-value="${item.value}">$0</span>
      </div>
      <div class="scale-track">
        <div class="scale-fill" style="width:0%; background:${item.color};" data-target-width="${widthPct}%"></div>
      </div>
      ${item.detail ? `<div class="scale-detail">${item.detail}</div>` : ''}
    </div>
  `;
}

function formatValue(v: number): string {
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}T`;
  return `$${Math.round(v)}B`;
}
