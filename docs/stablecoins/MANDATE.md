# Claude Code mandate — Stablecoins interactive learning experience (Reviewed v2.0)

> Persisted verbatim from the owner's brief on 17 November 2026 so that context compaction or a new session cannot lose it. `PROGRESS.md` in this folder records what has been done against it.

Repository: https://github.com/alankarhuchche/digital-finance-bootcamp
Target: `/topic/stablecoins` (same public URL; no parallel replacement website)
Research baseline: 16 November 2026 — recheck source dates and market/regulatory status when executed.
Status: Reviewed, execution-ready; safe to carry out on a dedicated feature branch. Do not merge or deploy without owner approval.

## Mission
You own the entire research, editorial thinking, product design, implementation, independent fact-checking, accessibility, responsive QA and final delivery of a premium, interactive public learning experience about stablecoins. Do not merely rewrite the existing copy. Make it excellent for newcomers and for bank/payments practitioners using progressive disclosure.

Adopt an **independent, evidence-led editorial stance**: moving a stablecoin token quickly is not the same as completing an international payment. Consider funding, FX, cash-out, beneficiary reachability, identity/compliance, liquidity, claim on issuer, reconciled customer balance, and failure recovery. Compare against strong existing and improving payment alternatives, not a straw man. Give conditions where stablecoins genuinely win, lose, or complement other instruments. Plain English, precise concepts, worked examples, and no vendor hype. Public/employer-agnostic only: no bank-internal strategy, systems, counterparties or proprietary detail.

You have wide discretion to change the outline and select stronger interactions than those suggested. Prioritise a coherent story and deep understanding, not maximum feature count or another lengthy document.


## Product outcome and priorities — more important than feature count

**Product promise:** A newcomer should leave knowing what stablecoins are and why they exist; a payments practitioner should understand the actual end-to-end operating models and failure boundaries; a bank leader should see conditional choices, economics, regulatory dependencies and adoption constraints. Readers must be able to tell the difference between *fast token movement* and *completed, usable customer payment*.

**Internal priority order (use this when time, context or token limits bind):**

- **P0 — Non-negotiable learning spine:** accurate and accessible fundamentals; why adoption happens; a fair international-payments comparison; the operating-model selector; liquidity and cross-ledger problem explanations; economic crime control chain; non-US macro/bank impacts; UK bank options; sources and legal/status qualifiers. This material must be complete even if a lower-priority interactive is omitted.
- **P1 — Three flagship interactive teaching experiences:** (1) end-to-end payment journey comparing traditional, wallet and sandwich/bank-managed rails; (2) liquidity and execution constraint simulator; (3) cross-ledger transfer and failure/reconciliation walkthrough. These must be genuinely operable, fully accessible, responsive and independently tested.
- **P2 — High-impact supporting experiences:** economic-impact perspective toggle; compliance control journey; issuer-reserve economics comparison. These can use compact interactive components, not seven full simulation engines. Link appropriately to the existing dedicated market-structure page.
- **P3 — Optional embellishment:** animated maps, extra models, animated transitions, decorative effects and advanced comparison controls, only if they genuinely improve comprehension and do not compromise quality, performance or accessibility.

**No sprawling one-page wall of text.** The page should be a guided chapter experience that supports '5-minute essentials' and optional deep dives, and a credible end-to-end expert reading path. Use progressive disclosure, anchor navigation, contextual glossary and short teaching checks; reader comprehension and working implementation outweigh total word count.

A visual earns its place only if it teaches a non-obvious point, remains truthful when paused, is functional using keyboard/touch, and has a clear textual alternative. Avoid animations that simply show value moving as glowing dots without exposing what obligation, ledger, liquidity and claim changes.

**Completion is evaluated against demonstrable learner outcomes, not feature count or self-rated polish.** At minimum a novice should be able to explain the peg, redemption and why a fast chain transfer may still be an incomplete payment. A practitioner should be able to identify the right route and its critical controls in new scenarios. A bank leader should be able to name the economically rational cases and material risks for a UK bank. Include scenario-driven comprehension checks with explanations (not just trivia questions).

