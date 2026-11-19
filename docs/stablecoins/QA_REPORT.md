# Stablecoins rebuild — QA report

Branch `feat/stablecoins-interactive`. Commands run on 19 Nov 2026 unless stated. Independent critic reports: `CRITIC_EDITORIAL.md`, `CRITIC_ENGINEERING.md`; red team: `REDTEAM.md`.

## Automated checks

| Check | Command | Result |
|---|---|---|
| Types | `cd frontend && npx tsc --noEmit` | Pass, 0 errors |
| Model and content tests | `cd frontend && npm test` | 55/55 pass (journey 16, liquidity 12, cross-ledger 11, routes 8, content 8) |
| Production build | `cd frontend && npx vite build` | Pass. Stablecoin scenes ship as a separate on-demand chunk (138.9 kB, 42.1 kB gzip) plus 29.7 kB CSS. Main chunk 209.6 kB vs 207.2 kB baseline. Pre-existing `INEFFECTIVE_DYNAMIC_IMPORT` warning unchanged |
| Backend tests | `cd backend && mvn -q test` | 12/12 pass: `ChatResourceTest` 8, `ChatContextRegistryTest` 4 |
| Chat context drift | part of `npm test` | Pass: committed `stablecoins.json` equals the model's output; key facts match between page and assistant; known-stale phrasings absent from both; one call sends at most 23,158 characters of context |

### Invariants covered by tests

| Mandate invariant | Where tested |
|---|---|
| Monetary conservation across stages | `journey.test.ts` (value + fees = £1,000 at every step, 36 fee settings × 2 objectives); `liquidity.test.ts` (double entry sums to zero, 288 input combinations); `crossLedger.test.ts` (books total 100k in every state) |
| No negative liquidity without labelled credit | `liquidity.test.ts` |
| Debit, reservation and settlement are distinct | `liquidity.test.ts` (ordered postings per paid invoice); `journey.test.ts` (one debit first, one credit last) |
| No double credit on retry | `crossLedger.test.ts` (retry pressed three times at every waiting state, all methods and faults) |
| Bridge completion not claimed before destination finality | `crossLedger.test.ts` |
| Frozen or rejected never successful | `crossLedger.test.ts` (blocked, held, exploited, defaulted); `journey.test.ts` (held and blocked never spendable) |
| Payout complete only when spendable | `journey.test.ts` (token transfer never completes a local-currency payout; spendable only when every step is done) |
| No route rigged | `journey.test.ts` (each route sometimes the one that works, sometimes fails) |
| Chat trust boundary | `ChatResourceTest` (injected page text never reaches the model for curated topics; scene IDs validated; path traversal rejected; 503/502/graceful errors) |

## Browser QA (built-in Chromium pane, dev server)

| Width | Checks | Result |
|---|---|---|
| 1440 | All 10 scenes render; 11 chapters; wide layout; no horizontal scroll | Pass after fix: absolutely positioned screen-reader labels inside the liquidity table escaped their scroll wrapper (wrappers now positioned) |
| 1920 | No horizontal scroll; scenes cap at 1440px, text at 760px | Pass |
| 768 | No horizontal scroll | Pass |
| 390 | No horizontal scroll; vertical track; tap targets ≥ 32px | Pass after fix: long verdict pills in the controls scene now wrap |
| Interactions | Journey stepping, presets, compare view, break-even readout; liquidity presets and time scrubbing; cross-ledger timeout → unknown → safe lookup, "Send it again?" warns without executing | Pass |
| Chat | Scene "Ask" prefills an editable question; request carries `sceneId` and no page text; 503 shows the fallback; other topics still send page text | Pass (fetch stubbed; no paid call) |
| Console | No errors other than pre-existing `POST /api/visits` 502 (backend not running in frontend-only dev) | Pass |

Screenshots: `screenshots/1440-journey-step3.jpg`, `screenshots/1440-compare-dollar-tokens.jpg`, `screenshots/390-journey-step3.jpg`, `screenshots/390-crossledger.jpg`.

## Gate D: independent critics and what was done

