import { mkdir, readdir, readFile, stat } from 'node:fs/promises'
import { dirname, extname, join } from 'node:path'
import sharp from 'sharp'

const ROOT = join(import.meta.dir, '..')
const POSTS_DIR = join(ROOT, 'content/posts')
const PUBLIC_DIR = join(ROOT, 'public')
const SOURCE_PREFIX = '/static/images/posts/'
const OPTIMIZED_PREFIX = '/static/images/optimized/posts/'
const WIDTHS = [420, 840] as const

const readFrontmatter = (markdown: string): string | undefined => {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  return match?.[1]
}

const readThumbnail = (frontmatter: string): string | undefined => {
  const match = frontmatter.match(/^thumbnail:\s*["']([^"']+)["']\s*$/m)
  return match?.[1]
}

const isDraft = (frontmatter: string): boolean => /^draft:\s*true\s*$/m.test(frontmatter)

const needsUpdate = async (sourcePath: string, outputPath: string): Promise<boolean> => {
  try {
    const [sourceInfo, outputInfo] = await Promise.all([stat(sourcePath), stat(outputPath)])
    return sourceInfo.mtimeMs > outputInfo.mtimeMs
  } catch {
    return true
  }
}

const toPublicPath = (urlPath: string): string => join(PUBLIC_DIR, urlPath.replace(/^\//, ''))

const main = async () => {
  const files = (await readdir(POSTS_DIR)).filter((file) => file.endsWith('.md')).sort()
  const thumbnails = new Set<string>()

  for (const file of files) {
    const markdown = await readFile(join(POSTS_DIR, file), 'utf8')
    const frontmatter = readFrontmatter(markdown)
    if (!frontmatter || isDraft(frontmatter)) continue

    const thumbnail = readThumbnail(frontmatter)
    if (thumbnail?.startsWith(SOURCE_PREFIX)) thumbnails.add(thumbnail)
  }

  let generated = 0

  for (const thumbnail of thumbnails) {
    const sourcePath = toPublicPath(thumbnail)
    const sourceExtension = extname(thumbnail)
    const optimizedBase = thumbnail
      .replace(SOURCE_PREFIX, OPTIMIZED_PREFIX)
      .slice(0, -sourceExtension.length)

    try {
      await stat(sourcePath)
    } catch {
      throw new Error(`Published post thumbnail is missing: ${thumbnail}`)
    }

    for (const width of WIDTHS) {
      const outputPath = toPublicPath(`${optimizedBase}-${width}.webp`)
      if (!(await needsUpdate(sourcePath, outputPath))) continue

      await mkdir(dirname(outputPath), { recursive: true })
      await sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(outputPath)
      generated += 1
    }
  }

  console.log(`✅ Post thumbnails: ${generated} generated, ${thumbnails.size} sources checked`)
}

await main()