## Inspect the repository first
Examine actual checked-in files and dependencies, particularly:
- `frontend/src/content/modules/06-stablecoins.ts`, `23-stablecoin-market-structure.ts`, `02-forms-of-money.ts`, `01-existing-rails.ts`, `21-deposit-tokens.ts`, `26-gbtd.ts` and related modules.
- `frontend/src/content/registry.ts`, `render.ts`, `types.ts`, common `viz` components and styles, `frontend/src/main.ts`, `frontend/src/chat.ts`, Quarkus `/api/chat` and current deployment/test scripts.

The existing architecture is Vite + vanilla TypeScript, module registry/render blocks and Quarkus backend. The site has a separate stablecoin-market-structure module and a wide-layout GBTD module. A narrow `#app` max width can constrain desktop experiences. Gemini chat currently extracts a partial plaintext representation of a module (~8,000 characters) and passes it to `/api/chat`, whose backend caps content again (~10,000 characters). Verify these observations. Integrate carefully and preserve sidebar, routing, other topics, completion tracking, sharing and AI chat. Avoid a gratuitous framework rewrite. Prevent duplication/inconsistency between stablecoins and market-structure topics; make only justified adjacent factual/cross-link changes.

## Mandatory research questions — not a fixed chapter plan
1. **What is a stablecoin?** Meaning of token, claim, issuer liability, reserves, peg, par redemption, secondary price, mint/burn, wallet/custody; legal rights and insolvency; fiat-backed, crypto-backed, algorithmic and hybrid mechanisms, with historical failures. Compare to cash, e-money, bank deposits, tokenised deposits, wholesale/retail CBDC. Distinguish a bank-issued stablecoin from a deposit token.
2. **Why did stablecoins emerge and who really uses them?** Trading collateral, USD access and savings, treasury, remittances, B2B, merchant payment, DeFi, tokenised markets. Market size and country/corridor adoption. Distinguish supply, gross on-chain transfer volume, genuine payment activity, cross-border payment activity and production adoption. Be explicit about methodology, self-transfers, trading and volume inflation.
3. **Real international payment comparison.** SWIFT messaging versus payment and settlement, correspondent nostro/vostro, FX, funding, screening, cut-offs, costs, refunds and the receiver's spendable funds. Compare the whole same-corridor journey with modern bank/PSP alternatives, not just network transfer time or gas fees. Show who holds liability and liquidity at each step.
4. **Payment operating models.** Fiat→stablecoin→fiat sandwich; custodial wallet→wallet; unhosted wallet→wallet; internal book transfer; issuer-direct mint/redeem; bank/PSP-managed stablecoin transport with fiat payout; merchant acceptance; treasury transfers; native cross-chain and wrapped/bridged transfer; closed-ledger and tokenised-deposit alternatives. Explain parties, steps, bank accounts, customer wallets, liquidity, custody, fees, reachability, risk, controls, good-fit cases and bad-fit cases. Separate token design, route model and partnership economics.
5. **Liquidity remains difficult.** Prefunding and inventory; chain fragmentation; corridor imbalance; FX depth and price; mint/redeem banking hours and cut-offs; access to issuers, cash-out and settlement accounts; liquidity provision, credit, redemption stress, netting, idle capital, market maker constraints and reserve yield. Evaluate direct issuer access, just-in-time mint/redeem (only where supported), on/off ramp networks, bank-led payout, market making, cross-chain native burn/mint, liquidity bridges, netting, credit and interbank coordination. Say which problem each actually solves and where it fails.
6. **Cross-ledger problems.** Same issuer on multiple chains versus different issuer tokens; burn/mint vs lock/mint vs pool bridges; attestation, trust, smart contract and messaging dependencies; finality, reorgs, irreversibility, token fungibility, restricted/permissioned ledger reach, frozen tokens, partial failure, duplicate retries, outcome-unknown, reconciliation across on-chain wallet, issuer, fiat, treasury and bank/customer ledgers. No magic 'interoperability solved' narrative.
7. **Economic crime and bank controls.** KYC/KYB, sanctions, AML/CTF, transaction monitoring, blockchain analytics, Travel Rule and VASP-to-VASP interoperability, hosted/unhosted wallets, wallet ownership and attribution, scam/fraud/mules, mixers, ransomware, chain-hopping, illicit funds, freezes, privacy/data and operational/cyber security. Teach pre-execution, execution and post-transaction controls and limits. Do not teach evasion.
8. **USD stablecoins beyond the USA.** Benefits (dollar access, remittances, savings, cross-border reach) and costs (deposit substitution, monetary-policy transmission, domestic bank funding/credit, FX demand, capital movements, financial stability, sovereign monetary control, issuer/US regulator dependence, reserve-yield capture and demand for US government debt). Distinguish bank-level, customer-level and whole-economy effects, particularly UK and less stable currencies. Clearly label mechanisms versus measured outcomes versus scenarios.
9. **What is issued and why?** Research USDC, USDT, PYUSD, RLUSD, USDG/Paxos Global Dollar Network, OUSD/Open Standard/Open USD, suitable GBP/EUR examples, and any important 2026 developments. Compare true issuer, legal claim, regulatory regime, reserve assets, availability, redemption terms, chain support, distribution, scale, real use and revenue-sharing. Distinguish Paxos USDG from Open USD; distinguish issuer, distributor, consortium and bank deposit token. Verify and correct stale facts on other pages: PYUSD is Paxos-issued, not 'issued by PayPal'; Open USD was publicly described by its operator as live from 12 November 2026, with Bridge identified as its issuer; **verify independently and do not treat self-reported network/circulation/payment figures as audited**. Explain why networks share reserve economics, how partnerships change incentives and what remains unproven. Never equate a partnership announcement to settled volume.
10. **UK banks: credible adoption paths.** Present 2026 UK Bank of England, FCA and HMT stance with precise rule status and dates (draft, final, commencement; sterling/non-sterling; systemic/non-systemic; issuance/custody/arranging/payments); relevant US/EU differences. Consider roles as issuer, distributor, custodian, on/off ramp, international payment orchestrator, market maker, provider of tokenised deposits or nonparticipant. Explore what would make a bank-led fiat-to-fiat stablecoin payment useful, required controls/treasury/ops and why it might still lose to upgraded rails. End with conditional strategic options and priorities, not a single universal recommendation.
11. **Challenge the premise.** Why blockchain at all? Where do instant-payment links, modern correspondent solutions, SWIFT, tokenised deposits, central-bank settlement and synchronisation solve the same problem better? Show both strongest advocates' cases and strong counterarguments.

