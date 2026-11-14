# Changelog

All notable changes to UX Designer OS. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/) — the version is the `version` in
`plugin/.claude-plugin/plugin.json`. Pre-1.0: minor versions add capabilities, patch
versions fix them.

## [Unreleased]

### Added
- **`/uxos:crazy8 <journey> <screen>`** — Crazy 8s for a screen that isn't working. A brief
  from the model ends in a "How might we…?"; then, chosen each time, a **workshop** (people
  sketch, uxos reads their photos into cards and groups duplicates, offering its own ideas
  only afterwards) or **AI** (eight screens, each varying a different dimension: layout,
  interaction, priority, disclosure, entry point, metaphor, density, one rule broken on
  purpose). All directions are grey-box wireframes on one page. The designer picks one or
  combines parts; nothing is written to the screen spec, journey, design system, or code
  until the choice is confirmed, and new components still join the system only through
  `design-handoff`.

## [0.32.1] — 2026-11-11

### Fixed
- `next-steps` pointed to `/uxos:respond`, which doesn't exist; it now suggests
  `/uxos:feature-mapping` or `/uxos:journey-design`. `/uxos:design-direction` named a
  `/uxos:capture-users` command that doesn't exist.
- The claude.ai Skill described itself as brownfield-only.

### Added
- `scripts/check.sh` and a GitHub Actions check on every pull request: generated files match
  `method/`, manifests parse, every skill and command has its frontmatter, referenced
  templates and `/uxos:` commands exist, the version has a changelog entry, scripts parse.
- Versions are tagged and published as GitHub releases from this one on.

### Changed
- `docs/architecture/` is labelled as the original design notes from before uxos was built.

## [0.32.0] — 2026-11-10

Design direction for people who aren't designers, and for revamps.

### Added
- `design-direction` asks **who is answering** — a designer, someone else, or a workshop.
  Anyone who isn't a designer gets plain-language mode: questions about their product and
  customers instead of design terms, choices made by looking, and technical details derived
  from the personas with a reason they can follow.
- **Style tiles** — the same real piece of the product drawn in 2–3 directions, in
  `uxos/design-direction/style-tiles.html`, every value a CSS custom property.
- **Mood board** — share screenshots or links of what you have in mind; uxos reads each,
  asks what you like about it, extracts the visual qualities with their source, and asks
  about conflicts. References are inspiration: a brand's logo, artwork, or exact palette is
  never copied.
- Every decision records who made it (`client`, `designer`, `derived`), with
  `needs_designer_review` when no designer was involved, and an **In plain words** summary
  to share after a workshop.

### Changed
- `design-direction` now also runs on a brownfield **revamp**, starting from keep / change /
  drop on the as-is design; `pattern-study` then re-runs with §6 following the direction,
  each item marked `kept`, `changed`, or `new`. Improve and add-feature are unchanged.

## [0.31.0] — 2026-11-10

### Added
- **`/uxos:validate`** — optional user validation before design. Plan mode breaks the
  to-be-solved items, and optionally the personas, into bets, ranks them by risk, records what
  would prove each wrong, and writes a screener by user group (never persona traits) and an
  interview guide per group that asks about context before pain, every question tied to a bet.
  Findings mode codes the designer's session notes, rules on each bet with counts and quotes,
  and proposes updates: personas (confirm, revise, split, merge, missing segment), then
  to-be-solved, with refuted items going back to the scope gate.
- Evidence tags `[interviewed, <date>, n=<N>]` and `[surveyed, <date>, n=<N>]`; a Validation
  section in the persona and to-be-solved templates.
- An honesty rule: never simulate users.

## [0.30.0] — 2026-11-06

Makes the Units the one thing developers receive. Clients liked them as a dev handoff, and said
the `handoff/` folder made little sense to developers. It was never written for them.

### Added
- Units files open with a **Start here** block: the journey, build order, what's ready and
  blocked, how to run the prototype, and where the design system lives.
- Unit **Build notes** gain Build from, Left to wire, and Accepted differences from the design.
  `design-handoff` updates them, with the designer's OK, when a prototype is built or changed.
- `next-steps` suggests refreshing Units when the design record has moved on or Start here is
  missing, and says to give developers `uxos/requirements/`.

### Changed
- **`uxos/handoff/` is now `uxos/design-records/`**, and the `handoff` template is `design-record`.
  Existing projects keep working: uxos treats the old folder as the new one and offers once to
  rename it, never without a yes. Declining sets `design_records_path` in `product-context.md`.
- In Units files, Sources moved from the top to the end.

## [0.29.0] — 2026-11-06

Closes the gap between "did I build it?" and "does it work?", found by the designer spotting
defects on the page that every check had passed.

### Added
- **Perceivability check** in the `code-build-contract` audit, on the rendered screen in every
  theme: 3:1 for boundaries needed to operate something; a designer-set **region boundary
  minimum** for cards, frames, bands, and panels. Measured against the real parent; prefer a
  different fill over a heavier edge. A finding blocks like any other audit finding.
- `design-parity` **second baseline:** under `design_master: code`, a rewrite is also compared
  with the previous code, and claims dropped along the way go to the designer. This part still
  runs when the artboard is unreachable.
- `loop-preflight` — checks the designer is looking at the current build: server process, page
  freshness, same origin. The state switcher now shows a build stamp, because the agent can't
  see the designer's tab.
- `design-handoff` Path D: an annotation convention, so frames and labels can't be mistaken for
  design. Annotation stays out of Composition blocks.
- Templates: region boundary minimum in `design-direction`; perceivability and dropped-claims
  tables in `handoff`.

### Changed
- Docs: replaced examples drawn from a real project with a made-up one.

## [0.28.0] — 2026-11-02

Stops code drifting from approved designs. A faithful build used to get every element
right and the arrangement wrong, because nothing in the model said *where* things go.

### Added
- **Composition block** in screen specs — shell (content column, gutter, what sticks),
  sections in order with anchor ids and arrangement, element kinds that carry meaning,
  verbatim text. Extracted from the artboard where one exists, decided with the designer
  where not; `to be decided at design` is allowed, a guess is not. Claude Design handoffs
  write it back from the confirmed artboard.
- `design-parity` — compares a built screen with its artboard in four mechanical
  dimensions (inventory, geometry, semantics, content), shell first and across every
  artboard of the journey; classifies each difference (translation error, rule-driven,
  capability, taste) and records the table in the handoff. Taste deviations never ship
  unasked.
- `artboard-preflight` — confirms the artboard is reachable and renderable before a code
  build or parity check; otherwise stops, or continues labelled *built without seeing the
  design*.
- `code-build-contract`: rule 9 (a note about what a design shows is a citation, read in
  the same pass) and a **deviation budget** (inventory, arrangement, element kind:
  zero tolerance; quoted text: verbatim; geometry: one spacing step).
- Handoff template: **Design parity** section.
- Open-source project files: `LICENSE` (MIT), `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`,
  this changelog, and GitHub issue and pull-request templates.

### Changed
- `design-handoff` code path builds the shared shell first and confirms it with measured
  numbers, then builds each screen from its Composition block and runs `design-parity`;
  "ran it and looked at it" no longer counts.
- `promote-to-code` and `design-mirror` (push verify, as a spot check) use `design-parity`.
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

[Unreleased]: https://github.com/xianix-team/UX-OS/compare/v0.32.1...HEAD
[0.32.1]: https://github.com/xianix-team/UX-OS/releases/tag/v0.32.1
