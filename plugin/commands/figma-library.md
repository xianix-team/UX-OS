---
description: Build or update the Figma design system from patterns.md, following atomic design bottom-up -- colour, typography, spacing/radius/elevation, then atoms, molecules, organisms, templates -- confirming each level before the next. Independent of any specific journey; run once before per-journey design handoff.
---

Build or update the Figma design-system file for the current project.

## Steps

1. Read `uxos/patterns.md`. If it doesn't exist, tell the designer to run `/uxos:patterns`
   first. If its canonical-patterns section (§6) is thin, flag that before proceeding. On
   greenfield it also needs `uxos/design-direction.md`.

2. Run the `figma-library` skill:
   - confirm the Figma connector is authorized; stop with instructions if not
   - ask existing file vs new (load `figma-create-new-file` first for new); inventory an
     existing file's library first and build only what's missing
   - present the build scope **by level** for confirmation: colour → typography →
     spacing/radius/elevation → atoms → molecules → organisms → templates
   - load `figma-generate-library` + `figma-use` and build **one stage at a time, bottom-up**,
     confirming with the designer before the next — each level composed only from instances
     of the one below, every value bound to a foundation variable, no detached copies

3. Write `uxos/handoff/design-system.md` (the Library levels table).

4. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/handoff.md`.

Note: needs the Figma MCP connector authorized in your own session, and benefits from the
`figma` plugin's skills being available — this command doesn't bundle them.
