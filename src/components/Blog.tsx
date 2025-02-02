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

export const Blog = async () => {
  // 1から23までの画像番号の配列をシャッフル
  const imageNumbers = Array.from({length: 23}, (_, i) => i + 1)
  const shuffledImageNumbers = shuffleArray(imageNumbers)

  // データ取得
  const { data: summaries, error } = await supabase
    .from('daily_summaries')
    .select('id, created_at, target_date, public_chat_session_count, public_message_count, repeat_count')
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

  // 日付単位のメトリクスを計算
  const dailyMetrics = calculateDailyMetrics(summaries)

  // Chart.jsの初期化用のスクリプトタグを生成
  const initScript = `
    window.addEventListener('DOMContentLoaded', function() {
      const ctx = document.getElementById('dailyMetricsChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ${JSON.stringify(dailyMetrics.map(m => formatDate(m.date)))},
          datasets: [
            {
              label: 'セッション数',
              data: ${JSON.stringify(dailyMetrics.map(m => m.sessions))},
              borderColor: '#4ECDC4',
              tension: 0.1,
              yAxisID: 'y1',
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 4
            },
            {
              label: 'メッセージ数',
              data: ${JSON.stringify(dailyMetrics.map(m => m.messages))},
              borderColor: '#FF6B6B',
              tension: 0.1,
              yAxisID: 'y2',
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 4
            },
            {
              label: 'リピートユーザー数',
              data: ${JSON.stringify(dailyMetrics.map(m => m.repeats))},
              borderColor: '#FFD93D',
              tension: 0.1,
              yAxisID: 'y1',
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 4,
              borderDash: [5, 5]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            legend: {
              position: 'top',
              align: 'start',
              labels: {
                boxWidth: 15,
                padding: 15
              }
            },
            tooltip: {
              callbacks: {
                afterBody: function(context) {
                  const index = context[0].dataIndex;
                  const sessions = dailyMetrics[index].sessions;
                  const repeats = dailyMetrics[index].repeats;
                  const repeatRate = sessions > 0 ? ((repeats / sessions) * 100).toFixed(1) : '0.0';
                  return \`リピート率: \${repeatRate}%\`;
                }
              }
            }
          },
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10
            }
          },
          scales: {
            x: {
              grid: {
                display: true,
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                maxRotation: 45,
                minRotation: 45,
                padding: 5,
                color: 'rgba(255, 255, 255, 0.8)',
                font: {
                  size: 11
                }
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'セッション数・リピート数',
                color: '#4ECDC4',
                font: {
                  size: 12
                }
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: 'rgba(255, 255, 255, 0.8)',
                padding: 8,
                font: {
                  size: 11
                }
              }
            },
            y2: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'メッセージ数',
                color: '#FF6B6B',
                font: {
                  size: 12
                }
              },
              grid: {
                display: false
              },
              ticks: {
                color: 'rgba(255, 255, 255, 0.8)',
                padding: 8,
                font: {
                  size: 11
                }
              }
            }
          }
        }
      });
    });
  `;

  return (
    <>
      <div className="pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white">
          NIKELOG
        </h1>
      </div>
      {/* 日別メトリクスグラフ - コンテナを最大幅に */}
      <div className="w-full bg-[#1a1f2e] p-0">
        <div className="max-w-[2000px] mx-auto">
          <h2 className="text-xl font-bold p-4 text-white">日別利用状況</h2>
          <div className="h-[450px] px-2 pb-4">
            <canvas id="dailyMetricsChart"></canvas>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* 月別タブ */}
        <div className="mb-8 mt-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max p-2">
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
                        {formatDate(summary.target_date)}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <script dangerouslySetInnerHTML={{ __html: initScript }} />
    </>
  )
}
