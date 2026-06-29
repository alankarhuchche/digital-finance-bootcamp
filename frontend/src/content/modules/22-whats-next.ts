import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'whats-next',
  number: '22',
  title: `What's next`,
  summary: `Informed views as of June 2026 on where digital finance is heading — deposit tokens, stablecoins, wholesale settlement, and what banks should do now.`,
  ready: true,
  blocks: [
    {
      kind: 'text',
      heading: `Thesis`,
      body: `<p>As of June 2026, these are the views I hold about where digital finance in payments is heading. They are informed by what I see across banking infrastructure, regulatory trajectories, and real-world adoption patterns. They could be wrong.</p>
<p>What follows is not a summary of this site. It is an opinionated reading of the landscape — where I think the weight of evidence points, where the consensus is right, and where I believe it is mistaken.</p>`,
    },
    {
      kind: 'callout',
      heading: `The central question`,
      data: {
        tone: 'insight',
        body: `The most consequential shift is not the technology. It is whether the liability model for digital settlement money will be sovereign, commercial bank, or private issuer — and whether interoperability and control can work across all three.`,
      },
    },
    {
      kind: 'text',
      heading: `What stablecoins proved`,
      body: `<p>Stablecoins demonstrated something the banking industry was slow to acknowledge: 24/7 settlement on open networks at global scale is not a theoretical possibility — it is operational. By publicly reported estimates, major stablecoins settle tens of billions of dollars in daily on-chain volume (as of mid-2026), though these figures include trading turnover and are not directly comparable to traditional payment volumes.</p>
<p>That said, what stablecoins proved comes packaged with what they exposed. Issuer risk is real — reserves are not deposits, and redemption at par is a function of trust, not guarantee. The dependency on banking rails for fiat on/off-ramps means stablecoins cannot fully disintermediate the system they claim to bypass. And regulatory arbitrage, while effective in the short term, is not a durable foundation for institutional adoption.</p>
<p>The lesson is not that stablecoins will replace bank money. It is that programmable, always-on settlement is now a baseline expectation — and incumbents must match it or cede ground.</p>`,
    },
    {
      kind: 'text',
      heading: `Why deposit tokens matter`,
      body: `<p>Deposit tokens preserve the balance sheet structure that regulators and central banks understand. A tokenised deposit is still a claim on a regulated bank, still covered by deposit insurance frameworks, still subject to prudential oversight. This gives deposit tokens a regulatory clarity that stablecoins struggle to achieve.</p>
<p>The problem is the walled garden. Most deposit token initiatives — Kinexys, Fnality, Citi Token Services, regulated liability network pilots — operate within closed networks of pre-approved participants. This is by design: it simplifies compliance and preserves the bilateral trust model banks are comfortable with. But it limits network effects and leaves the open-network use case to stablecoins.</p>
<p>I expect deposit tokens to absorb a meaningful share of institutional settlement — particularly intraday liquidity, intrabank transfers, and collateral mobility — while stablecoins retain the open-access, cross-border, retail-adjacent flows.</p>`,
    },
    {
      kind: 'callout',
      heading: `The settlement divide`,
      data: {
        tone: 'strategy',
        body: `Deposit tokens will absorb institutional settlement use cases where participants already bank with regulated institutions — intraday liquidity, collateral mobility, intrabank treasury. Stablecoins will dominate open-network liquidity where speed, global reach, and permissionless access matter more than balance sheet provenance.`,
      },
    },
    {
      kind: 'text',
      heading: `Why retail CBDC is harder to justify in advanced economies`,
      body: `<p>In jurisdictions with mature faster payment systems — the UK with FPS, India with UPI, the EU with TIPS, the US with FedNow — the speed argument for retail CBDC is already solved. Consumers can send money in seconds. The question then becomes: what does a retail CBDC offer that existing infrastructure does not?</p>
<p>The honest answers are narrow but real: resilience against private-sector payment system failure, offline capability, stronger privacy guarantees than commercial alternatives, financial inclusion for the unbanked, and a public-sector counterweight to platform dominance in payments. Whether these justify the cost and complexity of a new monetary instrument is a political question as much as a technical one.</p>
<p>In emerging economies with less mature payment infrastructure, the case is stronger. But for the G7, I believe retail CBDC deployment will remain limited and largely experimental through 2028.</p>`,
    },
    {
      kind: 'text',
      heading: `Wholesale settlement is the real prize`,
      body: `<p>The highest-value application of tokenised money is not retail payments — it is the cash leg for delivery-versus-payment in tokenised asset markets. When a bond, a fund unit, or a repo is settled on-chain, the cash side must also be on-chain for atomic settlement to work. This is the wholesale CBDC and deposit token use case that central banks from the BIS Innovation Hub to the MAS to the Banque de France are actively piloting.</p>
<p>Getting the cash leg right unlocks the entire tokenised capital markets thesis. Getting it wrong — or leaving it to stablecoins with uncertain legal finality — risks building a new financial market infrastructure on a fragile monetary foundation.</p>`,
    },
    {
      kind: 'text',
      heading: `Interoperability as the strategic battleground`,
      body: `<p>The industry has learned, painfully, that no single blockchain will win. Ethereum, Solana, Canton, HQLAX, Fnality, various permissioned Hyperledger deployments — each serves different constituencies with different trade-offs. The fragmentation is structural, not temporary.</p>
<p>This means the winning layer is unlikely to be a ledger. It is more likely to be the control and interoperability layer that lets regulated institutions move value across ledgers — bridging chains, orchestrating settlement, enforcing compliance — without weakening legal finality or operational accountability.</p>
<p>SWIFT, CLS, and the major CSDs understand this. Their strategies increasingly centre on being the connective tissue rather than the ledger of record.</p>`,
    },
    {
      kind: 'callout',
      heading: `The interoperability thesis`,
      data: {
        tone: 'strategy',
        body: `The winner may not be one blockchain. It may be the interoperability and control layer that lets regulated institutions move value across ledgers without weakening legal finality, compliance, liquidity control or operational accountability.`,
      },
    },
    {
      kind: 'matrix',
      heading: `What banks should do in 2026–2027`,
      data: {
        columns: ['Priority area', 'Recommended action', 'Why now'],
        items: [
          {
            id: 'intraday',
            label: 'Intraday liquidity',
            color: '#2563eb',
            values: [
              'Intraday liquidity',
              'Pilot deposit token or wCBDC-based intraday repo to reduce nostro buffers',
              'Trapped liquidity costs are rising as rates stay elevated; tokenised intraday settlement can free working capital',
            ],
          },
          {
            id: 'collateral',
            label: 'Collateral mobility',
            color: '#7c3aed',
            values: [
              'Collateral mobility',
              'Join a tokenised collateral network (e.g. HQLAx or Fnality-adjacent pilots)',
              'T+1 US settlement compressed collateral windows; real-time pledging is becoming a competitive necessity',
            ],
          },
          {
            id: 'crossborder',
            label: 'Cross-border treasury',
            color: '#059669',
            values: [
              'Cross-border treasury',
              'Evaluate stablecoin or multi-CBDC corridors for internal treasury flows in non-G7 corridors',
              'Correspondent banking costs and delays are driving corporate treasurers to seek alternatives',
            ],
          },
          {
            id: 'mmf',
            label: 'Tokenised MMFs',
            color: '#d97706',
            values: [
              'Tokenised MMFs',
              'Offer or integrate tokenised money market fund units as collateral or cash-equivalent instruments',
              'BlackRock BUIDL and Franklin Templeton have proven demand; clients expect yield-bearing digital cash',
            ],
          },
          {
            id: 'dvp',
            label: 'DvP settlement pilots',
            color: '#dc2626',
            values: [
              'DvP settlement pilots',
              'Participate in at least one atomic DvP pilot using tokenised cash and tokenised securities',
              'Regulators (MAS, BdF, SNB, BoE) are running supervised sandboxes — early participants shape the standards',
            ],
          },
        ],
      },
    },
    {
      kind: 'callout',
      heading: `Contrarian call`,
      data: {
        tone: 'warning',
        body: `Many digital asset strategies will fail because they start with the ledger instead of the settlement problem, the liability model, the control framework and the operating model. Technology selection is the least important decision. The hard questions are: who bears the credit risk, who controls the keys, who enforces finality, and who is accountable when something breaks.`,
      },
    },
    {
      kind: 'text',
      heading: `Where this analysis could be wrong`,
      body: `<p>Intellectual honesty requires flagging the assumptions that, if broken, would invalidate this view:</p>
<ul>
<li><strong>Stablecoin regulation could be more permissive than expected.</strong> If the US and EU create frameworks that give stablecoins near-deposit status, the deposit token advantage narrows sharply.</li>
<li><strong>A dominant L1 could emerge.</strong> If one chain achieves sufficient network effects in institutional finance — as SWIFT did in messaging — the interoperability thesis weakens.</li>
<li><strong>Retail CBDC could find a compelling use case I am not seeing.</strong> Programmable fiscal transfers, automated tax compliance, or platform-resistant digital identity could shift the calculus.</li>
<li><strong>Incumbents could move too slowly.</strong> If banks treat tokenisation as a five-year innovation programme rather than an operational priority, stablecoins and fintechs may capture institutional flows by default.</li>
<li><strong>Geopolitics could override economics.</strong> Sanctions tooling, dollar weaponisation concerns, and BRICS payment corridors could accelerate fragmentation in ways that make interoperability harder, not easier.</li>
</ul>`,
    },
    {
      kind: 'text',
      heading: `Where to go from here`,
      body: `<p>If any of the terms or concepts in this analysis are unfamiliar, the <strong>Glossary</strong> provides definitions for the key vocabulary of digital finance. For deeper dives into specific instruments, return to the relevant topics — each one is designed to stand alone while building toward the integrated view presented here.</p>`,
    },
    {
      kind: 'quiz',
      heading: `Reflection`,
      data: {
        questions: [
          {
            question: `According to this analysis, what is the most consequential question in digital finance?`,
            options: [
              'Which blockchain will win',
              'Whether the liability model for digital settlement money will be sovereign, commercial bank, or private issuer',
              'Whether retail CBDC will replace cash',
              'How fast cross-border payments can become',
            ],
            correctIndex: 1,
            explanation: `The central thesis is that the liability model — who bears the risk and who guarantees finality — matters more than the underlying technology or speed improvements.`,
          },
          {
            question: `Why does this analysis argue that deposit tokens and stablecoins will coexist rather than one replacing the other?`,
            options: [
              'They use incompatible technology',
              'Regulators will mandate both',
              'They serve different constituencies — closed institutional networks vs open-access global flows',
              'Deposit tokens are too expensive for retail use',
            ],
            correctIndex: 2,
            explanation: `Deposit tokens excel in regulated, institutional, closed-network settlement where balance sheet provenance matters. Stablecoins dominate where permissionless access, global reach, and 24/7 availability are the priority. The divide is structural.`,
          },
          {
            question: `What does the contrarian call warn against?`,
            options: [
              'Investing in blockchain technology',
              'Starting with ledger selection instead of the settlement problem, liability model, and control framework',
              'Using stablecoins for institutional settlement',
              'Ignoring retail CBDC pilots',
            ],
            correctIndex: 1,
            explanation: `The warning is that many strategies fail because they lead with technology choice rather than first solving the harder questions: credit risk, key control, legal finality, and operational accountability.`,
          },
        ],
      },
    },
  ],
};

export default content;
