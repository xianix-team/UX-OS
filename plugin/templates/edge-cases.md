---
artifact: edge-cases
project: <slug>
journey: J<n> — <journey name>
status: draft
---

# Edge Cases — J<n> <journey name>

Systematic, not free-association — walk every category below. Empty categories stay
empty; don't invent a case to fill a row.

## Input / data
| # | Edge case | Affects step | Severity | Proposed handling | Status |
|---|---|---|---|---|---|
| E1 | <empty / zero / max / invalid format / duplicate / very long / special chars / conflicting values> | <step ref> | <low/med/high — estimate> | <proposed handling, or "needs decision"> | open / handled / deferred |

## State / timing
| # | Edge case | Affects step | Severity | Proposed handling | Status |
|---|---|---|---|---|---|
| E· | <first-time vs returning / mid-flow abandonment & resume / expiry-timeout / partial completion> | | | | |

## Actor / permission
| # | Edge case | Affects step | Severity | Proposed handling | Status |
|---|---|---|---|---|---|
| E· | <wrong role attempts the action / session expires mid-step / account deleted mid-flow / two actors act on the same object at once> | | | | |

## System / network
| # | Edge case | Affects step | Severity | Proposed handling | Status |
|---|---|---|---|---|---|
| E· | <offline / slow connection / API failure / integration or payment failure / retry & double-submit> | | | | |

## Cross-surface / handoff
<only if this journey's `surfaces` frontmatter is set — otherwise omit this section>
| # | Edge case | Affects step | Severity | Proposed handling | Status |
|---|---|---|---|---|---|
| E· | <the handoff signal never arrives / the link or session expires before the next actor acts / the underlying data changes between handoff and pickup> | | | | |

## Accessibility / device
| # | Edge case | Affects step | Severity | Proposed handling | Status |
|---|---|---|---|---|---|
| E· | <screen reader path / small screen / no JS / browser back button mid-flow> | | | | |

## Summary
<counts by status; which `open` items were pushed to `open-questions.md` for a decision>
