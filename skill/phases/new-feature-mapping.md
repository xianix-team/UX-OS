---
name: new-feature-mapping
description: For a proposed new feature, establish why it's needed (the driver), then place it in the product — journey touchpoints (create/consume/manage) and a blueprint home — and run a conflict check against existing patterns, status models, entitlements, and constraints. Writes feature-mapping/<slug>.md. The add-feature objective's distinctive step. Interactive — confirms with the designer at every stage rather than running straight through.
---

# new-feature-mapping

Goal: connect a requested feature seamlessly to the existing product. Where it's placed
follows from *why* it's needed — establish the driver first, then let it decide placement.

## How to run this — stop at every stage

**Do not run straight through and hand back a finished document.** Work one stage at a
time. At the end of each stage below, present your draft for *that stage only* and stop.
Where more than one answer is plausible, present it as **numbered options** with your
recommendation marked, not a single silent choice. Wait for the designer to confirm, pick
an option, or correct you before moving to the next stage. Only write the output file after
stage 5 is confirmed.

## Prerequisite
Run `pattern-study` first if not already done — placement and the conflict check both need
the current pattern inventory.

## Stage 1 — Why (the driver)
Classify the request:
- **user pain / goal / need** — tie to a specific user group + persona; cite a `PRB-` id if
  one already exists, or the designer's own observation
- **new business requirement**
- **compliance / regulatory**
- **stakeholder-driven, unvalidated** — a valid classification; don't block on it, but say
  so plainly. "A competitor has it" with no user need behind it lands here: competitor
  parity is supporting evidence, not a driver. If `competitors.md` exists, cite what it
  shows (how many competitors, evidence); if not, suggest `/uxos:competitors` as an
  optional check

**Present:** "I read this as `<driver type>` because `<reason>`." If a case could
plausibly be read more than one way, list the candidates with your pick marked, e.g.
`1. user pain (PRB-14) [recommended]  2. business requirement`. Ask the designer to confirm
or pick differently. **Stop here for confirmation.**

## Stage 2 — What (capability sketch)
Draft two or three sentences: what the feature lets a user do.

**Present:** the sketch. Ask the designer to confirm or adjust. **Stop here.**

## Stage 3 — Where (placement)

**Blueprint home** — list the plausible options (new capability under an existing area /
new area under an existing surface / new surface implying a new-or-expanded user group),
mark your recommendation, and say why.

**Journey touchpoints** — every feature attaches at up to three points, each pinned to a
real journey step (or naming a brand-new journey): `create` (triggered/entered/saved),
`consume` (surfaced/used), `manage` (edited/reviewed). Propose the touchpoint set with the
specific journey + step for each, and name the primary create point.

**Present:** the blueprint-home options (numbered, recommendation marked) and the proposed
touchpoint table. Ask the designer to confirm, pick an option, or move a touchpoint
elsewhere. **Stop here.**

## Stage 4 — Conflict / consideration check
Walk these against the confirmed placement, recording only what actually applies:
- an existing pattern (from `patterns.md`) to reuse instead of introducing something new
- PII / consent / retention implications
- a clash with an existing status model, entitlement rule, or workflow
- hard constraints (limits, cut-offs, quotas) that bound the design

A conflict that reveals a new driver (e.g. a PII finding implies a compliance driver) is a
**sub-driver** — name it, don't silently absorb it into stage 1's answer.

**Present:** each conflict found (or "none found"), and any sub-driver it surfaces. Ask the
designer whether each changes scope, needs resolving before design, or can proceed as-is.
**Stop here.**

## Stage 5 — Downstream
Summarise, from the confirmed stages 1–4:
- the blueprint node to add
- which existing journeys flip to `proposed` (and at which step), plus any brand-new
  journey needed
- what goes into `open-questions`
- **response type**: `new-feature`

**Present:** this summary as the final draft of `feature-mapping/<slug>.md`. Ask the
designer to confirm before writing. **Stop here.**

## Output
Only after stage 5 is confirmed: write `uxos/feature-mapping/<slug>.md` from
`templates/feature-mapping.md`. Then run `next-steps`.
