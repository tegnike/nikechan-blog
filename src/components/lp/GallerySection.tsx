import { getT, type Locale } from '../../i18n/config';
import { getRandomGalleryItems } from '../../utils/galleryData';
import { withLang } from '../../utils/langPath';

type Props = {
  locale?: Locale;
}

type GalleryItem = ReturnType<typeof getRandomGalleryItems>[number];

/** 途切れずに流すため、同じ並びを2回続けて置く。2回目は読み上げとキーボード操作の対象から外す */
function MarqueeRow({ items, href }: { items: GalleryItem[]; href: string }) {
  return (
    <div className="nk-gallery__row">
      {[0, 1].map((copy) =>
        items.map((item) => (
          <a
            key={`${copy}-${item.id}`}
            href={href}
            aria-hidden={copy === 1 ? true : undefined}
            tabIndex={copy === 1 ? -1 : undefined}
          >
            <img src={item.src} alt={copy === 0 ? item.alt : ''} width={260} height={260} loading="lazy" decoding="async" />
          </a>
        ))
      )}
    </div>
  );
}

export function GallerySection({ locale = 'ja' }: Props) {
  const t = getT(locale);
  const items = getRandomGalleryItems(16);
  const href = withLang('/gallery', locale);

  return (
    <section className="nk-sec nk-gallery" id="gallery">
      <div className="site-shell nk-sec-head">
        <div>
          <h2 className="nk-sec-title">Gallery</h2>
          <p className="nk-sec-sub">{t('home:gallery.heading')}</p>
        </div>
        <a className="nk-btn" href={href}>{t('home:gallery.cta')}</a>
      </div>
      <div className="nk-gallery__band">
        <MarqueeRow items={items.slice(0, 8)} href={href} />
        <MarqueeRow items={items.slice(8)} href={href} />
      </div>
    </section>
  );
}
