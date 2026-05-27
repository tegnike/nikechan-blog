import type { Post } from '../utils/posts'
import type { TocItem } from '../utils/mdToHtml'
import type { Locale } from '../i18n/config'

type PostDetailProps = {
  post: Post
  html: string
  toc: TocItem[]
  prevPost?: { slug: string; title: string }
  nextPost?: { slug: string; title: string }
  locale?: Locale
}

export const PostDetail = ({ post, html, toc, prevPost, nextPost, locale = 'ja' }: PostDetailProps) => {
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC',
    }).format(new Date(`${dateString}T00:00:00Z`))
  }

  // frontmatter + content as full markdown
  const fullMarkdown = `---
title: ${JSON.stringify(post.title)}
date: ${JSON.stringify(post.date)}
tags: ${JSON.stringify(post.tags)}
description: ${JSON.stringify(post.description)}
---

${post.content}`

  const ShareButtons = ({ className }: { className?: string }) => (
    <div className={`flex items-center gap-1 ${className || ''}`}>
      <button
        data-share-x
        data-title={post.title}
        className="post-tool-button"
        title="Xでシェア"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
      <button
        data-share-copy-url
        className="post-tool-button"
        title="URLをコピー"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>
      <button
        data-copy-markdown
        data-markdown={fullMarkdown}
        className="post-tool-button"
        title="Markdownをコピー"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>
  )

  return (
    <div className="character-page post-redesign min-h-screen">
      <section className="site-page-hero post-redesign-hero">
        <div className="character-detail-hero__grid" aria-hidden="true" />
        <div className="site-page-hero__inner">
          <h1>ARTICLE</h1>
          <p>{post.title}</p>
        </div>
      </section>
      <div className="character-showcase-bg">
        <div className="post-redesign-container mx-auto py-8 md:py-14">
        {/* Article Header */}
        <div className="post-header-panel mb-8 relative">
          {/* PC: 右上に配置 */}
          <ShareButtons className="absolute top-0 right-0 hidden md:flex" />
          <h1 className="post-title md:pr-32">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4 font-bold">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="post-tag"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {/* SP: タグの下に配置 */}
          <ShareButtons className="flex md:hidden mt-3" />
        </div>

        {/* TOC */}
        {toc.length > 0 && (
          <div className="post-toc-panel mb-8">
            <h2 className="text-base font-bold text-zinc-800 mb-2">{locale === 'en' ? 'Table of Contents' : '目次'}</h2>
            <nav>
              <ul className="space-y-1">
                {toc.map((item) => (
                  <li
                    key={item.id}
                    className={`post-toc-item post-toc-item--level-${item.level}`}
                  >
                    <a
                      href={`#${item.id}`}
                      className="text-purple-600 hover:text-purple-800 hover:underline text-sm font-bold"
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
        <article
          className="post-body-panel prose prose-zinc max-w-none prose-headings:scroll-mt-20 prose-a:text-purple-600 prose-pre:bg-zinc-900 prose-pre:text-zinc-100 mb-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Navigation */}
        <div className="post-nav-grid mb-8">
          {prevPost ? (
            <a
              href={`/dev-blog/${prevPost.slug}${locale !== 'ja' ? `?lang=${locale}` : ''}`}
              className="post-nav-link group"
            >
              <div className="text-xs text-zinc-500 mb-1">← {locale === 'en' ? 'Previous' : '前の記事'}</div>
              <div className="text-sm font-medium text-zinc-700 group-hover:text-purple-600 line-clamp-1">
                {prevPost.title}
              </div>
            </a>
          ) : (
            <div className="flex-1" />
          )}
          {nextPost ? (
            <a
              href={`/dev-blog/${nextPost.slug}${locale !== 'ja' ? `?lang=${locale}` : ''}`}
              className="post-nav-link text-right group"
            >
              <div className="text-xs text-zinc-500 mb-1">{locale === 'en' ? 'Next' : '次の記事'} →</div>
              <div className="text-sm font-medium text-zinc-700 group-hover:text-purple-600 line-clamp-1">
                {nextPost.title}
              </div>
            </a>
          ) : (
            <div className="flex-1" />
          )}
        </div>

        {/* Back to list */}
        <div className="text-center">
          <a
            href={`/dev-blog${locale !== 'ja' ? `?lang=${locale}` : ''}`}
            className="design-action-button"
          >
            {locale === 'en' ? 'Back to Articles' : '記事一覧に戻る'}
          </a>
        </div>
        </div>
      </div>
    </div>
  )
}
