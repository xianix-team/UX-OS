---
name: problems-register
description: Turn UX Matrix findings (and pattern-study inconsistencies) into a single prioritised problems register — a table per severity with location, type, evidence tier, affected personas, and a proposed recommended direction. Writes uxos/problems.md.
---

# problems-register

Goal: one ranked, traceable list of everything wrong, each row defensible to a stakeholder.

## Build rows
One row per distinct problem, drawn from `ux-matrix/*` findings and `patterns.md` `PAT-`
rows. Columns:
- `id` — `PRB-01…`, ordered by severity.
- `severity` — Critical / High / Medium / Low, per the rubric in the template.
- `summary` — one line, the defect (not the fix).
- `location` — `J<n> / P<k> (jN:H#)` — journey, phase, and the source matrix cell.
- `type` — `HEU-<n>` (Nielsen #), `IA`, `IXD`, `CONTENT`, `DATA`, `PROCESS`, `A11Y`. Multiple allowed.
- `evidence` — `Observed` / `DOM` / `Policy` / `Assumption`.
- `affected` — persona segments, with differential if relevant.
- `recommended direction` — a proposed direction, **one line**, NOT a decided solution:
  - `Observed`/`DOM`/`Policy` → a concrete direction.
  - `Assumption` → `Verify first. Likely: …`.
  - policy-bound → prefix `Policy-dependent.`

## Consolidate
Merge rows with the same root cause; name the cause. Keep per-journey location if severity
or persona differs.

## Sections
Severity tables · coverage caveats (which evidence lenses were empty, which phases were not
evaluable, which PRBs are Assumption-tier) · severity summary counts · **candidate routing**
table (cluster → likely response type) · the "how this feeds to-be-solved" note.

## Output
`uxos/problems.md` from the template. This skill drafts; `problem-discussion` (ux-critic)
challenges before it is final.
