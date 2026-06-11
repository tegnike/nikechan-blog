import { Hono } from 'hono'
import { renderer } from './renderer'
import { Layout } from './components/Layout'
import { LandingPage } from './components/LandingPage'
import { Introduction } from './components/Introduction'
import { Model } from './components/Model'
import { Gallery } from './components/Gallery'
import { FanGallery } from './components/FanGallery'
import { Log } from './components/Log'
import { BlogDetail } from './components/BlogDetail'
import { MonthlySummary } from './components/MonthlySummary'
import { Developer } from './components/Developer'
import { License } from './components/License'
import { LegalPage } from './components/LegalPage'
import { DevBlog } from './components/DevBlog'
import { About } from './components/About'
import { Tutorial } from './components/Tutorial'
import { CharacterList } from './components/CharacterList'
import { AINikeProfile } from './components/AINikeProfile'
import { NikeProfile } from './components/NikeProfile'
import { MikazeProfile } from './components/MikazeProfile'
import { PunikeProfile } from './components/PunikeProfile'
import { TodayNormaProfile } from './components/TodayNormaProfile'
import { News } from './components/News'
import { PostDetail } from './components/PostDetail'
import { AiCharacterNews } from './components/AiCharacterNews'
import { AiNewsDailyDetail, AiNewsDailyList } from './components/AiNewsDaily'
import { getPostBySlug, getPostsByLocale, getPostByDraftToken, getOgpCache } from './utils/posts'
import { mdToHtml, extractToc } from './utils/mdToHtml'
import { detectLocale, type Locale } from './i18n/config'
import {
  getAiCharacterNewsDateGroups,
  getAiCharacterNewsForDate,
  getAiCharacterNewsPage,
  getRecentlyAddedAiCharacterNews,
} from './lib/ai-character-news'
import type { AiCharacterNewsDateGroup, AiCharacterNewsItem } from './lib/ai-character-news'

const app = new Hono()
const AI_NEWS_PAGE_SIZE = 10
const AI_NEWS_RECENT_LIMIT = 5
const AI_NEWS_RECENT_HOURS = 48

// Middleware to detect and set locale
app.use('*', async (c, next) => {
  const url = new URL(c.req.url)
  const acceptLanguage = c.req.header('accept-language')
  const locale = detectLocale(url, acceptLanguage)
  c.set('locale', locale)
  c.header('X-Build-Sha', import.meta.env.VITE_BUILD_SHA || 'unknown')
  await next()
})

app.use(renderer)

// Home page - Landing Page
app.get('/', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path; // パスを取得
  const locale = c.get('locale') as Locale

  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <LandingPage locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja' ? "AIニケちゃんオフィシャルサイト" : "AI Nike Chan Official Website",
      description: locale === 'ja' ? "AIニケちゃんのオフィシャルサイト。イラスト作品、ファンアート、活動記録、開発者向け情報を掲載。" : "Official website of AI Nike Chan. Featuring illustrations, fan art, activity logs, and developer information.",
      canonicalUrl: "https://nikechan.com",
      ogType: "website"
    }
  )
})

app.get('/news', (c) => {
  const url = new URL(c.req.url)
  return c.redirect(`/updates${url.search}`, 301)
})

app.get('/ai-character-news', (c) => {
  const url = new URL(c.req.url)
  return c.redirect(`/ai-news${url.search}`, 301)
})

// Updates page
app.get('/updates', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <News locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja'
        ? "Updates | AIニケちゃんオフィシャルサイト"
        : "Updates | AI Nike Chan Official Website",
      description: locale === 'ja'
        ? "AIニケちゃんの最新アップデート情報"
        : "Latest updates about AI Nike Chan",
      canonicalUrl: "https://nikechan.com/updates"
    }
  )
})

