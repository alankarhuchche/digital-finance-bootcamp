import type { ModuleContent, ContentBlock } from '../types';
import type { ChapterSpec } from '../../types';
import { cite, SOURCES, sourceLabel, sourceCaveat, type SourceId } from '../stablecoins/sources.ts';

// Eleven chapters in three movements: Discover (1–2), Explore (3–7), Decide (8–11).
// Facts as publicly reported at 18 November 2026. Research registers: docs/stablecoins/research.
// Interactive scenes live in frontend/src/viz/stablecoins and share their model with the chat context.

const CHAPTERS: (ChapterSpec & { short: string })[] = [
  { id: 'ch-claim', num: '1', short: 'A claim, not a coin', title: 'A claim, not a coin',
    job: 'What a stablecoin is, why it trades near $1, and when it doesn’t.',
    ask: 'What is a stablecoin a claim on, and why does it usually trade close to $1?' },
  { id: 'ch-why', num: '2', short: 'Who uses them', title: 'Why they exist, and who really uses them',
    job: 'Trading first, then dollars, then payments. And the volume trap.',
    ask: 'Who actually uses stablecoins, and why is gross transfer volume not payment volume?' },
  { id: 'ch-follow', num: '3', short: 'Follow £1,000', title: 'Follow £1,000',
    job: 'One invoice, four routes. Watch what moves at every step.',
    ask: 'In Follow £1,000, why doesn’t a token arriving always mean the supplier has been paid?' },
  { id: 'ch-routes', num: '4', short: 'Pick a model', title: 'Pick the payment model',
    job: 'Describe the payment; see which operating models fit, and why.',
    ask: 'How do I choose between a bank transfer, a payment firm and a stablecoin route for a cross-border payment?' },
  { id: 'ch-liquidity', num: '5', short: 'Liquidity', title: 'Liquidity doesn’t go away',
    job: 'Prefunding, inventory, opening hours and who blinks first at the weekend.',
    ask: 'Why is liquidity still a problem for stablecoin payments if the token moves 24/7?' },
  { id: 'ch-chains', num: '6', short: 'Across chains', title: 'When one ledger isn’t enough',
    job: 'Burn and mint, bridges, pools and providers. What breaks, and what is safe to retry.',
    ask: 'What is the difference between moving USDC with the issuer’s burn-and-mint and using a bridge?' },
  { id: 'ch-controls', num: '7', short: 'Crime controls', title: 'Keeping crime out',
    job: 'What a bank can check before, during and after a stablecoin payment, and what it can’t.',
    ask: 'What should a UK bank check before paying a supplier’s self-custody wallet?' },
  { id: 'ch-economics', num: '8', short: 'Who earns what', title: 'Who earns what',
    job: 'Reserve income, distribution deals and who owes the holder.',
    ask: 'Who earns the interest on stablecoin reserves, and who owes the holder?' },
  { id: 'ch-economy', num: '9', short: 'Dollars abroad', title: 'Dollar stablecoins outside the US',
    job: 'Gains and costs for households, banks, central banks and issuers.',
    ask: 'What are the risks of dollar stablecoins for banks and central banks outside the US?' },
  { id: 'ch-uk', num: '10', short: 'A UK bank’s options', title: 'What a UK bank could do',
    job: 'The rules and their dates, the roles on offer, and when each option makes sense.',
    ask: 'What can a UK bank do with stablecoins today, and what has to wait for the 2027 regime?' },
  { id: 'ch-check', num: '11', short: 'Check yourself', title: 'Check yourself',
    job: 'Eight new situations, then every source on this page.' },
];

const chapter = (n: number): ContentBlock => {
  const c = CHAPTERS[n - 1];
  return { kind: 'chapter', data: { id: c.id, num: c.num, title: c.title, job: c.job, ask: c.ask } };
};
const text = (body: string): ContentBlock => ({ kind: 'text', body });
const scene = (s: Extract<ContentBlock, { kind: 'sc-scene' }>['scene']): ContentBlock => ({ kind: 'sc-scene', scene: s });

