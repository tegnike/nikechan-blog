import { Heart, ExternalLink, Shield } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";

export function SupportSection() {
  return (
    <section className="relative pt-10 pb-10 sm:pb-20 px-6 sm:px-10 overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div
          className="text-center mb-10"
        >
          <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            活動のご支援について
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Left: FANBOX policy and CTA */}
          <div>
            <div className="h-full rounded-3xl border border-white/60 bg-white/80 backdrop-blur">
              <h3 className="text-2xl font-bold text-gray-900">FANBOX で支援</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                活動の継続・制作費に充てさせていただきます。どの支援プランでも受けられる特典は同じで、金額で差が出ない設計です。
              </p>
              <ul className="mt-6 space-y-3 text-gray-800">
                {[
                  "同一特典：どのプランでも内容は共通",
                  "現在、決済はFANBOXに一本化",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-indigo-500" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <a href="https://nikechan.fanbox.cc/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    FANBOXで支援する
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
                <h3 className="text-2xl font-bold">Discord について</h3>
              </div>
              <p className="mt-3 text-gray-700 leading-relaxed">
                スポンサーはDiscordの特設チャンネルに参加できます。ただし基本方針として情報は公にし、ここでしか得られない情報は極力設けません。
              </p>
              <div className="mt-6 rounded-2xl border border-gray-200 bg-white/70 p-5">
                <div className="text-sm font-semibold text-gray-800 mb-2">公開チャンネルで見られるもの（例）</div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>公開前情報の先出し</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>管理者の作業配信</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>必要に応じて今後も追加予定</span>
                  </li>
                </ul>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                詳細な参加手順やチャンネル構成は、Discord内の特設チャンネルでご案内します。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
