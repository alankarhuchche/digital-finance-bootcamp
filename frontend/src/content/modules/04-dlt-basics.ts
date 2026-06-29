import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'dlt-basics',
  number: '04',
  title: 'DLT & blockchain basics',
  summary: 'Ledgers, consensus, and why finality matters.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `\u201cDLT\u201d (distributed ledger technology) and \u201cblockchain\u201d get used almost interchangeably. A blockchain is one specific kind of DLT \u2014 a ledger where transactions are bundled into blocks, each cryptographically linked to the one before it. What actually matters for everything downstream isn\u2019t the buzzword, it\u2019s four building blocks underneath it. This topic covers the four building blocks underneath, then goes deeper into the architectural decisions \u2014 permissioned vs. public, consensus trade-offs, smart contracts, and Layer 2 scaling \u2014 that determine whether a given DLT is suitable for financial markets.`,
    },
    {
      kind: 'stack',
      heading: 'The four building blocks',
      data: [
        { id: 'network', number: '01', label: 'Network', colorClass: 's1', detail: `A peer-to-peer set of computers (nodes), each holding a copy of the same ledger \u2014 no single central database.`, examples: 'Public: anyone can join \u00b7 Permissioned: known participants only' },
        { id: 'consensus', number: '02', label: 'Consensus', colorClass: 's2', detail: `The rule nodes use to agree on which transactions are valid, without a central authority deciding for them.`, examples: 'Proof of Work \u00b7 Proof of Stake \u00b7 permissioned voting' },
        { id: 'ledger', number: '03', label: 'Ledger / blocks', colorClass: 's3', detail: `Transactions get bundled into blocks; each block references the previous one, making the history tamper-evident.`, examples: 'This is the literal \u201cchain\u201d in blockchain' },
        { id: 'finality', number: '04', label: 'Finality', colorClass: 's4', detail: `The point at which a transaction is considered irreversible. This varies a lot by chain and consensus method \u2014 and it\u2019s the single biggest practical difference from RTGS settlement.`, examples: 'See the Settlement topic for why this matters' },
      ],
      note: `This ordering is conceptual, not a money-flow sequence like the ecosystem stack in earlier discussions \u2014 these four things exist simultaneously, each enabling the next.`,
    },
    {
      kind: 'matrix',
      heading: 'Comparing consensus mechanisms',
      data: {
        columns: ['Who validates', 'Throughput', 'Energy use', 'Example', 'Finality time'],
        items: [
          { id: 'pow', label: 'Proof of Work', color: '#E8A33D', values: ['Anyone with computing power', 'Low (~7 tx/sec for Bitcoin)', 'Very high', 'Bitcoin', '~60 min (6 blocks on Bitcoin)'] },
          { id: 'pos', label: 'Proof of Stake', color: '#5FB3A3', values: ['Validators who stake the native token', 'Higher (15\u201365 tx/sec on Ethereum L1; 400\u201365,000 on Solana)', 'Low', 'Ethereum, Solana', '~13 min on Ethereum (2 epochs); ~0.4s on Solana'] },
          { id: 'permissioned', label: 'Permissioned / consortium', color: '#7AA7D9', values: ['Known, vetted participants only', 'High (1,000s\u201310,000s tx/sec)', 'Low', 'Corda, Canton', 'Instant / sub-second (single round of voting)'] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'Permissioned vs. public: the architectural decision',
      body: `For financial institutions, the permissioned-vs-public choice is not a technical detail \u2014 it\u2019s the foundational design decision. Public chains (Ethereum, Solana, Bitcoin) are open: anyone can validate, anyone can submit transactions, and the ledger is fully transparent. Permissioned chains (Corda, Canton, Hyperledger Fabric) restrict participation to known, vetted entities. Banks almost universally choose permissioned chains for three reasons: regulatory compliance (know your validator), privacy (transaction data not visible to the world), and performance (no need for energy-intensive consensus when participants are already identified). Corda, built by R3 specifically for financial services, uses a \u2018notary\u2019 model where only transaction participants and a designated notary see the data \u2014 not every node on the network. Canton (by Digital Asset) takes a similar approach with its DAML smart contract language, emphasizing sub-transaction privacy. The trade-off: permissioned chains sacrifice the censorship resistance and open composability that make public chains attractive for DeFi.`,
    },
    {
      kind: 'text',
      heading: 'Smart contracts: programmable money, programmable risk',
      body: `A smart contract is code that executes automatically when predefined conditions are met, running on the blockchain itself rather than on any single party\u2019s server. In financial contexts, this enables conditional payments (release funds when goods are delivered), automated collateral management (liquidate a position if its value drops below a threshold), and programmable compliance (block transfers to sanctioned addresses). Ethereum introduced general-purpose smart contracts in 2015; Solidity is the primary language. On permissioned chains, DAML (Canton) and CorDapp (Corda) serve the same function. The risk: smart contract bugs are expensive. The 2016 DAO hack exploited a re-entrancy bug to drain $60M. In DeFi, smart contract exploits have cost over $3B since 2020. For regulated financial institutions, the question is not whether smart contracts are useful \u2014 it\u2019s whether the code can be audited, tested, and governed to the same standard as traditional legal contracts. This is the foundation for the Tokenization and DeFi topics.`,
    },
    {
      kind: 'text',
      heading: 'What a transaction actually looks like',
      body: `On Ethereum: you sign a transaction with your private key specifying the recipient, amount, and a \u2018gas\u2019 fee (the price you pay validators to include your transaction). The transaction enters the mempool \u2014 a waiting area of unconfirmed transactions. Validators select transactions from the mempool (generally prioritizing higher gas fees), bundle them into a block (~150\u2013200 transactions per block on Ethereum), and propose the block to the network. Other validators attest to the block\u2019s validity. After two epochs (~13 minutes), the block reaches finality. Your gas fee (typically $0.50\u2013$5.00 on Ethereum L1, under $0.01 on Layer 2s) compensates validators. On a permissioned chain like Corda, the process is simpler: you propose a transaction to the relevant counterparty and the notary; the notary checks for double-spending, signs it, and it\u2019s final \u2014 no mempool, no gas fee, no waiting for block confirmation.`,
    },
    {
      kind: 'text',
      heading: 'Layer 2 and rollups: where activity is actually moving',
      body: `Ethereum\u2019s base layer (Layer 1) processes ~15\u201365 transactions per second at $0.50\u2013$5.00 per transaction. This is too slow and too expensive for most financial applications. Layer 2 (L2) solutions solve this by processing transactions off the main chain and periodically posting compressed proofs back to L1. There are two main types: optimistic rollups (Arbitrum, Optimism) assume transactions are valid and allow a challenge window, while ZK-rollups (zkSync, StarkNet) use zero-knowledge proofs to cryptographically verify correctness. L2s can process thousands of transactions per second at sub-cent costs while inheriting Ethereum\u2019s security guarantees. As of 2024, more transaction value flows through Ethereum L2s than on L1 itself. For financial institutions evaluating DLT, this matters because the \u2018Ethereum is too slow/expensive\u2019 objection is increasingly about L1 specifically, not the ecosystem as a whole.`,
    },
    {
      kind: 'text',
      heading: 'Why finality is the detail that matters most',
      body: `In RTGS systems like CHAPS, settlement is immediate and irrevocable the moment it happens \u2014 that\u2019s the whole point of central bank money. On many public blockchains, \u201cfinality\u201d is probabilistic: a transaction becomes progressively less likely to be reversed as more blocks are added on top of it, rather than being instantly absolute. This single difference is what makes atomic, simultaneous settlement of two legs of a trade (covered in the Settlement topic) a genuinely hard problem, not a solved one. Specific finality times: Bitcoin achieves practical finality after 6 block confirmations (~60 minutes). Ethereum reaches finality after 2 epochs (~13 minutes) since the Merge. Solana achieves finality in ~0.4 seconds. Permissioned chains like Corda and Canton offer instant finality \u2014 once the notary signs, the transaction is final. Compare this to CHAPS, which also offers immediate finality but only during operating hours and only in sterling. The finality gap between public chains and RTGS is narrowing, but it\u2019s not closed.`,
    },
    {
      kind: 'case',
      heading: 'Ethereum\u2019s Merge: the largest live consensus change',
      data: {
        title: 'The Merge: Ethereum\u2019s switch from Proof of Work to Proof of Stake',
        dateRange: 'September 2022',
        whatHappened: 'On 15 September 2022, Ethereum completed \u201cThe Merge\u201d \u2014 switching its consensus mechanism from Proof of Work to Proof of Stake on a live network securing over $30B in value. The transition had been planned for years and involved merging Ethereum\u2019s existing execution layer with a new Proof of Stake consensus layer (the Beacon Chain, running since December 2020). The Merge reduced Ethereum\u2019s energy consumption by ~99.95% and changed the validator model from miners (who competed using computing power) to stakers (who lock ETH as collateral). No transactions were lost, no downtime occurred, and the network continued producing blocks throughout.',
        whyItMatters: 'The Merge demonstrated that a major blockchain can fundamentally change its consensus mechanism without disruption \u2014 the equivalent of replacing an aircraft\u2019s engines mid-flight. It also eliminated the \u2018Ethereum wastes energy\u2019 objection that had been a barrier to institutional adoption. For financial infrastructure, the precedent matters: if a network\u2019s rules can be upgraded live, governance and upgrade processes become critical questions for any institution building on shared DLT infrastructure.',
        source: 'Ethereum Foundation',
        sourceUrl: 'https://ethereum.org/en/roadmap/merge/',
        verifiedAsOf: 'September 2022',
      },
    },
    {
      kind: 'text',
      body: `With the technology foundations in place, the next topic looks at what actually runs on these blockchains — the different categories of crypto assets and why they exist.`,
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'Why do banks almost universally choose permissioned blockchains over public ones?', options: ['Permissioned chains are more decentralized', 'Regulatory compliance, privacy, and performance requirements are easier to meet with known participants', 'Public chains do not support smart contracts', 'Permissioned chains have better token economics'], correctIndex: 1, explanation: 'Banks need to know their validators (regulatory compliance), keep transaction data private, and achieve high throughput \u2014 all easier with permissioned, known participants.' },
          { question: 'What is a Layer 2 rollup?', options: ['A second blockchain unrelated to the first', 'A solution that processes transactions off-chain and posts compressed proofs back to Layer 1 for security', 'A consensus mechanism that replaces Proof of Stake', 'A type of stablecoin that operates on two chains simultaneously'], correctIndex: 1, explanation: 'Layer 2 rollups process transactions off the main chain and periodically post proofs to L1, achieving higher throughput and lower costs while inheriting L1 security.' },
          { question: 'What did Ethereum\u2019s Merge accomplish in September 2022?', options: ['It merged Ethereum with Bitcoin into a single chain', 'It switched Ethereum from Proof of Work to Proof of Stake, reducing energy use by ~99.95%', 'It doubled Ethereum\u2019s block size to increase throughput', 'It introduced smart contracts to Ethereum for the first time'], correctIndex: 1, explanation: 'The Merge switched Ethereum\u2019s consensus from energy-intensive Proof of Work to Proof of Stake, eliminating mining and reducing energy consumption by approximately 99.95%.' },
        ],
      },
    },
  ],
};

export default content;
