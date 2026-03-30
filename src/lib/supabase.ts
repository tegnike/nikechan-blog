import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Supabaseクライアントを遅延初期化（Cloudflare Workersのバリデーション時にエラーにならないようにする）
let _supabase: SupabaseClient | null = null

export const getSupabase = (): SupabaseClient => {
  if (!_supabase) {
    const missingVars = [
      !import.meta.env.VITE_SUPABASE_URL && 'VITE_SUPABASE_URL',
      !import.meta.env.VITE_SUPABASE_ANON_KEY && 'VITE_SUPABASE_ANON_KEY',
    ].filter(Boolean)

    if (missingVars.length > 0) {
      throw new Error(`Missing Supabase environment variables: ${missingVars.join(', ')}`)
    }

    _supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    )
  }
  return _supabase
}

// 後方互換性のためのgetter
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as any)[prop]
  },
})

export type Summary = {
  id: number
  public_message: any
  created_at: string
  public_chat_session_count: number
  public_message_count: number
  repeat_count: number
  target_date: string
  version: number
  podcast: string
  podcast_url: string
  income?: number
  expenditure?: number
}

export type Article = {
  id: string
  title: string
  published_at: string
  thumbnail_url: string
  like_count: number
  created_at: string
  status: string
  identifier: string
  platform: string
}
