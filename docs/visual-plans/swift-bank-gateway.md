# Inside a Bank SWIFT Gateway — Implementation Plan

## Status

Phases 1–7 complete (not yet committed). Operating-map visual shell (chip-board grammar): 3-column desktop layout (entry points · SWIFT secure boundary + control fabric · routing brain + bank destinations), lower row (status/evidence + settlement boundary outside SWIFT estate). Roles 1–5 active with sequence markers and insight panels. Role 6 present as a disabled selector chip; content not yet implemented. Phase 8 (role 6: evidence and archive) not yet started.

Parallel prototype — Phase A complete, Phase A.1 preview wiring complete: new route-map visual (`frontend/src/viz/swiftRoleMap.ts`) created alongside the chip-board visual. Role 1 (Channel and secure access) implemented with BRM grammar: directed source→estate→service-path→destination layout, boundary gates, function core, evidence band, settlement block structurally outside estate. Phase B1 complete: Role 2 (Scheme connector) enabled. Phase B1.5 complete: direction model corrected — bank systems (left) ⇄ SWIFT estate ⇄ external / network side (right). Role 1 = inbound channel; Role 2 = outbound gateway / scheme connector. Direction badge added per role. Phase B2 complete: Role 3 (Routing and transformation) enabled — bidirectional, message/service-family paths (MT payment, ISO 20022 pacs/camt, Trade / securities), direction badge ↔ Bidirectional routing. Phase B3 complete: Role 4 (Controls and repair) enabled — control overlay, control outcome lanes (Validate, Screen, Repair queue, Hold / reject, Release → Disposition state), direction badge ◆ Control overlay. Phase B4 complete: Role 5 (Contingency entry) enabled — controlled contingency entry, control-mandate lanes (Manual intake, Approval check, Sanctions screen, Release / hold, Reconciliation evidence, Retention → Controlled contingency state), direction badge → Controlled contingency. Phase B5 complete: Role 6 (Evidence, archive and reporting) enabled — evidence overlay, evidence/retrieval paths (Message archive, Route decision history, Repair trail, ACK / NACK history, Reporting extract, Investigation pack → Evidence record), all 9 evidence nodes active, direction badge ◼ Evidence overlay. All 6 roles now enabled. Phase C1 (cutover) complete: route-map promoted as live teaching visual — chip-board (`swift-gateway-visual`) removed from the topic page, `swiftGatewayVisual.ts` retained on disk temporarily. Block kind renamed `swift-role-map-preview` → `swift-role-map`. Prototype banner removed. `ready` remains `false` pending final release review.

Route: `/topic/swift-bank-gateway` (confirmed)

---

## 1. Page purpose

Explain how a bank SWIFT estate works — not as a technical gateway but as a controlled financial messaging estate. The page must help architects, engineers and senior banking stakeholders understand the breadth, controls, risks and operating implications of the SWIFT estate, beyond the common misconception of it as a simple send/receive messaging pipe.

---

## 2. Audience

Primary: Architects and engineering leaders in banking, payments and financial market infrastructure.

Secondary: Senior banking stakeholders — operations leads, risk and compliance officers, technology directors — who need to understand the estate without deep protocol knowledge.

The page must be rigorous enough for the primary audience and clear enough for the secondary audience. It must not condescend to either.

---

## 3. Final recommended title

**Inside a bank SWIFT gateway**

Short, concrete, deliberately informal. Signals that the page goes beneath the surface. Does not claim to cover all of SWIFT or all banks.

Alternative if the title needs to reflect estate breadth: **The SWIFT estate: how a bank controls, routes and evidences financial messages**

Recommended: use the short title with a subtitle that carries the thesis.

---

## 4. Core thesis

> The SWIFT estate is where financial messages become controlled, routed, evidenced and reportable bank obligations.

This sentence must appear at or near the top of the page, before any visual or structured section.

Extended thesis (for the opening paragraph):

> A bank SWIFT estate is not just a connection to the SWIFT network. In a large bank it becomes a controlled financial messaging estate: a channel for corporates and financial institutions, a connector to schemes and market infrastructures, a routing and transformation layer, a sanctions and repair orchestration point, a gpi and status processor, a contingency entry route, a secure-zone control surface, and a raw-message evidence source for reporting, reconciliation, audit and legal retention.

---

## 5. Misconceptions to correct

The page must address each of these, explicitly or by clear implication:

