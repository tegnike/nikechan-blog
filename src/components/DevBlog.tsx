import { supabase } from '../lib/supabase'
import type { Article } from '../lib/supabase'
import { TechBlog } from './TechBlog'
import { PageHeader } from './PageHeader'
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
    <div className="character-page min-h-screen">
      <PageHeader title="DEV BLOG" />

      {/* Main Content */}
      <div className="relative">
        <div className="character-showcase-bg absolute inset-0" />
        <div className="relative z-10">
          {/* 自前記事セクション */}
          {posts.length > 0 && (
            <div className="container mx-auto px-4 pt-8">
              <h2 className="text-xl font-bold text-zinc-800 mb-4">Blog Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {posts.map((post) => (
                  <a
                    key={post.slug}
                    href={`/dev_blog/${post.slug}${locale !== 'ja' ? `?lang=${locale}` : ''}`}
                    className="block rounded-xl border bg-white/60 ring-1 ring-black/5 shadow-sm
                      hover:shadow-md transition-all duration-300 ease-in-out transform
                      hover:-translate-y-1 hover:scale-[1.02] overflow-hidden"
                  >
                    {post.thumbnail && (
                      <div className="aspect-[1200/630] overflow-hidden">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="text-zinc-500 text-sm mb-2">
                        {new Date(post.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'ja-JP', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </div>
                      <h3 className="text-foreground font-semibold text-lg mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full"
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
            </div>
          )}

          {/* 外部記事セクション */}
          {articles.length > 0 && (
            <div className="container mx-auto px-4">
              <h2 className="text-xl font-bold text-zinc-800 mb-4">External Articles</h2>
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
