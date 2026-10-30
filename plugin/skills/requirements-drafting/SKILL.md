---
name: requirements-drafting
description: Write a journey up as development Units — the single handoff to engineering, QA, and AI-DLC agents. Each unit is a buildable slice of the journey with Who / Why / What / How and Given-When-Then acceptance criteria, folding in screen specs, edge cases, states, data, business rules, and the problems it resolves, all traced back to the model. Works on existing or proposed journeys.
---

# requirements-drafting

Goal: one markdown file per journey that downstream agents and people can use as-is —
delivery and Bolt planning, development, test design — without going back to the designer
to ask what a screen does or why it exists. Assemble it from the confirmed model; don't
re-derive requirements, and don't invent what the model doesn't say.

There is one format: the **Unit**, with the user story built into its **Why**. (Older files
with `format: story` are still valid; re-running this procedure rewrites them as units.)

**Template is the contract.** Read `${CLAUDE_PLUGIN_ROOT}/templates/requirements.md` before drafting and
keep its shape exactly: every frontmatter key, the **Unit index** table, and per unit the
**Readiness** and **Built** lines and the **Who / Why / What / How / Acceptance criteria / Build notes**
headings in that order, with the **States** and **Data** tables using the template's
column names. Downstream agents parse
this structure, so never merge, reorder, rename, or drop a section. A section with nothing
to say gets `none` or `needs decision`, not deletion. Summary goes at the end.

## Sources
Read before drafting. Missing sources lower readiness; they don't block drafting.

1. `uxos/journeys/<id>*.md` — **required.** Steps, How, Why, Technical delights, actors.
2. `uxos/screen-specs/<id>.md` — screens, entry points, controls, nav, states. If missing,
   say so and offer `screen-specification` first; without it, **How → Screens** and
   **States** come from the journey only and each unit notes the gap.
3. `uxos/edge-cases/<id>.md` — every `handled` or `open` case becomes an AC. `needs
   decision` cases go under Open questions and make the unit `not-ready`. If missing,
   offer `edge-case-analysis` (non-blocking).
4. `uxos/to-be-solved.md` — the **Why** trace. Every unit must cite at least one row.
5. `uxos/problems.md` — rows whose `location` references this journey become
   "resolves `PRB-<id>`" criteria. A new journey may have none; that's expected.
6. `uxos/business-rules.md` — the rules each unit applies, cited as `BR-<n>` with their
   values. A rule the unit needs that isn't in the register is `needs decision`.
7. `uxos/personas/`, `uxos/user-groups.md` — **Who**, roles, permissions.
8. `uxos/patterns.md`, `uxos/handoff/<id>.md` — components used; prototype/Figma links.
9. `uxos/open-questions.md`, `uxos/requirements-gap.md` (if present) — open items and any
   client NFRs relevant to this journey.

## Method
1. **Slice the journey into units.** A unit is a capability someone can build and test on
   its own — usually 2–5 per journey. Group steps that share a screen, data, or outcome;
   split where the user could stop and still have something meaningful. Not one unit per
   step, not one unit for the whole journey. **Propose the slicing first** (unit titles +
   the steps each covers) and get the designer's OK before writing the full units — this
   is the one real decision in this procedure.
2. **Fill every section for every unit** from the sources:
   - **Who** — persona and any other actors; permissions only as the model states them.
   - **Why** — the story statement from the steps' How/Why; value in the persona's terms;
     trace to to-be-solved rows, PRBs, and journey steps.
   - **What** — functional summary; in/out of scope, naming the neighbouring unit that
     covers what's out.
   - **How** — concrete flow; screens; only the states that apply; data fields and rules;
     business rules; technical delights.
   - **Acceptance criteria** — Given/When/Then, each with a stable id
     `AC-<unit-id>.<n>` so test and planning agents can reference it. At least one happy
     path, one per relevant state, one per folded-in edge case, one per resolved PRB, and
     NFRs only when the model states them.
   - **Build notes** — dependencies between units, prototype/design links, patterns, open
     questions, assumptions.
3. **Honesty.** A field the model doesn't answer is written `needs decision` and added to
   Open questions — never filled with a plausible guess. No estimates, story points,
   technical design, APIs, or data models: those belong to the downstream agents.
4. **Readiness.** A unit is `ready` only when it has no `needs decision` field, no
   unresolved `needs decision` edge case, and at least one to-be-solved trace. Otherwise
   `not-ready`, with the reason on the unit.
5. **Coverage check** before presenting: every journey step is in exactly one unit (or the
   designer says why not); every `handled`/`open` edge case and every in-scope PRB for this
   journey appears in an AC. Report gaps in the Summary.
6. **Structure check** before presenting: compare the draft against the template —
   frontmatter keys (`ready_units` filled), Unit index present and matching the units,
   every unit has its Readiness line and all six headings with the States and Data tables.
   Fix any miss.
7. Present the **whole draft** at once (assembly from confirmed sources, not fresh
   decisions). The designer confirms, or names unit ids to redo.

## Output
`uxos/requirements/<journey-id>.md` from `${CLAUDE_PLUGIN_ROOT}/templates/requirements.md`. Unit ids are
`U-J<n>-<k>` — unique across the project, stable across re-runs (keep an existing id when a
unit survives a re-slice; don't renumber). Then run `next-steps`.
