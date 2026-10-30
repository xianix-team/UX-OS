---
name: screen-specification
description: Turn a journey's steps into a full spec per screen it touches — entry points, sub-action items, screen-level controls (filters/sort/search), navigation/menu updates, and states — using the same How/Why/Technical-delight discipline as journey-design, applied to what surrounds the primary action rather than its sequence. Sits between journey-design and design-handoff; fixes "only the best case got designed."
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

Don't invent sub-actions, controls, or nav changes that have no real basis — if a screen
genuinely has none beyond the primary action, say so rather than padding the spec.

## Output
`uxos/screen-specs/<journey-id>.md` from `${CLAUDE_PLUGIN_ROOT}/templates/screen-spec.md`, one block per
screen. Then run `next-steps` — it should point at `design-handoff`, and note that
`design-handoff` will now build the full spec per screen, not just the primary path.
