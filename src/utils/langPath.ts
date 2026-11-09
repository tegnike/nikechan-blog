import type { Locale } from '../i18n/config'

/** サイト内リンクに現在の言語を引き継ぐ（日本語は既定なのでパラメータなし） */
export function withLang(path: string, locale: Locale): string {
  if (locale === 'ja') return path
  return `${path}${path.includes('?') ? '&' : '?'}lang=${locale}`
}
