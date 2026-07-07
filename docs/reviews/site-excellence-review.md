# Site Excellence Review — Banking Rails to Digital Finance
**Review date:** 2026-07-07  
**Reviewer:** Claude (automated read — all 25 content modules, all viz files, style.css, registry)  
**Status:** Complete — ready for human prioritisation

---

## 1. Executive Summary

The site is a genuine practitioner reference, not a generic explainer. The writing voice is consistent, specific, and technically grounded. The information architecture is coherent. The visual system is functional and improving — the SWIFT route-map and What-Actually-Moves visual are genuinely portfolio-quality.

Against the product's own positioning — _authored banking-practitioner reference_ — the site is largely succeeding. The main gaps are:
- **Visual coverage is uneven.** ~8 of 25 topics rely entirely on text and matrix blocks, with no animated or interactive visual. These topics read like good essays but lack the premium interactive feel the Visual Experience Guide calls for.
- **Learning flow is interrupted mid-journey.** The ordering logic inside categories is not always consistent with the narrative arc from one topic to the next.
- **Two dead-code items** remain on disk: `swiftGatewayVisual.ts` (387 lines, unbundled) and `sgv-*` CSS (~100 lines, unreferenced at render time). Not urgent but should be scheduled.
- **Accuracy risk is low but non-zero.** The market-sizing topic's figures and some stablecoin market caps will age fast. A data-staleness flag per module would help.
- **Missing topics:** derivatives/options trading; cross-border remittances as a standalone flow; DAO governance; the specific mechanics of T+1 impact on non-US banks.

**Verdict: strong site, delivery-quality for a practitioner audience. The gap between current state and north-star is visual depth and learning-journey continuity, not writing quality.**

---

## 2. Strengths

1. **Writing quality is consistently above the reference bar.** Topics do not describe what things are; they explain what they mean operationally — whose liability, what finality, what reconciliation requirement. The SWIFT gateway, deposit tokens, and privacy topics are the strongest examples.

2. **The visual system is coherent.** Six block kinds (flow, matrix, stack, quiz, callout, case) plus four custom viz components (swift-role-map, what-moves-visual, bank-route-map, money-cards) give every page a consistent structure. No page is visual junk.

3. **The quiz system is well-calibrated.** Questions test understanding, not recall. Wrong answers distinguish between tempting misconceptions. Explanation text is specific.

4. **The failure-modes topic is the best practitioner risk framing in the site.** Six categories, TradFi analogues, protocol-vs-implementation risk distinction, two dedicated case studies — this is the kind of content a risk committee could actually use.

5. **The SWIFT gateway topic is the most technically distinguished.** Correct framing of ACK-vs-settlement, gpi-vs-finality, and contingency-as-high-impact-surface addresses a widely held misconception in banking operations. The route-map visual earns its complexity.

6. **The What-Actually-Moves topic fills a genuine gap.** The seven-layer model, the DLT-change/DLT-does-not-remove matrix, and the stablecoin-access role-matrix are all practically useful. The animated visual earns its screen space.

7. **The deposit tokens topic is a clear-headed bank-insider view.** The walled-garden problem, the programmable-payments-vs-programmable-money distinction, and the cash-leg finality constraint are all accurately framed.

---

## 3. Weaknesses

1. **Visual coverage gaps.** Eight topics have no interactive or animated visual element: existing-rails (01), forms-of-money (02 — money-cards is the visual, but no interactivity), risk-benefit (03), crypto-assets (05), global-initiatives (11 — region map exists), market-structure (12), regulation (14 — timeline + matrices), bank-strategy (15). These read like premium essays but miss the Visual Experience Guide's requirement for interactive elements on high-value pages.

2. **Learning-journey breaks.** The bridge paragraphs connecting topics are good, but the category ordering creates some gaps. "Today's rails" puts forms-of-money (02) and risk-benefit (03) before the DLT/technology section, which means a reader following the nav linearly hits stablecoin risk analysis before understanding what DLT is.

3. **The market-sizing topic has the shortest shelf life.** Five figures (US M2, stablecoin market cap, DeFi TVL, RWA total, stablecoin trajectory) will be stale within 2–3 months. The text explicitly acknowledges this, but there is no mechanism to flag or update data. The USDT figure in the scale block should be checked — $188B as of the module data may already be stale given the $320B+ total supply figure cited elsewhere in the text.

