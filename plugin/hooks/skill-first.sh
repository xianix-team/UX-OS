#!/bin/sh
# UserPromptSubmit hook. Only speaks inside a uxos project (a uxos/ folder in the
# project dir); everywhere else it stays silent so it costs nothing.
# Whatever this prints is added to Claude's context for the prompt.

dir="${CLAUDE_PROJECT_DIR:-$PWD}"
[ -d "$dir/uxos" ] || exit 0

cat <<EOF
[uxos skill-first rule] This is a uxos project. For any task that produces work for this product (UX or not), first check the routing table in ${CLAUDE_PLUGIN_ROOT}/METHOD.md ("Skill-first rule"). If a uxos skill covers it, load and follow that skill and name it in one line. Do not substitute general knowledge or another plugin's/global skill for a job a uxos skill covers. If no uxos skill fits, say "uxos has no procedure for <task>; I'll use general capabilities for this", label the output [outside uxos], and don't write it into a model artifact unless the designer asks.
[uxos show-before-saving] Never write or change a file under uxos/ until the designer has seen the draft (or the change) and said yes to saving it. Answering a question is not approval. Mark inferred lines "Inferred —" so they aren't mistaken for the designer's own words.
EOF

ctx="$dir/uxos/product-context.md"

# Older layout: design records used to live in uxos/handoff/.
if [ -d "$dir/uxos/handoff" ] && [ ! -d "$dir/uxos/design-records" ]; then
  echo "[uxos design records] This project keeps its design records in uxos/handoff/. Wherever a uxos procedure says uxos/design-records/, read and write uxos/handoff/ instead."
  if ! grep -q '^design_records_path:' "$ctx" 2>/dev/null; then
    echo "Before running a uxos command, ask once: \"uxos now calls this folder design-records, so developers don't take it for their handoff (that's requirements/). Rename uxos/handoff to uxos/design-records? (yes / keep it)\". On yes, run git mv uxos/handoff uxos/design-records (plain mv if it isn't tracked) and tell the designer to commit it. On keep it, add design_records_path: uxos/handoff to the frontmatter of uxos/product-context.md so this isn't asked again. Never rename without a yes."
  fi
fi

# Code-sync check: if the model has a repo baseline, count commits since it (read-only).
[ -f "$ctx" ] || exit 0
field() { sed -n "s/^$1:[[:space:]]*//p" "$ctx" | head -1 | tr -d '"'"'"; }
repo=$(field repo); sha=$(field synced_commit); branch=$(field repo_branch)
[ -n "$repo" ] && [ -n "$sha" ] || exit 0
branch=${branch:-main}
case "$repo" in
  *://*|git@*) repo="$dir/uxos-repo-cache/$(basename "$repo" .git)"; ref="origin/$branch" ;;
  *) case "$repo" in /*) ;; *) repo="$dir/$repo" ;; esac; ref="$branch" ;;
esac
n=$(git -C "$repo" rev-list --count "$sha..$ref" 2>/dev/null) || exit 0
[ "${n:-0}" -gt 0 ] || exit 0
cat <<EOF
[uxos code-sync] $n new commit(s) on $branch since the last sync (synced_commit ${sha%"${sha#???????}"}). Before running a uxos command that reads the model to produce new work (ideating, journeys, blueprint, to-be-solved, requirements, screen specs, design), STOP FIRST: do not read files or start the command in this turn. Your whole reply is this question: "$n new commits on $branch since the last sync. Sync the model before <command>? (yes / skip this time)", then end your turn. On yes, run the code-sync skill in sync mode, then the original command. On skip, run the command and say once that the model may be behind the code. For /uxos:status just report the count. Don't ask again if the designer already skipped in this conversation.
EOF
