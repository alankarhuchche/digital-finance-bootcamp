# Human Review Protocol

This document defines what the human reviews at each gate point, and what the AI must present before requesting approval.

---

## When human review is required

Human review is required before:

- committing any implementation phase;
- proceeding from planning to implementation;
- adding a new dependency;
- modifying shared infrastructure (render.ts, types.ts, style.css beyond the new component scope);
- publishing or deploying;
- resolving any ambiguity not covered by the workflow contract.

---

## What the AI must present at each review gate

### Phase completion report (required at end of every implementation phase)

The AI must present:

1. **Phase name and scope** — what was planned, what was implemented.
2. **Files changed** — complete list, no omissions.
3. **Files not changed** — confirm scope was respected.
4. **Build result** — `tsc --noEmit` and `vite build` output cited explicitly.
5. **Quality gate results** — each gate with PASS / NEEDS FIX / FAIL verdict and brief rationale, not just a summary table.
6. **Issues found** — list every issue the gates caught.
7. **Corrections applied** — what was fixed and how.
8. **Deferred items** — anything not fixed, with justification.
9. **Integration staleness result** — explicit confirmation from INTEGRATION_STALENESS_REVIEW.
10. **Screenshot or DOM verification** — for visual phases, evidence the visual renders correctly.
11. **Next phase recommendation** — what should happen next.
12. **Commit readiness** — whether the current state is ready to commit and why.

If any item is missing, the human should request it before approving.

---

## What the human checks

### Content review

- Does the opening thesis accurately state the page's core claim?
- Are misconceptions to correct addressed?
- Is the voice consistent with a practitioner reference, not an explainer article?
- Are SWIFT messaging vs settlement distinctions correct throughout?
- Are contingency entry controls accurately represented?
- Does any claim imply SWIFT settles money, moves value or proves finality?
- Does any section contain hype language, vague conclusions or AI rhythm?
- Are security concepts handled at conceptual level without operational detail?

### Visual review

- Does the visual render the correct role modes?
- Does mode switching work cleanly?
- Does the visual avoid implying money moves through SWIFT?
- Is the "money / settlement outside SWIFT" layer clearly separated?
- Does Mode 5 (contingency entry) make the control requirements visible?
- Are muted layers still readable?

### Accuracy review

- Read the page as if you are a senior payments or SWIFT architect.
- Would anything on the page cause embarrassment if shown to a bank's SWIFT team?
- Does any claim need a caveat that is missing?
- Is any claim stronger than the evidence supports?

### Integration check

- Are registry, module metadata and visual plan all consistent?
- Is the visual plan status updated?

---

## Human approval options

After reviewing, the human may:

1. **Approve** — proceed to next phase or commit.
2. **Approve with minor corrections** — list specific items to fix before committing; AI applies corrections and reports back without another full review cycle.
3. **Request full correction** — return to implementation; full review required after corrections.
4. **Change scope** — modify the phase plan; AI re-states the updated scope before continuing.
5. **Defer** — hold the phase; document the state and stop.

---

## Commit approval

Commit only after explicit human instruction. The AI must not infer approval from silence or from a passing gate report alone.

When the human says "commit", the AI:

1. Confirms the commit message is agreed.
2. Stages only the files that are part of the approved phase.
3. Does not stage `.claude/` or other session files.
4. Does not include AI tool attribution, Claude co-author lines, generated-by lines, or model/vendor signatures in the commit message unless the repository owner has explicitly requested them for that commit.
5. Commits.
6. Confirms the commit hash.
7. Does not push unless separately instructed.
