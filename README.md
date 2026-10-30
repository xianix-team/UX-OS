# UX Designer OS (uxos)

**A co-pilot for professional UX and product designers, inside Claude Code.** uxos builds a
persistent model of the product you're designing — domain, users, journeys, problems,
patterns, business rules — and carries you from understanding the product to a functional
prototype and a development handoff, without rebuilding context every session.

It works for **brownfield** (an existing product: web, iOS, Android, desktop) and
**greenfield** (starting from scratch).

> Co-pilot, not autopilot: every step ends at a review gate, nothing is written to the
> model without you seeing it, every claim carries its evidence, and uxos suggests next
> steps but never forces a sequence.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## What it does

- **Understands the product** — crawls a live URL, a repo, a running app, screenshots, or
  your existing documents (`/uxos:import`), and drafts the domain, user groups, personas,
  feature map, and journeys for you to confirm.
- **Finds and scopes problems** — UX matrices per journey, a problems register challenged by
  a critic agent, and a scope gate deciding what's worth solving. Optional competitor
  analysis mapped onto your own feature map.
- **Designs the solution** — journeys with How / Why / Technical delight per step, edge
  cases, screen specs, business rules in one register.
- **Prototypes it** — in **Claude Design** canvases and as a **functional prototype in your
  codebase** (real routes, mock data, enforced business rules, every state reachable),
  built from one atomic design system with no inline styling. Figma and design prompts for
  Stitch are supported too.
- **Hands off to development** — **Units**: Who / Why / What / How with Given-When-Then
  acceptance criteria, the single input for engineering, QA, and AI-DLC agents.
- **Stays current** — syncs with what developers actually build, checks the impact of a
  design change before it lands, and keeps Claude Design and code in step.

## Quick start

Requires [Claude Code](https://claude.com/claude-code).

```
/plugin marketplace add rasikain/ux-os
/plugin install uxos@uxos-marketplace
```

Then, in your workspace or product repo:

```
/uxos:init
```

The first question is **brownfield or greenfield**. Already have personas, a feature map,
journeys, or an audit? Run `/uxos:import <file or folder>` first — uxos adopts them and
generates only what's missing. Anytime: `/uxos:status` shows where the project stands and
what to do next.

Full walkthrough: [**docs/guides/quick-start.md**](docs/guides/quick-start.md).

## How it flows

```
Understand            Scope                 Solve                        Build & hand off
──────────            ─────                 ─────                        ────────────────
init / import    →    problems         →    journey-design          →    design (Claude Design /
domain, users,        (brownfield)          edge-cases                     code prototype / Figma)
feature map,          competitors           screen-spec                  promote · mirror
journeys, patterns    (optional)            business rules               requirements (Units)
                      to-be-solved (G2)                                  sync · impact
```

| Stage | Commands |
|---|---|
| Set up | `/uxos:init` · `/uxos:import` · `/uxos:status` |
| Brownfield analysis | `/uxos:journeys` · `/uxos:matrix <J>` · `/uxos:patterns` · `/uxos:problems` |
| Greenfield direction | `/uxos:to-be-solved` · `/uxos:requirements-gap` · `/uxos:design-direction` · `/uxos:patterns` |
| Scope | `/uxos:to-be-solved` · `/uxos:competitors` (optional) · `/uxos:feature-mapping <feature>` · `/uxos:blueprint` |
| Solve | `/uxos:journey-design <J>` · `/uxos:edge-cases <J>` · `/uxos:screen-spec <J>` |
| Design system | `/uxos:claude-design-library` · `/uxos:code-library` · `/uxos:figma-library` |
| Design & prototype | `/uxos:design <J> [claude-design\|code\|figma\|prompt]` · `/uxos:promote` · `/uxos:mirror` |
| Dev handoff | `/uxos:requirements <J>` (Units) |
| Keep current | `/uxos:sync [repo]` · `/uxos:impact "<change>"` |

The recommended design setup is **Claude Design + a functional prototype in code**: on
greenfield, design starts in Claude Design and `/uxos:promote` moves it into code once
approved; from then on code is the single master and Claude Design mirrors it (you run
`/design-sync`; `/uxos:mirror` verifies and brings canvas changes back through the right
checks). Figma paths need the Figma connector authorized in your session; the code path
needs a real local checkout of the repo.

Everything uxos produces is a git-tracked `uxos/` folder in your project. Team-wide: commit
[`docs/guides/team-settings.example.json`](docs/guides/team-settings.example.json) as
`.claude/settings.json`.

## Two packages

| Package | For | Install |
|---|---|---|
| **Claude Code plugin** ([`plugin/`](plugin/README.md)) | designers in a terminal or VS Code | the marketplace commands above |
| **claude.ai Skill** ([`skill/`](skill/README.md)) | designers and POs in claude.ai chat | `cd skill && zip -r ../uxos-skill.zip .`, upload in claude.ai → Settings → Capabilities → Skills; then type `/uxos` |

The Skill has no filesystem: it produces one artifact per phase instead of a `uxos/`
folder.

## Repo layout

| Path | What |
|---|---|
| [`method/`](method/README.md) | **single source of truth** — orchestration, procedures, templates |
| [`plugin/`](plugin/README.md) | Claude Code plugin, generated from `method/` (commands and hooks are hand-written) |
| [`skill/`](skill/README.md) | claude.ai Skill, generated from `method/` |
| [`scripts/build.sh`](scripts/build.sh) | regenerates `plugin/` and `skill/` from `method/` |
| [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json) | makes this repo an installable plugin marketplace |
| [`docs/guides/`](docs/guides/) | [quick start](docs/guides/quick-start.md), [testing the plugin](docs/guides/testing-the-plugin.md), team settings |
| [`docs/architecture/`](docs/architecture/) | [architecture](docs/architecture/architecture.md), [Part A workflow](docs/architecture/part-a-workflow.md), process diagrams |
| [`docs/background/`](docs/background/) | the original product intent, context, users, and personas behind uxos |

## Status

- **Part A (understand and scope)** — built, brownfield and greenfield.
- **Part B (solve and build)** — journey design, edge cases, screen specs, Units,
  design systems (Claude Design, code, Figma), design handoff and functional prototypes,
  promote and mirror, code sync, change impact — built. Solution testing is not built yet.

See [CHANGELOG.md](CHANGELOG.md) for what changed in each version.

## Contributing

Contributions are welcome — bug reports, procedure improvements, docs. `method/` is the
single source; edit it, run `bash scripts/build.sh`, and test against a fixture. Read
[CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request, and follow the
[Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © 2026 Rasika Mahindasiri
