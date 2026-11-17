#!/usr/bin/env bash
# Regenerate plugin/ from method/. Run after editing anything in method/.
# skill/ (the claude.ai skill) is frozen at 0.35.0 and no longer generated — see skill/README.md.
set -euo pipefail
cd "$(dirname "$0")/.."

M=method
P=plugin

AGENT_TOOLS_context_extract='Read, Grep, Glob, Bash, WebFetch, mcp__claude-in-chrome__navigate, mcp__claude-in-chrome__read_page, mcp__claude-in-chrome__get_page_text, mcp__claude-in-chrome__computer, mcp__claude-in-chrome__find, mcp__claude-in-chrome__javascript_tool, mcp__claude-in-chrome__read_console_messages, mcp__claude-in-chrome__read_network_requests, mcp__claude-in-chrome__tabs_context_mcp, mcp__claude-in-chrome__tabs_create_mcp, mcp__claude-in-chrome__tabs_close_mcp, mcp__claude-in-chrome__resize_window, mcp__claude-in-chrome__list_connected_browsers, mcp__claude-in-chrome__select_browser, mcp__claude-in-chrome__switch_browser, mcp__Claude_Browser__navigate, mcp__Claude_Browser__read_page, mcp__Claude_Browser__get_page_text, mcp__Claude_Browser__computer, mcp__Claude_Browser__find, mcp__Claude_Browser__javascript_tool, mcp__Claude_Browser__read_console_messages, mcp__Claude_Browser__read_network_requests, mcp__Claude_Code_iOS_Simulator__control, mcp__Claude_Code_iOS_Simulator__build'
AGENT_TOOLS_ux_critique='Read, Grep, Glob'

echo "==> templates"
mkdir -p "$P/templates"
cp "$M"/templates/*.md "$P/templates/"

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

echo "==> plugin/METHOD.md  (reference copy of the meta-process)"
cp "$M/orchestration.md" "$P/METHOD.md"

echo "done."
