import type { Summary } from '../lib/supabase'
import { BlogDetailV1 } from './BlogDetailV1'
import { BlogDetailV2 } from './BlogDetailV2'
import { BlogDetailV3 } from './BlogDetailV3'

type Props = {
  summary: Summary
  prevId: string | null
  nextId: string | null
}

export const BlogDetail = ({ summary, prevId, nextId }: Props) => {
  const v3Props = {
    data: summary.public_message,
    public_chat_session_count: summary.public_chat_session_count,
    public_message_count: summary.public_message_count,
    repeat_count: summary.repeat_count,
    podcast: summary.podcast,
    podcast_url: summary.podcast_url
  }

  return (
    <>
      <div className="pt-12 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white">
          LOG
        </h1>
      </div>
      <div className="container mx-auto px-4">
        <div className="text-center p-2 rounded-lg mb-6">
          <div className="prose prose-invert max-w-none">
            <div className="flex items-center justify-center gap-6">
              {prevId !== null ? (
                <a
                  href={`/log/${prevId}`}
                  className="text-3xl text-gray-500 hover:text-gray-300 transition-colors duration-200"
                  aria-label="前の記事"
                >
                  ←
                </a>
              ) : (
                <span className="text-3xl text-gray-700 cursor-not-allowed">←</span>
              )}
              <time className="text-2xl font-medium text-gray-300">
                {new Date(summary.target_date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'short'
                })}
              </time>
              {nextId !== null ? (
                <a
                  href={`/log/${nextId}`}
                  className="text-3xl text-gray-500 hover:text-gray-300 transition-colors duration-200"
                  aria-label="次の記事"
                >
                  →
                </a>
              ) : (
                <span className="text-3xl text-gray-700 cursor-not-allowed">→</span>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-1 sm:p-6 rounded-lg shadow-md mb-6">
          <div className="text-gray-300">
            {summary.version === 1 ? (
              <BlogDetailV1 data={summary.public_message} />
            ) : summary.version === 2 ? (
              <BlogDetailV2 data={summary.public_message} />
            ) : summary.version === 3 ? (
              <div id="blog-detail-v3-container" data-props={JSON.stringify(v3Props)}>
                <BlogDetailV3 {...v3Props} />
              </div>
            ) : (
              <div>バージョンが存在しません{summary.version}</div>
            )}
          </div>
        </div>
        <div className="mt-12 text-center">
          <a
            href="/log"
            className="inline-flex items-center px-6 py-3 rounded-full
                     bg-gray-700 text-gray-200 font-medium
                     transform transition duration-200 ease-in-out
                     hover:bg-gray-600 hover:scale-105 hover:shadow-lg"
          >
            一覧に戻る
          </a>
        </div>
      </div>
    </>
  )
}
