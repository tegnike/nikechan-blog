import { type Article } from '../lib/supabase'
import { getOptimizedImageSources } from '../utils/imageOptimization'

type TechBlogProps = {
  articles: Article[]
  shuffledImageNumbers: number[]
  containerClassName?: string
  locale?: 'ja' | 'en'
}

// サービスアイコンコンポーネント
const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'note':
      return (
        <svg className="w-5 h-5" viewBox="-0.1 -0.1 21.2 24.4" xmlns="http://www.w3.org/2000/svg" fill="#41C9B4">
          <path fillRule="evenodd" d="m9.206 10.66h-2.855c-.338 0-.45-.018-.623-.07-.467-.138-.831-.605-.831-1.159s.364-1.02.83-1.16c.174-.051.286-.068.624-.068h1.851v-1.853c0-.338.018-.45.07-.623.138-.476.605-.831 1.159-.831.553 0 1.021.363 1.16.831.051.173.069.285.069.623v2.855c0 .173 0 .346-.035.502a1.264 1.264 0 0 1-.917.917c-.156.035-.329.035-.502.035zm9.171 10.486h-15.314v-13.489c0-.173.06-.32.181-.44l3.972-3.973a.601.601 0 0 1 .441-.181h10.72zm-17.633-15.755c-.407.406-.674.917-.727 1.488a4.366 4.366 0 0 0-.017.371v15.254c0 .199.009.302.017.38.07.65.658 1.238 1.307 1.307.078.008.182.017.38.017h18.032c.199 0 .303-.009.38-.017.65-.07 1.238-.658 1.307-1.307.009-.078.017-.181.017-.38v-20.8c0-.2-.008-.303-.017-.381-.07-.649-.658-1.237-1.306-1.306a3.252 3.252 0 0 0-.381-.017h-12.486a4.13 4.13 0 0 0-.372.018c-.572.051-1.082.32-1.489.726z"/>
        </svg>
      )
    case 'zenn':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#3EA8FF">
          <path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.557.323L.03 23.361c-.088.176.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.176 0-.352.088-.44.235l-6.655 10.643c-.176.264.029.616.352.616h4.779c.234-.001.468-.118.586-.353z"/>
        </svg>
      )
    case 'X':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
          <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/>
        </svg>
      )
    default:
      return null
  }
}

export const TechBlog = ({ articles, shuffledImageNumbers, containerClassName = 'py-8', locale = 'ja' }: TechBlogProps) => {
  const articlesPerPage = 15
  const totalPages = Math.ceil(articles.length / articlesPerPage)
  const firstPageEnd = Math.min(articlesPerPage, articles.length)
  const paginationSummary = locale === 'ja'
    ? `全${articles.length}件中 1-${firstPageEnd}件`
    : `Showing 1-${firstPageEnd} of ${articles.length}`

  // 記事の日付フォーマット関数
  const formatNoteDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  // ページネーションコントロールの静的HTMLを生成
  const renderPaginationControls = (position: 'top' | 'bottom') => {
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
        data-pagination-position={position}
        className="pagination-button blog-pagination-button hidden"
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
        data-pagination-position={position}
        className="pagination-button blog-pagination-button hidden"
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
          data-pagination-position={position}
          aria-current={i === 1 ? 'page' : undefined}
          className={`pagination-button blog-pagination-button page-number ${
            i === 1
              ? 'active blog-pagination-button--active'
              : ''
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
        data-pagination-position={position}
        className={`pagination-button blog-pagination-button ${totalPages <= 1 ? 'hidden' : ''}`}
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
        data-pagination-position={position}
        className={`pagination-button blog-pagination-button ${totalPages <= 1 ? 'hidden' : ''}`}
        aria-label="最後のページ"
      >
        &raquo;
      </button>
    )
    
    return (
      <div 
        className="pagination-controls flex flex-wrap justify-center gap-2 mt-8 mb-4"
        data-total-pages={totalPages}
        data-current-page="1"
        data-pagination-position={position}
        aria-label="External article archive pages"
      >
        {pages}
      </div>
    )
  }

  return (
    <div id="category-techblog" className="category-content" data-content="techblog">
      <div className={`container mx-auto px-4 ${containerClassName}`}>
        {articles.length > 0 ? (
          <>
            {renderPaginationControls('top')}
            <div className="article-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => {
                const pageNumber = Math.floor(index / articlesPerPage) + 1
                const url = article.platform === 'note'
                  ? `https://note.com/nike_cha_n/n/${article.identifier}`
                  : article.platform === 'X'
                    ? `https://x.com/tegnike/status/${article.identifier}`
                    : `https://zenn.dev/nikechan/articles/${article.identifier}`
                const fallbackThumbnail = `/images/thumbnails/${shuffledImageNumbers[index % shuffledImageNumbers.length]}.png`
                const thumbnailSrc = article.thumbnail_url || fallbackThumbnail
                const thumbnailSources = getOptimizedImageSources(thumbnailSrc)
                const fallbackThumbnailSources = getOptimizedImageSources(fallbackThumbnail)
                return (
                  <a 
                    key={article.id} 
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`article-item blog-post-card
                      ${pageNumber === 1 ? '' : 'hidden'}` // 初期は1ページ目のみ表示
                    }
                    data-page-item={pageNumber}
                  >
                    <div className="blog-post-card__image">
                      <img
                        src={thumbnailSources?.src ?? thumbnailSrc}
                        srcSet={thumbnailSources?.srcSet}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        alt={article.title}
                        className="object-cover w-full h-full"
                        loading={index < 6 ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={index < 6 ? "high" : "low"}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.onerror = null; // 無限ループ防止
                          target.srcset = fallbackThumbnailSources?.srcSet ?? ''
                          target.src = fallbackThumbnailSources?.src ?? fallbackThumbnail
                        }}
                      />
                    </div>
                    <div className="blog-post-card__body">
                      <div className="blog-post-card__date">
                        {formatNoteDate(article.published_at)}
                      </div>
                      <h3 className="blog-post-card__title line-clamp-2 truncate-2-lines">
                        {article.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-[#EB4667]">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                          </svg>
                          <span>{article.like_count}</span>
                        </div>
                        <PlatformIcon platform={article.platform} />
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
            <div 
              className="pagination-info text-center text-zinc-600 text-sm font-bold mt-4"
              data-total-articles={articles.length}
              data-articles-per-page={articlesPerPage}
            >
              {paginationSummary}
            </div>
            {renderPaginationControls('bottom')}
          </>
        ) : (
          <div className="text-center py-8 text-zinc-500">
            記事がありません
          </div>
        )}
      </div>
    </div>
  )
}
