---
artifact: product-pattern-study
project: <slug>
status: draft
confidence: <full | unauthenticated-only>
source: live DOM + computed styles / repo / design-system import / design-direction (greenfield)
coverage: <which pages/screens>
not_covered: <gated screens>
feeds: uxos-design (Part B) + Figma design-system file
---

# Product Pattern Study — <product name>

Organised by **atomic level**, bottom-up: foundations → atoms → molecules → organisms →
templates. Each level is composed only from the level beneath it, so an inconsistency low
down (a button styled three ways) explains the ones above it (every form that uses it).
Brownfield: extracted, not designed. Greenfield: §1-§5 are empty by design — nothing exists
to extract — and §6 is populated from `design-direction.md`.

Stack: <framework / libraries / observed approach>.

## 1. Foundations (as-is) — the design tokens
Colour first, then typography, then the rest. Everything above this level should resolve to
one of these values.
### 1.1 Colour
| Role (observed use) | Value | Where used |
|---|---|---|
### 1.2 Typography
- Families; the size/weight/line-height scale in use; roles (heading, body, caption,
  label); gaps in the scale.
### 1.3 Spacing
### 1.4 Radius
### 1.5 Elevation
### 1.6 Iconography & other
- Icon style/grid; breakpoints/grid; motion — only if observed.

## 2. Component inventory by atomic level (as-is)
Classify each component at the **highest level it is genuinely a single unit** — a search
bar is a molecule (label + input + button), not three atoms. Record what it is composed of,
so one-off pieces hiding inside a higher-level component show up.

### 2.1 Atoms — the smallest functional elements
Button, input, select, checkbox/radio/toggle, label, icon, link, badge/status chip, avatar,
divider…
| Atom | How it exists today | Variants / states seen | Notes / inconsistency |
|---|---|---|---|

### 2.2 Molecules — small groups of atoms acting together
Labelled form field (label + input + helper + error), search bar, OTP input, list item,
pagination…
| Molecule | Composed of (atoms) | States seen | Notes / inconsistency |
|---|---|---|---|

### 2.3 Organisms — distinct interface sections built from molecules/atoms
Header/navigation, sidebar, data table with filters, card grid, form section, modal,
stepper/wizard, footer…
| Organism | Composed of | States seen | Notes / inconsistency |
|---|---|---|---|

### 2.4 Templates — page-level layouts
Structure only, with placeholder content (list + detail, form page, dashboard, auth).
| Template | Organisms it arranges | Where used | Notes / inconsistency |
|---|---|---|---|

*(Pages — templates carrying real content — are the product's actual screens; they're not
inventoried here. They are what `design-handoff` produces.)*

## 3. Interaction & behavioural patterns (as-is)
- <mode switches, wizards/steppers, inline verification, validation, modals, etc.>

## 4. Terminology & content patterns (as-is)
- <word choices, casing conventions, raw domain terms surfaced>

## 5. Inconsistency register (actionable)
| # | Level | Inconsistency | Evidence | Related PRB |
|---|---|---|---|---|
| PAT-01 | foundation / atom / molecule / organism / template | <one line> | <computed styles / DOM> | PRB-<id> |

Fix order follows the levels: a foundation or atom inconsistency should be resolved before
the molecules and organisms built on it, or it gets baked in higher up.

## 6. Canonical patterns (brownfield: proposed · greenfield: decided in design-direction)
Defined in the same bottom-up order; each level may only use what's defined beneath it.
### 6.1 Colour — one primary, a semantic set, a neutral ramp, named roles
### 6.2 Typography — families, scale, weights, line-heights, named text styles
### 6.3 Spacing · radius · elevation — tokens, with the rule for when each applies
### 6.4 Atoms — one spec per atom: variants, states, token bindings
### 6.5 Molecules — one spec each, naming the atoms it is composed of
### 6.6 Organisms — one spec each, naming the molecules/atoms it is composed of
### 6.7 Templates — layout specs naming the organisms they arrange

## 7. Figma file plan (generate once connector is authorised)
Built bottom-up, confirmed level by level; no level may contain a detached copy of one
below it (instances only) or an unbound value (every colour, size, and space bound to a
§1 variable).
| Page | Contents |
|---|---|
| 1 · Foundations | colour variables → typography styles → spacing / radius / elevation variables |
| 2 · Atoms | atom components with variant sets, bound to the variables |
| 3 · Molecules | instances of atoms, composed |
| 4 · Organisms | instances of molecules/atoms, composed |
| 5 · Templates | page layouts arranging organism instances |
| 6 · Pages | real screens from `design-handoff` — existing (reference) and proposed |

## Confidence
<what was and wasn't reachable; gated screens whose patterns are unknown → open-questions.md>
