import { FC } from 'react'
import { AboutPresence } from './AboutPresence'
import { type Locale } from '../i18n/config'

type Props = {
  locale?: Locale
}

export const About: FC<Props> = ({ locale = 'ja' }) => {
  return <AboutPresence locale={locale} />
}