// AI news page
app.get('/ai-news', async (c) => {
  c.header('Cache-Control', 'public, max-age=1800')
  const currentPath = c.req.path
  const locale = c.get('locale') as Locale
  let items: AiCharacterNewsItem[] = []
  let recentItems: AiCharacterNewsItem[] = []
  let nextOffset = 0
  let hasMore = false
  let error: string | undefined

  try {
    recentItems = await getRecentlyAddedAiCharacterNews(AI_NEWS_RECENT_LIMIT, AI_NEWS_RECENT_HOURS)
    const page = await getAiCharacterNewsPage(
      AI_NEWS_PAGE_SIZE,
      0,
      recentItems.map((item) => item.id),
    )
    items = page.items
    nextOffset = page.nextOffset
    hasMore = page.hasMore
  } catch (err) {
    console.error('Failed to load AI character news', err)
    error = locale === 'ja'
      ? 'AIキャラクターニュースの取得に失敗しました。Supabase の接続設定を確認してください。'
      : 'Failed to load AI character news. Please check the Supabase connection settings.'
  }

  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <AiCharacterNews
        items={items}
        recentItems={recentItems}
        nextOffset={nextOffset}
        hasMore={hasMore}
        error={error}
        locale={locale}
      />
    </Layout>,
    {
      locale,
      title: locale === 'ja'
        ? 'AI NEWS | AIニケちゃんオフィシャルサイト'
        : 'AI NEWS | AI Nike Chan Official Website',
      description: locale === 'ja'
        ? 'AIニケちゃんが気になったAIキャラクター、AITuber、AI VTuber関連ニュースの短い要約とコメント。'
        : 'Short summaries and AI Nike Chan comments on AI character, AITuber, and AI VTuber news.',
      canonicalUrl: 'https://nikechan.com/ai-news',
      ogType: 'article',
      keywords: locale === 'ja'
        ? 'AIキャラクター, AITuber, AI VTuber, AIアバター, AIニケちゃん, ニュース'
        : 'AI character, AITuber, AI VTuber, AI avatar, AI Nike Chan, news',
    }
  )
})

app.get('/ai-news/daily', async (c) => {
  c.header('Cache-Control', 'public, max-age=1800')
  const currentPath = c.req.path
  const locale = c.get('locale') as Locale
  let dateGroups: AiCharacterNewsDateGroup[] = []
  let error: string | undefined

  try {
    dateGroups = await getAiCharacterNewsDateGroups(120)
  } catch (err) {
    console.error('Failed to load AI NEWS date list', err)
    error = locale === 'ja'
      ? 'AI NEWSの日付一覧の取得に失敗しました。'
      : 'Failed to load AI NEWS date groups.'
  }

  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <AiNewsDailyList dateGroups={dateGroups} error={error} locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja'
        ? 'AI NEWS DAILY | AIニケちゃんオフィシャルサイト'
        : 'AI NEWS DAILY | AI Nike Chan Official Website',
      description: locale === 'ja'
        ? 'AIキャラクター、AITuber、AI VTuber関連ニュースを日付ごとに整理した一覧。'
        : 'AI character, AITuber, and AI VTuber news grouped by date.',
      canonicalUrl: 'https://nikechan.com/ai-news/daily',
      ogType: 'article',
    }
  )
})

app.get('/ai-news/daily/:date', async (c) => {
  c.header('Cache-Control', 'public, max-age=1800')
  const currentPath = c.req.path
  const locale = c.get('locale') as Locale
  const date = c.req.param('date')
  let items: AiCharacterNewsItem[] = []
  let previousDateGroup: AiCharacterNewsDateGroup | null = null
  let nextDateGroup: AiCharacterNewsDateGroup | null = null
  let error: string | undefined

  try {
    const [dailyItems, dateGroups] = await Promise.all([
      getAiCharacterNewsForDate(date),
      getAiCharacterNewsDateGroups(120),
    ])
    items = dailyItems
    if (items.length > 0) {
      const currentIndex = dateGroups.findIndex((item) => item.date === date)
      if (currentIndex >= 0) {
        nextDateGroup = dateGroups[currentIndex - 1] || null
        previousDateGroup = dateGroups[currentIndex + 1] || null
      }
    }
  } catch (err) {
    console.error('Failed to load AI NEWS date detail', err)
    error = locale === 'ja'
      ? 'AI NEWSの日付別ニュースの取得に失敗しました。'
      : 'Failed to load AI NEWS for this date.'
  }

  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <AiNewsDailyDetail
        date={date}
        items={items}
        previousDateGroup={previousDateGroup}
        nextDateGroup={nextDateGroup}
        error={error}
        locale={locale}
      />
    </Layout>,
    {
      locale,
      title: locale === 'ja'
        ? `AI NEWS DAILY: ${date} | AIニケちゃんオフィシャルサイト`
        : `AI NEWS DAILY: ${date} | AI Nike Chan Official Website`,
      description: locale === 'ja'
        ? `${date} のAIキャラクター関連ニュース一覧。`
        : `AI character news for ${date}.`,
      canonicalUrl: `https://nikechan.com/ai-news/daily/${date}`,
      ogType: 'article',
    }
  )
})

