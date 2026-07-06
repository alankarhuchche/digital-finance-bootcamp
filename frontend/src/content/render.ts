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
import { renderCallout } from '../viz/callout';
import { renderComparison } from '../viz/comparison';
import { renderWhatMovesVisual } from '../viz/whatMovesVisual';
import { renderSwiftGatewayVisual } from '../viz/swiftGatewayVisual';
import { renderChatWidget } from '../chat';
import { buildTopicLink, buildTopicSummaryText, buildLinkedInSnippet, copyAndToast } from '../utils/share';
import { enhanceTerms, bindTermPopovers } from '../viz/termHelp';

function formatTopicDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${d} ${months[m - 1]} ${y}`;
}

export async function renderModule(container: HTMLElement, mod: ModuleContent): Promise<void> {
  const { MODULE_INDEX, findCategory } = await import('./registry');
  const curIdx = MODULE_INDEX.findIndex(m => m.id === mod.id);
  const category = findCategory(mod.id);
  const topicUrl = buildTopicLink(mod.id);

  const updateLine = (mod.updatedAt || mod.changeSummary)
    ? `<p class="topic-update-line">${mod.updatedAt ? `Updated ${formatTopicDate(mod.updatedAt)}` : ''}${mod.updatedAt && mod.changeSummary ? ' · ' : ''}${mod.changeSummary ?? ''}</p>`
    : '';

  container.innerHTML = `
    <button class="back-btn" id="backBtn">← All topics</button>
    <div class="topic-header">
      <span class="eyebrow">${category ?? 'TOPIC'}</span>
      <h1>${mod.title}</h1>
      <p class="sub">${mod.summary}</p>
      ${updateLine}
      <div class="share-actions">
        <button class="share-btn" data-action="link" aria-label="Copy link">Copy link</button>
        <button class="share-btn" data-action="summary" aria-label="Copy summary">Copy summary</button>
        <button class="share-btn" data-action="linkedin" aria-label="Copy LinkedIn snippet">LinkedIn snippet</button>
      </div>
    </div>
    <div class="topic-body" id="topicBody"></div>
  `;

  // Bind share actions
  container.querySelectorAll<HTMLElement>('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (action === 'link') {
        copyAndToast(topicUrl, 'link');
      } else if (action === 'summary') {
        copyAndToast(buildTopicSummaryText(mod.title, mod.summary, topicUrl), 'summary');
      } else if (action === 'linkedin') {
        copyAndToast(buildLinkedInSnippet(mod.title, mod.summary, topicUrl), 'LinkedIn snippet');
      }
    });
  });

  const body = container.querySelector<HTMLElement>('#topicBody')!;

  for (const block of mod.blocks) {
    const section = document.createElement('section');
    section.className = 'block';
    body.appendChild(section);
    await renderBlock(section, block, topicUrl);
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

  bindTermPopovers(container);
  renderChatWidget(container, mod.id, mod.title, mod.blocks);
}

async function renderBlock(section: HTMLElement, block: ContentBlock, topicUrl: string): Promise<void> {
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
      mount.innerHTML = `<div class="prose">${enhanceTerms(block.body)}</div>`;
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
    case 'callout':
      renderCallout(mount, block.data, topicUrl);
      break;
    case 'comparison':
      renderComparison(mount, block.data, block.heading);
      break;
    case 'what-moves-visual':
      renderWhatMovesVisual(mount);
      break;
    case 'swift-gateway-visual':
      renderSwiftGatewayVisual(mount);
      break;
  }
}
