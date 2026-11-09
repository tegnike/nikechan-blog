import { getT, type Locale } from '../../i18n/config';
import { withLang } from '../../utils/langPath';
import { Blob } from './Blob';

type Props = {
  locale?: Locale;
}

export function LicenseSection({ locale = 'ja' }: Props) {
  const t = getT(locale);
  const features = t('home:license.features', { returnObjects: true }) as string[];

  return (
    <section className="nk-sec nk-create" id="create">
      <Blob className="nk-create__blob" shape={2} />
      <div className="site-shell nk-create__in">
        <div>
          <h2 className="nk-create__title">{t('home:license.heading')}</h2>
          <ul className="nk-create__list">
            {features.map((feature) => (
              // 文言の末尾の「OK」を右端に大きく置く
              <li key={feature}>
                {feature.replace(/\s*OK$/, '')}
                <em>OK</em>
              </li>
            ))}
          </ul>
          <p className="nk-create__desc">{t('home:license.description')}</p>
          <div className="nk-create__actions">
            <a className="nk-btn" href={withLang('/tutorials', locale)}>{t('home:license.cta.tutorial')}</a>
            <a className="nk-btn nk-btn--ghost" href={withLang('/guidelines', locale)}>{t('home:license.cta.guidelines')}</a>
          </div>
          <p className="nk-create__note">{t('home:license.disclaimer')}</p>
        </div>

        <div className="nk-create__example">
          <h3>{t('home:license.example.heading')}</h3>
          <div className="nk-create__pair">
            <figure>
              <figcaption>{t('home:license.example.input')}</figcaption>
              <img src="/images/lp/guideline1.webp" alt="i2i input example" loading="lazy" />
            </figure>
            <figure>
              <figcaption>{t('home:license.example.output')}</figcaption>
              <img src="/images/lp/guideline2.webp" alt="i2i output example" loading="lazy" />
            </figure>
          </div>
          <div className="nk-create__prompt">
            <span>Prompt</span>
            <p>{t('home:license.example.prompt')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
