# Stablecoins topic — sources and evidence register

Facts as publicly reported at 18 November 2026. Every citation on the page, in the scenes and in the assistant's context resolves through `frontend/src/content/stablecoins/sources.ts`. The full research registers, with confidence ratings and the sources that failed to load, are in `research/R1–R5`.

## Key claims on the page

| Claim as shown to readers | Source(s) | Research ID | Qualification |
|---|---|---|---|
| UK cryptoasset regulations made 4 Feb 2026; FCA final rules 30 Jun 2026; both apply from 25 Oct 2027 | legislation.gov.uk SI 2026/102; FCA PS26/9–13 | REG-13, REG-26 | Law made and rules final, not in force |
| FCA application window 30 Sep 2026 to 28 Feb 2027 | FCA | REG-27 | Live process |
| BoE: £40bn temporary issuance cap per systemic sterling coin; holding limits dropped; up to 70% short gilts, rest unremunerated BoE deposits (95% gilts while scaling) | BoE policy statement, 22 Jun 2026 | REG-05, REG-06 | Final policy; Code of Practice still draft (finalise by end-2026); no coin recognised |
| FCA redemption by next business day after checks | FCA PS26/10 via A&O Shearman | REG-28 | Medium confidence: one secondary summary says 24 hours |
| PRA: retail digital money as deposits; stablecoins only from an insolvency-remote, distinctly branded entity | PRA letter 18 May 2026, via Linklaters | REG-33 | Secondary: PRA PDF encrypted |
| Overseas coins (USDT, USDC) stay inside UK dealing/arranging; HMT proposal to bring stablecoin payments into payments law | Draft amending SI; HMT consultation via Linklaters | REG-17–20 | Draft SI (made status unconfirmed); proposal only |
| GENIUS Act effective 18 Jan 2027; only OCC rule final (21 Oct 2026); issuer interest banned, exchange rewards case by case; redemption within 2 business days (OCC) | govinfo; OCC | REG-35–41 | Other agencies' rules still proposals |
| MiCA: EMT holders redeem at par at any time; grandfathering ended 1 Jul 2026 | EUR-Lex | REG-46–47 | From memory, high confidence |
| FATF Jul 2026: 83% have Travel Rule laws; 60% of those took no supervisory action | FATF targeted update | REG-55, AML-04–05 | FATF site blocked; read via FIAU Malta copy; executive summary says "almost half" |
| UK Travel Rule since 1 Sep 2023; full originator data at £800+ since 30 Jun 2026 | legislation.gov.uk | AML-15–17 | JMLSG guidance still says EUR 1,000 |
| Supply $286.4bn (17 Nov 2026); peak $312.9bn (17 May); USDT $175.2bn, USDC $69.2bn | DefiLlama | ISS-01–05 | Aggregator data |
| Gross 2025 transfers $28–35tn; genuine payments ~$390bn, ~$226bn B2B | BIS AER 2026; IMF speech; McKinsey/Artemis | PAY-32–34 | $390bn and $226bn are McKinsey/Artemis's estimate (page not read); the BIS gives a similar figure for transfers net of same-owner moves, citing Chainalysis and Visa |
| ~6 in 10 on-chain transfers misclassified if read as payments | BIS WP 1359 | PAY-35 | Ethereum, 2025 |
| Cross-border attributable transfers $220bn (year to Jun 2026), average ~$3,000 | Chainalysis | PAY-37 | Vendor lower bound |
| IMF: USD 200 stablecoin transfer 2.18% (cheapest ramps), 3.04% median, 4.07% dearest, 1.54% at USD 5,000; chain < 1/4 of cost; ~1/3 corridors traditional cheaper | IMF WP/26/230 | PAY-01–06 | Full text did not load; figures from abstract and coverage; never extrapolated to £1,000 |
| Global average cost of sending USD 200: 6.2% (Q1 2026) | FSB 2026 progress report | PAY-14 | 5.7% after rebasing |
| Swift: 75% reach beneficiary bank in 10 minutes; FSB: 57% of wholesale credited end to end within an hour | Swift (reproduced press release); FSB | PAY-20, PAY-22 | Swift figure is operator data |
| Big-bank retail wires: FX margins of 2–4% | BIS WP 1385 | PAY-07 | Small sample |
| Circle Q3 2026: $658m reserve income, $409m distribution and transaction costs | Circle 8-K | ISS-12 | Company filing |
| Coinbase takes 50% of residual plus 100% on USDC held on Coinbase | Circle S-1 via Decrypt | ISS-13 | 2025 filing |
| Paxos offers GDN partners up to 100% of returns on USDG on their platforms | globaldollar.com | ISS-41 | Vendor claim |
| Open USD live 30 Sep 2026, issued by Bridge (Stripe); founders Coinbase, Mastercard, Shopify, Stripe, Visa; ~$961m (17 Nov) | Bridge; Open Standard; DefiLlama | ISS-48–54 | Mandate said 12 Nov: not supported by operator or issuer; partner payouts unpublished |
| PYUSD issued by Paxos, not PayPal | Paxos | ISS-28 | Paxos's OCC conversion status to be checked |
| JPM Coin is a deposit token, "not a stablecoin"; Citi live in 7 markets, HSBC in 5 | JPMorgan Kinexys; Citi; HSBC | ISS-68–71 | Company statements |
| CCTP minting idempotent; confirmations expire ~24h, reissuable; Fast Transfer backed by an allowance; V1 paused 1 Dec 2026 | Circle developer docs | XCH-04–13 | Vendor documentation and code |
| USDC on 39 chains (2 redemption-only); burn-and-mint links 31; USDT relies on third-party USDT0 or exchanges | Circle; USDT0 docs | ISS-09, XCH-07, XCH-28–30 | USDT0 operator not identified |
| Bridges 64% of $3.1bn stolen from DeFi in 2022; KelpDAO ~$292m (Apr 2026) | Chainalysis; LayerZero | XCH-33, XCH-42 | Vendor estimate; operator incident report |
| Ethereum ~15 minutes to finalise; optimistic rollup withdrawals ~7 days | ethereum.org | XCH-45, XCH-50 | |
| Stablecoins 84% of illicit volume (Chainalysis); illicit ~1.2% of attributed volume (TRM) | Chainalysis; TRM | AML-61–62, AML-74 | Vendor estimates; driven by sanctioned flows |
| Binance theft Oct 2026: stablecoins swapped before freezes | Elliptic | AML-51–52 | Vendor analysis |
| TerraUSD: Terraform and Kwon to pay $4.5bn after fraud verdict; Tai Mo Shan $123m for misleading investors about UST | SEC | (checked 19 Nov) | Primary regulator releases |
| USDC fell to ~$0.88 in Mar 2023 with $3.3bn at SVB | The Block | XCH-68 | Press, contemporaneous |

