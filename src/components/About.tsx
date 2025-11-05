import { FC } from 'react'
import { AINikeProfile } from './AINikeProfile'
import { getT, type Locale } from '../i18n/config'

type Props = {
  locale?: Locale
}

export const About: FC<Props> = ({ locale = 'ja' }) => {
  const t = getT(locale)

  return (
    <div className="min-h-screen">
      {/* Heading (aligned with Gallery/License) */}
      <div className="pt-12 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground">{t('about:heading')}</h1>
      </div>
      <div className="max-w-4xl mx-auto">
        {/* AIニケちゃんのプロフィールのみを表示 */}
        <AINikeProfile locale={locale} />
      </div>
    </div>
  )
}
