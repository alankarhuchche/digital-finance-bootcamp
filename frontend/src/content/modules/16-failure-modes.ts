import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'failure-modes',
  number: '16',
  title: 'Failure modes',
  summary: 'Depegs, hacks, custody and smart contract risk.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `Three case studies already in this guide — Terra/UST (Topic 06), Euler Finance (Topic 09), and FTX (Topic 12) — are each a different failure category. This topic names the categories explicitly, adds three major types not yet covered — bridge exploits, oracle manipulation, and rug pulls — and maps the crypto failure modes to their traditional finance analogues.`,
    },
    {
      kind: 'matrix',
      heading: 'The failure categories, named',
      data: {
        columns: ['What actually breaks', 'Already covered in', 'TradFi analogue'],
        items: [
          { id: 'depeg', label: 'Algorithmic depeg', color: '#E0726B', values: [`A stabilization mechanism with no real backing accelerates a collapse instead of absorbing it`, 'Topic 06 — Terra/UST', `LTCM (1998): a model-driven strategy that worked until the model's assumptions broke, then collapsed reflexively — leverage amplifying losses instead of absorbing them`] },
          { id: 'smartcontract', label: 'Smart contract exploit', color: '#7AA7D9', values: [`A coding flaw (often combined with a flash loan) lets an attacker extract funds the logic should have prevented`, 'Topic 09 — Euler Finance', `Software bugs in HFT systems causing flash crashes (Knight Capital, 2012: $440M lost in 45 minutes due to a deployment error in automated trading code)`] },
          { id: 'custody', label: 'Custodial misuse', color: '#5FB3A3', values: [`A custodian misuses or misrepresents customer funds it was supposed to merely hold`, 'Topic 12 — FTX', `Wirecard (2020): €1.9B in "cash" that simply didn't exist, auditors failed to verify, executives fabricated records — custodial fraud at a regulated, publicly listed fintech`] },
          { id: 'bridge', label: 'Bridge exploit', color: '#C792E8', values: [`A cross-chain bridge's validator/signing security is compromised, draining the assets it was holding in escrow`, 'See case below (Ronin)', `Barings Bank (1995): a single rogue trader, Nick Leeson, exploited weak internal controls to accumulate $1.3B in hidden losses — the "bridge" between front office and back office was compromised`] },
          { id: 'oracle', label: 'Oracle manipulation', color: '#E8A33D', values: [`An attacker manipulates the price feed that a protocol relies on, tricking it into executing transactions at artificial prices`, 'See case below (Mango Markets)', `Libor scandal (2012): banks manipulated the benchmark interest rate that trillions in derivatives referenced — the "oracle" for traditional finance was corrupted from inside`] },
          { id: 'rug', label: 'Rug pull / exit scam', color: '#9FB7CC', values: [`Developers launch a token or protocol, attract deposits, then drain the liquidity and disappear — often with no exploit needed, just the admin keys`, 'Common across DeFi — thousands of cases', `Boiler room scams and penny stock pump-and-dumps: promoters inflate an asset, sell their holdings, and vanish. The mechanism is identical; only the technology differs`] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'Protocol risk vs implementation risk',
      body: `Not all failures are created equal, and the distinction matters for risk assessment. <b>Protocol risk</b> means the design itself is flawed — Terra/UST's algorithmic stabilization mechanism was mathematically vulnerable to a death spiral under sufficient selling pressure, regardless of how well the code was written. No amount of auditing would have saved it because the risk was in the architecture, not the implementation. <b>Implementation risk</b> means the design is sound but the code has bugs — Euler Finance's donation-based exploit was a coding flaw in an otherwise reasonable lending protocol. The fix was a code patch, not a redesign. Bridge exploits often sit in between: the concept of locking assets on one chain and minting representations on another is sound, but the specific security model (how many validators, how keys are managed) is a design choice that determines whether an implementation flaw is catastrophic or contained. Understanding which type of risk you're evaluating changes the question from "was this audited?" to "is the architecture itself sound?"`,
    },
    {
      kind: 'case',
      heading: 'The bridge category: Ronin',
      data: {
        title: 'Ronin Bridge exploit (Axie Infinity)',
        dateRange: '23 March 2022 (discovered 6 days later)',
        whatHappened: `Attackers compromised five of the nine validator keys controlling the Ronin cross-chain bridge — enough to approve fraudulent withdrawals — and drained roughly $625 million in ETH and USDC. The US Treasury attributed the attack to North Korea's Lazarus Group. The breach went unnoticed for six days. Sky Mavis, Ronin's operator, fully reimbursed affected users and later recovered roughly $40 million through law enforcement action.`,
        whyItMatters: `Bridges are uniquely attractive targets because they concentrate large pooled assets behind a relatively small set of signing keys — compromise the keys, not the underlying blockchain, and the funds are gone. This is structurally different from Euler's code-logic flaw or Terra's mechanism failure: the blockchain itself was never broken, the trust assumption around who controls the bridge was.`,
        source: 'US Treasury OFAC sanctions announcement; Chainalysis and Elliptic incident analysis',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'case',
      heading: 'The oracle category: Mango Markets',
      data: {
        title: 'Mango Markets oracle manipulation ($114M, October 2022)',
        dateRange: '11 October 2022',
        whatHappened: `Avraham Eisenberg exploited Mango Markets, a Solana-based decentralized exchange, by manipulating the price of the MNGO token on thin-liquidity markets. He took a large perp position on Mango, then used a second account to buy MNGO spot on low-liquidity venues, pumping the oracle price. With his paper profits inflated by the manipulated oracle, he borrowed $114 million in other assets from the Mango treasury — effectively draining the protocol. Eisenberg openly acknowledged the trade on Twitter, calling it a "profitable trading strategy." He was later arrested by the FBI in Puerto Rico and charged with commodities fraud and market manipulation. In April 2024, a federal jury convicted him on all counts.`,
        whyItMatters: `Oracle manipulation attacks expose a fundamental dependency in DeFi: protocols that rely on external price feeds are only as secure as those feeds. Unlike smart contract exploits (which require finding a code bug) or bridge exploits (which require compromising keys), oracle manipulation can be executed by anyone with enough capital to move a thin market. Mango's design assumed that the oracle price reflected true market value — a reasonable assumption on liquid markets, but catastrophically wrong on a token with $2M in daily trading volume. The case also established legal precedent: Eisenberg's conviction confirmed that exploiting a DeFi protocol's economic design is a federal crime, not just a "profitable trading strategy."`,
        source: 'DOJ indictment (Dec 2022); jury verdict (Apr 2024); on-chain transaction analysis by Arkham Intelligence',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'text',
      heading: 'The pattern across all six — and their TradFi mirrors',
      body: `Every category here is a different answer to the same question: what, exactly, were you trusting, and was that trust justified? An algorithmic stablecoin asks you to trust a mechanism with no real backing (LTCM trusted its models). A DeFi protocol asks you to trust its code is bug-free (Knight Capital trusted its deployment process). A CEX asks you to trust a company's custody promises (Wirecard's auditors trusted management's word). A bridge asks you to trust a small set of keys (Barings trusted its back-office controls). An oracle asks you to trust that a price feed reflects reality (Libor submitters were trusted to report honestly). A rug pull asks you to trust that anonymous developers won't steal your money (penny stock promoters were trusted for the same reason). None of these risks is unique to crypto — traditional finance has experienced every single one — but the absence of deposit insurance, a central counterparty, or a regulator of last resort means the consequences land faster and harder when trust turns out to be misplaced.`,
    },
    {
      kind: 'text',
      heading: 'How the industry has responded',
      body: `The crypto industry hasn't just absorbed these losses — it has built an increasingly sophisticated defense ecosystem. <b>Bug bounties</b> have become standard practice: as of mid-2025, platforms like Immunefi have paid out over $250 million in rewards to white-hat hackers who reported vulnerabilities before they could be exploited. The largest single bounty was $10 million paid by Wormhole. <b>Formal verification</b> — using mathematical proofs to verify that smart contract code behaves as intended — has moved from academic curiosity to industry practice, with firms like Runtime Verification and Certora working with major protocols. <b>Multi-sig improvements</b> have raised the bar: after Ronin's 5-of-9 compromise, most bridges now require higher thresholds, time-locked transactions, and hardware security modules for validator keys. <b>Insurance protocols</b> like Nexus Mutual now offer coverage for smart contract failures, oracle manipulation, and custodial risk, though total coverage capacity (~$500M as of 2025) remains a tiny fraction of the total value locked in DeFi. Roughly $500M in coverage against tens of billions in open positions. That ratio is more informative than any industry narrative about maturity.

If you've reached this point, you have a complete mental model. The glossary is your reference — every term, linked back to the topic that explained it.`,
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'How did Avraham Eisenberg exploit Mango Markets, and what was the legal outcome?', options: ['He found a smart contract bug that allowed unauthorized withdrawals; charges were dropped', 'He manipulated the MNGO oracle price on thin-liquidity markets to inflate paper profits, then borrowed $114M against them; he was convicted of commodities fraud', 'He compromised the bridge validator keys and drained the treasury; he was never identified', 'He used a flash loan to exploit a reentrancy bug; the case is still pending'], correctIndex: 1, explanation: 'Eisenberg manipulated the MNGO price oracle by pumping the token on low-liquidity venues, used the inflated value as collateral to borrow $114M, and was convicted on federal commodities fraud and market manipulation charges.' },
          { question: 'What is the difference between protocol risk and implementation risk?', options: ['Protocol risk only affects small projects while implementation risk affects large ones', 'Protocol risk means the design architecture itself is flawed; implementation risk means the design is sound but the code has bugs', 'Protocol risk is theoretical while implementation risk causes real losses', 'Protocol risk can be eliminated by audits while implementation risk cannot'], correctIndex: 1, explanation: 'Protocol risk (e.g., Terra/UST) is a flaw in the architecture that no audit can fix. Implementation risk (e.g., Euler) is a code bug in a sound design that a patch can resolve. The distinction changes what you need to evaluate.' },
          { question: 'Which traditional finance failure is the closest analogue to DeFi oracle manipulation, and why?', options: ['The 2008 mortgage crisis, because both involved mispriced assets', 'The Libor scandal, because banks manipulated the benchmark rate that trillions in derivatives referenced — corrupting the "price oracle" of traditional finance', 'The Enron collapse, because both involved accounting fraud', 'The dot-com bubble, because both involved speculative overvaluation'], correctIndex: 1, explanation: 'The Libor scandal is the direct analogue: banks manipulated the benchmark interest rate that served as the price oracle for trillions in traditional financial instruments, just as Eisenberg manipulated the price feed that Mango Markets relied on.' },
        ],
      },
    },
  ],
};

export default content;
