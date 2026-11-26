---
artifact: idea
project: <slug>
name: <idea-name>
started_by: <who raised it — name or role>
started_at: <date>
state: <exploring | parked | going-ahead | adopted | discarded>
decided_by: <who chose go ahead / park / discard — omit until decided>
decided_at: <date — omit until decided>
base_commit: <git commit the idea started from, or "none" outside git>
status: draft
---

# Idea — <idea-name>

## 1. The idea, in their words
> <exactly what the person said or wrote; never reworded>

**Understood as:** <one or two sentences said back and confirmed>
**What kind of idea:** <new feature | a change to an existing journey | not sure yet>

## 2. Route through the normal flow
| Step | Procedure | Where it lives | Done |
|---|---|---|---|
| Why, what, where, conflicts | `new-feature-mapping` / a to-be-solved row | `rough-ideas/<idea-name>/feature-mapping.md` / `to-be-solved.md` row (idea: <idea-name>) | <date or —> |
| Blueprint | `build-blueprint` (update) | `blueprint.md` nodes (idea: <idea-name>) | <date or —> |
| Journey(s) | `journey-design` | `rough-ideas/<idea-name>/journeys/` | <date or —> |
| Screen specs | `screen-specification` | `rough-ideas/<idea-name>/screen-specs/` | <date or —> |
| Mockups | `design-handoff` (not the code path) | `rough-ideas/<idea-name>/design-records/` | <date or —> |

Not run while this is an idea: edge cases, requirements (Units), the dev handoff.

## 3. Flags in shared files
Every entry this idea added or changed outside its own folder, so a discard can undo it exactly.

| File | Entry | Added or changed | Was (for changed entries) |
|---|---|---|---|
| `blueprint.md` | <node id and label> | <added / changed> | <old label, or —> |
| `to-be-solved.md` | <row> | <added / changed> | <old text, or —> |

## 4. Overlaps
Other ideas that flag the same entries. Flagged, never blocked.

| Other idea | Shared entry | Noted |
|---|---|---|
| <idea-name or none> | <node / row> | <date> |

## 5. New components drawn, not added
Components the mockups needed that aren't in the design system. Listed here only; they join
the design system after go ahead, through the normal library procedure.

| Component | Level | Used on | Why the existing ones don't fit |
|---|---|---|---|

## 6. Decision
**Decision:** <go ahead | park | discard — or not yet>
**Why:** <their reason, in their words>
**Decided by / on:** <name or role> · <date>

## 7. Log
| Date | What happened | By |
|---|---|---|
| <date> | started | <who> |
