# UX Designer OS — Context

## Product Overview

UX Designer OS is a working environment for professional UX and product designers who spend most of their time improving, extending, and maintaining existing digital products.

The product is built around a simple reality:

> Most professional UX work is brownfield work.

Designers are usually not starting from a blank canvas. They inherit existing products, existing users, legacy workflows, design systems, technical constraints, partially documented decisions, stakeholder requests, and years of accumulated complexity.

UX Designer OS helps a designer add an existing project with minimal effort, build enough understanding of that product to begin useful work, and then continuously improve its project knowledge as work progresses.

The system should not force users through a fixed UX process. It should support real professional working behaviour, where designers may jump directly into a feature, screen, usability issue, journey, requirement, or design task depending on the situation.

---

## Core Product Idea

UX Designer OS acts as the persistent UX and product-thinking layer around an existing digital product.

It should understand:

- what the product is
- who uses it
- how it is structured
- what features already exist
- how key workflows currently behave
- what design patterns are already used
- what constraints are known
- what decisions have already been made
- what is currently being changed
- why those changes are being made

The designer should be able to continue working without repeatedly rebuilding project context.

---

## Primary Problem

AI tools are increasingly capable of generating UX artifacts, interfaces, requirements, journeys, and code.

However, the designer still has to repeatedly provide context and manually preserve continuity between:

- business requirements
- user problems
- research evidence
- existing product behaviour
- features
- user journeys
- design decisions
- UI changes
- implementation handoff

This creates fragmentation.

A designer may have:

- Figma in one place
- requirements in another
- Jira tickets elsewhere
- research notes in documents
- product knowledge in people's heads
- AI conversations scattered across tools
- implementation constraints in a codebase
- decisions that are never properly recorded

UX Designer OS should create continuity across this fragmented working environment.

---

## Brownfield-First Principle

The product should assume the user is working on an existing product unless explicitly told otherwise.

Typical brownfield work includes:

1. Adding a new feature
2. Improving an existing feature
3. Revamping an existing experience
4. Fixing a usability problem
5. Responding to a stakeholder request
6. Reviewing an existing interface
7. Updating a workflow
8. Extending an existing design system
9. Reworking a specific screen
10. Investigating an issue before deciding what to change

The system must support all of these without requiring a full UX process to be completed first.

---

## Project Entry Principle

Adding an existing project should require as little setup as possible.

A user may begin with any combination of:

- a short product description
- screenshots
- Figma files
- project documentation
- a PRD
- research documents
- a backlog
- Jira or Linear exports
- an existing website or application
- a design system
- code repository
- API documentation
- user-provided notes

No single input should be mandatory beyond enough information to create the project.

The system should construct an initial understanding and allow the designer to correct it rather than forcing the designer to manually document everything.

---

## Progressive Understanding

Project setup is not a one-time onboarding activity.

UX Designer OS should learn the project continuously.

The user should be able to start working with incomplete information.

When relevant information is missing, the system may:

- ask for clarification
- mark something as unknown
- identify an assumption
- suggest a likely interpretation
- allow the user to continue anyway

New knowledge gathered while completing work should automatically enrich the project model.

---

## Core Project Model

Each project may contain:

- Project Context
- Product Structure
- User Groups
- Personas
- Evidence
- Assumptions
- Business Goals
- To-Be-Solved Items
- Features
- Existing Journeys
- Proposed Journeys
- Design System
- Interaction Patterns
- Screens
- Constraints
- Decisions
- Backlog
- Work Packages

Not every project needs every artifact.

Artifacts should exist only when they are useful.

---

## Work Package Model

The primary unit of active work is the Work Package.

A Work Package represents a meaningful piece of UX/product work within an existing project.

Examples:

- Add bulk approval
- Improve onboarding
- Redesign search filters
- Review checkout usability
- Add average cost KPI
- Simplify admin permissions
- Fix confusing payment status behaviour

