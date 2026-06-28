import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'stablecoins',
  number: '06',
  title: 'Stablecoins deep-dive',
  summary: 'Three mechanics, three failure modes.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `Module 02 treated "stablecoin" as one box on a map. It is actually three different mechanisms wearing the same label \u2014 and the differences between them are exactly what determines whether one survives a crisis or goes to zero.`,
    },
    {
      kind: 'matrix',
      heading: 'Three mechanics',
      data: {
        columns: ['Backing', 'Redemption', 'Key risk', 'Example'],
        items: [
          { id: 'fiat', label: 'Fiat-backed', color: '#5FB3A3', values: [`Cash and short-term government debt, 1:1`, `Issuer redeems at par on demand`, `Trust in the issuer's reserves and audits`, 'USDT, USDC'] },
          { id: 'crypto', label: 'Crypto-collateralized', color: '#7AA7D9', values: [`Over-collateralized with other crypto assets (e.g. $1.50 of ETH backing $1 of the stablecoin)`, `Borrower repays the loan to release collateral`, `Collateral value crashing faster than positions can be liquidated`, 'DAI'] },
          { id: 'algo', label: 'Algorithmic', color: '#E0726B', values: [`No real asset backing \u2014 a second token absorbs volatility via a mint/burn mechanism`, `Burn the stablecoin to mint the volatile sister token, in theory at $1 of value`, `The "death spiral": once trust breaks, the mechanism accelerates the collapse instead of stopping it`, 'TerraUSD (UST) \u2014 collapsed'] },
        ],
      },
    },
    {
      kind: 'flow',
      heading: 'How a fiat-backed stablecoin actually makes money',
      data: {
        viewBox: '0 0 320 200',
        boxes: [
          { id: 'in', x: 10, y: 10, w: 110, h: 44, caption: 'YOU SEND', value: '$1' },
          { id: 'out', x: 200, y: 10, w: 110, h: 44, caption: 'YOU RECEIVE', value: '1 token' },
          { id: 'reserve', x: 105, y: 95, w: 110, h: 44, caption: 'RESERVE BUYS', value: 'T-BILL (~4-5%)', valueColor: '#7AA7D9' },
        ],
        paths: [
          { d: 'M65,54 L65,117 L150,117', animated: true, dotColor: '#E8A33D' },
          { d: 'M255,54 L255,117 L215,117' },
        ],
        caption: `The reserve stays 1:1 in value \u2014 but the yield it earns goes entirely to the issuer. You hold the token; they hold the income. That spread is the entire business model.`,
      },
    },
    {
      kind: 'case',
      heading: 'When the mechanism fails: Terra/UST',
      data: {
        title: 'TerraUSD (UST) and LUNA collapse',
        dateRange: '7\u201313 May 2022',
        whatHappened: `UST was an algorithmic stablecoin with no real asset backing, stabilized by a mint/burn relationship with its sister token, LUNA. Large withdrawals from a lending protocol offering an unsustainable ~19.5% yield on UST triggered a loss of confidence; as holders rushed to exit, the burn-to-mint mechanism flooded the market with new LUNA, collapsing its price and breaking the whole stabilization loop. Within about a week, close to $45 billion in combined market value was wiped out.`,
        whyItMatters: `This is the clearest real case of the difference between asset-backed and algorithmic stablecoins. A fiat-backed coin's worst case is a slow bank run on real reserves; UST's mechanism had no real reserves to run on \u2014 once trust broke, the "stabilization" mechanism actively accelerated the collapse instead of absorbing it.`,
        source: 'Wikipedia ("Terra (blockchain)"); Bitstamp/Robinhood educational summary',
        verifiedAsOf: 'June 2026',
      },
    },
  ],
};

export default content;
