import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'privacy',
  number: '20',
  title: 'Privacy & data',
  summary: 'Why commercial confidentiality, selective disclosure and regulator visibility matter for institutions using DLT, stablecoins and tokenised assets.',
  ready: true,
  updatedAt: '2026-07-03',
  changeType: 'expanded',
  changeSummary: 'Added institutional confidentiality and selective disclosure models.',
  blocks: [
    {
      kind: 'text',
      body: `Privacy is not anonymity. In digital finance the two are often conflated — but for regulated institutions they describe entirely different problems.\n\nAnonymity means identity cannot be established. Regulated institutions do not need that. They need confidentiality: the ability to protect customer data, positions, flows and commercial strategy from market-wide disclosure while preserving the visibility that regulators, auditors and law enforcement legitimately require.\n\nPublic blockchains create a specific version of this problem. Every transaction is visible to every participant by design. A counterparty running a node can observe settlement timing, position sizes and client flows before any trade is legally final. That is a market-leakage risk, not a privacy preference. The bank does not need secrecy from regulators, but it does need confidentiality from the market.`,
    },
    {
      kind: 'matrix',
      heading: 'Privacy by payment method — who can see what',
      data: {
        columns: ['Who sees the transaction', 'What they see', 'Can it be linked to your identity?'],
        items: [
          { id: 'cash', label: 'Physical cash', color: '#E8A33D', values: ['Nobody', 'Nothing — cash leaves no record', 'No — fully anonymous'] },
          { id: 'card', label: 'Card payment', color: '#7AA7D9', values: ['Your bank, the merchant\'s bank, the card scheme, the merchant', 'Amount, time, merchant name, your identity', 'Yes — directly linked via your bank account'] },
          { id: 'bitcoin', label: 'Bitcoin / public blockchain', color: '#5FB3A3', values: ['Everyone — the ledger is public', 'Amount, sender/receiver addresses, time', 'Pseudonymous — not directly, but chain analytics firms can link addresses to identities with high accuracy for exchange-linked addresses'] },
          { id: 'cbdc', label: 'CBDC (as typically designed)', color: '#C792E8', values: ['The central bank (issuer), possibly intermediaries', 'Depends entirely on the design — could range from card-level visibility to near-cash privacy', 'Depends on design — the privacy model is a policy choice, not a technical constraint'] },
        ],
      },
    },
    {
      kind: 'matrix',
      heading: 'Stakeholder confidentiality: who needs what, and from whom',
      data: {
        columns: ['What they may need to see', 'What they should not see', 'Why it matters', 'Control implication'],
        items: [
          {
            id: 'customer',
            label: 'Customer',
            color: '#E8A33D',
            values: [
              'Own transactions, balances and statements.',
              'Other customers\' data; bank positions; counterparty flows.',
              'Data protection law (GDPR/UK GDPR); customer duty; fair treatment.',
              'Off-chain identity records; customer-level permissioning; privacy notices and lawful basis documentation.',
            ],
          },
          {
            id: 'bank',
            label: 'Bank',
            color: '#7AA7D9',
            values: [
              'All transactions it is party to; AML screening data; counterparty exposure under agreed terms.',
              'Information it has no contractual need for; other institutions\' client positions.',
              'Information barriers; conflict of interest controls; regulatory need-to-know principle.',
              'Need-to-know access controls; data minimisation; information barrier governance.',
            ],
          },
          {
            id: 'counterparty',
            label: 'Counterparty',
            color: '#5FB3A3',
            values: [
              'Its own positions and agreed trade confirmations.',
              'Other clients\' flows; the bank\'s order book or commercial strategy.',
              'Market-abuse risk; front-running exposure; commercial confidentiality.',
              'Bilateral visibility model; point-to-point design; permissioned state sharing.',
            ],
          },
          {
            id: 'regulator',
            label: 'Regulator',
            color: '#C792E8',
            values: [
              'Lawful reporting; structured audit evidence; transaction records under applicable law.',
              'Data via uncontrolled public ledger leakage rather than structured reporting.',
              'Structured reporting is more useful and legally appropriate than uncontrolled on-chain access.',
              'Structured reporting channels; designated observer role in contract model; bounded lawful-access framework.',
            ],
          },
          {
            id: 'auditor',
            label: 'Auditor',
            color: '#E0726B',
            values: [
              'Sampled transaction records; reconciliation evidence; control evidence for the audit period.',
              'Live real-time flows beyond audit scope; customer identities not relevant to the audit.',
              'Audit access should be bounded and time-limited — evidence, not exposure.',
              'Time-bounded access; sampled records; access logs; retrieval controls.',
            ],
          },
          {
            id: 'market-observer',
            label: 'Market observer / competitor',
            color: '#6B8CAE',
            values: [
              'Only what the bank publicly discloses.',
              'Customer flows; trading positions; collateral movements; settlement timing and strategy.',
              'Commercial confidentiality; market-leakage risk; competitive and market-abuse exposure.',
              'Permissioned network; private transactions; off-chain computation where needed.',
            ],
          },
        ],
      },
    },
    {
      kind: 'matrix',
      heading: 'Privacy models: what each approach hides and what it does not',
      data: {
        columns: ['What is hidden from non-parties', 'Who can verify', 'Institutional strength', 'Watch-out'],
        items: [
          {
            id: 'public-chain',
            label: 'Public chain transparency',
            color: '#E8A33D',
            values: [
              'Nothing — fully transparent by default.',
              'Any participant with node access.',
              'Maximum independent verifiability; broad settlement reach; no single operator controls access.',
              'Every participant observes positions, flows, timing and client data. Chain analytics firms link addresses to identities with high accuracy. Not suitable for confidential institutional flows without additional layers.',
            ],
          },
          {
            id: 'permissioned',
            label: 'Permissioned network',
            color: '#7AA7D9',
            values: [
              'Transaction data from non-participants.',
              'Named participants on the network.',
              'Controlled visibility; known counterparties; governance and membership management possible.',
              'All network members still see all transactions within the network. Governance design and membership management are ongoing operational requirements, not one-time decisions.',
            ],
          },
          {
            id: 'selective',
            label: 'Selective disclosure',
            color: '#5FB3A3',
            values: [
              'Underlying data — only a specific claim is shared (e.g. "KYC verified", "amount below threshold").',
              'Recipient of the disclosure and the issuer\'s cryptographic signature; verifiable without contacting the issuer.',
              'Proof of fact without data exposure; supports identity and compliance verification.',
              'Requires verifiable credential infrastructure and established issuer trust. A point-in-time proof, not a settlement model on its own.',
            ],
          },
          {
            id: 'zk',
            label: 'Zero-knowledge proof (ZK)',
            color: '#C792E8',
            values: [
              'Transaction amounts, addresses or logic — only validity is proven cryptographically.',
              'Anyone with the public verification key and the proof.',
              'Cryptographically provable privacy; can support compliance statements without underlying data disclosure.',
              'Adds computational complexity. ZK does not replace off-chain bank controls: AML decisions, key management, dispute handling and audit access remain outside the proof. Regulatory acceptance is still developing.',
            ],
          },
          {
            id: 'canton',
            label: 'Canton / Daml-style visibility',
            color: '#E0726B',
            values: [
              'Transaction data from all parties not designated as signatories or observers in the specific contract.',
              'Named signatories and designated observers — a regulator or auditor can be given observer status in the contract without becoming a transacting party.',
              'Privacy is built into the contract model. Parties see only what the contract defines. Regulator visibility can be explicitly designed in without market-wide disclosure.',
              'Requires Daml contract design expertise. Active in institutional pilots as of 2026. Not a public-liquidity venue. Cross-reference: DLT Basics platform comparison.',
            ],
          },
          {
            id: 'cbdc-policy',
            label: 'CBDC policy-based privacy',
            color: '#6B8CAE',
            values: [
              'Small transaction details from the issuer in tiered models; amounts below a defined threshold have cash-like privacy.',
              'Central bank; designated intermediaries; law enforcement under a lawful-access framework.',
              'Privacy level is a calibrated policy decision. Democratic accountability is possible. Can balance AML with user protection.',
              'Depends entirely on legal framework and policy design. Privacy guarantees vary across jurisdictions. User trust in the issuer is essential and cannot be assumed.',
            ],
          },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'CBDC privacy design and GDPR tension',
      body: `CBDC designers face a genuine trilemma: full central-bank visibility (optimal for AML, problematic for civil liberties), tiered privacy (small transactions private like cash; larger ones subject to AML rules), or cryptographic privacy using zero-knowledge proofs (technically feasible; regulatory acceptance is still developing). The ECB's digital euro proposal and most serious CBDC programmes target the tiered model. The threshold below which cash-like privacy applies is a political decision, not a technical one.\n\nGDPR adds a structural constraint: the right to erasure conflicts directly with blockchain immutability. The practical resolution is to keep personal data off-chain, recording only hashes or references on-chain. If an on-chain address has been linked to an identity, however, the legal boundary is grey. This is an active uncertainty affecting every EU/UK project building on public blockchains.`,
    },
    {
      kind: 'case',
      heading: 'When privacy tools become sanctions targets',
      data: {
        title: 'Tornado Cash sanctions and conviction',
        dateRange: 'Sanctioned August 2022; developer convicted May 2024',
        whatHappened: `Tornado Cash was a smart contract on Ethereum that mixed transactions to break the link between sender and receiver — a "privacy mixer." The US Treasury's OFAC sanctioned Tornado Cash in August 2022, making it illegal for US persons to interact with the smart contract. This was unprecedented: sanctioning code, not a company or person. Developer Alexey Pertsev was convicted in the Netherlands in May 2024 of money laundering facilitation, sentenced to 64 months. Approximately $455 million in proceeds from the Ronin Bridge hack had been laundered through Tornado Cash.`,
        whyItMatters: `Tornado Cash crystallizes the privacy debate: the same tool that protects legitimate privacy (activists, domestic abuse survivors, journalists in authoritarian states) also enables money laundering at industrial scale. The sanctions and conviction established that writing privacy-preserving code can carry criminal liability if the tool is predominantly used for illicit purposes — a precedent that affects every privacy-focused project in the space. The ECB's tiered privacy model for the digital euro is a direct attempt to thread this needle: some privacy for small amounts, compliance for large ones.`,
        source: 'US Treasury OFAC press release; Dutch court ruling (ECLI:NL:RBOBR:2024:2069)',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'matrix',
      heading: 'Use-case privacy lens: what must be protected and how',
      data: {
        columns: ['What must remain private', 'Who needs evidence', 'Likely privacy model'],
        items: [
          {
            id: 'deposit-transfer',
            label: 'Tokenised deposit transfer',
            color: '#7AA7D9',
            values: [
              'Customer identity, amount and beneficiary from market and non-parties.',
              'Both banks (reconciliation); regulator (reporting); auditor (records).',
              'Permissioned network or selective disclosure. Customer identity records stay off-chain.',
            ],
          },
          {
            id: 'bond-settlement',
            label: 'Tokenised bond settlement (DvP)',
            color: '#E8A33D',
            values: [
              'Counterparty identity, trade size and timing from market before legal finality.',
              'Custodian/CSD; regulator; auditor.',
              'Canton/Daml-style bilateral visibility or permissioned DvP network.',
            ],
          },
          {
            id: 'collateral',
            label: 'Collateral movement',
            color: '#5FB3A3',
            values: [
              'Position sizes, exposure levels and margin status from competitors and market.',
              'Collateral taker; risk team; regulator for applicable reporting.',
              'Bilateral permissioned channel; confidential state model.',
            ],
          },
          {
            id: 'stablecoin-payment',
            label: 'Corporate stablecoin payment',
            color: '#C792E8',
            values: [
              'Client identity, payment amount and commercial purpose from the public.',
              'Bank (AML); regulator (reporting); correspondent (screening).',
              'Application-layer controls on a public chain, or permissioned stablecoin with allowlist.',
            ],
          },
          {
            id: 'cbdc-settlement',
            label: 'Wholesale CBDC settlement',
            color: '#E0726B',
            values: [
              'Interbank flows and settlement timing from other market participants.',
              'Central bank; participating banks; regulators.',
              'CBDC policy-based visibility; controlled disclosure to designated participants.',
            ],
          },
        ],
      },
    },
    {
      kind: 'callout',
      heading: 'No chain or privacy model removes the need for off-chain controls',
      data: {
        tone: 'strategy',
        body: `Chain choice and privacy model determine who can see what on the ledger. They do not replace the controls that must live in bank systems: customer identity records and KYC decisions; legal agreements and netting arrangements; consent records and lawful basis under data protection law; dispute handling and legal process; audit evidence retrieval; key management and access controls for admin roles; data retention and deletion policy.\n\nPrivacy controls must also be compatible with AML obligations, sanctions screening and lawful reporting obligations. That compatibility is not optional — it is the design constraint that separates privacy from anonymity in a regulated context. AML, sanctions screening and regulatory reporting are covered in a dedicated topic.`,
      },
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          {
            question: 'A bank settles tokenised bonds on a permissioned DLT network. A market competitor is not a network participant. What privacy risk remains?',
            options: [
              'None — permissioned networks prevent all data leakage to non-participants',
              'All network participants, including those not party to the specific trade, can observe the transaction within the permissioned network',
              'The competitor can access transaction data using public chain analytics',
              'The central bank will publish settlement details',
            ],
            correctIndex: 1,
            explanation: 'A permissioned network restricts access to named participants, but all participants on the network can still see all transactions within it. Sub-transaction privacy — where parties see only the contracts they are party to — requires a further layer such as Canton/Daml-style visibility or private data channels.',
          },
          {
            question: 'What distinguishes "regulator visibility" from "market-wide disclosure" as privacy design concepts?',
            options: [
              'They are the same — if regulators can see transaction data, so can any participant',
              'Regulator visibility means the central bank publishes all transaction data publicly',
              'Regulator visibility is structured, bounded and lawful access to specific data under a defined framework; market-wide disclosure is uncontrolled exposure of transaction data to all participants',
              'Market-wide disclosure is legally required for all tokenised asset platforms under MiCA',
            ],
            correctIndex: 2,
            explanation: 'A well-designed privacy model gives regulators and auditors structured, bounded access — through reporting channels or designated observer roles — without exposing the same data to market participants. The bank needs regulator visibility; it does not need market-wide disclosure.',
          },
          {
            question: 'Why does a zero-knowledge proof not fully solve regulated-bank privacy requirements?',
            options: [
              'ZK proofs are prohibited in financial services regulation',
              'ZK proofs can only handle a single transaction at a time',
              'ZK proofs address one part of the privacy problem but do not replace the full set of off-chain controls — AML adjudication, key management, dispute handling, customer identity records and audit evidence all remain outside the proof',
              'ZK proofs are only available on Ethereum mainnet',
            ],
            correctIndex: 2,
            explanation: 'ZK proofs prove validity without revealing underlying data, which is useful for compliance attestations and scalability. But they do not substitute for off-chain controls. The bank still needs AML systems, key management, customer identity records, legal agreements and audit evidence. ZK is one input to the privacy design, not a complete solution.',
          },
        ],
      },
    },
  ],
};

export default content;
