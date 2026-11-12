# Repo Context Index

Reference this file at the start of any implementation run to locate the files you need.

---

## Project instructions (always read first)

| File | Purpose |
|---|---|
| `CLAUDE.md` | Mandatory project-wide working instructions |
| `docs/ai-instructions/CLAUDE_WORKFLOW_CONTRACT.md` | Hard prohibitions and required actions per run |
| `docs/ai-instructions/AI_DELIVERY_LOOP.md` | Step-by-step delivery process |

---

## Content instructions

| File | Purpose |
|---|---|
| `docs/ai-instructions/CONTENT_STYLE_GUIDE.md` | Voice, tone, source discipline, banking relevance test |
| `docs/ai-instructions/CONTENT_CHANGE_CHECKLIST.md` | Pre/during/post change checklist, metadata rules, duplication check |
| `docs/ai-instructions/VISUAL_EXPERIENCE_GUIDE.md` | Visual quality bar, animation rules, diagram rules, mobile rules |

---

## Quality gates

| File | When to use |
|---|---|
| `docs/quality-gates/CONTENT_EVIDENCE_REVIEW.md` | Any phase that creates or modifies topic content — exposes exact text for human verification |
| `docs/quality-gates/AI_WRITING_REVIEW.md` | Every content phase |
| `docs/quality-gates/PAYMENTS_DLT_ACCURACY_REVIEW.md` | Any content about payment rails, DLT, stablecoins, settlement |
| `docs/quality-gates/SWIFT_BANKING_ACCURACY_REVIEW.md` | All phases of the SWIFT gateway page |
| `docs/quality-gates/OVERCLAIMING_RISK_REVIEW.md` | Every content phase |
| `docs/quality-gates/PREMIUM_VISUAL_REVIEW.md` | Any phase adding or modifying a visual component |
| `docs/quality-gates/ANIMATION_INTERACTION_REVIEW.md` | Any phase adding or modifying animation or mode switching |
| `docs/quality-gates/MOBILE_ACCESSIBILITY_REVIEW.md` | Any phase adding interactive or layout components |
| `docs/quality-gates/INTEGRATION_STALENESS_REVIEW.md` | End of every phase, before recommending commit |

---

## Visual plans

| File | Purpose |
|---|---|
| `docs/visual-plans/what-actually-moves.md` | Reference implementation — layered visual with role modes |
| `docs/visual-plans/swift-bank-gateway.md` | Visual plan for the SWIFT gateway page |

---

## Skills

| File | Purpose |
|---|---|
| `docs/skills/swift-page-planning.skill.md` | How to plan and structure the SWIFT gateway page |
| `docs/skills/visual-experience-design.skill.md` | How to design visuals and interaction models for this site |
| `docs/skills/banking-accuracy-review.skill.md` | How to run banking accuracy reviews |
| `docs/skills/qa-correction-loop.skill.md` | How to run quality gates, record issues and apply corrections |
| `docs/skills/release-readiness.skill.md` | How to assess and confirm release readiness |

---

## Human review and release

| File | Purpose |
|---|---|
| `docs/ai-instructions/HUMAN_REVIEW_PROTOCOL.md` | What the human reviews and what the AI must report |
| `docs/ai-instructions/RELEASE_READINESS_CHECKLIST.md` | Final checklist before commit and release |

---

## Source files — SWIFT gateway page (live as of module 25)

| File | Purpose |
|---|---|
| `frontend/src/content/modules/25-swift-bank-gateway.ts` | Page content module (live) |
| `frontend/src/viz/swiftGatewayVisual.ts` | Visual component (live) |
| `frontend/src/content/registry.ts` | Registry entry live under `swift-bank-gateway` |

---

## Source files — GBTD tokenised deposits page (module 26, `layout: 'wide'`)

| File | Purpose |
|---|---|
| `frontend/src/content/modules/26-gbtd.ts` | Page content module: chapter rail, opening summary, nine chapters (chapter heads, status cards, timelines, callouts, comparison evidence board, limits, quiz, all sources), metadata |
| `frontend/src/data/gbtdStory.ts` | Content for the interactive blocks: "who goes first?" dilemma (`GBTD_HOOK`), six-step scene (`GBTD_SCENE`), use-case atlas (`GBTD_USE_CASES`), with sources |
| `frontend/src/data/gbtdStoryText.ts` | Plain-text versions of those blocks for the chat context (kept apart so the chat bundle doesn't carry the GBTD copy) |
| `frontend/src/viz/gbtdHook.ts` | Chapter 1: two situations × three choices, one-off WAAPI moves, runner that lands on end states under reduced motion |
| `frontend/src/viz/gbtdScene.ts` | Chapter 4: the scene that grows. Wide and compact SVG geometry; scroll-driven (≥900px container) or stepper; seqToken-style cancellation |
| `frontend/src/data/gbtdModel.ts` | Chapter 5 explorer state data (6 success-path stages, pence integers; Sam and Alex) |
| `frontend/src/viz/gbtdExplorer.ts` | Chapter 5: held-payment explorer with balance bars and a "Bank view" panel |
| `frontend/src/viz/chapters.ts`, `statusCards.ts`, `useCaseAtlas.ts` | Reusable blocks: `chapter` and `chapter-nav` (sticky rail), `status-cards`, `usecase-atlas` |
| `frontend/src/chat.ts` | `openChatWithQuestion()` prefill (used by chapter "Ask about this" buttons); chat context text for the new block kinds |
| `frontend/src/content/registry.ts` | Registry entry `gbtd`, New instruments category after `deposit-tokens` |
| `REVIEW_REPORT.md` | Branch state, redesign summary (§0), earlier evidence packet and quality-gate results for the GBTD work |

---

## Reference implementations (read for pattern examples)

| File | Pattern |
|---|---|
| `frontend/src/viz/whatMovesVisual.ts` | Role-mode visual: button switching, seqToken, sublabelOverrides, sequence nodes |
| `frontend/src/content/modules/24-what-actually-moves.ts` | Content module structure: text, visual, stack, matrix, quiz blocks |
| `frontend/src/content/registry.ts` | How to add a module entry and category placement |
| `frontend/src/content/render.ts` | How to register and render a new block kind |
| `frontend/src/content/types.ts` | ContentBlock type — add new kinds here |

---

## Key structural rules (summary)

- Module IDs must be unique. Check `registry.ts` before choosing one.
- Block kinds must be registered in `frontend/src/types.ts` and `frontend/src/content/render.ts`.
- Category placement is set in the `CATEGORIES` array in `registry.ts`.
- The `ready: true` flag makes a topic visible. Set to `false` during development.
- Visual components are plain TypeScript functions — no React or Vue.
- All animation must use the `seqToken` cancellation pattern.
- All animation must have a `prefersReducedMotion()` path.
- `aria-hidden="true"` on all decorative elements.
- Mobile: no horizontal overflow, 44px min tap targets, glyphs may be hidden.
