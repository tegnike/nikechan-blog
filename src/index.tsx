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

const app = new Hono()

// 静的ファイルの配信設定を追加
app.use('/images/*', serveStatic({ root: './public' }))
app.use('/static/*', serveStatic({ root: './public' }))
app.use('/svg/*', serveStatic({ root: './public' }))

app.use(renderer)

// Home page - Landing Page
app.get('/', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path; // パスを取得

  return c.render(
    <Layout currentPath={currentPath}>
      <LandingPage />
    </Layout>,
    {
      title: "AI Nike Chan Official Website",
      description: "AIニケちゃんのオフィシャルサイト。イラスト作品、ファンアート、活動記録、開発者向け情報を掲載。",
      canonicalUrl: "https://nikechan.com",
      ogType: "website"
    }
  )
})

// Gallery pages
app.get('/gallery', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path;
  return c.render(
    <Layout currentPath={currentPath}>
      <FanGallery />
    </Layout>,
    { title: "AI Nike Chan Official Website | Fan Art" }
  )
})

app.get('/gallery/commissioned', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path;
  return c.render(
    <Layout currentPath={currentPath}>
      <Gallery />
    </Layout>,
    { title: "AI Nike Chan Official Website | Commissioned" }
  )
})

// Guidelines pages
app.get('/guidelines', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path; // パスを取得
  return c.render(
    <Layout currentPath={currentPath}>
      <License active="derivative" />
    </Layout>,
    {
      title: "AI Nike Chan Official Website | Usage Guidelines",
      description: "AIニケちゃんの作品利用ガイドライン。二次創作、ファンアート、AI学習への利用に関する規約。",
      canonicalUrl: "https://nikechan.com/guidelines",
      keywords: "利用規約, ガイドライン, 二次創作, ライセンス, 著作権"
    }
  )
})

app.get('/guidelines/ai', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path; // パスを取得
  return c.render(
    <Layout currentPath={currentPath}>
      <License active="ai" />
    </Layout>,
    {
      title: "AI Nike Chan Official Website | AI Usage Guidelines",
      description: "AIニケちゃんの作品のAI学習への使用に関するガイドライン。機械学習モデルへの利用規約。",
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
      title: "AI Nike Chan Official Website | Log",
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
    { title: "AI Nike Chan Official Website | Log Detail" }
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
    { title: "AI Nike Chan Official Website | Monthly Summary" }
  )
})

// Developer page
app.get('/developer', (c) => {
  const currentPath = c.req.path; // パスを取得
  return c.render(
    <Layout currentPath={currentPath}>
      <Developer />
    </Layout>,
    { title: "AI Nike Chan Official Website | Developer" }
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
      title: "AI Nike Chan Official Website | Developer Blog",
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
  return c.render(
    <Layout currentPath={currentPath}>
      <About />
    </Layout>,
    {
      title: "AI Nike Chan Official Website | About",
      description: "AIニケちゃんのプロフィール。創作活動、技術スキル、プロジェクト詳細について。",
      canonicalUrl: "https://nikechan.com/about",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
          "@type": "Person",
          "name": "Nike Chan",
          "alternateName": "ニケちゃん",
          "description": "デジタルアーティスト・開発者",
          "url": "https://nikechan.com"
        }
      }
    }
  )
})

export default app
