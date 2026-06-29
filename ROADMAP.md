# Revised Modification Roadmap

**Base:** Existing deployed GCP Cloud Run app (Quarkus + Vite). Not a rebuild.
**Strategy:** Interaction-led. The first signature interaction (Payment Rail Explorer) ships before visual polish.
**Constraint:** One excellent interaction first. Do not build everything at once.

---

## Phase 1 — Stabilise

**Goal:** Fix what's broken. Confirm deployment works. Zero new features.

### Changes

| # | Change | File(s) | Detail |
|---|--------|---------|--------|
| 1 | Fix visit counter | `frontend/src/main.ts` | Check `data.count` — if -1 or missing, hide the element entirely instead of showing "-1 visits" |
| 2 | Update document.title | `frontend/src/main.ts` | In `openTopic()`, set `document.title = content.title + ' — Banking Rails to Digital Finance'`. Reset to base title in `renderIndex()`. |
| 3 | Add health check | `backend/src/main/java/com/dfl/bootcamp/HealthResource.java` (new) | `GET /api/health` → `{"status":"ok"}`. 6 lines of Java. |
| 4 | Remove dead files | Delete `frontend/src/content/modules/00-orientation.ts`, `frontend/src/data/dummy.ts` | Not imported anywhere. |
| 5 | Fix font sizes | `frontend/src/style.css` | Change all `font-size: 10px` to `11px` (4 instances: .sidebar-brand, .nav-category, .case-toggle, .money-risk-tag). 11px is the floor. |
| 6 | Verify build | CLI | Run `npm run build` + `docker build` locally to confirm nothing is broken. |

### Risks and rollback
- Near-zero risk. All changes are bug fixes or deletions.
- Rollback: `git revert` the single commit.

### Acceptance criteria
- [ ] Visit counter shows a positive number or nothing — never -1
- [ ] Browser tab shows topic title when viewing a topic
- [ ] `curl /api/health` returns 200 with `{"status":"ok"}`
- [ ] `00-orientation.ts` and `dummy.ts` no longer exist
- [ ] No font-size below 11px in style.css
- [ ] `npm run build` succeeds
- [ ] `docker build -f Dockerfile -t test .` succeeds

### Test checklist
- [ ] Open app → visit counter is not -1
- [ ] Click a topic → browser tab updates
- [ ] Navigate back → tab resets to base title
- [ ] Health endpoint responds
- [ ] Vite build clean, no TS errors

### Commit
```
Stabilise: fix counter, update title, add health check, remove dead files
```

---

## Phase 2 — Rebrand and homepage transformation

**Goal:** Reposition the product. The homepage should communicate "Banking Rails to Digital Finance" and explain the core thesis visually. Add About page.

### Changes

| # | Change | File(s) | Detail |
|---|--------|---------|--------|
| 1 | Rebrand homepage | `frontend/src/main.ts` | Replace "Digital Finance Guide / Knowledge Base" with "Banking Rails to Digital Finance". New hero copy: "Today's payments digitised the instruction. Digital finance digitises the instrument, the rules, the settlement and the audit trail." |
| 2 | Hero section | `frontend/src/main.ts`, `frontend/src/style.css` | Add a visual hero contrasting three layers: (a) what the customer sees (tap, instant), (b) what happens underneath (messaging, reconciliation, T+2), (c) what digital finance changes (tokenised, atomic, programmable). This is HTML/CSS — three columns or stacked cards, not a new component. Animated entrance. |
| 3 | Update sidebar | `frontend/src/main.ts` | Change sidebar header from "Digital Finance / Knowledge Base" to "Banking Rails to Digital Finance" (two lines). |
| 4 | Update page title | `frontend/index.html` | `<title>Banking Rails to Digital Finance</title>` |
| 5 | About page | `frontend/src/main.ts`, `frontend/src/style.css` | New route `/about`. Content: 2-3 sentence bio, LinkedIn link, "Why I built this" (2 sentences), data sources, methodology note, "Content accurate as of June 2026, refreshed quarterly." Add "About" link to sidebar footer next to "Contact". |
| 6 | Update category labels | `frontend/src/main.ts`, `frontend/src/content/render.ts` | Rename categories to match the positioning: "Today's rails" → "The technology" → "The new instruments" → "Markets & scale" → "Rules & reality" → "Reference". Extract CATEGORIES to `registry.ts` to eliminate the duplication between main.ts and render.ts. |

