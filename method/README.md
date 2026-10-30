# method/ — canonical source

This is the single source of truth for the UX Designer OS method. Both distributable
packages are built from it:

- `../plugin/` — the Claude Code plugin
- `../skill/` — the claude.ai skill

## Contents

| Path | What |
|---|---|
| `orchestration.md` | the meta-process — phases, gates, intake, honesty rules |
| `procedures/*.md` | the per-phase procedures (packaging-neutral; `{{TEMPLATES}}` is a build token) |
| `templates/*.md` | the blank artifact formats + `SCHEMA.md` |

`procedures/context-extract.md` and `procedures/ux-critique.md` are the source-scan and
challenge routines — used as subagents in the plugin, inlined as phases in the skill.

## Editing

Edit here, then run `../scripts/build.sh` to regenerate `plugin/skills/`,
`plugin/agents/`, `plugin/templates/`, `skill/SKILL.md`, `skill/phases/`, `skill/templates/`.
Do **not** hand-edit those generated files — changes there are overwritten.

Hand-maintained (not generated): `plugin/commands/`, `plugin/.claude-plugin/`,
`plugin/README.md`, `skill/README.md`.
