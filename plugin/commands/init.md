---
description: Start (or resume setup of) a uxos project. Just type /uxos:init — it asks what it needs, one question at a time, in plain language — then reads what you can share, drafts the project model, and reviews it with you at gate G1.
---

Initialise a UX Designer OS project model in `uxos/` under the current working directory.

If the user typed something after the command (`$ARGUMENTS` — a name or a link), use it to
pre-fill the answers and don't ask for it again. Nothing is required up front.

## Steps

1. **Intake — a conversation, not a form.** Ask **one question at a time**, in plain
   language, and wait for the answer before the next. Where the question tool is available
   (AskUserQuestion), use it so the user can click an option; otherwise give numbered
   options. Always allow "something else" and "not sure". Skip anything already answered —
   by `$ARGUMENTS`, an earlier answer, or an existing `uxos/product-context.md` (then this
   is a resume: say what's already set up and ask only what's missing).

   **Never use uxos's own terms in a question.** Many product owners don't know
   "greenfield", "brownfield", "domain", or "platform" in this sense. Ask in everyday words
   and record the term yourself. Explain any option that needs it in a few words.

   Ask in this order:
   1. **"What's the project called?"** → the project name (make the slug yourself).
   2. **"Is this a new product you're starting from scratch, or a product that already
      exists?"** — options: *Starting from scratch* · *It already exists — we want to
      improve it, redesign it, or add to it* → record `greenfield` / `brownfield`. It
      changes everything that follows.
   3. **"Where do people use it?"** (or "will they use it", for a new product) — options:
      *a website or web app* · *an iPhone/iPad app* · *an Android app* · *a desktop app* ·
      *more than one* → `platform`.
   4. **Existing product — "What can you share so I can learn how it works?"** Any
      combination; say the first one helps most:
      - *the code* — a folder on this computer, or a GitHub/GitLab link (cloned into a
        disposable `uxos-repo-cache/`) — "shows how it really works, on any platform"
      - *a link to the live site or app*
      - *a version I can run* (iOS → simulator; Android → emulator)
      - *screenshots or a screen recording*
      - *a Figma file · documents or specs · an app store listing*

      **Always ask about the code**, even when a link was given — a link is the live site,
      not the code. Skip only if code was already shared or the user says there's none.
      If parts sit behind a login: "Can you sign in for me when we get there, or share a
      test account?" (the user does any signing in; uxos stays read-only).
   5. **New product — "Do you have anything written down already?"** Any combination, none
      needed: *a requirements or product document* · *brand guidelines* · *products you
      admire or compete with* · *a company design system to match*.
   6. **"Have you already got any of this?"** — research about the industry, descriptions
      of your users or personas, a map of features, user journeys, a UX review, a list of
      what to fix or build. Any format, any folder. If yes, run the `import-artifacts`
      skill (`/uxos:import`) *before* drafting anything — adopt what exists, generate only
      the gaps.
   7. **"Where would you like screens designed?"** — recommend *Claude Design, with a
      working prototype in code* ("no Figma licence, one design system") · *Figma* ·
      *design prompts for another tool, such as Stitch* · *not sure yet — decide later* →
      `design_tools`; set `design_master`: `code` for an existing product with code,
      `claude-design` for a new one.
   8. **"How well do you know this industry?"** — *new to it* · *somewhat* · *very well* →
      domain familiarity; *very well* skips the industry research. On a new product, lean
      toward doing it anyway — it's the main evidence when there's no product to look at.

   Don't ask where to keep the model: use `./uxos` and say so once ("I'll keep everything
   in a `uxos/` folder here — tell me if you want it somewhere else").

   Then recap the answers in a few lines, plain words, and ask "Shall I start?" before
   reading or crawling anything.

2. **Preflight, then extract.** If any input is a live URL (or competitor URLs on
   greenfield), run the `browser-preflight` skill **first** — confirm a real browser tool
   exists in this session. If not, stop and walk the designer through their options (set up
   Claude in Chrome with their consent, proceed in clearly-labelled reduced mode, or switch
   to a repo/screenshots input) before extracting anything. Then launch the
   `context-extractor` agent with the inputs — product crawl (brownfield) or
   reference-material read + domain web research (greenfield). Wait for its source-tagged
   report.

3. **Draft the model — only what's missing.** Skip any artifact that was imported and
   confirmed (its `confidence: designer-supplied`); use it as an input to what follows
   instead (e.g. imported user groups feed `capture-users`' persona step, an imported
   feature map stands in for `build-blueprint`). Follow these skills for the rest, writing
   files under the model dir:
   - `analyse-domain` → `domain.md` (skip only if familiarity = `very`)
   - **Brownfield:** `study-product` → `product-context.md` + a named journey list, then
     `capture-users` → `user-groups.md` + `personas/*.md` (with the candidate-selection
     gate), then `build-blueprint` (create, brownfield) → `blueprint.md`.
   - **Greenfield:** `capture-users` → `user-groups.md` + `personas/*.md` (with the
     candidate-selection gate) only. `product-context.md` describes the intended product
     from the designer's own description, not an extraction. No blueprint yet — that's
     built later, once `to-be-solved` has approved scope to build it from.
   Seed `open-questions.md` with every "needs verification" item.
   If a repo was an input, record the sync baseline in `product-context.md`: `repo`,
   `repo_branch` (ask if it isn't `main`), and `synced_commit` / `synced_at` from the
   extractor's report — so `code-sync` can tell later what developers built since.
   Also write `uxos/README.md` — an index of the artifacts written and the steps still to do.

4. **Gate G1 — context review.** Present a single review block:
   - `CONFLICTS` — where sources disagree or a node was guessed.
   - `UNKNOWNS` — now in `open-questions.md`.
   - `LOW-CONFIDENCE GUESSES` — inferred items that will drive later analysis.
   Tell the user: edit the files directly or state fixes; nothing proceeds until they say
   `continue` (or `continue anyway`). Apply their fixes.

5. **Next steps.** Run the `next-steps` skill and present its ranked, non-binding block —
   brownfield points at `/uxos:journeys`; greenfield points at `/uxos:to-be-solved` (which
   runs `problem-validation` internally) since there's no existing product to map journeys
   from yet.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/`. Schema: `${CLAUDE_PLUGIN_ROOT}/templates/SCHEMA.md`.
