# UX Designer OS — Architecture

Status: working draft. Consolidates [context.md](../background/context.md), [initial-intent.md](../background/initial-intent.md),
the three process diagrams in [`images/`](images/), and the artifact templates.

---

## 1. What we are building

A set of **skills, subagents, and commands** (Claude Code plugins) that carry a professional
designer through the work of changing an **existing** digital product, without rebuilding
context every time.

It is a **co-pilot**, not an autopilot. The system assembles options, evidence, and drafts;
the designer makes every judgement that matters. Human decision points are explicit and named
(§6). Nothing is written to the project model silently.

v1 focus was brownfield; **greenfield is now built too** (v0.15.0), reusing the entire
right-side solve loop as planned here from the start. Four objectives:

1. Add a new feature (brownfield)
2. Improve an existing feature (brownfield)
3. Complete revamp of an area (brownfield)
4. Start from scratch (greenfield) — `problem-validation` (theme-consolidated, not per-user-
   group, since brownfield's problems arrive pre-scoped per persona via a UX Matrix and
   greenfield's don't) → `to-be-solved` → optional `requirements-gap-analysis` against a
   client-supplied FR/NFR document → `design-direction` (stage-gated visual elicitation,
   since there's no as-is to extract patterns from) → the same solve loop as the others.

### 1.1 Two parts, split at the to-be-solved gate

The work divides cleanly into two packages that are independently useful:

| | **Part A — `uxos-diagnose`** | **Part B — `uxos-design`** |
|---|---|---|
| Job | Build & maintain the project model; find and prioritise problems | Execute a design response to an approved problem |
| Flow | Mostly one linear path (§2 left side), low judgement per step | A **classifier + a bounded set of response playbooks** (§3.4); high judgement, iterative |
| Output | `problems.md` + `to-be-solved.md` — structured, traceable, prioritised | proposed journeys / screens / components + handoff |
| Needs | browser, repo/doc access | the Part A model, `patterns.md`, and (for visual work) a Figma connector |

The **to-be-solved list is the contract** between them. Each approved item carries
`{problem, evidence tier, affected personas, response type, recommended direction}`.

The method was validated end-to-end by walking Part A manually against a real product (a
public transit seat-reservation web app), `improve` objective. That run is kept as a
private regression fixture, not shipped with the plugin.

---

## 2. The meta-process

All three process diagrams ([`brownfield-1.png`](images/brownfield-1.png), [`brownfield-2.png`](images/brownfield-2.png), [`greenfield.png`](images/greenfield.png)) share
one shape:

```
   Trigger (PO's story / stakeholder request / designer observation)
      |
 ==== LEFT: UNDERSTAND ===========================================
   Blueprint (current state)         <- reverse-engineered in brownfield
   User groups & personas            <- always runs
   <objective-specific analysis>     <- this is the part that varies
      |
   >>>> PHASE GATE: To-be-solved list  (human approves scope) <<<<
      |
 ==== RIGHT: SOLVE (loop) =======================================
   (create|change|update) Solution blueprint
   (create|change|update) User journeys
   Wireframing & prototyping / handoff
   Solution test  --updates-->  back to blueprint & journeys
```

The **right side is identical** across all objectives — only the verb changes
(`create` for greenfield, `change` for improve/revamp, `update` for add-feature).

The **left side varies by objective**:

| Objective            | Diagram        | Left-side analysis technique              | Output                    |
|----------------------|----------------|------------------------------------------|---------------------------|
| Improve a feature    | brownfield-1   | **UX Matrix** -> problem discussion      | To-be-solved list         |
| Complete revamp      | brownfield-1   | **UX Matrix** -> problem discussion (wider scope, same method) | To-be-solved list |
| Add a feature        | brownfield-2   | **Product pattern study** -> new feature mapping | New feature requirement |
| From scratch (later) | greenfield     | **Problem validation** (pain / goal / need) | To-be-solved list       |

Improve and revamp are the **same method** — depth and blast radius differ, not the steps.

---

## 3. Artifact data model

Every artifact is **structured data with a fixed schema**, not free prose. This is what lets
the co-pilot validate cross-references, trace scope, and compute change impact.

### 3.1 Artifacts and schemas

| # | Artifact | Schema (summary) | Template |
|---|----------|------------------|----------|
| 1 | **Domain** | prose: what the domain is, key entities, rules, terminology | — |
| 2 | **Business objectives** | numbered list | [to-besolved-list.png](images/to-besolved-list.png) |
| 3 | **Compliances** | numbered list (regulatory / legal / policy constraints) | [to-besolved-list.png](images/to-besolved-list.png) |
| 4 | **User groups** | one section per group: description, typical work, why it matters | [user-groups.md](../background/user-groups.md) |
| 5 | **Personas** | one section per persona: profile, characteristics, pain points, goals, needs. Each persona belongs to one user group. | [personas.md](../background/personas.md) |
| 6 | **Feature Map / Blueprint** | tree: `surface -> feature area -> capability`. Top-level surfaces map 1:1 to user groups. | Garbage Collection mermaid (in chat) |
| 7 | **Journey** | `Feature` (blueprint node) + `Persona` + `Primary user goal` (bullets) + steps table `[Step \| How \| Why \| Technical delight]` + `Core experience` one-liner. Flagged **existing** or **proposed**. | [user_journey.md](../background/user_journey.md) |
| 8 | **UX Matrix** | grid scoped to `Persona x Journey`. Columns = that journey's steps. Rows = evidence lenses: Channel, Analytics/behaviour data, Existing business data, User tests & interviews, Usability heuristics, Other. Cells = a finding or number pinned to (step x lens). Footer = General issues (cross-cutting). | [ux-matrix.png](images/ux-matrix.png) |
| 9 | **To-be-solved list** | `Business Goals` (numbered) + `Compliances` (numbered) + `Pain points, goals & needs` grouped by user group, each row carrying a **`To be solved?`** decision (yes / no / defer). | [to-besolved-list.png](images/to-besolved-list.png) |
| 10 | **Problems register** | table, one row per issue: `id`, `severity` (Critical/High/Medium/Low), `summary`, `location` (journey/phase + matrix ref), `type` (`HEU`+Nielsen# / `IA` / `IXD` / `CONTENT` / `DATA` / `PROCESS` / `A11Y`), `evidence` (`Observed`/`DOM`/`Policy`/`Assumption`), `affected` personas, `recommended direction` (proposed, not decided). Derived from the UX Matrix; feeds the to-be-solved list. | method/templates/problems.md |
| 11 | **Product pattern study** | as-is foundations (colour, type, spacing, radius, elevation) + component inventory & states + interaction patterns + terminology + an **inconsistency register** + **canonical patterns (proposed)** + a Figma-file plan. Reverse-engineered from the live product / repo / design-system import. | method/templates/patterns.md |
| 12 | **Open-questions register** | running list of things to verify with the business or with test access; access-gated items, business-rule confirmations, data-quality issues. Cross-cutting, lives beside Decisions. | method/templates/open-questions.md |
| 13 | **To-be-solved list** | see #9 | [to-besolved-list.png](images/to-besolved-list.png) |
| 14 | **New feature mapping** | `driver` (user pain/goal/need · business requirement · compliance · stakeholder-driven-unvalidated) → capability sketch → **placement**: one blueprint home + journey **touchpoints** (`create` / `consume` / `manage`, each pinned to a journey step) → **conflict check** (existing pattern to reuse, PII/compliance, status-model clash, entitlement rules, constraints) → downstream (blueprint node, journeys → `proposed`, open-questions). | method/templates/feature-mapping.md |
| 15 | **Work Package** | container for one objective-driven change: intent, objective type, **response type** (§3.4), affected blueprint nodes, linked to-be-solved items, evidence, assumptions, decisions, artifacts, status. | [context.md](../background/context.md) §"Work Package Model" |

### 3.2 Cross-reference links (the traceability spine)

```
Domain
  |-- Business objectives
  |-- Compliances
  |-- User groups ----------------------------< Blueprint surfaces (1:1)
  '-- Personas (belong to a user group)
           |
           v
Blueprint : surface -> area -> capability
           |
           v
Journey  --references--> Feature (blueprint node) + Persona
           | steps
           v
UX Matrix --scoped by--> Persona + Journey ; columns == Journey.steps
   cell --tier--> evidence confidence (by row type)
           | derive + critique (ux-critic)
           v
Problems register : row per issue (severity, location, type, evidence, affected, direction)
           v
To-be-solved list : per-group pain points + goals + compliances
   item.decision == human "To be solved?" ; item.response_type set here (§3.4)
           |
   ====================  PART A ends / PART B begins  ====================
           |
   ( approved items ) --classified by response type--> playbook
           v
Product pattern study (patterns.md) --checked against by--> every Part B proposal
           v
(change|new) Blueprint nodes + Journeys + Screens/Components
           --> Figma (existing vs proposed) --> handoff --> solution test --updates--^
```

Confidence tier is derived from the UX Matrix **row**:

| Row | Tier |
|---|---|
| Analytics / behaviour data | evidence-backed (quantitative) |
| Existing business data | evidence-backed (fact / constraint) |
| User tests & interviews | evidence-backed (qualitative) |
| Usability heuristics | reasonable inference |
| Other | assumption / needs validation |

The analytics row is a **funnel**: consecutive step values expose drop-off, which the co-pilot
uses to rank where problems actually matter.

### 3.3 Existing vs proposed

Brownfield requires both to co-exist. Journeys, blueprint nodes, screens, and interaction
patterns each carry an `existing | proposed` flag. The left side reads `existing`; the
right-side loop produces `proposed` and, on acceptance, promotes it.

### 3.4 Response-type taxonomy (Part B routing)

Part A tells you *what is wrong*. Part B's first move is to classify each approved
to-be-solved item into **one response type**, which selects the playbook. The problem's
`type` (HEU/IA/IXD…) is the *nature of the defect*; the response type is the *nature of the
fix* — a different axis.

| Response type | When | Output | Size |
|---|---|---|---|
| **Content fix** | wording only | revised copy + rationale | tiny |
| **Pattern adjustment** | localised screen/component fix using existing patterns; no journey change | before/after component spec | small |
| **Journey improvement** | reshape an existing journey — add states/steps/reorder — same intent | proposed journey (existing vs proposed) + impacted screens | medium |
| **Journey redesign** | same user goal, new approach end-to-end | new journey + new IA + wireframes | large |
| **New journey / feature** | capability does not exist yet | new feature mapping + new journey | large — this is the *add-feature* process |
| **Escalate** | policy / service constraint, not a design deliverable | stakeholder brief | routed out of Part B |

Every non-escalated playbook: reads the Part A model, checks proposals against
`patterns.md`, produces `proposed` artifacts beside the `existing` ones, and passes G3–G6.

### 3.5 New-feature-mapping method (the `add-feature` playbook's left side)

Adding a feature must connect seamlessly to the existing app. The method — currently manual
"by hunch", the prime automation target:

1. **Establish the driver** — user pain/goal/need (which user group + persona), new business
   requirement, compliance, or stakeholder-driven-unvalidated. The driver shapes placement:
   a user-pain driver usually attaches to the journey where that pain lives; a
   business/compliance driver more often creates a new area or surface.
2. **Find the touchpoints** — every feature attaches at up to three: `create` (where it is
   triggered/saved), `consume` (where it is surfaced/used), `manage` (where it is edited).
   Each is pinned to a specific step of an existing journey, or names a new journey.
3. **Pick the blueprint home** — new capability under an existing area / new area under a
   surface / new surface (implies a new user group).
4. **Conflict check** — is there an existing pattern to reuse? does it clash with a status
   model, entitlement rule, PII/consent obligation, or a hard constraint? Sub-drivers
   (e.g. compliance) discovered here are recorded.
5. **Emit** — blueprint node, affected journeys flipped to `proposed`, open-questions.

The co-pilot proposes the touchpoint set + blueprint home + conflicts with rationale; the
designer confirms or moves them. After mapping, the feature rejoins the shared path:
proposed journeys → solve loop.

---

## 4. Where the project model lives

Proposed: a `uxos/` directory, plain files, version-controlled.

```
uxos/
  README.md                  # index: steps done, key findings
  domain.md                  # domain analysis (general, not product-specific)
  product-context.md         # what THIS product is, scope, rules, constraints
  user-groups.md
  personas/<persona>.md
  blueprint.md               # mermaid feature map
  journeys/<id>--<journey>.md
  ux-matrix/<journey>.md     # one per journey (see §8, journey identity)
  problems.md                # problems register  (Part A output)
  to-be-solved.md            # scope decisions     (Part A -> Part B contract)
  patterns.md                # product pattern study (bridge to Part B)
  open-questions.md          # running verify-with-business register
  decisions/<id>.md
  work-packages/<id>/...      # Part B: one per response
```

Formats: frontmatter-Markdown for everything except the blueprint (mermaid). YAML frontmatter
carries the cross-reference links and the `existing|proposed` / confidence flags so they are
machine-checkable.

**Open decision:** does `uxos/` live inside the target product's repo (best for embedded
designers, needs repo access) or in a separate designer-side workspace that points at the
product (best for freelancers with many clients)? See §8.

---

## 5. Plugin decomposition

### 5A. `uxos-diagnose` (Part A)

**Commands**

| Command | Does |
|---|---|
| `/uxos:init` | context acquisition; build domain -> context -> user-groups -> personas -> blueprint -> journeys |
| `/uxos:matrix` | build/update a UX Matrix for a journey |
| `/uxos:problems` | derive the problems register from the matrices; run `ux-critic` |
| `/uxos:patterns` | reverse-engineer the product pattern study |
| `/uxos:to-be-solved` | assemble candidates; run the G2 scope gate; set response types |

**Skills:** `analyse-domain`, `study-product` (browser crawl -> context + journeys-by-name),
`build-blueprint`, `capture-users`, `map-journey-steps`, `ux-matrix`, `problems-register`,
`problem-discussion`, `pattern-study`, `to-be-solved`.

**Subagents:** `context-extractor` (read-only sweep of repo / screenshots / docs / live URL);
`ux-critic` (evidence vs assumption, severity, preference vs real issue) — runs at problem
discussion.

**Shared `next-steps` advisor:** reads `uxos/` state (what exists, what's missing, what's
flagged) and returns a **ranked, non-binding** suggestion list — canonical next step + a gap
worth closing now + an independent step + free choice. Every command calls it on exit; it
also backs `/uxos:status`. This is the "what are you working on?" interaction model
(initial-intent.md) — the OS offers direction, never enforces sequence.

### 5B. `uxos-design` (Part B)

**Commands**

| Command | Does |
|---|---|
| `/uxos:respond` | take a to-be-solved item (or cluster); classify response type; open a Work Package; run the playbook |
| `/uxos:continue` | resume a Work Package with full context restored |
| `/uxos:impact` | change-impact traversal over the model |
| `/uxos:handoff` | generate downstream spec/prompt (Figma link / Stitch / code tool) |

**Skills — one playbook per response type (§3.4):** `content-fix`, `pattern-adjustment`,
`journey-improvement`, `journey-redesign`, `add-feature`, plus shared `figma-sync`,
`wireframe-handoff`, `solution-test`.

**Subagents:** `consistency-checker` (pattern / terminology / status-model drift against
`patterns.md`); `impact-analyzer` (graph traversal over cross-reference links);
`ux-critic` (reused at solution-test).

### 5C. Figma stage (Part B, needs connector authorisation)

The Figma connector (`plugin:figma:figma`) is **not enabled by default** — the user
authorises it via claude.ai connector settings or `/mcp` in an interactive session. Once
connected, `figma-sync` uses the Figma MCP + skills (`figma-generate-library`,
`figma-generate-design`) to:

1. build a **design-system file** from `patterns.md` §6 (foundations as variables + core
   components with variants);
2. capture **existing** reference screens from live screenshots;
3. place **proposed** variants beside them per Work Package;
4. optionally Code Connect to a repo.

Pattern extraction that seeds this (tokens, component inventory, states) runs from the
**browser** and needs no connector.

---

## 6. Co-pilot gates (human decision points)

| Gate | The system brings | The human decides |
|---|---|---|
| **G1 — Context review** | left-side model with every claim tagged by source + confidence; a short list of conflicts and unknowns | confirm / correct the flagged items (not the whole model) |
| **G2 — Scope** | To-be-solved candidates: business goals, compliances, per-group pain points with evidence | `To be solved?` yes / no / defer per pain point |
| **G3 — Direction** | 2-3 solution directions with trade-offs | picks one; system does not pick |
| **G4 — Decision record** | draft rationale | states the decision; system captures the "why" |
| **G5 — Handoff** | generated spec / prompt for the downstream tool | approves before anything leaves the system |
| **G6 — Loop iteration** | solution-test findings | judges whether to iterate or promote `proposed` -> `existing` |

Non-blocking principle (from initial-intent.md): the system may flag missing context at any
gate, but always offers "continue anyway".

---

## 7. MVP slice

Ship **`uxos-diagnose` (Part A)** end to end. It has been walked manually against a real
transit seat-reservation web app (kept as a private regression fixture):

```
/uxos:init      -> analyse-domain + study-product + build-blueprint + capture-users
                   + map-journey-steps            -> G1 context review
/uxos:matrix    -> ux-matrix per key journey       -> problem-discussion (ux-critic)
/uxos:patterns  -> pattern-study (browser)
/uxos:problems  -> problems register (severity / location / type / evidence / direction)
/uxos:to-be-solved -> candidates -> G2 scope gate -> response types set
```

Success = a designer runs this, corrects a handful of flagged items, and ends with a
defensible problems register + to-be-solved list whose every item traces back to a matrix
cell -> journey step -> persona -> user group, and forward to the blueprint nodes and
response type — with less effort than scattered AI chats and files.

Deliberately **not** in the MVP: `uxos-design` (Part B) playbooks, Figma sync,
add-feature/revamp analysis paths, analytics connectors, greenfield.

---

## 8. Open decisions

1. **`uxos/` location** — in the product repo vs a standalone designer workspace (§4).
2. **UX Matrix analytics row** — manual paste for MVP, or plan a GA/PostHog/Amplitude
   connector? Determines whether `solution-test` can ever be quantitative.
3. **Trigger sources** — is "PO's story" always the entry, or can work start from a
   designer's own observation with no stakeholder story? *(the test walkthrough started from observation.)*
4. **Handling access-gated products** — when key journeys sit behind login, the extractor
   needs designer-supplied test credentials, or it stops at the auth wall and the matrix
   carries `Assumption`-tier findings only (as in the test walkthrough, ~70% of the gated journeys).

**Platform coverage (resolved):** the method is platform-agnostic; only the extractor's
source changes. `context-extractor` has a per-platform branch — **code-first** for native
apps (nav graph → feature map; screen components → capabilities; theme files → pattern
foundations), a **simulator/emulator walk** when there's a runnable build (iOS Simulator
tooling is wired in; Android emulator is the analog), and a **screenshot/recording
inventory** fallback. `/uxos:init` asks platform + available inputs;
`product-context.md` records `platform`. Web (URL + DOM + computed styles) stays one branch
among several.

**Resolved during the test walkthrough:**
- **Journey identity** — one journey doc *per journey* (not per feature × persona); the UX
  Matrix is per journey, with persona-differential severity tagged in cells.
- **Problems register** is a first-class artifact between UX Matrix and to-be-solved list.
- **Pattern study** is browser-reverse-engineered by default; a design-system import just
  seeds it. It runs as the **last step of Part A** so Part B always has it.
- **`patterns.md` recommendations** carry a "proposed, not decided" flag; the real design
  work is Part B.
