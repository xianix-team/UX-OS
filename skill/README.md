# uxos — claude.ai Skill

The UX Designer OS method packaged as a **Claude Skill** for claude.ai chat. No install for
the designer once it's shared — they type `/uxos` (or "analyse this product: …") in any
conversation.

**Generated from `../method/` — do not hand-edit `SKILL.md`, `phases/`, or `templates/`.**
Edit `../method/`, run `../scripts/build.sh`.

## Contents
| Path | What |
|---|---|
| `SKILL.md` | frontmatter + the method orchestration (phases, gates, intake, honesty rules) |
| `phases/*.md` | the per-phase procedures — `SKILL.md` reads the relevant one at each phase |
| `templates/*.md` | blank artifact formats + `SCHEMA.md` |

## How it differs from the plugin
- **No `uxos/` folder.** Each phase produces **one artifact**; together they are the
  project model. Resume by pasting artifacts back, or keep them in a Project's knowledge.
- **No subagents.** `phases/context-extract.md` and `phases/ux-critique.md` are inline
  routines the model follows itself.
- Runs anywhere claude.ai runs — web or desktop app.

## Install / distribute
1. `cd skill && zip -r ../uxos-skill.zip .`
2. claude.ai → **Settings → Capabilities → Skills → Upload** (Pro/Max), or a Team/Enterprise
   admin uploads it for the workspace.
3. Designers then use `/uxos` in any chat.

## Limits vs the plugin
No persistent file model, no repo code-reading depth, no browser-driven computed-style
extraction (relies on claude.ai's own browsing + designer-supplied screenshots/tokens).
Good for the analysis and planning; the plugin is better when a codebase is in play.
