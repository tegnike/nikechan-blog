import derivativeMdJa from '../utils/guidelines/derivative_creation_guideline.md?raw'
import aiMdJa from '../utils/guidelines/ai_generation_guideline.md?raw'
import derivativeMdEn from '../utils/guidelines/en/derivative_creation_guideline.md?raw'
import aiMdEn from '../utils/guidelines/en/ai_generation_guideline.md?raw'
import { mdToHtml } from '../utils/mdToHtml'
import { getT, type Locale } from '../i18n/config'

type Props = {
  active?: 'derivative' | 'ai'
  locale?: Locale
}

export function License({ active = 'derivative', locale = 'ja' }: Props) {
  const t = getT(locale)
  const base = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors';
  const activeClass = 'bg-purple-600 text-white';
  const inactiveClass = 'bg-white/50 border border-purple-200 text-gray-800 hover:bg-purple-50';

  const derivativeMd = locale === 'ja' ? derivativeMdJa : derivativeMdEn
  const aiMd = locale === 'ja' ? aiMdJa : aiMdEn

  const content = active === 'derivative' ? derivativeMd : aiMd
  const html = mdToHtml(content)

  // 両方のmdファイルを結合
  const combinedContent = locale === 'ja'
    ? `# 二次創作ガイドライン\n\n${derivativeMd}\n\n---\n\n# 生成AIガイドライン\n\n${aiMd}`
    : `# Derivative Creation Guidelines\n\n${derivativeMd}\n\n---\n\n# Generative AI Guidelines\n\n${aiMd}`

  const copyButtonText = locale === 'ja' ? '全てのガイドラインをコピー' : 'Copy All Guidelines'

  return (
    <>
      <div className="pt-12 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center">{t('guidelines:heading')}</h1>
      </div>

      {/* コピー用の非表示要素 */}
      <div id="license-content" className="hidden">{combinedContent}</div>

      <div className="w-full flex items-center justify-center gap-3 mt-2 mb-6">
        <a href={`/guidelines${locale !== 'ja' ? '?lang=' + locale : ''}`} className={`${base} ${active === 'derivative' ? activeClass : inactiveClass}`}>
          {t('guidelines:tabs.derivative')}
        </a>
        <a href={`/guidelines/ai${locale !== 'ja' ? '?lang=' + locale : ''}`} className={`${base} ${active === 'ai' ? activeClass : inactiveClass}`}>
          {t('guidelines:tabs.ai')}
        </a>
      </div>

      <div className="container mx-auto max-w-5xl px-4 pb-16">
        <div className="rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm relative">
          {/* コピーボタン */}
          <button
            id="copy-license-btn"
            className="mb-4 md:mb-0 md:absolute md:top-4 md:right-4 w-full md:w-auto px-3 py-2 bg-white border-2 border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copyButtonText}
          </button>
          <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </>
  )
}
