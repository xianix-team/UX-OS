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

### Composition

How the screen is arranged. Extracted by **reading the artboard** where one exists. Where
none exists yet, write `to be decided at design` and list the open choices below — they're
settled visually at the design step, never asked in words. A guess is never an answer.

**Open layout questions** — choices to settle by looking, at design (or now, on grey-box sketches)
| Question | Options | Settled |
|---|---|---|
| <e.g. Share summary: how does it open?> | <bottom sheet · full screen> | <open — or the choice, and where it was seen> |

**Shell** — state once per journey, per artboard; note it if artboards disagree
| | |
|---|---|
| Content column | <width>, gutter <n> <inside \| outside> it |
| Sticky | <what sticks, and its height — not "the header" unless the whole header sticks> |
| Narrow (<breakpoint>) | <what changes> |

**Sections**, in order, with their anchor ids — ids are nav contract
| # | id | Arrangement | Notes |
|---|---|---|---|
| 1 | `<id>` | <single column \| two columns, <left> / <right> \| band of N \| fixed chart> | <why, where the arrangement carries meaning> |

**Element kinds that carry meaning** — only where the shape *is* the argument
| Element | Kind | Why not the obvious thing |
|---|---|---|

**Verbatim** — text the design quotes rather than describes
<each quoted string, exactly; cite its `BR-<n>` where a business rule fixes it>

---

## Summary
<screens covered; any left unspecified and why — e.g. an existing screen needing no changes>
