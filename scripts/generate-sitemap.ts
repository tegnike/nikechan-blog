/**
 * sitemap.xml をビルド時に自動生成する
 *
 * - 静的ルート一覧(このファイルの STATIC_PATHS)と content/posts/*.md から生成
 * - 各URLに hreflang 代替リンク(xhtml:link)を付与
 *   - 通常ページ: en 版は ?lang=en
 *   - 記事: -en サフィックスのペアスラッグ
 * - draft: true の記事は除外
 * - 出力先: public/sitemap.xml (build 時に dist/assets/ へコピーされる)
 *
 * 実行: bun run scripts/generate-sitemap.ts (bun run build に組み込み済み)
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, basename } from 'node:path'

const SITE_URL = 'https://nikechan.com'
const ROOT = join(import.meta.dir, '..')
const POSTS_DIR = join(ROOT, 'content/posts')
const OUT_PATH = join(ROOT, 'public/sitemap.xml')

// sitemap に載せる静的ルート。src/index.tsx にページルートを追加したらここにも追加する。
// (リダイレクト専用ルート・APIルート・動的詳細ページ・審査用ページは載せない)
const STATIC_PATHS: string[] = [
  '/',
  '/updates',
  '/ai-news',
  '/ai-news/daily',
  '/gallery',
  '/gallery/commissioned',
  '/guidelines',
  '/guidelines/derivative',
  '/guidelines/ai',
  '/privacy',
  '/terms',
  '/log',
  '/developer',
  '/dev-blog',
  '/about',
  '/characters',
  '/characters/ainike',
  '/characters/nike',
  '/characters/mikaze',
  '/characters/punike',
  '/characters/today_norma',
  '/tutorials',
  '/tutorials/video',
]

type PostMeta = { slug: string; date: string; draft: boolean }

function readPosts(): PostMeta[] {
  return readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = readFileSync(join(POSTS_DIR, f), 'utf-8')
      const fm = raw.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? ''
      const date = fm.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})["']?\s*$/m)?.[1] ?? ''
      const draft = /^draft:\s*["']?true["']?\s*$/m.test(fm)
      return { slug: basename(f, '.md'), date, draft }
    })
    .filter((p) => !p.draft)
}

function xmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

type UrlEntry = {
  loc: string
  lastmod?: string
  alternates: { hreflang: string; href: string }[]
}

function alternateLinks(ja: string | undefined, en: string | undefined) {
  const links: { hreflang: string; href: string }[] = []
  if (ja) links.push({ hreflang: 'ja', href: ja })
  if (en) links.push({ hreflang: 'en', href: en })
  const xDefault = ja ?? en
  if (xDefault) links.push({ hreflang: 'x-default', href: xDefault })
  return links
}

const entries: UrlEntry[] = []

// 静的ルート: ja(素のURL)と en(?lang=en)を別エントリで登録
for (const path of STATIC_PATHS) {
  const jaUrl = `${SITE_URL}${path}`
  const enUrl = `${jaUrl}?lang=en`
  const alternates = alternateLinks(jaUrl, enUrl)
  entries.push({ loc: jaUrl, alternates })
  entries.push({ loc: enUrl, alternates })
}

// 記事: -en サフィックスでペアリング
const posts = readPosts()
const bySlug = new Map(posts.map((p) => [p.slug, p]))
for (const post of posts) {
  const baseSlug = post.slug.replace(/-en$/, '')
  const jaPost = bySlug.get(baseSlug)
  const enPost = bySlug.get(`${baseSlug}-en`)
  const jaUrl = jaPost ? `${SITE_URL}/dev-blog/${baseSlug}` : undefined
  const enUrl = enPost ? `${SITE_URL}/dev-blog/${baseSlug}-en` : undefined
  const selfUrl = `${SITE_URL}/dev-blog/${post.slug}`
  entries.push({
    loc: selfUrl,
    lastmod: post.date || undefined,
    alternates: alternateLinks(jaUrl, enUrl),
  })
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...entries.map((e) =>
    [
      '  <url>',
      `    <loc>${xmlEscape(e.loc)}</loc>`,
      ...(e.lastmod ? [`    <lastmod>${e.lastmod}</lastmod>`] : []),
      ...e.alternates.map(
        (a) =>
          `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${xmlEscape(a.href)}" />`,
      ),
      '  </url>',
    ].join('\n'),
  ),
  '</urlset>',
  '',
].join('\n')

writeFileSync(OUT_PATH, xml)
console.log(`✅ sitemap.xml generated: ${entries.length} URLs -> ${OUT_PATH}`)
