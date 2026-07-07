/**
 * Markdownパーサーのゴールデン出力チェック
 *
 * 全記事 (content/posts/*.md) を mdToHtml でレンダリングし、
 * scripts/md-golden/ 配下のスナップショットと比較する。
 *
 *   bun scripts/md-golden.ts           # 比較(差分があれば exit 1)
 *   bun scripts/md-golden.ts --update  # スナップショットを更新
 *   bun scripts/md-golden.ts --out DIR # 指定ディレクトリへ出力のみ(比較しない)
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'
import { mdToHtml, extractToc } from '../src/utils/mdToHtml'

const ROOT = join(import.meta.dir, '..')
const POSTS_DIR = join(ROOT, 'content/posts')
const GOLDEN_DIR = join(ROOT, 'scripts/md-golden')

function stripFrontmatter(raw: string): string {
  const match = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/)
  return match ? match[1] : raw
}

function loadOgpCache(): Record<string, any> {
  try {
    return JSON.parse(readFileSync(join(ROOT, 'content/ogp-cache.json'), 'utf-8'))
  } catch {
    return {}
  }
}

function render(): Map<string, string> {
  const ogpCache = loadOgpCache()
  const out = new Map<string, string>()
  for (const file of readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md')).sort()) {
    const content = stripFrontmatter(readFileSync(join(POSTS_DIR, file), 'utf-8'))
    const html = mdToHtml(content, ogpCache)
    const toc = extractToc(content)
    out.set(
      basename(file, '.md') + '.html',
      html + '\n<!-- TOC -->\n' + JSON.stringify(toc, null, 2) + '\n',
    )
  }
  return out
}

const args = process.argv.slice(2)
const outFlag = args.indexOf('--out')
const targetDir = outFlag !== -1 ? args[outFlag + 1] : GOLDEN_DIR
const update = args.includes('--update') || outFlag !== -1

const rendered = render()

if (update) {
  mkdirSync(targetDir, { recursive: true })
  for (const [name, html] of rendered) writeFileSync(join(targetDir, name), html)
  console.log(`✅ ${rendered.size} snapshots written to ${targetDir}`)
} else {
  if (!existsSync(GOLDEN_DIR)) {
    console.error(`❌ ${GOLDEN_DIR} がありません。まず --update で生成してください。`)
    process.exit(1)
  }
  let failed = 0
  for (const [name, html] of rendered) {
    const goldenPath = join(GOLDEN_DIR, name)
    if (!existsSync(goldenPath)) {
      console.error(`❌ missing snapshot: ${name}`)
      failed++
      continue
    }
    if (readFileSync(goldenPath, 'utf-8') !== html) {
      console.error(`❌ mismatch: ${name}`)
      failed++
    }
  }
  if (failed) {
    console.error(`\n${failed} 件の差分。意図した変更なら --update で更新してください。`)
    process.exit(1)
  }
  console.log(`✅ ${rendered.size} snapshots match`)
}
