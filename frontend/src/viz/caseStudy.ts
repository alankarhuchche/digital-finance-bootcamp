import type { CaseStudySpec } from '../types';
import { observeEntrance } from '../animate';

export function renderCaseStudy(container: HTMLElement, spec: CaseStudySpec): void {
  container.innerHTML = `
    <div class="case-card anim-stagger">
      <div class="case-header">
        <h3>${spec.title}</h3>
        <span class="case-date">${spec.dateRange}</span>
      </div>
      <div class="case-section case-expandable" data-section="what">
        <span class="tag">What happened <span class="case-toggle">▸</span></span>
        <div class="case-body">
          <p>${spec.whatHappened}</p>
        </div>
      </div>
      <div class="case-section case-expandable" data-section="why">
        <span class="tag">Why it matters <span class="case-toggle">▸</span></span>
        <div class="case-body">
          <p>${spec.whyItMatters}</p>
        </div>
      </div>
      <div class="case-footer">
        <span class="case-source">
          Source: ${spec.sourceUrl ? `<a href="${spec.sourceUrl}" target="_blank" rel="noopener">${spec.source}</a>` : spec.source}
        </span>
        <span class="case-verified">Verified as of ${spec.verifiedAsOf}</span>
      </div>
    </div>
  `;

  // Expandable sections
  container.querySelectorAll<HTMLElement>('.case-expandable').forEach((section) => {
    const tag = section.querySelector<HTMLElement>('.tag')!;
    const body = section.querySelector<HTMLElement>('.case-body')!;
    const toggle = section.querySelector<HTMLElement>('.case-toggle')!;

    tag.style.cursor = 'pointer';
    tag.addEventListener('click', () => {
      const isOpen = section.classList.contains('case-open');
      container.querySelectorAll('.case-expandable').forEach((s) => s.classList.remove('case-open'));
      if (!isOpen) {
        section.classList.add('case-open');
        body.style.maxHeight = `${body.scrollHeight}px`;
        toggle.textContent = '▾';
      } else {
        body.style.maxHeight = '0';
        toggle.textContent = '▸';
      }
    });

    // Start open by default for first section
    if (section.getAttribute('data-section') === 'what') {
      section.classList.add('case-open');
      requestAnimationFrame(() => {
        body.style.maxHeight = `${body.scrollHeight}px`;
        toggle.textContent = '▾';
      });
    }
  });

  observeEntrance(container, '.case-card');
}
