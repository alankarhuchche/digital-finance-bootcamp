# Site Excellence Backlog
**Generated:** 2026-07-07  
**Source:** Site Excellence Review (docs/reviews/site-excellence-review.md)  
**Status:** Awaiting human prioritisation

---

## Format

Each item: ID · Priority · Area · Topic(s) · Problem · Recommendation · Acceptance criteria · Phase · Risk · Effort

Priority: P1 (now) / P2 (next) / P3 (later)  
Effort: XS (<1h) / S (2–4h) / M (4–8h) / L (1–2d) / XL (2d+)

---

## Full Backlog

---

### SEX-01 · P1 · Engineering · Topic 25 + CSS
**Problem:** `swiftGatewayVisual.ts` (387 lines) and `sgv-*` CSS (~90 rules, line 2212+) are dead code retained on disk since Phase C1 cutover.  
**Recommendation:** Delete `frontend/src/viz/swiftGatewayVisual.ts`. Remove `sgv-*` CSS block from `style.css`. Run TSC + Vite build to confirm no regressions. Run INTEGRATION_STALENESS_REVIEW.  
**Acceptance criteria:** File deleted. TSC clean. Build clean. CSS byte count reduces by ~90 rules. No `sgv-*` references remain in any imported file.  
**Phase:** C2 (already named in repo)  
**Risk:** Low — file is confirmed unbundled since Phase C1  
**Effort:** XS

---

### SEX-02 · P1 · Accuracy · Topic 14 (Regulation)
**Problem:** MiCA July 2026 transition period deadline has now passed (as of this review date, 2026-07-07). The timeline block shows it as a future "deadline" event. The text may need updating to reflect what actually happened at enforcement.  
**Recommendation:** Check current MiCA enforcement status. Update timeline event status from `deadline` to `done` if enforcement is confirmed live. Update any forward-looking language.  
**Acceptance criteria:** Timeline event status reflects current reality. No language implies July 2026 is a future date.  
**Phase:** Content maintenance  
**Risk:** Low (text update only)  
**Effort:** XS

---

### SEX-03 · P1 · Accuracy · Topic 10 (Market sizing) + Topic 23 (Stablecoin mkt structure)
**Problem:** USDT market cap in topic 23 ($185–188B) may be stale relative to the $320B+ total stablecoin supply figure in topic 10. DeFi TVL ($85B), stablecoin supply ($320B+), and individual figures will drift quickly.  
**Recommendation:** Cross-check USDT figure (topic 23 scale block) against current CoinMarketCap/DefiLlama data. Update the data items in the scale block. Add a visible "figures as of [date]" note if not already present. Consider adding `updatedAt` to data-bearing blocks.  
**Acceptance criteria:** USDT figure in topic 23 consistent with total supply figure in topic 10. Data date visible or clearly qualified in text.  
**Phase:** Content maintenance  
**Risk:** Low (data update only)  
**Effort:** XS

---

### SEX-04 · P1 · Engineering · Viz audit
**Problem:** `finalityVisualiser.ts` and `railExplorer.ts` exist in `frontend/src/viz/` but do not appear as block kinds in any live topic. Build analysis: `finalityVisualiser` IS bundled by Vite (25.26 kB chunk — large), so it is imported somewhere (likely `render.ts`) even if no live topic block uses it. `railExplorer` does NOT appear in the build output, suggesting it is not imported at all.  
**Recommendation:** (a) Grep `render.ts` for `finalityVisualiser` import and any `finality-visualiser` case block — if present, either add a topic that uses it or remove the import and delete the file. (b) Confirm `railExplorer.ts` is not imported anywhere and delete if unused. Both files are large enough to care about: `finalityVisualiser` adds ~25 kB (gzip: 7 kB) to the bundle for unknown benefit.  
**Acceptance criteria:** `finalityVisualiser` case is either live in a topic or removed from render.ts and deleted. `railExplorer.ts` confirmed unimported and deleted or assigned to a topic. Build chunk count reduces accordingly.  
**Phase:** C2 audit  
**Risk:** Low — audit + targeted deletion  
**Effort:** S (needs render.ts read + targeted edits, not just grep)

---

