import type { TimelineSpec, TimelineEvent } from '../types';

export function renderTimeline(container: HTMLElement, spec: TimelineSpec): void {
  container.innerHTML = `
    <div class="timeline">
      ${spec.events.map(renderEvent).join('')}
    </div>
  `;
}

function renderEvent(e: TimelineEvent): string {
  const statusClass = e.status ? `tl-${e.status}` : '';
  return `
    <div class="tl-row ${statusClass}">
      <div class="tl-marker"></div>
      <div class="tl-content">
        <span class="tl-date">${e.date}</span>
        <h4 class="tl-title">${e.title}</h4>
        <p class="tl-detail">${e.detail}</p>
      </div>
    </div>
  `;
}