## Evidence, simulation and AI source of truth

Before implementing scenes, define a **small, typed and traceable content model** for the new topic: stablecoin/product facts; public sources and verified-at dates; source confidence and claim status; flow actors, states and obligations; and scenario assumptions. Reuse existing module types wherever practical. Do not let separate prose paragraphs, scene labels, numeric simulator constants and Gemini context develop conflicting definitions.

For each simulation, explicitly distinguish **observed/sourced data**, **illustrative input or assumption**, **derived deterministic output**, **unknown**, and **vendor claim**. Never show a pseudo-realistic 'live' FX quote, cost, adoption number, compliance clearance or throughput without the necessary connected data and source. Where there is no defensible quantitative basis, use qualitative or openly illustrative states, with 'what changes / what does not' explanation.

Document an end-to-end scenario contract for the principal comparator: same amount, sender/recipient, currencies, exact payout objective, beneficiary wallet/bank reachability, settlement and operating hours, FX conversion, all fee legs, issuer access, custody, cash-out and compliance assumptions. Include one accessible corridor and one constrained/reachability counterexample where evidence supports them. **Never compare an average bank product with the best-case crypto path** or use a $200 study to assert actual costs for an illustrative £1,000 journey.

Use canonical, source-backed summaries to serve the page, visuals, and Gemini; ensure the AI knows what each visual means, the consequences of each scenario and limitations. Current `/api/chat` accepts client-supplied `moduleContent`: review the trust boundary and avoid treating arbitrary visitor-provided content as authoritative. Prefer server-controlled curated content keyed by module and (where useful) selected scene rather than just raising the 8,000/10,000 character caps. Preserve affordable model calls, guard against injected source content, and implement graceful failure.