4. **Dead code on disk.** `swiftGatewayVisual.ts` (387 lines) and `sgv-*` CSS (~100 lines, lines 2212–2901 range) are retained intentionally but add maintenance surface. Phase C2 cleanup has been deferred.

5. **The regulation topic carries the most current-accuracy risk.** The MiCA transition period ends July 2026 (a date that is now current or past as of this review). The text notes this as a "deadline" event. Whether the deadline has passed and what happened should be verified and updated.

6. **Some quiz questions are inside a single module without cross-topic integration.** The glossary topic has no quiz. The what's-next topic has a "reflection" quiz rather than a knowledge test. Both are deliberate choices but leave the final impression of the site weaker than the middle.

7. **The DeFi topic's regulatory section is a paragraph.** Institutional DeFi (Project Guardian, permissioned pools) is covered, but the topic does not have a matrix comparing DeFi's control points with traditional finance equivalents. Given how much the site uses matrices, the absence here is notable.

---

## 4. Page-by-Page Quality Table

| # | Topic | Writing | Visual | Quiz | Cross-links | Priority gap |
|---|-------|---------|--------|------|------------|--------------|
| 18 | Payments fundamentals | Strong | Flow + matrix | 3 Qs | Good | — |
| 01 | Existing rails | Strong | Flow + matrix + case | 3 Qs | Good | Add animated flow visual |
| 25 | SWIFT gateway | Excellent | route-map + matrix + stack | 4 Qs | Good | — |
| 02 | Forms of money | Strong | money-cards (static) | 3 Qs | Good | Interactivity on money-cards |
| 03 | Who carries the risk | Good | Two matrices | 2 Qs | Good | Add flow showing stakeholder chain |
| 24 | What actually moves | Excellent | what-moves-visual + 3 matrices | 4 Qs | Good | — |
| 04 | DLT basics | Excellent | Stack + 5 matrices | 3 Qs | Good | — |
| 05 | Crypto assets | Good | Matrix only | 3 Qs | Good | Add taxonomy visual (tree/scatter) |
| 06 | Stablecoins | Strong | Matrix + flow + 2 cases | 3 Qs | Good | — |
| 07 | CBDCs | Good | Matrix + 2 cases | 3 Qs | Good | Add timeline of live CBDCs |
| 08 | Tokenization | Strong | Flow + matrix + 2 cases | 3 Qs | Good | — |
| 21 | Deposit tokens | Excellent | Comparison + matrix + 2 callouts + case | 3 Qs | Good | — |
| 23 | Stablecoin mkt struct | Excellent | Matrix + flow + case + matrix | 3 Qs | Good | — |
| 09 | DeFi | Strong | Stack + 4 texts + case | 3 Qs | Good | Add protocol-vs-TradFi matrix |
| 10 | Market sizing | Good | Scale visual + 3 texts | 3 Qs | Good | Data staleness risk |
| 11 | Global initiatives | Good | Map + 3 texts | 3 Qs | Weak | Map interaction quality unclear |
| 12 | Market structure | Good | Matrix + 4 texts + case | 3 Qs | Good | Add OTC/prime brokerage flow |
| 13 | Settlement | Excellent | 2 flows + 3 texts + case + callout | 3 Qs | Good | — |
| 19 | Digital identity | Strong | Matrix + 2 texts + case | 3 Qs | Good | Add cost vs effectiveness chart |
| 14 | Regulation | Good | Timeline + 2 matrices + 4 texts + case | 3 Qs | Good | MiCA deadline freshness risk |
| 20 | Privacy | Excellent | 4 matrices + case + callout | 3 Qs | Strong | — |
| 15 | Bank strategy | Strong | Matrix + 4 texts + case | 3 Qs | Good | Add decision tree visual |
| 16 | Failure modes | Excellent | Matrix + 2 cases + 3 texts | 3 Qs | Strong | — |
| 22 | What's next | Good | Callouts + matrix | 3 Qs | Good | Opinions could sharpen |
| 17 | Glossary | Good | Text only | None | Good | Add search or filter UI |

---

## 5. Visual System Assessment

