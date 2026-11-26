---
name: idea
description: Take a rough idea as far as mockups through the normal uxos flow, without it becoming part of the product. Its journeys, screen specs and mockups live in uxos/rough-ideas/<name>/, and what it adds to shared files is flagged "idea: <name>". Edge cases, requirements and the dev handoff wait until, after seeing the mockups, the user decides to go ahead, park or discard. Nothing changes without their yes.
---

# idea

Goal: a first thought can go all the way to a mockup the same day, and it becomes part of
the product only when someone decides so after seeing it.

**No light path.** An idea runs through the same procedures as any other work, each in full,
with its gates and show-before-saving. Skipping grounding steps is where drift starts, so
nothing up to the mockup is skipped. What differs is only **where the work is saved** and
**what may read it**. Three steps wait until the user chooses to go ahead: edge cases,
requirements (Units), and the dev handoff.

**Template is the contract.** Read `${CLAUDE_PLUGIN_ROOT}/templates/idea.md` before writing the idea record
and keep its frontmatter keys and headings exactly. If it can't be read, stop and say so.

## Ask what they want

If the request doesn't already say, ask, as numbered choices:
1. Start a new idea
2. Carry on with an idea
3. Decide on an idea: go ahead, park, or discard
4. List ideas

## 1. Start a new idea

1. **Ask for the idea in their own words.** Never fill it in from a name or a title. If they
   can only give a few words, ask who it's for and what problem it solves. If they can't say
   yet, offer to save just their words as a parked idea and stop.
2. **Say back** what you understood, in one or two sentences, and whether it reads as a
   **new feature** or **a change to an existing journey** (name the journey). Confirm.
3. **Suggest a short folder name** (lowercase, hyphens, e.g. `owner-phone-blocking`) and
   confirm it. Refuse a name already used in `uxos/rough-ideas/`.
4. Draft `uxos/rough-ideas/<name>/idea.md`: their words, verbatim, in §1; `started_by` (ask
   if unknown); `started_at`; `state: exploring`; `base_commit` from `git rev-parse HEAD`
   (or `none` outside git). **Show it and save only on a yes.**
5. Carry on with the route below.

## 2. The route: the normal flow, saved in the idea's place

Run each step's own procedure, in full, in this order. Tell each one where to save, as
below. Log each step in the idea record (§2 and §7) when it is saved.

| Step | Procedure | Saved |
|---|---|---|
| Why, what, where, conflicts | **New feature on brownfield:** `new-feature-mapping`, with its prerequisites. **A change to an existing journey, or greenfield:** add a row to `to-be-solved.md` through `to-be-solved`'s own G2 questions (decision, response type, driver; `driver: stakeholder-unvalidated` is allowed) | brownfield new feature: `rough-ideas/<name>/feature-mapping.md`; otherwise the row in `to-be-solved.md`, flagged |
| Blueprint | `build-blueprint`, update mode | the nodes in `blueprint.md`, flagged |
| Journey(s) | `journey-design`: create for a new journey; update for a change to an existing one | `rough-ideas/<name>/journeys/` |
| Screen specs | `screen-specification` | `rough-ideas/<name>/screen-specs/` |
| Mockups | `design-handoff`, within the limits below | `rough-ideas/<name>/design-records/` (and `design-prompts/` for a prompt) |

Notes on the route:
- **Greenfield with no `to-be-solved.md` yet:** the idea has nothing to sit against. Say
  so and suggest the normal start (`/uxos:to-be-solved`). Don't make the base inside an
  idea.
- **No `blueprint.md` yet:** skip the blueprint step, note it in the record, and carry on.
  The node is added at go ahead.
- **Journey ids:** a new journey gets `id: <name>-J1` (then `-J2`…), so it can't collide
  with real ids. Screen specs use the same id. Real ids are given at go ahead.
- **A change to an existing journey:** never edit the real file. `journey-design` update
  mode writes the idea's version of the whole journey into the idea's folder, keeping the
  real journey's id, with `based_on: journeys/<file>` in its frontmatter.
- **Reading is fine, writing isn't.** Every step reads the real model (domain, personas,
  business rules, patterns, the design system) so the idea fits the product. Nothing outside
  `rough-ideas/<name>/` is written, apart from the flagged entries in `blueprint.md` and
  `to-be-solved.md`. If a step's prerequisite is missing (for example `new-feature-mapping`
  needs `patterns.md`), that prerequisite is ordinary work on the product: say so and run it
  only with a yes, as its own step, not as part of the idea.

### Limits on mockups for an idea
- **Nothing is added to the design system or `patterns.md`**, in Figma, Claude Design, or
  code. A component the idea needs is drawn in the mockup and listed in the idea record §5
  as "new, not in the design system".
