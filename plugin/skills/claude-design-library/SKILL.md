---
name: claude-design-library
description: Build or update the product's design system in Claude Design from patterns.md's canonical patterns (or design-direction.md on greenfield), atomic order bottom-up -- colour, typography, spacing/radius/elevation, atoms, molecules, organisms, templates -- confirming each level. The Claude Design counterpart to figma-library and code-library; run once before the first claude-design handoff so every journey canvas reuses the same components.
---

# claude-design-library

Goal: one Claude Design System that every journey canvas attaches, so screens across
journeys share the same buttons, fields, and tokens instead of each canvas re-inventing
them.

## Availability check — first, every time
Claude Design is reached through whatever this session provides, and that varies by
Claude Code version and setup. Load deferred tools with ToolSearch first, then use the first
of these that exists:
1. the **Artifact** tool's `quickstart` action;
2. the **Artifact** tool's `list` with `scope: "types"`, then `publish` with the type's
   `type_url`;
3. an **artifacts connector's** type tools (`list_types`, `describe_type`,
   `create_from_type`, then its publish or file tools).
Only if none of them exists, say so plainly and offer the alternatives. **Never use
`DesignSync` to build or edit a design** — it only serves the designer's own `/design-sync`,
which syncs a code-built library. Never fake Claude Design with a local HTML file.

If none exists, offer: **build in code first** (`code-library`, then the designer runs
`/design-sync` to bring it into Claude Design — code becomes the master, as it would after
`promote-to-code`), **Figma** (`figma-library`), or **later**, in a session that has one.

Standalone Claude Design (claude.ai/design) closes by December 14, 2026; Claude Design now
lives in Claude. Make the system an artifact in Claude from the Design System type. If a call
is refused because a project has closed or moved, pass on the server's message and stop.

## Prerequisite
`patterns.md` with a canonical-patterns section (§6). On greenfield, `design-direction.md`
behind it. If §6 is thin or just copies the as-is values, say so and ask whether to proceed
or firm it up first — same rule as `figma-library`.

## Atomic order
Same as `figma-library`: **Foundations** (colour → typography → spacing / radius /
elevation) → **Atoms** → **Molecules** → **Organisms** → **Templates**. Each level is
composed only from the level beneath it; every value comes from a foundation token. No raw
hex values, no one-off pieces.

## Mirror or build? — decided by `design_master`
- **`design_master: code`** (brownfield with a codebase, or after `promote-to-code`): the
  code library is the source. **Don't build the system by hand.** Ask the designer to run
  `/design-sync` in Claude Code (their command — it builds or updates the system from the
  code and marks it `editing: code`), then run `design-mirror` **verify**. Only the system's
  README / brand-book text may need writing by hand, and only if the sync leaves it empty.
- **`design_master: claude-design`** (greenfield, no code yet): build it here, as below.
  This system is what `promote-to-code` reads later, so keep token names and component
  names exactly as `patterns.md` §6 has them.

## Method (build mode)
0. **Follow the Design System type's own instructions** (the create result carries them):
   content lives as files under `project/` — `tokens.json` in its list shape,
   `components/<Comp>/README.md` and `preview.html`, `README.md` as the brand book, the
   index `project/design-system.json` written last. Read its `from-design-tool.md` /
   `format.md` references when relevant.
1. **Find or start the system.** Using whichever route the availability check found —
   `quickstart` with intent `other`, a `scope: types` listing, or the connector's type tools
   — see the design systems this account can open. If `design-records/design-system.md` already records a
   Claude Design System for this project, read it (`action: read`) and update it; build
   only what's missing. Otherwise create one from the **Design System** type the quickstart
   or a `scope: types` listing names, titled `<product> design system`.
2. **Present the build scope by level** before writing: what each stage will contain from
   `patterns.md` §6, each item `existing pattern` or `new`. The designer confirms or trims.
3. **Build one stage at a time** following the type's own instructions for how a design
   system is filled. After each stage, give the designer the link to check it and wait for
   confirmation before the next. Don't build the whole system unattended.
4. **A piece found missing later** is added here at its own level, never drawn as a one-off
   in a journey canvas.
5. Artifacts are private by default. Sharing is the designer's call; never share or publish
   wider on their behalf.

## Output
`uxos/design-records/design-system.md` from `${CLAUDE_PLUGIN_ROOT}/templates/design-record.md` — `target: claude-design`,
`claude_design_url` set, the Library levels table filled. Then run `next-steps`; it should
point at `design-handoff` (Claude Design path) for the first journey.
