import { getT, type Locale } from '../../i18n/config';

type Props = {
  locale?: Locale;
  limit?: number;
}

const newsLinks: Record<string, string> = {
  'character-page': '/characters',
  'line-stamp': 'https://store.line.me/stickershop/product/32003839/ja',
  'tutorial': '/tutorial',
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
    <section className="py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* 見出し */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#594A89] text-center mb-12">
          {t('home:news.heading')}
        </h2>

        {/* ニュースアイテム */}
        <div className="space-y-6">
          {newsItems.map((item) => {
            const showNewBadge = isWithinThreeMonths(item.date);
            return (
            <div key={item.id} className="glass-panel p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* メタ情報 */}
                <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:min-w-[120px]">
                  {showNewBadge && (
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white animate-pulse">
                      NEW
                    </span>
                  )}
                  <span className="text-gray-500 text-sm font-medium">
                    {item.date}
                  </span>
                </div>

                {/* コンテンツ */}
                <div className="flex-1 space-y-4">
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full max-w-2xl rounded-xl shadow-md object-cover"
                    />
                  )}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* YouTube埋め込み（voice-modelの場合） */}
                  {item.id === 'voice-model' && (
                    <div className="mt-4 w-full max-w-2xl">
                      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          className="absolute inset-0 w-full h-full rounded-xl shadow-lg"
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
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-300 text-gray-700 font-medium hover:border-pink-300 hover:text-pink-500 hover:shadow-lg hover:scale-105 transition-all duration-300"
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
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-300 text-gray-700 font-medium hover:border-pink-300 hover:text-pink-500 hover:shadow-lg hover:scale-105 transition-all duration-300"
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
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-gray-300 text-gray-700 font-medium hover:bg-white hover:text-pink-500 hover:border-pink-300 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              {locale === 'ja' ? 'すべてのお知らせを見る' : 'View All News'}
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
