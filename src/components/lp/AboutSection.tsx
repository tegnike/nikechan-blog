import { getT, type Locale } from '../../i18n/config';

type Props = {
  locale?: Locale;
}

const profileItems = ['age', 'birthday', 'height', 'imageColor'] as const;

export function AboutSection({ locale = 'ja' }: Props) {
  const t = getT(locale);

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-center">
            {/* 左カラム: テキスト情報 */}
            <div className="space-y-6">
              {/* 見出し */}
              <h2 className="text-3xl sm:text-4xl font-bold text-[#594A89]">
                {t('home:about.heading')}
              </h2>

              {/* 挨拶 */}
              <p className="text-lg sm:text-xl text-gray-600 italic">
                {t('home:about.greeting')}
              </p>

              {/* 説明文 */}
              <p
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('home:about.description') }}
              />

              {/* プロフィール項目 */}
              <div className="grid grid-cols-2 gap-3 py-4">
                {profileItems.map((key) => {
                  const icons: Record<string, JSX.Element> = {
                    age: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    ),
                    birthday: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                      </svg>
                    ),
                    height: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    ),
                    imageColor: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    ),
                  };
                  return (
                    <div
                      key={key}
                      className="bg-white/60 rounded-xl p-3 flex items-center gap-3 border border-white/80 shadow-md"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-[#594A89]">
                        {icons[key]}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs text-gray-500">
                          {t(`home:about.profileLabel.${key}`)}
                        </span>
                        <span className="text-sm font-medium text-gray-800 truncate flex items-center gap-1.5">
                          {key === 'imageColor' && (
                            <span
                              className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: '#5A4C97' }}
                            />
                          )}
                          {t(`home:about.profileValue.${key}`)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/80 border border-gray-300 text-gray-700 font-medium hover:bg-white hover:text-pink-500 hover:border-pink-300 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {t('home:about.cta.profile')}
                </a>
                <a
                  href="/gallery"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/80 border border-gray-300 text-gray-700 font-medium hover:bg-white hover:text-pink-500 hover:border-pink-300 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {t('home:about.cta.gallery')}
                </a>
              </div>
            </div>

            {/* 右カラム: プロフィール画像 */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="/images/lp/about.webp"
                alt={locale === 'ja' ? 'AIニケちゃんのプロフィール画像' : 'AI Nike-chan Profile Image'}
                className="w-full max-w-[320px] sm:max-w-[400px] h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
