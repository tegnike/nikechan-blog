# AIニケちゃんオフィシャルサイト

https://nikechan.com

## 📕 概要

AI Nike Chan（ニケちゃん）のポートフォリオ＆ブログサイトです。
以下は全てAIが書きました。

## © ライセンス・著作権について

本リポジトリは**閲覧・参考目的で公開**しています。ソースコード、テキスト、画像、
「AIニケちゃん」を含むキャラクター・ブランド素材について、**無断での複製・転載・
改変・商用利用を含む再利用は許可していません**（All Rights Reserved）。

- ファンアート・二次創作のルールは [`/guidelines`](https://nikechan.com/guidelines)、
  AI生成物の利用ルールは [`/guidelines/ai`](https://nikechan.com/guidelines/ai) を参照してください。
- 誤字脱字や不具合の報告、改善提案のIssue/Pull Requestは歓迎します。ただし、これは
  コード・素材の利用許諾を意味するものではありません。

## 🚀 機能

- **サーバーサイドレンダリング** - React SSRによる高速な初回ロード、選択的ハイドレーション
- **エッジコンピューティング** - Cloudflare Workersによるグローバルな高速配信
- **自前ブログシステム** - Markdownファイルを置くだけで記事公開（OGPカード/Twitter埋め込み自動生成）
- **多言語対応** - i18next + `?lang=`/`Accept-Language`によるja/en切り替え
- **ファンアートギャラリー** - 無限スクロール対応のモーダル表示ギャラリー
- **活動記録/AIニュース** - Supabase連携の日次サマリー・AIキャラクターニュース配信
- **レスポンシブデザイン** - TailwindCSSによるモバイルファースト設計

## 🛠 技術スタック

- **フレームワーク**: [Hono](https://hono.dev/) - 軽量Webフレームワーク
- **UI**: React (SSRのみ、フルハイドレーションなし)
- **スタイリング**: TailwindCSS + Typographyプラグイン
- **ホスティング**: Cloudflare Workers
- **データベース**: Supabase
- **ビルドツール**: Vite
- **ランタイム**: Bun

## 📦 インストール

```bash
# リポジトリをクローン
git clone https://github.com/tegnike/nikechan-blog.git
cd nikechan-blog

# Bunで依存関係をインストール
bun install
```

## 🔧 環境設定

Supabaseの認証情報を含む`.env`ファイルを作成してください：

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Cloudflare Workersへのデプロイ時は、ダッシュボードのProductionとPreview環境両方に
環境変数を設定してください。

## 💻 開発

```bash
# ホットリロード付き開発サーバーを起動
bun run dev

# CSSのみビルド
bun run build:css

# CSS変更を監視
bun run watch:css
```

## 🏗 ビルド＆デプロイ

```bash
# フルプロダクションビルド（OGP取得→sitemap生成→CSS→クライアント→サーバー）
bun run build

# サーバーのみビルド
bun run build:server

# クライアントのみビルド
bun run build:client

# Wranglerでプレビュー
bun run preview

# Cloudflare Workersにデプロイ
bun run deploy
```

## 📁 プロジェクト構造

```
nikechan-blog/
├── content/
│   └── posts/             # ブログ記事（Markdown、-enサフィックスで英語版）
├── src/
│   ├── index.tsx          # メインサーバー＆ルーティング
│   ├── renderer.tsx       # HTMLテンプレートレンダラー
│   ├── client.tsx         # クライアントサイドインタラクション
│   ├── components/        # Reactコンポーネント
│   ├── lib/                # Supabaseクライアント・データ取得層
│   ├── utils/              # Markdownパーサー等のユーティリティ
│   ├── i18n/                # 多言語対応
│   └── styles/
│       └── globals.css    # グローバルスタイル
├── public/                # 静的アセット
├── scripts/               # OGP取得・sitemap生成などのビルドスクリプト
├── vite.config.ts        # Vite設定
├── tailwind.config.js    # TailwindCSS設定
├── wrangler.toml         # Cloudflare設定
└── package.json
```

## 🌐 主なルート

- `/` - ホームページ
- `/about` - プロフィール／自己紹介ページ
- `/characters` - キャラクター一覧
- `/dev-blog` / `/dev-blog/:slug` - 開発者ブログ一覧・記事詳細
- `/gallery` - ファンアートギャラリー
- `/updates` - お知らせ
- `/ai-news` - AIキャラクターニュース
- `/log` - 活動記録
- `/guidelines` - 二次創作・AI利用ガイドライン
- `/developer` - 開発者情報
- `/tutorials` - 画像・動画生成チュートリアル

## 🎨 アーキテクチャ

SSRと選択的クライアントサイドインタラクションのハイブリッドアプローチを採用：

1. **サーバーサイド**: Reactコンポーネントを静的HTMLにレンダリング
2. **クライアントサイド**: 特定のインタラクションに最小限のJavaScriptを使用
   - ギャラリーモーダル
   - プロフィール切り替え・タブナビゲーション
   - 分析チャート（Chart.js）

フルReactハイドレーションを行わないことで、最適なパフォーマンスを実現しています。
