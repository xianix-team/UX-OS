# UX Designer OS — Initial Product Intent

## Intent Statement

Create a brownfield-first operating system for professional UX and product designers that understands an existing product with minimal setup and helps the designer continue working without repeatedly reconstructing context.

The system should preserve product knowledge, UX reasoning, existing behaviour, design decisions, and work history while allowing designers to work in the flexible and non-linear way they already do.

---

## Primary User Intent

> I want to add the product I am already working on, give the system whatever project material I already have, and then continue my normal UX work without rebuilding everything from scratch.

---

## Primary Product Promise

> Bring your existing product. Keep working. The OS builds and maintains the context around you.

---

## Core Job To Be Done

When I need to change an existing digital product,

I want the system to already understand enough of the product, users, workflows, design patterns, constraints, and previous decisions,

so that I can start useful work immediately without repeatedly explaining the product or recreating documentation.

---

## Primary Brownfield Work Types

The initial product must support:

### 1. Add a New Feature

Example:

> We need to add bulk approval.

The system should help the designer understand:

- where the feature belongs
- who it affects
- what existing workflows it touches
- which product patterns already exist
- what constraints are known
- what UX work is actually needed

---

### 2. Improve an Existing Experience

Example:

> The claims dashboard is confusing. I need to improve it.

The system should help identify:

- current behaviour
- affected users
- known issues
- existing constraints
- existing interaction patterns
- likely impact of proposed changes

---

### 3. Fix a UX Problem

Example:

> Users are failing to complete this form.

The system should help:

- investigate the problem
- separate evidence from assumptions
- identify possible causes
- define the affected experience
- record findings
- support proposed solutions

---

### 4. Revamp an Existing Area

Example:

> We need to modernize the admin module.

The system should help preserve:

- business logic
- user goals
- existing functionality
- technical constraints
- useful interaction patterns

while supporting a broader redesign.

---

### 5. Review Existing UX

Example:

> Review this workflow and tell me what is wrong.

The system should evaluate:

- usability
- consistency
- workflow friction
- interaction patterns
- accessibility where relevant
- evidence quality
- severity
- confidence

without confusing preference with genuine UX issues.

---

### 6. Continue Existing Work

Example:

> Continue with the payment feature.

The system should already know:

- which project
- which Work Package
- current decisions
- relevant artifacts
- unresolved questions
- latest project state

The designer should not need to restate context.

---

## Initial Entry Experience

The first project experience should be optimized for minimum effort.

### User action

Create Project.

### User provides any available combination of:

- project name
- brief description
- screenshots
- Figma
- documents
- product URL
- requirements
- research
- backlog
- code repository
- design system

### System action

Build an initial project understanding.

### User action

Review or correct only the important parts.

### Result

The user can immediately begin real project work.

---

## Progressive Project Understanding

The product must not require complete onboarding.

If the system only understands 30% of the product, the designer should still be able to work.

The system should improve its understanding through:

- imported material
- designer corrections
- completed Work Packages
- newly created artifacts
- explicit decisions
- ongoing project conversations

Project knowledge should grow as a side effect of real work.

---

## Primary Interaction Model

The product should not primarily ask:

> Which UX stage do you want to perform?

It should ask:

> What are you working on?

Example requests:

- Add a payment feature
- Improve this table
- Review this screen
- Create a journey for device readiness
- Update the feature map
- Generate a Stitch prompt
- Add this idea to the backlog
- Compare the current and proposed workflow
- What will be affected if we remove this status?

The OS determines which internal capability is relevant.

---

## Primary Structural Model

Project
→ Product Knowledge
→ Existing Experience
→ Users
→ Features
→ Journeys
→ Design System
→ Decisions
→ Work Packages

Work Packages are the main containers for active change.

---

## Work Package Intent

A Work Package should represent a single meaningful piece of product change or investigation.

Examples:

- Add recurring payments
- Improve claims dashboard
- Simplify checkout
- Fix navigation issue
- Review onboarding
- Add reporting filter

Each Work Package should retain:

- why the work exists
- what product area it affects
- who it affects
- what evidence exists
- what assumptions exist
- relevant existing behaviour
- proposed changes
- decisions
- artifacts
- current state

---

## Non-Blocking Principle

UX Designer OS may recommend missing work but should avoid process blockers.

Example:

> No validated user problem is currently linked to this feature.

Available responses:

- Continue anyway
- Add a problem
- Link an existing problem
- Mark as stakeholder-driven
- Add to backlog

The designer stays in control.

---

## AI Behaviour Intent

AI inside UX Designer OS should:

- use project context automatically
- avoid inventing unsupported facts
- clearly identify assumptions
- preserve existing product patterns when appropriate
- challenge weak reasoning
- surface missing information
- support the designer's chosen task
- update project knowledge when new decisions are made
- understand relationships between artifacts

AI should not:

- force a fixed UX process
- fabricate research evidence
- automatically treat generated content as validated
- redesign an entire product when only a small change is requested
- introduce new product patterns without justification
- block useful work simply because earlier UX artifacts do not exist

---

## MVP Intent

The MVP should prove one central idea:

> A designer can add an existing product with minimal effort and then use the OS as persistent context for future UX changes.

The MVP does not need to solve every UX activity.

Initial success should be measured by whether a designer can:

1. add an existing product
2. establish usable product context quickly
3. create a Work Package
4. add or improve a feature
5. produce context-aware UX artifacts
6. return later and continue without re-explaining the project
7. maintain clearer reasoning than they would using disconnected AI chats and files

---

## Out of Scope for Initial Version

The first version should not attempt to become:

- a replacement for Figma
- a full project-management platform
- a complete research repository
- a Jira replacement
- a coding IDE
- a generic AI chatbot
- an academy or UX learning platform
- a rigid UX-process management tool

The product should remain focused on helping professional designers understand and change existing products.
