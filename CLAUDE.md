# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NIKELOG is a modern web application built with Hono framework and Cloudflare Pages. It leverages edge computing for fast responses and uses Supabase for backend services. The site serves as a portfolio and blog platform.

## Common Commands

### Development
```bash
# Install dependencies
bun install

# Start development server with hot reload for CSS
bun run dev

# Build CSS separately
bun run build:css

# Watch CSS changes
bun run watch:css
```

### Build & Deploy
```bash
# Full build (CSS + client + server)
bun run build

# Deploy to Cloudflare Pages
bun run deploy

# Preview locally with Wrangler
bun run preview
```

## Architecture

### Server-Side Rendering (SSR)
- React components are rendered to static HTML on the server using `@hono/react-renderer`
- Routes are defined in `src/index.tsx`
- No full React hydration - only selective client-side interactivity

### Client-Side Interactivity
- `src/client.tsx` provides minimal DOM manipulation for interactions:
  - Gallery modal functionality
  - Profile switching
  - Tab navigation
  - Chart.js visualizations
  - Pagination controls
- Only `BlogDetailV3` component uses React hydration

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