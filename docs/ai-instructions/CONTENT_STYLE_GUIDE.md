# Content Style Guide

## Product positioning

This site is an authored banking-practitioner reference for payments, settlement, stablecoins, tokenisation, DLT, regulation, privacy and digital finance.

It is not:

- a generic crypto explainer
- a beginner course
- a vendor guide
- a hype page
- a wiki
- a ChatGPT-style article collection

Every page should help a banking, payments, engineering, risk or strategy reader understand the practical trade-offs.

## Writing voice

Write like an experienced banking/payments engineer.

Use:

- direct sentences
- named actors
- concrete trade-offs
- clear caveats
- practical operating implications
- liability, settlement, liquidity, reconciliation, controls and regulation as recurring lenses

Avoid:

- hype
- crypto tribal language
- generic consultancy language
- AI-polished rhythm
- excessive bullets
- excessive em dashes
- semicolon-heavy sentences
- colon-heavy fragments
- "not just X, but Y"
- "this matters because" repeated across sections
- vague words such as:
  - transformative
  - unlock
  - seamless
  - robust
  - game-changing
  - revolutionary
  - comprehensive
  - ecosystem, unless technically precise

## Banking relevance test

Every major section should answer at least one of:

- Whose liability is it?
- Who can redeem?
- Who controls distribution?
- Who captures the economics?
- What finality is achieved?
- What liquidity is required?
- What must be reconciled?
- What can fail operationally?
- What does the bank need to control?
- What is the regulatory or compliance implication?
- What evidence would a regulator, auditor or risk committee expect?

If a section does not answer one of these, tighten it or remove it.

## Source discipline

Do not invent current facts.

For current market, regulatory, product or company claims:

- use reputable sources
- prefer primary sources, regulators, central banks and major financial press
- include dates in the wording where relevant
- distinguish announced, piloted, live, production-scale and widely adopted
- distinguish transaction volume, trading volume, supply, market cap and real-world payment usage

Use wording such as:

- publicly reported
- as of [date]
- announced
- designed to
- may
- depends on jurisdiction
- adoption remains unproven

Do not present an announced initiative as proven infrastructure.

## Stablecoin-specific rules

When writing about stablecoins, always distinguish:

- issuer
- liability
- reserve model
- redemption rights
- distribution model
- reserve economics
- regulatory posture
- chain/wallet reach
- sanctions and compliance model
- operational risk

Do not frame the market as "USDT bad, USDC good". Compare models.

For Open USD:

- caveat as recently announced/launched
- do not claim proven adoption or volume unless sourced
- explain the consortium/network economics
- compare with single-issuer models
- avoid endorsement language

## DLT-specific rules

When writing about DLT platforms, compare by:

- public vs permissioned
- trust model
- consensus/finality
- privacy model
- smart contract model
- developer ecosystem
- institutional suitability
- operational maturity
- compliance fit
- liquidity/network reach
- production risk

Ethereum, Solana, Besu, Canton, Fabric and Corda should not be described as interchangeable. They solve different problems.

## Privacy and compliance rules

Privacy is not anonymity.

For regulated institutions, focus on:

- commercial confidentiality
- regulator visibility
- selective disclosure
- auditability
- AML and sanctions controls
- data minimisation
- permissioning
- market leakage risk

Key principle:

> The bank does not need secrecy from regulators, but it does need confidentiality from the market.

## Editorial review before commit

Before committing content, check:

- Does it sound like a human practitioner wrote it?
- Are there unsupported claims?
- Are caveats clear?
- Does it duplicate another topic?
- Are visual labels concise?
- Does it preserve the site's banking focus?
- Would a senior payments/platform/risk reader find the distinction useful?
