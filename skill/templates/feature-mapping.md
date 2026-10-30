---
artifact: new-feature-mapping
project: <slug>
feature: <feature name>
status: draft
driver: <user-pain | business-requirement | compliance | stakeholder-unvalidated>
source_problem: <PRB-id or "stakeholder request">
response_type: new-feature
---

# New Feature Mapping — <feature name>

## 1. Why — driver
- **Type:** <driver type>
- **Evidence:** <PRB ref + severity, or "stakeholder request, no validated problem">
- **User groups / personas:** <primary + secondary>
- <note any sub-driver, e.g. compliance, and where it was discovered>

## 2. What — capability sketch
<2-3 sentences: what the feature lets a user do.>

## 3. Where — placement

### Blueprint home
<new capability under an existing area / new area under a surface / new surface>

### Journey touchpoints
| Touchpoint | Type | Journey · step | Interaction |
|---|---|---|---|
| <name> | create / consume / manage | J<n> · <step> | <how it appears> |

<note which is the primary create point and where consumption happens.>

## 4. Conflict / consideration check
| # | Check | Finding |
|---|---|---|
| C-1 | Existing pattern to reuse | <...> |
| C-2 | PII / compliance | <...> |
| C-3 | Status-model / entitlement clash | <...> |
| C-4 | Hard constraints (limits, cut-offs) | <...> |

## 5. Downstream
- **Blueprint:** <node to add>
- **Journeys → `proposed`:** <ids + new journeys>
- **Open-questions:** <ids>
- **Playbook:** add-feature → proposed journeys → solve loop
