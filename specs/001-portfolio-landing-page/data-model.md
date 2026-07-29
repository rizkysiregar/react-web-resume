# Data Model: Portfolio Landing Page

**Date**: 2026-07-29
**Feature**: Portfolio Landing Page

## Entities

### Profile

Represents the portfolio owner's personal information.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String (UUID) | Primary Key, Auto-generated | Unique identifier |
| name | String | Required, Max 100 chars | Full name of portfolio owner |
| photoUrl | String (URL) | Required, Valid URL | Profile photo URL (external) |
| motto | String | Optional, Max 200 chars | Short tagline or motto |
| description | String | Required, Max 2000 chars | Detailed bio/description |
| socialLinks | SocialLink[] | Required, Min 1 | Array of social media links |
| createdAt | DateTime | Auto-generated | Record creation timestamp |
| updatedAt | DateTime | Auto-updated | Last modification timestamp |

**SocialLink** (embedded type):
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| label | String | Required, Max 50 chars | Platform name (e.g., "GitHub", "LinkedIn") |
| url | String (URL) | Required, Valid URL | Profile URL on platform |

**Validation Rules**:
- `name`: Non-empty, trimmed whitespace
- `photoUrl`: Must be valid HTTPS URL
- `socialLinks`: At least one entry required
- `description`: Supports basic markdown formatting (optional)

**Uniqueness**: Only one Profile record expected (singleton pattern enforced at application level).

---

### Project

Represents a showcase project.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String (UUID) | Primary Key, Auto-generated | Unique identifier |
| title | String | Required, Max 100 chars | Project name |
| description | String | Required, Max 500 chars | Project description |
| thumbnailUrl | String (URL) | Optional, Valid URL | Project thumbnail image URL |
| techStack | String[] | Required, Min 1 | Technologies used (e.g., ["React", "TypeScript"]) |
| demoUrl | String (URL) | Optional, Valid URL | Live demo URL |
| repositoryUrl | String (URL) | Optional, Valid URL | Source code repository URL |
| displayOrder | Integer | Required, Unique | Sort order for display (ascending) |
| isFeatured | Boolean | Default: false | Flag for featured projects |
| createdAt | DateTime | Auto-generated | Record creation timestamp |
| updatedAt | DateTime | Auto-updated | Last modification timestamp |

**Validation Rules**:
- `title`: Non-empty, trimmed whitespace
- `description`: Truncated to 150 chars on card display, full text on hover/expansion
- `techStack`: At least one technology required, no duplicates
- `displayOrder`: Unique integer for consistent ordering
- At least one of `demoUrl` or `repositoryUrl` should be provided (soft requirement)

**Uniqueness**: `displayOrder` must be unique across all projects.

---

## Relationships

```
Profile (1) ←→ (0..*) Project
```

- One Profile can have many Projects
- Projects are independent entities but logically belong to the portfolio owner
- No foreign key relationship (Profile is singleton)

---

## State Transitions

No state machine required. Entities are static content managed via seed scripts.

**Lifecycle**:
1. Created via seed script from JSON data
2. Read by application for display
3. Updated via re-seeding or direct database modification
4. Deleted via direct database access (no UI)

---

## Database Schema (Prisma)

```prisma
model Profile {
  id          String   @id @default(uuid())
  name        String   @db.VarChar(100)
  photoUrl    String   @map("photo_url")
  motto       String?  @db.VarChar(200)
  description String   @db.Text
  socialLinks Json     @map("social_links")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("profiles")
}

model Project {
  id            String   @id @default(uuid())
  title         String   @db.VarChar(100)
  description   String   @db.VarChar(500)
  thumbnailUrl  String?  @map("thumbnail_url")
  techStack     String[] @map("tech_stack")
  demoUrl       String?  @map("demo_url")
  repositoryUrl String?  @map("repository_url")
  displayOrder  Int      @unique @map("display_order")
  isFeatured    Boolean  @default(false) @map("is_featured")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  @@map("projects")
}
```

---

## Seed Data Structure

### profile.json

```json
{
  "name": "John Doe",
  "photoUrl": "https://example.com/photo.jpg",
  "motto": "Building things that matter",
  "description": "Full-stack developer passionate about creating elegant solutions...",
  "socialLinks": [
    { "label": "GitHub", "url": "https://github.com/johndoe" },
    { "label": "LinkedIn", "url": "https://linkedin.com/in/johndoe" },
    { "label": "Twitter", "url": "https://twitter.com/johndoe" }
  ]
}
```

### projects.json

```json
[
  {
    "title": "Project Alpha",
    "description": "A revolutionary web application that...",
    "thumbnailUrl": "https://example.com/alpha.jpg",
    "techStack": ["React", "TypeScript", "Next.js"],
    "demoUrl": "https://alpha.example.com",
    "repositoryUrl": "https://github.com/johndoe/alpha",
    "displayOrder": 1,
    "isFeatured": true
  },
  {
    "title": "Project Beta",
    "description": "An open-source library for...",
    "thumbnailUrl": null,
    "techStack": ["TypeScript", "Node.js"],
    "demoUrl": null,
    "repositoryUrl": "https://github.com/johndoe/beta",
    "displayOrder": 2,
    "isFeatured": false
  }
]
```

---

## Indexes

| Entity | Field | Type | Purpose |
|--------|-------|------|---------|
| Project | displayOrder | Unique | Enforce sort order uniqueness |
| Project | isFeatured | Optional | Filter featured projects (future use) |

---

## Data Volume Assumptions

- **Profile**: 1 record (singleton)
- **Projects**: 5-15 records (per clarification Q1)
- **Storage**: <1MB total data
- **Query Pattern**: Load all at once (no pagination needed)
