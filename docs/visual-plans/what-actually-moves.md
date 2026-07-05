# What Actually Moves? — Implementation Plan

## Status
Phase 0 complete. Phase 1 not yet approved.

## Page identity

**Title:** What actually moves?
**Subtitle:** A simple guide to messages, money, ledgers, settlement and tokenised value.
**Route:** `/topic/what-actually-moves` (to be confirmed at Phase 1)
**Position:** First conceptual page under DLT Basics, before deeper DLT platform, smart-contract, tokenisation or stablecoin topics.
**Audience:** Senior banking, payments, engineering, risk and strategy practitioners.

---

## Core thesis

> Before comparing blockchains, stablecoins or tokenised deposits, ask one simpler question: what actually moves?
>
> A payment message, a customer ledger posting, an interbank settlement movement and an audit trail are not the same thing. DLT can change where state is shared and how finality is recorded, but it does not remove funding, access, accounting, legal finality, reporting or reconciliation.

This thesis must appear verbatim or in refined equivalent form at the top of the page. It must be the first thing a reader sees before any visual or structured section.

---

## What the page must teach

A reader who completes this page should be able to:

1. Distinguish a payment message from a money movement.
2. Distinguish a customer ledger posting from an interbank settlement.
3. Explain why DLT value must be funded unless it already exists on-ledger.
4. Distinguish same-network DLT from cross-network interoperability.
5. Name at least two role-specific obligations a UK bank may carry when providing stablecoin access.
6. State that blockchain finality is not automatically legal settlement finality.
7. State that old rails are modernising, not obsolete.

---

## What the page must not imply

- DLT replaces all bank ledgers.
- Old rails are obsolete.
- Blockchain finality equals legal settlement finality.
- All participants can directly access all ledgers.
- Interoperability is automatic or frictionless.
- A UK bank providing stablecoin access is necessarily the issuer.
- CARF plays the same role as payment scheme reporting.
- DLT removes reconciliation, accounting, custody, reporting or evidence.
- A payment message and money movement are the same thing.

---

## Architecture and market principles

These principles must be respected throughout all phases:

1. Old rails are modernising, not disappearing.
2. Today's payments separate message, ledger posting and settlement movement.
3. Faster Payments is a live immediate UK account-to-account rail.
4. CHAPS/RTGS and SWIFT/CBPR+ are modernising through ISO 20022 and richer structured data.
5. Correspondent banking and nostro/vostro balances remain important for cross-border.
6. Tokenisation is emerging in controlled wholesale, sandbox and prototype contexts.
7. Project Agorá-style ideas explore tokenised commercial bank deposits and tokenised central bank reserves in wholesale settings — not live production infrastructure.
8. DLT is useful in specific settlement and state contexts, not as a universal replacement for bank ledgers.
9. On-ledger value must be funded unless it already exists on-ledger.
10. Same-network DLT is structurally different from cross-network DLT.
11. Interoperability may require bridges, gateways, issuers, custodians, agents, atomic swap mechanisms or common FMI platforms.
12. A UK bank providing access to a USD stablecoin may not be the issuer.
13. Stablecoin activity can create role-specific obligations: custody, access, exchange/conversion, payment facilitation, off-ramp and reporting.
14. CARF/reporting is an additional cryptoasset reporting layer, not the same as payment scheme reporting.
15. Blockchain finality is not automatically legal settlement finality.
16. DLT may reduce some reconciliation gaps inside a network, but it does not remove accounting, evidence or exception handling.

**Required cautious wording throughout:**
- may / can / depends on role
- inside the network
- where value already exists on-ledger
- subject to legal and regulatory treatment
- in controlled / wholesale / sandbox / prototype contexts

---

## Proposed page structure

### 1. Opening thesis
Two to three short sentences. The core message. No jargon. No hedging.

### 2. Animated visual: What actually moves?
One common canvas with shared visible layers. User selects a mode. Same canvas remains; different layers activate and others mute. See Visual Specification below.

