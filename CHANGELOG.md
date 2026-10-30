# Changelog

All notable changes to UX Designer OS. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/) — the version is the `version` in
`plugin/.claude-plugin/plugin.json`. Pre-1.0: minor versions add capabilities, patch
versions fix them.

## [Unreleased]

### Added
- Open-source project files: `LICENSE` (MIT), `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`,
  this changelog, and GitHub issue and pull-request templates.

### Changed
- `docs/` organised into `guides/`, `architecture/` (with `images/`), and `background/`.

## [0.27.0] — 2026-10-29

### Added
- **Claude Design + functional code prototype, one design master.** `design_master`
  (`claude-design` | `code`) in `product-context.md` decides which side is the design
  system's source of truth.
- `/uxos:promote` — greenfield switch from Claude Design to code once canvases are
  approved: library + prototype built from the Claude Design System, visual parity check,
  then Claude Design mirrors the code.
- `/uxos:mirror` — push (designer runs `/design-sync`, uxos verifies) and pull-back
  (canvas, comment, or system changes routed through impact / code-library /
  design-handoff so they land in code first).
- The code handoff is now a **functional prototype**: routes, fixtures shaped by units'
  Data tables, business rules enforced from one `BR` constants file, a prototype-only
  state switcher, `data-unit` / `data-ac` markers.
- `/uxos:init` asks which design tools the project uses (recommends Claude Design + code).

### Changed
- `code-build-contract`: every component's atomic level must be visible (level folders on
  greenfield, `@level` tags on brownfield); new audit checks for unknown level and
  prototype-only tooling leaking into the product.
- `claude-design-library` mirrors from code when code is master; builds in Claude Design
  only before code exists.

## [0.26.0] — 2026-10-29

### Added
- `/uxos:competitors` — optional competitor analysis mapped onto the model: direct,
  indirect, substitute, and analogous competitors; coverage against the blueprint → table
  stakes, differentiators, whitespace; live, read-only journey walk-throughs; review themes
  counted from reviews actually read; `CMP-<n>` implications. Suggested by next-steps,
  never required. Competitor parity is supporting evidence, never a driver.

## [0.25.0] — 2026-10-29

### Added
- `/uxos:impact` — before a design change lands: is it a token, how many places use it,
  change it here or everywhere. Traces uses across patterns, code, Figma, and Claude
  Design; flags look-alikes; contrast, state, and built-unit re-test checks. Read-only
  until an option is named.

## [0.24.0] — 2026-10-26

### Added
- Claude Design as a design-handoff target: `/uxos:claude-design-library` and one canvas
  per journey with artboards per screen and state.

## [0.23.2] — 2026-10-23

### Added
- `business-rules.md` — one register of product rules (`BR-<n>`), cited by journeys and
  units, kept current by code sync.

## [0.22.0] — 2026-10-23

### Added
- Late repo onboarding: `/uxos:sync <repo>` on a model with no baseline enriches the
  existing documents from the code instead of regenerating them.

## [0.21.2] — 2026-10-23

### Added
- `/uxos:sync` and a prompt hook that checks for new commits — the model follows what
  developers build (built / changed / partial / new / removed), applied only on
  confirmation.

## [0.20.0] — 2026-10-22

### Changed
- `/uxos:requirements` writes development **Units** (Who / Why / What / How +
  Given-When-Then acceptance criteria) — the single handoff to engineering, QA, and
  AI-DLC agents.

## [0.19.1] — 2026-10-21

### Changed
- The skill-first rule covers all project work; the hook gives the `METHOD.md` path.

## [0.19.0] — 2026-10-21

### Added
- Skill-first rule: project work is routed through uxos procedures before general
  knowledge.

## [0.18.0] — 2026-10-14

### Added
- Code path: `code-build-contract`, `/uxos:code-library`, and a per-screen audit.

## [0.17.1] — 2026-10-12

### Fixed
- Browser preflight loads deferred browser tools before deciding none exist.
- `/uxos:init` always asks about code repo access.

## [0.17.0] — 2026-10-06

### Added
- `/uxos:import` — adopt existing documents instead of recreating them.

## [0.16.0] — 2026-10-06

### Added
- Browser preflight; atomic design order for patterns and the Figma library.

## [0.15.0] — 2026-10-01

### Added
- Greenfield support in the same tool.

## Before 0.15.0 — 2026-09-10 to 2026-09-30

### Added
- Part A: persistent project model, brownfield analysis, multi-platform support (0.2.0).
- `method/` as the single source, building `plugin/` and `skill/`.
- `/uxos:feature-mapping`, `/uxos:journey-design`, `/uxos:blueprint` update mode,
  `/uxos:design` (Figma, design prompt, code), `/uxos:figma-library`.
- Git-URL repo extraction; business rules and journeys from code.
- `/uxos:edge-cases`, `/uxos:requirements`, `/uxos:screen-spec`.
- `docs/quick-start.md`.
