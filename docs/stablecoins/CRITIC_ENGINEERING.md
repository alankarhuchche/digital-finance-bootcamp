# Engineering / QA critique: feat/stablecoins-interactive

No browser used, so layout and contrast findings come from CSS and arithmetic. Tags: [Certain] read in code
or run; [Likely] strong inference; [Guessing] unverified.

## 1. Command results

| Command | Result |
|---|---|
| `npx tsc --noEmit` (frontend) | No output, exit 0 |
| `npm test` (frontend) | 53 tests, 53 pass, 0 fail, 266 ms, Node v26.0.0 |
| `npx vite build` (frontend) | Built in 122 ms. One warning, INEFFECTIVE_DYNAMIC_IMPORT for registry.ts (not from this diff [Likely]) |
| `mvn test` (backend) | 12 tests (ChatContextRegistryTest 4, ChatResourceTest 8), 0 failures, BUILD SUCCESS. The logged "Chat model call failed: RuntimeException" line comes from the graceful-failure test |

Chunks [Certain]: scenes are a separate lazy chunk, `stablecoins-*.js` 137.73 kB (41.67 gzip) plus
`stablecoins-*.css` 29.59 kB (6.05 gzip). `06-stablecoins` page chunk 28.32 kB (11.17 gzip). Main `index-*.js`
209.45 kB (58.55 gzip), `index-*.css` 101.52 kB. Passing tests are weaker evidence than they look (section 5).

## 2. Findings summary

| # | Sev | Area | Issue |
|---|---|---|---|
| F1 | High | Drift | Hand-written 10.7k-char OVERVIEW is not tied to the page; the drift test guards the wrong thing |
| F2 | High | Deploy | No test runs in the build; Docker uses Node 20; new files are untracked |
| F3 | High | render.ts | Awaited chunk import: no error handling, no stale-render guard |
| F4 | High | a11y | Journey destroys the focused button on every step |
| F5 | Medium | Backend | Unbounded cache keyed by attacker-chosen ids |
| F6 | Medium | Backend | No auth, rate limit or timeout; about 6k input tokens per question |
| F7 | Medium | Backend | `maxOutputTokens(512)` may be eaten by thinking tokens |
| F8 | Medium | Tests | Liquidity "paid exactly once" is not asserted |
| F9 | Medium | Tests | Cross-ledger invariants are true by construction |
| F10 | Medium | a11y | Contrast: control borders 1.6:1, `--sc-dim` text 2.4:1 |
| F11 | Medium | a11y | Double screen-reader announcements |
| F12 | Medium | a11y | Horizontal scroll regions not keyboard-reachable |
| F13 | Low | misc | Section 7 |

## 3. Detail

### F1 High: chat context can drift from the page
[Certain] `frontend/src/content/stablecoins/chatContext.ts:21` is a literal of hand-written prose, written
separately from `modules/06-stablecoins.ts`. Only the scene text is generated from models. The header comment
("can't drift from the page") and the Java javadoc ("cannot drift apart") are untrue for the overview, which
the model relies on most.

`tests/stablecoins/content.test.ts:15` only checks the committed JSON equals `buildChatContext()`: it catches
"edited chatContext.ts but did not run `npm run chat-context`", nothing else. Test 3 (line 30) asserts eight
literals appear in the overview itself, not that they match the page. Evidence: `312.9` and `61%` are in the
overview and in `viz/stablecoins/scCompact.ts:278` but 0 times in 06-stablecoins.ts, so a figure is copied by
hand into three places.

Scenario: a later edit moves a date or supply figure in 06-stablecoins.ts and lenses.ts. All 53 tests pass; the
assistant keeps the old figure under a "written and checked by the site" label (`ChatPrompt.java:34`).
Fix: one typed `FACTS` object imported by page, scenes and OVERVIEW; a test that walks the 06 blocks and fails
if a date/number token is missing from OVERVIEW (or an explicit allowlist); assert `AS_OF` equals the max
source `checked` date. Also `content.test.ts:36` hard-codes `^2026-11-1\d$`, so the first source re-checked
after 19 Nov fails the suite and forces a regex edit instead of a content review.

