---
description: Elicit the visual design direction before any greenfield screen work -- philosophy, colour, typography, spacing, accessibility, iconography, platform stance. Stage-gated, confirmed at each step. Greenfield only.
---

Establish the design direction for this project.

## Steps

1. Read `uxos/domain.md` and confirmed `uxos/user-groups.md` / `uxos/personas/*.md` —
   decisions here are grounded in them. If they don't exist yet, tell the designer to run
   `/uxos:init` and `/uxos:capture-users`'s flow first.

2. Run the `design-direction` skill: walk stages 0-8 (already fixed, philosophy, colour,
   typography, spacing/density, accessibility baseline, iconography, platform stance,
   implementation stack — only if screens will be built as code) —
   present numbered options with a recommendation at each, confirm before the next stage.

3. Write `uxos/design-direction.md` only after the final stage is confirmed.

4. Run the `next-steps` skill — it should point at `/uxos:patterns` next.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/design-direction.md`.