app.get('/api/ai-news', async (c) => {
  c.header('Cache-Control', 'public, max-age=300')
  const url = new URL(c.req.url)
  const offset = Math.max(0, Number(url.searchParams.get('offset') || 0) || 0)
  const requestedLimit = Math.max(1, Number(url.searchParams.get('limit') || AI_NEWS_PAGE_SIZE) || AI_NEWS_PAGE_SIZE)
  const limit = Math.min(requestedLimit, 20)
  const excludeIds = (url.searchParams.get('exclude') || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)

  try {
    const page = await getAiCharacterNewsPage(limit, offset, excludeIds)
    return c.json({
      items: page.items,
      hasMore: page.hasMore,
      nextOffset: page.nextOffset,
    })
  } catch (err) {
    console.error('Failed to load AI character news page', err)
    return c.json({ items: [], hasMore: false, nextOffset: offset, error: 'Failed to load AI character news' }, 500)
  }
})

// Gallery pages
app.get('/gallery', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path;
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <FanGallery locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja'
        ? "ファンアート | AIニケちゃんオフィシャルサイト"
        : "Fan Art | AI Nike Chan Official Website"
    }
  )
})

app.get('/gallery/commissioned', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path;
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <Gallery locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja'
        ? "コミッションイラスト | AIニケちゃんオフィシャルサイト"
        : "Commissioned Works | AI Nike Chan Official Website"
    }
  )
})

// Guidelines pages
app.get('/guidelines', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path; // パスを取得
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <License active="derivative" locale={locale} mode="simple" />
    </Layout>,
    {
      locale,
      title: locale === 'ja' ? "ガイドライン早見版 | AIニケちゃんオフィシャルサイト" : "Guidelines Quick Guide | AI Nike Chan Official Website",
      description: locale === 'ja' ? "AIニケちゃんの二次創作・生成AI利用ガイドラインの早見版。まず確認したいOK/NGをまとめています。" : "A quick guide to AI Nike Chan derivative work and generative AI usage guidelines.",
      canonicalUrl: "https://nikechan.com/guidelines",
      keywords: "利用規約, ガイドライン, 二次創作, ライセンス, 著作権"
    }
  )
})

app.get('/guidelines/derivative', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path; // パスを取得
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <License active="derivative" locale={locale} mode="detail" />
    </Layout>,
    {
      locale,
      title: locale === 'ja' ? "二次創作ガイドライン | AIニケちゃんオフィシャルサイト" : "Derivative Creation Guidelines | AI Nike Chan Official Website",
      description: locale === 'ja' ? "AIニケちゃんの二次創作、ファンアート、配布、頒布に関する詳細ガイドライン。" : "Detailed guidelines for AI Nike Chan derivative works, fan art, distribution, and publication.",
      canonicalUrl: "https://nikechan.com/guidelines/derivative",
      keywords: "利用規約, ガイドライン, 二次創作, ライセンス, 著作権"
    }
  )
})

app.get('/guidelines/ai', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path; // パスを取得
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <License active="ai" locale={locale} mode="detail" />
    </Layout>,
    {
      locale,
      title: locale === 'ja' ? "生成AIガイドライン | AIニケちゃんオフィシャルサイト" : "Generative AI Guidelines | AI Nike Chan Official Website",
      description: locale === 'ja' ? "AIニケちゃんの作品のAI学習への使用に関するガイドライン。機械学習モデルへの利用規約。" : "Guidelines for using AI Nike Chan's works in AI learning. Terms for machine learning models.",
      canonicalUrl: "https://nikechan.com/guidelines/ai",
      keywords: "AI学習, 機械学習, ガイドライン, 使用許諾, 著作権"
    }
  )
})

