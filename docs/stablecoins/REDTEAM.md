# Stablecoins storyline red-team (Gate A)

Date: 19 Nov 2026. Scope: `EDITORIAL_DECISIONS.md` (ED), R3 s1 and s3, R2 s1, `journey.ts`, `routes.ts`.
Confidence tags: [Certain] read in the files; [Likely] strong inference; [Guessing] my judgement.
## Verdict
The brief is sceptical-leaning, not neutral. The research is honest and well sourced. The bias comes from
one framing choice, and the models then inherit it. [Likely] If the chapter copy is written as the
storyboard stands, an advocate reader will say the site defined the contest so stablecoins lose, and a
bank reader will find nothing to dislike. That is the wrong test. Some issues also lean pro-stablecoin;
they are in section 2.
Core issue: the thesis defines a finished payment as "the receiver holds money they can use" (ED:7), and the
flagship scene hard-codes that as local currency in a local bank account (`journey.ts` SCENARIO.objective and
`.invoice`). The thesis is then "demonstrated" by a scene built on it. [Certain]

## 1. Where the deck is stacked against stablecoins

1. **Objective rigs the FX count.** SCENARIO fixes a local-currency invoice and a supplier with a bank
   account (`journey.ts` SCENARIO). B2B invoices are often in USD. With a USD invoice the sandwich has one
   conversion, the correspondent route has one, and the wallet route needs none for a payee who holds dollars.
   Two conversions is a product of the chosen scenario, not of stablecoins. [Certain]
2. **Two routes cannot fail on corridor conditions.** `correspondent` and `psp` have no `needs`, so the
   `bank-only` preset leaves both succeeding while both token routes fail. There is no preset or condition for
   "correspondent withdrew", "this firm does not serve the corridor" or "no instant rail". Only stablecoin
   reachability can fail (`journey.ts` CORRIDOR_PRESETS, `needs`). `routes.ts` has the same shape: when
   `corridor === 'thin'`, `managed` is `poor`, `psp` is `conditional`, and `correspondent` is unaffected
   (`routes.ts` 58-80, 103-110). [Certain]
3. **Correspondent de-risking is absent.** Reach where correspondent banking has withdrawn is the advocates'
   best structural argument. It appears in `managed.goodFor` only ("where correspondent links are thin"),
   and nothing in the storyboard (ch.3-4) lets the reader switch it on. [Certain]
4. **`payerHolds: 'stablecoin'` does nothing** except for `cross-chain` (`routes.ts` 185). A payer already
   holding tokens (a crypto-native firm, a treasury) should favour `managed` and `wallet-custodial` and
   penalise bank routes, which would need an off-ramp first. [Certain]
5. **`managed` can never be `fits`.** The best it returns is `conditional`, with a hard-coded "compare the
   all-in quote with a payment firm's" (`routes.ts` 108). `psp` can be `fits` on fewer prerequisites. The
   asymmetry is deliberate but invisible to the reader. [Certain]
6. **Missing advantages.** Search the storyboard for these; none is a named beat:
   - programmability and atomic delivery-versus-payment, escrow, conditional release (absent from ch.1-11)
   - 24/7 provider-to-provider settlement as a benefit (shown mechanically in step windows, never claimed)
   - treasury movement between a firm's own entities (a single clause in `wallet-custodial.goodFor`)
   - public-ledger traceability as a compliance advantage over opaque correspondent chains (ch.7 is all
     controls and limits)
   - dollar access for people in unstable currencies exists in ch.9, but as one of four lenses, late.
7. **Cost accounting is asymmetric.**
   - The sandwich has two fixed legs (`Provider fee`, `Payout fee`, s2 and s5). The PSP has one (`Firm fee`),
     and its local payout (p3) and the correspondent's settlement (c3) carry no charge.
   - A customer sees one price from a provider; the partner payout fee is the provider's wholesale cost.
   - The PSP's cost of moving local currency into place in bulk is not priced at all.
   - At the default 0.5% / £2 / £0.20: PSP about £7.0 (0.70%), correspondent about £11.0 (1.10%), sandwich and
     wallet about £14.2 (1.42%). About £2 of the 7.2 gap between the PSP and the stablecoin routes is the
     extra fixed leg. [Certain, my arithmetic]
