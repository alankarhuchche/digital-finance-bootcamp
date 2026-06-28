import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'cbdc',
  number: '07',
  title: 'CBDC deep-dive',
  summary: 'Retail vs wholesale, and the real-world pilots.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `"CBDC" gets used as if it means one thing. In practice, retail and wholesale CBDC are built for completely different users and solve completely different problems \u2014 conflating them is a common source of confusion in this space.`,
    },
    {
      kind: 'matrix',
      heading: 'Retail vs wholesale',
      data: {
        columns: ['Who uses it', 'Purpose', 'Example'],
        items: [
          { id: 'retail', label: 'Retail CBDC', color: '#5FB3A3', values: [`Consumers and businesses, directly`, `A direct, sovereign digital cash alternative for everyday payments`, 'Bahamas Sand Dollar, Nigeria eNaira, digital pound (Lab stage)'] },
          { id: 'wholesale', label: 'Wholesale CBDC', color: '#7AA7D9', values: [`Banks and financial institutions only`, `Settling large-value interbank and cross-border transactions on a shared ledger`, 'Project Agor\u00e1, mBridge'] },
        ],
      },
    },
    {
      kind: 'case',
      heading: 'A live, real-world retail CBDC',
      data: {
        title: 'The Bahamas Sand Dollar',
        dateRange: 'Live since October 2020',
        whatHappened: `The Sand Dollar is the oldest live retail CBDC anywhere, issued directly by the Central Bank of The Bahamas. Reported monthly transaction volume is roughly B$2 million, concentrated in island merchants and remittances within the archipelago \u2014 real but small relative to the broader payments system.`,
        whyItMatters: `It is proof that a retail CBDC can run in production, not just in a lab \u2014 but its modest scale after several years is also the honest counterpoint to any narrative that CBDCs are about to replace cash or bank deposits at speed. The three retail CBDCs actually launched so far (Bahamas, Jamaica, Nigeria) all share this pattern: real, but small.`,
        source: 'Atlantic Council CBDC Tracker; Central Bank of The Bahamas reporting',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'text',
      heading: 'Where the real momentum is',
      body: `Outside the eurozone, advanced economies have generally been retreating from retail CBDC \u2014 Canada, Australia, and Norway have all deprioritized it \u2014 while emerging markets are doing the opposite, partly as a direct response to dollar-backed stablecoins eroding monetary control. Wholesale infrastructure is where most serious central bank effort is now going, with mBridge in particular settling tens of billions of dollars in transaction volume. Module 11 maps every major initiative by country in full \u2014 this module was the mechanics, that one is the atlas.`,
    },
  ],
};

export default content;
