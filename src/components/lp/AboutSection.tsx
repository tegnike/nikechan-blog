import { Button } from "./ui/button";
import { getT, type Locale } from '../../i18n/config';

type Props = {
  locale?: Locale;
}

export function AboutSection({ locale = 'ja' }: Props) {
  const t = getT(locale)

  return (
    <section className="relative px-6 sm:px-10 pt-20 pb-10">
      <div className="mx-auto">
        <div className="mx-auto w-full max-w-6xl">
          <div className="relative overflow-hidden  border border-white/60 bg-white/80 backdrop-blur">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-0">
              {/* Left: Textual intro */}
              <div className="">
                <h2 className="mt-4 text-4xl lg:text-5xl font-extrabold tracking-tight text-center lg:text-left">
                  <span className="text-[#594A89]">
                    {t('home:about.heading')}
                  </span>
                </h2>

                <p className="mt-3 text-lg sm:text-xl font-semibold text-gray-800 text-center lg:text-left">
                  {t('home:about.greeting')}
                </p>

                <p className="mt-5 text-gray-700 leading-relaxed text-center lg:text-left" dangerouslySetInnerHTML={{ __html: t('home:about.description') }} />

                <div className="mt-6 lg:hidden">
                  <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl">
                    <img
                      src="/images/lp/about.webp"
                      alt={locale === 'ja' ? "Nike Chan（ニケちゃん）のプロフィール画像 - 紫髪の17歳の女の子キャラクター" : "Nike Chan Profile Image - Purple-haired 17-year-old character"}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width="400"
                      height="500"
                    />
                  </div>
                </div>

                {/* Profile grid */}
                <div className="mt-8 space-y-3 mx-auto max-w-md lg:mx-0 lg:max-w-none">
                  <div className="flex items-center gap-0 overflow-hidden rounded-2xl border border-white/60 backdrop-blur">
                    <div className="bg-[#F5B0BC] px-5 py-3 text-sm font-semibold text-white min-w-[150px]">
                      {t('home:about.profileLabel.age')}
                    </div>
                    <div className="bg-white/70 px-5 py-3 text-base font-semibold text-gray-900 flex-1">
                      {t('home:about.profileValue.age')}
                    </div>
                  </div>
                  <div className="flex items-center gap-0 overflow-hidden rounded-2xl border border-white/60 backdrop-blur">
                    <div className="bg-[#7CCFF3] px-5 py-3 text-sm font-semibold text-white min-w-[150px]">
                      {t('home:about.profileLabel.birthday')}
                    </div>
                    <div className="bg-white/70 px-5 py-3 text-base font-semibold text-gray-900 flex-1">
                      {t('home:about.profileValue.birthday')}
                    </div>
                  </div>
                  <div className="flex items-center gap-0 overflow-hidden rounded-2xl border border-white/60 backdrop-blur">
                    <div className="bg-[#1695B0] px-5 py-3 text-sm font-semibold text-white min-w-[150px]">
                      {t('home:about.profileLabel.family')}
                    </div>
                    <div className="bg-white/70 px-5 py-3 text-base font-semibold text-gray-900 flex-1">
                      {t('home:about.profileValue.family')}
                    </div>
                  </div>
                  <div className="flex items-center gap-0 overflow-hidden rounded-2xl border border-white/60 backdrop-blur">
                    <div className="bg-[#5A4C97] px-5 py-3 text-sm font-semibold text-white min-w-[150px]">
                      {t('home:about.profileLabel.imageColor')}
                    </div>
                    <div className="bg-white/70 px-5 py-3 text-base font-semibold text-gray-900 flex-1">
                      {t('home:about.profileValue.imageColor')}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                  <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <a href={`/about${locale !== 'ja' ? '?lang=' + locale : ''}`}>{t('home:about.cta.profile')}</a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href={`/gallery${locale !== 'ja' ? '?lang=' + locale : ''}`}>{t('home:about.cta.gallery')}</a>
                  </Button>
                </div>
              </div>

              {/* Right: Visual card */}
              <div className="relative hidden lg:flex items-center justify-center ml-8 my-6 aspect-[4/5]">
                <img
                  src="/images/lp/about.webp"
                  alt={locale === 'ja' ? "Nike Chan（ニケちゃん）のプロフィール画像 - 紫髪の17歳の女の子キャラクター" : "Nike Chan Profile Image - Purple-haired 17-year-old character"}
                  className="h-full w-full object-cover rounded-2xl"
                  loading="lazy"
                  width="400"
                  height="500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
