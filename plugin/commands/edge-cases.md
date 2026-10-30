---
description: Systematically enumerate a journey's edge cases (input/data, state/timing, actor/permission, system/network, cross-surface handoff, accessibility/device) with proposed handling and severity. Works on existing or proposed journeys. Never auto-run — a suggested step, not a forced one.
argument-hint: "<journey id>"
---

Analyse edge cases for journey `$ARGUMENTS`.

## Steps

1. Read `uxos/journeys/<id>*.md`. If it doesn't exist, tell the designer to run
   `/uxos:journeys` (existing) or `/uxos:journey-design` (proposed) first.

2. Run the `edge-case-analysis` skill: walk each category in the template against this
   journey's actual steps, draft candidates with affected step, estimated severity, and
   proposed handling (or `needs decision`). Present the whole draft at once — not gated
   category by category. Skip categories that genuinely don't apply; don't pad them.

3. Write `uxos/edge-cases/<id>.md`.

4. Note the routing for `open` items:
   - `state: existing` journey → candidates for `/uxos:problems`
   - `state: proposed` journey → `needs decision` items into `open-questions.md`; resolved
     ones back into the journey via `/uxos:journey-design` before `/uxos:design`

5. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/edge-cases.md`.
