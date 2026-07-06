# Claude Workflow Contract

This document defines hard rules for every Claude run in this repo. These rules override general AI assistant defaults. They are not suggestions.

---

## Required actions

Every run that makes implementation changes must:

1. Read repo context before editing any file.
2. State the current phase before making changes.
3. Implement only the scope of the current phase.
4. Run `npx tsc --noEmit` and `npx vite build` after implementation.
5. Run each required quality gate as an explicit item-by-item checklist.
6. Record issues found during gate review.
7. Fix issues before reporting gate results.
8. Produce a phase completion report with evidence.
9. Stop before commit and present the report for human review.

---

## Absolute prohibitions

The following are prohibited in every run, without exception:

### Scope and editing

- Do not make broad, unplanned edits across multiple files.
- Do not refactor shared components, utilities or styles unless explicitly requested and approved in the current phase.
- Do not change unrelated topic pages, navigation, routing, registry or metadata.
- Do not add new npm/pip dependencies unless explicitly justified in writing and approved by the human before implementation.
- Do not change `CLAUDE.md` during an implementation run. Propose CLAUDE.md changes in the report.

### Quality gates

- Do not claim a quality gate PASSED without running the checklist and reporting the result.
- Do not omit a required quality gate and claim overall PASS.
- Do not defer a failing gate item without explicit documented justification.
- Do not report a build as clean without running the build command and citing the result.

### Content accuracy — SWIFT and banking

- Do not write or imply that SWIFT settles money. SWIFT is a messaging network.
- Do not write or imply that an ACK/NACK confirms final settlement.
- Do not write or imply that gpi/UETR proves payment finality.
- Do not write or imply that ISO 20022 / CBPR+ makes payments instant or removes correspondent settlement.
- Do not write or imply that a bank SWIFT gateway is just a send/receive messaging pipe.
- Do not write or imply that contingency entry bypasses controls, approvals, sanctions, accounting or audit evidence.
- Do not write or imply that raw message data is accounting truth, settlement truth or customer-balance truth.
- Do not write or imply that SWIFT manages bank liquidity.
- Do not write or imply that all SWIFT flows are real-time, instant, irrevocable or final.
- Do not imply all SWIFT-connected schemes or participants follow one universal path.

### Security sensitivity

- Do not expose firewall rules, network design specifics, credential patterns or operational runbook detail.
- Do not describe HSM/signing/key-management at implementation level. Explain conceptually only.
- Do not expose SWIFT CSP implementation detail. Reference at architectural concept level only.
- Do not expose bank-specific SWIFT estate configurations or implementation patterns.

### Language and style

- Do not use hype language: transformative, unlock, seamless, game-changing, revolutionary, comprehensive, next-generation, cutting-edge.
- Do not use "not just X, but Y" construction.
- Do not use repeated em dashes for rhythm.
- Do not write generic consultancy conclusions ("as we navigate this evolving landscape").
- Do not animate money tokens moving through SWIFT or imply SWIFT carries value.

### Commit and release

- Do not commit changes without explicit human approval.
- Do not push to remote without explicit human approval.
- Do not mark a phase complete if INTEGRATION_STALENESS_REVIEW has not been run.

---

## Escalation

If you encounter an ambiguity not covered by this contract:

- Stop.
- State the ambiguity.
- Ask the human for a decision before proceeding.

Do not resolve ambiguity by guessing and implementing.
