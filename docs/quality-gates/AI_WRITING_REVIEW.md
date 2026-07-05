# AI Writing Review

## Purpose
Detect AI-written, generic or weak prose before it enters the site. This gate protects the site's positioning as an authored banking-practitioner reference, not a generated content article.

## When to use
- At the end of any phase that adds or edits body copy, cards, captions, headings, quiz questions or glossary entries.
- Before committing any content change to the main branch.
- When reviewing a draft written by AI assistance before approving it for use.

---

## Pass criteria

Content passes this gate when it:

- Uses plain English sentences that a senior banking reader would write.
- Has short paragraphs — one to three sentences each.
- Uses specific nouns: named rails, named actors, named mechanisms.
- States claims directly without hedging unnecessarily.
- Avoids hype words entirely.
- Is easy to scan: headings lead clearly, cards are concise.
- Would not embarrass a practitioner if shown to a risk committee or regulator.

---

## Fail criteria

Content fails this gate when it:

- Uses em dashes to create dramatic rhythm ("payments are not just fast — they are instant").
- Uses "not just X, but Y" construction repeatedly.
- Uses semicolon-heavy compound sentences.
- Uses colon fragments as if listing is a substitute for explanation.
- Uses generic consultancy phrases ("navigate the evolving landscape", "leverage the potential").
- Uses hype words: transformative, unlock, seamless, robust, game-changing, revolutionary, comprehensive, ecosystem (unless technically precise).
- Uses vague transformation language ("this changes everything", "a new paradigm").
- Has long paragraphs (more than four or five sentences) without structure.
- Has repetitive sentence starts across consecutive paragraphs.
- Sounds like an explainer article rather than a practitioner reference.
- Uses passive voice when an actor can be named.
- Uses "this matters because" more than once.
- Opens with an affirmation ("Great news:", "As we know", "It is well established that").

---

## Review checklist

Work through this checklist for every content section:

- [ ] Count em dashes per 200 words. More than two is a flag.
- [ ] Search for "not just" and "but also". Remove both.
- [ ] Count semicolons per paragraph. More than one per paragraph is a flag.
- [ ] Check every heading. Does it state a claim or name a concept, or is it a vague category label?
- [ ] Check every card or caption. Is it one or two sentences? Does it teach something specific?
- [ ] Search for: transformative, unlock, seamless, robust, game-changing, revolutionary, comprehensive. Delete each one.
- [ ] Read two consecutive paragraphs aloud. Do they start differently?
- [ ] Check the opening sentence. Does it state the point directly?
- [ ] Check the closing sentence of each section. Does it land a specific point or trail off?
- [ ] Would a senior banking technologist find this embarrassing to share?

---

## Example red flags

**Fail — AI rhythm:**
> Payments are not just a technical process — they are the backbone of trust between financial institutions, seamlessly connecting payer and payee across complex settlement layers.

**Pass — practitioner voice:**
> A domestic payment instruction travels through authorisation, scheme messaging, settlement and reconciliation. The customer sees one event; the bank processes several.

---

**Fail — generic consultancy:**
> As the digital finance ecosystem continues to evolve, banks must navigate the transformative potential of DLT and stablecoin infrastructure to unlock new settlement efficiencies.

**Pass — direct claim:**
> DLT is useful in specific settlement contexts. It does not replace bank accounting, custody or reconciliation, and it does not automatically provide legal finality.

---

**Fail — em-dash drama:**
> Old rails are not disappearing — they are modernising. And this modernisation — through ISO 20022, faster payments, and RTGS upgrades — is already underway.

**Pass — plain:**
> Old rails are modernising through ISO 20022 and real-time settlement upgrades. They remain the default for the majority of payment volume.

---

## Required report format

After completing this review, report:

1. Sections reviewed.
2. Number of em dashes found and removed.
3. Hype words found and removed.
4. Structural patterns flagged (semicolons, not-just-but-Y, repetitive starts).
5. Paragraphs rewritten or shortened.
6. Pass or fail verdict with reason.
7. Any sections that required significant rewrite.
