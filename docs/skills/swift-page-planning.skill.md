# Skill: SWIFT Page Planning

## Purpose

Use this skill when planning or reviewing the structure, content and interaction model of the "Inside a bank SWIFT gateway" page.

---

## Core framing constraint

Every planning decision must be consistent with this thesis:

> The SWIFT estate is where financial messages become controlled, routed, evidenced and reportable bank obligations.

Any section, visual role, layer, chip or caption that does not serve this thesis should be cut or reframed.

---

## What the page must do

1. Correct the "SWIFT is just a messaging pipe" misconception.
2. Show the estate's breadth: channel, scheme connector, transformation, controls, contingency entry, evidence.
3. Separate what SWIFT does (message control and routing) from what it does not do (move money, settle, manage liquidity, prove finality).
4. Make the controls and contingency entry risk implications legible to a non-technical banking stakeholder.
5. Provide raw-material evidence-layer framing so readers understand why message data is not accounting truth.

---

## What the page must not do

- Create a catalogue of every SWIFT message type or every connected scheme.
- Expose security implementation detail at operational level.
- Imply SWIFT is a payment settlement rail.
- Imply any one universal path for all SWIFT flows.
- Use hype language or reduce the subject to marketing claims.

---

## Visual planning

The visual is a role-driven SWIFT estate switchboard. When adding or revising roles:

1. **Check role count.** Six roles are defined. Do not add more without explicit human approval. Adding roles inflates the visual without improving comprehension.
2. **Check layer coverage.** Each role activates a subset of the ten persistent layers. Every layer should be active in at least one role. Layer 10 (`money-settle`) is structurally outside the SWIFT estate and must never be activated as a SWIFT-processed layer — it may be visually referenced as an external dependency or consequence, but it is not a muted version of a SWIFT layer.
3. **Check chip accuracy.** Each chip must be factually accurate and non-misleading. Chips are not labels for exhaustive enumeration — they are representative examples.
4. **Check caption accuracy.** Each caption must be reviewed against the SWIFT_BANKING_ACCURACY_REVIEW gate before implementation. Captions are the highest-visibility accuracy risk.
5. **Check Layer 10 treatment.** Layer 10 (`money-settle`) must always be visually separated and never activated. Verify this at every planning and implementation step.

---

## Interaction model planning

When designing or reviewing the interaction model:

1. The `seqToken` cancellation pattern is required. Do not propose a simpler approach without identifying why cancellation is not needed.
2. The `prefersReducedMotion()` path is required. Every animation must have a synchronous equivalent.
3. `sublabelOverrides` for role-specific layer text must be planned before implementation, not added ad hoc during implementation.
4. Sequence nodes must reflect `mode.sequence` (or equivalent) activation order, not DOM order.

---

## Content planning

When planning content blocks:

1. The opening thesis sentence must appear before any structured block or visual.
2. The misconceptions matrix must cover all eight identified misconceptions.
3. Contingency entry must be its own text block — not merged into the controls section — because the control-preservation requirement is the key accuracy-critical point.
4. The evidence/reporting block must explicitly state raw message data is not accounting truth.
5. The resilience and security block must remain at conceptual level — no operational or implementation detail.
6. Quiz questions must be reviewed against SWIFT_BANKING_ACCURACY_REVIEW before commit.

---

## Module placement

- Module number: 25 (confirm against registry before implementation).
- Category: TODAY'S RAILS, after `existing-rails`.
- Route: `/topic/swift-bank-gateway`.
- `ready: false` during implementation, `ready: true` only at final human approval.
