import { type Locale } from '../../i18n/config'

type Props = {
  locale?: Locale;
  /** 前後の区画と地の色が重ならないように選ぶ */
  tone?: 'tint' | 'white';
}

const CHANNEL_URL = 'https://www.youtube.com/@nikechan'

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
  </svg>
)

/** YouTubeチャンネルの案内。トップページとアバウトページで共用する */
export function YoutubeSection({ locale = 'ja', tone = 'tint' }: Props) {
  const t = (ja: string, en: string) => (locale === 'ja' ? ja : en)

  const programs = [
    {
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
      href: `${CHANNEL_URL}/videos`,
      image: '/static/images/news/youtube-videos/thumbnail.jpg',
      label: t('動画', 'Videos'),
      title: t('解説動画とショート', 'Explainers and Shorts'),
      description: t(
        'つくったものの紹介や、新しいAIツールの検証を動画で。AIニュースを短く伝えるショートも投稿しています。',
        'Videos introducing what we build and testing new AI tools, plus Shorts with quick AI news.'
      ),
    },
  ]

  return (
    <section className={`nk-sec nk-youtube nk-youtube--${tone}`} id="youtube" aria-labelledby="youtube-title">
      <div className="site-shell nk-youtube__in">
        <div className="nk-youtube__lead">
          <h2 className="nk-sec-title" id="youtube-title">YouTube</h2>
          <p className="nk-sec-sub">{t('チャンネル「ニケちゃん」', 'The “Nike-chan” channel')}</p>
          <p className="nk-youtube__text">
            {t(
              'AIニュースの配信、解説動画、ショートを投稿しています。おかげさまで登録者は1,000人を超えました。',
              'AI news livestreams, explainer videos, and Shorts. The channel has passed 1,000 subscribers.'
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
              <a className="nk-post nk-youtube__card" href={program.href} target="_blank" rel="noopener noreferrer">
                <div className="nk-post__img">
                  <img src={program.image} alt="" loading="lazy" width="1280" height="720" />
                </div>
                <span className="nk-youtube__label">{program.label}</span>
                <b>{program.title}</b>
                <p>{program.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
