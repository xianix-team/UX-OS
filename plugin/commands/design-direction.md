---
description: Set the visual design direction before any screen work on a greenfield product or a brownfield revamp -- for designers and non-designers alike. Optional mood board of your references, style tiles showing each direction on the product's own components, plain-language choices, and a record of who decided what. Stage-gated, confirmed at each step.
---

Establish the design direction for this project.

## Steps

1. Read `uxos/domain.md` and confirmed `uxos/user-groups.md` / `uxos/personas/*.md` —
   decisions here are grounded in them. If they don't exist yet, tell the designer to run
   `/uxos:init` and `/uxos:capture-users`'s flow first. Read `uxos/competitors.md` if it
   exists, for references.

2. **Is this the right step?** Greenfield: yes. Brownfield: only for a **revamp** — ask if
   unclear. Brownfield improve and add-feature keep the existing design language; say so
   and point to `/uxos:patterns` instead. On a revamp, `uxos/patterns.md` with its as-is
   extraction is needed first.

3. Ask **who is answering**: a designer, someone else (client, product owner, founder), or a
   workshop. Anyone who isn't a designer gets plain-language mode for every stage: no design
   terms without showing them, choices made on style tiles, technical details derived from
   the personas with a reason, and every decision marked `client`, `designer`, or `derived`.

4. Run the `design-direction` skill: on a revamp, keep / change / drop first → the optional
   mood board (references read, what they like about each, qualities extracted, conflicts
   asked about) → style tiles in `uxos/design-direction/style-tiles.html` → stages 0-8 (already fixed,
   philosophy, colour, typography, spacing/density, accessibility baseline, iconography,
   platform stance, implementation stack — only if screens will be built as code). At most
   three options at each, one recommended; confirm before the next stage. Never ask a
   client to choose a framework.
   **Before showing the tiles, check them:** each one is a real candidate, not a rejected
   option drawn to make a point; none looks like a named brand (no "exactly like Airbnb"
   tile, even as a counter-example — answer that in words); and the copy comes from the
   model or is neutral, with no invented features or claims.

5. Write `uxos/design-direction.md` only after the final stage is confirmed, including **In
   plain words** — the one-page summary to share after a workshop.

6. Run the `next-steps` skill — it should point at `/uxos:patterns` next.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/design-direction.md`.
