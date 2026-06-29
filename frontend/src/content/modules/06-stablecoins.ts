import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'stablecoins',
  number: '06',
  title: 'Stablecoins deep-dive',
  summary: 'Four mechanics, four failure modes.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `Module 02 treated "stablecoin" as one box on a map. It is actually four different mechanisms wearing the same label — and the differences between them are exactly what determines whether one survives a crisis or goes to zero.`,
    },
    {
      kind: 'matrix',
      heading: 'Four mechanics',
      data: {
        columns: ['Backing', 'Redemption', 'Key risk', 'Example'],
        items: [
          { id: 'fiat', label: 'Fiat-backed', color: '#5FB3A3', values: [`Cash and short-term government debt, 1:1`, `Issuer redeems at par on demand (typically $100K minimum for direct redemption; smaller holders sell on exchanges)`, `Trust in the issuer’s reserves and audit quality`, 'USDT, USDC'] },
          { id: 'crypto', label: 'Crypto-collateralized', color: '#7AA7D9', values: [`Over-collateralized with other crypto assets (e.g. $1.50 of ETH backing $1 of the stablecoin)`, `Borrower repays the loan to release collateral`, `Collateral value crashing faster than positions can be liquidated`, 'DAI'] },
          { id: 'fractional', label: 'Fractional-algorithmic', color: '#E8A33D', values: [`Partially collateralized (e.g. 90% real assets, 10% algorithmic) — the ratio adjusts based on market confidence`, `Redeem for a mix of collateral and newly minted governance tokens`, `If confidence drops, the algorithmic portion expands just when it is least trustworthy`, 'Frax (FRAX)'] },
          { id: 'algo', label: 'Pure algorithmic', color: '#E0726B', values: [`No real asset backing — a second token absorbs volatility via a mint/burn mechanism`, `Burn the stablecoin to mint the volatile sister token, in theory at $1 of value`, `The "death spiral": once trust breaks, the mechanism accelerates the collapse instead of stopping it`, 'TerraUSD (UST) — collapsed'] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'The audit question: USDT vs USDC',
      body: `Not all fiat-backed stablecoins are equally transparent. USDC (Circle) publishes monthly reserve attestations conducted by Deloitte under AICPA standards — a Big Four firm applying a recognized accounting framework. USDT (Tether), the larger stablecoin by market cap, publishes quarterly "attestations" by BDO Italia — not full GAAP audits. An attestation confirms that reserves existed at a single point in time; a full audit examines controls, transactions, and ongoing compliance. Tether has never completed a full audit despite years of promising one. This distinction matters because USDT is the most widely held stablecoin in the world, with over $140 billion in circulation as of 2025 — and the quality of its reserve reporting is materially weaker than its closest competitor.\n\nThat said, the business is enormously profitable regardless. Tether reported roughly $6.2 billion in net profit in the first half of 2024 alone, almost entirely from yield on its US Treasury reserves. When you hold USDT, you earn zero interest; Tether earns 4–5% on your dollar. That spread, multiplied across $140 billion, is the business model.`,
    },
    {
      kind: 'text',
      heading: `DAI’s evolution: from pure crypto to real-world assets`,
      body: `When DAI launched, it was backed entirely by crypto collateral — mainly ETH. Today, a significant portion of DAI’s backing comes from real-world assets (RWAs): US Treasuries, short-term bonds, and even tokenized credit facilities. MakerDAO (now Sky) made this shift deliberately to reduce its dependence on volatile crypto collateral and to generate yield for the protocol. The tradeoff is philosophical: DAI was originally prized for being "decentralized money" backed only by on-chain assets. Adding RWAs makes it more stable but also more dependent on the traditional financial system it was designed to circumvent.`,
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
        caption: `The reserve stays 1:1 in value — but the yield it earns goes entirely to the issuer. You hold the token; they hold the income. That spread is the entire business model.`,
      },
    },
    {
      kind: 'text',
      heading: 'What happens when you redeem USDC',
      body: `If you hold enough USDC to redeem directly with Circle (minimum $100 per redemption via Circle Mint, but practically you need a Circle Mint account which requires KYC and is designed for institutional or business users), the process works like this: you send your USDC to Circle’s smart contract, which burns the tokens; Circle initiates a bank wire from its reserve accounts (held at institutions like BNY Mellon); the wire typically settles within 1–2 business days; your bank account receives the dollars. If you hold less, you simply sell on an exchange — someone else buys your USDC, and the total supply stays the same. The peg holds as long as large players can arbitrage: if USDC trades at $0.99, they buy it cheap, redeem at $1.00 from Circle, and pocket the difference — pushing the price back to par.`,
    },
    {
      kind: 'case',
      heading: 'When the mechanism fails: Terra/UST',
      data: {
        title: 'TerraUSD (UST) and LUNA collapse',
        dateRange: '7–13 May 2022',
        whatHappened: `UST was an algorithmic stablecoin with no real asset backing, stabilized by a mint/burn relationship with its sister token, LUNA. Large withdrawals from a lending protocol offering an unsustainable ~19.5% yield on UST triggered a loss of confidence; as holders rushed to exit, the burn-to-mint mechanism flooded the market with new LUNA, collapsing its price and breaking the whole stabilization loop. Within about a week, close to $45 billion in combined market value was wiped out.`,
        whyItMatters: `This is the clearest real case of the difference between asset-backed and algorithmic stablecoins. A fiat-backed coin’s worst case is a slow bank run on real reserves; UST’s mechanism had no real reserves to run on — once trust broke, the "stabilization" mechanism actively accelerated the collapse instead of absorbing it.`,
        source: 'Wikipedia ("Terra (blockchain)"); Bitstamp/Robinhood educational summary',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'case',
      heading: 'Stress test of fiat-backing: USDC and SVB',
      data: {
        title: 'USDC depeg during the Silicon Valley Bank collapse',
        dateRange: '10–13 March 2023',
        whatHappened: `On March 10, 2023, Silicon Valley Bank (SVB) was seized by the FDIC. Circle disclosed that $3.3 billion of USDC’s ~$43 billion reserves were held at SVB. Over the weekend, with no way to confirm whether those deposits would be recovered, USDC’s price dropped to roughly $0.87 on secondary markets — a 13% depeg. Panic selling cascaded across DeFi: DAI, which held USDC as collateral, also wobbled. On Sunday evening, the US government announced it would guarantee all SVB deposits. By Monday morning, USDC was back at $1.00.`,
        whyItMatters: `This was the most important real-world stress test of a fiat-backed stablecoin. It proved two things simultaneously: first, that reserve concentration risk is real — a single bank failure can break the peg even when 92% of reserves are fine. Second, that the peg can recover if the underlying reserves are actually there. Unlike UST, the problem was temporary and solvable because real assets backed the token. Circle subsequently diversified its banking relationships and moved the majority of reserves to BNY Mellon and a dedicated Circle Reserve Fund managed by BlackRock.`,
        source: 'Circle public disclosures; FDIC SVB receivership; DeFi market data',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'Why did USDC depeg to ~$0.87 in March 2023?', options: ['Its algorithmic mechanism failed during a bank run', 'Circle disclosed $3.3B of reserves were stuck at the failing Silicon Valley Bank', 'Tether attacked USDC by dumping tokens on exchanges', 'The SEC froze Circle’s reserve accounts'], correctIndex: 1, explanation: 'USDC depegged because $3.3B of its reserves were held at SVB, which was seized by the FDIC. Once the government guaranteed all deposits, the peg recovered.' },
          { question: 'What is the key difference between Tether’s reserve reporting and Circle’s?', options: ['Tether publishes more frequently than Circle', 'Circle uses Deloitte attestations under AICPA standards; Tether uses BDO Italia attestations that are not full GAAP audits', 'There is no meaningful difference', 'Tether is audited by the SEC directly'], correctIndex: 1, explanation: 'Circle publishes monthly attestations by Deloitte (Big Four). Tether publishes quarterly attestations by BDO Italia — point-in-time snapshots, not full audits. Tether has never completed a full GAAP audit.' },
          { question: 'How does the Frax fractional-algorithmic model differ from pure algorithmic stablecoins?', options: ['Frax has no real backing at all, just like TerraUSD', 'Frax is partially backed by real collateral, with the algorithmic portion adjusting based on market confidence', 'Frax is 100% backed by US Treasuries', 'Frax uses Bitcoin mining to maintain its peg'], correctIndex: 1, explanation: 'Frax uses a hybrid model: part real collateral, part algorithmic. The collateral ratio adjusts dynamically — when confidence is high, less collateral is needed; when confidence drops, the ratio increases toward full backing.' },
        ],
      },
    },
  ],
};

export default content;
