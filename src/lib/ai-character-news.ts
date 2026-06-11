import { createClient, type SupabaseClient } from '@supabase/supabase-js'

declare const process:
  | {
      env?: Record<string, string | undefined>
    }
  | undefined

export type AiCharacterNewsItem = {
  id: string
  url: string
  canonical_url: string | null
  title: string
  title_en: string | null
  source_name: string | null
  source_domain: string | null
  published_at: string | null
  discovered_at: string
  summary: string
  summary_en: string | null
  nike_comment: string
  nike_comment_en: string | null
  key_points?: string[] | null
  digest_note?: string | null
  category: string
  tags: string[]
  language: string
  created_at: string
  updated_at: string
}

export type AiCharacterNewsDateGroup = {
  date: string
  count: number
  latest_published_at: string | null
}

export type AiCharacterNewsPage = {
  items: AiCharacterNewsItem[]
  hasMore: boolean
  nextOffset: number
}

let serverSupabase: SupabaseClient | null = null

function getEnv(key: string): string | undefined {
  const processValue = typeof process !== 'undefined' ? process.env?.[key] : undefined
  const importValue = (import.meta.env as Record<string, string | undefined>)[key]
  return processValue || importValue
}

function getServerSupabase(): SupabaseClient {
  if (serverSupabase) return serverSupabase

  const url = getEnv('VITE_SUPABASE_URL')
  const key = getEnv('VITE_SUPABASE_ANON_KEY')

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables for AI character news page')
  }

  serverSupabase = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  return serverSupabase
}

export async function getAiCharacterNews(limit = 50, offset = 0): Promise<AiCharacterNewsItem[]> {
  const columns = [
    'id',
    'url',
    'canonical_url',
    'title',
    'title_en',
    'source_name',
    'source_domain',
    'published_at',
    'discovered_at',
    'summary',
    'summary_en',
    'nike_comment',
    'nike_comment_en',
    'key_points',
    'digest_note',
    'category',
    'tags',
    'language',
    'created_at',
    'updated_at',
  ]

  const optionalColumns = ['title_en', 'summary_en', 'nike_comment_en', 'key_points', 'digest_note']
  const baseColumns = columns.filter((column) => !optionalColumns.includes(column))

  const runQuery = (selectColumns: string[]) => getServerSupabase()
    .from('public_ai_character_news')
    .select(selectColumns.join(','))
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  let { data, error } = await runQuery(columns)
  if (error && /title_en|summary_en|nike_comment_en|key_points|digest_note|column/i.test(error.message)) {
    const fallback = await runQuery(baseColumns)
    data = fallback.data
    error = fallback.error
  }

  if (error) {
    throw new Error(`Failed to load AI character news: ${error.message}`)
  }

  return (data || []) as unknown as AiCharacterNewsItem[]
}

export async function getRecentlyAddedAiCharacterNews(limit = 5, hours = 48): Promise<AiCharacterNewsItem[]> {
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()

  const { data, error } = await getServerSupabase()
    .from('public_ai_character_news')
    .select([
      'id',
      'url',
      'canonical_url',
      'title',
      'title_en',
      'source_name',
      'source_domain',
      'published_at',
      'discovered_at',
      'summary',
      'summary_en',
      'nike_comment',
      'nike_comment_en',
      'key_points',
      'digest_note',
      'category',
      'tags',
      'language',
      'created_at',
      'updated_at',
    ].join(','))
    .gte('discovered_at', cutoff)
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('discovered_at', { ascending: false, nullsFirst: false })
    .limit(limit)

  if (error) {
    throw new Error(`Failed to load recently added AI character news: ${error.message}`)
  }

  return (data || []) as unknown as AiCharacterNewsItem[]
}

export async function getAiCharacterNewsPage(
  limit = 50,
  offset = 0,
  excludeIds: string[] = [],
): Promise<AiCharacterNewsPage> {
  const excluded = new Set(excludeIds)
  const items: AiCharacterNewsItem[] = []
  let cursor = offset
  let hasMore = false
  const batchSize = Math.max(limit + excluded.size + 1, 20)

  while (items.length < limit) {
    const batch = await getAiCharacterNews(batchSize, cursor)
    if (batch.length === 0) {
      hasMore = false
      break
    }

    let consumed = 0
    for (const item of batch) {
      consumed += 1
      if (!excluded.has(item.id)) {
        items.push(item)
      }
      if (items.length >= limit) break
    }
    cursor += consumed

    if (batch.length < batchSize) {
      hasMore = false
      break
    }

    if (items.length >= limit) {
      hasMore = consumed < batch.length || batch.length === batchSize
      break
    }
  }

  if (items.length === limit && !hasMore) {
    const probe = await getAiCharacterNews(1, cursor)
    if (probe.length > 0) {
      hasMore = true
    }
  }

  return {
    items,
    hasMore,
    nextOffset: cursor,
  }
}

function formatNewsDateKey(value: string | null): string | null {
  if (!value) return null
  const datePart = value.match(/^(\d{4}-\d{2}-\d{2})/)?.[1]
  if (datePart) return datePart
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString().slice(0, 10)
}

function newsDateRange(date: string): { start: string; end: string } {
  const start = new Date(`${date}T00:00:00Z`)
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000)
  return { start: start.toISOString(), end: end.toISOString() }
}

export async function getAiCharacterNewsDateGroups(limit = 90): Promise<AiCharacterNewsDateGroup[]> {
  const items = await getAiCharacterNews(limit, 0)
  const groups = new Map<string, AiCharacterNewsDateGroup>()

  for (const item of items) {
    const date = formatNewsDateKey(item.published_at)
    if (!date) continue
    const existing = groups.get(date)
    if (existing) {
      existing.count += 1
      if (
        item.published_at
        && (!existing.latest_published_at || item.published_at > existing.latest_published_at)
      ) {
        existing.latest_published_at = item.published_at
      }
      continue
    }
    groups.set(date, {
      date,
      count: 1,
      latest_published_at: item.published_at,
    })
  }

  return [...groups.values()].sort((a, b) => b.date.localeCompare(a.date))
}

export async function getAiCharacterNewsForDate(date: string, limit = 80): Promise<AiCharacterNewsItem[]> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return []
  const { start, end } = newsDateRange(date)
  const columns = [
    'id',
    'url',
    'canonical_url',
    'title',
    'title_en',
    'source_name',
    'source_domain',
    'published_at',
    'discovered_at',
    'summary',
    'summary_en',
    'nike_comment',
    'nike_comment_en',
    'key_points',
    'digest_note',
    'category',
    'tags',
    'language',
    'created_at',
    'updated_at',
  ]

  const optionalColumns = ['title_en', 'summary_en', 'nike_comment_en', 'key_points', 'digest_note']
  const baseColumns = columns.filter((column) => !optionalColumns.includes(column))

  const runQuery = (selectColumns: string[]) => getServerSupabase()
    .from('public_ai_character_news')
    .select(selectColumns.join(','))
    .gte('published_at', start)
    .lt('published_at', end)
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(limit)

  let { data, error } = await runQuery(columns)
  if (error && /title_en|summary_en|nike_comment_en|key_points|digest_note|column/i.test(error.message)) {
    const fallback = await runQuery(baseColumns)
    data = fallback.data
    error = fallback.error
  }

  if (error) {
    throw new Error(`Failed to load AI character news for ${date}: ${error.message}`)
  }

  return (data || []) as unknown as AiCharacterNewsItem[]
}
