import { getT, type Locale } from '../../i18n/config';

type Props = {
  locale?: Locale;
}

const socialLinks = [
  {
    platform: 'x',
    url: 'https://x.com/tegnike',
    bgColor: 'bg-gray-100 group-hover:bg-gray-200',
    iconColor: 'text-gray-700',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    platform: 'x',
    url: 'https://x.com/ai_nikechan',
    bgColor: 'bg-gray-100 group-hover:bg-gray-200',
    iconColor: 'text-gray-700',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    platform: 'discord',
    url: 'https://discord.gg/G4E5Sf3yj3',
    bgColor: 'bg-indigo-100 group-hover:bg-indigo-200',
    iconColor: 'text-indigo-500',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    platform: 'youtube',
    url: 'https://www.youtube.com/@nikechan',
    bgColor: 'bg-red-100 group-hover:bg-red-200',
    iconColor: 'text-red-500',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function SocialLinksSection({ locale = 'ja' }: Props) {
  const t = getT(locale);
  const socialData = t('home:social.links', { returnObjects: true }) as Array<{
    label: string;
    handle: string;
    note?: string;
  }>;

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* 見出し */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#594A89] text-center mb-12">
          {t('home:social.heading')}
        </h2>

        {/* SNSカード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {socialLinks.map((link, index) => {
            const data = socialData[index];
            return (
              <a
                key={`${link.platform}-${index}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-5 flex items-center gap-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
              >
                {/* アイコン */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${link.bgColor} flex items-center justify-center ${link.iconColor} transition-colors`}>
                  {link.icon}
                </div>

                {/* テキスト */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">
                      {data.label}
                    </span>
                    {data.note && (
                      <span className="text-xs text-gray-500">
                        ({data.note})
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600 truncate block">
                    {data.handle}
                  </span>
                </div>

                {/* 外部リンクアイコン */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-200 transition-colors">
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
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
