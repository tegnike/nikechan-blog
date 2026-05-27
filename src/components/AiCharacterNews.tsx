import { CalendarDays, ExternalLink, MessageCircle } from 'lucide-react'
import type { AiCharacterNewsItem } from '../lib/ai-character-news'
import type { Locale } from '../i18n/config'

type Props = {
  items: AiCharacterNewsItem[]
  error?: string
  locale?: Locale
}

const categoryLabels: Record<Locale, Record<string, string>> = {
  ja: {
    ai_character: 'AIキャラ',
    aituber: 'AITuber',
    ai_vtuber: 'AI VTuber',
    ai_avatar: 'AIアバター',
    virtual_influencer: 'AIインフルエンサー',
    ai_companion: 'AIコンパニオン',
    tooling: '開発ツール',
    business: 'ビジネス',
    research: '研究',
    culture: 'カルチャー',
  },
  en: {
    ai_character: 'AI Character',
    aituber: 'AITuber',
    ai_vtuber: 'AI VTuber',
    ai_avatar: 'AI Avatar',
    virtual_influencer: 'AI Influencer',
    ai_companion: 'AI Companion',
    tooling: 'Tools',
    business: 'Business',
    research: 'Research',
    culture: 'Culture',
  },
}

const copy: Record<Locale, {
  heroText: string
  empty: string
  unknownDate: string
  unknownSource: string
  commentLabel: string
  readArticle: string
  petLabel: string
}> = {
  ja: {
    heroText: 'AIキャラクター、AITuber、AI VTuber関連のニュースをAIニケちゃん視点で短く追う',
    empty: '表示できるニュースがまだありません。',
    unknownDate: '公開日不明',
    unknownSource: '出典不明',
    commentLabel: 'AIニケちゃんのコメント',
    readArticle: '記事を読む',
    petLabel: '話しているAIニケちゃん',
  },
  en: {
    heroText: 'Short AI character, AITuber, and AI VTuber news notes from AI Nike Chan',
    empty: 'No news is available yet.',
    unknownDate: 'Unknown date',
    unknownSource: 'Unknown source',
    commentLabel: 'AI Nike Chan comment',
    readArticle: 'Read article',
    petLabel: 'AI Nike Chan speaking',
  },
}

function formatDate(value: string | null, locale: Locale): string {
  if (!value) return copy[locale].unknownDate
  return new Date(value).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Tokyo',
  })
}

function getHost(item: AiCharacterNewsItem, locale: Locale): string {
  if (item.source_name) return item.source_name
  if (item.source_domain) return item.source_domain
  try {
    return new URL(item.url).hostname
  } catch {
    return copy[locale].unknownSource
  }
}

function getPetAnimation(item: AiCharacterNewsItem, index: number): string {
  const animations = ['waving', 'review', 'running', 'jumping']
  return animations[index % animations.length]
}

function displayTitle(item: AiCharacterNewsItem, locale: Locale): string {
  return locale === 'en' && item.title_en ? item.title_en : item.title
}

function displaySummary(item: AiCharacterNewsItem, locale: Locale): string {
  return locale === 'en' && item.summary_en ? item.summary_en : item.summary
}

function displayNikeComment(item: AiCharacterNewsItem, locale: Locale): string {
  return locale === 'en' && item.nike_comment_en ? item.nike_comment_en : item.nike_comment
}

export function AiCharacterNews({ items, error, locale = 'ja' }: Props) {
  const labels = categoryLabels[locale]
  const text = copy[locale]

  return (
    <div className="character-page ai-news-redesign min-h-screen">
      <section className="site-page-hero">
        <div className="character-detail-hero__grid" aria-hidden="true" />
        <div className="site-page-hero__inner">
          <h1>AI NEWS</h1>
          <p>{text.heroText}</p>
        </div>
      </section>

      <main className="designed-page-main container mx-auto max-w-5xl px-4">
        {error && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!error && items.length === 0 && (
          <div className="glass-panel p-8 text-center text-gray-600">
            {text.empty}
          </div>
        )}

        {!error && items.length > 0 && (
          <div className="space-y-5">
            {items.map((item, index) => (
              <article key={item.id} className="glass-panel ai-news-card p-6 md:p-7">
                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="ai-news-chip ai-news-chip--category">
                    {labels[item.category] || item.category}
                  </span>
                  <span className="ai-news-chip">
                    {getHost(item, locale)}
                  </span>
                  <span className="ai-news-chip inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(item.published_at, locale)}
                  </span>
                </div>

                <h3 className="text-2xl font-black leading-tight text-gray-900 md:text-3xl">
                  {displayTitle(item, locale)}
                </h3>

                <p className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-gray-700">
                  {displaySummary(item, locale)}
                </p>

                <div className="nike-comment-wrap mt-5">
                  <div className="grid gap-4 md:grid-cols-[1fr_112px] md:items-end">
                    <div className="nike-comment-bubble">
                      <div className="mb-2 flex items-center gap-2 text-sm font-bold text-purple-700">
                        <MessageCircle className="h-4 w-4" />
                        <span>{text.commentLabel}</span>
                      </div>
                      <div className="nike-comment-body">
                        <div className="nike-comment-pet-slot nike-comment-pet-slot-mobile">
                          <div
                            className={`nike-news-pet nike-news-pet-${getPetAnimation(item, index)}`}
                            role="img"
                            aria-label={text.petLabel}
                          />
                        </div>
                        <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                          {displayNikeComment(item, locale)}
                        </p>
                      </div>
                    </div>
                    <div className="nike-comment-pet-slot nike-comment-pet-slot-desktop">
                      <div
                        className={`nike-news-pet nike-news-pet-${getPetAnimation(item, index)}`}
                        role="img"
                        aria-label={text.petLabel}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs font-semibold text-gray-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="design-action-button"
                  >
                    {text.readArticle}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
