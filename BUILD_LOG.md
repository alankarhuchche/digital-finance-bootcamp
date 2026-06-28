# Build Log — Digital Finance Bootcamp

This file is a running, teach-yourself record of every step taken to build this
app, in order, with the reasoning behind each decision. It's appended to at the
end of every phase — treat it as the thing to read if you wanted to rebuild this
from scratch without me.

---

## Phase 2A — Scaffolding

### Goal
A working Vite+TypeScript frontend talking to a Quarkus backend, with a single
working endpoint (visit counter) proving the whole chain — browser → Quarkus →
Firestore → back to browser — actually works, before any real content goes in.

### Decisions made, and why

**Frontend: Vite + TypeScript, no framework.**
Decided against React specifically to keep the bundle and mental model small —
this is a content-heavy site with custom visualizations, not a complex stateful
app, so a framework's overhead (virtual DOM, component lifecycle) buys little.
Plain TypeScript modules manipulating the DOM/SVG directly are simpler to reason
about for this use case.

**Backend: Quarkus 3.27.x LTS.**
Matches your own platform conventions rather than introducing an unfamiliar
stack. Quarkus serves the built frontend as static resources *and* exposes the
REST API from the same JAR — one deployable artifact, one Cloud Run service,
instead of two services to wire together.

**Persistence: Firestore, for the counter only.**
Cloud SQL/Postgres was the original instinct (matches your usual stack), but
for a single integer counter it's the wrong tool on a personally-funded GCP
project — Cloud SQL has a standing monthly cost because it's not serverless
(no scale-to-zero), even completely idle. Firestore is pay-per-operation with
a generous free tier and has a built-in atomic increment
(`FieldValue.increment(1)`), so the counter can't get corrupted by concurrent
visits. If this moves to an internal bank deployment later with real
governance requirements, swapping this for Postgres is a contained change —
one class, not a rearchitecture.

**No session/visitor data — just a raw count.**
Deliberately narrowed scope: no IP logging, no device fingerprinting, no
identifying information of any kind. This was a direct decision to avoid
silently building a tracking system; a hit counter doesn't need consent
banners or a lawful basis under data protection law, a personal-data store
would.

### Steps taken (replicable)

1. **Scaffold the frontend** with Vite's official TypeScript template, no
   framework:
   ```bash
   mkdir -p digital-finance-bootcamp/frontend
   cd digital-finance-bootcamp/frontend
   npm create vite@latest . -- --template vanilla-ts
   npm install
   ```

2. **Strip the default Vite demo content** — removed the counter button demo,
   default SVG assets, and generic page title, since none of it is relevant:
   ```bash
   rm -f public/vite.svg src/counter.ts src/typescript.svg
   rm -f src/assets/hero.png src/assets/typescript.svg src/assets/vite.svg
   rm -f public/icons.svg public/favicon.svg
   ```

3. **Add a dev-time proxy** in `vite.config.ts` so the frontend (port 5173 in
   dev) can call `/api/*` and have it transparently forwarded to the Quarkus
   backend (port 8080), without needing CORS configuration in either
   environment — in production they're the same origin anyway, since Quarkus
   serves both.

4. **Write `src/main.ts`** as a minimal "scaffold check" — on load, it POSTs
   to `/api/visits` and renders whatever count comes back. This is the
   simplest possible proof that the full chain works end to end.

5. **Verify the frontend builds clean** before touching the backend:
   ```bash
   npm run build
   # tsc && vite build — should produce dist/ with no errors
   ```

6. **Scaffold the backend** using the standard Quarkus Maven layout by hand
   (no Maven Central access in the build sandbox used to generate this, so it
   wasn't run through `quarkus:create` — written to match that layout exactly,
   first real test is your own `./mvnw quarkus:dev`):
   ```
   backend/
     pom.xml
     src/main/java/com/dfl/bootcamp/VisitResource.java
     src/main/resources/application.properties
     src/main/resources/META-INF/resources/   <- Vite build output lands here at Docker build time
   ```

