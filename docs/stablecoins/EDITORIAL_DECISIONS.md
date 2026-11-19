# Stablecoins rebuild — editorial decisions

Status: working brief, 19 Nov 2026. Evidence: `research/R1–R5`. Mandate: `MANDATE.md`.

## Central thesis

A stablecoin moves a claim on an issuer across a ledger quickly. A payment is complete only when the receiver holds money they can use. Everything between those two points (funding, conversion, cash-out, reachability, screening, liquidity, reconciliation, failure recovery) decides whether a stablecoin route wins, loses or complements the alternatives.

The FSB's November 2026 progress report says the same thing in official language: "faster payment initiation alone is not sufficient" (PAY-21). The IMF's October 2026 study finds the blockchain leg is less than a quarter of the cost of a stablecoin "sandwich"; ramps and exchanges are the rest (PAY-03).

## Stance

- Independent of banks and of stablecoin advocates. Each route is shown at its strongest (`bestCase` in the model) before its weaknesses.
- Compare like with like: a strong payment firm with local payout, not an average branch wire, against a stablecoin route with licensed off-ramps, not a best-case marketing path.
- No pseudo-real prices. No published source prices a £1,000 UK-outbound payment (R3). The IMF study is USD 200; World Bank UK corridor data could not be retrieved. Prices in scenes are labelled illustrative and identical per leg type, so only structure differs.
- Status words are strict: announced, piloted, live, final rule, draft rule, proposal (style guide; R1).
- Vendor figures are labelled as vendor figures (Chainalysis, TRM, Artemis, issuers' own statements).

## Reader journeys

| Reader | Path | Must be able to do afterwards |
|---|---|---|
| Newcomer (5 minutes) | "In short" + chapters 1, 2 and 3 (Compare all) | Explain the peg, redemption, and why a fast token transfer can be an incomplete payment |
| Payments practitioner | Chapters 3–7 | Pick a route for a new scenario, name its prerequisites and failure points, and the controls it needs |
| Bank leader | Chapters 8–10 | Name the economically rational cases for a UK bank, the regulatory dependencies with dates, and the material risks |

## Chapter storyboard (Discover → Explore → Decide)

| # | Chapter | Job | Interaction | Banking lens |
|---|---|---|---|---|
| 1 | A claim, not a coin | Token = transferable claim on an issuer; reserves; mint/burn; par redemption vs market price; who may redeem under each regime; wallets; failure history; bank stablecoin vs deposit token | Peg scene: redemption open/closed, reserves trusted/doubted, eligible redeemer or not | Whose liability, who can redeem |
| 2 | Why they exist and who uses them | Trading collateral first; dollar access; B2B and cross-border flows; the volume trap | Scale bars: gross transfer volume vs genuine payments (flows only, dated, sourced) | Volume vs payments |
| 3 | Follow £1,000 | Four routes, one objective; message vs value vs ledger vs custody vs liquidity vs FX vs claim | Journey scene (flagship) | Finality, liquidity, who owes whom |
| 4 | Pick the payment model | Operating-model selector across bank rails, stablecoin routes and bank tokens | Routes scene | Reachability, prerequisites, controls |
| 5 | Liquidity doesn't go away | Prefunding, inventory, corridor imbalance, mint/redeem hours, market makers, netting, credit | Liquidity control room | Idle capital vs credit vs delay |
| 6 | Across chains | Same issuer on many chains vs different tokens; burn/mint vs bridges vs pools vs providers; finality; reconciliation | Cross-ledger failure lab | In-transit accounting, safe retry |
| 7 | Keeping crime out | Pre-execution, execution and post-transaction controls; unhosted/new/flagged wallets; issuer freezes are not a backstop | Controls journey | What the bank can and can't infer, must and may do |
| 8 | Who earns what | Reserve income and distribution: single issuer, revenue-sharing network, bank-issued stablecoin, tokenised deposit | Reserve-economics comparison | Who captures the economics |
| 9 | Dollar stablecoins outside the US | Benefits and costs by perspective; mechanism vs measured vs scenario; UK vs emerging markets | Economy lens (user / local bank / central bank / issuer) | Deposit funding, credit, monetary control |
| 10 | What a UK bank could do | Status of UK, US and EU rules with dates; roles; conditional options; the strongest case for and against | Status table and options | Regulation, risk appetite |
| 11 | Check yourself | Six new scenarios with explanations; sources and method | Scenario checks | All |

## Content ownership

- `stablecoins` (this topic) owns fundamentals, payment operating models, liquidity, cross-ledger, controls, macro and UK options.
- `stablecoin-market-structure` keeps the issuer-by-issuer comparison and detailed reserve economics. This topic gives the model-level comparison only and links there.
- Adjacent stale facts are fixed only where they contradict this topic: PYUSD issuer (Paxos), Open USD status, and the regulatory and market claims listed in R1 §4 and R3 §4 that a reader would meet in both places.

## Simulation evidence basis

| Scene | Sourced | Illustrative | Derived | Unknown |
|---|---|---|---|---|
| Journey | Route mechanics (Swift/gpi, Faster Payments, stablecoin mint/transfer) | Fee per leg, corridor presets | Value trace, cost, outcome | Real prices for £1,000 |
| Routes | Model descriptions | Fit rules (visible, arguable) | Ranking | Local legality per corridor |
| Liquidity | Mechanisms (prefunding, mint/redeem on banking hours, netting) | Amounts, spreads, opening hours | Payments paid, costs, idle money | Any provider's real balances |
| Cross-ledger | Protocol mechanics (burn/mint, lock/mint, pools) | 100k amount, pool sizes | Balances and books per state | Issuer handling of blocked mints |

## Decisions log

- 17 Nov: research split into five independent passes (R1–R5).
- 18 Nov: journey model gains route-level prerequisites so tokens never move on a route that a sender would not start.
- 18 Nov: liquidity netting settles the inbound leg in tokens (a test caught netting making outcomes worse).
- 19 Nov: Gate A red-team run on this brief before the chapter copy was written (`REDTEAM.md`). Verdict: the brief leaned sceptical and the flagship scene baked the thesis in. Adopted:
  - Thesis reframed: paid means the payee holds what it needs. A dollar-token objective was added to Follow £1,000, under which bank routes can't deliver and wallet-to-wallet completes on arrival.
  - A "banks have withdrawn" corridor condition that fails the bank routes, so failures cut both ways. A test asserts every route sometimes wins alone and sometimes fails.
  - Fee symmetry: the managed provider charges one customer-facing fee, like the payment firm (the off-ramp's payout cost sits inside it).
  - A break-even readout replaces any implied ranking; the compare view states it is unranked.
  - "Where stablecoins win and where they lose" and "the strongest case for and against" placed early (before the models), citing both IMF figures (2.18% average and about a third of corridors lost).
  - Selector: managed route can fit (banks withdrawn, or payer already holds stablecoins); new model for a payment firm settling its own treasury leg in tokens, as a complement.
  - Token-side risks (depeg, freeze, issuer concentration, weak redress) in chapter 1, the case against, and the controls chapter.
- 19 Nov: research corrected the brief. Open USD went live 30 Sep 2026 (not 12 Nov, which only an unverified site claims), issued by Bridge; supply is $286.4bn, not $320bn+. Adjacent topics corrected where they contradicted this one (see `SOURCES.md`).
- 19 Nov: the existing `scale` block was not reused for volumes because it draws square-root bar widths, which would shrink the gross-versus-payments gap by about ten times. A linear `volume` scene was added instead.
