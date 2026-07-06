# SWIFT Banking Accuracy Review

Run this gate at every phase of the SWIFT gateway page. A PASS requires all items marked PASS or explicitly DEFERRED with documented justification and human approval.

---

## 1. Settlement claims

- [ ] No text, caption or visual element implies SWIFT settles money, moves funds or transfers value between accounts.
- [ ] Layer 10 (`money-settle`) is visually distinct and never shown as active or part of the SWIFT estate.
- [ ] No diagram arrow or animation implies money flows through SWIFT layers.
- [ ] Settlement is correctly attributed to RTGS, correspondent banking, nostro/vostro accounts, local clearing or market infrastructure.
- [ ] No chip, sublabel or tooltip implies SWIFT carries payment finality.

---

## 2. ACK/NACK and finality

- [ ] ACK/NACK is correctly described as network processing status confirmation, not final settlement.
- [ ] No text implies that receiving an ACK means the payment is complete, settled or irrevocable.
- [ ] No text implies that an NACK is equivalent to a payment reversal or funds return.

---

## 3. gpi and UETR

- [ ] gpi is correctly described as a tracking and status layer, not a settlement layer.
- [ ] UETR is correctly described as a unique transaction reference for tracking, not a settlement identifier.
- [ ] No text implies gpi/UETR status events prove finality, irrevocability or settlement completion.
- [ ] No text implies gpi makes all payments real-time or instant.

---

## 4. ISO 20022 and CBPR+

- [ ] ISO 20022 / CBPR+ is correctly described as a richer structured message format, not a settlement mechanism.
- [ ] No text implies ISO 20022 migration makes payments instant, removes correspondent settlement or eliminates nostro/vostro funding requirements.
- [ ] Coexistence of MT and ISO 20022 is acknowledged where relevant.

---

## 5. Controls and the estate as orchestrator

- [ ] The estate is described as orchestrating specialist control applications, not as owning every control itself.
- [ ] Sanctions and financial crime controls are attributed to specialist applications or platforms orchestrated through the estate.
- [ ] No text implies the SWIFT estate is the sole owner of all controls.

---

## 6. Contingency entry

- [ ] Contingency entry is described as bypassing a failed upstream system, not bypassing controls.
- [ ] The following control requirements are explicitly stated or clearly implied for contingency entry:
  - Approval
  - Entitlement
  - Segregation of duties
  - Sanctions screening
  - Accounting
  - Settlement
  - Reconciliation
  - Audit evidence
  - Retention
- [ ] No text implies contingency entry is low-risk, simple or routine.
- [ ] The estate is described as high-impact because of its contingency entry capability, not as inherently unsafe.

---

## 7. Liquidity management

- [ ] No text implies SWIFT manages bank liquidity.
- [ ] SWIFT SCORE, MA-CUGs and secure access services are correctly described as corporate and FI access channels, not liquidity management tools.
- [ ] Any reference to liquidity services available through SWIFT channels is correctly framed as external services the estate connects to, not services the estate provides.

---

## 8. Message data and reporting truth

- [ ] Raw SWIFT message data is correctly described as evidence, not accounting truth, settlement truth or customer-balance truth.
- [ ] The need for reconciliation with ledgers, settlement records and downstream systems is stated or clearly implied.
- [ ] No text implies that querying the SWIFT estate raw message store gives a complete or authoritative view of bank obligations.

---

## 9. Scheme and infrastructure breadth

- [ ] The estate is described as capable of supporting domestic schemes, European services, cross-border messaging and market-infrastructure connectivity — not only international correspondent payments.
- [ ] No text implies one universal path for all SWIFT flows, schemes or participants.
- [ ] Scheme connectivity examples are attributed to specific categories (domestic, European, market infrastructure) without implying universality.
- [ ] Scheme names used as examples are identified as examples, not complete lists.

---

## 10. Security — conceptual level only

- [ ] HSM, key signing and message authentication are described conceptually only — no implementation-level detail about key management, HSM model, signing algorithm or configuration.
- [ ] SWIFT CSP is referenced as a security programme or compliance framework only — no implementation detail, firewall rules, network design specifics or required control evidence.
- [ ] No text exposes bank-specific SWIFT estate configuration, network topology or operational runbook detail.
- [ ] Secure boundary and entitlement concepts are described at architectural concept level, not operational detail.

---

## 11. Visual — settlement and money

- [ ] No visual layer, chip, sublabel or annotation uses the words "money moves", "funds transfer", "funds flow" or "value transfer" for SWIFT layers.
- [ ] Layer 10 (`money-settle`) is visually separated from the active SWIFT estate — dashed border, different background or clear "outside SWIFT" label.
- [ ] No animation token, icon or particle represents money, coins or value moving through SWIFT layers.

---

## 12. Visual — controls and contingency

- [ ] Role 4 (controls) chips and sublabels make clear the estate orchestrates controls; they do not imply it owns all controls.
- [ ] Role 5 (contingency) chips and sublabels explicitly reference approval, entitlement, segregation of duties and sanctions.
- [ ] Role 5 caption explicitly states contingency bypasses a failed upstream system, not controls.

---

## 13. Quiz accuracy

- [ ] Every quiz question and answer option is factually correct.
- [ ] Correct answers do not inadvertently validate misconceptions.
- [ ] Explanation text for each answer reinforces the accurate framing, not just "correct" or "incorrect".
- [ ] No quiz question implies SWIFT settles money, ACK proves finality or gpi proves settlement.

---

## 14. Language and tone

- [ ] No hype language: transformative, unlock, seamless, game-changing, revolutionary, comprehensive, next-generation, cutting-edge.
- [ ] No "not just X, but Y" construction.
- [ ] No repeated em dashes for rhythm.
- [ ] No generic consultancy conclusions.
- [ ] Voice is banking-practitioner reference, not course explainer or vendor pitch.

---

## 15. Opening thesis

- [ ] The core thesis sentence is present: "The SWIFT estate is where financial messages become controlled, routed, evidenced and reportable bank obligations."
- [ ] The extended opening paragraph reflects the estate's breadth (channel, scheme connector, transformation, controls, gpi, contingency entry, evidence) without overclaiming.

---

## 16. Misconceptions

- [ ] All eight misconceptions listed in the visual plan are addressed explicitly or by clear implication:
  1. SWIFT is not only international payments.
  2. A bank SWIFT gateway is not just a send/receive messaging pipe.
  3. SWIFT moves secure financial messages; it does not move money.
  4. Raw SWIFT message data must be reconciled; it is not accounting truth.
  5. Contingency entry must preserve all controls.
  6. ACK/NACK confirms network processing status, not final settlement.
  7. gpi/UETR/status events are tracking evidence, not settlement finality.
  8. ISO 20022/CBPR+ enriches message data; it does not remove correspondent settlement.

---

## 17. Overall verdict

| Item | Status |
|---|---|
| Settlement claims | |
| ACK/NACK and finality | |
| gpi and UETR | |
| ISO 20022 and CBPR+ | |
| Controls as orchestrator | |
| Contingency entry | |
| Liquidity management | |
| Message data and reporting truth | |
| Scheme and infrastructure breadth | |
| Security — conceptual level only | |
| Visual — settlement and money | |
| Visual — controls and contingency | |
| Quiz accuracy | |
| Language and tone | |
| Opening thesis | |
| Misconceptions | |

**Overall gate result:** PASS / NEEDS FIX / FAIL

**Issues to fix before proceeding:**
(List each issue with file, section and required correction)
