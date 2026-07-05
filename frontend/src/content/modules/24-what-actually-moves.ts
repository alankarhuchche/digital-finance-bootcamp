import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'what-actually-moves',
  number: '24',
  title: 'What actually moves?',
  summary: 'Messages, ledger postings, settlement assets and on-ledger tokens are not the same thing. Understanding the difference is the prerequisite for any serious discussion of DLT, stablecoins or tokenised value.',
  ready: true,
  updatedAt: '2026-07-05',
  changeType: 'new',
  changeSummary: 'Added four-mode animated layer visual.',
  blocks: [
    {
      kind: 'text',
      body: `Before comparing blockchains, stablecoins or tokenised deposits, ask one simpler question: what actually moves?\n\nA payment message, a customer ledger posting, an interbank settlement movement and an audit trail are not the same thing. DLT can change where state is shared and how finality is recorded, but it does not remove funding, access, accounting, legal finality, reporting or reconciliation.`,
    },
    {
      kind: 'what-moves-visual',
    },
    {
      kind: 'stack',
      heading: 'The seven things that can move (or not)',
      data: [
        {
          id: 'message',
          number: '01',
          label: 'Payment message',
          colorClass: 's1',
          detail: `The instruction or authorisation that routes a payment. A SWIFT MT103 or ISO 20022 pacs.008 message is a message — it does not itself carry value. The message arrives before the money moves, and it may not result in settlement if rejected or returned.`,
          examples: 'MT103 · pacs.008 · CHAPS instruction · Faster Payments submission',
        },
        {
          id: 'ledger-posting',
          number: '02',
          label: 'Ledger posting',
          colorClass: 's2',
          detail: `The debit or credit recorded in a customer account or bank ledger. A posting records the change but does not move funds. The payer's account is debited and the receiver's account is credited — those are accounting entries, not value movements.`,
          examples: 'Customer account debit · nostro credit · bank general ledger entry',
        },
        {
          id: 'settlement-asset',
          number: '03',
          label: 'Settlement asset',
          colorClass: 's3',
          detail: `The central bank money, scheme settlement balance or nostro/vostro balance that moves between banks. This is what settles the obligation between the payer's bank and the receiver's bank. It is separate from the customer ledger postings, and may happen before, after or alongside them depending on the rail and operating model.`,
          examples: 'RTGS central bank money · Faster Payments scheme settlement · nostro/vostro balance',
        },
        {
          id: 'on-ledger-token',
          number: '04',
          label: 'On-ledger token',
          colorClass: 's4',
          detail: `A funded digital representation of value on a permissioned or public ledger. It exists as shared state inside the network. The token must be funded — value does not appear on-ledger unless it is put there through an on-ramp or minting process. On-chain confirmation records the shared state change; legal settlement finality depends on jurisdiction, contract and regulatory treatment.`,
          examples: 'Tokenised deposit · stablecoin on-chain · CBDC token',
        },
        {
          id: 'interoperability',
          number: '05',
          label: 'Interoperability',
          colorClass: 's5',
          detail: `The mechanism connecting value or participants across different ledgers or networks. Cross-ledger movement may require bridges, gateways, custodians, issuers, agents or common platforms. Each introduces its own access, liquidity and liability considerations. Interoperability is a control and liability point, not a magic pipe.`,
          examples: 'Atomic swap · bridge · gateway · custodian-mediated off-ramp',
        },
        {
          id: 'reporting',
          number: '06',
          label: 'Reporting',
          colorClass: 's6',
          detail: `The regulatory and tax reporting layer. For cryptoasset activity, CARF (Crypto-Asset Reporting Framework) may apply depending on the bank's role and activity type. CARF is not a settlement mechanism and is not the same as payment scheme reporting. It is an additional reporting obligation in the evidence layer.`,
          examples: 'CARF · SAR · payment scheme reconciliation report',
        },
        {
          id: 'evidence',
          number: '07',
          label: 'Evidence',
          colorClass: 's7',
          detail: `The audit trail, custody record and reconciliation that supports legal, regulatory and accounting obligations. DLT may reduce reconciliation steps inside a single network, but accounting, exception handling and evidence obligations remain regardless of the settlement mechanism used.`,
          examples: 'Custody record · audit trail · exception report · reconciliation statement',
        },
      ],
      note: `These are the layers to look for when comparing payment and tokenised-value models. Not every layer appears in every flow, and not every layer is visible to every participant.`,
    },
    {
      kind: 'matrix',
      heading: 'What DLT changes — and what it does not remove',
      data: {
        columns: ['What DLT can change', 'What DLT does not remove'],
        items: [
          {
            id: 'shared-state',
            label: 'Shared state recording',
            color: '#E8A33D',
            values: [
              'Where shared state is recorded — inside a common ledger rather than reconciled bilaterally.',
              'The funding requirement. Value must exist on-ledger before it can be transferred on-ledger.',
            ],
          },
          {
            id: 'finality-signalling',
            label: 'Finality signalling',
            color: '#5FB3A3',
            values: [
              'How finality is signalled inside the network — on-chain confirmation can be fast and tamper-evident.',
              'Legal settlement finality. On-chain confirmation is not the same as legal finality. That depends on jurisdiction, contract and regulatory treatment.',
            ],
          },
          {
            id: 'transfer-evidence',
            label: 'Transfer and evidence proximity',
            color: '#7AA7D9',
            values: [
              'How close transfer and evidence can be — DvP and on-chain evidence records can be tightly coupled inside a network.',
              'Accounting, custody and reporting obligations. These apply to the bank regardless of the settlement mechanism.',
            ],
          },
          {
            id: 'reconciliation-steps',
            label: 'Reconciliation inside a network',
            color: '#C792E8',
            values: [
              'Number of reconciliation steps inside a single network — shared state reduces bilateral reconciliation within that network.',
              'Exception handling and off-ledger reconciliation. Failures, errors and disputed transactions still require investigation and repair.',
            ],
          },
          {
            id: 'interop-cost',
            label: 'Cross-network access',
            color: '#9D7EC9',
            values: [
              'Settlement timing within a network — on-ledger finality can be fast where value already exists on-ledger.',
              'Interoperability cost for cross-network movement. Crossing ledger boundaries requires intermediaries, and the settlement problem reappears at the boundary.',
            ],
          },
        ],
      },
    },
    {
      kind: 'stack',
      heading: 'Old rails: modernising, not obsolete',
      data: [
        {
          id: 'faster-payments',
          number: '01',
          label: 'Faster Payments',
          colorClass: 's1',
          detail: `Live UK account-to-account rail for retail and SME payments. Payment messages are exchanged in real time and the receiver can be credited quickly; interbank settlement is deferred net settlement through settlement accounts at the Bank of England. The message, customer posting and settlement movement are distinct even in an immediate payment.`,
          examples: 'Status: LIVE',
        },
        {
          id: 'chaps-rtgs',
          number: '02',
          label: 'CHAPS / RTGS',
          colorClass: 's2',
          detail: `UK high-value same-day settlement rail. CHAPS and RTGS migrated to ISO 20022 in 2023 and continue to modernise through richer structured data, extended operating hours and RTGS renewal. RTGS settlement is central bank money — this is the settlement asset for UK interbank obligations.`,
          examples: 'Status: MODERNISING — ISO 20022 live; richer data and hours expanding',
        },
        {
          id: 'swift-cbpr',
          number: '03',
          label: 'SWIFT / CBPR+',
          colorClass: 's3',
          detail: `Cross-border messaging standard. CBPR+ moved cross-border payment messaging to ISO 20022, giving richer structured data. SWIFT is still a messaging network — settlement occurs through correspondent banking, nostro/vostro balances, local clearing or other settlement arrangements.`,
          examples: 'Status: MODERNISING — ISO 20022 adoption and data quality still maturing',
        },
        {
          id: 'correspondent',
          number: '04',
          label: 'Correspondent banking',
          colorClass: 's4',
          detail: `Cross-border settlement mechanism based on nostro and vostro accounts held between banks. Pre-funded liquidity pools settle obligations across borders. Still a core mechanism for cross-border bank payments. Modernising through richer data and compliance tooling, not being replaced.`,
          examples: 'Status: MODERNISING — remains primary cross-border settlement mechanism',
        },
      ],
      note: `Old rails carry the vast majority of global payment volume. DLT-based models are emerging in controlled, wholesale and prototype contexts. The two operate in parallel.`,
    },
    {
      kind: 'matrix',
      heading: 'Stablecoin access by a UK bank: role and obligations',
      data: {
        columns: ['What the bank controls', 'What it does not control', 'Key risk and control implication'],
        items: [
          {
            id: 'issuer',
            label: 'Issuer',
            color: '#E8A33D',
            values: [
              'Minting, redemption, reserve management.',
              'External stablecoin networks if not acting as issuer on those networks.',
              'Reserve composition, legal finality of redemption, regulatory capital requirements.',
            ],
          },
          {
            id: 'custodian',
            label: 'Custodian / wallet provider',
            color: '#5FB3A3',
            values: [
              'Key management, wallet infrastructure, customer access.',
              'Issuer solvency, issuer network rules.',
              'Custody risk, key loss liability, wallet security obligations.',
            ],
          },
          {
            id: 'distributor',
            label: 'Distributor / access provider',
            color: '#7AA7D9',
            values: [
              'Customer access, KYC, onboarding.',
              'Issuer decisions, network rule changes.',
              'Issuer dependency, distribution controls, potential product liability.',
            ],
          },
          {
            id: 'exchange',
            label: 'Exchange / conversion provider',
            color: '#C792E8',
            values: [
              'FX rate, conversion, on/off-ramp execution.',
              'Issuer, underlying blockchain network.',
              'FX risk, liquidity, slippage, conversion timing risk.',
            ],
          },
          {
            id: 'payment-facilitator',
            label: 'Payment facilitator',
            color: '#9D7EC9',
            values: [
              'Routing, payment instruction.',
              'Issuer, settlement on the stablecoin network itself.',
              'Payment instruction liability distinct from stablecoin transfer liability.',
            ],
          },
          {
            id: 'off-ramp',
            label: 'Off-ramp / redemption provider',
            color: '#E86B5F',
            values: [
              'Redemption process, fiat conversion.',
              'Issuer willingness to redeem, queue management.',
              'Redemption risk, settlement timing, liquidity under stress.',
            ],
          },
          {
            id: 'reporting-entity',
            label: 'Reporting entity',
            color: '#6B8E9D',
            values: [
              'CARF and cryptoasset reporting obligations for activity within its scope.',
              'Whether other parties in the chain also report for the same activity.',
              'Duplicate reporting risk, jurisdictional scope uncertainty.',
            ],
          },
        ],
      },
    },
    {
      kind: 'text',
      body: `A UK bank providing access to a USD stablecoin may not be the issuer. It may hold custody, provide wallets, facilitate exchange or handle off-ramp. Each role carries its own controls and reporting obligations. The bank's role — and its obligations — depend on the structure of the arrangement, not on the fact of providing access.`,
    },
    {
      kind: 'text',
      body: `CARF (Crypto-Asset Reporting Framework) is an additional reporting obligation for cryptoasset activity. It is not a payment settlement mechanism and is not the same as payment scheme reporting. Whether it applies to a given bank depends on its role and the activity type. It belongs in the reporting and evidence layer, not the settlement movement layer.`,
    },
    {
      kind: 'quiz',
      heading: 'Check your understanding',
      data: {
        questions: [
          {
            question: 'Which of these is a money movement between banks?',
            options: [
              'A SWIFT MT103 message',
              'A customer account debit',
              'An RTGS settlement transfer',
              'A payment scheme acknowledgement',
            ],
            correctIndex: 2,
            explanation: 'A SWIFT MT103 is a payment message — it instructs but does not move funds. A customer account debit is a ledger posting. A payment scheme acknowledgement confirms receipt of the instruction. An RTGS settlement transfer is the movement of central bank money between banks — the actual money movement.',
          },
          {
            question: 'What must be true before value can be transferred on a DLT network?',
            options: [
              'ISO 20022 migration must be complete on legacy rails.',
              'Value must already exist on-ledger or be funded through an on-ramp.',
              'The receiving participant must hold a stablecoin wallet.',
              'Legal finality must be assessed in advance.',
            ],
            correctIndex: 1,
            explanation: 'On-ledger value must be funded. It does not appear on a DLT network unless it is put there through an on-ramp, minting process or initial deposit. The other conditions are not prerequisites for DLT transfer.',
          },
          {
            question: 'Which statement about blockchain finality is accurate?',
            options: [
              'On-chain confirmation is the same as legal settlement finality.',
              'Blockchain finality confirms the shared state change inside the network, but legal finality depends on jurisdiction, contract and regulatory treatment.',
              'Blockchain finality replaces the need for a custodian.',
              'Blockchain finality applies only to public ledgers.',
            ],
            correctIndex: 1,
            explanation: 'On-chain confirmation records the state change inside the network. Legal settlement finality is a separate determination that depends on jurisdiction, the terms of the contract and applicable regulatory treatment. The two are not the same.',
          },
          {
            question: 'A UK bank provides customer access to a USD stablecoin. Which statement is most accurate?',
            options: [
              'The bank is necessarily the stablecoin issuer.',
              'The bank may act as custodian, access provider or exchange counterparty — its role and obligations depend on the structure of the arrangement.',
              'The bank has no reporting obligations because the issuer handles CARF.',
              'Providing stablecoin access removes the need for nostro/vostro balances.',
            ],
            correctIndex: 1,
            explanation: 'A UK bank providing access to a USD stablecoin is not necessarily the issuer. It may provide custody, access, exchange or off-ramp services. Its regulatory obligations — including any CARF reporting — depend on its actual role and the structure of the arrangement, not on the fact of providing access.',
          },
        ],
      },
    },
  ],
};

export default content;
