# Implementation Audit — Banking Rails to Digital Finance

**Audit date:** 29 June 2026
**Current deployment:** GCP Cloud Run (Quarkus backend + Vite frontend)
**Git state:** commit 37a98fc on main

---

## 1. Route structure

| Route | What it renders | Status |
|-------|----------------|--------|
| `/` | Landing page with category grid | Working |
| `/topic/:id` | Topic content page | Working |
| `/module/:id` | Legacy redirect → `/topic/:id` | Working (redirect) |
| `/contact` | Contact form | Working |
| `/*` (catch-all) | SPA fallback → index.html | Working (SpaFallbackFilter.java) |

**Issues:**
- Page title is always "Digital Finance Guide" — doesn't update per topic (bad for bookmarks, browser tabs, SEO)
- No 404 page — unknown topic IDs silently redirect to index
- No `/about` route exists (needed per scope)

## 2. Topic pages (content inventory)

20 topic files + 1 dead file (00-orientation.ts). Registry order follows narrative flow:

| # | ID | Title | Category | Content depth |
|---|---|---|---|---|
| 1 | payments-fundamentals | Payments fundamentals | How payments work today | Good — four-party model, interchange, RTP |
| 2 | existing-rails | The existing rails | How payments work today | Good — SWIFT, nostro/vostro, ISO 20022 |
| 3 | forms-of-money | Forms of money | How payments work today | Good — 6 forms with money-cards viz |
| 4 | risk-benefit | Who carries the risk | How payments work today | Good — stakeholder matrices |
| 5 | dlt-basics | DLT & blockchain basics | The technology underneath | Good — consensus, finality, L2 |
| 6 | crypto-assets | Crypto assets | The technology underneath | Adequate — needs wrapped tokens, standards |
| 7 | stablecoins | Stablecoins | The new instruments | Strong — 4 mechanisms, 2 case studies |
| 8 | cbdc | CBDCs | The new instruments | Strong — privacy, offline, 2 case studies |
| 9 | tokenization | Tokenization | The new instruments | Good — BUIDL, EIB cases |
| 10 | defi | DeFi | Markets & scale | Strong — revenue, MEV, Euler case |
| 11 | market-sizing | Market sizing | Markets & scale | Good — scale bars with real numbers |
| 12 | global-initiatives | Global initiatives | Markets & scale | Good — interactive map |
| 13 | market-structure | Market structure | Markets & scale | Good — FTX case study |
| 14 | settlement | Settlement & infrastructure | Markets & scale | Strong — DvP, atomic, CCPs |
| 15 | digital-identity | Digital identity & KYC | Rules & reality | Good — costs, Aadhaar case |
| 16 | regulation | Regulation | Rules & reality | Good — MiCA, GENIUS, Binance case |
| 17 | privacy | Privacy & data | Rules & reality | Good — Tornado Cash case |
| 18 | bank-strategy | Bank strategy | Rules & reality | Good — Kinexys case |
| 19 | failure-modes | Failure modes | Rules & reality | Strong — 6 categories, TradFi analogues |
| 20 | glossary | Glossary | Reference | Functional — needs new terms |

**Dead files:** `00-orientation.ts` (removed from registry), `data/dummy.ts` (imported nowhere)

**Missing topics (from scope):** Deposit tokens, What's next (original analysis), About page

## 3. Existing components

| Component | File | Lines | Quality | Premium feel? |
|-----------|------|-------|---------|---------------|
| Stack (accordion) | viz/stack.ts | 36 | Good | Medium — functional but visually basic |
| Scatter (2D plot) | viz/scatter.ts | 56 | Good | Medium — dots animate in, glow on active |
| Flow (SVG boxes) | viz/flow.ts | 34 | Good | Medium-high — animated dots, glow filter |
| Matrix (table) | viz/matrix.ts | 29 | Adequate | Low — it's a styled HTML table |
| Timeline | viz/timeline.ts | 24 | Adequate | Low — basic vertical dot timeline |
| Region map | viz/regionMap.ts | 93 | Good | Medium — world map with pin ripple |
| Case study | viz/caseStudy.ts | 62 | Good | Medium — expandable sections |
| Scale (bars) | viz/scale.ts | 46 | Good | Medium-high — count-up animation |
| Quiz | viz/quiz.ts | 86 | Good | Medium — card-based with scoring |
| Money cards | viz/moneyCards.ts | 55 | Good | Medium-high — risk bars, expand detail |
| Chat widget | chat.ts | 117 | Good | Medium — FAB, slide-up panel |
| Animation utils | animate.ts | 37 | Good | N/A (utility) |

