import { getT, type Locale } from '../../i18n/config';

type Props = {
  locale?: Locale;
}

export function LicenseSection({ locale = 'ja' }: Props) {
  const t = getT(locale);
  const features = t('home:license.features', { returnObjects: true }) as string[];

  return (
    <section className="home-license-section py-10 sm:py-16 px-2 sm:px-6">
      <div className="site-shell">
        <h2 className="home-section-title">
          {t('home:license.heading')}
        </h2>

        <div className="glass-panel home-license-panel">
          <div className="home-license-layout">
            <div className="home-license-copy">
              <div className="home-section-subheading">
                <span>GENERATIVE AI</span>
                <h3>{locale === 'ja' ? '作る前に、使い方だけ確認' : 'Check the rules before creating'}</h3>
              </div>

              <p className="home-license-description">
                {t('home:license.description')}
              </p>

              <ul className="home-license-feature-list">
                {features.map((feature, index) => (
                  <li key={index}>
                    <span className="home-license-check">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="home-license-actions">
                <a
                  href="/tutorials"
                  className="design-action-button"
                >
                  {t('home:license.cta.tutorial')}
                </a>
                <a
                  href="/guidelines"
                  className="design-action-button"
                >
                  {t('home:license.cta.guidelines')}
                </a>
              </div>

              <p className="home-license-disclaimer">
                {t('home:license.disclaimer')}
              </p>
            </div>

            <div className="home-license-example">
              <div className="home-section-subheading">
                <span>IMAGE TO IMAGE</span>
                <h3>{t('home:license.example.heading')}</h3>
              </div>

              <div className="home-license-example-grid">
                <figure>
                  <figcaption>
                    {t('home:license.example.input')}
                  </figcaption>
                  <img
                    src="/images/lp/guideline1.webp"
                    alt="i2i input example"
                    loading="lazy"
                  />
                </figure>
                <figure>
                  <figcaption>
                    {t('home:license.example.output')}
                  </figcaption>
                  <img
                    src="/images/lp/guideline2.webp"
                    alt="i2i output example"
                    loading="lazy"
                  />
                </figure>
              </div>

              <div className="home-license-prompt">
                <span>Prompt</span>
                <p>
                  {t('home:license.example.prompt')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
