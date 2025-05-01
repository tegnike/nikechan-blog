import { createClient } from '@supabase/supabase-js'

// Supabaseクライアントをシングルトンとして作成
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

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

export type NoteArticle = {
  id: string
  title: string
  published_at: string
  thumbnail_url: string
  like_count: number
  created_at: string
  status: string
  note_key: string
}
