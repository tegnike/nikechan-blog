import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    // Externalize React packages so that Vite doesn't bundle them during SSR
    external: ['react', 'react-dom'],
  },
  plugins: [
    build(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    }),
  ]
})