### F2 High: nothing gates a deploy on tests or regeneration
[Certain] `Dockerfile:4` and `backend/Dockerfile:4` use `node:20-alpine`, build with `npm run build`
(tsc + vite), and `mvn package -DskipTests`. `cloudbuild.yaml` has no test step; there is no `.github`.
So the drift test, 12 Java tests and 53 Node tests never gate a release.
[Likely] `npm test` (quoted glob) and `npm run chat-context` (runs a .ts file directly) need Node 22+ with type
stripping; they fail on Node 20, so adding them to the Docker stage as-is breaks the build. `package.json` has
no `engines`; no `.nvmrc`. `tsconfig.json` has `"include": ["src"]`, so tests and scripts are never type-checked.
[Certain] `backend/src/main/resources/chat-context/stablecoins.json`, `backend/src/test/` and `frontend/tests/`
are untracked. If one is missed in the commit, production has no curated context: `moduleContent` is `''` for
this topic (chat.ts), so every answer is "That isn't covered on this page", and no test notices.
Fix: `engines: node >=22.18`, Node 22 build image, CI running `npm test`, `npm run chat-context && git diff
--exit-code`, and `mvn test`; have the backend return 503 when a topic requests server context but none exists.

### F3 High: scene-chunk failure kills the topic; stale renders corrupt the next page
[Certain] In `content/render.ts` the new `sc-scene` case does `await import('../viz/stablecoins/index')` inside
the sequential render loop, with no try/catch.
1. A 404 on the hashed chunk (visitor holding an old index.html after a Cloud Run redeploy) rejects
   `renderModule`: later chapters, topic nav, chat widget and complete button never render, and
   `main.ts:190` then throws on `querySelector('#backBtn')!`. Fix: catch per block, render a retry message.
2. [Likely] `main.ts:openTopic` has no navigation token. The first visit now awaits a network fetch mid-loop. If
   the reader clicks another topic in that window, the old render resumes, appends nav, and calls
   `renderChatWidget` for stablecoins, which calls `destroyChatWidget()` and replaces the new topic's chat. Topic
   B questions are then sent as `moduleId: 'stablecoins'`. Fix: render token checked after every await.

### F4 High (a11y): focus lost on every step of "Follow £1,000"
[Certain] `scJourney.ts` `render()` does `stage.innerHTML = ...`. Enter/Space on Next, Back or Restart calls
`go()` -> `render()`, removing the focused button, so focus drops to `<body>`. Only the ArrowLeft/Right handler
re-focuses. Keyboard and switch users must tab from the top of the page after each of about 8 steps. Same class:
checks "Try again" (`scCompact.ts`) and cross-ledger Next when it becomes disabled while focused.
Fix: remember the activated button's `data-act`, re-focus the new node after render, or update in place.

### F5 Medium: unbounded cache
[Certain] `ChatContextRegistry.java:44` `cache.computeIfAbsent` stores `Optional.empty()` for every distinct id
matching `^[a-z0-9-]{1,60}$`. An unauthenticated caller can grow the map without limit; each miss also does a
classpath lookup. Fix: cache hits only, or preload the known files into an immutable map at startup.
Path traversal is correctly blocked (regex has no `.` or `/`; tests cover `../`, `/`, uppercase, empty, null).

### F6 Medium: cost and abuse
[Certain] No auth, rate limit, per-IP cap or HTTP timeout (`GeminiChatModel.generate`); a slow upstream holds a
worker thread. Largest curated call is 23,158 characters (overview 10,751 + sources 5,659 + `routes` scene 6,748),
about 6k tokens per question, with 840 characters of headroom under the 24,000 test cap (next edit fails two tests).
[Likely] `ChatPrompt.curated` puts the scene before the overview, so the stable prefix differs per scene and
implicit caching sees 10 prefixes. Put overview and sources first, scene last (or in `systemInstruction`).
[Certain, pre-existing] Non-curated topics send `moduleContent` with no body cap before truncation to 10,000.
Fix: token bucket per IP, a client timeout, a spend alert.

