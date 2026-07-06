# AI Delivery Loop

This document defines the required delivery process for every Claude run that implements or modifies a page in this repo.

Follow this loop exactly. Do not skip steps. Do not reorder steps. Do not combine phases unless the phase plan explicitly allows it.

---

## Step 0 — Read context before touching any file

Read in this order:

1. `CLAUDE.md` — mandatory project instructions
2. `docs/ai-instructions/REPO_CONTEXT_INDEX.md` — locate relevant files
3. The relevant visual plan (e.g. `docs/visual-plans/swift-bank-gateway.md`)
4. The relevant skill files (e.g. `docs/skills/swift-page-planning.skill.md`)
5. The relevant quality gates (see visual plan for the list)
6. `docs/ai-instructions/CLAUDE_WORKFLOW_CONTRACT.md` — prohibited actions

Do not start editing until you have read all of the above.

---

## Step 1 — State the phase

Before making any changes, state:

- Which phase you are implementing.
- Which files you expect to change.
- Which files you will not touch.
- Which quality gates you will run after implementation.

If you cannot state these clearly, you are not ready to begin. Read the visual plan again.

---

## Step 2 — Implement one controlled phase

Implement only the scope defined in the current phase. Do not anticipate or implement later phases.

Rules during implementation:

- Do not change files outside the phase scope.
- Do not refactor shared components unless the phase explicitly requires it and it has been approved.
- Do not add dependencies.
- Do not change routing, navigation or unrelated pages.
- Do not add hype language, vague conclusions or AI-rhythm prose.
- Follow the content style guide and visual experience guide.

---

## Step 3 — Run build checks

After implementation:

```bash
cd frontend
npx tsc --noEmit
npx vite build
```

Report the result. If either fails, fix before proceeding. Do not proceed to quality gates with a failing build.

---

## Step 4 — Run quality gates as explicit checklist reviews

Work through each required quality gate for this phase. Required gates are listed in the visual plan for each phase.

For each gate:

1. State the gate name.
2. Work through the checklist item by item.
3. Report each item as PASS, FAIL or NOT APPLICABLE.
4. If any item FAILS, record it as a required fix.
5. Do not mark a gate PASS if any non-NA item is FAIL.

Minimum gates for every content phase:

- CONTENT_EVIDENCE_REVIEW — mandatory for any phase that creates or modifies topic content (text blocks, stack cards, matrix rows, quiz questions, captions, role labels, placeholder text, metadata). This is not a checklist gate — it is an evidence-generation step. Produce the full evidence packet before running any other content gate. Do not run AI_WRITING_REVIEW or domain accuracy gates until the packet is complete and appears in the report.
- AI_WRITING_REVIEW
- The domain accuracy gate that applies to the page (SWIFT_BANKING_ACCURACY_REVIEW for the SWIFT gateway page; PAYMENTS_DLT_ACCURACY_REVIEW for DLT/stablecoin/tokenised-rail content; both gates if a section compares the two)
- OVERCLAIMING_RISK_REVIEW
- INTEGRATION_STALENESS_REVIEW

Additional gates for visual phases:

- PREMIUM_VISUAL_REVIEW
- ANIMATION_INTERACTION_REVIEW
- MOBILE_ACCESSIBILITY_REVIEW

---

## Step 5 — Record all issues found

Produce a list of issues found during gate review. For each issue:

- Gate that caught it.
- File and location.
- What is wrong.
- What the fix is.

---

## Step 6 — Apply corrections

Fix all required fixes. Re-run the affected gate checklist after fixing.

Do not skip this step. Do not mark gates PASS before fixing.

---

## Step 7 — Produce an evidence report

After corrections are applied and gates are re-run, produce a phase completion report:

1. Phase name.
2. Files changed.
3. Build result.
4. Quality gate results — each gate with PASS / NEEDS FIX / FAIL verdict and brief rationale.
5. Issues found and resolved.
6. Deferred items (if any, with explicit justification).
7. Integration staleness check result.
8. What the next phase should be.

---

## Step 8 — Stop before commit

Do not commit. Do not push. Do not deploy.

Present the report to the human. Wait for approval before proceeding to the next phase or committing.

The human may:

- approve and ask for the next phase;
- approve and commit;
- request corrections before approving;
- change scope.

See `docs/ai-instructions/HUMAN_REVIEW_PROTOCOL.md` for what the human review covers.

---

## Loop exit condition

The loop exits when:

- all planned phases are complete;
- all quality gates pass;
- the release readiness checklist is complete;
- the human has approved commit and release.

See `docs/ai-instructions/RELEASE_READINESS_CHECKLIST.md`.
