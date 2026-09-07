# ギャラリー画像の管理

ファンアート・コミッションの画像は、Cloudflare R2 の専用バケット `nikechan-blog-images` に保存します。
配信元は `https://images.nikechan.com`。サイト掲載用の公開画像だけを保存してください。

- 元画像: `images/fan_arts/` と `images/illustrations/`
- 縮小 WebP: `images/optimized/fan_arts/`（320・640px）と `images/optimized/illustrations/`（480・960px）
- 作者名や掲載情報: `src/utils/fanArtsData.ts` と `src/utils/galleryData.ts`
- ファイル一覧・サイズ・SHA-256: `content/gallery-image-manifest.json`

画像ファイルは Git に追加しません。上記のローカルディレクトリは `.gitignore` と静的アセットのコピー処理から除外しています。
画像データのパスはこれまでどおり `/images/...` と記述し、`galleryImageUrl()` で専用ドメインのURLに変換します。
以前のサイト内画像URLは、サイト側のルートからR2へリダイレクトします。

## 追加・更新

1. 元画像と対応する2サイズのWebPを用意します。アニメーションGIFの元画像はそのまま保持します。
2. Cloudflareダッシュボードの専用バケットに、上記の階層を保ってアップロードします。
   CLIを使う場合は、認証済みWranglerで以下のようにアップロードできます。

   ```sh
   bunx wrangler r2 object put nikechan-blog-images/images/illustrations/example.png \
     --file /absolute/path/example.png --content-type image/png \
     --cache-control 'public, max-age=86400' --remote
   ```

3. 掲載情報とマニフェストを更新します。既存ファイルを差し替える場合は、キャッシュの影響を避けるため新しいファイル名を使います。
4. `bun run verify:gallery-images` で登録済みの全画像と掲載画像・縮小画像の参照を検証し、ローカルで一覧・追加読み込み・拡大表示を確認します。
5. 掲載情報の反映にはサイトのデプロイが必要です。リポジトリのpush・デプロイ許可ルールに従います。

## 移行時の記録

2026-09-07: 306ファイル、55,526,576バイトを対象として移行。
過去のGit履歴は書き換えません。移行時の元ファイルの控えはリポジトリ外の
`/Users/user/WorkSpace/nikechan-blog-media-migration/` に保存しています。
