import type { MatrixSpec } from '../types';
import { staggerEntrance } from '../animate';

export function renderMatrix(container: HTMLElement, spec: MatrixSpec): void {
  container.innerHTML = `
    <div class="matrix-scroll">
      <table class="matrix">
        <thead>
          <tr>
            <th class="matrix-corner"></th>
            ${spec.items.map((item) => `<th style="color:${item.color}">${item.label}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${spec.columns
            .map(
              (col, rowIdx) => `
            <tr class="matrix-row anim-stagger">
              <td class="matrix-rowlabel">${col}</td>
              ${spec.items.map((item) => `<td>${item.values[rowIdx] ?? '—'}</td>`).join('')}
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `;

  staggerEntrance(container, '.matrix-row', 100);

  container.querySelectorAll<HTMLElement>('.matrix-row').forEach((row) => {
    row.addEventListener('click', () => {
      container.querySelectorAll('.matrix-row').forEach((r) => r.classList.remove('matrix-row-active'));
      row.classList.add('matrix-row-active');
    });
  });
}
