# UX Designer OS — Quick Start

A copy-paste reference for new users. Everything below runs **inside a `claude` session in
a terminal or VS Code's integrated terminal** — not this desktop app's Code tab, not the VS
Code extension's chat sidebar. Full explanation of why: [`testing-the-plugin.md`](testing-the-plugin.md).

Each command ends with a ranked "Next" suggestion — you're never stuck guessing what comes
after. `/uxos:status` works anytime and tells you where a project stands.

---

## 0. One-time setup

```bash
npm install -g @anthropic-ai/claude-code
```
```bash
cd <an empty folder for this project>
claude
```
Inside the `claude` prompt:
```
/plugin marketplace add rasikain/ux-os
/plugin install uxos@uxos-marketplace
```

### Giving it a URL? It needs a browser

A URL input only works properly if Claude can **actually browse** — not just fetch the page.
A plain fetch returns static HTML: no rendered pages, no computed styles, no screenshots, no
clicking through flows. In a terminal or VS Code, that means the **Claude in Chrome**
extension. You don't have to remember this — `/uxos:init` (and `patterns`, `matrix`,
`journeys`) checks first, and if there's no browser it stops and offers you a choice instead
of failing halfway.

The check loads the browser tools before deciding — Claude in Chrome first, then the desktop
app's built-in browser pane. If you ever see "no browser" while the extension is connected,
update the plugin (`/plugin update uxos@uxos-marketplace`) and restart the session.

`/uxos:init` will also always ask whether you have **code repo access**, even when you gave a
URL — the repo is the best structural signal for the feature map, the URL adds screens,
styles, and flow detail.

To set it up yourself:
1. Install the **Claude in Chrome** extension (v1.0.36+) from the
   [Chrome Web Store](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn)
   — Chrome, Edge, or another Chromium browser (not Safari or Firefox).
2. Start with `claude --chrome`, or run `/chrome` inside a running session.
3. Check `/chrome` shows **Status: Enabled** and **Extension: Installed**.

Needs a direct Anthropic plan (Pro, Max, Team, or Enterprise) signed in via `/login` — not an
API key, and not Bedrock/Vertex/Foundry — and doesn't work in WSL. No browser? You can still
proceed with a code repo, screenshots, or Figma instead, or accept a clearly-labelled
reduced mode.

---

## 0.5 Already have some of this? Import it first

If you already have a domain write-up, personas, a feature map, journeys, an audit, brand
guidelines, or research — **don't recreate them.** Point at them, in any format:

```
/uxos:import <file, folder, or URL>        # or paste the content
```

It reads everything (Word, PDF, spreadsheets, images, exports — whatever you have), sorts
each document into the artifact it resembles, and shows you the mapping before writing
anything. Documents that are relevant, readable, and free of secrets get **copied into
`uxos/sources/`** so every artifact traces back to its source; your originals are never
touched. Your content is kept in your own words and moved into the right template — anything
the template has no slot for goes under "Additional (imported)", and anything you *don't*
have stays empty and is listed as missing rather than invented. Then `/uxos:init` generates
only the gaps.

Two things to know: `uxos/sources/` is committed along with `uxos/`, so if the repo is
shared or public, add it to `.gitignore`; and imported material is marked
`designer-supplied` — adopted, not validated. A client requirements document isn't
converted; it's kept as the input for `/uxos:requirements-gap`.

`/uxos:init` also asks whether you have any of this, so you can skip straight to it there.

---

## 1. Start a project

```
/uxos:init
```

First question: **does this product already exist (brownfield), or is this starting from
scratch (greenfield)?** Everything after branches on the answer.

**Brownfield** — answer the questions, or paste a block like this right after (adjust the
bracketed parts — for a multi-app/connected product, list every surface, see the note
below):

```
Project: <name>
Platform: web
Inputs: live URL — <paste> (or: code repo — <path or git URL>)
Domain familiarity: somewhat
Test credentials: none for now
```

