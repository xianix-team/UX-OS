---
artifact: to-be-solved
project: <slug>
status: draft
derived_from: <problems.md | problem-validation>
grouping: <user-group | theme>
feeds: work-packages/
---

# To-Be-Solved List — <product name>

The scope contract. Business goals + compliances flow through by default; each candidate
item needs an explicit decision. `response_type` is set here and drives Part B. Grouping
below depends on how the candidates were found — `user-group` when derived from a UX Matrix
(improve/revamp), `theme` when consolidated from greenfield persona research
(`problem-validation`). Either way every row still carries the same decision mechanics.

## Business Goals
1. <goal> — from PRB-<id(s)> or domain research

## Compliances
1. <obligation> — from PRB-<id(s)> or domain research

<!-- GROUPING: user-group — use this block when grouping: user-group -->
## Pain points, goals & needs — by user group

### UG1 — <group name>
| # | Pain / goal / need | Source PRBs | To be solved? | Response type |
|---|---|---|---|---|
| 1 | <one line> | PRB-<ids> | yes / no / defer / needs-verification | <content-fix / pattern-adjustment / journey-improvement / journey-redesign / new-feature / escalate> |

### UG2 — <group name>
| # | Pain / goal / need | Source PRBs | To be solved? | Response type |
|---|---|---|---|---|

<!-- GROUPING: theme — use this block instead when grouping: theme (greenfield) -->
## Pain points, goals & needs — by theme

### Theme 1 — <theme name>
**Severity:** <Critical/High/Medium/Low> · **Impact:** <who's affected> · **Depends on:** <other themes, or none>
**Phase:** <Core / Enhancement / Optimization — optional> · **Success metric:** <measurable target, only if genuinely meaningful>

| # | Pain / goal / need | To be solved? | Response type |
|---|---|---|---|
| 1 | <one line> | yes / no / defer / needs-verification | <new-feature / escalate / ...> |

### Theme 2 — <theme name>
...

## Deferred / not now
- <item> — <reason>

## Needs verification before deciding
- <item> — <what to confirm, with whom> (also in open-questions.md)
