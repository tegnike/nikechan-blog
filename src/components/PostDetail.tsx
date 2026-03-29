import type { Post } from '../utils/posts'
import type { TocItem } from '../utils/mdToHtml'
import { PageHeader } from './PageHeader'

type PostDetailProps = {
  post: Post
  html: string
  toc: TocItem[]
  prevPost?: { slug: string; title: string }
  nextPost?: { slug: string; title: string }
}

export const PostDetail = ({ post, html, toc, prevPost, nextPost }: PostDetailProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <div className="character-page min-h-screen">
      <PageHeader title="DEV BLOG" />

      <div className="relative">
        <div className="character-showcase-bg absolute inset-0" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
          {/* Article Header */}
          <div className="glass-panel p-6 md:p-8 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* TOC */}
          {toc.length > 0 && (
            <div className="glass-panel p-6 mb-6">
              <h2 className="text-lg font-bold text-zinc-800 mb-3">目次</h2>
              <nav>
                <ul className="space-y-1">
                  {toc.map((item) => (
                    <li
                      key={item.id}
                      className={item.level === 3 ? 'ml-4' : ''}
                    >
                      <a
                        href={`#${item.id}`}
                        className="text-purple-600 hover:text-purple-800 hover:underline text-sm"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* Article Body */}
          <div className="glass-panel p-6 md:p-8 mb-6">
            <article
              className="prose prose-zinc max-w-none prose-headings:scroll-mt-20 prose-a:text-purple-600 prose-pre:bg-zinc-900 prose-pre:text-zinc-100"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center gap-4">
            {prevPost ? (
              <a
                href={`/dev_blog/${prevPost.slug}`}
                className="glass-panel p-4 flex-1 hover:shadow-md transition-shadow group"
              >
                <div className="text-xs text-zinc-500 mb-1">← 前の記事</div>
                <div className="text-sm font-medium text-zinc-700 group-hover:text-purple-600 line-clamp-1">
                  {prevPost.title}
                </div>
              </a>
            ) : (
              <div className="flex-1" />
            )}
            {nextPost ? (
              <a
                href={`/dev_blog/${nextPost.slug}`}
                className="glass-panel p-4 flex-1 text-right hover:shadow-md transition-shadow group"
              >
                <div className="text-xs text-zinc-500 mb-1">次の記事 →</div>
                <div className="text-sm font-medium text-zinc-700 group-hover:text-purple-600 line-clamp-1">
                  {nextPost.title}
                </div>
              </a>
            ) : (
              <div className="flex-1" />
            )}
          </div>

          {/* Back to list */}
          <div className="text-center mt-8">
            <a
              href="/dev_blog"
              className="inline-block px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              記事一覧に戻る
            </a>
          </div>
        </div>
      </div>

      <div className="character-footer h-16 relative overflow-hidden">
        <div className="character-footer-gradient absolute inset-0" />
      </div>
    </div>
  )
}
