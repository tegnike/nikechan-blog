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
  dateArchive: string
}> = {
  ja: {
    heroText: 'AIキャラクター、AITuber、AI VTuber関連のニュースをAIニケちゃん視点で短く追う',
    empty: '表示できるニュースがまだありません。',
    unknownDate: '公開日不明',
    unknownSource: '出典不明',
    commentLabel: 'AIニケちゃんのコメント',
    readArticle: '記事を読む',
    petLabel: '話しているAIニケちゃん',
    dateArchive: '日付別一覧',
  },
  en: {
    heroText: 'Short AI character, AITuber, and AI VTuber news notes from AI Nike Chan',
    empty: 'No news is available yet.',
    unknownDate: 'Unknown date',
    unknownSource: 'Unknown source',
    commentLabel: 'AI Nike Chan comment',
    readArticle: 'Read article',
    petLabel: 'AI Nike Chan speaking',
    dateArchive: 'By date',
  },
}

export function formatAiNewsDateLabel(value: string | null, locale: Locale): string {
  if (!value) return copy[locale].unknownDate
  return new Date(value).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Tokyo',
  })
}

export function formatAiNewsDateKey(value: string | null): string {
  if (!value) return 'unknown'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'unknown'
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Tokyo',
  }).format(date)
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

function getLanguageLabel(item: AiCharacterNewsItem, locale: Locale): string {
  const language = item.language?.toLowerCase() || 'ja'
  try {
    const displayNames = new Intl.DisplayNames([locale === 'ja' ? 'ja-JP' : 'en-US'], { type: 'language' })
    const languageName = displayNames.of(language)
    if (languageName) {
      return languageName
    }
  } catch {
    // Unknown language tags fall back to the raw code below.
  }
  return language.toUpperCase()
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

function groupByDate(items: AiCharacterNewsItem[]) {
  const groups: Array<{ dateKey: string; items: AiCharacterNewsItem[] }> = []
  for (const item of items) {
    const dateKey = formatAiNewsDateKey(item.published_at)
    const lastGroup = groups[groups.length - 1]
    if (lastGroup?.dateKey === dateKey) {
      lastGroup.items.push(item)
    } else {
      groups.push({ dateKey, items: [item] })
    }
  }
  return groups
}

export function AiNewsCard({
  item,
  index,
  locale = 'ja',
}: {
  item: AiCharacterNewsItem
  index: number
  locale?: Locale
}) {
  const labels = categoryLabels[locale]
  const text = copy[locale]

  return (
    <article className="glass-panel ai-news-card p-6 md:p-7">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="ai-news-chip ai-news-chip--category">
          {labels[item.category] || item.category}
        </span>
        <span className="ai-news-chip">
          {getHost(item, locale)}
        </span>
        <span className="ai-news-chip">
          {getLanguageLabel(item, locale)}
        </span>
        <span className="ai-news-chip inline-flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatAiNewsDateLabel(item.published_at, locale)}
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
  )
}

export function AiCharacterNews({ items, error, locale = 'ja' }: Props) {
  const text = copy[locale]
  const groups = groupByDate(items)
  const dateArchiveHref = locale === 'ja' ? '/ai-news/daily' : '/ai-news/daily?lang=en'

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
        {!error && items.length > 0 && (
          <div className="ai-news-index-toolbar">
            <a href={dateArchiveHref} className="design-action-button">
              <CalendarDays className="h-4 w-4" />
              {text.dateArchive}
            </a>
          </div>
        )}

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
          <div className="ai-news-timeline" data-ai-news-list data-ai-news-next-offset={items.length}>
            {groups.map((group) => (
              <section key={group.dateKey} className="ai-news-date-group" data-ai-news-date-group={group.dateKey}>
                <h2 className="ai-news-date-heading">
                  {group.dateKey === 'unknown' ? (
                    text.unknownDate
                  ) : (
                    <a
                      href={locale === 'ja' ? `/ai-news/daily/${group.dateKey}` : `/ai-news/daily/${group.dateKey}?lang=en`}
                      className="ai-news-date-heading-link"
                    >
                      {formatAiNewsDateLabel(`${group.dateKey}T00:00:00+09:00`, locale)}
                    </a>
                  )}
                </h2>
                <div className="space-y-5" data-ai-news-date-items>
                  {group.items.map((item) => (
                    <AiNewsCard key={item.id} item={item} index={items.indexOf(item)} locale={locale} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {!error && items.length > 0 && (
          <div
            className="ai-news-load-state mt-6 text-center text-sm font-semibold text-gray-500"
            data-ai-news-sentinel
          >
            {locale === 'ja' ? 'さらに読み込み中...' : 'Loading more...'}
          </div>
        )}
      </main>
    </div>
  )
}
