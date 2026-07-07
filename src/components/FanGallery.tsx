import { GalleryToggle } from './GalleryToggle'
import { GalleryItem } from './GalleryItem'
import { fanArts } from '../utils/fanArtsData'
import { shuffle } from '../utils/galleryData'
import { getOptimizedImageSources } from '../utils/imageOptimization'
import { getT, type Locale } from '../i18n/config'

type Props = {
  locale?: Locale;
}

// このページはハイドレートされない（サーバーでHTML文字列を生成するだけ）。
// 追加読み込みはReactの状態ではなく、client.tsx側のvanilla JS
// （setupFanGalleryInfiniteScroll）が data-fan-gallery-remaining の
// JSONを読んで DOM に直接ノードを足す方式で行う。
const PAGE_SIZE = 24

function buildItemMeta(t: ReturnType<typeof getT>, author: string) {
  const isAnonymous = author.startsWith('xxx_')
  return {
    alt: isAnonymous ? '' : t('gallery:fan.altText', { author }),
    caption: isAnonymous ? '' : t('gallery:fan.caption', { author }),
    url: isAnonymous ? undefined : `https://x.com/${encodeURIComponent(author)}`,
  }
}

export function FanGallery({ locale = 'ja' }: Props) {
  const t = getT(locale);
  const shuffled = shuffle([...fanArts])
  const initialItems = shuffled.slice(0, PAGE_SIZE)
  const remainingItems = shuffled.slice(PAGE_SIZE)
  const hasMore = remainingItems.length > 0

  const remainingPayload = remainingItems.map(({ src, author }) => {
    const optimized = getOptimizedImageSources(src)
    const meta = buildItemMeta(t, author)
    return {
      dataSrc: src,
      src: optimized?.src ?? src,
      srcSet: optimized?.srcSet,
      alt: meta.alt,
      caption: meta.caption,
      url: meta.url,
    }
  })

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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-fan-gallery-list>
              {initialItems.map(({ src, author }) => (
                <GalleryItem
                  key={src}
                  src={src}
                  {...buildItemMeta(t, author)}
                  className="aspect-square"
                  imageSizes="(max-width: 768px) 50vw, 25vw"
                />
              ))}
            </div>
            {hasMore && (
              <div data-fan-gallery-sentinel className="mt-8 py-4 text-center text-sm text-gray-500" aria-hidden="true">
                {t('gallery:fan.loading')}
              </div>
            )}
            {hasMore && (
              <script
                type="application/json"
                data-fan-gallery-remaining
                data-fan-gallery-page-size={PAGE_SIZE}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: JSON.stringify(remainingPayload).replace(/</g, '\\u003c') }}
              />
            )}
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
