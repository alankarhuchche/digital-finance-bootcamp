#!/usr/bin/env python3
"""Repo-local AI handoff harness.

This tool intentionally uses only the Python standard library and writes only
deterministic docs/ai-runs paths.
"""

from __future__ import annotations

import argparse
import datetime as dt
import re
import sys
from pathlib import Path


DEFAULT_TOPIC = "swift-gateway"
RUNS_ROOT = Path("docs") / "ai-runs"
STOP_TERMS = (
    "FAIL",
    "NEEDS FIX",
    "WARN",
    "do not commit",
    "human review required",
)
REQUIRED_REPORT_PATTERNS = (
    ("Files changed", re.compile(r"files changed", re.IGNORECASE)),
    ("CONTENT_EVIDENCE_REVIEW", re.compile(r"CONTENT_EVIDENCE_REVIEW")),
    ("gate verdicts", re.compile(r"gate verdicts?", re.IGNORECASE)),
    ("type-check result", re.compile(r"type-?check result", re.IGNORECASE)),
    ("build result", re.compile(r"build result", re.IGNORECASE)),
    ("issues found", re.compile(r"issues found", re.IGNORECASE)),
    ("recommended commit message", re.compile(r"recommended commit message", re.IGNORECASE)),
    (
        "Source files modified / source files changed",
        re.compile(r"source files (modified|changed)", re.IGNORECASE),
    ),
)
REVIEWER_QUESTIONS = (
    "Did the report expose exact content, not summaries?",
    "Did all required gates run?",
    "Were WARN/FAIL items present?",
    "Were source files changed outside allowed scope?",
    "Is this safe to commit?",
    "What is the next prompt?",
)


def topic_dir(topic: str) -> Path:
    return RUNS_ROOT / topic


def phase_label(phase: int) -> str:
    if phase < 0:
        raise SystemExit("phase must be a non-negative integer")
    return f"phase-{phase:02d}"


def report_path(topic: str, phase: int) -> Path:
    return topic_dir(topic) / "claude-outbox" / f"{phase_label(phase)}-report.md"


def review_request_path(topic: str, phase: int) -> Path:
    return topic_dir(topic) / "reviewer-inbox" / f"{phase_label(phase)}-review-request.md"


def next_prompt_path(topic: str, phase: int) -> Path:
    return topic_dir(topic) / "claude-inbox" / f"{phase_label(phase)}-next-prompt.md"


def ensure_topic_dirs(topic: str) -> None:
    base = topic_dir(topic)
    for child in (
        base,
        base / "claude-outbox",
        base / "reviewer-inbox",
        base / "reviewer-outbox",
        base / "claude-inbox",
    ):
        child.mkdir(parents=True, exist_ok=True)


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except FileNotFoundError:
        raise SystemExit(f"required file not found: {path}") from None
    except OSError as exc:
        raise SystemExit(f"could not read {path}: {exc}") from None


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    try:
        path.write_text(content, encoding="utf-8")
    except OSError as exc:
        raise SystemExit(f"could not write {path}: {exc}") from None


def timestamp_utc() -> str:
    return dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat()


def cmd_init(args: argparse.Namespace) -> int:
    ensure_topic_dirs(args.topic)
    print(f"initialized handoff folders for topic: {args.topic}")
    return 0


def cmd_package(args: argparse.Namespace) -> int:
    ensure_topic_dirs(args.topic)
    src = report_path(args.topic, args.phase)
    report = read_text(src)
    dest = review_request_path(args.topic, args.phase)
    questions = "\n".join(f"- {question}" for question in REVIEWER_QUESTIONS)
    content = f"""# Review Request: {phase_label(args.phase)} / {args.topic}

- Phase: {args.phase}
- Topic: {args.topic}
- Timestamp: {timestamp_utc()}
- Source report path: {src}

## Required Reviewer Questions

{questions}

## Full Report Content

```markdown
{report}
```
"""
    write_text(dest, content)
    print(f"wrote review request: {dest}")
    return 0


def cmd_validate(args: argparse.Namespace) -> int:
    src = report_path(args.topic, args.phase)
    report = read_text(src)
    missing = [name for name, pattern in REQUIRED_REPORT_PATTERNS if not pattern.search(report)]
    if missing:
        print(f"validation failed for {src}", file=sys.stderr)
        for name in missing:
            print(f"- missing required section: {name}", file=sys.stderr)
        return 1
    print(f"validation passed: {src}")
    return 0


