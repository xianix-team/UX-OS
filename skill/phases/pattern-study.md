---
name: pattern-study
description: Capture the product's design patterns by atomic level, bottom-up -- foundations (colour, then typography, then spacing/radius/elevation), atoms, molecules, organisms, templates -- with an inconsistency register by level and canonical patterns in the same order. Brownfield extracts what exists; greenfield populates canonical patterns from design-direction.md since nothing exists to extract. Writes uxos/patterns.md.
---

# pattern-study

Goal: capture what patterns exist **today** so Part B proposals either reuse them or
deviate on purpose (brownfield) — or establish what they **will be** from a deliberate
decision instead of an extraction (greenfield). Either way the output is the same
`patterns.md` shape; everything downstream (`figma-library`, `design-handoff`) doesn't need
to know which path produced it.

## Organise by atomic level, always bottom-up
Atomic design: each level is composed only from the level beneath it.

1. **Foundations** — the design tokens. **Colour palette first, then typography**, then
   spacing, radius, elevation, iconography.
2. **Atoms** — the smallest functional elements: button, input, select, checkbox/radio/
   toggle, label, icon, link, badge/status chip, avatar, divider.
3. **Molecules** — small groups of atoms acting as one: labelled form field, search bar, OTP
   input, list item, pagination.
4. **Organisms** — distinct sections built from molecules and atoms: header/navigation,
   sidebar, data table with filters, card grid, form section, modal, stepper, footer.
5. **Templates** — page-level layouts that arrange organisms, with placeholder content.
6. *(Pages — templates with real content — are the product's actual screens. They aren't
   inventoried here; they are what `design-handoff` produces.)*

Work in this order even when the source gives you everything at once, because the order is
what makes the findings explain each other: an atom inconsistency (a Search button styled
three ways) is the *cause* of the molecule and organism inconsistencies above it.

## Greenfield — skip extraction, use `design-direction`
If no product exists yet, there is nothing to reverse-engineer. Don't attempt as-is
sections; state that plainly rather than leaving them silently blank. Check for
`uxos/design-direction.md` — if it doesn't exist, tell the designer to run
`design-direction` first; this step depends on it.
- **Foundations (§6.1-6.3)** come directly from its decisions: colour, typography, spacing/
  density, radius/elevation, iconography.
- **Atoms and molecules (§6.4-6.5)** — a standard starter set for the platform, shaped by
  the design philosophy, accessibility baseline, and platform convention stance. Mark
  `(proposed)`.
- **Organisms and templates (§6.6-6.7)** — provisional until journeys and screen-specs
  exist and reveal what's actually needed. List only what the approved `to-be-solved` scope
  clearly implies; mark `(proposed)`. Anything new that surfaces later is added at its
  proper level via `figma-library`, not drawn ad hoc.

## Extract (as-is) — brownfield only, by source, best first
- **Repo / design system (any platform):** read token / theme / style files (CSS vars,
  Tailwind config, `Theme.kt` / `Color.xml` / `styles.xml`, SwiftUI `Color`/`Font`
  extensions, RN/Flutter theme). Most precise. Read the UI layer's component directory to
  see how atoms compose into molecules and organisms — the import graph *is* the atomic
  hierarchy.
- **Figma** (if the connector is enabled): read variables / styles and the component set;
  published components and their nesting show the intended levels.
- **Live URL (web):** computed styles for base text, headings, every distinct button class
  combo, inputs/selects/textarea, nav, header — colour, background, font size/weight,
  line-height, border, radius, padding, box-shadow. Needs a browser — run
  `browser-preflight` first.
- **Simulator / emulator walk or screenshots (native, no repo):** measure colour, type size,
  spacing, corner radius, elevation **off the images** — mark every value `[measured ~]`,
  it is approximate.

Reduce whatever you have to distinct sets, level by level:
1. **Foundations:** colour palette (with the role each value plays), the type scale (families,
   sizes, weights, line-heights, roles), spacing rhythm, radius values, elevation.
2. **Atoms:** a table of each — how it exists today, variants/states seen, inconsistencies.
3. **Molecules / organisms / templates:** for each, what it is **composed of** — this is how
   one-off pieces hiding inside a higher-level component get caught (a "molecule" built from
   an atom that exists nowhere else).
4. **Interaction patterns:** mode switches, wizards/steppers (or their absence), inline
   verification, validation style, modals, dropdown patterns.
5. **Terminology & content:** word choices, casing conventions, raw domain terms in the UI.

## Inconsistency register
`PAT-01…`, one row per real inconsistency (multiple values for one role, same action styled
differently, control weight mismatches, mixed patterns), **tagged with its level**
(foundation / atom / molecule / organism / template) and linked to a related `PRB-` id where
one exists. Resolve in level order — foundation and atom problems first — or they get baked
into everything composed from them.

## Canonical patterns
Defined in the same bottom-up order, each level using only what's defined beneath it:
colour → typography → spacing/radius/elevation → atoms → molecules → organisms → templates.

**Brownfield:** recommend a coherent target from the as-is extraction: one primary colour +
semantic set + neutral ramp; a type scale with named roles; spacing tokens; two radii + a
rule; elevation tokens; then one spec per atom, molecule, organism, and template, each
naming what it is composed of. Mark these **proposed, not decided** — real design work is
Part B.

**Greenfield:** per the section above — foundations are decided in `design-direction`;
everything above them is a proposed starter set.

## Figma-file plan
The 6-page atomic plan: Foundations / Atoms / Molecules / Organisms / Templates / Pages —
built in that order by `figma-library`, with Pages populated later by `design-handoff`.

## Output
`uxos/patterns.md` from `templates/patterns.md`. State coverage honestly (e.g.
unauthenticated only); gated-screen pattern gaps → `open-questions.md`.
