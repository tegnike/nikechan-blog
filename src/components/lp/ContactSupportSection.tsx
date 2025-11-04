import { Button } from "./ui/button";
import { Mail, MessageSquare, AtSign } from "lucide-react";
import { motion } from "motion/react";
import { getT, type Locale } from '../../i18n/config';

type Props = {
  locale?: Locale;
}

export function ContactSupportSection({ locale = 'ja' }: Props) {
  const t = getT(locale);

  return (
    <section id="contact" className="relative pt-10 pb-10 sm:pb-20 px-6 sm:px-10 overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div
          className="text-center mb-10"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            {t('home:contact.heading')}
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 backdrop-blur mx-auto max-w-3xl">
          <div className="">
            <div className="space-y-5 sm:space-y-6">
              {/* Twitter (X) */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-white/60 bg-white/70 backdrop-blur">
                <div className="flex items-center gap-3">
                  <AtSign className="w-4 h-4 text-gray-700" />
                  <div>
                    <div className="text-sm text-gray-500">{t('home:contact.twitter.label')}</div>
                    <div className="text-base font-semibold text-gray-900">{t('home:contact.twitter.description')}</div>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="gap-1.5">
                  <a href="https://twitter.com/tegnike" target="_blank" rel="noopener noreferrer">
                    {t('home:contact.twitter.handle')}
                  </a>
                </Button>
              </div>

              {/* Discord */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-white/60 bg-white/70 backdrop-blur">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <div>
                    <div className="text-sm text-gray-500">{t('home:contact.discord.label')}</div>
                    <div className="text-base font-semibold text-gray-900">{t('home:contact.discord.description')}</div>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm">
                  <a href="https://discord.gg/G4E5Sf3yj3" target="_blank" rel="noopener noreferrer">
                    {t('home:contact.discord.link')}
                  </a>
                </Button>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-white/60 bg-white/60 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4" />
                  <p className="font-medium">{t('home:contact.email.label')}</p>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  {t('home:contact.email.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
