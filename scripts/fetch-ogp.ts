import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs'

type OgpData = {
  title: string
  description: string
  image: string
  siteName: string
  url: string
  favicon: string
  type?: 'ogp' | 'twitter-embed' | 'youtube-embed'
  embedHtml?: string
}

type OgpCache = Record<string, OgpData>

function isTwitterUrl(url: string): boolean {
  return /^https?:\/\/(x\.com|twitter\.com)\/\w+\/status\/\d+/.test(url)
}

function isYouTubeUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?(youtube\.com\/watch|youtu\.be\/)/.test(url)
}

async function fetchYouTubeEmbed(url: string): Promise<OgpData | null> {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
    const response = await fetchWithTimeout(oembedUrl)
    if (!response.ok) return null

    const data = await response.json() as {
      html: string
      title: string
      author_name: string
      thumbnail_url: string
    }

    return {
      title: data.title,
      description: data.author_name,
      image: data.thumbnail_url,
      siteName: 'YouTube',
      url,
      favicon: 'https://www.youtube.com/favicon.ico',
      type: 'youtube-embed',
      embedHtml: data.html,
    }
  } catch (e) {
    console.error(`Failed to fetch YouTube oEmbed for ${url}:`, e)
    return null
  }
}

async function fetchWithTimeout(input: string, init: RequestInit = {}, timeoutMs = 10000) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}

async function fetchTwitterEmbed(url: string): Promise<OgpData | null> {
  try {
    const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&omit_script=true`
    const response = await fetchWithTimeout(oembedUrl)
    if (!response.ok) return null

    const data = await response.json() as {
      html: string
      author_name: string
      author_url: string
      url: string
    }

    return {
      title: data.author_name,
      description: '',
      image: '',
      siteName: 'X (formerly Twitter)',
      url: data.url || url,
      favicon: 'https://abs.twimg.com/favicons/twitter.3.ico',
      type: 'twitter-embed',
      embedHtml: data.html,
    }
  } catch (e) {
    console.error(`Failed to fetch Twitter oEmbed for ${url}:`, e)
    return null
  }
}

function extractUrls(markdown: string): string[] {
  const urls: string[] = []
  const lines = markdown.split('\n')

  for (const line of lines) {
    const trimmed = line.trim()
    // Markdown link where text === href: [https://...](https://...)
    const linkMatch = trimmed.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch && linkMatch[1] === linkMatch[2] && /^https?:\/\//.test(linkMatch[1])) {
      urls.push(linkMatch[1])
      continue
    }
    // Bare URL line
    if (/^https?:\/\/\S+$/.test(trimmed)) {
      urls.push(trimmed)
    }
  }

  return urls
}

function extractMetaContent(html: string, property: string): string {
  // Try og: property
  const ogRegex = new RegExp(
    `<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["']|<meta[^>]*content=["']([^"']*)["'][^>]*(?:property|name)=["']${property}["']`,
    'i'
  )
  const match = html.match(ogRegex)
  return match ? (match[1] || match[2] || '') : ''
}

function extractTitle(html: string): string {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  return match ? match[1].trim() : ''
}

function extractFavicon(html: string, baseUrl: string): string {
  // Try to find link rel="icon" or rel="shortcut icon"
  const iconMatch = html.match(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']*)["']/i)
    || html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["'](?:shortcut )?icon["']/i)

  if (iconMatch) {
    const href = iconMatch[1]
    return new URL(href, baseUrl).toString()
  }

  // Fallback to /favicon.ico
  const url = new URL(baseUrl)
  return `${url.origin}/favicon.ico`
}

async function fetchOgp(url: string): Promise<OgpData | null> {
  try {
    const response = await fetchWithTimeout(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OGPBot/1.0)',
        'Accept': 'text/html',
      },
      redirect: 'follow',
    })

    if (!response.ok) return null

    const html = await response.text()
    const finalUrl = response.url || url

    const title = extractMetaContent(html, 'og:title') || extractTitle(html)
    const description = extractMetaContent(html, 'og:description') || extractMetaContent(html, 'description')
    const rawImage = extractMetaContent(html, 'og:image')
    const image = rawImage ? new URL(rawImage, finalUrl).toString() : ''
    const siteName = extractMetaContent(html, 'og:site_name')
    const favicon = extractFavicon(html, finalUrl)

    return { title, description, image, siteName, url, favicon }
  } catch (e) {
    console.error(`Failed to fetch OGP for ${url}:`, e)
    return null
  }
}

async function main() {
  const postsDir = 'content/posts'
  const cachePath = 'content/ogp-cache.json'

  // Load existing cache
  let cache: OgpCache = {}
  if (existsSync(cachePath)) {
    cache = JSON.parse(readFileSync(cachePath, 'utf-8'))
  }

  // Collect all URLs from all posts
  const allUrls = new Set<string>()
  const files = readdirSync(postsDir).filter(f => f.endsWith('.md'))

  for (const file of files) {
    const content = readFileSync(`${postsDir}/${file}`, 'utf-8')
    // Remove frontmatter
    const bodyMatch = content.match(/^---[\s\S]*?---\n([\s\S]*)$/)
    const body = bodyMatch ? bodyMatch[1] : content
    const urls = extractUrls(body)
    urls.forEach(u => allUrls.add(u))
  }

  console.log(`Found ${allUrls.size} URLs to fetch OGP for`)

  // Fetch OGP for uncached URLs
  for (const url of allUrls) {
    if (cache[url]) {
      console.log(`  cached: ${url}`)
      continue
    }
    console.log(`  fetching: ${url}`)
    const data = isTwitterUrl(url) ? await fetchTwitterEmbed(url)
      : isYouTubeUrl(url) ? await fetchYouTubeEmbed(url)
      : await fetchOgp(url)
    if (data) {
      cache[url] = data
    }
  }

  // Remove URLs no longer in any post
  for (const url of Object.keys(cache)) {
    if (!allUrls.has(url)) {
      console.log(`  removing stale: ${url}`)
      delete cache[url]
    }
  }

  writeFileSync(cachePath, JSON.stringify(cache, null, 2))
  console.log(`OGP cache saved to ${cachePath}`)
}

main()
