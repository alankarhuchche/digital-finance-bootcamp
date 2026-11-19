# Stablecoins rebuild — progress log

Mandate: [MANDATE.md](MANDATE.md). Branch: `feat/stablecoins-interactive` (from `origin/main` at `d5e0e65`). Decisions: [EDITORIAL_DECISIONS.md](EDITORIAL_DECISIONS.md). Evidence: [SOURCES.md](SOURCES.md), `research/R1–R5`. QA: [QA_REPORT.md](QA_REPORT.md).

If you are resuming after a context break: read this file, then `EDITORIAL_DECISIONS.md`, then continue from **Next actions**.

## Gate status (19 Nov 2026)

| Gate | Status |
|---|---|
| A — baseline, research, brief, red team | Done. Baseline in the table below. Research R1–R5 written (two rate-limit interruptions, resumed). Brief in `EDITORIAL_DECISIONS.md`; red team in `REDTEAM.md`, findings adopted in the model and copy |
| B — vertical slice | Done: chapter shell, wide layout, Follow £1,000, sources, state tests, chat context, browser QA at 390/768/1280/1440/1920 |
| C — core content and scenes | Done: 11 chapters; scenes: peg, volume, journey, routes, liquidity, cross-ledger, controls, reserve economics, economy lens, scenario checks |
| D — independent acceptance | Editorial/factual and engineering critics running or complete: see `CRITIC_EDITORIAL.md`, `CRITIC_ENGINEERING.md` |
| E — handover | Pending: fix critic findings, commit, push branch, draft PR |

## Baseline (17 Nov 2026, before any change)

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Pass |
| `npx vite build` | Pass, main chunk 207 kB, existing `INEFFECTIVE_DYNAMIC_IMPORT` warning |
| `mvn -q -DskipTests package` | Pass (online) |
| `mvn -q test` | No tests existed |
| `/topic/stablecoins` | 11 blocks, ~7,900 chars, 749px column; `/api/visits` 502 in frontend-only dev |
| WebKit / iOS Simulator | Unavailable on this machine |

## Current results

`npm test` 53/53 · `tsc` clean · `vite build` pass · `mvn test` 12/12. Details in `QA_REPORT.md`.

## What changed (files)

- New model (pure TS, Node-testable): `frontend/src/content/stablecoins/{journey,routes,liquidity,crossLedger,lenses,sources,chatContext}.ts`
- New scenes: `frontend/src/viz/stablecoins/{index,ui,scJourney,scRoutes,scLiquidity,scCrossLedger,scCompact}.ts` + `stablecoins.css` (code-split)
- Page: `frontend/src/content/modules/06-stablecoins.ts` (wide, 11 chapters, `chat: { context: 'server' }`)
- Shared, additive: `sc-scene` block kind (`content/types.ts`, `types.ts`, `render.ts`), `ModuleMeta.chat`, chat widget scene ID + suggestions + `role="log"` (`chat.ts`), two chat-suggestion CSS rules in `style.css`, three term definitions
- Backend: `ChatModel`, `GeminiChatModel`, `ChatContextRegistry`, `ChatPrompt`, rewritten `ChatResource`; `resources/chat-context/stablecoins.json` (generated); tests in `src/test`
- Tooling: `npm test`, `npm run chat-context`; tests in `frontend/tests/stablecoins/`
- Adjacent corrections: `23-stablecoin-market-structure.ts`, `10-market-sizing.ts`, `14-regulation.ts`, `26-gbtd.ts`, `11-global-initiatives.ts`, `registry.ts` metadata

## Next actions

1. Read `CRITIC_EDITORIAL.md` and `CRITIC_ENGINEERING.md`; fix Critical and High findings; re-run `npm test`, `tsc`, `vite build`, `mvn test`, `npm run chat-context` if content changed.
2. Commit on the branch, push `feat/stablecoins-interactive`, open a draft PR. Do not merge or deploy.
3. Owner decisions: see "What needs approval" in the PR description.
