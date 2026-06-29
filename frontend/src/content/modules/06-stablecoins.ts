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
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'How does a fiat-backed stablecoin issuer earn revenue?', options: ['Charging transaction fees to token holders', 'Keeping the yield earned on reserve assets (e.g. T-bills) while holders get none', 'Minting new tokens and selling them at a premium', 'Charging a subscription to use the stablecoin'], correctIndex: 1, explanation: 'The issuer invests reserves in T-bills and keeps the yield; token holders receive no interest.' },
          { question: 'What caused TerraUSD (UST) to collapse?', options: ['Its reserve of T-bills was seized by regulators', 'Its algorithmic mint/burn mechanism accelerated the collapse once trust broke', 'A hack drained the smart contract', 'The collateral crypto assets were liquidated too slowly'], correctIndex: 1, explanation: 'UST had no real asset backing; once confidence broke, the mint/burn mechanism created a death spiral.' },
          { question: 'What backs a crypto-collateralized stablecoin like DAI?', options: ['Fiat currency held 1:1 in a bank', 'An algorithmic mint/burn mechanism', 'Over-collateralized crypto assets (e.g. $1.50 of ETH per $1 of stablecoin)', 'US Treasury bills and overnight repos'], correctIndex: 2, explanation: 'Crypto-collateralized stablecoins hold more crypto than the value of tokens issued to absorb price swings.' },
        ],
      },
    },
  ],
};

export default content;
