import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { renderer } from './renderer'
import { Layout } from './components/Layout'
import { Introduction } from './components/Introduction'
import { Model } from './components/Model'
import { Gallery } from './components/Gallery'
import { Blog } from './components/Blog'
import { BlogDetail } from './components/BlogDetail'
import { MonthlySummary } from './components/MonthlySummary'
import { About } from './components/About'

const app = new Hono()

// 静的ファイルの配信設定を追加
app.use('/images/*', serveStatic({ root: './public' }))
app.use('/static/*', serveStatic({ root: './public' }))

app.use(renderer)

// Home page
app.get('/', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ
  const currentPath = c.req.path; // パスを取得

  return c.render(
    <Layout currentPath={currentPath}>
      <Introduction />
      <Model />
      <Gallery />
    </Layout>,
    { title: "Nike Portfolio | Gallery" } 
  )
})

// Blog page
app.get('/blog', async (c) => {
  const blogContent = await Blog()
  const currentPath = c.req.path; // パスを取得
  return c.render(
    <Layout currentPath={currentPath}>
      {blogContent}
    </Layout>,
    { title: "Nike Portfolio | Blog" }
  )
})

// Blog detail page
app.get('/blog/:id', async (c) => {
  const id = c.req.param('id')
  const detailContent = await BlogDetail({ id })
  const currentPath = c.req.path; // パスを取得
  return c.render(
    <Layout currentPath={currentPath}>
      {detailContent}
    </Layout>,
    { title: "Nike Portfolio | Blog Detail" }
  )
})

// Blog monthly summary page
app.get('/blog/summary/:yearMonth', async (c) => {
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

// About me page
app.get('/about', (c) => {
  const currentPath = c.req.path; // パスを取得
  return c.render(
    <Layout currentPath={currentPath}>
      <About />
    </Layout>,
    { title: "Nike Portfolio | About" }
  )
})

export default app
