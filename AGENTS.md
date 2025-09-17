# Repository Guidelines

## Project Structure & Module Organization
- `src/`: Application code (TypeScript + React via Hono/Honox).
  - `index.tsx`: Server entry (SSR with `@hono/react-renderer`).
  - `client.tsx`: Client bundle for small interactive pieces.
  - `components/`: UI components. `components/lp/ui/` contains reusable primitives.
  - `context/`, `utils/`, `lib/supabase.ts`, `styles/` (Tailwind).
- `public/`: Static assets copied as-is (`/images`, `/svg`, `/static/styles`).
- `dist/`: Build output (Cloudflare Pages serves from here).
- Config: `vite.config.ts`, `wrangler.toml`, `tsconfig.json`, `tailwind.config.js`.

## Build, Test, and Development Commands
- Dev server: `bun run dev` (or `npm run dev`) — runs Vite and Tailwind watcher.
- Build (all): `bun run build` — builds CSS, client bundle, and server output to `dist/`.
- Preview (edge): `bun run preview` — run with Cloudflare Pages emulator.
- Deploy: `bun run deploy` — builds and deploys via Wrangler.
- CSS only: `bun run build:css` — compiles `src/styles/globals.css` to `public/static/styles/globals.css`.

## Coding Style & Naming Conventions
- TypeScript: `strict` mode enabled. Prefer explicit types on public APIs.
- Components: PascalCase filenames/exports (e.g., `BlogDetail.tsx`). Utilities/context in camelCase.
- Indentation: 2 spaces; keep imports sorted by package → internal.
- React: Function components with named exports; minimal client-side React, favor SSR.
- Tailwind: Utility-first; co-locate classes with components and avoid redundant custom CSS.

## Testing Guidelines
- Frameworks: None configured yet. For logic-heavy changes, add lightweight unit tests (Vitest) or include manual QA steps in the PR.
- Run: Validate core routes in dev (`/`, `/gallery`, `/blog`, `/about`) and interactive UI (gallery modal, tabs, profile switches).

## Commit & Pull Request Guidelines
- Commits: Concise, imperative. Conventional prefixes encouraged (`feat:`, `fix:`, `perf:`, `docs:`). JP/EN both acceptable. Reference issues when applicable.
- PRs must include: purpose, key changes, screenshots/GIFs for UI, steps to verify, and any config/env notes.
- Checks before submit: build passes (`bun run build`), no runtime errors in `bun run dev`, assets under `public/` only, no `.env` committed.

## Security & Configuration
- Env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Use `.env` (see `.env.template`) and configure in Cloudflare Pages env settings.
- Do not commit secrets or service keys. Prefer server-side access via Workers KV/R2/D1 when added.

