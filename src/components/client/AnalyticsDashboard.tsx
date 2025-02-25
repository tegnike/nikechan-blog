import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Chart.js コンポーネントを登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// グローバル設定
ChartJS.defaults.color = '#ffffff';
ChartJS.defaults.borderColor = '#666666';

// チャート用のカラーパレット
const chartColors = [
  '#FF6B6B', // 赤系
  '#FFEEAD', // 黄系
  '#4ECDC4', // ターコイズ
  '#9B89B3', // 紫系
  '#E9B872', // オレンジ系
  '#45B7D1', // 青系
  '#D4A5A5', // ピンク系
  '#96CEB4', // 緑系
  '#84B1ED', // 水色系
  '#B3E5BE'  // 薄緑系
];

// 言語の固定カラー
const fixedLanguages = {
  '日本語': '#FF6B6B',  // 赤系
  '英語': '#4ECDC4',    // ターコイズ
  '中国語': '#FFEEAD',  // 黄系
  '韓国語': '#9B89B3'   // 紫系
};

// その他の言語用のカラーパレット
const otherColors = [
  '#E9B872', // オレンジ系
  '#45B7D1', // 青系
  '#D4A5A5', // ピンク系
  '#96CEB4', // 緑系
  '#84B1ED', // 水色系
  '#B3E5BE'  // 薄緑系
];

// データ型定義
interface ChartData {
  user_metrics: {
    user_types: {
      new_user: number;
      repeat_user: number;
    };
    languages: {
      languages: Record<string, number>;
    };
  };
  conversation_metrics: {
    turn_distribution: Record<string, number>;
    time_distribution: Record<string, {
      count: number;
      avg_turns: number;
    }>;
  };
  topic_metrics: Record<string, Array<{
    name: string;
    count: number;
  }>>;
}

