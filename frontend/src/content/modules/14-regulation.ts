import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'regulation',
  number: '14',
  title: 'Regulation',
  summary: 'MiCA, GENIUS Act, FATF, Basel.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `Module 03 showed who regulation actually protects \u2014 customers, banks, central banks, economies. This module is the rulebooks themselves: what they actually require, and the timeline that's been forcing the industry's hand.`,
    },
    {
      kind: 'timeline',
      heading: 'MiCA\u2019s rollout, in order',
      data: {
        events: [
          { date: 'Jun 2024', title: 'Stablecoin issuer rules enforceable', detail: '1:1 reserve backing, segregation, and redemption-at-par rules for EMTs/ARTs take effect.', status: 'done' },
          { date: 'Dec 2024', title: 'CASP licensing rules enforceable', detail: 'Exchanges and other venues need a MiCA license to operate at all \u2014 this is "Title V," the rule that forces delistings.', status: 'done' },
          { date: 'Jul 2026', title: 'Transition period ends', detail: 'No more grandfathering for firms operating under old national rules \u2014 full enforcement, EU-wide, no extensions.', status: 'deadline' },
        ],
      },
    },
    {
      kind: 'matrix',
      heading: 'MiCA vs the GENIUS Act',
      data: {
        columns: ['Scope', 'Reserve rule', 'Licensing', 'Why Tether balked at one'],
        items: [
          { id: 'mica', label: 'MiCA (EU)', color: '#7AA7D9', values: [`Full crypto-asset framework \u2014 stablecoins are one part of it`, `1:1 backing, with a meaningful share required in EU bank deposits`, `Authorized e-money or credit institution, per member state`, `Tether's reserve strategy leans on yield-bearing assets like T-bills, not low-yield EU bank deposits \u2014 the EU rule cuts directly into the profit model`] },
          { id: 'genius', label: 'GENIUS Act (US, 2025)', color: '#5FB3A3', values: [`Narrower \u2014 payment stablecoins specifically`, `1:1 backing in high-quality liquid assets`, `Dual federal/state licensing paths`, `Less of a head-on clash with Tether's model, though it explicitly bars stablecoins from paying interest to holders`] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'The two you\u2019ll hear less about, but matter',
      body: `<b>FATF's Travel Rule</b> requires crypto transfers above a threshold to carry sender/recipient information \u2014 the same idea as wire transfer compliance in traditional banking, and the source of most of DeFi/self-custody's compliance friction, since a peer-to-peer wallet transfer has no natural place to attach that data. <b>Basel III's crypto exposure rules</b> set how much capital a bank must hold against crypto holdings \u2014 punitively high for unbacked crypto assets, which is a major reason banks have been slow to hold crypto directly on balance sheet, even when they're happy to offer customer access to it.`,
    },
  ],
};

export default content;
