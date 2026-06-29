import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'forms-of-money',
  number: '02',
  title: 'Forms of money',
  summary: 'Cash, deposits, CBDC, stablecoins, tokenized deposits — one map.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `Every "form of money" in digital finance can be compared on the same three questions: who issued it, what backs it, and if it fails — who’s on the hook? Tap any card below to see the full breakdown.`,
    },
    {
      kind: 'money-cards',
      heading: 'Five forms, compared',
      data: {
        cards: [
          {
            key: 'cash', label: 'Cash', color: '#E8A33D',
            riskLevel: 8, riskLabel: 'Minimal risk', riskColor: '#5FB3A3',
            fields: [
              { k: 'Issuer', v: 'Central bank' },
              { k: 'Backing', v: 'Sovereign promise' },
              { k: 'Your claim', v: 'Legal tender' },
            ],
            detail: 'Physical cash is a direct central bank liability. No counterparty risk, no intermediary, no deposit insurance needed. The trade-off: zero yield and limited to in-person use.',
          },
          {
            key: 'deposit', label: 'Bank deposit', color: '#7AA7D9',
            riskLevel: 22, riskLabel: 'Low risk', riskColor: '#7AA7D9',
            fields: [
              { k: 'Issuer', v: 'Commercial bank' },
              { k: 'Backing', v: 'Loans & reserves' },
              { k: 'Your claim', v: 'Insured deposit' },
            ],
            detail: 'Your deposit is a claim on the bank, not the central bank. Deposit insurance (e.g. FSCS, FDIC) covers you up to a limit. The bank earns a spread by lending your deposit out — fractional reserve in action.',
          },
          {
            key: 'cbdc', label: 'CBDC', color: '#5FB3A3',
            riskLevel: 8, riskLabel: 'Minimal risk', riskColor: '#5FB3A3',
            fields: [
              { k: 'Issuer', v: 'Central bank' },
              { k: 'Backing', v: 'Sovereign promise' },
              { k: 'Your claim', v: 'Direct liability' },
            ],
            detail: 'A digital version of cash — a direct central bank liability, just like physical notes. No deposit insurance needed because the issuer is the sovereign itself. Still mostly in pilot or research phase globally.',
          },
          {
            key: 'tokdep', label: 'Tokenized deposit', color: '#C792E8',
            riskLevel: 25, riskLabel: 'Low risk', riskColor: '#7AA7D9',
            fields: [
              { k: 'Issuer', v: 'Commercial bank' },
              { k: 'Backing', v: 'Same as a deposit' },
              { k: 'Your claim', v: 'Insured deposit' },
            ],
            detail: 'Identical to a regular bank deposit in legal terms — same insurance, same claim on the bank. The only difference is the record lives on blockchain rails instead of the bank’s internal ledger, enabling programmability and faster settlement.',
          },
          {
            key: 'stable', label: 'Stablecoin', color: '#E0726B',
            riskLevel: 65, riskLabel: 'Higher risk', riskColor: '#E0726B',
            fields: [
              { k: 'Issuer', v: 'Private company' },
              { k: 'Backing', v: 'T-bills / cash reserves' },
              { k: 'Your claim', v: 'Unsecured' },
            ],
            detail: 'Your claim is on a private company (Tether, Circle), not a bank or sovereign. No deposit insurance. If the issuer’s reserves don’t match their liabilities, or if they refuse redemptions, you bear the loss. The trade-off: accessible globally, usable in DeFi, and available 24/7.',
          },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'The pattern worth keeping',
      body: `Every form trades off the same three things: who’s on the hook if it fails, whether you earn anything for holding it, and how freely you can move it. Nothing on this map is free of all three risks at once — and almost every "which is safer" question in later topics comes back to that tradeoff.`,
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'Who issues a CBDC?', options: ['A private company', 'A commercial bank', 'A central bank', 'A decentralized protocol'], correctIndex: 2, explanation: 'A CBDC is a direct liability of the central bank, backed by sovereign promise.' },
          { question: 'What is a stablecoin holder’s claim?', options: ['A direct central bank liability', 'An insured deposit', 'An unsecured claim on a private company', 'A claim on a decentralized protocol'], correctIndex: 2, explanation: 'Stablecoins like USDT/USDC are issued by private companies, making your claim unsecured.' },
          { question: 'How does a tokenized deposit differ from an ordinary bank deposit?', options: ['It is no longer deposit-insured', 'It is issued by the central bank instead', 'The record lives on blockchain rails but retains the same insured-deposit status', 'It is backed by crypto assets'], correctIndex: 2, explanation: 'A tokenized deposit is the same insured claim, just recorded on the bank’s blockchain rails.' },
        ],
      },
    },
  ],
};

export default content;
