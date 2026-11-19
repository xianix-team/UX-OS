# uxos tests

Smoke tests that run the key uxos commands headless against small made-up projects, and
check the behaviours that have broken before: nothing saved without a yes, the right next
step, no guessing from the project name, no product extractor on greenfield, no layout
questions asked in words, and so on.

## Run them

```bash
python3 tests/smoke.py            # all scenarios
python3 tests/smoke.py --list     # what each one checks, and why
python3 tests/smoke.py blueprint-greenfield screen-spec-no-layout-questions
```

They need the Claude Code CLI, logged in, and they cost a little each run (`--budget`, $1.50
per scenario by default). So they run **by hand before every release**, not in CI. CI runs
`scripts/check.sh` and the MCP server's tests, which are free.

Each scenario copies a fixture to a temporary folder first; nothing in `fixtures/` changes.
`--keep` leaves the temporary folders for inspection.

## Fixtures

| Folder | What it is |
|---|---|
| `empty/` | no project yet — for `/uxos:init` |
| `greenfield-after-init/` | a made-up holiday-cabin booking site: product context, a reviewed domain study, user groups, two personas |
| `greenfield-after-tbs/` | the same, plus an approved to-be-solved list |
| `greenfield-after-journeys/` | the same, plus a feature map and one approved journey |
| `brownfield-improve/` | a made-up team to-do app being improved: product context, one existing journey, patterns |

All data is made up. Never put a real client's project here — the repo is public.

## Adding a scenario

When something breaks, add a scenario that would have caught it — in `SCENARIOS` in
`smoke.py`: the fixture, the prompt, why it exists (the version that fixed it), and the
checks. If no fixture fits, add the smallest one that does.
