import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { AiNewsCard, formatAiNewsDateLabel } from './AiCharacterNews'
import type { AiCharacterNewsDateGroup, AiCharacterNewsItem } from '../lib/ai-character-news'
import type { Locale } from '../i18n/config'

type ListProps = {
  dateGroups: AiCharacterNewsDateGroup[]
  error?: string
  locale?: Locale
}

type DetailProps = {
  date: string
  items: AiCharacterNewsItem[]
  previousDateGroup?: AiCharacterNewsDateGroup | null
  nextDateGroup?: AiCharacterNewsDateGroup | null
  error?: string
  locale?: Locale
}

const copy = {
  ja: {
    heading: 'AI NEWS DAILY',
    heroText: 'AIキャラクター関連ニュースを日付ごとに整理',
    listEmpty: '表示できる日付別ニュースはまだありません。',
    detailMissing: 'この日のニュースは見つかりませんでした。',
    readDay: 'この日を見る',
    backToList: '日付一覧へ',
    backToNews: 'AI NEWSへ',
    previousDay: '前の日',
    nextDay: '次の日',
    topics: 'topics',
  },
  en: {
    heading: 'AI NEWS DAILY',
    heroText: 'AI character news grouped by date',
    listEmpty: 'No dated news groups are available yet.',
    detailMissing: 'No news was found for this date.',
    readDay: 'View this day',
    backToList: 'Date list',
    backToNews: 'AI NEWS',
    previousDay: 'Previous day',
    nextDay: 'Next day',
    topics: 'topics',
  },
} satisfies Record<Locale, Record<string, string>>

function DailyHeader({ locale }: { locale: Locale }) {
  return (
    <section className="site-page-hero">
      <div className="character-detail-hero__grid" aria-hidden="true" />
      <div className="site-page-hero__inner">
        <h1>{copy[locale].heading}</h1>
        <p>{copy[locale].heroText}</p>
      </div>
    </section>
  )
}

function dailyHref(date: string, locale: Locale) {
  return locale === 'ja'
    ? `/ai-news/daily/${date}`
    : `/ai-news/daily/${date}?lang=en`
}

function AdjacentDailyNav({
  previousDateGroup,
  nextDateGroup,
  locale,
}: {
  previousDateGroup?: AiCharacterNewsDateGroup | null
  nextDateGroup?: AiCharacterNewsDateGroup | null
  locale: Locale
}) {
  const text = copy[locale]

  return (
    <nav className="ai-news-daily-adjacent" aria-label="AI NEWS adjacent days">
      {previousDateGroup ? (
        <a href={dailyHref(previousDateGroup.date, locale)} className="design-action-button">
          <ChevronLeft className="h-4 w-4" />
          <span>{text.previousDay}</span>
          <span className="ai-news-daily-adjacent-date">
            {formatAiNewsDateLabel(`${previousDateGroup.date}T00:00:00+09:00`, locale)}
          </span>
        </a>
      ) : (
        <span className="design-action-button ai-news-daily-adjacent-disabled" aria-disabled="true">
          <ChevronLeft className="h-4 w-4" />
          <span>{text.previousDay}</span>
        </span>
      )}

      {nextDateGroup ? (
        <a href={dailyHref(nextDateGroup.date, locale)} className="design-action-button">
          <span>{text.nextDay}</span>
          <span className="ai-news-daily-adjacent-date">
            {formatAiNewsDateLabel(`${nextDateGroup.date}T00:00:00+09:00`, locale)}
          </span>
          <ChevronRight className="h-4 w-4" />
        </a>
      ) : (
        <span className="design-action-button ai-news-daily-adjacent-disabled" aria-disabled="true">
          <span>{text.nextDay}</span>
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  )
}

export function AiNewsDailyList({ dateGroups, error, locale = 'ja' }: ListProps) {
  const text = copy[locale]

  return (
    <div className="character-page ai-news-redesign ai-news-daily-page min-h-screen">
      <DailyHeader locale={locale} />
      <main className="designed-page-main container mx-auto max-w-5xl px-4">
        <div className="mb-6">
          <a href={locale === 'ja' ? '/ai-news' : '/ai-news?lang=en'} className="design-action-button">
            <ArrowLeft className="h-4 w-4" />
            {text.backToNews}
          </a>
        </div>

        {error && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!error && dateGroups.length === 0 && (
          <div className="glass-panel p-8 text-center text-gray-600">
            {text.listEmpty}
          </div>
        )}

        {!error && dateGroups.length > 0 && (
          <div className="space-y-5">
            {dateGroups.map((group) => (
              <article key={group.date} className="glass-panel ai-news-daily-card p-6 md:p-7">
                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="ai-news-chip ai-news-chip--category">Date</span>
                  <span className="ai-news-chip inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatAiNewsDateLabel(`${group.date}T00:00:00+09:00`, locale)}
                  </span>
                  <span className="ai-news-chip">{group.count} {text.topics}</span>
                </div>
                <h2>{formatAiNewsDateLabel(`${group.date}T00:00:00+09:00`, locale)}</h2>
                <div className="mt-5 flex justify-end">
                  <a href={dailyHref(group.date, locale)} className="design-action-button">
                    {text.readDay}
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

export function AiNewsDailyDetail({
  date,
  items,
  previousDateGroup,
  nextDateGroup,
  error,
  locale = 'ja',
}: DetailProps) {
  const text = copy[locale]
  const title = formatAiNewsDateLabel(`${date}T00:00:00+09:00`, locale)

  return (
    <div className="character-page ai-news-redesign ai-news-daily-page min-h-screen">
      <DailyHeader locale={locale} />
      <main className="designed-page-main container mx-auto max-w-5xl px-4">
        <div className="ai-news-daily-toolbar">
          <div className="ai-news-daily-toolbar-links">
            <a href={locale === 'ja' ? '/ai-news/daily' : '/ai-news/daily?lang=en'} className="design-action-button">
              <ArrowLeft className="h-4 w-4" />
              {text.backToList}
            </a>
            <a href={locale === 'ja' ? '/ai-news' : '/ai-news?lang=en'} className="design-action-button">
              {text.backToNews}
            </a>
          </div>

          {!error && items.length > 0 && (
            <AdjacentDailyNav previousDateGroup={previousDateGroup} nextDateGroup={nextDateGroup} locale={locale} />
          )}
        </div>

        {error && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!error && items.length === 0 && (
          <div className="glass-panel p-8 text-center text-gray-600">
            {text.detailMissing}
          </div>
        )}

        {!error && items.length > 0 && (
          <>
            <section className="ai-news-date-group">
              <h2 className="ai-news-date-heading">{title}</h2>
              <div className="space-y-5">
                {items.map((item, index) => (
                  <AiNewsCard key={item.id} item={item} index={index} locale={locale} />
                ))}
              </div>
            </section>

            <AdjacentDailyNav previousDateGroup={previousDateGroup} nextDateGroup={nextDateGroup} locale={locale} />
          </>
        )}
      </main>
    </div>
  )
}