**Accessibility across all components:**
- Only 1 aria-label in entire codebase (chat FAB)
- No keyboard navigation on any interactive viz (stack, scatter, matrix, quiz, money cards)
- No focus-visible styles for keyboard users
- Quiz options are buttons but have no focus ring

## 4. Styling / design system

**CSS:** 714 lines, single file (`style.css`)

**Design tokens (CSS variables):**
```
--ink: #0E2A43 (primary bg)
--ink2: #163654 (surface bg)
--grid: #244a6e (borders)
--amber: #E8A33D (accent/CTA)
--teal: #5FB3A3 (success/positive)
--coral: #E0726B (danger/negative)
--text: #EDF2F7 (primary text)
--text-dim: #9FB7CC (secondary text)
--sidebar-w: 260px
```

**Typography:**
- Space Grotesk (headings) — loaded from Google Fonts
- IBM Plex Mono (labels, monospace) — loaded from Google Fonts
- Inter (body) — loaded from Google Fonts
- 3 font families = 3 HTTP requests on first load

**Animations (6 @keyframes):**
- fadeSlideIn, slabPulse, pinRipple, fabPulse, typingBounce, loadingPulse

**Media queries (4):**
- max-width: 768px (mobile sidebar collapse)
- min-width: 1200px (wider padding)
- max-width: 768px (chat panel full-width)
- max-width: 768px (sidebar close button)

**Font size issues:** 20+ instances of 10px or 11px fonts (sidebar brand, category labels, monospace labels). These are at the accessibility edge.

**Missing:** No dark/light mode toggle (always dark). No print stylesheet. No CSS logical properties (ltr/rtl).

## 5. Diagrams / charts / visuals

| Viz type | Used in topics | Interaction | Animation | Visual impact |
|----------|---------------|-------------|-----------|---------------|
| Flow (SVG) | 01, 06, 08, 13, 18 | Box tap (tooltip) | Animated dot along path, stroke pulse | High — the most visually distinctive component |
| Money cards | 02 | Tap to expand | Risk bar animation, stagger entrance | High — rich, informative |
| Stack | 04, 09 | Tap to expand/collapse | Height transition, pulse hint | Medium |
| Scatter | 03 | Dot tap → detail panel | Dots scale in, glow on active | Medium |
| Matrix (table) | Many (01,04,05,06,07,08,12,14,15,16) | Row tap highlight | Stagger row entrance | Low — the most-used viz is the least visually interesting |
| Scale (bars) | 10 | Tap to expand detail | Width animation, count-up | Medium-high |
| Region map | 11 | Pin tap → detail | Pin ripple on live/pilot | Medium — map is impressive but small |
| Timeline | 14 | None (passive) | Line draws, rows stagger | Low |
| Case study | Many | Section expand/collapse | Card entrance | Medium |
| Quiz | All (except glossary) | Option tap, next, retry | Progress bar, result circle | Medium |

**Assessment:** Matrix tables dominate the content (used in 10+ topics) but are the weakest visual. The flow diagrams are the strongest but underused. The overall visual impression is "well-organized information" rather than "premium interactive experience."

## 6. Content / data model

```typescript
ContentBlock =
  | { kind: 'text'; heading?; body: string }          // HTML prose
  | { kind: 'stack'; heading?; data: StackLayer[] }    // Accordion
  | { kind: 'scatter'; heading?; data: ScatterSpec }   // 2D plot
  | { kind: 'flow'; heading?; data: FlowSpec }         // SVG flow
  | { kind: 'matrix'; heading?; data: MatrixSpec }     // Table
  | { kind: 'timeline'; heading?; data: TimelineSpec }  // Vertical timeline
  | { kind: 'map'; heading?; data: RegionMapSpec }     // World map
  | { kind: 'case'; heading?; data: CaseStudySpec }    // Case study card
  | { kind: 'scale'; heading?; data: ScaleSpec }       // Bar chart
  | { kind: 'quiz'; heading?; data: QuizSpec }         // Quiz
  | { kind: 'money-cards'; heading?; data: MoneyCardsSpec } // Comparison cards
```