7. **`pom.xml`** — Quarkus 3.27.x BOM, plus:
   - `quarkus-rest` + `quarkus-rest-jackson` (the current Quarkus 3.x REST
     stack — replaces the older `resteasy-reactive` artifact naming)
   - `quarkus-google-cloud-firestore` (Quarkiverse extension) for the counter

8. **`VisitResource.java`** — two endpoints:
   - `POST /api/visits` — atomically increments the Firestore counter document,
     returns the new count
   - `GET /api/visits` — just reads the current count
   No other fields are read, stored, or logged.

9. **`application.properties`** — Firestore project id read from the
   `GCP_PROJECT_ID` environment variable, never hardcoded, so the same code
   works locally and in any deployed environment by just changing the env var.

10. **`Dockerfile`** — three stages:
    - `node:20-alpine` → builds the Vite frontend
    - `maven:3.9-eclipse-temurin-21` → copies the built frontend into Quarkus's
      static resources folder, then builds the Quarkus fast-jar
    - `eclipse-temurin:21-jre-alpine` → slim runtime stage, just the built jar
      and its layers, nothing else
    Built from the **repo root**, not `backend/`, since it needs both
    `frontend/` and `backend/` in its build context:
    ```bash
    docker build -f backend/Dockerfile -t digital-finance-bootcamp .
    ```

11. **Verified the frontend build a second time** after cleanup, to confirm
    removing the unused default assets didn't break anything — it didn't.

### What exists at the end of Phase 2A
A working local dev loop (frontend dev server proxying to a Quarkus backend),
one real endpoint, and a Dockerfile that's written but not yet build-tested
end-to-end (no Maven Central access in the environment that produced this).
**First thing to check on your end**: `./mvnw quarkus:dev` against a real
GCP project with Firestore enabled, to confirm the backend actually compiles
and runs as written.

### Not yet done
- No content modules, no visualizations (Phase 2B/2C)
- No progress tracking (Phase 2E)
- No actual Cloud Run deployment — nothing has touched GCP yet (Phase 2F)

---

## Phase 2B — Visualization component library
*(not started yet)*

## Phase 2B — Visualization component library

### Goal
Seven reusable visualization components, each driven by typed data rather than
hardcoded content, so Phase 2C can author real modules as JSON/TS data without
touching component code. Proved out on dummy data via a tabbed showcase page.

### Decisions made, and why

**Data-driven components, not one-off diagrams.**
Every component (`renderStack`, `renderScatter`, `renderFlow`, `renderMatrix`,
`renderTimeline`, `renderRegionMap`, `renderCaseStudy`) takes a typed spec
object and renders from it. `src/types.ts` is the contract — Phase 2C's job is
producing data matching these shapes, not writing new rendering logic.

**The map became a real geographic map, not a placeholder.**
Original instinct was a region-grouped chip list to avoid adding a mapping
dependency before the real country list existed. Revisited after explicit
ask for "a literal geographic map" — solved by generating the map *at build
time* rather than shipping a mapping library to the browser:
- `d3-geo` + `topojson-client` + `world-atlas` (110m resolution) installed as
  **devDependencies only**
- `scripts/generate-map.mjs` runs once, projects the world via Natural Earth 1,
  and writes a static `src/data/worldMap.generated.ts` containing an SVG path
  string and a lookup of ~177 country names to projected [x,y] centroids
- The app never imports `d3-geo` etc. at runtime — only the generated static
  data file, which is plain SVG path data and numbers

**Lazy-loading the map data.**
First build of the real map pushed the main JS bundle from ~15KB to ~179KB,
because the 165KB generated geo file was imported eagerly at the top of
`regionMap.ts`. Fixed by converting that import to a dynamic
`await import('../data/worldMap.generated')` inside `renderRegionMap` —
Vite/Rollup code-splits it into its own chunk, fetched only when the Map tab
is actually opened. Main bundle dropped back to ~15-17KB; the map chunk is a
separate ~165KB (~66KB gzipped) fetch on demand.

