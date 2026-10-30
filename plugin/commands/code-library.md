---
description: Build or extend the design system in code from patterns.md, bottom-up -- tokens, atoms, molecules, organisms, templates -- confirming each level, held to the code-build-contract. The code counterpart to figma-library; run before the first code-path handoff, especially where no component library exists.
---

Build or extend the code design system for the current project.

## Steps

1. Read `uxos/patterns.md` (run `/uxos:patterns` first if missing; flag a thin §6). On
   greenfield also read `uxos/design-direction.md` — it must include the **implementation
   stack** stage; if not, send the designer back to `/uxos:design-direction` for it.

2. Needs a **real local repo** (not `uxos-repo-cache/`), a clean tree, and a **new branch**.
   Greenfield with no repo yet: propose a minimal scaffold for the chosen stack, show the
   exact commands, run them only on an explicit yes.

3. Run the `code-library` skill, held to `code-build-contract`:
   - read the repo's existing conventions first and follow them; inventory what exists
   - present the build scope **by level** for confirmation
   - build **one level at a time, bottom-up** — colour tokens → typography tokens →
     spacing/radius/elevation → atoms → molecules → organisms → templates — and after each
     run the audit, fix findings, and confirm with the designer before the next

4. Write `uxos/handoff/code-library.md` (Library levels, audit result, overrides).

5. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/handoff.md`.