### 3. Mode-specific simple explanation cards
Short cards (one or two sentences each) below or beside the visual. Update with mode. Explain what is moving and what is not moving in plain language.

### 4. Common layer glossary
Seven compact definitions. One or two sentences each. Labels match the visual layers exactly.

| Layer | Definition |
|---|---|
| Message | The payment instruction or message that authorises and routes the transaction. Separate from value movement. |
| Ledger posting | The debit or credit recorded in a customer account or bank ledger. Records the change; does not move funds. |
| Settlement asset | The central bank money, scheme settlement balance, or nostro/vostro balance that moves between banks. |
| On-ledger token | A funded digital representation of value on a permissioned or public ledger. Exists as shared state inside the network. |
| Interoperability | The mechanism that connects value or participants across different ledgers or networks. May introduce new intermediaries. |
| Reporting | The regulatory and tax reporting layer, including CARF for cryptoasset activity. Separate from settlement. |
| Evidence | The audit trail, custody record and reconciliation that supports legal, regulatory and accounting obligations. |

### 5. Comparison: what DLT changes / what DLT does not change
Compact two-column matrix. Three to five rows. Concise judgements.

| What DLT can change | What DLT does not remove |
|---|---|
| Where shared state is recorded | Funding requirement for on-ledger value |
| How finality is signalled inside a network | Legal settlement finality assessment |
| How close transfer and evidence can be | Accounting, custody and reporting obligations |
| Number of reconciliation steps inside the network | Exception handling and off-ledger reconciliation |
| Settlement timing within the network | Interoperability cost for cross-network movement |

### 6. Stablecoin role lens
Compact structured section. Not the full stablecoin topic. Shows role-specific obligations for a UK bank.

See Role Lens Specification below.

### 7. Short quiz
Three to four questions testing the key distinctions. Factual recall and application.

Sample questions:
- Which of these is a money movement? (A) a SWIFT MT103 message (B) a customer ledger debit (C) a RTGS settlement (D) a payment scheme acknowledgement
- What must happen before value can be transferred on a DLT network? (A) ISO 20022 migration must be complete (B) value must already exist on-ledger or be funded (C) the recipient must hold a stablecoin wallet (D) legal finality must be assessed
- Which statement about blockchain finality is accurate? (A) it is the same as legal settlement finality (B) it confirms the on-ledger state but not necessarily legal finality (C) it replaces the need for a custodian (D) it applies only to public ledgers

---

## Visual specification

### Canvas concept
One shared canvas. Seven visible layers, always present. Active layers highlight. Inactive layers remain visible but muted (opacity ~0.25–0.35, consistent with Bank Route Map visual grammar).

The visual must not become boxes-and-arrows. It must feel like a layered state diagram — practitioner-grade, not a consulting slide.

### Visual grammar
Consistent with the Bank Route Map quality bar:

| Element | Treatment |
|---|---|
| Message flow | Thin dotted amber line |
| Settlement/value movement | Heavier solid teal line |
| Token/shared-state transition | Solid purple line with shared-state glow |
| Interoperability gateway | Guarded panel with gate indicator |
| Reconciliation / evidence | Check-back line or evidence badge (teal) |
| Exception / repair | Amber repair branch |
| Active layer | Full opacity, labelled |
| Inactive layer | Muted (opacity ~0.3), label visible |
| Mode selector | Pill/tab row, same pattern as Bank Route Map scenario buttons |

Maturity indicators where relevant:
- LIVE: solid amber pill
- MODERNISING: ticked-line pill
- EMERGING: dashed amber pill
- SANDBOX: dotted purple pill

### Canvas layers (always present)

