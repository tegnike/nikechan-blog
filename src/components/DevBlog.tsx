import { supabase } from '../lib/supabase'
import { TechBlog } from './TechBlog'

// 画像番号の配列をシャッフルする関数
const shuffleArray = (array: number[]) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const DevBlog = async () => {
  // 1から23までの画像番号の配列をシャッフル
  const imageNumbers = Array.from({ length: 23 }, (_, i) => i + 1)
  const shuffledImageNumbers = shuffleArray(imageNumbers)

  // 技術記事を取得
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .or('status.eq.published,status.eq.public')
    .order('published_at', { ascending: false })

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">エラーが発生しました</div>
    )
  }

  return (
    <>
      <div className="pt-12 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground">DEV BLOG</h1>
      </div>
      <TechBlog articles={articles || []} shuffledImageNumbers={shuffledImageNumbers} />
    </>
  )
}
