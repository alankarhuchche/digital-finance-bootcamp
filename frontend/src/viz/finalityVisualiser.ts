import { FINALITY_RAILS, STAGE_KEYS, type FinalityCategory } from '../data/finality';

const CAT_COLORS: Record<FinalityCategory, string> = {
  'traditional': '#9FB7CC',
  'real-time': '#7AA7D9',
  'tokenised': '#E8A33D',
  'market-infrastructure': '#5FB3A3',
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

    wrapper.innerHTML = `
      <div class="finality-rail-selector" role="tablist" aria-label="Settlement rails">
        ${FINALITY_RAILS.map(r => {
          const c = CAT_COLORS[r.category];
          const sel = r.id === selectedRailId;
          return `<button class="finality-pill${sel ? ' finality-pill-selected' : ''}" data-id="${r.id}" role="tab" aria-selected="${sel}" style="--pill-color: ${c}">${r.name}</button>`;
        }).join('')}
      </div>

      <p class="finality-summary">${rail.summary}</p>

      <div class="finality-track">
        <div class="finality-track-line"></div>
        ${stages.map((s, i) => `
          <button class="finality-marker${i === selectedStageIdx ? ' finality-marker-active' : ''}" style="left: ${s.relativeOrder}%" data-idx="${i}" role="tab" aria-selected="${i === selectedStageIdx}" aria-label="${s.label}: ${s.timeLabel}">
            <span class="finality-marker-dot" style="background: ${color}"></span>
            <span class="finality-marker-label">${s.label}</span>
            <span class="finality-marker-time">${s.timeLabel}</span>
          </button>
        `).join('')}
      </div>

      <div class="finality-detail" style="--finality-accent: ${color}">
        <div class="finality-detail-header">
          <h4 class="finality-detail-title">${selectedStage.label}</h4>
          <span class="finality-confidence finality-confidence-${selectedStage.confidence}">${CONFIDENCE_LABELS[selectedStage.confidence]}</span>
        </div>
        <p class="finality-detail-text">${selectedStage.explanation}</p>
      </div>

      <div class="finality-meta">
        <div class="finality-assumption">
          <span class="finality-meta-label">Assumption</span>
          <p>${rail.assumptionNote}</p>
        </div>
        <div class="finality-lesson">
          <span class="finality-meta-label">Key lesson</span>
          <p>${rail.keyLesson}</p>
        </div>
      </div>
    `;

    bindEvents();
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

    wrapper.querySelector<HTMLElement>('.finality-rail-selector')!.addEventListener('keydown', (e) => {
      const pills = Array.from(wrapper.querySelectorAll<HTMLElement>('.finality-pill'));
      const curIdx = pills.findIndex(p => p.dataset.id === selectedRailId);
      let nextIdx = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); nextIdx = (curIdx + 1) % pills.length; }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); nextIdx = (curIdx - 1 + pills.length) % pills.length; }
      if (nextIdx >= 0) {
        selectedRailId = pills[nextIdx].dataset.id!;
        selectedStageIdx = 0;
        render();
        wrapper.querySelectorAll<HTMLElement>('.finality-pill')[nextIdx]?.focus();
      }
    });

    wrapper.querySelectorAll<HTMLElement>('.finality-marker').forEach(marker => {
      marker.addEventListener('click', () => {
        selectedStageIdx = Number(marker.dataset.idx);
        render();
      });
    });
  }

  render();
}
