import { getT, type Locale } from '../i18n/config';

type Props = {
  active: 'fan' | 'commissioned';
  locale?: Locale;
}

export function GalleryToggle({ active, locale = 'ja' }: Props) {
  const t = getT(locale);

  const baseClass = 'design-toggle-link';
  const activeClass = 'design-toggle-link--active';
  const inactiveClass = 'design-toggle-link--inactive';

  return (
    <div className="design-toggle">
      <a
        href={`/gallery${locale !== 'ja' ? '?lang=' + locale : ''}`}
        className={`${baseClass} ${active === 'fan' ? activeClass : inactiveClass}`}
      >
        {t('gallery:toggle.fan')}
      </a>
      <a
        href={`/gallery/commissioned${locale !== 'ja' ? '?lang=' + locale : ''}`}
        className={`${baseClass} ${active === 'commissioned' ? activeClass : inactiveClass}`}
      >
        {t('gallery:toggle.commissioned')}
      </a>
    </div>
  )
}
