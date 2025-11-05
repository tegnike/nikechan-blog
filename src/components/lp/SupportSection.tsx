import { Heart, ExternalLink, Shield } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { getT, type Locale } from '../../i18n/config';

type Props = {
  locale?: Locale;
}

export function SupportSection({ locale = 'ja' }: Props) {
  const t = getT(locale);
  const fanboxFeatures = [
    t('home:support.fanbox.features.0'),
    t('home:support.fanbox.features.1'),
  ];
  const discordFeatures = [
    t('home:support.discord.features.0'),
    t('home:support.discord.features.1'),
    t('home:support.discord.features.2'),
  ];

  return (
    <section className="relative pt-10 pb-10 sm:pb-20 px-6 sm:px-10 overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div
          className="text-center mb-10"
        >
          <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            {t('home:support.heading')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Left: FANBOX policy and CTA */}
          <div>
            <div className="h-full rounded-3xl border border-white/60 bg-white/80 backdrop-blur">
              <h3 className="text-2xl font-bold text-gray-900">{t('home:support.fanbox.heading')}</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                {t('home:support.fanbox.description')}
              </p>
              <ul className="mt-6 space-y-3 text-gray-800">
                {fanboxFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-indigo-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <a href="https://nikechan.fanbox.cc/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    {t('home:support.fanbox.cta')}
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Discord policy */}
          <div>
            <div className="h-full rounded-3xl border border-white/60 bg-white/80 backdrop-blur">
              <div className="flex items-center gap-2 text-gray-900">
                <Shield className="h-5 w-5 text-indigo-600" />
                <h3 className="text-2xl font-bold">{t('home:support.discord.heading')}</h3>
              </div>
              <p className="mt-3 text-gray-700 leading-relaxed">
                {t('home:support.discord.description')}
              </p>
              <div className="mt-6 rounded-2xl border border-gray-200 bg-white/70 p-5">
                <div className="text-sm font-semibold text-gray-800 mb-2">{t('home:support.discord.featuresHeading')}</div>
                <ul className="space-y-2 text-gray-700">
                  {discordFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                {t('home:support.discord.disclaimer')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
