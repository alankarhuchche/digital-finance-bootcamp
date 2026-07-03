# Backlog

Future enhancements for Banking Rails to Digital Finance.

Items are not prioritised relative to each other. Each item is a scoped proposal, not a commitment.

---

## Weekly Digital Finance Research Update Agent

**Status:** Backlog / future enhancement

### Objective

Add a scheduled weekly research workflow that scans reputable public sources for relevant updates in payments, stablecoins, DLT, tokenisation, digital assets regulation, privacy, compliance, fraud, AML, sanctions and market structure.

The workflow should not directly update production content. It should produce a reviewed content-update proposal, research report or pull request that follows the site's content style guide, source discipline and AI content checks.

### Why this matters

The site covers fast-moving areas. Stablecoins, Open USD, UK regulation, CARF, DLT platforms and digital-asset market structure can become stale quickly.

A weekly update agent would help keep the site current without turning it into an unreviewed AI-generated content feed.

### Desired behaviour

Once per week, at a configured time, the system should:

1. Search approved sources.
2. Identify relevant updates.
3. Classify updates by affected topic.
4. Verify facts against reputable sources.
5. Reject weak, promotional or unsourced claims.
6. Propose content changes only where needed.
7. Apply the repo's content style and change checklist.
8. Update topic metadata where appropriate:
   - `updatedAt`
   - `changeType`
   - `changeSummary`
9. Add or update glossary terms where appropriate.
10. Run build checks.
11. Create a pull request or draft change report.
12. Require human approval before merge/deploy.

### Non-goals

The workflow must not:

- silently update production,
- publish directly to Cloud Run,
- rewrite entire topics unnecessarily,
- add hype content,
- add unsupported market numbers,
- use low-quality crypto blogs as primary evidence,
- turn the site into a news feed,
- bypass human review.

### Approved source categories

Prefer:

- regulators,
- central banks,
- standards bodies,
- official project documentation,
- reputable financial press,
- major payment network publications,
- listed company disclosures,
- audited or attested transparency reports.

Examples:

- Bank of England
- FCA
- HM Treasury
- Payment Systems Regulator
- HMRC
- OECD
- FATF
- BIS
- Circle transparency pages
- Tether transparency pages
- PayPal official PYUSD material
- Ripple official RLUSD material
- Ethereum documentation
- Solana documentation
- Hyperledger Besu documentation
- Canton Network documentation
- Reuters
- Financial Times, if accessible
- company investor relations pages

### Update categories

The agent should classify findings as:

- regulatory update
- market-size update
- stablecoin issuer update
- DLT platform update
- compliance / AML / sanctions update
- privacy / confidentiality update
- glossary update
- broken or stale claim
- no action required

### Risk controls

Every proposed change must include:

- source link,
- source date,
- claim being changed,
- affected topic,
- confidence level,
- reason for update,
- old wording,
- proposed wording,
- caveats,
- whether human judgement is required.

The agent must distinguish:

- announced
- proposed
- consultation
- pilot
- live
- production-scale
- discontinued
- deprecated

### Content quality gates

Before proposing a PR, the workflow must check:

- `CLAUDE.md`
- `docs/ai-instructions/CONTENT_STYLE_GUIDE.md`
- `docs/ai-instructions/CONTENT_CHANGE_CHECKLIST.md`

The proposed content must pass:

- AI-tone check,
- banking relevance check,
- duplication check,
- source discipline check,
- metadata check,
- glossary check,
- build check.

### Suggested implementation options

**Option A: GitHub Actions scheduled workflow**

Use GitHub Actions with a weekly cron schedule.

Pros:

- native to repo,
- creates PRs naturally,
- clear audit trail,
- easy to review before merge.

Cons:

- needs safe handling of search/API credentials,
- source fetching and AI review need careful design,
- poor prompt design could create noisy PRs.

**Option B: Cloud Scheduler + Cloud Run job**

Use Google Cloud Scheduler to trigger a Cloud Run job weekly.

Pros:

- fits current GCP deployment model,
- stronger operational logging,
- can use service accounts and Secret Manager.

Cons:

- more infrastructure,
- PR creation still needs GitHub integration,
- higher operational overhead than a repo-native workflow.

**Option C: Manual research command first**

Start with a local/manual command that generates a weekly research report.

Pros:

- safest MVP,
- validates value before automation,
- no risk of noisy PRs,
- easier to tune source quality and topic classification.

Cons:

- not fully automated.

### Recommended MVP

Start with Option C, then move to Option A.

MVP workflow:

1. Run a command manually:
   ```
   npm run research:update-report
   ```
2. The command produces:
   ```
   docs/research-updates/YYYY-MM-DD-weekly-update.md
   ```
3. Human reviews the report.
4. If useful, a second command or manual process creates a draft PR.
5. Later, automate the first step weekly using GitHub Actions.

### Future architecture

Possible components:

- source allowlist,
- search/fetch layer,
- claim extractor,
- topic classifier,
- source verifier,
- content proposal generator,
- AI-tone reviewer,
- duplication checker,
- glossary checker,
- metadata updater,
- PR creator,
- human approval gate.

### Acceptance criteria for future delivery

- Weekly job runs on schedule.
- No production auto-publish.
- Sources are listed and dated.
- Proposed changes are small and reviewable.
- Human approval is required.
- Build passes before PR.
- Topic metadata is updated correctly.
- "Recently updated" reflects approved changes only.
- Unsupported claims are rejected.
- AI-style content is not introduced.

### Open design questions

Before implementation, decide:

1. Which source list is allowed for automated scans?
2. Which model/tool performs research and source verification?
3. Should the MVP create only a report, or also a draft PR?
4. Who approves updates before merge?
5. How should stale claims be flagged without automatically rewriting them?
6. How should paywalled sources be handled?
7. What weekly schedule should be used?
8. Should the workflow run in GitHub Actions or GCP after the manual MVP proves useful?
