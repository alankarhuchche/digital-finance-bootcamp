# Skill: Release Readiness

## Purpose

Use this skill when assessing whether a phase or a complete page is ready to commit and release. It defines what "ready" means, what evidence is required and how to present the assessment.

---

## What "release ready" means

A phase is release-ready when:

1. The build is clean (`tsc --noEmit` and `vite build` — zero errors, no new warnings).
2. All required quality gates for the phase are PASS (or DEFERRED with documented justification and human approval).
3. The integration staleness check is PASS.
4. No item in the phase completion report is marked OPEN.
5. Human has reviewed the phase completion report.
6. Human has explicitly approved the commit.

A phase is **not** release-ready because:
- You believe the content is good.
- Most gates pass.
- You are confident.

---

## Phase release vs page release

**Phase release:** commit the phase's files after human approval. `ready: false` remains in registry until the final phase.

**Page release:** set `ready: true` in registry. Only after all phases are complete and the full release readiness checklist (`docs/ai-instructions/RELEASE_READINESS_CHECKLIST.md`) is PASS.

---

## How to assess release readiness

Work through `docs/ai-instructions/RELEASE_READINESS_CHECKLIST.md` item by item. For each section:

1. Cite evidence for PASS items (e.g., "build output confirms zero errors", "preview_snapshot confirms caption updates on role switch").
2. For DEFERRED items: state the justification and confirm human approval was given.
3. For FAIL items: stop and report before proceeding.

Do not produce a binary PASS/FAIL without the item-by-item evidence.

---

## What to present to the human

At end of every implementation phase, present:

1. Phase name and scope (planned vs implemented).
2. Files changed — complete list.
3. Files not changed — confirm scope was respected.
4. Build result — exact output cited.
5. Quality gate results — each gate, item-by-item verdict.
6. Issues found — list all (FIXED and OPEN).
7. Corrections applied — what was fixed and how.
8. Deferred items — anything not fixed, with justification.
9. Integration staleness result.
10. Screenshot or DOM verification (for visual phases).
11. Next phase recommendation.
12. Commit readiness — whether ready and why.

If any of these twelve items is missing, the human should ask for it before approving.

---

## Commit mechanics

When human approves commit:

1. Confirm the agreed commit message.
2. Stage only the files in the approved phase. Do not use `git add -A` or `git add .`.
3. Do not stage `.claude/` or any session or planning file not part of the deliverable.
4. Commit using the agreed message.
5. Report the commit hash.
6. Do not push unless separately instructed.

---

## Registry readiness check

Before any commit that touches the registry or module file:

- `id` is unique in registry.
- `number` is correct and not duplicated.
- `title` matches the agreed page title.
- `summary` is accurate and concise.
- `ready` is `false` during development, `true` only at final phase with human approval.
- `updatedAt` is today's date.
- `changeType` is `'new'` for a new page.
- `changeSummary` accurately describes the current state (not a future state).
- Loader path matches the module file name.
- Category placement is correct.

Stale `ready: false` with an inaccurate `changeSummary` is an integration staleness failure, not a minor issue.