const ALL_SOURCE_IDS = Object.keys(SOURCES) as SourceId[];

const content: ModuleContent = {
  id: 'stablecoins',
  number: '06',
  title: 'Stablecoins',
  summary: 'What a stablecoin is, why moving one isn’t the same as paying someone, and what liquidity, cross-chain transfers, crime controls, reserve economics and UK rules mean for banks.',
  ready: true,
  layout: 'wide',
  updatedAt: '2026-11-25',
  changeType: 'updated',
  changeSummary: 'The £1,000 payment walkthrough now opens from the homepage. Share a chapter or a payment scenario with its route, step and price assumptions.',
  chat: {
    context: 'server',
    suggestions: [
      'Why isn’t a fast token transfer always a completed payment?',
      'When does a stablecoin route beat a bank transfer?',
      'What can a UK bank do with stablecoins before October 2027?',
    ],
  },
  blocks: [
    { kind: 'chapter-nav', data: { chapters: CHAPTERS.map(({ id, num, short }) => ({ id, num, short })) } },
    text(`<p>A stablecoin is a token that moves on a blockchain and is meant to be worth one unit of a currency, almost always the US dollar. Moving one takes seconds. Paying someone with one can take much longer, because a payment is complete only when the payee holds what it asked for.</p>
<h3 class="prose-kicker">In short</h3>
<ol class="takeaways">
<li>A stablecoin is a claim on the company that issued it, backed by reserves. It holds $1 because people who can redeem at $1 trade against the market price. When redemption is closed or the reserves are in doubt, the price can slip.</li>
<li>The blockchain leg is the cheap, fast part. Changing money in and out, finding someone licensed to pay out, and checking who is on the other end is where the cost and the waiting are. In the IMF’s 2026 study the blockchain was under a quarter of the cost.</li>
<li>Paid means the payee holds what it needs. A supplier that wants dollar tokens is paid when they arrive. A supplier that needs local currency in its bank is paid only when someone pays that out.</li>
<li>Stablecoins can help where banks have pulled out and a licensed off-ramp operates, where people need dollars and can’t get them, and between firms that settle with each other around the clock. They tend to lose where instant domestic systems and payment firms already serve a corridor well. Often they work behind those firms rather than against them.</li>
<li>For a UK bank in November 2026, the UK stablecoin regime doesn’t start until 25 October 2027, and overseas coins such as USDT and USDC stay inside the regulated perimeter. Tokenised deposits can be issued today under existing law.</li>
</ol>
<h3 class="prose-kicker">Three ways to read this page</h3>
<ul class="sc-paths">
<li><b>Five minutes</b> Read the points above, then chapters 1 to 3. Press “Compare all four” in chapter 3.</li>
<li><b>Payments practitioner</b> Chapters 3 to 7: routes, liquidity, cross-chain transfers and controls.</li>
<li><b>Bank leader</b> Chapters 8 to 10: economics, effects outside the US and UK options. Then test yourself in chapter 11.</li>
</ul>`),
    {
      kind: 'comparison',
      heading: 'The strongest case for, and against',
      data: {
        columns: [
          { title: 'The case for', subtitle: 'What advocates get right', points: [
            { label: 'Hours', value: 'Settles between providers at any hour, with a shared record of what moved.', emphasis: 'positive' },
            { label: 'Reach', value: 'Reaches payees where correspondent banks have withdrawn, and gives people in unstable currencies access to dollars.', emphasis: 'positive' },
            { label: 'Cost', value: 'In the IMF’s USD 200 study a stablecoin transfer cost about 2% with the cheapest ramps and 3% with typical ones, against 6.2% on average across traditional providers. The FSB says the G20’s 2027 targets are unlikely to be met.', emphasis: 'positive' },
            { label: 'Treasury', value: 'Firms can move their own liquidity between entities at weekends.', emphasis: 'positive' },
          ] },
          { title: 'The case against', subtitle: 'What sceptics get right', points: [
            { label: 'Ramps', value: 'Ramps, conversion and compliance are most of the cost. In about a third of the IMF’s corridors the cheapest traditional provider was cheaper, and the three cheapest traditional providers average 3.0%.', emphasis: 'negative' },
            { label: 'Issuers', value: 'Two issuers hold 85% of supply. Redemption rights, freezes and reserves sit outside the payer’s control, with no deposit insurance.', emphasis: 'negative' },
            { label: 'Redress', value: 'Mistakes and fraud are hard to reverse. Consumer protection is weaker than on domestic instant payments.', emphasis: 'negative' },
            { label: 'Alternatives', value: 'Instant domestic systems, Swift’s faster retail scheme, Nexus and tokenised deposits are meant to narrow the gap. Nexus isn’t live until its 2027 target, and Swift hasn’t reported volumes for its retail rules.', emphasis: 'negative' },
          ] },
        ],
      },
    },
    text(cite('imfWp230', 'fsb2026', 'fsb2025', 'defillama', 'nexus')),

    // ── 1 ─────────────────────────────────────────────────────────────
    chapter(1),
    text(`<p>A stablecoin is a token that represents a claim on the company that issued it. The issuer takes in dollars, holds reserves such as Treasury bills and cash, and promises to pay a dollar back for each token: to holders it has onboarded, on its terms. Tokens are created, or minted, when money comes in, and destroyed, or burned, when it goes out.</p>
<p>Two prices matter. The <b>redemption price</b> is $1 from the issuer, less any fee. The <b>market price</b> is whatever someone pays on an exchange. Most holders never redeem; they sell. The market price stays near $1 because those who can redeem buy below $1 and redeem, or mint at $1 and sell above it.</p>`),
    scene('peg'),
    text(`<p>Who can redeem, and how fast, depends on the rules the issuer is under. Under MiCA, holders of an e-money token can redeem at par at any time. The OCC’s rule under the US GENIUS Act requires redemption within two business days from 18 January 2027. The FCA’s rules, which apply from 25 October 2027, require redemption by the next business day once checks are done, and the Bank of England expects systemic sterling coins to pay out within 24 hours. Commercial terms add their own limits: Tether’s minimum is $100,000, with a fee of the greater of $1,000 or 0.1%.</p>
${cite('mica', 'occRule', 'fcaRegime', 'boePs', 'tetherFees')}
<details class="sc-deep"><summary>Deep dive: four designs, and how they failed</summary>
<p><b>Fiat-reserved</b> coins hold cash and short-term government debt. They are almost the whole market: on 17 November 2026, USDT was $175.2bn and USDC $69.2bn of $286.4bn in circulation. Their risk is the reserves and the issuer. In March 2023, with $3.3bn of its reserves at the failed Silicon Valley Bank, USDC fell to about $0.88 and recovered once US authorities protected the bank’s depositors. That episode cuts both ways: a stablecoin wobbled because a bank failed.</p>
<p><b>Crypto-collateralised</b> coins lock up more crypto than they issue and sell it if prices fall. Their risk is the collateral falling faster than it can be sold.</p>
<p><b>Algorithmic</b> coins hold nothing real and rely on a second token to absorb losses. TerraUSD collapsed in May 2022. In 2024 a US jury found its issuer and founder liable for fraud, with $4.5bn in penalties, and the SEC found that a trading firm had secretly propped up the coin’s price in 2021.</p>
<p><b>Hybrids</b> mix these. The label matters less than the answer to one question: if everyone wanted out on the same day, what would be there to pay them?</p>
${cite('defillama', 'svbUsdc', 'secTerra', 'secTaiMoShan')}
</details>`),
    {
      kind: 'matrix',
      heading: 'Six kinds of money, compared',
      data: {
        columns: ['Whose liability', 'What protects the holder', 'Who can hold it'],
        items: [
          { id: 'cash', label: 'Cash', color: '#9FB7CC', values: ['The central bank', 'It is central bank money', 'Anyone'] },
          { id: 'deposit', label: 'Bank deposit', color: '#5FB3A3', values: ['A commercial bank', 'Capital and liquidity rules, and deposit protection up to a limit', 'Customers of that bank'] },
          { id: 'emoney', label: 'E-money', color: '#7AA7D9', values: ['An e-money firm', 'Safeguarded client funds, not deposit protection', 'Customers of that firm'] },
          { id: 'tokdep', label: 'Tokenised deposit', color: '#5FB3A3', values: ['A commercial bank', 'The same as a deposit. The PRA expects retail ones to meet depositor-protection rules', 'Clients of that bank or bank network'] },
          { id: 'stable', label: 'Stablecoin', color: '#E8A33D', values: ['The issuer', 'Reserves held for holders, on the terms of its regime. No deposit protection', 'Any wallet the issuer hasn’t blocked'] },
          { id: 'cbdc', label: 'Retail CBDC', color: '#9D7EC9', values: ['The central bank', 'It is central bank money', 'None live in the UK or US. The UK hasn’t decided on a digital pound'] },
        ],
      },
    },
    text(`<p><b>A bank-issued stablecoin is not a deposit token.</b> A tokenised deposit is the bank’s own deposit, recorded as a token: JPMorgan describes JPM Coin as a deposit token and “not a stablecoin”. A bank-issued stablecoin is backed by segregated reserves rather than by the bank’s deposit book: SG-FORGE, a Société Générale subsidiary, issues euro and dollar coins under MiCA, and SoFi Bank issues SoFiUSD itself. In the UK, the PRA expects a bank to offer retail digital money as deposits, and to issue a stablecoin only from a separate, insolvency-remote entity with its own branding.</p>
${cite('jpmCoin', 'sofi', 'praLetter')}`),

    // ── 2 ─────────────────────────────────────────────────────────────
    chapter(2),
    text(`<p>Stablecoins grew as the cash of crypto trading: a way to park value between trades without leaving the blockchain. The BIS says that is still their main use. More than 98% are in US dollars.</p>
<p>Real-world use is growing on top of that. People in unstable currencies use them to hold dollars. Firms use them to pay suppliers abroad and to move money between their own entities at weekends. Chainalysis counts $220bn of cross-border transfers it can attribute in the year to June 2026, with an average transfer of about $3,000. It is a vendor figure and a lower bound.</p>
<p>The trap is volume. Gross on-chain transfers in 2025 were somewhere between $28tn and $35tn, depending on who counts. That counts every hop: exchanges, trading bots, DeFi and people moving money between their own wallets. The BIS found that treating every on-chain transfer as a payment misclassifies about six in ten. Payments are a small part of the total.</p>`),
    scene('volume'),
    text(cite('bisAer2026', 'bisWp1359', 'chainalysisAdoption', 'mckinsey', 'imfKatz')),

    // ── 3 ─────────────────────────────────────────────────────────────
    chapter(3),
    text(`<p>Four ways to pay the same £1,000 invoice. At each step the scene shows what actually changes: the instruction or message, the value, whose ledgers are updated, who has custody, whose prefunded money is used, where currency is converted, and who owes whom. Change the situation to see when each route works and when it doesn’t.</p>
<p>The prices are illustrative and the same for every leg of the same type, so only each route’s structure differs. No published source prices a £1,000 UK-outbound payment: the IMF’s 2026 study measured USD 200 transfers, and World Bank data for UK corridors could not be retrieved. Put in real quotes if you have them.</p>`),
    scene('journey'),
    text(`<details class="sc-deep"><summary>Deep dive: what the published numbers do and don’t say</summary>
<p><b>Stablecoin routes.</b> The IMF priced fiat-to-stablecoin-to-fiat routes across 270 corridors for a USD 200 transfer. With the cheapest ramps the average all-in cost was 2.18%. With median-priced ramps it was 3.04%, and with the dearest 4.07%. At USD 5,000 it fell to 1.54%. Exchange trading fees and fiat deposit and withdrawal charges were most of the cost; the blockchain transfer was under a quarter. In about a third of the corridors where a comparison was possible, the cheapest traditional provider was cheaper. The study leaves out speed, counterparty risk and onboarding.</p>
<p><b>Traditional routes.</b> The global average cost of sending USD 200 was 6.2% in the first quarter of 2026. Large-bank retail wires can carry FX margins of 2–4% even on liquid currencies, while payment firms are far cheaper at larger amounts. The three cheapest traditional providers averaged 3.0%. The FSB says costs have been flat since 2023 and that the G20’s 2027 targets are unlikely to be met.</p>
<p><b>Speed.</b> Swift says 75% of its payments reach the beneficiary’s bank within 10 minutes. The FSB finds 57% of wholesale cross-border payments are credited to the end customer within an hour. Most of the delay is the last mile, inside the receiving country. In the FSB’s words, “faster payment initiation alone is not sufficient.”</p>
${cite('imfWp230', 'fsb2026', 'bisWp1385', 'swiftSpeed', 'fsb2025')}
</details>`),
    {
      kind: 'comparison',
      heading: 'Where stablecoin routes win, and where they lose',
      data: {
        columns: [
          { title: 'They tend to win', points: [
            { label: 'Hours', value: 'Settlement between providers at weekends and overnight.', emphasis: 'positive' },
            { label: 'Reach', value: 'Corridors correspondent banks have left, if a licensed off-ramp operates there.', emphasis: 'positive' },
            { label: 'Dollars', value: 'Payees who want dollars, or who already use dollar tokens.', emphasis: 'positive' },
            { label: 'Treasury', value: 'A firm moving its own liquidity between countries.', emphasis: 'positive' },
          ] },
          { title: 'They tend to lose', points: [
            { label: 'Served corridors', value: 'Where instant domestic systems and payment firms already serve the route well.', emphasis: 'negative' },
            { label: 'Thin currencies', value: 'Stablecoin trading against most currencies is thin. Only a handful, including GBP, trade more than $10m a day on exchanges.', emphasis: 'negative' },
            { label: 'Reversal', value: 'Anything needing refunds, chargebacks or fraud reimbursement.', emphasis: 'negative' },
            { label: 'Local money', value: 'Payees who need local currency in a bank, where two conversions add cost.', emphasis: 'negative' },
          ] },
        ],
      },
    },
    text(cite('bisWp1385', 'imfWp230')),

    // ── 4 ─────────────────────────────────────────────────────────────
    chapter(4),
    text(`<p>Three questions are easy to blur: which token (whose liability, on what terms), which route (how value travels), and who earns what (the partnership economics). This selector deals with the route. The rules are written out so you can disagree with them.</p>`),
    scene('routes'),
    text(`<p>Provider networks sit between these models. Circle’s payments network describes itself as an orchestration layer between financial institutions. The Circle entity that runs it says it holds no funds and is not a party to payments, though its separate managed service does hold assets. Its reported $58bn of annualised volume at 30 October 2026 is a 30-day run-rate scaled up to a year, not a measured annual flow.</p>
${cite('cpn', 'cpnStates')}`),

    // ── 5 ─────────────────────────────────────────────────────────────
    chapter(5),
    text(`<p>The token runs all day, every day. The money at either end doesn’t. Someone has to hold stablecoins ready to send, and someone at the far end has to hold local currency ready to pay out. That money is parked, and parked money costs something.</p>
<p>The rest is plumbing with opening hours. New coins are issued against US-dollar bank transfers, which follow banking days and cut-offs. Circle settles wires the same day before its cut-off and typically pays out the next business day, and Tether says redemptions can take several days. Market makers fill gaps at a spread, which widens under stress. Payments flowing the other way let firms net instead of converting, and Circle now nets mint and redeem orders hourly. Credit can bridge a gap, but no issuer was found minting before the money arrives: issuance is cash in advance, which the BIS says limits how far supply can stretch.</p>`),
    scene('liquidity'),
    text(cite('circleMint', 'tetherTerms', 'circleMatch', 'bisAer2025', 'bisWp1385')),

    // ── 6 ─────────────────────────────────────────────────────────────
    chapter(6),
    text(`<p>The same coin lives on many blockchains. USDC is on 39, two of them now redemption-only, and Circle’s burn-and-mint protocol links 31. USDT, 61% of supply, has no issuer-run equivalent: moving it between chains relies on third-party mechanisms such as USDT0, or on exchanges. A bank whose coins sit on one chain and whose payee is on another has four ways across, and each trusts something different.</p>
<ul>
<li><b>The issuer’s burn and mint.</b> The coins are destroyed on one chain and, once the issuer signs a confirmation, created on the other. Circle documents that minting is idempotent: each confirmation can be used once, so a failed mint can be retried safely. Burning again is a second transfer. A faster option credits the destination before the source chain is final, backed by a Circle-funded allowance; when that runs out, only the standard path is available. Confirmations expire after about 24 hours and can be reissued. The old version of the protocol is being paused on 1 December 2026.</li>
<li><b>A lock-and-mint bridge.</b> The coins are locked on one chain and the bridge mints its own wrapped token on the other. That wrapped token is a claim on the bridge, not on the issuer. Bridges were the source of 64% of the $3.1bn stolen from DeFi in 2022, and KelpDAO lost about $292m in April 2026 through a bridge set up with a single verifier.</li>
<li><b>A liquidity pool.</b> Coins go into a pool on one chain and come out of a pool on the other, if it holds enough.</li>
<li><b>A provider.</b> The provider receives on one chain and pays from its own inventory on the other. The bank swaps blockchain risk for counterparty risk.</li>
</ul>
<p>“Final” also means different things. An Ethereum block takes about 15 minutes to become final. Withdrawals from optimistic rollups to Ethereum wait about seven days. A bank should keep the money in an in-transit account until the destination is final, and look up an unknown outcome before it does anything else.</p>`),
    scene('crossledger'),
    text(cite('circleTransparency', 'cctpRetry', 'cctpFast', 'cctpV1', 'usdt0', 'defillama', 'chainalysisHacks', 'kelpdao', 'ethFinality', 'opRollups')),

    // ── 7 ─────────────────────────────────────────────────────────────
    chapter(7),
    text(`<p>A stablecoin payment carries the same duties as any other: know the customer, screen for sanctions, monitor and report. What changes is what the bank can see. An address on a blockchain shows its history and its counterparties, not who controls it.</p>
<p>The Travel Rule makes crypto firms pass sender and recipient details with each transfer. In the UK it has applied since September 2023, and since 30 June 2026 full originator data is needed on cross-border transfers of £800 or more. Coverage abroad is patchy: 83% of jurisdictions in the FATF’s 2026 survey had Travel Rule laws, but 60% of those had taken no supervisory action. For self-custody wallets the UK is risk-based. The EU requires firms to check who owns the wallet for transfers over €1,000.</p>
<p>Which rules bite depends on the bank’s role. If it sends tokens from its own custody, it is acting as a cryptoasset business: Travel Rule duties apply, and if it asks a customer for information about a self-custody wallet and doesn’t get it, it must not make the transfer. If it only pays money to a licensed provider that sends the tokens, the Travel Rule sits with that provider, and the bank keeps its own customer, sanctions and reporting duties.</p>
<p>Two numbers are often misread. Stablecoins made up 84% of illicit crypto volume in 2025, according to Chainalysis, but that is driven by flows to sanctioned entities, and TRM puts all illicit activity at about 1.2% of the volume it can attribute. And an issuer’s power to freeze tokens is not a backstop: when attackers stole about $6bn from Binance in October 2026, hundreds of millions in stablecoins were swapped before the issuers froze the rest.</p>`),
    scene('controls'),
    text(cite('ukTravelRule', 'ukSi621', 'jmlsg', 'fatf2026', 'euTfr', 'chainalysisCrime', 'trmCrime', 'ellipticBinance', 'ofsi')),

    // ── 8 ─────────────────────────────────────────────────────────────
    chapter(8),
    text(`<p>A stablecoin issuer’s main income is the interest on its reserves. Holders get no interest from the issuer: that is banned under MiCA now, under the GENIUS Act from January 2027 and under the UK rules from October 2027. Some platforms pass part of their share back as rewards, which is the open question in the US. Getting coins into wallets is the expensive part, so distribution is paid for. In the third quarter of 2026 Circle earned $658m of reserve income and paid $409m in distribution and transaction costs. Under its agreement with Coinbase, disclosed in 2025, Coinbase takes half of the residual income and all of the income on USDC held on Coinbase.</p>
<p>Networks share that income openly. Paxos offers partners up to 100% of the returns on USDG held on their platforms. Open USD went live on 30 September 2026, issued by Bridge, part of Stripe, under a company founded by Coinbase, Mastercard, Shopify, Stripe and Visa. Its supply was about $961m on 17 November. It says most reserve income goes to participants, but no payouts or fees have been published, so that is a stated design rather than evidence. For issuer-by-issuer detail, see <a href="/topic/stablecoin-market-structure" data-topic="stablecoin-market-structure">Stablecoin market structure</a>.</p>`),
    scene('reserve'),
    text(cite('circleQ3', 'circleCoinbase', 'gdn', 'bridgeOusd', 'openStandard', 'defillama', 'genius')),

    // ── 9 ─────────────────────────────────────────────────────────────
    chapter(9),
    text(`<p>A dollar stablecoin can be a lifeline for a household in a country with high inflation and a problem for that country’s banks and central bank, both at once. Keep three labels apart. <b>Mechanisms</b> are well argued: deposits that fund lending can leave, monetary policy weakens, and capital controls are harder to enforce. <b>Measured effects</b> are small so far: inflows move short-dated US Treasury yields by a few basis points, and the IMF found no clear drain on bank deposits in El Salvador, though that country already uses the dollar, so it is a weak test of substitution. <b>Scenarios</b> are large: one bank’s research puts possible emerging-market deposit outflows at $1tn by 2028.</p>`),
    scene('lens'),
    text(cite('bisAer2026', 'imfKatz', 'bisWp1270', 'bisPapers170', 'stanChart', 'boePs')),

    // ── 10 ────────────────────────────────────────────────────────────
    chapter(10),
    text(`<p>The UK has written its rules but not switched them on. The cryptoasset regulations were made on 4 February 2026 and the FCA published final rules on 30 June 2026; both apply from <b>25 October 2027</b>. Firms already operating must apply between 30 September 2026 and 28 February 2027. The Bank of England will supervise sterling stablecoins that the Treasury recognises as systemic. Its June 2026 policy dropped the proposed holding limits for a temporary £40bn issuance cap per coin, with backing of up to 70% in short-dated gilts and the rest in Bank of England deposits that pay no interest. Its rules are still a draft, due to be finalised by the end of 2026, and no coin has been recognised.</p>
<p>Payments are the least settled area. Draft legislation would take payments in UK-issued stablecoins out of the dealing and arranging rules. Overseas coins such as USDT and USDC would stay inside them. A Treasury proposal to bring stablecoin payments into payments law would admit overseas coins only if their home regime is judged to give similar outcomes.</p>
${cite('ukSi102', 'fcaRegime', 'boePs', 'boeFca', 'hmtAmendSi', 'hmtPayments', 'praLetter')}`),
    {
      kind: 'matrix',
      heading: 'Roles a UK bank could take, and their status at 18 November 2026',
      data: {
        columns: ['What applies', 'Status today'],
        items: [
          { id: 'tokdep', label: 'Issue tokenised deposits', color: '#5FB3A3', values: ['Existing deposit-taking permission. Retail ones must meet depositor-protection rules', 'Live under existing law'] },
          { id: 'issue', label: 'Issue a sterling stablecoin', color: '#E8A33D', values: ['FCA issuing permission; a separate, insolvency-remote entity; Bank of England rules if systemic', 'Rules final, not in force until 25 Oct 2027'] },
          { id: 'custody', label: 'Hold coins for clients', color: '#7AA7D9', values: ['Money-laundering registration today; FCA safeguarding permission from Oct 2027', 'Registration live; new regime not in force'] },
          { id: 'ramp', label: 'Sell or buy coins for clients', color: '#7AA7D9', values: ['Registration and promotion rules today; FCA dealing and arranging from Oct 2027', 'Overseas coins stay in scope'] },
          { id: 'pay', label: 'Send payments using third-party coins', color: '#E0726B', values: ['Not clearly covered by payments law today. A Treasury proposal would change that', 'Least settled'] },
          { id: 'none', label: 'Stay out, for now', color: '#9FB7CC', values: ['Monitor the 2027 regime and client demand', 'A legitimate choice'] },
        ],
      },
    },
    text(`<h3 class="prose-kicker">Options, and when each makes sense</h3>
<ul>
<li><b>Clients need around-the-clock settlement with each other.</b> Tokenised deposits first: live today, deposit protection, central bank settlement between banks, no new regime to wait for. JPMorgan, Citi (in seven markets) and HSBC (in five) already run them for corporate clients.</li>
<li><b>Corporate clients pay into corridors banks have left, or suppliers want dollar tokens.</b> Partner with a licensed payout provider rather than issuing. Build wallet screening, Travel Rule exchange and reconciliation of in-transit balances first.</li>
<li><b>You want distribution income.</b> Custody and access for institutional clients, once authorised under the 2027 regime. Expect to share reserve income with whoever gets the coins into wallets.</li>
<li><b>You want to issue.</b> Only from a separate entity. Remember the economics: 30% of a systemic coin’s backing earns nothing, interest can’t be paid to holders, and issuance is capped at £40bn per coin to start.</li>
<li><b>Do nothing yet.</b> Defensible for many banks. The risk is quiet: clients move deposits and payments to whoever offers what they need.</li>
</ul>
<p><b>Why a stablecoin route can still lose.</b> Faster Payments already runs 24/7. More than 25 banks committed to process under Swift’s faster retail rules by June 2026, with fees fixed up front. Nexus, linking several Asian instant payment systems, is targeted for 2027. The BIS’s Project Agorá showed atomic settlement across currencies with central bank money in 2026. None of these needs a holder to trust a private issuer.</p>
<p><b>Why it might not.</b> Those upgrades are partial, the G20 targets are unlikely to be met, and stablecoins already reach payees and settle at hours that bank rails don’t. The honest answer is conditional: on the corridor, on the payee’s need, and on rules that won’t be settled before 2027.</p>
${cite('citiToken', 'hsbcTds', 'jpmCoin', 'praLetter', 'boePs', 'nexus', 'bisAgora', 'fsb2026')}`),

    // ── 11 ────────────────────────────────────────────────────────────
    chapter(11),
    scene('check'),
    text(`<h3 class="prose-kicker">How to read the numbers on this page</h3>
<p>Every interactive labels what it shows: <b>sourced</b> facts with a date, <b>illustrative</b> inputs chosen to show a mechanism, <b>derived</b> results calculated from those inputs, and <b>vendor</b> figures that a company reports about itself. Prices in the scenes are not quotes. Volumes are dated and labelled with who measured them. Rules are labelled final, draft or proposed. Where a source could only be read indirectly, the list below says so. Facts are as publicly reported at 18 November 2026.</p>
<details class="all-sources">
<summary>All ${ALL_SOURCE_IDS.length} sources on this page</summary>
<ul>${ALL_SOURCE_IDS.map(id => { const caveat = sourceCaveat(id); return `<li><a href="${SOURCES[id].url}" target="_blank" rel="noopener">${sourceLabel(id)}</a>: ${SOURCES[id].title}${caveat ? ` <i>(${caveat})</i>` : ''}</li>`; }).join('')}</ul>
</details>
<p class="sources-line">The supplier, the £1,000 invoice, the six weekend invoices and the 100,000-token transfer are illustrative. They describe no real firm or transaction.</p>`),
  ],
};

export default content;
