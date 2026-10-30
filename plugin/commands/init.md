---
description: Start (or resume setup of) a uxos project -- brownfield (existing product) or greenfield (starting from scratch) -- crawl available inputs, draft the project model, review at gate G1.
argument-hint: "[product name or URL]"
---

Initialise a UX Designer OS project model in `uxos/` under the current working directory.

Argument (optional): `$ARGUMENTS` — a product name or URL to pre-fill the intake.

## Steps

1. **Intake.** Ask the user (skip anything already given via the argument or an existing
   `uxos/product-context.md`):
   - **Does this product already exist (brownfield), or is this starting from scratch
     (greenfield)?** — asked first; it changes what else gets asked.
   - Project name (slug).
   - Model location — default `./uxos`; accept an alternative path.
   - **Platform:** `web` / `iOS` / `Android` / `desktop` / `other`.
   - **Brownfield — inputs available**, any combination — and note which the extractor will
     lean on:
     - code repo — a local path, **or a git URL** (cloned into a disposable
       `uxos-repo-cache/` alongside the model) *(best structural signal on any platform)*
     - live URL *(web)*
     - runnable build or project to launch *(iOS → simulator; Android → emulator if available)*
     - screenshots / screen-recording folder *(fallback when no repo/build)*
     - Figma link · docs/PRD paths · App Store / Play Store URL

     **Always ask about code repo access**, even when a URL was given in the argument or
     brief — a URL answers "live URL", not "inputs available". Skip the question only if a
     repo path or git URL was already supplied, or the designer has said there is none.
   - **Greenfield — reference material available**, any combination (none of this is
     required): a PRD/BRD or requirements doc, brand guidelines, named competitor products
     for inspiration, an existing company design system to align with.
   - **Do you already have any of what this produces?** — a domain write-up, user groups,
     personas, a feature map, journeys, an audit, a to-be-solved list, brand guidelines, in
     any format and any folder. If yes, run the `import-artifacts` skill (`/uxos:import`)
     *before* drafting anything: adopt what exists, and generate only the gaps. Don't
     recreate what the designer already has.
   - **Design tools:** where will screens be designed and prototyped? Recommend **Claude
     Design + a functional prototype in code** (no Figma licence; one design system,
     defined in code once there is code). Alternatives: Figma, design prompts for Stitch.
     Record `design_tools` and `design_master` in `product-context.md` — `code` on
     brownfield with a codebase, `claude-design` on greenfield.
   - Domain familiarity: `not very` / `somewhat` / `very`. `very` → skip domain analysis.
     On greenfield, lean toward *not* skipping it — domain research is the primary evidence
     source when there's no product to observe instead.
   - Brownfield only, if flows are behind auth/login: "Do you have test credentials for a
     deeper walk?" (the user drives any sign-in; the extractor stays read-only).

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
