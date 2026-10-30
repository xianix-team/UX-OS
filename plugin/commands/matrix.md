---
description: Build or update a UX Matrix for one journey — phases as columns, Nielsen + IxD/IA rows filled from what's observable, evidence rows left for the user.
argument-hint: "<journey id, e.g. J3>"
---

Build the UX Matrix for journey `$ARGUMENTS`.

## Steps

1. Read `uxos/journeys/<id>*.md`, the linked personas, and `uxos/product-context.md`.
   If the journey doc does not exist, tell the user to run `/uxos:journeys` first. Since
   step 2 evaluates live screens, run the `browser-preflight` skill first if a live URL is
   set — no browser means every phase would be unevaluable, and the designer should know
   that before starting, not after.

2. Run the `ux-matrix` skill:
   - Propose ~5–7 **phases** as columns (collapse micro-steps); get the user's confirmation.
   - Fill the **Usability heuristics (Nielsen 10)** row and **Other (IxD / IA)** row for
     every phase you can actually reach — via the browser if a live URL is set.
   - Mark gated phases `⚠ not evaluable — needs access`. If test credentials exist, ask the
     user to sign in (they drive it) and continue.
   - Leave **Analytics / Business data / User tests** rows empty (`—`). Never fabricate them.
     If the user has any of that data, let them paste it into the cells.
   - Number findings (`H1`, `O1 [IA]`…), give each an estimated severity and an evidence note.

3. Write `uxos/ux-matrix/<id>-<slug>.md`. Add coverage gaps to `open-questions.md`.

4. Run the `next-steps` skill and present its block (it should notice which key journeys
   still lack a matrix).

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/ux-matrix.md`.