### Risks and rollback
- Low risk. Copy and CSS changes. No structural changes to routing or content model.
- The CATEGORIES extraction (item 6) touches two files — test that sidebar and topic eyebrow still show correct categories.
- Rollback: `git revert`.

### Acceptance criteria
- [ ] Homepage says "Banking Rails to Digital Finance" with the positioning statement
- [ ] Hero section visually shows the three-layer contrast (customer / banking system / digital finance)
- [ ] Sidebar header matches the rebrand
- [ ] Browser tab says "Banking Rails to Digital Finance"
- [ ] `/about` route renders with bio, LinkedIn link, methodology, "as of" date
- [ ] "About" link appears in sidebar footer
- [ ] Categories are defined in one place (registry.ts), imported by main.ts and render.ts
- [ ] Topic eyebrow shows correct category name

### Test checklist
- [ ] Homepage renders with new branding and hero
- [ ] Hero is responsive (stacks on mobile, side-by-side on desktop)
- [ ] Sidebar shows updated branding
- [ ] About page accessible via sidebar link and direct URL `/about`
- [ ] All topic pages still render correctly (category eyebrow, prev/next)
- [ ] Search still works in sidebar
- [ ] Mobile hamburger still works

### Commit
```
Rebrand: Banking Rails to Digital Finance, hero section, About page
```

---

## Phase 3 — First signature interaction: Payment Rail Explorer

**Goal:** Build the defining interactive feature. This is what makes the product interaction-led, not just content-led. It should be impressive enough to screenshot for LinkedIn and useful enough to reference in a meeting.

### Architecture

**New files:**
- `frontend/src/data/rails.ts` — structured data for all 10 rails
- `frontend/src/viz/railExplorer.ts` — the interactive component
- CSS additions to `frontend/src/style.css`

**Not a new route.** The explorer lives as:
- A preview on the homepage (compact mode — select a rail, see key facts)
- A full version accessible via a "Explore all rails →" button that expands it or scrolls to a dedicated section

**Why not a new route:** The current app structure is sidebar + content area. Adding `/rails` as a standalone page would create a different navigation paradigm. Instead, the explorer is a component that can be placed on the homepage and potentially embedded in topic pages later.

### Data structure (`rails.ts`)

```typescript
export interface PaymentRail {
  id: string;
  name: string;
  type: 'message' | 'account' | 'token' | 'asset-settlement';
  typeLabel: string; // "Message-based", "Account-based", "Token-based", "Asset settlement"

  // What moves
  whatMoves: string; // "Payment instruction", "Central bank reserves", "Tokenised deposit", etc.

  // Participants
  participants: string[];

  // Speed & finality
  customerSpeed: string;        // What the customer sees: "Instant", "1-3 days"
  actualSettlement: string;     // When money actually moves: "T+1", "Atomic", "Same day"
  finalityType: string;         // "Immediate irrevocable", "Probabilistic", "Deferred"
  finalityDetail: string;       // Expanded explanation

  // Operations
  reconciliation: string;       // "None needed", "Bilateral T+1", "Multilateral"
  liquidityModel: string;       // "Pre-funded nostro", "Central bank reserves", "Collateralised"

  // Assessment
  keyRisks: string[];
  bestUseCases: string[];
  whatItImproves: string;
  whatItDoesNotSolve: string;

  // Authored perspective
  bankingReality: string;       // "How it actually works in practice"
  digitalFinanceRelevance: string; // "Why this matters for DLT"

  // Executive vs practitioner views
  executiveSummary: string;     // 2-3 sentences max
  practitionerDetail: string;   // Operational depth, real numbers
}
```

10 rails:
1. Cards (Visa/Mastercard)
2. Faster Payments / UPI / Pix
3. CHAPS / RTGS
4. SWIFT / correspondent banking
5. CLS
6. Open Banking (PSD2/A2A)
7. Stablecoins (USDC/USDT)
8. Deposit tokens (Kinexys/Fnality)
9. Wholesale CBDC (mBridge/Agorá)
10. Tokenised asset settlement (DvP on shared ledger)

### Component design (`railExplorer.ts`)

