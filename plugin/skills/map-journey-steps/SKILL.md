---
name: map-journey-steps
description: For one named journey, map its current (existing) flow steps as an ordered list plus a clean flow diagram, marking steps that could not be directly observed. One diagram per journey — keep them simple. Writes uxos/journeys/<id>--<slug>.md.
---

# map-journey-steps

Goal: the ordered steps of a journey as it works **today**, so the UX matrix has columns and
Part B has a baseline to change.

## Method
1. Confirm the journey's `feature` (a blueprint node) and `personas`.
2. State the **primary user goal** in one or two sentences — intent, not mechanics.
3. Walk the flow. For each step: a short imperative phrase. Observe it where reachable —
   browser for web; the iOS Simulator / Android emulator for a runnable native build; the
   designer's screenshots / recording otherwise. If none of those exist (or to cross-check
   what you did observe), reconstruct the order from code — routing table, each screen's
   API calls, and conditional navigation logic (see `context-extract`'s "Reconstructing a
   journey from code alone"). Where a step is behind auth or otherwise unobserved — code-only
   reconstruction included — still include it from domain + policy + form/screen structure,
   and append `*(inferred)*`. Code-only steps carry less confidence than an observed
   walkthrough: code shows what the system can do, not what the screen actually looks or
   feels like — say so in the Notes section, don't blend the two silently.
4. Note branch points and their consequences (rejection, release, blacklist), and where
   separate journeys converge. If this journey hands off between actors or surfaces (e.g.
   a customer request that continues in an admin panel), use the journey template's Actor
   column variant and set `surfaces` in the frontmatter — name each handoff and what makes
   the next actor aware (a notification, a link, a status change).
5. Draw **one** `flowchart TD` — linear with only the decisions that matter. Do not combine
   multiple journeys into one diagram; keep each readable.

## Boundaries
Read-only on every platform. Walk public/unauthenticated flows to the auth wall and stop —
in a browser, a simulator, or an emulator. Never submit, purchase, or tap an irreversible
control. If test credentials are available, the user signs in; you still only observe.

## Business rules
List the `BR` ids each step applies under **Business rules applied**. A rule observed on a
step that isn't in `business-rules.md` yet is added there (`state: existing`, with its
evidence) — never restated inside the journey.

## Output
`uxos/journeys/<id>--<slug>.md` from `${CLAUDE_PLUGIN_ROOT}/templates/journey.md`, `state: existing`. Fill the
Step column and the diagram; leave How / Why / Technical-delight as `—` — that enrichment,
and any proposed change to the journey, is `journey-design`'s job, not this one. Push
inferred-step uncertainty into `open-questions.md`. `edge-case-analysis` is a reasonable
follow-on (not required) — it can surface gaps worth carrying into `problems-register`.
