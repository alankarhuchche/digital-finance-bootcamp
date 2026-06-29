import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'market-structure',
  number: '12',
  title: 'Market structure',
  summary: 'CEX vs DEX, custody, market makers.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `Where you actually access any of this matters as much as what you're accessing. Module 03's "who carries the risk" question shows up again here, sharpened to a single decision: do you trust a company to hold your assets, or do you hold them yourself?`,
    },
    {
      kind: 'matrix',
      heading: 'CEX vs DEX',
      data: {
        columns: ['Who holds your funds', 'Identity checks', 'Subject to MiCA-style delisting', 'Example'],
        items: [
          { id: 'cex', label: 'CEX (centralized)', color: '#7AA7D9', values: [`The exchange \u2014 custodial`, `Yes (KYC required)`, `Yes \u2014 licensed venues can be forced to delist non-compliant assets`, 'Binance, Coinbase, Kraken'] },
          { id: 'dex', label: 'DEX (decentralized)', color: '#5FB3A3', values: [`You \u2014 your own wallet, non-custodial`, `No`, `No \u2014 falls outside that regulatory perimeter entirely`, 'Uniswap, Curve'] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'Custody and market makers',
      body: `Institutions rarely self-custody at meaningful scale \u2014 specialist custodians (Fireblocks, Coinbase Custody, and increasingly banks themselves) hold assets under bank-grade security and insurance, the institutional equivalent of choosing a CEX's trust model without using its trading venue. Market makers, meanwhile, are what keeps prices aligned between CEXs and DEXs \u2014 without them, the same asset could trade at meaningfully different prices on different venues simultaneously, since there's no single shared order book the way there is in equities.`,
    },
    {
      kind: 'case',
      heading: 'When a CEX\u2019s custody model fails',
      data: {
        title: 'FTX collapse',
        dateRange: 'November 2022 (bankruptcy filed 11 November)',
        whatHappened: `FTX, then the second-largest crypto exchange globally, secretly lent customer deposits to its affiliated trading firm, Alameda Research \u2014 explicitly forbidden by its own terms of service. When a liquidity crunch triggered a wave of withdrawal requests, FTX could not return customer funds. The shortfall was reported at roughly $8 billion. Founder Sam Bankman-Fried was convicted of fraud in November 2023, sentenced to 25 years in March 2024, and had that conviction upheld on appeal in 2026.`,
        whyItMatters: `This is the sharpest illustration of CEX custody risk: customers believed their assets were held 1:1 and separately from the exchange's own funds \u2014 exactly the assumption MiCA's reserve-segregation rules for stablecoin issuers are designed to force. A DEX user couldn't have lost funds this way, because there's no custodian in the loop to misuse them \u2014 though DEXs carry their own risks (Module 09's Euler Finance case, and Module 16 ahead).`,
        source: 'Wikipedia ("Bankruptcy of FTX"); CBS News and NBC News sentencing coverage',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'What is the key custody difference between a CEX and a DEX?', options: ['CEXs are faster but DEXs are cheaper', 'On a CEX the exchange holds your funds; on a DEX you hold them in your own wallet', 'DEXs require KYC but CEXs do not', 'CEXs only support Bitcoin while DEXs support all tokens'], correctIndex: 1, explanation: 'CEXs are custodial (the exchange holds your funds), while DEXs are non-custodial (you keep assets in your own wallet).' },
          { question: 'What was the approximate customer fund shortfall in the FTX collapse?', options: ['$800 million', '$2 billion', '$8 billion', '$25 billion'], correctIndex: 2, explanation: 'FTX\'s shortfall was reported at roughly $8 billion after it secretly lent customer deposits to Alameda Research.' },
          { question: 'Why are market makers important in crypto market structure?', options: ['They issue new tokens on behalf of exchanges', 'They keep prices aligned between CEXs and DEXs, preventing large price discrepancies across venues', 'They provide KYC verification services for decentralized exchanges', 'They insure customer deposits against exchange failures'], correctIndex: 1, explanation: 'Market makers keep prices aligned across venues, preventing the same asset from trading at meaningfully different prices on different exchanges.' },
        ],
      },
    },
  ],
};

export default content;
