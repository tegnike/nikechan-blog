import { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
ChartJS.defaults.color = '#ffffff';
ChartJS.defaults.borderColor = '#666666';

type V3Data = {
  user_metrics: {
    total_users: number
    repeat_rate: number
    total_messages: number
    issue_count: number
    user_types: {
      new_user: number
      repeat_user: number
    }
    languages: {
      languages: {
        [key: string]: number
      }
    }
  }
  conversation_metrics: {
    turn_distribution: {
      '1-3_turns': number
      '4-7_turns': number
      '8-10_turns': number
      '11-15_turns': number
      'over_15_turns': number
    }
    time_distribution: {
      morning: { count: number, avg_turns: number }
      afternoon: { count: number, avg_turns: number }
      evening: { count: number, avg_turns: number }
      night: { count: number, avg_turns: number }
      late_night: { count: number, avg_turns: number }
      midnight: { count: number, avg_turns: number }
    }
  }
  topic_metrics: {
    technical: Array<{topic: string, count: number}>
    education: Array<{topic: string, count: number}>
    hobby: Array<{topic: string, count: number}>
    business: Array<{topic: string, count: number}>
    lifestyle: Array<{topic: string, count: number}>
    system: Array<{topic: string, count: number}>
    other: Array<{topic: string, count: number}>
  }
  issues: Array<{
    category: string
    description: string
    solution: string
  }>
}

type Props = {
  data: V3Data
  public_chat_session_count: number
  public_message_count: number
  repeat_count: number
  podcast?: string
  podcast_url?: string
}

export const BlogDetailV3 = ({ data, public_chat_session_count, public_message_count, repeat_count, podcast, podcast_url }: Props) => {
  const [activeTab, setActiveTab] = useState('users');
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);

  // --- Chart Data and Options ---

  // チャート用のカラーパレット
  const chartColors = [
    '#FF6B6B', '#FFEEAD', '#4ECDC4', '#9B89B3', '#E9B872',
    '#45B7D1', '#D4A5A5', '#96CEB4', '#84B1ED', '#B3E5BE'
  ];

  // ユーザータイプ分布データ
  const userTypesData = {
    labels: ['新規', 'リピート'],
    datasets: [{
      data: [public_chat_session_count - repeat_count, repeat_count],
      backgroundColor: chartColors.slice(0, 2)
    }]
  };
  const userTypesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: 'ユーザータイプ分布', color: '#fff', font: { size: 16, weight: 'bold' }, padding: { bottom: 20 } },
      legend: {
        position: 'right' as const,
        labels: {
          color: '#fff',
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              const total = data.datasets[0].data.reduce((sum: number, value: number) => sum + value, 0);
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                const percentage = total === 0 ? 0 : ((value / total) * 100).toFixed(1);
                return { text: `${label}: ${value}人 (${percentage}%)`, fillStyle: chartColors[i], strokeStyle: chartColors[i], lineWidth: 1, hidden: false, index: i, fontColor: '#fff' };
              });
            }
            return [];
          }
        }
      }
    }
  };

  // 言語分布データ
  const fixedLanguages = { '日本語': '#FF6B6B', '英語': '#4ECDC4', '中国語': '#FFEEAD', '韓国語': '#9B89B3' };
  const otherColors = chartColors.filter(color => !Object.values(fixedLanguages).includes(color));
  let languages = Object.entries(data.user_metrics.languages.languages);
  const totalLanguage = languages.reduce((sum, [, value]) => sum + value, 0);
  languages = languages.sort((a, b) => {
    const aIndex = Object.keys(fixedLanguages).indexOf(a[0]);
    const bIndex = Object.keys(fixedLanguages).indexOf(b[0]);
    if (aIndex === -1 && bIndex === -1) return b[1] - a[1]; // その他は件数でソート
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
  let otherColorIndex = 0;
  const languageColors = languages.map(([name]) => {
    if (name in fixedLanguages) return fixedLanguages[name as keyof typeof fixedLanguages];
    const color = otherColors[otherColorIndex % otherColors.length];
    otherColorIndex++;
    return color;
  });
  const languageData = {
    labels: languages.map(([name]) => name),
    datasets: [{ data: languages.map(([, value]) => value), backgroundColor: languageColors }]
  };
  const languageOptions = {
    responsive: true, maintainAspectRatio: false, plugins: {
      title: { display: true, text: '使用言語分布', color: '#fff', font: { size: 16, weight: 'bold' }, padding: { bottom: 20 } },
      legend: {
        position: 'right' as const, labels: { color: '#fff',
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                const percentage = totalLanguage === 0 ? 0 : ((value / totalLanguage) * 100).toFixed(1);
                return { text: `${label}: ${value}件 (${percentage}%)`, fillStyle: languageColors[i], strokeStyle: languageColors[i], lineWidth: 1, hidden: false, index: i, fontColor: '#fff' };
              });
            } return [];
          }
        }
      }
    }
  };

  // 会話ターン数分布データ
  const turnLabelsMap = { '1-3_turns': '1-3回', '4-7_turns': '4-7回', '8-10_turns': '8-10回', '11-15_turns': '11-15回', 'over_15_turns': '15回以上' };
  const turns = Object.entries(data.conversation_metrics.turn_distribution);
  const turnDistributionData = {
    labels: turns.map(([key]) => turnLabelsMap[key as keyof typeof turnLabelsMap]),
    datasets: [{ label: 'セッション数', data: turns.map(([, value]) => value), backgroundColor: '#8884d8' }]
  };
  const turnDistributionOptions = { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1, color: '#fff' }, grid: { color: '#666' } }, x: { ticks: { color: '#fff' }, grid: { color: '#666' } } } };

  // 時間帯別会話傾向データ
  const timeLabelsMap = { 'morning': '0-3時', 'afternoon': '4-7時', 'evening': '8-11時', 'night': '12-15時', 'late_night': '16-19時', 'midnight': '20-23時' };
  const timeOrder = ['morning', 'afternoon', 'evening', 'night', 'late_night', 'midnight'];
  const sortedTimes = timeOrder.map(key => [key, data.conversation_metrics.time_distribution[key as keyof typeof data.conversation_metrics.time_distribution]]);
  const timeDistributionSessionData = {
    labels: sortedTimes.map(([key]) => timeLabelsMap[key as keyof typeof timeLabelsMap]),
    datasets: [{ label: 'セッション数', data: sortedTimes.map(([, d]) => d.count), backgroundColor: '#8884d8' }]
  };
  const timeDistributionTurnData = {
    labels: sortedTimes.map(([key]) => timeLabelsMap[key as keyof typeof timeLabelsMap]),
    datasets: [{ label: '平均ターン数', data: sortedTimes.map(([, d]) => d.avg_turns), backgroundColor: '#82ca9d' }]
  };
  const timeDistributionOptions = { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1, color: '#fff' }, grid: { color: '#666' } }, x: { ticks: { color: '#fff' }, grid: { color: '#666' } } } };

  // トピック別セッション数データ
  const topicCategoriesMap = { 'technical': '技術・開発', 'education': '教育・学習', 'hobby': '趣味・エンターテイメント', 'business': '仕事・ビジネス', 'lifestyle': '生活・健康', 'system': 'システム関連', 'other': 'その他' };
  const topicSummary = Object.entries(data.topic_metrics).map(([category, items]) => ({ name: topicCategoriesMap[category as keyof typeof topicCategoriesMap], value: items.reduce((sum, item) => sum + item.count, 0) }));
  const topicData = {
    labels: topicSummary.map(item => item.name),
    datasets: [{ label: 'トピック数', data: topicSummary.map(item => item.value), backgroundColor: '#82ca9d' }]
  };
  const topicOptions = { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { color: '#fff' }, grid: { color: '#666' } }, x: { ticks: { color: '#fff' }, grid: { color: '#666' } } } };

  // --- Helper Functions ---
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const toggleTranscript = () => {
    setIsTranscriptOpen(!isTranscriptOpen);
  };

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      {/* サマリーカード */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="card-content pt-6">
            <div className="flex items-center space-x-2">
              <i className="fas fa-users text-blue-500"></i>
              <div>
                <p className="text-sm text-white">総ユーザー数</p>
                <p className="text-2xl font-bold">{public_chat_session_count}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content pt-6">
            <div className="flex items-center space-x-2">
              <i className="fas fa-sync text-green-500"></i>
              <div>
                <p className="text-sm text-white">リピート率</p>
                <p className="text-2xl font-bold">{public_chat_session_count > 0 ? ((repeat_count / public_chat_session_count) * 100).toFixed(1) : 0}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content pt-6">
            <div className="flex items-center space-x-2">
              <i className="fas fa-comment text-yellow-500"></i>
              <div>
                <p className="text-sm text-white">総メッセージ数</p>
                <p className="text-2xl font-bold">{public_message_count}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content pt-6">
            <div className="flex items-center space-x-2">
              <i className="fas fa-exclamation-triangle text-red-500"></i>
              <div>
                <p className="text-sm text-white">要改善会話数</p>
                <p className="text-2xl font-bold">{data.issues.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Podcastセクション */}
      {podcast && podcast_url && (
        <div className="mt-8">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title flex items-center space-x-2">
                <i className="fas fa-podcast text-purple-500"></i>
                <span>Today's Podcast</span>
              </h3>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <audio
                    className="w-full"
                    controls
                    src={podcast_url}
                  >
                    お使いのブラウザは音声再生をサポートしていません。
                  </audio>
                </div>
                <div className="bg-gray-900 rounded-lg">
                  <button
                    onClick={toggleTranscript}
                    className="w-full p-4 flex justify-between items-center text-sm font-medium text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <span className="flex items-center space-x-2">
                      <i className="fas fa-file-alt"></i>
                      <span>文字起こし</span>
                    </span>
                    <i id="transcript-icon" className={`fas ${isTranscriptOpen ? 'fa-chevron-up' : 'fa-chevron-down'} transition-transform duration-200`}></i>
                  </button>
                  {isTranscriptOpen && (
                    <div id="transcript-content" className="px-4 pb-4">
                      <div className="prose prose-sm prose-invert max-w-none">
                        <p className="whitespace-pre-wrap text-gray-300">{podcast}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* タブコンテナ */}
      <div className="tabs-container">
        <div className="tabs-list grid grid-cols-4">
          <button className={`tab-trigger ${activeTab === 'users' ? 'active' : ''}`} onClick={() => handleTabClick('users')}>ユーザー分析</button>
          <button className={`tab-trigger ${activeTab === 'conversations' ? 'active' : ''}`} onClick={() => handleTabClick('conversations')}>会話分析</button>
          <button className={`tab-trigger ${activeTab === 'topics' ? 'active' : ''}`} onClick={() => handleTabClick('topics')}>トピック分析</button>
          <button className={`tab-trigger ${activeTab === 'issues' ? 'active' : ''}`} onClick={() => handleTabClick('issues')}>改善項目</button>
        </div>

        {/* ユーザー分析タブ */}
        <div className={`tab-content ${activeTab === 'users' ? 'active' : ''}`} id="users-tab">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">ユーザータイプ分布</h3>
              </div>
              <div className="card-content">
                <div className="h-80">
                  <Pie data={userTypesData} options={userTypesOptions} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">使用言語分布</h3>
              </div>
              <div className="card-content">
                <div className="h-80">
                  <Pie data={languageData} options={languageOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 会話分析タブ */}
        <div className={`tab-content ${activeTab === 'conversations' ? 'active' : ''}`} id="conversations-tab">
          <div className="space-y-4">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">会話ターン数の分布</h3>
              </div>
              <div className="card-content">
                <div className="h-80">
                  <Bar data={turnDistributionData} options={turnDistributionOptions} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">時間帯別の会話傾向</h3>
              </div>
              <div className="card-content">
                <div className="space-y-4">
                  <div className="h-64">
                    <Bar data={timeDistributionSessionData} options={timeDistributionOptions} />
                  </div>
                  <div className="h-64">
                    <Bar data={timeDistributionTurnData} options={timeDistributionOptions} />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-white text-center">
                    ※ 時間はユーザーのローカル時間で表示
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* トピック分析タブ */}
        <div className={`tab-content ${activeTab === 'topics' ? 'active' : ''}`} id="topics-tab">
          <div className="space-y-4">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">トピック別会話数</h3>
              </div>
              <div className="card-content">
                <div className="h-80">
                  <Bar data={topicData} options={topicOptions} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">トピック詳細分類</h3>
              </div>
              <div className="card-content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generateTopicDetails(data.topic_metrics)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 改善項目タブ */}
        <div className={`tab-content ${activeTab === 'issues' ? 'active' : ''}`} id="issues-tab">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">要改善項目</h3>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                {generateIssuesList(data.issues)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function generateTopicDetails(details: V3Data['topic_metrics']) {
  if (!details) return null;
  const categoryLabels: { [key: string]: string } = {
    'technical': '技術・開発',
    'education': '教育・学習',
    'hobby': '趣味・エンターテイメント',
    'business': '仕事・ビジネス',
    'lifestyle': '生活・健康',
    'system': 'システム関連',
    'other': 'その他'
  };
  const categoryColors: { [key: string]: string } = {
    'technical': 'text-blue-400',
    'education': 'text-green-400',
    'hobby': 'text-purple-400',
    'business': 'text-yellow-400',
    'lifestyle': 'text-pink-400',
    'system': 'text-red-400',
    'other': 'text-gray-400'
  };

  return (
    <>
      {Object.entries(details).map(([categoryKey, items]) => (
        items && items.length > 0 && (
          <div key={categoryKey}>
            <h3 className={`font-bold ${categoryColors[categoryKey] || 'text-gray-400'} mb-1`}>
              {categoryLabels[categoryKey] || categoryKey}
            </h3>
            <div className="space-y-1">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm text-gray-300">
                  <span>{item.topic}</span>
                  <span className="text-white font-medium">{item.count}回</span>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </>
  );
}

function generateIssuesList(issues: V3Data['issues']) {
  const categoryLabels: { [key: string]: string } = {
    'feature_limitations': '機能の制限',
    'conversation_quality': '会話の質',
    'usability': '操作性',
    'response_quality': '応答品質',
    'user_experience': 'ユーザー体験',
  };

  // カテゴリーごとにグループ化
  const groupedIssues = issues.reduce((acc, issue) => {
    const category = issue.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(issue);
    return acc;
  }, {} as { [key: string]: typeof issues });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(groupedIssues).map(([category, categoryIssues]) => (
        <div key={category} className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-1 sm:p-4">
            <h3 className="text-xl font-bold mb-4 text-white border-b border-gray-700 pb-2">
              {categoryLabels[category] || category}
            </h3>
            <div className="space-y-4">
              {categoryIssues.map((issue, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-3 sm:p-4 hover:bg-gray-850 transition-colors duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                    </div>
                    <div className="flex-grow">
                      <p className="text-white text-base mb-2">{issue.description}</p>
                      <div className="bg-gray-800 rounded p-3 mt-2">
                        <p className="text-green-400 text-sm font-medium mb-1">改善案:</p>
                        <p className="text-gray-300 text-sm">{issue.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