**11 block types.** Content is fully static TypeScript — no CMS, no API, no markdown. Each topic is a TypeScript file exporting a `ModuleContent` object.

**Strengths:** Type-safe content, lazy-loaded per topic, no runtime data fetching for content.
**Weaknesses:** Every content change requires a rebuild and redeploy. No way for non-developers to edit content.

## 7. Homepage effectiveness

**Current state:**
- Eyebrow: "Digital Finance Guide"
- H1: "Knowledge Base"
- Intro: generic 2-line description
- Start hint: "Start with Payments fundamentals if you're new"
- Grid of topic cards grouped by category

**Problems:**
- "Knowledge Base" as a headline is sterile and doesn't communicate the value proposition
- The product positioning ("Banking Rails to Digital Finance") isn't reflected anywhere in the UI
- No visual hook — the landing page is text + a grid of identical-looking cards
- No hero visualization or signature interaction that demonstrates what the product does
- The category names ("How payments work today", "The technology underneath") are descriptive but don't tell a story
- No "what you'll learn" or "why this matters" framing for a first-time visitor
- No social proof, no authorship signal, no credibility markers

## 8. Navigation clarity

**Sidebar:** 6 categories, 20 topics. Functional but dense. No visual distinction between categories — they're all the same font, color, and weight.

**Topic page:** "← All topics" back button + category eyebrow + prev/next nav at bottom. Functional.

**Problems:**
- Sidebar shows 20 items in a flat list with category headers — a new visitor sees a wall of text
- No visual indicator of reading progress per category (e.g., "3/4 explored in How payments work today")
- The search only filters by title/summary, not by full content
- No "recommended reading order" visual — the narrative flow is implicit in the order but not communicated

## 9. Mobile experience

**Breakpoints:** 768px (sidebar collapse), 1200px (wider padding)

**What works:** Sidebar hamburger, overlay close, chat panel goes full-width.

**Problems:**
- No breakpoint between 768px and 1200px (tablet gap)
- Topic cards use `minmax(280px, 1fr)` — on phones they're one column but on tablets they could be 2
- SVG visualizations (flow, scatter) have `max-width: 500px` — fine on phones but wastes space on tablets
- Matrix tables can overflow horizontally on small screens (no `table-layout: fixed`)
- Hamburger is visually basic (plain text "☰") — should be a proper icon

## 10. Performance risks

**Bundle:** Vite build produces ~35KB main JS + ~165KB world map (lazy-loaded). Topic modules are 3-12KB each, lazy-loaded. Total initial load is fast.

**Fonts:** 3 Google Fonts families loaded in CSS @import (render-blocking). Should be preloaded or self-hosted.

**Images:** Zero images in the entire app. All visuals are SVG/HTML/CSS. Good.

**Backend cold start:** Quarkus JVM on Cloud Run with min-instances=0. First request after idle will take 3-8 seconds for JVM startup. Affects visit counter and chat on first load.

**Firestore dependency:** If Firestore is unreachable (wrong project ID, missing IAM, cold start race), the visit counter returns -1 and displays it. This is the known bug.

## 11. Deployment assumptions

- Cloud Run with `--min-instances=0` (scale to zero)
- Firestore for visit counter (requires GCP project + Firestore database)
- Gmail SMTP for contact form (requires App Password in Secret Manager)
- Gemini API key in Secret Manager for chat
- Root Dockerfile and backend/Dockerfile are duplicates (must be kept in sync)
- No CI/CD — manual `docker build` + `gcloud run deploy`
- No health check endpoint
- SPA fallback via Vert.x Router catch-all

## 12. Bugs

