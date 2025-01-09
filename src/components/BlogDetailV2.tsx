import { supabase, type Summary } from '../lib/supabase'

type V2Data = {
  conversation_length_metrics: {
    total_sessions: number
    total_messages: number
    distribution: {
      '1-3_turns': number
      '4-7_turns': number
      '8-10_turns': number
      '11-15_turns': number
      'over_15_turns': number
    }
  }
  conversation_analyses: {
    long_conversations: {
      user_characters: number
      ai_characters: number
      user_ai_question_ratio: {
        user_questions: number
        ai_questions: number
      }
      question_types: {
        yes_no_questions: number
        explanation_questions: number
        confirmation_questions: number
        how_to_questions: number
        opinion_questions: number
        choice_questions: number
        example_questions: number
        experience_questions: number
        meta_questions: number
      }
      dialogue_patterns: {
        simple_resolution: number
        deep_dive: number
        correction: number
        casual_expansion: number
        multi_topic: number
        problem_solving: number
      }
      topics: string[]
    }
    short_conversations: {
      user_characters: number
      ai_characters: number
      user_ai_question_ratio: {
        user_questions: number
        ai_questions: number
      }
      question_types: {
        yes_no_questions: number
        explanation_questions: number
        confirmation_questions: number
        how_to_questions: number
        opinion_questions: number
        choice_questions: number
        example_questions: number
        experience_questions: number
        meta_questions: number
      }
      dialogue_patterns: {
        simple_resolution: number
        deep_dive: number
        correction: number
        casual_expansion: number
        multi_topic: number
        problem_solving: number
      }
      topics: string[]
    }
  }
  unknown_question_analysis: {
    questions: string[]
    unknown_reasons: {
      knowledge_limit: number
      context_misunderstanding: number
      technical_limitation: number
      data_insufficiency: number
      ethical_restriction: number
    }
    response_patterns: {
      complete_unknown: number
      alternative_suggestion: number
      additional_info_request: number
      partial_answer: number
    }
  }
  dissatisfied_conversation_analysis: {
    dissatisfaction_types: {
      response_length_issue: number
      complexity_issue: number
      intent_mismatch: number
      ambiguous_answer: number
      impractical_answer: number
    }
    improvement_possibilities: {
      length_adjustment: number
      detail_adjustment: number
      intent_confirmation: number
      example_addition: number
      system_enhancement: number
    }
    user_patterns: {
      explicit_complaint: number
      question_rephrasing: number
      abrupt_termination: number
      negative_short_response: number
      passive_reaction: number
    }
    conversation_pairs: string[]
  }
  target_date: string
}

type Props = {
  data: V2Data
}

