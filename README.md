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
- **React**: UI コンポーネント（SSRのみ、フルハイドレーションは行わず *必要箇所のみ* クライアントJSで制御）
- **TailwindCSS**: CSSフレームワーク
  - @tailwindcss/typography
  - @tailwindcss/aspect-ratio
- **Chart.js**: データ可視化ライブラリ
- **クライアントJS**: DOM操作による対話機能
  - ギャラリーモーダル表示
  - プロフィール切り替え
  - 文字起こしトグル
  - 分析タブの切り替え
  - ほか軽量インタラクション

### ビルドツール/開発環境
- **Vite**: ビルドツール
- **TypeScript**: 型システム
- **PostCSS**: CSSプロセッサー
- **Concurrently**: 開発用ツール

## アーキテクチャ

- サーバー側で React コンポーネントを静的 HTML として生成（@hono/react-renderer）
- クライアント側では `src/client.tsx` を **TypeScript (Vanilla JS)** として読み込み、
  必要なインタラクションだけを DOM 操作または小規模な React ツリー（ギャラリーモーダル）で実装
- エッジでの実行により高速なレスポンスを実現

### 環境変数

| 変数名 | 用途 |
| ------- | ---- |
| `VITE_SUPABASE_URL` | Supabase プロジェクトの URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase 公開 anon キー |

Cloudflare Pages の **Environment variables** に Production / Preview それぞれ設定してください。

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
