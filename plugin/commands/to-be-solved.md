---
description: Run the scope gate (G2) -- assemble candidates (from the problems register on improve/revamp, or consolidated by theme on greenfield) and decide what's worth solving, with a response type per item.
---

Build or update `uxos/to-be-solved.md` -- the contract handed to Part B.

## Steps

0. Run the `code-sync` skill in **check** mode — silent unless the repo has new commits
   since the last sync; then it offers to sync first.

1. Determine which path applies:
   - `uxos/problems.md` exists → **improve/revamp path**. Read it and `uxos/user-groups.md`.
   - No `problems.md`, but confirmed `uxos/user-groups.md` + `uxos/personas/*.md` exist →
     **greenfield path**. Run the `problem-validation` skill first: extract pain points/
     goals/needs from the personas, consolidate by theme (not per-persona), assess
     severity/impact/dependencies, optionally phasing and success metrics.

2. Run the `to-be-solved` skill to assemble candidates:
   - **Improve/revamp:** `PROCESS`/compliance-bound problems → Business Goals / Compliances
     blocks. All other problems → pain points grouped by affected user group, source PRB
     ids. `Assumption`-tier items → pre-mark needs-verification.
   - **Greenfield:** business goals/compliance obligations from domain research → Business
     Goals / Compliances blocks. Consolidated themes from step 1 → pain points grouped by
     theme, each carrying severity/impact/dependencies.

3. **Gate G2.** For each candidate row, ask the designer: `yes` / `no` / `defer` /
   `needs-verification`. For each `yes`, set the **response type**: `content-fix` ·
   `pattern-adjustment` · `journey-improvement` · `journey-redesign` · `new-feature` ·
   `escalate`. Offer a suggestion (the candidate-routing table on improve/revamp; usually
   `new-feature` or `journey-redesign` on greenfield, since there's no existing journey to
   merely adjust) but let the designer choose.

4. Write `to-be-solved.md` with `grouping` set (`user-group` or `theme`), the decision +
   response type per item, a deferred list, and a needs-verification list mirrored into
   `open-questions.md`. Update `uxos/README.md`.

5. If the designer has a client-supplied requirements document (functional/non-functional),
   suggest `/uxos:requirements-gap` next — not required, but most useful right here before
   work fans out into journeys. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/to-be-solved.md`.
