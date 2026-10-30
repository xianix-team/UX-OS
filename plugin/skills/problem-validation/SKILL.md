---
name: problem-validation
description: Greenfield's left-side analysis — consolidate pain points, goals, and needs extracted from personas into problem domains/themes (not per-persona, to avoid duplicating a cross-cutting issue across every persona it touches), with severity, impact, dependencies, and optional phasing and success metrics. Feeds to-be-solved.md in theme-grouping mode. The greenfield counterpart to ux-matrix+problem-discussion (improve) and pattern-study+new-feature-mapping (add-feature).
---

# problem-validation

Goal: turn what domain research and personas surfaced into a structured, prioritised set of
problems to solve — for a product that doesn't exist yet, so there's no UX matrix to derive
problems from. Organized by **theme**, not by persona, because a cross-cutting problem
(e.g. "Communication & Coordination") usually affects several personas at once; grouping by
persona would duplicate it across each one.

## Prerequisite
`domain.md` and confirmed `user-groups.md` + `personas/*.md` must exist (`capture-users`,
including its candidate-selection gate). This is a consolidation step, not a research step
— it doesn't go back to the domain for new findings.

## Extraction
From each confirmed persona, pull out:
- **Pain points** → candidate problems
- **Goals** → candidate goals
- **Needs** → candidate capabilities/tools required

Group similar items across personas and de-duplicate — the same underlying problem stated
differently by two personas is one problem, not two.

## Organize by theme, not persona
Cluster the de-duplicated items into **problem domains** that emerge from what was actually
found — don't force them into a fixed taxonomy. Typical shapes: a workflow stage
(Scheduling, Approval), a cross-cutting concern (Communication, Data Visibility,
Accountability), or a constraint area (Compliance, Budget/Resource Tracking,
Accessibility). 2-3 themes is too coarse for most products; more than 10-12 is probably
under-consolidated — merge themes with only one or two items into a related one.

For each theme: Problems to Solve · Goals to Achieve · Needs to Meet.

## Prioritise
For each theme, assess:
- **Severity** — Critical / High / Medium / Low: what happens if this goes unsolved?
- **Impact** — who's affected (all users, one user group, management/ops level)
- **Dependencies** — which other themes must be solved first

Optionally: **phasing** (Core / Enhancement / Optimization) and **success metrics** per
theme (a measurable target, only if one is genuinely meaningful — don't invent a number to
look rigorous).

## Output
Feeds `uxos/to-be-solved.md` with `grouping: theme` (see its template) — Business Goals and
Compliances sections populate the same way as always; the pain-points section uses the
theme structure above instead of per-user-group. Each item still gets the designer's
`yes/no/defer/needs-verification` decision and response type at gate G2 — grouping is
presentation, the decision mechanics are unchanged. Then run `next-steps`.
