import derivativeMdJa from '../utils/guidelines/derivative_creation_guideline.md?raw'
import aiMdJa from '../utils/guidelines/ai_generation_guideline.md?raw'
import derivativeMdEn from '../utils/guidelines/en/derivative_creation_guideline.md?raw'
import aiMdEn from '../utils/guidelines/en/ai_generation_guideline.md?raw'
import { mdToHtml } from '../utils/mdToHtml'
import { PageHeader } from './PageHeader'
import { getT, type Locale } from '../i18n/config'

type Props = {
  active?: 'derivative' | 'ai'
  locale?: Locale
}

export function License({ active = 'derivative', locale = 'ja' }: Props) {
  const t = getT(locale)

  const baseClass = 'px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200';
  const activeClass = 'bg-white text-pink-500 shadow-md border border-pink-200';
  const inactiveClass = 'bg-white/80 text-gray-600 border border-gray-300 hover:bg-white hover:text-pink-500 hover:border-pink-300 hover:shadow-lg hover:scale-105';

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
    <div className="character-page min-h-screen">
      <PageHeader title="GUIDELINE" />

      {/* コピー用の非表示要素 */}
      <div id="license-content" className="hidden">{combinedContent}</div>

      {/* Main Content */}
      <div className="relative">
        <div className="character-showcase-bg absolute inset-0" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
          {/* Toggle */}
          <div className="w-full flex items-center justify-center gap-3 mb-8">
            <a href={`/guidelines${locale !== 'ja' ? '?lang=' + locale : ''}`} className={`${baseClass} ${active === 'derivative' ? activeClass : inactiveClass}`}>
              {t('guidelines:tabs.derivative')}
            </a>
            <a href={`/guidelines/ai${locale !== 'ja' ? '?lang=' + locale : ''}`} className={`${baseClass} ${active === 'ai' ? activeClass : inactiveClass}`}>
              {t('guidelines:tabs.ai')}
            </a>
          </div>

          {/* Content */}
          <div className="glass-panel p-6 md:p-8 relative">
            {/* コピーボタン */}
            <button
              id="copy-license-btn"
              className="mb-4 md:mb-0 md:absolute md:top-6 md:right-6 w-full md:w-auto px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:border-pink-300 hover:text-pink-500 hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copyButtonText}
            </button>
            <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </div>

      {/* Decorative Footer Gradient */}
      <div className="character-footer h-16 relative overflow-hidden">
        <div className="character-footer-gradient absolute inset-0" />
      </div>
    </div>
  )
}
