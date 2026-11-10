import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'gbtd',
  number: '26',
  title: 'GBTD conditional payments',
  summary: 'Inside a live UK tokenised-deposit pilot — how the marketplace conditional payment works, what has been publicly established, and what remains undisclosed.',
  ready: true,
  layout: 'wide',
  changeType: 'new',
  updatedAt: '2026-11-10',
  changeSummary: 'Interactive stage explorer for GBTD conditional tokenised-deposit payments — initial release.',
  blocks: [
    {
      kind: 'text',
      heading: 'What GBTD is',
      body: `GBTD (Great British Tokenised Deposits) is a UK Finance-led initiative exploring conditional tokenised sterling commercial-bank deposits. Seven institutions participate: Barclays, HSBC UK, Lloyds Banking Group, Monzo, Nationwide, NatWest, and Santander. The shared platform was built by Quant; EY supported project management; Linklaters developed legal and rulebook work.

In September 2026, UK Finance reported live pilot transactions across two use cases: remortgage completions and a marketplace conditional payment scenario. For remortgaging, funds were locked and released on legal completion. The marketplace example, explored in this visual, involves a buyer reserving funds against an agreed exchange condition before the seller receives anything.

One important caveat: UK Finance describes these as live customer transactions. The British Retail Consortium separately describes the marketplace purchase as simulated, and Reuters reports no physical goods changed hands in the test. The page surfaces both descriptions; this is not a silent reconciliation.`,
    },
    {
      kind: 'callout',
      data: {
        tone: 'insight',
        body: 'Tokenised deposits represent a liability of the issuing bank, not a common issuer-free token. Each participating bank issues its own tokenised deposit; interoperability across banks is what the shared platform provides. This is bank money, not central bank money.',
      },
    },
    {
      kind: 'gbtd-explorer',
      heading: 'The conditional payment — step by step',
    },
    {
      kind: 'text',
      heading: 'What is and is not publicly established',
      body: `The public evidence establishes the concept clearly: funds can be reserved in a buyer’s account and released to a seller when an agreed condition is met. What is not publicly disclosed includes the precise interbank settlement rail, the exact posting sequence across bank subledgers, the specific token lifecycle (mint, transfer, burn timing), and legal finality events.

The £100 Bank A / Bank B example in the visual above is deliberately illustrative. Actual pilot transaction amounts, the specific bank assignments for buyer and seller, and the step-by-step internal platform mechanics are not in the public record.

Conditional payment arrangements are not unique to tokenised deposits — escrow services and conditional payment clauses in existing contracts already achieve similar outcomes. What GBTD explores is whether a shared bank-money platform can coordinate that conditionality across multiple participating banks in a programmable, automated way.`,
    },
    {
      kind: 'quiz',
      heading: 'Check your understanding',
      data: {
        questions: [
          {
            question: 'When buyer funds are reserved in the GBTD marketplace example, has the seller received payment?',
            options: [
              'No — reserved funds remain with the buyer’s bank until the condition is satisfied and release is complete',
              'Yes — the reservation instantly credits the seller’s account',
              'Partially — half is reserved for the seller immediately',
              'It depends on which bank the seller uses',
            ],
            correctIndex: 0,
            explanation: 'Reserved funds are set aside at Bank A (buyer’s bank) and cannot be spent elsewhere, but they are not transferred to the seller until the agreed condition is satisfied and the release step completes. The seller position remains £0 throughout the reservation period.',
          },
          {
            question: 'Which aspect of the GBTD retail pilots has NOT been publicly disclosed?',
            options: [
              'The interbank settlement rail and legal finality mechanism',
              'The names of the participating institutions',
              'The fact that live pilot transactions occurred in September 2026',
              'The use-case types tested (remortgage and marketplace)',
            ],
            correctIndex: 0,
            explanation: 'The names of participants, the occurrence of live pilots in September 2026, and the use-case types are all publicly reported by UK Finance. The interbank settlement rail, the settlement asset, and the legal finality events have not been publicly established.',
          },
          {
            question: 'How does GBTD describe the deposit tokens it uses?',
            options: [
              'Commercial bank deposit liabilities issued by each participating bank, not a common issuer-free token',
              'A Bank of England-backed digital pound circulating across all participant banks',
              'A stablecoin backed by sterling reserves held at a central custodian',
              'Central bank money held on a shared ledger',
            ],
            correctIndex: 0,
            explanation: 'Each participating bank issues its own tokenised deposit, which represents a liability of that issuing bank. GBTD is not a central-bank token, not a common stablecoin, and not central bank money. The shared platform provides interoperability across these bank-issued tokens.',
          },
        ],
      },
    },
  ],
};

export default content;
