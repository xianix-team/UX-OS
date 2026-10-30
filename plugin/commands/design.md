---
description: Hand off a confirmed journey to a Claude Design canvas, a functional prototype in the repo (routes, mock data, enforced rules, state switcher), Figma, or a design-prompt document for Stitch/another tool. The wireframing/handoff step of the solve loop.
argument-hint: "<journey id> [claude-design|code|figma|prompt]"
---

Hand off journey `$ARGUMENTS` for design.

## Steps

0. Run the `code-sync` skill in **check** mode — silent unless the repo has new commits
   since the last sync; then it offers to sync first.

1. Read `uxos/journeys/<id>*.md` — must be `state: proposed` (confirmed by `journey-design`).
   If it's still a draft, tell the designer to confirm it first. Read `uxos/patterns.md`;
   if it doesn't exist, tell the designer to run `/uxos:patterns` first.

2. Determine the target from `$ARGUMENTS`, else from `design_tools` in
   `product-context.md`, else ask: **Claude Design** (canvas), **code** (functional
   prototype in the repo), **Figma** (direct), or **design prompt** (Stitch/other). Read
   `design_master` — the skill's paths follow it.

3. Run the `design-handoff` skill for the chosen path:
   - **Figma:** confirm the Figma connector is authorized first — if not, tell the
     designer to authorize it (claude.ai connector settings, or `/mcp` in an interactive
     Claude Code session) and stop. If no Figma file exists yet, point at
     `/uxos:figma-library` first. Then load the `figma-generate-design` skill (and
     `figma-use`) and follow the Figma path — one screen at a time, confirming each with
     the designer before the next.
   - **Claude Design:** check the Artifact tool is available — if not, say so and offer the
     other targets. Attach the Claude Design System from `handoff/design-system.md`; if
     none, offer `/uxos:claude-design-library` first. If the journey already has a canvas,
     read its comments and revise it — each comment becomes a model change or a reasoned
     no-change. One canvas per journey (optionally 2–3 directions for the key screen
     first): an artboard per screen and per state from the screen spec, labelled with steps
     and unit ids, rule values from `business-rules.md` — one screen at a time, confirming
     each. When the designer approves it, mark the handoff `status: approved`.
   - **Prompt:** draft the per-step design prompts grounded in `patterns.md`, present for
     confirmation, then write them.
   - **Code:** real local repo only (not the disposable `uxos-repo-cache/`). Read the
     `code-build-contract` first. Isolate the prototype — clean tree, new branch, its own
     route or flag, mock fixtures. If no component library exists (or it lacks what the
     journey needs), point at `/uxos:code-library` first. Build from the Figma frames via
     `figma-design-to-code` if a Figma file exists. One screen at a time, composed only from
     library components; **after each screen run the audit** (inline styles, raw colours,
     magic values, styling in screens, components defined in screens…), fix findings — they
     block confirmation unless you record an override — run the prototype and show you the
     files and the result. Make it **functional**: real routes, fixtures shaped by the
     units' Data tables, business rules enforced from one `BR` constants file, a
     prototype-only state switcher for every spec'd state, `data-unit` / `data-ac` markers.
     On `design_master: code`, if library components changed, suggest `/uxos:mirror`.

4. Write `uxos/handoff/<id>.md` (Figma, Claude Design, or code) or `uxos/design-prompts/<id>.md` (prompt).

5. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/handoff.md`,
`${CLAUDE_PLUGIN_ROOT}/templates/design-prompt.md`.

Note: the Figma path needs the Figma MCP connector authorized in your own session, and
benefits from the `figma` plugin's skills being available — this command doesn't bundle
them. The code path needs a real local checkout of the product's repo.
