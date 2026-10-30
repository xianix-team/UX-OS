---
artifact: requirements-gap
project: <slug>
status: draft
source: <client doc name / path>
---

# Requirements Gap Analysis

Cross-checks the client's own requirements (functional + non-functional) against the
evidence-based `to-be-solved.md`. Two directions, plus a dedicated NFR sweep — NFRs are the
category clients miss most often, and this is where the designer's domain/persona research
gets a chance to catch what the client's own view of the product missed.

## Client requirements not yet reflected in to-be-solved
| # | Client requirement | Type | Matches a to-be-solved item? | Decision |
|---|---|---|---|---|
| C1 | <requirement as stated> | functional / non-functional | none found / partial match — <ref> | add to to-be-solved / already covered / dismiss (why) |

## To-be-solved items the client's requirements don't cover
The designer's upper hand — real needs the research found that the client's own document
missed.
| # | To-be-solved item | Evidence it's grounded in | Raise with client? |
|---|---|---|---|
| G1 | <item, ref> | <persona need / domain finding / PRB id> | yes — added to open-questions / no, deferred (why) |

## Non-functional requirements sweep
Checked explicitly against a standard checklist — not just what the client happened to
mention.
| Category | Addressed by client? | Addressed by to-be-solved? | Status |
|---|---|---|---|
| Performance / load | | | covered / gap |
| Security | | | |
| Accessibility | | | |
| Scalability | | | |
| Privacy / compliance | | | |
| Localization | | | |
| Reliability / offline | | | |
| Data retention / backup | | | |
| Maintainability / extensibility | | | |

## Summary
<counts; what got added to to-be-solved (with response types); what got raised with the
client via open-questions.md; what was consciously dismissed and why>
