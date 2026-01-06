# 現在のトップページ バックアップ

このドキュメントは、2026年1月6日時点のトップページの構成、デザイン、テキストを保管したものです。
新しいデザインを構築する際の参考資料として使用してください。

---

## 全体構成

```
LandingPage
├── WelcomeSection (ヒーローセクション) ← 維持
├── AboutSection (自己紹介)
├── NewsSection (最近のアップデート)
├── LicenseSection (生成AI利用について)
├── GallerySection (アートギャラリー)
├── SocialLinksSection (SNSリンク)
├── SupportSection (支援について)
└── ContactSupportSection (お問い合わせ)
```

### 全体レイアウト
- ヒーローセクション以降は `bg-white/30` の背景でラップ
- 各セクションは `pt-10 pb-10 sm:pb-20 px-6 sm:px-10` のパディング
- 最大幅は `max-w-6xl`

---

## 1. WelcomeSection（ヒーローセクション）

**※このセクションは維持**

### 構成要素
- 背景画像: `/images/lp/bg.webp`
- メインビジュアル: `/images/lp/top.webp`（最大幅576px）
- 白グラデーションオーバーレイ

### 背景グラデーション
```css
linear-gradient(to bottom, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.6) 65%, rgba(255,255,255,0.82) 100%)
```

### 画像のドロップシャドウ
```css
drop-shadow(0 0 36px rgba(255,255,255,0.98))
drop-shadow(0 0 80px rgba(255,255,255,0.78))
drop-shadow(0 0 120px rgba(255,255,255,0.5))
```

---

## 2. AboutSection（自己紹介）

### レイアウト
- 2カラムグリッド: `grid-cols-[1.5fr_1fr]`（デスクトップ）
- 左: テキスト情報
- 右: プロフィール画像

### 使用画像
- `/images/lp/about.webp`

### テキスト内容

**見出し:** AIニケちゃん

**挨拶:** "こんにちは、私の名前はニケです。あなたの名前は?"

**説明文:**
> 新しいものが大好きで、どんなことにも興味津々なAIニケちゃん。
> まだまだ未熟だけど、だからこそ可能性は無限大。
> 皆さんのチャットや、イラストや、動画が、彼女を創ります。
> あなたも一緒に、彼女の世界を広げてみませんか？

### プロフィール項目

| ラベル | 値 | ラベル色 |
|--------|-----|----------|
| 年齢 | 17歳 | #F5B0BC（ピンク） |
| 誕生日 | 01 / 04 | #7CCFF3（水色） |
| 家族 | マスター | #1695B0（ティール） |
| イメージカラー | 紫（#5A4C97） | #5A4C97（紫） |

### CTA
- 「詳細プロフィールを見る」→ `/about`
- 「ギャラリーへ」→ `/gallery`

---

## 3. NewsSection（最近のアップデート）

### 見出し
最近のアップデート

### ニュースアイテム

#### 1. LINEスタンプ販売開始
- **タグ:** NEW
- **日付:** 2025・11
- **タイトル:** LINEスタンプを販売開始しました！
- **説明:** AIニケちゃんのLINEスタンプが登場！日常で使えるかわいいスタンプをぜひご利用ください。
- **CTA:** LINE STOREで見る
- **リンク:** https://store.line.me/stickershop/product/32003839/ja

#### 2. チュートリアルページ追加
- **タグ:** NEW
- **日付:** 2025・10
- **タイトル:** 画像・動画生成チュートリアルページを追加しました
- **説明:** AIニケちゃんの画像と動画を簡単に生成するための手順を公開しました。
- **CTA:** チュートリアルを読む → `/tutorial`

#### 3. 合成音声モデル
- **タグ:** NEW
- **日付:** 2025・10
- **タイトル:** 新しい合成音声モデルが完成しました
- **説明:** AIニケちゃんの新しい合成音声モデルを作成しました。披露目MVをご視聴ください。
- **埋め込み:** YouTube動画（embed.type: youtube）

#### 4. 二次創作ガイドライン
- **タグ:** NEW
- **日付:** 2025・9
- **タイトル:** 二次創作ガイドラインを公開しました
- **説明:** AIニケちゃんの二次創作に関するガイドラインを公開しました。ファンアートやAI作品などの制作・配布に関するルールをまとめています。
- **CTA:** ガイドラインを確認する → `/guidelines`

---

## 4. LicenseSection（生成AI利用について）

### レイアウト
- 2カラムグリッド
- 左: テキスト・CTA
- 右: i2i例の画像パネル

### 使用画像
- `/images/lp/guideline1.webp`（入力例）
- `/images/lp/guideline2.webp`（出力例）

### テキスト内容

**見出し:** 生成AIでの利用もOK！

**説明文:**
> AIニケちゃんのVRMモデルは生成AIで利用可能なため、i2iやLoRAの作成などでご利用いただけます。ガイドラインに沿って、創作・研究・配信など幅広い用途で活用してください。

### 機能リスト
1. 生成AI（i2i, LoRAなど） OK
2. 二次創作 OK
3. SNS・動画配信 OK

### CTA
- 「生成AIを試してみよう！」→ `/tutorial`
- 「ガイドラインの詳細はこちら」→ `/guidelines`

### 注意書き
> 一部の利用は条件付きとなる場合があります。詳細はガイドラインをご確認ください。

