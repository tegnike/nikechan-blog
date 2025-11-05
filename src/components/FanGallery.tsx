import { GalleryToggle } from './GalleryToggle'
import { GalleryItem } from './GalleryItem'
import { fanArts } from '../utils/fanArtsData'
import { shuffle } from '../utils/galleryData'
import { getT, type Locale } from '../i18n/config'

type Props = {
  locale?: Locale;
}

export function FanGallery({ locale = 'ja' }: Props) {
  const t = getT(locale);

  return (
    <>
      <div className="pb-4">
        <div className="pt-12 pb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground">{t('gallery:heading')}</h1>
        </div>
        <GalleryToggle active="fan" locale={locale} />
        <div className="mx-auto mt-4 w-full max-w-4xl px-4">
          <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-900">
            <p className="text-sm leading-relaxed">
              {t('gallery:fan.notice')}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          {shuffle([...fanArts]).map(({ src, author }) => (
            <GalleryItem
              key={src}
              src={src}
              alt={author.startsWith('xxx_') ? "" : t('gallery:fan.altText', { author })}
              caption={author.startsWith('xxx_') ? "" : t('gallery:fan.caption', { author })}
              url={author.startsWith('xxx_') ? undefined : `https://x.com/${encodeURIComponent(author)}`}
              className="aspect-square"
            />
          ))}
        </div>
      </div>
    </>
  )
}
