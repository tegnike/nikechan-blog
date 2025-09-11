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
    { title: "Nike Portfolio | Landing Page" } 
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
    { title: "Nike Portfolio | Fan Art" }
  )
})

app.get('/gallery/commissioned', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path;
  return c.render(
    <Layout currentPath={currentPath}>
      <Gallery />
    </Layout>,
    { title: "Nike Portfolio | Commissioned" }
  )
})

// License page
app.get('/license', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path; // パスを取得
  return c.render(
    <Layout currentPath={currentPath}>
      <License />
    </Layout>,
    { title: "Nike Portfolio | License" }
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
    { title: "Nike Portfolio | Log" }
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
    { title: "Nike Portfolio | Log Detail" }
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
    { title: "Nike Portfolio | Monthly Summary" }
  )
})

// Developer page
app.get('/dev', (c) => {
  const currentPath = c.req.path; // パスを取得
  return c.render(
    <Layout currentPath={currentPath}>
      <Developer />
    </Layout>,
    { title: "Nike Portfolio | Developer" }
  )
})

// Developer Blog page
app.get('/dev/blog', async (c) => {
  c.header('Cache-Control', 'public, max-age=1800') // 30分キャッシュ
  const content = await DevBlog()
  const currentPath = c.req.path; // パスを取得
  return c.render(
    <Layout currentPath={currentPath}>
      {content}
    </Layout>,
    { title: "Nike Portfolio | Dev Blog" }
  )
})

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

// Old about path
app.get('/about', (c) => c.redirect('/dev', 301))

export default app
