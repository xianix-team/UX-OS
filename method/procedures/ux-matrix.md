---
name: ux-matrix
description: Build a UX Matrix for one journey — journey phases as columns, evidence lenses as rows. Fill the usability-heuristics (Nielsen 10) and Other (IxD/IA) rows from what is observable; leave analytics / business-data / interview rows empty; mark gated phases not-evaluable. Writes uxos/ux-matrix/<journey>.md.
---

# ux-matrix

Goal: a structured, per-journey grid that pins every finding to a **phase** and a **lens**,
so problems are traceable and evidence tiers are explicit.

## Columns — phases
Collapse the journey's micro-steps into ~5–7 **interface-level phases** (heuristics are
evaluated per screen, not per click). Confirm the split with the designer.

## Rows — lenses (fixed)
| Row | Who fills it | Tier |
|---|---|---|
| Channel | context | — |
| Behaviour / analytics data | **designer** (paste) | evidence, quantitative |
| Existing business data | **designer** | evidence, fact/constraint |
| User tests & interviews | **designer** | evidence, qualitative |
| Usability heuristics (Nielsen 10) | **this skill** | reasonable inference |
| Other — IxD / IA | **this skill** | expert opinion |

Leave the three designer rows empty (`—`) unless the designer provides data. **Never
fabricate them.**

## Filling the two AI rows
- Evaluate only phases you can actually reach. For each phase, check the 10 Nielsen
  heuristics; record real findings only, numbered `H1, H2…`, each with an estimated
  severity (`low`/`medium`/`high`) and an evidence note (`observed` / `DOM` / `policy` /
  `assumption`).
- `Other` row: your IxD and IA read, tagged `[IxD]` / `[IA]`, numbered `O1, O2…`.
- Mark gated phases `⚠ not evaluable — needs access` in both rows. If test credentials
  exist, the designer signs in and you continue.
- Persona differential: if a finding hits one linked persona much harder, say so in the
  finding.
- `General issues` footer: cross-cutting items, empty-evidence-row caveat, data-quality.

## Output
`uxos/ux-matrix/<id>-<slug>.md` from the template. Coverage gaps → `open-questions.md`.
