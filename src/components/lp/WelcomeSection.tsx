import { getT, type Locale } from '../../i18n/config'

type Props = {
  locale?: Locale;
}

export function WelcomeSection({ locale = 'ja' }: Props) {
  const t = getT(locale)

  return (
    <section
      className="home-redesign-hero"
      aria-label={t('home:hero.ariaLabel')}
    >
      <div className="character-detail-hero__grid" aria-hidden="true" />
      <div className="home-redesign-hero__inner home-redesign-hero__inner--image-only">
        <img
          src="/images/lp/top.webp"
          alt={locale === 'ja' ? "Nike Chan（ニケちゃん）のメインビジュアル - デジタルアート作品" : "Nike Chan Main Visual - Digital Art"}
          className="home-redesign-hero__image"
          loading="eager"
          width="576"
          height="800"
        />
      </div>
    </section>
  );
}
