import type { RegionMapSpec, Initiative, InitiativeStatus } from '../types';

const STATUS_COLOR: Record<InitiativeStatus, string> = {
  live: '#5FB3A3',
  pilot: '#E8A33D',
  research: '#7AA7D9',
  none: '#9FB7CC',
};

const STATUS_LABEL: Record<InitiativeStatus, string> = {
  live: 'Live',
  pilot: 'Pilot',
  research: 'Research',
  none: 'No CBDC activity',
};

export async function renderRegionMap(container: HTMLElement, spec: RegionMapSpec): Promise<void> {
  container.innerHTML = `<div class="hint">Loading map…</div>`;

  const { WORLD_MAP_VIEWBOX, WORLD_MAP_PATH, COUNTRY_CENTROIDS } = await import('../data/worldMap.generated');
  container.innerHTML = `
    <div class="hint">Tap a pin for details.</div>
    <div class="map-wrap">
      <svg class="world-map" viewBox="${WORLD_MAP_VIEWBOX}">
        <path d="${WORLD_MAP_PATH}" class="map-base" />
        ${spec.initiatives.map((init, idx) => renderPin(init, idx, COUNTRY_CENTROIDS)).join('')}
      </svg>
    </div>
    <div class="map-legend">
      ${(Object.keys(STATUS_LABEL) as InitiativeStatus[])
        .map((s) => `<span class="legend-item"><span class="legend-dot" style="background:${STATUS_COLOR[s]}"></span>${STATUS_LABEL[s]}</span>`)
        .join('')}
    </div>
    <div class="money-detail" id="mapDetail">
      <div class="placeholder">Tap a pin above for details on that country's initiative.</div>
    </div>
    <div class="card" style="margin-top:14px;">
      <span class="tag">Cross-border / wholesale projects</span>
      ${spec.crossBorderProjects
        .map(
          (p) => `
        <div class="project-row">
          <h4>${p.name}</h4>
          <p>${p.description}</p>
          <span class="ex">${p.participants}</span>
        </div>
      `
        )
        .join('')}
    </div>
  `;

  const detailEl = container.querySelector<HTMLElement>('#mapDetail')!;

  container.querySelectorAll<SVGGElement>('.pingroup').forEach((g) => {
    g.addEventListener('click', () => {
      const idx = Number(g.getAttribute('data-idx'));
      const init = spec.initiatives[idx];
      detailEl.classList.add('detail-swap');
      setTimeout(() => {
        detailEl.innerHTML = `
          <span class="tag" style="color:${STATUS_COLOR[init.status]}">${STATUS_LABEL[init.status]}</span>
          <h3>${init.country}${init.name ? ` — ${init.name}` : ''}</h3>
          <div class="money-grid">
            <div class="field"><div class="k">Region</div><div class="v">${init.region}</div></div>
            <div class="field"><div class="k">Status</div><div class="v">${STATUS_LABEL[init.status]}</div></div>
          </div>
        `;
        detailEl.classList.remove('detail-swap');
      }, 150);
      container.querySelectorAll('.pin').forEach((c) => c.setAttribute('r', '5'));
      g.querySelector('.pin')!.setAttribute('r', '8');
    });
  });
}

function renderPin(
  init: Initiative,
  idx: number,
  centroids: Record<string, [number, number]>
): string {
  const coords = init.coords ?? centroids[init.country];
  if (!coords) {
    console.warn(`No centroid found for "${init.country}" — add a manual "coords" override.`);
    return '';
  }
  const [x, y] = coords;
  const color = STATUS_COLOR[init.status];
  const shouldPulse = init.status === 'live' || init.status === 'pilot';
  return `
    <g class="pingroup" data-idx="${idx}">
      ${shouldPulse ? `<circle cx="${x}" cy="${y}" r="5" fill="${color}" opacity="0.3" class="pin-ripple"/>` : ''}
      <circle class="pin" cx="${x}" cy="${y}" r="5" fill="${color}" stroke="#0E2A43" stroke-width="1.2" />
    </g>
  `;
}