> **Connected apps (e.g. a public site + an admin panel + a client portal)** are ONE
> product with multiple surfaces, not three separate projects — list all the URLs/repos in
> one `/uxos:init` and say explicitly they're connected. See [`part-a-workflow.md`](../architecture/part-a-workflow.md) for
> the fuller pattern.

It crawls/reads, drafts the model, and stops at **gate G1** — a review block. Fix what
matters, then:
```
continue
```

**Greenfield** — paste a block like this instead:
```
Project: <name>
Platform: web
Reference material: <a PRD/BRD, brand guidelines, competitor products for inspiration — any or none>
Domain familiarity: not very
```
It researches the domain (this is the primary evidence source — there's no product to
observe) and goes straight to user-group candidates. **No gate G1** — nothing was crawled to
review. Go to §2B.

---

## 2A. Brownfield — map the existing journeys, get the project ready

```
/uxos:journeys
```
Pick which journeys are **key** when asked. This writes each one's flow steps + diagram.

```
/uxos:patterns
```
Reverse-engineers the product's design patterns, organised by **atomic level, bottom-up**:
foundations (colour palette first, then typography, then spacing/radius/elevation) → atoms →
molecules → organisms → templates. Each level notes what it's composed of, and the
inconsistency register tags each problem with its level — a button styled three ways (an
atom) is the cause of the messy forms (molecules) and screens built on it.

*(Optional, before any Figma handoff later)*
```
/uxos:figma-library
```
Builds the Figma design system from the canonical patterns above, in that same order —
colour, typography, spacing/radius/elevation, then atoms, molecules, organisms, templates —
and **stops for your confirmation after each stage**, since a flaw in an atom propagates
into everything built from it. Each level uses only instances of the one below, with every
value bound to a variable. Screens (Pages) come later, from `/uxos:design`, assembled from
these.

**The project is now "ready"** — domain, product context, user groups, personas, blueprint,
key journeys, and patterns all exist. Everything below builds on this.

---

## 2B. Greenfield — establish scope and design direction

```
/uxos:to-be-solved
```
No `problems.md` exists yet, so this runs `problem-validation` internally first:
consolidates the confirmed personas' pain points/goals/needs **by theme** (not per-persona —
a cross-cutting issue like "Communication" shouldn't get duplicated across every persona it
touches), with severity, impact, and dependencies. Then the usual scope gate — `yes` / `no`
/ `defer` per theme item, with a response type.

*(optional — only if a client gave you a requirements document)*
```
/uxos:requirements-gap <path or pasted client doc>
```
Cross-checks the client's own functional + non-functional requirements against what you
just drafted, both directions, plus a fixed NFR sweep (performance, security, accessibility,
scalability, privacy, localization, reliability, data retention, maintainability — the
category clients forget most). Catches what the client's requirements missed, and what you
have that they didn't ask for.

```
/uxos:design-direction
```
Before any screen gets designed. Stage-gated — one decision at a time, confirmed before the
next: already-fixed brand constraints, design philosophy, colour, typography, spacing/
density, accessibility baseline, iconography, platform convention stance. There's no
existing product to extract patterns from, so this *is* the source of truth for visual
direction.

```
/uxos:patterns
```
On greenfield this doesn't reverse-engineer anything. The foundations (colour, typography,
spacing…) come straight from `design-direction.md`; the atoms, molecules, organisms and
templates above them are a proposed starter set, marked provisional until journeys and
screen specs show what's really needed.

```
/uxos:blueprint
```
Builds the initial (sparse) feature map from the approved to-be-solved items. It grows as
journeys and screen specs get designed — that's expected, not a gap.

**The project is now "ready"** for greenfield — domain, user groups, personas, to-be-solved,
design direction, patterns, and an initial blueprint all exist. Continue at §3.

---

## 3. Add a new feature

```
/uxos:feature-mapping "<feature name or idea>"
```
Walks 5 stages — driver, capability sketch, placement, conflict check, downstream summary —
confirming at each before writing anything.

```
/uxos:blueprint uxos/feature-mapping/<slug>.md
```
Adds the confirmed node to the feature-map tree (shows the diff first).

