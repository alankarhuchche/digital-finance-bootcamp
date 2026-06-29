# Digital Finance Reference — Product Scope v2

## Problem statement

There is no shortage of content about DLT and digital assets. The BIS publishes comprehensive research. The Atlantic Council tracks every CBDC. Chainalysis maps the crypto ecosystem. Vendor whitepapers explain their own platforms. What none of them offer is the **payments practitioner's perspective** — someone who understands how CHAPS actually settles, why interchange exists, what a nostro account costs to maintain, AND how DLT-based alternatives compare against that operational reality.

This reference bridges that gap. It is written from inside the banking system, by someone who works in both digital assets and payments technology. It combines the technical depth a practitioner needs with the strategic framing an executive needs to make decisions.

**Why an interactive web app, not a whitepaper:** The visualizations (flow diagrams, comparison cards, the world map, market sizing charts) communicate relationships that text alone can't. The Gemini chat lets people explore at their own pace. The structured navigation means a reader can start from "what happens when I tap my card" and build up, or jump directly to "should we build a deposit token." A PDF can't do that.

Unlike the Atlantic Council's tracker (data only, no analysis), Chainalysis' reports (crypto-native perspective, not banking), or vendor documentation (one platform, not the landscape), this reference covers the full spectrum from legacy payment rails through to DLT alternatives, with honest assessments of what actually works.

## What this product is

A **Digital Finance Reference** — a single-author, opinionated, interactive guide to digital finance in payments. Not a course. Not a wiki. An authored reference with a point of view, built by someone who works in this space.

## Who it serves

| Audience | What they need | How they use it |
|----------|---------------|-----------------|
| **Payments professionals / bank technologists** | Operational depth, end-to-end flows, honest "does this actually work" assessments | Day-to-day reference, evaluating projects, understanding new instruments |
| **Executives / decision-makers** | Decision frameworks, "so what" summaries, market sizing, strategic recommendations | Board prep, strategy meetings, investment cases, vendor evaluation |

**LinkedIn and conference audiences** are distribution channels, not separate audiences. Shareable content is extracted from the reference (charts, key insights, specific claims), not written separately for social media.

**New team members** are served by the narrative order — start at topic 1 and read forward. No separate onboarding content needed.

## Secondary uses

- Internal pitch material — point risk/compliance/board to specific topics instead of building decks from scratch
- Interview / hiring portfolio piece — evidence of deep domain expertise
- Conference / speaking material — visualizations are presentation-ready, extractable as images
- Onboarding for new hires joining digital assets or payments teams

## Content freshness model

Point-in-time snapshot (mid-2026), with clear "as of" dates on all market data, regulatory status, and project milestones. Periodic refresh (quarterly). Evergreen concepts (how DvP works, what interchange is) don't need dates.

## Attribution

Subtle: "About" page with brief professional background, LinkedIn link, "why I built this," data sources, and the snapshot date. No personal branding on every page.

---

# Content Architecture

Four layers, not seven. Each layer builds on the previous. Topics within a layer are ordered as a narrative — the last paragraph of each topic sets up why the next one matters.

## Layer 1: How payments work today (4 topics)

The baseline. A reader finishing this layer understands the full plumbing of modern payments — domestic and cross-border — well enough to evaluate any proposed alternative.

### 1. Payments fundamentals [EXISTS — needs enrichment]

What happens when you tap your card, who gets paid, and how.

| Has | Needs |
|-----|-------|
| Four-party card model ✓ | Open banking / PSD2 / account-to-account payments |
| Interchange economics ✓ | Payment orchestration (how Stripe/Adyen actually work) |
| Payment methods compared ✓ | Three-party model (Amex) vs four-party for completeness |
| Real-time payments (FPS, UPI, Pix) ✓ | |
| Faster Payments case study ✓ | |

### 2. The existing rails [EXISTS — needs enrichment]

Cross-border payments: SWIFT, correspondent banking, and why moving money between countries still takes 3 days and costs 6%.

| Has | Needs |
|-----|-------|
| SWIFT messaging vs money movement ✓ | Specific cost breakdown of a real cross-border payment (fee stack: $25-50 in fees on a $1,000 remittance, showing where each dollar goes) |
| Nostro/vostro mechanics ✓ | SWIFT's own DLT experiments (SWIFT Connector, linking to blockchain networks) |
| RTGS systems ✓ | |
| ISO 20022 migration ✓ | ISO 20022 as the interoperability bridge between legacy and DLT (cross-cutting theme, not just "rails are upgrading") |
| CLS for FX ✓ | |
| SWIFT gpi case study ✓ | |

