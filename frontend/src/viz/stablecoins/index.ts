// Entry point for the Stablecoins topic's interactive scenes.
// render.ts loads this module on demand, so its code and CSS form their own chunk.

import './stablecoins.css';
import type { ScSceneId } from '../../types';
import { renderJourney } from './scJourney.ts';
import { renderLiquidity } from './scLiquidity.ts';
import { renderCrossLedger } from './scCrossLedger.ts';
import { renderRoutes } from './scRoutes.ts';
import { renderPeg, renderLens, renderControls, renderReserve, renderChecks, renderVolume } from './scCompact.ts';

export function renderScScene(mount: HTMLElement, scene: ScSceneId): void {
  switch (scene) {
    case 'journey':
      renderJourney(mount);
      break;
    case 'liquidity':
      renderLiquidity(mount);
      break;
    case 'crossledger':
      renderCrossLedger(mount);
      break;
    case 'routes':
      renderRoutes(mount);
      break;
    case 'peg':
      renderPeg(mount);
      break;
    case 'lens':
      renderLens(mount);
      break;
    case 'controls':
      renderControls(mount);
      break;
    case 'reserve':
      renderReserve(mount);
      break;
    case 'check':
      renderChecks(mount);
      break;
    case 'volume':
      renderVolume(mount);
      break;
    default:
      mount.innerHTML = `<p class="sources-line">This interactive is not available yet.</p>`;
  }
}
