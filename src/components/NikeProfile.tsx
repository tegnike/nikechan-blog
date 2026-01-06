import { FC } from 'react'
import { ExternalLink, BookOpen, FileText, Video, Heart, Coffee } from 'lucide-react'
import { Github } from 'lucide-react'
import { CharacterDetail } from './CharacterDetail'
import { Locale } from '../i18n/config'

interface NikeProfileProps {
  locale: Locale
  headerTitle?: string
}

export const NikeProfile: FC<NikeProfileProps> = ({ locale, headerTitle }) => {
  const isJa = locale === 'ja'

  const profileItems = isJa
    ? [
        { label: '居住地', value: 'ポーランド' },
        { label: '言語', value: '日本語, 英語' },
        { label: '職業', value: 'AIエンジニア' },
        { label: '専門', value: 'LLM応用開発, AIキャラクター' },
        {
          label: 'イメージカラー',
          value: (
            <span className="flex items-center gap-2">
              ピンク
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#F9A3AB' }}
              />
            </span>
          ),
        },
      ]
    : [
        { label: 'Location', value: 'Poland' },
        { label: 'Languages', value: 'Japanese, English' },
        { label: 'Occupation', value: 'AI Engineer' },
        { label: 'Specialty', value: 'LLM Applications, AI Characters' },
        {
          label: 'Image Color',
          value: (
            <span className="flex items-center gap-2">
              Pink
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#F9A3AB' }}
              />
            </span>
          ),
        },
      ]

  const description = isJa
    ? [
        'ポーランド在住のWeb系フルスタック開発者として、数年間にわたりリモートワークを通して日本のプロジェクトに参画。',
        'バックエンド開発を中心に経験を積む中で、現在はPythonやReactなどを用いたLLM応用の開発に携わるAIエンジニアとして活動中。最新のAI技術については常にキャッチアップし、定期的にSNSや技術記事を通して情報を発信している。',
        '個人開発では「AITuberKit」などのAIツールを公開し、AIとWeb技術を組み合わせた新たなアプリケーションの可能性を探求している。また、AIキャラクター「AIニケちゃん」のマスターとして、開発やIP活動にも取り組んでいる。',
      ]
    : [
        'A full-stack web developer based in Poland, participating in Japanese projects through remote work for several years.',
        'While gaining experience primarily in backend development, currently active as an AI engineer working on LLM application development using Python, React, and more. Always keeping up with the latest AI technologies and regularly sharing information through SNS and technical articles.',
        'In personal development, publishing AI tools like "AITuberKit" and exploring new possibilities for applications combining AI and web technologies. Also working on development and IP activities as the master of AI character "AI Nikechan".',
      ]

  const links = [
    {
      label: 'Twitter',
      url: 'https://twitter.com/tegnike',
      icon: <ExternalLink className="w-4 h-4" />,
    },
    {
      label: 'GitHub',
      url: 'https://github.com/tegnike',
      icon: <Github className="w-4 h-4" />,
    },
    {
      label: 'YouTube',
      url: 'https://www.youtube.com/@nikechan',
      icon: <Video className="w-4 h-4" />,
    },
    {
      label: 'Zenn',
      url: 'https://zenn.dev/nikechan',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      label: 'note',
      url: 'https://note.com/nike_cha_n',
      icon: <FileText className="w-4 h-4" />,
    },
  ]

  // Career items from docs/about-nike.md
  const careerItems = isJa
    ? [
        {
          date: '〜2023',
          label: 'Web Developer',
          description:
            'フルリモートで日本のプロジェクトに参画。Ruby on Rails、React、Vue.jsなどを用いたWebアプリケーションの開発に従事。予約システム、ECサイト、オンラインくじサイトなど、様々なプロジェクトでリードエンジニアとして活躍。',
        },
        {
          date: '2024〜',
          label: 'AI Engineer',
          description:
            '日本および英語圏のプロジェクトにおいて、AIキャラクターやAIエージェントの開発に従事。PythonやTypeScriptなどを用い、LLMを活用した自然な会話システムの実装や、独自の記憶機構の設計など、AI応用開発全般を担当する。また、CursorやDevinなどのAIツールを駆使したAI駆動開発を積極的に取り入れている。',
        },
      ]
    : [
        {
          date: '〜2023',
          label: 'Web Developer',
          description:
            'Participated in Japanese projects fully remotely. Engaged in web application development using Ruby on Rails, React, Vue.js, etc. Worked as a lead engineer on various projects including reservation systems, EC sites, and online lottery sites.',
        },
        {
          date: '2024〜',
          label: 'AI Engineer',
          description:
            'Working on AI character and AI agent development for projects in Japan and English-speaking countries. Using Python and TypeScript to implement natural conversation systems leveraging LLMs, design unique memory mechanisms, and handle general AI application development. Also actively adopting AI-driven development using tools like Cursor and Devin.',
        },
      ]

  // Products from docs/about-nike.md
  const products = isJa
    ? [
        {
          name: 'AITuberKit',
          year: '2024',
          description:
            '誰でも手軽にAIキャラクターチャットやAITuberシステムを構築できるプロジェクト。多数のLLMやTTSサービスに対応し、柔軟なカスタマイズが可能。ReactとTypeScriptを採用。',
          links: [
            { label: 'GitHub', url: 'https://github.com/tegnike/aituber-kit' },
            { label: 'Demo', url: 'https://aituberkit.com' },
            {
              label: '紹介記事',
              url: 'https://note.com/nike_cha_n/n/ne98acb25e00f',
            },
          ],
        },
        {
          name: 'AITuberList',
          year: '2024',
          description: 'YouTubeに投稿しているAITuberをまとめたサイト。',
          links: [
            { label: 'GitHub', url: 'https://github.com/tegnike/aituber-list' },
            { label: 'Site', url: 'https://aituberlist.net' },
          ],
        },
        {
          name: '美少女OPInterpreter',
          year: '2023',
          description:
            'Live2Dキャラクターとプログラミング実行環境を融合した対話型開発支援ツール。美少女キャラクターとの会話を通じて、直感的にプログラムの実行が可能。',
          links: [
            {
              label: 'デモ動画',
              url: 'https://www.youtube.com/watch?v=Qw2w2UvxcQY&t=2s',
            },
            {
              label: '紹介記事',
              url: 'https://note.com/nike_cha_n/n/nabcfeb7aaf3f',
            },
          ],
        },
        {
          name: '完全自動AIゲームプレイ&実況',
          year: '2023',
          description:
            'AIが完全自動でゲームプレイと実況を実現するプロジェクト。ターン制ゲームの戦略策定から実況の生成まで、全工程を自動化。',
          links: [
            {
              label: 'デモ動画',
              url: 'https://www.youtube.com/watch?v=dRsVVPaOOVk',
            },
            {
              label: '紹介記事',
              url: 'https://note.com/nike_cha_n/n/n96515b745cd2',
            },
          ],
        },
      ]
    : [
        {
          name: 'AITuberKit',
          year: '2024',
          description:
            'A project that allows anyone to easily build AI character chat and AITuber systems. Supports multiple LLMs and TTS services with flexible customization. Built with React and TypeScript.',
          links: [
            { label: 'GitHub', url: 'https://github.com/tegnike/aituber-kit' },
            { label: 'Demo', url: 'https://aituberkit.com' },
            {
              label: 'Article',
              url: 'https://note.com/nike_cha_n/n/ne98acb25e00f',
            },
          ],
        },
        {
          name: 'AITuberList',
          year: '2024',
          description:
            'A website that aggregates AITubers posting on YouTube.',
          links: [
            { label: 'GitHub', url: 'https://github.com/tegnike/aituber-list' },
            { label: 'Site', url: 'https://aituberlist.net' },
          ],
        },
        {
          name: 'Bishojo OP Interpreter',
          year: '2023',
          description:
            'An interactive development support tool that combines Live2D characters with a programming execution environment. Enables intuitive program execution through conversation with anime-style characters.',
          links: [
            {
              label: 'Demo Video',
              url: 'https://www.youtube.com/watch?v=Qw2w2UvxcQY&t=2s',
            },
            {
              label: 'Article',
              url: 'https://note.com/nike_cha_n/n/nabcfeb7aaf3f',
            },
          ],
        },
        {
          name: 'Fully Automated AI Gameplay & Commentary',
          year: '2023',
          description:
            'A project where AI fully automates gameplay and commentary. Automates the entire process from turn-based game strategy to commentary generation.',
          links: [
            {
              label: 'Demo Video',
              url: 'https://www.youtube.com/watch?v=dRsVVPaOOVk',
            },
            {
              label: 'Article',
              url: 'https://note.com/nike_cha_n/n/n96515b745cd2',
            },
          ],
        },
      ]

  // Support links from docs/about-nike.md
  const supportLinks = [
    {
      label: 'GitHub Sponsors',
      url: 'https://github.com/sponsors/tegnike',
      icon: <Heart className="w-4 h-4" />,
    },
    {
      label: 'Buy Me a Coffee',
      url: 'https://buymeacoffee.com/fDANV1k6iZ',
      icon: <Coffee className="w-4 h-4" />,
    },
  ]

  const supportDescription = isJa
    ? '私の活動を応援していただけるスポンサーの方を募集しています。以下のプラットフォームからご支援いただけます。'
    : 'I am looking for sponsors to support my activities. You can support me through the following platforms.'

  return (
    <CharacterDetail
      locale={locale}
      nameEn="NIKE"
      nameJa="ニケ"
      role="AI Character & Agent Developer"
      catchphrase={<>開発たのしい〜〜〜〜</>}
      catchphraseEn={<>Development is so much fun~~~~</>}
      catchphraseLines={['開発たのしい〜〜〜〜']}
      catchphraseLinesEn={['Development is so much fun~~~~']}
      image="/images/characters/sprites/nikechan.png"
      icon="/images/characters/icons/nikechan.png"
      accentColor="#F9A3AB"
      profileItems={profileItems}
      description={description}
      links={links}
      historyItems={careerItems}
      historyTitle="CAREER"
      products={products}
      productsTitle="PRODUCTS"
      supportLinks={supportLinks}
      supportTitle="SUPPORT"
      supportDescription={supportDescription}
      currentCharacterId="nike"
      headerTitle={headerTitle}
    />
  )
}
