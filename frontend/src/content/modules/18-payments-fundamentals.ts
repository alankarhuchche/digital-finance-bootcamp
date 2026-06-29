import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'payments-fundamentals',
  number: '18',
  title: 'Payments fundamentals',
  summary: 'Card schemes, interchange, acquiring, and how money actually moves when you tap your phone.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `Before understanding how digital finance disrupts payments, you need to know how payments actually work today. When you tap your card at a coffee shop, at least four parties are involved, money flows through multiple systems, and the merchant doesn't see the funds for 1–2 days. Understanding this plumbing is what makes the "why bother with blockchain" question answerable.`,
    },
    {
      kind: 'flow',
      heading: 'The four-party card model',
      data: {
        viewBox: '0 0 400 220',
        boxes: [
          { id: 'cardholder', x: 10, y: 10, w: 120, h: 44, caption: 'CARDHOLDER', value: 'Taps card' },
          { id: 'merchant', x: 270, y: 10, w: 120, h: 44, caption: 'MERCHANT', value: 'Sells coffee' },
          { id: 'issuer', x: 10, y: 130, w: 120, h: 44, caption: 'ISSUING BANK', value: 'Your bank' },
          { id: 'acquirer', x: 270, y: 130, w: 120, h: 44, caption: 'ACQUIRING BANK', value: 'Merchant’s bank' },
          { id: 'scheme', x: 140, y: 70, w: 120, h: 44, caption: 'CARD SCHEME', value: 'Visa / Mastercard', valueColor: '#7AA7D9' },
        ],
        paths: [
          { d: 'M130,32 L270,32', animated: true, dotColor: '#E8A33D' },
          { d: 'M70,54 L70,130' },
          { d: 'M330,54 L330,130' },
          { d: 'M130,152 L200,92' },
          { d: 'M260,92 L270,152' },
        ],
        caption: `The card scheme (Visa, Mastercard) doesn't hold anyone's money — it runs the network rules and message routing. The issuing bank (your bank) takes the credit risk. The acquiring bank (merchant's bank) manages the merchant relationship. For a £3.00 coffee, the merchant might receive £2.94 after interchange (~0.3%) and acquirer fees (~1.5–2.5% total).`,
      },
    },
    {
      kind: 'text',
      heading: 'Where the money goes',
      body: `<p>On a typical UK card payment, the merchant pays a <b>merchant service charge (MSC)</b> of roughly 1.5–2.5% of the transaction value. That fee gets split:</p>
<p><b>Interchange fee</b> (~0.2–0.3% for debit, ~0.3% for consumer credit in the UK/EU, uncapped in the US where it can reach 2–3%): paid by the acquirer to the issuing bank. This is the largest component and the most regulated — the EU's Interchange Fee Regulation (IFR) caps it; the US Durbin Amendment caps debit interchange.</p>
<p><b>Scheme fee</b> (~0.01–0.05%): paid to Visa/Mastercard for routing the transaction through their network.</p>
<p><b>Acquirer margin</b> (the rest): the acquirer's cut for processing, fraud screening, chargebacks, and the terminal itself.</p>
<p>This fee structure is why fintech payment companies (Stripe, Adyen, Square) exist — they are acquirers competing on the margin portion, not on interchange which is set by regulation or scheme rules.</p>`,
    },
    {
      kind: 'matrix',
      heading: 'Payment methods compared',
      data: {
        columns: ['Settlement to merchant', 'Cost to merchant', 'Consumer protection', 'Cross-border'],
        items: [
          { id: 'card', label: 'Card (Visa/MC)', color: '#E8A33D', values: ['T+1 to T+2 business days', '1.5–2.5% (MSC)', 'Strong — chargeback rights', 'Yes, with FX markup (2–3%)'] },
          { id: 'bank', label: 'Bank transfer (FPS)', color: '#5FB3A3', values: ['Near-instant', 'Free or very low', 'Limited — no chargeback', 'No (domestic only)'] },
          { id: 'dd', label: 'Direct Debit', color: '#7AA7D9', values: ['3–5 business days', '~£0.10–0.50 flat', 'Good — Direct Debit Guarantee', 'Limited (SEPA in EU)'] },
          { id: 'wallet', label: 'Digital wallet (Apple Pay)', color: '#C792E8', values: ['Same as underlying card', 'Same as card', 'Same as card', 'Same as card'] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'Why this matters for digital finance',
      body: `<p>Card interchange generates roughly <b>$130 billion globally per year</b>. That revenue stream is what stablecoins and blockchain-based payments are ultimately competing with — if you can move value peer-to-peer on a blockchain for a fraction of a cent in gas fees, the ~2% card tax on every transaction becomes hard to justify. But cards offer something blockchain payments don't yet: <b>chargeback protection</b>, <b>fraud screening</b>, <b>rewards programs</b>, and the trust of a regulated banking system behind them.</p>
<p>The real competitive question isn't "blockchain vs cards" — it's whether stablecoins can layer on enough consumer protection to compete with the convenience consumers already expect, or whether card networks can reduce their costs enough to make the disruption unattractive.</p>`,
    },
    {
      kind: 'case',
      heading: 'Real-time payments: the incumbent response',
      data: {
        title: 'UK Faster Payments and the global push for instant settlement',
        dateRange: 'Launched May 2008, ongoing',
        whatHappened: `The UK launched Faster Payments in 2008 — one of the world's first real-time payment systems. By 2026 it processes over 4 billion transactions per year, settling in under 2 seconds, 24/7/365. India's UPI (2016) went further, handling 14+ billion transactions per month by 2026 with zero consumer fees. Brazil's Pix (2020) reached 150 million users in under 3 years. The US launched FedNow in July 2023, finally bringing real-time payments to the Federal Reserve system.`,
        whyItMatters: `Real-time payment systems are the incumbent financial system's answer to the "payments are too slow" argument. In countries with mature instant payment infrastructure, the case for blockchain-based retail payments weakens — the speed advantage disappears. This is partly why India and Brazil have deprioritized retail CBDC despite being active in wholesale: their existing rails already solve the speed problem for consumers.`,
        source: 'Pay.UK annual statistics; NPCI (India) monthly reports; Banco Central do Brasil Pix data',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'text',
      body: `Now that you understand how a domestic card payment works, the next topic zooms out to cross-border: what happens when money needs to move between countries and currencies.`,
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'In the four-party card model, who takes the credit risk when you buy something with your credit card?', options: ['The card scheme (Visa/Mastercard)', 'The acquiring bank', 'The issuing bank (your bank)', 'The merchant'], correctIndex: 2, explanation: 'The issuing bank extends credit to the cardholder and bears the risk of non-payment.' },
          { question: 'What is interchange, and who pays it?', options: ['A fee paid by the cardholder to Visa/Mastercard', 'A fee paid by the acquiring bank to the issuing bank, regulated by caps in the EU/UK', 'A tax on card transactions collected by the government', 'A subscription fee merchants pay to accept cards'], correctIndex: 1, explanation: 'Interchange flows from the acquirer to the issuing bank and is the largest component of the merchant service charge, capped at ~0.3% for credit in the EU.' },
          { question: 'Why do countries with mature real-time payment systems (UK, India, Brazil) deprioritize retail CBDC?', options: ['Their central banks lack technical capability', 'Real-time payments already solve the consumer speed problem, weakening the CBDC case', 'Retail CBDC is banned in those jurisdictions', 'Their populations prefer cash over digital payments'], correctIndex: 1, explanation: 'When Faster Payments, UPI, or Pix already settle in seconds for free, the "payments are too slow" argument for retail CBDC loses force.' },
        ],
      },
    },
  ],
};

export default content;
