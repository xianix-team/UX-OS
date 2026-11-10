---
artifact: validation-plan
project: <slug>
study: <YYYY-MM-DD>-<slug>
scope: <needs | personas-and-needs>
user_groups: <UG ids in the study>
status: draft
---

# Validation Plan — <study name>

Checks the riskiest assumptions behind the to-be-solved list<, and the personas,> with real
users before design. Written by uxos; the sessions are run by the designer. Findings go in
`findings.md` beside this file.

## 1. What we're checking
- **Scope:** <needs | personas and needs>
- **Items:** <to-be-solved refs, e.g. `Theme 1#2`, `UG1#3`; the add-feature driver if any>
- **Personas:** <persona slugs in scope — or "not in scope">
- **Not checking:** <what is deliberately left out, and why>

## 2. Bets
| ID | Bet | From | Kind | Current evidence | Risk | In this study? |
|---|---|---|---|---|---|---|
| B1 | <one testable statement> | <to-be-solved ref or persona slug> | <problem-real / frequency-severity / workaround / would-change / driver / segment-exists / persona-trait> | <tag from the model, e.g. `inferred`> | <high / medium / low — impact × uncertainty> | yes / no — <why> |

## 3. What would prove us wrong
Written before any session.
| Bet | Supported if | Refuted if |
|---|---|---|
| B1 | <observable> | <observable> |

## 4. Method
| Bets | Method | Why this method | Participants |
|---|---|---|---|
| B1, B2 | <interview / survey / analytics / other> | <reason> | <n per user group> |

## 5. Screener — <user group>
<!-- One block per user group. Recruit by the group's observable criteria, never persona traits. -->
**Who:** <role, situation, what they do — from the user group>
**Exclude:** <e.g. people who work on this product, competitors' staff>
**Variety:** <aim for a spread across … — deliberately not filtered by persona>

| # | Screening question | Qualifies if |
|---|---|---|

## 6. Session guide — <user group>
<!-- One block per user group; only bets for items tagged to this group. -->
**Length:** <45–60 min> · **Format:** <remote / in person>

### Intro and consent
<what it's for, recording, anonymity, the right to stop or skip>

### Context and behaviour
| # | Question | Tests | Probes |
|---|---|---|---|
| 1 | <past-behaviour question> | B<n> | <follow-ups> |

### Pain and workarounds
| # | Question | Tests | Probes |
|---|---|---|---|

### Wrap-up
<anything we should have asked; thanks; next steps for them>

**Coverage:** <every shortlisted bet has a question: yes / list gaps>

## 7. Survey
<only if a prevalence bet is in scope — each question with the bet it tests; otherwise `none`>

## 8. Notes template
| Participant | User group | Bet | What they said or did | Quote (anonymised) | Supports / refutes / neither |
|---|---|---|---|---|---|
| P1 | | B1 | | | |

## 9. Data handling
- **Raw notes and recordings:** <location outside `uxos/`, or `uxos/research/raw/` git-ignored>
- **Participants:** referred to by code only (`P1`…); names and details never enter `uxos/`
- **Consent:** <how it's recorded>