1. **Customer / bank account ledger** — payer and receiver account panels showing debit/credit state
2. **Payment message / instruction** — message line separate from value line
3. **Settlement or intermediary balance layer** — central bank money, scheme settlement, or nostro/vostro panel
4. **Token / shared-state ledger** — permissioned network panel, shared state indicator
5. **Interoperability / access layer** — gateway or bridge panel between networks
6. **Accounting / custody / reporting layer** — custody record, CARF/reporting badge
7. **Reconciliation / evidence / exception layer** — evidence badges, reconciliation check, exception marker

### Modes

**Mode 1: Today's account payment**

Layers that activate:
- Customer/bank account ledger (payer debit, receiver credit)
- Payment message/instruction
- Settlement or intermediary balance (scheme settlement, RTGS, or nostro/vostro)
- Reconciliation/evidence

Layers that remain muted:
- Token/shared-state ledger
- Interoperability/access
- Accounting/custody (visible but not primary)

Teaching point: The customer sees one payment. The bank sees a customer debit, payment message, interbank settlement movement, customer credit, reconciliation and evidence. Money/value between banks moves through settlement accounts, central bank money, scheme settlement or correspondent/nostro-vostro balances — not directly from payer ledger to receiver ledger.

Rail callouts (for label/caption, not as full subnodes):
- Faster Payments: LIVE
- CHAPS/RTGS: MODERNISING
- SWIFT/CBPR+: MODERNISING
- Correspondent: MODERNISING

Simple explanation card: "The customer sees one payment. The bank processes a customer debit, a payment message, an interbank settlement movement, a customer credit, and a reconciliation and evidence trail."

**Mode 2: DLT same network**

Layers that activate:
- Customer/bank account ledger (funding / on-ramp to token)
- Token/shared-state ledger (participant A balance → transfer → participant B balance)
- Accounting/custody/reporting
- Reconciliation/evidence

Layers that remain muted:
- Payment message/instruction (different flow)
- Settlement/intermediary balance (replaced by on-ledger finality)
- Interoperability/access (same network, not needed)

Teaching point: DLT is cleanest when value already exists on-ledger and both participants are in the same network. Transfer and shared state can be recorded together, but funding, permissioning, accounting, custody and evidence still matter. DLT adds a funded on-ledger state — it does not eliminate the bank ledger.

Simple explanation card: "DLT is cleanest when value is already on-ledger and both parties are in the same network. The transfer and shared state move together, but funding, accounting, custody and evidence still apply."

**Mode 3: DLT across networks**

Layers that activate:
- Token/shared-state ledger (Ledger X — participant A)
- Interoperability/access (bridge, gateway, issuer, custodian, agent or common platform)
- Token/shared-state ledger (Ledger Y — recipient)
- Accounting/custody/reporting (both sides)
- Reconciliation/evidence (both sides)

Teaching point: Across ledgers, interoperability becomes the new settlement problem. The intermediary may look like a bridge, gateway, issuer or custodian, but access, liquidity, finality, liability and reconciliation still matter. Interoperability is a control and liability point, not a magic pipe.

Sub-steps to show: source-side lock/burn/redeem/escrow → destination-side mint/release/off-ramp.

Simple explanation card: "Across ledgers, interoperability is the new settlement problem. The gateway or bridge still carries access, liquidity, finality, liability and reconciliation obligations."

**Mode 4: Stablecoin access by UK bank**

Layers that activate:
- Customer/bank account ledger (funding)
- Interoperability/access (on-ramp, bank as custodian/wallet/access provider)
- Token/shared-state ledger (external USD stablecoin issuer/network)
- Accounting/custody/reporting (CARF/reporting badge visible)
- Reconciliation/evidence (redemption/off-ramp, accounting)

Muted layers: Settlement/intermediary balance (depends on structure)

Teaching point: A UK bank providing access to a USD stablecoin may not be the issuer. It may provide custody, access, exchange, wallet or payment services. That adds role-specific controls, issuer dependency, reporting, off-ramp and accounting layers.

CARF/reporting badge must appear in the reporting/evidence layer — not in the settlement movement layer.

