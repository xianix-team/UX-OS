# `uxos/` model — schema contract

Every artifact is a markdown file with YAML frontmatter. Frontmatter carries the
cross-reference links and the flags that make the model machine-checkable. Prose/tables
below the frontmatter follow each template.

## Common frontmatter keys

| key | on | meaning |
|---|---|---|
| `artifact` | all | the artifact type (see list below) |
| `project` | all | project slug |
| `project_type` | product-context | `brownfield` \| `greenfield` — set at `/uxos:init`, shapes which procedures apply |
| `status` | all | `draft` \| `reviewed` \| `stale` |
| `confidence` | most | `observed` \| `inferred` \| `mixed` \| `assumption` \| `designer-supplied` (imported — adopted, not validated) |
| `imported_from` | any imported artifact | the original file(s) it was built from, as listed in `sources/INDEX.md` |
| `state` | journeys, screens, patterns | `existing` \| `proposed` |
| `platform` | product-context | `web` \| `iOS` \| `Android` \| `desktop` \| `other` |
| `source` | domain, context, patterns | what backed it — url / repo / simulator walk / screenshots / figma / docs / reference material / designer's description |
| `repo`, `repo_branch`, `synced_commit`, `synced_at` | product-context | the code-sync baseline — which repo and branch count as built, and the commit the model last matched |
| `design_tools`, `design_master`, `design_master_since` | product-context | where the project designs, and which side — Claude Design or code — is the design system's source of truth (see design-mirror) |
| `mirrored_commit`, `mirrored_at` | handoff/design-system | the code commit Claude Design last mirrored via /design-sync |
| `built` | requirements units | `not yet` \| `partial` (AC ids met) \| `<commit sha>` — set by code-sync |
| `grouping` | to-be-solved | `user-group` (improve/revamp, from a problems register) \| `theme` (greenfield, from `problem-validation`) |

## Artifact types & key links

| artifact | file | links out |
|---|---|---|
| `domain` | `domain.md` | — |
| `product-context` | `product-context.md` | — |
| `user-groups` | `user-groups.md` | candidates proposed, designer selects; excluded ones recorded, not dropped |
| `persona` | `personas/<slug>.md` | `user_group`; optional Demographics/Usage-profile when research-backed |
| `blueprint` | `blueprint.md` | surfaces ↔ user groups (1:1, brownfield); built from approved `to-be-solved` items (greenfield create) |
| `journey` | `journeys/<id>--<slug>.md` | `feature` (blueprint node) + `personas[]`; `surfaces[]` when it crosses actors |
| `edge-cases` | `edge-cases/<journey-id>.md` | `journey`; `open` items → `problems-register` (existing) or `open-questions` (proposed) |
| `requirements` | `requirements/<journey-id>.md` | `journey` + `edge-cases` (if present) + `problems-register` rows scoped to the journey, + `screen-specs`, `to-be-solved`, `personas`; units `U-J<n>-<k>`, criteria `AC-<unit>.<n>`, each unit `ready`/`not-ready` |
| `screen-spec` | `screen-specs/<journey-id>.md` | `journey`; per screen: blueprint node, entry points, sub-actions, controls, nav updates, states (cross-refs `edge-cases`) |
| `ux-matrix` | `ux-matrix/<journey-id>.md` | `journey` + `personas[]`; columns = journey phases |
| `problems-register` | `problems.md` | each row → matrix cell ref; → affected personas |
| `product-pattern-study` | `patterns.md` | brownfield: inconsistency rows → PRB ids; greenfield: §6 populated from `design-direction` |
| `design-direction` | `design-direction.md` | greenfield only; feeds `patterns.md` §6 directly |
| `to-be-solved` | `to-be-solved.md` | items → PRB ids (improve/revamp) or theme consolidation (greenfield) + `response_type` |
| `requirements-gap` | `requirements-gap.md` | `to-be-solved`; cross-checks a client-supplied FR/NFR document, both directions + an NFR sweep |
| `sources-index` | `sources/INDEX.md` | every imported document → where it was copied, what it was classified as, which artifact(s) it produced; originals are never modified |
| `sync-log` | `sync-log.md` | each code-sync run → commit range, findings by kind, accepted/rejected, artifacts changed |
| `competitors` | `competitors.md` | dated landscape by type, coverage matrix vs blueprint/themes, table stakes / differentiators / whitespace, review themes, `CMP-<n>` implications linked to model artifacts |
| `competitor` | `competitors/<slug>.md` | one deep dive: our journeys walked on their product, UX read, terminology, trust, review themes, patterns to borrow/avoid |
| `impact` | `impact/<date>-<slug>.md` | one requested design change → target kind, alias chain, uses per level and source, look-alikes, scope options with blast radius, contrast/state checks, decision |
| `business-rules` | `business-rules.md` | rules `BR-<n>` grouped by object; `state` existing/proposed; evidence; `Used by` → journey steps + units; kept current by code-sync |
| `handoff` | `handoff/<journey-id>.md`, `handoff/design-system.md` | `target`: figma \| code \| claude-design; links out to the Figma file, branch, or `claude_design_url`; revision log for canvases |
| `open-questions` | `open-questions.md` | — |
| `new-feature-mapping` | `feature-mapping/<slug>.md` | `driver` + `source_problem` + touchpoints → journey steps |
| `decision` | `decisions/<id>.md` | → affected artifacts |
| `work-package` | `work-packages/<id>/` | → to-be-solved items |

## Traceability spine

```
domain / business objectives / compliances
  user groups (candidates proposed, designer selects) ──1:1── blueprint surfaces
  personas (→ user_group)
        │
  ┌─────┴─────────────────────────────────────┐
  │ BROWNFIELD                    GREENFIELD   │
  │ blueprint: surface→area→cap.  (built later, from approved to-be-solved) │
  │ journey (existing) ── steps ─┐             problem-validation           │
  │ ux-matrix ◄───────────────────┘             (consolidate by theme)      │
  │   cell → evidence tier (by row)             │                          │
  │ problems register                           │                          │
  └─────┬────────────────────────────────┬──────┘
        │                                │
  to-be-solved (item: decision + response_type)   ← PART A ends
        │
  (optional) requirements-gap-analysis — cross-check a client FR/NFR doc both ways
        │
  (greenfield) design-direction → pattern-study §6 → blueprint (create, from to-be-solved)
```

## Evidence tiers (UX Matrix row → confidence)

| matrix row | tier |
|---|---|
| Analytics / behaviour data | evidence-backed (quantitative) |
| Existing business data | evidence-backed (fact / constraint) |
| User tests & interviews | evidence-backed (qualitative) |
| Usability heuristics | reasonable inference |
| Other (IxD / IA) | expert opinion |
| *(unfillable / gated)* | `assumption` — mark "needs verification" |

## Problem `type` vocabulary

`HEU-<n>` (Nielsen heuristic number) · `IA` · `IXD` · `CONTENT` · `DATA` · `PROCESS` · `A11Y`

## Response types (set at the to-be-solved gate; drives Part B)

`content-fix` · `pattern-adjustment` · `journey-improvement` · `journey-redesign` ·
`new-feature` · `escalate`
