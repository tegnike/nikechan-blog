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
import { Locale, getT } from '../i18n/config'
// Use a native img for avatar to ensure network request in SSR + hydration

interface NikeProfileProps {
  locale: Locale
}

export const NikeProfile: FC<NikeProfileProps> = ({ locale }) => {
  const t = getT(locale)
  const AVATAR_SRC = "/images/about/nikechan_icon.png";
  const AVATAR_FALLBACK_SRC = "/images/about/ai_nikechan_icon.png";

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
                <h1 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">{t('developer:profile.name')}</h1>
              </div>
              <p className="mt-2 text-sm text-zinc-600">
                {t('developer:profile.role')}
              </p>
              <div className="mt-3 flex items-center justify-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 sm:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {t('developer:profile.location')}
                </span>
                <Separator orientation="vertical" className="mx-1 h-4" />
                <span className="inline-flex items-center gap-1.5">
                  <Languages className="h-4 w-4" /> {t('developer:profile.languages')}
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
              <BookOpen className="h-5 w-5 text-purple-600" /> {t('developer:profile.overview.heading')}
            </CardTitle>
            <CardDescription>{t('developer:profile.overview.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 leading-relaxed text-zinc-700">
            {(t('developer:profile.overview.text', { returnObjects: true }) as string[]).map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </CardContent>
        </Card>

        {/* Quick links / Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-pink-600" /> {t('developer:profile.contact.heading')}
            </CardTitle>
            <CardDescription>{t('developer:profile.contact.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="font-medium">{t('developer:profile.contact.general.label')}</p>
              <p className="text-zinc-600">{t('developer:profile.contact.general.description')}</p>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="mt-2 border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400 hover:text-pink-700 transition-colors"
              >
                <a
                  href="https://twitter.com/tegnike"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" /> {t('developer:profile.contact.general.button')}
                </a>
              </Button>
            </div>
            <Separator />
            <div>
              <p className="font-medium">{t('developer:profile.contact.aiTuberKit.label')}</p>
              <p className="text-zinc-600">{t('developer:profile.contact.aiTuberKit.description')}</p>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="mt-2 border-sky-300 text-sky-700 hover:bg-sky-50 hover:border-sky-400 hover:text-sky-800 transition-colors"
              >
                <a href="mailto:support@aituberkit.com" className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" /> support@aituberkit.com
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Nike-chan Introduction Link */}
      <a href={`/about${locale !== 'ja' ? '?lang=' + locale : ''}`} className="block mt-6">
        <Card className="transition-shadow hover:shadow-lg cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-2 text-lg font-medium">
              <Sparkles className="h-5 w-5 text-purple-600" />
              {t('developer:profile.aiNikeLink')}
            </div>
          </CardContent>
        </Card>
      </a>

      {/* Career timeline */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Briefcase className="h-5 w-5 text-blue-600" /> {t('developer:profile.career.heading')}
          </CardTitle>
          <CardDescription>{t('developer:profile.career.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative ml-2 space-y-8 border-l border-zinc-200 pl-6">
            <div className="absolute -left-[5px] top-1 size-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
            <div>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span>{t('developer:profile.career.webDeveloper.period')}</span>
                <Separator orientation="vertical" className="mx-1 h-4" />
                <span className="inline-flex items-center gap-1"><Code2 className="h-3.5 w-3.5" /> {t('developer:profile.career.webDeveloper.label')}</span>
              </div>
              <p className="mt-2 text-zinc-700">
                {t('developer:profile.career.webDeveloper.description')}
              </p>
            </div>
            <div className="absolute -left-[5px] top-[calc(50%+2px)] size-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            <div>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span>{t('developer:profile.career.aiEngineer.period')}</span>
                <Separator orientation="vertical" className="mx-1 h-4" />
                <span className="inline-flex items-center gap-1"><Rocket className="h-3.5 w-3.5" /> {t('developer:profile.career.aiEngineer.label')}</span>
              </div>
              <p className="mt-2 text-zinc-700">
                {t('developer:profile.career.aiEngineer.description')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Rocket className="h-5 w-5 text-amber-600" /> {t('developer:profile.products.heading')}
          </CardTitle>
          <CardDescription>{t('developer:profile.products.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* AITuberKit */}
            <div className="group rounded-xl border bg-white/60 p-4 ring-1 ring-black/5 transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{t('developer:profile.products.aiTuberKit.name')}</h3>
                  <p className="mt-1 text-sm text-zinc-600">
                    {t('developer:profile.products.aiTuberKit.description')}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href="https://github.com/tegnike/aituber-kit" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <Github className="h-4 w-4" /> {t('developer:profile.products.aiTuberKit.buttons.github')} <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href="https://aituberkit.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <Globe className="h-4 w-4" /> {t('developer:profile.products.aiTuberKit.buttons.demo')} <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href="https://note.com/nike_cha_n/n/ne98acb25e00f" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> {t('developer:profile.products.aiTuberKit.buttons.article')} <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
              </div>
            </div>

            {/* AITuberList */}
            <div className="group rounded-xl border bg-white/60 p-4 ring-1 ring-black/5 transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{t('developer:profile.products.aiTuberList.name')}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{t('developer:profile.products.aiTuberList.description')}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href="https://github.com/tegnike/aituber-list" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <Github className="h-4 w-4" /> {t('developer:profile.products.aiTuberList.buttons.github')} <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href="https://aituberlist.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <Globe className="h-4 w-4" /> {t('developer:profile.products.aiTuberList.buttons.site')} <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
              </div>
            </div>

            {/* 美少女OPInterpreter */}
            <div className="group rounded-xl border bg-white/60 p-4 ring-1 ring-black/5 transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{t('developer:profile.products.bishojo.name')}</h3>
                  <p className="mt-1 text-sm text-zinc-600">
                    {t('developer:profile.products.bishojo.description')}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href="https://www.youtube.com/watch?v=Qw2w2UvxcQY&t=2s" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" /> {t('developer:profile.products.bishojo.buttons.demo')} <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href="https://note.com/nike_cha_n/n/nabcfeb7aaf3f" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> {t('developer:profile.products.bishojo.buttons.article')} <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
              </div>
            </div>

            {/* 完全自動AIゲームプレイ&実況 */}
            <div className="group rounded-xl border bg-white/60 p-4 ring-1 ring-black/5 transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{t('developer:profile.products.autoPlay.name')}</h3>
                  <p className="mt-1 text-sm text-zinc-600">
                    {t('developer:profile.products.autoPlay.description')}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href="https://www.youtube.com/watch?v=dRsVVPaOOVk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" /> {t('developer:profile.products.autoPlay.buttons.demo')} <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href="https://note.com/nike_cha_n/n/n96515b745cd2" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> {t('developer:profile.products.autoPlay.buttons.article')} <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* blog Link */}
      <a href={`/dev_blog${locale !== 'ja' ? '?lang=' + locale : ''}`} className="block mt-6">
        <Card className="transition-shadow hover:shadow-lg cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-2 text-lg font-medium">
              <BookOpen className="h-5 w-5 text-green-600" />
              {t('developer:profile.blogLink')}
            </div>
          </CardContent>
        </Card>
      </a>

      {/* Support */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Heart className="h-5 w-5 text-rose-600" /> {t('developer:profile.support.heading')}
          </CardTitle>
          <CardDescription>{t('developer:profile.support.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-700">
            {t('developer:profile.support.text')}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white hover:from-purple-700 hover:via-pink-600 hover:to-purple-700 transition-colors">
              <a href="https://github.com/sponsors/tegnike" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                <Github className="h-4 w-4" /> {t('developer:profile.support.buttons.githubSponsors')} <ExternalLink className="h-4 w-4 opacity-70" />
              </a>
            </Button>
            <Button asChild variant="secondary" className="hover:bg-zinc-200 transition-colors">
              <a href="https://buymeacoffee.com/fDANV1k6iZ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                ☕ {t('developer:profile.support.buttons.buyMeCoffee')} <ExternalLink className="h-4 w-4 opacity-70" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
