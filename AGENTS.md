# Repository Guidelines

## Project Overview

NIKECHAN BLOG is a portfolio & blog site built with Hono (API) + React (SSR) architecture. It uses server-side rendering for performance while maintaining selective client-side interactivity. The application runs on Cloudflare Workers with edge computing and uses Supabase for backend services.

## Workflow

- **開発サーバーは常時起動しておく**: 作業開始時に `bun run dev` をバックグラウンドで起動し、ユーザーがいつでも最新の状態を確認できるようにすること。ユーザーに言われる前に起動する。

## Project Structure & Module Organization
- `src/`: Application code (TypeScript + React via Hono).
  - `index.tsx`: Hono server — routing, middleware, page rendering (SSR with `@hono/react-renderer`).
  - `renderer.tsx`: Common HTML template.
  - `client.tsx`: Client bundle for small interactive pieces (gallery modal React tree + vanilla DOM).
  - `components/`: UI components. `components/lp/` contains the landing page sections.
  - `context/`, `utils/`, `lib/supabase.ts`, `i18n/`, `styles/` (Tailwind).
- `content/posts/`: Blog posts in Markdown.
- `public/`: Static assets copied as-is (`/images`, `/svg`, `/static/styles`).
- `dist/`: Build output.
- `docs/`: Design notes (`DESIGN_SYSTEM.md` など).
- Config: `vite.config.ts`, `wrangler.toml`, `tsconfig.json`, `tailwind.config.js`.

## Build, Test, and Development Commands
- Install: `bun install`.
- Dev server: `bun run dev` (or `npm run dev`) — runs Vite and Tailwind watcher.
- Build (all): `bun run build` — OGP fetch → CSS → client JS → server bundle → copy `public/*` to `dist/assets/`.
- Server only: `bun run build:server`. Client JS only: `bun run build:client`.
- CSS only: `bun run build:css` — compiles `src/styles/globals.css` to `public/static/styles/globals.css`. Watch: `bun run watch:css`.
- OGP fetch: `bun run fetch-ogp` — fetches OGP data for blog post links.
- Preview (edge): `bun run preview` — run locally with Wrangler.
- Deploy: `bun run deploy` — builds and deploys via Wrangler.

## Architecture

### Server-Side Rendering (SSR)
- React components are rendered to static HTML on the server using `@hono/react-renderer`
- No full React hydration — only selective client-side interactivity via `src/client.tsx`
- `src/client.tsx` mounts a small React tree (gallery modal) and uses vanilla DOM manipulation for other interactions (profile switching, chart rendering, pagination, etc.)
- Data attributes (`data-*`) bridge server-rendered HTML with client interactions

### Routes (`src/index.tsx`)
- `/` — Landing page
- `/news` — News/announcements
- `/ai-news` — AI news, `/ai-news/daily` — Daily index, `/ai-news/daily/:date` — Daily detail
- `/gallery` — Fan art gallery, `/gallery/commissioned` — Commissioned works
- `/guidelines` — Guidelines, `/guidelines/derivative` — Derivative creation guidelines, `/guidelines/ai` — AI usage guidelines
- `/privacy`, `/terms` — Legal pages
- `/developer` — Developer info, `/activities` — Activity list, `/activities/:slug` — Activity detail
- `/dev-blog` — Blog post list (Markdown + external), `/dev-blog/:slug` — Blog post detail
- `/about` — Profile page
- `/characters` — Character list, `/characters/:name` — Individual character profiles
- `/tutorials` — Image / video generation tutorial
- `/log`, `/log/:id`, `/log/summary/:yearMonth` — Activity log (Supabase). 非公開で404を返す。`src/index.tsx` の `LOG_PAGES_PUBLIC` で戻せる
- Legacy redirects: `/blog`・`/dev_blog`・`/dev/blog` → `/dev-blog`, `/license` → `/guidelines/derivative`, `/dev`・`/developers` → `/developer`, `/tutorial` → `/tutorials`, `/world` → `/about`, `/ai-character-news` → `/ai-news`

### Build Process
- Vite handles both server and client builds (`vite.config.ts`)
- Client build mode (`vite build --mode client`) outputs to `dist/assets/static/client.js`
- TailwindCSS: `src/styles/globals.css` → `public/static/styles/globals.css`

### i18n (Internationalization)
- ja/en support via i18next (`src/i18n/config.ts`)
- Translation JSON files in `src/i18n/locales/{ja,en}/` (navigation, common, home, about, tutorial, guidelines, developer, gallery)
- Locale detected from `?lang=` query param → `Accept-Language` header → default `ja`
- Components receive `locale` prop; use `getT(locale)` for translations
- i18n JSON file changes trigger full browser reload in dev (custom Vite plugin)

### Key Technologies
- **Hono**: Web framework with JSX support
- **Cloudflare Workers**: Hosting platform (configured in `wrangler.toml`)
- **Supabase**: Database for activity logs and blog data
- **TailwindCSS**: Styling with typography and aspect-ratio plugins
- **Chart.js**: Data visualization for analytics
- **i18next**: Internationalization (ja/en)

