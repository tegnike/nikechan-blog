import derivativeMd from '../utils/guidelines/derivative_creation_guideline.md?raw'
import aiMd from '../utils/guidelines/ai_generation_guideline.md?raw'
import { mdToHtml } from '../utils/mdToHtml'

type Props = {
  active?: 'derivative' | 'ai'
}

export function License({ active = 'derivative' }: Props) {
  const base = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors';
  const activeClass = 'bg-purple-600 text-white';
  const inactiveClass = 'bg-white/50 border border-purple-200 text-gray-800 hover:bg-purple-50';

  const content = active === 'derivative' ? derivativeMd : aiMd
  const html = mdToHtml(content)

  // 両方のmdファイルを結合
  const combinedContent = `# 二次創作ガイドライン\n\n${derivativeMd}\n\n---\n\n# 生成AIガイドライン\n\n${aiMd}`

  return (
    <>
      <div className="pt-12 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center">GUIDELINES</h1>
      </div>

      {/* コピー用の非表示要素 */}
      <div id="license-content" className="hidden">{combinedContent}</div>

      <div className="w-full flex items-center justify-center gap-3 mt-2 mb-6">
        <a href="/guidelines" className={`${base} ${active === 'derivative' ? activeClass : inactiveClass}`}>
          二次創作ガイドライン
        </a>
        <a href="/guidelines/ai" className={`${base} ${active === 'ai' ? activeClass : inactiveClass}`}>
          生成AIガイドライン
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
            全てのガイドラインをコピー
          </button>
          <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </>
  )
}