1. SWIFT is not only international payments. The SWIFT estate supports domestic scheme connectivity, European services, market-infrastructure messaging, corporate channels and treasury flows.
2. A bank SWIFT gateway is not just a send/receive messaging pipe. It is a controlled, transformation, routing, controls and evidence layer.
3. SWIFT moves secure financial messages; it does not itself move money. Settlement occurs through correspondent banking, RTGS, nostro/vostro accounts, local clearing or market infrastructure.
4. Raw SWIFT message data is powerful evidence, but it is not accounting truth, settlement truth or customer-balance truth. It must be reconciled with ledgers, settlement records and downstream systems.
5. Contingency entry may bypass a failed upstream channel, but it must not bypass controls — approval, entitlement, segregation of duties, sanctions, accounting, settlement, reconciliation, audit evidence and retention all remain.
6. An ACK/NACK confirms network processing status, not final settlement.
7. gpi/UETR/status events are tracking and status evidence, not settlement finality.
8. ISO 20022 / CBPR+ enriches message data; it does not make every payment instant or remove correspondent settlement.

---

## 6. Learning journey

A reader who completes this page should be able to:

1. Explain why the SWIFT estate is a controlled financial messaging layer, not just a pipe.
2. Distinguish the channel/access role from the transformation, controls and evidence roles.
3. State that SWIFT moves messages, not money, and name what does move money.
4. Explain why contingency entry is high-risk without bypassing controls being acceptable.
5. Distinguish ACK/NACK network status from settlement finality.
6. Explain what gpi/UETR tracks and what it does not prove.
7. Explain why raw message data must be reconciled and is not accounting truth.
8. Name at least three things the SWIFT estate does beyond sending and receiving messages.
9. Explain why the estate is protected as a high-impact control surface.

---

## 7. Page structure

### Block order

1. **Opening paragraph** — thesis, one to three sentences. No heading.
2. **Role-driven visual** — SWIFT estate switchboard. The interactive centrepiece.
3. **The six roles of a bank SWIFT estate** — stack block, one card per role, detail on expand.
4. **What SWIFT does not do** — short matrix: common misconceptions in one column, accurate framing in the other.
5. **Controls and the estate as orchestrator** — text block, one to three paragraphs. Focus on the estate as orchestration layer for specialist controls, not the sole owner of every control.
6. **Contingency entry: controlled bypass** — text block. Why bypass must preserve controls. Why this makes the estate high-impact.
7. **Evidence, archive and reporting** — stack or text block. What the estate holds, what it does not prove, why reconciliation is needed.
8. **Resilience and security (conceptual)** — text block. HA, queueing, replay, HSM/signing, CSP, observability — conceptual level only.
9. **Knowledge check** — quiz block, four questions.

---

## 8. Role-driven visual concept

**Name in code:** `swiftGatewayVisual` / block kind `'swift-gateway-visual'`

**Concept:** A SWIFT estate switchboard. The user selects which role the estate is playing. The relevant layers activate in sequence. Role-specific chips appear inside active layers. A caption explains the role and its implications. Muted layers remain visible to show what this role does not involve.

**Key visual principle:** The visual shows the estate's layers as always present. Role selection reveals which layers matter for each function. This teaches both what each role does and what it does not do — the muted layers are part of the lesson.

**Structural reference:** Reuse the interaction pattern from the What Actually Moves visual (`frontend/src/viz/whatMovesVisual.ts`):
- role buttons (equivalent to mode buttons)
- `seqToken` cancellation pattern
- `sublabelOverrides` for role-specific layer text
- flow sequence nodes showing activation order
- `prefersReducedMotion()` path
- `role="status"` caption
- `aria-pressed` on buttons

---

## 9. Visual roles

Six roles, each selectable by button:

### Role 1 — Channel and secure access layer

Active layers: External channel / scheme entry · Secure access and SWIFT boundary · Status, gpi and acknowledgements

Role-specific chips:
- External channel / scheme entry: SCORE · MA-CUG · Secure web access · API channel · Scheme portal
- Secure access and SWIFT boundary: HSM signing · Message authentication · Entitlement · Segregation of duties · CSP boundary

Caption: "Corporates and financial institutions submit messages or requests through controlled channels — SCORE, MA-CUGs, web access or API connectivity. The secure boundary authenticates, signs and entitles before a message enters the estate. SWIFT may provide secure access to external services or portals, but the estate does not manage bank liquidity."

### Role 2 — Scheme and market-infrastructure connector

Active layers: External channel / scheme entry · Secure access and SWIFT boundary · Message classification · Routing, BICs and memberships · Bank backend distribution