Add explicit tests for scenario invariants: monetary conservation across stages, no negative liquidity without labelled credit, debit/reservation/settlement distinction, no double-credit on retry, bridge completion not claimed before destination finality, frozen/rejected transactions cannot be marked successful, and end-user payout only complete when actually spendable. The model is educational, not a bank payment execution engine; do not pretend it has production-grade processing guarantees.

## UX direction: premium interactive product, not animated slide deck
Design an elegant story with three progressive layers: **Discover → Explore → Decide**. Build the three P1 flagship scenes first, then choose P2 supporting interactions on evidence and instructional value rather than mechanically implementing every item:
- **Follow £1,000**: same cross-border payout via traditional route, sandwich and managed stablecoin settlement. Distinguish message, money, ledger update, custody, liquidity, FX and spendable funds. If costs/times aren't sourced, use explicit illustrative inputs, not invented 'real' quotes.
- **Pick the payment model**: route selector with sender/beneficiary/currency/wallet availability, explaining what works, prerequisites, trade-offs and failure points.
- **Liquidity control room**: adjust balances, corridor imbalance, time of day, market-maker availability and cash-out to learn what remains blocked.
- **Cross-ledger failure lab**: native burn/mint vs bridged assets, state transitions, attestation delays, unknown outcomes, retries and reconciliation.
- **USD adoption economy lens**: switch perspective from user to local bank to central bank to issuer; examine benefits and adverse effects.
- **Issuer and reserve-economics explorer**: evidence-based comparisons and network incentives, linking to the existing dedicated market-structure topic.
- **Financial crime controls journey**: pre-transaction screening, Travel Rule, on-chain analytics, exception decision and after-the-fact response.

Creative alternatives encouraged. Animation must teach, not merely decorate. Smooth motion, precise graphics, controllable step/play/reset, keyboard access, screen-reader alternatives, `prefers-reduced-motion`, good contrast, no misleading 'live' metrics. Professional typography and responsive layout: mobile/iPhone Safari, tablet, laptop and 1440–1920px desktops. Fix overly narrow content for this topic without globally breaking others; use a broad canvas for diagrams with a narrower readable text measure. No enormous animation libraries by default, unnecessary 3D, hidden horizontal scroll or nonfunctional controls.

## Gemini integration: verify the *learning* context
Reuse Quarkus `/api/chat` and the existing widget rather than adding another assistant. New interactive data must be reflected in *curated, source-backed text for Gemini*, including all visual explanations, definitions and 'what happens when I choose X' narratives. Today the text extractor omits much non-prose content and truncates early, so simply calling `renderChatWidget` is insufficient. Design a cost-conscious module/scene-aware content strategy, including source and 'known unknown' grounding, with the backend rather than trusting arbitrary client-provided factual context. Add editable guided questions for major scenes. Keep secrets on server, do not log private data, never silently execute actions. Mock test without paid/live credentials; test real calls only with already-authorised config and acceptable spend. Graceful 503/502 experience.

## Research quality and source governance
Verify facts from primary independent sources, not just vendors. Prioritise IMF, BIS, FATF, Bank of England, FCA, HM Treasury, FSB, ECB, Federal Reserve, World Bank and directly attributable issuer legal/reserve/technical materials. Date each statistic and rule. Cross-check vendor-advertised performance, coverage and scale; distinguish promotion from field evidence. Label factual claims, inference, scenario and unknown. Provide point-of-use citations, Sources/Methodology for readers and a small evidence register for maintainers. Critical trap: gross stablecoin volume is not genuine remittance/payment volume.

