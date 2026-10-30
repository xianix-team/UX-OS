---
description: Cross-check a client-supplied requirements document (functional + non-functional) against to-be-solved.md, both directions, plus an NFR sweep. Optional -- only relevant when a client document actually exists.
argument-hint: "[path to or pasted client requirements doc]"
---

Run a requirements gap analysis against `$ARGUMENTS`.

## Steps

1. Read `uxos/to-be-solved.md`. If it doesn't exist, tell the designer to run
   `/uxos:to-be-solved` first.

2. Get the client's requirements document — from `$ARGUMENTS`, or ask for it (a path, or
   paste it). If there genuinely isn't one, say this step doesn't apply and stop.

3. Run the `requirements-gap-analysis` skill: extract and classify the client's requirements
   (functional / non-functional), check client → to-be-solved, check to-be-solved →
   client, run the fixed NFR sweep. Present the whole report at once.

4. For each flagged row, get the designer's decision — add to `to-be-solved.md` (with a
   response type), raise with the client via `open-questions.md`, or dismiss with a reason.
   Apply accepted additions to `to-be-solved.md`.

5. Write `uxos/requirements-gap.md`.

6. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/requirements-gap.md`.
