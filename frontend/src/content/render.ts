import type { ModuleContent, ContentBlock } from './types';
import { renderStack } from '../viz/stack';
import { renderScatter } from '../viz/scatter';
import { renderFlow } from '../viz/flow';
import { renderMatrix } from '../viz/matrix';
import { renderTimeline } from '../viz/timeline';
import { renderRegionMap } from '../viz/regionMap';
import { renderCaseStudy } from '../viz/caseStudy';
import { renderScale } from '../viz/scale';
import { renderQuiz } from '../viz/quiz';
import { renderMoneyCards } from '../viz/moneyCards';
import { renderChatWidget } from '../chat';

export async function renderModule(container: HTMLElement, mod: ModuleContent): Promise<void> {
  const { MODULE_INDEX } = await import('./registry');
  const curIdx = MODULE_INDEX.findIndex(m => m.id === mod.id);
  const category = findCategory(mod.id);

  container.innerHTML = `
    <button class="back-btn" id="backBtn">← All topics</button>
    <div class="topic-header">
      <span class="eyebrow">${category ?? 'TOPIC'}</span>
      <h1>${mod.title}</h1>
      <p class="sub">${mod.summary}</p>
    </div>
    <div class="topic-body" id="topicBody"></div>
  `;

  const body = container.querySelector<HTMLElement>('#topicBody')!;

  for (const block of mod.blocks) {
    const section = document.createElement('section');
    section.className = 'block';
    body.appendChild(section);
    await renderBlock(section, block);
  }

  // Previous / Next topic navigation
  const nav = document.createElement('div');
  nav.className = 'topic-nav';
  let navHtml = '';

  if (curIdx > 0) {
    const prev = MODULE_INDEX[curIdx - 1];
    navHtml += `<a class="topic-nav-btn topic-nav-prev" href="/topic/${prev.id}" data-id="${prev.id}">← ${prev.title}</a>`;
  } else {
    navHtml += '<span></span>';
  }

  if (curIdx >= 0 && curIdx < MODULE_INDEX.length - 1) {
    const next = MODULE_INDEX[curIdx + 1];
    if (next && next.ready) {
      navHtml += `<a class="topic-nav-btn topic-nav-next" href="/topic/${next.id}" data-id="${next.id}">${next.title} →</a>`;
    }
  }

  nav.innerHTML = navHtml;
  container.appendChild(nav);

  nav.querySelectorAll<HTMLElement>('.topic-nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('navigate', { detail: `/topic/${btn.dataset.id}` }));
    });
  });

  renderChatWidget(container, mod.id, mod.title, mod.blocks);
}

function findCategory(topicId: string): string | null {
  const cats: Record<string, string[]> = {
    'How payments work today': ['payments-fundamentals', 'existing-rails', 'forms-of-money', 'risk-benefit'],
    'The technology underneath': ['dlt-basics', 'crypto-assets'],
    'The new instruments': ['stablecoins', 'cbdc', 'tokenization'],
    'Markets & scale': ['defi', 'market-sizing', 'global-initiatives', 'market-structure', 'settlement'],
    'Rules & reality': ['digital-identity', 'regulation', 'privacy', 'bank-strategy', 'failure-modes'],
    'Reference': ['glossary'],
  };
  for (const [label, ids] of Object.entries(cats)) {
    if (ids.includes(topicId)) return label;
  }
  return null;
}

async function renderBlock(section: HTMLElement, block: ContentBlock): Promise<void> {
  if (block.heading) {
    const h = document.createElement('h2');
    h.className = 'block-heading';
    h.textContent = block.heading;
    section.appendChild(h);
  }

  const mount = document.createElement('div');
  section.appendChild(mount);

  switch (block.kind) {
    case 'text':
      mount.innerHTML = `<div class="prose">${block.body}</div>`;
      break;
    case 'stack':
      renderStack(mount, block.data, block.note);
      break;
    case 'scatter':
      renderScatter(mount, block.data);
      break;
    case 'flow':
      renderFlow(mount, block.data);
      break;
    case 'matrix':
      renderMatrix(mount, block.data);
      break;
    case 'timeline':
      renderTimeline(mount, block.data);
      break;
    case 'map':
      await renderRegionMap(mount, block.data);
      break;
    case 'case':
      renderCaseStudy(mount, block.data);
      break;
    case 'scale':
      renderScale(mount, block.data);
      break;
    case 'quiz':
      renderQuiz(mount, block.data);
      break;
    case 'money-cards':
      renderMoneyCards(mount, block.data);
      break;
  }
}