8. **Headline omission in R3.** About one third of comparable IMF corridors had a cheaper traditional route,
   and the cheapest stablecoin route averaged 2.18% against RPW 6.2% (PAY-01, PAY-05, PAY-14). The brief
   carries the one-third and the 6.2% separately. A reader will do the arithmetic. State both, with the
   caveats (USD 200, cheapest ramps, premium corridors, mixed baselines). [Likely]

## 2. Where the deck is stacked in favour of stablecoins (or leaves holes)

1. **No failure of the token itself in the flagship scene.** The journey models wallet, off-ramp, window and
   screening failures. It has no depeg, redemption suspension, issuer freeze on the payer's or payee's
   address, or issuer concentration (USDT 61.2%, USDC 24.2% of USD-pegged supply, R2 s1). Ch.7 says freezes are not
   a backstop; they are also a stranded-funds risk for the payment. [Certain]
2. **Price risk in transit is zero.** Both token routes hold a dollar claim for seconds to hours, then sell.
   The cost trace is static: `thin` and `weekend` change status and not price, though the copy says "usually
   costs more" (`journey.ts` NEED_REASON 'thin'). [Certain]
3. **Flat 0.5% on both conversions is generous to token routes** if the off-ramp is not deep. R3 s1 says few
   stablecoin-to-local pairs have depth (PAY-10). One equal spread across a liquid and a thin pair hides
   the very thing ch.5 is about. [Likely]
4. **Consumer protection is a footnote.** Claim lines mention "not a protected bank deposit", but R3 s3.1 says
   UK APP reimbursement applies to Faster Payments and not on-chain [Likely; check PSR scope]. For a £1,000
   business payment this is a material difference, and it is not a cost line or a scene condition. [Certain]
5. **Legal status is assumed away rather than shown.** Local legality is "not assumed" (good), but the UK
   status of the provider and the sterling coin gap (FCA regime from 25 Oct 2027; no authorised sterling issuer,
   R2 s1 pt 14) should sit beside the route, not only in ch.10. [Certain]
6. **Wholesale bank alternatives are shown fairly but vaguely.** Tokenised deposits are `fits` with a single
   condition (`routes.ts` 159). Their weakness is fragmentation across networks (a payee at another bank is
   unreachable) and limited live volume; say so with the same strictness. [Likely]
7. **The `psp` route is counted as "bank rails"** (`family: 'bank-rails'`). It flatters the incumbent column.
   A PSP's prefunded local accounts are the structure the sandwich copies. The honest finding is that a
   stablecoin route is often a PSP that settles its treasury leg in tokens. That makes them complements, and
   neither scene shows it. [Likely]

## 3. Is the four-route comparison fair?
Mostly honest, not neutral. [Likely] What is fair: `bestCase` is a real best case for each route, the fee
inputs are labelled illustrative, and costs are not asserted as findings.

What is structurally rigged by "same price per leg":
- **Leg counting is the result.** Equal prices per leg make cost a pure function of leg counts. The output
  restates the topology and presents it as a finding. The sandwich is guaranteed to look dearer than the PSP.
- **One price per conversion is false in both directions.** A bank's "one conversion" often triangulates
  through USD internally, so the display of one leg hides two. Conversely, USD pairs are the deepest, so each
  sandwich leg may be much cheaper than a direct pair. At the defaults, the sandwich only ties the PSP if each
  leg is under about 0.14% (my arithmetic). Readers cannot test that because the sliders are global.
- **Amount fixed at £1,000.** R3 s3.1 shows costs are non-linear (IMF 4.12% at USD 50, 1.54% at USD 5,000).
  Fixed fees dominate at £1,000, where per-leg fixed cost penalises routes with more parties.
- **Ranking can be misread as a verdict.** `summariseRoute` returns `fxConversions`, `costPct`, `feeHandOffs`.
  If the UI sorts by `costPct`, the page implies a winner.

How the page should frame it, in this order:
1. Say it before the numbers: "Prices here are placeholders and equal per leg. What differs is how many legs
   each route has and what has to be true for it to start. Real prices differ by corridor and provider."
2. Let the reader change spread per leg type and per route (or at least FX spread for the dollar legs), and show
   a break-even line ("sandwich ties PSP when each leg is under X%") instead of a single ranking.
3. Add an amount control, and show the fixed-fee versus percentage split.
4. Offer a USD-invoice scenario (supplier wants dollars) next to the local-currency one, and a "bank route
   unavailable" corridor preset next to the "token route unavailable" one.
