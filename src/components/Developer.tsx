import { NikeProfile } from './NikeProfile'
import { Locale, getT } from '../i18n/config'

interface DeveloperProps {
  locale: Locale
}

export function Developer({ locale }: DeveloperProps) {
  const t = getT(locale)
  // Developer ページはニケのプロフィールのみを表示
  return (
    <div className="min-h-screen">
      <div className="pt-12 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground">{t('developer:heading')}</h1>
      </div>
      <div className="max-w-4xl mx-auto">
        <NikeProfile locale={locale} />
      </div>
    </div>
  )
}
