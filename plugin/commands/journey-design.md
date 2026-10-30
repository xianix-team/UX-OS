---
description: Create a new user journey or update an existing one, with each step's How / Why / Technical-delight detailed. Part B — run after a new-feature-mapping or an approved to-be-solved item.
argument-hint: "<journey id or name — new or existing>"
---

Design or revise the journey `$ARGUMENTS`.

## Steps

0. Run the `code-sync` skill in **check** mode — silent unless the repo has new commits
   since the last sync; then it offers to sync first.

1. Work out the mode:
   - if `uxos/journeys/<id>--<slug>.md` exists for this journey, this is **update** or
     **enrich** — read it first
   - otherwise this is **create** — check `uxos/feature-mapping/` for a matching
     new-feature-mapping to source the feature/personas/driver from
   - if unclear, ask the designer which mode this is

2. For **update**, also read `uxos/to-be-solved.md` (or the relevant `feature-mapping`
   file) to find the driving item and confirm which steps it actually changes.

3. Run the `journey-design` skill:
   - draft the full journey — Primary user goal, the Step / How / Why / Technical-delight
     table (Why tied to a real persona need where one exists; Technical delights checked
     against `uxos/patterns.md` first), Core Experience, and the flow diagram
   - present it as one complete draft and take corrections (or go step-by-step if the
     designer prefers)
   - set `state: proposed` (create/update) or keep `existing` (enrich), and add a change
     log row for updates

4. Write `uxos/journeys/<id>--<slug>.md`.

5. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/journey.md`.
