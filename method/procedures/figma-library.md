---
name: figma-library
description: Build or update the Figma design-system file from patterns.md's canonical patterns, following atomic design bottom-up -- colour, then typography, then spacing/radius/elevation, then atoms, molecules, organisms, templates -- confirming each level before the next. Independent of any specific journey; run once as the product-wide base before per-journey design-handoff, or again when patterns.md's canonical section changes. Delegates to the figma-generate-library skill.
---

# figma-library

Goal: turn `patterns.md`'s **canonical patterns** (§6) and Figma-file plan (§7) into an
actual Figma design system — the shared base every later `design-handoff` Figma run builds
on, instead of each one guessing tokens fresh.

## Atomic order — the rule this whole procedure follows
Build strictly bottom-up. Each level is composed **only from instances of the level
beneath it**, and every colour, size, and space is **bound to a foundation variable** — no
raw hex values, no detached copies, no one-off pieces hiding inside a higher level. This is
what makes a later change to the primary colour or the button radius propagate everywhere
instead of needing hand-edits across forty screens.

1. **Foundations** — three stages, in this order:
   1. **Colour** — palette variables: primary, neutral ramp, semantic set, with named roles
      (not just values); light/dark modes if `design-direction` or patterns call for them
   2. **Typography** — font families, the size/weight/line-height scale, named text styles
   3. **Spacing, radius, elevation** (and iconography style, if decided)
2. **Atoms** — button, input, select, checkbox/radio/toggle, label, icon, link, badge/status
   chip, avatar, divider — each as a component with a proper variant set and states
3. **Molecules** — labelled form field, search bar, OTP input, list item, pagination —
   built from atom instances
4. **Organisms** — header/navigation, sidebar, data table with filters, card grid, form
   section, modal, stepper, footer — built from molecule and atom instances
5. **Templates** — page layouts arranging organism instances, with placeholder content

*(Pages — templates with real content — aren't built here. They're the screens
`design-handoff` produces from these templates, one per journey.)*

## Prerequisite
`patterns.md` must exist. If its canonical-patterns section is still thin or a direct copy
of the as-is foundations (i.e. nothing has actually been decided yet), say so and ask
whether to proceed with what's there or firm it up first — building a Figma file from an
undecided palette just relocates the inconsistency. On greenfield it also needs
`design-direction.md` behind it.

## Method
1. Confirm the Figma MCP connector is authorized. If not, tell the designer plainly (claude.ai
   connector settings, or `/mcp` in an interactive Claude Code session) and stop — don't
   attempt Figma actions without it.
2. Ask: an **existing** Figma file to add/update variables and components in (the brownfield
   default — most existing products already have *some* Figma presence), or a **new** file?
   For new, load `figma-create-new-file` first (its own mandatory prerequisite). If the file
   already has a partial library, inventory it first and build only what's missing — don't
   rebuild what exists.
3. **Present the build scope by level** before touching Figma: for each of the seven stages
   above, what will be built from `patterns.md` §6, each item flagged `existing pattern` or
   `new — no current equivalent`. Ask the designer to confirm the scope or trim it — they may
   not want every level built in one pass.
4. Load `figma-generate-library` alongside `figma-use`, and hand off one stage at a time.
   It owns *how* to build variables and variant sets correctly; this procedure owns *what
   and in what order*.
5. **Confirm after every stage — colour, typography, spacing/radius/elevation, atoms,
   molecules, organisms, templates.** After each, tell the designer to check it in Figma
   before continuing. Don't build the next level on a stage they haven't approved — an
   unapproved atom propagates into every molecule built from it. Don't build the whole
   library unattended.
6. **A missing piece found later is added at its own level** — if a journey or screen-spec
   needs an element the library lacks, name its atomic level, check the levels beneath it
   exist (a missing atom comes before the molecule that needs it), and add it here. Never
   draw it as a one-off in a screen.
7. Record the outcome — file link, which levels were built vs pending, any scope the
   designer deferred.

## Output
`uxos/handoff/design-system.md` from `{{TEMPLATES}}/handoff.md` — set `journey: design
system (foundations)`, and use the Library levels table for the seven stages instead of
screens. Then run `next-steps`; it should point at `design-handoff` for the first journey
now that the library exists.