| Bug | Severity | Root cause |
|-----|----------|------------|
| Visit counter shows "-1 visits" | High | VisitResource returns `{"count": -1}` when Firestore is unreachable; frontend displays raw value without checking |
| Dead files in repo | Low | `00-orientation.ts` and `data/dummy.ts` exist but are imported nowhere |
| Duplicate Dockerfiles | Low | Root `Dockerfile` and `backend/Dockerfile` are identical; changes to one must be manually replicated |
| No document.title update | Medium | Browser tab always says "Digital Finance Guide" regardless of which topic is open |
| No health check endpoint | Medium | Cloud Run checks root path (returns index.html) — functional but not correct |

---

# Modification Plan

## What to keep

- **Route structure** — `/topic/:id` with legacy `/module/` redirect. Clean and working.
- **Sidebar layout** — persistent sidebar + fluid content area. Correct architecture.
- **Content model** — 11 block types covering all visualization needs. Well-typed, extensible.
- **All 20 topic files** — content is substantial and well-researched. Don't rewrite.
- **All 10 viz components** — functional and animated. Enhance, don't replace.
- **Gemini chat** — grounded in topic content, deterministic temperature. Working.
- **Quiz system** — per-topic, card-based, with scoring. Working.
- **Client-side routing** — pushState, popstate, legacy redirect. Working.
- **Progress tracking** — localStorage-based, simple and effective. Working.
- **Animation utility** — IntersectionObserver-based entrance animations. Working.
- **Dark theme** — the ink/amber/teal palette is distinctive and appropriate for the audience.
- **Backend** — Quarkus is fine. Contact form, chat, SPA fallback all work.

## What to improve (low-effort, high-impact)

| # | Change | Effort | Impact |
|---|--------|--------|--------|
| 1 | **Fix visit counter** — check for -1/error before displaying, show nothing if unavailable | 5 min | High — removes visible bug |
| 2 | **Update homepage copy** — rebrand to "Banking Rails to Digital Finance" with the positioning statement from the brief | 15 min | High — aligns product with intent |
| 3 | **Update document.title** per topic — `document.title = 'topicTitle — Digital Finance'` in openTopic() | 5 min | Medium — better bookmarks/tabs |
| 4 | **Delete dead files** — remove 00-orientation.ts and data/dummy.ts | 2 min | Low — cleanup |
| 5 | **Merge duplicate Dockerfiles** — make root Dockerfile a one-liner that copies from backend/ | 5 min | Low — maintenance hygiene |
| 6 | **Add health check endpoint** — `GET /api/health` returning 200 | 10 min | Medium — proper Cloud Run health checks |

## What to remove or simplify

| What | Action | Why |
|------|--------|-----|
| `00-orientation.ts` | Delete | Dead file, removed from registry |
| `data/dummy.ts` | Delete | Never imported |
| Session timer | Consider removing from sidebar footer | Low value, adds visual noise. Keep visit counter only. |
| Progress percentage in sidebar | Simplify to just checkmarks per topic | The "3/20 explored" fraction feels like a training completion metric, not a reference. The per-topic checkmarks in the nav already communicate what you've read. |

## What can be enhanced without major refactoring

| Component | Enhancement | Effort |
|-----------|-------------|--------|
| **Matrix (table)** | Add alternating row backgrounds, subtle left-border color per item, make cells wrap instead of overflow | 30 min CSS |
| **Timeline** | Add colored markers per status (done=teal, upcoming=amber, deadline=coral) — currently all markers use `var(--amber)` | 15 min CSS |
| **Flow diagrams** | Increase max-width from 500px to 700px on wider screens | 10 min CSS |
| **Case studies** | Add a subtle left-border accent color matching the topic category | 10 min CSS |
| **Topic cards (index)** | Add a category color accent (left border or top stripe) so cards aren't all visually identical | 20 min |
| **Sidebar** | Add per-category progress (e.g., "3/4" next to "How payments work today") | 30 min |
| **Landing page** | Add a hero section with an animated SVG flow diagram showing "today's rails → digital finance" as a visual hook | 2 hr |

## What requires new components

| Component | Purpose | Effort |
|-----------|---------|--------|
| **Callout block** | A new `kind: 'callout'` content block for key insights / author's perspective — visually distinct from prose (amber left border, subtle background) | 1 hr |
| **Comparison block** | A new `kind: 'comparison'` for side-by-side (e.g., deposit token vs stablecoin) — two-column cards with highlighted differences | 2 hr |
| **About page** | A static page with author bio, LinkedIn link, methodology, "as of" date | 1 hr |
| **Share button** | Per-topic "Copy link" + "Share on LinkedIn" with pre-filled text | 1 hr |

