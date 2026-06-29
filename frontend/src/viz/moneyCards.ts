import { staggerEntrance } from '../animate';

export interface MoneyCardData {
  key: string;
  label: string;
  color: string;
  riskLevel: number;
  riskLabel: string;
  riskColor: string;
  fields: { k: string; v: string }[];
  detail: string;
}

export interface MoneyCardsSpec {
  cards: MoneyCardData[];
}

export function renderMoneyCards(container: HTMLElement, spec: MoneyCardsSpec): void {
  container.innerHTML = `
    <div class="money-cards">
      ${spec.cards.map(renderCard).join('')}
    </div>
  `;

  // Animate risk bars
  requestAnimationFrame(() => {
    container.querySelectorAll<HTMLElement>('.money-risk-fill').forEach(fill => {
      fill.style.width = fill.dataset.targetWidth!;
    });
  });

  // Tap to expand
  container.querySelectorAll<HTMLElement>('.money-card').forEach(card => {
    card.addEventListener('click', () => {
      const wasActive = card.classList.contains('money-card-active');
      container.querySelectorAll('.money-card').forEach(c => c.classList.remove('money-card-active'));
      if (!wasActive) card.classList.add('money-card-active');
    });
  });

  staggerEntrance(container, '.money-card', 80);
}

function renderCard(card: MoneyCardData): string {
  return `
    <div class="money-card anim-stagger" style="border-left-color:${card.color};" data-key="${card.key}">
      <p class="money-card-label">${card.label}</p>
      ${card.fields.map(f => `
        <div class="money-card-row">
          <span>${f.k}</span>
          <span class="mcv">${f.v}</span>
        </div>
      `).join('')}
      <div class="money-risk-bar">
        <div class="money-risk-fill" style="width:0%;background:${card.riskColor};" data-target-width="${card.riskLevel}%"></div>
      </div>
      <span class="money-risk-tag" style="background:${card.riskColor}20;color:${card.riskColor};">${card.riskLabel}</span>
      <div class="money-card-detail">
        <div class="money-card-detail-inner">
          <p style="font-size:13px;color:#9FB7CC;line-height:1.6;margin:0;">${card.detail}</p>
        </div>
      </div>
    </div>
  `;
}
