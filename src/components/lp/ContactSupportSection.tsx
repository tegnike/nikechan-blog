import { getT, type Locale } from '../../i18n/config';

type Props = {
  locale?: Locale;
}

export function ContactSupportSection({ locale = 'ja' }: Props) {
  const t = getT(locale);

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* 見出し */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#594A89] text-center mb-12">
          {t('home:contact.heading')}
        </h2>

        {/* 連絡先カード */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Twitter */}
          <a
            href="https://twitter.com/tegnike"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel p-6 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <svg className="w-7 h-7 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-1">
              {t('home:contact.twitter.label')}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {t('home:contact.twitter.description')}
            </p>
            <span className="text-sm text-pink-500 font-medium">
              {t('home:contact.twitter.handle')}
            </span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/G4E5Sf3yj3"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel p-6 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
              <svg className="w-7 h-7 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-1">
              {t('home:contact.discord.label')}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {t('home:contact.discord.description')}
            </p>
            <span className="text-sm text-indigo-500 font-medium">
              {t('home:contact.discord.link')}
            </span>
          </a>

          {/* メール */}
          <div className="glass-panel p-6 text-center opacity-75">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-1">
              {t('home:contact.email.label')}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {t('home:contact.email.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
