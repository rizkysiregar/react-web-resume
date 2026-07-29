# Tasks: Portfolio Landing Page

**Input**: Design documents from `/specs/001-portfolio-landing-page/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Included per constitution requirement (Principle V: Test-Driven Quality). Vitest + React Testing Library.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Single Next.js project with App Router at repository root
- Source: `src/` (app, components, domain, data, types, lib)
- Tests: Co-located with source (`*.test.ts`, `*.test.tsx`) and `tests/integration/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, tooling, and basic structure

- [x] T001 Initialize Next.js 14+ project with App Router and TypeScript strict mode in `package.json`, `tsconfig.json`, `next.config.js`
- [x] T002 [P] Configure Tailwind CSS with dark mode as default in `tailwind.config.ts`, `src/app/globals.css`
- [x] T003 [P] Configure ESLint and Prettier in `.eslintrc.json`, `.prettierrc`
- [x] T004 [P] Create environment configuration with `.env.example`
- [x] T005 Create Prisma schema with Profile and Project models in `src/data/prisma/schema.prisma`
- [x] T006 Create Docker Compose configuration with PostgreSQL and app services in `docker-compose.yml`, `Dockerfile`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core domain layer, data access abstractions, and page shell that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 [P] Create domain entities for Profile and Project in `src/domain/entities/Profile.ts`, `src/domain/entities/Project.ts`, `src/domain/entities/index.ts`
- [x] T008 [P] Create Zod validation schemas for Profile and Project in `src/types/schemas.ts`
- [x] T009 [P] Create shared TypeScript types and barrel exports in `src/types/index.ts`
- [x] T010 [P] Create repository interfaces in `src/domain/repositories/ProfileRepository.ts`, `src/domain/repositories/ProjectRepository.ts`, `src/domain/repositories/index.ts`
- [x] T011 Create Prisma client singleton in `src/lib/prisma.ts`
- [x] T012 Create root layout with dark mode theme and base HTML structure in `src/app/layout.tsx`
- [x] T013 Create minimal landing page shell (empty sections placeholder) in `src/app/page.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - View Personal Profile (Priority: P1) MVP

**Goal**: Display the portfolio owner's personal information (name, photo, motto, description) on the landing page

**Independent Test**: Navigate to the landing page and verify that the hero/profile section displays the owner's name, photo, motto, and description correctly on all device sizes.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T014 [P] [US1] Create HeroSection component tests in `src/components/sections/HeroSection.test.tsx`

### Implementation for User Story 1

- [x] T015 [US1] Implement PrismaProfileRepository in `src/data/repositories/PrismaProfileRepository.ts`
- [x] T016 [P] [US1] Create profile seed data file in `src/data/seed-data/profile.json`
- [x] T017 [US1] Implement HeroSection component with Next.js Image in `src/components/sections/HeroSection.tsx`
- [x] T018 [US1] Create sections barrel export in `src/components/sections/index.ts`
- [x] T019 [US1] Integrate HeroSection with landing page data fetching in `src/app/page.tsx`
- [x] T020 [US1] Add SEO meta tags and Open Graph data for profile in `src/app/layout.tsx`, `src/app/page.tsx`

**Checkpoint**: Profile section displays with real database data, responsive, dark mode styled

---

## Phase 4: User Story 2 - Browse Showcase Projects (Priority: P1)

**Goal**: Display a list of projects with title, description, thumbnail, tech stack, and external links

**Independent Test**: Navigate to the projects section and verify that project cards display with title, description, tech stack, and relevant links (demo/repository).

### Tests for User Story 2

- [x] T021 [P] [US2] Create ProjectCard component tests in `src/components/shared/ProjectCard.test.tsx`
- [x] T022 [P] [US2] Create ProjectsSection component tests in `src/components/sections/ProjectsSection.test.tsx`

### Implementation for User Story 2

- [x] T023 [US2] Implement PrismaProjectRepository in `src/data/repositories/PrismaProjectRepository.ts`
- [x] T024 [P] [US2] Create projects seed data file in `src/data/seed-data/projects.json`
- [x] T025 [US2] Create data layer barrel export in `src/data/repositories/index.ts`
- [x] T026 [US2] Implement ProjectCard component with Next.js Image in `src/components/shared/ProjectCard.tsx`
- [x] T027 [US2] Create shared components barrel export in `src/components/shared/index.ts`
- [x] T028 [US2] Implement ProjectsSection with responsive grid layout in `src/components/sections/ProjectsSection.tsx`
- [x] T029 [US2] Integrate ProjectsSection with landing page data fetching in `src/app/page.tsx`
- [x] T030 [US2] Implement database seed script in `src/data/prisma/seed.ts`
- [x] T031 [US2] Add seed script configuration to `package.json`

**Checkpoint**: Projects section displays cards with real database data, responsive grid, external links work

---

## Phase 5: User Story 3 - Navigate Page Sections (Priority: P2)

**Goal**: Provide navigation between page sections (profile, projects, contact) with smooth scrolling

**Independent Test**: Verify that a navigation bar is present and clicking links scrolls to the correct section smoothly.

### Tests for User Story 3

- [x] T032 [P] [US3] Create Navigation component tests in `src/components/shared/Navigation.test.tsx`

### Implementation for User Story 3

- [x] T033 [US3] Implement Navigation component with section links in `src/components/shared/Navigation.tsx`
- [x] T034 [US3] Implement mobile hamburger menu in `src/components/shared/Navigation.tsx`
- [x] T035 [US3] Add smooth scroll CSS behavior in `src/app/globals.css`
- [x] T036 [US3] Integrate Navigation into root layout in `src/app/layout.tsx`

**Checkpoint**: Navigation links scroll to sections, mobile menu works, keyboard navigable

---

## Phase 6: User Story 4 - View Contact Information (Priority: P2)

**Goal**: Display contact information and social media links in a dedicated section

**Independent Test**: Navigate to the contact/footer section and verify that social links are displayed and clickable.

### Tests for User Story 4

- [x] T037 [P] [US4] Create ContactSection component tests in `src/components/sections/ContactSection.test.tsx`

### Implementation for User Story 4

- [x] T038 [US4] Implement ContactSection component with social links in `src/components/sections/ContactSection.tsx`
- [x] T039 [US4] Integrate ContactSection with landing page data fetching in `src/app/page.tsx`

**Checkpoint**: Contact section displays social links, links open in new tab, accessible labels

---

## Phase 7: User Story 5 - Manage Portfolio Data via Database (Priority: P2)

**Goal**: Ensure portfolio data is fully database-backed with seed data and Docker integration

**Independent Test**: Start Docker Compose, run seed script, verify all page content matches database data.

### Tests for User Story 5

- [x] T040 [P] [US5] Create integration tests for PrismaProfileRepository in `tests/integration/profile-repository.test.ts`
- [x] T041 [P] [US5] Create integration tests for PrismaProjectRepository in `tests/integration/project-repository.test.ts`

### Implementation for User Story 5

- [x] T042 [US5] Create initial Prisma migration in `src/data/prisma/migrations/`
- [x] T043 [US5] Verify seed data populates at least 1 profile and 3 projects via `src/data/prisma/seed.ts`
- [x] T044 [US5] Configure Docker Compose to auto-connect app to PostgreSQL in `docker-compose.yml`

**Checkpoint**: `docker-compose up` starts full stack, seed script populates data, page shows DB content

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, responsiveness, error handling, and final validation

- [x] T045 [P] Add WCAG AA accessibility attributes (ARIA labels, roles, keyboard nav) across all components
- [x] T046 [P] Verify responsive layout at 320px, 768px, and 1024px+ breakpoints across all sections
- [x] T047 [P] Verify dark mode contrast ratio (4.5:1) for all text elements
- [x] T048 Implement error boundary and error state UI in `src/app/error.tsx`
- [x] T049 Implement empty state handling for missing/incomplete data in section components
- [x] T050 [P] Add placeholder/default image handling for projects without thumbnails in `src/components/shared/ProjectCard.tsx`
- [x] T051 [P] Add text truncation with hover expansion for long descriptions in `src/components/shared/ProjectCard.tsx`
- [x] T052 Run quickstart.md validation end-to-end
- [x] T053 Run `npm run lint` and `npm run typecheck` with zero errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational - can start after Phase 2
- **US2 (Phase 4)**: Depends on Foundational - can start after Phase 2 (may run parallel with US1 except page.tsx)
- **US3 (Phase 5)**: Depends on Foundational - can start after Phase 2
- **US4 (Phase 6)**: Depends on Foundational - can start after Phase 2
- **US5 (Phase 7)**: Depends on US1 + US2 (needs repositories to exist)
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Independent of US1 except shared `page.tsx`
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Needs section IDs from US1/US2/US4
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Independent of US1/US2 except shared `page.tsx`
- **User Story 5 (P2)**: Depends on US1 + US2 repositories being implemented

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Repository implementation before component
- Component before page integration
- Story complete before moving to next priority

### Parallel Opportunities

- Phase 1: T002, T003, T004 can run in parallel
- Phase 2: T007, T008, T009, T010 can run in parallel
- US1: T014 (test) and T016 (seed data) can run in parallel
- US2: T021, T022 (tests) and T024 (seed data) can run in parallel
- US3: T032 (test) can run in parallel with other story work
- US4: T037 (test) can run in parallel with other story work
- US5: T040, T041 (integration tests) can run in parallel
- Polish: T045, T046, T047, T050, T051, T052 can run in parallel

---

## Parallel Example: User Story 1

```text
# Launch test and seed data tasks together:
Task: T014 "Create HeroSection component tests in src/components/sections/HeroSection.test.tsx"
Task: T016 "Create profile seed data file in src/data/seed-data/profile.json"