### SEX-05 · P2 · Visual · Topic 01 (Existing rails)
**Problem:** Topic 01 has a static SVG flow diagram for cross-border payments but no animated visual. It is one of the most foundational topics and currently reads as a text-heavy page with a static flow.  
**Recommendation:** Wire `bankRouteMap` visual into topic 01 as the primary interactive element. The bank-route-map renderer (`bankRouteMap.ts`) is fully implemented with 5 scenarios, insight panel, and mobile strip — it just needs a topic to live in. OR: if topic 01 is not the right home, add as `what-actually-moves` companion in topic 24.  
**Acceptance criteria:** `bankRouteMap` visual renders in topic 01 (or topic 24) with all 5 scenarios working. Topic passes INTEGRATION_STALENESS_REVIEW and PREMIUM_VISUAL_REVIEW.  
**Phase:** New content  
**Risk:** Low — visual is complete, just needs block kind wiring in the topic and render.ts case  
**Effort:** S

---

### SEX-06 · P2 · IA · Site-wide
**Problem:** The "Today's rails" category places forms-of-money (02) and risk-benefit (03) before the technology section, meaning a linear reader encounters stablecoin risk analysis before understanding what DLT or a stablecoin mechanism is.  
**Recommendation:** Move `what-actually-moves` (24) to position 3 in "Today's rails" (after existing-rails, before forms-of-money). It is the conceptual bridge between traditional payments and digital instruments. Update `CATEGORIES` in `registry.ts`.  
**Revised order:** `payments-fundamentals` → `existing-rails` → `what-actually-moves` → `swift-bank-gateway` → `forms-of-money` → `risk-benefit`  
**Acceptance criteria:** Registry categories updated. Build clean. Navigation order reflects new sequence. Bridge paragraphs in affected topics updated to match new neighbour topics.  
**Phase:** IA polish  
**Risk:** Medium — changes navigation order, may affect reader mental models that assume current order  
**Effort:** S

---

### SEX-07 · P2 · Visual · Topic 02 (Forms of money)
**Problem:** money-cards visual is static — the user can see 6 cards but cannot compare or interact. For a topic titled "forms of money" this is the primary visual and it does less than the complexity of the concept warrants.  
**Recommendation:** Add a "compare" mode to `moneyCards.ts` — user selects two cards and sees a side-by-side comparison of key properties (backed by what, issued by whom, deposit insured, redemption mechanism). No new data required — properties already exist on each card's `detail` field.  
**Acceptance criteria:** Compare mode works on desktop and mobile. Two cards can be selected. Comparison panel shows key distinctions. Reduced-motion path passes.  
**Phase:** Visual enhancement  
**Risk:** Low — additive to existing component  
**Effort:** M

---

### SEX-08 · P2 · Visual · Topic 05 (Crypto assets)
**Problem:** Topic 05 has a single matrix (5 asset categories) and text blocks. No interactive or animated visual. For a topic covering the full taxonomy of crypto assets, the matrix alone is thin.  
**Recommendation:** Add a taxonomy scatter or tree visual. Use the existing `scatter.ts` renderer (currently unused) to place 5 asset types on axes of "issuer control" (x) vs "claim on what" (y). Alternatively, a `comparison` block comparing native token / utility token / governance token / security token / stablecoin would provide structured depth without a new visual.  
**Acceptance criteria:** Topic 05 has at least one structured comparison element beyond the current matrix. Page passes PREMIUM_VISUAL_REVIEW.  
**Phase:** Visual enhancement  
**Risk:** Low  
**Effort:** S

---

### SEX-09 · P2 · Visual · Topic 07 (CBDCs)
**Problem:** Topic 07 has a retail-vs-wholesale matrix and two case studies but no timeline. The CBDC landscape is inherently a time-series story (who launched when, what happened to adoption). A timeline would make the "who's live, who's piloting, who's out" picture more scannable.  
**Recommendation:** Add a timeline block showing CBDC launches: Sand Dollar (2020), eNaira (2021), JAM-DEX, e-CNY pilot, e-Rupee pilot, reclassification events, eNaira wind-down (if applicable). Use existing `timeline.ts` renderer.  
**Acceptance criteria:** Timeline block added to topic 07. Events sourced and dated. Consistent with global-initiatives topic data.  
**Phase:** Content expansion  
**Risk:** Low  
**Effort:** S