5. Present results as "what each route needs, what it costs under these assumptions, where it fails", never
   as "cheapest".

## 4. The strongest cases the page must state
**Advocate case.** [Likely] Cross-border payments still depend on prefunded accounts, cut-off times and chains
of intermediaries that deduct fees. FSB data show the G20 cost targets for 2027 will be missed and costs have
been flat since 2023 (R3 s1). Stablecoins settle provider to provider at any hour, with a final audit trail,
programmable conditions and no correspondent in the middle. Where banks have withdrawn, or where a currency is
unstable and the dollar is hard to reach, they may be the only practical option; Chainalysis puts attributable
cross-border use at USD 220bn, with monthly flows doubling. In the IMF's data the cheapest stablecoin route
beat the cheapest traditional route in roughly two thirds of comparable corridors [Likely], and the average cost was far below the
global remittance average. Ramps are the expensive part today, but ramps shrink as more counterparties accept
and hold tokens, and as regimes like GENIUS and the UK's give them legal certainty. A bank that ignores this
leaves its treasury and payment-firm customers to build around it.

**Sceptic case.** [Likely] A fast token transfer is only one leg of a payment. The IMF finds the chain is under a
quarter of cost; the ramps, FX and compliance are the rest, and in about a third of corridors a traditional
provider was cheaper. Stablecoin payments rely on a few issuers (USDT 61%, USDC 24%), whose redemption rights,
freeze powers and reserve quality sit outside the payer's control and outside deposit insurance. Real payment
volume is a small fraction of headline volume, and most estimates are one vendor figure repeated. Consumer
redress, reversibility and fraud reimbursement are weaker than on Faster Payments. "Negative cost" corridors
reflect capital controls and premiums, which someone else pays. Faster rails are improving and have the
advantage of existing legal finality: instant domestic systems, Swift gpi, Nexus in 2027, tokenised deposits.
Dollar stablecoins also move deposits and monetary control out of local banking systems, and the benefit to
the user can be a cost to the country.

## 5. What a senior payments, risk or strategy reader challenges first

1. "Complete only when spendable local currency" (ED:7). Whose definition? A freelancer paid in USDC to a
   wallet they use directly is paid. [Likely]
2. The scenario: why a local-currency invoice and a bank-account payee? It makes the sandwich look
   structurally worse by construction. Ask for a USD-invoice variant.
3. "Same price per leg" with the sandwich showing the most conversions. Is that a finding or an assumption?
4. "Compare a strong payment firm" (ED:14). The PSP is itself a non-bank with prefunded local accounts. Where is
   the comparison with the actual incumbent bank, at realistic fee and FX margin?
5. 2.18% versus 6.2% omitted next to "a third of corridors". Pick one framing and show both.
6. UK relevance: no sterling issuer, regime starts October 2027, UK-outbound costs were not retrievable (R3 s1).
   What is a UK bank's real decision today, and why are dollar-token examples the vehicle?
7. Chapter 10's "strongest case for and against" arrives last. Risk readers want it before the models.
8. Freeze and depeg: the March 2023 USDC depeg followed a bank failure (SVB). [Certain] A balanced ch.1 says
   so; it cuts against both "banks are safe" and "stablecoins are safe".

## 6. Top 10 changes, ranked

1. Reframe the thesis: "complete when the payee holds what they need"; show the fiat-endpoint objective as one of two.
2. Add a USD-invoice, dollar-wanting-supplier scenario beside the local-currency one in ch.3.
3. Add corridor conditions that can fail the bank routes: correspondent withdrawn, PSP not serving, no instant rail.
4. Replace the single cost ranking with per-leg-type spread controls, an amount control and a break-even readout.
5. Open ch.3 with a note that prices are equal per leg and only structure differs; never sort by cost.
6. Make PSP and sandwich costs symmetric: bundle provider and payout fees, or charge the PSP's local payout.
7. Add a named "where stablecoins genuinely win" beat (24/7 provider settlement, reach, dollar access, treasury, programmability) in ch.2 or 4.
8. Add token-side failure to the journey or ch.7: depeg, redemption suspension, freeze, issuer concentration, no APP reimbursement.
9. Wire `payerHolds` into all route fit rules, let `managed` reach `fits`, and show a "complements, not rivals" case (PSP settling treasury in tokens).
10. State the strongest advocate and sceptic cases (section 4) near the start of ch.3, and cite both IMF figures (2.18% average, one third of corridors lost) with caveats.
