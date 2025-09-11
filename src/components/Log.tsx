import { supabase } from '../lib/supabase'
import { NikeLog } from './NikeLog'

// 画像番号の配列をシャッフルする関数
const shuffleArray = (array: number[]) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const Log = async () => {
  // 1から23までの画像番号の配列をシャッフル
  const imageNumbers = Array.from({ length: 23 }, (_, i) => i + 1)
  const shuffledImageNumbers = shuffleArray(imageNumbers)

  // 活動記録（日別サマリ）を取得
  const { data: summaries, error } = await supabase
    .from('daily_summaries')
    .select('*')
    .order('target_date', { ascending: false })
    .limit(130)

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">エラーが発生しました</div>
    )
  }

  return (
    <>
      <div className="pt-12 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white">LOG</h1>
      </div>
      <NikeLog summaries={summaries || []} shuffledImageNumbers={shuffledImageNumbers} />
    </>
  )
}

