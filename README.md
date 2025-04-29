# NIKELOG

## 概要
このアプリケーションは、HonoフレームワークとCloudflare Pagesを利用したモダンなWebアプリケーションです。エッジコンピューティングの特性を活かした高速なレスポンスと、Supabaseによる堅牢なバックエンドサービスを組み合わせることで、スケーラブルで信頼性の高いサービスを提供します。

## 技術スタック

### フレームワーク/ライブラリ
- **Hono**: JSX対応のWebフレームワーク
  - `@hono/react-renderer`: React コンポーネントを SSR（サーバーサイドレンダリング）で出力
- **Cloudflare Pages**: ホスティングプラットフォーム
- **Supabase**: バックエンドサービス（データベース、認証）

### フロントエンド
- **React**: UI コンポーネント（SSRのみ、クライアントサイドハイドレーションなし）
- **TailwindCSS**: CSSフレームワーク
  - @tailwindcss/typography
  - @tailwindcss/aspect-ratio
- **Chart.js**: データ可視化ライブラリ
- **クライアントJS**: DOM操作による対話機能
  - ギャラリーモーダル表示
  - プロフィール切り替え

### ビルドツール/開発環境
- **Vite**: ビルドツール
- **TypeScript**: 型システム
- **PostCSS**: CSSプロセッサー
- **Concurrently**: 開発用ツール

## アーキテクチャ

- サーバー側でReactコンポーネントを静的HTMLとして生成
- クライアント側は最低限のJavaScriptで対話機能を実装
- エッジでの実行により高速なレスポンスを実現

## セットアップ方法

依存関係のインストール:
```shell
bun install
```

開発サーバーの起動:
```shell
bun run dev
```

## デプロイ方法

本番環境へのデプロイ:
```shell
bun run deploy
```