### F7 Medium [Guessing]: truncated answers
`GeminiChatModel.java:50` `maxOutputTokens(512)` on gemini-2.5-flash: thinking tokens can share that budget, so
`response.text()` may be empty or clipped, surfacing as "No response generated." with HTTP 200. Needs a paid
call to confirm. Fix: set a thinking budget, raise the cap to about 800, log `finishReason` only.

### F8 Medium: liquidity tests permit double payment
[Certain] `liquidity.test.ts`: the "debit, reservation and settlement" test uses `findIndex` (first match), so a
second settlement posting is invisible; "nothing reaches suppliers" compares only totals, so one invoice paid
twice offset by one unpaid invoice passes. Missing: per payment exactly one debit, one reserve, one settle;
settle amount equals invoice amount; reserved balance returns to zero; credit never drawn when float suffices.
The credit label is only a memo regex, not a check that the UI shows the credit bar.

### F9 Medium: cross-ledger invariants are tautological
[Certain] `buildScript` returns hand-authored states; `next` and `retry` only add 1 to the index. "No double
credit on retry" is true by construction, and `retry(retry(once)).index >= once.index` (test line 25) can never
fail. Gaps: no check that `books.delivered > 0` implies `recipientTotal(chains) == books.delivered` in the same
state; none that a wrapped-token outcome never sets `delivered`; no non-negative check on chains or books; no
reorg ordering check (Chain B value only after Chain A final); journey conservation calls
`traceValue(r, f, { objective })` with partial conditions only. UI code, timers, focus and chat wiring have zero
tests, so F3, F4 and F11 are untested.

### F10 Medium (a11y): contrast on the dark theme
Computed from `style.css:3-13` and `stablecoins.css:6-17`: `--sc-dim` (42% alpha over `--ink`) is 2.42:1, used for
text in `.sc-pill--not-reached` (fails 4.5:1). `--grid` `#244a6e` is 1.59:1 on `--ink` and 1.46:1 on `--sc-panel`;
it is the only visible boundary of `.sc-route-btn`, `.sc-chip`, `.sc-btn`, `.sc-seg-options` (fails 3:1, WCAG
1.4.11). Passing: text-dim on panel 6.47:1, derived basis 5.84:1, held 5.14:1, `.is-other` at opacity .55 4.96:1.
`.sc-basis` is 9.5px and `.sc-tag` 10px. Fix: control borders about `rgba(159,183,204,.55)`, use `--text-dim`
for text, 11px minimum.

### F11 Medium (a11y): double announcements
[Certain] `scRoutes.ts` sets `aria-live="polite"` on `[data-results]` (whole innerHTML replaced each change) and
also calls `announce()`. `scCompact.ts` controls: `[data-verdict] aria-live` plus `announce()`. Journey Play
announces every 2.4 s. Fix: one `data-live` region per scene; remove `aria-live` from re-rendered containers.

### F12 Medium (a11y): unreachable scroll regions
[Certain] `.sc-liq-grid-wrap` (`stablecoins.css:309`) and `.sc-ctl-phases` (`:455`) scroll horizontally (tables
min-width 520 and 620 px) with no `tabindex="0"`/`role="region"`, so keyboard users cannot scroll them at 390 px.
`.sc-rsv-wrap` does it correctly. Other 390 px layouts look sound on paper (`.sc-seg-grid` minmax 230px; five
`.sc-phases` columns at 56 px) [Likely], but I did not render them.

## 4. Other topics, chat and backend trust boundary