// Backward-compatible redirects from old /license paths
app.get('/license', (c) => c.redirect('/guidelines/derivative', 301))
app.get('/license/ai', (c) => c.redirect('/guidelines/ai', 301))

// Legal pages
app.get('/privacy', (c) => {
  c.header('Cache-Control', 'public, max-age=3600')
  const currentPath = c.req.path
  const locale = c.get('locale') as Locale

  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <LegalPage kind="privacy" locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja'
        ? 'プライバシーポリシー | AIニケちゃんオフィシャルサイト'
        : 'Privacy Policy | AI Nike Chan Official Website',
      description: locale === 'ja'
        ? 'AIニケちゃんオフィシャルサイトにおける個人情報、Cookie、外部サービス等の取り扱いについて。'
        : 'How the AI Nike Chan Official Website handles personal information, cookies, and external services.',
      canonicalUrl: 'https://nikechan.com/privacy',
      keywords: locale === 'ja'
        ? 'プライバシーポリシー, 個人情報, Cookie, AIニケちゃん'
        : 'privacy policy, personal information, cookies, AI Nike Chan',
    }
  )
})

app.get('/terms', (c) => {
  c.header('Cache-Control', 'public, max-age=3600')
  const currentPath = c.req.path
  const locale = c.get('locale') as Locale

  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <LegalPage kind="terms" locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja'
        ? 'サイト利用規約 | AIニケちゃんオフィシャルサイト'
        : 'Terms of Use | AI Nike Chan Official Website',
      description: locale === 'ja'
        ? 'AIニケちゃんオフィシャルサイトの利用条件、コンテンツの権利、禁止事項、免責事項について。'
        : 'Terms for using the AI Nike Chan Official Website, including content rights, prohibited conduct, and disclaimers.',
      canonicalUrl: 'https://nikechan.com/terms',
      keywords: locale === 'ja'
        ? '利用規約, 免責事項, 著作権, AIニケちゃん'
        : 'terms of use, disclaimer, copyright, AI Nike Chan',
    }
  )
})

// Log page (活動記録)
app.get('/log', async (c) => {
  c.header('Cache-Control', 'public, max-age=1800') // 30分キャッシュ
  const content = await Log()
  const currentPath = c.req.path; // パスを取得
  return c.render(
    <Layout currentPath={currentPath}>
      {content}
    </Layout>,
    {
      title: "ログ | AIニケちゃんオフィシャルサイト",
      description: "AIニケちゃんの最新活動記録。イラスト制作、プロジェクト更新、作品リリース情報を更新。",
      canonicalUrl: "https://nikechan.com/log",
      ogType: "blog"
    }
  )
})

// Log detail page
app.get('/log/:id', async (c) => {
  const id = c.req.param('id')
  const detailContent = await BlogDetail({ id })
  const currentPath = c.req.path; // パスを取得
  return c.render(
    <Layout currentPath={currentPath}>
      {detailContent}
    </Layout>,
    { title: "ログ詳細 | AIニケちゃんオフィシャルサイト" }
  )
})

// Log monthly summary page
app.get('/log/summary/:yearMonth', async (c) => {
  const yearMonth = c.req.param('yearMonth')
  const summaryContent = await MonthlySummary({ yearMonth })
  const currentPath = c.req.path; // パスを取得
  return c.render(
    <Layout currentPath={currentPath}>
      {summaryContent}
    </Layout>,
    { title: "月次サマリー | AIニケちゃんオフィシャルサイト" }
  )
})

// Developer page
app.get('/developer', (c) => {
  const currentPath = c.req.path; // パスを取得
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <Developer locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja'
        ? "開発者情報 | AIニケちゃんオフィシャルサイト"
        : "Developer Info | AI Nike Chan Official Website",
      canonicalUrl: "https://nikechan.com/developer"
    }
  )
})

