export type LocalizedText = {
  ja: string
  en: string
}

export type DeveloperActivityKind = 'talk' | 'exhibition' | 'participation'

export type DeveloperActivityLink = {
  label: LocalizedText
  url: LocalizedText
}

export type DeveloperActivity = {
  date: string
  kind: DeveloperActivityKind
  title: LocalizedText
  description: LocalizedText
  topics: LocalizedText[]
  links: DeveloperActivityLink[]
}

// Public records of Nike's event activity. Add new entries in descending date order.
export const developerActivities: DeveloperActivity[] = [
  {
    date: '2026-05-06',
    kind: 'exhibition',
    title: {
      ja: '生成AIなんでも展示会 Vol.5',
      en: 'Generative AI Anything Expo Vol. 5',
    },
    description: {
      ja: 'AIキャラクターによるゲーム実況とゲームプレイをテーマに、画面認識方式からゲーム状態を直接扱う方式までの試行錯誤を展示。',
      en: 'Exhibited experiments in AI-character game commentary and gameplay, from screen-based recognition to systems that work directly with game state.',
    },
    topics: [
      { ja: 'AIキャラクター', en: 'AI characters' },
      { ja: 'ゲーム実況', en: 'Game commentary' },
      { ja: '展示', en: 'Exhibition' },
    ],
    links: [
      {
        label: { ja: '出展記録', en: 'Exhibition article' },
        url: {
          ja: '/dev-blog/ai-game-expo-2026',
          en: '/dev-blog/ai-game-expo-2026-en?lang=en',
        },
      },
      {
        label: { ja: '出展者ページ', en: 'Exhibitor page' },
        url: {
          ja: 'https://www.genai-expo.com/exhibitors?circle=00297b6cf5a4',
          en: 'https://www.genai-expo.com/exhibitors?circle=00297b6cf5a4',
        },
      },
    ],
  },
  {
    date: '2026-03-03',
    kind: 'talk',
    title: {
      ja: 'OpenClaw実践：自律型AIキャラクター実装解剖',
      en: 'OpenClaw in Practice: Anatomy of an Autonomous AI Character',
    },
    description: {
      ja: '公開Discordで運用したAIニケちゃんを題材に、OpenClawを使った自律型AIキャラクターの実装と、実運用で起きた出来事を紹介。',
      en: 'Presented the implementation and real-world operation of an autonomous AI character built with OpenClaw, using AI Nike-chan in the public Discord as a case study.',
    },
    topics: [
      { ja: 'OpenClaw', en: 'OpenClaw' },
      { ja: 'AIエージェント', en: 'AI agents' },
      { ja: '登壇', en: 'Talk' },
    ],
    links: [
      {
        label: { ja: 'イベントページ', en: 'Event page' },
        url: {
          ja: 'https://connpass.com/event/385438/',
          en: 'https://connpass.com/event/385438/',
        },
      },
      {
        label: { ja: '登壇内容の振り返り', en: 'Talk retrospective' },
        url: {
          ja: '/dev-blog/openclaw-ai-nikechan',
          en: '/dev-blog/openclaw-ai-nikechan-en?lang=en',
        },
      },
    ],
  },
  {
    date: '2024-11-16',
    kind: 'exhibition',
    title: {
      ja: '生成AIなんでも展示会 Vol.2',
      en: 'Generative AI Anything Expo Vol. 2',
    },
    description: {
      ja: 'ゲーム画面をマルチモーダルLLMで認識し、AIがプレイと実況を行うシステムを展示。後のゲーム状態連携方式につながる最初の公開実演。',
      en: 'Demonstrated a system that used a multimodal LLM to read a game screen and generate both gameplay actions and commentary—the first public demo leading to later game-state integrations.',
    },
    topics: [
      { ja: 'マルチモーダルAI', en: 'Multimodal AI' },
      { ja: 'ゲームプレイ', en: 'Game AI' },
      { ja: '展示', en: 'Exhibition' },
    ],
    links: [
      {
        label: { ja: '展示レポート', en: 'Exhibition report' },
        url: {
          ja: 'https://note.com/nike_cha_n/n/n96515b745cd2',
          en: 'https://note.com/nike_cha_n/n/n96515b745cd2',
        },
      },
    ],
  },
]
