import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'orientation',
  number: '00',
  title: 'Orientation',
  summary: 'What digital finance is, and how to use this bootcamp.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      heading: 'Why this exists',
      body: `If you're joining a bank's digital assets lab with no background in this space, the hardest part isn't any single concept — it's that everyone around you uses ten overlapping terms (stablecoin, CBDC, tokenized deposit, DLT, DeFi) as if they're interchangeable, when they're not. This bootcamp exists to give you one consistent map of the whole space, built up in order, so the terms stop blurring together.`,
    },
    {
      kind: 'text',
      heading: 'How it is structured',
      body: `Each module is short and tap-driven, not a wall of text. Diagrams are the primary explanation, not decoration — tap things, don't just scroll past them. Modules build on each other in order: Module 1 establishes the existing payments rails as a baseline, and almost everything after it is explained as "how this is different from that baseline."`,
    },
    {
      kind: 'text',
      heading: 'What "newbie" means here',
      body: `Every acronym is defined the first time it's used, in every module — nothing assumes you already know what MiCA or DvP means. If a module ever assumes prior knowledge it shouldn't, that's a bug in the content, not a gap in you.`,
    },
  ],
};

export default content;
