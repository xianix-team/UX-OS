# Part A — `uxos-diagnose`: what gets built & how you use it

Read this before I build. It shows the plugin structure and the end-to-end workflow you'd
run, grounded in a walkthrough against a real transit web app.

---

## 1. What gets built

A **Claude Code plugin** — you run it from the terminal / the Code tab.

```
uxos-diagnose/
  .claude-plugin/plugin.json
  commands/
    init.md            # /uxos:init
    journeys.md        # /uxos:journeys
    matrix.md          # /uxos:matrix <journey>
    patterns.md        # /uxos:patterns
    problems.md        # /uxos:problems
    to-be-solved.md    # /uxos:to-be-solved
    status.md          # /uxos:status
  skills/
    analyse-domain/       study-product/        build-blueprint/
    capture-users/        map-journey-steps/    ux-matrix/
    pattern-study/        problems-register/    problem-discussion/
    to-be-solved/
  agents/
    context-extractor.md  # read-only crawl of URL / repo / docs / screenshots
    ux-critic.md          # challenges findings: evidence vs assumption, severity, preference
  templates/              # artifact skeletons (from docs/)
```

**Output** = the `uxos/` folder — plain markdown + mermaid, git-tracked, hand-editable.
That folder *is* the project memory. Nothing about the product ever needs re-pasting into a
chat again.

**Every command ends at a review gate.** Nothing is written silently; nothing proceeds past
a gate without you (or you saying "continue anyway").

---

## 2. Setup — once per project

```bash
cd ~/clients/acme-portal            # your workspace for this product
claude
```
```
/uxos:init
```

`/uxos:init` asks a short set of questions:

```
Project name?              acme-portal
Where does the model live?  ./uxos   [default]   ·   or a path
Platform?                   web  /  iOS  /  Android  /  desktop  /  other
What do you have?  (tick any — the extractor leans on the highest-fidelity one)
  [ ] Code repo        <path>       ← best structural signal on ANY platform
  [x] Live URL         https://app.example.com   (web)
  [ ] Runnable build   <project>    (iOS → simulator · Android → emulator)
  [ ] Screenshots / recording  <folder>   (fallback when no repo/build)
  [ ] Figma  <link>   ·  [ ] Docs / PRD  <paths>  ·  [ ] Store listing  <url>
How familiar are you with this domain?   Not very  /  Somewhat  /  Very
   (Very  → domain analysis is skipped)
Test credentials for gated flows?   (you drive sign-in; the extractor stays read-only)
```

**Per platform the extractor works differently, same output:** web → crawl URL + DOM +
computed styles; native app with a repo → read the navigation graph, screen components,
state enums, theme files; native app with a build → walk it in the simulator/emulator
(screenshot every screen, tap through flows); no repo/build → inventory the screenshots or
recording you supply. `product-context.md` records which `platform` and sources backed it.

Then `context-extractor` runs (crawls the URL, reads any repo/docs), and first drafts are
written:

```
uxos/domain.md            uxos/user-groups.md
uxos/product-context.md   uxos/personas/*.md
uxos/blueprint.md         uxos/open-questions.md
```

### Gate G1 — context review

```
Built an initial model from the live site + your inputs. 14 items need your eye:

CONFLICTS (2)
  • blueprint: "My Reservations" — found no nav link, guessed it exists. keep / cut?
  • personas: added a "foreign tourist" segment under General Passenger — include?

UNKNOWNS (7)
  • reservation window length (days ahead booking opens)
  • whether search itself needs login
  • ... (all now in open-questions.md)

LOW-CONFIDENCE GUESSES (5)
  • class availability per route taken from the "Our Services" text, not tested
  • ...

→ Edit the files directly, or tell me the fixes. Say "continue" when ready.
```

You fix what matters, ignore the rest, `continue`.

---

## 3. The main loop

### 3.1 Name the key journeys

```
/uxos:journeys
```
```
From the product I can see these journeys:
  J1  Search availability            J7  Login
  J2  General passenger booking      J8  Cancellation (offline)
  J3  Warrant booking                J9  Refund on disruption (offline)
  J4  Pension warrant booking        J10 Contact / complaint
  J5  Season ticket (external)       J11 Print ticket at station
  J6  Register + OTP

Which are KEY for this engagement?   › J1 J2 J3 J4
```
Writes `uxos/journeys/*.md` (feature link, primary goal, flow steps + a mermaid diagram)
for the ones you pick.

### 3.2 Build a UX Matrix per journey

```
/uxos:matrix J3
```
- proposes ~5–7 **phases** as columns (you confirm the split)
- fills the **Usability heuristics** row (Nielsen 10) and **Other** row (IxD / IA) from what
  it can actually reach via the browser
- marks login-gated phases `not evaluable — needs access`; asks *"do you have test
  credentials?"*
- leaves **analytics / business-data / interview** rows for you
- writes `uxos/ux-matrix/j3-*.md`

Repeat per key journey.

### 3.3 Pattern study

