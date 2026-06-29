import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'settlement',
  number: '13',
  title: 'Settlement & infrastructure',
  summary: 'Wholesale settlement, DvP, atomic settlement.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: "The payments topic listed finality as one of the five friction points in today’s payment rails. The blockchain topic flagged that many blockchains have probabilistic, not instant, finality. This topic is where those two threads meet — in the genuinely hard problem of settling a trade’s two legs (the asset, and the cash paying for it) at the same instant.",
    },
    {
      kind: 'text',
      heading: 'T+1 and why it matters',
      body: "In May 2024, US equities moved from T+2 to T+1 settlement — the biggest settlement acceleration in decades. This matters for three reasons. First, it cuts counterparty exposure by roughly half: the window during which one side could default shrank from two business days to one. Second, it frees up billions in margin requirements, because the collateral that brokers and clearing members must post against unsettled trades drops in proportion to settlement duration. Third, it compresses the window for FX settlement — non-US investors buying American stocks now have less time to convert their home currency to dollars before settlement, which has created real operational strain for Asian and European market participants. But T+1 is still not instant. Crypto settles in minutes, and the gap between T+1 and T+0 (real-time gross settlement) is exactly where tokenized securities and atomic settlement fit. The question is not whether settlement will continue to accelerate, but whether the next step is T+0 on existing rails or a move to an entirely different ledger-based architecture.",
    },
    {
      kind: 'text',
      heading: 'CLS and FX settlement',
      body: "CLS (Continuous Linked Settlement) was created in 2002 specifically to solve Herstatt risk in foreign exchange. CLS settles over $6 trillion in FX transactions daily by netting obligations across 18 currencies and settling both legs simultaneously through central bank accounts. It is the largest settlement system in the world by value. The mechanism is payment-versus-payment (PvP): both currency legs of an FX trade are settled together or not at all, eliminating the timing gap that destroyed Bankhaus Herstatt in 1974. CLS demonstrates that the \"both legs at once\" principle works at enormous scale — but it took a dedicated institution, decades of central bank cooperation, and buy-in from over 70 settlement members to build. That history matters: the atomic settlement idea at the heart of blockchain-based DvP is not new. What is new is the claim that a shared ledger can deliver the same guarantee without a purpose-built institution in the middle.",
    },
    {
      kind: 'flow',
      heading: 'Today: two legs, two systems',
      data: {
        viewBox: '0 0 320 150',
        boxes: [
          { id: 'sec', x: 10, y: 50, w: 130, h: 50, caption: 'SECURITY LEG', value: 'Settles on its registrar/ledger', valueColor: '#7AA7D9' },
          { id: 'cash', x: 180, y: 50, w: 130, h: 50, caption: 'CASH LEG', value: 'Settles via bank rails', valueColor: '#E8A33D' },
        ],
        paths: [],
        caption: "These two legs settle on separate systems, often at different times. If one side delivers and the other fails before it settles, the first party is exposed — this timing gap is called \"Herstatt risk,\" named after a 1974 bank failure that left a counterparty holding a delivered-but-unpaid-for position.",
      },
    },
    {
      kind: 'text',
      heading: 'Netting vs gross settlement',
      body: "Gross settlement (RTGS) settles each transaction individually in real time. It is the safest approach — once a payment is processed, it is final and irrevocable — but it is also capital-intensive, because you need full liquidity for every single payment at the moment it is made. Netting takes the opposite approach: it aggregates many transactions between participants and settles only the net difference. If Bank A owes Bank B $100M and Bank B owes Bank A $80M, netting settles a single $20M transfer instead of two gross payments. This is far more capital-efficient but introduces delay and counterparty risk during the netting window — until final settlement, every participant is exposed to every other participant defaulting. Most wholesale systems use a hybrid: netting during the day, with final gross settlement at end-of-day or at specific cutoff times. Fedwire in the US is pure RTGS; the CHIPS system nets throughout the day and settles gross at close. Crypto generally settles gross — every transaction is individually final on-chain — which is one reason DeFi is so capital-hungry: there is no netting layer to reduce the liquidity each participant must hold.",
    },
    {
      kind: 'flow',
      heading: 'The fix: atomic settlement',
      data: {
        viewBox: '0 0 320 150',
        boxes: [
          { id: 'sec2', x: 10, y: 10, w: 130, h: 44, caption: 'SECURITY', value: 'Token' },
          { id: 'cash2', x: 180, y: 10, w: 130, h: 44, caption: 'CASH', value: 'Token', valueColor: '#E8A33D' },
          { id: 'atomic', x: 95, y: 95, w: 130, h: 44, caption: 'SINGLE TRANSACTION', value: 'Both or neither', valueColor: '#5FB3A3' },
        ],
        paths: [
          { d: 'M65,54 L65,117 L150,117', animated: true, dotColor: '#7AA7D9' },
          { d: 'M255,54 L255,117 L215,117', animated: true, dotColor: '#E8A33D' },
        ],
        caption: "Delivery-versus-payment (DvP) on a single shared ledger makes both legs part of one atomic transaction — if either leg would fail, the whole transaction reverts. Neither party is ever exposed to \"I paid but didn’t receive.\"",
      },
    },
    {
      kind: 'text',
      heading: 'Why this is still mostly unsolved at scale',
      body: "Atomic settlement requires both legs to live on the same ledger — but today, tokenized securities and the cash paying for them usually sit on different systems, which is exactly the tokenized-deposit-vs-stablecoin-vs-wholesale-CBDC argument from the money and CBDC topics. Whichever asset becomes the standard \"cash leg\" for institutional settlement determines who actually solves this problem first. The RLN and Project Agorá (the global initiatives topic) are direct attempts at exactly this — building the shared-ledger cash leg that tokenized securities settlement needs.",
    },
    {
      kind: 'text',
      heading: 'Central counterparties and why DeFi does not have them',
      body: "In traditional markets, a central counterparty (CCP) like LCH or CME Clearing stands between buyer and seller, guaranteeing the trade even if one side defaults. The CCP becomes the buyer to every seller and the seller to every buyer, concentrating and managing counterparty risk through margin requirements, default funds, and a \"waterfall\" of loss absorption layers: first the defaulter’s margin, then the defaulter’s contribution to the guarantee fund, then the CCP’s own capital, then non-defaulting members’ guarantee fund contributions. This structure has made CCPs systemically important — they are now explicitly designated as such by regulators in most jurisdictions. DeFi has no CCPs. Instead, it uses overcollateralization (borrowers post 150% or more of the loan value as collateral) and automatic liquidation as substitutes: if collateral value falls below a threshold, smart contracts liquidate the position without waiting for a human decision. The tradeoff is stark. DeFi avoids CCP concentration risk — there is no single institution whose failure would cascade across the system — but requires much more capital locked up at all times and can cascade in a different way during sharp price drops. The March 2020 \"Black Thursday\" liquidation spiral on MakerDAO demonstrated this: as ETH crashed, liquidation auctions failed because network congestion prevented bidders from participating, and some vaults were liquidated for zero DAI. The system survived, but the failure mode was different from, not better than, what a CCP would have experienced.\n\nSettlement requires knowing who you're dealing with. The next topic covers the identity and compliance layer that sits underneath every regulated transaction in digital finance.",
    },
    {
      kind: 'case',
      heading: 'End-to-end: buying a tokenized bond with a stablecoin',
      data: {
        title: 'What actually happens in a tokenized DvP trade',
        dateRange: 'Hypothetical based on current infrastructure (2026)',
        whatHappened: "A fund manager wants to buy $10M of BlackRock’s BUIDL tokenized Treasury fund using USDC. Step 1: The fund is onboarded and KYC’d with both the BUIDL issuer (Securitize) and a USDC on-ramp. Step 2: $10M USDC is minted or acquired. Step 3: On Ethereum, a smart contract executes the swap — $10M USDC transfers to the BUIDL contract, and BUIDL tokens transfer to the fund’s wallet, atomically. Step 4: The fund now holds a tokenized position that accrues Treasury yield and can be redeemed or transferred 24/7. Total time from initiation to settlement: minutes, not the T+1 or T+2 of traditional bond settlement.",
        whyItMatters: "This is the atomic DvP promise in practice — both legs on the same ledger (Ethereum), settled in one transaction, with no clearinghouse, no DTCC, and no Herstatt risk. The catch: both the security and the cash must be tokenized and on the same chain. The moment either leg lives on a different system, you are back to the two-leg problem this topic started with.",
        source: 'Based on BlackRock BUIDL / Securitize operational model',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          {
            question: 'Why did the US move to T+1 settlement for equities in May 2024?',
            options: [
              'To allow high-frequency traders to execute more transactions per day',
              'To reduce counterparty exposure by roughly half and free up billions in margin requirements, though it also compressed the FX settlement window for non-US investors',
              'To comply with European MiFID II regulations requiring same-day settlement',
              'To eliminate the need for central counterparties in equity markets',
            ],
            correctIndex: 1,
            explanation: 'T+1 cuts counterparty exposure roughly in half and frees up margin capital, but it also compresses the time non-US investors have to convert currency before settlement.',
          },
          {
            question: 'What is the key difference between netting and gross settlement?',
            options: [
              'Netting is used only for crypto while gross settlement is used only for fiat',
              'Gross settlement processes each transaction individually in real time (safe but capital-intensive), while netting aggregates transactions and settles only the net difference (capital-efficient but introduces delay and counterparty risk)',
              'Netting is faster because it uses blockchain technology',
              'Gross settlement requires a central counterparty while netting does not',
            ],
            correctIndex: 1,
            explanation: 'Gross settlement (RTGS) is safe but requires full liquidity for each payment. Netting is capital-efficient but introduces counterparty risk during the netting window.',
          },
          {
            question: 'Why does DeFi not use central counterparties (CCPs)?',
            options: [
              'CCPs are illegal in decentralized systems under current regulations',
              'DeFi protocols are too small to justify a CCP',
              'DeFi substitutes overcollateralization and automatic liquidation for CCP guarantees, avoiding CCP concentration risk but requiring much more capital and risking liquidation cascades during sharp price drops',
              'Smart contracts cannot perform the mathematical calculations required by CCPs',
            ],
            correctIndex: 2,
            explanation: 'DeFi uses overcollateralization and automatic liquidation instead of CCPs, trading CCP concentration risk for higher capital requirements and cascade risk during market drops, as seen in MakerDAO Black Thursday.',
          },
        ],
      },
    },
  ],
};

export default content;
