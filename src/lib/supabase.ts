import { createClient, type SupabaseClient } from '@supabase/supabase-js'

declare const process:
  | {
      env?: Record<string, string | undefined>
    }
  | undefined

/**
 * 環境変数の解決: ランタイム(process.env = Workers bindings)優先、
 * ビルド時に焼き込まれた import.meta.env をフォールバックにする。
 * これにより Cloudflare ダッシュボードでのキーローテーションが
 * 再ビルドなしで反映される。
 */
function getEnv(key: string): string | undefined {
  const processValue = typeof process !== 'undefined' ? process.env?.[key] : undefined
  const importValue = (import.meta.env as Record<string, string | undefined>)[key]
  return processValue || importValue
}

/** Supabase接続設定が存在するか(未設定環境でのグレースフルデグラデーション用) */
export function hasSupabaseEnv(): boolean {
  return Boolean(getEnv('VITE_SUPABASE_URL') && getEnv('VITE_SUPABASE_ANON_KEY'))
}

// Supabaseクライアントを遅延初期化（Cloudflare Workersのバリデーション時にエラーにならないようにする）
let _supabase: SupabaseClient | null = null

export const getSupabase = (): SupabaseClient => {
  if (!_supabase) {
    const url = getEnv('VITE_SUPABASE_URL')
    const key = getEnv('VITE_SUPABASE_ANON_KEY')
    const missingVars = [
      !url && 'VITE_SUPABASE_URL',
      !key && 'VITE_SUPABASE_ANON_KEY',
    ].filter(Boolean)

    if (missingVars.length > 0) {
      throw new Error(`Missing Supabase environment variables: ${missingVars.join(', ')}`)
    }

    _supabase = createClient(url!, key!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  }
  return _supabase
}

export type Summary = {
  id: string
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
