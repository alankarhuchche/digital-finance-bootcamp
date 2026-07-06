# AI Handoff Protocol

This repository uses a local handoff harness to preserve evidence between AI coding phases and reviewer phases.

## Roles

Claude writes phase reports. Claude must not commit, release, tag, publish, or otherwise ship changes.

The reviewer reads Claude phase reports and writes review responses with the next prompt. The reviewer should inspect the report evidence, answer the required review questions, and provide a fenced prompt block for the next phase when work should continue.

## Evidence Trail

The harness preserves phase evidence under `docs/ai-runs/<topic>/`.

- Claude reports are written to `claude-outbox/`.
- Review requests are written to `reviewer-inbox/`.
- Reviewer responses are written to `reviewer-outbox/`.
- Next prompts are written to `claude-inbox/`.

Review requests include the full report content so the reviewer sees exact evidence rather than summaries.

## Safety Rules

The harness is not allowed to release or commit automatically. It performs local file packaging, validation, prompt extraction, and status reporting only.

Human review is mandatory before any commit or release. AI output may guide the review, but it does not replace repository-owner judgment.

No AI co-author lines should be added to commits unless explicitly requested by the repository owner.

Stop conditions require human attention. If a report or reviewer response contains `FAIL`, `NEEDS FIX`, `WARN`, `do not commit`, or `human review required`, `handoff.py status` reports `STOP REQUIRED`.

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
