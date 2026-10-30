#!/usr/bin/env bash
# Regenerate plugin/ and skill/ from method/. Run after editing anything in method/.
set -euo pipefail
cd "$(dirname "$0")/.."

M=method
P=plugin
S=skill

AGENT_TOOLS_context_extract='Read, Grep, Glob, Bash, WebFetch, mcp__claude-in-chrome__navigate, mcp__claude-in-chrome__read_page, mcp__claude-in-chrome__get_page_text, mcp__claude-in-chrome__computer, mcp__claude-in-chrome__find, mcp__claude-in-chrome__javascript_tool, mcp__claude-in-chrome__read_console_messages, mcp__claude-in-chrome__read_network_requests, mcp__claude-in-chrome__tabs_context_mcp, mcp__claude-in-chrome__tabs_create_mcp, mcp__claude-in-chrome__tabs_close_mcp, mcp__claude-in-chrome__resize_window, mcp__claude-in-chrome__list_connected_browsers, mcp__claude-in-chrome__select_browser, mcp__claude-in-chrome__switch_browser, mcp__Claude_Browser__navigate, mcp__Claude_Browser__read_page, mcp__Claude_Browser__get_page_text, mcp__Claude_Browser__computer, mcp__Claude_Browser__find, mcp__Claude_Browser__javascript_tool, mcp__Claude_Browser__read_console_messages, mcp__Claude_Browser__read_network_requests, mcp__Claude_Code_iOS_Simulator__control, mcp__Claude_Code_iOS_Simulator__build'
AGENT_TOOLS_ux_critique='Read, Grep, Glob'

echo "==> templates"
mkdir -p "$P/templates" "$S/templates"
cp "$M"/templates/*.md "$P/templates/"
cp "$M"/templates/*.md "$S/templates/"

echo "==> plugin/skills  (from method/procedures, {{TEMPLATES}} -> \${CLAUDE_PLUGIN_ROOT}/templates)"
for f in "$M"/procedures/*.md; do
  n=$(basename "$f" .md)
  case "$n" in context-extract|ux-critique) continue ;; esac
  mkdir -p "$P/skills/$n"
  sed 's#{{TEMPLATES}}#${CLAUDE_PLUGIN_ROOT}/templates#g' "$f" > "$P/skills/$n/SKILL.md"
done

echo "==> plugin/agents  (procedure body + tools frontmatter)"
mkdir -p "$P/agents"
gen_agent () { # <procedure-name> <out-name> <tools>
  local src="$M/procedures/$1.md" out="$P/agents/$2.md" tools="$3"
  # split frontmatter (name/description) and body, re-emit with tools added
  awk -v tools="$tools" '
    NR==1 && $0=="---" {print; infm=1; next}
    infm && $0=="---" {print "tools: " tools; print; infm=0; next}
    {print}
  ' "$src" | sed 's#{{TEMPLATES}}#${CLAUDE_PLUGIN_ROOT}/templates#g' > "$out"
}
gen_agent context-extract context-extractor "$AGENT_TOOLS_context_extract"
gen_agent ux-critique      ux-critic         "$AGENT_TOOLS_ux_critique"

echo "==> skill/phases  (from method/procedures, {{TEMPLATES}} -> templates)"
rm -rf "$S/phases"; mkdir -p "$S/phases"
for f in "$M"/procedures/*.md; do
  n=$(basename "$f")
  sed 's#{{TEMPLATES}}#templates#g' "$f" > "$S/phases/$n"
done

echo "==> skill/SKILL.md  (frontmatter + method/orchestration.md)"
{
  printf -- '---\n'
  printf 'name: uxos\n'
  printf 'description: %s\n' "UX Designer OS — a brownfield co-pilot. Given an existing product (web, iOS, Android, or desktop) and whatever material the designer has, it builds a persistent project model, runs UX analysis, and produces a prioritised, traceable problems register and to-be-solved list. Trigger when the user wants to understand, audit, or plan changes to an existing product: 'analyse this product', 'UX audit', 'build a feature map', 'find the UX problems in X', 'improve this flow'."
  printf -- '---\n\n'
  cat "$M/orchestration.md"
  printf '\n\n---\n\n## Running this as a skill\n\n'
  printf 'Procedures are in `phases/` (named by procedure, e.g. `phases/ux-matrix.md`). Read the\n'
  printf 'one for the current phase when you reach it. Templates are in `templates/`.\n\n'
  printf 'There is no filesystem: produce **one artifact per phase** instead of writing a file,\n'
  printf 'and keep an `open-questions` artifact updated throughout. `context-extract.md` and\n'
  printf '`ux-critique.md` are inline routines here, not separate agents.\n'
} > "$S/SKILL.md"

echo "==> plugin/METHOD.md  (reference copy of the meta-process)"
cp "$M/orchestration.md" "$P/METHOD.md"

echo "done."
