# Content Evidence Review

## Purpose

Ensure that phase completion reports expose the actual content added or changed — not a summary of it. This gate exists because a report that says "content passes AI_WRITING_REVIEW" without showing the content gives the human reviewer no way to independently verify the claim.

Domain accuracy, writing quality and misconception coverage can only be assessed if the exact text is visible. This gate is not a duplicate of AI_WRITING_REVIEW or SWIFT_BANKING_ACCURACY_REVIEW — it is the prerequisite that makes those gates independently verifiable.

---

## When to use

Run this gate at the end of any phase that creates or modifies:

- topic module files (any block)
- page metadata (title, summary, changeSummary)
- text blocks
- stack / card content (label, detail, examples)
- matrix or comparison rows (label, column values)
- quiz questions, answer options, correct index, explanations
- visual mode or role captions
- role labels and chips
- sublabel overrides
- placeholder text (any text block used as a stand-in for a future component)
- any content that contains banking or domain claims

Do not run this gate for phases that change only TypeScript logic, CSS, registry loader paths, or non-content metadata with no domain claims.

---

## Pass criteria

A phase passes this gate when the phase completion report:

- includes the exact full text of every new or changed text block
- includes the exact label, detail and examples for every new or changed stack card
- includes the exact label and all column values for every new or changed matrix or comparison row
- includes the exact question, all answer options, the correct index, and the full explanation for every quiz question
- includes the exact caption for every new or changed visual mode or role
- includes the exact role labels and chips for every new or changed visual role
- includes the exact placeholder text for any block used as a visual stand-in
- includes the full title, summary and changeSummary from the module metadata
- explicitly lists any claims that require human or domain-expert verification
- explicitly lists any content intentionally deferred to a later phase
- distinguishes exact content from any surrounding summary prose

The report must be sufficient for a human reviewer to verify every domain claim without reading the source file.

---

## Fail criteria

A phase fails this gate when the report:

- summarises content instead of showing it (e.g. "six stack cards describing the SWIFT roles were added")
- says "content passes" or "content is accurate" without exposing the actual text
- omits any quiz answer option or explanation
- omits any visual mode or role caption
- omits placeholder text or lists it as "text placeholder" without showing the actual text
- hides banking or domain claims behind a general description
- shows only changed lines rather than the full context needed to assess a claim
- shows a partial excerpt of a text block, card detail, quiz explanation, or caption and labels or implies it is the full content
- is insufficient for a human reviewer to verify the phase without reading the source file

---

## Required evidence packet

The report must include each of the following sections. If a section is not applicable to the phase, state "N/A — no [content type] added or changed in this phase."

### 1. Files with content changes
List every file that contains new or changed content.

### 2. Metadata
Show the exact values of `id`, `number`, `title`, `summary`, `ready`, `updatedAt`, `changeType`, `changeSummary` for every module file touched.

### 3. Exact text blocks
For every new or changed text block, show:
- the heading (if any)
- the full body text, verbatim

### 4. Exact stack / card content
For every new or changed stack card, show:
- number, label, colorClass
- full detail text, verbatim
- examples text, verbatim (if present)
- note text at block level, verbatim (if present)

### 5. Exact matrix / comparison content
For every new or changed matrix row, show:
- label and color
- each column value, verbatim

### 6. Exact quiz content
For every new or changed quiz question, show:
- question text, verbatim
- all answer options, verbatim and numbered
- correct index (zero-based) and which option that maps to
- explanation text, verbatim

### 7. Exact visual captions / role labels / chips
For every new or changed visual role or mode, show:
- role or mode label, verbatim
- caption text, verbatim
- all chips, verbatim

### 8. Placeholder text still visible
List the exact text of every placeholder block that will be replaced in a future phase. If no placeholders exist, state "None."

### 9. Domain claims requiring human review
List every claim that involves:
- a specific named scheme, rail, infrastructure or initiative
- a finality, settlement or regulatory claim
- a security or control claim at the edge of conceptual vs operational
- a contingency or controls claim

For each: state the claim and the location (block, field).

### 10. Content intentionally deferred
List any content that was planned but intentionally omitted from this phase, with justification.

### 11. Verdict rationale
State the overall verdict (PASS / NEEDS FIX / FAIL) and the specific reason.

---

## Domain-claim review requirements

Before writing this section, re-read every item in the evidence packet above — each text block body, each card detail, each matrix column value, each quiz question and explanation, each caption — sentence by sentence. Mark each sentence that falls into one of the categories below. Only then write the list.

If the evidence packet is not complete, do not complete this section. Complete the packet first.

The following claim types must always be listed in the "Domain claims requiring human review" section, regardless of whether they appear to be accurate:

- Any claim about what a named scheme or infrastructure does or does not do
- Any claim about settlement finality, irrevocability or legal finality
- Any claim about what an ACK, NACK, gpi event or UETR confirms
- Any claim about what contingency entry does or does not bypass
- Any claim about what raw message data does or does not establish
- Any claim about what ISO 20022 / CBPR+ does or does not change
- Any claim about bank liquidity and what the SWIFT estate does or does not manage
- Any security claim, even if framed as conceptual

These claims are not assumed accurate by the AI completing the gate. They are flagged for human confirmation.

---

## Placeholder review requirements

A placeholder block is any content block that is explicitly standing in for a future component — for example, a text block containing "[Visual to follow]" where an interactive visual will be added in a later phase.

For every placeholder:

- Show the exact text of the placeholder block.
- State which phase will replace it.
- Confirm the placeholder does not itself make any domain claim.

If the placeholder text makes a domain claim (e.g. it describes what the future visual will show), that claim must be listed in the domain claims section.

---

## Required report format

```
CONTENT_EVIDENCE_REVIEW — PASS / NEEDS FIX / FAIL

Files with content changes:
- [list files]

Metadata:
  id: ...
  number: ...
  title: ...
  summary: ...
  ready: ...
  updatedAt: ...
  changeType: ...
  changeSummary: ...

Exact text blocks:
  Block [n] — heading: "[heading or none]"
  Body:
  """
  [full body text verbatim]
  """

Exact stack / card content:
  Card [n] — [number]. [label] (colorClass: [class])
  Detail:
  """
  [full detail text verbatim]
  """
  Examples: [verbatim or "none"]
  Note (block level): [verbatim or "none"]

Exact matrix / comparison content:
  Row [n] — [label] (color: [hex])
  Column 1 ([header]): [verbatim]
  Column 2 ([header]): [verbatim]
  ...

Exact quiz content:
  Q[n]: [question verbatim]
  Options:
    0. [option text]
    1. [option text]
    2. [option text]
    3. [option text]
  Correct: index [n] — "[option text]"
  Explanation:
  """
  [full explanation verbatim]
  """

Exact visual captions / role labels / chips:
  Role [n] — [label]
  Caption:
  """
  [verbatim]
  """
  Chips: [list verbatim]

Placeholder text still visible:
  Block [n]: "[exact placeholder text]"
  Will be replaced in: Phase [n]
  Contains domain claim: Yes / No

Domain claims requiring human review:
  [n]. Claim: "[exact text]"
      Location: [block / field]
      Why flagged: [reason]

Content intentionally deferred:
  - [description and justification]

Verdict rationale:
  [PASS / NEEDS FIX / FAIL] — [specific reason]
```

---

## Example — PASS

```
CONTENT_EVIDENCE_REVIEW — PASS

Files with content changes:
- frontend/src/content/modules/25-swift-bank-gateway.ts

Metadata:
  id: swift-bank-gateway
  number: 25
  title: Inside a bank SWIFT gateway
  summary: The SWIFT estate is a controlled financial messaging layer...
  ready: false
  updatedAt: 2026-07-06
  changeType: new
  changeSummary: New concept page: SWIFT estate as controlled messaging layer. Static content. Interactive visual to follow.

Exact text blocks:
  Block 1 — heading: none
  Body:
  """
  The SWIFT estate is where financial messages become controlled, routed, evidenced and reportable bank obligations.

  In a large bank, the estate is more than a SWIFT connection. It operates as...
  """

  Block 2 — heading: none
  Body:
  """
  [The SWIFT estate switchboard — an interactive role-driven visual — will appear here in a future phase. The six roles and their layer dependencies are described in the stack below.]
  """

...

Placeholder text still visible:
  Block 2: "[The SWIFT estate switchboard — an interactive role-driven visual — will appear here in a future phase. The six roles and their layer dependencies are described in the stack below.]"
  Will be replaced in: Phase 3
  Contains domain claim: No

Domain claims requiring human review:
  1. Claim: "CHAPS · Bacs · TARGET services · SEPA-related services · CLS · CREST"
     Location: Stack card 02 (scheme-connector), examples field
     Why flagged: Named scheme and infrastructure connectivity examples — correctness depends on whether this bank uses SWIFT-connected access for each.

  2. Claim: "An ACK/NACK from the network confirms message processing status, not settlement finality. A gpi event updates tracking state, not settlement state."
     Location: Stack card 04 (controls-repair), detail field
     Why flagged: ACK/NACK and gpi finality claim — must be confirmed accurate.

...

Verdict rationale:
  PASS — all exact content is exposed; metadata is consistent; placeholders are listed; domain claims are flagged for human review.
```

---

## Example — FAIL

```
CONTENT_EVIDENCE_REVIEW — FAIL

Verdict rationale:
  FAIL — the phase completion report states "six stack cards describing the SWIFT roles were added and reviewed against SWIFT_BANKING_ACCURACY_REVIEW" but does not show the card text. The human reviewer cannot verify domain claims without reading the source file. Full evidence packet required before this phase can be approved.
```
