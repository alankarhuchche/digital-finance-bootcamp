import type { TimelineSpec, TimelineEvent } from '../types';
import { staggerEntrance } from '../animate';

export function renderTimeline(container: HTMLElement, spec: TimelineSpec): void {
  container.innerHTML = `
    <div class="timeline">
      <div class="tl-line-animated"></div>
      ${spec.events.map(renderEvent).join('')}
    </div>
  `;

  staggerEntrance(container, '.tl-row', 120);

  // Animate the connecting line
  const line = container.querySelector<HTMLElement>('.tl-line-animated');
  if (line) {
    requestAnimationFrame(() => line.classList.add('tl-line-grown'));
  }
}

function renderEvent(e: TimelineEvent): string {
  const statusClass = e.status ? `tl-${e.status}` : '';
  return `
    <div class="tl-row ${statusClass} anim-stagger">
      <div class="tl-marker"></div>
      <div class="tl-content">
        <span class="tl-date">${e.date}</span>
        <h4 class="tl-title">${e.title}</h4>
        <p class="tl-detail">${e.detail}</p>
      </div>
    </div>
  `;
}
