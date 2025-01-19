# NIKELOG

## 概要
このアプリケーションは、HonoフレームワークとCloudflare Pagesを利用したモダンなWebアプリケーションです。エッジコンピューティングの特性を活かした高速なレスポンスと、Supabaseによる堅牢なバックエンドサービスを組み合わせることで、スケーラブルで信頼性の高いサービスを提供します。

## 技術スタック

### フレームワーク/ライブラリ
- **Hono**: JSX対応のWebフレームワーク
- **Cloudflare Pages**: ホスティングプラットフォーム
- **Supabase**: バックエンドサービス（データベース、認証）

### フロントエンド
- **TailwindCSS**: CSSフレームワーク
  - @tailwindcss/typography
  - @tailwindcss/aspect-ratio
- **Chart.js**: データ可視化ライブラリ

### ビルドツール/開発環境
- **Vite**: ビルドツール
- **TypeScript**: 型システム
- **PostCSS**: CSSプロセッサー
- **Concurrently**: 開発用ツール

## セットアップ方法

依存関係のインストール:
```txt
bun install
```

開発サーバーの起動:
```txt
bun run dev
```

## デプロイ方法

本番環境へのデプロイ:
```txt
bun run deploy
```
