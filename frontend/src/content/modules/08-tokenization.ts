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
      body: `"Tokenization" sounds like a transformation. Mostly it is a change of address: the same underlying claim — a deposit, a bond, a fund unit — moves from a private database to a blockchain. Nothing about what you own changes; what changes is where the record lives and how fast it can move.`,
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
        caption: `Same ownership claim, same underlying asset — the record of "who owns this" just moves to a different ledger, one that can settle 24/7 and be programmed.`,
      },
    },
    {
      kind: 'matrix',
      heading: 'Two flavors of tokenization',
      data: {
        columns: ['Issuer', 'Settlement speed', 'Regulatory status', 'Example'],
        items: [
          { id: 'tokdep', label: 'Tokenized deposit', color: '#C792E8', values: [`A commercial bank — your existing deposit relationship`, `Near-instant on the bank's own rails`, `Same insured-deposit status as an ordinary account`, 'JPMorgan Kinexys'] },
          { id: 'rwa', label: 'Tokenized RWA', color: '#E8A33D', values: [`An asset manager or fund — a security, not a deposit`, `Near-instant on-chain, 24/7`, `Regulated as a security/fund, not deposit-insured`, 'BlackRock BUIDL'] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'Why institutional investors care',
      body: `Tokenization is not about retail investors buying fractions of a painting. The real institutional demand comes from three operational improvements that are hard to achieve with traditional infrastructure:\n\n1. 24/7 settlement: Traditional bond settlement takes T+1 (one business day after trade). A tokenized bond settles in minutes, any day of the week. For a treasury desk managing billions in collateral, eliminating overnight settlement risk and weekend freezes is worth real money.\n\n2. Collateral mobility: A tokenized Treasury bill can be pledged as margin on a derivatives exchange, recalled, and re-pledged to a different counterparty — all within minutes. On traditional rails, moving collateral between custodians takes hours to days and involves manual reconciliation.\n\n3. Fractional access: A traditional bond might have a $200,000 minimum denomination. A tokenized version can be divided into units as small as the smart contract allows, opening the investor base to smaller institutions and funds.`,
    },
    {
      kind: 'text',
      heading: 'How a tokenized bond issuance actually works',
      body: `Walk through a real example: a corporation wants to issue a $100 million digital bond.\n\nStep 1 — Structuring: The issuer works with legal counsel to structure the bond (coupon rate, maturity, covenants) exactly as they would for a traditional issuance. Nothing changes here.\n\nStep 2 — Transfer agent: A registered transfer agent like Securitize is appointed. Securitize maintains the official record of who owns each token, handles investor onboarding (KYC/AML), and ensures compliance with securities regulations. They are the legal bridge between the blockchain and the regulatory system.\n\nStep 3 — Smart contract deployment: Securitize (or the issuer's chosen platform) deploys a smart contract on Ethereum, Avalanche, or another supported chain. The contract encodes the bond's terms: total supply, coupon payment schedule, transfer restrictions (e.g., only KYC-verified wallets can hold the token), and maturity date.\n\nStep 4 — Custody and settlement: Investors purchase tokens through the platform. Their funds go to the issuer; tokens are minted and sent to the investor's wallet. Custody is typically handled through institutional custodians like Fireblocks, which provide the key management and security infrastructure.\n\nStep 5 — Lifecycle: Coupon payments are distributed automatically via the smart contract to all current token holders. At maturity, the contract can automate redemption — burning the tokens and triggering a fiat payment to holders. Secondary trading happens 24/7 on authorized venues, with the transfer agent ensuring only compliant transfers execute.`,
    },
    {
      kind: 'text',
      heading: 'The infrastructure layer',
      body: `Several specialized firms provide the plumbing that makes institutional tokenization work:\n\nSecuritize — the largest tokenized-securities transfer agent; powers BUIDL and dozens of other tokenized funds. Handles KYC, compliance, and the legal record of ownership.\n\nFireblocks — institutional-grade custody and key management. Most major banks and funds using tokenized assets rely on Fireblocks (or similar providers like Anchorage or Copper) to secure private keys without exposing them to operational risk.\n\nFnality — a consortium-backed wholesale settlement system (owned by 17 major banks including Goldman, BNP, and Barclays) that creates tokenized central bank money for interbank settlement. Think of it as the plumbing that lets tokenized assets settle in actual money rather than stablecoins.\n\nHQLAx — a platform specifically for securities lending and collateral management, allowing banks to move high-quality liquid assets (government bonds) across custodians via tokenized records, reducing settlement time from days to minutes.`,
    },
    {
      kind: 'text',
      heading: 'The regulatory wrapper',
      body: `A common misconception is that tokenization creates a new asset class outside existing regulation. It does not. Tokenized securities are securities — they must comply with the same registration, disclosure, and investor protection rules as their traditional equivalents. What tokenization changes is the recording and transfer mechanism, not the legal nature of the asset.\n\nIn practice, this means a tokenized bond issued in the US still needs an SEC registration or a valid exemption (Reg D, Reg S, etc.). The smart contract must enforce transfer restrictions — you cannot send a Reg D token to a non-accredited investor's wallet. The transfer agent remains legally responsible for the cap table. This "regulatory wrapper" approach — using existing law rather than waiting for new crypto-specific legislation — is why institutional tokenization has been able to scale while much of the broader crypto industry remains in regulatory limbo.`,
    },
    {
      kind: 'case',
      heading: 'The reference case: BlackRock’s BUIDL',
      data: {
        title: 'BUIDL — BlackRock USD Institutional Digital Liquidity Fund',
        dateRange: 'Launched March 2024',
        whatHappened: `BUIDL is a tokenized money market fund — it invests in cash, US Treasury bills, and overnight repos, exactly like a conventional money market fund. The difference is that ownership is represented as tokens (initially on Ethereum, since expanded to several other chains), issued through Securitize as the registered transfer agent. By 2026 it had grown to roughly $2.5 billion in assets and become accepted as collateral on several trading platforms, including as margin on derivatives exchanges.`,
        whyItMatters: `BUIDL is the cleanest illustration of what "tokenization" actually means in practice: a completely conventional, regulated fund, with the one change being that ownership records live on a public blockchain instead of a private registrar database — enabling 24/7 transfer and use as on-chain collateral that a traditional fund unit can't offer.`,
        source: 'BlackRock/Securitize press releases; Messari project page',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'case',
      heading: 'Sovereign issuer on-chain: EIB digital bonds',
      data: {
        title: 'European Investment Bank (EIB) digital bond issuances',
        dateRange: '2021–present',
        whatHappened: `In April 2021, the European Investment Bank issued a €100 million two-year digital bond on the Ethereum blockchain, managed by Goldman Sachs, Santander, and Société Générale. It was the first digital bond issuance by a major supranational institution. The EIB has since issued additional digital bonds on different blockchains and using different settlement mechanisms, including a €100 million bond settled in central bank money via the Banque de France's DL3S experimental platform. By 2025, the EIB had completed multiple issuances across Ethereum, HSBC Orion, and other platforms, testing interoperability and multi-chain settlement.`,
        whyItMatters: `The EIB issuances matter because they prove that a AAA-rated sovereign-adjacent issuer — not a crypto startup — can use public blockchains for real debt issuance under existing European securities law. The progression from a single Ethereum issuance to multi-chain, central-bank-settled bonds shows the technology maturing from experiment to repeatable process. It also demonstrates the "regulatory wrapper" in action: these are standard bonds under Luxembourg law that happen to settle on-chain.`,
        source: 'EIB press releases; Goldman Sachs/SocGen announcements; Banque de France DL3S documentation',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'text',
      body: `Tokenized assets can sit in traditional custodial structures, or they can be used in an entirely new financial system built from code. That system is DeFi — decentralized finance — and it's the next topic.`,
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'In a tokenized bond issuance, what role does the transfer agent (e.g., Securitize) play?', options: ['They provide blockchain infrastructure and mining', 'They maintain the legal record of ownership, handle investor KYC, and ensure regulatory compliance', 'They set the bond coupon rate and maturity', 'They provide deposit insurance for token holders'], correctIndex: 1, explanation: 'The transfer agent is the legal bridge between the blockchain and the regulatory system — they maintain the official cap table, onboard investors, and ensure only compliant transfers execute.' },
          { question: 'Why was the EIB digital bond issuance significant for tokenization?', options: ['It was the first bond ever issued', 'It proved a AAA-rated supranational institution could issue real debt on a public blockchain under existing securities law', 'It replaced all traditional EIB bond issuance', 'It was the first use of Ethereum for any financial transaction'], correctIndex: 1, explanation: 'The EIB issuance demonstrated that a major, highly-rated institution could use public blockchains for real debt under existing law — proving the regulatory wrapper approach works.' },
          { question: 'What is the key operational advantage of collateral mobility in tokenized assets?', options: ['It eliminates the need for collateral entirely', 'Tokenized collateral can be pledged, recalled, and re-pledged across counterparties in minutes instead of hours or days', 'It allows collateral to earn higher interest rates', 'It removes regulatory requirements for margin posting'], correctIndex: 1, explanation: 'On traditional rails, moving collateral between custodians takes hours to days with manual reconciliation. Tokenized collateral can move in minutes, 24/7, reducing settlement risk and capital inefficiency.' },
        ],
      },
    },
  ],
};

export default content;