export const BlogDetailV2 = ({ data }: Props) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        AITuberKitデモサイト解析
      </h2>

      {/* 会話の長さに関する統計 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">会話の長さに関する統計</h3>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p>総セッション数: {data.conversation_length_metrics.total_sessions}</p>
          <p>総メッセージ数: {data.conversation_length_metrics.total_messages}</p>
          <h4 className="font-bold mt-2 mb-1">会話の長さの分布:</h4>
          <ul className="list-disc pl-5">
            <li>1-3ターン: {data.conversation_length_metrics.distribution['1-3_turns']}</li>
            <li>4-7ターン: {data.conversation_length_metrics.distribution['4-7_turns']}</li>
            <li>8-10ターン: {data.conversation_length_metrics.distribution['8-10_turns']}</li>
            <li>11-15ターン: {data.conversation_length_metrics.distribution['11-15_turns']}</li>
            <li>15ターン以上: {data.conversation_length_metrics.distribution['over_15_turns']}</li>
          </ul>
        </div>
      </div>

      {/* 長い会話と短い会話の比較分析 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">会話分析の比較</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {/* 長い会話の分析 */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-bold mb-3">長い会話 (7ターン以上)</h4>
            <div className="space-y-4">
              <div>
                <p>ユーザーの平均文字数: {data.conversation_analyses.long_conversations.user_characters}</p>
                <p>AIの平均文字数: {data.conversation_analyses.long_conversations.ai_characters}</p>
              </div>
              <div>
                <h4 className="font-bold">質問数の比率:</h4>
                <p>ユーザーからの質問: {data.conversation_analyses.long_conversations.user_ai_question_ratio.user_questions}</p>
                <p>AIからの質問: {data.conversation_analyses.long_conversations.user_ai_question_ratio.ai_questions}</p>
                {(() => {
                  const total = data.conversation_analyses.long_conversations.user_ai_question_ratio.user_questions + 
                                data.conversation_analyses.long_conversations.user_ai_question_ratio.ai_questions;
                  const userPercent = Math.round(data.conversation_analyses.long_conversations.user_ai_question_ratio.user_questions / total * 100);
                  const aiPercent = 100 - userPercent;
                  return <p>比率: {userPercent}:{aiPercent}</p>;
                })()}
              </div>
              <div>
                <h4 className="font-bold">質問タイプの分布:</h4>
                <ul className="list-disc pl-5">
                  <li>はい/いいえ質問: {data.conversation_analyses.long_conversations.question_types.yes_no_questions}</li>
                  <li>説明を求める質問: {data.conversation_analyses.long_conversations.question_types.explanation_questions}</li>
                  <li>確認質問: {data.conversation_analyses.long_conversations.question_types.confirmation_questions}</li>
                  <li>方法を尋ねる質問: {data.conversation_analyses.long_conversations.question_types.how_to_questions}</li>
                  <li>意見を求める質問: {data.conversation_analyses.long_conversations.question_types.opinion_questions}</li>
                  <li>選択質問: {data.conversation_analyses.long_conversations.question_types.choice_questions}</li>
                  <li>例を求める質問: {data.conversation_analyses.long_conversations.question_types.example_questions}</li>
                  <li>経験を尋ねる質問: {data.conversation_analyses.long_conversations.question_types.experience_questions}</li>
                  <li>メタ質問: {data.conversation_analyses.long_conversations.question_types.meta_questions}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold">対話パターンの分布:</h4>
                <ul className="list-disc pl-5">
                  <li>単純な解決: {data.conversation_analyses.long_conversations.dialogue_patterns.simple_resolution}</li>
                  <li>深掘り: {data.conversation_analyses.long_conversations.dialogue_patterns.deep_dive}</li>
                  <li>修正: {data.conversation_analyses.long_conversations.dialogue_patterns.correction}</li>
                  <li>カジュアルな展開: {data.conversation_analyses.long_conversations.dialogue_patterns.casual_expansion}</li>
                  <li>複数トピック: {data.conversation_analyses.long_conversations.dialogue_patterns.multi_topic}</li>
                  <li>問題解決: {data.conversation_analyses.long_conversations.dialogue_patterns.problem_solving}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold">主なトピック:</h4>
                <ul className="list-disc pl-5">
                  {data.conversation_analyses.long_conversations.topics.map((topic: string, index: number) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 短い会話の分析 */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-bold mb-3">短い会話 (7ターン未満)</h4>
            <div className="space-y-4">
              <div>
                <p>ユーザーの平均文字数: {data.conversation_analyses.short_conversations.user_characters}</p>
                <p>AIの平均文字数: {data.conversation_analyses.short_conversations.ai_characters}</p>
              </div>
              <div>
                <h4 className="font-bold">質問数の比率:</h4>
                <p>ユーザーからの質問: {data.conversation_analyses.short_conversations.user_ai_question_ratio.user_questions}</p>
                <p>AIからの質問: {data.conversation_analyses.short_conversations.user_ai_question_ratio.ai_questions}</p>
                {(() => {
                  const total = data.conversation_analyses.short_conversations.user_ai_question_ratio.user_questions + 
                                data.conversation_analyses.short_conversations.user_ai_question_ratio.ai_questions;
                  const userPercent = Math.round(data.conversation_analyses.short_conversations.user_ai_question_ratio.user_questions / total * 100);
                  const aiPercent = 100 - userPercent;
                  return <p>比率: {userPercent}:{aiPercent}</p>;
                })()}
              </div>
              <div>
                <h4 className="font-bold">質問タイプの分布:</h4>
                <ul className="list-disc pl-5">
                  <li>はい/いいえ質問: {data.conversation_analyses.short_conversations.question_types.yes_no_questions}</li>
                  <li>説明を求める質問: {data.conversation_analyses.short_conversations.question_types.explanation_questions}</li>
                  <li>確認質問: {data.conversation_analyses.short_conversations.question_types.confirmation_questions}</li>
                  <li>方法を尋ねる質問: {data.conversation_analyses.short_conversations.question_types.how_to_questions}</li>
                  <li>意見を求める質問: {data.conversation_analyses.short_conversations.question_types.opinion_questions}</li>
                  <li>選択質問: {data.conversation_analyses.short_conversations.question_types.choice_questions}</li>
                  <li>例を求める質問: {data.conversation_analyses.short_conversations.question_types.example_questions}</li>
                  <li>経験を尋ねる質問: {data.conversation_analyses.short_conversations.question_types.experience_questions}</li>
                  <li>メタ質問: {data.conversation_analyses.short_conversations.question_types.meta_questions}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold">対話パターンの分布:</h4>
                <ul className="list-disc pl-5">
                  <li>単純な解決: {data.conversation_analyses.short_conversations.dialogue_patterns.simple_resolution}</li>
                  <li>深掘り: {data.conversation_analyses.short_conversations.dialogue_patterns.deep_dive}</li>
                  <li>修正: {data.conversation_analyses.short_conversations.dialogue_patterns.correction}</li>
                  <li>カジュアルな展開: {data.conversation_analyses.short_conversations.dialogue_patterns.casual_expansion}</li>
                  <li>複数トピック: {data.conversation_analyses.short_conversations.dialogue_patterns.multi_topic}</li>
                  <li>問題解決: {data.conversation_analyses.short_conversations.dialogue_patterns.problem_solving}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold">主なトピック:</h4>
                <ul className="list-disc pl-5">
                  {data.conversation_analyses.short_conversations.topics.map((topic: string, index: number) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 不明な質問の分析 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">不明な質問の分析</h3>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="font-bold mb-2">不明な質問の例:</h4>
          <ul className="list-disc pl-5 mb-4">
            {data.unknown_question_analysis.questions.map((question: string, index: number) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
          
          <h4 className="font-bold mb-2">不明な理由の分布:</h4>
          <ul className="list-disc pl-5 mb-4">
            <li>知識の制限: {data.unknown_question_analysis.unknown_reasons.knowledge_limit}</li>
            <li>文脈理解の失敗: {data.unknown_question_analysis.unknown_reasons.context_misunderstanding}</li>
            <li>技術的制限: {data.unknown_question_analysis.unknown_reasons.technical_limitation}</li>
            <li>データ不足: {data.unknown_question_analysis.unknown_reasons.data_insufficiency}</li>
            <li>倫理的制限: {data.unknown_question_analysis.unknown_reasons.ethical_restriction}</li>
          </ul>

          <h4 className="font-bold mb-2">応答パターンの分布:</h4>
          <ul className="list-disc pl-5">
            <li>完全な「わかりません」: {data.unknown_question_analysis.response_patterns.complete_unknown}</li>
            <li>代替案の提示: {data.unknown_question_analysis.response_patterns.alternative_suggestion}</li>
            <li>追加情報を求める: {data.unknown_question_analysis.response_patterns.additional_info_request}</li>
            <li>部分的な回答: {data.unknown_question_analysis.response_patterns.partial_answer}</li>
          </ul>
        </div>
      </div>

      {/* 不満足な会話の分析 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">不満足な会話の分析</h3>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="font-bold mb-2">不満足の種類:</h4>
          <ul className="list-disc pl-5 mb-4">
            <li>回答の長さの問題: {data.dissatisfied_conversation_analysis.dissatisfaction_types.response_length_issue}</li>
            <li>複雑さの問題: {data.dissatisfied_conversation_analysis.dissatisfaction_types.complexity_issue}</li>
            <li>意図の不一致: {data.dissatisfied_conversation_analysis.dissatisfaction_types.intent_mismatch}</li>
            <li>曖昧な回答: {data.dissatisfied_conversation_analysis.dissatisfaction_types.ambiguous_answer}</li>
            <li>実用的でない回答: {data.dissatisfied_conversation_analysis.dissatisfaction_types.impractical_answer}</li>
          </ul>
          <h4 className="font-bold mb-2">改善の可能性:</h4>
          <ul className="list-disc pl-5 mb-4">
            <li>長さの調整: {data.dissatisfied_conversation_analysis.improvement_possibilities.length_adjustment}</li>
            <li>詳細さの調整: {data.dissatisfied_conversation_analysis.improvement_possibilities.detail_adjustment}</li>
            <li>意図の確認: {data.dissatisfied_conversation_analysis.improvement_possibilities.intent_confirmation}</li>
            <li>例の追加: {data.dissatisfied_conversation_analysis.improvement_possibilities.example_addition}</li>
            <li>システムの強化: {data.dissatisfied_conversation_analysis.improvement_possibilities.system_enhancement}</li>
          </ul>
          <div className="mb-4">
            <h4 className="font-bold mb-2">ユーザーの反応パターン:</h4>
            <ul className="list-disc pl-5 mb-4">
              <li>明確な不満の表明: {data.dissatisfied_conversation_analysis.user_patterns.explicit_complaint}</li>
              <li>質問の言い換え/再質問: {data.dissatisfied_conversation_analysis.user_patterns.question_rephrasing}</li>
              <li>会話の突然の終了: {data.dissatisfied_conversation_analysis.user_patterns.abrupt_termination}</li>
              <li>短い否定的な返答: {data.dissatisfied_conversation_analysis.user_patterns.negative_short_response}</li>
              <li>消極的な反応: {data.dissatisfied_conversation_analysis.user_patterns.passive_reaction}</li>
            </ul>
          </div>
          <h4 className="font-bold mb-2">不満足な会話の例:</h4>
          <ul className="list-disc pl-5 space-y-2">
            {data.dissatisfied_conversation_analysis.conversation_pairs.map((pair: string, index: number) => (
              <li key={index}>
                {pair}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
} 