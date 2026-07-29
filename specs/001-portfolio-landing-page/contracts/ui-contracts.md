# UI Contracts: Portfolio Landing Page

**Date**: 2026-07-29
**Feature**: Portfolio Landing Page

## Overview

This document defines the component interfaces (props) for the portfolio landing page. All components follow Constitution Principle II (Component Isolation) and receive data via props.

---

## Shared Components

### Navigation

Top navigation bar with section links.

```typescript
interface NavigationProps {
  sections: NavigationSection[];
  className?: string;
}

interface NavigationSection {
  id: string;        // Section anchor ID (e.g., "projects", "contact")
  label: string;     // Display text
}
```

**Behavior**:
- Renders horizontal nav on desktop, hamburger menu on mobile
- Smooth scroll to section on click
- Active section highlighting (optional enhancement)

**Accessibility**:
- `role="navigation"` on container
- `aria-label="Main navigation"`
- Keyboard navigable (Tab, Enter)

---

### ProjectCard

Individual project display card.

```typescript
interface ProjectCardProps {
  title: string;
  description: string;
  thumbnailUrl?: string | null;
  techStack: string[];
  demoUrl?: string | null;
  repositoryUrl?: string | null;
  className?: string;
}
```

**Behavior**:
- Displays thumbnail or placeholder image
- Truncates description to 150 chars with ellipsis
- Shows full description on hover/expansion (tooltip or modal)
- External links open in new tab with `rel="noopener noreferrer"`

**Accessibility**:
- `alt` text for thumbnail (use title if no alt provided)
- Links have descriptive `aria-label` (e.g., "View Project Alpha demo")
- Placeholder image has `alt=""` (decorative)

---

## Section Components

### HeroSection

Profile/hero section at top of page.

```typescript
interface HeroSectionProps {
  name: string;
  photoUrl: string;
  motto?: string | null;
  description: string;
  className?: string;
}
```

**Behavior**:
- Displays profile photo with Next.js Image component
- Responsive layout: photo left/right on desktop, centered on mobile
- Motto displayed as subtitle (if present)
- Description supports basic markdown (optional)

**Accessibility**:
- Profile photo has `alt="{name}'s photo"`
- Semantic heading hierarchy (`<h1>` for name)
- Sufficient color contrast (WCAG AA)

---

### ProjectsSection

Grid/list of project cards.

```typescript
interface ProjectsSectionProps {
  projects: Project[];
  className?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string | null;
  techStack: string[];
  demoUrl?: string | null;
  repositoryUrl?: string | null;
  isFeatured: boolean;
}
```

**Behavior**:
- Renders projects in `displayOrder` sequence
- Grid layout: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Featured projects may have visual emphasis (optional enhancement)
- Empty state: "No projects available yet" message

**Accessibility**:
- Section has `aria-labelledby` pointing to heading
- Grid uses semantic list (`<ul>`, `<li>`) or CSS Grid with proper roles
- Each card is focusable and links are keyboard accessible

---

### ContactSection

Contact information and social links.

```typescript
interface ContactSectionProps {
  socialLinks: SocialLink[];
  className?: string;
}

interface SocialLink {
  label: string;
  url: string;
}
```

**Behavior**:
- Displays social links as icon list or button group
- Links open in new tab with `rel="noopener noreferrer"`
- Icons from icon library (e.g., react-icons) or custom SVG

**Accessibility**:
- Links have `aria-label` with platform name
- Icons have `aria-hidden="true"` (decorative)
- Sufficient touch target size (44x44px minimum)

---

## Page-Level Data Contract

The landing page (server component) fetches all data and passes to section components:

```typescript
interface LandingPageData {
  profile: {
    name: string;
    photoUrl: string;
    motto?: string | null;
    description: string;
    socialLinks: SocialLink[];
  };
  projects: Project[];
}
```

**Data Flow**:
1. Server component fetches `LandingPageData` from repositories
2. Passes `profile` to `HeroSection` and `ContactSection`
3. Passes `projects` to `ProjectsSection`
4. `Navigation` receives static section list (no data dependency)

---

## Error States

### Database Unreachable

```typescript
interface ErrorStateProps {
  message: string;
  retryUrl?: string;
}
```

- Display user-friendly error message
- Optional retry button/link

### Missing Data

- **No profile**: Page cannot render (critical error)
- **No projects**: Display empty state message in `ProjectsSection`
- **Incomplete profile**: Omit missing fields gracefully (e.g., no motto)

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | 320px - 767px | Single column, stacked sections |
| Tablet | 768px - 1023px | Two-column project grid |
| Desktop | 1024px+ | Three-column project grid, horizontal nav |

---

## Dark Mode Theme

All components use Tailwind CSS dark mode classes:

```typescript
// Example: Card background
className="bg-gray-900 dark:bg-gray-800"

// Example: Text color
className="text-gray-100 dark:text-gray-200"
```

**Note**: Dark mode is the default and only theme (per FR-008). Light mode classes are not required.

---

## Animation & Transitions

- **Smooth scroll**: Native CSS `scroll-behavior: smooth`
- **Hover effects**: Tailwind `transition` + `hover:` variants
- **Loading states**: Skeleton placeholders for images (Next.js Image blur)

No complex animations required for v1.
