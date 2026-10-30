---
description: Bring a repo into an existing model (first time — enriches the documents with business logic and more from the code) or sync it with what developers built since — read new commits on the main branch, propose model updates (built / changed / partial / new / removed), apply only what you accept.
argument-hint: "[repo path or git URL — only needed the first time]"
---

Sync the uxos model with the code. Argument (optional): `$ARGUMENTS` — a repo path or git
URL, used when the model has no `repo` yet.

## Steps

1. Read `uxos/product-context.md`. If it has no `repo` and no argument was given, ask for
   the repo (path or git URL) and the branch that counts as built (default `main`). Record
   both in its frontmatter.

2. If there's no `synced_commit` yet (first time the model sees this code — usually a
   brownfield project whose documents were built before code access), run the `code-sync`
   skill in **onboard** mode (Mode 3): extract from the repo, then propose enrichments and
   corrections to the existing documents. Otherwise run it in **sync** mode: collect commits since `synced_commit`, match
   them to the model, classify, and present the sync report. Nothing is written until the
   designer accepts items.

3. Apply the accepted updates, move the baseline, append to `uxos/sync-log.md`.

4. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/sync-log.md`.
