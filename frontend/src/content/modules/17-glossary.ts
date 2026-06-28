import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'glossary',
  number: '17',
  title: 'Glossary',
  summary: 'Every term, in one place, linked back to its module.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `No diagram needed for this one \u2014 just a clean, scannable reference. Every term below links back to the module where it was actually explained, in case a short definition here isn't enough.`,
    },
    {
      kind: 'text',
      heading: 'A \u2013 M',
      body: `
        <p><b>AMM (Automated Market Maker)</b> \u2014 a DEX mechanism that prices trades algorithmically from a liquidity pool's ratio, instead of matching buyers and sellers directly. <i>Module 09.</i></p>
        <p><b>ART (Asset-Referenced Token)</b> \u2014 MiCA's category for a stablecoin pegged to a basket of assets/currencies, as opposed to a single fiat currency. <i>Module 14.</i></p>
        <p><b>Atomic settlement</b> \u2014 settling two legs of a trade (asset and cash) as one indivisible transaction, so either both happen or neither does. <i>Module 13.</i></p>
        <p><b>Basel III crypto exposure rules</b> \u2014 the capital a bank must hold against crypto holdings; punitively high for unbacked assets. <i>Module 14.</i></p>
        <p><b>BUIDL</b> \u2014 BlackRock's tokenized money market fund, the reference case for tokenized real-world assets. <i>Module 08.</i></p>
        <p><b>CASP (Crypto-Asset Service Provider)</b> \u2014 MiCA's license category for exchanges, custodians, and brokers operating in the EU. <i>Module 14.</i></p>
        <p><b>CBDC (Central Bank Digital Currency)</b> \u2014 a digital, sovereign liability issued directly by a central bank. <i>Modules 02, 07.</i></p>
        <p><b>CEX (Centralized Exchange)</b> \u2014 a custodial, KYC'd trading venue like Binance or Coinbase. <i>Module 12.</i></p>
        <p><b>Consensus</b> \u2014 the rule a blockchain's nodes use to agree on valid transactions without a central authority. <i>Module 04.</i></p>
        <p><b>Custody</b> \u2014 holding assets on someone else's behalf; the core trust question behind CEX risk. <i>Module 12.</i></p>
        <p><b>DeFi (Decentralized Finance)</b> \u2014 lending, trading, and derivatives rebuilt as smart contracts instead of institutions. <i>Module 09.</i></p>
        <p><b>Depeg</b> \u2014 when a stablecoin's market price drops below its intended 1:1 value. <i>Modules 06, 16.</i></p>
        <p><b>DEX (Decentralized Exchange)</b> \u2014 a non-custodial trading venue running on smart contracts, like Uniswap. <i>Module 12.</i></p>
        <p><b>DLT (Distributed Ledger Technology)</b> \u2014 a ledger replicated across many nodes instead of one central database; blockchain is one type. <i>Module 04.</i></p>
        <p><b>DvP (Delivery-versus-Payment)</b> \u2014 the principle that an asset and its payment should settle together, neither without the other. <i>Module 13.</i></p>
        <p><b>EMT (E-Money Token)</b> \u2014 MiCA's category for a stablecoin pegged to a single fiat currency \u2014 covers USDT, USDC, EURC. <i>Module 14.</i></p>
        <p><b>FATF Travel Rule</b> \u2014 the requirement that crypto transfers above a threshold carry sender/recipient information, mirroring wire transfer rules. <i>Module 14.</i></p>
        <p><b>Finality</b> \u2014 the point at which a transaction is truly irreversible; instant on RTGS, often probabilistic on public blockchains. <i>Modules 04, 13.</i></p>
        <p><b>Flash loan</b> \u2014 a DeFi loan that must be borrowed and repaid within a single transaction, or it reverts entirely. <i>Modules 09, 16.</i></p>
        <p><b>GENIUS Act</b> \u2014 the 2025 US federal law creating a licensing framework for "permitted payment stablecoins." <i>Module 14.</i></p>
        <p><b>Governance token</b> \u2014 a token granting voting rights over a protocol's decisions. <i>Module 05.</i></p>
        <p><b>Herstatt risk</b> \u2014 the risk of paying your side of a trade before confirming the other side delivered theirs. <i>Module 13.</i></p>
        <p><b>M2</b> \u2014 a broad measure of money supply: cash, checking deposits, savings, and similar liquid assets. <i>Module 10.</i></p>
        <p><b>mBridge</b> \u2014 the BIS-led multi-CBDC wholesale cross-border settlement platform. <i>Module 11.</i></p>
        <p><b>MiCA (Markets in Crypto-Assets Regulation)</b> \u2014 the EU's comprehensive crypto rulebook. <i>Module 14.</i></p>
      `,
    },
    {
      kind: 'text',
      heading: 'N \u2013 Z',
      body: `
        <p><b>Native token</b> \u2014 a blockchain's own base asset, used for fees and/or network security (e.g. BTC, ETH). <i>Module 05.</i></p>
        <p><b>Project Agor\u00e1</b> \u2014 BIS/New York Fed-led wholesale cross-border tokenization research. <i>Module 11.</i></p>
        <p><b>Proof of Stake / Proof of Work</b> \u2014 two consensus mechanisms; PoS uses staked tokens to validate, PoW uses computing power. <i>Module 04.</i></p>
        <p><b>Retail CBDC / Wholesale CBDC</b> \u2014 consumer-facing vs. interbank-only versions of a central bank digital currency. <i>Module 07.</i></p>
        <p><b>RLN (Regulated Liability Network, formerly GBTD)</b> \u2014 a bank consortium testing shared-ledger tokenized deposits. <i>Module 11.</i></p>
        <p><b>RTGS (Real-Time Gross Settlement)</b> \u2014 a domestic central-bank settlement system with immediate, irrevocable finality (e.g. CHAPS). <i>Module 01.</i></p>
        <p><b>RWA (Real-World Asset)</b> \u2014 a traditional asset (a bond, a fund, real estate) represented as an on-chain token. <i>Module 08.</i></p>
        <p><b>Stablecoin</b> \u2014 a token designed to hold a stable value, via fiat backing, crypto collateral, or an algorithm. <i>Modules 02, 06.</i></p>
        <p><b>Tokenization</b> \u2014 moving an ownership record from a private database to a blockchain, without changing what's owned. <i>Module 08.</i></p>
        <p><b>Tokenized deposit</b> \u2014 a bank's own deposit liability, represented on-chain. <i>Modules 02, 08.</i></p>
        <p><b>TVL (Total Value Locked)</b> \u2014 the total value of assets deposited in DeFi protocols. <i>Modules 09, 10.</i></p>
        <p><b>Utility token</b> \u2014 a token granting the right to use a specific application or service. <i>Module 05.</i></p>
        <p><b>Wholesale settlement</b> \u2014 the final transfer of value between institutions, as opposed to consumer payments. <i>Modules 01, 13.</i></p>
      `,
    },
  ],
};

export default content;