**Initiative data is intentionally just an array, built to be extended.**
`dummyRegionMap.initiatives` in `src/data/dummy.ts` is a flat list with a
documented comment block on exactly how to add more entries later — match a
country name from `worldMap.generated.ts`, or supply manual `coords` for
non-country regions (e.g. "Eurozone"). No component code changes needed to
add countries; this was a deliberate design choice so the dataset can grow
incrementally as Phase 2C content gets authored, without re-touching
`regionMap.ts`.

### Steps taken (replicable)

1. Defined all seven data contracts in `src/types.ts`.
2. Built each component as a standalone module in `src/viz/`, each exporting
   a `render*(container, spec)` function that owns its own DOM/SVG output and
   event wiring (tap-to-expand on the stack, tap-to-detail on the scatter and
   map).
3. Wrote dummy data for all seven in `src/data/dummy.ts`.
4. Built a tabbed showcase shell in `main.ts` (7 tabs, one per component),
   keeping the Phase 2A visit counter in the header.
5. Verified a clean build (`npm run build`) after each component was added.
6. Installed `d3-geo`, `topojson-client`, `world-atlas` as devDependencies;
   wrote and ran `scripts/generate-map.mjs` to produce
   `src/data/worldMap.generated.ts` (committed to the repo — not regenerated
   at runtime).
7. Rewrote `regionMap.ts` to render the real map with status-colored pins at
   country centroids, replacing the earlier chip-list placeholder.
8. Found and fixed the bundle-size regression by converting the geo data
   import to a dynamic `import()`, confirmed via build output that the main
   bundle and the map chunk are now split.
9. Expanded the initiative dataset for genuine global coverage — India,
   Brazil (Drex), Russia, South Korea, Ghana, Sweden, Japan, Australia, and
   the US (explicitly flagged as "none" for retail since the GENIUS Act bans
   a Fed retail CBDC, with Project Agorá as the continuing wholesale channel)
   — sourced from the Atlantic Council CBDC Tracker, rather than leaving the
   showcase data thin on regions outside Europe/Bahamas/Nigeria.
10. Added the "how to add a country" comment block directly above the data,
    so extending coverage later doesn't require re-deriving the pattern.

### What exists at the end of Phase 2B
All seven visualization components, working against representative (and for
the map, genuinely accurate/sourced) dummy data. Component contracts are
locked — Phase 2C is now a content-authoring exercise against `src/types.ts`,
not a coding exercise.

### A preview-build caveat worth knowing
The in-chat preview files shared during this phase used a one-off, non-split
build (static import instead of dynamic import of the map data) purely so the
whole app could be inlined into a single standalone HTML file for viewing —
dynamic `import()` needs a real server to resolve the chunk's relative URL,
which a standalone preview file can't do. **The actual repository code keeps
the lazy-loaded version** — this only affected how the demo was shown, not
what's in the codebase.

### Not yet done
- No real content for any of the 18 planned modules (Phase 2C)
- No progress tracking (Phase 2E)
- No Cloud Run deployment (Phase 2F)

## Phase 2C — Batch 1: Modules 00–04

### Goal
First five real content modules, replacing the Phase 2B showcase as the actual
app. Content authored against the `src/content/types.ts` contracts from
Phase 2B, so no visualization component code needed to change — this batch
was meant to validate that assumption, and it held.

### Decisions made, and why

**A `ModuleContent` layer on top of the viz components.**
Phase 2B's components each take one spec and render one diagram. A real
module is usually prose plus 1-3 diagrams in sequence. Added
`src/content/types.ts` (`ContentBlock` — a tagged union of `text` plus the
seven viz kinds) and `src/content/render.ts` (`renderModule`, which iterates
a module's blocks and dispatches each to the right existing `render*`
function). No changes to the Phase 2B component files were needed — the
abstraction held on the first real attempt.

**Module registry with per-module lazy loading.**
`src/content/registry.ts` holds metadata (number, title, summary, `ready`
flag) for all 18 planned modules, but only `import()`s the content file for
ones actually written. Confirmed in the build output: each authored module
is its own small chunk (1-4KB), not bundled into the main app — this was a
deliberate carry-over of the Phase 2B lazy-loading lesson, applied
proactively this time instead of being caught after the fact.

