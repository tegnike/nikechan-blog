---
title: "Cloudflare PagesからWorkersに移行した話"
date: "2026-03-29"
tags: ["Cloudflare", "Hono", "Workers"]
description: "NIKECHAN BLOGのインフラをCloudflare PagesからWorkers + Static Assetsに移行した際の記録です。"
---

## はじめに

このブログは元々Cloudflare Pages上で動いていましたが、Cloudflareが今後の開発をWorkersに集中すると発表したため、Workers + Static Assetsへの移行を行いました。

## 移行の背景

Cloudflare Pagesは引き続きサポートされますが、新機能の開発はWorkers側に一本化されます。主な変更点は以下の通りです：

- `pages_build_output_dir` → `main` + `[assets]` セクション
- `wrangler pages dev/deploy` → `wrangler dev/deploy`
- 静的ファイルはWorkerを経由せずCloudflareが直接配信

## 技術的な変更

### vite.config.ts

ビルドプラグインを変更しました：

```typescript
// Before
import build from '@hono/vite-build/cloudflare-pages'

// After
import build from '@hono/vite-build/cloudflare-workers'
```

### wrangler.toml

設定ファイルをWorkers形式に変更：

```toml
name = "nikechan-blog"
compatibility_date = "2024-12-04"
compatibility_flags = ["nodejs_compat"]
main = "./dist/index.js"

[assets]
directory = "./dist/assets"
```

### serveStaticの削除

Pages時代はHonoの`serveStatic`ミドルウェアで静的ファイルを配信していましたが、Workersでは`[assets]`設定によりCloudflareが直接配信するため不要になりました。

## ハマったポイント

`@hono/vite-build`プラグインが生成するエントリーコードで`app.notFoundHandler`にアクセスしようとしますが、Honoの`#notFoundHandler`はプライベートフィールドのため`undefined`が返されます。これにより存在しないルートへのアクセスで500エラーが発生しました。

対処法として`entryContentAfterHooks`でnotFoundハンドラを上書きしました：

```typescript
build({
  entryContentAfterHooks: [
    (appName) => `${appName}.notFound((c) => c.text('Not Found', 404))`
  ]
})
```

## まとめ

移行自体は設定変更が中心で、アプリケーションコードの変更は最小限でした。静的ファイルの配信がWorker経由からCloudflare直接配信になったことで、パフォーマンスも向上しています。
