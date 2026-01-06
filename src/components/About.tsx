import { FC } from 'react'
import { AINikeProfile } from './AINikeProfile'
import { type Locale } from '../i18n/config'

type Props = {
  locale?: Locale
}

export const About: FC<Props> = ({ locale = 'ja' }) => {
  return <AINikeProfile locale={locale} headerTitle="ABOUT" />
}
