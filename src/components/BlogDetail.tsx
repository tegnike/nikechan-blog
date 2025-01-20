import { supabase, type Summary } from '../lib/supabase'
import { BlogDetailV1 } from './BlogDetailV1'
import { BlogDetailV2 } from './BlogDetailV2'
import { BlogDetailV3 } from './BlogDetailV3'

type Props = {
  id: string
}

export const BlogDetail = async ({ id }: Props) => {
  const { data: summary, error } = await supabase
    .from('summaries')
    .select('id, public_message, target_date, created_at, version')
    .eq('id', id)
    .single()

  if (error || !summary) {
    return (
      <div className="text-center py-8 text-red-500">
        エラーが発生しました
      </div>
    )
  }

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
            <time className="text-2xl font-medium text-gray-700 dark:text-gray-300 flex items-center gap-3">
              {new Date(summary.target_date).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'short'
              })}
            </time>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-1 sm:p-6 rounded-lg shadow-md mb-6">
          <div className="text-gray-700 dark:text-gray-300">
            {summary.version === 1 ? (
              <BlogDetailV1 data={summary.public_message} />
            ) : summary.version === 2 ? (
              <BlogDetailV2 data={summary.public_message} />
            ) : summary.version === 3 ? (
              <BlogDetailV3 data={summary.public_message} />
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