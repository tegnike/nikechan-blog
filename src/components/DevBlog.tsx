import { supabase } from '../lib/supabase'
import { TechBlog } from './TechBlog'
import { PageHeader } from './PageHeader'
import { getAllPosts } from '../utils/posts'

// 画像番号の配列をシャッフルする関数
const shuffleArray = (array: number[]) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const DevBlog = async () => {
  // 1から23までの画像番号の配列をシャッフル
  const imageNumbers = Array.from({ length: 23 }, (_, i) => i + 1)
  const shuffledImageNumbers = shuffleArray(imageNumbers)

  // 技術記事を取得
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .or('status.eq.published,status.eq.public')
    .order('published_at', { ascending: false })

  // 自前記事を取得
  const posts = getAllPosts()

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">エラーが発生しました</div>
    )
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
                    href={`/dev_blog/${post.slug}`}
                    className="block rounded-xl border bg-white/60 p-4 ring-1 ring-black/5 shadow-sm
                      hover:shadow-md transition-all duration-300 ease-in-out transform
                      hover:-translate-y-1 hover:scale-[1.02]"
                  >
                    <div className="text-zinc-500 text-sm mb-2">
                      {new Date(post.date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </div>
                    <h3 className="text-foreground font-semibold text-lg mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    {post.description && (
                      <p className="text-zinc-500 text-sm mb-3 line-clamp-2">
                        {post.description}
                      </p>
                    )}
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
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* 外部記事セクション */}
          {(articles || []).length > 0 && (
            <div className="container mx-auto px-4">
              <h2 className="text-xl font-bold text-zinc-800 mb-4">External Articles</h2>
            </div>
          )}
          <TechBlog articles={articles || []} shuffledImageNumbers={shuffledImageNumbers} />
        </div>
      </div>

      {/* Decorative Footer Gradient */}
      <div className="character-footer h-16 relative overflow-hidden">
        <div className="character-footer-gradient absolute inset-0" />
      </div>
    </div>
  )
}
