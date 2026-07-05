import { type Locale } from "../../i18n/config";

type Props = {
  locale?: Locale;
};

const AITUBERKIT_BASE_URL = "https://aituberkit.com";
const AITUBERKIT_EMBED_SCRIPT_URL = `${AITUBERKIT_BASE_URL}/embed.js`;

export function AITuberChatSection({ locale = "ja" }: Props) {
  const isJa = locale === "ja";

  return (
    <section className="py-10 sm:py-16 px-2 sm:px-6" id="talk-with-nikechan">
      <div className="site-shell">
        <div className="glass-panel p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-6 lg:gap-8 items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-wide text-pink-600">
                AITuberKit
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {isJa ? "ニケちゃんと話す" : "Talk with Nike Chan"}
              </h2>
              <p className="text-sm sm:text-base leading-7 text-gray-700">
                {isJa
                  ? "AITuberKitで設定したキャラクターモデル、LLM、音声合成を使って、そのまま会話できるスペースです。"
                  : "This space uses the character model, LLM, and text-to-speech flow configured in AITuberKit."}
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-xl">
              <div
                data-aituber-kit-embed
                data-base-url={AITUBERKIT_BASE_URL}
                data-embed-id="default"
                data-height="640"
                data-loading="eager"
                data-title={
                  isJa ? "ニケちゃんとの会話" : "Conversation with Nike Chan"
                }
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
