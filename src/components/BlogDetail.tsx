import { supabase, type Summary } from '../lib/supabase'

type Props = {
  id: string
}

export const BlogDetail = async ({ id }: Props) => {
  // データ取得
  const { data: summary, error } = await supabase
    .from('summaries')
    .select('id, public_message, target_date, created_at')
    .eq('id', id)
    .single()

  if (error || !summary) {
    return (
      <div className="text-center py-8 text-red-500">
        エラーが発生しました
      </div>
    )
  }

  // JSONデータを整形して表示
  const formatContent = (data: any) => {
    if (typeof data === 'string') return data;
    
    const { session_count, message_count, failed_responses, poor_reactions } = data;
    
    return (
      <>
        <p className="text-xl text-gray-500 mb-6 font-bold">
          {new Date(summary.target_date).toLocaleDateString('ja-JP')}
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">セッション情報</h2>
          <p>セッション数: {session_count}</p>
          <p>メッセージ数: {message_count}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">失敗した回答</h2>
          <ul className="list-disc pl-5 space-y-2">
            {failed_responses.map((response: string, index: number) => (
              <li key={index}>{response}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">改善が必要な反応</h2>
          <ul className="list-disc pl-5 space-y-2">
            {poor_reactions.map((reaction: string, index: number) => (
              <li key={index}>{reaction}</li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center dark:text-white">
          NIKELOG
        </h1>
      </div>
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="text-gray-700 dark:text-gray-300">
            {formatContent(summary.public_message)}
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