**Modes:**
- **Inspect mode** (default): Select one rail. See all its details in a structured card.
- **Compare mode**: Select two rails. See them side-by-side with differences highlighted.
- **View toggle**: "Executive" (summary, risks, use cases) vs "Practitioner" (settlement detail, liquidity, reconciliation, operational notes).

**Visual design:**
- Rail selector: horizontal scrollable row of pill buttons, grouped by type (message / account / token / asset-settlement) with subtle color coding per type
- Selected rail(s) render in a structured card below
- Callout banner at bottom: "Fast does not always mean final. Digital does not always mean tokenised."
- Animation: card content fades in on selection change (150ms). No gratuitous animation.
- Mobile: pills wrap, cards stack vertically, compare mode becomes toggle-between instead of side-by-side

**Keyboard accessibility:**
- Tab through rail pills, Enter/Space to select
- Arrow keys to move between rails in the selector
- `aria-selected`, `role="tablist"` / `role="tab"` semantics

**Reduced motion:**
- Wrap entrance animations in `@media (prefers-reduced-motion: reduce)` — disable transitions, show content immediately

**Premium feel (not crypto-neon):**
- Use the existing ink/amber/teal palette
- Type-based color coding: message-based = `--text-dim` (grey), account-based = `#7AA7D9` (blue), token-based = `var(--amber)`, asset-settlement = `var(--teal)`
- Subtle left-border accent on cards matching the type color
- Monospace for technical values (settlement times, finality types)
- Space Grotesk for headings

### Integration

**Homepage placement:**
- After the hero section, before the topic grid
- Compact mode: show rail selector + one selected rail card
- "Explore all rails →" button expands to full mode (or could link to `/rails` if we decide a dedicated route is better after user testing)

**Content model:**
- The rail explorer is NOT a content block type. It is a standalone component rendered directly by main.ts on the homepage and potentially reusable elsewhere.
- It imports data from `rails.ts` — no dependency on the topic content model.

### Risks and rollback
- Medium risk. This is the largest single addition. New component, new data file, homepage integration.
- The component is additive — it doesn't modify any existing file except main.ts (to add the homepage section) and style.css (new styles).
- If the component has issues, removing the homepage section reverts to the previous state.
- Rollback: delete `rails.ts` and `railExplorer.ts`, remove the homepage section from main.ts.

### Acceptance criteria
- [ ] Homepage shows rail selector with 10 rails
- [ ] Clicking a rail shows its details in a structured card
- [ ] Compare mode: selecting two rails shows side-by-side with differences highlighted
- [ ] Executive/Practitioner toggle changes the level of detail shown
- [ ] Type-based color coding is visible on rail pills and cards
- [ ] Callout banner "Fast does not always mean final..." is present
- [ ] Mobile: pills wrap, cards stack, compare mode works
- [ ] Keyboard: Tab through pills, Enter to select, view toggles via keyboard
- [ ] Reduced motion: animations disabled when prefers-reduced-motion is set
- [ ] All existing topic pages still work unchanged
- [ ] Data is in rails.ts, not hardcoded in the component

### Test checklist
- [ ] Select each of the 10 rails → correct data shown
- [ ] Compare mode: select Cards vs Stablecoins → differences clear
- [ ] Toggle Executive → Practitioner → content changes
- [ ] Mobile viewport (375px) → pills wrap, no overflow
- [ ] Keyboard-only navigation through the entire component
- [ ] Set prefers-reduced-motion: reduce → no animations
- [ ] Navigate to a topic → back to homepage → explorer state preserved or cleanly reset
- [ ] `npm run build` succeeds with no TS errors

### Commit
```
Add Payment Rail Explorer: 10-rail comparison with inspect/compare/view modes
```

---

## Phase 4 — Content authority upgrade

**Goal:** Add the two missing topics that establish thought leadership, plus two new block types for authored perspective.

### Changes

