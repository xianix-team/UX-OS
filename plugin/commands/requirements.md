---
description: Write a journey up as development Units — Who / Why / What / How with Given-When-Then acceptance criteria — the single handoff to engineering, QA, and AI-DLC agents.
argument-hint: "<journey id>"
---

Write the development Units for journey `$ARGUMENTS`.

## Steps

0. Run the `code-sync` skill in **check** mode — silent unless the repo has new commits
   since the last sync; then it offers to sync first.

1. Read `uxos/journeys/<id>*.md`. If it doesn't exist, tell the designer to run
   `/uxos:journeys` or `/uxos:journey-design` first.

2. Check the other sources and say which are missing: `screen-specs/<id>.md` (offer
   `/uxos:screen-spec`), `edge-cases/<id>.md` (offer `/uxos:edge-cases`). Both are
   non-blocking; missing ones are noted on the units and lower readiness.

3. Run the `requirements-drafting` skill:
   - Propose the slicing (unit titles + steps each covers) and wait for the designer's OK.
   - Then draft every unit in full and present the whole file at once; take corrections
     by unit id.

4. Write `uxos/requirements/<id>.md`.

5. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/requirements.md`.
