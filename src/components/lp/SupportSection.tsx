import { getT, type Locale } from '../../i18n/config';

type Props = {
  locale?: Locale;
}

export function SupportSection({ locale = 'ja' }: Props) {
  const t = getT(locale);
  const fanboxFeatures = t('home:support.fanbox.features', { returnObjects: true }) as string[];
  const discordFeatures = t('home:support.discord.features', { returnObjects: true }) as string[];

  return (
    <section className="home-support-section py-10 sm:py-16 px-2 sm:px-6">
      <div className="site-shell">
        {/* 見出し */}
        <h2 className="home-section-title">
          {t('home:support.heading')}
        </h2>

        {/* 2カラムグリッド */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FANBOX カード */}
          <div className="glass-panel home-support-card home-support-card--fanbox">
            <div className="home-support-card__head">
              <div className="home-support-card__icon">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3>
                {t('home:support.fanbox.heading')}
              </h3>
            </div>

            <p className="home-support-card__description">
              {t('home:support.fanbox.description')}
            </p>

            <ul className="home-support-card__list">
              {fanboxFeatures.map((feature, index) => (
                <li key={index}>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <a
                href="https://nikechan.fanbox.cc/"
                target="_blank"
                rel="noopener noreferrer"
                className="design-action-button"
              >
                {t('home:support.fanbox.cta')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Discord カード */}
          <div className="glass-panel home-support-card home-support-card--discord">
            <div className="home-support-card__head">
              <div className="home-support-card__icon">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>
              <h3>
                {t('home:support.discord.heading')}
              </h3>
            </div>

            <p className="home-support-card__description">
              {t('home:support.discord.description')}
            </p>

            <div className="mb-4">
              <p className="home-support-card__subhead">
                {t('home:support.discord.featuresHeading')}
              </p>
              <ul className="home-support-card__list">
                {discordFeatures.map((feature, index) => (
                  <li key={index}>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="home-support-card__note">
              {t('home:support.discord.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