---

### SEX-10 · P2 · Visual · Topic 15 (Bank strategy)
**Problem:** Topic 15 has a strategy matrix (build/partner/consortium/do nothing) and text explaining JPMorgan, Standard Chartered, HSBC, DBS, SocGen. No flow diagram exists for the decision logic. For a topic about strategic choices, a decision-lens flow would be more useful than a matrix alone.  
**Recommendation:** Add a flow or stack block with a "strategic decision lens" for banks evaluating digital asset strategy: deposit at risk? → yes → build own token or join consortium; no → offer access or do nothing. Include risk/reward per path. Reuse existing block kinds.  
**Acceptance criteria:** Decision flow or stack added. Consistent with existing matrix. No content duplication.  
**Phase:** Content expansion  
**Risk:** Low  
**Effort:** S

---

### SEX-11 · P2 · Content · Missing topic: Cross-border remittances
**Problem:** Remittances are currently scattered across topics 01 (rails), 10 (market sizing, unit economics), and 11 (global). No standalone treatment of the $650B+ corridor economy, the competitive stablecoin threat, or the regulatory treatment in major corridors (US-Mexico, US-Philippines, GCC-South Asia).  
**Recommendation:** Add a new topic "Cross-border remittances" under "Today's rails" category. Content: corridor economics, traditional fee structure (6–8%), stablecoin competitive position (<1%), regulatory treatment per corridor (Stellar, TRON, Solana dominant chains), MoneyGram integration precedent, World Bank data.  
**Acceptance criteria:** New module file, registry entry, CATEGORIES updated. Minimum: opening text, fee-comparison matrix, flow showing money movement, case study (one corridor in depth), quiz. INTEGRATION_STALENESS_REVIEW passes.  
**Phase:** New topic  
**Risk:** Low (new content, no regressions)  
**Effort:** L

---

### SEX-12 · P2 · Content · Missing topic: ISO 20022 migration
**Problem:** ISO 20022 is mentioned in topics 01, 25, and 13 but always as context, never as the focus. A banking practitioner audience will have encountered ISO 20022 CBPR+ migration directly. The migration challenges (data quality, LEI lookup, structured address fields, truncation risks, correspondent bank readiness gaps) deserve their own treatment.  
**Recommendation:** Add a new topic "ISO 20022 in depth" under "Today's rails" or as a SWIFT-adjacent topic. Content: migration timeline, CBPR+ specific requirements, structured data fields, truncation risk, practical operating challenges.  
**Acceptance criteria:** New module file with timeline, matrix of key field changes, case study of a migration challenge, quiz.  
**Phase:** New topic  
**Risk:** Low  
**Effort:** L

---

### SEX-13 · P2 · UX · Glossary
**Problem:** The glossary is two large text blocks (A–I and K–Z) with HTML paragraph tags. Useful content but zero UX. No search, no filter, no jump links. A user looking for "DvP" has to scroll through or use browser Cmd+F.  
**Recommendation:** Replace static text blocks with a searchable glossary component. Add a search input that filters terms as the user types. Keep existing term content unchanged — just add JS filter logic over the existing rendered terms. Alternatively: render each term as a `<dt><dd>` pair with a data-term attribute and filter by it.  
**Acceptance criteria:** User can type "DvP" and see only matching terms. Filter works on mobile. Accessibility: keyboard navigable. No content changes required.  
**Phase:** UX polish  
**Risk:** Low  
**Effort:** M

---

### SEX-14 · P2 · UX · Index page
**Problem:** The index page shows all topics as a flat list (within categories). No recommended path, no reading time, no "start here" signal. A new reader doesn't know where to begin.  
**Recommendation:** Add a "recommended path" banner or sidebar callout on the index for first-time readers: "New to digital finance? Start with Payments fundamentals → What actually moves → Existing rails." Add estimated reading time (e.g. "~10 min") to each topic card.  
**Acceptance criteria:** Index shows at least one "start here" signal. Reading time estimate visible on topic cards. Existing layout preserved.  
**Phase:** UX polish  
**Risk:** Low  
**Effort:** S

