# AI Handoff Protocol

This repository uses a local handoff harness to preserve evidence between AI coding phases and reviewer phases.

## Roles

Claude writes phase reports. Claude must not commit, release, tag, publish, or otherwise ship changes.

The reviewer reads Claude phase reports and writes review responses with the next prompt. The reviewer should inspect the report evidence, answer the required review questions, and provide a fenced prompt block for the next phase when work should continue.

Reviewer work can happen in manual mode or in opt-in API reviewer mode. API reviewer mode is never automatic.

## Evidence Trail

The harness preserves phase evidence under `docs/ai-runs/<topic>/`.

- Claude reports are written to `claude-outbox/`.
- Review requests are written to `reviewer-inbox/`.
- Reviewer responses are written to `reviewer-outbox/`.
- Next prompts are written to `claude-inbox/`.

Review requests include the full report content so the reviewer sees exact evidence rather than summaries.

Generated run reports and mailbox contents are local handoff artifacts and are ignored by default:

- `docs/ai-runs/*/phase-*-report.md`
- `docs/ai-runs/*/claude-inbox/`
- `docs/ai-runs/*/claude-outbox/`
- `docs/ai-runs/*/reviewer-inbox/`
- `docs/ai-runs/*/reviewer-outbox/`
- `.claude/`

## Safety Rules

The harness is not allowed to release or commit automatically. It performs local file packaging, validation, prompt extraction, status reporting, and optional reviewer API calls only.

Human review is mandatory before any commit or release. AI output may guide the review, but it does not replace repository-owner judgment. Automation must not release, tag, publish, push, or commit changes.

No AI co-author lines should be added to commits unless explicitly requested by the repository owner.

Stop conditions require human attention. If a report or reviewer response contains `FAIL`, `NEEDS FIX`, `WARN`, `do not commit`, `human review required`, or `Human Review Required: Yes`, `handoff.py status` reports `STOP REQUIRED`.

## Manual Reviewer Mode

Manual mode uses only local files:

1. Claude writes a phase report to `docs/ai-runs/<topic>/claude-outbox/`.
2. `handoff.py package` creates a reviewer request in `reviewer-inbox/`.
3. A human or reviewer agent writes a response in `reviewer-outbox/`.
4. `handoff.py write-next` extracts a fenced prompt block into `claude-inbox/`.

Manual mode does not make network calls.

## API Reviewer Mode

API reviewer mode is opt-in and uses `scripts/ai_handoff/reviewer_call.py`.

Authentication comes only from the environment variable `OPENAI_API_KEY`. The key must never be written to config, committed, printed, or included in logs. If `OPENAI_API_KEY` is not set, API reviewer mode fails with a clear error.

Dry run does not call the API:

```bash
python3 scripts/ai_handoff/reviewer_call.py --topic swift-gateway --phase 7 --dry-run
```

Real API reviewer call:

```bash
OPENAI_API_KEY=... python3 scripts/ai_handoff/reviewer_call.py --topic swift-gateway --phase 7
```

For phase 7, the API reviewer reads:

```text
docs/ai-runs/swift-gateway/reviewer-inbox/phase-07-review-request.md
```

It writes:

```text
docs/ai-runs/swift-gateway/reviewer-outbox/phase-07-review.md
```

If the review verdict is `PASS` and includes a fenced `NEXT_PROMPT` block, the script extracts that block to:

```text
docs/ai-runs/swift-gateway/claude-inbox/phase-08-next-prompt.md
```

If the review contains `WARN` or `FAIL`, the review file is still written and the script exits with code 2. No next prompt should be emitted for `WARN` or `FAIL`.

## Basic Workflow

1. Initialize the topic folders:

   ```bash
   python3 scripts/ai_handoff/handoff.py init --topic swift-gateway
   ```

2. Claude writes a phase report:

   ```text
   docs/ai-runs/swift-gateway/claude-outbox/phase-04-report.md
   ```

3. Validate the report:

   ```bash
   python3 scripts/ai_handoff/handoff.py validate --phase 4 --topic swift-gateway
   ```

4. Package the report for reviewer intake:

   ```bash
   python3 scripts/ai_handoff/handoff.py package --phase 4 --topic swift-gateway
   ```

5. The reviewer writes:

   ```text
   docs/ai-runs/swift-gateway/reviewer-outbox/phase-04-review.md
   ```

   The response should include a fenced prompt block for the next phase.

6. Write the next prompt:

   ```bash
   python3 scripts/ai_handoff/handoff.py write-next --phase 5 --topic swift-gateway --from-review docs/ai-runs/swift-gateway/reviewer-outbox/phase-04-review.md
   ```

7. Check status:

   ```bash
   python3 scripts/ai_handoff/handoff.py status --topic swift-gateway
   ```
