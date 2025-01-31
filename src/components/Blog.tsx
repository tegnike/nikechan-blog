import { supabase, type Summary } from '../lib/supabase'

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

export const Blog = async () => {
  // 1から23までの画像番号の配列をシャッフル
  const imageNumbers = Array.from({length: 23}, (_, i) => i + 1)
  const shuffledImageNumbers = shuffleArray(imageNumbers)

  // データ取得
  const { data: summaries, error } = await supabase
    .from('summaries')
    .select('id, created_at, target_date')
    .order('target_date', { ascending: false })

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        エラーが発生しました
      </div>
    )
  }

  // 記事を月ごとにグループ化
  const groupedSummaries = summaries.reduce((acc, summary) => {
    const yearMonth = getYearMonth(summary.target_date)
    if (!acc[yearMonth]) {
      acc[yearMonth] = []
    }
    acc[yearMonth].push(summary)
    return acc
  }, {} as { [key: string]: typeof summaries })

  // 月の配列を作成（降順）
  const months = Object.keys(groupedSummaries).sort((a, b) => b.localeCompare(a))

  return (
    <>
      <div className="pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white">
          NIKELOG
        </h1>
      </div>
      <div className="container mx-auto px-4">
        {/* 月別タブ */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max p-2">
            {months.map((yearMonth) => (
              <a
                key={yearMonth}
                href={`#${yearMonth}`}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
              >
                {formatMonthYear(yearMonth)}
              </a>
            ))}
          </div>
        </div>

        {/* 月ごとのセクション */}
        {months.map((yearMonth, monthIndex) => (
          <div key={yearMonth} id={yearMonth} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">
              {formatMonthYear(yearMonth)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedSummaries[yearMonth].map((summary, index) => (
                <a 
                  key={summary.id} 
                  href={`/blog/${summary.id}`}
                  className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md 
                    hover:shadow-lg transition-all duration-300 ease-in-out 
                    hover:transform hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <img
                      src={`/images/thumbnails/${shuffledImageNumbers[(monthIndex * 10 + index) % shuffledImageNumbers.length]}.png`}
                      alt="ブログサムネイル"
                      className="object-cover w-full h-full rounded-lg"
                    />
                    <div className="absolute top-0 left-0 w-1/2 h-1/2 flex items-center justify-center">
                      <p className="text-4xl sm:text-5xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-gray-800 dark:text-white [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
                        {new Date(summary.target_date).toLocaleDateString('ja-JP', {
                          month: '2-digit',
                          day: '2-digit'
                        }).replace('/', '/')}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
