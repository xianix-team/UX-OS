---
name: user-validation
description: Optional, suggested by next-steps. Check the riskiest assumptions behind the to-be-solved list — and, if the designer chooses, the personas themselves — with real users before design. Plan mode breaks items into testable bets, ranks them by risk, sets what would prove each wrong, and writes a screener (by user group, not persona), discussion guides that ask about context before pain, and a notes template. Findings mode codes the designer's session notes against the bets, rules on each with counts and quotes, and proposes updates in order — personas, then to-be-solved, then back through the scope gate. Never simulates users.
---

# user-validation

Goal: on greenfield and add-feature work, the to-be-solved list rests largely on domain
analysis, personas built without research, and stakeholder drivers. This checks the bets
that matter most with real people before anything is designed, and brings what they said
back into the model with its evidence attached.

**Optional.** `next-steps` suggests it; it never blocks anything. Many teams validate later,
through the prototype — that is solution testing, a different step at a different time.
This one checks the *need* and the *people*, not a design.

**Template is the contract.** Read `${CLAUDE_PLUGIN_ROOT}/templates/validation-plan.md` and
`${CLAUDE_PLUGIN_ROOT}/templates/validation-findings.md` before writing, and keep their frontmatter keys and
headings exactly. If a template can't be read, stop and say so. Empty sections get `none`.

## Two modes
- **plan** — before any sessions. Output: `uxos/research/<date>-<slug>/plan.md`.
- **findings** — after the designer has run the sessions. Output:
  `uxos/research/<date>-<slug>/findings.md` in the same folder, plus model updates the
  designer accepts.

## The rule that matters most
**No synthetic users.** Never generate, simulate, or predict what participants would say,
and never treat model-generated answers as evidence — not as a "pilot", not as a preview.
uxos writes the materials and makes sense of real results. Real people answer the
questions. uxos does not recruit or run sessions either; the designer does.

## Plan mode

### Stage 1 — Frame (confirm before anything else)
Ask, in one block:
- **Scope:** `needs` (the to-be-solved items) or `personas-and-needs` (also check that the
  persona segments are real). On greenfield, personas built without research are as much an
  assumption as the items on them — recommend `personas-and-needs` there.
- **Items:** default to to-be-solved rows marked `yes` or `needs-verification`; on
  add-feature, also the driver in `feature-mapping/<slug>.md`. The designer can narrow it.
- **User groups:** which groups are in the study. A group itself is checked only if the
  designer marks it uncertain.
