import { Hono } from 'hono'
import { renderer } from './renderer'
import { Layout } from './components/Layout'

const app = new Hono()

app.use(renderer)

// Home page
app.get('/', (c) => {
  c.header('Cache-Control', 'public, max-age=3600') // 1時間キャッシュ

  return c.render(
    <Layout>
      <div class="space-y-8">
        <section>
          <h1 class="text-4xl font-bold mb-4">Welcome to My Site</h1>
          <p class="text-gray-600 dark:text-gray-400">
            Web developer passionate about creating elegant solutions.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Latest Posts</h2>
          {/* ここにブログ記事の一覧を表示 */}
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Featured Works</h2>
          {/* ここにポートフォリオ作品の一覧を表示 */}
        </section>
      </div>
    </Layout>
  )
})

export default app