| # | Change | File(s) | Detail |
|---|--------|---------|--------|
| 1 | Callout block type | `frontend/src/types.ts`, `frontend/src/content/types.ts`, `frontend/src/viz/callout.ts` (new), `frontend/src/content/render.ts`, `frontend/src/style.css` | New `kind: 'callout'` — amber left border, subtle background, author perspective. Used for key claims and strategic insights. |
| 2 | Comparison block type | `frontend/src/types.ts`, `frontend/src/content/types.ts`, `frontend/src/viz/comparison.ts` (new), `frontend/src/content/render.ts`, `frontend/src/style.css` | New `kind: 'comparison'` — two-column cards with highlighted differences. For instrument-vs-instrument comparisons. |
| 3 | Deposit tokens topic | `frontend/src/content/modules/21-deposit-tokens.ts` (new), `frontend/src/content/registry.ts`, `frontend/src/main.ts` (categories) | Full topic: what deposit tokens are, how they differ from stablecoins, real products (Kinexys, Fnality, Partior, Citi, HSBC), walled garden problem, Kinexys case study. Uses callout and comparison blocks. |
| 4 | What's next topic | `frontend/src/content/modules/22-whats-next.ts` (new), registry, categories | Authored views: deposit token thesis, convergence question, interoperability bet, retail CBDC assessment, practical recommendations. Framed as "what I see happening based on current trajectory." Uses callout blocks. |
| 5 | Update registry + categories | `frontend/src/content/registry.ts` | Add deposit-tokens after tokenization in "The new instruments". Add whats-next before glossary in a new "Outlook" category. |
| 6 | Update glossary | `frontend/src/content/modules/17-glossary.ts` | Add: deposit token, programmable payments vs programmable money, payment orchestration, open banking, PSD2, wrapped token, oracle, FMI, CSD, collateral mobility. |

### Risks and rollback
- Low risk. All additive — new files, new block types, new registry entries.
- Existing topics are untouched.
- Rollback: delete new files, remove registry entries.

### Acceptance criteria
- [ ] Callout blocks render with amber left border and distinct styling
- [ ] Comparison blocks render two-column cards with differences highlighted
- [ ] Deposit tokens topic is accessible at `/topic/deposit-tokens`
- [ ] What's next topic is accessible at `/topic/whats-next`
- [ ] Both new topics appear in sidebar under correct categories
- [ ] Glossary includes all new terms
- [ ] Prev/next navigation works correctly with new topics inserted

### Test checklist
- [ ] Navigate to deposit tokens → all blocks render (text, comparison, callout, case, quiz)
- [ ] Navigate to what's next → callout blocks render with correct styling
- [ ] Sidebar shows new topics in correct position
- [ ] Prev/next from tokenization → deposit tokens works
- [ ] Glossary search finds "deposit token"
- [ ] `npm run build` succeeds

### Commit
```
Content authority: deposit tokens topic, what's next topic, callout/comparison blocks
```

---

## Phase 5 — Visual quality upgrade

**Goal:** Elevate the weakest visual components. Matrix tables are the most-used viz but the least impressive.

### Changes

| # | Change | File(s) | Detail |
|---|--------|---------|--------|
| 1 | Improve matrix | `frontend/src/viz/matrix.ts`, `frontend/src/style.css` | Add alternating row backgrounds, subtle left-border color per item, cell text wrapping instead of overflow. Add cursor:pointer on rows. Add hover state. |
| 2 | Improve timeline | `frontend/src/viz/timeline.ts`, `frontend/src/style.css` | Ensure marker colors match status (done=teal, upcoming=amber, deadline=coral). Add subtle connecting line between markers. |
| 3 | Widen flow diagrams | `frontend/src/style.css` | Change `svg.flow { max-width: 500px }` to `max-width: 700px` on screens >768px. |
| 4 | Topic card accents | `frontend/src/main.ts`, `frontend/src/style.css` | Add a subtle left-border color per category on topic cards (same color used for the rail type coding). |
| 5 | Sidebar category progress | `frontend/src/main.ts` | Show "3/4" next to each category header in the sidebar (topics explored / total in category). |
| 6 | prefers-reduced-motion | `frontend/src/style.css` | Add `@media (prefers-reduced-motion: reduce)` to disable all animations and transitions. |

### Risks and rollback
- Low risk. CSS and minor JS changes. No content changes.
- Rollback: `git revert`.

### Acceptance criteria
- [ ] Matrix tables have alternating row backgrounds and hover states
- [ ] Timeline markers are colored by status
- [ ] Flow diagrams use available width on desktop
- [ ] Topic cards have category-colored left borders
- [ ] Sidebar shows per-category progress counts
- [ ] Animations disabled when prefers-reduced-motion is set