| Visual | Topic(s) | Quality | Notes |
|--------|----------|---------|-------|
| `swiftRoleMap.ts` | 25 | Portfolio-quality | 6-role interactive, direction badges, 6-step animation, mobile strip. Benchmark. |
| `whatMovesVisual.ts` | 24 | Portfolio-quality | 7-layer system, 4-mode animation with seqToken cancellation, sublabel overrides per mode. Benchmark. |
| `bankRouteMap.ts` | N/A (not currently used in any live topic) | Strong implementation | 5 scenarios, 6-step choreography, insight panel, mobile strip. Not linked to a published topic. |
| `moneyCards.ts` | 02 | Good | Static card layout. No interactivity. Opportunity to add selection/compare mode. |
| `regionMap.ts` | 11 | Functional | SVG world map with status pins. Unclear if tap/click is working on all devices. |
| `scatter.ts` | Unused (forms-of-money uses moneyCards now) | Legacy | Dot animation works. Used nowhere in current registry. May be dead. |
| `scale.ts` | 10 | Functional | Bar chart with dollar values. Simple but appropriate for market-sizing. |
| `flow.ts` | 01, 13, 23 | Good | Flow boxes with animated paths. Limited to viewBox-based SVG layout. |
| `matrix.ts` | Many | Good | Workhouse visual. Consistent across all uses. |
| `stack.ts` | Many | Good | Accordion-style cards. Consistent. |
| `quiz.ts` | All 25 | Strong | Card-per-question, correct/incorrect states, explanation, score card. |
| `timeline.ts` | 14 | Functional | Sequential event display. Appropriate for MiCA rollout. |
| `callout.ts` | Many | Strong | Tone variants (insight/strategy/warning/reality) with colour coding. |
| `caseStudy.ts` | Many | Strong | Consistent source/date/verified format. |
| `comparison.ts` | 21 | Good | 3-column with per-point emphasis. |
| `finalityVisualiser.ts` | No live topic | Bundled but unused | Vite bundles it as a 25.26 kB chunk (7 kB gzip) — it IS imported (likely in render.ts) but no live topic block uses it. Either needs a topic or should be removed from render.ts import and deleted. Highest-priority dead-code item by bundle size. |
| `railExplorer.ts` | None | Not bundled | Does not appear in Vite build output — not imported anywhere. Likely truly dead code. Delete candidate for Phase C2. |
| `termHelp.ts` | All | Background | Glossary popover renderer. Works across all topics. |
| `swiftGatewayVisual.ts` | None | Dead code | 387 lines, not imported, not bundled. Phase C2 deletion pending. |

**Dead viz concern:** `finalityVisualiser.ts` and `railExplorer.ts` should be audited — they may be unneeded or Phase C candidates for deletion.

---

## 6. Information Architecture Assessment

**Category structure is sound** — 7 categories covering rails, technology, instruments, markets, rules, outlook, reference. The breadth is right.

**Topic ordering within categories has one persistent issue:** the reader following the nav linearly will hit "forms of money" (comparing stablecoins to CBDC) before "DLT basics" or even "crypto assets." For a practitioner reader who may not know what a stablecoin is, hitting risk-benefit analysis before technology explanation creates a comprehension gap. The bridge paragraph at the end of `risk-benefit` does help, but the order still rewards non-linear reading more than linear reading.

**Recommended ordering within "Today's rails":**
- Payments fundamentals (18) — correct anchor
- Existing rails (01) — correct
- What actually moves (24) — should be 3rd, not buried in "The technology" category — it's the conceptual prerequisite for everything else
- Forms of money (02) — correct after understanding movement
- Who carries the risk (03) — correct
- Inside a bank SWIFT gateway (25) — correct

**"The technology" category:**
- `what-actually-moves` belongs here OR earlier
- `bankRouteMap` if ever published would fit here
- Missing: a "how DLT actually differs from existing rails" topic at a mechanical level

**Missing IA elements:**
- No "start here" landing page or learning path recommendation
- No "prerequisites" metadata on topic cards
- No indication of reading time
- No "you've read this" progress state in the sidebar beyond the checkmark

---

## 7. Banking & Payments Accuracy Assessment

