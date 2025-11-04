import { Download, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { getT, type Locale } from '../../i18n/config';

type Props = {
  locale?: Locale;
}

export function LicenseSection({ locale = 'ja' }: Props) {
  const t = getT(locale);
  const features = [
    t('home:license.features.0'),
    t('home:license.features.1'),
    t('home:license.features.2'),
  ];

  return (
    <section className="relative pt-10 pb-10 sm:pb-20 px-6 sm:px-10 overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-14 items-stretch">
          {/* Left: Copy and CTAs */}
          <div className="space-y-7 text-center lg:text-left">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                {t('home:license.heading')}<br />
              </h2>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed text-left">
                {t('home:license.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 max-w-md mx-auto lg:mx-0">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white/80 p-3 shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="font-semibold text-gray-800">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <a href={`/tutorial${locale !== 'ja' ? '?lang=' + locale : ''}`}>
                  {t('home:license.cta.tutorial')}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <a
                href={`/guidelines${locale !== 'ja' ? '?lang=' + locale : ''}`}
                className="inline-flex items-center text-indigo-700 font-semibold hover:text-indigo-800"
              >
                {t('home:license.cta.guidelines')}
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <p className="text-xs text-gray-500 text-center lg:text-left">
              {t('home:license.disclaimer')}
            </p>
          </div>

          {/* Right: i2i example */}
          <div className="relative">
            <div className="rounded-3xl border border-white/60 bg-white/80 shadow-xl backdrop-blur p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-gray-800">{t('home:license.example.heading')}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-white/60 bg-white/80 backdrop-blur">
                  <div className="flex items-center justify-between px-3 py-2 text-xs text-gray-600">
                    <span>{t('home:license.example.input')}</span>
                  </div>
                  <div className="aspect-[4/5] w-full">
                    <img
                      src="/images/lp/guideline1.webp"
                      alt="i2i input"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-white/60 bg-white/80 backdrop-blur">
                  <div className="flex items-center justify-between px-3 py-2 text-xs text-gray-600">
                    <span>{t('home:license.example.output')}</span>
                  </div>
                  <div className="aspect-[4/5] w-full">
                    <img
                      src="/images/lp/guideline2.webp"
                      alt="i2i output"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-gray-200 bg-white/70 p-4 text-sm text-gray-700 leading-relaxed">
                {t('home:license.example.prompt')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
