# AI Runs

This directory stores durable local handoff artifacts for AI-assisted coding phases.

Each topic keeps four mailboxes:

- `claude-outbox/` for phase reports from the coding agent.
- `reviewer-inbox/` for packaged review requests.
- `reviewer-outbox/` for reviewer responses and next instructions.
- `claude-inbox/` for extracted next prompts.

These files are an audit trail. They are not a substitute for human review before commit or release.
