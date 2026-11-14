---
description: Not happy with a screen? Generate eight genuinely different directions for it, Crazy 8s style — as a workshop (people sketch, uxos captures) or by AI (eight screens, each varying a different dimension). Rough grey-box wireframes on one page; you pick one or combine parts, and nothing reaches the model or the design system until you confirm.
argument-hint: "<journey id> <screen name>"
---

Run a Crazy 8 for `$ARGUMENTS`.

## Steps

1. Read the screen's block in `uxos/screen-specs/<journey>.md`, its journey, its design
   record (`uxos/design-records/<journey>.md` — comments, revision log, parity), the
   persona, the to-be-solved item, and the `BR-<n>` rules it uses. If there's no screen spec,
   say so and offer `/uxos:screen-spec` first, or work from the journey step.

2. Run the `crazy8` skill:
   - **Frame:** the brief and a "How might we…?" — **stop for confirmation**.
   - **Mode:** ask **workshop** or **AI**.
     - Workshop: give the exercise, stay quiet while they sketch, then read their uploaded
       photos or descriptions into cards and group duplicates. Offer uxos's eight only after.
     - AI: eight directions, each varying a different dimension — layout, interaction model,
       priority, disclosure, entry point, metaphor, density, one rule broken on purpose.
   - **Show:** one page of grey-box panels, `sketches.html`, with the record in `session.md`,
     both in `uxos/crazy8/<date>-<journey>-<screen>/`.
   - **Choose:** the designer picks or combines; restate it, draw it as a ninth panel —
     **stop for explicit confirmation**.

3. **Before the choice is confirmed, write nothing** except the session folder: no design
   system, no `patterns.md`, no screen spec, no journey, no code. Check before showing the
   page: every panel is grey-box (no colours, tokens, or components from the design system),
   and the eight differ in kind, not in polish.

4. After confirmation, show and then apply: the screen spec's Composition (and anything else
   the choice changed), the journey if the flow changed, and the session in the design record.

5. Run the `next-steps` skill — it should point at `/uxos:design` for the chosen screen.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/crazy8.md`.