Role-specific chips:
- External channel / scheme entry: Cross-border · Domestic scheme · European service · Market infrastructure
- Routing, BICs and memberships: CHAPS · Bacs · TARGET services · SEPA-related · CLS · CREST · NSP
- Bank backend distribution: Payments platform · Treasury · Custody · Operations

Caption: "The SWIFT estate can carry messages to and from a wide range of schemes and market infrastructures — domestic, cross-border and European. Routing depends on BIC memberships, NSP relationships and scheme connectivity. Not all schemes or participants use the same access model. SWIFT is the messaging layer; settlement occurs elsewhere."

### Role 3 — Message-family routing and transformation

Active layers: Secure access and SWIFT boundary · Message classification · Transformation and enrichment · Routing, BICs and memberships · Bank backend distribution

Role-specific chips:
- Message classification: MT 1xx · MT 2xx · MT 3xx · MT 5xx · MT 7xx · MT 9xx · pacs · camt · pain · sese · seev · Files
- Transformation and enrichment: ISO/MT coexistence · UETR · Service codes · Priority · Enrichment · Validation

Caption: "Messages are classified by family, format and purpose. The estate transforms between MT and ISO 20022, assigns UETRs for gpi tracking, applies service codes and priorities, enriches structured fields and routes by BIC and scheme membership. Transformation preserves meaning; it is not a conversion that changes the obligation or the settlement instruction."

### Role 4 — Controls, sanctions and repair orchestrator

Active layers: Secure access and SWIFT boundary · Message classification · Transformation and enrichment · Controls, sanctions and repair · Status, gpi and acknowledgements · Evidence, archive and reporting

Role-specific chips:
- Controls, sanctions and repair: Validation · Duplicate check · Sanctions screening · Financial crime · Repair queue · Release / reject / hold · Priority assignment
- Status, gpi and acknowledgements: gpi event · UETR tracking · Delay notification · ACK / NACK

Caption: "Every message passes through validation, duplicate checks and sanctions and financial crime controls before release. The estate orchestrates specialist control applications — it does not own every control itself. A payment can be stopped, held, repaired, re-routed or rejected. ACK/NACK confirms message processing status, not settlement finality. gpi events update tracking state, not settlement state."

### Role 5 — Contingency entry route

Active layers: External channel / scheme entry · Secure access and SWIFT boundary · Message classification · Controls, sanctions and repair · Routing, BICs and memberships · Bank backend distribution · Evidence, archive and reporting

Role-specific chips:
- External channel / scheme entry: Contingency submission · Operator / treasury entry · Authorised channel
- Controls, sanctions and repair: Approval · Entitlement · Segregation of duties · Sanctions · Repair
- Evidence, archive and reporting: Audit trail · Contingency record · Exception log

Caption: "When upstream channels, payment platforms or workflow tools are impaired, the SWIFT estate can accept controlled contingency payment entry. Contingency may bypass a failed upstream system, but must not bypass approval, entitlement, segregation of duties, sanctions controls, accounting, settlement, reconciliation, audit evidence or retention. This is why the estate is treated as a high-impact, highly protected control surface."

### Role 6 — Evidence, archive and reporting source

Active layers: Controls, sanctions and repair · Status, gpi and acknowledgements · Evidence, archive and reporting

Role-specific chips:
- Evidence, archive and reporting: Inbound/outbound raw messages · ACK/NACK history · Repair history · Sanctions/hold states · Routing decisions · Transformation events · Archive records · Regulatory / scheme queries
- Status, gpi and acknowledgements: gpi tracker · UETR search · Payment status · Delay evidence

Caption: "The SWIFT estate may hold or expose raw inbound and outbound messages, ACK/NACK events, repair history, routing decisions, transformation events, duplicate-check outcomes, sanctions/hold states and archive records. This supports operational MI, audit, investigation, regulatory query, legal archive search and migration analysis. Raw message data is powerful evidence — it is not accounting truth, settlement truth or customer-balance truth. It must be reconciled with ledgers, settlement records and downstream systems."

---

## 10. Persistent visual layers

Ten layers, always rendered, active or muted per role:

| # | Layer ID | Label | Default sublabel |
|---|---|---|---|
| 1 | `channel-entry` | External channel / scheme entry | Corporate, FI, scheme or market infrastructure entry point |
| 2 | `secure-boundary` | Secure access and SWIFT boundary | Authentication, signing, entitlement and CSP boundary |
| 3 | `message-class` | Message classification | MT family, ISO 20022 family or file type |
| 4 | `transform` | Transformation and enrichment | Format, UETR, service codes, priority and structured fields |
| 5 | `controls` | Controls, sanctions and repair | Validation, sanctions screening, repair and release orchestration |
| 6 | `routing` | Routing, BICs and memberships | Scheme, NSP, BIC and membership-based routing |
| 7 | `backend-dist` | Bank backend distribution | Payments platform, treasury, custody and operations |
| 8 | `status-gpi` | Status, gpi and acknowledgements | ACK/NACK, gpi events, UETR tracking and delay notifications |
| 9 | `evidence` | Evidence, archive and reporting | Raw messages, repair history, audit trail and archive |
| 10 | `money-settle` | Money / settlement outside SWIFT | RTGS, nostro/vostro, correspondent banking, local clearing |

**Layer 10 (`money-settle`) rules:**
- Layer 10 is structurally outside the SWIFT estate. It must never appear as a SWIFT-processed layer.
- It may be visually referenced or highlighted as an external dependency or consequence in relevant roles (for example, to show that settlement happens downstream of a SWIFT message), but it is never activated in the same way as SWIFT estate layers.
- Distinct visual treatment required: dashed border or distinct background pattern to make its out-of-estate status unambiguous.
- No glyph, chip or animation should imply money flows through SWIFT layers.
- This layer is not a muted version of a SWIFT layer — it is a structurally different element.

---

## 11. Suggested content blocks

```typescript
[
  { kind: 'text', body: '...' },           // Opening thesis paragraph
  { kind: 'swift-gateway-visual' },        // Interactive role switchboard
  { kind: 'stack', heading: 'The six roles of a bank SWIFT estate', data: [...] },
  { kind: 'matrix', heading: 'What SWIFT does and does not do', data: {...} },
  { kind: 'text', body: '...' },           // Controls as orchestrator
  { kind: 'text', body: '...' },           // Contingency entry
  { kind: 'text', body: '...' },           // Evidence, archive and reporting
  { kind: 'text', body: '...' },           // Resilience and security (conceptual)
  { kind: 'quiz', heading: 'Check your understanding', data: {...} },
]
```

---

## 12. Interaction model

- Six role buttons in a wrapped flex row (same pattern as What Actually Moves mode buttons).
- Clicking a role: reset all layers to muted, apply role's active layers in sequence, update sublabels, update caption, update sequence nodes, update `aria-pressed`.
- Sequence nodes: numbered ① to however many layers are active in the role, showing activation order.
- Caption: `role="status"`, updates per role.
- `seqToken` cancellation: same pattern as `whatMovesVisual.ts`.
- `sublabelOverrides`: role-specific sublabels for active layers.
- `prefersReducedMotion()`: apply final state immediately, no animation.
- Layer 10 (`money-settle`): always at distinct muted/separated state, never fully active.

---

## 13. Mobile behaviour

- Role buttons: `flex: 1 1 140px; flex-wrap: wrap; min-height: 44px`. Six buttons should wrap to a 2×3 or 3×2 grid at 375px.
- Layer glyphs: `display: none` on mobile (same as What Actually Moves).
- Sequence nodes: scale to 16px at mobile, remain readable.
- No horizontal overflow at 375px.
- Sublabels: `overflow-wrap: break-word; word-break: break-word`.
- Layer 10 (`money-settle`): remains visible and readable on mobile.

---

## 14. Accessibility considerations

- `role="group"` with `aria-label="SWIFT estate roles"` on button row.
- `aria-pressed="true/false"` on each role button, updated on switch.
- `role="status"` on caption element.
- `aria-label="SWIFT estate layers"` on layers container.
- `aria-hidden="true"` on all decorative glyphs and sequence node elements.
- Keyboard: Enter and Space activate role buttons.
- `:focus-visible` ring on all interactive elements.
- Reduced-motion: all animation suppressed, final state applied synchronously.
- Non-colour distinction for active vs muted: opacity (`1` vs `0.22`) and left border.

---

## 15. Accuracy risks

These risks must be checked by `SWIFT_BANKING_ACCURACY_REVIEW.md` at every phase:

