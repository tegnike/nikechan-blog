type V1Data = {
  session_count: number
  message_count: number
  failed_responses: string[]
  poor_reactions: string[]
  target_date: string
}

type Props = {
  data: V1Data
}

export const BlogDetailV1 = ({ data }: Props) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        AITuberKitデモサイト解析
      </h2>

      {/* セッション情報 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">セッション情報</h3>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p>セッション数: {data.session_count}</p>
          <p>メッセージ数: {data.message_count}</p>
        </div>
      </div>

      {/* 失敗したレスポンス */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">失敗したレスポンス</h3>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <ul className="list-disc pl-5">
            {data.failed_responses.map((response, index) => (
              <li key={index}>{response}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 良くない反応 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">良くない反応</h3>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <ul className="list-disc pl-5">
            {data.poor_reactions.map((reaction, index) => (
              <li key={index}>{reaction}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
} 