interface TabProps {
  id: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ id, label, active, onClick }) => {
  return (
    <button
      className={`tab-trigger px-4 py-2 border-b-2 ${active ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400'}`}
      data-tab={id}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

interface TabContentProps {
  id: string;
  active: boolean;
  children: React.ReactNode;
}

const TabContent: React.FC<TabContentProps> = ({ id, active, children }) => {
  return (
    <div id={`${id}-tab`} className={`tab-content ${active ? 'block' : 'hidden'}`}>
      {children}
    </div>
  );
};

interface MonthTabProps {
  month: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

const MonthTab: React.FC<MonthTabProps> = ({ month, label, active, onClick }) => {
  return (
    <button
      data-tab={month}
      className={`month-tab px-4 py-2 rounded-lg hover:bg-gray-600 text-white transition-colors ${
        active ? 'bg-gray-600 ring-2 ring-white font-bold' : 'bg-gray-700'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

interface MonthContentProps {
  month: string;
  active: boolean;
  children: React.ReactNode;
}

const MonthContent: React.FC<MonthContentProps> = ({ month, active, children }) => {
  return (
    <div 
      id={month} 
      className={`month-content mb-12 ${active ? 'block' : 'hidden'}`}
      data-content={month}
    >
      {children}
    </div>
  );
};

export const AnalyticsDashboard: React.FC<{ data: ChartData }> = ({ data }) => {
  const [activeTab, setActiveTab] = useState('users');
  const [activeMonth, setActiveMonth] = useState('');
  const [months, setMonths] = useState<string[]>([]);

  useEffect(() => {
    // 月のデータを取得する処理（実際のデータに合わせて調整）
    setMonths(['2025-02', '2025-01', '2024-12']);
    setActiveMonth('2025-02');
  }, []);

  // ユーザータイプ分布の円グラフデータ
  const userTypeData = {
    labels: ['新規', 'リピート'],
    datasets: [{
      data: [
        data.user_metrics.user_types.new_user,
        data.user_metrics.user_types.repeat_user
      ],
      backgroundColor: chartColors.slice(0, 2)
    }]
  };

  // 言語分布の円グラフデータ
  const languageData = (() => {
    // 言語データを整理
    let languages = Object.entries(data.user_metrics.languages.languages);
    
    // 固定言語を優先的に並び替え
    languages = languages.sort((a, b) => {
      const aIndex = Object.keys(fixedLanguages).indexOf(a[0]);
      const bIndex = Object.keys(fixedLanguages).indexOf(b[0]);
      
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
    
    // 色の割り当て
    let otherColorIndex = 0;
    const colors = languages.map(([name]) => {
      if (name in fixedLanguages) {
        return fixedLanguages[name as keyof typeof fixedLanguages];
      }
      const color = otherColors[otherColorIndex % otherColors.length];
      otherColorIndex++;
      return color;
    });

    return {
      labels: languages.map(([name]) => name),
      datasets: [{
        data: languages.map(([, value]) => value),
        backgroundColor: colors
      }]
    };
  })();

  // 会話ターン数分布の棒グラフデータ
  const turnDistributionData = {
    labels: [
      '1-3回',
      '4-7回',
      '8-10回',
      '11-15回',
      '15回以上'
    ],
    datasets: [{
      label: 'セッション数',
      data: [
        data.conversation_metrics.turn_distribution['1-3_turns'],
        data.conversation_metrics.turn_distribution['4-7_turns'],
        data.conversation_metrics.turn_distribution['8-10_turns'],
        data.conversation_metrics.turn_distribution['11-15_turns'],
        data.conversation_metrics.turn_distribution['over_15_turns']
      ],
      backgroundColor: '#8884d8'
    }]
  };

  // 時間帯別会話傾向のデータ
  const timeLabels = ['0-3時', '4-7時', '8-11時', '12-15時', '16-19時', '20-23時'];
  const timeKeys = ['morning', 'afternoon', 'evening', 'night', 'late_night', 'midnight'];
  
  const timeDistributionSessionData = {
    labels: timeLabels,
    datasets: [{
      label: 'セッション数',
      data: timeKeys.map(key => data.conversation_metrics.time_distribution[key]?.count || 0),
      backgroundColor: '#8884d8'
    }]
  };

  const timeDistributionTurnData = {
    labels: timeLabels,
    datasets: [{
      label: '平均ターン数',
      data: timeKeys.map(key => data.conversation_metrics.time_distribution[key]?.avg_turns || 0),
      backgroundColor: '#82ca9d'
    }]
  };

  // トピック別セッション数の棒グラフデータ
  const topicData = (() => {
    const topicCategories: Record<string, string> = {
      'technical': '技術・開発',
      'education': '教育・学習',
      'hobby': '趣味・エンターテイメント',
      'business': '仕事・ビジネス',
      'lifestyle': '生活・健康',
      'system': 'システム関連',
      'other': 'その他'
    };
    
    const topicSummary = Object.entries(data.topic_metrics).map(([category, items]) => ({
      name: topicCategories[category],
      value: items.reduce((sum, item) => sum + item.count, 0)
    }));

    return {
      labels: topicSummary.map(item => item.name),
      datasets: [{
        label: 'トピック数',
        data: topicSummary.map(item => item.value),
        backgroundColor: '#82ca9d'
      }]
    };
  })();

  // チャートオプション
  const pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#fff',
        }
      }
    }
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className="analytics-dashboard">
      {/* 月別タブ */}
      <div className="mb-8 mt-8 overflow-x-auto">
        <div className="flex space-x-2 min-w-max p-2">
          {months.map((month, index) => (
            <MonthTab
              key={month}
              month={month}
              label={month.replace('-', '/')}
              active={month === activeMonth}
              onClick={() => setActiveMonth(month)}
            />
          ))}
        </div>
      </div>

      {/* 月ごとのコンテンツ */}
      {months.map((month) => (
        <MonthContent
          key={month}
          month={month}
          active={month === activeMonth}
        >
          {/* タブナビゲーション */}
          <div className="flex border-b mb-6">
            <Tab
              id="users"
              label="ユーザー分析"
              active={activeTab === 'users'}
              onClick={() => setActiveTab('users')}
            />
            <Tab
              id="conversations"
              label="会話分析"
              active={activeTab === 'conversations'}
              onClick={() => setActiveTab('conversations')}
            />
            <Tab
              id="topics"
              label="トピック分析"
              active={activeTab === 'topics'}
              onClick={() => setActiveTab('topics')}
            />
          </div>

          {/* タブコンテンツ */}
          <TabContent id="users" active={activeTab === 'users'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-white">ユーザータイプ分布</h3>
                <div className="h-80">
                  <Pie data={userTypeData} options={pieOptions} />
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-white">使用言語分布</h3>
                <div className="h-80">
                  <Pie data={languageData} options={pieOptions} />
                </div>
              </div>
            </div>
          </TabContent>

          <TabContent id="conversations" active={activeTab === 'conversations'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-white">会話ターン数分布</h3>
                <div className="h-80">
                  <Bar data={turnDistributionData} options={barOptions} />
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-white">時間帯別セッション数</h3>
                <div className="h-80">
                  <Bar data={timeDistributionSessionData} options={barOptions} />
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-white">時間帯別平均ターン数</h3>
                <div className="h-80">
                  <Bar data={timeDistributionTurnData} options={barOptions} />
                </div>
              </div>
            </div>
          </TabContent>

          <TabContent id="topics" active={activeTab === 'topics'}>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-white">トピック別セッション数</h3>
              <div className="h-80">
                <Bar data={topicData} options={barOptions} />
              </div>
            </div>
          </TabContent>
        </MonthContent>
      ))}
    </div>
  );
};
