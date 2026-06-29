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
      body: "Coverage of digital assets can make it sound like it's already comparable in scale to the traditional financial system. It isn't — not yet. Seeing the real numbers side by side is the fastest way to calibrate how big this actually is today, versus how fast it's growing.",
    },
    {
      kind: 'text',
      heading: 'Payment volume: the surprise metric',
      body: "One number that catches most people off guard: USDT now settles more daily value than Visa — roughly $50B/day versus Visa's ~$42B/day as of mid-2026. The comparison is imperfect, though, and the caveat matters. Visa processes retail consumer payments: someone buying groceries, booking a flight, paying a subscription. USDT settlement includes large institutional and OTC (over-the-counter) transfers, where a single whale moving $200M between exchanges or a treasury desk settling a block trade can skew the daily total dramatically. The average Visa transaction is a few hundred dollars; the average USDT on-chain transfer is orders of magnitude larger. Still, the raw throughput comparison illustrates something real: stablecoin settlement infrastructure has scaled from negligible to Visa-tier volume in under five years. Even if you discount the institutional skew, the growth curve is striking.",
    },
    {
      kind: 'scale',
      heading: 'Old money vs new money',
      data: {
        unit: 'USD',
        items: [
          { key: 'm2', label: 'US M2 money supply', value: 22800, color: '#7AA7D9', detail: 'Cash, checking deposits, savings, and other liquid assets in the US alone — Federal Reserve, April 2026.' },
          { key: 'stable', label: 'Global stablecoin market cap', value: 320, color: '#E0726B', detail: 'USDT (~$185-188B) and USDC (~$78B) make up the large majority of this — DefiLlama, April/May 2026.' },
          { key: 'defi', label: 'DeFi total value locked', value: 85, color: '#5FB3A3', detail: 'Volatile — ranged roughly $72-100B through H1 2026 depending on market conditions. Down from a $177B all-time high in 2021.' },
          { key: 'rwa', label: 'Tokenized real-world assets', value: 26, color: '#C792E8', detail: "Led by BlackRock's BUIDL and Circle's USYC — CoinLaw, June 2026." },
        ],
        note: "Even the largest \"new money\" category here — stablecoins — is roughly 1.4% the size of US M2 alone, before even counting the rest of the world's money supply. The honest read: this is still a small, fast-growing layer sitting on top of (and occasionally siphoning from) a much larger traditional system, not a replacement for it yet.",
      },
    },
    {
      kind: 'text',
      heading: 'Why TVL is a poor metric',
      body: "Total Value Locked (TVL) is the most-cited DeFi metric, and also one of the most misleading. The core problem: the same dollar can be counted multiple times through leverage. Deposit ETH into Aave, borrow stablecoins against it, deposit those stablecoins into Curve, then LP the Curve tokens in Convex — congratulations, your original capital is now \"locked\" in three or four protocols simultaneously. TVL counts all of it. This double- and triple-counting means TVL systematically overstates the actual capital committed to DeFi. It gets worse: TVL also fluctuates with token prices, not just actual deposits. If ETH rises 30%, the TVL of every protocol holding ETH rises 30% too, even though no new capital entered the system. Better metrics exist but get less attention: protocol revenue (actual fees earned), unique active addresses (how many distinct wallets interact with the protocol), and transaction count (how much real usage is happening). None of these are perfect either, but they are harder to game than TVL.",
    },
    {
      kind: 'text',
      heading: 'Why direction matters more than size, for now',
      body: "Stablecoin supply grew from roughly $210B to $320B+ in the first half of 2026 alone — a genuinely fast trajectory, even from a small base. For a digital assets lab, the size today matters less than the growth rate and where the growth is concentrated (EM remittances, institutional treasury use, DeFi collateral). All figures here will be stale within months — treat the numbers as a snapshot of June 2026, not a permanent fact.\n\nInstitutional adoption tells a parallel story. The number of TradFi firms now offering crypto custody or trading has grown from a handful in 2020 to hundreds by 2026. BlackRock launched its tokenized money-market fund (BUIDL). Fidelity offers crypto custody and trading to retail clients. Major banks including BNY Mellon, Deutsche Bank, and Standard Chartered have crypto custody or trading desks. This is no longer a fringe experiment — when the world's largest asset manager is tokenizing treasury bills on Ethereum, the institutional signal is hard to dismiss.\n\nRemittances add another dimension. The global remittance market moves roughly $650B per year, and crypto is capturing a growing share — especially in corridors like US-Mexico and US-Philippines, where traditional channels charge an average of 6-8% in fees. Stablecoin transfers on networks like Stellar, Tron, or Solana can settle the same payments for under 1% in total cost. For a migrant worker sending $500 home, that is the difference between $35 in fees and $4. The unit economics are compelling enough that even legacy remittance companies like MoneyGram have integrated stablecoin rails.",
    },
    {
      kind: 'text',
      heading: 'Stablecoin supply trajectory',
      body: "Stablecoin supply has roughly followed an exponential curve, with one notable dip. The trajectory: ~$5B in early 2020, ~$30B by end of 2020 (a 6x increase in one year), ~$150B by end of 2021 (another 5x), then a crash to ~$125B through 2022 as the bear market, Terra/Luna collapse, and regulatory pressure drove redemptions. Recovery began in late 2023, reaching ~$210B by end of 2025 and crossing $320B+ by mid-2026. If the current growth rate holds — and that is a meaningful \"if\" given regulatory uncertainty and potential black-swan events — $500B+ in total stablecoin supply is plausible within 12-18 months. For context, that would put stablecoins at roughly 2% of US M2, still small in absolute terms but large enough to be systemically relevant to short-term credit markets, since most major stablecoins are backed primarily by US Treasury bills.",
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          {
            question: 'Why is the comparison between USDT daily settlement volume and Visa daily volume imperfect?',
            options: [
              'USDT operates on fewer blockchains than Visa operates in countries',
              'Visa settles in fiat while USDT settles in crypto, making the currencies incomparable',
              'USDT volume includes large institutional/OTC transfers while Visa primarily processes retail consumer payments, making them fundamentally different transaction types',
              'USDT transactions are irreversible while Visa transactions can be charged back',
            ],
            correctIndex: 2,
            explanation: 'USDT settlement volume is heavily skewed by large institutional and OTC transfers (single transactions of millions of dollars), while Visa processes billions of small retail consumer payments. The average transaction sizes and use cases are fundamentally different, so the raw daily volume comparison overstates how comparable they really are.',
          },
          {
            question: 'Why is Total Value Locked (TVL) considered a poor metric for measuring DeFi adoption?',
            options: [
              'TVL only counts assets on Ethereum and ignores other chains',
              'The same dollar can be counted multiple times through leverage, and TVL fluctuates with token prices rather than reflecting actual new capital entering the system',
              'TVL is calculated differently by each analytics provider, making it unreliable',
              'TVL does not account for the time value of money locked in protocols',
            ],
            correctIndex: 1,
            explanation: 'TVL is gameable through leverage (deposit ETH, borrow stablecoins, redeposit them — now the same capital is "locked" in multiple protocols). It also rises and falls with token prices even when no new money enters the system. Better metrics include protocol revenue, unique active addresses, and transaction count.',
          },
          {
            question: 'What makes crypto particularly competitive in the global remittance market?',
            options: [
              'Crypto transfers are anonymous, which appeals to remittance senders',
              'Blockchain technology is faster than the SWIFT network used by banks',
              'Traditional remittance corridors charge 6-8% fees on average, while stablecoin transfers can cost under 1%, creating a compelling cost advantage for cross-border payments',
              'Crypto remittances do not require the recipient to have a bank account',
            ],
            correctIndex: 2,
            explanation: 'In corridors like US-Mexico and US-Philippines, traditional remittance fees average 6-8%. Stablecoin transfers on networks like Stellar, Tron, or Solana settle for under 1% in total cost. For a $500 transfer, that is roughly $35 in fees via traditional channels versus $4 via stablecoins — a difference that matters enormously to migrant workers.',
          },
        ],
      },
    },
  ],
};

export default content;
