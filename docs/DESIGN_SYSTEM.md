# デザインシステム設計書

このドキュメントは、NIKECHAN BLOGサイト全体で使用する統一デザインシステムを定義します。

## 概要

キャラクターページ（`/characters/*`）で使用されているデザインを基盤とし、サイト全体で一貫したビジュアルを実現します。

### デザインの特徴

- グラデーションを活用したヘッダー
- ガラス効果（glassmorphism）を使ったパネル
- ピンク〜パープル〜ブルーのカラーパレット
- 柔らかな影と角丸によるモダンな印象

---

## ページ構造テンプレート

すべてのページは以下の構造に従います：

```tsx
export const YourPage = () => {
  return (
    <div className="character-page min-h-screen">
      {/* ヘッダー */}
      <PageHeader title="PAGE TITLE" />

      {/* メインコンテンツ */}
      <div className="relative">
        <div className="character-showcase-bg absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
          {/* コンテンツをここに配置 */}
        </div>
      </div>

      {/* フッターグラデーション */}
      <div className="character-footer h-16 relative overflow-hidden">
        <div className="character-footer-gradient absolute inset-0" />
      </div>
    </div>
  )
}
```

---

## CSSクラス一覧

### 1. ページ全体の背景

#### `character-page`

ページ全体に適用するグラデーション背景。

```css
.character-page {
  background: linear-gradient(180deg,
    #fff5f7 0%,      /* ピンク系 */
    #faf5ff 30%,     /* パープル系 */
    #f0f9ff 70%,     /* ブルー系 */
    #fff5f7 100%     /* ピンク系 */
  );
}
```

**使用方法:**
```tsx
<div className="character-page min-h-screen">
```

---

### 2. ヘッダー

#### `PageHeader` コンポーネント

再利用可能なヘッダーコンポーネント。

**Props:**
- `title: string` - 表示するタイトル（英語大文字推奨）

**使用方法:**
```tsx
import { PageHeader } from './PageHeader'

<PageHeader title="GALLERY" />
```

**内部で使用するクラス:**

| クラス名 | 説明 |
|---------|------|
| `character-header` | ヘッダーコンテナ |
| `character-header-bg` | アニメーションするグラデーション背景 |
| `character-header-pattern` | 装飾的な光のパターン |
| `character-title` | タイトルテキストのスタイル |

**グラデーションカラー:**
```css
.character-header-bg {
  background: linear-gradient(135deg,
    #f472b6 0%,    /* ピンク */
    #a78bfa 25%,   /* パープル */
    #818cf8 50%,   /* インディゴ */
    #60a5fa 75%,   /* ブルー */
    #22d3ee 100%   /* シアン */
  );
  animation: gradientShift 10s ease infinite;
}
```

---

### 3. コンテンツ背景

#### `character-showcase-bg`

メインコンテンツエリアに適用する半透明の白グラデーション。

```css
.character-showcase-bg {
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(255,255,255,0.5) 10%,
    rgba(255,255,255,0.8) 50%,
    rgba(255,255,255,0.5) 90%,
    transparent 100%
  );
}
```

**使用方法:**
```tsx
<div className="relative">
  <div className="character-showcase-bg absolute inset-0" />
  <div className="relative z-10">
    {/* コンテンツ */}
  </div>
</div>
```

---

### 4. ガラスパネル

#### `glass-panel`

コンテンツを囲むガラス効果のあるパネル。

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow:
    0 4px 6px rgba(0,0,0,0.05),
    0 10px 40px rgba(0,0,0,0.08),
    inset 0 1px 0 rgba(255,255,255,0.9);
  border: 1px solid rgba(255,255,255,0.5);
}
```

**使用方法:**
```tsx
<div className="glass-panel p-6 md:p-8">
  <p>コンテンツ</p>