1. **Settlement overclaim** — any visual or text implying SWIFT moves money or settles value.
2. **ACK/NACK finality** — implying ACK means the payment has settled.
3. **gpi overclaim** — implying gpi tracker status proves finality or irrevocability.
4. **ISO 20022 / CBPR+ overclaim** — implying richer data makes payments instant or removes correspondent settlement.
5. **Contingency bypass** — implying contingency entry removes the need for controls.
6. **Liquidity conflation** — implying SWIFT manages bank liquidity rather than providing secure access to liquidity-related services.
7. **Reporting truth** — implying raw message data is accounting truth or settlement truth.
8. **Security exposure** — describing HSM, CSP, signing or network security at implementation level.
9. **Universal path** — implying all SWIFT flows or all schemes follow the same model.
10. **Scheme status** — implying a scheme connectivity example is live or universal where it is not.

---

## 16. Visual anti-patterns

The visual must not:

- Animate money tokens, coins or value flowing through SWIFT layers.
- Show arrows labelled "money moves" or "funds transfer" within the SWIFT estate.
- Use blockchain/crypto imagery (chains, tokens, nodes as coins).
- Reduce the estate to a simple send/receive pipe diagram.
- Create a catalogue of every SWIFT message type or every connected scheme.
- Look like a generic boxes-and-arrows architecture diagram.
- Use long label text (labels must be ≤4 words on the layer row, chips can be slightly longer).
- Loop any animation without user interaction.
- Use heavy animation, neon colours or crypto-style effects.
- Show Layer 10 (money/settlement) as active or as part of the SWIFT estate.
- Imply all ten layers are always active simultaneously.

---

## 17. Implementation phases

### Phase 0 — Planning and harness (complete)

Deliverables: this plan, quality gates, delivery instructions, skills files. No implementation.

### Phase 1 — Page skeleton and registry only

Scope:
- Create `frontend/src/content/modules/25-swift-bank-gateway.ts` with `ready: false` and an empty blocks array.
- Add registry entry to `registry.ts` with correct `id`, `number`, `title`, `summary`, `ready: false`.
- Add to `CATEGORIES` under "Today's rails" after `existing-rails` (or confirm best position).
- Add loader to `LOADERS` in `registry.ts`.
- No content blocks yet. Type-check and build must pass.

Quality gates: CONTENT_EVIDENCE_REVIEW, AI_WRITING_REVIEW, SWIFT_BANKING_ACCURACY_REVIEW, INTEGRATION_STALENESS_REVIEW.

### Phase 2 — Static content blocks, no visual

Scope:
- Add all text blocks, stack blocks, matrix block and quiz block to the module file.
- No visual component yet. Visual block placeholder as `{ kind: 'text', body: '[Visual to follow]' }`.
- All content must pass all relevant quality gates before Phase 3 begins.

Quality gates: CONTENT_EVIDENCE_REVIEW, AI_WRITING_REVIEW, SWIFT_BANKING_ACCURACY_REVIEW, OVERCLAIMING_RISK_REVIEW, INTEGRATION_STALENESS_REVIEW.

### Phase 3 — Visual shell and role 1 only

Scope:
- Create `frontend/src/viz/swiftGatewayVisual.ts` with the ten-layer structure and role 1 (channel and secure access) only.
- Register `'swift-gateway-visual'` block kind in `frontend/src/types.ts` and `frontend/src/content/render.ts`.
- Add required CSS to `frontend/src/style.css`.
- Layer 10 (`money-settle`) must be present from the start, structurally outside the SWIFT estate — visually separated with a dashed border or distinct background. It must never be activated as a SWIFT-processed layer.
- `seqToken` cancellation, `prefersReducedMotion()` path, sequence nodes, `sublabelOverrides` all required from the start.
- Replace the placeholder text block with `{ kind: 'swift-gateway-visual' }`.

Quality gates: CONTENT_EVIDENCE_REVIEW, PREMIUM_VISUAL_REVIEW, ANIMATION_INTERACTION_REVIEW, MOBILE_ACCESSIBILITY_REVIEW, SWIFT_BANKING_ACCURACY_REVIEW, INTEGRATION_STALENESS_REVIEW.

### Phase 4 — Add role 2: scheme and market-infrastructure connector

Scope:
- Add role 2 to `swiftGatewayVisual.ts`.
- Verify all cancellation, reduced-motion and accessibility requirements from Phase 3 remain intact.
- Verify Layer 10 treatment unchanged.

Quality gates: CONTENT_EVIDENCE_REVIEW, PREMIUM_VISUAL_REVIEW, ANIMATION_INTERACTION_REVIEW, MOBILE_ACCESSIBILITY_REVIEW, SWIFT_BANKING_ACCURACY_REVIEW, INTEGRATION_STALENESS_REVIEW.

### Phase 5 — Add role 3: message-family routing and transformation

Scope:
- Add role 3 to `swiftGatewayVisual.ts`.
- Verify all prior requirements remain intact.

