import { Download, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";

export function LicenseSection() {
  return (
    <section className="relative pt-10 pb-20 px-4 overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-14 items-stretch">
          {/* Left: Copy and CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-7"
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                ガイドラインについて
              </h2>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                VRMモデルはAI生成OK。i2iやLoRAの作成など、どんな用途でもご利用いただけます。
                創作・研究・配信・商用まで、自由にお使いください。
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {["AI生成 OK", "i2i / LoRA 作成 OK", "二次創作・配信・商用 利用OK"].map((t) => (
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
                <a href="/static/models/nike.vrm" download>
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
              詳細はガイドラインをご確認ください。表記は簡略版です。
            </p>
          </motion.div>

          {/* Right: i2i example */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-3xl border border-white/60 bg-white/80 shadow-xl backdrop-blur p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-gray-800">banana で i2i を試す例</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-white/60 bg-white/80 backdrop-blur">
                  <div className="flex items-center justify-between px-3 py-2 text-xs text-gray-600">
                    <span>input</span>
                    <span className="opacity-70">reference</span>
                  </div>
                  <div className="aspect-[4/5] w-full">
                    <img
                      src="/images/lp/live2d_tp.png"
                      alt="i2i input"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-white/60 bg-white/80 backdrop-blur">
                  <div className="flex items-center justify-between px-3 py-2 text-xs text-gray-600">
                    <span>output</span>
                    <span className="opacity-70">generated with banana</span>
                  </div>
                  <div className="aspect-[4/5] w-full">
                    <img
                      src="/images/lp/exp_3.png"
                      alt="i2i output"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-gray-200 bg-white/70 p-4 text-sm text-gray-700 leading-relaxed">
                例えば、bananaを使えば手元の画像をベースにスタイル変換や高精細化をサクッと実行できます。
                モデルのLoRAを作ってからi2iで微調整…といったワークフローもOK。
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
