# Implementation Plan: Portfolio Landing Page

**Branch**: `001-portfolio-landing-page` | **Date**: 2026-07-29 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-portfolio-landing-page/spec.md`

## Summary

Build a Next.js portfolio landing page with PostgreSQL backend, featuring personal profile display, project showcase (5-15 projects), and contact information. Uses static site generation (SSG) for SEO, Next.js Image component for optimization, and WCAG AA accessibility compliance. Content managed via JSON/YAML seed scripts.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)

**Primary Dependencies**: Next.js 14+ (App Router), React 18+, Tailwind CSS, Zod

**Storage**: PostgreSQL 15+ with Prisma ORM

**Testing**: Vitest + React Testing Library

**Target Platform**: Docker containers (Linux-based)

**Project Type**: web-service (static site generation)

**Performance Goals**: <5s page load, <100ms interactive response

**Constraints**: 320px-1920px responsive, WCAG AA compliance, 4.5:1 contrast ratio

**Scale/Scope**: Single-page landing site, 5-15 projects, 1 profile entry

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Clean Architecture | ✅ PASS | Next.js App Router supports layer separation; server components for data, client components for interactivity |
| II. Component Isolation | ✅ PASS | Standard React component patterns; props-driven, co-located tests |
| III. Type Safety First | ✅ PASS | TypeScript strict mode; Zod for runtime validation of DB data |
| IV. Simplicity (YAGNI/KISS) | ✅ PASS | Single-page, no auth, no CMS; minimal dependencies |
| V. Test-Driven Quality | ✅ PASS | Vitest + RTL; co-located test files; 80% coverage target for data layer |

**Gate Result**: All principles satisfied. Proceed to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-landing-page/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/                          # Next.js App Router (presentation layer)
│   ├── layout.tsx                # Root layout with dark mode theme
│   ├── page.tsx                  # Landing page (server component)
│   └── globals.css               # Global styles + Tailwind imports
├── components/
│   ├── shared/                   # Reusable components
│   │   ├── Navigation.tsx
│   │   ├── Navigation.test.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectCard.test.tsx
│   │   └── index.ts              # Barrel export
│   └── sections/                 # Page section components
│       ├── HeroSection.tsx
│       ├── HeroSection.test.tsx
│       ├── ProjectsSection.tsx
│       ├── ProjectsSection.test.tsx
│       ├── ContactSection.tsx
│       ├── ContactSection.test.tsx
│       └── index.ts              # Barrel export
├── domain/                       # Domain layer (business logic)
│   ├── entities/
│   │   ├── Profile.ts
│   │   ├── Project.ts
│   │   └── index.ts
│   └── repositories/
│       ├── ProfileRepository.ts
│       ├── ProjectRepository.ts
│       └── index.ts
├── data/                         # Data layer (external integrations)
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/
│   ├── repositories/
│   │   ├── PrismaProfileRepository.ts
│   │   ├── PrismaProjectRepository.ts
│   │   └── index.ts
│   └── seed-data/
│       ├── profile.json
│       └── projects.json
├── types/                        # Shared TypeScript types
│   ├── index.ts
│   └── schemas.ts                # Zod validation schemas
└── lib/                          # Utilities
    ├── prisma.ts                 # Prisma client singleton
    └── validation.ts             # Zod validation helpers

tests/
├── integration/
│   └── data-layer.test.ts        # Prisma repository tests
└── e2e/                          # (optional, future)

public/
├── images/                       # Static images (profile photo, placeholders)
└── favicon.ico

docker-compose.yml                # PostgreSQL + app services
Dockerfile                        # Next.js production build
.env.example                      # Environment variable template
```

**Structure Decision**: Single Next.js project with clean architecture layers. App Router handles presentation, domain layer contains business entities and repository interfaces, data layer implements Prisma-based repositories. Component isolation enforced via barrel exports.

## Complexity Tracking

No constitution violations detected. All principles satisfied with standard patterns.