### i2i例パネル

**見出し:** nano banana で i2i を試す例

**プロンプト例:**
> この女の子をパンク・ロック風のデザインで書き直してください。

---

## 5. GallerySection（アートギャラリー）

### 見出し
アートギャラリー

### レイアウト
- 4列 x 2行グリッド（計8件）
- ファンアートからランダムに選択
- アスペクト比: 正方形 (`aspect-square`)

### アニメーション
- Framer Motion使用
- 初期状態: `opacity: 0, y: 30`
- 表示状態: `opacity: 1, y: 0`
- ディレイ: `index * 0.05`

### CTA
「ギャラリーを見る」→ `/gallery`

---

## 6. SocialLinksSection（SNSリンク）

### 見出し
SNS

### リンク一覧

| プラットフォーム | ハンドル | 備考 | リンク |
|------------------|----------|------|--------|
| Twitter (X) | @tegnike | 管理者のアカウント | https://twitter.com/tegnike |
| Twitter (X) | @ai_nikechan | AIニケちゃんのアカウント | https://twitter.com/ai_nikechan |
| Discord | 参加リンク | - | https://discord.gg/G4E5Sf3yj3 |
| YouTube | @nikechan | - | https://www.youtube.com/@nikechan |

### カードデザイン
- アイコン + ラベル + ハンドル名
- 右側に外部リンクアイコン（インディゴ背景）
- ホバー時: `-translate-y-0.5`, `shadow-lg`

---

## 7. SupportSection（支援について）

### 見出し
活動のご支援について

### レイアウト
- 2カラムグリッド

### 左カラム: FANBOX

**見出し:** FANBOX で支援

**説明:**
> 活動の継続・制作費に充てさせていただきます。どの支援プランでも受けられる特典は同じで、金額で差が出ない設計です。

**特徴リスト:**
- 同一特典：どのプランでも内容は共通
- 現在、決済はFANBOXに一本化

**CTA:** FANBOXで支援する → https://nikechan.fanbox.cc/

### 右カラム: Discord

**見出し:** Discord について

**説明:**
> スポンサーはDiscordの特設チャンネルに参加できます。ただし基本方針として情報は公にし、ここでしか得られない情報は極力設けません。

**公開チャンネルで見られるもの（例）:**
- 公開前情報の先出し
- 管理者の作業配信
- 必要に応じて今後も追加予定

**注意書き:**
> 詳細な参加手順やチャンネル構成は、Discord内の特設チャンネルでご案内します。

---

## 8. ContactSupportSection（お問い合わせ）

### 見出し
お問い合わせ

### 連絡方法

#### Twitter (X)
- **ラベル:** Twitter (X)
- **説明:** DMでご連絡ください
- **ハンドル:** @tegnike
- **リンク:** https://twitter.com/tegnike

#### Discord
- **ラベル:** Discord
- **説明:** コミュニティ内でのご相談はこちら
- **リンクテキスト:** 参加リンク
- **リンク:** https://discord.gg/G4E5Sf3yj3

#### メール
- **ラベル:** メール
- **説明:** メール窓口は現在準備中です。恐れ入りますが、当面は Twitter (X) または Discord よりご連絡ください。

---

## 使用リソース一覧

### 画像ファイル
| ファイル | 用途 |
|----------|------|
| `/images/lp/bg.webp` | ヒーロー背景 |
| `/images/lp/top.webp` | メインビジュアル |
| `/images/lp/about.webp` | プロフィール画像 |
| `/images/lp/guideline1.webp` | i2i入力例 |
| `/images/lp/guideline2.webp` | i2i出力例 |

### 外部リンク
- LINE STORE: https://store.line.me/stickershop/product/32003839/ja
- Twitter @tegnike: https://twitter.com/tegnike
- Twitter @ai_nikechan: https://twitter.com/ai_nikechan
- Discord: https://discord.gg/G4E5Sf3yj3
- YouTube: https://www.youtube.com/@nikechan
- FANBOX: https://nikechan.fanbox.cc/

### カラー
- プロフィールラベル1: #F5B0BC（ピンク）
- プロフィールラベル2: #7CCFF3（水色）
- プロフィールラベル3: #1695B0（ティール）
- プロフィールラベル4: #5A4C97（紫 - メインカラー）
- 見出し紫: #594A89

---

## 翻訳ファイル

翻訳データは以下のファイルに保存されています：
- 日本語: `src/i18n/locales/ja/home.json`
- 英語: `src/i18n/locales/en/home.json`

---

## コンポーネントファイル

以下のファイルにソースコードが保存されています：

| ファイル | 説明 |
|----------|------|
| `src/components/LandingPage.tsx` | メインコンポーネント |
| `src/components/lp/WelcomeSection.tsx` | ヒーローセクション |
| `src/components/lp/AboutSection.tsx` | 自己紹介 |
| `src/components/lp/NewsSection.tsx` | ニュース |
| `src/components/lp/LicenseSection.tsx` | 生成AI利用 |
| `src/components/lp/GallerySection.tsx` | ギャラリー |
| `src/components/lp/SocialLinksSection.tsx` | SNSリンク |
| `src/components/lp/SupportSection.tsx` | 支援について |
| `src/components/lp/ContactSupportSection.tsx` | お問い合わせ |

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2026-01-06 | 初版作成（リデザイン前のバックアップ） |
