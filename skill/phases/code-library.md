---
name: code-library
description: Build or extend the design system in code from patterns.md, bottom-up -- tokens (colour, typography, spacing/radius/elevation), then atoms, molecules, organisms, templates -- confirming each level before the next, following the code-build-contract. The code counterpart to figma-library; run once before the first code-path design-handoff, especially where no component library exists yet (greenfield, or a brownfield product built on per-feature overrides).
---

# code-library

Goal: `design-handoff`'s code path composes screens from "existing components." Where none
exist — greenfield, or a brownfield product styled by one-off overrides — there's nothing to
compose from, and "build screens from components" quietly becomes "write the CSS inline."
This builds the library first.

## Prerequisite
- `patterns.md` with a firm §6 (canonical patterns). Greenfield also needs
  `design-direction.md`, **including its implementation-stack stage** — you can't build a
  library without knowing the framework and styling mechanism. If that stage is missing,
  send the designer back to `design-direction` for it.
- A **real local repo** — not the disposable `uxos-repo-cache/`. Clean working tree (ask
  before touching a dirty one) and a **new branch**.
- Greenfield with no repo yet: propose a minimal scaffold for the chosen stack and **show
  the exact commands first**; run them only on an explicit yes. Never scaffold or install
  anything silently.

Follow `code-build-contract` throughout; its rules are why this is built the way it is.

## Method
1. **Read the repo's conventions first** (brownfield): the styling mechanism, where each
   atomic level lives, an existing token file/theme, whether Storybook or similar exists.
   Follow them — don't introduce a second approach. Inventory what already exists and build
   only what's missing.
2. **Present the build scope by level** before writing a line: tokens (colour, typography,
   spacing/radius/elevation), atoms, molecules, organisms, templates — each item from
   `patterns.md` §6 flagged `exists` or `new`. The designer confirms or trims; they may not
   want every level in one pass.
3. **Build one level at a time, bottom-up, and confirm after each:**
   1. **Colour tokens**
   2. **Typography tokens** (families, scale, named text styles)
   3. **Spacing, radius, elevation tokens** (and iconography, if decided)
   4. **Atoms** — each with its variants and states, bound to the tokens, accessible by
      construction
   5. **Molecules** — composed from atoms only
   6. **Organisms** — composed from molecules and atoms
   7. **Templates** — page layouts arranging organisms, placeholder content
   After each, run the audit from `code-build-contract` on what was just written, fix
   findings, and show the designer before continuing — an unapproved atom propagates into
   everything built on it. Don't build the library unattended.
4. If Storybook (or an equivalent) already exists, give each atom/molecule/organism stories
   for its variants and the states from `screen-spec` / `edge-cases`. Don't introduce one
   uninvited.
5. **A piece found missing later** (by a screen-spec or a screen) is added here at its own
   level, with the levels beneath it confirmed to exist first.

*(Pages — real screens — aren't built here. `design-handoff`'s code path assembles them from
this library.)*

## Output
`uxos/handoff/code-library.md` from `templates/handoff.md` — `target: code`, `branch`
set, the Library levels table filled in (built / pending), and any **Overrides**. Then run
`next-steps`; it should point at `design-handoff` (code) for the first journey.