---

### SEX-15 · P3 · Visual · Topic 09 (DeFi)
**Problem:** DeFi topic has strong text (MEV, real yield, oracle manipulation, institutional DeFi) but no comparison matrix between DeFi protocols and their TradFi equivalents at a control level. The failure-modes topic does this in aggregate but not per-function.  
**Recommendation:** Add a matrix block to topic 09: DeFi function (AMM, lending, derivatives, staking) vs TradFi equivalent (exchange/clearing, repo/loan, structured desk, money market) with key control differences (CCP vs overcollateral, regulation status, finality type).  
**Acceptance criteria:** Matrix added without duplicating failure-modes topic content. Banking relevance test passes.  
**Phase:** Content enhancement  
**Risk:** Low  
**Effort:** S

---

### SEX-16 · P3 · Content · Missing topic: Crypto derivatives
**Problem:** Topic 09 mentions perpetuals briefly (GMX, dYdX) but derivatives mechanics — basis trades, funding rates, options pricing, structured products — are not covered. Relevant for institutional coverage given the growth of CME BTC futures, Deribit options, and bank-to-bank crypto derivative ISDA documentation.  
**Recommendation:** Add a topic "Crypto derivatives" under "Markets & scale." Content: perpetuals vs expiring futures, funding rates, options basics, institutional products (CME, LBMA gold futures analogy), ISDA crypto annexes, regulatory treatment (CFTC jurisdiction).  
**Acceptance criteria:** New topic, minimum viable: opening, two matrices (product types, regulatory treatment), case study, quiz.  
**Phase:** New topic  
**Risk:** Low  
**Effort:** L

---

### SEX-17 · P3 · Visual · Topic 03 (Who carries the risk)
**Problem:** Topic 03 is two matrices and text — no flow diagram. The stakeholder risk chain (customer → e-money issuer / bank → central bank / deposit protection scheme) would be clearer as a flow showing where risk sits under different instrument types.  
**Recommendation:** Add a flow block showing risk positions per instrument: who the customer has a claim against, what happens if the issuer fails, what deposit insurance covers.  
**Acceptance criteria:** Flow block added. Consistent with forms-of-money (02) and deposit-tokens (21) framing. No duplication.  
**Phase:** Visual enhancement  
**Risk:** Low  
**Effort:** S

---

### SEX-18 · P3 · UX · Progress persistence
**Problem:** The sidebar checkmark indicates "visited" but there is no durable progress storage. Reloading the page resets progress. Users cannot save their position across sessions.  
**Recommendation:** Persist visited-topic state to `localStorage`. Key: `digital-finance-visited`, value: JSON array of topic IDs. Restore on load. Add "reset progress" option in sidebar footer. No backend required.  
**Acceptance criteria:** Visited state persists across page reloads. Topics marked as read remain marked. Reset option available. Does not affect non-visited rendering.  
**Phase:** UX polish  
**Risk:** Low  
**Effort:** S

---

### SEX-19 · P3 · Visual · Topic 11 (Global initiatives)
**Problem:** Region map exists but its interaction quality (tap/click, label rendering, accessibility on mobile) has not been browser-verified in this review. If pins are not tappable on mobile, the visual is decorative.  
**Recommendation:** Browser-test region map on mobile (375px). Verify: each pin is tappable, detail panel appears, accessible by keyboard. If broken on mobile, add a list-view accordion below the map as fallback.  
**Acceptance criteria:** All 16 country pins respond to tap/click. Detail shows country status and project name. Mobile fallback exists or primary map works at 375px.  
**Phase:** QA / UX verification  
**Risk:** Low  
**Effort:** S

---

