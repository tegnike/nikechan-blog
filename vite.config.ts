import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

// mode が `client` のときはクライアントスクリプト専用ビルド設定を返す
export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          // クライアント側エントリ
          input: './src/client.tsx',
          output: {
            // Cloudflare Pages では `/static/*` がそのまま配信されるため
            dir: './dist/static',
            entryFileNames: 'client.js'
          }
        },
        // public ディレクトリのコピーはサーバビルド側で行う
        copyPublicDir: false,
        emptyOutDir: false
      }
    }
  }

  // server ビルド & dev サーバー設定
  return {
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
  }
})
