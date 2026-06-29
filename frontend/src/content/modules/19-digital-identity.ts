import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'digital-identity',
  number: '19',
  title: 'Digital identity & KYC',
  summary: 'How identity verification works, why it costs so much, and what blockchain changes.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `Nothing in digital finance — stablecoins, tokenized deposits, DeFi, CBDC — can reach mainstream adoption without solving the identity problem. Every regulated entity must verify who its customers are (KYC — Know Your Customer), screen them against sanctions lists (AML — Anti-Money Laundering), and monitor transactions for suspicious activity. This compliance layer is invisible to most consumers but shapes everything about how financial products are built, priced, and distributed.`,
    },
    {
      kind: 'text',
      heading: 'What KYC actually costs',
      body: `<p>KYC compliance is not a checkbox — it's a major operational cost. A typical <b>customer onboarding check</b> (identity document verification, sanctions screening, PEP checks, proof of address) costs <b>$15–70 per customer</b> for a retail account and <b>$1,500–25,000+</b> for a corporate/institutional client with complex ownership structures.</p>
<p>Ongoing monitoring costs compound this: transaction monitoring systems, periodic re-verification, suspicious activity reporting (SARs), and the staff to review alerts. The total global AML compliance spend across financial services is estimated at <b>$274 billion per year</b> (LexisNexis Risk Solutions, 2024). For a small crypto exchange seeking a MiCA license, compliance can cost <b>$250K–$1M in the first year alone</b> — a genuine barrier to entry.</p>
<p>Despite this spend, the estimated global effectiveness rate of AML controls is below 1% — meaning over 99% of illicit financial flows are not intercepted. The system catches paperwork violations more often than actual criminals.</p>`,
    },
    {
      kind: 'matrix',
      heading: 'Identity in traditional vs crypto finance',
      data: {
        columns: ['Identity model', 'Who verifies', 'Portability', 'Privacy'],
        items: [
          { id: 'trad', label: 'Traditional finance', color: '#7AA7D9', values: ['Every institution re-verifies you from scratch', 'Each bank, broker, exchange independently', 'None — start over at every new institution', 'Institution holds all your data centrally'] },
          { id: 'cex', label: 'Crypto CEX', color: '#E8A33D', values: ['Same as traditional — full KYC per exchange', 'The exchange, using third-party providers (Jumio, Onfido)', 'None — same duplication problem', 'Exchange holds your data (and may be hacked)'] },
          { id: 'dex', label: 'Crypto DEX', color: '#5FB3A3', values: ['Pseudonymous — wallet address only', 'Nobody — that is the point (and the regulatory problem)', 'Full — your wallet works everywhere', 'Strong — but makes compliance nearly impossible'] },
          { id: 'did', label: 'Decentralized identity (emerging)', color: '#C792E8', values: ['Verifiable credential issued once, reused many times', 'Original issuer (bank, government), verified cryptographically', 'Full — you carry your credential', 'Selective disclosure — prove you are over 18 without revealing your birthday'] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'The travel rule problem',
      body: `<p>The FATF Travel Rule (Topic 14) requires that crypto transfers above a threshold carry sender and recipient identification — mirroring wire transfer rules. For CEX-to-CEX transfers, this works: both exchanges know their customers. But the rule breaks down at three boundaries:</p>
<p><b>CEX to self-custody wallet</b>: the exchange knows the sender but cannot verify who controls the receiving wallet. Most exchanges now require you to "prove" ownership of the destination wallet (signing a message with the private key) before allowing withdrawal.</p>
<p><b>Self-custody to self-custody</b>: no intermediary exists to attach identity data. This is the fundamental tension between DeFi's design philosophy and AML regulation.</p>
<p><b>Cross-border transfers</b>: different jurisdictions implement the Travel Rule differently (or not at all), creating gaps that sophisticated actors exploit.</p>
<p>This is not a theoretical problem — it is the single biggest reason DeFi cannot currently serve regulated institutions at scale, and why "institutional DeFi" platforms (Aave Arc, Fireblocks) exist specifically to add a KYC layer on top of DeFi protocols.</p>`,
    },
    {
      kind: 'text',
      heading: 'Decentralized identity: the potential solution',
      body: `<p><b>Verifiable Credentials (VCs)</b> are the W3C standard that could break the cycle of repeated identity verification. The concept: a trusted issuer (your bank, your government) issues a cryptographically signed credential that you hold in a digital wallet. When a new service needs to verify your identity, you present the credential — they can cryptographically verify it came from the trusted issuer without contacting that issuer or receiving your raw personal data.</p>
<p><b>Selective disclosure</b> goes further: you can prove "I am over 18" or "I passed KYC at a regulated institution" without revealing your name, address, or date of birth. The EU's eIDAS 2.0 regulation (in force from 2026) mandates that every EU citizen must have access to a European Digital Identity Wallet capable of holding VCs.</p>
<p>For digital finance, this matters because it could make KYC a <b>one-time event</b> rather than a per-institution cost — a KYC credential from one bank could be reused at another, at a crypto exchange, or at a DeFi protocol's compliance layer, without re-submitting your passport photo every time.</p>
<p>Identity is the prerequisite for regulation. The next topic covers the actual rulebooks — MiCA, GENIUS Act, Basel III — and how they're reshaping the industry.</p>`,
    },
    {
      kind: 'case',
      heading: 'Identity at scale: India\'s Aadhaar',
      data: {
        title: 'Aadhaar and eKYC — how 1.4 billion people got digital identity',
        dateRange: 'Launched 2009, eKYC from 2013',
        whatHappened: `India's Aadhaar system issued a unique 12-digit identity number to over 1.4 billion residents, backed by biometrics (fingerprints, iris scans). The eKYC layer built on top allows a financial institution to verify a customer's identity in under 10 seconds for roughly $0.03 per verification — compared to $15–70 for manual KYC. By 2026, eKYC had facilitated the opening of over 500 million bank accounts (Jan Dhan Yojana scheme), made India's UPI possible (since every account is identity-linked), and become the backbone of the country's digital public infrastructure stack.`,
        whyItMatters: `Aadhaar demonstrates that the identity problem is solvable at population scale if the government provides the infrastructure. It also shows the privacy trade-off: a centralized biometric database creates a single point of surveillance and breach risk. The EU's eIDAS approach (decentralized, citizen-controlled wallets) is a deliberate architectural response to Aadhaar's centralized model — solving the same problem with different privacy properties.`,
        source: 'UIDAI official statistics; World Bank ID4D dataset; Reserve Bank of India financial inclusion reports',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'What is the estimated global annual spend on AML compliance across financial services?', options: ['$27 billion', '$274 billion', '$2.7 trillion', '$27 million'], correctIndex: 1, explanation: 'Global AML compliance costs are estimated at roughly $274 billion per year, yet the effectiveness rate remains below 1%.' },
          { question: 'What problem does the FATF Travel Rule create for self-custody wallet transfers?', options: ['It makes wallets illegal in most jurisdictions', 'No intermediary exists to attach the required sender/recipient identity data', 'It requires all wallets to be registered with a central authority', 'It bans transfers above $1,000'], correctIndex: 1, explanation: 'Self-custody-to-self-custody transfers have no intermediary to carry the identity information the Travel Rule requires.' },
          { question: 'What does "selective disclosure" mean in decentralized identity?', options: ['Only sharing your identity with selected institutions', 'Proving a specific claim (e.g. "I am over 18") without revealing the underlying data (e.g. your date of birth)', 'Choosing which blockchain to store your identity on', 'Allowing institutions to selectively verify parts of your transaction history'], correctIndex: 1, explanation: 'Selective disclosure lets you prove a claim cryptographically without exposing the raw personal data behind it.' },
        ],
      },
    },
  ],
};

export default content;
