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

  return (
    <>
      <div className="pt-12 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center">GUIDELINES</h1>
      </div>

      <div className="w-full flex items-center justify-center gap-3 mt-2 mb-6">
        <a href="/guidelines" className={`${base} ${active === 'derivative' ? activeClass : inactiveClass}`}>
          二次創作ガイドライン
        </a>
        <a href="/guidelines/ai" className={`${base} ${active === 'ai' ? activeClass : inactiveClass}`}>
          生成AIガイドライン
        </a>
      </div>

      <div className="container mx-auto max-w-5xl px-4 pb-16">
        <div className="rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm">
          <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </>
  )
}
