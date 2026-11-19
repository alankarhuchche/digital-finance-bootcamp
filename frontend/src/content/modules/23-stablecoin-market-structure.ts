import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'stablecoin-market-structure',
  number: '23',
  title: 'Stablecoin market structure',
  summary: 'How USDC, USDT, PYUSD, RLUSD and Open USD differ by issuer model, reserve economics, distribution and bank relevance.',
  ready: true,
  updatedAt: '2026-11-19',
  changeType: 'updated',
  changeSummary: 'Corrected issuer facts: PYUSD is issued by Paxos, and Open USD went live on 30 September 2026, issued by Bridge. Supply figures updated to 17 November 2026.',
  blocks: [
    {
      kind: 'text',
      body: `The Stablecoins topic covered mechanism: how fiat-backed, crypto-collateralised and algorithmic designs behave under stress, and why the differences matter in a crisis. That's the right starting point for stress-testing a token. It's not sufficient for institutional decision-making.\n\nA bank evaluating whether to hold a stablecoin as collateral, a payment company deciding which token to settle with, or a financial institution building on-chain treasury tools needs to understand something different: issuer liability model, reserve economics, distribution control, redemption rights, and regulatory treatment. Five fiat-backed stablecoins targeting a $1 peg can look identical from the outside while differing substantially on all five variables.\n\nFor banks, the question is not only "is it backed?" It is: whose liability is it, who can redeem it, who controls the rails, and who captures the economics?\n\nThis topic maps those differences across USDC, USDT, PYUSD, RLUSD, and Open USD, announced in June 2026 and live since 30 September 2026, issued by Bridge for Open Standard, a company founded by Coinbase, Mastercard, Shopify, Stripe and Visa. The goal is not to rank them but to show where the distinctions that matter for regulated institutions actually sit.`,
    },
    {
      kind: 'matrix',
      heading: 'Stablecoin provider comparison',
      data: {
        columns: ['Issuer / model', 'Reserve & economics', 'Regulatory posture', 'Bank relevance / primary risk'],
        items: [
          {
            id: 'usdc',
            label: 'USDC',
            color: '#7AA7D9',
            values: [
              'Circle Internet Financial — single private issuer. Regulated US money transmitter with a MiCA-compliant EU entity.',
              'Cash and short-term US Treasuries. Monthly attestations by Deloitte under AICPA standards. About $69.2bn in circulation on 17 November 2026 (DefiLlama). Circle keeps reserve income after paying distributors: in Q3 2026 it paid $409m of $658m in distribution and transaction costs.',
              'Broad regulatory coverage: US money transmitter licences, a MiCA e-money entity in France, and a national trust bank with final OCC approval (July 2026). GENIUS Act rules apply from 18 January 2027.',
              'Preferred by regulated institutions for reserve transparency and regulatory posture. Direct redemption available via Circle Mint (institutional). Primary risk: dependence on Circle\'s continued regulatory standing and banking relationships.',
            ],
          },
          {
            id: 'usdt',
            label: 'USDT',
            color: '#E8A33D',
            values: [
              'Tether International, S.A. de C.V., based in El Salvador. Single private issuer. Largest stablecoin: about $175.2bn on 17 November 2026 (DefiLlama).',
              'Mostly US Treasury bills, plus gold and bitcoin, in Tether’s own reports. Quarterly attestations; Tether says KPMG audited its 2025 accounts with a clean opinion (company statement, not reviewed here). Reserve yield retained by Tether.',
              'Limited EU and US regulatory footprint. No MiCA authorisation. Its separate US-regulated coin, USAT, issued through Anchorage Digital Bank, has been live since 27 January 2026. For regulated banks in the EU and UK, regulatory posture is the primary on-boarding concern.',
              'Dominant in emerging markets, crypto-to-crypto trading and offshore institutional flows. For regulated banks in the EU and UK, on-boarding USDT carries compliance and counterparty risk that USDC does not. Not equivalent to USDC in regulated institutional contexts.',
            ],
          },
          {
            id: 'pyusd',
            label: 'PYUSD',
            color: '#C792E8',
            values: [
              'Issued by Paxos for PayPal, which brands and distributes it. Paxos states that PayPal USD “is issued by Paxos, not PayPal or Venmo”. Native on several chains, including Ethereum and Solana.',
              'USD deposits, Treasuries and cash equivalents, with monthly attestations. How reserve income is split between Paxos and PayPal is not public. About $2.4bn on 17 November 2026.',
              'Paxos is the regulated issuer. It describes itself as an OCC-regulated national trust bank; a law-firm note from August 2026 said its final approval was still pending. PayPal brings mature consumer-payments compliance.',
              'PayPal controls a large consumer payments network and can drive adoption through checkout integrations. The distribution advantage — hundreds of millions of PayPal accounts — is the differentiator here, not reserve quality. For banks, it is a clear case of the issuer (Paxos) and the distributor (PayPal) being different firms.',
            ],
          },
          {
            id: 'rlusd',
            label: 'RLUSD',
            color: '#5FB3A3',
            values: [
              'Issued by Ripple’s New York-chartered trust company (Standard Custody & Trust Company in press reports; Ripple Custody & Trust Co. in Ripple’s terms). On the XRP Ledger, Ethereum and several other chains.',
              '1:1 USD backing with cash and equivalents. Reserve yield retained by Ripple. Smaller circulation than USDC or USDT.',
              'The SEC case over XRP sales ended in August 2025, when both sides dropped their appeals. Ripple’s national trust bank received final OCC approval in October 2026 to manage RLUSD reserves; it is not the issuer.',
              'Targets correspondent banking and cross-border settlement flows where Ripple already operates. For banks on Ripple\'s network, RLUSD provides a familiar settlement asset. For institutions outside Ripple\'s ecosystem, the primary question is network adoption and liquidity depth.',
            ],
          },
          {
            id: 'openusd',
            label: 'Open USD',
            color: '#E0726B',
            values: [
              'Issued by Bridge Building Inc. (part of Stripe), a US state-licensed money transmitter, for Open Standard, founded by Coinbase, Mastercard, Shopify, Stripe and Visa. Announced 30 June 2026; live since 30 September 2026.',
              'Short-dated Treasuries, repo, money-market funds and cash held at BNY, BlackRock and Lead Bank (Bridge). About $961m on 17 November 2026. Open Standard says partners earn rewards in proportion to the supply they drive; no payouts, fees or audit have been published, so the shared economics are unproven.',
              'Bridge issues under state money-transmitter licences. Its proposed national trust bank had only preliminary conditional OCC approval (February 2026) and does not issue OUSD.',
              'If adopted at scale, the shared-economics model changes incentives for payment networks and merchants to drive adoption. For regulated institutions the counterparty is Bridge. The open questions are redemption terms for non-partners, prudential treatment, and whether the shared economics are paid as described. The participation of established payment networks is the main credibility signal at this stage.',
            ],
          },
        ],
      },
    },
    {
      kind: 'case',
      heading: 'The consortium model: Open USD',
      data: {
        title: 'Open Standard and Open USD',
        dateRange: 'Announced 30 June 2026; live 30 September 2026',
        whatHappened: `Open Standard announced Open USD on 30 June 2026 and launched it on 30 September 2026. It is issued by Bridge Building Inc., part of Stripe, and runs on Base, Ethereum, Solana and Tempo. Open Standard describes itself as an independent company founded by Coinbase, Mastercard, Shopify, Stripe and Visa and joined by more than 200 partners. Businesses can mint and redeem through Bridge, and Open Standard says partners earn rewards in proportion to the supply and activity they drive, and can earn equity. Supply was about $961m on 17 November 2026. No partner payouts, management fee or audit had been published by then, and a separate site claiming a different launch date and supply could not be linked to the operator. Treat the adoption and the shared economics as unproven.`,
        whyItMatters: `Single-issuer stablecoins share one economic logic: the issuer mints tokens, manages reserves, retains the yield, and uses revenue to fund compliance and distribution globally. That model produces both USDC and USDT — different in regulatory posture but identical in reserve economics structure. Open USD proposes a different logic: share the reserve economics with the participants who distribute the token, rather than retaining yield at a single issuer. This changes who benefits from driving adoption — an incentive structure that existing single-issuer models cannot easily replicate. The important caveats are real: governance at scale in a large consortium is complex, shared-economics arrangements require clear legal and tax treatment across participating jurisdictions, and Visa and Mastercard's participation could reflect hedging across multiple stablecoin models rather than a commitment to one. Whether the design operates as publicly reported remains to be demonstrated.`,
        source: 'Bridge, 30 Sep 2026; Open Standard; The Block, 30 Jun 2026; DefiLlama, 17 Nov 2026',
        sourceUrl: 'https://www.bridge.xyz/blog/ousd-is-live-issued-by-bridge',
        verifiedAsOf: '18 November 2026',
      },
    },
    {
      kind: 'flow',
      heading: 'Reserve economics: single issuer vs consortium',
      data: {
        viewBox: '0 0 330 185',
        boxes: [
          { id: 'u1', x: 5, y: 14, w: 80, h: 50, caption: 'SINGLE-ISSUER MODEL', value: '$1 sent' },
          { id: 'i1', x: 105, y: 14, w: 75, h: 50, caption: 'ISSUER MINTS', value: '1 token', valueColor: '#7AA7D9' },
          { id: 'y1', x: 200, y: 14, w: 125, h: 50, caption: 'RESERVE YIELD', value: 'Retained by issuer', valueColor: '#E0726B' },
          { id: 'u2', x: 5, y: 120, w: 80, h: 50, caption: 'NETWORK MODEL', value: '$1 sent' },
          { id: 'i2', x: 105, y: 120, w: 75, h: 50, caption: 'BRIDGE ISSUES', value: 'Open USD', valueColor: '#7AA7D9' },
          { id: 'y2', x: 200, y: 120, w: 125, h: 50, caption: 'STATED DESIGN', value: 'Shared with partners', valueColor: '#5FB3A3' },
        ],
        paths: [
          { d: 'M85,39 L105,39', animated: true, dotColor: '#E8A33D' },
          { d: 'M180,39 L200,39' },
          { d: 'M85,145 L105,145', animated: true, dotColor: '#5FB3A3' },
          { d: 'M180,145 L200,145' },
        ],
        caption: 'In both models, users earn no yield on the token they hold. The structural difference is whether reserve income flows to one issuer or is distributed among consortium participants — changing who benefits commercially from driving adoption.',
      },
    },
    {
      kind: 'callout',
      heading: 'What this means for regulated institutions',
      data: {
        tone: 'strategy',
        body: `Stablecoin choice is not a technology decision. It is a counterparty, liability and regulatory decision. Liquidity and reserve transparency are different properties. Network familiarity is not the same as production depth or redemption certainty. A bank holding a stablecoin as collateral takes on credit risk to the issuer, operational risk to the reserve management process, and regulatory risk to the issuing entity's compliance posture. None of those risks disappear because the token settles quickly on-chain. The core distinction remains: deposit tokens keep the customer's claim against a regulated bank balance sheet with deposit insurance. Stablecoins of every type — single-issuer or consortium — place the claim against a non-bank entity with no deposit insurance, and redemption certainty that depends entirely on reserve quality and issuer continuity.`,
      },
    },
    {
      kind: 'matrix',
      heading: 'Orientation map: stablecoins, deposit tokens and wholesale CBDC',
      data: {
        columns: ['Liability', 'Typical issuer', 'Redemption claim', 'Primary use case', 'Regulatory treatment'],
        items: [
          {
            id: 'sc',
            label: 'Single-issuer stablecoin',
            color: '#E8A33D',
            values: [
              'Issuer\'s own liability — not a bank deposit',
              'Non-bank private firm (Circle, Tether, Ripple, Paxos)',
              'Against the issuer\'s reserves; quality depends on reserve composition and attestation standard',
              'Payments, trading, cross-border settlement, DeFi collateral',
              'E-money or payment instrument in most jurisdictions; varies materially by issuer domicile and regulatory registration',
            ],
          },
          {
            id: 'csc',
            label: 'Consortium stablecoin',
            color: '#E0726B',
            values: [
              'Issuer\'s or consortium entity\'s liability — structure depends on legal entity design',
              'A designated issuer for a network (Open USD is issued by Bridge for Open Standard)',
              'Against consortium reserves; governance and legal counterparty depend on the structure',
              'Broad payment adoption, merchant settlement, shared-network economies of scale',
              'The issuer’s own licence: for Open USD, Bridge’s US state money-transmitter licences',
            ],
          },
          {
            id: 'dt',
            label: 'Deposit token / tokenised deposit',
            color: '#7AA7D9',
            values: [
              'Bank deposit — commercial bank balance sheet liability',
              'Licensed commercial bank (e.g. JPMorgan Kinexys, Citi Token Services)',
              'Against the issuing bank; covered by deposit insurance up to applicable limits',
              'Institutional settlement, intraday liquidity, collateral mobility between financial institutions',
              'Regulated as a bank deposit under existing banking law; clearest regulatory path of the four',
            ],
          },
          {
            id: 'wcbdc',
            label: 'Wholesale CBDC',
            color: '#5FB3A3',
            values: [
              'Central bank liability — sovereign money',
              'Central bank (Bank of England, ECB, Federal Reserve, etc.)',
              'Direct claim on the central bank; no commercial counterparty credit risk',
              'Interbank settlement, DvP for tokenised securities, cross-border wholesale flows between central banks',
              'Highest regulatory clarity in principle; still in pilot or research phase in most jurisdictions as of mid-2026',
            ],
          },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'Practitioner judgement',
      body: `The stablecoin market is moving from token issuance to network control. USDT demonstrated that liquidity and global reach can be built without regulatory favour. USDC demonstrated that regulated reserve transparency and institutional on-boarding infrastructure produce a different kind of adoption — slower to grow but more suitable for regulated counterparties. PYUSD and RLUSD reflect a simpler instinct: platform companies and payment networks building settlement infrastructure for their own user bases.\n\nOpen USD is notable for the economic model it proposes, not the token it issues: distribution participants share in the reserve yield, changing who benefits from driving adoption. If the publicly reported structure operates as described, that could attract Visa, Mastercard and a large merchant base in a way single-issuer models cannot. Whether it achieves that is unproven.\n\nNone of this is settled. Open USD's governance at consortium scale, USDT's long-term regulatory viability in the EU and UK, and RLUSD's adoption outside Ripple's existing network are all open questions as of mid-2026. The stablecoin category now has distinct enough economic models that treating all fiat-backed tokens as interchangeable is a material analytical error.\n\nFor deposit-taking banks, the framing in the Deposit Tokens topic remains the right starting point: deposit tokens are not in this competition. The question for banks is not which stablecoin to adopt but how to position tokenised commercial bank money relative to a stablecoin market that is consolidating around network control.`,
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          {
            question: 'What is the key economic difference between a single-issuer stablecoin (such as USDC) and the consortium model publicly reported for Open USD?',
            options: [
              'Single-issuer stablecoins are not backed by real assets; consortium stablecoins are',
              'In a single-issuer model, reserve yield goes entirely to the issuer; in the publicly reported Open USD design, reserve earnings after a management fee are shared among consortium participants',
              'Consortium stablecoins hold higher-quality reserves than single-issuer stablecoins',
              'There is no economic difference — the models are structurally identical',
            ],
            correctIndex: 1,
            explanation: 'Single-issuer models (USDC, USDT) retain all reserve yield for the issuer. Open USD\'s publicly reported design distributes reserve earnings to consortium participants after a management fee — changing who benefits commercially from driving adoption.',
          },
          {
            question: 'Why does a deposit token carry a different risk profile than a stablecoin for a regulated bank?',
            options: [
              'Deposit tokens settle faster on-chain than stablecoins',
              'Deposit tokens are issued by central banks and carry no counterparty risk',
              'A deposit token is a claim against a regulated commercial bank balance sheet covered by deposit insurance; a stablecoin is a claim against a non-bank issuer\'s reserves with no deposit insurance',
              'Stablecoins are backed by volatile assets and deposit tokens are not',
            ],
            correctIndex: 2,
            explanation: 'The fundamental difference is the liability structure. A deposit token remains a commercial bank deposit — it stays on the bank\'s balance sheet, is subject to prudential regulation, and is covered by deposit insurance. A stablecoin is a claim against a non-bank issuer\'s reserves, with no deposit insurance and redemption certainty entirely dependent on reserve quality and issuer continuity.',
          },
          {
            question: 'Why might a regulated EU institution treat USDT differently from USDC as a counterparty or collateral asset?',
            options: [
              'USDT is algorithmic and USDC is fiat-backed',
              'USDT has no MiCA registration and publishes quarterly attestations rather than monthly audits; USDC has a MiCA-compliant EU entity and publishes monthly attestations under Deloitte/AICPA standards',
              'USDC has a higher market capitalisation than USDT',
              'USDT is domiciled in the EU and therefore faces stricter regulation than Circle',
            ],
            correctIndex: 1,
            explanation: 'For a regulated EU institution, USDT\'s absence of MiCA registration and its quarterly attestation standard (not full audits) create compliance and counterparty risk that USDC\'s MiCA entity and monthly Deloitte attestations do not. Regulatory posture and reserve transparency — not market cap — drive institutional counterparty risk assessment.',
          },
        ],
      },
    },
  ],
};

export default content;
