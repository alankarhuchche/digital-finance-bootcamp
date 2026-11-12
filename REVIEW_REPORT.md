# GBTD tokenised deposits (module 26): review report

**Repository:** alankarhuchche/digital-finance-bootcamp  
**Branch:** `digital-finance-bootcamp-review`, open as PR #1 into `main` (mergeable; no CI checks configured on the repo)  
**Reconciled:** 10 November 2026; redesign added 12 November 2026  
**Status:** Three layers. §0 is the page redesign of 12 November 2026, which replaces the three-mode explorer that §2–§7 describe. §1 is the committed PR branch (HEAD `3400925`). §2 lists the earlier working-tree changes. Nothing in §0 or §2 has been committed, pushed, merged or deployed; each of those steps needs owner approval.

---

## 0. Page redesign, 12 November 2026

The owner asked for a page that non-specialist bank staff can follow, two layers of "why" (why tokenise at all, and why bank tokens rather than a digital pound or stablecoins), researched use cases, and a storyboard before any build. The storyboard was signed off on 12 November 2026. Research came from four parallel streams with 222 sourced findings (programme facts, UK policy, pilots worldwide, future uses and limits).

### What the page is now

Nine chapters behind a sticky chapter rail: 1 Who goes first? (purchase-scam and remortgage dilemma, animated) · 2 Why tokenise money at all? (three stated reasons, "not speed", UK timeline) · 3 Why bank tokens? (status of the digital pound, a wholesale CBDC token, stablecoins and tokenised deposits; how GBTD's stated reason shifted from 2023 to 2026; what the missing central bank token leaves open) · 4 How the money moves (six-step scene: today, par, separate ledgers, the shared platform, the unpublished settlement question, scorecard) · 5 Try the £100 purchase (existing explorer, now with Sam and Alex, plainer stages and a "Bank view") · 6 What else could this do? (map of 11 use cases by reach and audience, filterable, each with today / what tokens add / watch-outs / sources) · 7 Shown, planned, not published · 8 What it doesn't fix · 9 Check yourself (five questions, all sources).

The CBDC framing follows the evidence: no source says GBTD exists because the UK lacks a CBDC. The page tells it as history (2023 groundwork alongside a digital pound, 2024 "the best home", 2026 case made against stablecoins, decision due end 2026) and keeps settlement between banks as the open question.

### Files

New: `data/gbtdStory.ts`, `data/gbtdStoryText.ts`, `viz/gbtdHook.ts`, `viz/gbtdScene.ts`, `viz/chapters.ts`, `viz/statusCards.ts`, `viz/useCaseAtlas.ts`. Rewritten: `content/modules/26-gbtd.ts`. Changed: `types.ts` and `content/types.ts` (spec types and block kinds; `gbtd-modes-explorer` removed), `content/render.ts`, `chat.ts`, `content/registry.ts` (metadata), `viz/gbtdExplorer.ts`, `data/gbtdModel.ts`, `style.css`, `docs/ai-instructions/REPO_CONTEXT_INDEX.md`, this report.

Shared-file touches: `#app { min-width: 0 }` in `style.css` fixes a site-wide phone bug (the main column widened to its widest content, 900–988px, so every topic zoomed out on a 390px phone). `render.ts` adds a delegated handler so `a[data-topic]` links navigate in place, and drops block headings to h3 inside chapters.

Deleted with the owner's approval on 12 November 2026: the superseded three-mode explorer, `data/gbtdModes.ts` and `viz/gbtdModesExplorer.ts` (both untracked, so removed for good), and its `.gbm-` rules in `style.css` (270 lines). Nothing imported them.

### Checks run on 12 November 2026

- `npx tsc --noEmit` and `vite build`: pass.
- Headless Chrome at 320, 390, 768, 1024, 1440, 1920, 2560 and 3440 px: no horizontal overflow. Console: only the expected `/api/visits` 502 (backend not running) and a missing favicon.
- Reduced motion: every state lands at once; no animations running after a step change.
- Interactions: both dilemma tabs and all six choices; scene by scroll (container ≥900px) and by step buttons; atlas filters, including People + Live, which shows the "nothing live for people" note; a map marker opens and focuses its card; the chapter rail tracks the current chapter (inline at ≥1200px, menu below); "Ask about this" opens the chat with the question filled in; topic links navigate without a reload.
- Copy: no em dashes, no banned words from the style guide, every dated claim linked to a source.
- INTEGRATION_STALENESS_REVIEW: PASS, re-run after the deletion. The gate's general search finds no stale language in the GBTD files; its remaining hits concern other topics' plans and generic words such as input `placeholder` attributes. No code or doc refers to the old explorer except the historical sections of this report, each marked as superseded. Metadata in the module and registry agree (`updatedAt: '2026-11-12'`, `changeType: 'new'`, same summary and changeSummary). Chapter order follows the signed-off storyboard.

### Open points for the owner, in addition to §8

1. Accept the site-wide `#app` phone fix, or split it into its own change.
2. The chat context is capped at 8,000 characters, so questions about later chapters get less page context.
3. The Deposit tokens page says trade finance works today. This research found no verified trade-finance use of tokenised deposits.
4. Re-verify dates before publishing: the digital pound decision, DIGIT, and GBTD's 2027 plans.

---

## 1. Committed state of the PR branch

### Commits on the branch that are not on `main` (`main` is at `975df3f`)

| Commit | Date | Scope | GBTD work? |
|---|---|---|---|
| `a923232` | 2026-11-07 | Content polish pass across six modules: 01-existing-rails, 02-forms-of-money, 03-risk-benefit, 18-payments-fundamentals, 24-what-actually-moves, 25-swift-bank-gateway (24 insertions, 23 deletions) | **No** |
| `c6a1ee7` | 2026-11-10 | Conditional-payment explorer and module 26 (`ready: false`), RLN/GBTD split in module 11, REPO_CONTEXT_INDEX fixes, first version of this report | Yes |
| `7bc1ac9` | 2026-11-10 | `ready: true` in registry and module 26 | Yes |
| `3400925` | 2026-11-10 | Codex fixes: non-overlapping 44px stage pips; explorer collapse by container width | Yes |

### Flags at HEAD `3400925`

Registry entry and module file agree: `ready: true`, `layout: 'wide'`, `updatedAt: '2026-11-10'`, `changeType: 'new'`, title `GBTD conditional payments`. The previous version of this report still said `ready: false`, `updatedAt: 2026-11-08`, "do not merge until `ready: true` is set" and "no commit, push or deploy has been made". Those statements were stale and are replaced by this section.

### Codex review findings on PR #1

| Finding | Status |
|---|---|
| P2: stage-button hit areas overlap (`style.css`) | Fixed in `3400925`. Reply posted. GitHub marks the thread outdated, but it is **unresolved**: the automated resolve was blocked by a permission check, so the owner needs to resolve it. |
| P2: three-column explorer overflows at tablet widths (`style.css`) | Fixed in `3400925`. Reply posted. Outdated but **unresolved**, for the same reason. |

No new Codex findings have been posted since `3400925`.

### Unrelated change on the shared branch

`a923232` is user-authored editorial work on six non-GBTD topics. It has been preserved, not reverted.

- A local branch `content-polish-pass` now points at `a923232`. Its parent is `main`'s head, so it is a clean one-commit branch. It has not been pushed.
- Isolation from PR #1 has **not** been carried out, because every option changes shared state:
  1. **Recommended:** push `content-polish-pass`, open a PR for it into `main`, and change PR #1's base to `content-polish-pass`. PR #1 then shows only GBTD work. When the polish PR merges, GitHub retargets PR #1 to `main`. No history is rewritten.
  2. Merge the polish work into `main` first using a merge commit (not squash). PR #1's diff then drops the six files on its own.
  3. Rebuild PR #1 without `a923232` (rebase or cherry-pick). This needs a force-push or a replacement PR and is not recommended.

---

## 2. Working-tree changes in this review (uncommitted)

> Superseded by §0. §2 to §7 describe the three-mode explorer of 10 November 2026, which was replaced and deleted on 12 November 2026. They are kept as the record of that review.

| File | Change |
|---|---|
| `frontend/src/data/gbtdModes.ts` | **New.** Three-arrangement data: steps, property statuses, evidence groups, chat-context text. |
| `frontend/src/viz/gbtdModesExplorer.ts` | **New.** Primary explorer: one SVG scene with landscape (≥640px) and portrait geometry, Web Animations motion, seqToken cancellation, reduced-motion path, ResizeObserver with teardown. |
| `frontend/src/content/modules/26-gbtd.ts` | Retitled. New summary and changeSummary. Intro rewritten against the claim register. Blocks re-ordered so the new explorer leads and the £100 explorer becomes the supporting use case. Paragraphs use `<p>` (they previously rendered as one block of text). Quiz Q4 added. |
| `frontend/src/content/registry.ts` | Same metadata as the module file. |
| `frontend/src/content/types.ts`, `render.ts` | New `gbtd-modes-explorer` block kind and render case. `layout` comment updated. |
| `frontend/src/chat.ts` | `openChatWithQuestion()` opens the existing panel and pre-fills an editable question; it does not send. Explorer copy added to the existing client-side chat context. No backend change. |
| `frontend/src/viz/gbtdExplorer.ts` | Use-case fixes: stage labels moved from 7-unit SVG text to 11px HTML with a "Stage n of 6" counter; Play no longer runs timers under reduced motion; opts into full width. |
| `frontend/src/data/gbtdModel.ts` | Header comment only ("Phase B" removed). |
| `frontend/src/style.css` | `.gbm-*` styles. Wide layout centred beside the sidebar and capped at 1800px of content, with a 760px reading measure for text blocks. 16px phone gutter on the wide page only. Use-case explorer capped at 1280px with a 520px ribbon. Use-case text below 11px raised to 11px; use-case buttons given a 44px minimum width. |
| `docs/ai-instructions/REPO_CONTEXT_INDEX.md` | GBTD section updated to the current files. `ContentBlock` path corrected to `frontend/src/content/types.ts`. |
| `REVIEW_REPORT.md` | This reconciliation. |

---

## 3. Content evidence packet (generated verbatim from source)

The section below is printed directly from `26-gbtd.ts`, `gbtdModes.ts` and `gbtdModel.ts`, so it cannot drift from the code. Fixed SVG labels in `gbtdModesExplorer.ts`: Payer, Payee, at Bank A, at Bank B, Bank A, Bank B, Ledger A, Ledger B, Funds parked, Intermediary, A-issued, B-issued, Bank A account, Bank B account. Use-case explorer fixed copy in `gbtdExplorer.ts` is unchanged from `c6a1ee7` apart from the stage counter ("Stage n of 6").


### Metadata (module file; registry entry carries identical values)
```
id: gbtd
number: 26
title: GBTD tokenised deposits
summary: Why UK banks are testing tokenised deposits on a shared platform: how deposits move between banks today, what separate token ledgers break, and what the 2026 GBTD pilot has and has not shown.
ready: true
layout: wide
updatedAt: 2026-11-10
changeType: new
changeSummary: New topic: three-mode explorer comparing traditional banking, fragmented token ledgers and the GBTD shared platform, with a conditional-payment use case.
```

### Page blocks in order

**Block 1 · text** · heading "What GBTD is"

```text
<p>GBTD (Great British Tokenised Deposits) is a UK Finance-led initiative exploring tokenised sterling commercial-bank deposits. Seven institutions participate: Barclays, HSBC UK, Lloyds Banking Group, Monzo, Nationwide, NatWest and Santander. Quant built the shared platform, EY supported project management and Linklaters developed the legal and rulebook work.</p>
<p>In September 2026, UK Finance reported live pilot transactions in two use cases. In two remortgage completions, funds were locked and then released on completion. In a marketplace payment, the buyer’s funds were held until an agreed exchange condition was met.</p>
<p>Sources differ on that marketplace payment. UK Finance describes live customer transactions. The British Retail Consortium describes the purchase as simulated, and Reuters reports that no physical goods changed hands in its test. This page shows both descriptions rather than reconciling them.</p>
```

**Block 2 · gbtd-modes-explorer** · heading "Three ways a deposit moves between banks"

Rendered by `gbtdModesExplorer.ts`; copy listed in the next section.

**Block 3 · callout**

Tone: insight
```text
Interoperability, fungibility at par and legal settlement finality come from different places. Interoperability comes from shared rules and connectivity. Par between banks rests on convertibility into central bank money, supported by regulation, supervision and deposit protection. Legal finality comes from system rules and settlement-finality law. A shared ledger can provide the first. It does not, by itself, provide the other two.
```

**Block 4 · gbtd-explorer** · heading "Use case: a conditional marketplace payment"

Rendered by `gbtdExplorer.ts`; copy listed in the use-case section.

**Block 5 · text** · heading "What is and is not publicly established"

```text
<p>The public evidence establishes the concept clearly: funds can be reserved in a buyer’s account and released to a seller when an agreed condition is met. What is not publicly disclosed includes the precise interbank settlement rail, the exact posting sequence across bank subledgers, the specific token lifecycle (mint, transfer, burn timing), and legal finality events.</p>
<p>The £100 Bank A / Bank B examples in both visuals are deliberately illustrative. Actual pilot transaction amounts, the specific bank assignments for buyer and seller, and the step-by-step internal platform mechanics are not in the public record.</p>
<p>Conditional payment arrangements are not unique to tokenised deposits — escrow services and conditional payment clauses in existing contracts already achieve similar outcomes. What GBTD explores is whether a shared bank-money platform can coordinate that conditionality across multiple participating banks in a programmable, automated way.</p>
```

**Block 6 · quiz** · heading "Check your understanding"

Q1. When buyer funds are reserved in the GBTD marketplace example, has the seller received payment?
  0. No — reserved funds remain with the buyer’s bank until the condition is satisfied and release is complete
  1. Yes — the reservation instantly credits the seller’s account
  2. Partially — half is reserved for the seller immediately
  3. It depends on which bank the seller uses
  Correct: index 0
  Explanation: Reserved funds are set aside at Bank A (buyer’s bank) and cannot be spent elsewhere, but they are not transferred to the seller until the agreed condition is satisfied and the release step completes. The seller position remains £0 throughout the reservation period.

Q2. Which aspect of the GBTD retail pilots has NOT been publicly disclosed?
  0. The interbank settlement rail and legal finality mechanism
  1. The names of the participating institutions
  2. The fact that live pilot transactions occurred in September 2026
  3. The use-case types tested (remortgage and marketplace)
  Correct: index 0
  Explanation: The names of participants, the occurrence of live pilots in September 2026, and the use-case types are all publicly reported by UK Finance. The interbank settlement rail, the settlement asset, and the legal finality events have not been publicly established.

Q3. How does GBTD describe the deposit tokens it uses?
  0. Commercial bank deposit liabilities issued by each participating bank, not a common issuer-free token
  1. A Bank of England-backed digital pound circulating across all participant banks
  2. A stablecoin backed by sterling reserves held at a central custodian
  3. Central bank money held on a shared ledger
  Correct: index 0
  Explanation: Each participating bank issues its own tokenised deposit, which represents a liability of that issuing bank. GBTD is not a central-bank token, not a common stablecoin, and not central bank money. The shared platform provides interoperability across these bank-issued tokens.

Q4. A shared platform lets customers of Bank A and Bank B pay each other with tokenised deposits. What does the shared platform, on its own, provide?
  0. Interoperability between the participating banks
  1. Fungibility at par between the two banks’ tokens
  2. Legal settlement finality between the banks
  3. All three, because the ledger records the transfer
  Correct: index 0
  Explanation: Shared rules and a shared platform provide interoperability. Par between issuers rests on convertibility into central bank money, backed by regulation. Legal finality depends on system rules and settlement-finality law. GBTD has not published how its pilots settled between banks.

### Three-arrangement explorer copy (`frontend/src/data/gbtdModes.ts`)

Intro: "Pick an arrangement, then step through the same £100 payment from a Bank A customer to a Bank B customer."
Footer: "£100, Bank A and Bank B are illustrative. GBTD’s token mechanics, bank postings and interbank settlement have not been published."

Property names: Interoperability · Fungible at par · Liquidity · Legal finality
Status labels: In place · Breaks · Pilot · Not public
Evidence labels: live = "Live UK practice" · illustrative-problem = "Illustrative problem" · reported = "Publicly reported" · described = "Publicly described concept" · illustrative = "Illustrative account view" · not-public = "Not publicly disclosed"

#### 01 Traditional banking — tab sub "How deposits move today", pill "Live"

Scene labels: bank sub "Deposit ledger"; middle "Payment scheme" / "Faster Payments · CHAPS"; settlement band "Bank of England RTGS" / "Central bank money"; settlement note "Settles £100 owed"

| Step | Title | Caption | Evidence label | Payer | Payee | Bank A | Bank B |
|---|---|---|---|---|---|---|---|
| Overview | Two banks, one settlement asset | Each bank owes its own customers. Payment schemes carry instructions between banks, and banks settle what they owe each other in central bank money at the Bank of England. | Live UK practice | £100 available | £0  | Owes payer £100 | Owes payee £0 |
| 1 | Payer instructs Bank A | The payer asks Bank A to send £100 to a customer of Bank B. The payer’s £100 is a claim on Bank A. | Live UK practice | £100 sending | £0  | Owes payer £100 | Owes payee £0 |
| 2 | Bank A debits and messages | Bank A cuts what it owes the payer by £100 and sends a payment message through the scheme. The message instructs Bank B. It does not carry money. | Live UK practice | £0 sent | £0  | Owes payer £0 | Owes payee £0 |
| 3 | Bank B credits the payee | Bank B raises what it owes the payee by £100. The payee now holds a claim on Bank B, not on Bank A. | Live UK practice | £0 sent | £100 received | Owes payer £0 | Owes payee £100 |
| 4 | Banks settle in central bank money | Bank A now owes Bank B £100. That debt settles between their settlement accounts at the Bank of England. CHAPS settles each payment in RTGS before the payee is credited. Faster Payments credits first and settles net later. | Live UK practice | £0 sent | £100 received | Owes payer £0 | Owes payee £100 |

| Property | Status | Label | Text |
|---|---|---|---|
| Interoperability | In place | Payment schemes | Faster Payments, CHAPS and Bacs connect participating banks through common rules and messages. |
| Fungible at par | In place | Central bank anchor | Banks settle with each other in central bank money. With regulation and deposit protection, £1 at Bank A stays worth £1 at Bank B. |
| Liquidity | In place | Settlement accounts | Each settling bank meets its payment obligations from its settlement account at the Bank of England. |
| Legal finality | In place | Set by rules and law | Settlement across RTGS accounts is final and irrevocable. System rules and settlement-finality law fix the moment of finality. |

Note heading "Why look beyond this?": These rails already move deposits between banks at par, with legal finality in central bank money. Conditional payments such as escrow can be built on them too. DLT is being tested for a narrower reason: a shared, programmable record that several banks can use to coordinate conditions.

Links: What actually moves? → /topic/what-actually-moves · Settlement & infrastructure → /topic/settlement
Ask prefill: "How do deposits at two different banks stay worth the same when I pay someone at another bank?"

#### 02 Fragmented DLT — tab sub "Each bank, its own ledger", pill "Illustrative"

Scene labels: bank sub "Own token ledger"; middle "No shared ledger"; settlement band "No common settlement asset" / "Token ledgers not linked to RTGS"; settlement note "Nothing settles the debt"

| Step | Title | Caption | Evidence label | Payer | Payee | Bank A | Bank B |
|---|---|---|---|---|---|---|---|
| Overview | Two banks, two ledgers | Suppose each bank issues tokenised deposits on its own ledger. Each token is still a claim on its issuer, but the two ledgers are not connected to each other or to a common settlement asset. | Illustrative problem | £100 A token | £0  | Owes payer £100 | Owes payee £0 |
| 1 | The token cannot cross | The payer tries to send £100 to the payee. Bank B’s ledger cannot read or accept Bank A’s token, and no shared rulebook says how the two ledgers should interact. | Illustrative problem | £100 not sent | £0 not paid | Owes payer £100 | Owes payee £0 |
| 2 | Workarounds add a counterparty | The payee could accept a Bank A token and take on a claim against a bank they do not use. Or an intermediary could swap the token, adding a counterparty, cost and delay. | Illustrative problem | £100 not sent | £0 not paid | Owes payer £100 | Owes payee £0 |
| 3 | Liquidity splits by ledger | To pay into each other’s ledgers, each bank must keep funds on every ledger it uses. Money parked on one ledger cannot meet obligations on another. | Illustrative problem | £100 not sent | £0 not paid | Owes payer £100 | Owes payee £0 |
| 4 | No settlement anchor | Even if a transfer completes, Bank A owes Bank B. Nothing on either ledger settles that debt in central bank money, so the point of legal finality is unclear. | Illustrative problem | £100 not sent | £0 not paid | Owes payer £100 | Owes payee £0 |

| Property | Status | Label | Text |
|---|---|---|---|
| Interoperability | Breaks | No path between ledgers | A Bank A token cannot move onto Bank B’s ledger. Each crossing needs an intermediary, or redemption and reissue. |
| Fungible at par | Breaks | Issuer risk travels | A token is a claim on its issuer. If tokens from different banks circulate without a common settlement asset, they could trade at different values. |
| Liquidity | Breaks | Split by ledger | Each bank must keep funds on every ledger it pays into. Funds on one ledger cannot meet calls on another. |
| Legal finality | Breaks | Unclear | A confirmed transfer on one ledger records that ledger’s state. It does not settle what Bank A owes Bank B, or make the payment legally final. |

Note heading "What DLT introduces": Separate ledgers recreate problems that payment schemes and central bank settlement already solve: crossing between ledgers, splitting liquidity and settling between issuers. Single-bank token platforms are useful inside one bank. Moving tokenised money between banks is the hard part.

Links: Deposit tokens → /topic/deposit-tokens · Forms of money → /topic/forms-of-money
Ask prefill: "Why can’t a Bank A deposit token simply move onto Bank B’s ledger?"

#### 03 GBTD shared platform — tab sub "UK pilot, 2026", pill "Pilot"

Scene labels: bank sub "Token issuer"; middle "Shared platform" / "Common rulebook"; settlement band "Interbank settlement" / "Not publicly disclosed"; settlement note "Rail not disclosed"

| Step | Title | Caption | Evidence label | Payer | Payee | Bank A | Bank B |
|---|---|---|---|---|---|---|---|
| Overview | One platform, separate liabilities | Participating banks issue tokenised deposits on one shared platform under a common rulebook. Each token stays a deposit liability of the bank that issued it. | Publicly reported | £100 available | £0  | Owes payer £100 | Owes payee £0 |
| 1 | Funds held on a condition | The payer’s £100 is reserved against an agreed condition. It stays a claim on Bank A, and the payee has not been paid. | Publicly described concept | £100 held | £0 not paid | Owes payer £100 | Owes payee £0 |
| 2 | Condition met, payment released | When the condition is reported as met, the held funds are released for payment to the payee. UK Finance reported pilot payments of this kind in September 2026. | Publicly reported | £100 held | £0 pending | Owes payer £100 | Owes payee £0 |
| 3 | Payee credited at Bank B | In this illustration, Bank A’s liability falls by £100 and Bank B’s rises by £100. The actual token and posting sequence has not been published. | Illustrative account view | £0 paid | £100 received | Owes payer £0 | Owes payee £100 |
| 4 | Interbank settlement not public | Bank B now owes £100 more and Bank A £100 less, so an interbank obligation must settle. The rail, settlement asset and finality event used in the retail pilots have not been published. A credit shown to the payee is not proof of interbank settlement. | Not publicly disclosed | £0 paid | £100 received | Owes payer £0 | Owes payee £100 |

| Property | Status | Label | Text |
|---|---|---|---|
| Interoperability | Pilot | Within the platform | Participating banks’ tokens move on one platform under a common rulebook. UK Finance reported this working in the 2026 pilots. |
| Fungible at par | Not public | Depends on settlement | Each token remains its issuer’s liability. How par between issuers is maintained depends on settlement arrangements GBTD has not published. |
| Liquidity | Not public | Not disclosed | How participating banks fund and settle positions created on the platform has not been published. |
| Legal finality | Not public | Not established publicly | A credit shown to the payee is not evidence of legal settlement finality. The pilots’ settlement rail and finality event are unpublished. |

Note heading "What the pilot showed": GBTD tests whether one shared platform and rulebook can let several banks’ tokenised deposits interoperate, with conditions attached. Interoperability within the platform was reported. Par and legal finality still depend on settlement arrangements that have not been published.

Evidence group "Publicly reported, Sept 2026":
- Seven participating banks and building societies on a shared platform built by Quant
- Pilot transactions: a marketplace payment and two remortgage completions
- Funds held and released against an agreed condition
  Note: UK Finance describes live customer transactions. The BRC describes the marketplace purchase as simulated.

Evidence group "Stated plans, not results":
- Further digital-asset settlement work after the retail pilots (a plan, not a result)
- Bond and gilt DvP experiments listed in the Bank of England’s non-live Synchronisation Lab

Evidence group "Not publicly disclosed":
- Interbank settlement rail, settlement asset and finality event
- How banks fund positions on the platform
- Token issuance, transfer and redemption sequence, and bank postings

Panel "Does this need wholesale CBDC?": Settling in central bank money does not have to mean putting wholesale CBDC on every ledger. Synchronising RTGS with another ledger is one approach the Bank of England is developing. Whether GBTD’s retail pilots used anything like it is not public.

Links: Use case: conditional payment (scrolls to use case) · Deposit tokens → /topic/deposit-tokens
Ask prefill: "What has the GBTD pilot actually shown, and what is still not public?"

### Use-case explorer stages (`frontend/src/data/gbtdModel.ts`, unchanged copy)

| Stage | Title | Message | Evidence label |
|---|---|---|---|
| 1 | Before purchase | The buyer starts with £100 available at Bank A. The seller has not been paid. | Illustrative |
| 2 | Terms agreed | Buyer and seller agree that payment should be released only after the agreed exchange condition is satisfied. | Public mechanism · Illustrative detail |
| 3 | Funds reserved | £100 is set aside in the buyer's account. It is unavailable for other spending. The seller has not received it. | Public mechanism · Illustrative detail |
| 4 | Condition satisfied | The agreed exchange condition is reported as met. The reserved funds have not yet been transferred in this model. | Public mechanism · Illustrative detail |
| 5 | Release requested | The satisfied condition authorises release. Customer balances shown are the last confirmed values before the illustrative transfer. | Illustrative · Last confirmed view |
| 6 | Illustrative payment complete | The example shows the buyer debited and seller credited £100. Interbank settlement mechanics remain undisclosed. | Illustrative outcome · Settlement unknown |


---

## 4. Domain claims requiring human review

Claim IDs refer to the GBTD pack claim register (`C`), unknowns (`U`) and sources (`S`), snapshot dated 7 Nov 2026. The pack says to reverify before publication.

| # | Claim (exact text) | Location | Basis | Why flagged |
|---|---|---|---|---|
| 1 | "Seven institutions participate: Barclays, HSBC UK, Lloyds Banking Group, Monzo, Nationwide, NatWest and Santander. Quant built the shared platform, EY supported project management and Linklaters developed the legal and rulebook work." | Block 1 | C02, C03 (S01) | Named participants and vendors |
| 2 | "In September 2026, UK Finance reported live pilot transactions in two use cases. In two remortgage completions, funds were locked and then released on completion. In a marketplace payment, the buyer’s funds were held until an agreed exchange condition was met." | Block 1 | C05, C06, C08 | Dated programme assertion |
| 3 | "The British Retail Consortium describes the purchase as simulated, and Reuters reports that no physical goods changed hands in its test." | Block 1 | C07 (S05, S06) | Third-party attribution; conflict shown, not reconciled (rule D1) |
| 4 | "Faster Payments, CHAPS and Bacs connect participating banks through common rules and messages." | Traditional · Interoperability | General; consistent with topic 24 | Named schemes |
| 5 | "Banks settle with each other in central bank money. With regulation and deposit protection, £1 at Bank A stays worth £1 at Bank B." | Traditional · Fungible at par | Analytical; consistent with topic 02 | Par / singleness claim |
| 6 | "Each settling bank meets its payment obligations from its settlement account at the Bank of England." | Traditional · Liquidity | General | Settlement-account claim |
| 7 | "Settlement across RTGS accounts is final and irrevocable. System rules and settlement-finality law fix the moment of finality." | Traditional · Legal finality | General; consistent with topics 01 and 13 | Finality claim |
| 8 | "CHAPS settles each payment in RTGS before the payee is credited. Faster Payments credits first and settles net later." | Traditional · step 4 | Consistent with topic 24 wording | Rail sequencing claim |
| 9 | "If tokens from different banks circulate without a common settlement asset, they could trade at different values." | Fragmented · Fungible at par | Analytical; topic 02 | Par claim, hedged with "could" |
| 10 | "A confirmed transfer on one ledger records that ledger’s state. It does not settle what Bank A owes Bank B, or make the payment legally final." | Fragmented · Legal finality | Analytical (C14) | On-ledger state vs legal finality |
| 11 | "Participating banks issue tokenised deposits on one shared platform under a common rulebook. Each token stays a deposit liability of the bank that issued it." | GBTD · overview | C03, C04 | "Common rulebook" is inferred from C03's "rulebook work" |
| 12 | "UK Finance reported pilot payments of this kind in September 2026." / "UK Finance reported this working in the 2026 pilots." | GBTD · step 2; Interoperability | C05, C06 | Programme assertion, not independent validation (rule D2) |
| 13 | "The rail, settlement asset and finality event used in the retail pilots have not been published. A credit shown to the payee is not proof of interbank settlement." | GBTD · step 4; Legal finality | U04, C14 | Must remain true at publication |
| 14 | "How participating banks fund and settle positions created on the platform has not been published." | GBTD · Liquidity | U04 | Must remain true at publication |
| 15 | "Further digital-asset settlement work after the retail pilots (a plan, not a result)" | GBTD · Stated plans | C11 | Pack: reverify on build |
| 16 | "Bond and gilt DvP experiments listed in the Bank of England’s non-live Synchronisation Lab" | GBTD · Stated plans | C10 (S04) | Central-bank scope |
| 17 | "Settling in central bank money does not have to mean putting wholesale CBDC on every ledger. Synchronising RTGS with another ledger is one approach the Bank of England is developing. Whether GBTD’s retail pilots used anything like it is not public." | GBTD · "Does this need wholesale CBDC?" | S09 plus analysis | **Not a GBTD statement.** The request framed GBTD as working "without requiring wholesale CBDC on every ledger"; no source in the register says this. Shown as a design question with the BoE work, not as a GBTD fact. |
| 18 | "Par between banks rests on convertibility into central bank money, supported by regulation, supervision and deposit protection. Legal finality comes from system rules and settlement-finality law. A shared ledger can provide the first. It does not, by itself, provide the other two." | Callout | Analytical | Core teaching claim of the page |
| 19 | Quiz Q4 explanation: "GBTD has not published how its pilots settled between banks." | Quiz | U04 | Must remain true at publication |
| 20 | Use-case technical panel (unchanged): "Platform: Quant (confirmed)" and "BoE Synchronisation Lab: non-live research — not confirmed as the retail pilot rail" | `gbtdExplorer.ts` | C03, C10 | Carried over from `c6a1ee7` |

---

## 5. Issues found in this review and how they were resolved

The first four rows correct claims the earlier report marked PASS without measuring them.

| # | Gate | File / location | Problem | Fix |
|---|---|---|---|---|
| 1 | MOBILE_ACCESSIBILITY | `gbtdExplorer.ts`, `style.css` | Use-case ribbon labels were 7 SVG units: about 6.9px at 375px and 5.7px at a 1024px tablet. Earlier report said PASS. | Labels moved to 11px HTML in six equal columns. Hidden when the column is under 390px, where a "Stage n of 6" counter carries position. |
| 2 | ANIMATION_INTERACTION | `gbtdExplorer.ts` `startPlay` | Under reduced motion, Play still advanced on 2.4s timers (gate: no timeouts in reduced motion). | Play jumps to the final stage synchronously. Same rule in the new explorer. |
| 3 | MOBILE_ACCESSIBILITY | `style.css` | Use-case eyebrow, bank tags, "last confirmed" and evidence pill were 10px. | Raised to 11px. |
| 4 | PREMIUM_VISUAL | `26-gbtd.ts` | Multi-paragraph text blocks rendered as one block, because blank lines collapse inside `innerHTML`. | Paragraphs wrapped in `<p>`. |
| 5 | PREMIUM_VISUAL | `style.css` wide layout | At 1920px, prose stretched to about 1,550px per line. At 3440px the page was anchored left. | Text blocks capped at 760px. `#app` capped at 1800px of content and centred beside the sidebar. |
| 6 | PREMIUM_VISUAL | `style.css` | At 3440px the use-case ribbon dots scaled to roughly 27px radius. | Ribbon capped at 520px; use-case explorer capped at 1280px. |
| 7 | MOBILE_ACCESSIBILITY | `gbtdModesExplorer.ts` | First landscape geometry would have rendered 13–14-unit labels at about 10px on a 1024px tablet. | Landscape text raised to ≥15 units, landscape from 640px, portrait geometry below. |
| 8 | MOBILE_ACCESSIBILITY | `style.css` | An `@container gbm` rule targeted the container element itself, so it had no effect. | Replaced with a media query. |
| 9 | PREMIUM_VISUAL | `gbtdModesExplorer.ts` | "No shared ledger" was crossed by the intermediary path. | Label moved above the gap. |
| 10 | PREMIUM_VISUAL | `gbtdModesExplorer.ts` | Customer subtitle ran into the status word ("Bank A customer available"). | Subtitles shortened to "at Bank A" / "at Bank B". |
| 11 | PREMIUM_VISUAL | `style.css` | Dimmed bank boxes let the shared-platform band show through. | Box fill stays opaque; only content and stroke dim. |
| 12 | OVERCLAIMING_RISK | `gbtdModes.ts` GBTD step 2 | "the platform authorises release" named an actor for a mechanism the pack lists as unpublished (U03). | "the held funds are released for payment to the payee". |
| 13 | OVERCLAIMING_RISK | `gbtdModes.ts` evidence heading | "Stated next steps" grouped plans with results too loosely (C11). | "Stated plans, not results". |
| 14 | INTEGRATION_STALENESS | `REVIEW_REPORT.md`, `REPO_CONTEXT_INDEX.md`, comments | Report said `ready: false` and "nothing committed". Index said "Phase B in progress". "Phase B" comments remained in source. | Reconciled and updated. |
| 15 | INTEGRATION_STALENESS | `REPO_CONTEXT_INDEX.md` | Pointed to `frontend/src/types.ts` for `ContentBlock`. | Corrected to `frontend/src/content/types.ts`. |
| 16 | AI_WRITING | `26-gbtd.ts` | One straight apostrophe among typographic ones. | Made consistent. |
| 18 | MOBILE_ACCESSIBILITY (measured) | `style.css` `.gbtd-btn`, `.gbtd-btn--play` | Use-case ←, ▶, → and ↺ buttons measured 30–36px wide. The earlier fix set `min-height` only, and a later `.gbtd-btn--play` rule pinned Play at 36px. | `min-width: 44px` on both rules; re-measured at 44px. |
| 19 | MOBILE_ACCESSIBILITY (measured) | `gbtdModesExplorer.ts` portrait geometry | 13-unit text rendered at 10.6px on a 320px phone. | Portrait small, mono, chip, intermediary and account text raised to 13.5 units (≥11px at 320px). |
| 20 | PREMIUM_VISUAL (measured) | `style.css` `.gbm-tab` | At a 1024px tablet the three arrangement tabs wrapped to four lines ("Fragmented DLT"). | Between 600 and 1099px of container width, the maturity pill moves under the label. |
| 17 | Workflow contract | Commits `c6a1ee7`, `7bc1ac9`, `3400925` | Each carries a `Co-Authored-By: Claude …` trailer. `CLAUDE_WORKFLOW_CONTRACT.md` prohibits AI attribution in commit messages unless the owner asks for it. The PR #1 body and two thread replies also carry Claude Code lines; the contract names commit messages only, so those are flagged for the owner's preference. | **Not fixed.** Removing the trailers from pushed commits needs a history rewrite and force-push, which is the owner's call. Future commits will omit them. |



---

## 6. Quality gates (re-run 10 November 2026, after the fixes in §5)

**Phase:** GBTD PR correction, plus a vertical slice of the three-arrangement explorer. Scope stops before commit.

**Build:** `npx tsc --noEmit` → exit 0. `npx vite build` → exit 0 (built in 1m 18s; the one warning, an ineffective dynamic import of `registry.ts`, predates this work).

### CONTENT_EVIDENCE_REVIEW — PASS
- Exact text of every new or changed block, caption, label, quiz option and explanation: PASS (§3, generated from source).
- Metadata shown for module and registry: PASS (§3; registry values identical).
- Domain claims listed for human review: PASS (§4, 20 items).
- Placeholders: NOT APPLICABLE (none).
- Deferred content listed: PASS (§8).

### AI_WRITING_REVIEW — PASS
- Em dashes in new copy: PASS (0; the 4 on the page are pre-existing quiz-answer prefixes and one sentence in block 5).
- "Not just / but also", "this matters because": PASS (0).
- Hype words (transformative, unlock, seamless, robust, game-changing, revolutionary, comprehensive, ecosystem): PASS (0).
- Semicolons in new copy: PASS (0).
- Short paragraphs and captions (1–3 sentences): PASS.
- Headings state a concept ("Three ways a deposit moves between banks", "Use case: a conditional marketplace payment"): PASS.
- Named actors and mechanisms: PASS (UK Finance, BRC, Reuters, Quant, Bank of England RTGS, CHAPS, Faster Payments, Bacs).

### PAYMENTS_DLT_ACCURACY_REVIEW — PASS
- Payment message vs money movement: PASS. Traditional step 2: "The message instructs Bank B. It does not carry money." Message pulses are amber and settlement pulses teal.
- Customer posting vs interbank settlement: PASS. Customer credit (step 3) and interbank settlement (step 4) are separate steps in traditional and GBTD modes.
- Scheme processing vs settlement finality: PASS. Traditional step 4 explains CHAPS gross settlement before credit and Faster Payments net settlement after credit.
- DLT shared state vs bank accounting: PASS. "Each token stays a deposit liability of the bank that issued it." Bank liabilities are shown changing at each bank.
- On-ledger finality vs legal settlement finality: PASS. Fragmented and GBTD finality cards, GBTD step 4, callout and Q4.
- GBTD does not claim interbank settlement is eliminated: PASS. The settlement band stays visible and dashed with "Not publicly disclosed". No token travels from Bank A to Bank B; only the instruction moves (pack visual rule).
- Interoperability is not presented as frictionless: PASS. Fragmented mode shows the intermediary, split liquidity and the missing settlement anchor; GBTD interoperability is limited to "within the platform".
- Funding of on-ledger value: PASS. Fragmented step 3 (funds parked per ledger); GBTD liquidity "not disclosed" (U04).
- Old rails shown as live, not obsolete: PASS. Traditional mode is labelled LIVE, and its note says these rails already move deposits at par with legal finality.
- Stablecoin issuer distinctions: NOT APPLICABLE.

### OVERCLAIMING_RISK_REVIEW — PASS
- High-risk phrase scan (replaces, removes the need, eliminates, automatic, instant settlement, equivalent to, is live, is the issuer, all participants, solved, no longer need): PASS (0 hits in new copy).
- Maturity labels: PASS. Traditional LIVE; Fragmented ILLUSTRATIVE (dashed pill); GBTD PILOT.
- Pilot claims attributed and dated ("UK Finance reported…", "September 2026"): PASS.
- Plans separated from results ("Stated plans, not results"; C11 "a plan, not a result"): PASS.
- Settlement design not invented (U04): PASS. The CBDC panel presents BoE synchronisation as a development and says the pilots' arrangement is not public.
- Conventional rails not straw-manned (rule D5): PASS. The traditional note says escrow-style conditions "can be built on them too".
- Source conflict disclosed, not reconciled (rule D1): PASS. Block 1 and the GBTD evidence note.

### PREMIUM_VISUAL_REVIEW — PASS (owner visual sign-off still required)
- One job: PASS. Show, for the same £100 payment, what lets a deposit at one bank become usable at another under each arrangement, and which of interoperability, par, liquidity and finality each arrangement provides.
- Dominant teaching point visible within seconds: PASS. The settlement band changes from solid "Bank of England RTGS" to dashed "No common settlement asset" to dashed "Interbank settlement · not publicly disclosed".
- Labels ≤4 words, banking-specific: PASS (scene labels listed in §3).
- Active vs muted shown by more than colour: PASS. Opacity 0.3, stroke weight 2.2, solid vs dashed bands, ✕ and ? marks, lock and unlock glyphs, status icons with text labels.
- No looping or decorative animation: PASS. Motion runs only on Next, a step pip or Play; Play stops at the last step.
- Mode switch visibly changes the scene: PASS (middle element, bank sub-labels, settlement band and side panel all change).
- No crypto imagery or generic boxes-and-arrows: PASS.
- Compared with the Bank Route Map bar: PASS. Same dark palette and maturity language, a staged sequence, a reduced-motion path and a distinct portrait layout for narrow screens.

### ANIMATION_INTERACTION_REVIEW — PASS
- seqToken cancellation on every mode or step change: PASS (code; rapid-switch test in §7).
- Rapid switching leaves no ghost state: PASS (§7: one visible scene group, pulse hidden, no running animations).
- Reduced motion skips animation and timers: PASS (§7: 0 animations; Play jumps to the final step; use-case Play likewise).
- Keyboard: Enter and Space activate controls; arrow keys move between arrangement tabs; focus outline visible: PASS (§7).
- No autoplay or loop: PASS (§7 Play test).
- Final state understandable without animation: PASS (static captions, property cards and marks).
- Unmount cleanup: PASS. ResizeObserver disconnects and timers cancel when the explorer is removed or re-rendered (§7 route test: one explorer and one chat widget after returning).

### MOBILE_ACCESSIBILITY_REVIEW — PASS
- No horizontal overflow at 320, 390, 768, 1024, 1440, 1920, 2560 or 3440px: PASS (0 of 16 captures) (§7).
- Rendered text ≥11px at 375px and above: PASS (smallest SVG text 11.5px at 768–1024px, 14px at 390px and 11.1px at 320px; smallest HTML text 11px) (§7).
- Tap targets ≥44px: PASS (0 targets under 44px in either explorer) (§7).
- Narrow-screen alternative: PASS. Portrait SVG geometry below 640px of scene width, not a shrunk desktop canvas.
- `aria-pressed` on arrangement tabs, `aria-current` on steps, `role="status"` live region with one announcement per step: PASS (§7).
- Decorative elements hidden from assistive tech: PASS. The pulse and use-case ribbon are `aria-hidden`; the scene SVG has a per-step `aria-label`.
- Colour never the only signal: PASS (see the premium-visual item above).

### INTEGRATION_STALENESS_REVIEW — PASS
- Registry and module metadata identical (title, summary, `updatedAt`, `changeType`, changeSummary, `ready`, `layout`): PASS.
- Stale phase language in GBTD source or docs ("Phase B", "prototype", "not yet published", old title): PASS (grep clean; remaining hits are topic 07/24 content and pre-existing SWIFT comments in `swiftRoleMap.ts`, outside this work).
- `REPO_CONTEXT_INDEX.md` matches the files on disk: PASS.
- This report matches branch state (§1) and working tree (§2): PASS.
- Navigation: the sidebar and category list show the new title from the registry: PASS.


---

## 7. Browser evidence (headless Chrome 157, true device pixels)

Captured by driving the locally installed Chrome over the DevTools protocol against the production build served by `vite preview` (`/topic/gbtd`), with a throwaway browser profile. The dev server was not usable for automated runs: Vite kept reporting "tsconfig changed / vite.config.ts changed" and restarting with full page reloads, although neither file was edited (git shows both unchanged). Screenshots are stored outside the repository, in the session scratchpad (`gbtd-shots/`), and are not committed. "Min text" is the smallest rendered size of visible text in the explorer: SVG text uses its font size times the SVG's on-screen scale.

| Screenshot | Viewport | Scene | Scene width | Min SVG text | Min explorer HTML text | Min use-case text | Horizontal overflow | Targets under 44px |
|---|---|---|---|---|---|---|---|---|
| `01-1920x1080-traditional-overview.png` | 1920x1080 | land | 1060px (×1.262) | 18.9px | 11px | 11px | none | none |
| `02-1920x1080-traditional-step2-in-motion.png` | 1920x1080 | land | 1060px (×1.262) | 18.9px | 11px | 11px | none | none |
| `03-1920x1080-traditional-step4.png` | 1920x1080 | land | 1060px (×1.262) | 18.9px | 11px | 11px | none | none |
| `04-1920x1080-fragmented-step4.png` | 1920x1080 | land | 1060px (×1.262) | 18.9px | 11px | 11px | none | none |
| `05-1920x1080-gbtd-step1-held.png` | 1920x1080 | land | 1060px (×1.262) | 18.9px | 11px | 11px | none | none |
| `06-1920x1080-gbtd-step4.png` | 1920x1080 | land | 1060px (×1.262) | 17.7px | 11px | 11px | none | none |
| `07-2560x1440-gbtd-overview.png` | 2560x1440 | land | 1060px (×1.262) | 18.9px | 11px | 11px | none | none |
| `08-3440x1440-traditional-step4.png` | 3440x1440 | land | 1060px (×1.262) | 18.9px | 11px | 11px | none | none |
| `09-1440x900-fragmented-step2.png` | 1440x900 | land | 1042px (×1.24) | 18.6px | 11px | 11px | none | none |
| `10-1024x768-gbtd-step3.png` | 1024x768 | land | 642px (×0.764) | 11.5px | 11px | 11px | none | none |
| `11-768x1024-traditional-step4.png` | 768x1024 | land | 646px (×0.769) | 11.5px | 11px | 11px | none | none |
| `12-390x844-gbtd-step4.png` | 390x844 | port | 332px (×1.038) | 14px | 11px | 11px | none | none |
| `13-320x640-fragmented-step3.png` | 320x640 | port | 262px (×0.819) | 11.1px | 11px | 11px | none | none |
| `14-1920x1080-usecase-stage3.png` | 1920x1080 | land | 1060px (×1.262) | 18.9px | 11px | 11px | none | none |
| `15-390x844-usecase-stage3.png` | 390x844 | port | 332px (×1.038) | 14px | 11px | 11px | none | none |
| `16-1920-full-page.png` | 1920 | land | 1060px (×1.262) | 18.9px | 11px | 11px | none | none |

### Interaction results

| Test | Result |
|---|---|
| Rapid switching (5 mode switches with step clicks 30–60ms apart) | Ended on `fragmented` / Step 4 of 4; marks `blocked bridge parked unanchored`; pulse opacity 0; pressed tabs false,true,false; visible scene groups 1 (gbm-mode-grp gbm-m-fragmented); running animations 0 |
| Play, GBTD mode | Steps seen: Step 1 of 4 → Step 2 of 4 → Step 3 of 4 → Step 4 of 4; stopped on Step 4 of 4; button reads "▶ Play" (no loop) |
| Keyboard | ArrowRight on tab 1 → mode `fragmented`, focus on tab 1, focus outline `solid`; Space on Next → Step 1 of 4; Enter → Step 2 of 4 |
| Screen-reader live region after Enter | "Step 2 of 4: Workarounds add a counterparty. The payee could accept a Bank A token and take on a claim against a bank they do not use. Or an intermediary could swap the token, adding a counterparty, cost and delay." |
| Ask about this arrangement | Panel open: true; input focused: true; prefilled: "Why can’t a Bank A deposit token simply move onto Bank B’s ledger?" (not sent) |
| ARIA | Tabs group / Arrangements; pip `aria-current` false,false,step,false,false; live region `polite`; SVG label "Fragmented DLT: Workarounds add a counterparty" |
| Route cleanup | On `/topic/deposit-tokens`: wide class false, explorers 0. Back on GBTD: wide class true, explorers 1, use-case explorers 1, chat widgets 1 |
| Links | "Use case" button scrolled the use-case explorer to 0px from the top; topic link navigated to `/topic/deposit-tokens` |
| Reduced motion (emulated) | Next: Step 1 of 4, 0 animations. Play: jumped to Step 4 of 4 (button "▶ Play"), 0 animations. Scene group transition 0s. Use-case Play: Stage 6 of 6 immediately, Stage 6 of 6 after 3s; 0 animations |

Console and network errors during the run (deduplicated): `Failed to load resource: the server responded with a status of 502 (Bad Gateway) http://localhost:5191/api/visits` ×18; `Failed to load resource: the server responded with a status of 404 (Not Found) http://localhost:5191/favicon.ico` ×1. No JavaScript exceptions. The 502s are `/api/visits` with no backend running locally; the 404 is a missing favicon.


---

## 8. Deferred items and decisions for the owner

| # | Item | Why it is not done | What is needed |
|---|---|---|---|
| 1 | Commit the §0 redesign | The workflow contract and the request both stop before commit | Owner approval; suggested message: "Redesign GBTD topic as nine chapters with scene, use-case map and evidence board" (no attribution trailer) |
| 2 | Isolate `a923232` from PR #1 | Every option changes shared state (§1) | Owner choice of option 1, 2 or 3 |
| 3 | Resolve the two Codex threads | Automated resolve was blocked by a permission check | Owner resolves on GitHub, or grants permission |
| 4 | Attribution in pushed commits and the PR body (§5, item 17) | Rewriting pushed history needs a force-push | Owner decision |
| 5 | Stage-aware Gemini answers from server-owned GBTD context | Needs a change to `ChatResource.java` and a server resource (pack contract, phase C). Not approved. | Separate approved phase. Today the chat works as on every other topic: browser-supplied page text, now including the chapters' interactive copy, plus an "Ask about this" prefill on each chapter. |
| 6 | Gemini rate limits and spend controls | Not evidenced in the repository (pack §5) | Operational check before release |
| 7 | Source re-verification | The claim register is a 7 Nov 2026 snapshot; C11 says reverify on build | Owner or domain reviewer checks §4 against current sources |
| 8 | New page title "GBTD tokenised deposits" and summary | The page now covers more than the conditional payment | Owner approval |
| 9 | 16px phone gutter on the wide layout only | Other topics keep 40px; GBTD needs the width for its visuals | Owner approval |
| 10 | Cross-link from topic 21 (Deposit tokens) to GBTD | Would change another topic, which the workflow contract prohibits without approval | Owner approval |
| 11 | Shared-file touches: `chat.ts` (new export and one block case) and the wide-layout rules in `style.css` | The contract asks for shared changes to be approved; both affect only the GBTD page | Owner approval |
| 12 | Real-device check (iOS Safari, Android Chrome) | Evidence is headless desktop Chrome with mobile emulation | Manual check before release |
| 13 | Site-wide chat button pulses indefinitely (`fabPulse`) and floats over page content on phones | Pre-existing on every topic and outside this PR. The premium-visual gate discourages animation that loops without interaction. | Separate site-wide decision |

## 9. Suggested next phase

After approval and commit: isolate the polish commit (option 1), then either phase C (trusted, stage-aware Gemini context, with injection and cost tests) or phase D (remortgage use case and exception branches from the existing transaction model).
