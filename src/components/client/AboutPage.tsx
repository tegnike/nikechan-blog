import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">About Nike Chan Blog</h1>
          
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">このブログについて</h2>
            <p className="text-gray-300 mb-4">
              Nike Chan Blogは、AIチャットボットの利用状況やメトリクスを日々記録し、可視化するためのブログです。
              毎日のチャットセッション数、メッセージ数、リピートユーザー数などの統計情報を収集し、
              グラフやダッシュボードを通じて分かりやすく表示しています。
            </p>
            <p className="text-gray-300 mb-4">
              このブログの目的は、AIチャットボットの利用パターンを分析し、
              ユーザーエンゲージメントの傾向や変化を把握することです。
              日々のデータを蓄積することで、長期的な利用傾向の分析や、
              特定のイベントや変更がユーザー行動に与える影響を評価することができます。
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">収集しているデータ</h2>
            <ul className="list-disc text-gray-300 ml-6 space-y-2">
              <li>日別チャットセッション数：1日あたりの総チャットセッション数</li>
              <li>日別メッセージ数：1日あたりの総メッセージ数</li>
              <li>リピートユーザー数：同じ日に複数回チャットを行ったユーザー数</li>
              <li>セッションあたりのメッセージ数：1セッションあたりの平均メッセージ数</li>
              <li>時間帯別アクティビティ：時間帯ごとのチャットアクティビティの分布</li>
              <li>その他の追加メトリクス：特定の機能の使用状況など</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">技術スタック</h2>
            <p className="text-gray-300 mb-4">
              このブログは以下の技術スタックを使用して構築されています：
            </p>
            <ul className="list-disc text-gray-300 ml-6 space-y-2">
              <li>フロントエンド：React, TypeScript, TailwindCSS</li>
              <li>バックエンド：Hono (Cloudflare Workers向けのWebフレームワーク)</li>
              <li>データベース：Supabase (PostgreSQL)</li>
              <li>デプロイ：Cloudflare Pages</li>
              <li>データ可視化：Chart.js, react-chartjs-2</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">プライバシーポリシー</h2>
            <p className="text-gray-300 mb-4">
              このブログで表示されているデータは、個人を特定できない形で集計された統計情報のみです。
              ユーザーの個人情報や会話の内容は収集・表示していません。
              データの収集と分析は、AIチャットボットのサービス改善のみを目的としています。
            </p>
            <p className="text-gray-300">
              ご質問やフィードバックがある場合は、お気軽にお問い合わせください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
