---
name: screen-specification
description: Turn a journey's steps into a full spec per screen it touches — entry points, sub-action items, screen-level controls (filters/sort/search), navigation/menu updates, states, and Composition (how the screen is arranged — shell, sections, meaningful element kinds) — using the same How/Why/Technical-delight discipline as journey-design, applied to what surrounds the primary action rather than its sequence. Sits between journey-design and design-handoff; fixes "only the best case got designed."
---

# screen-specification

Goal: a journey describes an ordered **sequence** of interactions. It does not describe
everything a **screen** needs — how the user gets there in the first place, the secondary
actions beside the primary one, filters/sort/search, whether a nav menu needs updating.
Design tools build exactly what they're given; if that's only the sequence, that's all that
gets designed. This procedure closes that gap before design-handoff, not during it.

## Prerequisite
The journey should be confirmed (`state: proposed` from `journey-design`, or `existing`
from `map-journey-steps`). `patterns.md` should exist — it's the source for the existing
nav model, so entry points and menu updates reuse it instead of inventing a new pattern.

## Identify the screens
From the journey's steps (and its `feature`/blueprint reference), work out which distinct
**screens** it touches — not one per step; several steps often land on the same screen.
Where the journey has an Actor/surfaces split, note which surface each screen belongs to.

## Ask about what, not how it looks
Questions to the user are about **what** each screen holds and does — what's on it, what
people do there, how they arrive, what happens when it's empty or fails — in plain words if
`user_role` isn't designer. How it's laid out is never asked in words (see Composition).

## For each screen, one at a time
Draft the full spec — present it, confirm with the designer, **then move to the next
screen**. Don't draft the whole journey's screens in one unconfirmed pass; each is a
meaningful enough chunk that rework should stay scoped to one screen at a time. This
mirrors `design-handoff`'s own one-screen-at-a-time rhythm, so nothing reaching design has
skipped a review.

For each screen:
- **Entry points** — how the user actually gets here (nav item, a link from another
  screen, a deep link). Ground this in `patterns.md`'s observed nav model.
- **Primary action** — reference the journey step(s) that land here; don't re-draft what
  `journey-design` already decided.
- **Sub-action items** — every secondary action that sits beside the primary one on this
  screen (edit, duplicate, delete, export, share, view details...). Each gets How / Why /
  Technical-delight, same as a journey step would.
- **Screen-level controls** — filters, sort, search, view toggles. Same treatment.
- **Navigation / menu updates** — does global or local nav need a new item, a badge, a
  count, because this screen/feature exists? If patterns.md shows an existing convention
  for this (e.g. how other sections show counts), reuse it.
- **States** — empty, loading, error. Cross-reference `edge-cases.md` for this journey if
  it exists; don't re-invent edge cases already found there.
- **Components, by atomic level** — which template, organisms, molecules, and atoms from
  `patterns.md` §6 this screen is built from, and whether each already exists in the
  library. Mark anything that doesn't as **missing** and name its level — it gets added
  (atoms before the molecules that need them) before `design-handoff` builds the screen,
  rather than being drawn as a one-off.
- **Composition** — how the screen is arranged, not just what is on it: the shell (content
  column, gutter, what sticks), the sections in order with their anchor ids, each section's
  arrangement, and any element whose *kind* carries meaning (a gate drawn as a diamond
  rather than a card, a label set as tracked type rather than a pill). Where an artboard
  exists, **read it and extract these** — do not describe it from memory. Where none exists
  yet, **don't ask arrangement questions in words** — "bottom sheet or full screen?",
  "sticky or not?", "one column or two?" can't be answered well before anything is drawn.
  Write `to be decided at design` and list each open choice under **Open layout questions**,
  so the design step settles it visually and nothing is decided silently. Only if the user
  wants to settle one now, draw the options as rough grey-box sketches side by side (one
  page, like a Crazy 8) and ask which works better. Never guess. Specimen
  frames, labels, and callouts on an artboard are annotation, not composition: leave them
  out, and ask if you can't tell which is which.

  This is the block that stops a faithful build from producing a screen with every correct
  element in the wrong arrangement. Everything else in this spec says *what must be there*;
  only this says *where*.

Don't invent sub-actions, controls, or nav changes that have no real basis — if a screen
genuinely has none beyond the primary action, say so rather than padding the spec. **A
finding in `domain.md` is a real basis**: grounded detail isn't padding.

## Domain grounding — per screen
Before drafting each screen, re-read `domain.md` (and `competitors.md`, validation findings,
business rules if they exist) and fill the screen's **Domain grounding** table: each finding
that bears on this screen, its source, and how the screen uses it — or why it doesn't apply.
This is what stops a screen being generic: the research said how information really reaches
these users, the terms they use, the limits they work within; the screen should show it.
Grounded ideas beyond the journey are offered as **Proposed — <idea> [from <source>]** for the
designer to accept or reject. A screen with an empty grounding table, where `domain.md` has
relevant findings, isn't finished.

## Output
`uxos/screen-specs/<journey-id>.md` from `templates/screen-spec.md`, one block per
screen. Then run `next-steps` — it should point at `design-handoff`, and note that
`design-handoff` will now build the full spec per screen, not just the primary path.

A screen spec with no Composition block is not finished. `design-handoff`'s code path
builds from it, and without it the arrangement is invented and then defended.