Research starting links to verify individually for accessibility, date, factual accuracy and relevance (some sites block automated access; do not silently treat retrieval failures as evidence):
- IMF (30 Oct 2026) sandwich cost study: https://www.elibrary.imf.org/view/journals/001/2026/230/001.2026.issue-230-en.xml
- IMF (7 Aug 2026) macroeconomic risks: https://www.imf.org/en/news/articles/2026/08/07/sp080726-stablecoins-emerging-markets-dan-katz
- BIS Annual Economic Report 2026: https://www.bis.org/publ/arpdf/ar2026e.pdf
- BoE (22 Jun 2026) systemic stablecoins: https://www.bankofengland.co.uk/news/2026/june/boe-launches-policy-statement-and-draft-rules-on-regulating-systemic-stablecoins
- BoE/FCA joint framework: https://www.bankofengland.co.uk/paper/2026/boe-and-fcas-approach-to-joint-regulation-of-systemic-stablecoin-issuers
- FATF 2026 virtual assets: https://www.fatf-gafi.org/en/publications/Fatfrecommendations/targeted-updated-virtualassets-vasps-2026.html
- Paxos stablecoins: https://docs.paxos.com/guides/stablecoin
- Open Standard: https://joinopenstandard.com/about and https://openusd.inc/
- Circle cross-chain protocol: https://www.circle.com/cross-chain-transfer-protocol
- Circle Payments Network: https://www.circle.com/cpn
- JPM Coin classification: https://www.jpmorgan.com/kinexys/digital-payments/jpm-coin

If an essential source is unavailable, disclose and qualify; never fabricate it.

## Required internal workflow and review gates — autonomous, not approval-heavy

Complete these stages in order, saving short durable evidence in `docs/stablecoins/`. They are **internal quality gates**, not points for routine owner approval.

**Gate A — Baseline and editorial brief:** Establish baseline build/test results and current route/content behaviour. Complete a source inventory, contradictions/staleness review (especially backing-model evolution, PYUSD issuer and OUSD status), the central thesis and reader journeys, content ownership across `stablecoins` and `stablecoin-market-structure`, and a storyboard / interaction specification. Independently red-team the storyline for bank and stablecoin bias before implementation.

**Gate B — Finished vertical slice:** Implement the chapter shell, layout and one end-to-end payment journey *completely*, including factual sources, state tests, accessibility, iPhone/wide-screen QA and AI context. This validates the architecture and teaching approach before multiplying scenes.

**Gate C — Complete the educational core and priority scenes:** Fill all P0 research areas, then add the P1 liquidity and cross-ledger experiences and the most useful P2 compact interactions. Keep each increment buildable and verifiable.

**Gate D — Independent acceptance:** Separate factual/editorial critic reviews claim-to-source traceability and counterarguments; separate QA/engineering critic verifies interactions, mobile behaviour, Gemini grounding, compile/tests and regressions. Fix serious findings rather than merely listing them.

**Gate E — Handover:** Provide preview instructions and explicit demo scenarios, branch/draft PR if available, evidence register, screenshots, test results, known limitations and release checklist. Do not deploy, merge or publish.

If session compaction, usage limits or tooling interrupts the task, write *exactly what is complete and what to run next* into `PROGRESS.md`. Do not claim finished merely because an agent created files. Never conceal skipped tests, unavailable browser tools, missing sources or unfinished interactions.

## Operating instructions: full autonomy with protective boundaries
Use ultracode/dynamic workflows intelligently where supported. Assign independent perspectives for research, adversarial fact-check, editorial/UX, implementation and final verification. Parallelise independent reading and review, but coordinate files and integrate sequentially. Build first a story map and visual storyboard, red-team it internally, then implement, test, revise and ship a *reviewable branch*. Do not ask routine approval, write a plan-only answer, or stop before a working product. Start by running baseline builds/tests. Persist this mandate in the repo (under `docs/stablecoins/MANDATE.md`), plus a concise `PROGRESS.md` containing choices, completed work, blockers and exact next actions; update as work progresses so context compaction doesn't derail the mission.

