import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'regulation',
  number: '14',
  title: 'Regulation',
  summary: 'MiCA, GENIUS Act, FATF, Basel.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `Topic 03 showed who regulation actually protects — customers, banks, central banks, economies. This topic is the rulebooks themselves: what they actually require, the timeline that’s been forcing the industry’s hand, and the jurisdictional chess game that issuers and exchanges play to find the friendliest regime.`,
    },
    {
      kind: 'timeline',
      heading: 'MiCA’s rollout, in order',
      data: {
        events: [
          { date: 'Jun 2024', title: 'Stablecoin issuer rules enforceable', detail: '1:1 reserve backing, segregation, and redemption-at-par rules for EMTs/ARTs take effect.', status: 'done' },
          { date: 'Dec 2024', title: 'CASP licensing rules enforceable', detail: 'Exchanges and other venues need a MiCA license to operate at all — this is "Title V," the rule that forces delistings.', status: 'done' },
          { date: 'Jul 2026', title: 'Transition period ends', detail: 'No more grandfathering for firms operating under old national rules — full enforcement, EU-wide, no extensions.', status: 'deadline' },
        ],
      },
    },
    {
      kind: 'matrix',
      heading: 'MiCA vs the GENIUS Act',
      data: {
        columns: ['Scope', 'Reserve rule', 'Licensing', 'Why Tether balked at one'],
        items: [
          { id: 'mica', label: 'MiCA (EU)', color: '#7AA7D9', values: [`Full crypto-asset framework — stablecoins are one part of it`, `1:1 backing, with a meaningful share required in EU bank deposits`, `Authorized e-money or credit institution, per member state`, `Tether’s reserve strategy leans on yield-bearing assets like T-bills, not low-yield EU bank deposits — the EU rule cuts directly into the profit model`] },
          { id: 'genius', label: 'GENIUS Act (US, 2025)', color: '#5FB3A3', values: [`Narrower — payment stablecoins specifically`, `1:1 backing in high-quality liquid assets`, `Dual federal/state licensing paths`, `Less of a head-on clash with Tether’s model, though it explicitly bars stablecoins from paying interest to holders`] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'The UK FCA: principles-based, not prescriptive',
      body: `The UK’s Financial Conduct Authority takes a fundamentally different approach from MiCA. Where MiCA is a detailed rulebook — hundreds of pages of prescriptive requirements — the FCA operates on principles-based regulation: it defines outcomes firms must achieve (treat customers fairly, maintain adequate reserves, manage conflicts of interest) but gives firms more latitude in how they get there. Since January 2024 the FCA has required crypto firms to comply with its financial promotions regime, meaning any marketing to UK consumers must be fair, clear, and not misleading. The FCA’s cryptoasset registration regime has been notably strict: as of mid-2025, it had rejected or withdrawn over 85% of crypto firm applications, making the UK one of the hardest jurisdictions to get licensed in despite its reputation as a fintech hub.`,
    },
    {
      kind: 'matrix',
      heading: 'Asia’s licensing frameworks',
      data: {
        columns: ['Licensing model', 'Stablecoin stance', 'Notable feature'],
        items: [
          { id: 'hk', label: 'Hong Kong (SFC/HKMA)', color: '#E8A33D', values: [`Dual licensing: the SFC licenses virtual asset trading platforms under a dedicated VASP regime (effective June 2023); the HKMA oversees stablecoin issuers separately`, `The HKMA’s stablecoin sandbox (launched 2024) requires fiat-referenced stablecoins to hold reserves in high-quality, highly liquid assets with a licensed custodian in HK`, `Hong Kong is explicitly trying to attract crypto firms that left mainland China after its 2021 ban — a deliberate regulatory arbitrage play by the territory`] },
          { id: 'sg', label: 'Singapore (MAS)', color: '#C792E8', values: [`The Payment Services Act (PSA) requires a Major Payment Institution license for any firm dealing in digital payment tokens above set thresholds`, `MAS finalized its stablecoin regulatory framework in August 2023 — single-currency pegged stablecoins that meet reserve, disclosure, and audit requirements can be labeled "MAS-regulated"`, `Singapore approved only a handful of licenses out of hundreds of applications — MAS is deliberately high-bar, positioning itself as "quality over quantity" for institutional credibility`] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'Stablecoin regulatory arbitrage',
      body: `Stablecoin issuers don’t just comply with regulation — they shop for it. Tether’s decision to domicile in the British Virgin Islands, Circle’s choice to pursue US state money transmitter licenses plus a MiCA application for its EU entity, and Paxos’s move to obtain a MAS license in Singapore are all strategic jurisdiction picks. The logic is straightforward: reserve requirements differ (EU bank deposits vs. US T-bills vs. Singapore’s "high-quality liquid assets"), licensing costs differ (an EU e-money license can cost €350K+ in legal and compliance fees; a BVI registration is a fraction of that), and the regulatory reputation of the jurisdiction affects which institutional counterparties will deal with you. The result is a global patchwork where the same stablecoin may be fully licensed in one jurisdiction, operating under a transitional exemption in another, and effectively banned in a third.`,
    },
    {
      kind: 'text',
      heading: 'DeFi’s regulatory gap',
      body: `Most regulatory frameworks assume there is a legal entity to regulate — a company, a licensed institution, a named responsible person. DeFi protocols challenge this assumption fundamentally. When a lending protocol is governed by token holders voting on-chain, who is the "operator" that a regulator serves an enforcement notice to? The FATF’s 2021 guidance tried to answer this by introducing the concept of a "virtual asset service provider" (VASP) and arguing that anyone who maintains control or sufficient influence over a DeFi protocol is a VASP and must comply. In practice, enforcement has been selective: the SEC has pursued cases against specific developers and foundations (e.g., enforcement actions related to Uniswap Labs, LIDO), while genuinely decentralized protocols with no identifiable operator remain in a gray zone. The EU’s MiCA explicitly excludes "fully decentralized" services from its scope — but doesn’t define what "fully decentralized" means, which is either a pragmatic acknowledgment of the problem or a loophole large enough to drive a protocol through, depending on your perspective.`,
    },
    {
      kind: 'text',
      heading: 'The two you’ll hear less about, but matter',
      body: `<b>FATF’s Travel Rule</b> requires crypto transfers above a threshold to carry sender/recipient information — the same idea as wire transfer compliance in traditional banking, and the source of most of DeFi/self-custody’s compliance friction, since a peer-to-peer wallet transfer has no natural place to attach that data. <b>Basel III’s crypto exposure rules</b> set how much capital a bank must hold against crypto holdings — punitively high for unbacked crypto assets, which is a major reason banks have been slow to hold crypto directly on balance sheet, even when they’re happy to offer customer access to it.`,
    },
    {
      kind: 'text',
      heading: 'AML/KYC: the compliance cost nobody talks about',
      body: `For a small crypto firm, AML/KYC compliance is not just a legal checkbox — it’s a survival-level expense. Annual compliance costs for a small to mid-size crypto company typically range from $25,000 to $500,000+, covering transaction monitoring software (Chainalysis, Elliptic, or TRM Labs licenses alone run $50K–$200K/year), a dedicated compliance officer ($80K–$150K salary), external audit fees, and legal counsel for SAR filings and regulatory responses. For context, a 10-person crypto startup spending $250K/year on compliance is allocating roughly 15–25% of its operating budget to regulatory overhead before writing a single line of product code. This cost asymmetry is one reason the industry is consolidating: only well-capitalized firms can absorb the compliance burden, which ironically pushes the market toward the same centralization that crypto was designed to avoid.`,
    },
    {
      kind: 'text',
      heading: '“Same risk, same regulation”',
      body: `Despite their differences in approach, regulators globally are converging on one principle: if a crypto product creates the same risk as a traditional financial product, it should face the same regulation. A stablecoin that functions like a money market fund should be regulated like one. A crypto exchange that matches buyers and sellers should be regulated like a securities exchange. A lending protocol that takes deposits and makes loans should face bank-like oversight. This principle — sometimes called "same activity, same risk, same regulation" — is now explicitly endorsed by the FSB, the BIS, the EU (in MiCA’s preamble), and increasingly by US regulators. The practical implication is that the era of crypto operating in a regulatory vacuum is ending, not because regulators have invented new rules, but because they’re applying existing ones.

Regulation sets the rules. But one question cuts across every rule: how much should the system know about you? The next topic tackles privacy — the elephant in every CBDC and blockchain room.`,
    },
    {
      kind: 'case',
      heading: 'Case study: Binance’s regulatory journey',
      data: {
        title: 'Binance: from regulatory nomad to global compliance',
        dateRange: '2017–2024',
        whatHappened: `Binance launched in 2017 with no fixed headquarters and a deliberate strategy of operating across jurisdictions without obtaining local licenses. By 2021 it faced regulatory warnings or bans from the UK FCA, Japan’s FSA, the Netherlands, Germany, Italy, and others. In 2023 the US DOJ and CFTC brought charges; Binance agreed to a $4.3 billion settlement — the largest in crypto history — for AML and sanctions violations. CEO Changpeng Zhao (CZ) pled guilty to failing to maintain an effective AML program and stepped down. Under new CEO Richard Teng, Binance pivoted to a compliance-first strategy: it obtained or applied for licenses in France (DASP registration), Dubai (VASP license from VARA), Japan (through a local subsidiary), and multiple other jurisdictions. The company hired over 750 compliance staff by mid-2024 and implemented Chainalysis and internal monitoring systems across all markets.`,
        whyItMatters: `Binance’s arc is the crypto industry’s regulatory journey in miniature. The early model — operate globally, move fast, deal with regulators later — worked until it didn’t. The $4.3B settlement proved that "regulatory arbitrage through avoidance" has a price ceiling. Binance’s post-settlement pivot also demonstrated that even the largest crypto firm in the world ultimately concluded that licensing and compliance were cheaper than enforcement.`,
        source: 'US DOJ plea agreement (Nov 2023); CFTC consent order; Binance compliance reports 2024',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'callout',
      heading: 'Practitioner view',
      data: {
        tone: 'reality',
        body: `MiCA and the GENIUS Act look similar from a distance — both demand 1:1 reserves and licensing — but the reserve composition rules hit issuers' profit models differently, which is why Tether has resisted MiCA harder than the GENIUS Act. If you're assessing a stablecoin counterparty, read the reserve rule before the headline compliance claim. "Licensed" tells you the firm cleared a bar; it does not tell you where the bar was set.`,
      },
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'How does the UK FCA’s regulatory approach to crypto differ from the EU’s MiCA?', options: ['The FCA bans all crypto activity while MiCA permits it', 'The FCA uses principles-based regulation defining outcomes, while MiCA is a detailed prescriptive rulebook', 'The FCA only regulates stablecoins, while MiCA covers all crypto assets', 'The FCA requires higher reserve ratios than MiCA for all crypto assets'], correctIndex: 1, explanation: 'The FCA operates on principles-based regulation — defining outcomes firms must achieve rather than prescribing exactly how — while MiCA is a detailed, prescriptive framework with specific rules for each asset category.' },
          { question: 'What was the approximate size of Binance’s DOJ/CFTC settlement, and what did it primarily address?', options: ['$500 million for market manipulation', '$4.3 billion for AML and sanctions violations', '$1 billion for operating without a US license', '$10 billion for customer fund misuse'], correctIndex: 1, explanation: 'Binance agreed to a $4.3 billion settlement — the largest in crypto history — primarily for AML and sanctions compliance failures.' },
          { question: 'Why is DeFi regulation particularly difficult to enforce under existing frameworks?', options: ['DeFi protocols operate too quickly for regulators to monitor', 'Most frameworks assume a legal entity to regulate, but truly decentralized protocols may have no identifiable operator', 'DeFi transactions are encrypted and invisible to regulators', 'International law prohibits regulating decentralized software'], correctIndex: 1, explanation: 'Regulatory frameworks assume there is a company or named person to serve enforcement notices to. Genuinely decentralized protocols with no identifiable operator fall into a gray zone that existing rules struggle to address.' },
        ],
      },
    },
  ],
};

export default content;
