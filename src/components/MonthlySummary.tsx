import { supabase } from '../lib/supabase'

// 月表示用の関数
const formatMonthYear = (yearMonth: string) => {
  const [year, month] = yearMonth.split('-')
  return `${year}年${month}月`
}

// 金額のフォーマット関数
const formatCurrency = (amount: number | null) => {
  if (amount === null) return 'N/A'
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY'
  }).format(amount)
}

export const MonthlySummary = async ({ yearMonth }: { yearMonth: string }) => {
  // データ取得
  const { data: summary, error } = await supabase
    .from('monthly_summaries')
    .select('*')
    .eq('target_month', `${yearMonth}-01`)
    .single()

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
          NIKELOG
        </h1>
      </div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">
          {formatMonthYear(yearMonth)}の利用統計
        </h2>
        
        {/* 基本統計 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">総セッション数</h3>
            <p className="text-4xl font-bold text-white">
              {summary?.public_chat_session_count 
                ? summary.public_chat_session_count.toLocaleString()
                : 'N/A'}
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">総メッセージ数</h3>
            <p className="text-4xl font-bold text-white">
              {summary?.public_message_count
                ? summary.public_message_count.toLocaleString() 
                : 'N/A'}
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">収入</h3>
            <p className="text-4xl font-bold text-white">{formatCurrency(summary?.income)}</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">支出</h3>
            <p className="text-4xl font-bold text-white">{formatCurrency(summary?.expenditure)}</p>
          </div>
        </div>

        {/* 支出内訳 */}
        {summary?.expenditure_breakdown && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">支出内訳</h3>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(summary.expenditure_breakdown).map(([category, amount]) => (
                  <div key={category} className="p-4 bg-gray-700 rounded-lg">
                    <h4 className="text-gray-300 font-medium mb-2">{category}</h4>
                    <p className="text-2xl font-bold text-white">{formatCurrency(amount as number)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <a 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 rounded-full
                     bg-gray-700 text-gray-200 font-medium
                     transform transition duration-200 ease-in-out
                     hover:bg-gray-600 hover:scale-105 hover:shadow-lg
                     dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            一覧に戻る
          </a>
        </div>
      </div>
    </>
  )
} 