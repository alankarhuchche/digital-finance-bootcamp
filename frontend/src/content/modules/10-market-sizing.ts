import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'market-sizing',
  number: '10',
  title: 'Market capture & sizing',
  summary: 'Old money vs new money, by the actual numbers.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `Coverage of digital assets can make it sound like it's already comparable in scale to the traditional financial system. It isn't \u2014 not yet. Seeing the real numbers side by side is the fastest way to calibrate how big this actually is today, versus how fast it's growing.`,
    },
    {
      kind: 'scale',
      heading: 'Old money vs new money',
      data: {
        unit: 'USD',
        items: [
          { key: 'm2', label: 'US M2 money supply', value: 22800, color: '#7AA7D9', detail: 'Cash, checking deposits, savings, and other liquid assets in the US alone \u2014 Federal Reserve, April 2026.' },
          { key: 'stable', label: 'Global stablecoin market cap', value: 320, color: '#E0726B', detail: 'USDT (~$185-188B) and USDC (~$78B) make up the large majority of this \u2014 DefiLlama, April/May 2026.' },
          { key: 'defi', label: 'DeFi total value locked', value: 85, color: '#5FB3A3', detail: 'Volatile \u2014 ranged roughly $72-100B through H1 2026 depending on market conditions. Down from a $177B all-time high in 2021.' },
          { key: 'rwa', label: 'Tokenized real-world assets', value: 26, color: '#C792E8', detail: 'Led by BlackRock\u2019s BUIDL and Circle\u2019s USYC \u2014 CoinLaw, June 2026.' },
        ],
        note: `Even the largest "new money" category here \u2014 stablecoins \u2014 is roughly 1.4% the size of US M2 alone, before even counting the rest of the world's money supply. The honest read: this is still a small, fast-growing layer sitting on top of (and occasionally siphoning from) a much larger traditional system, not a replacement for it yet.`,
      },
    },
    {
      kind: 'text',
      heading: 'Why direction matters more than size, for now',
      body: `Stablecoin supply grew from roughly $210B to $320B+ in the first half of 2026 alone \u2014 a genuinely fast trajectory, even from a small base. For a digital assets lab, the size today matters less than the growth rate and where the growth is concentrated (EM remittances, institutional treasury use, DeFi collateral). All figures here will be stale within months \u2014 treat the numbers as a snapshot of June 2026, not a permanent fact.`,
    },
  ],
};

export default content;