### 3. Forms of money [EXISTS — needs enrichment]

Six forms of money on one map. The foundation for everything that follows.

| Has | Needs |
|-----|-------|
| Cash, deposits, e-money, CBDC, tokenized deposits, stablecoins ✓ | Commercial bank money vs central bank money distinction (the fundamental framework the BIS uses) |
| Singleness of money ✓ | Money hierarchy / money flower (BIS visual framework) |
| Practical spending comparison ✓ | Deposit tokens as a distinct 7th form (brief — the deep-dive is its own topic) |

### 4. Who carries the risk [EXISTS — good as-is]

Same instrument, different stakeholder, different risk profile.

| Has | Needs |
|-----|-------|
| Four-stakeholder analysis ✓ | No major gaps |
| Disintermediation quantification ✓ | |
| Narrow banking concern ✓ | |

## Layer 2: What's being built to change it (7 topics)

The instruments, technology, and platforms. A reader finishing this layer understands every major instrument in digital finance and how the underlying technology works — not as abstract concepts, but as things they can evaluate.

### 5. DLT & blockchain basics [EXISTS — needs restructuring]

The technology underneath. Explain consensus, finality, and smart contracts through the lens of "why this matters for payments," not as a computer science lesson.

| Has | Needs |
|-----|-------|
| Consensus mechanisms ✓ | Platform comparison matrix: Corda vs Canton vs Hyperledger Besu vs Ethereum vs Solana — which is used for what and why |
| Finality (with specific times) ✓ | Interoperability as infrastructure concept — cross-chain bridges, SWIFT Connector, Chainlink CCIP |
| Smart contracts ✓ | Oracles — how on-chain systems get off-chain data (price feeds, FX rates, interest rates) |
| Layer 2 / rollups ✓ | |
| Permissioned vs public ✓ | |
| Ethereum Merge case study ✓ | |

### 6. Stablecoins [EXISTS — needs enrichment]

Four mechanisms, the business model, and the real-world products a payments professional will encounter.

| Has | Needs |
|-----|-------|
| Fiat-backed, crypto-collateral, algorithmic, fractional ✓ | PayPal PYUSD — a payment company issuing its own stablecoin (what it means for the payments industry) |
| Revenue model ✓ | Euro stablecoins: EURC (Circle), EUR CoinVertible (SocGen FORGE) — MiCA-compliant examples |
| USDT vs USDC audit differences ✓ | Stablecoin payment flow — end-to-end: what happens when a merchant accepts USDC (acquirer integration, settlement, fiat off-ramp) |
| Terra/UST case study ✓ | Programmable payments on stablecoins — conditional transfers, streaming payments |
| USDC/SVB depeg case study ✓ | |

### 7. Deposit tokens [NEW — critical gap]

What banks are actually building. This is the single biggest content gap in the current product.

Structure: Start with the Kinexys end-to-end walkthrough, then zoom out to explain the concept.

