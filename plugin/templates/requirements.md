---
artifact: requirements
project: <slug>
journey: J<n> — <journey name>
format: unit
status: draft
ready_units: <n of total>
---

# Units — J<n> <journey name>

The development handoff for this journey. Each unit is a buildable slice of the journey
(it may span several steps and screens) written so downstream AI-DLC agents and people can
use it as-is: delivery/Bolt planning, development, and test design. Built only from the
confirmed model; anything not settled is listed under **Open questions** and the unit is
marked `not-ready` rather than filled in by guesswork.

**For developers:** put the unit id (e.g. `U-J<n>-1`) in commit messages or PR titles for
work on that unit. uxos reads them to keep its model in step with what was built.

**Sources:** `journeys/<id>.md` · `screen-specs/<id>.md` <or "not yet written"> ·
`edge-cases/<id>.md` <or "not yet written"> · `to-be-solved.md` · `problems.md` <if any> ·
`personas/` · `handoff/<id>.md` <if a prototype exists>

## Unit index

| Unit | Title | Persona | Steps | Depends on | Ready |
|---|---|---|---|---|---|
| U-J<n>-1 | <title> | `<persona-slug>` | <step refs> | — | ready / not-ready |

---

<!-- One block per unit -->

## U-J<n>-1 — <short capability title>

**Readiness:** ready / not-ready — <if not-ready, which open question or `needs decision` edge case blocks it>
**Built:** not yet <!-- set by code-sync: partial (AC ids met) | <commit sha> -->

### Who
- **Persona:** `<persona-slug>` — <one line on who they are in this moment>
- **Other actors / roles:** <other personas, admins, systems involved — or none>
- **Permissions:** <who may and may not do this, as the model states it — or "not specified">

### Why
**As a** `<persona-slug>`, **I want to** <capability>, **so that** <benefit>.

- **Value:** <the pain removed / goal met, in the persona's terms>
- **Traces to:** to-be-solved `<UG<n>#<row> | Theme <n>#<row>>` · problems `<PRB-ids>` or none · journey step(s) `<refs>`

### What
<2–4 sentences: what this unit delivers, in functional terms.>

- **In scope:** <bullets>
- **Out of scope:** <bullets — including what a neighbouring unit covers, by id>

### How
**Flow** (from the journey; the How column, made concrete):
1. <user does … → system responds …>
2. <…>

**Screens:** <screen names from `screen-specs/`, with blueprint node ids — or "screen spec not yet written">

**States:**
| State | When | What the user sees / can do |
|---|---|---|
| Default | | |
| Empty | | |
| Loading | | |
| Error | | |
| Success | | |
<!-- keep only states that apply; add partial, offline, permission-denied, etc. where relevant -->

**Data:**
| Field / item | Shown or entered | Rules (required, format, limits) | Source |
|---|---|---|---|
| | | | model ref or `needs decision` |

**Business rules:** <each as `BR-<n>` — <rule with its value>, from `business-rules.md`; a rule
this unit needs that isn't in the register yet is `needs decision`, never invented>

**Technical delights:** <from the journey's Technical-delight column, if any>

### Acceptance criteria
- **AC-U-J<n>-1.1** — Given <precondition>, when <action>, then <observable result> *(happy path)*
- **AC-U-J<n>-1.2** — Given <state condition>, when <action>, then <result> *(state: <name>)*
- **AC-U-J<n>-1.3** — Given <edge case `E-<id>` condition>, when <action>, then <its handling> *(edge case `E-<id>`)*
- **AC-U-J<n>-1.4** — <`PRB-<id>` restated as a pass condition> *(resolves `PRB-<id>`)*
- **AC-U-J<n>-1.5** — <non-functional: accessibility / performance / privacy — only when the model states it> *(NFR)*

### Build notes
- **Depends on:** <unit ids this needs first, and why — or none>
- **Prototype / design:** <Figma frame or prototype file links from `handoff/`, or none yet>
- **Patterns:** <`patterns.md` components and tokens the screens use>
- **Open questions:** <list, each linked to `open-questions.md` — or none>
- **Assumptions:** <labelled `Assumption` — or none>

---

## Summary
- **Units:** <total> · **ready:** <n> · **not-ready:** <n> (<ids>)
- **Coverage:** <journey steps not covered by any unit — should be none; edge cases not folded in; PRBs not resolved>
- **Open questions blocking handoff:** <list>
