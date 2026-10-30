---
name: design-mirror
description: Keep Claude Design and the code in step in both directions without two masters. Push — code to Claude Design via the designer's /design-sync, then verify the mirror. Pull-back — detect what changed in Claude Design (a canvas, its comments, or an unlocked system) and route each change through the right uxos procedure (impact, code-library, design-handoff) so it lands in code first. Direction follows design_master in product-context.md.
---

# design-mirror

Goal: designers and clients work in Claude Design; developers build from the code. Both
stay current, and the master — recorded as `design_master` in `product-context.md` — is
always the one that changes first.

## Who is master
| `design_master` | When | Changes start in | The other side |
|---|---|---|---|
| `claude-design` | greenfield before `promote-to-code` | Claude Design System + canvases (built by `claude-design-library`, `design-handoff` Path D) | code doesn't exist yet, or is a throwaway spike |
| `code` | after `promote-to-code`, and brownfield with a codebase from the start | the code library (`code-library`) and the prototype | Claude Design mirrors the code via `/design-sync`; the system is read-only (`editing: code`) |
Not set → ask the designer, and record it. Brownfield with a code library → `code`.

## Mechanics — what uxos can and can't do
- **uxos reads and writes the Claude Design System and canvases** with the Artifact tool
  (`read`, `list_files`, `read_file`, `publish`, `comments`) — the system's content is files
  under `project/` (`tokens.json`, `components/<Comp>/…`, `README.md`). Follow the Design
  System type's own instructions when writing.
- **`/design-sync` is the designer's command** (a built-in Claude Code skill). uxos never
  runs it or its tool on its own; it says when to run it and what for, then verifies.
- A system synced from code is marked `editing: code` and is read-only on its page. Don't
  write to it with Artifact `publish` either — it changes only through `/design-sync`.

## Mode 1 — push (code → Claude Design), `design_master: code`
Run after `code-library` changes tokens or components, after `promote-to-code`, after an
applied `change-impact`, or when `code-sync` reports component changes.
1. Say what changed in the code library since the last mirror (tokens, components; from
   `handoff/design-system.md` → `mirrored_commit` to now) and ask the designer to run
   `/design-sync` in Claude Code against the system at `claude_design_url` (first time: it
   can create one).
2. **Verify** once they say it's done: `read` `project/tokens.json` and the component list;
   compare with the code's tokens and library — names, values (every theme), components,
   variants. Report matches and mismatches; mismatches mean the sync is incomplete — say
   which, never patch the system by hand.
3. Record `mirrored_commit` and `mirrored_at` in `handoff/design-system.md`.

## Mode 2 — pull-back (Claude Design → code), `design_master: code`
Run when a canvas was revised or commented on since its last handoff entry, or when the
designer says something was changed in Claude Design.
1. **Detect.** For each canvas in `handoff/*.md` (`claude_design_url`): `read` it and its
   comments; compare the screens with the prototype and the code library. For the system:
   if it is no longer `editing: code`, diff its `tokens.json` and components against the
   code. List every difference.
2. **Classify and route — proposals, nothing written yet:**
   | Change in Claude Design | Goes through |
   |---|---|
   | a token value or new token | `change-impact` — "here or everywhere?" still applies |
   | a new or changed component / variant | `code-library`, at its atomic level |
   | a screen layout or flow change on a canvas | `screen-specification` / `journey-design` if the model changes, then `design-handoff` (code) for the prototype |
   | a client comment asking for a change | the same routes; the thread is answered with what was decided |
   | a one-off on one artboard | dropped, or a `PAT` entry if the designer keeps it |
3. Present the pull-back report (change, evidence — canvas, artboard, comment —, route,
   proposed model update). The designer accepts, rejects, or edits each item.
4. Apply the accepted items through their procedures (each with its own confirmations).
   Then run **Mode 1** so Claude Design mirrors the result. Log in `handoff/design-system.md`
   and the journey's handoff revision log.

## Mode 3 — while Claude Design is master (`design_master: claude-design`)
Code is not a source. Changes go into the Claude Design System through
`claude-design-library` and onto canvases through `design-handoff` Path D; accepted
decisions flow into the model (`patterns.md` §6, journeys, screen specs) so the documents
never fall behind the canvas. A throwaway code spike, if any, is never read back as truth.

Then run `next-steps`.

## Never
Write to a system marked `editing: code`; run `/design-sync` for the designer; let a token
change skip `change-impact`; or treat a Claude Design change as applied before it is in
code (when code is master).