```
/uxos:patterns
```
Extracts real tokens (colour, type, spacing, radius, elevation) + component inventory +
states from the live product. Writes `uxos/patterns.md` with an **inconsistency register**
and **proposed canonical patterns** + a Figma-file plan.

### 3.4 Problems register

```
/uxos:problems
```
Turns matrix cells into a table — `severity · summary · location · type · evidence ·
affected · recommended direction`. Runs `ux-critic` to challenge each row; you see its
pushback inline:

```
PRB-11  Seat map doesn't confirm "seats together" before payment
  ux-critic: this is ASSUMPTION-tier — the seat map is behind login and unobserved.
             Keep as a problem, but mark "needs verification", not a finding.
  keep as-is / downgrade / drop ?  › downgrade
```
Writes `uxos/problems.md`.

### 3.5 To-be-solved — the scope gate (G2)

```
/uxos:to-be-solved
```
```
BUSINESS GOALS         (from PROCESS problems)
  1. Reduce station-counter dependency for collect/confirm/cancel   [in scope by default]
COMPLIANCE
  1. Consent + retention for stored passenger PII (PRB-14 C-2)      [in scope by default]

UG1 General Passenger — pain points
  1. Re-enters every passenger each booking (PRB-14)          to be solved?  › yes
     response type?  › new-feature
  2. Can't tell if seats are together before paying (PRB-11)  [needs verification — skip]
  3. Payment double-charge recovery is manual (PRB-07)        to be solved?  › yes
     response type?  › escalate

UG2 Warrant — pain points
  1. No "temporary vs confirmed" status + deadline (PRB-01/02) to be solved? › yes
     response type?  › journey-improvement
  ...
```
Writes `uxos/to-be-solved.md` — the contract handed to Part B.

---

## 4. Coming back later

```
/uxos:status
```
```
acme-portal — last touched 3 days ago
  Model: 9 artifacts · 4 key journeys · 31 problems
  To-be-solved: 5 in scope · 3 need verification · 12 deferred
  Open questions: 18 unresolved
  Next: 5 scoped items have no work package → (Part B) /uxos:respond
```

No context rebuild. Pick up exactly where you left off.

---

## 4a. After every command — suggested next steps

Each command ends with a **ranked, non-binding** "Next" block. It is computed from the
current `uxos/` state (what exists, what's missing, what's flagged), not a fixed menu.
You always choose; "do your own thing" is always implied.

Shape: **① the usual next step · ② a gap worth closing now · ③ something independent you
can do anytime · ④ free choice.**

**After `/uxos:init` + G1**
```
Next:
  1. /uxos:journeys         name the key journeys                  ← usual next
  2. edit uxos/personas/   4 personas are inferred — refine before they drive analysis
  3. /uxos:patterns         pattern study (doesn't need journeys)
  4. open-questions.md      12 unknowns logged — some need the business
```

**After `/uxos:matrix J3`**
```
Next:
  1. /uxos:matrix J4        3 key journeys still have no matrix     ← usual next
  2. /uxos:problems J3      derive problems from J3 alone (incremental is fine)
  3. test credentials       ~70% of J3 is "needs access" — unlocks the biggest gap
  4. /uxos:patterns         feeds the problem recommendations
```

**After `/uxos:problems`**
```
Next:
  1. /uxos:to-be-solved     run the scope gate                     ← usual next
  2. review problems.md     31 issues, 1 critical — sanity-check severities
  3. verify assumptions     8 High/Medium issues are assumption-tier
  4. /uxos:patterns         not done yet — recommendations are weak without it
```

**After `/uxos:to-be-solved` (G2)** — Part A essentially done
```
Next:
  1. (Part B) /uxos:respond   5 scoped items — start with the warrant cluster
  2. share uxos/             hand problems.md / to-be-solved.md to stakeholders
  3. /uxos:matrix J1          J1 was keyed but never matrixed
```

Same engine powers `/uxos:status` — it is just this block, unscoped.

---

## 5. Split of work

| The plugin does | You do |
|---|---|
| Crawl the product; draft domain / context / blueprint / users / personas | Correct the flagged items at G1 |
| Extract journey steps, tokens, components, states | Choose which journeys are "key"; confirm phase splits |
| Fill heuristic + IxD/IA matrix rows; compute severity | Fill any evidence row (analytics, business data, interviews) |
| Derive + critique the problems register | Decide y/n/defer per pain point at G2; set response types |
| Keep every link (problem ↔ matrix cell ↔ journey ↔ blueprint) | Judge whether an assumption is worth acting on |

---

## 6. Build order (what I'll do)

1. Plugin scaffold + `uxos/` schema + templates.
2. `context-extractor` + `/uxos:init` + G1.
3. `next-steps` advisor (shared: reads `uxos/` state → ranked suggestions; every command
   calls it on exit; also backs `/uxos:status`).
4. `/uxos:journeys`, `/uxos:matrix`.
5. `/uxos:patterns`.
6. `ux-critic` + `/uxos:problems`.
7. `/uxos:to-be-solved` + G2.
8. `/uxos:status`.

Tested at each step against a private regression fixture (a real transit seat-reservation
web app walked by hand) — the `uxos/` the plugin produces should match it.