Simple explanation card: "A UK bank accessing a USD stablecoin may not be the issuer. It may hold custody, provide wallets, facilitate exchange or handle off-ramp. Each role carries its own controls and reporting obligations."

### Reduced-motion support
Required. When `prefers-reduced-motion: reduce` is active, skip all layer animation and apply final state immediately. All layers remain visible in their active/muted state without choreography.

### Mobile layout
On mobile (≤767px): hide the full canvas. Show a mode-specific vertical strip (same pattern as Bank Route Map mobile strip). Each active layer shown as a labelled node with a short explanation. Arrows connect nodes vertically. Mode selector wraps to two-column grid.

---

## Role lens specification: Stablecoin access by UK bank

This section is compact. It does not duplicate the full stablecoin topic.

| Role | What the bank controls | What it does not control | Key risk/control implication |
|---|---|---|---|
| Issuer | Minting, redemption, reserve management | External stablecoin networks if not the issuer | Reserve composition, legal finality, regulatory capital |
| Custodian / wallet provider | Key management, wallet infrastructure, access | Issuer solvency, network rules | Custody risk, loss of key, wallet liability |
| Distributor / access provider | Customer access, KYC, onboarding | Issuer decisions, network changes | Issuer dependency, distribution controls |
| Exchange / conversion provider | FX rate, conversion, on/off-ramp | Issuer, blockchain network | FX risk, liquidity, slippage, conversion timing |
| Payment facilitator | Routing, payment instruction | Issuer, settlement on the stablecoin network | Payment instruction vs. stablecoin transfer liability |
| Off-ramp / redemption provider | Redemption process, fiat conversion | Issuer willingness to redeem, queue management | Redemption risk, settlement timing, liquidity |
| Reporting entity | CARF and cryptoasset reporting obligations | Whether other parties also report | Duplicate reporting risk, jurisdictional scope |

---

## CARF/reporting treatment

CARF must appear as an additional reporting layer in the stablecoin/cryptoasset access mode only.

State clearly in the page:
- CARF is not a payment settlement mechanism.
- CARF is not the same as payment scheme reporting.
- It may apply depending on the bank's role and the activity type.
- It belongs in the reporting/evidence layer, not the settlement movement layer.

Do not build a CARF explainer. One or two sentences in the layer glossary and a badge in the visual are sufficient.

---

## Old-rail modernisation treatment

The page must acknowledge modernisation without becoming a market report.

Include:
- Faster Payments: live account-to-account rail, immediate, UK domestic.
- CHAPS/RTGS: modernising via ISO 20022, structured data, higher value and urgent payments.
- SWIFT/CBPR+: ISO 20022 migration, richer structured data for cross-border.
- Correspondent banking: still important for cross-border settlement; nostro/vostro balances remain the operating mechanism.
- Old rails remain the default for the vast majority of payment volume even as tokenised models emerge.

Framing: present old rails as modernising infrastructure that DLT sits alongside, not as legacy being replaced.

---

## Phased implementation roadmap

### Phase 0 — Durable plan and quality gates (approved)
Output: `docs/visual-plans/what-actually-moves.md` and `docs/quality-gates/*.md`.
No page implementation.

### Phase 1 — Page skeleton (not yet approved)
Scope:
- Create topic file and register it under DLT Basics.
- Add opening thesis.
- Add seven explanation cards (static, no visual).
- Add comparison matrix (what DLT changes / does not change).
- Add stablecoin role lens table.
- Add short quiz (three to four questions).
- No custom animation.
- No visual canvas.
Quality gates to run: AI_WRITING_REVIEW, PAYMENTS_DLT_ACCURACY_REVIEW, OVERCLAIMING_RISK_REVIEW, MOBILE_ACCESSIBILITY_REVIEW.

