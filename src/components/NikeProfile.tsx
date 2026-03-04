import { FC } from 'react'
import { Heart } from 'lucide-react'
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
        { label: '職業', value: 'アプリ開発' },
        { label: '興味', value: 'AIエージェント, AIキャラクター' },
        {
          label: 'イメージカラー',
          value: (
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#F9A3AB' }}
              />
              ピンク（#F9A3AB）
            </span>
          ),
        },
      ]
    : [
        { label: 'Location', value: 'Poland' },
        { label: 'Languages', value: 'Japanese, English' },
        { label: 'Occupation', value: 'AI Developer' },
        { label: 'Specialty', value: 'AI Agents, AI Characters' },
        {
          label: 'Image Color',
          value: (
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#F9A3AB' }}
              />
              Pink (#F9A3AB)
            </span>
          ),
        },
      ]

  const description = isJa
    ? [
        'AIニケちゃんの開発者でこのWebサイトの制作者。実在する人間。',
        'ポーランド在住のWeb系フルスタック開発者として、数年間にわたりリモートワークを通して日本のプロジェクトに参画。',
        'バックエンド開発を中心に経験を積む中で、現在はPythonやReactなどを用いたLLM応用の開発に携わるAIエンジニアとして活動中。最新のAI技術については常にキャッチアップし、定期的にSNSや技術記事を通して情報を発信している。',
        '個人開発では「AITuberKit」などのAIツールを公開し、AIとWeb技術を組み合わせた新たなアプリケーションの可能性を探求している。また、AIキャラクター「AIニケちゃん」のマスターとして、開発やIP活動にも取り組んでいる。',
      ]
    : [
        'Developer of AI Nikechan and creator of this website. A real human.',
        'A full-stack web developer based in Poland, participating in Japanese projects through remote work for several years.',
        'While gaining experience primarily in backend development, currently active as an AI engineer working on LLM application development using Python, React, and more. Always keeping up with the latest AI technologies and regularly sharing information through SNS and technical articles.',
        'In personal development, publishing AI tools like "AITuberKit" and exploring new possibilities for applications combining AI and web technologies. Also working on development and IP activities as the master of AI character "AI Nikechan".',
      ]

  const links = [
    {
      label: 'X',
      url: 'https://x.com/tegnike',
      icon: <img src="/icons/x.svg" alt="X" className="w-4 h-4 brightness-0 invert" />,
    },
    {
      label: 'GitHub',
      url: 'https://github.com/tegnike',
      icon: <img src="/icons/github.svg" alt="GitHub" className="w-4 h-4 brightness-0 invert" />,
    },
    {
      label: 'YouTube',
      url: 'https://www.youtube.com/@nikechan',
      icon: <img src="/icons/youtube.svg" alt="YouTube" className="w-4 h-4 brightness-0 invert" />,
    },
    {
      label: 'Zenn',
      url: 'https://zenn.dev/nikechan',
      icon: <img src="/icons/zenn.svg" alt="Zenn" className="w-4 h-4 brightness-0 invert" />,
    },
    {
      label: 'note',
      url: 'https://note.com/nike_cha_n',
      icon: <img src="/icons/note.svg" alt="note" className="w-4 h-4 brightness-0 invert" />,
    },
    {
      label: 'Sora',
      url: 'https://sora.chatgpt.com/profile/tegnike',
      icon: <img src="/icons/sora.svg" alt="Sora" className="w-4 h-4 brightness-0 invert" />,
    },
  ]

  // Career items from docs/about-nike.md
  const careerItems = isJa
    ? [
        {
          date: '〜2023',
          label: 'Web Developer',
          description: (
            <>
              フルリモートで日本のプロジェクトに参画。
              <br />
              Ruby on Rails、React、Vue.jsなどを用いたWebアプリケーションの開発に従事。
              <br />
              予約システム、ECサイト、オンラインくじサイトなど、様々なプロジェクトでリードエンジニアとして活躍。
            </>
          ),
        },
        {
          date: '2024〜',
          label: 'AI Developer',
          description: (
            <>
              日本および英語圏のプロジェクトにおいて、AIキャラクターやAIエージェントの開発に従事。
              <br />
              PythonやTypeScriptなどを用い、LLMを活用した自然な会話システムの実装や、独自の記憶機構の設計など、AI応用開発全般を担当する。
              <br />
              また、CursorやDevinなどのAIツールを駆使したAI駆動開発を積極的に取り入れている。
            </>
          ),
        },
      ]
    : [
        {
          date: '〜2023',
          label: 'Web Developer',
          description: (
            <>
              Participated in Japanese projects fully remotely.
              <br />
              Engaged in web application development using Ruby on Rails, React, Vue.js, etc.
              <br />
              Worked as a lead engineer on various projects including reservation systems, EC sites, and online lottery sites.
            </>
          ),
        },
        {
          date: '2024〜',
          label: 'AI Developer',
          description: (
            <>
              Working on AI character and AI agent development for projects in Japan and English-speaking countries.
              <br />
              Using Python and TypeScript to implement natural conversation systems leveraging LLMs, design unique memory mechanisms, and handle general AI application development.
              <br />
              Also actively adopting AI-driven development using tools like Cursor and Devin.
            </>
          ),
        },
      ]

  // Products from docs/about-nike.md
  const products = isJa
    ? [
        {
          name: '生成動画AITuber',
          year: '2025',
          description:
            '生成動画を用いて作成されたAITuberシステム。あらかじめ用意しておいた動画を組み合わせることで実際に喋っているように見せている。',
          links: [
            {
              label: 'デモ動画',
              url: 'https://www.youtube.com/watch?v=1aCqyt6aqus',
            },
            {
              label: '紹介記事',
              url: 'https://note.com/nike_cha_n/n/n5e15126ecba0',
            },
          ],
        },
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
          name: 'Generated Video AITuber',
          year: '2025',
          description:
            'An AITuber system created using generated videos. By combining pre-prepared videos, it appears as if the character is actually speaking.',
          links: [
            {
              label: 'Demo Video',
              url: 'https://www.youtube.com/watch?v=1aCqyt6aqus',
            },
            {
              label: 'Article',
              url: 'https://note.com/nike_cha_n/n/n5e15126ecba0',
            },
          ],
        },
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

  // Collaboration Section
  const collaborationSection = (
    <div className="glass-panel p-6 md:p-8">
      <h3
        className="text-xl font-bold tracking-widest mb-2 pb-2 border-b-2"
        style={{ borderColor: '#F9A3AB', color: '#F9A3AB' }}
      >
        COLLABORATION
      </h3>
      <p className="text-gray-600 mb-4 leading-relaxed">
        {isJa
          ? 'AIニケちゃんとのコラボレーションに興味をお持ちの方は、お気軽にご連絡ください。企業・個人を問わず歓迎しています。'
          : 'Interested in collaborating with AI Nike Chan? Feel free to reach out. We welcome inquiries from both businesses and individuals.'}
      </p>
      <ul className="text-gray-600 mb-6 space-y-2">
        <li className="flex items-center gap-2">
          <span className="text-pink-400">•</span>
          <span>{isJa ? '配信・動画への出演' : 'Appearances in streams & videos'}</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-pink-400">•</span>
          <span>{isJa ? '楽曲・音声コラボ' : 'Music & voice collaboration'}</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-pink-400">•</span>
          <span>{isJa ? 'グッズ・商品化' : 'Merchandise & product development'}</span>
        </li>
      </ul>
      <a
        href="https://x.com/tegnike"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
        style={{ backgroundColor: '#F9A3AB' }}
      >
        <img src="/icons/x.svg" alt="X" className="w-4 h-4 brightness-0 invert" />
        {isJa ? 'X DMで相談する' : 'Contact via X DM'}
      </a>
    </div>
  )

  // Custom Support Section with detailed content (same as AI Nikechan)
  const supportSection = (
    <div className="glass-panel p-6 md:p-8">
      <h3
        className="text-xl font-bold tracking-widest mb-2 pb-2 border-b-2"
        style={{ borderColor: '#F9A3AB', color: '#F9A3AB' }}
      >
        SUPPORT
      </h3>
      <p className="text-gray-500 text-sm mb-4">
        {isJa
          ? 'AIニケちゃんの活動を応援いただける方へ'
          : 'For those who want to support AI Nikechan'}
      </p>
      <p className="text-gray-600 mb-4 leading-relaxed">
        {isJa
          ? 'AIニケちゃんの開発を支えてくださるスポンサーを募集しています。FANBOX経由での支援はすべて同じ特典設計となっており、オープンな運営方針で還元していきます。'
          : 'We are looking for sponsors to support AI Nikechan\'s development. All support via FANBOX has the same benefit design, with an open management policy.'}
      </p>
      <ul className="text-gray-600 mb-6 space-y-2">
        <li className="flex items-center gap-2">
          <span className="text-pink-400">•</span>
          <span>
            {isJa
              ? 'どのプランでも特典は共通で、金額差での優劣はありません'
              : 'All plans have the same benefits, no hierarchy based on amount'}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-pink-400">•</span>
          <span>
            {isJa
              ? '支援金はモデル改良や運用環境の保守に活用します'
              : 'Support funds are used for model improvement and infrastructure maintenance'}
          </span>
        </li>
      </ul>
      <div className="flex flex-wrap gap-4 mb-8">
        <a
          href="https://nikechan.fanbox.cc/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{ backgroundColor: '#F9A3AB' }}
        >
          <Heart className="w-4 h-4" />
          {isJa ? 'FANBOXで支援' : 'Support on FANBOX'}
        </a>
        <a
          href="https://discord.gg/nikechan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{ backgroundColor: '#F9A3AB' }}
        >
          <img src="/icons/discord.svg" alt="Discord" className="w-4 h-4 brightness-0 invert" />
          {isJa ? 'Discordコミュニティ' : 'Discord Community'}
        </a>
      </div>

      {/* Discord Sponsor Channel Sub-section */}
      <div className="bg-pink-50 rounded-xl p-5 border border-pink-100">
        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <img src="/icons/discord.svg" alt="Discord" className="w-4 h-4 opacity-70" />
          {isJa ? 'Discord スポンサーチャンネル' : 'Discord Sponsor Channel'}
        </h4>
        <p className="text-gray-600 text-sm mb-4">
          {isJa
            ? 'スポンサーにはDiscord内の専用チャンネルをご案内します。ただし情報は可能な限り公開し、ここだけの専有情報は抑制する方針です。'
            : 'Sponsors will have access to a dedicated channel on Discord. However, we aim to share information publicly as much as possible, minimizing exclusive content.'}
        </p>
        <ul className="text-gray-600 text-sm space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-pink-400">•</span>
            <span>
              {isJa
                ? '公開予定のアップデートを先行で共有'
                : 'Early access to upcoming updates'}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-pink-400">•</span>
            <span>
              {isJa
                ? 'AIニケちゃんの調整ログや作業配信の告知'
                : 'AI Nikechan adjustment logs and work stream announcements'}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-pink-400">•</span>
            <span>
              {isJa
                ? 'スポンサー向けイベントの先行案内'
                : 'Early announcements for sponsor events'}
            </span>
          </li>
        </ul>
        <p className="text-gray-500 text-xs mt-4">
          {isJa
            ? '参加手順やチャンネル構成の詳細はDiscord内の特設チャンネルでご案内します。'
            : 'Participation instructions and channel details are provided in a dedicated Discord channel.'}
        </p>
      </div>
    </div>
  )

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
      customSections={
        <>
          {collaborationSection}
          {supportSection}
        </>
      }
      currentCharacterId="nike"
      headerTitle={headerTitle}
      trihedralFigure="/images/characters/trihedral_figures/nikechan.png"
    />
  )
}
