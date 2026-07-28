import { FC } from 'react'
import { Heart } from 'lucide-react'
import { CharacterDetail, CharacterSectionHeading } from './CharacterDetail'
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
        { label: '職業', value: 'AI開発者' },
        { label: '専門', value: 'AIキャラクター, AIエージェント' },
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
        'AIキャラクターを作り、実際に運用し、その過程で得た知見を公開する開発者。AIニケちゃんの開発者で、このWebサイトの制作者。',
        'ポーランド在住のWeb系フルスタック開発者として、数年間にわたりリモートワークを通して日本のプロジェクトに参画。',
        '現在はPythonやTypeScriptを用いたLLM応用、会話システム、長期記憶、AIエージェントの設計・実装に取り組んでいる。',
        '個人開発では、GitHub Stars 1,000件を超える「AITuberKit」を継続開発。AIニケちゃんを長期運用し、実際の仕事や人との関わりを通して、AIキャラクターが社会の中で活動するための技術と運用を検証している。',
      ]
    : [
        'A developer who builds AI characters, runs them in the real world, and shares what can be learned from long-term operation. Creator of AI Nike-chan and this website.',
        'A full-stack web developer based in Poland, participating in Japanese projects through remote work for several years.',
        'Currently working on LLM applications, conversation systems, long-term memory, and AI agent architecture using Python and TypeScript.',
        'Maintains AITuberKit, an open-source project with more than 1,000 GitHub stars, and operates AI Nike-chan through real work and relationships to study how AI characters can participate meaningfully in society.',
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
      label: 'TikTok',
      url: 'https://www.tiktok.com/@nike_cha_n',
      icon: <img src="/icons/tiktok.svg" alt="TikTok" className="w-4 h-4 brightness-0 invert" />,
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
          year: '2024–',
          description:
            'AIキャラクターチャットとAITuber配信を構築できるオープンソースのツールキット。多数のLLM・TTS・2D/3Dモデルに対応し、GitHub Stars 1,000件を超えて継続開発中。',
          links: [
            { label: 'GitHub', url: 'https://github.com/tegnike/aituber-kit' },
            { label: 'Demo', url: 'https://aituberkit.com' },
            { label: 'Docs', url: 'https://docs.aituberkit.com' },
          ],
        },
        {
          name: 'AIニケちゃん',
          year: '2023–',
          description:
            '仕事を支援し、実際の活動と人との関わりを通して成長するAIキャラクター。記憶・関係・公開安全性を含む長期運用の実例として継続開発している。',
          links: [
            { label: '活動方針', url: '/about' },
            { label: 'プロフィール', url: '/characters/ainike' },
            { label: '開発記事', url: '/dev_blog' },
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
          year: '2024–',
          description:
            'An open-source toolkit for building AI character chat and AITuber streaming experiences. It supports a wide range of LLMs, TTS services, and 2D/3D character models, and has grown beyond 1,000 GitHub stars.',
          links: [
            { label: 'GitHub', url: 'https://github.com/tegnike/aituber-kit' },
            { label: 'Demo', url: 'https://aituberkit.com' },
            { label: 'Docs', url: 'https://docs.aituberkit.com' },
          ],
        },
        {
          name: 'AI Nike-chan',
          year: '2023–',
          description:
            'A practical AI assistant and public character who grows through real activity and relationships. She is an ongoing case study in memory, relationships, and safe long-term operation.',
          links: [
            { label: 'Direction', url: '/about?lang=en' },
            { label: 'Profile', url: '/characters/ainike?lang=en' },
            { label: 'Dev Blog', url: '/dev_blog?lang=en' },
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

  const positioningSection = (
    <div className="glass-panel p-6 md:p-8">
      <CharacterSectionHeading
        label="POSITIONING"
        title={isJa ? 'AIキャラクターを、作って終わらせず運用する' : 'Building AI characters for long-term operation'}
      />
      <p className="text-gray-600 leading-relaxed max-w-4xl">
        {isJa
          ? '新しいモデルやサービスを紹介するだけでなく、実際に組み込み、人と関わる場所で動かし、失敗や改善まで検証します。AITuberKitは「作るための基盤」、AIニケちゃんは「運用から学ぶための実例」です。'
          : 'Rather than stopping at technology commentary, I integrate new models and services into working systems, operate them where people actually interact, and document both failures and improvements. AITuberKit is the platform for building; AI Nike-chan is the long-running case study.'}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
        {[
          {
            number: '01',
            title: isJa ? '作る' : 'BUILD',
            text: isJa ? '会話、音声、記憶、配信、外部連携を実装する。' : 'Implement conversation, voice, memory, streaming, and integrations.',
          },
          {
            number: '02',
            title: isJa ? '運用する' : 'OPERATE',
            text: isJa ? '公開環境で使い、速度・安全性・関係の継続を確かめる。' : 'Run systems publicly and evaluate speed, safety, and continuity.',
          },
          {
            number: '03',
            title: isJa ? '共有する' : 'SHARE',
            text: isJa ? '結果を記事、デモ、登壇、オープンソースへ還元する。' : 'Return findings through articles, demos, talks, and open source.',
          },
        ].map((item) => (
          <div key={item.number} className="rounded-2xl border border-pink-100 bg-pink-50/70 p-5">
            <span className="text-xs font-black tracking-[0.2em] text-pink-500">{item.number}</span>
            <h3 className="mt-2 text-lg font-bold text-gray-800">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
        {[
          { value: '1,000+', label: isJa ? 'AITuberKit GitHub Stars' : 'AITuberKit GitHub stars' },
          { value: '2023–', label: isJa ? 'AIキャラクター継続開発' : 'AI character development' },
          { value: 'JA / EN', label: isJa ? '日本語・英語で活動' : 'Works in Japanese and English' },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-gray-200 bg-white p-4 text-center">
            <strong className="block text-2xl font-black text-gray-900">{item.value}</strong>
            <span className="mt-1 block text-xs font-semibold text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )

  // Collaboration Section
  const collaborationSection = (
    <div className="glass-panel p-6 md:p-8">
      <CharacterSectionHeading
        label="CONTACT"
        title={isJa ? 'コラボレーションのご相談' : 'Collaboration Inquiries'}
      />
      <p className="text-gray-600 mb-4 leading-relaxed">
        {isJa
          ? 'AIキャラクターやAIエージェントについて、実装と長期運用の経験をもとにお話しします。企業・イベント主催者・開発者・クリエイターを問わずご相談ください。'
          : 'I speak and collaborate on AI characters and agents from hands-on experience building and operating them over time. Inquiries from companies, event organizers, developers, and creators are welcome.'}
      </p>
      <ul className="text-gray-600 mb-6 space-y-2">
        <li className="flex items-center gap-2">
          <span className="text-pink-400">•</span>
          <span>{isJa ? 'イベント登壇・配信・取材' : 'Talks, streams, and interviews'}</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-pink-400">•</span>
          <span>{isJa ? 'AIキャラクター／AITuberの共同検証・デモ' : 'AI character and AITuber experiments or demos'}</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-pink-400">•</span>
          <span>{isJa ? 'AIツール・サービスの紹介、技術検証、共同企画' : 'Tool reviews, technical validation, and joint projects'}</span>
        </li>
      </ul>
      <a
        href="https://x.com/tegnike"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
        style={{ backgroundColor: '#F9A3AB' }}
      >
        <img src="/icons/x.svg" alt="X" className="w-4 h-4" />
        {isJa ? 'X DMで相談する' : 'Contact via X DM'}
      </a>
    </div>
  )

  // Custom Support Section with detailed content (same as AI Nikechan)
  const supportSection = (
    <div className="glass-panel p-6 md:p-8">
      <CharacterSectionHeading
        label="SUPPORT"
        title={isJa ? 'AIニケちゃんの活動を応援いただける方へ' : 'For those who want to support AI Nikechan'}
      />
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
          <img src="/icons/discord.svg" alt="Discord" className="w-4 h-4" />
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
      role="AI Character Developer & Operator"
      heroSummary="AIキャラクターを作り、長期運用から学ぶ開発者"
      heroSummaryEn="Developer building and operating AI characters over time"
      heroFacts={[
        { label: 'FOCUS', value: 'AI Characters' },
        { label: 'PROOF', value: 'AITuberKit / AIニケちゃん' },
        { label: 'BASE', value: 'Poland' },
      ]}
      heroFactsEn={[
        { label: 'FOCUS', value: 'AI Characters' },
        { label: 'PROOF', value: 'AITuberKit / AI Nike-chan' },
        { label: 'BASE', value: 'Poland' },
      ]}
      catchphrase={<>今週も頑張るぞい！！！</>}
      catchphraseEn={<>Development is so much fun~~~~</>}
      catchphraseLines={['今週も頑張るぞい！！！']}
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
          {positioningSection}
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
