export interface TermDefinition {
  term: string;
  aliases: string[];
  fullForm?: string;
  simple: string;
  glossaryId?: string;
}

export const TERM_DEFINITIONS: TermDefinition[] = [
  { term: 'DLT', aliases: ['DLT'], fullForm: 'distributed ledger technology', simple: 'A database shared across multiple participants instead of held by one central party. Blockchain is one type of DLT.', glossaryId: 'dlt-basics' },
  { term: 'DeFi', aliases: ['DeFi'], fullForm: 'decentralised finance', simple: 'Financial services built with smart contracts rather than through banks or market infrastructure. Risk depends on governance, liquidity, code quality and legal enforceability.', glossaryId: 'defi' },
  { term: 'DEX', aliases: ['DEX'], fullForm: 'decentralised exchange', simple: 'A trading venue that runs on smart contracts. You keep your assets in your own wallet rather than handing them to the exchange.', glossaryId: 'market-structure' },
  { term: 'wCBDC', aliases: ['wCBDC'], fullForm: 'wholesale CBDC', simple: 'A central bank digital token used only by banks and financial institutions for interbank settlement, not by consumers.' },
  { term: 'CBDC', aliases: ['CBDC', 'CBDCs'], fullForm: 'central bank digital currency', simple: 'Digital money issued directly by a central bank. Retail CBDCs are for consumers; wholesale CBDCs are for interbank settlement.', glossaryId: 'cbdc' },
  { term: 'RTGS', aliases: ['RTGS'], fullForm: 'real-time gross settlement', simple: 'A system where each payment settles individually and immediately in central bank money. CHAPS in the UK and Fedwire in the US are examples.', glossaryId: 'existing-rails' },
  { term: 'CHAPS', aliases: ['CHAPS'], simple: 'The UK high-value payment system. Payments settle individually in central bank money at the Bank of England, with immediate finality.' },
  { term: 'FPS', aliases: ['FPS'], fullForm: 'Faster Payments Service', simple: 'The UK real-time payment system for lower-value transfers, settling in under two seconds, 24/7.' },
  { term: 'DvP', aliases: ['DvP'], fullForm: 'delivery versus payment', simple: 'The asset moves only if the payment also moves. Designed to reduce the risk that one side delivers while the other fails.' },
  { term: 'PvP', aliases: ['PvP'], fullForm: 'payment versus payment', simple: 'Both currencies in a foreign exchange trade settle at the same time. CLS uses this model to eliminate Herstatt risk.' },
  { term: 'FMI', aliases: ['FMI'], fullForm: 'financial market infrastructure', simple: 'The systems that underpin financial markets: payment systems, CCPs, CSDs and trade repositories.' },
  { term: 'CSD', aliases: ['CSD'], fullForm: 'central securities depository', simple: 'The institution that holds securities records and processes settlement of securities trades.' },
  { term: 'CCP', aliases: ['CCP'], fullForm: 'central counterparty', simple: 'An entity that sits between two sides of a trade, guaranteeing settlement even if one party defaults.' },
  { term: 'HSM', aliases: ['HSM'], fullForm: 'hardware security module', simple: 'Tamper-resistant hardware that generates and stores cryptographic keys. Used in payment systems and blockchain custody.' },
  { term: 'MPC', aliases: ['MPC'], fullForm: 'multi-party computation', simple: 'A cryptographic technique where multiple parties jointly compute a result without any party revealing their private input. Used in institutional key management.' },
  { term: 'KYC', aliases: ['KYC'], fullForm: 'know your customer', simple: 'The process of verifying who a customer is before providing financial services. A legal requirement for regulated institutions.' },
  { term: 'AML', aliases: ['AML'], fullForm: 'anti-money laundering', simple: 'Regulations requiring financial institutions to monitor transactions and report suspicious activity.' },
  { term: 'ISO 20022', aliases: ['ISO 20022'], simple: 'The global messaging standard replacing older payment formats. It uses structured, machine-readable data fields instead of free text.' },
  { term: 'Nostro', aliases: ['Nostro', 'nostro'], simple: 'A bank\'s own account held at another bank, usually in a foreign currency. "Our money at your bank." One reason correspondent banking ties up liquidity.' },
  { term: 'Vostro', aliases: ['Vostro', 'vostro'], simple: 'Another bank\'s account held on your books. The mirror of a nostro. "Your money at our bank."' },
  { term: 'stablecoin', aliases: ['stablecoin', 'stablecoins', 'Stablecoin', 'Stablecoins'], simple: 'A token designed to hold a stable value, usually pegged to a fiat currency. Backed by reserves (USDC, USDT), crypto collateral (DAI), or algorithms.' },
  { term: 'deposit token', aliases: ['deposit token', 'deposit tokens', 'Deposit token', 'Deposit tokens'], simple: 'A commercial bank\'s own deposit liability represented as a token on a blockchain. It stays on the bank\'s balance sheet and carries deposit insurance.' },
  { term: 'tokenised deposit', aliases: ['tokenised deposit', 'tokenised deposits', 'tokenized deposit', 'tokenized deposits'], simple: 'A bank deposit recorded on a blockchain ledger rather than a traditional database. Often used interchangeably with deposit token.' },
  { term: 'tokenisation', aliases: ['tokenisation', 'tokenization', 'Tokenisation', 'Tokenization'], simple: 'Moving an ownership record from a private database to a blockchain. What you own does not change; where the record lives does.' },
  { term: 'atomic settlement', aliases: ['atomic settlement', 'Atomic settlement'], simple: 'Both legs of a trade settle as one indivisible transaction. If either leg fails, neither settles. Eliminates the risk of partial delivery.' },
  { term: 'legal finality', aliases: ['legal finality', 'Legal finality'], simple: 'The point at which a transaction is irrevocable under the applicable legal framework. Not always the same as technical confirmation on a blockchain.' },
  { term: 'technical finality', aliases: ['technical finality', 'Technical finality'], simple: 'The point at which a blockchain\'s consensus mechanism confirms a transaction. May happen before or after legal finality depending on jurisdiction.' },
  { term: 'cash leg', aliases: ['cash leg'], simple: 'The payment side of a securities trade. In tokenised settlement, the cash leg must also be tokenised for atomic DvP to work.' },
  { term: 'interoperability', aliases: ['interoperability', 'Interoperability'], simple: 'The ability of different ledgers, networks or payment systems to exchange value and data. The unsolved problem connecting deposit tokens, stablecoins and CBDCs.' },
  { term: 'programmable payments', aliases: ['programmable payments', 'Programmable payments'], simple: 'Payments with user-defined or contract-defined conditions attached. For example: release payment when goods clear customs.' },
  { term: 'programmable money', aliases: ['programmable money', 'Programmable money'], simple: 'Money with issuer-defined restrictions built in. For example: tokens that can only be spent at approved merchants. More controversial than programmable payments.' },
  { term: 'smart contract', aliases: ['smart contract', 'smart contracts', 'Smart contract', 'Smart contracts'], simple: 'Code deployed on a blockchain that executes automatically when conditions are met. Used for lending, trading, settlement and escrow.' },
  { term: 'oracle', aliases: ['oracle', 'oracles', 'Oracle', 'Oracles'], simple: 'A service that feeds real-world data (prices, rates, events) to on-chain smart contracts. A point of trust in otherwise trustless systems.' },
];
