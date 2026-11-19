#!/usr/bin/env python3
"""uxos smoke tests — run the key commands headless against the fixtures in tests/fixtures/
and check the behaviours that have broken before.

Each scenario copies a fixture to a temporary folder, runs one prompt with `claude -p`
against this repo's plugin, and checks: which files changed, which tools were used, and
what the reply says. Nothing in tests/fixtures/ is modified.

Needs the Claude Code CLI, logged in. Each scenario costs a little (see --budget), so this
runs by hand before a release, not in CI.

    python3 tests/smoke.py                 # all scenarios
    python3 tests/smoke.py init-asks-name  # one or more by name
    python3 tests/smoke.py --list
"""
import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PLUGIN = ROOT / "plugin"
FIXTURES = ROOT / "tests" / "fixtures"

LAYOUT_WORDS = r"(bottom sheet|full[- ]screen|overlay|modal|sticky|column|tab bar|drawer|side by side)"


def scenario(name, fixture, prompt, why, checks):
    return {"name": name, "fixture": fixture, "prompt": prompt, "why": why, "checks": checks}


# Checks are (kind, argument, description):
#   no_writes         — no file added or changed anywhere in the project
#   says / not_says   — regex (case-insensitive) that the final reply must / must not match
#   no_tool           — a tool-use name (or "Agent:<subagent>") that must not appear
#   question_free_of  — no line in the reply that ends in "?" may match this regex
SCENARIOS = [
    scenario(
        "init-asks-name",
        "empty",
        "/uxos:init",
        "0.34.0 — plain init asks one question at a time, project name first",
        [("no_writes", None, "nothing written"),
         ("says", r"(called|project name|name of the project)", "asks for the project name"),
         ("not_says", r"greenfield|brownfield", "no uxos jargon in the question")],
    ),
    scenario(
        "init-no-idea-stops",
        "empty",
        "/uxos:init\n\nThe user has answered in advance, so use these instead of asking: "
        "name: Pulse; role: product owner; it's a new product from scratch; and when asked "
        "about the idea the user says: \"I'm not sure yet, I just have the name\". Carry on "
        "from there; the user has said nothing else.",
        "0.34.1 — never guess the product from its name",
        [("no_writes", None, "nothing written"),
         ("says", r"(idea|describe|what .* is|who it'?s for)", "asks for the idea"),
         ("not_says", r"domain research (is )?(done|complete)|I('ve| have) researched", "no research from the name")],
    ),
    scenario(
        "init-shows-before-saving",
        "empty",
        "/uxos:init\n\nThe user has answered in advance, so use these instead of asking: "
        "name: Cabinly; role: product owner; new product from scratch; the idea: a website "
        "for booking holiday cabins for groups, and for the owners who rent them out — the "
        "problem it solves: groups can't tell whether a cabin really sleeps everyone, and owners "
        "get double bookings across listing sites; when you say back your understanding the user says \"yes, that's right\"; web; no "
        "documents; nothing to import; no mockups; Claude Design for screens; new to the "
        "industry; when you recap and ask to start, the user says \"yes\". Carry on from "
        "there; the user has said nothing else.",
        "0.34.1 — every file is shown and saved only on an explicit yes",
        [("no_writes", None, "nothing saved without a yes"),
         ("says", r"save", "asks to save the first file")],
    ),
    scenario(
        "status-greenfield-after-tbs",
        "greenfield-after-tbs",
        "/uxos:status",
        "0.34.3 / 0.35.0 — after to-be-solved: feature map next, competitors optional, no design direction",
        [("no_writes", None, "status writes nothing"),
         ("says", r"/uxos:blueprint", "suggests the feature map"),
         ("not_says", r"1\.\s*`?/uxos:design-direction", "design direction is not the next step")],
    ),
    scenario(
        "design-direction-too-early",
        "greenfield-after-tbs",
        "/uxos:design-direction",
        "0.34.3 — design direction waits for journeys and screen specs on greenfield",
        [("no_writes", None, "nothing written"),
         ("says", r"screen spec", "explains it comes after screen specs")],
    ),
    scenario(
        "blueprint-greenfield",
        "greenfield-after-tbs",
        "/uxos:blueprint",
        "0.35.0 — greenfield create builds from to-be-solved, no extractor, shows before saving",
        [("no_writes", None, "nothing saved without a yes"),
         ("no_tool", "Agent:context-extractor", "no product extractor on greenfield"),
         ("no_tool", "Agent:uxos:context-extractor", "no product extractor on greenfield"),
         ("says", r"save", "asks to save")],
    ),
    scenario(
        "screen-spec-no-layout-questions",
        "greenfield-after-journeys",
        "/uxos:screen-spec J1\n\nDraft the first screen and show it, then stop and wait.",
        "0.34.4 — screen specs ask what, never how it's laid out",
        [("no_writes", None, "nothing saved without a yes"),
         ("question_free_of", LAYOUT_WORDS, "no layout question asked in words"),
         ("says", r"to be decided at design|open layout question", "layout left open for the design step")],
    ),
    scenario(
        "brownfield-design-direction",
        "brownfield-improve",
        "/uxos:design-direction",
        "0.32.0 — design direction is greenfield or revamp only; improve keeps the design language",
        [("no_writes", None, "nothing written"),
         ("says", r"(/uxos:patterns|existing design language|revamp)", "points improve work elsewhere")],
    ),
]