| Content | Detail |
|---------|--------|
| What a deposit token is | A commercial bank's own liability (a deposit), tokenized on a blockchain. The key distinction: it stays on the bank's balance sheet. |
| How it differs from a stablecoin | Deposit-insured, regulated as a deposit, doesn't leave the banking system. Table: deposit token vs stablecoin vs CBDC — side by side. |
| Deposit token vs tokenized deposit | Industry uses these interchangeably but some draw a distinction. Clarify without getting lost in semantics. |
| Real products | JPMorgan Kinexys ($1.5B+/day), Fnality USC (backed by central bank reserves at BoE/Fed), Partior (cross-border: JPM + DBS + Temasek), Citi Token Services, HSBC Orion, SocGen FORGE |
| Why banks prefer them | Balance sheet preservation, regulatory clarity (it's a deposit, existing rules apply), keeps the customer relationship |
| The walled garden problem | Each bank's token only works on its own ledger. Interoperability (Partior, RLN, Canton Network) is the unsolved piece. |
| Programmable payments vs programmable money | User-defined conditions (programmable payments) are accepted. Issuer-defined conditions (programmable money — e.g., expiring stimulus) are controversial. This distinction, drawn explicitly by the BIS and ECB, cuts across deposit tokens, CBDCs, and stablecoins. |
| Case study | Kinexys: how an intraday repo settlement actually works, step by step — the parties, the smart contract, the settlement, the reconciliation (or lack thereof). |

### 8. CBDCs [EXISTS — needs enrichment]

The sovereign digital alternative — retail for consumers, wholesale for institutions.

| Has | Needs |
|-----|-------|
| Retail vs wholesale ✓ | Wholesale CBDC mechanics — how an mBridge or Agorá transaction actually settles (step-by-step flow diagram) |
| Privacy debate ✓ | The "platform model" architecture — central bank provides the core, banks build the apps. Diagram. |
| Offline capability ✓ | CBDC vs deposit token comparison — when does a central bank need to issue its own token vs when can deposit tokens suffice? Decision framework. |
| Programmable money ✓ | |
| e-CNY reclassification ✓ | |
| Sand Dollar + eNaira case studies ✓ | |

### 9. Tokenization [EXISTS — needs enrichment]

Moving ownership records from private databases to shared ledgers. The "change of address" framing is good — the content needs more real-world depth.

| Has | Needs |
|-----|-------|
| Tokenized deposits vs RWAs ✓ | Collateral mobility — the "killer app" for institutional tokenization (why a pension fund should care) |
| BUIDL case study ✓ | Tokenized trade finance — letters of credit on-chain (HSBC, Contour) |
| EIB digital bond case study ✓ | Tokenized money market funds beyond BUIDL (Franklin Templeton, WisdomTree) |
| End-to-end bond issuance ✓ | Why real estate tokenization hasn't scaled (regulatory fragmentation, liquidity problem) |
| Infrastructure layer ✓ | |

### 10. DeFi [EXISTS — good, minor additions]

Finance rebuilt as code. The content is strong — needs two additions.

| Has | Needs |
|-----|-------|
| AMMs, lending, derivatives, staking ✓ | DeFi on permissioned chains — how institutional DeFi (Aave Arc, Compound Treasury) differs from public DeFi |
| Revenue sources, real yield, MEV ✓ | Restaking (EigenLayer) — brief, as the newest primitive |
| Institutional DeFi ✓ | |
| Euler case study ✓ | |

### 11. Crypto assets [EXISTS — consider merging]

[Guessing] This topic may be better absorbed into other topics rather than standing alone. The useful parts:
- Token taxonomy (native, utility, governance, security) → stays as a brief reference, or merges into DLT basics
- Howey test / SEC classification → moves to Regulation
- Token standards (ERC-20, etc.) → moves to DLT basics
- SEC v Ripple case study → moves to Regulation

If kept standalone, it needs:
- Wrapped tokens (WBTC) — critical for DeFi
- Token standards (ERC-20, ERC-721) — what they mean practically
- Real token economics (ETH burn, BTC halving)

**Decision needed: keep as standalone topic or distribute content into stronger topics.**

## Layer 3: The landscape (5 topics)

How big is this, where is it happening, and what are the rules.

### 12. Market sizing [EXISTS — needs enrichment]

| Has | Needs |
|-----|-------|
| M2 vs stablecoins vs DeFi vs RWAs ✓ | Revenue pools — where money is actually being made (Tether's $6.2B, exchange fees, DeFi protocol revenue) |
| USDT daily volume vs Visa ✓ | Venture funding trends — capital flowing into the space, by category |
| TVL limitations ✓ | Deposit token settlement volumes (Kinexys $1.5B/day, growing) as a new bar on the scale chart |

### 13. Global initiatives [EXISTS — good, minor addition]

| Has | Needs |
|-----|-------|
| Country-by-country CBDC map ✓ | Private sector initiatives (Canton Network, Partior, RLN, Fnality) mapped alongside public ones — currently the map only shows CBDC projects |
| Cross-border projects ✓ | |
| India UPI context ✓ | |
| BIS Innovation Hub ✓ | |

### 14. Market structure [EXISTS — good as-is]

CEX vs DEX, custody, prime brokerage, OTC, liquidity fragmentation, FTX case study. No major gaps.

### 15. Settlement & infrastructure [EXISTS — needs enrichment]

| Has | Needs |
|-----|-------|
| Herstatt risk, DvP, atomic settlement ✓ | The "cash leg" problem — which token (wCBDC, deposit token, stablecoin) becomes the standard for institutional settlement? This is THE strategic question for wholesale DLT. |
| T+1 context, CLS, netting, CCPs ✓ | FMI regulation — how settlement systems (CSDs, CCPs) are regulated differently from payments, and what that means for tokenized settlement platforms |

### 16. Regulation [EXISTS — needs enrichment]

| Has | Needs |
|-----|-------|
| MiCA, GENIUS Act, FATF, Basel III ✓ | SEC vs CFTC jurisdiction — who regulates what in the US (move Howey test / Ripple content here if crypto assets topic is dissolved) |
| UK FCA, Hong Kong, Singapore ✓ | UK PSR stance on digital payments |
| Binance case study ✓ | |
| DeFi regulatory gap ✓ | |

### 17. Digital identity & KYC [EXISTS — good as-is]

No major gaps. Strong content on costs, Travel Rule, VCs, Aadhaar.

### 18. Privacy & data [EXISTS — good as-is]

No major gaps. Strong content on CBDC trilemma, analytics, GDPR, Tornado Cash.

## Layer 4: What to do about it (3 topics)

The "so what" layer. This is where the author's perspective matters most.

### 19. Bank strategy [EXISTS — needs enrichment]

| Has | Needs |
|-----|-------|
| Four strategic options ✓ | Build vs buy vs partner — structured decision framework (decision tree, not just a matrix) with real cost estimates |
| Real bank examples ✓ | The talent problem — where do you find people who understand both payments and DLT? How are banks structuring teams? |
| BaaS model ✓ | Cost-benefit analysis — what does a deposit token pilot actually cost? ($2-5M for a POC, $10-20M+ for production — rough ranges with breakdown) |
| Kinexys case study ✓ | |

### 20. Failure modes [EXISTS — good as-is]

Six categories, TradFi analogues, industry response, Mango + Ronin case studies. Strong.

### 21. What's next — original analysis [NEW — critical for thought leadership]

YOUR perspective. Not a summary of what others think — your own claims, supported by evidence, with enough intellectual honesty to say where you're uncertain.

| Section | Content |
|---------|---------|
| The deposit token thesis | "Deposit tokens will absorb the institutional stablecoin use case within 3 years because banks won't tolerate balance sheet leakage once they have a working alternative." Argue it. |
| The convergence question | Will deposit tokens, stablecoins, and wCBDC converge into one thing, or coexist? Make a specific call. |
| The interoperability bet | Will interoperability come from standardisation (ISO 20022 + standard token formats), from bridges (SWIFT Connector, Chainlink CCIP), or from network effects (one platform wins)? |
| Retail CBDC — the honest assessment | "Retail CBDC is a solution to a problem that real-time payment systems already solved in most advanced economies." Argue it. |
| What banks should do in 2026-2027 | Practical, specific recommendations. Not "explore DLT" — more like "run a deposit token pilot for intraday repo settlement on Canton, because..." |
| What will look obvious in hindsight | One contrarian call. What does the industry currently believe that you think is wrong? |

Frame these as: "Here's what I believe as of June 2026, here's my evidence, and here's where I could be wrong." That framing is more impressive than false certainty.

## Reference

### 22. Glossary [EXISTS — needs update for new terms]

Add: deposit token, programmable payments vs programmable money, wrapped token, oracle, interoperability, FMI, CSD, collateral mobility, payment orchestration, open banking, PSD2.

### About page [NEW]

- Brief professional background (2-3 sentences)
- LinkedIn link
- "Why I built this" (2-3 sentences — the problem statement, personal)
- Data sources and methodology
- "Content accurate as of June 2026. Refreshed quarterly."
- Contact (existing form or direct email)

---

# Feature priorities

**Only 3 features matter right now:**

| Priority | Feature | Why |
|----------|---------|-----|
| **Now** | Fix visit counter (-1 bug) | Broken, visible to every visitor |
| **Now** | About page | Attribution, credibility |
| **After content is done** | Share / export (copy link, download chart as PNG, copy topic summary) | This is how the product gets distribution — execs and LinkedIn audiences don't visit websites, they receive artefacts |

Everything else (comparison tool, print CSS, analytics, reading time, key insight callouts, full-text search) is premature optimisation. Ship the content. Add features when you know what people actually use.

---

# Implementation order

1. Fix visit counter bug
2. Write "Deposit tokens" topic
3. Write "What's next — original analysis" topic
4. Create About page
5. Enrich existing topics (stablecoins, CBDC, tokenization, settlement, DLT basics, forms-of-money, bank strategy, market sizing, regulation, global initiatives)
6. Decide: keep crypto assets standalone or dissolve into other topics
7. Update glossary with all new terms
8. Add share/export feature
9. Final review pass for narrative coherence

---

# Decisions (resolved)

1. **Crypto assets topic**: Keep standalone. Add wrapped tokens, token standards, real token economics.
2. **Programmable payments vs programmable money**: Cross-cutting theme. Mention in deposit tokens, CBDC, and stablecoins topics — not a dedicated section in any single one.
3. **"What's next" topic**: Yes — framed as informed views grounded in what's currently happening, not speculative predictions. "Here's what I see happening based on the trajectory of X, Y, Z" rather than "I predict X will happen by 2028."
