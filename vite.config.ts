import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

// サーバーサイドレンダリング用の設定
export default defineConfig({
  ssr: {
    // React系パッケージを外部化
    external: [
      'react', 
      'react-dom',
      'react-dom/client',
      'react-dom/server'
    ]
  },
  resolve: {
    alias: {
      'react-dom/server.edge': 'react-dom/server'
    }
  },
  plugins: [
    build(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ]
})
