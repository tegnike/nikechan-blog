import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { fanArts } from '../src/utils/fanArtsData'
import { galleryItemsData } from '../src/utils/galleryData'
import { GALLERY_IMAGE_ORIGIN } from '../src/utils/galleryImages'
import { getOptimizedImageSources } from '../src/utils/imageOptimization'

type Entry = { key: string; bytes: number; sha256: string }
const entries: Entry[] = JSON.parse(await readFile(new URL('../content/gallery-image-manifest.json', import.meta.url), 'utf8'))
const knownKeys = new Set(entries.map(entry => entry.key))
for (const item of [...fanArts, ...galleryItemsData]) {
  const optimized = getOptimizedImageSources(item.src)
  if (!optimized) throw new Error(`Missing optimized sources: ${item.src}`)
  for (const url of [item.src, ...optimized.srcSet.split(', ').map(candidate => candidate.split(' ')[0])]) {
    const parsed = new URL(url)
    if (parsed.origin !== GALLERY_IMAGE_ORIGIN || !knownKeys.has(decodeURIComponent(parsed.pathname.slice(1)))) {
      throw new Error(`Unregistered gallery image: ${url}`)
    }
  }
}

let next = 0
let verified = 0
await Promise.all(Array.from({ length: 6 }, async () => {
  while (next < entries.length) {
    const entry = entries[next++]
    const response = await fetch(`${GALLERY_IMAGE_ORIGIN}/${encodeURI(entry.key)}`, { signal: AbortSignal.timeout(30000) })
    if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) {
      throw new Error(`Invalid image response (${response.status}): ${entry.key}`)
    }
    const bytes = Buffer.from(await response.arrayBuffer())
    if (bytes.length !== entry.bytes || createHash('sha256').update(bytes).digest('hex') !== entry.sha256) {
      throw new Error(`Image differs from manifest: ${entry.key}`)
    }
    verified++
  }
}))
console.log(`Verified ${verified} R2 images: HTTP, MIME type, size, SHA-256, and gallery references.`)