```
/uxos:journey-design "<feature name>"
```
Drafts the full journey — Step / How / Why / Technical-delight — as one proposal; name any
step numbers to redo.

*(optional, recommended)*
```
/uxos:edge-cases "<feature name>"
```
Systematically checks input/data, state/timing, actor/permission, system/network,
cross-surface handoff, and accessibility edge cases against this journey's actual steps —
never runs on its own, but worth doing before handoff.

*(the dev handoff — for engineering, QA, and AI-DLC agents)*
```
/uxos:requirements "<feature name>"
```
Writes the journey up as development **Units**: each one a buildable slice with Who, Why
(user story + trace to to-be-solved), What, How (flow, screens, states, data, business
rules) and Given/When/Then acceptance criteria with stable ids. It folds in the screen spec,
edge cases and related UX issues automatically, proposes the slicing for your OK first, and
marks any unit with open questions `not-ready` instead of guessing. Run it after
`/uxos:screen-spec` for the fullest units.

*(strongly recommended before handoff)*
```
/uxos:screen-spec "<feature name>"
```
A journey's steps only cover the **primary path** — this specs every screen it touches:
how the user actually gets there (entry points), sub-actions beside the main one, filters/
sort/search controls, and any nav/menu updates. Skip this and design-handoff will warn you
that it's only building the best-case interaction.

*(building as code? run this once first)*
```
/uxos:code-library
```
The code counterpart to `/uxos:figma-library`: builds your design system **in code**, bottom-up
— colour tokens, typography tokens, spacing/radius/elevation, then atoms, molecules,
organisms, templates — and stops for your confirmation after each level. It matters most
where there's nothing to compose from yet (greenfield, or a product styled by one-off
overrides): without a library, "build from components" quietly turns into inline CSS.

```
/uxos:design "<feature name>" figma
```
or `claude-design`, `prompt` (Stitch/another tool), or `code` (build a working prototype in the
repo). This is the design handoff — the end of the add-feature chain.

**Claude Design** gives you one canvas per journey: an artboard for every screen in the
screen spec *and* for each of its states (empty, error, loading…), labelled with steps and
unit ids, with limits and messages taken from `business-rules.md`. No Figma licence or
connector needed — good for ideation and client demos. Build the shared design system once
first with `/uxos:claude-design-library`. Collect feedback as comments on the canvas, then run
`/uxos:design <journey> claude-design` again: uxos reads the comments and revises the same
canvas. It needs the Claude desktop app (or a claude.ai-linked session); where Claude Design
isn't available, uxos says so and offers the other targets.

**The code path holds to a build contract:** every value is a token, styling lives only in
the component layer, screens only compose, no static inline styling (dynamic values go
through CSS variables or props), atomic structure, accessibility at the atom. The prototype
is isolated by default — new branch, its own route or flag, mock fixtures, no backend
wiring. After **each screen** an audit scans for inline styles, raw colours, magic values,
styling inside screens and components defined in screens; findings block your confirmation
unless you record an override. It can't judge visual fidelity, so it also runs the prototype
for you to look at.

---

## 4. Analyse an existing journey — matrix and issues (brownfield)

Greenfield has no existing journeys to matrix — this section is for improving something
that already exists; skip to §3 if you're still on a greenfield project.

```
/uxos:matrix <journey-id>
```
Builds the UX Matrix for one journey — phases as columns, Nielsen heuristics + IxD/IA rows
filled in automatically, evidence rows (analytics / business data / interviews) left for
you to paste in if you have them.

```
/uxos:problems
```
Derives the problems register from the matrix — severity, location, type, evidence tier,
affected personas, a recommended direction. `ux-critic` challenges each finding before it's
final.

```
/uxos:to-be-solved
```
The scope gate — decide `yes` / `no` / `defer` / `needs-verification` per pain point, and
set a **response type**. A `yes` with response type `new-feature` or `journey-improvement` /
`journey-redesign` sends you back into §3's chain (`journey-design` → `design`) for that
specific item.

---

