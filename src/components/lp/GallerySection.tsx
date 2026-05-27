import { getT, type Locale } from '../../i18n/config';
import { getRandomGalleryItems } from '../../utils/galleryData';

type Props = {
  locale?: Locale;
}

export function GallerySection({ locale = 'ja' }: Props) {
  const t = getT(locale);
  const galleryItems = getRandomGalleryItems(8);

  return (
    <section className="home-gallery-section gallery-redesign py-10 sm:py-16 px-2 sm:px-6">
      <div className="site-shell">
        {/* 見出し */}
        <h2 className="home-section-title">
          {t('home:gallery.heading')}
        </h2>

        {/* ギャラリーグリッド */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {galleryItems.map((item, index) => (
            <a
              key={item.id}
              href="/gallery"
              className="relative aspect-square overflow-hidden group cursor-pointer gallery-item home-gallery-item"
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <a
            href="/gallery"
            className="design-action-button"
          >
            {t('home:gallery.cta')}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
