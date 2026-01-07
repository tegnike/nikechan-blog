import { getT, type Locale } from '../../i18n/config';
import { getRandomGalleryItems } from '../../utils/galleryData';

type Props = {
  locale?: Locale;
}

export function GallerySection({ locale = 'ja' }: Props) {
  const t = getT(locale);
  const galleryItems = getRandomGalleryItems(8);

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* 見出し */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#594A89] text-center mb-12">
          {t('home:gallery.heading')}
        </h2>

        {/* ギャラリーグリッド */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-xl overflow-hidden shadow-lg group cursor-pointer"
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* オーバーレイ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* キャプション */}
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs sm:text-sm font-medium truncate">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/80 border border-gray-300 text-gray-700 font-medium hover:bg-white hover:text-pink-500 hover:border-pink-300 hover:shadow-lg hover:scale-105 transition-all duration-300"
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
