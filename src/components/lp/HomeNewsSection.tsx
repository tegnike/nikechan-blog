import { getT, type Locale } from '../../i18n/config'
import { withLang } from '../../utils/langPath'
import { newsLinks } from '../../utils/newsLinks'

type Props = {
  locale?: Locale;
  limit?: number;
}

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  externalLink?: string;
}

/** "2026・9" → "2026.09" */
export function formatNewsDate(date: string): string {
  const match = date.match(/(\d{4})・(\d{1,2})/)
  return match ? `${match[1]}.${match[2].padStart(2, '0')}` : date
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/** トップページ用のお知らせ一覧。詳細は /updates に任せ、ここでは日付とタイトルだけ見せる */
export function HomeNewsSection({ locale = 'ja', limit = 4 }: Props) {
  const t = getT(locale)
  const items = (t('home:news.items', { returnObjects: true }) as NewsItem[]).slice(0, limit)

  return (
    <section className="nk-sec" id="news">
      <div className="site-shell nk-news">
        <div>
          <h2 className="nk-sec-title">News</h2>
          <p className="nk-sec-sub">{t('home:news.heading')}</p>
          <a className="nk-btn nk-btn--ghost" href={withLang('/updates', locale)}>{t('home:news.all')}</a>
        </div>
        <ul className="nk-news__list">
          {items.map((item) => {
            const internal = newsLinks[item.id]
            const isExternal = Boolean(item.externalLink) || Boolean(internal?.startsWith('http'))
            const href = item.externalLink ?? (internal ? (isExternal ? internal : withLang(internal, locale)) : withLang('/updates', locale))
            return (
              <li key={item.id}>
                <a href={href} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <time>{formatNewsDate(item.date)}</time>
                  <b>{item.title}</b>
                  <Arrow />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  );
}
