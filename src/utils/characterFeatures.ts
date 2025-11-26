import type { Locale } from '../i18n/config'

/**
 * AIニケちゃんのキャラクター特徴をプロンプト形式で返す
 * この部分は固定で、すべてのプロンプトに含める必要がある
 */
export function getCharacterFeatures(locale: Locale = 'ja'): string {
  if (locale === 'en') {
    return `The girl's features are as follows:
- The golden hairpin is shaped like the letters "AI".
- A black scrunchie is used to tie a high ponytail.
- The chest part of the T-shirt has "AITuber" written on it.
- Wearing denim shorts.
- Eyes are light amber colored.
- Wearing several small piercings.`
  }

  // 日本語版（デフォルト）
  return `女の子の特徴を以下に示す。
- 金色のヘアピンは「AI」という文字の形をしています。
- 黒いシュシュを使って高めの位置でポニーテールをまとめている。
- Tシャツの胸の部分には、「AITuber」という文字が書かれている。
- ジーンズのショートパンツを履いている。
- 瞳は淡い琥珀色。
- 数種類の小さなピアスを付けている。`
}

