import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'defi',
  number: '09',
  title: 'DeFi',
  summary: 'Lending, AMMs, derivatives \u2014 finance as code.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `DeFi ("decentralized finance") rebuilds familiar banking functions \u2014 lending, trading, derivatives \u2014 as smart contracts instead of institutions. No loan officer, no exchange operator, no central counterparty; the rules are just code, running the same way for everyone.`,
    },
    {
      kind: 'stack',
      heading: 'The four building blocks',
      data: [
        { id: 'amm', number: '01', label: 'AMMs / DEXs', colorClass: 's1', detail: `Automated market makers replace an order book with a pool of two assets; price is set algorithmically by the pool's ratio, not by matching buyers and sellers directly.`, examples: 'Uniswap, Curve' },
        { id: 'lending', number: '02', label: 'Lending / borrowing', colorClass: 's2', detail: `Algorithmic money markets \u2014 deposit an asset to earn interest, or post collateral to borrow another asset, with rates set by supply and demand in the pool.`, examples: 'Aave, Compound, Euler' },
        { id: 'derivatives', number: '03', label: 'Derivatives', colorClass: 's3', detail: `Perpetual futures and options, fully on-chain \u2014 same instruments as traditional derivatives desks, settled by smart contracts instead of a clearinghouse.`, examples: 'GMX, dYdX' },
        { id: 'staking', number: '04', label: 'Staking / yield', colorClass: 's4', detail: `Locking assets to help secure a network (in Proof-of-Stake chains) or provide liquidity to a pool, earning a share of fees or rewards in return.`, examples: 'Ethereum staking, liquidity provision' },
      ],
      note: `These compose with each other \u2014 a lending position's collateral can come from a staking receipt, which itself trades on a DEX. This stacking is sometimes called "money legos," and it's exactly why risk spreads so fast when one piece breaks.`,
    },
    {
      kind: 'text',
      heading: 'How DeFi protocols actually make money',
      body: `DeFi protocols generate revenue from four main sources. First, trading fees: Uniswap charges 0.3% on every swap, split between liquidity providers (who supply the pool's assets) and the protocol treasury. Second, interest spread: lending protocols like Aave take a cut of the interest borrowers pay\u2014depositors earn most of the rate, but a slice goes to the protocol. Third, liquidation fees: when a borrower's collateral drops below the required threshold, liquidators repay the debt and seize the collateral at a discount, and the protocol collects a fee on this process. Fourth, flash loan fees: Aave charges 0.09% on flash loans, which are borrowed and repaid in a single transaction. These revenue streams are what separate functioning DeFi protocols from empty token-incentive schemes.`,
    },
    {
      kind: 'text',
      heading: 'Real yield vs token inflation',
      body: `Most of the eye-popping DeFi yields in 2021\u2014APYs of 1,000% or higher\u2014were not coming from actual economic activity. Protocols were printing governance tokens and distributing them to liquidity providers as incentives, a practice called yield farming. The yields looked enormous in dollar terms only because the governance tokens had speculative value. When token prices crashed in 2022, the yields evaporated and liquidity fled. The protocols had been paying depositors with newly minted tokens that diluted existing holders\u2014inflation, not revenue. The correction led to "real yield" as a design goal: protocols like GMX distribute trading fees in ETH (not a native governance token), meaning the yield comes from actual user activity. If no one trades, there is no yield. That is the structural difference\u2014real yield scales with usage, inflationary yield scales with token printing and collapses when sentiment turns.`,
    },
    {
      kind: 'text',
      heading: 'MEV: the invisible tax',
      body: `Maximal extractable value (MEV) is the profit that validators or block builders can capture by reordering, inserting, or censoring transactions within a block. The most common form is the sandwich attack: a bot spots a large pending swap, places a buy order just before it (front-running) and a sell order just after it (back-running), profiting from the price impact the victim's trade creates. Other forms include arbitrage extraction (instantly correcting price differences across DEXs) and liquidation sniping (racing to liquidate undercollateralized positions for the fee). Cumulative MEV extracted on Ethereum exceeds $600 million. This is not a bug\u2014it is a structural consequence of transparent mempools and block-level transaction ordering. Flashbots emerged as a partial mitigation, creating a private channel for transaction submission that reduces the harm of public mempool front-running. MEV-Share goes further by redistributing some extracted value back to users. But MEV remains an ongoing cost of using DeFi\u2014an invisible tax embedded in nearly every on-chain transaction.`,
    },
    {
      kind: 'text',
      heading: 'Oracle manipulation',
      body: `DeFi lending protocols need to know what assets are worth to decide whether a loan is sufficiently collateralized. They get this information from price oracles\u2014services like Chainlink or Pyth that aggregate prices from multiple sources and publish them on-chain. The risk: if an attacker can temporarily distort the price an oracle reports, they can trick a lending protocol into thinking collateral is worth more than it actually is, borrow against the inflated value, and walk away with the difference. The Mango Markets exploit (October 2022, $114 million) is the textbook case. The attacker pumped the price of MNGO\u2014a thinly traded token\u2014on Mango's own platform, inflating the oracle price. They then used their artificially inflated MNGO holdings as collateral to borrow every available asset on the platform. Defending against this requires oracles that use time-weighted average prices (TWAPs) instead of spot prices, multiple independent price sources, and circuit breakers that pause lending when prices move abnormally fast.`,
    },
    {
      kind: 'text',
      heading: 'Institutional DeFi',
      body: `Traditional financial institutions want DeFi yields but cannot operate in fully permissionless environments\u2014compliance requirements (KYC, AML) prohibit it. The response has been "walled garden" DeFi: permissioned pools that restrict participation to verified entities. Aave Arc launched as a permissioned version of Aave where every participant must pass KYC through Fireblocks, a regulated custodian. Only whitelisted addresses can deposit or borrow, but the underlying smart contracts are the same as permissionless Aave\u2014same yield mechanics, same liquidation logic, just with an access-control layer on top. Singapore's Project Guardian (a collaboration between the Monetary Authority of Singapore and major banks including JPMorgan and DBS) explored institutional DeFi by testing tokenized bond and foreign exchange transactions on permissioned DeFi protocols. The broader trend points toward a two-track DeFi ecosystem: permissionless protocols for retail and crypto-native participants, and permissioned forks of the same protocols for institutions that need compliance guardrails. Whether these two tracks eventually merge or remain separate is one of DeFi's open structural questions.`,
    },
    {
      kind: 'case',
      heading: 'When composability becomes a liability: Euler Finance',
      data: {
        title: 'Euler Finance flash loan exploit',
        dateRange: '13 March 2023 (resolved by early April 2023)',
        whatHappened: `An attacker used a flash loan \u2014 a loan that must be borrowed and repaid within a single transaction \u2014 to exploit a missing liquidity check in Euler's lending protocol, extracting roughly $197 million in assets. Unusually, the attacker returned essentially all recoverable funds (around $240 million, including appreciation) within about three weeks, after negotiation with the Euler team.`,
        whyItMatters: `Flash loans only exist because DeFi protocols are composable \u2014 you can borrow a huge sum with zero collateral as long as you repay it in the same transaction, which is exactly the property attackers exploit to manipulate a protocol's internal logic. It's the sharpest illustration of the "money legos" tradeoff: composability creates real innovation and real attack surface from the same source.`,
        source: 'Chainalysis incident analysis; Euler Labs official recovery writeup',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'text',
      heading: 'The contagion pattern',
      body: `Module 06's Terra/UST collapse and this module's Euler exploit are different failure types \u2014 a stabilization mechanism breaking versus a smart contract bug \u2014 but both spread further than their origin because DeFi protocols are stacked on top of each other. When Terra fell, the damage reached protocols that had never touched UST directly, simply because they shared liquidity pools or bridges with something that did. That's the structural cost of composability, and it's a recurring theme through Module 16 (Failure modes).`,
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'What distinguishes "real yield" from inflationary DeFi yield?', options: ['Real yield is denominated in stablecoins, while inflationary yield is denominated in ETH', 'Real yield comes from actual protocol revenue (fees), while inflationary yield comes from newly minted governance tokens', 'Real yield requires KYC verification, while inflationary yield is permissionless', 'Real yield is only available on Layer 2 networks'], correctIndex: 1, explanation: 'Real yield is backed by actual economic activity--trading fees, interest, liquidation fees--while inflationary yield relies on printing new governance tokens, which dilute existing holders and collapse when token prices fall.' },
          { question: 'What is MEV (maximal extractable value)?', options: ['The maximum amount of collateral a borrower can post on a lending protocol', 'The total value locked in a DeFi protocol across all pools', 'The profit validators or block builders can extract by reordering, inserting, or censoring transactions within a block', 'The fee charged by oracles for providing on-chain price data'], correctIndex: 2, explanation: 'MEV is the profit that comes from controlling transaction ordering within a block. Validators and block builders can front-run trades, extract arbitrage, and snipe liquidations--an invisible tax on DeFi users.' },
          { question: 'Why is oracle manipulation a risk for DeFi lending protocols?', options: ['Oracles can freeze all transactions on a blockchain if they report incorrect prices', 'Lending protocols rely on price oracles to value collateral, and manipulating these prices can make collateral appear worth more than it is, enabling attackers to drain funds', 'Oracle manipulation only affects stablecoin protocols and has no impact on lending', 'Oracles set interest rates directly, so manipulation changes borrowing costs'], correctIndex: 1, explanation: 'Lending protocols use oracle prices to determine whether loans are sufficiently collateralized. If an attacker inflates the oracle price of their collateral, they can borrow more than the collateral is actually worth and walk away with the excess.' },
        ],
      },
    },
  ],
};

export default content;
