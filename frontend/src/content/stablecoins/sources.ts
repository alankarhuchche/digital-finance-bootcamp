// sources.ts — every source the Stablecoins topic cites, with its date and when it was checked.
// Research registers behind these entries: docs/stablecoins/research/R1–R5 (claim IDs in `note`).
// Pure data: rendered on the page, listed in the chat context and checked by tests.

export type SourceKind =
  | 'law' | 'regulator' | 'central-bank' | 'intl-org' | 'research'
  | 'issuer' | 'operator' | 'vendor-data' | 'law-firm' | 'press';

export interface ScSource {
  publisher: string;
  title: string;
  /** Publication or status date, as shown to readers. */
  date: string;
  url: string;
  kind: SourceKind;
  /** When the research pass read it. */
  checked: string;
  note?: string;
  /** Shown to readers when the source could only be read indirectly or in part. */
  caveat?: string;
}

const C17 = '2026-11-17';
const C18 = '2026-11-18';

export const SOURCES = {
  // ── UK rules ──
  boePs: { publisher: 'Bank of England', title: 'Policy statement and draft rules: sterling-denominated systemic stablecoins', date: '22 Jun 2026', url: 'https://www.bankofengland.co.uk/paper/2026/ps/sterling-denominated-systemic-stablecoin', kind: 'central-bank', checked: C17, note: 'REG-05–09' },
  boeNews: { publisher: 'Bank of England', title: 'Bank launches policy statement and draft rules on systemic stablecoins', date: '22 Jun 2026', url: 'https://www.bankofengland.co.uk/news/2026/june/boe-launches-policy-statement-and-draft-rules-on-regulating-systemic-stablecoins', kind: 'central-bank', checked: C17, note: 'REG-06–07' },
  boeFca: { publisher: 'Bank of England and FCA', title: 'Approach to joint regulation of systemic stablecoin issuers', date: '30 Jun 2026', url: 'https://www.bankofengland.co.uk/paper/2026/boe-and-fcas-approach-to-joint-regulation-of-systemic-stablecoin-issuers', kind: 'regulator', checked: C17, note: 'REG-11' },
  ukSi102: { publisher: 'legislation.gov.uk', title: 'FSMA 2000 (Cryptoassets) Regulations 2026, SI 2026/102', date: '4 Feb 2026', url: 'https://www.legislation.gov.uk/uksi/2026/102/made', kind: 'law', checked: C17, note: 'REG-13–15' },
  fcaRegime: { publisher: 'FCA', title: 'Cryptoasset regime policy statements PS26/9 to PS26/13', date: '30 Jun 2026', url: 'https://www.fca.org.uk/publications/policy-statements/cryptoasset-regime', kind: 'regulator', checked: C17, note: 'REG-25–29' },
  hmtAmendSi: { publisher: 'HM Treasury', title: 'Draft FSMA 2000 (Cryptoassets) (Miscellaneous Amendments) Regulations 2026', date: 'laid Sep 2026', url: 'https://www.legislation.gov.uk/ukdsi/2026/9780348287233/pdfs/ukdsi_9780348287233_en.pdf', kind: 'law', checked: C17, note: 'REG-17–19; whether made was unconfirmed at 18 Nov' },
  hmtPayments: { publisher: 'Linklaters (on HM Treasury)', title: 'HMT consults on stablecoins in payments law', date: '14 Jul 2026', url: 'https://financialregulation.linklaters.com/post/102nbw6/uk-to-future-proof-payment-services-hmt-consults-on-stablecoins-ai-and-open-ban', kind: 'law-firm', checked: C18, note: 'REG-20; secondary', caveat: 'law-firm summary of the consultation' },
  praLetter: { publisher: 'Linklaters (on the PRA)', title: 'PRA letter on deposits, e-money and regulated stablecoins', date: '18 May 2026', url: 'https://financialregulation.linklaters.com/post/102mv7t/uk-prudential-regulator-updates-policy-on-crypto-exposures-and-stablecoin-issuanc', kind: 'law-firm', checked: C17, note: 'REG-33–34; PRA PDF encrypted, read via secondary', caveat: 'the PRA letter itself could not be read; law-firm summary' },
  ukTravelRule: { publisher: 'legislation.gov.uk', title: 'Money Laundering Regulations 2017, Part 7A (Travel Rule)', date: 'in force 1 Sep 2023', url: 'https://www.legislation.gov.uk/uksi/2017/692/part/7A', kind: 'law', checked: C17, note: 'AML-15–19' },
  ukSi621: { publisher: 'legislation.gov.uk', title: 'SI 2026/621: Travel Rule threshold £800', date: '30 Jun 2026', url: 'https://www.legislation.gov.uk/uksi/2026/621/note/made', kind: 'law', checked: C17, note: 'AML-17, AML-32' },
  fcaTravelRule: { publisher: 'FCA', title: 'Expectations for UK cryptoasset businesses complying with the Travel Rule', date: '17 Aug 2023', url: 'https://www.fca.org.uk/news/statements/fca-sets-out-expectations-uk-cryptoasset-businesses-complying-travel-rule', kind: 'regulator', checked: C17, note: 'AML-20' },
  ofsi: { publisher: 'OFSI (HM Treasury)', title: 'Cryptoassets threat assessment', date: 'Jul 2025', url: 'https://assets.publishing.service.gov.uk/media/687e6362791bb4d8c309a06e/OFSI_Cryptoassets_Threat_Assessment.pdf', kind: 'regulator', checked: C17, note: 'AML-24–28, AML-41, AML-54' },
  jmlsg: { publisher: 'JMLSG', title: 'Sector 22 Annex I: cryptoasset transfers', date: 'Jul 2023', url: 'https://www.jmlsg.org.uk/wp-content/uploads/2023/07/JMLSG-Guidance_Sector-22-Annex-I_Board-approved-1.pdf', kind: 'regulator', checked: C17, note: 'AML-22–23; industry guidance approved by HMT' },
  poca: { publisher: 'legislation.gov.uk', title: 'Proceeds of Crime Act 2002, s.335 (appropriate consent)', date: 'in force', url: 'https://www.legislation.gov.uk/ukpga/2002/29/section/335', kind: 'law', checked: C17, note: 'AML-30' },
  ukA7: { publisher: 'FCDO', title: 'UK targets sanctions circumvention and crypto networks exploited by Russia', date: '20 Aug 2025', url: 'https://www.gov.uk/government/news/uk-targets-sanctions-circumvention-and-crypto-networks-exploited-by-russia', kind: 'regulator', checked: C17, note: 'AML-40' },

  // ── US and EU rules ──
  genius: { publisher: 'US Congress', title: 'GENIUS Act, Pub. L. 119-27', date: '18 Jul 2025', url: 'https://www.govinfo.gov/content/pkg/PLAW-119publ27/html/PLAW-119publ27.htm', kind: 'law', checked: C17, note: 'REG-35–40' },
  occRule: { publisher: 'OCC', title: 'OCC finalises GENIUS Act framework', date: '21 Oct 2026', url: 'https://www.occ.gov/news-issuances/news-releases/2026/nr-occ-2026-92.html', kind: 'regulator', checked: C17, note: 'REG-40–41' },
  ofacA7: { publisher: 'US Treasury', title: 'A7 Network designated as a transnational criminal organisation', date: '1 Oct 2026', url: 'https://home.treasury.gov/news/press-releases/sb0644', kind: 'regulator', checked: C17, note: 'AML-44' },
  fdicTokenised: { publisher: 'FDIC', title: 'Proposed rule implementing the GENIUS Act', date: '9 Apr 2026', url: 'https://www.fdic.gov/news/financial-institution-letters/2026/notice-proposed-rulemaking-establish-genius-act', kind: 'regulator', checked: C17, note: 'ISS-72; proposal' },
  mica: { publisher: 'EUR-Lex', title: 'Markets in Crypto-Assets Regulation (EU) 2023/1114', date: 'applied 2024', url: 'https://eur-lex.europa.eu/eli/reg/2023/1114/oj', kind: 'law', checked: C17, note: 'REG-46–47' },
  ebaMica: { publisher: 'EBA', title: 'EBA identifies priorities for the review of MiCA', date: '24 Sep 2026', url: 'https://www.eba.europa.eu/publications-and-media/press-releases/eba-identifies-priorities-review-mica', kind: 'regulator', checked: C17, note: 'REG-48, REG-50' },
  euTfr: { publisher: 'EUR-Lex', title: 'Transfer of Funds Regulation (EU) 2023/1113', date: 'applied 30 Dec 2024', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1113', kind: 'law', checked: C17, note: 'AML-33–34' },

  // ── International bodies and research ──
  fatf2026: { publisher: 'FATF', title: 'Targeted update on virtual assets and VASPs', date: 'Jul 2026', url: 'https://www.fatf-gafi.org/en/publications/Fatfrecommendations/targeted-updated-virtualassets-vasps-2026.html', kind: 'intl-org', checked: C17, note: 'REG-55–59, AML-01–10; FATF site blocked automated reading, text read from the FIAU Malta copy', caveat: 'read from a copy hosted by Malta’s FIAU' },
  fsb2026: { publisher: 'FSB', title: 'G20 cross-border payments roadmap: consolidated progress report 2026', date: '16 Nov 2026', url: 'https://www.fsb.org/2026/11/g20-roadmap-for-enhancing-cross-border-payments-consolidated-progress-report-for-2026/', kind: 'intl-org', checked: C18, note: 'PAY-14, PAY-19–21' },
  fsb2025: { publisher: 'FSB', title: 'G20 cross-border payments roadmap: progress report 2025', date: '9 Oct 2025', url: 'https://www.fsb.org/2025/10/g20-roadmap-for-cross-border-payments-consolidated-progress-report-for-2025/', kind: 'intl-org', checked: C18, note: 'PAY-18' },
  fsbTargets: { publisher: 'FSB', title: 'Targets for addressing the four challenges of cross-border payments', date: 'Oct 2021', url: 'https://www.fsb.org/2021/10/targets-for-addressing-the-four-challenges-of-cross-border-payments-final-report/', kind: 'intl-org', checked: C18, note: 'PAY-16–17' },
  fsbStablecoin: { publisher: 'FSB', title: 'Global stablecoin arrangements: cross-border vulnerabilities', date: '12 Oct 2026', url: 'https://www.fsb.org/2026/10/global-stablecoin-arrangements-cross-border-vulnerabilities-and-financial-stability-monitoring/', kind: 'intl-org', checked: C18, note: 'REG-62' },
  imfWp230: { publisher: 'IMF', title: 'Deconstructing the stablecoin sandwich (WP/26/230)', date: '30 Oct 2026', url: 'https://www.imf.org/en/publications/wp/issues/2026/10/30/deconstructing-the-stablecoin-sandwich-the-cost-of-cross-border-stablecoin-transfers-580817', kind: 'intl-org', checked: C18, note: 'PAY-01–06; full text did not load, figures from abstract and coverage', caveat: 'figures from the abstract and press coverage; full text not read' },
  imfKatz: { publisher: 'IMF', title: 'Stablecoins and emerging markets (speech, Dan Katz)', date: '7 Aug 2026', url: 'https://www.imf.org/en/news/articles/2026/08/07/sp080726-stablecoins-emerging-markets-dan-katz', kind: 'intl-org', checked: C18, note: 'PAY-33, PAY-43' },
  bisAer2026: { publisher: 'BIS', title: 'Annual Economic Report 2026, chapter III', date: '23 Jun 2026', url: 'https://www.bis.org/publ/arpdf/ar2026e3.htm', kind: 'intl-org', checked: C18, note: 'PAY-31–32, PAY-40–42' },
  bisAer2025: { publisher: 'BIS', title: 'Annual Economic Report 2025, chapter III', date: 'Jun 2025', url: 'https://www.bis.org/publ/arpdf/ar2025e3.htm', kind: 'intl-org', checked: C18, note: 'PAY-39, XCH-65' },
  bisWp1385: { publisher: 'BIS', title: 'Competing rails: cross-border payments, banks, fintechs and stablecoins (WP 1385)', date: 'Oct 2026', url: 'https://www.bis.org/publications/working-paper-1385-competing-rails-crossborder-payments-banks-fintechs-and-stablecoins', kind: 'research', checked: C18, note: 'PAY-07–13' },
  bisWp1359: { publisher: 'BIS', title: 'Stablecoin transfers are not payments (WP 1359)', date: '11 Jun 2026', url: 'https://www.bis.org/publ/work1359.htm', kind: 'research', checked: C18, note: 'PAY-35' },
  bisWp1270: { publisher: 'BIS', title: 'Stablecoins and safe asset prices (WP 1270)', date: 'May 2025', url: 'https://www.bis.org/publ/work1270.htm', kind: 'research', checked: C18, note: 'PAY-46' },
  bisPapers170: { publisher: 'BIS', title: 'BIS Papers 170: stablecoin scenarios', date: '5 May 2026', url: 'https://www.bis.org/publ/bppdf/bispap170.htm', kind: 'research', checked: C18, note: 'PAY-45' },
  bisAgora: { publisher: 'BIS', title: 'Project Agorá report', date: '27 May 2026', url: 'https://www.bis.org/press/p260527.htm', kind: 'intl-org', checked: C18, note: 'PAY-29' },
  nexus: { publisher: 'Nexus Global Payments', title: 'Technical operator appointed; go-live targeted for 2027', date: '9 Feb 2026', url: 'https://nexusglobalpayments.org/nexus-global-payments-appoints-technical-operator/', kind: 'operator', checked: C18, note: 'PAY-26' },
  swiftSpeed: { publisher: 'Swift (press release, reproduced)', title: 'Half of payments on Swift reach the bank within 40 seconds', date: '12 Nov 2026', url: 'https://www.crypto-reporter.com/newsfeed/spotlight-on-speed-half-of-payments-on-swift-reach-bank-within-40-seconds-but-domestic-delays-impact-user-experience-133280/', kind: 'operator', checked: C18, note: 'PAY-22; operator data, Swift page not reachable', caveat: 'Swift’s own figures, read from a reproduction of its press release' },
  mckinsey: { publisher: 'McKinsey with Artemis', title: 'Stablecoins in payments: what the raw transaction numbers miss', date: 'early 2026', url: 'https://www.mckinsey.com/industries/financial-services/our-insights/stablecoins-in-payments-what-the-raw-transaction-numbers-miss', kind: 'vendor-data', checked: C18, note: 'PAY-34; page did not load, figures via BIS and IMF citations', caveat: 'page could not be read; figures as cited by others' },
  chainalysisAdoption: { publisher: 'Chainalysis', title: '2026 Global Crypto Adoption Index', date: '23 Sep 2026', url: 'https://www.chainalysis.com/blog/2026-global-crypto-adoption-index/', kind: 'vendor-data', checked: C18, note: 'PAY-37' },
  visaFy25: { publisher: 'Visa', title: 'Fiscal 2025 Annual Report', date: 'Nov 2025', url: 'https://s29.q4cdn.com/385744025/files/doc_downloads/2025/Visa-Fiscal-2025-Annual-Report.pdf', kind: 'issuer', checked: C18, note: 'PAY-51' },
  stanChart: { publisher: 'Standard Chartered, via The Block', title: 'USD 1tn could leave emerging-market deposits by 2028 (scenario)', date: '6 Oct 2025', url: 'https://www.theblock.co/post/373510/standard-chartered-estimates-1-trillion-could-exit-emerging-market-bank-deposits', kind: 'press', checked: C18, note: 'PAY-47; bank research scenario' },

  // ── Market data and issuers ──
  defillama: { publisher: 'DefiLlama', title: 'Stablecoin supply data', date: '17 Nov 2026', url: 'https://stablecoins.llama.fi/stablecoincharts/all', kind: 'vendor-data', checked: C17, note: 'ISS-01–05' },
  circleTransparency: { publisher: 'Circle', title: 'USDC transparency and reserves', date: '16 Nov 2026', url: 'https://www.circle.com/transparency', kind: 'issuer', checked: C17, note: 'ISS-07–08, ISS-18' },
  circleQ3: { publisher: 'Circle (SEC filing)', title: 'Q3 2026 results', date: '4 Nov 2026', url: 'https://www.sec.gov/Archives/edgar/data/1876042/000187604226000309/finalq3epr-110326.htm', kind: 'issuer', checked: C17, note: 'ISS-12' },
  circleTerms: { publisher: 'Circle', title: 'USDC terms', date: 'updated 15 Oct 2026', url: 'https://www.circle.com/legal/usdc-terms', kind: 'issuer', checked: C17, note: 'ISS-10' },
  circleCoinbase: { publisher: 'Decrypt (on Circle’s S-1)', title: 'Coinbase’s share of USDC reserve income', date: 'Apr 2025', url: 'https://decrypt.co/312757/coinbase-circles-residual-usdc-reserve-revenue-sharing-filing', kind: 'press', checked: C17, note: 'ISS-13' },
  tetherQ3: { publisher: 'Tether', title: 'Q3 2026 attestation and profit', date: '30 Oct 2026', url: 'https://tether.io/news/tether-generates-1-5-billion-in-q3-net-operating-profit-as-reserve-buffer-doubles-to-almost-8-billion/', kind: 'issuer', checked: C17, note: 'ISS-19' },
  tetherFees: { publisher: 'Tether', title: 'Fees: minimums and redemption charges', date: 'live page', url: 'https://tether.to/en/fees/', kind: 'issuer', checked: C17, note: 'ISS-22, XCH-59' },
  tetherTerms: { publisher: 'Tether', title: 'Terms of service', date: 'updated 26 Feb 2026', url: 'https://tether.to/en/legal/', kind: 'issuer', checked: C17, note: 'XCH-60' },
  paxosPyusd: { publisher: 'Paxos', title: 'PayPal USD (issued by Paxos)', date: '17 Nov 2026', url: 'https://www.paxos.com/pyusd', kind: 'issuer', checked: C17, note: 'ISS-28' },
  paxosUsdg: { publisher: 'Paxos', title: 'USDG', date: '17 Nov 2026', url: 'https://www.paxos.com/assets/usdg', kind: 'issuer', checked: C17, note: 'ISS-39–40' },
  gdn: { publisher: 'Global Dollar Network', title: 'Partner rewards from USDG reserves', date: '23 Oct 2026', url: 'https://www.globaldollar.com/', kind: 'issuer', checked: C17, note: 'ISS-41' },
  rippleTerms: { publisher: 'Ripple', title: 'RLUSD terms', date: 'updated 16 Nov 2026', url: 'https://ripple.com/legal/stablecoin/', kind: 'issuer', checked: C17, note: 'ISS-33' },
  bridgeOusd: { publisher: 'Bridge', title: 'OUSD is live, issued by Bridge', date: '30 Sep 2026', url: 'https://www.bridge.xyz/blog/ousd-is-live-issued-by-bridge', kind: 'issuer', checked: C17, note: 'ISS-48–49' },
  openStandard: { publisher: 'Open Standard', title: 'About Open Standard', date: '17 Nov 2026', url: 'https://joinopenstandard.com/about', kind: 'operator', checked: C17, note: 'ISS-51' },
  jpmCoin: { publisher: 'JPMorgan Kinexys', title: 'JPM Coin: a bank-issued deposit token', date: '17 Nov 2026', url: 'https://www.jpmorgan.com/kinexys/digital-payments/jpm-coin', kind: 'issuer', checked: C17, note: 'ISS-68' },
  citiToken: { publisher: 'Citi', title: 'Citi Token Services expands to Japan and the UAE', date: '28 Sep 2026', url: 'https://www.citigroup.com/global/news/press-release/2026/citi-token-services-expands-global-footprint-japan-united-arab-emirates', kind: 'issuer', checked: C17, note: 'ISS-70' },
  hsbcTds: { publisher: 'HSBC', title: 'Tokenised Deposit Service expands to the US', date: '13 Apr 2026', url: 'https://www.about.us.hsbc.com/newsroom/press-releases/hsbc-expands-tokenized-deposit-service-to-the-united-states', kind: 'issuer', checked: C17, note: 'ISS-71' },
  qivalis: { publisher: 'Qivalis', title: 'Authorised as an e-money institution by De Nederlandsche Bank', date: '14 Oct 2026', url: 'https://qivalis.eu/press/news/qivalis-receives-authorisation-as-an-electronic-money-institution-from-de-nederlandsche-bank', kind: 'issuer', checked: C17, note: 'ISS-61' },
  sofi: { publisher: 'The Block', title: 'SoFi launches SoFiUSD, issued by SoFi Bank', date: '2026', url: 'https://www.theblock.co/post/383146/sofi-launches-sofi-usd-stablecoin', kind: 'press', checked: C17, note: 'ISS-73' },
  secTerra: { publisher: 'SEC', title: 'Terraform and Kwon to pay $4.5 billion following fraud verdict', date: '13 Jun 2024', url: 'https://www.sec.gov/newsroom/press-releases/2024-73', kind: 'regulator', checked: '2026-11-19' },
  secTaiMoShan: { publisher: 'SEC', title: 'Tai Mo Shan to pay $123 million for misleading investors about UST', date: 'Dec 2024', url: 'https://www.sec.gov/newsroom/press-releases/2024-212', kind: 'regulator', checked: '2026-11-19' },
  svbUsdc: { publisher: 'The Block', title: 'USDC trades near $0.90 after Circle discloses funds at SVB', date: '11 Mar 2023', url: 'https://www.theblock.co/post/218993/usdc-and-dai-remain-at-about-0-90-following-circles-disclosure-of-funds-at-svb', kind: 'press', checked: C17, note: 'XCH-68' },

  // ── Cross-chain and operations ──
  cctpRetry: { publisher: 'Circle', title: 'CCTP: retry a failed mint (minting is idempotent)', date: 'live docs', url: 'https://developers.circle.com/cctp/howtos/retry-failed-mint.md', kind: 'issuer', checked: C17, note: 'XCH-10–13' },
  cctpFast: { publisher: 'Circle', title: 'CCTP Fast Transfer allowance', date: 'live docs', url: 'https://developers.circle.com/cctp/concepts/fast-transfer-allowance.md', kind: 'issuer', checked: C17, note: 'XCH-04–05' },
  cctpV1: { publisher: 'Circle', title: 'Migrate to CCTP V2 before V1 is paused on 1 Dec 2026', date: '27 Aug 2026', url: 'https://www.circle.com/blog/migrate-to-cctp-v2-ahead-of-cctp-v1-legacy-deprecation', kind: 'issuer', checked: C17, note: 'XCH-08' },
  usdt0: { publisher: 'USDT0', title: 'USDT0 documentation: moving USDT between chains', date: 'live docs', url: 'https://docs.usdt0.to/', kind: 'operator', checked: C17, note: 'XCH-28–30; operator not identified in the docs', caveat: 'operator not identified in its documentation' },
  cpn: { publisher: 'Circle', title: 'Circle Payments Network', date: '17 Nov 2026', url: 'https://www.circle.com/cpn', kind: 'operator', checked: C17, note: 'XCH-18, XCH-22, XCH-24' },
  cpnStates: { publisher: 'Circle', title: 'CPN payment states and workflows', date: 'live docs', url: 'https://developers.circle.com/cpn/concepts/payments/component-states-and-workflows.md', kind: 'operator', checked: C17, note: 'XCH-21' },
  circleMint: { publisher: 'Circle', title: 'How minting works (Circle Mint)', date: 'live docs', url: 'https://developers.circle.com/circle-mint/concepts/how-minting-works.md', kind: 'issuer', checked: C17, note: 'XCH-54–55' },
  circleMatch: { publisher: 'Circle', title: 'Circle Match: hourly netting of mint and redeem orders', date: '22 Oct 2026', url: 'https://www.circle.com/blog/circle-match-get-a-rebate-to-mint-set-your-price-to-redeem', kind: 'issuer', checked: C17, note: 'XCH-57' },
  circleDenial: { publisher: 'Circle', title: 'Stablecoin access denial policy', date: 'May 2026', url: 'https://www.circle.com/hubfs/Blog%20Posts/Circle%20Stablecoin%20Access%20Denial%20Policy_pdf.pdf', kind: 'issuer', checked: C17, note: 'XCH-73' },
  kelpdao: { publisher: 'LayerZero Labs', title: 'KelpDAO incident report', date: '18 May 2026', url: 'https://layerzero.network/publications/kelpdao-incident-report.pdf', kind: 'operator', checked: C17, note: 'XCH-33' },
  chainalysisHacks: { publisher: 'Chainalysis', title: '2022: biggest year ever for crypto hacking', date: '1 Feb 2023', url: 'https://www.chainalysis.com/blog/2022-biggest-year-ever-for-crypto-hacking/', kind: 'vendor-data', checked: C17, note: 'XCH-42' },
  ethFinality: { publisher: 'ethereum.org', title: 'Single-slot finality (about 15 minutes to finalise today)', date: 'updated 16 Oct 2026', url: 'https://ethereum.org/en/roadmap/single-slot-finality/', kind: 'research', checked: C17, note: 'XCH-45' },
  opRollups: { publisher: 'ethereum.org', title: 'Optimistic rollups: seven-day withdrawal challenge', date: 'updated 21 Oct 2026', url: 'https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/', kind: 'research', checked: C17, note: 'XCH-50' },

  // ── Economic crime data ──
  chainalysisCrime: { publisher: 'Chainalysis', title: '2026 Crypto Crime Report: introduction', date: '8 Jan 2026', url: 'https://www.chainalysis.com/blog/2026-crypto-crime-report-introduction/', kind: 'vendor-data', checked: C17, note: 'AML-61' },
  trmCrime: { publisher: 'TRM Labs', title: '2026 Crypto Crime Report: USD 158bn of illicit flows in 2025', date: '10 Jan 2026', url: 'https://www.trmlabs.com/resources/blog/2026-crypto-crime-report-key-insights-trm-identifies-record-usd-158-billion-in-illicit-crypto-flows-in-2025-reversing-a-multi-year-decline', kind: 'vendor-data', checked: C17, note: 'AML-62' },
  ellipticBinance: { publisher: 'Elliptic', title: 'Binance: the largest hack in history', date: 'Nov 2026', url: 'https://www.elliptic.co/insights/binance-largest-hack-in-history/', kind: 'vendor-data', checked: C17, note: 'AML-51' },
  usenixPoisoning: { publisher: 'USENIX Security 2025', title: 'Address poisoning attacks on Ethereum and BSC', date: '2025', url: 'https://www.usenix.org/conference/usenixsecurity25/presentation/tsuchiya', kind: 'research', checked: C17, note: 'AML-72' },
} satisfies Record<string, ScSource>;

export type SourceId = keyof typeof SOURCES;

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const esc = (s: string): string => s.replace(/[&<>"]/g, c => ESC[c]);

export const sourceLabel = (id: SourceId): string => `${SOURCES[id].publisher}, ${SOURCES[id].date}`;

/** Reader-facing caveat for a source read indirectly or in part, if any. */
export const sourceCaveat = (id: SourceId): string | undefined => (SOURCES[id] as ScSource).caveat;

/** Point-of-use citation line, in the site's existing `sources-line` style. */
export function cite(...ids: SourceId[]): string {
  return `<p class="sources-line">Sources: ${ids.map(id =>
    `<a href="${esc(SOURCES[id].url)}" target="_blank" rel="noopener">${esc(sourceLabel(id))}</a>`).join(' · ')}</p>`;
}
