export type Post = {
  slug: string
  title: string
  date: string
  tags: string[]
  description: string
  content: string
}

// ビルド時にMarkdownファイルをバンドルに含める
const modules = import.meta.glob('/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function parseFrontmatter(raw: string): { metadata: Record<string, string | string[]>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    return { metadata: {}, content: raw }
  }

  const frontmatter = match[1]
  const content = match[2]
  const metadata: Record<string, string | string[]> = {}

  for (const line of frontmatter.split('\n')) {
    const kvMatch = line.match(/^(\w+):\s*(.+)$/)
    if (!kvMatch) continue
    const [, key, value] = kvMatch
    // YAML配列をパース: ["tag1", "tag2"]
    const arrayMatch = value.match(/^\[(.+)\]$/)
    if (arrayMatch) {
      metadata[key] = arrayMatch[1]
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
    } else {
      metadata[key] = value.replace(/^["']|["']$/g, '')
    }
  }

  return { metadata, content }
}

function parsePost(filePath: string, raw: string): Post {
  const slug = filePath.replace(/^\/content\/posts\//, '').replace(/\.md$/, '')
  const { metadata, content } = parseFrontmatter(raw)

  return {
    slug,
    title: (metadata.title as string) || slug,
    date: (metadata.date as string) || '',
    tags: (metadata.tags as string[]) || [],
    description: (metadata.description as string) || '',
    content,
  }
}

let _posts: Post[] | null = null

export function getAllPosts(): Post[] {
  if (_posts) return _posts
  _posts = Object.entries(modules)
    .map(([path, raw]) => parsePost(path, raw))
    .sort((a, b) => (a.date > b.date ? -1 : 1))
  return _posts
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}
