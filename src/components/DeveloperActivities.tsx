import { CalendarDays, ExternalLink } from 'lucide-react'
import { type Locale } from '../i18n/config'
import {
  developerActivities,
  type DeveloperActivityKind,
  type LocalizedText,
} from '../utils/developerActivities'
import { CharacterSectionHeading } from './CharacterDetail'

type Props = {
  locale: Locale
}

const kindLabels: Record<DeveloperActivityKind, LocalizedText> = {
  talk: { ja: '登壇', en: 'TALK' },
  exhibition: { ja: '出展', en: 'EXHIBITION' },
  participation: { ja: '参加', en: 'PARTICIPATION' },
}

const formatDate = (date: string, locale: Locale) => {
  const [year, month, day] = date.split('-')
  return locale === 'ja'
    ? `${year}.${month}.${day}`
    : `${month}/${day}/${year}`
}

export function DeveloperActivities({ locale }: Props) {
  const localize = (text: LocalizedText) => text[locale]

  return (
    <section id="activities" className="glass-panel developer-activities scroll-mt-28" aria-labelledby="activities-title">
      <div className="developer-activities__heading">
        <CharacterSectionHeading
          label="EVENTS & TALKS"
          title={locale === 'ja' ? 'イベント参加・登壇記録' : 'Events, exhibitions, and talks'}
          headingId="activities-title"
        />
        <p>
          {locale === 'ja'
            ? 'ニケが参加したイベント、展示、登壇の公開記録です。制作物をどこで、どのように共有したかを残していきます。'
            : 'A public record of events, exhibitions, and talks by Nike—documenting where the work was shared and what was presented.'}
        </p>
      </div>

      <ol className="developer-activities__list">
        {developerActivities.map((activity) => (
          <li key={`${activity.date}-${activity.kind}`} className="developer-activity-card">
            <div className="developer-activity-card__meta">
              <span className={`developer-activity-card__kind developer-activity-card__kind--${activity.kind}`}>
                {localize(kindLabels[activity.kind])}
              </span>
              <time dateTime={activity.date}>
                <CalendarDays aria-hidden="true" />
                {formatDate(activity.date, locale)}
              </time>
            </div>

            <div className="developer-activity-card__body">
              <h3>{localize(activity.title)}</h3>
              <p>{localize(activity.description)}</p>
              <ul className="developer-activity-card__topics" aria-label={locale === 'ja' ? 'テーマ' : 'Topics'}>
                {activity.topics.map((topic) => (
                  <li key={localize(topic)}>{localize(topic)}</li>
                ))}
              </ul>
              <div className="developer-activity-card__links">
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
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
