# Skill: QA Correction Loop

## Purpose

Use this skill when running quality gates, recording issues and applying corrections. It defines the loop structure, how to record issues, how to apply corrections and how to confirm a gate is clear.

---

## Loop structure

```
implement → build → gate-check → record-issues → correct → re-check → report → stop
```

Every phase ends at "stop" — do not proceed to the next phase without explicit human instruction.

---

## Step 1 — Build

Run both commands. Cite the output.

```sh
npx tsc --noEmit
npx vite build
```

- If `tsc --noEmit` fails: fix type errors before running any quality gate.
- If `vite build` fails: fix build errors before running any quality gate.
- Do not claim a build is clean without running these commands and citing the result.

---

## Step 2 — Run gates

Run each required gate as an explicit item-by-item checklist. Do not run a gate by reading the gate name and producing a summary — work through each item.

Required gates per phase are defined in:
- `docs/visual-plans/swift-bank-gateway.md` — Phase-specific gate requirements.
- `docs/ai-instructions/RELEASE_READINESS_CHECKLIST.md` — Final release gates.

For each gate:
1. Work through every checklist item.
2. Mark each item PASS, NEEDS FIX or DEFERRED.
3. For NEEDS FIX: record the exact element, the issue and the proposed correction.
4. For DEFERRED: record the justification. Deferral requires human approval.

---

## Step 3 — Record issues

Use this format for every issue:

```
Issue [N]:
  Gate: [gate name]
  Section: [gate section name]
  Element: [file, function, line or visual element]
  Issue: [what is wrong and why]
  Proposed correction: [exact change]
  Status: OPEN
```

Do not discard issues after correction. Mark them `Status: FIXED` and include in the phase report.

---

## Step 4 — Correct

For each OPEN issue:
1. Apply the correction.
2. Re-run the relevant gate section only — not the full gate unless multiple sections are affected.
3. Mark the issue `Status: FIXED` if the section now passes.
4. If the correction opens a new issue, record it as a new issue — do not edit the original.

---

## Step 5 — Report

Produce the phase completion report (see `docs/ai-instructions/HUMAN_REVIEW_PROTOCOL.md` for required format). Include:

- All issues found (FIXED and any remaining OPEN).
- Gate verdicts after correction (not before).
- Build result cited explicitly.
- Integration staleness result cited explicitly.
- Whether the phase is ready to commit.

---

## What "PASS" means

A gate PASSES when:
- Every item is marked PASS or DEFERRED.
- Every DEFERRED item has documented justification.
- No item is left unmarked.

A gate does not PASS because:
- You believe the content is probably fine.
- Most items pass.
- A previous run passed a similar gate.

---

## Integration staleness check

At the end of every phase, before reporting PASS:

1. Read `docs/quality-gates/INTEGRATION_STALENESS_REVIEW.md`.
2. Check that file header comments, visual plan status, registry metadata and any doc references describe the current implementation state — not a prior phase state.
3. Update stale language before reporting PASS.

This check is mandatory. A phase is not complete without it.