**The app shell changed from a flat tab list to a real module index.**
Phase 2B's showcase tabs (one per visualization type) are gone — replaced
with a module index (number, title, summary, tap to open) and a module view
with a back button. This is the real navigation shape for an 18-module
bootcamp; the showcase had already done its job of proving the components
work.

**Module 03 went through a real revision, not just a first draft.**
First pass wrote the multi-stakeholder risk lens (customer / commercial bank
/ central bank / economy, for both stablecoins and CBDC) as plain prose
paragraphs with bold sub-headings. Correctly pushed back on as "just tiles
with extra words" — humans learn better from an actual diagram. Rebuilt as
two scatter plots (reusing the existing `renderScatter` component, no new
component needed) plotting the four stakeholders on risk vs. benefit, with
the explanatory text moved into each point's tap-to-reveal detail panel
instead of sitting in a wall of text. Module 00 (pure orientation, no
underlying concept to diagram) was deliberately left as text-only — flagged
explicitly rather than silently leaving the inconsistency unexplained.

### Bugs caught and fixed during this batch

1. **Apostrophes breaking single-quoted string literals.** Content like
   `heading: 'How it's structured'` is invalid JS — the apostrophe closes the
   string early. Hit this in two files (`00-orientation.ts`,
   `04-dlt-basics.ts`). Fixed by rewording one heading and converting the
   affected string literals to template literals (backticks), which don't
   have this problem. Worth remembering for all future content authoring:
   **prefer backticks for any string that might contain a contraction.**

2. **The scatter component's Y-axis label was defined in CSS but never
   rendered.** `.axis-label-y` existed in `style.css` from the original
   blueprint design (Phase 2B carried the class over) but `renderScatter`
   never actually output the element. Went unnoticed through Phase 2B
   because the showcase's dummy scatter only needed the X-axis label to make
   sense. Surfaced when Module 03 needed both axes to carry real meaning
   (risk vs. benefit). Fixed by adding the missing `<span>` and adjusting
   `.quad-wrap` padding so the rotated label has room.

3. **`node_modules` was wiped during Phase 2B's zip cleanup and never
   reinstalled** before starting Phase 2C — caused a misleading
   `vite/client` type-definition error on the first build attempt that had
   nothing to do with the actual content code. `npm install` resolved it.
   Worth a standing reminder: **always reinstall before the first build of a
   new phase**, not just before packaging.

### Steps taken (replicable)

1. Wrote `src/content/types.ts` (`ContentBlock`, `ModuleMeta`, `ModuleContent`).
2. Wrote `src/content/render.ts` (`renderModule`, dispatching blocks to the
   Phase 2B viz components).
3. Wrote `src/content/registry.ts` (metadata for all 18 modules, lazy loaders
   for the 5 written so far).
4. Authored `src/content/modules/00-orientation.ts` through
   `04-dlt-basics.ts`.
5. Rewrote `main.ts` as the real app shell (module index + module view + back
   navigation), replacing the Phase 2B tab showcase.
