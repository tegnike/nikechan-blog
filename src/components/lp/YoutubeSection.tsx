import { type Locale } from '../../i18n/config'
import type { LatestYoutube, YoutubeVideo } from '../../lib/youtube'

type Props = {
  locale?: Locale;
  /** 取れたときは、配信と動画のカードに最新の1本を出す */
  latest?: LatestYoutube;
  /** 前後の区画と地の色が重ならないように選ぶ */
  tone?: 'tint' | 'white';
}

const CHANNEL_URL = 'https://www.youtube.com/@nikechan'

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
  </svg>
)

const LatestCard = ({ video, label, date }: { video: YoutubeVideo; label: string; date: string }) => (
  <a className="nk-post nk-youtube__card" href={video.url} target="_blank" rel="noopener noreferrer">
    <div className="nk-post__img nk-youtube__thumb">
      <img src={video.thumbnail} alt="" loading="lazy" width="480" height="360" />
    </div>
    <span className="nk-youtube__label">
      {label}
      <time className="nk-youtube__date" dateTime={video.publishedAt}>{date}</time>
    </span>
    <b>{video.title}</b>
  </a>
)

/** YouTubeチャンネルの案内（トップページ用） */
export function YoutubeSection({ locale = 'ja', tone = 'tint', latest }: Props) {
  const t = (ja: string, en: string) => (locale === 'ja' ? ja : en)
  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en-US', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: locale === 'ja' ? 'numeric' : 'short',
      day: 'numeric',
    }).format(new Date(iso))

  const programs = [
    {
      latest: latest?.stream ?? null,
      latestLabel: t('最新の配信', 'Latest stream'),
      moreLabel: t('配信の一覧へ', 'All streams'),
      href: `${CHANNEL_URL}/streams`,
      image: '/static/images/news/youtube-news-stream/thumbnail.jpg',
      label: t('配信', 'Live'),
      title: t('AIニュース配信', 'AI news livestreams'),
      description: t(
        '開発者ニケとAIニケちゃんが、AIキャラクターやAIのニュースを紹介。日本時間20時ごろを中心に配信しています。',
        'Developer Nike and AI Nike-chan cover AI character and AI news, mostly around 8 p.m. JST.'
      ),
    },
    {
      latest: latest?.video ?? null,
      latestLabel: t('最新の動画', 'Latest video'),
      moreLabel: t('動画の一覧へ', 'All videos'),
      href: `${CHANNEL_URL}/videos`,
      image: '/static/images/news/youtube-videos/thumbnail.jpg',
      label: t('動画', 'Videos'),
      title: t('解説動画', 'Explainer videos'),
      description: t(
        'つくったものの紹介や、新しいAIツールの検証を動画で投稿しています。',
        'Videos introducing what we build and testing new AI tools.'
      ),
    },
  ]

  return (
    <section className={`nk-sec nk-youtube nk-youtube--${tone}`} id="youtube" aria-labelledby="youtube-title">
      <div className="site-shell nk-youtube__in">
        <div className="nk-youtube__lead">
          <h2 className="nk-sec-title" id="youtube-title">YouTube</h2>
          <p className="nk-sec-sub">{t('チャンネル「ニケちゃんねる」', 'Nike Channel (ニケちゃんねる)')}</p>
          <p className="nk-youtube__text">
            {t(
              'AIニュースの配信や解説動画を投稿しています。おかげさまで登録者は1,000人を超えました。',
              'AI news livestreams and explainer videos. The channel has passed 1,000 subscribers.'
            )}
          </p>
          <a className="nk-btn nk-youtube__btn" href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
            <YoutubeIcon />
            {t('チャンネルを見る', 'Visit the channel')}
          </a>
        </div>
        <ul className="nk-youtube__list">
          {programs.map((program) => (
            <li key={program.href}>
              {program.latest ? (
                <LatestCard video={program.latest} label={program.latestLabel} date={formatDate(program.latest.publishedAt)} />
              ) : (
                <a className="nk-post nk-youtube__card" href={program.href} target="_blank" rel="noopener noreferrer">
                  <div className="nk-post__img">
                    <img src={program.image} alt="" loading="lazy" width="1280" height="720" />
                  </div>
                  <span className="nk-youtube__label">{program.label}</span>
                  <b>{program.title}</b>
                  <p>{program.description}</p>
                </a>
              )}
              <a className="nk-youtube__more" href={program.href} target="_blank" rel="noopener noreferrer">
                {program.moreLabel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
