# Personal Blog — Implementation Plan

## Context

A Frontend Mentor premium challenge "Personal Blog" implemented with Vite + React + Tailwind + Supabase.

The Figma file `personal-blog.fig` (✨ Designs page) was reviewed to define the full implementation plan covering all 5 frontend pages and the Supabase backend.

---

## Figma Design Analysis

### Page Structure

| Page           | Route         | Figma Frames                                                              |
|----------------|---------------|---------------------------------------------------------------------------|
| Home           | `/`           | Desktop/Tablet/Mobile - Home - Light/Dark                                 |
| Blog List      | `/blog`       | Desktop/Tablet/Mobile - Blog - Light/Dark                                 |
| Blog Detail    | `/blog/:slug` | Desktop/Tablet/Mobile - Single Blog - Light/Dark                          |
| About          | `/about`      | Desktop/Tablet/Mobile - About - Light/Dark                                |
| Newsletter     | `/newsletter` | Desktop/Tablet/Mobile - Newsletter - Light/Dark (+ Success/Error/Hover/Focus states) |

### Design Tokens

**Font: DM Sans (Google Fonts)**

| Preset               | Size | Weight        | Style  | Line Height | Letter Spacing |
|----------------------|------|---------------|--------|-------------|----------------|
| text-preset-2        | 32px | 800 ExtraBold | –      | 1.3         | -0.5px         |
| text-preset-5        | 20px | 600 SemiBold  | –      | 1.3         | -0.5px         |
| text-preset-6        | 18px | 500 Medium    | –      | 1.5         | -0.5px         |
| text-preset-7        | 18px | 400 Regular   | –      | 1.5         | -0.2px         |
| text-preset-8        | 16px | 400 Regular   | –      | 1.3         | -0.2px         |
| text-preset-8-italic | 16px | 400 Regular   | Italic | 1.3         | -0.2px         |

**Color Palette (Light / Dark)**

| Token              | Light                   | Dark                    | Usage                  |
|--------------------|-------------------------|-------------------------|------------------------|
| `--bg`             | `#fefefe` (neutral/0)   | `#1c1a19` (neutral/900) | Page background        |
| `--bg-secondary`   | `#fbf9f7` (neutral/100) | `#201e1d` (neutral/800) | Card / section bg      |
| `--border`         | `#efedeb` (neutral/200) | `#34302d` (neutral/700) | Dividers               |
| `--text-primary`   | `#34302d` (neutral/700) | `#fefefe` (neutral/0)   | Headings               |
| `--text-secondary` | `#4a4846` (neutral/600) | `#c0bfbf` (neutral/400) | Body text              |
| `--accent`         | `#93cefc` (blue/500)    | `#75b0de` (blue/700)    | Links / accent         |

**Breakpoints:** Mobile (< 768px) / Tablet (768px) / Desktop (1440px)

### Key Components (confirmed in Figma)

- **Navbar** — Logo + nav links + theme toggle. Mobile: hamburger menu
- **ThemeToggle** — Moon/Sun icons (Figma node: 2038:476)
- **Footer** — "Made with ❤️ and ☕️" + social links (GitHub, LinkedIn)
- **BlogEntry** — Title + date + external-link icon (for listing)
- **BlogContent** — Markdown rendering (code blocks, blockquotes, tables, Callouts)
- **NewsletterForm** — Email input + validation + 4 states (Normal/Hover/Error/Success)
- **SocialIcons** — Twitter/GitHub/LinkedIn/FrontendMentor (SVG icons)

---

## Tech Stack

| Role        | Technology                             |
|-------------|----------------------------------------|
| Framework   | Vite 5 + React 18 + TypeScript         |
| Styling     | Tailwind CSS v3 + shadcn/ui            |
| Router      | React Router v6                        |
| Dark Mode   | `darkMode: ["class"]` + localStorage  |
| Markdown    | react-markdown + remark-gfm            |
| Backend     | Supabase (PostgreSQL + Auth)           |
| Dev env     | WSL2 Ubuntu (`npm run dev`)            |

---

## Frontend Implementation

### Project Structure

