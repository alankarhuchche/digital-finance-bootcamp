# Overclaiming Risk Review

## Purpose
Catch unsupported, misleading or overstated market, regulatory and DLT claims before they reach the site. This gate protects the site's credibility as a banking-practitioner reference. A single overclaim can undermine the authority of the surrounding accurate content.

## When to use
- At the end of any phase that adds content about DLT, stablecoins, tokenisation, payment rails, regulation, or market structure.
- Before committing any content that references specific initiatives (Project Agorá, CARF, CBDC pilots, etc.).
- When reviewing captions, cards, quiz questions or comparison matrices.
- When reviewing visual labels and mode explanations.

---

## Pass criteria

Content passes this gate when it:

- Uses cautious wording throughout: may, can, in some cases, inside the network, where value already exists on-ledger, subject to legal and regulatory treatment, depending on role.
- Presents role-dependent framing: bank obligations depend on whether it is issuer, custodian, access provider, exchange counterparty, payment facilitator or off-ramp provider.
- Has clear boundary conditions: same-network claims are not presented as universal.
- Shows old rails as modernising: Faster Payments (LIVE), CHAPS/RTGS (MODERNISING), SWIFT/CBPR+ (MODERNISING).
- Shows DLT as scenario-specific: useful in particular settlement and state contexts, not as a universal bank ledger replacement.
- Shows regulatory points as role-specific and activity-specific, not as universal obligations.
- References pilot initiatives with appropriate caveats: "wholesale", "prototype", "sandbox", "controlled context".

---

## Fail criteria

Content fails this gate when it makes any of these claims, explicitly or by strong implication:

### Rails and settlement
- Old rails are obsolete, dying or being replaced.
- DLT replaces all bank ledgers.
- Blockchain finality equals legal settlement finality.
- Settlement on DLT is automatic or instant without qualification.

### Reconciliation and operations
- DLT removes reconciliation.
- DLT removes accounting.
- DLT removes the need for custody.
- DLT eliminates exception handling.

### Interoperability
- Interoperability across ledgers is solved.
- All participants can directly access all ledgers.
- Cross-ledger movement is automatic or frictionless.
- A bridge or gateway removes the need for intermediaries, liquidity or liability management.

### Stablecoins
- Stablecoins are equivalent to bank deposits without qualification.
- A UK bank providing stablecoin access is necessarily the issuer.
- Stablecoin settlement is the same as legal settlement.
- Stablecoin use removes custody, reporting or reconciliation obligations.

### Regulation and reporting
- CARF is the same as payment scheme reporting.
- CARF is a settlement mechanism.
- Regulatory obligations apply universally regardless of role or jurisdiction.
- Proposed rules are presented as final or in force.

### Market and initiatives
- Project Agorá or similar is live production infrastructure.
- Any pilot, prototype or sandbox initiative is presented as commercially live or widely adopted.
- Performance numbers (TPS, finality time, cost) are stated without a date and source.

---

## High-risk phrases to search for

Search the content for these phrases and flag each one:

| Phrase | Risk |
|---|---|
| "old rails are" | May imply obsolescence |
| "replaces" | May imply full replacement of an existing mechanism |
| "removes the need for" | May overclaim DLT's scope |
| "eliminates" | May overclaim |
| "automatically" | May imply no intermediary, no cost, no risk |
| "seamlessly" | Style fail and often overclaim |
| "instant settlement" | May confuse message confirmation with settlement finality |
| "legal finality" | Must distinguish from blockchain/on-chain finality |
| "equivalent to" | May equate things that are legally distinct (e.g., stablecoin = deposit) |
| "is live" | Check the initiative before asserting live production status |
| "is the issuer" | Must check role assumption |
| "all participants" | May overclaim access universality |
| "solved" | May overclaim interoperability or regulatory state |
| "no longer need" | May overclaim elimination of obligation |

---

## Maturity language requirement

Every claim about a payment rail, DLT network, or regulatory initiative must carry appropriate maturity language:

| Maturity state | Required wording |
|---|---|
| Live production at scale | LIVE; "currently live", "in production" |
| Actively modernising | MODERNISING; "is modernising through...", "ISO 20022 migration underway" |
| Emerging, limited use | EMERGING; "emerging in controlled contexts", "limited live use" |
| Pilot, prototype, sandbox | SANDBOX; "pilot", "prototype", "wholesale sandbox", "not yet in production" |

Do not use LIVE for anything that is not confirmed in production at commercial scale with a reputable source.

---

## Review checklist

- [ ] Search for each high-risk phrase listed above. Evaluate each hit.
- [ ] Check every claim about what DLT does or removes. Is "may" or "can" used rather than absolute language?
- [ ] Check every maturity label on rails, initiatives and DLT networks. Is each label accurate?
- [ ] Check every stablecoin claim. Is the bank's role explicit? Is issuer not assumed?
- [ ] Check every interoperability claim. Is it shown as a control point with intermediaries and obligations?
- [ ] Check every regulatory claim. Is it role-specific, jurisdiction-specific, and caveated?
- [ ] Check every reference to a named initiative (Project Agorá, CBDC pilots, etc.). Is it framed as pilot/wholesale/sandbox?
- [ ] Check the quiz questions. Do any answers imply overclaims if selected incorrectly?
- [ ] Check visual labels. Do any labels imply universal access, automatic settlement, or full replacement?
- [ ] Check comparison matrices. Do "what DLT changes" claims overclaim scope?

---

## Example red flags

**Fail — DLT replaces reconciliation:**
> DLT provides a shared ledger, removing the need for bilateral reconciliation.

**Pass — accurate:**
> DLT may reduce reconciliation steps inside a single network, but accounting, evidence and exception handling still apply.

---

**Fail — interoperability overclaim:**
> Cross-ledger interoperability protocols allow seamless movement of value between any two networks.

**Pass — accurate:**
> Cross-ledger interoperability may require bridges, gateways, custodians or common platforms. Each introduces its own access, liquidity and liability considerations.

---

**Fail — bank assumed to be issuer:**
> Banks using stablecoins issue and redeem value directly, replacing correspondent banking for cross-border settlement.

**Pass — accurate:**
> A bank providing access to a stablecoin network may act as custodian, access provider, or exchange counterparty. Its role — and its obligations — depend on the structure of the arrangement.

---

**Fail — pilot presented as live:**
> Project Agorá has successfully demonstrated tokenised settlement across central bank and commercial bank money.

**Pass — accurate:**
> Project Agorá is exploring tokenised commercial bank deposits and central bank reserves in a wholesale, multi-central-bank context. It is not live production infrastructure.

---

**Fail — blockchain finality as legal finality:**
> Once confirmed on-chain, the transaction is final.

**Pass — accurate:**
> On-chain confirmation records the shared state change inside the network. Legal settlement finality depends on jurisdiction, contract, and regulatory treatment.

---

## Required report format

After completing this review, report:

1. Sections and visuals reviewed.
2. High-risk phrases found: list each, with location and resolution.
3. Maturity labels audited: list rails and initiatives checked.
4. Stablecoin role assumptions: confirmed role-specific or flagged.
5. Interoperability claims: confirmed as control points or flagged.
6. Regulatory claims: confirmed as role/jurisdiction-specific or flagged.
7. Initiative references: confirmed as pilot/wholesale/sandbox or flagged.
8. Changes made to resolve fails.
9. Pass or fail verdict with reason.