## Corrections made to adjacent topics (19 Nov 2026)

| Topic | Correction | Evidence |
|---|---|---|
| Stablecoin market structure | PYUSD issuer is Paxos; Open USD live 30 Sep 2026 issued by Bridge; supply, Tether entity and audit, RLUSD issuer and SEC outcome updated | R2 §4 |
| Market sizing | USDT-vs-Visa comparison replaced with payments-vs-payments; supply and remittance-cost figures corrected | R2, R3 §4 |
| Regulation | UK section rewritten for the 2027 regime; GENIUS yield and reserve wording; MiCA deadline marked past; quiz question replaced | R1 §4 rows 1, 5–9, 17 |
| GBTD | "Confirmed as deposits in law" and "£40bn per coin" corrected | R1 §4 rows 21–23 |
| Global initiatives | GENIUS Act does not ban retail CBDC (an executive order bars federal agencies) | R3 PAY-53 |
| Regulation | Title V, MiCA reserve share and authorisation, Hong Kong ordinance, Circle and Tether entities, FATF DeFi and Travel Rule, Basel status; unsourced SEC claim about Uniswap and Lido removed | R1 §4 rows 2–4, 7, 11–16 |
| GBTD | FCA link to the rules page; settlement-asset sentence limited to the Digital Securities Sandbox | R1 §4 rows 24–25 |
| Market structure | Paxos status note reworded: a law-firm note from August 2026 said final approval was pending | R2 §4 |

Not yet corrected (recorded for the owner): `frontend/src/content/data/rails.ts` and the glossary (mBridge, Agorá and retail CBDC wording), the speed claims in `01-existing-rails.ts`, the deposit-token list in `21-deposit-tokens.ts` (HSBC Orion and SG-FORGE are not deposit tokens), and GBTD's "HSBC in six markets" figure, which the research could not support.

## Full register (generated from `sources.ts`)

