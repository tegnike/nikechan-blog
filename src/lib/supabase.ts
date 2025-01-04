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
}
