---
name: build-blueprint
description: Create the feature map from scratch, or update an existing one with an approved new-feature-mapping or to-be-solved item — a surface -> feature area -> capability tree. Top-level surfaces map to user groups. Marks inferred / gated / proposed nodes. Interactive on update — presents the diff before writing. Writes uxos/blueprint.md (mermaid).
---

# build-blueprint

Goal: one tree that shows what the product is made of, so every later artifact (journeys,
matrix, problems, feature-mapping) has a stable set of nodes to point at.

## Which mode
- **create, brownfield** — no `uxos/blueprint.md` exists yet, and a product already exists.
  Build it fresh from the context-extractor's report and `product-context` (this is what
  `/uxos:init` runs).
- **create, greenfield** — no product exists yet to reverse-engineer. Build the initial tree
  from the **approved** (`yes`) items in `to-be-solved.md` instead — each approved theme or
  pain point suggests a surface/area/capability, grounded in what the designer actually
  confirmed, not speculative scope. Expect this tree to be sparse at first and grow as
  `journey-design` and `screen-specification` surface more capabilities — that's expected,
  not a gap to fill prematurely.
- **update** — a blueprint already exists and something needs to change: an approved
  `feature-mapping/<slug>.md` (its `Downstream` section names the node to add) or a
  `to-be-solved` item whose `response_type` touches the structure (`journey-redesign`,
  `escalate` with a structural consequence, etc.). Add or change only what the source names
  — don't restructure nodes it doesn't touch.

## Structure
Three levels:
1. **Surface** — a top-level area of the product. Where possible these map 1:1 to user
   groups (a citizen app, a crew app, an admin console). If the product is single-surface,
   the level-1 nodes are the major feature areas instead.
2. **Feature area** — numbered groups of capability within a surface.
3. **Capability** — an individual screen or function.

## Source of the tree, by platform
- **Web:** site structure + nav + routes.
- **Native app (repo):** the navigation graph — tab bars, nav stacks, drawers, deep links —
  is the surface/area skeleton; screen components are capabilities.
- **Native app (simulator/emulator walk or screenshots):** the screen inventory + observed
  transitions.
The tree shape (surface → area → capability) is the same regardless.

## Method — create, brownfield
1. From the extract's structure (per the source above) + the named journey list, lay out
   surfaces and areas.
2. Fill capabilities from observed screens/routes. Where a capability is only inferred
   (behind login, mentioned in policy, implied by a form field set), still include it but
   mark it.
3. Write a **confidence table**: which nodes are `observed`, which `inferred`.
4. Write a **structure note**: how the top level is organised, any parallel-mode split, any
   external hand-off.

## Method — create, greenfield
1. Surfaces usually map to the confirmed user groups from `capture-users` (one per group,
   or fewer if several groups share one surface).
2. Areas come from the approved `to-be-solved.md` themes or user-group pain-point clusters —
   each approved item's capability needs suggests an area; group related ones.
3. Capabilities stay minimal and provisional at this stage — this tree will be filled out
   properly as journeys get designed. Mark every node `(proposed)` in the confidence table;
   there is no `observed` tier on a greenfield project yet.
4. Write the structure note the same way — how the top level is organised, any surface split.

## Method — update
1. Read the source (`feature-mapping` or `to-be-solved` item) and the current
   `uxos/blueprint.md`.
2. Work out exactly which node(s) this adds or changes, and where — reuse the source's own
   placement decision (its blueprint-home stage) rather than re-deciding it.
3. **Present the diff** before writing: the new/changed node(s), marked `(proposed)`, in
   context — e.g. "add `D7` under `3. Reservation` — <one line>." Ask the designer to
   confirm, adjust the wording, or change where it attaches. Don't touch unrelated nodes.
4. On confirmation, update the tree, mark the new/changed node(s) `(proposed)` in the
   diagram label, and add a **Change log** row (what changed, source, date).

## Output
`uxos/blueprint.md` from `{{TEMPLATES}}/blueprint.md`. Use a mermaid
`flowchart TB`. Node ids stable and short (`B`, `B1`, `C2`…) — later artifacts cite them;
on update, keep existing ids unchanged and give new nodes the next free id in their branch.
Do not invent nodes to look complete; an honest partial tree is the goal. Then run
`next-steps`.