```
projects/personal-blog/
├── index.html                    ← DM Sans via Google Fonts
├── package.json
├── vite.config.ts                ← @ path alias
├── tailwind.config.js            ← CSS variable 2-layer pattern
├── postcss.config.js
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── components.json               ← shadcn/ui config
└── src/
    ├── main.tsx
    ├── App.tsx                   ← React Router + ScrollToTop
    ├── index.css                 ← Tailwind directives + CSS variables (:root / .dark)
    ├── vite-env.d.ts
    ├── lib/
    │   ├── utils.ts              ← cn() utility
    │   └── supabase.ts           ← Supabase client
    ├── data/
    │   └── posts.ts              ← Static post data (Phase 1 fallback)
    ├── types/
    │   └── index.ts              ← Post, NewsletterFormState types
    ├── hooks/
    │   ├── useTheme.ts           ← Light/dark toggle + localStorage
    │   └── usePosts.ts           ← Supabase RPC hooks (Phase 2)
    ├── components/
    │   ├── Navbar.tsx            ← Sticky + mobile hamburger + theme toggle
    │   ├── Footer.tsx
    │   ├── BlogEntry.tsx         ← Post list card
    │   ├── BlogContent.tsx       ← Markdown renderer with custom components
    │   ├── NewsletterForm.tsx    ← Validated form connected to Supabase RPC
    │   ├── SocialIcons.tsx       ← Social icon links
    │   └── ScrollToTop.tsx       ← Scroll to top on route change
    ├── pages/
    │   ├── HomePage.tsx          ← Greeting + recent posts
    │   ├── BlogPage.tsx          ← All posts + sidebar
    │   ├── BlogDetailPage.tsx    ← Markdown post + prev/next navigation
    │   ├── AboutPage.tsx
    │   └── NewsletterPage.tsx
    └── assets/
        └── images/               ← Profile photo, workspace image, icons
```

### CSS Variable Design (2-layer pattern)

```css
/* src/index.css */
:root {
  --bg: 0 0% 100%;            /* #fefefe */
  --bg-secondary: 30 33% 97%; /* #fbf9f7 */
  --border: 30 11% 93%;       /* #efedeb */
  --text-primary: 26 7% 19%;  /* #34302d */
  --text-secondary: 30 3% 28%;/* #4a4846 */
  --accent: 206 95% 78%;      /* #93cefc */
}

.dark {
  --bg: 20 6% 10%;            /* #1c1a19 */
  --bg-secondary: 20 5% 12%;  /* #201e1d */
  --border: 26 7% 19%;        /* #34302d */
  --text-primary: 0 0% 100%;  /* #fefefe */
  --text-secondary: 0 1% 75%; /* #c0bfbf */
  --accent: 206 61% 67%;      /* #75b0de */
}
```

### Page Details

#### Home
- Avatar + greeting heading with blue marker highlight effect
- Description text + social icons (Frontend Mentor / GitHub / X / LinkedIn)
- Recent posts list (latest 5) + "View all" link

#### Blog List
- Full post list (all 8 posts from Supabase)
- Sidebar: About mini-card + Newsletter CTA
- Responsive: 2-column (blog + sidebar) on desktop, 1-column on mobile/tablet

#### Blog Detail
- Post title + published date
- Markdown content rendered with custom components:
  - Code blocks (CSS/JS/HTML syntax)
  - Blockquotes
  - Tables
  - Callouts (`> **Warning:**` / `> **Tip:**` / `> **Information:**`)
- Previous / Next post navigation

#### About
- Profile description + favorite books list
- Workspace image (responsive: large/small)
- Social links (Follow me section)

#### Newsletter
- Email input form
- Validation:
  - Empty → "This field is required"
  - Invalid format → "Valid email required"
  - Success → success message
- On submit: calls Supabase RPC `subscribe_newsletter`

### Dark Mode

```ts
// src/hooks/useTheme.ts
const stored = localStorage.getItem('theme')
const initial = stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
document.documentElement.classList.toggle('dark', initial === 'dark')
```

---

## Backend Implementation (Supabase)

### Phases

| Phase   | Scope                                                           |
|---------|-----------------------------------------------------------------|
| Phase 1 | Frontend only — content served from static `data/posts.ts`     |
| Phase 2 | Supabase integration — PostgreSQL + RPC functions + newsletter  |

### Database Schema

#### `posts` table

```sql
create table public.posts (
  id           uuid        primary key default gen_random_uuid(),
  slug         text        unique not null,
  title        text        not null,
  description  text,
  content      text        not null,  -- Markdown format
  published_at timestamptz not null,
  tags         text[]      not null default '{}',
  featured     boolean     not null default false,
  created_at   timestamptz not null default now()
);

alter table public.posts enable row level security;
create policy "Public can read posts" on public.posts for select using (true);
```

#### `newsletter_subscribers` table

