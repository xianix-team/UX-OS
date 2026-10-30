---
name: design-handoff
description: Turn a confirmed journey (proposed, with Step/How/Why/Technical-delight) into live Figma screens, a Claude Design canvas, a structured design prompt for an external AI design tool such as Stitch, or real screen code built in the repo using existing components. The wireframing/handoff step of the solve loop.
---

# design-handoff

Goal: hand a designed journey to the tool the designer actually works in, carrying the
patterns, personas, and rationale with it. Never a bare "go design this."

## Prerequisite
The journey must be confirmed (`state: proposed`, from `journey-design`) — don't run this on
a draft still being corrected. `patterns.md` must exist; it's what keeps new screens
coherent with the existing product instead of novel. If `uxos/edge-cases/<id>.md` doesn't
exist yet, say so and offer to run `edge-case-analysis` first — non-blocking, the designer
can proceed without it.

**Check for `uxos/screen-specs/<id>.md`.** If it doesn't exist, say so explicitly and
plainly before doing anything else: *"No screen spec found for this journey — only the
primary interaction on each screen will be built. Entry points, sub-action items, filters/
controls, and navigation updates won't be included unless you run `screen-specification`
first."* Non-blocking — the designer can proceed anyway — but this warning must not be
skipped; it is the fix for "only the best case got designed."

## Target
Default to the project's `design_tools` in `product-context.md`; ask only if it's unset or
the designer names another. The recommended pairing is **Claude Design + code**:
1. **Claude Design** — a canvas with live artboards, one per screen and state; no Figma
   licence or connector; for exploring directions and client review
2. **Code** — a functional prototype in the repo, composed from the code library; for
   sign-off, QA, and as what developers build from
3. **Figma** (direct) — when the team already works in a Figma file
4. **Design prompt** — for Stitch or another AI design tool; a text handoff document

**Follow `design_master`** (`product-context.md`; see `design-mirror`):
- `claude-design` (greenfield, pre-code) — canvases are where screens are decided; the
  code path builds only a throwaway spike unless `promote-to-code` has run. When the first
  journeys' canvases are approved, suggest `promote-to-code`.
- `code` — the prototype is the truth. A Claude Design canvas composes from the system
  mirrored from code; a direction chosen on a canvas is built in code (Path C) before it
  counts, and `design-mirror` pull-back handles anything changed there.

## Path A — Figma (direct)
1. Confirm the Figma MCP connector is authorized. If it isn't, tell the designer plainly:
   this path needs it authorized first (claude.ai connector settings, or `/mcp` in an
   interactive Claude Code session), and stop here — don't attempt Figma actions without it.
2. Get the existing Figma file link. If none exists yet, tell the designer to run
   `figma-library` first — it builds the foundations/components file this step assumes —
   then come back here.
3. Hand off to the **`figma-generate-design`** skill/workflow (load it alongside
   `figma-use`), giving it: the journey's steps (each with How / Why / Technical-delight),
   **the matching `screen-specs` block for each screen if one exists** (entry points,
   sub-action items, controls, nav updates, states — not just the primary interaction),
   the relevant personas, and `patterns.md` as the pattern/token source — so it *discovers
   and reuses* existing components rather than inventing new ones.
4. Match journey steps to screens. Where an **existing** screen already covers a step,
   reference it rather than rebuilding it — only build **proposed** screens for steps that
   are new or changed. When a screen-spec exists, build **everything it specifies** for that
   screen, not only the step that put it in the journey.
   **Compose, don't draw.** A screen is a *Page* — a template filled with real content,
   assembled from organism, molecule, and atom **instances** from the library, with every
   value bound to a foundation variable. If a screen needs an element the library doesn't
   have, stop: name its atomic level, check the levels beneath it exist, and add it through
   `figma-library` at that level first — then use the instance. Never draw a one-off, and
   say which components were added.
5. Build one screen (or step) at a time. After each, tell the designer to check it in Figma
   and confirm before continuing to the next. Don't build the whole journey unattended.
6. Record the outcome in `uxos/handoff/<journey-id>.md` — Figma file/frame links, which
   screens were built vs referenced, open items.

