---
artifact: problems-register
project: <slug>
status: draft
derived_from: ux-matrix/*
feeds: to-be-solved.md
severity_basis: estimated (note which evidence lenses were unavailable)
recommendations: proposed directions only — not decided solutions
---

# Problems Register — <product name>

Analysis output from the UX Matrices. Feeds problem discussion, then the to-be-solved list.
Severity is estimated from impact + likely reach unless an evidence lens says otherwise.
"Recommended direction" is a co-pilot proposal, not a chosen solution.

## Legends
**Type:** `HEU`+Nielsen# · `IA` · `IXD` · `CONTENT` · `DATA` · `PROCESS` · `A11Y`
**Evidence:** `Observed` · `DOM` · `Policy` · `Assumption` (inferred — must verify)

## Severity rubric
- **Critical** — irreversible loss (money, lockout) or total task block on a core path
- **High** — likely task failure / serious confusion, or disproportionate harm to a
  vulnerable segment on a core path
- **Medium** — friction with a workaround, or a narrower path
- **Low** — cosmetic / minor inconsistency

---

## Critical

| ID | Summary | Location (matrix) | Type | Ev | Affected | Recommended direction |
|---|---|---|---|---|---|---|
| PRB-01 | <one line> | J<n> / P<k> (jN:H#) | <type> | <ev> | <personas> | <direction; "Verify first." if Assumption; "Policy-dependent." if policy-bound> |

## High
| ID | Summary | Location (matrix) | Type | Ev | Affected | Recommended direction |
|---|---|---|---|---|---|---|

## Medium
| ID | Summary | Location (matrix) | Type | Ev | Affected | Recommended direction |
|---|---|---|---|---|---|---|

## Low
| ID | Summary | Location (matrix) | Type | Ev | Affected | Recommended direction |
|---|---|---|---|---|---|---|

---

## Coverage caveats (audit limitations, not problems)
- <which evidence lenses were empty; which journeys/phases were not evaluable; which PRBs
  are Assumption-tier>

## Summary
| Severity | Count |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 0 |

## Candidate routing (work branches by what was found)
| Cluster | PRBs | Likely response type / objective |
|---|---|---|
| <cluster> | <ids> | <content-fix / pattern-adjustment / journey-improvement / journey-redesign / new-feature / escalate> |

## How this feeds `to-be-solved.md`
- PROCESS / compliance items → Business Goals / Compliances blocks.
- HEU / IA / IXD / CONTENT / A11Y items → per-user-group pain points with a "To be solved?" decision.
- `Assumption`-evidence items → mark "needs verification", do not decide yet.
