# Skill: Banking Accuracy Review

## Purpose

Use this skill when running accuracy reviews on content or visuals related to banking, payments, SWIFT messaging, settlement, digital assets or financial market infrastructure. It defines how to run the review, what to look for and how to report results.

---

## What a banking accuracy review is

A review that asks: "Would a senior banking practitioner — a payments architect, SWIFT specialist, operations lead or risk officer — find anything on this page that is wrong, misleading or embarrassing?"

This is a higher bar than grammatical correctness or writing quality. A sentence can be grammatically correct, clearly written and factually wrong or misleading about how banking works.

---

## What to check in every review

### Settlement and finality

- Does anything imply that a messaging network moves money, settles value or confers finality?
- Does anything imply that a network ACK/NACK, status event or tracking identifier proves settlement?
- Does anything imply that a payment is complete once a message is sent?

### Controls and contingency

- Does anything imply that contingency or emergency entry bypasses controls?
- Does anything imply that approval, entitlement, sanctions screening or audit are optional during contingency?
- Does anything understate the risk of contingency payment entry?

### Data and reporting

- Does anything imply that raw message data, logs or API responses are accounting truth or settlement truth?
- Does anything imply that querying a messaging network gives a complete view of a bank's obligations?

### Scheme and infrastructure scope

- Does anything imply that a specific scheme or infrastructure is universal, mandatory or ubiquitous when it is not?
- Does anything imply a single path for all participants in a scheme when in reality paths differ?

### Security

- Does anything expose operational security detail, firewall rules, network design specifics, credential patterns or runbook detail?
- Does anything describe cryptographic or key-management implementation at a level that would be sensitive?

### Language

- Is any claim stronger than the evidence supports?
- Is any claim vague in a way that invites misreading?
- Is hype language present: transformative, unlock, seamless, comprehensive, cutting-edge?
- Is the "not just X, but Y" construction present?

---

## How to run the review

1. Read the content or visual specification fully before making any judgement.
2. For each section, apply the relevant SWIFT_BANKING_ACCURACY_REVIEW or PAYMENTS_DLT_ACCURACY_REVIEW checklist item by item.
3. For each failing item, record:
   - The exact text or visual element that fails.
   - Why it fails (what a practitioner would object to).
   - A proposed correction.
4. Do not report PASS until all failing items are corrected or explicitly deferred with human approval and documented justification.
5. Report the verdict for each checklist section, then the overall verdict.

---

## Escalation criteria

Escalate to human review (do not attempt to self-correct) when:

- The issue involves a claim about a specific bank, scheme or infrastructure that could be verifiably wrong.
- The issue involves security detail that should not appear in public-facing content.
- The correction would change the meaning of the thesis or a key section.
- There is genuine uncertainty about the correct framing — for example, whether a scheme connectivity claim is accurate for the example given.

---

## How to report results

For each quality gate run, report:

```
## SWIFT_BANKING_ACCURACY_REVIEW result

Section 1 — Settlement claims: PASS
Section 2 — ACK/NACK and finality: PASS
Section 3 — gpi and UETR: NEEDS FIX
  Issue: Caption for Role 4 implies gpi tracker status proves settlement.
  Proposed correction: "gpi events update tracking state, not settlement state."
...
Section N — Overall verdict: NEEDS FIX

Issues to fix before proceeding:
1. [Section, element, issue, correction]
```

Do not produce a summary table without the item-by-item detail.
