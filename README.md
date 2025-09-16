# NIKECHAN BLOG

## 概要

以下は全てAIが書きました。

## 🚀 機能

- **サーバーサイドレンダリング** - React SSRによる高速な初回ロード
- **エッジコンピューティング** - Cloudflare Pagesによるグローバルな高速配信
- **最小限のクライアントJS** - 選択的ハイドレーションによる最適パフォーマンス
- **レスポンシブデザイン** - TailwindCSSによるモバイルファースト設計
- **ブログシステム** - 月次サマリー機能付きのフル機能ブログ
- **ポートフォリオギャラリー** - モーダル表示対応のプロジェクトショーケース
- **分析ダッシュボード** - Chart.jsによる組み込み分析機能

## 🛠 技術スタック

- **フレームワーク**: [Hono](https://hono.dev/) - 軽量Webフレームワーク
- **UI**: React (SSRのみ、フルハイドレーションなし)
- **スタイリング**: TailwindCSS + Typographyプラグイン
- **ホスティング**: Cloudflare Pages
- **データベース**: Supabase
- **ビルドツール**: Vite
- **ランタイム**: Bun

## 📦 インストール

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/nikechan-blog.git
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

Cloudflare Pagesへのデプロイ時は、PagesダッシュボードのProductionとPreview環境両方に環境変数を設定してください。

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
# フルプロダクションビルド
bun run build

# サーバーのみビルド
bun run build:server

# クライアントのみビルド
bun run build:client

# Wranglerでプレビュー
bun run preview

# Cloudflare Pagesにデプロイ
bun run deploy
```

## 📁 プロジェクト構造

```
nikechan-blog/
├── src/
│   ├── index.tsx          # メインサーバー＆ルーティング
│   ├── renderer.tsx       # HTMLテンプレートレンダラー
│   ├── client.tsx         # クライアントサイドインタラクション
│   ├── components/        # Reactコンポーネント
│   │   ├── Layout.tsx     # 共通レイアウト
│   │   ├── Introduction.tsx
│   │   ├── Gallery.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogDetail.tsx
│   │   ├── About.tsx
│   │   └── ...
│   └── styles/
│       └── globals.css    # グローバルスタイル
├── public/                # 静的アセット
│   ├── images/
│   ├── static/
│   └── svg/
├── vite.config.ts        # Vite設定
├── tailwind.config.js    # TailwindCSS設定
├── wrangler.toml         # Cloudflare設定
└── package.json
```

## 🌐 ルート

- `/` - イントロダクションとギャラリーのあるホームページ
- `/blog` - ブログ一覧ページ
- `/blog/:id` - 個別ブログ記事
- `/blog/summary/:yearMonth` - 月次ブログサマリー
- `/about` - プロフィール／自己紹介ページ

## 🎨 アーキテクチャ

SSRと選択的クライアントサイドインタラクションのハイブリッドアプローチを採用：

1. **サーバーサイド**: Reactコンポーネントを静的HTMLにレンダリング
2. **クライアントサイド**: 特定のインタラクションに最小限のJavaScriptを使用
   - ギャラリーモーダル
   - プロフィール切り替え
   - タブナビゲーション
   - 分析チャート

フルReactハイドレーションを行わないことで、最適なパフォーマンスを実現しています。

## 🤝 コントリビューション

コントリビューションは歓迎します！お気軽にPull Requestを送ってください。