## Path B — Design prompt (Stitch or another tool)
1. For each step (or the whole journey — designer's choice), draft a structured prompt
   containing:
   - the interaction (How) and the screen's job
   - the rationale (Why), tied to the persona
   - **if a `screen-specs` block exists for that screen**: its entry points, sub-action
     items, screen-level controls, and nav/menu updates — folded into the prompt as
     required elements, not left implicit
   - the canonical patterns to follow, pulled from `patterns.md` (colours, type, spacing,
     component specs) — not left for the target tool to invent. Give them in **atomic
     order**: the foundation tokens first, then the specific atoms, molecules, and organisms
     this screen should be assembled from, named as they appear in `patterns.md` §6
   - the existing screen for that step, if any, as a coherence reference
   - the technical delight, written as a concrete design instruction
2. Present the drafted prompt(s) for confirmation before finalising.
3. Write one prompt block per step to `uxos/design-prompts/<journey-id>.md`, ready to paste
   into the target tool.

## Path C — Code: a functional prototype in the repo

Real source-code editing, held to the **`code-build-contract`**: tokens only, styling in the
component layer, screens only compose, atomic structure, no component defined inside a
screen. Read it before building.

1. **Needs a real local repo, not the disposable `uxos-repo-cache/`.** If the designer is
   working from a cloned cache (from a git-URL extraction), ask for their actual local
   checkout — code built in a throwaway cache can't be committed or reviewed.
2. **Isolate the prototype (default; the designer may opt out):** clean working tree (ask
   before touching a dirty one), a **new branch**, the prototype behind its own clearly named
   route or flag so it can't leak into the product, and **mock fixtures** instead of backend
   calls.
3. **Is there a component library to compose from?** Check the repo itself (component
   directory, Storybook, an internal `ui` package) — it's ground truth over `patterns.md`'s
   inventory. If there isn't one, or it lacks the tokens and atoms this journey needs, tell
   the designer to run **`code-library`** first. That is the normal case on greenfield and on
   brownfield products styled by one-off overrides; without it, "compose from components"
   degrades to inline styling.
4. If a Figma file exists for this journey, build **from its frames** using the
   **`figma-design-to-code`** skill — not from memory. Optionally map the two libraries with
   Code Connect.
5. Match journey steps to screens the same way as Path A: reuse an existing screen where one
   already covers a step; build new ones only for steps that are new or changed. When a
   `screen-specs` block exists, build everything it specifies (entry point, sub-actions,
   controls, nav updates, states), not just the journey step. Compose **only from library
   components**; if one is missing, stop and add it **at its own level** via `code-library`
   (an atom before the molecule that needs it) — never inline, never as a one-off.
6. Build **one screen at a time**, in the framework and conventions the repo already uses.
   **After each screen, run the audit** from `code-build-contract`, fix what it finds, run the
   prototype (the `run` skill) and look at it, then show the designer the files and the
   audit result. **Findings block confirmation** unless the designer overrides one — record
   each override (finding, file, their reason); never override on your own.
7. **Make it functional — a prototype people can use, not static screens:**
   - **Runs end to end.** Real routes and navigation between the journey's screens, in
     journey order, plus the entry points and nav updates from the screen spec.
   - **Mock data shaped by the units.** Fixtures follow each unit's **Data** table (field
     names, types, required/optional) and a realistic sample; one fixture file per journey
     under the prototype's folder. No backend calls.
   - **Business rules enforced.** Limits, validation, cut-offs, and messages behave as their
     `BR-<n>` entries say, with values imported from one constants file that cites the ids
     — never retyped per screen.
   - **Every state reachable.** A small, prototype-only **state switcher** (a dev panel or
     `?state=` param) shows each screen's states from the screen spec and edge cases —
     empty, loading, error, permission-denied, success — so clients and QA see more than
     the happy path. It is never part of the product UI.
   - **Traceable.** Each screen's root carries `data-unit="U-J<n>-<k>"`; elements an
     acceptance criterion checks carry `data-ac="AC-U-J<n>-<k>.<m>"`, so QA and test agents
     can point at them.
   Scope boundary: no real backend, auth, or persistence beyond in-memory. Say explicitly
   what a developer still has to wire (APIs, auth, storage).
