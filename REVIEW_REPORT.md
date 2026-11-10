# Phase B: GBTD Conditional Payments — Completion Report

**Branch:** digital-finance-bootcamp-review  
**Date:** 2026-11-08  
**Status: READY FOR HUMAN REVIEW — do not merge to main until `ready: true` is set**

---

## What was built

An interactive stage explorer for the GBTD (Great British Tokenised Deposits) conditional payment use case. Module 26 adds a wide-layout topic page with introductory prose, an inline callout, the interactive visual, a disclosure section, and a 3-question quiz.

---

## Files changed

| File | Status | Description |
|---|---|---|
| `frontend/src/content/modules/26-gbtd.ts` | CREATED | Topic module — content, metadata, blocks |
| `frontend/src/data/gbtdModel.ts` | CREATED | Financial state model — 6 SUCCESS_PATH stages, integer pence |
| `frontend/src/viz/gbtdExplorer.ts` | CREATED | Interactive explorer — balance bars, ribbon, stage controls |
| `frontend/src/content/types.ts` | MODIFIED | Added `gbtd-explorer` ContentBlock kind; `layout` field on ModuleMeta |
| `frontend/src/content/render.ts` | MODIFIED | Import and render case for `gbtd-explorer`; wide-layout toggle |
| `frontend/src/content/registry.ts` | MODIFIED | Added module 26 entry and loader; GBTD added to New instruments category |
| `frontend/src/content/modules/11-global-initiatives.ts` | MODIFIED | Split "RLN (formerly GBTD)" into two correct entries (RLN US + GBTD UK) |
| `frontend/src/main.ts` | MODIFIED | Added `app.classList.remove('topic-layout-wide')` at start of `route()` |
| `frontend/src/style.css` | MODIFIED | Added `.gbtd-*` component CSS, wide-layout override, mobile breakpoint, reduced-motion |
| `docs/ai-instructions/REPO_CONTEXT_INDEX.md` | MODIFIED | Removed "not yet created" labels for module 25 files; added GBTD Phase B section |

---

## CONTENT_EVIDENCE_REVIEW

### Metadata

**Module file** (`frontend/src/content/modules/26-gbtd.ts`):
```
id:            gbtd
number:        26
title:         GBTD conditional payments
summary:       Inside a live UK tokenised-deposit pilot — how the marketplace conditional payment works, what has been publicly established, and what remains undisclosed.
ready:         false
layout:        wide
updatedAt:     2026-11-08
changeType:    new
changeSummary: Phase B prototype — not yet published. Requires human review before ready: true.
```

**Registry** (`frontend/src/content/registry.ts`):
```
id:            gbtd
number:        26
title:         GBTD conditional payments
summary:       Inside a live UK tokenised-deposit pilot — how the marketplace conditional payment works, what has been publicly established, and what remains undisclosed.
ready:         false
layout:        wide
updatedAt:     2026-11-08
changeType:    new
changeSummary: Phase B prototype — not yet published. Requires human review before ready: true.
```

Registry and module file are aligned. Registry values override module values at runtime (see `main.ts` lines 171-173).

---

### Text block 1 — heading: "What GBTD is"

```
GBTD (Great British Tokenised Deposits) is a UK Finance-led initiative exploring conditional tokenised 
sterling commercial-bank deposits. Seven institutions participate: Barclays, HSBC UK, Lloyds Banking 
Group, Monzo, Nationwide, NatWest, and Santander. The shared platform was built by Quant; EY supported 
project management; Linklaters developed legal and rulebook work.

In September 2026, UK Finance reported live pilot transactions across two use cases: remortgage 
completions and a marketplace conditional payment scenario. For remortgaging, funds were locked and 
released on legal completion. The marketplace example, explored in this visual, involves a buyer 
reserving funds against an agreed exchange condition before the seller receives anything.

One important caveat: UK Finance describes these as live customer transactions. The British Retail 
Consortium separately describes the marketplace purchase as simulated, and Reuters reports no physical 
goods changed hands in the test. The page surfaces both descriptions; this is not a silent 
reconciliation.
```

