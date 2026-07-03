import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'dlt-basics',
  number: '04',
  title: 'DLT & blockchain basics',
  summary: 'Platform choice, consensus, finality and smart-contract controls for banking practitioners.',
  ready: true,
  updatedAt: '2026-07-03',
  changeType: 'expanded',
  changeSummary: 'Added banking-focused platform comparison, decision lens and smart-contract controls matrix.',
  blocks: [
    {
      kind: 'text',
      body: `"DLT" and "blockchain" are used interchangeably. They are not the same: a blockchain is one specific type of DLT where transactions are grouped into cryptographically linked blocks. The distinction matters less than what sits underneath: network membership rules, consensus mechanism, finality model and smart-contract capability.\n\nFor a bank, "which blockchain?" is the wrong first question. The better question is: what must be shared, who must see it, who can change it, what finality is needed, and which controls must remain off-chain. Those questions produce materially different answers for Ethereum, Solana, Hyperledger Besu and Canton. These are not interchangeable platforms — they solve different problems for different operating constraints.`,
    },
    {
      kind: 'stack',
      heading: 'The four building blocks',
      data: [
        { id: 'network', number: '01', label: 'Network', colorClass: 's1', detail: `A peer-to-peer set of computers (nodes), each holding a copy of the same ledger — no single central database.`, examples: 'Public: anyone can join · Permissioned: known participants only' },
        { id: 'consensus', number: '02', label: 'Consensus', colorClass: 's2', detail: `The rule nodes use to agree on which transactions are valid, without a central authority.`, examples: 'Proof of Work · Proof of Stake · permissioned voting' },
        { id: 'ledger', number: '03', label: 'Ledger / blocks', colorClass: 's3', detail: `Transactions are bundled into blocks; each block references the previous one, making the history tamper-evident.`, examples: 'This is the literal "chain" in blockchain' },
        { id: 'finality', number: '04', label: 'Finality', colorClass: 's4', detail: `The point at which a transaction is considered irreversible. This varies significantly by platform and consensus model — and is the single biggest practical difference from RTGS settlement.`, examples: 'See the Settlement topic for why this matters' },
      ],
      note: `These four elements exist simultaneously. The order is conceptual, not a process sequence.`,
    },
    {
      kind: 'matrix',
      heading: 'Comparing consensus mechanisms',
      data: {
        columns: ['Who validates', 'Throughput', 'Energy use', 'Example', 'Finality time'],
        items: [
          { id: 'pow', label: 'Proof of Work', color: '#E8A33D', values: ['Anyone with computing power', 'Low (~7 tx/sec for Bitcoin)', 'Very high', 'Bitcoin', '~60 min (6 blocks on Bitcoin)'] },
          { id: 'pos', label: 'Proof of Stake', color: '#5FB3A3', values: ['Validators who stake the native token', 'Higher. Ethereum L1: 15–65 tx/sec. Solana publishes a theoretical maximum of 65,000 tx/sec. Actual sustained throughput is lower. Both vary by network conditions.', 'Low', 'Ethereum, Solana', '~13 min on Ethereum (2 epochs); sub-second on Solana (~0.4s)'] },
          { id: 'permissioned', label: 'Permissioned / consortium', color: '#7AA7D9', values: ['Known, vetted participants only', 'High (typically thousands of tx/sec)', 'Low', 'Besu, Canton, Fabric, Corda', 'Immediate / sub-second (single round of consensus or notary)'] },
        ],
      },
    },
    {
      kind: 'matrix',
      heading: 'Platform comparison: what a banking team needs to know',
      data: {
        columns: ['Network model', 'Smart contracts / logic', 'Privacy / confidentiality', 'Finality', 'Banking fit / watch-outs'],
        items: [
          {
            id: 'ethereum',
            label: 'Ethereum',
            color: '#7AA7D9',
            values: [
              'Public permissionless. Any participant can validate or submit. Proof of Stake since September 2022. EVM-compatible tooling.',
              'General-purpose Solidity/EVM. ERC-20 standard for fungible tokens including stablecoins. Large developer base.',
              'Transparent by default. All transaction data is public on-chain. Confidentiality requires ZK-proofs or a confidential L2 design.',
              '~13 minutes (two epochs post-Merge). L2 rollups settle faster while anchoring finality to L1.',
              'Primary home for stablecoins and tokenised assets with broad wallet reach. AML controls, sanctions screening and key management must be applied at the application layer. Not suitable for confidential interbank flows without additional privacy architecture.',
            ],
          },
          {
            id: 'solana',
            label: 'Solana',
            color: '#C792E8',
            values: [
              'Public permissionless. Proof of Stake with Proof of History timestamp ordering. High-throughput design.',
              'Rust-based programs. Solana Pay addresses payment-specific use cases with memos and fee abstraction.',
              'Transparent by default. Same public on-chain exposure as Ethereum.',
              'Sub-second (~0.4s).',
              'High-throughput consumer and merchant stablecoin payments. Solana documentation reports over $1 trillion in stablecoin volume in 2025 — stablecoin volume is not the same as regulated bank payment adoption. Regulatory controls must be layered at the application level. Validator concentration and uptime history are watch-outs for institution-grade use.',
            ],
          },
          {
            id: 'besu',
            label: 'Hyperledger Besu',
            color: '#5FB3A3',
            values: [
              'Open-source Ethereum client (Java). Runs on public Ethereum or a private permissioned network with known participants. EVM-compatible.',
              'EVM / Solidity on private deployment. Existing Ethereum tooling works directly.',
              'Private transaction support via Tessera plugin. Confidential data is shared only with named parties; other network members do not see it.',
              'Immediate on IBFT2/QBFT consensus in permissioned deployments. No mining required.',
              'Bank-controlled Ethereum-compatible network. Network governance, membership management and upgrade process must be explicitly designed. A private Besu deployment does not automatically resolve legal-finality or data-protection questions.',
            ],
          },
          {
            id: 'canton',
            label: 'Canton',
            color: '#E8A33D',
            values: [
              'Permissioned. Canton protocol links Daml-based applications across organisations. Sub-transaction privacy is a first-class design goal.',
              'Daml (Digital Asset Modeling Language). Visibility and authorisation rules are explicit in the contract model — not added on top.',
              'Participants see only the data they are party to. Privacy is built into the data model rather than applied as a layer.',
              'Deterministic. Transaction is final when the synchronisation domain confirms counterparty agreement.',
              'Institutional financial workflows: DvP, margin, collateral, repo. Regulator visibility can be designed in without market-wide disclosure. Requires Daml expertise. Active in institutional pilots as of 2026. Not a public-liquidity venue.',
            ],
          },
          {
            id: 'fabric',
            label: 'Hyperledger Fabric',
            color: '#E0726B',
            values: [
              'Permissioned enterprise consortium. Known members and ordering service. Channel model isolates data between participant groups.',
              'Chaincode (Go, Node.js, Java). Channel-level data separation.',
              'Channels and private data collections for participant-level confidentiality.',
              'Immediate. Ordering service confirms; no probabilistic waiting.',
              'Enterprise consortium coordination. Not a token-liquidity venue. Several large trade-finance deployments have been wound down; consortium governance has proved harder than the technology.',
            ],
          },
          {
            id: 'corda',
            label: 'Corda',
            color: '#6B8CAE',
            values: [
              'Permissioned. Point-to-point messaging between participants — no global shared ledger. Data is shared only with transaction parties.',
              'CorDapps (Kotlin/Java). Designed to model bilateral and multilateral financial agreements.',
              'By design: only transaction parties and the notary see the data. Strong bilateral confidentiality model.',
              'Notary-based. Immediate when notary confirms.',
              'Bilateral and multilateral financial agreement modelling: FX settlement, securities settlement, syndicated lending. Less suited for broad token distribution or public-liquidity use cases.',
            ],
          },
        ],
      },
    },
    {
      kind: 'matrix',
      heading: 'Use-case decision lens: which platform pattern fits?',
      data: {
        columns: ['Likely platform pattern', 'Key constraint for regulated institutions'],
        items: [
          {
            id: 'public-liquidity',
            label: 'Public stablecoin liquidity / wallet reach',
            color: '#7AA7D9',
            values: [
              'Ethereum or L2',
              'AML and sanctions controls, key management and data-leakage discipline must be applied at the application layer. Broad wallet reach comes with full on-chain transparency.',
            ],
          },
          {
            id: 'high-throughput',
            label: 'High-throughput consumer / merchant stablecoin payments',
            color: '#C792E8',
            values: [
              'Solana-type public network',
              'Regulatory controls must be layered on. Stablecoin volume is not the same as regulated bank payment adoption. Public transparency applies.',
            ],
          },
          {
            id: 'bank-controlled',
            label: 'Bank-controlled Ethereum-compatible network',
            color: '#5FB3A3',
            values: [
              'Hyperledger Besu (private deployment)',
              'Network governance, membership management and upgrade process must be explicitly designed. Does not automatically resolve legal-finality or data-protection questions.',
            ],
          },
          {
            id: 'institutional-privacy',
            label: 'Institutional privacy and multiparty financial workflows',
            color: '#E8A33D',
            values: [
              'Canton',
              'Daml expertise required. Privacy is by design, but regulator access must also be designed in. Active in pilots as of 2026; not yet proven at public-market scale.',
            ],
          },
          {
            id: 'bilateral',
            label: 'Bilateral / multilateral financial agreement modelling',
            color: '#6B8CAE',
            values: [
              'Corda-style design',
              'Point-to-point model is strong for bilateral confidentiality but not suited for broad token distribution or public-liquidity use cases.',
            ],
          },
          {
            id: 'consortium',
            label: 'Permissioned enterprise consortium coordination',
            color: '#E0726B',
            values: [
              'Hyperledger Fabric',
              'Consortium governance is harder than the technology. Several major deployments have been wound down. Not a stablecoin or token-liquidity venue.',
            ],
          },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'Ethereum for banking readers',
      body: `An Ethereum account is an address with a balance and a transaction count (nonce). Smart contracts are also addresses. A transaction specifies the recipient, amount and a gas fee — the amount paid to validators to include it. Gas prices fluctuate with network demand: fees on Ethereum L1 have ranged from under $0.50 to over $50 during congestion. On L2s, fees are typically under $0.01.\n\nValidators bundle transactions into blocks. After two epochs (~13 minutes post-Merge), the block reaches finality. ERC-20 defines the standard interface for fungible tokens — stablecoins such as USDC on Ethereum follow this standard.\n\nL2 rollups process transactions off Ethereum's main chain and post proofs back to L1. Optimistic rollups (Arbitrum, Optimism) assume validity and allow a challenge window. ZK-rollups (zkSync, StarkNet) use zero-knowledge proofs to verify correctness cryptographically. L2s handle significantly higher throughput at sub-cent costs while inheriting L1 security. As of 2024, more transaction volume was processed through Ethereum L2s than L1 directly. The throughput and cost objection to Ethereum applies to L1 specifically.\n\nFor a bank, Ethereum's value is reach and tooling depth. The operational requirements are key management, sanctions screening, smart-contract auditing, data-leakage monitoring and oracle governance. Those are not unique to Ethereum, but Ethereum's public transparency makes them more consequential than on a permissioned network.`,
    },
    {
      kind: 'text',
      heading: 'Smart contracts are executable rules, not legal contracts',
      body: `A smart contract executes automatically when predefined conditions are met, running on-chain rather than on any single party's server. For financial applications this enables transfer restrictions, conditional settlement, automated collateral management and token lifecycle controls. The rules are enforced by code: a sanctions blocklist check fires on every transfer whether or not a human intervenes.\n\nThis does not make smart contracts legal agreements. A smart contract cannot interpret ambiguous terms, exercise discretion or be adjudicated. The legal agreement sits off-chain. The smart contract enforces a specific, bounded subset of it.\n\nSmart contract bugs are expensive and irreversible: the 2016 DAO exploit drained $60M by re-calling a withdrawal function before the balance updated. Deployed code executes with the same authority whether the logic is correct or not. Where the on-chain boundary sits determines where the operational risk is concentrated.`,
    },
    {
      kind: 'matrix',
      heading: 'Smart contracts as operational controls: on-chain vs off-chain',
      data: {
        columns: ['What the on-chain rule can do', 'What must remain off-chain', 'Main control risk'],
        items: [
          {
            id: 'transfer-restriction',
            label: 'Transfer restriction',
            color: '#7AA7D9',
            values: [
              'Allowlist check at point of transfer. Token moves only if the recipient is on the approved list.',
              'KYC/AML decisions, list curation, onboarding, offboarding and exceptions handling.',
              'Stale or incomplete list: transfer permitted to an address that should be blocked, or blocked for one that should be permitted.',
            ],
          },
          {
            id: 'settlement-condition',
            label: 'Settlement condition',
            color: '#5FB3A3',
            values: [
              'Condition-based fund release (e.g. delivery confirmation triggers payment).',
              'Legal confirmation of delivery, dispute resolution, counterparty verification, fallback procedures.',
              'Oracle dependency: the condition trigger is fed by an external data source that can fail, lag or be manipulated.',
            ],
          },
          {
            id: 'collateral-movement',
            label: 'Collateral movement',
            color: '#E8A33D',
            values: [
              'Automated collateral call and transfer on margin breach (price falls below threshold, collateral moves to lender).',
              'Valuation methodology, model validation, legal netting agreement, dispute process.',
              'Oracle dependency on the price feed. Liquidation governance: who decides timing and scale.',
            ],
          },
          {
            id: 'sanctions-block',
            label: 'Sanctions block',
            color: '#E0726B',
            values: [
              'Blocklist of designated addresses; transfer to a blocklisted address reverts automatically.',
              'Sanctions list curation (OFAC, HMT, UN), chain analytics, designation updates.',
              'Lag between a new designation and the on-chain update. Indirect exposure through intermediate addresses requires off-chain analytics.',
            ],
          },
          {
            id: 'token-lifecycle',
            label: 'Token lifecycle (mint / burn / pause)',
            color: '#C792E8',
            values: [
              'Role-based permissions to mint, burn or pause all transfers.',
              'Governance of admin roles, approval authority, upgrade authorisation.',
              'Admin key compromise. Unauthorised minting, burning or pausing. Key-custodian failure.',
            ],
          },
          {
            id: 'emergency-pause',
            label: 'Emergency pause',
            color: '#6B8CAE',
            values: [
              'Pause function callable by a designated role; halts all transfers instantly.',
              'Decision authority, escalation process, recovery procedure and resumption criteria.',
              'Misuse as a censorship tool. Circuit-breaker must be operable in stress. Resumption must be governed as carefully as the pause itself.',
            ],
          },
        ],
      },
    },
    {
      kind: 'callout',
      heading: 'Privacy on public chains: the market-leakage problem',
      data: {
        tone: 'strategy',
        body: `Public blockchains expose transaction data by default — balances, transfer amounts, contract calls and timing are visible to any participant. For a regulated institution, the concern is not hiding activity from regulators. Regulator visibility is non-negotiable. The concern is market leakage: a counterparty running a node on a public chain can observe position sizes, settlement timing and flow patterns before any trade is legally final.\n\nPermissioned networks, zero-knowledge proofs and confidential transaction models address the market-leakage problem without removing regulatory access. The principle: the bank does not need secrecy from regulators, but it does need confidentiality from the market.\n\nFor detailed treatment, see the Privacy & Data topic.`,
      },
    },
    {
      kind: 'text',
      heading: 'Why finality is the detail that matters most',
      body: `In RTGS systems like CHAPS, settlement is immediate and irrevocable. On public blockchains, finality is often probabilistic: a transaction becomes progressively less likely to reverse as more blocks accumulate on top. Bitcoin reaches practical finality after six confirmations (~60 minutes). Ethereum after two epochs (~13 minutes post-Merge). Solana sub-second (~0.4s). Permissioned networks — Besu, Canton, Corda — offer immediate finality once consensus or the notary confirms.\n\nThe gap between public-chain technical finality and RTGS settlement is narrowing. Legal and operational finality are separate questions from technical confirmation. For atomic settlement — settling both legs of a trade simultaneously — this distinction is critical. See the Settlement topic.`,
    },
    {
      kind: 'case',
      heading: 'Ethereum\'s Merge: the largest live consensus change',
      data: {
        title: 'The Merge: Ethereum\'s switch from Proof of Work to Proof of Stake',
        dateRange: 'September 2022',
        whatHappened: `On 15 September 2022, Ethereum switched its consensus mechanism from Proof of Work to Proof of Stake on a live network securing over $30B in value. The transition merged Ethereum's execution layer with a new Proof of Stake consensus layer (the Beacon Chain, running since December 2020). The Merge reduced Ethereum's energy consumption by approximately 99.95% and changed the validator model from miners (competing with computing power) to stakers (locking ETH as collateral). No transactions were lost and no downtime occurred.`,
        whyItMatters: `The Merge demonstrated that a major blockchain can change its consensus mechanism on a live system — the rough equivalent of changing an aircraft's engines in flight. It also resolved the institutional objection to Ethereum's energy use. For financial infrastructure, the governance precedent matters: if a network's rules can be upgraded on a live system, how those upgrades are governed becomes a material question for any institution relying on shared DLT infrastructure.`,
        source: 'Ethereum Foundation',
        sourceUrl: 'https://ethereum.org/en/roadmap/merge/',
        verifiedAsOf: 'September 2022',
      },
    },
    {
      kind: 'text',
      body: `With these platform and control foundations in place, the next topic covers what actually runs on these networks — the different categories of crypto assets and why they exist.`,
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          {
            question: 'A bank is building a tokenised securities settlement system requiring bilateral confidentiality and immediate finality. Which platform pattern best fits?',
            options: [
              'Public Ethereum, because it has the largest developer base',
              'Solana, because it has sub-second finality and high throughput',
              'Corda or Canton-style permissioned network, designed for bilateral confidentiality and deterministic finality',
              'Proof of Work, because it is the most established consensus mechanism',
            ],
            correctIndex: 2,
            explanation: 'Corda and Canton are designed for bilateral/multilateral confidentiality and deterministic finality — directly matching institutional securities settlement requirements. Public chains expose transaction data by default, which creates market-leakage risk in a settlement context.',
          },
          {
            question: 'On a tokenised-asset platform, which of the following should remain off-chain?',
            options: [
              'Allowlist check at point of transfer',
              'Automated settlement-condition trigger',
              'Sanctions list curation, KYC/AML decisions and exceptions handling',
              'Token mint/burn permission logic',
            ],
            correctIndex: 2,
            explanation: 'On-chain smart contracts can enforce allowlist checks, condition triggers and mint/burn permissions. The decisions behind those controls — sanctions list curation, KYC adjudication, exceptions handling — require human judgement and legal accountability and must remain off-chain.',
          },
          {
            question: 'What does Ethereum\'s Merge (September 2022) establish as a precedent for financial infrastructure?',
            options: [
              'That Ethereum is now equivalent to an RTGS system',
              'That consensus mechanism upgrades can be performed on a live network, making upgrade governance a material question for any institution relying on shared DLT infrastructure',
              'That Proof of Stake is always more secure than Proof of Work',
              'That smart contracts became available on Ethereum for the first time after the Merge',
            ],
            correctIndex: 1,
            explanation: 'The Merge demonstrated that fundamental protocol changes can be made without downtime — but it also means that any institution relying on shared DLT infrastructure must treat governance of future upgrades as an operational and contractual risk.',
          },
        ],
      },
    },
  ],
};

export default content;
