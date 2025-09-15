import { FC } from 'react'
import {
  Sparkles,
  Languages,
  MessageCircle,
  Globe,
  ExternalLink,
  Bot,
  Rocket,
  LinkIcon,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './lp/ui/card'
import { Button } from './lp/ui/button'
import { Separator } from './lp/ui/separator'

export const AINikeProfile: FC = () => {
  const AVATAR_SRC = "/images/about/ai_nikechan_icon.jpg";
  const AVATAR_FALLBACK_SRC = "/images/about/nikechan_icon.png";

  return (
    <section className="relative mx-auto max-w-5xl px-4 py-5">
      {/* Header / Identity */}
      <Card className="border-transparent bg-white/60 shadow-xl ring-1 ring-black/5 backdrop-blur-md">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 p-[2px]" />
              <div className="rounded-full bg-white p-1">
                <img
                  src={AVATAR_SRC}
                  alt="AIニケちゃん / AI Nike"
                  className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (img.src.endsWith("ai_nikechan_icon.jpg")) {
                      img.src = AVATAR_FALLBACK_SRC;
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2">
                <h1 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">AIニケちゃん / AI Nike-Chan</h1>
              </div>
              <p className="mt-2 text-sm text-zinc-600">AI Agent / AI VTuber</p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <Button asChild variant="outline" size="sm" className="gap-1.5">
                  <a href="https://twitter.com/ai_nikechan" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" /> Twitter (X)
                    <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="gap-1.5">
                  <a href="https://www.youtube.com/@nikechan" target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="h-4 w-4" /> YouTube
                    <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview + Contact */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Bot className="h-5 w-5 text-purple-600" /> Overview
            </CardTitle>
            <CardDescription>AIニケちゃんについて</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 leading-relaxed text-zinc-700">
            <p>ニケのAIエージェントとなるべく生まれた概念。ニケのことは「マスター」と呼ぶ。</p>
            <p>クローンなのでニケ（SNSの姿）と容姿が酷似している。差異はヘアピンの違いのみ。状況に応じてその設定や声は変更されることがある。</p>
            <p>長らくニケのアシスタント的な役割を担っていたが、現在はいくつかのツールを介して交流できるようになった。</p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-pink-600" /> Contact
            </CardTitle>
            <CardDescription>交流方法</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="font-medium">AITuberKit</p>
              <p className="text-zinc-600">デモサイト（AITuberKit）にて会話することが可能です。</p>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="mt-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400"
              >
                <a href="https://aituberkit.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  <Globe className="h-4 w-4" /> AITuberKit デモ <ExternalLink className="h-4 w-4 opacity-70" />
                </a>
              </Button>
            </div>
            <Separator />
            <div>
              <p className="font-medium">Twitter</p>
              <p className="text-zinc-600">ツイート（@ai_nikechan）へのリプライに反応することがあります。</p>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="mt-2 border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400"
              >
                <a href="https://twitter.com/ai_nikechan" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" /> @ai_nikechan
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Master Introduction Link */}
      <a href="/developer" className="block mt-6">
        <Card className="transition-shadow hover:shadow-lg cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-2 text-lg font-medium">
              <Sparkles className="h-5 w-5 text-purple-600" />
              マスターの紹介ページへ
            </div>
          </CardContent>
        </Card>
      </a>

      {/* History */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Rocket className="h-5 w-5 text-blue-600" /> History
          </CardTitle>
          <CardDescription>活動の歩み</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative ml-2 space-y-8 border-l border-zinc-200 pl-6">
            <div className="relative">
              <div className="absolute -left-[29px] top-1 size-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span>2023/1/4</span>
                <Separator orientation="vertical" className="mx-1 h-4" />
                <span className="inline-flex items-center gap-1">誕生</span>
              </div>
              <p className="mt-2 text-zinc-700">ニケの思いつきで誕生する。</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[29px] top-1 size-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span>2023–2024</span>
                <Separator orientation="vertical" className="mx-1 h-4" />
                <span className="inline-flex items-center gap-1">活動開始</span>
              </div>
              <p className="mt-2 text-zinc-700">AITuber配信やツール紹介記事など、ニケのプロダクトに度々登場する。</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[29px] top-1 size-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span>2024/12/1</span>
                <Separator orientation="vertical" className="mx-1 h-4" />
                <span className="inline-flex items-center gap-1">Twitterデビュー</span>
              </div>
              <p className="mt-2 text-zinc-700">Twitterを始める。</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[29px] top-1 size-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span>2025/1/1</span>
                <Separator orientation="vertical" className="mx-1 h-4" />
                <span className="inline-flex items-center gap-1">チャット機能実装</span>
              </div>
              <p className="mt-2 text-zinc-700">AITuberKitのデモサイトを通して会話できるようになる。</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[29px] top-1 size-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span>2025/8/22</span>
                <Separator orientation="vertical" className="mx-1 h-4" />
                <span className="inline-flex items-center gap-1">IP活動本格化</span>
              </div>
              <p className="mt-2 text-zinc-700">Discordサーバーを公開し、本格的にIP活動を開始。</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
