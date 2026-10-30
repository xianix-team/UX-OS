---
name: problem-discussion
description: Run the ux-critic challenge over a drafted problems register — evidence vs assumption, real issue vs preference, honest severity, root-cause merges, persona differential — then apply the verdicts the designer accepts. Updates uxos/problems.md.
---

# problem-discussion

Goal: make the register honest and defensible, not longer.

## Method
1. Launch the `ux-critic` agent with `uxos/problems.md`, the matrices, and the personas.
2. It returns a verdict per row: `keep` / `downgrade to <sev>` / `mark needs-verification` /
   `merge into PRB-<id>` / `drop`, each with a one-line reason, plus an overall note
   (Assumption-tier count, severity-inflation pattern, clusters to merge).
3. Present the verdicts to the designer **inline**, grouped by verdict type. Let them accept
   or override each.
4. Apply accepted verdicts to `problems.md`: renumber if rows are dropped/merged, adjust the
   severity summary, update the candidate-routing table, move `needs-verification` items
   into the coverage-caveats note and `open-questions.md`.

## Principle
The critic does not invent problems or solutions. If the designer disagrees with a verdict,
their call stands — record a short note of the disagreement in the row so it is visible
later.
