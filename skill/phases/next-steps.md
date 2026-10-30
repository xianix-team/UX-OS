---
name: next-steps
description: Read the current uxos/ model state and produce a ranked, non-binding list of possible next steps — the usual next step, a gap worth closing now, an independent step, and free choice. Every uxos command calls this on exit; it also backs /uxos:status. Writes nothing.
---

# next-steps

Goal: the OS offers direction; it never enforces sequence. This is the "what are you working
on?" interaction model.

## Method
1. Scan `uxos/`: `project_type` (brownfield/greenfield — changes which suggestions even
   apply), which artifacts exist, which key journeys lack a matrix, whether `patterns.md`
   exists, how many problems and of what evidence tier, whether `to-be-solved` exists and
   whether every `yes` item has a response type, how many open questions are unresolved,
   when the model was last touched, and **which journeys have no `uxos/edge-cases/<id>.md`**,
   **no `uxos/requirements/<id>.md`**, or **no `uxos/screen-specs/<id>.md`** — surface these
   as gap-worth-closing candidates (never forced) right after a journey is drafted, updated,
   or its edge cases are analysed. A journey with no screen-spec heading toward
   `design-handoff` is the strongest of these — that's the gap that causes
   only-the-best-case designs.

   **Code path:** before the first code-path `design-handoff`, check a component library
   exists in the repo (and covers the journey's tokens and atoms); if not, suggest
   `/uxos:code-library` first — it's the usual case on greenfield. **Claude Design path:** before the first `claude-design` handoff, suggest
   `/uxos:claude-design-library` if `handoff/design-system.md` has no Claude Design System.
   When a canvas exists, suggest re-running `/uxos:design <journey> claude-design` to work
   through its comments. After a code handoff,
   report the audit result and any recorded overrides.

   **Code sync:** if `product-context.md` has a `repo`, report commits on `repo_branch` since
   `synced_commit`; any → suggest `/uxos:sync` as a gap worth closing (first, before new
   ideation). After a sync, a newly built journey with no matrix and any `New` item
   (→ `/uxos:feature-mapping`) are natural suggestions. On greenfield, once development has
   started and there's no `repo` yet, suggest adding it with `/uxos:sync <repo>`. On
   brownfield with no `repo`, keep one line in the gap slot: "got code access now?
   `/uxos:sync <repo>` enriches the existing documents with business logic from the code".

   **Design master:** read `design_tools` and `design_master` from `product-context.md`
   (unset → suggest recording them). `claude-design` with at least one handoff record
   `status: approved` and a stack in `design-direction.md` → suggest `/uxos:promote` as the
   usual next step. `code` and the code library or prototype changed since
   `handoff/design-system.md` → `mirrored_commit` → suggest `/uxos:mirror` (push, via
   `/design-sync`) in the gap slot. A canvas with comments or edits newer than its handoff
   revision log → suggest `/uxos:mirror` pull-back. Prefer suggesting the Claude Design +
   code path over Figma when `design_tools` says so.

   **Competitor analysis (optional — suggest, never push):** no `competitors.md` and
   (greenfield) `domain.md` exists but `to-be-solved.md` doesn't, or (brownfield) journeys
   exist but `to-be-solved.md` doesn't → offer `/uxos:competitors` in the independent slot,
   one line: "optional — see what users already get elsewhere before scoping". The designer
   cites a competitor as the reason for a feature → suggest it in the gap slot.
   `competitors.md` dated more than six months ago → suggest a refresh. Mention it at most
   once per session if the designer passes on it.

   **Change impact:** if the designer mentions a client-requested visual change (a colour,
   font, spacing, a component), suggest `/uxos:impact "<change>"` before any library or
   design edit. If an impact report has `decision: pending`, list it in the gap slot.

   **Business rules:** if `product-context.md` still lists product rules and there is no
   `business-rules.md`, suggest moving them into the register (`/uxos:sync <repo>` does it
   when code is available; otherwise offer to move them as-is). Flag journeys or units
   that state a rule in prose instead of citing a `BR` id.

   **Imported material:** tell imported artifacts (`confidence: designer-supplied`,
   `imported_from` set) apart from generated ones. If the designer mentions documents they
   already have and nothing is imported yet, suggest `/uxos:import` before anything gets
   generated. After an import, say exactly which artifacts are still missing, and on
   brownfield suggest the drift check if it wasn't done — an adopted feature map is only as
   current as its author's last look.

   **Greenfield-specific checks:** after `/uxos:init`, point straight at `/uxos:to-be-solved`
   (there's no product to map journeys from yet). After `to-be-solved` is confirmed, suggest
   `/uxos:requirements-gap` if the designer mentioned a client requirements document, and
   suggest `/uxos:design-direction` before any journey heads toward `design-handoff` — a
   greenfield journey with no `design-direction.md` yet will hit `pattern-study`'s hard stop
   (it depends on it; there's no as-is to fall back to).
2. Produce **up to four** suggestions, ranked, in this shape:
   1. **the usual next step** on the canonical path
   2. **a gap worth closing now** — a flagged conflict, an inferred artifact that will drive
      later analysis, a cluster of assumption-tier problems, unresolved blocking questions
   3. **something independent** that can be done anytime (e.g. `patterns` needs no journeys)
   4. **free choice** — always implied; state it explicitly
3. Each line: the command (or the manual action) + a terse reason tied to real state
   (counts, ids).

## Rules
- Non-binding. Never say "you must". The designer picks.
- Base every suggestion on actual model state, not a fixed script.
- If the model looks complete for Part A, point at Part B (`/uxos:respond`, once built) and
  at sharing `problems.md` / `to-be-solved.md` with stakeholders.
- Output only — never modify the model.

## Format
```
Next:
  1. <command>        <reason>            ← usual next
  2. <command/action> <reason>
  3. <command/action> <reason>
  4. or do your own thing
```
