---
description: Write a journey up as development Units — Who / Why / What / How with Given-When-Then acceptance criteria — the single handoff to engineering, QA, and AI-DLC agents.
argument-hint: "<journey id>"
---

Write the development Units for journey `$ARGUMENTS`.

## Steps

0. Run the `code-sync` skill in **check** mode — silent unless the repo has new commits
   since the last sync; then it offers to sync first.

1. Read `uxos/journeys/<id>*.md`. If it doesn't exist, tell the designer to run
   `/uxos:journeys` or `/uxos:journey-design` first.

2. Check the other sources and say which are missing: `screen-specs/<id>.md` (offer
   `/uxos:screen-spec`), `edge-cases/<id>.md` (offer `/uxos:edge-cases`). Both are
   non-blocking; missing ones are noted on the units and lower readiness.

3. Run the `requirements-drafting` skill:
   - Propose the slicing (unit titles + steps each covers) and wait for the designer's OK.
   - Then draft every unit in full and present the whole file at once; take corrections
     by unit id.

4. Before presenting and before writing, check the draft:
   - **Readiness:** go through each unit. Any `needs decision` in it means `Readiness:
     not-ready`, whatever the reason, and the unit goes under **Blocked** in Start here with
     what blocks it. Update `ready_units`, the Unit index, and the Summary to match. Saying
     "ready to start" or "non-blocking" about a unit with one of these is wrong.
   - **Gaps stay visible:** never drop a `needs decision` to make a unit ready. Before setting
     readiness, check every Data row, state message, and rule against its source. A format,
     limit, message, or behaviour the model doesn't state is `needs decision` and is listed
     under Open questions, not `—`, not "see Left to wire", and not a plausible statement such
     as "validated by the payment provider". Left to wire only names the integration.
   - **Design system line:** read `uxos/design-records/design-system.md` and `code-library.md`
     if they exist, and state where the library lives. Say "no code library yet" only if they
     don't record one.
   - **Start here** has only the template's lines; other notes go in the Summary.
   - **Developers:** the design record appears only under Sources.

5. Write `uxos/requirements/<id>.md`.

6. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/requirements.md`.
