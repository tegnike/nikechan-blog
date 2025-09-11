export function AboutSection() {
  return (
    <section className="relative px-4 py-20">
      {/* Ambient background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-200 via-fuchsia-200 to-pink-200 blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-100 via-sky-100 to-emerald-100 blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto">
        <div className="mx-auto w-full max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 shadow-sm backdrop-blur">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left: Textual intro */}
              <div className="p-7 sm:p-10 md:p-12">
                <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                    ニケ - NIKE
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
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-gray-200 bg-white/70 p-4">
                    <div className="text-xs text-gray-500">コードネーム</div>
                    <div className="mt-1 text-base font-semibold text-gray-900">NIKE-04</div>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white/70 p-4">
                    <div className="text-xs text-gray-500">誕生日</div>
                    <div className="mt-1 text-base font-semibold text-gray-900">01 / 04</div>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white/70 p-4">
                    <div className="text-xs text-gray-500">一人称</div>
                    <div className="mt-1 text-base font-semibold text-gray-900">私</div>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white/70 p-4">
                    <div className="text-xs text-gray-500">得意領域</div>
                    <div className="mt-1 text-base font-semibold text-gray-900">企画 / 文章 / 画像生成</div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="/about"
                    className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition"
                  >
                    詳細プロフィールを見る
                  </a>
                  <a
                    href="/gallery"
                    className="inline-flex items-center rounded-xl border border-gray-300 bg-white/80 px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
                  >
                    ギャラリーへ
                  </a>
                </div>
              </div>

              {/* Right: Visual card */
              }
              <div className="relative p-8 md:p-10 flex items-center justify-center bg-gradient-to-b from-white/40 to-white/10">
                <div className="relative aspect-[4/5] w-full max-w-sm">
                  <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-indigo-300/40 via-fuchsia-300/40 to-pink-300/40 blur-xl" aria-hidden />
                  <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-lg backdrop-blur">
                    <img
                      src="/images/lp/nike_ai.png"
                      alt="ニケのビジュアル"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
