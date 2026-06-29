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
          { question: 'How does an automated market maker (AMM) determine the price of an asset?', options: ['By matching buyer and seller orders in a limit order book', 'Algorithmically, based on the ratio of assets in a liquidity pool', 'Through a centralized oracle feed from traditional exchanges', 'By polling connected wallets for their latest trade prices'], correctIndex: 1, explanation: 'AMMs replace order books with liquidity pools and set prices algorithmically based on the pool\'s asset ratio.' },
          { question: 'What made the Euler Finance exploit possible?', options: ['A depeg in the underlying stablecoin collateral', 'A flash loan exploiting a missing liquidity check in the lending protocol', 'A compromised validator key on the Ethereum network', 'An insider transferring funds to an external wallet'], correctIndex: 1, explanation: 'The attacker used a flash loan to exploit a missing liquidity check in Euler\'s smart contract, extracting roughly $197 million.' },
          { question: 'Why does DeFi composability ("money legos") amplify systemic risk?', options: ['It requires all protocols to use the same programming language', 'It means protocols are stacked on each other, so one failure can cascade through shared liquidity', 'It forces users to deposit funds in a single custodian', 'It prevents protocols from being audited independently'], correctIndex: 1, explanation: 'Composability means protocols are interconnected through shared pools and positions, so damage from one failure spreads to protocols that never directly touched the failing component.' },
        ],
      },
    },
  ],
};

export default content;
