import { supabase } from '../lib/supabase'
import type { Article } from '../lib/supabase'
import { TechBlog } from './TechBlog'
import { getPostsByLocale } from '../utils/posts'
import { type Locale } from '../i18n/config'

// 画像番号の配列をシャッフルする関数
const shuffleArray = (array: number[]) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const DevBlog = async (locale: Locale = 'ja') => {
  // 1から23までの画像番号の配列をシャッフル
  const imageNumbers = Array.from({ length: 23 }, (_, i) => i + 1)
  const shuffledImageNumbers = shuffleArray(imageNumbers)
  const posts = getPostsByLocale(locale)
  let articles: Article[] = []
  const hasSupabaseEnv = Boolean(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
  )

  if (hasSupabaseEnv) {
    try {
      // 技術記事を取得
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .or('status.eq.published,status.eq.public')
        .order('published_at', { ascending: false })

      if (error) {
        console.error('Failed to load external dev blog articles', error)
      } else {
        articles = data || []
      }
    } catch (error) {
      console.error('Failed to load external dev blog articles', error)
    }
  }

  return (
    <div className="character-page blog-redesign min-h-screen">
      <section className="site-page-hero">
        <div className="character-detail-hero__grid" aria-hidden="true" />
        <div className="site-page-hero__inner">
          <h1>DEV BLOG</h1>
          <p>{locale === 'ja' ? 'AIキャラクター開発、AIエージェント、個人開発の記録' : 'Notes on AI characters, AI agents, and independent development'}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative">
        <div className="character-showcase-bg absolute inset-0" />
        <div className="designed-page-main relative z-10">
          {/* 自前記事セクション */}
          {posts.length > 0 && (
            <section className="container mx-auto px-4">
              <h2 className="blog-section-title">Blog Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {posts.map((post) => (
                  <a
                    key={post.slug}
                    href={`/dev-blog/${post.slug}${locale !== 'ja' ? `?lang=${locale}` : ''}`}
                    className="blog-post-card"
                  >
                    {post.thumbnail && (
                      <div className="blog-post-card__image">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="blog-post-card__body">
                      <div className="blog-post-card__date">
                        {new Date(post.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'ja-JP', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </div>
                      <h3 className="blog-post-card__title line-clamp-2">
                        {post.title}
                      </h3>
                      {post.tags.length > 0 && (
                        <div className="blog-post-card__tags">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="blog-post-card__tag"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* 外部記事セクション */}
          {articles.length > 0 && (
            <div className="container mx-auto px-4">
              <h2 className="blog-section-title">External Articles</h2>
            </div>
          )}
          <TechBlog
            articles={articles}
            shuffledImageNumbers={shuffledImageNumbers}
            containerClassName="pt-0 pb-8"
          />
        </div>
      </div>

      {/* Decorative Footer Gradient */}
      <div className="character-footer h-16 relative overflow-hidden">
        <div className="character-footer-gradient absolute inset-0" />
      </div>
    </div>
  )
}
