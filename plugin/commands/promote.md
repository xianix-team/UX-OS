---
description: Greenfield — move the design master from Claude Design to code once the first canvases are approved. Translates the Claude Design System and approved screens into a code library and functional prototype, checks visual parity, then makes Claude Design mirror the code via /design-sync.
argument-hint: "[journey ids — default: all approved canvases]"
---

Promote the design from Claude Design to code. Journeys (optional): `$ARGUMENTS`.

## Steps

1. Read `uxos/product-context.md`. If `design_master` is already `code`, say so and offer
   `/uxos:mirror` instead. If it isn't `claude-design`, ask the designer what it should be.

2. Check the prerequisites from the `promote-to-code` skill: an approved canvas
   (`uxos/handoff/<journey>.md` with `status: approved`), the Claude Design System link in
   `uxos/handoff/design-system.md`, and the implementation stack in
   `uxos/design-direction.md`. Name whatever is missing and stop.

3. Run the `promote-to-code` skill: inventory and diff against `patterns.md` → promotion
   plan (**stop for confirmation**) → `code-library` level by level → the functional
   prototype per journey via `design-handoff` (code) → visual parity check → switch
   `design_master` to `code` → ask the designer to run `/design-sync` → verify with
   `design-mirror`.

4. Log the promotion in `uxos/handoff/design-system.md`.

5. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/handoff.md`.