## 5. After developers build — keep uxos in sync

A feature you ideated and prototyped in uxos gets built by developers later. uxos finds out
from the code, not from you.

- If the project has a repo (set at `/uxos:init`, or add it any time with
  `/uxos:sync <repo path or git URL>`), every command that reads the model first checks for
  new commits on the main branch. If there are any, it asks whether to sync before going on.
- ```
  /uxos:sync
  ```
  reads the new commits, matches them to the model, and shows one report: features that
  were only ideas and are now **built**, flows that **changed**, units that are **partly**
  done, things built that uxos **never saw**, and things **removed**. You accept or reject
  each item; nothing changes until you do. Accepted changes are tagged `[from code]` and
  logged in `uxos/sync-log.md`.
- Ask developers to put the unit id (e.g. `U-J3-2`) in commit messages or PR titles. It's
  printed at the top of every Units file, and it turns guesses into exact matches.

**Got code access only after the documents were built?** Run `/uxos:sync <repo path or git
URL>`. The first time, it reads the code and proposes additions and corrections to what you
already have — business rules into `business-rules.md`, confirmed or corrected features in the
blueprint, hidden branches in journeys, edge cases the code already handles, exact design
tokens, answers to open questions — without regenerating anything. Same report, same
accept-or-reject. After that it switches to normal syncing.

**Business rules live in one place:** `uxos/business-rules.md`. Every rule (limits,
validation, cut-offs, refunds, status changes, permissions) gets an id like `BR-3`, its
value, whether it exists today or is only proposed, and where it came from. Journeys and the
Units handoff cite the ids, and syncing with the code keeps the register current — when a
rule changes, the report shows which journeys and units are affected.

uxos only reads the repo — it never pulls, checks out, or changes your working tree, and
feature branches don't count as built.

---

## 6. Optional — see what competitors do

```
/uxos:competitors
```
Not required, but uxos suggests it at useful moments — after domain research on
greenfield, before scoping on brownfield, or when a feature's only reason is "a competitor
has it". It proposes competitors in four groups — **direct**, **indirect**, **substitutes**
(what people do instead today), and **analogous** (best-in-class at one step, from another
field) — and you confirm the list. It then maps them onto *your* feature map: what's
**table stakes**, what's a **differentiator**, and the **whitespace** nobody serves well.
For 2–3 of them it walks your key journeys on their public site (read-only — no sign-ups),
reads public reviews for recurring complaints, and links each finding to your to-be-solved
list, journeys, or personas. Everything is dated and evidence-tagged; "they have it" alone
never decides scope. Re-run it later to refresh.

---

## 7. Designing in Claude Design, prototyping in code

The recommended setup — no Figma licence, and one design system instead of two.

**Greenfield (no code yet):** design starts in Claude Design.
```
/uxos:claude-design-library      # the design system, built in Claude Design
/uxos:design J1 claude-design    # one canvas per journey — screens, states, 2-3 directions
```
Share the canvas with your client; their comments become decisions in the journey, screen
spec, or patterns. When the first journeys are approved:
```
/uxos:promote
```
translates the Claude Design System and approved screens into a real code library and a
**functional prototype**, checks it looks the same side by side, and from then on the
**code is the master**. You run `/design-sync` once, and Claude Design becomes a mirror of
the code (read-only, so nothing drifts).

**Brownfield (code exists):** the code is the master from day one — run `/design-sync`
to bring your component library into Claude Design, then explore on canvases built from it.

**The prototype is functional**, not static screens: real routes between screens, sample
data shaped by the Units, business rules that actually behave (limits, messages), a
state switcher to show empty / loading / error / edge-case states, and unit and
acceptance-criteria ids on the screens for QA.

**Changed something in Claude Design later?**
```
/uxos:mirror
```
finds what changed on canvases (and in comments) and routes each change properly — a
colour through `/uxos:impact`, a component through the code library, a screen through the
prototype — so it lands in code first; then it asks you to run `/design-sync` and checks
Claude Design matches.

---

## 8. A client asks for a design change — check the impact first

