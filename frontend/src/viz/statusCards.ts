// statusCards.ts
// A row of cards, each with a dated status chip: live, pilot, proof of concept,
// stated policy, or not happening. Used where the reader needs the state of
// several options side by side rather than a comparison of attributes.

import type { StatusCardsSpec } from '../types';
import { staggerEntrance } from '../animate';
import { enhanceTerms } from './termHelp';

export function renderStatusCards(container: HTMLElement, spec: StatusCardsSpec): void {
  container.classList.add('block-wide');
  container.innerHTML = `
    <ul class="scards" style="--scards-n: ${spec.cards.length}">
      ${spec.cards.map(c => `
        <li class="scard${c.focus ? ' scard--focus' : ''} anim-stagger">
          <span class="st-chip st-chip--${c.tone}">${c.status}</span>
          <h3 class="scard-title">${c.title}</h3>
          <p class="scard-body">${enhanceTerms(c.body)}</p>
          ${c.who ? `<p class="scard-who">${c.who}</p>` : ''}
        </li>`).join('')}
    </ul>`;
  staggerEntrance(container, '.scard', 90);
}