```sql
create table public.newsletter_subscribers (
  id            uuid        primary key default gen_random_uuid(),
  email         text        unique not null,
  subscribed_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;
create policy "Anyone can subscribe"
  on public.newsletter_subscribers for insert to anon with check (true);
```

### PostgreSQL Functions

| Function                  | Access       | Description                         |
|---------------------------|--------------|-------------------------------------|
| `get_all_posts()`         | anon / auth  | All posts ordered by published_at   |
| `get_post_by_slug(slug)`  | anon / auth  | Single post by slug                 |
| `get_recent_posts(count)` | anon / auth  | N most recent posts (default: 5)    |
| `upsert_post(...)`        | auth only    | Create or update a post             |
| `delete_post(slug)`       | auth only    | Delete a post                       |
| `subscribe_newsletter(email)` | anon     | Add email to subscribers            |
| `get_all_subscribers()`   | auth only    | List all newsletter subscribers     |

### Supabase Directory Structure

```
supabase/
├── config.toml
├── seed.sql
├── schemas/
│   ├── posts.sql
│   ├── newsletter_subscribers.sql
│   └── functions.sql
└── migrations/               ← Auto-generated by supabase db diff
```

### Frontend Integration

```ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

// Fetch all posts
const { data } = await supabase.rpc('get_all_posts')

// Subscribe to newsletter
const { data } = await supabase.rpc('subscribe_newsletter', { p_email: email })
```

`.env.local`:
```
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_KEY=<local anon key>
```

---

## Implementation Steps

### STEP 1: Project Setup
1. Create config files — `package.json`, `vite.config.ts`, `tailwind.config.js`, `tsconfig*.json`, `index.html`, `components.json`, `.gitignore`
2. Create `src/` base files — `main.tsx`, `App.tsx`, `index.css`, `types/`, `lib/utils.ts`
3. Copy assets from starter-code to `src/assets/images/`
4. Scaffold static `data/posts.ts` from `data.json`

### STEP 2: Shared Components
1. `useTheme.ts` hook
2. `Navbar.tsx` (sticky + mobile hamburger + theme toggle)
3. `Footer.tsx`
4. `SocialIcons.tsx`
5. `ScrollToTop.tsx`

### STEP 3: Pages
1. `HomePage.tsx` — greeting + recent posts
2. `BlogPage.tsx` — full post list + sidebar
3. `BlogDetailPage.tsx` — Markdown rendering + prev/next navigation
4. `AboutPage.tsx`
5. `NewsletterPage.tsx` — form validation

### STEP 4: Responsive Adjustments
- Verify all breakpoints: Mobile (375px) / Tablet (768px) / Desktop (1440px)
- Mobile hamburger menu open/close

### STEP 5: Supabase Integration
1. `supabase init` → create schemas → `supabase start`
2. `supabase db diff` → generate migrations → `supabase db reset`
3. Seed 8 posts from `data.json` via `seed.sql`
4. Create `src/lib/supabase.ts` + `src/hooks/usePosts.ts`
5. Replace static data imports in pages with Supabase RPC hooks
6. Connect `NewsletterForm` to `subscribe_newsletter` RPC
7. `supabase link` + `supabase db push` → deploy to Supabase Cloud

---

## Decisions

| Item          | Decision                                                                    |
|---------------|-----------------------------------------------------------------------------|
| Data source   | Phase 1: static `data/posts.ts` → Phase 2: Supabase `posts` table          |
| Newsletter    | Store email in DB only (actual email delivery is out of scope)              |
| Auth          | No subscriber auth required — email-only signup, no password                |

---

## Verification Checklist

### Frontend
```bash
cd projects/personal-blog
npm install && npm run dev
# → http://localhost:5173
```

- [x] All 5 pages route correctly
- [x] Light / dark mode toggle (localStorage persistence)
- [x] Mobile hamburger menu
- [x] Newsletter form: empty error / invalid email error / success message
- [x] Markdown rendering: code blocks, tables, blockquotes, Callouts
- [x] Scroll to top on page navigation
- [x] All breakpoints: Mobile 375px / Tablet 768px / Desktop 1440px

### Backend
```bash
supabase start
supabase db reset
# → http://localhost:54323 (Supabase Studio)
```

- [x] `posts` table seeded with 8 articles
- [x] All 7 RPC functions created
- [x] RLS policies in place
- [x] Frontend fetches from Supabase successfully
- [x] Newsletter form writes to `newsletter_subscribers`

### Deployment
```bash
supabase link --project-ref <ref>
supabase db push
```