## What should not be touched yet

| What | Why |
|------|-----|
| Backend architecture | Quarkus + Firestore + Gemini is working. No reason to change. |
| Content model (types.ts) | The 11 block types are sufficient. Add callout + comparison, don't restructure. |
| Build system (Vite) | Working, fast builds. No reason to change. |
| Font choices | Space Grotesk + IBM Plex Mono + Inter is a strong combination. Keep. |
| Dark theme | The palette is distinctive and appropriate. Don't add light mode yet. |
| Chat widget | Working, well-positioned. Don't change the interaction model. |
| CI/CD | Manual deploy is fine for a personal project at this stage. |

---

# Phased modification roadmap

## Phase 1: Patch (1-2 hours)

Fix what's broken or embarrassing. No new content, no new features.

1. Fix visit counter — show nothing if -1 or error
2. Update document.title per topic
3. Delete dead files (00-orientation.ts, dummy.ts)
4. Add backend health check endpoint (`GET /api/health` → 200)
5. Fix any remaining 10px font sizes → minimum 11px

## Phase 2: Upgrade (3-4 hours)

Rebrand and improve what exists. No new topics, no new viz types.

1. **Rebrand homepage** — "Banking Rails to Digital Finance" with the positioning statement from the brief. The H1 should be the product name, not "Knowledge Base."
2. **Update sidebar header** — match the rebrand
3. **Improve matrix tables** — alternating rows, cell wrapping, left-border accents
4. **Improve topic cards** — category color accents (left border per category)
5. **Improve timeline markers** — colored by status
6. **Widen flow diagrams** — max-width 700px on >768px screens
7. **Update `<title>` tag** — "Banking Rails to Digital Finance"
8. **Add About page** — route `/about`, linked from sidebar footer

## Phase 3: Signature interactions (4-6 hours)

The things that make it feel premium. New content, new viz types.

1. **Hero visualization on landing page** — an animated SVG showing the journey from "card tap → SWIFT → correspondent banking" on the left to "tokenized deposit → atomic settlement → shared ledger" on the right, with an animated transition. This is the visual hook that makes people want to explore.
2. **Add callout block type** — `kind: 'callout'` with amber left border and subtle ink2 background for key insights / author's perspective
3. **Add comparison block type** — `kind: 'comparison'` for side-by-side instrument comparisons
4. **Write Deposit tokens topic** — using callout and comparison blocks
5. **Write What's next topic** — original analysis, using callout blocks for key claims
6. **Add share button** — per-topic "Copy link" and "Share on LinkedIn"

## Phase 4: Polish (2-3 hours)

The finishing touches.

1. Enrich existing topics per scope (stablecoins, CBDC, tokenization, settlement, DLT, forms-of-money, bank strategy, market sizing, regulation, global initiatives, crypto assets)
2. Update glossary with all new terms
3. Preload or self-host Google Fonts (eliminate render-blocking request)
4. Add topic reading time estimates ("~8 min read" on cards)
5. Add keyboard navigation to interactive viz components
6. Final narrative coherence pass — verify every bridge paragraph makes sense in the new order

---

# Risk-controlled implementation order

| Order | What | Risk | Rollback |
|-------|------|------|----------|
| 1 | Phase 1 (Patch) | Near-zero — bug fixes only | Revert commit |
| 2 | Phase 2 (Upgrade) | Low — CSS and copy changes, no structural changes | Revert commit |
| 3 | Phase 3a (Hero viz, callout/comparison blocks) | Low — additive, no existing content changes | Remove new components |
| 4 | Phase 3b (Deposit tokens + What's next topics) | Low — new files only, no changes to existing topics | Delete new files |
| 5 | Phase 3c (Share button) | Low — additive UI | Remove button |
| 6 | Phase 4a (Content enrichment) | Medium — modifies existing topic files | Git revert per file |
| 7 | Phase 4b (Polish) | Low — CSS, fonts, keyboard nav | Revert |

Each phase is independently deployable and independently revertable.
