# Payments and DLT Accuracy Review

## Purpose
Validate that payments, settlement and DLT content is technically accurate and does not confuse distinct mechanisms. This gate is the primary defence against content that misrepresents how money, settlement and DLT actually work.

## When to use
- At the end of any phase that adds or edits content about payment rails, settlement, DLT, tokenisation, stablecoins or interoperability.
- Before committing content that includes claims about how value moves, how finality works, or what DLT does or does not do.
- When reviewing a visual that shows money, message or token movement.

---

## Pass criteria

Content passes this gate when it:

- Distinguishes payment message from money movement clearly.
- Shows that customer ledger postings and interbank settlement are separate events.
- Shows that scheme processing and settlement finality are separate.
- Shows that DLT shared state does not replace bank accounting.
- States or implies that blockchain finality is technical confirmation, not legal settlement finality.
- Distinguishes stablecoin issuer from custodian, access provider, exchange provider and payment facilitator.
- Treats CARF/reporting as a reporting/evidence layer, not a settlement mechanism.
- Distinguishes same-network DLT from cross-network interoperability.
- Uses cautious wording: may, can, depends on role, inside the network, where value already exists on-ledger, subject to legal and regulatory treatment.
- Shows old rails as modernising: Faster Payments (LIVE), CHAPS/RTGS (MODERNISING), SWIFT/CBPR+ (MODERNISING), correspondent banking (MODERNISING).
- Shows that DLT value must be funded unless it already exists on-ledger.

---

## Fail criteria

Content fails this gate when it:

- Uses "payment" to mean message AND money movement interchangeably.
- Shows payer ledger → receiver ledger as a direct value transfer without showing settlement.
- Implies scheme confirmation is the same as final settlement.
- States or implies that DLT eliminates the need for bank ledgers.
- States or implies that blockchain finality equals legal settlement finality.
- States or implies that a UK bank providing stablecoin access is necessarily the issuer.
- Places CARF/reporting in the settlement layer rather than the reporting/evidence layer.
- Implies interoperability across ledgers is automatic or frictionless.
- Implies all participants can directly access all ledgers.
- Uses absolute language: "DLT removes reconciliation", "old rails are obsolete", "interoperability is solved".
- References Project Agorá or similar initiatives as live production infrastructure when they are wholesale, sandbox or prototype.
- Implies stablecoins are equivalent to bank deposits without qualification.

---

## Key distinctions to verify

Work through each distinction explicitly:

| Distinction | Check |
|---|---|
| Payment message vs. money movement | Are these shown as separate in the content or visual? |
| Customer ledger posting vs. interbank settlement | Does the content show both, or only the customer view? |
| Scheme processing vs. settlement finality | Is the gap between scheme confirmation and settlement shown? |
| DLT shared state vs. bank accounting | Does the content show that bank accounting still applies alongside DLT? |
| Blockchain finality vs. legal settlement finality | Is this distinction explicit or implicit? |
| Stablecoin issuer vs. custodian/access provider | Are role-specific obligations shown for each? |
| CARF vs. payment scheme reporting | Is CARF placed in reporting/evidence, not settlement? |
| Same-network DLT vs. cross-network interoperability | Are both covered, or only same-network? |
| Funded on-ledger value vs. fiat ledger | Is the funding/on-ramp step visible? |

---

## Review checklist

- [ ] Read every claim about how value moves. Is it a message, a ledger posting, or a settlement asset?
- [ ] Check every visual mode or flow diagram. Does it show both message flow and value/settlement flow separately?
- [ ] Search for "finality". Is blockchain/on-ledger finality distinguished from legal settlement finality?
- [ ] Search for "issuer". Is the bank's role as issuer vs. custodian vs. access provider distinguished?
- [ ] Search for "CARF" or "reporting". Is it in the reporting layer, not the settlement layer?
- [ ] Search for "interoperability". Is it presented as a control point with its own intermediaries, not as a magic pipe?
- [ ] Check all maturity labels. Are old rails shown as LIVE or MODERNISING, not as obsolete?
- [ ] Check all DLT claims. Is "may", "can" or "inside the network" used rather than absolute language?
- [ ] Check for Project Agorá or similar initiative references. Are they framed as wholesale, sandbox or prototype?
- [ ] Check the stablecoin mode. Is the bank role clearly stated and not assumed to be issuer?

---

## Example red flags

**Fail — payment message confused with money movement:**
> When a payment is sent via Faster Payments, money moves instantly from payer to receiver.

**Pass — accurate:**
> When a Faster Payments instruction is sent, the customer ledger is debited and the receiving bank's ledger is credited after scheme processing and settlement.

---

**Fail — DLT eliminating reconciliation:**
> DLT removes the need for reconciliation by providing a single shared ledger.

**Pass — accurate:**
> DLT may reduce reconciliation gaps inside a single network, but it does not remove accounting, exception handling or evidence obligations.

---

**Fail — blockchain finality as legal finality:**
> Once the transaction is confirmed on-chain, settlement is complete.

**Pass — accurate:**
> On-chain confirmation records the shared state change. Legal settlement finality depends on jurisdiction, contract and regulatory treatment.

---

**Fail — bank assumed to be stablecoin issuer:**
> When a UK bank settles in USD stablecoin, it issues and redeems the stablecoin directly.

**Pass — accurate:**
> A UK bank facilitating USD stablecoin payments may act as custodian, access provider, or exchange counterparty. It is not necessarily the issuer.

---

## Required report format

After completing this review, report:

1. Sections and visuals reviewed.
2. Distinctions checked (list from the table above).
3. Fails found and how each was resolved.
4. Cautious wording confirmed or added.
5. Maturity labels confirmed.
6. Pass or fail verdict with reason.
7. Any claims that required sourcing or qualification before passing.
