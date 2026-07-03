# Content Change Checklist

Use this checklist for every content change.

## Before editing

- Identify whether this is:
  - a new topic
  - an expansion of an existing topic
  - a glossary update
  - a cross-reference only
  - a visual/diagram change
- Check whether the topic already exists elsewhere.
- Avoid creating a new page if an existing page can absorb the content cleanly.
- Keep the site below unnecessary sprawl.

## During editing

- Use existing block types before creating new ones.
- Prefer matrix, comparison, flow, callout, timeline and scale blocks where they genuinely improve understanding.
- Do not add a visual for decoration.
- Keep visual labels short.
- Keep glossary entries concise.
- Add cross-references instead of duplicating explanations.

## Required metadata

For meaningful content changes, update topic metadata:

```ts
updatedAt: 'YYYY-MM-DD'
changeType: 'new' | 'expanded' | 'updated'
changeSummary: 'Short factual summary of what changed.'
```

Rules:

- Use `new` only for new topics.
- Use `expanded` for substantial new sections.
- Use `updated` for editorial fixes or small changes.
- Do not mark planned work as updated.
- Do not exaggerate the change summary.

## Content quality test

Each new or expanded section must pass at least one of these tests:

- clarifies liability
- clarifies settlement or finality
- clarifies liquidity
- clarifies reconciliation
- clarifies regulation
- clarifies operational risk
- clarifies compliance controls
- clarifies market structure
- clarifies bank operating model

If it passes none, remove or rewrite it.

## Current-fact test

For current facts, check:

- Is the source reputable?
- Is the date clear?
- Is the claim still current?
- Is it announced, live, piloted or proven at scale?
- Are numbers dated?
- Are caveats clear?

Do not use unsupported numbers.

## AI-tone check

Remove or rewrite:

- hype
- vague conclusions
- repeated "this matters because"
- "not just X, but Y"
- excessive em dashes
- generic consultancy phrases
- long bullet lists with no judgement
- synthetic-sounding summaries

## Duplication check

Before committing, search for overlapping terms across existing topics.

High-risk duplication areas:

- Stablecoins vs Stablecoin Market Structure
- DLT Basics vs DeFi
- Regulation vs AML/Sanctions/Travel Rule
- Privacy vs Digital Identity
- Deposit Tokens vs Tokenisation
- Market Sizing vs Global Initiatives

Use cross-references instead of repeating full explanations.

## Verification

Run:

```bash
cd frontend
npx tsc --noEmit
npx vite build
```

Manual check:

- homepage
- changed topic page
- sidebar
- topic card badge
- Recently updated strip
- mobile layout
- glossary if touched
- no broken term-help HTML
- no console errors

## Report format

Report:

1. Files changed.
2. Content changed.
3. Metadata changed.
4. Sources used, if any.
5. Visuals changed.
6. Glossary terms changed.
7. Duplication risks checked.
8. Build/test result.
9. Manual verification.
10. Recommended commit message.
