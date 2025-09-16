# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NIKECHAN BLOG is a portfolio & blog site built with Hono (API) + React (SSR) architecture. It uses server-side rendering for performance while maintaining selective client-side interactivity. The application runs on Cloudflare Pages with edge computing and uses Supabase for backend services.

## Common Commands

### Development
```bash
# Install dependencies
bun install

# Start development server with hot reload for CSS
bun run dev

# Build CSS separately (for standalone CSS updates)
bun run build:css

# Watch CSS changes (standalone CSS watching)
bun run watch:css
```

### Build & Deploy
```bash
# Full production build (CSS + client + server)
bun run build

# Build server only (includes CSS)
bun run build:server

# Build client JavaScript only
bun run build:client

# Deploy to Cloudflare Pages
bun run deploy

# Preview locally with Wrangler
bun run preview
```

## Architecture

### Server-Side Rendering (SSR)
- React components are rendered to static HTML on the server using `@hono/react-renderer`
- Routes are defined in `src/index.tsx` (`/`, `/blog`, `/blog/:id`, `/blog/summary/:yearMonth`, `/about`)
- No full React hydration - only selective client-side interactivity

### Client-Side Interactivity
- `src/client.tsx` provides minimal DOM manipulation for interactions:
  - Gallery modal functionality (small React tree)
  - Profile switching (About page)
  - Transcription toggle functionality
  - Analytics tab switching
  - Chart.js visualizations
  - Pagination controls
- Light-weight interactions use vanilla TypeScript, no full React hydration

### Build Process
- Vite handles both server and client builds
- Client build mode (`vite build --mode client`) outputs to `dist/static/client.js`
- Server build includes all SSR components
- TailwindCSS processes styles from `src/styles/globals.css` to `public/static/styles/globals.css`

### Key Technologies
- **Hono**: Web framework with JSX support
- **Cloudflare Pages**: Hosting platform
- **Supabase**: Database and authentication
- **TailwindCSS**: Styling with typography and aspect-ratio plugins
- **Chart.js**: Data visualization for analytics
- **TypeScript**: Type safety throughout

### Environment Variables
Required for Supabase integration:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Set these in Cloudflare Pages environment variables for both Production and Preview environments.

## Code Conventions

### Component Structure
- Server components in `src/components/` render static HTML
- Use TailwindCSS classes for styling
- Keep client-side logic minimal and in `src/client.tsx`
- Data attributes (`data-*`) bridge server HTML with client interactions

### TypeScript
- Strict mode enabled
- Use proper types for all props and data structures
- Cloudflare Workers types are included

### CSS/Styling
- TailwindCSS for all styling
- Global styles in `src/styles/globals.css`
- Avoid inline styles unless dynamic

## Key File Structure

### Entry Points
- `src/index.tsx`: Main Hono server with routing and page rendering
- `src/renderer.tsx`: Common HTML template using `@hono/react-renderer`
- `src/client.tsx`: Client-side interactions (TypeScript + minimal React for modals)

### Components Organization
- Layout:
  - `src/components/Layout.tsx`: Common header/footer/navigation
- Page Components:
  - `Introduction.tsx`: Homepage self-introduction section
  - `Model.tsx`: 3D model display
  - `Gallery.tsx`: Portfolio gallery listing
  - `Blog.tsx`: Blog article listing
  - `BlogDetail.tsx`: Article detail page (latest version)
  - `BlogDetailV1.tsx` ~ `V3.tsx`: Previous versions of detail page
  - `MonthlySummary.tsx`: Monthly blog summary
  - `About.tsx`: Profile page (appearance defined in React, functionality in client.tsx)
- Static assets served via Hono's `serveStatic` from `/public` to `/images/*`, `/static/*`, `/svg/*`

### Client-Side Architecture
- Server renders React to static HTML
- Client script provides selective interactivity:
  - Gallery modal (small React tree)
  - Profile switching on About page
  - Tab navigation and analytics charts
  - No full React hydration - performance optimized

## Testing

No test framework is currently configured. When implementing tests, first check with the project maintainer for preferred testing approach.