8. Before finishing, a `code-review` / `simplify` pass over the changed code for reuse and
   duplication.
9. Record the outcome in `uxos/handoff/<journey-id>.md` — files created/changed, branch name,
   how to run it (command + route), the state switcher, fixtures and the `BR` constants
   file, audit result and overrides, what's left to wire up. If `uxos/requirements/<id>.md`
   exists, set each unit's **Prototype / design** line to its route (and the canvas link,
   if there is one).
10. If `design_master: code` and the prototype added or changed library components, say
    that Claude Design is now behind and suggest `design-mirror` push (`/design-sync`).

## Path D — Claude Design
1. **Availability check.** Claude Design is reached through the **Artifact** tool. If it
   isn't available in this session (check deferred tools too, loading with ToolSearch before
   deciding), say so and offer Figma, a design prompt, or code — stop here. Never substitute
   an HTML file.
2. **Design system.** If `uxos/handoff/design-system.md` records a Claude Design System,
   attach it. If none exists, say so and offer `claude-design-library` first (recommended);
   the designer may proceed without it, in which case tokens come straight from
   `patterns.md` and the handoff record notes that no shared system was used.
3. **Revising an existing canvas?** If `uxos/handoff/<journey-id>.md` already has a
   `claude_design_url`, read the artifact and its comments first, list what the comments ask
   for, confirm with the designer, revise that same canvas (keep its URL), and log the
   changes in the handoff record. Otherwise start a new one: Artifact `quickstart` with
   intent `design`, then publish from the **Design** type it names, titled `J<n> —
   <journey name>`, attaching the design system.
4. **What goes on the canvas** — one canvas per journey. Before the main build, if the
   designer wants options, lay out **2–3 directions** for the key screen side by side
   (each composed from the same system, each named and with its rationale); the chosen
   one is built out, the others stay on the canvas labelled `not chosen`.
   - one artboard per screen from `screen-specs/<id>.md`, laid out left to right in journey
     order, each labelled with its step and the unit id(s) it serves (`U-J<n>-<k>`);
   - an artboard for **each state** the spec lists (empty, loading, error, success,
     permission-denied…) next to its screen — not only the happy path;
   - everything the spec defines per screen: entry points, sub-actions, controls, nav
     updates;
   - user-visible business rules (limits, messages, fees) with values taken from the `BR`
     entries in `business-rules.md`, never invented;
   - composed from the design system's components; a missing component goes back to
     `claude-design-library` at its atomic level, not drawn as a one-off.
5. Build **one screen (with its states) at a time**; after each, give the designer the
   canvas link and wait for confirmation. Don't build the whole journey unattended.
6. Artifacts are private by default; sharing with stakeholders is the designer's call.
7. **Comments become decisions.** When revising, each comment thread is turned into a
   change in the model (journey, screen spec, pattern, rule) or a reasoned "no change",
   then answered on the thread — only threads the designer sent to Claude can be replied
   to or resolved; list the others for the designer.
8. **Approval.** When the designer (or client, through them) approves the canvas, set the
   handoff record's `status: approved`. On `design_master: claude-design` that is what
   makes `promote-to-code` available; on `code` it means "build it in Path C".
9. Record the outcome in `uxos/handoff/<journey-id>.md` — `target: claude-design`,
   `claude_design_url`, screens and states built, components used or added, open items,
   and a revision log. If `uxos/requirements/<id>.md` exists, set each unit's
   **Prototype / design** line to the canvas link.

## Output
Path A: `uxos/handoff/<journey-id>.md` from `${CLAUDE_PLUGIN_ROOT}/templates/handoff.md` (a record — the
design itself lives in Figma). Path B: `uxos/design-prompts/<journey-id>.md` from
`${CLAUDE_PLUGIN_ROOT}/templates/design-prompt.md`. Path D: `uxos/handoff/<journey-id>.md`, `target: claude-design`, `claude_design_url` set,
the Screens table listing artboards (screen + states), and a revision log. Path C:
`uxos/handoff/<journey-id>.md`, `target: code`,
`branch` set, the Screens/files table listing files created/changed, the audit result, and any
Overrides. Then run `next-steps`.
