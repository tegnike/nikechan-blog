import { supabase, type Summary, type NoteArticle } from '../lib/supabase'
import { NikeLog } from './NikeLog'
import { TechBlog } from './TechBlog'

// 画像番号の配列をシャッフルする関数
const shuffleArray = (array: number[]) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// 日付をYYYY-MMの形式に変換する関数
const getYearMonth = (date: string) => {
  return date.substring(0, 7) // YYYY-MM形式で取得
}

// 月表示用の関数
const formatMonthYear = (yearMonth: string) => {
  const [year, month] = yearMonth.split('-')
  return `${year}/${month}`
}

// 日付表示用の関数
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ja-JP', {
    month: '2-digit',
    day: '2-digit'
  }).replace('/', '/')
}

// 指定された年月が現在の年月より過去かどうかをチェックする関数
const isPastMonth = (yearMonth: string) => {
  const today = new Date()
  const targetDate = new Date(yearMonth + '-01')
  
  // 年と月を比較
  if (today.getFullYear() < targetDate.getFullYear()) return false
  if (today.getFullYear() > targetDate.getFullYear()) return true
  return today.getMonth() > targetDate.getMonth()
}

// 日付単位の集計を行う関数
const calculateDailyMetrics = (summaries: any[]) => {
  // 日付でソート
  const sortedSummaries = [...summaries].sort((a, b) => 
    new Date(a.target_date).getTime() - new Date(b.target_date).getTime()
  )

  return sortedSummaries.map(summary => ({
    date: summary.target_date,
    sessions: summary.public_chat_session_count || 0,
    messages: summary.public_message_count || 0,
    repeats: summary.repeat_count || 0
  }))
}

// 画面サイズに応じてデータをフィルタリングする関数
const filterDataByScreenSize = (metrics: any[]) => {
  const now = new Date()
  return {
    sm: metrics.filter(m => {
      const date = new Date(m.date)
      const monthDiff = (now.getFullYear() - date.getFullYear()) * 12 + now.getMonth() - date.getMonth()
      return monthDiff <= 1
    }),
    md: metrics.filter(m => {
      const date = new Date(m.date)
      const monthDiff = (now.getFullYear() - date.getFullYear()) * 12 + now.getMonth() - date.getMonth()
      return monthDiff <= 3
    }),
    lg: metrics.filter(m => {
      const date = new Date(m.date)
      const monthDiff = (now.getFullYear() - date.getFullYear()) * 12 + now.getMonth() - date.getMonth()
      return monthDiff <= 4
    })
  }
}

export const Blog = async () => {
  // 1から23までの画像番号の配列をシャッフル
  const imageNumbers = Array.from({length: 23}, (_, i) => i + 1)
  const shuffledImageNumbers = shuffleArray(imageNumbers)

  // NIKELOG データ取得
  const { data: summaries, error } = await supabase
    .from('daily_summaries')
    .select('id, created_at, target_date, public_chat_session_count, public_message_count, repeat_count')
    .order('target_date', { ascending: false })

  // TECH BLOG データ取得
  const { data: noteArticles, error: noteError } = await supabase
    .from('note_articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        エラーが発生しました
      </div>
    )
  }

  return (
    <>
      <div className="pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white">
          BLOG
        </h1>

        {/* カテゴリタブ - About.tsxスタイルに合わせて更新 */}
        <div className="flex justify-center gap-4 mt-8">
          {[
            { key: 'nikelog', label: 'NIKELOG' },
            { key: 'techblog', label: 'TECH BLOG' }
          ].map(({ key, label }) => (
            <button
              key={key}
              data-category={key}
              className={`category-tab px-6 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors ${
                key === 'nikelog' ? 'active bg-white/20' : ''
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* NIKELOG コンテンツ */}
      <NikeLog 
        summaries={summaries || []} 
        shuffledImageNumbers={shuffledImageNumbers} 
      />

      {/* TECH BLOG コンテンツ */}
      <TechBlog 
        noteArticles={noteArticles || []} 
        shuffledImageNumbers={shuffledImageNumbers}
      />
    </>
  )
}
