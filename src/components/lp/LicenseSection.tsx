import { getT, type Locale } from '../../i18n/config';

type Props = {
  locale?: Locale;
}

export function LicenseSection({ locale = 'ja' }: Props) {
  const t = getT(locale);
  const features = t('home:license.features', { returnObjects: true }) as string[];

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* 左カラム: テキスト */}
            <div className="space-y-6">
              {/* 見出し */}
              <h2 className="text-3xl sm:text-4xl font-bold text-[#594A89]">
                {t('home:license.heading')}
              </h2>

              {/* 説明文 */}
              <p className="text-gray-700 leading-relaxed">
                {t('home:license.description')}
              </p>

              {/* 機能リスト */}
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="/tutorial"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/80 border border-gray-300 text-gray-700 font-medium hover:bg-white hover:text-pink-500 hover:border-pink-300 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {t('home:license.cta.tutorial')}
                </a>
                <a
                  href="/guidelines"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/80 border border-gray-300 text-gray-700 font-medium hover:bg-white hover:text-pink-500 hover:border-pink-300 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {t('home:license.cta.guidelines')}
                </a>
              </div>

              {/* 注意書き */}
              <p className="text-sm text-gray-500 italic">
                {t('home:license.disclaimer')}
              </p>
            </div>

            {/* 右カラム: i2i例パネル */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#594A89] mb-4">
                {t('home:license.example.heading')}
              </h3>

              {/* i2i例画像 */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('home:license.example.input')}
                  </span>
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                    <img
                      src="/images/lp/guideline1.webp"
                      alt="i2i input example"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('home:license.example.output')}
                  </span>
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                    <img
                      src="/images/lp/guideline2.webp"
                      alt="i2i output example"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* プロンプト例 */}
              <div className="bg-white/60 rounded-xl p-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
                  Prompt
                </span>
                <p className="text-gray-700 text-sm italic">
                  "{t('home:license.example.prompt')}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