app.get('/developers', (c) => {
  const url = new URL(c.req.url)
  return c.redirect(`/developer${url.search}`, 301)
})

// Backward-compatible redirect from old /dev
app.get('/dev', (c) => {
  const url = new URL(c.req.url)
  return c.redirect(`/developer${url.search}`, 301)
})

// Developer Blog page
app.get('/dev-blog', async (c) => {
  c.header('Cache-Control', 'public, max-age=1800') // 30分キャッシュ
  const locale = c.get('locale') as Locale
  const content = await DevBlog(locale)
  const currentPath = c.req.path;
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      {content}
    </Layout>,
    {
      locale,
      title: locale === 'en'
        ? "Dev Blog | AI Nike-chan Official Site"
        : "開発者ブログ | AIニケちゃんオフィシャルサイト",
      description: locale === 'en'
        ? "Nike's tech blog. Articles on programming, web development, and AI technology."
        : "ニケの技術ブログ。プログラミング、Web開発、AI技術に関する記事を発信。",
      canonicalUrl: "https://nikechan.com/dev-blog",
      ogType: "blog",
      keywords: locale === 'en'
        ? "tech blog, programming, web development, AI, coding"
        : "技術ブログ, プログラミング, Web開発, AI, コーディング"
    }
  )
})

// Draft post preview (obfuscated URL)
app.get('/dev-blog/preview/:token', (c) => {
  const token = c.req.param('token')
  const locale = c.get('locale') as Locale

  const post = getPostByDraftToken(token)
  if (!post) {
    return c.text('Not Found', 404)
  }

  const postLocale = post.slug.endsWith('-en') ? 'en' : 'ja'
  const html = mdToHtml(post.content, getOgpCache())
  const toc = extractToc(post.content)
  const siteName = postLocale === 'en' ? 'AI Nike-chan Official Site' : 'AIニケちゃんオフィシャルサイト'
  const currentPath = c.req.path
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <PostDetail post={post} html={html} toc={toc} prevPost={undefined} nextPost={undefined} locale={postLocale} />
    </Layout>,
    {
      locale,
      title: `[下書き] ${post.title} | ${siteName}`,
      description: post.description,
      ogType: "article",
      ogImage: post.thumbnail ? `https://nikechan.com${post.thumbnail}` : undefined,
      keywords: post.tags.join(', ')
    }
  )
})

// Blog post detail page
app.get('/dev-blog/:slug', (c) => {
  const slug = c.req.param('slug')
  const locale = c.get('locale') as Locale
  const isEnSlug = slug.endsWith('-en')

  // locale と slug の言語が一致しない場合、対応する記事にリダイレクト
  if (locale === 'en' && !isEnSlug) {
    const enPost = getPostBySlug(`${slug}-en`)
    if (enPost) {
      const url = new URL(c.req.url)
      return c.redirect(`/dev-blog/${slug}-en${url.search}`, 302)
    }
  } else if (locale === 'ja' && isEnSlug) {
    const jaSlug = slug.replace(/-en$/, '')
    const jaPost = getPostBySlug(jaSlug)
    if (jaPost) {
      const url = new URL(c.req.url)
      return c.redirect(`/dev-blog/${jaSlug}${url.search}`, 302)
    }
  }

  const post = getPostBySlug(slug)
  if (!post) {
    return c.text('Not Found', 404)
  }

  const postLocale = isEnSlug ? 'en' : 'ja'
  const html = mdToHtml(post.content, getOgpCache())
  const toc = extractToc(post.content)
  const posts = getPostsByLocale(postLocale)
  const index = posts.findIndex((p) => p.slug === slug)
  const prevPost = index < posts.length - 1 ? { slug: posts[index + 1].slug, title: posts[index + 1].title } : undefined
  const nextPost = index > 0 ? { slug: posts[index - 1].slug, title: posts[index - 1].title } : undefined

  c.header('Cache-Control', 'public, max-age=3600')
  const currentPath = c.req.path
  const siteName = postLocale === 'en' ? 'AI Nike-chan Official Site' : 'AIニケちゃんオフィシャルサイト'
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <PostDetail post={post} html={html} toc={toc} prevPost={prevPost} nextPost={nextPost} locale={postLocale} />
    </Layout>,
    {
      locale,
      title: `${post.title} | ${siteName}`,
      description: post.description,
      canonicalUrl: `https://nikechan.com/dev-blog/${slug}`,
      ogType: "article",
      ogImage: post.thumbnail ? `https://nikechan.com${post.thumbnail}` : undefined,
      keywords: post.tags.join(', ')
    }
  )
})