Regressions for other topics: none found [Certain]. `moduleContent = opts.serverContext ? '' : extractPlainText(blocks)`
and only module 06 sets `chat.context = 'server'`; other modules still send page text, and the server labels it
untrusted and truncates it. A client claiming `moduleId: 'stablecoins'` simply gets curated context (safe).
Smaller points:
- `chat.ts` suggestion sanitiser `s.replace(/[<>&"]/g,'')` deletes characters ("R&D" becomes "RD"); escape instead.
  `moduleTitle` is still interpolated unescaped (pre-existing; titles are trusted).
- [Likely] The scene id is sticky: set on any pointerdown/focusin in a scene, cleared only on navigation. Touch
  Liquidity, scroll on, ask a general question, and the prompt says "Explain it first if relevant" with an
  unrelated scene (about 1.7k extra chars, wrong bias). Clear it on scroll-out or when the chat opens.
- Enter sends with no in-flight guard (pre-existing): double Enter doubles cost.

Backend, good [Certain]: client text never reaches the prompt for curated ids (tested with an injected string);
`moduleId`/`sceneId` are regex-gated; the question is labelled untrusted and last; errors log the exception class
only, never the question; 503 without a key, 502 for a retired model.
Backend, defects:
- [Likely] `GeminiChatModel.java:56` maps any message containing "404", "not found" or "no longer available" to
  502 and logs `msg`. "API key not found" or a request id containing 404 match. Use the SDK's typed status.
- [Certain] Non-model failures return HTTP 200 with an apology string, so monitoring sees success and the client
  stores the apology as a bot turn. Return 5xx JSON.
- [Certain] Delimiter protection is soft: a question containing "END OF REFERENCE" is plain text in the same
  string. Tests assert ordering only. Strip the marker words from the question.
- [Certain] `ChatResourceTest` calls `new ChatResource()` directly (no `@QuarkusTest`): JSON binding of the new
  `sceneId` field, status mapping and CDI wiring are untested. The real stablecoins context is only
  structure-checked, never run through `ChatPrompt` with a real scene.

## 5. Invariant coverage (as requested)

| Invariant | Tested | Gap |
|---|---|---|
| Monetary conservation | Journey, liquidity, cross-ledger | Journey partial conditions; cross-ledger scripted (F9) |
| No negative balance unless labelled credit | Liquidity | Label is a regex; no chain/books non-negative test |
| Debit, reservation, settlement distinct and ordered | Liquidity | First posting only (F8) |
| No double credit on retry | Cross-ledger | Tautological (F9) |
| No completion before destination finality | Cross-ledger | Nothing for journey or liquidity; no reorg ordering |
| Frozen/rejected never successful | Cross-ledger, journey screening | Nothing for liquidity |
| Payout complete only when spendable | Journey; liquidity only checks rail open | No check reservation is released on paid |

## 6. viz/stablecoins: state and events
- Timers [Certain]: one `setInterval` (scJourney). Cleared on route, situation, preset and step actions, and on
  `root.isConnected` at the next tick, so at most one stray tick after navigation. Fee sliders do not stop it and
  the re-render shows "Play" while it still runs (relabelled next tick). The interval holds the first `go`/`ev`;
  harmless today because fees do not change statuses, wrong if they ever do.
- Double binding: none found; listeners attach to freshly created nodes and `bindAsk` runs once per scene.
- Reduced motion: CSS disables transitions (`stablecoins.css:284`) and the track animation. JS still auto-plays
  (slower); Pause exists, so WCAG 2.2.2 is met, but not auto-playing would be better. The preference is read once.
- Keyboard: segmented controls are native radios with a visible focus ring. Content in hover-only `title`
  tooltips (preset notes, station marks) is invisible to touch and keyboard users.

## 7. F13 Low-severity items
- `scCompact.ts:278` volume figures overlap `VOLUME_FLOWS` with no shared source.
- Registry `updatedAt` was bumped to 2026-11-19 on modules 10, 11, 14, 23, 26; module 11 changed by 2 lines and
  26 by 8, so confirm those "updated" badges are honest.
## 8. Fix order
F2 then F1; F3 and F4; F5 to F7; F8 and F9; F10 to F12.
