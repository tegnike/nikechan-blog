import { getT, type Locale } from '../i18n/config';

type Props = {
  active: 'fan' | 'commissioned';
  locale?: Locale;
}

export function GalleryToggle({ active, locale = 'ja' }: Props) {
  const t = getT(locale);
  const base = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors';
  const activeClass = 'bg-purple-600 text-white';
  const inactiveClass = 'bg-white/50 border border-purple-200 text-gray-800 hover:bg-purple-50';

  return (
    <div className="w-full flex items-center justify-center gap-3 mt-2 mb-6">
      <a
        href={`/gallery${locale !== 'ja' ? '?lang=' + locale : ''}`}
        className={`${base} ${active === 'fan' ? activeClass : inactiveClass}`}
      >
        {t('gallery:toggle.fan')}
      </a>
      <a
        href={`/gallery/commissioned${locale !== 'ja' ? '?lang=' + locale : ''}`}
        className={`${base} ${active === 'commissioned' ? activeClass : inactiveClass}`}
      >
        {t('gallery:toggle.commissioned')}
      </a>
    </div>
  )
}
