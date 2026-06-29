import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'settlement',
  number: '13',
  title: 'Settlement & infrastructure',
  summary: 'Wholesale settlement, DvP, atomic settlement.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `Module 01 listed finality as one of the five friction points in today's payment rails. Module 04 flagged that many blockchains have probabilistic, not instant, finality. This module is where those two threads meet \u2014 in the genuinely hard problem of settling a trade's two legs (the asset, and the cash paying for it) at the same instant.`,
    },
    {
      kind: 'flow',
      heading: 'Today: two legs, two systems',
      data: {
        viewBox: '0 0 320 150',
        boxes: [
          { id: 'sec', x: 10, y: 50, w: 130, h: 50, caption: 'SECURITY LEG', value: 'Settles on its registrar/ledger', valueColor: '#7AA7D9' },
          { id: 'cash', x: 180, y: 50, w: 130, h: 50, caption: 'CASH LEG', value: 'Settles via bank rails', valueColor: '#E8A33D' },
        ],
        paths: [],
        caption: `These two legs settle on separate systems, often at different times. If one side delivers and the other fails before it settles, the first party is exposed \u2014 this timing gap is called "Herstatt risk," named after a 1974 bank failure that left a counterparty holding a delivered-but-unpaid-for position.`,
      },
    },
    {
      kind: 'flow',
      heading: 'The fix: atomic settlement',
      data: {
        viewBox: '0 0 320 150',
        boxes: [
          { id: 'sec2', x: 10, y: 10, w: 130, h: 44, caption: 'SECURITY', value: 'Token' },
          { id: 'cash2', x: 180, y: 10, w: 130, h: 44, caption: 'CASH', value: 'Token', valueColor: '#E8A33D' },
          { id: 'atomic', x: 95, y: 95, w: 130, h: 44, caption: 'SINGLE TRANSACTION', value: 'Both or neither', valueColor: '#5FB3A3' },
        ],
        paths: [
          { d: 'M65,54 L65,117 L150,117', animated: true, dotColor: '#7AA7D9' },
          { d: 'M255,54 L255,117 L215,117', animated: true, dotColor: '#E8A33D' },
        ],
        caption: `Delivery-versus-payment (DvP) on a single shared ledger makes both legs part of one atomic transaction \u2014 if either leg would fail, the whole transaction reverts. Neither party is ever exposed to "I paid but didn't receive."`,
      },
    },
    {
      kind: 'text',
      heading: 'Why this is still mostly unsolved at scale',
      body: `Atomic settlement requires both legs to live on the same ledger \u2014 but today, tokenized securities and the cash paying for them usually sit on different systems, which is exactly the tokenized-deposit-vs-stablecoin-vs-wholesale-CBDC argument from Modules 02 and 07. Whichever asset becomes the standard "cash leg" for institutional settlement determines who actually solves this problem first. The RLN and Project Agor\u00e1 (Module 11) are direct attempts at exactly this \u2014 building the shared-ledger cash leg that tokenized securities settlement needs.`,
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'What is "Herstatt risk"?', options: ['The risk that a blockchain transaction is reversed after confirmation', 'The risk that one side of a trade delivers but the other side fails before settling, due to timing gaps between systems', 'The risk of a stablecoin losing its peg during settlement', 'The risk of a custodian going bankrupt while holding client assets'], correctIndex: 1, explanation: 'Herstatt risk is the settlement timing gap where one party delivers but the counterparty fails before its leg settles, named after a 1974 bank failure.' },
          { question: 'What does "atomic settlement" guarantee?', options: ['Settlement within one second', 'Both legs of a trade settle or neither does \u2014 there is no partial execution', 'All trades are publicly visible on a blockchain', 'Settlement is denominated in a single global currency'], correctIndex: 1, explanation: 'Atomic settlement means both the security and cash legs are part of one transaction \u2014 if either would fail, the whole transaction reverts.' },
          { question: 'Why is atomic DvP still mostly unsolved at institutional scale?', options: ['Blockchains are too slow to handle the transaction volume', 'Tokenized securities and the cash paying for them usually sit on different ledgers', 'Regulators have explicitly banned atomic settlement', 'There are no tokenized securities available yet'], correctIndex: 1, explanation: 'Atomic settlement requires both legs on the same ledger, but tokenized securities and cash typically live on separate systems today.' },
        ],
      },
    },
  ],
};

export default content;
