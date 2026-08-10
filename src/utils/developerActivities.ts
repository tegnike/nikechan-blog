export type LocalizedText = {
  ja: string
  en: string
}

export type DeveloperActivityKind = 'talk' | 'exhibition' | 'participation'

export type DeveloperActivityLink = {
  label: LocalizedText
  url: LocalizedText
}

export type DeveloperActivitySlides = {
  title: LocalizedText
  url: string
  imageDirectory: string
  pageCount: number
}

export type DeveloperActivity = {
  slug: string
  date: string
  kind: DeveloperActivityKind
  title: LocalizedText
  description: LocalizedText
  topics: LocalizedText[]
  links: DeveloperActivityLink[]
  slides?: DeveloperActivitySlides
}

// Public records of Nike's event activity. Add new entries in descending date order.
export const developerActivities: DeveloperActivity[] = [
  {
    slug: 'alibaba-meetup-sapporo-2026',
    date: '2026-08-08',
    kind: 'talk',
    title: {
      ja: 'AlibabaMeetupSapporo',
      en: 'Alibaba Meetup Sapporo',
    },
    description: {
      ja: 'Japanese-RP-BenchでQwenを含む9モデルを比較した結果をもとに、特定ロールの維持、会話の進め方、場面による違いを発表。特にAlibabaが開発したQwenで観察した再現性と限界を共有。',
      en: 'Presented Japanese-RP-Bench results comparing nine models across specified-role retention, conversational progression, and scenario differences, with a particular focus on the repeatability and limitations observed in Alibaba-developed Qwen.',
    },
    topics: [
      { ja: 'Qwen', en: 'Qwen' },
      { ja: 'Japanese-RP-Bench', en: 'Japanese-RP-Bench' },
      { ja: '登壇', en: 'Talk' },
    ],
    links: [
      {
        label: { ja: 'イベントページ', en: 'Event page' },
        url: {
          ja: 'https://aiau.connpass.com/event/400273/',
          en: 'https://aiau.connpass.com/event/400273/',
        },
      },
    ],
    slides: {
      title: {
        ja: '同じキャラクターを9モデルに演じさせて振る舞いの違いを見てみた',
        en: 'How Nine Models Behaved When Playing the Same Character',
      },
      url: '/slides/alibaba-meetup-sapporo-2026.pdf',
      imageDirectory: '/slides/alibaba-meetup-sapporo-2026',
      pageCount: 27,
    },
  },
  {
    slug: 'ai-contents-boost-06',
    date: '2026-06-26',
    kind: 'talk',
    title: {
      ja: 'AIコンテンツ勉強会【AI CONTENTS BOOST】#06',
      en: 'AI CONTENTS BOOST #06',
    },
    description: {
      ja: '「AIキャラクターはどこまで“自分の存在”になれるのか」をテーマに、AITuberKitとAIニケちゃんの開発・長期運用、AIエージェント開発の実践を紹介するゲスト登壇。',
      en: 'A guest talk on how far an AI character can become a presence of its own, drawing on the development and long-term operation of AITuberKit, AI Nike-chan, and practical AI agent work.',
    },
    topics: [
      { ja: 'AITuberKit', en: 'AITuberKit' },
      { ja: 'AIニケちゃん', en: 'AI Nike-chan' },
      { ja: '登壇', en: 'Talk' },
    ],
    links: [
      {
        label: { ja: 'イベントページ', en: 'Event page' },
        url: {
          ja: 'https://peatix.com/event/5045350',
          en: 'https://peatix.com/event/5045350',
        },
      },
    ],
    slides: {
      title: {
        ja: 'AIキャラクター開発者が考える作り方と育て方',
        en: 'How an AI Character Developer Thinks About Creating and Nurturing Characters',
      },
      url: '/slides/ai-contents-boost-06.pdf',
      imageDirectory: '/slides/ai-contents-boost-06',
      pageCount: 21,
    },
  },
  {
    slug: 'generative-ai-expo-5',
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
    slug: 'openclaw-autonomous-ai-character',
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
    slug: 'generative-ai-expo-2',
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

export const getDeveloperActivityBySlug = (slug: string) =>
  developerActivities.find((activity) => activity.slug === slug)
