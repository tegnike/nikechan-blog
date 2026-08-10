import { ArrowLeft, CalendarDays, Download, ExternalLink, FileText, Presentation } from 'lucide-react'
import { type Locale } from '../i18n/config'
import {
  type DeveloperActivity,
  type DeveloperActivityKind,
  type LocalizedText,
} from '../utils/developerActivities'

type Props = {
  activity: DeveloperActivity
  locale: Locale
}

const kindLabels: Record<DeveloperActivityKind, LocalizedText> = {
  talk: { ja: '登壇', en: 'Talk' },
  exhibition: { ja: '出展', en: 'Exhibition' },
  participation: { ja: '参加', en: 'Participation' },
}

const formatDate = (date: string, locale: Locale) => {
  const [year, month, day] = date.split('-')
  return locale === 'ja'
    ? `${year}.${month}.${day}`
    : `${month}/${day}/${year}`
}

export function ActivityDetail({ activity, locale }: Props) {
  const slides = activity.slides
  const localize = (text: LocalizedText) => text[locale]
  const langQuery = locale === 'ja' ? '' : '?lang=en'

  if (!slides) return null

  return (
    <div className="character-page activity-detail-page min-h-screen">
      <section className="site-page-hero" aria-labelledby="activity-detail-title">
        <div className="character-detail-hero__grid" aria-hidden="true" />
        <div className="site-page-hero__inner">
          <h1 id="activity-detail-title">TALK SLIDES</h1>
          <p>{localize(activity.title)}</p>
        </div>
      </section>

      <main className="character-detail-main activity-detail-page__main">
        <div className="character-back-section">
          <a href={`/activities${langQuery}`} className="character-back-link">
            <ArrowLeft aria-hidden="true" />
            <span>{locale === 'ja' ? 'イベント・登壇記録へ戻る' : 'Back to Events & Talks'}</span>
          </a>
        </div>

        <section className="glass-panel activity-detail-summary" aria-labelledby="activity-slide-title">
          <div className="activity-detail-summary__meta">
            <span className={`developer-activity-card__kind developer-activity-card__kind--${activity.kind}`}>
              {localize(kindLabels[activity.kind])}
            </span>
            <time dateTime={activity.date}>
              <CalendarDays aria-hidden="true" />
              {formatDate(activity.date, locale)}
            </time>
          </div>
          <h2 id="activity-slide-title">{localize(slides.title)}</h2>
          <p>{localize(activity.description)}</p>
          <ul className="activity-detail-summary__topics" aria-label={locale === 'ja' ? 'テーマ' : 'Topics'}>
            {activity.topics.map((topic) => (
              <li key={localize(topic)}>{localize(topic)}</li>
            ))}
          </ul>
          <div className="activity-detail-summary__links">
            {activity.links.map((link) => {
              const url = localize(link.url)
              const isExternal = url.startsWith('http')

              return (
                <a
                  key={localize(link.label)}
                  href={url}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {localize(link.label)}
                  <ExternalLink aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </section>

        <section className="glass-panel activity-slide-viewer" aria-labelledby="slide-viewer-heading">
          <div className="activity-slide-viewer__heading">
            <div>
              <span className="activity-slide-viewer__eyebrow">
                <Presentation aria-hidden="true" />
                PRESENTATION
              </span>
              <h2 id="slide-viewer-heading">
                {locale === 'ja' ? '登壇スライド' : 'Presentation slides'}
              </h2>
              <p>
                {locale === 'ja'
                  ? `全${slides.pageCount}ページ。下にスクロールしてそのまま閲覧できます。`
                  : `${slides.pageCount} pages. Scroll down to read the complete deck.`}
              </p>
            </div>
            <div className="activity-slide-viewer__actions">
              <a href={slides.url} target="_blank" rel="noopener noreferrer">
                <FileText aria-hidden="true" />
                {locale === 'ja' ? 'PDFを開く' : 'Open PDF'}
              </a>
              <a href={slides.url} download>
                <Download aria-hidden="true" />
                {locale === 'ja' ? 'ダウンロード' : 'Download'}
              </a>
            </div>
          </div>

          <ol className="activity-slide-deck" aria-label={locale === 'ja' ? '登壇スライド一覧' : 'Presentation slide deck'}>
            {Array.from({ length: slides.pageCount }, (_, index) => {
              const pageNumber = index + 1
              const pageFilename = `slide-${String(pageNumber).padStart(2, '0')}.webp`

              return (
                <li key={pageNumber} id={`slide-${pageNumber}`}>
                  <figure>
                    <img
                      src={`${slides.imageDirectory}/${pageFilename}`}
                      alt={`${localize(slides.title)} - ${locale === 'ja' ? 'スライド' : 'slide'} ${pageNumber}`}
                      loading={pageNumber === 1 ? 'eager' : 'lazy'}
                      decoding="async"
                      width="1440"
                      height="810"
                    />
                    <figcaption>{pageNumber} / {slides.pageCount}</figcaption>
                  </figure>
                </li>
              )
            })}
          </ol>
        </section>
      </main>
    </div>
  )
}
