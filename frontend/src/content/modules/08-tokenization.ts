import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'tokenization',
  number: '08',
  title: 'Tokenization',
  summary: 'Tokenized deposits and tokenized real-world assets.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `"Tokenization" sounds like a transformation. Mostly it is a change of address: the same underlying claim \u2014 a deposit, a bond, a fund unit \u2014 moves from a private database to a blockchain. Nothing about what you own changes; what changes is where the record lives and how fast it can move.`,
    },
    {
      kind: 'flow',
      heading: 'What actually moves',
      data: {
        viewBox: '0 0 320 140',
        boxes: [
          { id: 'before', x: 10, y: 40, w: 130, h: 50, caption: 'TODAY', value: 'Registrar database', valueColor: '#7AA7D9' },
          { id: 'after', x: 180, y: 40, w: 130, h: 50, caption: 'TOKENIZED', value: 'Blockchain ledger', valueColor: '#5FB3A3' },
        ],
        paths: [
          { d: 'M140,65 L180,65', animated: true, dotColor: '#E8A33D' },
        ],
        caption: `Same ownership claim, same underlying asset \u2014 the record of "who owns this" just moves to a different ledger, one that can settle 24/7 and be programmed.`,
      },
    },
    {
      kind: 'matrix',
      heading: 'Two flavors of tokenization',
      data: {
        columns: ['Issuer', 'Settlement speed', 'Regulatory status', 'Example'],
        items: [
          { id: 'tokdep', label: 'Tokenized deposit', color: '#C792E8', values: [`A commercial bank \u2014 your existing deposit relationship`, `Near-instant on the bank's own rails`, `Same insured-deposit status as an ordinary account`, 'JPMorgan Kinexys'] },
          { id: 'rwa', label: 'Tokenized RWA', color: '#E8A33D', values: [`An asset manager or fund \u2014 a security, not a deposit`, `Near-instant on-chain, 24/7`, `Regulated as a security/fund, not deposit-insured`, 'BlackRock BUIDL'] },
        ],
      },
    },
    {
      kind: 'case',
      heading: 'The reference case: BlackRock\u2019s BUIDL',
      data: {
        title: 'BUIDL \u2014 BlackRock USD Institutional Digital Liquidity Fund',
        dateRange: 'Launched March 2024',
        whatHappened: `BUIDL is a tokenized money market fund \u2014 it invests in cash, US Treasury bills, and overnight repos, exactly like a conventional money market fund. The difference is that ownership is represented as tokens (initially on Ethereum, since expanded to several other chains), issued through Securitize as the registered transfer agent. By 2026 it had grown to roughly $2.5 billion in assets and become accepted as collateral on several trading platforms.`,
        whyItMatters: `BUIDL is the cleanest illustration of what "tokenization" actually means in practice: a completely conventional, regulated fund, with the one change being that ownership records live on a public blockchain instead of a private registrar database \u2014 enabling 24/7 transfer and use as on-chain collateral that a traditional fund unit can't offer.`,
        source: 'BlackRock/Securitize press releases; Messari project page',
        verifiedAsOf: 'June 2026',
      },
    },
  ],
};

export default content;