6. Added module-index and module-page CSS to `style.css`.
7. Hit and fixed the three bugs above.
8. Revised Module 03 from prose to scatter visualizations after review.
9. Verified the final build: 5 small per-module chunks, one shared main
   bundle, the map chunk untouched (no module in this batch uses the map yet
   — that's Module 11, in a later batch).

### What exists at the end of this batch
Modules 00-04 fully written, real, and navigable. 13 modules remain, marked
"Coming soon" in the index.

### Not yet done
- Modules 05-17 (remaining Phase 2C batches)
- Progress tracking (Phase 2E)
- Cloud Run deployment (Phase 2F)

## Phase 2C — Batch 2: Modules 05–09

### Goal
Five more real content modules (crypto assets, stablecoins deep-dive, CBDC
deep-dive, tokenization, DeFi), continuing to validate that the Phase 2B
component library and Phase 2C content architecture hold without changes as
real, varied content gets poured in.

### Decisions made, and why

**Case studies got real research, not recalled facts.**
Three modules in this batch (06, 07, 08) and one in DeFi (09) needed factual
claims about real events — Terra/UST's collapse, the Bahamas Sand Dollar's
actual usage, BlackRock's BUIDL fund, and the Euler Finance exploit. Rather
than write these from memory, each was verified via web search before
authoring, and every `CaseStudySpec` carries a real source and a
"verified as of" date — the sourcing discipline from the original brutal
review, actually applied rather than just planned.

**Reused existing components instead of inventing new ones.**
Every visualization in this batch — matrices for comparing token/stablecoin/
CBDC/tokenization types, the stack component reused for DeFi's four building
blocks, the flow component reused for both the stablecoin yield mechanism and
"where tokenization actually changes anything" — came from the Phase 2B
library unchanged. Five modules in, the component contracts from Phase 2B
are holding completely.

### A repeated gotcha, now a standing rule

**Hit the exact same `node_modules`-wiped build error as Batch 1**, for the
exact same reason: cleaned `node_modules` after the previous packaging step
and didn't reinstall before starting new work. This is now a confirmed
recurring failure mode, not a one-off — **the standing rule going forward:
run `npm install` as the very first step of any new batch, before touching
any content**, not just before the first build attempt.

### Steps taken (replicable)
1. Researched and sourced facts for all four case studies before writing
   any module content.
2. Authored `05-crypto-assets.ts` through `09-defi.ts`.
3. Updated `registry.ts`: flipped `ready: false \u2192 true` for modules 05-09,
   added their five lazy loaders.
4. Hit and immediately resolved the `node_modules` build error.
5. Verified the build: 10 small per-module chunks now exist, main bundle
   still under 20KB, map chunk still isolated and untouched (no module uses
   it yet).

### What exists at the end of this batch
Modules 00-09 fully written. 8 modules remain (10-17).

---

## Feature addition — Contact form

### Context
A "Gemini chat layer on every screen" was discussed and explicitly deferred
(real cost and abuse-surface concerns on a self-funded public project,
documented in conversation but not built). In its place: a simple contact
form that emails a fixed recipient — much smaller scope, immediately useful.

### Decisions made, and why

**Gmail SMTP over a transactional email API.**
For occasional contact-form volume on a personal project, Quarkus's built-in
`quarkus-mailer` extension sending via Gmail SMTP (with an App Password, not
the real account password) needed zero new accounts or API keys. A
transactional service (SendGrid etc.) would have better deliverability at
scale, but that's not the problem this needed to solve.

**No persistence of messages.**
Deliberately not storing question/answer style data anywhere — the email
*is* the storage (it lands in a real inbox). This keeps the contact form from
becoming a second place personal data quietly accumulates, consistent with
the "anonymous counter only" decision made earlier for visit tracking.

**Honeypot instead of heavier anti-spam infrastructure.**
A hidden form field (invisible via CSS, present in the DOM) that real users
never fill in but simple bots often do — submissions with it filled are
silently dropped rather than rejected with an error, so a bot gets no signal
that it was caught. Lightweight, no extra dependency, appropriate for
expected volume; can be upgraded to real rate-limiting (reusing the Firestore
counter pattern already built for visits) later if it's ever actually abused.

### Steps taken (replicable)
1. Added `quarkus-mailer` to `pom.xml`.
2. Added Gmail SMTP config to `application.properties`, with env var
   placeholders (`MAILER_USERNAME`, `MAILER_PASSWORD`) and an explicit
   comment on how to generate a Gmail App Password — never hardcoded.
3. Wrote `ContactResource.java` \u2014 `POST /api/contact`, honeypot check,
   required-message validation, sends via the injected `Mailer`, sets
   reply-to from the visitor's email if provided.
4. Added a contact form view to `main.ts` (name / email / message / hidden
   honeypot field), reachable via a "Get in touch" link on the module index.
5. Added form, input, and status-message styling to `style.css`.
6. Verified the frontend build is clean. The backend mail-sending path
   itself isn't testable in this sandbox (no real SMTP credentials to test
   against) \u2014 **first real test of this feature happens in your own
   environment**, once a real Gmail App Password is set as an env var.

