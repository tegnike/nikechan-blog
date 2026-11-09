import { getT, type Locale } from '../../i18n/config';

type Props = {
  locale?: Locale;
}

export function SupportSection({ locale = 'ja' }: Props) {
  const t = getT(locale);
  const fanboxFeatures = t('home:support.fanbox.features', { returnObjects: true }) as string[];
  const discordFeatures = t('home:support.discord.features', { returnObjects: true }) as string[];

  return (
    <section className="nk-sec nk-support" id="support">
      <div className="site-shell">
        <h2 className="nk-sec-title">Support</h2>
        <p className="nk-sec-sub">{t('home:support.heading')}</p>

        <div className="nk-support__grid">
          <div>
            <h3>{t('home:support.fanbox.heading')}</h3>
            <p>{t('home:support.fanbox.description')}</p>
            <ul>
              {fanboxFeatures.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
            <a
              className="nk-btn"
              href="https://nikechan.fanbox.cc/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('home:support.fanbox.cta')}
            </a>
          </div>

          <div>
            <h3>{t('home:support.discord.heading')}</h3>
            <p>{t('home:support.discord.description')}</p>
            <p className="nk-support__label">{t('home:support.discord.featuresHeading')}</p>
            <ul>
              {discordFeatures.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
            <p className="nk-support__note">{t('home:support.discord.disclaimer')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
