import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'deposit-tokens',
  number: '21',
  title: 'Deposit tokens',
  summary: `Deposit tokens are the banking system's attempt to preserve commercial bank money in a tokenised settlement world.`,
  ready: true,
  blocks: [
    {
      kind: 'text',
      heading: 'The core thesis',
      body: `Deposit tokens are the banking system's answer to a specific threat: that tokenised settlement could disintermediate commercial bank money. If securities, trade finance, and payments move to blockchain-based rails, the cash leg needs a tokenised form of money. Stablecoins offer one answer. CBDCs offer another. Deposit tokens are the banks' counter-proposal — tokenised commercial bank money that preserves the existing credit-creation model. The stakes are structural: if the cash leg bypasses bank balance sheets, banks lose deposits, and the fractional reserve system that funds most lending starts to erode.`,
    },
    {
      kind: 'callout',
      heading: 'The real question',
      data: {
        tone: 'insight',
        body: 'Deposit tokens are not mainly a technology story. They are a liability-model story. The question is not only what ledger runs the token, but whose balance sheet the money sits on.',
      },
    },
    {
      kind: 'text',
      heading: 'What a deposit token is',
      body: `A deposit token is a digital representation of a commercial bank deposit, issued on a distributed ledger or tokenisation platform, where the token remains a direct claim on the issuing bank. The holder has the same legal relationship as a traditional depositor: the token is a liability of the bank, covered by deposit insurance (up to applicable limits), and subject to banking regulation. The bank retains the deposit on its balance sheet and can use it to fund lending, exactly as with conventional deposits. The token is not a new form of money — it is the same form of money on a different ledger.`,
    },
    {
      kind: 'text',
      heading: 'Why it is not just a stablecoin',
      body: `The distinction matters and is frequently blurred. A stablecoin (like USDC or USDT) is issued by a non-bank entity that holds reserves — typically government securities and cash — in a segregated trust. The holder has a claim on the reserve pool, not on a bank balance sheet. The issuer cannot lend against those reserves; the money is "narrow." A deposit token, by contrast, sits on a bank balance sheet. The bank can lend against it. The holder benefits from deposit insurance. The token participates in fractional reserve banking. This is not a technical difference — it is a fundamental difference in how money creation works. Stablecoins shrink the money multiplier; deposit tokens preserve it.`,
    },
    {
      kind: 'comparison',
      heading: 'Deposit token vs stablecoin vs wholesale CBDC',
      data: {
        columns: [
          {
            title: 'Deposit token',
            subtitle: 'Tokenised bank liability',
            points: [
              { label: 'Issuer', value: 'Commercial bank', emphasis: 'neutral' },
              { label: 'Balance sheet', value: 'On-bank (fractional reserve)', emphasis: 'positive' },
              { label: 'Insurance', value: 'Deposit insurance applies', emphasis: 'positive' },
              { label: 'Settlement', value: 'Interbank via central bank money', emphasis: 'neutral' },
              { label: 'Interoperability', value: 'Limited — walled gardens today', emphasis: 'negative' },
              { label: 'Regulatory status', value: 'Existing banking licence', emphasis: 'positive' },
            ],
          },
          {
            title: 'Stablecoin',
            subtitle: 'Reserve-backed token',
            points: [
              { label: 'Issuer', value: 'Non-bank (e.g. Circle, Tether)', emphasis: 'neutral' },
              { label: 'Balance sheet', value: 'Off-bank (narrow/full reserve)', emphasis: 'neutral' },
              { label: 'Insurance', value: 'No deposit insurance', emphasis: 'negative' },
              { label: 'Settlement', value: 'On-chain, peer-to-peer', emphasis: 'positive' },
              { label: 'Interoperability', value: 'Native cross-platform', emphasis: 'positive' },
              { label: 'Regulatory status', value: 'Emerging (MiCA, state licences)', emphasis: 'negative' },
            ],
          },
          {
            title: 'Wholesale CBDC',
            subtitle: 'Central bank digital liability',
            points: [
              { label: 'Issuer', value: 'Central bank', emphasis: 'neutral' },
              { label: 'Balance sheet', value: 'On-central-bank', emphasis: 'positive' },
              { label: 'Insurance', value: 'Sovereign — no insurance needed', emphasis: 'positive' },
              { label: 'Settlement', value: 'Direct central bank settlement', emphasis: 'positive' },
              { label: 'Interoperability', value: 'Policy-dependent', emphasis: 'neutral' },
              { label: 'Regulatory status', value: 'Requires new legal framework', emphasis: 'negative' },
            ],
          },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'Deposit token vs tokenised deposit',
      body: `These terms are often used interchangeably, but some practitioners draw a distinction. A "tokenised deposit" can mean simply digitising the record of an existing deposit — the legal and economic substance is unchanged, only the database format shifts. A "deposit token" may imply a bearer-like instrument that can circulate between wallets, raising questions about transferability, KYC obligations, and whether the token remains a deposit at all once it leaves the issuing bank's ecosystem. In practice, most live implementations keep tokens within a closed network and do not allow free circulation, making the distinction largely academic for now. But if deposit tokens ever become transferable across platforms, the legal characterisation will matter enormously.`,
    },
    {
      kind: 'text',
      heading: 'Why banks prefer deposit tokens',
      body: `Banks have four reasons to champion deposit tokens over alternatives. First, balance sheet preservation: deposits fund lending, and losing deposits to stablecoins or CBDCs shrinks the loan book. Second, regulatory continuity: deposit tokens fit within existing banking licences, capital requirements, and supervisory frameworks — no new legislation required. Third, programmability: smart-contract logic can automate escrow, conditional payments, and compliance checks without moving money off the bank's balance sheet. Fourth, atomic settlement: delivery-versus-payment for securities, or payment-versus-payment for FX, becomes possible when both legs are tokenised — but only if the cash leg is a deposit token that the bank controls.`,
    },
    {
      kind: 'matrix',
      heading: 'Real-world deposit token initiatives',
      data: {
        columns: ['Status', 'Settlement type', 'Key feature'],
        items: [
          { id: 'kinexys', label: 'Kinexys (JPM)', color: '#4A90D9', values: ['Live', 'Intraday/cross-border', 'USD and EUR repo and FX settlement'] },
          { id: 'fnality', label: 'Fnality', color: '#50B88E', values: ['Live (GBP)', 'Wholesale interbank', 'Central bank money-backed USC token'] },
          { id: 'partior', label: 'Partior', color: '#E8A33D', values: ['Live', 'Cross-border PvP', 'Multi-bank clearing network'] },
          { id: 'citi', label: 'Citi Token Services', color: '#7B68EE', values: ['Live (pilot)', 'Trade finance', 'Cross-border liquidity for institutional clients'] },
          { id: 'hsbc', label: 'HSBC Orion', color: '#CD5C5C', values: ['Live (pilot)', 'Bond issuance', 'Tokenised gold and bond settlement'] },
          { id: 'socgen', label: 'SocGen FORGE', color: '#20B2AA', values: ['Live', 'Securities issuance', 'EUR-denominated bond on public chain'] },
          { id: 'canton', label: 'Canton / RLN', color: '#DDA0DD', values: ['Testing', 'Multi-asset DvP', 'Privacy-preserving interoperability layer'] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'The walled garden problem',
      body: `Today, most deposit token platforms are single-bank or small-consortium systems. Kinexys serves JPMorgan clients. Citi Token Services serves Citi clients. This is useful for intrabank settlement but does not solve the harder problem: moving tokenised money between banks. True interoperability requires either a shared ledger (like Canton or RLN), a common messaging standard, or a central settlement asset that bridges between platforms. Without interoperability, deposit tokens replicate the correspondent banking problem they claim to solve — just on newer infrastructure. The Regulated Liability Network (RLN) and similar proposals attempt to address this by creating a shared layer where multiple banks' deposit tokens can settle against each other, but these remain early-stage.`,
    },
    {
      kind: 'text',
      heading: 'The cash-leg question',
      body: `Even with interoperable deposit tokens, interbank settlement still requires central bank money. When Bank A's deposit token pays Bank B, the underlying interbank obligation must clear — and in most jurisdictions, final settlement of interbank claims happens at the central bank. This is why wholesale CBDCs and central bank-backed settlement tokens (like Fnality's USC) remain relevant: they provide the final settlement asset. Deposit tokens alone cannot achieve settlement finality between banks without a central bank anchor. The architecture that is emerging in practice is layered: deposit tokens for client-facing programmability, with wholesale CBDC or central bank reserves providing the final settlement layer underneath.`,
    },
    {
      kind: 'callout',
      heading: 'Programmable payments vs programmable money',
      data: {
        tone: 'strategy',
        body: `Do not confuse programmable payments with programmable money. Programmable payments mean attaching conditions to a transfer instruction — "pay when the invoice is approved." Programmable money means embedding conditions in the money itself — "this token can only be spent at approved merchants." Banks want the first. Regulators are cautious about the second, because money that restricts its own use raises civil liberties questions that commercial banks should not be deciding.`,
      },
    },
    {
      kind: 'case',
      heading: 'Case study: Kinexys intraday repo',
      data: {
        title: 'Kinexys intraday repo settlement',
        dateRange: '2023 — present',
        whatHappened: `JPMorgan's Kinexys (formerly Onyx / JPM Coin) enables intraday repo settlement using deposit tokens. The process: a client needing short-term USD liquidity posts collateral (e.g. Treasury securities) to a Kinexys smart contract. The contract verifies the collateral, mints deposit tokens representing the USD loan, and delivers them to the borrower's wallet — all within minutes, not the T+1 cycle of traditional repo. At maturity (often same-day), the borrower returns the deposit tokens plus interest, and the collateral is released. Settlement is atomic: both legs execute simultaneously or not at all. Kinexys processes over $2 billion in daily transactions across USD and EUR.`,
        whyItMatters: `Intraday repo is a genuine use case where tokenised settlement delivers measurable value — faster collateral mobilisation, reduced counterparty risk, and freed-up intraday liquidity. It also demonstrates the deposit token model: the tokens are JPMorgan liabilities, not stablecoins, and they settle within the bank's ecosystem.`,
        source: 'JPMorgan Kinexys public disclosures and industry reports',
        verifiedAsOf: '2025-06',
      },
    },
    {
      kind: 'callout',
      heading: 'Practitioner view',
      data: {
        tone: 'reality',
        body: `Deposit tokens work today for intrabank, single-currency, institutional use cases — intraday repo, cash management, trade finance. They do not yet work for cross-bank, multi-currency, retail-facing payments. The technology is proven. The legal and interoperability questions are not. Until deposit tokens can move between banks with the same ease as a SWIFT message — and with equivalent legal finality — they remain a powerful optimisation tool, not a replacement for existing payment rails.`,
      },
    },
    {
      kind: 'text',
      heading: 'Bridge to DeFi',
      body: `Deposit tokens represent the regulated financial system's response to tokenisation. But a parallel universe exists: decentralised finance, where smart contracts replace intermediaries entirely and liquidity is provided by open protocols rather than bank balance sheets. The next topic explores DeFi — what it actually does, where it creates genuine value, and where the risks are structural rather than fixable.`,
    },
    {
      kind: 'quiz',
      heading: 'Test your understanding',
      data: {
        questions: [
          {
            question: 'What is the fundamental difference between a deposit token and a stablecoin?',
            options: [
              'Deposit tokens use blockchain; stablecoins do not',
              'Deposit tokens sit on a bank balance sheet and participate in fractional reserve banking; stablecoins are backed by segregated reserves',
              'Stablecoins are regulated; deposit tokens are not',
              'There is no meaningful difference — both are tokenised dollars',
            ],
            correctIndex: 1,
            explanation: 'The key distinction is the balance sheet treatment. Deposit tokens are bank liabilities that fund lending through fractional reserve banking. Stablecoins are backed by segregated reserves and do not participate in credit creation.',
          },
          {
            question: 'Why can deposit tokens alone not achieve final settlement between two different banks?',
            options: [
              'The technology is too slow for interbank settlement',
              'Regulators have banned interbank deposit token transfers',
              'Interbank settlement requires central bank money for finality, which deposit tokens do not provide',
              'Deposit tokens can only represent one currency at a time',
            ],
            correctIndex: 2,
            explanation: 'When Bank A pays Bank B, the underlying interbank obligation must settle in central bank money. Deposit tokens are commercial bank liabilities — they need a central bank anchor (like wholesale CBDC or reserves) for final settlement between institutions.',
          },
          {
            question: 'What distinguishes programmable payments from programmable money?',
            options: [
              'Programmable payments are faster than programmable money',
              'Programmable payments attach conditions to transfer instructions; programmable money embeds conditions in the money itself',
              'Programmable money is used by central banks; programmable payments are used by commercial banks',
              'There is no difference — the terms are interchangeable',
            ],
            correctIndex: 1,
            explanation: 'Programmable payments condition when and how a transfer executes. Programmable money restricts what the money itself can be used for — a more intrusive concept that raises civil liberties concerns about who controls spending.',
          },
        ],
      },
    },
  ],
};

export default content;
