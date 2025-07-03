import { supabase } from '../lib/supabase'
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

export const Blog = async () => {
  // 1から23までの画像番号の配列をシャッフル
  const imageNumbers = Array.from({length: 23}, (_, i) => i + 1)
  const shuffledImageNumbers = shuffleArray(imageNumbers)

  // 並列でデータ取得してパフォーマンスを向上
  const [summariesResult, articlesResult] = await Promise.all([
    supabase
      .from('daily_summaries')
      .select('*')
      .order('target_date', { ascending: false })
      .limit(130),
    supabase
      .from('articles')
      .select('*')
      .or('status.eq.published,status.eq.public')
      .order('published_at', { ascending: false })
  ])

  const { data: summaries, error } = summariesResult
  const { data: articles, error: articleError } = articlesResult

  if (error || articleError) {
    return (
      <div className="text-center py-8 text-red-500">
        エラーが発生しました
      </div>
    )
  }

  return (
    <>
      <div className="pt-12 pb-12">
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
        articles={articles || []} 
        shuffledImageNumbers={shuffledImageNumbers}
      />
    </>
  )
}
