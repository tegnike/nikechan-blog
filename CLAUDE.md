# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NIKECHAN BLOG is a portfolio & blog site built with Hono (API) + React (SSR) architecture. It uses server-side rendering for performance while maintaining selective client-side interactivity. The application runs on Cloudflare Workers with edge computing and uses Supabase for backend services.

## Workflow

- **開発サーバーは常時起動しておく**: 作業開始時に `bun run dev` をバックグラウンドで起動し、ユーザーがいつでも最新の状態を確認できるようにすること。ユーザーに言われる前に起動する。

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
# Full production build (OGP fetch + CSS + client + server + asset copy)
bun run build

# Build server only (includes CSS)
bun run build:server

# Build client JavaScript only
bun run build:client

# Fetch OGP data for blog post links
bun run fetch-ogp

# Deploy to Cloudflare Workers
bun run deploy

# Preview locally with Wrangler
bun run preview
```

## Architecture

### Server-Side Rendering (SSR)
- React components are rendered to static HTML on the server using `@hono/react-renderer`
- No full React hydration — only selective client-side interactivity via `src/client.tsx`
- `src/client.tsx` mounts a small React tree (gallery modal) and uses vanilla DOM manipulation for other interactions (profile switching, chart rendering, pagination, etc.)
- Data attributes (`data-*`) bridge server-rendered HTML with client interactions

### Routes (`src/index.tsx`)
- `/` — Landing page
- `/news` — News/announcements
- `/gallery` — Fan art gallery, `/gallery/commissioned` — Commissioned works
- `/guidelines` — Derivative creation guidelines, `/guidelines/ai` — AI usage guidelines
- `/log` — Activity log (Supabase), `/log/:id` — Log detail, `/log/summary/:yearMonth` — Monthly summary
- `/developer` — Developer info
- `/dev_blog` — Blog post list (Markdown + external), `/dev_blog/:slug` — Blog post detail
- `/about` — Profile page
- `/characters` — Character list, `/characters/:name` — Individual character profiles
- `/tutorial` — Image generation tutorial, `/tutorial/video` — Video generation tutorial
- Legacy redirects: `/blog` → `/dev_blog`, `/license` → `/guidelines`, `/dev` → `/developer`

### Build Process
- Vite handles both server and client builds (`vite.config.ts`)
- Client build mode (`vite build --mode client`) outputs to `dist/assets/static/client.js`
- TailwindCSS: `src/styles/globals.css` → `public/static/styles/globals.css`
- Full build order: OGP fetch → CSS → client JS → server bundle → copy `public/*` to `dist/assets/`

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
- **shadcn/ui-style components**: `src/components/lp/ui/` — Radix UI + CVA based reusable components for the landing page

### Environment Variables
Required for Supabase integration:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Set these in Cloudflare Workers environment variables for both Production and Preview environments.

## Code Conventions

### Component Structure
- Server components in `src/components/` render static HTML via SSR
- Landing page components in `src/components/lp/` (sections + UI primitives)
- Use TailwindCSS classes for styling
- Keep client-side logic minimal and in `src/client.tsx`

### CSS/Styling
- TailwindCSS for all styling
- Global styles in `src/styles/globals.css`
- Avoid inline styles unless dynamic
- **Design System**: See `docs/DESIGN_SYSTEM.md` for unified page design patterns
  - All pages use "character-page" design with gradient headers, glass panels, and footer gradients
  - Use `PageHeader` component for page titles
  - Use `glass-panel` class for content containers

### Key Entry Points
- `src/index.tsx`: Hono server — routing, middleware, page rendering
- `src/renderer.tsx`: Common HTML template (`@hono/react-renderer`)
- `src/client.tsx`: Client-side interactions (gallery modal React tree + vanilla DOM)

## Blog System (自前記事)

### 概要
`content/posts/` にMarkdownファイルを置くだけで記事が公開される。Cloudflare Workersはランタイムでファイルシステムにアクセスできないため、Viteの `import.meta.glob` でビルド時にバンドルに含める設計。

### 記事の作成手順

1. `content/posts/<slug>.md` を作成（slugがURLになる: `/dev_blog/<slug>`）
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

## Testing

No test framework is currently configured. When implementing tests, first check with the project maintainer for preferred testing approach.