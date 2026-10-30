---
artifact: product-context
project: <slug>
project_type: <brownfield | greenfield>
status: draft
confidence: mixed
platform: <web | iOS | Android | desktop | other>
repo: <local path or git URL — omit if no code access>
repo_branch: <branch that counts as built, usually main>
synced_commit: <full SHA the model last matched — set by init / code-sync>
synced_at: <YYYY-MM-DD>
design_tools: <claude-design + code (recommended) | figma | prompt — what this project designs in>
design_master: <claude-design | code — where the design system's truth lives; see design-mirror>
design_master_since: <YYYY-MM-DD>
source: <url / repo path / simulator walk / screenshots / figma / docs / reference material / designer's own description — list what backed this>
---

# Product Context — <product name>

## What it is
<brownfield: 2-4 sentences on what this specific product is, who operates it, delivery
channel — from the extraction. Greenfield: 2-4 sentences on what the product is **intended**
to be — from the designer's own description, a PRD, or stakeholder brief, not an extraction.>

## Scope (this product)
**In scope:** <the surfaces / capabilities this product actually covers, or is intended to>
**Out of scope (separate systems / channels):**
- <thing> -> <where it lives instead>

## Booking / core object types
<if the product has parallel modes or object variants, table them: type | basis | semantics>

## Key constraints
<top-level only: platform, compliance obligations, mandated integrations, budget/timeline
(greenfield, as stated by the client). Product rules — limits, validation, cut-offs,
refund slabs, status transitions, permissions — live in `business-rules.md` as `BR-<n>`
entries; link to it rather than listing them here.>

## Observed structural facts
<brownfield only — framework, form structure, list sizes, anything the crawl established.
Omit on greenfield; nothing exists to observe yet.>

## Open flags
See [open-questions.md](open-questions.md).
