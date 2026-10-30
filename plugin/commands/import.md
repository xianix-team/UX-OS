---
description: Adopt documents you already have -- any format, a file, a folder, or pasted text -- instead of regenerating them. Classifies, copies legitimate ones into uxos/sources/, normalises into the uxos templates without losing or inventing anything, and shows an import report first.
argument-hint: "[file, folder, or URL -- or paste the content]"
---

Import existing documents into the `uxos/` model: `$ARGUMENTS`.

## Steps

1. Get the inputs from `$ARGUMENTS`, or ask: a file, several files, a folder (walked
   recursively), or pasted text. No format is off-limits — attempt everything, and say what
   couldn't be read. If a `uxos/` model already exists, this adds to it; it never overwrites
   an artifact without showing the change first.

2. Run the `import-artifacts` skill: survey (narrow the list with the designer if it's
   large), read each document, classify it to an artifact type with a confidence, and
   **present the mapping for correction before writing anything**.

3. For documents that are legitimate — relevant, readable, free of secrets, a sensible
   size — copy the original into `uxos/sources/` preserving its relative path, and write
   `uxos/sources/INDEX.md`. Never modify or delete an original. Mention once that
   `uxos/sources/` will be committed if `uxos/` is, and offer a `.gitignore` entry.

4. Normalise into the templates: keep the designer's content, put the overflow under
   "Additional (imported)", leave missing sections empty and listed, record
   `imported_from` and `confidence: designer-supplied`. Route a client requirements
   document to `/uxos:requirements-gap` rather than converting it.

5. Cross-check links and ids; present the **import report** (mapped · partial · unmapped ·
   unreadable · skipped as not legit · conflicts). Write only after the designer confirms.

6. Brownfield: offer a drift check against the live product or repo.

7. Run the `next-steps` skill — it should say what's still missing and that `/uxos:init`
   will now generate only that.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/`.