"Can we make the button blue darker?" Before touching anything:
```
/uxos:impact "make the primary button blue darker"
```
uxos works out whether that colour is a **token** (and which one — a palette value or a
role like "primary action"), a setting on one component, or a value **hardcoded** with no
token. Then it counts every place it's used — components, screens, journeys, units — in
`patterns.md`, the code, Figma, and Claude Design, whichever you have, and lists
**look-alikes**: the same colour used without the token, which a token change would miss.

You get the options side by side — change it **everywhere** (the token), only **where it
means this** (a new token), only on **this component** (a variant), or a **one-off** — each
with how many places it touches, a contrast check against every background it sits on, and
the built screens QA would need to re-test. Nothing changes until you pick one; then it's
applied through the library command for your design system. Works the same for fonts,
spacing, corners, shadows, or a whole component. The report is saved in `uxos/impact/`,
handy for the client conversation.

---

## Anytime

```
/uxos:status
```
Where the project stands, and the ranked next-step suggestions — safe to run whenever, and
writes nothing.

---

## Full command index

| Command | What it does |
|---|---|
| `/uxos:import <path>` | adopt documents you already have (any format, file or folder) instead of recreating them |
| `/uxos:init` | brownfield or greenfield; crawl inputs or start research; gate G1 (brownfield only) |
| `/uxos:journeys` | brownfield — name + map the key journeys |
| `/uxos:matrix <J>` | brownfield — UX matrix for one journey |
| `/uxos:patterns` | reverse-engineer (brownfield) or populate from design-direction (greenfield) |
| `/uxos:problems` | brownfield — derive + critique the problems register |
| `/uxos:to-be-solved` | scope gate — decide what to solve, set response types (runs problem-validation internally on greenfield) |
| `/uxos:requirements-gap [doc]` | greenfield — cross-check a client FR/NFR doc against to-be-solved, both ways + NFR sweep |
| `/uxos:design-direction` | greenfield — philosophy, colour, type, spacing, a11y, before any screen work |
| `/uxos:feature-mapping <feature>` | add-feature: driver, placement, conflict check |
| `/uxos:blueprint [source]` | create the feature map, or update it (diff, confirm) |
| `/uxos:journey-design <journey>` | create / update / enrich a journey in full detail |
| `/uxos:edge-cases <journey>` | systematic edge-case register — suggested, never forced |
| `/uxos:requirements <journey>` | dev handoff: Units (Who/Why/What/How + acceptance criteria), folding in screen specs, edge cases, UX issues |
| `/uxos:screen-spec <journey>` | per-screen spec — entry points, sub-actions, controls, nav updates, states |
| `/uxos:figma-library` | build/update the Figma design system bottom-up by atomic level, confirmed stage by stage (run once) |
| `/uxos:code-library` | build/extend the design system in code bottom-up, confirmed level by level (run once before the first code handoff) |
| `/uxos:claude-design-library` | build/update the design system in Claude Design, bottom-up, confirmed level by level (run once before the first canvas) |
| `/uxos:design <journey> [claude-design\|code\|figma\|prompt]` | hand off to a Claude Design canvas, a functional prototype in code, Figma, or a prompt |
| `/uxos:competitors [names/URLs]` | optional: competitors mapped onto your model — table stakes, differentiators, whitespace, journey walk-throughs, review themes |
| `/uxos:promote [journeys]` | greenfield: move the design from Claude Design into a code library + functional prototype; code becomes the master |
| `/uxos:mirror [push\|pull\|verify]` | keep Claude Design and code in step — push via your `/design-sync`, pull canvas changes back into code |
| `/uxos:impact "<change>"` | before a design change: is it a token, where is it used, change it here or everywhere — with contrast and re-test checks |
| `/uxos:sync [repo]` | first time: enrich existing documents from the code (business logic etc.); after that: bring the model in line with what developers built |
| `/uxos:status` | where things stand + suggested next steps |

Update the plugin any time with:
```
/plugin marketplace update uxos-marketplace
/plugin update uxos
```