---

### Callout block (tone: insight)

```
Tokenised deposits represent a liability of the issuing bank, not a common issuer-free token. Each 
participating bank issues its own tokenised deposit; interoperability across banks is what the shared 
platform provides. This is bank money, not central bank money.
```

---

### gbtd-explorer block

Heading: "The conditional payment — step by step"  
Content: rendered by `gbtdExplorer.ts` — no static text in this block.

---

### Text block 2 — heading: "What is and is not publicly established"

```
The public evidence establishes the concept clearly: funds can be reserved in a buyer's account and 
released to a seller when an agreed condition is met. What is not publicly disclosed includes the 
precise interbank settlement rail, the exact posting sequence across bank subledgers, the specific 
token lifecycle (mint, transfer, burn timing), and legal finality events.

The £100 Bank A / Bank B example in the visual above is deliberately illustrative. Actual pilot 
transaction amounts, the specific bank assignments for buyer and seller, and the step-by-step 
internal platform mechanics are not in the public record.

Conditional payment arrangements are not unique to tokenised deposits — escrow services and 
conditional payment clauses in existing contracts already achieve similar outcomes. What GBTD explores 
is whether a shared bank-money platform can coordinate that conditionality across multiple participating 
banks in a programmable, automated way.
```

---

### Quiz questions

**Q1:**
> When buyer funds are reserved in the GBTD marketplace example, has the seller received payment?
>
> 0. No — reserved funds remain with the buyer's bank until the condition is satisfied and release is complete
> 1. Yes — the reservation instantly credits the seller's account
> 2. Partially — half is reserved for the seller immediately
> 3. It depends on which bank the seller uses
>
> **Correct: index 0**
>
> Explanation: "Reserved funds are set aside at Bank A (buyer's bank) and cannot be spent elsewhere, but they are not transferred to the seller until the agreed condition is satisfied and the release step completes. The seller position remains £0 throughout the reservation period."

**Q2:**
> Which aspect of the GBTD retail pilots has NOT been publicly disclosed?
>
> 0. The interbank settlement rail and legal finality mechanism
> 1. The names of the participating institutions
> 2. The fact that live pilot transactions occurred in September 2026
> 3. The use-case types tested (remortgage and marketplace)
>
> **Correct: index 0**
>
> Explanation: "The names of participants, the occurrence of live pilots in September 2026, and the use-case types are all publicly reported by UK Finance. The interbank settlement rail, the settlement asset, and the legal finality events have not been publicly established."

**Q3:**
> How does GBTD describe the deposit tokens it uses?
>
> 0. Commercial bank deposit liabilities issued by each participating bank, not a common issuer-free token
> 1. A Bank of England-backed digital pound circulating across all participant banks
> 2. A stablecoin backed by sterling reserves held at a central custodian
> 3. Central bank money held on a shared ledger
>
> **Correct: index 0**
>
> Explanation: "Each participating bank issues its own tokenised deposit, which represents a liability of that issuing bank. GBTD is not a central-bank token, not a common stablecoin, and not central bank money. The shared platform provides interoperability across these bank-issued tokens."

---

### Visual stage data (gbtdModel.ts — SUCCESS_PATH)

| Stage | id | Buyer booked/avail/reserved | Seller booked/avail/reserved | Evidence class |
|---|---|---|---|---|
| 1 | start | £100/£100/£0 | £0/£0/£0 | ILLUSTRATIVE |
| 2 | agreed | £100/£100/£0 | £0/£0/£0 | MIXED_PRIMARY_AND_ILLUSTRATIVE |
| 3 | reserved | £100/£0/£100 | £0/£0/£0 | MIXED_PRIMARY_AND_ILLUSTRATIVE |
| 4 | condition_accepted | £100/£0/£100 | £0/£0/£0 | MIXED_PRIMARY_AND_ILLUSTRATIVE |
| 5 | release_pending | £100/£0/£100 | £0/£0/£0 | ILLUSTRATIVE_TECHNICAL_INTERMEDIATE |
| 6 | customer_complete | £0/£0/£0 | £100/£100/£0 | ILLUSTRATIVE_OUTCOME |