Reports: `CRITIC_EDITORIAL.md` (50 claims traced, six acceptance scenarios answered from the product), `CRITIC_ENGINEERING.md`.

| Finding | Severity | Resolution |
|---|---|---|
| Assistant overview could drift from page text | High | Test now checks shared key facts appear on both, and stale phrasings on neither. A single facts module is the better long-term fix (not done) |
| A failed scene chunk aborted the whole topic; fast topic switch could attach this chat to the next page | High | `render.ts`: scene import wrapped with a fallback message; render sequence guard stops stale renders |
| Focus lost on every journey step | High | Focus restored to the same control after each re-render (verified in browser) |
| No deploy gate; Dockerfiles use Node 20 and skip tests | High | **Not changed: needs owner decision** (see PR). Build still works on Node 20; tests need Node 22.6+ |
| Context cache grew on unknown ids | Medium | Only found contexts are cached |
| Double screen-reader announcements; unreachable scroll regions | Medium | One live region per scene; scroll regions focusable with labels |
| Contrast: dim text 2.4:1, control borders 1.6:1, 9.5px labels | Medium | `--sc-dim` 4.6:1; control borders 3.6:1; labels 11px |
| Liquidity test allowed double settlement; cross-ledger retry assertion tautological | Medium | Exactly one debit, reservation and settlement per paid invoice; unpaid never settled; real no-op retry check |
| No rate limit or timeout on chat; 502 detection by substring; 512-token output with a thinking model | Medium | Not changed (pre-existing behaviour); listed as risks in the PR |
| $390bn attributed to the wrong sources; $220bn mislabelled | Editorial | Corrected: McKinsey/Artemis estimate, with the BIS's similar net figure citing Chainalysis and Visa; Chainalysis bar relabelled as attributable transfers, not payments |
| SoFiUSD is issued by SoFi Bank itself | Editorial | Bank-issued stablecoin redefined: bank or bank subsidiary, segregated reserves; examples corrected |
| "About 2%" compared with an all-provider 6.2% | Editorial | Shown with the 3% typical-ramp figure and the 3.0% cheapest-three traditional average |
| "G20 targets will be missed"; alternatives "closing the gap" | Editorial | "Unlikely to be met" (FSB); alternatives "meant to narrow the gap", Nexus not live, no Swift volumes |
| USDC "39 chains"; USDT and Fast Transfer missing | Editorial | 39 incl. two redemption-only, burn-and-mint links 31; USDT relies on third parties (USDT0); Fast Transfer and its allowance explained |
| Draft rules labelled "rule" | Editorial | New "Policy, not yet in force" label for final policy, draft rules, expectations and laws not yet in force |
| Provenance caveats hidden | Editorial | Seven sources now show reader-facing caveats in the source list |
| Controls scenario lacked the bank's role and the "must not make the transfer" rule | Editorial | Added to chapter 7, the controls scene and the assistant context |
| El Salvador a weak test of deposit substitution | Editorial | Qualified on the page, in the lens and in the assistant context |

## Not covered, stated plainly

- **WebKit / iOS Safari**: not tested. Xcode simulator tools are not installed on this machine and no WebKit browser was available. Container queries, `:has()` and native `<details>` are used; all are supported in current Safari, but this is not verified on a device.
- **Reduced motion**: verified by code only. Scenes check `prefers-reduced-motion` in JS (track animation off, slower autoplay) and CSS disables transitions under the media query; the browser pane cannot emulate the preference.
- **Live Gemini call**: not made. No API key is configured locally and the mandate forbids unapproved paid calls. The backend path is covered by unit tests with a fake model.
- **Screen reader**: structure checked (live regions, labelled groups, real tables, native radios); not tested with VoiceOver or NVDA.

## Pre-deploy checks (19 Nov 2026, before merge to main)

Deploy path, as the owner describes it: a Cloud Build trigger on `main` builds `backend/Dockerfile` (frontend build on Node 20, then the Quarkus build) and deploys to Cloud Run. Merging PR #2 therefore deploys to production. `DEPLOY.md` still describes deploys as manual and needs updating.

