---
description: Take a rough idea as far as mockups without it becoming part of the product. Same steps as any other work, saved in uxos/rough-ideas/ and flagged "idea:"; after seeing the mockups you decide to go ahead, park, or discard.
argument-hint: "[the idea, or the name of one]"
---

Work on an idea: `$ARGUMENTS`.

## Steps

1. If there is no `uxos/` here, say so and suggest `/uxos:init`.

2. Run the `idea` skill. If `$ARGUMENTS` names an existing idea in `uxos/rough-ideas/`,
   offer to carry on with it or decide on it. If it describes a new idea, start one, and
   still say back what you understood and confirm it. Otherwise ask what they want:
   1. Start a new idea
   2. Carry on with an idea
   3. Decide on an idea: go ahead, park, or discard
   4. List ideas

3. For each step of the route, run that step's own skill (`new-feature-mapping` or
   `to-be-solved`, `build-blueprint`, `journey-design`, `screen-specification`,
   `design-handoff`) in full, saving where the `idea` skill says. Show every file before
   saving and save only on a yes.

4. While it's an idea, don't run edge cases, requirements or a dev handoff, and don't add
   anything to the design system, `patterns.md`, or the product's code.

5. Run the `next-steps` skill.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/idea.md`.
