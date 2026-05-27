import { Copy } from 'lucide-react'
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

  const baseClass = 'design-toggle-link';
  const activeClass = 'design-toggle-link--active';
  const inactiveClass = 'design-toggle-link--inactive';

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
    <div className="character-page guideline-redesign min-h-screen">
      <section className="site-page-hero" aria-labelledby="guideline-title">
        <div className="character-detail-hero__grid" aria-hidden="true" />
        <div className="site-page-hero__inner">
          <h1 id="guideline-title">GUIDELINE</h1>
          <p>{locale === 'ja' ? '二次創作・生成AI利用のためのルール' : 'Rules for derivative works and generative AI usage'}</p>
        </div>
      </section>

      {/* コピー用の非表示要素 */}
      <div id="license-content" className="hidden">{combinedContent}</div>

      {/* Main Content */}
      <div className="relative">
        <div className="character-showcase-bg absolute inset-0" />
        <div className="designed-page-main relative z-10 max-w-5xl mx-auto px-4 py-8">
          {/* Toggle */}
          <div className="design-toggle">
            <a href={`/guidelines${locale !== 'ja' ? '?lang=' + locale : ''}`} className={`${baseClass} ${active === 'derivative' ? activeClass : inactiveClass}`}>
              {t('guidelines:tabs.derivative')}
            </a>
            <a href={`/guidelines/ai${locale !== 'ja' ? '?lang=' + locale : ''}`} className={`${baseClass} ${active === 'ai' ? activeClass : inactiveClass}`}>
              {t('guidelines:tabs.ai')}
            </a>
          </div>

          {/* Content */}
          <div className="glass-panel guideline-content-panel p-6 md:p-8 relative">
            {/* コピーボタン */}
            <div className="guideline-copy-row">
              <button
                id="copy-license-btn"
                type="button"
                className="guideline-copy-button"
              >
                <Copy className="h-4 w-4" aria-hidden="true" />
                {copyButtonText}
              </button>
            </div>
            <article className="prose guideline-prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
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
