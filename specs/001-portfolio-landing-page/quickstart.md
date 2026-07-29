# Quickstart: Portfolio Landing Page

**Date**: 2026-07-29
**Feature**: Portfolio Landing Page

## Prerequisites

- Node.js 18+ (LTS recommended)
- Docker & Docker Compose
- Git

---

## Initial Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd react-web-resume
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio"
```

### 3. Start Database

```bash
docker-compose up -d postgres
```

Wait for PostgreSQL to be ready (check with `docker-compose logs postgres`).

### 4. Database Setup

Run migrations and seed data:

```bash
npx prisma migrate deploy
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Docker Compose (Full Stack)

To run the entire application in Docker:

```bash
docker-compose up --build
```

This starts:
- Next.js application on port 3000
- PostgreSQL database on port 5432

---

## Updating Content

### Edit Seed Data

Modify the JSON files in `src/data/seed-data/`:

- `profile.json` - Personal information
- `projects.json` - Project showcase

### Re-seed Database

```bash
npm run db:seed
```

**Note**: This replaces existing data. For incremental updates, modify the database directly or create a migration.

---

## Build for Production

```bash
npm run build
npm start
```

The static site is generated in `.next/` and can be deployed to any Node.js hosting platform.

---

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## Project Structure

```
src/
├── app/              # Next.js pages and layouts
├── components/       # React components
├── domain/           # Business logic and entities
├── data/             # Database and repositories
├── types/            # TypeScript types
└── lib/              # Utilities

specs/001-portfolio-landing-page/
├── spec.md           # Feature specification
├── plan.md           # Implementation plan
├── research.md       # Technical research
├── data-model.md     # Database schema
├── contracts/        # Component interfaces
└── tasks.md          # Development tasks (generated later)
```

---

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm test` | Run tests |
| `npm run lint` | Lint code |
| `npm run typecheck` | Type check with TypeScript |
| `npx prisma studio` | Open Prisma Studio (database GUI) |
| `npx prisma migrate dev` | Create new migration |
| `npm run db:seed` | Seed database with sample data |

---

## Troubleshooting

### Database Connection Failed

1. Ensure PostgreSQL container is running: `docker-compose ps`
2. Check logs: `docker-compose logs postgres`
3. Verify `DATABASE_URL` in `.env` matches container settings

### Port Already in Use

Change the port in `docker-compose.yml` or run:

```bash
PORT=3001 npm run dev
```

### Prisma Client Not Generated

```bash
npx prisma generate
```

---

## Next Steps

1. Review `specs/001-portfolio-landing-page/tasks.md` for development tasks
2. Implement features in priority order (P1 first)
3. Run tests after each task: `npm test`
4. Commit with conventional commits: `feat: add hero section`
