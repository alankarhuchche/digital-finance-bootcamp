import { FINALITY_RAILS, STAGE_KEYS, type FinalityCategory } from '../data/finality';
import { enhanceTerms, bindTermPopovers } from './termHelp';

const CAT_COLORS: Record<FinalityCategory, string> = {
  'traditional': '#9FB7CC',
  'real-time': '#7AA7D9',
  'tokenised': '#E8A33D',
  'market-infrastructure': '#5FB3A3',
};

const CAT_LABELS: Record<FinalityCategory, string> = {
  'traditional': 'Traditional',
  'real-time': 'Real-time',
  'tokenised': 'Tokenised / digital',
  'market-infrastructure': 'Market infrastructure',
};

const CAT_ORDER: FinalityCategory[] = [
  'traditional', 'real-time', 'tokenised', 'market-infrastructure',
];

const STAGE_HELPERS: Record<string, string> = {
  customerExperience: 'What the customer or user sees.',
  technicalConfirmation: 'The system has confirmed the instruction.',
  legalFinality: 'The transfer is legally irreversible.',
  liquidityAvailability: 'Funds are available to the receiving party.',
  reconciliationComplete: 'Records and ledgers are matched.',
};

const CONFIDENCE_LABELS: Record<string, string> = {
  high: 'High confidence',
  medium: 'Indicative',
  variable: 'Varies',
};

export function renderFinalityVisualiser(container: HTMLElement): void {
  let selectedRailId = 'card';
  let selectedStageIdx = 0;

  const wrapper = document.createElement('div');
  wrapper.className = 'finality-vis';
  container.appendChild(wrapper);

  function render() {
    const rail = FINALITY_RAILS.find(r => r.id === selectedRailId)!;
    const stages = STAGE_KEYS.map(k => rail[k]);
    const selectedStage = stages[selectedStageIdx];
    const color = CAT_COLORS[rail.category];
    const isInstitutional = rail.customerExperience.relativeOrder === 0;

    wrapper.innerHTML = `
      <div class="finality-rail-groups" role="tablist" aria-label="Settlement rails">
        ${CAT_ORDER.map(cat => {
          const catRails = FINALITY_RAILS.filter(r => r.category === cat);
          const c = CAT_COLORS[cat];
          return `
            <div class="finality-rail-group">
              <span class="finality-group-label" style="color: ${c}">${CAT_LABELS[cat]}</span>
              <div class="finality-rail-selector">
                ${catRails.map(r => {
                  const sel = r.id === selectedRailId;
                  return `<button
                    class="finality-pill${sel ? ' finality-pill-selected' : ''}"
                    data-id="${r.id}"
                    role="tab"
                    aria-selected="${sel}"
                    aria-pressed="${sel}"
                    style="--pill-color: ${CAT_COLORS[r.category]}"
                  >${r.name}</button>`;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="finality-summary-card" style="--finality-accent: ${color}">
        <p class="finality-summary">${rail.summary}</p>
        <p class="finality-why-matters"><strong>Why it matters:</strong> ${rail.whyItMatters}</p>
      </div>

      <div class="finality-gap-indicator">
        <div class="finality-gap-col finality-gap-col--customer">
          <span class="finality-gap-col-label">Customer-visible moment</span>
          <span class="finality-gap-col-time">${isInstitutional ? 'Not customer-facing' : rail.customerExperience.timeLabel}</span>
        </div>
        <div class="finality-gap-middle">
          <span class="finality-gap-badge">${rail.gapLabel}</span>
        </div>
        <div class="finality-gap-col finality-gap-col--operational">
          <span class="finality-gap-col-label">Operational completion</span>
          <span class="finality-gap-col-time">${rail.reconciliationComplete.timeLabel}</span>
        </div>
      </div>

      <div class="finality-stages" role="tablist" aria-label="Settlement stages">
        ${stages.map((s, i) => `
          <button
            class="finality-stage-row${i === selectedStageIdx ? ' finality-stage-row--active' : ''}"
            data-idx="${i}"
            role="tab"
            aria-selected="${i === selectedStageIdx}"
            ${i === selectedStageIdx ? `style="--active-color: ${color}"` : ''}
          >
            <div class="finality-stage-info">
              <span class="finality-stage-name">${s.label}</span>
              <span class="finality-stage-helper">${STAGE_HELPERS[STAGE_KEYS[i]]}</span>
            </div>
            <div class="finality-stage-right">
              <span class="finality-stage-time" style="color: ${color}">${s.timeLabel}</span>
              <span class="finality-confidence finality-confidence-${s.confidence}">${CONFIDENCE_LABELS[s.confidence]}</span>
            </div>
          </button>
        `).join('')}
      </div>

      <div class="finality-detail" style="--finality-accent: ${color}">
        <div class="finality-detail-header">
          <h4 class="finality-detail-title">${selectedStage.label}</h4>
          <span class="finality-confidence finality-confidence-${selectedStage.confidence}">${CONFIDENCE_LABELS[selectedStage.confidence]}</span>
        </div>
        <p class="finality-detail-text">${enhanceTerms(selectedStage.explanation)}</p>
      </div>

      <p class="finality-assumption-note"><strong>Assumption:</strong> ${rail.assumptionNote}</p>

      <div class="finality-lesson">
        <span class="finality-meta-label">Key lesson</span>
        <p>${enhanceTerms(rail.keyLesson)}</p>
      </div>
    `;

    bindEvents();
    bindTermPopovers(wrapper);
  }

  function bindEvents() {
    wrapper.querySelectorAll<HTMLElement>('.finality-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        if (pill.dataset.id === selectedRailId) return;
        selectedRailId = pill.dataset.id!;
        selectedStageIdx = 0;
        render();
      });
    });

    wrapper.querySelectorAll<HTMLElement>('.finality-stage-row').forEach(row => {
      row.addEventListener('click', () => {
        selectedStageIdx = Number(row.dataset.idx);
        render();
      });
    });

    const allPills = Array.from(wrapper.querySelectorAll<HTMLElement>('.finality-pill'));
    allPills.forEach((pill, idx) => {
      pill.addEventListener('keydown', (e) => {
        let nextIdx = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); nextIdx = (idx + 1) % allPills.length; }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); nextIdx = (idx - 1 + allPills.length) % allPills.length; }
        if (nextIdx >= 0) {
          selectedRailId = allPills[nextIdx].dataset.id!;
          selectedStageIdx = 0;
          render();
          (wrapper.querySelectorAll<HTMLElement>('.finality-pill')[nextIdx])?.focus();
        }
      });
    });
  }

  render();
}
