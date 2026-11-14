---
name: journey-design
description: Create a new user journey or update an existing one in full detail — each step described as How the user would do it (the interaction), Why (the rationale, tied to a persona need/goal/pain), and Technical delights to ease pain (grounded in existing patterns where possible). The (create|change|update) User Journeys step of the solve loop, following a new-feature-mapping or a to-be-solved journey-improvement/journey-redesign item.
---

# journey-design

Goal: produce (or revise) one journey to the full designed level of detail — not just the
step order, but the reasoning behind each step and how the product should make it easier.
This is design work, not observation: it belongs to Part B, after a driver already exists
(a `new-feature-mapping`, or a `to-be-solved` item with `response_type: journey-improvement`
or `journey-redesign`).

## Which mode
Determine from context, or ask:
- **create** — a brand-new journey (a `new-feature-mapping` named one, or greenfield)
- **update** — an existing journey (`uxos/journeys/<id>--<slug>.md`, `state: existing`)
  changes because of an approved to-be-solved item
- **enrich** — an existing journey already has correct steps; just add the How / Why /
  Technical-delight reasoning without changing the flow itself

For **update**, read the current file first and identify which steps are added, removed, or
changed, and cite the driver (the `PRB-` id, `to-be-solved` row, or `feature-mapping` slug)
before drafting anything. Don't silently rewrite steps the driver doesn't touch.

## Single actor, or crosses actors/surfaces?
If every step is performed by the same persona on the same surface, use the plain
Step/How/Why/Technical-delight table. If the journey hands off between actors — a customer
request that continues in an admin panel and comes back to the customer, for example — use
the **Actor** column variant, naming the persona + surface for each step, and set the
journey's `surfaces` frontmatter list. Call out each handoff explicitly (who hands to whom,
and what signal — a notification, a link, a status change — makes the next actor aware).

## Draft the full journey in one pass
For every step, fill three columns (plus Actor, if this journey crosses actors/surfaces):
- **How** — the concrete interaction: what the user taps, types, sees, in plain language.
- **Why** — the rationale. Tie it to a specific persona's stated need, goal, or pain point
  where one exists (`personas/<slug>.md`); don't invent a generic reason.
- **Technical delights to ease pain** — how the product can make this step easier. **Prefer
  reusing a pattern already catalogued in `patterns.md`** over inventing a new one; if a
  delight genuinely needs a new pattern, say so explicitly rather than quietly introducing
  one.

Write the **Primary user goal** and the one-line **Core Experience** that distils the whole
journey. Draw the flow diagram (steps + the decisions that matter, per `map-journey-steps`'s
diagramming rule).

## Present the whole draft, then take corrections
Show the complete table, goal, core experience, and diagram as one draft — not gated step by
step (a long journey makes that slow). Ask the designer to confirm it, or name which step
numbers to redo. Redo only what's named; don't silently touch the rest.

If the designer would rather review it step by step instead, do that — but the default is
one complete draft with open invitation to correct.

## State and change log
- **create** → `state: proposed`, `source_driver` set.
- **update** → `state: proposed`; add a `Change log` row citing what changed and the driver;
  the prior `existing` text is recoverable from version control, not duplicated in the file.
- **enrich** → `state` stays `existing`; only the How/Why/Delight columns change.

## Output
`uxos/journeys/<id>--<slug>.md` from `${CLAUDE_PLUGIN_ROOT}/templates/journey.md`. Fill **Business rules
applied** with the `BR` ids each step relies on (from `business-rules.md`); a rule decided
while designing this journey is added to the register as `state: proposed` with evidence
`[designer]`, shown to the designer with the journey. Once confirmed, this
journey is ready for `edge-case-analysis`, `requirements-drafting`, `screen-specification`,
and `design-handoff` (Figma, a design prompt, or code) — all recommended, none required or
ordered strictly, though `requirements-drafting` is better-informed once edge cases exist,
and `design-handoff` will only build the primary path if `screen-specification` hasn't run
first — a journey's steps alone don't cover entry points, sub-actions, filters, or nav
updates. Then run `next-steps`.
