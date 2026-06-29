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
      body: `"DLT" (distributed ledger technology) and "blockchain" get used almost interchangeably. A blockchain is one specific kind of DLT \u2014 a ledger where transactions are bundled into blocks, each cryptographically linked to the one before it. What actually matters for everything downstream isn't the buzzword, it's four building blocks underneath it.`,
    },
    {
      kind: 'stack',
      heading: 'The four building blocks',
      data: [
        { id: 'network', number: '01', label: 'Network', colorClass: 's1', detail: `A peer-to-peer set of computers (nodes), each holding a copy of the same ledger \u2014 no single central database.`, examples: 'Public: anyone can join \u00b7 Permissioned: known participants only' },
        { id: 'consensus', number: '02', label: 'Consensus', colorClass: 's2', detail: `The rule nodes use to agree on which transactions are valid, without a central authority deciding for them.`, examples: 'Proof of Work \u00b7 Proof of Stake \u00b7 permissioned voting' },
        { id: 'ledger', number: '03', label: 'Ledger / blocks', colorClass: 's3', detail: `Transactions get bundled into blocks; each block references the previous one, making the history tamper-evident.`, examples: 'This is the literal "chain" in blockchain' },
        { id: 'finality', number: '04', label: 'Finality', colorClass: 's4', detail: `The point at which a transaction is considered irreversible. This varies a lot by chain and consensus method \u2014 and it's the single biggest practical difference from RTGS settlement.`, examples: 'See Module 13 (Settlement) for why this matters' },
      ],
      note: `This ordering is conceptual, not a money-flow sequence like the ecosystem stack in earlier discussions \u2014 these four things exist simultaneously, each enabling the next.`,
    },
    {
      kind: 'matrix',
      heading: 'Comparing consensus mechanisms',
      data: {
        columns: ['Who validates', 'Throughput', 'Energy use', 'Example'],
        items: [
          { id: 'pow', label: 'Proof of Work', color: '#E8A33D', values: ['Anyone with computing power', 'Low (~7\u201330 tx/sec)', 'Very high', 'Bitcoin'] },
          { id: 'pos', label: 'Proof of Stake', color: '#5FB3A3', values: ['Validators who stake the native token', 'Higher (100s\u20131000s tx/sec)', 'Low', 'Ethereum, Solana'] },
          { id: 'permissioned', label: 'Permissioned / consortium', color: '#7AA7D9', values: ['Known, vetted participants only', 'High', 'Low', 'Corda, Canton'] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'Why finality is the detail that matters most',
      body: `In RTGS systems like CHAPS, settlement is immediate and irrevocable the moment it happens \u2014 that's the whole point of central bank money. On many public blockchains, "finality" is probabilistic: a transaction becomes progressively less likely to be reversed as more blocks are added on top of it, rather than being instantly absolute. This single difference is what makes atomic, simultaneous settlement of two legs of a trade (covered in Module 13) a genuinely hard problem, not a solved one.`,
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'What is the relationship between DLT and blockchain?', options: ['They are identical concepts', 'Blockchain is one specific kind of DLT', 'DLT is a type of blockchain', 'They are unrelated technologies'], correctIndex: 1, explanation: 'A blockchain is a specific type of DLT where transactions are bundled into cryptographically linked blocks.' },
          { question: 'Which consensus mechanism uses the most energy?', options: ['Proof of Stake', 'Permissioned / consortium voting', 'Proof of Work', 'All use roughly the same amount'], correctIndex: 2, explanation: 'Proof of Work requires significant computing power, making its energy use very high compared to alternatives.' },
          { question: 'How does finality on many public blockchains differ from RTGS?', options: ['It is faster and more certain', 'It is probabilistic — transactions become progressively harder to reverse', 'There is no finality at all', 'It requires manual confirmation by a central authority'], correctIndex: 1, explanation: 'On many public blockchains, finality is probabilistic: reversal becomes less likely as more blocks are added.' },
        ],
      },
    },
  ],
};

export default content;
