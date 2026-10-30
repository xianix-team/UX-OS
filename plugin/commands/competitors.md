---
description: Optional competitor analysis mapped onto the uxos model — direct, indirect, substitute, and analogous competitors; feature coverage against the blueprint (table stakes, differentiators, whitespace); live walk-throughs of your key journeys on 2-3 competitors; public review themes; implications for to-be-solved, feature-mapping, and journey design. Re-run to refresh.
argument-hint: "[competitor names or URLs — optional]"
---

Run a competitor analysis. Optional starting candidates: `$ARGUMENTS`.

## Steps

1. Read `uxos/` — `domain.md`, `product-context.md`, `journeys/`, `blueprint.md`,
   `to-be-solved.md`, `personas/` — whatever exists. If `uxos/competitors.md` already
   exists, this is a **refresh**: say so and follow the skill's refresh rule.

2. Run the `competitor-analysis` skill: frame (purpose, market, journeys in focus) →
   candidates by type, with deep dives picked — **stop for the designer's confirmation** →
   landscape and coverage matrix → deep dives (run `browser-preflight` first; read-only) →
   review themes → implications. Present the whole draft before writing.

3. Write `uxos/competitors.md` and `uxos/competitors/<slug>.md` per deep dive.

4. Offer each implication to the artifact it touches; apply only the ones accepted.

5. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/competitors.md`,
`${CLAUDE_PLUGIN_ROOT}/templates/competitor.md`.
