import type { MatrixSpec } from '../types';

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
            <tr>
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
}
