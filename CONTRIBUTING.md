# Contributing to UX Designer OS

Thanks for helping. uxos is a method first and a plugin second, so most contributions are
changes to how a procedure works — and those need to stay honest, traceable, and
designer-led. This guide covers how the repo is built, how to change it, and how to test a
change before you open a pull request.

By taking part you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

- **Report a bug** — something a command did wrong, skipped, or invented. Use the
  *Bug report* issue template and include the command, what you expected, what happened,
  and (if you can) the relevant part of your `uxos/` folder with client details removed.
- **Suggest a capability** — use the *Feature request* template. Say which designer
  problem it solves and where it fits in the flow (which phase, which command).
- **Improve a procedure or template** — a pull request against `method/`.
- **Improve the docs** — `README.md` and `docs/`.

Not sure whether something fits? Open an issue first; it saves rework.

## How the repo is built

`method/` is the **single source of truth**. Everything in `plugin/skills/`,
`plugin/agents/`, `plugin/templates/`, `plugin/METHOD.md`, and `skill/` is **generated**
from it by `scripts/build.sh`.

| Edit this | Not this |
|---|---|
| `method/procedures/<name>.md` | `plugin/skills/<name>/SKILL.md`, `skill/phases/<name>.md` |
| `method/templates/<name>.md` | `plugin/templates/`, `skill/templates/` |
| `method/orchestration.md` | `plugin/METHOD.md`, `skill/SKILL.md` |
| `plugin/commands/*.md` (hand-written) | — |
| `plugin/hooks/` (hand-written) | — |

After editing `method/`, always run:

```bash
bash scripts/build.sh
```

and commit the regenerated files together with your source change. A pull request where
`plugin/` or `skill/` disagrees with `method/` will be asked to rebuild.

See [`docs/architecture/architecture.md`](docs/architecture/architecture.md) for how the
pieces fit together.

## Rules every procedure follows

Changes must keep these intact — they are what makes uxos trustworthy:

- **Co-pilot, not autopilot.** Nothing is written to the model without the designer seeing
  it first; every phase ends at a review gate; next steps are suggested, never enforced.
- **Evidence over invention.** Every claim carries its source tag (`[observed-web]`,
  `[from code, file:line]`, `[designer]`…). Missing information is marked
  `needs decision` / `not evaluable` — never filled with a plausible guess.
- **Template is the contract.** Procedures read their template before writing and keep its
  headings and frontmatter exactly; downstream tools parse them.
- **Read-only on the product.** No submitting, purchasing, logging in, or changing a
  designer's repo outside an isolated prototype branch.
- **Skill-first.** Project work goes through a uxos procedure when one exists.

## Making a change

1. Fork and create a branch from `main`.
2. Edit `method/` (and `plugin/commands/` if a command changes). Keep the writing style of
   the surrounding files: short sections, imperative steps, explicit "never" rules.
3. Run `bash scripts/build.sh`.
4. **Bump the version** in `plugin/.claude-plugin/plugin.json` — `claude plugin update`
   only picks up a change when the version changes. Patch for fixes, minor for new
   capabilities.
5. Add an entry to [`CHANGELOG.md`](CHANGELOG.md) under *Unreleased*.
6. Validate and test (below).
7. Open a pull request using the template.

## Testing a change

Validate the plugin:

```bash
claude plugin validate plugin
```

Then run the commands you touched against a small fixture project — a scratch folder with
a hand-written `uxos/` (and a tiny git repo if the procedure reads code). Headless runs are
the fastest way:

```bash
claude -p '/uxos:<command> <args>' --plugin-dir ./plugin --add-dir ./plugin --permission-mode acceptEdits --output-format text
```

- `--add-dir ./plugin` matters: without it, the run can't read the plugin's templates and
  will improvise their shape — a false failure.
- Continue a multi-step command with `--continue` and your reply.
- Check the output against the template (headings, frontmatter), the evidence rules, and
  the stop points (did it wait where the procedure says to wait?).

Describe the fixture and what you checked in the pull request. More detail:
[`docs/guides/testing-the-plugin.md`](docs/guides/testing-the-plugin.md).

## Commit messages

One line summary with the version when it changes, e.g.
`Change impact: check a design change before it lands (v0.25.0)`, then a short body on what
changed and how it was tested.

## Questions

Open a GitHub issue or discussion. For conduct concerns, see the
[Code of Conduct](CODE_OF_CONDUCT.md).
