---
description: Derive the problems register from the UX matrices, run the ux-critic challenge, and write problems.md with severity, location, type, evidence, affected, and a recommended direction.
argument-hint: "[journey id to scope to, e.g. J3]"
---

Build or update `uxos/problems.md`.

## Steps

1. Read every `uxos/ux-matrix/*.md` (or just the one for `$ARGUMENTS` if given), plus
   `uxos/patterns.md` if it exists (its inconsistency register contributes rows).

2. Run the `problems-register` skill:
   - Turn each matrix finding into a row: `id`, `severity` (rubric in the template),
     `summary`, `location` (`J<n> / P<k> (jN:H#)`), `type` (`HEU`+#, `IA`, `IXD`, `CONTENT`,
     `DATA`, `PROCESS`, `A11Y`), `evidence` (`Observed`/`DOM`/`Policy`/`Assumption`),
     `affected` personas, `recommended direction`.
   - Recommendation follows the evidence tier: concrete for `Observed`/`DOM`/`Policy`;
     "Verify first. Likely: …" for `Assumption`; "Policy-dependent." for policy-bound.

3. Run the `problem-discussion` skill, which launches the `ux-critic` agent. Show its
   verdicts inline and apply the ones the user accepts (downgrade / mark needs-verification
   / merge / drop).

4. Write `problems.md` with the severity tables, coverage caveats, a severity summary, and
   the **candidate routing** table (cluster → likely response type).

5. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/problems.md`.