### Test checklist
- [ ] Open a topic with a matrix → hover rows, see alternating bg
- [ ] Open regulation (timeline) → markers colored by status
- [ ] Open a flow diagram topic on wide screen → wider than before
- [ ] Homepage topic cards have colored borders
- [ ] Sidebar category headers show progress counts
- [ ] Enable reduced-motion in OS settings → no animations

### Commit
```
Visual upgrade: matrix, timeline, flow width, card accents, reduced motion
```

---

## Phase 6 — Second signature interaction: Settlement Finality Visualiser

**Goal:** Teach that customer speed, technical confirmation, legal finality, liquidity availability, and reconciliation are five different things that happen at different times.

### Architecture
- New data file: `frontend/src/data/finality.ts`
- New component: `frontend/src/viz/finalityVisualiser.ts`
- Reuses the rail data from `rails.ts` for consistency
- Interactive timeline showing the 5 stages for a selected payment type
- Could be placed on settlement topic page or as a second homepage section

### Risks and rollback
- Low risk. Fully additive.
- Defer detailed design until Phase 3 (Rail Explorer) is shipped and validated.

### Acceptance criteria
- [ ] Select a payment type → see 5-stage timeline with actual durations
- [ ] Compare two payment types → timelines side by side
- [ ] Clear visual distinction between "fast" and "final"

### Commit
```
Add Settlement Finality Visualiser
```

---

## Phase 7 — Share / export

**Goal:** Enable distribution. Execs and LinkedIn audiences receive artefacts, not website visits.

### Changes
| # | Feature | Detail |
|---|---------|--------|
| 1 | Copy topic link | Button in topic header. Copies current `/topic/:id` URL to clipboard with toast confirmation. |
| 2 | Copy executive insight | For topics with callout blocks, copies the callout text to clipboard formatted for pasting. |
| 3 | Copy comparison table | For comparison blocks, copies a plain-text table to clipboard. |
| 4 | Share on LinkedIn | Opens LinkedIn share dialog with pre-filled URL and title. |
| 5 | PNG export (later) | For flow diagrams and scale bars, export the SVG as PNG. Defer to after core share features ship. |

### Risks and rollback
- Low risk. Additive UI buttons. Clipboard API is well-supported.

### Commit
```
Add share/export: copy link, copy insight, LinkedIn share
```

---

# What not to touch yet

| What | Why |
|------|-----|
| Backend architecture (Quarkus) | Working. No reason to change. |
| Chat widget | Working. Don't change interaction model until Rail Explorer is validated. |
| Quiz system | Working. Could evolve later but not a priority. |
| Content model refactor (module → topic naming in code) | Cosmetic. The UI already says "topic." Internal variable names don't affect users. |
| CI/CD | Manual deploy is fine for this project stage. |
| Light mode / theme toggle | Dark theme is distinctive and appropriate. Don't dilute. |
| Print stylesheet | Low priority. Share/export covers the distribution need. |
| Full-text search | Medium effort, low impact until content is finalised. |
| Third signature interaction | Don't design it until the first two are shipped and validated. |

---

# Commit plan

| Phase | Commit message | Files touched | Revertable? |
|-------|---------------|---------------|-------------|
| 1 | `Stabilise: fix counter, title, health check, dead files, font sizes` | main.ts, style.css, HealthResource.java (new), delete 2 files | Yes — single revert |
| 2 | `Rebrand: Banking Rails to Digital Finance, hero, About page` | main.ts, style.css, index.html, registry.ts, render.ts | Yes — single revert |
| 3 | `Add Payment Rail Explorer: 10-rail interactive comparison` | rails.ts (new), railExplorer.ts (new), main.ts, style.css | Yes — delete new files + revert main.ts/style.css |
| 4 | `Content authority: deposit tokens, what's next, callout/comparison blocks` | 4 new files, registry.ts, render.ts, types.ts, glossary.ts | Yes — delete new files + revert registry |
| 5 | `Visual upgrade: matrix, timeline, flow, cards, reduced motion` | matrix.ts, timeline.ts, style.css, main.ts | Yes — single revert |
| 6 | `Add Settlement Finality Visualiser` | 2 new files, style.css | Yes — delete new files |
| 7 | `Add share/export: copy link, copy insight, LinkedIn share` | main.ts or new share.ts, style.css | Yes — single revert |