- **The product's code isn't touched.** `design-handoff`'s code path (Path C, real routes in
  the repo) isn't used for an idea, whatever `design_master` says. Offer Claude Design,
  Figma, a design prompt, or a standalone `mockup.html` inside the idea's folder. A
  standalone mockup uses the design system's tokens and components read-only.
- **The mockup's name says it's an idea:** prefix the canvas, Figma page, or file title with
  `idea: <name>`.

## 3. The flag

Plain text, `idea: <name>`, on every entry the idea adds or changes in a shared file.

- **Blueprint (mermaid):** in the node label.
  - Added: `C7["Block dates from phone (idea: owner-phone-blocking)"]`
  - Changed: keep the old label: `B2["Calendar and phone blocking (idea: owner-phone-blocking, was: Calendar)"]`
  - Add a row to the Confidence table: `<ids> | idea: <name>, not decided`.
- **to-be-solved.md:** start the row's item text with `idea: <name> —`.
- **Record every flagged entry** in the idea record §3, with the old text for changed
  entries, so a discard can restore it exactly.

**Overlaps: flag, never block.** Before flagging an entry, look for another `idea:` on it.
If there is one:
- tell the user which idea already touches it;
- record the overlap in both ideas' §4;
- add the new flag beside the existing one, e.g. `(idea: a, idea: b, was: Calendar)`. Keep
  the **first** `was:`, because it's the real original.

## 4. Carry on with an idea

List the ideas whose `state` is `exploring` or `going-ahead`. For the chosen one, read its
record, say which step is next, and continue the route. Before continuing, compare the real
files the idea is based on with `base_commit` (`git diff <base_commit> -- <files>`). If any
changed, say what changed first. The user decides whether the idea needs adjusting.

## 5. Decide

Offered once a mockup exists. The user can decide earlier if they want to. Ask, as numbered
choices: **go ahead**, **park**, or **discard**. Record their reason in their words,
`decided_by` and `decided_at`.

### Go ahead
1. **Check what moved.** Compare the real journeys, blueprint, to-be-solved and patterns the
   idea touches with `base_commit`. Show anything that changed and settle it first.
2. **Check overlaps.** If another idea flags the same entries, say so. Going ahead with this
   one doesn't decide the other, but the other may need adjusting later.
3. **Show the full move before doing it**, then do it only on a yes:
   - new journeys get real ids (the next free `J<n>`), with every reference updated: screen
     specs, design records, the feature mapping, journey `id` and file name;
   - files move with `git mv` into `journeys/`, `screen-specs/`, `design-records/`,
     `design-prompts/`, and `feature-mapping/<name>.md`;
   - a changed existing journey: show the diff between the real file and the idea's version,
     and replace the real file only on a yes;
   - the `idea: <name>` flags come off; a changed node keeps its new label, and the `was:`
     part is dropped;
   - the Confidence-table row becomes `proposed`;
   - for a blueprint step skipped earlier, run `build-blueprint` update mode now.
4. Set `state: going-ahead`. Then suggest, in this order, the steps that waited:
   - `edge-case-analysis` for each journey;
   - a library procedure for the new components in §5;
   - `requirements-drafting` once edge cases are done.
5. Once the files are in the real folders, set `state: adopted` and keep the idea record as
   history.

### Park
Set `state: parked`. Everything stays as it is, still flagged and still invisible to the
rest of the model.

### Discard
1. **List everything that will go:**
   - every file in the folder except `idea.md`;
   - every flagged entry: added entries removed, changed entries restored to their `was:`
     text;
   - the mockup canvas or Figma page, which the user deletes themselves; say where it is.
2. Remove it only on a yes.
3. Where another idea also flags an entry, take off only this idea's flag. If this idea held
   the `was:`, pass it to the other idea.
4. Set `state: discarded`. The idea record stays, so the decision isn't lost. Git history
   keeps the work.

## 6. List ideas

A table: name, state, started by and when, last activity (the record's last log date), next
step. Then flag:
- **Old ideas:** `exploring` or `parked` with no activity for 60 days or more. Ask whether to
  keep or discard each.
- **Overlaps:** ideas flagging the same entries.

Discarded and adopted ideas are left out unless asked for.

## Rules
- Show every file before saving it and save only on a yes, the same as everywhere in uxos.
- Only the main conversation writes. A helper may research or read, never write.
- **Ideas are one-way.** They read the real model; nothing in the real model reads them.
  Other procedures skip anything flagged `idea:` and everything in `uxos/rough-ideas/`
  unless they are running for this procedure.
- Never decide for the user. Go ahead, park and discard are theirs.
- Run `next-steps` on exit.