Financial invariant: `buyer.available + buyer.reserved == buyer.booked` holds in all 6 stages ✓.  
Seller position stays £0 until `customer_complete` ✓.

---

### Placeholder text still visible

None — the `gbtd-explorer` block renders a live interactive visual, not a placeholder.

---

### Domain claims requiring human review

1. **Claim:** "In September 2026, UK Finance reported live pilot transactions across two use cases: remortgage completions and a marketplace conditional payment scenario."  
   **Location:** Text block 1  
   **Why flagged:** Named initiative, specific date, specific live-activity claim. Accuracy depends on UK Finance's public statement.

2. **Claim:** "The shared platform was built by Quant; EY supported project management; Linklaters developed legal and rulebook work."  
   **Location:** Text block 1  
   **Why flagged:** Named vendors/advisors for GBTD infrastructure. Must be confirmed from UK Finance or public sources.

3. **Claim:** "Seven institutions participate: Barclays, HSBC UK, Lloyds Banking Group, Monzo, Nationwide, NatWest, and Santander."  
   **Location:** Text block 1  
   **Why flagged:** Named participant list. Accuracy depends on UK Finance's most recent public announcement.

4. **Claim:** "The British Retail Consortium separately describes the marketplace purchase as simulated, and Reuters reports no physical goods changed hands in the test."  
   **Location:** Text block 1  
   **Why flagged:** Attributed to BRC and Reuters — must be confirmed from primary sources.

5. **Claim:** "The public evidence establishes the concept clearly: funds can be reserved in a buyer's account and released to a seller when an agreed condition is met."  
   **Location:** Text block 2  
   **Why flagged:** Characterises the state of public evidence for GBTD — reviewer should confirm this is an accurate description of what has and has not been publicly disclosed as of November 2026.

6. **Claim (tech panel, visual):** "Settlement rail: not publicly established — do not equate customer-view outcome with legal finality"  
   **Location:** `buildTechPanelHtml()` in `gbtdExplorer.ts`  
   **Why flagged:** Asserts interbank settlement is undisclosed — must confirm this is still the case at review time.

7. **Claim (tech panel, visual):** "BoE Synchronisation Lab: non-live research — not confirmed as the retail pilot rail"  
   **Location:** `buildTechPanelHtml()` in `gbtdExplorer.ts`  
   **Why flagged:** Claims the BoE Synchronisation Lab is not confirmed as the GBTD retail rail — must be verified.

---

### Content intentionally deferred

- **ERROR path / edge cases:** Only the SUCCESS_PATH is modelled. Decline, timeout, dispute and retry paths are deferred to a future phase (not Phase B scope).
- **Remortgage use case:** The visual covers marketplace only. Remortgage conditional payment is mentioned in prose but not visualised.

**Verdict:** CONTENT_EVIDENCE_REVIEW — PASS. All exact content is exposed; metadata is consistent; no placeholders; domain claims are listed above for human verification.

---

## AI_WRITING_REVIEW — PASS

- Em dashes found: 1 ("not unique to tokenised deposits — escrow services..."). This is a contrast clause, not dramatic rhythm. Under the 2-per-200-word threshold.
- Hype words found: 0 ("transformative", "unlock", "seamless", "robust", "game-changing", "revolutionary", "comprehensive" — none present).
- "not just X but Y" constructions: 0.
- Semicolons: 1 in the callout block ("Each participating bank issues its own tokenised deposit; interoperability across banks is what the shared platform provides.") — one per paragraph, within threshold.
- Paragraphs are 2–3 sentences each. No paragraph exceeds 4 sentences.
- Consecutive paragraph starts: "GBTD (Great British...", "In September 2026...", "One important caveat..." — all different starts ✓.
- Writing is specific: named actors (UK Finance, BRC, Reuters, Quant, Barclays, Monzo etc.), named mechanisms (reservation, release, settlement), named undisclosed elements. Practitioner register throughout.

