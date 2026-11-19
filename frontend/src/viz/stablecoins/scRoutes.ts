// scRoutes.ts — "Pick the payment model". The reader describes the payment; every model
// says whether it fits, fits only if stated prerequisites hold, or doesn't fit, and why.

import { assessAll, DEFAULT_ROUTE_INPUTS, type RouteInputs, type Fit, type ModelFamily } from '../../content/stablecoins/routes.ts';
import { segmented, readSeg, liveRegion, announce, askButton, bindAsk, esc } from './ui.ts';

const FIT_LABEL: Record<Fit, string> = { fits: 'Fits', conditional: 'Fits if…', poor: 'Doesn’t fit' };
const FIT_TONE: Record<Fit, string> = { fits: 'done', conditional: 'waits', poor: 'blocked' };
const FAMILY_LABEL: Record<ModelFamily, string> = { 'bank-rails': 'Bank and payment rails', stablecoin: 'Stablecoin route', 'bank-token': 'Bank token' };

export function renderRoutes(mount: HTMLElement): void {
  mount.classList.add('block-wide');
  let inputs: RouteInputs = { ...DEFAULT_ROUTE_INPUTS };

  mount.innerHTML = `
  <div class="sc sc-rt cq" data-scene="routes">
    <div class="sc-head">
      <p class="sc-contract"><span class="sc-tag">Selector</span>
        Describe the payment. Each model shows whether it fits and why. The rules are deliberately simple and visible, so you can argue with them.</p>
      ${askButton('Ask about this scene')}
    </div>
    <div class="sc-rt-layout">
      <div class="sc-panel sc-levers" role="group" aria-label="Describe the payment">
        <p class="sc-levers-title">The payment</p>
        ${segmented('payer', 'Who pays', [
          { value: 'business', label: 'A business' }, { value: 'person', label: 'A person' }, { value: 'bank', label: 'A bank’s treasury' },
        ], inputs.payer)}
        ${segmented('payeeHas', 'Payee can receive into', [
          { value: 'bank', label: 'Bank account' }, { value: 'wallet', label: 'Stablecoin wallet' }, { value: 'both', label: 'Both' },
        ], inputs.payeeHas)}
        ${segmented('payeeWants', 'Payee needs', [
          { value: 'local', label: 'Local currency' }, { value: 'dollars', label: 'Dollars or dollar tokens' },
        ], inputs.payeeWants)}
        ${segmented('payerHolds', 'Payer starts with', [
          { value: 'fiat', label: 'Money in a bank' }, { value: 'stablecoin', label: 'Stablecoins' },
        ], inputs.payerHolds)}
        ${segmented('shared', 'Both parties use', [
          { value: 'none', label: 'Different providers' }, { value: 'platform', label: 'The same platform' }, { value: 'bank-network', label: 'The same bank network' },
        ], inputs.shared)}
        ${segmented('anyTime', 'Must complete overnight or at a weekend', [
          { value: 'no', label: 'No' }, { value: 'yes', label: 'Yes' },
        ], inputs.anyTime ? 'yes' : 'no')}
        ${segmented('bankReach', 'Banks and payment firms', [
          { value: 'normal', label: 'Serve the corridor' }, { value: 'withdrawn', label: 'Have withdrawn' },
        ], inputs.bankReach)}
        ${segmented('corridor', 'Licensed crypto off-ramps at the destination', [
          { value: 'served', label: 'Established' }, { value: 'thin', label: 'Not established' },
        ], inputs.corridor)}
      </div>
      <div class="sc-rt-results" data-results></div>
    </div>
    ${liveRegion()}
  </div>`;

  const root = mount.querySelector<HTMLElement>('.sc-rt')!;
  const results = root.querySelector<HTMLElement>('[data-results]')!;

  bindAsk(root, 'routes', () => {
    const top = assessAll(inputs).filter(r => r.fit === 'fits').map(r => r.model.name.toLowerCase());
    return top.length
      ? `In the payment-model selector, why does ${top[0]} fit this payment, and what are its prerequisites and failure points?`
      : 'In the payment-model selector, nothing fits outright for this payment. What would have to change?';
  });

  function render(): void {
    const res = assessAll(inputs);
    const groups: Fit[] = ['fits', 'conditional', 'poor'];
    results.innerHTML = groups.map(g => {
      const items = res.filter(r => r.fit === g);
      if (!items.length) return '';
      return `<section class="sc-rt-group sc-rt-group--${g}" aria-label="${FIT_LABEL[g]}">
        <h4 class="sc-rt-group-title"><span class="sc-pill sc-pill--${FIT_TONE[g]}">${FIT_LABEL[g]}</span> <span class="sc-rt-count">${items.length}</span></h4>
        ${items.map(r => `<details class="sc-model"${g === 'fits' ? ' open' : ''}>
          <summary><span class="sc-model-name">${esc(r.model.name)}</span><span class="sc-model-family">${FAMILY_LABEL[r.model.family]}</span></summary>
          <ul class="sc-model-why">${r.because.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
          <dl class="sc-model-dl">
            <div><dt>How it works</dt><dd>${esc(r.model.oneLine)}</dd></div>
            <div><dt>Parties</dt><dd>${esc(r.model.parties)}</dd></div>
            <div><dt>Prerequisites</dt><dd>${r.model.prerequisites.map(esc).join(' · ')}</dd></div>
            <div><dt>Controls</dt><dd>${esc(r.model.controls)}</dd></div>
            <div><dt>Fails when</dt><dd>${esc(r.model.failsWhen)}</dd></div>
            <div><dt>Good for</dt><dd>${esc(r.model.goodFor)}</dd></div>
          </dl>
        </details>`).join('')}
      </section>`;
    }).join('');
  }

  root.querySelector('.sc-levers')?.addEventListener('change', () => {
    inputs = {
      payer: readSeg(root, 'payer') as RouteInputs['payer'],
      payeeHas: readSeg(root, 'payeeHas') as RouteInputs['payeeHas'],
      payeeWants: readSeg(root, 'payeeWants') as RouteInputs['payeeWants'],
      payerHolds: readSeg(root, 'payerHolds') as RouteInputs['payerHolds'],
      shared: readSeg(root, 'shared') as RouteInputs['shared'],
      anyTime: readSeg(root, 'anyTime') === 'yes',
      bankReach: readSeg(root, 'bankReach') as RouteInputs['bankReach'],
      corridor: readSeg(root, 'corridor') as RouteInputs['corridor'],
    };
    render();
    const fits = assessAll(inputs).filter(r => r.fit === 'fits').length;
    announce(root, `${fits} model${fits === 1 ? '' : 's'} fit this payment.`);
  });

  render();
}