// Backward-compatible redirect
app.get('/dev_blog/preview/:token', (c) => {
  const url = new URL(c.req.url)
  return c.redirect(`/dev-blog/preview/${c.req.param('token')}${url.search}`, 301)
})

app.get('/dev_blog/:slug', (c) => {
  const url = new URL(c.req.url)
  return c.redirect(`/dev-blog/${c.req.param('slug')}${url.search}`, 301)
})

app.get('/dev_blog', (c) => {
  const url = new URL(c.req.url)
  return c.redirect(`/dev-blog${url.search}`, 301)
})

app.get('/dev/blog', (c) => {
  const url = new URL(c.req.url)
  return c.redirect(`/dev-blog${url.search}`, 301)
})

// Backward-compatible redirects from old blog paths
app.get('/blog', (c) => {
  const url = new URL(c.req.url)
  return c.redirect(`/dev-blog${url.search}`, 301)
})
app.get('/blog/summary/:yearMonth', (c) => {
  const url = new URL(c.req.url)
  return c.redirect(`/dev-blog${url.search}`, 301)
})
app.get('/blog/:id', (c) => {
  const url = new URL(c.req.url)
  return c.redirect(`/dev-blog${url.search}`, 301)
})

// About page
app.get('/about', (c) => {
  const currentPath = c.req.path;
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <About locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja' ? "AIニケちゃんとは | AIニケちゃんオフィシャルサイト" : "About AI Nike Chan | AI Nike Chan Official Website",
      description: locale === 'ja' ? "AIニケちゃんという存在について。会話、記憶、関係性を通じて存在感を育てるAIキャラクターの紹介。" : "About AI Nike-chan as a presence: an AI character built through conversation, memory, relationships, and continuity.",
      canonicalUrl: "https://nikechan.com/about",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
          "@type": "Person",
          "name": locale === 'ja' ? "AIニケちゃん" : "AI Nike-chan",
          "alternateName": locale === 'ja' ? ["AI Nike-chan", "AIニケちゃん"] : ["AIニケちゃん", "AI Nike Chan"],
          "description": locale === 'ja'
            ? "会話、記憶、関係性を通じて存在感を育てるAIキャラクター。X、Discord、AITuberKitなどで活動する。"
            : "An AI character who grows presence through conversation, memory, and relationships across X, Discord, AITuberKit, and more.",
          "url": "https://nikechan.com/about",
          "sameAs": [
            "https://x.com/ai_nikechan",
            "https://discord.gg/nikechan",
            "https://aituberkit.com"
          ],
          "creator": {
            "@type": "Person",
            "name": "Nike Chan",
            "url": "https://nikechan.com/characters/nike"
          }
        }
      }
    }
  )
})

// Backward-compatible redirect from the former world page
app.get('/world', (c) => {
  const url = new URL(c.req.url)
  return c.redirect(`/about${url.search}`, 301)
})

// Character pages
app.get('/characters', (c) => {
  c.header('Cache-Control', 'public, max-age=3600')
  const currentPath = c.req.path
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <CharacterList locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja'
        ? "キャラクター | AIニケちゃんオフィシャルサイト"
        : "Characters | AI Nike Chan Official Website",
      description: locale === 'ja'
        ? "AIニケちゃんファミリー紹介ページ"
        : "Character introduction page for AI Nikechan and Master Nike",
      canonicalUrl: "https://nikechan.com/characters"
    }
  )
})

