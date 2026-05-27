import build, { defaultOptions as cloudflareWorkersBuildOptions } from '@hono/vite-build/cloudflare-workers'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig, loadEnv } from 'vite'

// mode が `client` のときはクライアントスクリプト専用ビルド設定を返す
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const serverEnv = loadEnv(mode, process.cwd(), '')
  for (const [key, value] of Object.entries(serverEnv)) {
    process.env[key] ||= value
  }

  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          // クライアント側エントリ
          input: './src/client.tsx',
          output: {
            // Cloudflare Workers の static assets として配信
            dir: './dist/assets/static',
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
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
      'import.meta.env.VITE_BUILD_SHA': JSON.stringify(env.VITE_BUILD_SHA),
    },
    build: {
      // public/ のコピーはbuildスクリプトで dist/assets/ に行う
      copyPublicDir: false
    },
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
      // i18n JSONファイル変更時にブラウザをフルリロード
      {
        name: 'i18n-reload',
        handleHotUpdate({ file, server }) {
          if (file.includes('/i18n/locales/') && file.endsWith('.json')) {
            server.ws.send({ type: 'full-reload' })
            return []
          }
        }
      },
      build({
        entryContentAfterHooks: [
          ...(cloudflareWorkersBuildOptions.entryContentAfterHooks ?? []),
          (appName) => `${appName}.notFound((c) => c.text('Not Found', 404))`
        ]
      }),
      devServer({
        adapter,
        entry: 'src/index.tsx',
        exclude: [
          /.*\.css$/,
          /.*\.ts$/,
          /.*\.tsx$/,
          /^\/@.+$/,
          /\?t\=\d+$/,
          /^\/favicon\.ico$/,
          /^\/static\/.+/,
          /^\/node_modules\/.*/,
          /^\/images\/.+/,
          /^\/icons\/.+/,
          /^\/manifest\.json$/,
          /^\/robots\.txt$/,
          /^\/sitemap\.xml$/,
        ]
      })
    ]
  }
})
