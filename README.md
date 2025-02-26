# NIKELOG

## 概要
NIKELOGは、HonoフレームワークとCloudflare Pagesを活用したモダンなWebアプリケーションです。エッジコンピューティングの特性を活かし、世界中で高速なレスポンスを実現するとともに、Supabaseによる堅牢なバックエンドサービスでデータ管理や認証機能を提供します。ブログ、ポートフォリオ、ギャラリーなど複数のコンポーネントを通じて、利用状況や各種統計情報を視覚的に表示し、ユーザー体験を向上させることを目指しています。

## 特徴
- **エッジコンピューティング対応**  
  Cloudflare WorkersとCloudflare Pagesを利用し、低レイテンシかつスケーラブルなサービスを実現。
- **堅牢なバックエンド**  
  Supabase（PostgreSQLベース）を用いて、データベース、認証、ストレージなどのバックエンド機能を提供。
- **モダンなフロントエンド**  
  ReactとTypeScriptによる型安全な開発環境と、TailwindCSSを使ったレスポンシブなUIデザイン。
- **データ可視化**  
  Chart.jsとreact-chartjs-2を利用した豊富なグラフやダッシュボードで、統計情報を直感的に表示。

## 技術スタック

### フレームワーク・ライブラリ
- **Hono**: JSXレンダリング対応の軽量Webフレームワーク
- **Cloudflare Pages**: 静的ファイルおよびサーバーサイドレンダリングのホスティングプラットフォーム
- **Supabase**: バックエンドサービス（データベース、認証、ストレージ）

### フロントエンド
- **React**: コンポーネントベースのUIライブラリ
- **TypeScript**: 静的型付けによる高い信頼性
- **TailwindCSS**: ユーティリティファーストのCSSフレームワーク  
  - @tailwindcss/typography  
  - @tailwindcss/aspect-ratio
- **Chart.js**: データ可視化ライブラリ（react-chartjs-2と併用）

### ビルドツール・開発環境
- **Vite**: 高速なモダンビルドツール
- **PostCSS**: CSSプロセッサー（Autoprefixer付き）
- **Concurrently**: 複数のタスクを同時実行する開発用ツール

## セットアップ方法

1. **依存関係のインストール**  
   プロジェクトディレクトリで以下のコマンドを実行してください：
   ```bash
   bun install
   ```

2. **開発サーバーの起動**  
   以下のコマンドで開発サーバーを起動します：
   ```bash
   bun run dev
   ```
   ブラウザで `http://localhost:3000`（またはViteが指定するポート）にアクセスして動作を確認してください。

## デプロイ方法

本番環境へのデプロイは以下のコマンドで実行します：
```bash
bun run deploy
```
このコマンドは、プロジェクトのビルドとCloudflare Pagesへの自動デプロイを行います。

## 環境変数設定

プロジェクトルートに `.env` ファイルを作成し、以下の環境変数を設定してください：
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```
