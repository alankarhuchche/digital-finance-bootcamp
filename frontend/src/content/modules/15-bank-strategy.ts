import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'bank-strategy',
  number: '15',
  title: 'Bank strategy',
  summary: 'Why banks defend deposits and offer stablecoin access at once.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `If stablecoins threaten bank deposit funding (Module 03), why would any bank help customers buy them? Because the deposit can already leave through Coinbase or Revolut whether the bank participates or not \u2014 the real choice isn't "allow it or block it," it's "be in the room or be cut out of it."`,
    },
    {
      kind: 'matrix',
      heading: 'The strategic options on the table',
      data: {
        columns: ['What it protects', 'What it risks', 'Example'],
        items: [
          { id: 'build', label: 'Build your own token', color: '#7AA7D9', values: [`Full control, keeps the deposit on balance sheet (tokenized deposit)`, `Significant build cost; only works if customers actually adopt it over USDC/USDT`, 'JPMorgan Kinexys'] },
          { id: 'partner', label: 'Offer customer access to an existing issuer', color: '#E8A33D', values: [`Keeps the customer relationship and fee income even as the deposit leaves`, `Doesn't defend the balance sheet at all \u2014 pure retention play`, 'A bank app with built-in USDC purchase'] },
          { id: 'consortium', label: 'Join a bank consortium', color: '#C792E8', values: [`Shares build cost; collective scale against Big Tech/crypto-native rivals`, `Slower, consensus-driven; depends on every member actually adopting it`, 'Qivalis (EU banks), RLN'] },
          { id: 'nothing', label: 'Do nothing', color: '#9FB7CC', values: [`Avoids the build cost and regulatory exposure entirely`, `Customers leave for a competitor or a crypto-native platform anyway`, '\u2014'] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'The honest tension underneath all of it',
      body: `Banks are simultaneously defending deposits (tokenized deposits, CBDC advocacy) and participating in the thing that threatens those deposits (stablecoin access, custody services) \u2014 because nobody yet knows which side wins, and being absent from both is the worst outcome of all. This isn't strategic confusion; it's a deliberate hedge under genuine uncertainty.`,
    },
  ],
};

export default content;
