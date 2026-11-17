# method/ — canonical source

This is the single source of truth for the UX Designer OS method. The Claude Code plugin
(`../plugin/`) is built from it, and the MCP server (`../mcp/`) serves that plugin's skills.
The claude.ai skill (`../skill/`) is frozen at 0.35.0 and no longer built from here.

## Contents

| Path | What |
|---|---|
| `orchestration.md` | the meta-process — phases, gates, intake, honesty rules |
| `procedures/*.md` | the per-phase procedures (packaging-neutral; `{{TEMPLATES}}` is a build token) |
| `templates/*.md` | the blank artifact formats + `SCHEMA.md` |

`procedures/context-extract.md` and `procedures/ux-critique.md` are the source-scan and
challenge routines — used as subagents in the plugin.

## Editing

Edit here, then run `../scripts/build.sh` to regenerate `plugin/skills/`,
`plugin/agents/`, `plugin/templates/`, and `plugin/METHOD.md`.
Do **not** hand-edit those generated files — changes there are overwritten.

Hand-maintained (not generated): `plugin/commands/`, `plugin/.claude-plugin/`,
`plugin/README.md`, `plugin/hooks/`, `mcp/`.
