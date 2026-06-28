import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'forms-of-money',
  number: '02',
  title: 'Forms of money',
  summary: 'Cash, deposits, CBDC, stablecoins, tokenized deposits \u2014 one map.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `Every "form of money" you'll meet in this bootcamp can be placed on the same two questions: if it fails, who's actually on the hook \u2014 you, or the issuer/state? And do you earn anything for holding it? Position on those two axes tells you almost everything that matters.`,
    },
    {
      kind: 'scatter',
      data: {
        axisX: '\u2190 ISSUER/STATE BEARS RISK        YOU BEAR THE RISK \u2192',
        axisY: 'yield to you',
        points: [
          {
            key: 'cash', label: 'Cash', x: 70, y: 5, color: '#E8A33D',
            detail: { tag: 'Physical', title: 'Cash', fields: [
              { k: 'Issuer', v: 'Central bank' },
              { k: 'Backing', v: 'Sovereign promise' },
              { k: 'Your claim', v: 'None needed \u2014 legal tender' },
              { k: 'Usable where', v: 'Anywhere' },
            ] },
          },
          {
            key: 'deposit', label: 'Bank deposit', x: 55, y: 30, color: '#7AA7D9',
            detail: { tag: 'Everyday', title: 'Bank deposit', fields: [
              { k: 'Issuer', v: 'Commercial bank' },
              { k: 'Backing', v: 'Loans/assets, fractional reserve' },
              { k: 'Your claim', v: 'Insured deposit, up to a limit' },
              { k: 'Usable where', v: 'That bank\u2019s system' },
            ] },
          },
          {
            key: 'cbdc', label: 'CBDC', x: 60, y: 75, color: '#5FB3A3',
            detail: { tag: 'Sovereign digital', title: 'CBDC (e.g. digital pound/euro)', fields: [
              { k: 'Issuer', v: 'Central bank' },
              { k: 'Backing', v: 'Sovereign promise' },
              { k: 'Your claim', v: 'None needed \u2014 direct liability' },
              { k: 'Usable where', v: 'Anywhere (intended)' },
            ] },
          },
          {
            key: 'tokdep', label: 'Tokenized deposit', x: 50, y: 50, color: '#C792E8',
            detail: { tag: 'Bank-issued, on-chain', title: 'Tokenized deposit', fields: [
              { k: 'Issuer', v: 'Commercial bank' },
              { k: 'Backing', v: 'Same as an ordinary deposit' },
              { k: 'Your claim', v: 'Insured deposit, up to a limit' },
              { k: 'Usable where', v: 'That bank\u2019s blockchain rails' },
            ] },
          },
          {
            key: 'stable', label: 'Stablecoin', x: 15, y: 10, color: '#E0726B',
            detail: { tag: 'Private crypto', title: 'Stablecoin (e.g. USDT/USDC)', fields: [
              { k: 'Issuer', v: 'Private company' },
              { k: 'Backing', v: 'T-bills / cash reserves' },
              { k: 'Your claim', v: 'Unsecured claim on a company' },
              { k: 'Usable where', v: 'Exchanges, wallets, DeFi' },
            ] },
          },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'The pattern worth keeping',
      body: `Every row trades off the same three things: who's on the hook if it fails, whether you earn anything for holding it, and how freely you can move it. Nothing on this map is free of all three risks at once \u2014 and almost every "which is safer" question in later modules comes back to that tradeoff.`,
    },
  ],
};

export default content;
