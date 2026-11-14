#!/usr/bin/env bash
# Repo checks. Run locally before a pull request; CI runs the same script.
set -uo pipefail
cd "$(dirname "$0")/.."

fail=0
bad () { echo "FAIL: $*"; fail=1; }

echo "==> generated files match method/"
snapshot () { find plugin skill -type f ! -name '.DS_Store' -print0 | sort -z | xargs -0 shasum; }
before=$(snapshot)
bash scripts/build.sh >/dev/null
after=$(snapshot)
if [ "$before" != "$after" ]; then
  bad "plugin/ or skill/ was out of date with method/ — it has now been rebuilt; review and commit the result"
  diff <(echo "$before") <(echo "$after") | grep '^[<>]' | awk '{print "   " $3}' | sort -u
fi

echo "==> manifests are valid JSON"
for f in plugin/.claude-plugin/plugin.json .claude-plugin/marketplace.json plugin/hooks/hooks.json; do
  python3 -c "import json,sys; json.load(open(sys.argv[1]))" "$f" 2>/dev/null || bad "$f is not valid JSON"
done

echo "==> plugin and npm package share one version"
if [ -f mcp/package.json ]; then
  npm_version=$(python3 -c "import json; print(json.load(open('mcp/package.json'))['version'])")
  plugin_version=$(python3 -c "import json; print(json.load(open('plugin/.claude-plugin/plugin.json'))['version'])")
  [ "$npm_version" = "$plugin_version" ] || bad "mcp/package.json is $npm_version but plugin.json is $plugin_version — they release together under one version"
  if [ -f mcp/package-lock.json ]; then
    lock_version=$(python3 -c "import json; print(json.load(open('mcp/package-lock.json'))['version'])")
    [ "$lock_version" = "$npm_version" ] || bad "mcp/package-lock.json is $lock_version but mcp/package.json is $npm_version — run npm install in mcp/"
  fi
fi

echo "==> version has a changelog entry"
version=$(python3 -c "import json; print(json.load(open('plugin/.claude-plugin/plugin.json'))['version'])")
grep -q "^## \[$version\]" CHANGELOG.md || bad "CHANGELOG.md has no '## [$version]' entry for plugin.json version $version"

echo "==> skills and commands have frontmatter"
for f in plugin/skills/*/SKILL.md plugin/agents/*.md; do
  head -5 "$f" | grep -q '^name: ' || bad "$f has no name:"
  head -5 "$f" | grep -q '^description: ' || bad "$f has no description:"
done
for f in plugin/commands/*.md; do
  head -4 "$f" | grep -q '^description: ' || bad "$f has no description:"
done

echo "==> referenced templates exist"
for t in $(grep -ohE '\{\{TEMPLATES\}\}/[a-z-]+\.md' method/procedures/*.md | sed 's#.*/##' | sort -u); do
  [ -f "method/templates/$t" ] || bad "a procedure references templates/$t, which doesn't exist"
done

echo "==> referenced commands exist"
for c in $(grep -ohE '/uxos:[a-z][a-z0-9-]*' method plugin/commands plugin/hooks README.md docs/guides -r | sed 's#/uxos:##' | sort -u); do
  [ -f "plugin/commands/$c.md" ] || bad "/uxos:$c is mentioned but plugin/commands/$c.md doesn't exist"
done

echo "==> shell scripts parse"
for f in scripts/*.sh plugin/hooks/*.sh; do
  bash -n "$f" 2>/dev/null || sh -n "$f" 2>/dev/null || bad "$f has a syntax error"
done

if [ "$fail" -ne 0 ]; then echo; echo "Checks failed."; exit 1; fi
echo; echo "All checks passed."