| Check | Result |
|---|---|
| Packaged backend boots without `GEMINI_API_KEY` | Found and fixed: startup failed with "Failed to load config value ... gemini.api-key" because the key was a plain `String`. It is now `Optional<String>`. After the fix: starts, `/api/health` 200, `/api/chat` 503 as designed |
| Packaged backend boots with a key set | `/api/health` 200. Chat was not called, so no external or paid call was made |
| Backend unit tests | 12/12 after the fix |
| Frontend tests, types and build | 55/55; `tsc` clean; `vite build` passes |
| Docker image built from this commit | Not run: Docker is not installed or running on this machine. The first Cloud Build image will be the first real build |
| Node version in the image | `backend/Dockerfile` uses the floating tag `node:20-alpine`. Vite 8 requires `^20.19.0 \|\| >=22.12.0`. If the image's Node 20 is older, the build fails before deploy and production stays on the current revision |
| Secrets after the triggered deploy | The trigger's deploy step passes no `--set-secrets` or env vars, so it relies on Cloud Run keeping the current revision's settings. Check that `GEMINI_API_KEY` is still mounted after the first triggered deploy |

### INTEGRATION_STALENESS_REVIEW: PASS for the topics changed in this PR, with deferred items

Files checked: `06-stablecoins.ts`, `10-market-sizing.ts`, `11-global-initiatives.ts`, `14-regulation.ts`, `23-stablecoin-market-structure.ts`, `26-gbtd.ts`, `registry.ts`, `frontend/src/content/stablecoins/*`, `frontend/src/viz/stablecoins/*`, `backend/src/main/java/com/dfl/bootcamp/Chat*.java`, `docs/stablecoins/*`.

Searches run: the general staleness grep (two-mode, MVP, Phase 2–5, placeholder, prototype, planned, TODO, not yet approved, to be confirmed) over those files. Each hit was checked. GBTD's "planned" and "Not planned" labels describe real status. "Planned temporary" in the lens is policy wording. The `placeholder` hit is the chat input's HTML attribute. No stale phase language remains.

Metadata consistency: module and registry agree for 06 and 23. For 26 the update date is 19 Nov 2026 in both, and the legal-status correction is noted. 11 had no metadata, so it was added. 14 and 10 carry metadata in the registry only, which is the existing convention for those topics.

Stale language findings: fixed in this pass, from R1 §4. Title V; the MiCA reserve share and authorisation wording; the Hong Kong entry (the sandbox replaced by the 2025 ordinance); the Circle and Tether entities; the FATF DeFi and Travel Rule statements; Basel status; the unsourced SEC claim about Uniswap and Lido, which is removed rather than corrected because it was not verified; the GBTD FCA link and settlement-asset sentence. In 11: the US position on retail CBDCs and the mBridge and Agorá governance. In 23: the Paxos status note.

Page and order findings: the 06 order is unchanged and was checked in source. The strongest-case comparison sits before chapter 1, and the chapters run 1 to 11. These were text-only edits, so the rendered page was not re-screenshotted.

Shared label and sublabel findings: the route station labels were checked against each step's station index for all four routes, with no mismatch. Liquidity and cross-ledger sublabels are unchanged.

Docs and plan consistency: PROGRESS.md, QA_REPORT.md and SOURCES.md are updated to the current state.

Required fixes: none outstanding in the changed topics.

Deferred items: `frontend/src/content/data/rails.ts` and the glossary (mBridge, Agorá, retail CBDC wording); the speed claims ("1–3 business days") and gpi figures in `01-existing-rails.ts`; the deposit-token list in `21-deposit-tokens.ts`, which wrongly includes HSBC Orion and SG-FORGE; and GBTD's "HSBC in six markets" figure, which the research could not support. The first three are outside the text this PR changed. The GBTD figure is inside it, but needs a source before it can be corrected.

Verdict rationale: each changed topic was checked for stale language, metadata agreement, labels and page order. The deferred items are listed above and are not blockers for the changed text.
