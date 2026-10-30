---
description: Keep Claude Design and the code in step, either direction, with one master. Push — after code changes, prompts you to run /design-sync and verifies Claude Design matches. Pull-back — finds what changed on Claude Design canvases or the system and routes each change through impact / code-library / design-handoff so it lands in code first.
argument-hint: "[push | pull | verify]"
---

Mirror Claude Design and the code. Mode (optional): `$ARGUMENTS`.

## Steps

1. Read `design_master` in `uxos/product-context.md` and `uxos/handoff/design-system.md`
   (`claude_design_url`, `mirrored_commit`). Not set → ask, and record it.

2. No mode given → decide: code library or prototype changed since `mirrored_commit` →
   **push**; a canvas or its comments newer than its handoff revision log → **pull**; both →
   pull first (so canvas decisions reach the code), then push. Say which and why.

3. Run the `design-mirror` skill in that mode:
   - **push / verify** — ask the designer to run `/design-sync` in Claude Code (uxos can't
     start it), then read the system's `project/tokens.json` and components and compare
     with the code. Report mismatches; never patch the system by hand.
   - **pull** — read canvases, comments, and (if unlocked) the system; present the
     pull-back report with each change's route; apply only accepted items through their
     procedures; then push.
   - On `design_master: claude-design`, explain there is nothing to mirror yet — changes go
     straight into Claude Design — and point at `/uxos:promote` when canvases are approved.

4. Update `mirrored_commit` / `mirrored_at` and the log in `uxos/handoff/design-system.md`.

5. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/handoff.md`.
