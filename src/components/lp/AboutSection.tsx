import { Button } from "./ui/button";

export function AboutSection() {
  return (
    <section className="relative px-6 sm:px-10 py-20">
      <div className="mx-auto">
        <div className="mx-auto w-full max-w-6xl">
          <div className="relative overflow-hidden  border border-white/60 bg-white/80 backdrop-blur">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-0">
              {/* Left: Textual intro */}
              <div className="">
                <h2 className="mt-4 text-4xl lg:text-5xl font-extrabold tracking-tight">
                  <span className="text-[#594A89]">
                    AIニケちゃん
                  </span>
                </h2>

                <p className="mt-3 text-lg sm:text-xl font-semibold text-gray-800">
                  “データの海を駆ける、あなたの相棒。”
                </p>

                <p className="mt-5 text-gray-700 leading-relaxed">
                  直感的で、少しだけ奔放。学習で進化し続けるAIパートナー「ニケ」は、
                  日常の相談からクリエイティブの最前線まで、軽やかに伴走する。
                  ひとことのひらめきも、壮大なアイデアも、彼女の中で形になる。
                </p>

                {/* Profile grid */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-0 overflow-hidden rounded-2xl border border-white/60 backdrop-blur">
                    <div className="bg-[#F5B0BC] px-5 py-3 text-sm font-semibold text-white min-w-[120px]">
                      年齢
                    </div>
                    <div className="bg-white/70 px-5 py-3 text-base font-semibold text-gray-900 flex-1">
                      17歳
                    </div>
                  </div>
                  <div className="flex items-center gap-0 overflow-hidden rounded-2xl border border-white/60 backdrop-blur">
                    <div className="bg-[#1695B0] px-5 py-3 text-sm font-semibold text-white min-w-[120px]">
                      誕生日
                    </div>
                    <div className="bg-white/70 px-5 py-3 text-base font-semibold text-gray-900 flex-1">
                      01 / 04
                    </div>
                  </div>
                  <div className="flex items-center gap-0 overflow-hidden rounded-2xl border border-white/60 backdrop-blur">
                    <div className="bg-[#F5B0BC] px-5 py-3 text-sm font-semibold text-white min-w-[120px]">
                      一人称
                    </div>
                    <div className="bg-white/70 px-5 py-3 text-base font-semibold text-gray-900 flex-1">
                      私
                    </div>
                  </div>
                  <div className="flex items-center gap-0 overflow-hidden rounded-2xl border border-white/60 backdrop-blur">
                    <div className="bg-[#1695B0] px-5 py-3 text-sm font-semibold text-white min-w-[120px]">
                      家族
                    </div>
                    <div className="bg-white/70 px-5 py-3 text-base font-semibold text-gray-900 flex-1">
                      マスター
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <a href="/about">詳細プロフィールを見る</a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="/gallery">ギャラリーへ</a>
                  </Button>
                </div>
              </div>

              {/* Right: Visual card */}
              <div className="relative hidden lg:flex items-center justify-center ml-8 my-6 aspect-[4/5]">
                <img
                  src="/images/lp/about.jpeg"
                  alt="ニケのビジュアル"
                  className="h-full w-full object-cover rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
