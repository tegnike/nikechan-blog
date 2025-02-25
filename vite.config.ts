import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    build({
      entry: {
        client: 'src/client.tsx'
      }
    }),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
