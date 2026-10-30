---
name: promote-to-code
description: The one-time switch of the design master from Claude Design to code — usually on greenfield, once the first journeys' canvases are approved. Reads the Claude Design System and the approved canvases, translates them into a real code library (code-library, held to code-build-contract) and the functional prototype (design-handoff, code path), then makes Claude Design a mirror of the code via /design-sync. Records design_master: code. Confirmed at every step; nothing is lost in translation silently.
---

# promote-to-code

Goal: on greenfield the design starts in Claude Design because there's no code. Once the
direction is approved, the code has to take over as the single source of truth — without
redrawing the design from memory and without Claude Design and code drifting into two
masters.

## When
- `product-context.md` has `design_master: claude-design`, and
- at least one journey's canvas is approved by the designer (its handoff record has
  `status: approved`), and
- `design-direction.md` includes the implementation-stack stage (framework, styling).
`next-steps` suggests it when all three hold. Never automatic.

## Sources
Read before anything else; if one can't be read, stop and say so.
1. The Claude Design System — `handoff/design-system.md` → `claude_design_url`. With the
   Artifact tool, `read` its `project/README.md`, `project/design-system.json`,
   `project/tokens.json`, and each `components/<Comp>/README.md` and `preview.html`.
2. The approved journey canvases — each `handoff/<journey>.md` → `claude_design_url`;
   `read` the canvas and its comments (unresolved comments are open items, not decisions).
3. `patterns.md` §6, `design-direction.md`, `screen-specs/`, `requirements/`,
   `business-rules.md` — the model is the spec; the canvases show how it was drawn.

## Method
1. **Inventory and diff.** List what Claude Design holds: tokens by family (with themes),
   components with their variants and states, templates, and the screens on approved
   canvases. Compare with `patterns.md` §6. Every difference is a decision made on the
   canvas the model doesn't know yet, or drift — list them and ask the designer which
   wins. Update `patterns.md` §6 with the accepted ones **before** building code, so the
   model stays the spec.
2. **Present the promotion plan, then stop for confirmation:**
   - repo, branch, and stack (from `design-direction.md`); a scaffold only on an explicit
     yes, commands shown first (same rule as `code-library`);
   - the library levels to build, each item `from Claude Design` or `from patterns.md`;
   - the journeys whose screens become the prototype;
   - what will **not** transfer, said plainly: canvas-only one-offs (become `PAT` entries
     or are dropped), unresolved comments (→ `open-questions.md`).
3. **Build the library** with `code-library`, level by level, confirmed after each. Token
   values come from the Claude Design `tokens.json` exactly — names mapped to the repo's
   convention, the mapping recorded. Components are rebuilt in the repo's framework from
   the component README + preview (behaviour, variants, states), not copied as HTML.
4. **Build the prototype** with `design-handoff`, code path, one journey at a time, from
   its approved canvas plus its screen spec, units, and business rules.
5. **Visual parity check, per screen.** Put the canvas artboard and the running prototype
   side by side (screenshot both) and list differences. Each is fixed, or accepted by the
   designer and recorded.
6. **Switch the master.** Set in `product-context.md`: `design_master: code`,
   `design_master_since: <date>`, `design_master_commit: <sha>`. From now on Claude Design
   mirrors the code.
7. **Mirror back.** Tell the designer to run `/design-sync` in Claude Code against the
   existing Claude Design System (it's their command, uxos can't start it). That re-syncs
   the system from code and locks it (`editing: code`). Then run `design-mirror` in
   **verify** mode.
8. Log the promotion in `handoff/design-system.md`: what transferred, the token name
   mapping, parity results, what didn't transfer and why. Then run `next-steps`.

## Never
Rebuild the design from memory instead of reading the system and canvases; let the code
silently differ from an approved canvas; switch `design_master` before the designer
confirms the parity check; or edit the Claude Design System after the switch (it changes
only through `/design-sync`).
