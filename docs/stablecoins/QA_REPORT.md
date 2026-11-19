# Stablecoins rebuild — QA report

Branch `feat/stablecoins-interactive`. Commands run on 19 Nov 2026 unless stated. Independent critic reports: `CRITIC_EDITORIAL.md`, `CRITIC_ENGINEERING.md`; red team: `REDTEAM.md`.

## Automated checks

| Check | Command | Result |
|---|---|---|
| Types | `cd frontend && npx tsc --noEmit` | Pass, 0 errors |
| Model and content tests | `cd frontend && npm test` | 53/53 pass (journey 16, liquidity 12, cross-ledger 11, routes 8, content 6) |
| Production build | `cd frontend && npx vite build` | Pass. Stablecoin scenes ship as a separate on-demand chunk (137.5 kB, 41.6 kB gzip) plus 29.4 kB CSS. Main chunk 209.1 kB vs 207.2 kB baseline. Pre-existing `INEFFECTIVE_DYNAMIC_IMPORT` warning unchanged |
| Backend tests | `cd backend && mvn -q test` | 12/12 pass: `ChatResourceTest` 8, `ChatContextRegistryTest` 4 |
| Chat context drift | part of `npm test` | Pass: committed `backend/src/main/resources/chat-context/stablecoins.json` equals the model's output |

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

## Not covered, stated plainly

- **WebKit / iOS Safari**: not tested. Xcode simulator tools are not installed on this machine and no WebKit browser was available. Container queries, `:has()` and native `<details>` are used; all are supported in current Safari, but this is not verified on a device.
- **Reduced motion**: verified by code only. Scenes check `prefers-reduced-motion` in JS (track animation off, slower autoplay) and CSS disables transitions under the media query; the browser pane cannot emulate the preference.
- **Live Gemini call**: not made. No API key is configured locally and the mandate forbids unapproved paid calls. The backend path is covered by unit tests with a fake model.
- **Screen reader**: structure checked (live regions, labelled groups, real tables, native radios); not tested with VoiceOver or NVDA.
