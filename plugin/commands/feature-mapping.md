---
description: Map where a new feature belongs — establish the driver, place it against the blueprint and journeys, run the conflict check. The add-feature objective's distinctive step.
argument-hint: "<feature name>"
---

Build a new-feature-mapping doc for `$ARGUMENTS`.

## Steps

0. Run the `code-sync` skill in **check** mode — silent unless the repo has new commits
   since the last sync; then it offers to sync first.

1. Read `uxos/blueprint.md`, `uxos/user-groups.md`, `uxos/personas/*.md`. Read
   `uxos/patterns.md` if it exists — if not, tell the user to run `/uxos:patterns` first,
   since placement and the conflict check both need it. Read `uxos/problems.md` if present
   (the request may cite a `PRB-` id).

2. Run the `new-feature-mapping` skill — **interactive, one stage at a time, not one pass**:
   - Stage 1: the **driver** — present the read (with numbered alternatives if more than one
     is plausible) and stop for confirmation.
   - Stage 2: the capability sketch — present and stop for confirmation.
   - Stage 3: placement — blueprint-home options + touchpoint table (`create` / `consume` /
     `manage`) — present and stop for confirmation.
   - Stage 4: the conflict check, naming any sub-driver it surfaces — present and stop.
   - Stage 5: the downstream summary (blueprint node, journeys → `proposed`,
     `response_type: new-feature`) — present and stop for final confirmation.

3. Only after stage 5 is confirmed, write `uxos/feature-mapping/<slug>.md`.

4. Tell the designer to run `/uxos:blueprint uxos/feature-mapping/<slug>.md` next, to
   actually add the confirmed node to the tree — this command only proposes the mapping, it
   doesn't edit the blueprint itself. Flag the affected journeys for `/uxos:journey-design`.

5. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/feature-mapping.md`.
