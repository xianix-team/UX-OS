---
description: Show where the uxos project stands and suggest next steps. Safe to run anytime; writes nothing.
---

Report the state of the `uxos/` model in the current working directory.

## Steps

0. Run the `code-sync` skill in **check** mode, report-only: include the number of new
   commits since the last sync in the status, never prompt.

1. Read `uxos/README.md` and scan the model dir. Do not modify anything.

2. Print a compact status:
   - project slug · when the model was last modified
   - artifact counts: journeys, matrices, problems (by severity)
   - to-be-solved: in scope / needs-verification / deferred
   - open questions: unresolved count
   - any obvious inconsistency (e.g. a key journey with no matrix; a `yes` to-be-solved item
     with no response type; PRBs with no matrix cross-ref)

3. Run the `next-steps` skill and present its ranked, non-binding block.

If there is no `uxos/` here, say so and suggest `/uxos:init`.
