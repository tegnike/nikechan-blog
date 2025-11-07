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
  User,
  Calendar,
  Users,
  Hash,
  Heart,
  Music,
  Palette,
  Book,
  Coffee,
  Gamepad2,
  Zap,
  Star,
  Cpu,
  Code2,
  Shield,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './lp/ui/card'
import { Button } from './lp/ui/button'
import { Separator } from './lp/ui/separator'
import { Locale, getT } from '../i18n/config'

interface AINikeProfileProps {
  locale: Locale
}

export const AINikeProfile: FC<AINikeProfileProps> = ({ locale }) => {
  const t = getT(locale)
  const AVATAR_SRC = "/images/about/ai_nikechan_icon.png";
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
                    if (img.src.endsWith("ai_nikechan_icon.png")) {
                      img.src = AVATAR_FALLBACK_SRC;
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2">
                <h1 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">{t('about:profile.name')}</h1>
              </div>
              <p className="mt-2 text-sm text-zinc-600">{t('about:profile.role')}</p>

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
              <Bot className="h-5 w-5 text-purple-600" /> {t('about:profile.overview.heading')}
            </CardTitle>
            <CardDescription>{t('about:profile.overview.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 leading-relaxed text-zinc-700">
            {(t('about:profile.overview.text', { returnObjects: true }) as string[]).map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-pink-600" /> {t('about:profile.contact.heading')}
            </CardTitle>
            <CardDescription>{t('about:profile.contact.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="font-medium">{t('about:profile.contact.aiTuberKit.label')}</p>
              <p className="text-zinc-600">{t('about:profile.contact.aiTuberKit.description')}</p>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="mt-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-800 transition-colors"
              >
                <a href="https://aituberkit.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  <Globe className="h-4 w-4" /> {t('about:profile.contact.aiTuberKit.button')} <ExternalLink className="h-4 w-4 opacity-70" />
                </a>
              </Button>
            </div>
            <Separator />
            <div>
              <p className="font-medium">{t('about:profile.contact.twitter.label')}</p>
              <p className="text-zinc-600">{t('about:profile.contact.twitter.description')}</p>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="mt-2 border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400 hover:text-pink-700 transition-colors"
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
      <a href={`/developer${locale !== 'ja' ? '?lang=' + locale : ''}`} className="block mt-6">
        <Card className="transition-shadow hover:shadow-lg cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-2 text-lg font-medium">
              <Sparkles className="h-5 w-5 text-purple-600" />
              {t('about:profile.masterLink')}
            </div>
          </CardContent>
        </Card>
      </a>

      {/* Profile */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5 text-pink-600" /> {t('about:profile.details.heading')}
          </CardTitle>
          <CardDescription>{t('about:profile.details.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-zinc-200 overflow-hidden">
              <div className="bg-zinc-50 px-3 py-2 flex items-center gap-2">
                <Hash className="h-4 w-4 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-600">{t('about:profile.details.age.label')}</span>
              </div>
              <div className="px-3 py-2 bg-white">
                <p className="font-semibold text-zinc-900">{t('about:profile.details.age.value')}</p>
              </div>
            </div>
            <div className="rounded-lg border border-zinc-200 overflow-hidden">
              <div className="bg-zinc-50 px-3 py-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-600">{t('about:profile.details.birthday.label')}</span>
              </div>
              <div className="px-3 py-2 bg-white">
                <p className="font-semibold text-zinc-900">{t('about:profile.details.birthday.value')}</p>
              </div>
            </div>
            <div className="rounded-lg border border-zinc-200 overflow-hidden">
              <div className="bg-zinc-50 px-3 py-2 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-600">{t('about:profile.details.pronoun.label')}</span>
              </div>
              <div className="px-3 py-2 bg-white">
                <p className="font-semibold text-zinc-900">{t('about:profile.details.pronoun.value')}</p>
              </div>
            </div>
            <div className="rounded-lg border border-zinc-200 overflow-hidden">
              <div className="bg-zinc-50 px-3 py-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-600">{t('about:profile.details.family.label')}</span>
              </div>
              <div className="px-3 py-2 bg-white">
                <p className="font-semibold text-zinc-900">{t('about:profile.details.family.value')}</p>
              </div>
            </div>
            <div className="rounded-lg border border-zinc-200 overflow-hidden">
              <div className="bg-zinc-50 px-3 py-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-600">{t('about:profile.details.tone.label')}</span>
              </div>
              <div className="px-3 py-2 bg-white">
                <p className="font-semibold text-zinc-900">{t('about:profile.details.tone.value')}</p>
              </div>
            </div>
            <div className="rounded-lg border border-zinc-200 overflow-hidden">
              <div className="bg-zinc-50 px-3 py-2 flex items-center gap-2">
                <Palette className="h-4 w-4 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-600">{t('about:profile.details.imageColor.label')}</span>
              </div>
              <div className="px-3 py-2 bg-white">
                <p className="font-semibold text-zinc-900 flex items-center gap-2">
                  {t('about:profile.details.imageColor.value')} <span className="inline-block w-4 h-4" style={{ backgroundColor: '#5A4C97' }}></span>
                </p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-left text-sm text-zinc-500">{t('about:profile.details.note')}</p>
        </CardContent>
      </Card>

      {/* History */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Rocket className="h-5 w-5 text-blue-600" /> {t('about:profile.history.heading')}
          </CardTitle>
          <CardDescription>{t('about:profile.history.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative ml-2 space-y-8 border-l border-zinc-200 pl-6">
            {(t('about:profile.history.events', { returnObjects: true }) as Array<{date: string, label: string, description: string}>).map((event, index) => {
              const gradients = [
                'from-blue-500 to-cyan-500',
                'from-purple-500 to-pink-500',
                'from-amber-500 to-orange-500',
                'from-emerald-500 to-teal-500',
                'from-violet-500 to-indigo-500',
                'from-rose-500 to-purple-500',
              ];
              return (
                <div key={index} className="relative">
                  <div className={`absolute -left-[29px] top-1 size-2 rounded-full bg-gradient-to-r ${gradients[index % gradients.length]}`} />
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <span>{event.date}</span>
                    <Separator orientation="vertical" className="mx-1 h-4" />
                    <span className="inline-flex items-center gap-1">{event.label}</span>
                  </div>
                  <p className="mt-2 text-zinc-700">{event.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* LINE Stamp Section */}
      <Card className="mt-6 border-2 border-green-200 bg-gradient-to-br from-green-50/50 to-emerald-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
            </svg>
            {t('about:profile.lineStamp.heading', 'LINEスタンプ販売中！')}
          </CardTitle>
          <CardDescription>{t('about:profile.lineStamp.description', 'AIニケちゃんのLINEスタンプができました')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/2 flex justify-center">
              <a href="https://store.line.me/stickershop/product/32003839/ja" target="_blank" rel="noopener noreferrer">
                <img
                  src="/images/about/line_stamp.png"
                  alt="AIニケちゃん LINEスタンプ"
                  className="rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 max-w-full h-auto border-2 border-green-100"
                />
              </a>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <p className="text-zinc-700 text-base">
                {t('about:profile.lineStamp.text', '日常で使えるかわいいスタンプをぜひご利用ください！')}
              </p>
              <Button
                asChild
                size="lg"
                className="w-full bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                <a href="https://store.line.me/stickershop/product/32003839/ja" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                  </svg>
                  {t('about:profile.lineStamp.button', 'LINE STOREで見る')} <ExternalLink className="h-4 w-4 opacity-70" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Heart className="h-5 w-5 text-rose-600" /> {t('about:profile.support.heading')}
          </CardTitle>
          <CardDescription>{t('about:profile.support.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-zinc-700">
              {t('about:profile.support.text')}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              {(t('about:profile.support.features', { returnObjects: true }) as string[]).map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-purple-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                asChild
                size="sm"
                className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                <a href="https://nikechan.fanbox.cc/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  <Heart className="h-4 w-4" /> {t('about:profile.support.buttons.fanbox')} <ExternalLink className="h-4 w-4 opacity-70" />
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-colors"
              >
                <a href="https://discord.gg/G4E5Sf3yj3" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" /> {t('about:profile.support.buttons.discord')} <ExternalLink className="h-4 w-4 opacity-70" />
                </a>
              </Button>
            </div>
          </div>
          <Separator />
          <div className="rounded-lg border border-zinc-200 bg-white/80 p-4">
            <div className="flex items-center gap-2 text-zinc-900">
              <Shield className="h-4 w-4 text-indigo-600" />
              <span className="text-base font-semibold">{t('about:profile.support.sponsorChannel.title')}</span>
            </div>
            <p className="mt-2 text-sm text-zinc-600">
              {t('about:profile.support.sponsorChannel.description')}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              {(t('about:profile.support.sponsorChannel.benefits', { returnObjects: true }) as string[]).map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-zinc-500">
              {t('about:profile.support.sponsorChannel.note')}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