- **Constraints:** roughly how many participants per group, remote or in person, time per
  session, anything already known from earlier research (reuse it, don't re-ask it).

Stop for confirmation.

### Stage 2 — Bets
Break each item into the assumptions it rests on. The user group and persona segment come
from the model: a user-group row names them; a greenfield theme names them on its
**Impact** line. Where an item's segment is unclear, ask rather than guess.

| Kind | The bet |
|---|---|
| `problem-real` | people in this segment actually have this problem |
| `frequency-severity` | it happens often enough, or costs enough, to be worth solving |
| `workaround` | what they do about it today (often the most revealing) |
| `would-change` | it hurts enough that they'd change how they do it |
| `driver` | add-feature: users want it, not only the stakeholder who asked |

**State every bet as the problem or behaviour, never the solution.** "Organisers front the
cost and chase repayment, and it costs them" is a bet; "organisers want split-pay" is a
feature request in disguise, and every question written from it will pitch. `would-change`
is about what people have already done about the problem — tried tools, paid, switched,
complained — not whether they'd like a feature. Give each problem item three bets by
default: `problem-real`, `frequency-severity` (knowing it happens isn't enough to decide it's
worth solving), and `workaround` (cheap to ask and usually the most revealing).

With `personas-and-needs`, add per persona: `segment-exists` (people like this exist in the
group) and `persona-trait` (one per characteristic, goal, or behaviour that design decisions
lean on — not every line in the file).

**Rank by risk** — how much depends on the bet × how unsure we are:
- Uncertainty comes from the evidence already in the model: `observed`, `[interviewed …]`,
  or research-backed → low; `inferred`, `assumption`, or a stakeholder's say-so → high.
- Impact comes from the item's severity and how much rests on it — a persona that half the
  list is tagged to matters more than one with a single item.

Present the ranked bets and a proposed shortlist sized to the constraints, and **stop for
the designer's confirmation**. A short study that happens beats a thorough one that doesn't.

### Stage 3 — What would prove us wrong, and how to find out
For every shortlisted bet, write down **before any session** what would support it and
what would refute it — concrete and observable ("most participants describe a time it
happened in the last month" / "none can recall it happening"). This stops results being
read to fit the conclusion anyone wanted.

Pick a method per bet and say why:
- **Interviews** — the default for whether a problem exists, how it's handled today, and
  persona checks. Around 5–8 per segment gives themes, not statistics.
- **Survey** — only for how *common* a problem is, and only once it's understood well
  enough to ask about precisely. Never a substitute for the interviews.
- **Analytics / support data** (brownfield) — where behaviour is already recorded.
- Anything else the designer names (diary study, contextual visit), with the same criteria.

### Stage 4 — Materials
- **Screener, per user group — recruit by the group, not the persona.** Use the group's
  observable criteria: role, situation, what they do. Never screen for persona traits: that
  only finds people who confirm the persona. Aim for variety within the group.
- **Session guide, per user group**, covering only the bets for items tagged to that group:
  1. Intro and consent script — what it's for, recording, anonymity, the right to stop.
  2. **Context and behaviour first** — how they work, their situation, goals, tools. This
     tests persona traits without ever asking "is this you?".
  3. **Then pain and workarounds** — about real past events.
  4. Wrap-up — anything we didn't ask that we should have.
- **Question rules:**
  - Ask about **past behaviour**, never hypotheticals: "Tell me about the last time you…",
    not "Would you use…?". What people say they would do is not evidence of demand.
  - Never describe or pitch the solution.
  - No leading questions, no double questions, plain language, open before closed.
  - Every question carries the bet id it tests. Follow-up probes are fine.
- **Question review** before presenting — go through every guide question and rewrite any
  that fails:
  - Is it about something that actually happened? Questions with *would, could, if there
    was, imagine, how likely,* or *something that* fail.
  - Does it describe, hint at, or name a possible solution — even as "something that did X"?
    Fail.
  - Can it be answered yes or no, or does it suggest the answer ("Did you ever worry…")?
    Rewrite as "Tell me about…".
  The "supported if" and "refuted if" criteria follow the same rule: what people did, not
  what they say would help.
- **Coverage check** before presenting: every shortlisted bet has at least one question;
  every question tests a bet (cut the rest). A session of 45–60 minutes holds roughly 10–14
  main questions.
- **Survey** (only if a prevalence bet is in scope), each question mapped to its bet.
- **Notes template** keyed to participant code and bet id, so findings mode is quick.

### Stage 5 — Data handling, present, write
- Raw notes, recordings, and transcripts contain personal data. They stay **outside
  `uxos/`**, or in `uxos/research/raw/` only if it's git-ignored — offer to add that line
  to `.gitignore` and add it only on a yes. Participants are referred to by code (`P1`…).
  Say this plainly in the plan; a model folder in a shared or public repo is not the place
  for names.
- Present the **whole plan** for confirmation, then write `plan.md`. Then run `next-steps`.

## Findings mode

1. **Intake.** The designer points to notes or transcripts, or pastes them. Before anything
   goes into `uxos/`, replace names, employers, contact details and anything identifying
   with participant codes. If raw files sit inside `uxos/` and aren't ignored, warn first.
2. **Code** each participant against the bets: supports / refutes / neither, with the
   shortest quote or observation that shows it. Only what was said or done — never infer
   an answer a participant didn't give.
3. **Rule on each bet** against the criteria written in Stage 3: `supported`, `refuted`,
   `mixed`, or `not tested`. Give counts per segment ("5 of 7 planners"), never percentages
   from a handful of interviews, and say plainly that small qualitative samples show themes,
   not prevalence. A bet decided by one vivid quote is `mixed` at best.
4. **Personas** (scope `personas-and-needs`) — one outcome each, with evidence:
   | Outcome | When |
   |---|---|
   | `confirmed` | people in the group match its context, goals, behaviours |
   | `revise` | the segment exists, some traits are wrong — name which |
   | `split` | it is really two segments with different behaviours or pains |
   | `merge` | two personas behave the same |
   | `missing segment` | people keep appearing whom no persona describes |
5. **Surprises** — themes nobody asked about that came up repeatedly, with counts. They
   become candidate items or open questions, not decisions.
6. **Propose updates in this order**, each shown before writing and applied only on the
   designer's yes:
   1. **Personas** — the outcome; each confirmed or revised trait gets an evidence tag
      `[interviewed, <date>, n=<N>]`; a persona whose key traits are now backed by research
      moves from `inferred`/`assumption` to `mixed` (or `observed` if all are). A split,
      merge, or new segment is drafted as a proposal through `capture-users` rules.
   2. **User groups** — only if one was in scope as uncertain.
   3. **To-be-solved** — record each item's result in its Validation section. An item whose
      persona changed is re-tagged or flagged. A **refuted** item goes back to the scope
      gate (`to-be-solved`, G2) as `needs-verification` for the designer to decide — never
      deleted silently. A supported item is not "proven": it is supported by n people.
   4. **Elsewhere** — on brownfield, the journey's UX matrix interview row; any journey or
      unit built on a changed persona or item is flagged for review.
7. Write `findings.md`. Then run `next-steps`.

## Evidence tags this adds
`[interviewed, <date>, n=<N>]` · `[surveyed, <date>, n=<N>]` — N is the number of people the
claim rests on, not the size of the study.

## Never
Simulate, predict, or invent participant answers; count hypothetical "would you" answers as
demand; screen recruits by persona traits; put names or identifying details in `uxos/`;
give percentages from a handful of interviews; drop a refuted item or persona without the
designer deciding; or treat this step as required.
