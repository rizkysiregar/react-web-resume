# Research: Portfolio Landing Page

**Date**: 2026-07-29
**Feature**: Portfolio Landing Page

## Research Topics

### 1. Styling Approach: Tailwind CSS vs CSS Modules

**Decision**: Tailwind CSS

**Rationale**:
- Rapid development with utility-first approach
- Built-in dark mode support via `dark:` variants
- Excellent responsive design utilities (matches FR-009 breakpoints)
- Smaller production bundle size with JIT compilation
- Better developer experience for a single-page site
- Consistent with modern Next.js ecosystem

**Alternatives considered**:
- CSS Modules: More verbose, requires manual responsive breakpoints, no built-in dark mode support
- Styled Components: Runtime overhead, larger bundle size, unnecessary for static site
- Vanilla CSS: No type safety, harder to maintain consistency

---

### 2. Database ORM: Prisma vs Drizzle vs Raw SQL

**Decision**: Prisma ORM

**Rationale**:
- Type-safe database queries (aligns with Constitution Principle III)
- Excellent migration system for PostgreSQL
- Built-in seed functionality with TypeScript support
- Strong Next.js integration and community support
- Schema-as-code approach enables easy version control
- Automatic TypeScript type generation from schema

**Alternatives considered**:
- Drizzle ORM: Newer, less mature ecosystem, fewer resources
- Raw SQL: No type safety, manual migration management, violates Constitution Principle III
- TypeORM: More complex setup, less intuitive for simple schemas

---

### 3. Static Site Generation (SSG) Data Fetching Pattern

**Decision**: Next.js `generateStaticParams` + Server Components

**Rationale**:
- Native Next.js App Router pattern for SSG
- Server Components fetch data at build time, no client-side JavaScript needed
- Automatic static optimization for all pages
- SEO-friendly with pre-rendered HTML
- Aligns with Constitution Principle I (Framework Isolation)

**Alternatives considered**:
- `getStaticProps` (Pages Router): Legacy pattern, not compatible with App Router
- Client-side fetching with SWR/React Query: Adds JavaScript bundle, not ideal for SEO
- Incremental Static Regeneration (ISR): Unnecessary complexity for infrequently updated content

---

### 4. Image Optimization Strategy

**Decision**: Next.js Image Component with external URLs

**Rationale**:
- Automatic image optimization (WebP, responsive sizes)
- Built-in lazy loading and blur placeholders
- Supports external URLs via `remotePatterns` configuration
- Aligns with spec assumption (images stored as external URLs)
- Zero additional dependencies

**Alternatives considered**:
- Manual image processing: Requires build-time tooling, more complex
- External CDN (Cloudinary, Imgix): Adds cost and external dependency
- Native `<img>` tag: No optimization, poor performance on mobile

---

### 5. Seed Data Format: JSON vs YAML

**Decision**: JSON

**Rationale**:
- Native TypeScript/JavaScript support without additional parsers
- Type-safe with Zod validation at runtime
- Simpler tooling (no YAML parser dependency)
- Easier to edit for developers familiar with JSON
- Aligns with Constitution Principle IV (Simplicity)

**Alternatives considered**:
- YAML: Requires additional parser (js-yaml), more complex setup
- TypeScript files: Harder to edit for non-developers, requires compilation
- CSV: Not suitable for nested data (social links, tech stack)

---

## Summary

All research topics resolved. No remaining NEEDS CLARIFICATION items. Ready for Phase 1 design.
