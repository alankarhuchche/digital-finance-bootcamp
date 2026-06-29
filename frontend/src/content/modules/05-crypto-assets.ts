import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'crypto-assets',
  number: '05',
  title: 'Crypto assets',
  summary: 'Native, utility, and governance tokens.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `The Forms of money and Risk topics covered crypto assets that try to act like money (stablecoins, and CBDC as the non-crypto sovereign equivalent). Most crypto assets are not trying to be money at all. This topic covers the categories that get lumped in under “crypto” anyway, which is exactly why the term feels so overloaded.`,
    },
    {
      kind: 'matrix',
      heading: 'Five categories, five different jobs',
      data: {
        columns: ['What it represents', 'Value driven by', 'Example'],
        items: [
          { id: 'native', label: 'Native token', color: '#E8A33D', values: [`The base asset of its own blockchain — used to pay transaction fees (gas) and/or secure the network through staking or mining`, `Network usage and the security budget it funds; heavily speculative too`, 'Bitcoin (BTC), Ether (ETH)'] },
          { id: 'utility', label: 'Utility token', color: '#7AA7D9', values: [`A right to use a specific application or service built on a blockchain — you spend tokens to access storage, compute, or bandwidth`, `Demand for that one application — narrower and more fragile than a native token’s value driver`, 'Filecoin (decentralized storage), Chainlink (LINK)'] },
          { id: 'governance', label: 'Governance token', color: '#C792E8', values: [`Voting rights over a protocol’s future — fees, upgrades, treasury spending. One token typically equals one vote`, `Perceived value of influencing that protocol’s decisions and sometimes a claim on fee revenue`, 'UNI (Uniswap), SKY (formerly MakerDAO)'] },
          { id: 'security', label: 'Security token', color: '#5FB3A3', values: [`A digital representation of a traditional security — equity, debt, or a revenue-share right — issued on-chain and subject to securities law`, `The underlying asset’s fundamentals: cash flows, earnings, collateral value`, 'tZERO equity tokens, Securitize-issued tokens'] },
          { id: 'nft', label: 'NFT / digital collectible', color: '#E0726B', values: [`A unique, non-fungible token representing ownership of a specific digital or physical item — art, music, in-game items, event tickets`, `Scarcity, cultural cachet, and speculative demand; no cash-flow basis in most cases`, 'Bored Ape Yacht Club, CryptoPunks, NBA Top Shot'] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'How native tokens actually work',
      body: `When you send a transaction on Ethereum, you pay a gas fee in ETH. That fee has two components since EIP-1559 (August 2021): a base fee that gets permanently burned — destroyed, reducing ETH supply — and an optional priority tip that goes to the validator who includes your transaction. In high-usage periods, more ETH is burned than is newly issued as staking rewards, making ETH temporarily deflationary. This “ultrasound money” mechanic ties Ethereum’s supply dynamics directly to network demand.\n\nBitcoin works differently. Its supply follows a fixed, predictable schedule: 21 million coins maximum, with the mining reward halving roughly every four years. The most recent halving (April 2024) cut the block reward from 6.25 to 3.125 BTC. Each halving reduces new supply while demand may stay constant or grow — historically, halvings have preceded major price run-ups, though the causal relationship is debated.`,
    },
    {
      kind: 'text',
      heading: 'How governance tokens sustain value',
      body: `Holding a governance token like UNI gives you votes on protocol proposals — should Uniswap change its fee tiers? Should the treasury fund a grant? Voting typically works on-chain: you delegate your tokens (to yourself or a representative), a proposal goes live for a voting period (usually 7 days), and if it passes quorum and majority, the smart contract executes the change automatically. The open question for governance tokens is whether voting power alone justifies a market cap in the billions, or whether protocols eventually need to turn on “fee switches” that distribute revenue to token holders — turning the token into something closer to equity.`,
    },
    {
      kind: 'text',
      heading: 'The Howey test and why classification matters',
      body: `In the US, the SEC uses the Howey test (from a 1946 Supreme Court case) to decide whether something is a security: is there (1) an investment of money, (2) in a common enterprise, (3) with an expectation of profit, (4) derived from the efforts of others? If all four prongs are met, it’s a security and must be registered or qualify for an exemption.\n\nThis matters enormously because most token projects did not register. If a token is classified as a security, the issuer faces enforcement action, exchanges must delist it, and US retail investors may lose access. The classification also determines which regulator has jurisdiction — the SEC (securities) vs. the CFTC (commodities). Bitcoin is generally treated as a commodity; ETH’s status has been debated but the SEC has not formally classified it as a security; most other tokens exist in a gray zone.`,
    },
    {
      kind: 'text',
      heading: 'Why the terminology blurs',
      body: `News coverage and casual conversation use “crypto” to mean all of this at once — Bitcoin, a DeFi governance token, an NFT, and a stablecoin get discussed in the same breath, even though only the stablecoin is actually trying to behave like money. Many tokens blur categories themselves: ETH is a native token and also used as collateral in DeFi; some governance tokens carry revenue-sharing rights that look like securities. Keeping these categories separate in your head is most of what it takes to follow a conversation in this space without getting lost.`,
    },
    {
      kind: 'case',
      heading: 'The defining classification case: SEC vs Ripple (XRP)',
      data: {
        title: 'SEC v. Ripple Labs',
        dateRange: '2020–2024',
        whatHappened: `In December 2020, the SEC sued Ripple Labs alleging that XRP was an unregistered security. Ripple argued XRP was a currency or commodity, not a security. In July 2023, Judge Analisa Torres issued a split ruling: XRP sold directly to institutional investors was an unregistered security (those buyers expected profits from Ripple’s efforts), but XRP sold on public exchanges to retail buyers was not — because retail buyers did not know they were buying from Ripple and thus the “efforts of others” prong was not clearly met. Ripple was fined $125 million (far less than the SEC’s $2 billion ask). In 2024, the SEC dropped its appeal of the retail ruling.`,
        whyItMatters: `This case set the most important precedent for token classification in US law. The split ruling — same token, different classification depending on the sales channel — showed that the Howey test applies to the transaction context, not the token itself. It gave the industry a partial roadmap: programmatic sales on exchanges may avoid securities classification, but direct sales to investors with promises of future development likely will not.`,
        source: 'SEC v. Ripple Labs, Inc. (S.D.N.Y. 2023); court filings and rulings',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'text',
      body: `One category of crypto asset — stablecoins — is so important to the payments story that it gets its own deep-dive. The next topic breaks down the four different mechanisms stablecoins use to hold their peg.`,
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'What happens to the base fee paid on an Ethereum transaction since EIP-1559?', options: ['It goes entirely to the validator who processes the block', 'It is permanently burned, reducing ETH supply', 'It is redistributed to all ETH stakers equally', 'It is held in a protocol treasury for future development'], correctIndex: 1, explanation: 'Since EIP-1559, the base fee is burned. Only the optional priority tip goes to the validator. This links ETH supply to network demand.' },
          { question: 'In SEC v. Ripple, how did the court classify XRP?', options: ['A security in all circumstances', 'A commodity in all circumstances', 'A security when sold to institutions, but not when sold programmatically on exchanges to retail', 'Not subject to US securities law at all'], correctIndex: 2, explanation: 'The court issued a split ruling: same token, different classification depending on whether buyers knew they were purchasing from Ripple and expected profits from its efforts.' },
          { question: 'What distinguishes a security token from a utility token?', options: ['Security tokens are always more expensive', 'Security tokens represent a traditional financial claim (equity, debt) and are subject to securities law; utility tokens grant access to a service', 'Utility tokens can only be used on Ethereum', 'There is no legal distinction between the two'], correctIndex: 1, explanation: 'Security tokens digitize traditional securities on-chain and must comply with securities regulation, while utility tokens provide access to a specific application or service.' },
        ],
      },
    },
  ],
};

export default content;