### SEX-20 · P3 · Content · What's next topic sharpening
**Problem:** Topic 22 (What's next) is well-written but the "contrarian call" and "where I could be wrong" sections are more cautious than the rest of the site's voice. Some views could be stated with more specificity — e.g. the "interoperability layer" thesis needs a named candidate (SWIFT ISO 20022 + API, Fnality, Canton, BIS Innovation Hub).  
**Recommendation:** Review the "Where banks should do now" matrix rows — some are generic (e.g. "evaluate stablecoin or multi-CBDC corridors"). Sharpen with named pilots or participants. Add a row for ISO 20022 data quality investment as a prerequisite for any cross-border DLT pilot.  
**Acceptance criteria:** At least 2 matrix rows updated with specific named initiatives. One new row added (ISO 20022 / data quality prerequisite). Contrarian call retains its honest uncertainty but with more named specificity.  
**Phase:** Content update  
**Risk:** Low  
**Effort:** S

---

## Now / Next / Later Tiers

### Now (P1) — do before next major release
- SEX-01: Delete swiftGatewayVisual.ts + sgv-* CSS (Phase C2)
- SEX-02: MiCA July 2026 deadline status update
- SEX-03: Market-sizing data freshness check + USDT figure cross-check
- SEX-04: Audit finalityVisualiser.ts + railExplorer.ts

### Next (P2) — next planned sprint or cycle
- SEX-05: Wire bankRouteMap visual into topic 01 or 24
- SEX-06: Move what-actually-moves to position 3 in Today's rails
- SEX-07: money-cards compare mode (topic 02)
- SEX-08: Crypto assets visual depth (topic 05)
- SEX-09: CBDC timeline block (topic 07)
- SEX-10: Bank strategy decision flow (topic 15)
- SEX-11: Cross-border remittances new topic
- SEX-12: ISO 20022 migration new topic
- SEX-13: Glossary search/filter UX
- SEX-14: Index "start here" + reading time

### Later (P3) — backlog for future cycles
- SEX-15: DeFi vs TradFi control matrix (topic 09)
- SEX-16: Crypto derivatives new topic
- SEX-17: Risk-benefit stakeholder flow (topic 03)
- SEX-18: Progress persistence to localStorage
- SEX-19: Region map mobile verification (topic 11)
- SEX-20: What's next topic sharpening

---

## Top 10 Premium Changes

If you could only do 10 things, these 10 would move the site furthest toward its north star.

| Rank | ID | Change | Why |
|------|----|--------|-----|
| 1 | SEX-05 | Wire bankRouteMap into topic 01 | Most impactful visual upgrade available — full visual already implemented, just needs wiring. Topics 01 and 24 are foundational. |
| 2 | SEX-06 | Move what-actually-moves to #3 in Today's rails | Fixes the most significant IA gap. The topic is already live; this is a registry order change. |
| 3 | SEX-01 | Delete dead code (Phase C2) | Maintenance hygiene. Reduces bundle risk and removes ~90 CSS rules. Deferred too long. |
| 4 | SEX-13 | Searchable glossary | The glossary is one of the most-referenced pages and currently has no UX. Search transforms it from an index to a reference tool. |
| 5 | SEX-07 | money-cards compare mode | Forms of money is the third topic in the recommended reading path. The current visual is passive for an interactive concept. |
| 6 | SEX-11 | Cross-border remittances new topic | The single biggest gap in the payments coverage. Currently scattered across three topics. A standalone treatment completes the arc. |
| 7 | SEX-02 | MiCA deadline status update | The July 2026 deadline has passed. This is a current-accuracy fix for the most read regulatory topic. |
| 8 | SEX-14 | Index start-here signal + reading time | The index is where readers orient. No entry point for new users is a conversion and retention miss. |
| 9 | SEX-09 | CBDC timeline block | CBDCs topic needs one more structured visual. A timeline of launches and reclassifications is the natural fit and uses existing renderer. |
| 10 | SEX-03 | Market data freshness check | Topic 10 is the site's most data-perishable page. Keeping figures current prevents the site from looking stale. |

---

## Notes for Human Review

- This backlog was generated by a full automated read of all 25 content modules, all viz source files, style.css, and registry.ts. It was not generated by live browser testing.
- Visual interaction quality (animations, mobile tap, accessibility) was inferred from source code — not verified in a live browser.
- Market data accuracy was assessed by internal cross-reference only. External source verification recommended before publishing data updates.
- `railExplorer.ts` and `finalityVisualiser.ts` were not fully read — SEX-04 covers this audit gap.
- Items SEX-01 through SEX-04 are the only P1 items. None require new writing or visual design — they are all either deletion/cleanup, accuracy updates, or audits.
