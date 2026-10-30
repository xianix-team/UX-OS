---
name: edge-case-analysis
description: Systematically enumerate the edge cases a journey (new/proposed or existing) doesn't yet visibly handle — input/data, state/timing, actor/permission, system/network, cross-surface handoff, accessibility/device — with proposed handling and severity. Never auto-run; always a suggested next step after journey-design or map-journey-steps, never forced.
---

# edge-case-analysis

Goal: catch what the happy-path journey doesn't cover, before it becomes a bug or a support
ticket instead of a design decision. Works on any journey — `state: existing` (reveals gaps
that belong in `problems-register`) or `state: proposed` (reveals decisions needed before
`design-handoff`).

## When this runs
Never automatically. It is *suggested* by `next-steps` after `journey-design` or
`map-journey-steps` — a gap worth closing, not a forced step. The designer decides whether
and when to run it, same as everything else in this method.

## Method
Walk each category in `{{TEMPLATES}}/edge-cases.md` in turn — input/data, state/timing,
actor/permission, system/network, cross-surface/handoff (only if the journey's `surfaces`
frontmatter is set), accessibility/device. For each:

1. Draft candidate edge cases against the journey's actual steps — not generic ones. An
   edge case with no plausible connection to this journey doesn't belong in the register.
2. For each, note: which step it affects, an estimated severity (low/med/high — a judgement
   call, not measured data, say so), and a proposed handling — or `needs decision` if none
   is obvious.
3. **Don't fill empty categories to look thorough.** A journey with no cross-surface
   handoff has no cross-surface section; leave it out rather than padding it.

Present the whole draft (all categories) at once, not gated section by section — this is an
enumeration pass, not a sequence of design decisions like `new-feature-mapping`'s stages.
Ask the designer to confirm, cut, or add cases.

## Routing the result
- **Existing journey:** `open` items with real severity are candidates for
  `problems-register` — the designer decides which to carry over, next time it runs.
- **Proposed journey:** `open` items marked `needs decision` go into `open-questions.md`;
  resolved ones should be reflected back into the journey's Technical-delight column via
  `journey-design` before `design-handoff` builds anything.

## Output
`uxos/edge-cases/<journey-id>.md` from `{{TEMPLATES}}/edge-cases.md`. This is a good moment
to run `requirements-drafting` — it folds these cases straight into acceptance/pass-fail
criteria. Then run `next-steps`.
