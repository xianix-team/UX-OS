---
description: Reverse-engineer the product pattern study — as-is tokens, components, states, terminology, an inconsistency register, and proposed canonical patterns.
---

Build or update `uxos/patterns.md` for the current project.

## Steps

1. Read `uxos/product-context.md` and any `uxos/ux-matrix/*.md` (for PRB cross-refs later).
   If this will use a live URL, run the `browser-preflight` skill first.

2. Run the `pattern-study` skill — organised by **atomic level**, bottom-up:
   - **Foundations first, in order:** colour palette → typography → spacing / radius /
     elevation / iconography. If a live URL is set, extract real computed styles via the
     browser; if a repo/design-system exists, read its tokens/theme files instead of /
     alongside. Reduce to distinct value sets.
   - Then classify every observed component by level — **atoms** (button, input, label,
     icon, chip…), **molecules** (labelled field, search bar, OTP input…), **organisms**
     (header, data table, modal, stepper…), **templates** (page layouts) — recording what
     each is composed of and the states seen.
   - Note interaction and terminology patterns.
   - Build the **inconsistency register** (`PAT-01…`) with a level column, linking each to
     a related PRB where one exists.
   - Propose **canonical patterns** in the same bottom-up order (greenfield: populated from
     `design-direction.md` instead of extracted).
   - Add the atomic Figma-file plan.

3. State coverage honestly (e.g. unauthenticated pages only); push gated-screen pattern
   gaps to `open-questions.md`.

4. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/patterns.md`.
