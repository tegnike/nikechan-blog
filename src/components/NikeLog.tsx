import { supabase, type Summary } from '../lib/supabase'

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

// 金額のフォーマット関数
const formatCurrency = (amount: number | null) => {
  if (amount === null || amount === undefined) return 'N/A'; // undefinedもチェック
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY'
  }).format(amount);
};

// 日付単位の集計を行う関数
const calculateDailyMetrics = (summaries: Summary[]) => {
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

type NikeLogProps = {
  summaries: Summary[]
  shuffledImageNumbers: number[]
}

export const NikeLog = ({ summaries, shuffledImageNumbers }: NikeLogProps) => {
  // サーバーサイドでの計算を最適化
  const totalSessions = summaries.reduce((sum, s) => sum + (s.public_chat_session_count || 0), 0);
  const totalMessages = summaries.reduce((sum, s) => sum + (s.public_message_count || 0), 0);
  const totalIncome = summaries.reduce((sum, s) => sum + (s.income || 0), 0);
  const totalExpenditure = summaries.reduce((sum, s) => sum + (s.expenditure || 0), 0);

  // 記事を月ごとにグループ化
  const groupedSummaries = summaries.reduce((acc, summary) => {
    const yearMonth = getYearMonth(summary.target_date as string)
    if (!acc[yearMonth]) {
      acc[yearMonth] = []
    }
    acc[yearMonth].push(summary)
    return acc
  }, {} as { [key: string]: typeof summaries })

  // 月の配列を作成（降順）
  const months = Object.keys(groupedSummaries).sort((a, b) => {
    const [ay, am] = a.split('-').map(Number)
    const [by, bm] = b.split('-').map(Number)
    return by !== ay ? by - ay : bm - am
  })

  // 日付単位のメトリクスを計算
  const dailyMetrics = calculateDailyMetrics(summaries)

  return (
    <div id="category-nikelog" className="category-content block" data-content="nikelog">
      <div className="container mx-auto px-4">
        <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg">
          <div className="max-w-3xl mx-auto">
            <p className="text-base md:text-lg lg:text-l text-white leading-relaxed">
              NIKELOGでは、AITuberKitのデモサイトの利用状況を記録しています。
            </p>
            <a
              href="https://aituberkit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors font-semibold duration-300"
            >
              デモサイトはこちら
            </a>
          </div>
        </div>
      </div>

      {/* 全期間の合計統計 */}
      <div className="container mx-auto px-4 mt-8 mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">全期間利用統計</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">総セッション数</h3>
            <p className="text-4xl font-bold text-white">
              {totalSessions.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">総メッセージ数</h3>
            <p className="text-4xl font-bold text-white">
              {totalMessages.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* 日別メトリクスグラフ - コンテナを最大幅に */}
      <div className="w-full bg-[#1a1f2e] p-0">
        <div className="max-w-[2000px] mx-auto">
          <h2 className="text-xl font-bold p-4 text-white">日別利用状況</h2>
          <div className="h-[450px] px-2 pb-4">
            <canvas id="dailyMetricsChart" data-metrics={JSON.stringify(dailyMetrics)}></canvas>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* 月別タブ */}
        <div className="mb-8 mt-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max p-2" data-month-tabs>
            {months.map((yearMonth, monthIndex) => (
              <button
                key={yearMonth}
                data-tab={yearMonth}
                className={`month-tab px-4 py-2 rounded-lg hover:bg-gray-600 text-white transition-colors ${
                  monthIndex === 0 
                    ? 'bg-gray-600 ring-2 ring-white font-bold' 
                    : 'bg-gray-700'
                }`}
              >
                {formatMonthYear(yearMonth)}
              </button>
            ))}
          </div>
        </div>

        {/* 月ごとのセクション */}
        {months.map((yearMonth, monthIndex) => (
          <div 
            key={yearMonth} 
            id={yearMonth} 
            className={`month-content mb-12 ${monthIndex === 0 ? 'block' : 'hidden'}`}
            data-content={yearMonth}
          >
            {/* 月間サマリへのリンク - 過去の月のみ表示 */}
            {isPastMonth(yearMonth) && (
              <div className="mb-6">
                <a
                  href={`/blog/summary/${yearMonth}`}
                  className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg text-white font-semibold shadow-lg ring-1 ring-gray-600"
                >
                  <svg className="w-5 h-5 mr-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {formatMonthYear(yearMonth)}の月間サマリを見る
                </a>
              </div>
            )}
            <div className="divide-y divide-gray-700">
              {groupedSummaries[yearMonth].map((summary) => (
                <a 
                  key={summary.id} 
                  href={`/blog/${summary.id}`}
                  className="block py-4 px-4 hover:bg-gray-800 transition-colors rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="text-xl font-bold text-white mb-2 md:mb-0 mr-4">
                      {formatDate(summary.target_date as string)}
                    </div>
                    <div className="flex gap-4 text-gray-300">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                        </svg>
                        <span>{summary.public_chat_session_count || 0}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                        </svg>
                        <span>{summary.public_message_count || 0}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}                