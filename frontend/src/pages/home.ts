import { MODULE_INDEX, CATEGORIES } from '../content/registry';
import { isComplete } from '../progress';
import { staggerEntrance } from '../animate';
import { renderRailExplorer } from '../viz/railExplorer';

export function renderHomePage(
  app: HTMLElement,
  navigate: (path: string) => void,
  onRendered: () => void
): void {
  document.title = 'Banking Rails to Digital Finance';

  app.innerHTML = `
    <div class="landing-header">
      <span class="eyebrow">Banking Rails to Digital Finance</span>
      <h1>Today's payments digitised the instruction.</h1>
      <p class="landing-headline">Digital finance digitises the instrument, the rules, the settlement and the audit trail.</p>
    </div>

    <div class="hero-contrast">
      <div class="hero-card">
        <div class="hero-card-label">What the customer sees</div>
        <div class="hero-card-body hero-card-customer">
          <span class="hero-keyword">Tap. Approved. Paid.</span>
        </div>
      </div>
      <div class="hero-card">
        <div class="hero-card-label">What the banking system does underneath</div>
        <div class="hero-card-body hero-card-system">
          <span class="hero-detail">Authorisation, scheme messaging, ledger updates, clearing, settlement, interchange, reconciliation, fraud controls.</span>
        </div>
      </div>
      <div class="hero-card">
        <div class="hero-card-label">What digital finance changes</div>
        <div class="hero-card-body hero-card-digital">
          <span class="hero-detail">Tokenised money, programmable rules, shared ledgers, atomic settlement, richer audit trails, new control models.</span>
        </div>
      </div>
    </div>

    <p class="landing-context">Modern payments are already electronic. But most still separate the customer instruction from the underlying movement of money, the settlement asset, the risk checks and the reconciliation process. This reference explains what changes when money, assets, rules and settlement become more programmable and interoperable — and what still has to work for banks to trust it.</p>

    <section class="rail-explorer-section">
      <h2 class="section-heading">Explore the rails</h2>
      <p class="section-intro">Select a rail to see what moves, when settlement happens, where reconciliation remains, and why digital finance alternatives matter.</p>
      <div id="railExplorerMount"></div>
    </section>

    <p class="landing-start">Start with <strong>Payments fundamentals</strong> if you're new, or jump to any topic. Topics build on each other in the order shown, but each one stands on its own.</p>

    <div id="topicIndex">
      ${renderCategoryIndex()}
    </div>
  `;

  const explorerMount = app.querySelector<HTMLElement>('#railExplorerMount');
  if (explorerMount) renderRailExplorer(explorerMount);

  bindTopicCards(app, navigate);
  staggerEntrance(app, '.topic-card', 30);
  onRendered();
}

function renderCategoryIndex(): string {
  return CATEGORIES.map(cat => {
    const topics = cat.ids
      .map(id => MODULE_INDEX.find(x => x.id === id))
      .filter((m): m is (typeof MODULE_INDEX)[number] => !!m);

    if (topics.length === 0) return '';

    return `
      <div class="category-section" data-cat="${cat.label}">
        <div class="category-label">${cat.label}</div>
        <div class="topic-grid">
          ${topics.map(renderTopicCard).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderTopicCard(m: (typeof MODULE_INDEX)[number]): string {
  const done = m.ready && isComplete(m.id);
  return `
    <div class="topic-card anim-stagger ${done ? 'topic-card-done' : ''}" data-id="${m.id}" data-ready="${m.ready}" role="button" tabindex="0">
      <div class="topic-info">
        <h3>${m.title}</h3>
        <p>${m.summary}</p>
      </div>
      ${done ? '<span class="topic-check">✓</span>' : '<span class="topic-go">▸</span>'}
    </div>
  `;
}

function bindTopicCards(app: HTMLElement, navigate: (path: string) => void): void {
  app.querySelectorAll<HTMLElement>('.topic-card[data-ready="true"]').forEach(card => {
    const handler = () => navigate(`/topic/${card.dataset.id!}`);
    card.addEventListener('click', handler);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
  });
}
