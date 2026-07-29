<!--
SYNC IMPACT REPORT
==================
Version change: N/A → 1.0.0

Added Principles:
- I. Clean Architecture
- II. Component Isolation
- III. Type Safety First
- IV. Simplicity (YAGNI/KISS)
- V. Test-Driven Quality

Added Sections:
- Technology Stack
- Development Workflow

Templates Status:
- .specify/templates/plan-template.md ✅ (no updates needed)
- .specify/templates/spec-template.md ✅ (no updates needed)
- .specify/templates/tasks-template.md ✅ (no updates needed)

Follow-up TODOs: None
-->

# React Web Resume Constitution

## Core Principles

### I. Clean Architecture

All application code MUST follow clean architecture principles with clear
separation of concerns:

- **Layers**: Presentation (components/pages), Domain (business logic),
  Data (API clients/repositories) MUST remain separate
- **Dependency Rule**: Inner layers MUST NOT depend on outer layers;
  dependencies point inward only
- **Framework Isolation**: Next.js-specific code MUST be confined to
  pages, layouts, and API routes; business logic MUST be framework-agnostic
- **Barrel Exports**: Each layer exposes functionality through index files;
  internal implementation details MUST NOT be imported directly

### II. Component Isolation

Every React component MUST be self-contained and independently testable:

- Components MUST receive data via props; direct global state access
  is prohibited except through designated hooks
- Side effects MUST be encapsulated in custom hooks, not scattered
  across components
- Shared components MUST reside in `src/components/shared/` with clear
  prop interfaces
- Page-specific components MUST reside alongside their page or in
  `src/components/[feature]/`

### III. Type Safety First

TypeScript strict mode is NON-NEGOTIABLE:

- `strict: true` MUST be enabled in tsconfig.json
- `any` type usage is prohibited unless explicitly justified in code review
- All function parameters, return types, and public APIs MUST be typed
- Shared types MUST be defined in `src/types/` and imported where needed
- Runtime data from external sources MUST be validated at boundaries
  using schema validation (e.g., Zod)

### IV. Simplicity (YAGNI/KISS)

Start simple; add complexity only when justified:

- Features MUST NOT be built speculatively; implement only what is
  currently required
- Abstractions MUST emerge from duplication (rule of three), not
  anticipation
- Third-party dependencies MUST be evaluated for necessity; prefer
  native solutions when adequate
- File and function length SHOULD remain under 200 lines; split when
  exceeding without sacrificing readability

### V. Test-Driven Quality

Testing discipline ensures long-term maintainability:

- Critical business logic MUST have unit tests before merging
- Components with complex interactions MUST have integration tests
- Test files MUST be co-located with source: `*.test.ts` or `*.test.tsx`
- Test names MUST describe behavior, not implementation details
- Minimum 80% code coverage for domain and data layers

## Technology Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS or CSS Modules (choose one per project)
- **State Management**: React hooks (useState, useReducer, useContext);
  external state libraries require justification
- **Data Fetching**: Next.js server components and Server Actions preferred;
  client-side fetching only when server-side is not viable
- **Validation**: Zod for runtime schema validation
- **Testing**: Vitest + React Testing Library

## Development Workflow

- **Branching**: One feature branch per spec; branch from main
- **Commits**: Conventional commits format (`feat:`, `fix:`, `docs:`, etc.)
- **Code Review**: All changes require review before merge; constitution
  compliance is a review checklist item
- **Linting**: ESLint + Prettier MUST pass before merge; no warnings allowed
- **Build**: `next build` MUST succeed with zero errors before merge

## Governance

This constitution supersedes all ad-hoc practices and MUST be consulted
before architectural decisions.

- **Amendments**: Require a documented rationale, review, and migration
  plan for existing code if principles change
- **Versioning**: Semantic versioning (MAJOR.MINOR.PATCH) applied to
  constitution changes
- **Compliance Review**: Each PR MUST be checked against constitution
  principles; violations require documented justification in the PR
- **Complexity Justification**: Any deviation from simplicity principles
  MUST include a Complexity Tracking entry in the implementation plan

**Version**: 1.0.0 | **Ratified**: 2026-07-29 | **Last Amended**: 2026-07-29
