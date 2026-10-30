---
name: capture-users
description: Propose candidate user groups and let the designer select which are in scope, then derive two persona segments per confirmed group — grounded in domain analysis, the product's observed constraints, and any research supplied. Personas are behavioural first, demographic only when genuinely research-backed. Writes uxos/user-groups.md and uxos/personas/*.md.
---

# capture-users

Goal: name who this product is for, at two levels — **user groups** (roles) and **persona
segments** (behavioural variants within a group) — so journeys and the UX matrix have
someone concrete to be about. The designer chooses scope; this doesn't decide it alone.

## Candidate user groups — propose, then let the designer choose
Derive candidates from domain analysis (its Roles & Responsibilities section) and the
product's observed structure. For each candidate, apply:
- **Central to the core workflow** — directly involved, not peripheral
- **Distinct in needs** — meaningfully different pain points, goals, or context from the
  other candidates
- **In scope for this engagement** — the designer actually intends to design for them

Avoid over-fragmentation — group related roles rather than one group per job title. 2-3
main groups is typical; don't propose one for every role domain analysis mentioned.

**Present the candidates and ask**, don't assume all are wanted:
```
Candidate user groups:
  1. <name> — central to <workflow>, distinct needs, in scope
  2. <name> — ...
  3. <name> — borderline: only relevant if <condition>
Which are in scope for this engagement?
```
Only groups the designer confirms get personas built. A candidate considered but excluded
goes in `user-groups.md`'s "Not personified here" section with the reason — never silently
dropped.

## User groups
- Scope to *this product*. If the product is single-surface public self-service, groups are
  usually entitlement/relationship variants (paying customer, entitled user, assisted user)
  rather than org roles.
- For each confirmed group: description (relationship to the product), typical work, why it
  matters (revenue / volume / risk).

## Personas — two per confirmed group
- **Behavioural segments first** — split on something that changes how they use the
  product: frequency, digital confidence, who operates the flow, stakes, first-time vs
  habitual.
- Each persona: profile · characteristics · pain points · goals · needs.
- **Demographics and a usage profile are optional additions**, not the starting point —
  include them only when genuinely backed by research (typical on greenfield, where domain
  research is the evidence source). Never invent them to look complete; omit the sections
  rather than fabricate. If included, tag the source.
- If the designer supplied research, ground personas in it and set `confidence: mixed`.
  Otherwise set `confidence: inferred` — these are working personas to be validated.

## Output
- `uxos/user-groups.md` from the template, listing each confirmed group's two persona slugs
  and the excluded candidates with reasons.
- `uxos/personas/<slug>.md` per persona, `user_group` set in frontmatter.
- Anything still uncertain goes to `open-questions.md`.
