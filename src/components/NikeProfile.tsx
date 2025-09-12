import { FC } from 'react'
import {
  MapPin,
  Globe,
  Briefcase,
  Rocket,
  BookOpen,
  Code2,
  ExternalLink,
  Mail,
  Heart,
  Github,
  Link as LinkIcon,
  Sparkles,
  Languages,
  MessageCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './lp/ui/card'
import { Badge } from './lp/ui/badge'
import { Button } from './lp/ui/button'
import { Separator } from './lp/ui/separator'
// Use a native img for avatar to ensure network request in SSR + hydration

export const NikeProfile: FC = () => {
  const AVATAR_SRC = "/images/about/nikechan_icon.png";
  const AVATAR_FALLBACK_SRC = "/images/about/ai_nikechan_icon.jpg";

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
                  alt="ニケ / Nike"
                  className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (img.src.endsWith("nikechan_icon.png")) {
                      img.src = AVATAR_FALLBACK_SRC;
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-pink-500" />
                <h1 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">ニケ / Nike</h1>
              </div>
              <p className="mt-2 text-sm text-zinc-600">
                AI & Web Developer / フルスタックエンジニア
              </p>
              <div className="mt-3 flex items-center justify-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 sm:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> Poland
                </span>
                <Separator orientation="vertical" className="mx-1 h-4" />
                <span className="inline-flex items-center gap-1.5">
                  <Languages className="h-4 w-4" /> JP/EN
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <Button asChild variant="outline" size="sm" className="gap-1.5">
                  <a href="https://twitter.com/tegnike" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" /> Twitter (X)
                    <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="gap-1.5">
                  <a href="https://github.com/tegnike" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" /> GitHub
                    <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="gap-1.5">
                  <a href="https://www.youtube.com/@nikechan" target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="h-4 w-4" /> YouTube
                    <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="gap-1.5">
                  <a href="https://zenn.dev/nikechan" target="_blank" rel="noopener noreferrer">
                    <BookOpen className="h-4 w-4" /> Zenn
                    <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="gap-1.5">
                  <a href="https://note.com/nike_cha_n" target="_blank" rel="noopener noreferrer">
                    <BookOpen className="h-4 w-4" /> note
                    <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BookOpen className="h-5 w-5 text-purple-600" /> Overview
            </CardTitle>
            <CardDescription>自己紹介と活動領域</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 leading-relaxed text-zinc-700">
            <p>
              ポーランド在住のフルスタック開発者として、数年間にわたりリモートワークを通して日本のプロジェクトに参画。
            </p>
            <p>
              バックエンド開発を中心に経験を積む中で、現在はPythonやReactなどを用いたLLM応用の開発に携わるAIエンジニアとして活躍。最新のAI技術については常にキャッチアップし、定期的に関連の記事も発信している。
            </p>
            <p>2024年からは英語圏での活動も開始。</p>
            <p>
              個人開発では「AITuberKit」や「美少女OPInterpreter」などのAIツールを公開し、AIとWeb技術を融合した新たなアプリケーションの可能性を探求している。
            </p>
          </CardContent>
        </Card>

        {/* Quick links / Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-pink-600" /> Contact
            </CardTitle>
            <CardDescription>お問い合わせ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="font-medium">一般的なお問い合わせ</p>
              <p className="text-zinc-600">Twitter（@tegnike）のDMにてご連絡ください。</p>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="mt-2 border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400"
              >
                <a
                  href="https://twitter.com/tegnike"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" /> DMを送る
                </a>
              </Button>
            </div>
            <Separator />
            <div>
              <p className="font-medium">AITuberKit商用ガイドライン</p>
              <p className="text-zinc-600">商用利用やガイドラインに関するお問い合わせ</p>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="mt-2 border-sky-300 text-sky-700 hover:bg-sky-50 hover:border-sky-400"
              >
                <a href="mailto:support@aituberkit.com" className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" /> support@aituberkit.com
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Career timeline */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Briefcase className="h-5 w-5 text-blue-600" /> Career
          </CardTitle>
          <CardDescription>これまでの経歴</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative ml-2 space-y-8 border-l border-zinc-200 pl-6">
            <div className="absolute -left-[5px] top-1 size-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
            <div>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span>〜2023</span>
                <Separator orientation="vertical" className="mx-1 h-4" />
                <span className="inline-flex items-center gap-1"><Code2 className="h-3.5 w-3.5" /> Web Developer</span>
              </div>
              <p className="mt-2 text-zinc-700">
                フルリモートで日本のプロジェクトに参画。Ruby on Rails、React、Vue.jsなどを用いたWebアプリケーションの開発に従事してきた。予約システム、ECサイト、オンラインくじサイトなど、様々なプロジェクトでリードエンジニアとして活躍。また、AWSやGCPを用いたインフラ構築やCI/CDの整備も担当した。
              </p>
            </div>
            <div className="absolute -left-[5px] top-[calc(50%+2px)] size-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            <div>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span>2024〜</span>
                <Separator orientation="vertical" className="mx-1 h-4" />
                <span className="inline-flex items-center gap-1"><Rocket className="h-3.5 w-3.5" /> AI Engineer</span>
              </div>
              <p className="mt-2 text-zinc-700">
                日本および英語圏のプロジェクトにおいて、AIキャラクターやエージェントの開発に従事。PythonやTypeScriptなどを用い、LLMを活用した自然な会話システムの実装や、独自の記憶機構の設計など、AI応用開発全般を担当する。また、CursorやDevinなどのAIツールを駆使したAI駆動開発を積極的に取り入れている。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Rocket className="h-5 w-5 text-amber-600" /> Products
          </CardTitle>
          <CardDescription>個人開発 / 公開プロジェクト</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* AITuberKit */}
            <div className="group rounded-xl border bg-white/60 p-4 ring-1 ring-black/5 transition hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">AITuberKit (2024)</h3>
                  <p className="mt-1 text-sm text-zinc-600">
                    誰でも手軽にAIキャラクターチャットやAITuberシステムを構築できるプロジェクト。多数のLLMやTTSサービスに対応し、柔軟なカスタマイズが可能。ReactとTypeScriptを採用。
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href="https://github.com/tegnike/aituber-kit" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <Github className="h-4 w-4" /> GitHub <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href="https://aituberkit.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <Globe className="h-4 w-4" /> Demo <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href="https://note.com/nike_cha_n/n/ne98acb25e00f" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> 紹介記事 <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
              </div>
            </div>

            {/* AITuberList */}
            <div className="group rounded-xl border bg-white/60 p-4 ring-1 ring-black/5 transition hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">AITuberList (2024)</h3>
                  <p className="mt-1 text-sm text-zinc-600">YouTubeに投稿しているAITuberをまとめたサイト。</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href="https://github.com/tegnike/aituber-list" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <Github className="h-4 w-4" /> GitHub <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href="https://aituberlist.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <Globe className="h-4 w-4" /> サイト <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
              </div>
            </div>

            {/* 美少女OPInterpreter */}
            <div className="group rounded-xl border bg-white/60 p-4 ring-1 ring-black/5 transition hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">美少女OPInterpreter (2023)</h3>
                  <p className="mt-1 text-sm text-zinc-600">
                    Live2Dキャラクターとプログラミング実行環境を融合した対話型開発支援ツール。美少女キャラクターとの会話を通じて、直感的にプログラムの実行が可能。
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href="https://www.youtube.com/watch?v=Qw2w2UvxcQY&t=2s" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" /> デモ動画 <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href="https://note.com/nike_cha_n/n/nabcfeb7aaf3f" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> 紹介記事 <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
              </div>
            </div>

            {/* 完全自動AIゲームプレイ&実況 */}
            <div className="group rounded-xl border bg-white/60 p-4 ring-1 ring-black/5 transition hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">完全自動AIゲームプレイ&実況 (2023)</h3>
                  <p className="mt-1 text-sm text-zinc-600">
                    AIが完全自動でゲームプレイと実況を実現するプロジェクト。ターン制ゲームの戦略策定から実況の生成まで、全工程を自動化。
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href="https://www.youtube.com/watch?v=dRsVVPaOOVk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" /> デモ動画 <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href="https://note.com/nike_cha_n/n/n96515b745cd2" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> 紹介記事 <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Heart className="h-5 w-5 text-rose-600" /> Support
          </CardTitle>
          <CardDescription>活動を応援いただける方へ</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-700">
            私の活動を応援していただけるスポンサーの方を募集しています。以下のプラットフォームからご支援いただけます。
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white">
              <a href="https://github.com/sponsors/tegnike" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                <Github className="h-4 w-4" /> GitHub Sponsors <ExternalLink className="h-4 w-4 opacity-70" />
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href="https://buymeacoffee.com/fDANV1k6iZ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                ☕ Buy Me a Coffee <ExternalLink className="h-4 w-4 opacity-70" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
