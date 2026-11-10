import { getT, type Locale } from '../../i18n/config'
import { getOptimizedImageSources } from '../../utils/imageOptimization'
import { withLang } from '../../utils/langPath'
import { Blob } from './Blob'
import { formatNewsDate, type NewsItem } from './HomeNewsSection'

type Props = {
  locale?: Locale;
}

const LOGO = '/images/logos/logo_with_frame_and_shadow.png'

// 同じセッションで2回目以降はオープニングを省く。描画前に判定するためインラインで実行する
const skipOpeningScript = `try{if(sessionStorage.getItem('nkOpened')){document.documentElement.classList.add('nk-skip-opening')}else{sessionStorage.setItem('nkOpened','1')}}catch(e){}`

export function WelcomeSection({ locale = 'ja' }: Props) {
  const t = getT(locale)
  const copy = t('home:hero.copy', { returnObjects: true }) as string[]
  const latestNews = (t('home:news.items', { returnObjects: true }) as NewsItem[])[0]
  const logo = getOptimizedImageSources(LOGO)

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: skipOpeningScript }} />
      <div className="nk-opening" aria-hidden="true">
        <i></i><i></i><i></i>
        <img src={logo?.src ?? LOGO} srcSet={logo?.srcSet} sizes="420px" alt="" />
      </div>

      <section className="nk-hero" aria-label={t('home:hero.ariaLabel')} data-home-hero>
        <Blob className="nk-blob nk-blob--a" />
        <Blob className="nk-blob nk-blob--b" shape={2} />
        <Blob className="nk-blob nk-blob--c" />
        <Blob className="nk-blob nk-blob--d" shape={2} />
        <Blob className="nk-blob nk-blob--e" />

        <div className="nk-hero__marquee" aria-hidden="true">
          <span>nike-chan</span><span>nike-chan</span><span>nike-chan</span><span>nike-chan</span>
        </div>

        <div className="nk-hero__chara-wrap">
          <img
            className="nk-hero__chara"
            src="/images/lp/top.webp"
            width="864"
            height="1184"
            alt={t('home:hero.charaAlt')}
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <h1 className={`nk-hero__copy ${locale === 'ja' ? '' : 'nk-hero__copy--horizontal'}`}>
          {copy.map((line) => (
            <span key={line}>
              {/* 縦書きでも「AI」を横に並べる */}
              {locale === 'ja' && line.startsWith('AI')
                ? <><i className="nk-tcy">AI</i>{line.slice(2)}</>
                : line}
            </span>
          ))}
        </h1>

        {latestNews && (
          <a className="nk-hero__news" href={withLang('/updates', locale)}>
            <small>{formatNewsDate(latestNews.date)}</small>
            <p>{latestNews.title}</p>
          </a>
        )}
      </section>
    </>
  );
}