### Not yet done
- Modules 10-17 (remaining Phase 2C batches)
- Progress tracking (Phase 2E)
- Cloud Run deployment (Phase 2F)
- The deferred Gemini Q&A chat layer (explicitly shelved, not abandoned \u2014
  revisit with rate-limiting once there's a real usage pattern to design
  limits around)

## Phase 2C — Batch 3: Modules 10–13

### Goal
Market sizing, the global initiatives map as real content, market structure,
and settlement/infrastructure — closing the loop back to Module 01's
friction points and Module 04's finality discussion.

### Decisions made, and why

**A new visualization component, justified by an actual gap.**
Module 10 needed to compare US M2 (~$22.8T), stablecoin market cap (~$320B),
DeFi TVL (~$85B), and tokenized RWA value (~$26B) \u2014 magnitudes nearly 900x
apart. Neither the matrix (categorical comparison) nor the scatter (2-axis
relationship) is the right tool for "these numbers differ by orders of
magnitude." Added `renderScale` \u2014 horizontal bars, sqrt-scaled rather than
linear so the smallest figures stay visibly nonzero, with the actual value
labeled and tap-to-expand detail. This is the first genuinely new component
since Phase 2B \u2014 added because an existing one didn't fit, not by default.

**Module 11 promoted Phase 2B's showcase data directly into real content.**
The global initiatives dataset (India, Brazil, China, the US's GENIUS Act
ban, etc.) was already researched and sourced back in Phase 2B when the map
component was being built and expanded for coverage. Rather than redo that
work, it became this module's actual content verbatim \u2014 the Phase 2B
showcase data was real research from the start, not placeholder filler.

**Every hard figure in this batch was sourced, not recalled.**
US M2, global stablecoin market cap, DeFi TVL, tokenized RWA value (Module
10), and the FTX shortfall/sentencing facts (Module 12) were all verified via
search before writing, each with a source and a "verified as of" date \u2014
continuing the discipline from Batch 2, now four batches deep without a
lapse.

### Steps taken (replicable)
1. Researched and sourced all Module 10 and Module 12 figures.
2. Added `ScaleSpec` to `types.ts`, built `viz/scale.ts`, added its styles,
   wired it into `ContentBlock` and the `renderModule` dispatcher.
3. Authored `10-market-sizing.ts` through `13-settlement.ts`.
4. Updated `registry.ts`: flipped `ready` for modules 10-13, added their
   loaders.
5. Ran `npm install` *before* the first build this time \u2014 the standing rule
   from Batch 2 held, no repeat of the `node_modules` error.
6. Verified the build: confirmed the map's lazy-loaded chunk stays isolated
   even when triggered from inside a real module (Module 11) rather than the
   Phase 2B showcase \u2014 the lazy-loading approach generalizes correctly.

### What exists at the end of this batch
Modules 00-13 fully written. 4 modules remain (14-17): Regulation, Bank
strategy, Failure modes, Glossary.

## Phase 2C — Batch 4: Modules 14–17 (final batch)

### Goal
Regulation, bank strategy, failure modes, and the glossary \u2014 closing out
the full 18-module curriculum.

### Decisions made, and why

**The timeline component got its first real use.**
`renderTimeline` was built in Phase 2B and only ever exercised with dummy
showcase data until now. Module 14's MiCA rollout (Jun 2024 stablecoin
rules \u2192 Dec 2024 CASP licensing \u2192 Jul 2026 transition end) was the first
real content to need it \u2014 confirmed it works exactly as designed against
real dated events, not just placeholder data.

