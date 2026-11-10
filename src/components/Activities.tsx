import { ArrowLeft } from 'lucide-react'
import { type Locale } from '../i18n/config'
import { CONTACT_EMAIL } from './ContactEmailLink'
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

        <section className="nk-request" aria-labelledby="activities-request-title">
          <div>
            <h2 id="activities-request-title">
              {locale === 'ja' ? '登壇・取材・執筆のご依頼を受け付けています' : 'Open to talks, interviews, and writing'}
            </h2>
            <p>
              {locale === 'ja'
                ? 'AIキャラクターやAIエージェントの開発・運用について、イベント登壇、メディア取材、記事の執筆・寄稿などのご相談を受け付けています。内容が固まっていない段階でも、お気軽にお声がけください。'
                : 'Nike is available for event talks, media interviews, and articles on building and operating AI characters and AI agents. Feel free to reach out even at an early stage.'}
            </p>
          </div>
          <div className="nk-contact-links">
            <a href={`mailto:${CONTACT_EMAIL}`} className="nk-contact-links__mail">
              <i className="fa-solid fa-envelope" aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
            <a href="https://x.com/tegnike" target="_blank" rel="noopener noreferrer">X DM</a>
          </div>
        </section>
      </main>
    </div>
  )
}
