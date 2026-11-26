# Spec: `/uxos:idea` — taking a rough idea to a mockup without it becoming the product

Status: **built** on this branch (see CHANGELOG, Unreleased).
Branch: `feature/proposed-vs-approved`.

## Why

From customer feedback: people give a lot of input, and some of it is only first thoughts.
Today, once someone says yes to saving, that thought becomes part of the model, and later
steps treat it as decided.

What people need is to take a thought as far as a mockup, see it, and only then decide
whether it becomes part of the product. Doing that must not open a "light" path. Light
paths are where the AI fills gaps and the model drifts.

## The idea in one paragraph

An idea goes through the **normal flow** up to and including mockups, with no shortcuts.
Anything it adds to a shared file (the blueprint, to-be-solved) is marked
`idea: <idea-name>`. Its own files (feature mapping, journeys, screen specs, design record)
live in `uxos/rough-ideas/<idea-name>/`. The steps that only matter once you're building it
are left out: edge cases, requirements (Units), and the dev handoff. After seeing the
mockups, the user decides whether to **go ahead**, **park** it, or **discard** it. Nothing
changes without their yes.

## One command: `/uxos:idea`

It asks what the user wants:

1. **Start a new idea.** It asks for the idea in the user's words, and never guesses from a
   name. It suggests a short name for the folder, and the user confirms it.
2. **Continue an idea.** It lists open ideas and picks up at the next step.
3. **Decide on an idea.** Go ahead, park, or discard (see below).
4. **List ideas.** Shows each one with its state, who started it, and when.

## The flow for an idea

| Step | Same as today? | Where it's saved |
|---|---|---|
| Why / placement / conflicts: **brownfield** `new-feature-mapping`; **greenfield** a to-be-solved entry | yes, in full | brownfield: `rough-ideas/<name>/feature-mapping.md`; greenfield: the entry in `to-be-solved.md`, marked `idea: <name>` |
| Blueprint update | yes, in full | `blueprint.md`; added or changed nodes marked `idea: <name>` |
| Journey design | yes, in full | `rough-ideas/<name>/journeys/` |
| Screen specs | yes, in full | `rough-ideas/<name>/screen-specs/` |
| Mockups (design handoff) | yes, with limits (below) | `rough-ideas/<name>/design-records/` |
| Edge cases, requirements (Units), dev handoff | **not run** while it is an idea | n/a |

Every step still shows its draft and waits for a yes. Steps read the real model (personas,
domain, patterns, the design system) so the idea fits the product. **Nothing in the real
model reads the idea.**

### Limits on mockups for an idea

- **Nothing is added to the design system or to `patterns.md`.** A component the idea needs
  is drawn in the mockup and listed in the design record as "new — not in the design system".
  This follows the same rule as crazy8.
- **The product's code isn't touched.** On `design_master: code`, the code path (real routes
  in the repo) isn't used for an idea. The mockup goes to Claude Design, Figma, a design
  prompt, or a standalone mockup file inside the idea's folder.

## The flag

Plain text: `idea: <idea-name>`.

- **Blueprint (mermaid):** added to the node label, e.g. `C7["Block dates from phone (idea: owner-phone-blocking)"]`.
  If the idea changes an existing node, the old label is kept beside it, so a discard
  can put it back:
  `(idea: owner-phone-blocking, was: "Block dates")`.
- **to-be-solved.md:** an `idea: <name>` note on the row.
- **Idea folder:** `rough-ideas/<name>/idea.md` holds the idea's record:
  - the user's own words;
  - who started it and when;
  - its state: `exploring` → `parked` / `going-ahead` → `adopted` / `discarded`;
  - which shared entries it flagged.

## Deciding

Shown only after a mockup exists, though the user can decide earlier if they want to.

- **Go ahead.**
  1. Run edge cases and requirements on the idea's journeys. Each is shown and needs a yes.
  2. Move the journeys, screen specs and design records into the main folders.
  3. Remove the `idea:` flags from the blueprint and to-be-solved.
  4. Mark `idea.md` adopted.

  Before any of this, check whether the real journeys or blueprint changed after the idea
  started. If they did, show what changed first.
- **Park.** Keep everything as it is and mark it `parked`. It stays listed for future
  reference.
- **Discard.**
  1. List everything that will be removed: the folder, plus each flagged node and row,
     with any changed node restored to its `was:` label.
  2. Remove it all only on a yes.

  Git history keeps the work.

## Ideas must stay out of the real model

Commands that treat the model as real must skip anything flagged `idea:` and everything in
`rough-ideas/`:

| Procedure | What it must do |
|---|---|
| `requirements-drafting` | refuse an idea's journey ("decide on the idea first"); ignore idea rows in to-be-solved |
| `requirements-gap-analysis` | ignore idea rows |
| `code-sync` | never mark an idea node built or changed; if code matches an idea, report it to the user rather than resolving it |
| `promote-to-code` | ignore ideas |
| `design-handoff` (code path) | not used for ideas (see mockup limits) |
| `build-blueprint` (create, greenfield) | ignore idea rows in to-be-solved |
| `competitor-analysis` | rows from the blueprint leave out idea nodes |
| `change-impact` | report idea usage separately: "also used by idea X" |
| `next-steps` / `/uxos:status` | ideas get their own section (open, parked, waiting for a decision); they're never suggested as build work |
| `edge-case-analysis` | runs on an idea only when the user chose go ahead |

## Changes to make

- `method/procedures/idea.md` (new) and `plugin/commands/idea.md` (new)
- `method/templates/idea.md` (new): the idea record
- `method/templates/SCHEMA.md`: `rough-ideas/`, the `idea:` flag, idea states
- `method/orchestration.md`: routing entry and the "ideas stay out" rule
- The procedures in the table above
- `scripts/check.sh`: nothing new expected
- `tests/smoke.py`:
  - starting an idea saves nothing without a yes;
  - `/uxos:requirements` refuses an idea's journey;
  - status lists ideas separately.

  Needs a fixture with one idea in it.
- README command list, CHANGELOG

## Not in scope

- Sharing ideas through a different folder per person. One folder per idea is enough to
  avoid most git conflicts.
- Who is allowed to go ahead (role limits). The record keeps who decided; limits can come
  later.
- The separate "saving isn't approving" change discussed before this. It's on hold.

## Decided

1. Ideas `exploring` or `parked` with no activity for 60 days or more are flagged in status,
   asking whether to keep or discard each.
2. Two ideas changing the same blueprint node are flagged as overlapping, never blocked.
   Both flags sit on the entry, and the first `was:` is kept as the real original.
