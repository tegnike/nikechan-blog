import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blogData, setBlogData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('daily_summaries')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setBlogData(data);
      } catch (err) {
        console.error('Error fetching blog detail:', err);
        setError('ブログ詳細の取得中にエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-8 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
        <p className="mt-4">データを読み込み中...</p>
      </div>
    );
  }

  if (error || !blogData) {
    return (
      <div className="text-center py-8 text-red-500">
        {error || 'ブログデータが見つかりませんでした'}
      </div>
    );
  }

  // 日付をフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  // 前の日付と次の日付へのリンク用の日付を取得
  const getYearMonth = (date: string) => {
    return date.substring(0, 7); // YYYY-MM形式で取得
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

        {/* ブログ詳細 */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* ヘッダー */}
          <div className="bg-gray-700 p-6">
            <h1 className="text-3xl font-bold text-white">
              {formatDate(blogData.target_date)}の記録
            </h1>
            <p className="text-gray-300 mt-2">
              投稿日: {formatDate(blogData.created_at)}
            </p>
          </div>

          {/* メトリクス */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">セッション数</h3>
                <p className="text-3xl font-bold text-blue-400">{blogData.public_chat_session_count || 0}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">メッセージ数</h3>
                <p className="text-3xl font-bold text-red-400">{blogData.public_message_count || 0}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">リピートユーザー</h3>
                <p className="text-3xl font-bold text-yellow-400">{blogData.repeat_count || 0}</p>
              </div>
            </div>

            {/* 追加のメトリクス */}
            {blogData.additional_metrics && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">追加メトリクス</h3>
                <pre className="bg-gray-900 p-4 rounded-lg text-gray-300 overflow-x-auto">
                  {JSON.stringify(blogData.additional_metrics, null, 2)}
                </pre>
              </div>
            )}

            {/* 月間サマリへのリンク */}
            <div className="mt-8">
              <Link
                to={`/blog/summary/${getYearMonth(blogData.target_date)}`}
                className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg text-white font-semibold shadow-lg ring-1 ring-gray-600"
              >
                <svg className="w-5 h-5 mr-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {getYearMonth(blogData.target_date).replace('-', '/')}の月間サマリを見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
