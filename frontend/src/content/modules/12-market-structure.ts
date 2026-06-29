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
      body: `Where you actually access any of this matters as much as what you're accessing. The risk topic's "who carries the risk" question shows up again here, sharpened to a single decision: do you trust a company to hold your assets, or do you hold them yourself?`,
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
      heading: 'Hybrid models: CEX-DEX bridges',
      body: `The CEX/DEX binary is blurring. dYdX runs an order book (like a CEX) but settles on-chain (like a DEX). Coinbase's Base chain and Binance's BNB Chain let their CEX users move directly into on-chain DeFi. Hybrid models try to combine CEX-grade speed and UX with DEX-grade self-custody and transparency.`,
    },
    {
      kind: 'text',
      heading: 'Custody and market makers',
      body: `Institutions rarely self-custody at meaningful scale \u2014 specialist custodians (Fireblocks, Coinbase Custody, and increasingly banks themselves) hold assets under bank-grade security and insurance, the institutional equivalent of choosing a CEX's trust model without using its trading venue. Market makers, meanwhile, are what keeps prices aligned between CEXs and DEXs \u2014 without them, the same asset could trade at meaningfully different prices on different venues simultaneously, since there's no single shared order book the way there is in equities.`,
    },
    {
      kind: 'text',
      heading: 'OTC desks and prime brokerage',
      body: `Institutional crypto trades rarely happen on visible exchange order books. OTC (over-the-counter) desks like Cumberland, Galaxy Digital, and Circle Trade handle large block trades ($1M+) without moving the public market price. Crypto prime brokers (Coinbase Prime, Hidden Road, FalconX) bundle execution, lending, custody, and margin into one relationship \u2014 mirroring what Goldman Sachs or Morgan Stanley provide in traditional markets.`,
    },
    {
      kind: 'text',
      heading: 'Proof of reserves',
      body: `Post-FTX, exchanges faced pressure to prove they actually hold the assets they claim. Proof of reserves (PoR) uses cryptographic attestations (Merkle trees) to let users verify their balance is included in the exchange's total reserves, combined with third-party audits. Limitations: PoR shows assets but not liabilities \u2014 an exchange could have matching reserves while still being insolvent if it owes more than it holds. Exchanges implementing PoR include Binance, Kraken, and OKX.`,
    },
    {
      kind: 'text',
      heading: 'Liquidity fragmentation',
      body: `Unlike US equities (which have a consolidated tape via the SIP), crypto has no unified view of prices across venues. The same asset trades on dozens of CEXs and DEXs simultaneously at slightly different prices. This fragmentation means: worse price discovery, higher effective spreads for traders, and arbitrage profits flowing to sophisticated market makers rather than to ordinary users. Proposals for a crypto consolidated tape exist but face the fundamental challenge that DEXs operate across multiple chains with no central authority to aggregate data.

Markets connect buyers and sellers. But the real challenge underneath is settlement — making sure both sides of a trade actually deliver. That's the next topic.`,
    },
    {
      kind: 'case',
      heading: 'When a CEX\u2019s custody model fails',
      data: {
        title: 'FTX collapse',
        dateRange: 'November 2022 (bankruptcy filed 11 November)',
        whatHappened: `FTX, then the second-largest crypto exchange globally, secretly lent customer deposits to its affiliated trading firm, Alameda Research \u2014 explicitly forbidden by its own terms of service. When a liquidity crunch triggered a wave of withdrawal requests, FTX could not return customer funds. The shortfall was reported at roughly $8 billion. Founder Sam Bankman-Fried was convicted of fraud in November 2023, sentenced to 25 years in March 2024, and had that conviction upheld on appeal in 2026.`,
        whyItMatters: `This is the sharpest illustration of CEX custody risk: customers believed their assets were held 1:1 and separately from the exchange's own funds \u2014 exactly the assumption MiCA's reserve-segregation rules for stablecoin issuers are designed to force. A DEX user couldn't have lost funds this way, because there's no custodian in the loop to misuse them \u2014 though DEXs carry their own risks (the DeFi topic's Euler Finance case, and the failure modes topic ahead).`,
        source: 'Wikipedia ("Bankruptcy of FTX"); CBS News and NBC News sentencing coverage',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'What is proof of reserves, and what is its main limitation?', options: ['A government audit that certifies exchange solvency with no known limitations', 'A cryptographic attestation that lets users verify an exchange holds their assets, but it shows assets without liabilities, so an exchange could still be insolvent', 'A blockchain feature that automatically freezes withdrawals when reserves drop below a threshold', 'A voluntary insurance program that guarantees depositor funds up to $250,000'], correctIndex: 1, explanation: 'Proof of reserves uses Merkle tree attestations to let users verify their balance is included in total reserves, but it only shows assets \u2014 not liabilities \u2014 so an exchange could still be insolvent even with matching reserves.' },
          { question: 'Why does crypto suffer from liquidity fragmentation?', options: ['Because most countries ban crypto trading, limiting the number of venues', 'There is no consolidated tape like in US equities, so the same asset trades at different prices across dozens of CEXs and DEXs with no unified view', 'Because blockchains process transactions too slowly for real-time price updates', 'Because all crypto trading is peer-to-peer with no exchanges involved'], correctIndex: 1, explanation: 'Unlike US equities with a consolidated tape via the SIP, crypto has no unified price view across venues, leading to worse price discovery and higher effective spreads.' },
          { question: 'What role do OTC desks play in institutional crypto trading?', options: ['They provide retail investors with discounted trading fees', 'They handle large block trades ($1M+) without moving the public market price, preventing slippage from large orders on visible order books', 'They issue new tokens on behalf of institutional investors', 'They act as regulators that approve large transactions before execution'], correctIndex: 1, explanation: 'OTC desks like Cumberland, Galaxy Digital, and Circle Trade handle large block trades off the visible order book, preventing the price impact that would occur from placing large orders on public exchanges.' },
        ],
      },
    },
  ],
};

export default content;
