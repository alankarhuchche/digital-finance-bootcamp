# Claude working instructions

Before modifying this repository, read:

- `docs/ai-instructions/CONTENT_STYLE_GUIDE.md`
- `docs/ai-instructions/CONTENT_CHANGE_CHECKLIST.md`
- `docs/ai-instructions/VISUAL_EXPERIENCE_GUIDE.md`

For any content change, follow the style guide and checklist.

Do not add new pages, claims, facts, visuals, or glossary terms without checking whether they duplicate existing topics.

For content work, preserve the site positioning:

> Banking Rails to Digital Finance is an authored banking-practitioner reference. It is not a generic crypto explainer, course, wiki, vendor guide, or AI-generated content farm.

## Phased implementation — integration staleness

For any phased implementation, visual or content feature expansion, topic addition, or final QA, run `INTEGRATION_STALENESS_REVIEW` (see `docs/quality-gates/INTEGRATION_STALENESS_REVIEW.md`) before recommending commit.

A phase is not complete if metadata, comments, page order, labels, docs or registry entries still describe an earlier implementation state.

Do not report PASS for a phase unless stale language and metadata consistency have been checked.