### Phase 2 — Visual MVP (not yet approved)
Scope:
- Build custom visual with Mode 1 (today's account payment) and Mode 2 (DLT same network) only.
- Implement common layer canvas.
- Add mode selector (pill/tab row).
- Add mode-specific simple explanation cards below visual.
- Add reduced-motion support.
- Add mobile strip layout.
Quality gates to run: PREMIUM_VISUAL_REVIEW, ANIMATION_INTERACTION_REVIEW, PAYMENTS_DLT_ACCURACY_REVIEW, MOBILE_ACCESSIBILITY_REVIEW, OVERCLAIMING_RISK_REVIEW.

### Phase 3 — QA pass (not yet approved)
Scope:
- Editorial QA: thesis, cards, matrix, quiz.
- Visual QA: canvas, modes 1 and 2, mobile strip, reduced-motion.
- Overclaiming check on all content so far.
- Build and console verification.
Quality gates to run: All six gates.

### Phase 4 — Add DLT across networks (not yet approved)
Scope:
- Add Mode 3 (DLT across networks) to visual.
- Show gateway/issuer/custodian as a control point.
- Update explanation cards and glossary if needed.
Quality gates to run: All six gates.

### Phase 5 — Add stablecoin access mode (not yet approved)
Scope:
- Add Mode 4 (stablecoin access by UK bank).
- Add stablecoin role lens section.
- Add CARF/reporting layer badge.
- Confirm bank is not necessarily issuer in all paths.
Quality gates to run: All six gates.

### Phase 6 — Final integration polish (not yet approved)
Scope:
- Cross-link from DLT Basics, Settlement, Stablecoins and relevant topics.
- Confirm topic ordering and registry metadata.
- Confirm topic grid / recently updated behaviour.
- Final build and full manual QA.
Quality gates to run: All six gates.

---

## Testing and validation checklist

Apply at the end of every phase from Phase 1 onwards:

- [ ] `cd frontend && npx tsc --noEmit` — zero errors
- [ ] `npx vite build` — clean build
- [ ] Desktop visual review at 1280px
- [ ] Mobile visual review at 375px — no horizontal overflow
- [ ] Reduced-motion behaviour: no animation, correct final state
- [ ] No console errors
- [ ] Keyboard/tap accessibility for mode switching
- [ ] No broken topic navigation links
- [ ] No unsupported market or regulatory claims
- [ ] No overclaiming about DLT capabilities
- [ ] No stale page ordering / registry issues
- [ ] All six quality gates considered; applicable gates passed

---

## Final acceptance criteria

The finished page satisfies these criteria:

- A banking reader can explain the difference between message, ledger posting and settlement movement after reading the page.
- The page does not imply DLT replaces all bank ledgers.
- The page shows funding/on-ramp before on-ledger value exists.
- The page distinguishes same-network DLT from cross-network interoperability.
- The page distinguishes stablecoin issuer from custodian/access/provider roles.
- CARF/reporting is shown in the reporting/evidence layer, not the settlement layer.
- Old rails are presented as modernising, not obsolete.
- Blockchain finality is not equated with legal settlement finality.
- Interoperability is shown as a control and liability point, not a magic pipe.
- The visual does not become boxes-and-arrows.
- The page is easy to read on desktop and mobile.
- Reduced-motion is fully supported.
- Build passes with zero errors.

---

## Open questions for future phases

1. **Topic ID and registry slot:** Confirm exact position in DLT Basics category. Currently "DLT & blockchain basics" exists. Should this be a sub-topic within it or a standalone topic at the same level?
2. **Visual component name:** The new visual component will need a distinct name (e.g., `renderWhatMoves` or `renderMovesVisual`). Confirm naming convention at Phase 2.
3. **Layer count on mobile:** Seven layers may be too many for a mobile strip. Determine which three to four layers are essential for each mode's mobile view at Phase 2.
4. **Quiz block type:** Confirm whether to use the existing `quiz` block type or a custom renderer at Phase 1.
5. **Cross-links:** Confirm which existing topics should link to this page and from which section at Phase 6.
6. **Project Agorá currency:** The plan references Project Agorá as wholesale/prototype. Verify current status at Phase 1 before including any claims.