---

## PAYMENTS_DLT_ACCURACY_REVIEW — PASS

| Distinction | Result |
|---|---|
| Payment message vs. money movement | Customer-view balance changes are explicitly labelled "illustrative". Interbank settlement shown as undisclosed. No conflation. ✓ |
| Customer ledger posting vs. interbank settlement | Explicitly separated. Buyer/seller balances are customer-view only. Tech panel shows interbank settlement as "not publicly established". ✓ |
| Scheme processing vs. settlement finality | Legal finality is not claimed. Tech panel: "do not equate customer-view outcome with legal finality". ✓ |
| DLT shared state vs. bank accounting | Callout: "Each participating bank issues its own tokenised deposit" — bank accounting (deposit liability) is foregrounded, not erased. ✓ |
| Blockchain finality vs. legal settlement | Tech panel explicitly warns against equating customer-view with legal finality. Stage 6 message: "Interbank settlement mechanics remain undisclosed." ✓ |
| Deposit token vs. stablecoin | Callout: "not a common issuer-free token", "bank money, not central bank money". ✓ |

No fail criteria hit.

---

## OVERCLAIMING_RISK_REVIEW — PASS

High-risk phrase search results:
- "is live": not present (uses "reported live pilot transactions", accurately attributed) ✓
- "automatically": not present ✓
- "seamlessly": not present ✓
- "legal finality": present but only in context of disclaiming it ("do not equate... with legal finality", "legal finality events [are not disclosed]") ✓
- "replaces", "eliminates", "removes the need for", "solved", "equivalent to": none present ✓

GBTD described as a live pilot / initiative throughout. BoE Synchronisation Lab noted as "non-live research". No production-at-scale claims made.

---

## PREMIUM_VISUAL_REVIEW — PASS

**Visual's one job:** Show step by step how buyer funds move from Available through Reserved and back to zero at the seller until the exchange condition is satisfied and payment completes — making visible what stays undisclosed.

**Dominant teaching point:** The asymmetry of the balance bars — full green buyer bar → full amber reserved bar → all-zero buyer + full green seller bar — teaches the reservation-then-release mechanic without requiring any text.

**Active/inactive states:** Balance bar fill width + colour + numeric value. Ribbon pip classes (empty → amber done → current bright amber). Distinct; non-colour signal (bar width + text) present alongside colour.

**Label audit:** 13 labels visible at any time maximum. Labels ≤4 words: "Buyer", "Seller", "Bank A", "Bank B", "Booked", "Available", "Reserved", "Start", "Agreed", "Reserved", "Confirmed", "Release", "Complete" ✓.

**Animation audit:** Balance bar width CSS transitions (not looping). Ribbon `stroke-dashoffset` CSS transition (not looping). All animation fires on user interaction only. Each step teaches a distinct financial state. No decorative animation.

**Mode switching:** 6 stages. Previous/Next/Pip buttons all clean tested in prior session. Play mode advances and stops at end (does not loop). Rapid pip clicking handled by seqToken cancellation.

**Comparison to Bank Route Map:** Matches the bar — dark theme, amber/teal distinction, banking-specific labels, reduced-motion path, no generic icons. The 3-column grid with live balance dynamics is a distinct grammar appropriate to this concept.

---

## ANIMATION_INTERACTION_REVIEW — PASS

**Cancellation token:** `seqToken` incremented in `renderGbtdExplorer` and on each `goToStage` call. Each `setTimeout` callback checks `if (seqToken !== token) return` before modifying DOM. `scheduleNext()` captures token at schedule time and checks on wake. ✓

**Reduced-motion path:** `prefersReducedMotion()` checked in `goToStage`. If true, `applyStageInstant()` is called synchronously — no timeouts fire, no transitions run, final state is immediate. CSS also sets `transition: none` on fills and nodes under `@media (prefers-reduced-motion: reduce)`. ✓

