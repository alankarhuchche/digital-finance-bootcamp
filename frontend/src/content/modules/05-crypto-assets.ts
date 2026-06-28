import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'crypto-assets',
  number: '05',
  title: 'Crypto assets',
  summary: 'Native, utility, and governance tokens.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `Modules 02 and 03 covered crypto assets that try to act like money (stablecoins, and CBDC as the non-crypto sovereign equivalent). Most crypto assets are not trying to be money at all. This module covers the three categories that get lumped in under "crypto" anyway, which is exactly why the term feels so overloaded.`,
    },
    {
      kind: 'matrix',
      heading: 'Three categories, three different jobs',
      data: {
        columns: ['What it represents', 'Value driven by', 'Example'],
        items: [
          { id: 'native', label: 'Native token', color: '#E8A33D', values: [`The base asset of its own blockchain \u2014 used to pay transaction fees and/or secure the network`, `Network usage and the security budget it funds; heavily speculative too`, 'Bitcoin (BTC), Ether (ETH)'] },
          { id: 'utility', label: 'Utility token', color: '#7AA7D9', values: [`A right to use a specific application or service built on a blockchain`, `Demand for that one application \u2014 narrower and more fragile than a native token's value driver`, 'Filecoin (decentralized storage)'] },
          { id: 'governance', label: 'Governance token', color: '#C792E8', values: [`Voting rights over a protocol's future \u2014 fees, upgrades, treasury spending`, `Perceived value of influencing that protocol's decisions`, 'UNI (Uniswap), SKY (formerly MakerDAO)'] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'Why the terminology blurs',
      body: `News coverage and casual conversation use "crypto" to mean all of this at once \u2014 Bitcoin, a DeFi governance token, and a stablecoin get discussed in the same breath, even though only the stablecoin is actually trying to behave like money. Keeping these categories separate in your head is most of what it takes to follow a conversation in this space without getting lost.`,
    },
  ],
};

export default content;
