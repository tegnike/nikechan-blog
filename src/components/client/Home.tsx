import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export const Home: React.FC = () => {
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('daily_summaries')
          .select('*')
          .order('target_date', { ascending: false })
          .limit(3);

        if (error) throw error;
        setRecentBlogs(data || []);
      } catch (err) {
        console.error('Error fetching recent blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBlogs();
  }, []);

  // 日付をフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="pt-24 pb-12">
      {/* ヒーローセクション */}
      <section className="relative h-[70vh] flex items-center justify-center mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-80"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Nike Chan Blog</h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            AIチャットボットの利用状況やメトリクスを日々記録し、可視化するブログです。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/blog" 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              ブログを見る
            </Link>
            <a 
              href="#gallery" 
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              ギャラリーを見る
            </a>
          </div>
        </div>
      </section>

      {/* 最新ブログ */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">最新のブログ</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentBlogs.map((blog) => (
              <div key={blog.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {formatDate(blog.target_date)}の記録
                  </h3>
                  <div className="flex justify-between mb-4 text-gray-300">
                    <span>セッション: {blog.public_chat_session_count || 0}</span>
                    <span>メッセージ: {blog.public_message_count || 0}</span>
                  </div>
                  <Link 
                    to={`/blog/${blog.id}`}
                    className="inline-block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
                  >
                    詳細を見る
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-8">
          <Link 
            to="/blog"
            className="inline-block px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
          >
            すべてのブログを見る
          </Link>
        </div>
      </section>

      {/* ギャラリーセクション */}
      <section id="gallery" className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">ギャラリー</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* ギャラリーアイテム */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div 
              key={item}
              className="gallery-item relative aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
              data-src={`/images/gallery/image${item}.jpg`}
              data-caption={`ギャラリー画像 ${item}`}
            >
              <img 
                src={`/images/gallery/image${item}.jpg`} 
                alt={`ギャラリー画像 ${item}`}
                className="w-full h-full object-cover transition-transform hover:scale-110"
                onError={(e) => {
                  // 画像が見つからない場合のフォールバック
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-lg font-semibold">画像 {item}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* アバウトセクション */}
      <section className="container mx-auto px-4 mb-16">
        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">このブログについて</h2>
          <p className="text-gray-300 mb-6 text-lg">
            Nike Chan Blogは、AIチャットボットの利用状況やメトリクスを日々記録し、可視化するためのブログです。
            毎日のチャットセッション数、メッセージ数、リピートユーザー数などの統計情報を収集し、
            グラフやダッシュボードを通じて分かりやすく表示しています。
          </p>
          <div className="text-center">
            <Link 
              to="/about"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              詳細を見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
