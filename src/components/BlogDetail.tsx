import { supabase, type Summary } from '../lib/supabase'
import { BlogDetailV1 } from './BlogDetailV1'
import { BlogDetailV2 } from './BlogDetailV2'
import { BlogDetailV3 } from './BlogDetailV3'

type Props = {
  id: string
}

export const BlogDetail = async ({ id }: Props) => {
  const { data: summary, error } = await supabase
    .from('daily_summaries')
    .select('id, public_message, target_date, created_at, version, public_chat_session_count, public_message_count, repeat_count, podcast, podcast_url')
    .eq('id', id)
    .single()

  if (error || !summary) {
    return (
      <div className="text-center py-8 text-red-500">
        エラーが発生しました
      </div>
    )
  }

  // Get previous blog post
  const { data: prevPost } = await supabase
    .from('daily_summaries')
    .select('id')
    .lt('target_date', summary.target_date)
    .order('target_date', { ascending: false })
    .limit(1)
    .single()

  // Get next blog post
  const { data: nextPost } = await supabase
    .from('daily_summaries')
    .select('id')
    .gt('target_date', summary.target_date)
    .order('target_date', { ascending: true })
    .limit(1)
    .single()

  return (
    <>
      <div className="pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white">
          NIKELOG
        </h1>
      </div>
      <div className="container mx-auto px-4">
        <div className="text-center p-2 rounded-lg mb-6">
          <div className="prose dark:prose-invert max-w-none">
            <div className="flex items-center justify-center gap-6">
              {prevPost ? (
                <a 
                  href={`/blog/${prevPost.id}`}
                  className="text-3xl text-gray-500 hover:text-gray-300 transition-colors duration-200"
                  aria-label="前の記事"
                >
                  ←
                </a>
              ) : (
                <span className="text-3xl text-gray-700 cursor-not-allowed">←</span>
              )}
              <time className="text-2xl font-medium text-gray-700 dark:text-gray-300">
                {new Date(summary.target_date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'short'
                })}
              </time>
              {nextPost ? (
                <a 
                  href={`/blog/${nextPost.id}`}
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
        <div className="bg-white dark:bg-gray-800 p-1 sm:p-6 rounded-lg shadow-md mb-6">
          <div className="text-gray-700 dark:text-gray-300">
            {summary.version === 1 ? (
              <BlogDetailV1 data={summary.public_message} />
            ) : summary.version === 2 ? (
              <BlogDetailV2 data={summary.public_message} />
            ) : summary.version === 3 ? (
              <BlogDetailV3 
                data={summary.public_message} 
                public_chat_session_count={summary.public_chat_session_count}
                public_message_count={summary.public_message_count}
                repeat_count={summary.repeat_count}
                podcast={summary.podcast}
                podcast_url={summary.podcast_url}
              />
            ) : (
              <div>バージョンが存在しません{summary.version}</div>
            )}
          </div>
        </div>
        <div className="mt-12 text-center">
          <a 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 rounded-full
                     bg-gray-700 text-gray-200 font-medium
                     transform transition duration-200 ease-in-out
                     hover:bg-gray-600 hover:scale-105 hover:shadow-lg
                     dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            一覧に戻る
          </a>
        </div>
      </div>
    </>
  )
} 