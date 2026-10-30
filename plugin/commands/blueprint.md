---
description: Create the feature map from scratch, or update it with an approved feature-mapping or to-be-solved item. Interactive on update — presents the diff before writing.
argument-hint: "[feature-mapping slug or to-be-solved item — omit to build fresh]"
---

Create or update `uxos/blueprint.md`.

## Steps

0. Run the `code-sync` skill in **check** mode — silent unless the repo has new commits
   since the last sync; then it offers to sync first.

1. If `uxos/blueprint.md` doesn't exist: this is **create** mode. Run the `context-extractor`
   agent if not already done this session, then the `build-blueprint` skill's create method.

2. If `uxos/blueprint.md` exists: this is **update** mode. Read `$ARGUMENTS` if given
   (a `uxos/feature-mapping/<slug>.md` file or a `uxos/to-be-solved.md` row); if not given,
   ask which source is driving the change.

3. Run the `build-blueprint` skill's update method: work out exactly which node(s) change,
   present the diff (marked `(proposed)`) for confirmation, apply only on confirmation, add
   a Change log row.

4. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/blueprint.md`.
