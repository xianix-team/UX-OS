# uxos — UX Designer OS

A brownfield **and** greenfield co-pilot for professional UX / product designers. For an
existing product it builds a project model and diagnoses it; for a from-scratch product it
runs domain/persona research and a theme-consolidated to-be-solved list. Both converge on
the same solve loop through to design handoff.

It is a co-pilot, not an autopilot. Every command ends at a review gate. Nothing is written
to the model without you seeing it; nothing is forced into sequence.

## Install

```
/plugin marketplace add <path-or-repo>
/plugin install uxos
```

Or point Claude Code at this directory as a local plugin.

## Use

```
cd <your workspace or the product repo>
/uxos:import <path>   # optional, first: adopt documents you already have (any format)
/uxos:init            # brownfield or greenfield; crawl/research; draft only what's missing
```

**Brownfield**, after `/uxos:init` + gate G1:
```
/uxos:journeys        # name the key journeys
/uxos:matrix <J>      # UX matrix per journey (Nielsen + IxD/IA; you add evidence rows)
/uxos:patterns        # reverse-engineer the product pattern study
/uxos:problems        # derive + critique the problems register
```

**Greenfield**, after `/uxos:init` (no gate G1 — nothing was crawled):
```
/uxos:to-be-solved    # runs problem-validation internally: consolidates personas by theme
/uxos:requirements-gap   # optional -- cross-check a client FR/NFR doc against it, both ways
/uxos:design-direction   # philosophy, colour, type, spacing, a11y -- before any screen work
/uxos:patterns        # populates canonical patterns from design-direction, not an as-is extraction
```

**Both**, from here:
```
/uxos:to-be-solved    # scope gate G2 -- decide what's worth solving, set response types
/uxos:feature-mapping <feature>   # add-feature objective: driver, placement, conflict check
/uxos:blueprint [source]          # create the feature map, or update it (diff, then confirm)
/uxos:journey-design <journey>    # create/update/enrich a journey: Step / How / Why / delight
/uxos:edge-cases <journey>        # systematic edge-case register (suggested, never forced)
/uxos:requirements <journey>                # dev handoff: Units with Who/Why/What/How + acceptance criteria
/uxos:screen-spec <journey>        # per-screen spec: entry points, sub-actions, filters, nav
/uxos:figma-library               # build/update the Figma design-system file (run once first)
/uxos:code-library               # build the design system in code, bottom-up (before a code handoff)
/uxos:claude-design-library      # build the design system in Claude Design (before the first canvas)
/uxos:design <journey> [figma|claude-design|prompt|code]   # hand off to Figma, a Claude Design canvas, a design prompt, or real repo code
/uxos:promote         # greenfield: Claude Design → code library + functional prototype
/uxos:mirror [mode]   # keep Claude Design and code in step (push via /design-sync, pull canvas changes)
/uxos:competitors     # optional: table stakes, differentiators, whitespace vs. your model
/uxos:impact "<change>" # is it a token? where is it used? change here or everywhere?
/uxos:sync [repo]     # bring the model in line with what devs built (asks before changing anything)
/uxos:status          # where things stand + suggested next steps (anytime)
```

Full workflow with gate mock-ups: [`docs/architecture/part-a-workflow.md`](../docs/architecture/part-a-workflow.md) in the repo.

## Staying in scope — the skill-first rule

Inside a uxos project, Claude routes every UX task through the matching uxos skill instead of
general knowledge or another plugin's skill (routing table: `METHOD.md`, "Skill-first rule").
It names the skill it's using. When no uxos skill fits, it says so, uses general
capabilities, and labels that output `[outside uxos]`.

A `UserPromptSubmit` hook (`hooks/skill-first.sh`) restates the rule on every prompt, but only
when the project folder contains `uxos/`; elsewhere it prints nothing.
The same hook counts new commits on the main branch since the last `/uxos:sync` (one
read-only git call) and, if there are any, has Claude offer a sync before new work.

## Output — the `uxos/` model

```
uxos/
  README.md              domain.md              product-context.md
  user-groups.md         personas/<persona>.md  blueprint.md
  journeys/<id>.md        ux-matrix/<journey>.md
  problems.md            to-be-solved.md        patterns.md
  design-direction.md     requirements-gap.md    open-questions.md
  decisions/<id>.md       work-packages/<id>/...
```

Plain markdown + mermaid, git-tracked, hand-editable. This folder is the project memory —
the product never needs re-pasting into a chat.

If you give `/uxos:init` a **git URL** instead of a local repo path, it clones into
`uxos-repo-cache/` next to `uxos/` — a disposable read cache, not part of the model. Delete
it any time; it's recreated on the next extraction. Gitignore it in your own project if
`uxos/` is checked in.

## Structure

| Dir | What | Source |
|---|---|---|
| `commands/` | the `/uxos:*` slash commands (thin entry points) | hand-maintained |
| `skills/` | the procedures each command runs | generated from `../method/procedures/` |
| `agents/` | `context-extractor` (read-only crawl + research), `ux-critic` (challenge findings) | generated from `../method/procedures/` |
| `templates/` | artifact skeletons with the frontmatter contract | generated from `../method/templates/` |
| `METHOD.md` | the meta-process (phases, gates, honesty rules) | generated from `../method/orchestration.md` |

Generated files are rebuilt by `../scripts/build.sh` from `../method/`, the single source of
truth shared with the claude.ai `skill/` package. Don't hand-edit `skills/`, `agents/`,
`templates/`, or `METHOD.md`.
