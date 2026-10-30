---
description: List the product's journeys by name and let the user pick the key ones; write journey docs with flow steps and a diagram.
argument-hint: "[journey ids to mark key, e.g. J2 J3 J4]"
---

Manage the key-journey set for the current `uxos/` project.

## Steps

0. Run the `code-sync` skill in **check** mode — silent unless the repo has new commits
   since the last sync; then it offers to sync first.

1. Read `uxos/product-context.md` and any existing `uxos/journeys/*.md`. If `study-product`
   already produced a named journey list, use it; otherwise derive the list now (name only —
   no flow steps yet). Mapping flow steps for a live product means walking it, so run the
   `browser-preflight` skill first if a live URL is set.

2. Present the full list (id + name + auth needed + one-line intent). If `$ARGUMENTS` names
   ids, treat those as the key set; otherwise ask which are key for this engagement.

3. For each key journey without a doc, run the `map-journey-steps` skill → write
   `uxos/journeys/<id>--<slug>.md` (flow steps, `*(inferred)*` marks, a mermaid diagram,
   notes). Do not force the How/Why/Technical-delight enrichment.

4. Update `uxos/README.md` (steps-done table) and add any new gaps to `open-questions.md`.

5. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/journey.md`.