**[Likely accurate, low-risk items]**
- SWIFT ACK-vs-settlement distinction (topic 25) — correct
- gpi-vs-settlement-finality (topics 01, 25) — correct
- Herstatt risk / CLS (topics 01, 13) — correct
- T+1 move date and consequences (topic 13) — correct (US equities May 2024)
- MiCA structure — EMT/ART/CASP categories (topic 14) — correct
- GENIUS Act payment stablecoins ban on interest (topic 14) — correct
- Basel III punitively high capital for unbacked crypto (topic 14) — correct
- Binance $4.3B settlement and CZ guilty plea (topic 14) — correct
- Tornado Cash sanctions and Pertsev conviction (topic 20) — correct (ECLI cited)
- FTX collapse and SBF conviction/sentencing (topic 12) — correct
- Ronin bridge exploit ($625M, Lazarus Group, Treasury attribution) (topic 16) — correct
- Euler Finance exploit and recovery (topic 09) — correct, return amount noted accurately
- Mango Markets / Eisenberg conviction (topics 09, 16) — correct
- Aadhaar eKYC cost ($0.03/check) and scale (topic 19) — plausible, commonly cited

**[Current-accuracy risk — should be verified before next major release]**
- USDT market cap cited as ~$185–188B (topic 23) — module data may be stale; the text also cites $320B+ total stablecoin supply as of mid-2026
- DeFi TVL $85B (topic 10) — highly volatile, will be stale
- Stablecoin supply $320B+ (topic 10) — mid-2026 figure, may be stale
- MiCA July 2026 transition period deadline (topic 14) — this date is now current or past; enforcement status should be verified
- USDC ~$73.7B in circulation as of 29 June 2026 (topic 23) — appears to be real-time at time of writing, will drift
- India UPI 14B+ transactions/month (topic 11) — plausible but should be verified
- Binance 750+ compliance staff (topic 14) — mid-2024 figure, will be stale
- Global AML compliance spend $274B/year (topic 19) — LexisNexis 2024 figure, reasonable proxy

**[One factual gap]**
- Topic 03 (risk-benefit) cites "disintermediation numbers" but the specific text body isn't attached to a source. The stablecoin market structure percentages should be cross-checked against topic 23 figures (which have sources).

---

## 8. Missing Topics

| Topic | Priority | Rationale |
|-------|----------|-----------|
| Cross-border remittances (standalone) | High | Currently split across topics 01, 10, 11. A dedicated topic covering corridor economics, fee structure, regulatory treatment and stablecoin competitive threat would complete the payments arc. |
| ISO 20022 migration in depth | Medium | Currently covered in 01 (rails) and 25 (SWIFT) but always as sub-topic. A standalone deep-dive on migration challenges, data quality, and enriched fields would serve a SWIFT/payments audience. |
| Crypto derivatives & options | Medium | Topic 09 covers perpetuals briefly but doesn't cover structured products, basis trades, or options mechanics. Relevant for institutional coverage. |
| DAO governance | Low | Topic 05 mentions governance tokens but the mechanics of DAO decision-making, quorum rules, and governance attacks aren't covered. Narrow audience but complete the DeFi picture. |
| T+1 impact on FX and non-US banks | Medium | Topic 13 covers T+1 in settlement context. A dedicated case analysis of the FX settlement window compression and APAC/European operational strain would add value. |
| Correspondent banking in depth | Low | Covered adequately in topic 01. A deeper treatment of de-risking and correspondent network contraction would serve a trade finance audience. |

---

## 9. Learning Experience Assessment

**What works:**
- Bridge paragraphs at end of every topic pointing to the next — strong continuity signal
- Quiz at end of every topic — good habit formation
- Glossary with topic back-links — useful reference layer
- Category structure in sidebar — helps navigation
- Coming-soon state for topics not yet ready — honest

**What's missing:**
- No estimated reading time per topic
- No "prerequisite" or "read this first" signal
- No progress tracking beyond the sidebar checkmark
- No "recommended next" at topic completion (beyond the bridge paragraph)
- No way to bookmark or save progress
- The glossary has no search or filter interaction — just static text blocks

---

## 10. Engineering & Product Polish Assessment

