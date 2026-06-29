import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'failure-modes',
  number: '16',
  title: 'Failure modes',
  summary: 'Depegs, hacks, custody and smart contract risk.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `Three case studies already in this bootcamp \u2014 Terra/UST (Module 06), Euler Finance (Module 09), and FTX (Module 12) \u2014 are each a different failure category. This module names the categories explicitly and adds the one major type not yet covered: bridge exploits.`,
    },
    {
      kind: 'matrix',
      heading: 'The failure categories, named',
      data: {
        columns: ['What actually breaks', 'Already covered in'],
        items: [
          { id: 'depeg', label: 'Algorithmic depeg', color: '#E0726B', values: [`A stabilization mechanism with no real backing accelerates a collapse instead of absorbing it`, 'Module 06 \u2014 Terra/UST'] },
          { id: 'smartcontract', label: 'Smart contract exploit', color: '#7AA7D9', values: [`A coding flaw (often combined with a flash loan) lets an attacker extract funds the logic should have prevented`, 'Module 09 \u2014 Euler Finance'] },
          { id: 'custody', label: 'Custodial misuse', color: '#5FB3A3', values: [`A custodian misuses or misrepresents customer funds it was supposed to merely hold`, 'Module 12 \u2014 FTX'] },
          { id: 'bridge', label: 'Bridge exploit', color: '#C792E8', values: [`A cross-chain bridge's validator/signing security is compromised, draining the assets it was holding in escrow`, 'New \u2014 see case below'] },
        ],
      },
    },
    {
      kind: 'case',
      heading: 'The bridge category: Ronin',
      data: {
        title: 'Ronin Bridge exploit (Axie Infinity)',
        dateRange: '23 March 2022 (discovered 6 days later)',
        whatHappened: `Attackers compromised five of the nine validator keys controlling the Ronin cross-chain bridge \u2014 enough to approve fraudulent withdrawals \u2014 and drained roughly $625 million in ETH and USDC. The US Treasury attributed the attack to North Korea's Lazarus Group. The breach went unnoticed for six days. Sky Mavis, Ronin's operator, fully reimbursed affected users and later recovered roughly $40 million through law enforcement action.`,
        whyItMatters: `Bridges are uniquely attractive targets because they concentrate large pooled assets behind a relatively small set of signing keys \u2014 compromise the keys, not the underlying blockchain, and the funds are gone. This is structurally different from Euler's code-logic flaw or Terra's mechanism failure: the blockchain itself was never broken, the trust assumption around who controls the bridge was.`,
        source: 'US Treasury OFAC sanctions announcement; Chainalysis and Elliptic incident analysis',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'text',
      heading: 'The pattern across all four',
      body: `Every category here is a different answer to the same question: what, exactly, were you trusting, and was that trust justified? An algorithmic stablecoin asks you to trust a mechanism with no real backing. A DeFi protocol asks you to trust its code is bug-free. A CEX asks you to trust a company's custody promises. A bridge asks you to trust a small set of keys. None of these risks is unique to crypto \u2014 traditional finance has analogues for all four \u2014 but the absence of deposit insurance, a central counterparty, or a regulator of last resort means the consequences land faster and harder when trust turns out to be misplaced.`,
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'How much was drained in the Ronin Bridge exploit, and who was it attributed to?', options: ['$197 million, attributed to an internal employee', '$625 million, attributed to North Korea\'s Lazarus Group', '$8 billion, attributed to Alameda Research', '$40 billion, attributed to Terra\'s Luna Foundation Guard'], correctIndex: 1, explanation: 'The Ronin Bridge exploit drained roughly $625 million and was attributed by the US Treasury to North Korea\'s Lazarus Group.' },
          { question: 'What makes cross-chain bridges uniquely attractive targets for attackers?', options: ['They process the highest transaction volumes of any DeFi protocol', 'They concentrate large pooled assets behind a small set of signing keys', 'They are the only DeFi protocols without smart contract audits', 'They hold assets in unencrypted wallets for faster transfers'], correctIndex: 1, explanation: 'Bridges are attractive targets because they concentrate large pooled assets behind relatively few signing keys \u2014 compromise the keys and the funds are gone.' },
          { question: 'Which failure category does the FTX collapse represent?', options: ['Algorithmic depeg', 'Smart contract exploit', 'Custodial misuse', 'Bridge exploit'], correctIndex: 2, explanation: 'FTX is classified as custodial misuse \u2014 the exchange misused customer funds it was supposed to merely hold.' },
        ],
      },
    },
  ],
};

export default content;
