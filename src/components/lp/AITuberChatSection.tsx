import { getT, type Locale } from "../../i18n/config";

type Props = {
  locale?: Locale;
};

const AITUBERKIT_BASE_URL = "https://aituberkit.com";
const AITUBERKIT_EMBED_SCRIPT_URL = `${AITUBERKIT_BASE_URL}/embed.js`;
const AITUBERKIT_SITE_URL = "https://promotion.aituberkit.com/";

export function AITuberChatSection({ locale = "ja" }: Props) {
  const t = getT(locale);

  return (
    <section
      className="home-chat-section py-10 sm:py-16 px-2 sm:px-6"
      id="talk-with-nikechan"
    >
      <div className="site-shell">
        {/* 見出し */}
        <h2 className="home-section-title">{t("home:chat.heading")}</h2>

        <div className="glass-panel home-chat-panel p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-8 lg:gap-12 items-center">
            {/* 左カラム: ニケちゃんからの呼びかけ */}
            <div className="home-chat-copy space-y-6">
              <p className="home-chat-lead">{t("home:chat.lead")}</p>

              <p className="home-chat-description">
                {t("home:chat.description")}
              </p>

              <div className="pt-2">
                <a
                  href={AITUBERKIT_SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="design-action-button"
                >
                  {t("home:chat.poweredByCta")}
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
              </div>
            </div>

            {/* 右カラム: AITuberKit埋め込みウィジェット */}
            <div className="home-chat-widget-frame">
              <div
                data-aituber-kit-embed
                data-base-url={AITUBERKIT_BASE_URL}
                data-embed-id="default"
                data-height="640"
                data-loading="eager"
                data-title={t("home:chat.widgetTitle")}
              />
              <script
                src={AITUBERKIT_EMBED_SCRIPT_URL}
                defer
                data-aituber-kit-embed-loader
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
