import type { ModuleContent, ContentBlock } from './types';
import { renderStack } from '../viz/stack';
import { renderScatter } from '../viz/scatter';
import { renderFlow } from '../viz/flow';
import { renderMatrix } from '../viz/matrix';
import { renderTimeline } from '../viz/timeline';
import { renderRegionMap } from '../viz/regionMap';
import { renderCaseStudy } from '../viz/caseStudy';
import { renderScale } from '../viz/scale';

export async function renderModule(container: HTMLElement, mod: ModuleContent): Promise<void> {
  container.innerHTML = `
    <button class="back-btn" id="backBtn">← All modules</button>
    <div class="module-header">
      <span class="eyebrow">MODULE ${mod.number}</span>
      <h1>${mod.title}</h1>
      <p class="sub">${mod.summary}</p>
    </div>
    <div class="module-body" id="moduleBody"></div>
  `;

  const body = container.querySelector<HTMLElement>('#moduleBody')!;

  for (const block of mod.blocks) {
    const section = document.createElement('section');
    section.className = 'block';
    body.appendChild(section);
    await renderBlock(section, block);
  }
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
  }
}