**Module 16 named failure categories explicitly instead of writing a fourth
isolated case study.**
Rather than treat "failure modes" as just another module needing its own
fresh case study, it explicitly cross-references the three already built
(Terra/UST in 06, Euler in 09, FTX in 12) as three of four named categories
(algorithmic depeg, smart contract exploit, custodial misuse), and adds only
the one genuinely missing category \u2014 bridge exploits \u2014 with a newly
sourced case (Ronin Bridge, ~$625M, March 2022, Lazarus Group). This reuses
prior research instead of duplicating effort, and gives the module a
synthesizing role rather than a repetitive one.

**The glossary stayed deliberately diagram-free.**
Consistent with Module 00's reasoning: not every module benefits from a
forced visualization. A 35-term reference list, each linked back to its
explaining module, is better served as clean, scannable text than as any
kind of chart.

### Steps taken (replicable)
1. Authored `14-regulation.ts` through `17-glossary.ts`.
2. Updated `registry.ts`: flipped `ready` for the final four modules, added
   their loaders.
3. Ran `npm install` before the first build (the standing rule, held again).
4. Verified the full 18-module build: every module its own small lazy-loaded
   chunk, main bundle still under 20KB, map chunk still isolated.

### Phase 2C is complete
All 18 planned modules are written, sourced where they make factual claims,
and navigable end to end. Every case study across the whole curriculum
(Terra/UST, Euler Finance, FTX, Ronin Bridge, BUIDL, Bahamas Sand Dollar)
carries a real source and a "verified as of" date \u2014 that discipline held
from Batch 2 through to the last module without a lapse.

### Where this leaves the original phase plan
Phase 2D ("backend services \u2014 visit counter + Postgres/Cloud SQL") is
effectively already done, just simpler than originally scoped: the visit
counter and the contact form (added mid-stream, see the feature-addition
entry above) both shipped during Phase 2C using Firestore and Gmail SMTP
rather than Postgres. What's left from the original plan:

- **Phase 2E** \u2014 progress tracking (local storage, module completion)
- **Phase 2F** \u2014 actual Cloud Run deployment: Dockerfile is written but
  never build-tested end-to-end (no Maven Central access in this sandbox),
  Cloud SQL was dropped in favor of Firestore, and the full deploy runbook
  (Artifact Registry, IAM, `gcloud run deploy`, Firestore/Gmail secrets
  setup) still needs to be written and walked through for real
- **Phase 2G** \u2014 hardening: mobile QA across all 18 modules, admin-endpoint
  auth if any gets added later, a final accuracy pass once it's live

## Phase 2E — Progress tracking

### Goal
Let a visitor mark modules complete and see overall progress, without any
backend — matching the original "stay static for V1" decision from planning.

### Decisions made, and why

**`localStorage`, not a backend.**
This is real, deployed application code running in an actual browser \u2014
not a Claude-rendered in-chat artifact, where `localStorage` is disallowed.
For a single-device, no-login progress tracker, it's exactly the right
amount of infrastructure: zero cost, zero new backend surface, persists
across sessions on the same device.

**Explicit "Mark complete" button, not automatic on-view tracking.**
Auto-marking a module complete just because it was opened would be a weak
signal \u2014 someone could open and immediately leave. An explicit toggle at
the bottom of each module, after all its content, is a more honest
completion signal and lets someone un-mark a module if they want to revisit
it.

**Progress tracking lives in the app shell, not in the content renderer.**
`renderModule` (Phase 2C) stays purely about content \u2014 it has no idea
progress tracking exists. The completion button is appended by `main.ts`
after `renderModule` finishes, consistent with how the visit counter and
contact link are also app-shell concerns layered on top of, not mixed into,
content rendering.

**Fails soft if storage is unavailable.**
Private/incognito browsing can block `localStorage`. Both read and write
paths catch and fail silently rather than throwing \u2014 worst case, progress
just doesn't persist that session; the person is never shown an error for
something they can't control.

### Steps taken (replicable)
1. Wrote `src/progress.ts` \u2014 `isComplete`, `toggleComplete`,
   `completedCount`, all backed by a single `localStorage` key holding a
   JSON array of completed module IDs.
