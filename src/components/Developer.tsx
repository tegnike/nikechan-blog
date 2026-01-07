import { NikeProfile } from './NikeProfile'
import { Locale } from '../i18n/config'

interface DeveloperProps {
  locale: Locale
}

export function Developer({ locale }: DeveloperProps) {
  return <NikeProfile locale={locale} headerTitle="DEVELOPER" />
}
