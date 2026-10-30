---
description: Build or update the product's design system in Claude Design from patterns.md, bottom-up (tokens, atoms, molecules, organisms, templates), confirming each level. Run once before the first Claude Design handoff.
---

Build the Claude Design System for this project.

## Steps

1. Run the `claude-design-library` skill's availability check. If Claude Design isn't
   reachable in this session, say so and offer `/uxos:figma-library` or
   `/uxos:code-library` instead.

2. Read `uxos/patterns.md` (and `uxos/design-direction.md` on greenfield). If missing, point
   at `/uxos:patterns` (or `/uxos:design-direction`) first.

3. Read `design_master` in `uxos/product-context.md`. **`code`** → don't build by hand: ask
   the designer to run `/design-sync` in Claude Code (their command; it builds the system
   from the code library), then run `/uxos:mirror` to verify. **`claude-design`** → run the
   `claude-design-library` skill: present the scope by level, then build one stage at a
   time, confirming each with the designer.

4. Write `uxos/handoff/design-system.md`.

5. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/handoff.md`.
