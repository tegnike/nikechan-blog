import { getT, type Locale } from '../../i18n/config';
import { getOptimizedImageSources } from '../../utils/imageOptimization';

type Props = {
  locale?: Locale;
  limit?: number;
}

const newsLinks: Record<string, string> = {
  'ai-character-news': '/ai-news',
  'character-page': '/characters',
  'line-stamp': 'https://store.line.me/stickershop/product/32003839/ja',
  'tutorial': '/tutorials',
  'distribution': '/guidelines',
};

const youtubeVideoId = 'XGGP2Z0IFw0';

// 3ヶ月以内かどうかを判定する関数
function isWithinThreeMonths(dateStr: string): boolean {
  // dateStr は "2025・11" のような形式
  const match = dateStr.match(/(\d{4})・(\d{1,2})/);
  if (!match) return false;

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const itemDate = new Date(year, month - 1, 1);

  const now = new Date();
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);

  return itemDate >= threeMonthsAgo;
}

export function NewsSection({ locale = 'ja', limit }: Props) {
  const t = getT(locale);
  const allNewsItems = t('home:news.items', { returnObjects: true }) as Array<{
    id: string;
    tag: string;
    date: string;
    title: string;
    description: string;
    thumbnail?: string;
    cta?: string;
    externalLink?: string;
  }>;

  const newsItems = limit ? allNewsItems.slice(0, limit) : allNewsItems;
  const hasMore = limit && allNewsItems.length > limit;

  return (
    <section className="home-news-section news-redesign py-10 sm:py-16 px-2 sm:px-6">
      <div className="site-shell">
        {/* 見出し */}
        <h2 className="home-section-title">
          {t('home:news.heading')}
        </h2>

        {/* ニュースアイテム */}
        <div className="space-y-6">
          {newsItems.map((item) => {
            const showNewBadge = isWithinThreeMonths(item.date);
            const thumbnailSources = item.thumbnail ? getOptimizedImageSources(item.thumbnail) : undefined;
            return (
            <div key={item.id} className="glass-panel news-card p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* メタ情報 */}
                <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:min-w-[120px]">
                  {showNewBadge && (
                    <span className="news-badge">
                      NEW
                    </span>
                  )}
                  <span className="news-date">
                    {item.date}
                  </span>
                </div>

                {/* コンテンツ */}
                <div className="flex-1 space-y-4">
                  {item.thumbnail && (
                    <img
                      src={thumbnailSources?.src ?? item.thumbnail}
                      srcSet={thumbnailSources?.srcSet}
                      sizes="(max-width: 1024px) 100vw, 672px"
                      alt={item.title}
                      className="news-card-image w-full max-w-2xl object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <h3 className="news-card-title text-xl sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="news-card-description">
                    {item.description}
                  </p>

                  {/* YouTube埋め込み（voice-modelの場合） */}
                  {item.id === 'voice-model' && (
                    <div className="mt-4 w-full max-w-2xl">
                      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          className="news-card-embed absolute inset-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                          title="AIニケちゃん合成音声モデル披露目MV"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  {item.cta && (
                    <div className="pt-2">
                      {item.externalLink ? (
                        <a
                          href={item.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="design-action-button"
                        >
                          {item.cta}
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      ) : (
                        <a
                          href={newsLinks[item.id] || '#'}
                          className="design-action-button"
                        >
                          {item.cta}
                          <svg
                            className="w-4 h-4"
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
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
          })}
        </div>

        {/* もっと見るリンク */}
        {hasMore && (
          <div className="mt-8 text-center">
            <a
              href="/updates"
              className="design-action-button"
            >
              {locale === 'ja' ? 'すべてのアップデートを見る' : 'View All Updates'}
              <svg
                className="w-4 h-4"
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
        )}
      </div>
    </section>
  );
}
