import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Chart.js コンポーネントを登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 日付表示用の関数
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ja-JP', {
    month: '2-digit',
    day: '2-digit'
  }).replace('/', '/');
};

// 月表示用の関数
const formatMonthYear = (yearMonth: string) => {
  const [year, month] = yearMonth.split('-');
  return `${year}年${month}月`;
};

export const MonthlySummaryPage: React.FC = () => {
  const { yearMonth } = useParams<{ yearMonth: string }>();
  const [summaries, setSummaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [monthlyStats, setMonthlyStats] = useState({
    totalSessions: 0,
    totalMessages: 0,
    totalRepeats: 0,
    avgSessionsPerDay: 0,
    avgMessagesPerDay: 0,
    avgMessagesPerSession: 0,
    repeatRate: 0
  });

  useEffect(() => {
    const fetchMonthlySummary = async () => {
      if (!yearMonth) return;

      try {
        // 指定された年月のデータを取得
        const startDate = `${yearMonth}-01`;
        const endDate = new Date(new Date(startDate).getFullYear(), parseInt(yearMonth.split('-')[1]), 0).toISOString().split('T')[0];

        const { data, error } = await supabase
          .from('daily_summaries')
          .select('*')
          .gte('target_date', startDate)
          .lte('target_date', endDate)
          .order('target_date', { ascending: true });

        if (error) throw error;
        
        setSummaries(data || []);
        
        // 月間統計を計算
        if (data && data.length > 0) {
          const totalSessions = data.reduce((sum, item) => sum + (item.public_chat_session_count || 0), 0);
          const totalMessages = data.reduce((sum, item) => sum + (item.public_message_count || 0), 0);
          const totalRepeats = data.reduce((sum, item) => sum + (item.repeat_count || 0), 0);
          
          setMonthlyStats({
            totalSessions,
            totalMessages,
            totalRepeats,
            avgSessionsPerDay: totalSessions / data.length,
            avgMessagesPerDay: totalMessages / data.length,
            avgMessagesPerSession: totalSessions > 0 ? totalMessages / totalSessions : 0,
            repeatRate: totalSessions > 0 ? (totalRepeats / totalSessions) * 100 : 0
          });
        }
      } catch (err) {
        console.error('Error fetching monthly summary:', err);
        setError('月間サマリの取得中にエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlySummary();
  }, [yearMonth]);

  if (loading) {
    return (
      <div className="text-center py-8 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
        <p className="mt-4">データを読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  // チャートデータ
  const dailySessionsData = {
    labels: summaries.map(item => formatDate(item.target_date)),
    datasets: [
      {
        label: 'セッション数',
        data: summaries.map(item => item.public_chat_session_count || 0),
        backgroundColor: '#4ECDC4',
        borderColor: '#4ECDC4',
        borderWidth: 1
      }
    ]
  };

  const dailyMessagesData = {
    labels: summaries.map(item => formatDate(item.target_date)),
    datasets: [
      {
        label: 'メッセージ数',
        data: summaries.map(item => item.public_message_count || 0),
        backgroundColor: '#FF6B6B',
        borderColor: '#FF6B6B',
        borderWidth: 1
      }
    ]
  };

  const dailyRepeatsData = {
    labels: summaries.map(item => formatDate(item.target_date)),
    datasets: [
      {
        label: 'リピートユーザー数',
        data: summaries.map(item => item.repeat_count || 0),
        backgroundColor: '#FFD93D',
        borderColor: '#FFD93D',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      }
    }
  };

  const trendData = {
    labels: summaries.map(item => formatDate(item.target_date)),
    datasets: [
      {
        label: 'セッション数',
        data: summaries.map(item => item.public_chat_session_count || 0),
        borderColor: '#4ECDC4',
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'リピートユーザー数',
        data: summaries.map(item => item.repeat_count || 0),
        borderColor: '#FFD93D',
        backgroundColor: 'rgba(255, 217, 61, 0.1)',
        tension: 0.4,
        fill: true,
        borderDash: [5, 5]
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      }
    }
  };

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* ナビゲーションリンク */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-400 hover:text-blue-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            ブログ一覧に戻る
          </Link>
        </div>

        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white">
            {yearMonth && formatMonthYear(yearMonth)}の月間サマリ
          </h1>
        </div>

        {/* 月間統計サマリー */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">月間統計</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">総セッション数</h3>
              <p className="text-3xl font-bold text-blue-400">{monthlyStats.totalSessions.toLocaleString()}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">総メッセージ数</h3>
              <p className="text-3xl font-bold text-red-400">{monthlyStats.totalMessages.toLocaleString()}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">総リピートユーザー</h3>
              <p className="text-3xl font-bold text-yellow-400">{monthlyStats.totalRepeats.toLocaleString()}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">リピート率</h3>
              <p className="text-3xl font-bold text-green-400">{monthlyStats.repeatRate.toFixed(1)}%</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">1日平均セッション数</h3>
              <p className="text-3xl font-bold text-blue-400">{monthlyStats.avgSessionsPerDay.toFixed(1)}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">1日平均メッセージ数</h3>
              <p className="text-3xl font-bold text-red-400">{monthlyStats.avgMessagesPerDay.toFixed(1)}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">セッション平均メッセージ数</h3>
              <p className="text-3xl font-bold text-purple-400">{monthlyStats.avgMessagesPerSession.toFixed(1)}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">データ日数</h3>
              <p className="text-3xl font-bold text-gray-300">{summaries.length}日</p>
            </div>
          </div>
        </div>

        {/* トレンドグラフ */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">月間トレンド</h2>
          <div className="h-80">
            <Line data={trendData} options={lineOptions} />
          </div>
        </div>

        {/* 日別グラフ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">日別セッション数</h2>
            <div className="h-60">
              <Bar data={dailySessionsData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">日別メッセージ数</h2>
            <div className="h-60">
              <Bar data={dailyMessagesData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">日別リピートユーザー</h2>
            <div className="h-60">
              <Bar data={dailyRepeatsData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* 日別データテーブル */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">日別データ</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-3 text-left">日付</th>
                  <th className="p-3 text-right">セッション数</th>
                  <th className="p-3 text-right">メッセージ数</th>
                  <th className="p-3 text-right">リピートユーザー</th>
                  <th className="p-3 text-right">リピート率</th>
                  <th className="p-3 text-right">詳細</th>
                </tr>
              </thead>
              <tbody>
                {summaries.map((item, index) => {
                  const repeatRate = item.public_chat_session_count > 0 
                    ? ((item.repeat_count / item.public_chat_session_count) * 100).toFixed(1) 
                    : '0.0';
                  
                  return (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
                      <td className="p-3">{formatDate(item.target_date)}</td>
                      <td className="p-3 text-right">{item.public_chat_session_count || 0}</td>
                      <td className="p-3 text-right">{item.public_message_count || 0}</td>
                      <td className="p-3 text-right">{item.repeat_count || 0}</td>
                      <td className="p-3 text-right">{repeatRate}%</td>
                      <td className="p-3 text-right">
                        <Link 
                          to={`/blog/${item.id}`}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          詳細
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
