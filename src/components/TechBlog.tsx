'use client'

import { type NoteArticle } from '../lib/supabase'

type TechBlogProps = {
  noteArticles: NoteArticle[]
  shuffledImageNumbers: number[]
}

export const TechBlog = ({ noteArticles, shuffledImageNumbers }: TechBlogProps) => {
  const articlesPerPage = 15
  const totalPages = Math.ceil(noteArticles.length / articlesPerPage)

  // note記事の日付フォーマット関数
  const formatNoteDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  // ページネーションコントロールの静的HTMLを生成
  const renderPaginationControls = () => {
    if (totalPages <= 1) return null
    
    const pages = []
    // 常に最大5ページ分のボタンを表示 (アクティブ状態はclient.tsxで制御)
    const startPage = 1 // 開始は常に1ページ目
    const endPage = Math.min(totalPages, 5) // 最大5ページまで表示
    
    // 先頭ページへのボタン (初期は非表示、client.tsxで制御)
    pages.push(
      <button
        key="first"
        data-page-action="first"
        className="pagination-button px-3 py-1 mx-1 bg-gray-700 hover:bg-gray-600 rounded-md hidden"
        aria-label="最初のページ"
      >
        &laquo;
      </button>
    )
    // 前へボタン (初期は非表示、client.tsxで制御)
    pages.push(
      <button
        key="prev"
        data-page-action="prev"
        className="pagination-button px-3 py-1 mx-1 bg-gray-700 hover:bg-gray-600 rounded-md hidden"
        aria-label="前のページ"
      >
        &lsaquo;
      </button>
    )
    
    // ページ番号ボタン (初期は1ページ目をアクティブにする)
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          data-page={i}
          className={`pagination-button page-number px-3 py-1 mx-1 rounded-md ${
            i === 1 ? 'active bg-gray-500 text-white font-bold' : 'bg-gray-700 hover:bg-gray-600'
          } ${i > 5 ? 'hidden' : ''}` // 初期は5ページまで表示
        }
        >
          {i}
        </button>
      )
    }
    
    // 次へボタン (総ページ数が1より大きい場合のみ表示)
    pages.push(
      <button
        key="next"
        data-page-action="next"
        className={`pagination-button px-3 py-1 mx-1 bg-gray-700 hover:bg-gray-600 rounded-md ${totalPages <= 1 ? 'hidden' : ''}`}
        aria-label="次のページ"
      >
        &rsaquo;
      </button>
    )
    // 最終ページへのボタン (総ページ数が1より大きい場合のみ表示)
    pages.push(
      <button
        key="last"
        data-page-action="last"
        className={`pagination-button px-3 py-1 mx-1 bg-gray-700 hover:bg-gray-600 rounded-md ${totalPages <= 1 ? 'hidden' : ''}`}
        aria-label="最後のページ"
      >
        &raquo;
      </button>
    )
    
    return (
      <div 
        className="pagination-controls flex justify-center mt-8 mb-4"
        data-total-pages={totalPages}
        data-current-page="1"
      >
        {pages}
      </div>
    )
  }

  return (
    <div id="category-techblog" className="category-content hidden" data-content="techblog">
      <div className="container mx-auto px-4 py-8">
        {noteArticles.length > 0 ? (
          <>
            <div className="article-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {noteArticles.map((article, index) => {
                const pageNumber = Math.floor(index / articlesPerPage) + 1
                return (
                  <a 
                    key={article.id} 
                    href={`https://note.com/nike_cha_n/n/${article.note_key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`article-item block bg-gray-800 p-6 rounded-lg shadow-md 
                      hover:shadow-lg transition-all duration-300 ease-in-out 
                      hover:transform hover:-translate-y-1 hover:scale-[1.02]
                      ${pageNumber === 1 ? '' : 'hidden'}` // 初期は1ページ目のみ表示
                    }
                    data-page-item={pageNumber}
                  >
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img
                        src={article.thumbnail_url || `/images/thumbnails/${shuffledImageNumbers[index % shuffledImageNumbers.length]}.png`}
                        alt={article.title}
                        className="object-cover w-full h-full rounded-lg"
                        loading="lazy"
                        decoding="async"
                        fetchpriority={index < 6 ? "high" : "low"} // 最初の数件だけ優先読み込み
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `/images/thumbnails/${shuffledImageNumbers[index % shuffledImageNumbers.length]}.png`
                        }}
                      />
                    </div>
                    <div className="text-gray-400 text-sm mb-2">
                      {formatNoteDate(article.published_at)}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 truncate-2-lines">
                      {article.title}
                    </h3>
                    <div className="flex items-center text-[#EB4667]">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                      </svg>
                      <span>{article.like_count}</span>
                    </div>
                  </a>
                )
              })}
            </div>
            {renderPaginationControls()}
            <div 
              className="pagination-info text-center text-gray-400 text-sm mt-4"
              data-total-articles={noteArticles.length}
              data-articles-per-page={articlesPerPage}
            >
              {`全${noteArticles.length}件中 1〜${Math.min(articlesPerPage, noteArticles.length)}件を表示`}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-400">
            記事がありません
          </div>
        )}
      </div>
    </div>
  )
} 