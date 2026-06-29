import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'existing-rails',
  number: '01',
  title: 'The existing rails',
  summary: 'SWIFT, RTGS, correspondent banking \u2014 the baseline this is all responding to.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      heading: 'Why start here',
      body: 'Almost everything in digital finance gets pitched as solving a problem with today\u2019s payment rails. That pitch only makes sense if you know what today\u2019s rails actually do \u2014 and where they\u2019re genuinely slow, costly, or fragile. This module is the \u201Cbefore\u201D picture, and it\u2019s the baseline everything else in this course responds to. Consider the scale: SWIFT processes roughly 45 million messages per day across its network. The average cost of sending a cross-border remittance is still around 6% of the transaction value, according to the World Bank. Understanding why that cost persists \u2014 despite decades of technology investment \u2014 is the starting point for evaluating every alternative that follows.',
    },
    {
      kind: 'flow',
      heading: 'How a cross-border payment moves today',
      data: {
        viewBox: '0 0 320 200',
        boxes: [
          { id: 'payer', x: 10, y: 10, w: 130, h: 44, caption: 'PAYER\u2019S BANK', value: 'Sends instruction' },
          { id: 'benef', x: 180, y: 10, w: 130, h: 44, caption: 'BENEFICIARY\u2019S BANK', value: 'Credits account' },
          { id: 'swift', x: 95, y: 95, w: 130, h: 44, caption: 'SWIFT MESSAGE', value: 'Via correspondents', valueColor: '#7AA7D9' },
        ],
        paths: [
          { d: 'M75,54 L75,117 L160,117', animated: true, dotColor: '#E8A33D' },
          { d: 'M245,54 L245,117 L225,117' },
        ],
        caption: 'No money actually \u201Ctravels\u201D in the SWIFT message \u2014 it carries instructions. Settlement happens through correspondent banks\u2019 own accounts with each other. Specifically, the payer\u2019s bank debits its customer and credits the correspondent\u2019s nostro account (an account it holds at the correspondent bank), while the correspondent debits the payer bank\u2019s vostro account (the mirror image of the same relationship) and credits the beneficiary\u2019s bank. Multiple hops mean multiple nostro/vostro pairs, each requiring pre-funded balances.',
      },
    },
    {
      kind: 'text',
      heading: 'Nostro/vostro: how correspondent banking actually works',
      body: 'A nostro account is \u201Cour account at your bank\u201D; a vostro is \u201Cyour account at our bank.\u201D They are the same account viewed from two sides. If Bank A holds an account at Bank B denominated in Bank B\u2019s currency, Bank A calls it a nostro; Bank B calls it a vostro. Banks must pre-fund these accounts in each currency they want to transact in, which ties up liquidity. A large global bank might maintain hundreds of nostro accounts across dozens of currencies. This is why correspondent banking is expensive \u2014 it\u2019s not just the per-transaction fees, it\u2019s the cost of capital sitting idle in pre-funded accounts around the world. Every dollar locked in a nostro account is a dollar that can\u2019t be deployed elsewhere. This trapped-liquidity problem is a recurring theme: it\u2019s what on-demand liquidity proposals (Module 09) and PvP settlement mechanisms (Module 08) are trying to solve.',
    },
    {
      kind: 'text',
      heading: 'The four-party card model',
      body: 'Every card transaction involves four parties: the cardholder\u2019s bank (the issuer), the merchant\u2019s bank (the acquirer), the card scheme (Visa, Mastercard), and the merchant itself. The issuer takes credit risk on the cardholder; the acquirer takes settlement risk on the merchant; the scheme sets the rules and routes transactions between them. Interchange fees flow from acquirer to issuer \u2014 roughly 0.2\u20130.3% in the EU after the Interchange Fee Regulation, but around 1.5\u20132.5% in the US where no comparable cap exists. Authorization happens in seconds over the scheme\u2019s network, but actual settlement between issuer and acquirer takes T+1 to T+2. This gap between authorization speed and settlement speed is worth noting: it\u2019s the same pattern you\u2019ll see in securities markets (Module 08), and one of the things tokenized settlement proposals claim to close.',
    },
    {
      kind: 'matrix',
      heading: 'Comparing the major rail types',
      data: {
        columns: ['Typical speed', 'Operating hours', 'Cross-border?', 'Settlement finality'],
        items: [
          { id: 'swift', label: 'SWIFT / correspondent', color: '#7AA7D9', values: ['1\u20133 business days', 'Bank hours, cut-offs apply', 'Yes \u2014 core use case', 'Final, but multi-hop'] },
          { id: 'rtgs', label: 'Domestic RTGS (e.g. CHAPS)', color: '#5FB3A3', values: ['Same day, near real-time', 'Extended hours (06:00\u201320:00 UK, moving toward near-24/7)', 'No \u2014 domestic only', 'Immediate, irrevocable'] },
          { id: 'card', label: 'Card networks', color: '#E8A33D', values: ['Seconds (auth), T+1\u20132 (settle)', '24/7 authorization', 'Yes, with FX markup', 'Auth fast, settlement delayed'] },
          { id: 'ach', label: 'ACH / Faster Payments', color: '#C792E8', values: ['Seconds to next-day', 'Mostly 24/7 (newer schemes)', 'Limited, scheme-dependent', 'Final once cleared'] },
          { id: 'fps', label: 'UK Faster Payments', color: '#E0726B', values: ['Seconds', '24/7/365', 'No \u2014 domestic only', 'Immediate, irrevocable (up to \u00A31M limit)'] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'ISO 20022: the infrastructure migration happening now',
      body: 'ISO 20022 is a new messaging standard replacing older formats (SWIFT\u2019s MT messages) across payment systems globally. SWIFT began its MT-to-MX migration in March 2023, with full cutover expected by November 2025. The key change: structured, data-rich messages instead of free-text fields. Where an MT103 might carry a remittance reference in an unstructured 70-character block, an MX equivalent (pacs.008) uses tagged, machine-readable fields for debtor name, creditor account, purpose codes, and regulatory references. This matters because richer data means better straight-through processing rates, fewer manual repairs when a payment gets stuck, better sanctions and AML screening (because names and addresses are parsed, not guessed from free text), and \u2014 critically \u2014 the foundation for interoperability between legacy rails and newer ones, including CBDC platforms and tokenized settlement systems. CHAPS migrated to ISO 20022 in June 2023; the Eurosystem\u2019s TARGET2 went live on the new standard in March 2023. This migration is unglamorous but foundational \u2014 it\u2019s the plumbing upgrade that makes many later innovations in this course technically feasible.',
    },
    {
      kind: 'text',
      heading: 'CLS and FX settlement risk',
      body: 'CLS (Continuous Linked Settlement) exists to solve one specific problem: FX settlement risk, also called Herstatt risk after Bankhaus Herstatt\u2019s 1974 failure. When two currencies are exchanged, there\u2019s a window where one leg has settled but the other hasn\u2019t \u2014 you\u2019ve paid out your currency but haven\u2019t received the other side. If your counterparty fails during that window, you lose the full principal amount, not just the market movement. CLS eliminates this by settling both legs simultaneously using a payment-versus-payment (PvP) mechanism. It settles roughly $6 trillion in FX transactions daily across 18 currencies. Despite its scale, CLS only covers a subset of global FX volume \u2014 many emerging-market currencies are not included, and those transactions still carry settlement risk. This is relevant context for Modules 08 and 13, which cover how DLT-based proposals attempt to solve the same problem through atomic settlement on shared ledgers.',
    },
    {
      kind: 'text',
      heading: 'The friction points worth remembering',
      body: 'Five things to keep in your head as you go through later modules, because almost every \u201Cwhy bother\u201D question comes back to one of these: <b>speed</b> (multi-day settlement for cross-border), <b>cost</b> (multiple correspondent fees plus FX spread), <b>operating hours</b> (cut-off times, weekends, holidays), <b>reconciliation</b> (every bank in the chain keeps its own ledger, reconciled after the fact), and <b>finality</b> (a payment can be \u201Csent\u201D without being truly final for some time). The reconciliation point deserves extra attention: each bank in the chain maintains its own ledger with its own account numbers, transaction references, and cut-off times. There is no single \u201Cgolden record.\u201D After settlement, banks reconcile by matching their records against each other, often with a day\u2019s lag, and discrepancies require manual investigation. A single mismatched reference or truncated beneficiary name can leave a payment in a \u201Cpending investigation\u201D queue for days. This is the core problem that shared-ledger proposals (Modules 04, 08) claim to solve \u2014 if all parties read from the same ledger, reconciliation becomes redundant. Whether that\u2019s realistic at scale is a different question.',
    },
    {
      kind: 'case',
      heading: 'SWIFT gpi: patching the pipes',
      data: {
        title: 'SWIFT gpi: patching the existing pipes',
        dateRange: '2017\u2013present',
        whatHappened: 'SWIFT launched Global Payments Innovation (gpi) to address speed and transparency complaints without replacing correspondent banking itself. gpi introduced a unique end-to-end transaction reference (UETR) that tracks a payment across all correspondent hops in real time, plus a rule requiring gpi banks to credit beneficiary accounts within the same business day. By 2024, over 4,000 banks had adopted gpi, and SWIFT reported that 50% of gpi payments are credited within 30 minutes, with 40% in under 5 minutes.',
        whyItMatters: 'gpi shows how much improvement is possible within the existing infrastructure \u2014 no DLT, no new money form, just better tracking and service-level commitments. It also illustrates the incumbency advantage: SWIFT\u2019s 11,000+ member network is extraordinarily hard to replicate. The question for Modules 08\u201309 is whether DLT-based alternatives can offer something gpi fundamentally cannot, or whether gpi\u2019s incremental approach is enough.',
        source: 'SWIFT gpi',
        sourceUrl: 'https://www.swift.com/our-solutions/swift-gpi',
        verifiedAsOf: 'Q4 2024',
      },
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          {
            question: 'What is a nostro account?',
            options: ['An account a bank holds at another bank', 'A central bank reserve account', 'A customer savings account', 'A clearing house margin account'],
            correctIndex: 0,
            explanation: 'A nostro account is \u201Cour account at your bank\u201D \u2014 an account one bank maintains at another for settling transactions in that currency.',
          },
          {
            question: 'What problem does CLS solve in FX markets?',
            options: ['Credit risk between counterparties', 'Settlement risk where one currency leg settles before the other', 'Interest rate risk on open positions', 'Liquidity risk in illiquid currency pairs'],
            correctIndex: 1,
            explanation: 'CLS eliminates Herstatt risk by settling both legs of an FX transaction simultaneously using payment-versus-payment.',
          },
          {
            question: 'What is the key change ISO 20022 brings to payment messaging?',
            options: ['Encrypted messaging for privacy', 'Structured, data-rich messages replacing free-text formats', 'Real-time settlement instead of batch processing', 'Decentralized message routing without SWIFT'],
            correctIndex: 1,
            explanation: 'ISO 20022 replaces older free-text MT formats with structured MX messages, enabling better straight-through processing and richer data for compliance screening.',
          },
        ],
      },
    },
  ],
};

export default content;
