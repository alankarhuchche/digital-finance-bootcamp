import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'privacy',
  number: '20',
  title: 'Privacy & data',
  summary: 'The elephant in every CBDC room, and why blockchain transparency cuts both ways.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `Privacy is the issue that sits beneath almost every debate in digital finance — CBDC design, stablecoin regulation, DeFi's resistance to KYC, blockchain analytics, and data protection law. It is also the issue most often discussed in vague terms ("we care about privacy") without explaining what privacy actually means technically, who has it, and who doesn't.`,
    },
    {
      kind: 'matrix',
      heading: 'Privacy by payment method — who can see what',
      data: {
        columns: ['Who sees the transaction', 'What they see', 'Can it be linked to your identity?'],
        items: [
          { id: 'cash', label: 'Physical cash', color: '#E8A33D', values: ['Nobody', 'Nothing — cash leaves no record', 'No — fully anonymous'] },
          { id: 'card', label: 'Card payment', color: '#7AA7D9', values: ['Your bank, the merchant\'s bank, the card scheme, the merchant', 'Amount, time, merchant name, your identity', 'Yes — directly linked via your bank account'] },
          { id: 'bitcoin', label: 'Bitcoin / public blockchain', color: '#5FB3A3', values: ['Everyone — the ledger is public', 'Amount, sender/receiver addresses, time', 'Pseudonymous — not directly, but chain analysis firms (Chainalysis, Elliptic) can link addresses to identities with ~85% accuracy for exchange-linked addresses'] },
          { id: 'cbdc', label: 'CBDC (as typically designed)', color: '#C792E8', values: ['The central bank (issuer), possibly intermediaries', 'Depends entirely on the design — could range from card-level visibility to near-cash privacy', 'Depends on design — the privacy model is a policy choice, not a technical constraint'] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'The CBDC privacy debate',
      body: `<p>Privacy is the single most cited public concern about CBDCs. In every consultation — Bank of England, ECB, Federal Reserve — "the government will see all my transactions" is the number one objection. The concern is not theoretical: a CBDC gives the issuing central bank a direct view of retail transaction activity that it has never had before. Even in today's digital payment system, your bank sees your transactions but the central bank does not — it only sees aggregated data.</p>
<p>CBDC designers face a genuine trilemma:</p>
<p><b>Full visibility</b> (like a bank account): the central bank can see every transaction. Best for AML compliance, worst for civil liberties. No major democratic nation has proposed this.</p>
<p><b>Tiered privacy</b> (the most common design): small transactions are private (like cash), larger transactions trigger identity checks and reporting. The ECB's digital euro proposal uses this model — transactions below a threshold would have "cash-like" privacy, while above it, standard AML rules apply. The threshold itself becomes a political decision.</p>
<p><b>Cryptographic privacy</b> (technically possible but rarely proposed): using zero-knowledge proofs to verify AML compliance without revealing transaction details. The technology exists (Zcash, Tornado Cash), but regulators are deeply uncomfortable with it — Tornado Cash was sanctioned by the US Treasury in 2022, and its developer was convicted in 2024.</p>`,
    },
    {
      kind: 'text',
      heading: 'Blockchain analytics: the end of pseudonymity',
      body: `<p>Public blockchains are transparent by design — every transaction is visible to everyone. The original assumption was that using addresses instead of names provided "pseudonymity." That assumption is largely dead.</p>
<p><b>Chainalysis</b> (valued at $4.2B in 2024), <b>Elliptic</b>, and <b>TRM Labs</b> can link blockchain addresses to real-world identities by analyzing transaction patterns, exchange deposit/withdrawal records (which require KYC), and social graph connections. Law enforcement agencies in 30+ countries use these tools. The Ronin Bridge and Colonial Pipeline ransomware recoveries both relied on blockchain analytics to trace and seize funds.</p>
<p>This creates a paradox: public blockchains provide <b>less</b> financial privacy than the traditional banking system, not more. Your bank can see your transactions, but your neighbor cannot. On a public blockchain, <b>everyone</b> can see your transaction history — and with chain analysis, link it to you. The "crypto is for criminals" narrative is increasingly backwards: cash provides far more anonymity than Bitcoin.</p>`,
    },
    {
      kind: 'text',
      heading: 'Data protection law meets blockchain',
      body: `<p>GDPR (and the UK's equivalent) creates a direct tension with blockchain's immutability. The <b>right to erasure</b> ("right to be forgotten") says individuals can demand deletion of their personal data. But blockchain's core property is that data, once written, cannot be deleted — that's the whole point.</p>
<p>In practice, this has been managed by keeping personal data <b>off-chain</b> (stored in a traditional database, with only a hash or reference on-chain) and by designing systems so that on-chain data is not "personal data" under GDPR's definition. But the boundary is grey — a blockchain address that has been linked to an identity arguably becomes personal data, even if no name appears on-chain.</p>
<p>This is not a future problem — it is an active legal uncertainty that affects every project building on public blockchains in EU/UK jurisdictions.</p>`,
    },
    {
      kind: 'case',
      heading: 'When privacy tools become sanctions targets',
      data: {
        title: 'Tornado Cash sanctions and conviction',
        dateRange: 'Sanctioned August 2022; developer convicted May 2024',
        whatHappened: `Tornado Cash was a smart contract on Ethereum that mixed transactions to break the link between sender and receiver — a "privacy mixer." The US Treasury's OFAC sanctioned Tornado Cash in August 2022, making it illegal for US persons to interact with the smart contract. This was unprecedented: sanctioning code, not a company or person. Developer Alexey Pertsev was convicted in the Netherlands in May 2024 of money laundering facilitation, sentenced to 64 months. Approximately $455 million in proceeds from the Ronin Bridge hack had been laundered through Tornado Cash.`,
        whyItMatters: `Tornado Cash crystallizes the privacy debate: the same tool that protects legitimate privacy (activists, domestic abuse survivors, journalists in authoritarian states) also enables money laundering at industrial scale. The sanctions and conviction established that writing privacy-preserving code can carry criminal liability if the tool is "predominantly" used for illicit purposes — a precedent that affects every privacy-focused project in the space. The ECB's tiered privacy model for the digital euro is a direct attempt to thread this needle: some privacy for small amounts, compliance for large ones.`,
        source: 'US Treasury OFAC press release; Dutch court ruling (ECLI:NL:RBOBR:2024:2069); Chainalysis blog on Ronin tracing',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'text',
      heading: 'The privacy spectrum in practice',
      body: `<p>Rather than "privacy or no privacy," every digital finance system sits on a spectrum:</p>
<p><b>Cash</b>: fully anonymous, no audit trail — the gold standard for privacy, and the reason it's slowly being restricted in many jurisdictions (EU caps cash payments at €10,000 from 2027).</p>
<p><b>Bank account</b>: your bank sees everything, but nobody else does without a court order.</p>
<p><b>Public blockchain</b>: everyone sees the transactions, chain analysis can link addresses to identities — paradoxically less private than a bank account.</p>
<p><b>CBDC (tiered model)</b>: small amounts private like cash, larger amounts visible like a bank account — the design sweet spot most central banks are targeting.</p>
<p><b>Privacy-preserving blockchain</b> (ZKPs, mixers): strong privacy but regulatory hostility — currently the hardest to build legally.</p>
<p>The direction of travel is toward tiered systems where privacy is proportional to the amount — the exact model the FATF Travel Rule, MiCA, and the digital euro proposal all converge on.</p>
<p>Privacy shapes what's possible. The next topic looks at how banks are actually responding to all of this — defending deposits while simultaneously building the alternatives.</p>`,
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'Why do public blockchains paradoxically offer less financial privacy than traditional banking?', options: ['Blockchain transactions are encrypted and only visible to regulators', 'Everyone can see all transactions, and chain analysis firms can link addresses to identities with high accuracy', 'Banks share all customer data publicly', 'Public blockchains require government ID for every transaction'], correctIndex: 1, explanation: 'Public blockchains make every transaction visible to everyone, and chain analysis firms can link pseudonymous addresses to real identities — unlike banking, where only your bank sees your transactions.' },
          { question: 'What is the "tiered privacy" model being proposed for most CBDCs?', options: ['Full anonymity for all transactions', 'Small transactions have cash-like privacy; larger ones trigger AML identity checks', 'All transactions are fully visible to the central bank', 'Privacy is determined by the user\'s subscription tier'], correctIndex: 1, explanation: 'Tiered privacy gives cash-like anonymity for small amounts while requiring standard AML compliance for larger transactions — the threshold is a policy choice.' },
          { question: 'Why does GDPR\'s "right to erasure" create tension with blockchain?', options: ['GDPR bans the use of cryptography', 'Blockchain\'s immutability means data cannot be deleted, conflicting with the right to demand deletion of personal data', 'GDPR requires all data to be stored on blockchain', 'Blockchain automatically deletes data after 5 years'], correctIndex: 1, explanation: 'Blockchain is designed so data cannot be altered or deleted once written — directly conflicting with GDPR\'s right to erasure if on-chain data qualifies as personal data.' },
        ],
      },
    },
  ],
};

export default content;
