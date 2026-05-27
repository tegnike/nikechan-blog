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
  category: string
  tags: string[]
  language: string
  created_at: string
  updated_at: string
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

export async function getAiCharacterNews(limit = 50): Promise<AiCharacterNewsItem[]> {
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
    'category',
    'tags',
    'language',
    'created_at',
    'updated_at',
  ]

  const baseColumns = columns.filter((column) => !['title_en', 'summary_en', 'nike_comment_en'].includes(column))

  const runQuery = (selectColumns: string[]) => getServerSupabase()
    .from('public_ai_character_news')
    .select(selectColumns.join(','))
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(limit)

  let { data, error } = await runQuery(columns)
  if (error && /title_en|summary_en|nike_comment_en|column/i.test(error.message)) {
    const fallback = await runQuery(baseColumns)
    data = fallback.data
    error = fallback.error
  }

  if (error) {
    throw new Error(`Failed to load AI character news: ${error.message}`)
  }

  return (data || []) as AiCharacterNewsItem[]
}