Within the branch you may modify the stablecoin page, shared renderer and AI context pipeline as justified, and minimal related market-structure/cross-link facts. Avoid material rewrites of unrelated topics or global architecture. No deployment, merge to main, force-push, credential changes, public release, purchases or unapproved paid API calls. Request approval only for those boundaries or truly material decisions. A draft PR is appropriate if the GitHub permissions allow. Do not claim completion if access, tests or browser checks are blocked. Prefer one stable, reviewable working product over many unintegrated components; Ultracode is orchestration, not a guarantee of correctness or unlimited tokens.

## Acceptance scenarios — must be demonstrably answerable

Require checks or a lightweight self-test using genuinely new situations, not memorised labels:

1. A UK business wants to pay an Indian beneficiary who has a bank account but no usable stablecoin wallet. Show why wallet-to-wallet fails the end-user objective, and what a fiat-payout route needs; validate local access/regulation rather than assuming legality or reachability.
2. A bank has USD stablecoins on Chain A but must pay a recipient on Chain B. Contrast native burn/mint, a bridge and a provider-led payout; inject a partial failure, show what is known and what cannot safely be retried.
3. A receiver expects spendable fiat in a bank account by a deadline, but the issuer's redemption window is closed. Clearly distinguish token settlement from final payout and the liquidity/counterparty options.
4. A corporate has legitimate international flow but the receiving wallet is unhosted, new or flagged for sanctions/fraud risk. Demonstrate what the bank can and cannot infer or approve, the legal-jurisdiction dependencies, and a layered response.
5. In a country with meaningful USD stablecoin adoption, distinguish the benefit of dollar access from *possible* deposit/funding, lending and monetary-policy impacts; explain differences from a UK-bank scenario.
6. Compare single-issuer reserve-economics, revenue-sharing network models, bank-issued stablecoins and tokenised deposits without conflating the token issuer, distribution partner, bank liability and account redemption right.

For the final QA, have someone or an independent agent use these scenarios and explain decisions *from the delivered product*. If the answer requires information absent from the site, the experience is not complete.

## Definition of done
- Finished interactive, evidence-based page with meaningful responsive animations and full newcomer-to-practitioner journey.
- International routes and bank/economic consequences are accurate, balanced and clear; no unsupported claims, hidden assumptions, stale issuer status or contradictions with related modules.
- Gemini receives relevant compact context for the whole learning experience, not just introductory text. Guided questions and fallback states work.
- Vite/TypeScript production build passes; relevant Quarkus compilation/tests pass; add targeted checks for model/state transitions and calculations. Record actual commands and results.
- Browser visual QA at ~390px mobile, ~768px tablet, 1280px laptop and 1920px desktop; include WebKit/mobile Safari where available. Verify navigation, sidebars, focus, animation controls, reduced-motion and performance; attach screenshots/evidence. If unavailable, disclose specifically.
- Independent editorial/factual and engineering QA reports challenge the result; fix important defects. Run baseline/regression tests and document any incomplete tests.
- In `docs/stablecoins/`, produce concise `SOURCES.md` (claim / URL / publisher / published / checked / qualification), `EDITORIAL_DECISIONS.md`, `QA_REPORT.md`, and `PROGRESS.md`.
- Deliver separate branch and draft PR when practical, **not** production deployment. Final owner summary: preview steps, changes and standout scenes, verified conclusions, evidence sources, executed test results, remaining risks and what requires approval. Avoid generic 'done' language.

Writing voice: direct, grounded and plain English; credible bank and payment systems terminology; show trade-offs and surprises, not management consultancy language. Aim for an unusually good public educational product.
