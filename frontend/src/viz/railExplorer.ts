import { PAYMENT_RAILS, type PaymentRail, type RailType } from '../data/rails';
import { enhanceTerms, bindTermPopovers } from './termHelp';

const TYPE_COLORS: Record<RailType, string> = {
  'message': '#9FB7CC',
  'account': '#7AA7D9',
  'token': '#E8A33D',
  'asset-settlement': '#5FB3A3',
};

type ViewMode = 'executive' | 'practitioner';
type InteractionMode = 'inspect' | 'compare';

export function renderRailExplorer(container: HTMLElement): void {
  let viewMode: ViewMode = 'executive';
  let interactionMode: InteractionMode = 'inspect';
  let inspectId = 'cards';
  // compareSelection holds 0, 1, or 2 rail IDs. Index 0 = A, index 1 = B.
  let compareSelection: string[] = ['cards', 'stablecoins'];

  function toggleCompareRail(id: string): void {
    const idx = compareSelection.indexOf(id);
    if (idx !== -1) {
      // Deselect — remove and shift remaining to index 0 (keeps layout simple).
      compareSelection.splice(idx, 1);
    } else if (compareSelection.length < 2) {
      compareSelection.push(id);
    } else {
      // Both slots full — replace index 1 (most recently changed slot).
      compareSelection[1] = id;
    }
  }

  function removeCompareRail(id: string): void {
    const idx = compareSelection.indexOf(id);
    if (idx !== -1) compareSelection.splice(idx, 1);
  }

  function clearComparison(): void {
    compareSelection = [];
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'rail-explorer';
  container.appendChild(wrapper);

  function render() {
    wrapper.innerHTML = `
      <div class="rail-controls">
        <div class="rail-toggle-group" role="group" aria-label="Interaction mode">
          <button class="rail-toggle${interactionMode === 'inspect' ? ' rail-toggle-active' : ''}" data-mode="inspect" aria-pressed="${interactionMode === 'inspect'}">Inspect</button>
          <button class="rail-toggle${interactionMode === 'compare' ? ' rail-toggle-active' : ''}" data-mode="compare" aria-pressed="${interactionMode === 'compare'}">Compare</button>
        </div>
        <div class="rail-toggle-group" role="group" aria-label="View mode">
          <button class="rail-toggle${viewMode === 'executive' ? ' rail-toggle-active' : ''}" data-view="executive" aria-pressed="${viewMode === 'executive'}">Executive</button>
          <button class="rail-toggle${viewMode === 'practitioner' ? ' rail-toggle-active' : ''}" data-view="practitioner" aria-pressed="${viewMode === 'practitioner'}">Practitioner</button>
        </div>
      </div>
      <div class="rail-selector" role="tablist" aria-label="Payment rails"></div>
      <div class="rail-detail-area"></div>
      <div class="rail-callout">Fast does not always mean final. Digital does not always mean tokenised.</div>
    `;

    renderSelector();
    renderDetailArea();
    bindControls();
  }

  function renderSelector() {
    const selector = wrapper.querySelector<HTMLElement>('.rail-selector')!;
    selector.innerHTML = PAYMENT_RAILS.map(rail => {
      const color = TYPE_COLORS[rail.type];
      let pillClass = 'rail-pill';
      let label = '';

      if (interactionMode === 'inspect') {
        if (rail.id === inspectId) pillClass += ' rail-pill-selected';
      } else {
        const slotIdx = compareSelection.indexOf(rail.id);
        if (slotIdx === 0) { pillClass += ' rail-pill-compare-a'; label = 'A'; }
        else if (slotIdx === 1) { pillClass += ' rail-pill-compare-b'; label = 'B'; }
      }

      const isSelected = interactionMode === 'inspect'
        ? rail.id === inspectId
        : compareSelection.includes(rail.id);

      return `<button
        class="${pillClass}"
        data-id="${rail.id}"
        role="tab"
        aria-selected="${isSelected}"
        aria-pressed="${interactionMode === 'compare' ? isSelected : undefined}"
        style="--pill-color: ${color}"
      >${label ? `<span class="pill-badge">${label}</span>` : ''}${rail.name}</button>`;
    }).join('');
  }

  function renderDetailArea() {
    const area = wrapper.querySelector<HTMLElement>('.rail-detail-area')!;

    if (interactionMode === 'inspect') {
      const rail = PAYMENT_RAILS.find(r => r.id === inspectId);
      if (!rail) return;
      area.innerHTML = renderCard(rail);
    } else {
      const [idA, idB] = compareSelection;
      const railA = idA ? PAYMENT_RAILS.find(r => r.id === idA) : undefined;
      const railB = idB ? PAYMENT_RAILS.find(r => r.id === idB) : undefined;

      if (!railA && !railB) {
        area.innerHTML = `<p class="rail-compare-empty">Select two rails to compare.</p>`;
      } else if (railA && !railB) {
        area.innerHTML = `
          <div class="rail-compare-layout rail-compare-layout--single">
            <div class="rail-compare-col">
              <div class="rail-compare-header">
                <div class="rail-compare-label">A</div>
                <button class="rail-remove-btn" data-remove="${railA.id}" aria-label="Remove ${railA.name} from comparison">Remove</button>
              </div>
              ${renderCard(railA)}
            </div>
          </div>
          <p class="rail-compare-hint">Select another rail to compare with <strong>${railA.name}</strong>.</p>
          <button class="rail-reset" id="railReset">Clear comparison</button>
        `;
      } else if (railA && railB) {
        area.innerHTML = `
          <div class="rail-compare-layout">
            <div class="rail-compare-col">
              <div class="rail-compare-header">
                <div class="rail-compare-label">A</div>
                <button class="rail-remove-btn" data-remove="${railA.id}" aria-label="Remove ${railA.name} from comparison">Remove</button>
              </div>
              ${renderCard(railA, railB)}
            </div>
            <div class="rail-compare-col">
              <div class="rail-compare-header">
                <div class="rail-compare-label">B</div>
                <button class="rail-remove-btn" data-remove="${railB.id}" aria-label="Remove ${railB.name} from comparison">Remove</button>
              </div>
              ${renderCard(railB, railA)}
            </div>
          </div>
          <button class="rail-reset" id="railReset">Clear comparison</button>
        `;
      }
    }
    bindTermPopovers(area);
    bindRemoveButtons();
  }

  function bindRemoveButtons() {
    const area = wrapper.querySelector<HTMLElement>('.rail-detail-area')!;
    area.querySelectorAll<HTMLElement>('.rail-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.remove!;
        removeCompareRail(id);
        renderSelector();
        renderDetailArea();
      });
    });

    const resetBtn = area.querySelector<HTMLElement>('#railReset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        clearComparison();
        renderSelector();
        renderDetailArea();
      });
    }
  }

  function renderCard(rail: PaymentRail, otherRail?: PaymentRail): string {
    const color = TYPE_COLORS[rail.type];
    const comparing = !!otherRail;

    if (viewMode === 'executive') {
      return `
        <div class="rail-card" style="--rail-accent: ${color}">
          <div class="rail-card-header">
            <h3 class="rail-card-title">${rail.name}</h3>
            <span class="rail-type-badge" style="background: ${color}20; color: ${color}">${rail.typeLabel}</span>
          </div>
          <div class="rail-card-section">
            <span class="rail-card-label">Summary</span>
            <p class="rail-card-value">${rail.executiveSummary}</p>
          </div>
          ${renderField('What it improves', rail.whatItImproves, comparing && rail.whatItImproves !== otherRail!.whatItImproves)}
          ${renderField('What it does not solve', rail.whatItDoesNotSolve, comparing && rail.whatItDoesNotSolve !== otherRail!.whatItDoesNotSolve)}
          <div class="rail-card-grid">
            ${renderMetric('Customer speed', rail.customerSpeed, comparing && rail.customerSpeed !== otherRail!.customerSpeed)}
            ${renderMetric('Finality', rail.finalityType, comparing && rail.finalityType !== otherRail!.finalityType)}
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
        </div>
      `;
    }

    // Practitioner view
    const diffFields = comparing ? getDiffFields(rail, otherRail!) : new Set<string>();
    return `
      <div class="rail-card" style="--rail-accent: ${color}">
        <div class="rail-card-header">
          <h3 class="rail-card-title">${rail.name}</h3>
          <span class="rail-type-badge" style="background: ${color}20; color: ${color}">${rail.typeLabel}</span>
        </div>
        ${renderField('What moves', rail.whatMoves, diffFields.has('whatMoves'))}
        <div class="rail-card-section">
          <span class="rail-card-label">Participants</span>
          <p class="rail-card-value">${rail.participants.join(' · ')}</p>
        </div>
        <div class="rail-card-grid">
          ${renderMetric('Customer speed', rail.customerSpeed, diffFields.has('customerSpeed'))}
          ${renderMetric('Actual settlement', rail.actualSettlement, diffFields.has('actualSettlement'))}
          ${renderMetric('Finality', rail.finalityType, diffFields.has('finalityType'))}
          ${renderMetric('Reconciliation', rail.reconciliation, diffFields.has('reconciliation'))}
        </div>
        ${renderField('Finality detail', rail.finalityDetail)}
        ${renderField('Liquidity model', rail.liquidityModel, diffFields.has('liquidityModel'))}
        ${renderField('Practitioner detail', rail.practitionerDetail)}
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

  function renderField(label: string, value: string, isDiff = false): string {
    return `
      <div class="rail-card-section${isDiff ? ' rail-diff' : ''}">
        <span class="rail-card-label">${label}${isDiff ? ' <span class="rail-diff-tag">different</span>' : ''}</span>
        <p class="rail-card-value">${enhanceTerms(value)}</p>
      </div>
    `;
  }

  function renderMetric(label: string, value: string, isDiff = false): string {
    return `
      <div class="rail-card-cell${isDiff ? ' rail-diff' : ''}">
        <span class="rail-card-label">${label}${isDiff ? ' <span class="rail-diff-tag">diff</span>' : ''}</span>
        <span class="rail-card-metric">${value}</span>
      </div>
    `;
  }

  function getDiffFields(a: PaymentRail, b: PaymentRail): Set<string> {
    const fields: (keyof PaymentRail)[] = [
      'typeLabel', 'whatMoves', 'customerSpeed', 'actualSettlement',
      'finalityType', 'reconciliation', 'liquidityModel',
    ];
    const diffs = new Set<string>();
    for (const f of fields) {
      if (a[f] !== b[f]) diffs.add(f);
    }
    return diffs;
  }

  function bindControls() {
    // Interaction mode toggle
    wrapper.querySelectorAll<HTMLElement>('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        interactionMode = btn.dataset.mode as InteractionMode;
        render();
      });
    });

    // View mode toggle
    wrapper.querySelectorAll<HTMLElement>('[data-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        viewMode = btn.dataset.view as ViewMode;
        renderDetailArea();
      });
    });

    // Rail selector
    const selector = wrapper.querySelector<HTMLElement>('.rail-selector')!;
    selector.addEventListener('click', (e) => {
      const pill = (e.target as HTMLElement).closest<HTMLElement>('.rail-pill');
      if (!pill) return;
      const id = pill.dataset.id!;
      if (interactionMode === 'inspect') {
        if (id === inspectId) return;
        inspectId = id;
      } else {
        toggleCompareRail(id);
      }
      renderSelector();
      renderDetailArea();
    });

    selector.addEventListener('keydown', (e) => {
      const pills = Array.from(selector.querySelectorAll<HTMLElement>('.rail-pill'));
      const activeId = interactionMode === 'inspect' ? inspectId : (compareSelection[0] ?? '');
      const currentIdx = pills.findIndex(p => p.dataset.id === activeId);
      let nextIdx = -1;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIdx = (currentIdx + 1) % pills.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIdx = (currentIdx - 1 + pills.length) % pills.length;
      }

      if (nextIdx >= 0) {
        const id = pills[nextIdx].dataset.id!;
        if (interactionMode === 'inspect') {
          inspectId = id;
        } else {
          toggleCompareRail(id);
        }
        renderSelector();
        renderDetailArea();
        wrapper.querySelectorAll<HTMLElement>('.rail-pill')[nextIdx]?.focus();
      }
    });
  }

  render();
}