app.get('/characters/ainike', (c) => {
  c.header('Cache-Control', 'public, max-age=3600')
  const currentPath = c.req.path
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <AINikeProfile locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja'
        ? "AIニケちゃん | AIニケちゃんオフィシャルサイト"
        : "AI Nikechan | AI Nike Chan Official Website",
      description: locale === 'ja'
        ? "AIニケちゃんのプロフィール。AIエージェント・AIVTuberとして活動中。"
        : "Profile of AI Nikechan. Active as an AI Agent and AI VTuber.",
      canonicalUrl: "https://nikechan.com/characters/ainike"
    }
  )
})

app.get('/characters/nike', (c) => {
  c.header('Cache-Control', 'public, max-age=3600')
  const currentPath = c.req.path
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <NikeProfile locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja'
        ? "ニケ | AIニケちゃんオフィシャルサイト"
        : "Nike | AI Nike Chan Official Website",
      description: locale === 'ja'
        ? "ニケのプロフィール。AIキャラクター・エージェント開発者。"
        : "Profile of Nike. AI Character and Agent Developer.",
      canonicalUrl: "https://nikechan.com/characters/nike"
    }
  )
})

app.get('/characters/mikaze', (c) => {
  c.header('Cache-Control', 'public, max-age=3600')
  const currentPath = c.req.path
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <MikazeProfile locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja'
        ? "ミカゼ | AIニケちゃんオフィシャルサイト"
        : "Mikaze | AI Nike Chan Official Website",
      description: locale === 'ja'
        ? "ミカゼのプロフィール。"
        : "Profile of Mikaze.",
      canonicalUrl: "https://nikechan.com/characters/mikaze"
    }
  )
})

app.get('/characters/punike', (c) => {
  c.header('Cache-Control', 'public, max-age=3600')
  const currentPath = c.req.path
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <PunikeProfile locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja'
        ? "ぷにけ | AIニケちゃんオフィシャルサイト"
        : "Punike | AI Nike Chan Official Website",
      description: locale === 'ja'
        ? "ぷにけのプロフィール。"
        : "Profile of Punike.",
      canonicalUrl: "https://nikechan.com/characters/punike"
    }
  )
})

app.get('/characters/today_norma', (c) => {
  c.header('Cache-Control', 'public, max-age=3600')
  const currentPath = c.req.path
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <TodayNormaProfile locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja'
        ? "今日は何の日bot | AIニケちゃんオフィシャルサイト"
        : "Today Norma | AI Nike Chan Official Website",
      description: locale === 'ja'
        ? "今日は何の日botのプロフィール。"
        : "Profile of Today Norma.",
      canonicalUrl: "https://nikechan.com/characters/today_norma"
    }
  )
})

// Tutorial pages
app.get('/tutorials', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path;
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <Tutorial locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja' ? "画像・動画生成チュートリアル | AIニケちゃんオフィシャルサイト" : "Image and Video Generation Tutorial | AI Nike Chan Official Website",
      description: locale === 'ja' ? "AIニケちゃんの画像・動画を生成するためのプロンプト例と考え方を紹介。特定サービスの手順に依存しない、使い回しやすい生成AIガイドです。" : "Prompt examples and reusable ideas for generating AI Nike Chan images and videos without depending on a single service's UI flow.",
      canonicalUrl: "https://nikechan.com/tutorials",
      keywords: "AI, 画像生成, 動画生成, 生成AI, プロンプト, AIニケちゃん"
    }
  )
})

app.get('/tutorials/video', (c) => {
  const url = new URL(c.req.url)
  url.searchParams.set('tab', 'video')
  return c.redirect(`/tutorials${url.search}`, 301)
})

app.get('/tutorial/video', (c) => {
  const url = new URL(c.req.url)
  url.searchParams.set('tab', 'video')
  return c.redirect(`/tutorials${url.search}`, 301)
})

app.get('/tutorial', (c) => {
  const url = new URL(c.req.url)
  return c.redirect(`/tutorials${url.search}`, 301)
})

app.notFound((c) => {
  return c.text('Not Found', 404)
})

app.onError((err, c) => {
  console.error(err)
  return c.text('Internal Server Error', 500)
})

export default app
