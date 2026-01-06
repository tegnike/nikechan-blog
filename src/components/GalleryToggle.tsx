import { getT, type Locale } from '../i18n/config';

type Props = {
  active: 'fan' | 'commissioned';
  locale?: Locale;
}

export function GalleryToggle({ active, locale = 'ja' }: Props) {
  const t = getT(locale);

  const baseClass = 'px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200';
  const activeClass = 'bg-white text-pink-500 shadow-md border border-pink-200';
  const inactiveClass = 'bg-white/80 text-gray-600 border border-gray-300 hover:bg-white hover:text-pink-500 hover:border-pink-300 hover:shadow-lg hover:scale-105';

  return (
    <div className="w-full flex items-center justify-center gap-3 mt-2 mb-6">
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
