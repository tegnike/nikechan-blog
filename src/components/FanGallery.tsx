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
    <div className="character-page gallery-redesign min-h-screen">
      <section className="site-page-hero" aria-labelledby="gallery-title">
        <div className="character-detail-hero__grid" aria-hidden="true" />
        <div className="site-page-hero__inner">
          <h1 id="gallery-title">GALLERY</h1>
          <p>{locale === 'ja' ? 'AIニケちゃんのファンアートと作品をまとめたギャラリー' : 'Fan art and works featuring AI Nike-chan'}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative">
        <div className="character-showcase-bg absolute inset-0" />
        <div className="designed-page-main relative z-10 max-w-7xl mx-auto px-4 py-8">
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
                  imageSizes="(max-width: 768px) 50vw, 25vw"
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
