---
description: Spec every screen a journey touches — entry points, sub-actions, filters/controls, nav updates, states, and how it is arranged (Composition) — before design-handoff. Fixes "only the best case got designed."
argument-hint: "<journey id>"
---

Spec the screens for journey `$ARGUMENTS`.

## Steps

0. Run the `code-sync` skill in **check** mode — silent unless the repo has new commits
   since the last sync; then it offers to sync first.

1. Read `uxos/journeys/<id>*.md`. If it doesn't exist, tell the designer to run
   `/uxos:journeys` or `/uxos:journey-design` first. Read `uxos/patterns.md` for the
   existing nav model (offer `/uxos:patterns` first if missing). Read
   `uxos/edge-cases/<id>.md` if it exists, for the States section.

2. Run the `screen-specification` skill: identify the distinct screens this journey
   touches, then draft each one's full spec — entry points, primary action (referenced,
   not re-drafted), sub-action items, screen-level controls, nav/menu updates, states,
   components, and **Composition** (shell, sections and their arrangement, meaningful
   element kinds, verbatim text). If the journey's handoff has a `claude_design_url` or a
   Figma file, read the artboards for Composition — don't describe them from memory;
   otherwise decide it with the designer or write `to be decided at design`.
   Present and confirm **one screen at a time**, not the whole set unconfirmed.

3. Write `uxos/screen-specs/<id>.md`.

4. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/screen-spec.md`.