# Then sequential:
Task: T015 "Implement PrismaProfileRepository"
Task: T017 "Implement HeroSection component"
Task: T019 "Integrate HeroSection with landing page"
```

## Parallel Example: User Story 2

```text
# Launch tests and seed data together:
Task: T021 "Create ProjectCard component tests"
Task: T022 "Create ProjectsSection component tests"
Task: T024 "Create projects seed data file"

# Then sequential:
Task: T023 "Implement PrismaProjectRepository"
Task: T026 "Implement ProjectCard component"
Task: T028 "Implement ProjectsSection"
Task: T029 "Integrate ProjectsSection with landing page"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (View Personal Profile)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Profile) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (Projects) → Test independently → Deploy/Demo
4. Add User Story 3 (Navigation) → Test independently → Deploy/Demo
5. Add User Story 4 (Contact) → Test independently → Deploy/Demo
6. Add User Story 5 (Database validation) → Test independently → Deploy/Demo
7. Polish → Final validation → Production ready

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Profile) + User Story 4 (Contact)
   - Developer B: User Story 2 (Projects) + User Story 3 (Navigation)
3. User Story 5 (Database) after US1 + US2 complete
4. Polish phase after all stories complete

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks in same phase
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- `page.tsx` is shared across US1, US2, US4 - coordinate changes to avoid conflicts