| ID | Publisher | Title | Published | Checked | Kind | Research claims / qualification |
|---|---|---|---|---|---|---|
| `boePs` | Bank of England | [Policy statement and draft rules: sterling-denominated systemic stablecoins](https://www.bankofengland.co.uk/paper/2026/ps/sterling-denominated-systemic-stablecoin) | 22 Jun 2026 | 2026-11-17 | central-bank | REG-05–09 |
| `boeNews` | Bank of England | [Bank launches policy statement and draft rules on systemic stablecoins](https://www.bankofengland.co.uk/news/2026/june/boe-launches-policy-statement-and-draft-rules-on-regulating-systemic-stablecoins) | 22 Jun 2026 | 2026-11-17 | central-bank | REG-06–07 |
| `boeFca` | Bank of England and FCA | [Approach to joint regulation of systemic stablecoin issuers](https://www.bankofengland.co.uk/paper/2026/boe-and-fcas-approach-to-joint-regulation-of-systemic-stablecoin-issuers) | 30 Jun 2026 | 2026-11-17 | regulator | REG-11 |
| `ukSi102` | legislation.gov.uk | [FSMA 2000 (Cryptoassets) Regulations 2026, SI 2026/102](https://www.legislation.gov.uk/uksi/2026/102/made) | 4 Feb 2026 | 2026-11-17 | law | REG-13–15 |
| `fcaRegime` | FCA | [Cryptoasset regime policy statements PS26/9 to PS26/13](https://www.fca.org.uk/publications/policy-statements/cryptoasset-regime) | 30 Jun 2026 | 2026-11-17 | regulator | REG-25–29 |
| `hmtAmendSi` | HM Treasury | [Draft FSMA 2000 (Cryptoassets) (Miscellaneous Amendments) Regulations 2026](https://www.legislation.gov.uk/ukdsi/2026/9780348287233/pdfs/ukdsi_9780348287233_en.pdf) | laid Sep 2026 | 2026-11-17 | law | REG-17–19; whether made was unconfirmed at 18 Nov |
| `hmtPayments` | Linklaters (on HM Treasury) | [HMT consults on stablecoins in payments law](https://financialregulation.linklaters.com/post/102nbw6/uk-to-future-proof-payment-services-hmt-consults-on-stablecoins-ai-and-open-ban) | 14 Jul 2026 | 2026-11-18 | law-firm | REG-20; secondary |
| `praLetter` | Linklaters (on the PRA) | [PRA letter on deposits, e-money and regulated stablecoins](https://financialregulation.linklaters.com/post/102mv7t/uk-prudential-regulator-updates-policy-on-crypto-exposures-and-stablecoin-issuanc) | 18 May 2026 | 2026-11-17 | law-firm | REG-33–34; PRA PDF encrypted, read via secondary |
| `ukTravelRule` | legislation.gov.uk | [Money Laundering Regulations 2017, Part 7A (Travel Rule)](https://www.legislation.gov.uk/uksi/2017/692/part/7A) | in force 1 Sep 2023 | 2026-11-17 | law | AML-15–19 |
| `ukSi621` | legislation.gov.uk | [SI 2026/621: Travel Rule threshold £800](https://www.legislation.gov.uk/uksi/2026/621/note/made) | 30 Jun 2026 | 2026-11-17 | law | AML-17, AML-32 |
| `fcaTravelRule` | FCA | [Expectations for UK cryptoasset businesses complying with the Travel Rule](https://www.fca.org.uk/news/statements/fca-sets-out-expectations-uk-cryptoasset-businesses-complying-travel-rule) | 17 Aug 2023 | 2026-11-17 | regulator | AML-20 |
| `ofsi` | OFSI (HM Treasury) | [Cryptoassets threat assessment](https://assets.publishing.service.gov.uk/media/687e6362791bb4d8c309a06e/OFSI_Cryptoassets_Threat_Assessment.pdf) | Jul 2025 | 2026-11-17 | regulator | AML-24–28, AML-41, AML-54 |
| `jmlsg` | JMLSG | [Sector 22 Annex I: cryptoasset transfers](https://www.jmlsg.org.uk/wp-content/uploads/2023/07/JMLSG-Guidance_Sector-22-Annex-I_Board-approved-1.pdf) | Jul 2023 | 2026-11-17 | regulator | AML-22–23; industry guidance approved by HMT |
| `poca` | legislation.gov.uk | [Proceeds of Crime Act 2002, s.335 (appropriate consent)](https://www.legislation.gov.uk/ukpga/2002/29/section/335) | in force | 2026-11-17 | law | AML-30 |
| `ukA7` | FCDO | [UK targets sanctions circumvention and crypto networks exploited by Russia](https://www.gov.uk/government/news/uk-targets-sanctions-circumvention-and-crypto-networks-exploited-by-russia) | 20 Aug 2025 | 2026-11-17 | regulator | AML-40 |
| `genius` | US Congress | [GENIUS Act, Pub. L. 119-27](https://www.govinfo.gov/content/pkg/PLAW-119publ27/html/PLAW-119publ27.htm) | 18 Jul 2025 | 2026-11-17 | law | REG-35–40 |
| `occRule` | OCC | [OCC finalises GENIUS Act framework](https://www.occ.gov/news-issuances/news-releases/2026/nr-occ-2026-92.html) | 21 Oct 2026 | 2026-11-17 | regulator | REG-40–41 |
| `ofacA7` | US Treasury | [A7 Network designated as a transnational criminal organisation](https://home.treasury.gov/news/press-releases/sb0644) | 1 Oct 2026 | 2026-11-17 | regulator | AML-44 |
| `fdicTokenised` | FDIC | [Proposed rule implementing the GENIUS Act](https://www.fdic.gov/news/financial-institution-letters/2026/notice-proposed-rulemaking-establish-genius-act) | 9 Apr 2026 | 2026-11-17 | regulator | ISS-72; proposal |
| `mica` | EUR-Lex | [Markets in Crypto-Assets Regulation (EU) 2023/1114](https://eur-lex.europa.eu/eli/reg/2023/1114/oj) | applied 2024 | 2026-11-17 | law | REG-46–47 |
| `ebaMica` | EBA | [EBA identifies priorities for the review of MiCA](https://www.eba.europa.eu/publications-and-media/press-releases/eba-identifies-priorities-review-mica) | 24 Sep 2026 | 2026-11-17 | regulator | REG-48, REG-50 |
| `euTfr` | EUR-Lex | [Transfer of Funds Regulation (EU) 2023/1113](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1113) | applied 30 Dec 2024 | 2026-11-17 | law | AML-33–34 |
| `fatf2026` | FATF | [Targeted update on virtual assets and VASPs](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/targeted-updated-virtualassets-vasps-2026.html) | Jul 2026 | 2026-11-17 | intl-org | REG-55–59, AML-01–10; FATF site blocked automated reading, text read from the FIAU Malta copy |
| `fsb2026` | FSB | [G20 cross-border payments roadmap: consolidated progress report 2026](https://www.fsb.org/2026/11/g20-roadmap-for-enhancing-cross-border-payments-consolidated-progress-report-for-2026/) | 16 Nov 2026 | 2026-11-18 | intl-org | PAY-14, PAY-19–21 |
| `fsb2025` | FSB | [G20 cross-border payments roadmap: progress report 2025](https://www.fsb.org/2025/10/g20-roadmap-for-cross-border-payments-consolidated-progress-report-for-2025/) | 9 Oct 2025 | 2026-11-18 | intl-org | PAY-18 |
| `fsbTargets` | FSB | [Targets for addressing the four challenges of cross-border payments](https://www.fsb.org/2021/10/targets-for-addressing-the-four-challenges-of-cross-border-payments-final-report/) | Oct 2021 | 2026-11-18 | intl-org | PAY-16–17 |
| `fsbStablecoin` | FSB | [Global stablecoin arrangements: cross-border vulnerabilities](https://www.fsb.org/2026/10/global-stablecoin-arrangements-cross-border-vulnerabilities-and-financial-stability-monitoring/) | 12 Oct 2026 | 2026-11-18 | intl-org | REG-62 |
| `imfWp230` | IMF | [Deconstructing the stablecoin sandwich (WP/26/230)](https://www.imf.org/en/publications/wp/issues/2026/10/30/deconstructing-the-stablecoin-sandwich-the-cost-of-cross-border-stablecoin-transfers-580817) | 30 Oct 2026 | 2026-11-18 | intl-org | PAY-01–06; full text did not load, figures from abstract and coverage |
| `imfKatz` | IMF | [Stablecoins and emerging markets (speech, Dan Katz)](https://www.imf.org/en/news/articles/2026/08/07/sp080726-stablecoins-emerging-markets-dan-katz) | 7 Aug 2026 | 2026-11-18 | intl-org | PAY-33, PAY-43 |
| `bisAer2026` | BIS | [Annual Economic Report 2026, chapter III](https://www.bis.org/publ/arpdf/ar2026e3.htm) | 23 Jun 2026 | 2026-11-18 | intl-org | PAY-31–32, PAY-40–42 |
| `bisAer2025` | BIS | [Annual Economic Report 2025, chapter III](https://www.bis.org/publ/arpdf/ar2025e3.htm) | Jun 2025 | 2026-11-18 | intl-org | PAY-39, XCH-65 |
| `bisWp1385` | BIS | [Competing rails: cross-border payments, banks, fintechs and stablecoins (WP 1385)](https://www.bis.org/publications/working-paper-1385-competing-rails-crossborder-payments-banks-fintechs-and-stablecoins) | Oct 2026 | 2026-11-18 | research | PAY-07–13 |
| `bisWp1359` | BIS | [Stablecoin transfers are not payments (WP 1359)](https://www.bis.org/publ/work1359.htm) | 11 Jun 2026 | 2026-11-18 | research | PAY-35 |
| `bisWp1270` | BIS | [Stablecoins and safe asset prices (WP 1270)](https://www.bis.org/publ/work1270.htm) | May 2025 | 2026-11-18 | research | PAY-46 |
| `bisPapers170` | BIS | [BIS Papers 170: stablecoin scenarios](https://www.bis.org/publ/bppdf/bispap170.htm) | 5 May 2026 | 2026-11-18 | research | PAY-45 |
| `bisAgora` | BIS | [Project Agorá report](https://www.bis.org/press/p260527.htm) | 27 May 2026 | 2026-11-18 | intl-org | PAY-29 |
| `nexus` | Nexus Global Payments | [Technical operator appointed; go-live targeted for 2027](https://nexusglobalpayments.org/nexus-global-payments-appoints-technical-operator/) | 9 Feb 2026 | 2026-11-18 | operator | PAY-26 |
| `swiftSpeed` | Swift (press release, reproduced) | [Half of payments on Swift reach the bank within 40 seconds](https://www.crypto-reporter.com/newsfeed/spotlight-on-speed-half-of-payments-on-swift-reach-bank-within-40-seconds-but-domestic-delays-impact-user-experience-133280/) | 12 Nov 2026 | 2026-11-18 | operator | PAY-22; operator data, Swift page not reachable |
| `mckinsey` | McKinsey with Artemis | [Stablecoins in payments: what the raw transaction numbers miss](https://www.mckinsey.com/industries/financial-services/our-insights/stablecoins-in-payments-what-the-raw-transaction-numbers-miss) | early 2026 | 2026-11-18 | vendor-data | PAY-34; page did not load, figures via BIS and IMF citations |
| `chainalysisAdoption` | Chainalysis | [2026 Global Crypto Adoption Index](https://www.chainalysis.com/blog/2026-global-crypto-adoption-index/) | 23 Sep 2026 | 2026-11-18 | vendor-data | PAY-37 |
| `visaFy25` | Visa | [Fiscal 2025 Annual Report](https://s29.q4cdn.com/385744025/files/doc_downloads/2025/Visa-Fiscal-2025-Annual-Report.pdf) | Nov 2025 | 2026-11-18 | issuer | PAY-51 |
| `stanChart` | Standard Chartered, via The Block | [USD 1tn could leave emerging-market deposits by 2028 (scenario)](https://www.theblock.co/post/373510/standard-chartered-estimates-1-trillion-could-exit-emerging-market-bank-deposits) | 6 Oct 2025 | 2026-11-18 | press | PAY-47; bank research scenario |
| `defillama` | DefiLlama | [Stablecoin supply data](https://stablecoins.llama.fi/stablecoincharts/all) | 17 Nov 2026 | 2026-11-17 | vendor-data | ISS-01–05 |
| `circleTransparency` | Circle | [USDC transparency and reserves](https://www.circle.com/transparency) | 16 Nov 2026 | 2026-11-17 | issuer | ISS-07–08, ISS-18 |
| `circleQ3` | Circle (SEC filing) | [Q3 2026 results](https://www.sec.gov/Archives/edgar/data/1876042/000187604226000309/finalq3epr-110326.htm) | 4 Nov 2026 | 2026-11-17 | issuer | ISS-12 |
| `circleTerms` | Circle | [USDC terms](https://www.circle.com/legal/usdc-terms) | updated 15 Oct 2026 | 2026-11-17 | issuer | ISS-10 |
| `circleCoinbase` | Decrypt (on Circle’s S-1) | [Coinbase’s share of USDC reserve income](https://decrypt.co/312757/coinbase-circles-residual-usdc-reserve-revenue-sharing-filing) | Apr 2025 | 2026-11-17 | press | ISS-13 |
| `tetherQ3` | Tether | [Q3 2026 attestation and profit](https://tether.io/news/tether-generates-1-5-billion-in-q3-net-operating-profit-as-reserve-buffer-doubles-to-almost-8-billion/) | 30 Oct 2026 | 2026-11-17 | issuer | ISS-19 |
| `tetherFees` | Tether | [Fees: minimums and redemption charges](https://tether.to/en/fees/) | live page | 2026-11-17 | issuer | ISS-22, XCH-59 |
| `tetherTerms` | Tether | [Terms of service](https://tether.to/en/legal/) | updated 26 Feb 2026 | 2026-11-17 | issuer | XCH-60 |
| `paxosPyusd` | Paxos | [PayPal USD (issued by Paxos)](https://www.paxos.com/pyusd) | 17 Nov 2026 | 2026-11-17 | issuer | ISS-28 |
| `paxosUsdg` | Paxos | [USDG](https://www.paxos.com/assets/usdg) | 17 Nov 2026 | 2026-11-17 | issuer | ISS-39–40 |
| `gdn` | Global Dollar Network | [Partner rewards from USDG reserves](https://www.globaldollar.com/) | 23 Oct 2026 | 2026-11-17 | issuer | ISS-41 |
| `rippleTerms` | Ripple | [RLUSD terms](https://ripple.com/legal/stablecoin/) | updated 16 Nov 2026 | 2026-11-17 | issuer | ISS-33 |
| `bridgeOusd` | Bridge | [OUSD is live, issued by Bridge](https://www.bridge.xyz/blog/ousd-is-live-issued-by-bridge) | 30 Sep 2026 | 2026-11-17 | issuer | ISS-48–49 |
| `openStandard` | Open Standard | [About Open Standard](https://joinopenstandard.com/about) | 17 Nov 2026 | 2026-11-17 | operator | ISS-51 |
| `jpmCoin` | JPMorgan Kinexys | [JPM Coin: a bank-issued deposit token](https://www.jpmorgan.com/kinexys/digital-payments/jpm-coin) | 17 Nov 2026 | 2026-11-17 | issuer | ISS-68 |
| `citiToken` | Citi | [Citi Token Services expands to Japan and the UAE](https://www.citigroup.com/global/news/press-release/2026/citi-token-services-expands-global-footprint-japan-united-arab-emirates) | 28 Sep 2026 | 2026-11-17 | issuer | ISS-70 |
| `hsbcTds` | HSBC | [Tokenised Deposit Service expands to the US](https://www.about.us.hsbc.com/newsroom/press-releases/hsbc-expands-tokenized-deposit-service-to-the-united-states) | 13 Apr 2026 | 2026-11-17 | issuer | ISS-71 |
| `qivalis` | Qivalis | [Authorised as an e-money institution by De Nederlandsche Bank](https://qivalis.eu/press/news/qivalis-receives-authorisation-as-an-electronic-money-institution-from-de-nederlandsche-bank) | 14 Oct 2026 | 2026-11-17 | issuer | ISS-61 |
| `sofi` | The Block | [SoFi launches SoFiUSD, issued by SoFi Bank](https://www.theblock.co/post/383146/sofi-launches-sofi-usd-stablecoin) | 2026 | 2026-11-17 | press | ISS-73 |
| `secTerra` | SEC | [Terraform and Kwon to pay $4.5 billion following fraud verdict](https://www.sec.gov/newsroom/press-releases/2024-73) | 13 Jun 2024 | 2026-11-19 | regulator |  |
| `secTaiMoShan` | SEC | [Tai Mo Shan to pay $123 million for misleading investors about UST](https://www.sec.gov/newsroom/press-releases/2024-212) | Dec 2024 | 2026-11-19 | regulator |  |
| `svbUsdc` | The Block | [USDC trades near $0.90 after Circle discloses funds at SVB](https://www.theblock.co/post/218993/usdc-and-dai-remain-at-about-0-90-following-circles-disclosure-of-funds-at-svb) | 11 Mar 2023 | 2026-11-17 | press | XCH-68 |
| `cctpRetry` | Circle | [CCTP: retry a failed mint (minting is idempotent)](https://developers.circle.com/cctp/howtos/retry-failed-mint.md) | live docs | 2026-11-17 | issuer | XCH-10–13 |
| `cctpFast` | Circle | [CCTP Fast Transfer allowance](https://developers.circle.com/cctp/concepts/fast-transfer-allowance.md) | live docs | 2026-11-17 | issuer | XCH-04–05 |
| `cctpV1` | Circle | [Migrate to CCTP V2 before V1 is paused on 1 Dec 2026](https://www.circle.com/blog/migrate-to-cctp-v2-ahead-of-cctp-v1-legacy-deprecation) | 27 Aug 2026 | 2026-11-17 | issuer | XCH-08 |
| `cpn` | Circle | [Circle Payments Network](https://www.circle.com/cpn) | 17 Nov 2026 | 2026-11-17 | operator | XCH-18, XCH-22, XCH-24 |
| `cpnStates` | Circle | [CPN payment states and workflows](https://developers.circle.com/cpn/concepts/payments/component-states-and-workflows.md) | live docs | 2026-11-17 | operator | XCH-21 |
| `circleMint` | Circle | [How minting works (Circle Mint)](https://developers.circle.com/circle-mint/concepts/how-minting-works.md) | live docs | 2026-11-17 | issuer | XCH-54–55 |
| `circleMatch` | Circle | [Circle Match: hourly netting of mint and redeem orders](https://www.circle.com/blog/circle-match-get-a-rebate-to-mint-set-your-price-to-redeem) | 22 Oct 2026 | 2026-11-17 | issuer | XCH-57 |
| `circleDenial` | Circle | [Stablecoin access denial policy](https://www.circle.com/hubfs/Blog%20Posts/Circle%20Stablecoin%20Access%20Denial%20Policy_pdf.pdf) | May 2026 | 2026-11-17 | issuer | XCH-73 |
| `kelpdao` | LayerZero Labs | [KelpDAO incident report](https://layerzero.network/publications/kelpdao-incident-report.pdf) | 18 May 2026 | 2026-11-17 | operator | XCH-33 |
| `chainalysisHacks` | Chainalysis | [2022: biggest year ever for crypto hacking](https://www.chainalysis.com/blog/2022-biggest-year-ever-for-crypto-hacking/) | 1 Feb 2023 | 2026-11-17 | vendor-data | XCH-42 |
| `ethFinality` | ethereum.org | [Single-slot finality (about 15 minutes to finalise today)](https://ethereum.org/en/roadmap/single-slot-finality/) | updated 16 Oct 2026 | 2026-11-17 | research | XCH-45 |
| `opRollups` | ethereum.org | [Optimistic rollups: seven-day withdrawal challenge](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/) | updated 21 Oct 2026 | 2026-11-17 | research | XCH-50 |
| `chainalysisCrime` | Chainalysis | [2026 Crypto Crime Report: introduction](https://www.chainalysis.com/blog/2026-crypto-crime-report-introduction/) | 8 Jan 2026 | 2026-11-17 | vendor-data | AML-61 |
| `trmCrime` | TRM Labs | [2026 Crypto Crime Report: USD 158bn of illicit flows in 2025](https://www.trmlabs.com/resources/blog/2026-crypto-crime-report-key-insights-trm-identifies-record-usd-158-billion-in-illicit-crypto-flows-in-2025-reversing-a-multi-year-decline) | 10 Jan 2026 | 2026-11-17 | vendor-data | AML-62 |
| `ellipticBinance` | Elliptic | [Binance: the largest hack in history](https://www.elliptic.co/insights/binance-largest-hack-in-history/) | Nov 2026 | 2026-11-17 | vendor-data | AML-51 |
| `usenixPoisoning` | USENIX Security 2025 | [Address poisoning attacks on Ethereum and BSC](https://www.usenix.org/conference/usenixsecurity25/presentation/tsuchiya) | 2025 | 2026-11-17 | research | AML-72 |
