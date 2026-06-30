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
      body: `If stablecoins threaten bank deposit funding (Topic 03), why would any bank help customers buy them? Because the deposit can already leave through Coinbase or Revolut whether the bank participates or not. The real choice isn't "allow it or block it." It's "be in the room or be cut out of it."`,
    },
    {
      kind: 'matrix',
      heading: 'The strategic options on the table',
      data: {
        columns: ['What it protects', 'What it risks', 'Real-world examples'],
        items: [
          { id: 'build', label: 'Build your own token', color: '#7AA7D9', values: [`Full control, keeps the deposit on balance sheet (tokenized deposit)`, `Significant build cost, and only works if customers actually adopt it over USDC/USDT`, `JPMorgan Kinexys (publicly reported volumes in the billions daily), Société Générale FORGE (digital bonds issued on Ethereum public chain)`] },
          { id: 'partner', label: 'Offer customer access to an existing issuer', color: '#E8A33D', values: [`Keeps the customer relationship and fee income even as the deposit leaves`, `Doesn't defend the balance sheet at all, a pure retention play`, `Standard Chartered's Zodia Markets (institutional crypto trading), multiple banks embedding USDC purchase in mobile apps`] },
          { id: 'consortium', label: 'Join a bank consortium', color: '#C792E8', values: [`Shares build cost and pools scale against Big Tech and crypto-native rivals`, `Slower and consensus-driven, and depends on every member actually adopting it`, `Qivalis (EU banks), Regulated Liability Network (RLN)`] },
          { id: 'nothing', label: 'Do nothing', color: '#9FB7CC', values: [`Avoids the build cost and regulatory exposure entirely`, `Customers leave for a competitor or a crypto-native platform anyway`, `None`] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'Bank digital asset strategies in practice',
      body: `The "build vs buy vs partner" question plays out differently depending on the bank's size, existing infrastructure, and strategic bet. <b>JPMorgan</b> went all-in on building. Kinexys (formerly Onyx) runs its own permissioned blockchain for wholesale payments, with publicly reported daily settlement volumes in the billions of dollars as of early 2025. <b>Standard Chartered</b> chose the partnership route, spinning off two separate entities: Zodia Custody (institutional-grade crypto custody, joint venture with Northern Trust) and Zodia Markets (institutional trading), rather than building blockchain infrastructure in-house. <b>HSBC</b> built its Orion platform to tokenize bonds and other assets on a private blockchain, issuing a tokenized gold product in Hong Kong in 2023 and a $750M digital bond in 2024. <b>DBS</b> (Singapore's largest bank) launched the DBS Digital Exchange, offering institutional clients direct access to tokenized securities and crypto trading under MAS regulatory oversight, one of the first regulated bank-operated crypto exchanges in Asia. <b>Société Générale</b>'s FORGE subsidiary went furthest on public chain adoption, issuing digital bonds directly on Ethereum, a deliberate bet that public blockchains, not private ones, will become the settlement layer for institutional finance.`,
    },
    {
      kind: 'text',
      heading: 'How banks structure digital asset teams internally',
      body: `Banks don't just launch a "crypto team." The organizational design reveals how seriously they're taking it and where they think the risk sits. The most common model is a dedicated digital assets unit reporting to the CTO or head of markets (JPMorgan's Kinexys sits under Onyx, which reports to the global head of payments). Some banks embed digital asset capabilities within existing business lines, such as treasury, securities services or custody, rather than creating a standalone unit, which keeps it closer to revenue but risks it being deprioritized when the existing business is under pressure. A third model is the subsidiary approach: Standard Chartered spun off Zodia as a separate legal entity, which gives it regulatory separation and operational freedom but limits knowledge transfer back to the parent. Most large banks now have 50–200 staff in digital assets, with the majority in engineering, followed by compliance, then product. The compliance-to-engineering ratio is notably higher than in traditional banking product teams, typically 1:3 vs. 1:8, reflecting the regulatory overhead of operating in this space.`,
    },
    {
      kind: 'text',
      heading: 'Embedded finance and Banking-as-a-Service (BaaS)',
      body: `A growing number of banks are discovering they don't need to face retail crypto customers directly. They can provide the infrastructure for fintechs to do it instead. This is the "crypto-as-a-service" or embedded finance model: a bank offers its banking license, fiat on/off-ramps, custody, and compliance infrastructure as APIs that fintechs plug into. Solarisbank in Germany and Cross River Bank in the US have built significant businesses this way. The fintech handles the user experience and customer acquisition, while the bank handles the regulated plumbing. For the bank, this model generates fee income without the brand risk of being publicly associated with crypto volatility. For the fintech, it removes the 12–18 months and $500K+ cost of obtaining its own banking or money transmitter license. The risk is dependency. If the bank decides to exit crypto, as Silvergate and Signature did under pressure in 2023, every fintech built on its rails is suddenly scrambling for a new partner.`,
    },
    {
      kind: 'text',
      heading: 'The honest tension underneath all of it',
      body: `Banks are simultaneously defending deposits (tokenized deposits, CBDC advocacy) and participating in the thing that threatens those deposits (stablecoin access, custody services), because nobody yet knows which side wins, and being absent from both is the worst outcome of all. This isn't strategic confusion. It's a deliberate hedge under genuine uncertainty.

Banks are hedging. But what happens when things go wrong? The next topic catalogues the failure modes, the six ways digital finance systems actually break.`,
    },
    {
      kind: 'case',
      heading: 'Case study: JPMorgan Kinexys',
      data: {
        title: 'JPMorgan Kinexys: from Onyx to production-scale settlement',
        dateRange: '2020–present',
        whatHappened: `JPMorgan launched its blockchain-based payment platform as "Onyx" in October 2020, initially processing a modest volume of intrabank transfers using JPM Coin, a permissioned token representing dollar deposits held at JPMorgan. By 2023, the platform was processing over $1 billion per day. In late 2024, JPMorgan rebranded Onyx to "Kinexys" and expanded beyond payments into multi-currency settlement and cross-border treasury management. As of publicly reported figures from early 2025, Kinexys processes settlement volumes in the billions of dollars daily, with clients reported to include Siemens, FedEx, and Cargill using it primarily for 24/7 cross-border treasury transfers, settling in minutes what previously took 1–3 business days through correspondent banking. Kinexys runs on a private, permissioned blockchain (based on a modified Ethereum codebase) with JPMorgan as the sole validator. Every token is fully backed by dollar deposits at JPMorgan. It's a tokenized deposit, not a stablecoin, which means it never leaves the bank's balance sheet.`,
        whyItMatters: `Kinexys demonstrates the "build" strategy at scale. By keeping everything on-balance-sheet as tokenized deposits rather than issuing stablecoins, JPMorgan gets the speed and programmability benefits of blockchain settlement without cannibalizing its own deposit base. The tradeoff is that Kinexys only works for JPMorgan clients moving money between JPMorgan accounts. It's a closed-loop system, powerful within its walls but not interoperable with the broader crypto network. Whether that's a feature or a limitation depends on whether you think the future is open or permissioned networks.`,
        source: 'JPMorgan Kinexys press releases; Bloomberg reporting on transaction volumes; company filings',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: `Why did Standard Chartered spin off Zodia as a separate legal entity rather than building digital asset capabilities in-house?`, options: [`To avoid all regulatory requirements for digital assets`, `To gain regulatory separation and operational freedom, though at the cost of limited knowledge transfer back to the parent`, `Because UK regulations require crypto operations to be in separate entities`, `To allow Zodia to issue its own stablecoin without bank oversight`], correctIndex: 1, explanation: `The subsidiary model gives regulatory separation and operational freedom but limits knowledge transfer back to the parent bank, a deliberate structural tradeoff.` },
          { question: `What makes JPMorgan Kinexys a tokenized deposit rather than a stablecoin, and why does that distinction matter strategically?`, options: [`Tokenized deposits pay interest while stablecoins do not`, `Kinexys tokens never leave JPMorgan’s balance sheet, preserving the bank’s deposit funding base`, `Tokenized deposits are regulated by the SEC while stablecoins are not`, `There is no meaningful difference, the terms are interchangeable`], correctIndex: 1, explanation: `Kinexys tokens represent dollar deposits that stay on JPMorgan's balance sheet, unlike stablecoins, which move the deposit to the issuer. This is the core strategic advantage: blockchain speed without cannibalizing deposits.` },
          { question: `What is the main risk of the Banking-as-a-Service (BaaS) model for fintechs offering crypto services?`, options: [`BaaS providers charge prohibitively high API fees`, `If the partner bank exits crypto, every fintech built on its rails must scramble for a new partner`, `BaaS arrangements are illegal under MiCA`, `Fintechs using BaaS cannot offer stablecoins to customers`], correctIndex: 1, explanation: `The dependency risk is real. When Silvergate and Signature Bank collapsed or exited under pressure in 2023, fintechs built on their infrastructure were left scrambling for alternatives.` },
        ],
      },
    },
  ],
};

export default content;
