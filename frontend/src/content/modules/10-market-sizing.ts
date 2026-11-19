import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'market-sizing',
  number: '10',
  title: 'Market sizing',
  summary: 'Old money vs new money, by the actual numbers.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: "Coverage of digital assets can make it sound like it's already comparable in scale to the traditional financial system. It isn't, not yet. Seeing the real numbers side by side is the fastest way to calibrate how big this actually is today, versus how fast it's growing.",
    },
    {
      kind: 'text',
      heading: 'Payment volume: the surprise metric',
      body: "One comparison gets quoted a lot: stablecoins \"settle more than Visa\". It compares the wrong things. Gross on-chain stablecoin transfers in 2025 were roughly $28-35tn depending on who counts, but that total includes exchanges, trading bots, DeFi and people moving money between their own wallets. Genuine payments were about $390bn, a single McKinsey and Artemis estimate that the BIS and IMF later repeated. Visa\'s payments volume was $14.2tn in fiscal 2025, about $39bn a day, at an average of about $55 per processed transaction. Compare payments with payments: on that basis stablecoin payments are a few per cent of one card network. The Stablecoins topic draws the gap to one scale.",
    },
    {
      kind: 'scale',
      heading: 'Old money vs new money',
      data: {
        unit: 'USD',
        items: [
          { key: 'm2', label: 'US M2 money supply', value: 22800, color: '#7AA7D9', detail: 'Cash, checking deposits, savings, and other liquid assets in the US alone — Federal Reserve, April 2026.' },
          { key: 'stable', label: 'Global stablecoin supply', value: 286, color: '#E0726B', detail: 'USDT (about $175bn) and USDC (about $69bn) are 85% of it. DefiLlama, 17 November 2026; the peak was $312.9bn in May 2026.' },
          { key: 'defi', label: 'DeFi total value locked', value: 85, color: '#5FB3A3', detail: 'Volatile: ranged roughly $72-100B through H1 2026 depending on market conditions. Down from a $177B all-time high in 2021.' },
          { key: 'rwa', label: 'Tokenized real-world assets', value: 26, color: '#C792E8', detail: "Led by BlackRock's BUIDL and Circle's USYC — CoinLaw, June 2026." },
        ],
        note: "Even the largest \"new money\" category here, stablecoins, is roughly 1.4% the size of US M2 alone, before even counting the rest of the world's money supply. The honest read is that this is still a small, fast-growing layer sitting on top of (and occasionally siphoning from) a much larger traditional system, not a replacement for it yet.",
      },
    },
    {
      kind: 'text',
      heading: 'Why TVL is a poor metric',
      body: "Total Value Locked (TVL) is the most-cited DeFi metric, and also one of the most misleading. The core problem is that the same dollar can be counted multiple times through leverage. Deposit ETH into Aave, borrow stablecoins against it, deposit those stablecoins into Curve, then LP the Curve tokens in Convex, and your original capital is now \"locked\" in three or four protocols simultaneously. TVL counts all of it. This double- and triple-counting means TVL systematically overstates the actual capital committed to DeFi. It gets worse, because TVL also fluctuates with token prices, not just actual deposits. If ETH rises 30%, the TVL of every protocol holding ETH rises 30% too, even though no new capital entered the system. Better metrics exist but get less attention: protocol revenue (actual fees earned), unique active addresses (how many distinct wallets interact with the protocol), and transaction count (how much real usage is happening). None of these are perfect either, but they are harder to game than TVL.",
    },
    {
      kind: 'text',
      heading: 'Why direction matters more than size, for now',
      body: "Stablecoin supply grew from about $203bn at the end of 2024 to a peak of $312.9bn in May 2026, then fell to $286.4bn by 17 November 2026 (DefiLlama). For a digital assets lab, the size today matters less than the growth rate and where the growth is concentrated (EM remittances, institutional treasury use, DeFi collateral). All figures here will be stale within months, so treat the numbers as a snapshot of November 2026, not a permanent fact.\n\nInstitutional adoption tells a parallel story. The number of TradFi firms now offering crypto custody or trading has grown from a handful in 2020 to hundreds by 2026. BlackRock launched its tokenized money-market fund (BUIDL). Fidelity offers crypto custody and trading to retail clients. Major banks including BNY Mellon, Deutsche Bank, and Standard Chartered have crypto custody or trading desks. This is no longer a fringe experiment — when the world's largest asset manager is tokenizing treasury bills on Ethereum, the institutional signal is hard to dismiss.\n\nRemittances add another dimension. Remittances to low- and middle-income countries were about $729bn in 2025 (IFAD). Costs vary more by corridor than by technology: sending $200 from the US cost a median of about 3.7% to Mexico and 3.4% to the Philippines over 2022-2025, against a global average of 6.2% in early 2026. The IMF's 2026 study put a $200 stablecoin transfer at about 2% on average with the cheapest ramps and 3% with typical ones, and in about a third of corridors the cheapest traditional provider was cheaper. The blockchain leg is cheap; the on- and off-ramps are not. The unit economics are compelling enough that even legacy remittance companies like MoneyGram have integrated stablecoin rails.",
    },
    {
      kind: 'text',
      heading: 'Stablecoin supply trajectory',
      body: "Stablecoin supply has roughly followed an exponential curve, with one notable dip. The trajectory: ~$5B in early 2020, ~$30B by end of 2020 (a 6x increase in one year), ~$150B by end of 2021 (another 5x), then a crash to ~$125B through 2022 as the bear market, Terra/Luna collapse, and regulatory pressure drove redemptions. Recovery began in late 2023, reaching ~$210B by end of 2025 and crossing $320B+ by mid-2026. If the current growth rate holds, and that is a meaningful \"if\" given regulatory uncertainty and potential black-swan events, $500B+ in total stablecoin supply is plausible within 12-18 months. For context, that would put stablecoins at roughly 2% of US M2, still small in absolute terms but large enough to be systemically relevant to short-term credit markets, since most major stablecoins are backed primarily by US Treasury bills.\n\nThe numbers tell you how big this is. The next topic maps where it's happening — country by country, project by project.",
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
            explanation: 'TVL is gameable through leverage: deposit ETH, borrow stablecoins, redeposit them, and the same capital is "locked" in multiple protocols. It also rises and falls with token prices even when no new money enters the system. Better metrics include protocol revenue, unique active addresses, and transaction count.',
          },
          {
            question: 'What makes crypto particularly competitive in the global remittance market?',
            options: [
              'Crypto transfers are anonymous, which appeals to remittance senders',
              'Blockchain technology is faster than the SWIFT network used by banks',
              'In some corridors a stablecoin transfer is cheaper: the IMF found about 2% on average for $200 with the cheapest ramps, against a 6.2% global average for traditional remittances',
              'Crypto remittances do not require the recipient to have a bank account',
            ],
            correctIndex: 2,
            explanation: 'Costs depend on the corridor and especially on the on- and off-ramps. The IMF’s 2026 study found about 2% on average for a $200 stablecoin transfer with the cheapest ramps, but in about a third of corridors the cheapest traditional provider was cheaper. The global average for traditional remittances was 6.2% in early 2026.',
          },
        ],
      },
    },
  ],
};

export default content;