2. Updated `main.ts`: added a progress summary bar to the index header,
   a completion checkmark per module row, and a "Mark module complete"
   toggle button appended after each module's content.
3. Added progress bar, checkmark, and complete-button styles to
   `style.css`.
4. Hit the `node_modules` build error a third time, for the third time in a
   row for the same reason \u2014 resolved instantly since `npm install` is now
   reflexive, but worth noting the standing rule is being followed correctly
   even though the mistake of deleting `node_modules` during packaging keeps
   recurring. (The fix for *that* root cause, if it keeps happening, would be
   to stop deleting `node_modules` before packaging at all and just exclude
   it from the zip — worth considering for the next phase.)
5. Verified: progress persists across navigating to a module and back to
   the index, survives a full page reload (real `localStorage`, not
   in-memory state).

### What exists now
All 18 modules, the visualization library, the visit counter, the contact
form, and client-side progress tracking \u2014 a complete, navigable bootcamp
with state. Only Cloud Run deployment (Phase 2F) and final hardening
(Phase 2G) remain from the original plan.

### Fixed the actual root cause of the recurring node_modules error

Every prior packaging step did `rm -rf node_modules && rm -rf dist` before
zipping — but the zip command already excludes `node_modules` via
`-x "*/node_modules/*"`, so deleting it first was always unnecessary. That
unnecessary deletion is exactly what caused the repeated "cannot find
vite/client" build error at the start of every subsequent phase. Going
forward: **just zip directly with the exclusion flag, never delete
`node_modules` locally.** This should be the last time this particular
mistake happens.

## Phase 2F — Cloud Run deployment runbook

### Honest scope limitation
This sandbox had no Docker, no Maven, and no `gcloud` available \u2014 only a
bare JDK. **None of the deployment steps below could be build-tested before
being handed over.** `DEPLOY.md` was written as carefully as possible
against documented Quarkus/Docker/`gcloud` syntax, but this is genuinely the
first real test of whether the backend even compiles, let alone deploys.
Flagging this clearly rather than implying any of it was verified.

### What's in DEPLOY.md
A full runbook, in order: enabling GCP APIs, creating the Firestore database,
storing the Gmail App Password in Secret Manager (not a plain env var \u2014
the one genuinely sensitive credential in this app), creating an Artifact
Registry repo, building the multi-stage Docker image, pushing it, deploying
to Cloud Run with `--min-instances=0` (scale to zero) and a `--max-instances`
safety cap, granting Firestore IAM access to the Cloud Run service account,
a verification checklist, and optional custom domain mapping.

### Decisions made, and why

**Secret Manager for the mailer password, plain env vars for everything else.**
`GCP_PROJECT_ID` and `MAILER_USERNAME` aren't sensitive on their own; the
Gmail App Password is the one credential worth not exposing in service
config that anyone with read access to the Cloud Run service could see.

**`--max-instances=2` as a cheap safety cap.**
Given this is self-funded on a public project, an unbounded autoscale
ceiling is a real cost-runaway risk if the service ever gets hit by a
traffic spike or abuse. Two instances is enough for a low-traffic personal
bootcamp without leaving the door open.

**A documented IAM choice, not a single answer.**
Noted both the "it probably already works" path (default compute service
account, often already broad enough in a personal project) and the more
correct path (a dedicated service account scoped to just
`roles/datastore.user`) \u2014 rather than picking one silently, since the
right answer depends on how the GCP project's already configured.

### Final review pass on existing files
Re-read `Dockerfile` and `pom.xml` one more time specifically because they
couldn't be build-verified. Added one footnote to `DEPLOY.md` about keeping
Cloud Run's `--port` and Quarkus's `QUARKUS_HTTP_PORT` in sync if the
default ever changes \u2014 everything else held up on inspection, but
"held up on inspection" is not the same as "confirmed working."

### What's actually left
**Phase 2G (hardening)** is now the only remaining phase: running this
runbook for real, fixing whatever the first real build/deploy attempt
surfaces, mobile QA across all 18 modules on a live URL, and a final
accuracy pass once everything is actually reachable on the internet.
