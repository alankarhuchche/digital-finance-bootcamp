# AI Runs

This directory stores durable local handoff artifacts for AI-assisted coding phases.

Each topic keeps four mailboxes:

- `claude-outbox/` for phase reports from the coding agent.
- `reviewer-inbox/` for packaged review requests.
- `reviewer-outbox/` for reviewer responses and next instructions.
- `claude-inbox/` for extracted next prompts.

Manual mode writes and reads these files locally. Optional API reviewer mode can read a packaged review request from `reviewer-inbox/`, write a review to `reviewer-outbox/`, and extract a PASS-only next prompt to `claude-inbox/`.

API reviewer mode requires `OPENAI_API_KEY` in the environment and is never automatic. Dry run is available:

```bash
python3 scripts/ai_handoff/reviewer_call.py --topic swift-gateway --phase 7 --dry-run
```

Generated run reports and mailbox contents are ignored by default:

- `docs/ai-runs/*/phase-*-report.md`
- `docs/ai-runs/*/claude-inbox/`
- `docs/ai-runs/*/claude-outbox/`
- `docs/ai-runs/*/reviewer-inbox/`
- `docs/ai-runs/*/reviewer-outbox/`

These files are an audit trail. They are not a substitute for human review before commit or release. Automation must not commit, release, tag, publish, or push changes.
