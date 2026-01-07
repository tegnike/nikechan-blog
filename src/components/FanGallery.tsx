import { PageHeader } from './PageHeader'
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
    <div className="character-page min-h-screen">
      <PageHeader title="GALLERY" />

      {/* Main Content */}
      <div className="relative">
        <div className="character-showcase-bg absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
          {/* Toggle */}
          <GalleryToggle active="fan" locale={locale} />

          {/* Notice */}
          <div className="mx-auto mt-6 w-full max-w-4xl">
            <div className="glass-panel px-6 py-4">
              <p className="text-sm leading-relaxed text-gray-700">
                {t('gallery:fan.notice')}
              </p>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        </div>
      </div>

      {/* Decorative Footer Gradient */}
      <div className="character-footer h-16 relative overflow-hidden">
        <div className="character-footer-gradient absolute inset-0" />
      </div>
    </div>
  )
}
