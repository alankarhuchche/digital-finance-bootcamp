import { PAYMENT_RAILS, type RailType } from '../data/rails';

const TYPE_COLORS: Record<RailType, string> = {
  'message': '#9FB7CC',
  'account': '#7AA7D9',
  'token': '#E8A33D',
  'asset-settlement': '#5FB3A3',
};

export function renderRailExplorer(container: HTMLElement): void {
  let selectedId = 'cards';

  const wrapper = document.createElement('div');
  wrapper.className = 'rail-explorer';
  wrapper.innerHTML = `
    <div class="rail-selector" role="tablist" aria-label="Payment rails"></div>
    <div class="rail-detail" role="tabpanel" id="railDetail"></div>
    <div class="rail-callout">Fast does not always mean final. Digital does not always mean tokenised.</div>
  `;
  container.appendChild(wrapper);

  const selector = wrapper.querySelector<HTMLElement>('.rail-selector')!;
  const detail = wrapper.querySelector<HTMLElement>('#railDetail')!;

  function renderSelector() {
    selector.innerHTML = PAYMENT_RAILS.map(rail => {
      const color = TYPE_COLORS[rail.type];
      const selected = rail.id === selectedId;
      return `<button
        class="rail-pill${selected ? ' rail-pill-selected' : ''}"
        data-id="${rail.id}"
        role="tab"
        aria-selected="${selected}"
        aria-controls="railDetail"
        style="--pill-color: ${color}"
      >${rail.name}</button>`;
    }).join('');
  }

  function renderDetail() {
    const rail = PAYMENT_RAILS.find(r => r.id === selectedId);
    if (!rail) return;
    const color = TYPE_COLORS[rail.type];

    detail.innerHTML = `
      <div class="rail-card" style="--rail-accent: ${color}">
        <div class="rail-card-header">
          <h3 class="rail-card-title">${rail.name}</h3>
          <span class="rail-type-badge" style="background: ${color}20; color: ${color}">${rail.typeLabel}</span>
        </div>

        <div class="rail-card-section">
          <span class="rail-card-label">What moves</span>
          <p class="rail-card-value">${rail.whatMoves}</p>
        </div>

        <div class="rail-card-section">
          <span class="rail-card-label">Participants</span>
          <p class="rail-card-value">${rail.participants.join(' · ')}</p>
        </div>

        <div class="rail-card-grid">
          <div class="rail-card-cell">
            <span class="rail-card-label">Customer speed</span>
            <span class="rail-card-metric">${rail.customerSpeed}</span>
          </div>
          <div class="rail-card-cell">
            <span class="rail-card-label">Actual settlement</span>
            <span class="rail-card-metric">${rail.actualSettlement}</span>
          </div>
          <div class="rail-card-cell">
            <span class="rail-card-label">Finality</span>
            <span class="rail-card-metric">${rail.finalityType}</span>
          </div>
          <div class="rail-card-cell">
            <span class="rail-card-label">Reconciliation</span>
            <span class="rail-card-metric">${rail.reconciliation}</span>
          </div>
        </div>

        <div class="rail-card-section">
          <span class="rail-card-label">Liquidity model</span>
          <p class="rail-card-value">${rail.liquidityModel}</p>
        </div>

        <div class="rail-card-row">
          <div class="rail-card-section rail-card-half">
            <span class="rail-card-label">Key risks</span>
            <div class="rail-chips">${rail.keyRisks.map(r => `<span class="rail-chip rail-chip-risk">${r}</span>`).join('')}</div>
          </div>
          <div class="rail-card-section rail-card-half">
            <span class="rail-card-label">Best use cases</span>
            <div class="rail-chips">${rail.bestUseCases.map(u => `<span class="rail-chip rail-chip-use">${u}</span>`).join('')}</div>
          </div>
        </div>

        <div class="rail-card-row">
          <div class="rail-card-section rail-card-half">
            <span class="rail-card-label">Banking reality</span>
            <p class="rail-card-value rail-card-perspective">${rail.bankingReality}</p>
          </div>
          <div class="rail-card-section rail-card-half">
            <span class="rail-card-label">Digital finance relevance</span>
            <p class="rail-card-value rail-card-perspective">${rail.digitalFinanceRelevance}</p>
          </div>
        </div>
      </div>
    `;
  }

  renderSelector();
  renderDetail();

  selector.addEventListener('click', (e) => {
    const pill = (e.target as HTMLElement).closest<HTMLElement>('.rail-pill');
    if (!pill || pill.dataset.id === selectedId) return;
    selectedId = pill.dataset.id!;
    renderSelector();
    renderDetail();
  });

  selector.addEventListener('keydown', (e) => {
    const pills = Array.from(selector.querySelectorAll<HTMLElement>('.rail-pill'));
    const currentIdx = pills.findIndex(p => p.dataset.id === selectedId);
    let nextIdx = -1;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIdx = (currentIdx + 1) % pills.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIdx = (currentIdx - 1 + pills.length) % pills.length;
    }

    if (nextIdx >= 0) {
      selectedId = pills[nextIdx].dataset.id!;
      renderSelector();
      renderDetail();
      pills[nextIdx].focus();
    }
  });
}