Quality gates: CONTENT_EVIDENCE_REVIEW, PREMIUM_VISUAL_REVIEW, SWIFT_BANKING_ACCURACY_REVIEW, INTEGRATION_STALENESS_REVIEW.

### Phase 6 — Add role 4: controls, sanctions and repair

Scope:
- Add role 4 to `swiftGatewayVisual.ts`.
- Chips and sublabels must make clear the estate orchestrates controls, not owns all controls.
- gpi/ACK caption must be accurate: tracking state, not settlement state.

Quality gates: CONTENT_EVIDENCE_REVIEW, PREMIUM_VISUAL_REVIEW, SWIFT_BANKING_ACCURACY_REVIEW, OVERCLAIMING_RISK_REVIEW, INTEGRATION_STALENESS_REVIEW.

### Phase 7 — Add role 5: contingency entry route

Scope:
- Add role 5 to `swiftGatewayVisual.ts`.
- Chips and sublabels must explicitly reference approval, entitlement, segregation of duties and sanctions.
- Caption must state contingency bypasses a failed upstream system, not controls.
- This is the highest accuracy-risk role. Review caption against SWIFT_BANKING_ACCURACY_REVIEW section 6 before marking PASS.

Quality gates: CONTENT_EVIDENCE_REVIEW, PREMIUM_VISUAL_REVIEW, SWIFT_BANKING_ACCURACY_REVIEW, OVERCLAIMING_RISK_REVIEW, INTEGRATION_STALENESS_REVIEW.

### Phase 8 — Add role 6: evidence, archive and reporting

Scope:
- Add role 6 to `swiftGatewayVisual.ts`.
- Caption must state raw message data is evidence, not accounting truth or settlement truth.
- Reconciliation requirement must be reflected.

Quality gates: CONTENT_EVIDENCE_REVIEW, PREMIUM_VISUAL_REVIEW, SWIFT_BANKING_ACCURACY_REVIEW, INTEGRATION_STALENESS_REVIEW.

### Phase 9 — Premium visual, mobile, accessibility and interaction polish

Scope:
- Review all six roles end-to-end: chip quality, sublabel accuracy, caption accuracy.
- Confirm Layer 10 visual treatment is correct and consistent across all role states.
- Mobile verification at 375px: button layout, no overflow, sequence node legibility.
- Accessibility verification: aria-pressed, role="status", aria-hidden, focus rings, keyboard navigation.
- Rapid mode-switch test: 4 clicks at <200ms, no ghost state.

Quality gates: CONTENT_EVIDENCE_REVIEW, PREMIUM_VISUAL_REVIEW, ANIMATION_INTERACTION_REVIEW, MOBILE_ACCESSIBILITY_REVIEW, SWIFT_BANKING_ACCURACY_REVIEW, OVERCLAIMING_RISK_REVIEW, INTEGRATION_STALENESS_REVIEW.

### Phase 10 — Final integration staleness and release readiness

Scope:
- Run full release readiness checklist (`docs/ai-instructions/RELEASE_READINESS_CHECKLIST.md`).
- Set `ready: true` in registry entry.
- Confirm all file header comments, visual plan status, registry metadata and doc references describe the final implementation state.
- Present complete 12-point phase completion report for human sign-off.

Quality gates: All gates including CONTENT_EVIDENCE_REVIEW and INTEGRATION_STALENESS_REVIEW mandatory.

---

## 18. Quality gates to run

Required at every phase that adds or changes content (all phases for this page):
- `docs/quality-gates/CONTENT_EVIDENCE_REVIEW.md`
- `docs/quality-gates/AI_WRITING_REVIEW.md`
- `docs/quality-gates/SWIFT_BANKING_ACCURACY_REVIEW.md`
- `docs/quality-gates/INTEGRATION_STALENESS_REVIEW.md`

Required at content phases (2 and above):
- `docs/quality-gates/OVERCLAIMING_RISK_REVIEW.md`

Required at visual phases (3 through 10):
- `docs/quality-gates/PREMIUM_VISUAL_REVIEW.md`

Required at visual shell and polish phases (3, 9, 10):
- `docs/quality-gates/ANIMATION_INTERACTION_REVIEW.md`
- `docs/quality-gates/MOBILE_ACCESSIBILITY_REVIEW.md`

Note: PAYMENTS_DLT_ACCURACY_REVIEW is not required for this page unless a future section explicitly compares SWIFT with DLT, stablecoin or tokenised rails.