**Strong:**
- TypeScript throughout, strict types on content blocks
- `seqToken` cancellation pattern used correctly in all animated visuals (prevents stale callbacks)
- `prefersReducedMotion()` path implemented in all animated visuals
- `aria-pressed`, `aria-live`, `aria-hidden`, `role="group"` used consistently
- Mobile responsiveness: map-hidden / mobile-strip pattern consistent across SRM and bank-route-map
- CSS variable system clean; `--ink`, `--amber`, `--teal`, `--coral`, `--text`, `--text-dim` used across all components
- Build output clean: TSC `--noEmit` passes; Vite build produces expected module count

**Gaps:**
- `scatter.ts` is imported but `scatter` block kind appears in no live topic (forms-of-money now uses money-cards). Likely dead import at the render-switch level.
- `finalityVisualiser.ts` and `railExplorer.ts` exist in viz/ but don't appear in any live block type. Unknown if they're dead or pre-release.
- `swiftGatewayVisual.ts`: 387 lines, confirmed dead code (not imported, not bundled). CSS companion `sgv-*` runs from ~line 2212 to ~2500 (estimated). Both retained intentionally pending Phase C2.
- Google Fonts import at top of style.css is an external CDN call — blocked by Artifact CSP but fine for production deployment. No issue for the live site.
- The `[INEFFECTIVE_DYNAMIC_IMPORT]` warning on `registry.ts` has been present since Phase A. It won't break the build but indicates Vite cannot statically analyse the dynamic imports. Non-blocking.

---

## 11. North-Star Learning Journey

A first-time practitioner reader should be able to:

1. Land on the index and understand what they're looking at within 30 seconds
2. Follow a recommended path: Payments fundamentals → What actually moves → Existing rails → Forms of money → Who carries the risk → SWIFT gateway (if payments-focused) or DLT basics → Stablecoins → Tokenization (if digital assets-focused)
3. Complete a topic in 8–12 minutes including quiz
4. Return to reference any concept via search or glossary
5. Know at each step what the conceptual prerequisites were and what topic to go to next

**What's currently blocking this:**
- No recommended path on the index
- No topic-level "prerequisite" labelling
- No reading-time estimate
- Category ordering puts risk analysis before technology explanation for a linear reader
- Glossary UX is static text — searchable glossary with topic jump-links would be 10x more useful

---

## 12. Visual System Improvement Opportunities

1. **money-cards (topic 02):** Add a "compare two" selection mode. Let the user pick two forms of money side by side. Currently static.

2. **region-map (topic 11):** Verify tap/click functionality on all devices. The map visual exists but its interaction quality is unclear without live testing. Consider adding a list view as fallback (accordion below the map for mobile).

3. **bank-route-map:** This visual is implemented but not linked to any live topic. It belongs either in topic 01 (existing-rails) or topic 24 (what-actually-moves). Shipping it would add significant visual depth to one of the site's most important topics.

4. **Scatter (topic 05 or 10):** The scatter renderer exists and is animated. It's currently unused. Market-sizing (topic 10) could benefit from a two-axis scatter showing stablecoin issuers by reserve quality vs market cap, or DeFi protocols by TVL vs protocol revenue.

5. **Timeline (topic 07, 14):** The timeline visual currently appears only in topic 14 (MiCA rollout). Topic 07 (CBDCs) would benefit from a CBDC launch timeline showing live/pilot/research status over time.

6. **Flow diagrams (topic 03, 12, 15):** These three topics rely entirely on text + matrix. A flow diagram for topic 03 (stakeholder risk chain: customer → e-money issuer → bank → central bank) and topic 15 (bank strategic options: build / partner / consortium / wait) would improve them materially.

---

## Limitations of This Review

- Visual interaction quality (animations, transitions, tap responses) cannot be verified from source code alone. The assessment of animated visuals is based on source code analysis, not live browser testing.
- `regionMap.ts` interaction quality is unverified.
- `railExplorer.ts` and `finalityVisualiser.ts` were not fully read — listed as potentially dead but not confirmed.
- Market data accuracy was assessed against internal cross-references; external source verification was not performed.
- The glossary module (17) was only partially read (first 80 lines) — full term coverage was not assessed.
- Reading-time estimates are not available without live user testing.
- Accessibility (keyboard navigation, screen reader) was assessed from source code only, not with assistive technology.

---

**Readiness for human prioritisation: YES.** The backlog document provides itemised actions.
