import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'glossary',
  number: '17',
  title: 'Glossary',
  summary: 'Every term, searchable, linked back to its topic.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `A scannable reference for every key term. Each entry links back to the topic where it was explained in depth.`,
    },
    {
      kind: 'text',
      heading: 'A – I',
      body: `
        <p><b>Acquirer / acquiring bank</b> — the bank or payment processor that manages the merchant relationship in a card transaction and settles funds to the merchant. <i>Topic 18.</i></p>
        <p><b>AML (Anti-Money Laundering)</b> — regulations requiring financial institutions to monitor transactions and report suspicious activity. <i>Topics 14, 19.</i></p>
        <p><b>AMM (Automated Market Maker)</b> — a DEX mechanism that prices trades algorithmically from a liquidity pool’s ratio, instead of matching buyers and sellers directly. <i>Topic 09.</i></p>
        <p><b>ART (Asset-Referenced Token)</b> — MiCA’s category for a stablecoin pegged to a basket of assets/currencies. <i>Topic 14.</i></p>
        <p><b>Atomic settlement</b> — settling two legs of a trade (asset and cash) as one indivisible transaction, so either both happen or neither does. <i>Topic 13.</i></p>
        <p><b>Basel III crypto exposure rules</b> — the capital a bank must hold against crypto holdings; punitively high for unbacked assets. <i>Topic 14.</i></p>
        <p><b>BUIDL</b> — BlackRock’s tokenized money market fund, the reference case for tokenized real-world assets. <i>Topic 08.</i></p>
        <p><b>Cash leg</b> — the payment side of a securities trade. In tokenised settlement, the cash leg must also be tokenised (as a stablecoin, deposit token, or wholesale CBDC) for atomic DvP to work. <i>Topics 13, 21.</i></p>
        <p><b>Canton</b> — a permissioned DLT platform that links Daml smart-contract applications across participants. Designed for sub-transaction privacy, deterministic finality and institutional financial workflows. <i>Topic 04.</i></p>
        <p><b>CASP (Crypto-Asset Service Provider)</b> — MiCA’s license category for exchanges, custodians, and brokers in the EU. <i>Topic 14.</i></p>
        <p><b>CBDC (Central Bank Digital Currency)</b> — a digital, sovereign liability issued directly by a central bank. <i>Topics 02, 07.</i></p>
        <p><b>CCP (Central Counterparty)</b> — an entity that interposes itself between two sides of a trade, guaranteeing settlement even if one party defaults. Absent in DeFi. <i>Topic 13.</i></p>
        <p><b>CEX (Centralized Exchange)</b> — a custodial, KYC’d trading venue like Binance or Coinbase. <i>Topic 12.</i></p>
        <p><b>Collateral mobility</b> — the ability to move collateral between systems, venues, or counterparties quickly and without friction. A key use case for tokenisation. <i>Topics 08, 21.</i></p>
        <p><b>CLS (Continuous Linked Settlement)</b> — the system that eliminates Herstatt risk in FX by settling both currencies of a trade simultaneously. <i>Topic 13.</i></p>
        <p><b>Consensus</b> — the rule a blockchain’s nodes use to agree on valid transactions without a central authority. <i>Topic 04.</i></p>
        <p><b>Consortium stablecoin</b> — a stablecoin issued by or on behalf of a group of businesses under shared governance, as opposed to a single private issuer. Reserve earnings may be distributed among participants. Open USD is the most prominent announced example as of mid-2026. <i>Topic 23.</i></p>
        <p><b>CSD (Central Securities Depository)</b> — the institution that holds securities and processes settlement of securities trades. In tokenised markets, the CSD role may be replaced by the blockchain ledger itself. <i>Topic 13.</i></p>
        <p><b>Custody</b> — holding assets on someone else’s behalf; the core trust question behind CEX risk. <i>Topic 12.</i></p>
        <p><b>Daml</b> — Digital Asset Modeling Language. A smart-contract language for Canton that encodes visibility and authorisation rules explicitly in the contract model. <i>Topic 04.</i></p>
        <p><b>Deposit token</b> — a commercial bank's own deposit liability represented as a token on a blockchain. Unlike stablecoins, deposit tokens stay on the bank's balance sheet and carry deposit insurance. <i>Topic 21.</i></p>
        <p><b>DeFi (Decentralized Finance)</b> — lending, trading, and derivatives rebuilt as smart contracts instead of institutions. <i>Topic 09.</i></p>
        <p><b>Depeg</b> — when a stablecoin’s market price drops below its intended 1:1 value. <i>Topics 06, 16.</i></p>
        <p><b>DEX (Decentralized Exchange)</b> — a non-custodial trading venue running on smart contracts, like Uniswap. <i>Topic 12.</i></p>
        <p><b>DLT (Distributed Ledger Technology)</b> — a ledger replicated across many nodes instead of one central database; blockchain is one type. <i>Topic 04.</i></p>
        <p><b>DvP (Delivery-versus-Payment)</b> — the principle that an asset and its payment should settle together, neither without the other. <i>Topic 13.</i></p>
        <p><b>E-money</b> — electronically stored monetary value (e.g. Revolut, PayPal balances), regulated under the E-Money Directive but not deposit-insured. <i>Topic 02.</i></p>
        <p><b>EMT (E-Money Token)</b> — MiCA’s category for a stablecoin pegged to a single fiat currency. <i>Topic 14.</i></p>
        <p><b>Ethereum</b> — a public permissionless blockchain running Proof of Stake consensus since September 2022. The primary platform for stablecoins, tokenised assets and DeFi. EVM-compatible. <i>Topics 04, 05, 06, 09.</i></p>
        <p><b>EVM (Ethereum Virtual Machine)</b> — the runtime that executes Ethereum smart contracts. EVM compatibility means other networks (e.g. Hyperledger Besu) can run Ethereum tooling and Solidity contracts directly. <i>Topic 04.</i></p>
        <p><b>FMI (Financial Market Infrastructure)</b> — the systems and institutions (CCPs, CSDs, payment systems, trade repositories) that underpin financial markets. Regulated under CPMI-IOSCO principles. <i>Topic 13.</i></p>
        <p><b>FATF Travel Rule</b> — the requirement that crypto transfers above a threshold carry sender/recipient information, mirroring wire transfer rules. <i>Topics 14, 19.</i></p>
        <p><b>Finality</b> — the point at which a transaction is truly irreversible; instant on RTGS, often probabilistic on public blockchains. <i>Topics 04, 13.</i></p>
        <p><b>Flash loan</b> — a DeFi loan borrowed and repaid within a single transaction, or it reverts entirely. <i>Topics 09, 16.</i></p>
        <p><b>Gas</b> — the fee paid to Ethereum validators to include a transaction in a block. Gas prices fluctuate with network demand; fees on L1 range from under $0.50 to over $50. On Layer 2s, fees are typically under $0.01. <i>Topic 04.</i></p>
        <p><b>GENIUS Act</b> — the 2025 US federal law creating a licensing framework for payment stablecoins. <i>Topic 14.</i></p>
        <p><b>Governance token</b> — a token granting voting rights over a protocol’s decisions. <i>Topic 05.</i></p>
        <p><b>Herstatt risk</b> — the risk of paying your side of a trade before confirming the other side delivered theirs. <i>Topic 13.</i></p>
        <p><b>Hyperledger Besu</b> — an open-source Ethereum client (Java) that can run on public Ethereum or a private permissioned network. Used where EVM compatibility is wanted with controlled network membership. <i>Topic 04.</i></p>
        <p><b>HSM (Hardware Security Module)</b> — a tamper-resistant hardware device that generates, stores, and manages cryptographic keys. Used in payment systems, blockchain custody, and CBDC infrastructure. <i>Topic 21.</i></p>
        <p><b>Interoperability</b> — the ability of different ledgers, networks, or payment systems to exchange value and data. The unsolved problem connecting deposit tokens, stablecoins, and CBDCs across platforms. <i>Topics 04, 21, 22.</i></p>
        <p><b>Issuer model</b> — the legal and economic structure under which a stablecoin or digital money instrument is issued: who bears the credit liability, who manages the reserves, who earns the yield, and what regulatory framework applies. <i>Topics 06, 23.</i></p>
        <p><b>Interchange</b> — the fee paid by the acquiring bank to the issuing bank on each card transaction; regulated by caps in the EU/UK. <i>Topic 18.</i></p>
        <p><b>ISO 20022</b> — the new global messaging standard for payment instructions, replacing older formats with richer, structured data. <i>Topic 01.</i></p>
      `,
    },
    {
      kind: 'text',
      heading: 'K – Z',
      body: `
        <p><b>KYC (Know Your Customer)</b> — the process of verifying a customer’s identity before providing financial services. <i>Topic 19.</i></p>
        <p><b>Legal finality</b> — the point at which a transaction is irrevocable under the applicable legal framework, not just technically confirmed. May differ from technical finality. <i>Topics 13, 21.</i></p>
        <p><b>Layer 2 (L2)</b> — a scaling solution built on top of a base blockchain (Layer 1) that processes transactions off-chain for speed and cost, settling finality back to L1. <i>Topic 04.</i></p>
        <p><b>M2</b> — a broad measure of money supply: cash, checking deposits, savings, and similar liquid assets. <i>Topic 10.</i></p>
        <p><b>mBridge</b> — the BIS-led multi-CBDC wholesale cross-border settlement platform. <i>Topic 11.</i></p>
        <p><b>MEV (Maximal Extractable Value)</b> — profit validators can extract by reordering, inserting, or censoring transactions within a block. <i>Topic 09.</i></p>
        <p><b>MPC (Multi-Party Computation)</b> — a cryptographic technique where multiple parties jointly compute a function without any party revealing their private input. Used in institutional key management as an alternative to HSMs. <i>Topic 21.</i></p>
        <p><b>MiCA (Markets in Crypto-Assets Regulation)</b> — the EU’s comprehensive crypto rulebook. <i>Topic 14.</i></p>
        <p><b>Native token</b> — a blockchain’s own base asset, used for fees and/or network security (e.g. BTC, ETH). <i>Topic 05.</i></p>
        <p><b>Netting</b> — offsetting mutual obligations so only the net difference settles, reducing the total value that must move. Contrast with gross settlement. <i>Topic 13.</i></p>
        <p><b>Open USD</b> — a consortium stablecoin announced in June 2026 by Open Standard, publicly reported as including Visa, Mastercard, Coinbase and more than 140 businesses. Reserve earnings are publicly reported to be shared among participants after a management fee, distinguishing it from single-issuer models. Adoption, transaction volumes and regulatory treatment were unproven as of July 2026. <i>Topic 23.</i></p>
        <p><b>Open banking</b> — the regulatory framework (PSD2 in the EU, Open Banking in the UK) that requires banks to share account data and enable payment initiation through standardised APIs for authorised third parties. <i>Topic 18.</i></p>
        <p><b>Oracle</b> — a service that feeds off-chain data (prices, rates, events) to on-chain smart contracts. Oracle manipulation is a distinct failure category in DeFi. <i>Topics 04, 16.</i></p>
        <p><b>Nostro / Vostro</b> — accounts banks hold at each other for correspondent banking; nostro = "our account at your bank," vostro = the reverse. <i>Topic 01.</i></p>
        <p><b>PYUSD</b> — PayPal's USD stablecoin, issued by PayPal on Ethereum and Solana. Targets the PayPal and Venmo user base for payments and checkout. 1:1 USD backed with cash and equivalents; reserve yield retained by PayPal. <i>Topic 23.</i></p>
        <p><b>Permissioned network</b> — a blockchain where participation (validation and/or transaction submission) is restricted to known, vetted entities. Contrasts with public permissionless networks. Used in regulated financial applications where data privacy and governance control are required. <i>Topic 04.</i></p>
        <p><b>Payment orchestration</b> — the layer that routes payments across multiple processors, methods, and rails to optimise cost, speed, and success rate. Companies like Stripe and Adyen operate as orchestrators. <i>Topic 18.</i></p>
        <p><b>Programmable money</b> — money with issuer-defined conditions attached (e.g. expiry, spending restrictions). Controversial because it implies the issuer controls how you spend. Contrast with programmable payments. <i>Topics 07, 21.</i></p>
        <p><b>Programmable payments</b> — user-defined conditions on payments (e.g. "pay when goods clear customs"). Generally accepted. Contrast with programmable money. <i>Topics 07, 21.</i></p>
        <p><b>PSD2</b> — the EU's Second Payment Services Directive, which mandated open banking APIs and strong customer authentication. <i>Topic 18.</i></p>
        <p><b>Project Agorá</b> — BIS/New York Fed-led wholesale cross-border tokenization research. <i>Topic 11.</i></p>
        <p><b>Proof of Stake / Proof of Work</b> — two consensus mechanisms; PoS uses staked tokens to validate, PoW uses computing power. <i>Topic 04.</i></p>
        <p><b>Reserve economics</b> — the economic model that determines who earns the yield generated by a stablecoin's reserve assets. In single-issuer models, the issuer retains all yield. In a consortium model such as Open USD (as publicly reported), yield after a management fee is shared among participants. Users earn nothing in either case. <i>Topics 06, 23.</i></p>
        <p><b>Retail CBDC / Wholesale CBDC</b> — consumer-facing vs. interbank-only versions of a central bank digital currency. <i>Topic 07.</i></p>
        <p><b>RLUSD</b> — Ripple's USD stablecoin, issued under a New York DFS trust charter and available on the XRP Ledger and Ethereum. Targets institutional and cross-border settlement flows via Ripple's existing payments network. 1:1 USD backed; reserve yield retained by Ripple. <i>Topic 23.</i></p>
        <p><b>RLN (Regulated Liability Network)</b> — a bank consortium testing shared-ledger tokenized deposits. <i>Topic 11.</i></p>
        <p><b>Rollup</b> — a Layer 2 scaling technique that bundles hundreds of transactions into a single proof submitted to the base chain. <i>Topic 04.</i></p>
        <p><b>RTGS (Real-Time Gross Settlement)</b> — a domestic central-bank settlement system with immediate, irrevocable finality (e.g. CHAPS). <i>Topic 01.</i></p>
        <p><b>RWA (Real-World Asset)</b> — a traditional asset (a bond, a fund, real estate) represented as an on-chain token. <i>Topic 08.</i></p>
        <p><b>Selective disclosure</b> — proving a specific claim (e.g. "over 18") without revealing the underlying data (e.g. date of birth), using verifiable credentials. <i>Topic 19.</i></p>
        <p><b>Singleness of money</b> — the principle that all forms of money within a currency should be exchangeable at par. <i>Topic 02.</i></p>
        <p><b>Solana</b> — a public permissionless blockchain using Proof of Stake with Proof of History timestamp ordering. Designed for high throughput and low fees. Active in stablecoin payments use cases. <i>Topics 04, 06, 23.</i></p>
        <p><b>Smart contract</b> — self-executing code deployed on a blockchain that runs automatically when conditions are met. <i>Topic 04.</i></p>
        <p><b>Stablecoin</b> — a token designed to hold a stable value, via fiat backing, crypto collateral, or an algorithm. <i>Topics 02, 06.</i></p>
        <p><b>SWIFT</b> — the messaging network connecting 11,000+ banks for cross-border payment instructions; carries messages, not money. <i>Topic 01.</i></p>
        <p><b>Technical finality</b> — the point at which a transaction is confirmed by the ledger's consensus mechanism. May precede legal finality. <i>Topics 04, 13.</i></p>
        <p><b>Tokenization</b> — moving an ownership record from a private database to a blockchain, without changing what’s owned. <i>Topic 08.</i></p>
        <p><b>Tokenised deposit</b> — a bank's own deposit liability, represented on-chain. Often used interchangeably with "deposit token," though some distinguish them. <i>Topics 02, 08, 21.</i></p>
        <p><b>Travel Rule</b> — see FATF Travel Rule.</p>
        <p><b>TVL (Total Value Locked)</b> — the total value of assets deposited in DeFi protocols; a frequently cited but gameable metric. <i>Topics 09, 10.</i></p>
        <p><b>Utility token</b> — a token granting the right to use a specific application or service. <i>Topic 05.</i></p>
        <p><b>Validator</b> — a participant in a Proof of Stake blockchain who stakes the native token and is selected to propose and attest to blocks. Replaces the role of miners in Proof of Work. <i>Topic 04.</i></p>
        <p><b>Verifiable Credential (VC)</b> — a W3C standard for cryptographically signed identity claims that can be verified without contacting the issuer. <i>Topic 19.</i></p>
        <p><b>Wrapped token</b> — a token on one blockchain that represents an asset native to another blockchain (e.g. WBTC is Bitcoin wrapped as an ERC-20 token on Ethereum). Enables cross-chain liquidity but introduces bridge risk. <i>Topics 05, 16.</i></p>
        <p><b>Wholesale settlement</b> — the final transfer of value between institutions, as opposed to consumer payments. <i>Topics 01, 13.</i></p>
        <p><b>Zero-knowledge proof (ZKP)</b> — a cryptographic method to prove a statement is true without revealing the underlying data. Used in privacy protocols and Layer 2 scaling. <i>Topics 04, 20.</i></p>
      `,
    },
  ],
};

export default content;
