---
name: competitor-analysis
description: Optional, suggested by next-steps. Benchmark the product against direct, indirect, substitute, and analogous competitors — a dated landscape mapped onto the uxos model (feature coverage against the blueprint or themes → table stakes, differentiators, whitespace), deep dives that walk our key journeys on 2-3 competitors' public products, a light heuristic, content, and trust read, and voice-of-customer themes from public reviews. Every cell carries evidence; nothing behind a login is guessed. Feeds domain, to-be-solved, feature-mapping, and journey-design as supporting evidence — never as a driver on its own.
---

# competitor-analysis

Goal: know what users already get elsewhere — what is table stakes, what is a real
differentiator, where nobody serves them well — in the terms of *this* model (its
journeys, blueprint, themes), so the findings land where decisions are made instead of in
a standalone deck.

Optional. `next-steps` suggests it; it never blocks anything.

**Template is the contract.** Read `${CLAUDE_PLUGIN_ROOT}/templates/competitors.md` (landscape) and
`${CLAUDE_PLUGIN_ROOT}/templates/competitor.md` (deep dive) before writing, and keep their frontmatter keys
and headings exactly. If a template can't be read, stop and say so — never write from
memory. Empty sections get `none` or `not evaluable — <reason>`, not deletion.

## Evidence — every cell, no exceptions
| Tag | Means |
|---|---|
| `[observed-web, <date>]` | seen on the competitor's public site or app store page, this run |
| `[walked, <date>]` | a flow walked live in the browser, public part only |
| `[from reviews, <source>, n=<count>]` | app store / review-site reviews actually read |
| `[desk, <url>]` | press, help centre, pricing page, docs read this run |
| `[designer]` | the designer's own knowledge |
| `not evaluable — <reason>` | gated, region-locked, app-only, or not found |

Never fill a cell from general knowledge about a well-known company; check it or mark it.
Pricing, feature lists, and positioning change — every artifact carries its date.

## Stage 1 — Frame (confirm before research)
Ask, in one block:
- **Purpose:** greenfield (shape themes and scope), brownfield (benchmark the existing
  product), or a specific feature (from `feature-mapping`).
- **Market:** country / region and language — local players matter (e.g. Norway-only
  platforms).
- **Journeys in focus:** default to the key journeys in `uxos/journeys/`; on greenfield
  with none yet, the themes in `to-be-solved.md` or the processes in `domain.md`.

## Stage 2 — Candidates (designer confirms)
Propose candidates from `domain.md`, `product-context.md`, any competitor URLs given at
`init`, and web research, in four groups:
| Type | Meaning |
|---|---|
| **Direct** | same job, same users |
| **Indirect** | same job, different approach or user |
| **Substitute** | what people do instead today — spreadsheets, messaging groups, phone calls, manual workarounds |
| **Analogous** | best-in-class at one step of our journey, from another domain |
For each: one line on why it's relevant and its source. Recommend a landscape of about
5–8 and **2–3 deep dives** (the ones closest to the journeys in focus). The designer adds,
removes, and picks the deep dives. **Stop for confirmation** — and go on only when the reply
confirms the list itself; an answer to the framing questions alone is not that. Ask again.

## Stage 3 — Landscape (desk, every confirmed competitor)
Desk research only — web search and page fetches; no browser needed, so don't run
`browser-preflight` yet.
Per competitor, from public sources: positioning and target users, platforms (web / iOS /
Android / desktop), business model and public pricing, notable integrations, market
presence in the chosen region. Then the **coverage matrix**:
- **Rows** — our capabilities: blueprint nodes if `blueprint.md` exists; otherwise
  `to-be-solved` themes or persona needs; otherwise the union of competitor capabilities,
  clustered (say which).
- **Cells** — `has` · `partial` · `none` · `not evaluable`, each with its evidence tag.
- **Their capabilities we don't have** — extra rows, marked `not in model`.
Classify each row: **table stakes** (most direct competitors have it), **differentiator**
(few have it, or ours is distinctly better), **whitespace** (no one serves it well —
often visible in substitutes and review complaints). Small samples are said out loud:
"2 of 3 direct competitors" — not "the market".

## Stage 4 — Deep dives (live, read-only)
Run `browser-preflight` first. For each deep-dive competitor, walk **our** journeys in focus
on **their** product, public part only:
- **Journey walk** — steps, decisions forced on the user, time / steps to value, dead ends,
  where it diverges from our journey. Map each step to our journey's step where one exists.
- **UX read** — a light Nielsen pass on what was walked (not a full matrix), plus basic
  accessibility and mobile behaviour.
- **Content & terminology** — what they call things, how fees, rules, and limits are
  explained.
- **Trust & onboarding** — verification, reviews, payment safety signals, first-run.
- **Patterns worth borrowing / avoiding** — each tied to one of our journey steps and why.
Read-only, as everywhere in uxos: never sign up, log in, book, pay, submit, or accept
terms. A step behind a gate is `not evaluable — gated`, never reconstructed from memory.
App-only products: store listing, screenshots, and reviews only, unless the designer drives
a device.

## Stage 5 — Voice of the customer (public reviews)
For the deep-dive competitors (and others where cheap): app store and review-site reviews.
Group into recurring complaints and praise, each theme with a count from the reviews read,
the sample size, date range, and at most one short quote. `n` is the number of reviews
**you actually read**, and the count is how many of those mention the theme (e.g. `7 of
40`) — never the site's total review count, and never "recurring" without a number. No reviews reachable → `not
evaluable`. This is evidence about *their* users' pain — it supports our themes, it doesn't
replace our research.

## Stage 6 — Implications for the model
Each finding becomes one line linked to an artifact — proposals, not edits:
- **Supports** a `to-be-solved` item, theme, or persona need → cite it as evidence there.
- **Table-stakes gap** (we lack what most direct competitors have) → candidate for
  `to-be-solved`, labelled `[competitive]`; on brownfield optionally a problem candidate.
- **Whitespace** → opportunity candidate for `to-be-solved` or `feature-mapping`.
- **Pattern to borrow / avoid** → note for `journey-design` on the named step.
- **Terminology** → note for content and `patterns.md` §4.
**Parity is not a driver.** "A competitor has it" alone is `stakeholder-driven,
unvalidated` in `feature-mapping` and never pre-marks a `to-be-solved` candidate `yes`. It
strengthens a user need already in the model; on its own it is flagged as weak.

## Stage 7 — Present, then write
Present the whole draft — landscape, matrix, deep-dive summaries, review themes,
implications — in one block. The designer confirms or names what to redo. Then write
`uxos/competitors.md` and `uxos/competitors/<slug>.md` per deep dive. Implications are
applied to other artifacts only when the designer accepts each one (or later, when the
relevant procedure runs and reads `competitors.md`).

**Re-run = refresh.** If `competitors.md` exists, re-check each cell, show what changed
since its date (new features, price changes, competitors gone or new), and log it in its
change log — don't regenerate from scratch.
Also re-check every existing entry against the **current** evidence rules in this
procedure (tags present, review counts out of reviews actually read, no unverified cells)
and list the ones that break them — fix them, or mark them `not evaluable` with the reason.

Then run `next-steps`.
