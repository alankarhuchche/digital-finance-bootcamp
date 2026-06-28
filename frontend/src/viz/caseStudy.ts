import type { CaseStudySpec } from '../types';

export function renderCaseStudy(container: HTMLElement, spec: CaseStudySpec): void {
  container.innerHTML = `
    <div class="case-card">
      <div class="case-header">
        <h3>${spec.title}</h3>
        <span class="case-date">${spec.dateRange}</span>
      </div>
      <div class="case-section">
        <span class="tag">What happened</span>
        <p>${spec.whatHappened}</p>
      </div>
      <div class="case-section">
        <span class="tag">Why it matters</span>
        <p>${spec.whyItMatters}</p>
      </div>
      <div class="case-footer">
        <span class="case-source">
          Source: ${spec.sourceUrl ? `<a href="${spec.sourceUrl}" target="_blank" rel="noopener">${spec.source}</a>` : spec.source}
        </span>
        <span class="case-verified">Verified as of ${spec.verifiedAsOf}</span>
      </div>
    </div>
  `;
}
