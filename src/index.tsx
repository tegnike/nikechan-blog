import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
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
import { DevBlog } from './components/DevBlog'
import { About } from './components/About'
import { Tutorial } from './components/Tutorial'
import { detectLocale, type Locale } from './i18n/config'

const app = new Hono()

// Middleware to detect and set locale
app.use('*', async (c, next) => {
  const url = new URL(c.req.url)
  const acceptLanguage = c.req.header('accept-language')
  const locale = detectLocale(url, acceptLanguage)
  c.set('locale', locale)
  await next()
})

// 静的ファイルの配信設定を追加
app.use('/images/*', serveStatic({ root: './public' }))
app.use('/static/*', serveStatic({ root: './public' }))
app.use('/svg/*', serveStatic({ root: './public' }))

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
      <License active="derivative" locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja' ? "二次創作ガイドライン | AIニケちゃんオフィシャルサイトs" : "Derivative Creation Guidelines | AI Nike Chan Official Website",
      description: locale === 'ja' ? "AIニケちゃんの作品利用ガイドライン。二次創作、ファンアート、AI学習への利用に関する規約。" : "Guidelines for using AI Nike Chan's works. Terms for derivative works, fan art, and AI learning.",
      canonicalUrl: "https://nikechan.com/guidelines",
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
      <License active="ai" locale={locale} />
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
app.get('/license', (c) => c.redirect('/guidelines', 301))
app.get('/license/ai', (c) => c.redirect('/guidelines/ai', 301))

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
  return c.render(
    <Layout currentPath={currentPath}>
      <Developer />
    </Layout>,
    { title: "開発者情報 | AIニケちゃんオフィシャルサイト" }
  )
})

// Backward-compatible redirect from old /dev
app.get('/dev', (c) => c.redirect('/developer', 301))

// Developer Blog page
app.get('/dev_blog', async (c) => {
  c.header('Cache-Control', 'public, max-age=1800') // 30分キャッシュ
  const content = await DevBlog()
  const currentPath = c.req.path; // パスを取得
  return c.render(
    <Layout currentPath={currentPath}>
      {content}
    </Layout>,
    {
      title: "開発者ブログ | AIニケちゃんオフィシャルサイト",
      description: "ニケの技術ブログ。プログラミング、Web開発、AI技術に関する記事を発信。",
      canonicalUrl: "https://nikechan.com/dev_blog",
      ogType: "blog",
      keywords: "技術ブログ, プログラミング, Web開発, AI, コーディング"
    }
  )
})

// Backward-compatible redirect
app.get('/dev/blog', (c) => c.redirect('/dev_blog', 301))

// Backward-compatible redirects from old blog paths
app.get('/blog', (c) => c.redirect('/log', 301))
app.get('/blog/summary/:yearMonth', (c) => {
  const ym = c.req.param('yearMonth')
  return c.redirect(`/log/summary/${ym}`, 301)
})
app.get('/blog/:id', (c) => {
  const id = c.req.param('id')
  return c.redirect(`/log/${id}`, 301)
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
      description: locale === 'ja' ? "AIニケちゃんのプロフィール。創作活動、技術スキル、プロジェクト詳細について。" : "Profile of AI Nike Chan. Information about creative activities, technical skills, and project details.",
      canonicalUrl: "https://nikechan.com/about",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
          "@type": "Person",
          "name": "Nike Chan",
          "alternateName": "ニケちゃん",
          "description": locale === 'ja' ? "デジタルアーティスト・開発者" : "Digital Artist and Developer",
          "url": "https://nikechan.com"
        }
      }
    }
  )
})

// Tutorial pages
app.get('/tutorial', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path;
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <Tutorial active="illustration" locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja' ? "画像生成チュートリアル | AIニケちゃんオフィシャルサイト" : "Image Generation Tutorial | AI Nike Chan Official Website",
      description: locale === 'ja' ? "AIを使ってAIニケちゃんのイラストを生成する方法を解説。Stable Diffusion、NovelAI、Midjourneyなどの画像生成AIの使い方とプロンプト例を紹介。" : "Learn how to generate illustrations of AI Nike Chan using AI. Introducing image generation AI such as Stable Diffusion, NovelAI, and Midjourney with prompt examples.",
      canonicalUrl: "https://nikechan.com/tutorial",
      keywords: "AI, イラスト生成, Stable Diffusion, 画像生成AI, プロンプト, LoRA"
    }
  )
})

app.get('/tutorial/video', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path;
  const locale = c.get('locale') as Locale
  return c.render(
    <Layout currentPath={currentPath} locale={locale}>
      <Tutorial active="video" locale={locale} />
    </Layout>,
    {
      locale,
      title: locale === 'ja' ? "動画生成チュートリアル | AIニケちゃんオフィシャルサイト" : "Video Generation Tutorial | AI Nike Chan Official Website",
      description: locale === 'ja' ? "AIニケちゃんの動画を生成する方法を解説。Runway Gen-3、Pika Labs、Stable Video Diffusionなどの動画生成AIとLive2Dアニメーション制作方法を紹介。" : "Learn how to generate videos of AI Nike Chan. Introducing video generation AI such as Runway Gen-3, Pika Labs, and Stable Video Diffusion, as well as Live2D animation production methods.",
      canonicalUrl: "https://nikechan.com/tutorial/video",
      keywords: "AI, 動画生成, アニメーション, Live2D, VTuber, Runway, Pika Labs"
    }
  )
})

export default app
