# Integration Staleness Review

## Purpose

Integration Staleness Review catches stale or inconsistent repo state after phased work. It is not a domain accuracy review. It checks whether the surrounding metadata, comments, docs, labels, ordering and registry entries still match the implementation after a change.

This gate exists because phased implementation leaves behind incremental language: stale phase numbers in comments, mode counts that no longer match, changeSummary entries that describe an earlier version, and plan docs that still say "planned" for something already shipped. These do not break the build but they erode trust in the codebase and cause the next agent to work from incorrect context.

---

## When to use

Run this gate:

- After every phased implementation.
- After every visual or content feature expansion.
- After adding or removing modes, scenarios or visual states.
- After changing topic ordering or page block order.
- After changing topic metadata.
- Before declaring a feature complete.
- Before recommending a commit for any phased work.

This gate runs alongside the domain-specific gates (AI_WRITING_REVIEW, PAYMENTS_DLT_ACCURACY_REVIEW, etc.), not instead of them.

---

## Pass criteria

The gate passes only if all of the following are true:

- No stale phase language remains in source files, comments or docs.
- Metadata is consistent across the topic module file and the registry entry.
- `updatedAt`, `changeType` and `changeSummary` match the current implementation.
- File header comments and inline comments match the current implementation.
- Page block order still supports the intended learning journey.
- Shared labels and sublabels still work correctly across all active modes or scenarios.
- Docs and visual plan status do not contradict the implemented state.
- No outdated TODO, placeholder, prototype or temporary language remains unless explicitly deferred.
- Any deferred item is clearly listed in the report.

---

## Fail criteria

The gate fails, or is rated NEEDS FIX, if any of the following are found:

- Old mode count or feature count still referenced — for example, `two-mode` in comments or changeSummary after four modes exist.
- Stale phase language — `Phase 2`, `Phase 3`, `MVP`, `placeholder`, `temporary`, `prototype`, `planned` — in source files, comments or docs, referring to work that is now complete.
- Registry `changeSummary` and topic module `changeSummary` differ without a documented reason.
- `changeType` set to `'new'` in one location and `'expanded'` in another for the same topic.
- `updatedAt` not updated after a meaningful change.
- File header comments describe an earlier version of the implementation.
- Page block order no longer supports the intended learning journey — for example, contextualising content appears after the content it contextualises.
- Shared labels or sublabels are semantically correct for one mode but misleading in another.
- A visual plan or design doc still lists something as `not yet approved` or `planned` when it has been implemented.
- A phase report or QA report says PASS without checking the wider repo state.

---

## Required searches

Run the general staleness search first:

```bash
grep -Rni "two-mode\|three-mode\|MVP\|Phase 2\|Phase 3\|Phase 4\|Phase 5\|placeholder\|temporary\|prototype\|planned\|TODO" docs frontend/src | head -100
```

Then run a feature-specific search adapted to the current work. For the What Actually Moves visual, the relevant search is:

```bash
grep -Rni "What Actually Moves\|What actually moves\|what-moves\|whatMoves\|two-mode\|four-mode" docs frontend/src | head -100
```

These are examples. Adapt the search terms to the feature being reviewed. The principle is: search for the names, numbers and phase language that describe this feature and verify that every occurrence is current.

Also check the plan docs directly:

```bash
grep -Rni "not yet approved\|not yet started\|planned\|to be confirmed" docs/visual-plans | head -50
```

---

## Review checklist

Work through each item explicitly. Do not mark PASS without completing the list.

- [ ] Run the general staleness search. Evaluate every hit.
- [ ] Run the feature-specific search. Evaluate every hit.
- [ ] Check the topic module file: `updatedAt`, `changeType`, `changeSummary`.
- [ ] Check the registry entry for the same topic: `updatedAt`, `changeType`, `changeSummary`.
- [ ] Confirm the module and registry metadata agree.
- [ ] Check all file header comments and inline comments in modified source files.
- [ ] Check visual or component comments describe the current implementation, not an earlier phase.
- [ ] Check page block order against the intended learning journey. State the intended order and verify it matches.
- [ ] Check all shared labels and sublabels: do they work correctly in every mode or scenario, including muted states?
- [ ] Check the visual plan or design doc: does the status still match the implementation?
- [ ] Check any phase reports or QA reports written earlier in the same session: do they use stale phase labels?
- [ ] Check TODOs, open questions and deferred items: are they still deferred, or have they been resolved and left stale?
- [ ] List deferred items explicitly in the report.

---

## Example red flags

**Fail — stale mode count in changeSummary:**
> registry.ts: `changeSummary: 'New concept page with animated two-mode layer canvas.'`
> (after four modes have been added)

**Pass:**
> `changeSummary: 'New concept page with four-mode animated layer visual.'`

---

**Fail — stale file header comment:**
> `// Phase 2: Mode 1 (today's account payment) and Mode 2 (DLT same network).`
> (after Modes 3 and 4 have been added)

**Pass:**
> `// Four modes: Today's account payment · DLT same network · DLT across networks · Stablecoin access.`

---

**Fail — metadata inconsistency:**
> registry.ts: `changeType: 'new'`
> 24-what-actually-moves.ts: `changeType: 'expanded'`
> (same topic, no documented reason for the difference)

**Pass:**
> Both files: `changeType: 'new'` — topic is genuinely new; both entries agree.

---

**Fail — plan doc contradicts implementation:**
> docs/visual-plans/what-actually-moves.md: `Status: Phase 0 complete. Phase 1 not yet approved.`
> (after Phases 1–5 have been implemented)

**Pass:**
> Status updated to reflect current phase, or a note added that the plan was written before implementation.

---

**Fail — page order no longer supports learning journey:**
> Old rails stack appears after the stablecoin role lens.
> (result: old rails reads as an afterthought rather than grounding context)

**Pass:**
> Old rails stack appears before the stablecoin role lens, grounding the reader in the existing infrastructure before introducing the new service model.

---

**Fail — shared sublabel misleading in one mode:**
> Default interop sublabel: `lock / burn / redeem → gateway / issuer / custodian → mint / release / off-ramp`
> Visible in Modes 1 and 2 where interop is muted and this cross-ledger language is not contextually correct.

**Pass:**
> Default interop sublabel: `Gateway, issuer, custodian or access route between networks`
> Mode 3 applies: `lock / burn / redeem → gateway / issuer / custodian → mint / release / off-ramp` via override.
> Mode 4 applies: `custody / wallet / exchange / off-ramp access` via override.

---

## Required report format

Use this exact format when reporting results:

```
INTEGRATION_STALENESS_REVIEW — PASS / NEEDS FIX / FAIL

Files checked:
- ...

Searches run:
- ...

Metadata consistency:
- ...

Stale language findings:
- ...

Page/order findings:
- ...

Shared label/sublabel findings:
- ...

Docs/plan consistency:
- ...

Required fixes:
- ...

Deferred items:
- ...

Verdict rationale:
- ...
```

PASS requires all required fixes to be empty. NEEDS FIX means fixes are identified but the implementation is substantially correct. FAIL means the implementation state is materially inconsistent with the surrounding repo state.
