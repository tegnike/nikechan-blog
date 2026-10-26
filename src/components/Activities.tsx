import { ArrowLeft } from 'lucide-react'
import { type Locale } from '../i18n/config'
import { DeveloperActivities } from './DeveloperActivities'

type Props = {
  locale: Locale
}

export function Activities({ locale }: Props) {
  const langQuery = locale === 'ja' ? '' : '?lang=en'

  return (
    <div className="character-page activities-page min-h-screen">
      <section className="site-page-hero" aria-labelledby="activities-page-title">
        <div className="character-detail-hero__grid" aria-hidden="true" />
        <div className="site-page-hero__inner">
          <h1 id="activities-page-title">EVENTS, MEDIA &amp; WRITING</h1>
          <p>
            {locale === 'ja'
              ? '開発者ニケのイベント参加・展示・登壇、メディア掲載、執筆の記録'
              : 'A record of Nike’s events, exhibitions, talks, media coverage, and writing'}
          </p>
        </div>
      </section>

      <main className="character-detail-main activities-page__main">
        <div className="character-back-section">
          <a href={`/developer${langQuery}`} className="character-back-link">
            <ArrowLeft aria-hidden="true" />
            <span>{locale === 'ja' ? '開発者情報へ戻る' : 'Back to Developer'}</span>
          </a>
        </div>
        <DeveloperActivities locale={locale} />
      </main>
    </div>
  )
}
