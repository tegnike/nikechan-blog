import { supabase } from '../lib/supabase'

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
}

export const BlogDetailV3 = ({ data }: Props) => {
  // Chart.jsの初期化用のスクリプトタグを生成
  const initScript = `
    window.addEventListener('DOMContentLoaded', function() {
      initializeCharts(${JSON.stringify(data)});
    });
  `;

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <script dangerouslySetInnerHTML={{ __html: initScript }} />
      {/* サマリーカード */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="card-content pt-6">
            <div className="flex items-center space-x-2">
              <i className="fas fa-users text-blue-500"></i>
              <div>
                <p className="text-sm text-white">総ユーザー数</p>
                <p className="text-2xl font-bold">{data.user_metrics.total_users}</p>
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
                <p className="text-2xl font-bold">{data.user_metrics.repeat_rate}%</p>
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
                <p className="text-2xl font-bold">{data.user_metrics.total_messages}</p>
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

      {/* タブコンテナ */}
      <div className="tabs-container">
        <div className="tabs-list grid grid-cols-4">
          <button className="tab-trigger active" data-tab="users">ユーザー分析</button>
          <button className="tab-trigger" data-tab="conversations">会話分析</button>
          <button className="tab-trigger" data-tab="topics">トピック分析</button>
          <button className="tab-trigger" data-tab="issues">改善項目</button>
        </div>

        {/* ユーザー分析タブ */}
        <div className="tab-content active" id="users-tab">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">ユーザータイプ分布</h3>
              </div>
              <div className="card-content">
                <div className="h-80">
                  <canvas id="userTypeChart"></canvas>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">使用言語分布</h3>
              </div>
              <div className="card-content">
                <div className="h-80">
                  <canvas id="languageChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 会話分析タブ */}
        <div className="tab-content" id="conversations-tab">
          <div className="space-y-4">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">会話ターン数の分布</h3>
              </div>
              <div className="card-content">
                <div className="h-80">
                  <canvas id="turnDistributionChart"></canvas>
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
                    <canvas id="timeDistributionSessionChart"></canvas>
                  </div>
                  <div className="h-64">
                    <canvas id="timeDistributionTurnChart"></canvas>
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
        <div className="tab-content" id="topics-tab">
          <div className="space-y-4">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">トピック別会話数</h3>
              </div>
              <div className="card-content">
                <div className="h-80">
                  <canvas id="topicChart"></canvas>
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
        <div className="tab-content" id="issues-tab">
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

  return (
    <>
      <div>
        <h3 className="font-bold text-blue-600 mb-1">技術・開発</h3>
        <div className="space-y-1">
          {details.technical?.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span>{item.topic}</span>
              <span className="text-white">{item.count}回</span>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-bold text-green-600 mb-1">教育・学習</h3>
        <div className="space-y-1">
          {details.education?.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span>{item.topic}</span>
              <span className="text-white">{item.count}回</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-purple-600 mb-1">趣味・エンターテイメント</h3>
        <div className="space-y-1">
          {details.hobby?.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span>{item.topic}</span>
              <span className="text-white">{item.count}回</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-yellow-600 mb-1">仕事・ビジネス</h3>
        <div className="space-y-1">
          {details.business?.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span>{item.topic}</span>
              <span className="text-white">{item.count}回</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-pink-600 mb-1">生活・健康</h3>
        <div className="space-y-1">
          {details.lifestyle?.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span>{item.topic}</span>
              <span className="text-white">{item.count}回</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-red-600 mb-1">システム関連</h3>
        <div className="space-y-1">
          {details.system?.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span>{item.topic}</span>
              <span className="text-white">{item.count}回</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-600 mb-1">その他</h3>
        <div className="space-y-1">
          {details.other?.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span>{item.topic}</span>
              <span className="text-white">{item.count}回</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
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