def run_claude(workdir, prompt, budget):
    cmd = [
        "claude", "-p", prompt,
        "--plugin-dir", str(PLUGIN), "--add-dir", str(PLUGIN),
        "--permission-mode", "acceptEdits",
        "--max-budget-usd", str(budget),
        "--output-format", "stream-json", "--verbose",
    ]
    proc = subprocess.run(cmd, cwd=workdir, stdin=subprocess.DEVNULL,
                          capture_output=True, text=True, timeout=900)
    tools, texts = [], []
    for line in proc.stdout.splitlines():
        try:
            event = json.loads(line)
        except json.JSONDecodeError:
            continue
        if event.get("type") != "assistant":
            continue
        for part in event.get("message", {}).get("content", []):
            if part.get("type") == "tool_use":
                name = part.get("name", "")
                inp = part.get("input", {}) or {}
                tools.append(name)
                if name in ("Agent", "Task"):
                    tools.append(f"Agent:{inp.get('subagent_type', '')}")
            elif part.get("type") == "text":
                texts.append(part.get("text", ""))
    return tools, "\n".join(texts), proc.returncode, proc.stderr[-400:]


def changed_files(workdir):
    out = subprocess.run(["git", "status", "--porcelain", "--untracked-files=all"],
                         cwd=workdir, capture_output=True, text=True).stdout
    return [line[3:] for line in out.splitlines() if line.strip()]


def check(kind, arg, tools, reply, changes):
    if kind == "no_writes":
        return (not changes), ("changed: " + ", ".join(changes[:5])) if changes else ""
    if kind == "says":
        return bool(re.search(arg, reply, re.I)), ""
    if kind == "not_says":
        m = re.search(arg, reply, re.I)
        return (m is None), (f"found: {m.group(0)!r}" if m else "")
    if kind == "no_tool":
        return (arg not in tools), ""
    if kind == "question_free_of":
        bad = [l.strip() for l in reply.splitlines() if l.strip().endswith("?") and re.search(arg, l, re.I)]
        return (not bad), ("asked: " + bad[0][:120]) if bad else ""
    raise ValueError(kind)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("names", nargs="*", help="scenario names (default: all)")
    ap.add_argument("--budget", type=float, default=1.5, help="max USD per scenario (default 1.5)")
    ap.add_argument("--list", action="store_true", help="list scenarios and exit")
    ap.add_argument("--keep", action="store_true", help="keep the temporary project folders")
    args = ap.parse_args()

    if args.list:
        for s in SCENARIOS:
            print(f"{s['name']:34} {s['fixture']:26} {s['why']}")
        return 0
    chosen = [s for s in SCENARIOS if not args.names or s["name"] in args.names]
    if args.names and len(chosen) != len(args.names):
        print("unknown scenario(s):", set(args.names) - {s["name"] for s in chosen}); return 2
    if shutil.which("claude") is None:
        print("The claude CLI isn't on PATH."); return 2

    failures = 0
    for s in chosen:
        tmp = Path(tempfile.mkdtemp(prefix=f"uxos-smoke-{s['name']}-"))
        shutil.copytree(FIXTURES / s["fixture"], tmp, dirs_exist_ok=True)
        subprocess.run("git init -q . && git add -A && git -c user.name=smoke -c user.email=smoke@example.com commit -qm fixture",
                       shell=True, cwd=tmp, check=True)
        print(f"\n▶ {s['name']}  ({s['fixture']})\n  {s['why']}")
        tools, reply, rc, err = run_claude(tmp, s["prompt"], args.budget)
        changes = changed_files(tmp)
        if rc != 0 and not reply:
            print(f"  ✗ claude exited {rc}: {err.strip()}"); failures += 1; continue
        failed_here = 0
        for kind, arg, desc in s["checks"]:
            ok, detail = check(kind, arg, tools, reply, changes)
            print(f"  {'✓' if ok else '✗'} {desc}{('  — ' + detail) if detail else ''}")
            failed_here += 0 if ok else 1
        if failed_here:
            tail = reply.strip()[-700:].replace("\n", "\n    ")
            print(f"  reply ended with:\n    {tail}")
        failures += failed_here
        if args.keep:
            print(f"  kept: {tmp}")
        else:
            shutil.rmtree(tmp, ignore_errors=True)

    print(f"\n{'All scenarios passed.' if not failures else f'{failures} check(s) failed.'}")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