def extract_fenced_prompt(review: str) -> str | None:
    prompt_blocks = re.findall(
        r"```(?:prompt|text|markdown)?[ \t]*\n(.*?)\n```",
        review,
        flags=re.IGNORECASE | re.DOTALL,
    )
    for block in prompt_blocks:
        stripped = block.strip()
        if stripped:
            return stripped + "\n"
    return None


def cmd_write_next(args: argparse.Namespace) -> int:
    ensure_topic_dirs(args.topic)
    review_path = Path(args.from_review)
    review = read_text(review_path)
    prompt = extract_fenced_prompt(review)
    if prompt is None:
        print(
            f"no fenced prompt block found in {review_path}; expected a non-empty triple-backtick block",
            file=sys.stderr,
        )
        return 1
    dest = next_prompt_path(args.topic, args.phase)
    header = f"""# Next Prompt: {phase_label(args.phase)} / {args.topic}

- Phase: {args.phase}
- Topic: {args.topic}
- Timestamp: {timestamp_utc()}
- Source review path: {review_path}

## Prompt

"""
    write_text(dest, header + "```prompt\n" + prompt + "```\n")
    print(f"wrote next prompt: {dest}")
    return 0


def latest_file(folder: Path, pattern: str) -> Path | None:
    files = sorted(folder.glob(pattern))
    return files[-1] if files else None


def contains_stop_term(path: Path | None) -> bool:
    if path is None or not path.exists():
        return False
    text = read_text(path)
    lowered = text.lower()
    for term in STOP_TERMS:
        if term.isupper() and term in text:
            return True
        if not term.isupper() and term in lowered:
            return True
    return False


def format_latest(label: str, path: Path | None) -> str:
    return f"{label}: {path if path else 'none'}"


def cmd_status(args: argparse.Namespace) -> int:
    base = topic_dir(args.topic)
    latest_report = latest_file(base / "claude-outbox", "phase-*-report.md")
    latest_request = latest_file(base / "reviewer-inbox", "phase-*-review-request.md")
    latest_response = latest_file(base / "reviewer-outbox", "phase-*-review.md")
    latest_prompt = latest_file(base / "claude-inbox", "phase-*-next-prompt.md")
    stop_flag = base / "stop.flag"
    stop_required = stop_flag.exists() or contains_stop_term(latest_report) or contains_stop_term(latest_response)

    print(f"topic: {args.topic}")
    print(format_latest("latest Claude report", latest_report))
    print(format_latest("latest reviewer request", latest_request))
    print(format_latest("latest reviewer response", latest_response))
    print(format_latest("latest next prompt", latest_prompt))
    print(f"stop.flag exists: {'yes' if stop_flag.exists() else 'no'}")
    print(f"status: {'STOP REQUIRED' if stop_required else 'ok'}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Local AI handoff harness for durable phase reports and reviewer prompts."
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    init_parser = subparsers.add_parser("init", help="create handoff folders")
    init_parser.add_argument("--topic", default=DEFAULT_TOPIC, help=f"handoff topic (default: {DEFAULT_TOPIC})")
    init_parser.set_defaults(func=cmd_init)

    package_parser = subparsers.add_parser("package", help="package a Claude report for reviewer intake")
    package_parser.add_argument("--phase", type=int, required=True, help="phase number to package")
    package_parser.add_argument("--topic", default=DEFAULT_TOPIC, help=f"handoff topic (default: {DEFAULT_TOPIC})")
    package_parser.set_defaults(func=cmd_package)

    validate_parser = subparsers.add_parser("validate", help="validate required Claude report sections")
    validate_parser.add_argument("--phase", type=int, required=True, help="phase number to validate")
    validate_parser.add_argument("--topic", default=DEFAULT_TOPIC, help=f"handoff topic (default: {DEFAULT_TOPIC})")
    validate_parser.set_defaults(func=cmd_validate)

    next_parser = subparsers.add_parser("write-next", help="write the next Claude prompt from reviewer output")
    next_parser.add_argument("--phase", type=int, required=True, help="next phase number")
    next_parser.add_argument("--topic", default=DEFAULT_TOPIC, help=f"handoff topic (default: {DEFAULT_TOPIC})")
    next_parser.add_argument("--from-review", required=True, help="reviewer response file containing a fenced prompt")
    next_parser.set_defaults(func=cmd_write_next)

    status_parser = subparsers.add_parser("status", help="show latest handoff files and stop state")
    status_parser.add_argument("--topic", default=DEFAULT_TOPIC, help=f"handoff topic (default: {DEFAULT_TOPIC})")
    status_parser.set_defaults(func=cmd_status)

    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
