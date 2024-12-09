import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { renderer } from './renderer'
import { Layout } from './components/Layout'
import { Model } from './components/Model'
import { Gallery } from './components/Gallery'
const app = new Hono()

// 静的ファイルの配信設定を追加
app.use('/images/*', serveStatic({ root: './public' }))
app.use('/static/*', serveStatic({ root: './public' }))

app.use(renderer)

// Home page
app.get('/', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ

  return c.render(
    <Layout>
      <Model />
      <Gallery />
    </Layout>,
    { title: "Nike Portfolio | Gallery" } 
  )
})

// Blog page
app.get('/blog', (c) => {
  return c.render(
    <Layout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-300">準備中</h1>
      </div>
    </Layout>,
    { title: "Nike Portfolio | Blog" }
  )
})

// Works page
app.get('/works', (c) => {
  return c.render(
    <Layout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-300">準備中</h1>
      </div>
    </Layout>,
    { title: "Nike Portfolio | Works" }
  )
})

export default app