A Work Package should contain only the context relevant to that piece of work.

Typical Work Package data:

- title
- intent
- affected product area
- problem or trigger
- affected users
- related features
- related journeys
- requirements
- known constraints
- evidence
- assumptions
- decisions
- designs
- review findings
- implementation notes
- status

---

## Non-Linear Working Principle

UX Designer OS must not enforce a mandatory sequence such as:

Research → Personas → Problems → Features → Journeys → UI

Professional designers often work differently.

A user should be able to say:

- Create the journey
- Review this screen
- Add this feature
- Update the feature map
- Generate a Stitch prompt
- Rework this interaction
- Add this to the backlog
- Compare existing and proposed flows

The system can warn when important context is missing, but it should not unnecessarily block progress.

---

## Existing vs Proposed

Brownfield projects require a clear distinction between what exists today and what is being proposed.

Where relevant, UX Designer OS should maintain:

- existing feature vs proposed feature
- existing journey vs proposed journey
- existing screen vs proposed screen
- existing information architecture vs proposed information architecture
- existing interaction pattern vs proposed interaction pattern

This helps designers understand the actual scope of change.

---

## Traceability

Where possible, the system should maintain relationships between:

User Need / Business Goal
→ Problem
→ Requirement
→ Feature
→ Journey
→ Interaction
→ Screen
→ Design Decision
→ Implementation

Not all work must have perfect traceability.

The system should identify gaps without inventing evidence.

---

## Evidence and Confidence

UX Designer OS must distinguish between:

- Evidence-backed
- Reasonable inference
- Assumption
- Unknown
- Needs validation

AI-generated statements must not automatically be treated as validated UX knowledge.

The system should prefer uncertainty over fabricated certainty.

---

## Design Continuity

When working on an existing product, new designs should respect established product behaviour unless the designer intentionally changes it.

The system should learn and reuse:

- navigation patterns
- table behaviour
- forms
- modals
- side panels
- filters
- notifications
- confirmation patterns
- terminology
- status models
- button hierarchy
- spacing conventions
- design tokens
- accessibility rules
- responsive behaviour

The goal is not to generate visually novel screens.

The goal is to help designers make coherent changes to an existing product.

---

## Change Impact

When an existing feature, rule, journey, component, or requirement changes, UX Designer OS should identify potentially affected artifacts.

Example:

A status model changes from seven statuses to four.

Potentially affected:

- screens
- filters
- dashboards
- journeys
- notifications
- permissions
- analytics
- work packages
- components

The system should help the designer understand downstream impact.

---

## Role of AI

AI is a production and reasoning assistant inside the system.

It should help:

- interpret project inputs
- build initial project understanding
- identify missing context
- generate structured UX artifacts
- detect inconsistencies
- identify affected areas
- preserve traceability
- prepare prompts and handoff material
- critique proposed changes
- surface assumptions

AI should not replace the designer's judgment.

The system should support professional decision-making rather than automatically presenting every generated output as correct.

---

## External Tool Principle

UX Designer OS should not attempt to replace specialist tools.

It should sit above and around tools such as:

- Figma
- Stitch
- Claude Code
- Cursor
- IDEs
- Jira
- Linear
- documentation platforms

UX Designer OS is the product-thinking and continuity layer.

---

## Initial Product Positioning

> A workspace that understands your existing product and helps you change it without losing the thinking behind it.

Alternative working proposition:

> Bring your existing product. Keep working. UX Designer OS builds the context around you.

---

## Initial MVP Direction

The first version should focus on:

1. Add an existing product with minimal effort
2. Build an initial project understanding
3. Maintain persistent project context
4. Create and manage Work Packages
5. Support adding new features
6. Support improving existing experiences
7. Support UX review / issue investigation
8. Maintain relevant project artifacts
9. Allow non-linear work
10. Export useful design and implementation context

The MVP should not attempt to become a complete project-management, design, research, or coding platform.
