---
artifact: idea
project: cabinly
name: split-payment
started_by: product owner
started_at: 2026-11-02
state: exploring
base_commit: none
status: approved
---

# Idea — split-payment

## 1. The idea, in their words
> what if every guest just paid their own bit when the organiser books, instead of the organiser paying it all

**Understood as:** at booking, each guest in the group pays their own share, so the organiser doesn't pay for everyone and chase them.
**What kind of idea:** new feature

## 2. Route through the normal flow
| Step | Procedure | Where it lives | Done |
|---|---|---|---|
| Why, what, where, conflicts | a to-be-solved row | `to-be-solved.md` row (idea: split-payment) | 2026-11-02 |
| Blueprint | `build-blueprint` (update) | `blueprint.md` nodes (idea: split-payment) | 2026-11-02 |
| Journey(s) | `journey-design` | `rough-ideas/split-payment/journeys/` | 2026-11-03 |
| Screen specs | `screen-specification` | `rough-ideas/split-payment/screen-specs/` | 2026-11-03 |
| Mockups | `design-handoff` (not the code path) | `rough-ideas/split-payment/design-records/` | 2026-11-04 |

Not run while this is an idea: edge cases, requirements (Units), the dev handoff.

## 3. Flags in shared files
| File | Entry | Added or changed | Was (for changed entries) |
|---|---|---|---|
| `blueprint.md` | Guests › Book › Each guest pays their own share | added | — |
| `to-be-solved.md` | Theme 2 row 2 | added | — |

## 4. Overlaps
| Other idea | Shared entry | Noted |
|---|---|---|
| none | — | — |

## 5. New components drawn, not added
| Component | Level | Used on | Why the existing ones don't fit |
|---|---|---|---|
| Share tracker | molecule | Booking summary | no component shows who has paid |

## 6. Decision
**Decision:** not yet
**Why:** —
**Decided by / on:** —

## 7. Log
| Date | What happened | By |
|---|---|---|
| 2026-11-02 | started | product owner |
| 2026-11-04 | mockup made | product owner |
