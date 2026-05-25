import { CalendarDays, ExternalLink, MessageCircle, Newspaper } from 'lucide-react'
import type { AiCharacterNewsItem } from '../lib/ai-character-news'
import { PageHeader } from './PageHeader'

type Props = {
  items: AiCharacterNewsItem[]
  error?: string
}

const categoryLabels: Record<string, string> = {
  ai_character: 'AIキャラ',
  aituber: 'AITuber',
  ai_vtuber: 'AI VTuber',
  ai_avatar: 'AIアバター',
  virtual_influencer: 'AIインフルエンサー',
  ai_companion: 'AIコンパニオン',
  tooling: '開発ツール',
  business: 'ビジネス',
  research: '研究',
  culture: 'カルチャー',
}

function formatDate(value: string | null): string {
  if (!value) return '公開日不明'
  return new Date(value).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Tokyo',
  })
}

function getHost(item: AiCharacterNewsItem): string {
  if (item.source_name) return item.source_name
  if (item.source_domain) return item.source_domain
  try {
    return new URL(item.url).hostname
  } catch {
    return '出典不明'
  }
}

function getPetAnimation(item: AiCharacterNewsItem, index: number): string {
  const animations = ['waving', 'review', 'running', 'jumping']
  return animations[index % animations.length]
}

export function AiCharacterNews({ items, error }: Props) {
  return (
    <div className="character-page min-h-screen">
      <PageHeader title="AI NEWS" />

      <main className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        <section className="glass-panel mb-8 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-3 text-sm font-semibold text-purple-600">
            <Newspaper className="h-5 w-5" />
            <span>AIキャラクターニュース</span>
          </div>
          <h2 className="mb-4 text-3xl font-black text-[#594A89] md:text-5xl">
            AIキャラの今を短く追う
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            AIニケちゃんが気になったAIキャラクター、AITuber、AI VTuber関連のニュースを要約して掲載しています。
          </p>
        </section>

        {error && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!error && items.length === 0 && (
          <div className="glass-panel p-8 text-center text-gray-600">
            表示できるニュースがまだありません。
          </div>
        )}

        {!error && items.length > 0 && (
          <div className="space-y-5">
            {items.map((item, index) => (
              <article key={item.id} className="glass-panel p-6 md:p-7">
                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-700">
                    {categoryLabels[item.category] || item.category}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                    {getHost(item)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-rose-700">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(item.published_at)}
                  </span>
                </div>

                <h3 className="text-2xl font-black leading-tight text-gray-900 md:text-3xl">
                  <a className="transition-colors hover:text-purple-600" href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </h3>

                <p className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-gray-700">
                  {item.summary}
                </p>

                <div className="nike-comment-wrap mt-5">
                  <div className="grid gap-4 md:grid-cols-[1fr_112px] md:items-end">
                    <div className="nike-comment-bubble">
                      <div className="mb-2 flex items-center gap-2 text-sm font-bold text-purple-700">
                        <MessageCircle className="h-4 w-4" />
                        <span>AIニケちゃんのコメント</span>
                      </div>
                      <div className="nike-comment-body">
                        <div className="nike-comment-pet-slot nike-comment-pet-slot-mobile">
                          <div
                            className={`nike-news-pet nike-news-pet-${getPetAnimation(item, index)}`}
                            role="img"
                            aria-label="話しているAIニケちゃん"
                          />
                        </div>
                        <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                          {item.nike_comment}
                        </p>
                      </div>
                    </div>
                    <div className="nike-comment-pet-slot nike-comment-pet-slot-desktop">
                      <div
                        className={`nike-news-pet nike-news-pet-${getPetAnimation(item, index)}`}
                        role="img"
                        aria-label="話しているAIニケちゃん"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs font-semibold text-gray-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-purple-300 hover:text-purple-600"
                  >
                    元記事を読む
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
