---
artifact: screen-spec
project: <slug>
journey: J<n> — <journey name>
status: draft
---

# Screen Specs — J<n> <journey name>

For every **screen** this journey touches — not just the primary path. One block per
screen. Entry points, sub-actions, controls, and nav updates all use the same How / Why /
Technical-delight discipline as the journey itself, applied to what surrounds the primary
action rather than the sequence of it.

## Screen: <screen name> (blueprint node `<id>`)

### Entry points
| How the user gets here | Why (from where / what triggers it) | Technical delight |
|---|---|---|
| <e.g. "Bookings" nav item> | <...> | <...> |
| <e.g. link from the confirmation screen> | <...> | <...> |

### Primary action
<inherited from the journey's step(s) that land on this screen — reference the step
number(s), don't re-draft what `journey-design` already decided.>

### Sub-action items
| Sub-action | How the user would do it | Why the user would do it | Technical delight |
|---|---|---|---|
| <e.g. Edit> | | | |
| <e.g. Duplicate> | | | |
| <e.g. Delete> | | | |

### Screen-level controls
| Control | How | Why | Technical delight |
|---|---|---|---|
| <e.g. status filter, sort, search, view toggle> | | | |

### Navigation / menu updates
<does global or local nav need a new item, badge, or count because of this screen/feature?
Cite `patterns.md`'s nav model — reuse the existing pattern, don't invent a new one.>

### States
<empty / loading / error — cross-reference `edge-cases.md` if it exists for this journey>

### Components (by atomic level)
| Level | Component | In the library? |
|---|---|---|
| template | <page layout this screen uses> | yes / **missing — add via `figma-library`** |
| organism | <e.g. data table with filters> | |
| molecule | <e.g. labelled field> | |
| atom | <e.g. status chip> | |

Anything marked missing gets added at its own level — an atom before the molecule that needs
it — before `design-handoff` builds the screen, so nothing is drawn as a one-off.

---

## Summary
<screens covered; any left unspecified and why — e.g. an existing screen needing no changes>