</div>
```

#### `glass-panel-strong`

より不透明度の高いバリエーション。

```css
.glass-panel-strong {
  background: rgba(255, 255, 255, 0.95);
  /* その他は glass-panel と同様 */
}
```

---

### 5. フッターグラデーション

#### `character-footer` / `character-footer-gradient`

ページ下部のフェードアウト効果。

```css
.character-footer-gradient {
  background: linear-gradient(180deg,
    transparent 0%,
    #fff5f7 100%
  );
}
```

**使用方法:**
```tsx
<div className="character-footer h-16 relative overflow-hidden">
  <div className="character-footer-gradient absolute inset-0" />
</div>
```

---

## ボタンスタイル

### トグルボタン（タブ切り替え）

ピンクテーマの丸いピルボタン。

```tsx
// 共通クラス
const baseClass = 'px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200';

// アクティブ状態
const activeClass = 'bg-white text-pink-500 shadow-md border border-pink-200';

// 非アクティブ状態
const inactiveClass = 'bg-white/80 text-gray-600 border border-gray-300 hover:bg-white hover:text-pink-500 hover:border-pink-300 hover:shadow-lg hover:scale-105';
```

**使用例:**
```tsx
<div className="w-full flex items-center justify-center gap-3 mb-8">
  <a
    href="/path-a"
    className={`${baseClass} ${active === 'a' ? activeClass : inactiveClass}`}
  >
    オプションA
  </a>
  <a
    href="/path-b"
    className={`${baseClass} ${active === 'b' ? activeClass : inactiveClass}`}
  >
    オプションB
  </a>
</div>
```

### 特徴

- `rounded-full`: 完全な丸みを持つピル形状
- `hover:scale-105`: ホバー時に少し拡大
- `hover:shadow-lg`: ホバー時に影を強調
- `transition-all duration-200`: スムーズなアニメーション

---

## カラーパレット

### プライマリカラー（ピンク系）

| 用途 | Tailwind クラス | HEX |
|------|----------------|-----|
| テキスト（アクティブ） | `text-pink-500` | #ec4899 |
| ボーダー（アクティブ） | `border-pink-200` | #fbcfe8 |
| ホバーボーダー | `border-pink-300` | #f9a8d4 |
| シャドウ | `shadow-pink-200/60` | rgba(251,207,232,0.6) |

### ニュートラルカラー

| 用途 | Tailwind クラス |
|------|----------------|
| テキスト（非アクティブ） | `text-gray-600` |
| ボーダー（非アクティブ） | `border-gray-300` |
| 背景（半透明白） | `bg-white/80` |

### グラデーション

ヘッダーグラデーションの色順序：
1. ピンク (#f472b6)
2. パープル (#a78bfa)
3. インディゴ (#818cf8)
4. ブルー (#60a5fa)
5. シアン (#22d3ee)

---

## 適用済みページ一覧

| ページ | パス | 状態 |
|--------|------|------|
| Gallery (コミッション) | `/gallery` | 適用済み |
| Gallery (ファンアート) | `/gallery/fan` | 適用済み |
| Guidelines | `/guidelines`, `/guidelines/ai` | 適用済み |
| Tutorial | `/tutorial` | 適用済み |
| DevBlog | `/dev_blog` | 適用済み |
| Characters | `/characters`, `/characters/*` | 適用済み（基準） |
| About | `/about` | 適用済み |

---

## 実装チェックリスト

新しいページを追加する際は以下を確認してください：

- [ ] `character-page min-h-screen` でページをラップ
- [ ] `PageHeader` コンポーネントでタイトルを表示
- [ ] `character-showcase-bg` をコンテンツ背景に適用
- [ ] `relative z-10` でコンテンツを背景の上に配置
- [ ] `glass-panel` でカード/パネルをスタイリング
- [ ] `character-footer` でフッターグラデーションを追加
- [ ] トグルボタンがある場合はピンクテーマのスタイルを使用

---

## 関連ファイル

- **CSS定義:** `src/styles/globals.css`
- **PageHeader:** `src/components/PageHeader.tsx`
- **参考実装:** `src/components/Gallery.tsx`, `src/components/License.tsx`

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2026-01-06 | 初版作成。Gallery, Guidelines, Tutorial, DevBlogにデザイン適用 |
