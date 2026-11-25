/**
 * ニケちゃんねるの最新の配信と動画を、YouTube の RSS から取る。
 *
 * チャンネルIDの先頭 "UC" を "UULV"（配信）や "UULF"（ショートを除く通常動画）に
 * 替えた再生リストの RSS を使う。APIキーは要らないが、YouTube の公式な仕様書には
 * 載っていないため、取れなかったときは null を返し、呼び出し側で固定の案内を出す。
 */

const CHANNEL_ID_BODY = 'j94TVhN0op8xZX9r-sTvSA'
const FEED_URL = 'https://www.youtube.com/feeds/videos.xml?playlist_id='
const CACHE_SECONDS = 60 * 60
const FETCH_TIMEOUT_MS = 3000

export type YoutubeVideo = {
  id: string
  title: string
  url: string
  thumbnail: string
  publishedAt: string
}

export type LatestYoutube = {
  stream: YoutubeVideo | null
  video: YoutubeVideo | null
}

const decodeXml = (text: string): string =>
  text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&amp;/g, '&')

const pick = (xml: string, pattern: RegExp): string | null => xml.match(pattern)?.[1] ?? null

/** RSS の先頭の1件を取り出す */
export function parseLatestEntry(xml: string): YoutubeVideo | null {
  const entry = pick(xml, /<entry>([\s\S]*?)<\/entry>/)
  if (!entry) return null
  const id = pick(entry, /<yt:videoId>([^<]+)<\/yt:videoId>/)
  const title = pick(entry, /<title>([^<]*)<\/title>/)
  const publishedAt = pick(entry, /<published>([^<]+)<\/published>/)
  if (!id || !title || !publishedAt) return null
  return {
    id,
    title: decodeXml(title),
    url: `https://www.youtube.com/watch?v=${id}`,
    // RSS のサムネイルは 4:3 の上下に黒帯が入るため、表示側で 16:9 に切り抜く
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    publishedAt,
  }
}

async function fetchLatest(prefix: 'UULV' | 'UULF'): Promise<YoutubeVideo | null> {
  try {
    const res = await fetch(`${FEED_URL}${prefix}${CHANNEL_ID_BODY}`, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      // Cloudflare Workers のエッジで1時間キャッシュする（開発サーバーでは無視される）
      cf: { cacheTtl: CACHE_SECONDS, cacheEverything: true },
    } as RequestInit)
    if (!res.ok) return null
    return parseLatestEntry(await res.text())
  } catch {
    return null
  }
}

let memo: { value: LatestYoutube; expiresAt: number } | null = null

export async function getLatestYoutube(): Promise<LatestYoutube> {
  if (memo && memo.expiresAt > Date.now()) return memo.value
  const [stream, video] = await Promise.all([fetchLatest('UULV'), fetchLatest('UULF')])
  const value = { stream, video }
  // 取れなかったときは長く覚えず、5分後にもう一度取りにいく
  const ttl = stream && video ? CACHE_SECONDS * 1000 : 5 * 60 * 1000
  memo = { value, expiresAt: Date.now() + ttl }
  return value
}