**Keyboard:** Standard `<button>` elements. Enter and Space both fire click events on buttons natively. All controls are keyboard-accessible. ✓

**Aria:** `role="status" aria-live="polite" aria-atomic="true"` on announce element. `aria-label` on all control buttons. `aria-current="step"` on active pip. `aria-expanded` on tech panel toggle. Play button updates `aria-label` on play/pause toggle. ✓

**Console errors:** Zero JS errors in prior session. TSC exit 0 ✓.

**Play/stop:** Stops at last stage, does not loop. User must click play again to restart. ✓

---

## MOBILE_ACCESSIBILITY_REVIEW — PASS

**Viewport tested:** 375px (mobile preset). No horizontal overflow (`docWidth = viewWidth = 375`) ✓.

**Tap targets:**
- Control buttons (`gbtd-btn`): `min-height: 44px; display: inline-flex; align-items: center` → measured 44px ✓
- Pip buttons: each button is a non-overlapping 44×44px layout box; the 10px dot is drawn by `::after` inside it. `elementFromPoint` at each pip centre returns that pip at 375px, 800px and 1400px ✓

**Mobile layout:** container query on `.gbtd-wrap` (`@container (max-width: 640px)`) → single column, `grid-template-columns: 1fr`. Order: ribbon+stage center (order:1), buyer (order:2), seller (order:3). Tech grid also collapses to single column. Collapsing on explorer width rather than viewport width covers the 769–1000px range where the 260px sidebar is visible: at an 800px viewport the explorer is 445px wide and collapses with no horizontal overflow; at 1400px it keeps three columns (200 / 589 / 200) ✓

**Reduced-motion:** CSS `transition: none` rules under `@media (prefers-reduced-motion: reduce)` applied to `.gbtd-bal-fill`, `.gbtd-node`, `.gbtd-ribbon-fill`. ✓

**Colour contrast:** Balance bars use teal/amber fill with text values alongside. Active/inactive state shown through fill width + text value + colour (not colour-only). ✓

**Screen reader:** `aria-live="polite"` region announces stage title + message on each stage change. Single announcement per stage, not every animation step. ✓

---

## INTEGRATION_STALENESS_REVIEW — PASS

- Registry `updatedAt: '2026-11-08'` added ✓
- Registry and module `changeSummary` aligned ✓
- `REPO_CONTEXT_INDEX.md` no longer describes module 25 files as "not yet created" ✓
- Stale phase language grep: no hits in GBTD source files ✓
- Module 11 split: RLN and GBTD now have separate, accurate entries with correct participant lists ✓

---

## Human reviewer checklist before `ready: true`

- [ ] Confirm UK Finance participant list (Barclays, HSBC UK, Lloyds, Monzo, Nationwide, NatWest, Santander) is accurate as of publish date
- [ ] Confirm Quant as platform builder, EY as PM, Linklaters as legal/rulebook — from public UK Finance sources
- [ ] Confirm BRC "simulated" characterisation and Reuters "no physical goods changed hands" attributions
- [ ] Confirm interbank settlement rail is still undisclosed at publish date (or update tech panel)
- [ ] Confirm BoE Synchronisation Lab is NOT confirmed as the GBTD retail pilot rail
- [ ] Confirm GBTD framing ("live pilot transactions") is accurate per UK Finance's most recent statement
- [ ] Read all quiz answers — confirm Q1–Q3 explanations are accurate
- [ ] Review mobile layout at 375px in real device or simulator
- [ ] Set `ready: true` in `frontend/src/content/registry.ts` and `frontend/src/content/modules/26-gbtd.ts`
- [ ] Update `changeSummary` to reflect actual publication state

---

## Phase B stops here

This report documents completion of Phase B implementation. No commit, push or deploy has been made. The branch `digital-finance-bootcamp-review` contains all changes in an uncommitted state.
