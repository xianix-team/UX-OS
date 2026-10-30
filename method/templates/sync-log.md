---
artifact: sync-log
project: <slug>
repo: <path or URL>
branch: <branch>
---

# Sync Log — <product name>

Append-only. One entry per `/uxos:sync` run; newest first. Every model change that came
from code is traceable to an entry here.

## <YYYY-MM-DD> — `<old-sha-7>..<new-sha-7>` (<n> commits, <n> skipped as noise)

| Kind | Found | Accepted | Rejected |
|---|---|---|---|
| Built | | | |
| Changed | | | |
| Partial | | | |
| New | | | |
| Removed | | | |

**Accepted:**
- <finding> — evidence `<sha>` / `<files>` / `<unit id>` → updated `<artifact>`

**Rejected / unclear** (copied to `open-questions.md`):
- <finding> — reason

**Artifacts changed:** <list>
