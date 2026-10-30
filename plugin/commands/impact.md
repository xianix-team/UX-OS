---
description: Check what a requested design change really touches before making it — is it a token, how many places use it, should it change in one place or everywhere. Traces colours, type, spacing, radius, shadows, or whole components across patterns.md, code, Figma, and Claude Design, with contrast and drift checks. Read-only until you pick an option.
argument-hint: "\"<requested change, e.g. make the primary button darker blue>\""
---

Run a change-impact check for: `$ARGUMENTS`.

## Steps

1. If no change was given, ask what the client wants changed, where they saw it, and the
   new value if they have one.

2. Read `uxos/patterns.md`. If it's missing, say the analysis will be thin and offer
   `/uxos:patterns` first — or continue from code, Figma, or Claude Design alone if one of
   them is available.

3. Run the `change-impact` skill: resolve the target, trace every use, present the scope
   options with their blast radius, run the checks, and show the impact report. Nothing is
   edited before the designer picks an option.

4. Write `uxos/impact/<YYYY-MM-DD>-<slug>.md`.

5. **Before applying anything, check the designer's reply names an option:** `global`,
   `new-token`, `variant`, or `override`. If it doesn't — "option 1", "A", "the first one",
   "the recommended one", "go ahead" — your whole reply is one question: *"Which option:
   global, new-token, variant, or override?"* Then end your turn. Don't edit any file, and
   don't pick the option for them, even the recommended one.

6. Once an option is named, restate it in one line (what changes, how many uses) and apply
   it through `patterns.md` and the matching library command (`/uxos:code-library`,
   `/uxos:figma-library`, `/uxos:claude-design-library`).

7. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/impact.md`.
