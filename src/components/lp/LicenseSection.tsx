import { Download, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function LicenseSection() {
  return (
    <section className="relative pt-10 pb-10 sm:pb-20 px-6 sm:px-10 overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-14 items-stretch">
          {/* Left: Copy and CTAs */}
          <div className="space-y-7">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                生成AIでの利用もOK！<br />
              </h2>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                AIニケちゃんのVRMモデルはAI生成で利用可能なため、i2iやLoRAの作成などでご利用いただけます。
                ガイドラインに沿って、創作・研究・配信など幅広い用途で活用してください。
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                "生成AI（i2i, LoRAなど） OK",
                "二次創作 OK",
                "SNS・動画配信 OK",
              ].map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white/80 p-3 shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="font-semibold text-gray-800">{t}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <a href="https://github.com/tegnike/nikechan-assets" download>
                  VRMモデルをダウンロードページへ
                </a>
              </Button>
              <a
                href="/guidelines"
                className="inline-flex items-center text-indigo-700 font-semibold hover:text-indigo-800"
              >
                ガイドラインの詳細はこちら
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <p className="text-xs text-gray-500">
              一部の利用は条件付きとなる場合があります。詳細はガイドラインをご確認ください。
            </p>
          </div>

          {/* Right: i2i example */}
          <div className="relative">
            <div className="rounded-3xl border border-white/60 bg-white/80 shadow-xl backdrop-blur p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-gray-800">nano banana で i2i を試す例</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-white/60 bg-white/80 backdrop-blur">
                  <div className="flex items-center justify-between px-3 py-2 text-xs text-gray-600">
                    <span>input</span>
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
                    <span>output</span>
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
                この女の子をパンク・ロック風のデザインで書き直してください。
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
