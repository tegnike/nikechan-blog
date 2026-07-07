/**
 * 活動記録(daily_summaries / monthly_summaries)と外部記事(articles)の
 * データ取得層。ルートハンドラから呼び出し、コンポーネントには
 * 取得済みデータを props で渡す。
 */
import { getSupabase, hasSupabaseEnv, type Article, type Summary } from './supabase'

/** 日別サマリ一覧(降順) */
export async function getDailySummaries(limit = 130): Promise<Summary[]> {
  const { data, error } = await getSupabase()
    .from('daily_summaries')
    .select('*')
    .order('target_date', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data ?? []
}

export type DailySummaryDetail = {
  summary: Summary
  prevId: string | null
  nextId: string | null
}

/** 日別サマリ詳細と前後記事ID */
export async function getDailySummaryDetail(id: string): Promise<DailySummaryDetail | null> {
  const supabase = getSupabase()
  const { data: summary, error } = await supabase
    .from('daily_summaries')
    .select('id, public_message, target_date, created_at, version, public_chat_session_count, public_message_count, repeat_count, podcast, podcast_url')
    .eq('id', id)
    .single()

  if (error || !summary) return null

  const [{ data: prevPost }, { data: nextPost }] = await Promise.all([
    supabase
      .from('daily_summaries')
      .select('id')
      .lt('target_date', summary.target_date)
      .order('target_date', { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from('daily_summaries')
      .select('id')
      .gt('target_date', summary.target_date)
      .order('target_date', { ascending: true })
      .limit(1)
      .single(),
  ])

  return {
    summary: summary as Summary,
    prevId: prevPost?.id ?? null,
    nextId: nextPost?.id ?? null,
  }
}

export type MonthlySummaryRow = Record<string, any>

/** 月次サマリ(YYYY-MM指定) */
export async function getMonthlySummary(yearMonth: string): Promise<MonthlySummaryRow | null> {
  const { data, error } = await getSupabase()
    .from('monthly_summaries')
    .select('*')
    .eq('target_month', `${yearMonth}-01`)
    .single()

  if (error) return null
  return data
}

/** 公開済みの外部技術記事。Supabase未設定環境では空配列を返す */
export async function getPublishedArticles(): Promise<Article[]> {
  if (!hasSupabaseEnv()) return []
  try {
    const { data, error } = await getSupabase()
      .from('articles')
      .select('*')
      .or('status.eq.published,status.eq.public')
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Failed to load external dev blog articles', error)
      return []
    }
    return data ?? []
  } catch (error) {
    console.error('Failed to load external dev blog articles', error)
    return []
  }
}
