#!/usr/bin/env python3
"""Optional OpenAI API reviewer mode for the local AI handoff harness."""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any


DEFAULT_CONFIG = Path("scripts") / "ai_handoff" / "config.example.json"
DEFAULT_PROMPT = Path("scripts") / "ai_handoff" / "reviewer_prompt.md"
RUNS_ROOT = Path("docs") / "ai-runs"
OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses"


def phase_label(phase: int) -> str:
    if phase < 0:
        raise SystemExit("phase must be a non-negative integer")
    return f"phase-{phase:02d}"


def timestamp_utc() -> str:
    return dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat()


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


def load_config(path: Path) -> dict[str, Any]:
    try:
        return json.loads(read_text(path))
    except json.JSONDecodeError as exc:
        raise SystemExit(f"invalid JSON config {path}: {exc}") from None


def reviewer_request_path(topic: str, phase: int) -> Path:
    return RUNS_ROOT / topic / "reviewer-inbox" / f"{phase_label(phase)}-review-request.md"


def reviewer_output_path(topic: str, phase: int) -> Path:
    return RUNS_ROOT / topic / "reviewer-outbox" / f"{phase_label(phase)}-review.md"


def next_prompt_path(topic: str, phase: int) -> Path:
    return RUNS_ROOT / topic / "claude-inbox" / f"{phase_label(phase)}-next-prompt.md"


def byte_length_or_missing(path: Path) -> str:
    try:
        return str(len(path.read_bytes()))
    except FileNotFoundError:
        return "missing"
    except OSError as exc:
        return f"unreadable: {exc}"


def extract_response_text(response: dict[str, Any]) -> str:
    if isinstance(response.get("output_text"), str):
        return response["output_text"]

    parts: list[str] = []
    for item in response.get("output", []):
        if not isinstance(item, dict):
            continue
        for content in item.get("content", []):
            if not isinstance(content, dict):
                continue
            text = content.get("text")
            if isinstance(text, str):
                parts.append(text)
    if parts:
        return "\n".join(parts)

    raise RuntimeError("OpenAI response did not contain text output")


def call_openai(api_key: str, model: str, prompt: str, request_text: str, temperature: float, max_output_tokens: int) -> str:
    payload = {
        "model": model,
        "instructions": prompt,
        "input": request_text,
        "temperature": temperature,
        "max_output_tokens": max_output_tokens,
        "store": False,
    }
    data = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        OPENAI_RESPONSES_URL,
        data=data,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            body = response.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"OpenAI API request failed with HTTP {exc.code}: {detail}") from None
    except urllib.error.URLError as exc:
        raise RuntimeError(f"OpenAI API request failed: {exc.reason}") from None

    try:
        return extract_response_text(json.loads(body))
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"OpenAI API returned invalid JSON: {exc}") from None


def verdict_from_review(review: str) -> str | None:
    match = re.search(r"## Review Verdict\s*(?:\n|.){0,400}?\b(PASS|WARN|FAIL)\b", review, re.IGNORECASE)
    if match:
        return match.group(1).upper()
    match = re.search(r"\b(PASS|WARN|FAIL)\b", review, re.IGNORECASE)
    return match.group(1).upper() if match else None


def extract_next_prompt(review: str) -> str | None:
    patterns = (
        r"```NEXT_PROMPT[ \t]*\n(.*?)\n```",
        r"```prompt[ \t]*\n(.*?)\n```",
    )
    for pattern in patterns:
        match = re.search(pattern, review, flags=re.IGNORECASE | re.DOTALL)
        if match and match.group(1).strip():
            return match.group(1).strip() + "\n"
    return None


def write_next_prompt(topic: str, next_phase: int, review_path: Path, prompt: str) -> Path:
    dest = next_prompt_path(topic, next_phase)
    content = f"""# Next Prompt: {phase_label(next_phase)} / {topic}

- Phase: {next_phase}
- Topic: {topic}
- Timestamp: {timestamp_utc()}
- Source review path: {review_path}

## Prompt

```prompt
{prompt}```
"""
    write_text(dest, content)
    return dest


def cmd_run(args: argparse.Namespace) -> int:
    config_path = Path(args.config)
    config = load_config(config_path)
    prompt_path = Path(config.get("reviewer_prompt_path") or DEFAULT_PROMPT)
    prompt = read_text(prompt_path)
    input_path = reviewer_request_path(args.topic, args.phase)
    output_path = reviewer_output_path(args.topic, args.phase)
    model = str(config.get("model", "gpt-5.5"))
    temperature = float(config.get("review_temperature", 0))
    max_output_tokens = int(config.get("max_output_tokens", 4096))
    api_key_set = bool(os.environ.get("OPENAI_API_KEY"))

    if args.dry_run:
        print(f"input path: {input_path}")
        print(f"output path: {output_path}")
        print(f"model: {model}")
        print(f"prompt byte length: {len(prompt.encode('utf-8'))}")
        print(f"request byte length: {byte_length_or_missing(input_path)}")
        print(f"OPENAI_API_KEY set: {'yes' if api_key_set else 'no'}")
        return 0

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("OPENAI_API_KEY is not set. API reviewer mode cannot run.", file=sys.stderr)
        return 1

    request_text = read_text(input_path)
    try:
        review = call_openai(api_key, model, prompt, request_text, temperature, max_output_tokens)
    except RuntimeError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    write_text(output_path, review)
    verdict = verdict_from_review(review)
    if verdict in {"WARN", "FAIL"}:
        print(f"wrote review: {output_path}")
        print(f"review verdict: {verdict}")
        return 2
    if verdict != "PASS":
        print(f"wrote review: {output_path}", file=sys.stderr)
        print("review verdict was missing or not PASS/WARN/FAIL", file=sys.stderr)
        return 1

    next_prompt = extract_next_prompt(review)
    if next_prompt is None:
        print(f"wrote review: {output_path}", file=sys.stderr)
        print("PASS review did not include a fenced NEXT_PROMPT block", file=sys.stderr)
        return 1

    next_path = write_next_prompt(args.topic, args.phase + 1, output_path, next_prompt)
    print(f"wrote review: {output_path}")
    print(f"wrote next prompt: {next_path}")
    print("review verdict: PASS")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Opt-in OpenAI API reviewer for packaged AI handoff review requests."
    )
    parser.add_argument("--topic", required=True, help="handoff topic, for example swift-gateway")
    parser.add_argument("--phase", required=True, type=int, help="phase number to review")
    parser.add_argument("--config", default=str(DEFAULT_CONFIG), help=f"config path (default: {DEFAULT_CONFIG})")
    parser.add_argument("--dry-run", action="store_true", help="print resolved inputs without calling the API")
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    return cmd_run(args)


if __name__ == "__main__":
    raise SystemExit(main())