## Coding Style & Naming Conventions
- TypeScript: `strict` mode enabled. Prefer explicit types on public APIs.
- Components: PascalCase filenames/exports (e.g., `BlogDetail.tsx`). Utilities/context in camelCase.
- Indentation: 2 spaces; keep imports sorted by package → internal.
- React: Function components with named exports; minimal client-side React, favor SSR. Keep client-side logic minimal and in `src/client.tsx`.
- Tailwind: Utility-first; co-locate classes with components and avoid redundant custom CSS. Avoid inline styles unless dynamic.

### CSS / Design System
- `src/styles/globals.css` は Tailwind と `legacy.css`（旧デザイン）、`redesign.css`（2層リデザイン、`nk-` で始まるクラス）を読み込む。新しいスタイルは `redesign.css` に書く。
- ホバーの動きは部品の種類ごとに決めてある。`docs/DESIGN_SYSTEM.md` を参照し、部品ごとに個別のホバーを書かない。
- Use `PageHeader` component for page titles.

## Blog System (自前記事)

### 概要
`content/posts/` にMarkdownファイルを置くだけで記事が公開される。Cloudflare Workersはランタイムでファイルシステムにアクセスできないため、Viteの `import.meta.glob` でビルド時にバンドルに含める設計。

### 記事の作成手順

1. `content/posts/<slug>.md` を作成（slugがURLになる: `/dev-blog/<slug>`）
2. frontmatterを記述:
```markdown
---
title: "記事タイトル"
date: "2026-03-30"
tags: ["タグ1", "タグ2"]
description: "記事の概要（OGP用）"
thumbnail: "/static/images/posts/<slug>/thumbnail.png"
---

本文のMarkdown...
```
3. 画像は `public/static/images/posts/<slug>/` に配置
4. サムネイルは1200x630px推奨（OGPカードにも使用される）
5. `bun run build` でOGPキャッシュ取得→CSS→クライアント→サーバーの順にビルド

### 記事内のリンク表示
- **OGPカード**: URLを単独行に `https://example.com` または `[https://example.com](https://example.com)` と書くとビルド時にOGPを取得してカード表示
- **Twitter/X埋め込み**: `https://x.com/...` のURLは自動的にoEmbed APIで埋め込みツイートに変換
- OGPデータは `content/ogp-cache.json` にキャッシュされ、GitHub Actionsで定期再ビルドされる
- リスト内や他テキストと混在するURLはOGPカードにならず通常リンクとして表示

### 記事の表示順
- 日付降順でソート（`date`フィールド）
- 同一日付の場合、ファイル名のアルファベット順で**後**のものが先に表示される

### 関連ファイル
| ファイル | 役割 |
|---|---|
| `content/posts/*.md` | 記事本体 |
| `content/ogp-cache.json` | OGPデータキャッシュ（自動生成） |
| `scripts/fetch-ogp.ts` | ビルド時OGP取得スクリプト |
| `src/utils/posts.ts` | 記事の読み込み・パース |
| `src/utils/mdToHtml.ts` | Markdown→HTML変換（TOC生成、OGPカード、コードブロック） |
| `src/components/PostDetail.tsx` | 記事詳細ページ |
| `src/components/DevBlog.tsx` | 記事一覧ページ（自前記事＋外部記事） |

### 注意事項
- イタリック記法は `*text*` のみ対応（`_text_` はHTML属性と競合するため無効化済み）
- サムネイルは記事一覧とOGPメタタグ専用。記事本文の先頭には含めない
- 記事ページ右上にMarkdown全文コピーボタンあり

## Testing Guidelines
- Frameworks: None configured yet. When implementing tests, first check with the project maintainer for the preferred approach. For logic-heavy changes, include manual QA steps in the PR.
- Run: Validate core routes in dev (`/`, `/gallery`, `/dev-blog`, `/about`) and interactive UI (gallery modal, tabs, profile switches).

## Commit & Pull Request Guidelines
- Commits: Concise, imperative. Conventional prefixes encouraged (`feat:`, `fix:`, `perf:`, `docs:`). JP/EN both acceptable. Reference issues when applicable.
- PRs must include: purpose, key changes, screenshots/GIFs for UI, steps to verify, and any config/env notes.
- Checks before submit: build passes (`bun run build`), no runtime errors in `bun run dev`, assets under `public/` only, no `.env` committed.

## Git & Deployment Safety
- An implementation or editing request authorizes local changes and local validation only. Do not run `git push` unless the user explicitly asks for a push in the current conversation.
- A push automatically triggers the deployment workflow in GitHub Actions. Treat every push as a production deployment action, even when no deploy command is run directly.
- Do not run `bun run deploy`, `wrangler deploy`, or any other direct deployment command unless the user explicitly requests a deployment.
- A local commit does not authorize a push. After committing, keep the commit local until the user explicitly approves pushing it.
- When the user asks to review content before publication, stop after local implementation and validation. Do not push or deploy while review is pending.

## Security & Configuration
- Env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Use `.env` (see `.env.template`) and configure in Cloudflare Workers environment variables for both Production and Preview environments.
- Do not commit secrets or service keys. Prefer server-side access via Workers KV/R2/D1 when added.
